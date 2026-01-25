---
title: Лучшие практики для Production
description: Полное руководство по развертыванию Wildberries SDK в production - обработка ошибок, безопасность, тестирование и мониторинг
layout: doc
---

# Лучшие практики для Production

Полное руководство по развертыванию Wildberries SDK в production-окружениях.

**Целевая аудитория**: Разработчики, развертывающие приложения на основе SDK в production
**Предварительные требования**: Знакомство с основами SDK, TypeScript и развертыванием Node.js в production
**Примерное время чтения**: 45 минут

---

## Содержание

1. [Обработка ошибок](#обработка-ошибок)
2. [Лимит запросов](#лимит-запросов)
3. [Логика повторов](#логика-повторов)
4. [Логирование и мониторинг](#логирование-и-мониторинг)
5. [Усиление безопасности](#усиление-безопасности)
6. [Стратегии тестирования](#стратегии-тестирования)
7. [Production развертывание](#production-развертывание)
8. [Оптимизация производительности](#оптимизация-производительности)

---

## Обработка ошибок

### Иерархия ошибок SDK

SDK предоставляет полную иерархию ошибок для точной обработки ошибок:

```typescript
import {
  WBAPIError,           // Базовый класс ошибок
  AuthenticationError,  // 401/403 ошибки
  RateLimitError,      // 429 ошибки
  ValidationError,     // 400/422 ошибки
  NetworkError         // Сетевые сбои
} from 'daytona-wildberries-typescript-sdk';
```

**Иерархия ошибок:**
```
Error (базовый JavaScript)
  └─ WBAPIError (базовая ошибка SDK)
      ├─ AuthenticationError
      ├─ RateLimitError
      ├─ ValidationError
      └─ NetworkError
```

**Справочник API:** См. [WBAPIError](/api/classes/WBAPIError) и его подклассы: [AuthenticationError](/api/classes/AuthenticationError), [RateLimitError](/api/classes/RateLimitError), [ValidationError](/api/classes/ValidationError), [NetworkError](/api/classes/NetworkError)

### Паттерн обработки ошибок

**Рекомендуемый паттерн** для всех операций SDK:

```typescript
async function robustAPICall() {
  try {
    const result = await sdk.products.getParentAll();
    return { success: true, data: result };

  } catch (error) {
    // Обработка конкретных ошибок SDK
    if (error instanceof RateLimitError) {
      // SDK автоматически повторяет, но вы можете добавить пользовательскую логику
      logger.warn('Достигнут лимит запросов', {
        retryAfter: error.retryAfter,
        endpoint: 'getParentAll'
      });
      // Вариант 1: Позволить SDK обработать повтор (автоматически)
      // Вариант 2: Реализовать механизм обратного давления
      // Вариант 3: Поставить запрос в очередь на потом

    } else if (error instanceof AuthenticationError) {
      // НЕ повторяйте ошибки аутентификации
      logger.error('Аутентификация не удалась', { error });
      // Оповестите команду операций - недействительный API ключ
      throw new Error('Недействительные учетные данные API - проверьте WB_API_KEY');

    } else if (error instanceof ValidationError) {
      // Логируйте детали валидации для отладки
      logger.error('Ошибка валидации', {
        message: error.message,
        statusCode: error.statusCode,
        response: error.response
      });
      // Исправьте данные запроса и повторите
      throw error;

    } else if (error instanceof NetworkError) {
      // Реализуйте повтор с экспоненциальной задержкой
      logger.error('Ошибка сети', { error });
      // SDK автоматически повторяет сетевые ошибки
      // Рассмотрите реализацию circuit breaker для устойчивых сбоев

    } else if (error instanceof WBAPIError) {
      // Другие ошибки API (5xx и т.д.)
      logger.error('Ошибка API', {
        statusCode: error.statusCode,
        message: error.message
      });
      throw error;

    } else {
      // Неожиданная ошибка
      logger.error('Неожиданная ошибка', { error });
      throw error;
    }
  }
}
```

### Грациозная деградация

Когда API вызовы терпят неудачу, предоставьте запасное поведение:

```typescript
async function getCategories() {
  try {
    return await sdk.products.getParentAll();
  } catch (error) {
    logger.warn('Не удалось получить категории, используется кэш', { error });
    return getCategoriesFromCache();
  }
}

// Реализация кэша
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 3600000; // 1 час

function getCategoriesFromCache(): any {
  const cached = cache.get('categories');
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  // Вернуть пустой результат при промахе кэша
  return { data: [] };
}
```

### Когда повторять vs быстро провалиться

**ПОВТОРЯЙТЕ:**
- ✅ NetworkError (временные сетевые проблемы)
- ✅ 5xx ошибки (серверные ошибки)
- ✅ 429 Лимит запросов (с экспоненциальной задержкой)
- ✅ Ошибки таймаута

**НЕ ПОВТОРЯЙТЕ:**
- ❌ AuthenticationError (сначала исправьте API ключ)
- ❌ ValidationError (сначала исправьте данные запроса)
- ❌ 4xx ошибки (кроме 429)
- ❌ После исчерпания максимальных попыток повтора

### Лучшие практики логирования ошибок

```typescript
// ✅ ХОРОШО: Структурированное логирование с контекстом
logger.error('Обработка заказа не удалась', {
  orderId: 12345,
  error: error.message,
  statusCode: error.statusCode,
  timestamp: new Date().toISOString(),
  userId: 'seller-123'
});

// ❌ ПЛОХО: Нет контекста
logger.error(error.message);
```

**@see** [`examples/tariffs-pricing-calculator.ts`](../../examples/tariffs-pricing-calculator.ts) - Полный пример обработки ошибок

---

## Лимит запросов

### Понимание лимитов запросов SDK

SDK реализует лимиты запросов для каждой конечной точки на основе спецификаций API Wildberries:

| Модуль | Операция | Лимит | Примечания |
|--------|----------|-------|------------|
| Products | Создание товара | 1 запрос/10с | 10 запросов/мин |
| Products | Список товаров | 100 запросов/мин | Рекомендуется пагинация |
| Orders (FBS) | Получить новые заказы | 5 запросов/с | Интервалы 200мс |
| Orders (FBS) | Получить статусы заказов | 3 запроса/мин | Интервалы 20с |
| Analytics | Статистика продаж | 5 запросов/мин | Интервалы 12с |
| Promotion | Информация о кампании | 5 запросов/с | Интервалы 200мс |
| Finances | Транзакции | 60 запросов/мин | Интервалы 1с |
| Tariffs | Комиссия | 1 запрос/мин | Интервалы 60с |

**Справочник API:** См. [ProductsModule](/api/classes/ProductsModule), [OrdersFbsModule](/api/classes/OrdersFbsModule), [AnalyticsModule](/api/classes/AnalyticsModule), [FinancesModule](/api/classes/FinancesModule) для полной документации методов и деталей лимитов запросов.

### Обработка лимитов запросов

**Встроенное поведение SDK:**
- ✅ Автоматическая постановка запросов в очередь
- ✅ Экспоненциальная задержка при 429 ошибках
- ✅ Прозрачный механизм повторов
- ✅ Отслеживание лимитов для каждой конечной точки

**SDK автоматически обрабатывает лимиты запросов** - вам не нужно реализовывать ручные задержки в большинстве случаев.

### Обработка ошибок лимита запросов

```typescript
try {
  const result = await sdk.tariffs.getTariffsCommission();
} catch (error) {
  if (error instanceof RateLimitError) {
    // SDK уже автоматически повторил попытку
    console.log(`Достигнут лимит запросов, SDK повторил после ${error.retryAfter}ms`);

    // Опционально: Добавьте дополнительную задержку перед следующей операцией
    await new Promise(resolve => setTimeout(resolve, error.retryAfter));
  }
}
```

### Стратегия пакетных операций

Для высокообъемных операций реализуйте пакетную обработку:

```typescript
async function batchUpdatePrices(updates: PriceUpdate[]) {
  const batchSize = 10;
  const delayMs = 1000; // 1 секунда между пакетами
  const results = [];

  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);

    // Обработать пакет параллельно
    const batchResults = await Promise.allSettled(
      batch.map(update => sdk.products.updatePricing(update))
    );

    results.push(...batchResults);

    // Соблюдайте лимиты запросов между пакетами
    if (i + batchSize < updates.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    // Логировать прогресс
    logger.info(`Обработано ${Math.min(i + batchSize, updates.length)}/${updates.length} обновлений`);
  }

  return results;
}
```

### Мониторинг лимитов запросов

Отслеживайте события лимитов запросов для оптимизации производительности:

```typescript
let rateLimitCount = 0;

async function monitoredAPICall() {
  try {
    return await sdk.products.getParentAll();
  } catch (error) {
    if (error instanceof RateLimitError) {
      rateLimitCount++;
      // Оповестить, если часто достигаются лимиты запросов
      if (rateLimitCount > 10) {
        logger.warn('Частые достижения лимита запросов', {
          count: rateLimitCount,
          recommendation: 'Уменьшите частоту запросов или реализуйте кэширование'
        });
      }
    }
    throw error;
  }
}
```

**@see** [`examples/promotion-campaign-automation.ts`](../../examples/promotion-campaign-automation.ts) - Пример обработки лимита запросов

---

## Логика повторов

### Автоматический повтор SDK

SDK реализует экспоненциальную задержку для временных ошибок:

```typescript
// Конфигурация повтора по умолчанию
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  retryConfig: {
    maxRetries: 3,              // Максимальные попытки повтора
    retryDelay: 1000,           // Начальная задержка: 1с
    exponentialBackoff: true    // Включить экспоненциальную задержку
  }
});
```

**Алгоритм задержки:**
- Попытка 1: Ждать 1с (1000мс)
- Попытка 2: Ждать 2с (2000мс)
- Попытка 3: Ждать 4с (4000мс)

### Пользовательская реализация повтора

Для продвинутых случаев, требующих пользовательской логики повтора:

```typescript
async function retryWithJitter<T>(
  operation: () => Promise<T>,
  options = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 32000
  }
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await operation();

    } catch (error) {
      lastError = error;

      // Не повторять на последней попытке
      if (attempt === options.maxRetries) {
        throw error;
      }

      // Не повторять не повторяемые ошибки
      if (error instanceof AuthenticationError ||
          error instanceof ValidationError) {
        throw error;
      }

      // Экспоненциальная задержка с джиттером
      const exponentialDelay = options.baseDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 1000; // 0-1000мс случайный джиттер
      const delay = Math.min(exponentialDelay + jitter, options.maxDelay);

      logger.info(`Попытка повтора ${attempt + 1}/${options.maxRetries} через ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Использование
const result = await retryWithJitter(
  () => sdk.products.getParentAll(),
  { maxRetries: 5, baseDelay: 2000 }
);
```

### Паттерн Circuit Breaker

Предотвратите каскадные сбои в распределенных системах:

```typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private threshold = 5;
  private timeout = 60000; // 1 минута
  private lastFailureTime = 0;

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    // Если автомат открыт и таймаут не прошел, быстро провалиться
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new Error('Circuit breaker ОТКРЫТ - быстрый провал');
      } else {
        // Таймаут прошел, перейти в полуоткрытое состояние
        this.state = 'half-open';
        logger.info('Circuit breaker переходит в ПОЛУОТКРЫТОЕ состояние');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;

    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    if (this.state === 'half-open') {
      this.state = 'closed';
      logger.info('Circuit breaker ЗАКРЫТ - сервис восстановлен');
    }
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = 'open';
      logger.error('Circuit breaker ОТКРЫТ - слишком много сбоев', {
        failures: this.failures,
        threshold: this.threshold
      });
    }
  }

  getState() {
    return {
      state: this.state,
      failures: this.failures,
      threshold: this.threshold
    };
  }
}

// Использование
const breaker = new CircuitBreaker();

async function protectedAPICall() {
  return breaker.execute(() => sdk.products.getParentAll());
}
```

---

## Логирование и мониторинг

### Структурированное логирование

Используйте структурированное логирование для лучшей наблюдаемости:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'wb-sdk-app',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Логи ошибок
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Комбинированные логи
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5
    }),
    // Консоль для разработки
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Экспортировать logger
export { logger };
```

### Что логировать

#### ✅ ЛОГИРУЙТЕ

**API вызовы:**
```typescript
logger.info('Начат API вызов', {
  module: 'products',
  method: 'getParentAll',
  timestamp: Date.now(),
  requestId: generateRequestId()
});
```

**Ошибки с контекстом:**
```typescript
logger.error('Обработка заказа не удалась', {
  orderId: 12345,
  error: error.message,
  stack: error.stack,
  statusCode: error.statusCode,
  userId: 'seller-123'
});
```

**Метрики производительности:**
```typescript
const start = Date.now();
const result = await sdk.products.getParentAll();
const duration = Date.now() - start;

logger.info('API вызов завершен', {
  module: 'products',
  method: 'getParentAll',
  duration,
  resultCount: result.data.length
});
```

**Бизнес-события:**
```typescript
logger.info('Заказ выполнен', {
  orderId: 12345,
  productId: 67890,
  revenue: 1500,
  fulfillmentType: 'FBS'
});
```

#### ❌ НЕ ЛОГИРУЙТЕ

- ❌ API ключи или токены
- ❌ Персональные данные клиентов (PII)
- ❌ Платежную информацию
- ❌ Пароли или учетные данные
- ❌ Полные тела запросов/ответов в production (используйте режим отладки экономно)

### Уровни логов

Используйте соответствующие уровни логов:

```typescript
logger.error('Критический сбой');  // Production проблемы, требующие немедленного действия
logger.warn('Деградация производительности'); // Некритичные проблемы, достойные исследования
logger.info('Заказ обработан');   // Важные бизнес-события
logger.debug('Попадание в кэш');        // Информация для разработки/отладки
```

### Настройка мониторинга

**Ключевые метрики для отслеживания:**

1. **Метрики API вызовов:**
   - Частота запросов (запросов/секунда)
   - Процент успеха (%)
   - Процент ошибок по типу (%)
   - Задержка (p50, p95, p99)

2. **Метрики ошибок:**
   - Количество ошибок по типу
   - Достижения лимита запросов/час
   - Попытки повтора/час
   - Неудачные операции

3. **Бизнес-метрики:**
   - Обработано заказов/час
   - Синхронизировано товаров/час
   - Отслеживаемая выручка
   - Обновления запасов/час

**Пример Prometheus:**

```typescript
import { Counter, Histogram, register } from 'prom-client';

// Счетчики
const apiCallCounter = new Counter({
  name: 'wb_sdk_api_calls_total',
  help: 'Всего сделано API вызовов',
  labelNames: ['module', 'method', 'status']
});

const errorCounter = new Counter({
  name: 'wb_sdk_errors_total',
  help: 'Всего встречено ошибок',
  labelNames: ['type', 'module', 'method']
});

// Гистограммы
const apiCallDuration = new Histogram({
  name: 'wb_sdk_api_call_duration_seconds',
  help: 'Длительность API вызова в секундах',
  labelNames: ['module', 'method'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// Инструментирование SDK вызовов
async function instrumentedAPICall() {
  const start = Date.now();
  const timer = apiCallDuration.startTimer({ module: 'products', method: 'getParentAll' });

  try {
    const result = await sdk.products.getParentAll();

    apiCallCounter.inc({ module: 'products', method: 'getParentAll', status: 'success' });
    timer();

    return result;

  } catch (error) {
    apiCallCounter.inc({ module: 'products', method: 'getParentAll', status: 'error' });

    if (error instanceof RateLimitError) {
      errorCounter.inc({ type: 'RateLimitError', module: 'products', method: 'getParentAll' });
    }

    timer();
    throw error;
  }
}

// Предоставить конечную точку метрик
import express from 'express';
const app = express();

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

**Справочник API:** См. [BaseClient](/api/classes/BaseClient) для полной документации HTTP клиента со встроенным инструментированием и лимитом запросов.

---

## Усиление безопасности

### Управление API ключами

#### Разработка: Переменные окружения

```bash
# .env (НИКОГДА не коммитьте этот файл!)
WB_API_KEY=your_api_key_here
NODE_ENV=development
```

```typescript
// Загрузить из окружения
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.WB_API_KEY) {
  throw new Error('Требуется переменная окружения WB_API_KEY');
}

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});
```

#### Production: Управление секретами

**Пример AWS Secrets Manager:**

```typescript
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

async function getAPIKey(): Promise<string> {
  const client = new SecretsManagerClient({ region: process.env.AWS_REGION });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: 'wb-api-key-prod'
      })
    );

    const secret = JSON.parse(response.SecretString!);
    return secret.apiKey;

  } catch (error) {
    logger.error('Не удалось получить API ключ из Secrets Manager', { error });
    throw new Error('Не удалось загрузить учетные данные API');
  }
}

// Инициализировать SDK с секретом
const apiKey = await getAPIKey();
const sdk = new WildberriesSDK({ apiKey });
```

**Пример HashiCorp Vault:**

```typescript
import vault from 'node-vault';

async function getAPIKeyFromVault(): Promise<string> {
  const client = vault({
    apiVersion: 'v1',
    endpoint: process.env.VAULT_ADDR,
    token: process.env.VAULT_TOKEN
  });

  const result = await client.read('secret/data/wb-api');
  return result.data.data.apiKey;
}
```

### Чек-лист безопасности

#### 🔑 API ключи

- [ ] Никогда не хардкодьте API ключи в исходном коде
- [ ] Используйте переменные окружения или сервисы управления секретами
- [ ] Регулярно ротируйте ключи (рекомендуется ежеквартально)
- [ ] Немедленно отзывайте старые ключи после ротации
- [ ] Используйте разные ключи для разработки и production
- [ ] Ограничьте разрешения API ключей до минимально необходимых
- [ ] Мониторьте использование API ключей на аномалии

#### 🌐 Сетевая безопасность

- [ ] Принудительно используйте HTTPS для всех API вызовов (по умолчанию SDK)
- [ ] Валидируйте TLS сертификаты
- [ ] Используйте последнюю версию TLS (предпочтительно 1.3, минимум 1.2)
- [ ] Реализуйте IP-белый список, если возможно
- [ ] Используйте VPN для чувствительных операций
- [ ] Включите правила firewall для исходящих соединений

#### 🔒 Защита данных

- [ ] Никогда не логируйте API ключи или токены
- [ ] Санитизируйте сообщения об ошибках перед логированием
- [ ] Шифруйте чувствительные данные в покое
- [ ] Используйте безопасное хранилище учетных данных (связка ключей OS, KMS)
- [ ] Реализуйте политики хранения данных
- [ ] Анонимизируйте логи, содержащие пользовательские данные

#### 📦 Безопасность зависимостей

- [ ] Запускайте `npm audit` перед каждым развертыванием
- [ ] Включите Dependabot или аналогичное автоматическое сканирование
- [ ] Держите SDK обновленным до последней версии
- [ ] Регулярно проверяйте предупреждения безопасности
- [ ] Используйте `npm ci` в CI/CD для воспроизводимых сборок
- [ ] Блокируйте версии зависимостей в package-lock.json

#### 🛡️ Безопасность приложения

- [ ] Валидируйте все пользовательские входы
- [ ] Реализуйте лимит запросов на ваших API конечных точках
- [ ] Используйте параметризованные запросы для предотвращения инъекций
- [ ] Включите ограничения CORS
- [ ] Реализуйте подписывание/аутентификацию запросов
- [ ] Используйте заголовки безопасности (Helmet.js для Express)

### Процедура ротации ключей

```typescript
// 1. Сгенерируйте новый API ключ в панели продавца Wildberries
// 2. Добавьте новый ключ в менеджер секретов
// 3. Разверните приложение с новым ключом
// 4. Мониторьте в течение 24 часов
// 5. Отзовите старый ключ

async function rotateAPIKey() {
  const oldKey = process.env.WB_API_KEY_OLD;
  const newKey = process.env.WB_API_KEY_NEW;

  // Инициализировать SDK с новым ключом
  const sdk = new WildberriesSDK({ apiKey: newKey });

  try {
    // Проверить новый ключ
    await sdk.general.ping();
    logger.info('Новый API ключ успешно валидирован');

    // Обновить окружение/секреты
    await updateSecret('WB_API_KEY', newKey);

    // Запланировать отзыв старого ключа
    scheduleKeyRevocation(oldKey, 24 * 60 * 60 * 1000); // 24 часа

  } catch (error) {
    logger.error('Валидация нового API ключа не удалась', { error });
    // Откатиться к старому ключу
    throw error;
  }
}
```

---

## Стратегии тестирования

### Модульное тестирование

**Тестирование интеграции SDK с имитацией:**

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WildberriesSDK, RateLimitError } from 'daytona-wildberries-typescript-sdk';
import { ProductService } from './product-service';

describe('ProductService', () => {
  let mockSDK: any;
  let service: ProductService;

  beforeEach(() => {
    mockSDK = {
      products: {
        getParentAll: vi.fn(),
        createProduct: vi.fn(),
        updatePricing: vi.fn()
      }
    };
    service = new ProductService(mockSDK);
  });

  it('должен грациозно обрабатывать ошибки API', async () => {
    // Arrange
    const error = new Error('Ошибка сети');
    mockSDK.products.getParentAll.mockRejectedValue(error);

    // Act
    const result = await service.getCategories();

    // Assert
    expect(result).toEqual([]);  // Запасной вариант: пустой массив
    expect(mockSDK.products.getParentAll).toHaveBeenCalledTimes(1);
  });

  it('должен повторять при ошибках лимита запросов', async () => {
    // Arrange
    const rateLimitError = new RateLimitError('Превышен лимит запросов', 1000);
    mockSDK.products.getParentAll
      .mockRejectedValueOnce(rateLimitError)
      .mockResolvedValueOnce({ data: [{ id: 1 }] });

    // Act
    const result = await service.getCategories();

    // Assert
    expect(result.data).toHaveLength(1);
    expect(mockSDK.products.getParentAll).toHaveBeenCalledTimes(2);
  });
});
```

### Интеграционное тестирование

**Используйте MSW (Mock Service Worker) для имитации API:**

```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Настройка MSW сервера
const server = setupServer(
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Электроника' },
        { id: 2, name: 'Одежда' }
      ]
    });
  }),

  http.post('https://content-api.wildberries.ru/content/v2/cards', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: 'created',
      vendorCode: body.variants[0].vendorCode
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Интеграция Products', () => {
  it('должен успешно получать и создавать товары', async () => {
    const sdk = new WildberriesSDK({ apiKey: 'test-key' });

    // Получить категории
    const categories = await sdk.products.getParentAll();
    expect(categories.data).toHaveLength(2);

    // Создать товар
    const product = await sdk.products.createProduct({
      subjectID: 1,
      variants: [{
        vendorCode: 'TEST-001',
        brand: 'Тестовый бренд',
        title: 'Тестовый товар'
      }]
    });

    expect(product.data.id).toBe('created');
  });
});
```

### E2E тестирование

**Тестирование критических бизнес-потоков:**

```typescript
import { describe, it, expect } from 'vitest';
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

describe('Жизненный цикл товара E2E', () => {
  // Используйте тестовый API ключ или выделенную тестовую среду
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_TEST_API_KEY!
  });

  it('должен завершить полный жизненный цикл товара', async () => {
    // 1. Создать товар
    const vendorCode = `E2E-${Date.now()}`;
    const product = await sdk.products.createProduct({
      subjectID: 123,
      variants: [{
        vendorCode,
        brand: 'E2E Тестовый бренд',
        title: 'E2E Тестовый товар',
        dimensions: {
          length: 10,
          width: 10,
          height: 5,
          weightBrutto: 0.5
        }
      }]
    });

    expect(product).toBeDefined();

    // 2. Получить товар для проверки
    await new Promise(resolve => setTimeout(resolve, 2000)); // Ждать индексации

    const products = await sdk.products.listProducts({
      limit: 1,
      vendorCodes: [vendorCode]
    });

    expect(products.data.cursor.total).toBeGreaterThan(0);

    // 3. Обновить цены
    const nmId = products.data.cards[0].nmID;
    await sdk.products.updatePricing({
      nmId,
      price: 1500,
      discount: 10
    });

    // 4. Удалить товар (очистка)
    await sdk.products.deleteProduct(vendorCode);
  }, 60000); // Таймаут 60 секунд для E2E
});
```

### Тестирование производительности

**Нагрузочное тестирование с k6:**

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Увеличить до 10 пользователей
    { duration: '1m', target: 50 },   // Увеличить до 50 пользователей
    { duration: '30s', target: 0 },   // Уменьшить
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% запросов менее 500мс
    http_req_failed: ['rate<0.01'],   // Процент ошибок менее 1%
  },
};

export default function () {
  const response = http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', {
    headers: { 'Authorization': `Bearer ${__ENV.WB_API_KEY}` }
  });

  check(response, {
    'статус 200': (r) => r.status === 200,
    'время ответа < 500мс': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

### Цели покрытия

Установите и соблюдайте цели покрытия:

```json
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/types/**'
      ]
    }
  }
});
```

**Цели покрытия:**
- Основная инфраструктура (BaseClient, RateLimiter): ≥90%
- API модули: ≥80%
- Критические бизнес-пути: 100%
- Обработчики ошибок: ≥85%

**@see** [`examples/`](../../examples/) - Все примеры включают паттерны тестирования

---

## Production развертывание

### Чек-лист перед развертыванием

#### Качество кода
- [ ] Все тесты проходят (модульные + интеграционные + E2E)
- [ ] Покрытие тестами соответствует целям (≥80%)
- [ ] Линтинг проходит (`npm run lint`)
- [ ] Проверка типов проходит (`npm run type-check`)
- [ ] Нет предупреждений компилятора

#### Безопасность
- [ ] Сканирование безопасности завершено (`npm audit`)
- [ ] Нет высоких/критических уязвимостей
- [ ] Зависимости обновлены
- [ ] API ключи ротированы (если запланировано)
- [ ] Секреты настроены в production

#### Производительность
- [ ] Выполнены тесты производительности
- [ ] Нагрузочное тестирование завершено
- [ ] Утечки памяти проверены
- [ ] Размер бандла оптимизирован
- [ ] Времена ответа в пределах SLA

#### Документация
- [ ] README обновлен
- [ ] CHANGELOG обновлен
- [ ] Документация API перегенерирована
- [ ] Руководство по развертыванию проверено
- [ ] Процедура отката задокументирована

### Чек-лист развертывания

#### Конфигурация окружения
- [ ] Переменные окружения настроены
- [ ] API ключи загружены из менеджера секретов
- [ ] Подключения к базе данных проверены
- [ ] URL внешних сервисов настроены
- [ ] Флаги функций установлены правильно

#### Мониторинг и логирование
- [ ] Мониторинг включен (Prometheus/Grafana/Datadog)
- [ ] Логирование настроено (Winston/Pino/CloudWatch)
- [ ] Отслеживание ошибок включено (Sentry/Rollbar)
- [ ] Проверки работоспособности реализованы
- [ ] Мониторинг лимита запросов активен
- [ ] Правила оповещений настроены

#### Инфраструктура
- [ ] Балансировщик нагрузки настроен
- [ ] Правила автомасштабирования установлены
- [ ] Резервные копии базы данных включены
- [ ] Redis/слой кэша готов
- [ ] CDN настроен (если применимо)

### Чек-лист после развертывания

#### Smoke-тесты
- [ ] Конечная точка проверки работоспособности отвечает
- [ ] Критические API вызовы успешны
- [ ] Аутентификация работает
- [ ] Подключение к базе данных проверено
- [ ] Внешние сервисы доступны

#### Проверка мониторинга
- [ ] Дашборды показывают данные
- [ ] Логи текут правильно
- [ ] Метрики собираются
- [ ] Нет всплесков ошибок
- [ ] Производительность в пределах SLA

#### Бизнес-валидация
- [ ] Ключевые бизнес-операции работают
- [ ] Нет жалоб клиентов
- [ ] Отслеживание выручки точное
- [ ] Обработка заказов нормальная
- [ ] Обновления запасов функционируют

#### Коммуникация команды
- [ ] Отправлено объявление о развертывании
- [ ] Уведомлен дежурный инженер
- [ ] План отката сообщен
- [ ] Дашборд мониторинга предоставлен

### План отката

```bash
# Процедура быстрого отката
# 1. Определить проблему
# 2. Выполнить откат
npm run deploy:rollback

# 3. Проверить откат
npm run smoke-test

# 4. Уведомить команду
# 5. Запланировано посмертное вскрытие
```

**Автоматические триггеры отката:**
- Процент ошибок > 5% в течение 5 минут
- Время ответа p95 > 2x базовая линия
- Сбои проверки работоспособности > 3
- Ручной триггер дежурным инженером

---

## Оптимизация производительности

### Кэширование ответов

Реализуйте кэширование для часто запрашиваемых данных:

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 3600,      // TTL по умолчанию 1 час
  checkperiod: 120,   // Проверять истекшие записи каждые 2 минуты
  useClones: false    // Возвращать ссылки (быстрее)
});

async function getCategoriesWithCache() {
  const cacheKey = 'categories:all';

  // Сначала проверить кэш
  const cached = cache.get(cacheKey);
  if (cached) {
    logger.debug('Попадание в кэш', { key: cacheKey });
    return cached;
  }

  // Получить из API
  logger.debug('Промах кэша', { key: cacheKey });
  const result = await sdk.products.getParentAll();

  // Сохранить в кэше
  cache.set(cacheKey, result);

  return result;
}
```

### Пулинг соединений

Для высокопроизводительных приложений:

```typescript
import { Agent } from 'https';

// Создать постоянный пул соединений
const httpsAgent = new Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 30000
});

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  // Передать агента в конфигурацию Axios (если SDK поддерживает)
  httpAgent: httpsAgent
});
```

### Дедупликация запросов

Предотвратите дублирующиеся одновременные запросы:

```typescript
const pendingRequests = new Map<string, Promise<any>>();

async function deduplicatedRequest<T>(
  key: string,
  operation: () => Promise<T>
): Promise<T> {
  // Вернуть существующий promise, если запрос выполняется
  if (pendingRequests.has(key)) {
    logger.debug('Дедупликация запроса', { key });
    return pendingRequests.get(key)!;
  }

  // Выполнить новый запрос
  const promise = operation().finally(() => {
    pendingRequests.delete(key);
  });

  pendingRequests.set(key, promise);
  return promise;
}

// Использование
const categories = await deduplicatedRequest(
  'categories:all',
  () => sdk.products.getParentAll()
);
```

### Мониторинг производительности

Отслеживайте ключевые метрики производительности:

```typescript
// Отслеживать время операций
async function timedOperation<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  try {
    const result = await operation();
    const duration = Date.now() - start;

    logger.info('Операция завершена', {
      operation: name,
      duration,
      success: true
    });

    return result;
  } catch (error) {
    const duration = Date.now() - start;

    logger.error('Операция не удалась', {
      operation: name,
      duration,
      success: false,
      error
    });

    throw error;
  }
}
```

**Цели производительности:**
- Время ответа API вызова p95: < 500мс
- Время ответа API вызова p99: < 1000мс
- Процент ошибок: < 1%
- Процент попаданий в кэш: > 80% (для кэшируемых операций)
- Использование памяти: Стабильное (без утечек)

**@see** [Руководство по настройке производительности](performance.md) - Детальные стратегии оптимизации

---

## Связанная документация

- **[Справочник API](/api/)** - Полная документация методов SDK
  - [WildberriesSDK](/api/classes/WildberriesSDK) - Главный класс SDK
  - [Все модули](/api/#sdk-modules) - Полный справочник модулей
  - [Классы ошибок](/api/#error-classes) - Справочник обработки ошибок
- **[Примеры](../../examples/)** - Рабочие примеры кода
  - [Калькулятор цен тарифов](../../examples/tariffs-pricing-calculator.ts) - Обработка ошибок
  - [Автоматизация промо-кампаний](../../examples/promotion-campaign-automation.ts) - Лимит запросов
  - [Интеграция нескольких модулей](../../examples/integration-product-order-finance.ts) - Кросс-модульные паттерны
- **[Начало работы](../getting-started/)** - Начальная настройка SDK
- **[Руководство по конфигурации](/ru/guides/configuration.md)** - Опции конфигурации SDK
- **[Настройка производительности](performance.md)** - Продвинутая оптимизация производительности
- **[Устранение неполадок](/ru/guides/troubleshooting.md)** - Распространенные проблемы и решения
- **[FAQ](/ru/FAQ.md)** - Часто задаваемые вопросы

---

## Краткий справочник

### Чек-лист обработки ошибок
- ✅ Используйте try-catch для всех операций SDK
- ✅ Обрабатывайте конкретные типы ошибок (проверки instanceof)
- ✅ Не повторяйте AuthenticationError или ValidationError
- ✅ Логируйте ошибки с контекстом
- ✅ Реализуйте грациозную деградацию

### Чек-лист лимита запросов
- ✅ Позвольте SDK автоматически обрабатывать лимиты запросов
- ✅ Реализуйте пакетную обработку для массовых операций
- ✅ Мониторьте события лимита запросов
- ✅ Добавляйте задержки между пакетными операциями
- ✅ Используйте кэширование для уменьшения API вызовов

### Чек-лист безопасности
- ✅ Никогда не хардкодьте API ключи
- ✅ Используйте управление секретами в production
- ✅ Ротируйте ключи ежеквартально
- ✅ Запускайте npm audit перед развертыванием
- ✅ Никогда не логируйте чувствительные данные

### Чек-лист развертывания
- ✅ Все тесты проходят
- ✅ Сканирование безопасности чистое
- ✅ Мониторинг настроен
- ✅ План отката готов
- ✅ Команда уведомлена

---

**Нужна помощь?**

- 📧 Поддержка: Проверьте [Руководство по устранению неполадок](/ru/guides/troubleshooting.md)
- 📚 Больше примеров: См. [examples/](../../examples/)
- 🐛 Сообщить о проблемах: Проверьте проблемы репозитория
- 💬 Сообщество: Проверьте обсуждения документации

---

[← Назад к руководствам](/ru/guides/index.md) | [Главная документация](../index.md)

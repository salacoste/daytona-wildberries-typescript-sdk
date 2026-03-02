---
title: Руководство по конфигурации
description: Настройка Wildberries SDK для различных окружений - базовая конфигурация, лимит запросов, логика повторов, логирование и пользовательские клиенты
layout: doc
---

# Руководство по конфигурации

Полное руководство по настройке Wildberries TypeScript SDK для различных окружений и сценариев использования.

## Содержание

- [Обзор](#обзор)
- [Базовая конфигурация](#базовая-конфигурация)
- [Конфигурация для конкретных окружений](#конфигурация-для-конкретных-окружений)
- [Расширенная конфигурация](#расширенная-конфигурация)
- [Конфигурация таймаута](#конфигурация-таймаута)
- [Конфигурация лимита запросов](#конфигурация-лимита-запросов)
- [Конфигурация повторных попыток](#конфигурация-повторных-попыток)
- [Конфигурация логирования](#конфигурация-логирования)
- [Лучшие практики конфигурации](#лучшие-практики-конфигурации)

## Обзор

SDK предоставляет гибкие опции конфигурации для адаптации к различным окружениям, требованиям производительности и операционным потребностям.

### Интерфейс конфигурации

```typescript
interface SDKConfig {
  // Обязательное
  apiKey: string;

  // Опциональные переопределения
  baseUrls?: Partial<Record<string, string>>;
  timeout?: number;
  retryConfig?: RetryConfig;
  rateLimitConfig?: RateLimitConfig;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}
```

**Справочник API:** См. [SDKConfig](/api/interfaces/SDKConfig) для полной документации интерфейса конфигурации со всеми доступными опциями.

## Базовая конфигурация

### Минимальная настройка

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

### Стандартная настройка

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000, // 30 секунд
  logLevel: 'warn'
});
```

### Полная конфигурация

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  // Конфигурация таймаута
  timeout: 30000,

  // Конфигурация повторов
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  },

  // Лимит запросов
  rateLimitConfig: {
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  },

  // Логирование
  logLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
});
```

## Конфигурация для конкретных окружений

### Окружение разработки

```typescript
// config/development.ts
export const developmentConfig = {
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000, // Более длинный таймаут для отладки
  logLevel: 'debug' as const,
  retryConfig: {
    maxRetries: 1, // Быстрый провал в разработке
    retryDelay: 500,
    exponentialBackoff: false,
  }
};
```

### Окружение продакшн

```typescript
// config/production.ts
export const productionConfig = {
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000,
  logLevel: 'warn' as const,

  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,
  },

  rateLimitConfig: {
    requestsPerSecond: 8, // Консервативный лимит
    requestsPerMinute: 80,
  }
};
```

### Окружение тестирования

```typescript
// config/test.ts
export const testConfig = {
  apiKey: 'test-api-key',
  timeout: 5000, // Короткий таймаут для тестов
  logLevel: 'error' as const,

  retryConfig: {
    maxRetries: 0, // Без повторов в тестах
    retryDelay: 0,
    exponentialBackoff: false,
  }
};
```

### Фабрика конфигураций

```typescript
// config/index.ts
import { developmentConfig } from './development';
import { productionConfig } from './production';
import { testConfig } from './test';

export function getConfig() {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    default:
      return developmentConfig;
  }
}

// Использование
import { getConfig } from './config';
const sdk = new WildberriesSDK(getConfig());
```

## Расширенная конфигурация

### Динамическая конфигурация

```typescript
class ConfigurableSDK {
  private sdk: WildberriesSDK;
  private config: SDKConfig;

  constructor(initialConfig: SDKConfig) {
    this.config = initialConfig;
    this.sdk = new WildberriesSDK(this.config);
  }

  updateConfig(updates: Partial<SDKConfig>) {
    this.config = { ...this.config, ...updates };
    this.sdk = new WildberriesSDK(this.config);
  }

  getSDK(): WildberriesSDK {
    return this.sdk;
  }
}

// Использование
const configurableSDK = new ConfigurableSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000
});

// Позже, обновление конфигурации
configurableSDK.updateConfig({
  timeout: 60000,
  logLevel: 'debug'
});
```

### Флаги функций

```typescript
interface FeatureFlags {
  enableCaching: boolean;
  enableMetrics: boolean;
  enableRetry: boolean;
  enableRateLimiting: boolean;
}

class FeatureFlagSDK {
  private sdk: WildberriesSDK;
  private flags: FeatureFlags;

  constructor(config: SDKConfig, flags: FeatureFlags) {
    this.flags = flags;

    this.sdk = new WildberriesSDK({
      ...config,
      retryConfig: flags.enableRetry ? config.retryConfig : {
        maxRetries: 0,
        retryDelay: 0,
        exponentialBackoff: false,
      }
    });
  }

  async getWithFeatures<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    if (this.flags.enableCaching) {
      // Сначала проверить кэш
    }

    if (this.flags.enableMetrics) {
      // Отслеживать метрики
    }

    return operation();
  }
}
```

### Мультитенантная конфигурация

```typescript
class MultiTenantSDK {
  private sdkInstances = new Map<string, WildberriesSDK>();

  getSDK(tenantId: string): WildberriesSDK {
    if (!this.sdkInstances.has(tenantId)) {
      const config = this.getConfigForTenant(tenantId);
      this.sdkInstances.set(
        tenantId,
        new WildberriesSDK(config)
      );
    }

    return this.sdkInstances.get(tenantId)!;
  }

  private getConfigForTenant(tenantId: string): SDKConfig {
    return {
      apiKey: process.env[`WB_API_KEY_${tenantId}`]!,
      timeout: 30000,
      logLevel: 'warn',
    };
  }
}
```

## Конфигурация таймаута

### Глобальный таймаут

Установите таймаут по умолчанию для всех запросов:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000, // 60 секунд для всех запросов
});
```

Таймаут по умолчанию — **30 секунд** (30000мс). Увеличьте для окружений с медленной сетью или при работе с большими наборами данных.

### Таймаут для отдельного запроса

Переопределите глобальный таймаут для отдельных запросов, которым нужно больше (или меньше) времени:

```typescript
// Для длительных операций увеличьте глобальный таймаут:
const sdkForReports = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 120000, // 2 минуты для генерации отчетов
});

// Скачивание сгенерированного файла аналитического отчета
const reportFile = await sdkForReports.analytics.getDownloadsFile(downloadId);
```

`timeout` в `SDKConfig` применяется ко всем запросам данного экземпляра SDK. Каждая попытка повтора использует таймаут индивидуально (не кумулятивно).

### Взаимодействие таймаута и повторов

Когда запрос истекает по таймауту, SDK автоматически повторяет его (до `maxRetries` раз). Каждая попытка повтора получает полную длительность таймаута:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000,        // 30с на попытку
  retryConfig: {
    maxRetries: 3,        // До 3 повторов после начальной попытки
    retryDelay: 1000,     // Базовая задержка 1с между повторами
    exponentialBackoff: true,
  },
});

// Худший случай: 30с + 1с + 30с + 2с + 30с + 4с + 30с = ~127 секунд всего
```

> **Совет:** Если вы видите ошибки `ETIMEDOUT`, увеличьте глобальный таймаут или используйте таймаут для отдельного запроса для конкретных медленных операций. Установите `logLevel: 'info'` для просмотра попыток повтора в консоли.

## Конфигурация лимита запросов

SDK предоставляет гибкую конфигурацию лимита запросов для предотвращения исчерпания квот API и обеспечения надежной работы.

**Справочник API:** См. [RateLimitConfig](/api/interfaces/RateLimitConfig) для полных опций конфигурации лимита запросов.

### Глобальные лимиты запросов

`rateLimitConfig` принимает два параметра, которые применяются глобально ко всем эндпоинтам. Лимиты для конкретных эндпоинтов автоматически применяются SDK на основе OpenAPI спецификаций.

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  rateLimitConfig: {
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  }
});
```

> **Примечание:** Лимиты для конкретных эндпоинтов (например, 3 запроса/минуту для создания товара) извлекаются из OpenAPI спецификаций и применяются автоматически через `rateLimitKey` в каждом методе модуля. Глобальный `rateLimitConfig` устанавливает верхнюю границу для всех эндпоинтов.

### Пользовательский ограничитель запросов

```typescript
import { RateLimiter } from 'daytona-wildberries-typescript-sdk/client';

const customLimiter = new RateLimiter({
  requestsPerMinute: 60,
  intervalSeconds: 10,
  burstLimit: 10,
});

// Использование с операциями SDK
await customLimiter.waitForSlot('custom');
const result = await sdk.products.getProductList({ limit: 100 });
```

## Конфигурация повторных попыток

Настройте автоматическое поведение повторов для неудачных API запросов с поддержкой экспоненциальной задержки.

**Справочник API:** См. [RetryConfig](/api/-internal-/interfaces/RetryConfig) и [RetryHandler](/api/-internal-/classes/RetryHandler) для полной документации механизма повторов.

### Базовая настройка повторов

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000, // Базовая задержка 1 секунда
    exponentialBackoff: true, // 1с, 2с, 4с, 8с...
  }
});
```

### Пользовательская логика повторов

`retryConfig` SDK поддерживает три поля: `maxRetries`, `retryDelay` и `exponentialBackoff`. SDK автоматически повторяет запросы при временных сбоях (ошибки сети, 5xx, 429) и никогда не повторяет при ошибках аутентификации (401/403) или валидации (400/422).

```typescript
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  exponentialBackoff: boolean;
}

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,
  }
});
```

> **Примечание:** Установите `logLevel: 'info'` для просмотра попыток повтора в консоли, или `logLevel: 'debug'` для полного контекста повторов, включая тип ошибки и статус-код.

### Условный повтор

```typescript
class SmartRetrySDK {
  private sdk: WildberriesSDK;

  async executeWithSmartRetry<T>(
    operation: () => Promise<T>,
    options: {
      critical: boolean;
      maxRetries?: number;
    }
  ): Promise<T> {
    const maxRetries = options.critical ? 10 : 3;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;

        // Не повторять при ошибках аутентификации
        if (error instanceof AuthenticationError) throw error;

        // Более длинная задержка для критичных операций
        const delay = options.critical
          ? 5000 * Math.pow(2, attempt)
          : 1000 * Math.pow(2, attempt);

        await sleep(delay);
      }
    }

    throw new Error('Превышено максимальное количество повторов');
  }
}
```

## Конфигурация логирования

### Уровни логирования

```typescript
// debug: Все операции SDK, полный контекст повторов
// info: Попытки повтора, важные операции
// warn: Таймауты, исчерпание повторов, предупреждения (рекомендуется для продакшн)
// error: Только ошибки

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error' || 'warn'
});
```

### Что показывает каждый уровень логирования

| Событие | `debug` | `info` | `warn` | `error` |
|---------|---------|--------|--------|---------|
| Попытка повтора (URL, номер попытки, задержка) | Да | Да | — | — |
| Полный контекст повтора (тип ошибки, статус-код, isTimeout) | Да | — | — | — |
| Таймаут запроса (URL, длительность) | Да | Да | Да | — |
| Все повторы исчерпаны | Да | Да | Да | — |
| Ошибки сети | Да | Да | Да | Да |

> **Совет:** Используйте `logLevel: 'info'` для просмотра попыток повтора и предупреждений о таймауте без шума debug-уровня. Используйте `logLevel: 'debug'` при диагностике ошибок `ETIMEDOUT` для полного контекста каждого повтора.

### Интеграция логирования

SDK использует собственный внутренний экземпляр Axios, управляемый `BaseClient`. Используйте опцию `logLevel` для управления выводом логов SDK:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: 'debug', // Видеть все запросы, ответы и контекст повторов
});
```

> **Примечание:** SDK не поддерживает внедрение пользовательского `httpClient`. `BaseClient` управляет собственным экземпляром Axios внутренне. Используйте `logLevel` для наблюдения за операциями SDK.

## HTTP клиент

SDK управляет собственным внутренним экземпляром Axios через `BaseClient`. Опция `httpClient` в `SDKConfig` отсутствует -- HTTP клиент не заменяется пользователем. SDK обрабатывает управление соединениями, заголовки аутентификации, таймаут, повторы и лимиты запросов внутренне.

> **Примечание:** Если вам нужна поддержка прокси или пользовательская конфигурация TLS, настройте это на уровне ОС/окружения (например, переменные окружения `HTTP_PROXY` / `HTTPS_PROXY`) вместо SDK.

## Лучшие практики конфигурации

### ✅ Следует

- Хранить API ключи в переменных окружения
- Использовать разные конфигурации для разных окружений
- Устанавливать подходящие таймауты для вашего случая
- Включать логику повторов для продакшн
- Использовать консервативные лимиты запросов
- Логировать на подходящих уровнях (warn/error в продакшн)
- Валидировать конфигурацию при запуске
- Документировать пользовательские конфигурации

### ❌ Не следует

- Жестко кодировать API ключи в конфигурации
- Использовать конфигурацию разработки в продакшн
- Отключать логику повторов для "улучшения скорости"
- Устанавливать слишком низкие таймауты (вызывает ложные провалы)
- Игнорировать лимиты запросов
- Включать debug логирование в продакшн
- Делиться конфигурационными файлами, содержащими секреты
- Изменять настройки SDK по умолчанию без понимания последствий

## Валидация конфигурации

```typescript
import { z } from 'zod';

const ConfigSchema = z.object({
  apiKey: z.string().min(10),
  timeout: z.number().min(1000).max(120000),
  retryConfig: z.object({
    maxRetries: z.number().min(0).max(10),
    retryDelay: z.number().min(100).max(10000),
    exponentialBackoff: z.boolean(),
  }).optional(),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).optional(),
});

function createSDK(config: unknown): WildberriesSDK {
  const validatedConfig = ConfigSchema.parse(config);
  return new WildberriesSDK(validatedConfig);
}
```

## Справочник переменных окружения

```bash
# Обязательные
WB_API_KEY=your_api_key_here

# Опциональные
WB_API_TIMEOUT=30000
WB_API_MAX_RETRIES=3
WB_API_RETRY_DELAY=1000
WB_API_LOG_LEVEL=warn

# Лимит запросов
WB_RATE_LIMIT_PER_SECOND=10
WB_RATE_LIMIT_PER_MINUTE=100
```

## Связанная документация

- **[Справочник API](/api/)** - Полная документация SDK
  - [SDKConfig](/api/interfaces/SDKConfig) - Основной интерфейс конфигурации
  - [RetryConfig](/api/-internal-/interfaces/RetryConfig) - Конфигурация повторов
  - [RateLimitConfig](/api/interfaces/RateLimitConfig) - Конфигурация лимита запросов
  - [WildberriesSDK](/api/classes/WildberriesSDK) - Основной класс SDK
- **[Руководство по лучшим практикам](/ru/guides/best-practices.md)** - Паттерны развертывания в продакшн
- **[Руководство по безопасности](/ru/guides/security.md)** - Практики безопасной конфигурации
- **[Руководство по производительности](/ru/guides/performance.md)** - Оптимизация производительности
- **[Начало работы](/ru/getting-started/quickstart)** - Руководство по первоначальной настройке

## Поддержка

По вопросам конфигурации:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Документация](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)

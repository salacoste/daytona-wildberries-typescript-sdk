---
title: FAQ
description: Часто задаваемые вопросы о Wildberries SDK - установка, аутентификация, использование API, обработка ошибок и устранение неполадок
layout: doc
---

# Часто задаваемые вопросы (FAQ)

**Быстрая навигация:** [Начало работы](#начало-работы) | [Аутентификация](#аутентификация-и-конфигурация) | [Использование API](#использование-api) | [Обработка ошибок](#обработка-ошибок) | [Лимит запросов](#лимит-запросов-и-производительность) | [Продвинутые темы](#продвинутые-темы) | [Устранение неполадок](#устранение-неполадок)

---

## Начало работы

### 1. Как установить Wildberries SDK?

Установите через npm:

```bash
npm install daytona-wildberries-typescript-sdk
```

Для TypeScript проектов убедитесь, что у вас установлен TypeScript ≥5.0:

```bash
npm install --save-dev typescript@^5.0.0
```

**Смотрите также:** [Руководство по быстрому старту](/ru/getting-started/quickstart.md)

---

### 2. Каковы минимальные требования для использования SDK?

- **Node.js:** 18.x, 20.x или 22.x LTS
- **TypeScript:** 5.0+ (для TypeScript проектов)
- **Wildberries API ключ:** Необходим для аутентификации

**Совместимость:** Работает с обеими системами модулей ESM и CommonJS.

---

### 3. Как получить API ключ Wildberries?

1. Войдите в свой аккаунт продавца Wildberries
2. Перейдите в **Настройки** → **Доступ к API**
3. Сгенерируйте новый API ключ с необходимыми разрешениями
4. Скопируйте и надежно сохраните ваш API ключ

**⚠️ Безопасность:** Никогда не коммитьте API ключи в систему контроля версий. Используйте переменные окружения или защищенные хранилища.

**Смотрите также:** [Руководство по аутентификации](/ru/getting-started/quickstart.md#authentication)

---

### 4. Как инициализировать SDK?

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Инициализация SDK с API ключом
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY // или ваш API ключ
});

// Проверка соединения
const ping = await sdk.general.ping();
console.log(ping); // { Status: 'OK', TS: '2024-12-03T15:22:47Z' }
```

**Лучшая практика:** Храните API ключи в переменных окружения, а не в исходном коде.

**Смотрите также:** [Руководство по быстрому старту](/ru/getting-started/quickstart.md#initialization)

---

### 5. Могу ли я использовать SDK с JavaScript (без TypeScript)?

Да! SDK работает с обычным JavaScript:

```javascript
const { WildberriesSDK } = require('daytona-wildberries-typescript-sdk');

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});
```

**Примечание:** Вы потеряете автозавершение TypeScript и типобезопасность, но вся функциональность будет работать.

---

## Аутентификация и конфигурация

### 6. Как настроить пользовательские таймауты?

**Глобальный таймаут** — применяется ко всем запросам:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  timeout: 60000 // 60 секунд (по умолчанию: 30000)
});
```

**Таймаут для отдельного запроса** — `BaseClient` SDK поддерживает таймаут для каждого запроса через `RequestOptions`. Методы модулей используют глобальный таймаут по умолчанию. Для операций, которые могут занять больше времени, увеличьте глобальный таймаут:

```typescript
// Для длительных операций используйте увеличенный глобальный таймаут
const sdkWithLongTimeout = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  timeout: 120000 // 2 минуты для медленной генерации отчетов
});

// Быстрая проверка использует таймаут по умолчанию
const ping = await sdk.general.ping();
```

Каждая попытка повтора использует настроенный таймаут индивидуально (не кумулятивно).

**Смотрите также:** [Руководство по конфигурации — Настройка таймаута](/ru/guides/configuration.md#конфигурация-таймаута)

---

### 7. Могу ли я переопределить базовые URL для разных окружений?

Да, вы можете переопределить базовые URL для каждого модуля:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  baseUrls: {
    products: 'https://staging-content-api.wildberries.ru',
    ordersFBS: 'https://staging-marketplace-api.wildberries.ru'
  }
});
```

**Вариант использования:** Тестирование с sandbox/staging окружениями.

---

### 8. Как настроить логику повторов?

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  retryConfig: {
    maxRetries: 5,          // По умолчанию: 3
    retryDelay: 2000,       // По умолчанию: 1000ms
    exponentialBackoff: true // По умолчанию: true
  }
});
```

**Смотрите также:** [Руководство по обработке ошибок](/ru/guides/troubleshooting.md#retry-logic)

---

### 9. Как включить логирование отладки?

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  logLevel: 'debug' // 'debug' | 'info' | 'warn' | 'error'
});
```

**Production:** Используйте `'warn'` или `'error'` для уменьшения шума.

**Смотрите также:** [Руководство по устранению неполадок](/ru/guides/troubleshooting.md#debugging)

---

### 10. Могу ли я использовать несколько API ключей для разных модулей?

Нет, SDK использует единственный API ключ для всех модулей. Если вам нужно несколько аккаунтов, создайте отдельные экземпляры SDK:

```typescript
const sellerAccount1 = new WildberriesSDK({ apiKey: KEY_1 });
const sellerAccount2 = new WildberriesSDK({ apiKey: KEY_2 });
```

---

## Использование API

### 11. Как получить категории товаров?

```typescript
const categories = await sdk.products.getParentAll();
console.log(categories.data); // Массив объектов категорий
```

**Смотрите также:** [Пример управления товарами](../examples/products-crud.ts)

---

### 12. Как создать новый товар?

```typescript
import type { CreateProductRequest } from 'daytona-wildberries-typescript-sdk';

const newProduct: CreateProductRequest = {
  brandName: 'MyBrand',
  categoryId: '12345',
  title: 'Название товара',
  description: 'Описание товара',
  characteristics: [
    { id: 'size', value: 'L' },
    { id: 'color', value: 'Red' }
  ]
};

const result = await sdk.products.createCardsUpload(newProduct);
console.log(result.nmId); // ID нового товара
```

**Примечание:** Создание товара имеет строгие лимиты запросов (1 запрос за 10 секунд).

**Смотрите также:** [Полный рабочий процесс товара](../examples/complete-product-workflow.ts)

---

### 13. Как получить новые заказы (FBS)?

```typescript
const result = await sdk.ordersFBS.getOrdersNew();

for (const order of result.orders ?? []) {
  console.log(`Заказ ${order.id}: ${order.supplierStatus}`);
}
```

**Смотрите также:** [Пример выполнения заказов](../examples/README.md#order-fulfillment-fbs)

---

### 14. Как проверить статус заказа?

```typescript
const result = await sdk.ordersFBS.getOrderStatuses({
  orders: [12345]
});

result.orders?.forEach(order => {
  console.log(`Заказ ${order.id}: ${order.supplierStatus} / ${order.wbStatus}`);
});
```

**Рабочий процесс FBS:** Создайте поставку, добавьте заказы (new -> confirm), доставьте поставку (confirm -> complete), или отмените заказ через `updateOrdersCancel()`.

**Смотрите также:** [Рабочий процесс статусов заказов](/ru/guides/best-practices.md#order-management)

---

### 15. Как проверить баланс моего счета?

```typescript
const balance = await sdk.finances.getAccountBalance();
console.log(`Текущий баланс: ${balance.amount} RUB`);
```

**Смотрите также:** [Пример финансовых операций](../examples/finances-balance-transactions.ts)

---

### 16. Как получить аналитику продаж?

```typescript
// v3 Sales Funnel API (SDK v2.7.0+)
const result = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  orderBy: { field: 'orderCount', mode: 'desc' },
  limit: 10,
  offset: 0,
});

result.products?.forEach(p => {
  console.log(`Товар ${p.product.nmId}: ${p.statistic.selected.orderCount} заказов`);
});
```

> **Примечание:** До версии v2.7.0 SDK использовал `createNmReportDetail()`, который вызывал v2 endpoint. Этот endpoint теперь возвращает 404. См. [Руководство по миграции Analytics v3](/guides/migration-v2.7-analytics-v3).

**Смотрите также:** [Руководство по панели аналитики](/getting-started/tutorials/analytics-dashboard)

---

### 17. Как сгенерировать и скачать отчеты?

Отчеты используют асинхронный паттерн (запрос → опрос → загрузка). Пример с отчетом об остатках на складах:

```typescript
// Шаг 1: Запросить генерацию отчета
const task = await sdk.reports.warehouseRemains({
  groupByBrand: true,
  groupBySubject: true
});
const taskId = task.data?.taskId;

// Шаг 2: Опросить статус выполнения
let status = await sdk.reports.getWarehouseRemainsTaskStatus(taskId);
while (status.data?.status === 'new') {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Ждать 5с
  status = await sdk.reports.getWarehouseRemainsTaskStatus(taskId);
}

// Шаг 3: Скачать завершенный отчет
if (status.data?.status === 'done') {
  const data = await sdk.reports.downloadWarehouseRemainsReport(taskId);
  console.log(data); // Массив элементов остатков на складах
}
```

**Смотрите также:** [Пример отчетов](../examples/finances-reports-payouts.ts)

---

### 18. Как работать с коммуникациями с клиентами (отзывы, Q&A)?

```typescript
// Получить неотвеченные вопросы
const questions = await sdk.communications.questions({
  isAnswered: false,
  take: 10,
  skip: 0
});

// Ответить на вопрос
await sdk.communications.updateQuestion({
  id: '12345',
  answer: { text: 'Спасибо за ваш вопрос...' },
  state: 'wbRu'
});

// Получить отзывы
const reviews = await sdk.communications.feedbacks({
  isAnswered: false,
  take: 10,
  skip: 0
});
```

**Смотрите также:** [Пример взаимодействия с клиентами](../examples/communications-customer-engagement.ts)

---

### 19. Могу ли я использовать SDK с async/await или Promises?

Да, все методы SDK возвращают Promises и работают с async/await:

```typescript
// Async/await (рекомендуется)
const balance = await sdk.finances.getAccountBalance();

// Цепочки Promise
sdk.finances.getAccountBalance()
  .then(balance => console.log(balance))
  .catch(error => console.error(error));
```

---

### 20. Как обрабатывать пагинацию?

Разные API используют разные методы пагинации:

**На основе курсора (товары):**
```typescript
const products = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    sort: { ascending: false }
  }
});

console.log(`Всего: ${products.cursor?.total}`);
```

**На основе курсора (FBS заказы):**
```typescript
const result = await sdk.ordersFBS.orders({
  limit: 1000,
  next: 0        // 0 для первой страницы, затем значение из response.next
});

// Следующая страница
const nextPage = await sdk.ordersFBS.orders({
  limit: 1000,
  next: result.next  // Курсор из предыдущего ответа
});
```

**Смотрите также:** [Паттерны пагинации](/ru/guides/best-practices.md#pagination)

---

## Обработка ошибок

### 21. Как обрабатывать ошибки в SDK?

Используйте классы ошибок TypeScript с `instanceof`:

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError
} from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.products.createCardsUpload(data);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Недействительный API ключ:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Недействительные данные:', error.fieldErrors);
  } else if (error instanceof RateLimitError) {
    console.error(`Превышен лимит запросов. Повторите после ${error.retryAfter}ms`);
  } else if (error instanceof NetworkError) {
    console.error('Ошибка сети:', error.message);
  }
}
```

**Смотрите также:** [Руководство по обработке ошибок](/ru/guides/troubleshooting.md#error-handling)

---

### 22. Что означает "AuthenticationError: Invalid API key"?

**Причины:**
- API ключ неверен или истек
- API ключ не имеет необходимых разрешений
- API ключ неправильно отформатирован

**Решения:**
1. Проверьте API ключ в портале продавца Wildberries
2. Убедитесь, что переменные окружения загружены правильно
3. Убедитесь, что API ключ имеет необходимые области действия
4. Пересоздайте API ключ, если он истек

**Смотрите также:** [Устранение неполадок аутентификации](/ru/guides/troubleshooting.md#authentication-errors)

---

### 23. Как отладить "ValidationError: Missing required field"?

Проверьте свойство `fieldErrors` для конкретных проблем с полями:

```typescript
try {
  await sdk.products.createCardsUpload(data);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Ошибки полей:', error.fieldErrors);
    // Пример: { brandName: 'Отсутствует обязательное поле' }
  }
}
```

**Смотрите также:** [Руководство по ошибкам валидации](/ru/guides/troubleshooting.md#validation-errors)

---

### 24. Что происходит, когда я достигаю лимитов запросов?

SDK автоматически обрабатывает лимиты запросов:

1. **Обнаружение:** SDK обнаруживает ответ 429
2. **Ожидание:** Автоматически ожидает период повтора
3. **Повтор:** Повторяет запрос после задержки
4. **Выброс:** Если превышено максимальное количество повторов, выбрасывает `RateLimitError`

**Ручная обработка:**
```typescript
try {
  await sdk.products.createCardsUpload(data);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Подождите ${error.retryAfter}ms перед повтором`);
  }
}
```

**Смотрите также:** [Руководство по лимиту запросов](#лимит-запросов-и-производительность)

---

## Лимит запросов и производительность

### 25. Каковы лимиты запросов для разных API?

Лимиты запросов варьируются в зависимости от конечной точки:

| Модуль API | Типичный лимит | Примечания |
|------------|----------------|------------|
| Products (create) | 1 запрос/10с | Самый строгий лимит |
| Products (read) | 3 запроса/мин | Запросы категорий |
| Orders | 5 запросов/мин | Получение заказов FBS/FBW |
| Finances | 10 запросов/мин | Баланс, транзакции |
| Analytics | 5 запросов/мин | Запросы производительности |
| Reports (CSV export) | 1 запрос/2мин | Экспорт больших данных |

**Смотрите также:** [Руководство по производительности](/ru/guides/performance-tuning.md#rate-limits)

---

### 26. Как оптимизировать производительность SDK?

**Лучшие практики:**

1. **Пакетные операции:** Группируйте несколько операций, где возможно
2. **Кэширование:** Кэшируйте часто запрашиваемые данные (категории, тарифы)
3. **Пагинация:** Используйте соответствующие размеры страниц (50-100 элементов)
4. **Одновременные запросы:** Используйте `Promise.all()` для независимых вызовов
5. **Пулинг соединений:** Переиспользуйте экземпляр SDK для всех запросов

**Пример:**
```typescript
// ❌ Плохо: Последовательные запросы
const categories = await sdk.products.getParentAll();
const balance = await sdk.finances.getAccountBalance();

// ✅ Хорошо: Параллельные запросы
const [categories, balance] = await Promise.all([
  sdk.products.getParentAll(),
  sdk.finances.getAccountBalance()
]);
```

**Смотрите также:** [Руководство по настройке производительности](/ru/guides/performance-tuning.md)

---

### 27. Поддерживает ли SDK пулинг соединений?

Да, SDK автоматически переиспользует HTTP соединения через встроенный пулинг соединений Axios. Просто переиспользуйте тот же экземпляр SDK:

```typescript
// ✅ Хорошо: Переиспользование экземпляра
const sdk = new WildberriesSDK({ apiKey });

for (const order of orders) {
  await sdk.ordersFBS.updateOrdersCancel(order.id);
}

// ❌ Плохо: Создание нового экземпляра для каждого запроса
for (const order of orders) {
  const sdk = new WildberriesSDK({ apiKey }); // Не делайте так!
  await sdk.ordersFBS.updateOrdersCancel(order.id);
}
```

---

## Продвинутые темы

### 28. Могу ли я использовать SDK в serverless окружениях (AWS Lambda, Vercel)?

Да! SDK работает в serverless окружениях:

```typescript
// Обработчик AWS Lambda
export const handler = async (event) => {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY,
    timeout: 25000 // Таймаут Lambda - 5с буфер
  });

  const orders = await sdk.ordersFBS.getOrdersNew();
  return { statusCode: 200, body: JSON.stringify(orders) };
};
```

**Совет:** Прогревайте соединения, инициализируя SDK вне обработчика для лучшей производительности.

---

### 29. Как имитировать SDK для тестирования?

Используйте внедрение зависимостей и имитируйте экземпляр SDK:

```typescript
// jest.mock() или Vitest mock
import { vi } from 'vitest';

const mockSDK = {
  products: {
    getCardsList: vi.fn().mockResolvedValue({ data: [], total: 0 })
  }
};

// В вашем тесте
const result = await mockSDK.products.getCardsList();
expect(result.data).toEqual([]);
```

**Смотрите также:** [Лучшие практики тестирования](/ru/guides/best-practices.md#testing)

---

### 30. Могу ли я расширить SDK пользовательской функциональностью?

Да, вы можете расширить модули или обернуть SDK:

```typescript
class CustomProductsService {
  constructor(private sdk: WildberriesSDK) {}

  async createProductWithRetry(data: CreateProductRequest, maxAttempts = 3) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await this.sdk.products.createCardsUpload(data);
      } catch (error) {
        if (i === maxAttempts - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
}
```

---

### 31. Как обрабатывать webhook события от Wildberries?

SDK не включает обработку webhook (он основан на HTTP запросах). Для webhooks используйте веб-фреймворк:

```typescript
import express from 'express';

const app = express();

app.post('/webhooks/wildberries', async (req, res) => {
  const event = req.body;

  // Проверьте подпись webhook (реализуйте на основе документации WB)
  // Обработайте событие
  if (event.type === 'order.created') {
    const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY });
    const result = await sdk.ordersFBS.getOrderStatuses({
      orders: [event.orderId]
    });
    console.log('Order status:', result.orders?.[0]?.supplierStatus);
  }

  res.status(200).send('OK');
});
```

---

## Устранение неполадок

### 32. Почему я получаю ошибки "Network timeout" или ETIMEDOUT?

**Причины:**
- Медленное сетевое соединение
- API Wildberries испытывает высокую нагрузку
- Таймаут настроен слишком низко (по умолчанию 30 секунд)

**Решения:**

1. **Увеличьте глобальный таймаут:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY,
     timeout: 60000 // 60 секунд
   });
   ```

2. **Создайте отдельный экземпляр SDK для медленных операций:**
   ```typescript
   const sdkSlow = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY,
     timeout: 120000 // 2 минуты для медленных вызовов отчетов
   });
   const report = await sdkSlow.analytics.getNmReportDownloads();
   ```

3. **Включите info-уровень логирования для просмотра попыток повтора:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY,
     logLevel: 'info' // Показывает попытки повтора и предупреждения о таймауте
   });
   ```

4. Проверьте сетевое подключение
5. Повторите с экспоненциальной задержкой (SDK обрабатывает это автоматически)

**Смотрите также:** [Руководство по конфигурации — Настройка таймаута](/ru/guides/configuration.md#конфигурация-таймаута) | [Ошибки сети](/ru/guides/troubleshooting.md#network-errors)

---

### 33. Мои запросы очень медленные. Как диагностировать проблему?

Включите логирование отладки, чтобы увидеть время запроса/ответа:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  logLevel: 'debug'
});

await sdk.products.getCardsList(); // Проверьте консоль для логов времени
```

**Распространенные причины:**
- Лимит запросов (SDK ожидает слоты)
- Большие полезные нагрузки ответов
- Задержка сети
- Время обработки на стороне сервера

**Смотрите также:** [Диагностика производительности](/ru/guides/performance-tuning.md#diagnostics)

---

### 34. Как сообщить об ошибках или запросить функции?

1. **Проверьте существующие проблемы:** [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
2. **Создайте новую проблему:** Используйте шаблоны проблем
3. **Предоставьте детали:**
   - Версия SDK
   - Версия Node.js
   - Фрагмент кода, воспроизводящий проблему
   - Сообщения об ошибках и трассировки стека

**Смотрите также:** [Руководство по внесению вклада](../CONTRIBUTING.md)

---

### 35. Где я могу найти полные примеры кода?

- **Каталог примеров:** [examples/](../examples/)
- **Быстрый старт:** [getting-started/quickstart.md](/ru/getting-started/quickstart.md)
- **Примеры интеграции:**
  - [CRUD товаров](../examples/products-crud.ts)
  - [Выполнение заказов](../examples/README.md#order-fulfillment-fbs)
  - [Финансовые операции](../examples/finances-balance-transactions.ts)
  - [Коммуникации с клиентами](../examples/communications-customer-engagement.ts)

---

## Дополнительные ресурсы

- **[Руководство по быстрому старту](/ru/getting-started/quickstart.md)** - Начните работу за 5 минут
- **[Справочник API](/api/)** - Полная документация TypeDoc
- **[Лучшие практики](/ru/guides/best-practices.md)** - Паттерны, готовые к production
- **[Руководство по устранению неполадок](/ru/guides/troubleshooting.md)** - Распространенные проблемы и решения
- **[Руководство по производительности](/ru/guides/performance-tuning.md)** - Техники оптимизации
- **[Глоссарий](/ru/GLOSSARY.md)** - Терминология Wildberries и SDK

---

**Нужна дополнительная помощь?**
- 📖 [Документация](README.md)
- 🐛 [Сообщить о проблеме](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- 💬 [Обсуждения](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

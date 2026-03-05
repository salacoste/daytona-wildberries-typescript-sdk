---
title: Определение подписки Джем
description: Определение тарифа подписки Джем (Jam) через SDK с помощью пробных запросов
layout: doc
---

# Определение подписки Джем

## Что такое Джем

Джем — это тарифная подписка Wildberries для продавцов. Разные тарифы открывают повышенные лимиты на аналитических конечных точках:

| Тариф | Лимит поисковых запросов |
|-------|--------------------------|
| **Нет подписки** | Аналитические конечные точки поисковых запросов недоступны |
| **Стандартный** | До 30 поисковых запросов |
| **Продвинутый** | До 50 поисковых запросов |

---

## Проблема

WB не предоставляет прямой конечной точки API для проверки статуса подписки Джем. Продавцам необходимо знать свой тариф, чтобы корректно задавать значение `limit` при вызове аналитических методов.

---

## Решение — определение через пробные запросы

Метод `sdk.general.getJamSubscriptionStatus({ nmIds: [yourNmId] })` использует стратегию пробных запросов:

1. **Проба 1** — Запрос с `limit: 31` (выше максимума Стандартного тарифа = 30)
   - **200** — Продвинутый тариф
   - **400** — Не Продвинутый, продолжаем проверку
2. **Проба 2** — Запрос с `limit: 1`
   - **200** — Стандартный тариф
   - **400** — Подписка Джем отсутствует

Ошибки аутентификации, превышения лимитов запросов и сетевые ошибки пробрасываются вызывающему коду.

::: tip Как это работает
Метод отправляет пробный запрос к конечной точке аналитики поисковых запросов. Если сервер принимает `limit: 31`, значит тариф — Продвинутый. Если отклоняет — проверяем `limit: 1`, чтобы отличить Стандартный от отсутствия подписки.
:::

---

## Сигнатура метода

```typescript
async getJamSubscriptionStatus(
  params: GetJamSubscriptionStatusParams
): Promise<JamSubscriptionStatus>
```

### Типы

```typescript
type JamSubscriptionTier = 'none' | 'standard' | 'advanced';

interface JamSubscriptionStatus {
  /** Обнаруженный тариф подписки */
  tier: JamSubscriptionTier;
  /** Временная метка проверки в формате ISO 8601 */
  checkedAt: string;
  /** Количество пробных вызовов API (1 для advanced, 2 для standard/none) */
  probeCallsMade: number;
}

interface GetJamSubscriptionStatusParams {
  /** Артикулы WB (nmId) для пробного запроса */
  nmIds: number[];
}
```

---

## Лимиты запросов

Метод использует ту же квоту, что и `analytics.createProductSearchText`:

| Параметр | Значение |
|----------|----------|
| Запросов в минуту | 3 |
| Интервал | 20 секунд |
| Всплеск | 3 |

Каждый вызов `getJamSubscriptionStatus` выполняет 1-2 пробных запроса.

---

## Важные замечания

- `nmIds` должны содержать ID товаров вашего магазина — иначе API вернет `403`
- Метод расходует квоту аналитики (`analytics.createProductSearchText`)
- Результат рекомендуется кешировать — тариф подписки меняется редко
- При передаче пустого массива `nmIds` будет выброшена `ValidationError`

::: warning Внимание
Каждый вызов этого метода потребляет 1-2 запроса из квоты аналитики. Кешируйте результат на стороне приложения.
:::

---

## Примеры

### Базовое использование

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Определяем тариф подписки Джем
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [12345678] // Артикул вашего товара
});

console.log(`Тариф: ${status.tier}`);
console.log(`Проверено: ${status.checkedAt}`);
console.log(`Пробных запросов: ${status.probeCallsMade}`);

switch (status.tier) {
  case 'advanced':
    console.log('Продвинутый Джем — лимит до 50 запросов');
    break;
  case 'standard':
    console.log('Стандартный Джем — лимит до 30 запросов');
    break;
  case 'none':
    console.log('Нет подписки Джем');
    break;
}
```

### Выбор лимита для createProductSearchText

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Определяем доступный лимит по тарифу
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [12345678]
});

const limitMap: Record<string, number> = {
  advanced: 50,
  standard: 30,
  none: 0
};

const maxLimit = limitMap[status.tier];

if (maxLimit === 0) {
  console.log('Аналитика поисковых запросов недоступна без подписки Джем');
} else {
  // Используем определенный лимит для запроса аналитики
  const searchTexts = await sdk.analytics.createProductSearchText({
    nmIds: [12345678],
    limit: maxLimit
  });
  console.log(`Получено поисковых запросов: ${searchTexts.data?.length ?? 0}`);
}
```

### Кеширование результата

```typescript
import { WildberriesSDK, JamSubscriptionStatus } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Простой кеш с TTL
let cachedStatus: JamSubscriptionStatus | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 часа

async function getJamTier(): Promise<JamSubscriptionStatus> {
  // Проверяем кеш
  if (cachedStatus) {
    const elapsed = Date.now() - new Date(cachedStatus.checkedAt).getTime();
    if (elapsed < CACHE_TTL_MS) {
      return cachedStatus;
    }
  }

  // Обновляем кеш
  cachedStatus = await sdk.general.getJamSubscriptionStatus({
    nmIds: [12345678]
  });

  return cachedStatus;
}

// Использование
const tier = await getJamTier();
console.log(`Текущий тариф Джем: ${tier.tier}`);

// Повторный вызов — из кеша (без запроса к API)
const tierAgain = await getJamTier();
console.log(`Из кеша: ${tierAgain.tier}`);
```

### Обработка ошибок

```typescript
import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

try {
  const status = await sdk.general.getJamSubscriptionStatus({
    nmIds: [12345678]
  });
  console.log(`Тариф: ${status.tier}`);
} catch (error) {
  if (error instanceof ValidationError) {
    // Пустой массив nmIds или некорректные данные
    console.error('Ошибка валидации:', error.message);

  } else if (error instanceof AuthenticationError) {
    // Неверный API ключ или недостаточно прав
    console.error('Ошибка аутентификации:', error.message);

  } else if (error instanceof RateLimitError) {
    // Превышен лимит запросов — подождите и повторите
    console.error('Превышен лимит запросов. Повтор через:', error.retryAfter, 'мс');

  } else if (error instanceof NetworkError) {
    // Сетевая ошибка — проверьте соединение
    console.error('Ошибка сети:', error.message);

  } else {
    console.error('Неизвестная ошибка:', error);
  }
}
```

---

## Связанные разделы

- [Модуль General](/ru/api/classes/GeneralModule) — Все методы модуля General
- [Модуль Analytics](/ru/api/classes/AnalyticsModule) — Аналитические методы, использующие лимиты Джем
- [Настройка SDK](/ru/guides/configuration) — Конфигурация SDK
- [Лучшие практики](/ru/guides/best-practices) — Рекомендации для production-окружений

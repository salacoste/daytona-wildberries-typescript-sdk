---
title: Руководство по началу работы с модулем Promotion
description: Полное руководство по использованию модуля Promotion для управления рекламными кампаниями, ставками и поисковыми кластерами на Wildberries
layout: doc
---

# Руководство по началу работы с модулем Promotion

Это руководство охватывает всё, что нужно знать для работы с рекламными кампаниями и продвижением в TypeScript SDK для Wildberries.

> **Уведомление о миграции**: Несколько устаревших методов (кампании типа 8) помечены как deprecated и будут **отключены 2 февраля 2026 года**. Используйте методы V2 и кампании типа 9, описанные в этом руководстве. Подробности см. в [Руководстве по миграции](/guides/migration-v2.4-promotion-deprecation).

## Содержание

- [Что такое модуль Promotion?](#что-такое-модуль-promotion)
- [Основные возможности](#основные-возможности)
- [Предварительные требования](#предварительные-требования)
- [Базовое использование](#базовое-использование)
- [Управление кампаниями](#управление-кампаниями)
- [Поисковые кластеры (NormQuery)](#поисковые-кластеры-normquery)
- [Операции со ставками](#операции-со-ставками)
- [Финансы кампаний](#финансы-кампаний)
- [Статистика и аналитика](#статистика-и-аналитика)
- [Устаревшие методы](#устаревшие-методы)
- [Обработка ошибок](#обработка-ошибок)
- [Лимиты запросов](#лимиты-запросов)
- [Лучшие практики](#лучшие-практики)

## Что такое модуль Promotion?

Модуль **Promotion** обеспечивает полный контроль над рекламными кампаниями на Wildberries, включая:

- **Управление кампаниями**: Создание, запуск, приостановка, остановка и удаление рекламных кампаний
- **Ставки**: Установка и управление ставками для товаров на разных площадках (поиск, рекомендации)
- **Поисковые кластеры (NormQuery)**: Таргетирование конкретных кластеров ключевых слов с пользовательскими ставками
- **Минус-фразы**: Исключение нежелательных поисковых запросов из кампаний
- **Статистика**: Отслеживание эффективности кампаний с детальными метриками
- **Финансы**: Мониторинг баланса, бюджетов и истории расходов

## Основные возможности

| Функция | Описание | Ключевые методы |
|---------|----------|-----------------|
| **Список кампаний** | Получение всех кампаний с фильтрацией | `getAdvertsV2()`, `getPromotionCount()` |
| **Управление кампаниями** | Запуск, пауза, остановка, удаление | `getAdvStart()`, `getAdvPause()`, `getAdvStop()`, `getAdvDelete()` |
| **Ставки (V2)** | Современное управление ставками в копейках | `getBidsMinV2()`, `updateBidsV2()` |
| **Поисковые кластеры** | Таргетирование кластеров ключевых слов | `getNormqueryStats()`, `setNormqueryBids()` |
| **Минус-фразы** | Управление негативными ключевыми словами | `getNormqueryMinus()`, `setNormqueryMinus()` |
| **Финансы** | Управление балансом и бюджетом | `getAdvBalance()`, `getAdvBudget()`, `createBudgetDeposit()` |
| **Статистика** | Метрики эффективности | `getAdvFullstats()`, `getNormqueryStats()` |

## Предварительные требования

### Установка SDK

```bash
npm install daytona-wildberries-typescript-sdk
```

### Настройка API-ключа

Вам потребуется действующий API-ключ Wildberries с разрешениями на работу с рекламой. Создайте файл `.env`:

```bash
WB_API_KEY=your_api_key_here
```

### Импорт и инициализация

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

## Базовое использование

### Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  // Получаем все активные кампании через эндпоинт V2
  const campaigns = await sdk.promotion.getAdvertsV2({
    statuses: '9', // Статус 9 = активная
    payment_type: 'cpm'
  });

  console.log(`Найдено ${campaigns.adverts?.length ?? 0} активных кампаний`);

  for (const campaign of campaigns.adverts ?? []) {
    console.log(`Кампания ${campaign.advert_id}: ${campaign.name}`);
    console.log(`  Статус: ${campaign.status}`);
    console.log(`  Тип оплаты: ${campaign.payment_type}`);
  }
}

main();
```

## Управление кампаниями

### Получение списка кампаний (V2 — рекомендуется)

Используйте `getAdvertsV2()` для современного получения кампаний с фильтрацией:

```typescript
// Получаем все кампании
const allCampaigns = await sdk.promotion.getAdvertsV2();

// Фильтрация по статусу (9 = активная, 11 = на паузе)
const activeCampaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9,11'
});

// Фильтрация по конкретным ID
const specificCampaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,23456,34567'
});

// Фильтрация по типу оплаты
const cpmCampaigns = await sdk.promotion.getAdvertsV2({
  payment_type: 'cpm' // или 'cpc' для оплаты за клик
});
```

### Количество кампаний (устаревший метод)

> **Примечание**: `getPromotionCount()` является устаревшим методом. Используйте `getAdvertsV2()` вместо него.

```typescript
// Получаем количество кампаний по типам и статусам (устаревший метод)
const counts = await sdk.promotion.getPromotionCount();
console.log(`Всего кампаний: ${counts.all}`);

// Проверяем наличие кампаний типа 8, требующих миграции
const type8 = counts.adverts?.filter(a => a.type === 8);
if (type8?.length) {
  console.warn(`Внимание: ${type8.length} кампаний типа 8 требуют миграции на тип 9`);
}
```

### Управление состоянием кампаний

```typescript
const campaignId = 12345;

// Запуск кампании (должна быть в статусе 4 или 11)
await sdk.promotion.getAdvStart({ id: campaignId });
console.log('Кампания запущена');

// Приостановка активной кампании (статус 9)
await sdk.promotion.getAdvPause({ id: campaignId });
console.log('Кампания приостановлена');

// Полная остановка кампании
await sdk.promotion.getAdvStop({ id: campaignId });
console.log('Кампания остановлена');

// Удаление кампании (только в статусе 4 — готова к запуску)
await sdk.promotion.getAdvDelete({ id: campaignId });
console.log('Кампания удалена');

// Переименование кампании
await sdk.promotion.createAdvRename({
  advertId: campaignId,
  name: 'Новое название кампании'
});
```

### Управление товарами в кампаниях

```typescript
// Добавление и удаление товаров из кампаний типа 9
await sdk.promotion.updateAuctionNm({
  nms: [{
    advert_id: campaignId,
    nms: {
      add: [111111, 222222],     // Артикулы WB для добавления
      delete: [333333, 444444]   // Артикулы WB для удаления
    }
  }]
});

// Можно обновлять несколько кампаний одновременно
await sdk.promotion.updateAuctionNm({
  nms: [
    { advert_id: 12345, nms: { add: [111111] } },
    { advert_id: 23456, nms: { add: [222222] } },
    { advert_id: 34567, nms: { delete: [333333] } }
  ]
});
```

## Поисковые кластеры (NormQuery)

Поисковые кластеры (NormQuery) позволяют таргетировать конкретные группы ключевых слов с пользовательскими ставками. Это мощная функция для CPM-кампаний с ручным управлением ставками.

### Статистика поисковых кластеров

```typescript
// Получаем статистику поисковых кластеров за период
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-31',
  items: [
    { advert_id: 12345, nm_id: 983512347 },
    { advert_id: 12345, nm_id: 123456789 }
  ]
});

console.log('Статистика поисковых кластеров:');
for (const stat of stats.stats ?? []) {
  console.log(`  Кампания ${stat.advert_id}, товар ${stat.nm_id}:`);
  console.log(`    Показы: ${stat.views}`);
  console.log(`    Клики: ${stat.clicks}`);
  console.log(`    Заказы: ${stat.orders}`);
}
```

### Текущие ставки по кластерам

```typescript
// Получаем текущие ставки для поисковых кластеров
const bids = await sdk.promotion.getNormqueryBids({
  items: [
    { advert_id: 12345, nm_id: 983512347 }
  ]
});

console.log('Текущие ставки по кластерам:');
for (const item of bids.bids ?? []) {
  console.log(`Кампания ${item.advert_id}, товар ${item.nm_id}:`);
  for (const cluster of item.clusters ?? []) {
    console.log(`  "${cluster.norm_query}": ${cluster.bid} копеек`);
  }
}
```

### Установка ставок для поисковых кластеров

```typescript
// Устанавливаем пользовательские ставки для конкретных кластеров ключевых слов
// Только для CPM-кампаний с ручным управлением ставками
await sdk.promotion.setNormqueryBids({
  bids: [
    {
      advert_id: 12345,
      nm_id: 983512347,
      norm_query: 'Популярная фраза',  // Кластер ключевых слов
      bid: 1500  // Ставка в копейках (15 рублей)
    },
    {
      advert_id: 12345,
      nm_id: 983512347,
      norm_query: 'Другая фраза',
      bid: 1000  // 10 рублей
    }
  ]
});
console.log('Ставки по кластерам успешно установлены');
```

### Удаление ставок по кластерам

```typescript
// Удаляем пользовательские ставки из кластеров (возврат к ставке по умолчанию)
await sdk.promotion.deleteNormqueryBids({
  bids: [
    {
      advert_id: 12345,
      nm_id: 983512347,
      norm_query: 'Фраза для удаления',
      bid: 1000  // Указываем текущую ставку
    }
  ]
});
```

### Управление минус-фразами

```typescript
// Получаем текущие минус-фразы для кампаний
const minusPhrases = await sdk.promotion.getNormqueryMinus({
  items: [
    { advert_id: 12345, nm_id: 983512347 }
  ]
});

for (const item of minusPhrases.items ?? []) {
  console.log(`Кампания ${item.advert_id}:`);
  console.log(`  Минус-фразы: ${item.norm_queries?.join(', ')}`);
}

// Устанавливаем минус-фразы (исключают указанные ключевые слова)
// Отправка пустого массива удаляет все минус-фразы
await sdk.promotion.setNormqueryMinus({
  advert_id: 12345,
  nm_id: 983512347,
  norm_queries: ['Конкурент', 'Нежелательная фраза', 'Дешевый']
});
```

## Операции со ставками

### Минимальные ставки (V2 — копейки)

Методы V2 работают в **копейках** (1 рубль = 100 копеек) для точности:

```typescript
// Получаем минимально допустимые ставки для товаров по площадкам
const minBids = await sdk.promotion.getBidsMinV2({
  advert_id: 12345,
  nm_ids: [983512347, 123456789],
  payment_type: 'cpm',  // или 'cpc'
  placement_types: ['combined', 'search', 'recommendation']
});

console.log('Минимальные ставки:');
for (const product of minBids.bids) {
  console.log(`Товар ${product.nm_id}:`);
  for (const bid of product.bids) {
    console.log(`  ${bid.type}: ${bid.value} копеек (${bid.value / 100} рублей)`);
  }
}
```

### Обновление ставок (V2 — копейки)

```typescript
// Обновляем ставки для товаров в кампаниях
// Работает для кампаний в статусах 4, 9 и 11
const result = await sdk.promotion.updateBidsV2({
  bids: [{
    advert_id: 12345,
    nm_bids: [
      {
        nm_id: 983512347,
        bid_kopecks: 500,  // 5 рублей
        placement: 'search'
      },
      {
        nm_id: 983512347,
        bid_kopecks: 300,  // 3 рубля
        placement: 'recommendations'
      },
      {
        nm_id: 123456789,
        bid_kopecks: 450,  // 4,5 рубля
        placement: 'combined'  // Поиск и рекомендации
      }
    ]
  }]
});

console.log('Ставки обновлены:', result.bids);
```

### Устаревшее обновление ставок (V0)

> **Примечание**: `updateAuctionBid()` использует рубли, а не копейки. Рекомендуется перейти на V2.

```typescript
// Обновление ставок устаревшим методом (рубли)
await sdk.promotion.updateAuctionBid({
  bids: [{
    advert_id: 12345,
    nm_bids: [
      { nm_id: 983512347, bid: 5, placement: 'search' },  // 5 рублей
      { nm_id: 983512347, bid: 3, placement: 'recommendations' }
    ]
  }]
});
```

## Финансы кампаний

### Проверка баланса аккаунта

```typescript
// Получаем баланс рекламного аккаунта
const balance = await sdk.promotion.getAdvBalance();

console.log('Рекламный аккаунт:');
console.log(`  Баланс: ${balance.balance} рублей`);
console.log(`  Взаимозачёт: ${balance.net} рублей`);
console.log(`  Бонусы: ${balance.bonus} рублей`);

// Информация о кешбэке
for (const cb of balance.cashbacks ?? []) {
  console.log(`  Кешбэк: ${cb.sum} (${cb.percent}%), действует до ${cb.expiration_date}`);
}
```

### Проверка бюджета кампании

```typescript
// Получаем бюджет конкретной кампании
const budget = await sdk.promotion.getAdvBudget({ id: 12345 });

console.log(`Бюджет кампании:`);
console.log(`  Наличные: ${budget.cash} рублей`);
console.log(`  Взаимозачёт: ${budget.netting} рублей`);
console.log(`  Итого: ${budget.total} рублей`);
```

### Пополнение бюджета кампании

```typescript
// Добавляем средства в бюджет кампании (кампания должна быть в статусе 11 — на паузе)
const deposit = await sdk.promotion.createBudgetDeposit(
  {
    sum: 10000,           // Сумма в рублях
    type: 0,              // 0 = с баланса, 1 = из взаимозачёта
    return: false         // Не возвращать средства на баланс
  },
  { id: 12345 }           // ID кампании
);

console.log('Пополнение прошло успешно');

// Запускаем кампанию после пополнения
await sdk.promotion.getAdvStart({ id: 12345 });
```

### Просмотр истории расходов

```typescript
// Получаем историю расходов за период
const spending = await sdk.promotion.getAdvUpd({
  from: '2025-01-01',
  to: '2025-01-31'
});

console.log('История расходов:');
for (const upd of spending) {
  console.log(`${upd.updTime}: Кампания ${upd.advertId} (${upd.campName})`);
  console.log(`  Сумма: ${upd.updSum} рублей`);
  console.log(`  Тип оплаты: ${upd.paymentType}`);
}
```

### Просмотр истории платежей

```typescript
// Получаем историю пополнений аккаунта
const payments = await sdk.promotion.getAdvPayments({
  from: '2025-01-01',
  to: '2025-01-31'
});

console.log('История платежей:');
for (const payment of payments) {
  console.log(`${payment.date}: ${payment.sum} рублей (Статус: ${payment.cardStatus})`);
}
```

## Статистика и аналитика

### Полная статистика кампаний

```typescript
// Получаем комплексную статистику по кампаниям
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345,23456',  // ID кампаний
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});

console.log('Эффективность кампаний:', stats);
```

### Статистика по ключевым словам

```typescript
// Получаем статистику эффективности ключевых слов
const keywordStats = await sdk.promotion.getStatsKeywords({
  advert_id: 12345,
  from: '2025-01-01',
  to: '2025-01-07'
});

for (const kw of keywordStats ?? []) {
  console.log(`Ключевое слово: ${kw.keyword}`);
  console.log(`  Показы: ${kw.views}, Клики: ${kw.clicks}`);
  console.log(`  CTR: ${kw.ctr}%`);
}
```

## Устаревшие методы

Следующие методы являются устаревшими и будут отключены **2 февраля 2026 года**:

| Устаревший метод | Замена | Примечания |
|------------------|--------|------------|
| `getPromotionCount()` | `getAdvertsV2()` | V2 предоставляет больше возможностей фильтрации |
| `createPromotionAdvert()` | `getAdvertsV2()` | Используйте V2 для получения информации о кампаниях |
| `getAuctionAdverts()` | `getAdvertsV2()` | Единый метод V2 |
| `createBidsMin()` | `getBidsMinV2()` | V2 использует копейки |
| `updateAdvBid()` | `updateBidsV2()` | V2 использует копейки |
| `getAdvStart()` | API управления кампаниями | Используйте обновлённые эндпоинты |
| `getAdvPause()` | API управления кампаниями | Используйте обновлённые эндпоинты |
| `getAdvConfig()` | API конфигурации | Используйте обновлённые эндпоинты |
| `getAutoGetnmtoadd()` | `getAuctionAdverts()` + `updateAuctionNm()` | Кампании типа 9 |
| `createAutoUpdatenm()` | `updateAuctionNm()` | Кампании типа 9 |
| `getAutoStatWords()` | `getAdvFullstats()` | Универсальная статистика |
| `createAutoSetExcluded()` | Создание кампании типа 9 | Новый API |

### Пример миграции

```typescript
// ❌ СТАРЫЙ (устаревший)
const oldCampaigns = await sdk.promotion.getPromotionCount();

// ✅ НОВЫЙ (рекомендуемый)
const newCampaigns = await sdk.promotion.getAdvertsV2();
```

```typescript
// ❌ СТАРЫЙ (устаревший, использует рубли)
const oldMinBids = await sdk.promotion.createBidsMin({
  advert_id: 12345,
  nm_ids: [983512347],
  payment_type: 'cpm',
  placement_types: ['search', 'recommendation']
});

// ✅ НОВЫЙ (рекомендуемый, использует копейки)
const newMinBids = await sdk.promotion.getBidsMinV2({
  advert_id: 12345,
  nm_ids: [983512347],
  payment_type: 'cpm',
  placement_types: ['search', 'recommendation']
});
```

Полные инструкции по миграции см. в [Руководстве по миграции](/guides/migration-v2.4-promotion-deprecation).

## Обработка ошибок

### Комплексная обработка ошибок

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function manageCampaign(campaignId: number) {
  try {
    const campaigns = await sdk.promotion.getAdvertsV2({ ids: String(campaignId) });
    // Обрабатываем кампании...
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Превышен лимит запросов');
      console.error(`Повторить через: ${error.retryAfter} мс`);
      // SDK обрабатывает повторные попытки автоматически
    } else if (error instanceof AuthenticationError) {
      console.error('Недействительный API-ключ — проверьте учётные данные');
    } else if (error instanceof ValidationError) {
      console.error('Некорректный запрос:', error.message);
      // Исправьте параметры запроса
    } else if (error instanceof NetworkError) {
      console.error('Сетевая ошибка:', error.message);
      // Проверьте подключение к сети
    } else if (error instanceof WBAPIError) {
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Обработка конкретных сценариев

```typescript
// Кампания не найдена
try {
  await sdk.promotion.getAdvStart({ id: 999999999 });
} catch (error) {
  if (error instanceof WBAPIError && error.statusCode === 404) {
    console.error('Кампания не найдена');
  }
}

// Недопустимое состояние кампании
try {
  // Попытка приостановить уже приостановленную кампанию
  await sdk.promotion.getAdvPause({ id: pausedCampaignId });
} catch (error) {
  if (error instanceof WBAPIError && error.statusCode === 400) {
    console.error('Кампания не находится в допустимом состоянии для этой операции');
  }
}
```

## Лимиты запросов

API рекламы использует различные лимиты запросов для разных категорий эндпоинтов:

### Уровни лимитов

| Категория | Запросов/мин | Интервал | Всплеск | Методы |
|-----------|-------------|----------|---------|--------|
| **Управление кампаниями** | 300 | 200 мс | 5 | `getAdvStart`, `getAdvPause`, `getAdvStop`, `getAdvDelete` |
| **Информация о кампаниях (V2)** | 300 | 200 мс | 5 | `getAdvertsV2`, `getAuctionAdverts` |
| **Обновление ставок** | 300 | 200 мс | 5 | `updateBidsV2`, `updateAuctionBid` |
| **Минимальные ставки** | 20 | 3 с | 5 | `getBidsMinV2`, `createBidsMin` |
| **Баланс/бюджет** | 60 | 1 с | 5 | `getAdvBalance`, `getAdvBudget` |
| **Статистика NormQuery** | 10 | 6 с | 20 | `getNormqueryStats` |
| **Ставки NormQuery** | 300 | 200 мс | 10 | `getNormqueryBids`, `deleteNormqueryBids` |
| **Установка ставок NormQuery** | 120 | 500 мс | 4 | `setNormqueryBids` |
| **Полная статистика** | 3 | 20 с | 1 | `getAdvFullstats` |
| **Конфигурация** | 1 | 60 с | 1 | `getAdvConfig` |

### Советы по лимитам

- SDK автоматически управляет лимитами с помощью очередей и повторных попыток
- **Методы статистики самые медленные** — `getAdvFullstats()` допускает всего 3 запроса в минуту
- **Статистика NormQuery** также ограничена 10 запросами в минуту
- **Объединяйте операции в пакеты** по возможности для сокращения обращений к API
- Используйте фильтрацию `getAdvertsV2()` для уменьшения количества возвращаемых кампаний

```typescript
// Эффективно: фильтрация на стороне сервера
const activeCampaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9', // Только активные
  payment_type: 'cpm'
});

// Неэффективно: получаем всё и фильтруем локально
const allCampaigns = await sdk.promotion.getAdvertsV2();
const filtered = allCampaigns.adverts?.filter(c => c.status === 9);
```

## Лучшие практики

### 1. Используйте методы V2

Всегда предпочитайте методы V2 устаревшим аналогам:

```typescript
// ✅ Рекомендуется
const campaigns = await sdk.promotion.getAdvertsV2();
const minBids = await sdk.promotion.getBidsMinV2({ ... });
await sdk.promotion.updateBidsV2({ ... });

// ❌ Избегайте (устаревшие)
const oldCampaigns = await sdk.promotion.getPromotionCount();
const oldMinBids = await sdk.promotion.createBidsMin({ ... });
```

### 2. Соблюдайте лимиты запросов

```typescript
// Используйте фильтрацию для сокращения обращений
const campaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9,11' // Только активные и на паузе
});

// Не запрашивайте статистику слишком часто
// getAdvFullstats имеет интервал 20 секунд
```

### 3. Работайте с кампаниями типа 9

Все новые кампании должны быть типа 9 (ручные/единые ставки):

```typescript
// Создание кампании типа 9 с ручными ставками
const campaignId = await sdk.promotion.createSeacatSaveAd({
  name: 'Моя кампания',
  nms: [983512347, 123456789],
  bid_type: 'manual',
  placement_types: ['search', 'recommendations']
});
```

### 4. Мониторьте эффективность кампаний

```typescript
async function monitorCampaigns() {
  const campaigns = await sdk.promotion.getAdvertsV2({ statuses: '9' });

  for (const campaign of campaigns.adverts ?? []) {
    // Проверяем бюджет
    const budget = await sdk.promotion.getAdvBudget({ id: campaign.advert_id });

    if ((budget.total ?? 0) < 1000) {
      console.warn(`У кампании ${campaign.advert_id} низкий бюджет: ${budget.total} рублей`);
    }
  }
}
```

### 5. Используйте поисковые кластеры для оптимизации

```typescript
// Анализируем эффективность кластеров
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-31',
  items: [{ advert_id: 12345, nm_id: 983512347 }]
});

// Повышаем ставки для высокоэффективных кластеров
const highPerformers = stats.stats?.filter(s => (s.orders ?? 0) > 10);

if (highPerformers?.length) {
  await sdk.promotion.setNormqueryBids({
    bids: highPerformers.map(stat => ({
      advert_id: stat.advert_id!,
      nm_id: stat.nm_id!,
      norm_query: stat.norm_query!,
      bid: (stat.bid ?? 500) + 200 // Увеличиваем на 2 рубля
    }))
  });
}
```

## Связанные ресурсы

- [Справочник API: PromotionModule](/api/classes/PromotionModule)
- [Руководство по миграции: с типа 8 на тип 9](/guides/migration-v2.4-promotion-deprecation)
- [Лучшие практики рекламы](/guides/best-practices-advertising)
- [Руководство по статистике рекламы](/guides/advertising-statistics-guide)
- [Официальный API рекламы WB](https://dev.wildberries.ru/openapi/promotion)

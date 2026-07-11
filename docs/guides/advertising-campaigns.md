# Рекламные кампании

> Руководство по управлению рекламными кампаниями через Wildberries SDK

## Содержание

- [Обзор рекламных возможностей](#обзор-рекламных-возможностей)
- [Быстрый старт](#быстрый-старт)
- [Управление кампаниями](#управление-кампаниями)
- [Работа со ставками](#работа-со-ставками)
- [Поисковые кластеры](#поисковые-кластеры)
- [Минус-фразы](#минус-фразы)
- [Финансы и бюджеты](#финансы-и-бюджеты)
- [Статистика кампаний](#статистика-кампаний)
- [Календарь акций](#календарь-акций)
- [Медиакампании](#медиакампании)
- [Лимиты запросов](#лимиты-запросов)
- [Лучшие практики](#лучшие-практики)
- [Связанные руководства](#связанные-руководства)

---

## Обзор рекламных возможностей

SDK предоставляет полный доступ к рекламным инструментам Wildberries:

| Функция | Описание | Ключевые методы |
|---------|----------|-----------------|
| **Кампании** | Создание, запуск, пауза, остановка | `getAdvertsV2()`, `startCampaign()`, `pauseCampaign()` |
| **Ставки** | Управление ставками по товарам | `updateBids()`, `getBidsMinV2()` |
| **Поисковые кластеры** | Таргетинг по ключевым фразам | `getNormqueryStats()`, `setNormqueryBids()` |
| **Минус-фразы** | Исключение нежелательных запросов | `getNormqueryMinus()`, `setNormqueryMinus()` |
| **Финансы** | Баланс, бюджеты, пополнения | `getAdvBalance()`, `getAdvBudget()` |
| **Статистика** | Аналитика эффективности | `getAdvFullstats()` |
| **Акции** | Участие в акциях WB | `getCalendarPromotions()` |

### Типы кампаний

| Тип | Описание | Статус |
|-----|----------|--------|
| `9` | Ручная или единая ставка | **Актуальный** |
| `4-8` | Устаревшие типы | **Deprecated** (отключение 02.02.2026) |

### Статусы кампаний

| Код | Статус | Описание |
|-----|--------|----------|
| `4` | Готова | Готова к запуску |
| `7` | Завершена | Кампания окончена |
| `8` | Отменена | Кампания отменена |
| `9` | Активна | Кампания работает |
| `11` | Пауза | Кампания приостановлена |
| `-1` | Удаление | В процессе удаления (3-10 мин) |

---

## Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Проверить баланс рекламного кабинета
const balance = await sdk.promotion.getAdvBalance();
console.log(`Баланс: ${balance.net}₽`);
console.log(`Бонусы: ${balance.bonus}₽`);

// Получить список активных кампаний
const campaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9', // Только активные
  payment_type: 'cpm'
});

console.log(`Активных кампаний: ${campaigns.adverts?.length ?? 0}`);
```

---

## Управление кампаниями

### Получение списка кампаний

```typescript
// Получить все кампании с фильтрацией (V2 API)
const campaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,23456',           // Конкретные ID (опционально)
  statuses: '9,11',             // Активные и на паузе
  payment_type: 'cpm'           // cpm или cpc
});

for (const campaign of campaigns.adverts ?? []) {
  console.log(`ID: ${campaign.advert_id}`);
  console.log(`Название: ${campaign.name}`);
  console.log(`Статус: ${campaign.status}`);
  console.log(`Тип оплаты: ${campaign.payment_type}`);
}
```

### Создание кампании

```typescript
// Создать кампанию с ручной ставкой
const campaignId = await sdk.promotion.createCampaign({
  name: 'Зимняя коллекция 2024',
  nms: [168120815, 173574852],      // Артикулы WB (до 50 шт)
  bid_type: 'manual',                // manual или unified
  payment_type: 'cpm',
  placement_types: ['search', 'recommendations']
});

console.log(`Создана кампания: ${campaignId}`);
```

### Управление статусом кампании

```typescript
const campaignId = 12345;

// Запустить кампанию (из статуса 4 или 11)
await sdk.promotion.startCampaign(campaignId);

// Поставить на паузу (из статуса 9)
await sdk.promotion.pauseCampaign(campaignId);

// Завершить кампанию
await sdk.promotion.getAdvStop({ id: campaignId });

// Удалить кампанию (только из статуса 4)
await sdk.promotion.getAdvDelete({ id: campaignId });
```

### Переименование кампании

```typescript
await sdk.promotion.createAdvRename({
  advertId: 12345,
  name: 'Новое название кампании'
});
```

### Управление товарами в кампании

```typescript
// Добавить и удалить товары из кампании
const result = await sdk.promotion.updateAuctionNm({
  nms: [{
    advert_id: 12345,
    nms: {
      add: [168120815, 173574852],    // Добавить товары
      delete: [155443322]              // Удалить товары
    }
  }]
});

console.log('Добавлено:', result.nms[0].nms.added);
console.log('Удалено:', result.nms[0].nms.deleted);
```

---

## Работа со ставками

### Получение минимальных ставок

```typescript
// Получить минимальные ставки для товаров (V1 API, в копейках)
const minBids = await sdk.promotion.getBidsMinV2({
  advert_id: 12345,
  nm_ids: [168120815, 173574852],
  payment_type: 'cpm',
  placement_types: ['combined', 'search', 'recommendation']
});

for (const item of minBids.bids) {
  console.log(`Товар ${item.nm_id}:`);
  for (const bid of item.bids) {
    console.log(`  ${bid.type}: ${bid.value / 100}₽`); // Перевод в рубли
  }
}
```

### Установка ставок

```typescript
// Изменить ставки в кампаниях (в копейках)
const result = await sdk.promotion.updateBids({
  bids: [{
    advert_id: 12345,
    nm_bids: [
      { nm_id: 168120815, bid_kopecks: 15000, placement: 'search' },        // 150₽
      { nm_id: 173574852, bid_kopecks: 10000, placement: 'recommendations' } // 100₽
    ]
  }]
});

console.log('Ставки обновлены');
```

### Изменение мест размещения

```typescript
// Изменить места размещения для кампаний с ручной ставкой
await sdk.promotion.updateAuctionPlacement({
  placements: [{
    advert_id: 12345,
    placements: {
      search: true,
      recommendations: false
    }
  }]
});
```

---

## Поисковые кластеры

Поисковые кластеры — группы похожих ключевых фраз для таргетирования рекламы.

### Получение статистики по кластерам

```typescript
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-07',
  items: [
    { advert_id: 12345, nm_id: 168120815 }
  ]
});

for (const stat of stats.stats ?? []) {
  console.log(`Кластер: ${stat.norm_query}`);
  console.log(`  Показы: ${stat.views}`);
  console.log(`  Клики: ${stat.clicks}`);
  console.log(`  CTR: ${stat.ctr}%`);
  console.log(`  Расход: ${stat.sum}₽`);
}
```

### Получение текущих ставок по кластерам

```typescript
const bids = await sdk.promotion.getNormqueryBids({
  items: [{ advert_id: 12345, nm_id: 168120815 }]
});

for (const item of bids.bids ?? []) {
  console.log(`Кампания ${item.advert_id}, товар ${item.nm_id}:`);
  for (const cluster of item.clusters ?? []) {
    console.log(`  ${cluster.norm_query}: ${cluster.bid / 100}₽`);
  }
}
```

### Установка ставок на кластеры

```typescript
// Установить ставки на конкретные поисковые кластеры
await sdk.promotion.setNormqueryBids({
  bids: [
    {
      advert_id: 12345,
      nm_id: 168120815,
      norm_query: 'платье женское',
      bid: 20000  // 200₽ в копейках
    },
    {
      advert_id: 12345,
      nm_id: 168120815,
      norm_query: 'платье летнее',
      bid: 15000  // 150₽
    }
  ]
});
```

### Удаление ставок с кластеров

```typescript
await sdk.promotion.deleteNormqueryBids({
  bids: [
    {
      advert_id: 12345,
      nm_id: 168120815,
      norm_query: 'платье женское',
      bid: 20000
    }
  ]
});
```

---

## Минус-фразы

Минус-фразы исключают показ рекламы по нежелательным поисковым запросам.

### Получение списка минус-фраз

```typescript
const minusPhrases = await sdk.promotion.getNormqueryMinus({
  items: [{ advert_id: 12345, nm_id: 168120815 }]
});

for (const item of minusPhrases.items ?? []) {
  console.log(`Кампания ${item.advert_id}:`);
  for (const phrase of item.minus ?? []) {
    console.log(`  - ${phrase}`);
  }
}
```

### Установка минус-фраз

```typescript
// Установить минус-фразы (пустой массив удаляет все)
await sdk.promotion.setNormqueryMinus({
  advert_id: 12345,
  nm_id: 168120815,
  norm_queries: ['дешево', 'бесплатно', 'скидка 90%']
});
```

---

## Финансы и бюджеты

### Проверка баланса

```typescript
const balance = await sdk.promotion.getAdvBalance();

console.log('=== Баланс рекламного кабинета ===');
console.log(`Счёт: ${balance.balance}₽`);          // Пополняется продавцом
console.log(`Взаиморасчёт: ${balance.net}₽`);      // Автоматический баланс
console.log(`Бонусы: ${balance.bonus}₽`);          // Бонусы от WB

// Информация о кешбэках
for (const cb of balance.cashbacks ?? []) {
  console.log(`Кешбэк ${cb.percent}%: ${cb.sum}₽ (до ${cb.expiration_date})`);
}
```

### Бюджет кампании

```typescript
const budget = await sdk.promotion.getAdvBudget({ id: 12345 });

console.log('=== Бюджет кампании ===');
console.log(`Наличные: ${budget.cash}₽`);
console.log(`Взаиморасчёт: ${budget.netting}₽`);
console.log(`Всего: ${budget.total}₽`);
```

### Пополнение бюджета

```typescript
// Пополнить бюджет кампании (только для статуса 11 - пауза)
const result = await sdk.promotion.createBudgetDeposit(
  {
    sum: 5000,              // Сумма пополнения
    type: 1                 // Тип источника
  },
  { id: 12345 }             // ID кампании
);

console.log('Бюджет пополнен');
```

### История затрат

```typescript
const expenses = await sdk.promotion.getAdvUpd({
  from: '2025-01-01',
  to: '2025-01-31'
});

console.log('=== История затрат ===');
for (const item of expenses) {
  console.log(`${item.updTime}: ${item.campName} - ${item.updSum}₽`);
}
```

### История пополнений

```typescript
const payments = await sdk.promotion.getAdvPayments({
  from: '2025-01-01',
  to: '2025-01-31'
});

console.log('=== История пополнений ===');
for (const payment of payments) {
  console.log(`${payment.date}: ${payment.sum}₽ (статус: ${payment.cardStatus})`);
}
```

---

## Статистика кампаний

### Полная статистика кампаний

```typescript
// Получить статистику за период (макс. 31 день)
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345,23456',
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});

for (const campaign of stats.adverts ?? []) {
  console.log(`\n=== Кампания ${campaign.advert_id} ===`);

  for (const day of campaign.days ?? []) {
    console.log(`${day.date}:`);
    console.log(`  Показы: ${day.views}`);
    console.log(`  Клики: ${day.clicks}`);
    console.log(`  CTR: ${day.ctr}%`);
    console.log(`  CPC: ${day.cpc}₽`);
    console.log(`  Расход: ${day.sum}₽`);
    console.log(`  Заказы: ${day.orders}`);
    console.log(`  CR: ${day.cr}%`);
  }
}
```

### Статистика по ключевым фразам

> Метод `getStatsKeywords()` **удалён в v4.0.0**. Используйте `getAdvFullstats()` — он возвращает данные по дням, платформам и SKU (включая показы, клики, CTR и расход).

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345',
  beginDate: '2025-01-01',
  endDate: '2025-01-07'
});

for (const campaign of stats) {
  console.log(`Кампания ${campaign.advertId}: ${campaign.views} показов, ${campaign.clicks} кликов`);
  for (const day of campaign.days ?? []) {
    console.log(`  ${day.date}: показы=${day.views}, клики=${day.clicks}`);
  }
}
```

---

## Календарь акций

### Список акций

```typescript
const promotions = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2025-01-01T00:00:00Z',
  endDateTime: '2025-02-01T00:00:00Z',
  allPromo: true,
  limit: 100
});

console.log('=== Акции WB ===');
// Обработка результата
```

### Детали акции

```typescript
const details = await sdk.promotion.getPromotionsDetails({
  promotionIDs: '12345,23456'
});

// Обработка деталей акции
```

### Товары для участия в акции

```typescript
const products = await sdk.promotion.getPromotionsNomenclatures({
  promotionID: 12345,
  inAction: false,   // false = можно добавить, true = уже участвуют
  limit: 100
});

// Список товаров, подходящих для акции
```

### Добавление товара в акцию

```typescript
await sdk.promotion.createPromotionsUpload();

// Проверить состояние загрузки через методы истории задач
```

---

## Медиакампании

Медиакампании — баннерная реклама на сайте и в приложении WB.

### Количество медиакампаний

```typescript
const count = await sdk.promotion.getAdvCount();

console.log(`Всего медиакампаний: ${count.all}`);
```

### Список медиакампаний

```typescript
const mediaAds = await sdk.promotion.getAdvAdverts({
  status: 9,      // Активные
  limit: 50,
  offset: 0
});

for (const ad of mediaAds) {
  console.log(`${ad.name} (${ad.brand})`);
  console.log(`  Статус: ${ad.status}`);
  console.log(`  Создана: ${ad.createTime}`);
}
```

### Информация о медиакампании

```typescript
const mediaAd = await sdk.promotion.getAdvAdvert({ id: 12345 });

console.log(`Название: ${mediaAd.name}`);
console.log(`Бренд: ${mediaAd.brand}`);
console.log(`Бюджет: ${mediaAd.extended?.budget}₽`);
console.log(`Расход: ${mediaAd.extended?.expenses}₽`);

for (const item of mediaAd.items ?? []) {
  console.log(`  Баннер: ${item.name}`);
  console.log(`    CPM: ${item.cpm}₽`);
  console.log(`    URL: ${item.url}`);
}
```

### Статистика медиакампаний

```typescript
const mediaStats = await sdk.promotion.createAdvStat([
  { id: 12345 },
  { id: 23456 }
]);

// Обработка статистики
```

---

## Лимиты запросов

| Метод | Лимит | Интервал |
|-------|-------|----------|
| **Кампании** | | |
| `getAdvertsV2()` | 300 req/min | 200 мс |
| `startCampaign()`, `pauseCampaign()`, `getAdvStop()` | 300 req/min | 200 мс |
| `createCampaign()` | 5 req/min | 12 сек |
| `getAdvDelete()` | 300 req/min | 200 мс |
| **Ставки** | | |
| `getBidsMinV2()` | 20 req/min | 3 сек |
| `updateBids()` | 300 req/min | 200 мс |
| `updateAuctionPlacement()` | 60 req/min | 1 сек |
| **Поисковые кластеры** | | |
| `getNormqueryStats()` | 10 req/min | 6 сек |
| `getNormqueryBids()` | 300 req/min | 200 мс |
| `setNormqueryBids()` | 120 req/min | 500 мс |
| `deleteNormqueryBids()` | 300 req/min | 200 мс |
| `getNormqueryMinus()`, `setNormqueryMinus()` | 300 req/min | 200 мс |
| **Финансы** | | |
| `getAdvBalance()` | 60 req/min | 1 сек |
| `getAdvBudget()` | 240 req/min | 250 мс |
| `createBudgetDeposit()` | 60 req/min | 1 сек |
| `getAdvUpd()`, `getAdvPayments()` | 60 req/min | 1 сек |
| **Статистика** | | |
| `getAdvFullstats()` | 3 req/min | 20 сек |
| **Акции** | | |
| `getCalendarPromotions()` | 100 req/min | 600 мс |
| **Медиа** | | |
| `getAdvCount()`, `getAdvAdverts()`, `getAdvAdvert()` | 600 req/min | 100 мс |
| `createAdvStat()` | 600 req/min | 100 мс |

---

## Лучшие практики

### 1. Используйте V2 API

```typescript
// ✅ Правильно: V2 методы
const campaigns = await sdk.promotion.getAdvertsV2({ statuses: '9' });
const minBids = await sdk.promotion.getBidsMinV2({ ... });
await sdk.promotion.updateBids({ ... });

// ❌ Удалено в v4.0.0: V0/V1 методы
// const old = await sdk.promotion.getAuctionAdverts({ ... });
// await sdk.promotion.updateBidsV2({ ... });
```

### 2. Проверяйте баланс перед запуском

```typescript
async function safeLaunchCampaign(campaignId: number) {
  // Проверить баланс
  const balance = await sdk.promotion.getAdvBalance();
  if ((balance.net ?? 0) < 1000) {
    throw new Error('Недостаточно средств на балансе');
  }

  // Проверить бюджет кампании
  const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
  if ((budget.total ?? 0) < 500) {
    throw new Error('Недостаточный бюджет кампании');
  }

  // Запустить
  await sdk.promotion.startCampaign(campaignId);
}
```

### 3. Обрабатывайте rate limit ошибки

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

async function updateBidsWithRetry(data: any, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await sdk.promotion.updateBids(data);
    } catch (error) {
      if (error instanceof RateLimitError && attempt < maxRetries - 1) {
        const delay = error.retryAfter || 1000;
        console.log(`Rate limit, ожидание ${delay}мс...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
}
```

### 4. Мониторинг эффективности кампаний

```typescript
interface CampaignMetrics {
  id: number;
  name: string;
  roi: number;
  ctr: number;
  cpc: number;
  orders: number;
}

async function analyzeCampaigns(): Promise<CampaignMetrics[]> {
  const campaigns = await sdk.promotion.getAdvertsV2({ statuses: '9' });
  const metrics: CampaignMetrics[] = [];

  for (const campaign of campaigns.adverts ?? []) {
    const stats = await sdk.promotion.getAdvFullstats({
      ids: String(campaign.advert_id),
      beginDate: getLastWeekDate(),
      endDate: getTodayDate()
    });

    const totals = aggregateStats(stats);

    metrics.push({
      id: campaign.advert_id!,
      name: campaign.name || '',
      roi: calculateROI(totals),
      ctr: totals.ctr,
      cpc: totals.cpc,
      orders: totals.orders
    });

    // Соблюдение rate limit
    await new Promise(r => setTimeout(r, 21000)); // 3 req/min
  }

  return metrics.sort((a, b) => b.roi - a.roi);
}
```

### 5. Оптимизация ставок по кластерам

```typescript
async function optimizeClusterBids(campaignId: number, nmId: number) {
  // Получить статистику за неделю
  const stats = await sdk.promotion.getNormqueryStats({
    from: getLastWeekDate(),
    to: getTodayDate(),
    items: [{ advert_id: campaignId, nm_id: nmId }]
  });

  const bidsToUpdate: any[] = [];

  for (const stat of stats.stats ?? []) {
    const ctr = stat.ctr ?? 0;
    const orders = stat.orders ?? 0;

    // Повысить ставку для эффективных кластеров
    if (ctr > 2 && orders > 0) {
      bidsToUpdate.push({
        advert_id: campaignId,
        nm_id: nmId,
        norm_query: stat.norm_query,
        bid: Math.min((stat.bid ?? 10000) * 1.2, 50000) // +20%, макс 500₽
      });
    }

    // Понизить ставку для неэффективных
    if (ctr < 0.5 && orders === 0) {
      bidsToUpdate.push({
        advert_id: campaignId,
        nm_id: nmId,
        norm_query: stat.norm_query,
        bid: Math.max((stat.bid ?? 10000) * 0.8, 5000) // -20%, мин 50₽
      });
    }
  }

  if (bidsToUpdate.length > 0) {
    await sdk.promotion.setNormqueryBids({ bids: bidsToUpdate });
    console.log(`Обновлено ${bidsToUpdate.length} ставок`);
  }
}
```

---

## Связанные руководства

- [Комиссии и сборы](./commissions-fees.md) — тарифы и комиссии WB
- [Отчёт о реализации](./realization-report.md) — детализация продаж и удержаний
- [Promotion Getting Started](./promotion-getting-started.md) — быстрый старт с модулем
- [API Reference: PromotionModule](/api/classes/PromotionModule) — справочник по API

---

[← К списку руководств](./index.md)

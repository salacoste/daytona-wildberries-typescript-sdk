---
title: "Лучшие практики аналитики воронки продаж"
description: "Полное руководство по анализу воронок продаж Wildberries — органическая конверсия товаров, аналитика рекламных кампаний, кросс-канальное сравнение и стратегии оптимизации на основе данных"
layout: doc
---

# Лучшие практики аналитики воронки продаж

Полное руководство по анализу воронок продаж Wildberries -- объединение данных органической конверсии из модуля Аналитики с рекламной статистикой из модуля Продвижения для оптимизации на основе данных.

**Целевая аудитория**: Аналитики e-commerce, менеджеры товаров и разработчики, создающие аналитические панели для продавцов Wildberries

**Необходимые знания**: SDK установлен и настроен, действующий API-ключ с правами на Аналитику и Продвижение

**Время чтения**: 40 минут

---

## Содержание

1. [Понимание воронок продаж Wildberries](#понимание-воронок-продаж-wildberries)
2. [Органическая воронка продаж (Analytics v3 API)](#органическая-воронка-продаж-analytics-v3-api)
3. [Рекламная воронка (статистика Продвижения)](#рекламная-воронка-статистика-продвижения)
4. [Кросс-канальный анализ воронки](#кросс-канальный-анализ-воронки)
5. [Анализ исторических трендов](#анализ-исторических-трендов)
6. [Паттерны агрегации данных](#паттерны-агрегации-данных)
7. [Стратегии оптимизации](#стратегии-оптимизации)
8. [Rate-лимиты и производительность](#rate-лимиты-и-производительность)
9. [Заметки по миграции (v2.6 на v2.7)](#заметки-по-миграции-v26-на-v27)
10. [Полный пример дашборда](#полный-пример-дашборда)

---

## Понимание воронок продаж Wildberries

### Что такое воронка продаж на Wildberries?

Воронка продаж на Wildberries отслеживает путь покупателя от первого просмотра товара до завершения покупки. Каждая карточка товара формирует измеримую воронку, которая показывает, насколько эффективно ваши товары конвертируют просмотры в выручку.

### Два источника данных

SDK предоставляет данные воронки из двух независимых модулей:

| Источник | Модуль | Что измеряет |
|----------|--------|--------------|
| **Модуль Аналитики** | `sdk.analytics.*` | Органическая конверсия товаров -- весь трафик вне зависимости от источника |
| **Модуль Продвижения** | `sdk.promotion.*` | Рекламная конверсия -- только платный трафик |

Объединение обоих источников даёт полную картину эффективности товаров и окупаемости рекламы.

### Этапы воронки

```
┌─────────────────────────────────────────────────┐
│                  ПРОСМОТРЫ                       │
│              (openCount)                         │
│    Покупатель открывает карточку товара           │
└──────────────────────┬──────────────────────────┘
                       │  addToCartConversion %
┌──────────────────────▼──────────────────────────┐
│                   КОРЗИНА                        │
│              (cartCount)                         │
│    Покупатель добавляет товар в корзину           │
└──────────────────────┬──────────────────────────┘
                       │  cartToOrderConversion %
┌──────────────────────▼──────────────────────────┐
│                   ЗАКАЗЫ                         │
│              (orderCount / orderSum)             │
│    Покупатель оформляет заказ                    │
└──────────────────────┬──────────────────────────┘
                       │  buyoutPercent %
┌──────────────────────▼──────────────────────────┐
│                   ВЫКУПЫ                         │
│           (buyoutCount / buyoutSum)              │
│    Покупатель получает и оставляет товар         │
└─────────────────────────────────────────────────┘
```

### Ключевые метрики конверсии

| Метрика | Формула | Что показывает |
|---------|---------|----------------|
| `addToCartConversion` | cartCount / openCount | Насколько привлекательна карточка товара |
| `cartToOrderConversion` | orderCount / cartCount | Насколько хорошо цена и наличие конвертируют |
| `buyoutPercent` | buyoutCount / orderCount | Удовлетворённость покупателей при получении |

::: tip
Здоровая воронка на Wildberries обычно показывает: конверсию в корзину 5-15%, конверсию в заказ 20-40%, процент выкупа 60-90% в зависимости от категории.
:::

---

## Органическая воронка продаж (Analytics v3 API)

Это новые эндпоинты v3, добавленные в SDK v2.7.0 вместо устаревших v2 эндпоинтов, которые теперь возвращают 404.

::: warning
Старые методы v2 (`createNmReportDetail`, `createDetailHistory`, `createGroupedHistory`) по-прежнему существуют как deprecated-обёртки, но внутри вызывают v3. Мигрируйте на новые методы для корректной типизации. См. [Заметки по миграции](#заметки-по-миграции-v26-на-v27).
:::

### Аналитика на уровне товаров: getSalesFunnelProducts()

Возвращает статистику воронки для отдельных товаров с возможностью сравнения периодов.

**Rate-лимит**: 3 запроса/мин, интервал 20 секунд, всплеск 3

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const products = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  pastPeriod: { start: '2025-12-01', end: '2025-12-31' },  // необязательное сравнение
  nmIds: [168120815, 173574852],
  subjectIds: [],
  tagIds: [],
  brandNames: [],
  limit: 10,
  offset: 0,
  skipDeletedNm: true,
  orderBy: { field: 'orderCount', mode: 'desc' }
});

// Структура ответа: products[].product + products[].statistic
for (const item of products.products) {
  const { product, statistic } = item;
  console.log(`${product.title} (${product.nmId}):`);
  console.log(`  Просмотры: ${statistic.selected.openCount}`);
  console.log(`  Корзина: ${statistic.selected.cartCount}`);
  console.log(`  Заказы: ${statistic.selected.orderCount}`);
  console.log(`  Выручка: ${statistic.selected.orderSum} руб.`);
  console.log(`  Средняя цена: ${statistic.selected.avgPrice} руб.`);
  console.log(`  Конв. в корзину: ${statistic.selected.conversions.addToCartPercent}%`);
  console.log(`  Конв. в заказ: ${statistic.selected.conversions.cartToOrderPercent}%`);
  console.log(`  Процент выкупа: ${statistic.selected.conversions.buyoutPercent}%`);

  // Сравнение с прошлым периодом (доступно при указании pastPeriod)
  if (statistic.comparison) {
    console.log(`  Изм. просмотров: ${statistic.comparison.openCountDynamic}%`);
    console.log(`  Изм. заказов: ${statistic.comparison.orderCountDynamic}%`);
  }
}
```

#### Параметры запроса

| Параметр | Тип | Обязателен | Описание |
|----------|-----|:----------:|----------|
| `selectedPeriod` | `{ start, end }` | Да | Период в формате `YYYY-MM-DD` |
| `pastPeriod` | `{ start, end }` | Нет | Период сравнения для анализа трендов |
| `nmIds` | `number[]` | Нет | Фильтр по артикулам WB |
| `subjectIds` | `number[]` | Нет | Фильтр по ID предметов (категорий) |
| `tagIds` | `number[]` | Нет | Фильтр по ID ярлыков |
| `brandNames` | `string[]` | Нет | Фильтр по названиям брендов |
| `limit` | `number` | Нет | Количество элементов на странице |
| `offset` | `number` | Нет | Количество элементов для пропуска |
| `skipDeletedNm` | `boolean` | Нет | Скрыть удалённые карточки товаров |
| `orderBy` | `{ field, mode }` | Нет | Поле и направление сортировки (`asc`/`desc`) |

#### Доступные поля сортировки

`openCard`, `addToCart`, `orderCount`, `orderSum`, `buyoutCount`, `buyoutSum`, `cancelCount`, `cancelSum`, `avgPrice`, `stockMpQty`, `stockWbQty`, `shareOrderPercent`, `addToWishlist`, `timeToReady`, `localizationPercent`

Также доступна сортировка по WB Клубу: `wbClub.orderCount`, `wbClub.orderSum`, `wbClub.buyoutSum`, `wbClub.cancelSum`, `wbClub.buyoutCount`, `wbClub.avgPrice`, `wbClub.buyoutPercent`, `wbClub.avgOrderCountPerDay`, `wbClub.cancelCount`

#### Поля ответа (v3)

Каждая запись товара включает:

**Информация о товаре** (`product`): `nmId`, `title`, `vendorCode`, `brandName`, `subjectId`, `subjectName`, `tags[]`, `productRating`, `feedbackRating`, `stocks.wb`, `stocks.mp`, `stocks.balanceSum`

**Статистика** (`statistic.selected`): `openCount`, `cartCount`, `orderCount`, `orderSum`, `buyoutCount`, `buyoutSum`, `cancelCount`, `cancelSum`, `avgPrice`, `avgOrdersCountPerDay`, `shareOrderPercent`, `addToWishlist`, `timeToReady`, `localizationPercent`, `wbClub.*`, `conversions.*`

**Сравнение** (`statistic.comparison`): Все поля `*Dynamic`, показывающие процентное изменение относительно прошлого периода.

### История по товарам: getSalesFunnelProductsHistory()

Возвращает статистику по дням или неделям для конкретных товаров.

**Rate-лимит**: 3 запроса/мин, интервал 20 секунд, всплеск 3

```typescript
const history = await sdk.analytics.getSalesFunnelProductsHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  nmIds: [168120815],
  subjectIds: [],
  tagIds: [],
  brandNames: [],
  aggregationLevel: 'day',  // 'day' | 'week'
  skipDeletedNm: true
});

// Ответ: массив { product, history[] }
for (const item of history) {
  console.log(`Товар: ${item.product.title} (${item.product.nmId})`);
  for (const day of item.history) {
    console.log(`  ${day.date}: просмотры=${day.openCount}, корзина=${day.cartCount}, заказы=${day.orderCount}`);
    console.log(`    Конв. корзина: ${day.addToCartConversion}%, Конв. заказ: ${day.cartToOrderConversion}%`);
    console.log(`    Выкуп: ${day.buyoutCount} (${day.buyoutPercent}%), Избранное: ${day.addToWishlistCount}`);
  }
}
```

::: info
Этот эндпоинт **не поддерживает** пагинацию (`limit`/`offset`). Он возвращает все данные для запрошенных товаров за указанный период.
:::

#### Поля записи истории

| Поле | Тип | Описание |
|------|-----|----------|
| `date` | `string` | Дата записи статистики |
| `openCount` | `number` | Просмотры карточки товара |
| `cartCount` | `number` | Добавлено в корзину |
| `orderCount` | `number` | Оформлено заказов |
| `orderSum` | `number` | Сумма заказов в руб. |
| `buyoutCount` | `number` | Выкуплено товаров |
| `buyoutSum` | `number` | Сумма выкупов в руб. |
| `buyoutPercent` | `number` | Процент выкупа % |
| `addToCartConversion` | `number` | Конверсия в корзину % |
| `cartToOrderConversion` | `number` | Конверсия в заказ % |
| `addToWishlistCount` | `number` | Добавлено в избранное |

### Сгруппированная история: getSalesFunnelGroupedHistory()

Возвращает статистику по дням или неделям, сгруппированную по комбинациям бренда, предмета и ярлыка.

**Rate-лимит**: 3 запроса/мин, интервал 20 секунд, всплеск 3

```typescript
const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  brandNames: ['BrandA'],
  subjectIds: [100, 200],
  tagIds: [],
  aggregationLevel: 'day',
  skipDeletedNm: true
});

for (const entry of grouped) {
  console.log(`Группа: ${entry.product.brandName} - ${entry.product.subjectName}`);
  for (const day of entry.history) {
    console.log(`  ${day.date}: ${day.openCount} просмотров, ${day.orderCount} заказов, ${day.orderSum} руб.`);
  }
}
```

Этот эндпоинт полезен для анализа трендов на уровне категорий без загрузки данных по отдельным товарам.

---

## Рекламная воронка (статистика Продвижения)

Данные рекламной воронки поступают из модуля Продвижения. В то время как модуль Аналитики отслеживает весь органический трафик, модуль Продвижения предоставляет метрики именно для платных рекламных кампаний.

### Полная статистика кампаний: getAdvFullstats()

Основной метод получения данных по эффективности рекламы.

**Rate-лимит**: 3 запроса/мин, интервал 20 секунд

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511,23332267',   // ID кампаний через запятую (строка)
  beginDate: '2026-01-01',
  endDate: '2026-01-31'
});

for (const campaign of stats) {
  console.log(`Кампания ${campaign.advertId}:`);
  console.log(`  Показы: ${campaign.views}, Клики: ${campaign.clicks}`);
  console.log(`  CTR: ${campaign.ctr}%, CPC: ${campaign.cpc} руб.`);
  console.log(`  Заказы: ${campaign.orders}, Выручка: ${campaign.sum_price} руб.`);
  console.log(`  Расход: ${campaign.sum} руб.`);
  console.log(`  В корзину: ${campaign.atbs}`);
  console.log(`  CR: ${campaign.cr}%`);
  console.log(`  Отмены: ${campaign.canceled}`);
}
```

::: warning
- ID кампаний передаются как **строка** (через запятую), не массив
- Максимум **100** ID кампаний за запрос
- Максимальный период: **31 день** от `beginDate`
- Работает только для кампаний в статусах: 7 (завершена), 9 (активна), 11 (на паузе)
:::

#### Вложенная структура данных

Ответ содержит вложенную разбивку: `days[] -> apps[] -> nms[]`

- **days**: разбивка по дням
- **apps**: разбивка по платформам (1 = Сайт, 32 = Android, 64 = iOS)
- **nms**: разбивка по SKU (nmId) внутри каждой платформы

Это позволяет детализировать данные от общих показателей кампании до эффективности отдельного товара на конкретной платформе в конкретный день.

### Статистика по ключевым словам: getStatsKeywords()

Возвращает статистику по ключевым словам рекламных кампаний.

**Rate-лимит**: 240 запросов/мин

```typescript
const kwStats = await sdk.promotion.getStatsKeywords({
  advert_id: 24483511,
  from: '2026-01-01',
  to: '2026-01-07'
});
```

### Статистика ручных и единых ставок

- **`getStatWords()`** -- статистика ключевых фраз для кампаний с ручной ставкой (240 зап./мин)
- **`getAutoStatWords()`** -- статистика кластеров фраз для кампаний с единой ставкой (240 зап./мин)

```typescript
// Ключевые слова кампании с ручной ставкой
const manualStats = await sdk.promotion.getStatWords({ id: 24483511 });
console.log('Ключевые слова:', manualStats.words?.keywords);
console.log('Статистика:', manualStats.stat);

// Кластеры кампании с единой ставкой
const autoStats = await sdk.promotion.getAutoStatWords({ id: 24483511 });
console.log('Кластеры:', autoStats.clusters);
```

---

## Кросс-канальный анализ воронки

Это наиболее ценный аналитический паттерн -- объединение органических данных из модуля Аналитики с рекламной статистикой из модуля Продвижения для построения полной картины эффективности.

### Архитектура

```
┌──────────────────────┐     ┌──────────────────────┐
│   Модуль Аналитики   │     │  Модуль Продвижения  │
│   (Органика)         │     │  (Реклама)           │
│                      │     │                      │
│  getSalesFunnel      │     │  getAdvFullstats()   │
│  Products()          │     │  getStatsKeywords()  │
│  ProductsHistory()   │     │  getStatWords()      │
│  GroupedHistory()    │     │  getAutoStatWords()  │
└──────────┬───────────┘     └──────────┬───────────┘
           │                            │
           │    nmId (общий ключ)       │
           └────────────┬───────────────┘
                        │
           ┌────────────▼───────────────┐
           │  Объединённый анализ       │
           │                            │
           │  - Органика vs Реклама     │
           │  - Расчёт ROAS             │
           │  - Сравнение CPA           │
           │  - Общая конверсия         │
           └────────────────────────────┘
```

`nmId` (артикул WB) -- общий ключ, связывающий органические данные товара с рекламной статистикой на уровне SKU.

### Паттерн объединённого анализа

```typescript
import { WildberriesSDK, RateLimitError } from 'daytona-wildberries-typescript-sdk';

async function crossChannelAnalysis(
  sdk: WildberriesSDK,
  nmIds: number[],
  period: { start: string; end: string }
) {
  // Шаг 1: Получаем органические данные воронки
  const organic = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: period,
    nmIds,
    subjectIds: [],
    tagIds: [],
    brandNames: [],
    limit: 100,
    offset: 0,
    skipDeletedNm: true,
  });

  // Шаг 2: Получаем список рекламных кампаний
  const campaigns = await sdk.promotion.getPromotionCount();
  const campaignIds = campaigns.adverts
    ?.flatMap(g => g.advert_list?.map(a => a.advertId) ?? [])
    .filter((id): id is number => id !== undefined);

  // Шаг 3: Получаем рекламную статистику (макс. 100 ID за запрос)
  const adStats = campaignIds && campaignIds.length > 0
    ? await sdk.promotion.getAdvFullstats({
        ids: campaignIds.slice(0, 100).join(','),
        beginDate: period.start,
        endDate: period.end,
      })
    : [];

  // Шаг 4: Строим карту рекламных метрик по nmId
  const adMetrics = new Map<number, {
    clicks: number; views: number; orders: number; spent: number;
  }>();

  for (const campaign of adStats) {
    if (!campaign.days) continue;
    for (const day of campaign.days as any[]) {
      for (const app of day.apps ?? []) {
        for (const nm of app.nms ?? []) {
          const existing = adMetrics.get(nm.nmId) ?? {
            clicks: 0, views: 0, orders: 0, spent: 0,
          };
          existing.clicks += nm.clicks ?? 0;
          existing.views += nm.views ?? 0;
          existing.orders += nm.orders ?? 0;
          existing.spent += nm.sum ?? 0;
          adMetrics.set(nm.nmId, existing);
        }
      }
    }
  }

  // Шаг 5: Объединяем органику + рекламу по каждому товару
  const results = [];

  for (const item of organic.products) {
    const { product, statistic } = item;
    const ad = adMetrics.get(product.nmId);

    results.push({
      nmId: product.nmId,
      title: product.title,
      organic: {
        views: statistic.selected.openCount,
        cart: statistic.selected.cartCount,
        orders: statistic.selected.orderCount,
        revenue: statistic.selected.orderSum,
        avgPrice: statistic.selected.avgPrice,
      },
      advertising: ad ?? null,
      roas: ad && ad.spent > 0 ? statistic.selected.orderSum / ad.spent : null,
      cpa: ad && ad.orders > 0 ? ad.spent / ad.orders : null,
    });
  }

  return results;
}

// Использование
const analysis = await crossChannelAnalysis(sdk, [168120815, 173574852], {
  start: '2026-01-01',
  end: '2026-01-31',
});

for (const item of analysis) {
  console.log(`\n${item.title} (${item.nmId}):`);
  console.log(`  ОРГАНИКА: просмотры=${item.organic.views}, корзина=${item.organic.cart}, заказы=${item.organic.orders}, выручка=${item.organic.revenue} руб.`);

  if (item.advertising) {
    console.log(`  РЕКЛАМА: просмотры=${item.advertising.views}, клики=${item.advertising.clicks}, заказы=${item.advertising.orders}, расход=${item.advertising.spent} руб.`);
    console.log(`  ROAS: ${item.roas?.toFixed(2) ?? 'Н/Д'}x`);
    console.log(`  CPA: ${item.cpa?.toFixed(0) ?? 'Н/Д'} руб.`);
  } else {
    console.log(`  РЕКЛАМА: Нет рекламных данных`);
  }
}
```

### Расчёт ключевых метрик

| Метрика | Формула | Интерпретация |
|---------|---------|---------------|
| **ROAS** (окупаемость рекламы) | `выручка / расход на рекламу` | Значения выше 1.0 означают прибыльную рекламу |
| **CPA** (стоимость привлечения) | `расход / рекламные заказы` | Чем ниже, тем лучше; сравнивайте между товарами |
| **Доля органики** | `органические заказы / все заказы` | Высокая доля = сильное позиционирование товара |
| **Общая конверсия** | `все заказы / все просмотры` | Общий показатель здоровья воронки |

::: tip
ROAS выше 3x обычно считается хорошим результатом на Wildberries. Если ROAS товара падает ниже 1.5x, рассмотрите приостановку рекламы и проверьте качество карточки, цену или отзывы.
:::

---

## Анализ исторических трендов

### Дневные и недельные тренды

Используйте `getSalesFunnelProductsHistory()` для отслеживания динамики эффективности товаров:

```typescript
async function trendAnalysis(
  sdk: WildberriesSDK,
  nmIds: number[],
  period: { start: string; end: string }
) {
  const history = await sdk.analytics.getSalesFunnelProductsHistory({
    selectedPeriod: period,
    nmIds,
    aggregationLevel: 'day',
    skipDeletedNm: true,
  });

  for (const item of history) {
    console.log(`\nТренд: ${item.product.title}`);
    console.log('Дата       | Просм | Корз | Заказы | Выручка    | Корз% | Заказ%');
    console.log('-----------|-------|------|--------|------------|-------|-------');

    for (const day of item.history) {
      const date = day.date.substring(0, 10);
      console.log(
        `${date} | ${String(day.openCount).padStart(5)} | ${String(day.cartCount).padStart(4)} | ${String(day.orderCount).padStart(6)} | ${String(day.orderSum).padStart(10)} | ${day.addToCartConversion.toFixed(1).padStart(5)}% | ${day.cartToOrderConversion.toFixed(1).padStart(5)}%`
      );
    }
  }
}
```

### Сравнение периодов

Используйте параметр `pastPeriod` в `getSalesFunnelProducts()` для сравнения двух временных отрезков:

```typescript
const comparison = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  pastPeriod: { start: '2025-12-01', end: '2025-12-31' },
  nmIds: [168120815],
  subjectIds: [],
  tagIds: [],
  brandNames: [],
  limit: 10,
  offset: 0,
  skipDeletedNm: true,
});

for (const item of comparison.products) {
  const { product, statistic } = item;
  const comp = statistic.comparison;

  console.log(`${product.title}:`);
  console.log(`  Текущий месяц: ${statistic.selected.orderCount} заказов, ${statistic.selected.orderSum} руб.`);

  if (statistic.past) {
    console.log(`  Прошлый месяц: ${statistic.past.orderCount} заказов, ${statistic.past.orderSum} руб.`);
  }

  if (comp) {
    console.log(`  Изменения:`);
    console.log(`    Просмотры: ${comp.openCountDynamic > 0 ? '+' : ''}${comp.openCountDynamic}%`);
    console.log(`    Корзина: ${comp.cartCountDynamic > 0 ? '+' : ''}${comp.cartCountDynamic}%`);
    console.log(`    Заказы: ${comp.orderCountDynamic > 0 ? '+' : ''}${comp.orderCountDynamic}%`);
    console.log(`    Выручка: ${comp.orderSumDynamic > 0 ? '+' : ''}${comp.orderSumDynamic}%`);
    console.log(`    Выкупы: ${comp.buyoutCountDynamic > 0 ? '+' : ''}${comp.buyoutCountDynamic}%`);
    console.log(`    Избранное: ${comp.addToWishlistDynamic > 0 ? '+' : ''}${comp.addToWishlistDynamic}%`);
  }
}
```

#### Поля сравнения (Dynamic)

Все dynamic-поля показывают процентное изменение между `selectedPeriod` и `pastPeriod`:

`openCountDynamic`, `cartCountDynamic`, `orderCountDynamic`, `orderSumDynamic`, `buyoutCountDynamic`, `buyoutSumDynamic`, `cancelCountDynamic`, `cancelSumDynamic`, `avgOrdersCountPerDayDynamic`, `avgPriceDynamic`, `shareOrderPercentDynamic`, `addToWishlistDynamic`, `timeToReadyDynamic`, `localizationPercentDynamic`, `wbClubDynamic.*`

### Еженедельные отчёты

```typescript
async function weekOverWeekReport(sdk: WildberriesSDK, nmIds: number[]) {
  const now = new Date();
  const thisWeekEnd = now.toISOString().split('T')[0];
  const thisWeekStart = new Date(now.getTime() - 6 * 86400000).toISOString().split('T')[0];
  const lastWeekEnd = new Date(now.getTime() - 7 * 86400000).toISOString().split('T')[0];
  const lastWeekStart = new Date(now.getTime() - 13 * 86400000).toISOString().split('T')[0];

  const result = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: { start: thisWeekStart, end: thisWeekEnd },
    pastPeriod: { start: lastWeekStart, end: lastWeekEnd },
    nmIds,
    subjectIds: [],
    tagIds: [],
    brandNames: [],
    limit: 50,
    offset: 0,
    skipDeletedNm: true,
    orderBy: { field: 'orderSum', mode: 'desc' },
  });

  console.log(`\nОтчёт неделя к неделе (${thisWeekStart} vs ${lastWeekStart})\n`);

  for (const item of result.products) {
    const { product, statistic } = item;
    const change = statistic.comparison;

    console.log(`${product.title}:`);
    console.log(`  Эта неделя: ${statistic.selected.orderCount} заказов, ${statistic.selected.orderSum} руб.`);
    if (change) {
      const trend = change.orderCountDynamic > 0 ? 'РОСТ' : change.orderCountDynamic < 0 ? 'ПАДЕНИЕ' : 'БЕЗ ИЗМЕНЕНИЙ';
      console.log(`  Тренд: ${trend} (${change.orderCountDynamic}%)`);
    }
  }
}
```

---

## Паттерны агрегации данных

### Агрегация по бренду

Фильтруйте данные воронки по конкретному бренду для оценки эффективности на уровне бренда:

```typescript
const brandData = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  brandNames: ['MyBrand'],
  subjectIds: [],
  tagIds: [],
  limit: 100,
  offset: 0,
  skipDeletedNm: true,
  orderBy: { field: 'orderSum', mode: 'desc' },
});

let totalViews = 0;
let totalOrders = 0;
let totalRevenue = 0;

for (const item of brandData.products) {
  totalViews += item.statistic.selected.openCount;
  totalOrders += item.statistic.selected.orderCount;
  totalRevenue += item.statistic.selected.orderSum;
}

console.log(`Итого по бренду: ${totalViews} просмотров, ${totalOrders} заказов, ${totalRevenue} руб.`);
console.log(`Общая конверсия: ${((totalOrders / totalViews) * 100).toFixed(2)}%`);
```

### Агрегация по категории

Используйте `subjectIds` для фокусировки на конкретных категориях товаров:

```typescript
const categoryData = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  subjectIds: [105, 206],  // ID конкретных категорий
  brandNames: [],
  tagIds: [],
  limit: 100,
  offset: 0,
  skipDeletedNm: true,
});
```

### Группировка по ярлыкам

Ярлыки позволяют создавать собственные группировки товаров (например, "сезонные", "бестселлеры", "распродажа"):

```typescript
const tagData = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  tagIds: [42],  // ID пользовательского ярлыка
  subjectIds: [],
  brandNames: [],
  limit: 100,
  offset: 0,
  skipDeletedNm: true,
});
```

### Предварительно агрегированная групповая история

Используйте `getSalesFunnelGroupedHistory()` для получения агрегированных трендов без загрузки данных по отдельным товарам:

```typescript
const groupedTrends = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  brandNames: ['BrandA', 'BrandB'],
  subjectIds: [],
  tagIds: [],
  aggregationLevel: 'week',
  skipDeletedNm: true,
});

for (const group of groupedTrends) {
  console.log(`\nГруппа: ${group.product.brandName} - ${group.product.subjectName}`);
  for (const week of group.history) {
    console.log(`  ${week.date}: ${week.orderCount} заказов, ${week.orderSum} руб., выкуп ${week.buyoutPercent}%`);
  }
}
```

### Пагинация для больших каталогов

Когда каталог превышает лимит страницы, итерируйте через `offset`:

```typescript
async function fetchAllProducts(
  sdk: WildberriesSDK,
  period: { start: string; end: string }
) {
  const pageSize = 100;
  let offset = 0;
  const allProducts: Array<{ product: any; statistic: any }> = [];

  while (true) {
    const page = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: period,
      subjectIds: [],
      tagIds: [],
      brandNames: [],
      limit: pageSize,
      offset,
      skipDeletedNm: true,
      orderBy: { field: 'orderSum', mode: 'desc' },
    });

    allProducts.push(...page.products);

    if (page.products.length < pageSize) {
      break;  // Последняя страница
    }

    offset += pageSize;

    // Соблюдаем rate-лимит: 3 зап./мин с интервалом 20с
    await new Promise(resolve => setTimeout(resolve, 21_000));
  }

  console.log(`Загружено ${allProducts.length} товаров`);
  return allProducts;
}
```

::: danger
Всегда добавляйте задержку не менее 21 секунды между пагинированными запросами к `getSalesFunnelProducts()`. Rate-лимит: 3 запроса в минуту с интервалом 20 секунд.
:::

---

## Стратегии оптимизации

### Выявление неэффективных товаров

Товары с высокими просмотрами, но низкой конверсией указывают на проблемы с карточкой:

```typescript
function findUnderperformers(
  products: Array<{ product: any; statistic: any }>,
  minViews: number = 100
) {
  return products
    .filter(item => {
      const stats = item.statistic.selected;
      return stats.openCount >= minViews
        && stats.conversions.addToCartPercent < 3;
    })
    .sort((a, b) =>
      b.statistic.selected.openCount - a.statistic.selected.openCount
    );
}
```

::: tip
Конверсия в корзину ниже 3% при более чем 100 просмотрах обычно указывает на проблемы с фотографиями, описанием, ценой или отзывами. Проверьте `productRating` и `feedbackRating` в данных товара.
:::

### Определение товаров, зависимых от рекламы

Сравнивайте рекламные заказы с органическими для оценки зависимости от рекламы:

```typescript
function analyzeAdDependency(
  crossChannelData: Array<{
    organic: { orders: number };
    advertising: { orders: number; spent: number } | null;
    roas: number | null;
  }>
) {
  for (const item of crossChannelData) {
    if (!item.advertising) continue;
    const adOrderShare = item.advertising.orders / (item.organic.orders || 1);

    if (adOrderShare > 0.5 && (item.roas ?? 0) < 1.5) {
      // Высокая зависимость от рекламы при низком ROAS -- пересмотрите стратегию
    }
  }
}
```

### Перераспределение бюджета на основе ROAS

Сортируйте товары по ROAS и рекомендуйте изменения бюджета:

- **ROAS выше 3x**: Увеличить бюджет -- высокая окупаемость
- **ROAS 1.5x-3x**: Сохранить бюджет -- приемлемая окупаемость
- **ROAS ниже 1.5x**: Снизить бюджет или приостановить -- низкая окупаемость

### Интеграция с управлением остатками

Данные воронки v3 включают `stocks.wb` (склад WB) и `stocks.mp` (склад продавца). Объединяйте с `avgOrdersCountPerDay` для расчёта запаса в днях и создания уведомлений о низких остатках:

```typescript
function checkStockHealth(products: Array<{ product: any; statistic: any }>) {
  for (const item of products) {
    const { product, statistic } = item;
    const totalStock = product.stocks.wb + product.stocks.mp;
    const dailyOrders = statistic.selected.avgOrdersCountPerDay;

    if (dailyOrders > 0) {
      const daysOfStock = totalStock / dailyOrders;
      if (daysOfStock < 7) {
        console.log(`МАЛО ОСТАТКОВ: ${product.title} -- ${daysOfStock.toFixed(0)} дней осталось`);
      }
    }
  }
}
```

---

## Rate-лимиты и производительность

### Справочник по rate-лимитам

| Метод | Модуль | Rate-лимит | Интервал |
|-------|--------|------------|----------|
| `getSalesFunnelProducts()` | Аналитика | 3 зап./мин | 20с между запросами |
| `getSalesFunnelProductsHistory()` | Аналитика | 3 зап./мин | 20с между запросами |
| `getSalesFunnelGroupedHistory()` | Аналитика | 3 зап./мин | 20с между запросами |
| `getAdvFullstats()` | Продвижение | 3 зап./мин | 20с между запросами |
| `getStatsKeywords()` | Продвижение | 240 зап./мин | Без обязательного интервала |
| `getStatWords()` | Продвижение | 240 зап./мин | Без обязательного интервала |
| `getAutoStatWords()` | Продвижение | 240 зап./мин | Без обязательного интервала |

### Последовательный опрос с защитой от rate-лимитов

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function safeFunnelRequest<T>(
  fn: () => Promise<T>,
  retries: number = 2
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof RateLimitError && attempt < retries) {
        console.log(`Rate limit, ожидание 21с (попытка ${attempt + 1}/${retries})`);
        await delay(21_000);
        continue;
      }
      throw error;
    }
  }
  throw new Error('Превышено число попыток');
}
```

### Пакетная отправка ID кампаний

При получении рекламной статистики отправляйте до 100 ID кампаний за запрос:

```typescript
async function batchAdStats(sdk: WildberriesSDK, ids: number[], period: { start: string; end: string }) {
  const results = [];
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const stats = await sdk.promotion.getAdvFullstats({
      ids: batch.join(','),
      beginDate: period.start,
      endDate: period.end,
    });
    results.push(...stats);
    if (i + 100 < ids.length) await delay(21_000);
  }
  return results;
}
```

### Рекомендации по кешированию

| Тип данных | Время кеша | Причина |
|------------|------------|---------|
| Данные воронки по товарам | 30-60 мин | Обновления не в реальном времени |
| Рекламная статистика | 15-30 мин | Обновляется чаще |
| Исторические данные | 2-4 часа | Прошлые данные не меняются |
| Список кампаний | 5-10 мин | Кампании могут создаваться/приостанавливаться |

---

## Заметки по миграции (v2.6 на v2.7)

### Устаревшие методы

| Устаревший (v2) | Замена (v3) |
|------------------|-------------|
| `createNmReportDetail()` | `getSalesFunnelProducts()` |
| `createDetailHistory()` | `getSalesFunnelProductsHistory()` |
| `createGroupedHistory()` | `getSalesFunnelGroupedHistory()` |

Устаревшие методы по-прежнему существуют как обёртки, которые внутри вызывают v3, но возвращают v3-структуру ответа, приведённую к старым типам. Мигрируйте для корректной типизации TypeScript.

### Переименование полей запроса

| Поле v2 | Поле v3 |
|---------|---------|
| `period: { begin, end }` | `selectedPeriod: { start, end }` |
| `nmIDs` | `nmIds` |
| `objectIDs` | `subjectIds` |
| `tagIDs` | `tagIds` |
| `page` | `limit` + `offset` |
| `timezone` | *(удалено)* |

### Переименование полей ответа

| Поле v2 | Поле v3 |
|---------|---------|
| `openCardCount` | `openCount` |
| `addToCartCount` | `cartCount` |
| `ordersCount` | `orderCount` |
| `ordersSumRub` | `orderSum` |
| `buyoutsSumRub` | `buyoutSum` |
| `cancelSumRub` | `cancelSum` |
| `avgPriceRub` | `avgPrice` |
| `dt` | `date` |

### Новые поля только в v3

`shareOrderPercent`, `addToWishlist`, `timeToReady`, `localizationPercent`, `wbClub.*`, `productRating`, `feedbackRating`, `stocks.balanceSum`

Полное руководство по миграции: [Migration v2.7 - Analytics v3](./migration-v2.7-analytics-v3.md).

---

## Полный пример дашборда

Полный пример, объединяющий органические и рекламные данные в консольный дашборд:

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
} from 'daytona-wildberries-typescript-sdk';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function analyticsDashboard() {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    retryConfig: { maxRetries: 3, retryDelay: 1000, exponentialBackoff: true },
  });

  const period = { start: '2026-01-01', end: '2026-01-31' };

  try {
    // 1. Загружаем топ товаров по выручке
    console.log('Загрузка органических данных воронки...');
    const products = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: period,
      pastPeriod: { start: '2025-12-01', end: '2025-12-31' },
      subjectIds: [],
      tagIds: [],
      brandNames: [],
      limit: 20,
      offset: 0,
      skipDeletedNm: true,
      orderBy: { field: 'orderSum', mode: 'desc' },
    });

    await delay(21_000);

    // 2. Загружаем список кампаний
    console.log('Загрузка списка кампаний...');
    const campaigns = await sdk.promotion.getPromotionCount();
    const activeIds = campaigns.adverts
      ?.filter(g => g.status === 9)
      .flatMap(g => g.advert_list?.map(a => a.advertId) ?? [])
      .filter((id): id is number => id !== undefined) ?? [];

    await delay(21_000);

    // 3. Загружаем рекламную статистику
    let adStats: any[] = [];
    if (activeIds.length > 0) {
      console.log(`Загрузка рекламной статистики для ${activeIds.length} кампаний...`);
      adStats = await sdk.promotion.getAdvFullstats({
        ids: activeIds.slice(0, 100).join(','),
        beginDate: period.start,
        endDate: period.end,
      });
    }

    // 4. Строим карту рекламных метрик по nmId
    const adMap = new Map<number, { clicks: number; views: number; orders: number; spent: number }>();
    for (const c of adStats) {
      if (!c.days) continue;
      for (const day of c.days as any[]) {
        for (const app of day.apps ?? []) {
          for (const nm of app.nms ?? []) {
            const e = adMap.get(nm.nmId) ?? { clicks: 0, views: 0, orders: 0, spent: 0 };
            e.clicks += nm.clicks ?? 0;
            e.views += nm.views ?? 0;
            e.orders += nm.orders ?? 0;
            e.spent += nm.sum ?? 0;
            adMap.set(nm.nmId, e);
          }
        }
      }
    }

    // 5. Выводим дашборд
    console.log('\n========================================');
    console.log('  АНАЛИТИЧЕСКИЙ ДАШБОРД WILDBERRIES');
    console.log(`  Период: ${period.start} -- ${period.end}`);
    console.log('========================================\n');

    let totalRevenue = 0;
    let totalAdSpend = 0;

    for (const item of products.products) {
      const { product, statistic } = item;
      const ad = adMap.get(product.nmId);
      const sel = statistic.selected;

      totalRevenue += sel.orderSum;
      if (ad) totalAdSpend += ad.spent;

      console.log(`--- ${product.title} (${product.nmId}) ---`);
      console.log(`  Просмотры: ${sel.openCount} | Заказы: ${sel.orderCount} | Выручка: ${sel.orderSum} руб.`);
      console.log(`  Конв.: корзина ${sel.conversions.addToCartPercent}% | заказ ${sel.conversions.cartToOrderPercent}% | выкуп ${sel.conversions.buyoutPercent}%`);

      if (ad) {
        const roas = ad.spent > 0 ? (sel.orderSum / ad.spent).toFixed(2) : 'Н/Д';
        console.log(`  Реклама: ${ad.clicks} кликов, ${ad.orders} заказов, ${ad.spent} руб. расход | ROAS: ${roas}x`);
      }
      console.log('');
    }

    console.log('========================================');
    console.log(`  Общая выручка: ${totalRevenue} руб.`);
    console.log(`  Расход на рекламу: ${totalAdSpend} руб.`);
    if (totalAdSpend > 0) {
      console.log(`  Общий ROAS: ${(totalRevenue / totalAdSpend).toFixed(2)}x`);
    }
    console.log('========================================');

  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Ошибка аутентификации. Проверьте API-ключ.');
    } else if (error instanceof RateLimitError) {
      console.error('Превышен rate-лимит. Увеличьте задержку между запросами.');
    } else if (error instanceof ValidationError) {
      console.error('Ошибка валидации:', (error as any).message);
    } else {
      throw error;
    }
  }
}

analyticsDashboard();
```

---

## Связанные руководства

- [Лучшие практики рекламных кампаний](./best-practices-advertising.md)
- [Руководство по рекламной статистике](./advertising-statistics-guide.md)
- [Миграция v2.7 - Аналитика v3](./migration-v2.7-analytics-v3.md)
- [Лучшие практики для продакшена](./best-practices.md)
- [Учебник: Аналитический дашборд](/getting-started/tutorials/analytics-dashboard.md)

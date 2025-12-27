# Руководство по Склейке Карточек и Аналитике

Это комплексное руководство охватывает склейку карточек товаров Wildberries (объединение карточек), включая создание, управление, отслеживание аналитики и распределение рекламного трафика по склеенным карточкам.

## Содержание

- [Обзор](#обзор)
- [Понимание Склейки Карточек](#понимание-склейки-карточек)
- [Управление Склеенными Карточками](#управление-склеенными-карточками)
- [Аналитика для Склеенных Карточек](#аналитика-для-склеенных-карточек)
- [Рекламная Аналитика](#рекламная-аналитика)
- [Распределение Трафика в Склеенных Карточках](#распределение-трафика-в-склеенных-карточках)
- [Практические Примеры](#практические-примеры)
- [Лучшие Практики](#лучшие-практики)
- [Решение Проблем](#решение-проблем)

---

## Обзор

**Склейка карточек товаров** (объединение карточек) — это мощная функция Wildberries, которая позволяет продавцам объединять несколько карточек товаров (разные варианты) под одним единым листингом. Это создает лучший опыт для покупателей и позволяет реализовывать продвинутые рекламные стратегии.

### Ключевые Возможности

- **Единый Листинг**: Несколько вариантов товара (цвета, размеры, конфигурации) отображаются как одна карточка
- **Общий Трафик**: Реклама, купленная на один вариант, направляет трафик на все варианты в склеенной карточке
- **Кросс-продажи Вариантов**: Покупатели, пришедшие на один вариант, могут купить любой вариант из склеенной карточки
- **Централизованная Аналитика**: Отслеживание эффективности по всем вариантам в склеенной карточке
- **Эффективность Рекламы**: Оптимизация рекламных расходов путем таргетинга высококонверсионных вариантов с пользой для всей линейки товаров

### Концепция `imtID`

Все склеенные карточки имеют общий идентификатор: **`imtID`** (ID объединённой карточки товара).

- Каждая карточка товара имеет `imtID`, даже если она не объединена с другими
- Карточки с **одинаковым `imtID`** являются склеенными
- `imtID` сохраняется на протяжении всего жизненного цикла склеенной карточки
- Используйте `imtID` для идентификации, фильтрации и управления склеенными карточками

---

## Понимание Склейки Карточек

### Что такое Склеенная Карточка?

**Склеенная карточка** — это группа карточек товаров (вариантов), которые отображаются как один листинг для покупателей на маркетплейсе Wildberries.

**Пример:**

```
Смартфон "SuperPhone X"
├─ Черный, 128ГБ (nmID: 12345678, imtID: 999888)
├─ Белый, 128ГБ (nmID: 23456789, imtID: 999888)
├─ Черный, 256ГБ (nmID: 34567890, imtID: 999888)
└─ Белый, 256ГБ (nmID: 45678901, imtID: 999888)

Все 4 варианта имеют imtID: 999888 → Склеенная Карточка
```

### Как Покупатели Видят Склеенные Карточки

На маркетплейсе Wildberries покупатели видят:
- **Одну главную карточку товара** с основным изображением
- **Селекторы вариантов** (кнопки выбора цвета, размера, конфигурации)
- **Объединенные отзывы** по всем вариантам
- **Суммарную доступность** со всех вариантов

### Преимущества Склейки Карточек

1. **Лучший Опыт Покупателя**: Простой выбор вариантов без поиска нескольких листингов
2. **Улучшенная Конверсия**: Покупатели находят все варианты в одном месте
3. **SEO Преимущества**: Консолидированные отзывы и сигналы трафика
4. **Эффективность Рекламы**: Покупайте рекламу на один вариант, получайте пользу для всей линейки товаров
5. **Упрощенное Управление**: Управляйте связанными товарами как группой

### Требования для Склейки

⚠️ **Критическое Ограничение**: Вы можете склеивать только карточки с **одинаковым subjectID** (категорией товара).

```typescript
// ✅ Валидная склейка: Одинаковый subjectID (3091 - Смартфоны)
const validMerge = {
  targetIMT: 999888,
  nmIDs: [12345678, 23456789, 34567890] // Все имеют subjectID: 3091
};

// ❌ Невалидная склейка: Разные subjectIDs
const invalidMerge = {
  targetIMT: 999888,
  nmIDs: [12345678, 99887766] // Разные subjectIDs → Ошибка API
};
```

---

## Управление Склеенными Карточками

### Идентификация Склеенных Карточек

#### Метод 1: Фильтрация по `imtID`

Получить все карточки в определенной склеенной карточке:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Получить все варианты в склеенной карточке 999888
const response = await sdk.products.getCardsList({
  settings: {
    filter: {
      imtID: 999888,
      withPhoto: -1 // Все карточки (с фото и без)
    },
    cursor: {
      limit: 100
    }
  }
});

console.log(`Склеенная карточка содержит ${response.cards?.length} вариантов`);
response.cards?.forEach(card => {
  console.log(`- nmID: ${card.nmID}, Артикул: ${card.vendorCode}`);
});
```

#### Метод 2: Найти Все Склеенные Карточки

Определить все склеенные карточки в вашем каталоге:

```typescript
// Получить все карточки товаров
const allCards = await sdk.products.getCardsList({
  settings: {
    filter: { withPhoto: -1 },
    cursor: { limit: 1000 }
  }
});

// Сгруппировать по imtID
const grouped = (allCards.cards || []).reduce((acc, card) => {
  const id = card.imtID!;
  if (!acc[id]) acc[id] = [];
  acc[id].push(card);
  return acc;
}, {} as Record<number, typeof allCards.cards>);

// Найти склеенные карточки (imtID с несколькими карточками)
const mergedCards = Object.entries(grouped)
  .filter(([_, cards]) => cards.length > 1)
  .map(([imtID, cards]) => ({
    imtID: Number(imtID),
    variantCount: cards.length,
    nmIDs: cards.map(c => c.nmID),
    vendorCodes: cards.map(c => c.vendorCode)
  }));

console.log(`Найдено ${mergedCards.length} склеенных карточек`);
mergedCards.forEach(merged => {
  console.log(`\nimtID ${merged.imtID}: ${merged.variantCount} вариантов`);
  console.log(`  Артикулы: ${merged.vendorCodes.join(', ')}`);
});
```

**Пример Вывода:**
```
Найдено 3 склеенных карточек

imtID 999888: 4 варианта
  Артикулы: PHONE-BLK-128, PHONE-WHT-128, PHONE-BLK-256, PHONE-WHT-256

imtID 777666: 2 варианта
  Артикулы: CASE-BLK, CASE-WHT

imtID 555444: 3 варианта
  Артикулы: HEADPHONES-BLK, HEADPHONES-WHT, HEADPHONES-BLUE
```

### Создание Склеенных Карточек

#### Вариант 1: Склеить Существующие Карточки

Объединить существующие карточки товаров под одним `imtID`:

```typescript
// Склеить 3 существующие карточки под существующим imtID 999888
await sdk.products.mergeCards({
  targetIMT: 999888,        // Существующий imtID (любой карточки, которую хотите сохранить)
  nmIDs: [12345678, 23456789, 34567890]  // До 30 карточек
});

console.log('Карточки успешно склеены');
```

**Ответ:**
```json
{
  "data": null,
  "error": false,
  "errorText": "",
  "additionalErrors": {}
}
```

#### Вариант 2: Создать Карточку и Присоединить к Существующей Склейке

Создать новый вариант и сразу присоединить к существующей склеенной карточке:

```typescript
// Создать новый вариант и присоединить к imtID 999888
const result = await sdk.products.createAndAttachCard({
  imtID: 999888,
  cardsToAdd: [
    {
      vendorCode: 'PHONE-BLUE-128',
      title: 'SuperPhone X Синий 128ГБ',
      description: 'Новейший смартфон в потрясающем синем цвете',
      characteristics: [
        { id: 14177858, value: 'SuperBrand' }, // Бренд
        { id: 85, value: ['Синий'] },          // Цвет
        { id: 200, value: 128 }                // Память
      ],
      sizes: [
        {
          techSize: '0',
          skus: ['8800555123456'],
          price: 49990
        }
      ]
    }
  ]
});

console.log('Новый вариант создан и присоединен к склеенной карточке');
```

#### Вариант 3: Создать Склеенную Карточку с Нуля

Создать несколько вариантов как склеенную карточку в одном запросе:

```typescript
const newMergedCard = await sdk.products.createProduct([
  {
    subjectID: 3091, // Смартфоны
    variants: [
      {
        vendorCode: 'PHONE-BLK-128',
        title: 'SuperPhone X Черный 128ГБ',
        description: 'Флагманский смартфон',
        characteristics: [
          { id: 14177858, value: 'SuperBrand' },
          { id: 85, value: ['Черный'] },
          { id: 200, value: 128 }
        ],
        sizes: [
          {
            techSize: '0',
            skus: ['8800555111111'],
            price: 49990
          }
        ]
      },
      {
        vendorCode: 'PHONE-WHT-128',
        title: 'SuperPhone X Белый 128ГБ',
        description: 'Флагманский смартфон',
        characteristics: [
          { id: 14177858, value: 'SuperBrand' },
          { id: 85, value: ['Белый'] },
          { id: 200, value: 128 }
        ],
        sizes: [
          {
            techSize: '0',
            skus: ['8800555222222'],
            price: 49990
          }
        ]
      }
    ]
  }
]);

console.log('Склеенная карточка создана с 2 вариантами');
```

### Разъединение Карточек

Разделить склеенные карточки, чтобы дать каждому варианту уникальный `imtID`:

```typescript
// Разъединить ОДНУ карточку за раз для получения уникального imtID
await sdk.products.unmergeCards({
  nmIDs: [12345678] // Передать один nmID для уникального imtID
});

console.log('Карточка разъединена с новым уникальным imtID');
```

⚠️ **Важно**: Если вы разъедините несколько карточек одновременно, они объединятся вместе под новым `imtID`. Чтобы дать каждой карточке уникальный `imtID`, **разъединяйте по одной карточке за запрос**.

```typescript
// ❌ Неправильно: Объединит эти 3 карточки вместе под новым imtID
await sdk.products.unmergeCards({
  nmIDs: [12345678, 23456789, 34567890]
});

// ✅ Правильно: Каждая получит уникальный imtID
await sdk.products.unmergeCards({ nmIDs: [12345678] });
await sdk.products.unmergeCards({ nmIDs: [23456789] });
await sdk.products.unmergeCards({ nmIDs: [34567890] });
```

---

## Аналитика для Склеенных Карточек

### Понимание Аналитики Склеенных Карточек

Wildberries отслеживает метрики производительности на нескольких уровнях:
- **По варианту (nmID)**: Производительность отдельной карточки товара
- **По склеенной карточке (imtID)**: Агрегированная производительность по всем вариантам

### Ключевые Метрики Аналитики

| Метрика | Описание | Доступна На |
|---------|----------|-------------|
| Просмотры | Просмотры страницы товара | По варианту, По склейке |
| Добавления в корзину | Товары добавленные в корзину | По варианту, По склейке |
| Заказы | Завершенные покупки | По варианту, По склейке |
| Выручка | Общая сумма продаж | По варианту, По склейке |
| Конверсия | Заказы / Просмотры | По варианту, По склейке |
| Возвраты | Возвраты / Заказы | По варианту, По склейке |

### Получение Аналитики для Склеенных Карточек

#### Аналитика Воронки Продаж

Отслеживание воронки конверсии для каждого варианта:

```typescript
// Получить воронку продаж для конкретного варианта
const funnel = await sdk.analytics.getSalesFunnel({
  nmIDs: [12345678],
  period: {
    begin: '2024-01-01',
    end: '2024-01-31'
  }
});

console.log('Производительность Варианта:');
console.log(`Просмотры: ${funnel.data?.[0]?.openCardCount}`);
console.log(`Добавления в корзину: ${funnel.data?.[0]?.addToCartCount}`);
console.log(`Заказы: ${funnel.data?.[0]?.ordersCount}`);
console.log(`Конверсия: ${(funnel.data?.[0]?.ordersCount / funnel.data?.[0]?.openCardCount * 100).toFixed(2)}%`);
```

#### Агрегированная Аналитика для Всех Вариантов

Рассчитать общую производительность склеенной карточки:

```typescript
// Получить все варианты в склеенной карточке
const mergedCardVariants = await sdk.products.getCardsList({
  settings: {
    filter: { imtID: 999888 }
  }
});

const nmIDs = mergedCardVariants.cards!.map(c => c.nmID!);

// Получить аналитику для всех вариантов
const allFunnels = await sdk.analytics.getSalesFunnel({
  nmIDs: nmIDs,
  period: {
    begin: '2024-01-01',
    end: '2024-01-31'
  }
});

// Агрегировать метрики
const totals = (allFunnels.data || []).reduce((acc, variant) => ({
  views: acc.views + (variant.openCardCount || 0),
  addToCart: acc.addToCart + (variant.addToCartCount || 0),
  orders: acc.orders + (variant.ordersCount || 0),
  revenue: acc.revenue + (variant.ordersCount || 0) * (variant.avgPriceRub || 0)
}), { views: 0, addToCart: 0, orders: 0, revenue: 0 });

console.log('Общая Производительность Склеенной Карточки:');
console.log(`Всего Просмотров: ${totals.views}`);
console.log(`Всего Заказов: ${totals.orders}`);
console.log(`Общая Выручка: ${totals.revenue.toFixed(2)}₽`);
console.log(`Общая Конверсия: ${(totals.orders / totals.views * 100).toFixed(2)}%`);
```

---

## Рекламная Аналитика

### Как Работает Реклама со Склеенными Карточками

Это **самая мощная функция** склеенных карточек для оптимизации рекламы.

#### Модель Распределения Трафика

Когда вы запускаете рекламные кампании на Wildberries:

1. **Покупаете Рекламу на Конкретные Варианты**: Вы выбираете, какие nmID рекламировать
2. **Покупатели Кликают на Рекламируемый Вариант**: Попадая на карточку товара
3. **Покупатель Видит Все Варианты**: Благодаря склейке все варианты видны
4. **Покупатель Может Купить Любой Вариант**: Не ограничиваясь рекламируемым
5. **Атрибуция**: Продажа атрибутируется рекламируемому варианту в статистике кампании, но выручка идет купленному варианту

**Визуальная Схема:**

```
┌─────────────────────────────────────────────────────────────┐
│ Рекламная Кампания: Таргет Черный 128ГБ (nmID: 12345678)   │
│ Бюджет: 10 000₽/день                                        │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────┐
        │ Покупатель кликает рекламу │
        │ Попадает на Черный 128ГБ   │
        └───────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────────────────┐
        │ Отображается Склейка (imtID: 999888)          │
        │                                               │
        │  ○ Черный 128ГБ  (рекламируемый)             │
        │  ○ Белый 128ГБ   (видимый вариант)           │
        │  ○ Черный 256ГБ  (видимый вариант)           │
        │  ○ Белый 256ГБ   (видимый вариант)           │
        └───────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────┐
        │ Покупатель выбирает:       │
        │ Белый 256ГБ ✓             │
        │ (Другой вариант!)          │
        └───────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────┐
        │ Покупка Завершена          │
        │ Выручка: 59 990₽          │
        │ Идет на: Белый 256ГБ      │
        └───────────────────────────┘
```

### Отслеживание Атрибуции Рекламы

#### Статистика Кампаний

Получить эффективность рекламной кампании:

```typescript
// Получить статистику кампании для рекламируемого варианта
const campaignStats = await sdk.promotion.getAutoStatWords({
  id: 123456 // ID кампании
});

console.log('Производительность Кампании:');
campaignStats.forEach(stat => {
  console.log(`Ключевое слово: ${stat.keyword}`);
  console.log(`  Клики: ${stat.clicks}`);
  console.log(`  Показы: ${stat.views}`);
  console.log(`  CTR: ${(stat.clicks / stat.views * 100).toFixed(2)}%`);
  console.log(`  Заказы: ${stat.orders}`);
  console.log(`  Расход: ${stat.sum}₽`);
});
```

#### Атрибуция Продаж по Вариантам

**Критическое Понимание**: Статистика кампании показывает заказы, атрибутированные **рекламируемому варианту**, но фактические продажи могут быть с **других вариантов** в склеенной карточке.

Чтобы получить полную картину:

```typescript
interface AdvertisingAnalytics {
  campaignId: number;
  advertisedVariant: number; // nmID
  imtID: number;

  // Метрики кампании (из Promotion API)
  clicks: number;
  impressions: number;
  spend: number;
  attributedOrders: number; // Заказы, кликнувшие через рекламируемый вариант

  // Фактические метрики продаж (из Analytics API)
  variantSales: {
    nmID: number;
    vendorCode: string;
    orders: number;
    revenue: number;
  }[];

  totalOrders: number;
  totalRevenue: number;
}

async function getComprehensiveAdAnalytics(
  campaignId: number,
  advertisedNmID: number,
  imtID: number,
  dateRange: { begin: string; end: string }
): Promise<AdvertisingAnalytics> {

  // 1. Получить производительность кампании
  const campaignStats = await sdk.promotion.getAutoStatWords({ id: campaignId });
  const campaignMetrics = campaignStats.reduce((acc, stat) => ({
    clicks: acc.clicks + stat.clicks,
    impressions: acc.impressions + stat.views,
    spend: acc.spend + stat.sum,
    attributedOrders: acc.attributedOrders + stat.orders
  }), { clicks: 0, impressions: 0, spend: 0, attributedOrders: 0 });

  // 2. Получить все варианты в склеенной карточке
  const mergedCard = await sdk.products.getCardsList({
    settings: {
      filter: { imtID }
    }
  });

  const allNmIDs = mergedCard.cards!.map(c => c.nmID!);

  // 3. Получить фактические продажи для каждого варианта
  const salesData = await sdk.analytics.getSalesFunnel({
    nmIDs: allNmIDs,
    period: dateRange
  });

  const variantSales = (salesData.data || []).map(variant => ({
    nmID: variant.nmID!,
    vendorCode: mergedCard.cards!.find(c => c.nmID === variant.nmID)?.vendorCode || '',
    orders: variant.ordersCount || 0,
    revenue: (variant.ordersCount || 0) * (variant.avgPriceRub || 0)
  }));

  const totals = variantSales.reduce((acc, v) => ({
    orders: acc.orders + v.orders,
    revenue: acc.revenue + v.revenue
  }), { orders: 0, revenue: 0 });

  return {
    campaignId,
    advertisedVariant: advertisedNmID,
    imtID,
    ...campaignMetrics,
    variantSales,
    totalOrders: totals.orders,
    totalRevenue: totals.revenue
  };
}

// Использование
const analytics = await getComprehensiveAdAnalytics(
  123456,          // ID кампании
  12345678,        // Рекламируемый nmID (Черный 128ГБ)
  999888,          // imtID
  {
    begin: '2024-01-01',
    end: '2024-01-31'
  }
);

console.log('\n=== Отчет о Рекламной Эффективности ===\n');
console.log(`ID Кампании: ${analytics.campaignId}`);
console.log(`Рекламируемый Вариант: ${analytics.advertisedVariant}`);
console.log(`\nМетрики Кампании:`);
console.log(`  Показы: ${analytics.impressions}`);
console.log(`  Клики: ${analytics.clicks}`);
console.log(`  CTR: ${(analytics.clicks / analytics.impressions * 100).toFixed(2)}%`);
console.log(`  Расход: ${analytics.spend.toFixed(2)}₽`);
console.log(`  Атрибутированные Заказы: ${analytics.attributedOrders}`);

console.log(`\nФактические Продажи по Вариантам:`);
analytics.variantSales.forEach(variant => {
  const percentage = (variant.orders / analytics.totalOrders * 100).toFixed(1);
  console.log(`  ${variant.vendorCode}: ${variant.orders} заказов (${percentage}%) - ${variant.revenue.toFixed(2)}₽`);
});

console.log(`\nИтого:`);
console.log(`  Всего Заказов: ${analytics.totalOrders}`);
console.log(`  Общая Выручка: ${analytics.totalRevenue.toFixed(2)}₽`);
console.log(`  CPA: ${(analytics.spend / analytics.totalOrders).toFixed(2)}₽`);
console.log(`  ROAS: ${(analytics.totalRevenue / analytics.spend).toFixed(2)}x`);
```

**Пример Вывода:**

```
=== Отчет о Рекламной Эффективности ===

ID Кампании: 123456
Рекламируемый Вариант: 12345678 (PHONE-BLK-128)

Метрики Кампании:
  Показы: 50 000
  Клики: 1 500
  CTR: 3.00%
  Расход: 7 500.00₽
  Атрибутированные Заказы: 45

Фактические Продажи по Вариантам:
  PHONE-BLK-128: 12 заказов (26.7%) - 599 880.00₽
  PHONE-WHT-128: 15 заказов (33.3%) - 749 850.00₽
  PHONE-BLK-256: 8 заказов (17.8%) - 479 920.00₽
  PHONE-WHT-256: 10 заказов (22.2%) - 599 900.00₽

Итого:
  Всего Заказов: 45
  Общая Выручка: 2 429 550.00₽
  CPA: 166.67₽
  ROAS: 323.94x
```

**Ключевой Инсайт**: Только **26.7%** заказов пришлось на рекламируемый вариант (Черный 128ГБ), но кампания привела к продажам по всем 4 вариантам, генерируя **3.24x** возврат на рекламные расходы.

---

## Распределение Трафика в Склеенных Карточках

### Стратегические Рекламные Подходы

#### Стратегия 1: Рекламировать Лучше Конвертирующий Вариант

Определите вариант с лучшим коэффициентом конверсии и рекламируйте его:

```typescript
// 1. Проанализировать коэффициенты конверсии для всех вариантов
const variants = await sdk.analytics.getSalesFunnel({
  nmIDs: [12345678, 23456789, 34567890, 45678901],
  period: { begin: '2024-01-01', end: '2024-01-31' }
});

const bestVariant = (variants.data || [])
  .map(v => ({
    nmID: v.nmID!,
    conversionRate: (v.ordersCount || 0) / (v.openCardCount || 1)
  }))
  .sort((a, b) => b.conversionRate - a.conversionRate)[0];

console.log(`Лучше конвертирующий вариант: ${bestVariant.nmID}`);
console.log(`Коэффициент конверсии: ${(bestVariant.conversionRate * 100).toFixed(2)}%`);

// 2. Создать кампанию, нацеленную на лучший вариант
const campaign = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - Лучший Исполнитель',
  nms: [bestVariant.nmID],
  bid_type: 'manual',
  placement_types: ['search', 'recommendations']
});

console.log('Кампания создана, нацеленная на лучше конвертирующий вариант');
```

#### Стратегия 2: Рекламировать Несколько Вариантов Одновременно

Запустить отдельные кампании для разных вариантов, чтобы захватить разные поисковые намерения:

```typescript
// Кампания 1: Таргет на поиски "черный смартфон"
const campaign1 = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - Черный Вариант',
  nms: [12345678], // Черный 128ГБ
  bid_type: 'manual',
  placement_types: ['search']
});

// Кампания 2: Таргет на поиски "белый смартфон"
const campaign2 = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - Белый Вариант',
  nms: [23456789], // Белый 128ГБ
  bid_type: 'manual',
  placement_types: ['search']
});

// Кампания 3: Таргет на поиски "смартфон большая память"
const campaign3 = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - Вариант 256ГБ',
  nms: [34567890], // Черный 256ГБ
  bid_type: 'manual',
  placement_types: ['search']
});

console.log('Мульти-вариантная рекламная стратегия развернута');
```

#### Стратегия 3: A/B Тестирование Вариантов

Протестировать, какой вариант дает лучшую общую производительность склеенной карточки:

```typescript
interface VariantTest {
  variantName: string;
  nmID: number;
  campaignId: number;
  budget: number;

  // Результаты теста
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  totalOrders: number;
  totalRevenue: number;
  roas: number;
}

const tests: VariantTest[] = [
  {
    variantName: 'Черный 128ГБ',
    nmID: 12345678,
    campaignId: 111111,
    budget: 5000,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    spend: 0,
    totalOrders: 0,
    totalRevenue: 0,
    roas: 0
  },
  {
    variantName: 'Белый 128ГБ',
    nmID: 23456789,
    campaignId: 222222,
    budget: 5000,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    spend: 0,
    totalOrders: 0,
    totalRevenue: 0,
    roas: 0
  }
];

// Запустить тест на 7 дней, затем проанализировать
async function analyzeABTest() {
  for (const test of tests) {
    // Получить статистику кампании
    const campaignStats = await sdk.promotion.getAutoStatWords({
      id: test.campaignId
    });

    const metrics = campaignStats.reduce((acc, stat) => ({
      impressions: acc.impressions + stat.views,
      clicks: acc.clicks + stat.clicks,
      spend: acc.spend + stat.sum
    }), { impressions: 0, clicks: 0, spend: 0 });

    // Получить продажи склеенной карточки
    const sales = await sdk.analytics.getSalesFunnel({
      nmIDs: [12345678, 23456789, 34567890, 45678901],
      period: { begin: '2024-01-01', end: '2024-01-07' }
    });

    const totalOrders = sales.data?.reduce((sum, v) => sum + (v.ordersCount || 0), 0) || 0;
    const totalRevenue = sales.data?.reduce((sum, v) =>
      sum + (v.ordersCount || 0) * (v.avgPriceRub || 0), 0) || 0;

    test.impressions = metrics.impressions;
    test.clicks = metrics.clicks;
    test.ctr = metrics.clicks / metrics.impressions;
    test.spend = metrics.spend;
    test.totalOrders = totalOrders;
    test.totalRevenue = totalRevenue;
    test.roas = totalRevenue / metrics.spend;
  }

  // Сравнить результаты
  console.log('\n=== Результаты A/B Теста ===\n');
  tests.forEach(test => {
    console.log(`${test.variantName}:`);
    console.log(`  Показы: ${test.impressions}`);
    console.log(`  Клики: ${test.clicks} (CTR: ${(test.ctr * 100).toFixed(2)}%)`);
    console.log(`  Расход: ${test.spend.toFixed(2)}₽`);
    console.log(`  Всего Заказов (Все Варианты): ${test.totalOrders}`);
    console.log(`  Общая Выручка (Все Варианты): ${test.totalRevenue.toFixed(2)}₽`);
    console.log(`  ROAS: ${test.roas.toFixed(2)}x\n`);
  });

  const winner = tests.sort((a, b) => b.roas - a.roas)[0];
  console.log(`🏆 Победитель: ${winner.variantName} с ${winner.roas.toFixed(2)}x ROAS`);
}
```

---

## Финансовая Аналитика для Склеенных Карточек

### Проблема Распределения Расходов

При запуске рекламных кампаний на склеенные карточки вы сталкиваетесь с **критической проблемой финансовой аналитики**:

**Сценарий:**
- **Кампания**: Рекламируется Черный 128ГБ вариант (nmID: 12345678)
- **Расход на Рекламу**: 10 000₽
- **Результат Продаж**: Покупатели купили ВСЕ варианты в склеенной карточке

**Проблема:**
```
Продажи по Вариантам:
  Черный 128ГБ:  12 заказов × 49 990₽ = 599 880₽  (рекламировался)
  Белый 128ГБ:   15 заказов × 49 990₽ = 749 850₽  (НЕ рекламировался!)
  Черный 256ГБ:  8 заказов × 59 990₽ = 479 920₽   (НЕ рекламировался!)
  Белый 256ГБ:   10 заказов × 59 990₽ = 599 900₽  (НЕ рекламировался!)

❌ НЕПРАВИЛЬНЫЙ расчет:
  Метрики Белого 128ГБ:
    Расход на рекламу: 0₽
    Выручка: 749 850₽
    ROAS: ∞ (бессмысленно!)

✅ ПРАВИЛЬНОЕ понимание:
  Все 45 продаж результат ОДНОЙ кампании с расходом 10 000₽
  Нужно РАСПРЕДЕЛИТЬ рекламные расходы по вариантам!
```

**Почему Это Важно:**
- **Анализ Прибыльности**: Какие варианты реально прибыльны?
- **Оптимизация Бюджета**: Куда инвестировать больше/меньше рекламного бюджета?
- **Ценовая Стратегия**: Какие варианты субсидируют другие?
- **Товарный Микс**: Какие варианты продвигать/снимать с производства?

### Методы Распределения Расходов

Существует **4 основных подхода** к распределению рекламных расходов по вариантам склеенной карточки:

#### Метод 1: Пропорционально Заказам (На Основе Единиц)

Распределение рекламных расходов на основе количества заказов, сгенерированных каждым вариантом.

**Формула:**
```
Расход на Вариант = Общий Расход × (Заказы Варианта / Всего Заказов)
```

**Реализация:**
```typescript
interface VariantFinancials {
  nmID: number;
  vendorCode: string;
  orders: number;
  revenue: number;
  allocatedAdCost: number;
  profit: number;
  roas: number;
  profitMargin: number;
}

function allocateByOrders(
  totalAdSpend: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  const totalOrders = variantSales.reduce((sum, v) => sum + v.orders, 0);

  return variantSales.map(variant => {
    const allocatedAdCost = totalAdSpend * (variant.orders / totalOrders);
    const profit = variant.revenue - allocatedAdCost;
    const roas = variant.revenue / allocatedAdCost;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}

// Использование
const totalAdSpend = 10000;
const variantSales = [
  { nmID: 12345678, vendorCode: 'PHONE-BLK-128', orders: 12, revenue: 599880 },
  { nmID: 23456789, vendorCode: 'PHONE-WHT-128', orders: 15, revenue: 749850 },
  { nmID: 34567890, vendorCode: 'PHONE-BLK-256', orders: 8, revenue: 479920 },
  { nmID: 45678901, vendorCode: 'PHONE-WHT-256', orders: 10, revenue: 599900 }
];

const financials = allocateByOrders(totalAdSpend, variantSales);

console.log('\n=== Финансовый Анализ: Распределение по Заказам ===\n');
financials.forEach(v => {
  console.log(`${v.vendorCode}:`);
  console.log(`  Заказы: ${v.orders}`);
  console.log(`  Выручка: ${v.revenue.toFixed(2)}₽`);
  console.log(`  Распределенный Расход: ${v.allocatedAdCost.toFixed(2)}₽`);
  console.log(`  Прибыль: ${v.profit.toFixed(2)}₽`);
  console.log(`  ROAS: ${v.roas.toFixed(2)}x`);
  console.log(`  Маржа Прибыли: ${v.profitMargin.toFixed(1)}%\n`);
});
```

**Пример Вывода:**
```
=== Финансовый Анализ: Распределение по Заказам ===

PHONE-BLK-128:
  Заказы: 12
  Выручка: 599 880.00₽
  Распределенный Расход: 2 666.67₽  (12/45 × 10 000₽)
  Прибыль: 597 213.33₽
  ROAS: 225.00x
  Маржа Прибыли: 99.6%

PHONE-WHT-128:
  Заказы: 15
  Выручка: 749 850.00₽
  Распределенный Расход: 3 333.33₽  (15/45 × 10 000₽)
  Прибыль: 746 516.67₽
  ROAS: 225.00x
  Маржа Прибыли: 99.6%

PHONE-BLK-256:
  Заказы: 8
  Выручка: 479 920.00₽
  Распределенный Расход: 1 777.78₽  (8/45 × 10 000₽)
  Прибыль: 478 142.22₽
  ROAS: 269.94x
  Маржа Прибыли: 99.6%

PHONE-WHT-256:
  Заказы: 10
  Выручка: 599 900.00₽
  Распределенный Расход: 2 222.22₽  (10/45 × 10 000₽)
  Прибыль: 597 677.78₽
  ROAS: 269.96x
  Маржа Прибыли: 99.6%
```

**Преимущества:**
- ✅ Простой и интуитивный
- ✅ Справедливый, если все варианты имеют похожие цены
- ✅ Поощряет продажу большего количества единиц

**Недостатки:**
- ❌ Игнорирует различия в ценах (1 дорогой товар = 1 дешевый товар)
- ❌ Может недооценивать премиум варианты

**Лучше Для:** Товары с единообразным ценообразованием по вариантам

---

#### Метод 2: Пропорционально Выручке (На Основе Стоимости)

Распределение рекламных расходов на основе выручки, сгенерированной каждым вариантом.

**Формула:**
```
Расход на Вариант = Общий Расход × (Выручка Варианта / Общая Выручка)
```

**Реализация:**
```typescript
function allocateByRevenue(
  totalAdSpend: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  const totalRevenue = variantSales.reduce((sum, v) => sum + v.revenue, 0);

  return variantSales.map(variant => {
    const allocatedAdCost = totalAdSpend * (variant.revenue / totalRevenue);
    const profit = variant.revenue - allocatedAdCost;
    const roas = variant.revenue / allocatedAdCost;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}
```

**Пример Вывода:**
```
=== Финансовый Анализ: Распределение по Выручке ===

PHONE-BLK-128:
  Заказы: 12
  Выручка: 599 880.00₽
  Распределенный Расход: 2 469.34₽  (599 880 / 2 429 550 × 10 000₽)
  Прибыль: 597 410.66₽
  ROAS: 243.00x
  Маржа Прибыли: 99.6%

PHONE-WHT-128:
  Заказы: 15
  Выручка: 749 850.00₽
  Распределенный Расход: 3 086.68₽  (749 850 / 2 429 550 × 10 000₽)
  Прибыль: 746 763.32₽
  ROAS: 243.00x
  Маржа Прибыли: 99.6%

PHONE-BLK-256:
  Заказы: 8
  Выручка: 479 920.00₽
  Распределенный Расход: 1 975.47₽  (479 920 / 2 429 550 × 10 000₽)
  Прибыль: 477 944.53₽
  ROAS: 243.00x
  Маржа Прибыли: 99.6%

PHONE-WHT-256:
  Заказы: 10
  Выручка: 599 900.00₽
  Распределенный Расход: 2 468.51₽  (599 900 / 2 429 550 × 10 000₽)
  Прибыль: 597 431.49₽
  ROAS: 243.00x
  Маржа Прибыли: 99.6%
```

**Преимущества:**
- ✅ Учитывает различия в ценах
- ✅ Высокодоходные варианты несут пропорциональные рекламные расходы
- ✅ Более точный расчет прибыли

**Недостатки:**
- ❌ Может штрафовать премиум варианты
- ❌ Не учитывает маржу прибыли (высокая выручка ≠ высокая прибыль)

**Лучше Для:** Товары с различными ценами по вариантам

---

#### Метод 3: Равномерное Распределение

Распределить рекламные расходы равномерно по всем вариантам в склеенной карточке.

**Формула:**
```
Расход на Вариант = Общий Расход / Количество Вариантов
```

**Реализация:**
```typescript
function allocateEqually(
  totalAdSpend: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  const variantCount = variantSales.length;
  const allocatedAdCost = totalAdSpend / variantCount;

  return variantSales.map(variant => {
    const profit = variant.revenue - allocatedAdCost;
    const roas = variant.revenue / allocatedAdCost;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}
```

**Пример Вывода:**
```
=== Финансовый Анализ: Равномерное Распределение ===

PHONE-BLK-128:
  Заказы: 12
  Выручка: 599 880.00₽
  Распределенный Расход: 2 500.00₽  (10 000₽ / 4 варианта)
  Прибыль: 597 380.00₽
  ROAS: 239.95x
  Маржа Прибыли: 99.6%

PHONE-WHT-128:
  Заказы: 15
  Выручка: 749 850.00₽
  Распределенный Расход: 2 500.00₽
  Прибыль: 747 350.00₽
  ROAS: 299.94x
  Маржа Прибыли: 99.7%

PHONE-BLK-256:
  Заказы: 8
  Выручка: 479 920.00₽
  Распределенный Расход: 2 500.00₽
  Прибыль: 477 420.00₽
  ROAS: 191.97x
  Маржа Прибыли: 99.5%

PHONE-WHT-256:
  Заказы: 10
  Выручка: 599 900.00₽
  Распределенный Расход: 2 500.00₽
  Прибыль: 597 400.00₽
  ROAS: 239.96x
  Маржа Прибыли: 99.6%
```

**Преимущества:**
- ✅ Самый простой метод
- ✅ Нет фаворитизма
- ✅ Легко объяснить

**Недостатки:**
- ❌ Игнорирует фактические различия в производительности
- ❌ Одинаково относится к высоко/низко эффективным вариантам

**Лучше Для:** Начальный анализ, равномерно работающие варианты

---

#### Метод 4: Только Рекламируемый Вариант (Нулевой Расход для Остальных)

Распределить ВСЕ рекламные расходы только на рекламируемый вариант. Другие варианты рассматриваются как "бонусный бесплатный трафик".

**Формула:**
```
Расход Рекламируемого Варианта = Общий Расход
Расход Других Вариантов = 0₽
```

**Реализация:**
```typescript
function allocateToAdvertisedOnly(
  totalAdSpend: number,
  advertisedNmID: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  return variantSales.map(variant => {
    const allocatedAdCost = variant.nmID === advertisedNmID ? totalAdSpend : 0;
    const profit = variant.revenue - allocatedAdCost;
    const roas = allocatedAdCost > 0 ? variant.revenue / allocatedAdCost : Infinity;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}
```

**Пример Вывода:**
```
=== Финансовый Анализ: Только Рекламируемый Вариант ===

PHONE-BLK-128: (РЕКЛАМИРУЕМЫЙ)
  Заказы: 12
  Выручка: 599 880.00₽
  Распределенный Расход: 10 000.00₽
  Прибыль: 589 880.00₽
  ROAS: 59.99x
  Маржа Прибыли: 98.3%

PHONE-WHT-128: (Бесплатный Трафик)
  Заказы: 15
  Выручка: 749 850.00₽
  Распределенный Расход: 0.00₽
  Прибыль: 749 850.00₽
  ROAS: ∞
  Маржа Прибыли: 100.0%

PHONE-BLK-256: (Бесплатный Трафик)
  Заказы: 8
  Выручка: 479 920.00₽
  Распределенный Расход: 0.00₽
  Прибыль: 479 920.00₽
  ROAS: ∞
  Маржа Прибыли: 100.0%

PHONE-WHT-256: (Бесплатный Трафик)
  Заказы: 10
  Выручка: 599 900.00₽
  Распределенный Расход: 0.00₽
  Прибыль: 599 900.00₽
  ROAS: ∞
  Маржа Прибыли: 100.0%
```

**Преимущества:**
- ✅ Консервативный взгляд на прибыльность
- ✅ Подчеркивает "бонусные" продажи нерекламируемых вариантов
- ✅ Полезно для понимания автономной производительности рекламируемого варианта

**Недостатки:**
- ❌ Завышает прибыльность нерекламируемых вариантов
- ❌ Не отражает экономическую реальность общей кампании
- ❌ Нельзя сравнить варианты на равных условиях

**Лучше Для:** Понимание минимального гарантированного ROAS, консервативные оценки прибыли

---

### Выбор Правильного Метода

| Сценарий | Рекомендуемый Метод | Причина |
|----------|---------------------|---------|
| **Единообразные цены** (все варианты ~одна цена) | Метод 1: По Заказам | Простой и справедливый, когда цена не варьируется |
| **Различные цены** (премиум vs бюджетные варианты) | Метод 2: По Выручке | Учитывает вклад в стоимость |
| **Начальный анализ** или **равномерно работающие варианты** | Метод 3: Равномерное Распределение | Простая базовая линия |
| **Консервативные оценки** или **оценка рекламируемого варианта** | Метод 4: Только Рекламируемый | Показывает минимальную гарантированную производительность |
| **Отчетность для руководства** | Методы 1 + 2 | Показать множественные перспективы |
| **Решения о товарном миксе** | Метод 2: По Выручке | Распределение на основе выручки лучше для стратегии ценообразования/микса |

### Комплексная Финансовая Панель

Объединить все методы для полной картины:

```typescript
interface ComprehensiveFinancialReport {
  campaignId: number;
  imtID: number;
  totalAdSpend: number;
  totalRevenue: number;
  totalOrders: number;
  overallROAS: number;

  methodComparison: {
    byOrders: VariantFinancials[];
    byRevenue: VariantFinancials[];
    equalDistribution: VariantFinancials[];
    advertisedOnly: VariantFinancials[];
  };

  insights: {
    bestPerformer: { nmID: number; vendorCode: string; roas: number };
    worstPerformer: { nmID: number; vendorCode: string; roas: number };
    totalProfit: number;
    averageROAS: number;
  };
}

async function generateFinancialReport(
  campaignId: number,
  advertisedNmID: number,
  imtID: number,
  dateRange: { begin: string; end: string }
): Promise<ComprehensiveFinancialReport> {

  // Получить данные кампании
  const campaignStats = await sdk.promotion.getAutoStatWords({ id: campaignId });
  const totalAdSpend = campaignStats.reduce((sum, s) => sum + s.sum, 0);

  // Получить варианты склеенной карточки
  const mergedCard = await sdk.products.getCardsList({
    settings: { filter: { imtID } }
  });
  const nmIDs = mergedCard.cards!.map(c => c.nmID!);

  // Получить данные о продажах
  const salesData = await sdk.analytics.getSalesFunnel({
    nmIDs,
    period: dateRange
  });

  const variantSales = (salesData.data || []).map(variant => ({
    nmID: variant.nmID!,
    vendorCode: mergedCard.cards!.find(c => c.nmID === variant.nmID)?.vendorCode || '',
    orders: variant.ordersCount || 0,
    revenue: (variant.ordersCount || 0) * (variant.avgPriceRub || 0)
  }));

  const totalRevenue = variantSales.reduce((sum, v) => sum + v.revenue, 0);
  const totalOrders = variantSales.reduce((sum, v) => sum + v.orders, 0);

  // Рассчитать всеми методами
  const byOrders = allocateByOrders(totalAdSpend, variantSales);
  const byRevenue = allocateByRevenue(totalAdSpend, variantSales);
  const equalDistribution = allocateEqually(totalAdSpend, variantSales);
  const advertisedOnly = allocateToAdvertisedOnly(totalAdSpend, advertisedNmID, variantSales);

  // Использовать распределение по выручке для инсайтов (наиболее сбалансированный)
  const sortedByROAS = [...byRevenue].sort((a, b) => b.roas - a.roas);
  const bestPerformer = sortedByROAS[0];
  const worstPerformer = sortedByROAS[sortedByROAS.length - 1];
  const totalProfit = totalRevenue - totalAdSpend;
  const averageROAS = byRevenue.reduce((sum, v) => sum + v.roas, 0) / byRevenue.length;

  return {
    campaignId,
    imtID,
    totalAdSpend,
    totalRevenue,
    totalOrders,
    overallROAS: totalRevenue / totalAdSpend,
    methodComparison: {
      byOrders,
      byRevenue,
      equalDistribution,
      advertisedOnly
    },
    insights: {
      bestPerformer: {
        nmID: bestPerformer.nmID,
        vendorCode: bestPerformer.vendorCode,
        roas: bestPerformer.roas
      },
      worstPerformer: {
        nmID: worstPerformer.nmID,
        vendorCode: worstPerformer.vendorCode,
        roas: worstPerformer.roas
      },
      totalProfit,
      averageROAS
    }
  };
}

// Использование
const report = await generateFinancialReport(
  123456,
  12345678,
  999888,
  { begin: '2024-01-01', end: '2024-01-31' }
);

console.log('\n=== КОМПЛЕКСНЫЙ ФИНАНСОВЫЙ ОТЧЕТ ===\n');
console.log(`ID Кампании: ${report.campaignId}`);
console.log(`Склеенная Карточка (imtID): ${report.imtID}`);
console.log(`Общий Расход на Рекламу: ${report.totalAdSpend.toFixed(2)}₽`);
console.log(`Общая Выручка: ${report.totalRevenue.toFixed(2)}₽`);
console.log(`Всего Заказов: ${report.totalOrders}`);
console.log(`Общий ROAS: ${report.overallROAS.toFixed(2)}x`);
console.log(`Общая Прибыль: ${report.insights.totalProfit.toFixed(2)}₽`);

console.log('\n--- Лучшие/Худшие Исполнители (по распределению выручки) ---');
console.log(`Лучший: ${report.insights.bestPerformer.vendorCode} (${report.insights.bestPerformer.roas.toFixed(2)}x ROAS)`);
console.log(`Худший: ${report.insights.worstPerformer.vendorCode} (${report.insights.worstPerformer.roas.toFixed(2)}x ROAS)`);

console.log('\n--- Сравнение Методов ---');
report.methodComparison.byRevenue.forEach((variant, index) => {
  console.log(`\n${variant.vendorCode}:`);
  console.log(`  Заказы: ${variant.orders}, Выручка: ${variant.revenue.toFixed(2)}₽`);
  console.log(`  Метод 1 (Заказы): Расход ${report.methodComparison.byOrders[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.byOrders[index].roas.toFixed(2)}x`);
  console.log(`  Метод 2 (Выручка): Расход ${report.methodComparison.byRevenue[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.byRevenue[index].roas.toFixed(2)}x`);
  console.log(`  Метод 3 (Равномерно): Расход ${report.methodComparison.equalDistribution[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.equalDistribution[index].roas.toFixed(2)}x`);
  console.log(`  Метод 4 (Только Рекламируемый): Расход ${report.methodComparison.advertisedOnly[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.advertisedOnly[index].roas.toFixed(2)}x`);
});
```

### Ключевые Финансовые Инсайты

#### 1. Понимание "Бесплатного Трафика" vs "Общих Расходов"

**Миф**: "Нерекламируемые варианты получают бесплатный трафик"

**Реальность**: Все варианты получают пользу от одной и той же рекламной кампании, поэтому расходы должны быть распределены.

**Пример:**
```
Если вы распределяете 0₽ на нерекламируемые варианты:
→ Вы не можете принимать бюджетные решения (какие варианты рекламировать?)
→ Вы не можете оценить прибыльность товарного микса
→ Вы искусственно завышаете маржу прибыли

Если вы распределяете пропорционально:
→ Вы понимаете истинную экономику по вариантам
→ Вы можете оптимизировать рекламную стратегию
→ Вы принимаете обоснованные решения по ценообразованию
```

#### 2. Эффект Нормализации ROAS

Обратите внимание, что при **пропорциональном распределении** (Методы 1-2) все варианты имеют **похожий ROAS**:

```
Метод 2 (По Выручке):
  Черный 128ГБ: ROAS = 243.00x
  Белый 128ГБ: ROAS = 243.00x
  Черный 256ГБ: ROAS = 243.00x
  Белый 256ГБ: ROAS = 243.00x

Это ожидаемо! Это отражает, что реклама поднимает всю склеенную карточку.
```

Чтобы найти **истинные различия в производительности вариантов**, сравните:
- **Коэффициенты конверсии** (заказы / просмотры)
- **Показатели добавления в корзину**
- **Средний чек**
- **Показатели возвратов**

#### 3. Рекомендация по Бюджетированию

Для **распределения бюджета следующей кампании** используйте эту формулу:

```typescript
// На основе Метода 2 (распределение по выручке)
const nextMonthBudget = 50000; // Общий бюджет

const budgetByVariant = report.methodComparison.byRevenue.map(variant => ({
  vendorCode: variant.vendorCode,
  currentRevenue: variant.revenue,
  revenueShare: variant.revenue / report.totalRevenue,
  suggestedBudget: nextMonthBudget * (variant.revenue / report.totalRevenue)
}));

console.log('\n=== Предлагаемое Распределение Бюджета на Следующий Месяц ===');
budgetByVariant.forEach(b => {
  console.log(`${b.vendorCode}:`);
  console.log(`  Доля Выручки: ${(b.revenueShare * 100).toFixed(1)}%`);
  console.log(`  Предлагаемый Бюджет: ${b.suggestedBudget.toFixed(2)}₽`);
});
```

---

## Практические Примеры

### Пример 1: Запуск Линейки Товаров со Склейкой

Полный workflow для запуска нового товара с несколькими вариантами:

```typescript
async function launchProductLine() {
  // Шаг 1: Создать склеенную карточку со всеми вариантами
  console.log('Создание склеенной карточки с 4 вариантами...');

  const product = await sdk.products.createProduct([
    {
      subjectID: 3091,
      variants: [
        {
          vendorCode: 'PHONE-BLK-128',
          title: 'SuperPhone X Черный 128ГБ',
          description: 'Премиум флагманский смартфон',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['Черный'] },
            { id: 200, value: 128 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555111111'], price: 49990 }]
        },
        {
          vendorCode: 'PHONE-WHT-128',
          title: 'SuperPhone X Белый 128ГБ',
          description: 'Премиум флагманский смартфон',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['Белый'] },
            { id: 200, value: 128 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555222222'], price: 49990 }]
        },
        {
          vendorCode: 'PHONE-BLK-256',
          title: 'SuperPhone X Черный 256ГБ',
          description: 'Премиум флагманский смартфон',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['Черный'] },
            { id: 200, value: 256 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555333333'], price: 59990 }]
        },
        {
          vendorCode: 'PHONE-WHT-256',
          title: 'SuperPhone X Белый 256ГБ',
          description: 'Премиум флагманский смартфон',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['Белый'] },
            { id: 200, value: 256 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555444444'], price: 59990 }]
        }
      ]
    }
  ]);

  console.log('✅ Товар создан');

  // Шаг 2: Получить imtID созданной склеенной карточки
  const cards = await sdk.products.getCardsList({
    settings: {
      filter: {
        textSearch: 'PHONE-BLK-128' // Поиск по артикулу
      }
    }
  });

  const imtID = cards.cards?.[0]?.imtID;
  const nmIDs = cards.cards?.map(c => c.nmID!);

  console.log(`✅ imtID: ${imtID}`);
  console.log(`✅ nmIDs: ${nmIDs?.join(', ')}`);

  // Шаг 3: Установить уровни запасов
  console.log('\nУстановка уровней запасов...');

  await sdk.products.updateStocks({
    stocks: [
      { sku: '8800555111111', amount: 100, warehouseId: 117501 },
      { sku: '8800555222222', amount: 100, warehouseId: 117501 },
      { sku: '8800555333333', amount: 50, warehouseId: 117501 },
      { sku: '8800555444444', amount: 50, warehouseId: 117501 }
    ]
  });

  console.log('✅ Уровни запасов установлены');

  // Шаг 4: Создать рекламную кампанию
  console.log('\nСоздание рекламной кампании...');

  const campaign = await sdk.promotion.createSeacatSaveAd({
    name: 'Кампания Запуска SuperPhone X',
    nms: [nmIDs![0]], // Рекламировать Черный 128ГБ вариант
    bid_type: 'manual',
    placement_types: ['search', 'recommendations']
  });

  console.log(`✅ Кампания создана: ID ${campaign}`);

  // Шаг 5: Установить ставки
  await sdk.promotion.setCpmParams({
    id: campaign,
    cpm: 150 // 1.5₽ за 1000 показов
  });

  console.log('✅ Ставка установлена на 150 CPM');

  // Шаг 6: Активировать кампанию
  await sdk.promotion.changePromotionAdvert({
    id: campaign,
    status: 9 // Активна
  });

  console.log('✅ Кампания активирована');

  console.log('\n🎉 Линейка товаров успешно запущена!');
  console.log('Отслеживайте производительность в панели аналитики');
}

// Выполнить
launchProductLine().catch(console.error);
```

### Пример 2: Оптимизация Рекламы Склеенной Карточки

Мониторинг и оптимизация рекламы для склеенных карточек:

```typescript
async function optimizeMergedCardAds(imtID: number, campaignId: number) {
  console.log(`Оптимизация склеенной карточки ${imtID}, кампания ${campaignId}...`);

  // Получить производительность за 7 дней
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 7);

  const dateRange = {
    begin: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0]
  };

  // Получить все варианты
  const mergedCard = await sdk.products.getCardsList({
    settings: { filter: { imtID } }
  });

  const nmIDs = mergedCard.cards!.map(c => c.nmID!);

  // Получить производительность продаж
  const sales = await sdk.analytics.getSalesFunnel({
    nmIDs,
    period: dateRange
  });

  // Получить производительность кампании
  const campaignStats = await sdk.promotion.getAutoStatWords({ id: campaignId });

  const totalSpend = campaignStats.reduce((sum, s) => sum + s.sum, 0);
  const totalClicks = campaignStats.reduce((sum, s) => sum + s.clicks, 0);
  const totalImpressions = campaignStats.reduce((sum, s) => sum + s.views, 0);

  const totalRevenue = (sales.data || []).reduce((sum, v) =>
    sum + (v.ordersCount || 0) * (v.avgPriceRub || 0), 0);

  const totalOrders = (sales.data || []).reduce((sum, v) =>
    sum + (v.ordersCount || 0), 0);

  const roas = totalRevenue / totalSpend;
  const ctr = totalClicks / totalImpressions;
  const conversionRate = totalOrders / totalClicks;

  console.log('\n=== Производительность за 7 Дней ===');
  console.log(`Показы: ${totalImpressions}`);
  console.log(`Клики: ${totalClicks} (CTR: ${(ctr * 100).toFixed(2)}%)`);
  console.log(`Заказы: ${totalOrders} (CR: ${(conversionRate * 100).toFixed(2)}%)`);
  console.log(`Выручка: ${totalRevenue.toFixed(2)}₽`);
  console.log(`Расход: ${totalSpend.toFixed(2)}₽`);
  console.log(`ROAS: ${roas.toFixed(2)}x`);

  // Рекомендации по оптимизации
  console.log('\n=== Рекомендации по Оптимизации ===');

  if (roas < 2) {
    console.log('⚠️ Низкий ROAS - Рассмотрите:');
    console.log('  - Снижение ставок');
    console.log('  - Улучшение изображений/описаний товара');
    console.log('  - Тестирование других рекламируемых вариантов');
  } else if (roas > 5) {
    console.log('✅ Отличный ROAS - Рассмотрите:');
    console.log('  - Увеличение бюджета для масштабирования');
    console.log('  - Повышение ставок для увеличения доли рынка');
  } else {
    console.log('✅ Здоровый ROAS - Поддерживайте текущую стратегию');
  }

  if (ctr < 0.02) {
    console.log('\n⚠️ Низкий CTR - Улучшите релевантность рекламы:');
    console.log('  - Используйте более конкретные ключевые слова');
    console.log('  - Улучшите главное изображение товара');
    console.log('  - Протестируйте рекламу других вариантов');
  }

  if (conversionRate < 0.05) {
    console.log('\n⚠️ Низкий коэффициент конверсии - Оптимизируйте:');
    console.log('  - Ценообразование товара');
    console.log('  - Описание товара');
    console.log('  - Изображения товара');
    console.log('  - Доступность запасов');
  }
}

// Использование
optimizeMergedCardAds(999888, 123456).catch(console.error);
```

---

## Лучшие Практики

### 1. Стратегическая Склейка

✅ **Делайте:**
- Склеивайте настоящие варианты товара (цвет, размер, память)
- Держите склеенные карточки до 5-10 вариантов максимум
- Используйте последовательные соглашения об именовании для артикулов вариантов
- Склеивайте товары с похожими ценовыми уровнями

❌ **Не Делайте:**
- Не склеивайте несвязанные товары
- Не склеивайте товары с сильно различающимися ценами
- Не создавайте склеенные карточки с 20+ вариантами (путаный UX)
- Не склеивайте товары из разных категорий (API отклонит)

### 2. Оптимизация Рекламы

✅ **Делайте:**
- Начните с рекламы лучше конвертирующего варианта
- Отслеживайте распределение продаж по всем вариантам
- Мониторьте ROAS на уровне склеенной карточки, а не только рекламируемого варианта
- A/B тестируйте разные варианты как рекламные цели
- Используйте вариант-специфичные ключевые слова для поисковых кампаний

❌ **Не Делайте:**
- Не отслеживайте только производительность рекламируемого варианта
- Не предполагайте, что статистика кампании отражает общие продажи
- Не игнорируйте низкоэффективные варианты в склеенных карточках
- Не запускайте идентичные кампании для всех вариантов

### 3. Отслеживание Аналитики

✅ **Делайте:**
- Отслеживайте как атрибуцию кампании, так и фактические продажи
- Рассчитывайте KPI уровня склеенной карточки
- Мониторьте процентные доли вклада вариантов
- Сравнивайте коэффициенты конверсии вариантов
- Используйте комплексные функции аналитики (см. примеры)

❌ **Не Делайте:**
- Не полагайтесь только на статистику кампании
- Не игнорируйте паттерны кросс-продаж вариантов
- Не пропускайте анализ производительности по вариантам
- Не забывайте агрегировать итоги склеенной карточки

### 4. Управление Запасами

✅ **Делайте:**
- Поддерживайте запасы по всем вариантам
- Мониторьте уровни запасов для популярных вариантов
- Пополняйте запасы на основе распределения продаж вариантов
- Используйте аналитику для прогнозирования спроса на варианты

❌ **Не Делайте:**
- Не допускайте истощения запасов популярных вариантов
- Не храните запасы только рекламируемого варианта
- Не игнорируйте предупреждения о низких запасах для нерекламируемых вариантов

---

## Решение Проблем

### Частые Проблемы

#### Проблема: Карточки Не Склеиваются

**Ошибка:**
```json
{
  "error": true,
  "errorText": "Объединение товаров с разными предметами невозможно"
}
```

**Причина**: Попытка склеить карточки с разными `subjectID`

**Решение:**
```typescript
// Проверить subjectID перед склейкой
const cards = await sdk.products.getCardsList({
  settings: {
    filter: {
      textSearch: 'артикул-продавца'
    }
  }
});

cards.cards?.forEach(card => {
  console.log(`nmID: ${card.nmID}, subjectID: ${card.subjectID}`);
});

// Склеивать только карточки с совпадающим subjectID
```

#### Проблема: Статистика Кампании Не Совпадает с Продажами

**Симптом**: Кампания показывает 20 заказов, но аналитика показывает 45 заказов

**Причина**: Это **ожидаемое поведение** - статистика кампании показывает атрибутированные заказы (клики на рекламируемый вариант), аналитика показывает все продажи

**Решение**: Используйте комплексный подход к аналитике:
```typescript
const fullPicture = await getComprehensiveAdAnalytics(
  campaignId,
  advertisedNmID,
  imtID,
  dateRange
);

console.log(`Атрибутированные заказы кампании: ${fullPicture.attributedOrders}`);
console.log(`Фактические общие заказы: ${fullPicture.totalOrders}`);
console.log(`Кросс-продажи вариантов: ${fullPicture.totalOrders - fullPicture.attributedOrders}`);
```

#### Проблема: Не Могу Найти Склеенную Карточку

**Симптом**: Фильтр по `imtID` возвращает пустые результаты

**Причина**: Неправильный `imtID` или карточка перемещена в корзину

**Решение:**
```typescript
// Сначала искать по артикулу продавца
const found = await sdk.products.getCardsList({
  settings: {
    filter: {
      textSearch: 'известный-артикул-продавца'
    }
  }
});

console.log(`Найден imtID: ${found.cards?.[0]?.imtID}`);

// Проверить корзину
const trash = await sdk.products.getCardsTrash({
  settings: {
    filter: { textSearch: 'известный-артикул-продавца' },
    cursor: { limit: 100 }
  }
});
```

#### Проблема: Разъединение Создает Новую Склейку

**Симптом**: Попытка разделить 3 карточки, они склеились в новую группу

**Причина**: Передача нескольких nmID в запрос разъединения

**Решение:**
```typescript
// ❌ Неправильно
await sdk.products.unmergeCards({ nmIDs: [111, 222, 333] });

// ✅ Правильно - по одному за раз
for (const nmID of [111, 222, 333]) {
  await sdk.products.unmergeCards({ nmIDs: [nmID] });
}
```

---

## Связанные Ресурсы

- **[Руководство по Модулю Products](./products-module.md)** - Полная справка по управлению товарами
- **[Руководство по Рекламе (Promotion)](./promotion-advertising.md)** - Управление рекламными кампаниями
- **[Руководство по Модулю Analytics](./analytics-module.md)** - Отслеживание производительности и отчетность
- **[Лучшие Практики](./best-practices.md)** - Общие лучшие практики использования SDK
- **[Справочник API](../api/)** - Полная TypeDoc документация

---

## Резюме

Склейка карточек товаров — это мощная функция, которая обеспечивает:

✅ **Единый опыт покупателя** по вариантам товаров
✅ **Эффективность рекламы** - покупайте рекламу на один, продавайте по всем
✅ **Распределение кросс-трафика вариантов** - максимизируйте возможности конверсии
✅ **Комплексная аналитика** - отслеживайте производительность целостно
✅ **Стратегическая оптимизация** - тестируйте и оптимизируйте производительность вариантов

**Ключевой Вывод**: При рекламе склеенных карточек всегда отслеживайте как **атрибуцию кампании** (клики на рекламируемый вариант), так и **фактическое распределение продаж** (заказы по всем вариантам), чтобы получить точный ROAS и эффективно оптимизировать.

---

**Нужна Помощь?** Откройте issue на [GitHub](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues) или проверьте [FAQ](../FAQ.md).

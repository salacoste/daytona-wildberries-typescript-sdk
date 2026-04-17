---
title: Аналитика воронки продаж
description: Подробное руководство по анализу данных воронки продаж с помощью Wildberries SDK
layout: doc
---

# Аналитика воронки продаж

Данное руководство охватывает API воронки продаж Wildberries (v3) и объясняет, как использовать SDK для получения, фильтрации и анализа данных о продуктивности товаров на каждом этапе пути покупателя.

**Целевая аудитория**: Разработчики аналитических дашбордов, продакт-менеджеры, отслеживающие метрики конверсии, и аналитики данных, работающие с данными продавцов Wildberries

**Необходимые условия**: SDK установлен и настроен, действующий API-ключ с правами доступа к Аналитике

**Примерное время чтения**: 25 минут

---

## Содержание

1. [Что такое воронка продаж](#что-такое-воронка-продаж)
2. [Методы SDK](#методы-sdk)
3. [Справочник ключевых метрик](#справочник-ключевых-метрик)
4. [Фильтрация и сортировка](#фильтрация-и-сортировка)
5. [Практические сценарии](#практические-сценарии)
6. [CSV-отчёты за длительные периоды](#csv-отчёты-за-длительные-периоды)
7. [Лимиты запросов](#лимиты-запросов)
8. [Обработка ошибок](#обработка-ошибок)
9. [Связанные ресурсы](#связанные-ресурсы)

---

## Что такое воронка продаж

Воронка продаж на Wildberries отслеживает путь покупателя от первоначального обнаружения товара до завершённой покупки, которую клиент оставляет себе. API Wildberries предоставляет количественные метрики для каждого этапа, позволяя измерять, насколько эффективно ваши товары конвертируют просмотры в выручку.

### Этапы воронки

```
Показы (openCount)
    Просмотры карточки товара -- покупатель открывает страницу товара
        |
        |  addToCartPercent  (конверсия из просмотра в корзину)
        v
Корзина (cartCount)
    Покупатель добавляет товар в корзину
        |
        |  cartToOrderPercent  (конверсия из корзины в заказ)
        v
Заказы (orderCount / orderSum)
    Покупатель оформляет заказ и оплачивает
        |
        |  buyoutPercent  (конверсия из заказа в выкуп)
        v
Выкупы (buyoutCount / buyoutSum)
    Покупатель получает товар и оставляет себе
```

На каждом переходе часть покупателей отсеивается. SDK возвращает коэффициенты конверсии для каждого перехода, что позволяет определить, на каком этапе товары теряют наибольшее количество потенциальных покупателей.

Отмены (`cancelCount`, `cancelSum`) отслеживаются отдельно и представляют заказы, которые были оформлены, но впоследствии отменены до или после доставки.

---

## Методы SDK

Модуль Аналитики предоставляет три метода для работы с данными воронки продаж. Каждый предназначен для определённого аналитического сценария.

### getSalesFunnelProducts -- Сводный отчёт

Возвращает постраничный список товаров с агрегированными метриками воронки за выбранный период. Опционально сравнивает выбранный период с прошлым, формируя дельта-значения для каждой метрики.

**Ограничение периода**: до 365 дней.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: {
    start: '2026-01-01',
    end: '2026-01-31',
  },
  pastPeriod: {
    start: '2025-12-01',
    end: '2025-12-31',
  },
  orderBy: { field: 'orderSum', mode: 'desc' },
  limit: 20,
  offset: 0,
  skipDeletedNm: true,
});

for (const entry of report.products) {
  const { product, statistic } = entry;
  const current = statistic.selected;
  console.log(
    `${product.title} (nmId: ${product.nmId})`,
    `| Просмотры: ${current.openCount}`,
    `| Корзина: ${current.cartCount}`,
    `| Заказы: ${current.orderCount} (${current.orderSum} ${report.currency})`,
    `| Выкуп: ${current.buyoutCount} (${current.conversions.buyoutPercent}%)`,
  );

  // Сравнение периодов (доступно при указании pastPeriod)
  if (statistic.comparison) {
    console.log(
      `  Дельта: заказы ${statistic.comparison.orderCountDynamic > 0 ? '+' : ''}${statistic.comparison.orderCountDynamic}%`,
      `| выкупы ${statistic.comparison.buyoutCountDynamic > 0 ? '+' : ''}${statistic.comparison.buyoutCountDynamic}%`,
    );
  }
}
```

**Параметры запроса**:

| Параметр | Тип | Обязательный | Описание |
|----------|-----|-------------|----------|
| `selectedPeriod` | `DatePeriod` | Да | Даты начала и окончания (`YYYY-MM-DD`) для отчёта |
| `pastPeriod` | `DatePeriod` | Нет | Период сравнения. При указании ответ включает дельты `comparison` |
| `nmIds` | `number[]` | Нет | Фильтр по артикулам WB |
| `brandNames` | `string[]` | Нет | Фильтр по названиям брендов |
| `subjectIds` | `number[]` | Нет | Фильтр по ID предметов (категорий) |
| `tagIds` | `number[]` | Нет | Фильтр по ID тегов |
| `skipDeletedNm` | `boolean` | Нет | Исключить удалённые карточки товаров из результатов |
| `orderBy` | `SalesFunnelOrderBy` | Нет | Поле сортировки и направление (`asc` или `desc`) |
| `limit` | `number` | Нет | Количество товаров на странице |
| `offset` | `number` | Нет | Количество товаров для пропуска (для пагинации) |

### getSalesFunnelProductsHistory -- Разбивка по дням/неделям

Возвращает статистику по дням или неделям для конкретных товаров. Используйте этот метод для отслеживания изменения метрик отдельных товаров во времени.

**Ограничение периода**: максимум 7 дней.

**Примечание**: Параметр `nmIds` обязателен для этого метода.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const history = await sdk.analytics.getSalesFunnelProductsHistory({
  selectedPeriod: {
    start: '2026-03-22',
    end: '2026-03-28',
  },
  nmIds: [268913787],
  aggregationLevel: 'day',
  skipDeletedNm: true,
});

// Ответ представляет собой массив -- по одному элементу на товар
for (const item of history) {
  console.log(`Товар: ${item.product.title} (nmId: ${item.product.nmId})`);

  for (const day of item.history) {
    console.log(
      `  ${day.date}`,
      `| Просмотры: ${day.openCount}`,
      `| Корзина: ${day.cartCount} (${day.addToCartConversion}%)`,
      `| Заказы: ${day.orderCount} (${day.cartToOrderConversion}%)`,
      `| Выкуп: ${day.buyoutCount} (${day.buyoutPercent}%)`,
    );
  }
}
```

**Параметры запроса**:

| Параметр | Тип | Обязательный | Описание |
|----------|-----|-------------|----------|
| `selectedPeriod` | `DatePeriod` | Да | Даты начала и окончания (максимум 7 дней) |
| `nmIds` | `number[]` | Да | Артикулы WB для получения истории |
| `skipDeletedNm` | `boolean` | Нет | Исключить удалённые карточки товаров |
| `aggregationLevel` | `'day' \| 'week'` | Нет | Гранулярность разбивки. По умолчанию `'day'` |

### getSalesFunnelGroupedHistory -- Группировка по категории/бренду/тегу

Возвращает статистику по дням или неделям, сгруппированную по предметам, брендам или тегам, а не по отдельным товарам. Используйте для анализа трендов производительности на уровне категории или бренда.

**Ограничение периода**: максимум 7 дней.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: {
    start: '2026-03-22',
    end: '2026-03-28',
  },
  subjectIds: [105],       // например, категория «Футболки»
  aggregationLevel: 'day',
  skipDeletedNm: true,
});

for (const group of grouped) {
  console.log(`Группа: ${group.product.subjectName} / ${group.product.brandName}`);
  for (const day of group.history) {
    console.log(
      `  ${day.date}: ${day.orderCount} заказов, ${day.buyoutPercent}% выкуп`,
    );
  }
}
```

**Параметры запроса**:

| Параметр | Тип | Обязательный | Описание |
|----------|-----|-------------|----------|
| `selectedPeriod` | `DatePeriod` | Да | Даты начала и окончания (максимум 7 дней) |
| `brandNames` | `string[]` | Нет | Фильтр по названиям брендов |
| `subjectIds` | `number[]` | Нет | Фильтр по ID предметов (категорий) |
| `tagIds` | `number[]` | Нет | Фильтр по ID тегов |
| `skipDeletedNm` | `boolean` | Нет | Исключить удалённые карточки товаров |
| `aggregationLevel` | `'day' \| 'week'` | Нет | Гранулярность разбивки. По умолчанию `'day'` |

---

## Справочник ключевых метрик

### Объёмные метрики воронки

| Метрика | Тип | Описание |
|---------|-----|----------|
| `openCount` | `number` | Просмотры карточки товара (показы) |
| `cartCount` | `number` | Количество добавлений товара в корзину |
| `orderCount` | `number` | Количество оформленных заказов |
| `orderSum` | `number` | Общая сумма заказов |
| `buyoutCount` | `number` | Количество завершённых покупок (товар оставлен покупателем) |
| `buyoutSum` | `number` | Общая сумма выкупов |
| `cancelCount` | `number` | Количество отменённых заказов |
| `cancelSum` | `number` | Общая сумма отмен |

### Метрики конверсии

Объект `conversions` содержит три коэффициента конверсии между этапами:

| Метрика | Тип | Описание |
|---------|-----|----------|
| `addToCartPercent` | `number` | Процент просматривающих, добавивших товар в корзину |
| `cartToOrderPercent` | `number` | Процент добавлений в корзину, конвертировавшихся в заказы |
| `buyoutPercent` | `number` | Процент заказов, завершившихся покупкой |

### Ценообразование и выручка

| Метрика | Тип | Описание |
|---------|-----|----------|
| `avgPrice` | `number` | Средняя цена продажи за период |
| `avgOrdersCountPerDay` | `number` | Среднее количество заказов в день |
| `shareOrderPercent` | `number` | Доля товара в общей выручке продавца |

### Вовлечённость и логистика

| Метрика | Тип | Описание |
|---------|-----|----------|
| `addToWishlist` | `number` | Количество добавлений товара в список желаний |
| `timeToReady` | `SalesFunnelTimeToReady` | Среднее время доставки (дни, часы, минуты) |
| `localizationPercent` | `number` | Процент заказов из того же региона, где расположен склад |

### Метрики WB Клуба

Объект `wbClub` содержит метрики, относящиеся к заказам участников WB Клуба:

| Метрика | Тип | Описание |
|---------|-----|----------|
| `wbClub.orderCount` | `number` | Заказы от участников WB Клуба |
| `wbClub.orderSum` | `number` | Сумма заказов от участников WB Клуба |
| `wbClub.buyoutCount` | `number` | Выкупы участников WB Клуба |
| `wbClub.buyoutSum` | `number` | Сумма выкупов от участников WB Клуба |
| `wbClub.buyoutPercent` | `number` | Процент выкупа для участников WB Клуба |
| `wbClub.avgOrderCountPerDay` | `number` | Среднее количество заказов в день от WB Клуба |

### Метрики истории

Эндпоинты истории по дням/неделям (`getSalesFunnelProductsHistory` и `getSalesFunnelGroupedHistory`) возвращают записи `SalesFunnelHistory` со следующими полями для каждого временного периода:

| Поле | Тип | Описание |
|------|-----|----------|
| `date` | `string` | Дата точки данных |
| `openCount` | `number` | Просмотры за день/неделю |
| `cartCount` | `number` | Добавления в корзину |
| `orderCount` | `number` | Оформленные заказы |
| `orderSum` | `number` | Сумма заказов |
| `buyoutCount` | `number` | Завершённые покупки |
| `buyoutSum` | `number` | Сумма выкупов |
| `buyoutPercent` | `number` | Процент выкупа |
| `addToCartConversion` | `number` | Конверсия из просмотра в корзину |
| `cartToOrderConversion` | `number` | Конверсия из корзины в заказ |
| `addToWishlistCount` | `number` | Добавления в список желаний |

---

## Фильтрация и сортировка

### Параметры фильтрации

Все три метода поддерживают фильтрацию для сужения набора данных. Метод сводного отчёта (`getSalesFunnelProducts`) поддерживает все фильтры; методы истории поддерживают подмножество.

#### nmIds -- Фильтр по артикулу WB

Передайте массив артикулов Wildberries для получения данных по конкретным товарам. Это наиболее распространённый фильтр для мониторинга известного набора SKU.

```typescript
// Мониторинг ваших 5 лучших товаров
const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
  nmIds: [268913787, 395996251, 112334455, 998877665, 554433221],
});
```

**Поддерживается**: `getSalesFunnelProducts`, `getSalesFunnelProductsHistory`

#### brandNames -- Фильтр по бренду

Полезен, когда ваш аккаунт продавца управляет несколькими брендами и вы хотите анализировать показатели на уровне бренда.

```typescript
const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
  brandNames: ['MyBrand', 'SecondBrand'],
  orderBy: { field: 'orderSum', mode: 'desc' },
  limit: 50,
  offset: 0,
});
```

**Поддерживается**: `getSalesFunnelProducts`, `getSalesFunnelGroupedHistory`

#### subjectIds -- Фильтр по предмету (категории)

ID предметов соответствуют категориям товаров Wildberries (например, Футболки, Кроссовки). Используйте при сравнении показателей по категориям.

```typescript
const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-03-22', end: '2026-03-28' },
  subjectIds: [105, 210],   // Две категории
  aggregationLevel: 'day',
});
```

**Поддерживается**: `getSalesFunnelProducts`, `getSalesFunnelGroupedHistory`

#### tagIds -- Фильтр по тегу

Теги -- это метки, определяемые продавцом и присваиваемые товарам в личном кабинете Wildberries. Используйте для сегментирования аналитики по вашей собственной организационной структуре (например, «Летняя коллекция», «Распродажа»).

```typescript
const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
  tagIds: [42],   // Тег «Летняя коллекция»
  orderBy: { field: 'buyoutCount', mode: 'desc' },
  limit: 100,
  offset: 0,
});
```

**Поддерживается**: `getSalesFunnelProducts`, `getSalesFunnelGroupedHistory`

#### skipDeletedNm -- Исключение удалённых карточек

При значении `true` товары, удалённые из каталога, исключаются из результатов. Это позволяет поддерживать чистоту аналитики при снятии товаров с продажи.

**Поддерживается**: всеми тремя методами.

### Сортировка (только getSalesFunnelProducts)

Параметр `orderBy` управляет порядком сортировки постраничных результатов. Принимает поле `field` и направление `mode` (`'asc'` или `'desc'`).

Доступные поля сортировки:

| Поле | Описание |
|------|----------|
| `openCard` | Сортировка по просмотрам карточки товара |
| `addToCart` | Сортировка по добавлениям в корзину |
| `orderCount` | Сортировка по количеству заказов |
| `orderSum` | Сортировка по выручке с заказов |
| `buyoutCount` | Сортировка по количеству выкупов |
| `buyoutSum` | Сортировка по выручке с выкупов |
| `cancelCount` | Сортировка по количеству отмен |
| `cancelSum` | Сортировка по сумме отмен |
| `avgPrice` | Сортировка по средней цене |
| `stockMpQty` | Сортировка по остаткам на складе продавца |
| `stockWbQty` | Сортировка по остаткам на складе WB |
| `shareOrderPercent` | Сортировка по доле выручки |
| `addToWishlist` | Сортировка по добавлениям в список желаний |
| `timeToReady` | Сортировка по времени доставки |
| `localizationPercent` | Сортировка по проценту региональных заказов |

Поля WB Клуба также доступны с префиксом `wbClub.` (например, `wbClub.orderCount`, `wbClub.buyoutPercent`).

---

## Практические сценарии

### ABC-анализ товарного ассортимента

ABC-анализ классифицирует товары на три группы по их вкладу в общую выручку. Товары группы A генерируют примерно 80% выручки, группы B -- следующие 15%, а группы C -- оставшиеся 5%.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function abcAnalysis(startDate: string, endDate: string) {
  // Получаем все товары, отсортированные по выручке по убыванию
  const allProducts: Array<{
    nmId: number;
    title: string;
    revenue: number;
    buyoutPercent: number;
  }> = [];

  let offset = 0;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    const page = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: { start: startDate, end: endDate },
      orderBy: { field: 'buyoutSum', mode: 'desc' },
      limit: pageSize,
      offset,
      skipDeletedNm: true,
    });

    for (const entry of page.products) {
      allProducts.push({
        nmId: entry.product.nmId,
        title: entry.product.title,
        revenue: entry.statistic.selected.buyoutSum,
        buyoutPercent: entry.statistic.selected.conversions.buyoutPercent,
      });
    }

    hasMore = page.products.length === pageSize;
    offset += pageSize;
  }

  // Расчёт кумулятивной доли выручки
  const totalRevenue = allProducts.reduce((sum, p) => sum + p.revenue, 0);
  let cumulativeShare = 0;

  const classified = allProducts.map((product) => {
    cumulativeShare += product.revenue / totalRevenue;
    let group: 'A' | 'B' | 'C';
    if (cumulativeShare <= 0.8) {
      group = 'A';
    } else if (cumulativeShare <= 0.95) {
      group = 'B';
    } else {
      group = 'C';
    }
    return { ...product, group };
  });

  // Сводка
  const groups = { A: 0, B: 0, C: 0 };
  for (const item of classified) {
    groups[item.group]++;
  }

  console.log(`ABC-анализ за период ${startDate} — ${endDate}:`);
  console.log(`  Всего товаров: ${classified.length}`);
  console.log(`  Общая выручка: ${totalRevenue.toLocaleString()}`);
  console.log(`  Группа A: ${groups.A} товаров (80% выручки)`);
  console.log(`  Группа B: ${groups.B} товаров (следующие 15%)`);
  console.log(`  Группа C: ${groups.C} товаров (оставшиеся 5%)`);

  return classified;
}

const result = await abcAnalysis('2026-01-01', '2026-03-28');
```

### Сравнение конверсий между периодами

Определите, улучшаются или снижаются ваши метрики конверсии, сравнив текущий месяц с предыдущим.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function compareConversions() {
  const report = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: {
      start: '2026-03-01',
      end: '2026-03-28',
    },
    pastPeriod: {
      start: '2026-02-01',
      end: '2026-02-28',
    },
    orderBy: { field: 'orderSum', mode: 'desc' },
    limit: 50,
    offset: 0,
    skipDeletedNm: true,
  });

  console.log('Сравнение конверсий товаров (Март vs Февраль):');
  console.log('---------------------------------------------------');

  for (const entry of report.products) {
    const { product, statistic } = entry;
    const current = statistic.selected.conversions;
    const past = statistic.past?.conversions;

    console.log(`\n${product.title} (${product.nmId}):`);
    console.log(`  В корзину:       ${current.addToCartPercent}%`);
    console.log(`  Из корзины в заказ: ${current.cartToOrderPercent}%`);
    console.log(`  Выкуп:           ${current.buyoutPercent}%`);

    if (past) {
      const cartDelta = current.addToCartPercent - past.addToCartPercent;
      const orderDelta = current.cartToOrderPercent - past.cartToOrderPercent;
      const buyoutDelta = current.buyoutPercent - past.buyoutPercent;

      console.log(`  Относительно прошлого периода:`);
      console.log(`    В корзину:        ${cartDelta > 0 ? '+' : ''}${cartDelta.toFixed(1)}пп`);
      console.log(`    Из корзины в заказ: ${orderDelta > 0 ? '+' : ''}${orderDelta.toFixed(1)}пп`);
      console.log(`    Выкуп:            ${buyoutDelta > 0 ? '+' : ''}${buyoutDelta.toFixed(1)}пп`);
    }
  }
}

await compareConversions();
```

### Отслеживание ежедневных трендов по товару

Мониторинг показателей конкретного товара по дням для обнаружения резких изменений или оценки влияния акций.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function trackDailyTrends(nmId: number) {
  const history = await sdk.analytics.getSalesFunnelProductsHistory({
    selectedPeriod: {
      start: '2026-03-22',
      end: '2026-03-28',
    },
    nmIds: [nmId],
    aggregationLevel: 'day',
    skipDeletedNm: true,
  });

  if (history.length === 0) {
    console.log(`Данные для nmId ${nmId} не найдены`);
    return;
  }

  const item = history[0];
  console.log(`Ежедневные тренды для: ${item.product.title}`);
  console.log(`Период: ${item.history[0]?.date} — ${item.history[item.history.length - 1]?.date}`);
  console.log('');

  // Расчёт средних значений
  const days = item.history;
  const avgViews = days.reduce((s, d) => s + d.openCount, 0) / days.length;
  const avgOrders = days.reduce((s, d) => s + d.orderCount, 0) / days.length;

  console.log(`  Средние просмотры в день:  ${avgViews.toFixed(0)}`);
  console.log(`  Средние заказы в день:     ${avgOrders.toFixed(1)}`);
  console.log('');

  // Разбивка по дням
  for (const day of days) {
    const viewsVsAvg = ((day.openCount - avgViews) / avgViews * 100).toFixed(0);
    const marker = Math.abs(Number(viewsVsAvg)) > 30 ? ' <-- значительное изменение' : '';

    console.log(
      `  ${day.date}:`,
      `Просмотры: ${day.openCount} (${Number(viewsVsAvg) > 0 ? '+' : ''}${viewsVsAvg}% от ср.)`,
      `| Корзина: ${day.addToCartConversion}%`,
      `| Заказы: ${day.orderCount}`,
      `| Выкуп: ${day.buyoutPercent}%`,
      marker,
    );
  }
}

await trackDailyTrends(268913787);
```

---

## CSV-отчёты за длительные периоды

Три описанных выше JSON-метода воронки продаж ограничены 365 днями (сводка) или 7 днями (история). Для более длительных временных диапазонов или очень больших наборов данных используйте эндпоинты CSV-отчётов.

CSV-отчёты генерируются асинхронно. Вы создаёте задачу генерации отчёта, опрашиваете её статус, а затем скачиваете полученный ZIP-архив с CSV-файлом.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Шаг 1: Создание задачи генерации отчёта
const task = await sdk.analytics.createNmReportDownload({
  reportType: 'SALES_FUNNEL_PRODUCT',
  userReportName: 'Воронка продаж Q1 2026',
  params: {
    selectedPeriod: {
      start: '2026-01-01',
      end: '2026-03-31',
    },
    aggregationLevel: 'month',
    skipDeletedNm: true,
  },
});

console.log('Задача отчёта создана:', task.data?.downloadId);
```

Для некоторых типов отчётов CSV-отчёты требуют подписки Jam. Если вам нужно определить уровень подписки перед выполнением запросов, ознакомьтесь с руководством [Определение подписки Jam](/guides/jam-subscription).

Полное пошаговое описание процесса работы с CSV-отчётами (создание, опрос статуса, скачивание и парсинг) см. в руководстве [CSV-отчёты аналитики продавца](/guides/seller-analytics-csv).

---

## Лимиты запросов

Все три метода воронки продаж используют одинаковый лимит запросов:

- **3 запроса в минуту**
- **20-секундный интервал** между запросами
- **Лимит всплеска**: 3 запроса

SDK автоматически контролирует эти лимиты через встроенный ограничитель частоты запросов. При превышении лимита SDK выбрасывает ошибку `RateLimitError` с информацией о времени повтора.

При постраничной загрузке больших наборов данных добавляйте небольшую задержку между страницами:

```typescript
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let offset = 0;
const pageSize = 100;

while (true) {
  const page = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: { start: '2026-01-01', end: '2026-03-28' },
    orderBy: { field: 'orderSum', mode: 'desc' },
    limit: pageSize,
    offset,
  });

  // Обработка страницы...

  if (page.products.length < pageSize) break;
  offset += pageSize;

  // Соблюдение 20-секундного интервала
  await delay(20_000);
}
```

---

## Обработка ошибок

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import {
  RateLimitError,
  AuthenticationError,
  ValidationError,
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

try {
  const report = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
    limit: 20,
    offset: 0,
  });
  // Обработка отчёта...
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error(`Превышен лимит запросов. Повторите через ${error.retryAfter}мс`);
  } else if (error instanceof AuthenticationError) {
    console.error('Недействительный API-ключ. Проверьте учётные данные.');
  } else if (error instanceof ValidationError) {
    console.error('Некорректные параметры запроса:', error.message);
  } else {
    throw error;
  }
}
```

Типичные ошибки валидации:

- **Период превышает максимум**: Метод сводного отчёта допускает до 365 дней; методы истории -- до 7 дней. Превышение этих лимитов возвращает ошибку 400.
- **Отсутствуют обязательные nmIds**: Метод `getSalesFunnelProductsHistory` требует хотя бы один `nmId`.
- **Некорректный формат даты**: Даты должны быть в формате `YYYY-MM-DD`.

---

## Связанные ресурсы

- [Справочник модуля Аналитики](/modules/analytics) -- Полный справочник API для всех методов аналитики
- [Лучшие практики аналитики воронки продаж](/guides/best-practices-sales-funnel) -- Стратегии оптимизации с использованием органических и рекламных данных воронки
- [Определение подписки Jam](/guides/jam-subscription) -- Определение уровня подписки Jam для корректных лимитов аналитики
- [Лучшие практики для продакшена](/guides/best-practices) -- Обработка ошибок, лимиты запросов и паттерны развёртывания

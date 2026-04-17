---
title: Аналитика поисковых запросов
description: Руководство по анализу поисковых запросов и позиций товаров с помощью Wildberries SDK
layout: doc
---

# Аналитика поисковых запросов

Данное руководство охватывает отчёт по поисковым запросам в модуле Аналитики Wildberries. Вы узнаете, как определять, какие поисковые запросы приводят покупателей к вашим товарам, отслеживать позиции в поиске во времени и использовать методы SDK для построения рабочих процессов SEO-оптимизации на основе данных.

**Целевая аудитория**: Аналитики электронной коммерции, SEO-специалисты и разработчики, создающие дашборды поисковой аналитики для продавцов Wildberries

**Необходимые условия**: SDK установлен и настроен, действующий API-ключ с правами доступа к Аналитике, активная [подписка Jam](/guides/jam-subscription) для эндпоинтов поисковых текстов

**Примерное время чтения**: 25 минут

---

## Содержание

1. [Что такое аналитика поисковых запросов](#что-такое-аналитика-поисковых-запросов)
2. [Обзор методов SDK](#обзор-методов-sdk)
3. [Главная страница отчёта](#главная-страница-отчёта)
4. [Статистика по группам](#статистика-по-группам)
5. [Детализация запросов внутри группы](#детализация-запросов-внутри-группы)
6. [Поисковые тексты для конкретного товара](#поисковые-тексты-для-конкретного-товара)
7. [Заказы и позиции по поисковому запросу](#заказы-и-позиции-по-поисковому-запросу)
8. [Влияние подписки Jam](#влияние-подписки-jam)
9. [Параметры фильтрации](#параметры-фильтрации)
10. [Практические сценарии](#практические-сценарии)
11. [Лимиты запросов](#лимиты-запросов)
12. [Обработка ошибок](#обработка-ошибок)
13. [Связанные ресурсы](#связанные-ресурсы)

---

## Что такое аналитика поисковых запросов

Аналитика поисковых запросов предоставляет информацию о том, как покупатели находят ваши товары на Wildberries через поиск. Данные отвечают на три фундаментальных вопроса:

- **Какие поисковые запросы приводят трафик к моим товарам?** Узнайте точные ключевые слова, которые покупатели используют для обнаружения ваших листингов.
- **Какие позиции занимают мои товары по конкретным запросам?** Отслеживайте среднюю позицию в поиске по различным запросам и временным периодам.
- **Как конвертируются поисковые запросы?** Измеряйте клики, добавления в корзину и заказы, генерируемые каждым запросом.

Эта информация необходима для:

- **SEO-оптимизации** -- выявляйте высокочастотные запросы, по которым ваш товар занимает низкие позиции, и оптимизируйте содержимое карточки соответственно.
- **Рекламных решений** -- находите органические запросы, которые уже хорошо конвертируются, и направляйте рекламный бюджет на их усиление.
- **Конкурентного анализа** -- сравнивайте, как ваш бренд выступает относительно конкурентов по общим поисковым запросам.
- **Контент-стратегии** -- узнавайте, какие характеристики товаров и ключевые слова покупатели действительно ищут.

### Структура отчёта

Отчёт по поисковым запросам имеет иерархическую структуру. На верхнем уровне товары организованы в **группы** по предмету, бренду и тегу. Каждая группа агрегирует метрики по всем товарам, соответствующим данной группировке. Далее можно детализировать до отдельных товаров внутри группы и увидеть конкретные поисковые тексты, связанные с каждым товаром.

```
Обзор отчёта (главная страница)
├── Группа 1 (по предмету + бренду + тегу)
│   ├── Товар A
│   │   ├── Поисковый текст: "кроссовки мужские nike"
│   │   ├── Поисковый текст: "мужская обувь для бега"
│   │   └── ...
│   ├── Товар B
│   └── ...
├── Группа 2
│   └── ...
└── Сводные метрики (рейтинг продавца, позиции, видимость)
```

---

## Обзор методов SDK

Модуль Аналитики предоставляет пять методов для анализа поисковых запросов. Каждый соответствует определённому уровню иерархии отчёта:

| Метод | Назначение | Уровень |
|-------|-----------|---------|
| `createSearchReportReport()` | Главная страница отчёта со сводкой и сгруппированными данными | Общий обзор |
| `createTableGroup()` | Постраничная статистика по группам (клики, корзина, заказы) | Уровень группы |
| `createTableDetail()` | Отдельные товары внутри конкретной группы | Уровень товара |
| `createProductSearchText()` | Топ поисковых текстов для конкретного товара | Уровень поискового текста |
| `createProductOrder()` | Заказы и позиции по поисковому запросу во времени | Детализация запроса |

Все пять методов используют POST-запросы к домену `seller-analytics-api.wildberries.ru` и разделяют общий пул лимитов запросов.

---

## Главная страница отчёта

`sdk.analytics.createSearchReportReport(data)` возвращает отчёт верхнего уровня, содержащий сводную статистику (рейтинг продавца, количество рекламируемых товаров, распределение позиций) и первую страницу сгруппированных результатов.

### Запрос

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const report = await sdk.analytics.createSearchReportReport({
  currentPeriod: {
    start: '2025-03-01',
    end: '2025-03-28',
  },
  pastPeriod: {
    start: '2025-02-01',
    end: '2025-02-28',
  },
  positionCluster: 'all',
  orderBy: {
    field: 'openCard',
    mode: 'desc',
  },
  includeSearchTexts: true,
  includeSubstitutedSKUs: false,
  limit: 10,
  offset: 0,
});
```

### Структура ответа

Ответ содержит три сводных раздела и постраничный список групп:

```typescript
const { data } = report;

// Сводка по продавцу
console.log('Рейтинг продавца:', data.commonInfo.supplierRating.current);
console.log('Рекламируемые товары:', data.commonInfo.advertisedProducts.current);
console.log('Всего товаров:', data.commonInfo.totalProducts);

// Распределение позиций по всем товарам
const clusters = data.positionInfo.clusters;
console.log('Товаров в топ-100:', clusters.firstHundred.current);
console.log('Товаров в 101-200:', clusters.secondHundred.current);
console.log('Товаров ниже 200:', clusters.below.current);

// График средней позиции во времени
for (const point of data.positionInfo.chart) {
  console.log(`${point.dt}: среднее=${point.average}, медиана=${point.median}`);
}

// Тренд видимости
for (const point of data.visibilityInfo.chart) {
  console.log(`${point.dt}: видимость=${point.value}`);
}

// Сгруппированные результаты (первая страница)
if (data.groups) {
  for (const group of data.groups) {
    console.log(`Группа: ${group.subjectName} / ${group.brandName}`);
    console.log(`  Средняя позиция: ${group.metrics.avgPosition.current}`);
    console.log(`  Открытия карточки: ${group.metrics.openCard.current}`);
    console.log(`  В корзину: ${group.metrics.addToCart.current}`);
    console.log(`  Заказы: ${group.metrics.orders.current}`);
  }
}
```

### Ключевые параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `currentPeriod` | `Period` | Диапазон дат для отчёта (максимум 365 дней от текущей даты) |
| `pastPeriod` | `PastPeriod` | Необязательный период сравнения (такой же или более короткий) |
| `positionCluster` | `'all' \| 'firstHundred' \| 'secondHundred' \| 'below'` | Фильтр по диапазону средней позиции в поиске |
| `orderBy` | `OrderBy` | Поле сортировки и направление |
| `limit` / `offset` | `number` | Пагинация групп |
| `nmIds` | `number[]` | Необязательно: фильтр по артикулам WB |
| `brandNames` | `string[]` | Необязательно: фильтр по названиям брендов |
| `subjectIds` | `number[]` | Необязательно: фильтр по ID предметов (категорий) |
| `tagIds` | `number[]` | Необязательно: фильтр по ID тегов |

---

## Статистика по группам

`sdk.analytics.createTableGroup(data)` извлекает дополнительные страницы статистики на уровне групп. Используйте, когда основной отчёт возвращает больше групп, чем помещается в одном ответе.

::: info Предварительное условие пагинации
Пагинация групп требует хотя бы одного активного фильтра (`brandNames`, `subjectIds` или `tagIds`). Без фильтра эндпоинт возвращает полный набор результатов в основном отчёте.
:::

```typescript
const groups = await sdk.analytics.createTableGroup({
  currentPeriod: {
    start: '2025-03-01',
    end: '2025-03-28',
  },
  positionCluster: 'all',
  orderBy: {
    field: 'orders',
    mode: 'desc',
  },
  brandNames: ['MyBrand'],
  includeSearchTexts: true,
  includeSubstitutedSKUs: false,
  limit: 20,
  offset: 0,
});

for (const group of groups.data.groups) {
  const m = group.metrics;
  console.log(`${group.subjectName} | ${group.brandName}`);
  console.log(`  Позиция: ${m.avgPosition.current} (${m.avgPosition.dynamics}%)`);
  console.log(`  Открытия карточки: ${m.openCard.current}`);
  console.log(`  В корзину: ${m.addToCart.current} (конв.: ${m.openToCart.current}%)`);
  console.log(`  Заказы: ${m.orders.current} (конв.: ${m.cartToOrder.current}%)`);
}
```

Каждая группа содержит метрики со значениями `current` и необязательными процентами `dynamics`, показывающими изменение по сравнению с `pastPeriod`.

---

## Детализация запросов внутри группы

`sdk.analytics.createTableDetail(data)` возвращает отдельные товары внутри группы. Используйте для детализации от сводки на уровне группы до показателей каждого товара.

```typescript
const details = await sdk.analytics.createTableDetail({
  currentPeriod: {
    start: '2025-03-01',
    end: '2025-03-28',
  },
  // Фильтр по конкретной группе
  subjectId: 306,
  brandName: 'MyBrand',
  positionCluster: 'firstHundred',
  orderBy: {
    field: 'orders',
    mode: 'desc',
  },
  includeSearchTexts: true,
  includeSubstitutedSKUs: false,
  limit: 50,
  offset: 0,
});

for (const product of details.data.products) {
  console.log(`Товар: ${product.name} (nmId: ${product.nmId})`);
  console.log(`  Бренд: ${product.brandName}`);
  console.log(`  Артикул продавца: ${product.vendorCode}`);
  console.log(`  Рекламируется: ${product.isAdvertised}`);
  console.log(`  Рейтинг: ${product.rating}`);

  if (product.price) {
    console.log(`  Диапазон цен: ${product.price.min} - ${product.price.max}`);
  }
}
```

### Поля на уровне товара

Каждый `TableProductItem` в ответе включает:

- `nmId` -- артикул WB
- `name`, `vendorCode`, `brandName`, `subjectName` -- идентификация товара
- `isAdvertised` -- рекламируется ли товар в поисковом продвижении
- `isSubstitutedSKU` -- использовал ли поиск замещающий артикул
- `rating`, `feedbackRating` -- рейтинг товара и отзывов
- `price.min`, `price.max` -- диапазон цен после скидок продавца
- `mainPhoto` -- URL основного изображения товара
- Метрики (`avgPosition`, `openCard`, `addToCart`, `openToCart`, `orders`, `cartToOrder`, `visibility`) со значениями `current` и `dynamics`

---

## Поисковые тексты для конкретного товара

`sdk.analytics.createProductSearchText(data)` возвращает топ поисковых запросов, по которым покупатели находили конкретный товар. Это наиболее детальный уровень отчёта, на который напрямую влияет уровень вашей подписки Jam.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const searchTexts = await sdk.analytics.createProductSearchText({
  currentPeriod: {
    start: '2025-03-01',
    end: '2025-03-28',
  },
  nmIds: [123456789],
  topOrderBy: 'openCard',
  orderBy: {
    field: 'openCard',
    mode: 'desc',
  },
  includeSearchTexts: true,
  includeSubstitutedSKUs: false,
  limit: 30, // 30 для тарифа Standard, 50 для тарифа Advanced
});

console.log('Топ поисковых текстов:', searchTexts.data.items);
```

### Параметр `topOrderBy`

Этот параметр определяет критерий ранжирования, по которому поисковые тексты попадают в топ результатов:

| Значение | Описание |
|----------|----------|
| `'openCard'` | Запросы, которые сгенерировали наибольшее количество открытий карточки |
| `'addToCart'` | Запросы, которые привели к наибольшему количеству добавлений в корзину |
| `'openToCart'` | Запросы с наивысшей конверсией из открытия карточки в корзину |
| `'orders'` | Запросы, которые привели к наибольшему количеству заказов |
| `'cartToOrder'` | Запросы с наивысшей конверсией из корзины в заказ |

### Лимит и подписка Jam

Поле `limit` контролирует, сколько поисковых текстов возвращается. Максимальное значение зависит от уровня вашей подписки Jam:

| Тариф | Максимальный `limit` |
|-------|---------------------|
| Standard | 30 |
| Advanced | 50 |
| Нет подписки | Эндпоинт недоступен (ошибка 400) |

См. раздел [Влияние подписки Jam](#влияние-подписки-jam) ниже для автоматического определения тарифа.

---

## Заказы и позиции по поисковому запросу

`sdk.analytics.createProductOrder(data)` показывает, как товар работал по конкретным поисковым запросам во времени -- количество заказов и средняя позиция в поиске для каждого запроса на каждую дату.

```typescript
const orders = await sdk.analytics.createProductOrder({
  period: {
    start: '2025-03-01',
    end: '2025-03-28',
  },
  nmId: 123456789,
  searchTexts: [
    'кроссовки мужские',
    'мужская обувь для бега',
    'nike кроссовки',
  ],
});

// Общие метрики по всем датам
for (const total of orders.data.total) {
  console.log(`${total.dt}: позиция=${total.avgPosition}, заказы=${total.orders}`);
}

// Разбивка по запросам
for (const item of orders.data.items) {
  console.log(`Запрос: "${item.text}" (частота: ${item.frequency})`);
  for (const day of item.dateItems) {
    console.log(`  ${day.dt}: позиция=${day.avgPosition}, заказы=${day.orders}`);
  }
}
```

### Ключевые отличия от других методов

- Использует поле `period` (не `currentPeriod`) с датами `start` и `end`.
- Принимает один `nmId` (не массив).
- Требует указания точных `searchTexts` для анализа (до 100 для тарифа Advanced).
- Возвращает ежедневные данные временного ряда с позицией и количеством заказов по каждому запросу.

Этот метод идеально подходит для отслеживания изменения позиций товара по конкретным ключевым словам во времени.

---

## Влияние подписки Jam

Подписка Wildberries Jam напрямую влияет на метод `createProductSearchText()`. Без подписки Jam эндпоинт возвращает ошибку 400. При наличии подписки максимальное значение `limit` зависит от вашего тарифа.

### Определение тарифа

Используйте `sdk.general.getJamSubscriptionStatus()` для программного определения тарифа:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function getSearchTextsWithCorrectLimit(nmIds: number[]) {
  // Шаг 1: Определение тарифа Jam
  const jamStatus = await sdk.general.getJamSubscriptionStatus({
    nmIds,
  });

  console.log(`Тариф Jam: ${jamStatus.tier}`);

  // Шаг 2: Обработка тарифа "none"
  if (jamStatus.tier === 'none') {
    console.warn(
      'Для аналитики поисковых текстов требуется подписка Jam. ' +
      'Переключаемся на отчёт на уровне групп.'
    );
    // Используйте createSearchReportReport(), который не требует Jam
    return null;
  }

  // Шаг 3: Установка лимита на основе тарифа
  const limit = jamStatus.tier === 'advanced' ? 50 : 30;

  // Шаг 4: Получение поисковых текстов
  const searchTexts = await sdk.analytics.createProductSearchText({
    currentPeriod: {
      start: '2025-03-01',
      end: '2025-03-28',
    },
    nmIds,
    topOrderBy: 'openCard',
    orderBy: { field: 'openCard', mode: 'desc' },
    includeSearchTexts: true,
    includeSubstitutedSKUs: false,
    limit,
  });

  return searchTexts.data.items;
}
```

::: tip Кэшируйте тариф Jam
Ваш тариф подписки не меняется часто. Определите его один раз при запуске приложения и используйте результат для всех последующих вызовов. Паттерны кэширования описаны в [руководстве по определению подписки Jam](/guides/jam-subscription).
:::

### Методы, не требующие Jam

Следующие методы работают независимо от статуса подписки Jam:

- `createSearchReportReport()` -- главная страница отчёта
- `createTableGroup()` -- пагинация групп
- `createTableDetail()` -- детализация товаров внутри группы
- `createProductOrder()` -- заказы и позиции (но для передачи входных данных вам нужны поисковые тексты, обычно полученные из `createProductSearchText()`)

---

## Параметры фильтрации

Все методы поисковых отчётов поддерживают единый набор фильтров для сужения результатов.

### Общие фильтры

| Фильтр | Тип | Доступен в | Описание |
|--------|-----|-----------|----------|
| `nmIds` | `number[]` | Все методы | Фильтр по артикулам WB |
| `brandNames` | `string[]` | Основной отчёт, группы | Фильтр по названиям брендов |
| `subjectIds` | `number[]` | Основной отчёт, группы | Фильтр по ID предметов (категорий) |
| `tagIds` | `number[]` | Основной отчёт, группы | Фильтр по тегам продавца |
| `positionCluster` | `string` | Основной отчёт, группы, детализация | Фильтр по диапазону позиций |
| `includeSearchTexts` | `boolean` | Все, кроме `createProductOrder` | Включить данные поисковых текстов |
| `includeSubstitutedSKUs` | `boolean` | Все, кроме `createProductOrder` | Включить данные замещающих артикулов |

::: warning Ограничение булевых параметров
`includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно быть `false`. Хотя бы один должен быть `true`.
:::

### Параметры сортировки

Поле `orderBy` поддерживает различные поля сортировки в зависимости от метода:

**Основной отчёт и детализация** (`OrderBy`):
`avgPosition`, `openCard`, `addToCart`, `openToCart`, `orders`, `cartToOrder`, `visibility`, `minPrice`, `maxPrice`

**Группы и поисковые тексты** (`OrderByGrTe`):
`avgPosition`, `openCard`, `addToCart`, `openToCart`, `orders`, `cartToOrder`, `visibility`

### Кластеры позиций

Параметр `positionCluster` фильтрует результаты по диапазону средней позиции в поиске:

| Значение | Диапазон позиций |
|----------|-----------------|
| `'all'` | Все позиции |
| `'firstHundred'` | 1 -- 100 |
| `'secondHundred'` | 101 -- 200 |
| `'below'` | 201 и ниже |

### Пример: Отфильтрованный отчёт

```typescript
// Отчёт по конкретному бренду, сортировка по заказам, только топ-100 позиций
const report = await sdk.analytics.createSearchReportReport({
  currentPeriod: { start: '2025-03-01', end: '2025-03-28' },
  brandNames: ['MyBrand'],
  subjectIds: [306],  // например, категория «Кроссовки»
  positionCluster: 'firstHundred',
  orderBy: { field: 'orders', mode: 'desc' },
  includeSearchTexts: true,
  includeSubstitutedSKUs: false,
  limit: 20,
  offset: 0,
});
```

---

## Практические сценарии

### Сценарий 1: SEO-оптимизация -- Поиск топовых запросов для товара

Определите, какие поисковые запросы приносят наибольший трафик к конкретному товару, затем проверьте, соответствует ли содержимое карточки товара этим запросам.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
const PRODUCT_ID = 123456789;

async function analyzeProductSEO() {
  // 1. Определение тарифа Jam и установка правильного лимита
  const jamStatus = await sdk.general.getJamSubscriptionStatus({
    nmIds: [PRODUCT_ID],
  });

  if (jamStatus.tier === 'none') {
    console.error('Для анализа поисковых текстов требуется подписка Jam');
    return;
  }

  const limit = jamStatus.tier === 'advanced' ? 50 : 30;

  // 2. Получение топ поисковых запросов по открытиям карточки
  const byOpens = await sdk.analytics.createProductSearchText({
    currentPeriod: { start: '2025-03-01', end: '2025-03-28' },
    nmIds: [PRODUCT_ID],
    topOrderBy: 'openCard',
    orderBy: { field: 'openCard', mode: 'desc' },
    includeSearchTexts: true,
    includeSubstitutedSKUs: false,
    limit,
  });

  // 3. Получение топ поисковых запросов по заказам (ориентация на конверсию)
  const byOrders = await sdk.analytics.createProductSearchText({
    currentPeriod: { start: '2025-03-01', end: '2025-03-28' },
    nmIds: [PRODUCT_ID],
    topOrderBy: 'orders',
    orderBy: { field: 'orders', mode: 'desc' },
    includeSearchTexts: true,
    includeSubstitutedSKUs: false,
    limit,
  });

  console.log('--- Топ запросов по трафику ---');
  console.log(byOpens.data.items);

  console.log('--- Топ запросов по заказам ---');
  console.log(byOrders.data.items);

  // 4. Сравнение: запросы с высоким трафиком, но малым количеством заказов
  //    указывают на возможности оптимизации (улучшение контента карточки,
  //    ценообразования, изображений)
}

analyzeProductSEO();
```

### Сценарий 2: Мониторинг изменений поисковых позиций

Отслеживайте, как меняется позиция вашего товара в поиске по ключевым запросам во времени.

```typescript
async function monitorPositionChanges() {
  const PRODUCT_ID = 123456789;
  const TARGET_QUERIES = [
    'кроссовки мужские',
    'спортивная обувь',
    'nike кроссовки',
  ];

  // Получение данных о позициях за последние 4 недели
  const data = await sdk.analytics.createProductOrder({
    period: {
      start: '2025-03-01',
      end: '2025-03-28',
    },
    nmId: PRODUCT_ID,
    searchTexts: TARGET_QUERIES,
  });

  for (const item of data.data.items) {
    console.log(`\nЗапрос: "${item.text}" (частота: ${item.frequency})`);

    if (item.dateItems.length < 2) {
      console.log('  Недостаточно данных для анализа тренда');
      continue;
    }

    const first = item.dateItems[0];
    const last = item.dateItems[item.dateItems.length - 1];
    const positionDelta = last.avgPosition - first.avgPosition;
    const trend = positionDelta < 0 ? 'УЛУЧШИЛАСЬ' : positionDelta > 0 ? 'УХУДШИЛАСЬ' : 'СТАБИЛЬНА';

    console.log(`  Позиция: ${first.avgPosition} -> ${last.avgPosition} (${trend})`);
    console.log(`  Всего заказов за период: ${item.dateItems.reduce((sum, d) => sum + d.orders, 0)}`);
  }
}

monitorPositionChanges();
```

### Сценарий 3: Сравнение показателей по ключевым словам между брендами

Используйте отчёт на уровне групп для сравнения, как различные бренды в одной категории показывают себя по поисковым запросам.

```typescript
async function compareBrandPerformance(brandNames: string[], subjectId: number) {
  const results: Array<{ brand: string; avgPosition: number; orders: number; openCard: number }> = [];

  for (const brand of brandNames) {
    const report = await sdk.analytics.createSearchReportReport({
      currentPeriod: { start: '2025-03-01', end: '2025-03-28' },
      brandNames: [brand],
      subjectIds: [subjectId],
      positionCluster: 'all',
      orderBy: { field: 'orders', mode: 'desc' },
      includeSearchTexts: true,
      includeSubstitutedSKUs: false,
      limit: 5,
      offset: 0,
    });

    const groups = report.data.groups ?? [];
    for (const group of groups) {
      results.push({
        brand: group.brandName ?? brand,
        avgPosition: group.metrics.avgPosition.current,
        orders: group.metrics.orders.current,
        openCard: group.metrics.openCard.current,
      });
    }
  }

  // Сортировка по заказам по убыванию
  results.sort((a, b) => b.orders - a.orders);

  console.log('Сравнение показателей брендов:');
  console.log('---------------------------------------------');
  for (const r of results) {
    console.log(
      `${r.brand.padEnd(20)} | ` +
      `Поз: ${String(r.avgPosition).padStart(5)} | ` +
      `Открытия: ${String(r.openCard).padStart(6)} | ` +
      `Заказы: ${String(r.orders).padStart(6)}`
    );
  }
}

compareBrandPerformance(['BrandA', 'BrandB', 'BrandC'], 306);
```

### Сценарий 4: Выявление низкоконверсионных запросов для оптимизации

Найдите запросы, по которым ваш товар получает много открытий карточки, но мало заказов -- это возможности для оптимизации.

```typescript
async function findLowConversionQueries() {
  const PRODUCT_ID = 123456789;

  // Проверка тарифа Jam
  const jamStatus = await sdk.general.getJamSubscriptionStatus({
    nmIds: [PRODUCT_ID],
  });

  if (jamStatus.tier === 'none') {
    console.error('Требуется подписка Jam');
    return;
  }

  const limit = jamStatus.tier === 'advanced' ? 50 : 30;

  // Получение топ запросов по открытиям карточки (трафик)
  const trafficQueries = await sdk.analytics.createProductSearchText({
    currentPeriod: { start: '2025-03-01', end: '2025-03-28' },
    nmIds: [PRODUCT_ID],
    topOrderBy: 'openCard',
    orderBy: { field: 'openCard', mode: 'desc' },
    includeSearchTexts: true,
    includeSubstitutedSKUs: false,
    limit,
  });

  // Получение топ запросов по конверсии из корзины в заказ (эффективность)
  const conversionQueries = await sdk.analytics.createProductSearchText({
    currentPeriod: { start: '2025-03-01', end: '2025-03-28' },
    nmIds: [PRODUCT_ID],
    topOrderBy: 'cartToOrder',
    orderBy: { field: 'cartToOrder', mode: 'desc' },
    includeSearchTexts: true,
    includeSubstitutedSKUs: false,
    limit,
  });

  console.log('Высокотрафиковые запросы (потенциальные цели для оптимизации):');
  console.log(trafficQueries.data.items);

  console.log('\nВысококонверсионные запросы (уже работают хорошо):');
  console.log(conversionQueries.data.items);

  // Запросы, которые есть в trafficQueries, но НЕТ в conversionQueries --
  // это высокотрафиковые, низкоконверсионные -- основные цели для оптимизации.
  // Рекомендации:
  //   - Улучшить изображения товара для соответствия запросу
  //   - Скорректировать ценообразование под намерения покупателей
  //   - Обновить описание товара ключевыми словами из запроса
  //   - Выделить рекламный бюджет на запросы с доказанным трафиком
}

findLowConversionQueries();
```

---

## Лимиты запросов

Все пять методов поисковых отчётов разделяют общий пул лимитов на домене `seller-analytics-api.wildberries.ru`:

| Параметр | Значение |
|----------|----------|
| Запросов в минуту | 3 |
| Интервал | 20 секунд |
| Лимит всплеска | 3 |

::: warning Общая квота
Лимит запросов является общим для всех эндпоинтов поисковых отчётов. Вызов `createSearchReportReport()`, за которым сразу следует `createTableGroup()`, считается как 2 из 3 запросов в минуту. Распределяйте вызовы соответственно.
:::

### Рекомендуемый подход

```typescript
// Вспомогательная функция для добавления задержки между вызовами аналитики
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchFullReport() {
  // 1. Основной отчёт
  const main = await sdk.analytics.createSearchReportReport({ /* ... */ });

  // Ожидание 20 секунд перед следующим вызовом
  await delay(20_000);

  // 2. Детализация по группам
  const groups = await sdk.analytics.createTableGroup({ /* ... */ });

  await delay(20_000);

  // 3. Детализация по товарам
  const details = await sdk.analytics.createTableDetail({ /* ... */ });
}
```

---

## Обработка ошибок

```typescript
import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function safeSearchReport() {
  try {
    const report = await sdk.analytics.createSearchReportReport({
      currentPeriod: { start: '2025-03-01', end: '2025-03-28' },
      positionCluster: 'all',
      orderBy: { field: 'openCard', mode: 'desc' },
      includeSearchTexts: true,
      includeSubstitutedSKUs: false,
      limit: 10,
      offset: 0,
    });
    return report;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Недействительный API-ключ или отсутствуют права Аналитики');
    } else if (error instanceof RateLimitError) {
      console.error(`Превышен лимит запросов. Повторите через ${error.retryAfter}мс`);
    } else if (error instanceof ValidationError) {
      // Типичные причины:
      // - Оба includeSubstitutedSKUs и includeSearchTexts равны false
      // - limit превышает максимум тарифа Jam (для createProductSearchText)
      // - Некорректный диапазон дат (start > end или > 365 дней от текущей даты)
      console.error('Некорректные параметры запроса:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('Сетевая ошибка:', error.message);
    } else if (error instanceof WBAPIError) {
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
    throw error;
  }
}
```

---

## Связанные ресурсы

- [Справочник модуля Аналитики](/modules/analytics) -- Полный справочник для всех методов модуля Аналитики
- [Определение подписки Jam](/guides/jam-subscription) -- Определение тарифа Jam и установка корректных лимитов
- [Лучшие практики аналитики воронки продаж](/guides/best-practices-sales-funnel) -- Анализ органической и рекламной воронки
- [Лучшие практики](/guides/best-practices) -- Общие паттерны обработки ошибок и работы в продакшене
- [Руководство по конфигурации](/guides/configuration) -- Конфигурация SDK и настройки таймаутов

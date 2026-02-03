# Рекламная статистика: Полное руководство

Подробная инструкция по получению всех данных рекламной статистики через SDK для фронт-энд и бэк-энд сервисов.

## Содержание

[[toc]]

## Карта методов

Все методы для получения рекламных данных:

| Метод | Что возвращает | Rate Limit | HTTP |
|-------|---------------|------------|------|
| [`getAdvFullstats()`](#getadvfullstats) | Полная статистика кампаний (клики, показы, заказы, по дням/платформам/SKU) | **3 req/min, интервал 20с** | GET |
| [`getStatsKeywords()`](#getstatskeywords) | Статистика по ключевым словам (за 7 дней) | 240 req/min | GET |
| [`getStatWords()`](#getstatwords) | Ключевые слова для кампаний с ручной ставкой | 240 req/min | GET |
| [`getAutoStatWords()`](#getautostatwords) | Кластеры фраз для кампаний с единой ставкой | 240 req/min | GET |
| [`createAdvStat()`](#createadvstat) | Статистика медиа-кампаний (баннеры) | 600 req/min | POST |
| [`createAdvFullstat()`](#createadvfullstat) | Полная статистика v2 | 1 req/min | POST |
| [`getAdvBalance()`](#getadvbalance) | Баланс рекламного кабинета | 60 req/min | GET |
| [`getAdvBudget()`](#getadvbudget) | Бюджет кампании | 240 req/min | GET |
| [`getAdvUpd()`](#getadvupd) | История расходов (УПД) | 60 req/min | GET |
| [`getAdvPayments()`](#getadvpayments) | История пополнений | 60 req/min | GET |
| [`getPromotionCount()`](#getpromotioncount) | Список всех кампаний с ID | 300 req/min | GET |
| [`getAuctionAdverts()`](#getauctionadverts) | Детали кампаний типа 9 (текущие) | 300 req/min | GET |

::: danger Критически важно
Метки ~~`createAdvFullstat()`~~ (v2, POST) и `getAutoStatWords()` — **DEPRECATED**. Используйте `getAdvFullstats()` (v3, GET).
:::

---

## Инициализация SDK

```typescript
import { WildberriesSDK, RateLimitError } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  },
});
```

---

## getAdvFullstats

**Основной метод получения рекламной статистики.** Возвращает полные данные по кампаниям: клики, показы, CTR, CPC, заказы, расходы — с разбивкой по дням, платформам и SKU.

### Параметры

| Параметр | Тип | Обязательный | Описание |
|----------|-----|:---:|-----------|
| `ids` | `string` | Да | ID кампаний через запятую. Максимум **100** |
| `beginDate` | `string` | Да | Начало периода, формат `YYYY-MM-DD` |
| `endDate` | `string` | Да | Конец периода, формат `YYYY-MM-DD` |

::: warning Ограничения
- Максимальный период: **31 день** от `beginDate`
- Работает только для кампаний в статусах: **7** (завершена), **9** (активна), **11** (на паузе)
- Rate limit: **3 запроса в минуту**, интервал **20 секунд**
:::

### Базовый пример

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511,23332267',     // ⚠️ Строка, НЕ число!
  beginDate: '2025-12-01',      // ⚠️ Именно beginDate, НЕ nDate, НЕ from
  endDate: '2025-12-31',        // ⚠️ Именно endDate, НЕ to
});

for (const campaign of stats) {
  console.log(`Кампания ${campaign.advertId}:`);
  console.log(`  Показы: ${campaign.views}`);
  console.log(`  Клики: ${campaign.clicks}`);
  console.log(`  CTR: ${campaign.ctr}%`);
  console.log(`  CPC: ${campaign.cpc}₽`);
  console.log(`  Заказы: ${campaign.orders}`);
  console.log(`  Расход: ${campaign.sum}₽`);
  console.log(`  В корзину: ${campaign.atbs}`);
  console.log(`  CR: ${campaign.cr}%`);
  console.log(`  Отмены: ${campaign.canceled}`);
}
```

### Структура ответа

```typescript
// Каждый элемент массива — одна кампания
interface FullStatsItem {
  advertId: number;    // ID кампании
  views: number;       // Общее количество показов
  clicks: number;      // Общее количество кликов
  ctr: number;         // Click-through rate, %
  cpc: number;         // Cost per click, ₽
  sum: number;         // Общий расход, ₽
  atbs: number;        // Добавлений в корзину
  orders: number;      // Заказы
  cr: number;          // Conversion rate, %
  shks: number;        // Количество товаров в заказах
  sum_price: number;   // Сумма заказов, ₽
  canceled: number;    // Отмены

  // Разбивка по дням
  days: Array<{
    date: string;          // "2025-12-17T00:00:00Z"
    views: number;
    clicks: number;
    ctr: number;
    cpc: number;
    sum: number;
    atbs: number;
    orders: number;
    cr: number;
    shks: number;
    sum_price: number;
    canceled: number;

    // Разбивка по платформам
    apps: Array<{
      appType: number;   // 1 = сайт, 32 = Android, 64 = iOS
      views: number;
      clicks: number;
      orders: number;
      sum: number;

      // Разбивка по SKU (товарам)
      nms: Array<{
        nmId: number;    // Артикул WB
        name: string;    // Название товара
        views: number;
        clicks: number;
        orders: number;
        sum: number;
      }>;
    }>;
  }>;

  // Средняя позиция (для кампаний с единой ставкой)
  boosterStats: Array<{
    date: string;
    nm: number;
    avg_position: number;
  }>;
}
```

### Дневная статистика (adv_daily_stats)

Для получения ежедневной статистики используйте поле `days` из ответа:

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511',
  beginDate: '2025-12-01',
  endDate: '2025-12-07',
});

// Ежедневная статистика
for (const campaign of stats) {
  console.log(`\n=== Кампания ${campaign.advertId} ===`);

  for (const day of campaign.days) {
    const date = day.date.split('T')[0]; // "2025-12-01"
    console.log(`${date}: показы=${day.views}, клики=${day.clicks}, ` +
      `CTR=${day.ctr}%, расход=${day.sum}₽, заказы=${day.orders}`);
  }
}
```

### Статистика по платформам

```typescript
const PLATFORMS: Record<number, string> = {
  1: 'Сайт',
  32: 'Android',
  64: 'iOS',
};

for (const campaign of stats) {
  for (const day of campaign.days) {
    const date = day.date.split('T')[0];
    console.log(`\n--- ${date} ---`);

    for (const app of day.apps) {
      const platform = PLATFORMS[app.appType] ?? `Unknown(${app.appType})`;
      console.log(`  ${platform}: показы=${app.views}, клики=${app.clicks}, ` +
        `заказы=${app.orders}, расход=${app.sum}₽`);
    }
  }
}
```

### Статистика по SKU (товарам)

```typescript
// Агрегация данных по товарам за весь период
interface SkuAggregated {
  nmId: number;
  name: string;
  views: number;
  clicks: number;
  orders: number;
  sum: number;
}

const skuMap = new Map<number, SkuAggregated>();

for (const campaign of stats) {
  for (const day of campaign.days) {
    for (const app of day.apps) {
      for (const nm of app.nms) {
        const existing = skuMap.get(nm.nmId) ?? {
          nmId: nm.nmId,
          name: nm.name,
          views: 0, clicks: 0, orders: 0, sum: 0,
        };

        existing.views += nm.views;
        existing.clicks += nm.clicks;
        existing.orders += nm.orders;
        existing.sum += nm.sum;

        skuMap.set(nm.nmId, existing);
      }
    }
  }
}

// Вывод по убыванию расходов
const sorted = [...skuMap.values()].sort((a, b) => b.sum - a.sum);
for (const sku of sorted) {
  console.log(`SKU ${sku.nmId} "${sku.name}": ` +
    `${sku.views} показов, ${sku.clicks} кликов, ` +
    `${sku.orders} заказов, ${sku.sum}₽`);
}
```

### Обработка rate limit

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

const DELAY_BETWEEN_REQUESTS = 21_000; // 21 секунда
const MAX_IDS_PER_REQUEST = 100;

/**
 * Получает статистику для произвольного количества кампаний
 * с автоматической пагинацией и обработкой rate limit.
 */
async function getAllCampaignStats(
  campaignIds: number[],
  beginDate: string,
  endDate: string,
) {
  const results: FullStatsItem[] = [];

  // Разбиваем на батчи по 100 ID
  for (let i = 0; i < campaignIds.length; i += MAX_IDS_PER_REQUEST) {
    const batch = campaignIds.slice(i, i + MAX_IDS_PER_REQUEST);

    let attempt = 0;
    while (attempt < 3) {
      try {
        const stats = await sdk.promotion.getAdvFullstats({
          ids: batch.join(','),
          beginDate,
          endDate,
        });
        results.push(...stats);
        break; // Успешно, выходим из retry loop
      } catch (error) {
        if (error instanceof RateLimitError) {
          const waitMs = error.retryAfter ?? DELAY_BETWEEN_REQUESTS;
          console.warn(`Rate limit, ожидание ${waitMs}ms (попытка ${attempt + 1})`);
          await new Promise(r => setTimeout(r, waitMs));
          attempt++;
        } else {
          throw error; // Другие ошибки пробрасываем
        }
      }
    }

    // Пауза между батчами
    if (i + MAX_IDS_PER_REQUEST < campaignIds.length) {
      await new Promise(r => setTimeout(r, DELAY_BETWEEN_REQUESTS));
    }
  }

  return results;
}
```

---

## getStatsKeywords

Статистика по ключевым словам из поиска. Показывает, какие ключевые слова приводят показы и клики.

### Параметры

| Параметр | Тип | Обязательный | Описание |
|----------|-----|:---:|-----------|
| `advert_id` | `number` | Да | ID кампании |
| `from` | `string` | Да | Начало периода, `YYYY-MM-DD` |
| `to` | `string` | Да | Конец периода, `YYYY-MM-DD` |

::: warning Ограничения
- Максимальный период: **7 дней**
- Обновляется **каждый час**
- Домен API: `api.wildberries.ru` (НЕ `advert-api`)
:::

### Пример

```typescript
const today = new Date();
const weekAgo = new Date();
weekAgo.setDate(today.getDate() - 7);

const format = (d: Date) => d.toISOString().split('T')[0];

const keywordStats = await sdk.promotion.getStatsKeywords({
  advert_id: 24483511,            // ⚠️ advert_id, НЕ id, НЕ campaignId
  from: format(weekAgo),          // ⚠️ from, НЕ beginDate
  to: format(today),              // ⚠️ to, НЕ endDate
});

for (const day of keywordStats.keywords) {
  console.log(`\n--- ${day.date} ---`);

  // Сортировка по расходу
  const sorted = [...(day.stats ?? [])].sort((a, b) => (b.sum ?? 0) - (a.sum ?? 0));

  for (const kw of sorted) {
    console.log(`  "${kw.keyword}": показы=${kw.views}, клики=${kw.clicks}, ` +
      `CTR=${kw.ctr}%, расход=${kw.sum}₽`);
  }
}
```

### Структура ответа

```typescript
{
  keywords: Array<{
    date: string;             // "2025-12-17"
    stats: Array<{
      keyword: string;        // Ключевое слово
      views: number;          // Показы
      clicks: number;         // Клики
      ctr: number;            // CTR, %
      sum: number;            // Расход, ₽
    }>;
  }>;
}
```

---

## getStatWords

Статистика по ключевым словам для кампаний с **ручной ставкой** (type 9, bid_type manual). Показывает фразы, минус-слова и детальную статистику по каждому ключу.

### Параметры

| Параметр | Тип | Обязательный | Описание |
|----------|-----|:---:|-----------|
| `id` | `number` | Да | ID кампании |

::: info
Обновляется каждые **30 минут**. Работает только для кампаний с ручной ставкой.
:::

### Пример

```typescript
const wordStats = await sdk.promotion.getStatWords({ id: 24483511 });

// Настроенные фразы кампании
if (wordStats.words) {
  console.log('Фразы:', wordStats.words.phrase?.join(', '));
  console.log('Минус-слова:', wordStats.words.excluded?.join(', '));
  console.log('Фиксированные:', wordStats.words.fixed ? 'Да' : 'Нет');

  if (wordStats.words.keywords) {
    console.log('\nТоп ключевых слов:');
    for (const kw of wordStats.words.keywords.slice(0, 10)) {
      console.log(`  "${kw.keyword}": ${kw.count} показов`);
    }
  }
}

// Статистика по ключевым словам
if (wordStats.stat) {
  console.log('\nСтатистика:');
  for (const s of wordStats.stat) {
    console.log(`  "${s.keyword}": views=${s.views}, clicks=${s.clicks}, ` +
      `CTR=${s.ctr}%, CPC=${s.cpc}₽, расход=${s.sum}₽`);
  }
}
```

### Структура ответа

```typescript
{
  words?: {
    phrase?: string[];         // Активные поисковые фразы
    strong?: string[];         // Усиленные фразы
    excluded?: string[];       // Минус-слова
    pluse?: string[];          // Доп. фразы
    keywords?: Array<{
      keyword?: string;
      count?: number;          // Количество показов
    }>;
    fixed?: boolean;           // Фиксированные фразы
  };
  stat?: Array<{
    advertId?: number;
    keyword?: string;
    views?: number;
    clicks?: number;
    ctr?: number;              // %
    cpc?: number;              // ₽
    sum?: number;              // Расход, ₽
    frq?: number;              // Частотность
    duration?: number;         // Длительность показов
  }>;
}
```

---

## getAutoStatWords

::: danger DEPRECATED — будет отключен 02.02.2026
Используйте [`getAdvFullstats()`](#getadvfullstats) вместо этого метода.
:::

Кластеры ключевых фраз для кампаний с **единой ставкой** (type 8). Группирует похожие поисковые фразы.

### Пример

```typescript
const clusters = await sdk.promotion.getAutoStatWords({ id: 24483511 });

if (clusters.clusters) {
  for (const c of clusters.clusters) {
    console.log(`Кластер "${c.cluster}": ${c.count} показов`);
    console.log(`  Ключевые слова: ${c.keywords?.join(', ')}`);
  }
}

if (clusters.excluded) {
  console.log(`\nМинус-слова: ${clusters.excluded.join(', ')}`);
}
```

---

## createAdvStat

Статистика для **медиа-кампаний** (баннерная реклама WB Media). Отдельный API домен: `advert-media-api.wildberries.ru`.

### Параметры

Принимает три формата запроса:

**Формат 1: По датам**
```typescript
const stats = await sdk.promotion.createAdvStat([
  { id: 12345, dates: ['2025-12-01', '2025-12-02', '2025-12-03'] }
]);
```

**Формат 2: По интервалу**
```typescript
const stats = await sdk.promotion.createAdvStat([
  { id: 12345, interval: { begin: '2025-12-01', end: '2025-12-07' } }
]);
```

**Формат 3: Только по ID кампании (вся история)**
```typescript
const stats = await sdk.promotion.createAdvStat([
  { id: 12345 }
]);
```

### Структура ответа

```typescript
Array<{
  stats?: Array<{
    item_id?: number;          // ID баннера
    item_name?: string;        // Название
    category_name?: string;    // Категория
    advert_type?: number;      // Тип рекламы
    place?: string;            // Место размещения
    views?: number;
    clicks?: number;
    cr?: number;               // Conversion rate
    ctr?: number;
    atbs?: number;
    orders?: number;
    price?: number;
    cpc?: number;
    status?: number;
    expenses?: number;         // Расходы

    // Ежедневная разбивка по платформам
    daily_stats?: Array<{
      date?: string;
      app_type_stats?: Array<{
        app_type?: number;     // 1=сайт, 32=Android, 64=iOS
        stats?: {
          views?: number;
          clicks?: number;
          atbs?: number;
          ctr?: number;
        };
      }>;
    }>;
  }>;
}>
```

---

## createAdvFullstat

::: danger DEPRECATED — будет отключен 30 сентября
Используйте [`getAdvFullstats()`](#getadvfullstats) вместо этого метода. Обратите внимание: v2 использует POST, v3 использует GET.
:::

Устаревший метод полной статистики (v2). Rate limit: 1 req/min.

```typescript
// ❌ DEPRECATED — не используйте
const stats = await sdk.promotion.createAdvFullstat([
  { id: 24483511, interval: { begin: '2025-12-01', end: '2025-12-07' } }
]);

// ✅ ИСПОЛЬЗУЙТЕ ВМЕСТО ЭТОГО:
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511',
  beginDate: '2025-12-01',
  endDate: '2025-12-07',
});
```

---

## getAdvBalance

Баланс рекламного кабинета.

```typescript
const balance = await sdk.promotion.getAdvBalance();

console.log(`Баланс: ${balance.balance}₽`);     // Средства продавца
console.log(`Взаимозачет: ${balance.net}₽`);     // Из будущих продаж
console.log(`Бонусы: ${balance.bonus}₽`);        // Бонусы от WB

// Детали бонусов
if (balance.cashbacks) {
  for (const cb of balance.cashbacks) {
    console.log(`  Бонус: ${cb.sum}₽ (${cb.percent}%), до ${cb.expiration_date}`);
  }
}
```

---

## getAdvBudget

Бюджет конкретной кампании.

```typescript
const budget = await sdk.promotion.getAdvBudget({ id: 24483511 });

console.log(`Баланс (наличные): ${budget.cash}₽`);
console.log(`Баланс (взаимозачет): ${budget.netting}₽`);
console.log(`Итого: ${budget.total}₽`);
```

---

## getAdvUpd

История расходов (акты УПД) за период.

```typescript
const expenses = await sdk.promotion.getAdvUpd({
  from: '2025-12-01',
  to: '2025-12-31',
});

let totalExpenses = 0;
for (const record of expenses) {
  totalExpenses += record.updSum ?? 0;
  console.log(`${record.updTime}: кампания "${record.campName}" (${record.advertId}) — ${record.updSum}₽`);
}
console.log(`\nИтого расходов: ${totalExpenses}₽`);
```

### Структура ответа

```typescript
Array<{
  updNum?: number;        // Номер УПД
  updTime?: string;       // Дата/время
  updSum?: number;        // Сумма, ₽
  advertId?: number;      // ID кампании
  campName?: string;      // Название кампании
  advertType?: number;    // Тип кампании
  paymentType?: string;   // Тип оплаты
  advertStatus?: number;  // Статус кампании
}>
```

---

## getAdvPayments

История пополнений рекламного кабинета.

```typescript
const payments = await sdk.promotion.getAdvPayments({
  from: '2025-01-01',
  to: '2025-12-31',
});

for (const p of payments) {
  console.log(`${p.date}: пополнение ${p.sum}₽, тип=${p.type}, статус=${p.statusId}`);
}
```

---

## getPromotionCount

Список всех кампаний с ID, типами и статусами. Используйте для получения ID кампаний перед запросом статистики.

```typescript
const campaigns = await sdk.promotion.getPromotionCount();

console.log(`Всего кампаний: ${campaigns.all}`);

// Собираем все ID кампаний
const allIds: number[] = [];

for (const group of campaigns.adverts ?? []) {
  console.log(`Тип ${group.type}, статус ${group.status}: ${group.count} шт.`);

  for (const ad of group.advert_list ?? []) {
    allIds.push(ad.advertId!);
  }
}

console.log(`\nСобрано ID: ${allIds.length}`);
console.log(`ID кампаний: ${allIds.join(', ')}`);
```

---

## getAuctionAdverts

Детали кампаний типа 9 (текущий тип). Ставки, товары, плейсменты.

```typescript
// Все активные кампании
const active = await sdk.promotion.getAuctionAdverts({ statuses: '9' });

// Конкретные кампании
const specific = await sdk.promotion.getAuctionAdverts({
  ids: '24483511,23332267',
});

// Фильтр по типу оплаты
const cpmCampaigns = await sdk.promotion.getAuctionAdverts({
  payment_type: 'cpm',
});
```

---

## Полные рабочие примеры

### Пример 1: Ежедневный отчет по рекламе (бэк-энд сервис)

```typescript
import { WildberriesSDK, RateLimitError } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function generateDailyReport(date: string) {
  const report: Record<string, unknown>[] = [];

  // 1. Получаем список всех кампаний
  const campaigns = await sdk.promotion.getPromotionCount();
  const activeIds = (campaigns.adverts ?? [])
    .filter(g => g.status === 9 || g.status === 11) // Активные и на паузе
    .flatMap(g => g.advert_list?.map(a => a.advertId!) ?? []);

  if (activeIds.length === 0) {
    console.log('Нет активных кампаний');
    return [];
  }

  // 2. Получаем статистику (батчами по 100)
  for (let i = 0; i < activeIds.length; i += 100) {
    const batch = activeIds.slice(i, i + 100);

    try {
      const stats = await sdk.promotion.getAdvFullstats({
        ids: batch.join(','),
        beginDate: date,
        endDate: date,
      });

      for (const campaign of stats) {
        const dayData = campaign.days?.[0]; // Один день

        report.push({
          campaign_id: campaign.advertId,
          date,
          views: campaign.views,
          clicks: campaign.clicks,
          ctr: campaign.ctr,
          cpc: campaign.cpc,
          orders: campaign.orders,
          spent: campaign.sum,
          revenue: campaign.sum_price,
          roi: campaign.sum > 0
            ? ((campaign.sum_price - campaign.sum) / campaign.sum * 100).toFixed(2)
            : 0,

          // По платформам
          platforms: dayData?.apps?.map(app => ({
            type: app.appType === 1 ? 'web' : app.appType === 32 ? 'android' : 'ios',
            views: app.views,
            clicks: app.clicks,
            orders: app.orders,
          })) ?? [],

          // Топ товаров
          top_skus: dayData?.apps?.flatMap(app =>
            app.nms.map(nm => ({
              nmId: nm.nmId,
              name: nm.name,
              clicks: nm.clicks,
              orders: nm.orders,
              spent: nm.sum,
            }))
          )?.sort((a, b) => b.spent - a.spent)
            .slice(0, 5) ?? [],
        });
      }
    } catch (error) {
      if (error instanceof RateLimitError) {
        await new Promise(r => setTimeout(r, error.retryAfter ?? 21000));
        i -= 100; // Повторяем этот батч
        continue;
      }
      throw error;
    }

    // Пауза 21с между батчами
    if (i + 100 < activeIds.length) {
      await new Promise(r => setTimeout(r, 21000));
    }
  }

  // 3. Баланс
  const balance = await sdk.promotion.getAdvBalance();

  return { report, balance: { cash: balance.balance, net: balance.net, bonus: balance.bonus } };
}

// Использование
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const dateStr = yesterday.toISOString().split('T')[0];

const result = await generateDailyReport(dateStr);
console.log(JSON.stringify(result, null, 2));
```

### Пример 2: Мониторинг ключевых слов (фронт-энд)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

interface KeywordReport {
  keyword: string;
  totalViews: number;
  totalClicks: number;
  totalSpent: number;
  avgCtr: number;
  days: Array<{ date: string; views: number; clicks: number; sum: number }>;
}

async function getKeywordAnalytics(campaignId: number, days: number = 7) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - days);

  const format = (d: Date) => d.toISOString().split('T')[0];

  const stats = await sdk.promotion.getStatsKeywords({
    advert_id: campaignId,
    from: format(from),
    to: format(to),
  });

  // Агрегация по ключевым словам
  const kwMap = new Map<string, KeywordReport>();

  for (const day of stats.keywords ?? []) {
    for (const kw of day.stats ?? []) {
      const existing = kwMap.get(kw.keyword!) ?? {
        keyword: kw.keyword!,
        totalViews: 0,
        totalClicks: 0,
        totalSpent: 0,
        avgCtr: 0,
        days: [],
      };

      existing.totalViews += kw.views ?? 0;
      existing.totalClicks += kw.clicks ?? 0;
      existing.totalSpent += kw.sum ?? 0;
      existing.days.push({
        date: day.date!,
        views: kw.views ?? 0,
        clicks: kw.clicks ?? 0,
        sum: kw.sum ?? 0,
      });

      kwMap.set(kw.keyword!, existing);
    }
  }

  // Расчет среднего CTR
  for (const kw of kwMap.values()) {
    kw.avgCtr = kw.totalViews > 0
      ? (kw.totalClicks / kw.totalViews) * 100
      : 0;
  }

  return [...kwMap.values()].sort((a, b) => b.totalSpent - a.totalSpent);
}

// Использование
const keywords = await getKeywordAnalytics(24483511, 7);
for (const kw of keywords.slice(0, 20)) {
  console.log(`"${kw.keyword}": ${kw.totalViews} показов, ` +
    `${kw.totalClicks} кликов, CTR=${kw.avgCtr.toFixed(2)}%, ${kw.totalSpent}₽`);
}
```

### Пример 3: Финансовый дашборд

```typescript
async function getFinancialDashboard(fromDate: string, toDate: string) {
  const [balance, expenses, payments] = await Promise.all([
    sdk.promotion.getAdvBalance(),
    sdk.promotion.getAdvUpd({ from: fromDate, to: toDate }),
    sdk.promotion.getAdvPayments({ from: fromDate, to: toDate }),
  ]);

  // Итоги
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.updSum ?? 0), 0);
  const totalDeposits = payments.reduce((sum, p) => sum + (p.sum ?? 0), 0);

  // Расходы по кампаниям
  const byCampaign = new Map<number, { name: string; total: number }>();
  for (const e of expenses) {
    const existing = byCampaign.get(e.advertId!) ?? { name: e.campName ?? '', total: 0 };
    existing.total += e.updSum ?? 0;
    byCampaign.set(e.advertId!, existing);
  }

  return {
    balance: {
      cash: balance.balance,
      netting: balance.net,
      bonus: balance.bonus,
      total: (balance.balance ?? 0) + (balance.net ?? 0) + (balance.bonus ?? 0),
    },
    period: { from: fromDate, to: toDate },
    totalExpenses,
    totalDeposits,
    netCashflow: totalDeposits - totalExpenses,
    topCampaignsBySpend: [...byCampaign.entries()]
      .sort(([, a], [, b]) => b.total - a.total)
      .slice(0, 10)
      .map(([id, data]) => ({ id, name: data.name, spent: data.total })),
  };
}
```

---

## Типичные ошибки и решения

### Ошибка: HTTP 400 на getAdvFullstats

**Причина #1: Неправильные имена параметров**

```typescript
// ❌ НЕПРАВИЛЬНО — частая ошибка
await sdk.promotion.getAdvFullstats({
  ids: '123',
  nDate: '2025-12-01',     // ❌ Нет такого параметра!
  endDate: '2025-12-31',
});

// ❌ НЕПРАВИЛЬНО — другие варианты ошибок
await sdk.promotion.getAdvFullstats({
  ids: '123',
  from: '2025-12-01',      // ❌ Это не getStatsKeywords!
  to: '2025-12-31',
});

// ✅ ПРАВИЛЬНО
await sdk.promotion.getAdvFullstats({
  ids: '123',
  beginDate: '2025-12-01', // ✅ beginDate
  endDate: '2025-12-31',   // ✅ endDate
});
```

**Причина #2: `ids` как число, не строка**

```typescript
// ❌ НЕПРАВИЛЬНО
await sdk.promotion.getAdvFullstats({
  ids: 24483511,            // ❌ Число, а нужна строка
  beginDate: '2025-12-01',
  endDate: '2025-12-31',
});

// ✅ ПРАВИЛЬНО
await sdk.promotion.getAdvFullstats({
  ids: '24483511',          // ✅ Строка
  beginDate: '2025-12-01',
  endDate: '2025-12-31',
});

// ✅ Несколько кампаний
await sdk.promotion.getAdvFullstats({
  ids: '24483511,23332267', // ✅ Через запятую
  beginDate: '2025-12-01',
  endDate: '2025-12-31',
});
```

**Причина #3: Период больше 31 дня**

```typescript
// ❌ Период 60 дней — вернет 400
await sdk.promotion.getAdvFullstats({
  ids: '24483511',
  beginDate: '2025-10-01',  // ❌ >31 дня
  endDate: '2025-12-01',
});

// ✅ Разбейте на несколько запросов
for (const [begin, end] of [
  ['2025-10-01', '2025-10-31'],
  ['2025-11-01', '2025-12-01'],
]) {
  const stats = await sdk.promotion.getAdvFullstats({
    ids: '24483511',
    beginDate: begin,
    endDate: end,
  });
  // ... обработка
  await new Promise(r => setTimeout(r, 21000)); // Rate limit
}
```

### Ошибка: HTTP 429 (Rate Limit)

**Проблема:** Слишком частые запросы.

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

// ✅ Правильная обработка
try {
  const stats = await sdk.promotion.getAdvFullstats({
    ids: '24483511',
    beginDate: '2025-12-01',
    endDate: '2025-12-07',
  });
} catch (error) {
  if (error instanceof RateLimitError) {
    // SDK автоматически ретраит, но если лимит исчерпан:
    console.warn(`Rate limit! Ждать: ${error.retryAfter}ms`);
    await new Promise(r => setTimeout(r, error.retryAfter));
    // Повторить запрос
  }
}
```

**Рекомендуемые интервалы между запросами:**

| Метод | Минимальный интервал |
|-------|---------------------|
| `getAdvFullstats()` | 21 секунда |
| `getStatsKeywords()` | 250 мс |
| `getStatWords()` | 250 мс |
| `getAdvBalance()` | 1 секунда |
| `getAdvUpd()` | 1 секунда |
| `getAdvPayments()` | 1 секунда |
| `createAdvStat()` | 100 мс |

### Ошибка: Пустой массив в ответе

**Причины:**
1. Кампания не в статусе 7, 9 или 11
2. За указанный период не было активности
3. ID кампании не существует или принадлежит другому продавцу

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511',
  beginDate: '2025-12-01',
  endDate: '2025-12-07',
});

if (stats.length === 0) {
  // Проверяем: существует ли кампания?
  const campaigns = await sdk.promotion.getPromotionCount();
  const allIds = campaigns.adverts?.flatMap(g =>
    g.advert_list?.map(a => a.advertId) ?? []
  ) ?? [];

  if (!allIds.includes(24483511)) {
    console.error('Кампания 24483511 не найдена в аккаунте');
  } else {
    console.log('Кампания существует, но за период нет данных');
  }
}
```

### Ошибка: getStatsKeywords — неправильные параметры

```typescript
// ❌ НЕПРАВИЛЬНО — путаница с getAdvFullstats
await sdk.promotion.getStatsKeywords({
  id: 24483511,              // ❌ Параметр называется advert_id
  beginDate: '2025-12-01',   // ❌ Параметр называется from
  endDate: '2025-12-07',     // ❌ Параметр называется to
});

// ✅ ПРАВИЛЬНО
await sdk.promotion.getStatsKeywords({
  advert_id: 24483511,       // ✅ advert_id
  from: '2025-12-01',        // ✅ from
  to: '2025-12-07',          // ✅ to (макс 7 дней)
});
```

---

## Сводная таблица параметров

| Метод | Параметр даты начала | Параметр даты конца | Параметр ID | Макс. период |
|-------|---------------------|--------------------|----|--------------|
| `getAdvFullstats()` | `beginDate` | `endDate` | `ids` (строка) | 31 день |
| `getStatsKeywords()` | `from` | `to` | `advert_id` (число) | 7 дней |
| `getStatWords()` | — | — | `id` (число) | — |
| `getAutoStatWords()` | — | — | `id` (число) | — |
| `getAdvUpd()` | `from` | `to` | — | без лимита |
| `getAdvPayments()` | `from` | `to` | — | без лимита |

::: danger ЗАПОМНИТЕ
У каждого метода **свои имена параметров**! Это самая частая причина ошибок HTTP 400. Не путайте `beginDate` с `from`, `ids` с `id`, `advert_id` с `id`.
:::

---

## Статусы кампаний

| Код | Статус | Статистика доступна |
|-----|--------|:---:|
| `4` | Готова к запуску | Нет |
| `7` | Завершена | **Да** |
| `8` | Отменена | Нет |
| `9` | Активна | **Да** |
| `11` | На паузе | **Да** |
| `-1` | Удаляется | Нет |

---

## Типы кампаний

| Тип | Описание | Статус |
|-----|----------|--------|
| `4` | В каталоге | **Deprecated** |
| `5` | В карточке товара | **Deprecated** |
| `6` | В поиске | **Deprecated** |
| `7` | В рекомендациях | **Deprecated** |
| `8` | Единая ставка | **Deprecated** (02.02.2026) |
| `9` | Единая или ручная ставка | **Текущий** |

---

## API домены

Разные методы используют **разные домены API**:

| Домен | Методы |
|-------|--------|
| `advert-api.wildberries.ru` | `getAdvFullstats`, `getStatWords`, `getAutoStatWords`, `getAdvBalance`, `getAdvBudget`, `getAdvUpd`, `getAdvPayments`, `getPromotionCount`, `getAuctionAdverts` |
| `advert-media-api.wildberries.ru` | `createAdvStat`, `getAdvCount`, `getAdvAdverts`, `getAdvAdvert` |
| `api.wildberries.ru` | `getStatsKeywords` |

::: info
SDK автоматически направляет запросы на нужный домен. Знать домены нужно только для отладки сетевых проблем.
:::

---

## Связанные ресурсы

- [Promotion & Advertising Module Guide](/guides/promotion-advertising) — полное руководство по управлению рекламой
- [Migration v2.4 - Promotion API Deprecation](/guides/migration-v2.4-promotion-deprecation) — миграция устаревших методов
- [PromotionModule API Reference](/api/classes/PromotionModule) — полный API reference

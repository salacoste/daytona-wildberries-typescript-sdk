# Storage Fees Integration Guide

Руководство по получению данных о платном хранении через Wildberries SDK и сверке с еженедельными отчётами.

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY });

// Получить детализацию платного хранения за период
const storageData = await getStorageFees(sdk, '2024-12-02', '2024-12-08');
```

---

## Два источника данных о хранении

### 1. Paid Storage API (Рекомендуется для детализации)

**Модуль:** `sdk.reports`

| Характеристика | Значение |
|----------------|----------|
| Детализация | По товару, складу, дню |
| Max период | **8 дней** за запрос |
| Ключевое поле | `warehousePrice` |
| Поля для Excel | Все поля совпадают |

### 2. Weekly Realization Report (Для сверки итогов)

**Модуль:** `sdk.finances`

| Характеристика | Значение |
|----------------|----------|
| Детализация | Агрегированные суммы по дням |
| Max период | ~365 дней |
| Ключевое поле | `storage_fee` |
| nm_id | Всегда `0` (без привязки к товару) |

---

## Реализация: Paid Storage API

### Типы

```typescript
interface PaidStorageItem {
  date: string;                    // Дата расчёта
  warehouse: string;               // Название склада
  warehouseCoef: number;           // Коэффициент склада
  logWarehouseCoef: number;        // Коэффициент логистики и хранения
  nmId: number;                    // Артикул WB
  barcode: string;                 // Баркод
  subject: string;                 // Предмет (категория)
  brand: string;                   // Бренд
  vendorCode: string;              // Артикул продавца
  chrtId: number;                  // Код размера
  size: string;                    // Размер
  volume: number;                  // Объём товара (л)
  calcType: string;                // Способ расчёта
  warehousePrice: number;          // Сумма хранения, ₽
  barcodesCount: number;           // Количество единиц
  loyaltyDiscount: number;         // Скидка программы лояльности, ₽
  tariffFixDate: string;           // Дата фиксации тарифа
}
```

### Функция получения данных

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

interface StorageFeesResult {
  items: PaidStorageItem[];
  totalAmount: number;
  periodStart: string;
  periodEnd: string;
  byDate: Record<string, number>;
  byProduct: Record<number, { subject: string; amount: number }>;
}

/**
 * Получить данные о платном хранении за период.
 * Автоматически разбивает запросы на чанки по 2 дня (рекомендуется)
 * из-за лимита API в 8 дней.
 */
async function getStorageFees(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string,
  chunkDays: number = 2
): Promise<StorageFeesResult> {
  const chunks = splitDateRange(dateFrom, dateTo, chunkDays);
  const allItems: PaidStorageItem[] = [];

  for (const chunk of chunks) {
    const items = await fetchStorageChunk(sdk, chunk.from, chunk.to);
    allItems.push(...items);

    // Rate limit: 1 req/min для создания задания
    if (chunks.indexOf(chunk) < chunks.length - 1) {
      await delay(65000);
    }
  }

  return aggregateStorageData(allItems, dateFrom, dateTo);
}

/**
 * Получить данные за один чанк (max 8 дней)
 */
async function fetchStorageChunk(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<PaidStorageItem[]> {
  // Шаг 1: Создать задание
  const task = await sdk.reports.paidStorage({ dateFrom, dateTo });
  const taskId = task.data.taskId;

  // Шаг 2: Ожидать выполнения
  let status = 'processing';
  const maxAttempts = 60;
  let attempts = 0;

  while (status !== 'done' && attempts < maxAttempts) {
    await delay(5000);
    const statusResponse = await sdk.reports.getTasksStatu3(taskId);
    status = statusResponse.data.status;

    if (status === 'canceled' || status === 'purged') {
      throw new Error(`Task ${taskId} failed: ${status}`);
    }
    attempts++;
  }

  if (status !== 'done') {
    throw new Error(`Task ${taskId} timeout`);
  }

  // Шаг 3: Скачать отчёт
  return sdk.reports.getTasksDownload3(taskId);
}

/**
 * Разбить период на чанки
 */
function splitDateRange(
  dateFrom: string,
  dateTo: string,
  chunkDays: number
): Array<{ from: string; to: string }> {
  const chunks: Array<{ from: string; to: string }> = [];
  const start = new Date(dateFrom);
  const end = new Date(dateTo);

  let current = new Date(start);

  while (current <= end) {
    const chunkEnd = new Date(current);
    chunkEnd.setDate(chunkEnd.getDate() + chunkDays - 1);

    if (chunkEnd > end) {
      chunkEnd.setTime(end.getTime());
    }

    chunks.push({
      from: current.toISOString().split('T')[0],
      to: chunkEnd.toISOString().split('T')[0],
    });

    current.setDate(current.getDate() + chunkDays);
  }

  return chunks;
}

/**
 * Агрегировать данные
 */
function aggregateStorageData(
  items: PaidStorageItem[],
  periodStart: string,
  periodEnd: string
): StorageFeesResult {
  const byDate: Record<string, number> = {};
  const byProduct: Record<number, { subject: string; amount: number }> = {};

  let totalAmount = 0;

  for (const item of items) {
    const price = item.warehousePrice || 0;
    totalAmount += price;

    // По датам
    byDate[item.date] = (byDate[item.date] || 0) + price;

    // По товарам
    if (!byProduct[item.nmId]) {
      byProduct[item.nmId] = { subject: item.subject, amount: 0 };
    }
    byProduct[item.nmId].amount += price;
  }

  return {
    items,
    totalAmount,
    periodStart,
    periodEnd,
    byDate,
    byProduct,
  };
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
```

---

## Сверка с еженедельным отчётом

### Функция получения storage_fee из Weekly Report

```typescript
interface WeeklyStorageResult {
  totalStorageFee: number;
  byDate: Record<string, number>;
  rawRecords: Array<{ date: string; storage_fee: number }>;
}

/**
 * Получить суммы хранения из еженедельного отчёта
 */
async function getWeeklyStorageFees(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<WeeklyStorageResult> {
  const allItems: any[] = [];
  let rrdid = 0;
  let hasMore = true;

  while (hasMore) {
    const items = await sdk.finances.getSupplierReportdetailbyperiod({
      dateFrom,
      dateTo,
      period: 'weekly',
      limit: 100000,
      rrdid,
    });

    if (items.length === 0) {
      hasMore = false;
    } else {
      allItems.push(...items);
      rrdid = items[items.length - 1].rrd_id || 0;

      // Rate limit: 1 req/min
      if (items.length === 100000) {
        await delay(61000);
      }
    }
  }

  // Фильтруем записи с хранением (storage_fee > 0, nm_id = 0)
  const storageRecords = allItems.filter(
    item => item.storage_fee > 0 && item.nm_id === 0
  );

  const byDate: Record<string, number> = {};
  let totalStorageFee = 0;

  for (const record of storageRecords) {
    const fee = record.storage_fee || 0;
    totalStorageFee += fee;
    byDate[record.rr_dt] = (byDate[record.rr_dt] || 0) + fee;
  }

  return {
    totalStorageFee,
    byDate,
    rawRecords: storageRecords.map(r => ({
      date: r.rr_dt,
      storage_fee: r.storage_fee,
    })),
  };
}
```

### Функция сравнения

```typescript
interface ComparisonResult {
  match: boolean;
  paidStorageTotal: number;
  weeklyReportTotal: number;
  difference: number;
  differencePercent: number;
  byDate: Array<{
    date: string;
    paidStorage: number;
    weeklyReport: number;
    diff: number;
  }>;
}

/**
 * Сравнить данные из двух источников
 */
function compareStorageData(
  paidStorage: StorageFeesResult,
  weeklyReport: WeeklyStorageResult
): ComparisonResult {
  const diff = paidStorage.totalAmount - weeklyReport.totalStorageFee;
  const diffPercent = weeklyReport.totalStorageFee !== 0
    ? (diff / weeklyReport.totalStorageFee) * 100
    : 0;

  // Собираем все даты
  const allDates = new Set([
    ...Object.keys(paidStorage.byDate),
    ...Object.keys(weeklyReport.byDate),
  ]);

  const byDate = Array.from(allDates)
    .sort()
    .map(date => ({
      date,
      paidStorage: paidStorage.byDate[date] || 0,
      weeklyReport: weeklyReport.byDate[date] || 0,
      diff: (paidStorage.byDate[date] || 0) - (weeklyReport.byDate[date] || 0),
    }));

  return {
    match: Math.abs(diffPercent) < 0.01, // < 0.01% считаем совпадением
    paidStorageTotal: paidStorage.totalAmount,
    weeklyReportTotal: weeklyReport.totalStorageFee,
    difference: diff,
    differencePercent: diffPercent,
    byDate,
  };
}
```

---

## Полный пример использования

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

async function main() {
  const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

  // Период W49 (2-8 декабря 2024)
  const dateFrom = '2024-12-02';
  const dateTo = '2024-12-08';

  console.log('Fetching Paid Storage data...');
  const paidStorage = await getStorageFees(sdk, dateFrom, dateTo);
  console.log(`Paid Storage Total: ${paidStorage.totalAmount.toFixed(2)}₽`);

  console.log('Fetching Weekly Report data...');
  const weeklyReport = await getWeeklyStorageFees(sdk, dateFrom, dateTo);
  console.log(`Weekly Report Total: ${weeklyReport.totalStorageFee.toFixed(2)}₽`);

  // Сравнение
  const comparison = compareStorageData(paidStorage, weeklyReport);

  console.log('\n=== COMPARISON ===');
  console.log(`Match: ${comparison.match ? '✅ YES' : '❌ NO'}`);
  console.log(`Difference: ${comparison.difference.toFixed(2)}₽ (${comparison.differencePercent.toFixed(4)}%)`);

  console.log('\nBy Date:');
  for (const day of comparison.byDate) {
    console.log(`  ${day.date}: PS=${day.paidStorage.toFixed(2)} WR=${day.weeklyReport.toFixed(2)} diff=${day.diff.toFixed(2)}`);
  }

  // Топ товаров по хранению
  const topProducts = Object.entries(paidStorage.byProduct)
    .sort((a, b) => b[1].amount - a[1].amount)
    .slice(0, 10);

  console.log('\nTop 10 Products by Storage:');
  for (const [nmId, data] of topProducts) {
    console.log(`  nm_id=${nmId} | ${data.subject} | ${data.amount.toFixed(2)}₽`);
  }
}

main().catch(console.error);
```

---

## Маппинг полей: API → Excel

| Excel Column | Paid Storage API Field | Weekly Report Field |
|--------------|------------------------|---------------------|
| Сумма хранения, руб | `warehousePrice` | `storage_fee` (агрегат) |
| Коэф. логистики и хранения | `logWarehouseCoef` | — |
| Коэффициент склада | `warehouseCoef` | — |
| Скидка программы лояльности | `loyaltyDiscount` | — |
| Дата | `date` | `rr_dt` |
| Дата фиксации тарифа | `tariffFixDate` | — |
| Предмет | `subject` | — |
| Код размера | `chrtId` | — |
| Размер | `size` | — |
| Артикул WB | `nmId` | — |
| Баркод | `barcode` | — |
| Способ расчёта | `calcType` | — |
| **Категория** | **❌ НЕТ В API** | — |

---

## Rate Limits

| Метод | Лимит | Рекомендация |
|-------|-------|--------------|
| `paidStorage()` | 1 req/min | Создавать задания последовательно |
| `getTasksStatu3()` | 1 req/5sec | Поллинг каждые 5 сек |
| `getTasksDownload3()` | 1 req/min | — |
| `getSupplierReportdetailbyperiod()` | 1 req/min | Пагинация через `rrdid` |

---

## Важные замечания

1. **Paid Storage API ограничен 8 днями** — для недельного периода достаточно одного запроса, для месяца нужно ~4 запроса.

2. **Weekly Report агрегирует хранение** — поле `storage_fee` содержит суммы по дням без привязки к товарам (`nm_id = 0`).

3. **Разница в копейках нормальна** — округление на стороне WB даёт расхождение ~0.01%.

4. **Категория отсутствует в API** — только `subject` (Предмет). Если нужна категория, потребуется маппинг через справочник категорий.

5. **Время обработки** — задание Paid Storage обычно выполняется за 5-30 секунд.

---

## Источники данных о хранении

Wildberries предоставляет несколько API для работы с данными о хранении. Выбор зависит от задачи:

### API тарифов на остаток (common-api)

```
GET https://common-api.wildberries.ru/api/v1/tariffs/box
```

**Возвращает:** `boxStorageBase`, `boxStorageLiter`, `boxStorageCoefExpr`

**Назначение:** Расчёт текущих затрат на хранение существующих товаров на складах WB.

**Пример использования:**
```typescript
const tariffs = await sdk.tariffs.getBoxTariffs();
// Используйте для расчёта: стоимость = объём × boxStorageLiter × коэффициент
```

### API тарифов на поставку (supplies-api)

```
GET https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients
```

**Возвращает:** `storageCoef`, `storageBaseLiter`, `storageAdditionalLiter`

**Назначение:** Прогнозирование затрат на хранение **НОВЫХ** поставок.

**Особенность:** Данные доступны на 14 дней вперёд — можно планировать поставки с учётом будущих тарифов.

**Пример использования:**
```typescript
const coefficients = await sdk.supplies.getAcceptanceCoefficients({
  warehouseId: 123456
});
// Используйте storageCoef для расчёта будущих затрат на хранение новой поставки
```

### Какой API выбрать?

| Сценарий | API | Эндпоинт |
|----------|-----|----------|
| Расчёт текущих затрат на хранение | common-api | `/api/v1/tariffs/box` |
| Планирование новой поставки | supplies-api | `/api/v1/acceptance/coefficients` |
| Сверка с финансами (детализация) | statistics-api | `/api/v1/paid_storage` |
| Сверка с финансами (агрегат) | statistics-api | `/api/v1/supplier/reportDetailByPeriod` |

### Связь между источниками

```
┌─────────────────────────────────────────────────────────────────┐
│                    ХРАНЕНИЕ: ИСТОЧНИКИ ДАННЫХ                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ПЛАНИРОВАНИЕ          ТЕКУЩИЕ ТАРИФЫ        ФАКТИЧЕСКИЕ СУММЫ  │
│  ─────────────         ──────────────        ─────────────────  │
│  supplies-api    →     common-api      →     statistics-api     │
│  (на 14 дней)          (актуальные)          (за период)        │
│                                                                  │
│  storageCoef           boxStorageLiter       warehousePrice     │
│  storageBaseLiter      boxStorageBase        storage_fee        │
│                        boxStorageCoefExpr                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## См. также

- [Обзор тарифов Wildberries](./tariffs-overview.md) — полный обзор всех тарифных API
- [Wildberries API Documentation](https://dev.wildberries.ru/) — официальная документация

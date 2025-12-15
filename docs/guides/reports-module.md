# Reports Module Guide

Полное руководство по использованию модуля отчётов (`sdk.reports`) для получения данных о складах, поставках, остатках и продажах.

## Overview

Модуль Reports предоставляет доступ к операционным отчётам:
- **Остатки на складах** (Warehouse Remains)
- **Платное хранение** (Paid Storage)
- **Отчёт о приёмке** (Acceptance Report)
- **Поставки** (Incomes)
- **Остатки товаров** (Stocks)
- **Продажи** (Sales)
- **Заказы** (Orders)

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить остатки на складах
const stocks = await sdk.reports.getStocks('2024-12-01');

// Получить продажи за период
const sales = await sdk.reports.getSales('2024-12-01', 0);
```

---

## 1. Остатки на складах (Warehouse Remains)

Асинхронный отчёт об остатках товаров на всех складах WB.

### Создание задания

```typescript
// Шаг 1: Создать задание на формирование отчёта
const task = await sdk.reports.warehouseRemains({
  groupByBrand: false,
  groupBySubject: false,
  groupBySa: false,
  groupByNm: true  // Группировка по nm_id
});

const taskId = task.data.taskId;
console.log(`Task created: ${taskId}`);
```

### Проверка статуса и скачивание

```typescript
async function getWarehouseRemains(sdk: WildberriesSDK) {
  // Создать задание
  const task = await sdk.reports.warehouseRemains({ groupByNm: true });
  const taskId = task.data.taskId;

  // Ожидать выполнения
  let status = 'processing';
  let attempts = 0;
  const maxAttempts = 60;

  while (status !== 'done' && attempts < maxAttempts) {
    await delay(5000); // 5 сек между проверками
    const statusResp = await sdk.reports.getWarehouseRemainsReportStatus(taskId);
    status = statusResp.data.status;

    if (status === 'canceled' || status === 'purged') {
      throw new Error(`Task failed: ${status}`);
    }
    attempts++;
  }

  if (status !== 'done') {
    throw new Error('Task timeout');
  }

  // Скачать отчёт
  const report = await sdk.reports.downloadWarehouseRemainsReport(taskId);
  return report;
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
```

### Структура ответа

```typescript
interface WarehouseRemainsItem {
  lastChangeDate: string;     // Дата последнего изменения
  warehouseName: string;      // Название склада
  supplierArticle: string;    // Артикул продавца
  nmId: number;               // Артикул WB
  barcode: string;            // Баркод
  category: string;           // Категория
  subject: string;            // Предмет
  brand: string;              // Бренд
  techSize: string;           // Размер
  Price: number;              // Цена
  Discount: number;           // Скидка
  isSupply: boolean;          // В поставке
  isRealization: boolean;     // В реализации
  SCCode: string;             // Код склада
  quantityWarehousesFull: number; // Общее количество на складах
  quantityNotInOrders: number;    // Не в заказах
  inWayToClient: number;      // В пути к клиенту
  inWayFromClient: number;    // В пути от клиента
  daysOnSite: number;         // Дней на сайте
}
```

### Пример: Анализ остатков по складам

```typescript
async function analyzeWarehouseStock(sdk: WildberriesSDK) {
  const report = await getWarehouseRemains(sdk);

  // Группировка по складам
  const byWarehouse = new Map<string, { count: number; value: number }>();

  for (const item of report) {
    const wh = item.warehouseName;
    const current = byWarehouse.get(wh) || { count: 0, value: 0 };

    current.count += item.quantityWarehousesFull || 0;
    current.value += (item.quantityWarehousesFull || 0) * (item.Price || 0);

    byWarehouse.set(wh, current);
  }

  console.log('=== Остатки по складам ===');
  for (const [warehouse, data] of byWarehouse) {
    console.log(`${warehouse}: ${data.count} шт, ${data.value.toFixed(2)} ₽`);
  }

  // Товары с низким остатком
  const lowStock = report.filter(item =>
    item.quantityNotInOrders > 0 &&
    item.quantityNotInOrders < 10
  );

  console.log(`\nТоваров с низким остатком (<10): ${lowStock.length}`);
}
```

---

## 2. Платное хранение (Paid Storage)

Детализированный отчёт о расходах на хранение товаров.

### Асинхронный процесс

```typescript
async function getPaidStorageReport(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
) {
  // Шаг 1: Создать задание (max 8 дней за запрос!)
  const task = await sdk.reports.paidStorage({ dateFrom, dateTo });
  const taskId = task.data.taskId;

  // Шаг 2: Проверять статус
  let status = 'processing';
  while (status !== 'done') {
    await delay(5000);
    const statusResp = await sdk.reports.getTasksStatu3(taskId);
    status = statusResp.data.status;

    if (status === 'canceled' || status === 'purged') {
      throw new Error(`Task failed: ${status}`);
    }
  }

  // Шаг 3: Скачать
  return await sdk.reports.getTasksDownload3(taskId);
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
```

### Структура данных

```typescript
interface PaidStorageItem {
  date: string;              // Дата расчёта
  warehouse: string;         // Склад
  warehouseCoef: number;     // Коэффициент склада
  nmId: number;              // Артикул WB
  barcode: string;           // Баркод
  subject: string;           // Предмет
  brand: string;             // Бренд
  vendorCode: string;        // Артикул продавца
  chrtId: number;            // Код размера
  size: string;              // Размер
  volume: number;            // Объём (л)
  calcType: string;          // Способ расчёта
  warehousePrice: number;    // Сумма хранения ₽
  barcodesCount: number;     // Количество единиц
  loyaltyDiscount: number;   // Скидка лояльности ₽
}
```

### Пример: Топ товаров по хранению

```typescript
async function getTopStorageProducts(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
) {
  const data = await getPaidStorageReport(sdk, dateFrom, dateTo);

  // Агрегация по товарам
  const byProduct = new Map<number, { subject: string; amount: number }>();

  for (const item of data) {
    const nmId = item.nmId;
    const current = byProduct.get(nmId) || { subject: item.subject, amount: 0 };
    current.amount += item.warehousePrice || 0;
    byProduct.set(nmId, current);
  }

  // Сортировка по убыванию
  const sorted = Array.from(byProduct.entries())
    .sort((a, b) => b[1].amount - a[1].amount)
    .slice(0, 20);

  console.log('=== Топ-20 по расходам на хранение ===');
  sorted.forEach(([nmId, data], i) => {
    console.log(`${i + 1}. nm_id=${nmId} | ${data.subject} | ${data.amount.toFixed(2)} ₽`);
  });

  // Итого
  const total = data.reduce((sum, item) => sum + (item.warehousePrice || 0), 0);
  console.log(`\nИТОГО за период: ${total.toFixed(2)} ₽`);
}
```

### Ограничения

| Параметр | Значение |
|----------|----------|
| Max период | **8 дней** |
| Rate limit создания | 1 req/min |
| Rate limit статуса | 1 req/5sec |
| Время обработки | 5-60 сек |

---

## 3. Отчёт о приёмке (Acceptance Report)

Данные о приёмке товаров на склады WB.

```typescript
async function getAcceptanceReport(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
) {
  // Создать задание
  const task = await sdk.reports.acceptanceReport({ dateFrom, dateTo });
  const taskId = task.data.taskId;

  // Ожидать выполнения
  let status = 'processing';
  while (status !== 'done') {
    await delay(5000);
    const statusResp = await sdk.reports.getAcceptanceReportStatus(taskId);
    status = statusResp.data.status;
  }

  // Скачать
  return await sdk.reports.downloadAcceptanceReport(taskId);
}
```

---

## 4. Поставки (Incomes)

Синхронный отчёт о поступлениях товаров.

```typescript
// Получить поставки за период
const incomes = await sdk.reports.getIncomes('2024-12-01');

console.log(`Поставок: ${incomes.length}`);

for (const income of incomes) {
  console.log(`Поставка #${income.incomeId}:`);
  console.log(`  Дата: ${income.date}`);
  console.log(`  Склад: ${income.warehouseName}`);
  console.log(`  Товар: ${income.nmId} - ${income.supplierArticle}`);
  console.log(`  Количество: ${income.quantity}`);
}
```

### Структура Incomes

```typescript
interface IncomeItem {
  incomeId: number;          // ID поставки
  number: string;            // Номер УПД
  date: string;              // Дата поставки
  lastChangeDate: string;    // Дата обновления
  supplierArticle: string;   // Артикул продавца
  techSize: string;          // Размер
  barcode: string;           // Баркод
  quantity: number;          // Количество
  totalPrice: number;        // Сумма
  dateClose: string;         // Дата закрытия
  warehouseName: string;     // Склад
  nmId: number;              // Артикул WB
  status: string;            // Статус
}
```

---

## 5. Остатки товаров (Stocks)

Актуальные остатки на складах.

```typescript
// Получить остатки на дату
const stocks = await sdk.reports.getStocks('2024-12-01');

// Анализ
const totalQuantity = stocks.reduce((sum, s) => sum + (s.quantity || 0), 0);
const totalValue = stocks.reduce((sum, s) =>
  sum + ((s.quantity || 0) * (s.Price || 0)), 0
);

console.log(`Всего товаров: ${stocks.length}`);
console.log(`Общее количество: ${totalQuantity}`);
console.log(`Общая стоимость: ${totalValue.toFixed(2)} ₽`);
```

### Структура Stocks

```typescript
interface StockItem {
  lastChangeDate: string;     // Дата изменения
  warehouseName: string;      // Склад
  supplierArticle: string;    // Артикул продавца
  nmId: number;               // Артикул WB
  barcode: string;            // Баркод
  quantity: number;           // Количество
  inWayToClient: number;      // В пути к клиенту
  inWayFromClient: number;    // В пути от клиента
  quantityFull: number;       // Полное количество
  category: string;           // Категория
  subject: string;            // Предмет
  brand: string;              // Бренд
  techSize: string;           // Размер
  Price: number;              // Цена
  Discount: number;           // Скидка
  isSupply: boolean;          // В поставке
  isRealization: boolean;     // В реализации
  SCCode: string;             // Код ШК
}
```

---

## 6. Продажи (Sales)

Отчёт о продажах.

```typescript
// Получить продажи
// flag: 0 - без возвратов, 1 - с возвратами
const sales = await sdk.reports.getSales('2024-12-01', 1);

let totalRevenue = 0;
let salesCount = 0;
let returnsCount = 0;

for (const sale of sales) {
  if (sale.quantity > 0) {
    salesCount++;
    totalRevenue += sale.forPay || sale.finishedPrice || 0;
  } else {
    returnsCount++;
  }
}

console.log(`Продаж: ${salesCount}`);
console.log(`Возвратов: ${returnsCount}`);
console.log(`Выручка: ${totalRevenue.toFixed(2)} ₽`);
```

### Структура Sales

```typescript
interface SaleItem {
  date: string;               // Дата продажи
  lastChangeDate: string;     // Дата обновления
  warehouseName: string;      // Склад
  countryName: string;        // Страна
  oblastOkrugName: string;    // Округ
  regionName: string;         // Регион
  supplierArticle: string;    // Артикул продавца
  nmId: number;               // Артикул WB
  barcode: string;            // Баркод
  category: string;           // Категория
  subject: string;            // Предмет
  brand: string;              // Бренд
  techSize: string;           // Размер
  incomeID: number;           // ID поставки
  isSupply: boolean;          // В поставке
  isRealization: boolean;     // В реализации
  totalPrice: number;         // Цена без скидки
  discountPercent: number;    // Скидка %
  spp: number;                // Скидка постоянного покупателя
  paymentSaleAmount: number;  // Оплачено
  forPay: number;             // К перечислению
  finishedPrice: number;      // Цена со скидкой
  priceWithDisc: number;      // Цена со скидкой WB
  saleID: string;             // ID продажи
  orderType: string;          // Тип заказа
  sticker: string;            // Стикер
  gNumber: string;            // Номер заказа
  srid: string;               // ID позиции заказа
  quantity: number;           // Количество (- для возврата)
}
```

---

## 7. Заказы (Orders)

Отчёт о заказах покупателей.

```typescript
// Получить заказы
// flag: 0 - без отмен, 1 - с отменами
const orders = await sdk.reports.getOrders('2024-12-01', 0);

console.log(`Всего заказов: ${orders.length}`);

// Группировка по статусам
const byStatus = new Map<string, number>();
for (const order of orders) {
  const status = order.orderType || 'unknown';
  byStatus.set(status, (byStatus.get(status) || 0) + 1);
}

console.log('По статусам:');
for (const [status, count] of byStatus) {
  console.log(`  ${status}: ${count}`);
}
```

---

## Сводная таблица методов

| Метод | Тип | Period Limit | Rate Limit |
|-------|-----|--------------|------------|
| `warehouseRemains()` | Async | - | 1/min |
| `paidStorage()` | Async | 8 дней | 1/min |
| `acceptanceReport()` | Async | - | 1/min |
| `getIncomes()` | Sync | 365 дней | - |
| `getStocks()` | Sync | - | - |
| `getSales()` | Sync | 365 дней | - |
| `getOrders()` | Sync | 365 дней | - |

---

## Best Practices

### 1. Обработка асинхронных отчётов

```typescript
async function waitForReport<T>(
  sdk: WildberriesSDK,
  taskId: string,
  statusFn: (id: string) => Promise<{ data: { status: string } }>,
  downloadFn: (id: string) => Promise<T>,
  maxWaitMs: number = 300000 // 5 минут
): Promise<T> {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    await delay(5000);
    const { data } = await statusFn(taskId);

    if (data.status === 'done') {
      return await downloadFn(taskId);
    }

    if (data.status === 'canceled' || data.status === 'purged') {
      throw new Error(`Report failed: ${data.status}`);
    }
  }

  throw new Error('Report timeout');
}
```

### 2. Разбиение длинных периодов

```typescript
function* dateChunks(
  dateFrom: string,
  dateTo: string,
  chunkDays: number
): Generator<{ from: string; to: string }> {
  const start = new Date(dateFrom);
  const end = new Date(dateTo);

  let current = new Date(start);

  while (current <= end) {
    const chunkEnd = new Date(current);
    chunkEnd.setDate(chunkEnd.getDate() + chunkDays - 1);

    yield {
      from: current.toISOString().split('T')[0],
      to: (chunkEnd > end ? end : chunkEnd).toISOString().split('T')[0]
    };

    current.setDate(current.getDate() + chunkDays);
  }
}

// Использование для Paid Storage (max 8 дней)
for (const chunk of dateChunks('2024-12-01', '2024-12-31', 7)) {
  const data = await getPaidStorageReport(sdk, chunk.from, chunk.to);
  // ...обработка
  await delay(61000); // Rate limit
}
```

---

## Связанные материалы

- [Realization Report](./realization-report.md) - Детализированный отчёт
- [Storage Fees Integration](./storage-fees-integration.md) - Платное хранение
- [Stock Management](./stock-management.md) - Управление остатками
- [API Reference: ReportsModule](/api/classes/ReportsModule)

---

[← Back to Guides](./index.md)

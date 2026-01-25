# Модуль отчётов

Полное руководство по использованию модуля отчётов (`sdk.reports`) для получения данных о складах, поставках, остатках и продажах.

## Обзор

Модуль Reports предоставляет доступ к операционным отчётам:
- **Остатки на складах** (Warehouse Remains)
- **Платное хранение** (Paid Storage)
- **Отчёт о приёмке** (Acceptance Report)
- **Поставки** (Incomes)
- **Остатки товаров** (Stocks)
- **Продажи** (Sales)
- **Заказы** (Orders)

---

## Быстрый старт

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
  const task = await sdk.reports.warehouseRemains({ groupByNm: true });
  const taskId = task.data.taskId;

  let status = 'processing';
  while (status !== 'done') {
    await delay(5000);
    const statusResp = await sdk.reports.getWarehouseRemainsReportStatus(taskId);
    status = statusResp.data.status;

    if (status === 'canceled' || status === 'purged') {
      throw new Error(`Task failed: ${status}`);
    }
  }

  return await sdk.reports.downloadWarehouseRemainsReport(taskId);
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
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
```

### Ограничения

| Параметр | Значение |
|----------|----------|
| Max период | **8 дней** |
| Rate limit создания | 1 req/min |
| Rate limit статуса | 1 req/5sec |
| Время обработки | 5-60 сек |

---

## 3. Продажи (Sales)

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

## Связанные материалы

- [Отчёт о реализации](./realization-report) - Детализированный отчёт
- [Платное хранение](./storage-fees-integration) - Интеграция сборов
- [Управление остатками](./stock-management) - Контроль запасов
- [API Reference: ReportsModule](/api/classes/ReportsModule)

---

[← Назад к руководствам](./index)

# Stock Management Guide

Руководство по управлению остатками товаров через Wildberries SDK.

## Overview

SDK предоставляет методы для:
- Управления остатками на складах продавца (FBS)
- Получения отчётов об остатках на складах WB (FBW)
- Управления складами продавца
- Синхронизации остатков с внешними системами

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить список складов продавца
const warehouses = await sdk.products.warehouses();

// Получить остатки на складе продавца
const stocks = await sdk.products.getStocks(warehouseId, {
  skus: ['sku1', 'sku2']
});

// Обновить остатки
await sdk.products.updateStock(warehouseId, {
  stocks: [{ sku: 'sku1', amount: 100 }]
});
```

---

## Архитектура складов WB

### Типы складов

| Тип | Описание | Управление остатками |
|-----|----------|---------------------|
| **FBW** (Склад WB) | Товары хранятся на складах WB | WB управляет автоматически |
| **FBS** (Маркетплейс) | Товары хранятся у продавца | Продавец управляет через API |
| **DBS** (Витрина) | Продавец хранит и доставляет | Продавец управляет через API |

### Связь модулей SDK

```
┌─────────────────────────────────────────────────────────┐
│                    Остатки товаров                       │
├─────────────────────┬───────────────────────────────────┤
│   FBS (Продавец)    │         FBW (Склад WB)            │
├─────────────────────┼───────────────────────────────────┤
│ sdk.products.*      │ sdk.reports.*                     │
│ - warehouses()      │ - warehouseRemains() (async)      │
│ - getStocks()       │ - getSupplierStocks() (sync)      │
│ - updateStock()     │                                   │
│ - deleteStock()     │                                   │
└─────────────────────┴───────────────────────────────────┘
```

---

## Управление складами продавца (FBS)

### Список складов

```typescript
/**
 * Получить все склады продавца
 */
async function getSellerWarehouses(sdk: WildberriesSDK) {
  const warehouses = await sdk.products.warehouses();

  for (const wh of warehouses) {
    console.log(`ID: ${wh.id}`);
    console.log(`  Название: ${wh.name}`);
    console.log(`  Офис: ${wh.officeId}`);
    console.log(`  Cargo Type: ${wh.cargoType}`);
    console.log(`  Delivery Type: ${wh.deliveryType}`);
  }

  return warehouses;
}
```

### Создание склада

```typescript
/**
 * Создать новый склад продавца
 */
async function createWarehouse(
  sdk: WildberriesSDK,
  name: string,
  officeId: number
) {
  const result = await sdk.products.createWarehouse({
    name,
    officeId
  });

  console.log(`Создан склад с ID: ${result.id}`);
  return result.id;
}
```

### Обновление и удаление склада

```typescript
// Обновить склад
await sdk.products.updateWarehouse(warehouseId, {
  name: 'Новое название',
  officeId: 12345
});

// Удалить склад
await sdk.products.deleteWarehouse(warehouseId);
```

---

## Управление остатками на складе продавца

### Получить остатки по SKU

```typescript
/**
 * Получить текущие остатки по списку SKU
 */
async function getStocksBySku(
  sdk: WildberriesSDK,
  warehouseId: number,
  skus: string[]
) {
  const result = await sdk.products.getStocks(warehouseId, { skus });

  const stockMap = new Map<string, number>();

  for (const item of result.stocks || []) {
    if (item.sku) {
      stockMap.set(item.sku, item.amount || 0);
    }
  }

  return stockMap;
}

// Использование
const stocks = await getStocksBySku(sdk, warehouseId, ['sku1', 'sku2', 'sku3']);
console.log('SKU1:', stocks.get('sku1')); // 50
```

### Обновить остатки

```typescript
interface StockUpdate {
  sku: string;
  amount: number;
}

/**
 * Массовое обновление остатков
 */
async function updateStocks(
  sdk: WildberriesSDK,
  warehouseId: number,
  updates: StockUpdate[]
) {
  // WB принимает до 1000 SKU за запрос
  const BATCH_SIZE = 1000;

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);

    await sdk.products.updateStock(warehouseId, {
      stocks: batch
    });

    console.log(`Обновлено ${Math.min(i + BATCH_SIZE, updates.length)} / ${updates.length}`);

    // Пауза между батчами для rate limit
    if (i + BATCH_SIZE < updates.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

// Использование
await updateStocks(sdk, warehouseId, [
  { sku: 'sku1', amount: 100 },
  { sku: 'sku2', amount: 50 },
  { sku: 'sku3', amount: 0 }  // Обнулить остаток
]);
```

### Удалить остатки (обнулить)

```typescript
/**
 * Удалить остатки по списку SKU
 */
async function deleteStocks(
  sdk: WildberriesSDK,
  warehouseId: number,
  skus: string[]
) {
  await sdk.products.deleteStock(warehouseId, { skus });
  console.log(`Удалены остатки для ${skus.length} SKU`);
}
```

---

## Отчёты об остатках на складах WB (FBW)

### Синхронный метод: getSupplierStocks

Быстрый метод для получения остатков. Данные обновляются каждые 30 минут.

```typescript
/**
 * Получить остатки на складах WB
 */
async function getWBStocks(
  sdk: WildberriesSDK,
  dateFrom: string
) {
  const allStocks: StocksItem[] = [];
  let currentDate = dateFrom;
  let hasMore = true;

  while (hasMore) {
    const stocks = await sdk.reports.getSupplierStocks({
      dateFrom: currentDate
    });

    if (stocks.length === 0) {
      hasMore = false;
    } else {
      allStocks.push(...stocks);

      // Используем lastChangeDate для пагинации
      const lastItem = stocks[stocks.length - 1];
      currentDate = lastItem.lastChangeDate || currentDate;

      console.log(`Загружено: ${allStocks.length} записей`);

      // Rate limit: 1 запрос в минуту
      if (stocks.length >= 60000) {
        console.log('Ожидание 60 сек...');
        await new Promise(r => setTimeout(r, 61000));
      }
    }
  }

  return allStocks;
}
```

### Структура StocksItem

```typescript
interface StocksItem {
  lastChangeDate?: string;    // Дата последнего изменения
  warehouseName?: string;     // Название склада WB
  supplierArticle?: string;   // Артикул продавца
  nmId?: number;              // Артикул WB
  barcode?: string;           // Баркод
  quantity?: number;          // Количество
  inWayToClient?: number;     // В пути к клиенту
  inWayFromClient?: number;   // В пути от клиента
  quantityFull?: number;      // Полное количество
  category?: string;          // Категория
  subject?: string;           // Предмет
  brand?: string;             // Бренд
  techSize?: string;          // Размер
  Price?: number;             // Цена
  Discount?: number;          // Скидка
  isSupply?: boolean;         // Доступен для поставки
  isRealization?: boolean;    // Доступен для реализации
  SCCode?: string;            // Код SC
}
```

### Асинхронный метод: warehouseRemains

Детализированный отчёт об остатках с возможностью группировки.

```typescript
/**
 * Получить детальный отчёт об остатках
 */
async function getDetailedWarehouseRemains(
  sdk: WildberriesSDK
) {
  // 1. Создать задание на генерацию отчёта
  const task = await sdk.reports.warehouseRemains({
    locale: 'ru',
    groupByBrand: true,
    groupBySubject: true,
    groupByNm: true,
    groupByBarcode: true,
    groupBySize: true
  });

  const taskId = task.data?.taskId;
  if (!taskId) throw new Error('Не удалось создать задание');

  console.log(`Создано задание: ${taskId}`);

  // 2. Ожидать готовности
  let isReady = false;
  while (!isReady) {
    await new Promise(r => setTimeout(r, 5000)); // 5 сек

    const status = await sdk.reports.getTasksStatu(taskId);

    if (status.data?.status === 'done') {
      isReady = true;
    } else if (status.data?.status === 'failed') {
      throw new Error('Генерация отчёта не удалась');
    }

    console.log(`Статус: ${status.data?.status}`);
  }

  // 3. Скачать отчёт
  const report = await sdk.reports.downloadWarehouseRemains(taskId);

  return report;
}
```

---

## Аналитика остатков

### Сводка по складам

```typescript
interface WarehouseStockSummary {
  warehouseName: string;
  totalItems: number;
  totalQuantity: number;
  inWayToClient: number;
  inWayFromClient: number;
  uniqueProducts: number;
}

async function getStockSummaryByWarehouse(
  sdk: WildberriesSDK,
  dateFrom: string
): Promise<WarehouseStockSummary[]> {
  const stocks = await getWBStocks(sdk, dateFrom);

  const warehouseMap = new Map<string, WarehouseStockSummary>();

  for (const item of stocks) {
    const whName = item.warehouseName || 'Unknown';

    let summary = warehouseMap.get(whName);
    if (!summary) {
      summary = {
        warehouseName: whName,
        totalItems: 0,
        totalQuantity: 0,
        inWayToClient: 0,
        inWayFromClient: 0,
        uniqueProducts: 0
      };
      warehouseMap.set(whName, summary);
    }

    summary.totalItems++;
    summary.totalQuantity += item.quantity || 0;
    summary.inWayToClient += item.inWayToClient || 0;
    summary.inWayFromClient += item.inWayFromClient || 0;
    summary.uniqueProducts++;
  }

  return Array.from(warehouseMap.values())
    .sort((a, b) => b.totalQuantity - a.totalQuantity);
}

// Использование
const summary = await getStockSummaryByWarehouse(sdk, '2024-01-01');

console.log('=== Остатки по складам ===');
summary.forEach(s => {
  console.log(`${s.warehouseName}:`);
  console.log(`  Всего единиц: ${s.totalQuantity}`);
  console.log(`  В пути к клиенту: ${s.inWayToClient}`);
  console.log(`  В пути от клиента: ${s.inWayFromClient}`);
  console.log(`  Уникальных товаров: ${s.uniqueProducts}`);
});
```

### Товары с низким остатком

```typescript
interface LowStockItem {
  nmId: number;
  supplierArticle: string;
  barcode: string;
  quantity: number;
  brand: string;
  subject: string;
}

async function getLowStockItems(
  sdk: WildberriesSDK,
  dateFrom: string,
  threshold: number = 10
): Promise<LowStockItem[]> {
  const stocks = await getWBStocks(sdk, dateFrom);

  return stocks
    .filter(item => (item.quantity || 0) <= threshold && (item.quantity || 0) > 0)
    .map(item => ({
      nmId: item.nmId || 0,
      supplierArticle: item.supplierArticle || '',
      barcode: item.barcode || '',
      quantity: item.quantity || 0,
      brand: item.brand || '',
      subject: item.subject || ''
    }))
    .sort((a, b) => a.quantity - b.quantity);
}

// Использование
const lowStock = await getLowStockItems(sdk, '2024-01-01', 5);

console.log('=== Товары с низким остатком (≤5 шт) ===');
lowStock.forEach(item => {
  console.log(`nm_id=${item.nmId} | ${item.supplierArticle} | ${item.quantity} шт`);
});
```

### Товары без остатка (Out of Stock)

```typescript
async function getOutOfStockItems(
  sdk: WildberriesSDK,
  dateFrom: string
) {
  const stocks = await getWBStocks(sdk, dateFrom);

  return stocks
    .filter(item => (item.quantity || 0) === 0)
    .map(item => ({
      nmId: item.nmId || 0,
      supplierArticle: item.supplierArticle || '',
      barcode: item.barcode || '',
      brand: item.brand || '',
      subject: item.subject || '',
      warehouseName: item.warehouseName || ''
    }));
}
```

---

## Синхронизация с внешней системой

### Полная синхронизация остатков

```typescript
interface ExternalStockItem {
  sku: string;
  quantity: number;
}

/**
 * Синхронизация остатков с внешней системой (1С, МойСклад и т.д.)
 */
async function syncStocksFromExternalSystem(
  sdk: WildberriesSDK,
  warehouseId: number,
  externalStocks: ExternalStockItem[]
) {
  // 1. Получить текущие остатки на WB
  const currentSkus = externalStocks.map(s => s.sku);
  const wbStocks = await sdk.products.getStocks(warehouseId, {
    skus: currentSkus
  });

  const wbStockMap = new Map<string, number>();
  for (const item of wbStocks.stocks || []) {
    if (item.sku) {
      wbStockMap.set(item.sku, item.amount || 0);
    }
  }

  // 2. Найти различия
  const updates: { sku: string; amount: number }[] = [];

  for (const external of externalStocks) {
    const wbQuantity = wbStockMap.get(external.sku) || 0;

    if (wbQuantity !== external.quantity) {
      updates.push({
        sku: external.sku,
        amount: external.quantity
      });
    }
  }

  if (updates.length === 0) {
    console.log('Остатки синхронизированы, изменений нет');
    return { updated: 0, skipped: externalStocks.length };
  }

  // 3. Обновить остатки на WB
  console.log(`Обновление ${updates.length} позиций...`);

  await sdk.products.updateStock(warehouseId, { stocks: updates });

  return {
    updated: updates.length,
    skipped: externalStocks.length - updates.length
  };
}

// Использование
const externalData = [
  { sku: 'SKU001', quantity: 100 },
  { sku: 'SKU002', quantity: 50 },
  { sku: 'SKU003', quantity: 0 }
];

const result = await syncStocksFromExternalSystem(sdk, warehouseId, externalData);
console.log(`Обновлено: ${result.updated}, Пропущено: ${result.skipped}`);
```

### Webhook-based синхронизация

```typescript
/**
 * Обработчик изменения остатка из внешней системы
 */
async function handleStockChangeWebhook(
  sdk: WildberriesSDK,
  warehouseId: number,
  event: {
    sku: string;
    newQuantity: number;
    timestamp: string;
  }
) {
  try {
    await sdk.products.updateStock(warehouseId, {
      stocks: [{
        sku: event.sku,
        amount: event.newQuantity
      }]
    });

    console.log(`[${event.timestamp}] ${event.sku}: обновлено до ${event.newQuantity}`);
    return { success: true };
  } catch (error) {
    console.error(`Ошибка обновления ${event.sku}:`, error);
    return { success: false, error };
  }
}
```

---

## Rate Limits

| Метод | Лимит | Интервал |
|-------|-------|----------|
| `warehouses()` | 60 запросов | 1 минута |
| `getStocks()` | 600 запросов | 1 минута |
| `updateStock()` | 600 запросов | 1 минута |
| `deleteStock()` | 600 запросов | 1 минута |
| `getSupplierStocks()` | 1 запрос | 1 минута |
| `warehouseRemains()` | 1 запрос | 1 минута |

---

## Best Practices

### 1. Батчинг обновлений

```typescript
// ❌ Плохо: много мелких запросов
for (const item of items) {
  await sdk.products.updateStock(warehouseId, {
    stocks: [item]
  });
}

// ✅ Хорошо: батч до 1000 элементов
await sdk.products.updateStock(warehouseId, {
  stocks: items.slice(0, 1000)
});
```

### 2. Кэширование данных

```typescript
class StockCache {
  private cache = new Map<string, { data: any; expires: number }>();
  private TTL = 30 * 60 * 1000; // 30 минут (как у WB)

  async getStocks(sdk: WildberriesSDK, dateFrom: string) {
    const key = `stocks_${dateFrom}`;
    const cached = this.cache.get(key);

    if (cached && Date.now() < cached.expires) {
      return cached.data;
    }

    const data = await sdk.reports.getSupplierStocks({ dateFrom });
    this.cache.set(key, { data, expires: Date.now() + this.TTL });

    return data;
  }
}
```

### 3. Обработка ошибок

```typescript
async function safeUpdateStock(
  sdk: WildberriesSDK,
  warehouseId: number,
  stocks: { sku: string; amount: number }[]
) {
  try {
    await sdk.products.updateStock(warehouseId, { stocks });
    return { success: true };
  } catch (error: any) {
    if (error.statusCode === 429) {
      // Rate limit — повторить позже
      await new Promise(r => setTimeout(r, 60000));
      return safeUpdateStock(sdk, warehouseId, stocks);
    }

    if (error.statusCode === 400) {
      // Невалидные данные — логировать и пропустить
      console.error('Невалидные данные:', stocks);
      return { success: false, error: 'validation' };
    }

    throw error;
  }
}
```

---

## Связанные материалы

- [Reports Module Guide](./reports-module.md) - Отчёты (warehouseRemains, paidStorage)
- [Storage Fees Integration](./storage-fees-integration.md) - Платное хранение
- [API Reference: ProductsModule](/api/classes/ProductsModule)
- [API Reference: ReportsModule](/api/classes/ReportsModule)

---

[← Back to Guides](./index.md)

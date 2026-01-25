# Управление остатками

Руководство по управлению остатками товаров через Wildberries SDK.

## Обзор

SDK предоставляет методы для:
- Управления остатками на складах продавца (FBS)
- Получения отчётов об остатках на складах WB (FBW)
- Управления складами продавца
- Синхронизации остатков с внешними системами

---

## Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить список складов продавца
const warehouses = await sdk.products.warehouses();

// Получить остатки на складе продавца
const stocks = await sdk.products.createStock(warehouseId, {
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
│ - createStock()     │ - getSupplierStocks() (sync)      │
│ - updateStock()     │                                   │
│ - deleteStock()     │                                   │
└─────────────────────┴───────────────────────────────────┘
```

---

## Управление складами продавца (FBS)

### Список складов

```typescript
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

### Массовое обновление остатков

```typescript
interface StockUpdate {
  sku: string;
  amount: number;
}

async function updateStocks(
  sdk: WildberriesSDK,
  warehouseId: number,
  updates: StockUpdate[]
) {
  const BATCH_SIZE = 1000;

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);

    await sdk.products.updateStock(warehouseId, { stocks: batch });
    console.log(`Обновлено ${Math.min(i + BATCH_SIZE, updates.length)} / ${updates.length}`);

    if (i + BATCH_SIZE < updates.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}
```

---

## Rate Limits

| Метод | Лимит | Интервал |
|-------|-------|----------|
| `warehouses()` | 60 запросов | 1 минута |
| `createStock()` | 600 запросов | 1 минута |
| `updateStock()` | 600 запросов | 1 минута |
| `deleteStock()` | 600 запросов | 1 минута |
| `getSupplierStocks()` | 1 запрос | 1 минута |
| `warehouseRemains()` | 1 запрос | 1 минута |

---

## Best Practices

### 1. Батчинг обновлений

```typescript
// Плохо: много мелких запросов
for (const item of items) {
  await sdk.products.updateStock(warehouseId, { stocks: [item] });
}

// Хорошо: батч до 1000 элементов
await sdk.products.updateStock(warehouseId, { stocks: items.slice(0, 1000) });
```

### 2. Обработка ошибок

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
      await new Promise(r => setTimeout(r, 60000));
      return safeUpdateStock(sdk, warehouseId, stocks);
    }
    throw error;
  }
}
```

---

## Связанные материалы

- [Модуль отчётов](./reports-module) - Отчёты о складах
- [Платное хранение](./storage-fees-integration) - Сборы за хранение
- [API Reference: ProductsModule](/api/classes/ProductsModule)
- [API Reference: ReportsModule](/api/classes/ReportsModule)

---

[← Назад к руководствам](./index)

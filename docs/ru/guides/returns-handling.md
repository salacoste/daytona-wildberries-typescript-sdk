# Возвраты и отмены

Руководство по работе с возвратами и отменами заказов через Wildberries SDK.

## Обзор

SDK предоставляет методы для:
- Отмены заказов по инициативе продавца
- Отслеживания возвратов от покупателей
- Получения тарифов на возврат
- Анализа возвратов в отчёте о реализации
- Обработки повторных отгрузок

---

## Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Отменить заказ
await sdk.ordersFBS.updateOrdersCancel(orderId);

// Получить заказы на повторную отгрузку (возвраты)
const reshipments = await sdk.ordersFBS.createSuppliesOrdersReshipment();

// Получить тарифы на возврат
const returnTariffs = await sdk.tariffs.getTariffsReturn({ date: '2024-12-01' });
```

---

## Типы возвратов и отмен

### Классификация статусов

| Статус WB | Описание | Кто инициирует |
|-----------|----------|----------------|
| `canceled` | Отменён | Продавец |
| `canceled_by_client` | Отменён клиентом | Покупатель |
| `declined_by_client` | Отклонён клиентом | Покупатель |
| `defect` | Брак | WB / Покупатель |

---

## Отмена заказов

### Отмена по инициативе продавца

```typescript
/**
 * Отменить заказ
 * Доступно только для заказов в статусе 'new' или 'confirm'
 */
async function cancelOrder(
  sdk: WildberriesSDK,
  orderId: number
): Promise<boolean> {
  try {
    await sdk.ordersFBS.updateOrdersCancel(orderId);
    console.log(`Заказ ${orderId} отменён`);
    return true;
  } catch (error: any) {
    if (error.statusCode === 400) {
      console.error(`Заказ ${orderId} нельзя отменить (неверный статус)`);
    } else if (error.statusCode === 404) {
      console.error(`Заказ ${orderId} не найден`);
    }
    return false;
  }
}
```

### Проверка возможности отмены

```typescript
async function canCancelOrder(
  sdk: WildberriesSDK,
  orderId: number
): Promise<boolean> {
  const statusResult = await sdk.ordersFBS.createOrdersStatu({
    orders: [orderId]
  });

  const order = statusResult.orders?.find(o => o.id === orderId);
  if (!order) return false;

  // Можно отменить только в статусах 'new' или 'confirm'
  const cancelableStatuses = ['new', 'confirm'];
  return cancelableStatuses.includes(order.supplierStatus || '');
}
```

---

## Повторные отгрузки (Reshipment)

Заказы, которые были возвращены и требуют повторной отгрузки.

```typescript
interface ReshipmentOrder {
  supplyId: string;
  orderId: number;
}

async function getReshipmentOrders(
  sdk: WildberriesSDK
): Promise<ReshipmentOrder[]> {
  const result = await sdk.ordersFBS.createSuppliesOrdersReshipment();

  return (result.orders || []).map(order => ({
    supplyId: String(order.supplyID || ''),
    orderId: Number(order.orderID || 0)
  }));
}

// Использование
const reshipments = await getReshipmentOrders(sdk);

console.log('=== Заказы на повторную отгрузку ===');
reshipments.forEach(r => {
  console.log(`Заказ ${r.orderId} (поставка: ${r.supplyId})`);
});
```

---

## Тарифы на возврат

### Получение тарифов

```typescript
interface ReturnTariff {
  warehouse: string;
  toPickupPointBase: number;    // На ПВЗ, базовая
  toPickupPointPerLiter: number; // На ПВЗ, за литр
  byCourierBase: number;        // Курьером, базовая
  byCourierPerLiter: number;    // Курьером, за литр
  unclaimed: number;            // Невостребованный возврат
}

async function getReturnTariffs(
  sdk: WildberriesSDK,
  date: string
): Promise<ReturnTariff[]> {
  const result = await sdk.tariffs.getTariffsReturn({ date });

  const warehouses = result.response?.data?.warehouseList || [];

  return warehouses.map(wh => ({
    warehouse: wh.warehouseName || '',
    toPickupPointBase: parseFloat(wh.deliveryDumpSupOfficeBase || '0'),
    toPickupPointPerLiter: parseFloat(wh.deliveryDumpSupOfficeLiter || '0'),
    byCourierBase: parseFloat(wh.deliveryDumpSupCourierBase || '0'),
    byCourierPerLiter: parseFloat(wh.deliveryDumpSupCourierLiter || '0'),
    unclaimed: parseFloat(wh.deliveryDumpSupReturnExpr || '0')
  }));
}
```

---

## Rate Limits

| Метод | Лимит | Интервал |
|-------|-------|----------|
| `updateOrdersCancel()` | 400 запросов | 1 минута |
| `createOrdersStatu()` | 600 запросов | 1 минута |
| `createOrdersStatusHistory()` | 300 запросов | 1 минута |
| `createSuppliesOrdersReshipment()` | 6 запросов | 1 минута |
| `getTariffsReturn()` | 60 запросов | 1 минута |
| `getSupplierReportdetailbyperiod()` | 1 запрос | 1 минута |

---

## Best Practices

### 1. Проактивное отслеживание

```typescript
// Регулярная проверка (каждые 15 минут)
setInterval(async () => {
  const reshipments = await getReshipmentOrders(sdk);

  if (reshipments.length > 0) {
    console.log(`Внимание: ${reshipments.length} заказов требуют повторной отгрузки`);
    // Отправить уведомление
  }
}, 15 * 60 * 1000);
```

### 2. Быстрая обработка reshipment

```typescript
async function processReshipments(sdk: WildberriesSDK) {
  const reshipments = await getReshipmentOrders(sdk);

  if (reshipments.length > 0) {
    console.log(`${reshipments.length} заказов требуют повторной отгрузки!`);

    for (const r of reshipments) {
      // Логика обработки...
    }
  }
}
```

---

## Связанные материалы

- [Отчёт о реализации](./realization-report) - Детализация возвратов в отчёте
- [Комиссии и сборы](./commissions-fees) - Тарифы на возврат
- [API Reference: OrdersFbsModule](/api/classes/OrdersFbsModule)
- [API Reference: TariffsModule](/api/classes/TariffsModule)

---

[← Назад к руководствам](./index)

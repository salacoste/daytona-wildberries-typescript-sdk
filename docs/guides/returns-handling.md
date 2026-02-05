# Returns & Cancellations Guide

Руководство по работе с возвратами и отменами заказов через Wildberries SDK.

## Overview

SDK предоставляет методы для:
- Отмены заказов по инициативе продавца
- Отслеживания возвратов от покупателей
- Получения тарифов на возврат
- Анализа возвратов в отчёте о реализации
- Обработки повторных отгрузок

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Отменить заказ
await sdk.ordersFBS.updateOrdersCancel(orderId);

// Получить заказы на повторную отгрузку (возвраты)
const reshipments = await sdk.ordersFBS.getOrdersReshipment();

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

### Жизненный цикл заказа

```
┌────────┐   ┌─────────┐   ┌──────────┐   ┌────────┐
│  new   │ → │ confirm │ → │ complete │ → │  sold  │
└────────┘   └─────────┘   └──────────┘   └────────┘
    ↓             ↓              ↓
┌────────┐   ┌─────────────────┐   ┌───────────────────┐
│ cancel │   │ canceled_by_    │   │ Возврат (в отчёте │
│        │   │ client          │   │ о реализации)     │
└────────┘   └─────────────────┘   └───────────────────┘
```

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

### Массовая отмена заказов

```typescript
interface CancelResult {
  orderId: number;
  success: boolean;
  error?: string;
}

async function cancelOrders(
  sdk: WildberriesSDK,
  orderIds: number[]
): Promise<CancelResult[]> {
  const results: CancelResult[] = [];

  for (const orderId of orderIds) {
    try {
      await sdk.ordersFBS.updateOrdersCancel(orderId);
      results.push({ orderId, success: true });
    } catch (error: any) {
      results.push({
        orderId,
        success: false,
        error: error.message || 'Unknown error'
      });
    }

    // Пауза между запросами
    await new Promise(r => setTimeout(r, 100));
  }

  const successful = results.filter(r => r.success).length;
  console.log(`Отменено: ${successful} / ${orderIds.length}`);

  return results;
}
```

### Проверка возможности отмены

```typescript
/**
 * Проверить, можно ли отменить заказ
 */
async function canCancelOrder(
  sdk: WildberriesSDK,
  orderId: number
): Promise<boolean> {
  const statusResult = await sdk.ordersFBS.getOrderStatuses({
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

## Отслеживание статусов заказов

### Получение статусов

```typescript
interface OrderStatusInfo {
  id: number;
  supplierStatus: string;
  wbStatus: string;
  isReturn: boolean;
  isCanceled: boolean;
}

async function getOrderStatuses(
  sdk: WildberriesSDK,
  orderIds: number[]
): Promise<OrderStatusInfo[]> {
  const result = await sdk.ordersFBS.getOrderStatuses({
    orders: orderIds
  });

  const cancelStatuses = ['canceled', 'canceled_by_client', 'declined_by_client'];
  const returnStatuses = ['defect'];

  return (result.orders || []).map(order => ({
    id: order.id || 0,
    supplierStatus: order.supplierStatus || '',
    wbStatus: order.wbStatus || '',
    isReturn: returnStatuses.includes(order.wbStatus || ''),
    isCanceled: cancelStatuses.includes(order.wbStatus || '')
  }));
}
```

### История статусов заказа

```typescript
interface StatusHistoryEntry {
  date: string;
  code: string;
}

async function getOrderStatusHistory(
  sdk: WildberriesSDK,
  orderIds: number[]
): Promise<Map<number, StatusHistoryEntry[]>> {
  const result = await sdk.ordersFBS.createStatusHistory({
    orders: orderIds
  });

  const historyMap = new Map<number, StatusHistoryEntry[]>();

  for (const order of result.orders || []) {
    if (order.orderID) {
      historyMap.set(
        order.orderID,
        (order.statuses || []).map(s => ({
          date: s.date || '',
          code: s.code || ''
        }))
      );
    }
  }

  return historyMap;
}
```

---

## Повторные отгрузки (Reshipment)

Заказы, которые были возвращены и требуют повторной отгрузки.

### Получение заказов на повторную отгрузку

```typescript
interface ReshipmentOrder {
  supplyId: string;
  orderId: number;
}

async function getReshipmentOrders(
  sdk: WildberriesSDK
): Promise<ReshipmentOrder[]> {
  const result = await sdk.ordersFBS.getOrdersReshipment();

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

## Анализ возвратов из отчёта о реализации

Детальная информация о возвратах доступна в отчёте о реализации.

### Извлечение возвратов

```typescript
interface ReturnItem {
  orderId: string;
  nmId: number;
  subjectName: string;
  barcode: string;
  returnDate: string;
  returnAmount: number;
  returnReason: string;
  warehouseName: string;
}

async function getReturnsFromRealizationReport(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<ReturnItem[]> {
  const report = await sdk.finances.getSupplierReportdetailbyperiod({
    dateFrom,
    dateTo
  });

  // Фильтруем только возвраты
  const returns = report.filter(item => {
    const operName = item.supplier_oper_name?.toLowerCase() || '';
    return operName.includes('возврат') && (item.quantity || 0) < 0;
  });

  return returns.map(item => ({
    orderId: item.srid || '',
    nmId: item.nm_id || 0,
    subjectName: item.subject_name || '',
    barcode: item.barcode || '',
    returnDate: item.rr_dt || item.sale_dt || '',
    returnAmount: Math.abs(item.ppvz_for_pay || 0),
    returnReason: item.bonus_type_name || 'Возврат покупателем',
    warehouseName: item.office_name || ''
  }));
}
```

### Аналитика возвратов

```typescript
interface ReturnsAnalytics {
  totalReturns: number;
  totalAmount: number;
  returnsByProduct: Map<number, { name: string; count: number; amount: number }>;
  returnsByWarehouse: Map<string, { count: number; amount: number }>;
  returnRate: number;
}

async function analyzeReturns(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<ReturnsAnalytics> {
  const report = await sdk.finances.getSupplierReportdetailbyperiod({
    dateFrom,
    dateTo
  });

  // Разделяем продажи и возвраты
  let totalSales = 0;
  let totalSalesCount = 0;
  let totalReturns = 0;
  let totalReturnsCount = 0;

  const returnsByProduct = new Map<number, { name: string; count: number; amount: number }>();
  const returnsByWarehouse = new Map<string, { count: number; amount: number }>();

  for (const item of report) {
    const operName = item.supplier_oper_name?.toLowerCase() || '';
    const qty = item.quantity || 0;
    const amount = Math.abs(item.ppvz_for_pay || 0);

    if (operName.includes('продажа') && qty > 0) {
      totalSales += amount;
      totalSalesCount += qty;
    }

    if (operName.includes('возврат') && qty < 0) {
      totalReturns += amount;
      totalReturnsCount += Math.abs(qty);

      // По товарам
      const nmId = item.nm_id || 0;
      const existing = returnsByProduct.get(nmId) || {
        name: item.subject_name || '',
        count: 0,
        amount: 0
      };
      existing.count += Math.abs(qty);
      existing.amount += amount;
      returnsByProduct.set(nmId, existing);

      // По складам
      const warehouse = item.office_name || 'Unknown';
      const whData = returnsByWarehouse.get(warehouse) || { count: 0, amount: 0 };
      whData.count += Math.abs(qty);
      whData.amount += amount;
      returnsByWarehouse.set(warehouse, whData);
    }
  }

  return {
    totalReturns: totalReturnsCount,
    totalAmount: totalReturns,
    returnsByProduct,
    returnsByWarehouse,
    returnRate: totalSalesCount > 0
      ? (totalReturnsCount / (totalSalesCount + totalReturnsCount)) * 100
      : 0
  };
}

// Использование
const analytics = await analyzeReturns(sdk, '2024-12-01', '2024-12-07');

console.log('=== Аналитика возвратов ===');
console.log(`Всего возвратов: ${analytics.totalReturns} шт`);
console.log(`Сумма возвратов: ${analytics.totalAmount.toFixed(2)} ₽`);
console.log(`Процент возвратов: ${analytics.returnRate.toFixed(1)}%`);

console.log('\n--- По товарам ---');
Array.from(analytics.returnsByProduct.entries())
  .sort((a, b) => b[1].count - a[1].count)
  .slice(0, 10)
  .forEach(([nmId, data]) => {
    console.log(`nm_id=${nmId}: ${data.count} шт (${data.amount.toFixed(2)} ₽)`);
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

### Расчёт стоимости возврата

```typescript
interface ReturnCostCalculation {
  toPickupPoint: number;
  byCourier: number;
  unclaimedPenalty: number;
}

function calculateReturnCost(
  tariff: ReturnTariff,
  volumeLiters: number
): ReturnCostCalculation {
  return {
    toPickupPoint: tariff.toPickupPointBase +
      (volumeLiters - 1) * tariff.toPickupPointPerLiter,
    byCourier: tariff.byCourierBase +
      (volumeLiters - 1) * tariff.byCourierPerLiter,
    unclaimedPenalty: tariff.unclaimed
  };
}

// Использование
const tariffs = await getReturnTariffs(sdk, '2024-12-01');
const koledinaTariff = tariffs.find(t => t.warehouse === 'Коледино');

if (koledinaTariff) {
  const cost = calculateReturnCost(koledinaTariff, 3); // 3 литра

  console.log('Стоимость возврата (3л товар, Коледино):');
  console.log(`  На ПВЗ: ${cost.toPickupPoint.toFixed(2)} ₽`);
  console.log(`  Курьером: ${cost.byCourier.toFixed(2)} ₽`);
  console.log(`  Штраф за невостребованный: ${cost.unclaimedPenalty.toFixed(2)} ₽`);
}
```

---

## Мониторинг возвратов

### Дашборд возвратов в реальном времени

```typescript
interface ReturnsDashboard {
  date: string;
  newReturns: number;
  pendingReshipments: number;
  returnRate: number;
  topReturnedProducts: Array<{
    nmId: number;
    name: string;
    returns: number;
  }>;
}

async function getReturnsDashboard(
  sdk: WildberriesSDK
): Promise<ReturnsDashboard> {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  // Параллельно получаем данные
  const [reshipments, analytics] = await Promise.all([
    sdk.ordersFBS.getOrdersReshipment(),
    analyzeReturns(sdk, weekAgo, today)
  ]);

  const topProducts = Array.from(analytics.returnsByProduct.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([nmId, data]) => ({
      nmId,
      name: data.name,
      returns: data.count
    }));

  return {
    date: today,
    newReturns: analytics.totalReturns,
    pendingReshipments: reshipments.orders?.length || 0,
    returnRate: analytics.returnRate,
    topReturnedProducts: topProducts
  };
}
```

### Алерты по возвратам

```typescript
interface ReturnAlert {
  type: 'high_return_rate' | 'product_issue' | 'warehouse_issue';
  severity: 'warning' | 'critical';
  message: string;
  data: any;
}

async function checkReturnAlerts(
  sdk: WildberriesSDK,
  thresholds: {
    maxReturnRate: number;      // Макс. % возвратов
    maxProductReturns: number;  // Макс. возвратов на товар
  }
): Promise<ReturnAlert[]> {
  const alerts: ReturnAlert[] = [];

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const analytics = await analyzeReturns(sdk, weekAgo, today);

  // Проверка общего процента возвратов
  if (analytics.returnRate > thresholds.maxReturnRate) {
    alerts.push({
      type: 'high_return_rate',
      severity: analytics.returnRate > thresholds.maxReturnRate * 1.5 ? 'critical' : 'warning',
      message: `Высокий процент возвратов: ${analytics.returnRate.toFixed(1)}%`,
      data: { rate: analytics.returnRate }
    });
  }

  // Проверка проблемных товаров
  for (const [nmId, data] of analytics.returnsByProduct) {
    if (data.count > thresholds.maxProductReturns) {
      alerts.push({
        type: 'product_issue',
        severity: data.count > thresholds.maxProductReturns * 2 ? 'critical' : 'warning',
        message: `Много возвратов товара nm_id=${nmId}: ${data.count} шт`,
        data: { nmId, count: data.count, name: data.name }
      });
    }
  }

  return alerts;
}

// Использование
const alerts = await checkReturnAlerts(sdk, {
  maxReturnRate: 10,      // 10%
  maxProductReturns: 20   // 20 возвратов
});

if (alerts.length > 0) {
  console.log('⚠️ АЛЕРТЫ ВОЗВРАТОВ:');
  alerts.forEach(alert => {
    const icon = alert.severity === 'critical' ? '🚨' : '⚠️';
    console.log(`${icon} ${alert.message}`);
  });
}
```

---

## Rate Limits

| Метод | Лимит | Интервал |
|-------|-------|----------|
| `updateOrdersCancel()` | 100 запросов | 1 минута |
| `getOrderStatuses()` | 300 запросов | 1 минута |
| `createStatusHistory()` | 300 запросов | 1 минута |
| `getOrdersReshipment()` | 300 запросов | 1 минута |
| `getTariffsReturn()` | 60 запросов | 1 минута |
| `getSupplierReportdetailbyperiod()` | 1 запрос | 1 минута |

---

## Best Practices

### 1. Проактивное отслеживание

```typescript
// Регулярная проверка (каждые 15 минут)
setInterval(async () => {
  const alerts = await checkReturnAlerts(sdk, {
    maxReturnRate: 10,
    maxProductReturns: 20
  });

  if (alerts.some(a => a.severity === 'critical')) {
    // Отправить уведомление
    sendNotification(alerts);
  }
}, 15 * 60 * 1000);
```

### 2. Анализ причин возвратов

```typescript
// Группировка по причинам из bonus_type_name
function analyzeReturnReasons(returns: ReturnItem[]) {
  const reasons = new Map<string, number>();

  for (const item of returns) {
    const reason = item.returnReason || 'Не указано';
    reasons.set(reason, (reasons.get(reason) || 0) + 1);
  }

  return Array.from(reasons.entries())
    .sort((a, b) => b[1] - a[1]);
}
```

### 3. Быстрая обработка reshipment

```typescript
async function processReshipments(sdk: WildberriesSDK) {
  const reshipments = await getReshipmentOrders(sdk);

  if (reshipments.length > 0) {
    console.log(`⚠️ ${reshipments.length} заказов требуют повторной отгрузки!`);

    // Добавить в поставку или обработать
    for (const r of reshipments) {
      // Логика обработки...
    }
  }
}
```

---

## Связанные материалы

- [Realization Report](./realization-report.md) - Детализация возвратов в отчёте
- [Commissions & Fees](./commissions-fees.md) - Тарифы на возврат
- [API Reference: OrdersFBSModule](/api/classes/OrdersFbsModule)
- [API Reference: TariffsModule](/api/classes/TariffsModule)

---

[← Back to Guides](./index.md)

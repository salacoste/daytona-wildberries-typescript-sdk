# Order Processing

Complete FBS order fulfillment workflow.

## Description

This use case demonstrates the complete order processing workflow for FBS (Fulfillment by Seller) orders, from receiving new orders to generating shipping labels.

## Get New Orders

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

async function getOrdersNew() {
  const response = await sdk.ordersFBS.getOrdersNew();

  console.log(`New orders: ${response.orders?.length ?? 0}`);

  response.orders?.forEach(order => {
    console.log(`Order #${order.id}:`);
    console.log(`  Article: ${order.article}`);
    console.log(`  SKU: ${order.skus?.join(', ')}`);
    console.log(`  Price: ${order.price / 100} RUB`);
    console.log(`  Created: ${new Date(order.createdAt).toLocaleString()}`);
  });

  return response.orders ?? [];
}

const orders = await getOrdersNew();
```

## Get Orders with Filters

```typescript
// Get orders from the last 7 days
async function getRecentOrders() {
  const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);

  const response = await sdk.ordersFBS.getOrders({
    dateFrom: sevenDaysAgo,
    limit: 1000,
    next: 0
  });

  return response.orders ?? [];
}

// Get all orders with pagination
async function getAllOrders(dateFrom: number) {
  const allOrders = [];
  let next = 0;

  while (true) {
    const response = await sdk.ordersFBS.getOrders({
      dateFrom,
      limit: 1000,
      next
    });

    if (!response.orders?.length) break;

    allOrders.push(...response.orders);
    next = response.next ?? 0;

    if (response.orders.length < 1000) break;
  }

  return allOrders;
}
```

## Check Order Statuses

```typescript
async function checkOrderStatuses(orderIds: number[]) {
  const response = await sdk.ordersFBS.getOrderStatuses(orderIds);

  const statusSummary: Record<string, number> = {};

  response.orders.forEach(order => {
    const status = order.supplierStatus ?? 'unknown';
    statusSummary[status] = (statusSummary[status] ?? 0) + 1;
  });

  console.log('Order Status Summary:');
  Object.entries(statusSummary).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });

  return response.orders;
}
```

## Generate Shipping Stickers

```typescript
async function getOrderStickers(orderIds: number[]) {
  const response = await sdk.ordersFBS.getOrdersStickers({
    orders: orderIds,
    type: 'png',     // 'png' | 'svg' | 'zpl'
    width: 58,       // Sticker width in mm
    height: 40       // Sticker height in mm
  });

  console.log(`Generated ${response.stickers?.length ?? 0} stickers`);

  return response.stickers ?? [];
}

// Save stickers to files
import { writeFileSync } from 'fs';

async function saveStickersToFiles(orderIds: number[]) {
  const stickers = await getOrderStickers(orderIds);

  for (const sticker of stickers) {
    if (sticker.file) {
      const buffer = Buffer.from(sticker.file, 'base64');
      writeFileSync(`sticker-${sticker.orderId}.png`, buffer);
      console.log(`Saved sticker for order ${sticker.orderId}`);
    }
  }
}
```

## Complete Order Processing Workflow

```typescript
interface ProcessedOrder {
  orderId: number;
  status: 'success' | 'failed';
  sticker?: string;
  error?: string;
}

async function processNewOrders(): Promise<ProcessedOrder[]> {
  const results: ProcessedOrder[] = [];

  // 1. Get new orders
  const { orders } = await sdk.ordersFBS.getOrdersNew();

  if (!orders?.length) {
    console.log('No new orders to process');
    return results;
  }

  console.log(`Processing ${orders.length} orders...`);

  // 2. Process each order
  for (const order of orders) {
    try {
      // Check order status
      const [statusInfo] = (
        await sdk.ordersFBS.getOrderStatuses([order.id])
      ).orders;

      // Skip if already processed
      if (statusInfo.supplierStatus !== 'new') {
        console.log(`Order ${order.id} already processed`);
        continue;
      }

      // Generate sticker
      const stickerResponse = await sdk.ordersFBS.getOrdersStickers({
        orders: [order.id],
        type: 'png',
        width: 58,
        height: 40
      });

      const sticker = stickerResponse.stickers?.[0];

      results.push({
        orderId: order.id,
        status: 'success',
        sticker: sticker?.file
      });

      console.log(`Order ${order.id} processed successfully`);

    } catch (error) {
      results.push({
        orderId: order.id,
        status: 'failed',
        error: (error as Error).message
      });
      console.error(`Failed to process order ${order.id}:`, error);
    }
  }

  // 3. Summary
  const successful = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'failed').length;
  console.log(`Processing complete: ${successful} success, ${failed} failed`);

  return results;
}
```

## Supply Management

```typescript
// Get supplies list
async function getSupplies() {
  const response = await sdk.ordersFBS.getSupplies({
    limit: 100,
    next: 0
  });

  console.log(`Total supplies: ${response.supplies?.length ?? 0}`);
  return response.supplies ?? [];
}

// Get supply details with orders
async function getSupplyDetails(supplyId: string) {
  const response = await sdk.ordersFBS.getSupplyOrders(supplyId);

  console.log(`Supply ${supplyId}:`);
  console.log(`  Orders: ${response.orders?.length ?? 0}`);

  return response.orders ?? [];
}

// Get supply sticker
async function getSupplySticker(supplyId: string) {
  const response = await sdk.ordersFBS.getSupplyBarcode(supplyId, 'png');
  return response;
}
```

## Order Analytics

```typescript
interface OrderAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
  ordersByDay: Record<string, number>;
}

async function analyzeOrders(days = 30): Promise<OrderAnalytics> {
  const fromDate = Math.floor(Date.now() / 1000) - (days * 24 * 60 * 60);
  const orders = await getAllOrders(fromDate);
  const statuses = await sdk.ordersFBS.getOrderStatuses(
    orders.map(o => o.id)
  );

  // Calculate analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price / 100), 0);

  const ordersByStatus: Record<string, number> = {};
  statuses.orders.forEach(s => {
    const status = s.supplierStatus ?? 'unknown';
    ordersByStatus[status] = (ordersByStatus[status] ?? 0) + 1;
  });

  const ordersByDay: Record<string, number> = {};
  orders.forEach(o => {
    const day = new Date(o.createdAt).toISOString().split('T')[0];
    ordersByDay[day] = (ordersByDay[day] ?? 0) + 1;
  });

  return {
    totalOrders: orders.length,
    totalRevenue,
    averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    ordersByStatus,
    ordersByDay
  };
}

// Usage
const analytics = await analyzeOrders(30);
console.log('30-day Order Analytics:');
console.log(`  Total Orders: ${analytics.totalOrders}`);
console.log(`  Total Revenue: ${analytics.totalRevenue.toFixed(2)} RUB`);
console.log(`  Average Order: ${analytics.averageOrderValue.toFixed(2)} RUB`);
```

## Related Materials

- [API Reference: OrdersFBSModule](/api/classes/OrdersFBSModule)
- [Shipping Management](shipping.md)
- [Returns Handling](returns.md)

---

[Back to Examples](../index.md) | [Previous: Product Catalog](product-catalog.md) | [Next: Shipping Management](shipping.md)

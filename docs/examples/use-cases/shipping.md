# Shipping Management

Managing deliveries and supplies for FBS orders.

## Description

This use case demonstrates how to manage the shipping process for FBS (Fulfillment by Seller) orders, including creating supplies, generating shipping labels, and tracking delivery status.

## Get Supplies List

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get all supplies
async function getSupplies() {
  const response = await sdk.ordersFBS.getSupplies({
    limit: 100,
    next: 0
  });

  console.log(`Total supplies: ${response.supplies?.length ?? 0}`);

  response.supplies?.forEach(supply => {
    console.log(`Supply ${supply.id}:`);
    console.log(`  Name: ${supply.name}`);
    console.log(`  Status: ${supply.done ? 'Completed' : 'Active'}`);
    console.log(`  Created: ${supply.createdAt}`);
  });

  return response.supplies ?? [];
}

const supplies = await getSupplies();
```

## Get Supply Details

```typescript
// Get orders in a supply
async function getSupplyDetails(supplyId: string) {
  const orders = await sdk.ordersFBS.getSupplyOrders(supplyId);

  console.log(`Supply ${supplyId} contains ${orders.orders?.length ?? 0} orders:`);

  orders.orders?.forEach(order => {
    console.log(`  Order ${order.id}:`);
    console.log(`    Article: ${order.article}`);
    console.log(`    SKU: ${order.skus?.join(', ')}`);
  });

  return orders.orders ?? [];
}

const supplyOrders = await getSupplyDetails('WB-GI-12345678');
```

## Generate Order Stickers

```typescript
// Generate shipping stickers for orders
async function generateStickers(orderIds: number[]) {
  const response = await sdk.ordersFBS.getOrdersStickers({
    orders: orderIds,
    type: 'png',    // 'png' | 'svg' | 'zpl'
    width: 58,      // Width in mm
    height: 40      // Height in mm
  });

  console.log(`Generated ${response.stickers?.length ?? 0} stickers`);

  return response.stickers ?? [];
}

// Save stickers to files
import { writeFileSync } from 'fs';

async function saveStickers(orderIds: number[], outputDir: string) {
  const stickers = await generateStickers(orderIds);

  for (const sticker of stickers) {
    if (sticker.file && sticker.orderId) {
      const buffer = Buffer.from(sticker.file, 'base64');
      const path = `${outputDir}/sticker-${sticker.orderId}.png`;
      writeFileSync(path, buffer);
      console.log(`Saved: ${path}`);
    }
  }
}

await saveStickers([123, 456, 789], './stickers');
```

## Get Supply Barcode

```typescript
// Get barcode for a supply
async function getSupplyBarcode(supplyId: string) {
  const response = await sdk.ordersFBS.getSupplyBarcode(supplyId, 'png');

  if (response.file) {
    console.log(`Barcode generated for supply ${supplyId}`);
  }

  return response;
}

// Save supply barcode
async function saveSupplyBarcode(supplyId: string, outputPath: string) {
  const barcode = await getSupplyBarcode(supplyId);

  if (barcode.file) {
    const buffer = Buffer.from(barcode.file, 'base64');
    writeFileSync(outputPath, buffer);
    console.log(`Saved supply barcode to ${outputPath}`);
  }
}
```

## Add Boxes to Supply (TRBX)

```typescript
// Add transport boxes to a supply
async function addBoxesToSupply(supplyId: string, boxCount: number) {
  const result = await sdk.ordersFBS.addSupplyTrbx(supplyId, boxCount);

  console.log(`Added ${boxCount} boxes to supply ${supplyId}`);
  console.log('Box IDs:', result.trbxIds);

  return result.trbxIds;
}

// Example: Add 3 boxes
const boxIds = await addBoxesToSupply('WB-GI-12345678', 3);
```

## Delete Boxes from Supply

```typescript
// Remove boxes from a supply
async function deleteBoxesFromSupply(supplyId: string, trbxIds: string[]) {
  await sdk.ordersFBS.deleteSupplyTrbx(supplyId, trbxIds);
  console.log(`Removed ${trbxIds.length} boxes from supply ${supplyId}`);
}
```

## Get Box Stickers

```typescript
// Get stickers for supply boxes
async function getBoxStickers(
  supplyId: string,
  trbxIds: string[],
  format: 'svg' | 'zpl' | 'png' = 'png'
) {
  const response = await sdk.ordersFBS.getSupplyTrbxStickersPost(
    supplyId,
    format,
    trbxIds
  );

  console.log(`Generated ${response.stickers?.length ?? 0} box stickers`);
  return response.stickers;
}
```

## Cross-Border Shipping

```typescript
// Get stickers for cross-border orders
async function getCrossBorderStickers(orderIds: number[]) {
  const response = await sdk.ordersFBS.getCrossBorderStickers(orderIds);

  console.log(`Cross-border stickers for ${response.stickers?.length ?? 0} orders`);
  return response.stickers;
}

// Get status history for cross-border orders
async function getCrossBorderHistory(orderIds: number[]) {
  const response = await sdk.ordersFBS.getOrdersStatusHistoryCrossBorder(orderIds);

  response.orders?.forEach(order => {
    console.log(`Order ${order.id} history:`);
    order.history?.forEach(h => {
      console.log(`  ${h.changedAt}: ${h.status}`);
    });
  });

  return response.orders;
}
```

## Complete Supply Workflow

```typescript
interface SupplyWorkflowResult {
  supplyId: string;
  orderCount: number;
  stickersGenerated: number;
  barcodeGenerated: boolean;
}

async function processSupply(supplyId: string): Promise<SupplyWorkflowResult> {
  // 1. Get supply orders
  const orders = await sdk.ordersFBS.getSupplyOrders(supplyId);
  const orderIds = orders.orders?.map(o => o.id) ?? [];

  console.log(`Processing supply ${supplyId} with ${orderIds.length} orders`);

  // 2. Generate stickers for all orders
  let stickersGenerated = 0;
  if (orderIds.length > 0) {
    const stickers = await generateStickers(orderIds);
    stickersGenerated = stickers.length;

    // Save stickers
    for (const sticker of stickers) {
      if (sticker.file) {
        const buffer = Buffer.from(sticker.file, 'base64');
        writeFileSync(`./output/order-${sticker.orderId}.png`, buffer);
      }
    }
  }

  // 3. Generate supply barcode
  const barcode = await getSupplyBarcode(supplyId);
  if (barcode.file) {
    const buffer = Buffer.from(barcode.file, 'base64');
    writeFileSync(`./output/supply-${supplyId}.png`, buffer);
  }

  return {
    supplyId,
    orderCount: orderIds.length,
    stickersGenerated,
    barcodeGenerated: !!barcode.file
  };
}
```

## Delivery Pass Management

```typescript
// Update delivery pass
async function updateDeliveryPass(passId: number, data: {
  deliveryDate?: string;
  carNumber?: string;
  driverName?: string;
}) {
  await sdk.ordersFBS.updatePass(passId, data);
  console.log(`Updated pass ${passId}`);
}
```

## Shipping Analytics

```typescript
interface ShippingMetrics {
  period: { from: string; to: string };
  totalSupplies: number;
  totalOrders: number;
  averageOrdersPerSupply: number;
  completedSupplies: number;
  pendingSupplies: number;
}

async function getShippingMetrics(days = 30): Promise<ShippingMetrics> {
  const supplies = await sdk.ordersFBS.getSupplies({
    limit: 1000,
    next: 0
  });

  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Filter to recent supplies
  const recentSupplies = supplies.supplies?.filter(s =>
    new Date(s.createdAt ?? 0) >= cutoffDate
  ) ?? [];

  const completed = recentSupplies.filter(s => s.done);
  const pending = recentSupplies.filter(s => !s.done);

  // Count orders in supplies
  let totalOrders = 0;
  for (const supply of recentSupplies.slice(0, 10)) { // Sample first 10
    const orders = await sdk.ordersFBS.getSupplyOrders(supply.id ?? '');
    totalOrders += orders.orders?.length ?? 0;
  }

  const avgOrders = recentSupplies.length > 0
    ? totalOrders / Math.min(10, recentSupplies.length)
    : 0;

  return {
    period: {
      from: cutoffDate.toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0]
    },
    totalSupplies: recentSupplies.length,
    totalOrders: Math.round(avgOrders * recentSupplies.length),
    averageOrdersPerSupply: Math.round(avgOrders * 10) / 10,
    completedSupplies: completed.length,
    pendingSupplies: pending.length
  };
}
```

## Related Materials

- [API Reference: OrdersFBSModule](/api/classes/OrdersFBSModule)
- [Order Processing](order-processing.md)
- [Returns Handling](returns.md)

---

[Back to Examples](../index.md) | [Previous: Stock Management](stock-management.md) | [Next: Returns Handling](returns.md)

# Pricing Updates

Managing prices and discounts for your products.

## Description

This use case demonstrates how to update product prices and discounts on Wildberries, including bulk updates, discount management, and price monitoring.

## Get Current Prices

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get prices for products with filtering
async function getCurrentPrices() {
  const response = await sdk.products.getGoodsFilter({
    limit: 100,
    offset: 0
  });

  console.log('Products with prices:');
  response.data?.listGoods?.forEach(item => {
    console.log(`  ${item.nmID}: ${item.sizes?.[0]?.price} RUB`);
    console.log(`    Discount: ${item.sizes?.[0]?.discountedPercent}%`);
  });

  return response.data?.listGoods ?? [];
}

const prices = await getCurrentPrices();
```

## Update Single Product Price

```typescript
// Update price for a single product
async function updateProductPrice(nmId: number, newPrice: number, discount?: number) {
  const updates = [{
    nmID: nmId,
    price: newPrice,
    discount: discount ?? 0
  }];

  const result = await sdk.products.setPricesBatch(updates);

  console.log(`Price update queued. Task ID: ${result.data?.id}`);

  // Poll for completion
  return await waitForPriceUpdate(result.data?.id);
}

// Example: Update price to 2999 RUB with 15% discount
await updateProductPrice(12345, 2999, 15);
```

## Bulk Price Updates

```typescript
interface PriceUpdate {
  nmId: number;
  price: number;
  discount: number;
}

async function bulkUpdatePrices(updates: PriceUpdate[]) {
  // Prepare data for API
  const apiUpdates = updates.map(u => ({
    nmID: u.nmId,
    price: Math.round(u.price), // Prices must be integers
    discount: u.discount
  }));

  // Submit batch update
  const result = await sdk.products.setPricesBatch(apiUpdates);

  console.log(`Bulk update queued: ${apiUpdates.length} products`);
  console.log(`Task ID: ${result.data?.id}`);

  return result.data?.id;
}

// Example: Update multiple products
const updates: PriceUpdate[] = [
  { nmId: 12345, price: 2999, discount: 15 },
  { nmId: 67890, price: 1499, discount: 10 },
  { nmId: 11111, price: 3999, discount: 20 }
];

await bulkUpdatePrices(updates);
```

## Poll for Price Update Status

```typescript
async function waitForPriceUpdate(taskId: number, maxAttempts = 30): Promise<boolean> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const status = await sdk.products.getHistoryTasks(taskId);

    const task = status.data?.tasks?.[0];
    if (!task) continue;

    switch (task.status) {
      case 3: // Completed successfully
        console.log('Price update completed successfully');
        return true;

      case 5: // Completed with errors in some items
        console.warn('Price update completed with some errors');
        await checkPriceErrors(taskId);
        return true;

      case 6: // All items have errors
        console.error('Price update failed for all items');
        await checkPriceErrors(taskId);
        return false;

      default:
        // Still processing (status 1, 2)
        console.log(`Processing... (attempt ${attempt + 1}/${maxAttempts})`);
        await sleep(2000);
    }
  }

  throw new Error('Price update timed out');
}

async function checkPriceErrors(taskId: number) {
  const details = await sdk.products.getGoodsTask({
    uploadID: taskId,
    limit: 100,
    offset: 0
  });

  details.data?.goods?.forEach(item => {
    if (item.errors?.length) {
      console.error(`Product ${item.nmID}: ${item.errors.join(', ')}`);
    }
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Apply Percentage Discount to Category

```typescript
async function applyDiscountToCategory(
  categoryId: number,
  discountPercent: number
) {
  // 1. Get all products in category
  const products = await sdk.products.getCardsList({
    locale: 'ru',
    withPhoto: 0
  });

  // 2. Filter by category
  const categoryProducts = products.filter(
    p => p.subjectID === categoryId
  );

  console.log(`Found ${categoryProducts.length} products in category`);

  // 3. Prepare price updates
  const updates = categoryProducts.map(p => ({
    nmID: p.nmID,
    price: p.sizes?.[0]?.price ?? 0,
    discount: discountPercent
  })).filter(u => u.price > 0);

  // 4. Apply in batches
  const batchSize = 100;
  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    await sdk.products.setPricesBatch(batch);
    console.log(`Updated batch ${Math.floor(i / batchSize) + 1}`);
    await sleep(1000); // Rate limiting
  }

  console.log(`Applied ${discountPercent}% discount to ${updates.length} products`);
}
```

## Price Comparison Report

```typescript
interface PriceReport {
  nmId: number;
  name: string;
  currentPrice: number;
  discountedPrice: number;
  discountPercent: number;
  competitorPrice?: number;
}

async function generatePriceReport(): Promise<PriceReport[]> {
  const products = await sdk.products.getCardsList({ locale: 'ru' });

  const report: PriceReport[] = products.map(p => {
    const size = p.sizes?.[0];
    return {
      nmId: p.nmID,
      name: p.title ?? 'Unknown',
      currentPrice: size?.price ?? 0,
      discountedPrice: size?.discountedPrice ?? size?.price ?? 0,
      discountPercent: size?.discountedPercent ?? 0
    };
  });

  // Sort by discount (highest first)
  report.sort((a, b) => b.discountPercent - a.discountPercent);

  console.log('Price Report:');
  report.slice(0, 10).forEach(item => {
    console.log(`${item.name}: ${item.currentPrice} -> ${item.discountedPrice} (-${item.discountPercent}%)`);
  });

  return report;
}
```

## Sync Prices from External System

```typescript
interface ExternalPrice {
  sku: string;
  price: number;
  compareAtPrice?: number;
}

async function syncPricesFromExternal(externalPrices: ExternalPrice[]) {
  // 1. Get current WB products
  const products = await sdk.products.getCardsList({ locale: 'ru' });

  // 2. Create SKU to nmID mapping
  const skuToNmId = new Map<string, number>();
  products.forEach(p => {
    p.sizes?.forEach(size => {
      size.skus?.forEach(sku => {
        skuToNmId.set(sku, p.nmID);
      });
    });
  });

  // 3. Prepare updates
  const updates: { nmID: number; price: number; discount: number }[] = [];

  for (const ext of externalPrices) {
    const nmId = skuToNmId.get(ext.sku);
    if (!nmId) continue;

    const discount = ext.compareAtPrice
      ? Math.round((1 - ext.price / ext.compareAtPrice) * 100)
      : 0;

    updates.push({
      nmID: nmId,
      price: Math.round(ext.compareAtPrice ?? ext.price),
      discount: Math.max(0, Math.min(99, discount))
    });
  }

  // 4. Apply updates
  if (updates.length > 0) {
    await sdk.products.setPricesBatch(updates);
    console.log(`Synced ${updates.length} prices`);
  }
}
```

## Check Price Quarantine

```typescript
// Products with drastic price drops go to quarantine
async function checkQuarantinedProducts() {
  const quarantine = await sdk.products.getQuarantineGoods({
    limit: 100,
    offset: 0
  });

  if (quarantine.data?.goods?.length) {
    console.log('Products in price quarantine:');
    quarantine.data.goods.forEach(item => {
      console.log(`  ${item.nmID}: Needs review`);
    });
  } else {
    console.log('No products in quarantine');
  }

  return quarantine.data?.goods ?? [];
}
```

## Related Materials

- [API Reference: ProductsModule](/api/classes/ProductsModule)
- [Stock Management](stock-management.md)
- [Product Catalog](product-catalog.md)

---

[Back to Examples](../index.md) | [Previous: Product Catalog](product-catalog.md) | [Next: Stock Management](stock-management.md)

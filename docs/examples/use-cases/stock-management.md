# Stock Management

Managing inventory across Wildberries warehouses.

## Description

This use case demonstrates how to manage stock levels across multiple warehouses, including viewing current stock, updating quantities, and synchronizing with external inventory systems.

## Get Seller Warehouses

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get list of seller's warehouses
async function getWarehouses() {
  const warehouses = await sdk.products.getWarehouses();

  console.log('Your warehouses:');
  warehouses.forEach(wh => {
    console.log(`  ID: ${wh.id}, Name: ${wh.name}`);
  });

  return warehouses;
}

const warehouses = await getWarehouses();
```

## Get Current Stock Levels

```typescript
// Get stock from statistics API
async function getCurrentStock() {
  const today = new Date().toISOString().split('T')[0];
  const stocks = await sdk.reports.getStocks(today);

  console.log(`Total SKUs in stock: ${stocks.length}`);

  // Group by warehouse
  const byWarehouse = new Map<number, typeof stocks>();
  stocks.forEach(item => {
    const whId = item.warehouseName ? 1 : 0; // Simplified
    const current = byWarehouse.get(whId) ?? [];
    current.push(item);
    byWarehouse.set(whId, current);
  });

  return stocks;
}

const stocks = await getCurrentStock();
```

## Create Stock Records

```typescript
// Add new stock records to a warehouse
async function createStockRecords(
  warehouseId: number,
  skus: string[]
) {
  const result = await sdk.products.createStock(warehouseId, { skus });

  console.log('Created stock records:');
  result.stocks?.forEach(item => {
    console.log(`  ${item.sku}: ${item.amount} units`);
  });

  return result.stocks;
}

// Example: Add new SKUs to warehouse
await createStockRecords(12345, ['SKU001', 'SKU002', 'SKU003']);
```

## Update Stock Quantities

```typescript
interface StockUpdate {
  sku: string;
  amount: number;
}

async function updateStockQuantities(
  warehouseId: number,
  updates: StockUpdate[]
) {
  await sdk.products.updateStock(warehouseId, {
    stocks: updates.map(u => ({
      sku: u.sku,
      amount: u.amount
    }))
  });

  console.log(`Updated ${updates.length} stock records`);
}

// Example: Update stock levels
await updateStockQuantities(12345, [
  { sku: 'SKU001', amount: 100 },
  { sku: 'SKU002', amount: 50 },
  { sku: 'SKU003', amount: 0 } // Out of stock
]);
```

## Delete Stock Records

```typescript
// Remove stock records from a warehouse
async function deleteStockRecords(
  warehouseId: number,
  skus: string[]
) {
  await sdk.products.deleteStock(warehouseId, { skus });
  console.log(`Deleted ${skus.length} stock records`);
}

// Example: Remove discontinued items
await deleteStockRecords(12345, ['OLD_SKU_001', 'OLD_SKU_002']);
```

## Stock Level Helper Methods

```typescript
// Use the helper method for updating stock
async function updateStockLevels(
  warehouseId: number,
  updates: Array<{ sku: string; quantity: number }>
) {
  await sdk.products.updateStockLevels(
    warehouseId,
    updates.map(u => ({ sku: u.sku, amount: u.quantity }))
  );

  console.log(`Updated ${updates.length} items`);
}

// Use the helper method for deleting stock
async function removeStockRecords(
  warehouseId: number,
  skus: string[]
) {
  await sdk.products.deleteStockRecords(warehouseId, skus);
  console.log(`Removed ${skus.length} items`);
}
```

## Sync Stock from External System

```typescript
interface ExternalInventory {
  sku: string;
  quantity: number;
  warehouseCode: string;
}

async function syncInventoryFromExternal(
  externalInventory: ExternalInventory[],
  warehouseMapping: Map<string, number> // External code -> WB warehouse ID
) {
  // Group by warehouse
  const byWarehouse = new Map<number, StockUpdate[]>();

  for (const item of externalInventory) {
    const wbWarehouseId = warehouseMapping.get(item.warehouseCode);
    if (!wbWarehouseId) continue;

    const current = byWarehouse.get(wbWarehouseId) ?? [];
    current.push({ sku: item.sku, amount: item.quantity });
    byWarehouse.set(wbWarehouseId, current);
  }

  // Update each warehouse
  for (const [warehouseId, updates] of byWarehouse) {
    await sdk.products.updateStock(warehouseId, { stocks: updates });
    console.log(`Synced ${updates.length} items to warehouse ${warehouseId}`);
  }
}

// Example usage
const mapping = new Map([
  ['MAIN', 12345],
  ['SECONDARY', 67890]
]);

await syncInventoryFromExternal([
  { sku: 'SKU001', quantity: 100, warehouseCode: 'MAIN' },
  { sku: 'SKU002', quantity: 50, warehouseCode: 'SECONDARY' }
], mapping);
```

## Low Stock Alert System

```typescript
interface LowStockItem {
  nmId: number;
  sku: string;
  name: string;
  currentStock: number;
  threshold: number;
  daysOfStock: number;
}

async function checkLowStock(
  threshold = 10,
  salesDays = 30
): Promise<LowStockItem[]> {
  // 1. Get current stock
  const today = new Date().toISOString().split('T')[0];
  const stocks = await sdk.reports.getStocks(today);

  // 2. Get sales data for velocity calculation
  const salesFrom = new Date(Date.now() - salesDays * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];
  const sales = await sdk.reports.getSales(salesFrom, 0);

  // 3. Calculate sales velocity per SKU
  const salesBySku = new Map<number, number>();
  sales.forEach(sale => {
    if (sale.nmId) {
      salesBySku.set(sale.nmId, (salesBySku.get(sale.nmId) ?? 0) + 1);
    }
  });

  // 4. Get product names
  const products = await sdk.products.getAllProducts({ locale: 'ru' });
  const productNames = new Map(products.map(p => [p.nmID, p.title]));

  // 5. Find low stock items
  const lowStockItems: LowStockItem[] = [];

  for (const stock of stocks) {
    if (stock.quantity <= threshold) {
      const salesCount = salesBySku.get(stock.nmId) ?? 0;
      const dailySales = salesCount / salesDays;
      const daysOfStock = dailySales > 0
        ? Math.floor(stock.quantity / dailySales)
        : Infinity;

      lowStockItems.push({
        nmId: stock.nmId,
        sku: stock.barcode ?? '',
        name: productNames.get(stock.nmId) ?? 'Unknown',
        currentStock: stock.quantity,
        threshold,
        daysOfStock: daysOfStock === Infinity ? 999 : daysOfStock
      });
    }
  }

  // Sort by days of stock (most urgent first)
  lowStockItems.sort((a, b) => a.daysOfStock - b.daysOfStock);

  console.log(`Found ${lowStockItems.length} low stock items:`);
  lowStockItems.slice(0, 10).forEach(item => {
    console.log(`  ${item.name}: ${item.currentStock} units (~${item.daysOfStock} days)`);
  });

  return lowStockItems;
}
```

## Stock Movement Report

```typescript
interface StockMovement {
  date: string;
  nmId: number;
  sku: string;
  type: 'sale' | 'return' | 'inbound' | 'adjustment';
  quantity: number;
}

async function generateStockMovementReport(days = 30): Promise<StockMovement[]> {
  const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  // Get sales (outbound)
  const sales = await sdk.reports.getSales(fromDate, 0);

  // Get incomes (inbound)
  const incomes = await sdk.reports.getIncomes(fromDate);

  const movements: StockMovement[] = [];

  // Add sales
  sales.forEach(sale => {
    if (sale.nmId) {
      movements.push({
        date: sale.date ?? '',
        nmId: sale.nmId,
        sku: sale.barcode ?? '',
        type: sale.quantity && sale.quantity < 0 ? 'return' : 'sale',
        quantity: Math.abs(sale.quantity ?? 1)
      });
    }
  });

  // Add incomes
  incomes.forEach(income => {
    movements.push({
      date: income.date ?? '',
      nmId: income.nmId ?? 0,
      sku: income.barcode ?? '',
      type: 'inbound',
      quantity: income.quantity ?? 0
    });
  });

  // Sort by date
  movements.sort((a, b) => b.date.localeCompare(a.date));

  return movements;
}
```

## Batch Stock Update with Validation

```typescript
async function batchUpdateStockWithValidation(
  warehouseId: number,
  updates: StockUpdate[]
) {
  // Validate SKUs exist
  const products = await sdk.products.getAllProducts({ locale: 'ru' });
  const validSkus = new Set<string>();

  products.forEach(p => {
    p.sizes?.forEach(size => {
      size.skus?.forEach(sku => validSkus.add(sku));
    });
  });

  // Filter to valid updates only
  const validUpdates = updates.filter(u => {
    if (!validSkus.has(u.sku)) {
      console.warn(`SKU not found: ${u.sku}`);
      return false;
    }
    if (u.amount < 0) {
      console.warn(`Invalid quantity for ${u.sku}: ${u.amount}`);
      return false;
    }
    return true;
  });

  if (validUpdates.length === 0) {
    console.log('No valid updates to apply');
    return;
  }

  // Apply updates in batches
  const batchSize = 100;
  for (let i = 0; i < validUpdates.length; i += batchSize) {
    const batch = validUpdates.slice(i, i + batchSize);
    await sdk.products.updateStock(warehouseId, { stocks: batch });
    console.log(`Updated batch ${Math.floor(i / batchSize) + 1}`);
  }

  console.log(`Successfully updated ${validUpdates.length} stock records`);
}
```

## Related Materials

- [API Reference: ProductsModule](/api/classes/ProductsModule)
- [Inventory Reports](inventory-reports.md)
- [Pricing Updates](pricing-updates.md)

---

[Back to Examples](../index.md) | [Previous: Pricing Updates](pricing-updates.md) | [Next: Shipping Management](shipping.md)

# Inventory Reports

Generating and analyzing inventory reports.

## Description

This use case demonstrates how to generate comprehensive inventory reports using the Wildberries API, including stock levels, supply tracking, and inventory analytics.

## Get Current Stock Levels

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get stock report from statistics API
async function getStockReport(dateFrom: string) {
  const stocks = await sdk.reports.getStocks(dateFrom);

  console.log(`Total SKUs: ${stocks.length}`);

  // Aggregate by warehouse
  const byWarehouse = new Map<string, number>();
  stocks.forEach(item => {
    const wh = item.warehouseName ?? 'Unknown';
    byWarehouse.set(wh, (byWarehouse.get(wh) ?? 0) + (item.quantity ?? 0));
  });

  console.log('\nStock by warehouse:');
  byWarehouse.forEach((qty, wh) => {
    console.log(`  ${wh}: ${qty} units`);
  });

  return stocks;
}

const today = new Date().toISOString().split('T')[0];
const stocks = await getStockReport(today);
```

## Track Supply Incomes

```typescript
interface IncomeReport {
  period: { from: string; to: string };
  totalSupplies: number;
  totalQuantity: number;
  byWarehouse: Array<{
    warehouse: string;
    supplies: number;
    quantity: number;
  }>;
}

async function getIncomeReport(days = 30): Promise<IncomeReport> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const incomes = await sdk.reports.getIncomes(dateFrom);

  // Aggregate by warehouse
  const warehouseStats = new Map<string, { supplies: Set<number>; quantity: number }>();

  incomes.forEach(income => {
    const wh = income.warehouseName ?? 'Unknown';
    const current = warehouseStats.get(wh) ?? { supplies: new Set(), quantity: 0 };

    if (income.incomeId) current.supplies.add(income.incomeId);
    current.quantity += income.quantity ?? 0;

    warehouseStats.set(wh, current);
  });

  const byWarehouse = Array.from(warehouseStats.entries()).map(([warehouse, stats]) => ({
    warehouse,
    supplies: stats.supplies.size,
    quantity: stats.quantity
  }));

  return {
    period: { from: dateFrom, to: new Date().toISOString().split('T')[0] },
    totalSupplies: new Set(incomes.map(i => i.incomeId)).size,
    totalQuantity: incomes.reduce((sum, i) => sum + (i.quantity ?? 0), 0),
    byWarehouse
  };
}

const incomeReport = await getIncomeReport(30);
console.log(`Total supplies: ${incomeReport.totalSupplies}`);
console.log(`Total quantity: ${incomeReport.totalQuantity} units`);
```

## Stock Movement Analysis

```typescript
interface StockMovementReport {
  period: { from: string; to: string };
  inbound: number;
  outbound: number;
  returns: number;
  netChange: number;
  productMovements: Array<{
    nmId: number;
    name: string;
    inbound: number;
    outbound: number;
    returns: number;
  }>;
}

async function analyzeStockMovements(days = 30): Promise<StockMovementReport> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  // Get data in parallel
  const [incomes, sales, products] = await Promise.all([
    sdk.reports.getIncomes(dateFrom),
    sdk.reports.getSales(dateFrom, 0),
    sdk.products.getCardsList({ locale: 'ru' })
  ]);

  const productNames = new Map(products.map(p => [p.nmID, p.title]));

  // Track movements by product
  const movements = new Map<number, { inbound: number; outbound: number; returns: number }>();

  // Process incomes (inbound)
  incomes.forEach(income => {
    if (!income.nmId) return;
    const current = movements.get(income.nmId) ?? { inbound: 0, outbound: 0, returns: 0 };
    current.inbound += income.quantity ?? 0;
    movements.set(income.nmId, current);
  });

  // Process sales (outbound and returns)
  sales.forEach(sale => {
    if (!sale.nmId) return;
    const current = movements.get(sale.nmId) ?? { inbound: 0, outbound: 0, returns: 0 };
    const qty = sale.quantity ?? 1;

    if (qty > 0) {
      current.outbound += qty;
    } else {
      current.returns += Math.abs(qty);
    }
    movements.set(sale.nmId, current);
  });

  // Calculate totals
  let totalInbound = 0;
  let totalOutbound = 0;
  let totalReturns = 0;

  const productMovements = Array.from(movements.entries())
    .map(([nmId, data]) => {
      totalInbound += data.inbound;
      totalOutbound += data.outbound;
      totalReturns += data.returns;

      return {
        nmId,
        name: productNames.get(nmId) ?? `Product ${nmId}`,
        ...data
      };
    })
    .sort((a, b) => (b.inbound + b.outbound) - (a.inbound + a.outbound));

  return {
    period: { from: dateFrom, to: new Date().toISOString().split('T')[0] },
    inbound: totalInbound,
    outbound: totalOutbound,
    returns: totalReturns,
    netChange: totalInbound - totalOutbound + totalReturns,
    productMovements
  };
}

// Usage
const movements = await analyzeStockMovements(30);
console.log(`Inbound: ${movements.inbound}`);
console.log(`Outbound: ${movements.outbound}`);
console.log(`Returns: ${movements.returns}`);
console.log(`Net change: ${movements.netChange}`);
```

## Inventory Valuation Report

```typescript
interface InventoryValuation {
  date: string;
  totalUnits: number;
  totalValue: number;
  byCategory: Array<{
    category: string;
    units: number;
    value: number;
    avgPrice: number;
  }>;
  topProducts: Array<{
    nmId: number;
    name: string;
    units: number;
    price: number;
    value: number;
  }>;
}

async function getInventoryValuation(): Promise<InventoryValuation> {
  const today = new Date().toISOString().split('T')[0];

  const [stocks, products] = await Promise.all([
    sdk.reports.getStocks(today),
    sdk.products.getCardsList({ locale: 'ru' })
  ]);

  // Create product lookup with prices
  const productInfo = new Map(products.map(p => [
    p.nmID,
    {
      name: p.title ?? 'Unknown',
      category: p.subjectName ?? 'Other',
      price: p.sizes?.[0]?.discountedPrice ?? p.sizes?.[0]?.price ?? 0
    }
  ]));

  // Calculate by category
  const categoryStats = new Map<string, { units: number; value: number }>();
  const productValues: InventoryValuation['topProducts'] = [];

  let totalUnits = 0;
  let totalValue = 0;

  stocks.forEach(stock => {
    const info = productInfo.get(stock.nmId) ?? {
      name: 'Unknown',
      category: 'Other',
      price: 0
    };

    const units = stock.quantity ?? 0;
    const value = units * info.price;

    totalUnits += units;
    totalValue += value;

    // Aggregate by category
    const cat = categoryStats.get(info.category) ?? { units: 0, value: 0 };
    cat.units += units;
    cat.value += value;
    categoryStats.set(info.category, cat);

    // Track product values
    if (units > 0) {
      productValues.push({
        nmId: stock.nmId,
        name: info.name,
        units,
        price: info.price,
        value
      });
    }
  });

  const byCategory = Array.from(categoryStats.entries())
    .map(([category, stats]) => ({
      category,
      units: stats.units,
      value: stats.value,
      avgPrice: stats.units > 0 ? Math.round(stats.value / stats.units) : 0
    }))
    .sort((a, b) => b.value - a.value);

  const topProducts = productValues
    .sort((a, b) => b.value - a.value)
    .slice(0, 20);

  return {
    date: today,
    totalUnits,
    totalValue,
    byCategory,
    topProducts
  };
}

// Usage
const valuation = await getInventoryValuation();
console.log(`Total inventory: ${valuation.totalUnits} units`);
console.log(`Total value: ${valuation.totalValue.toLocaleString()} RUB`);
```

## Stock Aging Analysis

```typescript
interface AgingReport {
  date: string;
  fresh: { units: number; value: number };      // 0-30 days
  normal: { units: number; value: number };     // 31-60 days
  aging: { units: number; value: number };      // 61-90 days
  stale: { units: number; value: number };      // 90+ days
  recommendations: string[];
}

async function analyzeStockAging(): Promise<AgingReport> {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [stocks, incomes, products] = await Promise.all([
    sdk.reports.getStocks(today),
    sdk.reports.getIncomes(ninetyDaysAgo),
    sdk.products.getCardsList({ locale: 'ru' })
  ]);

  // Map product prices
  const productPrices = new Map(products.map(p => [
    p.nmID,
    p.sizes?.[0]?.discountedPrice ?? p.sizes?.[0]?.price ?? 0
  ]));

  // Determine last income date per product
  const lastIncome = new Map<number, string>();
  incomes.forEach(income => {
    if (income.nmId && income.date) {
      const current = lastIncome.get(income.nmId);
      if (!current || income.date > current) {
        lastIncome.set(income.nmId, income.date);
      }
    }
  });

  const result: AgingReport = {
    date: today,
    fresh: { units: 0, value: 0 },
    normal: { units: 0, value: 0 },
    aging: { units: 0, value: 0 },
    stale: { units: 0, value: 0 },
    recommendations: []
  };

  const staleProducts: string[] = [];

  stocks.forEach(stock => {
    const units = stock.quantity ?? 0;
    if (units === 0) return;

    const price = productPrices.get(stock.nmId) ?? 0;
    const value = units * price;
    const incomeDate = lastIncome.get(stock.nmId) ?? ninetyDaysAgo;

    if (incomeDate >= thirtyDaysAgo) {
      result.fresh.units += units;
      result.fresh.value += value;
    } else if (incomeDate >= sixtyDaysAgo) {
      result.normal.units += units;
      result.normal.value += value;
    } else if (incomeDate >= ninetyDaysAgo) {
      result.aging.units += units;
      result.aging.value += value;
    } else {
      result.stale.units += units;
      result.stale.value += value;
      staleProducts.push(`${stock.nmId}`);
    }
  });

  // Generate recommendations
  if (result.stale.units > 0) {
    result.recommendations.push(
      `Consider discounts for ${staleProducts.length} products with stale stock (90+ days)`
    );
  }
  if (result.aging.value > result.fresh.value) {
    result.recommendations.push(
      'Aging inventory value exceeds fresh inventory - review procurement strategy'
    );
  }

  return result;
}
```

## Warehouse Comparison Report

```typescript
interface WarehouseComparison {
  warehouses: Array<{
    name: string;
    totalSKUs: number;
    totalUnits: number;
    totalValue: number;
    avgDaysOnHand: number;
  }>;
  recommendations: string[];
}

async function compareWarehouses(): Promise<WarehouseComparison> {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const [stocks, sales, products] = await Promise.all([
    sdk.reports.getStocks(today),
    sdk.reports.getSales(thirtyDaysAgo, 0),
    sdk.products.getCardsList({ locale: 'ru' })
  ]);

  const productPrices = new Map(products.map(p => [
    p.nmID,
    p.sizes?.[0]?.discountedPrice ?? p.sizes?.[0]?.price ?? 0
  ]));

  // Calculate daily sales per product
  const dailySales = new Map<number, number>();
  sales.forEach(sale => {
    if (sale.nmId && (sale.quantity ?? 0) > 0) {
      dailySales.set(sale.nmId, (dailySales.get(sale.nmId) ?? 0) + (sale.quantity ?? 0));
    }
  });
  dailySales.forEach((total, nmId) => {
    dailySales.set(nmId, total / 30); // Average per day
  });

  // Aggregate by warehouse
  const warehouseStats = new Map<string, {
    skus: Set<number>;
    units: number;
    value: number;
    daysOnHand: number[];
  }>();

  stocks.forEach(stock => {
    const wh = stock.warehouseName ?? 'Unknown';
    const current = warehouseStats.get(wh) ?? {
      skus: new Set(),
      units: 0,
      value: 0,
      daysOnHand: []
    };

    const units = stock.quantity ?? 0;
    const price = productPrices.get(stock.nmId) ?? 0;
    const daily = dailySales.get(stock.nmId) ?? 0;

    current.skus.add(stock.nmId);
    current.units += units;
    current.value += units * price;

    if (daily > 0) {
      current.daysOnHand.push(units / daily);
    }

    warehouseStats.set(wh, current);
  });

  const warehouses = Array.from(warehouseStats.entries())
    .map(([name, stats]) => ({
      name,
      totalSKUs: stats.skus.size,
      totalUnits: stats.units,
      totalValue: stats.value,
      avgDaysOnHand: stats.daysOnHand.length > 0
        ? Math.round(stats.daysOnHand.reduce((a, b) => a + b, 0) / stats.daysOnHand.length)
        : 0
    }))
    .sort((a, b) => b.totalValue - a.totalValue);

  const recommendations: string[] = [];

  // Identify imbalances
  const maxDays = Math.max(...warehouses.map(w => w.avgDaysOnHand));
  const minDays = Math.min(...warehouses.filter(w => w.avgDaysOnHand > 0).map(w => w.avgDaysOnHand));

  if (maxDays > minDays * 2 && warehouses.length > 1) {
    recommendations.push('Consider rebalancing stock between warehouses - significant disparity detected');
  }

  return { warehouses, recommendations };
}
```

## Scheduled Inventory Report

```typescript
interface ScheduledReport {
  generatedAt: string;
  summary: {
    totalSKUs: number;
    totalUnits: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
  };
  alerts: string[];
}

async function generateDailyReport(): Promise<ScheduledReport> {
  const today = new Date().toISOString().split('T')[0];

  const [stocks, products] = await Promise.all([
    sdk.reports.getStocks(today),
    sdk.products.getCardsList({ locale: 'ru' })
  ]);

  const productPrices = new Map(products.map(p => [
    p.nmID,
    p.sizes?.[0]?.discountedPrice ?? p.sizes?.[0]?.price ?? 0
  ]));

  const productNames = new Map(products.map(p => [p.nmID, p.title]));

  let totalUnits = 0;
  let totalValue = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;
  const alerts: string[] = [];

  const LOW_STOCK_THRESHOLD = 10;

  stocks.forEach(stock => {
    const units = stock.quantity ?? 0;
    const price = productPrices.get(stock.nmId) ?? 0;

    totalUnits += units;
    totalValue += units * price;

    if (units === 0) {
      outOfStockCount++;
      alerts.push(`Out of stock: ${productNames.get(stock.nmId) ?? stock.nmId}`);
    } else if (units <= LOW_STOCK_THRESHOLD) {
      lowStockCount++;
      alerts.push(`Low stock (${units} units): ${productNames.get(stock.nmId) ?? stock.nmId}`);
    }
  });

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      totalSKUs: stocks.length,
      totalUnits,
      totalValue,
      lowStockCount,
      outOfStockCount
    },
    alerts: alerts.slice(0, 20) // Limit alerts
  };
}

// Usage for scheduled tasks
const dailyReport = await generateDailyReport();
console.log('Daily Inventory Report');
console.log('======================');
console.log(`Total SKUs: ${dailyReport.summary.totalSKUs}`);
console.log(`Total Units: ${dailyReport.summary.totalUnits}`);
console.log(`Total Value: ${dailyReport.summary.totalValue.toLocaleString()} RUB`);
console.log(`Low Stock Items: ${dailyReport.summary.lowStockCount}`);
console.log(`Out of Stock Items: ${dailyReport.summary.outOfStockCount}`);

if (dailyReport.alerts.length > 0) {
  console.log('\nAlerts:');
  dailyReport.alerts.forEach(alert => console.log(`  - ${alert}`));
}
```

## Related Materials

- [API Reference: ReportsModule](/api/classes/ReportsModule)
- [Stock Management](stock-management.md)
- [Financial Reports](financial-reports.md)

---

[Back to Examples](../index.md) | [Previous: Sales Dashboard](sales-dashboard.md) | [Next: Financial Reports](financial-reports.md)

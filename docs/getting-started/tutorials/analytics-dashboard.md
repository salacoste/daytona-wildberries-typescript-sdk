---
title: Analytics Dashboard
description: Track sales performance and analyze customer behavior - sales data, search queries, stock history, and CSV reports
layout: doc
---

# Tutorial 3: Analytics Dashboard

Learn how to track sales performance, analyze customer behavior, and generate data-driven insights.

## What You'll Build

A complete analytics dashboard that:
- Fetches sales data and conversion metrics
- Analyzes search queries and product visibility
- Retrieves stock history and inventory trends
- Generates CSV reports for deeper analysis

**Estimated Time:** 30 minutes
**Difficulty:** Intermediate

---

## Learning Objectives

By the end of this tutorial, you'll be able to:
- ✅ Track sales funnel metrics (views → clicks → purchases)
- ✅ Analyze search query performance
- ✅ Monitor stock levels and inventory history
- ✅ Export data to CSV for external analysis
- ✅ Build data-driven insights for business decisions

---

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js ≥ 20.0.0 installed
- ✅ Wildberries API key with analytics access
- ✅ SDK installed (`npm install wb-api-sdk`)
- ✅ Completed [Quickstart Guide](../quickstart.md)
- ✅ Some existing products and sales data

---

## Introduction

Analytics are essential for understanding your business performance. Wildberries provides rich analytics covering:

### Sales Funnel Analytics
- **Views:** How many times your products appeared in search/browse
- **Add to Cart:** How many users added products to cart
- **Purchases:** Completed transactions
- **Conversion Rate:** Percentage of views that become purchases

### Search Analytics
- **Search Queries:** What customers search for
- **Product Visibility:** Where your products rank in search
- **Click-Through Rate:** How often your products get clicked

### Stock Analytics
- **Inventory Levels:** Current stock per warehouse
- **Stock History:** Historical inventory trends
- **Turnover Rate:** How fast products sell

**This tutorial shows you how to extract and analyze this data.**

---

## Step 1: Fetch Sales Data (10 minutes)

Let's start by retrieving sales funnel metrics for your products.

### Understanding Sales Funnel

The sales funnel shows customer journey:

```
Views (1000)
    ↓ 20% click-through
Clicks (200)
    ↓ 40% add to cart
Add to Cart (80)
    ↓ 50% purchase
Purchases (40)

Conversion Rate: 4% (40/1000)
```

### Code Example

Create a file `analytics-dashboard.ts`:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function getSalesData() {
  try {
    // Define date range (last 30 days)
    const dateTo = new Date();
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);

    console.log(`Fetching sales data from ${dateFrom.toISOString().split('T')[0]} to ${dateTo.toISOString().split('T')[0]}\n`);

    // Get sales funnel data
    const salesFunnel = await sdk.analytics.getSalesFunnel({
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString()
    });

    console.log('=== Sales Funnel (Last 30 Days) ===\n');

    salesFunnel.data.forEach(product => {
      console.log(`Product: ${product.productName}`);
      console.log(`  SKU: ${product.sku}`);
      console.log(`  Views: ${product.views.toLocaleString()}`);
      console.log(`  Add to Cart: ${product.addToCarts.toLocaleString()}`);
      console.log(`  Purchases: ${product.purchases.toLocaleString()}`);
      console.log(`  Conversion Rate: ${product.conversionRate.toFixed(2)}%`);
      console.log(`  Revenue: ${product.revenue.toLocaleString()} RUB`);
      console.log(`  Average Order Value: ${product.averageOrderValue.toFixed(2)} RUB`);
      console.log('');
    });

    // Calculate totals
    const totals = salesFunnel.data.reduce((acc, p) => ({
      views: acc.views + p.views,
      purchases: acc.purchases + p.purchases,
      revenue: acc.revenue + p.revenue
    }), { views: 0, purchases: 0, revenue: 0 });

    console.log('=== Totals ===');
    console.log(`  Total Views: ${totals.views.toLocaleString()}`);
    console.log(`  Total Purchases: ${totals.purchases.toLocaleString()}`);
    console.log(`  Total Revenue: ${totals.revenue.toLocaleString()} RUB`);
    console.log(`  Overall Conversion: ${((totals.purchases / totals.views) * 100).toFixed(2)}%`);

    return salesFunnel.data;

  } catch (error) {
    console.error('Error fetching sales data:', error.message);
    throw error;
  }
}

getSalesData();
```

### Expected Output

```
Fetching sales data from 2024-09-26 to 2024-10-26

=== Sales Funnel (Last 30 Days) ===

Product: TechBrand Smartphone Pro 15
  SKU: TB-SP15-BLK
  Views: 15,240
  Add to Cart: 1,829
  Purchases: 427
  Conversion Rate: 2.80%
  Revenue: 1,279,273 RUB
  Average Order Value: 2,996.43 RUB

Product: Phone Case Premium
  SKU: PC-PREM-BLK
  Views: 8,430
  Add to Cart: 952
  Purchases: 312
  Conversion Rate: 3.70%
  Revenue: 155,000 RUB
  Average Order Value: 496.79 RUB

=== Totals ===
  Total Views: 23,670
  Total Purchases: 739
  Total Revenue: 1,434,273 RUB
  Overall Conversion: 3.12%
```

### Analyzing Top Performers

```typescript
async function getTopPerformers() {
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - 30);

  const salesFunnel = await sdk.analytics.getSalesFunnel({
    dateFrom: dateFrom.toISOString(),
    dateTo: new Date().toISOString()
  });

  // Sort by revenue
  const topByRevenue = [...salesFunnel.data]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  console.log('Top 5 Products by Revenue:\n');
  topByRevenue.forEach((p, i) => {
    console.log(`${i + 1}. ${p.productName}`);
    console.log(`   Revenue: ${p.revenue.toLocaleString()} RUB`);
    console.log(`   Purchases: ${p.purchases}`);
  });

  // Sort by conversion rate
  const topByConversion = [...salesFunnel.data]
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  console.log('\nTop 5 Products by Conversion Rate:\n');
  topByConversion.forEach((p, i) => {
    console.log(`${i + 1}. ${p.productName}`);
    console.log(`   Conversion: ${p.conversionRate.toFixed(2)}%`);
    console.log(`   Views: ${p.views.toLocaleString()}`);
  });
}
```

---

## Step 2: Get Search Queries (5 minutes)

Understand what customers are searching for and how your products rank.

### Search Query Metrics

- **Search Term:** What users typed
- **Impressions:** How often your products appeared in results
- **Clicks:** How often users clicked your products
- **CTR:** Click-through rate (clicks / impressions)

### Code Example

```typescript
async function getSearchQueries() {
  try {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7); // Last 7 days

    const queries = await sdk.analytics.getSearchQueries({
      dateFrom: dateFrom.toISOString(),
      dateTo: new Date().toISOString(),
      limit: 20
    });

    console.log('=== Top Search Queries (Last 7 Days) ===\n');

    queries.data.forEach(query => {
      console.log(`Search: "${query.searchTerm}"`);
      console.log(`  Impressions: ${query.impressions.toLocaleString()}`);
      console.log(`  Clicks: ${query.clicks.toLocaleString()}`);
      console.log(`  CTR: ${query.clickThroughRate.toFixed(2)}%`);
      console.log(`  Avg Position: ${query.averagePosition.toFixed(1)}`);
      console.log('');
    });

    // Identify high-impression, low-click queries (optimization opportunities)
    const lowCTR = queries.data.filter(q => q.clickThroughRate < 2.0 && q.impressions > 100);

    if (lowCTR.length > 0) {
      console.log('⚠️  Optimization Opportunities (High impressions, Low CTR):\n');
      lowCTR.forEach(q => {
        console.log(`  - "${q.searchTerm}"`);
        console.log(`    Impressions: ${q.impressions}, CTR: ${q.clickThroughRate.toFixed(2)}%`);
        console.log(`    → Consider improving product titles/images for this search`);
      });
    }

    return queries.data;

  } catch (error) {
    console.error('Error fetching search queries:', error.message);
    throw error;
  }
}
```

### Expected Output

```
=== Top Search Queries (Last 7 Days) ===

Search: "смартфон недорогой"
  Impressions: 4,230
  Clicks: 127
  CTR: 3.00%
  Avg Position: 12.3

Search: "чехол для телефона"
  Impressions: 3,890
  Clicks: 156
  CTR: 4.01%
  Avg Position: 8.7

Search: "телефон черный"
  Impressions: 2,450
  Clicks: 49
  CTR: 2.00%
  Avg Position: 18.5

⚠️  Optimization Opportunities (High impressions, Low CTR):

  - "телефон черный"
    Impressions: 2450, CTR: 2.00%
    → Consider improving product titles/images for this search
```

---

## Step 3: Retrieve Stock History (5 minutes)

Track inventory trends to optimize stock levels and prevent stockouts.

### Stock History Metrics

- **Warehouse:** Which warehouse holds inventory
- **Date:** Historical timestamp
- **Quantity:** Stock level at that time
- **Turnover:** How fast items sell

### Code Example

```typescript
async function getStockHistory(sku: string) {
  try {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);

    const history = await sdk.analytics.getStockHistory({
      sku: sku,
      dateFrom: dateFrom.toISOString(),
      dateTo: new Date().toISOString()
    });

    console.log(`=== Stock History for ${sku} (Last 30 Days) ===\n`);

    // Group by warehouse
    const byWarehouse = history.data.reduce((acc, entry) => {
      if (!acc[entry.warehouseId]) {
        acc[entry.warehouseId] = [];
      }
      acc[entry.warehouseId].push(entry);
      return acc;
    }, {} as Record<string, typeof history.data>);

    Object.entries(byWarehouse).forEach(([warehouseId, entries]) => {
      console.log(`Warehouse: ${warehouseId}`);

      const latestStock = entries[entries.length - 1].quantity;
      const initialStock = entries[0].quantity;
      const stockChange = latestStock - initialStock;

      console.log(`  Current Stock: ${latestStock}`);
      console.log(`  30 Days Ago: ${initialStock}`);
      console.log(`  Change: ${stockChange >= 0 ? '+' : ''}${stockChange} units`);

      // Calculate average daily turnover
      const sold = initialStock - latestStock;
      const days = 30;
      const dailyTurnover = sold / days;

      console.log(`  Avg Daily Turnover: ${dailyTurnover.toFixed(1)} units/day`);
      console.log(`  Days Until Stockout: ${latestStock > 0 ? (latestStock / dailyTurnover).toFixed(1) : 'OUT OF STOCK'}`);
      console.log('');
    });

    return history.data;

  } catch (error) {
    console.error('Error fetching stock history:', error.message);
    throw error;
  }
}

// Example usage
getStockHistory('TB-SP15-BLK');
```

### Expected Output

```
=== Stock History for TB-SP15-BLK (Last 30 Days) ===

Warehouse: WH-MOSCOW-01
  Current Stock: 245
  30 Days Ago: 500
  Change: -255 units
  Avg Daily Turnover: 8.5 units/day
  Days Until Stockout: 28.8

Warehouse: WH-SPB-02
  Current Stock: 89
  30 Days Ago: 200
  Change: -111 units
  Avg Daily Turnover: 3.7 units/day
  Days Until Stockout: 24.1
```

### Low Stock Alerts

```typescript
async function checkLowStock(threshold: number = 30) {
  const products = await sdk.products.listProducts();

  const lowStockProducts = [];

  for (const product of products.data) {
    const stock = await sdk.products.getStock(product.sku);

    const totalStock = stock.data.reduce((sum, w) => sum + w.quantity, 0);

    if (totalStock < threshold) {
      lowStockProducts.push({
        sku: product.sku,
        name: product.name,
        stock: totalStock
      });
    }
  }

  if (lowStockProducts.length > 0) {
    console.log('⚠️  Low Stock Alert:\n');
    lowStockProducts.forEach(p => {
      console.log(`  - ${p.name} (${p.sku})`);
      console.log(`    Stock: ${p.stock} units (below threshold of ${threshold})`);
    });
  } else {
    console.log('✓ All products have sufficient stock');
  }
}
```

---

## Step 4: Generate CSV Reports (5 minutes)

Export analytics data to CSV for deeper analysis in Excel, Google Sheets, or BI tools.

### CSV Report Types

Wildberries supports several report types:
- **Sales Report:** Detailed transaction history
- **Product Performance:** Metrics per product
- **Financial Report:** Revenue, fees, payouts
- **Stock Report:** Inventory levels and turnover

### Code Example

```typescript
async function generateCSVReport() {
  try {
    console.log('Generating CSV report...');

    // Request report generation
    const reportRequest = await sdk.analytics.generateCSVReport({
      reportType: 'sales',
      dateFrom: new Date('2024-09-01').toISOString(),
      dateTo: new Date('2024-09-30').toISOString(),
      format: 'csv'
    });

    console.log(`✓ Report requested`);
    console.log(`  Report ID: ${reportRequest.data.reportId}`);
    console.log(`  Status: ${reportRequest.data.status}`); // 'pending'

    // Poll for completion
    console.log('\nWaiting for report generation...');

    let reportStatus;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

      reportStatus = await sdk.analytics.getCSVReportStatus(reportRequest.data.reportId);

      if (reportStatus.data.status === 'completed') {
        console.log('✓ Report ready!');
        break;
      } else if (reportStatus.data.status === 'failed') {
        throw new Error('Report generation failed');
      }

      attempts++;
      process.stdout.write('.');
    }

    console.log('');

    if (reportStatus.data.status !== 'completed') {
      throw new Error('Report generation timeout');
    }

    // Download report
    console.log('Downloading report...');

    const reportData = await sdk.analytics.downloadCSVReport(reportRequest.data.reportId);

    // Save to file
    const fs = require('fs');
    const fileName = `sales-report-${new Date().toISOString().split('T')[0]}.csv`;

    fs.writeFileSync(fileName, reportData.data);

    console.log(`✓ Report saved to ${fileName}`);
    console.log(`  File size: ${(reportData.data.length / 1024).toFixed(2)} KB`);

    return fileName;

  } catch (error) {
    console.error('Error generating report:', error.message);
    throw error;
  }
}
```

### Expected Output

```
Generating CSV report...
✓ Report requested
  Report ID: RPT-789012
  Status: pending

Waiting for report generation...
......✓ Report ready!

Downloading report...
✓ Report saved to sales-report-2024-10-26.csv
  File size: 245.67 KB
```

---

## Complete Example: Analytics Dashboard

Here's a comprehensive analytics dashboard combining all metrics:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function runAnalyticsDashboard() {
  try {
    console.log('=== Wildberries Analytics Dashboard ===\n');

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);
    const dateTo = new Date();

    // 1. Sales Overview
    console.log('📊 Sales Overview (Last 30 Days)\n');

    const salesFunnel = await sdk.analytics.getSalesFunnel({
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString()
    });

    const totals = salesFunnel.data.reduce((acc, p) => ({
      views: acc.views + p.views,
      purchases: acc.purchases + p.purchases,
      revenue: acc.revenue + p.revenue
    }), { views: 0, purchases: 0, revenue: 0 });

    console.log(`Total Views: ${totals.views.toLocaleString()}`);
    console.log(`Total Purchases: ${totals.purchases.toLocaleString()}`);
    console.log(`Total Revenue: ${totals.revenue.toLocaleString()} RUB`);
    console.log(`Conversion Rate: ${((totals.purchases / totals.views) * 100).toFixed(2)}%`);

    // 2. Top Products
    console.log('\n🏆 Top 5 Products by Revenue\n');

    const topProducts = [...salesFunnel.data]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    topProducts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.productName}`);
      console.log(`   Revenue: ${p.revenue.toLocaleString()} RUB`);
      console.log(`   Conversion: ${p.conversionRate.toFixed(2)}%\n`);
    });

    // 3. Search Performance
    console.log('🔍 Top Search Queries (Last 7 Days)\n');

    const dateFrom7 = new Date();
    dateFrom7.setDate(dateFrom7.getDate() - 7);

    const queries = await sdk.analytics.getSearchQueries({
      dateFrom: dateFrom7.toISOString(),
      dateTo: dateTo.toISOString(),
      limit: 5
    });

    queries.data.forEach(q => {
      console.log(`"${q.searchTerm}"`);
      console.log(`  Impressions: ${q.impressions.toLocaleString()} | CTR: ${q.clickThroughRate.toFixed(2)}%\n`);
    });

    // 4. Stock Alerts
    console.log('📦 Stock Status\n');

    const lowStockThreshold = 50;
    const products = await sdk.products.listProducts({ limit: 10 });

    for (const product of products.data) {
      const stock = await sdk.products.getStock(product.sku);
      const totalStock = stock.data.reduce((sum, w) => sum + w.quantity, 0);

      if (totalStock < lowStockThreshold) {
        console.log(`⚠️  ${product.name} (${product.sku})`);
        console.log(`   Stock: ${totalStock} units (LOW)\n`);
      }
    }

    // 5. Export Data
    console.log('📄 Generating CSV Report...\n');

    const report = await sdk.analytics.generateCSVReport({
      reportType: 'sales',
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      format: 'csv'
    });

    console.log(`✓ Report generated: ${report.data.reportId}`);

    console.log('\n=== Dashboard Complete ===');

  } catch (error) {
    console.error('❌ Dashboard error:', error.message);
    process.exit(1);
  }
}

// Run the dashboard
runAnalyticsDashboard();
```

### Run It

```bash
# Set your API key
export WB_API_KEY='your_api_key_here'

# Run the dashboard
npx tsx analytics-dashboard.ts
```

### Expected Output

```
=== Wildberries Analytics Dashboard ===

📊 Sales Overview (Last 30 Days)

Total Views: 45,230
Total Purchases: 1,234
Total Revenue: 3,678,900 RUB
Conversion Rate: 2.73%

🏆 Top 5 Products by Revenue

1. TechBrand Smartphone Pro 15
   Revenue: 1,279,273 RUB
   Conversion: 2.80%

2. Laptop Pro 14
   Revenue: 987,450 RUB
   Conversion: 3.12%

...

🔍 Top Search Queries (Last 7 Days)

"смартфон недорогой"
  Impressions: 4,230 | CTR: 3.00%

"чехол для телефона"
  Impressions: 3,890 | CTR: 4.01%

...

📦 Stock Status

⚠️  Phone Case Premium (PC-PREM-BLK)
   Stock: 23 units (LOW)

📄 Generating CSV Report...

✓ Report generated: RPT-789012

=== Dashboard Complete ===
```

---

## Next Steps

Great work! You've built a comprehensive analytics dashboard. Continue learning:

1. **[Tutorial 4: Multi-Module Integration](./multi-module-integration.md)** - Connect all modules together
2. **[Best Practices Guide](../../guides/best-practices.md)** - Production analytics patterns
3. **[API Reference](../../api/)** - Complete analytics module documentation

---

## Key Takeaways

✅ Sales funnel shows conversion from views → purchases
✅ Search queries reveal customer intent and optimization opportunities
✅ Stock history predicts stockouts and guides reordering
✅ CSV reports enable deep analysis in external tools
✅ Dashboard combines multiple metrics for holistic view
✅ Low-stock alerts prevent missed sales opportunities
✅ Conversion rate is key metric for product performance

---

[← Back to Getting Started](../index.md) | [Next Tutorial: Multi-Module Integration →](./multi-module-integration.md)

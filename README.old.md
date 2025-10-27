# Wildberries API TypeScript SDK

[![CI](https://github.com/salacoste/daytona-wildberries-typescript-sdk/workflows/CI/badge.svg)](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions)
[![npm version](https://badge.fury.io/js/daytona-wildberries-typescript-sdk.svg)](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
[![Release](https://img.shields.io/badge/release-v1.0.0-green.svg)](https://github.com/salacoste/daytona-wildberries-typescript-sdk/releases/tag/v1.0.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Full-featured TypeScript SDK providing type-safe access to all Wildberries marketplace API methods.**

Transform 11 OpenAPI specifications into a production-ready SDK with complete type safety, automatic rate limiting, retry mechanisms, and comprehensive error handling. Reduce integration time from weeks to hours.

---

## 📚 Documentation

**Quick Links:**
- [📖 Documentation Hub](docs/index.md) - Complete SDK documentation
- [🚀 Getting Started](docs/getting-started/) - Installation, quickstart, and tutorials
- [📚 Guides](docs/guides/) - Best practices and production deployment
- [🔍 API Reference](docs/api/) - Complete API documentation
- [💡 Examples](docs/examples/) - Working code examples
- [FAQ](FAQ.md) - Frequently asked questions and troubleshooting
- [Contributing](CONTRIBUTING.md) - How to contribute code, tests, and documentation
- [Security Policy](SECURITY.md) - Vulnerability reporting and security best practices
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards and guidelines
- [CHANGELOG](CHANGELOG.md) - Version history and release notes

---

## Features

✅ **Complete API Coverage** - All 11 Wildberries API modules (Products, Orders, Finances, Analytics, etc.)
✅ **Full Type Safety** - Auto-generated TypeScript types from OpenAPI specifications
✅ **Automatic Rate Limiting** - Built-in enforcement of per-endpoint rate limits
✅ **Smart Retry Logic** - Exponential backoff for transient failures
✅ **Rich Error Handling** - Typed error classes with recovery guidance
✅ **Tree-Shakeable** - Dual ESM/CommonJS builds, import only what you need
✅ **Zero Config** - Works out of the box with sensible defaults

---

## Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

**Requirements:**
- Node.js 20.x or 22.x (18.x no longer supported)
- TypeScript 5.x (for TypeScript projects)

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize the SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Test connectivity
const pingResponse = await sdk.general.ping();
console.log('✓ Connected:', pingResponse.Status); // 'OK'

// Fetch seller information
const sellerInfo = await sdk.general.sellerInfo();
console.log('Seller ID:', sellerInfo.sid);
console.log('Name:', sellerInfo.name);

// Get latest news
const news = await sdk.general.news();
console.log('News items:', news.data?.length);

// Products Module (Epic 2 - Complete)
const categories = await sdk.products.getParentAll();
console.log('Parent categories:', categories.data?.length);

// Orders FBS Module (Epic 2 - Complete)
const newOrders = await sdk.ordersFBS.getNewOrders();
console.log('New orders:', newOrders.length);

// Orders FBW Module (Epic 2 - Complete)
const warehouses = await sdk.ordersFBW.getWarehouses();
console.log('Available warehouses:', warehouses.length);

// Finances Module (Epic 3 - Complete)
const balance = await sdk.finances.getBalance();
console.log('Available balance:', balance.for_withdraw, balance.currency);

// Analytics Module (Epic 3 - Complete)
const salesFunnel = await sdk.analytics.getSalesFunnel({
  period: {
    begin: '2024-01-01 00:00:00',
    end: '2024-01-31 23:59:59'
  }
});
console.log('Products analyzed:', salesFunnel.data.cards.length);

// Reports Module (Epic 3 - Complete)
const incomes = await sdk.reports.getIncomes('2024-01-01');
console.log('Income records:', incomes.data?.length);

// Promotion Module (Epic 4 - Complete)
const campaignCount = await sdk.promotion.getPromotionCount();
console.log('Active campaigns:', campaignCount.all);

// Tariffs Module (Epic 4 - Complete)
const commission = await sdk.tariffs.getCommission({ locale: 'ru' });
console.log('Commission data loaded:', commission.report?.length);

// In-Store Pickup Module (Epic 4 - Complete)
const pickupOrders = await sdk.inStorePickup.getNewOrders();
console.log('Pickup orders:', pickupOrders.orders?.length);
```

**Time to First API Call: <5 minutes** 🚀

For a complete working example, see [`examples/quickstart.ts`](./examples/quickstart.ts)

---

## Examples

Explore complete workflow examples in the [`examples/`](./examples/) directory:

### Complete Product Lifecycle
[**`complete-product-workflow.ts`**](./examples/complete-product-workflow.ts) - Full product management from category selection to stock updates
```typescript
// Navigate categories → Create product → Set pricing → Update stock
const parents = await sdk.products.getParentAll();
const product = await sdk.products.createProduct({ ... });
await sdk.products.updatePricing([{ nmID, price: 1999 }]);
await sdk.products.updateStock({ stocks: [{ sku, amount: 100 }] });
```

### FBS Order Fulfillment
[**`orders-fbs-fulfillment.ts`**](./examples/orders-fbs-fulfillment.ts) - Complete seller fulfillment workflow
```typescript
// Fetch orders → Create supply → Add to supply → Generate labels → Deliver
const orders = await sdk.ordersFBS.getNewOrders();
const supply = await sdk.ordersFBS.createSupply('My Supply');
await sdk.ordersFBS.addOrderToSupply(supply.id, order.id);
const stickers = await sdk.ordersFBS.getOrderStickers([order.id], { type: 'png' });
await sdk.ordersFBS.deliverSupply(supply.id);
```

### FBW Warehouse Integration
[**`orders-fbw-fulfillment.ts`**](./examples/orders-fbw-fulfillment.ts) - WB warehouse supply planning
```typescript
// Get warehouses → Check coefficients → Validate goods → Track supplies
const warehouses = await sdk.ordersFBW.getWarehouses();
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
const options = await sdk.ordersFBW.getAcceptanceOptions(goods);
const supplies = await sdk.ordersFBW.getSupplies({ ... });
```

### Finances & Reporting
[**`finances-reports-payouts.ts`**](./examples/finances-reports-payouts.ts) - Complete financial management workflow
```typescript
// Check balance → Get transactions → Generate reports → Track payouts
const balance = await sdk.finances.getBalance();
const transactions = await sdk.finances.getTransactions({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  period: 'weekly'
});
const report = await sdk.finances.generateReport({ ... });
```

### Analytics Dashboard
[**`analytics-dashboard.ts`**](./examples/analytics-dashboard.ts) - Comprehensive analytics and performance tracking
```typescript
// Sales funnel → Product performance → Search optimization → CSV reports
const funnel = await sdk.analytics.getSalesFunnel({
  period: { begin: '2024-01-01 00:00:00', end: '2024-01-31 23:59:59' }
});

const performance = await sdk.analytics.getProductPerformance(
  [12345, 67890],
  { from: '2024-01-01', to: '2024-01-31' }
);

const queries = await sdk.analytics.getSearchQueries({
  from: '2024-01-01',
  to: '2024-01-31'
});
```

### Customer Communications
[**`customer-support.ts`**](./examples/customer-support.ts) - Chat, Q&A, and Reviews management
```typescript
// Chat: Get all chats → Poll for events → Send messages → Auto-respond
const chats = await sdk.communications.getChats();
const events = await sdk.communications.getChatEvents();
await sdk.communications.sendMessage(replySign, 'Thank you for your message!');

// Q&A: Get and answer product questions
const questions = await sdk.communications.getQuestions({ isAnswered: false, take: 10, skip: 0 });
await sdk.communications.answerQuestion(questionId, 'This product is made of cotton.');

// Reviews: Get and respond to customer reviews
const reviews = await sdk.communications.getReviews({ isAnswered: false, take: 10, skip: 0 });
await sdk.communications.respondToReview(reviewId, 'Thank you for your feedback!');
```

### Cross-Module Integration Examples

Build comprehensive business workflows by combining data from multiple API modules.

#### Business Dashboard
[**`business-dashboard.ts`**](./examples/business-dashboard.ts) - Real-time business intelligence combining Finances, Analytics, and Communications
```typescript
// Combine financial data, sales metrics, and customer sentiment
const dashboard = await generateBusinessDashboard(sdk);

console.log('Current Balance:', dashboard.financials.currentBalance);
console.log('Revenue (30d):', dashboard.financials.totalRevenue);
console.log('Conversion Rate:', dashboard.performance.conversionRate + '%');
console.log('Average Rating:', dashboard.customerSentiment.averageRating + '/5');
console.log('Products Needing Attention:', dashboard.customerSentiment.productsNeedingAttention.length);
```
**Modules**: Finances, Analytics, Communications
**Use Case**: Daily business monitoring and KPI tracking
**Performance**: 10-20 seconds per generation

#### Financial Reconciliation
[**`financial-reconciliation.ts`**](./examples/financial-reconciliation.ts) - Match transactions to sales data with discrepancy detection
```typescript
// Match financial transactions to order sales data
const reconciliation = await reconcileFinancials(sdk, {
  from: '2024-01-01',
  to: '2024-01-31'
});

console.log('Match Rate:', reconciliation.metrics.matchRate + '%');
console.log('Matched:', reconciliation.matched.length + ' transactions');
console.log('Discrepancies:', reconciliation.discrepancies.length + ' issues');
console.log('Total Discrepancy Amount:', reconciliation.metrics.totalDiscrepancyAmount);
```
**Modules**: Finances, Reports
**Use Case**: Monthly financial reconciliation and audit preparation
**Performance**: 30-60 seconds for monthly data

#### Customer Engagement
[**`customer-engagement.ts`**](./examples/customer-engagement.ts) - Unified customer service workflow with priority scoring
```typescript
// Combine reviews, Q&A, and urgency scoring for customer support
const engagement = await analyzeCustomerEngagement(sdk);

console.log('Urgent Actions:', engagement.urgentActions.negativeReviews.length + ' negative reviews');
console.log('Unanswered Questions:', engagement.urgentActions.unansweredQuestions.length);
console.log('Customer Satisfaction:', engagement.metrics.customerSatisfaction + '%');

// Top priority products
engagement.priorities.slice(0, 10).forEach(priority => {
  console.log(`Product ${priority.productId}: ${priority.urgencyScore} - ${priority.actions.join(', ')}`);
});
```
**Modules**: Communications (Reviews, Q&A)
**Use Case**: Customer support prioritization and response management
**Performance**: 15-30 seconds per refresh

#### Business Intelligence Export
[**`export-to-bi.ts`**](./examples/export-to-bi.ts) - Export multi-module data for BI tools and data warehouses
```typescript
// Export comprehensive data from all modules to CSV and JSON
const exportResult = await exportToBI(sdk, {
  from: '2024-01-01',
  to: '2024-01-31',
  outputDir: './exports'
});

console.log('Export Statistics:');
console.log('Total Records:', exportResult.statistics.totalRecords);
console.log('Finance Records:', exportResult.statistics.byType.finance);
console.log('Sales Records:', exportResult.statistics.byType.sales);
console.log('Review Records:', exportResult.statistics.byType.reviews);
console.log('Files Generated:', exportResult.files.csv + ', ' + exportResult.files.json);
```
**Modules**: Finances, Analytics, Reports, Communications
**Use Case**: Data warehouse population, analytics pipelines, external BI tools
**Performance**: 2-5 minutes for full export

#### Cross-Module Best Practices

**Rate Limit Management**
- Space API calls across modules with 60-second delays
- Sequential execution prevents rate limit conflicts
- Examples include automatic rate limit handling

**Error Handling**
- Graceful degradation when one module fails
- Per-module try-catch blocks maintain partial functionality
- Comprehensive error logging for debugging

**Performance Optimization**
- Parallel fetching where modules allow
- Pagination for large datasets (>80K rows)
- Memory-efficient streaming for exports

**Data Correlation**
- Use `nmId` (product ID) as primary correlation key
- Match transactions by `saleID` and amount
- Account for timing lag (up to 72 hours) between events

**[View all examples →](./examples/README.md)**

---

## Usage

### Configuration

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: 'your-api-key',          // Required
  timeout: 30000,                  // Optional: request timeout in ms (default: 30000)
  retryConfig: {
    maxRetries: 3,                 // Optional: max retry attempts (default: 3)
    retryDelay: 1000,              // Optional: initial retry delay in ms (default: 1000)
    exponentialBackoff: true       // Optional: use exponential backoff (default: true)
  },
  logLevel: 'info'                 // Optional: 'debug' | 'info' | 'warn' | 'error' (default: 'warn')
});
```

### API Modules

The SDK exposes all 11 API modules (✅ **All Epics Complete - Production Ready**):

#### ✅ Available Now (All Phases Complete)

**General Module** (`sdk.general`)
- Ping endpoint for connectivity testing
- Server timestamps
- Seller information retrieval
- Latest news and updates

**Products Module** (`sdk.products`)
- Category navigation (parent categories, subcategories, characteristics)
- Product CRUD operations (create, read, update, delete)
- Media management (images, videos)
- Pricing updates (individual and bulk)
- Warehouse assignment
- Stock management (high throughput: 1000 req/min)

**Orders FBS Module** (`sdk.ordersFBS` - Fulfillment by Seller)
- New order retrieval and filtering
- Order status tracking and updates
- Supply creation and management
- Shipping label generation (PNG/SVG/ZPL formats)
- Barcode and QR code retrieval (base64 encoded)
- Order confirmation and delivery workflows

**Orders FBW Module** (`sdk.ordersFBW` - Fulfillment by Wildberries)
- Warehouse information and availability
- Acceptance coefficient checking (14 days ahead)
- Acceptance options for goods validation
- Supply tracking and management
- Transit tariff calculation
- Goods and package information retrieval

**Finances Module** (`sdk.finances`)
- Real-time account balance retrieval
- Detailed transaction history with filters
- Financial reports by period (daily, weekly, monthly)
- Payout tracking and history
- Document management (invoices, receipts)
- Multi-currency support (RUB, USD, EUR, CNY)

**Analytics Module** (`sdk.analytics`)
- **Sales Funnel Analysis**: Track conversion from views → add to cart → orders → purchases
- **Product Performance**: Revenue, units sold, conversion rates, return rates
- **Search Query Analytics**: Identify high-volume queries and optimization opportunities
- **Category Performance**: Aggregate metrics and top product identification
- **Time-Series Data**: Daily performance trends and historical analysis
- **CSV Report Generation**: Async report generation with download links
- **Period Comparison**: Compare current vs. previous period metrics

**Communications Module** (`sdk.communications`)
- **Chat Management**: Get all customer chat conversations with cursor pagination
- **Event-Based Architecture**: Single event stream for all chats with real-time polling
- **Message Sending**: Send text messages with file attachments (JPEG, PDF, PNG)
- **Product Q&A**: Get product questions, answer or reject questions, track status
- **Customer Reviews**: Get reviews with photos/videos, respond to reviews, edit responses
- **Sentiment Analysis**: Filter reviews by rating (1-5 stars) for prioritized responses
- **Helper Methods**: Filter events by chatID, sender, extract replySign

**Reports Module** (`sdk.reports`)
- **Income Reports**: Retrieve income data with date filtering and pagination
- **Stock Reports**: Get stock levels across warehouses with date-based queries
- **Sales Reports**: Period-based sales reporting (daily, weekly, monthly)
- **Warehouse Remains**: Async report generation for detailed warehouse inventory
- **Excise Reports**: Compliance reporting for excise goods
- **CSV Export**: Download reports in CSV format for external analysis

**Promotion Module** (`sdk.promotion`)
- **Campaign Management**: Create, update, pause, and resume advertising campaigns
- **Statistics & Analytics**: Track campaign performance, impressions, clicks, conversions
- **Budget Management**: Set and monitor daily/total campaign budgets
- **Bid Optimization**: Get minimum bids, set custom bids for better ad placement
- **Product Targeting**: Subject-based targeting for precise audience reach
- **Auto-Campaigns**: Automated campaign creation with smart bidding

**Tariffs Module** (`sdk.tariffs`)
- **Commission Lookup**: Get commission rates by product category and subcategory
- **Storage Tariffs**: Box and pallet storage cost calculation
- **Return Handling**: Return processing fee lookup
- **Tariff History**: Access historical tariff data for trend analysis
- **Multi-Warehouse**: Warehouse-specific tariff information

**In-Store Pickup Module** (`sdk.inStorePickup`)
- **Click & Collect Orders**: Manage customer pickup orders from retail locations
- **Order Assembly**: Prepare orders for customer pickup with workflow tracking
- **Identity Verification**: Verify customer identity using passcodes and order codes
- **Metadata Management**: Handle UIN, IMEI, GTIN, SGTIN codes for products
- **Status Tracking**: Monitor order lifecycle from new → prepared → received
- **Error Handling**: Comprehensive validation for pickup-specific business rules

**Current SDK Status**: 🚀 **v1.0.0 Released - Production Ready - All 11 Modules Complete**

### Error Handling

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError
} from 'daytona-wildberries-typescript-sdk';

try {
  const sellerInfo = await sdk.general.sellerInfo();
  console.log('Seller:', sellerInfo.name);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Validation failed:', error.fieldErrors);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded, retry after:', error.retryAfter);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  }
}
```

---

## Analytics Module Deep Dive

The Analytics module provides comprehensive sales performance metrics and insights to optimize your marketplace presence.

### Sales Funnel Analysis

Track the complete customer journey from product views to purchases:

```typescript
const funnel = await sdk.analytics.getSalesFunnel({
  period: {
    begin: '2024-01-01 00:00:00',
    end: '2024-01-31 23:59:59'
  },
  page: 1,
  pageSize: 100
});

// Access funnel metrics for each product
funnel.data.cards.forEach(card => {
  const stats = card.statistics.selectedPeriod;
  console.log(`Product ${card.nmID}:`);
  console.log(`  Views: ${stats.openCardCount}`);
  console.log(`  Add to Cart: ${stats.addToCartCount} (${stats.conversions.addToCartPercent}%)`);
  console.log(`  Orders: ${stats.ordersCount} (${stats.conversions.cartToOrderPercent}%)`);
  console.log(`  Purchases: ${stats.buyoutsCount} (${stats.conversions.buyoutsPercent}%)`);
  console.log(`  Revenue: ${stats.buyoutsSumRub} RUB`);

  // Compare with previous period
  const growth = card.statistics.periodComparison;
  console.log(`  Revenue Growth: ${growth.buyoutsSumRubDynamics}%`);
});
```

**Conversion Metrics Explained:**
- `addToCartPercent`: (Add to Cart / Views) × 100
- `cartToOrderPercent`: (Orders / Add to Cart) × 100
- `buyoutsPercent`: (Purchases / Views) × 100

### Product Performance Tracking

Compare performance across multiple products:

```typescript
const performance = await sdk.analytics.getProductPerformance(
  [12345, 67890, 11111],  // Product IDs (max 50)
  { from: '2024-01-01', to: '2024-01-31' }
);

// Sort by revenue
const topProducts = performance.products
  .sort((a, b) => b.revenue - a.revenue);

topProducts.forEach(product => {
  console.log(`${product.productName || product.nmID}:`);
  console.log(`  Revenue: ${product.revenue.toLocaleString()} RUB`);
  console.log(`  Units Sold: ${product.unitsSold}`);
  console.log(`  Conversion Rate: ${product.conversionRate.toFixed(2)}%`);
  console.log(`  Return Rate: ${product.returnRate.toFixed(2)}%`);
});
```

**Return Rate Calculation:**
```
Return Rate = (Cancelled Orders / Total Orders) × 100
```

### Search Query Optimization

Identify high-volume search queries and optimization opportunities:

```typescript
const queries = await sdk.analytics.getSearchQueries({
  from: '2024-01-01',
  to: '2024-01-31'
});

// Find top queries by search volume
const topQueries = queries.data
  .sort((a, b) => b.searchCount - a.searchCount)
  .slice(0, 10);

// Identify optimization opportunities (high volume, low conversion)
const opportunities = queries.data
  .filter(q => q.searchCount > 1000 && q.conversionRate < 2)
  .sort((a, b) => b.searchCount - a.searchCount);

opportunities.forEach(query => {
  console.log(`Optimize for: "${query.query}"`);
  console.log(`  Searches: ${query.searchCount.toLocaleString()}`);
  console.log(`  Current Conversion: ${query.conversionRate.toFixed(2)}%`);
  console.log(`  Potential: Improve product titles/descriptions`);
});
```

### Category Performance Analysis

Aggregate metrics at category level:

```typescript
const category = await sdk.analytics.getCategoryPerformance(
  '447',  // Category ID
  { from: '2024-01-01', to: '2024-01-31' }
);

console.log(`Category: ${category.data.categoryName}`);
console.log(`Total Products: ${category.data.productCount}`);
console.log(`Total Revenue: ${category.data.revenue.toLocaleString()} RUB`);
console.log(`Average Revenue per Product: ${(category.data.revenue / category.data.productCount).toLocaleString()} RUB`);

// Top performers in category
category.data.topProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name}: ${product.revenue.toLocaleString()} RUB`);
});
```

### Time-Series Product History

Analyze daily performance trends:

```typescript
const history = await sdk.analytics.getProductHistory({
  period: {
    begin: '2024-01-01 00:00:00',
    end: '2024-01-07 23:59:59'
  },
  nmIDs: [12345, 67890]
});

history.data.forEach(product => {
  console.log(`\nProduct: ${product.brandName} (${product.nmID})`);

  product.history.forEach(day => {
    console.log(`  ${day.date}:`);
    console.log(`    Views: ${day.openCardCount}`);
    console.log(`    Purchases: ${day.buyoutsCount}`);
    console.log(`    Revenue: ${day.buyoutsSumRub} RUB`);
    console.log(`    Conversion: ${day.conversions.buyoutsPercent.toFixed(2)}%`);
  });
});
```

### CSV Report Generation

Generate downloadable CSV reports asynchronously:

```typescript
// Initiate report generation
const reportGen = await sdk.analytics.generateReport({
  reportType: 'sales_funnel',
  dateRange: { from: '2024-01-01', to: '2024-01-31' },
  format: 'CSV'
});

console.log(`Report ID: ${reportGen.reportId}`);
console.log(`Status: ${reportGen.status}`);

// Poll for completion (typically 30-60 seconds)
let report = await sdk.analytics.getReport(reportGen.reportId);

while (report.status === 'pending' || report.status === 'processing') {
  await new Promise(resolve => setTimeout(resolve, 5000));
  report = await sdk.analytics.getReport(reportGen.reportId);
}

// Download when ready
if (report.status === 'completed') {
  const download = await sdk.analytics.downloadReport(reportGen.reportId);
  console.log(`Download URL: ${download.url}`);
  console.log(`Expires: ${download.expiresAt}`);
}
```

### Rate Limits

Analytics endpoints have specific rate limits:

| Endpoint | Limit | Interval | Burst |
|----------|-------|----------|-------|
| `getSalesFunnel()` | 3 requests | 1 minute | 3 |
| `getProductHistory()` | 3 requests | 1 minute | 3 |
| `getSearchQueries()` | 10 requests | 1 minute | 10 |
| `generateReport()` | 1 request | 10 seconds | 1 |
| `getReport()` | 10 requests | 1 minute | 10 |

The SDK automatically enforces these limits. If you exceed them, a `RateLimitError` is thrown with `retryAfter` information.

### Troubleshooting

#### Date Range Validation Errors

**Error**: `ValidationError: Invalid date range: from date must be before to date`

**Solution**: Ensure `from` date is chronologically before `to` date:
```typescript
// ❌ Wrong
const data = await sdk.analytics.getProductPerformance(
  [12345],
  { from: '2024-01-31', to: '2024-01-01' }  // from > to
);

// ✅ Correct
const data = await sdk.analytics.getProductPerformance(
  [12345],
  { from: '2024-01-01', to: '2024-01-31' }
);
```

#### Period Format Errors

**Error**: `ValidationError: Invalid period format`

**Solution**: Use full datetime format `YYYY-MM-DD HH:MM:SS` for period-based methods:
```typescript
// ❌ Wrong
const funnel = await sdk.analytics.getSalesFunnel({
  period: { begin: '2024-01-01', end: '2024-01-31' }
});

// ✅ Correct
const funnel = await sdk.analytics.getSalesFunnel({
  period: { begin: '2024-01-01 00:00:00', end: '2024-01-31 23:59:59' }
});
```

#### Bulk Product Request Limits

**Error**: `ValidationError: Product IDs array cannot exceed 50 items`

**Solution**: Split large product lists into chunks of 50 or fewer:
```typescript
const productIds = [/* 100 product IDs */];
const chunkSize = 50;

const chunks = [];
for (let i = 0; i < productIds.length; i += chunkSize) {
  chunks.push(productIds.slice(i, i + chunkSize));
}

const results = await Promise.all(
  chunks.map(chunk =>
    sdk.analytics.getProductPerformance(chunk, dateRange)
  )
);

// Combine results
const allProducts = results.flatMap(r => r.products);
```

#### Category ID Format

**Error**: `ValidationError: Category ID cannot be empty`

**Solution**: Ensure category ID is provided as string:
```typescript
// ❌ Wrong
const data = await sdk.analytics.getCategoryPerformance('', dateRange);

// ✅ Correct
const data = await sdk.analytics.getCategoryPerformance('447', dateRange);
```

#### Report Download Errors

**Error**: `ValidationError: Report is not ready for download`

**Solution**: Wait for report status to be 'completed' before downloading:
```typescript
const reportGen = await sdk.analytics.generateReport({ ... });

// Poll until completed
let report = await sdk.analytics.getReport(reportGen.reportId);
while (report.status !== 'completed') {
  if (report.status === 'failed') {
    throw new Error('Report generation failed');
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
  report = await sdk.analytics.getReport(reportGen.reportId);
}

// Now safe to download
const download = await sdk.analytics.downloadReport(reportGen.reportId);
```

### Stock History Analysis

Track inventory changes over time to identify sales patterns, stock-outs, and optimization opportunities:

```typescript
// Retrieve stock history for a product
const stockHistory = await sdk.analytics.getStockHistory(
  'prod_12345',  // Product ID
  { from: '2024-01-01', to: '2024-01-31' }
);

console.log(`Product ${stockHistory.nmID} Stock Analysis:`);
console.log(`  Total Sales: ${stockHistory.summary.totalSales}`);
console.log(`  Total Returns: ${stockHistory.summary.totalReturns}`);
console.log(`  Net Change: ${stockHistory.summary.netChange}`);
console.log(`  Avg Daily Velocity: ${stockHistory.summary.avgDailyVelocity.toFixed(2)} units/day`);

// Analyze individual changes
stockHistory.changes.forEach(change => {
  const direction = change.changeAmount > 0 ? '▲' : '▼';
  console.log(`${change.timestamp} ${direction} ${Math.abs(change.changeAmount)} (${change.reason})`);

  if (change.metadata?.orderId) {
    console.log(`  Order: ${change.metadata.orderId}`);
  }
  if (change.metadata?.warehouseId) {
    console.log(`  Warehouse: ${change.metadata.warehouseId}`);
  }
});
```

**Stock Change Reasons:**
- `sale` - Product sold through marketplace
- `return` - Customer return processed
- `adjustment` - Manual inventory adjustment
- `transfer` - Transfer between warehouses
- `damaged` - Damaged goods removed from inventory
- `lost` - Lost or unaccounted inventory

**Use Cases:**
- Identify stock-out periods and lost sales opportunities
- Calculate optimal restock levels based on velocity
- Detect anomalies (sudden drops, suspicious adjustments)
- Forecast future inventory needs using historical patterns

**Stock Velocity Calculation:**
```typescript
// Helper: Calculate daily stock velocity
function calculateDailyVelocity(changes: StockHistoryEntry[]): number {
  const sales = changes.filter(c => c.reason === 'sale');
  const totalSold = sales.reduce((sum, c) => sum + Math.abs(c.changeAmount), 0);
  const days = Math.max(1, new Set(sales.map(c => c.timestamp.split('T')[0])).size);
  return totalSold / days;
}

const velocity = calculateDailyVelocity(stockHistory.changes);
console.log(`Daily velocity: ${velocity.toFixed(2)} units/day`);

// Predict restock date
const currentStock = 50;
const daysUntilStockout = Math.ceil(currentStock / velocity);
const restockDate = new Date();
restockDate.setDate(restockDate.getDate() + daysUntilStockout);
console.log(`Predicted stock-out: ${restockDate.toLocaleDateString()}`);
```

### CSV Export and BI Integration

Generate CSV reports asynchronously for integration with Excel, Tableau, Power BI, and other analytics tools:

```typescript
// Initiate CSV export with custom format options
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['sales_funnel', 'product_performance'],  // Report types
  { from: '2024-01-01', to: '2024-12-31' },
  {
    delimiter: ',',           // ',' | ';' | '\t'
    includeHeaders: true,     // Column headers
    encoding: 'utf-8-bom'     // UTF-8 with BOM for Excel
  }
);

console.log(`Export initiated: ${csvExport.reportId}`);
console.log(`Status: ${csvExport.status}`);  // 'pending' | 'processing' | 'completed'

// Poll for completion (typically 30-120 seconds for large datasets)
let csvReport = await sdk.analytics.getCSVReportStatus(csvExport.reportId);
let attempts = 0;
const maxAttempts = 24;  // 2 minutes with 5s intervals

while (csvReport.status !== 'completed' && attempts < maxAttempts) {
  if (csvReport.status === 'failed') {
    throw new Error(`CSV export failed: ${csvReport.error}`);
  }

  await new Promise(resolve => setTimeout(resolve, 5000));
  csvReport = await sdk.analytics.getCSVReportStatus(csvExport.reportId);
  attempts++;

  console.log(`[${attempts}/${maxAttempts}] Status: ${csvReport.status}`);
}

// Download when ready
if (csvReport.status === 'completed') {
  const download = await sdk.analytics.downloadCSVReport(csvExport.reportId);

  console.log(`\nCSV Report Ready:`);
  console.log(`  Download URL: ${download.downloadUrl}`);
  console.log(`  File Size: ${(download.fileSize! / 1024).toFixed(2)} KB`);
  console.log(`  Rows: ${download.rowCount?.toLocaleString()}`);
  console.log(`  Expires: ${download.expiresAt}`);  // Typically 24-48 hours
}
```

**CSV Format Options:**

| Option | Values | Use Case |
|--------|--------|----------|
| `delimiter` | `,` (default) | Standard CSV for most BI tools |
| | `;` | European Excel (regional settings) |
| | `\t` | Tab-delimited for data import tools |
| `includeHeaders` | `true` (default) | Column names in first row |
| | `false` | Data only (custom header processing) |
| `encoding` | `utf-8` (default) | Modern tools, databases |
| | `utf-8-bom` | Excel on Windows (auto-detection) |

**BI Tool Integration Examples:**

**Tableau:**
```typescript
// Export with standard CSV format
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['product_performance'],
  dateRange,
  { delimiter: ',', includeHeaders: true, encoding: 'utf-8' }
);

// Import in Tableau:
// 1. Data → New Data Source → Text file
// 2. Select downloaded CSV
// 3. Data interpreter will auto-detect columns
// 4. Join with product dimensions if needed
```

**Power BI:**
```typescript
// Export with UTF-8 BOM for proper encoding detection
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['sales_funnel'],
  dateRange,
  { delimiter: ',', includeHeaders: true, encoding: 'utf-8-bom' }
);

// Import in Power BI:
// 1. Get Data → Text/CSV
// 2. Select downloaded file
// 3. Power Query Editor will auto-detect encoding
// 4. Transform data and create relationships
```

**Excel (European settings):**
```typescript
// Use semicolon delimiter for European regional settings
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['product_performance'],
  dateRange,
  { delimiter: ';', includeHeaders: true, encoding: 'utf-8-bom' }
);

// Open in Excel:
// - Double-click CSV file
// - Excel auto-detects semicolon delimiter
// - UTF-8 BOM ensures proper character encoding
```

**Python/R Analysis:**
```typescript
// Standard CSV for pandas/tidyverse
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['sales_funnel', 'product_performance'],
  dateRange,
  { delimiter: ',', includeHeaders: true, encoding: 'utf-8' }
);

// Python pandas:
// import pandas as pd
// df = pd.read_csv('report.csv', encoding='utf-8')

// R tidyverse:
// library(readr)
// df <- read_csv('report.csv')
```

**Rate Limits for CSV Export:**

| Endpoint | Limit | Interval | Notes |
|----------|-------|----------|-------|
| `exportAnalyticsCSV()` | 1 request | 10 seconds | Prevents server overload |
| `getCSVReportStatus()` | 10 requests | 1 minute | Polling allowed |
| `downloadCSVReport()` | 5 requests | 1 minute | Download URL valid 24-48h |

**Troubleshooting CSV Export:**

#### Export Timeout

**Error**: `ValidationError: CSV export timeout after 120 seconds`

**Solution**: Large date ranges may take longer. Break into smaller chunks:
```typescript
// ❌ Large date range (may timeout)
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['sales_funnel'],
  { from: '2020-01-01', to: '2024-12-31' }  // 5 years
);

// ✅ Split into quarterly exports
const quarters = [
  { from: '2024-01-01', to: '2024-03-31' },
  { from: '2024-04-01', to: '2024-06-30' },
  { from: '2024-07-01', to: '2024-09-30' },
  { from: '2024-10-01', to: '2024-12-31' },
];

const exports = await Promise.all(
  quarters.map(range =>
    sdk.analytics.exportAnalyticsCSV(['sales_funnel'], range)
  )
);
```

#### Encoding Issues in Excel

**Problem**: Excel displays garbled characters (Cyrillic text)

**Solution**: Use UTF-8 BOM encoding:
```typescript
// ❌ Standard UTF-8 (may not work in Excel on Windows)
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['product_performance'],
  dateRange,
  { encoding: 'utf-8' }
);

// ✅ UTF-8 with BOM (Excel auto-detects)
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['product_performance'],
  dateRange,
  { encoding: 'utf-8-bom' }
);
```

#### Download URL Expired

**Error**: `NetworkError: HTTP error 404` when downloading CSV

**Solution**: Download URLs typically expire after 24-48 hours. Regenerate if expired:
```typescript
const csvReport = await sdk.analytics.getCSVReportStatus(reportId);

if (!csvReport.downloadUrl) {
  // URL expired, regenerate report
  console.log('Download URL expired, regenerating report...');
  const newExport = await sdk.analytics.exportAnalyticsCSV(
    reportTypes,
    dateRange,
    options
  );
  // ... wait for completion and download
}
```

#### Invalid Report Type

**Error**: `ValidationError: Invalid report type: "invalid_type"`

**Solution**: Use only supported report types:
```typescript
// ❌ Invalid report type
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['invalid_type'],  // Not supported
  dateRange
);

// ✅ Valid report types
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  ['sales_funnel', 'product_performance'],  // Supported types
  dateRange
);
```

**Supported Report Types:**
- `sales_funnel` - Complete conversion funnel metrics
- `product_performance` - Revenue, units sold, conversion rates
- Additional types may be added in future SDK versions

---

## Communications Module Deep Dive

The Communications module provides real-time customer chat capabilities with an event-based architecture for efficient message handling.

### Event-Based Architecture

**Key Concept**: Single unified event stream for ALL chats (not per-chat streams).

```typescript
// Retrieve all events across all chats
const eventsResponse = await sdk.communications.getChatEvents();

console.log(`Total events: ${eventsResponse.result.totalEvents}`);
console.log(`Events in this batch: ${eventsResponse.result.events.length}`);

// Filter client-side for specific chats
const chatID = 'specific-chat-id';
const chatEvents = sdk.communications.filterEventsByChatID(
  eventsResponse.result.events,
  chatID
);
```

**Why Event-Based?**
- **Efficiency**: Single API call retrieves all updates across all conversations
- **Scalability**: Handle hundreds of chats without individual polling
- **Simplicity**: No need to track individual chat subscriptions

### Get All Chats

Retrieve all active customer conversations:

```typescript
const chatsResponse = await sdk.communications.getChats();

chatsResponse.result.forEach(chat => {
  console.log(`Chat ID: ${chat.chatID}`);
  console.log(`Customer: ${chat.clientName} (ID: ${chat.clientID})`);
  console.log(`Reply Sign: ${chat.replySign}`);

  if (chat.goodCard) {
    console.log(`Product: ${chat.goodCard.nmID}`);
    console.log(`Order: ${chat.goodCard.rid}`);
    console.log(`Status: ${chat.goodCard.statusID}`);
  }
});
```

**Chat Object Fields:**
- `chatID` - Unique chat identifier
- `replySign` - Required for sending messages
- `clientID` / `clientName` - Customer information
- `goodCard` - Associated order/product information (optional)

### Cursor-Based Pagination

Retrieve historical events using cursor pagination:

```typescript
// Fetch all historical events
const allEvents: ChatEvent[] = [];
let cursor: number | undefined;

do {
  const eventsResponse = await sdk.communications.getChatEvents(cursor);
  allEvents.push(...eventsResponse.result.events);
  cursor = eventsResponse.result.next;

  // Stop when no more events
  if (eventsResponse.result.totalEvents === 0) {
    break;
  }
} while (cursor);

console.log(`Retrieved ${allEvents.length} total events`);
```

**Cursor Format**: Unix timestamp with milliseconds (e.g., `1698045576000`)

### Sending Messages

Send text messages with optional file attachments:

```typescript
// Text-only message
const replySign = chat.replySign;
await sdk.communications.sendMessage(
  replySign,
  'Thank you for your message! We will respond shortly.'
);

// Message with file attachments
import { readFileSync } from 'fs';

const invoiceBuffer = readFileSync('invoice.pdf');
const invoiceBlob = new Blob([invoiceBuffer], { type: 'application/pdf' });

await sdk.communications.sendMessage(
  replySign,
  'Here is your invoice.',
  [invoiceBlob]
);
```

**File Upload Limits:**
- Supported formats: JPEG, PDF, PNG
- Max file size: 5MB per file
- Max total size: 30MB per message
- Content-Type: `multipart/form-data` (handled automatically)

**Validation Rules:**
- `replySign` - Required, max 255 characters
- `message` - Optional, max 1000 characters
- At least one of `message` or `files` must be provided

### Real-Time Event Polling

Automatically poll for new events with cursor tracking:

```typescript
// Start polling every 10 seconds
const polling = sdk.communications.pollForNewEvents(10000, async (events) => {
  if (events.length === 0) {
    console.log('No new events');
    return;
  }

  console.log(`Received ${events.length} new event(s)`);

  for (const event of events) {
    console.log(`${event.sender}: ${event.message?.text}`);

    // Auto-respond to new customer messages
    if (event.sender === 'client' && event.isNewChat && event.replySign) {
      await sdk.communications.sendMessage(
        event.replySign,
        'Thank you for contacting us! A support agent will assist you shortly.'
      );
    }
  }
});

// Stop polling after 1 hour
setTimeout(() => {
  polling.stop();
  console.log('Polling stopped');
}, 3600000);
```

**Polling Features:**
- Automatic cursor advancement
- Configurable poll interval (recommended: 10-30 seconds)
- Async callback support
- Manual stop control

### Helper Methods

Filter and process events efficiently:

```typescript
const eventsResponse = await sdk.communications.getChatEvents();
const events = eventsResponse.result.events;

// 1. Filter by specific chat
const chatEvents = sdk.communications.filterEventsByChatID(events, chatID);
console.log(`Events for chat ${chatID}: ${chatEvents.length}`);

// 2. Get only customer messages
const customerMessages = sdk.communications.getClientMessages(events);
console.log(`Customer messages: ${customerMessages.length}`);

// 3. Extract replySign from Chat
const chat = chatsResponse.result[0];
const replySign = sdk.communications.getReplySignFromChat(chat);

// 4. Extract replySign from new chat event
const newChatEvent = events.find(e => e.isNewChat);
const eventReplySign = sdk.communications.getReplySignFromEvent(newChatEvent);
```

### Chat Event Types

**Event Object Fields:**
- `chatID` - Chat identifier
- `eventID` - Unique event identifier
- `eventType` - Event type (currently only `'message'`)
- `isNewChat` - Boolean indicating new conversation start
- `message` - Message content and attachments
- `sender` - `'client'` | `'seller'` | `'wb'`
- `addTime` - Timestamp (RFC 3339 format)
- `addTimestamp` - Unix timestamp with milliseconds
- `replySign` - Available only when `isNewChat: true`

**Sender Types:**
- `client` - Customer message
- `seller` - Your message (sent via API or seller portal)
- `wb` - Wildberries system message

### Rate Limits

Communications endpoints have specific rate limits:

| Endpoint | Limit | Interval | Burst |
|----------|-------|----------|-------|
| `getChats()` | 10 requests | 10 seconds | 10 |
| `getChatEvents()` | 10 requests | 10 seconds | 10 |
| `sendMessage()` | 10 requests | 10 seconds | 10 |

**Best Practices:**
- Use polling intervals of 10+ seconds
- Batch message sends when possible
- Cache chat list to reduce `getChats()` calls

### Troubleshooting

#### Invalid replySign Error

**Error**: `ValidationError: replySign is required and cannot be empty`

**Solution**: Obtain replySign from Chat or new chat events:

```typescript
// From Chat object
const chats = await sdk.communications.getChats();
const replySign = chats.result[0].replySign;

// From new chat event
const events = await sdk.communications.getChatEvents();
const newChatEvent = events.result.events.find(e => e.isNewChat);
const eventReplySign = newChatEvent?.replySign;
```

#### Message Too Long Error

**Error**: `ValidationError: Message cannot exceed 1000 characters`

**Solution**: Split long messages or provide concise responses:

```typescript
const longMessage = "..."; // 1500 characters

// ❌ Wrong
await sdk.communications.sendMessage(replySign, longMessage);

// ✅ Correct - split into multiple messages
const part1 = longMessage.slice(0, 1000);
const part2 = longMessage.slice(1000);

await sdk.communications.sendMessage(replySign, part1);
await sdk.communications.sendMessage(replySign, part2);
```

#### No Events Returned

**Issue**: `getChatEvents()` returns empty array

**Possible Causes:**
1. No new events since last cursor
2. All events already retrieved
3. No active chats

**Solution**: Verify with total events count:

```typescript
const eventsResponse = await sdk.communications.getChatEvents();

if (eventsResponse.result.totalEvents === 0) {
  console.log('No events in this batch (all caught up)');
} else {
  console.log(`${eventsResponse.result.totalEvents} events available`);
}
```

#### File Upload Errors

**Error**: `ValidationError: File size exceeds 5MB limit`

**Solution**: Compress or resize files before upload:

```typescript
// Check file size before upload
const maxFileSize = 5 * 1024 * 1024; // 5MB

if (file.size > maxFileSize) {
  console.error('File too large. Please compress or resize.');
} else {
  await sdk.communications.sendMessage(replySign, 'Attachment:', [file]);
}
```

### Complete Workflow Example

Build an automated customer support system:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Auto-responder for common questions
const autoResponses: Record<string, string> = {
  'доставка': 'Доставка обычно занимает 3-5 рабочих дней.',
  'возврат': 'Вы можете вернуть товар в течение 14 дней после получения.',
  'оплата': 'Мы принимаем карты, наличные при получении и онлайн-платежи.'
};

// Start real-time polling
sdk.communications.pollForNewEvents(15000, async (events) => {
  for (const event of events) {
    // Only process customer messages
    if (event.sender !== 'client') continue;

    const messageText = event.message?.text?.toLowerCase() || '';

    // Auto-respond to common questions
    for (const [keyword, response] of Object.entries(autoResponses)) {
      if (messageText.includes(keyword)) {
        if (event.isNewChat && event.replySign) {
          await sdk.communications.sendMessage(event.replySign, response);
          console.log(`Auto-responded to: "${keyword}"`);
        }
        break;
      }
    }

    // Log unanswered questions for human review
    if (event.isNewChat && !Object.keys(autoResponses).some(k => messageText.includes(k))) {
      console.log(`⚠️  Needs human review: ${event.clientName} - "${event.message?.text}"`);
    }
  }
});

console.log('Auto-responder started. Press Ctrl+C to stop.');
```

### Product Q&A Management

Handle customer questions about products with answer, reject, and status tracking capabilities.

#### Get Product Questions

Retrieve questions with filtering by answered status, product ID, and date range:

```typescript
// Get unanswered questions
const unansweredQuestions = await sdk.communications.getQuestions({
  isAnswered: false,
  take: 20,        // Max: 5,000
  skip: 0,         // Max: 199,990
  order: 'dateDesc'
});

console.log(`Unanswered: ${unansweredQuestions.data.countUnanswered}`);
console.log(`Archived: ${unansweredQuestions.data.countArchive}`);

// Get questions for specific product
const productQuestions = await sdk.communications.getQuestions({
  isAnswered: false,
  nmId: 12345,
  take: 10,
  skip: 0
});

// Filter by date range
const recentQuestions = await sdk.communications.getQuestions({
  isAnswered: false,
  dateFrom: Date.now() - 7 * 24 * 60 * 60 * 1000,  // Last 7 days (milliseconds)
  dateTo: Date.now(),
  take: 50,
  skip: 0
});
```

**Question Object Fields:**
- `id` - Unique question identifier
- `text` - Customer question text
- `createdDate` - Question timestamp (RFC 3339)
- `state` - `'none'` (rejected) | `'wbRu'` (visible)
- `answer` - Answer object with `text` and `editable` flag
- `productDetails` - `nmID`, `productName`, `supplierArticle`, `brandName`
- `wasViewed` - Boolean indicating if seller viewed the question
- `isWarned` - Warning flag for inappropriate content

#### Answer or Reject Questions

Provide answers or reject inappropriate questions:

```typescript
// Answer a question (visible to customers)
await sdk.communications.answerQuestion(
  questionId,
  'This product is made of 100% cotton and is machine washable.',
  false  // reject = false (default)
);

// Reject inappropriate question
await sdk.communications.answerQuestion(
  questionId,
  'This question violates our community guidelines.',
  true   // reject = true (not visible to customers)
);

// Mark question as viewed (tracking purposes)
await sdk.communications.markQuestionViewed(questionId);
```

**Validation Rules:**
- `questionId` - Required, non-empty string
- `answerText` - Required, non-empty string
- `reject` - Optional boolean (default: `false`)
- Answer is editable for 60 days after posting
- Only one edit allowed per answer

#### Batch Question Processing

Process multiple questions efficiently:

```typescript
// Get first batch of unanswered questions
const response = await sdk.communications.getQuestions({
  isAnswered: false,
  take: 50,
  skip: 0,
  order: 'dateDesc'
});

// Answer each question
for (const question of response.data.questions) {
  console.log(`\nQuestion about ${question.productDetails.productName}:`);
  console.log(`  ${question.text}`);

  // Generate appropriate answer based on product details
  const answer = generateAnswerFromProductInfo(
    question.text,
    question.productDetails
  );

  await sdk.communications.answerQuestion(question.id, answer);
  await sdk.communications.markQuestionViewed(question.id);

  console.log(`  Answered: ${answer.substring(0, 50)}...`);
}

console.log(`\nProcessed ${response.data.questions.length} questions`);
```

### Customer Reviews Management

Respond to customer reviews with photos, videos, and rating analysis capabilities.

#### Get Customer Reviews

Retrieve reviews with filtering by answered status, product ID, and date range:

```typescript
// Get unanswered reviews
const unansweredReviews = await sdk.communications.getReviews({
  isAnswered: false,
  take: 20,        // Max: 5,000
  skip: 0,         // Max: 199,990
  order: 'dateDesc'
});

console.log(`Unanswered: ${unansweredReviews.data.countUnanswered}`);
console.log(`Archived: ${unansweredReviews.data.countArchive}`);

// Get reviews for specific product
const productReviews = await sdk.communications.getReviews({
  isAnswered: false,
  nmId: 12345,
  take: 10,
  skip: 0
});

// Process reviews with media
const reviewsWithMedia = await sdk.communications.getReviews({
  isAnswered: false,
  take: 50,
  skip: 0
});

reviewsWithMedia.data.feedbacks.forEach(review => {
  console.log(`\nReview ID: ${review.id}`);
  console.log(`Rating: ${'⭐'.repeat(review.productValuation)} (${review.productValuation}/5)`);
  console.log(`Text: ${review.text}`);

  if (review.photoLinks && review.photoLinks.length > 0) {
    console.log(`Photos: ${review.photoLinks.length}`);
    review.photoLinks.forEach((photo, i) => {
      console.log(`  ${i + 1}. ${photo.fullSize}`);  // JPEG or PNG
    });
  }

  if (review.video) {
    console.log(`Video: ${review.video.url}`);  // HLS stream
  }
});
```

**Review Object Fields:**
- `id` - Unique review identifier
- `text` - Review text content
- `pros` - Pros mentioned by customer
- `cons` - Cons mentioned by customer
- `productValuation` - Rating (1-5 stars)
- `createdDate` - Review timestamp (RFC 3339)
- `answer` - Response object with `text` and `editable` flag
- `photoLinks` - Array of review photos (JPEG/PNG) with `fullSize`, `miniSize`
- `video` - HLS video object with `url`
- `productDetails` - `nmID`, `productName`, `supplierArticle`, `imtId`, `size`
- `wasViewed` - Boolean indicating if seller viewed the review
- `isAbleSupplierFeedbackValuation` - Whether seller can rate the review
- `supplierFeedbackValuation` - Seller's rating of the review

#### Respond to Reviews

Provide thoughtful responses to customer reviews:

```typescript
// Respond to positive review (4-5 stars)
await sdk.communications.respondToReview(
  reviewId,
  'Thank you for your wonderful 5-star review! We are thrilled you love the product.'
);

// Respond to neutral review (3 stars)
await sdk.communications.respondToReview(
  reviewId,
  'Thank you for your feedback. We are always working to improve our products and service.'
);

// Respond to negative review (1-2 stars)
await sdk.communications.respondToReview(
  reviewId,
  'We sincerely apologize for your experience. Please contact our support team at support@example.com so we can make this right.'
);

// Edit existing response (within 60 days, once only)
await sdk.communications.editReviewResponse(
  reviewId,
  'Updated response: Thank you for your patience. We have addressed your concerns and improved the product.'
);
```

**Validation Rules:**
- `reviewId` - Required, non-empty string
- `responseText` - Min 2 characters, max 5000 characters
- Response is editable for 60 days after posting
- Only one edit allowed per response

#### Review Sentiment Analysis

Categorize reviews by rating and respond appropriately:

```typescript
const reviews = await sdk.communications.getReviews({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc'
});

// Categorize by rating
const sentimentCategories = {
  positive: reviews.data.feedbacks.filter(r => r.productValuation >= 4),
  neutral: reviews.data.feedbacks.filter(r => r.productValuation === 3),
  negative: reviews.data.feedbacks.filter(r => r.productValuation <= 2)
};

console.log(`\nReview Sentiment Breakdown:`);
console.log(`  Positive (4-5 stars): ${sentimentCategories.positive.length}`);
console.log(`  Neutral (3 stars): ${sentimentCategories.neutral.length}`);
console.log(`  Negative (1-2 stars): ${sentimentCategories.negative.length}`);

// Respond to negative reviews first (priority)
for (const review of sentimentCategories.negative) {
  const response = `We sincerely apologize for your ${review.productValuation}-star experience. ` +
    `Please contact us directly at support@example.com with order details so we can resolve this immediately.`;

  await sdk.communications.respondToReview(review.id, response);
  console.log(`Responded to negative review: ${review.id}`);
}

// Acknowledge positive reviews
for (const review of sentimentCategories.positive) {
  const response = `Thank you for your wonderful ${review.productValuation}-star review! ` +
    `We are thrilled you love the ${review.productDetails.productName}.`;

  await sdk.communications.respondToReview(review.id, response);
  console.log(`Thanked positive reviewer: ${review.id}`);
}
```

#### Rate Limits (Q&A and Reviews)

Q&A and Reviews endpoints share rate limits:

| Endpoint | Limit | Interval | Burst |
|----------|-------|----------|-------|
| `getQuestions()` | 3 requests | 1 second | 6 |
| `answerQuestion()` | 3 requests | 1 second | 6 |
| `markQuestionViewed()` | 3 requests | 1 second | 6 |
| `getReviews()` | 3 requests | 1 second | 6 |
| `respondToReview()` | 3 requests | 1 second | 6 |
| `editReviewResponse()` | 3 requests | 1 second | 6 |

**Best Practices:**
- Process Q&A and Reviews in batches with delays
- Use pagination (`take`/`skip`) to retrieve large datasets
- Cache frequently accessed questions/reviews
- Prioritize negative reviews for faster response times

### Complete Q&A and Reviews Workflow

Automated customer engagement system:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Process unanswered questions
async function processQuestions() {
  const questions = await sdk.communications.getQuestions({
    isAnswered: false,
    take: 20,
    skip: 0,
    order: 'dateDesc'
  });

  for (const question of questions.data.questions.slice(0, 5)) {
    const answer = `Thank you for your question about ${question.productDetails.productName}. ` +
      `This product features ${question.productDetails.brandName} quality materials. ` +
      `For specific details, please refer to the product description.`;

    await sdk.communications.answerQuestion(question.id, answer);
    await sdk.communications.markQuestionViewed(question.id);

    console.log(`✓ Answered: ${question.text.substring(0, 50)}...`);
  }
}

// Process unanswered reviews
async function processReviews() {
  const reviews = await sdk.communications.getReviews({
    isAnswered: false,
    take: 20,
    skip: 0,
    order: 'dateDesc'
  });

  for (const review of reviews.data.feedbacks.slice(0, 5)) {
    let response: string;

    if (review.productValuation >= 4) {
      response = `Thank you for your wonderful ${review.productValuation}-star review! We appreciate your support.`;
    } else if (review.productValuation === 3) {
      response = `Thank you for your feedback. We value your opinion and are continuously working to improve.`;
    } else {
      response = `We sincerely apologize for your ${review.productValuation}-star experience. ` +
        `Please contact us at support@example.com so we can make this right.`;
    }

    await sdk.communications.respondToReview(review.id, response);
    console.log(`✓ Responded to ${review.productValuation}-star review: ${review.id}`);
  }
}

// Run both workflows
async function main() {
  console.log('Processing customer Q&A and reviews...\n');

  await processQuestions();
  console.log('\n--- Questions processed ---\n');

  await processReviews();
  console.log('\n--- Reviews processed ---\n');

  console.log('Customer engagement complete!');
}

main().catch(console.error);
```

---

## Reports Module Deep Dive

The Reports module provides comprehensive business reporting with real-time data synchronization, async report generation, and compliance tracking capabilities.

### Report Categories

**1. Basic Reports** - Real-time synchronized data (30-minute updates)
- Incomes - Inbound shipments and inventory
- Stocks - Current inventory levels across warehouses
- Orders - Customer order details and status
- Sales - Sales and returns with payment information

**2. Async Reports** - On-demand generated exports
- Warehouse Remains - Detailed inventory snapshots with custom grouping
- Acceptance Report - Paid acceptance fees tracking
- Paid Storage Report - Storage cost analysis

**3. Compliance Reports** - Regulatory and quality tracking
- Excise Reports - Mandatory labeling compliance
- Goods Labeling - Products requiring marking
- Characteristics Change - Product data modifications
- Antifraud Details - Fraud prevention monitoring

**4. Analytics Reports** - Performance insights
- Regional Sales - Geographic sales breakdown
- Brand Share - Market share analysis
- Blocked/Shadowed Products - Visibility issues
- Returns & Movements - Return rate tracking

### Income Reports

Track inbound shipments from suppliers to WB warehouses:

```typescript
// Fetch all incomes with pagination
let allIncomes: IncomesItem[] = [];
let dateFrom = '2024-01-01';

while (true) {
  const incomes = await sdk.reports.getIncomes(dateFrom);
  if (incomes.length === 0) break;

  allIncomes = allIncomes.concat(incomes);
  console.log(`Fetched ${incomes.length} incomes, total: ${allIncomes.length}`);

  // Use lastChangeDate from last row for next request
  dateFrom = incomes[incomes.length - 1].lastChangeDate;

  // Check if we hit the 100K limit (indicates more data)
  if (incomes.length < 100000) break;
}

console.log(`Total incomes retrieved: ${allIncomes.length}`);
```

**Income Fields:**
- `incomeID` - Unique shipment identifier
- `date` - Shipment acceptance date
- `lastChangeDate` - Last modification timestamp (for pagination)
- `supplierArticle` - Supplier's product article
- `nmId` - Wildberries product ID
- `barcode` - Product barcode
- `quantity` - Quantity received
- `totalPrice` - Total shipment value
- `dateClose` - Shipment close date
- `warehouseName` - Destination warehouse

**Pagination Strategy:**
1. Initial request with starting date (e.g., `'2024-01-01'`)
2. Response contains up to 100,000 rows
3. If response length = 100,000, more data exists
4. Use `lastChangeDate` from last row as `dateFrom` in next request
5. Continue until response is empty array `[]`

**Update Frequency:** 30 minutes

**Use Cases:**
- Inventory reconciliation and tracking
- Supplier performance monitoring
- Stock level forecasting
- Warehouse capacity planning

### Stock Reports

Get current inventory levels with quantity breakdown:

```typescript
// Get full stock snapshot (use early date)
const stocks = await sdk.reports.getStocks('2019-01-01');

// Analyze stock distribution
let totalAvailable = 0;
let totalInTransit = 0;
let totalReturning = 0;

stocks.forEach(stock => {
  totalAvailable += stock.quantity;          // Available in warehouse
  totalInTransit += stock.inWayToClient;    // In transit to customer
  totalReturning += stock.inWayFromClient;  // Returning from customer
});

const totalStock = totalAvailable + totalInTransit + totalReturning;

console.log(`Available Stock: ${totalAvailable.toLocaleString()}`);
console.log(`In Transit (to customer): ${totalInTransit.toLocaleString()}`);
console.log(`In Transit (returns): ${totalReturning.toLocaleString()}`);
console.log(`Total Inventory: ${totalStock.toLocaleString()}`);

// Identify low stock items (< 10 units available)
const lowStock = stocks.filter(s => s.quantity < 10 && s.quantity > 0);
console.log(`\nLow Stock Alert: ${lowStock.length} products`);
```

**Stock Fields:**
- `lastChangeDate` - Last stock update timestamp
- `supplierArticle` - Supplier's product article
- `nmId` - Wildberries product ID
- `barcode` - Product barcode
- `quantity` - Available stock (can be added to cart)
- `inWayToClient` - Quantity in transit to customers
- `inWayFromClient` - Quantity returning from customers
- `quantityFull` - Total quantity (sum of above three)
- `warehouseName` - Warehouse location
- `Price` - Current price
- `Discount` - Discount percentage
- `subject` - Product category

**Quantity Breakdown:**
```
quantityFull = quantity + inWayToClient + inWayFromClient
```

**Pro Tip:** Use an early date like `'2019-06-20'` to get complete current stock snapshot (all products), not just recent changes.

**Max Response Size:** 60,000 rows per request

### Order Reports

Retrieve customer order information with 90-day retention:

```typescript
// Get recent orders with cancellation tracking
const orders = await sdk.reports.getOrders('2024-01-01', 1); // flag=1 for new records

// Analyze order metrics
const totalOrders = orders.length;
const canceledOrders = orders.filter(o => o.isCancel);
const activeOrders = orders.filter(o => !o.isCancel);

console.log(`Total Orders: ${totalOrders}`);
console.log(`Active: ${activeOrders.length} (${(activeOrders.length / totalOrders * 100).toFixed(2)}%)`);
console.log(`Canceled: ${canceledOrders.length} (${(canceledOrders.length / totalOrders * 100).toFixed(2)}%)`);

// Group by warehouse
const byWarehouse = orders.reduce((acc, order) => {
  const wh = order.warehouseName || 'Unknown';
  acc[wh] = (acc[wh] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\nOrders by Warehouse:');
Object.entries(byWarehouse).forEach(([warehouse, count]) => {
  console.log(`  ${warehouse}: ${count}`);
});
```

**Order Fields:**
- `srid` - Unique order identifier (use this for matching)
- `date` - Order creation date
- `lastChangeDate` - Last modification timestamp
- `supplierArticle` - Supplier's product article
- `nmId` - Product ID
- `barcode` - Product barcode
- `quantity` - Quantity ordered
- `totalPrice` - Total order value
- `discountPercent` - Discount percentage
- `isCancel` - Boolean indicating cancellation
- `cancelDate` - Cancellation date (if canceled)
- `warehouseName` - Fulfillment warehouse
- `oblast` - Region/Oblast name
- `incomeID` - Related income shipment ID

**Important Notes:**
- 1 row = 1 order = 1 assembly task = 1 product unit
- Use `srid` field for unique order identification
- Data retention: **90 days** from order creation
- Max response: 80,000 rows per request

### Sales Reports

Track sales and returns with payment breakdown:

```typescript
// Calculate revenue, returns, and net profit
const sales = await sdk.reports.getSales('2024-01-01');

let totalRevenue = 0;
let totalReturns = 0;
let totalForPay = 0;

const salesList: typeof sales = [];
const returnsList: typeof sales = [];

sales.forEach(sale => {
  if (sale.paymentSaleAmount > 0) {
    // This is a sale
    salesList.push(sale);
    totalRevenue += sale.paymentSaleAmount;
    totalForPay += sale.forPay;
  } else {
    // This is a return (negative payment)
    returnsList.push(sale);
    totalReturns += Math.abs(sale.paymentSaleAmount);
    totalForPay += sale.forPay; // forPay is negative for returns
  }
});

console.log(`\n📊 Sales Summary:`);
console.log(`Total Sales: ${salesList.length} orders`);
console.log(`Gross Revenue: ${totalRevenue.toLocaleString()} RUB`);
console.log(`\nTotal Returns: ${returnsList.length} orders`);
console.log(`Return Amount: ${totalReturns.toLocaleString()} RUB`);
console.log(`Return Rate: ${(returnsList.length / salesList.length * 100).toFixed(2)}%`);
console.log(`\nNet to Seller: ${totalForPay.toLocaleString()} RUB`);

// Identify top-selling products
const productSales = sales.reduce((acc, sale) => {
  if (sale.paymentSaleAmount > 0) {
    const key = sale.nmId;
    if (!acc[key]) {
      acc[key] = { count: 0, revenue: 0, supplierArticle: sale.supplierArticle };
    }
    acc[key].count += 1;
    acc[key].revenue += sale.paymentSaleAmount;
  }
  return acc;
}, {} as Record<number, { count: number; revenue: number; supplierArticle: string }>);

const topProducts = Object.entries(productSales)
  .map(([nmId, data]) => ({ nmId, ...data }))
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10);

console.log(`\n🏆 Top 10 Products by Revenue:`);
topProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.supplierArticle} (ID: ${product.nmId})`);
  console.log(`   Sales: ${product.count}, Revenue: ${product.revenue.toLocaleString()} RUB`);
});
```

**Sale Fields:**
- `saleID` - Unique sale identifier
  - Format `S**********` = sale
  - Format `R**********` = return
- `date` - Sale date
- `lastChangeDate` - Last modification timestamp
- `supplierArticle` - Supplier's product article
- `nmId` - Product ID
- `barcode` - Product barcode
- `quantity` - Quantity sold
- `totalPrice` - Total sale price
- `discountPercent` - Discount percentage
- `isSupply` - Boolean indicating supply
- `isRealization` - Boolean indicating realization
- `paymentSaleAmount` - Payment from sale (negative for returns)
- `forPay` - Amount to be paid to seller
- `warehouseName` - Warehouse location
- `oblast` - Region/Oblast name
- `incomeID` - Related income ID
- `odid` - Order delivery ID

**Returns Detection:**
- Sale: `paymentSaleAmount` > 0
- Return: `paymentSaleAmount` < 0

**Data Retention:** 90 days from sale date

### Async Warehouse Remains Report

Generate detailed inventory reports with custom grouping and filtering:

```typescript
// Step 1: Create async report task
const task = await sdk.reports.createWarehouseRemainsReport({
  locale: 'ru',              // 'ru' | 'en' | 'zh'
  groupByBrand: true,        // Group by brand
  groupBySubject: true,      // Group by category
  groupBySize: false,        // Group by size
  filterPics: 1,             // Filter: 1 = with photos, 0 = without, -1 = all
  filterVolume: -1           // Filter: 3 = with volume data, 0 = without, -1 = all
});

console.log(`Task created: ${task.data.taskId}`);
console.log(`Status: ${task.data.status}`); // 'new'

// Step 2: Poll for completion (check every 5-10 seconds)
let status: ReportStatus;
let attempts = 0;
const maxAttempts = 60; // 5 minutes timeout

do {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

  status = await sdk.reports.checkReportStatus(
    task.data.taskId,
    'warehouse_remains'
  );

  attempts++;
  console.log(`[${attempts}/${maxAttempts}] Status: ${status.data.status}`);

  if (status.data.status === 'error') {
    throw new Error(`Report generation failed: ${status.data.error}`);
  }

  if (attempts >= maxAttempts) {
    throw new Error('Report generation timeout');
  }

} while (status.data.status === 'new' || status.data.status === 'processing');

// Step 3: Download completed report
if (status.data.status === 'done') {
  const reportBlob = await sdk.reports.downloadReport(
    task.data.taskId,
    'warehouse_remains'
  );

  // Save to file (Node.js)
  const fs = require('fs');
  const buffer = await reportBlob.arrayBuffer();
  fs.writeFileSync('warehouse_remains.xlsx', Buffer.from(buffer));

  console.log('✓ Report downloaded: warehouse_remains.xlsx');
}
```

**Grouping Options:**
- `groupByBrand` - Group results by brand name
- `groupBySubject` - Group by product category
- `groupBySa` - Group by supplier article
- `groupBySize` - Group by product size
- `groupByNm` - Group by nomenclature ID
- `groupByBarcode` - Group by barcode

**Filter Options:**
- `filterPics`: Photo filter
  - `-1` - All products
  - `0` - Products without photos
  - `1` - Products with photos
- `filterVolume`: Volume data filter
  - `-1` - All products
  - `0` - Products without volume data
  - `3` - Products with volume data

**Locale Options:**
- `ru` - Russian (default)
- `en` - English
- `zh` - Chinese (warehouseName shown in English)

**Report Format:** Excel (.xlsx) file with tabular data

**Status Values:**
- `new` - Queued for generation
- `processing` - Report being generated
- `done` - Ready for download
- `error` - Generation failed
- `purged` - Report deleted from system
- `canceled` - Task canceled by user

### Excise & Compliance Reports

Track mandatory labeling compliance for regulated products:

```typescript
// Get excise report for Russia
const report = await sdk.reports.getExciseReport(
  '2024-01-01',      // dateFrom
  '2024-01-31',      // dateTo
  {
    countries: ['RU'],           // Country codes: RU, KZ, BY, AM, KG, UZ
    brands: ['Brand A', 'Brand B'], // Optional brand filter
    inns: ['1234567890']         // Optional INN filter
  }
);

console.log(`Labeling Operations Tracked: ${report.response.data.length}`);

// Analyze operations
const withdrawals = report.response.data.filter(op => op.operationType === 1);
const returns = report.response.data.filter(op => op.operationType === 2);

console.log(`Withdrawals from circulation: ${withdrawals.length}`);
console.log(`Returns to circulation: ${returns.length}`);

// Group by brand
const byBrand = report.response.data.reduce((acc, op) => {
  const brand = op.brand || 'Unknown';
  acc[brand] = (acc[brand] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\nOperations by Brand:');
Object.entries(byBrand).forEach(([brand, count]) => {
  console.log(`  ${brand}: ${count}`);
});
```

**Country Codes (ISO 3166-2):**
- `AM` - Armenia
- `BY` - Belarus
- `KG` - Kyrgyzstan
- `KZ` - Kazakhstan
- `RU` - Russia
- `UZ` - Uzbekistan

**Operation Types:**
- `1` - Withdrawal from circulation (sold, damaged, expired)
- `2` - Return to circulation (customer return, stock correction)

**Use Cases:**
- Regulatory compliance reporting for Честный ЗНАК system
- Tracking labeled product movements
- Audit trail for mandatory labeling
- Brand-specific compliance monitoring

**Rate Limit:** 10 requests per 5 hours (strict enforcement)

### Rate Limits

Reports module endpoints have varying rate limits:

| Endpoint | Limit | Interval | Max Rows | Notes |
|----------|-------|----------|----------|-------|
| `getIncomes()` | 1 request | 1 minute | 100,000 | Pagination required |
| `getStocks()` | 1 request | 1 minute | 60,000 | Early date for full snapshot |
| `getOrders()` | 1 request | 1 minute | 80,000 | 90-day retention |
| `getSales()` | 1 request | 1 minute | 80,000 | 90-day retention |
| `getExciseReport()` | 10 requests | 5 hours | - | Strict limit |
| `createWarehouseRemainsReport()` | 1 request | 1 minute | - | Burst: 5 |
| `checkReportStatus()` | 1 request | 5 seconds | - | Polling allowed |
| `downloadReport()` | 1 request | 1 minute | - | Per report type |

**Best Practices:**
- Implement exponential backoff for retries
- Cache report data to minimize API calls
- Use pagination efficiently (don't re-fetch existing data)
- Poll report status at 5-10 second intervals
- Download reports only when status is `done`

### Troubleshooting

#### Pagination Issues

**Error:** Retrieving duplicate data when paginating

**Solution:** Ensure you're using `lastChangeDate` from the **last row** of the response:

```typescript
// ❌ Wrong - using first row
const incomes = await sdk.reports.getIncomes(dateFrom);
dateFrom = incomes[0].lastChangeDate; // WRONG!

// ✅ Correct - using last row
const incomes = await sdk.reports.getIncomes(dateFrom);
dateFrom = incomes[incomes.length - 1].lastChangeDate; // CORRECT
```

#### Date Format Errors

**Error:** `ValidationError: Invalid date format`

**Solution:** Use RFC 3339 format with Moscow timezone (UTC+3):

```typescript
// ✅ Correct formats
'2024-01-01'                  // Date only
'2024-01-01T00:00:00'        // Date with time
'2024-01-01T23:59:59.12345'  // With milliseconds

// ❌ Wrong formats
'01-01-2024'                 // Wrong order
'2024/01/01'                 // Wrong separator
'2024-01-01 00:00:00'        // Space instead of 'T'
```

#### Report Timeout

**Error:** Async report stuck in 'processing' status

**Solution:** Implement timeout handling with maximum wait time:

```typescript
let status: ReportStatus;
let attempts = 0;
const maxAttempts = 60; // 5 minutes timeout

do {
  await new Promise(resolve => setTimeout(resolve, 5000));

  status = await sdk.reports.checkReportStatus(taskId, 'warehouse_remains');
  attempts++;

  if (attempts >= maxAttempts) {
    throw new Error('Report generation timeout after 5 minutes');
  }

  if (status.data.status === 'error') {
    throw new Error(`Report failed: ${status.data.error}`);
  }

} while (status.data.status !== 'done');
```

#### Empty Response

**Issue:** `getStocks()` returns empty array but stock exists

**Solution:** Use earlier date to get full snapshot (not just recent changes):

```typescript
// ❌ May return empty if no recent changes
const stocks = await sdk.reports.getStocks('2024-12-01');

// ✅ Returns full current stock snapshot
const stocks = await sdk.reports.getStocks('2019-01-01');
```

#### Download Fails

**Error:** Blob download returns corrupted file

**Solution:** Ensure report status is `done` before downloading:

```typescript
// Check status before download
const status = await sdk.reports.checkReportStatus(taskId, 'warehouse_remains');

if (status.data.status !== 'done') {
  throw new Error(`Report not ready: ${status.data.status}`);
}

// Now safe to download
const blob = await sdk.reports.downloadReport(taskId, 'warehouse_remains');
```

### Complete Workflow Example

Automated daily reporting system combining multiple report types:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import * as fs from 'fs';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function generateDailyReport() {
  const today = new Date().toISOString().split('T')[0];
  console.log(`\n📊 Daily Report for ${today}\n`);

  // 1. Get yesterday's sales
  const sales = await sdk.reports.getSales(today);
  const revenue = sales
    .filter(s => s.paymentSaleAmount > 0)
    .reduce((sum, s) => sum + s.forPay, 0);

  console.log(`✓ Sales: ${sales.length} orders, ${revenue.toLocaleString()} RUB`);

  // 2. Check current stock levels
  const stocks = await sdk.reports.getStocks('2019-01-01');
  const totalStock = stocks.reduce((sum, s) => sum + s.quantity, 0);
  const lowStock = stocks.filter(s => s.quantity < 10 && s.quantity > 0);

  console.log(`✓ Stock: ${totalStock.toLocaleString()} units total`);
  console.log(`  ⚠️  Low Stock Alert: ${lowStock.length} products`);

  // 3. Generate warehouse remains report
  console.log(`\n📦 Generating warehouse inventory report...`);

  const task = await sdk.reports.createWarehouseRemainsReport({
    locale: 'ru',
    groupByBrand: true,
    groupBySubject: true
  });

  // Poll until complete
  let status: any;
  do {
    await new Promise(resolve => setTimeout(resolve, 5000));
    status = await sdk.reports.checkReportStatus(task.data.taskId, 'warehouse_remains');
    console.log(`  Status: ${status.data.status}`);
  } while (status.data.status === 'new' || status.data.status === 'processing');

  if (status.data.status === 'done') {
    const blob = await sdk.reports.downloadReport(task.data.taskId, 'warehouse_remains');
    const buffer = await blob.arrayBuffer();
    fs.writeFileSync(`warehouse_report_${today}.xlsx`, Buffer.from(buffer));
    console.log(`✓ Warehouse report saved: warehouse_report_${today}.xlsx`);
  }

  console.log(`\n✅ Daily report generation complete!`);
}

generateDailyReport().catch(console.error);
```

---

## Promotion Module Deep Dive

The Promotion module provides comprehensive advertising campaign management with automated bidding, performance tracking, and budget optimization capabilities.

### Campaign Types & Statuses

**Campaign Types:**
- **Type 4-8**: Legacy campaign types (catalog, search, cards, recommendations)
- **Type 9**: Modern campaigns with manual or unified bidding (recommended)

**Campaign Statuses:**
- `-1` - Deleting (3-10 minutes to complete)
- `4` - Ready to launch (needs budget and "Apply Changes" in WB Cabinet)
- `7` - Completed
- `8` - Rejected
- `9` - Active (running)
- `11` - Paused

### Campaign Lifecycle Management

Create, launch, pause, resume, and stop campaigns:

```typescript
// Step 1: Get campaign count and list
const summary = await sdk.promotion.getPromotionCount();

console.log(`Total campaigns: ${summary.all}`);
summary.adverts?.forEach(group => {
  console.log(`Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);
});

// Step 2: Create new campaign with manual bidding (Type 9 - recommended)
const campaignId = await sdk.promotion.createSeacatSaveAd({
  name: 'Summer Sale 2024',
  nms: [12345, 67890, 11111],  // Product IDs (nomenclatures)
  bid_type: 'manual',           // 'manual' | 'unified'
  placement_types: ['search', 'recommendations']  // Where ads appear
});

console.log(`Campaign created: ${campaignId}`);

// Step 3: Get minimum bids for products
const minBids = await sdk.promotion.createBidsMin({
  advert_id: campaignId,
  nm_ids: [12345, 67890],
  payment_type: 'cpm',  // Cost per thousand impressions
  placement_types: ['search', 'recommendation']
});

minBids.bids.forEach(product => {
  console.log(`Product ${product.nm_id}:`);
  product.bids.forEach(bid => {
    console.log(`  ${bid.type}: ${bid.value} RUB minimum bid`);
  });
});

// Step 4: Set campaign bids (must be >= minimum)
await sdk.promotion.updateAdvBids({
  bids: [
    {
      advertId: campaignId,
      type: 'search',         // 'search' | 'recommendation' | 'carousel'
      nm: 12345,              // Product ID
      cpm: 150                // Bid in RUB (CPM pricing)
    },
    {
      advertId: campaignId,
      type: 'recommendation',
      nm: 67890,
      cpm: 200
    }
  ]
});

console.log('Bids updated successfully');

// Step 5: Launch campaign (must set budget in WB Cabinet first!)
await sdk.promotion.getAdvStart({ id: campaignId });
console.log('Campaign started');

// Step 6: Pause campaign when needed
await sdk.promotion.getAdvPause({ id: campaignId });
console.log('Campaign paused');

// Step 7: Resume campaign
await sdk.promotion.getAdvStart({ id: campaignId });
console.log('Campaign resumed');

// Step 8: Stop campaign permanently
await sdk.promotion.getAdvStop({ id: campaignId });
console.log('Campaign stopped');
```

**Important Notes:**
- After creating campaign, you **MUST** click "Apply Changes" in WB Promotion Cabinet
- Set campaign budget in WB Cabinet before launching
- Minimum bids vary by product and placement type
- Campaigns can only be deleted when status is `4` (ready to launch)

### Campaign Information Retrieval

Get detailed campaign data including statistics and configuration:

```typescript
// Get campaigns by status and type (legacy types 4-8)
const campaigns = await sdk.promotion.createPromotionAdverts(
  [123456, 789012],  // Campaign IDs (empty array for all campaigns)
  {
    status: 9,       // Filter by status: -1, 4, 7, 8, 9, 11
    type: 8,         // Filter by type: 4-8
    order: 'change', // Sort: 'create' | 'change' | 'id'
    direction: 'desc' // 'desc' | 'asc'
  }
);

// Get modern campaigns (Type 9) with manual bidding
const modernCampaigns = await sdk.promotion.getAuctionAdverts({
  ids: '123456,789012',        // Comma-separated campaign IDs
  statuses: '9',                // Filter by status
  payment_type: 'cpm'           // 'cpm' | 'cpc'
});

modernCampaigns.adverts?.forEach(campaign => {
  console.log(`\nCampaign: ${campaign.name} (ID: ${campaign.advertId})`);
  console.log(`Status: ${campaign.status}, Type: ${campaign.type}`);
  console.log(`Daily Budget: ${campaign.dailyBudget} RUB`);
  console.log(`Products: ${campaign.params?.[0]?.nms?.length || 0}`);
});
```

### Product Selection for Campaigns

Get available subjects (categories) and products for advertising:

```typescript
// Step 1: Get available subjects (categories) for campaigns
const subjects = await sdk.promotion.getSupplierSubjects();

console.log('Available categories for advertising:');
subjects.forEach(subject => {
  console.log(`  ${subject.name} (ID: ${subject.id}): ${subject.count} products`);
});

// Step 2: Get products (nomenclatures) for selected subjects
const selectedSubjectIds = [447, 566]; // Electronics, Clothing
const products = await sdk.promotion.createSupplierNms(selectedSubjectIds);

console.log(`\nAvailable products: ${products.length}`);
products.forEach(product => {
  console.log(`  ${product.title} (nm: ${product.nm}, subject: ${product.subjectId})`);
});
```

### Budget Management

**Important:** Budget operations are performed in the WB Promotion Cabinet, not via API.

**Budget Workflow:**
1. Create campaign via API
2. Set initial budget in WB Cabinet
3. Monitor budget consumption via statistics
4. Top up budget in WB Cabinet when needed
5. Campaign auto-pauses when budget exhausted

### Campaign Statistics

Track campaign performance with detailed metrics:

```typescript
// Get statistics for specific campaign
const stats = await sdk.promotion.getFullstatsV2({
  campaignIds: [123456, 789012],
  from: '2024-01-01',
  to: '2024-01-31'
});

stats.forEach(campaign => {
  console.log(`\nCampaign ${campaign.advertId}:`);
  campaign.days?.forEach(day => {
    console.log(`  ${day.date}:`);
    console.log(`    Views: ${day.views}`);
    console.log(`    Clicks: ${day.clicks}`);
    console.log(`    CTR: ${((day.clicks / day.views) * 100).toFixed(2)}%`);
    console.log(`    Sum: ${day.sum} RUB`);
    console.log(`    Orders: ${day.orders}`);
    console.log(`    CR: ${((day.orders / day.clicks) * 100).toFixed(2)}%`);
  });
});

// Get aggregated statistics
const aggregated = await sdk.promotion.getStatDate({
  from: '2024-01-01',
  to: '2024-01-31'
});

console.log('\n📊 Total Performance:');
console.log(`Views: ${aggregated.views?.toLocaleString()}`);
console.log(`Clicks: ${aggregated.clicks?.toLocaleString()}`);
console.log(`CTR: ${((aggregated.clicks / aggregated.views) * 100).toFixed(2)}%`);
console.log(`Spent: ${aggregated.sum?.toLocaleString()} RUB`);
console.log(`Orders: ${aggregated.orders}`);
console.log(`Revenue: ${aggregated.atbs?.toLocaleString()} RUB`);
console.log(`ROAS: ${(aggregated.atbs / aggregated.sum).toFixed(2)}x`);
```

**Key Metrics:**
- **Views**: Ad impressions
- **Clicks**: Ad clicks
- **CTR**: Click-through rate (Clicks / Views)
- **Sum**: Amount spent on campaign
- **Orders**: Orders generated from ad
- **CR**: Conversion rate (Orders / Clicks)
- **ATBS**: Revenue from ad-driven orders
- **ROAS**: Return on ad spend (Revenue / Spend)

### Configuration & Limits

Get platform configuration and campaign constraints:

```typescript
// Get promotional configuration
const config = await sdk.promotion.getAdvConfig();

console.log('Platform Configuration:');
config.config?.forEach(param => {
  console.log(`  ${param.name}: ${param.value}`);
  console.log(`    ${param.description}`);
});

console.log('\nAvailable Categories:');
config.categories?.forEach(category => {
  console.log(`  ${category.name} (ID: ${category.id})`);
  console.log(`    Min CPM: ${category.minCpm} RUB`);
  console.log(`    Min CPC: ${category.minCpc} RUB`);
});
```

**Configuration Parameters:**
- Max products per campaign
- Minimum bids by category
- Available placement types
- Budget constraints

### Campaign Management Operations

Rename and delete campaigns:

```typescript
// Rename campaign
await sdk.promotion.createAdvRename({
  advertId: 123456,
  name: 'Updated Campaign Name - Q1 2024'
});

console.log('Campaign renamed');

// Delete campaign (only works for status 4 - ready to launch)
await sdk.promotion.getAdvDelete({ id: 123456 });

console.log('Campaign deletion initiated (takes 3-10 minutes)');
```

**Deletion Notes:**
- Only campaigns with status `4` can be deleted
- After deletion request, campaign status becomes `-1` (deleting)
- Complete deletion takes 3-10 minutes
- Cannot be undone

### Rate Limits

Promotion module endpoints have specific rate limits:

| Endpoint | Limit | Interval | Burst | Notes |
|----------|-------|----------|-------|-------|
| `getPromotionCount()` | 5 requests | 1 second | 5 | Campaign summary |
| `createPromotionAdverts()` | 5 requests | 1 second | 5 | Campaign info |
| `getAuctionAdverts()` | 5 requests | 1 second | 5 | Modern campaigns |
| `getAdvConfig()` | 1 request | 1 minute | 1 | Platform config |
| `createBidsMin()` | 20 requests | 1 minute | 5 | Minimum bids |
| `createAdvSaveAd()` | 1 request | 20 seconds | 5 | Create campaign |
| `createSeacatSaveAd()` | 5 requests | 1 minute | 5 | Create Type 9 |
| `getSupplierSubjects()` | 1 request | 12 seconds | 5 | Available subjects |
| `createSupplierNms()` | 5 requests | 1 minute | 5 | Available products |
| `getAdvDelete()` | 5 requests | 1 second | 5 | Delete campaign |
| `createAdvRename()` | 5 requests | 1 second | 5 | Rename campaign |
| `getAdvStart()` | 5 requests | 1 second | 5 | Start campaign |
| `getAdvPause()` | 5 requests | 1 second | 5 | Pause campaign |
| `getAdvStop()` | 5 requests | 1 second | 5 | Stop campaign |
| `updateAdvBids()` | 5 requests | 1 second | 5 | Update bids |

**Best Practices:**
- Cache configuration data (changes infrequently)
- Batch campaign operations when possible
- Monitor budget in WB Cabinet, not via frequent API calls
- Use statistics endpoints sparingly (aggregate data daily)

### Troubleshooting

#### Campaign Won't Start

**Error:** Campaign remains in status `4` after calling `getAdvStart()`

**Possible Causes & Solutions:**

1. **"Apply Changes" not clicked in WB Cabinet**
   - Solution: Log in to WB Promotion Cabinet and click "Apply Changes"

2. **Budget not set**
   - Solution: Set campaign budget in WB Cabinet

3. **Minimum bids not met**
   - Solution: Check minimum bids with `createBidsMin()` and update

```typescript
// Verify minimum bids are met
const minBids = await sdk.promotion.createBidsMin({
  advert_id: campaignId,
  nm_ids: [12345],
  payment_type: 'cpm',
  placement_types: ['search']
});

console.log(`Minimum bid for search: ${minBids.bids[0].bids[0].value} RUB`);
// Ensure your bid >= minimum bid
```

#### Campaign Paused Automatically

**Issue:** Campaign status changed to `11` (paused) unexpectedly

**Possible Causes:**
1. **Budget exhausted** - Top up in WB Cabinet
2. **Product out of stock** - Replenish inventory
3. **Product deleted/blocked** - Check product status

#### Bid Update Fails

**Error:** `ValidationError: Bid below minimum`

**Solution:** Get current minimum bids and ensure your bids meet requirements:

```typescript
const minBids = await sdk.promotion.createBidsMin({
  advert_id: campaignId,
  nm_ids: productIds,
  payment_type: 'cpm',
  placement_types: ['search', 'recommendation']
});

// Calculate safe bids (10% above minimum)
const safeBids = minBids.bids.map(product => ({
  advertId: campaignId,
  nm: product.nm_id,
  cpm: Math.ceil(product.bids[0].value * 1.1)
}));

await sdk.promotion.updateAdvBids({ bids: safeBids });
```

#### Statistics Not Updating

**Issue:** `getFullstatsV2()` returns stale data

**Possible Causes:**
1. **Data lag** - Statistics update every 15-30 minutes
2. **Campaign recently started** - Wait 1-2 hours for first data
3. **No impressions** - Campaign not winning auctions (increase bids)

### Complete Campaign Workflow Example

Automated campaign creation and optimization:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function createOptimizedCampaign() {
  // Step 1: Get available products
  const subjects = await sdk.promotion.getSupplierSubjects();
  const topSubject = subjects.sort((a, b) => (b.count || 0) - (a.count || 0))[0];

  console.log(`Selected category: ${topSubject.name} (${topSubject.count} products)`);

  const products = await sdk.promotion.createSupplierNms([topSubject.id]);
  const topProducts = products.slice(0, 10); // Select top 10 products

  // Step 2: Create campaign
  const campaignId = await sdk.promotion.createSeacatSaveAd({
    name: `Auto Campaign - ${topSubject.name} - ${new Date().toISOString().split('T')[0]}`,
    nms: topProducts.map(p => p.nm),
    bid_type: 'manual',
    placement_types: ['search', 'recommendations']
  });

  console.log(`Campaign created: ${campaignId}`);

  // Step 3: Get minimum bids
  const minBids = await sdk.promotion.createBidsMin({
    advert_id: campaignId,
    nm_ids: topProducts.map(p => p.nm),
    payment_type: 'cpm',
    placement_types: ['search', 'recommendation']
  });

  // Step 4: Set competitive bids (20% above minimum)
  const bids = minBids.bids.flatMap(product =>
    product.bids.map(bid => ({
      advertId: campaignId,
      type: bid.type,
      nm: product.nm_id,
      cpm: Math.ceil(bid.value * 1.2)
    }))
  );

  await sdk.promotion.updateAdvBids({ bids });
  console.log(`Bids set for ${bids.length} placements`);

  // Step 5: Instructions for manual steps
  console.log('\n📋 Next Steps (Manual):');
  console.log('1. Log in to WB Promotion Cabinet');
  console.log('2. Set campaign budget (recommended: 5000 RUB)');
  console.log('3. Click "Apply Changes"');
  console.log(`4. Return here and run: sdk.promotion.getAdvStart({ id: ${campaignId} })`);
}

createOptimizedCampaign().catch(console.error);
```

---

## Tariffs Module Deep Dive

The Tariffs module provides commission rates and storage/delivery cost lookup for financial planning and pricing optimization.

### Commission Rates

Get commission percentages by product category:

```typescript
// Get commission data for all categories
const commission = await sdk.tariffs.getTariffsCommission();

console.log('Commission Structure:');
commission.report?.forEach(category => {
  console.log(`\n${category.parentName}:`);
  console.log(`  Parent ID: ${category.parentID}`);
  console.log(`  Subject Name: ${category.subjectName}`);
  console.log(`  Subject ID: ${category.subjectID}`);
  console.log(`  Commission (FBO): ${category.kgvpMarketplace}%`);
  console.log(`  Commission (FBS): ${category.kgvpSupplier}%`);
  console.log(`  Commission (DBS): ${category.kgvpSupplierExpress}%`);
});

// Find commission for specific category
const electronics = commission.report?.find(c =>
  c.subjectName?.toLowerCase().includes('electronics')
);

console.log(`\n📱 Electronics Commission:`);
console.log(`  FBO (WB Warehouse): ${electronics.kgvpMarketplace}%`);
console.log(`  FBS (Seller Warehouse): ${electronics.kgvpSupplier}%`);
console.log(`  DBS (Express Delivery): ${electronics.kgvpSupplierExpress}%`);
```

**Commission Types:**
- **FBO (Fulfillment by Ozon/WB)**: Marketplace warehouse fulfillment
- **FBS (Fulfillment by Seller)**: Seller warehouse fulfillment
- **DBS (Delivery by Seller)**: Express delivery by seller

**Use Cases:**
- Pricing calculations: `sellerRevenue = salePrice * (1 - commission/100)`
- Category selection: Choose categories with lower commissions
- Business model comparison: FBO vs FBS profitability analysis

### Box Storage Tariffs

Get storage and delivery costs for boxed goods:

```typescript
// Get box tariffs
const boxTariffs = await sdk.tariffs.getTariffsBox();

console.log('📦 Box Storage Tariffs:');
boxTariffs.response?.data?.warehouseList?.forEach(warehouse => {
  console.log(`\nWarehouse: ${warehouse.warehouseName}`);
  console.log(`  Delivery to Customer:`);

  warehouse.boxDeliveryAndStorageExpr?.forEach(tariff => {
    console.log(`    Liter Volume ${tariff.boxDeliveryBase}:`);
    console.log(`      Base Cost: ${tariff.boxDeliveryLiter} RUB/liter`);
    console.log(`      Additional: +${tariff.boxDeliveryAdditional} RUB/liter`);
  });

  console.log(`  Return from Customer:`);
  warehouse.boxDeliveryReturnExpr?.forEach(tariff => {
    console.log(`    Liter Volume ${tariff.boxDeliveryBase}:`);
    console.log(`      Base Cost: ${tariff.boxDeliveryLiter} RUB/liter`);
  });

  console.log(`  Storage Cost: ${warehouse.boxStorageBase} RUB/liter/day`);
});

// Calculate storage cost for specific product
const productVolumeLiters = 5.2; // Product volume
const storageDays = 30;          // Storage duration

const warehouseTariff = boxTariffs.response?.data?.warehouseList?.[0];
const storageCostPerDay = warehouseTariff.boxStorageBase || 0;
const totalStorageCost = productVolumeLiters * storageCostPerDay * storageDays;

console.log(`\n💰 Storage Cost Calculation:`);
console.log(`  Product Volume: ${productVolumeLiters} liters`);
console.log(`  Storage Days: ${storageDays}`);
console.log(`  Cost per Liter/Day: ${storageCostPerDay} RUB`);
console.log(`  Total Storage Cost: ${totalStorageCost.toFixed(2)} RUB`);
```

**Tariff Components:**
- **boxDeliveryBase**: Base liter volume threshold
- **boxDeliveryLiter**: Cost per liter for delivery
- **boxDeliveryAdditional**: Additional cost per liter above threshold
- **boxStorageBase**: Storage cost per liter per day
- **boxDeliveryReturnExpr**: Return delivery costs

### Pallet Storage Tariffs

Get storage and delivery costs for mono-pallet goods:

```typescript
// Get pallet tariffs
const palletTariffs = await sdk.tariffs.getTariffsPallet();

console.log('🏗️ Pallet Storage Tariffs:');
palletTariffs.response?.data?.warehouseList?.forEach(warehouse => {
  console.log(`\nWarehouse: ${warehouse.warehouseName}`);
  console.log(`  Delivery to Customer: ${warehouse.palletDeliveryExpr} RUB`);
  console.log(`  Return from Customer: ${warehouse.palletReturnExpr} RUB`);
  console.log(`  Storage Cost: ${warehouse.palletStorageExpr} RUB/day`);
});

// Calculate total cost for pallet shipment
const deliveryCost = palletTariffs.response?.data?.warehouseList?.[0].palletDeliveryExpr || 0;
const palletStorageDays = 15;
const storageCostPerDay = palletTariffs.response?.data?.warehouseList?.[0].palletStorageExpr || 0;
const totalCost = deliveryCost + (storageCostPerDay * palletStorageDays);

console.log(`\n💰 Pallet Cost Breakdown:`);
console.log(`  Delivery: ${deliveryCost} RUB`);
console.log(`  Storage (${palletStorageDays} days): ${(storageCostPerDay * palletStorageDays).toFixed(2)} RUB`);
console.log(`  Total: ${totalCost.toFixed(2)} RUB`);
```

**Use Cases:**
- Large item cost estimation
- Warehouse selection optimization
- Pricing strategy for bulky products

### Return Handling Tariffs

Get costs for processing customer returns:

```typescript
// Get return tariffs
const returnTariffs = await sdk.tariffs.getTariffsReturn();

console.log('↩️ Return Handling Tariffs:');
returnTariffs.response?.data?.warehouseList?.forEach(warehouse => {
  console.log(`\nWarehouse: ${warehouse.warehouseName}`);
  console.log(`  Return Pickup: ${warehouse.returnPriceExpr} RUB`);
  console.log(`  Return Re-Delivery: ${warehouse.returnRedeliveryExpr} RUB`);
});

// Calculate return cost impact on profitability
const salePrice = 1000;              // Product sale price
const returnRate = 0.15;             // 15% return rate
const returnPickupCost = returnTariffs.response?.data?.warehouseList?.[0].returnPriceExpr || 0;

const expectedReturnCost = salePrice * returnRate * (returnPickupCost / salePrice);

console.log(`\n💸 Return Cost Impact:`);
console.log(`  Sale Price: ${salePrice} RUB`);
console.log(`  Return Rate: ${(returnRate * 100).toFixed(0)}%`);
console.log(`  Return Pickup Cost: ${returnPickupCost} RUB`);
console.log(`  Expected Cost per Sale: ${expectedReturnCost.toFixed(2)} RUB`);
console.log(`  Impact on Margin: ${((expectedReturnCost / salePrice) * 100).toFixed(2)}%`);
```

**Return Tariff Fields:**
- **returnPriceExpr**: Cost to transport return from WB to seller
- **returnRedeliveryExpr**: Cost if seller doesn't collect return

### Rate Limits

Tariffs module endpoints have varying limits:

| Endpoint | Limit | Interval | Burst | Notes |
|----------|-------|----------|-------|-------|
| `getTariffsCommission()` | 1 request | 1 minute | 2 | Commission rates |
| `getTariffsBox()` | 60 requests | 1 minute | 5 | Box tariffs |
| `getTariffsPallet()` | 60 requests | 1 minute | 5 | Pallet tariffs |
| `getTariffsReturn()` | 60 requests | 1 minute | 5 | Return tariffs |

**Best Practices:**
- Cache commission data (changes infrequently, maybe quarterly)
- Cache tariff data for 24 hours (updates periodically)
- Use cached data for pricing calculations to avoid rate limits

### Complete Pricing Calculation Example

Comprehensive profitability analysis using tariffs data:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function calculateProfitability(productParams: {
  salePrice: number;
  costPrice: number;
  volumeLiters: number;
  categoryName: string;
  storageDays: number;
  expectedReturnRate: number;
}) {
  // Get all tariff data
  const [commission, boxTariffs, returnTariffs] = await Promise.all([
    sdk.tariffs.getTariffsCommission(),
    sdk.tariffs.getTariffsBox(),
    sdk.tariffs.getTariffsReturn()
  ]);

  // Find category commission
  const categoryCommission = commission.report?.find(c =>
    c.subjectName?.toLowerCase().includes(productParams.categoryName.toLowerCase())
  );

  const commissionRate = categoryCommission?.kgvpSupplier || 15; // Default 15% if not found

  // Calculate costs
  const commissionAmount = productParams.salePrice * (commissionRate / 100);

  const warehouse = boxTariffs.response?.data?.warehouseList?.[0];
  const storageCostPerLiterDay = warehouse?.boxStorageBase || 0;
  const storageCost = productParams.volumeLiters * storageCostPerLiterDay * productParams.storageDays;

  const deliveryCost = (warehouse?.boxDeliveryAndStorageExpr?.[0]?.boxDeliveryLiter || 0) *
                       productParams.volumeLiters;

  const returnCost = (returnTariffs.response?.data?.warehouseList?.[0]?.returnPriceExpr || 0) *
                     productParams.expectedReturnRate;

  // Calculate profit
  const totalCosts = productParams.costPrice + commissionAmount + storageCost +
                     deliveryCost + returnCost;
  const profit = productParams.salePrice - totalCosts;
  const margin = (profit / productParams.salePrice) * 100;

  console.log('\n📊 Profitability Analysis:');
  console.log(`\nRevenue:`);
  console.log(`  Sale Price: ${productParams.salePrice.toFixed(2)} RUB`);
  console.log(`\nCosts:`);
  console.log(`  Product Cost: ${productParams.costPrice.toFixed(2)} RUB`);
  console.log(`  Commission (${commissionRate}%): ${commissionAmount.toFixed(2)} RUB`);
  console.log(`  Storage (${productParams.storageDays}d): ${storageCost.toFixed(2)} RUB`);
  console.log(`  Delivery: ${deliveryCost.toFixed(2)} RUB`);
  console.log(`  Returns (${(productParams.expectedReturnRate * 100).toFixed(0)}%): ${returnCost.toFixed(2)} RUB`);
  console.log(`  Total Costs: ${totalCosts.toFixed(2)} RUB`);
  console.log(`\nProfit:`);
  console.log(`  Net Profit: ${profit.toFixed(2)} RUB`);
  console.log(`  Margin: ${margin.toFixed(2)}%`);
  console.log(`\n${margin > 20 ? '✅ Good margins!' : margin > 10 ? '⚠️ Acceptable margins' : '❌ Low margins - reconsider pricing'}`);
}

// Example usage
calculateProfitability({
  salePrice: 1500,
  costPrice: 600,
  volumeLiters: 3.5,
  categoryName: 'electronics',
  storageDays: 20,
  expectedReturnRate: 0.10
}).catch(console.error);
```

---

### In-Store Pickup Module Deep Dive

The **In-Store Pickup Module** (also known as Click & Collect) manages the complete lifecycle of orders where customers purchase online and pick up at the seller's physical location. This module handles order assembly workflows, customer verification, and product metadata management for regulated products requiring identification codes.

**Key Features**:
- 🔄 **Order Lifecycle Management**: Process orders through 6 state transitions (new → confirm → prepare → receive/reject/cancel)
- 👤 **Customer Verification**: Identity verification with passcode validation at pickup
- 🏷️ **Metadata Management**: Handle regulated product codes (SGTIN, UIN, IMEI, GTIN)
- 📊 **Order Queries**: Filter and retrieve completed orders with pagination
- ⚠️ **Critical Rate Limit**: 409 error responses count as **5 requests** toward rate limits!

---

#### Order Lifecycle State Machine

In-Store Pickup orders follow a strict state machine with defined transitions:

```
┌─────────────────────────────────────────────────────────────┐
│                    Order Lifecycle States                    │
└─────────────────────────────────────────────────────────────┘

  new (Order placed by customer)
   │
   │ confirmOrder()
   ↓
  confirm (Assembly in progress)
   │
   │ prepareOrder()
   ↓
  prepare (Ready for customer pickup)
   │
   ├─── receiveOrder() ──→ receive (Completed - customer picked up)
   │
   └─── rejectOrder() ──→ reject (Completed - customer didn't pick up)

  Any state ──── cancelOrder() ──→ cancel (Seller cancellation)
```

**State Descriptions**:
- `new`: Order just placed, awaiting seller confirmation
- `confirm`: Seller confirmed and is assembling the order
- `prepare`: Order assembled and ready for customer pickup
- `receive`: Terminal state - customer successfully picked up order
- `reject`: Terminal state - customer refused or didn't show up
- `cancel`: Terminal state - seller cancelled the order

---

#### Order Assembly Management

**1. Get New Orders**

Retrieve all new pickup orders awaiting processing:

```typescript
const response = await sdk.inStorePickup.getNewOrders();

response.orders.forEach(order => {
  console.log(`Order ${order.id}: ${order.article}`);
  console.log(`Customer code: ${order.orderCode}`);
  console.log(`Required metadata: ${order.requiredMeta?.join(', ') || 'None'}`);

  // Check if regulated product requires identification codes
  if (order.requiredMeta?.includes('sgtin')) {
    console.log('⚠️ Честный знак marking required');
  }
  if (order.requiredMeta?.includes('imei')) {
    console.log('⚠️ IMEI code required for electronics');
  }
});
```

**2. Confirm and Start Assembly**

Transition order from `new` to `confirm` status:

```typescript
try {
  await sdk.inStorePickup.confirmOrder(orderId);
  console.log('✅ Order confirmed - assembly started');

  // Now set any required metadata codes
  if (requiresIMEI) {
    await sdk.inStorePickup.setIMEICode(orderId, '123456789012345');
  }
} catch (error) {
  if (error.name === 'InvalidOrderStateError') {
    console.error('Order is not in correct state for confirmation');
  }
}
```

**3. Mark Order as Prepared**

Transition order from `confirm` to `prepare` status when ready for pickup:

```typescript
try {
  await sdk.inStorePickup.prepareOrder(orderId);
  console.log('✅ Order prepared and ready for customer pickup');

  // Notify customer that order is ready (via your notification system)
} catch (error) {
  if (error.name === 'InvalidOrderStateError') {
    console.error('Order must be confirmed before preparation');
  }
}
```

**4. Complete or Reject Order**

After customer arrival:

```typescript
// Option A: Customer picks up order
await sdk.inStorePickup.receiveOrder(orderId);
console.log('✅ Order successfully handed over to customer');

// Option B: Customer refuses or doesn't show up
await sdk.inStorePickup.rejectOrder(orderId);
console.log('❌ Order marked as rejected by customer');
```

**5. Cancel Order (Any Time)**

Seller can cancel order from any state:

```typescript
try {
  await sdk.inStorePickup.cancelOrder(orderId);
  console.log('🚫 Order cancelled by seller');
} catch (error) {
  console.error('Cancellation failed:', error.message);
}
```

---

#### Customer Verification Workflow

**1. Get Customer Information**

Retrieve customer contact details for orders in `confirm` or `prepare` status:

```typescript
const customerInfo = await sdk.inStorePickup.getCustomerInfo([orderId]);

customerInfo.orders.forEach(info => {
  console.log(`Order ${info.orderID}:`);
  console.log(`  Customer: ${info.firstName}`);
  console.log(`  Phone: ${info.phone}, extension ${info.phoneCode}`);
  console.log(`  ⚠️ Phone requires extension code - not direct number`);
});
```

**Note**: The phone number returned is **NOT** a direct customer number. You must use the extension code (`phoneCode`) when calling the customer.

**2. Verify Customer Identity at Pickup**

When customer arrives, verify their identity with passcode from their app:

```typescript
try {
  const verification = await sdk.inStorePickup.verifyCustomerIdentity({
    orderCode: '21117866-0006', // Customer's unique order code
    passcode: '1234'             // 4-digit code from customer's WB app
  });

  if (verification.ok) {
    console.log('✅ Customer verified! Proceed with handover');

    // Complete order handover
    await sdk.inStorePickup.receiveOrder(orderId);
  }
} catch (error) {
  if (error.name === 'CustomerVerificationError') {
    console.error('❌ Invalid passcode - ask customer to check their app');
    console.log('Remaining attempts: Check customer app for lockout status');
  } else if (error.name === 'NotFoundError') {
    console.error('❌ Order not found or not ready for pickup');
  }
}
```

**⚠️ Important Rate Limit**: `verifyCustomerIdentity` has the **most restrictive** rate limit in the entire SDK:
- **30 requests per minute**
- **2 second interval**
- **20 burst capacity**

This is significantly lower than other endpoints (typically 300/min). Plan your verification workflow accordingly to avoid rate limit errors during peak pickup times.

---

#### Metadata Management for Regulated Products

Many products require identification codes for regulatory compliance (e.g., Честный знак marking in Russia, IMEI for electronics, Belarus product IDs).

**1. Get Order Metadata**

Check what identification codes are assigned to an order:

```typescript
const metadata = await sdk.inStorePickup.getOrderMetadata(orderId);

console.log('Order metadata:');
if (metadata.meta.sgtin?.value) {
  console.log(`SGTIN (Честный знак): ${metadata.meta.sgtin.value.join(', ')}`);
}
if (metadata.meta.imei?.value) {
  console.log(`IMEI (Electronics): ${metadata.meta.imei.value}`);
}
if (metadata.meta.uin?.value) {
  console.log(`UIN: ${metadata.meta.uin.value}`);
}
if (metadata.meta.gtin?.value) {
  console.log(`GTIN (Belarus): ${metadata.meta.gtin.value}`);
}
```

**2. Set SGTIN Codes (Честный знак Marking)**

For products in Russia's Честный знак mandatory marking system:

```typescript
// Scan SGTIN codes from product marking (2D barcodes)
const sgtinCodes = [
  '01047264500236891521AbCdEf1234567890',
  '01047264500236892521GhIjKl0987654321'
];

await sdk.inStorePickup.setSGTINCode(orderId, sgtinCodes);
console.log('✅ Честный знак codes assigned');
```

**Requirements**:
- Order must be in `confirm` status
- `sgtin` must be in order's `requiredMeta` array
- Each SGTIN code: 16-135 characters

**3. Set IMEI Code (Electronics)**

For electronic devices requiring IMEI identification:

```typescript
// Scan IMEI from device (15 digits)
await sdk.inStorePickup.setIMEICode(orderId, '123456789012345');
console.log('✅ IMEI code assigned');
```

**Requirements**:
- Order must be in `confirm` status
- `imei` must be in order's `requiredMeta` array
- IMEI code: exactly 15 digits

**4. Set UIN Code**

For products requiring Unique Identification Number:

```typescript
await sdk.inStorePickup.setUINCode(orderId, '1234567890123456');
console.log('✅ UIN code assigned');
```

**5. Set GTIN Code (Belarus)**

For products sold in Belarus requiring GTIN:

```typescript
await sdk.inStorePickup.setGTINCode(orderId, '1234567890123456');
console.log('✅ GTIN code assigned');
```

**6. Delete Metadata**

Remove metadata if incorrect code was set:

```typescript
// Delete IMEI code
await sdk.inStorePickup.deleteOrderMetadata(orderId, 'imei');
console.log('✅ IMEI metadata deleted');

// Valid keys: 'imei', 'uin', 'gtin', 'sgtin'
```

---

#### Order Queries and Historical Data

**1. Get Completed Orders with Pagination**

Retrieve completed pickup orders for a specific time period (maximum 30 calendar days):

```typescript
async function getCompletedOrders(daysBack: number): Promise<Order[]> {
  const now = Math.floor(Date.now() / 1000);
  const startDate = now - (daysBack * 24 * 60 * 60);

  let allOrders: Order[] = [];
  let next = 0;

  do {
    const response = await sdk.inStorePickup.getOrders({
      limit: 1000,        // Max 1000 per request
      next,               // Pagination offset
      dateFrom: startDate,
      dateTo: now
    });

    allOrders = allOrders.concat(response.orders);
    next = response.next; // 0 means no more pages

    console.log(`Retrieved ${response.orders.length} orders, total: ${allOrders.length}`);
  } while (next !== 0);

  return allOrders;
}

// Get last 7 days of completed orders
const orders = await getCompletedOrders(7);
console.log(`Total completed orders: ${orders.length}`);

// Analyze completion rates
const received = orders.filter(o => o.status === 'receive').length;
const rejected = orders.filter(o => o.status === 'reject').length;
const cancelled = orders.filter(o => o.status === 'cancel').length;

console.log(`Pickup rate: ${(received / orders.length * 100).toFixed(2)}%`);
console.log(`Rejection rate: ${(rejected / orders.length * 100).toFixed(2)}%`);
console.log(`Cancellation rate: ${(cancelled / orders.length * 100).toFixed(2)}%`);
```

**⚠️ Important Limits**:
- Maximum 30 calendar days per request
- `limit`: 1-1000 orders per page
- Use `next` field for pagination (0 = no more pages)

**2. Get Order Statuses**

Check current status of multiple orders:

```typescript
const orderIds = [12345, 12346, 12347];
const statuses = await sdk.inStorePickup.getOrderStatuses(orderIds);

statuses.orders.forEach(status => {
  console.log(`Order ${status.id}:`);
  console.log(`  Supplier Status: ${status.supplierStatus}`);
  console.log(`  WB System Status: ${status.wbStatus}`);
});
```

**Status Types**:
- **Supplier Status** (seller-controlled): `new`, `confirm`, `prepare`, `receive`, `reject`, `cancel`, `cancel_shelf_life`
- **WB Status** (system-controlled): `waiting`, `sold`, `canceled`, `canceled_by_client`, `declined_by_client`, `defect`, `ready_for_pickup`

---

#### Rate Limits Table

| Method | Requests/Min | Interval | Burst | 409 Penalty |
|--------|--------------|----------|-------|-------------|
| `getNewOrders()` | 300 | 200ms | 20 | 5x |
| `confirmOrder()` | 100 | 600ms | 20 | 5x |
| `prepareOrder()` | 100 | 600ms | 20 | 5x |
| `receiveOrder()` | 100 | 600ms | 20 | 5x |
| `rejectOrder()` | 100 | 600ms | 20 | 5x |
| `cancelOrder()` | 100 | 600ms | 20 | 5x |
| `getOrders()` | 300 | 200ms | 20 | 5x |
| `getOrderStatuses()` | 300 | 200ms | 20 | 5x |
| `getCustomerInfo()` | 300 | 200ms | 20 | 5x |
| `verifyCustomerIdentity()` | **30** | **2s** | 20 | 5x |
| `getOrderMetadata()` | 300 | 200ms | 20 | 5x |
| `deleteOrderMetadata()` | 300 | 200ms | 20 | 5x |
| `setSGTINCode()` | 1000 | 60ms | 20 | 5x |
| `setUINCode()` | 1000 | 60ms | 20 | 5x |
| `setIMEICode()` | 1000 | 60ms | 20 | 5x |
| `setGTINCode()` | 1000 | 60ms | 20 | 5x |

**⚠️ Critical Note**: 409 error responses (invalid state transitions) count as **5 requests** toward your rate limit! Always validate order state before making state transition calls to avoid rapid rate limit exhaustion.

---

#### Troubleshooting Common Scenarios

**1. Invalid State Transition (409 Error)**

```typescript
try {
  await sdk.inStorePickup.prepareOrder(orderId);
} catch (error) {
  if (error.name === 'InvalidOrderStateError') {
    // Get current status first
    const statuses = await sdk.inStorePickup.getOrderStatuses([orderId]);
    const currentStatus = statuses.orders[0].supplierStatus;

    console.error(`Cannot prepare order - current status: ${currentStatus}`);
    console.log('Valid transitions:');
    console.log('  new → confirm (use confirmOrder)');
    console.log('  confirm → prepare (use prepareOrder)');
    console.log('  prepare → receive/reject (use receiveOrder/rejectOrder)');
  }
}
```

**Solution**: Always check order status before attempting state transitions. Use `getOrderStatuses()` to verify current state.

**2. Customer Verification Fails**

```typescript
try {
  await sdk.inStorePickup.verifyCustomerIdentity({
    orderCode: customerOrderCode,
    passcode: enteredPasscode
  });
} catch (error) {
  if (error.name === 'CustomerVerificationError') {
    console.error('❌ Passcode verification failed');
    console.log('Possible causes:');
    console.log('  1. Customer entered wrong passcode');
    console.log('  2. Order code is incorrect');
    console.log('  3. Order is not in "prepare" status yet');
    console.log('  4. Passcode expired or changed');

    // Ask customer to:
    // - Check WB app for correct passcode
    // - Verify order code matches
    // - Wait if order not yet ready
  }
}
```

**Solution**:
- Verify order is in `prepare` status before verification
- Ask customer to open WB app and confirm passcode
- Check order code matches exactly (case-sensitive)
- Implement retry logic with exponential backoff

**3. Metadata Update Fails (409 Error)**

```typescript
try {
  await sdk.inStorePickup.setSGTINCode(orderId, sgtinCodes);
} catch (error) {
  if (error.name === 'MetadataValidationError') {
    console.error('❌ Cannot update metadata');

    // Check order requirements
    const newOrders = await sdk.inStorePickup.getNewOrders();
    const order = newOrders.orders.find(o => o.id === orderId);

    if (!order) {
      console.error('Order not found in new orders list');
    } else if (!order.requiredMeta?.includes('sgtin')) {
      console.error('SGTIN not required for this order');
    } else {
      console.error('Order must be in "confirm" status to set metadata');
    }
  }
}
```

**Solution**:
- Verify order is in `confirm` status
- Check `requiredMeta` array contains the metadata type
- Validate metadata format (SGTIN: 16-135 chars, IMEI: 15 digits)

**4. Rate Limit Exhausted from 409 Errors**

```typescript
// BAD: Rapid state transition attempts without validation
for (const orderId of orderIds) {
  try {
    await sdk.inStorePickup.prepareOrder(orderId); // May cause many 409s
  } catch (error) {
    // Each 409 counts as 5 requests!
  }
}

// GOOD: Validate states first, then update
const statuses = await sdk.inStorePickup.getOrderStatuses(orderIds);
const ordersToConfirm = statuses.orders
  .filter(s => s.supplierStatus === 'new')
  .map(s => s.id);

const ordersToPrepare = statuses.orders
  .filter(s => s.supplierStatus === 'confirm')
  .map(s => s.id);

// Now update only valid orders
for (const orderId of ordersToPrepare) {
  await sdk.inStorePickup.prepareOrder(orderId);
  await new Promise(resolve => setTimeout(resolve, 700)); // Respect 600ms interval
}
```

**Solution**: Always check order status before state transitions to minimize 409 errors and avoid rapid rate limit consumption.

---

#### Complete Workflow Example

**Full In-Store Pickup Workflow with Error Handling**

```typescript
import { WildberriesSDK } from '@your-org/wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

async function processPickupOrder() {
  try {
    // Step 1: Get new pickup orders
    console.log('📦 Fetching new pickup orders...');
    const newOrdersResponse = await sdk.inStorePickup.getNewOrders();

    if (newOrdersResponse.orders.length === 0) {
      console.log('No new orders to process');
      return;
    }

    const order = newOrdersResponse.orders[0];
    console.log(`Processing order ${order.id}: ${order.article}`);
    console.log(`Customer code: ${order.orderCode}`);

    // Step 2: Confirm order and start assembly
    console.log('\n🔄 Confirming order...');
    await sdk.inStorePickup.confirmOrder(order.id);
    console.log('✅ Order confirmed - assembly started');

    // Step 3: Set required metadata codes (if any)
    if (order.requiredMeta && order.requiredMeta.length > 0) {
      console.log(`\n🏷️ Setting required metadata: ${order.requiredMeta.join(', ')}`);

      if (order.requiredMeta.includes('sgtin')) {
        // Scan Честный знак codes from product marking
        const sgtinCodes = ['01047264500236891521AbCdEf1234567890'];
        await sdk.inStorePickup.setSGTINCode(order.id, sgtinCodes);
        console.log('✅ SGTIN codes assigned');
      }

      if (order.requiredMeta.includes('imei')) {
        // Scan IMEI from electronic device
        const imeiCode = '123456789012345';
        await sdk.inStorePickup.setIMEICode(order.id, imeiCode);
        console.log('✅ IMEI code assigned');
      }
    }

    // Step 4: Complete assembly and mark as prepared
    console.log('\n📦 Completing assembly...');
    await sdk.inStorePickup.prepareOrder(order.id);
    console.log('✅ Order prepared and ready for customer pickup');

    // Notify customer that order is ready (via your notification system)
    console.log('📧 Customer notified - order ready for pickup');

    // Step 5: Wait for customer arrival and verify identity
    console.log('\n⏳ Waiting for customer arrival...');

    // When customer arrives, get their information
    const customerInfo = await sdk.inStorePickup.getCustomerInfo([order.id]);
    const customer = customerInfo.orders[0];

    console.log(`\n👤 Customer arrived: ${customer.firstName}`);
    console.log(`   Contact: ${customer.phone}, extension ${customer.phoneCode}`);

    // Verify customer identity with passcode
    console.log('\n🔐 Verifying customer identity...');

    // Customer provides their order code and passcode from WB app
    const verificationResult = await sdk.inStorePickup.verifyCustomerIdentity({
      orderCode: order.orderCode,
      passcode: '1234' // From customer's WB app
    });

    if (verificationResult.ok) {
      console.log('✅ Customer identity verified');

      // Step 6: Complete handover
      console.log('\n🤝 Completing order handover...');
      await sdk.inStorePickup.receiveOrder(order.id);
      console.log('✅ Order successfully handed over to customer');

      // Get final order status
      const finalStatuses = await sdk.inStorePickup.getOrderStatuses([order.id]);
      const finalStatus = finalStatuses.orders[0];

      console.log('\n📊 Final Status:');
      console.log(`   Supplier: ${finalStatus.supplierStatus}`);
      console.log(`   WB System: ${finalStatus.wbStatus}`);
    }

  } catch (error) {
    console.error('\n❌ Error processing pickup order:', error);

    if (error.name === 'InvalidOrderStateError') {
      console.error('Invalid state transition - check order status');
    } else if (error.name === 'CustomerVerificationError') {
      console.error('Customer verification failed - check passcode');
      console.log('Ask customer to verify passcode in WB app');
    } else if (error.name === 'MetadataValidationError') {
      console.error('Metadata update failed - check requirements and format');
    } else if (error.name === 'RateLimitError') {
      console.error('Rate limit exceeded - implement exponential backoff');
      console.log('Wait before retrying. Note: 409 errors count as 5 requests!');
    }
  }
}

// Run the workflow
processPickupOrder().catch(console.error);

// Analytics: Track pickup performance
async function analyzePickupPerformance() {
  const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
  const now = Math.floor(Date.now() / 1000);

  let allOrders: any[] = [];
  let next = 0;

  do {
    const response = await sdk.inStorePickup.getOrders({
      limit: 1000,
      next,
      dateFrom: sevenDaysAgo,
      dateTo: now
    });

    allOrders = allOrders.concat(response.orders);
    next = response.next;
  } while (next !== 0);

  const received = allOrders.filter(o => o.supplierStatus === 'receive').length;
  const rejected = allOrders.filter(o => o.supplierStatus === 'reject').length;
  const cancelled = allOrders.filter(o => o.supplierStatus === 'cancel').length;

  console.log('\n📊 7-Day Pickup Performance:');
  console.log(`   Total orders: ${allOrders.length}`);
  console.log(`   Successful pickups: ${received} (${(received / allOrders.length * 100).toFixed(2)}%)`);
  console.log(`   Customer rejections: ${rejected} (${(rejected / allOrders.length * 100).toFixed(2)}%)`);
  console.log(`   Seller cancellations: ${cancelled} (${(cancelled / allOrders.length * 100).toFixed(2)}%)`);
}
```

---

## Documentation

- **[📖 Documentation Hub](./docs/index.md)** - Complete SDK documentation
- **[🚀 Getting Started](./docs/getting-started/)** - Installation, quickstart, and tutorials
- **[📚 Guides](./docs/guides/)** - Best practices, troubleshooting, and production deployment
- **[🔍 API Reference](./docs/api/)** - Complete API documentation with method signatures
- **[💡 Examples](./docs/examples/)** - Working code examples for common use cases

**Project Documentation (Internal):**
- **[Architecture](./docs/architecture.md)** - Technical architecture and design decisions
- **[PRD](./docs/prd.md)** - Product requirements and specifications

---

## Development

### Prerequisites

- Node.js 20.x LTS
- npm 10.x

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/wb-api-sdk.git
cd wb-api-sdk

# Install dependencies
npm install

# Run tests
npm test

# Build SDK
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

### Scripts

- `npm run build` - Build ESM and CommonJS bundles
- `npm test` - Run test suite
- `npm run test:coverage` - Generate coverage report
- `npm run type-check` - TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

---

## Contributing

We welcome contributions from the community! 🎉

### Quick Start for Contributors

1. Read our [Contributing Guide](CONTRIBUTING.md) for development setup and workflow
2. Review our [Code of Conduct](CODE_OF_CONDUCT.md) - we're committed to a welcoming community
3. Check out [Good First Issues](https://github.com/yourusername/wb-api-sdk/labels/good%20first%20issue) for beginner-friendly tasks
4. For security vulnerabilities, see our [Security Policy](SECURITY.md)

### Community

- **Questions?** Open an issue with the "question" label or start a discussion
- **Found a bug?** Use our bug report template
- **Have an idea?** Use our feature request template
- **Need help?** Check existing issues or ask in discussions

### Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- This section will be auto-generated by all-contributors bot -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Thank you to all our contributors! 💙

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/wb-api-sdk/issues)
- **Documentation**: [API Reference](https://yourusername.github.io/wb-api-sdk/)
- **Email**: support@example.com

---

## Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Powered by [Vite](https://vitejs.dev/)
- Tested with [Vitest](https://vitest.dev/)
- API specifications provided by [Wildberries](https://dev.wildberries.ru/)

---

**Made with ❤️ for the Wildberries developer community**

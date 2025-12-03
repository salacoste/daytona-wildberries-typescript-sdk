# Sales Dashboard

Build a comprehensive sales analytics dashboard.

## Description

This use case demonstrates how to combine data from multiple SDK modules to create a complete sales analytics dashboard.

## Dashboard Overview

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

interface DashboardOverview {
  // Financial
  balance: number;
  currency: string;

  // Orders
  newOrders: number;
  totalOrdersToday: number;

  // Products
  totalProducts: number;
  activeProducts: number;

  // Communications
  pendingQuestions: number;
  pendingReviews: number;
}

async function getDashboardOverview(): Promise<DashboardOverview> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = Math.floor(today.getTime() / 1000);

  // Fetch all data in parallel
  const [
    balanceData,
    newOrdersData,
    ordersData,
    productsData,
    questionsData,
    reviewsData
  ] = await Promise.all([
    sdk.finances.getBalance(),
    sdk.ordersFBS.getNewOrders(),
    sdk.ordersFBS.getOrders({ dateFrom: todayTimestamp }),
    sdk.products.getAllProducts({ locale: 'ru' }),
    sdk.communications.getQuestionsCountUnanswered(),
    sdk.communications.getReviewsCount({ isAnswered: false })
  ]);

  return {
    balance: balanceData.for_withdraw,
    currency: balanceData.currency,
    newOrders: newOrdersData.orders?.length ?? 0,
    totalOrdersToday: ordersData.orders?.length ?? 0,
    totalProducts: productsData.length,
    activeProducts: productsData.filter(p => !p.trash).length,
    pendingQuestions: questionsData.data?.count ?? 0,
    pendingReviews: reviewsData.data?.countUnanswered ?? 0
  };
}
```

## Sales Analytics

```typescript
interface SalesAnalytics {
  period: { from: string; to: string };
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Array<{
    nmId: number;
    name: string;
    revenue: number;
    orders: number;
  }>;
  dailyRevenue: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

async function getSalesAnalytics(days = 30): Promise<SalesAnalytics> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const fromDate = startDate.toISOString().split('T')[0];

  // Get sales data
  const sales = await sdk.reports.getSales(fromDate, 0);

  // Get products for names
  const products = await sdk.products.getAllProducts({ locale: 'ru' });
  const productMap = new Map(products.map(p => [p.nmID, p]));

  // Calculate total revenue
  const totalRevenue = sales.reduce((sum, s) =>
    sum + (s.finishedPrice ?? 0), 0
  );

  // Calculate product performance
  const productRevenue: Map<number, { revenue: number; orders: number }> = new Map();
  sales.forEach(sale => {
    if (!sale.nmId) return;
    const existing = productRevenue.get(sale.nmId) ?? { revenue: 0, orders: 0 };
    existing.revenue += sale.finishedPrice ?? 0;
    existing.orders += 1;
    productRevenue.set(sale.nmId, existing);
  });

  const topProducts = Array.from(productRevenue.entries())
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 10)
    .map(([nmId, data]) => ({
      nmId,
      name: productMap.get(nmId)?.title ?? `Product ${nmId}`,
      revenue: data.revenue,
      orders: data.orders
    }));

  // Calculate daily revenue
  const dailyData: Map<string, { revenue: number; orders: number }> = new Map();
  sales.forEach(sale => {
    const date = sale.date?.split('T')[0] ?? 'unknown';
    const existing = dailyData.get(date) ?? { revenue: 0, orders: 0 };
    existing.revenue += sale.finishedPrice ?? 0;
    existing.orders += 1;
    dailyData.set(date, existing);
  });

  const dailyRevenue = Array.from(dailyData.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, data]) => ({
      date,
      revenue: data.revenue,
      orders: data.orders
    }));

  return {
    period: {
      from: fromDate,
      to: endDate.toISOString().split('T')[0]
    },
    totalRevenue,
    totalOrders: sales.length,
    averageOrderValue: sales.length > 0 ? totalRevenue / sales.length : 0,
    topProducts,
    dailyRevenue
  };
}
```

## Sales Funnel Analytics

```typescript
interface SalesFunnelReport {
  period: { from: string; to: string };
  views: number;
  clicks: number;
  cartAdditions: number;
  orders: number;
  conversions: {
    clickToView: number;
    cartToClick: number;
    orderToCart: number;
    orderToView: number;
  };
}

async function getSalesFunnel(days = 30): Promise<SalesFunnelReport> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const response = await sdk.analytics.getSalesFunnel({
    period: {
      begin: startDate.toISOString().replace('T', ' ').slice(0, 19),
      end: endDate.toISOString().replace('T', ' ').slice(0, 19)
    }
  });

  const data = response.data;

  return {
    period: {
      from: startDate.toISOString().split('T')[0],
      to: endDate.toISOString().split('T')[0]
    },
    views: data?.shows ?? 0,
    clicks: data?.clicks ?? 0,
    cartAdditions: data?.carts ?? 0,
    orders: data?.orders ?? 0,
    conversions: {
      clickToView: data?.shows ? (data.clicks / data.shows) * 100 : 0,
      cartToClick: data?.clicks ? (data.carts / data.clicks) * 100 : 0,
      orderToCart: data?.carts ? (data.orders / data.carts) * 100 : 0,
      orderToView: data?.shows ? (data.orders / data.shows) * 100 : 0
    }
  };
}
```

## Financial Summary

```typescript
interface FinancialSummary {
  currentBalance: number;
  availableForWithdraw: number;
  currency: string;
  commissionRates: {
    average: number;
    byCategory: Array<{
      category: string;
      rate: number;
    }>;
  };
  recentTransactions: Array<{
    date: string;
    amount: number;
    type: string;
  }>;
}

async function getFinancialSummary(): Promise<FinancialSummary> {
  const today = new Date().toISOString().split('T')[0];
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const [balance, commissions, transactions] = await Promise.all([
    sdk.finances.getBalance(),
    sdk.tariffs.getTariffsCommission(),
    sdk.finances.getTransactions({
      dateFrom: monthAgo,
      dateTo: today,
      period: 'daily'
    })
  ]);

  // Calculate average commission
  const rates = commissions.report?.map(c => c.kgvpMarketplace ?? 0) ?? [];
  const averageRate = rates.length > 0
    ? rates.reduce((a, b) => a + b, 0) / rates.length
    : 0;

  // Top categories by commission
  const byCategory = (commissions.report ?? [])
    .slice(0, 10)
    .map(c => ({
      category: c.subjectName ?? 'Unknown',
      rate: c.kgvpMarketplace ?? 0
    }));

  return {
    currentBalance: balance.balance,
    availableForWithdraw: balance.for_withdraw,
    currency: balance.currency,
    commissionRates: {
      average: averageRate,
      byCategory
    },
    recentTransactions: [] // Map transactions data
  };
}
```

## Complete Dashboard

```typescript
interface CompleteDashboard {
  overview: DashboardOverview;
  sales: SalesAnalytics;
  funnel: SalesFunnelReport;
  financial: FinancialSummary;
  generatedAt: string;
}

async function generateCompleteDashboard(): Promise<CompleteDashboard> {
  console.log('Generating dashboard...');

  const [overview, sales, funnel, financial] = await Promise.all([
    getDashboardOverview(),
    getSalesAnalytics(30),
    getSalesFunnel(30),
    getFinancialSummary()
  ]);

  return {
    overview,
    sales,
    funnel,
    financial,
    generatedAt: new Date().toISOString()
  };
}

// Usage
const dashboard = await generateCompleteDashboard();

console.log('=== SALES DASHBOARD ===');
console.log(`Generated: ${dashboard.generatedAt}`);
console.log('');
console.log('OVERVIEW:');
console.log(`  Balance: ${dashboard.overview.balance} ${dashboard.overview.currency}`);
console.log(`  New Orders: ${dashboard.overview.newOrders}`);
console.log(`  Active Products: ${dashboard.overview.activeProducts}`);
console.log('');
console.log('SALES (30 days):');
console.log(`  Revenue: ${dashboard.sales.totalRevenue.toFixed(2)} RUB`);
console.log(`  Orders: ${dashboard.sales.totalOrders}`);
console.log(`  AOV: ${dashboard.sales.averageOrderValue.toFixed(2)} RUB`);
console.log('');
console.log('FUNNEL:');
console.log(`  Views → Orders: ${dashboard.funnel.conversions.orderToView.toFixed(2)}%`);
```

## Related Materials

- [API Reference: AnalyticsModule](/api/classes/AnalyticsModule)
- [Financial Reports](financial-reports.md)
- [Inventory Reports](inventory-reports.md)

---

[Back to Examples](../index.md) | [Previous: Order Processing](order-processing.md) | [Next: Inventory Reports](inventory-reports.md)

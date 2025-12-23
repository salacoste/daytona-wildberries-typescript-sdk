# Financial Reports

Financial reporting and transaction analysis.

## Description

This use case demonstrates how to generate comprehensive financial reports using the Wildberries API, including balance tracking, transaction analysis, payouts, and financial reconciliation.

## Get Current Balance

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get seller balance
async function getCurrentBalance() {
  const balance = await sdk.finances.getBalance();

  console.log('Current Balance:');
  console.log(`  Available: ${balance.balance?.toLocaleString()} RUB`);

  return balance;
}

const balance = await getCurrentBalance();
```

## Get Transactions

```typescript
interface TransactionReport {
  period: { from: string; to: string };
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  byType: Array<{
    type: string;
    count: number;
    amount: number;
  }>;
}

async function getTransactionReport(days = 30): Promise<TransactionReport> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString();
  const dateTo = new Date().toISOString();

  const transactions = await sdk.finances.getTransactions({
    dateFrom,
    dateTo
  });

  let totalIncome = 0;
  let totalExpenses = 0;

  const typeStats = new Map<string, { count: number; amount: number }>();

  transactions.transactions?.forEach(tx => {
    const amount = tx.amount ?? 0;
    const type = tx.type ?? 'Other';

    if (amount > 0) {
      totalIncome += amount;
    } else {
      totalExpenses += Math.abs(amount);
    }

    const current = typeStats.get(type) ?? { count: 0, amount: 0 };
    current.count++;
    current.amount += amount;
    typeStats.set(type, current);
  });

  const byType = Array.from(typeStats.entries())
    .map(([type, stats]) => ({
      type,
      count: stats.count,
      amount: stats.amount
    }))
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  return {
    period: { from: dateFrom, to: dateTo },
    totalIncome,
    totalExpenses,
    netAmount: totalIncome - totalExpenses,
    byType
  };
}

// Usage
const report = await getTransactionReport(30);
console.log(`Income: ${report.totalIncome.toLocaleString()} RUB`);
console.log(`Expenses: ${report.totalExpenses.toLocaleString()} RUB`);
console.log(`Net: ${report.netAmount.toLocaleString()} RUB`);
```

## Sales Revenue Analysis

```typescript
interface RevenueAnalysis {
  period: { from: string; to: string };
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  byProduct: Array<{
    nmId: number;
    name: string;
    quantity: number;
    revenue: number;
  }>;
  dailyRevenue: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

async function analyzeRevenue(days = 30): Promise<RevenueAnalysis> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const [sales, products] = await Promise.all([
    sdk.reports.getSales(dateFrom, 0),
    sdk.products.getAllProducts({ locale: 'ru' })
  ]);

  const productNames = new Map(products.map(p => [p.nmID, p.title]));

  // Aggregate by product
  const productStats = new Map<number, { quantity: number; revenue: number }>();

  // Aggregate by date
  const dailyStats = new Map<string, { revenue: number; orders: number }>();

  let totalRevenue = 0;
  let totalOrders = 0;

  sales.forEach(sale => {
    const revenue = sale.forPay ?? sale.finishedPrice ?? 0;
    const quantity = sale.quantity ?? 1;
    const date = (sale.date ?? '').split('T')[0];

    // Only count positive sales (not returns)
    if (quantity > 0) {
      totalRevenue += revenue;
      totalOrders++;

      // By product
      if (sale.nmId) {
        const current = productStats.get(sale.nmId) ?? { quantity: 0, revenue: 0 };
        current.quantity += quantity;
        current.revenue += revenue;
        productStats.set(sale.nmId, current);
      }

      // By date
      if (date) {
        const current = dailyStats.get(date) ?? { revenue: 0, orders: 0 };
        current.revenue += revenue;
        current.orders++;
        dailyStats.set(date, current);
      }
    }
  });

  const byProduct = Array.from(productStats.entries())
    .map(([nmId, stats]) => ({
      nmId,
      name: productNames.get(nmId) ?? `Product ${nmId}`,
      quantity: stats.quantity,
      revenue: stats.revenue
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 20);

  const dailyRevenue = Array.from(dailyStats.entries())
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    period: { from: dateFrom, to: new Date().toISOString().split('T')[0] },
    totalRevenue,
    totalOrders,
    averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
    byProduct,
    dailyRevenue
  };
}

// Usage
const revenue = await analyzeRevenue(30);
console.log(`Total Revenue: ${revenue.totalRevenue.toLocaleString()} RUB`);
console.log(`Total Orders: ${revenue.totalOrders}`);
console.log(`AOV: ${revenue.averageOrderValue.toLocaleString()} RUB`);
```

## Realization Report & Fulfillment Analysis

The `getReportDetailByPeriod()` method provides detailed sales realization data including the `delivery_method` field for fulfillment analysis.

```typescript
interface FulfillmentAnalysis {
  period: { from: string; to: string };
  byMethod: {
    FBS: { count: number; revenue: number; percentage: number };
    FBW: { count: number; revenue: number; percentage: number };
    DBS: { count: number; revenue: number; percentage: number };
  };
  totalOrders: number;
  totalRevenue: number;
}

async function analyzeFulfillmentMethods(days = 30): Promise<FulfillmentAnalysis> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];
  const dateTo = new Date().toISOString().split('T')[0];

  const report = await sdk.finances.getReportDetailByPeriod({
    dateFrom,
    dateTo
  });

  const stats = {
    FBS: { count: 0, revenue: 0 },
    FBW: { count: 0, revenue: 0 },
    DBS: { count: 0, revenue: 0 }
  };

  let totalOrders = 0;
  let totalRevenue = 0;

  report.forEach(item => {
    const method = item.delivery_method as 'FBS' | 'FBW' | 'DBS';
    const revenue = item.ppvz_for_pay || 0;

    if (method && stats[method]) {
      stats[method].count++;
      stats[method].revenue += revenue;
    }

    totalOrders++;
    totalRevenue += revenue;
  });

  return {
    period: { from: dateFrom, to: dateTo },
    byMethod: {
      FBS: {
        ...stats.FBS,
        percentage: totalOrders > 0 ? (stats.FBS.count / totalOrders) * 100 : 0
      },
      FBW: {
        ...stats.FBW,
        percentage: totalOrders > 0 ? (stats.FBW.count / totalOrders) * 100 : 0
      },
      DBS: {
        ...stats.DBS,
        percentage: totalOrders > 0 ? (stats.DBS.count / totalOrders) * 100 : 0
      }
    },
    totalOrders,
    totalRevenue
  };
}

// Usage
const analysis = await analyzeFulfillmentMethods(30);

console.log('=== Fulfillment Method Analysis ===');
console.log(`Period: ${analysis.period.from} to ${analysis.period.to}`);
console.log('');
console.log('By Delivery Method:');
Object.entries(analysis.byMethod).forEach(([method, data]) => {
  console.log(`  ${method}:`);
  console.log(`    Orders: ${data.count} (${data.percentage.toFixed(1)}%)`);
  console.log(`    Revenue: ${data.revenue.toLocaleString()}₽`);
});
console.log('');
console.log(`Total Orders: ${analysis.totalOrders}`);
console.log(`Total Revenue: ${analysis.totalRevenue.toLocaleString()}₽`);
```

### Delivery Method Values

| Value | Description (EN) | Description (RU) |
|-------|------------------|------------------|
| `FBS` | Fulfillment by Seller | Продажа со склада продавца |
| `FBW` | Fulfillment by Wildberries | Продажа со склада Wildberries |
| `DBS` | Delivery by Seller | Доставка силами продавца |

## Payout Tracking

```typescript
interface PayoutReport {
  period: { from: string; to: string };
  totalPayouts: number;
  payoutCount: number;
  payouts: Array<{
    id: string;
    date: string;
    amount: number;
    status: string;
  }>;
}

async function getPayoutReport(days = 90): Promise<PayoutReport> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const payouts = await sdk.finances.getPayouts({
    dateFrom
  });

  let totalPayouts = 0;

  const payoutList = payouts.payouts?.map(payout => {
    const amount = payout.amount ?? 0;
    totalPayouts += amount;

    return {
      id: payout.id ?? '',
      date: payout.date ?? '',
      amount,
      status: payout.status ?? 'unknown'
    };
  }) ?? [];

  return {
    period: { from: dateFrom, to: new Date().toISOString().split('T')[0] },
    totalPayouts,
    payoutCount: payoutList.length,
    payouts: payoutList.sort((a, b) => b.date.localeCompare(a.date))
  };
}

// Get payout details
async function getPayoutDetails(payoutId: string) {
  const details = await sdk.finances.getPayoutById(payoutId);

  console.log(`Payout ${payoutId}:`);
  console.log(`  Amount: ${details.amount?.toLocaleString()} RUB`);
  console.log(`  Date: ${details.date}`);
  console.log(`  Status: ${details.status}`);

  return details;
}
```

## Profit & Loss Statement

```typescript
interface ProfitLossStatement {
  period: { from: string; to: string };
  revenue: {
    sales: number;
    returns: number;
    netSales: number;
  };
  expenses: {
    commission: number;
    logistics: number;
    storage: number;
    other: number;
    totalExpenses: number;
  };
  netProfit: number;
  profitMargin: number;
}

async function generateProfitLossStatement(days = 30): Promise<ProfitLossStatement> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const [sales, transactions] = await Promise.all([
    sdk.reports.getSales(dateFrom, 0),
    sdk.finances.getTransactions({
      dateFrom: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
      dateTo: new Date().toISOString()
    })
  ]);

  // Calculate revenue
  let grossSales = 0;
  let returns = 0;

  sales.forEach(sale => {
    const amount = sale.forPay ?? sale.finishedPrice ?? 0;
    const quantity = sale.quantity ?? 1;

    if (quantity > 0) {
      grossSales += amount;
    } else {
      returns += Math.abs(amount);
    }
  });

  const netSales = grossSales - returns;

  // Calculate expenses from transactions
  let commission = 0;
  let logistics = 0;
  let storage = 0;
  let other = 0;

  transactions.transactions?.forEach(tx => {
    const amount = tx.amount ?? 0;
    const type = (tx.type ?? '').toLowerCase();

    if (amount < 0) {
      const absAmount = Math.abs(amount);

      if (type.includes('commission') || type.includes('комиссия')) {
        commission += absAmount;
      } else if (type.includes('logistic') || type.includes('логистик') || type.includes('delivery')) {
        logistics += absAmount;
      } else if (type.includes('storage') || type.includes('хранени')) {
        storage += absAmount;
      } else {
        other += absAmount;
      }
    }
  });

  const totalExpenses = commission + logistics + storage + other;
  const netProfit = netSales - totalExpenses;
  const profitMargin = netSales > 0 ? Math.round((netProfit / netSales) * 1000) / 10 : 0;

  return {
    period: { from: dateFrom, to: new Date().toISOString().split('T')[0] },
    revenue: {
      sales: grossSales,
      returns,
      netSales
    },
    expenses: {
      commission,
      logistics,
      storage,
      other,
      totalExpenses
    },
    netProfit,
    profitMargin
  };
}

// Usage
const pnl = await generateProfitLossStatement(30);

console.log('=== Profit & Loss Statement ===');
console.log(`Period: ${pnl.period.from} to ${pnl.period.to}`);
console.log('');
console.log('REVENUE');
console.log(`  Gross Sales:    ${pnl.revenue.sales.toLocaleString()} RUB`);
console.log(`  Returns:       -${pnl.revenue.returns.toLocaleString()} RUB`);
console.log(`  Net Sales:      ${pnl.revenue.netSales.toLocaleString()} RUB`);
console.log('');
console.log('EXPENSES');
console.log(`  Commission:     ${pnl.expenses.commission.toLocaleString()} RUB`);
console.log(`  Logistics:      ${pnl.expenses.logistics.toLocaleString()} RUB`);
console.log(`  Storage:        ${pnl.expenses.storage.toLocaleString()} RUB`);
console.log(`  Other:          ${pnl.expenses.other.toLocaleString()} RUB`);
console.log(`  Total Expenses: ${pnl.expenses.totalExpenses.toLocaleString()} RUB`);
console.log('');
console.log(`NET PROFIT:       ${pnl.netProfit.toLocaleString()} RUB`);
console.log(`Profit Margin:    ${pnl.profitMargin}%`);
```

## Financial Reconciliation

```typescript
interface ReconciliationReport {
  period: { from: string; to: string };
  expectedRevenue: number;
  actualPayouts: number;
  pendingAmount: number;
  discrepancies: Array<{
    date: string;
    expected: number;
    actual: number;
    difference: number;
  }>;
  status: 'matched' | 'discrepancy' | 'pending';
}

async function reconcileFinances(days = 30): Promise<ReconciliationReport> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const [sales, payouts, balance] = await Promise.all([
    sdk.reports.getSales(dateFrom, 0),
    sdk.finances.getPayouts({ dateFrom }),
    sdk.finances.getBalance()
  ]);

  // Calculate expected revenue from sales
  let expectedRevenue = 0;
  sales.forEach(sale => {
    const amount = sale.forPay ?? 0;
    expectedRevenue += amount;
  });

  // Calculate actual payouts
  let actualPayouts = 0;
  payouts.payouts?.forEach(payout => {
    actualPayouts += payout.amount ?? 0;
  });

  const pendingAmount = balance.balance ?? 0;
  const discrepancies: ReconciliationReport['discrepancies'] = [];

  // Check for significant discrepancy
  const totalAccounted = actualPayouts + pendingAmount;
  const difference = Math.abs(expectedRevenue - totalAccounted);
  const threshold = expectedRevenue * 0.05; // 5% tolerance

  let status: ReconciliationReport['status'] = 'matched';

  if (difference > threshold) {
    status = 'discrepancy';
    discrepancies.push({
      date: new Date().toISOString().split('T')[0],
      expected: expectedRevenue,
      actual: totalAccounted,
      difference: expectedRevenue - totalAccounted
    });
  } else if (pendingAmount > 0) {
    status = 'pending';
  }

  return {
    period: { from: dateFrom, to: new Date().toISOString().split('T')[0] },
    expectedRevenue,
    actualPayouts,
    pendingAmount,
    discrepancies,
    status
  };
}

// Usage
const reconciliation = await reconcileFinances(30);
console.log(`Expected Revenue: ${reconciliation.expectedRevenue.toLocaleString()} RUB`);
console.log(`Actual Payouts:   ${reconciliation.actualPayouts.toLocaleString()} RUB`);
console.log(`Pending Balance:  ${reconciliation.pendingAmount.toLocaleString()} RUB`);
console.log(`Status: ${reconciliation.status}`);
```

## Monthly Financial Summary

```typescript
interface MonthlySummary {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  orderCount: number;
  returnCount: number;
  returnRate: number;
}

async function getMonthlyFinancialSummary(months = 6): Promise<MonthlySummary[]> {
  const summaries: MonthlySummary[] = [];

  for (let i = 0; i < months; i++) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - i);
    startDate.setDate(1);

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    const dateFrom = startDate.toISOString().split('T')[0];

    const sales = await sdk.reports.getSales(dateFrom, 0);

    let revenue = 0;
    let orderCount = 0;
    let returnCount = 0;

    sales.forEach(sale => {
      const saleDate = new Date(sale.date ?? '');
      if (saleDate >= startDate && saleDate <= endDate) {
        const amount = sale.forPay ?? sale.finishedPrice ?? 0;
        const quantity = sale.quantity ?? 1;

        if (quantity > 0) {
          revenue += amount;
          orderCount++;
        } else {
          returnCount++;
        }
      }
    });

    // Estimate expenses (typically 30-40% of revenue for WB)
    const estimatedExpenses = revenue * 0.35;
    const profit = revenue - estimatedExpenses;

    summaries.push({
      month: startDate.toISOString().slice(0, 7), // YYYY-MM format
      revenue,
      expenses: estimatedExpenses,
      profit,
      profitMargin: revenue > 0 ? Math.round((profit / revenue) * 1000) / 10 : 0,
      orderCount,
      returnCount,
      returnRate: orderCount > 0 ? Math.round((returnCount / orderCount) * 1000) / 10 : 0
    });
  }

  return summaries.reverse(); // Oldest first
}

// Usage
const monthlySummaries = await getMonthlyFinancialSummary(6);
console.log('Monthly Financial Summary');
console.log('=========================');
monthlySummaries.forEach(summary => {
  console.log(`${summary.month}:`);
  console.log(`  Revenue: ${summary.revenue.toLocaleString()} RUB`);
  console.log(`  Profit: ${summary.profit.toLocaleString()} RUB (${summary.profitMargin}%)`);
  console.log(`  Orders: ${summary.orderCount}, Returns: ${summary.returnCount} (${summary.returnRate}%)`);
});
```

## Export Financial Data

```typescript
// Export transactions to CSV format
async function exportTransactionsCSV(days = 30): Promise<string> {
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const dateTo = new Date().toISOString();

  const transactions = await sdk.finances.getTransactions({
    dateFrom,
    dateTo
  });

  const headers = ['Date', 'Type', 'Amount', 'Description'];
  const rows = transactions.transactions?.map(tx => [
    tx.date ?? '',
    tx.type ?? '',
    (tx.amount ?? 0).toString(),
    tx.description ?? ''
  ]) ?? [];

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csv;
}

// Usage
const csv = await exportTransactionsCSV(30);
// Save to file or send to user
console.log(csv);
```

## Related Materials

- [API Reference: FinancesModule](/api/classes/FinancesModule)
- [API Reference: ReportsModule](/api/classes/ReportsModule)
- [Inventory Reports](inventory-reports.md)
- [Sales Dashboard](sales-dashboard.md)

---

[Back to Examples](../index.md) | [Previous: Inventory Reports](inventory-reports.md)

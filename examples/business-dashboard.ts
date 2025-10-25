/**
 * Business Dashboard Example
 *
 * Demonstrates how to combine data from multiple SDK modules to create
 * a comprehensive business intelligence dashboard:
 * - Finances: Revenue, balance, transaction metrics
 * - Analytics: Sales performance, conversion rates, top products
 * - Communications: Customer sentiment, review ratings, feedback analysis
 *
 * This example shows:
 * - Multi-module data aggregation
 * - Rate limit management across modules
 * - Error handling with graceful degradation
 * - Performance monitoring and optimization
 *
 * **Use Case**: Real-time business monitoring dashboard for daily operations
 *
 * **Expected Performance**:
 * - Execution time: 10-20 seconds (due to rate limits)
 * - Memory usage: ~100-200MB for typical datasets
 * - Network: 5-8 API calls across 3 modules
 *
 * **Rate Limits**:
 * - Finances: 1 request/minute
 * - Analytics: 1 request/5 seconds
 * - Communications: 1 request/minute (reviews)
 *
 * @packageDocumentation
 */

import { WildberriesSDK } from '../src';
import type { Transaction } from '../src/types/finances.types';
import type { ProductCardAnalytics } from '../src/types/analytics.types';
import type { Review } from '../src/types/communications.types';

// ============================================================================
// Types and Interfaces
// ============================================================================

/**
 * Business dashboard data structure
 */
interface BusinessDashboard {
  /** Financial metrics */
  financials: {
    /** Current available balance in rubles */
    currentBalance: number;
    /** Total revenue for the period */
    totalRevenue: number;
    /** Number of transactions */
    transactionCount: number;
    /** Currency code */
    currency: string;
  };
  /** Performance metrics from analytics */
  performance: {
    /** Total product views */
    totalViews: number;
    /** Total orders placed */
    totalOrders: number;
    /** Conversion rate percentage (orders/views * 100) */
    conversionRate: number;
    /** Top performing products */
    topProducts: Array<{
      nmId: number;
      orders: number;
      revenue: number;
      productName?: string;
    }>;
  };
  /** Customer sentiment analysis */
  customerSentiment: {
    /** Average product rating (1-5) */
    averageRating: number;
    /** Total number of reviews */
    totalReviews: number;
    /** Count of negative reviews (rating 1-2) */
    negativeReviewCount: number;
    /** Product IDs that need attention due to negative feedback */
    productsNeedingAttention: number[];
  };
  /** Dashboard metadata */
  metadata: {
    /** Generation timestamp */
    generatedAt: string;
    /** Total execution time in milliseconds */
    executionTimeMs: number;
    /** Data freshness period */
    dataPeriod: {
      from: string;
      to: string;
    };
  };
}

/**
 * Performance tracking metrics
 */
interface PerformanceMetrics {
  startTime: number;
  financesTime?: number;
  analyticsTime?: number;
  communicationsTime?: number;
  totalTime?: number;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Wait for specified milliseconds (for rate limit management)
 */
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format currency value
 */
function formatCurrency(amount: number, currency: string = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Format percentage
 */
function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

// ============================================================================
// Data Fetching Functions
// ============================================================================

/**
 * Fetch financial data (balance + transactions)
 *
 * Rate limit: 1 request/minute
 */
async function fetchFinancialData(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string,
  performance: PerformanceMetrics
): Promise<BusinessDashboard['financials']> {
  const startTime = Date.now();

  try {
    console.log('\n📊 Fetching financial data...');

    // Fetch current balance
    const balance = await sdk.finances.getBalance();
    console.log(`  ✓ Balance retrieved: ${formatCurrency(balance.current, balance.currency)}`);

    // Wait for rate limit (1 req/min)
    console.log('  ⏳ Waiting 5 seconds (rate limit: 1 req/min)...');
    await sleep(5000);

    // Fetch recent transactions
    const transactions = await sdk.finances.getTransactions({
      dateFrom,
      dateTo,
    });

    console.log(`  ✓ Transactions retrieved: ${transactions.length} records`);

    // Calculate total revenue from completed transactions
    const totalRevenue = transactions.reduce(
      (sum: number, txn: Transaction) => sum + (txn.retail_amount || 0),
      0
    );

    performance.financesTime = Date.now() - startTime;
    console.log(`  ⚡ Finances module: ${performance.financesTime}ms\n`);

    return {
      currentBalance: balance.current,
      totalRevenue,
      transactionCount: transactions.length,
      currency: balance.currency,
    };
  } catch (error) {
    console.error('  ❌ Error fetching financial data:', error);
    performance.financesTime = Date.now() - startTime;

    // Graceful degradation
    return {
      currentBalance: 0,
      totalRevenue: 0,
      transactionCount: 0,
      currency: 'RUB',
    };
  }
}

/**
 * Fetch analytics/performance data
 *
 * Rate limit: 1 request/5 seconds
 */
async function fetchPerformanceData(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string,
  performance: PerformanceMetrics
): Promise<BusinessDashboard['performance']> {
  const startTime = Date.now();

  try {
    console.log('📈 Fetching performance analytics...');

    // Fetch sales funnel statistics
    const analytics = await sdk.analytics.getSalesFunnel({
      period: {
        begin: dateFrom,
        end: dateTo,
      },
    });

    console.log(`  ✓ Analytics retrieved: ${analytics.data.cards.length} products`);

    // Calculate aggregate metrics
    const totalViews = analytics.data.cards.reduce(
      (sum, card: ProductCardAnalytics) => sum + (card.statistics.selectedPeriod.openCardCount || 0),
      0
    );

    const totalOrders = analytics.data.cards.reduce(
      (sum, card: ProductCardAnalytics) => sum + (card.statistics.selectedPeriod.ordersCount || 0),
      0
    );

    const conversionRate = totalViews > 0 ? (totalOrders / totalViews) * 100 : 0;

    // Identify top 5 products by order count
    const topProducts = analytics.data.cards
      .map((card: ProductCardAnalytics) => ({
        nmId: card.nmID,
        orders: card.statistics.selectedPeriod.ordersCount || 0,
        revenue: card.statistics.selectedPeriod.ordersSumRub || 0,
        productName: card.object?.name || undefined,
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);

    console.log(`  ✓ Metrics calculated:`);
    console.log(`    - Total views: ${totalViews.toLocaleString()}`);
    console.log(`    - Total orders: ${totalOrders.toLocaleString()}`);
    console.log(`    - Conversion rate: ${formatPercent(conversionRate)}`);

    performance.analyticsTime = Date.now() - startTime;
    console.log(`  ⚡ Analytics module: ${performance.analyticsTime}ms\n`);

    return {
      totalViews,
      totalOrders,
      conversionRate,
      topProducts,
    };
  } catch (error) {
    console.error('  ❌ Error fetching performance data:', error);
    performance.analyticsTime = Date.now() - startTime;

    // Graceful degradation
    return {
      totalViews: 0,
      totalOrders: 0,
      conversionRate: 0,
      topProducts: [],
    };
  }
}

/**
 * Fetch customer sentiment data from reviews
 *
 * Rate limit: 1 request/minute
 */
async function fetchCustomerSentiment(
  sdk: WildberriesSDK,
  performance: PerformanceMetrics
): Promise<BusinessDashboard['customerSentiment']> {
  const startTime = Date.now();

  try {
    console.log('💬 Fetching customer sentiment data...');

    // Wait for rate limit before calling reviews API
    console.log('  ⏳ Waiting 5 seconds (rate limit: 1 req/min)...');
    await sleep(5000);

    // Fetch recent product reviews
    const reviews = await sdk.communications.getReviews({
      isAnswered: false,
      take: 100,
      skip: 0,
    });

    const feedbacks = reviews.data.feedbacks || [];
    console.log(`  ✓ Reviews retrieved: ${feedbacks.length} records`);

    // Calculate average rating
    const totalRating = feedbacks.reduce(
      (sum: number, review: Review) => sum + (review.productValuation || 0),
      0
    );
    const averageRating = feedbacks.length > 0 ? totalRating / feedbacks.length : 0;

    // Count negative reviews (rating 1-2)
    const negativeReviews = feedbacks.filter(
      (review: Review) => (review.productValuation || 0) <= 2
    );

    // Identify products with negative feedback
    const productsNeedingAttention = Array.from(
      new Set(
        negativeReviews
          .map((review: Review) => review.productDetails.nmId)
          .filter((nmId): nmId is number => nmId !== undefined)
      )
    );

    console.log(`  ✓ Sentiment analysis:`);
    console.log(`    - Average rating: ${averageRating.toFixed(2)}/5`);
    console.log(`    - Negative reviews: ${negativeReviews.length}`);
    console.log(`    - Products needing attention: ${productsNeedingAttention.length}`);

    performance.communicationsTime = Date.now() - startTime;
    console.log(`  ⚡ Communications module: ${performance.communicationsTime}ms\n`);

    return {
      averageRating,
      totalReviews: feedbacks.length,
      negativeReviewCount: negativeReviews.length,
      productsNeedingAttention,
    };
  } catch (error) {
    console.error('  ❌ Error fetching customer sentiment:', error);
    performance.communicationsTime = Date.now() - startTime;

    // Graceful degradation
    return {
      averageRating: 0,
      totalReviews: 0,
      negativeReviewCount: 0,
      productsNeedingAttention: [],
    };
  }
}

// ============================================================================
// Main Dashboard Generation
// ============================================================================

/**
 * Generate comprehensive business dashboard
 *
 * Combines data from three modules:
 * 1. Finances - Revenue and balance metrics
 * 2. Analytics - Sales performance and conversion
 * 3. Communications - Customer sentiment analysis
 *
 * @param dateFrom - Start date for reporting period (RFC3339 format)
 * @param dateTo - End date for reporting period (RFC3339 format)
 * @returns Complete business dashboard with all metrics
 *
 * @example
 * ```typescript
 * const dashboard = await generateBusinessDashboard(
 *   '2024-01-01T00:00:00+03:00',
 *   '2024-01-31T23:59:59+03:00'
 * );
 * console.log(dashboard);
 * ```
 */
async function generateBusinessDashboard(
  dateFrom: string,
  dateTo: string
): Promise<BusinessDashboard> {
  console.log('🚀 Generating Business Dashboard\n');
  console.log('='.repeat(60));
  console.log(`Period: ${dateFrom} to ${dateTo}`);
  console.log('='.repeat(60));

  const performance: PerformanceMetrics = {
    startTime: Date.now(),
  };

  // Initialize SDK
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    timeout: 60000,
    logLevel: 'warn', // Reduce noise in output
  });

  // Fetch data from all modules (sequential to respect rate limits)
  const financials = await fetchFinancialData(sdk, dateFrom, dateTo, performance);
  const performanceMetrics = await fetchPerformanceData(sdk, dateFrom, dateTo, performance);
  const customerSentiment = await fetchCustomerSentiment(sdk, performance);

  performance.totalTime = Date.now() - performance.startTime;

  // Construct dashboard
  const dashboard: BusinessDashboard = {
    financials,
    performance: performanceMetrics,
    customerSentiment,
    metadata: {
      generatedAt: new Date().toISOString(),
      executionTimeMs: performance.totalTime,
      dataPeriod: {
        from: dateFrom,
        to: dateTo,
      },
    },
  };

  return dashboard;
}

/**
 * Display dashboard in formatted console output
 */
function displayDashboard(dashboard: BusinessDashboard): void {
  console.log('\n' + '='.repeat(60));
  console.log('📊 BUSINESS DASHBOARD');
  console.log('='.repeat(60));

  // Financials section
  console.log('\n💰 FINANCIAL METRICS');
  console.log('-'.repeat(60));
  console.log(`Current Balance:    ${formatCurrency(dashboard.financials.currentBalance, dashboard.financials.currency)}`);
  console.log(`Revenue (Period):   ${formatCurrency(dashboard.financials.totalRevenue, dashboard.financials.currency)}`);
  console.log(`Transactions:       ${dashboard.financials.transactionCount.toLocaleString()}`);

  // Performance section
  console.log('\n📈 PERFORMANCE METRICS');
  console.log('-'.repeat(60));
  console.log(`Total Views:        ${dashboard.performance.totalViews.toLocaleString()}`);
  console.log(`Total Orders:       ${dashboard.performance.totalOrders.toLocaleString()}`);
  console.log(`Conversion Rate:    ${formatPercent(dashboard.performance.conversionRate)}`);

  if (dashboard.performance.topProducts.length > 0) {
    console.log('\nTop Products:');
    dashboard.performance.topProducts.forEach((product, index) => {
      console.log(
        `  ${index + 1}. Product ${product.nmId}: ${product.orders} orders, ${formatCurrency(product.revenue)}`
      );
    });
  }

  // Customer Sentiment section
  console.log('\n💬 CUSTOMER SENTIMENT');
  console.log('-'.repeat(60));
  console.log(`Average Rating:     ${dashboard.customerSentiment.averageRating.toFixed(2)}/5 ⭐`);
  console.log(`Total Reviews:      ${dashboard.customerSentiment.totalReviews.toLocaleString()}`);
  console.log(`Negative Reviews:   ${dashboard.customerSentiment.negativeReviewCount} (${
    dashboard.customerSentiment.totalReviews > 0
      ? formatPercent((dashboard.customerSentiment.negativeReviewCount / dashboard.customerSentiment.totalReviews) * 100)
      : '0%'
  })`);
  console.log(`Products Needing Attention: ${dashboard.customerSentiment.productsNeedingAttention.length}`);

  if (dashboard.customerSentiment.productsNeedingAttention.length > 0) {
    console.log(
      `  → Product IDs: ${dashboard.customerSentiment.productsNeedingAttention.slice(0, 5).join(', ')}${
        dashboard.customerSentiment.productsNeedingAttention.length > 5 ? '...' : ''
      }`
    );
  }

  // Performance Metadata
  console.log('\n⚡ PERFORMANCE');
  console.log('-'.repeat(60));
  console.log(`Total Execution Time: ${dashboard.metadata.executionTimeMs}ms`);
  console.log(`Generated At:         ${new Date(dashboard.metadata.generatedAt).toLocaleString('ru-RU')}`);

  console.log('\n' + '='.repeat(60));
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  try {
    // Define reporting period (last 30 days)
    const dateTo = new Date();
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);

    const dateFromStr = dateFrom.toISOString();
    const dateToStr = dateTo.toISOString();

    // Generate dashboard
    const dashboard = await generateBusinessDashboard(dateFromStr, dateToStr);

    // Display results
    displayDashboard(dashboard);

    // Optional: Export to JSON
    // const fs = require('fs');
    // fs.writeFileSync(
    //   `dashboard-${new Date().toISOString().split('T')[0]}.json`,
    //   JSON.stringify(dashboard, null, 2)
    // );

    console.log('\n✅ Dashboard generated successfully!');
  } catch (error) {
    console.error('\n❌ Error generating dashboard:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

// Export for testing
export { generateBusinessDashboard, BusinessDashboard };

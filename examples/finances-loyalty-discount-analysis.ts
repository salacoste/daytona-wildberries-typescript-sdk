/**
 * Finances Module - Loyalty Discount Analysis Example
 *
 * This example demonstrates how to analyze seller loyalty program discounts
 * using the new loyalty_id and loyalty_discount fields added in Wildberries API
 * Release #433 (January 13, 2026).
 *
 * Available in reports from January 12, 2026:
 * - Daily reports: From January 12, 2026
 * - Weekly reports: From January 12-18, 2026 period
 *
 * Features:
 * - Fetching realization reports with loyalty fields
 * - Filtering orders by seller loyalty program
 * - Analyzing loyalty discount impact on revenue
 * - Calculating average discount per loyalty program
 * - Comparing seller vs WB loyalty programs
 *
 * Related documentation:
 * - Guide: docs/guides/realization-report.md
 * - Release Notes: https://dev.wildberries.ru/en/release-notes?id=433
 * - API Reference: /api/classes/FinancesModule
 *
 * @module examples/finances-loyalty-discount-analysis
 */

import { WildberriesSDK } from '../src/index';
import type { DetailReportItem } from '../src/types/finances.types';

// Initialize SDK
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});

/**
 * Statistics for a specific loyalty program
 */
interface LoyaltyProgramStats {
  loyaltyId: number;
  orderCount: number;
  totalDiscountPercent: number;
  avgDiscountPercent: number;
  totalRevenue: number;
  estimatedDiscountAmount: number;
}

/**
 * Overall loyalty discount analysis
 */
interface LoyaltyAnalysis {
  totalOrders: number;
  ordersWithLoyalty: number;
  loyaltyUsagePercent: number;
  programs: Map<number, LoyaltyProgramStats>;
  totalEstimatedDiscount: number;
}

/**
 * Fetch realization report for a specific period
 *
 * @param dateFrom - Start date (YYYY-MM-DD format)
 * @param dateTo - End date (YYYY-MM-DD format)
 * @returns Array of detailed report items
 */
async function fetchRealizationReport(
  dateFrom: string,
  dateTo: string
): Promise<DetailReportItem[]> {
  console.log(`\nFetching realization report: ${dateFrom} to ${dateTo}...`);

  const report = await sdk.finances.getSupplierReportdetailbyperiod({
    dateFrom,
    dateTo,
    limit: 100000,
    rrdid: 0,
  });

  console.log(`✅ Fetched ${report.length} report items`);
  return report;
}

/**
 * Analyze loyalty discount usage across all orders
 *
 * @param report - Realization report items
 * @returns Comprehensive loyalty analysis
 */
function analyzeLoyaltyDiscounts(report: DetailReportItem[]): LoyaltyAnalysis {
  const analysis: LoyaltyAnalysis = {
    totalOrders: report.length,
    ordersWithLoyalty: 0,
    loyaltyUsagePercent: 0,
    programs: new Map(),
    totalEstimatedDiscount: 0,
  };

  // Filter orders with seller loyalty program
  const loyaltyOrders = report.filter(
    (item) =>
      item.loyalty_id !== undefined &&
      item.loyalty_discount !== undefined &&
      item.loyalty_discount > 0
  );

  analysis.ordersWithLoyalty = loyaltyOrders.length;
  analysis.loyaltyUsagePercent = analysis.totalOrders > 0
    ? (analysis.ordersWithLoyalty / analysis.totalOrders) * 100
    : 0;

  // Analyze each loyalty program
  for (const item of loyaltyOrders) {
    const loyaltyId = item.loyalty_id!;
    const discount = item.loyalty_discount || 0;
    const revenue = item.ppvz_for_pay || 0;

    // Calculate estimated discount amount from percentage
    // Assuming discount was applied to retail price
    const retailPrice = item.retail_price || 0;
    const estimatedDiscount = retailPrice * (discount / 100);

    if (!analysis.programs.has(loyaltyId)) {
      analysis.programs.set(loyaltyId, {
        loyaltyId,
        orderCount: 0,
        totalDiscountPercent: 0,
        avgDiscountPercent: 0,
        totalRevenue: 0,
        estimatedDiscountAmount: 0,
      });
    }

    const stats = analysis.programs.get(loyaltyId)!;
    stats.orderCount++;
    stats.totalDiscountPercent += discount;
    stats.totalRevenue += revenue;
    stats.estimatedDiscountAmount += estimatedDiscount;
    analysis.totalEstimatedDiscount += estimatedDiscount;
  }

  // Calculate averages
  for (const stats of analysis.programs.values()) {
    stats.avgDiscountPercent = stats.totalDiscountPercent / stats.orderCount;
  }

  return analysis;
}

/**
 * Compare seller loyalty vs WB cashback programs
 *
 * @param report - Realization report items
 */
function compareLoyaltyPrograms(report: DetailReportItem[]): void {
  let sellerLoyaltyCount = 0;
  let wbCashbackCount = 0;
  let bothProgramsCount = 0;

  for (const item of report) {
    const hasSellerLoyalty =
      item.loyalty_id !== undefined && item.loyalty_discount !== undefined;
    const hasWbCashback =
      item.cashback_discount !== undefined && item.cashback_discount > 0;

    if (hasSellerLoyalty) sellerLoyaltyCount++;
    if (hasWbCashback) wbCashbackCount++;
    if (hasSellerLoyalty && hasWbCashback) bothProgramsCount++;
  }

  console.log('\n=== Loyalty Programs Comparison ===');
  console.log(`Total orders: ${report.length}`);
  console.log(`\nSeller Loyalty Program:`);
  console.log(`  Orders: ${sellerLoyaltyCount}`);
  console.log(
    `  Usage: ${((sellerLoyaltyCount / report.length) * 100).toFixed(2)}%`
  );
  console.log(`\nWB Cashback Program:`);
  console.log(`  Orders: ${wbCashbackCount}`);
  console.log(
    `  Usage: ${((wbCashbackCount / report.length) * 100).toFixed(2)}%`
  );
  console.log(`\nBoth Programs:`);
  console.log(`  Orders: ${bothProgramsCount}`);
  console.log(
    `  Combined: ${((bothProgramsCount / report.length) * 100).toFixed(2)}%`
  );
}

/**
 * Display loyalty analysis results
 *
 * @param analysis - Loyalty analysis results
 */
function displayAnalysis(analysis: LoyaltyAnalysis): void {
  console.log('\n=== Seller Loyalty Discount Analysis ===');
  console.log(`\nOverview:`);
  console.log(`  Total orders: ${analysis.totalOrders}`);
  console.log(`  Orders with loyalty: ${analysis.ordersWithLoyalty}`);
  console.log(`  Loyalty usage: ${analysis.loyaltyUsagePercent.toFixed(2)}%`);
  console.log(
    `  Total estimated discount: ${analysis.totalEstimatedDiscount.toFixed(2)} ₽`
  );

  if (analysis.programs.size > 0) {
    console.log(`\n=== Loyalty Programs (${analysis.programs.size}) ===`);

    // Sort programs by order count
    const sortedPrograms = Array.from(analysis.programs.values()).sort(
      (a, b) => b.orderCount - a.orderCount
    );

    for (const stats of sortedPrograms) {
      console.log(`\nProgram #${stats.loyaltyId}:`);
      console.log(`  Orders: ${stats.orderCount}`);
      console.log(
        `  Avg discount: ${stats.avgDiscountPercent.toFixed(2)}%`
      );
      console.log(`  Total revenue: ${stats.totalRevenue.toFixed(2)} ₽`);
      console.log(
        `  Estimated discount: ${stats.estimatedDiscountAmount.toFixed(2)} ₽`
      );
      console.log(
        `  Revenue per order: ${(stats.totalRevenue / stats.orderCount).toFixed(2)} ₽`
      );
    }
  } else {
    console.log('\n⚠️ No loyalty programs found in this period');
    console.log(
      '   Note: Loyalty fields are available from January 12, 2026'
    );
  }
}

/**
 * Export loyalty analysis to CSV format
 *
 * @param analysis - Loyalty analysis results
 * @returns CSV string
 */
function exportToCSV(analysis: LoyaltyAnalysis): string {
  const headers = [
    'Loyalty ID',
    'Order Count',
    'Avg Discount %',
    'Total Revenue',
    'Estimated Discount',
    'Revenue Per Order',
  ];

  const rows = Array.from(analysis.programs.values()).map((stats) => [
    stats.loyaltyId,
    stats.orderCount,
    stats.avgDiscountPercent.toFixed(2),
    stats.totalRevenue.toFixed(2),
    stats.estimatedDiscountAmount.toFixed(2),
    (stats.totalRevenue / stats.orderCount).toFixed(2),
  ]);

  return [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🔍 Wildberries Loyalty Discount Analysis');
    console.log('=========================================\n');

    // Example dates - adjust for your needs
    // Note: Loyalty fields available from January 12, 2026
    const dateFrom = '2026-01-12';
    const dateTo = '2026-01-18';

    // Fetch realization report
    const report = await fetchRealizationReport(dateFrom, dateTo);

    if (report.length === 0) {
      console.log('⚠️ No data found for the specified period');
      return;
    }

    // Analyze loyalty discounts
    const analysis = analyzeLoyaltyDiscounts(report);

    // Display results
    displayAnalysis(analysis);

    // Compare with WB cashback
    compareLoyaltyPrograms(report);

    // Export to CSV (optional)
    const csv = exportToCSV(analysis);
    console.log('\n=== CSV Export Preview ===');
    console.log(csv.split('\n').slice(0, 5).join('\n'));
    console.log('...');

    console.log('\n✅ Analysis complete!');
  } catch (error) {
    console.error('❌ Error:', error);

    if (error instanceof Error) {
      console.error('Message:', error.message);

      // Handle specific error cases
      if (error.message.includes('401')) {
        console.error('\n💡 Check your WB_API_KEY environment variable');
      } else if (error.message.includes('429')) {
        console.error(
          '\n💡 Rate limit exceeded. Wait 60 seconds before retrying'
        );
      } else if (error.message.includes('204')) {
        console.error('\n💡 No data available for the specified period');
      }
    }

    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main();
}

// Export for use in other modules
export {
  fetchRealizationReport,
  analyzeLoyaltyDiscounts,
  compareLoyaltyPrograms,
  displayAnalysis,
  exportToCSV,
  type LoyaltyProgramStats,
  type LoyaltyAnalysis,
};

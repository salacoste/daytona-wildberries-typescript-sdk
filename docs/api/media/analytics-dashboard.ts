/**
 * Analytics Dashboard Example
 *
 * Demonstrates usage of the Wildberries SDK Analytics Module for:
 * - Sales funnel conversion metrics analysis
 * - Product performance tracking and comparison
 * - Search query optimization
 * - Category-level performance metrics
 * - CSV report generation
 * - Building comprehensive sales dashboards
 *
 * Story 3.3: Analytics Module - Sales Statistics and Performance Metrics
 */

import { WildberriesSDK } from '../src';

// Initialize SDK with API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here',
});

/**
 * Example 1: Sales Funnel Analysis
 *
 * Get conversion metrics showing the journey from views to purchases
 */
async function analyzeSalesFunnel() {
  console.log('\n=== Sales Funnel Analysis ===\n');

  try {
    // Get sales funnel for last 30 days
    const funnel = await sdk.analytics.getSalesFunnel({
      period: {
        begin: '2024-01-01 00:00:00',
        end: '2024-01-31 23:59:59',
      },
      page: 1,
      pageSize: 100,
    });

    console.log(`Total Products Analyzed: ${funnel.data.cards.length}\n`);

    // Display funnel metrics for each product
    funnel.data.cards.forEach((card, index) => {
      const stats = card.statistics.selectedPeriod;
      const prev = card.statistics.previousPeriod;

      console.log(`${index + 1}. ${card.brandName} (ID: ${card.nmID})`);
      console.log(`   Category: ${card.object.name}`);
      console.log(`   Views: ${stats.openCardCount.toLocaleString()}`);
      console.log(`   Add to Cart: ${stats.addToCartCount.toLocaleString()} (${stats.conversions.addToCartPercent}%)`);
      console.log(`   Orders: ${stats.ordersCount.toLocaleString()} (${stats.conversions.cartToOrderPercent}%)`);
      console.log(`   Purchases: ${stats.buyoutsCount.toLocaleString()} (${stats.conversions.buyoutsPercent}%)`);
      console.log(`   Revenue: ${stats.buyoutsSumRub.toLocaleString()} RUB`);
      console.log(`   Avg Price: ${stats.avgPriceRub} RUB`);

      // Show growth vs previous period
      const comparison = card.statistics.periodComparison;
      console.log(`   Growth vs Previous Period:`);
      console.log(`     Views: ${comparison.openCardDynamics > 0 ? '+' : ''}${comparison.openCardDynamics}%`);
      console.log(`     Revenue: ${comparison.buyoutsSumRubDynamics > 0 ? '+' : ''}${comparison.buyoutsSumRubDynamics}%`);
      console.log('');
    });
  } catch (error) {
    console.error('Error analyzing sales funnel:', error);
  }
}

/**
 * Example 2: Product Performance Comparison
 *
 * Compare performance metrics across multiple products
 */
async function compareProductPerformance() {
  console.log('\n=== Product Performance Comparison ===\n');

  try {
    // Compare top 5 products
    const productIds = [12345, 67890, 11111, 22222, 33333];

    const performance = await sdk.analytics.getProductPerformance(
      productIds,
      { from: '2024-01-01', to: '2024-01-31' }
    );

    // Sort by revenue (descending)
    const sortedByRevenue = performance.products.sort((a, b) => b.revenue - a.revenue);

    console.log('Products ranked by revenue:\n');
    sortedByRevenue.forEach((product, index) => {
      console.log(`${index + 1}. ${product.productName || `Product ${product.nmID}`}`);
      console.log(`   Revenue: ${product.revenue.toLocaleString()} RUB`);
      console.log(`   Units Sold: ${product.unitsSold.toLocaleString()}`);
      console.log(`   Avg Price: ${product.avgPrice.toLocaleString()} RUB`);
      console.log(`   Conversion Rate: ${product.conversionRate.toFixed(2)}%`);
      console.log(`   Return Rate: ${product.returnRate.toFixed(2)}%`);
      console.log(`   Vendor Code: ${product.vendorCode}`);
      console.log('');
    });

    // Calculate aggregate metrics
    const totalRevenue = sortedByRevenue.reduce((sum, p) => sum + p.revenue, 0);
    const totalUnits = sortedByRevenue.reduce((sum, p) => sum + p.unitsSold, 0);
    const avgConversionRate = sortedByRevenue.reduce((sum, p) => sum + p.conversionRate, 0) / sortedByRevenue.length;

    console.log('Aggregate Metrics:');
    console.log(`  Total Revenue: ${totalRevenue.toLocaleString()} RUB`);
    console.log(`  Total Units Sold: ${totalUnits.toLocaleString()}`);
    console.log(`  Average Conversion Rate: ${avgConversionRate.toFixed(2)}%`);
    console.log(`  Average Revenue per Product: ${(totalRevenue / sortedByRevenue.length).toLocaleString()} RUB`);
  } catch (error) {
    console.error('Error comparing product performance:', error);
  }
}

/**
 * Example 3: Search Query Optimization
 *
 * Identify high-volume low-conversion search queries for optimization
 */
async function optimizeSearchQueries() {
  console.log('\n=== Search Query Optimization ===\n');

  try {
    const queries = await sdk.analytics.getSearchQueries({
      from: '2024-01-01',
      to: '2024-01-31',
    });

    console.log(`Total Search Queries Analyzed: ${queries.data.length}\n`);

    // Find top queries by search count
    const topBySearchCount = queries.data
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 10);

    console.log('Top 10 Search Queries by Volume:\n');
    topBySearchCount.forEach((query, index) => {
      console.log(`${index + 1}. "${query.query}"`);
      console.log(`   Searches: ${query.searchCount.toLocaleString()}`);
      console.log(`   Click-Through Rate: ${query.clickThroughRate.toFixed(2)}%`);
      console.log(`   Conversion Rate: ${query.conversionRate.toFixed(2)}%`);
      if (query.avgPosition) {
        console.log(`   Avg Position: ${query.avgPosition}`);
      }
      if (query.revenue) {
        console.log(`   Revenue: ${query.revenue.toLocaleString()} RUB`);
      }
      console.log('');
    });

    // Identify optimization opportunities (high volume, low conversion)
    const opportunities = queries.data
      .filter(q => q.searchCount > 1000 && q.conversionRate < 2)
      .sort((a, b) => b.searchCount - a.searchCount);

    if (opportunities.length > 0) {
      console.log('\nOptimization Opportunities (High Volume, Low Conversion):\n');
      opportunities.slice(0, 5).forEach((query, index) => {
        console.log(`${index + 1}. "${query.query}"`);
        console.log(`   Searches: ${query.searchCount.toLocaleString()}`);
        console.log(`   Conversion: ${query.conversionRate.toFixed(2)}%`);
        console.log(`   Potential: Optimize product titles/descriptions for this query`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error optimizing search queries:', error);
  }
}

/**
 * Example 4: Category Performance Analysis
 *
 * Analyze performance at category level with top performers
 */
async function analyzeCategoryPerformance() {
  console.log('\n=== Category Performance Analysis ===\n');

  try {
    const categoryId = '447'; // Example category ID

    const category = await sdk.analytics.getCategoryPerformance(
      categoryId,
      { from: '2024-01-01', to: '2024-01-31' }
    );

    console.log(`Category: ${category.data.categoryName} (ID: ${category.data.categoryId})`);
    console.log(`Total Products: ${category.data.productCount}`);
    console.log(`Total Revenue: ${category.data.revenue.toLocaleString()} RUB`);
    console.log(`Total Units Sold: ${category.data.unitsSold.toLocaleString()}`);
    console.log(`Avg Revenue per Product: ${(category.data.revenue / category.data.productCount).toLocaleString()} RUB\n`);

    console.log('Top 10 Products in Category:\n');
    category.data.topProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product.nmID})`);
      console.log(`   Revenue: ${product.revenue.toLocaleString()} RUB`);
      console.log(`   Units Sold: ${product.unitsSold.toLocaleString()}`);
      console.log(`   % of Category Revenue: ${((product.revenue / category.data.revenue) * 100).toFixed(2)}%`);
      console.log('');
    });
  } catch (error) {
    console.error('Error analyzing category performance:', error);
  }
}

/**
 * Example 5: Product History Time-Series Data
 *
 * Analyze daily performance trends
 */
async function analyzeProductHistory() {
  console.log('\n=== Product History Analysis ===\n');

  try {
    const history = await sdk.analytics.getProductHistory({
      period: {
        begin: '2024-01-01 00:00:00',
        end: '2024-01-07 23:59:59',
      },
      nmIDs: [12345, 67890],
    });

    history.data.forEach(product => {
      console.log(`Product: ${product.brandName} (ID: ${product.nmID})`);
      console.log(`Category: ${product.object.name}\n`);

      console.log('Daily Performance:');
      product.history.forEach(day => {
        console.log(`  ${day.date}:`);
        console.log(`    Views: ${day.openCardCount.toLocaleString()}`);
        console.log(`    Add to Cart: ${day.addToCartCount.toLocaleString()}`);
        console.log(`    Orders: ${day.ordersCount.toLocaleString()}`);
        console.log(`    Purchases: ${day.buyoutsCount.toLocaleString()}`);
        console.log(`    Revenue: ${day.buyoutsSumRub.toLocaleString()} RUB`);
        console.log(`    Conversion: ${day.conversions.buyoutsPercent.toFixed(2)}%`);
      });
      console.log('');
    });
  } catch (error) {
    console.error('Error analyzing product history:', error);
  }
}

/**
 * Example 6: Generate and Download Analytics Report
 *
 * Create CSV reports for further analysis
 */
async function generateAnalyticsReport() {
  console.log('\n=== Generate Analytics Report ===\n');

  try {
    // Initiate report generation
    console.log('Generating sales funnel CSV report...');
    const reportGen = await sdk.analytics.generateReport({
      reportType: 'sales_funnel',
      dateRange: { from: '2024-01-01', to: '2024-01-31' },
      format: 'CSV',
    });

    console.log(`Report ID: ${reportGen.reportId}`);
    console.log(`Status: ${reportGen.status}`);
    if (reportGen.estimatedCompletionTime) {
      console.log(`Estimated Completion: ${reportGen.estimatedCompletionTime}`);
    }
    console.log('');

    // Poll for completion (in production, you'd check every few seconds)
    console.log('Checking report status...');
    const report = await sdk.analytics.getReport(reportGen.reportId);

    console.log(`Report Status: ${report.status}`);

    if (report.status === 'completed' && report.downloadUrl) {
      console.log(`Download URL: ${report.downloadUrl}`);
      console.log(`Format: ${report.format}`);
      console.log(`File Size: ${report.fileSize ? (report.fileSize / 1024).toFixed(2) + ' KB' : 'N/A'}`);
      console.log(`Expires At: ${report.expiresAt}`);

      // Alternative: Use downloadReport helper
      const download = await sdk.analytics.downloadReport(reportGen.reportId);
      console.log(`\nHelper Method - Download URL: ${download.url}`);
    } else {
      console.log('Report is still processing. Check again later.');
    }
  } catch (error) {
    console.error('Error generating analytics report:', error);
  }
}

/**
 * Example 7: Complete Dashboard Data Aggregation
 *
 * Combine multiple analytics endpoints to build a complete dashboard
 */
async function buildCompleteDashboard() {
  console.log('\n=== Building Complete Analytics Dashboard ===\n');

  try {
    const dateRange = { from: '2024-01-01', to: '2024-01-31' };

    console.log('Fetching dashboard data...\n');

    // Fetch all data in parallel for performance
    const [funnel, queries, topProducts] = await Promise.all([
      sdk.analytics.getSalesFunnel({
        period: {
          begin: dateRange.from + ' 00:00:00',
          end: dateRange.to + ' 23:59:59',
        },
        page: 1,
        pageSize: 100,
      }),
      sdk.analytics.getSearchQueries(dateRange),
      sdk.analytics.getProductPerformance(
        [12345, 67890, 11111, 22222, 33333],
        dateRange
      ),
    ]);

    // Calculate KPIs
    const totalViews = funnel.data.cards.reduce((sum, card) =>
      sum + card.statistics.selectedPeriod.openCardCount, 0
    );
    const totalPurchases = funnel.data.cards.reduce((sum, card) =>
      sum + card.statistics.selectedPeriod.buyoutsCount, 0
    );
    const totalRevenue = topProducts.products.reduce((sum, p) => sum + p.revenue, 0);
    const overallConversion = (totalPurchases / totalViews) * 100;

    // Display Dashboard
    console.log('='.repeat(60));
    console.log('                   ANALYTICS DASHBOARD');
    console.log('='.repeat(60));
    console.log(`Period: ${dateRange.from} to ${dateRange.to}`);
    console.log('='.repeat(60));
    console.log('');

    console.log('📊 KEY PERFORMANCE INDICATORS');
    console.log('-'.repeat(60));
    console.log(`Total Views:           ${totalViews.toLocaleString()}`);
    console.log(`Total Purchases:       ${totalPurchases.toLocaleString()}`);
    console.log(`Total Revenue:         ${totalRevenue.toLocaleString()} RUB`);
    console.log(`Conversion Rate:       ${overallConversion.toFixed(2)}%`);
    console.log(`Avg Revenue per Sale:  ${(totalRevenue / totalPurchases).toLocaleString()} RUB`);
    console.log('');

    console.log('🏆 TOP 3 PRODUCTS BY REVENUE');
    console.log('-'.repeat(60));
    topProducts.products
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3)
      .forEach((p, i) => {
        console.log(`${i + 1}. ${p.productName || `Product ${p.nmID}`}: ${p.revenue.toLocaleString()} RUB`);
      });
    console.log('');

    console.log('🔍 TOP 3 SEARCH QUERIES');
    console.log('-'.repeat(60));
    queries.data
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 3)
      .forEach((q, i) => {
        console.log(`${i + 1}. "${q.query}": ${q.searchCount.toLocaleString()} searches (${q.conversionRate.toFixed(2)}% conversion)`);
      });
    console.log('');

    console.log('='.repeat(60));
    console.log('Dashboard data successfully aggregated!');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('Error building dashboard:', error);
  }
}

// Main execution
async function main() {
  console.log('Wildberries Analytics Dashboard Examples');
  console.log('=========================================');

  // Run all examples
  await analyzeSalesFunnel();
  await compareProductPerformance();
  await optimizeSearchQueries();
  await analyzeCategoryPerformance();
  await analyzeProductHistory();
  await generateAnalyticsReport();
  await buildCompleteDashboard();

  console.log('\n✅ All examples completed successfully!');
}

// Run if executed directly
/**
 * Example 8: Stock History and Inventory Analysis
 *
 * Demonstrates:
 * - Retrieving historical stock changes
 * - Analyzing stock movements by reason
 * - Calculating stock velocity
 * - Predicting restock dates
 */
async function analyzeStockHistory(sdk: WildberriesSDK): Promise<void> {
  console.log('\n📦 Stock History Analysis\n');

  try {
    // Get stock history for a product
    const productId = 'PROD_12345';
    const stockHistory = await sdk.analytics.getStockHistory(productId, {
      from: '2024-01-01',
      to: '2024-12-31',
    });

    console.log(`Product: ${stockHistory.vendorCode} (nmID: ${stockHistory.nmID})`);
    console.log(`\n📊 Summary:`);
    console.log(`  Starting Stock: ${stockHistory.summary.startingStock} units`);
    console.log(`  Ending Stock: ${stockHistory.summary.endingStock} units`);
    console.log(`  Net Change: ${stockHistory.summary.netChange} units`);
    console.log(`  Total Sales: ${stockHistory.summary.totalSales} units`);
    console.log(`  Total Returns: ${stockHistory.summary.totalReturns} units`);
    console.log(`  Total Adjustments: ${stockHistory.summary.totalAdjustments} units`);
    console.log(`  Avg Daily Velocity: ${stockHistory.summary.avgDailyVelocity.toFixed(2)} units/day`);

    // Analyze recent stock changes
    console.log(`\n📋 Recent Stock Changes (last 10):`);
    const recentChanges = stockHistory.changes.slice(-10);
    recentChanges.forEach((change) => {
      const sign = change.changeAmount > 0 ? '+' : '';
      console.log(
        `  ${new Date(change.timestamp).toLocaleDateString()} | ${sign}${change.changeAmount} units | ${change.reason} | New: ${change.newStock}`
      );
    });

    // Calculate stock velocity and predict restock
    const daysInPeriod = 365;
    const velocity = stockHistory.summary.netChange / daysInPeriod;

    if (velocity < 0) {
      const daysUntilZero = Math.abs(stockHistory.summary.endingStock / velocity);
      const restockDate = new Date();
      restockDate.setDate(restockDate.getDate() + Math.ceil(daysUntilZero));

      console.log(`\n⚠️  Stock Velocity Alert:`);
      console.log(`  Current velocity: ${velocity.toFixed(2)} units/day`);
      console.log(`  Days until stockout: ${Math.ceil(daysUntilZero)} days`);
      console.log(`  Recommended restock date: ${restockDate.toLocaleDateString()}`);
    } else {
      console.log(`\n✅ Stock is stable or increasing`);
    }

    // Breakdown by change reason
    console.log(`\n📈 Change Breakdown:`);
    const reasonBreakdown = stockHistory.changes.reduce(
      (acc, change) => {
        acc[change.reason] = (acc[change.reason] || 0) + Math.abs(change.changeAmount);
        return acc;
      },
      {} as Record<string, number>
    );

    Object.entries(reasonBreakdown)
      .sort(([, a], [, b]) => b - a)
      .forEach(([reason, count]) => {
        const percentage = ((count / stockHistory.summary.totalSales) * 100).toFixed(1);
        console.log(`  ${reason}: ${count} units (${percentage}%)`);
      });
  } catch (error) {
    console.error('Error analyzing stock history:', error);
    throw error;
  }
}

/**
 * Example 9: CSV Export for BI Tools
 *
 * Demonstrates:
 * - Exporting analytics data to CSV
 * - Polling for CSV completion
 * - Downloading completed reports
 * - Custom CSV format options for Excel/BI tools
 */
async function exportAnalyticsToCSV(sdk: WildberriesSDK): Promise<void> {
  console.log('\n📥 CSV Export for BI Tools\n');

  try {
    // Example 1: Export product performance with European Excel format
    console.log('Exporting product performance to CSV...');

    const csvExport = await sdk.analytics.exportAnalyticsCSV(
      'product_performance',
      { from: '2024-01-01', to: '2024-12-31' },
      {
        delimiter: ';', // European Excel format
        includeHeaders: true,
        encoding: 'utf-8-bom', // Excel compatibility
      }
    );

    console.log(`✅ CSV export initiated`);
    console.log(`  Report ID: ${csvExport.reportId}`);
    console.log(`  Status: ${csvExport.status}`);
    if (csvExport.estimatedCompletionTime) {
      console.log(`  ETA: ${new Date(csvExport.estimatedCompletionTime).toLocaleString()}`);
    }

    // Poll for completion (with timeout)
    console.log('\nPolling for CSV completion...');
    let csvReport;
    let attempts = 0;
    const maxAttempts = 30; // 2.5 minutes max

    do {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5s between checks
      csvReport = await sdk.analytics.getCSVReportStatus(csvExport.reportId);
      attempts++;

      console.log(`  [${attempts}/${maxAttempts}] Status: ${csvReport.status}`);

      if (csvReport.status === 'failed') {
        throw new Error(`CSV export failed: ${csvReport.errorMessage || 'Unknown error'}`);
      }

      if (attempts >= maxAttempts) {
        throw new Error('CSV export timeout - exceeded maximum wait time');
      }
    } while (csvReport.status !== 'completed');

    // Download completed report
    console.log('\n✅ CSV export completed!');
    console.log(`  Download URL: ${csvReport.downloadUrl}`);
    console.log(`  File size: ${(csvReport.fileSize! / 1024).toFixed(2)} KB`);
    console.log(`  Rows: ${csvReport.rowCount?.toLocaleString()}`);
    console.log(`  Expires: ${new Date(csvReport.expiresAt!).toLocaleString()}`);

    // Example 2: Export stock history for inventory analysis
    console.log('\n\nExporting stock history to CSV...');

    const stockExport = await sdk.analytics.exportAnalyticsCSV(
      'stock_history',
      { from: '2024-01-01', to: '2024-12-31' },
      {
        delimiter: ',', // Standard CSV
        includeHeaders: true,
        encoding: 'utf-8',
      }
    );

    console.log(`✅ Stock history export initiated: ${stockExport.reportId}`);

    // Example 3: Export sales funnel with tab delimiter for data analysis
    console.log('\nExporting sales funnel to TSV...');

    const funnelExport = await sdk.analytics.exportAnalyticsCSV(
      'sales_funnel',
      { from: '2024-01-01', to: '2024-12-31' },
      {
        delimiter: '\t', // Tab-separated (TSV)
        includeHeaders: true,
        encoding: 'utf-8',
      }
    );

    console.log(`✅ Sales funnel export initiated: ${funnelExport.reportId}`);

    // Demonstrate downloadCSVReport helper (waits for completion)
    console.log('\n\nUsing downloadCSVReport helper...');
    try {
      const downloadableReport = await sdk.analytics.downloadCSVReport(csvExport.reportId);
      console.log('✅ Report ready for download');
      console.log(`  URL: ${downloadableReport.downloadUrl}`);
    } catch (error) {
      console.log('⏳ Report not ready yet - poll getCSVReportStatus() until completed');
    }

    // BI Tool integration notes
    console.log('\n\n📊 BI Tool Integration Tips:');
    console.log('  • Excel (European): Use delimiter=";" and encoding="utf-8-bom"');
    console.log('  • Tableau: Use delimiter="," and encoding="utf-8"');
    console.log('  • Power BI: Use delimiter="," and encoding="utf-8"');
    console.log('  • Python/R: Use delimiter="," and encoding="utf-8"');
    console.log('  • Google Sheets: Use delimiter="," and encoding="utf-8"');
    console.log('  • Download URLs expire after 24 hours - download promptly!');
  } catch (error) {
    console.error('Error exporting analytics to CSV:', error);
    throw error;
  }
}

/**
 * Main function - Run all analytics examples
 */
async function main(): Promise<void> {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY || 'your-api-key-here',
  });

  console.log('🚀 Wildberries Analytics Dashboard Examples\n');
  console.log('='.repeat(60));

  try {
    // Run all analytics examples
    await analyzeSalesFunnel(sdk);
    await compareProductPerformance(sdk);
    await optimizeSearchQueries(sdk);
    await analyzeCategoryPerformance(sdk);
    await analyzeProductHistory(sdk);
    await generateAnalyticsReport(sdk);

    // Story 3.4: Stock History and CSV Export examples
    await analyzeStockHistory(sdk);
    await exportAnalyticsToCSV(sdk);

    await buildCompleteDashboard(sdk);

    console.log('\n' + '='.repeat(60));
    console.log('✅ All analytics examples completed successfully!');
  } catch (error) {
    console.error('\n❌ Error running analytics examples:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

// Export functions for use in other modules
export {
  analyzeSalesFunnel,
  compareProductPerformance,
  optimizeSearchQueries,
  analyzeCategoryPerformance,
  analyzeProductHistory,
  generateAnalyticsReport,
  buildCompleteDashboard,
  analyzeStockHistory,
  exportAnalyticsToCSV,
};

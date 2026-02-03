/**
 * Analytics Dashboard - Complete Sales Performance Analytics
 *
 * This comprehensive example demonstrates building production-ready analytics dashboards:
 * - Sales funnel analysis with conversion metrics (views → cart → orders → purchases)
 * - Product performance comparison across multiple SKUs
 * - Search query optimization (high volume, low conversion opportunities)
 * - Category performance analysis with top performers
 * - Product history time-series data for trend analysis
 * - Stock history and inventory velocity calculation
 * - CSV report generation for BI tools (Excel, Tableau, Power BI)
 * - Complete dashboard data aggregation with KPIs
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 25 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Analytics module permissions enabled
 * - Active seller account with sales history
 * - Products with sufficient data for analysis (at least 30 days)
 * - Understanding of conversion funnel metrics
 * - Optional: BI tool for CSV import (Excel, Tableau, Power BI)
 *
 * **What This Example Covers:**
 * - **Sales Funnel**: Conversion rates from views to purchases with growth dynamics
 * - **Performance Comparison**: Revenue, units sold, conversion rates across products
 * - **Search Optimization**: Identify high-volume low-conversion queries
 * - **Category Analysis**: Top products and revenue distribution by category
 * - **Time-Series Data**: Daily performance trends with 7-day history
 * - **Stock Velocity**: Calculate restock dates and stockout predictions
 * - **CSV Export**: BI-ready reports with European/standard formats
 * - **Complete Dashboard**: Aggregated KPIs with parallel data fetching
 *
 * **Expected Output:**
 * ```
 * === Sales Funnel Analysis ===
 * Total Products Analyzed: 47
 *
 * 1. Brand Name (ID: 12345)
 *    Category: Electronics
 *    Views: 15,234
 *    Add to Cart: 3,456 (22.7%)
 *    Orders: 1,234 (35.7%)
 *    Purchases: 987 (80.0%)
 *    Revenue: 1,234,567 RUB
 *    Growth vs Previous Period:
 *      Views: +15.3%
 *      Revenue: +23.5%
 *
 * === Complete Analytics Dashboard ===
 * Period: 2024-01-01 to 2024-01-31
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * KEY PERFORMANCE INDICATORS
 *   Total Views: 234,567
 *   Total Purchases: 12,345
 *   Total Revenue: 15,678,900 RUB
 *   Conversion Rate: 5.27%
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/analytics-dashboard.ts
 * ```
 *
 * **Related Examples:**
 * - reports-analytics.ts - Stock and order reports
 * - business-dashboard.ts - Business metrics integration
 * - export-to-bi.ts - Advanced BI integration workflows
 *
 * **Common Issues:**
 * - "No data available": Products need at least 30 days of sales history
 * - "CSV export timeout": Large datasets may take 5+ minutes to generate
 * - "Stock velocity calculation error": Need sufficient history for predictions
 * - "Search query data missing": Requires organic search traffic to products
 * - "European Excel format issues": Use delimiter=";" and encoding="utf-8-bom"
 *
 * @see {@link https://dev.wildberries.ru/openapi/seller-analytics} - Official Analytics API
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';

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
  console.log('\n=== Sales Funnel Analysis (v3) ===\n');

  try {
    // Get sales funnel for last 30 days using v3 endpoint
    const funnel = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
      orderBy: { field: 'orderCount', mode: 'desc' },
      limit: 100,
      offset: 0,
    });

    console.log(`Total Products Analyzed: ${funnel.products.length}\n`);

    // Display funnel metrics for each product
    funnel.products.forEach((entry, index) => {
      const product = entry.product;
      const stats = entry.statistic.selected;
      const comparison = entry.statistic.comparison;

      console.log(`${index + 1}. ${product.brandName} (ID: ${product.nmId})`);
      console.log(`   Category: ${product.subjectName}`);
      console.log(`   Views: ${stats.openCount.toLocaleString()}`);
      console.log(
        `   Add to Cart: ${stats.cartCount.toLocaleString()} (${stats.addToCartConversion.toFixed(1)}%)`
      );
      console.log(
        `   Orders: ${stats.orderCount.toLocaleString()} (${stats.cartToOrderConversion.toFixed(1)}%)`
      );
      console.log(
        `   Purchases: ${stats.buyoutCount.toLocaleString()} (${stats.buyoutPercent.toFixed(1)}%)`
      );
      console.log(`   Revenue: ${stats.buyoutSum.toLocaleString()} RUB`);

      // Show growth vs previous period (if comparison data is available)
      if (comparison) {
        console.log(`   Growth vs Previous Period:`);
        console.log(
          `     Views: ${comparison.openCount > 0 ? '+' : ''}${comparison.openCount.toFixed(1)}%`
        );
        console.log(
          `     Revenue: ${comparison.buyoutSum > 0 ? '+' : ''}${comparison.buyoutSum.toFixed(1)}%`
        );
      }
      console.log('');
    });
  } catch (error) {
    console.error('Error analyzing sales funnel:', error);
  }
}

/**
 * Example 2: Product Performance Comparison (v3)
 *
 * Compare performance metrics across multiple products using v3 Sales Funnel
 */
async function compareProductPerformance() {
  console.log('\n=== Product Performance Comparison (v3) ===\n');

  try {
    // Compare top 5 products using v3 Sales Funnel endpoint
    const productIds = [12345, 67890, 11111, 22222, 33333];

    const performance = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
      nmIds: productIds,
      orderBy: { field: 'buyoutSum', mode: 'desc' },
      limit: 5,
      offset: 0,
    });

    console.log('Products ranked by revenue:\n');
    performance.products.forEach((entry, index) => {
      const product = entry.product;
      const stats = entry.statistic.selected;

      console.log(`${index + 1}. ${product.title || `Product ${product.nmId}`}`);
      console.log(`   Revenue: ${stats.buyoutSum.toLocaleString()} RUB`);
      console.log(`   Orders: ${stats.orderCount.toLocaleString()}`);
      console.log(`   Cart to Order: ${stats.cartToOrderConversion.toFixed(2)}%`);
      console.log(`   Buyout Rate: ${stats.buyoutPercent.toFixed(2)}%`);
      console.log(`   Vendor Code: ${product.vendorCode}`);
      console.log('');
    });

    // Calculate aggregate metrics
    const totalRevenue = performance.products.reduce(
      (sum, e) => sum + e.statistic.selected.buyoutSum,
      0
    );
    const totalOrders = performance.products.reduce(
      (sum, e) => sum + e.statistic.selected.orderCount,
      0
    );
    const avgConversion =
      performance.products.reduce((sum, e) => sum + e.statistic.selected.cartToOrderConversion, 0) /
      performance.products.length;

    console.log('Aggregate Metrics:');
    console.log(`  Total Revenue: ${totalRevenue.toLocaleString()} RUB`);
    console.log(`  Total Orders: ${totalOrders.toLocaleString()}`);
    console.log(`  Average Cart-to-Order Conversion: ${avgConversion.toFixed(2)}%`);
    console.log(
      `  Average Revenue per Product: ${(totalRevenue / performance.products.length).toLocaleString()} RUB`
    );
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
      .filter((q) => q.searchCount > 1000 && q.conversionRate < 2)
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

    const category = await sdk.analytics.getCategoryPerformance(categoryId, {
      from: '2024-01-01',
      to: '2024-01-31',
    });

    console.log(`Category: ${category.data.categoryName} (ID: ${category.data.categoryId})`);
    console.log(`Total Products: ${category.data.productCount}`);
    console.log(`Total Revenue: ${category.data.revenue.toLocaleString()} RUB`);
    console.log(`Total Units Sold: ${category.data.unitsSold.toLocaleString()}`);
    console.log(
      `Avg Revenue per Product: ${(category.data.revenue / category.data.productCount).toLocaleString()} RUB\n`
    );

    console.log('Top 10 Products in Category:\n');
    category.data.topProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (ID: ${product.nmID})`);
      console.log(`   Revenue: ${product.revenue.toLocaleString()} RUB`);
      console.log(`   Units Sold: ${product.unitsSold.toLocaleString()}`);
      console.log(
        `   % of Category Revenue: ${((product.revenue / category.data.revenue) * 100).toFixed(2)}%`
      );
      console.log('');
    });
  } catch (error) {
    console.error('Error analyzing category performance:', error);
  }
}

/**
 * Example 5: Product History Time-Series Data (v3)
 *
 * Analyze daily performance trends using v3 Sales Funnel history
 */
async function analyzeProductHistory() {
  console.log('\n=== Product History Analysis (v3) ===\n');

  try {
    const history = await sdk.analytics.getSalesFunnelProductsHistory({
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      nmIds: [12345, 67890],
      aggregationLevel: 'day',
    });

    history.forEach((entry) => {
      console.log(`Product: ${entry.product.brandName} (ID: ${entry.product.nmId})`);
      console.log(`Category: ${entry.product.subjectName}\n`);

      console.log('Daily Performance:');
      entry.history.forEach((day) => {
        console.log(`  ${day.date}:`);
        console.log(`    Views: ${day.openCount.toLocaleString()}`);
        console.log(`    Add to Cart: ${day.cartCount.toLocaleString()}`);
        console.log(`    Orders: ${day.orderCount.toLocaleString()}`);
        console.log(`    Purchases: ${day.buyoutCount.toLocaleString()}`);
        console.log(`    Revenue: ${day.buyoutSum.toLocaleString()} RUB`);
        console.log(`    Buyout Rate: ${day.buyoutPercent.toFixed(2)}%`);
      });
      console.log('');
    });
  } catch (error) {
    console.error('Error analyzing product history:', error);
  }
}

/**
 * Example 5b: Grouped History Analysis (v3)
 *
 * Analyze aggregated performance trends by brand/category/tag using v3 Sales Funnel
 */
async function analyzeGroupedHistory() {
  console.log('\n=== Grouped History Analysis (v3) ===\n');

  try {
    const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      brandNames: ['BrandA', 'BrandB'],
      subjectIds: [100, 200],
      tagIds: [],
      aggregationLevel: 'day',
      skipDeletedNm: true,
    });

    grouped.forEach((entry) => {
      console.log(`Group: ${entry.product.brandName} — ${entry.product.subjectName}`);
      console.log(`  Product ID: ${entry.product.nmId}\n`);

      console.log('  Daily Grouped Performance:');
      entry.history.forEach((day) => {
        console.log(`    ${day.date}:`);
        console.log(`      Views: ${day.openCount.toLocaleString()}`);
        console.log(`      Cart: ${day.cartCount.toLocaleString()}`);
        console.log(`      Orders: ${day.orderCount.toLocaleString()}`);
        console.log(`      Revenue: ${day.buyoutSum.toLocaleString()} RUB`);
        console.log(`      Avg Price: ${day.avgPrice.toLocaleString()} RUB`);
      });
      console.log('');
    });
  } catch (error) {
    console.error('Error analyzing grouped history:', error);
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
      console.log(
        `File Size: ${report.fileSize ? (report.fileSize / 1024).toFixed(2) + ' KB' : 'N/A'}`
      );
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
 * Example 7: Complete Dashboard Data Aggregation (v3)
 *
 * Combine multiple analytics endpoints to build a complete dashboard
 */
async function buildCompleteDashboard() {
  console.log('\n=== Building Complete Analytics Dashboard (v3) ===\n');

  try {
    const period = { start: '2026-01-01', end: '2026-01-31' };

    console.log('Fetching dashboard data...\n');

    // Fetch all data in parallel for performance
    const [funnel, queries] = await Promise.all([
      sdk.analytics.getSalesFunnelProducts({
        selectedPeriod: period,
        orderBy: { field: 'buyoutSum', mode: 'desc' },
        limit: 100,
        offset: 0,
      }),
      sdk.analytics.getSearchQueries({ from: period.start, to: period.end }),
    ]);

    // Calculate KPIs from v3 response
    const totalViews = funnel.products.reduce((sum, e) => sum + e.statistic.selected.openCount, 0);
    const totalPurchases = funnel.products.reduce(
      (sum, e) => sum + e.statistic.selected.buyoutCount,
      0
    );
    const totalRevenue = funnel.products.reduce(
      (sum, e) => sum + e.statistic.selected.buyoutSum,
      0
    );
    const overallConversion = totalViews > 0 ? (totalPurchases / totalViews) * 100 : 0;

    // Display Dashboard
    console.log('='.repeat(60));
    console.log('                   ANALYTICS DASHBOARD');
    console.log('='.repeat(60));
    console.log(`Period: ${period.start} to ${period.end}`);
    console.log('='.repeat(60));
    console.log('');

    console.log('KEY PERFORMANCE INDICATORS');
    console.log('-'.repeat(60));
    console.log(`Total Views:           ${totalViews.toLocaleString()}`);
    console.log(`Total Purchases:       ${totalPurchases.toLocaleString()}`);
    console.log(`Total Revenue:         ${totalRevenue.toLocaleString()} RUB`);
    console.log(`Conversion Rate:       ${overallConversion.toFixed(2)}%`);
    console.log(
      `Avg Revenue per Sale:  ${totalPurchases > 0 ? (totalRevenue / totalPurchases).toLocaleString() : 0} RUB`
    );
    console.log('');

    console.log('TOP 3 PRODUCTS BY REVENUE');
    console.log('-'.repeat(60));
    funnel.products
      .slice(0, 3) // already sorted by buyoutSum desc
      .forEach((e, i) => {
        console.log(
          `${i + 1}. ${e.product.title || `Product ${e.product.nmId}`}: ${e.statistic.selected.buyoutSum.toLocaleString()} RUB`
        );
      });
    console.log('');

    console.log('TOP 3 SEARCH QUERIES');
    console.log('-'.repeat(60));
    queries.data
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 3)
      .forEach((q, i) => {
        console.log(
          `${i + 1}. "${q.query}": ${q.searchCount.toLocaleString()} searches (${q.conversionRate.toFixed(2)}% conversion)`
        );
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
  await analyzeGroupedHistory();
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
    console.log(
      `  Avg Daily Velocity: ${stockHistory.summary.avgDailyVelocity.toFixed(2)} units/day`
    );

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
    console.error('\n❌ Error running analytics examples:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
      console.error(`   Analytics API: 5 req/min for queries, 1 req/2min for CSV exports`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Verify API key and analytics permissions`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Check date format and period ranges`);
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
    }
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
  analyzeGroupedHistory,
  generateAnalyticsReport,
  buildCompleteDashboard,
  analyzeStockHistory,
  exportAnalyticsToCSV,
};

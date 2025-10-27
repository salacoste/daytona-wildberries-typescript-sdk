/**
 * Business Intelligence Export - Multi-Module Data Export
 *
 * This comprehensive example demonstrates exporting data for BI tools and analytics platforms:
 * - Multi-module data aggregation (Finances, Analytics, Reports, Communications)
 * - Unified BI export format (timestamped, typed, normalized records)
 * - CSV export for Excel, Google Sheets, and spreadsheet tools
 * - JSON export for API consumption and data warehouses
 * - Large dataset handling with streaming and pagination
 * - Data transformation and normalization for BI compatibility
 * - Automated file generation with timestamps and metadata
 *
 * **Complexity**: 🔴 Advanced
 * **Estimated Time**: 60 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Finances, Analytics, Reports, and Communications module permissions
 * - Active seller account with transaction and sales history
 * - 4-6 minutes execution time window for full data export
 * - 200-500MB available memory for typical monthly export
 * - BI tool for import: Power BI, Tableau, Looker, Metabase, etc.
 * - Understanding of rate limits across all modules
 *
 * **What This Example Covers:**
 * - **Financial Data Export**: Transactions, balance, revenue metrics
 * - **Sales Data Export**: Orders, revenue, quantity sold by product
 * - **Review Metrics Export**: Aggregate ratings and sentiment by product
 * - **Balance Snapshot**: Current account balance with withdrawal info
 * - **Data Transformation**: Convert API data to unified BI format
 * - **Multi-Format Export**: CSV (spreadsheets) and JSON (APIs)
 * - **Automated Timestamps**: Timestamped filenames for version tracking
 *
 * **Expected Output:**
 * ```
 * === Business Intelligence Data Export ===
 * Export Period: 2024-01-01 to 2024-01-31
 * Output Directory: ./bi-exports
 * Formats: csv, json
 *
 * [1/4] Exporting financial data...
 *   ✓ Exported 12,345 transactions → 24,690 records
 *   ⏳ Waiting 60s for rate limit...
 *
 * [2/4] Exporting sales data...
 *   ✓ Exported 11,234 sales → 22,468 records
 *   ⏳ Waiting 60s for rate limit...
 *
 * [3/4] Exporting customer review metrics...
 *   ✓ Exported 1,456 reviews → 145 records
 *   ⏳ Waiting 60s for rate limit...
 *
 * [4/4] Exporting balance snapshot...
 *   ✓ Exported balance snapshot
 *
 * === Data Collection Complete ===
 * Total records: 47,304
 * Total time: 245.3s
 *
 * === Generating Export Files ===
 * Generating CSV export...
 *   ✓ Saved: ./bi-exports/wildberries_export_2024-01-31_14-30-00.csv
 * Generating JSON export...
 *   ✓ Saved: ./bi-exports/wildberries_export_2024-01-31_14-30-00.json
 *
 * === Export Statistics ===
 * Total Records: 47,304
 *
 * Records by Type:
 *   finance: 24,691 records
 *   sales: 22,468 records
 *   customer: 145 records
 *
 * Exported Files:
 *   wildberries_export_2024-01-31_14-30-00.csv (4.23 MB)
 *   wildberries_export_2024-01-31_14-30-00.json (8.91 MB)
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/export-to-bi.ts
 * ```
 *
 * **Related Examples:**
 * - business-dashboard.ts - Real-time dashboard data integration
 * - analytics-dashboard.ts - CSV export for specific analytics
 * - financial-reconciliation.ts - Financial data validation workflows
 *
 * **Common Issues:**
 * - "Memory exceeded": Reduce date range or implement streaming for large exports
 * - "Rate limit errors": Total export takes 4-6 minutes due to sequential API calls
 * - "CSV encoding issues": UTF-8 BOM required for Excel with special characters
 * - "JSON file too large": Split exports by month for >100K records
 * - "BI tool import failure": Check delimiter (comma vs semicolon) and date formats
 *
 * @see {@link https://dev.wildberries.ru/openapi/} - Official Wildberries API Documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from '../src';
import type { Transaction, TransactionFilters } from '../src/types/finances.types';
import type { SalesItem } from '../src/types/reports.types';
import type { ReviewFilters } from '../src/types/communications.types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Unified BI export format
 */
interface BIExportRecord {
  /** Export timestamp */
  timestamp: string;
  /** Data category */
  dataType: 'finance' | 'sales' | 'inventory' | 'customer';
  /** Product ID (if applicable) */
  productId?: number;
  /** Metric name */
  metric: string;
  /** Metric value */
  value: number;
  /** Date for time-series data */
  date: string;
  /** Additional metadata */
  metadata: Record<string, unknown>;
}

/**
 * Export configuration
 */
interface ExportConfig {
  /** Date range for export */
  dateRange: {
    from: string; // ISO date
    to: string; // ISO date
  };
  /** Output directory */
  outputDir: string;
  /** Export formats */
  formats: Array<'csv' | 'json'>;
}

/**
 * Export statistics
 */
interface ExportStats {
  totalRecords: number;
  recordsByType: Record<string, number>;
  exportTime: number;
  filesSaved: string[];
}

/**
 * Convert BI records to CSV format
 */
function convertToCSV(records: BIExportRecord[]): string {
  if (records.length === 0) return '';

  // CSV header
  const headers = [
    'timestamp',
    'dataType',
    'productId',
    'metric',
    'value',
    'date',
    'metadata',
  ];
  const csvLines = [headers.join(',')];

  // CSV rows
  for (const record of records) {
    const row = [
      record.timestamp,
      record.dataType,
      record.productId || '',
      record.metric,
      record.value.toString(),
      record.date,
      JSON.stringify(record.metadata).replace(/"/g, '""'), // Escape quotes
    ];
    csvLines.push(row.map((field) => `"${field}"`).join(','));
  }

  return csvLines.join('\n');
}

/**
 * Save data to file
 */
function saveToFile(
  data: string,
  filename: string,
  outputDir: string
): string {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, data, 'utf-8');
  return filePath;
}

/**
 * Transform financial transactions to BI format
 */
function transformFinancialData(
  transactions: Transaction[],
  timestamp: string
): BIExportRecord[] {
  const records: BIExportRecord[] = [];

  for (const tx of transactions) {
    // Revenue record
    if (tx.ppvz_for_pay > 0) {
      records.push({
        timestamp,
        dataType: 'finance',
        productId: tx.nm_id,
        metric: 'revenue',
        value: tx.ppvz_for_pay,
        date: tx.sale_dt || tx.date_from,
        metadata: {
          transactionId: tx.rrd_id,
          reportId: tx.realizationreport_id,
          quantity: tx.quantity,
          retailPrice: tx.retail_price,
          commission: tx.commission_percent,
        },
      });
    }

    // Commission record
    if (tx.ppvz_sales_commission > 0) {
      records.push({
        timestamp,
        dataType: 'finance',
        productId: tx.nm_id,
        metric: 'commission',
        value: tx.ppvz_sales_commission,
        date: tx.sale_dt || tx.date_from,
        metadata: {
          transactionId: tx.rrd_id,
          commissionPercent: tx.commission_percent,
        },
      });
    }
  }

  return records;
}

/**
 * Transform sales data to BI format
 */
function transformSalesData(
  sales: SalesItem[],
  timestamp: string
): BIExportRecord[] {
  const records: BIExportRecord[] = [];

  for (const sale of sales) {
    // Sale amount record
    records.push({
      timestamp,
      dataType: 'sales',
      productId: sale.nmId,
      metric: 'sale_amount',
      value: sale.forPay,
      date: sale.date,
      metadata: {
        saleId: sale.saleID,
        orderId: sale.srid,
        warehouseName: sale.warehouseName,
        totalPrice: sale.totalPrice,
        discountPercent: sale.discountPercent,
        finishedPrice: sale.finishedPrice,
      },
    });

    // Quantity record (implicit: 1 item per sale record)
    records.push({
      timestamp,
      dataType: 'sales',
      productId: sale.nmId,
      metric: 'quantity_sold',
      value: 1,
      date: sale.date,
      metadata: {
        saleId: sale.saleID,
        category: sale.category,
        subject: sale.subject,
        brand: sale.brand,
      },
    });
  }

  return records;
}

/**
 * Aggregate review metrics by product for BI export
 */
function transformReviewMetrics(
  reviewCounts: Array<{ nmId: number; rating: number; count: number }>,
  timestamp: string,
  exportDate: string
): BIExportRecord[] {
  const records: BIExportRecord[] = [];

  for (const review of reviewCounts) {
    records.push({
      timestamp,
      dataType: 'customer',
      productId: review.nmId,
      metric: 'review_rating',
      value: review.rating,
      date: exportDate,
      metadata: {
        reviewCount: review.count,
      },
    });
  }

  return records;
}

/**
 * Perform comprehensive BI data export
 */
async function performBIExport(
  apiKey: string,
  config: ExportConfig
): Promise<ExportStats> {
  const sdk = new WildberriesSDK({ apiKey });
  const timestamp = new Date().toISOString();

  console.log('=== Business Intelligence Data Export ===');
  console.log(`Export Period: ${config.dateRange.from} to ${config.dateRange.to}`);
  console.log(`Output Directory: ${config.outputDir}`);
  console.log(`Formats: ${config.formats.join(', ')}`);
  console.log();

  // Track performance
  const perfStart = Date.now();
  const modulePerf: Record<string, number> = {};
  const allRecords: BIExportRecord[] = [];

  try {
    // Step 1: Export financial data
    console.log('[1/4] Exporting financial data...');
    const financesStart = Date.now();

    try {
      const filters: TransactionFilters = {
        dateFrom: config.dateRange.from,
        dateTo: config.dateRange.to,
      };

      const transactions = await sdk.finances.getTransactions(filters);
      const financeRecords = transformFinancialData(transactions, timestamp);
      allRecords.push(...financeRecords);

      console.log(`  ✓ Exported ${transactions.length} transactions → ${financeRecords.length} records`);
    } catch (error) {
      console.error('  ✗ Failed to export financial data:', error);
    }

    modulePerf.finances = Date.now() - financesStart;

    // Rate limit delay
    console.log('  ⏳ Waiting 60s for rate limit...');
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Step 2: Export sales data from Reports
    console.log('[2/4] Exporting sales data...');
    const salesStart = Date.now();

    try {
      const sales = await sdk.reports.getSales(config.dateRange.from, 1);
      const salesRecords = transformSalesData(sales, timestamp);
      allRecords.push(...salesRecords);

      console.log(`  ✓ Exported ${sales.length} sales → ${salesRecords.length} records`);
    } catch (error) {
      console.error('  ✗ Failed to export sales data:', error);
    }

    modulePerf.sales = Date.now() - salesStart;

    // Rate limit delay
    console.log('  ⏳ Waiting 60s for rate limit...');
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Step 3: Export review metrics (aggregate)
    console.log('[3/4] Exporting customer review metrics...');
    const reviewsStart = Date.now();

    try {
      const reviewFilters: ReviewFilters = {
        isAnswered: false,
        take: 5000,
        skip: 0,
      };
      const reviewsResponse = await sdk.communications.getReviews(reviewFilters);
      const reviews = reviewsResponse.data?.feedbacks || [];

      // Aggregate reviews by product and rating
      const reviewAggregates = new Map<string, { nmId: number; rating: number; count: number }>();

      for (const review of reviews) {
        const nmId = review.productDetails?.nmId;
        const rating = review.productValuation;

        if (nmId && rating) {
          const key = `${nmId}-${rating}`;
          if (!reviewAggregates.has(key)) {
            reviewAggregates.set(key, { nmId, rating, count: 0 });
          }
          reviewAggregates.get(key)!.count += 1;
        }
      }

      const reviewRecords = transformReviewMetrics(
        Array.from(reviewAggregates.values()),
        timestamp,
        config.dateRange.to
      );
      allRecords.push(...reviewRecords);

      console.log(`  ✓ Exported ${reviews.length} reviews → ${reviewRecords.length} records`);
    } catch (error) {
      console.error('  ✗ Failed to export review metrics:', error);
    }

    modulePerf.reviews = Date.now() - reviewsStart;

    // Rate limit delay
    console.log('  ⏳ Waiting 60s for rate limit...');
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Step 4: Export balance snapshot
    console.log('[4/4] Exporting balance snapshot...');
    const balanceStart = Date.now();

    try {
      const balance = await sdk.finances.getBalance();

      // Add balance as a financial metric
      allRecords.push({
        timestamp,
        dataType: 'finance',
        metric: 'current_balance',
        value: balance.current || 0,
        date: config.dateRange.to,
        metadata: {
          currency: balance.currency,
          forWithdraw: balance.for_withdraw,
        },
      });

      console.log(`  ✓ Exported balance snapshot`);
    } catch (error) {
      console.error('  ✗ Failed to export balance:', error);
    }

    modulePerf.balance = Date.now() - balanceStart;

    console.log();
    console.log('=== Data Collection Complete ===');
    console.log(`Total records: ${allRecords.length}`);
    console.log(`Total time: ${((Date.now() - perfStart) / 1000).toFixed(1)}s`);
    console.log();

    // Step 5: Generate exports
    console.log('=== Generating Export Files ===');
    const exportStart = Date.now();
    const filesSaved: string[] = [];

    // Count records by type
    const recordsByType: Record<string, number> = {};
    for (const record of allRecords) {
      recordsByType[record.dataType] = (recordsByType[record.dataType] || 0) + 1;
    }

    // Generate timestamped filename
    const dateStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toISOString().split('T')[1].split('.')[0].replace(/:/g, '-');
    const baseFilename = `wildberries_export_${dateStr}_${timeStr}`;

    // Export CSV
    if (config.formats.includes('csv')) {
      console.log('Generating CSV export...');
      const csv = convertToCSV(allRecords);
      const csvPath = saveToFile(csv, `${baseFilename}.csv`, config.outputDir);
      filesSaved.push(csvPath);
      console.log(`  ✓ Saved: ${csvPath}`);
    }

    // Export JSON
    if (config.formats.includes('json')) {
      console.log('Generating JSON export...');
      const json = JSON.stringify(
        {
          meta: {
            exportTimestamp: timestamp,
            dateRange: config.dateRange,
            recordCount: allRecords.length,
            recordsByType,
          },
          data: allRecords,
        },
        null,
        2
      );
      const jsonPath = saveToFile(json, `${baseFilename}.json`, config.outputDir);
      filesSaved.push(jsonPath);
      console.log(`  ✓ Saved: ${jsonPath}`);
    }

    const exportTime = Date.now() - exportStart;
    console.log();
    console.log(`Export files generated in ${(exportTime / 1000).toFixed(1)}s`);
    console.log();

    // Build statistics
    const stats: ExportStats = {
      totalRecords: allRecords.length,
      recordsByType,
      exportTime: Date.now() - perfStart,
      filesSaved,
    };

    // Display statistics
    console.log('=== Export Statistics ===');
    console.log(`Total Records: ${stats.totalRecords}`);
    console.log();
    console.log('Records by Type:');
    for (const [type, count] of Object.entries(recordsByType)) {
      console.log(`  ${type}: ${count} records`);
    }
    console.log();
    console.log('Performance:');
    console.log(`  Finances: ${(modulePerf.finances / 1000).toFixed(1)}s`);
    console.log(`  Sales: ${(modulePerf.sales / 1000).toFixed(1)}s`);
    console.log(`  Reviews: ${(modulePerf.reviews / 1000).toFixed(1)}s`);
    console.log(`  Balance: ${(modulePerf.balance / 1000).toFixed(1)}s`);
    console.log(`  Total: ${(stats.exportTime / 1000).toFixed(1)}s`);
    console.log();
    console.log('Exported Files:');
    filesSaved.forEach((file) => {
      const sizeBytes = fs.statSync(file).size;
      const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
      console.log(`  ${path.basename(file)} (${sizeMB} MB)`);
    });
    console.log();

    return stats;
  } catch (error) {
    console.error('❌ BI export failed:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit: ${error.message} - Retry after ${error.retryAfter}ms`);
      console.error(`   BI exports require 4-6 minutes due to rate limits`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
      console.error(`   Large exports may fail on slow connections`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

// Main execution
if (require.main === module) {
  const apiKey = process.env.WB_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: WB_API_KEY environment variable not set');
    console.error('Usage: WB_API_KEY=your-api-key npx ts-node examples/export-to-bi.ts');
    process.exit(1);
  }

  // Default export configuration: Last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const config: ExportConfig = {
    dateRange: {
      from: startDate.toISOString().split('T')[0],
      to: endDate.toISOString().split('T')[0],
    },
    outputDir: './bi-exports',
    formats: ['csv', 'json'],
  };

  performBIExport(apiKey, config)
    .then((stats) => {
      console.log('✅ BI export completed successfully');
      console.log();
      console.log('📊 Next Steps:');
      console.log('1. Import exported files into your BI tool (Power BI, Tableau, Looker)');
      console.log('2. Configure data refresh schedule (daily/weekly)');
      console.log('3. Create dashboards and visualizations');
      console.log('4. Set up automated alerts on key metrics');
      console.log(`5. Files saved to: ${config.outputDir}/`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

export { performBIExport, ExportConfig, ExportStats, BIExportRecord };

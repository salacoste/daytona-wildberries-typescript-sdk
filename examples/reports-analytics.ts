/**
 * Reports and Analytics Examples
 *
 * This file demonstrates how to use the ReportsModule for:
 * - Fetching inbound shipments with pagination
 * - Tracking stock levels and inventory
 * - Analyzing customer orders
 * - Monitoring sales and returns
 * - Generating compliance/excise reports
 * - Creating and downloading async reports
 *
 * @packageDocumentation
 */

import { WildberriesSDK } from '../src';
import type {
  IncomesItem,
  StocksItem,
  OrdersItem,
  SalesItem,
  ExciseReportResponse,
  ReportTaskResponse,
  ReportStatus,
} from '../src/types/reports.types';

// ============================================================================
// Setup
// ============================================================================

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000, // 60 seconds for long operations
  logLevel: 'info',
});

// ============================================================================
// Example 1: Fetch Inbound Shipments (Incomes) with Pagination
// ============================================================================

/**
 * Fetch all inbound shipments since a specific date using cursor-based pagination.
 *
 * The API returns up to 100,000 records per request. Use the lastChangeDate
 * from the last record to fetch the next page until an empty array is returned.
 */
async function fetchAllIncomes() {
  console.log('📦 Fetching inbound shipments...\n');

  let dateFrom = '2024-01-01T00:00:00+03:00'; // Moscow timezone (UTC+3)
  let allIncomes: IncomesItem[] = [];
  let pageNumber = 1;

  while (true) {
    console.log(`  Page ${pageNumber}: Fetching from ${dateFrom}...`);

    const incomes = await sdk.reports.getIncomes(dateFrom);

    if (incomes.length === 0) {
      console.log('  ✓ No more records\n');
      break;
    }

    allIncomes = allIncomes.concat(incomes);
    console.log(`  ✓ Received ${incomes.length} records`);

    // Use lastChangeDate of the last record as cursor for next page
    const lastRecord = incomes[incomes.length - 1];
    dateFrom = lastRecord.lastChangeDate;

    pageNumber++;

    // Safety limit for example
    if (pageNumber > 5) {
      console.log('  ⚠️  Reached page limit for example\n');
      break;
    }
  }

  console.log(`Total incomes fetched: ${allIncomes.length}\n`);

  // Analyze the data
  if (allIncomes.length > 0) {
    const totalQuantity = allIncomes.reduce((sum, income) => sum + income.quantity, 0);
    const warehouses = new Set(allIncomes.map((income) => income.warehouseName));

    console.log('Summary:');
    console.log(`  Total items received: ${totalQuantity}`);
    console.log(`  Unique warehouses: ${warehouses.size}`);
    console.log(`  Warehouses: ${Array.from(warehouses).join(', ')}\n`);
  }

  return allIncomes;
}

// ============================================================================
// Example 2: Monitor Stock Levels and Inventory
// ============================================================================

/**
 * Fetch current stock levels for all products and analyze inventory distribution.
 *
 * Stock data includes:
 * - quantity: Items in warehouse
 * - inWayToClient: Items being delivered to customers
 * - inWayFromClient: Items being returned by customers
 * - quantityFull: Total (quantity + inWayToClient + inWayFromClient)
 */
async function monitorStockLevels() {
  console.log('📊 Monitoring stock levels...\n');

  // Fetch stocks (use old date to get all records)
  const stocks = await sdk.reports.getStocks('2019-01-01T00:00:00+03:00');

  console.log(`Total SKUs in stock: ${stocks.length}\n`);

  // Find low stock items (less than 5 units available)
  const lowStock = stocks.filter((stock) => stock.quantity < 5 && stock.quantity > 0);
  console.log(`⚠️  Low stock items (< 5 units): ${lowStock.length}`);
  if (lowStock.length > 0) {
    console.log('Top 5 low stock items:');
    lowStock.slice(0, 5).forEach((stock) => {
      console.log(
        `  - ${stock.supplierArticle} (${stock.subject}): ${stock.quantity} units at ${stock.warehouseName}`
      );
    });
    console.log();
  }

  // Find out-of-stock items
  const outOfStock = stocks.filter((stock) => stock.quantity === 0);
  console.log(`🚨 Out of stock items: ${outOfStock.length}\n`);

  // Analyze items in transit
  const inTransit = stocks.filter((stock) => stock.inWayToClient > 0 || stock.inWayFromClient > 0);
  console.log(`🚚 Items in transit: ${inTransit.length}`);
  if (inTransit.length > 0) {
    const toClient = inTransit.reduce((sum, stock) => sum + stock.inWayToClient, 0);
    const fromClient = inTransit.reduce((sum, stock) => sum + stock.inWayFromClient, 0);
    console.log(`  To customers: ${toClient} units`);
    console.log(`  From customers (returns): ${fromClient} units\n`);
  }

  // Warehouse distribution
  const warehouseStats = new Map<string, { count: number; totalQty: number }>();
  stocks.forEach((stock) => {
    const stats = warehouseStats.get(stock.warehouseName) || { count: 0, totalQty: 0 };
    stats.count++;
    stats.totalQty += stock.quantityFull;
    warehouseStats.set(stock.warehouseName, stats);
  });

  console.log('Warehouse distribution:');
  Array.from(warehouseStats.entries())
    .sort((a, b) => b[1].totalQty - a[1].totalQty)
    .slice(0, 5)
    .forEach(([warehouse, stats]) => {
      console.log(`  ${warehouse}: ${stats.count} SKUs, ${stats.totalQty} total units`);
    });
  console.log();

  return stocks;
}

// ============================================================================
// Example 3: Track Customer Orders
// ============================================================================

/**
 * Fetch and analyze customer orders.
 *
 * Use flag parameter to control data filtering:
 * - flag=0 or undefined: All changes (new orders + status updates)
 * - flag=1: Only new orders
 */
async function trackCustomerOrders() {
  console.log('🛒 Tracking customer orders...\n');

  const dateFrom = '2024-01-01T00:00:00+03:00';

  // Get only new orders (flag=1)
  const newOrders = await sdk.reports.getOrders(dateFrom, 1);
  console.log(`New orders: ${newOrders.length}\n`);

  if (newOrders.length > 0) {
    // Calculate order statistics
    const totalRevenue = newOrders.reduce((sum, order) => sum + order.finishedPrice, 0);
    const averageOrderValue = totalRevenue / newOrders.length;

    console.log('Order Statistics:');
    console.log(`  Total orders: ${newOrders.length}`);
    console.log(`  Total revenue: ${totalRevenue.toFixed(2)} RUB`);
    console.log(`  Average order value: ${averageOrderValue.toFixed(2)} RUB\n`);

    // Analyze by warehouse
    const warehouseOrders = new Map<string, number>();
    newOrders.forEach((order) => {
      const count = warehouseOrders.get(order.warehouseName) || 0;
      warehouseOrders.set(order.warehouseName, count + 1);
    });

    console.log('Orders by warehouse:');
    Array.from(warehouseOrders.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([warehouse, count]) => {
        console.log(`  ${warehouse}: ${count} orders`);
      });
    console.log();

    // Analyze by region
    const regionOrders = new Map<string, number>();
    newOrders.forEach((order) => {
      const count = regionOrders.get(order.regionName) || 0;
      regionOrders.set(order.regionName, count + 1);
    });

    console.log('Top 5 regions by order count:');
    Array.from(regionOrders.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([region, count]) => {
        console.log(`  ${region}: ${count} orders`);
      });
    console.log();

    // Check for canceled orders
    const canceledOrders = newOrders.filter((order) => order.isCancel);
    if (canceledOrders.length > 0) {
      console.log(`⚠️  Canceled orders: ${canceledOrders.length}\n`);
    }
  }

  return newOrders;
}

// ============================================================================
// Example 4: Analyze Sales and Returns
// ============================================================================

/**
 * Fetch and analyze sales data including returns and revenue metrics.
 */
async function analyzeSalesAndReturns() {
  console.log('💰 Analyzing sales and returns...\n');

  const dateFrom = '2024-01-01T00:00:00+03:00';

  const sales = await sdk.reports.getSales(dateFrom);
  console.log(`Total sales records: ${sales.length}\n`);

  if (sales.length > 0) {
    // Calculate revenue metrics
    const totalSaleAmount = sales.reduce((sum, sale) => sum + sale.paymentSaleAmount, 0);
    const totalForPay = sales.reduce((sum, sale) => sum + sale.forPay, 0);

    console.log('Revenue Metrics:');
    console.log(`  Total sale amount: ${totalSaleAmount.toFixed(2)} RUB`);
    console.log(`  Total for payout: ${totalForPay.toFixed(2)} RUB`);
    console.log(`  Commission: ${(totalSaleAmount - totalForPay).toFixed(2)} RUB\n`);

    // Analyze by category
    const categoryRevenue = new Map<string, { count: number; revenue: number }>();
    sales.forEach((sale) => {
      const stats = categoryRevenue.get(sale.category) || { count: 0, revenue: 0 };
      stats.count++;
      stats.revenue += sale.forPay;
      categoryRevenue.set(sale.category, stats);
    });

    console.log('Top 5 categories by revenue:');
    Array.from(categoryRevenue.entries())
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5)
      .forEach(([category, stats]) => {
        console.log(
          `  ${category}: ${stats.count} sales, ${stats.revenue.toFixed(2)} RUB`
        );
      });
    console.log();

    // Analyze discount distribution
    const avgDiscount =
      sales.reduce((sum, sale) => sum + sale.discountPercent, 0) / sales.length;
    const avgSPP = sales.reduce((sum, sale) => sum + sale.spp, 0) / sales.length;

    console.log('Discount Analysis:');
    console.log(`  Average discount: ${avgDiscount.toFixed(2)}%`);
    console.log(`  Average SPP (seller promo): ${avgSPP.toFixed(2)}%\n`);
  }

  return sales;
}

// ============================================================================
// Example 5: Generate Excise/Compliance Report
// ============================================================================

/**
 * Generate excise report for compliance purposes.
 *
 * This report is useful for tracking excise goods (alcohol, tobacco, etc.)
 * for tax and regulatory compliance.
 */
async function generateExciseReport() {
  console.log('📋 Generating excise report...\n');

  const dateFrom = '2024-01-01';
  const dateTo = '2024-01-31';

  // Generate report for all countries
  const report = await sdk.reports.getExciseReport(dateFrom, dateTo);

  console.log(`Excise records: ${report.response.data.length}\n`);

  if (report.response.data.length > 0) {
    // Analyze by country
    const countryStats = new Map<string, { count: number; totalPrice: number }>();
    report.response.data.forEach((record) => {
      const stats = countryStats.get(record.name) || { count: 0, totalPrice: 0 };
      stats.count++;
      stats.totalPrice += record.price;
      countryStats.set(record.name, stats);
    });

    console.log('Excise by country:');
    Array.from(countryStats.entries()).forEach(([country, stats]) => {
      console.log(
        `  ${country}: ${stats.count} operations, ${stats.totalPrice.toFixed(2)} ${report.response.data[0].currency_name_short}`
      );
    });
    console.log();

    // Analyze by operation type
    const operationTypes = new Map<number, number>();
    report.response.data.forEach((record) => {
      const count = operationTypes.get(record.operation_type_id) || 0;
      operationTypes.set(record.operation_type_id, count + 1);
    });

    console.log('Operations by type:');
    operationTypes.forEach((count, typeId) => {
      console.log(`  Type ${typeId}: ${count} operations`);
    });
    console.log();
  }

  // Generate report filtered by specific countries
  const filteredReport = await sdk.reports.getExciseReport(dateFrom, dateTo, {
    countries: ['RU', 'BY'],
  });

  console.log(`Filtered report (RU, BY): ${filteredReport.response.data.length} records\n`);

  return report;
}

// ============================================================================
// Example 6: Async Report Generation (Warehouse Remains)
// ============================================================================

/**
 * Create, poll, and download an async warehouse remains report.
 *
 * This demonstrates the three-step async report workflow:
 * 1. Create report task
 * 2. Poll status until done
 * 3. Download the report file
 */
async function generateWarehouseRemainsReport() {
  console.log('📊 Generating warehouse remains report (async)...\n');

  // Step 1: Create report task
  console.log('Step 1: Creating report task...');
  const task = await sdk.reports.createWarehouseRemainsReport({
    locale: 'ru',
    groupByBrand: true,
    groupBySubject: true,
  });

  console.log(`✓ Task created: ${task.data.taskId}\n`);

  // Step 2: Poll status until done
  console.log('Step 2: Polling task status...');
  let status: ReportStatus;
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes max (5s interval)

  while (attempts < maxAttempts) {
    status = await sdk.reports.checkReportStatus(task.data.taskId, 'warehouse_remains');

    console.log(`  Attempt ${attempts + 1}: Status = ${status.data.status}`);

    if (status.data.status === 'done') {
      console.log(`✓ Report ready! Download URL: ${status.data.file?.url}\n`);
      break;
    }

    if (status.data.status === 'error') {
      throw new Error('Report generation failed');
    }

    // Wait 5 seconds before next poll
    await new Promise((resolve) => setTimeout(resolve, 5000));
    attempts++;
  }

  if (attempts >= maxAttempts) {
    throw new Error('Report generation timeout');
  }

  // Step 3: Download report
  console.log('Step 3: Downloading report...');
  const reportBlob = await sdk.reports.downloadReport(
    task.data.taskId,
    'warehouse_remains'
  );

  console.log(`✓ Report downloaded successfully\n`);
  console.log(`Report type: ${typeof reportBlob}`);

  // In real application, save to file:
  // const fs = require('fs');
  // const buffer = Buffer.from(await reportBlob.arrayBuffer());
  // fs.writeFileSync('warehouse_remains.xlsx', buffer);

  return reportBlob;
}

// ============================================================================
// Example 7: Locale Support in Reports
// ============================================================================

/**
 * Generate reports in different locales for international teams.
 */
async function generateReportsInDifferentLocales() {
  console.log('🌍 Generating reports in different locales...\n');

  const locales = ['ru', 'en', 'zh'];

  for (const locale of locales) {
    console.log(`Generating report in ${locale.toUpperCase()}...`);

    const task = await sdk.reports.createWarehouseRemainsReport({
      locale: locale as 'ru' | 'en' | 'zh',
    });

    console.log(`  Task ID: ${task.data.taskId}\n`);

    // In production, you would poll and download each report
  }
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  try {
    console.log('🚀 Wildberries Reports & Analytics Examples\n');
    console.log('='.repeat(60));
    console.log();

    // Run examples (comment out as needed)
    await fetchAllIncomes();
    await monitorStockLevels();
    await trackCustomerOrders();
    await analyzeSalesAndReturns();
    await generateExciseReport();
    await generateWarehouseRemainsReport();
    await generateReportsInDifferentLocales();

    console.log('='.repeat(60));
    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

/**
 * Verify W49 2025 Storage Fees: Weekly Report vs Paid Storage API
 *
 * W49 2025 = Monday Dec 1 - Sunday Dec 7, 2025
 */

import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.WB_API_KEY;

if (!API_KEY) {
  console.error('ERROR: Set WB_API_KEY in .env file');
  process.exit(1);
}

// W49 2025 dates
const W49_START = '2025-12-01';
const W49_END = '2025-12-07';

// For weekly report we need the Monday of the week
const WEEK_MONDAY = '2025-12-01';

interface WeeklyReportRow {
  realizationreport_id: number;
  date_from: string;
  date_to: string;
  supplier_oper_name: string;
  nm_id: number;
  storage_fee: number;
  [key: string]: any;
}

interface PaidStorageRow {
  date: string;
  nmId: number;
  warehousePrice: number;
  calcType: string;
  [key: string]: any;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function wbFetch(url: string, method = 'GET', body?: any): Promise<any> {
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': API_KEY!,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return response.json();
}

// ========== WEEKLY REPORT ==========

async function getWeeklyReport(): Promise<WeeklyReportRow[]> {
  console.log('\n📊 WEEKLY REPORT (Еженедельный отчет реализации)');
  console.log('=' .repeat(60));

  const url = `https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod?dateFrom=${W49_START}&dateTo=${W49_END}`;

  console.log(`Fetching: ${url}`);

  const data = await wbFetch(url);

  if (!Array.isArray(data)) {
    console.log('Response:', JSON.stringify(data, null, 2).slice(0, 500));
    return [];
  }

  console.log(`Total rows: ${data.length}`);

  return data;
}

// ========== PAID STORAGE API ==========

async function createStorageTask(dateFrom: string, dateTo: string): Promise<string> {
  const url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  console.log(`Creating task: ${dateFrom} to ${dateTo}`);

  const response = await wbFetch(url);

  if (response.data?.taskId) {
    return response.data.taskId;
  }

  throw new Error(`No taskId in response: ${JSON.stringify(response)}`);
}

async function waitForTask(taskId: string): Promise<void> {
  const url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`;

  for (let attempt = 0; attempt < 30; attempt++) {
    const response = await wbFetch(url);
    const status = response.data?.status;

    if (status === 'done') {
      console.log(`  Task ${taskId}: done`);
      return;
    }

    if (status === 'canceled' || status === 'purged') {
      throw new Error(`Task ${taskId} failed: ${status}`);
    }

    process.stdout.write('.');
    await sleep(5000); // 5 sec between status checks
  }

  throw new Error(`Task ${taskId} timeout`);
}

async function downloadTask(taskId: string): Promise<PaidStorageRow[]> {
  const url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download`;
  const response = await wbFetch(url);
  return response || [];
}

async function getPaidStorage(): Promise<PaidStorageRow[]> {
  console.log('\n💰 PAID STORAGE API (API платного хранения)');
  console.log('=' .repeat(60));

  const allData: PaidStorageRow[] = [];

  // Split into 2-day chunks (API limit is 8 days, but smaller chunks are safer)
  const chunks = [
    { from: '2025-12-01', to: '2025-12-02' },
    { from: '2025-12-03', to: '2025-12-04' },
    { from: '2025-12-05', to: '2025-12-06' },
    { from: '2025-12-07', to: '2025-12-07' },
  ];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`\n[${i + 1}/${chunks.length}] ${chunk.from} to ${chunk.to}`);

    try {
      // Create task
      const taskId = await createStorageTask(chunk.from, chunk.to);
      console.log(`  TaskId: ${taskId}`);

      // Wait for completion
      await waitForTask(taskId);

      // Download data
      const data = await downloadTask(taskId);
      console.log(`  Downloaded: ${data.length} rows`);

      allData.push(...data);

      // Rate limit: wait 65 seconds between task creations
      if (i < chunks.length - 1) {
        console.log('  Waiting 65s for rate limit...');
        await sleep(65000);
      }
    } catch (error) {
      console.error(`  ERROR: ${error}`);
    }
  }

  console.log(`\nTotal paid storage rows: ${allData.length}`);
  return allData;
}

// ========== ANALYSIS ==========

function analyzeWeeklyReport(data: WeeklyReportRow[]): void {
  console.log('\n📊 WEEKLY REPORT ANALYSIS');
  console.log('=' .repeat(60));

  // Filter storage fees only
  const storageRows = data.filter(row =>
    row.supplier_oper_name === 'Хранение' ||
    row.storage_fee !== 0
  );

  // Total storage_fee
  const totalStorageFee = data.reduce((sum, row) => sum + (row.storage_fee || 0), 0);

  // Storage operations only (nm_id = 0, supplier_oper_name = 'Хранение')
  const pureStorageRows = data.filter(row => row.supplier_oper_name === 'Хранение');
  const pureStorageTotal = pureStorageRows.reduce((sum, row) => sum + (row.storage_fee || 0), 0);

  // By day
  const byDay = new Map<string, number>();
  for (const row of data) {
    if (row.storage_fee) {
      const day = row.rr_dt?.split('T')[0] || 'unknown';
      byDay.set(day, (byDay.get(day) || 0) + row.storage_fee);
    }
  }

  console.log(`Total rows: ${data.length}`);
  console.log(`Rows with storage_fee ≠ 0: ${data.filter(r => r.storage_fee !== 0).length}`);
  console.log(`Pure storage rows (supplier_oper_name='Хранение'): ${pureStorageRows.length}`);
  console.log(`\nTotal storage_fee (all rows): ${totalStorageFee.toFixed(2)}₽`);
  console.log(`Pure storage total: ${pureStorageTotal.toFixed(2)}₽`);

  console.log('\nBy day:');
  for (const [day, total] of [...byDay.entries()].sort()) {
    console.log(`  ${day}: ${total.toFixed(2)}₽`);
  }

  // Show sample storage rows
  console.log('\nSample storage rows:');
  pureStorageRows.slice(0, 3).forEach((row, i) => {
    console.log(`  [${i + 1}] nm_id=${row.nm_id}, date=${row.rr_dt}, storage_fee=${row.storage_fee}`);
  });
}

function analyzePaidStorage(data: PaidStorageRow[]): void {
  console.log('\n💰 PAID STORAGE ANALYSIS');
  console.log('=' .repeat(60));

  // Total warehousePrice
  const totalWarehousePrice = data.reduce((sum, row) => sum + (row.warehousePrice || 0), 0);

  // By day
  const byDay = new Map<string, number>();
  for (const row of data) {
    const day = row.date?.split('T')[0] || 'unknown';
    byDay.set(day, (byDay.get(day) || 0) + (row.warehousePrice || 0));
  }

  // By calcType
  const byCalcType = new Map<string, { count: number; total: number }>();
  for (const row of data) {
    const type = row.calcType || 'unknown';
    const existing = byCalcType.get(type) || { count: 0, total: 0 };
    existing.count++;
    existing.total += row.warehousePrice || 0;
    byCalcType.set(type, existing);
  }

  console.log(`Total rows: ${data.length}`);
  console.log(`Total warehousePrice: ${totalWarehousePrice.toFixed(2)}₽`);

  console.log('\nBy day:');
  for (const [day, total] of [...byDay.entries()].sort()) {
    console.log(`  ${day}: ${total.toFixed(2)}₽`);
  }

  console.log('\nBy calcType:');
  for (const [type, stats] of byCalcType.entries()) {
    console.log(`  ${type}: ${stats.count} rows, ${stats.total.toFixed(2)}₽`);
  }
}

function compareResults(weeklyTotal: number, paidStorageTotal: number): void {
  console.log('\n🔍 COMPARISON');
  console.log('=' .repeat(60));

  const diff = Math.abs(weeklyTotal - paidStorageTotal);
  const diffPercent = (diff / weeklyTotal) * 100;

  console.log(`Weekly Report storage_fee:    ${weeklyTotal.toFixed(2)}₽`);
  console.log(`Paid Storage warehousePrice:  ${paidStorageTotal.toFixed(2)}₽`);
  console.log(`Difference:                   ${diff.toFixed(2)}₽ (${diffPercent.toFixed(4)}%)`);

  if (diffPercent < 1) {
    console.log('\n✅ DATA MATCHES (difference < 1%)');
  } else if (diffPercent < 5) {
    console.log('\n⚠️ MINOR DISCREPANCY (1-5%)');
  } else {
    console.log('\n❌ SIGNIFICANT DISCREPANCY (> 5%)');
  }
}

// ========== MAIN ==========

async function main() {
  console.log('🔎 W49 2025 Storage Fees Verification');
  console.log(`Period: ${W49_START} to ${W49_END}`);
  console.log('=' .repeat(60));

  // 1. Get Weekly Report
  let weeklyData: WeeklyReportRow[] = [];
  try {
    weeklyData = await getWeeklyReport();
    analyzeWeeklyReport(weeklyData);
  } catch (error) {
    console.error('Failed to get weekly report:', error);
  }

  // 2. Get Paid Storage (this takes ~5 minutes due to rate limits)
  let paidStorageData: PaidStorageRow[] = [];
  try {
    paidStorageData = await getPaidStorage();
    analyzePaidStorage(paidStorageData);
  } catch (error) {
    console.error('Failed to get paid storage:', error);
  }

  // 3. Compare
  if (weeklyData.length > 0 && paidStorageData.length > 0) {
    const weeklyTotal = weeklyData.reduce((sum, row) => sum + (row.storage_fee || 0), 0);
    const paidStorageTotal = paidStorageData.reduce((sum, row) => sum + (row.warehousePrice || 0), 0);
    compareResults(weeklyTotal, paidStorageTotal);
  }

  // 4. Save raw data for inspection
  const outputDir = 'examples/debug_output';
  const { mkdirSync, writeFileSync } = await import('fs');
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(`${outputDir}/w49_2025_weekly_report.json`, JSON.stringify(weeklyData, null, 2));
  writeFileSync(`${outputDir}/w49_2025_paid_storage.json`, JSON.stringify(paidStorageData, null, 2));

  console.log(`\n📁 Raw data saved to ${outputDir}/`);
}

main().catch(console.error);

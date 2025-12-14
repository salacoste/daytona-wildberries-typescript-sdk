/**
 * Verify Storage Fees using SDK methods (not raw API)
 * W49 2025: Dec 1-7, 2025
 */

import * as dotenv from 'dotenv';
dotenv.config();

import { WildberriesSDK } from '../src';

const API_KEY = process.env.WB_API_KEY;

if (!API_KEY) {
  console.error('ERROR: Set WB_API_KEY in .env file');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey: API_KEY });

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🔎 SDK Storage Fees Verification - W49 2025');
  console.log('Period: 2025-12-01 to 2025-12-07');
  console.log('=' .repeat(60));

  // ========== 1. Weekly Report ==========
  console.log('\n📊 METHOD 1: sdk.finances.getSupplierReportdetailbyperiod()');
  console.log('-'.repeat(60));

  const weeklyReport = await sdk.finances.getSupplierReportdetailbyperiod({
    dateFrom: '2025-12-01',
    dateTo: '2025-12-07'
  });

  console.log(`Total rows: ${weeklyReport.length}`);

  // Calculate storage_fee
  const weeklyStorageFee = weeklyReport.reduce(
    (sum, row) => sum + (row.storage_fee || 0),
    0
  );

  // Storage rows only
  const storageRows = weeklyReport.filter(row => row.supplier_oper_name === 'Хранение');
  console.log(`Storage rows (supplier_oper_name='Хранение'): ${storageRows.length}`);

  console.log(`\n✅ Weekly Report storage_fee: ${weeklyStorageFee.toFixed(2)}₽`);

  // By day
  console.log('\nBy day:');
  const byDay = new Map<string, number>();
  for (const row of weeklyReport) {
    if (row.storage_fee) {
      const day = (row as any).rr_dt?.split('T')[0] || 'unknown';
      byDay.set(day, (byDay.get(day) || 0) + row.storage_fee);
    }
  }
  for (const [day, total] of [...byDay.entries()].sort()) {
    console.log(`  ${day}: ${total.toFixed(2)}₽`);
  }

  // ========== 2. Paid Storage API ==========
  console.log('\n💰 METHOD 2: sdk.reports.paidStorage() → getTasksStatu3() → getTasksDownload3()');
  console.log('-'.repeat(60));

  // Step 1: Create task
  console.log('Step 1: Creating task...');
  const taskResponse = await sdk.reports.paidStorage({
    dateFrom: '2025-12-01',
    dateTo: '2025-12-07'
  });

  const taskId = (taskResponse as any).data?.taskId;
  if (!taskId) {
    console.error('No taskId received:', taskResponse);
    return;
  }
  console.log(`TaskId: ${taskId}`);

  // Step 2: Poll status
  console.log('Step 2: Waiting for task completion...');
  let status = '';
  let attempts = 0;
  while (status !== 'done' && attempts < 60) {
    await sleep(5000);
    const statusResponse = await sdk.reports.getTasksStatu3(taskId);
    status = (statusResponse as any).data?.status || '';
    process.stdout.write('.');
    attempts++;

    if (status === 'canceled' || status === 'purged') {
      console.error(`\nTask failed: ${status}`);
      return;
    }
  }
  console.log(` ${status}`);

  // Step 3: Download data
  console.log('Step 3: Downloading data...');
  const paidStorageData = await sdk.reports.getTasksDownload3(taskId);

  // Handle response - it might be wrapped in an array or not
  const dataArray = Array.isArray(paidStorageData) ? paidStorageData : [];
  console.log(`Total rows: ${dataArray.length}`);

  // Calculate warehousePrice (NO abs!)
  const paidStorageTotal = dataArray.reduce(
    (sum: number, row: any) => sum + (row.warehousePrice || 0),
    0
  );

  console.log(`\n✅ Paid Storage warehousePrice: ${paidStorageTotal.toFixed(2)}₽`);

  // By day
  console.log('\nBy day:');
  const psByDay = new Map<string, number>();
  for (const row of dataArray) {
    const day = (row as any).date?.split('T')[0] || 'unknown';
    psByDay.set(day, (psByDay.get(day) || 0) + ((row as any).warehousePrice || 0));
  }
  for (const [day, total] of [...psByDay.entries()].sort()) {
    console.log(`  ${day}: ${total.toFixed(2)}₽`);
  }

  // By calcType
  console.log('\nBy calcType:');
  const byCalcType = new Map<string, { count: number; total: number }>();
  for (const row of dataArray) {
    const type = (row as any).calcType || 'unknown';
    const existing = byCalcType.get(type) || { count: 0, total: 0 };
    existing.count++;
    existing.total += (row as any).warehousePrice || 0;
    byCalcType.set(type, existing);
  }
  for (const [type, stats] of byCalcType.entries()) {
    console.log(`  ${type}: ${stats.count} rows, ${stats.total.toFixed(2)}₽`);
  }

  // ========== 3. Comparison ==========
  console.log('\n🔍 COMPARISON');
  console.log('=' .repeat(60));

  const diff = Math.abs(weeklyStorageFee - paidStorageTotal);
  const diffPercent = weeklyStorageFee > 0 ? (diff / weeklyStorageFee) * 100 : 0;

  console.log(`Weekly Report storage_fee:    ${weeklyStorageFee.toFixed(2)}₽`);
  console.log(`Paid Storage warehousePrice:  ${paidStorageTotal.toFixed(2)}₽`);
  console.log(`Difference:                   ${diff.toFixed(2)}₽ (${diffPercent.toFixed(4)}%)`);

  if (diff < 1) {
    console.log('\n✅ DATA MATCHES! Difference < 1₽');
  } else {
    console.log('\n❌ DATA DOES NOT MATCH!');
  }
}

main().catch(console.error);

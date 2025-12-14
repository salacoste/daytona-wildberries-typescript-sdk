/**
 * Test SDK Storage Methods - W49 2025
 * Using actual SDK methods
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
  console.log('🔎 SDK Storage Test - W49 2025 (Dec 1-7)');
  console.log('=' .repeat(60));

  // ========== 1. Weekly Report via SDK ==========
  console.log('\n📊 METHOD: sdk.finances.getSupplierReportdetailbyperiod()');
  console.log('-'.repeat(60));

  try {
    const weeklyReport = await sdk.finances.getSupplierReportdetailbyperiod({
      dateFrom: '2025-12-01',
      dateTo: '2025-12-07'
    });

    console.log(`Total rows: ${weeklyReport.length}`);

    const weeklyStorageFee = weeklyReport.reduce(
      (sum, row) => sum + (row.storage_fee || 0),
      0
    );

    const storageRows = weeklyReport.filter(row => row.supplier_oper_name === 'Хранение');
    console.log(`Storage rows: ${storageRows.length}`);
    console.log(`✅ storage_fee: ${weeklyStorageFee.toFixed(2)}₽`);

    // ========== 2. Paid Storage via SDK ==========
    console.log('\n💰 METHOD: sdk.reports.paidStorage() → getTasksStatu3() → getTasksDownload3()');
    console.log('-'.repeat(60));

    // Create task
    console.log('Creating task...');
    const taskResponse = await sdk.reports.paidStorage({
      dateFrom: '2025-12-01',
      dateTo: '2025-12-07'
    });

    const taskId = (taskResponse as any).data?.taskId;
    console.log(`TaskId: ${taskId}`);

    // Poll status
    console.log('Waiting for task...');
    let status = '';
    let attempts = 0;
    while (status !== 'done' && attempts < 60) {
      await sleep(5000);
      const statusResponse = await sdk.reports.getTasksStatu3(taskId);
      status = (statusResponse as any).data?.status || '';
      process.stdout.write('.');
      attempts++;

      if (status === 'canceled' || status === 'purged') {
        throw new Error(`Task failed: ${status}`);
      }
    }
    console.log(` ${status}`);

    // Download
    console.log('Downloading...');
    const paidStorageData = await sdk.reports.getTasksDownload3(taskId);
    const dataArray = Array.isArray(paidStorageData) ? paidStorageData : [];
    console.log(`Total rows: ${dataArray.length}`);

    const paidStorageTotal = dataArray.reduce(
      (sum: number, row: any) => sum + (row.warehousePrice || 0),
      0
    );
    console.log(`✅ warehousePrice: ${paidStorageTotal.toFixed(2)}₽`);

    // ========== 3. Comparison ==========
    console.log('\n🔍 COMPARISON');
    console.log('=' .repeat(60));

    const diff = Math.abs(weeklyStorageFee - paidStorageTotal);
    const diffPercent = weeklyStorageFee > 0 ? (diff / weeklyStorageFee) * 100 : 0;

    console.log(`Weekly Report storage_fee:    ${weeklyStorageFee.toFixed(2)}₽`);
    console.log(`Paid Storage warehousePrice:  ${paidStorageTotal.toFixed(2)}₽`);
    console.log(`Difference:                   ${diff.toFixed(2)}₽ (${diffPercent.toFixed(4)}%)`);

    if (diff < 1) {
      console.log('\n✅ SDK РАБОТАЕТ! Данные совпадают!');
    } else {
      console.log('\n⚠️ Есть расхождение');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

main();

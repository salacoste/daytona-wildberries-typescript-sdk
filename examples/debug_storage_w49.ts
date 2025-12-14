/**
 * Debug script to check W49 storage data day by day
 */
import 'dotenv/config';

const API_KEY = process.env.WB_API_KEY;
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function wbFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Authorization': API_KEY! }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

interface StorageItem {
  date: string;
  warehousePrice: number;
  calcType: string;
  nmId: number;
}

async function checkDay(date: string) {
  const url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage?dateFrom=${date}&dateTo=${date}`;
  const task: any = await wbFetch(url);
  const taskId = task.data.taskId;

  // Wait for completion
  let status = 'processing';
  let attempts = 0;
  while (status !== 'done' && attempts < 60) {
    await delay(3000);
    const st: any = await wbFetch(
      `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`
    );
    status = st.data.status;
    attempts++;
  }

  if (status !== 'done') {
    throw new Error(`Task timeout for ${date}`);
  }

  const data: StorageItem[] = await wbFetch(
    `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download`
  );

  const total = data.reduce((s, i) => s + (i.warehousePrice || 0), 0);
  const calcTypes: Record<string, number> = {};

  for (const item of data) {
    const type = item.calcType || 'unknown';
    calcTypes[type] = (calcTypes[type] || 0) + (item.warehousePrice || 0);
  }

  return { date, records: data.length, total, calcTypes };
}

async function main() {
  console.log('📊 Checking W49 storage data DAY BY DAY\n');
  console.log('This will take ~8 minutes due to rate limits...\n');

  // W49 2024: Dec 2 (Mon) - Dec 8 (Sun)
  const days = [
    '2024-12-02',
    '2024-12-03',
    '2024-12-04',
    '2024-12-05',
    '2024-12-06',
    '2024-12-07',
    '2024-12-08'
  ];

  let grandTotal = 0;
  let grandRecords = 0;
  const allCalcTypes: Record<string, number> = {};
  const dailyData: Array<{ date: string; records: number; total: number }> = [];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    console.log(`[${i+1}/${days.length}] Fetching ${day}...`);

    try {
      const result = await checkDay(day);

      console.log(`    ✅ Records: ${result.records}, Total: ${result.total.toFixed(2)}₽`);

      grandTotal += result.total;
      grandRecords += result.records;
      dailyData.push({ date: day, records: result.records, total: result.total });

      for (const [type, amount] of Object.entries(result.calcTypes)) {
        allCalcTypes[type] = (allCalcTypes[type] || 0) + amount;
      }
    } catch (error) {
      console.log(`    ❌ Error: ${error}`);
    }

    if (i < days.length - 1) {
      console.log('    ⏳ Rate limit pause (65s)...');
      await delay(65000);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('📋 ИТОГО W49 (Dec 2-8, 2024):');
  console.log('═'.repeat(60));

  console.log('\n┌──────────────┬──────────┬─────────────┐');
  console.log('│ Дата         │ Записей  │ Сумма (₽)   │');
  console.log('├──────────────┼──────────┼─────────────┤');
  for (const d of dailyData) {
    console.log(`│ ${d.date}   │ ${d.records.toString().padStart(8)} │ ${d.total.toFixed(2).padStart(11)} │`);
  }
  console.log('├──────────────┼──────────┼─────────────┤');
  console.log(`│ ИТОГО        │ ${grandRecords.toString().padStart(8)} │ ${grandTotal.toFixed(2).padStart(11)} │`);
  console.log('└──────────────┴──────────┴─────────────┘');

  console.log('\n📦 По типам расчёта (calcType):');
  const sortedTypes = Object.entries(allCalcTypes).sort((a, b) => b[1] - a[1]);
  for (const [type, amount] of sortedTypes) {
    const pct = ((amount / grandTotal) * 100).toFixed(1);
    console.log(`   ${type}: ${amount.toFixed(2)}₽ (${pct}%)`);
  }
}

main().catch(console.error);

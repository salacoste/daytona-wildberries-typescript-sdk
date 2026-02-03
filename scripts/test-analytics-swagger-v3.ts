/**
 * Test all 16 analytics endpoints from the CURRENT WB Swagger spec
 * Source: https://dev.wildberries.ru/yaml/ru/11-analytics.yaml (fetched 2026-02-03)
 *
 * Key discovery: "Воронка продаж" moved from /api/v2/nm-report/* to /api/analytics/v3/sales-funnel/*
 */
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.WB_API_KEY;
if (!API_KEY) {
  console.error('WB_API_KEY not found in .env');
  process.exit(1);
}

const BASE = 'https://seller-analytics-api.wildberries.ru';

const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

interface TestResult {
  group: string;
  method: string;
  path: string;
  desc: string;
  status: 'PASS' | 'FAIL';
  httpStatus: number;
  detail: string;
}

const results: TestResult[] = [];

async function testEndpoint(
  group: string,
  method: 'GET' | 'POST',
  path: string,
  desc: string,
  body?: unknown
): Promise<void> {
  const url = `${BASE}${path}`;
  const headers: Record<string, string> = {
    Authorization: API_KEY!,
    'Content-Type': 'application/json',
  };

  const options: RequestInit = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    let detail = '';

    if (response.ok) {
      try {
        const json = JSON.parse(text);
        const dataKeys = json.data ? Object.keys(json.data).join(', ') : 'no data key';
        detail = `OK. Keys: ${dataKeys}`;
      } catch {
        detail = `OK. ${text.length} bytes (non-JSON)`;
      }
    } else {
      try {
        const json = JSON.parse(text);
        detail = `${json.title || json.message || json.error || text.substring(0, 100)}`;
      } catch {
        detail = text.substring(0, 100);
      }
    }

    const status = response.ok ? 'PASS' : 'FAIL';
    const icon = response.ok ? '✅' : '❌';
    console.log(`  ${icon} [${response.status}] ${method} ${path}`);
    console.log(`     ${desc}`);
    console.log(`     → ${detail}`);

    results.push({
      group,
      method,
      path,
      desc,
      status,
      httpStatus: response.status,
      detail,
    });
  } catch (error) {
    console.log(`  💥 [ERR] ${method} ${path}`);
    console.log(`     → ${error}`);
    results.push({
      group,
      method,
      path,
      desc,
      status: 'FAIL',
      httpStatus: 0,
      detail: `Network error: ${error}`,
    });
  }
}

async function main(): Promise<void> {
  console.log('══════════════════════════════════════════════════════════════════════');
  console.log('  WB Analytics — Full Endpoint Test (from Swagger 2026-02-03)');
  console.log(`  Date: ${new Date().toISOString()}`);
  console.log('══════════════════════════════════════════════════════════════════════');

  // ═══════════════════════════════════════════════════════════════
  // GROUP 1: Воронка продаж (NEW v3 endpoints!)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n── GROUP 1: Воронка продаж (v3 sales-funnel) ──');

  await testEndpoint(
    'Воронка продаж',
    'POST',
    '/api/analytics/v3/sales-funnel/products',
    'Статистика карточек товаров за период',
    {
      selectedPeriod: { start: daysAgo(7), end: daysAgo(0) },
      orderBy: { field: 'openCard', mode: 'asc' },
      limit: 3,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'Воронка продаж',
    'POST',
    '/api/analytics/v3/sales-funnel/products/history',
    'Статистика карточек товаров по дням',
    {
      selectedPeriod: { start: daysAgo(5), end: daysAgo(0) },
      nmIds: [1],
      aggregationLevel: 'day',
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'Воронка продаж',
    'POST',
    '/api/analytics/v3/sales-funnel/grouped/history',
    'Статистика групп карточек товаров по дням',
    {
      selectedPeriod: { start: daysAgo(5), end: daysAgo(0) },
      brandNames: [],
      subjectIds: [],
      tagIds: [],
      aggregationLevel: 'day',
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  // ═══════════════════════════════════════════════════════════════
  // GROUP 2: Поисковые запросы по вашим товарам
  // ═══════════════════════════════════════════════════════════════
  console.log('\n── GROUP 2: Поисковые запросы ──');

  await testEndpoint(
    'Поисковые запросы',
    'POST',
    '/api/v2/search-report/report',
    'Основная страница',
    {
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      positionCluster: 'all',
      orderBy: { field: 'openCard', mode: 'desc' },
      limit: 1,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'Поисковые запросы',
    'POST',
    '/api/v2/search-report/table/groups',
    'Пагинация по группам',
    {
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      positionCluster: 'all',
      orderBy: { field: 'openCard', mode: 'desc' },
      limit: 1,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'Поисковые запросы',
    'POST',
    '/api/v2/search-report/table/details',
    'Пагинация по товарам в группе',
    {
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      positionCluster: 'all',
      orderBy: { field: 'openCard', mode: 'desc' },
      limit: 1,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'Поисковые запросы',
    'POST',
    '/api/v2/search-report/product/search-texts',
    'Поисковые запросы по товару',
    {
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      nmIds: [1],
      limit: 1,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'Поисковые запросы',
    'POST',
    '/api/v2/search-report/product/orders',
    'Заказы и позиции по поисковым запросам товара',
    {
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      nmId: 1,
      limit: 1,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  // ═══════════════════════════════════════════════════════════════
  // GROUP 3: История остатков
  // ═══════════════════════════════════════════════════════════════
  console.log('\n── GROUP 3: История остатков ──');

  await testEndpoint(
    'История остатков',
    'POST',
    '/api/v2/stocks-report/products/groups',
    'Данные по группам',
    {
      currentPeriod: { start: daysAgo(30), end: daysAgo(0) },
      stockType: '',
      skipDeletedNm: true,
      availabilityFilters: [],
      orderBy: { field: 'ordersCount', mode: 'desc' },
      limit: 3,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'История остатков',
    'POST',
    '/api/v2/stocks-report/products/products',
    'Данные по товарам',
    {
      currentPeriod: { start: daysAgo(30), end: daysAgo(0) },
      stockType: '',
      skipDeletedNm: true,
      availabilityFilters: [],
      orderBy: { field: 'ordersCount', mode: 'desc' },
      limit: 3,
      offset: 0,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'История остатков',
    'POST',
    '/api/v2/stocks-report/products/sizes',
    'Данные по размерам',
    {
      nmID: 1,
      currentPeriod: { start: daysAgo(30), end: daysAgo(0) },
      stockType: '',
      orderBy: { field: 'ordersCount', mode: 'desc' },
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'История остатков',
    'POST',
    '/api/v2/stocks-report/offices',
    'Данные по складам',
    {
      currentPeriod: { start: daysAgo(30), end: daysAgo(0) },
      stockType: '',
      skipDeletedNm: true,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  // ═══════════════════════════════════════════════════════════════
  // GROUP 4: Аналитика продавца CSV
  // ═══════════════════════════════════════════════════════════════
  console.log('\n── GROUP 4: Аналитика продавца CSV ──');

  await testEndpoint('CSV', 'GET', '/api/v2/nm-report/downloads', 'Получить список отчётов');
  await new Promise((r) => setTimeout(r, 21000));

  // POST downloads — skip actual creation to avoid side effects
  // POST retry — skip (needs existing report ID)
  // GET file — skip (needs downloadId)

  // ═══════════════════════════════════════════════════════════════
  // GROUP 5: Old nm-report endpoints (should be 404)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n── GROUP 5: OLD nm-report endpoints (expect 404) ──');

  await testEndpoint(
    'OLD (deprecated)',
    'POST',
    '/api/v2/nm-report/detail',
    '[OLD] Статистика карточек товаров за период',
    {
      period: { begin: daysAgo(7), end: daysAgo(0) },
      page: 1,
    }
  );
  await new Promise((r) => setTimeout(r, 21000));

  await testEndpoint(
    'OLD (deprecated)',
    'POST',
    '/api/v2/nm-report/detail/history',
    '[OLD] Статистика карточек товаров по дням',
    {
      nmIDs: [1],
      period: { begin: daysAgo(5), end: daysAgo(0) },
      timezone: 'Europe/Moscow',
      aggregationLevel: 'day',
    }
  );

  // ═══════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════
  console.log('\n══════════════════════════════════════════════════════════════════════');
  console.log('  SUMMARY');
  console.log('══════════════════════════════════════════════════════════════════════\n');

  const groups = [...new Set(results.map((r) => r.group))];
  for (const group of groups) {
    const groupResults = results.filter((r) => r.group === group);
    const passed = groupResults.filter((r) => r.status === 'PASS').length;
    console.log(`  ${group}: ${passed}/${groupResults.length} passed`);
    for (const r of groupResults) {
      const icon = r.status === 'PASS' ? '✅' : '❌';
      console.log(`    ${icon} [${r.httpStatus}] ${r.method} ${r.path}`);
    }
  }

  const totalPass = results.filter((r) => r.status === 'PASS').length;
  const totalFail = results.filter((r) => r.status === 'FAIL').length;
  console.log(`\n  TOTAL: ${totalPass} PASS, ${totalFail} FAIL out of ${results.length}`);

  // Mapping table
  console.log('\n══════════════════════════════════════════════════════════════════════');
  console.log('  MIGRATION MAP: Old → New endpoints');
  console.log('══════════════════════════════════════════════════════════════════════\n');
  console.log('  OLD (404)                              → NEW (v3)');
  console.log('  /api/v2/nm-report/detail               → /api/analytics/v3/sales-funnel/products');
  console.log(
    '  /api/v2/nm-report/detail/history        → /api/analytics/v3/sales-funnel/products/history'
  );
  console.log(
    '  /api/v2/nm-report/grouped/history       → /api/analytics/v3/sales-funnel/grouped/history'
  );
  console.log('  /api/v2/nm-report/grouped               → (removed, no direct replacement)');

  process.exit(totalFail > 0 && totalPass === 0 ? 1 : 0);
}

main().catch(console.error);

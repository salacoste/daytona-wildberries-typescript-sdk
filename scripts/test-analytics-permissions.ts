/**
 * Analytics API Permission & Endpoint Verification Script
 *
 * Tests all analytics endpoints to verify:
 * 1. nm-report/* endpoints — Backend claims 404 due to missing "Аналитика" permission
 * 2. stocks-report/* endpoints — Backend claims 400 due to wrong params
 *
 * Usage:
 *   npx tsx scripts/test-analytics-permissions.ts
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  console.error('WB_API_KEY not set in .env');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey });
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Date helpers
const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

interface TestResult {
  endpoint: string;
  method: string;
  sdkMethod: string;
  status: 'PASS' | 'FAIL_404' | 'FAIL_403' | 'FAIL_401' | 'FAIL_400' | 'FAIL_OTHER';
  httpStatus?: number;
  detail: string;
}

const results: TestResult[] = [];

function record(r: TestResult) {
  results.push(r);
  const icon =
    r.status === 'PASS'
      ? '✅'
      : r.status === 'FAIL_404'
        ? '🚫'
        : r.status === 'FAIL_403'
          ? '🔒'
          : r.status === 'FAIL_401'
            ? '🔑'
            : r.status === 'FAIL_400'
              ? '⚠️'
              : '❌';
  console.log(`  ${icon} [${r.status}] ${r.sdkMethod}`);
  console.log(`     ${r.method} ${r.endpoint}`);
  console.log(`     → ${r.detail}`);
  console.log();
}

function classifyError(error: unknown): { status: string; httpStatus?: number; message: string } {
  const err = error as Record<string, unknown>;
  const message = (err?.message as string) ?? String(error);

  // Extract HTTP status from error
  let httpStatus: number | undefined;

  // Check various error structures
  if (err?.statusCode) httpStatus = err.statusCode as number;
  if (err?.status) httpStatus = err.status as number;
  if (err?.response && typeof err.response === 'object') {
    const resp = err.response as Record<string, unknown>;
    if (resp.status) httpStatus = resp.status as number;
  }

  // Try to extract from message
  if (!httpStatus) {
    const match = message.match(/(\d{3})/);
    if (match) {
      const code = parseInt(match[1]);
      if (code >= 400 && code < 600) httpStatus = code;
    }
  }

  let status: string;
  if (httpStatus === 404) status = 'FAIL_404';
  else if (httpStatus === 403) status = 'FAIL_403';
  else if (httpStatus === 401) status = 'FAIL_401';
  else if (httpStatus === 400) status = 'FAIL_400';
  else status = 'FAIL_OTHER';

  return { status, httpStatus, message };
}

// ══════════════════════════════════════════════════════════════════
// GROUP 1: nm-report/* (Backend claims: 404, missing Аналитика)
// ══════════════════════════════════════════════════════════════════

async function testNmReportEndpoints() {
  console.log('═'.repeat(70));
  console.log('  GROUP 1: nm-report/* endpoints');
  console.log('  Backend claim: "404 because token missing Аналитика permission"');
  console.log('═'.repeat(70));
  console.log();

  // 1.1 createNmReportDetail
  try {
    const r = await sdk.analytics.createNmReportDetail({
      period: { begin: daysAgo(7), end: daysAgo(0) },
      page: 1,
    });
    const count = r.data?.cards?.length ?? r.data?.items?.length ?? 0;
    record({
      endpoint: '/api/v2/nm-report/detail',
      method: 'POST',
      sdkMethod: 'createNmReportDetail',
      status: 'PASS',
      detail: `Returned ${count} items. Token HAS analytics permission.`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/nm-report/detail',
      method: 'POST',
      sdkMethod: 'createNmReportDetail',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);

  // 1.2 createDetailHistory
  try {
    // Need at least one nmID — try with a dummy first, then with real one
    const r = await sdk.analytics.createDetailHistory({
      nmIDs: [1], // Dummy ID to test permissions vs 404
      period: { begin: daysAgo(3), end: daysAgo(0) },
      timezone: 'Europe/Moscow',
      aggregationLevel: 'day',
    });
    record({
      endpoint: '/api/v2/nm-report/detail/history',
      method: 'POST',
      sdkMethod: 'createDetailHistory',
      status: 'PASS',
      detail: `Response received (items: ${r.data?.items?.length ?? 0}). Endpoint accessible.`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/nm-report/detail/history',
      method: 'POST',
      sdkMethod: 'createDetailHistory',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);

  // 1.3 createGroupedHistory
  try {
    const r = await sdk.analytics.createGroupedHistory({
      period: { begin: daysAgo(3), end: daysAgo(0) },
      timezone: 'Europe/Moscow',
      aggregationLevel: 'day',
    });
    record({
      endpoint: '/api/v2/nm-report/grouped/history',
      method: 'POST',
      sdkMethod: 'createGroupedHistory',
      status: 'PASS',
      detail: `Response received (items: ${r.data?.items?.length ?? 0}). Endpoint accessible.`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/nm-report/grouped/history',
      method: 'POST',
      sdkMethod: 'createGroupedHistory',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);

  // 1.4 getNmReportDownloads (GET - list reports)
  try {
    const r = await sdk.analytics.getNmReportDownloads();
    const count = r.data?.length ?? 0;
    record({
      endpoint: '/api/v2/nm-report/downloads',
      method: 'GET',
      sdkMethod: 'getNmReportDownloads',
      status: 'PASS',
      detail: `Response received (reports: ${count}). Endpoint accessible.`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/nm-report/downloads',
      method: 'GET',
      sdkMethod: 'getNmReportDownloads',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);
}

// ══════════════════════════════════════════════════════════════════
// GROUP 2: search-report/* (related to nm-report)
// ══════════════════════════════════════════════════════════════════

async function testSearchReportEndpoints() {
  console.log('═'.repeat(70));
  console.log('  GROUP 2: search-report/* endpoints');
  console.log('  Testing analytics search report access');
  console.log('═'.repeat(70));
  console.log();

  // 2.1 createSearchReportReport
  try {
    const r = await sdk.analytics.createSearchReportReport({
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      positionCluster: 'all',
      orderBy: { field: 'openCard', mode: 'desc' },
      includeSubstitutedSKUs: true,
      includeSearchTexts: true,
      limit: 5,
      offset: 0,
    });
    record({
      endpoint: '/api/v2/search-report/report',
      method: 'POST',
      sdkMethod: 'createSearchReportReport',
      status: 'PASS',
      detail: `Response received. commonInfo present: ${!!r.data?.commonInfo}`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/search-report/report',
      method: 'POST',
      sdkMethod: 'createSearchReportReport',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);

  // 2.2 createTableGroup
  try {
    const r = await sdk.analytics.createTableGroup({
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      positionCluster: 'all',
      orderBy: { field: 'openCard', mode: 'desc' },
      includeSubstitutedSKUs: true,
      includeSearchTexts: true,
      limit: 5,
      offset: 0,
    });
    record({
      endpoint: '/api/v2/search-report/table/groups',
      method: 'POST',
      sdkMethod: 'createTableGroup',
      status: 'PASS',
      detail: `Response received. Groups: ${r.data?.groups?.length ?? 0}`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/search-report/table/groups',
      method: 'POST',
      sdkMethod: 'createTableGroup',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);
}

// ══════════════════════════════════════════════════════════════════
// GROUP 3: stocks-report/* (Backend claims: 400, wrong params)
// ══════════════════════════════════════════════════════════════════

async function testStocksReportEndpoints() {
  console.log('═'.repeat(70));
  console.log('  GROUP 3: stocks-report/* endpoints');
  console.log('  Backend claim: "400, exist but wrong params format"');
  console.log('═'.repeat(70));
  console.log();

  // 3.1 createProductsGroup
  try {
    const r = await sdk.analytics.createProductsGroup({
      currentPeriod: { start: daysAgo(30), end: daysAgo(0) },
      stockType: '',
      skipDeletedNm: true,
      availabilityFilters: [],
      orderBy: { field: 'ordersCount', mode: 'desc' },
      limit: 5,
      offset: 0,
    });
    record({
      endpoint: '/api/v2/stocks-report/products/groups',
      method: 'POST',
      sdkMethod: 'createProductsGroup',
      status: 'PASS',
      detail: `Response received. Groups: ${r.data?.groups?.length ?? 0}`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/stocks-report/products/groups',
      method: 'POST',
      sdkMethod: 'createProductsGroup',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);

  // 3.2 createProductsProduct
  try {
    const r = await sdk.analytics.createProductsProduct({
      currentPeriod: { start: daysAgo(30), end: daysAgo(0) },
      stockType: '',
      skipDeletedNm: true,
      availabilityFilters: [],
      orderBy: { field: 'ordersCount', mode: 'desc' },
      limit: 5,
      offset: 0,
    });
    record({
      endpoint: '/api/v2/stocks-report/products/products',
      method: 'POST',
      sdkMethod: 'createProductsProduct',
      status: 'PASS',
      detail: `Response received. Products: ${r.data?.items?.length ?? 0}`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/stocks-report/products/products',
      method: 'POST',
      sdkMethod: 'createProductsProduct',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);

  // 3.3 createStocksReportOffice
  try {
    const r = await sdk.analytics.createStocksReportOffice({
      currentPeriod: { start: daysAgo(30), end: daysAgo(0) },
      stockType: '',
      skipDeletedNm: true,
    });
    record({
      endpoint: '/api/v2/stocks-report/offices',
      method: 'POST',
      sdkMethod: 'createStocksReportOffice',
      status: 'PASS',
      detail: `Response received. Regions: ${r.data?.regions?.length ?? 0}`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v2/stocks-report/offices',
      method: 'POST',
      sdkMethod: 'createStocksReportOffice',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(21000);
}

// ══════════════════════════════════════════════════════════════════
// GROUP 4: Raw statistics endpoints (different API domain)
// ══════════════════════════════════════════════════════════════════

async function testStatisticsEndpoints() {
  console.log('═'.repeat(70));
  console.log('  GROUP 4: statistics-api endpoints (reports module)');
  console.log('  Baseline: these should work if token has Статистика scope');
  console.log('═'.repeat(70));
  console.log();

  // 4.1 getSupplierOrders
  try {
    const r = await sdk.reports.getSupplierOrders({
      dateFrom: daysAgo(1),
    });
    const count = Array.isArray(r) ? r.length : 0;
    record({
      endpoint: '/api/v1/supplier/orders',
      method: 'GET',
      sdkMethod: 'reports.getSupplierOrders',
      status: 'PASS',
      detail: `Returned ${count} orders. Statistics scope is active.`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v1/supplier/orders',
      method: 'GET',
      sdkMethod: 'reports.getSupplierOrders',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
  await delay(5000);

  // 4.2 getSupplierSales
  try {
    const r = await sdk.reports.getSupplierSales({
      dateFrom: daysAgo(1),
    });
    const count = Array.isArray(r) ? r.length : 0;
    record({
      endpoint: '/api/v1/supplier/sales',
      method: 'GET',
      sdkMethod: 'reports.getSupplierSales',
      status: 'PASS',
      detail: `Returned ${count} sales records. Statistics scope is active.`,
    });
  } catch (error) {
    const { status, httpStatus, message } = classifyError(error);
    record({
      endpoint: '/api/v1/supplier/sales',
      method: 'GET',
      sdkMethod: 'reports.getSupplierSales',
      status: status as TestResult['status'],
      httpStatus,
      detail: message,
    });
  }
}

// ══════════════════════════════════════════════════════════════════
// MAIN + SUMMARY
// ══════════════════════════════════════════════════════════════════

async function main() {
  console.log('═'.repeat(70));
  console.log('  Wildberries SDK — Analytics Permission Verification');
  console.log(`  Date: ${new Date().toISOString()}`);
  console.log(`  Token: ${apiKey!.substring(0, 20)}...${apiKey!.substring(apiKey!.length - 10)}`);
  console.log('═'.repeat(70));
  console.log();

  await testNmReportEndpoints();
  await testSearchReportEndpoints();
  await testStocksReportEndpoints();
  await testStatisticsEndpoints();

  // ── Summary ──────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(70));
  console.log('  SUMMARY');
  console.log('═'.repeat(70) + '\n');

  const pass = results.filter((r) => r.status === 'PASS');
  const fail404 = results.filter((r) => r.status === 'FAIL_404');
  const fail403 = results.filter((r) => r.status === 'FAIL_403');
  const fail401 = results.filter((r) => r.status === 'FAIL_401');
  const fail400 = results.filter((r) => r.status === 'FAIL_400');
  const failOther = results.filter((r) => r.status === 'FAIL_OTHER');

  console.log(`  Total endpoints tested: ${results.length}`);
  console.log(`  ✅ PASS:      ${pass.length}`);
  console.log(`  🚫 404:       ${fail404.length}`);
  console.log(`  🔒 403:       ${fail403.length}`);
  console.log(`  🔑 401:       ${fail401.length}`);
  console.log(`  ⚠️  400:       ${fail400.length}`);
  console.log(`  ❌ Other:     ${failOther.length}`);

  // ── Diagnosis ────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(70));
  console.log('  DIAGNOSIS');
  console.log('─'.repeat(70) + '\n');

  const nmReportResults = results.filter((r) => r.endpoint.includes('nm-report'));
  const nmReport404 = nmReportResults.filter((r) => r.status === 'FAIL_404');
  const nmReportPass = nmReportResults.filter((r) => r.status === 'PASS');

  const stocksResults = results.filter((r) => r.endpoint.includes('stocks-report'));
  const stocks400 = stocksResults.filter((r) => r.status === 'FAIL_400');
  const stocksPass = stocksResults.filter((r) => r.status === 'PASS');

  const searchResults = results.filter((r) => r.endpoint.includes('search-report'));
  const statsResults = results.filter((r) => r.endpoint.includes('supplier'));

  // nm-report analysis
  if (nmReport404.length > 0 && nmReportPass.length === 0) {
    console.log('  🚫 nm-report/*: ALL return 404');
    console.log('     → Backend claim CONFIRMED: Token is missing "Аналитика" permission scope.');
    console.log(
      '     → Fix: Generate new token in WB seller portal with "Аналитика" checkbox enabled.'
    );
  } else if (nmReportPass.length > 0) {
    console.log(
      `  ✅ nm-report/*: ${nmReportPass.length}/${nmReportResults.length} endpoints work`
    );
    console.log('     → Backend claim REFUTED: Token HAS "Аналитика" permission.');
    console.log('     → Issue is on their side (wrong params, expired cache, etc.)');
  } else if (nmReportResults.length > 0) {
    console.log(`  ⚠️  nm-report/*: Mixed results (not all 404)`);
    console.log('     → Investigate further — may be partial permissions or API changes.');
  }
  console.log();

  // stocks-report analysis
  if (stocks400.length > 0 && stocksPass.length === 0) {
    console.log(`  ⚠️  stocks-report/*: ALL return 400`);
    console.log('     → Backend claim about 400 CONFIRMED. Possible causes:');
    console.log('       1. Token missing "Аналитика" scope (may return 400 instead of 404)');
    console.log('       2. Wrong request body format');
    console.log('       3. Required fields missing');
  } else if (stocksPass.length > 0) {
    console.log(
      `  ✅ stocks-report/*: ${stocksPass.length}/${stocksResults.length} endpoints work`
    );
    console.log('     → SDK sends correct params. Issue is on their side.');
  }
  console.log();

  // search-report analysis
  const searchPass = searchResults.filter((r) => r.status === 'PASS');
  if (searchResults.length > 0) {
    console.log(`  📊 search-report/*: ${searchPass.length}/${searchResults.length} work`);
  }

  // statistics baseline
  const statsPass = statsResults.filter((r) => r.status === 'PASS');
  if (statsResults.length > 0) {
    console.log(
      `  📊 statistics-api/*: ${statsPass.length}/${statsResults.length} work (baseline)`
    );
  }

  console.log('\n' + '─'.repeat(70));

  // Final verdict
  if (pass.length === results.length) {
    console.log('  ✅ VERDICT: ALL endpoints accessible. Token has full permissions.');
    console.log('     Backend issue is NOT token permissions — investigate their code.');
  } else if (fail404.length > 0 && nmReport404.length === fail404.length) {
    console.log('  🚫 VERDICT: nm-report/* endpoints return 404 = missing "Аналитика" scope.');
    console.log('     Backend claim is CORRECT. Need new token with Analytics permission.');
  } else {
    console.log('  ⚠️  VERDICT: Mixed results. See detailed breakdown above.');
  }

  console.log('─'.repeat(70) + '\n');

  // Exit code
  if (fail404.length > 0 || fail403.length > 0 || fail401.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('\nFatal error:', err);
  process.exit(1);
});

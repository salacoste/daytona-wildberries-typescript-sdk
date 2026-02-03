/**
 * Debug script: raw HTTP requests to nm-report endpoints
 * Tests the exact same URLs with raw fetch to see full response details
 */
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.WB_API_KEY;
if (!API_KEY) {
  console.error('WB_API_KEY not found in .env');
  process.exit(1);
}

const BASE = 'https://seller-analytics-api.wildberries.ru';

const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

interface TestCase {
  name: string;
  method: 'GET' | 'POST';
  url: string;
  body?: unknown;
}

const tests: TestCase[] = [
  // 1. GET that works — baseline
  {
    name: 'getNmReportDownloads (GET — works)',
    method: 'GET',
    url: `${BASE}/api/v2/nm-report/downloads`,
  },
  // 2. POST that fails — detail
  {
    name: 'createNmReportDetail (POST — 404)',
    method: 'POST',
    url: `${BASE}/api/v2/nm-report/detail`,
    body: {
      period: { begin: daysAgo(7), end: daysAgo(0) },
      page: 1,
    },
  },
  // 3. POST search-report that works — for comparison
  {
    name: 'createSearchReportReport (POST — works)',
    method: 'POST',
    url: `${BASE}/api/v2/search-report/report`,
    body: {
      currentPeriod: { start: daysAgo(7), end: daysAgo(0) },
      positionCluster: 'all',
      orderBy: { field: 'openCard', mode: 'desc' },
      limit: 1,
      offset: 0,
    },
  },
  // 4. Try detail with minimal body
  {
    name: 'createNmReportDetail — empty body {}',
    method: 'POST',
    url: `${BASE}/api/v2/nm-report/detail`,
    body: {},
  },
  // 5. Try detail with full params from WB docs
  {
    name: 'createNmReportDetail — full params (WB docs format)',
    method: 'POST',
    url: `${BASE}/api/v2/nm-report/detail`,
    body: {
      brandNames: [],
      objectIDs: [],
      tagIDs: [],
      nmIDs: [],
      timezone: 'Europe/Moscow',
      period: {
        begin: daysAgo(7),
        end: daysAgo(0),
      },
      orderBy: {
        field: 'openCard',
        mode: 'asc',
      },
      page: 1,
    },
  },
  // 6. Try grouped (not grouped/history)
  {
    name: 'createNmReportGrouped — /nm-report/grouped',
    method: 'POST',
    url: `${BASE}/api/v2/nm-report/grouped`,
    body: {
      objectIDs: [],
      brandNames: [],
      tagIDs: [],
      timezone: 'Europe/Moscow',
      period: {
        begin: daysAgo(7),
        end: daysAgo(0),
      },
      orderBy: {
        field: 'openCard',
        mode: 'asc',
      },
      page: 1,
    },
  },
  // 7. Try detail/history
  {
    name: 'createDetailHistory — /nm-report/detail/history',
    method: 'POST',
    url: `${BASE}/api/v2/nm-report/detail/history`,
    body: {
      nmIDs: [1],
      period: {
        begin: daysAgo(5),
        end: daysAgo(0),
      },
      timezone: 'Europe/Moscow',
      aggregationLevel: 'day',
    },
  },
  // 8. Try with different content-type
  {
    name: 'createNmReportDetail — no Content-Type header',
    method: 'POST',
    url: `${BASE}/api/v2/nm-report/detail`,
    body: {
      period: { begin: daysAgo(7), end: daysAgo(0) },
      page: 1,
    },
  },
];

async function runTest(test: TestCase, index: number): Promise<void> {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  TEST ${index + 1}: ${test.name}`);
  console.log(`  ${test.method} ${test.url}`);
  console.log(`${'═'.repeat(70)}`);

  const headers: Record<string, string> = {
    Authorization: API_KEY!,
  };

  // For test 8, skip Content-Type to see if it matters
  if (index !== 7) {
    headers['Content-Type'] = 'application/json';
  }

  const options: RequestInit = {
    method: test.method,
    headers,
  };

  if (test.body) {
    options.body = JSON.stringify(test.body);
    console.log(`\n  REQUEST BODY:`);
    console.log(`  ${JSON.stringify(test.body, null, 2).split('\n').join('\n  ')}`);
  }

  console.log(`\n  REQUEST HEADERS:`);
  for (const [k, v] of Object.entries(headers)) {
    if (k === 'Authorization') {
      console.log(`  ${k}: ${v.substring(0, 20)}...${v.substring(v.length - 10)}`);
    } else {
      console.log(`  ${k}: ${v}`);
    }
  }

  try {
    const response = await fetch(test.url, options);

    console.log(`\n  RESPONSE STATUS: ${response.status} ${response.statusText}`);
    console.log(`  RESPONSE HEADERS:`);
    response.headers.forEach((value, key) => {
      console.log(`    ${key}: ${value}`);
    });

    const text = await response.text();
    console.log(`\n  RESPONSE BODY (${text.length} chars):`);
    try {
      const json = JSON.parse(text);
      console.log(`  ${JSON.stringify(json, null, 2).split('\n').join('\n  ')}`);
    } catch {
      console.log(`  ${text.substring(0, 500)}`);
    }
  } catch (error) {
    console.log(`\n  NETWORK ERROR: ${error}`);
  }
}

async function main(): Promise<void> {
  console.log('══════════════════════════════════════════════════════════════════════');
  console.log('  DEBUG: nm-report 404 Investigation');
  console.log(`  Date: ${new Date().toISOString()}`);
  console.log(
    `  Token: ${API_KEY!.substring(0, 20)}...${API_KEY!.substring(API_KEY!.length - 10)}`
  );
  console.log('══════════════════════════════════════════════════════════════════════');

  for (let i = 0; i < tests.length; i++) {
    await runTest(tests[i], i);
    // Wait 21s between requests to respect rate limits
    if (i < tests.length - 1) {
      console.log(`\n  ⏳ Waiting 21s (rate limit)...`);
      await new Promise((r) => setTimeout(r, 21000));
    }
  }

  console.log(`\n${'═'.repeat(70)}`);
  console.log('  DONE');
  console.log(`${'═'.repeat(70)}`);
}

main().catch(console.error);

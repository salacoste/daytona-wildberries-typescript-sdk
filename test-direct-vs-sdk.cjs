/**
 * Direct API vs SDK Comparison Test
 * Tests all GET methods from YAML documentation
 * Compares direct API responses with SDK responses
 */

require('dotenv').config();
const { WildberriesSDK } = require('./dist/cjs/index.cjs');

const API_KEY = process.env.WB_API_KEY;
const sdk = new WildberriesSDK({ apiKey: API_KEY });

const results = {
  passed: [],
  failed: [],
  skipped: []
};

// Helper: Direct API call
async function directApiCall(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Authorization': API_KEY,
      'Content-Type': 'application/json'
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const text = await response.text();

  try {
    return { status: response.status, data: JSON.parse(text) };
  } catch {
    return { status: response.status, data: text };
  }
}

// Helper: Compare responses
function compareResponses(directData, sdkData) {
  const directJson = JSON.stringify(directData, null, 2);
  const sdkJson = JSON.stringify(sdkData, null, 2);

  if (directJson === sdkJson) {
    return { match: true, diff: null };
  }

  // Check for structural similarity (keys match)
  if (typeof directData === 'object' && typeof sdkData === 'object') {
    const directKeys = Object.keys(directData || {}).sort();
    const sdkKeys = Object.keys(sdkData || {}).sort();

    if (JSON.stringify(directKeys) === JSON.stringify(sdkKeys)) {
      return { match: true, diff: 'Values differ but structure matches' };
    }

    const missingInSdk = directKeys.filter(k => !sdkKeys.includes(k));
    const extraInSdk = sdkKeys.filter(k => !directKeys.includes(k));

    return {
      match: false,
      diff: {
        missingInSdk,
        extraInSdk,
        directKeys,
        sdkKeys
      }
    };
  }

  return { match: false, diff: 'Type mismatch' };
}

// Test runner
async function test(name, directUrl, sdkCall, options = {}) {
  console.log(`\n📋 Testing: ${name}`);
  console.log(`   Direct: ${directUrl}`);

  try {
    // Direct API call
    const direct = await directApiCall(
      directUrl,
      options.method || 'GET',
      options.body || null
    );

    if (direct.status !== 200) {
      console.log(`   ⚠️  Direct API returned ${direct.status}: ${JSON.stringify(direct.data).substring(0, 100)}`);
      results.skipped.push({ name, reason: `Direct API ${direct.status}`, data: direct.data });
      return;
    }

    console.log(`   ✓ Direct API: ${direct.status} OK`);

    // SDK call
    let sdkData;
    try {
      sdkData = await sdkCall();
    } catch (sdkError) {
      console.log(`   ❌ SDK Error: ${sdkError.message}`);
      results.failed.push({
        name,
        reason: 'SDK Error',
        error: sdkError.message,
        directResponse: direct.data
      });
      return;
    }

    // Compare
    const comparison = compareResponses(direct.data, sdkData);

    if (comparison.match) {
      console.log(`   ✅ PASS: Responses match`);
      results.passed.push({ name, comparison });
    } else {
      console.log(`   ❌ FAIL: Responses differ`);
      console.log(`   Diff: ${JSON.stringify(comparison.diff, null, 2)}`);
      results.failed.push({ name, comparison, direct: direct.data, sdk: sdkData });
    }

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    results.failed.push({ name, error: error.message });
  }
}

// ==========================================
// MODULE 1: GENERAL (01-general.yaml)
// ==========================================
async function testGeneral() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: GENERAL (01-general.yaml)');
  console.log('='.repeat(60));

  // 1. GET /ping
  await test(
    'general.ping',
    'https://common-api.wildberries.ru/ping',
    () => sdk.general.ping()
  );

  // 2. GET /api/communications/v2/news
  await test(
    'general.news',
    'https://common-api.wildberries.ru/api/communications/v2/news?from=2025-01-01',
    () => sdk.general.news({ from: '2025-01-01' })
  );

  // 3. GET /api/v1/seller-info
  await test(
    'general.sellerInfo',
    'https://common-api.wildberries.ru/api/v1/seller-info',
    () => sdk.general.sellerInfo()
  );
}

// ==========================================
// MODULE 2: PRODUCTS (02-products.yaml)
// ==========================================
async function testProducts() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: PRODUCTS (02-products.yaml)');
  console.log('='.repeat(60));

  // 1. GET /content/v2/object/parent/all - Parent categories
  await test(
    'products.getParentAll',
    'https://content-api.wildberries.ru/content/v2/object/parent/all',
    () => sdk.products.getParentAll()
  );

  // 2. GET /content/v2/object/all - All subjects
  await test(
    'products.getObjectAll',
    'https://content-api.wildberries.ru/content/v2/object/all?limit=10',
    () => sdk.products.getObjectAll({ limit: 10 })
  );

  // 3. GET /content/v2/object/charcs/{subjectId}
  await test(
    'products.getObjectCharc',
    'https://content-api.wildberries.ru/content/v2/object/charcs/105',
    () => sdk.products.getObjectCharc(105)
  );

  // 4. GET /content/v2/directory/colors
  await test(
    'products.getDirectoryColors',
    'https://content-api.wildberries.ru/content/v2/directory/colors',
    () => sdk.products.getDirectoryColors()
  );

  // 5. GET /content/v2/directory/kinds
  await test(
    'products.getDirectoryKinds',
    'https://content-api.wildberries.ru/content/v2/directory/kinds',
    () => sdk.products.getDirectoryKinds()
  );

  // 6. GET /content/v2/directory/countries
  await test(
    'products.getDirectoryCountries',
    'https://content-api.wildberries.ru/content/v2/directory/countries',
    () => sdk.products.getDirectoryCountries()
  );

  // 7. GET /content/v2/directory/seasons
  await test(
    'products.getDirectorySeasons',
    'https://content-api.wildberries.ru/content/v2/directory/seasons',
    () => sdk.products.getDirectorySeasons()
  );

  // 8. GET /content/v2/directory/vat
  await test(
    'products.getDirectoryVat',
    'https://content-api.wildberries.ru/content/v2/directory/vat',
    () => sdk.products.getDirectoryVat()
  );

  // 9. GET /content/v2/directory/tnved
  await test(
    'products.getDirectoryTnved',
    'https://content-api.wildberries.ru/content/v2/directory/tnved?subjectID=105',
    () => sdk.products.getDirectoryTnved({ subjectID: 105 })
  );

  // 10. GET /content/v2/tags
  await test(
    'products.getContentTags',
    'https://content-api.wildberries.ru/content/v2/tags',
    () => sdk.products.getContentTags()
  );

  // 11. GET /content/v2/cards/limits
  await test(
    'products.getCardsLimits',
    'https://content-api.wildberries.ru/content/v2/cards/limits',
    () => sdk.products.getCardsLimits()
  );

  // 12. GET /api/v3/offices
  await test(
    'products.getWBOffices',
    'https://supplies-api.wildberries.ru/api/v3/offices',
    () => sdk.products.getWBOffices()
  );

  // 13. GET /api/v3/warehouses
  await test(
    'products.getWarehouses',
    'https://supplies-api.wildberries.ru/api/v3/warehouses',
    () => sdk.products.getWarehouses()
  );
}

// ==========================================
// MODULE 3: ORDERS FBS (03-orders-fbs.yaml)
// ==========================================
async function testOrdersFBS() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: ORDERS FBS (03-orders-fbs.yaml)');
  console.log('='.repeat(60));

  // 1. GET /api/v3/orders/new
  await test(
    'ordersFBS.getNewOrders',
    'https://marketplace-api.wildberries.ru/api/v3/orders/new',
    () => sdk.ordersFBS.getNewOrders()
  );

  // 2. GET /api/v3/orders
  const weekAgo = Math.floor(Date.now() / 1000) - 86400 * 7;
  await test(
    'ordersFBS.getOrders',
    `https://marketplace-api.wildberries.ru/api/v3/orders?dateFrom=${weekAgo}&limit=10`,
    () => sdk.ordersFBS.getOrders({ dateFrom: weekAgo, limit: 10 })
  );

  // 3. GET /api/v3/supplies
  await test(
    'ordersFBS.getSupplies',
    'https://marketplace-api.wildberries.ru/api/v3/supplies?limit=10',
    () => sdk.ordersFBS.getSupplies({ limit: 10 })
  );

  // 4. GET /api/v3/passes/offices
  await test(
    'ordersFBS.getPassOffices',
    'https://marketplace-api.wildberries.ru/api/v3/passes/offices',
    () => sdk.ordersFBS.getPassOffices()
  );
}

// ==========================================
// MODULE 4: ORDERS FBW (07-orders-fbw.yaml)
// ==========================================
async function testOrdersFBW() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: ORDERS FBW (07-orders-fbw.yaml)');
  console.log('='.repeat(60));

  // 1. GET /api/v1/warehouses
  await test(
    'ordersFBW.getWarehouses',
    'https://supplies-api.wildberries.ru/api/v1/warehouses',
    () => sdk.ordersFBW.getWarehouses()
  );

  // 2. GET /api/v1/acceptance/coefficients
  await test(
    'ordersFBW.getAcceptanceCoefficients',
    'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
    () => sdk.ordersFBW.getAcceptanceCoefficients()
  );

  // 3. GET /api/v1/supplies
  await test(
    'ordersFBW.getSupplies',
    'https://supplies-api.wildberries.ru/api/v1/supplies?limit=10',
    () => sdk.ordersFBW.getSupplies({ limit: 10 })
  );
}

// ==========================================
// MODULE 5: IN-STORE PICKUP (06-in-store-pickup.yaml)
// ==========================================
async function testInStorePickup() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: IN-STORE PICKUP (06-in-store-pickup.yaml)');
  console.log('='.repeat(60));

  // 1. GET /api/v3/click-collect/orders/new
  await test(
    'inStorePickup.getNewOrders',
    'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/new',
    () => sdk.inStorePickup.getNewOrders()
  );
}

// ==========================================
// MODULE 6: PROMOTION (08-promotion.yaml)
// ==========================================
async function testPromotion() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: PROMOTION (08-promotion.yaml)');
  console.log('='.repeat(60));

  // 1. GET /adv/v1/promotion/count
  await test(
    'promotion.getPromotionCount',
    'https://advert-api.wildberries.ru/adv/v1/promotion/count',
    () => sdk.promotion.getPromotionCount()
  );

  // 2. GET /adv/v1/balance
  await test(
    'promotion.getBalance',
    'https://advert-api.wildberries.ru/adv/v1/balance',
    () => sdk.promotion.getBalance()
  );

  // 3. GET /adv/v1/payments
  await test(
    'promotion.getPayments',
    'https://advert-api.wildberries.ru/adv/v1/payments',
    () => sdk.promotion.getPayments()
  );
}

// ==========================================
// MODULE 7: COMMUNICATIONS (09-communications.yaml)
// ==========================================
async function testCommunications() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: COMMUNICATIONS (09-communications.yaml)');
  console.log('='.repeat(60));

  // 1. GET /api/v1/seller/chats
  await test(
    'communications.getChats',
    'https://seller-chat-api.wildberries.ru/api/v1/seller/chats',
    () => sdk.communications.getChats()
  );

  // 2. GET /api/v1/questions - Questions list
  await test(
    'communications.getQuestions',
    'https://feedbacks-api.wildberries.ru/api/v1/questions?isAnswered=false&take=10&skip=0',
    () => sdk.communications.getQuestions({ isAnswered: false, take: 10, skip: 0 })
  );
}

// ==========================================
// MODULE 8: TARIFFS (10-tariffs.yaml)
// ==========================================
async function testTariffs() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: TARIFFS (10-tariffs.yaml)');
  console.log('='.repeat(60));

  const today = new Date().toISOString().split('T')[0];

  // 1. GET /api/v1/tariffs/box
  await test(
    'tariffs.getTariffsBox',
    `https://common-api.wildberries.ru/api/v1/tariffs/box?date=${today}`,
    () => sdk.tariffs.getTariffsBox(today)
  );

  // 2. GET /api/v1/tariffs/pallet
  await test(
    'tariffs.getTariffsPallet',
    `https://common-api.wildberries.ru/api/v1/tariffs/pallet?date=${today}`,
    () => sdk.tariffs.getTariffsPallet(today)
  );

  // 3. GET /api/v1/tariffs/return
  await test(
    'tariffs.getTariffsReturn',
    `https://common-api.wildberries.ru/api/v1/tariffs/return?date=${today}`,
    () => sdk.tariffs.getTariffsReturn(today)
  );
}

// ==========================================
// MODULE 9: REPORTS (12-reports.yaml)
// ==========================================
async function testReports() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: REPORTS (12-reports.yaml)');
  console.log('='.repeat(60));

  // 1. GET /api/v1/supplier/incomes
  await test(
    'reports.getIncomes',
    'https://statistics-api.wildberries.ru/api/v1/supplier/incomes?dateFrom=2024-01-01',
    () => sdk.reports.getIncomes('2024-01-01')
  );

  // 2. GET /api/v1/supplier/stocks
  await test(
    'reports.getStocks',
    'https://statistics-api.wildberries.ru/api/v1/supplier/stocks?dateFrom=2024-01-01',
    () => sdk.reports.getStocks('2024-01-01')
  );

  // 3. GET /api/v1/supplier/orders
  await test(
    'reports.getReportOrders',
    'https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=2024-01-01',
    () => sdk.reports.getReportOrders('2024-01-01')
  );

  // 4. GET /api/v1/supplier/sales
  await test(
    'reports.getSales',
    'https://statistics-api.wildberries.ru/api/v1/supplier/sales?dateFrom=2024-01-01',
    () => sdk.reports.getSales('2024-01-01')
  );
}

// ==========================================
// MODULE 10: FINANCES (13-finances.yaml)
// ==========================================
async function testFinances() {
  console.log('\n' + '='.repeat(60));
  console.log('MODULE: FINANCES (13-finances.yaml)');
  console.log('='.repeat(60));

  // 1. GET /api/v1/balance
  await test(
    'finances.getBalance',
    'https://seller-wallet-api.wildberries.ru/api/v1/balance',
    () => sdk.finances.getBalance()
  );

  // 2. GET /api/v1/document-categories
  await test(
    'finances.getDocumentCategories',
    'https://documents-api.wildberries.ru/api/v1/document-categories',
    () => sdk.finances.getDocumentCategories()
  );

  // 3. GET /api/v1/documents
  await test(
    'finances.getDocuments',
    'https://documents-api.wildberries.ru/api/v1/documents',
    () => sdk.finances.getDocuments()
  );
}

// ==========================================
// MAIN: Run all tests
// ==========================================
async function runAllTests() {
  console.log('='.repeat(60));
  console.log('DIRECT API vs SDK COMPARISON TEST');
  console.log('Testing all GET methods from YAML documentation');
  console.log('='.repeat(60));
  console.log(`API Key: ${API_KEY.substring(0, 20)}...`);
  console.log(`Time: ${new Date().toISOString()}`);

  await testGeneral();
  await testProducts();
  await testOrdersFBS();
  await testOrdersFBW();
  await testInStorePickup();
  await testPromotion();
  await testCommunications();
  await testTariffs();
  await testReports();
  await testFinances();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ PASSED: ${results.passed.length}`);
  console.log(`❌ FAILED: ${results.failed.length}`);
  console.log(`⏭  SKIPPED: ${results.skipped.length}`);

  if (results.failed.length > 0) {
    console.log('\n=== FAILED TESTS ===');
    results.failed.forEach(f => {
      console.log(`\n${f.name}:`);
      if (f.error) console.log(`  Error: ${f.error}`);
      if (f.reason) console.log(`  Reason: ${f.reason}`);
      if (f.comparison?.diff) console.log(`  Diff: ${JSON.stringify(f.comparison.diff)}`);
    });
  }

  if (results.skipped.length > 0) {
    console.log('\n=== SKIPPED TESTS ===');
    results.skipped.forEach(s => {
      console.log(`${s.name}: ${s.reason}`);
    });
  }

  // Return exit code
  return results.failed.length > 0 ? 1 : 0;
}

runAllTests()
  .then(code => process.exit(code))
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });

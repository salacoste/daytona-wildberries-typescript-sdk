/**
 * Full SDK Audit Script
 * Tests ALL methods in ALL modules
 */

require('dotenv').config();
const { WildberriesSDK } = require('./dist/cjs/index.cjs');

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY });

const results = {
  ok: [],
  fail: [],
  skip: []
};

async function test(moduleName, methodName, fn, skipReason = null) {
  const key = `${moduleName}.${methodName}`;
  if (skipReason) {
    results.skip.push({ key, reason: skipReason });
    console.log(`  ⏭ ${methodName} - SKIP: ${skipReason}`);
    return;
  }
  try {
    const r = await fn();
    results.ok.push({ key, response: typeof r === 'object' ? 'object' : r });
    console.log(`  ✅ ${methodName} - OK`);
  } catch (e) {
    results.fail.push({ key, error: e.message });
    console.log(`  ❌ ${methodName} - FAIL: ${e.message}`);
  }
}

async function testGeneral() {
  console.log('\n=== GENERAL ===');
  await test('general', 'ping', () => sdk.general.ping());
  await test('general', 'news', () => sdk.general.news({ from: '2025-01-01' }));
  await test('general', 'sellerInfo', () => sdk.general.sellerInfo());
}

async function testProducts() {
  console.log('\n=== PRODUCTS ===');
  await test('products', 'getParentAll', () => sdk.products.getParentAll());
  await test('products', 'getObjectAll', () => sdk.products.getObjectAll({ limit: 5 }));
  await test('products', 'getObjectCharc', () => sdk.products.getObjectCharc(105));
  await test('products', 'getDirectoryColors', () => sdk.products.getDirectoryColors());
  await test('products', 'getDirectoryKinds', () => sdk.products.getDirectoryKinds());
  await test('products', 'getDirectoryCountries', () => sdk.products.getDirectoryCountries());
  await test('products', 'getDirectorySeasons', () => sdk.products.getDirectorySeasons());
  await test('products', 'getDirectoryVat', () => sdk.products.getDirectoryVat());
  await test('products', 'getDirectoryTnved', () => sdk.products.getDirectoryTnved({ subjectID: 105 }));
  await test('products', 'getContentTags', () => sdk.products.getContentTags());
  await test('products', 'createCardsList', () => sdk.products.createCardsList({ settings: { cursor: { limit: 5 }, filter: { withPhoto: -1 } } }));
  await test('products', 'getCardsLimits', () => sdk.products.getCardsLimits());
  await test('products', 'getWBOffices', () => sdk.products.getWBOffices());
  await test('products', 'getWarehouses', () => sdk.products.getWarehouses());
  await test('products', 'listProducts', () => sdk.products.listProducts({ limit: 5 }));
  await test('products', 'getTags', () => sdk.products.getTags());
  // Skip destructive/auth-required
  await test('products', 'createContentTag', null, 'requires special permissions');
  await test('products', 'createCardsUpload', null, 'creates real data');
  await test('products', 'createContentBarcodes', null, 'requires special permissions');
}

async function testOrdersFBS() {
  console.log('\n=== ORDERS FBS ===');
  await test('ordersFBS', 'getNewOrders', () => sdk.ordersFBS.getNewOrders());
  await test('ordersFBS', 'getOrders', () => sdk.ordersFBS.getOrders({ dateFrom: Math.floor(Date.now()/1000) - 86400*7 }));
  await test('ordersFBS', 'getSupplies', () => sdk.ordersFBS.getSupplies());
  await test('ordersFBS', 'getPassOffices', () => sdk.ordersFBS.getPassOffices());
}

async function testOrdersFBW() {
  console.log('\n=== ORDERS FBW ===');
  await test('ordersFBW', 'getWarehouses', () => sdk.ordersFBW.getWarehouses());
  await test('ordersFBW', 'getAcceptanceCoefficients', () => sdk.ordersFBW.getAcceptanceCoefficients());
  await test('ordersFBW', 'getSupplies', () => sdk.ordersFBW.getSupplies({ limit: 5 }));
}

async function testInStorePickup() {
  console.log('\n=== IN-STORE PICKUP ===');
  await test('inStorePickup', 'getNewOrders', () => sdk.inStorePickup.getNewOrders());
}

async function testPromotion() {
  console.log('\n=== PROMOTION ===');
  await test('promotion', 'getPromotionCount', () => sdk.promotion.getPromotionCount());
  await test('promotion', 'getBalance', () => sdk.promotion.getBalance());
  await test('promotion', 'getPayments', () => sdk.promotion.getPayments());
}

async function testCommunications() {
  console.log('\n=== COMMUNICATIONS ===');
  await test('communications', 'getChats', () => sdk.communications.getChats());
  await test('communications', 'getUnansweredQuestions', () => sdk.communications.getUnansweredQuestions());
}

async function testTariffs() {
  console.log('\n=== TARIFFS ===');
  const today = new Date().toISOString().split('T')[0];
  await test('tariffs', 'getTariffsBox', () => sdk.tariffs.getTariffsBox(today));
  await test('tariffs', 'getTariffsPallet', () => sdk.tariffs.getTariffsPallet(today));
  await test('tariffs', 'getTariffsReturn', () => sdk.tariffs.getTariffsReturn(today));
}

async function testAnalytics() {
  console.log('\n=== ANALYTICS ===');
  const weekAgo = new Date(Date.now() - 7*24*60*60*1000);
  const today = new Date();
  await test('analytics', 'getSalesFunnel', () => sdk.analytics.getSalesFunnel({
    period: { begin: weekAgo.toISOString().split('T')[0], end: today.toISOString().split('T')[0] },
    page: 1
  }));
}

async function testReports() {
  console.log('\n=== REPORTS ===');
  await test('reports', 'getIncomes', () => sdk.reports.getIncomes('2024-01-01'));
  await test('reports', 'getStocks', () => sdk.reports.getStocks('2024-01-01'));
}

async function testFinances() {
  console.log('\n=== FINANCES ===');
  await test('finances', 'getBalance', () => sdk.finances.getBalance());
  await test('finances', 'getDocumentCategories', () => sdk.finances.getDocumentCategories());
  await test('finances', 'getDocuments', () => sdk.finances.getDocuments());
}

async function runAll() {
  console.log('='.repeat(60));
  console.log('FULL SDK AUDIT - Testing ALL methods');
  console.log('='.repeat(60));

  await testGeneral();
  await testProducts();
  await testOrdersFBS();
  await testOrdersFBW();
  await testInStorePickup();
  await testPromotion();
  await testCommunications();
  await testTariffs();
  await testAnalytics();
  await testReports();
  await testFinances();

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ OK: ${results.ok.length}`);
  console.log(`❌ FAIL: ${results.fail.length}`);
  console.log(`⏭ SKIP: ${results.skip.length}`);

  if (results.fail.length > 0) {
    console.log('\n=== FAILURES ===');
    results.fail.forEach(f => console.log(`${f.key}: ${f.error}`));
  }
}

runAll().catch(console.error);

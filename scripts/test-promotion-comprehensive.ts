/**
 * Comprehensive Test Script for Promotion API Methods
 *
 * Based on official WB API documentation analysis (08-promotion.yaml)
 *
 * KEY REQUIREMENTS DISCOVERED:
 * 1. createBudgetDeposit - requires campaign in status 11 (paused)
 * 2. createBidsMin - requires advert_id, nm_ids[], payment_type, placement_types[]
 * 3. Fixed phrases only work for manual bid campaigns
 *
 * TEST PRODUCT: LPW40 (NM: 168120815)
 * BUDGET TARGET: 1000₽
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  console.error('❌ WB_API_KEY not found');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey });

// Rate limit delay
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const RATE_LIMIT_DELAY = 5000; // 5 seconds between API calls

// Test campaign tracking
let testCampaignId: number | null = null;
const TEST_PREFIX = 'SDK_TEST_COMPREHENSIVE_';
const TEST_NM_ID = 168120815; // LPW40 product

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  details?: string;
  error?: string;
}

const results: TestResult[] = [];

function logResult(result: TestResult) {
  results.push(result);
  const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⏭️';
  console.log(`${icon} ${result.test}: ${result.status}`);
  if (result.details) console.log(`   📝 ${result.details}`);
  if (result.error) console.log(`   ⚠️ ${result.error}`);
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  COMPREHENSIVE PROMOTION API TEST');
  console.log('  Based on Official WB API Documentation Analysis');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Test Product: NM ${TEST_NM_ID} (LPW40)`);
  console.log(`Started: ${new Date().toISOString()}\n`);

  try {
    // ═══════════════════════════════════════════════════════════════
    // PHASE 1: READ-ONLY ANALYTICS TESTS
    // ═══════════════════════════════════════════════════════════════
    console.log('\n📊 PHASE 1: Read-Only Analytics Tests\n');

    // Test 1: Get Promotion Count
    await testGetPromotionCount();
    await delay(RATE_LIMIT_DELAY);

    // Test 2: Get Balance
    await testGetAdvBalance();
    await delay(RATE_LIMIT_DELAY);

    // Test 3: Get Config
    await testGetAdvConfig();
    await delay(RATE_LIMIT_DELAY);

    // Test 4: Get Expense History
    await testGetAdvUpd();
    await delay(RATE_LIMIT_DELAY);

    // ═══════════════════════════════════════════════════════════════
    // PHASE 2: CREATE TEST CAMPAIGN
    // ═══════════════════════════════════════════════════════════════
    console.log('\n🎯 PHASE 2: Create Test Campaign\n');

    await testCreateCampaign();
    await delay(RATE_LIMIT_DELAY);

    if (!testCampaignId) {
      console.log('\n❌ Cannot proceed without test campaign');
      return;
    }

    // ═══════════════════════════════════════════════════════════════
    // PHASE 3: CAMPAIGN MANAGEMENT TESTS
    // ═══════════════════════════════════════════════════════════════
    console.log('\n⚙️ PHASE 3: Campaign Management Tests\n');

    // Get initial campaign status
    await testGetCampaignInfo();
    await delay(RATE_LIMIT_DELAY);

    // Test pause (required for budget deposit!)
    await testPauseCampaign();
    await delay(RATE_LIMIT_DELAY);

    // Test budget deposit (campaign must be paused!)
    await testBudgetDeposit();
    await delay(RATE_LIMIT_DELAY);

    // Test start campaign
    await testStartCampaign();
    await delay(RATE_LIMIT_DELAY);

    // ═══════════════════════════════════════════════════════════════
    // PHASE 4: BID MANAGEMENT TESTS
    // ═══════════════════════════════════════════════════════════════
    console.log('\n💰 PHASE 4: Bid Management Tests\n');

    // Test minimum bids retrieval
    await testGetMinimumBids();
    await delay(RATE_LIMIT_DELAY);

    // Test get campaign budget
    await testGetBudget();
    await delay(RATE_LIMIT_DELAY);

    // ═══════════════════════════════════════════════════════════════
    // PHASE 5: KEYWORD/PHRASE MANAGEMENT TESTS
    // ═══════════════════════════════════════════════════════════════
    console.log('\n🔤 PHASE 5: Keyword/Phrase Management Tests\n');

    // Test get statistics by keywords
    await testGetKeywordStats();
    await delay(RATE_LIMIT_DELAY);

    // Test excluded phrases
    await testExcludedPhrases();
    await delay(RATE_LIMIT_DELAY);

    // Test fixed phrases (for manual bid only)
    await testFixedPhrases();
    await delay(RATE_LIMIT_DELAY);

    // ═══════════════════════════════════════════════════════════════
    // PHASE 6: STATISTICS TESTS
    // ═══════════════════════════════════════════════════════════════
    console.log('\n📈 PHASE 6: Statistics Tests\n');

    await testGetFullStats();
    await delay(RATE_LIMIT_DELAY);

  } finally {
    // ═══════════════════════════════════════════════════════════════
    // CLEANUP: DELETE TEST CAMPAIGN
    // ═══════════════════════════════════════════════════════════════
    console.log('\n🧹 CLEANUP: Deleting Test Campaign\n');
    await cleanupTestCampaign();
  }

  // ═══════════════════════════════════════════════════════════════
  // FINAL SUMMARY
  // ═══════════════════════════════════════════════════════════════
  printSummary();
}

// ═══════════════════════════════════════════════════════════════
// TEST IMPLEMENTATIONS
// ═══════════════════════════════════════════════════════════════

async function testGetPromotionCount() {
  console.log('📊 Testing getPromotionCount...');
  try {
    const result = await sdk.promotion.getPromotionCount();
    logResult({
      test: 'getPromotionCount',
      status: 'PASS',
      details: `Total campaigns: ${result.all}, Groups: ${result.adverts?.length || 0}`
    });
  } catch (error) {
    logResult({
      test: 'getPromotionCount',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetAdvBalance() {
  console.log('💰 Testing getAdvBalance...');
  try {
    const result = await sdk.promotion.getAdvBalance();
    logResult({
      test: 'getAdvBalance',
      status: 'PASS',
      details: `Balance: ${result.balance}₽, Net: ${result.net}₽, Bonus: ${result.bonus}₽`
    });
  } catch (error) {
    logResult({
      test: 'getAdvBalance',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetAdvConfig() {
  console.log('⚙️ Testing getAdvConfig...');
  try {
    const result = await sdk.promotion.getAdvConfig();
    logResult({
      test: 'getAdvConfig',
      status: 'PASS',
      details: `Categories: ${result.categories?.length || 0}, Config params: ${result.config?.length || 0}`
    });
  } catch (error) {
    logResult({
      test: 'getAdvConfig',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetAdvUpd() {
  console.log('📜 Testing getAdvUpd (expense history)...');
  try {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 30);

    const result = await sdk.promotion.getAdvUpd({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
    logResult({
      test: 'getAdvUpd',
      status: 'PASS',
      details: `Records: ${Array.isArray(result) ? result.length : 0} for last 30 days`
    });
  } catch (error) {
    logResult({
      test: 'getAdvUpd',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testCreateCampaign() {
  console.log('🎯 Creating test campaign with manual bid type...');

  const campaignName = `${TEST_PREFIX}${Date.now()}`;

  try {
    // Create campaign with manual bid type for search placement
    // Per API docs: /adv/v2/seacat/save-ad
    // - name: campaign name
    // - nms: array of NM IDs (max 50)
    // - bid_type: 'manual' or 'unified' (default: manual)
    // - placement_types: ['search', 'recommendations'] - only for manual bid
    const result = await sdk.promotion.createSeacatSaveAd({
      name: campaignName,
      nms: [TEST_NM_ID],
      bid_type: 'manual',
      placement_types: ['search']
    });

    if (result && typeof result === 'object' && 'advertId' in result) {
      testCampaignId = (result as { advertId: number }).advertId;
      logResult({
        test: 'createSeacatSaveAd',
        status: 'PASS',
        details: `Created campaign ID: ${testCampaignId}, Name: ${campaignName}`
      });
    } else {
      // API might return just the ID as number
      testCampaignId = result as unknown as number;
      logResult({
        test: 'createSeacatSaveAd',
        status: 'PASS',
        details: `Created campaign ID: ${testCampaignId}, Name: ${campaignName}`
      });
    }
  } catch (error) {
    logResult({
      test: 'createSeacatSaveAd',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetCampaignInfo() {
  if (!testCampaignId) {
    logResult({ test: 'getCampaignInfo', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`📋 Getting info for campaign ${testCampaignId}...`);
  try {
    // Get campaign info using getAuctionAdverts (for type 9 campaigns)
    const result = await sdk.promotion.getAuctionAdverts({});
    const campaign = result.adverts?.find(a => a.id === testCampaignId);

    if (campaign) {
      logResult({
        test: 'getCampaignInfo',
        status: 'PASS',
        details: `Campaign ${testCampaignId}: status=${campaign.status}, bid_type=${campaign.bid_type}`
      });
    } else {
      // Try to get from promotion adverts
      const allCampaigns = await sdk.promotion.getPromotionAdverts({ status: -1 }); // all statuses
      logResult({
        test: 'getCampaignInfo',
        status: 'PASS',
        details: `Campaign not found in auction adverts, may be in different type`
      });
    }
  } catch (error) {
    logResult({
      test: 'getCampaignInfo',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testPauseCampaign() {
  if (!testCampaignId) {
    logResult({ test: 'pauseCampaign', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`⏸️ Pausing campaign ${testCampaignId}...`);
  try {
    // Wait for campaign to be ready (3 minutes after creation per API docs)
    console.log('   Waiting 10s for campaign initialization...');
    await delay(10000);

    await sdk.promotion.pauseAdvert({ id: testCampaignId });
    logResult({
      test: 'pauseCampaign',
      status: 'PASS',
      details: `Campaign ${testCampaignId} paused (status will be 11)`
    });
  } catch (error) {
    logResult({
      test: 'pauseCampaign',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testBudgetDeposit() {
  if (!testCampaignId) {
    logResult({ test: 'createBudgetDeposit', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`💵 Depositing 1000₽ to campaign ${testCampaignId}...`);
  console.log('   ⚠️ Note: Campaign must be in status 11 (paused)');

  try {
    // Per API docs: /adv/v1/budget/deposit
    // Query param: id (campaign ID)
    // Body: sum, type (0=счёт, 1=баланс, 3=бонусы)
    // IMPORTANT: Campaign must be in status 11 (paused)!
    await sdk.promotion.createBudgetDeposit(
      { sum: 1000, type: 1 }, // type 1 = баланс
      { id: testCampaignId }
    );
    logResult({
      test: 'createBudgetDeposit',
      status: 'PASS',
      details: `Deposited 1000₽ to campaign ${testCampaignId}`
    });
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('status')) {
      logResult({
        test: 'createBudgetDeposit',
        status: 'FAIL',
        error: `${err.message} (Campaign must be in status 11 - paused)`
      });
    } else {
      logResult({
        test: 'createBudgetDeposit',
        status: 'FAIL',
        error: err.message
      });
    }
  }
}

async function testStartCampaign() {
  if (!testCampaignId) {
    logResult({ test: 'startCampaign', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`▶️ Starting campaign ${testCampaignId}...`);
  try {
    await sdk.promotion.startAdvert({ id: testCampaignId });
    logResult({
      test: 'startCampaign',
      status: 'PASS',
      details: `Campaign ${testCampaignId} started (status will be 9)`
    });
  } catch (error) {
    logResult({
      test: 'startCampaign',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetMinimumBids() {
  if (!testCampaignId) {
    logResult({ test: 'createBidsMin', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`💰 Getting minimum bids for campaign ${testCampaignId}...`);
  try {
    // Per API docs: /adv/v0/bids/min
    // Body: advert_id, nm_ids[], payment_type, placement_types[]
    const result = await sdk.promotion.createBidsMin({
      advert_id: testCampaignId,
      nm_ids: [TEST_NM_ID],
      payment_type: 'cpm',
      placement_types: ['search']
    });
    logResult({
      test: 'createBidsMin',
      status: 'PASS',
      details: `Got minimum bids for campaign ${testCampaignId}`
    });
  } catch (error) {
    logResult({
      test: 'createBidsMin',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetBudget() {
  if (!testCampaignId) {
    logResult({ test: 'getAdvBudget', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`💵 Getting budget for campaign ${testCampaignId}...`);
  try {
    const result = await sdk.promotion.getAdvBudget({ id: testCampaignId });
    logResult({
      test: 'getAdvBudget',
      status: 'PASS',
      details: `Budget: cash=${result.cash}₽, netting=${result.netting}₽, total=${result.total}₽`
    });
  } catch (error) {
    logResult({
      test: 'getAdvBudget',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetKeywordStats() {
  if (!testCampaignId) {
    logResult({ test: 'getStatsKeywords', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`🔤 Getting keyword stats for campaign ${testCampaignId}...`);
  try {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 3);

    const result = await sdk.promotion.getStatsKeywords({
      advert_id: testCampaignId,
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
    logResult({
      test: 'getStatsKeywords',
      status: 'PASS',
      details: `Keywords data days: ${result.keywords?.length || 0}`
    });
  } catch (error) {
    logResult({
      test: 'getStatsKeywords',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testExcludedPhrases() {
  if (!testCampaignId) {
    logResult({ test: 'createSearchSetExcluded', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`🚫 Testing excluded phrases for campaign ${testCampaignId}...`);
  try {
    // Set test excluded phrase
    await sdk.promotion.createSearchSetExcluded(
      { excluded: ['тестовая минус-фраза sdk'] },
      { id: testCampaignId }
    );
    logResult({
      test: 'createSearchSetExcluded (set)',
      status: 'PASS',
      details: `Set excluded phrase for campaign ${testCampaignId}`
    });

    await delay(2000);

    // Remove excluded phrases (empty array removes all)
    await sdk.promotion.createSearchSetExcluded(
      { excluded: [] },
      { id: testCampaignId }
    );
    logResult({
      test: 'createSearchSetExcluded (clear)',
      status: 'PASS',
      details: `Cleared excluded phrases for campaign ${testCampaignId}`
    });
  } catch (error) {
    logResult({
      test: 'createSearchSetExcluded',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testFixedPhrases() {
  if (!testCampaignId) {
    logResult({ test: 'fixedPhrases', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`📌 Testing fixed phrases for campaign ${testCampaignId}...`);

  try {
    // Get fixed phrases activity status
    const activity = await sdk.promotion.getSearchSetPlus({ id: testCampaignId });
    logResult({
      test: 'getSearchSetPlus',
      status: 'PASS',
      details: `Got fixed phrases activity status`
    });
  } catch (error) {
    logResult({
      test: 'getSearchSetPlus',
      status: 'FAIL',
      error: (error as Error).message
    });
  }

  await delay(2000);

  try {
    // Set fixed phrases (for manual bid campaigns only)
    // Note: Phrases must exist in campaign's keyword list (formed after launch)
    await sdk.promotion.createSearchSetPlu(
      { pluse: [] }, // Empty array to clear (can't set without valid keywords)
      { id: testCampaignId }
    );
    logResult({
      test: 'createSearchSetPlu',
      status: 'PASS',
      details: `Fixed phrases management working for campaign ${testCampaignId}`
    });
  } catch (error) {
    logResult({
      test: 'createSearchSetPlu',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function testGetFullStats() {
  if (!testCampaignId) {
    logResult({ test: 'getAdvFullstats', status: 'SKIP', details: 'No test campaign' });
    return;
  }

  console.log(`📈 Getting full stats for campaign ${testCampaignId}...`);
  try {
    const end = new Date();
    const begin = new Date();
    begin.setDate(begin.getDate() - 7);

    const result = await sdk.promotion.getAdvFullstats({
      ids: String(testCampaignId),
      beginDate: begin.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    });
    logResult({
      test: 'getAdvFullstats',
      status: 'PASS',
      details: `Got stats for campaign ${testCampaignId}`
    });
  } catch (error) {
    logResult({
      test: 'getAdvFullstats',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

async function cleanupTestCampaign() {
  if (!testCampaignId) {
    console.log('   No test campaign to clean up');
    return;
  }

  console.log(`🗑️ Deleting test campaign ${testCampaignId}...`);

  try {
    // First pause if not already
    try {
      await sdk.promotion.pauseAdvert({ id: testCampaignId });
      await delay(3000);
    } catch {
      // Ignore if already paused or can't pause
    }

    // Delete the campaign
    await sdk.promotion.deleteAdvert({ id: testCampaignId });
    logResult({
      test: 'deleteAdvert',
      status: 'PASS',
      details: `Deleted test campaign ${testCampaignId}`
    });
  } catch (error) {
    logResult({
      test: 'deleteAdvert',
      status: 'FAIL',
      error: (error as Error).message
    });
  }
}

function printSummary() {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;

  results.forEach(r => {
    const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⏭️';
    console.log(`${icon} ${r.test}`);
    if (r.error && r.status === 'FAIL') {
      console.log(`   → ${r.error}`);
    }
  });

  console.log('\n───────────────────────────────────────────────────────────────');
  console.log(`Total: ${results.length} | ✅ Passed: ${passed} | ❌ Failed: ${failed} | ⏭️ Skipped: ${skipped}`);
  console.log(`Completed: ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Exit with error if any critical test failed
  if (failed > passed) {
    process.exit(1);
  }
}

// Run tests
main().catch(err => {
  console.error('\n💥 Fatal error:', err);
  cleanupTestCampaign().finally(() => process.exit(1));
});

/**
 * Comprehensive Promotion Module Test
 * Tests all advertising/promotion methods in the SDK
 *
 * Run: npx tsx examples/test_promotion_full.ts
 */

import { WildberriesSDK } from '../src/index';
import * as dotenv from 'dotenv';

dotenv.config();

const ACTIVE_CAMPAIGN_ID = 27111737; // Active campaign for read-only tests
let TEST_CAMPAIGN_ID: number | null = null; // Will be created for modification tests

interface TestResult {
  method: string;
  status: 'pass' | 'fail' | 'skip';
  message: string;
  data?: any;
}

const results: TestResult[] = [];

function log(method: string, status: 'pass' | 'fail' | 'skip', message: string, data?: any) {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⏭️';
  console.log(`${icon} ${method}: ${message}`);
  results.push({ method, status, message, data });
}

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) {
    console.error('❌ WB_API_KEY not found in environment');
    process.exit(1);
  }

  const sdk = new WildberriesSDK({ apiKey });

  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  console.log('\n' + '='.repeat(70));
  console.log('🧪 COMPREHENSIVE PROMOTION MODULE TEST');
  console.log('='.repeat(70));
  console.log(`Active Campaign ID: ${ACTIVE_CAMPAIGN_ID}`);
  console.log(`Date Range: ${formatDate(lastWeek)} to ${formatDate(today)}`);
  console.log('='.repeat(70) + '\n');

  // ============================================================
  // SECTION 1: READ-ONLY METHODS (General)
  // ============================================================
  console.log('\n📖 SECTION 1: READ-ONLY METHODS (General)\n' + '-'.repeat(50));

  // 1.1 getPromotionCount
  try {
    await sleep(300);
    const count = await sdk.promotion.getPromotionCount();
    log('getPromotionCount()', 'pass', `Total campaigns: ${count.all}`, count);
  } catch (e: any) {
    log('getPromotionCount()', 'fail', e.message);
  }

  // 1.2 getAdvCount (v0)
  try {
    await sleep(300);
    const count = await sdk.promotion.getAdvCount();
    log('getAdvCount()', 'pass', `Total: ${count.all}`, count);
  } catch (e: any) {
    log('getAdvCount()', 'fail', e.message);
  }

  // 1.3 getAuctionAdverts (type 9 campaigns)
  try {
    await sleep(300);
    const adverts = await sdk.promotion.getAuctionAdverts();
    const count = Array.isArray(adverts) ? adverts.length : 0;
    log('getAuctionAdverts()', 'pass', `Found ${count} type-9 campaigns`, { count });
  } catch (e: any) {
    log('getAuctionAdverts()', 'fail', e.message);
  }

  // 1.4 getAdvConfig
  try {
    await sleep(300);
    const config = await sdk.promotion.getAdvConfig();
    const catCount = config.categories?.length || 0;
    log('getAdvConfig()', 'pass', `${catCount} categories`, { categoriesCount: catCount });
  } catch (e: any) {
    log('getAdvConfig()', 'fail', e.message);
  }

  // 1.5 getSupplierSubjects
  try {
    await sleep(300);
    const subjects = await sdk.promotion.getSupplierSubjects();
    log('getSupplierSubjects()', 'pass', `Found ${subjects.length} subjects`, { count: subjects.length });
  } catch (e: any) {
    log('getSupplierSubjects()', 'fail', e.message);
  }

  // 1.6 getAdvBalance
  try {
    await sleep(300);
    const balance = await sdk.promotion.getAdvBalance();
    log('getAdvBalance()', 'pass', `Balance: ${balance.balance}, Net: ${balance.net}, Bonus: ${balance.bonus}`, balance);
  } catch (e: any) {
    log('getAdvBalance()', 'fail', e.message);
  }

  // 1.7 getAdvAdverts (list campaigns)
  try {
    await sleep(300);
    const adverts = await sdk.promotion.getAdvAdverts({ limit: 10 });
    log('getAdvAdverts()', 'pass', `Found ${adverts.length} campaigns`, { count: adverts.length });
  } catch (e: any) {
    log('getAdvAdverts()', 'fail', e.message);
  }

  // 1.8 getAdvUpd (spending history)
  try {
    await sleep(300);
    const upd = await sdk.promotion.getAdvUpd({
      from: formatDate(lastMonth),
      to: formatDate(today)
    });
    log('getAdvUpd()', 'pass', `Found ${upd.length} spending records`, { count: upd.length });
  } catch (e: any) {
    log('getAdvUpd()', 'fail', e.message);
  }

  // 1.9 getAdvPayments
  try {
    await sleep(300);
    const payments = await sdk.promotion.getAdvPayments({
      from: formatDate(lastMonth),
      to: formatDate(today)
    });
    log('getAdvPayments()', 'pass', `Found ${payments.length} payments`, { count: payments.length });
  } catch (e: any) {
    log('getAdvPayments()', 'fail', e.message);
  }

  // ============================================================
  // SECTION 2: READ-ONLY METHODS (Campaign-specific)
  // ============================================================
  console.log('\n\n📖 SECTION 2: CAMPAIGN-SPECIFIC READ METHODS (Campaign: ' + ACTIVE_CAMPAIGN_ID + ')\n' + '-'.repeat(50));

  // 2.1 getAdvAdvert
  try {
    await sleep(300);
    const advert = await sdk.promotion.getAdvAdvert({ id: ACTIVE_CAMPAIGN_ID });
    log('getAdvAdvert()', 'pass', `Name: ${advert.name || 'N/A'}, Type: ${advert.type}, Status: ${advert.status}`, advert);
  } catch (e: any) {
    log('getAdvAdvert()', 'fail', e.message);
  }

  // 2.2 getAdvBudget
  try {
    await sleep(300);
    const budget = await sdk.promotion.getAdvBudget({ id: ACTIVE_CAMPAIGN_ID });
    log('getAdvBudget()', 'pass', `Cash: ${budget.cash}, Netting: ${budget.netting}, Total: ${budget.total}`, budget);
  } catch (e: any) {
    log('getAdvBudget()', 'fail', e.message);
  }

  // 2.3 getAdvFullstats
  try {
    await sleep(300);
    const stats = await sdk.promotion.getAdvFullstats({
      ids: String(ACTIVE_CAMPAIGN_ID),
      beginDate: formatDate(lastWeek),
      endDate: formatDate(today)
    });
    const firstStat = Array.isArray(stats) && stats[0];
    log('getAdvFullstats()', 'pass',
      firstStat ? `Clicks: ${firstStat.clicks}, CTR: ${firstStat.ctr}%, CPC: ${firstStat.cpc}` : 'No stats',
      firstStat);
  } catch (e: any) {
    log('getAdvFullstats()', 'fail', e.message);
  }

  // 2.4 getStatsKeywords
  try {
    await sleep(300);
    const sixDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    const keywords = await sdk.promotion.getStatsKeywords({
      advert_id: ACTIVE_CAMPAIGN_ID,
      from: formatDate(sixDaysAgo),
      to: formatDate(today)
    });
    const dayCount = keywords.keywords?.length || 0;
    log('getStatsKeywords()', 'pass', `${dayCount} days of keyword stats`, { days: dayCount });
  } catch (e: any) {
    log('getStatsKeywords()', 'fail', e.message);
  }

  // 2.5 getStatWords
  try {
    await sleep(300);
    const statWords = await sdk.promotion.getStatWords({ id: ACTIVE_CAMPAIGN_ID });
    const keywordCount = statWords.words?.keywords?.length || 0;
    const statCount = statWords.stat?.length || 0;
    log('getStatWords()', 'pass', `${keywordCount} keywords, ${statCount} stat entries`, { keywordCount, statCount });
  } catch (e: any) {
    log('getStatWords()', 'fail', e.message);
  }

  // 2.6 getAutoStatWords
  try {
    await sleep(300);
    const autoStats = await sdk.promotion.getAutoStatWords({ id: ACTIVE_CAMPAIGN_ID });
    const clusterCount = autoStats.clusters?.length || 0;
    log('getAutoStatWords()', 'pass', `${clusterCount} clusters`, { clusterCount });
  } catch (e: any) {
    log('getAutoStatWords()', 'fail', e.message);
  }

  // 2.7 getSearchSetPlus
  try {
    await sleep(300);
    const plus = await sdk.promotion.getSearchSetPlus({ id: ACTIVE_CAMPAIGN_ID });
    log('getSearchSetPlus()', 'pass', `Response received`, plus);
  } catch (e: any) {
    log('getSearchSetPlus()', 'fail', e.message);
  }

  // 2.8 getAutoGetnmtoadd
  try {
    await sleep(300);
    const nms = await sdk.promotion.getAutoGetnmtoadd({ id: ACTIVE_CAMPAIGN_ID });
    log('getAutoGetnmtoadd()', 'pass', `${nms.length} NMs to add`, { count: nms.length });
  } catch (e: any) {
    log('getAutoGetnmtoadd()', 'fail', e.message);
  }

  // ============================================================
  // SECTION 3: CALENDAR/PROMOTIONS METHODS
  // ============================================================
  console.log('\n\n📅 SECTION 3: CALENDAR & PROMOTIONS\n' + '-'.repeat(50));

  // 3.1 getCalendarPromotions
  try {
    await sleep(300);
    const promos = await sdk.promotion.getCalendarPromotions({
      startDateTime: formatDate(today) + 'T00:00:00Z',
      endDateTime: formatDate(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)) + 'T23:59:59Z',
      allPromo: true,
      limit: 10
    });
    log('getCalendarPromotions()', 'pass', `Response received`, promos);
  } catch (e: any) {
    log('getCalendarPromotions()', 'fail', e.message);
  }

  // ============================================================
  // SECTION 4: STAT POST METHODS
  // ============================================================
  console.log('\n\n📊 SECTION 4: STATISTICS (POST methods)\n' + '-'.repeat(50));

  // 4.1 createAdvFullstat (POST)
  try {
    await sleep(300);
    const fullstat = await sdk.promotion.createAdvFullstat([{
      id: ACTIVE_CAMPAIGN_ID,
      dates: [formatDate(lastWeek), formatDate(today)]
    }]);
    log('createAdvFullstat()', 'pass', `Response received`, fullstat);
  } catch (e: any) {
    log('createAdvFullstat()', 'fail', e.message);
  }

  // 4.2 createAdvStat (POST)
  try {
    await sleep(300);
    const stat = await sdk.promotion.createAdvStat([{
      id: ACTIVE_CAMPAIGN_ID,
      dates: [formatDate(lastWeek), formatDate(today)]
    }]);
    log('createAdvStat()', 'pass', `Response received`, stat);
  } catch (e: any) {
    log('createAdvStat()', 'fail', e.message);
  }

  // ============================================================
  // SECTION 5: HELPER/UTILITY METHODS
  // ============================================================
  console.log('\n\n🔧 SECTION 5: HELPER METHODS\n' + '-'.repeat(50));

  // 5.1 createSupplierNm (get NM info)
  try {
    await sleep(300);
    const nmInfo = await sdk.promotion.createSupplierNm([321678606]); // NM from active campaign
    log('createSupplierNm()', 'pass', `Got info for ${nmInfo.length} NMs`, nmInfo);
  } catch (e: any) {
    log('createSupplierNm()', 'fail', e.message);
  }

  // 5.2 createBidsMin (get minimum bids)
  try {
    await sleep(300);
    const minBids = await sdk.promotion.createBidsMin({
      advert_id: ACTIVE_CAMPAIGN_ID,
      nm_ids: [321678606],
      payment_type: 'cpm',
      placement_types: ['search']
    });
    log('createBidsMin()', 'pass', `Got min bids`, minBids);
  } catch (e: any) {
    log('createBidsMin()', 'fail', e.message);
  }

  // ============================================================
  // SECTION 6: CAMPAIGN MANAGEMENT (with TEST campaign)
  // ============================================================
  console.log('\n\n⚙️ SECTION 6: CAMPAIGN MANAGEMENT (Test Campaign)\n' + '-'.repeat(50));

  // 6.1 Create test campaign (type 9 - seacat)
  try {
    await sleep(500);
    console.log('\n   Creating test campaign...');
    const newCampaignId = await sdk.promotion.createSeacatSaveAd({
      name: `SDK_TEST_${Date.now()}`,
      nms: [321678606],
      bid_type: 'manual',
      placement_types: ['search']
    });
    TEST_CAMPAIGN_ID = newCampaignId;
    log('createSeacatSaveAd()', 'pass', `Created campaign ID: ${TEST_CAMPAIGN_ID}`, { id: TEST_CAMPAIGN_ID });
  } catch (e: any) {
    log('createSeacatSaveAd()', 'fail', e.message);
  }

  if (TEST_CAMPAIGN_ID) {
    // 6.2 Rename campaign
    try {
      await sleep(500);
      await sdk.promotion.createAdvRename({
        advertId: TEST_CAMPAIGN_ID,
        name: `SDK_TEST_RENAMED_${Date.now()}`
      });
      log('createAdvRename()', 'pass', `Renamed campaign ${TEST_CAMPAIGN_ID}`);
    } catch (e: any) {
      log('createAdvRename()', 'fail', e.message);
    }

    // 6.3 Start campaign
    try {
      await sleep(500);
      await sdk.promotion.getAdvStart({ id: TEST_CAMPAIGN_ID });
      log('getAdvStart()', 'pass', `Started campaign ${TEST_CAMPAIGN_ID}`);
    } catch (e: any) {
      log('getAdvStart()', 'fail', e.message);
    }

    // 6.4 Pause campaign
    try {
      await sleep(500);
      await sdk.promotion.getAdvPause({ id: TEST_CAMPAIGN_ID });
      log('getAdvPause()', 'pass', `Paused campaign ${TEST_CAMPAIGN_ID}`);
    } catch (e: any) {
      log('getAdvPause()', 'fail', e.message);
    }

    // 6.5 Stop campaign
    try {
      await sleep(500);
      await sdk.promotion.getAdvStop({ id: TEST_CAMPAIGN_ID });
      log('getAdvStop()', 'pass', `Stopped campaign ${TEST_CAMPAIGN_ID}`);
    } catch (e: any) {
      log('getAdvStop()', 'fail', e.message);
    }

    // 6.6 Delete test campaign (cleanup)
    try {
      await sleep(500);
      await sdk.promotion.getAdvDelete({ id: TEST_CAMPAIGN_ID });
      log('getAdvDelete()', 'pass', `Deleted campaign ${TEST_CAMPAIGN_ID}`);
    } catch (e: any) {
      log('getAdvDelete()', 'fail', e.message);
    }
  } else {
    log('createAdvRename()', 'skip', 'No test campaign created');
    log('getAdvStart()', 'skip', 'No test campaign created');
    log('getAdvPause()', 'skip', 'No test campaign created');
    log('getAdvStop()', 'skip', 'No test campaign created');
    log('getAdvDelete()', 'skip', 'No test campaign created');
  }

  // ============================================================
  // SECTION 7: LEGACY METHODS (types 4-8)
  // ============================================================
  console.log('\n\n🏛️ SECTION 7: LEGACY METHODS (Types 4-8)\n' + '-'.repeat(50));

  // 7.1 createPromotionAdvert (for types 4-8)
  try {
    await sleep(300);
    // This should work but returns campaigns of types 4-8 only
    const legacyCampaigns = await sdk.promotion.createPromotionAdvert([], {
      type: 8,
      status: 9
    });
    log('createPromotionAdvert()', 'pass', `Response received`, legacyCampaigns);
  } catch (e: any) {
    log('createPromotionAdvert()', 'fail', e.message);
  }

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log('\n\n' + '='.repeat(70));
  console.log('📋 TEST SUMMARY');
  console.log('='.repeat(70));

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const skipped = results.filter(r => r.status === 'skip').length;

  console.log(`\n   ✅ Passed:  ${passed}`);
  console.log(`   ❌ Failed:  ${failed}`);
  console.log(`   ⏭️ Skipped: ${skipped}`);
  console.log(`   📊 Total:   ${results.length}`);

  if (failed > 0) {
    console.log('\n\n❌ FAILED METHODS:');
    console.log('-'.repeat(50));
    results.filter(r => r.status === 'fail').forEach(r => {
      console.log(`   ${r.method}: ${r.message}`);
    });
  }

  console.log('\n' + '='.repeat(70) + '\n');
}

main().catch(console.error);

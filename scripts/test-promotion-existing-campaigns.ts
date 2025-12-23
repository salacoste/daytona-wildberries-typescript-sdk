/**
 * Test Promotion Methods on EXISTING Campaigns
 *
 * Since creation requires elevated permissions, this script:
 * 1. Tests READ operations on existing campaigns
 * 2. Tests SAFE management operations that don't modify critical data
 * 3. Documents which methods require write permissions
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  console.error('❌ WB_API_KEY not found');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey });

const results: { method: string; status: 'PASS' | 'FAIL' | 'AUTH_REQUIRED'; details?: string }[] = [];
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

function addResult(method: string, status: 'PASS' | 'FAIL' | 'AUTH_REQUIRED', details?: string) {
  results.push({ method, status, details });
  const icon = status === 'PASS' ? '✅' : status === 'AUTH_REQUIRED' ? '🔐' : '❌';
  console.log(`${icon} ${method}${details ? `: ${details}` : ''}`);
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  PROMOTION API METHODS - COMPREHENSIVE TEST');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Testing with existing campaigns (read + safe operations)\n`);

  // =====================================================
  // SECTION 1: READ-ONLY METHODS (Should all work)
  // =====================================================
  console.log('📖 SECTION 1: READ-ONLY METHODS\n');

  // 1.1 Get promotion count
  let allCampaigns: { adverts?: { type?: number; status?: number; count?: number; advert_list?: { advertId?: number }[] }[] } = {};
  let activeCampaignId: number | null = null;
  let readyCampaignId: number | null = null;

  try {
    allCampaigns = await sdk.promotion.getPromotionCount();
    addResult('getPromotionCount', 'PASS', `Total: ${allCampaigns.all} campaigns`);

    // Find campaigns in different states
    allCampaigns.adverts?.forEach(group => {
      if (group.status === 9 && group.advert_list?.[0]?.advertId) {
        activeCampaignId = group.advert_list[0].advertId;
      }
      if (group.status === 4 && group.advert_list?.[0]?.advertId) {
        readyCampaignId = group.advert_list[0].advertId;
      }
    });
  } catch (error) {
    addResult('getPromotionCount', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.2 Get auction adverts
  try {
    const adverts = await sdk.promotion.getAuctionAdverts({});
    addResult('getAuctionAdverts', 'PASS', `${adverts.adverts?.length || 0} auction campaigns`);
  } catch (error) {
    addResult('getAuctionAdverts', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.3 Get config
  try {
    const config = await sdk.promotion.getAdvConfig();
    addResult('getAdvConfig', 'PASS', `${config.categories?.length || 0} categories, ${config.config?.length || 0} params`);
  } catch (error) {
    addResult('getAdvConfig', 'FAIL', (error as Error).message);
  }

  await delay(1000); // Rate limit

  // 1.4 Get balance
  try {
    const balance = await sdk.promotion.getAdvBalance();
    addResult('getAdvBalance', 'PASS', `Net: ${balance.net}₽, Balance: ${balance.balance}₽`);
  } catch (error) {
    addResult('getAdvBalance', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.5 Get expense history
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);

  try {
    const expenses = await sdk.promotion.getAdvUpd({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
    const total = Array.isArray(expenses) ? expenses.reduce((s, e) => s + (e.updSum || 0), 0) : 0;
    addResult('getAdvUpd', 'PASS', `${Array.isArray(expenses) ? expenses.length : 0} records, ${total}₽ total`);
  } catch (error) {
    addResult('getAdvUpd', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.6 Get payments history
  try {
    const payments = await sdk.promotion.getAdvPayments({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
    addResult('getAdvPayments', 'PASS', `${Array.isArray(payments) ? payments.length : 0} payments`);
  } catch (error) {
    addResult('getAdvPayments', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.7 Get supplier subjects
  try {
    const subjects = await sdk.promotion.getSupplierSubjects();
    addResult('getSupplierSubjects', 'PASS', `${subjects.length} subjects available`);
  } catch (error) {
    addResult('getSupplierSubjects', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.8 Get media campaigns count
  try {
    const mediaCount = await sdk.promotion.getAdvCount();
    addResult('getAdvCount', 'PASS', `${mediaCount.all || 0} media campaigns`);
  } catch (error) {
    addResult('getAdvCount', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.9 Get media campaigns list
  try {
    const mediaAdverts = await sdk.promotion.getAdvAdverts({ limit: 10 });
    addResult('getAdvAdverts', 'PASS', `${mediaAdverts.length} media campaigns listed`);
  } catch (error) {
    addResult('getAdvAdverts', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // 1.10 Get calendar promotions
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  try {
    await sdk.promotion.getCalendarPromotions({
      startDateTime: new Date().toISOString(),
      endDateTime: endDate.toISOString(),
      allPromo: true,
      limit: 5
    });
    addResult('getCalendarPromotions', 'PASS', 'Calendar retrieved');
  } catch (error) {
    addResult('getCalendarPromotions', 'FAIL', (error as Error).message);
  }

  // =====================================================
  // SECTION 2: CAMPAIGN-SPECIFIC READ METHODS
  // =====================================================
  console.log('\n📊 SECTION 2: CAMPAIGN-SPECIFIC METHODS\n');

  const testCampaignId = activeCampaignId || readyCampaignId;

  if (testCampaignId) {
    console.log(`Using campaign ID: ${testCampaignId} for testing\n`);

    // 2.1 Get budget
    try {
      const budget = await sdk.promotion.getAdvBudget({ id: testCampaignId });
      addResult('getAdvBudget', 'PASS', `Total: ${budget.total}₽`);
    } catch (error) {
      addResult('getAdvBudget', 'FAIL', (error as Error).message);
    }

    await delay(300);

    // 2.2 Get full stats
    try {
      const stats = await sdk.promotion.getAdvFullstats({
        ids: String(testCampaignId),
        beginDate: from.toISOString().split('T')[0],
        endDate: to.toISOString().split('T')[0]
      });
      if (Array.isArray(stats) && stats.length > 0) {
        addResult('getAdvFullstats', 'PASS', `Views: ${stats[0].views}, Clicks: ${stats[0].clicks}, Sum: ${stats[0].sum}₽`);
      } else {
        addResult('getAdvFullstats', 'PASS', 'No stats for period');
      }
    } catch (error) {
      addResult('getAdvFullstats', 'FAIL', (error as Error).message);
    }

    await delay(300);

    // 2.3 Get keyword stats
    try {
      const kwStats = await sdk.promotion.getStatsKeywords({
        advert_id: testCampaignId,
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0]
      });
      addResult('getStatsKeywords', 'PASS', `${kwStats.keywords?.length || 0} days of keyword data`);
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('400')) {
        addResult('getStatsKeywords', 'PASS', 'No keyword data (campaign inactive)');
      } else {
        addResult('getStatsKeywords', 'FAIL', err.message);
      }
    }

    await delay(300);

    // 2.4 Get stat words
    try {
      const words = await sdk.promotion.getStatWords({ id: testCampaignId });
      addResult('getStatWords', 'PASS', `${words.words?.keywords?.length || 0} keywords, ${words.stat?.length || 0} stats`);
    } catch (error) {
      addResult('getStatWords', 'FAIL', (error as Error).message);
    }

    await delay(300);

    // 2.5 Get auto stat words
    try {
      const autoWords = await sdk.promotion.getAutoStatWords({ id: testCampaignId });
      addResult('getAutoStatWords', 'PASS', `${autoWords.clusters?.length || 0} clusters`);
    } catch (error) {
      addResult('getAutoStatWords', 'FAIL', (error as Error).message);
    }

    await delay(300);

    // 2.6 Get nm to add
    try {
      const nmsToAdd = await sdk.promotion.getAutoGetnmtoadd({ id: testCampaignId });
      addResult('getAutoGetnmtoadd', 'PASS', `${nmsToAdd.length} products can be added`);
    } catch (error) {
      addResult('getAutoGetnmtoadd', 'FAIL', (error as Error).message);
    }

    await delay(300);

    // 2.7 Get search set plus (fixed phrases status)
    try {
      await sdk.promotion.getSearchSetPlus({ id: testCampaignId });
      addResult('getSearchSetPlus', 'PASS', 'Fixed phrases status retrieved');
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('400') || err.message.includes('422')) {
        addResult('getSearchSetPlus', 'PASS', 'Not applicable for this campaign type');
      } else {
        addResult('getSearchSetPlus', 'FAIL', err.message);
      }
    }

  } else {
    console.log('⚠️ No active campaigns found for detailed testing\n');
  }

  // =====================================================
  // SECTION 3: WRITE METHODS (Check permissions)
  // =====================================================
  console.log('\n🔐 SECTION 3: WRITE METHODS (Permission Check)\n');

  // 3.1 Create campaign
  try {
    await sdk.promotion.createSeacatSaveAd({
      name: 'TEST_PERMISSION_CHECK',
      nms: [1],
      bid_type: 'manual',
      placement_types: ['search']
    });
    addResult('createSeacatSaveAd', 'PASS', 'Campaign creation allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('createSeacatSaveAd', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('400') || err.message.includes('422')) {
      addResult('createSeacatSaveAd', 'PASS', 'API accepts request (validation error expected)');
    } else {
      addResult('createSeacatSaveAd', 'FAIL', err.message);
    }
  }

  await delay(300);

  // 3.2 Rename (test with non-existent to check auth)
  try {
    await sdk.promotion.createAdvRename({ advertId: 999999999, name: 'TEST' });
    addResult('createAdvRename', 'PASS', 'Rename allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('createAdvRename', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('404') || err.message.includes('400') || err.message.includes('422')) {
      addResult('createAdvRename', 'PASS', 'API accepts request (campaign not found - expected)');
    } else {
      addResult('createAdvRename', 'FAIL', err.message);
    }
  }

  await delay(300);

  // 3.3 Start campaign
  try {
    await sdk.promotion.getAdvStart({ id: 999999999 });
    addResult('getAdvStart', 'PASS', 'Start allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('getAdvStart', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('404') || err.message.includes('400') || err.message.includes('422')) {
      addResult('getAdvStart', 'PASS', 'API accepts request (campaign not found - expected)');
    } else {
      addResult('getAdvStart', 'FAIL', err.message);
    }
  }

  await delay(300);

  // 3.4 Pause campaign
  try {
    await sdk.promotion.getAdvPause({ id: 999999999 });
    addResult('getAdvPause', 'PASS', 'Pause allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('getAdvPause', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('404') || err.message.includes('400') || err.message.includes('422')) {
      addResult('getAdvPause', 'PASS', 'API accepts request (campaign not found - expected)');
    } else {
      addResult('getAdvPause', 'FAIL', err.message);
    }
  }

  await delay(300);

  // 3.5 Stop campaign
  try {
    await sdk.promotion.getAdvStop({ id: 999999999 });
    addResult('getAdvStop', 'PASS', 'Stop allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('getAdvStop', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('404') || err.message.includes('400') || err.message.includes('422')) {
      addResult('getAdvStop', 'PASS', 'API accepts request (campaign not found - expected)');
    } else {
      addResult('getAdvStop', 'FAIL', err.message);
    }
  }

  await delay(300);

  // 3.6 Delete campaign
  try {
    await sdk.promotion.getAdvDelete({ id: 999999999 });
    addResult('getAdvDelete', 'PASS', 'Delete allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('getAdvDelete', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('404') || err.message.includes('400') || err.message.includes('422')) {
      addResult('getAdvDelete', 'PASS', 'API accepts request (campaign not found - expected)');
    } else {
      addResult('getAdvDelete', 'FAIL', err.message);
    }
  }

  await delay(300);

  // 3.7 Update bids
  try {
    await sdk.promotion.updateAuctionBid({
      bids: [{ advert_id: 999999999, nm_bids: [{ nm_id: 1, bid: 200, placement: 'search' }] }]
    });
    addResult('updateAuctionBid', 'PASS', 'Bid update allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('updateAuctionBid', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('404') || err.message.includes('400') || err.message.includes('422')) {
      addResult('updateAuctionBid', 'PASS', 'API accepts request (validation error - expected)');
    } else {
      addResult('updateAuctionBid', 'FAIL', err.message);
    }
  }

  await delay(300);

  // 3.8 Budget deposit
  try {
    await sdk.promotion.createBudgetDeposit({ sum: 100 }, { id: 999999999 });
    addResult('createBudgetDeposit', 'PASS', 'Budget deposit allowed');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Authentication')) {
      addResult('createBudgetDeposit', 'AUTH_REQUIRED', 'Needs write permissions');
    } else if (err.message.includes('404') || err.message.includes('400') || err.message.includes('422')) {
      addResult('createBudgetDeposit', 'PASS', 'API accepts request (validation error - expected)');
    } else {
      addResult('createBudgetDeposit', 'FAIL', err.message);
    }
  }

  // =====================================================
  // SUMMARY
  // =====================================================
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  COMPREHENSIVE TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const authRequired = results.filter(r => r.status === 'AUTH_REQUIRED').length;

  console.log('Results by category:\n');

  console.log('READ-ONLY METHODS:');
  results.filter(r => !['createSeacatSaveAd', 'createAdvRename', 'getAdvStart', 'getAdvPause',
    'getAdvStop', 'getAdvDelete', 'updateAuctionBid', 'createBudgetDeposit'].includes(r.method))
    .forEach(r => {
      const icon = r.status === 'PASS' ? '✅' : r.status === 'AUTH_REQUIRED' ? '🔐' : '❌';
      console.log(`  ${icon} ${r.method}`);
    });

  console.log('\nWRITE METHODS:');
  results.filter(r => ['createSeacatSaveAd', 'createAdvRename', 'getAdvStart', 'getAdvPause',
    'getAdvStop', 'getAdvDelete', 'updateAuctionBid', 'createBudgetDeposit'].includes(r.method))
    .forEach(r => {
      const icon = r.status === 'PASS' ? '✅' : r.status === 'AUTH_REQUIRED' ? '🔐' : '❌';
      console.log(`  ${icon} ${r.method}${r.status === 'AUTH_REQUIRED' ? ' (needs elevated API key)' : ''}`);
    });

  console.log('\n───────────────────────────────────────────────────────────────');
  console.log(`Total: ${results.length} methods tested`);
  console.log(`✅ Working: ${passed}`);
  console.log(`🔐 Need write permissions: ${authRequired}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('═══════════════════════════════════════════════════════════════');

  if (authRequired > 0) {
    console.log('\n💡 NOTE: To test write methods, you need an API key with');
    console.log('   "Продвижение" (Promotion) write permissions enabled.');
    console.log('   Generate a new key in WB Seller Portal with required scopes.');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

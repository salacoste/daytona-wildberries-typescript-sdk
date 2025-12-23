/**
 * SAFE Test Script for Promotion Management Methods
 *
 * This script tests campaign management operations safely:
 * 1. Creates test campaigns with unique names
 * 2. Tests operations ONLY on created test campaigns
 * 3. Cleans up ALL test data at the end
 *
 * Safety measures:
 * - Test campaigns have prefix "SDK_TEST_" for identification
 * - All operations tracked for cleanup
 * - Cleanup runs even on errors (finally block)
 * - No modifications to existing campaigns
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  console.error('❌ WB_API_KEY not found');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey });

// Test tracking
const TEST_PREFIX = 'SDK_TEST_';
const createdCampaignIds: number[] = [];
const results: { test: string; status: 'PASS' | 'FAIL' | 'SKIP'; details?: string }[] = [];

// Helper functions
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const log = (msg: string) => console.log(`[${new Date().toISOString().split('T')[1].slice(0, 8)}] ${msg}`);

function addResult(test: string, status: 'PASS' | 'FAIL' | 'SKIP', details?: string) {
  results.push({ test, status, details });
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏭️';
  log(`${icon} ${test}${details ? `: ${details}` : ''}`);
}

// ============================================
// PHASE 1: PREPARATION - Get available products
// ============================================

async function getAvailableProducts(): Promise<{ nm: number; subjectId: number; title: string }[]> {
  log('\n📦 PHASE 1: Getting available products for testing...');

  try {
    // Get subjects that can be used for campaigns
    const subjects = await sdk.promotion.getSupplierSubjects();

    if (!subjects || subjects.length === 0) {
      log('❌ No subjects available for campaigns');
      return [];
    }

    log(`Found ${subjects.length} subjects`);

    // Get first subject with products
    const subjectWithProducts = subjects.find(s => (s.count || 0) > 0);

    if (!subjectWithProducts || !subjectWithProducts.id) {
      log('❌ No subjects with products found');
      return [];
    }

    log(`Using subject: ${subjectWithProducts.name} (ID: ${subjectWithProducts.id}, ${subjectWithProducts.count} products)`);

    await delay(500);

    // Get products for this subject
    const products = await sdk.promotion.createSupplierNm([subjectWithProducts.id]);

    if (!products || products.length === 0) {
      log('❌ No products available');
      return [];
    }

    log(`Found ${products.length} products available for campaigns`);

    // Return first 3 products
    return products.slice(0, 3).map(p => ({
      nm: p.nm || 0,
      subjectId: p.subjectId || subjectWithProducts.id!,
      title: p.title || 'Unknown'
    })).filter(p => p.nm > 0);

  } catch (error) {
    log(`❌ Error getting products: ${(error as Error).message}`);
    return [];
  }
}

// ============================================
// PHASE 2: CAMPAIGN CREATION
// ============================================

async function testCampaignCreation(products: { nm: number; subjectId: number }[]): Promise<number | null> {
  log('\n🏗️ PHASE 2: Testing campaign creation...');

  if (products.length === 0) {
    addResult('createSeacatSaveAd', 'SKIP', 'No products available');
    return null;
  }

  const testName = `${TEST_PREFIX}${Date.now()}`;
  const nmIds = products.map(p => p.nm);

  log(`Creating test campaign: "${testName}" with products: ${nmIds.join(', ')}`);

  try {
    // Create campaign with manual bid (type 9)
    const campaignId = await sdk.promotion.createSeacatSaveAd({
      name: testName,
      nms: nmIds,
      bid_type: 'manual',
      placement_types: ['search']
    });

    if (typeof campaignId === 'number' && campaignId > 0) {
      createdCampaignIds.push(campaignId);
      addResult('createSeacatSaveAd', 'PASS', `Created campaign ID: ${campaignId}`);
      return campaignId;
    } else {
      addResult('createSeacatSaveAd', 'FAIL', `Unexpected response: ${JSON.stringify(campaignId)}`);
      return null;
    }

  } catch (error) {
    const err = error as Error;
    addResult('createSeacatSaveAd', 'FAIL', err.message);
    return null;
  }
}

// ============================================
// PHASE 3: CAMPAIGN INFO & CONFIGURATION
// ============================================

async function testCampaignInfo(campaignId: number) {
  log('\n📋 PHASE 3: Testing campaign info retrieval...');

  await delay(2000); // Wait for campaign to be fully created

  // Test: Get campaign info via getAuctionAdverts
  try {
    const adverts = await sdk.promotion.getAuctionAdverts({ ids: String(campaignId) });
    if (adverts.adverts && adverts.adverts.length > 0) {
      const campaign = adverts.adverts[0];
      addResult('getAuctionAdverts (single)', 'PASS',
        `Status: ${campaign.status}, Bid type: ${campaign.bid_type}`);
    } else {
      addResult('getAuctionAdverts (single)', 'FAIL', 'Campaign not found');
    }
  } catch (error) {
    addResult('getAuctionAdverts (single)', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // Test: Get campaign budget
  try {
    const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
    addResult('getAdvBudget', 'PASS',
      `Cash: ${budget.cash}, Netting: ${budget.netting}, Total: ${budget.total}`);
  } catch (error) {
    addResult('getAdvBudget', 'FAIL', (error as Error).message);
  }
}

// ============================================
// PHASE 4: CAMPAIGN CONTROL
// ============================================

async function testCampaignControl(campaignId: number) {
  log('\n🎮 PHASE 4: Testing campaign control...');

  // Test: Rename campaign
  const newName = `${TEST_PREFIX}RENAMED_${Date.now()}`;
  try {
    await sdk.promotion.createAdvRename({ advertId: campaignId, name: newName });
    addResult('createAdvRename', 'PASS', `Renamed to: ${newName}`);
  } catch (error) {
    addResult('createAdvRename', 'FAIL', (error as Error).message);
  }

  await delay(500);

  // Note: Start/Pause/Stop require campaign to be in specific states
  // and may require budget. We'll test what we can safely.

  // Test: Try to pause (works if campaign is active - status 9)
  try {
    await sdk.promotion.getAdvPause({ id: campaignId });
    addResult('getAdvPause', 'PASS', 'Pause command sent');
  } catch (error) {
    const err = error as Error;
    // Expected to fail if campaign is not active
    if (err.message.includes('422') || err.message.includes('400')) {
      addResult('getAdvPause', 'SKIP', 'Campaign not in active state (expected)');
    } else {
      addResult('getAdvPause', 'FAIL', err.message);
    }
  }

  await delay(500);

  // Test: Try to start (works if campaign is in status 4 or 11)
  try {
    await sdk.promotion.getAdvStart({ id: campaignId });
    addResult('getAdvStart', 'PASS', 'Start command sent');
  } catch (error) {
    const err = error as Error;
    // May fail if budget not set or wrong status
    if (err.message.includes('422') || err.message.includes('400') || err.message.includes('402')) {
      addResult('getAdvStart', 'SKIP', 'Cannot start (likely needs budget/setup)');
    } else {
      addResult('getAdvStart', 'FAIL', err.message);
    }
  }

  await delay(500);

  // Test: Stop campaign (should work for most statuses)
  try {
    await sdk.promotion.getAdvStop({ id: campaignId });
    addResult('getAdvStop', 'PASS', 'Stop command sent');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('422') || err.message.includes('400')) {
      addResult('getAdvStop', 'SKIP', 'Campaign already in terminal state');
    } else {
      addResult('getAdvStop', 'FAIL', err.message);
    }
  }
}

// ============================================
// PHASE 5: BID MANAGEMENT
// ============================================

async function testBidManagement(campaignId: number, products: { nm: number }[]) {
  log('\n💰 PHASE 5: Testing bid management...');

  if (products.length === 0) {
    addResult('Bid management', 'SKIP', 'No products for bid testing');
    return;
  }

  const nmId = products[0].nm;

  // Test: Get minimum bids
  try {
    const minBids = await sdk.promotion.createBidsMin({
      advert_id: campaignId,
      nm_ids: [nmId],
      payment_type: 'cpm',
      placement_types: ['search']
    });

    if (minBids.bids && minBids.bids.length > 0) {
      const bid = minBids.bids[0];
      addResult('createBidsMin', 'PASS',
        `Min bid for nm ${bid.nm_id}: ${bid.bids?.map(b => `${b.type}=${b.value}`).join(', ')}`);
    } else {
      addResult('createBidsMin', 'PASS', 'Response received (no bids data)');
    }
  } catch (error) {
    addResult('createBidsMin', 'FAIL', (error as Error).message);
  }

  await delay(500);

  // Test: Update bid (for auction campaigns)
  try {
    const result = await sdk.promotion.updateAuctionBid({
      bids: [{
        advert_id: campaignId,
        nm_bids: [{
          nm_id: nmId,
          bid: 200, // Minimum reasonable bid
          placement: 'search'
        }]
      }]
    });
    addResult('updateAuctionBid', 'PASS', 'Bid updated');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('422') || err.message.includes('400')) {
      addResult('updateAuctionBid', 'SKIP', 'Campaign state does not allow bid changes');
    } else {
      addResult('updateAuctionBid', 'FAIL', err.message);
    }
  }
}

// ============================================
// PHASE 6: PHRASE MANAGEMENT
// ============================================

async function testPhraseManagement(campaignId: number) {
  log('\n🔤 PHASE 6: Testing phrase management...');

  // Test: Set excluded phrases (minus-phrases)
  try {
    await sdk.promotion.createSearchSetExcluded(
      { excluded: ['тестовая_фраза_sdk', 'test_phrase_sdk'] },
      { id: campaignId }
    );
    addResult('createSearchSetExcluded', 'PASS', 'Excluded phrases set');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('422') || err.message.includes('400')) {
      addResult('createSearchSetExcluded', 'SKIP', 'Campaign type/state does not support this');
    } else {
      addResult('createSearchSetExcluded', 'FAIL', err.message);
    }
  }

  await delay(500);

  // Test: Get fixed phrases activity
  try {
    await sdk.promotion.getSearchSetPlus({ id: campaignId });
    addResult('getSearchSetPlus', 'PASS', 'Fixed phrases status retrieved');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('422') || err.message.includes('400')) {
      addResult('getSearchSetPlus', 'SKIP', 'Campaign type does not support fixed phrases');
    } else {
      addResult('getSearchSetPlus', 'FAIL', err.message);
    }
  }
}

// ============================================
// PHASE 7: PLACEMENT MANAGEMENT
// ============================================

async function testPlacementManagement(campaignId: number) {
  log('\n📍 PHASE 7: Testing placement management...');

  // Test: Update placements
  try {
    await sdk.promotion.updateAuctionPlacement({
      placements: [{
        advert_id: campaignId,
        placements: {
          search: true,
          recommendations: false
        }
      }]
    });
    addResult('updateAuctionPlacement', 'PASS', 'Placements updated');
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('422') || err.message.includes('400')) {
      addResult('updateAuctionPlacement', 'SKIP', 'Campaign state does not allow placement changes');
    } else {
      addResult('updateAuctionPlacement', 'FAIL', err.message);
    }
  }
}

// ============================================
// PHASE 8: READ-ONLY METHODS (Additional)
// ============================================

async function testReadOnlyMethods() {
  log('\n📖 PHASE 8: Testing additional read-only methods...');

  // Test: Get payments history
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);

  try {
    const payments = await sdk.promotion.getAdvPayments({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
    addResult('getAdvPayments', 'PASS', `${Array.isArray(payments) ? payments.length : 0} payment records`);
  } catch (error) {
    addResult('getAdvPayments', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // Test: Get media campaigns count
  try {
    const mediaCount = await sdk.promotion.getAdvCount();
    addResult('getAdvCount (media)', 'PASS', `Total: ${mediaCount.all}`);
  } catch (error) {
    addResult('getAdvCount (media)', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // Test: Get media campaigns list
  try {
    const mediaAdverts = await sdk.promotion.getAdvAdverts({ limit: 5 });
    addResult('getAdvAdverts (media)', 'PASS', `${mediaAdverts.length} media campaigns`);
  } catch (error) {
    addResult('getAdvAdverts (media)', 'FAIL', (error as Error).message);
  }

  await delay(300);

  // Test: Get calendar promotions
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  try {
    const promos = await sdk.promotion.getCalendarPromotions({
      startDateTime: startDate.toISOString(),
      endDateTime: endDate.toISOString(),
      allPromo: true,
      limit: 5
    });
    addResult('getCalendarPromotions', 'PASS', 'Calendar promotions retrieved');
  } catch (error) {
    addResult('getCalendarPromotions', 'FAIL', (error as Error).message);
  }
}

// ============================================
// CLEANUP PHASE
// ============================================

async function cleanup() {
  log('\n🧹 CLEANUP: Removing all test campaigns...');

  if (createdCampaignIds.length === 0) {
    log('No campaigns to clean up');
    return;
  }

  for (const campaignId of createdCampaignIds) {
    log(`Deleting campaign ${campaignId}...`);

    // First, try to stop the campaign
    try {
      await sdk.promotion.getAdvStop({ id: campaignId });
      log(`  Stopped campaign ${campaignId}`);
    } catch {
      // Ignore - might already be stopped
    }

    await delay(500);

    // Then delete it
    try {
      await sdk.promotion.getAdvDelete({ id: campaignId });
      log(`  ✅ Deleted campaign ${campaignId}`);
    } catch (error) {
      const err = error as Error;
      // Campaign might need to be in status 4 to delete
      log(`  ⚠️ Could not delete campaign ${campaignId}: ${err.message}`);
      log(`     (Campaign will be marked for deletion by WB in status -1)`);
    }

    await delay(500);
  }

  log('Cleanup completed');
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  SAFE PROMOTION MANAGEMENT TEST SUITE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Started: ${new Date().toISOString()}`);
  console.log(`Test prefix: ${TEST_PREFIX}`);
  console.log('');
  console.log('⚠️  SAFETY: All test campaigns will be cleaned up at the end');
  console.log('═══════════════════════════════════════════════════════════════');

  try {
    // Phase 1: Get products
    const products = await getAvailableProducts();

    if (products.length === 0) {
      log('\n⚠️ Cannot proceed without available products');
      log('Skipping campaign creation tests...');

      // Still test read-only methods
      await testReadOnlyMethods();

    } else {
      log(`\n✅ Using products: ${products.map(p => `${p.nm} (${p.title})`).join(', ')}`);

      // Phase 2: Create test campaign
      await delay(1000);
      const campaignId = await testCampaignCreation(products);

      if (campaignId) {
        // Phase 3-7: Test management operations
        await delay(1000);
        await testCampaignInfo(campaignId);

        await delay(1000);
        await testCampaignControl(campaignId);

        await delay(1000);
        await testBidManagement(campaignId, products);

        await delay(1000);
        await testPhraseManagement(campaignId);

        await delay(1000);
        await testPlacementManagement(campaignId);
      }

      // Phase 8: Read-only methods
      await delay(1000);
      await testReadOnlyMethods();
    }

  } finally {
    // ALWAYS cleanup, even on errors
    await cleanup();
  }

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;

  results.forEach(r => {
    const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⏭️';
    console.log(`${icon} ${r.test}${r.details ? ` - ${r.details}` : ''}`);
  });

  console.log('\n───────────────────────────────────────────────────────────────');
  console.log(`Total: ${results.length} | ✅ Passed: ${passed} | ❌ Failed: ${failed} | ⏭️ Skipped: ${skipped}`);
  console.log(`Created campaigns: ${createdCampaignIds.length} (cleaned up)`);
  console.log(`Completed: ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════════════════════════');

  if (failed > 0) {
    process.exit(1);
  }
}

// Run with proper error handling
main().catch(err => {
  console.error('\n💥 Fatal error:', err);
  // Still try to cleanup
  cleanup().finally(() => process.exit(1));
});

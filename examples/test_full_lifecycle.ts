/**
 * Test complete campaign lifecycle:
 * 1. Create campaign (status 4)
 * 2. Deposit budget 1000₽ (status 4 → ?)
 * 3. Start campaign (status 4/11 → 9)
 * 4. Pause campaign (9 → 11)
 * 5. Resume campaign (11 → 9)
 * 6. Stop campaign (9 → 7)
 */
import { WildberriesSDK } from '../src/index';
import * as dotenv from 'dotenv';
dotenv.config();

const ACTIVE_CAMPAIGN_ID = 27111737; // For getting NM ID
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

function log(msg: string) {
  console.log(`[${new Date().toISOString().split('T')[1].split('.')[0]}] ${msg}`);
}

async function main() {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) throw new Error('No API key');

  const sdk = new WildberriesSDK({ apiKey });
  let testCampaignId: number | null = null;

  console.log('='.repeat(60));
  console.log('🧪 FULL CAMPAIGN LIFECYCLE TEST');
  console.log('='.repeat(60) + '\n');

  try {
    // Get NM ID from active campaign
    log('Getting NM ID from active campaign...');
    const active = await sdk.promotion.getAuctionAdverts({ ids: String(ACTIVE_CAMPAIGN_ID) });
    const activeCampaign = active.adverts?.find((a: any) => a.id === ACTIVE_CAMPAIGN_ID);
    const nmId = activeCampaign?.nm_settings?.[0]?.nm_id;

    if (!nmId) {
      throw new Error('No NM ID found');
    }
    log(`Using NM ID: ${nmId}`);

    // 1. CREATE CAMPAIGN
    console.log('\n📋 STEP 1: Create Campaign');
    console.log('-'.repeat(40));
    await delay(5000);
    testCampaignId = await sdk.promotion.createSeacatSaveAd({
      name: `LIFECYCLE_TEST_${Date.now()}`,
      nms: [nmId],
      bid_type: 'manual',
      placement_types: ['search']
    }) as number;
    log(`✅ Created campaign: ${testCampaignId}`);

    // Check initial status
    await delay(3000);
    let info = await sdk.promotion.getAuctionAdverts({ ids: String(testCampaignId) });
    let campaign = info.adverts?.find((a: any) => a.id === testCampaignId);
    log(`   Status: ${campaign?.status} (expected: 4 - ready)`);

    // 2. DEPOSIT BUDGET (requires status 11, so we need to handle status 4)
    console.log('\n📋 STEP 2: Deposit Budget (1000₽)');
    console.log('-'.repeat(40));

    // API says deposit requires status 11, but let's try with status 4 first
    await delay(5000);
    try {
      await sdk.promotion.createBudgetDeposit(
        { sum: 1000, type: 1 },
        { id: testCampaignId }
      );
      log('✅ Budget deposited!');
    } catch (e: any) {
      log(`❌ Deposit failed: ${e.message}`);
      // If status 4 doesn't work, the campaign might need to be started first
      // or there's another issue
    }

    // Check budget
    await delay(3000);
    const budget = await sdk.promotion.getAdvBudget({ id: testCampaignId });
    log(`   Budget: ${budget.total}₽`);

    // 3. START CAMPAIGN (status 4 → 9)
    console.log('\n📋 STEP 3: Start Campaign');
    console.log('-'.repeat(40));
    await delay(5000);
    try {
      await sdk.promotion.getAdvStart({ id: testCampaignId });
      log('✅ Campaign started!');
      await delay(2000);
    } catch (e: any) {
      log(`❌ Start failed: ${e.message}`);
    }

    // Check status
    await delay(3000);
    info = await sdk.promotion.getAuctionAdverts({ ids: String(testCampaignId) });
    campaign = info.adverts?.find((a: any) => a.id === testCampaignId);
    log(`   Status: ${campaign?.status} (expected: 9 - active)`);

    // 4. PAUSE CAMPAIGN (status 9 → 11)
    console.log('\n📋 STEP 4: Pause Campaign');
    console.log('-'.repeat(40));
    await delay(5000);
    try {
      await sdk.promotion.getAdvPause({ id: testCampaignId });
      log('✅ Campaign paused!');
      await delay(2000);
    } catch (e: any) {
      log(`❌ Pause failed: ${e.message}`);
    }

    // Check status
    await delay(3000);
    info = await sdk.promotion.getAuctionAdverts({ ids: String(testCampaignId) });
    campaign = info.adverts?.find((a: any) => a.id === testCampaignId);
    log(`   Status: ${campaign?.status} (expected: 11 - paused)`);

    // 5. RESUME CAMPAIGN (status 11 → 9)
    console.log('\n📋 STEP 5: Resume Campaign');
    console.log('-'.repeat(40));
    await delay(5000);
    try {
      await sdk.promotion.getAdvStart({ id: testCampaignId });
      log('✅ Campaign resumed!');
      await delay(2000);
    } catch (e: any) {
      log(`❌ Resume failed: ${e.message}`);
    }

    // Check status
    await delay(3000);
    info = await sdk.promotion.getAuctionAdverts({ ids: String(testCampaignId) });
    campaign = info.adverts?.find((a: any) => a.id === testCampaignId);
    log(`   Status: ${campaign?.status} (expected: 9 - active)`);

    // 6. STOP CAMPAIGN (status 9 → 7)
    console.log('\n📋 STEP 6: Stop Campaign');
    console.log('-'.repeat(40));
    await delay(5000);
    try {
      await sdk.promotion.getAdvStop({ id: testCampaignId });
      log('✅ Campaign stopped!');
      await delay(2000);
    } catch (e: any) {
      log(`❌ Stop failed: ${e.message}`);
    }

    // Check final status
    await delay(3000);
    info = await sdk.promotion.getAuctionAdverts({ ids: String(testCampaignId) });
    campaign = info.adverts?.find((a: any) => a.id === testCampaignId);
    log(`   Status: ${campaign?.status} (expected: 7 - finished)`);

    // SUMMARY
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST COMPLETE');
    console.log('='.repeat(60));
    console.log(`Test campaign ID: ${testCampaignId}`);
    console.log(`Final status: ${campaign?.status}`);

  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
  }
}

main().catch(console.error);

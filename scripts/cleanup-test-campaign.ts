/**
 * Cleanup script - delete test campaign
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function cleanup() {
  const campaignId = 32129132;

  console.log(`🗑️ Deleting test campaign ${campaignId}...`);
  console.log('   Note: Campaign is in status 4 (ready), which allows deletion');

  try {
    // First check if campaign exists
    const campaigns = await sdk.promotion.getAuctionAdverts({});
    const exists = campaigns.adverts?.find(a => a.id === campaignId);

    if (!exists) {
      console.log(`⚠️ Campaign ${campaignId} not found in auction adverts`);
      console.log('   It may already be deleted or be of a different type');
      return;
    }

    console.log(`   Found campaign: status=${exists.status}, bid_type=${exists.bid_type}`);

    await sdk.promotion.getAdvDelete({ id: campaignId });
    console.log(`✅ Campaign ${campaignId} deletion initiated`);
    console.log('   Campaign will be fully deleted in 3-10 minutes');
  } catch (error) {
    console.error(`❌ Failed to delete: ${(error as Error).message}`);
  }
}

cleanup();

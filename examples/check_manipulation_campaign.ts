import { WildberriesSDK } from '../src/index';
import * as dotenv from 'dotenv';
dotenv.config();

const MANIPULATION_CAMPAIGN_ID = 28638703;

async function main() {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) throw new Error('No API key');

  const sdk = new WildberriesSDK({ apiKey });

  console.log('=== Checking Manipulation Campaign 28638703 ===\n');

  // Check in promotion count
  const counts = await sdk.promotion.getPromotionCount();
  for (const group of counts.adverts || []) {
    const found = group.advert_list?.find(a => a.advertId === MANIPULATION_CAMPAIGN_ID);
    if (found) {
      console.log('Found in getPromotionCount:');
      console.log(`  Type: ${group.type}`);
      console.log(`  Status: ${group.status}`);
      console.log(`  Change time: ${found.changeTime}`);
    }
  }

  // Try to get via auction adverts (type 9)
  console.log('\nTrying getAuctionAdverts...');
  try {
    const auction = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
    const campaign = auction.adverts?.find((a: any) => a.id === MANIPULATION_CAMPAIGN_ID);
    if (campaign) {
      console.log('Found in getAuctionAdverts:');
      console.log(`  Status: ${campaign.status}`);
      console.log(`  Bid type: ${campaign.bid_type}`);
      console.log(`  Name: ${campaign.settings?.name}`);
      console.log(`  NM IDs: ${campaign.nm_settings?.map((s: any) => s.nm_id).join(', ')}`);
    } else {
      console.log('  Not found (may be legacy type)');
    }
  } catch (e: any) {
    console.log('  Error:', e.message);
  }

  // Get budget
  console.log('\nChecking budget...');
  try {
    const budget = await sdk.promotion.getAdvBudget({ id: MANIPULATION_CAMPAIGN_ID });
    console.log(`  Budget: ${budget.total}₽`);
  } catch (e: any) {
    console.log('  Error:', e.message);
  }
}

main().catch(console.error);

/**
 * Test budget deposit with correct minimum (1000₽)
 */
import { WildberriesSDK } from '../src/index';
import * as dotenv from 'dotenv';
dotenv.config();

const CAMPAIGN_ID = 27111737;
const DEPOSIT_AMOUNT = 1000; // Minimum required by API
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function main() {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) throw new Error('No API key');

  const sdk = new WildberriesSDK({ apiKey });

  console.log('=== Budget Deposit Test ===\n');

  // 1. Check initial status and budget
  console.log('1. Initial state:');
  const initial = await sdk.promotion.getAuctionAdverts({ ids: String(CAMPAIGN_ID) });
  const campaign = initial.adverts?.find((a: any) => a.id === CAMPAIGN_ID);
  console.log(`   Status: ${campaign?.status}`);

  await delay(3000);
  const initialBudget = await sdk.promotion.getAdvBudget({ id: CAMPAIGN_ID });
  console.log(`   Budget: ${initialBudget.total}₽`);

  // 2. Pause campaign if active
  if (campaign?.status === 9) {
    console.log('\n2. Pausing campaign...');
    await delay(3000);
    await sdk.promotion.getAdvPause({ id: CAMPAIGN_ID });
    console.log('   ✅ Paused');
    await delay(2000);
  } else {
    console.log('\n2. Campaign already paused');
  }

  // 3. Deposit budget (1000₽ minimum)
  console.log(`\n3. Depositing ${DEPOSIT_AMOUNT}₽...`);
  await delay(3000);
  try {
    const result = await sdk.promotion.createBudgetDeposit(
      { sum: DEPOSIT_AMOUNT, type: 1, return: true },
      { id: CAMPAIGN_ID }
    );
    console.log('   ✅ Deposit successful!');
    console.log('   Result:', JSON.stringify(result));
  } catch (e: any) {
    console.log(`   ❌ Deposit failed: ${e.message}`);
    if (e.response?.data) {
      console.log('   API Response:', JSON.stringify(e.response.data));
    }
  }

  // 4. Check new budget
  console.log('\n4. Checking new budget...');
  await delay(3000);
  const newBudget = await sdk.promotion.getAdvBudget({ id: CAMPAIGN_ID });
  console.log(`   Budget: ${newBudget.total}₽`);
  console.log(`   Change: +${newBudget.total - initialBudget.total}₽`);

  // 5. Restart campaign
  console.log('\n5. Restarting campaign...');
  await delay(3000);
  await sdk.promotion.getAdvStart({ id: CAMPAIGN_ID });
  console.log('   ✅ Started');

  // 6. Verify final status
  await delay(3000);
  const final = await sdk.promotion.getAuctionAdverts({ ids: String(CAMPAIGN_ID) });
  const finalCampaign = final.adverts?.find((a: any) => a.id === CAMPAIGN_ID);
  console.log(`\n6. Final status: ${finalCampaign?.status}`);

  if (finalCampaign?.status === 9) {
    console.log('\n✅ SUCCESS! Campaign is ACTIVE');
  } else {
    console.log('\n⚠️ Campaign status:', finalCampaign?.status);
  }
}

main().catch(console.error);

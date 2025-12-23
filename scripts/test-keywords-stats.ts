/**
 * Targeted test for getStatsKeywords method
 * Tests with active campaigns only
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  console.error('❌ WB_API_KEY not found');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey });

async function main() {
  console.log('🔍 Testing getStatsKeywords with active campaigns...\n');

  // Step 1: Get all campaigns
  const campaigns = await sdk.promotion.getPromotionCount();
  console.log('📊 Campaign overview:');

  // Find active campaigns (status 9)
  const activeCampaigns: number[] = [];

  campaigns.adverts?.forEach(group => {
    console.log(`  Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);
    if (group.status === 9 && group.advert_list) {
      group.advert_list.forEach(ad => {
        if (ad.advertId) activeCampaigns.push(ad.advertId);
      });
    }
  });

  console.log(`\n✅ Found ${activeCampaigns.length} active campaigns (status=9)`);

  if (activeCampaigns.length === 0) {
    console.log('❌ No active campaigns to test');
    return;
  }

  // Step 2: Test getStatsKeywords with first few active campaigns
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 3); // Last 3 days (within 7 day limit)

  const fromStr = from.toISOString().split('T')[0];
  const toStr = to.toISOString().split('T')[0];

  console.log(`\n📅 Testing period: ${fromStr} to ${toStr}`);
  console.log(`\n🧪 Testing first 5 active campaigns for keyword stats...\n`);

  for (const campaignId of activeCampaigns.slice(0, 5)) {
    console.log(`--- Campaign ${campaignId} ---`);
    try {
      const result = await sdk.promotion.getStatsKeywords({
        advert_id: campaignId,
        from: fromStr,
        to: toStr
      });

      if (result.keywords && result.keywords.length > 0) {
        console.log(`✅ SUCCESS - ${result.keywords.length} days of data`);
        result.keywords.forEach(day => {
          const totalViews = day.stats?.reduce((sum, s) => sum + s.views, 0) || 0;
          const totalSum = day.stats?.reduce((sum, s) => sum + s.sum, 0) || 0;
          console.log(`   ${day.date}: ${day.stats?.length || 0} keywords, ${totalViews} views, ${totalSum.toFixed(2)}₽`);
        });
      } else {
        console.log(`⚠️ OK but no keyword data returned`);
      }
    } catch (error) {
      const err = error as Error;
      console.log(`❌ FAILED: ${err.message}`);
    }
    console.log('');

    // Small delay to respect rate limits
    await new Promise(r => setTimeout(r, 300));
  }

  // Step 3: Try getStatWords (alternative method for manual bid campaigns)
  console.log('\n🔤 Testing getStatWords (alternative method)...');
  for (const campaignId of activeCampaigns.slice(0, 2)) {
    console.log(`--- Campaign ${campaignId} (getStatWords) ---`);
    try {
      const result = await sdk.promotion.getStatWords({ id: campaignId });
      console.log(`✅ SUCCESS`);
      if (result.words?.keywords) {
        console.log(`   Keywords: ${result.words.keywords.length}`);
      }
      if (result.stat && result.stat.length > 0) {
        console.log(`   Stats entries: ${result.stat.length}`);
        result.stat.slice(0, 3).forEach(s => {
          console.log(`   - "${s.keyword}": views=${s.views}, clicks=${s.clicks}, sum=${s.sum}₽`);
        });
      }
    } catch (error) {
      const err = error as Error;
      console.log(`❌ FAILED: ${err.message}`);
    }
    console.log('');
    await new Promise(r => setTimeout(r, 300));
  }

  // Step 4: Try getAutoStatWords (for unified bid campaigns)
  console.log('\n📊 Testing getAutoStatWords (for unified bid campaigns)...');
  for (const campaignId of activeCampaigns.slice(0, 2)) {
    console.log(`--- Campaign ${campaignId} (getAutoStatWords) ---`);
    try {
      const result = await sdk.promotion.getAutoStatWords({ id: campaignId });
      console.log(`✅ SUCCESS`);
      if (result.clusters && result.clusters.length > 0) {
        console.log(`   Clusters: ${result.clusters.length}`);
        result.clusters.slice(0, 3).forEach(c => {
          console.log(`   - "${c.cluster}": count=${c.count}`);
        });
      }
      if (result.excluded && result.excluded.length > 0) {
        console.log(`   Excluded phrases: ${result.excluded.length}`);
      }
    } catch (error) {
      const err = error as Error;
      console.log(`❌ FAILED: ${err.message}`);
    }
    console.log('');
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('✅ Test completed');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

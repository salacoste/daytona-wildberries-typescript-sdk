/**
 * Test script: Get campaign statistics for campaign 27111737
 * Run: npx ts-node examples/test_campaign_stats.ts
 */

import { WildberriesSDK } from '../src/index';
import * as dotenv from 'dotenv';

dotenv.config();

const CAMPAIGN_ID = 27111737;

async function main() {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) {
    console.error('❌ WB_API_KEY not found in environment');
    process.exit(1);
  }

  const sdk = new WildberriesSDK({ apiKey });

  console.log(`\n🎯 Testing stats for campaign: ${CAMPAIGN_ID}\n`);
  console.log('='.repeat(60));

  // Calculate date ranges
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  try {
    // 1. Get campaign info first
    console.log('\n📋 1. Campaign Info:');
    console.log('-'.repeat(40));
    try {
      const info = await sdk.promotion.getAdvAdvert({ id: CAMPAIGN_ID });
      console.log(`   Name: ${info.name || 'N/A'}`);
      console.log(`   Type: ${info.type}`);
      console.log(`   Status: ${info.status}`);
      console.log(`   Brand: ${info.brand || 'N/A'}`);
      console.log(`   Created: ${info.createTime || 'N/A'}`);
    } catch (e: any) {
      console.log(`   ⚠️ Could not fetch info: ${e.message}`);
    }

    // 2. Get full stats for last 7 days
    console.log('\n📊 2. Full Stats (Last 7 days):');
    console.log('-'.repeat(40));
    try {
      const fullStats = await sdk.promotion.getAdvFullstats({
        ids: String(CAMPAIGN_ID),
        beginDate: formatDate(lastWeek),
        endDate: formatDate(today),
      });
      console.log('   Response:', JSON.stringify(fullStats, null, 2).substring(0, 1000));
    } catch (e: any) {
      console.log(`   ⚠️ Error: ${e.message}`);
    }

    // 3. Daily stats breakdown (last 7 days)
    // NOTE: per-keyword stats (getStatsKeywords) were removed in v4.0.0 — the
    // WB v0/v1 keyword-stats endpoint was disabled 2026-02-02. Use getAdvFullstats
    // (kept) for the per-day campaign breakdown instead.
    console.log('\n🔑 3. Daily Stats Breakdown (Last 7 days):');
    console.log('-'.repeat(40));
    try {
      // API limit: max 7 days range
      const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
      const dailyStats = await sdk.promotion.getAdvFullstats({
        ids: String(CAMPAIGN_ID),
        beginDate: formatDate(sevenDaysAgo),
        endDate: formatDate(today),
      });

      const days = Array.isArray(dailyStats) ? dailyStats : [];
      if (days.length > 0) {
        days.forEach((day: any) => {
          console.log(`\n   📅 ${day.begin ?? day.date ?? 'N/A'}:`);
          if (Array.isArray(day.days) && day.days.length > 0) {
            day.days.slice(0, 5).forEach((d: any) => {
              console.log(
                `      views=${d.views ?? 0}, clicks=${d.clicks ?? 0}, spend=${d.sum ?? 0}₽`
              );
            });
          }
        });
      } else {
        console.log('   No daily stats available');
      }
    } catch (e: any) {
      console.log(`   ⚠️ Error: ${e.message}`);
      if (e.response?.data) {
        console.log(`   Response: ${JSON.stringify(e.response.data)}`);
      }
    }

    // 4. Per-phrase stat words
    // NOTE: getStatWords() was removed in v4.0.0 — the WB v0/v1 phrase-stats
    // endpoint was disabled 2026-02-02 with no v2 replacement. For aggregate
    // campaign stats, use getAdvFullstats() (covered in sections 2 and 3).
    console.log('\n📝 4. Per-Phrase Stat Words:');
    console.log('-'.repeat(40));
    console.log('   (getStatWords was removed in v4.0.0 — no v2 replacement.)');
    console.log('   Use getAdvFullstats() for aggregate campaign statistics.');

    // 5. Get campaign budget
    console.log('\n💰 5. Campaign Budget:');
    console.log('-'.repeat(40));
    try {
      const budget = await sdk.promotion.getAdvBudget({ id: CAMPAIGN_ID });
      console.log(`   Cash: ${budget.cash}`);
      console.log(`   Netting: ${budget.netting}`);
      console.log(`   Total: ${budget.total}`);
    } catch (e: any) {
      console.log(`   ⚠️ Error: ${e.message}`);
    }

    // 6. Get UPD (spending history) for last 30 days
    console.log('\n💳 6. Spending History (Last 30 days):');
    console.log('-'.repeat(40));
    try {
      const upd = await sdk.promotion.getAdvUpd({
        from: formatDate(lastMonth),
        to: formatDate(today),
      });

      // Filter for this campaign
      const campaignUpd = upd.filter((u: any) => u.advertId === CAMPAIGN_ID);

      if (campaignUpd.length > 0) {
        let totalSpent = 0;
        campaignUpd.slice(0, 10).forEach((u: any) => {
          console.log(`   ${u.updTime}: ${u.updSum}₽`);
          totalSpent += u.updSum || 0;
        });
        console.log(`\n   Total spent (shown): ${totalSpent.toFixed(2)}₽`);
      } else {
        console.log('   No spending records found for this campaign');
      }
    } catch (e: any) {
      console.log(`   ⚠️ Error: ${e.message}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Test completed!');
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

main();

/**
 * Test script for Promotion/Advertising API methods
 * Tests real API calls to verify method functionality
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

// Initialize SDK with test token
const apiKey = process.env.WB_API_KEY;

if (!apiKey) {
  console.error('❌ WB_API_KEY not found in environment');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey });

// Helper to format JSON output
const formatJson = (obj: unknown) => JSON.stringify(obj, null, 2);

// Helper to pause between requests (rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Test results collector
const results: { test: string; status: 'PASS' | 'FAIL' | 'SKIP'; data?: unknown; error?: string }[] = [];

async function testGetPromotionCount() {
  console.log('\n📊 Testing getPromotionCount() - Список кампаний...');
  try {
    const result = await sdk.promotion.getPromotionCount();
    console.log('✅ SUCCESS');
    console.log('Total campaigns:', result.all);
    if (result.adverts) {
      console.log('Campaign groups:', result.adverts.length);
      result.adverts.forEach((group, i) => {
        console.log(`  [${i}] Type: ${group.type}, Status: ${group.status}, Count: ${group.count}`);
      });
    }
    results.push({ test: 'getPromotionCount', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getPromotionCount', status: 'FAIL', error: err.message });
    return null;
  }
}

async function testGetAdvBalance() {
  console.log('\n💰 Testing getAdvBalance() - Баланс рекламного кабинета...');
  try {
    const result = await sdk.promotion.getAdvBalance();
    console.log('✅ SUCCESS');
    console.log('Balance (взаиморасчёт):', result.balance);
    console.log('Net (счёт кабинета):', result.net);
    console.log('Bonus:', result.bonus);
    if (result.cashbacks && result.cashbacks.length > 0) {
      console.log('Cashbacks:', result.cashbacks);
    }
    results.push({ test: 'getAdvBalance', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getAdvBalance', status: 'FAIL', error: err.message });
    return null;
  }
}

async function testGetAdvUpd() {
  console.log('\n📜 Testing getAdvUpd() - История затрат...');

  // Get last 30 days
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);

  const fromStr = from.toISOString().split('T')[0];
  const toStr = to.toISOString().split('T')[0];

  console.log(`  Period: ${fromStr} - ${toStr}`);

  try {
    const result = await sdk.promotion.getAdvUpd({ from: fromStr, to: toStr });
    console.log('✅ SUCCESS');
    console.log('Expense records:', Array.isArray(result) ? result.length : 0);
    if (Array.isArray(result) && result.length > 0) {
      console.log('First 3 records:');
      result.slice(0, 3).forEach((record, i) => {
        console.log(`  [${i}] Campaign: ${record.campName}, Sum: ${record.updSum}, Type: ${record.advertType}`);
      });

      // Calculate total expenses
      const total = result.reduce((sum, r) => sum + (r.updSum || 0), 0);
      console.log(`Total expenses for period: ${total} ₽`);
    }
    results.push({ test: 'getAdvUpd', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getAdvUpd', status: 'FAIL', error: err.message });
    return null;
  }
}

async function testGetAdvBudget(campaignId?: number) {
  console.log('\n💵 Testing getAdvBudget() - Бюджет кампании...');

  if (!campaignId) {
    console.log('⏭️ SKIP: No campaign ID available');
    results.push({ test: 'getAdvBudget', status: 'SKIP', error: 'No campaign ID' });
    return null;
  }

  console.log(`  Campaign ID: ${campaignId}`);

  try {
    const result = await sdk.promotion.getAdvBudget({ id: campaignId });
    console.log('✅ SUCCESS');
    console.log('Cash:', result.cash);
    console.log('Netting:', result.netting);
    console.log('Total:', result.total);
    results.push({ test: 'getAdvBudget', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getAdvBudget', status: 'FAIL', error: err.message });
    return null;
  }
}

async function testGetAdvFullstats(campaignIds?: number[]) {
  console.log('\n📈 Testing getAdvFullstats() - Статистика кампаний...');

  if (!campaignIds || campaignIds.length === 0) {
    console.log('⏭️ SKIP: No campaign IDs available');
    results.push({ test: 'getAdvFullstats', status: 'SKIP', error: 'No campaign IDs' });
    return null;
  }

  // Get last 7 days
  const end = new Date();
  const begin = new Date();
  begin.setDate(begin.getDate() - 7);

  const beginDate = begin.toISOString().split('T')[0];
  const endDate = end.toISOString().split('T')[0];
  const idsStr = campaignIds.slice(0, 5).join(','); // Max 5 campaigns

  console.log(`  Campaign IDs: ${idsStr}`);
  console.log(`  Period: ${beginDate} - ${endDate}`);

  try {
    const result = await sdk.promotion.getAdvFullstats({
      ids: idsStr,
      beginDate,
      endDate
    });
    console.log('✅ SUCCESS');

    if (Array.isArray(result)) {
      console.log('Campaigns stats:', result.length);
      result.forEach((stat, i) => {
        console.log(`  [${i}] ID: ${stat.advertId}`);
        console.log(`      Views: ${stat.views}, Clicks: ${stat.clicks}`);
        console.log(`      Orders: ${stat.orders}, Sum (expenses): ${stat.sum} ₽`);
        console.log(`      CTR: ${stat.ctr}%, CPC: ${stat.cpc} ₽`);
      });
    }
    results.push({ test: 'getAdvFullstats', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getAdvFullstats', status: 'FAIL', error: err.message });
    return null;
  }
}

async function testGetStatsKeywords(campaignId?: number) {
  console.log('\n🔤 Testing getStatsKeywords() - Статистика по ключевым фразам...');

  if (!campaignId) {
    console.log('⏭️ SKIP: No campaign ID available');
    results.push({ test: 'getStatsKeywords', status: 'SKIP', error: 'No campaign ID' });
    return null;
  }

  // Get last 7 days (max allowed)
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);

  const fromStr = from.toISOString().split('T')[0];
  const toStr = to.toISOString().split('T')[0];

  console.log(`  Campaign ID: ${campaignId}`);
  console.log(`  Period: ${fromStr} - ${toStr}`);

  try {
    const result = await sdk.promotion.getStatsKeywords({
      advert_id: campaignId,
      from: fromStr,
      to: toStr
    });
    console.log('✅ SUCCESS');

    if (result.keywords && result.keywords.length > 0) {
      console.log('Days with data:', result.keywords.length);
      result.keywords.slice(0, 2).forEach((day) => {
        console.log(`  Date: ${day.date}`);
        if (day.stats && day.stats.length > 0) {
          day.stats.slice(0, 3).forEach((stat) => {
            console.log(`    "${stat.keyword}": views=${stat.views}, clicks=${stat.clicks}, sum=${stat.sum}₽`);
          });
        }
      });
    }
    results.push({ test: 'getStatsKeywords', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getStatsKeywords', status: 'FAIL', error: err.message });
    return null;
  }
}

async function testGetAuctionAdverts() {
  console.log('\n🎯 Testing getAuctionAdverts() - Кампании с ручной ставкой...');
  try {
    const result = await sdk.promotion.getAuctionAdverts({});
    console.log('✅ SUCCESS');

    if (result.adverts && result.adverts.length > 0) {
      console.log('Auction campaigns:', result.adverts.length);
      result.adverts.slice(0, 3).forEach((advert, i) => {
        console.log(`  [${i}] ID: ${advert.id}, Status: ${advert.status}, Bid type: ${advert.bid_type}`);
      });
    } else {
      console.log('No auction campaigns found');
    }
    results.push({ test: 'getAuctionAdverts', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getAuctionAdverts', status: 'FAIL', error: err.message });
    return null;
  }
}

async function testGetAdvConfig() {
  console.log('\n⚙️ Testing getAdvConfig() - Конфигурация продвижения...');
  try {
    const result = await sdk.promotion.getAdvConfig();
    console.log('✅ SUCCESS');

    if (result.categories) {
      console.log('Categories available:', result.categories.length);
      result.categories.slice(0, 3).forEach((cat, i) => {
        console.log(`  [${i}] ${cat.name} (ID: ${cat.id}, Min CPM: ${cat.cpm_min})`);
      });
    }
    if (result.config) {
      console.log('Config parameters:', result.config.length);
    }
    results.push({ test: 'getAdvConfig', status: 'PASS', data: result });
    return result;
  } catch (error) {
    const err = error as Error;
    console.log('❌ FAILED:', err.message);
    results.push({ test: 'getAdvConfig', status: 'FAIL', error: err.message });
    return null;
  }
}

async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  WILDBERRIES PROMOTION API TEST SUITE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Started: ${new Date().toISOString()}`);

  // Test 1: Get campaign count and extract campaign IDs
  const campaigns = await testGetPromotionCount();
  await delay(500);

  // Extract campaign IDs from result
  let campaignIds: number[] = [];
  if (campaigns?.adverts) {
    campaigns.adverts.forEach(group => {
      if (group.advert_list) {
        group.advert_list.forEach(ad => {
          if (ad.advertId) campaignIds.push(ad.advertId);
        });
      }
    });
  }
  console.log(`\n📋 Found ${campaignIds.length} campaign IDs for further testing`);

  // Test 2: Get balance
  await testGetAdvBalance();
  await delay(500);

  // Test 3: Get expense history
  await testGetAdvUpd();
  await delay(500);

  // Test 4: Get auction adverts (campaigns with manual bid)
  const auctionResult = await testGetAuctionAdverts();
  await delay(500);

  // Add auction campaign IDs
  if (auctionResult?.adverts) {
    auctionResult.adverts.forEach(ad => {
      if (!campaignIds.includes(ad.id)) {
        campaignIds.push(ad.id);
      }
    });
  }

  // Test 5: Get config
  await testGetAdvConfig();
  await delay(1000); // Rate limit: 1 req/min

  // Test 6: Get budget for first campaign
  if (campaignIds.length > 0) {
    await testGetAdvBudget(campaignIds[0]);
    await delay(500);
  }

  // Test 7: Get full stats for campaigns
  if (campaignIds.length > 0) {
    await testGetAdvFullstats(campaignIds.slice(0, 5));
    await delay(500);
  }

  // Test 8: Get keyword stats for first campaign
  if (campaignIds.length > 0) {
    await testGetStatsKeywords(campaignIds[0]);
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
    console.log(`${icon} ${r.test}: ${r.status}${r.error ? ` - ${r.error}` : ''}`);
  });

  console.log('\n───────────────────────────────────────────────────────────────');
  console.log(`Total: ${results.length} | ✅ Passed: ${passed} | ❌ Failed: ${failed} | ⏭️ Skipped: ${skipped}`);
  console.log(`Completed: ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════════════════════════');

  // Exit with error code if any failed
  if (failed > 0) {
    process.exit(1);
  }
}

// Run tests
runAllTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

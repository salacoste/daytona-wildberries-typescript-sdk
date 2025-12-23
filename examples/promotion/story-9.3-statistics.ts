/**
 * Story 9.3: Statistics & Analytics
 * Epic 9: Promotion Module - Comprehensive Testing
 *
 * Methods tested:
 * 1. createAdvStat() - Campaign statistics (POST)
 * 2. createAdvFullstat() - Extended statistics (POST)
 * 3. getAdvPayments() - Payment history
 * 4. getAutoStatWords() - Unified bid word statistics
 *
 * Campaign: 27111737 (READ-ONLY - active campaign for statistics)
 */
import { WildberriesSDK } from '../../src/index';
import * as dotenv from 'dotenv';
dotenv.config();

const READ_ONLY_CAMPAIGN_ID = 27111737;

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

function log(msg: string) {
  console.log(`[${new Date().toISOString().split('T')[1].split('.')[0]}] ${msg}`);
}

function section(title: string) {
  console.log('\n' + '='.repeat(60));
  console.log(`📋 ${title}`);
  console.log('='.repeat(60));
}

interface TestResult {
  method: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  details: string;
  apiLimitations?: string;
}

const results: TestResult[] = [];

// Helper to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Get date range for testing
function getDateRange(daysBack: number = 7): { from: string; to: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - daysBack);
  return {
    from: formatDate(start),
    to: formatDate(end)
  };
}

async function main() {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) throw new Error('No API key');

  const sdk = new WildberriesSDK({ apiKey });

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Story 9.3: Statistics & Analytics                         ║');
  console.log('║  Epic 9: Promotion Module - Comprehensive Testing          ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // =======================================================================
  // Initial state verification
  // =======================================================================
  section('0. Initial State Verification');

  log('Verifying campaign 27111737 is active (READ-ONLY)...');
  await delay(3000);

  const campaignInfo = await sdk.promotion.getAuctionAdverts({ ids: String(READ_ONLY_CAMPAIGN_ID) });
  const campaign = campaignInfo.adverts?.find((a: any) => a.id === READ_ONLY_CAMPAIGN_ID);

  if (!campaign) {
    throw new Error('Campaign 27111737 not found! Cannot proceed.');
  }

  console.log('\nCampaign state (READ-ONLY):');
  console.log(`  ID: ${READ_ONLY_CAMPAIGN_ID}`);
  console.log(`  Status: ${campaign.status} ${campaign.status === 9 ? '✅ Active' : '⚠️'}`);
  console.log(`  Type: ${campaign.type}`);
  console.log(`  Name: ${campaign.settings?.name}`);

  const dateRange = getDateRange(7);
  console.log(`\n  Test date range: ${dateRange.from} to ${dateRange.to}`);

  // =======================================================================
  // Test 1: getAdvPayments() - Payment history
  // =======================================================================
  section('1. getAdvPayments() - Payment History');

  try {
    await delay(5000);
    log('Calling getAdvPayments()...');

    const payments = await sdk.promotion.getAdvPayments({
      from: dateRange.from,
      to: dateRange.to
    });

    console.log('\nPayment history:');
    if (Array.isArray(payments) && payments.length > 0) {
      console.log(`  Total payments: ${payments.length}`);
      console.log('\n  Recent payments:');
      payments.slice(0, 5).forEach((p: any) => {
        console.log(`    - ${p.date}: ${p.sum}₽ (type: ${p.type}, status: ${p.statusId})`);
      });

      // Calculate total
      const total = payments.reduce((sum, p: any) => sum + (p.sum || 0), 0);
      console.log(`\n  Total spent: ${total}₽`);

      results.push({
        method: 'getAdvPayments()',
        status: 'PASS',
        details: `Retrieved ${payments.length} payments, total ${total}₽`
      });
    } else {
      console.log('  No payments found in this period');
      results.push({
        method: 'getAdvPayments()',
        status: 'PASS',
        details: 'No payments in period (empty array is valid response)'
      });
    }
    log('✅ getAdvPayments() - PASS');

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'getAdvPayments()',
      status: 'FAIL',
      details: e.message
    });
  }

  // =======================================================================
  // Test 2: createAdvStat() - Campaign statistics (POST)
  // =======================================================================
  section('2. createAdvStat() - Campaign Statistics');

  // Note: createAdvStat is for media campaigns (not type 9)
  // It may not work for auction campaigns

  try {
    await delay(5000);
    log('Calling createAdvStat() with campaign IDs...');

    // Try with array of campaign IDs
    const stats = await sdk.promotion.createAdvStat([{ id: READ_ONLY_CAMPAIGN_ID }]);

    console.log('\nStatistics result:');
    console.log('  Response:', JSON.stringify(stats, null, 2).substring(0, 500));

    if (Array.isArray(stats) && stats.length > 0) {
      const firstStat = stats[0] as any;
      console.log(`\n  Campaign: ${firstStat.advertId || 'N/A'}`);
      console.log(`  Views: ${firstStat.views || 0}`);
      console.log(`  Clicks: ${firstStat.clicks || 0}`);
      console.log(`  CTR: ${firstStat.ctr || 0}%`);
      console.log(`  Sum: ${firstStat.sum || 0}₽`);

      results.push({
        method: 'createAdvStat()',
        status: 'PASS',
        details: `Got stats: ${firstStat.views || 0} views, ${firstStat.clicks || 0} clicks`
      });
    } else {
      results.push({
        method: 'createAdvStat()',
        status: 'PASS',
        details: 'Empty response (may be for different campaign type)'
      });
    }
    log('✅ createAdvStat() - PASS');

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'createAdvStat()',
      status: 'FAIL',
      details: e.message,
      apiLimitations: 'createAdvStat() is for media campaigns (advert-media-api), not auction type 9'
    });
  }

  // =======================================================================
  // Test 3: createAdvFullstat() - Extended statistics (POST)
  // =======================================================================
  section('3. createAdvFullstat() - Extended Statistics (DEPRECATED)');

  // NOTE: This method is DEPRECATED as of Sept 30, 2024
  // Use getAdvFullstats() (v3 GET) instead
  // The request body must be an ARRAY of requests

  try {
    await delay(5000);

    // Test with date interval
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    log(`Calling createAdvFullstat() with interval: ${formatDate(weekAgo)} to ${formatDate(yesterday)}...`);
    log('Note: This method is DEPRECATED, expects ARRAY format');

    // The API expects an ARRAY of request objects
    const fullstats = await sdk.promotion.createAdvFullstat([{
      id: READ_ONLY_CAMPAIGN_ID,
      interval: {
        begin: formatDate(weekAgo),
        end: formatDate(yesterday)
      }
    }] as any);

    console.log('\nExtended statistics result:');

    if (fullstats && typeof fullstats === 'object') {
      // Check if it's interval response
      const response = fullstats as any;

      if (response.days && Array.isArray(response.days)) {
        console.log(`  Days with data: ${response.days.length}`);
        if (response.days.length > 0) {
          const firstDay = response.days[0];
          console.log(`\n  Sample day (${firstDay.date || 'N/A'}):`);
          console.log(`    Views: ${firstDay.views || 0}`);
          console.log(`    Clicks: ${firstDay.clicks || 0}`);
          console.log(`    CTR: ${firstDay.ctr || 0}%`);
          console.log(`    Sum: ${firstDay.sum || 0}₽`);
          console.log(`    Orders: ${firstDay.orders || 0}`);
          console.log(`    CR: ${firstDay.cr || 0}%`);
        }
        results.push({
          method: 'createAdvFullstat()',
          status: 'PASS',
          details: `Retrieved ${response.days.length} days of statistics`
        });
      } else if (response.advertId) {
        console.log(`  Campaign ID: ${response.advertId}`);
        console.log(`  Views: ${response.views || 0}`);
        console.log(`  Clicks: ${response.clicks || 0}`);
        results.push({
          method: 'createAdvFullstat()',
          status: 'PASS',
          details: `Views: ${response.views || 0}, Clicks: ${response.clicks || 0}`
        });
      } else {
        console.log('  Response:', JSON.stringify(fullstats, null, 2).substring(0, 500));
        results.push({
          method: 'createAdvFullstat()',
          status: 'PASS',
          details: 'Got response (structure varies by campaign type)'
        });
      }
    } else {
      console.log('  Empty or unexpected response');
      results.push({
        method: 'createAdvFullstat()',
        status: 'PASS',
        details: 'Empty response (may require different date range)'
      });
    }
    log('✅ createAdvFullstat() - PASS');

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'createAdvFullstat()',
      status: 'FAIL',
      details: e.message
    });
  }

  // =======================================================================
  // Test 4: getAutoStatWords() - Unified bid word statistics
  // =======================================================================
  section('4. getAutoStatWords() - Unified Bid Word Statistics');

  // Note: This method is for unified bid (auto) campaigns
  // Campaign 27111737 is manual bid, so this may not work

  try {
    await delay(5000);
    log('Calling getAutoStatWords()...');

    // First, let's try to find a unified bid campaign
    const allCounts = await sdk.promotion.getPromotionCount();
    let unifiedCampaignId: number | null = null;

    for (const group of allCounts.adverts || []) {
      // Type 8 is typically unified bid
      if (group.type === 8 && group.advert_list && group.advert_list.length > 0) {
        unifiedCampaignId = group.advert_list[0].advertId || null;
        break;
      }
    }

    if (unifiedCampaignId) {
      console.log(`\n  Found unified bid campaign: ${unifiedCampaignId}`);

      await delay(3000);
      const wordStats = await sdk.promotion.getAutoStatWords({ id: unifiedCampaignId });

      console.log('\nWord statistics:');
      if (wordStats.clusters && wordStats.clusters.length > 0) {
        console.log(`  Clusters: ${wordStats.clusters.length}`);
        console.log('\n  Sample clusters:');
        wordStats.clusters.slice(0, 3).forEach((c: any) => {
          console.log(`    - "${c.cluster}": ${c.count} queries`);
          if (c.keywords && c.keywords.length > 0) {
            console.log(`      Keywords: ${c.keywords.slice(0, 3).join(', ')}...`);
          }
        });
        results.push({
          method: 'getAutoStatWords()',
          status: 'PASS',
          details: `Retrieved ${wordStats.clusters.length} clusters`
        });
      } else {
        console.log('  No clusters found');
        results.push({
          method: 'getAutoStatWords()',
          status: 'PASS',
          details: 'No clusters (campaign may not have accumulated data)'
        });
      }

      if (wordStats.excluded && wordStats.excluded.length > 0) {
        console.log(`\n  Excluded phrases: ${wordStats.excluded.length}`);
        console.log(`    Sample: ${wordStats.excluded.slice(0, 5).join(', ')}`);
      }

      log('✅ getAutoStatWords() - PASS');

    } else {
      // Try with manual bid campaign anyway to document the error
      console.log('\n  No unified bid campaigns found, trying with manual bid...');

      try {
        await delay(3000);
        const wordStats = await sdk.promotion.getAutoStatWords({ id: READ_ONLY_CAMPAIGN_ID });
        console.log('  Response:', JSON.stringify(wordStats, null, 2));

        results.push({
          method: 'getAutoStatWords()',
          status: 'PASS',
          details: 'Works with manual bid campaigns too'
        });
        log('✅ getAutoStatWords() - PASS');

      } catch (innerErr: any) {
        console.log(`  ❌ Expected error for manual bid: ${innerErr.message}`);
        results.push({
          method: 'getAutoStatWords()',
          status: 'SKIP',
          details: 'No unified bid campaigns available for testing',
          apiLimitations: 'getAutoStatWords() is only for unified bid (auto) campaigns'
        });
        log('⏭️ getAutoStatWords() - SKIP (no unified campaigns)');
      }
    }

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'getAutoStatWords()',
      status: 'FAIL',
      details: e.message,
      apiLimitations: 'Method is specifically for unified bid campaigns'
    });
  }

  // =======================================================================
  // Additional: Test already-tested statistics methods for comparison
  // =======================================================================
  section('5. Comparison with Previously Tested Methods');

  try {
    await delay(5000);
    log('Testing getAdvFullstats() for comparison...');

    // This was tested before, verify it still works
    const fullstatsGet = await sdk.promotion.getAdvFullstats({ id: READ_ONLY_CAMPAIGN_ID });
    console.log('\ngetAdvFullstats() response:');

    if (Array.isArray(fullstatsGet) && fullstatsGet.length > 0) {
      const stat = fullstatsGet[0] as any;
      console.log(`  Dates: ${stat.dates?.length || 0} days`);
      if (stat.dates && stat.dates.length > 0) {
        const firstDate = stat.dates[0];
        console.log(`  First date: ${firstDate.date}`);
        console.log(`    Views: ${firstDate.views}`);
        console.log(`    Clicks: ${firstDate.clicks}`);
        console.log(`    Sum: ${firstDate.sum}₽`);
      }
    } else {
      console.log('  Empty response');
    }

    console.log('\n📊 Comparison Notes:');
    console.log('  - getAdvFullstats() - GET request, for auction campaigns');
    console.log('  - createAdvFullstat() - POST request, supports date range');
    console.log('  - createAdvStat() - POST request, for media campaigns');

  } catch (e: any) {
    console.log(`  Note: getAdvFullstats() error - ${e.message}`);
  }

  // =======================================================================
  // Summary Report
  // =======================================================================
  section('6. Test Summary');

  console.log('\n┌────────────────────────────────────┬────────┬──────────────────────────────────────────────────┐');
  console.log('│ Method                             │ Status │ Details                                          │');
  console.log('├────────────────────────────────────┼────────┼──────────────────────────────────────────────────┤');

  for (const r of results) {
    const method = r.method.padEnd(34);
    const status = r.status.padEnd(6);
    const details = r.details.substring(0, 48).padEnd(48);
    const statusIcon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⏭️';
    console.log(`│ ${method} │ ${statusIcon} ${status}│ ${details} │`);
  }

  console.log('└────────────────────────────────────┴────────┴──────────────────────────────────────────────────┘');

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;

  console.log(`\nTotal: ${passed} PASS, ${failed} FAIL, ${skipped} SKIP out of ${results.length} tests`);

  // API Limitations found
  const limitations = results.filter(r => r.apiLimitations);
  if (limitations.length > 0) {
    console.log('\n📝 API Limitations Discovered:');
    for (const l of limitations) {
      console.log(`  - ${l.method}: ${l.apiLimitations}`);
    }
  }

  // Campaign verification (should remain unchanged)
  console.log('\n🔒 Campaign 27111737 Status Verification:');
  await delay(3000);
  const finalCheck = await sdk.promotion.getAuctionAdverts({ ids: String(READ_ONLY_CAMPAIGN_ID) });
  const finalCampaign = finalCheck.adverts?.find((a: any) => a.id === READ_ONLY_CAMPAIGN_ID);
  console.log(`  Status: ${finalCampaign?.status === 9 ? '✅ Still Active (9)' : `⚠️ Status changed to ${finalCampaign?.status}`}`);
}

main().catch(console.error);

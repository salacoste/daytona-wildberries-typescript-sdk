/**
 * Extended Promotion Module Validation with Real Campaign Parameters
 *
 * This script:
 * 1. Fetches all available campaigns
 * 2. Selects one campaign of each type
 * 3. Tests methods that require additional parameters with real data
 */

import 'dotenv/config';
import { WildberriesSDK } from '../src/index.js';

const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  console.error('WB_API_KEY not set');
  process.exit(1);
}

const sdk = new WildberriesSDK({ apiKey });
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

console.log('='.repeat(70));
console.log('  Extended Promotion Validation with Real Campaign Parameters');
console.log('='.repeat(70));

// ══════════════════════════════════════════════════════════════════
// STEP 1: Fetch all campaigns and their details
// ══════════════════════════════════════════════════════════════════

console.log('\n📊 STEP 1: Fetching all campaigns...\n');

const allCampaigns: any[] = [];
const type9Campaigns: any[] = [];
const type8Campaigns: any[] = [];
const mediaCampaigns: any[] = [];

try {
  const countResult = await sdk.promotion.getPromotionCount();
  console.log(`✅ Total campaigns: ${countResult.all ?? 0}`);

  if (countResult.adverts) {
    for (const group of countResult.adverts) {
      console.log(`   Type ${group.type}: ${group.advert_list?.length ?? 0} campaigns`);

      if (group.advert_list) {
        for (const advert of group.advert_list) {
          allCampaigns.push(advert);
          if (group.type === 9) type9Campaigns.push(advert);
          if (group.type === 8) type8Campaigns.push(advert);
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Failed to fetch campaigns:', error);
}

// Fetch media campaigns
try {
  const mediaResult = await sdk.promotion.getAdvAdverts();
  if (mediaResult?.list) {
    mediaCampaigns.push(...mediaResult.list);
    console.log(`   Media campaigns: ${mediaResult.list.length}`);
  }
} catch (error) {
  console.error('❌ Failed to fetch media campaigns:', error);
}

// Fetch calendar promotions
const calendarPromotions: any[] = [];
try {
  const calendarResult = await sdk.promotion.getCalendarPromotions();
  if (Array.isArray(calendarResult) && calendarResult.length > 0) {
    calendarPromotions.push(...calendarResult);
    console.log(`   Calendar promotions: ${calendarResult.length}`);
  }
} catch (error) {
  console.error('❌ Failed to fetch calendar promotions:', error);
}

// ══════════════════════════════════════════════════════════════════
// STEP 2: Select campaigns for testing
// ══════════════════════════════════════════════════════════════════

console.log('\n🎯 STEP 2: Selecting campaigns for testing...\n');

const selectedCampaign = allCampaigns[0];
const selectedType9 = type9Campaigns[0];
const selectedMedia = mediaCampaigns[0];
const selectedCalendar = calendarPromotions[0];

if (selectedCampaign) {
  console.log(
    `✅ Selected campaign: ID=${selectedCampaign.advertId}, Type=${selectedCampaign.type ?? 'unknown'}`
  );
} else {
  console.log('⚠️  No regular campaigns available');
}

if (selectedType9) {
  console.log(`✅ Selected Type 9 campaign: ID=${selectedType9.advertId}`);
} else {
  console.log('⚠️  No Type 9 campaigns available');
}

if (selectedMedia) {
  console.log(
    `✅ Selected media campaign: ID=${selectedMedia.advId ?? selectedMedia.id ?? 'unknown'}`
  );
} else {
  console.log('⚠️  No media campaigns available');
}

if (selectedCalendar) {
  console.log(`✅ Selected calendar promotion: ID=${selectedCalendar.id ?? 'unknown'}`);
} else {
  console.log('⚠️  No calendar promotions available');
}

// ══════════════════════════════════════════════════════════════════
// STEP 3: Test methods with additional parameters
// ══════════════════════════════════════════════════════════════════

console.log('\n🧪 STEP 3: Testing methods with parameters...\n');

const results: { method: string; status: string; detail: string }[] = [];

async function testMethod(name: string, fn: () => Promise<any>, description: string) {
  try {
    await delay(500); // Rate limit protection
    const result = await fn();
    results.push({ method: name, status: '✅ PASS', detail: description });
    console.log(`  ✅ ${name}: ${description}`);
    return result;
  } catch (error: any) {
    const detail = error?.message ?? 'Unknown error';
    results.push({ method: name, status: '❌ FAIL', detail });
    console.log(`  ❌ ${name}: ${detail}`);
    return null;
  }
}

// ── Test 1: getSearchSetPlus (requires Type 9 campaign) ─────────────
if (selectedType9) {
  await testMethod(
    'getSearchSetPlus',
    () => sdk.promotion.getSearchSetPlus({ id: selectedType9.advertId }),
    `Fixed phrases for campaign ${selectedType9.advertId}`
  );
} else {
  console.log('  ⏭️  getSearchSetPlus: SKIPPED (no Type 9 campaign)');
  results.push({ method: 'getSearchSetPlus', status: '⏭️ SKIP', detail: 'No Type 9 campaign' });
}
await delay(1000);

// ── Test 2: getAutoGetnmtoadd (deprecated, Type 8 campaign) ─────────
if (selectedCampaign) {
  await testMethod(
    'getAutoGetnmtoadd',
    () => sdk.promotion.getAutoGetnmtoadd({ id: selectedCampaign.advertId }),
    `Keywords to add for campaign ${selectedCampaign.advertId}`
  );
} else {
  console.log('  ⏭️  getAutoGetnmtoadd: SKIPPED (no campaign)');
  results.push({ method: 'getAutoGetnmtoadd', status: '⏭️ SKIP', detail: 'No campaign' });
}
await delay(1000);

// ── Test 3: getStatWords ─────────────────────────────────────────────
if (selectedCampaign) {
  const result = await testMethod(
    'getStatWords',
    () => sdk.promotion.getStatWords({ id: selectedCampaign.advertId }),
    `Stat words for campaign ${selectedCampaign.advertId}`
  );
  if (result) {
    console.log(`      → Clusters: ${Array.isArray(result) ? result.length : 'N/A'}`);
  }
} else {
  console.log('  ⏭️  getStatWords: SKIPPED (no campaign)');
  results.push({ method: 'getStatWords', status: '⏭️ SKIP', detail: 'No campaign' });
}
await delay(1000);

// ── Test 4: getStatsKeywords ─────────────────────────────────────────
if (selectedCampaign) {
  const endDate = dateStr(0);
  const beginDate = dateStr(7);

  const result = await testMethod(
    'getStatsKeywords',
    () =>
      sdk.promotion.getStatsKeywords({
        id: selectedCampaign.advertId,
        beginDate,
        endDate,
      }),
    `Keyword stats for ${selectedCampaign.advertId} (${beginDate} to ${endDate})`
  );
  if (result) {
    console.log(`      → Data keys: ${Object.keys(result).join(', ')}`);
  }
} else {
  console.log('  ⏭️  getStatsKeywords: SKIPPED (no campaign)');
  results.push({ method: 'getStatsKeywords', status: '⏭️ SKIP', detail: 'No campaign' });
}
await delay(1000);

// ── Test 5: getPromotionsNomenclatures (calendar promotion) ───────────
if (selectedCalendar) {
  const result = await testMethod(
    'getPromotionsNomenclatures',
    () =>
      sdk.promotion.getPromotionsNomenclatures({
        promotionID: selectedCalendar.id ?? 0,
      }),
    `Nomenclatures for promotion ${selectedCalendar.id ?? 'unknown'}`
  );
  if (result) {
    console.log(`      → Nomenclatures: ${Array.isArray(result) ? result.length : 'N/A'}`);
  }
} else {
  console.log('  ⏭️  getPromotionsNomenclatures: SKIPPED (no calendar promotion)');
  results.push({
    method: 'getPromotionsNomenclatures',
    status: '⏭️ SKIP',
    detail: 'No calendar promotion',
  });
}
await delay(1000);

// ── Test 6: createBidsMin (minimum bids) ────────────────────────────────
// First, get supplier subjects to find valid NMs
try {
  console.log('\n📦 Fetching product catalog for createBidsMin test...');
  const subjects = await sdk.promotion.getSupplierSubjects();
  console.log(`  → Found ${subjects.length} subjects`);

  // Try to get actual NMs from subjects
  if (subjects.length > 0 && subjects[0].subjectID) {
    const nmsResult = await sdk.promotion.createSupplierNm({
      subjectId: subjects[0].subjectID,
    });

    if (nmsResult && Array.isArray(nmsResult) && nmsResult.length > 0) {
      const testNm = nmsResult[0].nm;
      console.log(`  → Using NM: ${testNm}`);

      await testMethod(
        'createBidsMin',
        () =>
          sdk.promotion.createBidsMin({
            nm: testNm,
          }),
        `Minimum bid for NM ${testNm}`
      );
    } else {
      console.log('  ⏭️  createBidsMin: SKIPPED (no NMs found)');
      results.push({ method: 'createBidsMin', status: '⏭️ SKIP', detail: 'No NMs found' });
    }
  } else {
    console.log('  ⏭️  createBidsMin: SKIPPED (no subjects)');
    results.push({ method: 'createBidsMin', status: '⏭️ SKIP', detail: 'No subjects' });
  }
} catch (error: any) {
  console.log(`  ❌ createBidsMin setup failed: ${error?.message ?? 'Unknown error'}`);
  results.push({
    method: 'createBidsMin',
    status: '❌ FAIL',
    detail: error?.message ?? 'Setup failed',
  });
}
await delay(1000);

// ── Test 7: getAdvAdvert (media campaign details) ─────────────────────
if (selectedMedia) {
  const mediaId = selectedMedia.advId ?? selectedMedia.id;
  if (mediaId) {
    await testMethod(
      'getAdvAdvert',
      () => sdk.promotion.getAdvAdvert({ id: mediaId }),
      `Media campaign ${mediaId} details`
    );
  } else {
    console.log('  ⏭️  getAdvAdvert: SKIPPED (media campaign has no ID)');
    results.push({ method: 'getAdvAdvert', status: '⏭️ SKIP', detail: 'No media campaign ID' });
  }
} else {
  console.log('  ⏭️  getAdvAdvert: SKIPPED (no media campaign)');
  results.push({ method: 'getAdvAdvert', status: '⏭️ SKIP', detail: 'No media campaign' });
}

// ══════════════════════════════════════════════════════════════════
// STEP 4: Summary
// ══════════════════════════════════════════════════════════════════

console.log('\n' + '='.repeat(70));
console.log('  TEST SUMMARY');
console.log('='.repeat(70) + '\n');

const passed = results.filter((r) => r.status === '✅ PASS').length;
const failed = results.filter((r) => r.status === '❌ FAIL').length;
const skipped = results.filter((r) => r.status === '⏭️ SKIP').length;
const total = results.length;

console.log(`Total tests: ${total}`);
console.log(`✅ Passed:  ${passed} (${((passed / total) * 100).toFixed(1)}%)`);
console.log(`❌ Failed:  ${failed} (${((failed / total) * 100).toFixed(1)}%)`);
console.log(`⏭️  Skipped: ${skipped} (${((skipped / total) * 100).toFixed(1)}%)`);

console.log('\n─ Results ─\n');
for (const result of results) {
  console.log(`  ${result.status.padEnd(10)} ${result.method.padEnd(30)} ${result.detail}`);
}

console.log('\n' + '='.repeat(70));

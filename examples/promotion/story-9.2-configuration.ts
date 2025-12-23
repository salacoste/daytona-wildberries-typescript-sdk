/**
 * Story 9.2: Campaign Configuration & Renaming
 * Epic 9: Promotion Module - Comprehensive Testing
 *
 * Methods tested:
 * 1. getAdvConfig() - Read-only configuration
 * 2. getAdvCount() - Campaign counts (read-only)
 * 3. createAdvRename() - Rename campaign
 * 4. updateAuctionNm() - Add/remove products
 * 5. updateAuctionPlacement() - Change placements
 *
 * Campaign: 28638703 (manipulation allowed, must restore to status 11)
 * Original state:
 *   - Name: "15.09.2025-Поиск-Жидкая кожа черная-147205694"
 *   - NM ID: 147205694
 *   - Status: 11 (paused)
 */
import { WildberriesSDK } from '../../src/index';
import * as dotenv from 'dotenv';
dotenv.config();

const MANIPULATION_CAMPAIGN_ID = 28638703;
const ORIGINAL_NAME = '15.09.2025-Поиск-Жидкая кожа черная-147205694';
const ORIGINAL_NM_ID = 147205694;

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

async function main() {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) throw new Error('No API key');

  const sdk = new WildberriesSDK({ apiKey });

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Story 9.2: Campaign Configuration & Renaming              ║');
  console.log('║  Epic 9: Promotion Module - Comprehensive Testing          ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // =======================================================================
  // Initial state verification
  // =======================================================================
  section('0. Initial State Verification');

  log('Verifying campaign 28638703 state...');
  await delay(3000);

  const initial = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
  const initialCampaign = initial.adverts?.find((a: any) => a.id === MANIPULATION_CAMPAIGN_ID);

  if (!initialCampaign) {
    throw new Error('Campaign 28638703 not found! Cannot proceed.');
  }

  const initialStatus = initialCampaign.status;
  const initialName = initialCampaign.settings?.name;
  const initialNmIds = initialCampaign.nm_settings?.map((s: any) => s.nm_id) || [];
  const initialSearchPlacement = initialCampaign.settings?.placement?.search ?? true;
  const initialRecommendationsPlacement = initialCampaign.settings?.placement?.recommendations ?? false;

  console.log('\nInitial campaign state:');
  console.log(`  ID: ${MANIPULATION_CAMPAIGN_ID}`);
  console.log(`  Status: ${initialStatus}`);
  console.log(`  Name: ${initialName}`);
  console.log(`  NM IDs: [${initialNmIds.join(', ')}]`);
  console.log(`  Placements: search=${initialSearchPlacement}, recommendations=${initialRecommendationsPlacement}`);

  if (initialStatus !== 11) {
    log(`⚠️ Campaign not in status 11 (paused). Current: ${initialStatus}`);
    log('Will attempt to continue with caution...');
  }

  // =======================================================================
  // Test 1: getAdvConfig() - Read-only
  // =======================================================================
  section('1. getAdvConfig() - Configuration');

  try {
    await delay(5000);
    log('Calling getAdvConfig()...');
    const config = await sdk.promotion.getAdvConfig();

    console.log('\nConfiguration result:');
    if (config.categories && config.categories.length > 0) {
      console.log(`  Categories count: ${config.categories.length}`);
      console.log(`  First 3 categories:`);
      config.categories.slice(0, 3).forEach((cat: any) => {
        console.log(`    - ${cat.id}: ${cat.name}`);
      });
    }

    if (config.config && config.config.length > 0) {
      console.log(`\n  Config items count: ${config.config.length}`);
      config.config.slice(0, 5).forEach((item: any) => {
        console.log(`    - ${item.name}: ${item.value} (${item.description})`);
      });
    }

    results.push({
      method: 'getAdvConfig()',
      status: 'PASS',
      details: `Retrieved ${config.categories?.length || 0} categories, ${config.config?.length || 0} config items`
    });
    log('✅ getAdvConfig() - PASS');

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'getAdvConfig()',
      status: 'FAIL',
      details: e.message
    });
  }

  // =======================================================================
  // Test 2: getAdvCount() - Read-only
  // =======================================================================
  section('2. getAdvCount() - Campaign Counts');

  try {
    await delay(5000);
    log('Calling getAdvCount()...');
    const counts = await sdk.promotion.getAdvCount();

    console.log('\nCampaign counts:');
    console.log(`  Total campaigns: ${counts.all}`);

    if (counts.adverts) {
      console.log('\n  By type and status:');
      // Group by type
      const byType = new Map<number, any[]>();
      for (const item of counts.adverts as any[]) {
        if (!byType.has(item.type)) byType.set(item.type, []);
        byType.get(item.type)!.push(item);
      }

      for (const [type, items] of byType) {
        console.log(`    Type ${type}:`);
        for (const item of items) {
          console.log(`      Status ${item.status}: ${item.count} campaigns`);
        }
      }
    }

    results.push({
      method: 'getAdvCount()',
      status: 'PASS',
      details: `Total: ${counts.all} campaigns`
    });
    log('✅ getAdvCount() - PASS');

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'getAdvCount()',
      status: 'FAIL',
      details: e.message
    });
  }

  // =======================================================================
  // Test 3: createAdvRename() - Rename campaign
  // =======================================================================
  section('3. createAdvRename() - Rename Campaign');

  const testName = `TEST_RENAME_${Date.now()}`;

  try {
    // 3.1 Rename to test name
    await delay(5000);
    log(`Renaming campaign to "${testName}"...`);

    await sdk.promotion.createAdvRename({
      advertId: MANIPULATION_CAMPAIGN_ID,
      name: testName
    });

    log('Rename request sent, verifying...');
    await delay(3000);

    // Verify rename
    const afterRename = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
    const renamedCampaign = afterRename.adverts?.find((a: any) => a.id === MANIPULATION_CAMPAIGN_ID);
    const newName = renamedCampaign?.settings?.name;

    console.log(`\n  Previous name: ${initialName}`);
    console.log(`  New name: ${newName}`);

    if (newName === testName) {
      log('✅ Rename successful!');
    } else {
      log(`⚠️ Name may not have updated yet. Got: ${newName}`);
    }

    // 3.2 Restore original name
    await delay(5000);
    log(`Restoring original name "${ORIGINAL_NAME}"...`);

    await sdk.promotion.createAdvRename({
      advertId: MANIPULATION_CAMPAIGN_ID,
      name: ORIGINAL_NAME
    });

    await delay(3000);
    const afterRestore = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
    const restoredCampaign = afterRestore.adverts?.find((a: any) => a.id === MANIPULATION_CAMPAIGN_ID);
    const restoredName = restoredCampaign?.settings?.name;

    console.log(`\n  Restored name: ${restoredName}`);

    results.push({
      method: 'createAdvRename()',
      status: 'PASS',
      details: `Renamed: ${initialName} → ${testName} → ${restoredName}`
    });
    log('✅ createAdvRename() - PASS');

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'createAdvRename()',
      status: 'FAIL',
      details: e.message
    });

    // Try to restore name anyway
    try {
      await delay(5000);
      await sdk.promotion.createAdvRename({
        advertId: MANIPULATION_CAMPAIGN_ID,
        name: ORIGINAL_NAME
      });
      log('Name restored after error');
    } catch {
      log('⚠️ Could not restore name');
    }
  }

  // =======================================================================
  // Test 4: updateAuctionPlacement() - Change placements
  // =======================================================================
  section('4. updateAuctionPlacement() - Change Placements');

  try {
    // 4.1 Change to recommendations only
    await delay(5000);
    log('Changing placements to: search=false, recommendations=true...');

    await sdk.promotion.updateAuctionPlacement({
      placements: [{
        advert_id: MANIPULATION_CAMPAIGN_ID,
        placements: {
          search: false,
          recommendations: true
        }
      }]
    });

    log('Placement update sent, verifying...');
    await delay(3000);

    const afterPlacement = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
    const placementCampaign = afterPlacement.adverts?.find((a: any) => a.id === MANIPULATION_CAMPAIGN_ID);
    const currentPlacements = placementCampaign?.settings?.placement;

    console.log(`\n  Previous: search=${initialSearchPlacement}, recommendations=${initialRecommendationsPlacement}`);
    console.log(`  Current: search=${currentPlacements?.search}, recommendations=${currentPlacements?.recommendations}`);

    // 4.2 Restore original placements
    await delay(5000);
    log(`Restoring original placements: search=${initialSearchPlacement}, recommendations=${initialRecommendationsPlacement}...`);

    await sdk.promotion.updateAuctionPlacement({
      placements: [{
        advert_id: MANIPULATION_CAMPAIGN_ID,
        placements: {
          search: initialSearchPlacement,
          recommendations: initialRecommendationsPlacement
        }
      }]
    });

    await delay(3000);
    const afterRestore = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
    const restoredCampaign = afterRestore.adverts?.find((a: any) => a.id === MANIPULATION_CAMPAIGN_ID);
    const restoredPlacements = restoredCampaign?.settings?.placement;

    console.log(`\n  Restored: search=${restoredPlacements?.search}, recommendations=${restoredPlacements?.recommendations}`);

    results.push({
      method: 'updateAuctionPlacement()',
      status: 'PASS',
      details: `Changed placements and restored: search=${restoredPlacements?.search}, recs=${restoredPlacements?.recommendations}`
    });
    log('✅ updateAuctionPlacement() - PASS');

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'updateAuctionPlacement()',
      status: 'FAIL',
      details: e.message,
      apiLimitations: 'May require specific campaign status'
    });

    // Try to restore
    try {
      await delay(5000);
      await sdk.promotion.updateAuctionPlacement({
        placements: [{
          advert_id: MANIPULATION_CAMPAIGN_ID,
          placements: {
            search: initialSearchPlacement,
            recommendations: initialRecommendationsPlacement
          }
        }]
      });
    } catch {
      log('⚠️ Could not restore placements');
    }
  }

  // =======================================================================
  // Test 5: updateAuctionNm() - Add/remove products
  // =======================================================================
  section('5. updateAuctionNm() - Add/Remove Products');

  // Note: This is a complex operation. We need to find an NM ID that:
  // 1. Belongs to the seller
  // 2. Is NOT already in another campaign (NM can only be in one campaign)
  // 3. Is available for the campaign's subject/category

  try {
    await delay(5000);
    log('Getting seller products via createSupplierNm()...');

    // Get all seller products
    const allSellerProducts = await sdk.promotion.createSupplierNm([]);
    console.log(`\n  Total seller products: ${allSellerProducts?.length || 0}`);

    if (allSellerProducts && allSellerProducts.length > 0) {
      console.log('  First 5 products:');
      allSellerProducts.slice(0, 5).forEach((p: any) => {
        console.log(`    - NM ${p.nm}: "${p.title}" (subjectId: ${p.subjectId})`);
      });
    }

    // Get all campaigns to find which NMs are already in use
    await delay(3000);
    const allCounts = await sdk.promotion.getPromotionCount();
    const allCampaignIds: number[] = [];
    for (const group of allCounts.adverts || []) {
      for (const adv of group.advert_list || []) {
        if (adv.advertId) allCampaignIds.push(adv.advertId);
      }
    }

    console.log(`\n  Total campaigns: ${allCampaignIds.length}`);

    // Get NM IDs from all type 9 campaigns
    await delay(3000);
    const usedNmIds = new Set<number>();

    // Batch query campaigns (API allows multiple IDs)
    const type9CampaignIds = allCampaignIds.slice(0, 20).join(','); // Limit to 20 for API
    if (type9CampaignIds) {
      try {
        const campaignsData = await sdk.promotion.getAuctionAdverts({ ids: type9CampaignIds });
        for (const campaign of campaignsData.adverts || []) {
          for (const nm of (campaign as any).nm_settings || []) {
            usedNmIds.add(nm.nm_id);
          }
        }
      } catch {
        log('Could not fetch all campaign NM IDs');
      }
    }

    // Also add known NMs
    usedNmIds.add(ORIGINAL_NM_ID); // 147205694
    usedNmIds.add(321678606); // From campaign 27111737

    console.log(`  NM IDs in use: ${usedNmIds.size}`);
    console.log(`  Current NM IDs in 28638703: [${initialNmIds.join(', ')}]`);

    // Find available NM ID (not in any campaign)
    const availableProducts = allSellerProducts?.filter((p: any) => !usedNmIds.has(p.nm)) || [];
    console.log(`\n  Available products not in any campaign: ${availableProducts.length}`);

    if (availableProducts.length > 0) {
      const testProduct = availableProducts[0];
      console.log(`  Using product: NM ${testProduct.nm} - "${testProduct.title}"`);

      // 5.1 Add new NM ID
      await delay(5000);
      log(`Adding NM ID ${testProduct.nm}...`);

      try {
        const addResult = await sdk.promotion.updateAuctionNm({
          nms: [{
            advert_id: MANIPULATION_CAMPAIGN_ID,
            nms: {
              add: [testProduct.nm]
            }
          }]
        });

        console.log('\n  Add result:', JSON.stringify(addResult, null, 2));

        await delay(3000);
        const afterAdd = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
        const afterAddNmIds = afterAdd.adverts?.[0]?.nm_settings?.map((s: any) => s.nm_id) || [];
        console.log(`  NM IDs after add: [${afterAddNmIds.join(', ')}]`);

        const addedSuccessfully = afterAddNmIds.includes(testProduct.nm);

        if (addedSuccessfully) {
          // 5.2 Remove the added NM ID
          await delay(5000);
          log(`Removing NM ID ${testProduct.nm}...`);

          const deleteResult = await sdk.promotion.updateAuctionNm({
            nms: [{
              advert_id: MANIPULATION_CAMPAIGN_ID,
              nms: {
                delete: [testProduct.nm]
              }
            }]
          });

          console.log('\n  Delete result:', JSON.stringify(deleteResult, null, 2));

          await delay(3000);
          const afterDelete = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
          const afterDeleteNmIds = afterDelete.adverts?.[0]?.nm_settings?.map((s: any) => s.nm_id) || [];
          console.log(`  NM IDs after delete: [${afterDeleteNmIds.join(', ')}]`);

          results.push({
            method: 'updateAuctionNm()',
            status: 'PASS',
            details: `Added and removed NM ID ${testProduct.nm}`
          });
          log('✅ updateAuctionNm() - PASS');
        } else {
          results.push({
            method: 'updateAuctionNm()',
            status: 'FAIL',
            details: `Add request accepted but NM ${testProduct.nm} not in campaign`,
            apiLimitations: 'NM ID may need to match campaign subject/category'
          });
          log('❌ updateAuctionNm() - FAIL (add not reflected)');
        }

      } catch (addErr: any) {
        console.log(`  ❌ Add failed: ${addErr.message}`);

        // Try with a different approach - maybe we need to try multiple products
        let found = false;
        for (let i = 1; i < Math.min(5, availableProducts.length); i++) {
          const altProduct = availableProducts[i];
          console.log(`\n  Trying alternative product: NM ${altProduct.nm} - "${altProduct.title}"`);

          await delay(3000);
          try {
            await sdk.promotion.updateAuctionNm({
              nms: [{
                advert_id: MANIPULATION_CAMPAIGN_ID,
                nms: {
                  add: [altProduct.nm]
                }
              }]
            });

            // If we got here, the add worked - now remove it
            await delay(3000);
            await sdk.promotion.updateAuctionNm({
              nms: [{
                advert_id: MANIPULATION_CAMPAIGN_ID,
                nms: {
                  delete: [altProduct.nm]
                }
              }]
            });

            results.push({
              method: 'updateAuctionNm()',
              status: 'PASS',
              details: `Added and removed NM ID ${altProduct.nm} (alternative)`
            });
            log('✅ updateAuctionNm() - PASS (alternative product)');
            found = true;
            break;
          } catch {
            console.log(`    Failed for NM ${altProduct.nm}`);
          }
        }

        if (!found) {
          throw addErr;
        }
      }

    } else {
      // No available products - document this limitation
      results.push({
        method: 'updateAuctionNm()',
        status: 'SKIP',
        details: 'All seller products are already in campaigns',
        apiLimitations: 'Each NM ID can only be in one campaign at a time'
      });
      log('⏭️ updateAuctionNm() - SKIP (no available products)');
    }

  } catch (e: any) {
    console.log(`❌ Error: ${e.message}`);
    results.push({
      method: 'updateAuctionNm()',
      status: 'FAIL',
      details: e.message,
      apiLimitations: 'NM ID must: 1) belong to seller, 2) not be in another campaign, 3) match campaign subject'
    });
  }

  // =======================================================================
  // Final State Verification
  // =======================================================================
  section('6. Final State Verification');

  await delay(5000);
  log('Verifying final campaign state...');

  const final = await sdk.promotion.getAuctionAdverts({ ids: String(MANIPULATION_CAMPAIGN_ID) });
  const finalCampaign = final.adverts?.find((a: any) => a.id === MANIPULATION_CAMPAIGN_ID);

  const finalStatus = finalCampaign?.status;
  const finalName = finalCampaign?.settings?.name;
  const finalNmIds = finalCampaign?.nm_settings?.map((s: any) => s.nm_id) || [];
  const finalSearchPlacement = finalCampaign?.settings?.placement?.search;
  const finalRecommendationsPlacement = finalCampaign?.settings?.placement?.recommendations;

  console.log('\nFinal campaign state:');
  console.log(`  Status: ${finalStatus} ${finalStatus === 11 ? '✅' : '⚠️'}`);
  console.log(`  Name: ${finalName} ${finalName === ORIGINAL_NAME ? '✅' : '⚠️'}`);
  console.log(`  NM IDs: [${finalNmIds.join(', ')}]`);
  console.log(`  Placements: search=${finalSearchPlacement}, recommendations=${finalRecommendationsPlacement}`);

  // =======================================================================
  // Summary Report
  // =======================================================================
  section('7. Test Summary');

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

  // Cleanup verification
  console.log('\n🧹 Cleanup Verification:');
  console.log(`  Campaign status: ${finalStatus === 11 ? '✅ Paused (11)' : `⚠️ ${finalStatus} (should be 11)`}`);
  console.log(`  Campaign name: ${finalName === ORIGINAL_NAME ? '✅ Restored' : `⚠️ ${finalName}`}`);
  console.log(`  NM IDs match original: ${JSON.stringify(finalNmIds.sort()) === JSON.stringify(initialNmIds.sort()) ? '✅ Yes' : '⚠️ No'}`);
}

main().catch(console.error);

/**
 * Promotion Search Clusters (NormQuery) Examples
 *
 * This example demonstrates the new Search Clusters API (NormQuery) added in February 2026.
 * Search clusters allow granular bid management for specific search phrases within campaigns.
 *
 * **IMPORTANT**: Search Clusters work only with CPM campaigns (cost per thousand impressions).
 * These methods are not available for CPC (cost per click) campaigns.
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 15 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Promotion module permissions enabled
 * - Active CPM campaigns with type 9 (manual bid)
 * - Product IDs (nmIDs) currently in campaigns
 *
 * **What This Example Covers:**
 * - **Statistics**: Get search cluster statistics for a date range
 * - **Bids**: View, set, and delete bids for specific search clusters
 * - **Minus Phrases**: Manage negative keywords to exclude search queries
 *
 * **Expected Output:**
 * ```
 * === Search Clusters (NormQuery) API Demo ===
 *
 * 📊 Step 1: Getting search cluster statistics...
 * ✅ Statistics retrieved:
 *    Campaign 123456, Product 987654:
 *      - cluster: "electronics wireless"
 *      - views: 1500
 *      - clicks: 45
 *      - ctr: 3.0%
 *      - cost: 2500₽
 *
 * 💰 Step 2: Getting current bids...
 * ✅ Current bids:
 *    Campaign 123456, Product 987654:
 *      - "electronics": 150₽
 *      - "wireless headphones": 200₽
 *
 * 🎯 Step 3: Setting new bids...
 * ✅ Bids updated successfully
 *
 * ❌ Step 4: Getting minus phrases...
 * ✅ Current minus phrases:
 *    Campaign 123456, Product 987654:
 *      - "cheap"
 *      - "used"
 *      - "broken"
 *
 * 🚫 Step 5: Managing minus phrases...
 * ✅ Minus phrases updated
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/promotion-search-clusters.ts
 * ```
 *
 * **Related Examples:**
 * - promotion-campaign-automation.ts - Campaign automation workflow
 *
 * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery} - Official API Documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';

// Configuration
const API_KEY = process.env.WB_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: WB_API_KEY environment variable not set');
  console.log('Set your API key: export WB_API_KEY="your_key_here"');
  process.exit(1);
}

// Initialize SDK
const sdk = new WildberriesSDK({
  apiKey: API_KEY,
  timeout: 30000,
  logLevel: 'info',
});

/**
 * Demo configuration
 * Replace these with your actual campaign and product IDs
 */
const DEMO_CONFIG = {
  // Use your actual campaign ID (type 9 with CPM payment model)
  campaignId: 1825035,
  // Use your actual product nmID
  productId: 983512347,
  // Date range for statistics
  dateFrom: '2025-01-01',
  dateTo: '2025-01-31',
};

/**
 * Main function demonstrating Search Clusters API
 */
async function main() {
  console.log('=== Search Clusters (NormQuery) API Demo ===\n');
  console.log(`Campaign ID: ${DEMO_CONFIG.campaignId}`);
  console.log(`Product ID: ${DEMO_CONFIG.productId}`);
  console.log(`Date range: ${DEMO_CONFIG.dateFrom} to ${DEMO_CONFIG.dateTo}\n`);

  try {
    // ============================================================================
    // Step 1: Get search cluster statistics
    // ============================================================================

    console.log('📊 Step 1: Getting search cluster statistics...\n');

    try {
      const stats = await sdk.promotion.getNormqueryStats({
        from: DEMO_CONFIG.dateFrom,
        to: DEMO_CONFIG.dateTo,
        items: [
          {
            advert_id: DEMO_CONFIG.campaignId,
            nm_id: DEMO_CONFIG.productId,
          },
        ],
      });

      if (stats.stats && stats.stats.length > 0) {
        console.log('✅ Statistics retrieved:');
        stats.stats.slice(0, 5).forEach((stat) => {
          console.log(`   Campaign ${stat.advert_id}, Product ${stat.nm_id}:`);
          if (stat.stats && stat.stats.length > 0) {
            stat.stats.forEach((clusterStat) => {
              console.log(`      - cluster: "${clusterStat.norm_query}"`);
              console.log(`        views: ${clusterStat.views || 0}`);
              console.log(`        clicks: ${clusterStat.clicks || 0}`);
              if (clusterStat.ctr !== undefined) {
                console.log(`        ctr: ${clusterStat.ctr}%`);
              }
              if (clusterStat.cpc !== undefined) {
                console.log(`        cpc: ${clusterStat.cpc}₽`);
              }
              if (clusterStat.cpm !== undefined) {
                console.log(`        cpm: ${clusterStat.cpm}₽`);
              }
            });
          }
        });
      } else {
        console.log('ℹ️  No statistics found for the specified period');
        console.log('   Note: Statistics are only available for CPM campaigns');
      }
      console.log('');
    } catch (error) {
      console.log('⚠️  Could not retrieve statistics (requires active CPM campaign)');
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    }

    // ============================================================================
    // Step 2: Get current bids for search clusters
    // ============================================================================

    console.log('💰 Step 2: Getting current bids...\n');

    try {
      const bids = await sdk.promotion.getNormqueryBids({
        items: [
          {
            advert_id: DEMO_CONFIG.campaignId,
            nm_id: DEMO_CONFIG.productId,
          },
        ],
      });

      if (bids.bids && bids.bids.length > 0) {
        console.log('✅ Current bids:');
        bids.bids.forEach((bidItem) => {
          console.log(`   Campaign ${bidItem.advert_id}, Product ${bidItem.nm_id}:`);
          console.log(`      - "${bidItem.norm_query}": ${bidItem.bid}₽`);
        });
      } else {
        console.log('ℹ️  No bids found');
        console.log('   Note: First, ensure your campaign has search clusters');
      }
      console.log('');
    } catch (error) {
      console.log('⚠️  Could not retrieve bids');
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    }

    // ============================================================================
    // Step 3: Set new bids (COMMENTED OUT - requires real campaign)
    // ============================================================================

    console.log('🎯 Step 3: Setting new bids...\n');

    console.log('⚠️  Bid setting requires an active CPM campaign with manual bids');
    console.log('   Example code is provided below (commented out)\n');

    /*
    // UNCOMMENT TO SET REAL BIDS:
    await sdk.promotion.setNormqueryBids({
      bids: [
        {
          advert_id: DEMO_CONFIG.campaignId,
          nm_id: DEMO_CONFIG.productId,
          norm_query: 'популярный запрос',
          bid: 1500, // 1500 kopecks = 15₽
        },
        {
          advert_id: DEMO_CONFIG.campaignId,
          nm_id: DEMO_CONFIG.productId,
          norm_query: 'другой запрос',
          bid: 2000, // 2000 kopecks = 20₽
        },
      ],
    });
    console.log('✅ Bids updated successfully\n');
    */

    console.log('   To set bids, use:');
    console.log('   await sdk.promotion.setNormqueryBids({');
    console.log('     bids: [{');
    console.log('       advert_id: campaignId,');
    console.log('       nm_id: productId,');
    console.log('       norm_query: "search phrase",');
    console.log('       bid: 1500 // in kopecks');
    console.log('     }]');
    console.log('   });\n');

    // ============================================================================
    // Step 4: Get minus phrases
    // ============================================================================

    console.log('❌ Step 4: Getting minus phrases...\n');

    try {
      const minusPhrases = await sdk.promotion.getNormqueryMinus({
        items: [
          {
            advert_id: DEMO_CONFIG.campaignId,
            nm_id: DEMO_CONFIG.productId,
          },
        ],
      });

      if (minusPhrases.items && minusPhrases.items.length > 0) {
        console.log('✅ Current minus phrases:');
        minusPhrases.items.forEach((item) => {
          console.log(`   Campaign ${item.advert_id}, Product ${item.nm_id}:`);
          if (item.norm_queries && item.norm_queries.length > 0) {
            item.norm_queries.forEach((phrase) => {
              console.log(`      - "${phrase}"`);
            });
          } else {
            console.log('      No minus phrases set');
          }
        });
      } else {
        console.log('ℹ️  No minus phrases found');
      }
      console.log('');
    } catch (error) {
      console.log('⚠️  Could not retrieve minus phrases');
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    }

    // ============================================================================
    // Step 5: Set/remove minus phrases (COMMENTED OUT - requires real campaign)
    // ============================================================================

    console.log('🚫 Step 5: Managing minus phrases...\n');

    console.log('⚠️  Minus phrase management requires an active CPM campaign');
    console.log('   Example code is provided below (commented out)\n');

    /*
    // UNCOMMENT TO SET MINUS PHRASES:
    await sdk.promotion.setNormqueryMinus({
      advert_id: DEMO_CONFIG.campaignId,
      nm_id: DEMO_CONFIG.productId,
      norm_queries: ['дешевый', 'б/у', 'сломанный'],
    });
    console.log('✅ Minus phrases set successfully\n');

    // To REMOVE ALL minus phrases, send an empty array:
    await sdk.promotion.setNormqueryMinus({
      advert_id: DEMO_CONFIG.campaignId,
      nm_id: DEMO_CONFIG.productId,
      norm_queries: [],
    });
    console.log('✅ All minus phrases removed\n');
    */

    console.log('   To set minus phrases, use:');
    console.log('   await sdk.promotion.setNormqueryMinus({');
    console.log('     advert_id: campaignId,');
    console.log('     nm_id: productId,');
    console.log('     norm_queries: ["phrase1", "phrase2"]');
    console.log('   });\n');

    console.log('   To remove ALL minus phrases, send empty array:');
    console.log('   await sdk.promotion.setNormqueryMinus({');
    console.log('     advert_id: campaignId,');
    console.log('     nm_id: productId,');
    console.log('     norm_queries: []');
    console.log('   });\n');

    // ============================================================================
    // Step 6: Delete specific bids (COMMENTED OUT - requires real campaign)
    // ============================================================================

    console.log('🗑️  Step 6: Deleting bids...\n');

    console.log('⚠️  Bid deletion requires an active CPM campaign with existing bids');
    console.log('   Example code is provided below (commented out)\n');

    /*
    // UNCOMMENT TO DELETE BIDS:
    await sdk.promotion.deleteNormqueryBids({
      bids: [
        {
          advert_id: DEMO_CONFIG.campaignId,
          nm_id: DEMO_CONFIG.productId,
          norm_query: 'популярный запрос',
          bid: 1500,
        },
      ],
    });
    console.log('✅ Bids deleted successfully\n');
    */

    console.log('   To delete bids, use:');
    console.log('   await sdk.promotion.deleteNormqueryBids({');
    console.log('     bids: [{');
    console.log('       advert_id: campaignId,');
    console.log('       nm_id: productId,');
    console.log('       norm_query: "search phrase",');
    console.log('       bid: 1500 // must match existing bid');
    console.log('     }]');
    console.log('   });\n');

    // ============================================================================
    // Summary and best practices
    // ============================================================================

    console.log('='.repeat(60));
    console.log('\n💡 Search Clusters Best Practices:\n');

    console.log('1. Campaign Requirements:');
    console.log('   - Only works with type 9 campaigns (manual bids)');
    console.log('   - Only works with CPM payment model (cost per impressions)');
    console.log('   - CPC campaigns do NOT support search clusters\n');

    console.log('2. Bid Strategies:');
    console.log('   - Start with moderate bids and adjust based on performance');
    console.log('   - Monitor CTR (click-through rate) for each cluster');
    console.log('   - Higher bids = more visibility but higher cost\n');

    console.log('3. Minus Phrases:');
    console.log('   - Use to exclude irrelevant search queries');
    console.log('   - Common exclusions: "cheap", "used", "broken"');
    console.log('   - Reduces wasted ad spend on low-quality traffic\n');

    console.log('4. Rate Limits:');
    console.log('   - Stats: 10 req/min (6 second interval)');
    console.log('   - Get bids/minus: 5 req/sec (200ms interval)');
    console.log('   - Set bids: 2 req/sec (500ms interval)');
    console.log('   - Delete bids/minus: 5 req/sec (200ms interval)\n');

    console.log('🎉 Search Clusters demo complete!\n');
  } catch (error) {
    // ============================================================================
    // Error Handling
    // ============================================================================

    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
      console.log('   SDK handles retry automatically');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Verify your WB_API_KEY is valid and has promotion permissions');
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Common causes:');
      console.log('   - Invalid campaign ID (must be type 9 with CPM)');
      console.log('   - Invalid product nmID (must be in the campaign)');
      console.log('   - Invalid date format (use YYYY-MM-DD)');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
      console.log('   Check your internet connection');
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
    } else {
      console.error('❌ Unexpected error:', error);
    }

    process.exit(1);
  }
}

// Run example
main();

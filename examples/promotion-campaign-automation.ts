/**
 * Promotion Campaign Automation - Advertising Campaign Management
 *
 * This comprehensive example demonstrates automated advertising campaign workflows:
 * - Campaign creation with bid configuration (CPM-based advertising)
 * - Performance tracking with KPI monitoring (impressions, clicks, CTR, CPC)
 * - Budget management and allocation optimization
 * - Campaign control (pause, resume, stop operations)
 * - A/B testing strategies for campaign optimization
 * - ROI analysis and cost-per-acquisition (CPA) tracking
 *
 * **IMPORTANT**: This demonstrates **advertising campaigns** (paid promotion in search/catalog),
 * NOT discount promo codes. For promo codes, use separate promo code APIs.
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 25 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Promotion module permissions enabled
 * - Node.js >= 20.0.0 and SDK installed
 * - Product IDs (nmIDs) ready for promotion
 * - Available advertising budget (recommended: start with 5,000₽)
 * - Understanding of CPM (cost per thousand impressions) bidding
 * - 15 minutes execution time for workflow demonstration
 *
 * **What This Example Covers:**
 * - **Campaign Configuration**: Fetch min bids, category restrictions, campaign parameters
 * - **Campaign Creation**: Create single-bid or manual-bid campaigns with products
 * - **Performance Monitoring**: Track impressions, clicks, CTR, CPC, total spend
 * - **Budget Management**: Check balance, add funds, monitor daily spend, set alerts
 * - **Campaign Control**: Pause for review, resume active campaigns, stop permanently
 * - **Optimization Strategies**: CTR analysis, CPA tracking, budget allocation, A/B testing
 * - **ROI Calculation**: Track cost-per-acquisition vs. product price margins
 *
 * **Expected Output:**
 * ```
 * === Wildberries Campaign Automation ===
 * Campaign: Summer Electronics Promotion 2025
 * Initial Budget: 5000₽
 *
 * 📍 Step 1: Fetching campaign configuration...
 * ✅ Campaign Configuration:
 *    min_bid: 100₽
 *    max_products: 100
 *
 * 📍 Step 2: Checking existing campaigns...
 * ✅ Found 15 total campaigns:
 *    Type 8, Status 9: 10 campaigns
 *    Type 9, Status 4: 5 campaigns
 *
 * 📍 Step 3: Creating new campaign...
 * ✅ Campaign created successfully!
 *    Campaign ID: 12345
 *    Name: Summer Electronics Promotion 2025
 *    Budget: 5000₽
 *    Bid: 150₽ CPM
 *
 * 📍 Step 7: Optimization recommendations...
 * 💡 Campaign Optimization Tips:
 *    1. Monitor CTR - if < 1%, consider:
 *       - Improving product images
 *       - Adjusting target keywords
 *    2. Track CPA: Total Cost / Sales
 *       - Aim for CPA < 20% of product price
 *    3. Budget allocation:
 *       - Start small, scale up winners
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/promotion-campaign-automation.ts
 * ```
 *
 * **Related Examples:**
 * - analytics-dashboard.ts - Sales funnel and conversion tracking
 * - tariffs-pricing-calculator.ts - Calculate profit margins for CPA analysis
 * - business-dashboard.ts - Integrated campaign performance dashboards
 *
 * **Common Issues:**
 * - "Campaign not spending budget": Check bid amount may be too low, verify stock levels
 * - "High cost, low conversions": Review pricing vs competitors, improve product details
 * - "Rate limit exceeded": Respect 5 req/sec limit, SDK automatically retries
 * - "Budget depleted quickly": Set daily budget limits, monitor performance hourly
 * - "Invalid product IDs": Ensure nmIDs are active products with stock
 *
 * @see {@link https://dev.wildberries.ru/openapi/promotion} - Official Promotion API Documentation
 * @see {@link https://seller.wildberries.ru/advertising} - Campaign Management Dashboard
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
 * Campaign configuration
 */
interface CampaignConfig {
  name: string;
  productIds: number[]; // nmIDs of products to promote
  initialBudget: number; // in rubles
  bidAmount: number; // CPM (cost per thousand impressions)
  type: number; // Campaign type (8 = single bid, 9 = manual bid)
}

const exampleCampaign: CampaignConfig = {
  name: 'Summer Electronics Promotion 2025',
  productIds: [], // Will be populated from available products
  initialBudget: 5000, // 5000₽
  bidAmount: 150, // 150₽ CPM
  type: 8, // Single bid campaign
};

/**
 * Main function demonstrating campaign automation
 */
async function main() {
  console.log('=== Wildberries Campaign Automation ===\n');
  console.log(`Campaign: ${exampleCampaign.name}`);
  console.log(`Initial Budget: ${exampleCampaign.initialBudget}₽\n`);

  let campaignId: string | undefined;

  try {
    // ============================================================================
    // Step 1: Get configuration parameters (min bids, available categories)
    // ============================================================================

    console.log('📍 Step 1: Fetching campaign configuration...\n');

    const config = await sdk.promotion.getAdvConfig();

    if (!config.config || config.config.length === 0) {
      console.log('⚠️  No configuration data available');
      return;
    }

    console.log('✅ Campaign Configuration:');
    config.config.slice(0, 5).forEach((param) => {
      console.log(`   ${param.name}: ${param.value} - ${param.description}`);
    });
    console.log('');

    if (config.categories && config.categories.length > 0) {
      console.log(`✅ Available Categories: ${config.categories.length}`);
      console.log(`   Example: ${config.categories[0].name} (ID: ${config.categories[0].id})\n`);
    }

    // ============================================================================
    // Step 2: Check existing campaigns
    // ============================================================================

    console.log('📍 Step 2: Checking existing campaigns...\n');

    const campaignCount = await sdk.promotion.getPromotionCount();

    if (campaignCount.adverts && campaignCount.adverts.length > 0) {
      console.log(`✅ Found ${campaignCount.all} total campaigns:`);
      campaignCount.adverts.forEach((group) => {
        console.log(`   Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);
      });
      console.log('');
    } else {
      console.log('ℹ️  No existing campaigns found\n');
    }

    // ============================================================================
    // Step 3: Create new campaign (COMMENTED OUT - requires real product IDs)
    // ============================================================================

    console.log('📍 Step 3: Creating new campaign...\n');

    console.log('⚠️  Campaign creation requires real product IDs (nmIDs)');
    console.log('   This example demonstrates the workflow without creating a real campaign\n');

    // UNCOMMENT TO CREATE REAL CAMPAIGN:
    /*
    campaignId = await sdk.promotion.createAdvSaveAd({
      type: exampleCampaign.type,
      name: exampleCampaign.name,
      sum: exampleCampaign.initialBudget,
      nms: exampleCampaign.productIds,
      cpm: exampleCampaign.bidAmount,
      on_pause: false, // Start immediately
    });

    console.log(`✅ Campaign created successfully!`);
    console.log(`   Campaign ID: ${campaignId}`);
    console.log(`   Name: ${exampleCampaign.name}`);
    console.log(`   Budget: ${exampleCampaign.initialBudget}₽`);
    console.log(`   Bid: ${exampleCampaign.bidAmount}₽ CPM`);
    console.log(`   Products: ${exampleCampaign.productIds.length} items\n`);
    */

    // For demo purposes, use a placeholder ID
    campaignId = 'demo-campaign-12345';
    console.log(`📝 Demo Mode: Using placeholder campaign ID: ${campaignId}\n`);

    // ============================================================================
    // Step 4: Monitor campaign performance (requires real campaign ID)
    // ============================================================================

    console.log('📍 Step 4: Monitoring campaign performance...\n');

    console.log('⚠️  Performance monitoring requires an active campaign');
    console.log('   With a real campaign ID, you can track:\n');
    console.log('   Metrics:');
    console.log('     - Impressions (views)');
    console.log('     - Clicks (CTR)');
    console.log('     - Cost per click (CPC)');
    console.log('     - Cost per thousand impressions (CPM)');
    console.log('     - Total spend');
    console.log('     - Budget remaining\n');

    // UNCOMMENT TO GET REAL STATISTICS:
    /*
    const stats = await sdk.promotion.createAdvFullstats([{
      campaignId: parseInt(campaignId),
    }]);

    console.log('📊 Campaign Performance:');
    console.log(`   Impressions: ${stats.views}`);
    console.log(`   Clicks: ${stats.clicks}`);
    console.log(`   CTR: ${((stats.clicks / stats.views) * 100).toFixed(2)}%`);
    console.log(`   Total Cost: ${stats.cost}₽`);
    console.log(`   Average CPC: ${(stats.cost / stats.clicks).toFixed(2)}₽\n`);
    */

    // ============================================================================
    // Step 5: Budget management (requires real campaign ID)
    // ============================================================================

    console.log('📍 Step 5: Budget management...\n');

    console.log('⚠️  Budget operations require an active campaign');
    console.log('   With a real campaign, you can:\n');
    console.log('   Operations:');
    console.log('     - Check current budget balance');
    console.log('     - Add funds to campaign');
    console.log('     - Monitor daily spend');
    console.log('     - Set budget alerts\n');

    // UNCOMMENT TO MANAGE REAL BUDGET:
    /*
    // Check current budget
    const budget = await sdk.promotion.getAdvBudget({ id: parseInt(campaignId) });
    console.log(`💰 Current Budget:`);
    console.log(`   Cash: ${budget.cash}₽`);
    console.log(`   Netting: ${budget.netting}₽`);
    console.log(`   Total: ${budget.total}₽\n`);

    // Add budget if running low
    if (budget.total && budget.total < 1000) {
      console.log('⚠️  Budget low, adding 2000₽...');
      await sdk.promotion.createBudgetDeposit(
        {
          sum: 2000,
          type: 0,
          return: false,
        },
        { id: parseInt(campaignId) }
      );
      console.log('✅ Budget added successfully\n');
    }
    */

    // ============================================================================
    // Step 6: Campaign control (pause/resume/stop)
    // ============================================================================

    console.log('📍 Step 6: Campaign control...\n');

    console.log('⚠️  Campaign control requires an active campaign');
    console.log('   Available operations:\n');
    console.log('   Control:');
    console.log('     - Pause campaign (temporary stop)');
    console.log('     - Resume campaign (from pause)');
    console.log('     - Stop campaign (permanently end)');
    console.log('     - Adjust bids and budget\n');

    // UNCOMMENT TO CONTROL REAL CAMPAIGN:
    /*
    // Pause campaign for review
    console.log('⏸️  Pausing campaign for review...');
    await sdk.promotion.getAdvPause({ id: parseInt(campaignId) });
    console.log('✅ Campaign paused\n');

    // Wait for review (in real scenario)
    console.log('📊 Reviewing performance metrics...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Resume campaign
    console.log('▶️  Resuming campaign...');
    await sdk.promotion.getAdvStart({ id: parseInt(campaignId) });
    console.log('✅ Campaign resumed\n');
    */

    // ============================================================================
    // Step 7: Optimization recommendations
    // ============================================================================

    console.log('📍 Step 7: Optimization recommendations...\n');

    console.log('💡 Campaign Optimization Tips:');
    console.log('   1. Monitor CTR - if < 1%, consider:');
    console.log('      - Improving product images and descriptions');
    console.log('      - Adjusting target keywords');
    console.log('      - Testing different bid amounts\n');

    console.log('   2. Track Cost Per Acquisition (CPA):');
    console.log('      - CPA = Total Campaign Cost / Number of Sales');
    console.log('      - Aim for CPA < 20% of product price\n');

    console.log('   3. Budget allocation:');
    console.log('      - Start with smaller daily budget');
    console.log('      - Scale up campaigns with good ROI');
    console.log('      - Pause underperforming campaigns\n');

    console.log('   4. A/B Testing:');
    console.log('      - Create multiple campaigns with different bids');
    console.log('      - Test different product combinations');
    console.log('      - Compare performance metrics\n');

    console.log('🎉 Campaign automation workflow complete!\n');

    // ============================================================================
    // Common Issues Section
    // ============================================================================

    console.log('📚 Common Issues and Solutions:\n');
    console.log('1. "Campaign not spending budget"');
    console.log('   → Check bid amount - may be too low');
    console.log('   → Verify products are in stock');
    console.log('   → Ensure campaign is active (not paused)\n');

    console.log('2. "High cost, low conversions"');
    console.log('   → Review product pricing vs competitors');
    console.log('   → Improve product descriptions and images');
    console.log('   → Target more specific keywords\n');

    console.log('3. "Rate limit exceeded"');
    console.log('   → SDK automatically retries with exponential backoff');
    console.log('   → Respect 5 req/sec limit for campaign operations\n');

    console.log('4. "Budget depleted quickly"');
    console.log('   → Set daily budget limits');
    console.log('   → Monitor performance hourly initially');
    console.log('   → Adjust bids based on ROI\n');
  } catch (error) {
    // ============================================================================
    // Error Handling with specific error types
    // ============================================================================

    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Automatic retry in ${error.retryAfter}ms`);
      console.log('   Promotion API limits: 5 requests per second');
      console.log('   SDK handles retry automatically');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Troubleshooting:');
      console.log('   1. Verify WB_API_KEY environment variable');
      console.log('   2. Check API key is active in seller dashboard');
      console.log('   3. Ensure API key has promotion permissions');
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Common causes:');
      console.log('   - Invalid product IDs (nmIDs)');
      console.log('   - Bid amount below minimum');
      console.log('   - Budget amount too low');
      console.log('   - Missing required fields');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
      console.log('   Troubleshooting:');
      console.log('   1. Check internet connection');
      console.log('   2. Verify Wildberries API status');
      console.log('   3. Try again in a few moments');
      console.log('   4. Check firewall settings');
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
      console.log('   Check API documentation for error details');
      console.log('   Common API errors:');
      console.log('   - 400: Invalid request parameters');
      console.log('   - 403: Insufficient permissions');
      console.log('   - 404: Campaign or resource not found');
      console.log('   - 422: Validation failed');
    } else {
      console.error('❌ Unexpected error:', error);
    }

    process.exit(1);
  }
}

// Run example
main();

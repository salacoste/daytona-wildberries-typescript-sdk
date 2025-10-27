/**
 * Tariffs Pricing Calculator - Complete Cost and Payout Analysis
 *
 * This comprehensive example demonstrates calculating seller costs and net payout:
 * - Category-specific commission rates retrieval (FBS, FBW, DBS, C&C)
 * - Storage tariffs calculation (per liter, per day)
 * - Logistics costs analysis (delivery and return shipping)
 * - Complete fee breakdown with total cost calculation
 * - Net seller payout computation with margin analysis
 * - Cost optimization recommendations and break-even analysis
 * - Fulfillment model comparison for profitability
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 20 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Tariffs module permissions enabled
 * - Node.js >= 20.0.0 and SDK installed
 * - Product category and price information
 * - Product dimensions (for storage and delivery calculations)
 * - Understanding of WB fulfillment models (FBS, FBW, DBS, C&C)
 * - 10 minutes execution time for complete analysis
 *
 * **What This Example Covers:**
 * - **Commission Rates**: Category-specific rates for all fulfillment models
 * - **Storage Costs**: Daily storage fees per liter calculation
 * - **Delivery Fees**: Customer delivery and marketplace logistics costs
 * - **Return Costs**: Return shipping tariffs for different scenarios
 * - **Total Cost Breakdown**: Comprehensive fee analysis with percentages
 * - **Net Payout Calculation**: Final seller revenue after all fees
 * - **Optimization Analysis**: Compare fulfillment models, identify savings opportunities
 *
 * **Expected Output:**
 * ```
 * === Wildberries Tariffs Pricing Calculator ===
 * Product: Wireless Headphones
 * Sale Price: 5000₽
 * Fulfillment Model: FBS
 *
 * 📍 Step 1: Fetching commission rates...
 * ✅ Commission Data for Category: Electronics
 *    Commission Rates:
 *      FBS (Marketplace): 15.0%
 *      FBW (WB Warehouse): 18.0%
 *      DBS (Store Display): 12.0%
 *      C&C (Store Pickup): 10.0%
 *
 * 📍 Step 2: Fetching storage and delivery tariffs...
 * ✅ Tariffs for Warehouse: Moscow
 *    Box Rates:
 *      Storage (first liter/day): 5.00₽
 *      Delivery to Customer: 45.00₽
 *
 * 📍 Step 4: Calculating costs and net payout...
 * 💰 Cost Breakdown:
 * ─────────────────────────────────
 *    Sale Price: 5000.00₽
 *    Commission (15.0%): -750.00₽
 *    Storage (30 days × 2.0L): -300.00₽
 *    Delivery Fee: -90.00₽
 * ─────────────────────────────────
 *    Total Fees: -1140.00₽
 * ═════════════════════════════════
 *    Net Seller Payout: 3860.00₽ (77.2%)
 * ═════════════════════════════════
 *
 * 📍 Step 5: Cost optimization analysis...
 * 💡 Optimization Tips:
 *    ✓ Switching to FBW could increase profit by 150.00₽
 *    ✓ Storage costs 10.00₽/day - faster turnover reduces costs
 *    ✓ Break-even price: 1140.00₽
 *    ✓ Recommended minimum price: 1368.00₽ (20% margin)
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/tariffs-pricing-calculator.ts
 * ```
 *
 * **Related Examples:**
 * - complete-product-workflow.ts - Product creation with pricing
 * - financial-reconciliation.ts - Revenue and cost reconciliation
 * - business-dashboard.ts - Profit margin tracking
 *
 * **Common Issues:**
 * - "No tariff data available": Category may not have configured tariffs
 * - "Commission rates seem high": Different models have different rates - compare all options
 * - "Storage costs accumulating": Reduce inventory turnover time to minimize storage fees
 * - "Break-even price too high": Consider negotiating better commission rates or optimizing shipping
 * - "Rate limit exceeded": SDK automatically retries, respect API limits
 *
 * @see {@link https://dev.wildberries.ru/openapi/tariffs} - Official Tariffs API Documentation
 * @see {@link https://seller.wildberries.ru/dynamic-product-categories} - Category Tariffs Reference
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
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
 * Example product for pricing calculation
 */
interface ProductPricingInput {
  name: string;
  categoryName: string;
  salePrice: number; // in rubles
  volume: number; // in liters (for storage calculation)
  storageDays: number; // expected storage duration
  fulfillmentModel: 'FBS' | 'FBW' | 'DBS' | 'C&C';
}

const exampleProduct: ProductPricingInput = {
  name: 'Wireless Headphones',
  categoryName: 'Electronics',
  salePrice: 5000, // 5000₽
  volume: 2.0, // 2 liters
  storageDays: 30, // 30 days
  fulfillmentModel: 'FBS', // Fulfillment by Seller
};

/**
 * Main function demonstrating tariffs pricing calculator
 */
async function main() {
  console.log('=== Wildberries Tariffs Pricing Calculator ===\n');
  console.log(`Product: ${exampleProduct.name}`);
  console.log(`Sale Price: ${exampleProduct.salePrice}₽`);
  console.log(`Fulfillment Model: ${exampleProduct.fulfillmentModel}\n`);

  try {
    // ============================================================================
    // Step 1: Get commission rates for product category
    // ============================================================================

    console.log('📍 Step 1: Fetching commission rates...\n');

    const commissionData = await sdk.tariffs.getTariffsCommission();

    if (!commissionData.report || commissionData.report.length === 0) {
      console.log('⚠️  No commission data available');
      return;
    }

    // Find commission for the product category (example: first entry)
    const categoryCommission = commissionData.report[0];

    console.log(`✅ Commission Data for Category: ${categoryCommission.parentName || 'N/A'}`);
    console.log(`   Category ID: ${categoryCommission.parentID}`);
    console.log('   Commission Rates:');
    // Type guard to safely access commission properties
    console.log(`     FBS (Marketplace): ${'kgvpMarketplace' in categoryCommission ? categoryCommission.kgvpMarketplace : 'N/A'}%`);
    console.log(`     FBW (WB Warehouse): ${'paidStorageKgvp' in categoryCommission ? categoryCommission.paidStorageKgvp : 'N/A'}%`);
    console.log(`     DBS (Store Display): ${'kgvpSupplier' in categoryCommission ? categoryCommission.kgvpSupplier : 'N/A'}%`);
    console.log(`     C&C (Store Pickup): ${'kgvpPickup' in categoryCommission ? categoryCommission.kgvpPickup : 'N/A'}%\n`);

    // ============================================================================
    // Step 2: Get storage and delivery tariffs
    // ============================================================================

    console.log('📍 Step 2: Fetching storage and delivery tariffs...\n');

    const boxTariffs = await sdk.tariffs.getTariffsBox();

    if (!boxTariffs.response?.data || boxTariffs.response.data.warehouseList.length === 0) {
      console.log('⚠️  No box tariff data available');
      return;
    }

    // Get first warehouse tariff as example
    const warehouseTariff = boxTariffs.response.data.warehouseList[0];

    console.log(`✅ Tariffs for Warehouse: ${warehouseTariff.warehouseName}`);
    console.log('   Box Rates:');
    console.log(`     Storage (first liter/day): ${warehouseTariff.boxStorageBase}₽`);
    console.log(`     Delivery to Customer (first liter): ${warehouseTariff.boxDeliveryBase}₽`);
    console.log(`     Delivery FBS (first liter): ${warehouseTariff.boxDeliveryMarketplaceBase}₽\n`);

    // ============================================================================
    // Step 3: Get return shipping tariffs
    // ============================================================================

    console.log('📍 Step 3: Fetching return shipping tariffs...\n');

    const returnTariffs = await sdk.tariffs.getTariffsReturn();

    if (!returnTariffs.response?.data || returnTariffs.response.data.warehouseList.length === 0) {
      console.log('⚠️  No return tariff data available');
      return;
    }

    const returnWarehouse = returnTariffs.response.data.warehouseList[0];

    console.log(`✅ Return Tariffs for Warehouse: ${returnWarehouse.warehouseName}`);
    console.log(`   Return to pickup point (base): ${returnWarehouse.deliveryDumpSupOfficeBase}₽/liter`);
    console.log(`   Return by courier (base): ${returnWarehouse.deliveryDumpSupCourierBase}₽/liter`);
    console.log(`   Uncollected return delivery: ${returnWarehouse.deliveryDumpSupReturnExpr}₽/item\n`);

    // ============================================================================
    // Step 4: Calculate total costs and net payout
    // ============================================================================

    console.log('📍 Step 4: Calculating costs and net payout...\n');

    // Select commission rate based on fulfillment model
    let commissionRate = 0;
    switch (exampleProduct.fulfillmentModel) {
      case 'FBS':
        commissionRate = 'kgvpMarketplace' in categoryCommission ? (categoryCommission.kgvpMarketplace || 0) : 0;
        break;
      case 'FBW':
        commissionRate = 'paidStorageKgvp' in categoryCommission ? (categoryCommission.paidStorageKgvp || 0) : 0;
        break;
      case 'DBS':
        commissionRate = 'kgvpSupplier' in categoryCommission ? (categoryCommission.kgvpSupplier || 0) : 0;
        break;
      case 'C&C':
        commissionRate = 'kgvpPickup' in categoryCommission ? (categoryCommission.kgvpPickup || 0) : 0;
        break;
    }

    // Calculate costs (parse string prices to numbers)
    const storageRatePerLiter = parseFloat(warehouseTariff.boxStorageBase || '0');
    const deliveryFeePerLiter = parseFloat(warehouseTariff.boxDeliveryBase || '0');

    const commissionAmount = (exampleProduct.salePrice * commissionRate) / 100;
    const storageTotal = storageRatePerLiter * exampleProduct.volume * exampleProduct.storageDays;
    const deliveryFee = deliveryFeePerLiter * exampleProduct.volume;
    const totalFees = commissionAmount + storageTotal + deliveryFee;
    const netPayout = exampleProduct.salePrice - totalFees;
    const payoutPercentage = (netPayout / exampleProduct.salePrice) * 100;

    console.log('💰 Cost Breakdown:');
    console.log('─────────────────────────────────');
    console.log(`   Sale Price: ${exampleProduct.salePrice.toFixed(2)}₽`);
    console.log(`   Commission (${commissionRate}%): -${commissionAmount.toFixed(2)}₽`);
    console.log(`   Storage (${exampleProduct.storageDays} days × ${exampleProduct.volume}L): -${storageTotal.toFixed(2)}₽`);
    console.log(`   Delivery Fee: -${deliveryFee.toFixed(2)}₽`);
    console.log('─────────────────────────────────');
    console.log(`   Total Fees: -${totalFees.toFixed(2)}₽`);
    console.log('═════════════════════════════════');
    console.log(`   Net Seller Payout: ${netPayout.toFixed(2)}₽ (${payoutPercentage.toFixed(1)}%)`);
    console.log('═════════════════════════════════\n');

    // ============================================================================
    // Step 5: Cost optimization analysis
    // ============================================================================

    console.log('📍 Step 5: Cost optimization analysis...\n');

    console.log('💡 Optimization Tips:');

    // Check if FBW might be more profitable
    if (exampleProduct.fulfillmentModel === 'FBS' && 'paidStorageKgvp' in categoryCommission) {
      const fbwCommissionRate = categoryCommission.paidStorageKgvp || 0;
      const fbwCommission = (exampleProduct.salePrice * fbwCommissionRate) / 100;
      const fbwTotal = fbwCommission + storageTotal + deliveryFee;
      const fbwPayout = exampleProduct.salePrice - fbwTotal;

      if (fbwPayout > netPayout) {
        console.log(`   ✓ Switching to FBW could increase profit by ${(fbwPayout - netPayout).toFixed(2)}₽`);
      } else {
        console.log(`   ✓ Current FBS model is optimal (${(netPayout - fbwPayout).toFixed(2)}₽ better than FBW)`);
      }
    }

    // Storage optimization
    const storagePerDay = storageTotal / exampleProduct.storageDays;
    console.log(`   ✓ Storage costs ${storagePerDay.toFixed(2)}₽/day - faster turnover reduces costs`);

    // Price threshold
    const breakEvenPrice = totalFees;
    const recommendedMinPrice = breakEvenPrice * 1.2; // 20% markup
    console.log(`   ✓ Break-even price: ${breakEvenPrice.toFixed(2)}₽`);
    console.log(`   ✓ Recommended minimum price: ${recommendedMinPrice.toFixed(2)}₽ (20% margin)`);

    console.log('\n🎉 Pricing calculation complete!');
    console.log('─────────────────────────────────────────────────────\n');

    // ============================================================================
    // Common Issues Section
    // ============================================================================

    console.log('📚 Common Issues and Solutions:\n');
    console.log('1. "Rate Limit Exceeded"');
    console.log('   → SDK automatically retries with exponential backoff');
    console.log('   → Wait for retry or reduce request frequency\n');
    console.log('2. "No tariff data available"');
    console.log('   → Category may not have tariff data configured');
    console.log('   → Check seller dashboard for category-specific tariffs\n');
    console.log('3. "Commission rates seem high"');
    console.log('   → Different fulfillment models have different rates');
    console.log('   → Compare FBS vs FBW vs DBS to optimize costs\n');
  } catch (error) {
    // ============================================================================
    // Error Handling with specific error types
    // ============================================================================

    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Automatic retry in ${error.retryAfter}ms`);
      console.log('   SDK handles retry automatically with exponential backoff');
      // Optional: implement custom retry logic here
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Check your API key:');
      console.log('   1. Verify WB_API_KEY environment variable is set');
      console.log('   2. Ensure API key is active in seller dashboard');
      console.log('   3. Check API key has correct permissions');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
      console.log('   Troubleshooting steps:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify Wildberries API status');
      console.log('   3. Try again in a few moments');
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
      console.log('   Check API documentation for error details');
    } else {
      console.error('❌ Unexpected error:', error);
    }

    process.exit(1);
  }
}

// Run example
main();

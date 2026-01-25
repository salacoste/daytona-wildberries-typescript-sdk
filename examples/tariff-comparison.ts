/**
 * Tariff Comparison - Compare Inventory vs Supply Tariffs
 *
 * This example demonstrates how to use the compareTariffs utility
 * to compare costs between inventory storage (tariffs/box) and supply
 * acceptance (acceptance/coefficients) APIs.
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 10 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Tariffs and OrdersFBW module permissions enabled
 * - npm install wb-api-sdk
 *
 * **What This Example Covers:**
 * - Using compareTariffs utility function
 * - Understanding the difference between inventory and supply tariffs
 * - Interpreting recommendation results (SUPPLY_CHEAPER, INVENTORY_CHEAPER, EQUAL)
 * - Making data-driven fulfillment decisions
 *
 * **Key Concepts:**
 * - **Inventory Storage (tariffs/box)**: Tariffs for goods already in WB warehouses
 * - **Supply Acceptance (acceptance/coefficients)**: Tariffs for new shipments to WB
 * - **Recommendation**: Which option is more cost-effective based on base rates
 *
 * **Expected Output:**
 * ```
 * === Tariff Comparison Tool ===
 *
 * Comparing tariffs for: Koledino
 *
 * Inventory Storage Tariffs:
 *   Delivery base: 45.00 RUB/L
 *   Storage base: 5.00 RUB/L/day
 *
 * Supply Acceptance Tariffs:
 *   Delivery base: 40.00 RUB/L
 *   Storage base: 4.50 RUB/L/day
 *
 * Difference:
 *   Delivery: -11.1% (supply is cheaper)
 *   Storage: -10.0% (supply is cheaper)
 *
 * RECOMMENDATION: SUPPLY_CHEAPER
 *   -> Use FBW supply for lower overall costs
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * npx tsx examples/tariff-comparison.ts
 * ```
 *
 * **Related Examples:**
 * - supplies-planning.ts - Complete supply planning workflow
 * - supply-cost-calculator.ts - Calculate actual supply costs
 * - tariffs-pricing-calculator.ts - Calculate seller payout
 *
 * @see {@link https://dev.wildberries.ru/openapi/tariffs} - Official Tariffs API documentation
 * @see {@link https://dev.wildberries.ru/openapi/fbw-api} - Official FBW API documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  NetworkError,
  WBAPIError,
  compareTariffs,
  type TariffComparison,
  type TariffRecommendation,
} from '../src';

// Configuration
const API_KEY = process.env.WB_API_KEY;

if (!API_KEY) {
  console.error('Error: WB_API_KEY environment variable not set');
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
 * List of popular warehouses to compare
 * These are major WB fulfillment centers
 */
const WAREHOUSES_TO_COMPARE = ['Коледино', 'Казань', 'Краснодар', 'Екатеринбург', 'Новосибирск'];

/**
 * Interpret and explain the recommendation
 */
function explainRecommendation(recommendation: TariffRecommendation): string {
  switch (recommendation) {
    case 'SUPPLY_CHEAPER':
      return 'FBW supply has lower base costs. Consider sending new shipments via supply acceptance.';
    case 'INVENTORY_CHEAPER':
      return 'Existing inventory storage is cheaper. Consider keeping goods at current warehouse.';
    case 'EQUAL':
      return 'Costs are similar. Choose based on operational factors (delivery speed, location, capacity).';
  }
}

/**
 * Display formatted comparison result
 */
function displayComparison(comparison: TariffComparison): void {
  console.log(`\nWarehouse: ${comparison.warehouseName}`);
  console.log('='.repeat(50));

  // Inventory tariffs
  console.log('\nInventory Storage Tariffs (tariffs/box API):');
  if (comparison.inventory.found) {
    console.log(`  Delivery base:     ${comparison.inventory.deliveryBase.toFixed(2)} RUB/L`);
    console.log(`  Delivery coef:     ${comparison.inventory.deliveryCoef}%`);
    console.log(`  Storage base:      ${comparison.inventory.storageBase.toFixed(2)} RUB/L/day`);
    console.log(`  Storage coef:      ${comparison.inventory.storageCoef}%`);
  } else {
    console.log('  Not found in inventory storage API');
  }

  // Supply tariffs
  console.log('\nSupply Acceptance Tariffs (acceptance/coefficients API):');
  if (comparison.supply.found) {
    console.log(`  Delivery base:     ${comparison.supply.deliveryBase.toFixed(2)} RUB/L`);
    console.log(`  Delivery coef:     ${comparison.supply.deliveryCoef}%`);
    console.log(`  Storage base:      ${comparison.supply.storageBase.toFixed(2)} RUB/L/day`);
    console.log(`  Storage coef:      ${comparison.supply.storageCoef}%`);
  } else {
    console.log('  Not found in supply acceptance API');
  }

  // Differences
  if (comparison.inventory.found && comparison.supply.found) {
    console.log('\nDifference (Supply vs Inventory):');

    const deliveryDiff = comparison.difference.deliveryBasePercent;
    const storageDiff = comparison.difference.storageBasePercent;

    const deliveryIndicator =
      deliveryDiff < 0 ? '(supply cheaper)' : deliveryDiff > 0 ? '(inventory cheaper)' : '(equal)';
    const storageIndicator =
      storageDiff < 0 ? '(supply cheaper)' : storageDiff > 0 ? '(inventory cheaper)' : '(equal)';

    console.log(
      `  Delivery base:     ${deliveryDiff >= 0 ? '+' : ''}${deliveryDiff.toFixed(1)}% ${deliveryIndicator}`
    );
    console.log(
      `  Storage base:      ${storageDiff >= 0 ? '+' : ''}${storageDiff.toFixed(1)}% ${storageIndicator}`
    );
  }

  // Recommendation
  console.log('\n' + '-'.repeat(50));
  console.log(`RECOMMENDATION: ${comparison.recommendation}`);
  console.log(`  ${explainRecommendation(comparison.recommendation)}`);
}

/**
 * Main tariff comparison workflow
 */
async function main() {
  console.log('=== Tariff Comparison Tool ===\n');
  console.log('Compares inventory storage vs supply acceptance tariffs');
  console.log('to help you decide the most cost-effective fulfillment option.\n');

  try {
    // ============================================================================
    // Step 1: Fetch tariff data from both APIs
    // ============================================================================
    console.log('Step 1: Fetching tariff data...\n');

    // Get box tariffs (inventory storage)
    console.log('  Fetching inventory storage tariffs (tariffs/box)...');
    const boxTariffs = await sdk.tariffs.getTariffsBox();
    const boxTariffList = boxTariffs.response?.data?.warehouseList ?? [];
    console.log(`  Found ${boxTariffList.length} warehouses in box tariffs\n`);

    // Get acceptance coefficients (supply tariffs)
    console.log('  Fetching supply acceptance tariffs (acceptance/coefficients)...');
    const acceptanceCoefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
    console.log(`  Found ${acceptanceCoefficients.length} coefficient records\n`);

    // ============================================================================
    // Step 2: Compare tariffs for each warehouse
    // ============================================================================
    console.log('Step 2: Comparing tariffs for popular warehouses...\n');

    const results: TariffComparison[] = [];
    const today = new Date().toISOString().split('T')[0];

    for (const warehouseName of WAREHOUSES_TO_COMPARE) {
      try {
        const comparison = await compareTariffs(
          { warehouseName, date: today },
          async () => boxTariffList,
          async () => acceptanceCoefficients
        );
        results.push(comparison);
      } catch (error) {
        if (error instanceof Error) {
          console.log(`  Warehouse "${warehouseName}": ${error.message}`);
        }
      }
    }

    console.log(`Successfully compared ${results.length} warehouses`);

    // ============================================================================
    // Step 3: Display detailed comparison for each warehouse
    // ============================================================================
    console.log('\n' + '='.repeat(60));
    console.log('DETAILED TARIFF COMPARISON');
    console.log('='.repeat(60));

    for (const comparison of results) {
      displayComparison(comparison);
      console.log('');
    }

    // ============================================================================
    // Step 4: Summary and recommendations
    // ============================================================================
    console.log('='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60) + '\n');

    // Count recommendations
    const supplyCheaper = results.filter((r) => r.recommendation === 'SUPPLY_CHEAPER').length;
    const inventoryCheaper = results.filter((r) => r.recommendation === 'INVENTORY_CHEAPER').length;
    const equal = results.filter((r) => r.recommendation === 'EQUAL').length;

    console.log('Recommendation Summary:');
    console.log(`  Supply cheaper:     ${supplyCheaper} warehouses`);
    console.log(`  Inventory cheaper:  ${inventoryCheaper} warehouses`);
    console.log(`  Equal costs:        ${equal} warehouses`);

    // Find best warehouses for each category
    if (supplyCheaper > 0) {
      console.log('\nBest warehouses for new supplies (lowest supply costs):');
      const supplyWarehouses = results
        .filter((r) => r.recommendation === 'SUPPLY_CHEAPER')
        .sort(
          (a, b) =>
            a.supply.deliveryBase +
            a.supply.storageBase -
            (b.supply.deliveryBase + b.supply.storageBase)
        );

      supplyWarehouses.slice(0, 3).forEach((wh, i) => {
        console.log(`  ${i + 1}. ${wh.warehouseName}`);
      });
    }

    if (inventoryCheaper > 0) {
      console.log('\nBest warehouses for inventory storage:');
      const inventoryWarehouses = results
        .filter((r) => r.recommendation === 'INVENTORY_CHEAPER')
        .sort(
          (a, b) =>
            a.inventory.deliveryBase +
            a.inventory.storageBase -
            (b.inventory.deliveryBase + b.inventory.storageBase)
        );

      inventoryWarehouses.slice(0, 3).forEach((wh, i) => {
        console.log(`  ${i + 1}. ${wh.warehouseName}`);
      });
    }

    // ============================================================================
    // Step 5: Decision-making guidance
    // ============================================================================
    console.log('\n' + '='.repeat(60));
    console.log('DECISION GUIDANCE');
    console.log('='.repeat(60) + '\n');

    console.log('When to use SUPPLY ACCEPTANCE (FBW):');
    console.log('  - Lower base costs indicated by comparison');
    console.log('  - Sending new inventory to WB warehouses');
    console.log('  - Planning large shipments to reduce per-unit costs');
    console.log('  - Free acceptance dates available (coefficient = 0)');

    console.log('\nWhen to use INVENTORY STORAGE:');
    console.log('  - Goods already in WB warehouses');
    console.log('  - Lower storage costs indicated by comparison');
    console.log('  - Quick restocking from existing inventory');
    console.log('  - Avoiding acceptance fees during high-coefficient periods');

    console.log('\nImportant considerations:');
    console.log('  - These are BASE rates; actual costs depend on coefficients');
    console.log('  - Check acceptance coefficients before planning supplies');
    console.log('  - Free acceptance (coefficient = 0) can dramatically reduce costs');
    console.log('  - Transit warehouses may offer additional savings');
    console.log('  - Storage duration significantly impacts total cost');

    console.log('\n=== Tariff Comparison Complete ===\n');
  } catch (error) {
    console.error('\nError during tariff comparison:');

    if (error instanceof RateLimitError) {
      console.error(`  Rate limit exceeded: ${error.message}`);
      console.error(`  Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error(`  Authentication failed: ${error.message}`);
      console.error('  Check your API key');
    } else if (error instanceof NetworkError) {
      console.error(`  Network error: ${error.message}`);
    } else if (error instanceof WBAPIError) {
      console.error(`  API error (${error.statusCode}): ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`  Unexpected error: ${error.message}`);
    }

    process.exit(1);
  }
}

// Run the comparison
main()
  .then(() => {
    console.log('Tariff comparison completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Tariff comparison failed:', error);
    process.exit(1);
  });

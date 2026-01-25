/**
 * Supply Planning - Complete FBW Supply Planning Workflow
 *
 * This comprehensive example demonstrates supply planning with the new Epic 11 utilities:
 * - Getting acceptance coefficients for specific warehouses
 * - Finding optimal dates with free acceptance (coefficient = 0)
 * - Calculating costs for different supply scenarios
 * - Comparing FBW vs FBS costs using tariff comparison
 * - Making data-driven supply decisions
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 25 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersFBW and Tariffs module permissions enabled
 * - Node.js >= 20.0.0 and SDK installed
 *
 * **What This Example Covers:**
 * - **Warehouse Analysis**: Get all WB warehouses with acceptance info
 * - **Coefficient Analysis**: Find free acceptance dates (coefficient = 0)
 * - **Cost Calculation**: Use calculateSupplyCost utility for accurate cost estimation
 * - **Tariff Comparison**: Compare FBW supply vs inventory storage costs
 * - **Decision Making**: Choose optimal warehouse and timing for supplies
 *
 * **Expected Output:**
 * ```
 * === Supply Planning Workflow ===
 *
 * Step 1: Getting available warehouses...
 * Found 15 active warehouses
 *
 * Step 2: Checking acceptance coefficients...
 * Free acceptance dates found: 5 days
 *
 * Step 3: Calculating supply costs...
 * Supply Cost Breakdown:
 *   Acceptance: 0 RUB (free)
 *   Storage (30 days): 150 RUB
 *   Logistics: 45 RUB
 *   Total: 195 RUB
 *
 * Step 4: Comparing FBW vs FBS...
 * Recommendation: SUPPLY_CHEAPER
 *
 * Best supply strategy:
 *   Warehouse: Koledino
 *   Date: 2025-01-28
 *   Estimated Cost: 195 RUB
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * npx tsx examples/supplies-planning.ts
 * ```
 *
 * **Related Examples:**
 * - supply-cost-calculator.ts - Focused on cost calculations
 * - tariff-comparison.ts - Focused on tariff analysis
 * - orders-fbw-fulfillment.ts - Complete FBW workflow
 *
 * @see {@link https://dev.wildberries.ru/openapi/fbw-api} - Official FBW API documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
  calculateSupplyCost,
  compareTariffs,
  type SupplyCostInput,
  type SupplyCostResult,
  type TariffComparison,
} from '../src';
import type { ModelsAcceptanceCoefficient } from '../src/types/orders-fbw.types';

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
 * Format coefficient value to human-readable status
 */
function formatCoefficient(coefficient: number): string {
  if (coefficient === -1) return 'Unavailable';
  if (coefficient === 0) return 'FREE';
  return `${coefficient}x (Paid)`;
}

/**
 * Find free acceptance dates for a warehouse
 */
function findFreeAcceptanceDates(
  coefficients: ModelsAcceptanceCoefficient[],
  warehouseID: number,
  boxType: string = 'Короба'
): ModelsAcceptanceCoefficient[] {
  return coefficients.filter(
    (c) =>
      c.warehouseID === warehouseID &&
      c.coefficient === 0 &&
      c.allowUnload === true &&
      c.boxTypeName === boxType
  );
}

/**
 * Find best warehouse based on acceptance coefficient and costs
 */
function findBestWarehouse(
  coefficients: ModelsAcceptanceCoefficient[],
  boxType: string = 'Короба'
): ModelsAcceptanceCoefficient | null {
  // Filter for available acceptance with free or low coefficient
  const available = coefficients.filter(
    (c) =>
      c.coefficient !== undefined &&
      c.coefficient !== -1 &&
      c.allowUnload === true &&
      c.boxTypeName === boxType
  );

  if (available.length === 0) return null;

  // Sort by coefficient (free first), then by storage cost
  available.sort((a, b) => {
    // First, prefer free acceptance
    if (a.coefficient === 0 && b.coefficient !== 0) return -1;
    if (b.coefficient === 0 && a.coefficient !== 0) return 1;

    // Then, prefer lower coefficient
    if ((a.coefficient ?? 0) !== (b.coefficient ?? 0)) {
      return (a.coefficient ?? 0) - (b.coefficient ?? 0);
    }

    // Finally, prefer lower storage cost
    const storageA = parseFloat(a.storageBaseLiter ?? '0');
    const storageB = parseFloat(b.storageBaseLiter ?? '0');
    return storageA - storageB;
  });

  return available[0];
}

/**
 * Main supply planning workflow
 */
async function supplyPlanningWorkflow() {
  console.log('=== Supply Planning Workflow ===\n');

  try {
    // ============================================================================
    // Step 1: Get available warehouses
    // ============================================================================
    console.log('Step 1: Getting available warehouses...\n');

    const warehouses = await sdk.ordersFBW.warehouses();
    const activeWarehouses = warehouses.filter((w) => w.isActive);

    console.log(`Found ${warehouses.length} total warehouses`);
    console.log(`Active warehouses: ${activeWarehouses.length}\n`);

    if (activeWarehouses.length > 0) {
      console.log('Top 5 active warehouses:');
      activeWarehouses.slice(0, 5).forEach((wh) => {
        console.log(`  - ${wh.name} (ID: ${wh.ID})`);
        console.log(`    Address: ${wh.address}`);
        console.log(`    Work Time: ${wh.workTime}`);
        console.log(`    Accepts QR: ${wh.acceptsQr ? 'Yes' : 'No'}`);
        console.log('');
      });
    }

    // ============================================================================
    // Step 2: Check acceptance coefficients for next 14 days
    // ============================================================================
    console.log('Step 2: Checking acceptance coefficients...\n');

    const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
    console.log(`Retrieved ${coefficients.length} coefficient records\n`);

    // Group by warehouse to analyze
    const warehouseCoefs = new Map<number, ModelsAcceptanceCoefficient[]>();
    coefficients.forEach((coef) => {
      if (!warehouseCoefs.has(coef.warehouseID ?? 0)) {
        warehouseCoefs.set(coef.warehouseID ?? 0, []);
      }
      warehouseCoefs.get(coef.warehouseID ?? 0)!.push(coef);
    });

    // Find warehouses with free acceptance
    const warehousesWithFreeAcceptance: Array<{
      warehouseID: number;
      warehouseName: string;
      freeDates: ModelsAcceptanceCoefficient[];
    }> = [];

    warehouseCoefs.forEach((coefs, warehouseID) => {
      const freeDates = coefs.filter(
        (c) => c.coefficient === 0 && c.allowUnload === true && c.boxTypeName === 'Короба'
      );
      if (freeDates.length > 0) {
        warehousesWithFreeAcceptance.push({
          warehouseID,
          warehouseName: freeDates[0].warehouseName ?? 'Unknown',
          freeDates,
        });
      }
    });

    console.log(`Warehouses with free acceptance: ${warehousesWithFreeAcceptance.length}\n`);

    if (warehousesWithFreeAcceptance.length > 0) {
      console.log('Free acceptance opportunities (top 3):');
      warehousesWithFreeAcceptance.slice(0, 3).forEach((wh) => {
        console.log(`\n  ${wh.warehouseName} (ID: ${wh.warehouseID}):`);
        console.log(`    Free dates: ${wh.freeDates.length}`);
        wh.freeDates.slice(0, 3).forEach((date) => {
          console.log(`      - ${date.date} (${date.boxTypeName})`);
          console.log(`        Storage coef: ${date.storageCoef}%`);
          console.log(`        Delivery coef: ${date.deliveryCoef}%`);
        });
      });
      console.log('');
    }

    // ============================================================================
    // Step 3: Calculate supply costs using the utility
    // ============================================================================
    console.log('Step 3: Calculating supply costs...\n');

    // Find best warehouse for cost calculation
    const bestWarehouse = findBestWarehouse(coefficients);

    if (bestWarehouse) {
      console.log(`Best warehouse found: ${bestWarehouse.warehouseName}`);
      console.log(`  Date: ${bestWarehouse.date}`);
      console.log(`  Coefficient: ${formatCoefficient(bestWarehouse.coefficient ?? 0)}`);
      console.log(`  Box Type: ${bestWarehouse.boxTypeName}\n`);

      // Calculate cost for example supply
      const supplyInput: SupplyCostInput = {
        volume: 10, // 10 liters
        warehouseID: bestWarehouse.warehouseID ?? 0,
        days: 30, // 30 days storage
        boxType: 'box',
      };

      console.log('Supply parameters:');
      console.log(`  Volume: ${supplyInput.volume} liters`);
      console.log(`  Storage days: ${supplyInput.days}`);
      console.log(`  Box type: ${supplyInput.boxType}\n`);

      try {
        const costResult: SupplyCostResult = await calculateSupplyCost(supplyInput, () =>
          sdk.ordersFBW.getAcceptanceCoefficients()
        );

        console.log('Supply Cost Breakdown:');
        console.log('------------------------');
        console.log(`  Acceptance: ${costResult.acceptanceCost.toFixed(2)} RUB`);
        console.log(
          `  Storage (${supplyInput.days} days): ${costResult.storageCost.toFixed(2)} RUB`
        );
        console.log(`  Logistics: ${costResult.logisticsCost.toFixed(2)} RUB`);
        console.log('------------------------');
        console.log(`  TOTAL: ${costResult.totalCost.toFixed(2)} RUB\n`);

        console.log('Applied coefficients:');
        console.log(`  Acceptance: ${costResult.appliedCoefficients.acceptance}`);
        console.log(`  Storage: ${costResult.appliedCoefficients.storage}%`);
        console.log(`  Delivery: ${costResult.appliedCoefficients.delivery}%\n`);
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Could not calculate cost: ${error.message}\n`);
        }
      }

      // Calculate costs for different volumes
      console.log('Cost comparison by volume:');
      console.log('--------------------------');
      for (const volume of [5, 10, 25, 50]) {
        try {
          const result = await calculateSupplyCost({ ...supplyInput, volume }, () =>
            sdk.ordersFBW.getAcceptanceCoefficients()
          );
          console.log(
            `  ${volume}L: ${result.totalCost.toFixed(2)} RUB (${(result.totalCost / volume).toFixed(2)} RUB/L)`
          );
        } catch {
          console.log(`  ${volume}L: Unable to calculate`);
        }
      }
      console.log('');
    } else {
      console.log('No suitable warehouse found for cost calculation.\n');
    }

    // ============================================================================
    // Step 4: Compare FBW vs FBS tariffs
    // ============================================================================
    console.log('Step 4: Comparing FBW vs FBS tariffs...\n');

    // Select a warehouse for comparison
    const comparisonWarehouse = bestWarehouse?.warehouseName ?? 'Коледино';

    try {
      const comparison: TariffComparison = await compareTariffs(
        {
          warehouseName: comparisonWarehouse,
          date: new Date().toISOString().split('T')[0],
        },
        async () => {
          const tariffs = await sdk.tariffs.getTariffsBox();
          return tariffs.response?.data?.warehouseList ?? [];
        },
        () => sdk.ordersFBW.getAcceptanceCoefficients()
      );

      console.log(`Tariff Comparison for: ${comparison.warehouseName}`);
      console.log('------------------------------------------');

      console.log('\nInventory Storage Tariffs:');
      if (comparison.inventory.found) {
        console.log(`  Delivery base: ${comparison.inventory.deliveryBase.toFixed(2)} RUB/L`);
        console.log(`  Delivery coef: ${comparison.inventory.deliveryCoef}%`);
        console.log(`  Storage base: ${comparison.inventory.storageBase.toFixed(2)} RUB/L/day`);
        console.log(`  Storage coef: ${comparison.inventory.storageCoef}%`);
      } else {
        console.log('  Not found in inventory API');
      }

      console.log('\nSupply Acceptance Tariffs:');
      if (comparison.supply.found) {
        console.log(`  Delivery base: ${comparison.supply.deliveryBase.toFixed(2)} RUB/L`);
        console.log(`  Delivery coef: ${comparison.supply.deliveryCoef}%`);
        console.log(`  Storage base: ${comparison.supply.storageBase.toFixed(2)} RUB/L/day`);
        console.log(`  Storage coef: ${comparison.supply.storageCoef}%`);
      } else {
        console.log('  Not found in supply API');
      }

      console.log('\nDifference (Supply vs Inventory):');
      console.log(`  Delivery base: ${comparison.difference.deliveryBasePercent.toFixed(1)}%`);
      console.log(`  Storage base: ${comparison.difference.storageBasePercent.toFixed(1)}%`);

      console.log(`\nRECOMMENDATION: ${comparison.recommendation}`);

      switch (comparison.recommendation) {
        case 'SUPPLY_CHEAPER':
          console.log('  -> Use FBW supply for lower overall costs');
          break;
        case 'INVENTORY_CHEAPER':
          console.log('  -> Consider inventory storage for existing stock');
          break;
        case 'EQUAL':
          console.log('  -> Costs are similar, choose based on operational needs');
          break;
      }
      console.log('');
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Could not compare tariffs: ${error.message}\n`);
      }
    }

    // ============================================================================
    // Step 5: Generate supply strategy recommendations
    // ============================================================================
    console.log('Step 5: Supply strategy recommendations...\n');

    if (warehousesWithFreeAcceptance.length > 0) {
      const recommended = warehousesWithFreeAcceptance[0];
      const bestDate = recommended.freeDates[0];

      console.log('RECOMMENDED SUPPLY STRATEGY:');
      console.log('============================');
      console.log(`  Warehouse: ${recommended.warehouseName}`);
      console.log(`  Optimal Date: ${bestDate.date}`);
      console.log(`  Acceptance: FREE (coefficient = 0)`);
      console.log(`  Box Type: ${bestDate.boxTypeName}`);
      console.log('');

      console.log('Tips for cost optimization:');
      console.log('  1. Plan supplies on free acceptance dates (coefficient = 0)');
      console.log('  2. Consolidate shipments to reduce per-unit logistics costs');
      console.log('  3. Monitor coefficient changes - they update frequently');
      console.log('  4. Consider transit warehouses for regional distribution');
      console.log('  5. Keep storage duration minimal to reduce storage fees');
    } else {
      console.log('No free acceptance dates found. Consider:');
      console.log('  1. Waiting for new free slots (check daily)');
      console.log('  2. Using paid acceptance with low coefficient (1.0-1.5x)');
      console.log('  3. Alternative warehouses in different regions');
    }

    console.log('\n=== Supply Planning Complete ===\n');
  } catch (error) {
    console.error('\nError during supply planning:');

    if (error instanceof RateLimitError) {
      console.error(`  Rate limit exceeded: ${error.message}`);
      console.error(`  Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error(`  Authentication failed: ${error.message}`);
      console.error('  Check your API key and permissions');
    } else if (error instanceof ValidationError) {
      console.error(`  Validation error: ${error.message}`);
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

// Run the workflow
supplyPlanningWorkflow()
  .then(() => {
    console.log('Supply planning example completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Supply planning failed:', error);
    process.exit(1);
  });

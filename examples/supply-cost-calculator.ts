/**
 * Supply Cost Calculator - Focused Cost Calculation Example
 *
 * This example demonstrates how to use the calculateSupplyCost utility
 * to estimate supply costs for Wildberries FBW (Fulfillment by Wildberries).
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 10 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersFBW module permissions enabled
 * - npm install wb-api-sdk
 *
 * **What This Example Covers:**
 * - Using calculateSupplyCost utility function
 * - Understanding cost breakdown (acceptance, storage, logistics)
 * - Calculating costs for different volumes
 * - Comparing costs across warehouses
 * - Finding the cheapest warehouse for given parameters
 *
 * **Expected Output:**
 * ```
 * === Supply Cost Calculator ===
 *
 * Calculating costs for 10L supply, 30 days storage...
 *
 * Cost Breakdown for Warehouse: Koledino
 *   Acceptance: 0.00 RUB (free)
 *   Storage: 150.00 RUB
 *   Logistics: 45.00 RUB
 *   ---------------------
 *   Total: 195.00 RUB
 *
 * Cost comparison across warehouses:
 *   Koledino: 195.00 RUB
 *   Kazan: 210.00 RUB
 *   Krasnodar: 225.00 RUB
 *
 * Cheapest warehouse: Koledino
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * npx tsx examples/supply-cost-calculator.ts
 * ```
 *
 * **Related Examples:**
 * - supplies-planning.ts - Complete supply planning workflow
 * - tariff-comparison.ts - Compare tariff types
 * - orders-fbw-fulfillment.ts - FBW supply management
 *
 * @see {@link https://dev.wildberries.ru/openapi/fbw-api} - Official FBW API documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  NetworkError,
  WBAPIError,
  calculateSupplyCost,
  type SupplyCostInput,
  type SupplyCostResult,
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
 * Example supply parameters - customize these for your needs
 */
const SUPPLY_PARAMS = {
  volume: 10, // liters
  days: 30, // storage days
  boxType: 'box' as const, // 'box' | 'pallet' | 'supersafe'
};

/**
 * Calculate and display cost breakdown for a single warehouse
 */
async function calculateCostForWarehouse(
  warehouseID: number,
  params: typeof SUPPLY_PARAMS,
  coefficients: ModelsAcceptanceCoefficient[]
): Promise<SupplyCostResult | null> {
  const input: SupplyCostInput = {
    volume: params.volume,
    warehouseID: warehouseID,
    days: params.days,
    boxType: params.boxType,
  };

  try {
    const result = await calculateSupplyCost(input, async () => coefficients);
    return result;
  } catch (error) {
    // Warehouse may not have available acceptance
    return null;
  }
}

/**
 * Display cost breakdown in formatted output
 */
function displayCostBreakdown(result: SupplyCostResult, params: typeof SUPPLY_PARAMS): void {
  console.log(`\nCost Breakdown for Warehouse: ${result.warehouseName}`);
  console.log('-------------------------------------------');
  console.log(`  Volume: ${params.volume} liters`);
  console.log(`  Storage duration: ${params.days} days`);
  console.log(`  Box type: ${params.boxType}`);
  console.log('');
  console.log('  Costs:');
  console.log(`    Acceptance: ${result.acceptanceCost.toFixed(2)} RUB`);
  console.log(`    Storage:    ${result.storageCost.toFixed(2)} RUB`);
  console.log(`    Logistics:  ${result.logisticsCost.toFixed(2)} RUB`);
  console.log('    ---------------------');
  console.log(`    TOTAL:      ${result.totalCost.toFixed(2)} RUB`);
  console.log('');
  console.log('  Applied coefficients:');
  console.log(
    `    Acceptance: ${result.appliedCoefficients.acceptance} (0 = free, >0 = multiplier)`
  );
  console.log(`    Storage:    ${result.appliedCoefficients.storage}%`);
  console.log(`    Delivery:   ${result.appliedCoefficients.delivery}%`);
}

/**
 * Main cost calculation workflow
 */
async function main() {
  console.log('=== Supply Cost Calculator ===\n');
  console.log(
    `Parameters: ${SUPPLY_PARAMS.volume}L volume, ${SUPPLY_PARAMS.days} days storage, ${SUPPLY_PARAMS.boxType} type\n`
  );

  try {
    // ============================================================================
    // Step 1: Fetch acceptance coefficients (required for cost calculation)
    // ============================================================================
    console.log('Step 1: Fetching acceptance coefficients...');
    const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
    console.log(`Retrieved ${coefficients.length} coefficient records\n`);

    // ============================================================================
    // Step 2: Get unique warehouses with available acceptance
    // ============================================================================
    console.log('Step 2: Analyzing available warehouses...');

    const availableWarehouses = new Map<number, ModelsAcceptanceCoefficient>();
    coefficients.forEach((coef) => {
      // Only include warehouses with acceptance available (coefficient != -1)
      if (
        coef.coefficient !== undefined &&
        coef.coefficient !== -1 &&
        coef.allowUnload === true &&
        coef.boxTypeName === 'Короба' && // Filter for boxes
        !availableWarehouses.has(coef.warehouseID ?? 0)
      ) {
        availableWarehouses.set(coef.warehouseID ?? 0, coef);
      }
    });

    console.log(`Found ${availableWarehouses.size} warehouses with box acceptance\n`);

    // ============================================================================
    // Step 3: Calculate costs for each warehouse
    // ============================================================================
    console.log('Step 3: Calculating costs for each warehouse...\n');

    const warehouseCosts: Array<{
      warehouseID: number;
      warehouseName: string;
      result: SupplyCostResult;
    }> = [];

    for (const [warehouseID, _coef] of Array.from(availableWarehouses)) {
      const result = await calculateCostForWarehouse(warehouseID, SUPPLY_PARAMS, coefficients);
      if (result) {
        warehouseCosts.push({
          warehouseID,
          warehouseName: result.warehouseName,
          result,
        });
      }
    }

    console.log(`Successfully calculated costs for ${warehouseCosts.length} warehouses\n`);

    // ============================================================================
    // Step 4: Display detailed cost for cheapest warehouse
    // ============================================================================
    if (warehouseCosts.length > 0) {
      // Sort by total cost
      warehouseCosts.sort((a, b) => a.result.totalCost - b.result.totalCost);

      const cheapest = warehouseCosts[0];
      displayCostBreakdown(cheapest.result, SUPPLY_PARAMS);

      // ============================================================================
      // Step 5: Compare costs across all warehouses
      // ============================================================================
      console.log('\n=== Cost Comparison Across Warehouses ===\n');
      console.log('Sorted by total cost (cheapest first):\n');

      warehouseCosts.slice(0, 10).forEach((wh, index) => {
        const isFree = wh.result.appliedCoefficients.acceptance === 0;
        const freeLabel = isFree ? ' [FREE acceptance]' : '';
        const costPerLiter = (wh.result.totalCost / SUPPLY_PARAMS.volume).toFixed(2);

        console.log(
          `  ${index + 1}. ${wh.warehouseName}: ${wh.result.totalCost.toFixed(2)} RUB (${costPerLiter} RUB/L)${freeLabel}`
        );
      });

      if (warehouseCosts.length > 10) {
        console.log(`  ... and ${warehouseCosts.length - 10} more warehouses`);
      }

      // ============================================================================
      // Step 6: Calculate costs for different volumes
      // ============================================================================
      console.log('\n=== Volume Cost Scaling ===\n');
      console.log(`For warehouse: ${cheapest.warehouseName}\n`);

      const volumes = [1, 5, 10, 25, 50, 100];
      console.log('Volume | Total Cost | Cost/Liter | Storage | Logistics');
      console.log('-------|------------|------------|---------|----------');

      for (const volume of volumes) {
        try {
          const result = await calculateSupplyCost(
            {
              volume,
              warehouseID: cheapest.warehouseID,
              days: SUPPLY_PARAMS.days,
              boxType: SUPPLY_PARAMS.boxType,
            },
            async () => coefficients
          );

          const costPerLiter = (result.totalCost / volume).toFixed(2);
          console.log(
            `${volume.toString().padStart(6)}L | ${result.totalCost.toFixed(2).padStart(10)} | ${costPerLiter.padStart(10)} | ${result.storageCost.toFixed(2).padStart(7)} | ${result.logisticsCost.toFixed(2).padStart(9)}`
          );
        } catch {
          console.log(`${volume.toString().padStart(6)}L | Unable to calculate`);
        }
      }

      // ============================================================================
      // Step 7: Calculate costs for different storage durations
      // ============================================================================
      console.log('\n=== Storage Duration Impact ===\n');
      console.log(`For warehouse: ${cheapest.warehouseName}, ${SUPPLY_PARAMS.volume}L volume\n`);

      const durations = [7, 14, 30, 60, 90];
      console.log('Days | Total Cost | Storage Cost | Daily Storage');
      console.log('-----|------------|--------------|---------------');

      for (const days of durations) {
        try {
          const result = await calculateSupplyCost(
            {
              volume: SUPPLY_PARAMS.volume,
              warehouseID: cheapest.warehouseID,
              days,
              boxType: SUPPLY_PARAMS.boxType,
            },
            async () => coefficients
          );

          const dailyStorage = (result.storageCost / days).toFixed(2);
          console.log(
            `${days.toString().padStart(4)} | ${result.totalCost.toFixed(2).padStart(10)} | ${result.storageCost.toFixed(2).padStart(12)} | ${dailyStorage.padStart(13)}`
          );
        } catch {
          console.log(`${days.toString().padStart(4)} | Unable to calculate`);
        }
      }

      // ============================================================================
      // Summary
      // ============================================================================
      console.log('\n=== Summary ===\n');
      console.log(`Cheapest warehouse: ${cheapest.warehouseName}`);
      console.log(
        `Total cost for ${SUPPLY_PARAMS.volume}L, ${SUPPLY_PARAMS.days} days: ${cheapest.result.totalCost.toFixed(2)} RUB`
      );
      console.log(
        `Cost per liter: ${(cheapest.result.totalCost / SUPPLY_PARAMS.volume).toFixed(2)} RUB/L`
      );

      if (cheapest.result.appliedCoefficients.acceptance === 0) {
        console.log('Note: This warehouse has FREE acceptance (coefficient = 0)');
      } else {
        console.log(`Acceptance coefficient: ${cheapest.result.appliedCoefficients.acceptance}x`);
      }
    } else {
      console.log('No warehouses available for cost calculation.');
      console.log('This may be due to:');
      console.log('  - No acceptance slots available');
      console.log('  - All warehouses have coefficient = -1');
      console.log('  - API permissions issues');
    }

    console.log('\n=== Cost Calculator Complete ===\n');
  } catch (error) {
    console.error('\nError during cost calculation:');

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

// Run the calculator
main()
  .then(() => {
    console.log('Supply cost calculator completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Cost calculation failed:', error);
    process.exit(1);
  });

/**
 * Complete FBW Supply Planning - Wildberries Warehouse Fulfillment
 *
 * This comprehensive example demonstrates FBW (Fulfillment by Wildberries) supply planning and management:
 * - Getting available WB warehouses with addresses
 * - Checking acceptance coefficients (next 14 days) for cost optimization
 * - Validating acceptance options for specific goods
 * - Calculating transit tariffs for delivery cost planning
 * - Listing and filtering existing supplies by status and date
 * - Getting detailed supply information with goods tracking
 * - Retrieving package information for logistics
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 30 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersFBW module permissions enabled
 * - Products configured for FBW fulfillment
 * - Understanding of acceptance coefficients (-1: unavailable, 0: free, >0: paid)
 * - Supply planning strategy for cost optimization
 *
 * **What This Example Covers:**
 * - **Warehouse Selection**: Get all WB warehouses with acceptance info
 * - **Coefficient Analysis**: Find free acceptance dates (coefficient = 0)
 * - **Acceptance Validation**: Check if goods can be accepted at warehouse
 * - **Transit Costs**: Calculate delivery costs to WB warehouses
 * - **Supply Management**: List, filter, and track supplies
 * - **Goods Tracking**: Monitor individual items within supplies
 * - **Package Logistics**: Retrieve package codes for tracking
 * - **Status Lifecycle**: Not Planned → Planned → Accepting → Accepted → Unloaded
 *
 * **Expected Output:**
 * ```
 * === FBW Warehouse Supply Planning Workflow ===
 *
 * Step 1: Getting available WB warehouses...
 * Found 15 WB warehouses
 *
 * Warehouse: Москва (Коледино)
 *   ID: 507
 *   Acceptance coefficients (next 14 days):
 *     2024-03-16: 0 (FREE)
 *     2024-03-17: 1.5 (PAID 50%)
 *     2024-03-18: 0 (FREE)
 *
 * Step 2: Validating acceptance options...
 * ✅ All 10 goods can be accepted
 *
 * Step 3: Calculating transit tariffs...
 * Transit cost: 450₽ per box
 *
 * Step 4: Listing existing supplies...
 * Found 3 active supplies:
 *   Supply 1: Planned (15 items)
 *   Supply 2: Accepting (32 items)
 *   Supply 3: Accepted (50 items)
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/orders-fbw-fulfillment.ts
 * ```
 *
 * **Related Examples:**
 * - products-warehouse-stock.ts - Inventory management for FBW
 * - tariffs-pricing-calculator.ts - Calculate FBW vs FBS costs
 *
 * **Common Issues:**
 * - "No warehouses available": FBW access requires approval from WB
 * - "Acceptance coefficient -1": Warehouse not accepting for that date
 * - "Goods rejected": Item may not be accepted at selected warehouse
 * - "Transit tariff unavailable": Check if transit warehouse is configured
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
} from '../src';
import type { ModelsGood } from '../src/types/orders-fbw.types';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

/**
 * Format supply status ID to human-readable name
 */
function getSupplyStatusName(statusID: number): string {
  const statusMap: Record<number, string> = {
    1: 'Not Planned',
    2: 'Planned',
    3: 'Allow Unload',
    4: 'Accepting',
    5: 'Accepted',
    6: 'Unloaded On Gate',
  };
  return statusMap[statusID] || `Unknown (${statusID})`;
}

/**
 * Format coefficient value to acceptance status
 */
function formatCoefficient(coefficient: number): string {
  if (coefficient === -1) return 'Unavailable';
  if (coefficient === 0) return 'Free (No fee)';
  return `${coefficient}x (Paid)`;
}

/**
 * Format box type ID to name
 */
function getBoxTypeName(boxTypeID: number): string {
  const boxTypeMap: Record<number, string> = {
    1: 'Boxes (Короба)',
    2: 'Monopallet (Монопаллеты)',
    3: 'Supersafe (Суперсейф)',
  };
  return boxTypeMap[boxTypeID] || `Unknown (${boxTypeID})`;
}

async function completeFBWWorkflow() {
  console.log('=== Complete FBW Warehouse Supply Planning Workflow ===\n');

  try {
    // ============================================================================
    // Step 1: Get available WB warehouses
    // ============================================================================
    console.log('Step 1: Fetching available Wildberries warehouses...');
    const warehouses = await sdk.ordersFBW.warehouses();
    console.log(`Found ${warehouses.length} available warehouses\n`);

    if (warehouses.length === 0) {
      console.log('No warehouses available. Please check API key and try again.');
      return;
    }

    // Display active warehouses
    const activeWarehouses = warehouses.filter((w) => w.isActive);
    console.log(`Active warehouses (${activeWarehouses.length}):`);
    activeWarehouses.slice(0, 5).forEach((warehouse) => {
      console.log(`  ID ${warehouse.ID}: ${warehouse.name}`);
      console.log(`    Address: ${warehouse.address}`);
      console.log(`    Work Time: ${warehouse.workTime}`);
      console.log(`    Accepts QR: ${warehouse.acceptsQR ? 'Yes' : 'No'}`);
      console.log(`    Transit Active: ${warehouse.isTransitActive ? 'Yes' : 'No'}`);
      console.log('');
    });

    // ============================================================================
    // Step 2: Check acceptance coefficients for optimal delivery dates
    // ============================================================================
    console.log('Step 2: Checking acceptance coefficients...');
    console.log('(Helps determine best delivery dates and potential fees)\n');

    // Get coefficients for next 14 days
    const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
    console.log(`Retrieved coefficients for ${coefficients.length} warehouse-date combinations\n`);

    // Group by warehouse and show best dates
    const warehouseCoefs = new Map<number, typeof coefficients>();
    coefficients.forEach((coef) => {
      if (!warehouseCoefs.has(coef.warehouseID)) {
        warehouseCoefs.set(coef.warehouseID, []);
      }
      warehouseCoefs.get(coef.warehouseID)!.push(coef);
    });

    // Show coefficients for first warehouse with free dates
    const targetWarehouse = activeWarehouses[0];
    const warehouseCoefData = warehouseCoefs.get(targetWarehouse.ID) || [];

    if (warehouseCoefData.length > 0) {
      console.log(
        `Acceptance coefficients for ${targetWarehouse.name} (ID: ${targetWarehouse.ID}):`
      );

      const freeDates = warehouseCoefData.filter((c) => c.coefficient === 0);
      const paidDates = warehouseCoefData.filter((c) => c.coefficient > 0);

      console.log(`\n  Free delivery dates (coefficient = 0): ${freeDates.length} days`);
      freeDates.slice(0, 3).forEach((coef) => {
        console.log(`    📅 ${coef.date} - ${getBoxTypeName(coef.boxTypeID)}`);
        console.log(`       Storage: ${coef.storageCoef}x, Delivery: ${coef.deliveryCoef}x`);
      });

      if (paidDates.length > 0) {
        console.log(`\n  Paid delivery dates: ${paidDates.length} days`);
        paidDates.slice(0, 3).forEach((coef) => {
          console.log(`    💰 ${coef.date} - Coefficient: ${formatCoefficient(coef.coefficient)}`);
          console.log(`       ${getBoxTypeName(coef.boxTypeID)}`);
        });
      }
      console.log('');
    }

    // ============================================================================
    // Step 3: Check acceptance options for specific goods
    // ============================================================================
    console.log('Step 3: Checking acceptance options for goods...');
    console.log('(Validates which warehouses accept your specific products)\n');

    // Example goods (replace with real barcodes from your products)
    const goods: ModelsGood[] = [
      { barcode: '1234567891234', quantity: 10 },
      { barcode: '9876543210987', quantity: 5 },
    ];

    console.log('Checking acceptance for:');
    goods.forEach((good) => {
      console.log(`  Barcode: ${good.barcode}, Quantity: ${good.quantity}`);
    });
    console.log('');

    try {
      const acceptanceOptions = await sdk.ordersFBW.createAcceptanceOption(goods);

      console.log('Acceptance options:');
      acceptanceOptions.result?.forEach((item) => {
        console.log(`\n  Barcode: ${item.barcode}`);
        if (item.isError) {
          console.log(
            `    ❌ Error: ${item.error?.detail || item.error?.title || 'Unknown error'}`
          );
        } else {
          console.log(`    ✅ Accepted at ${item.warehouses?.length ?? 0} warehouse(s):`);
          item.warehouses?.forEach((wh) => {
            console.log(`       Warehouse ID: ${wh.warehouseID}`);
            console.log(`         Can box: ${wh.canBox ? 'Yes' : 'No'}`);
            console.log(`         Can monopallet: ${wh.canMonopallet ? 'Yes' : 'No'}`);
            console.log(`         Can supersafe: ${wh.canSupersafe ? 'Yes' : 'No'}`);
          });
        }
      });
      console.log('');
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(`⚠️  Validation error: ${error.message}`);
        console.log('Note: Using example barcodes. Replace with real product barcodes.\n');
      } else {
        throw error;
      }
    }

    // ============================================================================
    // Step 4: Get transit tariffs for delivery cost planning
    // ============================================================================
    console.log('Step 4: Getting transit tariffs...');
    console.log('(Transit warehouse delivery pricing)\n');

    const tariffs = await sdk.ordersFBW.transitTariffs();
    console.log(`Retrieved ${tariffs.length} transit tariff routes\n`);

    if (tariffs.length > 0) {
      console.log('Sample transit routes:');
      tariffs.slice(0, 3).forEach((tariff) => {
        console.log(
          `\n  Route: ${tariff.transitWarehouseName} → ${tariff.destinationWarehouseName}`
        );
        console.log(`  Active from: ${tariff.activeFrom}`);
        console.log(`  Pallet tariff: ${tariff.palletTariff} RUB`);
        console.log('  Box tariff tiers:');
        tariff.boxTariff.forEach((tier) => {
          console.log(`    ${tier.from}-${tier.to} boxes: ${tier.value} RUB/box`);
        });
      });
      console.log('');
    }

    // ============================================================================
    // Step 5: List existing supplies
    // ============================================================================
    console.log('Step 5: Listing existing supplies...');
    console.log('(View supplies created in last 30 days)\n');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const filters = {
      dates: [
        {
          from: thirtyDaysAgo.toISOString().split('T')[0],
          till: new Date().toISOString().split('T')[0],
          type: 'createDate' as const,
        },
      ],
      statusIDs: [], // All statuses
    };

    const supplies = await sdk.ordersFBW.listSupplies(filters, { limit: 100, offset: 0 });
    console.log(`Found ${supplies.length} supplies in last 30 days\n`);

    if (supplies.length > 0) {
      console.log('Recent supplies:');
      supplies.slice(0, 5).forEach((supply) => {
        console.log(`\n  Supply ID: ${supply.supplyID}`);
        console.log(`    Preorder ID: ${supply.preorderID}`);
        console.log(`    Status: ${getSupplyStatusName(supply.statusID)} (${supply.statusName})`);
        console.log(`    Created: ${new Date(supply.createDate).toLocaleString()}`);
        console.log(`    Planned date: ${supply.supplyDate}`);
        if (supply.factDate) {
          console.log(`    Actual date: ${new Date(supply.factDate).toLocaleString()}`);
        }
        console.log(`    Phone: ${supply.phone}`);
      });
      console.log('');

      // ============================================================================
      // Step 6: Get detailed supply information
      // ============================================================================
      if (supplies.length > 0) {
        const firstSupply = supplies[0];
        console.log('Step 6: Getting detailed supply information...\n');

        const supplyDetails = await sdk.ordersFBW.getSupply(firstSupply.supplyID, {
          isPreorderID: false,
        });

        console.log(`Supply ${firstSupply.supplyID} details:`);
        console.log(
          `  Status: ${getSupplyStatusName(supplyDetails.statusID ?? 0)} (${supplyDetails.statusName})`
        );
        console.log(
          `  Warehouse: ${supplyDetails.warehouseName} (ID: ${supplyDetails.warehouseID})`
        );
        console.log(`  Box Type: ${getBoxTypeName(supplyDetails.boxTypeID ?? 0)}`);
        console.log(`  Quantity planned: ${supplyDetails.quantity}`);
        console.log(`  Quantity accepted: ${supplyDetails.acceptedQuantity}`);
        console.log(`  Ready for sale: ${supplyDetails.readyForSaleQuantity}`);
        console.log(`  Acceptance cost: ${supplyDetails.acceptanceCost} RUB`);
        console.log(`  Storage coefficient: ${supplyDetails.storageCoef}`);
        console.log(`  Delivery coefficient: ${supplyDetails.deliveryCoef}`);
        console.log('');

        // ============================================================================
        // Step 7: Get goods within supply
        // ============================================================================
        console.log('Step 7: Getting goods within supply...\n');

        const supplyGoods = await sdk.ordersFBW.getSuppliesGood(firstSupply.supplyID, {
          isPreorderID: false,
          limit: 100,
          offset: 0,
        });
        console.log(`Supply contains ${supplyGoods.length} SKUs\n`);

        if (supplyGoods.length > 0) {
          console.log('Sample goods:');
          supplyGoods.slice(0, 5).forEach((good) => {
            console.log(`\n  Barcode: ${good.barcode}`);
            console.log(`    Vendor code: ${good.vendorCode}`);
            console.log(`    NM ID: ${good.nmID}`);
            console.log(`    Size: ${good.techSize}, Color: ${good.color}`);
            console.log(`    Quantity planned: ${good.quantity}`);
            console.log(`    Quantity accepted: ${good.acceptedQuantity}`);
            console.log(`    Ready for sale: ${good.readyForSaleQuantity}`);
            console.log(`    Needs marking (KIZ): ${good.needKiz ? 'Yes' : 'No'}`);
            if (good.tnved) {
              console.log(`    TNVED code: ${good.tnved}`);
            }
          });
          console.log('');
        }

        // ============================================================================
        // Step 8: Get package information
        // ============================================================================
        console.log('Step 8: Getting package information...\n');

        const packages = await sdk.ordersFBW.getSuppliesPackage(firstSupply.supplyID);
        console.log(`Supply packaged into ${packages.length} box(es)\n`);

        if (packages.length > 0) {
          console.log('Package details:');
          packages.slice(0, 3).forEach((pkg) => {
            console.log(`\n  Package Code: ${pkg.packageCode}`);
            console.log(`    Total quantity: ${pkg.quantity}`);
            console.log('    Contents:');
            pkg.barcodes.forEach((item) => {
              console.log(`      - Barcode: ${item.barcode}, Quantity: ${item.quantity}`);
            });
          });
          console.log('');
        }
      }
    } else {
      console.log('No supplies found in last 30 days.');
      console.log('Create supplies through Wildberries Seller Portal to see data here.\n');
    }

    // ============================================================================
    // Workflow Complete
    // ============================================================================
    console.log('=== FBW Workflow Complete ===\n');
    console.log('Summary:');
    console.log(`  ✅ Warehouses checked: ${activeWarehouses.length}`);
    console.log(`  ✅ Acceptance coefficients retrieved: ${coefficients.length}`);
    console.log(`  ✅ Transit routes available: ${tariffs.length}`);
    console.log(`  ✅ Supplies in last 30 days: ${supplies.length}`);
    console.log('');

    console.log('Best practices for FBW fulfillment:');
    console.log('  1. Check acceptance coefficients before planning delivery');
    console.log('  2. Choose dates with coefficient = 0 for free acceptance');
    console.log('  3. Validate all goods can be accepted at target warehouse');
    console.log('  4. Calculate transit costs if using transit warehouses');
    console.log('  5. Monitor supply statuses to track acceptance progress');
    console.log('  6. Track package codes for logistics coordination');
    console.log('');
  } catch (error) {
    console.error('\n❌ Error occurred during FBW workflow:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
      console.error(`   FBW API limits vary by endpoint`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Check API key and FBW access permissions`);
      console.error(`   FBW requires special seller approval`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Common issues:`);
      console.error(`   - Acceptance coefficient -1 (warehouse unavailable)`);
      console.error(`   - Invalid warehouse or supply ID`);
      console.error(`   - Goods not eligible for selected warehouse`);
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
      console.error(`   Check internet connectivity`);
      console.error(`   Verify at: https://dev.wildberries.ru/`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
      console.error(`   See: https://dev.wildberries.ru/openapi/fbw-api`);
    } else if (error instanceof Error) {
      console.error(`💥 Unexpected error: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
}

// Run workflow
completeFBWWorkflow()
  .then(() => {
    console.log('✅ FBW workflow example completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Workflow failed:', error);
    process.exit(1);
  });

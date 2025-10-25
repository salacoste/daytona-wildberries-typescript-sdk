/**
 * Orders FBW (Fulfillment by Wildberries) Complete Supply Planning Workflow Example
 *
 * Demonstrates complete FBW warehouse supply planning and management workflow:
 * 1. Getting available WB warehouses
 * 2. Checking acceptance coefficients for optimal delivery dates
 * 3. Validating acceptance options for specific goods
 * 4. Calculating transit tariffs for delivery planning
 * 5. Listing and filtering existing supplies
 * 6. Getting detailed supply information
 * 7. Tracking goods within supplies
 * 8. Retrieving package information for logistics
 *
 * @example
 * ```bash
 * # Set API key
 * export WB_API_KEY="your-wildberries-api-key"
 *
 * # Run example
 * npx tsx examples/orders-fbw-fulfillment.ts
 * ```
 */

import { WildberriesSDK, RateLimitError, ValidationError } from '../src';
import type { Good as FBWGood } from '../src';

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
    const warehouses = await sdk.ordersFBW.getWarehouses();
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
      console.log(`    Accepts QR: ${warehouse.acceptsQr ? 'Yes' : 'No'}`);
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
      console.log(`Acceptance coefficients for ${targetWarehouse.name} (ID: ${targetWarehouse.ID}):`);

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
    const goods: FBWGood[] = [
      { barcode: '1234567891234', quantity: 10 },
      { barcode: '9876543210987', quantity: 5 },
    ];

    console.log('Checking acceptance for:');
    goods.forEach((good) => {
      console.log(`  Barcode: ${good.barcode}, Quantity: ${good.quantity}`);
    });
    console.log('');

    try {
      const acceptanceOptions = await sdk.ordersFBW.getAcceptanceOptions(goods);

      console.log('Acceptance options:');
      acceptanceOptions.result.forEach((item) => {
        console.log(`\n  Barcode: ${item.barcode}`);
        if (item.isError) {
          console.log(`    ❌ Error: ${item.error?.detail || item.error?.title || 'Unknown error'}`);
        } else {
          console.log(`    ✅ Accepted at ${item.warehouses.length} warehouse(s):`);
          item.warehouses.forEach((wh) => {
            console.log(`       ${wh.warehouseName} (ID: ${wh.warehouseID})`);
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

    const tariffs = await sdk.ordersFBW.getTransitTariffs();
    console.log(`Retrieved ${tariffs.length} transit tariff routes\n`);

    if (tariffs.length > 0) {
      console.log('Sample transit routes:');
      tariffs.slice(0, 3).forEach((tariff) => {
        console.log(`\n  Route: ${tariff.transitWarehouseName} → ${tariff.destinationWarehouseName}`);
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

    const supplies = await sdk.ordersFBW.getSupplies(filters, 100, 0);
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

        const supplyDetails = await sdk.ordersFBW.getSupplyDetails(firstSupply.supplyID, false);

        console.log(`Supply ${supplyDetails.supplyID} details:`);
        console.log(`  Status: ${getSupplyStatusName(supplyDetails.statusID)} (${supplyDetails.statusName})`);
        console.log(`  Warehouse: ${supplyDetails.warehouseName} (ID: ${supplyDetails.warehouseID})`);
        console.log(`  Box Type: ${getBoxTypeName(supplyDetails.boxTypeID)}`);
        console.log(`  Quantity planned: ${supplyDetails.quantity}`);
        console.log(`  Quantity accepted: ${supplyDetails.acceptedQuantity}`);
        console.log(`  Ready for sale: ${supplyDetails.readyForSaleQuantity}`);
        console.log(`  Acceptance cost: ${supplyDetails.acceptanceCost} RUB`);
        console.log(`  Storage coefficient: ${supplyDetails.storageCoefficient}x`);
        console.log(`  Delivery coefficient: ${supplyDetails.deliveryCoefficient}x`);
        console.log('');

        // ============================================================================
        // Step 7: Get goods within supply
        // ============================================================================
        console.log('Step 7: Getting goods within supply...\n');

        const supplyGoods = await sdk.ordersFBW.getSupplyGoods(firstSupply.supplyID, false, 100, 0);
        console.log(`Supply contains ${supplyGoods.length} SKUs\n`);

        if (supplyGoods.length > 0) {
          console.log('Sample goods:');
          supplyGoods.slice(0, 5).forEach((good) => {
            console.log(`\n  Barcode: ${good.barcode}`);
            console.log(`    Vendor code: ${good.vendorCode}`);
            console.log(`    NM ID: ${good.nmID}`);
            console.log(`    Size: ${good.techsize}, Color: ${good.color}`);
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

        const packages = await sdk.ordersFBW.getSupplyPackage(firstSupply.supplyID);
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
    if (error instanceof RateLimitError) {
      console.error('❌ Rate limit exceeded:', error.message);
      console.error(`   Retry after ${error.retryAfter}ms`);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation error:', error.message);
    } else if (error instanceof Error) {
      console.error('❌ Error:', error.message);
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

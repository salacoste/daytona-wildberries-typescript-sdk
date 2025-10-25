/**
 * Inventory Management Example (Story 2.4)
 *
 * This example demonstrates complete warehouse setup and stock management workflows:
 * - Getting available WB warehouses
 * - Creating seller warehouses bound to WB offices
 * - Managing stock levels (add, update, delete)
 * - Error handling for warehouse restrictions and stock operations
 *
 * Prerequisites:
 * - Valid WB API key with Products API access
 * - At least one available WB office for binding
 */

import { WildberriesSDK } from '../src/index';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function setupInventoryManagement() {
  console.log('=== Wildberries Inventory Management Demo ===\n');

  try {
    // ========================================
    // 1. GET AVAILABLE WB WAREHOUSES FOR FBS
    // ========================================
    console.log('Step 1: Fetching WB warehouses for FBS binding...');
    const wbOffices = await sdk.products.getWBOffices();
    console.log(`✓ Found ${wbOffices.length} WB warehouses`);
    console.log(`  Selected: ${wbOffices[0].name} (ID: ${wbOffices[0].id})`);

    // ========================================
    // 2. CREATE SELLER WAREHOUSE
    // ========================================
    console.log('\nStep 2: Creating seller warehouse...');
    const newWarehouse = await sdk.products.createWarehouse(
      'Склад Москва Центр',
      wbOffices[0].id
    );
    console.log(`✓ Warehouse created with ID: ${newWarehouse.id}`);

    // ========================================
    // 3. LIST ALL WAREHOUSES
    // ========================================
    console.log('\nStep 3: Listing all warehouses...');
    const warehouses = await sdk.products.getWarehouses();
    console.log(`✓ Total warehouses: ${warehouses.length}`);
    warehouses.forEach(wh => {
      console.log(`  - ${wh.name} (ID: ${wh.id}, Office: ${wh.officeId})`);
    });

    // ========================================
    // 4. UPDATE STOCK FOR PRODUCTS
    // ========================================
    console.log('\nStep 4: Updating stock levels...');
    await sdk.products.updateStockLevels(newWarehouse.id, [
      { sku: 'BARCODE123', amount: 100 },
      { sku: 'BARCODE456', amount: 50 },
      { sku: 'BARCODE789', amount: 200 }
    ]);
    console.log('✓ Stock updated for 3 products');

    // ========================================
    // 5. GET CURRENT STOCK LEVELS
    // ========================================
    console.log('\nStep 5: Fetching current stock...');
    const stocks = await sdk.products.getStock(
      newWarehouse.id,
      ['BARCODE123', 'BARCODE456', 'BARCODE789']
    );
    console.log('✓ Current stock levels:');
    stocks.forEach(stock => {
      console.log(`  SKU: ${stock.sku}, Stock: ${stock.amount}`);
    });

    // ========================================
    // 6. UPDATE WAREHOUSE NAME
    // ========================================
    console.log('\nStep 6: Updating warehouse name...');
    await sdk.products.updateWarehouse(
      newWarehouse.id,
      'Склад Москва Обновлённый',
      wbOffices[0].id
    );
    console.log('✓ Warehouse name updated');

    // ========================================
    // 7. ADJUST STOCK (RESTOCK)
    // ========================================
    console.log('\nStep 7: Adjusting stock quantities...');
    await sdk.products.updateStockLevels(newWarehouse.id, [
      { sku: 'BARCODE123', amount: 150 }, // Increased
      { sku: 'BARCODE456', amount: 30 }   // Decreased
    ]);
    console.log('✓ Stock adjusted for 2 products');

    // Verify adjustments
    const updatedStocks = await sdk.products.getStock(
      newWarehouse.id,
      ['BARCODE123', 'BARCODE456']
    );
    console.log('  New stock levels:');
    updatedStocks.forEach(stock => {
      console.log(`    ${stock.sku}: ${stock.amount}`);
    });

    // ========================================
    // 8. REMOVE STOCK FOR SPECIFIC PRODUCT
    // ========================================
    console.log('\nStep 8: Deleting stock for BARCODE789...');
    console.log('  ⚠️  WARNING: This operation is IRREVERSIBLE!');
    await sdk.products.deleteStockRecords(newWarehouse.id, ['BARCODE789']);
    console.log('✓ Stock deleted (must re-upload to resume sales)');

    // ========================================
    // 9. VERIFY REMAINING STOCK
    // ========================================
    console.log('\nStep 9: Verifying remaining stock...');
    const finalStocks = await sdk.products.getStock(
      newWarehouse.id,
      ['BARCODE123', 'BARCODE456']
    );
    console.log(`✓ Final stock count: ${finalStocks.length} products remaining`);

    console.log('\n✅ Inventory management workflow completed successfully!');

  } catch (error: unknown) {
    console.error('\n❌ Error during inventory management:');

    if (error && typeof error === 'object' && 'statusCode' in error) {
      const apiError = error as { statusCode: number; message?: string };

      switch (apiError.statusCode) {
        case 409:
          console.error('  Conflict Error (409):');
          console.error('  - WB office already bound to another warehouse');
          console.error('  - Warehouse processing in progress');
          console.error('  - DBS/FBS or cargo type restrictions');
          console.error('  Note: 409 errors count as 5 requests toward rate limit!');
          break;

        case 404:
          console.error('  Not Found (404):');
          console.error('  - Warehouse does not exist');
          console.error('  - SKUs not found in warehouse');
          break;

        case 429:
          console.error('  Rate Limit Exceeded (429):');
          console.error('  - Too many requests to Marketplace API');
          console.error('  - Limit: 300 req/min, 200ms interval');
          break;

        default:
          console.error(`  HTTP ${apiError.statusCode}: ${apiError.message ?? 'Unknown error'}`);
      }
    } else if (error instanceof Error) {
      console.error(`  ${error.name}: ${error.message}`);
    } else {
      console.error('  Unknown error occurred');
    }

    throw error;
  }
}

// ========================================
// BULK OPERATIONS EXAMPLE
// ========================================
async function bulkStockManagement() {
  console.log('\n=== Bulk Stock Management Demo ===\n');

  try {
    const warehouseId = parseInt(process.env.WB_WAREHOUSE_ID ?? '0');
    if (!warehouseId) {
      throw new Error('WB_WAREHOUSE_ID environment variable not set');
    }

    // Create 100 stock updates (testing batch capability)
    console.log('Creating bulk stock update for 100 SKUs...');
    const bulkUpdates = Array.from({ length: 100 }, (_, i) => ({
      sku: `BULK-SKU-${String(i + 1).padStart(3, '0')}`,
      amount: (i + 1) * 10
    }));

    await sdk.products.updateStockLevels(warehouseId, bulkUpdates);
    console.log('✓ Bulk update completed for 100 SKUs');

    // Verify sample of bulk stocks
    const sampleSkus = [
      'BULK-SKU-001',
      'BULK-SKU-050',
      'BULK-SKU-100'
    ];
    const sampleStocks = await sdk.products.getStock(warehouseId, sampleSkus);
    console.log('\n✓ Sample stock verification:');
    sampleStocks.forEach(stock => {
      console.log(`  ${stock.sku}: ${stock.amount}`);
    });

    console.log('\n✅ Bulk stock management completed!');

  } catch (error: unknown) {
    console.error('\n❌ Error during bulk operation:');
    if (error instanceof Error) {
      console.error(`  ${error.name}: ${error.message}`);
    }
    throw error;
  }
}

// ========================================
// ERROR HANDLING EXAMPLES
// ========================================
async function demonstrateErrorHandling() {
  console.log('\n=== Error Handling Demo ===\n');

  try {
    // Example 1: Validation error (name too long)
    console.log('Example 1: Testing validation error (name > 200 chars)...');
    try {
      await sdk.products.createWarehouse('A'.repeat(201), 1);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ValidationError') {
        console.log('✓ Validation error caught:', error.message);
      }
    }

    // Example 2: Validation error (SKU array too large)
    console.log('\nExample 2: Testing validation error (> 1000 SKUs)...');
    try {
      const tooManySkus = Array.from({ length: 1001 }, (_, i) => `SKU-${i}`);
      await sdk.products.getStock(123, tooManySkus);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ValidationError') {
        console.log('✓ Validation error caught:', error.message);
      }
    }

    // Example 3: Validation error (amount > 100,000)
    console.log('\nExample 3: Testing validation error (amount > 100,000)...');
    try {
      await sdk.products.updateStockLevels(123, [
        { sku: 'TEST-SKU', amount: 150000 }
      ]);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ValidationError') {
        console.log('✓ Validation error caught:', error.message);
      }
    }

    console.log('\n✅ Error handling demonstration completed!');

  } catch (error: unknown) {
    console.error('\n❌ Unexpected error:');
    if (error instanceof Error) {
      console.error(`  ${error.name}: ${error.message}`);
    }
  }
}

// ========================================
// MAIN EXECUTION
// ========================================
async function main() {
  if (!process.env.WB_API_KEY) {
    console.error('❌ Error: WB_API_KEY environment variable is required');
    console.error('\nUsage:');
    console.error('  export WB_API_KEY=your_api_key_here');
    console.error('  npm run example:warehouse-stock');
    process.exit(1);
  }

  try {
    // Run main workflow
    await setupInventoryManagement();

    // Optionally run bulk operations (requires warehouse ID)
    if (process.env.WB_WAREHOUSE_ID) {
      await bulkStockManagement();
    } else {
      console.log('\nℹ️  Skip bulk operations (WB_WAREHOUSE_ID not set)');
    }

    // Demonstrate error handling
    await demonstrateErrorHandling();

  } catch (error: unknown) {
    console.error('\n❌ Fatal error:');
    if (error instanceof Error) {
      console.error(`  ${error.name}: ${error.message}`);
      if (error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
      }
    }
    process.exit(1);
  }
}

// Run the example
main();

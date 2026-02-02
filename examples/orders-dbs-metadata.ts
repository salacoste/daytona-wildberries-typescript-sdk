/**
 * DBS Metadata Workflow - Product Marking and Compliance
 *
 * This example demonstrates handling metadata for DBS orders including
 * product marking codes required for regulatory compliance:
 * - SGTIN: Честный знак marking codes for tracked products
 * - IMEI: International Mobile Equipment Identity for electronics
 * - UIN: Unique Identification Number
 * - GTIN: Global Trade Item Number
 * - Customs declarations for imported goods
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 15 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersDBS module permissions enabled
 * - Orders with requiredMeta field populated
 *
 * **What This Example Covers:**
 * - **Metadata Detection**: Identify which orders require metadata
 * - **SGTIN Management**: Add/update marking codes for regulated products
 * - **IMEI Handling**: Track electronics with IMEI codes
 * - **Metadata Retrieval**: Get existing metadata for orders
 * - **Metadata Deletion**: Remove metadata when needed
 *
 * **Metadata Types:**
 * - **sgtin**: Честный знак marking codes (tobacco, shoes, clothes, etc.)
 * - **imei**: Mobile device identifiers (phones, tablets)
 * - **uin**: Unique identification numbers
 * - **gtin**: Global trade item numbers (barcodes)
 * - **customsDeclaration**: Customs declaration numbers for imports
 *
 * **Expected Output:**
 * ```
 * === DBS Metadata Workflow - Product Marking ===
 *
 * Step 1: Fetching orders with metadata requirements...
 * Found 3 orders requiring metadata
 *
 *   Order 12345678:
 *     Required Metadata: sgtin, imei
 *     Article: PHONE-001
 *
 * Step 2: Adding metadata to order 12345678...
 *     Added SGTIN codes: 2 codes
 *     Added IMEI: 123456789012345
 *
 * Step 3: Verifying metadata...
 *     SGTIN: 0104601234567890, 0104601234567891
 *     IMEI: 123456789012345
 *
 * Step 4: Metadata workflow complete
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/orders-dbs-metadata.ts
 * ```
 *
 * **Related Examples:**
 * - orders-dbs-core-workflow.ts - Full DBS order processing workflow
 * - orders-dbs-b2b.ts - B2B organizational buyer handling
 *
 * **Compliance Notes:**
 * - Failing to add required metadata may block order shipment
 * - SGTIN codes must be valid Честный знак format
 * - IMEI must be 15 digits
 * - Check requiredMeta field before processing orders
 *
 * @see {@link https://dev.wildberries.ru/openapi/orders-dbs} - Official DBS API documentation
 * @see {@link https://честныйзнак.рф} - Honest Mark system documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function dbsMetadataWorkflow() {
  console.log('=== DBS Metadata Workflow - Product Marking ===\n');

  try {
    // ============================================================================
    // Step 1: Get orders with metadata requirements
    // ============================================================================
    console.log('Step 1: Fetching orders with metadata requirements...');
    const newOrders = await sdk.ordersDBS.getNewOrders();
    const orders = newOrders.orders ?? [];

    // Filter orders that require metadata
    const ordersWithMeta = orders.filter(
      (order) => order.requiredMeta && order.requiredMeta.length > 0
    );

    console.log(`Found ${orders.length} total orders`);
    console.log(`Found ${ordersWithMeta.length} orders requiring metadata\n`);

    if (ordersWithMeta.length === 0) {
      console.log('No orders require metadata at this time.');
      console.log('This is normal - metadata is only required for regulated products.\n');

      // Demo mode: show what metadata handling looks like
      console.log('Demo: Metadata types and their usage:');
      console.log('  - sgtin: Array of marking codes for Честный знак');
      console.log('  - imei: Single IMEI number for mobile devices');
      console.log('  - uin: Unique identification number');
      console.log('  - gtin: Global trade item number (barcode)');
      console.log('  - customsDeclaration: Customs declaration number\n');

      demonstrateMetadataAPI();
      return;
    }

    // Display orders with metadata requirements
    ordersWithMeta.slice(0, 5).forEach((order) => {
      console.log(`  Order ${order.id}:`);
      console.log(`    Required Metadata: ${order.requiredMeta!.join(', ')}`);
      console.log(`    Article: ${order.article}`);
      console.log(`    WB Article (nmId): ${order.nmId}`);
      console.log('');
    });

    // ============================================================================
    // Step 2: Process metadata for first order (demo)
    // ============================================================================
    const demoOrder = ordersWithMeta[0];
    console.log(`Step 2: Processing metadata for order ${demoOrder.id}...`);

    // Check what metadata is required
    const requiredMeta = demoOrder.requiredMeta!;

    // Prepare metadata object based on requirements
    // In real application, these values would come from your inventory system
    const metadata: Record<string, unknown> = {};

    if (requiredMeta.includes('sgtin')) {
      // SGTIN codes from Honest Mark system
      // Format: 01 + GTIN (14 digits) + 21 + serial number
      metadata.sgtin = {
        value: [
          // These are example codes - use real codes from your marking system
          '01046012345678900421abc123',
          '01046012345678900421abc124',
        ],
      };
      console.log(`  Preparing SGTIN codes: 2 codes`);
    }

    if (requiredMeta.includes('imei')) {
      // IMEI for mobile devices (15 digits)
      metadata.imei = { value: 123456789012345 };
      console.log(`  Preparing IMEI: 123456789012345`);
    }

    if (requiredMeta.includes('uin')) {
      // UIN - Unique Identification Number
      metadata.uin = { value: 9876543210 };
      console.log(`  Preparing UIN: 9876543210`);
    }

    if (requiredMeta.includes('gtin')) {
      // GTIN - Global Trade Item Number
      metadata.gtin = { value: 4601234567890 };
      console.log(`  Preparing GTIN: 4601234567890`);
    }

    if (requiredMeta.includes('customsDeclaration')) {
      // Customs declaration number
      metadata.customsDeclaration = { value: '10130030/010123/0000001' };
      console.log(`  Preparing Customs Declaration: 10130030/010123/0000001`);
    }

    console.log('');

    // ============================================================================
    // Step 3: Add metadata to order
    // ============================================================================
    console.log(`Step 3: Adding metadata to order ${demoOrder.id}...`);

    // Note: In production, you would use real marking codes
    // For this demo, we'll show the API call pattern

    console.log('  Note: Using demo metadata values');
    console.log('  In production, use real codes from your marking system');
    console.log('');

    // Uncomment to actually add metadata (requires valid codes):
    // await sdk.ordersDBS.setSgtin(demoOrder.id!, metadata);
    // console.log('  Metadata added successfully');

    // ============================================================================
    // Step 4: Verify metadata (retrieve and display)
    // ============================================================================
    console.log(`Step 4: Retrieving current metadata for order ${demoOrder.id}...`);

    const currentMeta = await sdk.ordersDBS.getMeta(demoOrder.id!);
    const meta = currentMeta.meta;

    if (meta) {
      console.log('  Current metadata:');

      if (meta.sgtin?.value && meta.sgtin.value.length > 0) {
        console.log(`    SGTIN codes: ${meta.sgtin.value.length} code(s)`);
        meta.sgtin.value.forEach((code, i) => {
          console.log(`      ${i + 1}. ${code}`);
        });
      }

      if (meta.imei?.value) {
        console.log(`    IMEI: ${meta.imei.value}`);
      }

      if (meta.uin?.value) {
        console.log(`    UIN: ${meta.uin.value}`);
      }

      if (meta.gtin?.value) {
        console.log(`    GTIN: ${meta.gtin.value}`);
      }

      if (meta.customsDeclaration?.value) {
        console.log(`    Customs Declaration: ${meta.customsDeclaration.value}`);
      }

      if (
        !meta.sgtin?.value &&
        !meta.imei?.value &&
        !meta.uin?.value &&
        !meta.gtin?.value &&
        !meta.customsDeclaration?.value
      ) {
        console.log('    No metadata set yet');
      }
    } else {
      console.log('  No metadata found for this order');
    }

    console.log('');

    // ============================================================================
    // Step 5: Summary and compliance guidance
    // ============================================================================
    console.log('Step 5: Compliance Summary\n');

    console.log('Orders requiring metadata:');
    ordersWithMeta.forEach((order) => {
      const status = 'Pending metadata'; // In real app, check actual status
      console.log(`  Order ${order.id}: ${order.requiredMeta!.join(', ')} - ${status}`);
    });

    console.log('');

    // ============================================================================
    // Summary
    // ============================================================================
    console.log('=== DBS Metadata Workflow Complete ===\n');

    console.log('Important Metadata Guidelines:');
    console.log('  1. Always check requiredMeta before processing orders');
    console.log('  2. SGTIN codes must be from registered Честный знак batches');
    console.log('  3. IMEI must be exactly 15 digits');
    console.log('  4. Add metadata BEFORE confirming order for shipment');
    console.log('  5. Use setSgtin/setImei/etc. to modify existing metadata');
    console.log('  6. Use deleteMeta only when resubmitting with corrections\n');

    console.log('Compliance Violations:');
    console.log('  - Missing required metadata may result in order cancellation');
    console.log('  - Invalid SGTIN codes will be rejected by Честный знак');
    console.log('  - Ensure your marking codes match the actual products shipped');
  } catch (error) {
    console.error('\n❌ Error occurred during metadata workflow:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Check API key and DBS permissions`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Common issues:`);
      console.error(`   - Invalid IMEI format (must be 15 digits)`);
      console.error(`   - Invalid SGTIN format (check Честный знак requirements)`);
      console.error(`   - Order ID not found`);
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`💥 Unexpected error: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
    }

    process.exit(1);
  }
}

/**
 * Demonstrate metadata API patterns without requiring actual orders
 */
function demonstrateMetadataAPI() {
  console.log('=== Metadata API Reference ===\n');

  console.log('1. Add metadata to order:');
  console.log('   await sdk.ordersDBS.setSgtin(orderId, {');
  console.log("     sgtin: { value: ['01046012345678900421abc123'] },");
  console.log('     imei: { value: 123456789012345 }');
  console.log('   });');
  console.log('');

  console.log('2. Update existing metadata:');
  console.log("   await sdk.ordersDBS.setSgtin(orderId, ['newcode1', 'newcode2']);");
  console.log('');

  console.log('3. Get current metadata:');
  console.log('   const meta = await sdk.ordersDBS.getMeta(orderId);');
  console.log('   console.log(meta.meta?.sgtin?.value);');
  console.log('');

  console.log('4. Delete metadata (use with caution):');
  console.log("   await sdk.ordersDBS.deleteMeta(orderId, 'sgtin');");
  console.log('');

  console.log('5. Set individual metadata types:');
  console.log("   await sdk.ordersDBS.setSgtin(orderId, ['code1', 'code2']);");
  console.log('   await sdk.ordersDBS.setImei(orderId, 123456789012345);');
  console.log('   await sdk.ordersDBS.setUin(orderId, 9876543210);');
  console.log('');

  console.log('=== End of Metadata Demo ===\n');
}

// Run the example
dbsMetadataWorkflow();

/**
 * In-Store Pickup Workflow - Complete Click & Collect Management
 *
 * This comprehensive example demonstrates complete in-store pickup (Click & Collect) workflows:
 * - Order assembly workflow (new → confirm → prepare → receive)
 * - Customer identity verification with passcode validation
 * - Product metadata management (SGTIN, UIN, IMEI, GTIN codes)
 * - Order status tracking and pagination
 * - Order rejection and cancellation workflows
 * - Comprehensive error handling for all pickup scenarios
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 25 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - InStorePickup module permissions enabled
 * - Active pickup point registered with Wildberries
 * - Understanding of order lifecycle states
 * - Metadata requirements for regulated products (Честный знак)
 * - Customer verification process knowledge
 *
 * **What This Example Covers:**
 * - **Complete Workflow**: 7-step order processing from new to delivery
 * - **Identity Verification**: Customer passcode validation and security
 * - **Metadata Management**: SGTIN/UIN/IMEI/GTIN codes for compliance
 * - **Status Tracking**: Real-time order status monitoring with pagination
 * - **Order Rejection**: Handling no-show customers and cancellations
 * - **Error Handling**: 5 specialized error types with recovery strategies
 *
 * **Expected Output:**
 * ```
 * === Example 1: Complete Order Processing Workflow ===
 *
 * Found 5 new orders
 * Processing order 12345 (21117866-0006)
 *
 * → Confirming order...
 * ✓ Order confirmed and moved to assembly
 *
 * → Required metadata: sgtin, imei
 * ✓ SGTIN codes set
 * ✓ IMEI code set
 *
 * → Marking order as prepared...
 * ✓ Order ready for pickup
 *
 * → Waiting for customer...
 * → Verifying customer identity...
 * ✓ Customer verified for order 12345
 *
 * → Handing over order...
 * ✓ Order completed successfully!
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/in-store-pickup-workflow.ts
 * ```
 *
 * **Related Examples:**
 * - orders-fbs-fulfillment.ts - FBS seller fulfillment workflow
 * - orders-fbw-fulfillment.ts - FBW Wildberries fulfillment
 * - customer-support.ts - Customer communication workflows
 *
 * **Common Issues:**
 * - "Invalid state transition": Must follow new → confirm → prepare → receive order
 * - "Order not found": Order may be already processed or canceled
 * - "Customer verification failed": Check passcode matches customer app
 * - "Metadata validation failed": SGTIN must be 29 digits, IMEI 15 digits
 * - "409 errors count as 10 requests": Rate limit impact on conflicts
 *
 * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup} - Official InStorePickup API
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';
// Note: In-store pickup types (ApiNewOrder, ApiOrdersMeta, etc.) are not exported
// from the main SDK entry point. Type inference handles the typing automatically.
// If you need explicit types, a future SDK version may add a ./in-store-pickup subpath.

// ============================================================================
// SETUP
// ============================================================================

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000,
  logLevel: 'info',
});

// ============================================================================
// EXAMPLE 1: Complete Order Processing Workflow
// ============================================================================

async function completeOrderWorkflow() {
  console.log('\n=== Example 1: Complete Order Processing Workflow ===\n');

  try {
    // Step 1: Get new orders awaiting assembly
    const newOrders = await sdk.inStorePickup.getOrdersNew();
    console.log(`Found ${newOrders.orders.length} new orders`);

    if (newOrders.orders.length === 0) {
      console.log('No new orders to process');
      return;
    }

    const order = newOrders.orders[0];
    console.log(`Processing order ${order.id} (${order.orderCode})`);

    // Step 2: Confirm order and start assembly
    console.log('\n→ Confirming order...');
    await sdk.inStorePickup.confirmBulk([order.id]);
    console.log('✓ Order confirmed and moved to assembly');

    // Step 3: Check if metadata is required
    if (order.requiredMeta && order.requiredMeta.length > 0) {
      console.log(`\n→ Required metadata: ${order.requiredMeta.join(', ')}`);

      // Set SGTIN codes if required (Честный знак marking)
      if (order.requiredMeta.includes('sgtin')) {
        const sgtinCodes = ['01234567890123456789012345678'];
        await sdk.inStorePickup.setSgtinBulk({
          orders: [{ orderId: order.id, sgtins: sgtinCodes }],
        });
        console.log('✓ SGTIN codes set');
      }

      // Set IMEI if required (for electronics)
      if (order.requiredMeta.includes('imei')) {
        const imei = '123456789012345';
        await sdk.inStorePickup.setImeiBulk({
          orders: [{ orderId: order.id, imei }],
        });
        console.log('✓ IMEI code set');
      }
    }

    // Step 4: Complete assembly
    console.log('\n→ Marking order as prepared...');
    await sdk.inStorePickup.prepareBulk([order.id]);
    console.log('✓ Order ready for pickup');

    // Step 5: Wait for customer arrival (simulated)
    console.log('\n→ Waiting for customer...');
    // In real scenario, customer arrives at pickup point

    // Step 6: Verify customer identity
    console.log('→ Verifying customer identity...');
    const verification = await sdk.inStorePickup.createClientIdentity({
      orderCode: order.orderCode,
      passcode: '1234', // Customer provides this from their app
    });

    if (verification.checked) {
      console.log(`✓ Customer verified for order ${verification.orderId}`);

      // Step 7: Hand over order
      console.log('\n→ Handing over order...');
      await sdk.inStorePickup.receiveBulk([order.id]);
      console.log('✓ Order completed successfully!');
    } else {
      console.log('✗ Customer verification failed');
    }
  } catch (error) {
    console.error('Error in order workflow:', error);
  }
}

// ============================================================================
// EXAMPLE 2: Customer Search and Identity Verification
// ============================================================================

async function customerVerificationWorkflow() {
  console.log('\n=== Example 2: Customer Search and Identity Verification ===\n');

  try {
    // Step 1: Get customer information by order IDs
    const orderIds = [12345, 67890];
    const customerInfo = await sdk.inStorePickup.createOrdersClient({ orders: orderIds });

    console.log(`Found customer info for ${customerInfo.orders.length} orders:`);
    customerInfo.orders.forEach((info) => {
      console.log(`\nOrder ${info.orderID}:`);
      console.log(`  Name: ${info.firstName} ${info.lastName}`);
      console.log(`  Phone: ${info.phone} (ext: ${info.phoneCode})`);
    });

    // Step 2: Verify customer identity when they arrive
    const orderCode = '21117866-0006'; // From customer's app
    const passcode = '1234'; // Customer provides 4-digit code

    console.log(`\n→ Verifying customer for order ${orderCode}...`);
    const result = await sdk.inStorePickup.createClientIdentity({
      orderCode,
      passcode,
    });

    if (result.ok) {
      console.log('✓ Identity verified');
      console.log('→ You can now hand over the order');
    }
  } catch (error) {
    console.error('Error in customer verification:', error);
  }
}

// ============================================================================
// EXAMPLE 3: Product Metadata Management
// ============================================================================

async function metadataManagementWorkflow() {
  console.log('\n=== Example 3: Product Metadata Management ===\n');

  const orderId = 12345;

  try {
    // Step 1: Get current metadata
    console.log('→ Fetching order metadata...');
    const metadata = await sdk.inStorePickup.getMetaBulk({ ordersIds: [orderId] });
    const meta = metadata.orders?.[0];

    console.log('\nCurrent metadata:');
    console.log(`  SGTIN codes: ${meta?.sgtin?.length ?? 0} items`);
    console.log(`  UIN codes: ${meta?.uin ? 1 : 0} items`);
    console.log(`  IMEI codes: ${meta?.imei ? 1 : 0} items`);
    console.log(`  GTIN codes: ${meta?.gtin ? 1 : 0} items`);

    // Step 2: Set SGTIN codes (Честный знак) for regulated products
    console.log('\n→ Setting SGTIN codes...');
    const sgtinCodes = [
      '01234567890123456789012345678', // 29-digit SGTIN code
      '01234567890123456789012345679',
    ];
    await sdk.inStorePickup.setSgtinBulk({
      orders: [{ orderId, sgtins: sgtinCodes }],
    });
    console.log('✓ SGTIN codes updated');

    // Step 3: Set UIN code for pharmaceutical products
    console.log('\n→ Setting UIN code...');
    const uin = 'UIN123456789ABCD';
    await sdk.inStorePickup.setUinBulk({ orders: [{ orderId, uin }] });
    console.log('✓ UIN code set');

    // Step 4: Set IMEI for electronics
    console.log('\n→ Setting IMEI code...');
    const imei = '123456789012345'; // 15-digit IMEI
    await sdk.inStorePickup.setImeiBulk({ orders: [{ orderId, imei }] });
    console.log('✓ IMEI code set');

    // Step 5: Set GTIN code
    console.log('\n→ Setting GTIN code...');
    const gtin = '12345678901234'; // 14-digit GTIN
    await sdk.inStorePickup.setGtinBulk({ orders: [{ orderId, gtin }] });
    console.log('✓ GTIN code set');

    // Step 6: Verify updated metadata
    const updatedMetadata = await sdk.inStorePickup.getMetaBulk({ ordersIds: [orderId] });
    const updatedMeta = updatedMetadata.orders?.[0];
    console.log('\n✓ All metadata updated successfully');
    console.log(`  SGTIN: ${updatedMeta?.sgtin?.length ?? 0} codes`);
    console.log(`  UIN: ${updatedMeta?.uin ? 1 : 0} codes`);
    console.log(`  IMEI: ${updatedMeta?.imei ? 1 : 0} codes`);
    console.log(`  GTIN: ${updatedMeta?.gtin ? 1 : 0} codes`);

    // Step 7: Delete metadata if needed (before assembly completion)
    console.log('\n→ Deleting SGTIN codes...');
    await sdk.inStorePickup.deleteMetaBulk({ ordersIds: [orderId], key: 'sgtin' });
    console.log('✓ SGTIN codes deleted');
  } catch (error) {
    console.error('Error managing metadata:', error);
  }
}

// ============================================================================
// EXAMPLE 4: Order Status Tracking and Querying
// ============================================================================

async function orderStatusTracking() {
  console.log('\n=== Example 4: Order Status Tracking and Querying ===\n');

  try {
    // Step 1: Query orders with filters
    const now = Date.now();
    const oneDayAgo = Math.floor((now - 24 * 60 * 60 * 1000) / 1000);
    const tomorrow = Math.floor((now + 24 * 60 * 60 * 1000) / 1000);

    console.log('→ Fetching orders from last 24 hours...');
    const ordersResponse = await sdk.inStorePickup.getClickCollectOrders({
      limit: 10,
      next: 0,
      dateFrom: oneDayAgo,
      dateTo: tomorrow,
    });

    console.log(`Found ${ordersResponse.orders.length} orders`);
    console.log(`Next cursor: ${ordersResponse.next}`);

    if (ordersResponse.orders.length > 0) {
      // Step 2: Get detailed status for specific orders
      const orderIds = ordersResponse.orders.slice(0, 5).map((o) => o.id);
      console.log(`\n→ Getting status for ${orderIds.length} orders...`);

      const statuses = await sdk.inStorePickup.getStatusesBulk(orderIds);

      console.log('\nOrder statuses:');
      statuses.orders?.forEach((status) => {
        console.log(`\nOrder ${status.orderId}:`);
        console.log(`  Supplier Status: ${status.supplierStatus}`);
        console.log(`  WB Status: ${status.wbStatus}`);
      });

      // Step 3: Handle pagination if more results exist
      if (ordersResponse.next > 0) {
        console.log(`\n→ Fetching next page (cursor: ${ordersResponse.next})...`);
        const nextPage = await sdk.inStorePickup.getClickCollectOrders({
          limit: 10,
          next: ordersResponse.next,
          dateFrom: oneDayAgo,
          dateTo: tomorrow,
        });
        console.log(`Found ${nextPage.orders.length} more orders`);
      }
    }
  } catch (error) {
    console.error('Error tracking order status:', error);
  }
}

// ============================================================================
// EXAMPLE 5: Order Rejection and Cancellation
// ============================================================================

async function orderRejectionWorkflow() {
  console.log('\n=== Example 5: Order Rejection and Cancellation ===\n');

  try {
    const orderId = 12345;

    // Scenario A: Reject order after assembly (customer didn't come)
    console.log('→ Rejecting order (customer no-show)...');
    await sdk.inStorePickup.rejectBulk([orderId]);
    console.log('✓ Order rejected');

    // Scenario B: Cancel order before assembly
    const anotherOrderId = 67890;
    console.log('\n→ Cancelling order (supplier cannot fulfill)...');
    await sdk.inStorePickup.cancelBulk([anotherOrderId]);
    console.log('✓ Order cancelled');
  } catch (error) {
    console.error('Error in rejection workflow:', error);
  }
}

// ============================================================================
// EXAMPLE 6: Error Handling Best Practices
// ============================================================================

async function errorHandlingExamples() {
  console.log('\n=== Example 6: Error Handling Best Practices ===\n');

  const {
    InvalidOrderStateError,
    PickupOrderNotFoundError,
    CustomerVerificationError,
    MetadataValidationError,
    RateLimitError,
  } = await import('../src');

  try {
    const orderId = 99999;

    // Example 1: Handle invalid state transition
    try {
      // Trying to prepare order without confirming first
      await sdk.inStorePickup.prepareBulk([orderId]);
    } catch (error) {
      if (error instanceof InvalidOrderStateError) {
        console.log('✗ Invalid state transition');
        console.log(`  Current state: ${error.currentState}`);
        console.log(`  Attempted: ${error.attemptedAction}`);
        console.log(`  Recovery: ${error.getUserMessage()}`);

        // Recovery: Get current status and follow correct flow
        const statuses = await sdk.inStorePickup.getStatusesBulk([orderId]);
        const currentState = statuses.orders[0]?.supplierStatus;
        console.log(`\n→ Current state is: ${currentState}`);
        console.log('→ Following correct flow: new → confirm → prepare → receive');
      }
    }

    // Example 2: Handle order not found
    try {
      await sdk.inStorePickup.confirmBulk([99999]);
    } catch (error) {
      if (error instanceof PickupOrderNotFoundError) {
        console.log('\n✗ Order not found');
        console.log(`  Order ID: ${error.orderId}`);
        console.log(`  Recovery: ${error.getUserMessage()}`);
      }
    }

    // Example 3: Handle customer verification failure
    try {
      await sdk.inStorePickup.createClientIdentity({
        orderCode: '21117866-0006',
        passcode: 'wrong',
      });
    } catch (error) {
      if (error instanceof CustomerVerificationError) {
        console.log('\n✗ Customer verification failed');
        console.log(`  Order: ${error.orderCode}`);
        console.log(`  Recovery: ${error.getUserMessage()}`);
        console.log('\n⚠️  Note: 409 errors count as 10 requests!');
      }
    }

    // Example 4: Handle metadata validation error
    try {
      await sdk.inStorePickup.setSgtinBulk({
        orders: [{ orderId: 12345, sgtins: ['invalid-code'] }],
      });
    } catch (error) {
      if (error instanceof MetadataValidationError) {
        console.log('\n✗ Metadata validation failed');
        console.log(`  Code type: ${error.codeType}`);
        console.log(`  Order ID: ${error.orderId}`);
        console.log(`  Recovery: ${error.getUserMessage()}`);

        // Check order status and required metadata
        const newOrders = await sdk.inStorePickup.getOrdersNew();
        const order = newOrders.orders.find((o) => o.id === 12345);
        if (order) {
          console.log(`\n→ Required metadata: ${order.requiredMeta}`);
          console.log(`→ Current status: ${order.supplierStatus}`);
        }
      }
    }

    // Example 5: Handle rate limiting
    try {
      // Making too many requests
      for (let i = 0; i < 100; i++) {
        await sdk.inStorePickup.getOrdersNew();
      }
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.log('\n✗ Rate limit exceeded');
        console.log(`  Retry after: ${error.retryAfter}ms`);
        console.log('  The SDK will automatically retry with backoff');
      }
    }
  } catch (error) {
    console.error('\n❌ Error in in-store pickup workflow:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
      console.error(`   Note: 409 errors count as 10 requests!`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Verify API key and pickup point permissions`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Common issues:`);
      console.error(`   - Invalid state transition (must follow order)`);
      console.error(`   - SGTIN must be 29 digits`);
      console.error(`   - IMEI must be 15 digits`);
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  Wildberries SDK - In-Store Pickup Module Examples       ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');

  // Run all examples
  await completeOrderWorkflow();
  await customerVerificationWorkflow();
  await metadataManagementWorkflow();
  await orderStatusTracking();
  await orderRejectionWorkflow();
  await errorHandlingExamples();

  console.log('\n✓ All examples completed!\n');
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

// Export for use in other files
export {
  completeOrderWorkflow,
  customerVerificationWorkflow,
  metadataManagementWorkflow,
  orderStatusTracking,
  orderRejectionWorkflow,
  errorHandlingExamples,
};

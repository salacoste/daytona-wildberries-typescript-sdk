/**
 * Complete FBS Fulfillment - End-to-End Seller Shipping Workflow
 *
 * This comprehensive example demonstrates the complete FBS order fulfillment process from order receipt to delivery:
 * - Creating supplies to group orders for shipping
 * - Adding orders to supply (status: new → confirm)
 * - Generating shipping labels (PNG, SVG, ZPL formats)
 * - Delivering supply to WB (status: confirm → complete)
 * - Getting supply QR code for tracking
 * - Managing supplies and handling cancellations
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 25 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersFBS module permissions enabled
 * - Active FBS orders ready for fulfillment
 * - Understanding of supply workflow and cargo type constraints
 * - Label printer for shipping labels (optional)
 *
 * **What This Example Covers:**
 * - **Supply Creation**: Group orders for batch shipment
 * - **Order Assignment**: Add orders to supply (cargo type must match)
 * - **Label Generation**: PNG (580×400, 400×300), SVG, ZPL formats
 * - **Delivery Confirmation**: Mark supply as delivered to WB
 * - **QR Code Retrieval**: Get tracking QR (only after delivery)
 * - **Supply Management**: List, filter, and cancel supplies
 * - **Status Transitions**: new → confirm → complete lifecycle
 *
 * **Expected Output:**
 * ```
 * === Complete FBS Order Fulfillment Workflow ===
 *
 * Step 1: Fetching new FBS orders...
 * Found 5 new orders awaiting processing
 *
 * Step 2: Creating supply...
 * ✅ Supply created (ID: WB-SUP-12345)
 *
 * Step 3: Adding orders to supply...
 * ✅ Added 5 orders to supply
 * Status changed: new → confirm
 *
 * Step 4: Generating shipping labels...
 * ✅ Generated 5 labels
 * Saved: order-sticker.png (580×400px)
 * Saved: order-sticker.svg
 *
 * Step 5: Delivering supply...
 * ✅ Supply delivered (Status: complete)
 *
 * Step 6: Getting supply QR code...
 * ✅ QR code retrieved
 * Saved: supply-qrcode.png
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/orders-fbs-fulfillment.ts
 * ```
 *
 * **Related Examples:**
 * - orders-fbs-processing.ts - Order retrieval and status checking
 * - products-warehouse-stock.ts - Inventory for order fulfillment
 *
 * **Common Issues:**
 * - "Cargo type mismatch": All orders in supply must have same cargo type
 * - "QR code not available": Only accessible after supply delivery
 * - "Label generation failed": Check order has required delivery information
 * - "Supply cannot be modified": Supply in 'complete' status is immutable
 *
 * @see {@link https://dev.wildberries.ru/openapi/fbs-api} - Official FBS API documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';
import { writeFileSync } from 'fs';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function completeFBSFulfillment() {
  console.log('=== Complete FBS Order Fulfillment Workflow ===\n');

  try {
    // ============================================================================
    // Step 1: Get new orders awaiting processing
    // ============================================================================
    console.log('Step 1: Fetching new FBS orders...');
    const newOrdersResponse = await sdk.ordersFBS.getOrdersNew();
    const newOrders = newOrdersResponse.orders ?? [];
    console.log(`Found ${newOrders.length} new orders awaiting processing\n`);

    if (newOrders.length === 0) {
      console.log('No new orders to process. Workflow complete.');
      return;
    }

    // Display first few orders
    newOrders.slice(0, 3).forEach((order) => {
      console.log(`  Order ${order.id}:`);
      console.log(`    Article: ${order.article}`);
      console.log(`    Order UID: ${order.orderUid}`);
      console.log(`    Cargo Type: ${order.cargoType} (${getCargoTypeName(order.cargoType)})`);
      console.log(`    Customer Comment: ${order.comment || 'None'}`);
      if (order.address) {
        console.log(`    Delivery Address: ${order.address.fullAddress}`);
      }
      console.log('');
    });

    // ============================================================================
    // Step 2: Create supply for grouping orders
    // ============================================================================
    console.log('Step 2: Creating supply...');
    const supplyName = `FBS Supply ${new Date().toISOString().split('T')[0]}`;
    const supply = await sdk.ordersFBS.createSupply({ name: supplyName });
    console.log(`Supply created: ${supply.id}\n`);

    // ============================================================================
    // Step 3: Add orders to supply (changes status new → confirm)
    // ============================================================================
    console.log('Step 3: Adding orders to supply...');
    console.log('IMPORTANT: Supply can only contain orders of same cargo type!\n');

    const ordersToAdd = newOrders.slice(0, 5);
    let addedCount = 0;

    for (const order of ordersToAdd) {
      try {
        await sdk.ordersFBS.addOrdersToSupply(supply.id, { orders: [order.id] });
        console.log(
          `  ✅ Added order ${order.id} (article: ${order.article}, cargoType: ${order.cargoType})`
        );
        addedCount++;
      } catch (error) {
        if (error instanceof Error) {
          console.log(`  ❌ Failed to add order ${order.id}: ${error.message}`);
          console.log(`     Reason: Cargo type mismatch or warehouse mismatch`);
        }
      }
    }

    console.log(`\nSuccessfully added ${addedCount} orders to supply\n`);

    if (addedCount === 0) {
      console.log('No orders were added to supply. Cleaning up...');
      await sdk.ordersFBS.deleteSupply(supply.id);
      console.log('Empty supply deleted. Workflow complete.');
      return;
    }

    // ============================================================================
    // Step 4: Verify order statuses changed to "confirm"
    // ============================================================================
    console.log('Step 4: Verifying order statuses...');
    const orderIds = ordersToAdd.slice(0, addedCount).map((o) => o.id);
    const statusResponse = await sdk.ordersFBS.getOrderStatuses({ orders: orderIds });
    const statuses = statusResponse.orders ?? [];

    console.log('Order status breakdown:');
    statuses.forEach((status) => {
      console.log(`  Order ${status.id}: supplier=${status.supplierStatus}, wb=${status.wbStatus}`);
    });
    console.log('');

    // ============================================================================
    // Step 5: Generate shipping labels for orders
    // ============================================================================
    console.log('Step 5: Generating shipping labels (PNG, 580×400)...');

    const confirmedOrders = statuses.filter((s) => s.supplierStatus === 'confirm').map((s) => s.id);

    if (confirmedOrders.length > 0) {
      const stickerResponse = await sdk.ordersFBS.createOrdersSticker(
        { type: 'png', width: 58, height: 40 },
        { orders: confirmedOrders }
      );
      const stickers = stickerResponse.stickers ?? [];

      console.log(`Generated ${stickers.length} shipping labels`);

      // Save first sticker to file as example
      if (stickers.length > 0) {
        const stickerData = Buffer.from(stickers[0].file, 'base64');
        writeFileSync('order-sticker.png', stickerData);
        console.log(`  ✅ Saved first sticker to order-sticker.png`);
        console.log(`     Order ID: ${stickers[0].orderId}`);
        console.log(`     Part A: ${stickers[0].partA}`);
        console.log(`     Part B: ${stickers[0].partB}`);
        console.log(`     Barcode: ${stickers[0].barcode}\n`);
      }

      // Also demonstrate SVG format
      const svgResponse = await sdk.ordersFBS.createOrdersSticker(
        { type: 'svg', width: 58, height: 40 },
        { orders: [confirmedOrders[0]] }
      );
      const svgStickers = svgResponse.stickers ?? [];
      if (svgStickers.length > 0) {
        const svgData = Buffer.from(svgStickers[0].file, 'base64');
        writeFileSync('order-sticker.svg', svgData);
        console.log(`  ✅ Saved SVG sticker to order-sticker.svg\n`);
      }
    } else {
      console.log('No orders in "confirm" status, skipping sticker generation\n');
    }

    // ============================================================================
    // Step 6: Deliver supply (changes status confirm → complete)
    // ============================================================================
    console.log('Step 6: Marking supply as delivered...');
    await sdk.ordersFBS.updateSuppliesDeliver(supply.id);
    console.log(`Supply ${supply.id} delivered successfully`);
    console.log('All orders transitioned to "complete" status\n');

    // ============================================================================
    // Step 7: Get supply QR code (only available after delivery)
    // ============================================================================
    console.log('Step 7: Generating supply QR code...');
    const qrCode = await sdk.ordersFBS.getSuppliesBarcode(supply.id, { type: 'png' });
    if (qrCode.file) {
      const qrData = Buffer.from(qrCode.file, 'base64');
      writeFileSync('supply-qrcode.png', qrData);
      console.log(`  ✅ QR code saved to supply-qrcode.png`);
      console.log(`     Barcode value: ${qrCode.barcode ?? 'N/A'}\n`);
    }

    // ============================================================================
    // Step 8: Verify final order statuses
    // ============================================================================
    console.log('Step 8: Verifying final order statuses...');
    const finalStatusResponse = await sdk.ordersFBS.getOrderStatuses({ orders: orderIds });
    const finalStatuses = finalStatusResponse.orders ?? [];

    console.log('Final status breakdown:');
    finalStatuses.forEach((status) => {
      console.log(`  Order ${status.id}: supplier=${status.supplierStatus}, wb=${status.wbStatus}`);
    });
    console.log('');

    // ============================================================================
    // Step 9: List recent supplies
    // ============================================================================
    console.log('Step 9: Listing recent supplies...');
    const supplies = await sdk.ordersFBS.supplies({ limit: 10, next: 0 });
    console.log(`Total supplies: ${supplies.supplies?.length ?? 0}`);
    (supplies.supplies ?? []).slice(0, 5).forEach((s) => {
      const status = s.done ? 'Closed' : 'Open';
      const closedInfo = s.closedAt ? ` (closed: ${s.closedAt})` : '';
      console.log(`  ${s.id}: ${s.name} - ${status}${closedInfo}`);
    });
    console.log('');

    // ============================================================================
    // Additional: Order cancellation example
    // ============================================================================
    console.log('Additional Operations:\n');

    console.log('Example: Canceling an order');
    console.log('Note: Order cancellation auto-removes order from supply if present');
    console.log('Usage:');
    console.log('  await sdk.ordersFBS.cancelOrder(12345);');
    console.log('  // Order status changes to "cancel" and removed from supply\n');

    console.log('Example: Deleting an empty supply');
    console.log('Note: Can only delete supplies with zero orders');
    console.log('Usage:');
    console.log('  await sdk.ordersFBS.deleteSupply("WB-GI-1234567");');
    console.log('  // Supply must be empty (all orders removed)\n');

    console.log('✅ Complete FBS fulfillment workflow finished!');
    console.log('\nGenerated files:');
    console.log('  - order-sticker.png (PNG shipping label 580×400)');
    console.log('  - order-sticker.svg (SVG shipping label 580×400)');
    console.log('  - supply-qrcode.png (Supply QR code 580×400)');
  } catch (error) {
    console.error('\n❌ Error occurred during FBS fulfillment:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
      console.error(`   FBS API limits vary by endpoint`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Check API key and FBS permissions`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Common issues:`);
      console.error(`   - Cargo type mismatch between orders`);
      console.error(`   - Supply in wrong status for operation`);
      console.error(`   - Invalid label format requested`);
      if (error.fieldErrors) {
        console.error(`   Field errors:`, error.fieldErrors);
      }
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
      console.error(`   Check connectivity`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
      console.error(`   See: https://dev.wildberries.ru/openapi/fbs-api`);
    } else if (error instanceof Error) {
      console.error(`💥 Unexpected error: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
    }

    process.exit(1);
  }
}

/**
 * Helper: Get cargo type name
 */
function getCargoTypeName(cargoType: 1 | 2 | 3): string {
  const names = {
    1: 'МГТ (small cargo)',
    2: 'СГТ (oversized cargo)',
    3: 'КГТ+ (large cargo)',
  };
  return names[cargoType];
}

// Run the example
completeFBSFulfillment();

/**
 * Orders FBS (Fulfillment by Seller) Complete Fulfillment Workflow Example
 *
 * Demonstrates complete FBS order processing workflow:
 * 1. Fetching new orders awaiting processing
 * 2. Creating supply for grouping orders
 * 3. Adding orders to supply (changes status new → confirm)
 * 4. Generating shipping labels for orders
 * 5. Delivering supply (changes status confirm → complete)
 * 6. Getting supply QR code for tracking
 * 7. Managing supplies and order cancellation
 *
 * @example
 * ```bash
 * # Set API key
 * export WB_API_KEY="your-wildberries-api-key"
 *
 * # Run example
 * npx tsx examples/orders-fbs-fulfillment.ts
 * ```
 */

import { WildberriesSDK, RateLimitError, ValidationError } from '../src';
import { writeFileSync } from 'fs';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function completeFBSFulfillment() {
  console.log('=== Complete FBS Order Fulfillment Workflow ===\n');

  try {
    // ============================================================================
    // Step 1: Get new orders awaiting processing
    // ============================================================================
    console.log('Step 1: Fetching new FBS orders...');
    const newOrders = await sdk.ordersFBS.getNewOrders();
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
    const supply = await sdk.ordersFBS.createSupply(supplyName);
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
        await sdk.ordersFBS.addOrderToSupply(supply.id, order.id);
        console.log(`  ✅ Added order ${order.id} (article: ${order.article}, cargoType: ${order.cargoType})`);
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
    const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);

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
      const stickers = await sdk.ordersFBS.getOrderStickers(confirmedOrders, {
        type: 'png',
        width: 58,
        height: 40,
      });

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
      const svgStickers = await sdk.ordersFBS.getOrderStickers([confirmedOrders[0]], {
        type: 'svg',
        width: 58,
        height: 40,
      });
      const svgData = Buffer.from(svgStickers[0].file, 'base64');
      writeFileSync('order-sticker.svg', svgData);
      console.log(`  ✅ Saved SVG sticker to order-sticker.svg\n`);
    } else {
      console.log('No orders in "confirm" status, skipping sticker generation\n');
    }

    // ============================================================================
    // Step 6: Deliver supply (changes status confirm → complete)
    // ============================================================================
    console.log('Step 6: Marking supply as delivered...');
    await sdk.ordersFBS.deliverSupply(supply.id);
    console.log(`Supply ${supply.id} delivered successfully`);
    console.log('All orders transitioned to "complete" status\n');

    // ============================================================================
    // Step 7: Get supply QR code (only available after delivery)
    // ============================================================================
    console.log('Step 7: Generating supply QR code...');
    const qrCode = await sdk.ordersFBS.getSupplyBarcode(supply.id, 'png');
    const qrData = Buffer.from(qrCode.file, 'base64');
    writeFileSync('supply-qrcode.png', qrData);
    console.log(`  ✅ QR code saved to supply-qrcode.png`);
    console.log(`     Barcode value: ${qrCode.barcode}\n`);

    // ============================================================================
    // Step 8: Verify final order statuses
    // ============================================================================
    console.log('Step 8: Verifying final order statuses...');
    const finalStatuses = await sdk.ordersFBS.getOrderStatuses(orderIds);

    console.log('Final status breakdown:');
    finalStatuses.forEach((status) => {
      console.log(`  Order ${status.id}: supplier=${status.supplierStatus}, wb=${status.wbStatus}`);
    });
    console.log('');

    // ============================================================================
    // Step 9: List recent supplies
    // ============================================================================
    console.log('Step 9: Listing recent supplies...');
    const supplies = await sdk.ordersFBS.getSupplies({ limit: 10, next: 0 });
    console.log(`Total supplies: ${supplies.supplies.length}`);
    supplies.supplies.slice(0, 5).forEach((s) => {
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
    console.error('\n❌ Error:', error instanceof Error ? error.message : String(error));

    if (error instanceof ValidationError) {
      console.error('Validation error - check request parameters');
      if (error.fieldErrors) {
        console.error('Field errors:', error.fieldErrors);
      }
    } else if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded - try again later');
      console.error(`Retry after: ${error.retryAfter}ms`);
    } else {
      console.error('Unexpected error occurred');
      console.error('Details:', error);
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

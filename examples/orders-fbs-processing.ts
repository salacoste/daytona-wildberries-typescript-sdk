/**
 * Orders FBS (Fulfillment by Seller) Processing Example
 *
 * Demonstrates complete FBS order processing workflow:
 * 1. Fetching new orders awaiting processing
 * 2. Retrieving orders with date filters and pagination
 * 3. Checking order statuses
 * 4. Status breakdown analysis
 *
 * @example
 * ```bash
 * # Set API key
 * export WB_API_KEY="your-wildberries-api-key"
 *
 * # Run example
 * npx tsx examples/orders-fbs-processing.ts
 * ```
 */

import { WildberriesSDK, RateLimitError, ValidationError } from '../src';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function processFBSOrders() {
  console.log('=== FBS Order Processing Workflow ===\n');

  try {
    // Step 1: Get all new orders
    console.log('Step 1: Fetching new FBS orders...');
    const newOrders = await sdk.ordersFBS.getNewOrders();
    console.log(`Found ${newOrders.length} new orders awaiting processing\n`);

    if (newOrders.length > 0) {
      const firstOrder = newOrders[0];
      console.log('First New Order:');
      console.log(`  Order ID: ${firstOrder.id}`);
      console.log(`  Article: ${firstOrder.article}`);
      console.log(`  Order UID: ${firstOrder.orderUid}`);
      console.log(`  Customer Comment: ${firstOrder.comment ?? 'None'}`);
      console.log(`  Delivery Address: ${firstOrder.address?.fullAddress ?? 'Pickup'}\n`);
    }

    // Step 2: Get orders for last 7 days with pagination
    console.log('Step 2: Fetching orders from last 7 days...');
    const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
    const now = Math.floor(Date.now() / 1000);

    const allOrders = [];
    let nextCursor = 0;
    let pageCount = 0;

    do {
      const response = await sdk.ordersFBS.getOrders({
        dateFrom: sevenDaysAgo,
        dateTo: now,
        limit: 100,
        next: nextCursor,
      });

      allOrders.push(...response.orders);
      nextCursor = response.next;
      pageCount++;

      console.log(`  Page ${pageCount}: ${response.orders.length} orders`);
    } while (nextCursor > 0);

    console.log(`Total orders retrieved: ${allOrders.length}\n`);

    // Step 3: Check statuses for specific orders
    if (allOrders.length > 0) {
      console.log('Step 3: Checking order statuses...');

      // Get statuses for first 5 orders
      const orderIds = allOrders.slice(0, Math.min(5, allOrders.length)).map((o) => o.id);
      const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);

      console.log(`Checked ${statuses.length} order statuses:\n`);

      statuses.forEach((status) => {
        console.log(`  Order ${status.id}:`);
        console.log(`    Supplier Status: ${status.supplierStatus}`);
        console.log(`    WB Status: ${status.wbStatus}`);
      });
    }

    // Step 4: Status breakdown
    console.log('\nStep 4: Order status breakdown...');
    if (allOrders.length > 0) {
      const orderIds = allOrders.map((o) => o.id);
      const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);

      const statusBreakdown = statuses.reduce(
        (acc, status) => {
          acc[status.supplierStatus] = (acc[status.supplierStatus] ?? 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      console.log('By Supplier Status:');
      Object.entries(statusBreakdown).forEach(([status, count]) => {
        console.log(`  ${status}: ${count} orders`);
      });
    }

    console.log('\n✅ FBS order processing workflow completed');
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : String(error));

    if (error instanceof ValidationError) {
      console.error('Validation error - check request parameters');
      if (error.fieldErrors) {
        console.error('Field errors:', error.fieldErrors);
      }
    } else if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded - try again later');
    } else {
      console.error('Unexpected error occurred');
    }
  }
}

// Run the example
processFBSOrders();

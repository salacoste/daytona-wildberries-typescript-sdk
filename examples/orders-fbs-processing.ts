/**
 * FBS Order Processing - Seller Fulfillment Order Management
 *
 * This example demonstrates FBS (Fulfillment by Seller) order processing:
 * - Fetching new orders awaiting processing
 * - Retrieving orders with date range filters
 * - Pagination handling for large order volumes
 * - Order status checking and breakdown analysis
 * - Understanding supplier vs WB status states
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 10 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersFBS module permissions enabled
 * - Active FBS orders (seller processes and ships from own warehouse)
 * - Understanding of FBS order lifecycle
 *
 * **What This Example Covers:**
 * - **New Orders**: Fetch orders awaiting processing
 * - **Date Filtering**: Get orders within specific date range
 * - **Pagination**: Handle large result sets with cursor navigation
 * - **Status Analysis**: Breakdown by supplier and WB statuses
 * - **Order Details**: Complete order information including items and delivery
 *
 * **Expected Output:**
 * ```
 * === FBS Order Processing Workflow ===
 *
 * Step 1: Fetching new FBS orders...
 * Found 15 new orders awaiting processing
 *
 * First New Order:
 *   Order ID: WB-ORD-123456
 *   Created: 2024-03-15 10:30:00
 *   Delivery deadline: 2024-03-18
 *   Items: 2 products
 *   Total: 3,500₽
 *
 * Step 2: Retrieving recent orders (last 7 days)...
 * Found 47 orders
 * Using pagination for 47 results
 *
 * Status Breakdown:
 *   New: 15 orders
 *   Confirmed: 20 orders
 *   Assembled: 8 orders
 *   Shipped: 4 orders
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/orders-fbs-processing.ts
 * ```
 *
 * **Related Examples:**
 * - orders-fbs-fulfillment.ts - Complete FBS fulfillment workflow
 * - integration-product-order-finance.ts - Multi-module order tracking
 *
 * **Common Issues:**
 * - "No new orders": Normal if no customer orders yet
 * - "Pagination cursor invalid": Use cursor from previous response
 * - "Date filter returns empty": Adjust date range to include orders
 *
 * @see {@link https://dev.wildberries.ru/openapi/fbs-api} - Official FBS API documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from '../src';

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
    console.error('\n❌ Error occurred during FBS order processing:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
      console.error(`   FBS API limit: 5 req/min for orders`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Verify API key: echo $WB_API_KEY`);
      console.error(`   Check FBS permissions in seller dashboard`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Common issues:`);
      console.error(`   - Invalid date format (must be Unix timestamp)`);
      console.error(`   - Cursor/pagination parameters incorrect`);
      console.error(`   - Invalid order status filter`);
      if (error.fieldErrors) {
        console.error(`   Field errors:`, error.fieldErrors);
      }
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
      console.error(`   Check connectivity and API status`);
      console.error(`   Verify at: https://dev.wildberries.ru/`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
      console.error(`   See: https://dev.wildberries.ru/openapi/fbs-api`);
    } else if (error instanceof Error) {
      console.error(`💥 Unexpected error: ${error.message}`);
    } else {
      console.error('Unknown error:', String(error));
    }
  }
}

// Run the example
processFBSOrders();

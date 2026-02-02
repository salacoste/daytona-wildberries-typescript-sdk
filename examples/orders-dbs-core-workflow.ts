/**
 * DBS Core Workflow - Delivery by Seller Order Processing
 *
 * This example demonstrates the complete DBS (Delivery by Seller) order processing workflow
 * where sellers handle both storage AND delivery directly to customers:
 * - Fetching new orders with delivery addresses and time windows
 * - Getting customer contact information for delivery coordination
 * - Processing orders with GPS coordinates for route planning
 * - Paginating through completed orders with date filtering
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 15 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersDBS module permissions enabled
 * - Active DBS orders ready for processing
 *
 * **What This Example Covers:**
 * - **New Orders**: Fetch pending DBS orders with full delivery details
 * - **Customer Contact**: Get phone numbers and names for delivery coordination
 * - **Delivery Windows**: Parse ddate, dTimeFrom, dTimeTo for scheduling
 * - **Address & GPS**: Use coordinates for delivery route planning
 * - **Required Metadata**: Check requiredMeta for compliance requirements
 * - **Pagination**: Navigate completed orders with cursor-based pagination
 *
 * **DBS vs FBS Key Differences:**
 * - DBS: Seller delivers to customer's address (not pickup points)
 * - DBS: Access to customer phone number and full address with GPS
 * - DBS: Specific delivery date/time windows (dTimeFrom, dTimeTo)
 * - DBS: May require metadata (IMEI, UIN, GTIN, SGTIN, customs declarations)
 *
 * **Expected Output:**
 * ```
 * === DBS Core Workflow - Delivery by Seller ===
 *
 * Step 1: Fetching new DBS orders...
 * Found 3 new orders awaiting delivery
 *
 *   Order 12345678:
 *     Article: SELLER-SKU-001
 *     Delivery Date: 2024-01-15 09:00-12:00
 *     Address: Moscow, Tverskaya st. 1
 *     GPS: 55.7558, 37.6173
 *     Required Metadata: sgtin, imei
 *
 * Step 2: Getting customer contact info...
 *   Order 12345678:
 *     Name: Ivan Petrov
 *     Phone: +7 999 123-45-67
 *
 * Step 3: Getting completed orders (last 7 days)...
 * Found 25 completed orders
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/orders-dbs-core-workflow.ts
 * ```
 *
 * **Related Examples:**
 * - orders-fbs-fulfillment.ts - FBS (pickup point) fulfillment workflow
 * - orders-fbw-fulfillment.ts - FBW (WB warehouse) fulfillment workflow
 *
 * **Common Issues:**
 * - "Date range exceeds 30 days": Maximum 30 calendar days per getOrders request
 * - "Empty orderIds array": getClientInfo requires at least one order ID
 * - "Order not found": Verify order exists and belongs to your account
 *
 * @see {@link https://dev.wildberries.ru/openapi/orders-dbs} - Official DBS API documentation
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

async function dbsCoreWorkflow() {
  console.log('=== DBS Core Workflow - Delivery by Seller ===\n');

  try {
    // ============================================================================
    // Step 1: Get new DBS orders awaiting delivery
    // ============================================================================
    console.log('Step 1: Fetching new DBS orders...');
    const newOrders = await sdk.ordersDBS.getNewOrders();
    const orders = newOrders.orders ?? [];
    console.log(`Found ${orders.length} new orders awaiting delivery\n`);

    if (orders.length === 0) {
      console.log('No new DBS orders to process.');
      console.log('Continuing to demonstrate completed orders retrieval...\n');
    } else {
      // Display order details with delivery information
      orders.slice(0, 5).forEach((order) => {
        console.log(`  Order ${order.id}:`);
        console.log(`    Article: ${order.article}`);
        console.log(`    WB Article (nmId): ${order.nmId}`);

        // Delivery window information
        if (order.ddate) {
          const timeWindow =
            order.dTimeFrom && order.dTimeTo ? ` ${order.dTimeFrom}-${order.dTimeTo}` : '';
          console.log(`    Delivery Date: ${order.ddate}${timeWindow}`);
        }

        // Address with GPS coordinates for route planning
        if (order.address) {
          console.log(`    Address: ${order.address.fullAddress}`);
          if (order.address.longitude && order.address.latitude) {
            console.log(`    GPS: ${order.address.latitude}, ${order.address.longitude}`);
          }
        }

        // Check for required metadata (compliance requirements)
        if (order.requiredMeta && order.requiredMeta.length > 0) {
          console.log(`    Required Metadata: ${order.requiredMeta.join(', ')}`);
          console.log(`    ⚠️  Must add metadata before shipping!`);
        }

        // Cargo type for logistics planning
        const cargoTypeName = getCargoTypeName(order.cargoType);
        console.log(`    Cargo Type: ${order.cargoType} (${cargoTypeName})`);

        // Customer comment
        if (order.comment) {
          console.log(`    Customer Comment: ${order.comment}`);
        }

        // Price information
        if (order.price) {
          console.log(`    Price: ${order.price / 100} (currency code: ${order.currencyCode})`);
        }

        console.log('');
      });

      // ============================================================================
      // Step 2: Get customer contact information for delivery coordination
      // ============================================================================
      console.log('Step 2: Getting customer contact info...');

      const orderIds = orders
        .slice(0, 5)
        .map((o) => o.id!)
        .filter(Boolean);

      if (orderIds.length > 0) {
        const clientInfo = await sdk.ordersDBS.getClientInfo(orderIds);
        const clients = clientInfo.orders ?? [];

        clients.forEach((client) => {
          console.log(`  Order ${client.orderID}:`);
          console.log(`    Name: ${client.fullName || client.firstName || 'N/A'}`);

          if (client.phone) {
            const phoneCode = client.phoneCode || '';
            console.log(`    Phone: +${phoneCode} ${formatPhone(client.phone)}`);
          }

          // Additional phone codes (for international customers)
          if (client.additionalPhoneCodes && client.additionalPhoneCodes.length > 0) {
            console.log(`    Additional Codes: ${client.additionalPhoneCodes.join(', ')}`);
          }

          console.log('');
        });
      }
    }

    // ============================================================================
    // Step 3: Get completed orders with pagination (last 7 days)
    // ============================================================================
    console.log('Step 3: Getting completed orders (last 7 days)...');

    const now = Math.floor(Date.now() / 1000);
    const sevenDaysAgo = now - 7 * 24 * 60 * 60;

    let totalOrders = 0;
    let next = 0;
    let pageCount = 0;

    // Paginate through all completed orders
    do {
      const result = await sdk.ordersDBS.getOrders({
        limit: 100,
        next,
        dateFrom: sevenDaysAgo,
        dateTo: now,
      });

      const completedOrders = result.orders ?? [];
      totalOrders += completedOrders.length;
      pageCount++;

      if (pageCount === 1 && completedOrders.length > 0) {
        console.log(`\nFirst page sample (showing first 3 orders):`);
        completedOrders.slice(0, 3).forEach((order) => {
          console.log(`  Order ${order.id}:`);
          console.log(`    Article: ${order.article}`);
          console.log(`    Created: ${order.createdAt}`);
          if (order.address?.fullAddress) {
            console.log(`    Delivered to: ${order.address.fullAddress}`);
          }
          console.log('');
        });
      }

      next = result.next ?? 0;

      // Safety limit to prevent infinite loop in demo
      if (pageCount >= 10) {
        console.log(`  (Stopping at page ${pageCount} for demo purposes)`);
        break;
      }
    } while (next > 0);

    console.log(`Total completed orders in last 7 days: ${totalOrders}`);
    console.log(`Total pages fetched: ${pageCount}\n`);

    // ============================================================================
    // Step 4: Demonstrate date range validation
    // ============================================================================
    console.log('Step 4: Demonstrating validation rules...\n');

    console.log('Date range validation:');
    console.log('  - Maximum 30 calendar days per request');
    console.log('  - dateFrom must be less than or equal to dateTo');
    console.log('  - Timestamps are Unix timestamps (seconds)\n');

    console.log('Pagination:');
    console.log('  - Use next=0 for first request');
    console.log('  - Continue with returned next value until next=0');
    console.log('  - limit: 1-1000 orders per request\n');

    console.log('Required metadata types:');
    console.log('  - sgtin: Marking codes (for regulated products)');
    console.log('  - imei: International Mobile Equipment Identity');
    console.log('  - uin: Unique Identification Number');
    console.log('  - gtin: Global Trade Item Number');
    console.log('  - customsDeclaration: Customs declaration number\n');

    // ============================================================================
    // Summary
    // ============================================================================
    console.log('=== DBS Core Workflow Complete ===\n');

    console.log('DBS Order Lifecycle:');
    console.log('  1. Order appears in getNewOrders() with delivery details');
    console.log('  2. Get customer contact info via getClientInfo()');
    console.log('  3. Add required metadata if requiredMeta is present');
    console.log('  4. Confirm order and arrange delivery');
    console.log('  5. Deliver to customer within specified time window');
    console.log('  6. Mark as delivered (handled by subsequent methods)\n');

    console.log('Next steps (see Story 12.2-12.5 for full implementation):');
    console.log('  - Status management: confirmOrder, deliverOrder, receiveOrder');
    console.log('  - Metadata operations: addMeta, updateMeta');
    console.log('  - B2B support: getB2BInfo for organizational buyers');
  } catch (error) {
    console.error('\n❌ Error occurred during DBS workflow:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
      console.error(`   DBS API limit: 300 req/min with 200ms interval`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Check API key and DBS permissions`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Common issues:`);
      console.error(`   - Date range exceeds 30 days`);
      console.error(`   - limit not in 1-1000 range`);
      console.error(`   - Empty orderIds array`);
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error: ${error.message}`);
      console.error(`   Check connectivity to marketplace-api.wildberries.ru`);
    } else if (error instanceof WBAPIError) {
      console.error(`⚠️  API error (${error.statusCode}): ${error.message}`);
      console.error(`   See: https://dev.wildberries.ru/openapi/orders-dbs`);
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
function getCargoTypeName(cargoType?: number): string {
  const names: Record<number, string> = {
    1: 'Small cargo (MGT)',
    2: 'Oversized cargo (SGT)',
    3: 'Large cargo (KGT+)',
  };
  return cargoType ? names[cargoType] || 'Unknown' : 'Unknown';
}

/**
 * Helper: Format phone number for display
 */
function formatPhone(phone: string): string {
  // Simple formatting: XXX-XXX-XX-XX
  if (phone.length === 10) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`;
  }
  return phone;
}

// Run the example
dbsCoreWorkflow();

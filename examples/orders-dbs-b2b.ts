/**
 * DBS B2B Workflow - Organizational Buyer Orders
 *
 * This example demonstrates handling B2B (Business-to-Business) DBS orders
 * where the buyer is an organization rather than an individual:
 * - Identifying B2B orders in your order flow
 * - Fetching organizational buyer information (company name, INN, KPP)
 * - Generating compliant documentation for B2B sales
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 10 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - OrdersDBS module permissions enabled
 * - Active DBS orders (some may be B2B)
 *
 * **What This Example Covers:**
 * - **B2B Detection**: Identify orders from organizational buyers
 * - **Company Info**: Retrieve INN, KPP, and organization name
 * - **Documentation**: Generate invoice data for accounting
 * - **Error Handling**: Handle cases where B2B info is unavailable
 *
 * **B2B vs Individual Orders:**
 * - B2B orders have organizational buyer attached
 * - You can request INN, KPP for tax documentation
 * - Same delivery workflow, but different invoicing requirements
 *
 * **Expected Output:**
 * ```
 * === DBS B2B Workflow - Organizational Buyers ===
 *
 * Step 1: Fetching new DBS orders...
 * Found 5 new orders
 *
 * Step 2: Checking B2B information for orders...
 *
 *   Order 12345678:
 *     Organization: OOO "Company Name"
 *     INN: 1234567890
 *     KPP: 123456789
 *     Status: B2B order - requires organizational invoice
 *
 *   Order 12345679:
 *     Status: Individual buyer (not B2B)
 *
 * Step 3: Summary
 *   Total orders: 5
 *   B2B orders: 2
 *   Individual orders: 3
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/orders-dbs-b2b.ts
 * ```
 *
 * **Related Examples:**
 * - orders-dbs-core-workflow.ts - Full DBS order processing workflow
 * - orders-dbs-metadata.ts - Product marking and metadata handling
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

async function dbsB2BWorkflow() {
  console.log('=== DBS B2B Workflow - Organizational Buyers ===\n');

  try {
    // ============================================================================
    // Step 1: Get new DBS orders
    // ============================================================================
    console.log('Step 1: Fetching new DBS orders...');
    const newOrders = await sdk.ordersDBS.getNewOrders();
    const orders = newOrders.orders ?? [];
    console.log(`Found ${orders.length} new orders\n`);

    if (orders.length === 0) {
      console.log('No new DBS orders to process.');
      console.log('To test B2B functionality, ensure you have active DBS orders.\n');
      return;
    }

    // ============================================================================
    // Step 2: Check B2B information for orders
    // ============================================================================
    console.log('Step 2: Checking B2B information for orders...\n');

    // Get order IDs (limit to first 10 for demo)
    const orderIds = orders
      .slice(0, 10)
      .map((o) => o.id!)
      .filter(Boolean);

    if (orderIds.length === 0) {
      console.log('No valid order IDs found.');
      return;
    }

    // Fetch B2B information
    const b2bInfo = await sdk.ordersDBS.getB2BInfo(orderIds);
    const results = b2bInfo.results ?? [];

    // Track statistics
    let b2bCount = 0;
    let individualCount = 0;
    const b2bOrders: Array<{
      orderId: number;
      orgName: string;
      inn: string;
      kpp: string;
    }> = [];

    // Process each result
    results.forEach((result) => {
      console.log(`  Order ${result.orderId}:`);

      if (result.isError) {
        // Error occurred - usually means order not found or no B2B data
        const errorDetail = result.errors?.[0]?.detail ?? 'Unknown error';
        console.log(`    Status: Error - ${errorDetail}`);
        individualCount++;
      } else if (result.data) {
        // B2B order - has organizational data
        const { orgName, inn, kpp } = result.data;
        console.log(`    Organization: ${orgName || 'N/A'}`);
        console.log(`    INN: ${inn || 'N/A'}`);
        console.log(`    KPP: ${kpp || 'N/A (Individual Entrepreneur)'}`);
        console.log(`    Status: B2B order - requires organizational invoice`);

        b2bCount++;
        b2bOrders.push({
          orderId: result.orderId!,
          orgName: orgName || 'Unknown',
          inn: inn || 'N/A',
          kpp: kpp || 'N/A',
        });
      } else {
        // Individual buyer (no B2B data)
        console.log(`    Status: Individual buyer (not B2B)`);
        individualCount++;
      }
      console.log('');
    });

    // ============================================================================
    // Step 3: Summary and B2B order list
    // ============================================================================
    console.log('Step 3: Summary');
    console.log(`  Total orders checked: ${results.length}`);
    console.log(`  B2B orders: ${b2bCount}`);
    console.log(`  Individual orders: ${individualCount}\n`);

    if (b2bOrders.length > 0) {
      console.log('B2B Orders requiring organizational invoices:');
      console.log('-'.repeat(60));
      console.log('Order ID    | INN          | Organization');
      console.log('-'.repeat(60));

      b2bOrders.forEach((order) => {
        const orderId = order.orderId.toString().padEnd(11);
        const inn = order.inn.padEnd(12);
        console.log(`${orderId} | ${inn} | ${order.orgName}`);
      });

      console.log('-'.repeat(60));
      console.log('');
    }

    // ============================================================================
    // Step 4: Documentation guidance
    // ============================================================================
    console.log('Step 4: B2B Documentation Requirements\n');

    console.log('For B2B orders, ensure you:');
    console.log('  1. Generate invoice (счёт-фактура) with organization details');
    console.log('  2. Include INN and KPP in accounting documents');
    console.log('  3. Keep records for tax reporting (5 years minimum)');
    console.log('  4. Issue Universal Transfer Document (УПД) if required\n');

    console.log('Invoice data example:');
    if (b2bOrders.length > 0) {
      const example = b2bOrders[0];
      console.log(`  Buyer: ${example.orgName}`);
      console.log(`  INN: ${example.inn}`);
      console.log(`  KPP: ${example.kpp}`);
      console.log(`  Order Reference: WB-DBS-${example.orderId}`);
    } else {
      console.log('  (No B2B orders found for example)');
    }
    console.log('');

    // ============================================================================
    // Summary
    // ============================================================================
    console.log('=== DBS B2B Workflow Complete ===\n');

    console.log('B2B Order Processing Tips:');
    console.log('  - Check B2B info early in your order processing pipeline');
    console.log('  - Prepare organizational invoices before delivery');
    console.log('  - Keep INN/KPP on file for tax reporting');
    console.log('  - KPP may be empty for Individual Entrepreneurs (ИП)');
  } catch (error) {
    console.error('\n❌ Error occurred during B2B workflow:');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded: ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔐 Authentication failed: ${error.message}`);
      console.error(`   Check API key and DBS permissions`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation error: ${error.message}`);
      console.error(`   Common issues:`);
      console.error(`   - Empty orderIds array`);
      console.error(`   - Invalid order IDs`);
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

// Run the example
dbsB2BWorkflow();

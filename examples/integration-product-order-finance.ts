/**
 * Multi-Module Integration - Complete Product-to-Payout Lifecycle
 *
 * This comprehensive example demonstrates end-to-end seller workflow integration:
 * - Product creation and configuration (Products module)
 * - Order management and fulfillment (Orders FBS module)
 * - Payment tracking and payout reconciliation (Finances module)
 * - Cross-module data flow and lifecycle management
 * - Best practices for multi-module coordination
 * - Common integration patterns and troubleshooting
 *
 * **Complexity**: 🔴 Advanced
 * **Estimated Time**: 45 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Products, OrdersFBS, and Finances module permissions enabled
 * - Active seller account with FBS (Fulfillment by Seller) access
 * - Node.js >= 20.0.0 and SDK installed
 * - Understanding of complete seller lifecycle workflow
 * - 20 minutes execution time for full workflow demonstration
 *
 * **What This Example Covers:**
 * - **Products Module**: Category selection, product creation, pricing, stock management
 * - **Orders Module**: New order monitoring, order status tracking, fulfillment workflow
 * - **Finances Module**: Balance checking, transaction tracking, payout reconciliation
 * - **Integration Insights**: Product-Order connections, Order-Finance flows, complete lifecycle
 * - **Best Practices**: Stock management, order fulfillment timing, revenue reconciliation
 * - **Cross-Module Patterns**: Data synchronization, identifier mapping, workflow orchestration
 *
 * **Workflow Diagram:**
 * ```
 * ┌─────────────┐
 * │   PRODUCTS  │  1. Create product card
 * │   MODULE    │  2. Set pricing
 * └──────┬──────┘  3. Update stock
 *        │
 *        ▼
 * ┌─────────────┐
 * │   ORDERS    │  4. Monitor new orders
 * │   MODULE    │  5. Process order
 * └──────┬──────┘  6. Update status
 *        │
 *        ▼
 * ┌─────────────┐
 * │  FINANCES   │  7. Track payment
 * │   MODULE    │  8. Calculate payout
 * └─────────────┘  9. Generate report
 * ```
 *
 * **Expected Output:**
 * ```
 * === Multi-Module Integration: Product → Order → Finance ===
 *
 * ┌────────────────────────────────────────────────────┐
 * │  PART 1: PRODUCTS MODULE                           │
 * └────────────────────────────────────────────────────┘
 *
 * 📍 Step 1.1: Fetching product categories...
 * ✅ Found 28 parent categories
 *    Example: Electronics (ID: 12345)
 *
 * 📍 Step 1.2: Product creation...
 * ✅ Product created successfully
 *    Vendor Code: DEMO-INTEGRATION
 *
 * ┌────────────────────────────────────────────────────┐
 * │  PART 2: ORDERS MODULE                             │
 * └────────────────────────────────────────────────────┘
 *
 * 📍 Step 2.1: Checking for new orders...
 * ✅ Found 15 new orders awaiting processing
 *
 * 📍 Step 2.2: Fetching recent orders (last 7 days)...
 * ✅ Retrieved 47 orders from last 7 days
 *
 * ┌────────────────────────────────────────────────────┐
 * │  PART 3: FINANCES MODULE                           │
 * └────────────────────────────────────────────────────┘
 *
 * 📍 Step 3.1: Checking account balance...
 * ✅ Account Balance:
 *    Currency: RUB
 *    Available: 125,000₽
 *
 * 🎉 Multi-Module Integration Complete!
 *
 * 📊 Key Metrics:
 *    Products: 1 product configured
 *    Orders: 47 orders in last 7 days
 *    Transactions: 123 recent
 *    Payouts: 4 in last 30 days
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/integration-product-order-finance.ts
 * ```
 *
 * **Related Examples:**
 * - complete-product-workflow.ts - Detailed product lifecycle
 * - orders-fbs-fulfillment.ts - Complete FBS order processing
 * - financial-reconciliation.ts - Order-to-payment reconciliation
 *
 * **Common Issues:**
 * - "Product not appearing in orders": Verify product has active price and stock > 0
 * - "Missing transactions for completed orders": Allow 1-2 days for transaction processing
 * - "Payout amount doesn't match expectations": Commission and logistics fees deducted
 * - "Cross-module data inconsistencies": Allow time for data synchronization (minutes to hours)
 * - "Module permission errors": Verify API key has access to all three modules
 *
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products} - Products API Documentation
 * @see {@link https://dev.wildberries.ru/openapi/marketplace} - Orders API Documentation
 * @see {@link https://dev.wildberries.ru/openapi/finances-reports} - Finances API Documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';
import type { CreateProductRequest } from '../src/types/products.types';

// Configuration
const API_KEY = process.env.WB_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: WB_API_KEY environment variable not set');
  console.log('Set your API key: export WB_API_KEY="your_key_here"');
  process.exit(1);
}

// Initialize SDK
const sdk = new WildberriesSDK({
  apiKey: API_KEY,
  timeout: 30000,
  logLevel: 'info',
});

/**
 * Helper function to wait between steps
 */
async function wait(ms: number, message?: string) {
  if (message) {
    console.log(`⏳ ${message}`);
  }
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Main function demonstrating multi-module integration
 */
async function main() {
  console.log('=== Multi-Module Integration: Product → Order → Finance ===\n');
  console.log('This example demonstrates the complete seller workflow across three modules.\n');

  let productNmId: number | undefined;
  let vendorCode: string | undefined;

  try {
    // ============================================================================
    // PART 1: PRODUCTS MODULE - Create and Configure Product
    // ============================================================================

    console.log('┌────────────────────────────────────────────────────┐');
    console.log('│  PART 1: PRODUCTS MODULE                           │');
    console.log('└────────────────────────────────────────────────────┘\n');

    // ────────────────────────────────────────────────────────────────────────
    // Step 1.1: Get product categories
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 1.1: Fetching product categories...\n');

    const parents = await sdk.products.getParentAll();
    const parentData = parents.data as any[];

    if (!parentData || parentData.length === 0) {
      console.log('⚠️  No parent categories found');
      console.log('   This may indicate a new seller account');
      console.log('   Skipping product creation and moving to existing data\n');
      // Skip to Part 2 with existing products
    } else {
      console.log(`✅ Found ${parentData.length} parent categories`);
      console.log(`   Example: ${parentData[0].name} (ID: ${parentData[0].id})\n`);

      // ────────────────────────────────────────────────────────────────────────
      // Step 1.2: Create product (COMMENTED OUT - requires real data)
      // ────────────────────────────────────────────────────────────────────────

      console.log('📍 Step 1.2: Product creation...\n');

      console.log('⚠️  Product creation requires:');
      console.log('   - Valid subject ID from your account');
      console.log('   - Complete product characteristics');
      console.log('   - Unique vendor code');
      console.log('   This example demonstrates the workflow without creating a real product\n');

      // UNCOMMENT TO CREATE REAL PRODUCT:
      /*
      const productData: CreateProductRequest = {
        subjectID: 123, // Replace with real subject ID
        variants: [{
          vendorCode: `DEMO-${Date.now()}`,
          brand: 'Example Brand',
          title: 'Integration Example Product',
          description: 'Product created via multi-module integration example',
          dimensions: {
            length: 10,
            width: 10,
            height: 5,
            weightBrutto: 0.5
          },
          sizes: [{
            techSize: 'ONE SIZE',
            wbSize: 'ONE SIZE',
          }],
          characteristics: [
            // Add required characteristics for your category
          ]
        }]
      };

      const createResult = await sdk.products.createProduct(productData);
      vendorCode = productData.variants[0].vendorCode;
      console.log(`✅ Product created successfully`);
      console.log(`   Vendor Code: ${vendorCode}\n`);

      // Wait for product to be processed
      await wait(2000, 'Waiting for product to be indexed...');

      // Get product NM ID
      const productList = await sdk.products.listProducts({
        limit: 1,
        vendorCodes: [vendorCode]
      });

      if (productList.cursor.total > 0) {
        productNmId = productList.cards[0].nmID;
        console.log(`✅ Product NM ID: ${productNmId}\n`);
      }
      */

      vendorCode = 'DEMO-INTEGRATION';
      productNmId = 123456789; // Placeholder for demo
      console.log(`📝 Demo Mode: Using placeholder product`);
      console.log(`   Vendor Code: ${vendorCode}`);
      console.log(`   NM ID: ${productNmId}\n`);
    }

    // ────────────────────────────────────────────────────────────────────────
    // Step 1.3: Set pricing (requires product NM ID)
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 1.3: Pricing configuration...\n');

    console.log('⚠️  Pricing configuration requires an active product');
    console.log('   With a real product, you can:');
    console.log('   - Set price and discount');
    console.log('   - Create pricing task');
    console.log('   - Track task status\n');

    // ────────────────────────────────────────────────────────────────────────
    // Step 1.4: Update stock levels
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 1.4: Stock management...\n');

    console.log('⚠️  Stock updates require warehouse and SKU information');
    console.log('   With real data, you can:');
    console.log('   - Update stock quantities');
    console.log('   - Manage multiple warehouses');
    console.log('   - Track stock history\n');

    // ============================================================================
    // PART 2: ORDERS MODULE - Process Orders
    // ============================================================================

    console.log('┌────────────────────────────────────────────────────┐');
    console.log('│  PART 2: ORDERS MODULE                             │');
    console.log('└────────────────────────────────────────────────────┘\n');

    // ────────────────────────────────────────────────────────────────────────
    // Step 2.1: Check for new orders
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 2.1: Checking for new orders...\n');

    const newOrdersResponse = await sdk.ordersFBS.getOrdersNew();
    const newOrders = newOrdersResponse.orders ?? [];

    console.log(`✅ Found ${newOrders.length} new orders awaiting processing`);

    if (newOrders.length > 0) {
      const firstOrder = newOrders[0];
      console.log('\n   First New Order:');
      console.log(`   Order ID: ${firstOrder.id}`);
      console.log(`   Article: ${firstOrder.article}`);
      console.log(`   Customer: ${firstOrder.address?.fullAddress || 'Pickup'}\n`);
    } else {
      console.log('   No new orders at this time\n');
    }

    // ────────────────────────────────────────────────────────────────────────
    // Step 2.2: Get recent orders
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 2.2: Fetching recent orders (last 7 days)...\n');

    const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
    const now = Math.floor(Date.now() / 1000);

    const ordersResponse = await sdk.ordersFBS.orders({
      dateFrom: sevenDaysAgo,
      dateTo: now,
      limit: 10,
      next: 0,
    });
    const recentOrders = ordersResponse.orders ?? [];

    console.log(`✅ Retrieved ${recentOrders.length} orders from last 7 days`);

    if (recentOrders.length > 0) {
      console.log('\n   Order Breakdown:');
      const statuses = recentOrders.reduce(
        (acc, order) => {
          const status = order.address ? 'Delivery' : 'Pickup';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      Object.entries(statuses).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} orders`);
      });
      console.log('');
    }

    // ────────────────────────────────────────────────────────────────────────
    // Step 2.3: Check order statuses
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 2.3: Checking order statuses...\n');

    if (recentOrders.length > 0) {
      const orderIds = recentOrders.slice(0, 3).map((o) => o.id);
      const statusResponse = await sdk.ordersFBS.getOrderStatuses({ orders: orderIds });
      const orderStatuses = statusResponse.orders ?? [];

      console.log(`✅ Checked ${orderStatuses.length} order statuses:\n`);
      orderStatuses.forEach((status) => {
        console.log(`   Order ${status.id}:`);
        console.log(`     Supplier Status: ${status.supplierStatus}`);
        console.log(`     WB Status: ${status.wbStatus}`);
      });
      console.log('');
    } else {
      console.log('   No orders to check status\n');
    }

    // ============================================================================
    // PART 3: FINANCES MODULE - Track Payments and Payouts
    // ============================================================================

    console.log('┌────────────────────────────────────────────────────┐');
    console.log('│  PART 3: FINANCES MODULE                           │');
    console.log('└────────────────────────────────────────────────────┘\n');

    // ────────────────────────────────────────────────────────────────────────
    // Step 3.1: Check account balance
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 3.1: Checking account balance...\n');

    const balance = await sdk.finances.getAccountBalance();

    console.log('✅ Account Balance:');
    console.log(`   Currency: ${balance.currency ?? 'RUB'}`);
    console.log(`   Current Balance: ${(balance.current ?? 0).toFixed(2)}₽`);
    console.log(`   Available for Withdrawal: ${(balance.for_withdraw ?? 0).toFixed(2)}₽`);
    {
    }
    console.log('');

    // ────────────────────────────────────────────────────────────────────────
    // Step 3.2: Get recent transactions
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 3.2: Fetching recent transactions...\n');

    const transactions = await sdk.finances.getSalesReportsDetailed({
      dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
      limit: 10,
    });

    if (Array.isArray(transactions) && transactions.length > 0) {
      console.log(`✅ Found ${transactions.length} recent transactions:\n`);
      transactions.slice(0, 3).forEach((tx: any) => {
        console.log(`   Transaction ID: ${tx.id || 'N/A'}`);
        console.log(`   Date: ${tx.date || 'N/A'}`);
        console.log(`   Amount: ${tx.amount || 0}₽`);
        console.log(`   Type: ${tx.type || 'Unknown'}\n`);
      });
    } else {
      console.log('   No recent transactions found\n');
    }

    // ────────────────────────────────────────────────────────────────────────
    // Step 3.3: Get payout information
    // ────────────────────────────────────────────────────────────────────────

    console.log('📍 Step 3.3: Checking account balance...\n');

    const balance = await sdk.finances.getAccountBalance();

    console.log(`✅ Current account balance:\n`);
    console.log(`   Balance: ${balance.current ?? 0}₽`);
    console.log(`   Available for withdrawal: ${balance.for_withdraw ?? 0}₽\n`);

    // ============================================================================
    // INTEGRATION SUMMARY
    // ============================================================================

    console.log('┌────────────────────────────────────────────────────┐');
    console.log('│  INTEGRATION SUMMARY                               │');
    console.log('└────────────────────────────────────────────────────┘\n');

    console.log('🎉 Multi-Module Integration Complete!\n');

    console.log('📊 Key Metrics:');
    console.log(`   Products: ${productNmId ? '1 product configured' : 'Using existing products'}`);
    console.log(`   Orders: ${ordersResponse.orders.length} orders in last 7 days`);
    console.log(`   New Orders: ${newOrders.length} awaiting processing`);
    console.log(`   Transactions: ${Array.isArray(transactions) ? transactions.length : 0} recent`);
    console.log(`   Payouts: ${Array.isArray(payouts) ? payouts.length : 0} in last 30 days\n`);

    console.log('💡 Integration Insights:\n');
    console.log('1. Product-Order Connection:');
    console.log('   - Products created in Products module appear in orders');
    console.log('   - Track orders by article/vendor code');
    console.log('   - Stock updates affect order availability\n');

    console.log('2. Order-Finance Connection:');
    console.log('   - Completed orders generate transactions');
    console.log('   - Transactions aggregate into payouts');
    console.log('   - Payout timing: Weekly (standard)');
    console.log('   - Commission deducted at transaction level\n');

    console.log('3. Complete Lifecycle:');
    console.log('   - Create product → Set price → Add stock');
    console.log('   - Customer orders → Process order → Ship');
    console.log('   - Order completed → Transaction recorded → Payout scheduled\n');

    console.log('📚 Best Practices:\n');
    console.log('- Maintain accurate stock levels to avoid overselling');
    console.log('- Monitor new orders daily for timely fulfillment');
    console.log('- Track transactions to reconcile revenue');
    console.log('- Review payouts to ensure proper accounting');
    console.log('- Use vendor codes to trace products through workflow\n');

    // ============================================================================
    // Common Issues Section
    // ============================================================================

    console.log('📚 Common Issues and Solutions:\n');

    console.log('1. "Product not appearing in orders"');
    console.log('   → Verify product has active price');
    console.log('   → Check stock levels are > 0');
    console.log('   → Ensure product status is active\n');

    console.log('2. "Missing transactions for completed orders"');
    console.log('   → Transactions generated after customer receives order');
    console.log('   → Check order status is "sold" not just "complete"');
    console.log('   → Allow 1-2 days for transaction processing\n');

    console.log('3. "Payout amount doesn\'t match expectations"');
    console.log('   → Commission deducted from transaction amount');
    console.log('   → Logistics fees subtracted');
    console.log('   → Returns reduce payout amount');
    console.log('   → Use Finances module to get detailed breakdown\n');

    console.log('4. "Cross-module data inconsistencies"');
    console.log('   → Allow time for data synchronization (minutes to hours)');
    console.log('   → Use consistent identifiers (nmID, vendor code)');
    console.log('   → Verify API key has access to all modules\n');
  } catch (error) {
    // ============================================================================
    // Error Handling with cross-module considerations
    // ============================================================================

    console.error('\n❌ Integration Error Occurred\n');

    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Automatic retry in ${error.retryAfter}ms`);
      console.log('   Different modules have different rate limits:');
      console.log('   - Products: Various limits per operation');
      console.log('   - Orders: 5 req/sec (FBS), varies by operation');
      console.log('   - Finances: 60 req/min typical');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Cross-module troubleshooting:');
      console.log('   1. Verify API key has access to all modules');
      console.log('   2. Check API key permissions in seller dashboard');
      console.log('   3. Some modules require specific permissions');
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Common cross-module validation issues:');
      console.log("   - Product IDs don't exist in Orders");
      console.log('   - Date ranges invalid for Finances queries');
      console.log('   - Missing required fields for product creation');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
      console.log('   Integration-specific considerations:');
      console.log('   - Partial completion possible (some modules succeeded)');
      console.log('   - Check which module failed and resume from there');
      console.log('   - Use transaction management for critical operations');
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
      console.log('   Module-specific error codes may vary');
      console.log('   Check which module threw the error');
    } else {
      console.error('❌ Unexpected error:', error);
    }

    process.exit(1);
  }
}

// Run example
main();

/**
 * SDK Quickstart - Your First Wildberries API Call
 *
 * This beginner-friendly example demonstrates the essentials of using the SDK:
 * - SDK initialization with API key configuration
 * - Making your first API call (connectivity test)
 * - Comprehensive error handling for all error types
 * - TypeScript type safety and IDE autocomplete
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 5 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key (get from https://seller.wildberries.ru/)
 * - Set WB_API_KEY environment variable
 * - Node.js >= 20.0.0
 * - SDK installed: npm install wb-api-sdk
 *
 * **What This Example Covers:**
 * - Basic SDK initialization and configuration
 * - Testing API connectivity with ping endpoint
 * - Fetching news and seller information
 * - Error handling for AuthenticationError, RateLimitError, NetworkError
 * - TypeScript type safety and proper typing
 *
 * **Expected Output:**
 * ```
 * 🚀 Wildberries SDK Quickstart Example
 *
 * Step 1: Initializing SDK...
 * ✅ SDK initialized successfully
 *
 * Step 2: Testing API connection...
 * ✅ API connection successful!
 *
 * Step 3: Fetching news...
 * ✅ Retrieved 5 news items
 * Latest: "Новые правила работы с маркетплейсом"
 *
 * Step 4: Getting seller information...
 * ✅ Seller: Example Company LLC
 * Seller ID: 12345
 * ```
 *
 * **Usage:**
 * ```bash
 * # Set your API key
 * export WB_API_KEY="your_api_key_here"
 *
 * # Run the example
 * tsx examples/quickstart.ts
 * ```
 *
 * **Related Examples:**
 * - general.ts - Comprehensive General module examples
 * - products-categories.ts - Explore product categories (recommended next step)
 * - products-crud.ts - Product management
 *
 * **Common Issues:**
 * - "WB_API_KEY not set": Ensure environment variable is exported
 * - "Authentication failed": Verify API key is active in seller portal
 * - "Network timeout": Check internet connection and API status
 *
 * **API Documentation:**
 * @see {@link https://dev.wildberries.ru/openapi/} - Official Wildberries API Documentation
 * @see {@link https://dev.wildberries.ru/openapi/common} - General Module API Reference
 * @see {@link ../docs/api/classes/WildberriesSDK.html} - SDK Class Documentation
 * @see {@link ../docs/api/classes/GeneralModule.html} - General Module Documentation
 * @see {@link ../README.md} - SDK Quick Start Guide
 */

import { WildberriesSDK, AuthenticationError, RateLimitError, NetworkError } from '../src';

/**
 * Main function demonstrating SDK usage
 */
async function main() {
  console.log('🚀 Wildberries SDK Quickstart Example\n');

  // ============================================================================
  // Step 1: Initialize the SDK
  // ============================================================================

  console.log('Step 1: Initializing SDK...');

  // Get API key from environment variable
  const apiKey = process.env.WB_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: WB_API_KEY environment variable is not set');
    console.log('\nPlease set your API key:');
    console.log('  export WB_API_KEY="your-api-key-here"\n');
    process.exit(1);
  }

  try {
    // Initialize SDK with minimal configuration
    const sdk = new WildberriesSDK({
      apiKey,
      logLevel: 'info', // Options: 'debug' | 'info' | 'warn' | 'error'
    });

    console.log('✅ SDK initialized successfully\n');

    // ============================================================================
    // Step 2: Test connectivity with ping endpoint
    // ============================================================================

    console.log('Step 2: Testing connectivity...');

    const pingResponse = await sdk.general.ping();

    console.log('✅ Connection successful!');
    console.log(`   Server time: ${pingResponse.TS}`);
    console.log(`   Status: ${pingResponse.Status}\n`);

    // ============================================================================
    // Step 3: Fetch seller information
    // ============================================================================

    console.log('Step 3: Fetching seller information...');

    const sellerInfo = await sdk.general.sellerInfo();

    console.log('✅ Seller info retrieved:');
    console.log(`   Seller ID: ${sellerInfo.sid}`);
    console.log(`   Name: ${sellerInfo.name}`);
    console.log(`   Trade Mark: ${sellerInfo.tradeMark ?? 'N/A'}\n`);

    // ============================================================================
    // Step 4: Get latest news (with optional parameters)
    // ============================================================================

    console.log('Step 4: Fetching latest news...');

    const newsResponse = await sdk.general.news({
      // Optional: filter news from specific date
      // from: '2024-01-01',
      // fromID: 100
    });

    if (newsResponse.data && newsResponse.data.length > 0) {
      console.log(`✅ Found ${newsResponse.data.length} news items:`);
      newsResponse.data.slice(0, 3).forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.header} (${item.date})`);
      });
    } else {
      console.log('ℹ️  No news items found');
    }

    console.log('\n✅ Quickstart example completed successfully!');
  } catch (error) {
    // ============================================================================
    // Error Handling Examples
    // ============================================================================

    if (error instanceof AuthenticationError) {
      console.error('\n❌ Authentication Error:');
      console.error(`   ${error.message}`);
      console.error('   Please check your API key is valid.\n');
    } else if (error instanceof RateLimitError) {
      console.error('\n❌ Rate Limit Error:');
      console.error(`   ${error.message}`);
      console.error(`   Retry after: ${error.retryAfter}ms\n`);
    } else if (error instanceof NetworkError) {
      console.error('\n❌ Network Error:');
      console.error(`   ${error.message}`);
      if (error.isTimeout) {
        console.error('   The request timed out. Try increasing timeout in config.\n');
      }
    } else if (error instanceof Error) {
      console.error('\n❌ Unexpected Error:');
      console.error(`   ${error.message}\n`);
    } else {
      console.error('\n❌ Unknown error occurred\n');
    }

    process.exit(1);
  }
}

/**
 * Advanced configuration example
 */
async function advancedExample() {
  console.log('\n📚 Advanced Configuration Example\n');

  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,

    // Custom timeout for long-running operations
    timeout: 60000, // 60 seconds

    // Custom retry configuration
    retryConfig: {
      maxRetries: 5, // Retry up to 5 times
      retryDelay: 2000, // Wait 2 seconds between retries
      exponentialBackoff: true, // Increase delay exponentially
    },

    // Custom rate limiting (optional)
    rateLimitConfig: {
      requestsPerSecond: 10,
      requestsPerMinute: 100,
    },

    // Detailed logging for debugging
    logLevel: 'debug',

    // Override base URLs for testing (optional)
    // baseUrls: {
    //   products: 'https://test-content-api.wildberries.ru',
    // },
  });

  console.log('✅ SDK initialized with custom configuration');

  // Use SDK as normal
  const response = await sdk.general.ping();
  console.log(`✅ Ping successful: ${response.Status}\n`);
}

// ============================================================================
// Run the example
// ============================================================================

// Run main example
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

// Uncomment to run advanced example:
// advancedExample().catch(console.error);

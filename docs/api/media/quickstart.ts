/**
 * Wildberries SDK - Quickstart Example
 *
 * This example demonstrates basic SDK usage including:
 * - SDK initialization
 * - Making API calls
 * - Error handling
 * - TypeScript type safety
 *
 * Prerequisites:
 * 1. Get your API key from the Wildberries seller portal: https://seller.wildberries.ru/
 * 2. Set the WB_API_KEY environment variable:
 *    export WB_API_KEY="your-api-key-here"
 *
 * Run this example:
 *    npx tsx examples/quickstart.ts
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
    console.log(`   Supplier ID: ${sellerInfo.supplierID}`);
    console.log(`   Name: ${sellerInfo.name}`);
    console.log(`   INN: ${sellerInfo.inn}\n`);

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

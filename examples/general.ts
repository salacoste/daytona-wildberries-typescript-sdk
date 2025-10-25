/**
 * GeneralModule Usage Examples
 *
 * This file demonstrates how to use the GeneralModule for:
 * - Testing API connectivity with ping()
 * - Retrieving Wildberries news and announcements
 * - Getting authenticated seller information
 * - Handling various error scenarios
 *
 * @example
 * Run this file with: tsx examples/general.ts
 */

import { GeneralModule } from '../src/modules/general';
import { BaseClient } from '../src/client/base-client';
import { AuthenticationError } from '../src/errors/auth-error';
import { RateLimitError } from '../src/errors/rate-limit-error';
import { NetworkError } from '../src/errors/network-error';

/**
 * Main function demonstrating GeneralModule usage
 */
async function main() {
  // ========================================
  // Example 1: Initialize BaseClient and GeneralModule
  // ========================================
  console.log('📦 Initializing Wildberries SDK General Module...\n');

  const baseClient = new BaseClient({
    apiKey: process.env.WB_API_KEY ?? 'your-api-key-here',
    timeout: 30000,
    retryConfig: {
      maxRetries: 3,
      retryDelay: 1000,
      exponentialBackoff: true
    }
  });

  const general = new GeneralModule(baseClient);

  // ========================================
  // Example 2: Test Connection with ping()
  // ========================================
  console.log('🏓 Example 1: Testing API connection with ping()');
  console.log('─'.repeat(50));

  try {
    const pingResult = await general.ping();

    console.log('✅ Connection successful!');
    console.log(`   Status: ${pingResult.Status}`);
    console.log(`   Timestamp: ${pingResult.TS ?? 'N/A'}`);
    console.log();
  } catch (error) {
    handleError('ping()', error);
    // If ping fails, likely API key is invalid - exit early
    console.log('\n⚠️  Cannot proceed without valid API connection. Exiting.\n');
    return;
  }

  // ========================================
  // Example 3: Retrieve News Without Parameters
  // ========================================
  console.log('📰 Example 2: Fetching recent Wildberries news');
  console.log('─'.repeat(50));

  try {
    const newsResult = await general.news();

    if (newsResult.data && newsResult.data.length > 0) {
      console.log(`✅ Found ${newsResult.data.length} news items:\n`);

      newsResult.data.slice(0, 3).forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.header ?? 'Untitled'}`);
        console.log(`      Date: ${item.date ?? 'N/A'}`);
        console.log(`      ID: ${item.id ?? 'N/A'}`);
        if (item.content) {
          const preview = item.content.substring(0, 60);
          console.log(`      Preview: ${preview}${item.content.length > 60 ? '...' : ''}`);
        }
        console.log();
      });

      if (newsResult.data.length > 3) {
        console.log(`   ... and ${newsResult.data.length - 3} more items\n`);
      }
    } else {
      console.log('ℹ️  No news items found\n');
    }
  } catch (error) {
    handleError('news()', error);
  }

  // ========================================
  // Example 4: Retrieve News With Date Filter
  // ========================================
  console.log('📅 Example 3: Fetching news from specific date');
  console.log('─'.repeat(50));

  try {
    const newsWithFilter = await general.news({
      from: '2024-01-01'
    });

    console.log(`✅ Found ${newsWithFilter.data?.length ?? 0} news items since 2024-01-01\n`);
  } catch (error) {
    handleError('news({ from: "2024-01-01" })', error);
  }

  // ========================================
  // Example 5: Retrieve News With fromID Parameter
  // ========================================
  console.log('🔢 Example 4: Fetching news starting from specific ID');
  console.log('─'.repeat(50));

  try {
    const newsWithID = await general.news({
      fromID: 100
    });

    console.log(`✅ Found ${newsWithID.data?.length ?? 0} news items from ID 100 onwards\n`);
  } catch (error) {
    handleError('news({ fromID: 100 })', error);
  }

  // ========================================
  // Example 6: Get Seller Information
  // ========================================
  console.log('👤 Example 5: Fetching authenticated seller information');
  console.log('─'.repeat(50));

  try {
    const sellerInfo = await general.sellerInfo();

    console.log('✅ Seller information retrieved:');
    console.log(`   Name: ${sellerInfo.name ?? 'N/A'}`);
    console.log(`   Seller ID: ${sellerInfo.sid ?? 'N/A'}`);
    console.log(`   Trademark: ${sellerInfo.tradeMark ?? 'N/A'}`);
    console.log();
  } catch (error) {
    handleError('sellerInfo()', error);
  }

  // ========================================
  // Example 7: Error Handling Demonstration
  // ========================================
  console.log('⚠️  Example 6: Error handling demonstration');
  console.log('─'.repeat(50));
  console.log('The SDK handles various error scenarios:');
  console.log('  • AuthenticationError: Invalid API key (401/403)');
  console.log('  • RateLimitError: Too many requests (429) - auto-retried');
  console.log('  • NetworkError: Server errors (5xx) - auto-retried');
  console.log('  • ValidationError: Invalid request data (400/422)');
  console.log('\nAll errors are typed and can be caught with instanceof checks.\n');

  console.log('✨ All examples completed!\n');
}

/**
 * Centralized error handler demonstrating proper error handling patterns
 *
 * @param operation - Name of the operation that failed
 * @param error - The caught error
 */
function handleError(operation: string, error: unknown): void {
  console.log(`❌ Error in ${operation}:\n`);

  if (error instanceof AuthenticationError) {
    console.log('   🔒 Authentication Error');
    console.log('   Issue: Invalid or missing API key');
    console.log('   Solution: Get your API key from https://seller.wildberries.ru/');
    console.log('   Then set: export WB_API_KEY=your-key\n');
  } else if (error instanceof RateLimitError) {
    console.log('   ⏱️  Rate Limit Error');
    console.log(`   Issue: Too many requests`);
    console.log(`   Retry after: ${error.retryAfter}ms`);
    console.log('   Note: SDK automatically retries with exponential backoff\n');
  } else if (error instanceof NetworkError) {
    console.log('   🌐 Network Error');
    console.log(`   Issue: ${error.message}`);
    console.log(`   Status code: ${error.statusCode ?? 'N/A'}`);
    console.log('   Note: SDK automatically retries transient errors (5xx)\n');
  } else if (error instanceof Error) {
    console.log('   💥 Unexpected Error');
    console.log(`   Message: ${error.message}`);
    console.log(`   Type: ${error.constructor.name}\n`);
  } else {
    console.log('   ❓ Unknown Error');
    console.log(`   ${String(error)}\n`);
  }
}

/**
 * Run the examples with proper error handling
 */
main().catch((error: unknown) => {
  console.error('\n💥 Fatal error running examples:\n');
  if (error instanceof Error) {
    console.error(`   ${error.message}`);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
  } else {
    console.error(`   ${String(error)}`);
  }
  process.exit(1);
});

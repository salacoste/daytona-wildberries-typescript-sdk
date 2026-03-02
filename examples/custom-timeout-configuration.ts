/**
 * Custom Timeout & Configuration Examples
 *
 * Demonstrates how to configure timeouts, retry logic, and logging
 * to handle ETIMEDOUT errors and tune SDK behavior for your environment.
 *
 * @see https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/configuration
 */

import { WildberriesSDK, NetworkError } from '../src';

// ============================================================================
// 1. Default Configuration (apiKey only)
// ============================================================================

async function minimalSetup() {
  console.log('\n📋 Minimal Setup — sensible defaults\n');

  // Default timeout: 30s, retries: 3 with exponential backoff, logLevel: 'warn'
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
  });

  const ping = await sdk.general.ping();
  console.log('✅ Connected:', ping.Status);
}

// ============================================================================
// 2. Global Timeout Override
// ============================================================================

async function globalTimeoutSetup() {
  console.log('\n⏱️ Global Timeout — 60s for all requests\n');

  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    timeout: 60000, // 60 seconds for all requests
  });

  const categories = await sdk.products.getParentAll();
  console.log(`✅ Fetched ${categories.data?.length} categories`);
}

// ============================================================================
// 3. Per-Request Timeout
// ============================================================================

async function perRequestTimeout() {
  console.log('\n🎯 Per-Request Timeout — override for specific calls\n');

  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    timeout: 30000, // 30s default
  });

  // Quick health check — 5 second timeout
  const ping = await sdk.general.ping({ timeout: 5000 });
  console.log('✅ Quick ping:', ping.Status);

  // Long-running analytics — 2 minute timeout
  // const report = await sdk.analytics.getReportDetail(
  //   { id: 'some-report-id' },
  //   { timeout: 120000 }
  // );
  console.log('✅ Per-request timeout works independently of global timeout');
}

// ============================================================================
// 4. Production Configuration
// ============================================================================

async function productionSetup() {
  console.log('\n🏭 Production Configuration\n');

  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    timeout: 30000,
    logLevel: 'warn', // Only warnings and errors in production

    retryConfig: {
      maxRetries: 5,
      retryDelay: 2000,
      exponentialBackoff: true,
    },

    rateLimitConfig: {
      requestsPerSecond: 8,
      requestsPerMinute: 80,
    },
  });

  const ping = await sdk.general.ping();
  console.log('✅ Production SDK ready:', ping.Status);
}

// ============================================================================
// 5. Debug Configuration — see retry attempts & timeout details
// ============================================================================

async function debugSetup() {
  console.log('\n🔍 Debug Configuration — verbose retry logging\n');

  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    timeout: 5000, // Short timeout to demonstrate retry logging
    logLevel: 'info', // Shows retry attempts and timeout warnings

    retryConfig: {
      maxRetries: 2,
      retryDelay: 1000,
      exponentialBackoff: true,
    },
  });

  try {
    await sdk.general.ping();
    console.log('✅ Request succeeded');
  } catch (error) {
    if (error instanceof NetworkError) {
      console.log('⚠️ Network error after retries:', error.message);
      console.log('💡 Check console above for retry attempt logs');
    }
  }
}

// ============================================================================
// 6. Timeout + Retry Interaction
// ============================================================================

async function timeoutRetryInteraction() {
  console.log('\n🔄 Timeout + Retry Interaction\n');

  // Worst case timing calculation:
  // timeout=30s, maxRetries=3, retryDelay=1s, exponentialBackoff=true
  // Attempt 1: 30s timeout
  // Wait: 1s
  // Attempt 2: 30s timeout
  // Wait: 2s
  // Attempt 3: 30s timeout
  // Wait: 4s
  // Attempt 4: 30s timeout
  // Total worst case: ~127 seconds

  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    timeout: 30000,
    retryConfig: {
      maxRetries: 3,
      retryDelay: 1000,
      exponentialBackoff: true,
    },
  });

  console.log('ℹ️ Worst case: 30s + 1s + 30s + 2s + 30s + 4s + 30s = ~127 seconds');
  console.log('ℹ️ Each retry attempt gets the full timeout duration (not cumulative)');

  const ping = await sdk.general.ping();
  console.log('✅ Connected:', ping.Status);
}

// ============================================================================
// Run all examples
// ============================================================================

async function main() {
  console.log('🔧 Wildberries SDK — Timeout & Configuration Examples\n');
  console.log('='.repeat(60));

  await minimalSetup();
  await globalTimeoutSetup();
  await perRequestTimeout();
  await productionSetup();
  await debugSetup();
  await timeoutRetryInteraction();

  console.log('\n' + '='.repeat(60));
  console.log('✅ All examples completed');
}

main().catch(console.error);

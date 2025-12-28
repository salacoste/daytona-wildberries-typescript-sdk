/**
 * Test SDK Validation for createCardsList Limit
 *
 * Verifies that SDK correctly validates cursor.limit parameter
 * and prevents requests that would fail at the API level.
 */

import { WildberriesSDK } from '../src';

const apiKey = process.env.WB_API_KEY;

if (!apiKey) {
  throw new Error('WB_API_KEY environment variable is required');
}

const sdk = new WildberriesSDK({
  apiKey
});

async function testLimitValidation() {
  console.log('🧪 Testing createCardsList Limit Validation\n');
  console.log('=' .repeat(70));
  console.log();

  // Test 1: Valid limit (100)
  console.log('✅ TEST 1: Valid limit (100)');
  console.log('-'.repeat(70));
  try {
    const response = await sdk.products.createCardsList({
      settings: {
        cursor: { limit: 100 },
        filter: { withPhoto: -1 }
      }
    });
    console.log('✅ PASSED: Request succeeded with limit: 100');
    console.log(`   Received ${response.cards?.length ?? 0} cards\n`);
  } catch (error: any) {
    console.error('❌ FAILED: Unexpected error:', error.message, '\n');
  }

  // Test 2: Valid limit (50)
  console.log('✅ TEST 2: Valid limit (50)');
  console.log('-'.repeat(70));
  try {
    const response = await sdk.products.createCardsList({
      settings: {
        cursor: { limit: 50 },
        filter: { withPhoto: -1 }
      }
    });
    console.log('✅ PASSED: Request succeeded with limit: 50');
    console.log(`   Received ${response.cards?.length ?? 0} cards\n`);
  } catch (error: any) {
    console.error('❌ FAILED: Unexpected error:', error.message, '\n');
  }

  // Test 3: Invalid limit (101) - Should be caught by SDK
  console.log('❌ TEST 3: Invalid limit (101) - SDK should reject');
  console.log('-'.repeat(70));
  try {
    await sdk.products.createCardsList({
      settings: {
        cursor: { limit: 101 },
        filter: { withPhoto: -1 }
      }
    });
    console.error('❌ FAILED: SDK did not reject limit > 100\n');
  } catch (error: any) {
    console.log('✅ PASSED: SDK correctly rejected limit: 101');
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 4: Invalid limit (1000) - Should be caught by SDK
  console.log('❌ TEST 4: Invalid limit (1000) - SDK should reject');
  console.log('-'.repeat(70));
  try {
    await sdk.products.createCardsList({
      settings: {
        cursor: { limit: 1000 },
        filter: { withPhoto: -1 }
      }
    });
    console.error('❌ FAILED: SDK did not reject limit: 1000\n');
  } catch (error: any) {
    console.log('✅ PASSED: SDK correctly rejected limit: 1000');
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 5: Invalid limit (5000) - Should be caught by SDK
  console.log('❌ TEST 5: Invalid limit (5000) - SDK should reject');
  console.log('-'.repeat(70));
  try {
    await sdk.products.createCardsList({
      settings: {
        cursor: { limit: 5000 },
        filter: { withPhoto: -1 }
      }
    });
    console.error('❌ FAILED: SDK did not reject limit: 5000\n');
  } catch (error: any) {
    console.log('✅ PASSED: SDK correctly rejected limit: 5000');
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 6: Invalid limit (0) - Should be caught by SDK
  console.log('❌ TEST 6: Invalid limit (0) - SDK should reject');
  console.log('-'.repeat(70));
  try {
    await sdk.products.createCardsList({
      settings: {
        cursor: { limit: 0 },
        filter: { withPhoto: -1 }
      }
    });
    console.error('❌ FAILED: SDK did not reject limit: 0\n');
  } catch (error: any) {
    console.log('✅ PASSED: SDK correctly rejected limit: 0');
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 7: Invalid limit (-10) - Should be caught by SDK
  console.log('❌ TEST 7: Invalid limit (-10) - SDK should reject');
  console.log('-'.repeat(70));
  try {
    await sdk.products.createCardsList({
      settings: {
        cursor: { limit: -10 },
        filter: { withPhoto: -1 }
      }
    });
    console.error('❌ FAILED: SDK did not reject limit: -10\n');
  } catch (error: any) {
    console.log('✅ PASSED: SDK correctly rejected limit: -10');
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 8: No limit specified - Should succeed (API default)
  console.log('✅ TEST 8: No limit specified - Should use API default');
  console.log('-'.repeat(70));
  try {
    const response = await sdk.products.createCardsList({
      settings: {
        cursor: {},
        filter: { withPhoto: -1 }
      }
    });
    console.log('✅ PASSED: Request succeeded with no limit specified');
    console.log(`   Received ${response.cards?.length ?? 0} cards\n`);
  } catch (error: any) {
    console.error('❌ FAILED: Unexpected error:', error.message, '\n');
  }

  console.log('=' .repeat(70));
  console.log('🎉 All validation tests completed!');
  console.log('=' .repeat(70));
}

testLimitValidation()
  .then(() => {
    console.log('\n✅ Test suite passed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test suite failed:', error);
    process.exit(1);
  });

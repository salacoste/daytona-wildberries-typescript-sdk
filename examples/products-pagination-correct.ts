/**
 * Correct Product Pagination Example
 *
 * Demonstrates the CORRECT way to fetch ALL product cards using pagination
 * with the maximum allowed limit of 100 cards per request.
 *
 * IMPORTANT:
 * - Maximum limit: 100 cards per request
 * - Values > 100 will cause ValidationError (HTTP 400)
 * - Always implement pagination to fetch all cards
 */

import { WildberriesSDK } from '../src';

const apiKey = process.env.WB_API_KEY;

if (!apiKey) {
  throw new Error('WB_API_KEY environment variable is required');
}

const sdk = new WildberriesSDK({
  apiKey
});

/**
 * Example 1: Fetch ALL Product Cards with Pagination
 *
 * This is the recommended approach for fetching all product cards.
 */
async function getAllProductCards() {
  console.log('📦 Fetching ALL product cards with pagination...\n');

  const allCards = [];
  let cursor: any = { limit: 100 };  // MAXIMUM: 100 cards
  let pageNumber = 1;

  while (true) {
    console.log(`📄 Fetching page ${pageNumber}...`);

    try {
      const response = await sdk.products.createCardsList({
        settings: {
          filter: {
            withPhoto: -1  // All cards (with and without photos)
          },
          cursor
        }
      });

      // Add fetched cards to result
      if (response.cards && response.cards.length > 0) {
        allCards.push(...response.cards);
        console.log(`   ✅ Received ${response.cards.length} cards`);
        console.log(`   📊 Total fetched: ${allCards.length}`);
        console.log(`   📊 Account total: ${response.cursor?.total ?? 'unknown'}`);
      } else {
        console.log('   ℹ️  No cards in response');
      }

      // Check if we've reached the last page
      const receivedCount = response.cards?.length ?? 0;

      if (receivedCount < 100) {
        console.log('\n✅ Last page reached - all cards fetched!');
        break;
      }

      // Check if cursor exists for next page
      if (!response.cursor?.updatedAt || !response.cursor?.nmID) {
        console.log('\n✅ No more pages available');
        break;
      }

      // Prepare cursor for next request
      cursor = {
        limit: 100,                              // ALWAYS 100 (maximum)
        updatedAt: response.cursor.updatedAt,    // From previous response
        nmID: response.cursor.nmID               // From previous response
      };

      pageNumber++;

      // Rate limit protection (100 req/min = 600ms interval + buffer)
      await new Promise(resolve => setTimeout(resolve, 650));

    } catch (error: any) {
      console.error(`\n❌ Error on page ${pageNumber}:`, error.message);

      if (error.statusCode === 400) {
        console.error('   💡 Hint: You may have used limit > 100 (maximum is 100)');
      }

      throw error;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total pages: ${pageNumber}`);
  console.log(`   Total cards: ${allCards.length}`);

  return allCards;
}

/**
 * Example 2: Fetch Cards with Specific Filter and Pagination
 *
 * Demonstrates pagination with filtering (e.g., only cards with photos)
 */
async function getCardsWithPhotos() {
  console.log('📸 Fetching cards with photos only...\n');

  const cardsWithPhotos = [];
  let cursor: any = { limit: 100 };
  let pageNumber = 1;

  while (true) {
    const response = await sdk.products.createCardsList({
      settings: {
        filter: {
          withPhoto: 1  // Only cards WITH photos
        },
        cursor
      }
    });

    if (response.cards) {
      cardsWithPhotos.push(...response.cards);
      console.log(`Page ${pageNumber}: ${response.cards.length} cards with photos`);
    }

    const receivedCount = response.cards?.length ?? 0;

    if (receivedCount < 100 || !response.cursor?.updatedAt) {
      break;
    }

    cursor = {
      limit: 100,
      updatedAt: response.cursor.updatedAt,
      nmID: response.cursor.nmID
    };

    pageNumber++;
    await new Promise(resolve => setTimeout(resolve, 650));
  }

  console.log(`\n✅ Total cards with photos: ${cardsWithPhotos.length}\n`);
  return cardsWithPhotos;
}

/**
 * Example 3: Search for Specific Product by Vendor Code with Pagination
 *
 * Demonstrates text search with pagination (if multiple matches exist)
 */
async function searchByVendorCode(searchQuery: string) {
  console.log(`🔍 Searching for: "${searchQuery}"...\n`);

  const matchingCards = [];
  let cursor: any = { limit: 100 };

  while (true) {
    const response = await sdk.products.createCardsList({
      settings: {
        filter: {
          textSearch: searchQuery,  // Search by vendor code, nmID, or barcode
          withPhoto: -1
        },
        cursor
      }
    });

    if (response.cards) {
      matchingCards.push(...response.cards);
    }

    const receivedCount = response.cards?.length ?? 0;

    if (receivedCount < 100 || !response.cursor?.updatedAt) {
      break;
    }

    cursor = {
      limit: 100,
      updatedAt: response.cursor.updatedAt,
      nmID: response.cursor.nmID
    };

    await new Promise(resolve => setTimeout(resolve, 650));
  }

  console.log(`✅ Found ${matchingCards.length} matching cards\n`);

  // Display results
  matchingCards.forEach((card, index) => {
    console.log(`${index + 1}. ${card.title || 'No title'}`);
    console.log(`   nmID: ${card.nmID}`);
    console.log(`   Vendor Code: ${card.vendorCode || 'N/A'}`);
    console.log(`   Brand: ${card.brand || 'N/A'}\n`);
  });

  return matchingCards;
}

/**
 * Example 4: Fetch Cards by Brand with Pagination
 *
 * Demonstrates brand filtering with pagination
 */
async function getCardsByBrand(brandNames: string[]) {
  console.log(`🏷️  Fetching cards for brands: ${brandNames.join(', ')}...\n`);

  const brandCards = [];
  let cursor: any = { limit: 100 };

  while (true) {
    const response = await sdk.products.createCardsList({
      settings: {
        filter: {
          brands: brandNames,
          withPhoto: -1
        },
        cursor
      }
    });

    if (response.cards) {
      brandCards.push(...response.cards);
      console.log(`Fetched ${response.cards.length} cards (total: ${brandCards.length})`);
    }

    const receivedCount = response.cards?.length ?? 0;

    if (receivedCount < 100 || !response.cursor?.updatedAt) {
      break;
    }

    cursor = {
      limit: 100,
      updatedAt: response.cursor.updatedAt,
      nmID: response.cursor.nmID
    };

    await new Promise(resolve => setTimeout(resolve, 650));
  }

  console.log(`\n✅ Total cards for specified brands: ${brandCards.length}\n`);
  return brandCards;
}

/**
 * Example 5: WRONG Approach - Demonstrates Common Mistake
 *
 * ⚠️ This will FAIL with ValidationError (HTTP 400)
 */
async function wrongApproachExceedingLimit() {
  console.log('❌ WRONG APPROACH - This will fail!\n');

  try {
    const response = await sdk.products.createCardsList({
      settings: {
        cursor: {
          limit: 1000  // ❌ EXCEEDS MAXIMUM! Will fail with ValidationError
        },
        filter: {
          withPhoto: -1
        }
      }
    });

    console.log('✅ Unexpectedly succeeded:', response);
  } catch (error: any) {
    console.error('❌ FAILED (as expected):');
    console.error(`   Error: ${error.constructor.name}`);
    console.error(`   Message: ${error.message}`);
    console.error(`   Status: ${error.statusCode || 'N/A'}`);
    console.error('\n💡 Solution: Use limit: 100 (maximum) with pagination\n');
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('=' .repeat(70));
  console.log('📚 Wildberries SDK - Correct Pagination Examples');
  console.log('=' .repeat(70));
  console.log();

  try {
    // Example 1: Fetch all cards
    const allCards = await getAllProductCards();
    console.log();
    console.log('-'.repeat(70));
    console.log();

    // Example 2: Cards with photos only
    await getCardsWithPhotos();
    console.log('-'.repeat(70));
    console.log();

    // Example 3: Search by vendor code (if you know a specific code)
    // Uncomment and replace with your vendor code:
    // await searchByVendorCode('YOUR-VENDOR-CODE-HERE');
    // console.log('-'.repeat(70));
    // console.log();

    // Example 4: Cards by brand (if you have specific brands)
    // Uncomment and replace with your brand names:
    // await getCardsByBrand(['BrandName1', 'BrandName2']);
    // console.log('-'.repeat(70));
    // console.log();

    // Example 5: Wrong approach (demonstrates common mistake)
    await wrongApproachExceedingLimit();
    console.log('-'.repeat(70));
    console.log();

    console.log('✅ All examples completed successfully!');
    console.log('=' .repeat(70));

  } catch (error: any) {
    console.error('\n💥 Critical error:', error.message);
    process.exit(1);
  }
}

// Run examples
main();

/**
 * Product Categories Navigation - Understanding Category Hierarchy
 *
 * This example demonstrates navigating the Wildberries product taxonomy:
 * - Fetching all parent categories (top-level like Electronics, Clothing)
 * - Browsing subjects/subcategories within a parent category
 * - Retrieving required and optional product characteristics for listings
 * - Understanding the category → subject → characteristics hierarchy
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 10 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Products module permissions enabled
 * - Run this BEFORE creating products to understand taxonomy
 *
 * **What This Example Covers:**
 * - **Parent Categories**: Top-level taxonomy (e.g., "Электроника", "Одежда")
 * - **Subjects**: Specific product types within categories (e.g., "Смартфоны", "Футболки")
 * - **Characteristics**: Required/optional attributes for product creation
 * - Navigating the full hierarchy step-by-step
 * - Finding the right subjectID for product creation
 *
 * **Expected Output:**
 * ```
 * 🔍 Wildberries Product Category Explorer
 *
 * 📂 Step 1: Fetching parent categories...
 * ✅ Found 28 parent categories:
 *
 *    • Электроника (ID: 1) - Visible
 *    • Одежда (ID: 2) - Visible
 *    • Дом и сад (ID: 3) - Visible
 *    ... and 25 more
 *
 * 📑 Step 2: Browsing subjects in 'Электроника'...
 * ✅ Found 45 subjects:
 *
 *    • Смартфоны (ID: 105)
 *    • Наушники (ID: 106)
 *    • Планшеты (ID: 107)
 *
 * 📋 Step 3: Getting characteristics for 'Смартфоны' (ID: 105)...
 * ✅ Found 12 required and 8 optional characteristics
 *
 * Required:
 *    • Бренд (ID: 1) - text
 *    • Цвет (ID: 2) - select
 *    • Страна производства (ID: 4) - select
 * ```
 *
 * **Usage:**
 * ```bash
 * # Set your API key
 * export WB_API_KEY="your_api_key_here"
 *
 * # Run the example
 * tsx examples/products-categories.ts
 * ```
 *
 * **Related Examples:**
 * - products-crud.ts - Create products using subjectID from this example
 * - complete-product-workflow.ts - Full product creation workflow
 * - quickstart.ts - SDK basics (run this first if you're new)
 *
 * **Common Issues:**
 * - "No categories found": Check Products module permissions
 * - "Empty subjects": Some parent categories may have no active subjects
 * - "Characteristics missing": Subject may be deprecated or hidden
 * - "subjectID invalid": Use ID from getSubjects(), not parent category ID
 *
 * **API Documentation:**
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki} - Categories API Reference
 * @see {@link ../docs/api/classes/ProductsModule.html} - ProductsModule Class Reference
 * @see {@link ../docs/api/classes/ProductsModule.html#getParentAll} - getParentAll() Method
 * @see {@link ../docs/api/classes/ProductsModule.html#getSubjects} - getSubjects() Method
 * @see {@link ../docs/api/classes/ProductsModule.html#getCharacteristics} - getCharacteristics() Method
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src/index';

// Initialize SDK with API key from environment
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here',
  timeout: 30000,
  logLevel: 'info'
});

/**
 * Main workflow demonstrating category exploration
 */
async function exploreCategories() {
  try {
    console.log('🔍 Wildberries Product Category Explorer\n');

    // =================================================================
    // STEP 1: Get all parent categories (top-level taxonomy)
    // =================================================================
    console.log('📂 Step 1: Fetching parent categories...');
    const parents = await sdk.products.getParentAll();

    if (parents.error) {
      console.error('❌ Error fetching parent categories:', parents.errorText);
      return;
    }

    console.log(`✅ Found ${parents.data?.length ?? 0} parent categories:\n`);

    // Display parent categories
    if (Array.isArray(parents.data)) {
      parents.data.slice(0, 5).forEach((parent) => {
        const category = parent as { id: number; name: string; isVisible: boolean };
        console.log(`   • ${category.name} (ID: ${category.id}) - ${category.isVisible ? 'Visible' : 'Hidden'}`);
      });
      if (parents.data.length > 5) {
        console.log(`   ... and ${parents.data.length - 5} more\n`);
      }
    }

    // =================================================================
    // STEP 2: Browse categories within a parent category
    // =================================================================
    // Let's explore "Электроника" (Electronics) - ID: 479
    const electronicsParentId = 479;

    console.log(`\n📁 Step 2: Fetching categories for parent ID ${electronicsParentId}...`);
    const categories = await sdk.products.getObjectAll({
      parentID: electronicsParentId,
      limit: 10
    });

    if (categories.error) {
      console.error('❌ Error fetching categories:', categories.errorText);
      return;
    }

    console.log(`✅ Found ${categories.data?.length ?? 0} categories in this parent:\n`);

    // Display categories/subjects
    if (Array.isArray(categories.data)) {
      categories.data.forEach((category) => {
        const cat = category as { subjectID: number; subjectName: string; parentName: string };
        console.log(`   • ${cat.subjectName} (Subject ID: ${cat.subjectID})`);
      });
    }

    // =================================================================
    // STEP 3: Get characteristics for a specific category
    // =================================================================
    // Let's get characteristics for the first category
    if (Array.isArray(categories.data) && categories.data.length > 0) {
      const firstCategory = categories.data[0] as { subjectID: number; subjectName: string };
      const subjectId = firstCategory.subjectID;
      const subjectName = firstCategory.subjectName;

      console.log(`\n📋 Step 3: Fetching characteristics for "${subjectName}" (Subject ID: ${subjectId})...`);
      const characteristics = await sdk.products.getObjectCharc(subjectId);

      if (characteristics.error) {
        console.error('❌ Error fetching characteristics:', characteristics.errorText);
        return;
      }

      console.log(`✅ Found ${characteristics.data?.length ?? 0} characteristics:\n`);

      // Separate required and optional characteristics
      if (Array.isArray(characteristics.data)) {
        const requiredCharcs = characteristics.data.filter((c) => {
          const charc = c as { required: boolean };
          return charc.required;
        });
        const optionalCharcs = characteristics.data.filter((c) => {
          const charc = c as { required: boolean };
          return !charc.required;
        });

        console.log(`   📌 Required characteristics (${requiredCharcs.length}):`);
        requiredCharcs.slice(0, 5).forEach((charc) => {
          const c = charc as { name: string; unitName: string; charcType: number };
          console.log(`      • ${c.name}${c.unitName ? ` (${c.unitName})` : ''} - Type: ${c.charcType}`);
        });

        console.log(`\n   ✏️  Optional characteristics (${optionalCharcs.length}):`);
        optionalCharcs.slice(0, 5).forEach((charc) => {
          const c = charc as { name: string; unitName: string; charcType: number };
          console.log(`      • ${c.name}${c.unitName ? ` (${c.unitName})` : ''} - Type: ${c.charcType}`);
        });

        if (characteristics.data.length > 10) {
          console.log(`      ... and ${characteristics.data.length - 10} more`);
        }
      }

      console.log('\n✅ Category exploration complete!');
      console.log('\n💡 Next steps:');
      console.log('   1. Use these characteristics when creating product cards');
      console.log('   2. Ensure all required characteristics are filled');
      console.log('   3. Use the correct charcType for each value (string, number, etc.)');
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('\n⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('\n🔐 Authentication Error:', error.message);
      console.log('   Verify WB_API_KEY environment variable');
      console.log('   Ensure API key has Products module permissions');
    } else if (error instanceof NetworkError) {
      console.error('\n🌐 Network Error:', error.message);
      console.log('   Check internet connection and API status');
    } else if (error instanceof WBAPIError) {
      console.error('\n⚠️ API Error:', error.statusCode, error.message);
    } else if (error instanceof Error) {
      console.error('\n❌ Error during category exploration:', error.message);
    } else {
      console.error('\n❌ Unknown error:', error);
    }
    process.exit(1);
  }
}

/**
 * Example: Search for categories by name
 */
async function searchCategories() {
  try {
    console.log('\n\n🔎 Category Search Example\n');

    // Search for categories containing "Носки" (Socks)
    const searchTerm = 'Носки';
    console.log(`Searching for categories matching: "${searchTerm}"`);

    const results = await sdk.products.getObjectAll({
      name: searchTerm,
      limit: 5
    });

    if (results.error) {
      console.error('❌ Search error:', results.errorText);
      return;
    }

    console.log(`✅ Found ${results.data?.length ?? 0} matching categories:\n`);

    if (Array.isArray(results.data)) {
      results.data.forEach((category) => {
        const cat = category as { subjectID: number; subjectName: string; parentName: string };
        console.log(`   • ${cat.subjectName} in ${cat.parentName} (ID: ${cat.subjectID})`);
      });
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else {
      console.error('❌ Search failed:', error);
    }
  }
}

/**
 * Example: Get categories with pagination
 */
async function paginateCategories() {
  try {
    console.log('\n\n📄 Pagination Example\n');

    const pageSize = 30;
    const page = 0;

    console.log(`Fetching page ${page + 1} with ${pageSize} items per page...`);

    const results = await sdk.products.getObjectAll({
      limit: pageSize,
      offset: page * pageSize
    });

    if (results.error) {
      console.error('❌ Pagination error:', results.errorText);
      return;
    }

    console.log(`✅ Retrieved ${results.data?.length ?? 0} categories`);
    console.log('💡 Tip: Increase offset to fetch the next page (offset = page * limit)');
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else {
      console.error('❌ Pagination failed:', error);
    }
  }
}

/**
 * Example: Get localized category names
 */
async function getLocalizedCategories() {
  try {
    console.log('\n\n🌍 Localization Example\n');

    // Get parent categories in different languages
    console.log('Fetching parent categories in English...');
    const englishParents = await sdk.products.getParentAll({ locale: 'en' });

    console.log('Fetching parent categories in Russian...');
    const russianParents = await sdk.products.getParentAll({ locale: 'ru' });

    if (!englishParents.error && !russianParents.error) {
      console.log('\n✅ Comparison:');
      if (Array.isArray(englishParents.data) && Array.isArray(russianParents.data)) {
        for (let i = 0; i < Math.min(3, englishParents.data.length); i++) {
          const en = englishParents.data[i] as { name: string };
          const ru = russianParents.data[i] as { name: string };
          console.log(`   • EN: ${en.name} | RU: ${ru.name}`);
        }
      }
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else {
      console.error('❌ Localization failed:', error);
    }
  }
}

// Run all examples
(async () => {
  await exploreCategories();
  await searchCategories();
  await paginateCategories();
  await getLocalizedCategories();

  console.log('\n\n✨ All examples completed successfully!\n');
})();

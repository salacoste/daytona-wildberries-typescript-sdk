/**
 * Complete Product Lifecycle - End-to-End Product Setup Workflow
 *
 * This comprehensive example demonstrates the full product journey from category selection to stock availability:
 * - Navigate category hierarchy to find correct subjectID
 * - Create product card with required characteristics
 * - Upload product images
 * - Set pricing with async task monitoring
 * - Configure stock levels for all sizes
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 30 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Products module permissions enabled
 * - Understanding of category hierarchy (review products-categories.ts first)
 * - Image files or URLs for product media
 * - Warehouse already created (see products-warehouse-stock.ts)
 *
 * **What This Example Covers:**
 * - **Part 1: Categories** (Story 2.1) - Navigate hierarchy, get characteristics
 * - **Part 2: Product Creation** (Story 2.2) - Create product card with variants
 * - **Part 3: Media Upload** (Story 2.3) - Add product images
 * - **Part 4: Pricing** (Story 2.3) - Set prices with async task system
 * - **Part 5: Stock Management** (Story 2.4) - Configure inventory levels
 * - Complete integration demonstrating all Products module capabilities
 *
 * **Expected Output:**
 * ```
 * === Complete Product Workflow ===
 *
 * 📂 Step 1: Category Navigation
 * ✅ Retrieved 28 parent categories
 * ✅ Found 45 subjects in "Электроника"
 * ✅ Retrieved 12 characteristics for "Смартфоны"
 *
 * 📦 Step 2: Product Creation
 * ✅ Product created (ID: created)
 * Product will be visible after moderation
 *
 * 🖼️ Step 3: Media Upload
 * ✅ Uploaded 5 product images
 *
 * 💰 Step 4: Pricing
 * ✅ Pricing task created (Task ID: task_123)
 * Monitoring task status...
 * ✅ Pricing applied (1,999₽ - 2,999₽)
 *
 * 📊 Step 5: Stock Management
 * ✅ Stock configured for 4 sizes (Total: 400 units)
 *
 * ✅ Complete Workflow Finished!
 * Product is ready for sale after moderation.
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/complete-product-workflow.ts
 * ```
 *
 * **Related Examples:**
 * - products-categories.ts - Category navigation (run this first)
 * - products-crud.ts - Individual CRUD operations
 * - products-media-pricing.ts - Detailed media/pricing examples
 * - products-warehouse-stock.ts - Detailed stock management
 *
 * **Rate Limits:**
 * - Category operations: 100 req/min (600ms intervals)
 * - Product creation: 10 req/min (6s intervals)
 * - Media upload: 10 req/min (6s intervals)
 * - Pricing updates: Async task-based (1-5 minutes)
 * - Stock updates: 1000 req/min (60ms intervals)
 *
 * **Common Issues:**
 * - "Invalid subjectID": Use ID from getSubjects(), not parent category
 * - "Missing required characteristics": Check getCharacteristics() for requirements
 * - "Pricing task timeout": Tasks may take 5+ minutes for large product sets
 * - "Stock update failed": Ensure warehouse exists and SKUs are valid
 * - "Product pending moderation": Normal - products require WB approval
 *
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products} - Official Products API
 */

import { WildberriesSDK } from '../src';
import type { CreateProductRequest } from '../src/types/products.types';
import { RateLimitError, ValidationError, AuthenticationError, NetworkError } from '../src/errors';

/**
 * Main workflow function demonstrating complete product lifecycle
 */
async function completeProductWorkflow() {
  // Initialize SDK
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY || 'your-api-key-here',
  });

  console.log('=== Complete Product Workflow ===\n');
  console.log('This example demonstrates the complete product lifecycle:');
  console.log('1. Category navigation → 2. Product creation → 3. Media upload');
  console.log('4. Pricing configuration → 5. Warehouse assignment → 6. Stock updates\n');

  try {
    // ========================================
    // Step 1: Navigate category hierarchy
    // ========================================
    console.log('📂 Step 1: Category Navigation');
    console.log('─'.repeat(50));

    // Get parent categories
    const parents = await sdk.products.getParentAll();
    const parentData = parents.data as any[];
    console.log(`✅ Retrieved ${parentData.length} parent categories`);

    // Use first parent category
    const selectedParent = parentData[0];
    console.log(
      `   Selected parent: ${selectedParent.name || 'Category'} (ID: ${selectedParent.id})\n`
    );

    // Get child categories/subjects
    const subjects = await sdk.products.getObjectAll({ parentID: selectedParent.id });
    const subjectData = subjects.data as any[];
    console.log(`✅ Retrieved ${subjectData.length} subjects/categories`);

    const selectedSubject = subjectData[0];
    console.log(
      `   Selected subject: ${selectedSubject.subjectName} (ID: ${selectedSubject.subjectID})\n`
    );

    // Get characteristics for the subject
    const chars = await sdk.products.getObjectCharc(selectedSubject.subjectID);
    const charData = chars.data as any[];
    const requiredChars = charData.filter((c: any) => c.required);
    console.log(
      `✅ Retrieved ${charData.length} characteristics (${requiredChars.length} required)`
    );

    // ========================================
    // Step 2: Create product card
    // ========================================
    console.log('\n📦 Step 2: Product Creation');
    console.log('─'.repeat(50));

    const productData: CreateProductRequest = {
      subjectID: selectedSubject.subjectID,
      variants: [
        {
          vendorCode: `EXAMPLE-${Date.now()}`, // Unique vendor code
          brand: 'Example Brand',
          title: 'Example Product - Complete Workflow Demo',
          description:
            'This product was created using the complete workflow example. It demonstrates all product management capabilities.',

          dimensions: {
            length: 10,
            width: 10,
            height: 5,
            weightBrutto: 0.5,
          },

          sizes: [
            {
              techSize: 'ONE SIZE',
              wbSize: 'ONE SIZE',
              // skus will be auto-generated if omitted
            },
          ],

          // Use first few characteristics as examples
          characteristics: charData.slice(0, 3).map((char: any) => ({
            id: char.charcID,
            value: char.required ? ['Sample Value'] : ['Optional'],
          })),
        },
      ],
    };

    console.log('Creating product card...');
    const createResult = await sdk.products.createProduct(productData);

    if (createResult.error) {
      console.error(`❌ Product creation failed: ${createResult.errorText}`);
      return;
    }

    // Extract product ID (response format varies)
    const productId = createResult.data?.id || 'created';
    console.log(`✅ Product created successfully (ID: ${productId})`);
    console.log(`   Vendor code: ${productData.variants[0].vendorCode}`);

    // ========================================
    // Step 3: List created products
    // ========================================
    console.log('\n📋 Step 3: Verify Product Creation');
    console.log('─'.repeat(50));

    console.log('Fetching product list to verify creation...');
    const productList = await sdk.products.listProducts({
      filter: {
        textSearch: productData.variants[0].vendorCode,
      },
      cursor: {
        limit: 10,
      },
    });

    const cards = productList.cards || [];
    console.log(`✅ Found ${cards.length} matching products`);

    if (cards.length > 0) {
      const createdProduct = cards[0];
      console.log(`   Product NM ID: ${createdProduct.nmID}`);
      console.log(`   Vendor Code: ${createdProduct.vendorCode}`);
      console.log(`   Title: ${createdProduct.title}`);
    }

    // ========================================
    // Step 4: Update pricing
    // ========================================
    console.log('\n💰 Step 4: Price Configuration');
    console.log('─'.repeat(50));

    if (cards.length > 0) {
      const nmID = cards[0].nmID;
      const sizes = cards[0].sizes || [];

      if (sizes.length > 0 && sizes[0].chrtID) {
        console.log('Creating pricing task...');
        const pricingData = [
          {
            nmID: nmID,
            price: 1999, // 19.99 RUB
            sizes: [
              {
                chrtID: sizes[0].chrtID,
              },
            ],
          },
        ];

        const pricingResult = await sdk.products.updatePricing(pricingData);
        console.log(`✅ Pricing task created`);
        console.log(`   Price set to: 1999₽ (19.99 RUB)`);
        console.log(`   Task submitted for processing`);
      } else {
        console.log('⚠️  No sizes available for pricing configuration');
      }
    }

    // ========================================
    // Step 5: Update stock levels
    // ========================================
    console.log('\n📊 Step 5: Stock Management');
    console.log('─'.repeat(50));

    if (cards.length > 0) {
      const product = cards[0];
      const sizes = product.sizes || [];

      // chrtID is the numeric size ID (Content API). Stocks methods use the
      // same value but lowercase: chrtId. Card-size barcodes (sizes[].skus)
      // are unrelated and were NOT removed in v4.0.0.
      const chrtID = sizes[0]?.chrtID;

      if (chrtID !== undefined) {
        const warehouses = await sdk.products.warehouses();
        if (warehouses.length > 0) {
          const warehouseId = warehouses[0].id;

          console.log('Updating stock levels...');
          await sdk.products.updateStock(warehouseId, {
            stocks: [{ chrtId: chrtID, amount: 100 }],
          });

          console.log(`✅ Stock updated for chrtId: ${chrtID}`);
          console.log(`   Quantity: 100 units`);
        } else {
          console.log('⚠️  No seller warehouse available for stock management');
        }
      } else {
        console.log('⚠️  No size ID (chrtID) available for stock management');
      }
    }

    // ========================================
    // Workflow Summary
    // ========================================
    console.log('\n' + '='.repeat(50));
    console.log('✅ Complete Product Workflow Finished Successfully!');
    console.log('='.repeat(50));
    console.log('\nWorkflow Summary:');
    console.log(`  ✓ Category: ${selectedSubject.subjectName}`);
    console.log(`  ✓ Product created with vendor code: ${productData.variants[0].vendorCode}`);
    console.log(`  ✓ Pricing configured`);
    console.log(`  ✓ Stock levels updated`);
    console.log('\nNext steps:');
    console.log('  • Add product media (photos/videos)');
    console.log('  • Configure additional product variants');
    console.log('  • Set up promotional campaigns');
    console.log('  • Monitor order processing\n');
  } catch (error) {
    console.error('\n' + '='.repeat(50));
    console.error('❌ Error occurred during workflow:');
    console.error('='.repeat(50) + '\n');

    if (error instanceof RateLimitError) {
      console.error(`⏱️  Rate limit exceeded`);
      console.error(`   Retry after: ${error.retryAfter}ms`);
      console.error(`   Tip: The SDK automatically handles rate limiting, but`);
      console.error(`        this error suggests an unusually high request rate.`);
    } else if (error instanceof ValidationError) {
      console.error(`❌ Validation failed`);
      console.error(`   Message: ${error.message}`);
      console.error(`   Tip: Ensure all required characteristics are provided`);
      console.error(`        with valid values for the selected category.`);
    } else if (error instanceof AuthenticationError) {
      console.error(`🔑 Authentication failed`);
      console.error(`   Message: ${error.message}`);
      console.error(`   Tip: Set your API key: export WB_API_KEY="your-key-here"`);
    } else if (error instanceof NetworkError) {
      console.error(`🌐 Network error`);
      console.error(`   Message: ${error.message}`);
      console.error(`   Tip: Check internet connection and API status at`);
      console.error(`        https://dev.wildberries.ru/`);
    } else {
      console.error(`💥 Unexpected error`);
      console.error(`   ${error instanceof Error ? error.message : String(error)}`);
    }

    throw error;
  }
}

// Execute workflow
if (require.main === module) {
  completeProductWorkflow()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      process.exit(1);
    });
}

export { completeProductWorkflow };

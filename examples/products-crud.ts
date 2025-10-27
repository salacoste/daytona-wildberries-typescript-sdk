/**
 * Complete Product CRUD Example - Products Module Full Lifecycle
 *
 * This example demonstrates complete product management operations:
 * - Create new product cards with full specifications
 * - List and search products with pagination and filtering
 * - Get individual product details by nmID
 * - Update products (critical: requires ALL fields)
 * - Delete products (soft delete to trash with 30-day retention)
 * - Complete product lifecycle workflow
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 15 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Products module permissions enabled on your API key
 * - Understanding of Wildberries product category hierarchy (run products-categories.ts first)
 * - Valid category subjectID for product creation (get from getCategories)
 * - EAN-13 barcodes for product SKUs (or use auto-generation)
 *
 * **What This Example Covers:**
 * - Creating products with characteristics, sizes, and barcodes
 * - Filtering and paginating product lists
 * - Safe product updates (fetching current state first)
 * - Batch operations (update up to 3000 products)
 * - Soft delete to trash (recoverable for 30 days)
 * - Complete CRUD lifecycle demonstration
 *
 * **API Documentation:**
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Soderzhanie-kartochek} - Product Cards API Reference
 * @see {@link ../docs/api/classes/ProductsModule.html} - ProductsModule Class Reference
 * @see {@link ../docs/api/classes/ProductsModule.html#createProduct} - createProduct() Method
 * @see {@link ../docs/api/classes/ProductsModule.html#listProducts} - listProducts() Method
 * @see {@link ../docs/api/classes/ProductsModule.html#getProduct} - getProduct() Method
 * @see {@link ../docs/api/classes/ProductsModule.html#updateProduct} - updateProduct() Method
 * @see {@link ../docs/api/classes/ProductsModule.html#deleteProduct} - deleteProduct() Method
 * @see {@link ../docs/api/interfaces/CreateProductRequest.html} - CreateProductRequest Interface
 *
 * **Related Examples:**
 * - products-categories.ts - Get category/subject IDs first
 * - products-media-pricing.ts - Add images and pricing after creation
 * - complete-product-workflow.ts - Full end-to-end product setup
 *
 * **Expected Output:**
 * ```
 * === Example 1: Create Product ===
 * ✅ Product queued for creation (async processing)
 *
 * === Example 2: List Products ===
 * Found 150 total products
 * Page 1: 100 products
 * - nmID: 12345, Vendor: EXAMPLE-PROD-001, Title: Premium Cotton T-Shirt
 *
 * === Example 3: Get Single Product ===
 * ✅ Product found:
 * - nmID: 12345
 * - Brand: Example Brand
 * - Sizes: 4
 *
 * === Example 4: Update Product (SAFE METHOD) ===
 * ✅ Product updated (async processing)
 *
 * === Example 6: Delete Product (Soft Delete) ===
 * ✅ Products moved to trash:
 * - 1 products deleted
 * - Auto-deletion in 30 days
 * ```
 *
 * **Usage:**
 * ```bash
 * # Set your API key
 * export WB_API_KEY="your_api_key_here"
 *
 * # Run the example
 * tsx examples/products-crud.ts
 * ```
 *
 * **Related Examples:**
 * - products-categories.ts - Category navigation (run this first)
 * - complete-product-workflow.ts - Full product setup including pricing and stock
 * - products-media-pricing.ts - Product image upload and pricing
 * - products-warehouse-stock.ts - Inventory management
 *
 * **Common Issues:**
 * - "Invalid subjectID": Get valid category ID from products-categories.ts
 * - "Product update removes fields": Always fetch current state before updating
 * - "Barcode already exists": Use unique EAN-13 barcodes or omit for auto-generation
 *
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products} - Official Products API documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src/index';
import type { CreateProductRequest, UpdateProductRequest } from '../src/types/products.types';

// Initialize SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here'
});

/**
 * Example 1: Create a Complete Product Card
 *
 * Rate limit: 10 requests/min, 6 second interval
 * Processing: Asynchronous - check error list if needed
 */
async function createProductExample() {
  console.log('\n=== Example 1: Create Product ===\n');

  const newProduct: CreateProductRequest = {
    subjectID: 105,  // Category ID from getCategories endpoint
    variants: [{
      // Required fields
      vendorCode: 'EXAMPLE-PROD-001',  // Your unique article ID (max 72 chars)

      // Product information
      brand: 'Example Brand',
      title: 'Premium Cotton T-Shirt',  // Max 60 characters
      description: `
        High-quality cotton t-shirt perfect for everyday wear.
        Made from 100% organic cotton with reinforced stitching.
        Available in multiple sizes and colors.
        Machine washable, tumble dry low.
      `.trim(),  // 1000-5000 chars depending on category

      // Dimensions and weight
      dimensions: {
        length: 30,          // cm
        width: 25,           // cm
        height: 2,           // cm
        weightBrutto: 0.25   // kg (with packaging, max 3 decimal places)
      },

      // Sizes and barcodes
      sizes: [
        {
          techSize: 'S',
          wbSize: '44',
          skus: ['1234567890123']  // EAN-13 barcode (or omit for auto-generation)
        },
        {
          techSize: 'M',
          wbSize: '46',
          skus: ['1234567890124']
        },
        {
          techSize: 'L',
          wbSize: '48',
          skus: ['1234567890125']
        },
        {
          techSize: 'XL',
          wbSize: '50',
          skus: ['1234567890126']
        }
      ],

      // Product characteristics from getCharacteristics
      characteristics: [
        { id: 1, value: ['Red'] },           // Color
        { id: 2, value: ['Cotton'] },        // Material
        { id: 3, value: ['Unisex'] },        // Gender
        { id: 4, value: ['Russia'] }         // Country of origin
      ],

      // Optional: Wholesale settings
      wholesale: {
        enabled: true,
        quantum: 10  // Units per wholesale package
      }
    }]
  };

  try {
    const result = await sdk.products.createProduct(newProduct);

    if (result.error) {
      console.error('❌ Product creation failed:', result.errorText);
      console.log('Check error list: /content/v2/cards/error/list');
    } else {
      console.log('✅ Product queued for creation (async processing)');
      console.log('Response:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
      console.log('   SDK automatically retries with exponential backoff');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Troubleshooting:');
      console.log('   1. Verify WB_API_KEY environment variable is set');
      console.log('   2. Check API key is active in seller dashboard');
      console.log('   3. Ensure API key has Products module permissions');
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Common causes:');
      console.log('   - Invalid subjectID (get from products-categories.ts)');
      console.log('   - Missing required product fields');
      console.log('   - Invalid barcode format (must be EAN-13)');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
      console.log('   Troubleshooting:');
      console.log('   1. Check internet connection');
      console.log('   2. Verify Wildberries API status');
      console.log('   3. Try again in a few moments');
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
      console.log('   Check API documentation for error details');
    } else {
      console.error('❌ Unexpected error:', error);
    }
  }
}

/**
 * Example 2: List Products with Filtering and Pagination
 *
 * Rate limit: 100 requests/min, 600ms interval
 */
async function listProductsExample() {
  console.log('\n=== Example 2: List Products ===\n');

  try {
    // Get first page with filters
    const page1 = await sdk.products.listProducts({
      filter: {
        withPhoto: 1,                    // Only products with photos
        brands: ['Example Brand'],       // Filter by brand
        textSearch: 'T-Shirt'           // Search in vendorCode/nmID/barcode
      },
      cursor: {
        limit: 100                       // Max 100 per page
      },
      sort: {
        ascending: false                 // Newest first
      }
    });

    console.log(`Found ${page1.cursor?.total} total products`);
    console.log(`Page 1: ${page1.cards?.length} products\n`);

    page1.cards?.slice(0, 3).forEach(card => {
      console.log(`- nmID: ${card.nmID}, Vendor: ${card.vendorCode}, Title: ${card.title}`);
    });

    // Get next page using cursor (if more than 100 products)
    if (page1.cursor?.updatedAt && page1.cursor.nmID && (page1.cursor?.total ?? 0) > 100) {
      console.log('\nFetching page 2...');

      const page2 = await sdk.products.listProducts({
        filter: {
          withPhoto: 1,
          brands: ['Example Brand']
        },
        cursor: {
          limit: 100,
          updatedAt: page1.cursor.updatedAt,  // From previous response
          nmID: page1.cursor.nmID              // From previous response
        }
      });

      console.log(`Page 2: ${page2.cards?.length} more products`);
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Check your API key has Products module permissions');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('❌ Error listing products:', error);
    }
  }
}

/**
 * Example 3: Get Single Product by nmID
 *
 * Convenience method wrapping listProducts with textSearch
 * Rate limit: 100 requests/min, 600ms interval
 */
async function getProductExample() {
  console.log('\n=== Example 3: Get Single Product ===\n');

  const nmID = 12345;  // Replace with actual Wildberries article ID

  try {
    const product = await sdk.products.getProductCard(nmID);

    if (product) {
      console.log('✅ Product found:');
      console.log(`- nmID: ${product.nmID}`);
      console.log(`- Vendor Code: ${product.vendorCode}`);
      console.log(`- Brand: ${product.brand}`);
      console.log(`- Title: ${product.title}`);
      console.log(`- Sizes: ${product.sizes?.length || 0}`);
      console.log(`- Created: ${product.createdAt}`);
      console.log(`- Updated: ${product.updatedAt}`);
    } else {
      console.log('❌ Product not found (may be in trash or deleted)');
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('❌ Error getting product:', error);
    }
  }
}

/**
 * Example 4: Update Product (CRITICAL: Send ALL Fields!)
 *
 * ⚠️ WARNING: This endpoint COMPLETELY REPLACES the product card.
 * Missing fields will be REMOVED from the product!
 *
 * Correct workflow:
 * 1. Get current product
 * 2. Modify desired fields
 * 3. Send ALL fields (including unchanged ones)
 *
 * Rate limit: 10 requests/min, 6 second interval
 */
async function updateProductExample() {
  console.log('\n=== Example 4: Update Product (SAFE METHOD) ===\n');

  const nmID = 12345;  // Replace with actual Wildberries article ID

  try {
    // Step 1: Get current product state
    const current = await sdk.products.getProductCard(nmID);

    if (!current || !current.nmID || !current.vendorCode) {
      console.error('❌ Product not found or missing required fields');
      return;
    }

    console.log('Current product title:', current.title);

    // Step 2: Create update request with ALL fields
    const updateRequest: UpdateProductRequest = {
      // Required fields
      nmID: current.nmID,
      vendorCode: current.vendorCode,
      sizes: current.sizes?.map(s => ({
        chrtID: s.chrtID,      // Required for existing sizes
        techSize: s.techSize,
        wbSize: s.wbSize,
        skus: s.skus
      })) ?? [],

      // Optional fields - MUST include even if unchanged
      brand: current.brand,
      title: 'UPDATED: Premium Cotton T-Shirt',  // ← Only this changed
      description: current.description,           // ← Keep unchanged
      dimensions: current.dimensions,             // ← Keep unchanged
      characteristics: current.characteristics?.map(c => ({
        id: c.id ?? 0,
        value: c.value
      }))                                         // ← Keep unchanged
    };

    // Step 3: Send update
    const result = await sdk.products.updateProduct([updateRequest]);

    if (result.error) {
      console.error('❌ Update failed:', result.errorText);
    } else {
      console.log('✅ Product updated (async processing)');
      console.log('New title will be: UPDATED: Premium Cotton T-Shirt');
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   All fields must be provided when updating');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('❌ Error updating product:', error);
    }
  }
}

/**
 * Example 5: Batch Update Multiple Products
 *
 * Update up to 3000 products in a single request
 */
async function batchUpdateExample() {
  console.log('\n=== Example 5: Batch Update ===\n');

  const updates: UpdateProductRequest[] = [
    {
      nmID: 12345,
      vendorCode: 'PROD-001',
      sizes: [],
      title: 'Updated Product 1'
    },
    {
      nmID: 12346,
      vendorCode: 'PROD-002',
      sizes: [],
      title: 'Updated Product 2'
    },
    {
      nmID: 12347,
      vendorCode: 'PROD-003',
      sizes: [],
      title: 'Updated Product 3'
    }
  ];

  try {
    const result = await sdk.products.updateProduct(updates);
    console.log(`✅ Batch update ${updates.length} products queued`);
    console.log('Error:', result.error);
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Check all products have required fields');
    } else {
      console.error('❌ Batch update failed:', error);
    }
  }
}

/**
 * Example 6: Delete Product (Soft Delete to Trash)
 *
 * - Cards moved to trash, not permanently deleted
 * - Can be recovered before auto-deletion
 * - Auto-deleted after 30 days in trash
 *
 * Rate limit: 100 requests/min, 600ms interval
 */
async function deleteProductExample() {
  console.log('\n=== Example 6: Delete Product (Soft Delete) ===\n');

  const nmIDsToDelete = [12345];  // Max 1000 per request

  try {
    const result = await sdk.products.deleteProduct(nmIDsToDelete);

    if (result.error) {
      console.error('❌ Deletion failed:', result.errorText);
    } else {
      console.log('✅ Products moved to trash:');
      console.log(`- ${nmIDsToDelete.length} products deleted`);
      console.log('- Auto-deletion in 30 days (nightly Moscow time)');
      console.log('- New imtID will be assigned after moving to trash');
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('❌ Error deleting products:', error);
    }
  }
}

/**
 * Example 7: Complete Product Lifecycle
 *
 * Demonstrates create → verify → update → delete workflow
 */
async function completeLifecycleExample() {
  console.log('\n=== Example 7: Complete Lifecycle ===\n');

  try {
    // 1. Create
    console.log('Step 1: Creating product...');
    const createData: CreateProductRequest = {
      subjectID: 105,
      variants: [{
        vendorCode: 'LIFECYCLE-TEST-001',
        brand: 'Test Brand',
        title: 'Lifecycle Test Product',
        sizes: [{ techSize: 'M', skus: ['9999999999999'] }]
      }]
    };
    await sdk.products.createProduct(createData);
    console.log('✅ Product created (async)');

    // Wait for async processing (in real app, poll or check later)
    console.log('\n⏳ Waiting for async processing...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 2. Verify
    console.log('\nStep 2: Verifying product exists...');
    const list = await sdk.products.listProducts({
      filter: { textSearch: 'LIFECYCLE-TEST-001' }
    });
    const product = list.cards?.[0];

    if (product?.nmID) {
      console.log(`✅ Product found: nmID ${product.nmID}`);

      // 3. Update
      console.log('\nStep 3: Updating product...');
      if (product.vendorCode) {
        await sdk.products.updateProduct([{
          nmID: product.nmID,
          vendorCode: product.vendorCode,
          sizes: product.sizes?.map(s => ({
            chrtID: s.chrtID,
            techSize: s.techSize,
            skus: s.skus
          })) ?? [],
          title: 'UPDATED: Lifecycle Test Product'
        }]);
        console.log('✅ Product updated');
      }

      // 4. Delete
      console.log('\nStep 4: Deleting product...');
      await sdk.products.deleteProduct([product.nmID]);
      console.log('✅ Product moved to trash');
    }

    console.log('\n✅ Lifecycle complete!');
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('❌ Lifecycle error:', error);
    }
  }
}

// Run examples
async function main() {
  console.log('Wildberries SDK - Products CRUD Examples');
  console.log('=========================================');

  await createProductExample();
  await listProductsExample();
  await getProductExample();
  await updateProductExample();
  await batchUpdateExample();
  await deleteProductExample();
  await completeLifecycleExample();

  console.log('\n✅ All examples completed!');
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

---
title: Product Catalog Sync
description: Learn to synchronize your product catalog with Wildberries - fetch categories, create cards, upload media, and update pricing
layout: doc
---

# Tutorial 1: Product Catalog Sync

Learn how to synchronize your product catalog with Wildberries marketplace.

> **[Русская версия](../../ru/getting-started/tutorials/product-catalog-sync.md)** | English Version

## What You'll Build

A complete product catalog sync system that:
- Fetches product categories from Wildberries
- Creates new product cards
- Uploads product media (images)
- Updates product pricing

**Estimated Time:** 30 minutes
**Difficulty:** Beginner

---

## Learning Objectives

By the end of this tutorial, you'll be able to:
- ✅ Retrieve product categories and their structure
- ✅ Create product cards with required attributes
- ✅ Upload and manage product media
- ✅ Update product pricing dynamically
- ✅ Handle common errors in product management

---

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js ≥ 20.0.0 installed
- ✅ Wildberries API key (seller account)
- ✅ SDK installed (`npm install wb-api-sdk`)
- ✅ Basic TypeScript knowledge
- ✅ Completed [Quickstart Guide](../quickstart.md)

---

## Introduction

Product catalog synchronization is one of the most common tasks for Wildberries sellers. This tutorial walks you through the complete workflow of managing your products programmatically using the SDK.

**Why This Matters:**
- Automate product uploads for large catalogs
- Keep pricing in sync with your inventory system
- Manage media assets efficiently
- Reduce manual data entry errors

**What You'll Achieve:**
By the end, you'll have a working script that can create products, upload images, and update prices - the foundation for building a complete e-commerce integration.

---

## Step 1: Get Product Categories (10 minutes)

First, let's fetch the category structure to understand where our products belong.

### Understanding Categories

Wildberries uses a hierarchical category system:
- **Parent Categories:** Top-level (e.g., "Electronics", "Household chemicals")
- **Subcategories:** More specific (e.g., "Smartphones", "Laptops")
- **Characteristics:** Required attributes per category (e.g., brand, color, size)

### Code Example

Create a file `product-sync.ts`:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function getCategories() {
  try {
    // Get all parent categories
    const parentCategories = await sdk.products.getParentAll();

    console.log('Available Parent Categories:');
    parentCategories.data.forEach(category => {
      console.log(`  - ${category.name} (ID: ${category.id})`);
    });

    // Get subcategories for a specific parent
    const electronicsId = parentCategories.data.find(
      c => c.name === 'Electronics'
    )?.id;

    if (electronicsId) {
      const subcategories = await sdk.products.getObjectAll(electronicsId);

      console.log('\nElectronics Subcategories:');
      subcategories.data.forEach(sub => {
        console.log(`  - ${sub.name} (ID: ${sub.id})`);
      });
    }

    // Get required characteristics for a category
    const categoryId = 'your-category-id'; // Replace with actual ID
    const characteristics = await sdk.products.getObjectCharc(categoryId);

    console.log('\nRequired Characteristics:');
    characteristics.data.required.forEach(char => {
      console.log(`  - ${char.name} (${char.type})`);
    });

  } catch (error) {
    console.error('Error fetching categories:', error.message);
  }
}

getCategories();
```

### Expected Output

```
Available Parent Categories:
  - Electronics (ID: 1)
  - Household chemicals (ID: 2)
  - Clothing (ID: 3)
  ...

Electronics Subcategories:
  - Smartphones (ID: 101)
  - Laptops (ID: 102)
  - Tablets (ID: 103)
  ...

Required Characteristics:
  - Brand (string)
  - Model (string)
  - Color (enum)
  - Screen Size (number)
  ...
```

### Key Takeaways

- Always fetch categories first to get valid IDs
- Each category has different required characteristics
- Characteristics define what attributes your product needs

---

## Step 2: Create Product Card (10 minutes)

Now let's create a new product card with all required information.

### Product Card Structure

A product card contains:
- **Basic Info:** Title, brand, description
- **Category Assignment:** Which category it belongs to
- **Characteristics:** Product-specific attributes
- **Pricing:** Base price and discounts
- **Stock:** Warehouse inventory levels

### Code Example

Add this function to your `product-sync.ts`:

```typescript
async function createProduct() {
  try {
    const productData = {
      brandName: 'TechBrand',
      categoryId: '101', // Electronics > Smartphones
      title: 'TechBrand Smartphone Pro 15',
      description: 'Latest smartphone with advanced features',

      // Required characteristics (varies by category)
      characteristics: [
        { id: 'brand', value: 'TechBrand' },
        { id: 'model', value: 'Pro 15' },
        { id: 'color', value: 'Black' },
        { id: 'screenSize', value: '6.5' },
        { id: 'memory', value: '128GB' }
      ],

      // Pricing information
      pricing: {
        price: 59999, // Price in rubles (599.99)
        discount: 10, // 10% discount
        currency: 'RUB'
      },

      // Initial stock
      stock: [
        {
          warehouseId: 'warehouse-1',
          quantity: 100
        }
      ]
    };

    const result = await sdk.products.createProduct(productData);

    console.log('Product created successfully!');
    console.log('Product ID:', result.data.id);
    console.log('Status:', result.data.status); // Should be 'draft'

    return result.data.id; // Save for next steps

  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation failed:');
      error.fieldErrors.forEach(err => {
        console.error(`  - ${err.field}: ${err.message}`);
      });
    } else {
      console.error('Error creating product:', error.message);
    }
  }
}
```

### Expected Output

```
Product created successfully!
Product ID: prod_abc123xyz
Status: draft
```

### Common Errors

**❌ "Missing required characteristic: brand"**
- **Solution:** Check category requirements with `getCategoryCharacteristics()`
- **Fix:** Add all required characteristics to your product data

**❌ "Invalid category ID"**
- **Solution:** Verify category ID exists using `getSubcategories()`
- **Fix:** Use a valid category ID from the category tree

**❌ "Rate limit exceeded"**
- **Solution:** SDK automatically retries, but be patient
- **Note:** Product creation has strict rate limit (1 request per 10 seconds)

---

## Step 3: Upload Product Media (5 minutes)

Products need images to be visible in the marketplace. Let's upload product photos.

### Media Requirements

- **Formats:** JPEG, PNG
- **Size:** Max 10MB per image
- **Dimensions:** Min 900x1200px (recommended 1500x2000px)
- **Quantity:** Max 10 images per product
- **Order:** First image becomes primary product photo

### Code Example

```typescript
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function uploadProductMedia(productId: string) {
  try {
    // Prepare image files
    const imagePaths = [
      './images/product-front.jpg',
      './images/product-back.jpg',
      './images/product-side.jpg'
    ];

    // Upload each image
    for (const imagePath of imagePaths) {
      const imageBuffer = readFileSync(resolve(imagePath));

      const result = await sdk.products.uploadMediaFile({
        productId: productId,
        file: imageBuffer,
        fileName: imagePath.split('/').pop(),
        mimeType: 'image/jpeg'
      });

      console.log(`Uploaded: ${imagePath}`);
      console.log(`  - Media ID: ${result.data.mediaId}`);
      console.log(`  - URL: ${result.data.url}`);
    }

    console.log('\nAll images uploaded successfully!');

  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Image validation failed:', error.message);
    } else {
      console.error('Error uploading media:', error.message);
    }
  }
}
```

### Expected Output

```
Uploaded: ./images/product-front.jpg
  - Media ID: media_xyz789
  - URL: https://content-api.wildberries.ru/media/prod_abc123xyz/media_xyz789.jpg

Uploaded: ./images/product-back.jpg
  - Media ID: media_abc456
  - URL: https://content-api.wildberries.ru/media/prod_abc123xyz/media_abc456.jpg

Uploaded: ./images/product-side.jpg
  - Media ID: media_def123
  - URL: https://content-api.wildberries.ru/media/prod_abc123xyz/media_def123.jpg

All images uploaded successfully!
```

### Tips

- Upload high-quality images for better conversion
- First image is most important (shows in search results)
- Use descriptive file names for organization

---

## Step 4: Update Pricing (5 minutes)

Product prices change frequently. Let's update pricing dynamically.

### Pricing Structure

- **Base Price:** Regular selling price
- **Discount:** Percentage or fixed amount
- **Final Price:** Calculated automatically
- **Currency:** Always RUB (Russian Rubles)

### Code Example

```typescript
async function updatePricing(productId: string) {
  try {
    // Update product price
    const result = await sdk.products.updatePricing({
      productId: productId,
      price: 54999, // New price: 549.99 RUB
      discount: 15, // 15% discount
      discountType: 'percentage'
    });

    console.log('Price updated successfully!');
    console.log('New price:', result.data.price);
    console.log('Discount:', result.data.discount + '%');
    console.log('Final price:', result.data.finalPrice); // 46749 RUB

  } catch (error) {
    console.error('Error updating price:', error.message);
  }
}
```

### Expected Output

```
Price updated successfully!
New price: 54999
Discount: 15%
Final price: 46749
```

### Bulk Pricing Updates

For multiple products:

```typescript
async function bulkUpdatePrices(products: Array<{id: string, price: number}>) {
  try {
    const updates = products.map(product =>
      sdk.products.updatePricing({
        productId: product.id,
        price: product.price
      })
    );

    // Execute in parallel (respects rate limits)
    const results = await Promise.all(updates);

    console.log(`Updated ${results.length} products successfully`);

  } catch (error) {
    console.error('Bulk update failed:', error.message);
  }
}
```

---

## Complete Example

Here's the full working code combining all steps:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';
import { readFileSync } from 'fs';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function syncProductCatalog() {
  try {
    // Step 1: Get categories
    console.log('Step 1: Fetching categories...');
    const categories = await sdk.products.getParentAll();
    console.log(`✓ Found ${categories.data.length} parent categories\n`);

    // Step 2: Create product
    console.log('Step 2: Creating product...');
    const productData = {
      brandName: 'TechBrand',
      categoryId: '101',
      title: 'TechBrand Smartphone Pro 15',
      description: 'Latest smartphone with advanced features',
      characteristics: [
        { id: 'brand', value: 'TechBrand' },
        { id: 'model', value: 'Pro 15' },
        { id: 'color', value: 'Black' }
      ],
      pricing: {
        price: 59999,
        discount: 10,
        currency: 'RUB'
      }
    };

    const product = await sdk.products.createProduct(productData);
    console.log(`✓ Product created: ${product.data.id}\n`);

    // Step 3: Upload media
    console.log('Step 3: Uploading product images...');
    const imagePaths = ['./images/front.jpg', './images/back.jpg'];

    for (const imagePath of imagePaths) {
      const imageBuffer = readFileSync(imagePath);
      await sdk.products.uploadMediaFile({
        productId: product.data.id,
        file: imageBuffer,
        fileName: imagePath.split('/').pop(),
        mimeType: 'image/jpeg'
      });
    }
    console.log(`✓ Uploaded ${imagePaths.length} images\n`);

    // Step 4: Update pricing
    console.log('Step 4: Updating pricing...');
    await sdk.products.updatePricing({
      productId: product.data.id,
      price: 54999,
      discount: 15
    });
    console.log('✓ Price updated\n');

    console.log('🎉 Product catalog sync complete!');
    console.log(`Product ID: ${product.data.id}`);
    console.log('Status: Ready for marketplace');

  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the sync
syncProductCatalog();
```

### Run It

```bash
# Set your API key
export WB_API_KEY='your_api_key_here'

# Run the script
npx tsx product-sync.ts
```

### Expected Final Output

```
Step 1: Fetching categories...
✓ Found 15 parent categories

Step 2: Creating product...
✓ Product created: prod_abc123xyz

Step 3: Uploading product images...
✓ Uploaded 2 images

Step 4: Updating pricing...
✓ Price updated

🎉 Product catalog sync complete!
Product ID: prod_abc123xyz
Status: Ready for marketplace
```

---

## Error Handling Best Practices

### Rate Limiting

Product operations have strict rate limits:

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error.name === 'RateLimitError') {
    console.log(`Rate limited. Retry after ${error.retryAfter}ms`);
    // SDK automatically retries, no action needed
  }
}
```

### Validation Errors

Handle field-level validation:

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error.name === 'ValidationError') {
    console.error('Validation errors:');
    error.fieldErrors.forEach(err => {
      console.error(`  ${err.field}: ${err.message}`);
    });
    // Fix data and retry
  }
}
```

### Network Errors

Handle transient failures:

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error.name === 'NetworkError') {
    console.error('Network issue:', error.message);
    // SDK automatically retries 3 times
    // If still failing, check your connection
  }
}
```

---

## Troubleshooting

### Common Issues

**Issue: "Product creation is slow"**
- **Cause:** Rate limit (1 request per 10 seconds)
- **Solution:** This is normal. Use batch operations for multiple products.

**Issue: "Image upload fails"**
- **Cause:** File size or format
- **Solution:** Check image meets requirements (JPEG/PNG, <10MB, 900x1200px min)

**Issue: "Missing required characteristics"**
- **Cause:** Category requirements not met
- **Solution:** Use `getCategoryCharacteristics()` to see required fields

**Issue: "Product not visible in marketplace"**
- **Cause:** Product status is 'draft'
- **Solution:** Use `sdk.products.publishProduct(productId)` to make it live

---

## Next Steps

Congratulations! You've learned product catalog synchronization. Continue your journey:

1. **[Tutorial 2: Order Fulfillment](./order-fulfillment.md)** - Process customer orders
2. **[Tutorial 3: Analytics Dashboard](./analytics-dashboard.md)** - Track product performance
3. **[Best Practices Guide](../../guides/best-practices.md)** - Production-ready patterns
4. **[API Reference](../../api/)** - Complete products module documentation

---

## Key Takeaways

✅ Product categories define required characteristics
✅ Products start in 'draft' status and need publishing
✅ Media uploads improve product visibility
✅ Pricing updates are immediate
✅ SDK handles rate limiting automatically
✅ Field-level validation helps catch errors early

---

[← Back to Getting Started](../index.md) | [Next Tutorial: Order Fulfillment →](./order-fulfillment.md)

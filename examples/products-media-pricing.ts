/**
 * Example: Products Media and Pricing Management
 *
 * Demonstrates how to:
 * 1. Upload product media (images and video)
 * 2. Manage media (add, replace, remove)
 * 3. Set product prices and discounts
 * 4. Monitor async pricing updates
 * 5. Verify pricing changes applied
 *
 * Prerequisites:
 * - Product already created (see products-crud.ts example)
 * - Valid API key with media and pricing permissions
 *
 * @see https://dev.wildberries.ru/openapi/work-with-products
 */

import { WildberriesSDK } from '../src';

// Initialize SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here'
});

/**
 * Complete workflow for setting up product with media and pricing
 */
async function setupProductWithMediaAndPricing() {
  try {
    // Use an existing product nmID from your catalog
    const nmID = 12345; // Replace with your product's nmID

    console.log('\n=== Step 1: Upload Media Files ===\n');

    // Option A: Upload file directly (single file per request)
    console.log('Uploading image directly from file...');

    // Example with Buffer (Node.js file upload)
    // const fs = require('fs');
    // const imageBuffer = fs.readFileSync('path/to/image.jpg');
    // await sdk.products.uploadMediaFile(nmID, imageBuffer, 1);
    // console.log('✓ Image 1 uploaded via direct file upload');

    // Option B: Upload via URLs (RECOMMENDED for multiple files)
    console.log('\nUploading media via URLs...');

    const mediaURLs = [
      'https://example.com/product-main.jpg',      // Photo 1 (main)
      'https://example.com/product-side.jpg',      // Photo 2
      'https://example.com/product-back.jpg',      // Photo 3
      'https://example.com/product-detail.jpg',    // Photo 4
      'https://example.com/product-video.mp4'      // Video (always photo number 1)
    ];

    const uploadResponse = await sdk.products.uploadMediaByURLs(nmID, mediaURLs);

    if (uploadResponse.error) {
      console.error('✗ Media upload failed:', uploadResponse.errorText);
      return;
    }

    console.log('✓ All media uploaded successfully via URLs');

    // CRITICAL: uploadMediaByURLs() REPLACES all existing media
    // To ADD media while preserving existing, you must:
    // 1. Get current media list
    // 2. Include both old and new URLs in upload
    //
    // BAD Example (loses existing media):
    // await sdk.products.uploadMediaByURLs(nmID, ['https://new-photo.jpg']);
    //
    // GOOD Example (preserves existing media):
    // const existing = await sdk.products.getMediaList(nmID);
    // await sdk.products.uploadMediaByURLs(nmID, [...existing, 'https://new-photo.jpg']);

    console.log('\n=== Step 2: Verify Media Uploaded ===\n');

    const currentMedia = await sdk.products.getMediaList(nmID);
    console.log(`Product has ${currentMedia.length} media files:`);
    currentMedia.forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });

    console.log('\n=== Step 3: Set Pricing and Discounts ===\n');

    // Pricing updates are processed asynchronously
    // You'll receive a task ID and must poll for completion

    const pricingUpdates = [
      {
        nmID,
        price: 2999,      // Price in rubles (MUST be integer!)
        discount: 15      // Discount percentage (0-99%)
      }
    ];

    console.log('Submitting pricing update...');
    const pricingTask = await sdk.products.updatePricing(pricingUpdates);
    console.log(`✓ Pricing task created: ${pricingTask.uploadID}`);

    // IMPORTANT: 200 OK response means task queued, NOT that prices are updated
    // You MUST poll the task status endpoint to verify completion

    console.log('\n=== Step 4: Monitor Pricing Task Status ===\n');

    // Wait a moment before checking (pricing updates aren't instant)
    await sleep(2000);

    let taskStatus = await sdk.products.getPricingTaskStatus(pricingTask.uploadID);
    console.log(`Task status: ${taskStatus.status}`);

    // In production, you'd poll until status is 'completed' or 'failed'
    let pollAttempts = 0;
    const maxPolls = 10;

    while (taskStatus.status === 'pending' || taskStatus.status === 'processing') {
      if (pollAttempts >= maxPolls) {
        console.log('⚠ Max polling attempts reached');
        break;
      }

      console.log(`Polling... (attempt ${pollAttempts + 1}/${maxPolls})`);
      await sleep(2000);
      taskStatus = await sdk.products.getPricingTaskStatus(pricingTask.uploadID);
      pollAttempts++;
    }

    if (taskStatus.status === 'completed') {
      console.log('✓ Pricing task completed successfully');
    } else if (taskStatus.status === 'failed') {
      console.log('✗ Pricing task failed');
      return;
    }

    console.log('\n=== Step 5: Verify Pricing Applied ===\n');

    // Get current pricing for verification
    const pricing = await sdk.products.getPricing(nmID);

    console.log('Current pricing:');
    console.log(`  Price: ${pricing[0].price} ${pricing[0].currency}`);
    console.log(`  Discount: ${pricing[0].discount}%`);
    console.log(`  Final price: ${pricing[0].price * (1 - pricing[0].discount / 100)} ${pricing[0].currency}`);

    if (pricing[0].wbClubDiscount > 0) {
      console.log(`  WB Club discount: ${pricing[0].wbClubDiscount}%`);
    }

    console.log('\n=== Step 6: Update Media (Remove/Replace) ===\n');

    // Wildberries API doesn't have a dedicated "delete media" endpoint
    // To remove media, use uploadMediaByURLs() with only the URLs you want to keep

    console.log('Removing some media files (keeping only first 2)...');

    const keepURLs = currentMedia.slice(0, 2); // Keep only first 2 media files
    const removeResponse = await sdk.products.uploadMediaByURLs(nmID, keepURLs);

    if (!removeResponse.error) {
      console.log('✓ Media updated (removed extra files)');

      const updatedMedia = await sdk.products.getMediaList(nmID);
      console.log(`Product now has ${updatedMedia.length} media files`);
    }

    console.log('\n=== Workflow Complete! ===\n');
    console.log('Summary:');
    console.log(`  ✓ Uploaded ${mediaURLs.length} media files`);
    console.log(`  ✓ Set price to ${pricing[0].price} ${pricing[0].currency} with ${pricing[0].discount}% discount`);
    console.log(`  ✓ Managed media (reduced to ${keepURLs.length} files)`);

  } catch (error) {
    console.error('\n✗ Error in workflow:');

    if (error instanceof Error) {
      console.error(`  ${error.name}: ${error.message}`);

      // Type-specific error handling
      if ('statusCode' in error) {
        const statusCode = (error as { statusCode: number }).statusCode;
        console.error(`  HTTP Status: ${statusCode}`);

        if (statusCode === 429) {
          console.error('  → Rate limit exceeded. Wait before retrying.');
        } else if (statusCode === 400 || statusCode === 422) {
          console.error('  → Validation error. Check your data.');
        } else if (statusCode === 401 || statusCode === 403) {
          console.error('  → Authentication error. Check your API key.');
        }
      }
    } else {
      console.error('  Unknown error:', error);
    }
  }
}

/**
 * Example: Get pricing for multiple products
 */
async function getBulkPricing() {
  try {
    console.log('\n=== Bulk Pricing Query ===\n');

    // Query pricing for multiple products at once
    const nmIDs = [12345, 54321, 67890];

    const pricingList = await sdk.products.getPricing(nmIDs);

    console.log(`Retrieved pricing for ${pricingList.length} products:\n`);

    pricingList.forEach(pricing => {
      console.log(`Product ${pricing.nmID}:`);
      console.log(`  Price: ${pricing.price} ${pricing.currency}`);
      console.log(`  Discount: ${pricing.discount}%`);
      console.log(`  Final: ${pricing.price * (1 - pricing.discount / 100)} ${pricing.currency}\n`);
    });

  } catch (error) {
    console.error('Error fetching bulk pricing:', error);
  }
}

/**
 * Example: Bulk pricing update
 */
async function updateBulkPricing() {
  try {
    console.log('\n=== Bulk Pricing Update ===\n');

    // Update pricing for multiple products at once
    const bulkUpdates = [
      { nmID: 12345, price: 2999, discount: 15 },
      { nmID: 54321, price: 1499, discount: 10 },
      { nmID: 67890, price: 999, discount: 5 }
    ];

    console.log(`Updating pricing for ${bulkUpdates.length} products...`);

    const task = await sdk.products.updatePricing(bulkUpdates);
    console.log(`✓ Bulk pricing task created: ${task.uploadID}`);

    // Poll for completion
    await sleep(2000);

    const status = await sdk.products.getPricingTaskStatus(task.uploadID);
    console.log(`Task status: ${status.status}`);

    if (status.status === 'completed') {
      console.log('✓ All products updated successfully');
    }

  } catch (error) {
    console.error('Error updating bulk pricing:', error);
  }
}

/**
 * Helper function for delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the examples
if (require.main === module) {
  console.log('='.repeat(60));
  console.log('  Wildberries SDK - Media and Pricing Example');
  console.log('='.repeat(60));

  setupProductWithMediaAndPricing()
    .then(() => {
      console.log('\n' + '='.repeat(60));
      console.log('  Example completed successfully!');
      console.log('='.repeat(60));
    })
    .catch(error => {
      console.error('\n' + '='.repeat(60));
      console.error('  Example failed!');
      console.error('='.repeat(60));
      console.error(error);
      process.exit(1);
    });
}

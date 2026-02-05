# Products Module

The Products module provides comprehensive access to Wildberries product management APIs, including categories, product cards, media, pricing, warehouse management, and stock control.

## Overview

The Products module (`sdk.products`) is one of the most feature-rich modules in the SDK, covering the complete product lifecycle:

- **Categories & Characteristics**: Navigate product taxonomy and retrieve required fields for product creation
- **Product Cards CRUD**: Create, read, update, and delete product listings
- **Seller Tags**: Organize products with custom labels
- **Media Management**: Upload and manage product images and videos
- **Pricing**: Set and retrieve prices, discounts, and WB Club discounts
- **Warehouse Management**: Create and manage seller warehouses for FBS fulfillment
- **Stock Control**: Manage inventory levels across warehouses

**Base URLs**:
- Content API: `https://content-api.wildberries.ru`
- Pricing API: `https://discounts-prices-api.wildberries.ru`
- Marketplace API: `https://marketplace-api.wildberries.ru`

## Installation & Setup

```typescript
import { WildberriesSDK } from '@anthropic/wildberries-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});

// Access products module
const products = sdk.products;
```

## Methods Reference

### Categories & Characteristics

Methods for navigating the Wildberries product taxonomy.

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getParentAll(options?)` | Get all parent categories (e.g., Electronics, Household) | 100 req/min |
| `getObjectAll(options?)` | Get categories/subjects with optional filtering | 100 req/min |
| `getObjectCharc(subjectId, options?)` | Get characteristics for a specific category | 100 req/min |
| `getBrands(subjectId, next?)` | Get brands available for a subject (paginated) | 1 req/sec |

### Directory Values

Reference data for product characteristics.

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getDirectoryColors(options?)` | Get available color values | 100 req/min |
| `getDirectoryKinds(options?)` | Get available gender values | 100 req/min |
| `getDirectoryCountries(options?)` | Get available country values | 100 req/min |
| `getDirectorySeasons(options?)` | Get available season values | 100 req/min |
| `getDirectoryVat(options?)` | Get available VAT rate values | 100 req/min |
| `getDirectoryTnved(options)` | Get TNVED codes by subject | 100 req/min |

### Seller Tags

Methods for organizing products with custom labels.

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getContentTags()` | Get all seller tags | 100 req/min |
| `createContentTag(data)` | Create a new tag (max 15 tags) | 100 req/min |
| `updateContentTag(id, data)` | Update tag name/color | 100 req/min |
| `deleteContentTag(id)` | Delete a tag | 100 req/min |
| `createNomenclatureLink(data)` | Add/remove tags from product card | 100 req/min |

### Product Cards CRUD

Core methods for managing product listings.

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `createCardsUpload(data)` | Create new product cards (async) | 10 req/min |
| `createUploadAdd(data)` | Add cards to existing imtID | 10 req/min |
| `getCardsList(data, options?)` | List product cards with pagination | 100 req/min |
| `createCardsUpdate(data)` | Update product cards | 10 req/min |
| `createCardsMovenm(data)` | Merge or split product cards | 100 req/min |
| `createDeleteTrash(data)` | Move cards to trash (soft delete) | 100 req/min |
| `createCardsRecover(data)` | Restore cards from trash | 100 req/min |
| `getTrashedCards(data, options?)` | List cards in trash | 100 req/min |
| `getCardsLimits()` | Get card creation limits | 100 req/min |
| `createContentBarcode(data)` | Generate barcodes for products | 100 req/min |
| `createErrorList(data, options?)` | Get cards with creation errors | 10 req/min |

### Media Management

Methods for managing product images and videos.

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `createMediaFile()` | Upload single media file (multipart) | 100 req/min |
| `createMediaSave(data)` | Upload media via URLs | 100 req/min |

### Pricing

Methods for managing product prices and discounts.

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `createUploadTask(data)` | Set prices and discounts | 10 req/6s |
| `createTaskSize(data)` | Set per-size prices | 10 req/6s |
| `createTaskClubDiscount(data)` | Set WB Club discounts | 10 req/6s |
| `getHistoryTasks(options)` | Get processed upload status | 10 req/6s |
| `getGoodsTask(options)` | Get upload task details | 10 req/6s |
| `getBufferTasks(options)` | Get pending upload status | 10 req/6s |
| `getBufferGoodsTask(options)` | Get pending upload details | 10 req/6s |
| `getGoodsFilter(options)` | Get products with pricing (paginated) | 10 req/6s |
| `createGoodsFilter(data)` | Get pricing by article IDs | 10 req/6s |
| `getSizeNm(options)` | Get per-size pricing for product | 10 req/6s |
| `getQuarantineGoods(options)` | Get quarantined products | 10 req/6s |

### Warehouse Management

Methods for managing seller warehouses (FBS model).

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `offices()` | Get WB warehouses for FBS binding | 300 req/min |
| `warehouses()` | Get seller's warehouse list | 300 req/min |
| `createWarehouse(data)` | Create seller warehouse | 300 req/min |
| `updateWarehouse(warehouseId, data)` | Update warehouse details | 300 req/min |
| `deleteWarehouse(warehouseId)` | Delete seller warehouse | 300 req/min |
| `getWarehousesContact(warehouseId)` | Get warehouse contacts (DBW only) | 300 req/min |
| `updateWarehousesContact(warehouseId, data)` | Update warehouse contacts | 300 req/min |

### Stock Management

Methods for managing inventory levels.

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getStocks(warehouseId, data)` | Get stock levels for SKUs | 300 req/min |
| `updateStock(warehouseId, data)` | Update stock quantities | 300 req/min |
| `deleteStock(warehouseId, data)` | Delete stock records (irreversible) | 300 req/min |

## Usage Examples

### Category Navigation

```typescript
// 1. Get all parent categories
const parents = await sdk.products.getParentAll({ locale: 'ru' });
console.log('Parent categories:', parents.data);

// 2. Get subjects within a parent category
const subjects = await sdk.products.getObjectAll({
  parentID: 306,  // Electronics
  locale: 'ru',
  limit: 50,
});
console.log('Subjects:', subjects.data);

// 3. Get characteristics for a specific subject
const characteristics = await sdk.products.getObjectCharc(105, { locale: 'ru' });
const required = characteristics.data?.filter(c => c.required);
console.log('Required characteristics:', required);

// 4. Get brands for product creation
const brands = await sdk.products.getBrands(105);
console.log(`Found ${brands.total} brands`);

// Paginate through all brands
let nextCursor: number | undefined;
do {
  const page = await sdk.products.getBrands(105, nextCursor);
  page.brands.forEach(b => console.log(b.name));
  nextCursor = page.next;
} while (nextCursor);
```

### Product Cards Workflow

```typescript
// Create a new product card
const createResult = await sdk.products.createCardsUpload([{
  subjectID: 105,
  variants: [{
    vendorCode: 'ART-001',
    brand: 'MyBrand',
    title: 'Product Name',
    description: 'Product description...',
    dimensions: {
      length: 10,  // cm
      width: 5,    // cm
      height: 2,   // cm
      weightBrutto: 0.5,  // kg
    },
    sizes: [{
      techSize: 'XL',
      wbSize: '52',
      skus: ['1234567890123'],
    }],
    characteristics: [
      { id: 1, value: 'Blue' },
      { id: 2, value: 'Cotton' },
    ],
  }],
}]);
console.log('Product created:', createResult);

// List products with pagination
const productList = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 },  // -1=all, 0=without, 1=with
  },
}, { locale: 'ru' });

console.log(`Total products: ${productList.cursor?.total}`);

// Paginate through all products
let cursor = productList.cursor;
while (cursor?.nmID) {
  const nextPage = await sdk.products.getCardsList({
    settings: {
      cursor: {
        limit: 100,
        updatedAt: cursor.updatedAt,
        nmID: cursor.nmID,
      },
    },
  });
  cursor = nextPage.cursor;
}
```

### Update Product (Critical: Send All Fields)

```typescript
// WARNING: Updates completely replace the card
// You must send ALL fields, not just changed ones

// First, get the current product data
const currentProducts = await sdk.products.getCardsList({
  settings: {
    filter: { textSearch: '12345678' },
    cursor: { limit: 1 },
  },
});
const product = currentProducts.cards?.[0];

if (product) {
  // Now update with ALL fields included
  await sdk.products.createCardsUpdate([{
    nmID: product.nmID!,
    vendorCode: product.vendorCode!,
    brand: product.brand,
    title: 'Updated Title',  // Changed field
    description: product.description,
    dimensions: product.dimensions,
    characteristics: product.characteristics?.map(c => ({
      id: c.id!,
      value: c.value,
    })) ?? [],
    sizes: product.sizes ?? [],
  }]);
}
```

### Seller Tags Management

```typescript
// Create a tag
await sdk.products.createContentTag({
  name: 'Sale',
  color: 'ff0000',
});

// Get all tags
const tags = await sdk.products.getContentTags();
console.log('Tags:', tags.data);

// Add tag to product
await sdk.products.createNomenclatureLink({
  nmID: 12345678,
  tagsIDs: [1, 2, 3],
});
```

### Media Upload

```typescript
const nmID = 12345678;

// Upload media via URLs (replaces all existing media!)
await sdk.products.createMediaSave({
  nmId: nmID,
  data: [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
    'https://example.com/video.mp4',
  ],
});

// IMPORTANT: To add media without losing existing:
// 1. Get current photos from product card
// 2. Include both old and new URLs in the request
```

### Pricing Management

```typescript
// Set prices and discounts (async operation)
const task = await sdk.products.createUploadTask({
  data: [
    { nmID: 12345678, price: 2999, discount: 15 },
    { nmID: 87654321, price: 1999, discount: 10 },
  ],
});
console.log('Task ID:', task.data?.id);

// Check task status
const status = await sdk.products.getHistoryTasks({
  uploadID: task.data?.id!,
});
console.log('Status:', status.data?.status);

// Get current pricing
const pricing = await sdk.products.getGoodsFilter({
  limit: 1000,
  offset: 0,
});
console.log('Products with prices:', pricing.data?.listGoods);

// Get pricing for specific products
const specificPricing = await sdk.products.createGoodsFilter({
  nmIDs: [12345678, 87654321],
});
```

### Warehouse & Stock Management

```typescript
// 1. Get available WB warehouses for FBS binding
const wbWarehouses = await sdk.products.offices();
console.log('Available WB warehouses:', wbWarehouses);

// 2. Create seller warehouse
const newWarehouse = await sdk.products.createWarehouse({
  name: 'Main Warehouse',
  officeId: wbWarehouses[0].id!,  // Bind to WB warehouse
});
console.log('Created warehouse ID:', newWarehouse.id);

// 3. Get seller warehouses
const sellerWarehouses = await sdk.products.warehouses();
console.log('My warehouses:', sellerWarehouses);

// 4. Update stock levels
await sdk.products.updateStock(newWarehouse.id!, {
  stocks: [
    { sku: '1234567890123', amount: 100 },
    { sku: '1234567890124', amount: 50 },
  ],
});

// 5. Get stock levels
const stockLevels = await sdk.products.getStocks(newWarehouse.id!, {
  skus: ['1234567890123', '1234567890124'],
});
console.log('Stock levels:', stockLevels.stocks);

// 6. Delete stock records (IRREVERSIBLE!)
await sdk.products.deleteStock(newWarehouse.id!, {
  skus: ['1234567890123'],
});
```

## Key Types

### Product Card Types

```typescript
interface ProductCard {
  nmID?: number;              // WB article ID
  imtID?: number;             // Unified card ID
  nmUUID?: string;            // Unique identifier
  subjectID?: number;         // Category ID
  subjectName?: string;       // Category name
  vendorCode?: string;        // Seller's article code
  brand?: string;             // Brand name
  title?: string;             // Product title
  description?: string;       // Product description
  photos?: PhotoUrl[];        // Photo URLs
  video?: string;             // Video URL
  dimensions?: ProductDimensions;
  characteristics?: ProductCharacteristic[];
  sizes?: ProductSize[];
  tags?: ProductTag[];
  createdAt?: string;         // ISO 8601
  updatedAt?: string;         // ISO 8601
}

interface ProductDimensions {
  length?: number;            // cm
  width?: number;             // cm
  height?: number;            // cm
  weightBrutto?: number;      // kg
  isValid?: boolean;
}

interface ProductSize {
  chrtID?: number;            // Characteristic ID (required for updates)
  techSize?: string;          // Technical size (e.g., "XL")
  wbSize?: string;            // WB display size
  skus?: string[];            // Barcodes
}
```

### Pricing Types

```typescript
interface GoodsList {
  nmID?: number;              // WB article ID
  vendorCode?: string;        // Seller's article
  sizes?: SizePrice[];        // Per-size pricing
  currencyIsoCode4217?: string;  // Currency (e.g., "RUB")
  discount?: number;          // Discount percentage
  clubDiscount?: number;      // WB Club discount
  editableSizePrice?: boolean;  // Can set per-size prices
}

interface SizePrice {
  sizeID: number;             // Size ID (same as chrtID)
  price: number;              // Price before discount
  discountedPrice: number;    // Price after discount
  clubDiscountedPrice: number;  // Price with WB Club
  techSizeName: string;       // Size name
}
```

### Warehouse & Stock Types

```typescript
interface Office {
  id?: number;                // WB warehouse ID
  name?: string;              // Warehouse name
  address?: string;           // Address
  city?: string;              // City
  cargoType?: 1 | 2 | 3;      // 1=small, 2=oversized, 3=large
  deliveryType?: 1 | 2 | 3 | 5 | 6;  // FBS/DBS/DBW/C&C/EDBS
}

interface Warehouse {
  id?: number;                // Seller warehouse ID
  name?: string;              // Warehouse name
  officeId?: number;          // Bound WB warehouse ID
  cargoType?: 1 | 2 | 3;
  deliveryType?: 1 | 2 | 3 | 5 | 6;
  isDeleting?: boolean;
  isProcessing?: boolean;
}

interface StockUpdate {
  sku: string;                // Product barcode
  amount: number;             // Quantity (0-100,000)
}
```

## Error Handling

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
} from '@anthropic/wildberries-sdk';

try {
  await sdk.products.createCardsUpload([/* ... */]);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter}ms`);
  } else if (error instanceof ValidationError) {
    console.error('Invalid request data:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  }
}
```

### Common Error Scenarios

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid API key | Check API key configuration |
| 403 Forbidden | Insufficient permissions | Verify API key has required scope |
| 409 Conflict | WB office already bound | Use different office or delete existing binding |
| 409 Conflict | Warehouse processing | Wait and retry |
| 429 Rate Limit | Too many requests | Wait for rate limit window to reset |

**Important**: 409 errors on stock endpoints count as **10 requests** toward your rate limit.

## Rate Limits

The Products module uses three different API domains with different rate limits:

| API Domain | Default Limit | Interval | Notes |
|------------|---------------|----------|-------|
| Content API | 100 req/min | 600ms | Categories, cards, media, tags |
| Content API (Brands) | 1 req/sec | 1000ms | Brands endpoint only |
| Content API (Mutations) | 10 req/min | 6000ms | Card create/update, error list |
| Pricing API | 10 req/6s | 600ms | Prices and discounts |
| Marketplace API | 300 req/min | 200ms | Warehouses and stocks |

## Critical Implementation Notes

### 1. Product Updates Replace Entire Card

The `createCardsUpdate` method **completely replaces** the product card. You must send ALL fields, including unchanged ones. Missing fields will be deleted.

### 2. Media Uploads Replace Existing Media

`createMediaSave` replaces ALL existing media. To add new media while keeping existing ones, include both old and new URLs in the request.

### 3. Stock Deletion is Irreversible

`deleteStock` permanently removes stock records. You must re-upload stock to resume sales.

### 4. Async Processing for Cards and Pricing

Card creation/update and pricing operations are processed asynchronously. A 200 OK means the request was queued, not completed. Check the error list or task status endpoints for results.

### 5. Pagination Limits

- Product cards: Maximum 100 per request (use cursor pagination)
- Stock updates: 1-1000 SKUs per request
- Stock amounts: 0-100,000 per SKU

### 6. Warehouse Office Binding

- Cannot bind a WB office already in use
- Office binding can only be changed once per 24 hours
- Deleting a warehouse frees the office for reuse

## Deprecated Methods

The following methods are deprecated and will be removed in a future version. Use the recommended replacements:

| Deprecated Method | Use Instead | Reason |
|-------------------|-------------|--------|
| `createCardsList()` | `getCardsList()` | Naming consistency (GET operation) |
| `createCardsTrash()` | `getTrashedCards()` | Naming consistency (GET operation) |
| `getGoodsTask2()` | `getBufferGoodsTask()` | Clearer naming |
| `createStock()` | `getStocks()` | Naming consistency (GET operation) |
| `createWarehous()` | `createWarehouse()` | Typo fix |
| `updateWarehous()` | `updateWarehouse()` | Typo fix |
| `deleteWarehous()` | `deleteWarehouse()` | Typo fix |

> **Note**: Deprecated methods are fully functional and will continue to work. They simply delegate to the recommended methods internally.

## Related Documentation

### Stories
- [Story 2.1: Categories & Structure](/docs/stories/2.1.products-categories-structure.md)
- [Story 2.2: CRUD Operations](/docs/stories/2.2.products-crud-operations.md)
- [Story 2.3: Media & Pricing](/docs/stories/2.3.products-media-pricing.md)
- [Story 2.4: Warehouse & Stock](/docs/stories/2.4.products-warehouse-stock.md)

### EPICs
- [EPIC 16: Products Brands Endpoint](/docs/epics/EPIC_16_PRODUCTS_BRANDS.md)
- [EPIC 17: Products Rate Limits](/docs/epics/EPIC_17_PRODUCTS_RATE_LIMITS.md)
- [EPIC 18: Products Metadata Support](/docs/epics/EPIC_18_METADATA_SUPPORT.md)
- [EPIC 19: Products Type Safety](/docs/epics/EPIC_19_PRODUCTS_TYPE_SAFETY.md)
- [EPIC 20: Products Naming Fixes](/docs/epics/EPIC_20_PRODUCTS_NAMING.md)
- [EPIC 21: Products Testing](/docs/epics/EPIC_21_PRODUCTS_TESTING.md)

### Official Documentation
- [Wildberries API: Work with Products](https://dev.wildberries.ru/openapi/work-with-products)

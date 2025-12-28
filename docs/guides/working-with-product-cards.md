---
title: Working with Product Cards
description: Complete guide to fetching, filtering, and paginating product cards with createCardsList() method
layout: doc
---

# Working with Product Cards

Complete guide to fetching, filtering, and paginating product cards using the `createCardsList()` method.

## Table of Contents

- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [Understanding the Request Structure](#understanding-the-request-structure)
- [First Request vs Pagination](#first-request-vs-pagination)
- [Filtering Options](#filtering-options)
- [Complete Pagination Example](#complete-pagination-example)
- [Common Mistakes](#common-mistakes)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Response Structure](#response-structure)

---

## Overview

The `createCardsList()` method retrieves a list of your product cards from Wildberries. It supports:

- **Cursor-based pagination** for fetching large datasets
- **Advanced filtering** by photos, text search, brands, categories, tags
- **Sorting** by update date
- **Efficient batching** (maximum **100 cards per request**)

**API Endpoint:** `POST /content/v2/get/cards/list`

**Rate Limit:** 100 requests/minute with 600ms intervals (burst: 5 requests)

**⚠️ Important:** Cards in trash are NOT returned by this method. Use `getCardsTrash()` to fetch trashed cards separately.

### 🚨 CRITICAL: Pagination Limit Restrictions

**MAXIMUM: 100 cards per request** - the API will reject larger values with `ValidationError (HTTP 400)`.

**Verified through testing (December 2024):**
- ✅ **`limit: 10`** - Works perfectly
- ✅ **`limit: 100`** - **RECOMMENDED & MAXIMUM** - Official Wildberries recommendation
- ❌ **`limit: 1000`** - **FAILS with ValidationError (HTTP 400)**
- ❌ **`limit: 5000`** - **FAILS with ValidationError (HTTP 400)**

**Why this matters:** Although undocumented in Wildberries API specification, the API enforces a strict limit of **100 cards maximum**. Any value exceeding 100 will result in request rejection.

**Correct approach:** Always use `limit: 100` with proper pagination (see examples below).

---

## Basic Usage

### Simplest Example - First 100 Cards

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get first 100 product cards
const response = await sdk.products.createCardsList({
  settings: {
    filter: {
      withPhoto: -1  // All cards (with and without photos)
    },
    cursor: {
      limit: 100
    }
  }
});

console.log(`Fetched: ${response.cards?.length ?? 0} cards`);
console.log(`Total in account: ${response.cursor?.total ?? 0} cards`);
```

---

## Understanding the Request Structure

### Request Schema

```typescript
{
  settings: {
    sort?: {
      ascending?: boolean;  // Sort by updatedAt (false = descending)
    };
    filter?: {
      withPhoto?: number;           // Photo filter: -1, 0, or 1
      textSearch?: string;          // Search by vendor code, nmID, barcode
      tagIDs?: number[];            // Filter by tag IDs
      allowedCategoriesOnly?: boolean;  // Only allowed categories
      objectIDs?: number[];         // Filter by subject IDs
      brands?: string[];            // Filter by brand names
      imtID?: number;              // Filter by merged card ID
    };
    cursor: {
      limit: number;                // Cards per request (MAXIMUM: 100)
      updatedAt?: string;           // For pagination (ISO 8601 timestamp)
      nmID?: number;                // For pagination (Wildberries article ID)
    };
  }
}
```

### Query Parameters

```typescript
{
  locale?: 'ru' | 'en' | 'zh';  // Language for name, value, object fields
}
```

---

## First Request vs Pagination

### 🔑 Critical Difference

**FIRST REQUEST** (getting initial batch):
```typescript
// ✅ CORRECT - Only specify limit
{
  settings: {
    cursor: {
      limit: 100  // ONLY limit, DO NOT include updatedAt or nmID
    },
    filter: { withPhoto: -1 }
  }
}
```

```typescript
// ❌ WRONG - Empty values cause validation errors
{
  settings: {
    cursor: {
      limit: 100,
      updatedAt: "",  // ❌ Remove this for first request
      nmID: 0         // ❌ Remove this for first request
    },
    filter: { withPhoto: -1 }
  }
}
```

**PAGINATION REQUESTS** (getting next batches):
```typescript
// ✅ CORRECT - Copy updatedAt and nmID from previous response
{
  settings: {
    cursor: {
      limit: 100,
      updatedAt: "2023-12-06T11:17:00.96577Z",  // From response.cursor
      nmID: 370870300                            // From response.cursor
    },
    filter: { withPhoto: -1 }
  }
}
```

### How Pagination Works

1. **Make first request** with only `limit` in cursor
2. **Receive response** with cards and cursor data
3. **Copy `cursor.updatedAt` and `cursor.nmID`** from response
4. **Paste into next request's cursor**
5. **Repeat** until `cursor.total < limit` or `cards.length < limit`

---

## Filtering Options

### Photo Filter

```typescript
// All cards (with and without photos) - DEFAULT
withPhoto: -1

// Only cards WITHOUT photos
withPhoto: 0

// Only cards WITH photos
withPhoto: 1
```

### Text Search (Vendor Code, nmID, Barcode)

```typescript
{
  settings: {
    filter: {
      textSearch: '4603743187500888',  // Searches in vendor code, nmID, barcode
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Filter by Brand

```typescript
{
  settings: {
    filter: {
      brands: ['Nike', 'Adidas', 'Puma'],
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Filter by Tag IDs

```typescript
// First, get available tags
const tags = await sdk.products.getContentTags();
console.log(tags);

// Then filter by specific tag IDs
{
  settings: {
    filter: {
      tagIDs: [345, 415],  // Tag IDs from getContentTags()
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Filter by Subject (Category)

```typescript
{
  settings: {
    filter: {
      objectIDs: [235, 67],  // Subject IDs
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Filter by Merged Card ID

```typescript
{
  settings: {
    filter: {
      imtID: 328632,  // Get all variants of merged card
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Combine Multiple Filters

```typescript
{
  settings: {
    filter: {
      brands: ['Nike'],
      objectIDs: [235],
      withPhoto: 1,        // Only with photos
      tagIDs: [345]
    },
    cursor: { limit: 100 }
  }
}
```

---

## Complete Pagination Example

### Fetch All Product Cards with Pagination

```typescript
async function getAllProductCards() {
  const allCards = [];
  let hasMore = true;
  let cursor: any = { limit: 100 };  // Start with only limit

  while (hasMore) {
    const response = await sdk.products.createCardsList({
      settings: {
        filter: { withPhoto: -1 },
        cursor
      }
    });

    // Add cards to result
    if (response.cards) {
      allCards.push(...response.cards);
    }

    // Check if more data available
    const receivedCount = response.cards?.length ?? 0;

    // Stop if we received less than limit (last page)
    if (receivedCount < 100) {
      hasMore = false;
    } else if (response.cursor) {
      // Update cursor for next request
      cursor = {
        limit: 100,
        updatedAt: response.cursor.updatedAt,
        nmID: response.cursor.nmID
      };
    } else {
      hasMore = false;
    }

    console.log(`Progress: ${allCards.length} cards fetched`);

    // Optional: Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 650));
  }

  console.log(`Total cards fetched: ${allCards.length}`);
  return allCards;
}

// Usage
const allCards = await getAllProductCards();
```

### Pagination with Specific Filters

```typescript
async function getFilteredCardsWithPagination(filters: {
  brands?: string[];
  withPhoto?: number;
  textSearch?: string;
}) {
  const allCards = [];
  let cursor: any = { limit: 100 };

  while (true) {
    const response = await sdk.products.createCardsList({
      settings: {
        filter: {
          ...filters,
          withPhoto: filters.withPhoto ?? -1
        },
        cursor
      }
    });

    if (response.cards) {
      allCards.push(...response.cards);
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

    console.log(`Fetched ${allCards.length} cards...`);
    await new Promise(resolve => setTimeout(resolve, 650));
  }

  return allCards;
}

// Usage examples
const nikeCards = await getFilteredCardsWithPagination({
  brands: ['Nike'],
  withPhoto: 1
});

const cardsWithPhotos = await getFilteredCardsWithPagination({
  withPhoto: 1
});
```

---

## Common Mistakes

### ❌ Mistake 1: Including Empty Cursor Fields in First Request

```typescript
// ❌ WRONG - Causes "Validation failed"
const response = await sdk.products.createCardsList({
  settings: {
    cursor: {
      limit: 100,
      updatedAt: "",  // Empty string causes validation error
      nmID: 0         // Zero value causes validation error
    },
    filter: { withPhoto: -1 }
  }
});
```

**✅ Solution:** Omit `updatedAt` and `nmID` in first request:

```typescript
const response = await sdk.products.createCardsList({
  settings: {
    cursor: {
      limit: 100  // ONLY limit
    },
    filter: { withPhoto: -1 }
  }
});
```

### ❌ Mistake 2: Missing `settings` Wrapper

```typescript
// ❌ WRONG - Missing settings wrapper
const response = await sdk.products.createCardsList({
  cursor: { limit: 100 },      // Should be inside settings
  filter: { withPhoto: -1 }    // Should be inside settings
});
```

**✅ Solution:** Wrap everything in `settings`:

```typescript
const response = await sdk.products.createCardsList({
  settings: {  // ✅ Wrapper required
    cursor: { limit: 100 },
    filter: { withPhoto: -1 }
  }
});
```

### ❌ Mistake 3: Exceeding Limit Maximum (CRITICAL)

```typescript
// ❌ WRONG - Limit exceeds maximum, causes ValidationError (HTTP 400)
const response = await sdk.products.createCardsList({
  settings: {
    cursor: { limit: 1000 }  // ❌ FAILS - Maximum is 100!
  }
});

// ❌ ALSO WRONG - Even higher values fail
const response = await sdk.products.createCardsList({
  settings: {
    cursor: { limit: 5000 }  // ❌ FAILS - Maximum is 100!
  }
});
```

**✅ Solution:** ALWAYS use limit: 100 (maximum allowed):

```typescript
const response = await sdk.products.createCardsList({
  settings: {
    cursor: { limit: 100 }  // ✅ MAXIMUM & RECOMMENDED
  }
});
```

**Error you'll see if exceeded:**
```
ValidationError: Validation failed
HTTP Status: 400
```

### ❌ Mistake 4: Not Handling Pagination

```typescript
// ❌ WRONG - Only gets first 100 cards
const response = await sdk.products.createCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 }
  }
});

// If you have 500 cards, you missed 400!
```

**✅ Solution:** Implement pagination loop (see [Complete Pagination Example](#complete-pagination-example))

### ❌ Mistake 5: Incorrect API Key Permissions

```typescript
// ❌ WRONG - Using API key without "Content" or "Promotion" category
```

**✅ Solution:** Create API key with proper permissions:
- Go to Seller Portal → Settings → API Keys
- Create new key with **"Контент"** or **"Продвижение"** category

---

## Troubleshooting

### Error: "Validation failed"

**Symptoms:**
- Request returns 400 status code
- Error message: "Validation failed"

**Common Causes & Solutions:**

1. **Empty cursor fields in first request**
   ```typescript
   // ❌ Problem
   cursor: { limit: 100, updatedAt: "", nmID: 0 }

   // ✅ Solution
   cursor: { limit: 100 }
   ```

2. **Limit exceeds maximum (MOST COMMON)**
   ```typescript
   // ❌ Problem - API returns ValidationError (HTTP 400)
   cursor: { limit: 1000 }  // ❌ Exceeds maximum!
   cursor: { limit: 5000 }  // ❌ Exceeds maximum!

   // ✅ Solution - Use maximum allowed value
   cursor: { limit: 100 }  // ✅ MAXIMUM: 100 cards
   ```

   **Note:** This is the #1 cause of ValidationError. The API strictly enforces a 100-card limit despite incomplete documentation.

3. **Missing settings wrapper**
   ```typescript
   // ❌ Problem
   { cursor: { limit: 100 } }

   // ✅ Solution
   { settings: { cursor: { limit: 100 } } }
   ```

### Error: 401 Unauthorized or 403 Forbidden

**Cause:** API key lacks required permissions

**Solution:**
1. Go to Wildberries Seller Portal
2. Navigate to Settings → API Keys
3. Create new key with **"Контент"** or **"Продвижение"** category
4. Update `WB_API_KEY` environment variable

### Error: 429 Too Many Requests

**Cause:** Rate limit exceeded (100 requests/minute)

**Solution:**
```typescript
// Add delay between requests
async function fetchWithDelay() {
  const response = await sdk.products.createCardsList({...});

  // Wait 650ms before next request (100 req/min = 600ms interval + buffer)
  await new Promise(resolve => setTimeout(resolve, 650));

  return response;
}
```

### Getting 0 Cards When You Have Products

**Possible Causes:**

1. **Cards are in trash**
   ```typescript
   // Use separate method for trashed cards
   const trashedCards = await sdk.products.getCardsTrash({
     settings: { cursor: { limit: 100 } }
   });
   ```

2. **Wrong filter applied**
   ```typescript
   // Check filter settings
   filter: { withPhoto: 0 }  // Only returns cards WITHOUT photos
   ```

3. **Text search too specific**
   ```typescript
   // Try broader search or remove filter
   filter: { textSearch: '' }  // Empty search = no filter
   ```

### Response Has No `cursor` Field

**Cause:** This is the last page of results

**Solution:** This is expected behavior when you've fetched all cards. The pagination loop should exit.

```typescript
if (!response.cursor?.updatedAt) {
  console.log('Last page reached');
  break;
}
```

---

## Best Practices

### 1. ALWAYS Use Maximum Allowed Batch Size

```typescript
// ✅ CORRECT - Maximum allowed by API
cursor: { limit: 100 }

// ❌ FAILS - Exceeds maximum, causes ValidationError (HTTP 400)
cursor: { limit: 500 }

// ❌ FAILS - Exceeds maximum, causes ValidationError (HTTP 400)
cursor: { limit: 1000 }
```

**Why 100?** The Wildberries API strictly enforces a maximum of 100 cards per request. Use pagination to fetch all cards.

### 2. Implement Rate Limit Protection

```typescript
async function fetchWithRateLimit(requestFn: () => Promise<any>) {
  const response = await requestFn();

  // Wait 650ms between requests (100 req/min = 600ms + buffer)
  await new Promise(resolve => setTimeout(resolve, 650));

  return response;
}
```

### 3. Handle Errors Gracefully

```typescript
async function safeFetchCards(cursor: any, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await sdk.products.createCardsList({
        settings: { cursor, filter: { withPhoto: -1 } }
      });
    } catch (error: any) {
      if (error.statusCode === 429 && attempt < retries) {
        console.log(`Rate limited, waiting 60s (attempt ${attempt}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 60000));
      } else if (error.statusCode === 401 || error.statusCode === 403) {
        throw new Error('Invalid API key or insufficient permissions');
      } else if (attempt === retries) {
        throw error;
      }
    }
  }
}
```

### 4. Log Progress for Large Datasets

```typescript
async function getAllCardsWithProgress() {
  const allCards = [];
  let cursor: any = { limit: 100 };
  let pageNumber = 1;

  while (true) {
    console.log(`Fetching page ${pageNumber}...`);

    const response = await sdk.products.createCardsList({
      settings: { cursor, filter: { withPhoto: -1 } }
    });

    if (response.cards) {
      allCards.push(...response.cards);
      console.log(`  → Received ${response.cards.length} cards`);
      console.log(`  → Total so far: ${allCards.length}`);
      console.log(`  → Account total: ${response.cursor?.total ?? 'unknown'}`);
    }

    if ((response.cards?.length ?? 0) < 100 || !response.cursor?.updatedAt) {
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

  console.log(`✅ Completed: ${allCards.length} cards fetched`);
  return allCards;
}
```

### 5. Cache Results When Appropriate

```typescript
import { writeFileSync, readFileSync, existsSync } from 'fs';

async function getCachedCards(cacheDuration = 3600000) {  // 1 hour
  const cacheFile = 'cards-cache.json';

  if (existsSync(cacheFile)) {
    const cache = JSON.parse(readFileSync(cacheFile, 'utf-8'));
    const age = Date.now() - cache.timestamp;

    if (age < cacheDuration) {
      console.log('Using cached cards');
      return cache.cards;
    }
  }

  console.log('Fetching fresh cards from API');
  const cards = await getAllProductCards();

  writeFileSync(cacheFile, JSON.stringify({
    timestamp: Date.now(),
    cards
  }));

  return cards;
}
```

### 6. Filter Early to Reduce Data Transfer

```typescript
// ✅ GOOD - Filter on API side
const nikeCards = await sdk.products.createCardsList({
  settings: {
    filter: { brands: ['Nike'] },
    cursor: { limit: 100 }
  }
});

// ❌ INEFFICIENT - Fetch all, then filter client-side
const allCards = await getAllProductCards();
const nikeCards = allCards.filter(c => c.brand === 'Nike');
```

---

## Response Structure

### Response Type

```typescript
{
  cards?: Array<{
    nmID?: number;                // Wildberries article ID
    imtID?: number;               // Merged card ID (same for all variants)
    nmUUID?: string;              // Internal technical ID (UUID)
    subjectID?: number;           // Subject (category) ID
    subjectName?: string;         // Subject name
    vendorCode?: string;          // Your vendor code (SKU)
    brand?: string;               // Brand name
    title?: string;               // Product title
    description?: string;         // Product description
    needKiz?: boolean;            // Requires marking code (честныйзнак.рф)

    photos?: Array<{
      big?: string;               // Large photo URL
      c246x328?: string;          // 246x328px photo URL
      c516x688?: string;          // 516x688px photo URL
      square?: string;            // Square photo URL
      tm?: string;                // Thumbnail URL
    }>;

    video?: string;               // Video URL

    wholesale?: {
      enabled?: boolean;          // Wholesale enabled
      quantum?: number;           // Minimum wholesale quantity
    };

    dimensions?: {
      length?: number;            // Length in cm
      width?: number;             // Width in cm
      height?: number;            // Height in cm
      weightBrutto?: number;      // Weight in kg
      isValid?: boolean;          // Dimensions validated
    };

    characteristics?: Array<{
      id?: number;                // Characteristic ID
      name?: string;              // Characteristic name
      value?: any;                // Characteristic value (can be string, number, array)
    }>;

    sizes?: Array<{
      chrtID?: number;            // Size chart ID
      techSize?: string;          // Technical size
      wbSize?: string;            // Display size
      skus?: string[];            // Barcodes for this size
    }>;

    tags?: Array<{
      id?: number;                // Tag ID
      name?: string;              // Tag name
      color?: string;             // Tag color (hex)
    }>;

    createdAt?: string;           // Creation date (ISO 8601)
    updatedAt?: string;           // Last update date (ISO 8601)
  }>;

  cursor?: {
    updatedAt?: string;           // Copy to next request for pagination
    nmID?: number;                // Copy to next request for pagination
    total?: number;               // Total cards in account (informational)
  };
}
```

### Example Response

```json
{
  "cards": [
    {
      "nmID": 123456789,
      "imtID": 328632,
      "vendorCode": "MY-PRODUCT-001",
      "brand": "MyBrand",
      "title": "Premium Product Title",
      "description": "Detailed product description",
      "subjectID": 235,
      "subjectName": "Shirts",
      "photos": [
        {
          "big": "https://basket-01.wb.ru/vol123/part456/123456789/images/big/1.jpg",
          "c516x688": "https://basket-01.wb.ru/vol123/part456/123456789/images/c516x688/1.jpg"
        }
      ],
      "sizes": [
        {
          "chrtID": 987654,
          "techSize": "XL",
          "wbSize": "XL",
          "skus": ["4603743187500888"]
        }
      ],
      "updatedAt": "2023-12-06T11:17:00.96577Z"
    }
  ],
  "cursor": {
    "updatedAt": "2023-12-06T11:17:00.96577Z",
    "nmID": 123456789,
    "total": 500
  }
}
```

---

## Related Resources

- **[Product Catalog Use Case](/examples/use-cases/product-catalog)** - Complete product catalog sync examples
- **[Stock Management Guide](/guides/stock-management)** - Managing inventory with fetched cards
- **[Best Practices Guide](/guides/best-practices)** - General SDK best practices
- **[API Reference: ProductsModule](/api/classes/ProductsModule#createCardsList)** - TypeScript API documentation

---

## Summary

**Key Takeaways:**

1. ✅ **First request:** Only include `limit` in cursor
2. ✅ **Pagination:** Copy `updatedAt` and `nmID` from response cursor
3. ✅ **Always wrap** parameters in `settings` object
4. ✅ **Use `limit: 100`** for optimal performance
5. ✅ **Implement rate limiting** (650ms between requests)
6. ✅ **Handle errors** and retry on transient failures
7. ✅ **Check API key** has "Content" or "Promotion" permissions

**Quick Reference:**

```typescript
// First request
const first = await sdk.products.createCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 }
  }
});

// Next request (pagination)
const next = await sdk.products.createCardsList({
  settings: {
    cursor: {
      limit: 100,
      updatedAt: first.cursor.updatedAt,
      nmID: first.cursor.nmID
    },
    filter: { withPhoto: -1 }
  }
});
```

---

**Need help?** Check the [Troubleshooting Guide](/guides/troubleshooting) or [open an issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues).

[← Back to Guides](/guides) | [Next: Stock Management →](/guides/stock-management)

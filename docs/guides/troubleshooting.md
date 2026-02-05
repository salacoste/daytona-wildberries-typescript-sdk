---
title: Troubleshooting Guide
description: Quick solutions for common SDK issues - authentication, rate limits, network errors, validation, and error code reference
layout: doc
---

# Troubleshooting Guide

Quick solutions for common Wildberries SDK issues. This guide helps you diagnose and resolve problems quickly without waiting for support.

---

## Table of Contents

- [Quick Diagnosis](#quick-diagnosis)
- [Method Reference](#method-reference) ⭐ **Quick lookup for all SDK methods**
- [Debug Mode](#debug-mode)
- [Authentication Issues](#authentication-issues)
- [Rate Limit Issues](#rate-limit-issues)
- [Network Issues](#network-issues)
- [Validation Issues](#validation-issues)
- [General Issues](#general-issues)
- [Error Code Reference](#error-code-reference)
- [Troubleshooting Flowchart](#troubleshooting-flowchart)
- [Getting Help](#getting-help)

---

## Quick Diagnosis

**Having issues? Start here:**

1. **Can't authenticate?** → Jump to [Authentication Issues](#authentication-issues)
2. **Getting rate limited?** → Jump to [Rate Limit Issues](#rate-limit-issues)
3. **Network errors?** → Jump to [Network Issues](#network-issues)
4. **Data validation errors?** → Jump to [Validation Issues](#validation-issues)
5. **Something else?** → Jump to [General Issues](#general-issues)

**Most Common Issues:**
- [Invalid API key](#issue-1-authentication-failed)
- [Rate limit exceeded](#issue-6-429-too-many-requests)
- [Connection timeout](#issue-11-etimedout)
- [Validation error](#issue-13-validation-error)
- [**getCardsList() validation errors**](#issue-13a-createcardslist-validation-errors--common-issue)
- [Module not found](#issue-17-module-not-found)

---

## Method Reference

Quick lookup table for common operations and their actual SDK methods. Copy these exact method names to avoid `TypeError: method is not a function` errors.

**✅ Verified Against**: SDK v2.7.0 | **Last Updated**: 2026-02-03 | **Validation**: All methods cross-checked against actual implementation (Analytics v3 migration applied)

### Products & Catalog

> **📖 For detailed guide on product cards, see [Working with Product Cards](/guides/working-with-product-cards)**

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| List product cards | `sdk.products.getCardsList({ settings })` | **Main method** - Returns cards with cursor pagination |
| Create new product | `sdk.products.createCardsUpload(data[])` | Accepts array of product cards |
| Update product | `sdk.products.createCardsUpdate(data[])` | Accepts array of updates |
| Delete to trash | `sdk.products.createDeleteTrash({ nmIDs })` | Moves products to trash |
| Recover from trash | `sdk.products.createCardsRecover({ nmIDs })` | Restores products from trash |
| Get parent categories | `sdk.products.getParentAll({ locale? })` | Top-level categories like "Electronics" |
| Get subcategories | `sdk.products.getObjectAll({ parentID })` | Categories within parent |
| Get category attributes | `sdk.products.getObjectCharc(subjectId)` | Required/optional fields |
| Upload media file | `sdk.products.createMediaFile()` | Initiate media upload |
| Save media | `sdk.products.createMediaSave({ nmId, data })` | Save uploaded media |
| Get stock | `sdk.products.getStocks(warehouseId, { skus })` | Get stock for SKUs |
| Update stock | `sdk.products.updateStock(warehouseId, { stocks })` | Update stock levels |
| Delete stock | `sdk.products.deleteStock(warehouseId, { skus })` | Remove stock entries |
| Get warehouses | `sdk.products.warehouses()` | List seller warehouses |
| Get offices | `sdk.products.offices()` | List available offices |
| Get cards limits | `sdk.products.getCardsLimits()` | Check card creation limits |
| Generate barcodes | `sdk.products.createContentBarcode({ count })` | Generate new barcodes |

### Orders (FBS - Fulfillment by Seller)

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Get new orders | `sdk.ordersFBS.getOrdersNew()` | Orders awaiting processing |
| List all orders | `sdk.ordersFBS.orders({ limit, next, dateFrom?, dateTo? })` | Paginated with date filters |
| Get order statuses | `sdk.ordersFBS.getOrderStatuses({ orders: number[] })` | Batch status check |
| Cancel order | `sdk.ordersFBS.updateOrdersCancel(orderId)` | Cancel before shipment |
| Get reshipment orders | `sdk.ordersFBS.getOrdersReshipment()` | Orders for reshipment |
| Create supply | `sdk.ordersFBS.createSupply({ name })` | Start new shipment |
| Get supplies | `sdk.ordersFBS.supplies({ limit, next })` | List all supplies |
| Get supply | `sdk.ordersFBS.getSupply(supplyId)` | Get supply details |
| Delete supply | `sdk.ordersFBS.deleteSupply(supplyId)` | Delete supply |
| Add orders to supply | `sdk.ordersFBS.addOrdersToSupply(supplyId, { orders })` | Bulk add orders to supply |
| Get supply order IDs | `sdk.ordersFBS.getSupplyOrderIds(supplyId)` | Order IDs in a supply |
| Deliver supply | `sdk.ordersFBS.updateSuppliesDeliver(supplyId)` | Mark as shipped |
| Get order stickers | `sdk.ordersFBS.createOrdersSticker({ type, width, height }, { orders })` | Print labels |
| Get supply barcode | `sdk.ordersFBS.getSuppliesBarcode(supplyId, { type })` | Supply barcode |
| Get bulk metadata | `sdk.ordersFBS.getOrdersMetaBulk({ orders })` | Metadata for multiple orders |
| Get passes | `sdk.ordersFBS.passes()` | List passes |
| Create pass | `sdk.ordersFBS.createPass(data)` | Create delivery pass |
| Get supply orders | `sdk.ordersFBS.getSuppliesOrder(supplyId)` | **@deprecated** Use `getSupplyOrderIds()` |
| Add order to supply | `sdk.ordersFBS.updateSuppliesOrder(supplyId, orderId)` | **@deprecated** Use `addOrdersToSupply()` |

### Finances

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Get account balance | `sdk.finances.getAccountBalance()` | Current balance |
| Get report by period | `sdk.finances.getSupplierReportdetailbyperiod({ dateFrom, dateTo, limit?, rrdid?, period? })` | Detailed report |
| Get document categories | `sdk.finances.getDocumentsCategories({ locale? })` | List document categories |
| List documents | `sdk.finances.getDocumentsList({ locale?, beginTime?, endTime?, ... })` | Invoices, reports |
| Download document | `sdk.finances.getDocumentsDownload({ serviceName, extension })` | Get PDF/Excel |
| Download all docs | `sdk.finances.createDownloadAll(data)` | Bulk download |

### Analytics

> **v2.7.0 Migration Note**: The Sales Funnel methods below use the v3 API. The old v2 methods (`createNmReportDetail`, `createDetailHistory`, `createGroupedHistory`) still work as deprecated wrappers but will be removed in a future version. See the [Analytics v3 Migration Guide](./migration-v2.7-analytics-v3.md) for details.

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Get sales funnel products | `sdk.analytics.getSalesFunnelProducts(data)` | **v3** - Replaces `createNmReportDetail()`. Product metrics with `selectedPeriod`, `nmIds`, `limit`/`offset` pagination |
| Get product history | `sdk.analytics.getSalesFunnelProductsHistory(data)` | **v3** - Replaces `createDetailHistory()`. Time-series data with `aggregationLevel` |
| Get grouped history | `sdk.analytics.getSalesFunnelGroupedHistory(data)` | **v3** - Replaces `createGroupedHistory()`. Grouped stats by subject/brand/tag |
| Get report downloads | `sdk.analytics.getNmReportDownloads({ filter? })` | List available reports |
| Create report download | `sdk.analytics.createNmReportDownload(data)` | Async report generation |
| Retry report download | `sdk.analytics.createDownloadsRetry(data)` | Retry failed download |
| Get download file | `sdk.analytics.getDownloadsFile(downloadId)` | Get completed report |
| Search report | `sdk.analytics.createSearchReportReport(data)` | Search analytics |
| Create table group | `sdk.analytics.createTableGroup(data)` | Grouped table data |
| Create table detail | `sdk.analytics.createTableDetail(data)` | Detailed table data |
| Product search texts | `sdk.analytics.createProductSearchText(data)` | Product search queries |
| Product orders | `sdk.analytics.createProductOrder(data)` | Product order analytics |

### Reports

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Get inbound shipments | `sdk.reports.getSupplierIncomes({ dateFrom })` | Goods received by WB |
| Get stock levels | `sdk.reports.getSupplierStocks({ dateFrom })` | Current inventory |
| Get orders report | `sdk.reports.getSupplierOrders({ dateFrom, flag? })` | All orders |
| Get sales report | `sdk.reports.getSupplierSales({ dateFrom, flag? })` | Completed sales |
| Create warehouse report | `sdk.reports.warehouseRemains({ locale?, groupByBrand?, ... })` | Async generation |
| Check report status | `sdk.reports.getTasksStatu(taskId)` | Poll for completion |
| Download report | `sdk.reports.getTasksDownload(taskId)` | Get completed report |
| Paid storage report | `sdk.reports.paidStorage({ dateFrom, dateTo })` | Create paid storage report |
| Check paid storage status | `sdk.reports.getTasksStatu3(taskId)` | Check paid storage report |
| Download paid storage | `sdk.reports.getTasksDownload3(taskId)` | Download paid storage report |
| Acceptance report | `sdk.reports.acceptanceReport({ dateFrom, dateTo })` | Acceptance report |
| Region sale | `sdk.reports.getAnalyticsRegionSale({ dateFrom, dateTo })` | Regional sales |

### Communications

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Get seller chats | `sdk.communications.getSellerChats()` | Customer conversations |
| Get chat events | `sdk.communications.getSellerEvents({ next? })` | Messages in chat |
| Send message | `sdk.communications.createSellerMessage()` | Reply to customer |
| Get questions | `sdk.communications.questions({ isAnswered, take, skip, ... })` | Product Q&A list |
| Get single question | `sdk.communications.question({ id })` | Single question details |
| Update question | `sdk.communications.updateQuestion(data)` | Answer/view question |
| Get feedbacks | `sdk.communications.feedbacks({ isAnswered, take, skip, ... })` | Customer reviews |
| Create feedback answer | `sdk.communications.createFeedbacksAnswer({ id, text })` | Reply to review |
| Update feedback answer | `sdk.communications.updateFeedbacksAnswer({ id, text })` | Edit reply |
| Get feedback valuations | `sdk.communications.supplierValuations()` | Rating categories |
| Get questions count | `sdk.communications.getQuestionsCount({ dateFrom?, dateTo?, isAnswered? })` | Question statistics |
| Get unanswered count | `sdk.communications.getQuestionsCountUnanswered()` | Unanswered questions |
| Check new feedback/questions | `sdk.communications.newFeedbacksQuestions()` | Check for new items |
| Templates | `sdk.communications.templates({ templateType })` | Get response templates |
| Create template | `sdk.communications.createTemplate({ name, templateType, text })` | New template |

### Promotion

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Get promotion count | `sdk.promotion.getPromotionCount()` | Active campaigns summary |
| Create ad campaign | `sdk.promotion.createPromotionAdvert(data)` | New ad campaign |
| Get auction adverts | `sdk.promotion.getAuctionAdverts({ type? })` | Auction campaigns |
| Get adv balance | `sdk.promotion.getAdvBalance()` | Advertising balance |
| Get adv budget | `sdk.promotion.getAdvBudget(advertId)` | Campaign budget |
| Deposit budget | `sdk.promotion.createAdvBudgetDeposit(advertId, data)` | Add funds to campaign |
| Pause advert | `sdk.promotion.getAdvAdvertStoppar(advertId)` | Pause campaign |
| Start advert | `sdk.promotion.getAdvAdvertStart(advertId)` | Resume campaign |
| Get full stats | `sdk.promotion.createFullstat(data)` | Full statistics |
| Get full stats by subject | `sdk.promotion.createFullstatBySubjects(data)` | Stats by subject |
| Get campaign words | `sdk.promotion.getAdvWords(advertId)` | Campaign keywords |
| Update campaign words | `sdk.promotion.createAdvWords(advertId, data)` | Set keywords |

### Tariffs

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Get commission rates | `sdk.tariffs.getTariffsCommission({ locale? })` | Category commissions |
| Get box tariffs | `sdk.tariffs.getTariffsBox({ date })` | Box storage fees |
| Get pallet tariffs | `sdk.tariffs.getTariffsPallet({ date })` | Pallet storage fees |
| Get return tariffs | `sdk.tariffs.getTariffsReturn({ date })` | Return handling fees |

### General

| Operation | Actual SDK Method | Notes |
|-----------|-------------------|-------|
| Test connection | `sdk.general.ping()` | Verify API connectivity |
| Get news | `sdk.general.news({ from?, fromID? })` | Seller portal updates |
| Get seller info | `sdk.general.sellerInfo()` | Account information |

### Common Patterns

```typescript
// ✅ CORRECT - Use actual method names
const cards = await sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } });
const orders = await sdk.ordersFBS.orders({ limit: 100, next: 0, dateFrom: timestamp });
const balance = await sdk.finances.getAccountBalance();
const report = await sdk.analytics.getSalesFunnelProducts({ ... }); // v3 (recommended)
// or: sdk.analytics.createNmReportDetail({ ... }); // v2 deprecated wrapper (still works)

// ❌ WRONG - These methods DO NOT exist
const products = await sdk.products.listProducts();     // TypeError: listProducts is not a function
const orders = await sdk.ordersFBS.getOrders();         // TypeError: getOrders is not a function
const balance = await sdk.finances.getBalance();        // TypeError: getBalance is not a function
const created = await sdk.products.createProduct(data); // TypeError: createProduct is not a function
```

---

## Debug Mode

### Enable Debug Logging

To see detailed SDK operations, enable debug mode:

```typescript
import { WildberriesSDK } from '@daytona/wildberries-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: 'debug'  // 'debug' | 'info' | 'warn' | 'error'
});
```

### Log Levels

| Level | When to Use | What You'll See |
|-------|------------|-----------------|
| `debug` | Development/troubleshooting | All SDK operations, requests, responses |
| `info` | Normal operation | Important events, successful operations |
| `warn` | Production | Warnings, retries, recoverable errors |
| `error` | Production | Errors only |

### Debug Output Example

```
[2024-10-27T10:30:45.123Z] [DEBUG] API call started: GET /content/v2/object/parent/all
[2024-10-27T10:30:45.124Z] [DEBUG] Request headers: {
  "Authorization": "Bearer ey***",
  "Content-Type": "application/json",
  "User-Agent": "wildberries-sdk/1.0.0"
}
[2024-10-27T10:30:45.368Z] [DEBUG] Response status: 200
[2024-10-27T10:30:45.368Z] [DEBUG] Response time: 245ms
[2024-10-27T10:30:45.369Z] [INFO] Successfully fetched parent categories
```

### Enable Request/Response Logging

For even more detail, enable full request/response logging:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: 'debug',
  logRequests: true,   // Log full request bodies
  logResponses: true   // Log full response bodies
});
```

⚠️ **Warning:** Never enable request/response logging in production - logs may contain sensitive data.

### Debugging Workflow

1. **Enable Debug Mode** - Start with `logLevel: 'debug'`
2. **Reproduce Issue** - Run the problematic code
3. **Analyze Logs** - Look for errors, timeouts, unexpected responses
4. **Check Error Code** - See [Error Code Reference](#error-code-reference)
5. **Apply Solution** - Follow the troubleshooting steps below

---

## Authentication Issues

Authentication problems are the most common SDK issues. These occur when the API key is invalid, missing, or incorrectly configured.

### Issue 1: Authentication Failed

**Error Message:**
```
AuthenticationError: Invalid API key
    at AuthManager.validate (auth-manager.ts:45)
    at WildberriesSDK.constructor (index.ts:28)
```

**Cause:** API key is invalid, expired, or incorrectly formatted.

**What Went Wrong:**
- API key not set in environment
- API key contains extra whitespace or quotes
- API key was revoked in Wildberries dashboard
- Wrong API key for the environment

**Solution:**

1. **Verify API key is set:**
   ```bash
   echo $WB_API_KEY
   # Should output a 64-character string
   ```

2. **Check key format:**
   ```typescript
   // ❌ WRONG - Extra quotes or whitespace
   const sdk = new WildberriesSDK({ apiKey: ' eyJhbG... ' });

   // ✅ CORRECT - Clean API key
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });
   ```

3. **Verify key is active:**
   - Log into [Wildberries Seller Portal](https://seller.wildberries.ru)
   - Navigate to Settings → API Keys
   - Verify the key status is "Active"
   - Check key permissions match your needs

4. **Test key validity:**
   ```typescript
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     logLevel: 'debug'
   });

   // Test with ping endpoint
   try {
     await sdk.general.ping();
     console.log('✅ API key is valid');
   } catch (error) {
     console.error('❌ API key is invalid:', error.message);
   }
   ```

**How to Prevent:**
- Store API keys in environment variables
- Never commit API keys to version control
- Add `.env` to `.gitignore`
- Rotate keys regularly (every 90 days)
- Use different keys for dev/staging/prod

---

### Issue 2: 401 Unauthorized

**Error Message:**
```
AuthenticationError: 401 Unauthorized - Missing or invalid authorization header
```

**Cause:** Authorization header not sent with request.

**What Went Wrong:**
- API key not provided during SDK initialization
- API key was undefined or null
- Using SDK before initialization completed

**Solution:**

```typescript
// ❌ WRONG - API key is undefined
const sdk = new WildberriesSDK({
  apiKey: process.env.WRONG_VAR_NAME  // Returns undefined
});

// ✅ CORRECT - Verify key exists
const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  throw new Error('WB_API_KEY environment variable is required');
}

const sdk = new WildberriesSDK({ apiKey });
```

**How to Prevent:**
- Always validate API key before SDK initialization
- Use TypeScript non-null assertion (`!`) only when certain
- Add runtime checks in production code

---

### Issue 3: API Key Not Found

**Error Message:**
```
Error: WB_API_KEY environment variable is not set
```

**Cause:** Environment variable not loaded or named incorrectly.

**What Went Wrong:**
- `.env` file not in project root
- `dotenv` not configured correctly
- Wrong variable name in `.env` file
- Environment variables not loaded in production

**Solution:**

1. **Create `.env` file in project root:**
   ```bash
   # .env
   WB_API_KEY=your_64_character_api_key_here
   ```

2. **Load environment variables:**
   ```typescript
   import dotenv from 'dotenv';
   dotenv.config();

   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });
   ```

3. **Production deployment:**
   ```bash
   # Set environment variable in production
   export WB_API_KEY=your_api_key

   # Or use platform-specific configuration
   # Vercel: vercel env add WB_API_KEY
   # Heroku: heroku config:set WB_API_KEY=...
   # AWS: Configure in Systems Manager Parameter Store
   ```

**How to Prevent:**
- Document environment variables in README
- Use `.env.example` file as template
- Validate required environment variables at startup
- Use secrets management in production

---

### Issue 4: Permission Denied

**Error Message:**
```
AuthenticationError: 403 Forbidden - Insufficient permissions for this operation
```

**Cause:** API key doesn't have required permissions for the operation.

**What Went Wrong:**
- API key created with limited permissions
- Trying to access restricted endpoints
- Key permissions changed in Wildberries dashboard

**Solution:**

1. **Check required permissions:**

   | Operation | Required Permission |
   |-----------|-------------------|
   | Read products | `products:read` |
   | Create/update products | `products:write` |
   | Read orders | `orders:read` |
   | Update order status | `orders:write` |
   | Read finances | `finances:read` |
   | Read analytics | `analytics:read` |

2. **Update API key permissions:**
   - Log into Wildberries Seller Portal
   - Navigate to Settings → API Keys
   - Click on your API key
   - Enable required permissions
   - Save changes

3. **Create new key with full permissions:**
   ```typescript
   // If updating permissions doesn't work, create new key
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY_FULL!  // New key with all permissions
   });
   ```

**How to Prevent:**
- Create API keys with appropriate permissions from the start
- Document required permissions in code
- Use different keys for different operations
- Review permissions before deployment

---

### Issue 5: Token Expired

**Error Message:**
```
AuthenticationError: 401 Unauthorized - Token has expired
```

**Cause:** API key has expired and needs renewal.

**What Went Wrong:**
- API keys have expiration dates
- Key not rotated before expiration
- Automatic renewal failed

**Solution:**

1. **Check key expiration:**
   - Log into Wildberries Seller Portal
   - Navigate to Settings → API Keys
   - Check "Expires" column

2. **Generate new key:**
   ```bash
   # Update environment variable with new key
   export WB_API_KEY=new_api_key

   # Or update .env file
   echo "WB_API_KEY=new_api_key" > .env
   ```

3. **Implement key rotation:**
   ```typescript
   // Monitor key expiration
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     onAuthError: async (error) => {
       if (error.message.includes('expired')) {
         // Alert operations team
         console.error('⚠️ API key expired - rotation required');
         // Send notification
       }
     }
   });
   ```

**How to Prevent:**
- Set calendar reminders 30 days before expiration
- Implement automated key rotation
- Monitor key expiration in CI/CD
- Use keys with longer validity periods

---

## Rate Limit Issues

Rate limiting protects the API from abuse and ensures fair resource allocation. Understanding and handling rate limits correctly is crucial for production applications.

### Issue 6: 429 Too Many Requests

**Error Message:**
```
RateLimitError: Rate limit exceeded (3 requests per minute)
Retry after: 20000ms
```

**Cause:** Exceeded the per-endpoint rate limit.

**What Went Wrong:**
- Making requests too quickly
- Not respecting rate limit intervals
- Multiple instances of SDK making concurrent requests
- Insufficient delay between requests

**Solution:**

1. **SDK handles retry automatically:**
   ```typescript
   try {
     // SDK automatically waits and retries
     const result = await sdk.products.createCardsUpload(data);
     console.log('✅ Product created:', result);
   } catch (error) {
     if (error instanceof RateLimitError) {
       // This only happens after all retries exhausted
       console.log(`Rate limited. Retry after ${error.retryAfter}ms`);
     }
   }
   ```

2. **Check endpoint rate limits:**

   | Endpoint | Rate Limit | Interval |
   |----------|-----------|----------|
   | `products.create()` | 1 request | 10 seconds |
   | `products.list()` | 3 requests | 1 minute |
   | `orders.list()` | 5 requests | 1 minute |
   | `analytics.getSales()` | 5 requests | 1 minute |
   | `reports.generate()` | 1 request | 2 minutes |

3. **Implement request batching:**
   ```typescript
   // ❌ WRONG - Sequential requests hit rate limit
   for (const product of products) {
     await sdk.products.createCardsUpload(product);  // Rate limited!
   }

   // ✅ CORRECT - Batch with delays between requests
   import { chunk } from 'lodash';

   const batches = chunk(products, 10);  // Small batches to respect rate limits
   for (const batch of batches) {
     // Process batch with delays
     for (const product of batch) {
       await sdk.products.createCardsUpload(product);
       await sleep(10000);  // Wait 10s between products (rate limit: 1 per 10s)
     }
     // Optional: longer delay between batches
     await sleep(60000);  // 1 minute between batches
   }
   ```

   **Note**: The SDK doesn't have a `createBatch()` method. Products must be created individually with proper delays to respect rate limits.

4. **Use request queue:**
   ```typescript
   import { Queue } from 'bullmq';

   const queue = new Queue('wildberries-api');

   // Add requests to queue
   for (const product of products) {
     await queue.add('create-product', product, {
       rateLimiter: { max: 1, duration: 10000 }  // 1 per 10s
     });
   }
   ```

**How to Prevent:**
- Review rate limits in [Performance Guide](./performance-tuning.md)
- Implement request batching for bulk operations
- Use queues for background processing
- Monitor rate limit usage
- Consider upgrading to higher tier if consistently hitting limits

---

### Issue 7: Quota Exceeded

**Error Message:**
```
RateLimitError: Daily quota exceeded (10,000 requests per day)
Reset at: 2024-10-28T00:00:00Z
```

**Cause:** Exceeded daily or monthly API quota.

**What Went Wrong:**
- Too many requests in the billing period
- Unexpected spike in traffic
- Inefficient API usage patterns
- Development/testing consuming production quota

**Solution:**

1. **Monitor your API usage:**
   ```typescript
   // Note: The SDK doesn't have a getQuotaStatus() method
   // Monitor your usage by tracking requests in your application

   let requestCount = 0;
   const dailyLimit = 10000;

   async function trackRequest<T>(operation: () => Promise<T>): Promise<T> {
     if (requestCount >= dailyLimit) {
       throw new Error(`Daily quota exceeded (${dailyLimit} requests/day). Reset at midnight UTC.`);
     }
     requestCount++;
     return await operation();
   }

   // Use wrapper for all API calls
   const products = await trackRequest(() => sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } }));
   ```

2. **Optimize API usage:**
   ```typescript
   // ❌ WRONG - Polling every second
   setInterval(async () => {
     const result = await sdk.ordersFBS.orders({ limit: 100, next: 0 });  // 86,400 requests/day!
   }, 1000);

   // ✅ CORRECT - Poll less frequently
   setInterval(async () => {
     const result = await sdk.ordersFBS.orders({ limit: 100, next: 0 });
   }, 60000);  // Every minute = 1,440 requests/day
   ```

3. **Implement caching:**
   ```typescript
   import NodeCache from 'node-cache';

   const cache = new NodeCache({ stdTTL: 300 });  // 5 minute cache

   async function getCategoriesWithCache() {
     const cached = cache.get('categories');
     if (cached) return cached;

     const categories = await sdk.products.getParentAll();
     cache.set('categories', categories);
     return categories;
   }
   ```

4. **Upgrade quota:**
   - Contact Wildberries support to increase quota
   - Consider enterprise tier for unlimited requests
   - Use separate accounts for dev/staging/production

**How to Prevent:**
- Monitor quota usage daily
- Set alerts at 80% quota usage
- Use caching aggressively
- Optimize queries (pagination, filters)
- Use webhooks instead of polling where available

---

### Issue 8: Request Throttled

**Error Message:**
```
RateLimitError: Too many concurrent requests (max: 10)
```

**Cause:** Exceeded maximum concurrent connections.

**What Went Wrong:**
- Making too many parallel requests
- Not limiting concurrency in code
- Multiple workers accessing API simultaneously

**Solution:**

1. **Limit concurrency:**
   ```typescript
   import pLimit from 'p-limit';

   const limit = pLimit(10);  // Max 10 concurrent requests

   const promises = products.map(product =>
     limit(() => sdk.products.createCardsUpload(product))
   );

   const results = await Promise.all(promises);
   ```

2. **Use worker pool:**
   ```typescript
   import { Worker } from 'worker_threads';

   const pool = new Pool({
     max: 5,  // Max 5 workers
     create: () => new Worker('./api-worker.js')
   });

   for (const product of products) {
     await pool.run(product);  // Automatically queued
   }
   ```

3. **Configure SDK concurrency:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     maxConcurrentRequests: 10  // Limit concurrent requests
   });
   ```

**How to Prevent:**
- Always limit concurrency in parallel operations
- Use connection pooling
- Monitor active connections
- Coordinate between multiple service instances

---

### Issue 9: Rate Limit Unclear

**Error Message:** *(No error - just confusion about limits)*

**Cause:** Uncertainty about what the rate limits are for specific endpoints.

**What Went Wrong:**
- Rate limits not clearly documented
- Different limits per endpoint
- Limits change based on account tier

**Solution:**

1. **Check rate limits programmatically:**
   ```typescript
   const rateLimits = sdk.getRateLimits();
   console.log('Products.create:', rateLimits['products.create']);
   // Output: { limit: 1, interval: '10s', burst: 1 }
   ```

2. **Review documentation:**
   - See [Performance Tuning Guide](./performance-tuning.md#rate-limits)
   - Check [API Reference](../api/modules.md)
   - Review Wildberries API documentation

3. **Test rate limits:**
   ```typescript
   // Test to discover actual rate limit
   let requestCount = 0;
   const startTime = Date.now();

   try {
     while (true) {
       await sdk.products.getCardsList({ settings: { cursor: { limit: 1 } } });
       requestCount++;
       console.log(`Request ${requestCount} succeeded`);
     }
   } catch (error) {
     if (error instanceof RateLimitError) {
       const elapsed = Date.now() - startTime;
       console.log(`Rate limit: ${requestCount} requests in ${elapsed}ms`);
     }
   }
   ```

**How to Prevent:**
- Review rate limits before implementation
- Document limits in code comments
- Set up monitoring for rate limit hits
- Test thoroughly in development environment

---

## Network Issues

Network problems occur between your application and the Wildberries API servers. These can be caused by connectivity issues, DNS problems, firewall rules, or SSL certificate errors.

### Issue 10: ECONNREFUSED

**Error Message:**
```
NetworkError: connect ECONNREFUSED 185.12.34.56:443
```

**Cause:** Connection to API server refused.

**What Went Wrong:**
- API server is down
- Incorrect base URL configured
- Firewall blocking outbound connections
- Network connectivity issues

**Solution:**

1. **Check API status:**
   ```bash
   # Test connectivity
   curl -I https://content-api.wildberries.ru/ping

   # Check DNS resolution
   nslookup content-api.wildberries.ru
   ```

2. **Verify SDK configuration:**
   ```typescript
   // ❌ WRONG - Incorrect base URL
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     baseUrls: {
       products: 'https://wrong-api.wildberries.ru'  // Typo!
     }
   });

   // ✅ CORRECT - Use default URLs or verify custom URLs
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
     // Uses correct default URLs
   });
   ```

3. **Check firewall rules:**
   ```bash
   # Allow outbound HTTPS
   sudo ufw allow out 443/tcp

   # Check iptables
   sudo iptables -L OUTPUT
   ```

4. **Test from different network:**
   ```bash
   # Test from command line
   curl https://content-api.wildberries.ru/ping

   # If this works but SDK doesn't, problem is in application
   # If this fails, problem is network/firewall
   ```

**How to Prevent:**
- Monitor API availability
- Implement health checks
- Configure alerts for connection failures
- Use retry logic (SDK does this automatically)
- Document network requirements

---

### Issue 11: ETIMEDOUT

**Error Message:**
```
NetworkError: Request timeout after 30000ms
```

**Cause:** Request took longer than configured timeout.

**What Went Wrong:**
- Slow network connection
- API server overloaded
- Large response payload
- Timeout configured too short

**Solution:**

1. **Increase timeout:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     timeout: 60000  // 60 seconds (default: 30s)
   });
   ```

2. **Implement retry with backoff:**
   ```typescript
   // SDK handles this automatically
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     retryConfig: {
       maxRetries: 3,
       retryDelay: 1000,
       exponentialBackoff: true
     }
   });
   ```

3. **Optimize request size:**
   ```typescript
   // ❌ WRONG - Fetching too much data at once
   const result = await sdk.ordersFBS.orders({ limit: 1000, next: 0 });

   // ✅ CORRECT - Paginate results using cursor
   let nextCursor = 0;

   do {
     const result = await sdk.ordersFBS.orders({
       limit: 100,
       next: nextCursor
     });

     processOrders(result.orders ?? []);
     nextCursor = result.next ?? 0;
   } while (nextCursor > 0);
   ```

4. **Check network latency:**
   ```bash
   # Measure latency
   ping content-api.wildberries.ru

   # Trace route
   traceroute content-api.wildberries.ru
   ```

**How to Prevent:**
- Use appropriate timeouts for operation type
- Implement pagination for large datasets
- Monitor response times
- Use CDN or regional endpoints if available
- Test under production network conditions

---

### Issue 12: SSL Certificate Error

**Error Message:**
```
NetworkError: SSL certificate verification failed
Error: unable to verify the first certificate
```

**Cause:** SSL/TLS certificate validation failed.

**What Went Wrong:**
- Self-signed certificate in development
- Corporate proxy intercepting HTTPS
- Outdated certificate store
- Wrong certificate configuration

**Solution:**

1. **Update CA certificates:**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install ca-certificates
   sudo update-ca-certificates

   # macOS
   brew install openssl
   ```

2. **Configure proxy certificates:**
   ```typescript
   import https from 'https';
   import fs from 'fs';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     httpsAgent: new https.Agent({
       ca: fs.readFileSync('./corporate-ca.crt')
     })
   });
   ```

3. **Disable certificate validation (dev only):**
   ```typescript
   // ⚠️ WARNING: NEVER use in production!
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     httpsAgent: new https.Agent({
       rejectUnauthorized: false  // DEV ONLY!
     })
   });
   ```

4. **Verify certificate:**
   ```bash
   # Check certificate
   openssl s_client -connect content-api.wildberries.ru:443 -showcerts
   ```

**How to Prevent:**
- Keep CA certificates updated
- Document proxy requirements
- Use proper certificates in all environments
- Never disable certificate validation in production

---

## Validation Issues

Validation errors occur when request data doesn't match API requirements. These are usually quick to fix once you understand what's wrong.

### Issue 13: Validation Error

**Error Message:**
```
ValidationError: Invalid request data
Field: brandName - Value is required
Field: categoryId - Must be a valid category ID
```

**Cause:** Request data doesn't meet API validation rules.

**What Went Wrong:**
- Missing required fields
- Invalid field values
- Incorrect data types
- Field constraints violated

**Solution:**

1. **Check field requirements:**
   ```typescript
   import { CreateProductRequest } from '@daytona/wildberries-sdk';

   // ❌ WRONG - Missing required fields
   const product: CreateProductRequest = {
     title: 'My Product'
     // Missing brandName, categoryId, etc.
   };

   // ✅ CORRECT - All required fields
   const product: CreateProductRequest = {
     brandName: 'My Brand',        // Required
     categoryId: 'electronics',     // Required
     title: 'Wireless Headphones',  // Required
     description: 'High quality...',
     characteristics: [
       { name: 'Color', value: 'Black' }
     ],
     pricing: {
       price: 5999,
       discount: 10
     }
   };
   ```

2. **Use TypeScript validation:**
   ```typescript
   // TypeScript catches missing fields at compile time
   const product = {
     title: 'My Product'
   };

   // TypeScript error: Property 'brandName' is missing
   await sdk.products.createCardsUpload(product);
   ```

3. **Add runtime validation:**
   ```typescript
   import Joi from 'joi';

   const productSchema = Joi.object({
     brandName: Joi.string().required().min(1).max(100),
     categoryId: Joi.string().required(),
     title: Joi.string().required().min(1).max(500),
     pricing: Joi.object({
       price: Joi.number().positive().required(),
       discount: Joi.number().min(0).max(99)
     })
   });

   const { error, value } = productSchema.validate(product);
   if (error) {
     console.error('Validation failed:', error.details);
     return;
   }

   await sdk.products.createCardsUpload(value);
   ```

4. **Review API documentation:**
   - See [API Reference](../api/classes/ProductsModule.md)
   - Check field requirements in type definitions
   - Review examples in [Best Practices](./best-practices.md)

**How to Prevent:**
- Use TypeScript for compile-time validation
- Add runtime validation for user input
- Review API docs before implementation
- Test with various input combinations
- Use schema validation libraries

---

### Issue 13a: getCardsList() Validation Errors - COMMON ISSUE

> **For complete troubleshooting guide, see [Working with Product Cards](/guides/working-with-product-cards#troubleshooting)**

**Error Message:**
```
ValidationError: Validation failed
```

**Cause:** Incorrect request structure for `getCardsList()` method.

**What Went Wrong:**

This is **the most common mistake** with `getCardsList()`:

❌ **Mistake 1: Empty cursor fields in first request**
```typescript
// ❌ WRONG - Causes validation error
await sdk.products.getCardsList({
  settings: {
    cursor: {
      limit: 100,
      updatedAt: "",  // Empty string causes validation error!
      nmID: 0         // Zero causes validation error!
    }
  }
});
```

❌ **Mistake 2: Missing `settings` wrapper**
```typescript
// ❌ WRONG - Missing settings wrapper
await sdk.products.getCardsList({
  cursor: { limit: 100 },
  filter: { withPhoto: -1 }
});
```

❌ **Mistake 3: Limit exceeds maximum**
```typescript
// ❌ WRONG - Max limit is 100
await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 5000 }
  }
});
```

**Solution:**

**For FIRST request:**
```typescript
// ✅ CORRECT - Only include limit
const response = await sdk.products.getCardsList({
  settings: {
    cursor: {
      limit: 100  // ONLY limit, omit updatedAt and nmID
    },
    filter: {
      withPhoto: -1  // -1 = all cards
    }
  }
});
```

**For PAGINATION requests:**
```typescript
// ✅ CORRECT - Copy cursor from previous response
const nextResponse = await sdk.products.getCardsList({
  settings: {
    cursor: {
      limit: 100,
      updatedAt: response.cursor.updatedAt,  // From previous response
      nmID: response.cursor.nmID              // From previous response
    },
    filter: {
      withPhoto: -1
    }
  }
});
```

**Complete Working Example:**
```typescript
async function getAllCards() {
  const allCards = [];
  let cursor: any = { limit: 100 };  // Start with only limit

  while (true) {
    const response = await sdk.products.getCardsList({
      settings: {
        filter: { withPhoto: -1 },
        cursor
      }
    });

    if (response.cards) {
      allCards.push(...response.cards);
    }

    // Check if more data available
    if ((response.cards?.length ?? 0) < 100 || !response.cursor?.updatedAt) {
      break;
    }

    // Update cursor for next request
    cursor = {
      limit: 100,
      updatedAt: response.cursor.updatedAt,
      nmID: response.cursor.nmID
    };

    await new Promise(resolve => setTimeout(resolve, 650));
  }

  return allCards;
}
```

**How to Prevent:**
- ✅ First request: Only `limit` in cursor
- ✅ Pagination: Copy `updatedAt` and `nmID` from response
- ✅ Always wrap in `settings` object
- ✅ Use `limit: 100` (max 1000)
- ✅ See [Complete Guide](/guides/working-with-product-cards) for all details

---

### Issue 14: Missing Required Field

**Error Message:**
```
ValidationError: Missing required field 'brandName'
```

**Cause:** Required field not provided in request.

**What Went Wrong:**
- Forgot to include required field
- Field name typo
- Field is null or undefined
- Wrong field name used

**Solution:**

```typescript
// ❌ WRONG - Missing brandName
await sdk.products.createCardsUpload({
  title: 'Product',
  categoryId: 'electronics'
  // brandName missing!
});

// ✅ CORRECT - All required fields present
await sdk.products.createCardsUpload({
  brandName: 'TechCorp',  // Required
  title: 'Product',
  categoryId: 'electronics'
});

// ✅ BETTER - Validate before API call
const product = {
  brandName: data.brand,
  title: data.title,
  categoryId: data.category
};

// Check required fields
if (!product.brandName) {
  throw new Error('Brand name is required');
}

await sdk.products.createCardsUpload(product);
```

**How to Prevent:**
- Use TypeScript interfaces
- Validate data before API calls
- Use form validation in UI
- Add JSDoc comments with required fields

---

### Issue 15: Invalid Format

**Error Message:**
```
ValidationError: Invalid format for field 'price'
Expected: number, Received: string
```

**Cause:** Field value doesn't match expected format or type.

**What Went Wrong:**
- String instead of number
- Number instead of string
- Invalid date format
- Wrong enum value

**Solution:**

```typescript
// ❌ WRONG - Incorrect types
await sdk.products.createCardsUpload({
  brandName: 'TechCorp',
  categoryId: 'electronics',
  title: 'Product',
  pricing: {
    price: '5999',      // String instead of number
    discount: '10'      // String instead of number
  }
});

// ✅ CORRECT - Proper types
await sdk.products.createCardsUpload({
  brandName: 'TechCorp',
  categoryId: 'electronics',
  title: 'Product',
  pricing: {
    price: 5999,        // Number
    discount: 10        // Number
  }
});

// ✅ BETTER - Parse and validate
const product = {
  brandName: 'TechCorp',
  categoryId: 'electronics',
  title: 'Product',
  pricing: {
    price: parseInt(formData.price, 10),      // Parse string to number
    discount: parseFloat(formData.discount)   // Parse string to float
  }
};

// Validate parsed values
if (isNaN(product.pricing.price)) {
  throw new Error('Invalid price');
}

await sdk.products.createCardsUpload(product);
```

**Common Format Requirements:**

| Field | Format | Example |
|-------|--------|---------|
| Price | Number (kopeks) | `5999` (59.99 RUB) |
| Date | ISO 8601 | `"2024-10-27T10:30:00Z"` |
| Phone | E.164 | `"+79991234567"` |
| Email | RFC 5322 | `"user@example.com"` |
| URL | Valid URL | `"https://example.com"` |

**How to Prevent:**
- Use TypeScript types
- Parse user input to correct types
- Validate formats before API calls
- Use libraries like `date-fns`, `validator.js`

---

### Issue 16: Schema Mismatch

**Error Message:**
```
ValidationError: Response doesn't match expected schema
Expected property 'items' to be array, got undefined
```

**Cause:** API response structure changed or doesn't match SDK types.

**What Went Wrong:**
- API version mismatch
- SDK version outdated
- Unexpected API changes
- Response format changed

**Solution:**

1. **Check SDK version:**
   ```bash
   # Check installed version
   npm list @daytona/wildberries-sdk

   # Update to latest
   npm update @daytona/wildberries-sdk
   ```

2. **Verify API version:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     apiVersion: 'v2'  // Specify API version
   });
   ```

3. **Handle schema mismatches:**
   ```typescript
   try {
     const result = await sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } });

     // Defensive programming - check structure
     if (!result.data || !Array.isArray(result.data)) {
       console.error('Unexpected response structure:', result);
       throw new Error('Invalid response format');
     }

     return result.data;
   } catch (error) {
     console.error('Schema mismatch:', error);
     // Fallback behavior
   }
   ```

4. **Report to SDK maintainers:**
   - Open GitHub issue with response example
   - Include SDK version and API endpoint
   - Provide minimal reproduction case

**How to Prevent:**
- Pin SDK version in package.json
- Test schema changes in staging
- Monitor SDK releases for breaking changes
- Use defensive programming patterns

---

## General Issues

General issues that don't fit other categories but are still commonly encountered.

### Issue 17: Module Not Found

**Error Message:**
```
Error: Cannot find module '@daytona/wildberries-sdk'
```

**Cause:** SDK not installed or incorrect import path.

**What Went Wrong:**
- SDK not installed via npm
- Typo in package name
- Wrong import path
- Node modules not updated

**Solution:**

1. **Install SDK:**
   ```bash
   npm install @daytona/wildberries-sdk
   ```

2. **Verify installation:**
   ```bash
   npm list @daytona/wildberries-sdk
   ```

3. **Check import path:**
   ```typescript
   // ❌ WRONG
   import { WildberriesSDK } from 'wildberries-sdk';  // Missing @daytona
   import { WildberriesSDK } from '@daytona/wb-sdk';  // Wrong name

   // ✅ CORRECT
   import { WildberriesSDK } from '@daytona/wildberries-sdk';
   ```

4. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

**How to Prevent:**
- Add SDK to package.json dependencies
- Use exact import paths
- Run `npm install` after cloning repository
- Document installation in README

---

### Issue 18: TypeError

**Error Message:**
```
TypeError: sdk.products.createCardsUpload is not a function
```

**Cause:** Incorrect SDK usage or method doesn't exist.

**What Went Wrong:**
- Method name typo
- Using SDK before initialization
- Method removed in SDK version
- Destructuring error

**Solution:**

1. **Check method name:**
   ```typescript
   // ❌ WRONG - Typo
   await sdk.products.creatCardsUpload(data);  // Missing 'e'

   // ✅ CORRECT
   await sdk.products.createCardsUpload(data);
   ```

2. **Verify SDK initialization:**
   ```typescript
   // ❌ WRONG - Using before initialization
   const result = await sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } });
   const sdk = new WildberriesSDK({ apiKey: '...' });

   // ✅ CORRECT - Initialize first
   const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
   const result = await sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } });
   ```

3. **Check method exists:**
   ```typescript
   // ❌ WRONG - Method doesn't exist
   await sdk.products.archiveProduct(id);  // archiveProduct doesn't exist

   // ✅ CORRECT - Use actual method
   await sdk.products.deleteProduct([id]);  // deleteProduct exists (takes array)
   ```

4. **Use TypeScript for autocomplete:**
   ```typescript
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });

   // TypeScript provides autocomplete
   await sdk.products.  // Shows available methods
   ```

**How to Prevent:**
- Use TypeScript for type checking
- Review API reference documentation
- Use IDE autocomplete
- Write tests for SDK usage

---

### Issue 19: Empty Response

**Error Message:** *(No error - just empty data)*

**Cause:** API returned no data for the request.

**What Went Wrong:**
- No data exists for query
- Incorrect filters applied
- Wrong pagination parameters
- Data archived or deleted

**Solution:**

1. **Check filters:**
   ```typescript
   // ❌ WRONG - Too narrow date range
   const result = await sdk.ordersFBS.orders({
     limit: 100,
     next: 0,
     dateFrom: 1698364800,  // Single day
     dateTo: 1698451200
   });
   console.log(result.orders);  // [] - No orders in this time range

   // ✅ CORRECT - Broader date range (Unix timestamps)
   const result = await sdk.ordersFBS.orders({
     limit: 100,
     next: 0,
     dateFrom: 1696118400,  // Whole month
     dateTo: 1698796800
   });
   ```

2. **Check pagination:**
   ```typescript
   // ✅ CORRECT - Use cursor-based pagination
   const firstPage = await sdk.ordersFBS.orders({ limit: 100, next: 0 });
   console.log('Orders:', firstPage.orders?.length);

   if ((firstPage.next ?? 0) > 0) {
     const nextPage = await sdk.ordersFBS.orders({ limit: 100, next: firstPage.next! });
   }
   ```

3. **Verify data exists:**
   ```typescript
   // Check if data exists in dashboard
   const all = await sdk.products.getCardsList({ settings: { cursor: { limit: 1 } } });
   if (all.data.length === 0) {
     console.log('No products exist - create some first');
   }
   ```

**How to Prevent:**
- Handle empty results gracefully
- Provide user feedback
- Check total count before pagination
- Validate filters make sense

---

### Issue 20: Unexpected Behavior

**Error Message:** *(No error - just wrong behavior)*

**Cause:** SDK not working as expected or documented.

**What Went Wrong:**
- Misunderstanding of SDK behavior
- Documentation incorrect or outdated
- Edge case not handled
- Bug in SDK

**Solution:**

1. **Enable debug mode:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     logLevel: 'debug',
     logRequests: true,
     logResponses: true
   });

   // See exactly what SDK is doing
   await sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } });
   ```

2. **Review documentation:**
   - Check [API Reference](../api/modules.md)
   - Review [Best Practices](./best-practices.md)
   - Read [Examples](../../examples/)

3. **Check SDK version:**
   ```bash
   npm list @daytona/wildberries-sdk
   # Update if outdated
   npm update @daytona/wildberries-sdk
   ```

4. **Create minimal reproduction:**
   ```typescript
   // Isolate the issue
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });

   // Minimal code showing unexpected behavior
   const result = await sdk.products.getCardsList({ settings: { cursor: { limit: 10 } } });
   console.log('Expected: 10 items');
   console.log('Received:', result.data.length);
   ```

5. **Report issue:**
   - Open [GitHub Issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
   - Include reproduction code
   - Provide SDK version, Node version
   - Include debug logs

**How to Prevent:**
- Read documentation thoroughly
- Test edge cases
- Use latest SDK version
- Report bugs to help others

---

## Error Code Reference

Quick reference for all error codes returned by the API.

### HTTP Status Codes

| Code | Error | Category | Retry? | Solution |
|------|-------|----------|--------|----------|
| 200 | OK | Success | N/A | Request succeeded |
| 201 | Created | Success | N/A | Resource created |
| 400 | Bad Request | Validation | No | Fix request data |
| 401 | Unauthorized | Auth | No | Check API key |
| 403 | Forbidden | Auth | No | Check permissions |
| 404 | Not Found | Validation | No | Check resource ID |
| 422 | Unprocessable Entity | Validation | No | Fix request format |
| 429 | Too Many Requests | Rate Limit | Yes | SDK auto-retries |
| 500 | Internal Server Error | Server | Yes | SDK auto-retries |
| 502 | Bad Gateway | Server | Yes | SDK auto-retries |
| 503 | Service Unavailable | Server | Yes | SDK auto-retries |
| 504 | Gateway Timeout | Server | Yes | SDK auto-retries |

### SDK Error Classes

| Error Class | When Thrown | Properties | Recovery |
|-------------|------------|------------|----------|
| `AuthenticationError` | 401, 403, invalid key | `statusCode`, `message` | Check API key, verify permissions |
| `RateLimitError` | 429, quota exceeded | `retryAfter`, `quotaReset` | Wait for retry, SDK handles automatically |
| `ValidationError` | 400, 422, invalid data | `fieldErrors`, `statusCode` | Fix request data per field errors |
| `NetworkError` | Timeouts, 5xx, connection errors | `cause`, `isTimeout` | Check network, SDK auto-retries |
| `WBAPIError` | All other errors | `statusCode`, `response` | Check error message and documentation |

### Common Error Patterns

#### Pattern 1: Authentication Failed
```typescript
try {
  await sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Auth failed:', error.message);
    // Check: API key valid? Permissions correct? Key not expired?
  }
}
```

#### Pattern 2: Rate Limit Exceeded
```typescript
try {
  await sdk.products.createCardsUpload(data);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter}ms`);
    // SDK automatically retries - this only fires after all retries exhausted
  }
}
```

#### Pattern 3: Validation Error
```typescript
try {
  await sdk.products.createCardsUpload(data);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:');
    for (const [field, message] of Object.entries(error.fieldErrors)) {
      console.error(`  - ${field}: ${message}`);
    }
    // Fix the specific fields mentioned in error.fieldErrors
  }
}
```

#### Pattern 4: Network Error
```typescript
try {
  await sdk.ordersFBS.orders({ limit: 100, next: 0 });
} catch (error) {
  if (error instanceof NetworkError) {
    if (error.isTimeout) {
      console.error('Request timed out');
      // Increase timeout or optimize query
    } else {
      console.error('Network error:', error.message);
      // Check connectivity, firewall, DNS
    }
  }
}
```

---

## Troubleshooting Flowchart

Quick decision tree for diagnosing common issues.

```
┌─────────────────────────────────────┐
│ Having an issue with the SDK?       │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Step 1: Enable Debug Mode           │
│ logLevel: 'debug'                   │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Step 2: Check Error Code            │
└─────────────────┬───────────────────┘
                  │
          ┌───────┴───────┐
          │               │
    Is it 401?      Is it 429?
          │               │
          YES             YES
          │               │
          ▼               ▼
┌──────────────────┐ ┌──────────────────┐
│ Authentication   │ │ Rate Limit       │
│ Issues           │ │ Issues           │
│ - Check API key  │ │ - Wait for retry │
│ - Verify perms   │ │ - Implement      │
│ - Test with ping │ │   batching       │
└──────────────────┘ └──────────────────┘
          │
          NO
          │
          ▼
┌─────────────────────────────────────┐
│ Is it 400 or 422?                   │
└─────────────────┬───────────────────┘
                  │
                  YES
                  │
                  ▼
┌─────────────────────────────────────┐
│ Validation Issues                   │
│ - Check required fields             │
│ - Verify data types                 │
│ - Review field constraints          │
└─────────────────┬───────────────────┘
                  │
                  NO
                  │
                  ▼
┌─────────────────────────────────────┐
│ Is it ETIMEDOUT or ECONNREFUSED?    │
└─────────────────┬───────────────────┘
                  │
                  YES
                  │
                  ▼
┌─────────────────────────────────────┐
│ Network Issues                      │
│ - Check connectivity                │
│ - Test DNS resolution               │
│ - Verify firewall rules             │
│ - Check SSL certificates            │
└─────────────────┬───────────────────┘
                  │
                  NO
                  │
                  ▼
┌─────────────────────────────────────┐
│ Is it a TypeError or Module Error?  │
└─────────────────┬───────────────────┘
                  │
                  YES
                  │
                  ▼
┌─────────────────────────────────────┐
│ General Issues                      │
│ - Check SDK installation            │
│ - Verify import paths               │
│ - Review method names               │
│ - Check TypeScript types            │
└─────────────────┬───────────────────┘
                  │
                  NO
                  │
                  ▼
┌─────────────────────────────────────┐
│ Step 3: Search Documentation        │
│ - Check API Reference               │
│ - Review Best Practices             │
│ - Read Examples                     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Step 4: Still stuck?                │
│ - Search GitHub Issues              │
│ - Check FAQ                         │
│ - Post in Discussions               │
│ - Contact Support                   │
└─────────────────────────────────────┘
```

### Quick Diagnostic Checklist

Before diving deep into troubleshooting:

- [ ] **Enable debug mode** - Set `logLevel: 'debug'`
- [ ] **Check API key** - Verify it's set and valid
- [ ] **Review error message** - Read the full error stack trace
- [ ] **Check status code** - See [Error Code Reference](#error-code-reference)
- [ ] **Test connectivity** - Can you reach the API?
- [ ] **Verify SDK version** - Is it up to date?
- [ ] **Check Node version** - Node 18+ required
- [ ] **Review request data** - Is it valid?
- [ ] **Check rate limits** - Are you within limits?
- [ ] **Search issues** - Has someone else had this problem?

---

## Getting Help

If you can't resolve your issue using this guide:

### 1. Search Existing Resources

- **GitHub Issues**: [Search closed and open issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- **FAQ**: Check [Frequently Asked Questions](../FAQ.md)
- **API Reference**: Review [API documentation](../api/modules.md)
- **Examples**: Look at [working examples](../../examples/)

### 2. Ask the Community

- **GitHub Discussions**: [Ask questions and share knowledge](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)
- **Stack Overflow**: Tag questions with `wildberries-sdk`

### 3. Report a Bug

If you've found a bug, [open a GitHub issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues/new).

**Include in your report:**

```typescript
// 1. SDK Version
import { version } from '@daytona/wildberries-sdk';
console.log('SDK version:', version);  // e.g., 1.0.0

// 2. Node.js Version
console.log('Node version:', process.version);  // e.g., v20.11.1

// 3. Error Message
console.error('Error:', error.message);
console.error('Stack:', error.stack);

// 4. Minimal Reproduction Code
const sdk = new WildberriesSDK({
  apiKey: 'test',  // Don't share real key!
  logLevel: 'debug'
});

try {
  await sdk.products.getCardsList({ settings: { cursor: { limit: 100 } } });
} catch (error) {
  console.error('Error occurred:', error);
}

// 5. Debug Logs (with sensitive data removed)
```

### 4. Contact Support

For urgent issues or enterprise support:

- **Email**: support@daytona.com
- **Response Time**:
  - Critical issues: <24 hours
  - High priority: <48 hours
  - Normal priority: <5 business days

### What Makes a Good Bug Report

✅ **Good Report:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- SDK and Node versions
- Minimal code example
- Debug logs (sanitized)
- Environment details

❌ **Bad Report:**
- "It doesn't work"
- No code example
- No error message
- No version information
- Full application code dump
- Secrets/API keys included

---

## Next Steps

- Review [Best Practices Guide](./best-practices.md) to avoid common issues
- Check [Performance Tuning Guide](./performance-tuning.md) for optimization
- Read [API Reference](../api/modules.md) for detailed documentation
- Explore [Examples](../../examples/) for working code samples

---

**Last Updated**: 2024-10-27
**Document Version**: 1.0
**SDK Version**: 1.0.0

For the latest version of this guide, visit [GitHub repository](https://github.com/salacoste/daytona-wildberries-typescript-sdk).

# Orders FBS Module

The **Orders FBS (Fulfillment by Seller)** module provides comprehensive order management for sellers who process and ship orders from their own warehouses to Wildberries offices. This module handles the complete FBS workflow: order retrieval, supply management, shipping label generation, metadata attachment, and warehouse pass management.

---

## Overview

**Module Name**: `ordersFBS`
**Source**: Generated from `wildberries_api_doc/03-orders-fbs.yaml`
**Base URL**: `https://marketplace-api.wildberries.ru`
**Total Methods**: 39 methods across 7 functional areas

### FBS vs FBW

| Feature | FBS (Fulfillment by Seller) | FBW (Fulfillment by Wildberries) |
|---------|----------------------------|----------------------------------|
| Stock Location | Seller's warehouse | Wildberries warehouse |
| Order Processing | Seller packs & ships | WB handles logistics |
| Shipping Labels | Seller generates | Not applicable |
| Delivery Target | WB pickup points/offices | Direct from WB |
| Module | `sdk.ordersFBS` | `sdk.ordersFBW` |

---

## Installation and Setup

### Accessing the Module

The Orders FBS module is automatically available when you initialize the SDK:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});

// Access the Orders FBS module
const ordersFBS = sdk.ordersFBS;
```

### Required Permissions

Ensure your API key has the following permissions enabled:
- Order management (read/write)
- Supply management (read/write)
- Sticker generation (read)
- Metadata management (read/write)

---

## Methods Reference

### Orders (6 methods)

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getOrdersNew()` | Get all new orders awaiting processing | 300 req/min |
| `orders(options?)` | Get orders with pagination and date filters | 300 req/min |
| `getOrderStatuses(data)` | Get statuses for multiple orders (bulk) | 300 req/min |
| `updateOrdersCancel(orderId)` | Cancel an order | 100 req/min |
| `getOrdersReshipment()` | Get orders requiring reshipment | 300 req/min |
| `createOrdersStatu(data)` | **@deprecated** Use `getOrderStatuses()` | 300 req/min |

### Supplies (10 methods)

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `createSupply(data)` | Create a new supply | 300 req/min |
| `supplies(options?)` | List supplies with pagination | 300 req/min |
| `getSupply(supplyId)` | Get supply details | 300 req/min |
| `deleteSupply(supplyId)` | Delete an empty supply | 300 req/min |
| `updateSuppliesDeliver(supplyId)` | Transfer supply to delivery (validates metadata, see below) | 300 req/min |
| `getSuppliesBarcode(supplyId, options?)` | Get supply QR code | 300 req/min |
| `addOrdersToSupply(supplyId, data)` | Add multiple orders to supply (bulk) | 300 req/min |
| `getSupplyOrderIds(supplyId)` | Get order IDs in a supply | 300 req/min |
| `updateSuppliesOrder(supplyId, orderId)` | **@deprecated** Use `addOrdersToSupply()` | 1000 req/min |
| `getSuppliesOrder(supplyId)` | **@deprecated** Use `getSupplyOrderIds()` | 300 req/min |

### Passes (5 methods)

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getPassesOffices()` | List warehouses requiring passes | 300 req/min |
| `passes()` | List seller passes | 300 req/min |
| `createPass(data)` | Create a seller pass | 1 req/10min |
| `updatePass(passId, data)` | Update a seller pass | 300 req/min |
| `deletePass(passId)` | Delete a seller pass | 300 req/min |

### Metadata (8 methods)

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getOrdersMetaBulk(data)` | Get metadata for multiple orders (bulk) | 1000 req/min |
| `deleteOrdersMeta(orderId, options?)` | Delete order metadata by key | 300 req/min |
| `updateMetaSgtin(orderId, data)` | Attach SGTIN marking codes | 1000 req/min |
| `updateMetaUin(orderId, data)` | Attach UIN code | 1000 req/min |
| `updateMetaImei(orderId, data)` | Attach IMEI code | 1000 req/min |
| `updateMetaGtin(orderId, data)` | Attach GTIN code | 1000 req/min |
| `updateMetaExpiration(orderId, data)` | Set expiration date | 1000 req/min |
| `setCustomsDeclaration(orderId, data)` | Set customs declaration number | 1000 req/min |
| `getOrdersMeta(orderId)` | **@deprecated** Use `getOrdersMetaBulk()` | 300 req/min |

### Stickers (3 methods)

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `createOrdersSticker(options?, data?)` | Generate order stickers (SVG/PNG/ZPL) | 300 req/min |
| `createStickersCrossBorder(data?)` | Get cross-border stickers (PDF) | 300 req/min |
| `createOrdersExternalSticker(data?)` | **@deprecated** Will be removed | 10 req/min |

### Cross-Border (2 methods)

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `createStatusHistory(data?)` | Get cross-border status history | 300 req/min |
| `createOrdersClient(data)` | Get client info for Turkey cross-border | 300 req/min |

### Transport Boxes - TRBX (4 methods)

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getSuppliesTrbx(supplyId)` | List boxes in a supply | 300 req/min |
| `createSuppliesTrbx(supplyId, data?)` | Create boxes for a supply | 300 req/min |
| `deleteSuppliesTrbx(supplyId, data?)` | Delete boxes from a supply | 300 req/min |
| `createTrbxSticker(supplyId, options?, data?)` | Get box stickers | 300 req/min |

---

## What's New (v3.5.0)

### MetaDetail type and metaDetails field

The legacy `meta` object on `OrderMetaResponse`, `OrderMetaItem`, and `OrderMetaAPI` is now **deprecated** (removal date: **April 30, 2026**). It is replaced by the `metaDetails` array, which carries richer validation data.

```typescript
/** Metadata detail item with validation status */
interface MetaDetail {
  /** Metadata type: imei, uin, sgtin, gtin, expiration, customsDeclaration */
  key: string;
  /** Metadata value (empty string if not filled) */
  value: string;
  /** Validation decision: 'filled' | 'optional' | 'required' | 'invalid' */
  decision: string;
}
```

Both `OrderMetaResponse` (single-order) and `OrderMetaItem` / `OrderMetaAPI` (bulk) now include:

| Field | Type | Notes |
|-------|------|-------|
| `meta` | `Meta` | **@deprecated** -- will be removed April 30, 2026. Use `metaDetails` instead. |
| `metaDetails` | `MetaDetail[]` | New field with key/value/decision per metadata entry. |

### updateSuppliesDeliver() -- 409 metadata validation

Starting in spring 2026, `updateSuppliesDeliver()` returns **409 Conflict** when order metadata fails validation. The enforcement dates are:

| Metadata type | Enforcement date |
|---------------|-----------------|
| IMEI | March 31, 2026 |
| UIN | April 7, 2026 |
| Marking codes (B2B orders) | April 9, 2026 |

Always inspect `metaDetails` via `getOrdersMetaBulk()` before calling deliver. Any `MetaDetail` with `decision === 'required'` and an empty `value` will cause a 409.

### Supply.isB2b field

Since **March 19, 2026**, supplies track whether they contain B2B orders via the `isB2b` boolean field:

```typescript
interface Supply {
  // ... existing fields ...
  /** Whether this supply contains B2B orders.
   * Once the first order is added, the supply inherits its B2B flag.
   * Mixing B2B and non-B2B orders in one supply is rejected since March 19, 2026. */
  isB2b?: boolean;
}
```

Create separate supplies for B2B and non-B2B orders.

### CrossBorderStickerItem.status field

Cross-border sticker responses now include a `status` field (effective **April 1, 2026**):

```typescript
interface CrossBorderStickerItem {
  file?: string;
  orderId?: number;
  parcelId?: string;
  /** Sticker generation status. Stickers may generate with delay -- poll until 'ready'. */
  status?: 'awaitingTrackNumber' | 'ready';
}
```

When `status` is `'awaitingTrackNumber'`, poll the endpoint until it transitions to `'ready'`.

---

## Usage Examples

### Getting New Orders and Checking Status

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function processOrders() {
  // 1. Get all new orders awaiting processing
  const { orders: newOrders } = await sdk.ordersFBS.getOrdersNew();
  console.log(`Found ${newOrders?.length ?? 0} new orders`);

  if (!newOrders?.length) return;

  // 2. Display order details
  for (const order of newOrders) {
    console.log(`Order ${order.id}:`);
    console.log(`  Article: ${order.article}`);
    console.log(`  NM ID: ${order.nmId}`);
    console.log(`  Price: ${(order.price ?? 0) / 100} RUB`);
    console.log(`  Cargo Type: ${order.cargoType}`);
    console.log(`  Required Meta: ${order.requiredMeta?.join(', ') || 'None'}`);
    console.log(`  B2B: ${order.options?.isB2b ?? false}`);
  }

  // 3. Check statuses for these orders
  const orderIds = newOrders.map(o => o.id!);
  const statusResponse = await sdk.ordersFBS.getOrderStatuses({ orders: orderIds });

  statusResponse.orders?.forEach(status => {
    console.log(`Order ${status.id}: ${status.supplierStatus} / ${status.wbStatus}`);
  });
}
```

### Complete Supply Workflow (with metadata validation)

```typescript
import { WildberriesSDK } from 'wb-api-sdk';
import { writeFileSync } from 'fs';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function createAndProcessSupply() {
  // 1. Create a new supply
  const { id: supplyId } = await sdk.ordersFBS.createSupply({
    name: `Supply ${new Date().toISOString().split('T')[0]}`
  });
  console.log(`Created supply: ${supplyId}`);

  // 2. Get new orders
  const { orders: newOrders } = await sdk.ordersFBS.getOrdersNew();
  if (!newOrders?.length) {
    console.log('No new orders to process');
    await sdk.ordersFBS.deleteSupply(supplyId!);
    return;
  }

  // 3. Separate B2B and non-B2B orders (mixing is rejected since March 19, 2026)
  const b2bOrders = newOrders.filter(o => o.options?.isB2b);
  const regularOrders = newOrders.filter(o => !o.options?.isB2b);

  // Use regular orders for this supply (create a separate supply for B2B)
  const orderIds = regularOrders.slice(0, 10).map(o => o.id!);
  await sdk.ordersFBS.addOrdersToSupply(supplyId!, { orders: orderIds });
  console.log(`Added ${orderIds.length} orders to supply`);

  // 4. Validate metadata before deliver (prevents 409 errors)
  const metaResponse = await sdk.ordersFBS.getOrdersMetaBulk({ orders: orderIds });
  for (const orderMeta of metaResponse.orders ?? []) {
    const required = orderMeta.metaDetails?.filter(
      d => d.decision === 'required' && !d.value
    );
    if (required?.length) {
      console.log(`Order ${orderMeta.id} needs metadata: ${required.map(d => d.key).join(', ')}`);
      // Attach the required metadata before proceeding
      for (const meta of required) {
        if (meta.key === 'imei') {
          await sdk.ordersFBS.updateMetaImei(orderMeta.id!, { imei: '354567890123456' });
        }
        // ... handle other metadata types (uin, sgtin, gtin, etc.)
      }
    }
  }

  // 5. Generate shipping stickers (PNG format, 58x40mm)
  const stickersResponse = await sdk.ordersFBS.createOrdersSticker(
    { type: 'png', width: 58, height: 40 },
    { orders: orderIds }
  );

  // 6. Save stickers to files (base64 decoded)
  stickersResponse.stickers?.forEach(sticker => {
    const buffer = Buffer.from(sticker.file!, 'base64');
    writeFileSync(`sticker-${sticker.orderId}.png`, buffer);
    console.log(`Saved sticker for order ${sticker.orderId}`);
  });

  // 7. Deliver supply (changes status: confirm -> complete)
  await sdk.ordersFBS.updateSuppliesDeliver(supplyId!);
  console.log('Supply delivered');

  // 8. Get supply QR code (only available after delivery)
  const barcode = await sdk.ordersFBS.getSuppliesBarcode(supplyId!, { type: 'png' });
  const qrBuffer = Buffer.from(barcode.file!, 'base64');
  writeFileSync(`supply-${supplyId}.png`, qrBuffer);
  console.log(`Saved supply QR code: ${barcode.barcode}`);
}
```

### Checking metaDetails Before Deliver

```typescript
async function validateAndDeliver(supplyId: string, orderIds: number[]) {
  // Fetch metadata for all orders in the supply
  const metaResponse = await sdk.ordersFBS.getOrdersMetaBulk({ orders: orderIds });

  const blockers: { orderId: number; keys: string[] }[] = [];

  for (const order of metaResponse.orders ?? []) {
    const invalid = order.metaDetails?.filter(
      d => d.decision === 'required' && !d.value
    );
    if (invalid?.length) {
      blockers.push({ orderId: order.id!, keys: invalid.map(d => d.key) });
    }
  }

  if (blockers.length > 0) {
    console.log('Cannot deliver -- missing required metadata:');
    for (const b of blockers) {
      console.log(`  Order ${b.orderId}: ${b.keys.join(', ')}`);
    }
    return false;
  }

  // All metadata valid, proceed with delivery
  await sdk.ordersFBS.updateSuppliesDeliver(supplyId);
  console.log('Supply delivered successfully');
  return true;
}
```

### Attaching Metadata (IMEI, SGTIN)

```typescript
async function attachOrderMetadata(orderId: number) {
  // Check what metadata is required using metaDetails
  const metaResponse = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [orderId] });
  const orderMeta = metaResponse.orders?.find(o => o.id === orderId);

  // Use metaDetails (new) instead of meta (deprecated)
  console.log('Metadata details:', orderMeta?.metaDetails);
  // Example output: [{ key: 'imei', value: '', decision: 'required' }]

  // Attach IMEI for electronics
  await sdk.ordersFBS.updateMetaImei(orderId, {
    imei: '354567890123456'
  });

  // Attach SGTIN marking codes (for tracked products)
  await sdk.ordersFBS.updateMetaSgtin(orderId, {
    sgtins: ['01046009544741002']
  });

  // Set expiration date (for perishable goods)
  await sdk.ordersFBS.updateMetaExpiration(orderId, {
    expiration: '2025-12-31'
  });

  // Attach customs declaration (for cross-border)
  await sdk.ordersFBS.setCustomsDeclaration(orderId, {
    customsDeclaration: '10129050/010120/0001234'
  });

  console.log('Metadata attached successfully');
}
```

### Polling Cross-Border Stickers

```typescript
async function getCrossBorderStickers(orderIds: number[]) {
  let allReady = false;

  while (!allReady) {
    const response = await sdk.ordersFBS.createStickersCrossBorder({ orders: orderIds });
    const pending = response.stickers?.filter(s => s.status === 'awaitingTrackNumber');

    if (!pending?.length) {
      allReady = true;
      // All stickers are ready -- save them
      for (const sticker of response.stickers ?? []) {
        const buffer = Buffer.from(sticker.file!, 'base64');
        writeFileSync(`cross-border-${sticker.orderId}.pdf`, buffer);
      }
    } else {
      console.log(`Waiting for ${pending.length} stickers...`);
      await new Promise(r => setTimeout(r, 5000)); // poll every 5 seconds
    }
  }
}
```

### Managing Warehouse Passes

```typescript
async function manageWarehousePasses() {
  // 1. Get list of warehouses requiring passes
  const offices = await sdk.ordersFBS.getPassesOffices();
  console.log('Available offices:', offices);

  // 2. Create a pass for a driver
  const { id: passId } = await sdk.ordersFBS.createPass({
    firstName: 'Ivan',
    lastName: 'Petrov',
    carModel: 'GAZelle Next',
    carNumber: 'A123BC77',
    officeId: offices[0]?.id ?? 1
  });
  console.log(`Created pass: ${passId}`);

  // 3. List all passes
  const passes = await sdk.ordersFBS.passes();
  passes.forEach(pass => {
    console.log(`Pass ${pass.id}: ${pass.firstName} ${pass.lastName}`);
    console.log(`  Vehicle: ${pass.carModel} (${pass.carNumber})`);
    console.log(`  Office: ${pass.officeName}`);
    console.log(`  Expires: ${pass.dateEnd}`);
  });

  // 4. Update pass if needed
  await sdk.ordersFBS.updatePass(passId!, {
    firstName: 'Ivan',
    lastName: 'Petrov',
    carModel: 'GAZelle Next',
    carNumber: 'B456DE99',  // Updated car number
    officeId: offices[0]?.id ?? 1
  });

  // 5. Delete pass when no longer needed
  // await sdk.ordersFBS.deletePass(passId!);
}
```

### Paginated Order Retrieval

```typescript
async function getAllOrdersForPeriod(startDate: Date, endDate: Date) {
  const allOrders = [];
  let nextCursor = 0;

  // Convert dates to Unix timestamps
  const dateFrom = Math.floor(startDate.getTime() / 1000);
  const dateTo = Math.floor(endDate.getTime() / 1000);

  do {
    const response = await sdk.ordersFBS.orders({
      limit: 1000,
      next: nextCursor,
      dateFrom,
      dateTo
    });

    allOrders.push(...(response.orders ?? []));
    nextCursor = response.next ?? 0;

    console.log(`Fetched ${response.orders?.length} orders, total: ${allOrders.length}`);
  } while (nextCursor > 0);

  return allOrders;
}

// Usage: Get orders from last 7 days
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const orders = await getAllOrdersForPeriod(sevenDaysAgo, new Date());
```

### Managing Transport Boxes (TRBX)

```typescript
async function manageTransportBoxes(supplyId: string) {
  // 1. Create boxes for a supply (for PVZ deliveries)
  const { trbxIds } = await sdk.ordersFBS.createSuppliesTrbx(supplyId, { amount: 5 });
  console.log(`Created ${trbxIds?.length} boxes`);

  // 2. Get list of boxes
  const { trbxes } = await sdk.ordersFBS.getSuppliesTrbx(supplyId);
  console.log('Current boxes:', trbxes);

  // 3. Generate box stickers
  const boxStickers = await sdk.ordersFBS.createTrbxSticker(
    supplyId,
    { type: 'png' },
    { trbxIds: trbxIds ?? [] }
  );

  boxStickers.stickers?.forEach((sticker, index) => {
    const buffer = Buffer.from(sticker.file!, 'base64');
    writeFileSync(`box-${index + 1}.png`, buffer);
  });

  // 4. Delete unused boxes (only while supply is open)
  // await sdk.ordersFBS.deleteSuppliesTrbx(supplyId, { trbxIds: ['box-1'] });
}
```

---

## Types

### Key Entity Types

```typescript
// Order status types
type OrderSupplierStatus = 'new' | 'confirm' | 'complete' | 'cancel';

type OrderWbStatus =
  | 'waiting'
  | 'sorted'
  | 'sold'
  | 'canceled'
  | 'canceled_by_client'
  | 'declined_by_client'
  | 'defect'
  | 'ready_for_pickup'
  | 'postponed_delivery'
  | 'accepted_by_carrier'
  | 'sent_to_carrier';

// Cargo types
type CargoType = 1 | 2 | 3;  // 1=small, 2=oversized, 3=large

// Sticker format
type StickerType = 'svg' | 'zplv' | 'zplh' | 'png';

// Order entity
interface Order {
  id?: number;
  article?: string;
  rid?: string;
  nmId?: number;
  chrtId?: number;
  price?: number;
  cargoType?: CargoType;
  createdAt?: string;
  warehouseId?: number;
  supplyId?: string;
  address?: { fullAddress?: string; longitude?: number; latitude?: number };
  options?: { isB2b?: boolean };
  // ... additional fields
}

// New order (includes required metadata and B2B options)
interface OrderNew extends Order {
  requiredMeta?: string[];
  optionalMeta?: string[];
  salePrice?: number;
  finalPrice?: number;
  options?: { isB2b?: boolean };
}

// Supply entity
interface Supply {
  id?: string;
  name?: string;
  done?: boolean;
  createdAt?: string;
  closedAt?: string;
  cargoType?: 0 | 1 | 2 | 3;
  crossBorderType?: 0 | 1 | null;
  /** @since 3.5.0 -- B2B segregation enforced since March 19, 2026 */
  isB2b?: boolean;
}

// Metadata detail (replaces deprecated Meta)
interface MetaDetail {
  key: string;       // imei, uin, sgtin, gtin, expiration, customsDeclaration
  value: string;     // empty string if not filled
  decision: string;  // filled, optional, required, invalid
}

// Order metadata (deprecated -- use metaDetails instead)
interface Meta {
  imei?: { value?: string };
  uin?: { value?: string };
  gtin?: { value?: string };
  sgtin?: { value?: string[] };
  expiration?: { value?: string };
  customsDeclaration?: { value?: string };
}

// Cross-border sticker (with status)
interface CrossBorderStickerItem {
  file?: string;
  orderId?: number;
  parcelId?: string;
  /** @since 3.5.0 */
  status?: 'awaitingTrackNumber' | 'ready';
}

// Seller pass
interface Pass {
  id?: number;
  firstName?: string;
  lastName?: string;
  carModel?: string;
  carNumber?: string;
  officeId?: number;
  officeName?: string;
  officeAddress?: string;
  dateEnd?: string;
}
```

### Request/Response Types

```typescript
// Pagination parameters
interface GetOrdersParams {
  limit: number;      // 1-1000
  next: number;       // Pagination cursor, 0 for first page
  dateFrom?: number;  // Unix timestamp
  dateTo?: number;    // Unix timestamp
}

// Order status request
interface OrderStatusRequest {
  orders: number[];   // 1-1000 order IDs
}

// Sticker options
interface StickerParams {
  type: StickerType;
  width: 58 | 40;
  height: 40 | 30;
}

// Bulk metadata request
interface GetMetaMultiRequest {
  orders: number[];   // Max 100 order IDs
}

// Add orders to supply request
interface AddOrdersToSupplyRequest {
  orders: number[];
}

// Order metadata response (single)
interface OrderMetaResponse {
  meta?: Meta;              // @deprecated (removal April 30, 2026)
  metaDetails?: MetaDetail[];
}

// Order metadata item (bulk)
interface OrderMetaItem {
  id?: number;
  meta?: Meta;              // @deprecated (removal April 30, 2026)
  metaDetails?: MetaDetail[];
}
```

---

## Error Handling

### Common Errors

| HTTP Code | Error Type | Description | Resolution |
|-----------|------------|-------------|------------|
| 400 | `ValidationError` | Invalid request parameters | Check parameter values and constraints |
| 401/403 | `AuthenticationError` | Invalid or missing API key | Verify API key and permissions |
| 404 | `NotFoundError` | Resource not found | Verify order/supply ID exists |
| 409 | `ConflictError` | Operation conflict | Check status requirements (see below) |
| 429 | `RateLimitError` | Rate limit exceeded | Wait and retry (see rate limits) |

### 409 Conflict Scenarios

| Scenario | Cause | Resolution |
|----------|-------|------------|
| Cargo type mismatch | Adding order with different cargoType to supply | Create separate supply for different cargo types |
| B2B mismatch | Mixing B2B and non-B2B orders in one supply (since March 19, 2026) | Create separate supplies for B2B and non-B2B orders |
| Warehouse mismatch | Adding order from different warehouse | Group orders by warehouse |
| Supply has orders | Attempting to delete non-empty supply | Remove all orders first |
| IMEI not filled | Delivering supply with missing IMEI (since March 31, 2026) | Attach IMEI via `updateMetaImei()` |
| UIN not filled | Delivering supply with missing UIN (since April 7, 2026) | Attach UIN via `updateMetaUin()` |
| Marking code missing (B2B) | Delivering B2B supply without marking codes (since April 9, 2026) | Attach marking codes via `updateMetaSgtin()` |
| Invalid status transition | Canceling a completed order | Check order status before operation |
| Supply not delivered | Requesting QR code before delivery | Call `updateSuppliesDeliver()` first |

### Error Handling Example

```typescript
import {
  WBAPIError,
  RateLimitError,
  ValidationError
} from 'wb-api-sdk';

try {
  await sdk.ordersFBS.updateSuppliesDeliver(supplyId);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter}ms`);
    await sleep(error.retryAfter);
    // Retry the request
  } else if (error instanceof ValidationError) {
    console.log('Validation error:', error.message);
    // Check parameters
  } else if (error instanceof WBAPIError && error.statusCode === 409) {
    console.log('Conflict:', error.message);
    // Likely metadata validation failure -- check metaDetails
    const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: orderIds });
    for (const order of meta.orders ?? []) {
      const issues = order.metaDetails?.filter(
        d => d.decision === 'required' && !d.value
      );
      if (issues?.length) {
        console.log(`Order ${order.id} missing: ${issues.map(d => d.key).join(', ')}`);
      }
    }
  } else {
    throw error;
  }
}
```

---

## Rate Limits

### Rate Limit Tiers

| Tier | Limit | Interval | Burst | Endpoints |
|------|-------|----------|-------|-----------|
| **Standard FBS** | 300/min | 200ms | 20 | Most FBS endpoints (28 methods) |
| **Cancel Order** | 100/min | 600ms | 20 | `updateOrdersCancel` |
| **Meta Attachment** | 1000/min | 60ms | 20 | Metadata PUT methods (SGTIN, UIN, IMEI, etc.) |
| **Create Pass** | 1/10min | - | 1 | `createPass` |

### 409 Error Penalty

**Important**: When an operation returns a 409 (Conflict) error, it counts as **10 requests** against your rate limit quota instead of 1. This applies to all supply operations.

### Rate Limit Handling

```typescript
import { RateLimiter } from 'wb-api-sdk';

// The SDK handles rate limiting automatically
// But you can implement additional backoff for bulk operations

async function processOrdersBatched(orderIds: number[]) {
  const batchSize = 100;

  for (let i = 0; i < orderIds.length; i += batchSize) {
    const batch = orderIds.slice(i, i + batchSize);

    try {
      await sdk.ordersFBS.getOrderStatuses({ orders: batch });
    } catch (error) {
      if (error instanceof RateLimitError) {
        await sleep(error.retryAfter);
        i -= batchSize; // Retry this batch
      }
    }

    // Optional: add delay between batches to avoid rate limits
    await sleep(250);
  }
}
```

---

## Deprecated Methods

The following methods are deprecated and will be removed in future versions:

| Method | Replacement | Reason |
|--------|-------------|--------|
| `createOrdersStatu(data)` | `getOrderStatuses(data)` | Incorrect method name (typo) |
| `getOrdersMeta(orderId)` | `getOrdersMetaBulk(data)` | Single-order endpoint removed; use bulk |
| `updateSuppliesOrder(supplyId, orderId)` | `addOrdersToSupply(supplyId, data)` | Single-order endpoint removed; use bulk |
| `getSuppliesOrder(supplyId)` | `getSupplyOrderIds(supplyId)` | Endpoint changed; returns IDs only |
| `createOrdersExternalSticker(data)` | `createStickersCrossBorder(data)` | Endpoint removed by Wildberries |

### Deprecated Types

| Type | Replacement | Removal Date |
|------|-------------|--------------|
| `Meta` | `MetaDetail[]` (via `metaDetails` field) | April 30, 2026 |

### Migration Examples

```typescript
// createOrdersStatu() -> getOrderStatuses()
// BEFORE (deprecated)
const statuses = await sdk.ordersFBS.createOrdersStatu({ orders: [123, 456] });

// AFTER (recommended)
const statuses = await sdk.ordersFBS.getOrderStatuses({ orders: [123, 456] });
```

```typescript
// createOrdersExternalSticker() -> Note: endpoint removed by Wildberries
// This method now throws - use createStickersCrossBorder() for cross-border orders
// BEFORE (deprecated - no longer works)
const stickers = await sdk.ordersFBS.createOrdersExternalSticker({ orders: [123] });

// AFTER (recommended for cross-border)
const stickers = await sdk.ordersFBS.createStickersCrossBorder({ orders: [123] });
```

```typescript
// getOrdersMeta() -> getOrdersMetaBulk()
// BEFORE (deprecated)
const meta = await sdk.ordersFBS.getOrdersMeta(orderId);

// AFTER (recommended -- use metaDetails instead of meta)
const metaResponse = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [orderId] });
const details = metaResponse.orders?.find(o => o.id === orderId)?.metaDetails;
const imei = details?.find(d => d.key === 'imei');
```

```typescript
// updateSuppliesOrder() -> addOrdersToSupply()
// BEFORE (deprecated)
await sdk.ordersFBS.updateSuppliesOrder(supplyId, orderId);

// AFTER (recommended - bulk)
await sdk.ordersFBS.addOrdersToSupply(supplyId, { orders: [orderId] });
```

```typescript
// getSuppliesOrder() -> getSupplyOrderIds()
// BEFORE (deprecated)
const { orders } = await sdk.ordersFBS.getSuppliesOrder(supplyId);

// AFTER (recommended - returns IDs only)
const { orderIds } = await sdk.ordersFBS.getSupplyOrderIds(supplyId);
// Then fetch full order details if needed
const statuses = await sdk.ordersFBS.getOrderStatuses({ orders: orderIds ?? [] });
```

---

## Supply Workflow

### Status Transitions

```
Order Status Flow:
                    addOrdersToSupply()                  deliverSupply()
 +---------+  --------------------------->  +---------+  ---------------------->  +----------+
 |   new   |                                | confirm |                          | complete |
 +---------+                                +---------+                          +----------+
      |                                          |
      | updateOrdersCancel()                     | updateOrdersCancel()
      v                                          v
 +---------+                                +---------+
 | cancel  |  <---------------------------  | cancel  |
 +---------+                                +---------+
```

### Cargo Type Constraints

A supply can only contain orders of the **same cargo type**:
- **Type 1**: Small goods (MGT)
- **Type 2**: Oversized goods (SGT)
- **Type 3**: Large goods (KGT+)

The first order added to an empty supply determines its cargo type. Subsequent orders must match.

### B2B Segregation (since March 19, 2026)

A supply can only contain orders of the **same B2B status**. The first order added determines whether the supply is B2B or non-B2B. Attempting to mix B2B and non-B2B orders in one supply will return a 409 error. Check `order.options.isB2b` and `supply.isB2b` to route orders correctly.

### Complete Workflow Checklist

1. **Create supply** - `createSupply({ name: '...' })`
2. **Get new orders** - `getOrdersNew()`
3. **Group by cargo type and B2B status** - Filter orders by `cargoType` and `options.isB2b`
4. **Add orders to supply** - `addOrdersToSupply(supplyId, { orders: [...] })`
5. **Attach required metadata** - Check `metaDetails` for entries with `decision === 'required'`
6. **Validate all metadata** - Use `getOrdersMetaBulk()` to confirm no `required` entries have empty values
7. **Generate stickers** - `createOrdersSticker(options, { orders: [...] })`
8. **Print and attach stickers** to packages
9. **Deliver supply** - `updateSuppliesDeliver(supplyId)`
10. **Get QR code** - `getSuppliesBarcode(supplyId, { type: 'png' })`
11. **Print QR code** for warehouse scanning

---

## Related Resources

### EPICs

- [EPIC 22: Orders FBS URL Fixes](/docs/epics/EPIC_22_FBS_URL_FIXES.md) - Critical URL and endpoint fixes
- [EPIC 23: Orders FBS Type Safety](/docs/epics/EPIC_23_FBS_TYPE_SAFETY.md) - Type improvements and naming cleanup
- [EPIC 24: Orders FBS Rate Limits](/docs/epics/EPIC_24_FBS_RATE_LIMITS.md) - Rate limit configuration audit
- [EPIC 25: Orders FBS Testing](/docs/epics/EPIC_25_FBS_TESTING.md) - Test coverage improvements

### User Stories

- [Story 2.5: Order Retrieval and Status](/docs/stories/2.5.orders-fbs-retrieval-status.md)
- [Story 2.6: Shipping and Supply Management](/docs/stories/2.6.orders-fbs-shipping-supplies.md)

### API Documentation

- [Wildberries FBS API Reference](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS)
- [Wildberries FBS Supplies](https://openapi.wildberries.ru/#tag/Postavki-FBS)
- [Wildberries FBS Metadata](https://openapi.wildberries.ru/#tag/Metadannye-FBS)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 3.5.0 | 2026-03 | Added `MetaDetail` type and `metaDetails` field; deprecated `Meta` object (removal April 30, 2026); `updateSuppliesDeliver()` 409 metadata validation (IMEI March 31, UIN April 7, marking B2B April 9); `Supply.isB2b` field for B2B segregation (March 19); `CrossBorderStickerItem.status` field (April 1) |
| 2.8.0 | 2026-02 | Fixed broken endpoints (EPIC 22), added bulk methods |
| 2.7.0 | 2026-01 | Added `getOrdersMetaBulk`, `addOrdersToSupply`, `getSupplyOrderIds` |
| 2.0.0 | 2025-10 | Initial Orders FBS module with 34 methods |

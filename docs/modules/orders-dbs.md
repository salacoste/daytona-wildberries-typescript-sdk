# Orders DBS Module

The **Orders DBS (Delivery by Seller)** module manages orders where the seller handles delivery directly to the customer. It covers order lifecycle management, bulk status operations, metadata attachment, and delivery group info.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `ordersDBS` |
| **SDK Namespace** | `sdk.ordersDBS.*` |
| **Base URLs** | Production: `https://marketplace-api.wildberries.ru`; test-order creation only: `https://marketplace-api-sandbox.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/04-orders-dbs/` |
| **Methods** | 22 |
| **Authentication** | API Key (Header) |
| **409 Penalty** | 10x rate limit multiplier |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get new orders
const { orders } = await sdk.ordersDBS.getNewOrders();

// Get delivery dates
const dates = await sdk.ordersDBS.getDeliveryDates({ orders: [123, 456] });

// Bulk confirm orders
await sdk.ordersDBS.confirmBulk([123, 456]);

// Bulk set metadata
await sdk.ordersDBS.setImeiBulk({
  orders: [{ orderId: 123, imei: '123456789012345' }]
});
```

For sandbox test orders, create a separate SDK instance with a Test-scope token:

```typescript
const sandbox = new WildberriesSDK({
  apiKey: process.env.WB_TEST_TOKEN!,
  tokenType: 'test',
});

await sandbox.ordersDBS.createTestOrders({
  orders: [{ sku: '4600000000001', amount: 1 }],
  deliveryType: 'edbs',
});
```

`createTestOrders()` always uses the fixed sandbox host and returns `void` for
the documented 204 response. It accepts 1–10 orders and the visible
`deliveryType` values `dbs`, `dbsPickupPoint`, and `edbs`. Both `deliveryType`
and `address` are optional client properties based on the rendered badges and
documented defaults; omission is serialized unchanged. The public raw sandbox
schema and live default behavior were not exposed or tested, so this is an
evidence-based client interpretation rather than a claim about hidden
`nullable` flags or observed server-side defaulting.

---

## Methods Reference

### Sandbox Operation (1 method)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createTestOrders(request)` | POST | `https://marketplace-api-sandbox.wildberries.ru/api/v3/test/dbs/orders/make` | Create DBS, DBS-to-PVZ, or EDBS test orders; Test-scope token required |

### Core Operations (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getNewOrders()` | GET | `/api/v3/dbs/orders/new` | Get new DBS orders |
| `getOrders(params)` | GET | `/api/v3/dbs/orders` | Get orders with pagination |
| `getClientInfo(orderIds)` | POST | `/api/v3/dbs/orders/client` | Get customer contact info |
| `getB2BInfo(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/b2b/info` | Get B2B buyer info |

The official rendered schema allows the top-level `orders` value returned by `getClientInfo()` to be either an array or `null`. When an array is returned, entries may include `additionalPhones?: string[]` with direct additional contact numbers and `replacementAdditionalPhones?: string[]` with masked alternatives. The official rendered view did not expose raw optionality or nullability metadata for those two fields, so their field-level contract remains provisional pending raw-schema confirmation. Treat all client contact fields as personal data: use them only for the delivery workflow and do not log or persist response payloads.

### Info Endpoints (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getGroupsInfo(data)` | POST | `/api/v3/dbs/groups/info` | Get paid delivery group info |
| `getDeliveryDates(data)` | POST | `/api/v3/dbs/orders/delivery-date` | Get delivery dates for orders |
| `getOrdersFinalPrice(data)` | POST | `/api/marketplace/v3/dbs/orders/final-price` | Get seller prices and buyer-payable sums |

### Bulk Status Operations (6 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getStatusesBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/info` | Get statuses (bulk) |
| `confirmBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/confirm` | Confirm orders (bulk) |
| `deliverBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/deliver` | Mark delivered (bulk) |
| `receiveBulk(orders)` | POST | `/api/marketplace/v3/dbs/orders/status/receive` | Complete handover (bulk) |
| `rejectBulk(orders)` | POST | `/api/marketplace/v3/dbs/orders/status/reject` | Reject orders (bulk) |
| `cancelBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/cancel` | Cancel orders (bulk) |

### Bulk Metadata Operations (7 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getMetaBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/meta/info` | Get metadata (bulk) |
| `deleteMetaBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/meta/delete` | Delete metadata (bulk) |
| `setSgtinBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/meta/sgtin` | Set SGTIN codes (bulk) |
| `setUinBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/meta/uin` | Set UIN codes (bulk) |
| `setImeiBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/meta/imei` | Set IMEI codes (bulk) |
| `setGtinBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/meta/gtin` | Set GTIN codes (bulk) |
| `setCustomsDeclarationBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/meta/customs-declaration` | Set customs declarations (bulk) |

### Previously Deprecated Methods (13 methods, removed from source)

> These methods were deprecated and have been removed from the module source. The Wildberries API endpoints will stop working on **April 13, 2026**.

| Method | Replacement |
|--------|-------------|
| `getMeta(orderId)` | `getMetaBulk()` |
| `deleteMeta(orderId, key)` | `deleteMetaBulk()` |
| `setSgtin(orderId, sgtins)` | `setSgtinBulk()` |
| `setUin(orderId, uin)` | `setUinBulk()` |
| `setImei(orderId, imei)` | `setImeiBulk()` |
| `setGtin(orderId, gtin)` | `setGtinBulk()` |
| `setCustomsDeclaration(orderId, customsDeclaration)` | `setCustomsDeclarationBulk()` |
| `getStatuses(orderIds)` | `getStatusesBulk()` |
| `confirm(orderId)` | `confirmBulk()` |
| `deliver(orderId)` | `deliverBulk()` |
| `receive(orderId, code)` | `receiveBulk()` |
| `reject(orderId, code)` | `rejectBulk()` |
| `cancel(orderId)` | `cancelBulk()` |

---

## Final-Price Guidance (WB news 2026-09)

`getOrdersFinalPrice()` returns seller prices excluding discounts
(`originalPrice`/`convertedOriginalPrice`) and buyer-payable sums including all
discounts and cashback (`originalFinalPrice`/`convertedOriginalFinalPrice`).
All amounts are multiplied by 100.

- **Use `originalFinalPrice`/`convertedOriginalFinalPrice` for calculations.**
- Fall back to `finalPrice`/`convertedFinalPrice` from `getNewOrders()`/
  `getOrders()` only when this method returns `"data": null` for those order IDs.
- `"data": {}` (empty object) means the data is still being generated — retry
  later (max ~1 minute).
- Per-order errors: `404` NotFound, `400` StatusMismatch, `422`
  PriceNotCalculated (orders created before 23.07.2026).

---

## Rate Limits

All methods have a **10x penalty multiplier** on 409 Conflict responses.

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 Assembly Read | Core reads, info endpoints | 300 req/min | 200ms |
| T2 Status Write | Bulk status mutations | 60 req/min | 1s |
| T3 Meta Read/Delete | Bulk meta info/delete | 150 req/min | 400ms |
| T4 Meta Set | Bulk meta set (all types) | 500 req/min | 120ms |
| Sandbox | `createTestOrders` | 60 req/min | 1s, burst 1 |

The sandbox operation has no penalty multiplier and retains its documented
60 rpm limit for Basic/Test multiplier processing.

---

## Related Resources

- [API Reference: OrdersDbsModule](/api/classes/OrdersDbsModule)
- [DBS Getting Started Guide](/guides/orders-dbs-getting-started)
- [DBS Workflows](/guides/orders-dbs-workflows)
- [Migration: Legacy to Bulk](/guides/migration-dbs-legacy-to-bulk)

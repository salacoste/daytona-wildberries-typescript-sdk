# Orders DBS Module

The **Orders DBS (Delivery by Seller)** module manages orders where the seller handles delivery directly to the customer. It covers order lifecycle management, bulk status operations, metadata attachment, and delivery group info.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `ordersDBS` |
| **SDK Namespace** | `sdk.ordersDBS.*` |
| **Base URL** | `https://marketplace-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/04-orders-dbs/` |
| **Methods** | 32 (20 active + 12 deprecated) |
| **Authentication** | API Key (Header) |

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

---

## Methods Reference

### Core Operations (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getNewOrders()` | GET | `/api/v3/dbs/orders/new` | Get new DBS orders |
| `getOrders(params?)` | GET | `/api/v3/dbs/orders` | Get orders with pagination |
| `getClientInfo(data)` | POST | `/api/v3/dbs/orders/client` | Get customer contact info |
| `getB2BInfo(data)` | POST | `/api/marketplace/v3/dbs/orders/b2b/info` | Get B2B buyer info |

### Info Endpoints (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getGroupsInfo(data)` | POST | `/api/v3/dbs/groups/info` | Get paid delivery group info |
| `getDeliveryDates(data)` | POST | `/api/v3/dbs/orders/delivery-date` | Get delivery dates for orders |

### Bulk Status Operations (6 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getStatusesBulk(data)` | POST | `/api/marketplace/v3/dbs/orders/status/info` | Get statuses (bulk) |
| `confirmBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/confirm` | Confirm orders (bulk) |
| `deliverBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/deliver` | Mark delivered (bulk) |
| `receiveBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/receive` | Complete handover (bulk) |
| `rejectBulk(orderIds)` | POST | `/api/marketplace/v3/dbs/orders/status/reject` | Reject orders (bulk) |
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

### Deprecated Methods (13 methods)

> These methods will stop working on **April 13, 2026**. Use bulk replacements above.

| Method | Replacement |
|--------|-------------|
| `getMeta(orderId)` | `getMetaBulk()` |
| `deleteMeta(orderId, key)` | `deleteMetaBulk()` |
| `setSgtin(orderId, data)` | `setSgtinBulk()` |
| `setUin(orderId, data)` | `setUinBulk()` |
| `setImei(orderId, data)` | `setImeiBulk()` |
| `setGtin(orderId, data)` | `setGtinBulk()` |
| `setCustomsDeclaration(orderId, data)` | `setCustomsDeclarationBulk()` |
| `getStatuses(data)` | `getStatusesBulk()` |
| `confirm(orderId)` | `confirmBulk()` |
| `deliver(orderId)` | `deliverBulk()` |
| `receive(orderId)` | `receiveBulk()` |
| `reject(orderId)` | `rejectBulk()` |
| `cancel(orderId)` | `cancelBulk()` |

---

## Rate Limits

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 Assembly Read | Core reads, info endpoints | 300 req/min | 200ms |
| T2 Status Write | Bulk status mutations | 60 req/min | 1s |
| T3 Meta Read/Delete | Bulk meta info/delete | 150 req/min | 400ms |
| T4 Meta Set | Bulk meta set (all types) | 500 req/min | 120ms |

---

## Related Resources

- [API Reference: OrdersDbsModule](/api/classes/OrdersDbsModule)
- [DBS Getting Started Guide](/guides/orders-dbs-getting-started)
- [DBS Workflows](/guides/orders-dbs-workflows)
- [Migration: Legacy to Bulk](/guides/migration-dbs-legacy-to-bulk)

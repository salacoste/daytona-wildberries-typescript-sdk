# In-Store Pickup Module

The **In-Store Pickup** module manages click-and-collect orders where customers pick up purchases at the seller's physical location. It covers the complete pickup lifecycle: order confirmation, preparation, customer identity verification, and metadata attachment.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `inStorePickup` |
| **SDK Namespace** | `sdk.inStorePickup.*` |
| **Base URL** | `https://marketplace-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/06-in-store-pickup.yaml` |
| **Methods** | 19 |
| **Authentication** | API Key (Header) |
| **409 Penalty** | 10x rate limit multiplier |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get new pickup orders
const { orders } = await sdk.inStorePickup.getOrdersNew();

// Confirm an order
await sdk.inStorePickup.updateOrdersConfirm(orderId);

// Prepare for pickup
await sdk.inStorePickup.updateOrdersPrepare(orderId);

// Verify customer identity
const identity = await sdk.inStorePickup.createClientIdentity({ orderId, code: '1234' });
```

---

## Methods Reference

### Assembly Tasks (12 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getOrdersNew()` | GET | `/api/v3/click-collect/orders/new` | Get new pickup orders |
| `updateOrdersConfirm(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/confirm` | Confirm order for assembly |
| `updateOrdersPrepare(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/prepare` | Mark order as prepared |
| `updateOrdersReceive(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/receive` | Mark as received by customer |
| `updateOrdersReject(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/reject` | Reject order |
| `updateOrdersCancel(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/cancel` | Cancel order |
| `confirmBulk(orderIds)` | POST | `/api/marketplace/v3/click-collect/orders/status/confirm` | Confirm orders (bulk) |
| `prepareBulk(orderIds)` | POST | `/api/marketplace/v3/click-collect/orders/status/prepare` | Mark orders prepared (bulk) |
| `receiveBulk(orderIds)` | POST | `/api/marketplace/v3/click-collect/orders/status/receive` | Mark orders received (bulk) |
| `rejectBulk(orderIds)` | POST | `/api/marketplace/v3/click-collect/orders/status/reject` | Reject orders (bulk) |
| `cancelBulk(orderIds)` | POST | `/api/marketplace/v3/click-collect/orders/status/cancel` | Cancel orders (bulk) |
| `getStatusesBulk(orderIds)` | POST | `/api/marketplace/v3/click-collect/orders/status/info` | Get statuses for orders (bulk) |

### Order Queries (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getClickCollectOrders(options)` | GET | `/api/v3/click-collect/orders` | List orders with pagination |
| `createOrdersStatus(data)` | POST | `/api/v3/click-collect/orders/status` | Get order statuses by IDs |

### Customer Interaction (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createOrdersClient(data)` | POST | `/api/v3/click-collect/orders/client` | Get customer info for order |
| `createClientIdentity(data)` | POST | `/api/v3/click-collect/orders/client/identity` | Verify customer identity |

### Metadata Operations (14 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getOrdersMeta(orderId)` | GET | `/api/v3/click-collect/orders/{id}/meta` | Get order metadata |
| `deleteOrdersMeta(orderId, { key })` | DELETE | `/api/v3/click-collect/orders/{id}/meta` | Delete order metadata |
| `updateMetaSgtin(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/sgtin` | Set SGTIN codes |
| `updateMetaUin(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/uin` | Set UIN code |
| `updateMetaImei(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/imei` | Set IMEI code |
| `updateMetaGtin(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/gtin` | Set GTIN code |
| `getMetaBulk(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/details` | Get metadata for orders (bulk) |
| `deleteMetaBulk(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/delete` | Delete metadata (bulk) |
| `checkMetaValidation(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/details` | Check metadata validation decisions (bulk) |
| `setSgtinBulk(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/sgtin` | Set SGTIN codes (bulk) |
| `setUinBulk(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/uin` | Set UIN codes (bulk) |
| `setImeiBulk(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/imei` | Set IMEI codes (bulk) |
| `setGtinBulk(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/gtin` | Set GTIN codes (bulk) |
| `setCustomsDeclarationBulk(data)` | POST | `/api/marketplace/v3/click-collect/orders/meta/customs-declaration` | Set customs declaration numbers (bulk) |

### Pricing (1 method)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getOrdersFinalPrice(data)` | POST | `/api/marketplace/v3/click-collect/orders/final-price` | Get seller prices and buyer-payable sums |

---

## Final-Price Guidance (WB news 2026-09)

`getOrdersFinalPrice()` (twin of the DBS method) returns seller prices
excluding discounts (`originalPrice`/`convertedOriginalPrice`) and
buyer-payable sums including all discounts and cashback
(`originalFinalPrice`/`convertedOriginalFinalPrice`). All amounts are
multiplied by 100.

- **Use `originalFinalPrice`/`convertedOriginalFinalPrice` for calculations.**
- Fall back to `finalPrice`/`convertedFinalPrice` from `getOrdersNew()`/
  `getClickCollectOrders()` only when this method returns `"data": null` for
  those order IDs.
- `"data": {}` (empty object) means the data is still being generated — retry
  later (max ~1 minute).
- Per-order errors: `404` NotFound, `400` StatusMismatch, `422`
  PriceNotCalculated (orders created before 23.07.2026).
- In the Sandbox — maximum of 1 request per second for all Marketplace methods
  in total.

---

## Rate Limits

All methods have a **10x penalty multiplier** on 409 Conflict responses.

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 | Assembly reads | 300 req/min | 200ms |
| T2 | State transitions | 100 req/min | 600ms |
| T3 | Identity check | 30 req/min | 2s |
| T4 | Metadata set (PUT) | 1000 req/min | 60ms |

---

## Related Resources

- [API Reference: InStorePickupModule](/api/classes/InStorePickupModule)
- [In-Store Pickup Getting Started Guide](/guides/in-store-pickup-getting-started)

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
| **Methods** | 16 |
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

### Assembly Tasks (6 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getOrdersNew()` | GET | `/api/v3/click-collect/orders/new` | Get new pickup orders |
| `updateOrdersConfirm(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/confirm` | Confirm order for assembly |
| `updateOrdersPrepare(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/prepare` | Mark order as prepared |
| `updateOrdersReceive(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/receive` | Mark as received by customer |
| `updateOrdersReject(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/reject` | Reject order |
| `updateOrdersCancel(orderId)` | PATCH | `/api/v3/click-collect/orders/{id}/cancel` | Cancel order |

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

### Metadata Operations (6 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getOrdersMeta(orderId)` | GET | `/api/v3/click-collect/orders/{id}/meta` | Get order metadata |
| `deleteOrdersMeta(orderId, { key })` | DELETE | `/api/v3/click-collect/orders/{id}/meta` | Delete order metadata |
| `updateMetaSgtin(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/sgtin` | Set SGTIN codes |
| `updateMetaUin(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/uin` | Set UIN code |
| `updateMetaImei(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/imei` | Set IMEI code |
| `updateMetaGtin(orderId, data)` | PUT | `/api/v3/click-collect/orders/{id}/meta/gtin` | Set GTIN code |

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

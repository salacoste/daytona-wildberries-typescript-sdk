# Orders FBW Module

The **Orders FBW (Fulfillment by Wildberries)** module manages supply creation and warehouse operations for sellers who ship products to Wildberries warehouses for fulfillment. It covers acceptance options, warehouse listing, transit tariffs, and supply lifecycle management.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `OrdersFbwModule` |
| **SDK Namespace** | `sdk.ordersFBW.*` |
| **Base URL** | `https://supplies-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/07-orders-fbw.yaml` |
| **Methods** | 9 (7 active + 2 deprecated) |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// List available warehouses
const warehouses = await sdk.ordersFBW.warehouses();

// Check acceptance options for a barcode
const options = await sdk.ordersFBW.createAcceptanceOption(
  [{ barcode: '1234567891234', quantity: 10 }]
);

// Get transit tariffs
const tariffs = await sdk.ordersFBW.transitTariffs();

// List supplies with filters
const supplies = await sdk.ordersFBW.listSupplies({});
```

---

## Methods Reference

### Acceptance and Warehouse Info (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createAcceptanceOption(data)` | POST | `/api/v1/acceptance/options` | Get available warehouses and packaging types for a supply |
| `warehouses()` | GET | `/api/v1/warehouses` | List all WB warehouses |
| `transitTariffs()` | GET | `/api/v1/transit-tariffs` | Get available transit directions |

### Supply Management (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `listSupplies(data)` | POST | `/api/v1/supplies` | List supplies (last 1000 by default) |
| `getSupply(ID)` | GET | `/api/v1/supplies/{ID}` | Get supply details by ID |
| `getSuppliesGood(ID)` | GET | `/api/v1/supplies/{ID}/goods` | Get goods in a supply |
| `getSuppliesPackage(ID)` | GET | `/api/v1/supplies/{ID}/package` | Get supply packaging info |

### Deprecated Methods (2 methods)

> These methods are deprecated and will be removed in a future release. Use the replacements listed below.

| Method | Replacement | Notes |
|--------|-------------|-------|
| `getAcceptanceCoefficients(options?)` | Use tariffs module | Endpoint moved to `common-api.wildberries.ru`. Emits a console warning on first call. |
| `createSupply(data)` | `listSupplies(data)` | Renamed for clarity. Delegates to `listSupplies` internally. Will be removed in v3.0.0. |

---

## Rate Limits

| Rate Limit Key | Operations | Limit | Interval | Burst |
|----------------|-----------|-------|----------|-------|
| `orders-fbw.acceptanceCoefficients` | Acceptance coefficients (deprecated) | 6 req/min | 10s | 6 |
| `orders-fbw.postAcceptanceOptions` | Create acceptance option | 6 req/min | 10s | 6 |
| `orders-fbw.warehouses` | List warehouses | 6 req/min | 10s | 6 |
| `orders-fbw.transitTariffs` | Transit tariffs | 6 req/min | 10s | 10 |
| `orders-fbw.postSupplies` | List supplies | 30 req/min | 2s | 10 |
| `orders-fbw.supplies` | Get supply details | 30 req/min | 2s | 10 |
| `orders-fbw.suppliesGoods` | Get supply goods | 30 req/min | 2s | 10 |
| `orders-fbw.suppliesPackage` | Get supply packaging | 30 req/min | 2s | 10 |

---

## Related Resources

- [API Reference: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [Supplies Planning Guide](/guides/supplies-planning)
- [FBW Getting Started Guide](/guides/orders-fbw-getting-started)

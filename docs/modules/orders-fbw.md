# Orders FBW Module

The **Orders FBW (Fulfillment by Wildberries)** module manages supply creation and warehouse operations for sellers who ship products to Wildberries warehouses for fulfillment.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `ordersFBW` |
| **SDK Namespace** | `sdk.ordersFBW.*` |
| **Base URL** | `https://supplies-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/07-orders-fbw.yaml` |
| **Methods** | 8 |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// List warehouses
const wh = await sdk.ordersFBW.warehouses();

// Get acceptance coefficients
const coefs = await sdk.ordersFBW.getAcceptanceCoefficients();

// Create a supply
const supply = await sdk.ordersFBW.createSupply({ name: 'My Supply' });
```

---

## Methods Reference

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `warehouses()` | GET | `/api/v1/warehouses` | List FBW warehouses |
| `getAcceptanceCoefficients()` | GET | `/api/v1/acceptance/coefficients` | Get acceptance coefficients |
| `createAcceptanceOption(data)` | POST | `/api/v1/acceptance/options` | Create acceptance option |
| `transitTariffs()` | GET | `/api/v1/transit-tariffs` | Get transit tariffs |
| `createSupply(data)` | POST | `/api/v1/supplies` | Create a new supply |
| `getSupply(supplyId)` | GET | `/api/v1/supplies/{id}` | Get supply details |
| `getSuppliesGood(supplyId)` | GET | `/api/v1/supplies/{id}/goods` | Get goods in a supply |
| `getSuppliesPackage(supplyId)` | GET | `/api/v1/supplies/{id}/package` | Get supply package info |

---

## Rate Limits

| Operation | Limit | Interval |
|-----------|-------|----------|
| All read operations | 300 req/min | 200ms |
| Supply creation | 60 req/min | 1s |

---

## Related Resources

- [API Reference: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [Supplies Planning Guide](/guides/supplies-planning)

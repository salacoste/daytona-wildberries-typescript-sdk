# Tariffs Module

The **Tariffs** module provides information about Wildberries commission rates, delivery tariffs, and return fees.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `tariffs` |
| **SDK Namespace** | `sdk.tariffs.*` |
| **Base URL** | `https://common-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/10-tariffs/` |
| **Methods** | 5 |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get commission rates by category
const commissions = await sdk.tariffs.getTariffsCommission();

// Get box delivery tariffs (date required)
const boxTariffs = await sdk.tariffs.getTariffsBox('2024-01-15');

// Get pallet delivery tariffs (date required)
const palletTariffs = await sdk.tariffs.getTariffsPallet('2024-01-15');

// Get return tariffs (date required)
const returnTariffs = await sdk.tariffs.getTariffsReturn('2024-01-15');

// Get supply acceptance coefficients for all warehouses
const coefficients = await sdk.tariffs.getAcceptanceCoefficients();

// Get coefficients for specific warehouses
const specificCoefficients = await sdk.tariffs.getAcceptanceCoefficients({
  warehouseIDs: '507,117501'
});
```

---

## Methods Reference

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getTariffsCommission(options?)` | GET | `/api/v1/tariffs/commission` | Get commission by product categories |
| `getTariffsBox(date)` | GET | `/api/v1/tariffs/box` | Get tariffs for box delivery (date required) |
| `getTariffsPallet(date)` | GET | `/api/v1/tariffs/pallet` | Get tariffs for pallet delivery (date required) |
| `getTariffsReturn(date)` | GET | `/api/v1/tariffs/return` | Get return tariffs (date required) |
| `getAcceptanceCoefficients(options?)` | GET | `/api/tariffs/v1/acceptance/coefficients` | Get supply acceptance coefficients |

---

## Rate Limits

| Operation | Limit | Interval |
|-----------|-------|----------|
| Commission rates | 1 req/min | 60s |
| Box / Pallet / Return tariffs | 60 req/min | 1s |
| Acceptance coefficients | 6 req/min | 10s |

---

## Related Resources

- [API Reference: TariffsModule](/api/classes/TariffsModule)
- [Commissions & Fees Guide](/guides/commissions-fees)

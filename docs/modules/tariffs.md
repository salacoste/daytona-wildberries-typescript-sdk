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
| **Methods** | 4 |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get commission rates by category
const commissions = await sdk.tariffs.getTariffsCommission();

// Get box delivery tariffs
const boxTariffs = await sdk.tariffs.getTariffsBox();

// Get pallet delivery tariffs
const palletTariffs = await sdk.tariffs.getTariffsPallet();

// Get return tariffs
const returnTariffs = await sdk.tariffs.getTariffsReturn();
```

---

## Methods Reference

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getTariffsCommission()` | GET | `/api/v1/tariffs/commission` | Get commission by product categories |
| `getTariffsBox()` | GET | `/api/v1/tariffs/box` | Get tariffs for box delivery |
| `getTariffsPallet()` | GET | `/api/v1/tariffs/pallet` | Get tariffs for pallet delivery |
| `getTariffsReturn()` | GET | `/api/v1/tariffs/return` | Get return tariffs |

---

## Rate Limits

| Operation | Limit | Interval |
|-----------|-------|----------|
| Commission rates | 1 req/min | 60s |
| Box / Pallet / Return tariffs | 60 req/min | 1s |

---

## Related Resources

- [API Reference: TariffsModule](/api/classes/TariffsModule)
- [Commissions & Fees Guide](/guides/commissions-fees)

# Finances Module

The **Finances** module provides access to seller account balance, detailed sales reports, and document management (categories, listings, and downloads).

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `finances` |
| **SDK Namespace** | `sdk.finances.*` |
| **Base URLs** | `https://finance-api.wildberries.ru`, `https://statistics-api.wildberries.ru`, `https://documents-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/13-finances/` |
| **Methods** | 7 (6 active + 1 deprecated) |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get account balance
const balance = await sdk.finances.getAccountBalance();

// Get detailed sales report
const report = await sdk.finances.getSupplierReportDetailByPeriod({
  dateFrom: '2026-01-01',
  dateTo: '2026-01-31'
});

// Get document categories
const categories = await sdk.finances.getDocumentsCategories();

// List seller documents
const docs = await sdk.finances.getDocumentsList();
```

---

## Methods Reference

### Balance & Reports (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAccountBalance()` | GET | `/api/v1/account/balance` | Get seller account balance |
| `getSupplierReportDetailByPeriod()` | GET | `/api/v5/supplier/reportDetailByPeriod` | Get detailed sales report by period |

### Documents (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getDocumentsCategories()` | GET | `/api/v1/documents/categories` | Get document categories |
| `getDocumentsList()` | GET | `/api/v1/documents/list` | Get seller documents list |
| `getDocumentsDownload()` | GET | `/api/v1/documents/download` | Download single document |
| `createDownloadAll()` | POST | `/api/v1/documents/download/all` | Download multiple documents |

### Deprecated (1 method)

| Method | Replacement |
|--------|-------------|
| `getSupplierReportdetailbyperiod()` | `getSupplierReportDetailByPeriod()` |

---

## Rate Limits

| Operation | Limit | Interval |
|-----------|-------|----------|
| Account balance | 1 req/min | 60s |
| Sales report | 1 req/min | 60s |
| Document categories / list / download | 6 req/10s | ~1.7s |
| Download all documents | 1 req/5min | 5min |

---

## Related Resources

- [API Reference: FinancesModule](/api/classes/FinancesModule)
- [Realization Report Guide](/guides/realization-report)
- [Commissions & Fees Guide](/guides/commissions-fees)

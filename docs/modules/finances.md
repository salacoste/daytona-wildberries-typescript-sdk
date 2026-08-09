# Finances Module

The **Finances** module provides access to seller account balance, detailed sales and acquiring reports (v1 endpoints), and document management (categories, listings, and downloads). The legacy v5 sales report was removed in v4.0.0; use the v1 methods instead.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `finances` |
| **SDK Namespace** | `sdk.finances.*` |
| **Base URLs** | `https://finance-api.wildberries.ru`, `https://statistics-api.wildberries.ru`, `https://documents-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/13-finances/` |
| **Methods** | 11 (all active) |
| **Authentication** | API Key (Header) |

### What's New

#### v3.8.0

- **`SalesReportDetailedField` union type**: New string literal union type for the `fields` parameter on `getSalesReportsDetailed()` and `getSalesReportsDetailedByReportId()`. Provides autocomplete for all ~70 available field names.
- **`AcquiringReportDetailedField` union type**: New string literal union type for the `fields` parameter on `getAcquiringReportsDetailed()` and `getAcquiringReportsDetailedByReportId()`. Provides autocomplete for available field names.
- **`warnOnce()` for deprecated method**: `getSupplierReportDetailByPeriod()` now uses the shared `warnOnce()` utility (replacing the previous static flag pattern). Deprecation warning is still emitted once per process on first call.
- **New exports**: `warnOnce()` and `resetDeprecationWarnings()` are now exported from the SDK for use in tests and custom deprecation patterns.

#### v3.7.0 (Sprint 10)

- **6 new v1 report methods**: Sales Reports (`getSalesReportsList`, `getSalesReportsDetailed`, `getSalesReportsDetailedByReportId`) and Acquiring Reports (`getAcquiringReportsList`, `getAcquiringReportsDetailed`, `getAcquiringReportsDetailedByReportId`)
- **`getSupplierReportDetailByPeriod()` deprecated**: Will be disabled by Wildberries on **2026-07-15**. Migrate to `getSalesReportsDetailed()`. See the [migration guide](/guides/migration-finance-reports-v5-to-v1).
- **`parseMoneyAmount()` helper**: New utility for converting v1 string money amounts to numbers
- **10 new types**: `SalesReportListRequest`, `SalesReportListItem`, `SalesReportDetailedRequest`, `SalesReportDetailedByIdRequest`, `SalesReportDetailedItem`, `AcquiringReportListRequest`, `AcquiringReportListItem`, `AcquiringReportDetailedRequest`, `AcquiringReportDetailedByIdRequest`, `AcquiringReportDetailedItem`

#### v3.6.0 (Sprint 7)

- **4 new fields on `DetailReportItem`**: `article_substitution`, `sale_price_affiliated_discount_prc`, `agency_vat`, `sale_price_wholesale_discount_prc`
- See [Tracking Promotion Channels with Substitute Articles](/guides/tracking-promotion-channels-with-substitute-articles) for details on the substitute article fields.

---

## Quick Start

```typescript
import { WildberriesSDK, parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get account balance
const balance = await sdk.finances.getAccountBalance();

// NEW (v3.7.0): Get sales reports list (v1)
const reports = await sdk.finances.getSalesReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  period: 'weekly',
});
console.log(parseMoneyAmount(reports[0].forPaySum)); // string → number

// NEW (v3.7.0): Get detailed sales report rows (v1)
const rows = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  limit: 100000,
  rrdId: 0,
});
const totalPayout = rows.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);

// Get document categories
const categories = await sdk.finances.getDocumentsCategories();

// List seller documents
const docs = await sdk.finances.getDocumentsList();
```

---

## v5 vs v1 API Differences

The v1 endpoints replaced the v5 `getSupplierReportDetailByPeriod()`, which was **removed in v4.0.0** (WB disabled the endpoint on 2026-07-15). This field-by-field mapping is retained as a migration reference:

| Aspect | v5 (removed) | v1 (current) |
|--------|-----------------|----------|
| **HTTP method** | GET | POST |
| **Domain** | `statistics-api.wildberries.ru` | `finance-api.wildberries.ru` |
| **Field names** | `snake_case` (e.g. `ppvz_for_pay`) | `camelCase` (e.g. `forPay`) |
| **Money amounts** | `number` | `string` (use `parseMoneyAmount()`) |
| **Field selection** | Not available | `fields[]` parameter for selective loading |
| **Token types** | All | Personal and Service only |
| **Method** | `getSupplierReportDetailByPeriod()` (removed) | `getSalesReportsDetailed()` |

For a complete field-by-field mapping, see the [Migration Guide: Finance Reports v5 to v1](/guides/migration-finance-reports-v5-to-v1).

### parseMoneyAmount Helper

The v1 finance endpoints return all money amounts as **strings** to preserve precision. Use `parseMoneyAmount()` to convert them to numbers for arithmetic:

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

// Valid numeric string → number
parseMoneyAmount("367.99");    // → 367.99

// null / undefined / empty → 0
parseMoneyAmount(null);        // → 0
parseMoneyAmount(undefined);   // → 0
parseMoneyAmount("");          // → 0

// Non-numeric → 0
parseMoneyAmount("abc");       // → 0
```

::: warning Precision
For amounts with more than 15 significant digits (extremely rare in WB reports), use a dedicated decimal library (`decimal.js`, `big.js`) instead of `parseMoneyAmount()`. For all typical seller amounts, `parseFloat` is safe.
:::

---

## Methods Reference

### Balance (1 method)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAccountBalance()` | GET | `/api/v1/account/balance` | Get seller account balance |

### v1 Sales Reports (3 methods) - NEW in v3.7.0

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getSalesReportsList(data)` | POST | `/api/finance/v1/sales-reports/list` | List sales reports by period |
| `getSalesReportsDetailed(data)` | POST | `/api/finance/v1/sales-reports/detailed` | Detailed sales report rows by period |
| `getSalesReportsDetailedByReportId(reportId, data?)` | POST | `/api/finance/v1/sales-reports/detailed/{reportId}` | Detailed rows for a specific report |

::: info Token Types
v1 Sales Report methods require **Personal** or **Service** tokens. Basic and Test tokens will receive 401/403 errors.
:::

### v1 Acquiring Reports (3 methods) - NEW in v3.7.0

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAcquiringReportsList(data)` | POST | `/api/finance/v1/acquiring/list` | List acquiring (payment) reports |
| `getAcquiringReportsDetailed(data)` | POST | `/api/finance/v1/acquiring/detailed` | Detailed acquiring report rows by period |
| `getAcquiringReportsDetailedByReportId(reportId, data?)` | POST | `/api/finance/v1/acquiring/detailed/{reportId}` | Detailed rows for a specific acquiring report |

::: warning Russian Sellers Only
Acquiring report methods are available **only to Russian sellers**. Requires Personal or Service tokens.
:::

### Documents (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getDocumentsCategories(options?)` | GET | `/api/v1/documents/categories` | Get document categories |
| `getDocumentsList(options?)` | GET | `/api/v1/documents/list` | Get seller documents list |
| `getDocumentsDownload(options)` | GET | `/api/v1/documents/download` | Download single document |
| `createDownloadAll(data?)` | POST | `/api/v1/documents/download/all` | Download multiple documents |

### v5 Sales Report (removed)

> **Removed in v4.0.0** — `getSupplierReportDetailByPeriod()` (the legacy v5 finance report) was deleted; WB disabled the endpoint on 2026-07-15. Use the v1 sales-reports methods (`getSalesReportsList`, `getSalesReportsDetailed`, `getSalesReportsDetailedByReportId`) instead. See `docs/guides/migration-v4.md` and the [v5→v1 finance-reports migration guide](/guides/migration-finance-reports-v5-to-v1).

---

## Rate Limits

| Operation | Limit | Interval | Burst |
|-----------|-------|----------|-------|
| Account balance | 1 req/min | 60s | 1 |
| v1 Sales Reports (list/detailed/byId) | 1 req/min | 60s | 1 |
| v1 Acquiring Reports (list/detailed/byId) | 1 req/min | 60s | 1 |
| Document categories / list / download | 6 req/10s | 10s | 5 |
| Download all documents | 1 req/5min | 300s | 5 |

---

## Usage Examples

### getAccountBalance()

```typescript
const balance = await sdk.finances.getAccountBalance();
console.log(`Currency: ${balance.currency}`);
console.log(`Balance: ${balance.current}`);
console.log(`Available for withdrawal: ${balance.for_withdraw}`);
```

### getSalesReportsList() - NEW in v3.7.0

Returns a list of sales reports for a date range, with summary money amounts as strings.

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const reports = await sdk.finances.getSalesReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-31',
  period: 'weekly',    // 'weekly' (default) or 'daily'
  limit: 100,
  offset: 0,
});

for (const report of reports) {
  console.log(`Report #${report.reportId}: ${report.dateFrom} — ${report.dateTo}`);
  console.log(`  Payout: ${parseMoneyAmount(report.forPaySum)}`);
  console.log(`  Retail: ${parseMoneyAmount(report.retailAmountSum)}`);
  console.log(`  Penalties: ${parseMoneyAmount(report.penaltySum)}`);
}
```

### getSalesReportsDetailed() - NEW in v3.7.0

Returns detailed rows for sales reports within a date range. Replaces the deprecated v5 method. Supports pagination via `rrdId` and selective field loading via `fields`.

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

// Paginate through all rows
let rrdId = 0;
let allRows: SalesReportDetailedItem[] = [];

while (true) {
  const rows = await sdk.finances.getSalesReportsDetailed({
    dateFrom: '2026-03-17',
    dateTo: '2026-03-20',
    limit: 100000,
    rrdId,
    period: 'weekly',
  });

  if (rows.length === 0) break; // 204 → empty array means no more data

  allRows.push(...rows);
  rrdId = rows[rows.length - 1].rrdId!;
}

// Selective field loading (only fetch what you need)
const light = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  fields: ['rrdId', 'nmId', 'forPay', 'retailAmount'],
});

const totalPayout = light.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);
```

### getSalesReportsDetailedByReportId() - NEW in v3.7.0

Returns detailed rows for a specific report by its ID.

```typescript
// Typical weekly report usage (number is safe for weekly report IDs)
const rows = await sdk.finances.getSalesReportsDetailedByReportId(307401554);

// Daily report with BigInt precision — pass as string or bigint
const rows = await sdk.finances.getSalesReportsDetailedByReportId('9007199254740993', {
  fields: ['rrdId', 'nmId', 'retailAmount'],
});
```

::: info BigInt Precision
For daily reports, `reportId` may exceed `Number.MAX_SAFE_INTEGER` (2^53). If you obtained the ID from `getSalesReportsList()` response, standard `JSON.parse` may have already truncated precision. For precision-safe handling, fetch the ID via a custom BigInt-aware parser and pass it as `bigint` or `string`.
:::

### getAcquiringReportsList() - NEW in v3.7.0

Returns a list of acquiring (payment acquisition) reports. Available only to Russian sellers.

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const reports = await sdk.finances.getAcquiringReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});

const totalFees = reports.reduce(
  (sum, r) => sum + parseMoneyAmount(r.acquiringFeeSum), 0
);
console.log(`Total acquiring fees: ${totalFees}`);
```

### getAcquiringReportsDetailed() - NEW in v3.7.0

Returns detailed rows for acquiring reports within a date range. Supports selective field loading.

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getAcquiringReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  limit: 100000,
  rrdId: 0,
  fields: ['rrdId', 'acquiringBank', 'acquiringFee'],
});

const totalFees = rows.reduce(
  (sum, r) => sum + parseMoneyAmount(r.acquiringFee), 0
);
```

### getAcquiringReportsDetailedByReportId() - NEW in v3.7.0

Returns detailed rows for a specific acquiring report by ID.

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

// Typical number reportId
const rows = await sdk.finances.getAcquiringReportsDetailedByReportId(307401554);

// BigInt precision for daily reports — pass as string or bigint
const rows = await sdk.finances.getAcquiringReportsDetailedByReportId(
  '9007199254740993',
  { fields: ['rrdId', 'acquiringFee'] }
);
```

### getSupplierReportDetailByPeriod() — removed

> **Removed in v4.0.0** — `getSupplierReportDetailByPeriod()` (legacy v5 finance report) was deleted; WB disabled the endpoint on 2026-07-15. Use `getSalesReportsDetailed()` (POST `/api/finance/v1/sales-reports/detailed`) for the same data with camelCase fields and `string` money amounts (via `parseMoneyAmount()`). See `docs/guides/migration-v4.md`.

### Documents

```typescript
// Get categories
const categories = await sdk.finances.getDocumentsCategories({ locale: 'ru' });

// List documents with filtering and sorting
const docs = await sdk.finances.getDocumentsList({
  locale: 'ru',
  sort: 'date',
  order: 'desc',
  beginTime: '2026-01-01',
  endTime: '2026-03-31',
  limit: 50,
  offset: 0,
});

// Download a single document
const doc = await sdk.finances.getDocumentsDownload({
  serviceName: 'act',
  extension: 'pdf',
});

// Download multiple documents
const batch = await sdk.finances.createDownloadAll({
  params: [
    { serviceName: 'act', extension: 'pdf' },
    { serviceName: 'invoice', extension: 'pdf' },
  ],
});
```

---

## Types Reference

### Balance & Documents

| Type | Description |
|------|-------------|
| `AccountBalanceResponse` | Account balance with currency, current balance, and withdrawal amount |
| `DocumentsLocale` | Locale for document endpoints: `'ru' \| 'en' \| 'zh'` |
| `RequestDownload` | Request body for batch document download |
| `GetCategories` | Document categories response |
| `GetList` | Paginated document list response |
| `GetDoc` | Single document response (base64 encoded) |
| `GetDocs` | Multiple documents response (base64 encoded) |

### v5 Sales Report (removed in v4.0.0)

> `DetailReportItem` (the v5 `getSupplierReportDetailByPeriod()` response type) was deleted. Use `SalesReportDetailedItem` (camelCase fields, `string` money amounts via `parseMoneyAmount()`) instead. See `docs/guides/migration-v4.md`.

### v1 Sales Reports (v3.7.0)

| Type | Description |
|------|-------------|
| `SalesReportListRequest` | Request body for `getSalesReportsList()`: `dateFrom`, `dateTo`, `limit`, `offset`, `period` |
| `SalesReportListItem` | Report summary item with `reportId`, date range, and money sums as strings |
| `SalesReportDetailedRequest` | Request body for `getSalesReportsDetailed()`: `dateFrom`, `dateTo`, `limit`, `rrdId`, `period`, `fields` |
| `SalesReportDetailedByIdRequest` | Request body for `getSalesReportsDetailedByReportId()`: `limit`, `rrdId`, `fields` |
| `SalesReportDetailedItem` | Detailed report row (~70 fields). camelCase names, money amounts as strings. Maps 1:1 to `DetailReportItem` fields with v5 equivalents noted in JSDoc |

### v1 Field Union Types (v3.8.0)

| Type | Description |
|------|-------------|
| `SalesReportDetailedField` | String literal union of all valid field names for the `fields` parameter on `getSalesReportsDetailed()` and `getSalesReportsDetailedByReportId()`. Enables IDE autocomplete for selective field loading. |
| `AcquiringReportDetailedField` | String literal union of all valid field names for the `fields` parameter on `getAcquiringReportsDetailed()` and `getAcquiringReportsDetailedByReportId()`. Enables IDE autocomplete for selective field loading. |

### v1 Acquiring Reports (v3.7.0)

| Type | Description |
|------|-------------|
| `AcquiringReportListRequest` | Request body for `getAcquiringReportsList()`: `dateFrom`, `dateTo`, `limit`, `offset` |
| `AcquiringReportListItem` | Acquiring report summary with `acquiringFeeSum` and `acquiringFeeVatSum` as strings |
| `AcquiringReportDetailedRequest` | Request body for `getAcquiringReportsDetailed()`: `dateFrom`, `dateTo`, `limit`, `rrdId`, `fields` |
| `AcquiringReportDetailedByIdRequest` | Request body for `getAcquiringReportsDetailedByReportId()`: `limit`, `rrdId`, `fields` |
| `AcquiringReportDetailedItem` | Detailed acquiring row with bank, fee, VAT, and invoice fields. Money amounts as strings |

---

## Related Resources

- [API Reference: FinancesModule](/api/classes/FinancesModule)
- [Migration Guide: Finance Reports v5 to v1](/guides/migration-finance-reports-v5-to-v1)
- [Tracking Promotion Channels with Substitute Articles](/guides/tracking-promotion-channels-with-substitute-articles)
- [Realization Report Guide](/guides/realization-report)
- [Commissions & Fees Guide](/guides/commissions-fees)

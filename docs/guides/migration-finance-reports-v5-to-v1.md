---
title: "Finance Reports API Migration: snake_case to camelCase (WB API v5 to v1)"
description: Migrate from deprecated getSupplierReportDetailByPeriod() (v5, disabled 2026-07-15) to getSalesReportsDetailed() (v1) — field mapping, string money amounts, code examples.
layout: doc
keywords:
  - wildberries SDK migration
  - snake_case to camelCase
  - v5 to v1 finance reports
  - getSupplierReportDetailByPeriod deprecation
  - getSalesReportsDetailed
  - parseMoneyAmount
  - подменные артикулы v1
  - acquiring reports
---

# Finance Reports API Migration: snake_case to camelCase (WB API v5 to v1)

> ⚠️ **Hard deadline: 2026-07-15.** The v5 endpoint `GET /api/v5/supplier/reportDetailByPeriod` will be disabled by Wildberries on this date. Any code still calling `sdk.finances.getSupplierReportDetailByPeriod()` after that will fail in production with HTTP 4xx/5xx errors.

**Audience**: Developers using SDK v3.5 or later who call `getSupplierReportDetailByPeriod()`.
**Estimated migration time**: 30 minutes per call site.
**Since**: SDK v3.7.0

## TL;DR

```typescript
// ❌ OLD (v5, deprecated, disabled 2026-07-15)
const rows = await sdk.finances.getSupplierReportDetailByPeriod({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});
const total = rows.reduce((s, r) => s + (r.ppvz_for_pay ?? 0), 0);  // number

// ✅ NEW (v1, since v3.7.0)
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});
const total = rows.reduce((s, r) => s + parseMoneyAmount(r.forPay), 0);  // number (parsed from string)
```

## Find all deprecated calls in your code

Before migrating, locate every call site:

```bash
grep -rn "getSupplierReportDetailByPeriod" src/
grep -rn "DetailReportItem" src/
```

Or with ripgrep:

```bash
rg "getSupplierReportDetailByPeriod|DetailReportItem"
```

## What changed (v5 → v1)

| Aspect | v5 (deprecated) | v1 (replacement) |
|--------|-----------------|------------------|
| Method | `getSupplierReportDetailByPeriod()` | `getSalesReportsDetailed()` |
| HTTP method | `GET` | `POST` |
| Domain | `statistics-api.wildberries.ru` | `finance-api.wildberries.ru` |
| Field naming | `snake_case` (e.g. `ppvz_for_pay`) | `camelCase` (e.g. `forPay`) |
| Money amounts | `number` | **`string`** |
| Token types | All types | **Personal/Service only** (NOT Basic/Test) |
| Selective fields | Not supported | New `fields: string[]` parameter |
| List endpoint | None | New `getSalesReportsList()` |
| By-ID endpoint | None | New `getSalesReportsDetailedByReportId()` |

## Why money is now `string`

In v5 money amounts were `number`. In v1 they're `string`. **This is intentional per WB's spec** — JavaScript's IEEE-754 `number` loses precision at amounts above 2^53 (rare but possible in aggregated sums). String values preserve the API-returned precision.

If you need math, use the `parseMoneyAmount()` helper shipped with the SDK:

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const total = rows.reduce((sum, row) => sum + parseMoneyAmount(row.forPay), 0);
```

**Precision warning**: For amounts with more than 15 significant digits (extremely rare), use a dedicated decimal library like `decimal.js` or `big.js`. For all typical seller amounts, `parseMoneyAmount()` is safe.

## Watch out for string concatenation bugs

The most common migration bug is implicit string concatenation:

```typescript
// ❌ WRONG — concatenates strings instead of adding numbers!
const total = row.forPay + row.acquiringFee;
// "376.99" + "14.89" = "376.9914.89"  ← BUG

// ✅ CORRECT — parse first, then add
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
const total = parseMoneyAmount(row.forPay) + parseMoneyAmount(row.acquiringFee);
// 376.99 + 14.89 = 391.88
```

**Rule of thumb**: any time you do math on v1 money fields, wrap them in `parseMoneyAmount()`.

## Field mapping table (searchable by either old or new name)

Each row shows the v5 snake_case name and the v1 camelCase name side-by-side — Ctrl+F either term finds the row.

### Money fields (type changed: `number` → `string`)

| v5 snake_case | v1 camelCase | Notes |
|---|---|---|
| `retail_price` | `retailPrice` | was number, now string |
| `retail_amount` | `retailAmount` | was number, now string |
| `retail_price_withdisc_rub` | `retailPriceWithDisc` | renamed + retyped |
| `delivery_rub` | `deliveryService` | renamed + retyped |
| `supplier_promo` | `sellerPromo` | renamed + retyped |
| `ppvz_sales_commission` | `ppvzSalesCommission` | was number, now string |
| `ppvz_for_pay` | `forPay` | **common field** — renamed + retyped |
| `ppvz_reward` | `ppvzReward` | was number, now string |
| `acquiring_fee` | `acquiringFee` | was number, now string |
| `ppvz_vw` | `vw` | renamed + retyped |
| `ppvz_vw_nds` | `vwNds` | renamed + retyped |
| `penalty` | `penalty` | retyped to string |
| `additional_payment` | `additionalPayment` | retyped to string |
| `rebill_logistic_cost` | `rebillLogisticCost` | retyped to string |
| `storage_fee` | `paidStorage` | **renamed** + retyped |
| `deduction` | `deduction` | retyped to string |
| `acceptance` | `paidAcceptance` | **renamed** + retyped |
| `installment_cofinancing_amount` | `installmentCofinancingAmount` | retyped to string |
| `cashback_amount` | `cashbackAmount` | retyped to string |
| `cashback_discount` | `cashbackDiscount` | retyped to string |
| `cashback_commission_change` | `cashbackCommissionChange` | retyped to string |
| `payment_schedule` | `paymentSchedule` | retyped to string |

### Identifier fields (renamed)

| v5 snake_case | v1 camelCase | Notes |
|---|---|---|
| `realizationreport_id` | `reportId` | renamed |
| `rrd_id` | `rrdId` | common pagination cursor |
| `gi_id` | `giId` | |
| `nm_id` | `nmId` | common WB article ID |
| `shk_id` | `shkId` | |
| `assembly_id` | `orderId` | **renamed to orderId** |
| `sa_name` | `vendorCode` | **common field — renamed** |
| `barcode` | `sku` | **renamed** |
| `ts_name` | `techSize` | **renamed** |
| `order_uid` | `orderUid` | |
| `srid` | `srid` | unchanged |
| `sticker_id` | `stickerId` | |
| `trbx_id` | `trbxId` | |

### Date/time fields (renamed)

| v5 snake_case | v1 camelCase | Notes |
|---|---|---|
| `date_from` | `dateFrom` | |
| `date_to` | `dateTo` | |
| `create_dt` | `createDate` | **renamed** |
| `fix_tariff_date_from` | `fixTariffDateFrom` | |
| `fix_tariff_date_to` | `fixTariffDateTo` | |
| `order_dt` | `orderDt` | |
| `sale_dt` | `saleDt` | |
| `rr_dt` | `rrDate` | **renamed** |

### Percentage/ratio fields (still `number`)

| v5 snake_case | v1 camelCase | Notes |
|---|---|---|
| `sale_percent` | `salePercent` | |
| `commission_percent` | `commissionPercent` | |
| `dlv_prc` | `dlvPrc` | |
| `product_discount_for_report` | `productDiscountForReport` | |
| `ppvz_spp_prc` | `spp` | **renamed** |
| `ppvz_kvw_prc_base` | `kvwBase` | **renamed** |
| `ppvz_kvw_prc` | `kvw` | **renamed** |
| `sup_rating_prc_up` | `supRatingUp` | renamed |
| `is_kgvp_v2` | `isKgvpV2` | |
| `acquiring_percent` | `acquiringPercent` | |
| `wibes_wb_discount_percent` | `wibesDiscountPercent` | renamed |
| `seller_promo_discount` | `sellerPromoDiscount` | |
| `loyalty_discount` | `loyaltyDiscount` | |
| `sale_price_promocode_discount_prc` | `salePricePromocodeDiscountPrc` | |
| `sale_price_affiliated_discount_prc` | `salePriceAffiliatedDiscountPrc` | since v3.6.0 |
| `agency_vat` | `agencyVat` | semantics undocumented by WB |
| `sale_price_wholesale_discount_prc` | `salePriceWholesaleDiscountPrc` | since v3.6.0 |

### String fields (unchanged type)

| v5 snake_case | v1 camelCase | Notes |
|---|---|---|
| `currency_name` | `currency` | **renamed** |
| `subject_name` | `subjectName` | |
| `brand_name` | `brandName` | |
| `doc_type_name` | `docTypeName` | |
| `office_name` | `officeName` | |
| `supplier_oper_name` | `sellerOperName` | renamed |
| `ppvz_office_name` | `ppvzOfficeName` | |
| `ppvz_supplier_name` | `ppvzSupplierName` | |
| `ppvz_inn` | `ppvzSupplierInn` | renamed |
| `acquiring_bank` | `acquiringBank` | |
| `payment_processing` | `paymentProcessing` | |
| `declaration_number` | `declarationNumber` | |
| `bonus_type_name` | `bonusTypeName` | |
| `site_country` | `country` | **renamed** |
| `delivery_method` | `deliveryMethod` | |
| `rebill_logistic_org` | `rebillLogisticOrg` | |
| `gi_box_type_name` | `giBoxTypeName` | |
| `uuid_promocode` | `uuidPromocode` | |
| `kiz` | `kiz` | unchanged |
| `article_substitution` | `articleSubstitution` | since v3.6.0 |

### Boolean fields (unchanged)

| v5 snake_case | v1 camelCase | Notes |
|---|---|---|
| `srv_dbs` | `srvDbs` | |
| `is_legal_entity` | `isB2b` | **renamed** |

### Integer/ID fields (still `number`)

| v5 snake_case | v1 camelCase | Notes |
|---|---|---|
| `report_type` | `reportType` | 1-4 enum |
| `quantity` | `quantity` | unchanged |
| `delivery_amount` | `deliveryAmount` | |
| `return_amount` | `returnAmount` | |
| `ppvz_office_id` | `ppvzOfficeId` | |
| `seller_promo_id` | `sellerPromoId` | |
| `loyalty_id` | `loyaltyId` | |

### New in v1 (no v5 equivalent)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Product title — NEW |

## Incremental migration with dual types

If your codebase calls the report method in many places, you can migrate incrementally using a union type during the transition:

```typescript
import type {
  DetailReportItem,         // v5 (deprecated)
  SalesReportDetailedItem,  // v1
} from 'daytona-wildberries-typescript-sdk/finances';

// Union type for helper functions that need to accept either shape
type AnyDetailReport = DetailReportItem | SalesReportDetailedItem;

function logReport(row: AnyDetailReport): void {
  // WARNING: these types share almost NO property names.
  // Use discriminant checks, or migrate each call site separately.
  if ('forPay' in row) {
    // v1 shape
    console.log(`Payout: ${row.forPay}`);
  } else {
    // v5 shape
    console.log(`Payout: ${row.ppvz_for_pay}`);
  }
}
```

**Caveat**: because v5 and v1 use completely different field names, the union is of limited use for property access. It's mainly a migration scaffold for function signatures during transition. Prefer migrating each call site cleanly.

## Code migration examples

### Example 1: Simple list-and-sum (most common pattern)

**Before (v5):**
```typescript
const rows = await sdk.finances.getSupplierReportDetailByPeriod({
  dateFrom: '2026-03-01',
  dateTo: '2026-03-31',
});

const totalPayout = rows.reduce((sum, r) => sum + (r.ppvz_for_pay ?? 0), 0);
console.log(`Total: ${totalPayout.toFixed(2)} руб`);
```

**After (v1):**
```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-03-01',
  dateTo: '2026-03-31',
});

const totalPayout = rows.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);
console.log(`Total: ${totalPayout.toFixed(2)} руб`);
```

### Example 2: Filter by substitute article (v3.6.0 field)

**Before (v5):**
```typescript
const campaignRows = rows.filter(
  (r) => r.article_substitution && r.article_substitution !== ''
);
const campaignRevenue = campaignRows.reduce((s, r) => s + (r.retail_amount ?? 0), 0);
```

**After (v1):**
```typescript
const campaignRows = rows.filter(
  (r) => r.articleSubstitution && r.articleSubstitution !== ''
);
const campaignRevenue = campaignRows.reduce(
  (s, r) => s + parseMoneyAmount(r.retailAmount), 0
);
```

### Example 3: Paginated full-period fetch

**Before (v5):**
```typescript
let allRows: DetailReportItem[] = [];
let rrdid = 0;
while (true) {
  const page = await sdk.finances.getSupplierReportDetailByPeriod({
    dateFrom, dateTo, rrdid, limit: 100000,
  });
  if (page.length === 0) break;
  allRows = allRows.concat(page);
  rrdid = page[page.length - 1].rrd_id ?? 0;
}
```

**After (v1):**
```typescript
let allRows: SalesReportDetailedItem[] = [];
let rrdId = 0;
while (true) {
  const page = await sdk.finances.getSalesReportsDetailed({
    dateFrom, dateTo, rrdId, limit: 100000,
  });
  if (page.length === 0) break;
  allRows = allRows.concat(page);
  rrdId = page[page.length - 1].rrdId ?? 0;
}
```

## New in v1: list endpoint + by-report-id endpoint

### `getSalesReportsList()` — list all reports for a period

```typescript
const reports = await sdk.finances.getSalesReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  period: 'weekly',
});

for (const r of reports) {
  console.log(`Report ${r.reportId}: ${r.dateFrom} to ${r.dateTo}`);
  console.log(`  Total payout: ${parseMoneyAmount(r.forPaySum)}`);
  console.log(`  Total penalty: ${parseMoneyAmount(r.penaltySum)}`);
}
```

### `getSalesReportsDetailedByReportId()` — details for a specific report

```typescript
// Typical use case
const rows = await sdk.finances.getSalesReportsDetailedByReportId(307401554);

// With selective field loading (faster, less bandwidth)
const rows = await sdk.finances.getSalesReportsDetailedByReportId(307401554, {
  fields: ['rrdId', 'nmId', 'forPay', 'retailAmount'],
});
```

### BigInt precision for daily reports

For daily reports, `reportId` may exceed `Number.MAX_SAFE_INTEGER` (2^53). The method accepts `number | bigint | string`:

```typescript
// BigInt-safe for daily reports
const rows = await sdk.finances.getSalesReportsDetailedByReportId(
  '9007199254740993',  // string preserves precision
  { fields: ['rrdId', 'forPay'] }
);
```

## Acquiring Reports (new in v1)

Entirely new endpoint group for payment acquisition cost tracking (эквайринг). **Available only to Russian sellers**, Personal/Service tokens only.

```typescript
// List acquiring reports
const reports = await sdk.finances.getAcquiringReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});

// Details for a period
const rows = await sdk.finances.getAcquiringReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  fields: ['rrdId', 'acquiringBank', 'acquiringFee'],
});

// Total fees
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
const totalFees = rows.reduce(
  (s, r) => s + parseMoneyAmount(r.acquiringFee), 0
);
```

## RU-only acquiring reports

The acquiring endpoints (`getAcquiringReports*`) are **only available to Russian sellers**. If you operate across multiple geos (e.g., as a platform operator), branch on geo:

```typescript
async function fetchAcquiring(sdk: WildberriesSDK, isRussianSeller: boolean) {
  if (!isRussianSeller) {
    return []; // Skip for non-RU sellers
  }
  return await sdk.finances.getAcquiringReportsDetailed({ dateFrom, dateTo });
}
```

## Token-type requirements

All v1 finance report endpoints require **Personal** or **Service** tokens. Basic and Test tokens will return 401/403.

```typescript
// ✅ Works
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_PERSONAL_TOKEN,
  tokenType: 'personal',
});

// ❌ 401/403 on v1 endpoints
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_BASIC_TOKEN,
  tokenType: 'basic',
});
```

If you're on Basic/Test tokens, you'll need to request a Personal or Service token from Wildberries before 2026-07-15.

## Migration checklist

- [ ] Run `grep -rn "getSupplierReportDetailByPeriod" src/` to find all call sites
- [ ] Run `grep -rn "DetailReportItem" src/` to find all type references
- [ ] Confirm your API token is Personal or Service type (not Basic/Test)
- [ ] Upgrade to SDK v3.7.0+: `npm install daytona-wildberries-typescript-sdk@latest`
- [ ] Import `parseMoneyAmount` helper where you do money math
- [ ] Replace each call site with `getSalesReportsDetailed()` + camelCase fields
- [ ] Wrap all money field reads in `parseMoneyAmount()`
- [ ] Verify `rrd_id` → `rrdId` everywhere (common rename)
- [ ] Verify `ppvz_for_pay` → `forPay` everywhere (common rename)
- [ ] Check for string concatenation bugs (money fields are now strings)
- [ ] Update unit tests
- [ ] Deploy **before 2026-07-15**

## How to know the SDK version you're on

```bash
npm ls daytona-wildberries-typescript-sdk
# Expect: daytona-wildberries-typescript-sdk@3.7.0 or later
```

Or in code:

```typescript
import { version } from 'daytona-wildberries-typescript-sdk';
console.log(version); // "3.7.0" or later
```

If you're on v3.6.x or earlier, **upgrade immediately** — these versions do NOT include the v1 replacement methods.

## Related

- [API docs — v1 Sales Reports](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty)
- [API docs — v5 Sales Reports (deprecated)](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get)
- [Substitute article tracking guide](/guides/tracking-promotion-channels-with-substitute-articles) — updated to mention v1 methods

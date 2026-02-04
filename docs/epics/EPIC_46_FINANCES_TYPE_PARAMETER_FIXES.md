# EPIC 46: Finances Type & Parameter Fixes — report_type enum, missing fields, required params, inline types

---

## Overview

| Field | Value |
|-------|-------|
| **EPIC** | 46 |
| **Module** | Finances (`src/modules/finances/`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-46 |
| **Depends On** | None (standalone type fixes) |
| **Blocks** | task-47 (Finances Code Quality) |
| **Source** | February 2026 Swagger Audit |
| **Swagger** | `wildberries_api_doc/13-finances.yaml` |
| **Related Stories** | 3.1 (Finances Balance & Transactions), 3.2 (Finances Reports & Payouts), 7.9 (Finances Implementation Analysis), 8.2 (Finances delivery_method Field) |
| **Related QA Gates** | 3.1, 3.2 |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Module implementation | `src/modules/finances/index.ts` | 125 lines, 6 methods |
| Types file | `src/types/finances.types.ts` | 251 lines, 6 interfaces |
| Rate limits | `src/config/finances-rate-limits.ts` | 47 lines, 6 rate limit entries |
| Unit tests | (none) | No dedicated test file exists yet |
| Swagger spec | `wildberries_api_doc/13-finances.yaml` | 6 endpoints, 6 schemas, 3 tags, 3 base URLs |

### What Is Wrong

Seven issues have been identified in the finances module types:

1. **report_type enum missing values 3 and 4 (CRITICAL)**: The current type is defined as `1 | 2`. The swagger defines `enum: [1, 2, 3, 4]` where values 3 and 4 represent buyout notifications for Georgia. SDK consumers cannot represent Georgia-specific report types.

2. **suppliercontract_code typed as Record\<string, never\> instead of object | null (CRITICAL)**: The swagger defines `suppliercontract_code` as `type: object, nullable: true, example: null`. The SDK uses `Record<string, never>` which is an empty object type that does not accept `null`. The correct type is `object | null` to match the nullable object semantics.

3. **5 DetailReportItem fields missing (CRITICAL)**: The following fields present in the swagger `DetailReportItem` schema are absent from the SDK type:
   - `payment_schedule` (number/decimal) -- one-time change to payment transfer schedule
   - `seller_promo_id` (integer) -- seller's own promotion ID
   - `seller_promo_discount` (number) -- additional discount percentage from seller's own promotion
   - `uuid_promocode` (string) -- promo code ID
   - `sale_price_promocode_discount_prc` (number) -- promo code discount percentage

4. **AccountBalanceResponse missing as named interface (HIGH)**: The `getAccountBalance()` method returns `Promise<{ currency?: string; current?: number; for_withdraw?: number }>` using an inline anonymous type. This should be a named `AccountBalanceResponse` interface for reusability, documentation, and import convenience.

5. **getDocumentsDownload required params wrapped in optional object (HIGH)**: The method signature is `getDocumentsDownload(options?: { serviceName: string; extension: string })` but the swagger marks both `serviceName` and `extension` as `required: true`. The outer `options?` makes the entire parameter optional, allowing calls with no arguments that will fail at runtime.

6. **getSupplierReportdetailbyperiod required params wrapped in optional object (HIGH)**: The method signature is `getSupplierReportdetailbyperiod(options?: { dateFrom: string; dateTo: string; ... })` but the swagger marks both `dateFrom` and `dateTo` as `required: true`. The outer `options?` allows calls without dates, which the API will reject with a 400 error.

7. **locale parameter unconstrained (LOW)**: The `locale` parameter on `getDocumentsCategories()` and `getDocumentsList()` accepts `string` but the swagger specifies only three valid values: `ru` (Russian), `en` (English), `zh` (Chinese). An unconstrained string provides no autocompletion or compile-time validation.

### Why This Matters

- **Incomplete report_type enum silently drops Georgia report types**: Sellers operating in Georgia who receive report types 3 or 4 will get TypeScript errors when the API returns these values, or will be unable to filter for them.
- **Wrong suppliercontract_code type blocks null assignment**: The `Record<string, never>` type does not accept `null`, so consumers cannot correctly represent the nullable contract code that the API returns.
- **Missing DetailReportItem fields cause data loss**: Five fields from the API response are silently dropped because the type does not declare them. Consumers accessing `payment_schedule`, `seller_promo_id`, `seller_promo_discount`, `uuid_promocode`, or `sale_price_promocode_discount_prc` will get `undefined` with no compile-time warning.
- **Inline anonymous type reduces DX**: The `getAccountBalance()` return type cannot be imported or referenced by name, forcing consumers to inline the shape or use `Awaited<ReturnType<...>>` workarounds.
- **Optional required params cause runtime errors**: Calling `getDocumentsDownload()` or `getSupplierReportdetailbyperiod()` without required parameters compiles successfully but fails at runtime with 400 errors.
- **Unconstrained locale accepts invalid values**: Passing an unsupported locale (e.g., `'fr'`) compiles but returns unexpected results or errors from the API.

---

## Gap Analysis

### report_type Enum Comparison

| Current (Incomplete) | Correct (Per Swagger) |
|---------------------|----------------------|
| `1 \| 2` | `1 \| 2 \| 3 \| 4` |
| Only standard and buyout notification | Includes Georgia buyout notifications (3, 4) |
| Missing 2 of 4 enum values | All 4 values represented |

### suppliercontract_code Type Comparison

| Current (Wrong) | Correct (Per Swagger) |
|-----------------|----------------------|
| `Record<string, never>` | `object \| null` |
| Empty object type, rejects null | Nullable object matching `type: object, nullable: true` |
| `example: null` cannot be assigned | `null` is a valid value |

### Missing DetailReportItem Fields

| Field | Swagger Type | Swagger Description | SDK Status |
|-------|-------------|---------------------|------------|
| `payment_schedule` | `number` (decimal) | Разовое изменение срока перечисления денежных средств | **MISSING** |
| `seller_promo_id` | `integer` | ID собственной акции продавца с дополнительной скидкой | **MISSING** |
| `seller_promo_discount` | `number` | Размер дополнительной скидки по собственной акции продавца, % | **MISSING** |
| `uuid_promocode` | `string` | ID промокода | **MISSING** |
| `sale_price_promocode_discount_prc` | `number` | Скидка за промокод, % | **MISSING** |

### getAccountBalance() Return Type Comparison

| Current (Inline) | Correct (Named) |
|-----------------|-----------------|
| `Promise<{ currency?: string; current?: number; for_withdraw?: number }>` | `Promise<AccountBalanceResponse>` |
| Cannot be imported | Importable named interface |
| Duplicated in generic type parameter | Single source of truth |

### Parameter Optionality Issues

| Method | Parameter | Current | Swagger `required` | Correct |
|--------|-----------|---------|-------------------|---------|
| `getDocumentsDownload` | `options` (outer) | `options?` (optional) | N/A (params are required) | `options` (required) |
| `getDocumentsDownload` | `serviceName` | `string` (required in object) | `true` | `string` (correct, but object must be required) |
| `getDocumentsDownload` | `extension` | `string` (required in object) | `true` | `string` (correct, but object must be required) |
| `getSupplierReportdetailbyperiod` | `options` (outer) | `options?` (optional) | N/A (params are required) | `options` (required) |
| `getSupplierReportdetailbyperiod` | `dateFrom` | `string` (required in object) | `true` | `string` (correct, but object must be required) |
| `getSupplierReportdetailbyperiod` | `dateTo` | `string` (required in object) | `true` | `string` (correct, but object must be required) |

### locale Parameter Comparison

| Method | Current Type | Correct Type (Per Swagger) |
|--------|-------------|---------------------------|
| `getDocumentsCategories` | `string` | `'ru' \| 'en' \| 'zh'` |
| `getDocumentsList` | `string` | `'ru' \| 'en' \| 'zh'` |

---

## Implementation Approach

### Step 1: Fix report_type Enum

Expand the `report_type` field in `DetailReportItem` from `1 | 2` to `1 | 2 | 3 | 4`. Update the JSDoc to document all four values:
- `1` -- standard report
- `2` -- buyout notification
- `3`, `4` -- buyout notification for Georgia

### Step 2: Fix suppliercontract_code Type

Change `suppliercontract_code` from `Record<string, never>` to `object | null` to match the swagger `type: object, nullable: true` definition. The `example: null` in the swagger confirms that null is a valid value.

### Step 3: Add 5 Missing Fields to DetailReportItem

Add the following fields with proper JSDoc descriptions from the swagger:
- `payment_schedule?: number` -- one-time change to payment transfer schedule
- `seller_promo_id?: number` -- seller's own promotion ID with additional discount
- `seller_promo_discount?: number` -- additional discount percentage from seller's promotion
- `uuid_promocode?: string` -- promo code ID
- `sale_price_promocode_discount_prc?: number` -- promo code discount percentage

All fields are optional (not in the swagger `required` array).

### Step 4: Create AccountBalanceResponse Named Interface

Extract the inline anonymous type from `getAccountBalance()` into a named interface:

```typescript
export interface AccountBalanceResponse {
  /** Валюта (currency code) */
  currency?: string;
  /** Текущий баланс */
  current?: number;
  /** Доступно для вывода */
  for_withdraw?: number;
}
```

Update the method signature and generic type parameter to reference `AccountBalanceResponse`.

### Step 5: Fix getDocumentsDownload() Parameter Optionality

Change `options?` to `options` (required) since both `serviceName` and `extension` are `required: true` in the swagger. The method cannot succeed without these parameters.

### Step 6: Fix getSupplierReportdetailbyperiod() Parameter Optionality

Change `options?` to `options` (required) since both `dateFrom` and `dateTo` are `required: true` in the swagger. The API returns a 400 error with `missing dateTo params` when called without dates.

### Step 7: Add locale Union Type Constraint

Create a `DocumentsLocale` type alias `'ru' | 'en' | 'zh'` and apply it to the `locale` parameter in both `getDocumentsCategories()` and `getDocumentsList()`.

### Step 8: Validate Type Safety

Run `npx tsc --noEmit` to ensure zero TypeScript errors in strict mode across the entire project. Verify that all imports are resolved and no circular dependencies are introduced.

### Step 9: Run Lint

Run `npm run lint` to verify code style compliance.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/types/finances.types.ts` | Fix report_type enum (1\|2 to 1\|2\|3\|4), fix suppliercontract_code type, add 5 missing DetailReportItem fields, add AccountBalanceResponse interface, add DocumentsLocale type alias | Medium |
| `src/modules/finances/index.ts` | Update getAccountBalance() return type to AccountBalanceResponse, fix getDocumentsDownload() parameter optionality, fix getSupplierReportdetailbyperiod() parameter optionality, apply locale union constraint to documents endpoints, update import statement | Medium |

---

## Success Criteria

- [ ] report_type enum expanded from `1 | 2` to `1 | 2 | 3 | 4` with JSDoc descriptions for all values (1=standard, 2=buyout notification, 3/4=buyout notification for Georgia)
- [ ] suppliercontract_code type changed from `Record<string, never>` to `object | null` to match swagger `nullable: true`
- [ ] Five missing fields added to DetailReportItem: `payment_schedule` (number), `seller_promo_id` (number), `seller_promo_discount` (number), `uuid_promocode` (string), `sale_price_promocode_discount_prc` (number)
- [ ] AccountBalanceResponse named interface created to replace inline anonymous type in `getAccountBalance()` return
- [ ] `getDocumentsDownload()` parameter changed from optional to required (`options: { serviceName: string; extension: string }`) per swagger `required: true`
- [ ] `getSupplierReportdetailbyperiod()` parameter changed from optional to required for `dateFrom` and `dateTo` per swagger `required: true`
- [ ] locale parameter for documents endpoints constrained to `'ru' | 'en' | 'zh'` union type per swagger description
- [ ] All type changes pass TypeScript strict compilation with zero errors

---

## Risk Assessment

**Risk Level: LOW**

- **report_type enum expansion is non-breaking**: Adding values 3 and 4 to an integer union is additive. Existing code using `1 | 2` will continue to work.
- **suppliercontract_code type change is a MINOR BREAKING CHANGE**: Code assigning `Record<string, never>` values will still compile, but code explicitly typing variables as `Record<string, never>` may need updates. However, the old type was incorrect and could not represent the API's `null` value.
- **Adding 5 missing fields is non-breaking**: Additive optional field additions do not affect existing code.
- **AccountBalanceResponse interface extraction is non-breaking**: The structural type is identical. Code using the inline shape via structural typing will continue to work. The new named interface can be imported for explicit typing.
- **Making optional params required is a BREAKING CHANGE**: Calls to `getDocumentsDownload()` and `getSupplierReportdetailbyperiod()` without arguments will fail to compile. This is intentional -- the old signatures allowed calls that would always fail at runtime with 400 errors.
- **locale constraint is a BREAKING CHANGE**: Code passing arbitrary strings to the `locale` parameter will fail to compile. This is intentional -- only `'ru'`, `'en'`, and `'zh'` are valid per the API.

**Mitigation**: Document all breaking changes in the release notes with migration examples. The breaking changes correct previously incorrect types that caused runtime failures, so the compile-time errors are preferable.

---

## Dependencies

- **Depends on**: None (standalone type fixes)
- **Blocks**: task-47 (Finances Code Quality -- JSDoc, Rate Limits, Tests, Naming Fixes)

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/13-finances.yaml` |
| Module source | `src/modules/finances/index.ts` (125 lines, 6 methods) |
| Types file | `src/types/finances.types.ts` (251 lines, 6 interfaces) |
| Rate limits config | `src/config/finances-rate-limits.ts` (47 lines) |
| Story 3.1 | `docs/stories/3.1.finances-balance-transactions.md` |
| Story 3.2 | `docs/stories/3.2.finances-reports-payouts.md` |
| Story 7.9 | `docs/stories/7.9.finances-implementation-analysis.md` |
| Story 8.2 | `docs/stories/8.2.finances-delivery-method-field.md` |
| QA Gate 3.1 | `docs/qa/gates/3.1-finances-balance-transactions.yml` |
| QA Gate 3.2 | `docs/qa/gates/3.2-finances-reports-payouts.yml` |
| EPIC 47 (finances quality) | task-47 (Finances Code Quality) |
| Backlog task | `backlog/tasks/task-46` |

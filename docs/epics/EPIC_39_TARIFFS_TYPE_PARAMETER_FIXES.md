# EPIC 39: Tariffs Type & Parameter Fixes — CommissionUzbekistan fields, missing types, date param signatures

## Status: ✅ COMPLETE
**Completed**: 2026-02-06
**Backlog Task**: task-39 (Done)

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 39 |
| **Module** | tariffs (`10-tariffs.yaml`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-39 |
| **Depends On** | None |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 4.5 (Promotion & Tariffs Modules), 7.7 (Tariffs Validation Issues) |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Module implementation | `src/modules/tariffs/index.ts` | 89 lines, 4 methods |
| Types file | `src/types/tariffs.types.ts` | 227 lines, 18 interfaces |
| Rate limits | `src/config/tariffs-rate-limits.ts` | 4 entries |
| Unit tests | `tests/unit/modules/tariffs.test.ts` | 668 lines, 29 tests, 6 skipped |
| Swagger spec | `wildberries_api_doc/10-tariffs.yaml` | 5 endpoints, 20 schemas |
| Swagger shards | `wildberries_api_doc/10-tariffs/` | 4 shards |

### What Is Wrong

Three critical issues have been identified in the tariffs module:

1. **CommissionUzbekistan type mismatch (CRITICAL)**: The SDK defines a single `kgvpUzbekistan` field in the `CommissionUzbekistan` interface. The swagger specification defines 3 separate fields: `kgvpMarketplaceUz` (FBS commission), `kgvpPaidStorageUz` (FBW commission), and `kgvpSupplierUz` (DBS commission). This is a data integrity bug — Uzbekistan commissions cannot be correctly represented.

2. **2 missing types (MEDIUM)**: `models.ErrorModel` (used in 400 responses) and `models.AcceptanceCoefficient` (used by the acceptance coefficients endpoint) are not present in `tariffs.types.ts`. `AcceptanceCoefficient` exists in `orders-fbw.types.ts` but also belongs in the tariffs types.

3. **Required date parameter bug (HIGH)**: 3 methods (`getTariffsBox`, `getTariffsPallet`, `getTariffsReturn`) wrap the `date` parameter inside an `options?` optional object, but the swagger requires `date` as mandatory. This causes HTTP 400 errors, as documented in story 7.7 and confirmed by 6 skipped unit tests.

### Why This Matters

- **Uzbekistan commissions are silently wrong**: Any code using `kgvpUzbekistan` gets incomplete data — FBS, FBW, and DBS commissions are collapsed into a single field that does not exist in the API response
- **Missing error type**: Without `models.ErrorModel`, 400 responses cannot be properly typed or handled
- **Methods fail at runtime**: The 3 box/pallet/return tariff methods will always return HTTP 400 when called without a date, yet the SDK signature allows omitting it
- **6 skipped tests**: Test coverage is incomplete, masking real bugs

---

## Gap Analysis

### CommissionUzbekistan Field Comparison

| SDK Field | Swagger Fields | Meaning |
|-----------|---------------|---------|
| `kgvpUzbekistan` (single field) | `kgvpMarketplaceUz` | FBS commission (marketplace fulfillment) |
| | `kgvpPaidStorageUz` | FBW commission (paid storage fulfillment) |
| | `kgvpSupplierUz` | DBS commission (supplier fulfillment) |

### Missing Types

| Schema Name | Purpose | Used By |
|-------------|---------|---------|
| `models.ErrorModel` | Standard error response for 400 status codes | All tariff endpoints |
| `models.AcceptanceCoefficient` | Acceptance coefficient data | Acceptance coefficients endpoint |

### Method Signature Issues

| Method | Current Signature | Required Signature | Impact |
|--------|------------------|-------------------|--------|
| `getTariffsBox` | `options?: { date?: string }` | `date: string` (required) | HTTP 400 without date |
| `getTariffsPallet` | `options?: { date?: string }` | `date: string` (required) | HTTP 400 without date |
| `getTariffsReturn` | `options?: { date?: string }` | `date: string` (required) | HTTP 400 without date |

---

## Implementation Approach

### Step 1: Fix CommissionUzbekistan Interface
Replace the single `kgvpUzbekistan` field with the 3 correct fields from the swagger: `kgvpMarketplaceUz`, `kgvpPaidStorageUz`, `kgvpSupplierUz`.

### Step 2: Add models.ErrorModel Type
Add the `ErrorModel` interface to `tariffs.types.ts` based on the swagger schema for 400 responses.

### Step 3: Add models.AcceptanceCoefficient Type
Add the `AcceptanceCoefficient` interface to `tariffs.types.ts` based on the swagger schema for the acceptance coefficients endpoint.

### Step 4: Fix Method Signatures
Update `getTariffsBox`, `getTariffsPallet`, and `getTariffsReturn` to make the `date` parameter required instead of wrapped in an optional object.

### Step 5: Un-skip and Fix Unit Tests
Un-skip the 6 date validation unit tests and update them to match the corrected method signatures.

### Step 6: Validate Type Safety
Run `npx tsc --noEmit` to ensure zero type errors across the project and verify no regressions.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/types/tariffs.types.ts` | Fix CommissionUzbekistan fields, add 2 new types | Medium |
| `src/modules/tariffs/index.ts` | Fix 3 method signatures (date required) | Low |
| `tests/unit/modules/tariffs.test.ts` | Un-skip 6 tests, update for new signatures | Low |

---

## Success Criteria

- [x] CommissionUzbekistan has 3 correct fields per swagger (`kgvpMarketplaceUz`, `kgvpPaidStorageUz`, `kgvpSupplierUz`)
- [x] `models.ErrorModel` type added to `tariffs.types.ts`
- [x] `models.AcceptanceCoefficient` type added to `tariffs.types.ts`
- [x] 3 method signatures require `date` parameter
- [x] 6 previously skipped tests now pass
- [x] TypeScript strict mode passes (`npx tsc --noEmit` exits 0)
- [x] No regressions in existing code importing tariffs types

---

## Risk Assessment

**Risk Level: MEDIUM**

- **CommissionUzbekistan field rename is a BREAKING CHANGE**: Any code using `kgvpUzbekistan` will fail to compile. This is intentional — the old field was incorrect and did not match the API response.
- **Date parameter signature change is technically breaking**: However, this fixes a bug — methods did not work without the date parameter, so any working consumer code was already providing it.
- **Adding new types is non-breaking**: `ErrorModel` and `AcceptanceCoefficient` are additive changes.

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/10-tariffs.yaml` |
| Swagger shards | `wildberries_api_doc/10-tariffs/` (4 shards) |
| Module source | `src/modules/tariffs/index.ts` (89 lines) |
| Types file | `src/types/tariffs.types.ts` (227 lines) |
| Unit tests | `tests/unit/modules/tariffs.test.ts` (668 lines) |
| Story 4.5 | `docs/stories/4.5.promotion-tariffs-modules.md` |
| Story 7.7 | `docs/stories/7.7.tariffs-validation-issues.md` |
| QA Gate 4.5 | `docs/qa/gates/4.5-promotion-tariffs-modules.yml` |
| EPIC 40 (code quality) | `docs/epics/EPIC_40_TARIFFS_CODE_QUALITY.md` |
| Backlog task | `backlog/tasks/task-39` |

---

## Implementation Notes

**Completed by Orchestrator + 4 Dev Agents (2026-02-06)**

### Changes Made:
1. **CommissionUzbekistan** - Fixed from single `kgvpUzbekistan` field to correct 3 fields:
   - `kgvpMarketplaceUz` (FBS commission)
   - `kgvpPaidStorageUz` (FBW commission)
   - `kgvpSupplierUz` (DBS commission)

2. **ModelsErrorModel** - Added new type for acceptance/coefficients 400 error responses (5 fields)

3. **ModelsAcceptanceCoefficient** - Added comprehensive type with 14 fields for warehouse acceptance coefficients

4. **Method signatures** - Changed getTariffsBox, getTariffsPallet, getTariffsReturn to require `date: string` directly

5. **Type aliases** - Added TariffItem, BoxTariffItem, PalletTariffItem, TariffsCommissionResponse

### Verification:
- npx tsc --noEmit: 0 errors
- Unit tests: 45/45 passed
- TDD EPIC 39: 10/10 passed

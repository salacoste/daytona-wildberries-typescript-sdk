# EPIC 28: In-Store Pickup Code Quality -- JSDoc, Naming & Rate Limit Wiring

## Overview

| Field | Value |
|-------|-------|
| Epic | 28 |
| Module | in-store-pickup |
| Priority | Medium |
| Backlog Task | task-26 |
| Target | SDK v2.7.x |
| Source Swagger | `wildberries_api_doc/06-in-store-pickup.yaml` |
| Audit Date | February 2026 |
| Endpoints Audited | 16/16 (0 new, 0 deprecated) |
| Schemas Audited | 19 schemas, 4 response types, 1 securityScheme |

---

## Problem Statement

The February 2026 swagger audit of the in-store-pickup module (`06-in-store-pickup.yaml`) confirmed full endpoint coverage (16/16 match), but uncovered four code quality issues in the generated module at `src/modules/in-store-pickup/index.ts`. None of these issues affect endpoint availability or API correctness, but they degrade developer experience, break SDK consistency, and leave rate limiting unenforced at the module layer.

**Impact summary:**

1. All 16 `@example` JSDoc blocks reference `sdk.general.*` instead of `sdk.inStorePickup.*`, making auto-generated documentation and IDE tooltips misleading.
2. One method is named `createOrdersStatu` (missing trailing `s`), breaking naming consistency.
3. Rate limit config exists with all 16 entries and correct values (`src/config/in-store-pickup-rate-limits.ts`), but zero methods pass `rateLimitKey` to `BaseClient`, so rate limiting is not enforced for any in-store-pickup call.
4. The swagger specifies that a 409 response counts as 5 requests toward the rate limit, which differs from the FBS/DBS 10x penalty. This module-specific penalty is not implemented.

---

## Detailed Gap Analysis

### 1. JSDoc Examples Bug

All 16 methods in `src/modules/in-store-pickup/index.ts` contain `@example` blocks that incorrectly reference `sdk.general.*` instead of `sdk.inStorePickup.*`. This is a code generation artifact -- the generator defaulted to the `general` module namespace.

| # | Method | Wrong Example | Correct Example |
|---|--------|---------------|-----------------|
| 1 | `getOrdersNew()` | `sdk.general.getOrdersNew()` | `sdk.inStorePickup.getOrdersNew()` |
| 2 | `updateOrdersConfirm()` | `sdk.general.updateOrdersConfirm(...)` | `sdk.inStorePickup.updateOrdersConfirm(...)` |
| 3 | `updateOrdersPrepare()` | `sdk.general.updateOrdersPrepare(...)` | `sdk.inStorePickup.updateOrdersPrepare(...)` |
| 4 | `createOrdersClient()` | `sdk.general.createOrdersClient(...)` | `sdk.inStorePickup.createOrdersClient(...)` |
| 5 | `createClientIdentity()` | `sdk.general.createClientIdentity(...)` | `sdk.inStorePickup.createClientIdentity(...)` |
| 6 | `updateOrdersReceive()` | `sdk.general.updateOrdersReceive(...)` | `sdk.inStorePickup.updateOrdersReceive(...)` |
| 7 | `updateOrdersReject()` | `sdk.general.updateOrdersReject(...)` | `sdk.inStorePickup.updateOrdersReject(...)` |
| 8 | `createOrdersStatu()` | `sdk.general.createOrdersStatu(...)` | `sdk.inStorePickup.createOrdersStatus(...)` |
| 9 | `getClickCollectOrders()` | `sdk.general.getClickCollectOrders(...)` | `sdk.inStorePickup.getClickCollectOrders(...)` |
| 10 | `updateOrdersCancel()` | `sdk.general.updateOrdersCancel(...)` | `sdk.inStorePickup.updateOrdersCancel(...)` |
| 11 | `getOrdersMeta()` | `sdk.general.getOrdersMeta(...)` | `sdk.inStorePickup.getOrdersMeta(...)` |
| 12 | `deleteOrdersMeta()` | `sdk.general.deleteOrdersMeta(...)` | `sdk.inStorePickup.deleteOrdersMeta(...)` |
| 13 | `updateMetaSgtin()` | `sdk.general.updateMetaSgtin(...)` | `sdk.inStorePickup.updateMetaSgtin(...)` |
| 14 | `updateMetaUin()` | `sdk.general.updateMetaUin(...)` | `sdk.inStorePickup.updateMetaUin(...)` |
| 15 | `updateMetaImei()` | `sdk.general.updateMetaImei(...)` | `sdk.inStorePickup.updateMetaImei(...)` |
| 16 | `updateMetaGtin()` | `sdk.general.updateMetaGtin(...)` | `sdk.inStorePickup.updateMetaGtin(...)` |

**Root Cause:** The code generator template uses a hardcoded or default module name (`general`) for `@example` blocks instead of deriving the SDK accessor from the module being generated.

**Fix Scope:** The generator template should be fixed to prevent recurrence. The module source should also be patched directly.

### 2. Method Name Typo

The method `createOrdersStatu` (line 156 of the module) is missing the trailing `s`. The correct name should be `createOrdersStatus`, matching the Swagger `operationId` pattern and the endpoint path `/api/v3/click-collect/orders/status`.

**Current:**
```typescript
async createOrdersStatu(data: ApiOrdersRequest): Promise<ApiOrderStatuses> {
```

**Correct:**
```typescript
async createOrdersStatus(data: ApiOrdersRequest): Promise<ApiOrderStatuses> {
```

**Backward Compatibility:** To avoid breaking existing consumers, add a deprecated alias:

```typescript
/** @deprecated Use createOrdersStatus instead. Will be removed in v3.0.0. */
createOrdersStatu = this.createOrdersStatus.bind(this);
```

### 3. Rate Limit Keys Not Wired

The rate limit configuration file `src/config/in-store-pickup-rate-limits.ts` contains all 16 entries with correct values extracted from the swagger, organized into 4 tiers:

| Tier | RPM | Interval | Burst | Keys (count) |
|------|-----|----------|-------|---------------|
| Tier 1 (Assembly Tasks GET) | 300 | 200ms | 20 | `clickCollectOrdersNew`, `postClickCollectOrdersClient`, `postClickCollectOrdersStatus`, `clickCollectOrders`, `clickCollectOrdersMeta`, `deleteClickCollectOrdersMeta` (6) |
| Tier 2 (State Transitions) | 100 | 600ms | 20 | `patchClickCollectOrdersConfirm`, `patchClickCollectOrdersPrepare`, `patchClickCollectOrdersReceive`, `patchClickCollectOrdersReject`, `patchClickCollectOrdersCancel` (5) |
| Tier 3 (Identity Check) | 30 | 2s | 20 | `postClickCollectOrdersClientIdentity` (1) |
| Tier 4 (Metadata Binding) | 1000 | 60ms | 20 | `putClickCollectOrdersMetaSgtin`, `putClickCollectOrdersMetaUin`, `putClickCollectOrdersMetaImei`, `putClickCollectOrdersMetaGtin` (4) |

**The problem:** None of the 16 methods in `InStorePickupModule` pass a `rateLimitKey` option to `BaseClient.get()`, `BaseClient.post()`, `BaseClient.patch()`, `BaseClient.put()`, or `BaseClient.delete()`. The config exists but is never consumed.

**Example of current (unwired) code:**
```typescript
async getOrdersNew(): Promise<ApiNewOrders> {
  return this.client.get<ApiNewOrders>(
    'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/new'
  );
}
```

**Required fix -- add `rateLimitKey` to every call:**
```typescript
async getOrdersNew(): Promise<ApiNewOrders> {
  return this.client.get<ApiNewOrders>(
    'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/new',
    { rateLimitKey: 'in-store-pickup.clickCollectOrdersNew' }
  );
}
```

**Full wiring map (method -> config key):**

| Method | Config Key |
|--------|-----------|
| `getOrdersNew()` | `in-store-pickup.clickCollectOrdersNew` |
| `updateOrdersConfirm()` | `in-store-pickup.patchClickCollectOrdersConfirm` |
| `updateOrdersPrepare()` | `in-store-pickup.patchClickCollectOrdersPrepare` |
| `createOrdersClient()` | `in-store-pickup.postClickCollectOrdersClient` |
| `createClientIdentity()` | `in-store-pickup.postClickCollectOrdersClientIdentity` |
| `updateOrdersReceive()` | `in-store-pickup.patchClickCollectOrdersReceive` |
| `updateOrdersReject()` | `in-store-pickup.patchClickCollectOrdersReject` |
| `createOrdersStatus()` | `in-store-pickup.postClickCollectOrdersStatus` |
| `getClickCollectOrders()` | `in-store-pickup.clickCollectOrders` |
| `updateOrdersCancel()` | `in-store-pickup.patchClickCollectOrdersCancel` |
| `getOrdersMeta()` | `in-store-pickup.clickCollectOrdersMeta` |
| `deleteOrdersMeta()` | `in-store-pickup.deleteClickCollectOrdersMeta` |
| `updateMetaSgtin()` | `in-store-pickup.putClickCollectOrdersMetaSgtin` |
| `updateMetaUin()` | `in-store-pickup.putClickCollectOrdersMetaUin` |
| `updateMetaImei()` | `in-store-pickup.putClickCollectOrdersMetaImei` |
| `updateMetaGtin()` | `in-store-pickup.putClickCollectOrdersMetaGtin` |

### 4. 409 Penalty Discrepancy

The swagger description for every in-store-pickup endpoint includes this statement (translated):

> One request with response code `409` counts as 5 requests

This is a **module-specific** penalty. For comparison:
- **FBS/FBW modules**: 409 penalty is **10x** (one 409 counts as 10 requests)
- **In-Store Pickup module**: 409 penalty is **5x** (one 409 counts as 5 requests)

The penalty must be implemented in the rate limiter integration for this module. When a 409 response is received, the rate limiter should consume 4 additional tokens (since 1 was already consumed for the request itself).

**Infrastructure gap:** The current `RateLimitConfig` interface (`src/client/rate-limiter.ts`) has 3 fields (`requestsPerMinute`, `intervalSeconds`, `burstLimit`) but NO `penaltyMultiplier` field. The `_TokenBucket` class has `consume()` (always consumes 1 token) but NO `consumeTokens(count)` method. Both need to be extended:

```typescript
// src/client/rate-limiter.ts — RateLimitConfig additions
export interface RateLimitConfig {
  requestsPerMinute: number;
  intervalSeconds?: number;
  burstLimit?: number;
  penaltyMultiplier?: number;  // NEW: tokens consumed per 409 response (default: 1)
}
```

```typescript
// src/client/rate-limiter.ts — _TokenBucket additions
class _TokenBucket {
  // ... existing code ...

  /** Consume multiple tokens (for 409 penalty). */
  consumeMultiple(count: number): void {
    this.refill();
    this.tokens = Math.max(0, this.tokens - count);
  }
}

// RateLimiter public method
reportPenalty(key: string, statusCode: number): void {
  const config = this.getConfiguration(key);
  if (!config?.penaltyMultiplier || statusCode !== 409) return;
  const bucket = this.getOrCreateBucket(key);
  // 1 token already consumed by the request; consume remaining penalty
  bucket?.consumeMultiple(config.penaltyMultiplier - 1);
}
```

**Module-level usage:**
```typescript
catch (error) {
  if (error.response?.status === 409) {
    this.client.rateLimiter.reportPenalty(rateLimitKey, 409);
    throw new InvalidOrderStateError(orderId, error);
  }
}
```

**Cross-module note:** This infrastructure change also benefits FBS (10x penalty) and DBS (10x penalty). The `penaltyMultiplier` field should be set per-module in each rate limit config file:
- `in-store-pickup-rate-limits.ts`: `penaltyMultiplier: 5`
- `orders-fbs-rate-limits.ts`: `penaltyMultiplier: 10`
- `orders-dbs-rate-limits.ts`: `penaltyMultiplier: 10`

---

## Implementation Approach

### Step 1: Fix Code Generator Template

Update the code generation template to derive the `@example` module accessor from the module name being generated, not a hardcoded default. This prevents the bug from recurring on regeneration.

### Step 2: Fix JSDoc Examples in Module Source

Replace all 16 occurrences of `sdk.general.` with `sdk.inStorePickup.` in `src/modules/in-store-pickup/index.ts`.

### Step 3: Fix Method Name Typo

1. Rename `createOrdersStatu` to `createOrdersStatus`.
2. Add a deprecated alias `createOrdersStatu` that delegates to `createOrdersStatus`.
3. Update the JSDoc `@example` block to use the corrected name.

### Step 4: Wire Rate Limit Keys

Add `rateLimitKey` option to all 16 BaseClient calls using the keys from `src/config/in-store-pickup-rate-limits.ts`.

### Step 5: Implement 409 Penalty (5x)

Add 409 error interception to all state-transition methods (confirm, prepare, receive, reject, cancel) and metadata methods that consume additional rate limit tokens on conflict responses.

### Step 6: Validate

- Run `npm run type-check` to confirm no type regressions.
- Run `npm run lint` to confirm code style compliance.
- Run existing test suite to confirm no regressions.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/client/rate-limiter.ts` | Add `penaltyMultiplier` to `RateLimitConfig`, add `consumeMultiple()` to `_TokenBucket`, add `reportPenalty()` to `RateLimiter` |
| `src/modules/in-store-pickup/index.ts` | Fix 16 JSDoc examples, rename method, wire 16 rate limit keys, add 409 penalty handling |
| `src/config/in-store-pickup-rate-limits.ts` | Add `penaltyMultiplier: 5` to all 16 entries |
| `tools/generate-sdk.ts` (or equivalent generator) | Fix template to derive module accessor name |
| `src/errors/in-store-pickup-errors.ts` | Verify `InvalidOrderStateError` exists or create it |

---

## Risk Assessment

**Overall Risk: LOW**

| Factor | Assessment |
|--------|-----------|
| Endpoint changes | None -- 16/16 endpoints match swagger exactly |
| Schema changes | None -- 19 schemas unchanged |
| Breaking changes | Minimal -- method rename uses deprecated alias for backward compatibility |
| Rate limit values | Confirmed correct in existing config file |
| Test impact | No existing test files to break (see EPIC 29 for test creation) |
| Dependency impact | None -- changes are isolated to the in-store-pickup module |

**Mitigation:**
- The deprecated alias for `createOrdersStatu` ensures existing code continues to work.
- Rate limit wiring adds enforcement where none existed, which is strictly additive.
- JSDoc fixes are documentation-only changes with zero runtime impact.

---

## Related Documents

| Document | Relationship |
|----------|-------------|
| [EPIC 29: In-Store Pickup Test Coverage](./EPIC_29_PICKUP_TEST_COVERAGE.md) | Companion epic for test creation |
| [Story 4.6: In-Store Pickup Management](../stories/4.6.in-store-pickup-management.md) | Original implementation story |
| [Story 7.6: In-Store Pickup Analysis](../stories/7.6.in-store-pickup-analysis.md) | Runtime analysis script (superseded by this audit) |

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-04 | 1.0 | Initial epic creation from February 2026 swagger audit | Technical Writer |

---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
sprint: 1
release: v3.4.0-rc
inputDocuments:
  - docs/epics.md
  - backlog/tasks/task-77
  - backlog/tasks/task-67
  - backlog/tasks/task-68
  - backlog/tasks/task-72
  - backlog/tasks/task-73
  - backlog/tasks/task-74
  - backlog/tasks/task-75
  - backlog/tasks/task-78
  - backlog/tasks/task-80
---

# Sprint 1: Type Alignment + Token Awareness (v3.4.0-rc)

## Overview

Sprint 1 delivers two independent PRs: token type configuration (Epic 1 Phase A) and batch type fixes (Epic 5). All changes are backward compatible.

## Epic 1 (Phase A): Rate Limit Intelligence — Token Type Awareness

### Story 1.1: Token Type Configuration

As an SDK consumer,
I want to specify my WB token type when initializing the SDK,
So that the SDK can warn me about reduced rate limits for Basic/Test tokens.

**PR #1 — Separate PR**

#### Files to modify:

| File | Change |
|------|--------|
| `src/config/sdk-config.ts` | Add `tokenType?: 'personal' \| 'service' \| 'basic' \| 'test'` to `SDKConfig` |
| `src/index.ts` | Read `tokenType` from config (default `'personal'`), log warning for basic/test |
| `tests/unit/index.test.ts` | Test: no warning for personal, warning for basic/test |
| `docs/guides/configuration.md` | Add "Token Types" section |

#### Acceptance Criteria:

**Given** a developer initializes WildberriesSDK with `tokenType: 'basic'`
**When** the SDK is created
**Then** a warning is logged: "Basic token detected. Reduced rate limits apply. Upgrade to Personal or Service token. See https://dev.wildberries.ru/news/281"
**And** `tokenType` is stored internally for future Phase B rate limit logic

**Given** a developer initializes WildberriesSDK with `tokenType: 'test'`
**When** the SDK is created
**Then** the same warning is logged (test tokens have same reduced limits as basic)

**Given** a developer initializes WildberriesSDK without `tokenType`
**When** the SDK is created
**Then** default is `'personal'`, no warning logged
**And** zero behavioral change from current SDK (backward compatible)

**Given** a developer initializes WildberriesSDK with `tokenType: 'service'`
**When** the SDK is created
**Then** no warning logged (service tokens have full limits)

#### Implementation checklist:

- [ ] Add `TokenType` type alias and `tokenType` to `SDKConfig` interface
- [ ] Default to `'personal'` in SDK constructor
- [ ] Log warning at `warn` level for `'basic'` or `'test'`
- [ ] Unit tests for all 4 token types
- [ ] Update docs/guides/configuration.md with Token Types section
- [ ] `npm run type-check` passes
- [ ] All existing tests pass

---

## Epic 5: Type Safety & API Compliance

### Story 5.1: Batch Type Alignment Sprint

As an SDK consumer,
I want all TypeScript types to accurately reflect the current WB API responses,
So that I get correct autocomplete, type checking, and no runtime surprises.

**PR #2 — Single batch PR**

#### Execution order (by file):

**1. `src/types/products.types.ts` (task-67)**

```typescript
// Line 30-37: Change additionalErrors type
// FROM:
additionalErrors?: { string?: string } | string | { error: string };
// TO:
additionalErrors?: Record<string, string> | string | { error: string };
```

Also fix `ResponseBodyContentError400.additionalErrors` (line ~64):
```typescript
// FROM:
additionalErrors?: Record<string, never>;
// TO:
additionalErrors?: Record<string, string>;
```

**2. `src/types/analytics.types.ts` (task-68)**

Add `currency?: string` to 3 interfaces:

```typescript
// SalesFunnelProductsResponse (~line 1642): add field
currency?: string;

// SalesFunnelProductsHistoryResponse (~line 1653): add to array element
currency?: string;

// SalesFunnelGroupedHistoryResponse (~line 1661): add to array element
currency?: string;
```

**3. `src/types/orders-fbw.types.ts` (task-72)**

```typescript
// ModelsOptionsResultModel.result[].warehouses[] (~line 356): add
canBoxOnPallet?: boolean;

// ModelsSupply (~line 249, before closing brace): add
boxTypeID?: number;
isBoxOnPallet?: boolean;

// ModelsSupplyDetails (~line 178, after boxTypeName): add
isBoxOnPallet?: boolean;
```

**4. `src/types/orders-fbs.types.ts` (task-75 + task-80)**

```typescript
// Supply interface (~line 532, before closing brace): add
/** Whether this supply contains B2B orders */
isB2b?: boolean;

// CrossBorderStickerItem (~line 300, before closing brace): add
/** Sticker generation status: awaitingTrackNumber = not ready, ready = can download */
status?: 'awaitingTrackNumber' | 'ready';
```

**5. `src/types/general.types.ts` (task-78)**

```typescript
// SellerInfoResponse (~line 70, before closing brace): add
/** ИНН продавца (Taxpayer Identification Number) */
tin?: string;
```

**6. `src/modules/orders-dbs/index.ts` (task-73)**

Update JSDoc for `deliverBulk()` method (~line 580):
- Add `@throws {WBAPIError} 409 — ImeiIsNotFilled: IMEI not attached to order. Check requiredMeta via getNewOrders()`
- Update @example to show requiredMeta check workflow

**7. `src/modules/general/index.ts` (task-74)**

Update JSDoc for 4 user management methods (createInvite, getUsers, updateUserAccess, deleteUser):
- Add note: "Requires Personal Token (category: Users) from active profile owner"
- Add note: "Available for all countries"

**8. Test file updates**

| Test file | Mock updates |
|-----------|-------------|
| `tests/unit/modules/general.test.ts` | Add `tin: '1234567890'` to sellerInfo mock |
| `tests/unit/modules/analytics.test.ts` | Add `currency: 'RUB'` to 3 sales funnel mocks |
| `tests/unit/modules/orders-fbs.test.ts` | Add `isB2b: false` to supply mock, `status: 'ready'` to sticker mock |
| `tests/unit/modules/orders-fbw.test.ts` | Add `isBoxOnPallet: false`, `boxTypeID: 1` to supply mocks, `canBoxOnPallet: true` to acceptance mock |

#### Acceptance Criteria:

**Given** `ResponseCardCreate.additionalErrors` (task-67)
**When** WB returns `{ "vendorCode1": "merging error" }` for Beauty/Household Chemicals
**Then** TypeScript accepts it as `Record<string, string>`

**Given** Sales Funnel responses (task-68)
**When** API returns `currency: "RUB"`
**Then** `SalesFunnelProductsResponse.currency`, `SalesFunnelProductsHistoryResponse[].currency`, `SalesFunnelGroupedHistoryResponse[].currency` are all typed

**Given** FBW supply types (task-72)
**When** API returns new supply type fields
**Then** `ModelsOptionsResultModel` has `canBoxOnPallet`, `ModelsSupply` has `boxTypeID` + `isBoxOnPallet`, `ModelsSupplyDetails` has `isBoxOnPallet`

**Given** FBS Supply (task-75)
**When** API returns B2B flag
**Then** `Supply.isB2b` is typed as `boolean | undefined`

**Given** Cross-border sticker (task-80)
**When** sticker is generating
**Then** `CrossBorderStickerItem.status` is `'awaitingTrackNumber' | 'ready' | undefined`

**Given** SellerInfoResponse (task-78)
**When** API returns ИНН
**Then** `SellerInfoResponse.tin` is typed as `string | undefined`

**Given** deliverBulk() JSDoc (task-73)
**When** developer reads the method
**Then** they see 409 ImeiIsNotFilled warning and requiredMeta workflow

**Given** User Management JSDoc (task-74)
**When** developer reads the methods
**Then** they see Personal Token requirement

#### Implementation checklist:

- [ ] products.types.ts: additionalErrors → Record<string, string>
- [ ] analytics.types.ts: currency field × 3 types
- [ ] orders-fbw.types.ts: canBoxOnPallet + boxTypeID + isBoxOnPallet
- [ ] orders-fbs.types.ts: Supply.isB2b + CrossBorderStickerItem.status
- [ ] general.types.ts: SellerInfoResponse.tin
- [ ] orders-dbs/index.ts: deliverBulk() JSDoc (409 IMEI)
- [ ] general/index.ts: User Management JSDoc (token requirements)
- [ ] general.test.ts: tin in mock
- [ ] analytics.test.ts: currency in mocks
- [ ] orders-fbs.test.ts: isB2b + status in mocks
- [ ] orders-fbw.test.ts: isBoxOnPallet + boxTypeID + canBoxOnPallet in mocks
- [ ] `npm run type-check` passes
- [ ] All 2041+ tests pass

---

## Sprint 1 Gates

| Gate | Criteria |
|------|----------|
| Type safety | `npm run type-check` — zero errors |
| Test suite | `npx vitest run` — all pass |
| PR #1 | Story 1.1 merged to main |
| PR #2 | Story 5.1 merged to main |
| Tag | `v3.4.0-rc` |

## Sprint 1 Summary

| Metric | Value |
|--------|-------|
| Stories | 2 (1.1 + 5.1) |
| Backlog tasks | 9 (task-67,68,72,73,74,75,77,78,80) |
| Files modified | ~14 |
| Lines changed | ~100 |
| New tests | ~4 mock updates |
| Estimated time | 1.5-2 hours |

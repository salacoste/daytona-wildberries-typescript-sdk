# Epic 15: General API Compliance & Error Response Standardization

**Epic Goal**: Fix incorrect rate limit values in the General module, add cross-cutting `application/problem+json` (RFC 7807) error response support to the SDK, and enrich GeneralModule JSDoc with full swagger metadata.

**Target Completion**: Epic 15.x (Stories 15.1-15.3)
**SDK Version**: 2.8.0
**Status**: TO DO

**Business Value**:
- Eliminates spurious 429 errors caused by overly permissive placeholder rate limits in production
- Enables the SDK to correctly parse structured error responses from all WB API endpoints that have migrated to RFC 7807
- Enriched JSDoc improves developer experience with accurate rate limit info, method descriptions, and documentation links
- Cross-cutting error handling improvement benefits all 12+ SDK modules

---

## Epic 15 Overview

### Strategic Context

An audit of the General module (`src/modules/general/index.ts`, `src/config/general-rate-limits.ts`) against the updated `01-general.yaml` specification revealed three compliance gaps:

1. **Rate limits are placeholders** -- all three endpoints use identical `{ requestsPerMinute: 10, intervalSeconds: 6, burstLimit: 5 }` values that do not match the actual WB API limits, leading to SDK users being rate-limited unexpectedly.

2. **Error content-type changed** -- Wildberries migrated 401 and 429 error responses from `application/json` to `application/problem+json` (RFC 7807). The current `BaseClient` error handling may not recognize this content-type, causing error details to be lost.

3. **JSDoc is minimal** -- GeneralModule methods have bare-minimum documentation without rate limit tables, full descriptions, or links to official WB docs.

### Technical Context

**API Documentation**: `wildberries_api_doc/01-general.yaml`
**Affected Files**: 7 files across config, client, errors, and modules layers

**Priority**: Epic 15 should be completed BEFORE Epic 14 (User Management), because:
- Story 15.2 (problem+json support) is cross-cutting and will affect how the new User Management module handles errors
- Story 15.1 (rate limit fix) addresses a production correctness issue

### Dependencies

**Depends On:**
- Epic 1 Complete -- Foundation infrastructure (BaseClient, RateLimiter, error classes)

**Depended On By:**
- Epic 14 (User Management) -- benefits from corrected error handling and patterns

---

## Story Breakdown

### Story 15.1: Fix General Module Rate Limit Configuration (CRITICAL)

**Priority**: CRITICAL -- Production correctness fix
**Estimated Complexity**: LOW
**Status**: TO DO
**Backlog Task**: `task-12.1`

**Description**: Replace placeholder rate limit values in `src/config/general-rate-limits.ts` with the actual values from the swagger specification. This is a configuration-only change with no logic modifications.

**Current vs Correct Values**:

| Endpoint | Key | Current (WRONG) | Correct (from swagger) |
|----------|-----|-----------------|----------------------|
| `/ping` | `general.ping` | `{ requestsPerMinute: 10, intervalSeconds: 6, burstLimit: 5 }` | `{ requestsPerMinute: 6, intervalSeconds: 10, burstLimit: 3 }` |
| `/api/communications/v2/news` | `general.communicationsNews` | `{ requestsPerMinute: 10, intervalSeconds: 6, burstLimit: 5 }` | `{ requestsPerMinute: 1, intervalSeconds: 60, burstLimit: 10 }` |
| `/api/v1/seller-info` | `general.sellerInfo` | `{ requestsPerMinute: 10, intervalSeconds: 6, burstLimit: 5 }` | `{ requestsPerMinute: 1, intervalSeconds: 60, burstLimit: 10 }` |

**Swagger Sources**:
- Ping: `01-general.yaml` line 72 -- "Maksimum 3 zaprosa za 30 sekund"
- News: `01-general.yaml` lines 113-116 -- rate limit table (1 req/min, burst 10)
- Seller Info: `01-general.yaml` lines 232-235 -- rate limit table (1 req/min, burst 10)

**Impact Analysis**:
- **Ping**: Current config allows ~10 req/min; actual limit is 6 req/min (3 per 30s). SDK users sending >6 pings/min will get 429s.
- **News/SellerInfo**: Current config allows ~10 req/min; actual limit is 1 req/min. Users sending >1 req/min will be rate-limited.

**Files Modified**:
- `src/config/general-rate-limits.ts` (values only, no structural changes)
- Tests that assert on old rate limit values (if any)

**Acceptance Criteria**:
- [ ] Ping rate limit: 3 requests per 30 seconds (`requestsPerMinute: 6, intervalSeconds: 10, burstLimit: 3`)
- [ ] News rate limit: 1 request per minute with burst 10 (`requestsPerMinute: 1, intervalSeconds: 60, burstLimit: 10`)
- [ ] SellerInfo rate limit: 1 request per minute with burst 10 (`requestsPerMinute: 1, intervalSeconds: 60, burstLimit: 10`)
- [ ] RateLimiter correctly enforces updated limits
- [ ] All existing tests updated to reflect new values
- [ ] No changes to RateLimiter core logic

---

### Story 15.2: Support `application/problem+json` Error Responses (CRITICAL)

**Priority**: CRITICAL -- Cross-cutting, affects all modules
**Estimated Complexity**: HIGH
**Status**: TO DO
**Backlog Task**: `task-12.2`

**Description**: Add support for RFC 7807 `application/problem+json` error responses in the SDK's error handling pipeline. This is a cross-cutting change that flows through `BaseClient` and all error classes, benefiting every SDK module.

**Background**:
Wildberries changed the `Content-Type` of 401 and 429 error responses from `application/json` to `application/problem+json`. The RFC 7807 response format includes structured fields:

```json
Content-Type: application/problem+json

{
  "title": "unauthorized",
  "detail": "token problem; token is malformed...",
  "code": "07e4668e--a53a3d31f8b0-...",
  "requestId": "7b80742415072fe8b6b7f7761f1d1211",
  "origin": "s2s-api-auth-catalog",
  "status": 401,
  "statusText": "Unauthorized",
  "timestamp": "2024-09-30T06:52:38Z"
}
```

**New Fields to Extract**:
- `title` -- Short error classification
- `detail` -- Human-readable explanation
- `code` -- WB internal error code
- `requestId` -- Correlation ID (already partially supported)
- `origin` -- Originating WB service
- `status` / `statusText` -- HTTP status info
- `timestamp` -- ISO 8601 timestamp of the error

**Swagger Source**: `01-general.yaml` lines 968-1051 (401 and 429 response definitions)

**Files Modified**:

| File | Size | Changes |
|------|------|---------|
| `src/client/base-client.ts` | 18,598 bytes | Detect `application/problem+json` content-type; extract RFC 7807 fields; pass to error constructors |
| `src/errors/base-error.ts` | 3,804 bytes | Add optional fields: `origin`, `timestamp`; update `toJSON()` and `getUserMessage()` |
| `src/errors/auth-error.ts` | 1,965 bytes | Accept and forward new fields from `WBAPIError` |
| `src/errors/rate-limit-error.ts` | 2,653 bytes | Accept and forward new fields from `WBAPIError` |

**Backward Compatibility Requirements**:
- Existing `application/json` error responses MUST continue to work unchanged
- Error class constructor signatures MUST remain backward-compatible (new fields are optional)
- Consumers catching `WBAPIError`, `AuthenticationError`, or `RateLimitError` MUST NOT break
- Content-type detection must handle: `application/problem+json`, `application/json`, missing/other content-types

**Current Error Class State**:
```typescript
// src/errors/base-error.ts -- current constructor
constructor(message: string, statusCode?: number, response?: unknown, requestId?: string)

// Needs to support (without breaking existing callers):
// - origin?: string
// - timestamp?: string
```

**Detection Logic** (for BaseClient):
```typescript
const contentType = response.headers['content-type'] ?? '';
const isProblemJson = contentType.includes('application/problem+json');

if (isProblemJson) {
  // Extract RFC 7807 fields: title, detail, code, requestId, origin, status, timestamp
} else {
  // Existing JSON error parsing (backward compatibility)
}
```

**Acceptance Criteria**:
- [ ] BaseClient detects and parses `application/problem+json` content-type
- [ ] RFC 7807 fields extracted: `title`, `detail`, `code`, `requestId`, `origin`, `status`, `statusText`, `timestamp`
- [ ] Existing `application/json` error parsing unaffected (backward compatible)
- [ ] Error class constructors accept new fields without breaking existing usage
- [ ] `WBAPIError` gains `origin` and `timestamp` optional properties
- [ ] Unit tests cover both `application/json` and `application/problem+json` error parsing
- [ ] Integration tests verify 401 and 429 handling with new content-type
- [ ] Cross-module validation -- error handling works for all modules

---

### Story 15.3: Enrich General Module JSDoc (MEDIUM)

**Priority**: MEDIUM -- Developer experience improvement
**Estimated Complexity**: LOW
**Status**: TO DO
**Backlog Task**: `task-12.3`
**Depends On**: Story 15.1

**Description**: Enrich JSDoc comments on `GeneralModule` methods with full descriptions from the updated swagger, including rate limit tables, domain tables, `@readonly` annotations, and `@see` links. Documentation-only change -- no runtime code modifications.

**Current State**:
The `src/modules/general/index.ts` (60 lines) has minimal JSDoc: only `@returns`, `@throws`, and `@example` tags. Missing: rate limit info, full descriptions, `@readonly`, `@see` links.

**Enrichment Plan**:

| Method | Additions |
|--------|-----------|
| `ping()` | Full description (3-point check explanation), 14-category domain table, rate limit ("3 requests per 30 seconds"), `@readonly`, `@see` link |
| `news()` | Description (from/fromID usage, max 100 per request), rate limit table (1 req/min, burst 10), `@readonly`, `@see` link |
| `sellerInfo()` | Description (name and ID retrieval, any token without test circuit), rate limit table (1 req/min, burst 10), `@readonly`, `@see` link |

**Target JSDoc Format**:
```typescript
/**
 * Proverka podklyucheniya
 *
 * Metod proveryaet:
 * 1. Uspeshno li zapros dokhodit do WB API
 * 2. Validnost tokena avtorizatsii i URL zaprosa
 * 3. Sovpadayut li kategoriya tokena i servis
 *
 * **Rate limit:** Maksimum 3 zaprosa za 30 sekund.
 *
 * @readonly Metod ne izmenyaet dannye (x-readonly-method: true)
 * @returns Uspeshno -- {TS, Status: 'OK'}
 * @throws {AuthenticationError} 401
 * @throws {RateLimitError} 429
 * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Proverka-podklyucheniya-k-WB-API}
 */
```

**Files Modified**:
- `src/modules/general/index.ts` (JSDoc comments only)
- `src/types/general.types.ts` (verify and update JSDoc if swagger descriptions changed)

**Acceptance Criteria**:
- [ ] `ping()` JSDoc includes full description, rate limit, `@readonly`, `@see` link
- [ ] `news()` JSDoc includes full description, rate limit table, `@readonly`, `@see` link
- [ ] `sellerInfo()` JSDoc includes full description, rate limit table, `@readonly`, `@see` link
- [ ] All `@see` links point to official WB API documentation
- [ ] Type definition JSDoc in `general.types.ts` reviewed and updated if needed
- [ ] No runtime code changes -- only comments and documentation
- [ ] TypeDoc generation produces correct output

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `docs/epics/EPIC_15_GENERAL_COMPLIANCE.md` | This EPIC summary |

### Modified Files
| File | Changes | Story |
|------|---------|-------|
| `src/config/general-rate-limits.ts` | Fix all 3 rate limit values | 15.1 |
| `src/client/base-client.ts` | Add `application/problem+json` detection and parsing | 15.2 |
| `src/errors/base-error.ts` | Add `origin`, `timestamp` fields; update `toJSON()` | 15.2 |
| `src/errors/auth-error.ts` | Forward new fields from `WBAPIError` | 15.2 |
| `src/errors/rate-limit-error.ts` | Forward new fields from `WBAPIError` | 15.2 |
| `src/modules/general/index.ts` | Enriched JSDoc on all 3 methods | 15.3 |
| `src/types/general.types.ts` | JSDoc review and update | 15.3 |
| Tests asserting old rate limit values | Update expected values | 15.1 |
| Tests for error handling | New test cases for problem+json | 15.2 |

---

## Breaking Changes Summary

### What Does NOT Break
- All existing SDK method signatures remain unchanged
- Error class constructors are backward-compatible (new fields are optional, appended to end)
- `application/json` error parsing continues to work identically
- No changes to public API surface

### What Changes (Non-Breaking)
- Rate limits become stricter (matching actual API) -- users who were already hitting 429s will see fewer spurious errors
- Error objects may now contain additional fields (`origin`, `timestamp`) when the API returns `problem+json`
- JSDoc comments are enriched -- affects TypeDoc output and IDE hints

---

## Test Coverage

| Story | Test Scope | Files |
|-------|-----------|-------|
| 15.1 | Rate limit value assertions; RateLimiter enforcement with new values | Update existing rate limit tests |
| 15.2 | `application/problem+json` parsing; `application/json` backward compat; error field extraction; cross-module error handling | New tests in `tests/unit/client/`, `tests/unit/errors/` |
| 15.3 | TypeDoc generation validation (optional) | No runtime tests needed |

---

## Success Metrics

- Zero rate limit value mismatches between SDK config and swagger specification
- Both `application/json` and `application/problem+json` error responses correctly parsed
- `requestId`, `origin`, and `timestamp` available on error objects when provided by the API
- All 3 GeneralModule methods have complete JSDoc with rate limits, descriptions, and links
- All existing tests pass with no regressions
- No breaking changes to the public API

---

## Risk Assessment

### Low Risk
- Story 15.1 (rate limits): Pure configuration change, well-isolated
- Story 15.3 (JSDoc): Documentation-only, zero runtime impact

### Medium Risk
- Story 15.2 (problem+json): Cross-cutting change touching `BaseClient` (18KB) and 3 error classes
- Content-type detection must handle edge cases (charset suffixes, missing headers, malformed content-type)

### High Risk
- `BaseClient` modifications affect all 12 SDK modules -- thorough regression testing required
- Some WB API endpoints may still use `application/json` for errors -- dual-format support is non-negotiable

### Mitigation
- Story 15.2 must maintain full backward compatibility with `application/json` error handling
- Integration tests should cover both content-types for 401 and 429 responses
- Error class constructor changes use only optional parameters (appended, not inserted)
- Run full test suite after each story to catch regressions early
- Story execution order: 15.1 (isolated fix) then 15.2 (cross-cutting) then 15.3 (docs only)

---

## Recommended Execution Order

1. **Story 15.1** (Rate Limits Fix) -- isolated config change, immediate production benefit
2. **Story 15.2** (problem+json Support) -- cross-cutting, needed before Epic 14
3. **Story 15.3** (JSDoc Enrichment) -- depends on 15.1 values being correct, no runtime risk

---

## Backlog Task References

| Story | Backlog Task | Title |
|-------|-------------|-------|
| Epic 15 (parent) | `task-12` | EPIC 15: General API Compliance & Error Response Standardization |
| Story 15.1 | `task-12.1` | Fix General Module Rate Limit Configuration |
| Story 15.2 | `task-12.2` | Support application/problem+json Error Responses |
| Story 15.3 | `task-12.3` | Enrich General Module Documentation & JSDoc |

---

## Notes

- The rate limit placeholder values (`requestsPerMinute: 10, intervalSeconds: 6, burstLimit: 5`) appear to have been auto-generated default values that were never validated against the swagger specification
- RFC 7807 (`application/problem+json`) is an IETF standard for machine-readable error responses -- WB adopting it is a positive step toward API standardization
- The `WBAPIError` class already has a `requestId` field, which aligns with the RFC 7807 `requestId` property -- this makes Story 15.2 a natural extension rather than a redesign
- Epic 15 should be prioritized over Epic 14 to ensure the new User Management module benefits from corrected error handling from day one

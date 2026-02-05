# Epic 26: DBS Module - New Endpoints (February 2026 Swagger Update)

**Epic Goal**: Add 9 new DBS endpoints discovered in the February 2026 swagger update: 2 entirely new info endpoints and 7 bulk metadata endpoints that replace deprecated single-order metadata methods.

**Target Completion**: Epic 26.x (Stories 26.1-26.2)
**SDK Version**: 2.9.0
**Status**: DONE

**Business Value**:
- 2 new info endpoints enable paid delivery group management and delivery date retrieval
- 7 bulk metadata endpoints replace deprecated single-order methods scheduled for removal on April 13, 2026
- Prevents SDK breakage when deprecated endpoints are disabled
- Bulk metadata operations improve throughput for sellers processing high order volumes
- Adds ~19 new TypeScript schemas for complete type safety

---

## Epic 26 Overview

### Strategic Context

The February 2026 swagger update for the DBS API introduced 9 new endpoints that were not present when Epic 12 was authored. The DBS module now has **31 total operations**: 19 active and 12 deprecated.

The SDK currently implements **22 methods** (from Epic 12), but 7 of those methods call deprecated single-order metadata endpoints (`GET /api/v3/dbs/orders/{orderId}/meta`, `DELETE /api/v3/dbs/orders/{orderId}/meta`, and 5 `PUT /api/v3/dbs/orders/{orderId}/meta/*` routes). These deprecated endpoints are scheduled for removal on **April 13, 2026**. The new bulk metadata endpoints at `/api/marketplace/v3/dbs/orders/meta/*` accept arrays of order IDs and must replace the current implementations.

**Active vs Deprecated Endpoint Summary**:

| Category | Active | Deprecated | SDK Methods | Status |
|----------|--------|------------|-------------|--------|
| Core Operations (12.1) | 3 | 0 | 3 | Complete |
| Bulk Status (12.2) | 6 | 0 | 6 | Complete |
| Legacy Status (12.2) | 0 | 6 | 6 | Complete (deprecated) |
| Metadata (12.3) | 0 | 7 | 7 | **Must migrate** |
| B2B (12.4) | 1 | 0 | 1 | Complete |
| New Info (this epic) | 2 | 0 | 0 | **Must add** |
| New Bulk Meta (this epic) | 7 | 0 | 0 | **Must add** |
| **Totals** | **19** | **12** (1 status + 5 status + 6 meta from April) | **22** | |

### Technical Context

**Swagger Source**: `wildberries_api_doc/04-orders-dbs/` (4 shard files)
**Module File**: `src/modules/orders-dbs/index.ts` (714 lines)
**Types File**: `src/types/orders-dbs.types.ts`
**Rate Limit Config**: `src/config/orders-dbs-rate-limits.ts` (201 lines)
**Base URL**: `https://marketplace-api.wildberries.ru`

### Dependencies

**Depends On:**
- Epic 12 Complete - DBS module foundation (all stories 12.1-12.5)
- Epic 27 - Rate limit audit should be completed first or in parallel (rate limit keys must be correct before adding new entries)

**Blocks:**
- Any future DBS module maintenance or extension

---

## New Endpoints Detail

### Group 1: New Info Endpoints (Story 26.1)

Two entirely new endpoints with no deprecated predecessors.

| # | Method | Path | Description | Request Type | Response Type |
|---|--------|------|-------------|--------------|---------------|
| 1 | `POST` | `/api/v3/dbs/groups/info` | Get paid delivery groups | `api.OrderGroupsRequest` | `api.OrderGroup[]` |
| 2 | `POST` | `/api/v3/dbs/orders/delivery-date` | Get delivery dates for orders | `DeliveryDatesRequest` | `DeliveryDatesInfoResp` |

**Rate Limits**: Standard DBS read tier -- 300 req/min, 200ms interval, 20 burst

**SDK Method Names**:
- `getGroupsInfo(request: OrderGroupsRequest): Promise<OrderGroupsResponse>`
- `getDeliveryDates(request: DeliveryDatesRequest): Promise<DeliveryDatesInfoResponse>`

### Group 2: Bulk Metadata Migration (Story 26.2)

Seven new bulk POST endpoints replacing the deprecated single-order metadata methods. All accept arrays of order IDs for batch processing.

| # | New Bulk Endpoint | Replaces Deprecated Endpoint | Operation |
|---|-------------------|------------------------------|-----------|
| 1 | `POST /api/marketplace/v3/dbs/orders/meta/info` | `GET /api/v3/dbs/orders/{orderId}/meta` | Get metadata (bulk) |
| 2 | `POST /api/marketplace/v3/dbs/orders/meta/delete` | `DELETE /api/v3/dbs/orders/{orderId}/meta` | Delete metadata (bulk) |
| 3 | `POST /api/marketplace/v3/dbs/orders/meta/sgtin` | `PUT /api/v3/dbs/orders/{orderId}/meta/sgtin` | Set SGTIN (bulk) |
| 4 | `POST /api/marketplace/v3/dbs/orders/meta/uin` | `PUT /api/v3/dbs/orders/{orderId}/meta/uin` | Set UIN (bulk) |
| 5 | `POST /api/marketplace/v3/dbs/orders/meta/imei` | `PUT /api/v3/dbs/orders/{orderId}/meta/imei` | Set IMEI (bulk) |
| 6 | `POST /api/marketplace/v3/dbs/orders/meta/gtin` | `PUT /api/v3/dbs/orders/{orderId}/meta/gtin` | Set GTIN (bulk) |
| 7 | `POST /api/marketplace/v3/dbs/orders/meta/customs-declaration` | `PUT /api/v3/dbs/orders/{orderId}/meta/customs-declaration` | Set customs declaration (bulk) |

**Rate Limits**:
| Operation Type | Limit | Interval | Burst |
|----------------|-------|----------|-------|
| Read (`meta/info`) | 150 req/min | 400ms | 20 |
| Delete (`meta/delete`) | 150 req/min | 400ms | 20 |
| Set (`meta/sgtin`, `meta/uin`, `meta/imei`, `meta/gtin`, `meta/customs-declaration`) | 500 req/min | 120ms | 20 |

**SDK Method Names (Bulk)**:
- `getMetaBulk(orderIds: number[]): Promise<GetOrderMetaBulkResponse>`
- `deleteMetaBulk(request: DeleteMetaBulkRequest): Promise<DeleteMetaBulkResponse>`
- `setSgtinBulk(request: SetSgtinBulkRequest): Promise<SetMetaBulkResponse>`
- `setUinBulk(request: SetUinBulkRequest): Promise<SetMetaBulkResponse>`
- `setImeiBulk(request: SetImeiBulkRequest): Promise<SetMetaBulkResponse>`
- `setGtinBulk(request: SetGtinBulkRequest): Promise<SetMetaBulkResponse>`
- `setCustomsDeclarationBulk(request: SetCustomsDeclarationBulkRequest): Promise<SetMetaBulkResponse>`

**Migration Strategy**:
1. Add new bulk methods alongside existing single-order methods
2. Mark existing single-order metadata methods (`getMeta`, `deleteMeta`, `setSgtin`, `setUin`, `setImei`, `setGtin`, `setCustomsDeclaration`) with `@deprecated` JSDoc
3. Add deprecation warning pointing to the bulk replacement
4. Existing single-order methods remain functional until WB disables the endpoints (April 13, 2026)

---

## New Schemas

Approximately 19 new TypeScript schemas required from swagger components:

**Info Endpoint Schemas**:
- `OrderGroupsRequest` - Request body for groups/info
- `OrderGroup` - Paid delivery group info
- `OrderGroupsResponse` - Response wrapper for groups/info
- `DeliveryDatesRequest` - Request body for delivery-date
- `DeliveryDateInfo` - Single order delivery date record
- `DeliveryDatesInfoResponse` - Response wrapper for delivery-date

**Bulk Metadata Schemas**:
- `GetMetaBulkRequest` - Request body for meta/info
- `GetOrderMetaBulkResponse` - Response with metadata per order
- `BulkOrderMeta` - Single order metadata record in bulk response
- `DeleteMetaBulkRequest` - Request body for meta/delete (orderIds + key)
- `DeleteMetaBulkResponse` - Response for bulk delete
- `SetSgtinBulkRequest` - Bulk SGTIN set request (order ID + sgtins array per item)
- `SetUinBulkRequest` - Bulk UIN set request
- `SetImeiBulkRequest` - Bulk IMEI set request
- `SetGtinBulkRequest` - Bulk GTIN set request
- `SetCustomsDeclarationBulkRequest` - Bulk customs declaration set request
- `SetMetaBulkResponse` - Shared response type for all bulk set operations
- `BulkMetaResultItem` - Per-order result in bulk response (orderId, success, error)
- `BulkMetaError` - Error detail for individual order failures

---

## Story Breakdown

### Story 26.1: New Info Endpoints (HIGH)

**Priority**: HIGH - New functionality not available in current SDK
**Estimated Complexity**: LOW
**Story Points**: 3

**Description**: Implement 2 new info endpoints for paid delivery groups and delivery dates.

**Endpoints**:
- `POST /api/v3/dbs/groups/info` -- Get paid delivery groups
- `POST /api/v3/dbs/orders/delivery-date` -- Get delivery dates for orders

**Acceptance Criteria**:
1. `getGroupsInfo()` implemented with proper request/response types
2. `getDeliveryDates()` implemented with proper request/response types
3. All new schemas added to `src/types/orders-dbs.types.ts`
4. Rate limit entries added to `src/config/orders-dbs-rate-limits.ts`
5. Rate limit keys in config match `rateLimitKey` values in module code
6. Unit tests with >= 80% coverage
7. Integration tests with MSW
8. JSDoc documentation with examples

**Files Modified**:
- `src/modules/orders-dbs/index.ts` -- Add 2 new methods
- `src/types/orders-dbs.types.ts` -- Add ~6 new schemas
- `src/config/orders-dbs-rate-limits.ts` -- Add 2 new rate limit entries

---

### Story 26.2: Bulk Metadata Migration (CRITICAL)

**Priority**: CRITICAL - Deprecated endpoints removed April 13, 2026
**Estimated Complexity**: MEDIUM
**Story Points**: 8

**Description**: Implement 7 new bulk metadata endpoints and mark existing single-order metadata methods as deprecated. The current SDK methods `getMeta()`, `deleteMeta()`, `setSgtin()`, `setUin()`, `setImei()`, `setGtin()`, and `setCustomsDeclaration()` all call deprecated single-order endpoints that will be disabled on April 13, 2026.

**Endpoints**:
- `POST /api/marketplace/v3/dbs/orders/meta/info` -- Get metadata (bulk)
- `POST /api/marketplace/v3/dbs/orders/meta/delete` -- Delete metadata (bulk)
- `POST /api/marketplace/v3/dbs/orders/meta/sgtin` -- Set SGTIN (bulk)
- `POST /api/marketplace/v3/dbs/orders/meta/uin` -- Set UIN (bulk)
- `POST /api/marketplace/v3/dbs/orders/meta/imei` -- Set IMEI (bulk)
- `POST /api/marketplace/v3/dbs/orders/meta/gtin` -- Set GTIN (bulk)
- `POST /api/marketplace/v3/dbs/orders/meta/customs-declaration` -- Set customs declaration (bulk)

**Rate Limit Tiers**:
| Operation | Limit | Interval | Burst |
|-----------|-------|----------|-------|
| Read/delete (`meta/info`, `meta/delete`) | 150 req/min | 400ms | 20 |
| Set (`meta/sgtin`, `meta/uin`, `meta/imei`, `meta/gtin`, `meta/customs-declaration`) | 500 req/min | 120ms | 20 |

**Acceptance Criteria**:
1. 7 new bulk metadata methods implemented (`getMetaBulk`, `deleteMetaBulk`, `setSgtinBulk`, `setUinBulk`, `setImeiBulk`, `setGtinBulk`, `setCustomsDeclarationBulk`)
2. All new schemas added to `src/types/orders-dbs.types.ts` (~13 schemas)
3. Rate limit entries added with correct tier values (150/min for read/delete, 500/min for set)
4. Rate limit keys in config match `rateLimitKey` values in module code
5. Existing single-order methods (`getMeta`, `deleteMeta`, `setSgtin`, `setUin`, `setImei`, `setGtin`, `setCustomsDeclaration`) marked with `@deprecated` JSDoc pointing to bulk replacement
6. Input validation for all bulk methods (array bounds, field constraints)
7. Unit tests with >= 80% coverage for all 7 new methods
8. Integration tests with MSW covering bulk workflows
9. Migration guide from single-order to bulk metadata methods
10. JSDoc documentation with examples for all new methods

**Files Modified**:
- `src/modules/orders-dbs/index.ts` -- Add 7 new methods, deprecate 7 existing methods
- `src/types/orders-dbs.types.ts` -- Add ~13 new schemas
- `src/config/orders-dbs-rate-limits.ts` -- Add 7 new rate limit entries with correct tiers

---

## Implementation Strategy

### Phase 1: Info Endpoints (Story 26.1)
**Timeline**: 1-2 days
**Focus**: New functionality with no migration concerns
**Dependencies**: Epic 12 complete

### Phase 2: Bulk Metadata Migration (Story 26.2)
**Timeline**: 3-4 days
**Focus**: Add bulk methods, deprecate single-order methods, write migration guide
**Dependencies**: Story 26.1 complete (or can run in parallel)

**Total Epic 26 Duration**: ~4-6 days

---

## API Methods Summary (Post-Epic 26)

### New Methods Added

| Method | SDK Method | Rate Limit | Description |
|--------|-----------|------------|-------------|
| `POST /api/v3/dbs/groups/info` | `getGroupsInfo()` | 300/min | Get paid delivery groups |
| `POST /api/v3/dbs/orders/delivery-date` | `getDeliveryDates()` | 300/min | Get delivery dates |
| `POST /api/marketplace/v3/dbs/orders/meta/info` | `getMetaBulk()` | 150/min | Get metadata (bulk) |
| `POST /api/marketplace/v3/dbs/orders/meta/delete` | `deleteMetaBulk()` | 150/min | Delete metadata (bulk) |
| `POST /api/marketplace/v3/dbs/orders/meta/sgtin` | `setSgtinBulk()` | 500/min | Set SGTIN (bulk) |
| `POST /api/marketplace/v3/dbs/orders/meta/uin` | `setUinBulk()` | 500/min | Set UIN (bulk) |
| `POST /api/marketplace/v3/dbs/orders/meta/imei` | `setImeiBulk()` | 500/min | Set IMEI (bulk) |
| `POST /api/marketplace/v3/dbs/orders/meta/gtin` | `setGtinBulk()` | 500/min | Set GTIN (bulk) |
| `POST /api/marketplace/v3/dbs/orders/meta/customs-declaration` | `setCustomsDeclarationBulk()` | 500/min | Set customs declaration (bulk) |

### Methods Deprecated (Story 26.2)

| SDK Method | Deprecated Endpoint | Replacement |
|-----------|---------------------|-------------|
| `getMeta()` | `GET /api/v3/dbs/orders/{orderId}/meta` | `getMetaBulk()` |
| `deleteMeta()` | `DELETE /api/v3/dbs/orders/{orderId}/meta` | `deleteMetaBulk()` |
| `setSgtin()` | `PUT /api/v3/dbs/orders/{orderId}/meta/sgtin` | `setSgtinBulk()` |
| `setUin()` | `PUT /api/v3/dbs/orders/{orderId}/meta/uin` | `setUinBulk()` |
| `setImei()` | `PUT /api/v3/dbs/orders/{orderId}/meta/imei` | `setImeiBulk()` |
| `setGtin()` | `PUT /api/v3/dbs/orders/{orderId}/meta/gtin` | `setGtinBulk()` |
| `setCustomsDeclaration()` | `PUT /api/v3/dbs/orders/{orderId}/meta/customs-declaration` | `setCustomsDeclarationBulk()` |

**Total SDK Methods After Epic 26**: 31 (22 existing + 9 new)

---

## Breaking Changes Summary

### What Breaks
- None -- all changes are additive. Deprecated methods remain functional until April 13, 2026.

### What Does NOT Break
- All existing method signatures remain unchanged
- Existing rate limit configuration remains in place
- No type renames or removals

### Future Breaking Change (April 13, 2026)
- When WB disables deprecated endpoints, the 7 single-order metadata methods will start returning errors
- SDK consumers should migrate to bulk methods before this date
- Consider a major version bump at that time to remove deprecated methods entirely

---

## Risk Assessment

### Low Risk
- Info endpoints (Story 26.1) are purely additive with no migration concerns
- Established patterns from Epic 12 status migration apply to metadata migration

### Medium Risk
- Bulk metadata methods have different rate limits than the single-order methods they replace (150/min and 500/min vs the incorrect uniform 300/min in current config)
- April 13, 2026 deadline creates time pressure for migration

### Mitigation Strategies
- Complete Epic 27 (rate limit audit) before or in parallel to ensure correct rate limit configuration
- Clear `@deprecated` JSDoc with migration examples reduces user confusion
- Migration guide document with before/after code samples

---

## Backlog References

- **task-24**: Implementation task for Epic 26
- **task-25**: Implementation task for Epic 27 (rate limit audit -- dependency)

---

## Notes

- The February 2026 swagger update added `x-readonly-method` and `x-category` annotations to all 31 DBS operations
- Swagger source was sharded into `wildberries_api_doc/04-orders-dbs/` directory (4 files) during this update
- The bulk metadata endpoints follow the same pattern as the bulk status endpoints from Epic 12 Story 12.2
- Rate limit tiers for bulk metadata (150/min read, 500/min write) differ from the core DBS tier (300/min) -- this is important context for Epic 27

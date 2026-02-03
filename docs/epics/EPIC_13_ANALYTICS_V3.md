# Epic 13: Analytics v3 Sales Funnel Migration

**Epic Goal**: Migrate 3 Sales Funnel analytics endpoints from v2 (dead, returning 404) to v3 (active), preserving backward compatibility via deprecated wrappers.

**Target Completion**: Epic 13.x (Stories 13.1-13.4)
**SDK Version**: 2.7.0
**Status**: COMPLETED

**Business Value**:
- Restores Sales Funnel analytics functionality (v2 endpoints are dead)
- New v3 API provides additional features (comparison periods, skip deleted products)
- Backward-compatible deprecated wrappers minimize breaking changes for existing users
- Cleaner field naming conventions (camelCase, shorter names)

---

## Epic 13 Overview

### Strategic Context

Wildberries migrated their Sales Funnel ("Voronka prodazh") analytics API from v2 to v3. The old v2 endpoints (`/api/v2/nm-report/*`) began returning 404. This epic implements support for the new v3 endpoints while preserving backward compatibility.

### Technical Context

**API Documentation**: `wildberries_api_doc/11-analytics.yaml`
**Base URL**: `https://seller-analytics-api.wildberries.ru`

**API Changes:**
- OLD (dead): `POST /api/v2/nm-report/detail`, `POST /api/v2/nm-report/detail/history`, `POST /api/v2/nm-report/grouped/history`
- NEW (active): `POST /api/analytics/v3/sales-funnel/products`, `POST /api/analytics/v3/sales-funnel/products/history`, `POST /api/analytics/v3/sales-funnel/grouped/history`
- REMOVED: `POST /api/v2/nm-report/grouped` (no v3 replacement)

### Dependencies

**Depends On:**
- Epic 1 Complete - Foundation infrastructure (BaseClient, rate limiting)
- Epic 3 Complete - Analytics module (existing methods)

---

## Story Breakdown

### Story 13.1: v3 Type Definitions (CRITICAL)

**Priority**: CRITICAL - Foundation for v3 methods
**Estimated Complexity**: MEDIUM
**Status**: COMPLETED

**Description**: Define TypeScript types for v3 Sales Funnel request/response schemas from the updated Swagger specification.

**Key Deliverables**:
- `SalesFunnelProductsRequest` / `SalesFunnelProductsResponse`
- `SalesFunnelProductsHistoryRequest` / `SalesFunnelProductsHistoryResponse`
- `SalesFunnelGroupedHistoryRequest` / `SalesFunnelGroupedHistoryResponse`
- Supporting entity types: `SalesFunnelProduct`, `SalesFunnelHistoryProduct`, `SalesFunnelTag`, `SalesFunnelOrderBy`, `DatePeriod`, `AggregationLevel`
- Deprecated markers on old v2 types

**Files Modified**:
- `src/types/analytics.types.ts`

---

### Story 13.2: v3 Method Implementations (CRITICAL)

**Priority**: CRITICAL - Core functionality
**Estimated Complexity**: HIGH
**Status**: COMPLETED

**Description**: Implement 3 new v3 methods and convert 3 existing v2 methods into deprecated wrappers.

**New Methods**:
- `getSalesFunnelProducts()` -- POST /api/analytics/v3/sales-funnel/products
- `getSalesFunnelProductsHistory()` -- POST /api/analytics/v3/sales-funnel/products/history
- `getSalesFunnelGroupedHistory()` -- POST /api/analytics/v3/sales-funnel/grouped/history

**Deprecated Wrappers** (v2 methods that now delegate to v3):
- `createNmReportDetail()` -- maps v2 params to v3, calls `getSalesFunnelProducts()`
- `createDetailHistory()` -- maps v2 params to v3, calls `getSalesFunnelProductsHistory()`
- `createGroupedHistory()` -- maps v2 params to v3, calls `getSalesFunnelGroupedHistory()`

**Parameter Mapping Logic**:
- `period.begin/end` to `selectedPeriod.start/end`
- `nmIDs` to `nmIds`, `objectIDs` to `subjectIds`, `tagIDs` to `tagIds`
- `page` to `limit` + `offset` calculation
- `timezone` dropped (not supported in v3)

**Files Modified**:
- `src/modules/analytics/index.ts`
- `src/index.ts` (re-exports)

---

### Story 13.3: Documentation and Migration Guide (HIGH)

**Priority**: HIGH - Developer experience
**Estimated Complexity**: MEDIUM
**Status**: COMPLETED

**Key Deliverables**:
- Migration guide: `docs/guides/migration-v2.7-analytics-v3.md`
- CHANGELOG entry for v2.7.0
- Updated examples README
- Updated guides index
- EPIC summary document

**Files Created/Modified**:
- `docs/guides/migration-v2.7-analytics-v3.md` (new)
- `docs/epics/EPIC_13_ANALYTICS_V3.md` (new)
- `docs/guides/index.md` (updated)
- `docs/PROJECT_STATUS_SUMMARY.md` (updated)
- `examples/README.md` (updated)
- `CHANGELOG.md` (updated)

---

### Story 13.4: Unit Tests (HIGH)

**Priority**: HIGH - Quality assurance
**Estimated Complexity**: MEDIUM
**Status**: COMPLETED

**Key Deliverables**:
- Type validation tests for v3 request/response types
- Method implementation tests (correct endpoint, correct data passing)
- Deprecated wrapper tests (parameter mapping verification)
- Integration with existing analytics test suite

**Files Created**:
- `tests/unit/types/analytics-v3-types.test.ts`
- `tests/unit/modules/analytics-v3-methods.test.ts`

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `tests/unit/types/analytics-v3-types.test.ts` | Type definition tests |
| `tests/unit/modules/analytics-v3-methods.test.ts` | Method implementation tests |
| `docs/guides/migration-v2.7-analytics-v3.md` | Migration guide |
| `docs/epics/EPIC_13_ANALYTICS_V3.md` | This EPIC summary |

### Modified Files
| File | Changes |
|------|---------|
| `src/types/analytics.types.ts` | Added v3 types, deprecated v2 types |
| `src/modules/analytics/index.ts` | Added 3 v3 methods, converted 3 v2 methods to deprecated wrappers |
| `src/index.ts` | Re-exported new types |
| `src/config/analytics-rate-limits.ts` | Added rate limits for v3 endpoints |
| `wildberries_api_doc/11-analytics.yaml` | Updated to latest spec with v3 paths |
| `CHANGELOG.md` | v2.7.0 entry |
| `package.json` | Version bump to 2.7.0 |
| `docs/PROJECT_STATUS_SUMMARY.md` | Updated metrics |
| `docs/guides/index.md` | Added migration guide link |
| `examples/README.md` | Updated analytics-dashboard description |

---

## Breaking Changes Summary

### What Breaks
- Code that directly calls v2 endpoints will get 404 (this was already broken before SDK update)
- Deprecated wrapper methods return v3 response shapes cast to v2 types -- field names in the actual response data will be v3 names

### What Does NOT Break
- Calling deprecated v2 methods (`createNmReportDetail`, etc.) still works -- they internally delegate to v3
- All other analytics methods (CSV reports, search queries, stock history) are unchanged
- No changes to SDK initialization or configuration

### Migration Effort
- **No migration needed** if you are okay with deprecated warnings
- **15-30 minutes** to fully migrate to v3 method names and types
- **Zero configuration changes** required

---

## API Methods Summary (Post-Migration)

### New v3 Methods
| SDK Method | Endpoint | Description |
|---|---|---|
| `getSalesFunnelProducts()` | `POST /api/analytics/v3/sales-funnel/products` | Product statistics for period |
| `getSalesFunnelProductsHistory()` | `POST /api/analytics/v3/sales-funnel/products/history` | Product statistics by day/week |
| `getSalesFunnelGroupedHistory()` | `POST /api/analytics/v3/sales-funnel/grouped/history` | Grouped statistics by day/week |

### Deprecated v2 Wrappers
| SDK Method | Status | Replacement |
|---|---|---|
| `createNmReportDetail()` | @deprecated | `getSalesFunnelProducts()` |
| `createDetailHistory()` | @deprecated | `getSalesFunnelProductsHistory()` |
| `createGroupedHistory()` | @deprecated | `getSalesFunnelGroupedHistory()` |

### Unchanged Methods (13 methods)
- `getNmReportDownloads()`, `createNmReportDownload()`, `createDownloadsRetry()`, `getDownloadsFile()`
- `createSearchReportReport()`
- `createTableGroup()`, `createTableDetail()`
- `createProductSearchText()`, `createProductOrder()`
- `createProductsGroup()`, `createProductsProduct()`, `createProductsSize()`
- `createStocksReportOffice()`

**Total Analytics Module Methods**: 19 (3 new v3 + 3 deprecated v2 wrappers + 13 unchanged)

---

## Test Coverage

| Test File | Tests | Coverage |
|---|---|---|
| `analytics-v3-types.test.ts` | Type assignability, field presence, enum values | v3 type definitions |
| `analytics-v3-methods.test.ts` | Endpoint URLs, parameter passing, deprecated wrapper mapping | v3 method implementations |

---

## Success Metrics

- All v3 endpoints return correct data
- Deprecated wrappers correctly map v2 params to v3
- Zero TypeScript compilation errors
- All existing analytics tests still pass
- Migration guide provides clear upgrade path

---

## Risk Assessment

### Low Risk
- v3 endpoints are already active and documented by Wildberries
- Backward-compatible wrappers minimize impact on existing users
- Established patterns from analytics module

### Medium Risk
- Deprecated wrappers return v3 response shapes -- code accessing specific v2 field names may need updates
- `POST /api/v2/nm-report/grouped` has no v3 replacement (removed by WB)

### Mitigation
- Clear deprecation markers with JSDoc
- Comprehensive migration guide with before/after examples
- Type-safe v3 interfaces prevent common mistakes

---

## Notes

- The Swagger spec `11-analytics.yaml` was updated to reflect the v3 paths
- The old spec was archived as `11-analytics.v2-deprecated.yaml` for reference
- Rate limits for v3 endpoints remain the same as v2: 3 requests/minute, 20-second interval, 3-request burst

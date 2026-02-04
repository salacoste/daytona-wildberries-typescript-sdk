# Epic 16: Products Module - Brands Endpoint & New Schemas

**Epic Goal**: Add the new GET `/api/content/v1/brands` endpoint and associated schemas (BrandsResponse, BrandsResponseError) to the Products module.

**Target Completion**: Epic 16 (Single story)

**Business Value**:
- Expose brand lookup by subject ID for product card creation workflows
- Cursor-based pagination for large brand catalogs (hundreds of thousands of brands)
- Closes a gap between the latest Wildberries API update and the current SDK

**Backlog Reference**: task-13

---

## Epic 16 Overview

### Strategic Context

The Wildberries API added a new endpoint (`/api/content/v1/brands`) that returns a paginated list of brands available for a given product subject (category). Sellers need brand IDs when creating or updating product cards, making this a key part of the product creation workflow.

This endpoint is part of the "Categories, Subjects & Characteristics" tag in the 02-products Swagger specification but uses a **different rate limit tier** than the other Content endpoints: 1 request per second (vs. the standard 100 requests per minute for Content methods).

### Technical Context

**API Documentation**: `wildberries_api_doc/02-products/kategorii-predmety-i-kharakteristiki.yaml` (line ~887)
**Shared Schemas**: `wildberries_api_doc/02-products/_schemas.yaml` (BrandsResponse, BrandsResponseError)
**Base URL**: `https://content-api.wildberries.ru`

**Endpoint Details**:
- **Method**: `GET /api/content/v1/brands`
- **Authentication**: `HeaderApiKey` (standard)
- **Rate Limit**: 1 request/sec, 1 sec interval, burst 5

**Query Parameters**:
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `subjectId` | integer | Yes | Subject (category) ID to retrieve brands for |
| `next` | integer | No | Cursor for pagination; use the `next` value from a previous response |

**Response Codes**:
| Code | Description | Schema |
| --- | --- | --- |
| 200 | Success | `BrandsResponse` |
| 400 | Bad Request (invalid params) | `BrandsResponseError` |
| 401 | Unauthorized | Standard 401 |
| 404 | Brands not found for subject | `BrandsResponseError` |
| 429 | Rate limit exceeded | Standard 429 |

### Dependencies

**Depends On**:
- Epic 1 Complete - Foundation infrastructure (BaseClient, rate limiting, error handling)
- Products module already implemented (48 methods, 34 exported interfaces)

---

## Implementation Plan

### 1. Add TypeScript Interfaces to `src/types/products.types.ts`

Two new interfaces extracted from `_schemas.yaml`:

```typescript
/** Single brand entry returned by the brands endpoint */
export interface Brand {
  /** Brand ID */
  id: number;
  /** URL of the brand logo */
  logoUrl: string;
  /** Brand name */
  name: string;
}

/**
 * Response from GET /api/content/v1/brands
 * Contains a paginated list of brands for a given subject ID.
 */
export interface BrandsResponse {
  /** Array of brand objects */
  brands: Brand[];
  /**
   * Pagination cursor. Pass this value as the `next` query parameter
   * to retrieve the next page. Absent when all data has been returned.
   */
  next?: number;
  /** Total number of brands for the subject */
  total: number;
}

/**
 * Error response from the brands endpoint (400/404).
 * Uses application/problem+json format.
 */
export interface BrandsResponseError {
  /** Error title (e.g., "Bad Request", "Not Found") */
  title: string;
  /** Error details (e.g., "validation failed", "Brands not found") */
  detail: string;
  /** Internal WB service ID (e.g., "brands-api") */
  origin: string;
  /** Unique request ID for support reference */
  requestId: string;
  /** Validation error details */
  errors?: Array<{
    /** Error message */
    message: string;
    /** Parameter location where the error occurred */
    location: string;
  }>;
}
```

### 2. Add `getBrands()` Method to `src/modules/products/index.ts`

Insert after the existing directory/reference methods (e.g., after `getDirectoryTnved`).

```typescript
/**
 * Get brands by subject ID
 *
 * Returns a paginated list of brands available for a given product subject (category).
 * Use cursor-based pagination with the `next` parameter to retrieve all results.
 *
 * Rate limit: 1 request per second, burst 5
 *
 * @param subjectId - Subject (category) ID
 * @param next - Pagination cursor from previous response
 * @returns Paginated list of brands with total count
 * @throws {RateLimitError} When rate limit exceeded (429)
 * @throws {WBAPIError} When subject not found (404) or invalid params (400)
 *
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki}
 *
 * @example
 * ```typescript
 * // Get first page of brands for subject 1234
 * const result = await sdk.products.getBrands(1234);
 * console.log(`Total brands: ${result.total}`);
 *
 * // Paginate through all brands
 * let next: number | undefined;
 * do {
 *   const page = await sdk.products.getBrands(1234, next);
 *   page.brands.forEach(b => console.log(b.name));
 *   next = page.next;
 * } while (next);
 * ```
 */
async getBrands(subjectId: number, next?: number): Promise<BrandsResponse> {
  return this.client.get<BrandsResponse>(
    'https://content-api.wildberries.ru/api/content/v1/brands',
    {
      params: { subjectId, ...(next !== undefined && { next }) },
      rateLimitKey: 'products.brands'
    }
  );
}
```

### 3. Add Rate Limit Entry to `src/config/products-rate-limits.ts`

Insert after the `products.contentDirectoryTnved` entry (line ~61):

```typescript
'products.brands': {
  requestsPerMinute: 60,  // 1 per second = 60 per minute
  intervalSeconds: 1,
  burstLimit: 5
},
```

**Note**: The Swagger specifies "1 sec period, 1 request, 1 sec interval, burst 5". This maps to `requestsPerMinute: 60` (1/s * 60s) with `intervalSeconds: 1`.

### 4. Write Unit Tests

**File**: `tests/unit/modules/products.test.ts` (extend existing suite)

Test cases:
- Happy path: returns BrandsResponse with brands array and total
- Pagination: passes `next` parameter correctly
- Error 400: invalid `subjectId` returns BrandsResponseError
- Error 404: unknown subject returns BrandsResponseError
- Rate limit key: verifies `products.brands` key is passed to client

### 5. Write Integration Test with MSW

**File**: `tests/integration/products.integration.test.ts` (extend existing suite)

Test cases:
- MSW handler for `GET https://content-api.wildberries.ru/api/content/v1/brands`
- Validates full request-response cycle including query params
- Validates pagination flow (first page + second page with cursor)

### 6. Add JSDoc Documentation

All JSDoc included inline in the method signature above. Must include:
- Rate limit information (1 req/sec, burst 5)
- Usage example with pagination loop
- `@throws` for RateLimitError and WBAPIError
- `@see` link to official documentation

---

## Files to Modify

| File | Change |
| --- | --- |
| `src/types/products.types.ts` | Add `Brand`, `BrandsResponse`, `BrandsResponseError` interfaces |
| `src/modules/products/index.ts` | Add `getBrands()` method |
| `src/config/products-rate-limits.ts` | Add `products.brands` rate limit entry |
| `tests/unit/modules/products.test.ts` | Add unit tests for `getBrands()` |
| `tests/integration/products.integration.test.ts` | Add integration test with MSW |

---

## API Methods Summary

| Method | SDK Method | Description |
| --- | --- | --- |
| `GET /api/content/v1/brands` | `getBrands(subjectId, next?)` | Get paginated brand list by subject ID |

**Total new methods**: 1
**Total new types**: 3 (Brand, BrandsResponse, BrandsResponseError)

---

## Type Definitions

### Schemas from Swagger

```typescript
interface Brand {
  id: number;        // Brand ID (e.g., 9007199254)
  logoUrl: string;   // Brand logo URL
  name: string;      // Brand name (e.g., "Brand")
}

interface BrandsResponse {
  brands: Brand[];   // Array of brand objects
  next?: number;     // Pagination cursor (absent on last page)
  total: number;     // Total brand count for subject (e.g., 344534)
}

interface BrandsResponseError {
  title: string;     // Error title
  detail: string;    // Error details
  origin: string;    // Internal WB service ID ("brands-api")
  requestId: string; // Unique request ID
  errors?: Array<{
    message: string;   // Error text
    location: string;  // Parameter location (e.g., "query.next")
  }>;
}
```

### Error Examples from Swagger

**400 - Invalid `next` parameter**:
```json
{
  "title": "Bad Request",
  "detail": "validation failed",
  "origin": "brands-api",
  "requestId": "102d2641a932d61bed60649d6c99d80a",
  "errors": [{ "message": "invalid integer", "location": "query.next" }]
}
```

**404 - Brands not found**:
```json
{
  "title": "Not Found",
  "detail": "Brands not found",
  "origin": "brands-api",
  "requestId": "102d2641a932d61bed60649d6c99d80a"
}
```

---

## Rate Limit Details

| Tier | Period | Limit | Interval | Burst |
| --- | --- | --- | --- | --- |
| Content standard | 1 min | 100 requests | 600 ms | 5 |
| **Brands (this endpoint)** | **1 sec** | **1 request** | **1 sec** | **5** |

The brands endpoint uses a significantly more restrictive rate limit than the standard Content tier. SDK users performing bulk brand lookups across many subjects should implement their own queuing or use the SDK's built-in rate limiter to avoid 429 errors.

---

## Success Metrics

### Coverage Targets
- `getBrands()` method: >= 80% line coverage
- Rate limit entry validated in unit tests

### Quality Gates
- All tests passing
- TypeScript strict mode compliance
- ESLint + Prettier passing
- Rate limit matches Swagger specification (1 req/sec, burst 5)
- JSDoc complete with example

---

## Risk Assessment

### Low Risk
- Single new endpoint following established patterns
- Swagger specification clearly defines schemas and rate limits
- Existing Products module infrastructure handles all plumbing

### Considerations
- Rate limit tier is unique (1/sec vs 100/min) - verify RateLimiter handles sub-minute periods correctly
- `next` parameter type is integer in Swagger, not a string cursor - ensure query param serialization is correct

---

## Notes

- Epic 16 adds a single new endpoint to the existing Products module
- The brands endpoint origin is `brands-api`, distinct from other Content endpoints
- Error response uses `application/problem+json` content type (not `application/json`)
- The `next` field is optional in the response - absent when all data has been returned
- The `Brand` interface includes `logoUrl` which is not present in the task-13 implementation plan but is required by the Swagger schema

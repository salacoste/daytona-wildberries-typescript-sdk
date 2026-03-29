---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - backlog/tasks/task-51 through task-81 (17 To Do tasks from WB API updates)
  - backlog/sprint-status.yaml
  - docs/epics/ (47 completed EPICs for historical context)
---

# wb_daytona_sdk - Epic Breakdown

## Overview

This document provides the epic and story breakdown for wb_daytona_sdk Sprint Cycle Q2 2026, decomposing WB API updates (March 2026) into implementable work items organized by priority and module.

## Requirements Inventory

### Functional Requirements

FR1: Support token-type-based rate limits — SDK must apply different rate limits for Basic/Test tokens vs Personal/Service tokens (WB enforcement date: March 30, 2026)
FR2: Implement GET /api/advert/v0/bids/recommendations — return recommended bids for product cards and search clusters by campaign ID and nmId (cpm campaigns only)
FR3: Implement POST /api/marketplace/v3/dbw/orders/client — return buyer info for DBW orders by order IDs
FR4: Implement POST /api/analytics/v1/stocks-report/wb-warehouses — return current WB warehouse inventory with warehouseId, regionName, pagination up to 250K rows (replaces deprecated GET /api/v1/supplier/stocks, disabled June 23)
FR5: Update getAdvertsV2 in Promotion module to match current WB API spec
FR6: Add `isB2b` field to FBS Supply type — supplies now carry B2B flag, mixed B2B/non-B2B orders in one supply rejected since March 19
FR7: Add `isBoxOnPallet` and `boxTypeID` fields to FBW supply types for new "Поштучная паллета" supply type
FR8: Add `currency` field to all 3 Sales Funnel v3 response types
FR9: Fix `additionalErrors` type in ResponseCardCreate — must support Record<string, string> for vendorCode-keyed merging errors (Beauty/Household Chemicals categories)
FR10: Add `status` field to CrossBorderStickerItem — 'awaitingTrackNumber' | 'ready' for sticker generation tracking (April 1)
FR11: Add `tin` (ИНН) field to SellerInfoResponse

### Non-Functional Requirements

NFR1: All type changes must pass `npm run type-check` with zero errors
NFR2: All existing 2041 tests must continue passing after changes
NFR3: New methods must have unit tests covering success, error propagation, payload verification
NFR4: Documentation guides must be bilingual (EN + RU) and build successfully with VitePress
NFR5: JSDoc must include rate limit tables, @throws, @example, @see links to WB docs

### Additional Requirements

- DBS deliverBulk() must document 409 ImeiIsNotFilled error and requiredMeta check workflow
- User Management JSDoc must document Personal Token (category: Users) requirement and global availability
- Third-party services can avoid Basic token reduced limits via traffic identification (business-solutions@rwb.ru)
- Deprecated GET /api/v1/supplier/stocks endpoint must be marked @deprecated with migration guidance to new wb-warehouses method
- GitHub Pages guides needed for: Sales Funnel Analytics, Customer Communication, Search Queries Analytics, Seller Analytics CSV

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Token-type rate limits (Phase A: awareness, Phase B: configs) |
| FR2 | Epic 2 | Bids recommendations for promotion campaigns |
| FR3 | Epic 3 | DBW buyer info endpoint |
| FR4 | Epic 4 | WB warehouses current inventory |
| FR5 | Epic 2 | getAdvertsV2 update |
| FR6 | Epic 3 | isB2b flag on FBS Supply |
| FR7 | Epic 3 | isBoxOnPallet + boxTypeID on FBW supply types |
| FR8 | Epic 5 | currency field in Sales Funnel responses |
| FR9 | Epic 5 | additionalErrors type fix for merging errors |
| FR10 | Epic 5 | CrossBorder sticker generation status |
| FR11 | Epic 5 | tin (ИНН) in SellerInfoResponse |
| NFR1-5 | All | Cross-cutting quality gates |
| Additional | Epic 5/6 | JSDoc updates (IMEI, tokens), docs guides |

## Epic List

### Epic 1: Rate Limit Intelligence by Token Type
SDK consumers can configure their token type and get correct rate limiting automatically, avoiding 429 errors on Basic/Test tokens.
**FRs covered:** FR1
**Backlog tasks:** task-77
**Release:** Phase A in v3.4.0, Phase B in v3.5.0
**Implementation:** Phase A = SDKConfig.tokenType + init warning; Phase B = category-level multipliers

### Epic 2: Promotion Analytics — Bid Recommendations
SDK consumers can fetch recommended competitive and leader bids for campaigns and access updated campaign info, optimizing ad spend.
**FRs covered:** FR2, FR5
**Backlog tasks:** task-51, task-66

### Epic 3: Order Management Enhancements (FBW/FBS)
SDK consumers can retrieve DBW buyer info, track B2B supply segregation, and work with new supply types (Поштучная паллета).
**FRs covered:** FR3, FR6, FR7
**Backlog tasks:** task-71, task-75, task-72

### Epic 4: Inventory & Stock Analytics
SDK consumers can query current WB warehouse inventory with full warehouse/region data and pagination up to 250K rows, replacing the deprecated stocks endpoint.
**FRs covered:** FR4
**Backlog tasks:** task-79

### Epic 5: Type Safety & API Compliance
SDK consumers get accurate TypeScript types reflecting latest WB API responses, ensuring correct autocomplete and type checking across all modules.
**FRs covered:** FR8, FR9, FR10, FR11 + Additional (JSDoc: IMEI, tokens)
**Backlog tasks:** task-67, task-68, task-73, task-74, task-78, task-80

### Epic 6: Developer Documentation Guides
SDK consumers (ERP/analytics developers) get comprehensive bilingual guides for Sales Funnel, Search Queries, Customer Communication, and CSV Reports with working code examples and workflow diagrams.
**FRs covered:** Additional Requirements (docs guides)
**Backlog tasks:** task-69, task-70, task-76, task-81
**Note:** Sidebar reorganization with collapsible Analytics/Communication subsections

---

## Epic 1: Rate Limit Intelligence by Token Type

SDK consumers can configure their token type and get correct rate limiting automatically, avoiding 429 errors on Basic/Test tokens.

### Story 1.1: Token Type Configuration

As an SDK consumer,
I want to specify my WB token type when initializing the SDK,
So that the SDK can apply appropriate rate limits for my token type.

**Acceptance Criteria:**

**Given** a developer initializes WildberriesSDK with `tokenType: 'basic'`
**When** the SDK is created
**Then** the `tokenType` is stored in config and accessible internally
**And** a warning is logged: "Basic token detected. Reduced rate limits apply. Consider upgrading to Personal or Service token."

**Given** a developer initializes WildberriesSDK without `tokenType`
**When** the SDK is created
**Then** the default `tokenType` is `'personal'` (no warning logged)

### Story 1.2: Reduced Rate Limits for Basic/Test Tokens

As an SDK consumer using a Basic or Test token,
I want the SDK to automatically apply correct reduced rate limits,
So that I don't hit 429 errors from exceeding WB's token-specific quotas.

**Acceptance Criteria:**

**Given** SDK is initialized with `tokenType: 'basic'` or `'test'`
**When** the rate limiter loads configs
**Then** category-level multipliers reduce limits (e.g., general: 0.001, orders: 0.003, analytics: 0.05)
**And** burst limits are set to 1 for all endpoints

**Given** SDK is initialized with `tokenType: 'personal'` or `'service'`
**When** the rate limiter loads configs
**Then** standard rate limits are applied (no reduction)

### Story 1.3: Token Type Documentation Guide

As an SDK consumer,
I want to understand WB token types, their rate limits, and migration recommendations,
So that I can choose the right token for my integration.

**Acceptance Criteria:**

**Given** the docs site
**When** a user navigates to the Configuration guide
**Then** they find a "Token Types & Rate Limits" section explaining 4 token types, their limits, and recommendations
**And** third-party services see the traffic identification option (business-solutions@rwb.ru)

---

## Epic 2: Promotion Analytics — Bid Recommendations

SDK consumers can fetch recommended competitive and leader bids for campaigns and access updated campaign info, optimizing ad spend.

### Story 2.1: Update getAdvertsV2 Method

As an SDK consumer,
I want the getAdvertsV2 method to match the current WB API specification,
So that I get accurate campaign data with all current fields.

**Acceptance Criteria:**

**Given** the current WB API spec for GET /api/advert/v2/adverts
**When** the developer calls `sdk.promotion.getAdvertsV2()`
**Then** the request and response types match the latest WB API schema
**And** all new/changed fields are correctly typed
**And** unit tests verify correct URL, params, and rateLimitKey

### Story 2.2: Implement Bid Recommendations Method

As an SDK consumer running cpm promotion campaigns,
I want to fetch recommended competitive and leader bids for my product cards and search clusters,
So that I can optimize my ad spend with data-driven bidding.

**Acceptance Criteria:**

**Given** a valid campaign ID and nmId belonging to a cpm campaign
**When** the developer calls `sdk.promotion.getBidsRecommendations({ advertId, nmId })`
**Then** the response contains `normQueries[]` with `reachMin`, `reachMedium`, `reachMax` (each with `bidKopecks`)
**And** the response may contain `base` with `competitiveBid`, `leadersBid`, `top2`

**Given** an invalid advertId or nmId not belonging to the campaign
**When** the developer calls `getBidsRecommendations()`
**Then** a `ValidationError` is thrown with descriptive message

**Given** the rate limit config
**When** the method is called
**Then** it uses rateLimitKey `promotion.getBidsRecommendations` with 5 req/min, 12s interval, burst 5

---

## Epic 3: Order Management Enhancements (FBW/FBS)

SDK consumers can retrieve DBW buyer info, track B2B supply segregation, and work with new supply types (Поштучная паллета).

### Story 3.1: Implement DBW Buyer Info Method

As an SDK consumer fulfilling DBW orders,
I want to retrieve buyer information by order IDs,
So that I can process deliveries with correct customer data.

**Acceptance Criteria:**

**Given** an array of valid DBW order IDs
**When** the developer calls `sdk.ordersFBW.getClientInfo([orderId1, orderId2])`
**Then** the response contains `orders[]` with `orderID`, `firstName`, `phone`, `phoneCode` per order

**Given** an empty orderIds array
**When** the developer calls `getClientInfo([])`
**Then** a `ValidationError` is thrown

**Given** the endpoint URL
**When** the method sends the request
**Then** it POSTs to `https://marketplace-api.wildberries.ru/api/marketplace/v3/dbw/orders/client`

### Story 3.2: Add B2B Flag to FBS Supply Type

As an SDK consumer managing FBS supplies,
I want to see the B2B flag on supplies and understand the B2B segregation rule,
So that I can correctly group B2B and non-B2B orders into separate supplies.

**Acceptance Criteria:**

**Given** the `Supply` interface in `orders-fbs.types.ts`
**When** the developer reads a supply from `listSupplies()` or `getSupply()`
**Then** the response includes `isB2b?: boolean` indicating the supply's B2B status

**Given** JSDoc for `addOrdersToSupply()`
**When** the developer reads the documentation
**Then** they see a warning: mixing B2B and non-B2B orders in one supply is rejected since March 19

### Story 3.3: Add Box-on-Pallet and BoxTypeID to FBW Supply Types

As an SDK consumer managing FBW supplies,
I want to see the new "Поштучная паллета" supply type availability and boxTypeID in supply responses,
So that I can correctly plan and track supply types.

**Acceptance Criteria:**

**Given** `ModelsOptionsResultModel.result[].warehouses[]`
**When** the developer reads acceptance options
**Then** the response includes `canBoxOnPallet?: boolean`

**Given** `ModelsSupply` (supply list)
**When** the developer lists supplies
**Then** the response includes `boxTypeID?: number` and `isBoxOnPallet?: boolean`

**Given** `ModelsSupplyDetails` (supply details)
**When** the developer gets supply details
**Then** the response includes `isBoxOnPallet?: boolean`

---

## Epic 4: Inventory & Stock Analytics

SDK consumers can query current WB warehouse inventory with full warehouse/region data and pagination up to 250K rows, replacing the deprecated stocks endpoint.

### Story 4.1: Implement WB Warehouses Stock Method & Deprecate Legacy

As an SDK consumer (ERP/analytics service),
I want to query current WB warehouse inventory with warehouse IDs, region names, and pagination,
So that I can monitor stock levels across all warehouses in real time.

**Acceptance Criteria:**

**Given** optional filter params (nmIds, chrtIds, limit up to 250000, offset)
**When** the developer calls `sdk.analytics.getWbWarehousesStock(params)`
**Then** the response contains `data.items[]` with `nmId`, `chrtId`, `warehouseId`, `warehouseName`, `regionName`, `quantity`, `inWayToClient`, `inWayFromClient`

**Given** the rate limit config
**When** the method is called
**Then** it uses 3 req/min, 20s interval, burst 1

**Given** the response has more items than `limit`
**When** the developer uses offset pagination
**Then** subsequent calls return the next page of results sorted by nmId ascending

**Given** any existing method wrapping `GET /api/v1/supplier/stocks`
**When** the developer reads its JSDoc
**Then** they see `@deprecated` with message: "Will be disabled June 23, 2026. Use `getWbWarehousesStock()` instead."

**Given** the analytics module documentation
**When** the developer reads docs/modules/analytics.md
**Then** they find a migration guide section from old to new stocks endpoint

---

## Epic 5: Type Safety & API Compliance

SDK consumers get accurate TypeScript types reflecting latest WB API responses, ensuring correct autocomplete and type checking across all modules.

### Story 5.1: Batch Type Alignment Sprint

As an SDK consumer,
I want all TypeScript types to accurately reflect the current WB API responses,
So that I get correct autocomplete, type checking, and no runtime surprises.

**Acceptance Criteria:**

**Given** `ResponseCardCreate.additionalErrors` (task-67)
**When** WB returns vendorCode-keyed merging errors for Beauty/Household Chemicals
**Then** the type is `Record<string, string> | string | { error: string }`

**Given** `SalesFunnelProductsResponse`, `SalesFunnelProductsHistoryResponse`, `SalesFunnelGroupedHistoryResponse` (task-68)
**When** the API returns currency information
**Then** each type includes `currency?: string`

**Given** `CrossBorderStickerItem` (task-80)
**When** sticker generation is in progress
**Then** the type includes `status?: 'awaitingTrackNumber' | 'ready'`

**Given** `SellerInfoResponse` (task-78)
**When** the API returns seller ИНН
**Then** the type includes `tin?: string`

**Given** `deliverBulk()` JSDoc (task-73)
**When** developer reads the method docs
**Then** they see `@throws` for 409 ImeiIsNotFilled and requiredMeta check workflow

**Given** User Management methods JSDoc (task-74)
**When** developer reads createInvite/getUsers/updateUserAccess/deleteUser docs
**Then** they see Personal Token (category: Users) requirement and global availability note

---

## Epic 6: Developer Documentation Guides

SDK consumers (ERP/analytics developers) get comprehensive bilingual guides for Sales Funnel, Search Queries, Customer Communication, and CSV Reports with working code examples and workflow diagrams.

### Story 6.1: Sales Funnel Analytics Guide (EN+RU)

As an SDK consumer building analytics dashboards,
I want a comprehensive guide on Sales Funnel methods with code examples,
So that I can implement funnel analysis using the SDK.

**Acceptance Criteria:**

**Given** the docs site
**When** the user navigates to guides
**Then** they find "Sales Funnel Analytics" covering 3 methods, filtering, metrics, practical scenarios
**And** the guide exists in both EN and RU
**And** VitePress sidebar has the entry under a collapsible "Analytics Guides" subsection

### Story 6.2: Customer Communication Guide (EN+RU)

As an SDK consumer building customer support tools,
I want a guide covering Questions, Reviews, Chats, and Returns workflows,
So that I can automate customer interaction handling.

**Acceptance Criteria:**

**Given** the docs site
**When** the user navigates to guides
**Then** they find "Customer Communication" covering all 25 methods across 5 sections with code examples
**And** practical scenarios: polling, bulk responses, negative review workflow, CRM integration
**And** the guide exists in EN and RU

### Story 6.3: Search Queries Analytics Guide (EN+RU)

As an SDK consumer optimizing product SEO,
I want a guide on search query analytics with Jam subscription context,
So that I can analyze search positions and keyword performance.

**Acceptance Criteria:**

**Given** the docs site
**When** the user navigates to guides
**Then** they find "Search Queries Analytics" covering 5 methods, Jam limits, SEO scenarios
**And** cross-links to Jam subscription guide
**And** the guide exists in EN and RU

### Story 6.4: Seller Analytics CSV Guide (EN+RU)

As an SDK consumer generating long-term reports,
I want a guide on CSV report workflows with polling patterns,
So that I can automate report generation and download.

**Acceptance Criteria:**

**Given** the docs site
**When** the user navigates to guides
**Then** they find "Seller Analytics CSV" covering 4 methods, 3-step workflow, report types, Jam requirement
**And** the guide exists in EN and RU

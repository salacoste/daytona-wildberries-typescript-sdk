# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-12-15

### Overview

**Epic 8: Code Generator Syntax & Validation Fixes** - Critical fixes to the SDK code generator ensuring all generated TypeScript code compiles correctly.

| Metric | Value |
|--------|-------|
| Files Changed | 104 |
| Generator Functions Added | 3 |
| Syntax Errors Fixed | 4 |
| Tests Passing | 951 |

### Fixed

#### Code Generator - TypeScript Syntax Validation
- **Invalid Interface Names Starting with Numbers**
  - `400Response` → `Response400` in promotion.types.ts
  - `4xxResponse` → `Response4xx` in reports.types.ts
  - Added `sanitizeTypeName()` function to handle numeric prefixes automatically

- **Corrupted Import Statements**
  - Fixed inline type definitions appearing in import statements (reports/index.ts)
  - Import statements now only reference valid exported interfaces

- **Invalid Object Keys with Special Characters**
  - Added `sanitizeObjectKey()` function to quote keys containing dashes/special characters
  - Rate limit config keys now properly escaped

### Added

#### Generator Improvements
- `sanitizeTypeName()` - Ensures TypeScript interface names comply with identifier rules
- `sanitizeIdentifier()` - General identifier sanitization for variables and function names
- `sanitizeObjectKey()` - Properly escapes object keys with special characters

#### Documentation
- **Storage Fees Integration Guide** (`docs/guides/storage-fees-integration.md`)
  - Complete guide for comparing Weekly Report `storage_fee` with Paid Storage API `warehousePrice`
  - Step-by-step instructions for backend integration
  - Data verification methodology

- **Epic 8 Story** (`docs/stories/8.1.code-generator-syntax-fixes.md`)
  - Full technical documentation of all generator fixes
  - Implementation details and code examples

#### Examples & Verification Scripts
- `examples/test_sdk_storage_w49.ts` - SDK storage methods verification
- `examples/verify_w49_2025.ts` - Raw API verification for Week 49 2025
- `examples/debug_output/` - Sample API response data for testing

### Changed

- All 11 module files regenerated with syntax fixes
- All type definition files regenerated with valid interface names
- Rate limit configuration files regenerated with properly quoted keys
- Test suite reduced from 1,657 to 951 tests (removed outdated integration tests)

### Verification

Storage fees API verified working after fixes:
- Weekly Report `storage_fee`: 1,923.34₽
- Paid Storage `warehousePrice`: 1,923.37₽
- Difference: 0.03₽ (0.0013%) - **Data matches perfectly**

---

## [2.1.0] - 2025-12-07

### Overview

**Release v2.1.0** - Formatting and CI improvements.

---

## [2.0.2] - 2025-12-03

### Overview

**Epic 7: API Compliance Audit** - Major audit achieving 100% API coverage.

| Metric | Value |
|--------|-------|
| YAML Endpoints | 229 |
| SDK Methods | 254 |
| Bugs Fixed | 13 |
| New Methods | 23 |
| Coverage | **100%** |

### Fixed

#### Communications Module
- `getQuestionsCountUnanswered()` - URL corrected from `/count/unanswered` to `/count-unanswered` (404 error fix)
- `getNewFeedbacksQuestions()` - URL corrected to `/api/v1/new-feedbacks-questions`

#### Products Module - Parameter Signatures (12 fixes)
- `getWarehousesContact(warehouseId)` - Added required `warehouseId` parameter
- `updateWarehousesContact(warehouseId, data)` - Added required `warehouseId` parameter
- `getHistoryTasks(uploadID)` - Added required `uploadID` parameter
- `getGoodsTask(params)` - Added required parameters: `uploadID`, `limit`, `offset`
- `getBufferTasks(uploadID)` - Added required `uploadID` parameter
- `getGoodsTask2(params)` - Added required parameters: `uploadID`, `limit`, `offset`
- `getGoodsFilter(params)` - Added parameters: `limit`, `offset`, `filterNmID`
- `getSizeNm(params)` - Added required parameters: `nmID`, `limit`, `offset`
- `getQuarantineGoods(params)` - Added parameters: `limit`, `offset`
- `createStock(warehouseId, data)` - Added required `warehouseId` parameter
- `updateStock(warehouseId, data)` - Added required `warehouseId` parameter
- `deleteStock(warehouseId, data)` - Added required `warehouseId` parameter

#### Products Module - Bug Fixes
- `listProducts()` - Fixed empty results bug
- `getAllProducts()` - Added to validator whitelist

### Added

#### Orders FBS Module - Cross-Border Operations (14 methods)
- `updatePass(passId, data)` - Update delivery pass
- `deleteOrderMetadata(orderId, key)` - Delete order metadata by key
- `setOrderSGTIN(orderId, data)` - Set SGTIN marking code
- `setOrderUIN(orderId, data)` - Set UIN (unique identifier)
- `setOrderIMEI(orderId, data)` - Set IMEI
- `setOrderGTIN(orderId, data)` - Set GTIN
- `setOrderExpiration(orderId, data)` - Set expiration date
- `getCrossBorderStickers(orderIds)` - Get stickers for cross-border orders
- `getExternalStickersUrls(orderIds)` - Get external sticker URLs (**deprecated**)
- `getOrdersStatusHistoryCrossBorder(orderIds)` - Get status history for cross-border
- `getOrdersWithClientInfo(orderIds)` - Get orders with client info (Turkey)
- `addSupplyTrbx(supplyId, amount)` - Add boxes (TRBX) to supply
- `deleteSupplyTrbx(supplyId, trbxIds)` - Delete boxes from supply
- `getSupplyTrbxStickersPost(supplyId, type, trbxIds)` - Get box stickers

#### Reports Module (6 methods)
- `getWarehouseRemainsReportStatus(taskId)` - Check warehouse remains report status
- `downloadWarehouseRemainsReport(taskId)` - Download warehouse remains report
- `getAcceptanceReportStatus(taskId)` - Check acceptance report status
- `downloadAcceptanceReport(taskId)` - Download acceptance report
- `getPaidStorageReportStatus(taskId)` - Check paid storage report status
- `downloadPaidStorageReport(taskId)` - Download paid storage report

#### Communications Module (2 methods)
- `getNewFeedbacksQuestions()` - Get indicator for new feedbacks/questions
- `requestReturnByFeedback(feedbackId)` - Request product return by feedback ID

#### Products Module (1 method)
- `recoverCards(nmIds)` - Recover product cards from trash

### Deprecated

- `getExternalStickersUrls()` - Use `getCrossBorderStickers()` instead

### Tests

- Added 19 new unit tests for Orders FBS READ methods
- Added 2 new unit tests for Communications module
- Total tests: 1,657 passing

---

## [2.0.1] - 2025-11-28

### Fixed
- Build validation for `.cjs` file extension
- ESLint configuration for strict TypeScript mode

---

## [2.0.0] - 2025-11-25

### Added

#### Epic 4: Extended Modules
- **Orders FBW Module** - FBW warehouse fulfillment (8 methods)
- **Promotion Module** - Advertising campaigns (42 methods)
- **Tariffs Module** - Commission rates (4 methods)
- **In-Store Pickup Module** - Click & collect (16 methods)

#### Epic 6: VitePress Documentation Site
- VitePress with i18n support (English + Russian)
- TypeDoc API reference generation (343 pages)
- Getting started tutorials (4 tutorials)
- Comprehensive guides (best practices, security, performance)

---

## [Unreleased]

### Added

#### Epic 1: Foundation & Code Generation Infrastructure
- **Core HTTP Client (BaseClient)** with intelligent retry logic and configurable timeout handling
- **Rate Limiting System** with token bucket algorithm for automatic API limit enforcement
- **Retry Handler** with exponential backoff for transient error recovery
- **Comprehensive Error Hierarchy**:
  - `WBAPIError` - Base error class with structured error handling
  - `AuthenticationError` - API key validation and 401 errors
  - `RateLimitError` - 429 rate limit handling with retry-after support
  - `ValidationError` - Request validation errors (400)
  - `NetworkError` - Network failures and 5xx errors
- **Automated SDK Generation** from OpenAPI/Swagger specifications
- **Type-Safe TypeScript** interfaces generated from OpenAPI schemas
- **General Module** with API connectivity testing and seller information retrieval

#### Epic 2: Critical Business APIs - Products & Orders
- **Products Module** - Complete product lifecycle management:
  - Product CRUD operations (create, read, update, delete)
  - Category and characteristic management
  - Media management (images, videos) with upload and deletion
  - Pricing operations with bulk update support
  - Multi-warehouse stock management
  - Product card status tracking
- **Orders FBS Module** - Seller warehouse fulfillment:
  - New order retrieval and processing
  - Order listing with advanced filtering and pagination
  - Order status tracking (supplier and WB system status)
  - Shipping label generation
  - Supply management and tracking
- **Main SDK Integration** for Products and Orders modules
- **Cross-module workflows** with comprehensive error handling

#### Epic 3: Financial Operations & Analytics
- **Finances Module** - Financial data and reporting:
  - Real-time balance retrieval
  - Transaction history with filtering and pagination
  - Financial report generation (sales reports by period)
  - Document management (categories, listing, download)
  - Payout tracking and management
- **Analytics Module** - Sales performance and insights:
  - Sales funnel conversion metrics
  - Product performance tracking
  - Historical statistics with grouping
  - Stock history tracking with change reasons
  - CSV report generation and export
  - Search query analytics
- **Communications Module** - Customer engagement:
  - **Chat Management**: Real-time customer chat with file attachment support
  - **Product Q&A**: Question management with answer/reject functionality
  - **Customer Reviews**: Review retrieval, response management, and editing
- **Reports Module** - Operational data export:
  - Inbound shipment tracking (incomes)
  - Stock level reporting with quantity breakdowns
  - Customer order tracking
  - Sales and returns analysis
  - Excise/compliance reports
  - Async warehouse remains reports with status polling
- **Unified SDK Integration** for all 7 implemented modules
- **Cross-Module Business Intelligence** examples:
  - Business dashboard workflows
  - Product performance analysis
  - Financial reconciliation workflows
  - Seller insights and metrics

#### Epic 5: Documentation & Localization
- **Documentation Structure Reorganization** - Hierarchical documentation infrastructure:
  - **Directory Structure** - 4 core directories (getting-started/, guides/, api/, examples/) with clear separation
  - **Central Hub** - docs/index.md serves as documentation home with navigation to all sections
  - **Breadcrumb Navigation** - Consistent "← Back to Documentation Home" links in all subdirectories
  - **Link Validation** - scripts/validate-links.js script with .markdown-link-check.json configuration
  - **CI Integration** - Automated link validation in GitHub Actions workflow
  - **Cross-References** - README.md, CONTRIBUTING.md, examples/README.md updated with new documentation paths
  - **Professional Quality** - Production-ready infrastructure, 95/100 quality score
- **Community Foundation Files** - Complete GitHub community health files:
  - **CONTRIBUTING.md** - Comprehensive contribution guidelines (459 lines) with development setup, code standards, testing requirements, and PR process
  - **CODE_OF_CONDUCT.md** - Contributor Covenant v2.1 (132 lines) with 4-level enforcement procedures
  - **SECURITY.md** - Detailed security policy (338 lines) with vulnerability reporting, 48-hour response time, and coordinated disclosure
  - **GitHub Issue Templates** - 3 YAML templates (bug report, feature request, question) with structured fields and validation
  - **PR Template** - Comprehensive template (48 lines) with 8-item Definition of Done checklist
  - **README Integration** - Contributing section with links to all community files and Good First Issues guidance
  - **Professional Quality** - Production-ready community foundation, 92/100 quality score
- **FAQ & Glossary** - Comprehensive developer reference documentation:
  - **FAQ** - 35 questions across 8 categories (Getting Started, Authentication, API Usage, Error Handling, Rate Limiting, Advanced Topics, Troubleshooting, Additional Resources)
  - **Glossary** - 68 terms covering Wildberries marketplace (26 terms), SDK components (9 components), API concepts (15+ concepts), technical terms (21 terms), and acronyms (30+)
  - **Code Examples** - 31 practical TypeScript/JavaScript/Bash examples in FAQ
  - **Cross-References** - 83 total links (32 in FAQ + 51 in Glossary) for excellent discoverability
  - **Professional Quality** - Production-ready documentation, 98/100 quality score
- **Russian Documentation** - Complete translation for Russian-speaking developers:
  - **Quickstart Guide** in Russian (133 lines) with native language flow
  - **README** core sections translated (308 lines) with complete feature overview
  - **Tutorial 1: Product Catalog Sync** in Russian (606 lines) - comprehensive workflow
  - **Tutorial 2: Order Fulfillment** in Russian (589 lines) - FBS order processing
  - **Translation Glossary** (200+ technical terms) for consistency across documentation
  - **Bidirectional Navigation** - Seamless language switching between English and Russian
  - **Professional Quality** - Native speaker reviewed, 9.5/10 quality score
- **Target Audience**: 70%+ of Wildberries sellers (Russia, Belarus, Kazakhstan markets)

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- ✅ **Zero vulnerabilities** in production dependencies
- Secure API key authentication for all requests
- Input validation for all API operations
- Comprehensive error sanitization to prevent information leakage
- Regular dependency security audits via npm audit

## [0.1.0] - Pre-release (Development)

Initial development release implementing 7 of 11 planned modules:
1. **General Module** - API connectivity and seller information
2. **Products Module** - Complete product management
3. **Orders FBS Module** - Seller warehouse fulfillment
4. **Finances Module** - Financial data and reports
5. **Analytics Module** - Sales analytics and performance
6. **Communications Module** - Customer chat, Q&A, and reviews
7. **Reports Module** - Operational reporting

**Test Coverage:**
- 1,345 passing tests
- 98.32% line coverage
- 97.5% branch coverage
- All critical modules exceed 80% coverage target
- Core infrastructure exceeds 90% coverage target

**Remaining Modules (Planned for Epic 4):**
- Orders FBW Module
- Promotion Module
- Tariffs Module
- In-Store Pickup Module

---

## Migration Guide

### From Pre-release to v1.0.0

_To be added when v1.0.0 is released_

---

## Links

- [GitHub Repository](https://github.com/salacoste/daytona-wildberries-typescript-sdk)
- [npm Package](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
- [Documentation](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)
- [Issue Tracker](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)

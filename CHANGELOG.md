# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- [GitHub Repository](https://github.com/yourusername/wb-api-sdk)
- [npm Package](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
- [Documentation](https://github.com/yourusername/wb-api-sdk#readme)
- [Issue Tracker](https://github.com/yourusername/wb-api-sdk/issues)

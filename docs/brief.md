# Project Brief: Wildberries API TypeScript SDK

**Document Version**: 1.0 (maintained) | **Date**: 2026-08-09 | **Status**: ✅ Maintained — reflects shipped v4.1.0

> ### 🚢 Current Status (v4.1.0)
>
> The SDK described in this brief is **built and shipped to npm** as
> [`daytona-wildberries-typescript-sdk`](https://github.com/salacoste/daytona-wildberries-typescript-sdk).
> It is **production-ready**:
> - **14 public API modules** exposed on `sdk.*` (`general`, `products`, `ordersFBS`, `ordersFBW`,
>   `ordersDBS`, `finances`, `analytics`, `communications`, `reports`, `promotion`, `tariffs`,
>   `inStorePickup`, `userManagement`, `returns`) + one supplemental internal module.
> - **~283 public methods** across those 14 modules.
> - **223 Backlog.md tasks — all Done.** Board cleared.
> - **Dual ESM/CJS build** (Vite + `vite-plugin-dts`), Node ≥ 20, TypeScript strict mode.
> - **Docs site live**: [salacoste.github.io/daytona-wildberries-typescript-sdk](https://salacoste.github.io/daytona-wildberries-typescript-sdk)
>   (VitePress + TypeDoc, bilingual EN/RU).
> - **~2,376 tests across 80 test files** (Vitest 4 + MSW 2); coverage thresholds ≥90% core infra, ≥80% modules.
>
> This brief was originally written pre-build (v1.0 scope, 11 modules, greenfield framing).
> The vision, goals, target-audience, and business-context prose below are still valid and are preserved;
> the shipped product now **exceeds** the original v1.0 scope (see the module table and counts below).
> See [`CHANGELOG.md`](../CHANGELOG.md) for the authoritative version history, and
> [`docs/guides/migration-v4.md`](guides/migration-v4.md) for the v4.0 breaking surface removal.

---

## 📊 Executive Summary (Decision Makers)

**The Opportunity**: 100,000+ Wildberries sellers need integration tools, but developers waste 2-4 weeks manually integrating with the platform's many APIs. This created a market opportunity for a production-ready TypeScript SDK — **an opportunity this project has now realized**.

**The Solution**: An open-source SDK that transforms the official OpenAPI specifications into type-safe TypeScript code, reducing integration time by 75% (weeks → days) while eliminating runtime errors and API compliance issues. **Shipped** as `daytona-wildberries-typescript-sdk`.

**Key Metrics** (delivered):
- **Time Savings**: 2-4 weeks → 3-7 days (75% reduction)
- **Coverage**: **14 public API modules, ~283 methods**, full endpoint coverage of the tracked OpenAPI specs
- **Quality**: TypeScript strict mode, **~2,376 tests** (≥90% core infra / ≥80% modules), dual ESM/CJS build
- **Time to Value**: <30 minutes from install to first API call

**Investment Required**:
- **Timeline**: Originally scoped at 6-7 weeks to MVP (v1.0); **delivered and now at v4.1.0**, maintained continuously as the Wildberries API evolves
- **Resources**: Single developer initially, community post-launch
- **Budget**: $0 (open-source, free tier infrastructure)

**Success Criteria**:
- 100+ active installations within 6 months
- 90%+ developer satisfaction score
- De facto standard for TypeScript Wildberries integration

**Risk Level**: Medium (Swagger accuracy, API stability, market validation needed)

**Next Milestone**: Maintenance cadence — track WB API announcements, ship module/patch releases, retire deprecated surface on WB deadlines (see `CHANGELOG.md`).

---

## 📑 Table of Contents

### **Strategic Overview**
- [Executive Summary](#-executive-summary-decision-makers) ← You are here
- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Target Users](#target-users)

### **Planning & Execution**
- [Goals & Success Metrics](#goals--success-metrics)
- [MVP Scope](#mvp-scope)
- [Post-MVP Vision](#post-mvp-vision)
- [Technical Considerations](#technical-considerations)

### **Risk & Feasibility**
- [Constraints & Assumptions](#constraints--assumptions)
- [Risks & Open Questions](#risks--open-questions)

### **Reference Materials**
- [Appendices](#appendices)
- [Next Steps](#next-steps)

### **Quick Reference Tables**
- [Module Priority Matrix](#module-priority-matrix)
- [Technology Decision Matrix](#technology-decision-matrix)
- [Timeline Overview](#timeline-overview)
- [Risk Assessment Grid](#risk-assessment-grid)

---

## Overview

The **Wildberries API TypeScript SDK** is a production-ready software development kit that transforms the platform's OpenAPI specifications (14 spec files under `wildberries_api_doc/`) into a type-safe, modular TypeScript library for interacting with the Wildberries marketplace platform. **Shipping** as `daytona-wildberries-typescript-sdk` (v4.1.0), it addresses the complexity of manual API integration by providing developers with full type generation, intelligent rate limiting, retry mechanisms, and comprehensive error handling.

The primary problem being solved is the **significant development overhead** currently faced by e-commerce developers, ERP/CRM integrators, and analytics platform builders who must manually interpret Swagger documentation, implement boilerplate code, and handle complex error scenarios when integrating with Wildberries' 100,000+ active seller marketplace.

**Target Market**: E-commerce developers, ERP/CRM system integrators, and analytics platform builders working with the Wildberries marketplace ecosystem.

**Key Value Proposition**: The SDK reduces integration time from weeks to hours by providing full TypeScript type safety (eliminating runtime errors), automatic API compliance (rate limiting, authentication, retry logic), and production-grade reliability—enabling developers to focus on business logic rather than API infrastructure.

---

## Problem Statement

> **TL;DR**: Before a unified SDK existed, developers wasted 2-4 weeks manually integrating Wildberries' many APIs due to lack of an official SDK. Manual integration caused 30-40% more QA cycles, consumed 15-20% of ongoing maintenance time, and forced every developer to "reinvent the wheel" for rate limiting, error handling, and type safety. **This SDK was built to eliminate that pain — and it shipped.**

**Current State and Pain Points (the problem this SDK solves):**

Developers integrating with the Wildberries marketplace API without an SDK face significant technical friction. The platform exposes its functionality through multiple OpenAPI/Swagger specification files (14 are tracked in this repo) covering critical business domains (products, orders, finances, analytics, communications, etc.), but Wildberries provides no official SDK. Without a project like this one, development teams must:

- **Manually interpret** complex Swagger documentation across many different API categories
- **Hand-code** HTTP client logic, including authentication, request/response handling, and serialization
- **Implement infrastructure** for rate limiting (each endpoint has unique limits), retry mechanisms, and error handling
- **Maintain type definitions** manually, leading to runtime errors and debugging overhead
- **Re-implement** common patterns across multiple integration projects

**Impact of the Problem (Quantified):**

- **Development Time**: Integration projects typically require **2-4 weeks** per developer to implement basic API coverage, with additional time for testing and error handling
- **Error Rate**: Without type safety, integration bugs are discovered at runtime, increasing QA cycles by an estimated **30-40%**
- **Maintenance Burden**: API changes require manual type updates across codebases, consuming **15-20% of ongoing development time**
- **Market Opportunity Cost**: With 100,000+ active Wildberries sellers, the aggregate development time wasted across the ecosystem represents thousands of developer-hours annually

**Why Existing Solutions Fall Short:**

1. **No Official SDK**: Wildberries provides only Swagger specifications, requiring each developer to "reinvent the wheel"
2. **Generic HTTP Libraries**: Tools like Axios or fetch provide no domain-specific logic for rate limiting, API-specific error handling, or type safety
3. **OpenAPI Code Generators**: Generic generators produce verbose, unoptimized code and lack Wildberries-specific features (rate limit parsing from descriptions, multi-domain URL handling)
4. **Community Solutions**: Limited TypeScript coverage, incomplete API support, lack of maintenance, and inconsistent quality

**Urgency and Importance:**

The Wildberries marketplace is experiencing **rapid growth** as a leading Russian e-commerce platform. As the ecosystem expands, the volume of integration projects (ERP systems, analytics platforms, inventory management tools) continues to increase. Without a production-ready SDK:

- **Technical Debt Accumulates**: Each new integration project duplicates infrastructure code
- **Innovation is Slowed**: Developers spend time on API mechanics rather than differentiating features
- **Quality Suffers**: Rushed implementations skip critical features like proper rate limiting, leading to API bans and service disruptions
- **Market Access is Limited**: The barrier to entry for building Wildberries-integrated tools remains unnecessarily high

Addressing this problem now enables the broader developer ecosystem to build higher-quality integrations faster, accelerating innovation and improving seller experiences across the platform.

---

## Proposed Solution

> **TL;DR**: Type-safe TypeScript SDK with modular API packages (14 public `sdk.*` modules), types generated from the official OpenAPI specs, intelligent rate limiting, exponential backoff retries, and a typed error hierarchy (~16 classes). Differentiates through Wildberries-specific intelligence (rate limit parsing, multi-domain URLs, RFC 7807 `problem+json` handling, marking-code diagnostics) while keeping a small, tree-shakeable footprint.

**Core Concept and Approach:**

The Wildberries API TypeScript SDK is a **code-generated, modular SDK** that automates the transformation of the platform's OpenAPI 3.0.1 specifications (14 files tracked under `wildberries_api_doc/`) into production-ready TypeScript code. The solution leverages a code generation pipeline to create:

1. **Type-Safe API Modules**: Each API category (General, Products, Orders FBS/FBW/DBS, Finances, Analytics, Communications, Reports, Promotion, Tariffs, In-Store Pickup, User Management, plus a Returns aggregator) becomes an independent, fully-typed TypeScript module with complete IDE autocomplete support
2. **Intelligent Infrastructure Layer**: A shared HTTP client with built-in authentication, rate limiting (parsed from API documentation), exponential backoff retry logic, and comprehensive error handling
3. **Developer-Centric Design**: Clean, intuitive API surface with async/await patterns, meaningful error messages, and extensive documentation and examples

**Key Differentiators from Existing Solutions:**

| Feature | Generic OpenAPI Generator | Manual Integration | **Our SDK** |
|---------|---------------------------|-------------------|-------------|
| Type Safety | Partial (verbose types) | Manual maintenance | ✅ Full, optimized types |
| Rate Limiting | ❌ Not included | Manual implementation | ✅ Automatic, per-endpoint |
| Retry Logic | ❌ Not included | Manual implementation | ✅ Exponential backoff |
| Multi-Domain URLs | ❌ Single base URL | Manual configuration | ✅ Auto-detected per endpoint |
| Error Handling | Generic HTTP errors | Custom implementation | ✅ Typed error hierarchy |
| Bundle Size | Large (100KB+) | N/A | ✅ Optimized (<100KB gzipped) |
| Maintenance | Manual regeneration | Full manual updates | ✅ Automated updates |
| Developer Experience | Poor (verbose API) | Variable | ✅ Excellent (autocomplete, docs) |

**Why This Solution Will Succeed Where Others Haven't:**

1. **Domain-Specific Intelligence**: Unlike generic tools, our SDK understands Wildberries-specific quirks (rate limit table parsing, multi-domain architecture, Russian API documentation nuances)

2. **Production-Grade Reliability**: Built-in infrastructure (rate limiting, retry logic, error handling) ensures integrations won't fail due to API limits or transient errors—a common failure mode of manual implementations

3. **Superior Developer Experience**: TypeScript's type system provides immediate feedback, eliminating entire classes of integration bugs before runtime

4. **Modular Architecture**: Developers import only needed modules (e.g., just Products + Orders), keeping bundle sizes small and build times fast

5. **Active Maintenance Path**: Code generation pipeline allows rapid updates when Wildberries API changes, unlike community solutions that become stale

**High-Level Vision for the Product:**

The SDK establishes itself as the **de facto standard** for Wildberries API integration in the TypeScript/Node.js ecosystem. Developers will:

- **Discover** the SDK through npm, GitHub, and Wildberries developer community
- **Install** with a single command: `npm install daytona-wildberries-typescript-sdk`
- **Authenticate** by providing their API key in configuration
- **Build** integrations in hours instead of weeks, using full IDE support and comprehensive examples
- **Deploy** with confidence, knowing rate limits and error handling are automatically managed
- **Maintain** easily as API changes are reflected in new SDK versions

The SDK becomes the foundation layer for a growing ecosystem of Wildberries integration tools, accelerating innovation and improving seller experiences across the platform.

---

## Target Users

### **Primary User Segment: Backend/Full-Stack Developers Building E-Commerce Tools**

**Demographic/Firmographic Profile:**
- **Role**: Backend developers, full-stack engineers, and technical leads at software companies or in-house development teams
- **Company Size**: Startups (5-50 employees) to mid-size companies (50-500 employees) building e-commerce tools
- **Geographic Location**: Primarily Russia and Eastern Europe, with potential for international expansion
- **Technical Background**: 3-7 years of professional experience, strong in TypeScript/JavaScript ecosystem, familiar with REST APIs and Node.js

**Current Behaviors and Workflows:**
- Build custom integrations for multiple e-commerce platforms (not just Wildberries)
- Use package managers (npm/yarn/pnpm) daily and expect modern DX (TypeScript, autocomplete, good docs)
- Prefer battle-tested libraries over rolling their own solutions, but will build custom code when no good option exists
- Rely heavily on IDE features (VSCode/WebStorm) for development speed and error detection
- Work in agile teams with tight deadlines and pressure to ship features quickly

**Specific Needs and Pain Points:**
- **Time Pressure**: Need to integrate with Wildberries API quickly without deep-diving into many separate Swagger files
- **Reliability Requirements**: Building tools for clients/stakeholders who depend on stable, error-free integrations
- **Type Safety**: Want compile-time error detection to avoid production bugs in critical e-commerce workflows
- **Maintainability**: Need solutions that won't break when Wildberries updates their API
- **Rate Limit Management**: Fear getting API access revoked due to improper rate limiting

**Goals They're Trying to Achieve:**
- Ship a working Wildberries integration in 1-2 sprints (2-4 weeks)
- Minimize ongoing maintenance burden for API integrations
- Build reliable tools that handle edge cases (network failures, rate limits, authentication errors)
- Focus development time on differentiating features rather than API boilerplate
- Deliver high-quality code that passes code review and QA

### **Secondary User Segment: ERP/CRM Integration Specialists**

**Demographic/Firmographic Profile:**
- **Role**: Integration engineers, solution architects, enterprise software consultants
- **Company Size**: Medium to large enterprises (500-10,000+ employees) or specialized integration consulting firms
- **Industry Focus**: Retail, logistics, warehouse management, enterprise resource planning
- **Technical Background**: 5-10+ years experience, often multi-platform expertise (SAP, Oracle, Microsoft Dynamics), growing TypeScript adoption

**Current Behaviors and Workflows:**
- Integrate e-commerce platforms with existing ERP/CRM systems (inventory sync, order processing, financial reconciliation)
- Work on multiple integration projects simultaneously, often with legacy system constraints
- Follow enterprise architecture guidelines and security/compliance requirements
- Need solutions that work in enterprise environments (proxies, VPNs, firewall restrictions)
- Require extensive logging, monitoring, and error handling for production support

**Specific Needs and Pain Points:**
- **Enterprise Requirements**: Need SDK that works in restrictive corporate environments with custom network configurations
- **Audit Trail**: Require comprehensive logging for compliance and debugging
- **Batch Operations**: Often process large volumes of data (thousands of products, hundreds of orders per day)
- **Error Recovery**: Need robust error handling and retry mechanisms for long-running integration jobs
- **Documentation**: Require detailed technical documentation for architecture review and knowledge transfer

**Goals They're Trying to Achieve:**
- Implement bidirectional sync between Wildberries and enterprise systems (inventory, orders, finances)
- Ensure zero data loss and high reliability for business-critical integrations
- Meet enterprise security and compliance standards
- Minimize operational support burden through robust error handling and monitoring
- Reduce total cost of ownership for integration projects

### **Tertiary User Segment: Analytics Platform & Business Intelligence Developers**

**Demographic/Firmographic Profile:**
- **Role**: Data engineers, BI developers, analytics product managers
- **Company Size**: Startups building analytics SaaS products or in-house teams at medium-large sellers
- **Focus Area**: E-commerce analytics, seller performance tracking, competitive intelligence
- **Technical Background**: Data-focused developers comfortable with TypeScript, familiar with data pipelines and ETL

**Current Behaviors and Workflows:**
- Build data pipelines to extract Wildberries data (sales, products, reviews, pricing) for analytics and reporting
- Often combine multiple data sources (Wildberries + other marketplaces + internal data)
- Use modern data stack (TypeScript + PostgreSQL/MongoDB + BI tools like Metabase/Superset)
- Need scheduled/automated data extraction with reliable error handling
- Focus on data freshness and accuracy for dashboards and reports

**Specific Needs and Pain Points:**
- **Data Completeness**: Need access to all available data endpoints (analytics, reports, finances)
- **Scheduled Jobs**: Running automated data extraction on schedules without manual intervention
- **Rate Limit Management**: Extracting large datasets without hitting API limits
- **Error Handling**: Gracefully handling API failures in automated pipelines
- **Performance**: Efficiently fetching large volumes of historical data

**Goals They're Trying to Achieve:**
- Build automated data pipelines for regular data extraction (daily/hourly)
- Create real-time dashboards for seller performance monitoring
- Enable business intelligence and decision-making based on marketplace data
- Reduce manual data extraction and processing overhead
- Ensure data accuracy and freshness for critical business metrics

---

## Goals & Success Metrics

### **Business Objectives**

- **Achieve market adoption of 100+ active installations within 6 months of v1.0 release** - Measured via npm download statistics and GitHub stars, representing successful penetration of the target developer market

- **Reduce average integration development time by 75% (from 2-4 weeks to 3-7 days)** - Validated through developer surveys and case studies, demonstrating clear time-to-value improvement

- **Establish SDK as the de facto TypeScript solution for Wildberries API integration by end of Year 1** - Measured by npm download trends, GitHub community engagement, and mentions in developer communities/forums

- **Achieve 90%+ developer satisfaction score** - Measured through post-implementation surveys focusing on DX, reliability, and documentation quality

- **Enable ecosystem growth with 10+ derivative tools/integrations built on the SDK within 12 months** - Tracked through GitHub dependents and community showcase submissions

### **User Success Metrics**

- **Time-to-First-API-Call < 30 minutes** - New developers can install, configure, and make their first successful API call within 30 minutes using quickstart documentation

- **Integration Error Rate < 5%** - Less than 5% of SDK method calls result in errors when used correctly (excluding external API failures), measured via telemetry and error reporting

- **Zero Critical Security Vulnerabilities** - Maintain zero high/critical security vulnerabilities in production releases, verified through npm audit and security scanning

- **Documentation Completeness: 100% public API coverage** - Every public method, class, and interface has complete JSDoc with examples and error documentation

- **Developer Onboarding Success Rate > 85%** - 85% of developers who start integration complete at least one working use case within first week

### **Key Performance Indicators (KPIs)**

- **npm Weekly Downloads: Target 500+/week by Month 6, 2000+/week by Month 12** - Indicates growing adoption and active usage across the developer community

- **GitHub Stars: Target 100+ by Month 3, 500+ by Month 12** - Demonstrates community interest and validation of value proposition

- **Test Coverage: Maintain ≥80% for critical paths, ≥90% for core infrastructure** - Ensures reliability and confidence in SDK quality

- **Bundle Size: Core SDK < 100KB gzipped** - Validates performance commitment and ensures fast load times in production applications

- **Issue Response Time: < 48 hours for bugs, < 7 days for features** - Demonstrates active maintenance and community engagement

- **API Coverage: 100% of Wildberries API endpoints implemented** - Ensures comprehensive coverage across all 14 public SDK modules

- **TypeScript Compatibility: Modern TypeScript with zero type errors in strict mode** - Validates type safety commitment and modern toolchain compatibility

- **Build Performance: SDK generation completes in < 30 seconds** - Ensures developer productivity during SDK updates and regeneration

---

## MVP Scope

> **Note (v4.1.0):** The MVP described below was the **original v1.0 scope** and has long since been delivered and surpassed. The shipped SDK now exposes **14 public modules** (the 11 listed here **plus** `ordersDBS`, `userManagement`, and a `returns` aggregator) and sits at **v4.1.0**. This section is retained as the historical scope definition; read it as "what v1.0 set out to do" rather than the current surface.

> **TL;DR (original v1.0 scope)**: All API modules in v1.0 with complete infrastructure (BaseClient, RateLimiter, RetryHandler), type generation, 100% endpoint coverage, ≥80% test coverage. Ships with comprehensive docs, working examples, and <30 min quickstart. Browser support, webhooks, CLI, and MCP server deferred to post-MVP.

### **Core Features (Must Have)**

**1. Core Infrastructure Layer**

- **BaseClient**: HTTP client with request/response handling, authentication (API key in headers), configurable timeout (default 30s), and error transformation to typed errors

- **RateLimiter**: Per-endpoint rate limit enforcement with intelligent parsing from Swagger `description` fields (e.g., "3 requests per minute with 20s intervals"), token bucket algorithm, and automatic request queuing

- **RetryHandler**: Exponential backoff retry logic with configurable max retries (default: 3), retry delay (default: 1s), smart retry decisions (retry on 5xx/network errors, don't retry on 4xx except 429)

- **Error Hierarchy**: Typed error classes — base `WBAPIError` plus ~15 subclasses (`AuthenticationError`, `RateLimitError`, `ValidationError`, `NetworkError`, `CampaignNotFoundError`, `InvalidBidError`, `BudgetExceededError`, `InvalidCampaignStateError`, `BidOutOfRangeError`, `PickupOrderNotFoundError`, `InvalidOrderStateError`, `CustomerVerificationError`, `MetadataValidationError`, `MetaValidationFailError`, `WarehouseStocksUpdateBlockError`, …) with parse helpers and recovery guidance

**2. Type Generation System**

- **Automated Type Generation**: Parse the Swagger files and generate TypeScript interfaces for request/response types, enums for status values, optional/required property preservation, and JSDoc comments from Swagger descriptions

- **Code Generation Pipeline**: Custom generator (`tools/generate-sdk.ts`) that transforms OpenAPI schemas → TypeScript types, extracts rate limits from descriptions, detects base URLs per endpoint, and generates module classes with typed methods

- **Type Safety Standards**: 100% type coverage with TypeScript strict mode, no `any` types except controlled error handling, full IDE autocomplete support

**3. Priority API Modules (Critical Path)**

- **General Module** (`01-general.yaml`): Connection testing (`/ping`), news API, seller information - Foundation for authentication testing

- **Products Module** (`02-products.yaml`): Categories/subjects/characteristics, product card CRUD, media file management, pricing, warehouse operations, stock management - Core business functionality

- **Orders FBS Module** (`03-orders-fbs.yaml`): Seller warehouse fulfillment, order status management, shipping operations - Critical order processing

- **Finances Module** (`13-finances.yaml`): Balance information, financial reports, transactions, payouts - Essential financial operations

**4. Supporting API Modules (High Priority)**

- **Orders FBW Module** (`07-orders-fbw.yaml`): Wildberries warehouse fulfillment integration

- **Communications Module** (`09-communications.yaml`): Customer chat, Q&A, reviews management

- **Analytics Module** (`11-analytics.yaml`): Sales statistics, performance metrics, CSV reports

- **Reports Module** (`12-reports.yaml`): Report generation and retrieval

**5. Remaining API Modules (Medium Priority)**

- **Promotion Module** (`08-promotion.yaml`): Campaigns, promo codes, advertising

- **Tariffs Module** (`10-tariffs.yaml`): Tariff information, commission rates

- **In-Store Pickup Module** (`06-in-store-pickup.yaml`): Pickup point management

**6b. Modules Added Beyond v1.0 (now shipped in v4.1.0):**

The shipped SDK grew beyond the original 11 modules above. The following are now part of the public surface (`sdk.*`):

- **Orders DBS Module** (Delivery by Seller): seller-handled delivery, bulk status operations, marking-code metadata, B2B buyer info
- **User Management Module**: seller-profile invitations, user listing, access-rights updates, user deletion
- **Returns Aggregator Module** (since v3.10.0): unified return analytics across FBO + FBS + Finance sources, partial-failure tolerant
- **Supplemental internal module** (`src/modules/1_0_0/`): 5 ad-hoc methods (`getContentTags`, advert/fullstats helpers, calendar promotions) — not a public `sdk.*` property

**6. Developer Experience Essentials**

- **Comprehensive Documentation**: TypeDoc-generated API reference, quickstart guide (<30 min to first API call), module-specific guides with code examples, error handling documentation with recovery patterns

- **Working Examples**: Example code for each module, common integration patterns (auth, pagination, error handling), real-world use case implementations

- **Testing Infrastructure**: Unit test suite with Vitest (≥80% coverage for critical paths), integration tests with MSW, mock data fixtures from Swagger examples

### **Out of Scope for MVP**

- **Browser Support**: The SDK targets Node.js (≥ 20); browser compatibility is out of scope (requires a different approach to API keys, CORS handling)

- **Webhook Handlers**: Event-driven architecture for Wildberries webhooks (future enhancement)

- **CLI Tool**: Command-line interface for SDK operations (`wb-cli products list`) deferred to post-MVP

- **MCP Server Integration**: Model Context Protocol server for AI agent integration (future extensibility point)

- **Multi-Language Support**: Python, Go, PHP SDKs based on TypeScript SDK success

- **Advanced Caching**: Response caching beyond basic rate limit state (could add in v1.1)

- **Request Interceptors**: Custom middleware for request/response modification (v1.1 feature)

- **Batch Operations Helper**: Utilities for bulk operations with automatic pagination and rate limit management (post-MVP optimization)

- **Performance Monitoring**: Built-in telemetry and performance tracking (could add opt-in telemetry later)

- **GraphQL Support**: Alternative query interface (not in Wildberries API, N/A)

### **MVP Success Criteria**

**Functional Completeness:**
- ✅ All API modules implemented with full endpoint coverage (**14 public modules** at v4.1.0, up from the original 11)
- ✅ All Swagger operations have corresponding TypeScript methods
- ✅ Rate limits extracted and enforced for all documented endpoints
- ✅ Error handling covers all HTTP status codes (401, 403, 404, 406, 409, 422, 429, 500, etc.), including RFC 7807 `problem+json` and marking-code diagnostics

**Quality Standards:**
- ✅ Zero TypeScript errors in strict mode
- ✅ ≥80% test coverage for modules (Products, Orders, Finances, …)
- ✅ ≥90% test coverage for core infrastructure (BaseClient, RateLimiter, RetryHandler)
- ✅ Small, tree-shakeable dual ESM/CJS build (Vite + `vite-plugin-dts`)
- ✅ Zero high/critical security vulnerabilities (npm audit)

**Documentation & DX:**
- ✅ 100% public API JSDoc coverage with examples
- ✅ Quickstart guide enables first API call in < 30 minutes
- ✅ Working examples for all modules
- ✅ TypeDoc API reference + VitePress docs site generated and published (bilingual EN/RU)
- ✅ README with installation, configuration, usage, and troubleshooting

**Release Readiness:**
- ✅ Published to npm with semantic versioning (**current: v4.1.0**)
- ✅ GitHub repository with CI/CD pipeline (tests, linting, type checking)
- ✅ License and contribution guidelines
- ✅ Changelog documenting all releases
- ✅ Issue templates for bugs and feature requests

---

## Post-MVP Vision

### **Phase 2 Features (v1.1 - v1.3)**

**Enhanced Developer Experience:**

- **Request/Response Interceptors**: Allow developers to inject custom logic for logging, monitoring, request transformation, and custom authentication flows beyond basic API key

- **Advanced Caching Layer**: Intelligent response caching with TTL support, cache invalidation strategies, and configurable cache backends (in-memory, Redis, custom)

- **Batch Operations Utilities**: Helper functions for bulk operations with automatic pagination handling, parallel request execution within rate limits, and progress tracking

- **Debugging Tools**: Built-in debug mode with request/response logging, timing information, rate limit state inspection, and connection diagnostics

**Browser Compatibility:**

- **Browser Build**: Separate browser-compatible bundle with secure API key handling strategies (proxy pattern documentation, environment-specific builds)

- **CORS Support**: Documentation and examples for handling CORS in browser environments with proxy server patterns

**Performance Enhancements:**

- **Connection Pooling**: HTTP connection reuse for improved performance in high-throughput scenarios

- **Streaming Support**: Large file upload/download with progress tracking and resume capability

- **Compression**: Automatic gzip/brotli compression for large payloads

### **Long-Term Vision (Year 1-2)**

**Ecosystem Expansion:**

- **Model Context Protocol (MCP) Server**: Expose SDK functionality via MCP for AI agent integration, enabling LLMs to interact with Wildberries API through structured tool calls - aligning with growing AI automation trends

- **CLI Tool (`wb-cli`)**: Command-line interface for common operations, useful for scripts, CI/CD pipelines, and manual testing without writing code

- **Webhook Handlers**: Event-driven architecture support with webhook verification, event routing, and retry mechanisms for real-time integrations

- **SDK Plugins System**: Extensible plugin architecture allowing community to add custom functionality (custom rate limiters, logging adapters, cache backends)

**Multi-Language Support:**

- **Python SDK**: Leverage TypeScript SDK learnings to build Python equivalent for data science and backend use cases

- **Go SDK**: High-performance Go implementation for enterprise microservices and cloud-native applications

- **PHP SDK**: Support PHP developers building WordPress/Laravel integrations

**Enterprise Features:**

- **OAuth 2.0 Support**: If Wildberries adds OAuth, implement comprehensive OAuth flow support with token refresh and management

- **Multi-Account Management**: Utilities for managing multiple Wildberries seller accounts with account switching and isolation

- **Audit Logging**: Comprehensive audit trail for enterprise compliance requirements

- **Custom Network Configuration**: Proxy support, custom DNS, certificate pinning for enterprise security requirements

### **Expansion Opportunities**

**Developer Tools & Services:**

- **Online Playground**: Interactive sandbox environment where developers can test API calls without local setup (like Stripe's API playground)

- **VSCode Extension**: SDK-aware code completion, inline API documentation, example code snippets, and integration templates

- **Monitoring Dashboard**: Web-based monitoring for API usage, rate limit tracking, error analytics, and performance insights

**Community & Education:**

- **Starter Templates**: Project templates for common integration patterns (inventory sync, order management, analytics dashboard)

- **Video Tutorials**: Comprehensive video course covering SDK usage, best practices, and real-world integration examples

- **Integration Showcase**: Community-contributed showcase of tools and integrations built on the SDK

- **Developer Community**: Discord/Slack community for SDK users to share knowledge and get support

**Platform Integration:**

- **Low-Code Integration**: Zapier/Make.com/n8n integration nodes for no-code automation

- **Workflow Orchestration**: Integration with Temporal, Airflow, or other workflow engines for complex integration pipelines

- **BI Tool Connectors**: Direct connectors for Tableau, PowerBI, Looker for analytics use cases

---

## Technical Considerations

> **TL;DR** (as built): Node.js ≥ 20, TypeScript strict mode, **Axios** HTTP client (+ `dotenv` for examples), **Vite** dual ESM/CJS build, **Vitest 4 + MSW 2** testing, **TypeDoc + VitePress** docs, single-package repo with subpath exports. Minimal dependencies, automated security scanning, ~16 typed error classes, `tokenType`-aware rate limiting.

### **Platform Requirements**

- **Target Platforms**: Node.js **≥ 20** (LTS)
- **Browser/OS Support**: Targets Node.js; browser support remains out of scope (requires different API key handling and CORS considerations)
- **Performance Requirements**:
  - SDK overhead: <200ms per operation
  - Bundle size: small, tree-shakeable dual ESM/CJS build
  - Memory footprint: Minimal, no memory leaks
  - Code generation: fast for all 14 specs
  - Test execution: full suite runs well within CI budgets (~2,376 tests across 80 files)

### **Technology Preferences**

**Frontend (TypeScript SDK Core):**
- **Language**: TypeScript with strict mode enabled
- **Build Tool**: **Vite** (+ `vite-plugin-dts`) for fast dual builds and emitted `.d.ts`
- **Module System**: **ESM + CJS dual build** for maximum compatibility, with **subpath exports** (`./finances`, `./analytics`, `./communications`, `./reports`) so module types import without clashing with global `Error`/`Date`
- **Type Checking**: TypeScript compiler with strict settings (`strict`, `noImplicitAny`, `strictNullChecks`)

**Backend (HTTP Client & Infrastructure):**
- **HTTP Client**: **Axios** (chosen) — rich ecosystem, interceptor support, widespread adoption. `dotenv` is used in example scripts.
- **Rate Limiting**: Custom per-endpoint token-bucket implementation (limits parsed from Swagger descriptions), with `basic`/`test` token multipliers via `tokenType` — no external dependency needed
- **Retry Logic**: Custom exponential backoff — lightweight, tailored to Wildberries specifics (retries network errors / 5xx / 429; does not retry 401/403/422)

**Database (Not Applicable):**
- SDK is stateless; no database requirements
- Rate limit state maintained in memory only

**Hosting/Infrastructure:**
- **Package Registry**: npm (primary distribution)
- **CI/CD**: GitHub Actions for automated testing, linting, building, and publishing
- **Documentation Hosting**: GitHub Pages or Vercel for TypeDoc output
- **Repository**: GitHub with public repository for open-source collaboration

### **Architecture Considerations**

**Repository Structure:**
```
wb-api-sdk/
├── src/                    # Source code
│   ├── client/            # Core HTTP client infrastructure (BaseClient, RateLimiter, RetryHandler)
│   ├── modules/           # API modules (14 public sdk.* modules + supplemental 1_0_0)
│   ├── types/             # TypeScript types (generated/maintained from Swagger)
│   ├── errors/            # Custom error classes (~16)
│   ├── utils/             # Shared utilities (~16 exported helpers)
│   ├── config/            # SDK config + per-module rate-limit tables
│   └── index.ts           # Main SDK export
├── tools/                  # Code generation / maintenance tools
├── tests/                  # Test suites (unit + integration, ~2,376 tests)
├── examples/               # Usage examples per module
├── docs/                   # VitePress + TypeDoc documentation
└── wildberries_api_doc/    # Source Swagger files (14 specs, read-only)
```

**Service Architecture:**
- **Single package**: One npm package (`daytona-wildberries-typescript-sdk`) with all modules, plus subpath exports for module types
- **Modular Exports**: Modules are independently importable for tree-shaking
- **Layered Architecture**:
  - **Layer 1**: Core infrastructure (BaseClient, RateLimiter, RetryHandler)
  - **Layer 2**: Types (from Swagger schemas)
  - **Layer 3**: API modules (business logic, delegates to Layer 1)
  - **Layer 4**: Main SDK class (aggregates all modules)

**Integration Requirements:**
- **Wildberries API**: OpenAPI 3.0.1 specifications (14 files) as source of truth — the SDK historically *leads* WB's own announcements
- **Context7 MCP**: Mandatory use for documentation lookup during development (see CLAUDE.md)
- **External Dependencies**: Minimize to essential only (HTTP client, possibly YAML parser for code generation)

**Security/Compliance:**
- **API Key Management**: Environment variable recommended, support for configuration object
- **No Secret Logging**: Never log API keys or sensitive data
- **Dependency Scanning**: Automated npm audit in CI/CD pipeline
- **HTTPS Only**: All API communication over HTTPS
- **TypeScript Strict Mode**: Compile-time safety to prevent common security issues

---

## Constraints & Assumptions

### **Constraints**

**Budget:**
- **Development**: Open-source project with no direct budget; development time is the primary constraint
- **Infrastructure**: Leverage free tiers (GitHub Actions CI/CD, GitHub Pages hosting, npm registry)
- **External Services**: Avoid paid services unless absolutely necessary for MVP
- **Monetization**: No revenue model for v1.0; pure open-source community play

**Timeline:**
- **MVP Target (original)**: 6-7 weeks from project start to v1.0 release — **delivered**, and the project has since progressed to **v4.1.0** through continuous maintenance
  - Week 1-2: Foundation (core infrastructure, code generation framework)
  - Week 2-3: Code generation and type system
  - Week 3-5: Module implementation
  - Week 5-6: Testing, documentation, examples
  - Week 6-7: Beta testing, bug fixes, release preparation
- **Post-MVP**: Iterative releases based on community feedback, adoption, and Wildberries API changes (223 Backlog.md tasks completed to date)

**Resources:**
- **Development Team**: Single developer (initially) with potential for community contributors post-release
- **Testing Resources**: Automated testing only (unit + integration); no dedicated QA team
- **Documentation**: Self-authored documentation; community may contribute examples and guides
- **Support**: Community-based support via GitHub issues; no dedicated support team

**Technical:**
- **API Stability**: Dependent on Wildberries API stability; breaking changes upstream require SDK updates
- **Rate Limits**: Must respect Wildberries rate limits; cannot circumvent or work around platform restrictions
- **Authentication**: Limited to API key authentication (current Wildberries method); OAuth/other methods if/when Wildberries adds support
- **Node.js Version**: Requires Node.js **≥ 20** (the shipped `engines` constraint) due to reliance on modern JavaScript features
- **Bundle Size**: Keep the build small and tree-shakeable; constrain feature additions that bloat output
- **No Official Partnership**: No official relationship with Wildberries; SDK is independent third-party project

### **Key Assumptions**

**Market & Adoption:**
- TypeScript/JavaScript ecosystem has sufficient Wildberries developer population to justify SDK development
- Developers prefer type-safe SDKs over manual API integration for production use cases
- 100,000+ active Wildberries sellers generate enough integration demand to support ecosystem
- Open-source model will attract contributors and build community around SDK

**Technical:**
- Wildberries API specifications (OpenAPI 3.0.1) are accurate and complete representations of actual API behavior
- Wildberries will maintain backward compatibility or provide migration paths for API changes
- Rate limit documentation in Swagger descriptions is accurate and enforced consistently
- Node.js 20+ adoption is widespread enough that the minimum version requirement won't significantly limit audience
- Modern TypeScript features provide sufficient capabilities for SDK development
- The type-generation approach scales across the 14 tracked specs without major architectural issues

**Development:**
- 6-7 week timeline is achievable with code generation approach and single developer
- Context7 MCP server provides reliable documentation lookup during development
- Existing Swagger files contain sufficient information to generate complete, functional SDK
- Test coverage targets (80%/90%) are achievable within timeline constraints
- Community will report bugs and suggest improvements after release

**Business:**
- No monetization required for v1.0 success; community adoption is primary metric
- Open-source model (Personal Use license — see `LICENSE`) will not create competitive disadvantages
- Wildberries will not release official SDK that makes this project obsolete (or if they do, this SDK can coexist)
- Growing ecosystem around SDK will create indirect value (reputation, learning, potential business opportunities)

**User Behavior:**
- Developers will read documentation and follow quickstart guides
- Users will report issues via GitHub rather than expecting direct support
- Community will contribute examples, bug fixes, and potentially features
- Developers value developer experience enough to choose this SDK over alternatives (manual integration, generic tools)

**Geographic & Regulatory:**
- No significant regulatory barriers to SDK distribution (open-source software, no data collection)
- Russian/Eastern European developer community is accessible and reachable via npm/GitHub
- Language barrier (Russian API documentation, English SDK) is manageable for target technical audience
- No export controls or sanctions affecting SDK distribution

---

## Risks & Open Questions

> **TL;DR** (original risk view): HIGH risks: Swagger spec accuracy, Wildberries API breaking changes, official SDK release, solo developer bandwidth. MEDIUM risks: Rate limit parsing, code generation complexity, limited market size. **As shipped (v4.1.0)**: the open questions below (Axios vs fetch, mono-repo, package name, docs platform) are all **resolved** — Axios, single package (`daytona-wildberries-typescript-sdk`), VitePress + TypeDoc. The remaining live risks are WB API breaking changes and ongoing maintenance bandwidth.

### **Key Risks**

**Technical Risks:**

- **Swagger Spec Accuracy (HIGH)**: OpenAPI specifications may not accurately reflect actual API behavior, leading to SDK methods that fail in production despite passing tests. **Impact**: Significant rework required, user trust erosion. **Mitigation**: Early validation with real API endpoints, community beta testing before v1.0.

- **Rate Limit Parsing Complexity (MEDIUM)**: Rate limits documented in Russian text within Swagger descriptions may be inconsistent, ambiguous, or missing. **Impact**: Incorrect rate limiting could cause API bans. **Mitigation**: Conservative defaults, extensive testing, clear documentation about rate limit assumptions.

- **Code Generation Scalability (MEDIUM)**: The type/module maintenance flow may encounter edge cases across the 14 specs that require special handling. **Impact**: Rework, manual workarounds. **Mitigation**: Start with critical modules first, iterate based on learnings. *(Largely mitigated in practice — 223 tasks shipped.)*

- **Type Safety vs Bundle Size Trade-off (MEDIUM)**: Comprehensive type definitions may exceed 100KB bundle size target. **Impact**: Performance commitment broken, adoption impacted. **Mitigation**: Type optimization, tree-shaking validation, consider separate @types package.

- **Wildberries API Breaking Changes (HIGH)**: Wildberries may introduce breaking changes to API without notice or migration path. **Impact**: SDK breaks for all users, emergency maintenance required. **Mitigation**: Version locking support, changelog monitoring, community alerting system.

**Market Risks:**

- **Limited Market Size (MEDIUM)**: Wildberries developer ecosystem may be smaller than estimated, limiting adoption potential. **Impact**: Low usage, minimal community growth. **Mitigation**: Early validation through developer surveys, pivot to adjacent markets if needed (other Russian e-commerce platforms).

- **Official SDK Release (HIGH)**: Wildberries may release official SDK, making this project redundant. **Impact**: Project becomes obsolete, wasted effort. **Mitigation**: Differentiate on quality/DX, maintain as community alternative, potential collaboration opportunity.

- **Language Barrier (LOW)**: Russian-only API documentation may create friction for international developers. **Impact**: Reduced international adoption. **Mitigation**: Comprehensive English documentation in SDK, translation of key Swagger concepts.

**Operational Risks:**

- **Solo Developer Bandwidth (HIGH)**: Single developer may face time constraints, burnout, or inability to handle support requests. **Impact**: Slow bug fixes, feature delays, community frustration. **Mitigation**: Aggressive automation (CI/CD, testing), clear contribution guidelines to encourage community help, realistic timeline buffering.

- **Dependency Vulnerabilities (MEDIUM)**: External dependencies (Axios, testing libraries) may introduce security vulnerabilities. **Impact**: Security scan failures, forced updates, compatibility issues. **Mitigation**: Minimal dependencies, automated security scanning, rapid patching process.

- **Community Toxicity (LOW)**: Open-source community may have unrealistic expectations or toxic behavior. **Impact**: Burnout, project abandonment. **Mitigation**: Clear code of conduct, realistic scope communication, healthy boundaries.

### **Open Questions**

**Technical Decisions** (resolved as of v4.1.0):

- **Axios vs Fetch**: **Resolved — Axios.** Chosen for its rich ecosystem and interceptor support for retry/rate limiting.

- **Mono-repo vs Multi-package**: **Resolved — single package.** All modules ship in one npm package (`daytona-wildberries-typescript-sdk`) with subpath exports for module types; separate packages were not needed.

- **Error Serialization**: **Resolved — typed Error hierarchy.** ~16 error classes extend `WBAPIError`; parse helpers (`parseBidOutOfRangeDetail`, `parseMetaValidationFail`) narrow errors at generic boundaries.

- **Pagination Strategy**: The SDK exposes manual page control (per-method params); auto-pagination generators remain a possible future enhancement.

- **Type Generation Tool**: The project maintains its own types/modules from the Swagger specs (with WB-specific rate-limit and multi-domain handling) rather than relying on a generic generator.

**Product/Market Questions:**

- **Target Package Name**: **Resolved — `daytona-wildberries-typescript-sdk`.** Published to npm and importable as such.

- **Documentation Platform**: **Resolved — VitePress + TypeDoc on GitHub Pages.** Live at `salacoste.github.io/daytona-wildberries-typescript-sdk` (bilingual EN/RU).

- **Community Platform**: Discord, GitHub Discussions, Slack, or no dedicated community space for v1.0? What's the minimum viable community setup?

- **Beta Testing Strategy**: Who should be beta testers? How do we recruit them? What's the minimum viable beta program?

**Go-to-Market Questions:**

- **Launch Strategy**: Quiet release vs announcement (dev.to, Reddit, Twitter)? What's the right level of promotion for v1.0?

- **Success Metrics Collection**: Should we include optional telemetry for usage analytics, or rely purely on npm download stats and GitHub metrics?

- **Partnership Opportunity**: Should we reach out to Wildberries for endorsement/partnership, or remain independent? What are the pros/cons?

### **Areas Needing Further Research**

**Technical Research:**

- **Node.js Fetch Maturity**: Native fetch in modern Node.js vs Axios was evaluated; **Axios was chosen** for interceptor/timeout/retry parity. (Revisit only if dep-minimization becomes a priority.)

- **Wildberries API Real-World Behavior**: Validate Swagger specs against actual API endpoints for discrepancies, undocumented behaviors, or edge cases

- **Rate Limit Enforcement**: Test actual rate limit enforcement by Wildberries (hard limits vs soft limits, ban duration, warning mechanisms)

- **Bundle Size Optimization**: Research TypeScript type optimization techniques, code splitting strategies, and tree-shaking effectiveness

**Market Research:**

- **Developer Population**: Survey or estimate actual size of Wildberries developer community (integration projects, active developers)

- **Competitive Analysis**: Research existing Wildberries integration tools/SDKs (even if incomplete) to understand competitive landscape

- **Developer Pain Points**: Validate problem statement through developer interviews or forum analysis (Reddit, Stack Overflow, dev.to)

**Process Research:**

- **Code Generation Best Practices**: Research OpenAPI code generation patterns, common pitfalls, and optimization techniques

- **Open Source Sustainability**: Research sustainable open-source project models for SDKs (support models, contribution incentives, governance)

- **TypeScript SDK Benchmarks**: Analyze successful TypeScript SDKs (Stripe, Twilio, Shopify) for architecture patterns, DX practices, and quality standards

---

## Appendices

### **A. Research Summary**

This Project Brief is informed by comprehensive research documented in the following project files:

**Pre-Product Requirements Document** (`pre_product.md`):
- Detailed breakdown of the API modules with priorities (Critical, High, Medium)
- Complete architecture specifications including project structure and technology stack
- 7-phase development roadmap with week-by-week timeline
- Technical specifications for code generation workflow
- Quality standards and success criteria checklist

**Claude Code Configuration** (`.claude/CLAUDE.md`):
- Comprehensive development guidelines for SDK implementation
- TypeScript architecture patterns and naming conventions
- Code generation workflow with Context7 MCP integration requirements
- Testing strategy (Vitest unit tests, MSW integration tests)
- Critical implementation requirements (rate limiting, retry logic, error handling, multi-domain URLs)
- Complete implementation checklist for module completion

**Wildberries API Documentation** (`wildberries_api_doc/*.yaml`):
- OpenAPI 3.0.1 specifications (**14 files** in this repo) covering all tracked Wildberries marketplace functionality
- Rate limit specifications embedded in endpoint descriptions
- Authentication schemes (HeaderApiKey across all endpoints)
- Request/response schemas for type generation
- Multi-domain base URL configurations per endpoint

**Key Research Findings:**

1. **API Completeness**: All API categories are well-documented with OpenAPI 3.0.1 specs, providing a solid foundation for code generation

2. **Rate Limiting Complexity**: Rate limits are documented in Russian text within description fields using table format, requiring custom parsing logic

3. **Multi-Domain Architecture**: Different API categories use different base URLs (common-api, content-api, marketplace-api, seller-analytics-api, finance-api, statistics-api)

4. **Type Safety Opportunity**: Comprehensive schemas in Swagger files enable full TypeScript type generation with 100% coverage

5. **Developer Pain Points**: Manual integration requires 2-4 weeks per developer based on similar API integration projects

### **B. References**

**Official Wildberries Resources:**
- Wildberries Developer Portal: https://dev.wildberries.ru/
- Wildberries API Documentation: https://dev.wildberries.ru/openapi/
- OpenAPI Specification: https://swagger.io/specification/

**Technology Documentation:**
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Node.js Documentation: https://nodejs.org/docs/
- Vitest Testing Framework: https://vitest.dev/
- MSW (Mock Service Worker): https://mswjs.io/
- TypeDoc: https://typedoc.org/

**SDK Development References:**
- Stripe TypeScript SDK: https://github.com/stripe/stripe-node (exemplary TypeScript SDK architecture)
- Shopify API Library: https://github.com/Shopify/shopify-api-js (code generation patterns)
- Twilio Node SDK: https://github.com/twilio/twilio-node (comprehensive API coverage example)

**Community & Standards:**
- OpenAPI Generator: https://openapi-generator.tech/
- npm Best Practices: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- Semantic Versioning: https://semver.org/
- Keep a Changelog: https://keepachangelog.com/

**Project Resources:**
- Project Repository: [github.com/salacoste/daytona-wildberries-typescript-sdk](https://github.com/salacoste/daytona-wildberries-typescript-sdk)
- Documentation Site: [salacoste.github.io/daytona-wildberries-typescript-sdk](https://salacoste.github.io/daytona-wildberries-typescript-sdk)
- npm Package: [`daytona-wildberries-typescript-sdk`](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
- Issue Tracker: GitHub Issues

---

## 📊 Quick Reference Tables

### Module Priority Matrix

> Reflects the **shipped v4.1.0** surface — 14 public `sdk.*` modules. "Public methods" is the authoritative count from the class-body async methods. Priorities are the original build priorities; all 14 are delivered.

| Module (`sdk.*`) | Original Priority | Swagger File | Key Features | Public methods |
|--------|----------|--------------|--------------|--------------|
| `general` | HIGH | `01-general.yaml` | Ping, news, seller info | 10 |
| `products` | CRITICAL | `02-products.yaml` | Categories, cards, media, pricing, stock | 51 |
| `ordersFBS` | CRITICAL | `03-orders-fbs.yaml` | Seller warehouse fulfillment | 35 |
| `finances` | CRITICAL | `13-finances.yaml` | Balance, reports, transactions | 11 |
| `ordersFBW` | HIGH | `07-orders-fbw.yaml` | WB warehouse fulfillment | 12 |
| `communications` | HIGH | `09-communications.yaml` | Chat, Q&A, reviews | 25 |
| `analytics` | HIGH | `11-analytics.yaml` | Sales stats, CSV reports, item ratings | 19 |
| `reports` | HIGH | `12-reports.yaml` | Report generation | 25 |
| `promotion` | MEDIUM | `08-promotion.yaml` | Campaigns, bids, advertising | 45 |
| `tariffs` | MEDIUM | `10-tariffs.yaml` | Tariff info, commission | 5 |
| `inStorePickup` | MEDIUM | `06-in-store-pickup.yaml` | Click & collect management | 18 |
| `ordersDBS` | *(added post-v1.0)* | `05-orders-dbs.yaml` | Delivery by Seller | 20 |
| `userManagement` | *(added post-v1.0)* | — | Seller-profile users & invites | 4 |
| `returns` | *(added v3.10.0)* | aggregator | Unified FBO+FBS+Finance returns | 3 |

**Total: 283 public methods across the 14 modules.** A supplemental internal module (`src/modules/1_0_0/`, 5 methods) is not a public `sdk.*` property.

**Implementation Order (historical)**: General → [Products, Orders FBS, Finances] in parallel → [Orders FBW, Communications, Analytics, Reports] in parallel → [Promotion, Tariffs, In-Store Pickup] → (later) Orders DBS, User Management, Returns aggregator.

---

### Technology Decision Matrix

| Decision | Option A | Option B | **Chosen (as shipped)** | Rationale |
|----------|----------|----------|----------------|-----------|
| **HTTP Client** | Axios (mature, interceptors) | Native fetch (zero deps) | **Axios** | Interceptor support for retry/rate limiting, rich ecosystem |
| **Build Tool** | Vite (fast, modern) | tsup (simple) | **Vite** (+ `vite-plugin-dts`) | Better DX, faster builds, widely adopted, emits `.d.ts` |
| **Testing** | Vitest + MSW | Jest + MSW | **Vitest 4 + MSW 2** | Better TypeScript support, faster, Vite integration |
| **Package Strategy** | Single package | Multi-package | **Single package** | Simpler; subpath exports cover module-type imports |
| **Module System** | ESM only | ESM + CJS dual | **ESM + CJS dual** | Maximum compatibility, npm best practice |
| **Type Generation** | Custom/maintained | openapi-typescript | **Maintained from specs** | WB-specific features (rate limits, multi-domain) |
| **Documentation** | TypeDoc only | TypeDoc + site | **TypeDoc + VitePress** (GitHub Pages) | Bilingual EN/RU site, API reference, zero cost |
| **CI/CD** | GitHub Actions | GitLab CI | **GitHub Actions** | Free tier sufficient, native integration |

---

### Timeline Overview

> Original v1.0 plan. **Delivered**, then extended well past v1.0 to the current **v4.1.0** (223 Backlog.md tasks completed).

| Phase | Duration | Weeks | Key Deliverables | Success Criteria |
|-------|----------|-------|------------------|------------------|
| **Foundation** | 2 weeks | W1-W2 | BaseClient, RateLimiter, RetryHandler, Error hierarchy | Core infrastructure passing tests |
| **Code Generation** | 1 week | W2-W3 | Type generator, module generator, rate limit parser | Successful generation of 1 module |
| **Module Implementation** | 2 weeks | W3-W5 | Modules implemented | Full endpoint coverage |
| **Testing & Docs** | 1 week | W5-W6 | Test suite, examples, documentation | ≥80% coverage, all examples working |
| **Beta & Release** | 1 week | W6-W7 | Bug fixes, beta testing, npm publish | v1.0 published to npm |
| **Post-v1.0 (actual)** | ongoing | — | +3 modules (DBS, userManagement, returns), v4.0 breaking cleanup, v4.1 item-rating | v4.1.0 on npm |
| **Total (original)** | **6-7 weeks** | **W1-W7** | Production-ready SDK | All MVP success criteria met |

**Critical Path**: Foundation → Code Generation → Critical Modules (Products, Orders FBS, Finances) → Testing → Release

**Buffer**: 1 week built into timeline for unforeseen issues

---

### Risk Assessment Grid

| Risk | Severity | Likelihood | Impact | Mitigation | Owner |
|------|----------|------------|--------|------------|-------|
| Swagger spec inaccuracy | HIGH | Medium | Significant rework, user trust loss | Early API validation, beta testing | Dev |
| Wildberries API breaking changes | HIGH | Medium | SDK breaks, emergency fixes | Version locking, changelog monitoring | Dev |
| Official SDK release | HIGH | Low | Project becomes obsolete | Differentiate on quality, collaborate | PM |
| Solo developer bandwidth | HIGH | High | Delays, incomplete features | Automation, realistic scope, community | Dev |
| Rate limit parsing complexity | MEDIUM | Medium | Incorrect limiting, API bans | Conservative defaults, testing | Dev |
| Code generation edge cases | MEDIUM | Medium | Timeline delays | Start with critical modules, iterate | Dev |
| Limited market size | MEDIUM | Low | Low adoption | Early validation, pivot if needed | PM |
| Bundle size exceeds target | MEDIUM | Low | Performance issues | Type optimization, tree-shaking | Dev |
| Dependency vulnerabilities | MEDIUM | Medium | Security issues | Minimal deps, automated scanning | Dev |
| Language barrier | LOW | Low | Reduced international reach | English docs, translate concepts | PM |
| Community toxicity | LOW | Low | Burnout | Code of conduct, boundaries | PM |

**Risk Response Strategy**:
- **HIGH/High**: Immediate action required (automation, early validation)
- **HIGH/Medium**: Active monitoring and mitigation (testing, version control)
- **MEDIUM**: Standard mitigation strategies (best practices, monitoring)
- **LOW**: Acceptance with contingency plans

---

## Next Steps

> The SDK described here is **shipped (v4.1.0)**. The pre-build "immediate actions" below are retained as historical context for how the project started; the current focus is maintenance and staged enhancements.

### **Immediate Actions (current, v4.1.0+)**

1. **Maintenance cadence**: Monitor Wildberries API announcements, validate whether the SDK already reflects each change (Swagger vs `src/modules` + types + rate-limits), and track every actionable item in Backlog.md

2. **Deprecation discipline**: Retire deprecated surface on WB deadlines via coordinated major/minor bumps (see the v4.0.0 breaking removal and the v4.1.0 item-rating deprecation in `CHANGELOG.md`)

3. **Documentation upkeep**: Keep the VitePress + TypeDoc site, module guides, and migration guides in sync with shipped behavior

4. **Test hygiene**: Maintain coverage thresholds (≥90% core infra, ≥80% modules) and keep the ~2,376-test suite green across releases

5. **Staged enhancements**: Evaluate the post-MVP / long-term items below (interceptors, caching, CLI, MCP server, OAuth/JWT/Web API module) as community demand and WB API support warrant

### **Immediate Actions (historical — original v1.0 kickoff)**

1. Review and validate this Project Brief for completeness and feasibility
2. Resolve critical open questions (HTTP client, package name, repo strategy) — **all resolved; see above**
3. Set up project infrastructure (repo, TypeScript strict, CI/CD, npm) — **done**
4. Validate Swagger specifications against the real Wildberries API — **ongoing discipline**
5. Begin Foundation Phase (BaseClient, error hierarchy, Vitest + MSW, code-gen framework) — **done**

### **PM Handoff**

This Project Brief provides the full context for the **Wildberries API TypeScript SDK**.

**For Product Manager / Technical Lead:**

The SDK is shipped and in maintenance. The PRD (`docs/prd.md`) and architecture docs expand on this brief with detailed specifications. When planning new work:

1. **Review this brief and `docs/prd.md`** to understand the full project scope, constraints, and technical considerations

2. **Check `CHANGELOG.md` and the open Backlog.md board** for the current state and any in-flight items

3. **Ask for clarification** on any aspects that need additional detail or validation:
   - Specific API endpoint requirements and edge cases
   - Detailed error handling scenarios and recovery strategies
   - Testing scenarios and acceptance criteria for each module
   - Documentation structure and example code requirements

4. **Validate assumptions** listed in the Constraints & Assumptions section, particularly maintenance bandwidth and WB API stability

5. **Address open questions** from the Risks & Open Questions section before scoping a new release

6. **Suggest improvements** based on expertise in SDK development, TypeScript best practices, and API integration patterns

**Key Context for Future Work:**

- **Source of Truth**: OpenAPI 3.0.1 specification files (14) in `wildberries_api_doc/`
- **Development Guidelines**: Technical guidance in `.claude/CLAUDE.md`
- **Architecture Reference**: `docs/architecture.md` and patterns in `pre_product.md`
- **Success Criteria**: MVP Success Criteria checklist in this brief (Section: MVP Scope)

**Critical Requirements to Carry Forward:**

- **Full API Coverage**: All 14 modules with all endpoints implemented
- **Type Safety**: TypeScript strict mode, controlled `any` usage
- **Production Quality**: Comprehensive error handling, rate limiting, retry logic
- **Developer Experience**: <30 min time-to-first-call, excellent documentation
- **Performance**: Low SDK overhead, small tree-shakeable build

---

**Document Status**: ✅ Maintained — reflects shipped v4.1.0
**Version**: 1.0 (maintained) · **SDK Version**: 4.1.0
**Date**: 2026-08-09
**Next Milestone**: Continuous maintenance — track WB API announcements, ship module/patch releases, retire deprecated surface on WB deadlines

---


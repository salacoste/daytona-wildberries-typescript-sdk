---
title: Guides
description: In-depth guides for production deployment, best practices, performance tuning, security, and advanced SDK usage
layout: doc
---

# Guides

In-depth guides for production deployment and advanced SDK usage.

::: warning New in v3.9.0 — Deadline April 29, 2026
**[Mandatory Product Characteristics](/guides/mandatory-product-characteristics)** -- WB now requires mandatory characteristics when creating product cards in 10+ categories. Check `isRequiredForCreate` in `getObjectCharc()` response and include required characteristics in create/update requests.
:::

::: tip New in v3.7.0
- **[Finance Reports v5 to v1 Migration](/guides/migration-finance-reports-v5-to-v1)** -- The v5 `getSupplierReportDetailByPeriod()` endpoint will be **disabled on 2026-07-15**. Migrate to `getSalesReportsDetailed()` now.
- **[Tracking Promotion Channels with Substitute Articles](/guides/tracking-promotion-channels-with-substitute-articles)** -- Reconcile external marketing spend against settled revenue using substitute article fields.
:::

---

## Migration Guides

::: warning IMPORTANT
- Finance Reports v5 endpoint will be **disabled 2026-07-15** -- migrate to v1 immediately.
- If you are using Promotion module Type 8 campaigns, migrate to Type 9 before **February 2, 2026**.
:::

- **[Migration v3.0.0 - Complete Deprecation Guide](/guides/migration-v3)** - Comprehensive guide for migrating to v3.0.0 (62 removed methods, 14 removed types)
- **[Finance Reports v5 → v1 Migration](/guides/migration-finance-reports-v5-to-v1)** - Migrate from deprecated `getSupplierReportDetailByPeriod()` to `getSalesReportsDetailed()` -- field mapping, string money amounts with `parseMoneyAmount`, and code examples **(deadline: 2026-07-15)**
- **[Migration v2.7 - Analytics v3 Sales Funnel](/guides/migration-v2.7-analytics-v3)** - Migrate from deprecated v2 Sales Funnel methods to new v3 endpoints
- **[Type 8 → Type 9 Campaign Migration](/guides/migration-type8-to-type9)** - Migrate from standard bid campaigns (type 8) to custom/standard bid campaigns (type 9)
- **[Type 8 → Type 9 (alternate)](/guides/migration-v2.4-promotion-deprecation)** - Original deprecation notice for Type 8 campaign removal
- **[Migration v2.3 - Promotion Required Parameters](/guides/migration-v2.3)** - Breaking changes in Promotion module method signatures
- **[Migration DBS Legacy to Bulk](/guides/migration-dbs-legacy-to-bulk)** - Migrate from deprecated single-order DBS methods to bulk APIs

---

## Production Guides

- **[Best Practices](/guides/best-practices)** - Error handling, security, and testing patterns
- **[Performance Tuning](/guides/performance)** - Optimize rate limits, caching, and memory
- **[Performance Tuning (Extended)](/guides/performance-tuning)** - Comprehensive performance optimization for production deployments -- rate limits, caching, monitoring, and benchmarking
- **[Security](/guides/security)** - API key management and secure integration
- **[Testing](/guides/testing)** - Unit and integration testing strategies
- **[Troubleshooting](/guides/troubleshooting)** - Common issues and solutions
- **[Configuration](/guides/configuration)** - SDK configuration options

---

## SDK Usage

### Product Management

- **[Working with Product Cards](/guides/working-with-product-cards)** - Complete guide to fetching, filtering, and paginating product cards
- **[Product Card Merging & Analytics](/guides/product-card-merging)** - Merged cards, advertising traffic distribution, and cross-variant analytics
- **[Mandatory Product Characteristics](/guides/mandatory-product-characteristics)** - Required characteristics for card creation (April 29, 2026 enforcement)

### Orders & Logistics

- **[Orders DBS Guide](/guides/orders-dbs-getting-started)** - Getting started with Delivery by Seller (DBS) order processing
- **[DBS Workflows](/guides/orders-dbs-workflows)** - End-to-end DBS workflow patterns and automation
- **[In-Store Pickup Guide](/guides/in-store-pickup-getting-started)** - Managing in-store pickup point orders
- **[Orders FBW (Supplies) Guide](/guides/orders-fbw-getting-started)** - Fulfillment by Wildberries supply management
- **[Stock Management](/guides/stock-management)** - Inventory control and tracking
- **[Returns Handling](/guides/returns-handling)** - Returns processing
- **[Supplies Planning](/guides/supplies-planning)** - Planning supplies to WB warehouses, acceptance coefficients, and FBW vs FBS strategy

### Advertising & Marketing

- **[Promotion & Advertising](/guides/promotion-advertising)** - Campaign management, bids, budget, and analytics
- **[Promotion Module Getting Started](/guides/promotion-getting-started)** - Complete guide to managing advertising campaigns, bidding, and search clusters
- **[Advertising Statistics Guide](/guides/advertising-statistics-guide)** - Detailed advertising performance metrics and reporting
- **[Advertising Campaign Best Practices](/guides/best-practices-advertising)** - Optimization strategies for advertising campaigns
- **[Advertising Campaigns (RU)](/guides/advertising-campaigns)** - Complete advertising management guide in Russian
- **[User Management](/guides/user-management)** - Managing user accounts and permissions

### Financial Operations

- **[Commissions & Fees](/guides/commissions-fees)** - Tariffs and commission calculations
- **[Realization Reports](/guides/realization-report)** - Sales and realization reports
- **[Reports Module](/guides/reports-module)** - Financial reporting
- **[Storage Fees](/guides/storage-fees-integration)** - Warehouse costs integration

### Finance Reconciliation

- **[Buyout & Return Reconciliation](/guides/buyout-return-reconciliation)** - Classify FBO/FBS return reasons, enrich returns with `orderType`, and reconcile against buyout counts per nmId using three pure client-side helpers. **(New in v3.9.3)**
- **[Tracking Promotion Channels with Substitute Articles](/guides/tracking-promotion-channels-with-substitute-articles)** - Reconcile external marketing spend against settled revenue using substitute article fields from the Wildberries financial report. Uses `parseMoneyAmount` when working with the v1 endpoint. **(New in v3.7.0)**
- **[Finance Reports v5 → v1 Migration](/guides/migration-finance-reports-v5-to-v1)** - Full field mapping from snake_case (v5) to camelCase (v1), string money amounts with the `parseMoneyAmount` helper, and drop-in code examples **(deadline: 2026-07-15)**

---

## Analytics Guides

- **[Sales Funnel Analytics](/guides/sales-funnel-analytics)** - Funnel metrics, period comparison, daily trends
- **[Sales Funnel Best Practices](/guides/best-practices-sales-funnel)** - Best practices for interpreting and acting on sales funnel data
- **[Search Queries Analytics](/guides/search-queries-analytics)** - SEO optimization, search positions, keyword performance
- **[Seller Analytics CSV](/guides/seller-analytics-csv)** - Long-term CSV reports with polling workflow (requires Jam)

---

## Customer Interaction

- **[Customer Communication](/guides/customer-communication)** - Questions, reviews, pinned feedback, buyer chat, returns
- **[Communications Guide](/guides/communications)** - Complete guide to customer engagement features: chat, Q&A, and reviews management
- **[Communications Getting Started](/guides/communications-getting-started)** - Complete guide to using the Communications module for Q&A, reviews, chat, claims, and pinned reviews

---

## Subscription & Tariffs

- **[Jam Subscription Detection](/guides/jam-subscription)** - Detect Jam subscription tier to optimize analytics limits
- **[Tariffs Overview](/guides/tariffs-overview)** - Understanding inventory vs supply tariffs
- **[Supplies & Tariffs](/guides/supplies-tariffs)** - Supply acceptance coefficients, cost calculations, and tariff comparisons

---

[← Back to Documentation Home](/)

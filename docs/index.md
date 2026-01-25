---
layout: home

hero:
  name: Wildberries SDK
  text: TypeScript SDK for Wildberries API
  tagline: Full-featured SDK providing type-safe access to all Wildberries marketplace API methods. Reduce integration time from weeks to hours.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/quickstart
    - theme: alt
      text: View API Reference
      link: /api/
    - theme: warning
      text: ⚠️ API Deprecation Notice
      link: /guides/migration-v2.4-promotion-deprecation

features:
  - icon: 🔒
    title: Type Safety First
    details: Auto-generated TypeScript types from OpenAPI specifications with 100% strict mode enforcement, eliminating runtime errors and providing full IDE autocomplete support across all 11 API modules.

  - icon: ⚡
    title: Intelligent Rate Limiting
    details: Automatic per-endpoint rate limit enforcement with token bucket algorithm prevents API bans. Built-in intelligent queuing system extracted directly from official API documentation.

  - icon: 🛡️
    title: Robust Error Handling
    details: Typed error hierarchy (AuthenticationError, RateLimitError, ValidationError, NetworkError) enables graceful failure handling with rich context and recovery guidance.

  - icon: 📦
    title: Complete API Coverage
    details: 11 fully-typed modules covering 100% of Wildberries API endpoints - Products, Orders (FBS/FBW), Finances, Analytics, Reports, Communications, Promotion, Tariffs, and more.

  - icon: 🔄
    title: Automatic Retry Logic
    details: Exponential backoff retry mechanism for transient failures (5xx errors, network issues) with configurable retry policies. Smart retry that distinguishes between retryable and permanent errors.

  - icon: 🚀
    title: Developer Experience
    details: Full IDE autocomplete, comprehensive TypeDoc documentation, 35+ working examples, 4 in-depth tutorials, and <5 minute time-to-first-API-call. Tree-shakeable builds (<100KB gzipped).
---

## Quick Start

Install the SDK and make your first API call in under 5 minutes:

```bash
npm install daytona-wildberries-typescript-sdk
```

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
const categories = await sdk.products.getParentCategories();
console.log(categories);
```

**👉 [Complete 5-Minute Quickstart Guide](/getting-started/quickstart)**

---

## ⚠️ Critical API Update - February 2, 2026

:::danger WILDBERRIES API DEPRECATION NOTICE
**Four Promotion API methods will be disabled on February 2, 2026**

Wildberries is transitioning from type 8 (standard bid) campaigns to type 9 (custom/standard bid) campaigns. The following methods will stop working:

- `getAutoGetnmtoadd()` - List of Product Cards
- `createAutoUpdatenm()` - Update Product Cards
- `getAutoStatWords()` - Statistics by Phrase Clusters
- `createAutoSetExcluded()` - Set/Remove Minus-Phrases

**⏱️ Migration Time: 30-60 minutes** | **⏰ Deadline: February 2, 2026** (6 weeks from today)

### Quick Migration Steps:

**1. Check Your Campaigns** (2 min):
```typescript
const campaigns = await sdk.promotion.getPromotionCount();
const type8 = campaigns.adverts?.filter(c => c.type === 8) || [];
console.log(`⚠️  Type 8 campaigns to migrate: ${type8.length}`);
```

**2. Update Your Code** (10-30 min):
```typescript
// ❌ OLD (Type 8)
const products = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });

// ✅ NEW (Type 9)
const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
const products = campaigns.adverts?.[0]?.nms || [];
```

**3. Test & Deploy** (15 min)

📖 **[Complete Migration Guide with 6 Practical Examples →](/guides/migration-v2.4-promotion-deprecation)**
:::

---

## Project Statistics

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number">100%</div>
    <div class="stat-label">API Coverage</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">98%</div>
    <div class="stat-label">Test Coverage</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">950+</div>
    <div class="stat-label">Tests</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">11</div>
    <div class="stat-label">API Modules</div>
  </div>
</div>

<style>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  line-height: 1.2;
}

.stat-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>

---

## Why Choose Wildberries SDK?

### 🎯 Production Ready

Battle-tested with 98% test coverage and 950+ tests. All 11 API modules fully implemented and validated against official Wildberries OpenAPI specifications.

### ⚡ Time Savings

Reduce integration time from weeks to hours. Complete type safety eliminates debugging runtime errors. Automatic rate limiting prevents API bans.

### 📚 Comprehensive Documentation

- **[5-Minute Quickstart](/getting-started/quickstart)** - Get started immediately
- **[4 In-Depth Tutorials](/getting-started/)** - Master key workflows
- **[Complete API Reference](/api/)** - Full TypeDoc documentation
- **[Best Practices Guide](/guides/best-practices)** - Production-ready patterns

### 🔧 Zero Configuration

Works out of the box with sensible defaults. Advanced configuration available for custom rate limiting, retry policies, timeouts, and logging levels.

---

## Supported API Modules

All 11 Wildberries API modules fully supported:

| Module | Coverage | Key Features |
|--------|----------|--------------|
| **General** | 100% | Ping, connectivity testing, seller info |
| **Products** | 100% | Catalog CRUD, pricing, media, inventory |
| **Orders FBS** | 100% | Seller fulfillment, order status, supplies |
| **Orders FBW** | 100% | WB warehouse fulfillment, supply planning, acceptance coefficients, cost calculator |
| **Finances** | 100% | Balance, transactions, reports, payouts |
| **Analytics** | 100% | Sales funnel, search queries, CSV exports |
| **Reports** | 100% | Income reports, sales reports, data exports |
| **Communications** | 100% | Customer chat, Q&A, reviews management |
| **Promotion** | 100% | Campaigns, promo codes, advertising ⚠️ **[Migration Required](/guides/migration-v2.4-promotion-deprecation)** |
| **Tariffs** | 100% | Commission rates, fee schedules |
| **In-Store Pickup** | 100% | Pickup point orders and management |

**[View Complete Module Documentation →](/api/)**

---

## Common Use Cases

<div class="use-cases">
  <div class="use-case-card">
    <h3>📦 Product Management</h3>
    <p>Sync product catalogs, update pricing, manage inventory across warehouses.</p>
    <a href="/getting-started/tutorials/product-catalog-sync">View Tutorial →</a>
  </div>

  <div class="use-case-card">
    <h3>📋 Order Fulfillment</h3>
    <p>Process customer orders, manage shipping, track deliveries for FBS and FBW.</p>
    <a href="/getting-started/tutorials/order-fulfillment">View Tutorial →</a>
  </div>

  <div class="use-case-card">
    <h3>📊 Analytics & Reporting</h3>
    <p>Generate sales reports, analyze performance, export data for BI tools.</p>
    <a href="/getting-started/tutorials/analytics-dashboard">View Tutorial →</a>
  </div>

  <div class="use-case-card">
    <h3>💰 Financial Management</h3>
    <p>Track balance, reconcile transactions, manage payouts and reporting.</p>
    <a href="/api/classes/FinancesModule">View API Reference →</a>
  </div>

  <div class="use-case-card">
    <h3>💬 Customer Support</h3>
    <p>Manage customer chat, answer Q&A, respond to reviews at scale.</p>
    <a href="/api/classes/CommunicationsModule">View API Reference →</a>
  </div>

  <div class="use-case-card">
    <h3>🔄 Multi-Channel Integration</h3>
    <p>Connect products → orders → finances → analytics for complete automation.</p>
    <a href="/getting-started/tutorials/multi-module-integration">View Tutorial →</a>
  </div>
</div>

<style>
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.use-case-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.use-case-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.use-case-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.use-case-card p {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.use-case-card a {
  display: inline-block;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.use-case-card a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .use-cases {
    grid-template-columns: 1fr;
  }
}
</style>

---

## Ready to Get Started?

<div class="cta-section">
  <div class="cta-card">
    <h3>🚀 Quick Start</h3>
    <p>Get up and running in under 5 minutes with our comprehensive quickstart guide.</p>
    <a href="/getting-started/quickstart" class="cta-button">Start Building →</a>
  </div>

  <div class="cta-card">
    <h3>📚 View Documentation</h3>
    <p>Explore tutorials, guides, and complete API reference documentation.</p>
    <a href="/getting-started/" class="cta-button secondary">Browse Docs →</a>
  </div>
</div>

<style>
.cta-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-radius: 12px;
}

.cta-card {
  text-align: center;
  padding: 2rem;
}

.cta-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
}

.cta-card p {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand-1);
  color: white !important;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.cta-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cta-button.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1) !important;
  border: 2px solid var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background: var(--vp-c-brand-soft);
}

@media (max-width: 768px) {
  .cta-section {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
}
</style>

---

**Made with ❤️ for the Wildberries developer community**

# Examples Testing Framework

## Overview

This document provides a comprehensive testing framework for validating all 24 SDK examples. Each example has been designed with specific acceptance criteria that must be verified before marking the example as production-ready.

## Testing Environment Setup

### Prerequisites

1. **API Key Configuration**
   ```bash
   export WB_API_KEY="your-valid-api-key-here"
   echo $WB_API_KEY  # Verify it's set
   ```

2. **Node.js and Dependencies**
   ```bash
   node --version  # Should be >= 20.0.0
   npm install     # Install SDK dependencies
   npm run build   # Build SDK
   ```

3. **Runtime Environment**
   ```bash
   npm install -g tsx  # Install TypeScript executor
   ```

4. **Test Data Requirements**
   - Active Wildberries seller account
   - At least one product in catalog
   - Some transaction history (for Finances examples)
   - Active orders (for Orders examples)
   - Customer reviews/questions (for Communications examples)

---

## Testing Checklist Template

For each example, verify the following:

- [ ] **Environment**: WB_API_KEY is set and valid
- [ ] **Execution**: Example runs without runtime errors
- [ ] **Output**: Output matches expected format in JSDoc header
- [ ] **Error Handling**: All 5 error types handled correctly
  - [ ] `RateLimitError` with retry-after handling
  - [ ] `AuthenticationError` with helpful message
  - [ ] `ValidationError` with field-level details
  - [ ] `NetworkError` with connectivity guidance
  - [ ] `WBAPIError` with API-specific context
- [ ] **Rate Limits**: Respects module-specific rate limits
- [ ] **Comments**: Code comments are accurate and helpful
- [ ] **Documentation**: JSDoc header matches actual behavior
- [ ] **Prerequisites**: All prerequisites are accurate
- [ ] **Estimated Time**: Actual time matches estimate (±5 minutes)

---

## Example-by-Example Testing Checklist

### 🟢 Beginner Examples (7 examples)

#### 1. quickstart.ts
**Estimated Time**: 5 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/quickstart.ts`
2. Verify SDK initialization succeeds
3. Verify ping endpoint responds
4. Verify news retrieval works
5. Verify seller info is fetched

**Expected Output**:
```
🚀 Wildberries SDK Quickstart Example
✅ SDK initialized successfully
✅ API connection successful!
✅ Retrieved X news items
✅ Seller: [Company Name]
```

**Validation Checklist**:
- [ ] No runtime errors
- [ ] All API calls succeed
- [ ] Error handling demonstrated
- [ ] Output format matches documentation

**Issues Found**: (None / List issues)

---

#### 2. general.ts
**Estimated Time**: 10 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/general.ts`
2. Verify ping works
3. Verify news retrieval with details
4. Verify seller account information

**Expected Output**:
```
📦 Initializing Wildberries SDK General Module...
✅ Connection successful!
Found X news items
✅ Seller Account Retrieved
```

**Validation Checklist**:
- [ ] All General module endpoints work
- [ ] Response data structure matches types
- [ ] Error handling comprehensive

**Issues Found**: (None / List issues)

---

#### 3. products-categories.ts
**Estimated Time**: 10 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/products-categories.ts`
2. Verify parent categories retrieved
3. Verify subjects retrieved for a category
4. Verify characteristics retrieved for a subject

**Expected Output**:
```
🔍 Wildberries Product Category Explorer
✅ Found X parent categories
✅ Found X subjects
✅ Found X required and X optional characteristics
```

**Validation Checklist**:
- [ ] Category hierarchy navigates correctly
- [ ] Category data includes all required fields
- [ ] Helpful for understanding product structure

**Issues Found**: (None / List issues)

---

#### 4. products-crud.ts
**Estimated Time**: 15 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/products-crud.ts`
2. Verify product creation queued
3. Verify product listing with pagination
4. Verify product retrieval by ID
5. Verify product update workflow
6. Verify product deletion (trash)

**Expected Output**:
```
=== Example 1: Create Product ===
✅ Product queued for creation
=== Example 2: List Products ===
Found X total products
=== Example 3: Get Single Product ===
✅ Product found
=== Example 4: Update Product ===
✅ Product updated
=== Example 5: Delete Product ===
✅ Products moved to trash
```

**Validation Checklist**:
- [ ] CRUD operations work correctly
- [ ] Pagination handles large datasets
- [ ] Update requires full product data
- [ ] Soft delete (30-day retention) noted

**Issues Found**: (None / List issues)

---

#### 5. orders-fbs-processing.ts
**Estimated Time**: 10 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/orders-fbs-processing.ts`
2. Verify new orders retrieval
3. Verify date filtering works
4. Verify pagination with cursor
5. Verify status breakdown analysis

**Expected Output**:
```
=== FBS Order Processing Demo ===
📦 New Orders: X orders
📅 Orders in Date Range: X orders
📊 Status Breakdown: [details]
```

**Validation Checklist**:
- [ ] New orders fetched correctly
- [ ] Date filters work (Unix timestamps)
- [ ] Pagination cursor navigation works
- [ ] Status analysis helpful

**Issues Found**: (None / List issues)

---

#### 6. finances-balance-transactions.ts
**Estimated Time**: 10 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/finances-balance-transactions.ts`
2. Verify balance retrieval
3. Verify transaction history with filters
4. Verify transaction analysis

**Expected Output**:
```
=== Financial Account Management ===
💰 Current Balance: X₽
📊 Recent Transactions (Last 7 days): X transactions
```

**Validation Checklist**:
- [ ] Balance data accurate
- [ ] Transaction filtering works
- [ ] Date range handling correct

**Issues Found**: (None / List issues)

---

#### 7. customer-support.ts
**Estimated Time**: 15 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/customer-support.ts`
2. Verify chat retrieval
3. Verify Q&A management
4. Verify reviews management

**Expected Output**:
```
=== Customer Communications Demo ===
💬 Active Chats: X
❓ Questions: X
⭐ Reviews: X
```

**Validation Checklist**:
- [ ] Chat events retrieved correctly
- [ ] Q&A filtering works
- [ ] Reviews fetched with ratings

**Issues Found**: (None / List issues)

---

### 🟡 Intermediate Examples (13 examples)

#### 8. products-media-pricing.ts
**Estimated Time**: 20 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/products-media-pricing.ts`
2. Verify media upload (file/URL)
3. Verify pricing update task creation
4. Verify task status polling
5. Verify pricing verification

**Validation Checklist**:
- [ ] Media upload works (both methods)
- [ ] Pricing tasks created successfully
- [ ] Async task polling works
- [ ] Price verification matches

**Issues Found**: (None / List issues)

---

#### 9. products-warehouse-stock.ts
**Estimated Time**: 25 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/products-warehouse-stock.ts`
2. Verify WB warehouses retrieval
3. Verify warehouse creation
4. Verify stock operations (add, update)
5. **WARNING**: Skip delete test (irreversible)

**Validation Checklist**:
- [ ] Warehouse listing works
- [ ] Warehouse creation succeeds
- [ ] Stock updates work
- [ ] Bulk operations (up to 1000 SKUs) work
- [ ] WARNING about stock deletion is clear

**Issues Found**: (None / List issues)

---

#### 10. complete-product-workflow.ts
**Estimated Time**: 30 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/complete-product-workflow.ts`
2. Verify end-to-end product setup
3. Verify cross-step data flow
4. Verify all 5 workflow steps complete

**Validation Checklist**:
- [ ] Category navigation works
- [ ] Product creation succeeds
- [ ] Media upload works
- [ ] Pricing configured
- [ ] Stock levels set
- [ ] Complete lifecycle demonstrated

**Issues Found**: (None / List issues)

---

#### 11. orders-fbs-fulfillment.ts
**Estimated Time**: 25 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/orders-fbs-fulfillment.ts`
2. Verify supply creation
3. Verify adding orders to supply
4. Verify shipping label generation
5. Verify supply delivery
6. Verify QR code retrieval

**Validation Checklist**:
- [ ] Supply workflow (create → add → deliver) works
- [ ] Shipping labels generated (PNG/SVG/ZPL)
- [ ] Cargo type constraints documented
- [ ] QR code available after delivery

**Issues Found**: (None / List issues)

---

#### 12. orders-fbw-fulfillment.ts
**Estimated Time**: 30 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/orders-fbw-fulfillment.ts`
2. Verify warehouse listing
3. Verify acceptance coefficients
4. Verify acceptance validation
5. Verify transit tariff calculation
6. Verify supply management

**Validation Checklist**:
- [ ] Warehouse data includes addresses
- [ ] Acceptance coefficients (14 days) retrieved
- [ ] Cost optimization guidance clear
- [ ] Transit tariffs calculated correctly

**Issues Found**: (None / List issues)

---

#### 13. in-store-pickup-workflow.ts
**Estimated Time**: 25 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/in-store-pickup-workflow.ts`
2. Verify pickup order retrieval
3. Verify customer verification
4. Verify order status workflow
5. Verify metadata management

**Validation Checklist**:
- [ ] Pickup orders fetched
- [ ] Customer identity verification works
- [ ] Status transitions (new → confirm → prepare → receive)
- [ ] Metadata (SGTIN, UIN, IMEI) handled
- [ ] 409 error impact documented

**Issues Found**: (None / List issues)

---

#### 14. finances-reports-payouts.ts
**Estimated Time**: 20 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/finances-reports-payouts.ts`
2. Verify report generation workflow
3. Verify async polling
4. Verify payout retrieval
5. Verify payout detail breakdown

**Validation Checklist**:
- [ ] Report generation initiated
- [ ] Status polling works
- [ ] Report download available
- [ ] Payout history retrieved
- [ ] Fee breakdown accurate

**Issues Found**: (None / List issues)

---

#### 15. analytics-dashboard.ts
**Estimated Time**: 25 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/analytics-dashboard.ts`
2. Verify sales funnel analysis
3. Verify product performance metrics
4. Verify search query analysis
5. Verify category performance
6. Verify CSV export

**Validation Checklist**:
- [ ] Sales funnel (views → cart → orders) calculated
- [ ] Product KPIs retrieved
- [ ] Search queries analyzed
- [ ] Category performance compared
- [ ] CSV export works
- [ ] Rate limits (5 req/min queries) respected

**Issues Found**: (None / List issues)

---

#### 16. reports-analytics.ts
**Estimated Time**: 20 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/reports-analytics.ts`
2. Verify incomes tracking
3. Verify stock reporting
4. Verify order analytics
5. Verify sales analysis
6. Verify async report generation

**Validation Checklist**:
- [ ] Incomes data with pagination
- [ ] Stock levels accurate
- [ ] Order tracking works
- [ ] Sales analysis comprehensive
- [ ] Large dataset handling (timeout guidance)

**Issues Found**: (None / List issues)

---

#### 17. customer-engagement.ts
**Estimated Time**: 25 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/customer-engagement.ts`
2. Verify reviews retrieval
3. Verify Q&A retrieval
4. Verify urgency scoring
5. Verify priority recommendations

**Validation Checklist**:
- [ ] Negative reviews (1-2 stars) filtered
- [ ] Unanswered questions identified
- [ ] Urgency score calculated correctly
- [ ] Priority products ranked
- [ ] 60s rate limit delay works

**Issues Found**: (None / List issues)

---

#### 18. communications-customer-engagement.ts
**Estimated Time**: 30 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/communications-customer-engagement.ts`
2. Verify chat management workflow
3. Verify Q&A workflow
4. Verify review workflow
5. Verify multi-channel coordination

**Validation Checklist**:
- [ ] Chat events polled correctly
- [ ] Questions answered
- [ ] Reviews responded to
- [ ] Multi-channel flow demonstrated

**Issues Found**: (None / List issues)

---

#### 19. tariffs-pricing-calculator.ts
**Estimated Time**: 20 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/tariffs-pricing-calculator.ts`
2. Verify commission rates retrieval
3. Verify storage tariff calculation
4. Verify logistics cost calculation
5. Verify total fee breakdown
6. Verify net payout calculation

**Validation Checklist**:
- [ ] Commission rates by category retrieved
- [ ] Storage costs (per liter/day) calculated
- [ ] Logistics costs included
- [ ] Total fees summed correctly
- [ ] Net payout = Sale Price - Total Fees

**Issues Found**: (None / List issues)

---

#### 20. promotion-campaign-automation.ts
**Estimated Time**: 25 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/promotion-campaign-automation.ts`
2. Verify campaign configuration retrieval
3. Verify campaign listing
4. Verify bid management (demo mode)
5. Verify performance tracking
6. Verify budget management

**Validation Checklist**:
- [ ] Campaign config retrieved
- [ ] Existing campaigns listed
- [ ] Demo mode clearly indicated
- [ ] Performance metrics explained
- [ ] Budget tracking demonstrated

**Issues Found**: (None / List issues)

---

### 🔴 Advanced Examples (4 examples)

#### 21. financial-reconciliation.ts
**Estimated Time**: 40 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/financial-reconciliation.ts`
2. Verify transaction-to-sales matching
3. Verify timing discrepancy detection
4. Verify unmatched transaction flagging
5. Verify reconciliation metrics

**Validation Checklist**:
- [ ] Large dataset handling (80K+ records)
- [ ] Transaction-sales matching works
- [ ] Timing lag (24-72 hours) documented
- [ ] Reconciliation report generated
- [ ] 2-3 minute execution time acceptable

**Issues Found**: (None / List issues)

---

#### 22. integration-product-order-finance.ts
**Estimated Time**: 45 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/integration-product-order-finance.ts`
2. Verify product creation (Part 1)
3. Verify order processing (Part 2)
4. Verify financial tracking (Part 3)
5. Verify cross-module data flow

**Validation Checklist**:
- [ ] Product → Order → Finance flow works
- [ ] Data consistency across modules
- [ ] Cross-module coordination demonstrated
- [ ] Error handling for partial failures

**Issues Found**: (None / List issues)

---

#### 23. business-dashboard.ts
**Estimated Time**: 50 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/business-dashboard.ts`
2. Verify financial metrics aggregation
3. Verify sales performance analytics
4. Verify customer sentiment analysis
5. Verify multi-module coordination
6. Verify graceful degradation

**Validation Checklist**:
- [ ] Multi-module data aggregation works
- [ ] Rate limit management effective
- [ ] Graceful degradation on errors
- [ ] Performance tracking accurate
- [ ] 10-20 second execution time

**Issues Found**: (None / List issues)

---

#### 24. export-to-bi.ts
**Estimated Time**: 60 minutes
**Status**: ⬜ Not Tested | ✅ Passed | ❌ Failed

**Test Steps**:
1. Run: `npx tsx examples/export-to-bi.ts`
2. Verify multi-module data aggregation
3. Verify CSV export generation
4. Verify JSON export generation
5. Verify data normalization
6. Verify file generation with timestamps

**Validation Checklist**:
- [ ] All modules queried successfully
- [ ] CSV export file created
- [ ] JSON export file created
- [ ] Data normalized correctly
- [ ] 4-6 minute execution time acceptable
- [ ] Memory usage (200-500MB) acceptable
- [ ] Files timestamped and organized

**Issues Found**: (None / List issues)

---

## Testing Summary Report

### Overall Statistics

- **Total Examples**: 24
- **Tested**: 0/24 (0%)
- **Passed**: 0/24 (0%)
- **Failed**: 0/24 (0%)

### By Complexity

| Complexity | Total | Tested | Passed | Failed |
|------------|-------|--------|--------|--------|
| 🟢 Beginner | 7 | 0 | 0 | 0 |
| 🟡 Intermediate | 13 | 0 | 0 | 0 |
| 🔴 Advanced | 4 | 0 | 0 | 0 |

### By Module

| Module | Examples | Tested | Passed | Failed |
|--------|----------|--------|--------|--------|
| General | 2 | 0 | 0 | 0 |
| Products | 5 | 0 | 0 | 0 |
| Orders FBS | 2 | 0 | 0 | 0 |
| Orders FBW | 1 | 0 | 0 | 0 |
| In-Store Pickup | 1 | 0 | 0 | 0 |
| Finances | 3 | 0 | 0 | 0 |
| Analytics | 2 | 0 | 0 | 0 |
| Communications | 3 | 0 | 0 | 0 |
| Tariffs | 1 | 0 | 0 | 0 |
| Promotion | 1 | 0 | 0 | 0 |
| Multi-Module | 3 | 0 | 0 | 0 |

---

## Common Issues and Resolutions

### Issue: "WB_API_KEY environment variable not set"
**Resolution**:
```bash
export WB_API_KEY="your-api-key"
echo $WB_API_KEY  # Verify
```

### Issue: "Rate limit exceeded"
**Resolution**:
- Wait for retry-after period
- Examples automatically handle rate limits
- Communications module: 1 req/min (60s delay built-in)

### Issue: "No data returned"
**Resolution**:
- Ensure seller account has data (products, orders, transactions)
- Some examples require active business operations
- Check API key permissions for specific modules

### Issue: "Timeout after 30000ms"
**Resolution**:
- Large dataset examples may need longer timeout
- Financial reconciliation: 2-3 minutes normal
- BI export: 4-6 minutes normal

---

## Continuous Testing

### Pre-Release Testing Workflow

1. **Environment Setup**: Fresh API key, clean data
2. **Sequential Testing**: Test examples in dependency order
3. **Error Scenario Testing**: Simulate errors (invalid key, rate limits)
4. **Performance Validation**: Measure actual execution times
5. **Documentation Sync**: Update docs based on test results

### Automated Testing (Future)

```bash
# Run all examples with validation
npm run test:examples

# Test specific module
npm run test:examples -- --module products

# Test specific complexity level
npm run test:examples -- --complexity beginner
```

---

## Test Result Template

When testing is complete, update this section:

**Tested By**: [Name]
**Test Date**: [YYYY-MM-DD]
**Environment**: Node.js [version], SDK [version]
**API Key Permissions**: [List enabled modules]

**Results**:
- ✅ All examples passed
- ⚠️ X examples with minor issues (list below)
- ❌ X examples failed (list below)

**Issues Identified**: [List]

**Recommendations**: [List]

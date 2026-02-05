# API Cross-References for Examples

## Overview

This document maps each example file to its corresponding API documentation references. All examples should include `@see` JSDoc tags linking to:
1. Official Wildberries API documentation
2. SDK TypeDoc API reference
3. Related example files

## Cross-Reference Format Template

```typescript
/**
 * **API Documentation:**
 * @see {@link https://dev.wildberries.ru/openapi/[module]} - [Module] API Reference
 * @see {@link ../docs/api/classes/[ModuleName]Module.html} - [ModuleName]Module Class Reference
 * @see {@link ../docs/api/classes/[ModuleName]Module.html#methodName} - methodName() Method
 * @see {@link ../docs/api/interfaces/[TypeName].html} - [TypeName] Interface
 *
 * **Related Examples:**
 * - [example-file.ts] - [Description]
 */
```

---

## ✅ Completed Cross-References (4/24)

### 1. quickstart.ts
- Official API: https://dev.wildberries.ru/openapi/
- SDK Docs: WildberriesSDK, GeneralModule
- Related: general.ts, products-categories.ts, products-crud.ts

### 2. general.ts
- Official API: https://dev.wildberries.ru/openapi/common
- SDK Docs: GeneralModule, ping(), news(), sellerInfo()
- Related: quickstart.ts

### 3. products-categories.ts
- Official API: https://dev.wildberries.ru/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki
- SDK Docs: ProductsModule, getParentAll(), getSubjects(), getCharacteristics()
- Related: products-crud.ts, complete-product-workflow.ts, quickstart.ts

### 4. products-crud.ts
- Official API: https://dev.wildberries.ru/openapi/work-with-products#tag/Soderzhanie-kartochek
- SDK Docs: ProductsModule, createProduct(), listProducts(), getProduct(), updateProduct(), deleteProduct(), CreateProductRequest
- Related: products-categories.ts, products-media-pricing.ts, complete-product-workflow.ts

---

## 📋 Remaining Cross-References (20/24)

### Products Module (3 remaining)

#### 5. products-media-pricing.ts
**Official API**:
- https://dev.wildberries.ru/openapi/work-with-products#tag/Media - Media Upload API
- https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny - Pricing API

**SDK Docs**:
- ../docs/api/classes/ProductsModule.html - ProductsModule
- ../docs/api/classes/ProductsModule.html#uploadMedia - uploadMedia()
- ../docs/api/classes/ProductsModule.html#updatePricing - updatePricing()
- ../docs/api/classes/ProductsModule.html#getPricingTask - getPricingTask()
- ../docs/api/interfaces/PricingUpdate.html - PricingUpdate Interface

**Related Examples**:
- products-crud.ts - Create product first
- complete-product-workflow.ts - Full workflow including media/pricing

---

#### 6. products-warehouse-stock.ts
**Official API**:
- https://dev.wildberries.ru/openapi/work-with-products#tag/Marketplace - Warehouse API
- https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki - Stock API

**SDK Docs**:
- ../docs/api/classes/ProductsModule.html - ProductsModule
- ../docs/api/classes/ProductsModule.html#getWarehouses - getWarehouses()
- ../docs/api/classes/ProductsModule.html#createWarehouse - createWarehouse()
- ../docs/api/classes/ProductsModule.html#updateStock - updateStock()
- ../docs/api/classes/ProductsModule.html#deleteStock - deleteStock()
- ../docs/api/interfaces/WarehouseCreateRequest.html - WarehouseCreateRequest
- ../docs/api/interfaces/StockUpdate.html - StockUpdate Interface

**Related Examples**:
- products-crud.ts - Create products before managing stock
- complete-product-workflow.ts - Full workflow with stock setup

---

#### 7. complete-product-workflow.ts
**Official API**:
- https://dev.wildberries.ru/openapi/work-with-products - Complete Products API

**SDK Docs**:
- ../docs/api/classes/ProductsModule.html - ProductsModule (all methods)

**Related Examples**:
- products-categories.ts - Step 1: Category navigation
- products-crud.ts - Step 2: Product creation
- products-media-pricing.ts - Steps 3-4: Media and pricing
- products-warehouse-stock.ts - Step 5: Stock management

---

### Orders Module (4 files)

#### 8. orders-fbs-processing.ts
**Official API**:
- https://dev.wildberries.ru/openapi/marketplace-seller#tag/Sborka-zakazov - FBS Orders API

**SDK Docs**:
- ../docs/api/classes/OrdersFBSModule.html - OrdersFBSModule
- ../docs/api/classes/OrdersFBSModule.html#getNewOrders - getNewOrders()
- ../docs/api/classes/OrdersFBSModule.html#getOrders - getOrders()
- ../docs/api/classes/OrdersFBSModule.html#getOrderStatuses - getOrderStatuses()
- ../docs/api/interfaces/GetOrdersResponse.html - GetOrdersResponse
- ../docs/api/interfaces/OrderFilters.html - OrderFilters Interface

**Related Examples**:
- orders-fbs-fulfillment.ts - Complete FBS fulfillment workflow

---

#### 9. orders-fbs-fulfillment.ts
**Official API**:
- https://dev.wildberries.ru/openapi/marketplace-seller#tag/Postavki - FBS Supplies API
- https://dev.wildberries.ru/openapi/marketplace-seller#tag/Etiketki - Stickers API

**SDK Docs**:
- ../docs/api/classes/OrdersFBSModule.html - OrdersFBSModule
- ../docs/api/classes/OrdersFBSModule.html#createSupply - createSupply()
- ../docs/api/classes/OrdersFBSModule.html#addOrdersToSupply - addOrdersToSupply()
- ../docs/api/classes/OrdersFBSModule.html#getStickers - getStickers()
- ../docs/api/classes/OrdersFBSModule.html#deliverSupply - deliverSupply()
- ../docs/api/classes/OrdersFBSModule.html#getSupplyQRCode - getSupplyQRCode()
- ../docs/api/interfaces/CreateSupplyRequest.html - CreateSupplyRequest
- ../docs/api/interfaces/GetOrderStickersRequest.html - GetOrderStickersRequest

**Related Examples**:
- orders-fbs-processing.ts - Get orders before fulfillment
- integration-product-order-finance.ts - Full product-to-payout workflow

---

#### 10. orders-fbw-fulfillment.ts
**Official API**:
- https://dev.wildberries.ru/openapi/wildberries-warehouse#tag/Postavki-FBW - FBW Supplies API
- https://dev.wildberries.ru/openapi/wildberries-warehouse#tag/Koefficienty - Acceptance Coefficients API

**SDK Docs**:
- ../docs/api/classes/OrdersFBWModule.html - OrdersFBWModule
- ../docs/api/classes/OrdersFBWModule.html#getWarehouses - getWarehouses()
- ../docs/api/classes/OrdersFBWModule.html#getAcceptanceCoefficients - getAcceptanceCoefficients()
- ../docs/api/classes/OrdersFBWModule.html#validateAcceptance - validateAcceptance()
- ../docs/api/classes/OrdersFBWModule.html#getTransitTariffs - getTransitTariffs()
- ../docs/api/classes/OrdersFBWModule.html#getSupplies - getSupplies()
- ../docs/api/interfaces/FBWWarehouse.html - FBWWarehouse Interface
- ../docs/api/interfaces/FBWAcceptanceCoefficient.html - FBWAcceptanceCoefficient

**Related Examples**:
- products-crud.ts - Create products before FBW supply

---

#### 11. in-store-pickup-workflow.ts
**Official API**:
- https://dev.wildberries.ru/openapi/pickup#tag/Sborka-zakazov - Pickup Orders API

**SDK Docs**:
- ../docs/api/classes/InStorePickupModule.html - InStorePickupModule
- ../docs/api/classes/InStorePickupModule.html#getNewOrders - getNewOrders()
- ../docs/api/classes/InStorePickupModule.html#confirmOrder - confirmOrder()
- ../docs/api/classes/InStorePickupModule.html#prepareOrder - prepareOrder()
- ../docs/api/classes/InStorePickupModule.html#completeOrder - completeOrder()
- ../docs/api/classes/InStorePickupModule.html#checkIdentity - checkIdentity()
- ../docs/api/classes/InStorePickupModule.html#setOrderMetadata - setOrderMetadata()
- ../docs/api/interfaces/PickupOrder.html - PickupOrder Interface
- ../docs/api/interfaces/CheckIdentityRequest.html - CheckIdentityRequest

**Related Examples**:
- orders-fbs-processing.ts - Compare FBS vs pickup workflows

---

### Finances Module (3 files)

#### 12. finances-balance-transactions.ts
**Official API**:
- https://dev.wildberries.ru/openapi/financial-operation#tag/Balans - Balance API
- https://dev.wildberries.ru/openapi/financial-operation#tag/Tranzakcii - Transactions API

**SDK Docs**:
- ../docs/api/classes/FinancesModule.html - FinancesModule
- ../docs/api/classes/FinancesModule.html#getBalance - getBalance()
- ../docs/api/classes/FinancesModule.html#getTransactions - getTransactions()
- ../docs/api/interfaces/BalanceResponse.html - BalanceResponse
- ../docs/api/interfaces/Transaction.html - Transaction Interface
- ../docs/api/interfaces/TransactionFilters.html - TransactionFilters

**Related Examples**:
- finances-reports-payouts.ts - Financial reporting
- financial-reconciliation.ts - Transaction reconciliation

---

#### 13. finances-reports-payouts.ts
**Official API**:
- https://dev.wildberries.ru/openapi/financial-operation#tag/Otchety - Reports API
- https://dev.wildberries.ru/openapi/financial-operation#tag/Vyplaty - Payouts API

**SDK Docs**:
- ../docs/api/classes/FinancesModule.html - FinancesModule
- ../docs/api/classes/FinancesModule.html#generateReport - generateReport()
- ../docs/api/classes/FinancesModule.html#getReportStatus - getReportStatus()
- ../docs/api/classes/FinancesModule.html#downloadReport - downloadReport()
- ../docs/api/classes/FinancesModule.html#getPayouts - getPayouts()
- ../docs/api/interfaces/GenerateReportRequest.html - GenerateReportRequest
- ../docs/api/interfaces/PayoutListResponse.html - PayoutListResponse

**Related Examples**:
- finances-balance-transactions.ts - Balance and transactions
- financial-reconciliation.ts - Reconcile reports with transactions

---

#### 14. financial-reconciliation.ts
**Official API**:
- https://dev.wildberries.ru/openapi/financial-operation - Finance API
- https://dev.wildberries.ru/openapi/statistics - Statistics API (sales data)

**SDK Docs**:
- ../docs/api/classes/FinancesModule.html - FinancesModule
- ../docs/api/classes/ReportsModule.html - ReportsModule
- ../docs/api/classes/FinancesModule.html#getTransactions - getTransactions()
- ../docs/api/classes/ReportsModule.html#getSales - getSales()

**Related Examples**:
- finances-balance-transactions.ts - Transaction retrieval
- finances-reports-payouts.ts - Financial reports
- business-dashboard.ts - Dashboard integration

---

### Analytics & Reports Module (2 files)

#### 15. analytics-dashboard.ts
**Official API**:
- https://dev.wildberries.ru/openapi/analytics - Analytics API

**SDK Docs**:
- ../docs/api/classes/AnalyticsModule.html - AnalyticsModule
- ../docs/api/classes/AnalyticsModule.html#getSalesFunnel - getSalesFunnel()
- ../docs/api/classes/AnalyticsModule.html#getProductStatistics - getProductStatistics()
- ../docs/api/classes/AnalyticsModule.html#getSearchQueries - getSearchQueries()
- ../docs/api/classes/AnalyticsModule.html#getCategoryPerformance - getCategoryPerformance()
- ../docs/api/classes/AnalyticsModule.html#getStockHistory - getStockHistory()
- ../docs/api/classes/AnalyticsModule.html#exportCSV - exportCSV()

**Related Examples**:
- reports-analytics.ts - Operational reports
- business-dashboard.ts - Multi-module dashboard
- export-to-bi.ts - BI export

---

#### 16. reports-analytics.ts
**Official API**:
- https://dev.wildberries.ru/openapi/statistics - Statistics/Reports API

**SDK Docs**:
- ../docs/api/classes/ReportsModule.html - ReportsModule
- ../docs/api/classes/ReportsModule.html#getIncomes - getIncomes()
- ../docs/api/classes/ReportsModule.html#getStocks - getStocks()
- ../docs/api/classes/ReportsModule.html#getOrders - getOrders()
- ../docs/api/classes/ReportsModule.html#getSales - getSales()
- ../docs/api/classes/ReportsModule.html#generateWarehouseRemains - generateWarehouseRemains()
- ../docs/api/interfaces/IncomesItem.html - IncomesItem
- ../docs/api/interfaces/StocksItem.html - StocksItem

**Related Examples**:
- analytics-dashboard.ts - Analytics dashboard
- financial-reconciliation.ts - Sales data for reconciliation

---

### Communications Module (3 files)

#### 17. customer-support.ts
**Official API**:
- https://dev.wildberries.ru/openapi/communications#tag/Chaty - Chat API
- https://dev.wildberries.ru/openapi/communications#tag/Voprosy - Questions API
- https://dev.wildberries.ru/openapi/communications#tag/Otzyvy - Reviews API

**SDK Docs**:
- ../docs/api/classes/CommunicationsModule.html - CommunicationsModule
- ../docs/api/classes/CommunicationsModule.html#getChats - getChats()
- ../docs/api/classes/CommunicationsModule.html#getEvents - getEvents()
- ../docs/api/classes/CommunicationsModule.html#sendMessage - sendMessage()
- ../docs/api/classes/CommunicationsModule.html#getQuestions - getQuestions()
- ../docs/api/classes/CommunicationsModule.html#answerQuestion - answerQuestion()
- ../docs/api/classes/CommunicationsModule.html#getReviews - getReviews()
- ../docs/api/classes/CommunicationsModule.html#respondToReview - respondToReview()

**Related Examples**:
- customer-engagement.ts - Reviews and Q&A prioritization
- communications-customer-engagement.ts - Complete communications workflow

---

#### 18. customer-engagement.ts
**Official API**:
- https://dev.wildberries.ru/openapi/communications#tag/Otzyvy - Reviews API
- https://dev.wildberries.ru/openapi/communications#tag/Voprosy - Questions API

**SDK Docs**:
- ../docs/api/classes/CommunicationsModule.html - CommunicationsModule
- ../docs/api/classes/CommunicationsModule.html#getReviews - getReviews()
- ../docs/api/classes/CommunicationsModule.html#getQuestions - getQuestions()
- ../docs/api/interfaces/Review.html - Review Interface
- ../docs/api/interfaces/Question.html - Question Interface
- ../docs/api/interfaces/ReviewFilters.html - ReviewFilters

**Related Examples**:
- customer-support.ts - Chat and Q&A management
- communications-customer-engagement.ts - Complete workflow

---

#### 19. communications-customer-engagement.ts
**Official API**:
- https://dev.wildberries.ru/openapi/communications - Complete Communications API

**SDK Docs**:
- ../docs/api/classes/CommunicationsModule.html - CommunicationsModule (all methods)

**Related Examples**:
- customer-support.ts - Individual channel management
- customer-engagement.ts - Review/Q&A prioritization

---

### Other Modules (2 files)

#### 20. tariffs-pricing-calculator.ts
**Official API**:
- https://dev.wildberries.ru/openapi/tariffs - Tariffs API

**SDK Docs**:
- ../docs/api/classes/TariffsModule.html - TariffsModule
- ../docs/api/classes/TariffsModule.html#getCommission - getCommission()
- ../docs/api/classes/TariffsModule.html#getStorageTariffs - getStorageTariffs()
- ../docs/api/classes/TariffsModule.html#getLogisticsTariffs - getLogisticsTariffs()
- ../docs/api/interfaces/Commission.html - Commission Interface
- ../docs/api/types/TariffType.html - TariffType

**Related Examples**:
- products-crud.ts - Product pricing
- finances-balance-transactions.ts - Fee verification

---

#### 21. promotion-campaign-automation.ts
**Official API**:
- https://dev.wildberries.ru/openapi/promotion - Promotion API

**SDK Docs**:
- ../docs/api/classes/PromotionModule.html - PromotionModule
- ../docs/api/classes/PromotionModule.html#getCampaigns - getCampaigns()
- ../docs/api/classes/PromotionModule.html#createCampaign - createCampaign()
- ../docs/api/classes/PromotionModule.html#updateBids - updateBids()
- ../docs/api/classes/PromotionModule.html#pauseCampaign - pauseCampaign()
- ../docs/api/classes/PromotionModule.html#resumeCampaign - resumeCampaign()
- ../docs/api/interfaces/CampaignConfig.html - CampaignConfig

**Related Examples**:
- products-crud.ts - Products to promote
- analytics-dashboard.ts - Campaign performance tracking

---

### Integration Examples (3 files)

#### 22. integration-product-order-finance.ts
**Official API**:
- https://dev.wildberries.ru/openapi/ - Multi-module integration

**SDK Docs**:
- ../docs/api/classes/WildberriesSDK.html - WildberriesSDK
- ../docs/api/classes/ProductsModule.html - ProductsModule
- ../docs/api/classes/OrdersFBSModule.html - OrdersFBSModule
- ../docs/api/classes/FinancesModule.html - FinancesModule

**Related Examples**:
- complete-product-workflow.ts - Product setup (Part 1)
- orders-fbs-fulfillment.ts - Order fulfillment (Part 2)
- financial-reconciliation.ts - Financial tracking (Part 3)

---

#### 23. business-dashboard.ts
**Official API**:
- https://dev.wildberries.ru/openapi/ - Multi-module dashboard

**SDK Docs**:
- ../docs/api/classes/WildberriesSDK.html - WildberriesSDK
- ../docs/api/classes/FinancesModule.html - FinancesModule
- ../docs/api/classes/AnalyticsModule.html - AnalyticsModule
- ../docs/api/classes/CommunicationsModule.html - CommunicationsModule

**Related Examples**:
- analytics-dashboard.ts - Analytics component
- finances-balance-transactions.ts - Financial component
- customer-engagement.ts - Customer sentiment component
- export-to-bi.ts - Data export

---

#### 24. export-to-bi.ts
**Official API**:
- https://dev.wildberries.ru/openapi/ - Multi-module data export

**SDK Docs**:
- ../docs/api/classes/WildberriesSDK.html - WildberriesSDK (all modules)
- ../docs/api/classes/FinancesModule.html - FinancesModule
- ../docs/api/classes/AnalyticsModule.html - AnalyticsModule
- ../docs/api/classes/ReportsModule.html - ReportsModule
- ../docs/api/classes/CommunicationsModule.html - CommunicationsModule

**Related Examples**:
- business-dashboard.ts - Real-time dashboard
- analytics-dashboard.ts - Analytics integration
- financial-reconciliation.ts - Financial data integration

---

## Implementation Status

| Category | Total | Completed | Remaining |
|----------|-------|-----------|-----------|
| Getting Started | 2 | 2 | 0 |
| Products | 5 | 2 | 3 |
| Orders | 4 | 0 | 4 |
| Finances | 3 | 0 | 3 |
| Analytics & Reports | 2 | 0 | 2 |
| Communications | 3 | 0 | 3 |
| Other Modules | 2 | 0 | 2 |
| Integration | 3 | 0 | 3 |
| **TOTAL** | **24** | **4** | **20** |

---

## Next Steps

To complete Task 9, add the API Documentation sections listed above to each example file's JSDoc header, following the format:

```typescript
/**
 * **API Documentation:**
 * @see {@link [Official WB API URL]} - [Description]
 * @see {@link [SDK TypeDoc URL]} - [Description]
 * @see {@link [Interface TypeDoc URL]} - [Description]
 *
 * **Related Examples:**
 * - [filename.ts] - [Purpose]
 */
```

This ensures bidirectional cross-referencing between:
1. Examples → Official API docs
2. Examples → SDK TypeDoc reference
3. Examples → Related examples

# Wildberries SDK Examples

Comprehensive collection of practical examples demonstrating how to use the Wildberries TypeScript SDK.

## 📋 Table of Contents

- [Quick Navigation](#quick-navigation)
  - [By Complexity](#by-complexity)
  - [By Use Case](#by-use-case)
  - [By Module](#by-module)
- [Prerequisites](#prerequisites)
- [Running Examples](#running-examples)
- [Getting Started](#getting-started)
- [Products Module](#products-module)
- [Orders Module](#orders-module)
- [Supply Planning Module](#supply-planning-module)
- [Finances Module](#finances-module)
- [Analytics Module](#analytics-module)
- [Communications Module](#communications-module)
- [Other Modules](#other-modules)
- [Integration Examples](#integration-examples)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Quick Navigation

### By Complexity

#### 🟢 Beginner (5-15 minutes)
Perfect for getting started with the SDK and understanding basic concepts.

| Example | Module | Time | Description |
|---------|--------|------|-------------|
| [quickstart.ts](#quickstarts---sdk-quick-start) | General | 5 min | SDK initialization and connectivity testing |
| [general.ts](#generalts---general-api-module) | General | 10 min | General module endpoints and features |
| [products-categories.ts](#products-categoriests---product-categories--hierarchy) | Products | 10 min | Navigate product category hierarchy |
| [products-crud.ts](#products-crudts---product-crud-operations) | Products | 15 min | Basic product creation and management |
| [orders-fbs-processing.ts](#orders-fbs-processingts---fbs-order-processing) | Orders FBS | 10 min | Fetch and process FBS orders |
| [finances-balance-transactions.ts](#finances-balance-transactionsts---balance--transaction-management) | Finances | 10 min | Check balance and transaction history |
| [customer-support.ts](#customer-supportts---customer-support-workflows) | Communications | 15 min | Basic customer chat management |
| [supply-cost-calculator.ts](#supply-cost-calculatorts---supply-cost-calculator) | Supply Planning | 10 min | Calculate FBW supply costs |
| [tariff-comparison.ts](#tariff-comparison---tariff-comparison-tool) | Supply Planning | 10 min | Compare inventory vs supply tariffs |

#### 🟡 Intermediate (15-30 minutes)
Build on basic knowledge with more complex workflows and multi-step processes.

| Example | Module | Time | Description |
|---------|--------|------|-------------|
| [products-media-pricing.ts](#products-media-pricingts---media-upload--pricing-management) | Products | 20 min | Upload media and manage product pricing |
| [products-warehouse-stock.ts](#products-warehouse-stockts---warehouse--stock-management) | Products | 25 min | Complete inventory management workflow |
| [complete-product-workflow.ts](#complete-product-workflowts---end-to-end-product-lifecycle) | Products | 30 min | End-to-end product creation workflow |
| [orders-fbs-fulfillment.ts](#orders-fbs-fulfillmentts---complete-fbs-fulfillment-workflow) | Orders FBS | 25 min | Complete FBS order fulfillment process |
| [orders-fbw-fulfillment.ts](#orders-fbw-fulfillmentts---fbw-warehouse-supply-planning) | Orders FBW | 30 min | FBW supply planning and management |
| [supplies-planning.ts](#supplies-planningts---complete-supply-planning-workflow) | Supply Planning | 25 min | Complete supply planning workflow |
| [in-store-pickup-workflow.ts](#in-store-pickup-workflowts---in-store-pickup-management) | In-Store Pickup | 25 min | Manage Click & Collect orders |
| [finances-reports-payouts.ts](#finances-reports-payoutsts---financial-reports--payouts) | Finances | 20 min | Generate reports and track payouts |
| [analytics-dashboard.ts](#analytics-dashboardts---analytics-dashboard) | Analytics | 25 min | Build analytics dashboard with key metrics |
| [reports-analytics.ts](#reports-analyticsts---advanced-analytics-reports) | Reports | 20 min | Generate advanced analytics reports |
| [customer-engagement.ts](#customer-engagementts---customer-engagement-workflows) | Communications | 25 min | Manage reviews, questions, and feedback |
| [tariffs-pricing-calculator.ts](#tariffs-pricing-calculatorts---pricing-calculator) | Tariffs | 20 min | Calculate costs and seller payouts |
| [promotion-campaign-automation.ts](#promotion-campaign-automation---promotion-campaign-automation) | Promotion | 25 min | Automate advertising campaign management |
| [communications-customer-engagement.ts](#communications-customer-engagementts---complete-communications-workflow) | Communications | 30 min | Complete customer communications workflow |

#### 🔴 Advanced (30-60 minutes)
Complex multi-module integrations and comprehensive business workflows.

| Example | Module | Time | Description |
|---------|--------|------|-------------|
| [integration-product-order-finance.ts](#integration-product-order-financets---multi-module-integration) | Multi-Module | 45 min | Product → Order → Finance integration |
| [business-dashboard.ts](#business-dashboardts---business-intelligence-dashboard) | Multi-Module | 50 min | Real-time business intelligence dashboard |
| [financial-reconciliation.ts](#financial-reconciliation---financial-reconciliation-workflow) | Multi-Module | 40 min | Reconcile sales, returns, and payments |
| [export-to-bi.ts](#export-to-bits---export-data-to-bi-tools) | Multi-Module | 60 min | Export data to external BI platforms |

---

### By Use Case

#### 📦 Product Catalog Management
- [products-categories.ts](#products-categoriests---product-categories--hierarchy) - Navigate category hierarchy (🟢 10 min)
- [products-crud.ts](#products-crudts---product-crud-operations) - Create, update, delete products (🟢 15 min)
- [products-media-pricing.ts](#products-media-pricingts---media-upload--pricing-management) - Manage media and pricing (🟡 20 min)
- [complete-product-workflow.ts](#complete-product-workflowts---end-to-end-product-lifecycle) - Complete product lifecycle (🟡 30 min)

#### 📊 Inventory & Stock Management
- [products-warehouse-stock.ts](#products-warehouse-stockts---warehouse--stock-management) - Warehouse and stock operations (🟡 25 min)
- [orders-fbw-fulfillment.ts](#orders-fbw-fulfillmentts---fbw-warehouse-supply-planning) - FBW supply planning (🟡 30 min)

#### 📦 Supply Planning & Cost Optimization
- [supplies-planning.ts](#supplies-planningts---complete-supply-planning-workflow) - Complete supply workflow (🟡 25 min)
- [supply-cost-calculator.ts](#supply-cost-calculatorts---supply-cost-calculator) - Calculate supply costs (🟢 10 min)
- [tariff-comparison.ts](#tariff-comparison---tariff-comparison-tool) - Compare tariff types (🟢 10 min)

#### 🚚 Order Fulfillment
- [orders-fbs-processing.ts](#orders-fbs-processingts---fbs-order-processing) - FBS order processing (🟢 10 min)
- [orders-fbs-fulfillment.ts](#orders-fbs-fulfillmentts---complete-fbs-fulfillment-workflow) - Complete FBS fulfillment (🟡 25 min)
- [orders-fbw-fulfillment.ts](#orders-fbw-fulfillmentts---fbw-warehouse-supply-planning) - FBW fulfillment (🟡 30 min)
- [in-store-pickup-workflow.ts](#in-store-pickup-workflowts---in-store-pickup-management) - In-store pickup (🟡 25 min)

#### 💰 Financial Management
- [finances-balance-transactions.ts](#finances-balance-transactionsts---balance--transaction-management) - Balance and transactions (🟢 10 min)
- [finances-reports-payouts.ts](#finances-reports-payoutsts---financial-reports--payouts) - Reports and payouts (🟡 20 min)
- [financial-reconciliation.ts](#financial-reconciliation---financial-reconciliation-workflow) - Financial reconciliation (🔴 40 min)
- [tariffs-pricing-calculator.ts](#tariffs-pricing-calculatorts---pricing-calculator) - Cost calculation (🟡 20 min)

#### 📈 Analytics & Reporting
- [analytics-dashboard.ts](#analytics-dashboardts---analytics-dashboard) - Analytics dashboard (🟡 25 min)
- [reports-analytics.ts](#reports-analyticsts---advanced-analytics-reports) - Advanced reports (🟡 20 min)
- [business-dashboard.ts](#business-dashboardts---business-intelligence-dashboard) - Business intelligence (🔴 50 min)
- [export-to-bi.ts](#export-to-bits---export-data-to-bi-tools) - BI tool export (🔴 60 min)

#### 💬 Customer Engagement
- [customer-support.ts](#customer-supportts---customer-support-workflows) - Chat and support (🟢 15 min)
- [customer-engagement.ts](#customer-engagementts---customer-engagement-workflows) - Reviews and Q&A (🟡 25 min)
- [communications-customer-engagement.ts](#communications-customer-engagementts---complete-communications-workflow) - Complete communications (🟡 30 min)

#### 🎯 Marketing & Promotion
- [promotion-campaign-automation.ts](#promotion-campaign-automation---promotion-campaign-automation) - Campaign automation (🟡 25 min)

#### 🔗 Multi-Module Integration
- [integration-product-order-finance.ts](#integration-product-order-financets---multi-module-integration) - Product-Order-Finance flow (🔴 45 min)
- [business-dashboard.ts](#business-dashboardts---business-intelligence-dashboard) - Business dashboard (🔴 50 min)
- [financial-reconciliation.ts](#financial-reconciliation---financial-reconciliation-workflow) - Financial reconciliation (🔴 40 min)
- [export-to-bi.ts](#export-to-bits---export-data-to-bi-tools) - BI export (🔴 60 min)

---

### By Module

| Module | Examples Count | Complexity Range |
|--------|----------------|------------------|
| **General** | 2 | 🟢 Basic |
| **Products** | 5 | 🟢 Basic → 🟡 Intermediate |
| **Orders FBS** | 2 | 🟢 Basic → 🟡 Intermediate |
| **Orders FBW** | 1 | 🟡 Intermediate |
| **Supply Planning** | 3 | 🟢 Basic → 🟡 Intermediate |
| **In-Store Pickup** | 1 | 🟡 Intermediate |
| **Finances** | 3 | 🟢 Basic → 🔴 Advanced |
| **Analytics** | 2 | 🟡 Intermediate |
| **Reports** | 1 | 🟡 Intermediate |
| **Communications** | 3 | 🟢 Basic → 🟡 Intermediate |
| **Tariffs** | 1 | 🟡 Intermediate |
| **Promotion** | 1 | 🟡 Intermediate |
| **Multi-Module** | 4 | 🔴 Advanced |

**Total: 27 examples** covering all SDK modules and common business workflows.

---

## Prerequisites

1. **Get your API key** from the Wildberries seller portal: https://seller.wildberries.ru/
2. **Set environment variable**:
   ```bash
   export WB_API_KEY="your-api-key-here"
   ```
3. **Node.js version**: >= 20.0.0
4. **Install SDK**: `npm install wb-api-sdk`

## Running Examples

All examples can be run using `tsx` (TypeScript execute):

```bash
# Install tsx globally (if not already installed)
npm install -g tsx

# Run any example
npx tsx examples/quickstart.ts
```

---

## Getting Started

### `quickstart.ts` - SDK Quick Start

**Complexity**: 🟢 Beginner | **Time**: 5 minutes

**Purpose**: Basic SDK usage and connectivity testing

**Demonstrates**:
- SDK initialization with API key
- Testing API connectivity (ping)
- Fetching seller information
- Retrieving news updates
- Proper error handling

**Run it:**
```bash
npx tsx examples/quickstart.ts
```

**Expected Output:**
```
✅ Connectivity OK
✅ Seller: Example Company LLC
📰 Latest News: 3 items
```

---

### `general.ts` - General API Module

**Complexity**: 🟢 Beginner | **Time**: 10 minutes

**Purpose**: Comprehensive demonstration of General module endpoints

**Demonstrates**:
- Ping endpoint for connectivity testing
- News retrieval with pagination
- Seller information lookup
- All General module capabilities

**Run it:**
```bash
npx tsx examples/general.ts
```

---

## Products Module

### `products-categories.ts` - Product Categories & Hierarchy

**Complexity**: 🟢 Beginner | **Time**: 10 minutes

**Purpose**: Navigate the Wildberries product category system

**Demonstrates**:
- Fetching parent categories (top-level)
- Getting subjects (subcategories)
- Retrieving product characteristics
- Understanding category hierarchy

**Key Concepts**:
- **Parent Categories**: Top-level (e.g., Electronics, Clothing)
- **Subjects**: Specific product types (e.g., Smartphones, T-Shirts)
- **Characteristics**: Required and optional product attributes

**Run it:**
```bash
npx tsx examples/products-categories.ts
```

---

### `products-crud.ts` - Product CRUD Operations

**Complexity**: 🟢 Beginner | **Time**: 15 minutes

**Purpose**: Complete product lifecycle management

**Demonstrates**:
- Creating product cards with characteristics
- Listing products with pagination and filters
- Updating product details
- Deleting products (moving to trash)
- Bulk operations handling
- Error handling for product operations

**Key Operations**:
- **Create**: Add new products to catalog
- **Read**: List and search products
- **Update**: Modify product information
- **Delete**: Soft delete (30-day auto-removal)

**Run it:**
```bash
npx tsx examples/products-crud.ts
```

**Expected Output:**
```
✅ Product created (ID: created)
✅ Found 1 products
✅ Product updated
✅ Products moved to trash (auto-delete in 30 days)
```

---

### `products-media-pricing.ts` - Media Upload & Pricing Management

**Complexity**: 🟡 Intermediate | **Time**: 20 minutes

**Purpose**: Manage product images and pricing

**Demonstrates**:
- Uploading product images (files or URLs)
- Managing media gallery
- Setting product prices
- Bulk pricing updates
- Price task tracking (async operations)
- Handling pricing errors

**Key Concepts**:
- **Media Upload**: Support for file upload and URL import
- **Pricing Tasks**: Asynchronous pricing update operations
- **Bulk Operations**: Update prices for multiple SKUs
- **Error Handling**: Validation and rate limit management

**Run it:**
```bash
npx tsx examples/products-media-pricing.ts
```

---

### `products-warehouse-stock.ts` - Warehouse & Stock Management

**Complexity**: 🟡 Intermediate | **Time**: 25 minutes

**Purpose**: Complete inventory management workflow

**Demonstrates**:
- Getting available WB warehouses for FBS binding
- Creating seller warehouses bound to WB offices
- Managing stock levels (add, update, delete)
- Bulk stock operations (up to 1000 SKUs)
- Understanding warehouse restrictions
- **WARNING**: Stock deletion is irreversible!

**Key Concepts**:
- **WB Offices**: Wildberries pickup points for FBS
- **Seller Warehouses**: Your warehouses bound to WB offices
- **Stock Operations**: Add, update, delete stock levels
- **Irreversible Actions**: Stock deletion cannot be undone

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/products-warehouse-stock.ts
```

**Prerequisites:**
```bash
# Required
export WB_API_KEY="your-api-key"

# Optional: For bulk operations demo
export WB_WAREHOUSE_ID="your-warehouse-id"
```

---

### `complete-product-workflow.ts` - End-to-End Product Lifecycle

**Complexity**: 🟡 Intermediate | **Time**: 30 minutes

**Purpose**: Complete product creation workflow from category to stock

**Demonstrates**:
- Category navigation (parent → subject → characteristics)
- Product creation with required characteristics
- Product verification and listing
- Pricing configuration (async task-based)
- Stock level management

**Complete Workflow Steps**:
1. **Category Navigation**: Browse hierarchy and select category
2. **Product Creation**: Build product with characteristics and create card
3. **Verification**: Confirm product creation via listing
4. **Pricing Setup**: Configure prices for product sizes
5. **Stock Management**: Set inventory levels for SKUs

**Key Integration Points**:
- Cross-module data flow (Categories → Products → Pricing → Stock)
- Async task-based operations (pricing)
- Dynamic product data from category characteristics
- Real product IDs across operations

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/complete-product-workflow.ts
```

**Expected Output:**
```
=== Complete Product Workflow ===

📂 Step 1: Category Navigation
✅ Retrieved 15 parent categories
✅ Retrieved 25 subjects
✅ Retrieved 42 characteristics

📦 Step 2: Product Creation
✅ Product created (ID: created)

📋 Step 3: Verify Product
✅ Found 1 matching products

💰 Step 4: Pricing
✅ Pricing task created (Price: 1999₽)

📊 Step 5: Stock Management
✅ Stock updated (Quantity: 100 units)

✅ Complete Workflow Finished!
```

---

## Orders Module

### `orders-fbs-processing.ts` - FBS Order Processing

**Complexity**: 🟢 Beginner | **Time**: 10 minutes

**Purpose**: Handle FBS (Fulfillment by Seller) order processing

**Demonstrates**:
- Fetching new orders awaiting processing
- Retrieving orders with date filters
- Pagination handling for large result sets
- Order status checking (supplier & WB statuses)
- Status breakdown analysis

**Key Concepts**:
- **FBS**: Seller processes and ships orders from own warehouse
- **Supplier Status**: Seller-controlled (new → confirm → complete)
- **WB Status**: System-controlled (waiting → sorted → sold)
- **Pagination**: Using next cursor for large result sets
- **Date Filters**: Unix timestamps for date range queries

**Run it:**
```bash
npx tsx examples/orders-fbs-processing.ts
```

---

### `orders-fbs-fulfillment.ts` - Complete FBS Fulfillment Workflow

**Complexity**: 🟡 Intermediate | **Time**: 25 minutes

**Purpose**: End-to-end FBS order fulfillment process

**Demonstrates**:
- Fetching new orders
- Creating supply for grouping orders
- Adding orders to supply (new → confirm status)
- Generating shipping labels (PNG, SVG, ZPL formats)
- Delivering supply (confirm → complete status)
- Getting supply QR code for tracking
- Managing supplies and cancellations

**Key Concepts**:
- **Supply Workflow**: Create → Add orders → Get stickers → Deliver → Get QR
- **Cargo Type Constraints**: Orders in supply must have same cargo type
- **Status Transitions**: new → confirm (add to supply) → complete (deliver)
- **Shipping Labels**: Base64-encoded in multiple formats (PNG/SVG/ZPLV/ZPLH)
- **Size Options**: 580×400px or 400×300px
- **Supply QR Code**: Only available after delivery
- **Auto-Removal**: Canceled orders automatically removed from supply

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/orders-fbs-fulfillment.ts
```

**Generates Files:**
- `order-sticker.png` - PNG shipping label (580×400px)
- `order-sticker.svg` - SVG shipping label (580×400px)
- `supply-qrcode.png` - Supply QR code (580×400px)

---

### `orders-fbw-fulfillment.ts` - FBW Warehouse Supply Planning

**Complexity**: 🟡 Intermediate | **Time**: 30 minutes

**Purpose**: Complete FBW warehouse supply planning and management

**Demonstrates**:
- Getting available WB warehouses with addresses
- Checking acceptance coefficients (next 14 days)
- Validating acceptance options for goods
- Calculating transit tariffs for delivery costs
- Listing and filtering existing supplies
- Getting detailed supply information
- Tracking goods within supplies
- Retrieving package information for logistics

**Key Concepts**:
- **FBW**: Seller ships to WB warehouse, WB handles customer delivery
- **Acceptance Coefficients**: -1 (unavailable), 0 (free), >0 (paid with multiplier)
- **Supply Statuses**: Not Planned → Planned → Allow Unload → Accepting → Accepted → Unloaded
- **Box Types**: Boxes (1), Monopallet (2), Supersafe (3)
- **Transit Tariffs**: Cost calculation for transit warehouse delivery
- **Package Codes**: Logistics tracking identifiers

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/orders-fbw-fulfillment.ts
```

**Best Practices:**
- Check acceptance coefficients before planning delivery
- Choose dates with coefficient = 0 for free acceptance
- Validate all goods can be accepted at target warehouse
- Calculate transit costs if using transit warehouses
- Monitor supply statuses to track acceptance progress

---

### `in-store-pickup-workflow.ts` - In-Store Pickup Management

**Complexity**: 🟡 Intermediate | **Time**: 25 minutes

**Purpose**: Manage in-store pickup orders (C&C - Click & Collect)

**Demonstrates**:
- Fetching new pickup orders
- Getting order details and customer info
- Order status management workflow
- Customer identity verification
- Order confirmation and preparation
- Metadata management (SGTIN, UIN, IMEI, GTIN codes)
- Handling pickup order lifecycle

**Key Concepts**:
- **C&C Orders**: Customer buys online, picks up at store
- **Status Workflow**: New → Confirmed → Prepared → Received
- **Customer Verification**: Identity check before handover
- **Metadata Codes**: Product identification (SGTIN, UIN, IMEI, GTIN)
- **Order Lifecycle**: 3-day pickup window

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/in-store-pickup-workflow.ts
```

**Expected Output:**
```
=== In-Store Pickup Order Management ===

📦 New Pickup Orders: 5
✅ Order confirmed (ID: 12345)
✅ Customer verified
✅ Order prepared for pickup
✅ Metadata set (SGTIN: 12345678)
✅ Order received by customer
```

---

## Supply Planning Module

The Supply Planning module provides utilities for calculating costs and optimizing FBW (Fulfillment by Wildberries) supply operations using the new Epic 11 utilities.

### `supplies-planning.ts` - Complete Supply Planning Workflow

**Complexity**: 🟡 Intermediate | **Time**: 25 minutes

**Purpose**: Complete supply planning workflow with cost optimization

**Demonstrates**:
- Getting available WB warehouses
- Checking acceptance coefficients for next 14 days
- Finding free acceptance dates (coefficient = 0)
- Using calculateSupplyCost utility for accurate cost estimation
- Using compareTariffs utility for FBW vs FBS comparison
- Making data-driven supply decisions

**Key Concepts**:
- **Acceptance Coefficients**: -1 (unavailable), 0 (free), >0 (paid multiplier)
- **Cost Components**: Acceptance + Storage + Logistics = Total
- **Tariff Comparison**: Inventory storage vs supply acceptance costs
- **Optimization Strategy**: Plan supplies on free acceptance dates

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/supplies-planning.ts
```

**Expected Output:**
```
=== Supply Planning Workflow ===

Step 1: Getting available warehouses...
Found 15 active warehouses

Step 2: Checking acceptance coefficients...
Warehouses with free acceptance: 5

Step 3: Calculating supply costs...
Supply Cost Breakdown:
  Acceptance: 0.00 RUB (free)
  Storage (30 days): 150.00 RUB
  Logistics: 45.00 RUB
  TOTAL: 195.00 RUB

Step 4: Comparing FBW vs FBS tariffs...
RECOMMENDATION: SUPPLY_CHEAPER
  -> Use FBW supply for lower overall costs

Step 5: Supply strategy recommendations...
RECOMMENDED SUPPLY STRATEGY:
  Warehouse: Koledino
  Optimal Date: 2025-01-28
  Acceptance: FREE (coefficient = 0)
```

---

### `supply-cost-calculator.ts` - Supply Cost Calculator

**Complexity**: 🟢 Beginner | **Time**: 10 minutes

**Purpose**: Calculate and compare FBW supply costs across warehouses

**Demonstrates**:
- Using the calculateSupplyCost utility function
- Understanding cost breakdown (acceptance, storage, logistics)
- Calculating costs for different volumes
- Comparing costs across multiple warehouses
- Finding the cheapest warehouse for given parameters
- Analyzing volume and duration impact on costs

**Key Concepts**:
- **Volume Scaling**: How costs change with supply volume
- **Storage Duration**: Impact of storage days on total cost
- **Cost Per Liter**: Efficiency metric for comparing options
- **Applied Coefficients**: Understanding how coefficients affect costs

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/supply-cost-calculator.ts
```

**Expected Output:**
```
=== Supply Cost Calculator ===

Parameters: 10L volume, 30 days storage, box type

Cost Breakdown for Warehouse: Koledino
  Acceptance: 0.00 RUB
  Storage:    150.00 RUB
  Logistics:  45.00 RUB
  TOTAL:      195.00 RUB

Cost Comparison Across Warehouses:
  1. Koledino: 195.00 RUB (19.50 RUB/L) [FREE acceptance]
  2. Kazan: 210.00 RUB (21.00 RUB/L)
  3. Krasnodar: 225.00 RUB (22.50 RUB/L)

Volume Cost Scaling:
   1L | 25.00 RUB | 25.00 RUB/L
   5L | 110.00 RUB | 22.00 RUB/L
  10L | 195.00 RUB | 19.50 RUB/L
  25L | 450.00 RUB | 18.00 RUB/L
```

---

### `tariff-comparison.ts` - Tariff Comparison Tool

**Complexity**: 🟢 Beginner | **Time**: 10 minutes

**Purpose**: Compare inventory storage vs supply acceptance tariffs

**Demonstrates**:
- Using the compareTariffs utility function
- Understanding inventory vs supply tariff APIs
- Interpreting recommendation results
- Making data-driven fulfillment decisions
- Comparing multiple warehouses

**Key Concepts**:
- **Inventory Storage (tariffs/box)**: Tariffs for goods already in WB warehouses
- **Supply Acceptance (acceptance/coefficients)**: Tariffs for new shipments
- **Recommendations**: SUPPLY_CHEAPER, INVENTORY_CHEAPER, or EQUAL
- **Decision Making**: When to use each fulfillment method

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/tariff-comparison.ts
```

**Expected Output:**
```
=== Tariff Comparison Tool ===

Warehouse: Koledino
==================================================

Inventory Storage Tariffs (tariffs/box API):
  Delivery base:     45.00 RUB/L
  Storage base:      5.00 RUB/L/day

Supply Acceptance Tariffs (acceptance/coefficients API):
  Delivery base:     40.00 RUB/L
  Storage base:      4.50 RUB/L/day

Difference (Supply vs Inventory):
  Delivery base:     -11.1% (supply cheaper)
  Storage base:      -10.0% (supply cheaper)

RECOMMENDATION: SUPPLY_CHEAPER
  FBW supply has lower base costs. Consider sending new shipments via supply acceptance.

Summary:
  Supply cheaper:     3 warehouses
  Inventory cheaper:  1 warehouses
  Equal costs:        1 warehouses
```

---

## Finances Module

### `finances-balance-transactions.ts` - Balance & Transaction Management

**Complexity**: 🟢 Beginner | **Time**: 10 minutes

**Purpose**: Monitor financial balance and transaction history

**Demonstrates**:
- Getting current account balance
- Fetching transaction history with filters
- Transaction detail retrieval
- Date range filtering
- Transaction type analysis
- Balance change tracking

**Key Concepts**:
- **Balance Types**: Available, Pending, Blocked
- **Transaction Types**: Sales, Returns, Fees, Payouts
- **Date Filters**: Unix timestamps for period selection
- **Transaction Details**: Full breakdown of each transaction

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/finances-balance-transactions.ts
```

**Expected Output:**
```
=== Financial Balance & Transactions ===

💰 Current Balance: 125,450.50₽
   Available: 100,000₽
   Pending: 25,450.50₽

📊 Recent Transactions (Last 30 days):
   Sales: 50 transactions (+150,000₽)
   Returns: 5 transactions (-15,000₽)
   Fees: 10 transactions (-9,549.50₽)
```

---

### `finances-reports-payouts.ts` - Financial Reports & Payouts

**Complexity**: 🟡 Intermediate | **Time**: 20 minutes

**Purpose**: Generate financial reports and track payouts

**Demonstrates**:
- Financial report generation (async workflow)
- Report status checking and downloading
- Payout history retrieval
- Payout detail analysis
- Report filtering by date and type
- Understanding payout schedule

**Key Concepts**:
- **Report Types**: Sales summary, Detailed transactions, Tax reports
- **Async Reports**: Generate → Poll status → Download
- **Payout Schedule**: Weekly or bi-weekly depending on contract
- **Payout Details**: Breakdown of amounts, fees, and deductions
- **Report Formats**: PDF, Excel, CSV

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/finances-reports-payouts.ts
```

**Expected Output:**
```
=== Financial Reports & Payouts ===

📄 Generating Report: sales_summary
⏳ Report status: processing...
✅ Report completed
📥 Download URL: https://...

💸 Recent Payouts (Last 3 months):
   2024-01: 95,000₽ (paid Jan 15)
   2024-02: 105,000₽ (paid Feb 15)
   2024-03: 110,000₽ (pending)
```

---

### `financial-reconciliation.ts` - Financial Reconciliation Workflow

**Complexity**: 🔴 Advanced | **Time**: 40 minutes

**Purpose**: Reconcile sales, returns, and payments for accounting

**Demonstrates**:
- Cross-module financial data aggregation
- Sales and returns reconciliation
- Fee calculation verification
- Payout matching with transactions
- Discrepancy detection
- Financial reporting for accounting

**Key Concepts**:
- **Reconciliation**: Matching orders, transactions, and payouts
- **Fee Verification**: Confirming commission and service fees
- **Accounting Export**: Preparing data for accounting systems
- **Discrepancy Handling**: Identifying and resolving mismatches

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/financial-reconciliation.ts
```

---

## Analytics Module

### `analytics-dashboard.ts` - Analytics Dashboard

**Complexity**: 🟡 Intermediate | **Time**: 25 minutes

**Purpose**: Build comprehensive analytics dashboard with key metrics

> **Updated in v2.7.0**: Now uses the v3 Sales Funnel methods (`getSalesFunnelProducts`, `getSalesFunnelProductsHistory`, `getSalesFunnelGroupedHistory`) which replace the deprecated v2 `createNmReportDetail`/`createDetailHistory`/`createGroupedHistory` methods. See the [Analytics v3 Migration Guide](../docs/guides/migration-v2.7-analytics-v3.md) for details.

**Demonstrates**:
- Sales funnel analysis using v3 API (impressions → clicks → orders)
- Product performance metrics via `getSalesFunnelProducts()`
- Historical statistics over time periods via `getSalesFunnelProductsHistory()`
- Grouped analytics via `getSalesFunnelGroupedHistory()`
- Search query analysis
- Category performance tracking
- Stock history monitoring
- CSV report generation

**Key Metrics**:
- **Sales Funnel**: Conversion rates at each stage
- **Product KPIs**: Revenue, units sold, average price
- **Search Performance**: Query popularity and conversion
- **Category Analysis**: Best/worst performing categories
- **Inventory Trends**: Stock levels over time

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/analytics-dashboard.ts
```

**Expected Output:**
```
=== Analytics Dashboard ===

📈 Sales Funnel (Last 30 days):
   Impressions: 50,000
   Clicks: 5,000 (10% CTR)
   Add to Cart: 1,000 (20% conversion)
   Orders: 500 (50% checkout rate)

🏆 Top Products:
   1. Product A: 150 units, 75,000₽
   2. Product B: 120 units, 60,000₽

🔍 Top Search Queries:
   1. "wireless headphones" → 45 orders
   2. "smart watch" → 32 orders
```

---

### `reports-analytics.ts` - Advanced Analytics Reports

**Complexity**: 🟡 Intermediate | **Time**: 20 minutes

**Purpose**: Generate advanced analytics reports

**Demonstrates**:
- Sales reports (incomes data)
- Stock reports (warehouse inventory)
- Order reports (fulfillment statistics)
- Sales analysis by period
- Custom report generation
- Warehouse remains reporting

**Key Concepts**:
- **Report Types**: Incomes, Stocks, Orders, Sales
- **Time Periods**: Daily, Weekly, Monthly aggregation
- **Warehouse Data**: Stock levels, movements, discrepancies
- **Custom Reports**: Flexible filtering and grouping

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/reports-analytics.ts
```

---

## Communications Module

### `customer-support.ts` - Customer Support Workflows

**Complexity**: 🟢 Beginner | **Time**: 15 minutes

**Purpose**: Manage customer communications and support tickets

**Demonstrates**:
- Fetching customer chats
- Reading chat events and messages
- Sending messages to customers
- Event pagination handling
- Customer message filtering
- Chat event types (messages, attachments, system events)

**Key Concepts**:
- **Chat Events**: Messages, attachments, system notifications
- **Event Types**: Client messages, seller replies, system updates
- **Pagination**: Cursor-based event history navigation
- **Reply Sign**: Unique identifier for responding to chats
- **Message Filtering**: Separate customer vs seller messages

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/customer-support.ts
```

**Expected Output:**
```
=== Customer Support ===

💬 Active Chats: 15
📧 New Messages: 8

Recent Messages:
  👤 Customer: "When will my order arrive?"
  🏢 You: "Your order is being processed..."

✅ Message sent
```

---

### `customer-engagement.ts` - Customer Engagement Workflows

**Complexity**: 🟡 Intermediate | **Time**: 25 minutes

**Purpose**: Manage reviews, questions, and customer feedback

**Demonstrates**:
- Fetching product reviews
- Reading customer questions
- Responding to reviews
- Answering product questions
- Marking questions as viewed
- Review and question filtering
- Managing feedback workflow

**Key Concepts**:
- **Reviews**: Customer product reviews with ratings
- **Questions**: Product questions from customers
- **Response Management**: Answer questions, respond to reviews
- **Moderation**: Mark questions as viewed/answered
- **Filtering**: By product, rating, status, date

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/customer-engagement.ts
```

---

### `communications-customer-engagement.ts` - Complete Communications Workflow

**Complexity**: 🟡 Intermediate | **Time**: 30 minutes

**Purpose**: End-to-end customer communications management

**Demonstrates**:
- Chat management (fetch, read, reply)
- Review management (read, respond, edit responses)
- Question management (answer, mark viewed)
- Event-driven communication handling
- Multi-channel customer engagement

**Key Concepts**:
- **Multi-Channel**: Chats, Reviews, Questions in one workflow
- **Event-Driven**: Real-time event processing
- **Customer Journey**: From question to review to support
- **Response Templates**: Standardized responses for common queries

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/communications-customer-engagement.ts
```

---

## Other Modules

### `tariffs-pricing-calculator.ts` - Pricing Calculator

**Complexity**: 🟡 Intermediate | **Time**: 20 minutes

**Purpose**: Calculate total costs and seller payout for products

**Demonstrates**:
- Fetching commission rates by category
- Getting storage tariffs (daily rate per liter)
- Calculating logistics costs (delivery and return)
- Computing total fees breakdown
- Net seller payout calculation
- Cost analysis by fulfillment model

**Key Concepts**:
- **Commission Rates**: Category-specific percentages (FBS, FBW, DBS, C&C)
- **Storage Fees**: Daily cost per liter based on warehouse
- **Logistics Costs**: Delivery to customer + return handling
- **Total Cost**: Commission + Storage + Logistics
- **Net Payout**: Sale Price - Total Cost

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/tariffs-pricing-calculator.ts
```

**Expected Output:**
```
=== Tariffs Pricing Calculator ===

Product: Wireless Headphones
Sale Price: 5,000₽

💰 Cost Breakdown:
   Commission (15%): 750₽
   Storage (30 days): 45₽
   Logistics: 150₽
   ─────────────────
   Total Fees: 945₽

💵 Net Payout: 4,055₽ (81% of sale price)
```

---

### `promotion-campaign-automation.ts` - Promotion Campaign Automation

**Complexity**: 🟡 Intermediate | **Time**: 25 minutes

**Purpose**: Automate advertising campaign management

**Demonstrates**:
- Creating advertising campaigns
- Setting campaign budgets
- Configuring bids for products
- Campaign performance tracking
- Pausing and resuming campaigns
- Budget management
- Bid optimization

**Key Concepts**:
- **Campaign Types**: Search, Carousel, Banner, Catalog
- **Bidding**: CPC (Cost Per Click) bid management
- **Budget Control**: Daily budget limits and deposits
- **Performance Metrics**: Impressions, clicks, CTR, conversions
- **Automation**: Scheduled campaign management

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/promotion-campaign-automation.ts
```

**Expected Output:**
```
=== Promotion Campaign Automation ===

📢 Campaign Created: "Spring Sale"
   Budget: 10,000₽/day
   Products: 50
   Avg Bid: 15₽

📊 Performance (Last 7 days):
   Impressions: 100,000
   Clicks: 5,000 (5% CTR)
   Orders: 250 (5% conversion)
   ROAS: 3.2x
```

---

## Integration Examples

### `integration-product-order-finance.ts` - Multi-Module Integration

**Complexity**: 🔴 Advanced | **Time**: 45 minutes

**Purpose**: Demonstrate cross-module data flow and integration

**Demonstrates**:
- Product creation → Order processing → Financial tracking
- Data flow across modules
- Asynchronous workflow coordination
- Transaction tracking from product to payout
- End-to-end business process automation

**Complete Integration Flow**:
1. **Product Module**: Create product and set pricing
2. **Orders Module**: Process orders for the product
3. **Finances Module**: Track transactions and payouts
4. **Analytics Module**: Monitor performance metrics

**Key Integration Points**:
- Product ID links to orders
- Order ID links to transactions
- Transaction ID links to payouts
- Cross-module data consistency

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/integration-product-order-finance.ts
```

**Expected Output:**
```
=== Multi-Module Integration ===

📦 Product Created: EXAMPLE-123
💼 Orders Processing: 5 orders
💰 Transactions: 5 sales totaling 25,000₽
📊 Analytics: 20% conversion rate

✅ Complete integration cycle successful
```

---

### `business-dashboard.ts` - Business Intelligence Dashboard

**Complexity**: 🔴 Advanced | **Time**: 50 minutes

**Purpose**: Real-time business metrics and KPI dashboard

**Demonstrates**:
- Aggregating data from multiple modules
- Calculating business KPIs
- Revenue and profit tracking
- Inventory turnover analysis
- Customer satisfaction metrics
- Real-time dashboard updates

**Key KPIs**:
- **Revenue Metrics**: Daily, weekly, monthly revenue
- **Profit Margins**: Gross and net profit calculations
- **Inventory KPIs**: Turnover rate, stock-out frequency
- **Customer Metrics**: Satisfaction score, repeat purchase rate
- **Operational KPIs**: Order fulfillment time, return rate

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/business-dashboard.ts
```

---

### `export-to-bi.ts` - Export Data to BI Tools

**Complexity**: 🔴 Advanced | **Time**: 60 minutes

**Purpose**: Export data for external BI tools and analytics platforms

**Demonstrates**:
- Exporting sales data in various formats
- Preparing data for BI tools (Power BI, Tableau, etc.)
- CSV/JSON export workflows
- Data transformation for analytics
- Scheduling data exports

**Supported Formats**:
- **CSV**: For Excel and spreadsheet tools
- **JSON**: For programmatic processing
- **Parquet**: For big data platforms
- **Database**: Direct SQL export

**Integration Targets**:
- Microsoft Power BI
- Tableau
- Google Data Studio
- Custom analytics platforms

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/export-to-bi.ts
```

---

## Configuration

### Minimal Configuration

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: 'your-api-key'
});
```

### Advanced Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: 'your-api-key',

  // Timeout configuration
  timeout: 60000, // 60 seconds

  // Retry configuration
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000, // 2 seconds
    exponentialBackoff: true,
  },

  // Rate limit configuration
  rateLimitConfig: {
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  },

  // Logging
  logLevel: 'debug', // 'debug' | 'info' | 'warn' | 'error'
});
```

---

## Error Handling

All examples demonstrate comprehensive error handling patterns:

### Basic Error Handling

```typescript
try {
  const response = await sdk.general.ping();
  console.log('Ping successful:', response.Status);
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('❌ Invalid API key:', error.message);
  } else if (error instanceof RateLimitError) {
    console.error('❌ Rate limit exceeded');
    console.log(`⏳ Retry after: ${error.retryAfter}ms`);
  } else if (error instanceof NetworkError) {
    console.error('❌ Network error:', error.message);
  } else if (error instanceof WBAPIError) {
    console.error('❌ API error:', error.message);
  }
}
```

### Retry Logic Example

```typescript
import { retry } from './utils/retry';

const result = await retry(
  async () => await sdk.products.listProducts({ limit: 100 }),
  {
    maxAttempts: 3,
    delayMs: 1000,
    exponentialBackoff: true,
    onRetry: (attempt, error) => {
      console.log(`Retry attempt ${attempt}: ${error.message}`);
    }
  }
);
```

### Rate Limit Handling

```typescript
async function handleRateLimiting() {
  try {
    const response = await sdk.products.createProduct(productData);
  } catch (error) {
    if (error instanceof RateLimitError) {
      // Wait for retry-after period
      await new Promise(resolve =>
        setTimeout(resolve, error.retryAfter)
      );
      // Retry the operation
      return await sdk.products.createProduct(productData);
    }
    throw error;
  }
}
```

---

## Best Practices

### 1. Always Use Environment Variables for API Keys

```typescript
// ✅ GOOD: Use environment variables
const apiKey = process.env.WB_API_KEY;

// ❌ BAD: Hardcoded API keys
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 2. Handle Errors Gracefully

```typescript
// ✅ GOOD: Specific error handling
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors
  } else if (error instanceof RateLimitError) {
    // Handle rate limits
  }
}

// ❌ BAD: Generic error handling
try {
  await sdk.products.createProduct(data);
} catch (error) {
  console.error(error); // Too generic
}
```

### 3. Use Pagination for Large Data Sets

```typescript
// ✅ GOOD: Paginate through results
let cursor: number | undefined;
const allOrders = [];

do {
  const response = await sdk.ordersFBS.getOrders({ next: cursor });
  allOrders.push(...response.data.orders);
  cursor = response.data.next;
} while (cursor);
```

### 4. Implement Retry Logic

```typescript
// ✅ GOOD: Retry transient errors
const result = await retryWithBackoff(
  () => sdk.products.updatePricing(data),
  { maxRetries: 3 }
);
```

### 5. Validate Data Before API Calls

```typescript
// ✅ GOOD: Pre-validation
if (!productData.vendorCode || productData.vendorCode.length > 75) {
  throw new Error('Invalid vendor code');
}

await sdk.products.createProduct(productData);
```

### 6. Use TypeScript for Type Safety

```typescript
// ✅ GOOD: TypeScript provides autocomplete and type checking
import { CreateProductRequest } from 'wb-api-sdk';

const productData: CreateProductRequest = {
  subjectID: 105,
  variants: [{ /* ... */ }]
};
```

### 7. Monitor Rate Limits

```typescript
// ✅ GOOD: Respect rate limits
const REQUESTS_PER_MINUTE = 60;
let requestCount = 0;
let resetTime = Date.now() + 60000;

async function rateLimitedRequest() {
  if (Date.now() > resetTime) {
    requestCount = 0;
    resetTime = Date.now() + 60000;
  }

  if (requestCount >= REQUESTS_PER_MINUTE) {
    await new Promise(resolve =>
      setTimeout(resolve, resetTime - Date.now())
    );
  }

  requestCount++;
  return await sdk.products.listProducts();
}
```

---

## Testing Examples

All examples can be tested end-to-end. Run the test suite:

```bash
# Test all examples
npm run test:examples

# Test specific module examples
npm run test:examples -- --grep "products"
```

---

## Troubleshooting

### Common Issues and Solutions

#### ❌ "WB_API_KEY environment variable not set"

**Problem**: API key environment variable is missing or not exported.

**Solution**:
```bash
# Set environment variable (Linux/macOS)
export WB_API_KEY="your-api-key-here"

# Verify it's set
echo $WB_API_KEY

# Run example
npx tsx examples/quickstart.ts
```

**Windows (PowerShell)**:
```powershell
$env:WB_API_KEY="your-api-key-here"
npx tsx examples/quickstart.ts
```

---

#### ❌ "Authentication failed: Invalid API key"

**Problem**: API key is incorrect, expired, or has insufficient permissions.

**Solution**:
1. **Verify API key**: Log into Wildberries seller portal and regenerate key
2. **Check permissions**: Ensure API key has access to the required modules
3. **Test connectivity**: Run `quickstart.ts` to validate API key
4. **Check for typos**: Ensure no extra spaces or characters in the key

```bash
# Test your API key
export WB_API_KEY="your-new-api-key"
npx tsx examples/quickstart.ts
```

---

#### ⚠️ "Rate limit exceeded"

**Problem**: Too many requests sent to the API in a short time period.

**Solution**:
- **Wait for retry period**: Error message includes `retryAfter` value in milliseconds
- **Implement delays**: Add delays between batch operations
- **Review rate limits**: Each API module has different rate limits

**Module-Specific Rate Limits**:
- **Products**: 1 request per 10 seconds for creation
- **Orders FBS**: 5 requests per minute
- **Communications**: 1 request per minute for reviews/Q&A
- **Analytics**: 5 requests per minute for queries, 1 request per 2 minutes for CSV exports

```typescript
// Example: Handle rate limit errors
try {
  await sdk.products.createProduct(productData);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`⏳ Waiting ${error.retryAfter}ms before retry...`);
    await new Promise(resolve => setTimeout(resolve, error.retryAfter));
    // SDK automatically retries, or retry manually here
  }
}
```

---

#### 🌐 "Network error: ECONNREFUSED" / "Network error: ETIMEDOUT"

**Problem**: Cannot connect to Wildberries API servers.

**Solution**:
1. **Check internet connection**: Verify you have connectivity
2. **Check firewall**: Ensure outbound HTTPS (port 443) is allowed
3. **Verify API status**: Check https://seller.wildberries.ru/ for service status
4. **Increase timeout**: Configure longer timeout for slow connections

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000, // 60 seconds (default: 30 seconds)
  retryConfig: {
    maxRetries: 5,          // Retry up to 5 times
    retryDelay: 2000,       // 2 seconds between retries
    exponentialBackoff: true // Increase delay exponentially
  }
});
```

---

#### ❌ "Validation error: Missing required field"

**Problem**: Request data is missing required fields or has invalid values.

**Solution**:
1. **Check API requirements**: Review example code for required fields
2. **Validate data types**: Ensure correct data types (string, number, boolean)
3. **Review API docs**: Check official Wildberries API documentation
4. **Use TypeScript**: TypeScript will catch many validation errors at compile time

```typescript
// Example: Proper validation
import { CreateProductRequest } from 'wb-api-sdk';

const productData: CreateProductRequest = {
  subjectID: 105,              // Required: Category subject ID
  variants: [{
    vendorCode: "PROD-001",    // Required: Unique vendor code
    barcode: "1234567890123",  // Required: Valid barcode
    // ... other required fields
  }]
};

// TypeScript will show errors if required fields are missing
await sdk.products.createProduct(productData);
```

---

#### 📦 "Module not found" / "Cannot find package"

**Problem**: SDK or dependencies not installed.

**Solution**:
```bash
# Install SDK (when published)
npm install wb-api-sdk

# For local development
npm install

# Build SDK
npm run build

# Install tsx for running examples
npm install -g tsx
```

---

#### 🔍 "No data returned" / "Empty response"

**Problem**: API call succeeds but returns no data.

**Possible Causes**:
1. **No data available**: You may not have any orders, products, or transactions yet
2. **Incorrect filters**: Date ranges or filters may be too restrictive
3. **Account setup**: Seller account may not be fully configured
4. **Module access**: API key may not have access to specific modules

**Solution**:
```typescript
// Check response structure
const response = await sdk.products.listProducts({ limit: 10 });

if (!response.data || response.data.length === 0) {
  console.log('ℹ️  No products found. Have you created any products yet?');
  console.log('Try running: npx tsx examples/products-crud.ts');
} else {
  console.log(`✅ Found ${response.data.length} products`);
}
```

---

#### ⏳ "Request timeout after 30000ms"

**Problem**: API request takes too long and times out.

**Possible Causes**:
1. **Large data set**: Fetching too much data at once
2. **Slow connection**: Network latency or bandwidth issues
3. **API performance**: Wildberries API may be experiencing high load
4. **Report generation**: Some reports take longer to generate

**Solution**:
```typescript
// Increase timeout for large operations
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 120000, // 2 minutes for large data sets
});

// Use pagination for large data sets
let cursor: number | undefined;
let allProducts = [];

do {
  const response = await sdk.products.listProducts({
    limit: 100,  // Smaller batch size
    next: cursor
  });
  allProducts.push(...response.data);
  cursor = response.data.next;
} while (cursor);
```

---

#### 🛠️ "TypeError: Cannot read property of undefined"

**Problem**: Trying to access properties on undefined or null values.

**Solution**:
```typescript
// ❌ BAD: No null checks
const productName = response.data.products[0].name; // Crashes if empty

// ✅ GOOD: Defensive programming
const products = response.data?.products || [];
if (products.length === 0) {
  console.log('No products found');
  return;
}

const productName = products[0]?.name || 'Unknown Product';
console.log(`Product: ${productName}`);
```

---

#### 💾 "ENOSPC: no space left on device"

**Problem**: Disk space full when downloading reports or media files.

**Solution**:
1. **Free up disk space**: Delete unnecessary files
2. **Change download location**: Use a different drive or directory
3. **Stream large files**: Use streaming instead of loading entire file into memory
4. **Clean up temp files**: Remove old report downloads

```bash
# Check disk space
df -h

# Clean up old reports
rm -rf /path/to/reports/old/*
```

---

### Getting Help

If you encounter an issue not listed here:

1. **Check Examples**: Review similar examples for working patterns
2. **Check API Docs**: https://dev.wildberries.ru/ for latest API documentation
3. **Enable Debug Logging**: Set `logLevel: 'debug'` in SDK configuration
4. **Test with Minimal Example**: Start with `quickstart.ts` to isolate the issue
5. **Check SDK Version**: Ensure you're using the latest version

```typescript
// Enable debug logging
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: 'debug', // Shows detailed request/response logs
});
```

6. **Report Issues**: If you found a bug, report it at the SDK repository

---

## Need Help?

- **Wildberries API Documentation**: https://dev.wildberries.ru/
- **SDK Documentation Hub**: [../docs/index.md](../docs/index.md)
- **Getting Started Guide**: [../docs/getting-started/](../docs/getting-started/)
- **API Reference**: [../docs/api/](../docs/api/)
- **Best Practices**: [../docs/guides/best-practices.md](../docs/guides/best-practices.md)
- **Troubleshooting**: [../docs/guides/troubleshooting.md](../docs/guides/troubleshooting.md)
- **Type Definitions**: Use your IDE's autocomplete (Ctrl+Space / Cmd+Space)

---

## Contributing Examples

Have a useful example? Please submit a pull request!

### Guidelines

1. **Focus**: Keep examples focused on one topic or workflow
2. **Comments**: Include clear comments explaining each step
3. **Error Handling**: Add comprehensive error handling
4. **TypeScript**: Use TypeScript for type safety
5. **Prerequisites**: Document required setup and environment variables
6. **Expected Output**: Show what users should expect to see
7. **Testing**: Test your example before submitting
8. **Documentation**: Update this README with your example

### Example Template

```typescript
/**
 * Example: [Your Example Name]
 *
 * Description: [What this example demonstrates]
 *
 * Prerequisites:
 * - Wildberries API key
 * - [Any other requirements]
 *
 * Expected Output:
 * - [What users will see]
 *
 * @see {@link [API docs link]}
 */

import { WildberriesSDK } from '../src';

async function main() {
  // 1. Initialize SDK
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!
  });

  try {
    // 2. Your example code here

  } catch (error) {
    // 3. Error handling
  }
}

main().catch(console.error);
```

---

## License

MIT License - see [LICENSE](../LICENSE) for details

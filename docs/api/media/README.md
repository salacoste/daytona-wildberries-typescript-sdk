# Wildberries SDK Examples

This directory contains practical examples demonstrating how to use the Wildberries TypeScript SDK.

## Prerequisites

1. **Get your API key** from the Wildberries seller portal: https://seller.wildberries.ru/
2. **Set environment variable**:
   ```bash
   export WB_API_KEY="your-api-key-here"
   ```

## Running Examples

All examples can be run using `tsx` (TypeScript execute):

```bash
# Install tsx if you haven't already
npm install -g tsx

# Run an example
npx tsx examples/quickstart.ts
```

## Available Examples

### `quickstart.ts` - Getting Started

Basic SDK usage demonstrating:
- SDK initialization
- Testing connectivity (ping)
- Fetching seller information
- Retrieving news
- Proper error handling

**Run it:**
```bash
npx tsx examples/quickstart.ts
```

### `general.ts` - General Module

Demonstrates all General API module endpoints:
- Ping (connectivity testing)
- News retrieval with filtering
- Seller information lookup

### `products-categories.ts` - Product Categories (Story 2.1)

Demonstrates product category navigation:
- Fetching parent categories
- Getting subjects (subcategories)
- Retrieving characteristics for products
- Understanding category hierarchy

### `products-crud.ts` - Product CRUD Operations (Story 2.2)

Complete product lifecycle management:
- Creating product cards
- Listing products with pagination
- Updating product details
- Deleting products (moving to trash)
- Error handling for product operations

### `products-media-pricing.ts` - Media and Pricing (Story 2.3)

Media upload and pricing management:
- Uploading product images
- Managing media files
- Setting product prices
- Updating pricing in bulk
- Handling pricing errors

### `products-warehouse-stock.ts` - Inventory Management (Story 2.4)

Complete warehouse and stock management workflow:
- Getting available WB warehouses for FBS binding
- Creating seller warehouses bound to WB offices
- Managing stock levels (add, update, delete)
- Bulk stock operations (up to 1000 SKUs)
- Error handling for warehouse restrictions
- Understanding irreversible stock deletion

**Run it:**
```bash
npx tsx examples/products-warehouse-stock.ts
```

**Prerequisites:**
```bash
export WB_API_KEY="your-api-key"
# Optional: For bulk operations demo
export WB_WAREHOUSE_ID="your-warehouse-id"
```

### `complete-product-workflow.ts` - Complete Product Lifecycle (Story 2.9)

End-to-end product management workflow combining all product operations from Stories 2.1-2.4:
- Navigating category hierarchy (parent → subjects → characteristics)
- Creating product with required characteristics
- Listing products to verify creation
- Updating pricing configuration (task-based async)
- Managing stock levels with warehouse integration

**Complete Workflow Steps:**
1. **Category Navigation**: Get parent categories → Select category → Get subjects → Get characteristics
2. **Product Creation**: Build product data with characteristics → Create product card → Verify creation
3. **Pricing Setup**: Create pricing task for product sizes
4. **Stock Management**: Update stock levels for product SKUs

**Key Integration Points:**
- Demonstrates cross-module data flow (Categories → Products → Pricing → Stock)
- Shows async task-based operations (pricing)
- Handles dynamic product data from category characteristics
- Uses real product IDs across operations

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/complete-product-workflow.ts
```

**Expected Output:**
```
=== Complete Product Workflow ===

📂 Step 1: Category Navigation
──────────────────────────────────────────────────
✅ Retrieved 15 parent categories
   Selected parent: Электроника (ID: 1)
✅ Retrieved 25 subjects/categories
   Selected subject: Смартфоны (ID: 105)
✅ Retrieved 42 characteristics (18 required)

📦 Step 2: Product Creation
──────────────────────────────────────────────────
Creating product card...
✅ Product created successfully (ID: created)
   Vendor code: EXAMPLE-1729608524123

📋 Step 3: Verify Product Creation
──────────────────────────────────────────────────
✅ Found 1 matching products
   Product NM ID: 123456789
   Vendor Code: EXAMPLE-1729608524123

💰 Step 4: Price Configuration
──────────────────────────────────────────────────
✅ Pricing task created
   Price set to: 1999₽ (19.99 RUB)

📊 Step 5: Stock Management
──────────────────────────────────────────────────
✅ Stock updated for SKU: 1234567890123
   Quantity: 100 units

==================================================
✅ Complete Product Workflow Finished Successfully!
==================================================
```

## Example Structure

Each example follows this pattern:

```typescript
import { WildberriesSDK } from '../src';

async function main() {
  // 1. Initialize SDK
  const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

  // 2. Make API calls
  const response = await sdk.general.ping();

  // 3. Handle results
  console.log('Status:', response.Status);
}

main().catch(console.error);
```

## Configuration Examples

### Minimal Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: 'your-api-key'
});
```

### Advanced Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: 'your-api-key',
  timeout: 60000, // 60 seconds
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,
  },
  logLevel: 'debug',
});
```

## Error Handling

All examples demonstrate proper error handling:

```typescript
try {
  const response = await sdk.general.ping();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key:', error.message);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded, retry after:', error.retryAfter);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  }
}
```

## Future Examples (Coming Soon)

- **Products Module** (Epic 2): Product management examples
- **Orders Module** (Epic 2): Order handling examples
- **Finances Module** (Epic 3): Financial reporting examples
- **Analytics Module** (Epic 3): Analytics and reporting examples

## Need Help?

- **API Documentation**: https://dev.wildberries.ru/
- **SDK Documentation**: See `README.md` in project root
- **Type Definitions**: Use your IDE's autocomplete (Ctrl+Space / Cmd+Space)

## Contributing Examples

Have a useful example? Please submit a pull request!

Guidelines:
- Include clear comments explaining each step
- Add error handling
- Use TypeScript for type safety
- Keep examples focused on one topic
- Test your example before submitting

### `orders-fbs-processing.ts` - FBS Order Processing (Story 2.5)

Complete FBS (Fulfillment by Seller) order processing workflow:
- Fetching new orders awaiting processing
- Retrieving orders with date filters (last 7 days)
- Pagination handling for large result sets
- Order status checking (supplier & WB system status)
- Status breakdown analysis

**Key Concepts:**
- **FBS**: Seller processes orders from own warehouse
- **Supplier Status**: Seller-controlled (new → confirm → complete)
- **WB Status**: System-controlled (waiting → sorted → sold)
- **Pagination**: Using next cursor for large result sets
- **Date Filters**: Unix timestamps for date range queries

**Run it:**
```bash
npx tsx examples/orders-fbs-processing.ts
```

### `orders-fbs-fulfillment.ts` - Complete FBS Fulfillment Workflow (Story 2.6)

Complete end-to-end FBS (Fulfillment by Seller) order fulfillment workflow:
- Fetching new orders awaiting processing
- Creating supply for grouping orders
- Adding orders to supply (new → confirm status transition)
- Generating shipping labels in multiple formats (PNG, SVG)
- Delivering supply (confirm → complete status transition)
- Getting supply QR code for tracking
- Managing supplies and order cancellation

**Key Concepts:**
- **Supply Workflow**: Create → Add orders → Get stickers → Deliver → Get QR
- **Cargo Type Constraints**: Supply can only contain orders of same cargo type
- **Status Transitions**: new → confirm (add to supply) → complete (deliver)
- **Shipping Labels**: Base64-encoded in PNG, SVG, ZPLV, ZPLH formats
- **Size Options**: 580×400px or 400×300px
- **Supply QR Code**: Only available after delivery
- **Auto-Removal**: Canceled orders automatically removed from supply

**Run it:**
```bash
export WB_API_KEY="your-api-key"
npx tsx examples/orders-fbs-fulfillment.ts
```

**Generates:**
- `order-sticker.png` - PNG shipping label (580×400px)
- `order-sticker.svg` - SVG shipping label (580×400px)
- `supply-qrcode.png` - Supply QR code (580×400px)

### `orders-fbw-fulfillment.ts` - FBW Warehouse Supply Planning Workflow (Story 2.7)

Complete FBW (Fulfillment by Wildberries) warehouse supply planning and management workflow:
- Getting available WB warehouses with addresses and work schedules
- Checking acceptance coefficients for optimal delivery dates (next 14 days)
- Validating acceptance options for specific goods and barcodes
- Calculating transit tariffs for delivery cost planning
- Listing and filtering existing supplies (by date, status)
- Getting detailed supply information (costs, coefficients)
- Tracking goods within supplies (acceptance progress)
- Retrieving package information for logistics coordination

**Key Concepts:**
- **FBW**: Seller ships to WB warehouse, WB handles customer delivery
- **Acceptance Coefficients**: -1 (unavailable), 0 (free), >0 (paid with multiplier)
- **Supply Statuses**: Not Planned (1) → Planned (2) → Allow Unload (3) → Accepting (4) → Accepted (5) → Unloaded (6)
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

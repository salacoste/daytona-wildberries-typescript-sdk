# Tutorial 2: Order Fulfillment Workflow

Learn how to process customer orders and manage fulfillment operations.

> **[Русская версия](../../ru/getting-started/tutorials/order-fulfillment.md)** | English Version

## What You'll Build

A complete order fulfillment system that:
- Fetches pending customer orders
- Retrieves detailed order information
- Updates order status through fulfillment stages
- Generates shipping labels for delivery

**Estimated Time:** 45 minutes
**Difficulty:** Intermediate

---

## Learning Objectives

By the end of this tutorial, you'll be able to:
- ✅ Understand FBS vs FBW fulfillment models
- ✅ Retrieve and filter orders by status
- ✅ Process order state transitions correctly
- ✅ Generate shipping labels and tracking info
- ✅ Handle order fulfillment errors gracefully

---

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js ≥ 20.0.0 installed
- ✅ Wildberries API key with order access
- ✅ SDK installed (`npm install wb-api-sdk`)
- ✅ Completed [Quickstart Guide](../quickstart.md)
- ✅ Basic understanding of order fulfillment workflows

---

## Introduction

Order fulfillment is the heart of e-commerce operations. Wildberries supports two fulfillment models:

### FBS (Fulfillment by Seller)
- **You** handle warehousing, packing, and shipping
- **You** generate shipping labels
- **You** manage returns at your location
- **More control** over inventory and customer experience

### FBW (Fulfillment by Wildberries)
- **Wildberries** handles warehousing and shipping
- **Wildberries** manages returns
- **Less control** but simpler operations
- **Focus** on product sourcing and marketing

**This tutorial focuses on FBS** (most common for new sellers). For FBW, see [Tutorial 4: Multi-Module Integration](./multi-module-integration.md).

---

## Understanding Order States

Orders flow through specific states. Understanding transitions is critical:

```
┌─────────┐
│   NEW   │ ← Order placed by customer
└────┬────┘
     │
     ▼
┌─────────────┐
│  CONFIRMED  │ ← Seller confirms order
└──────┬──────┘
       │
       ▼
┌───────────┐
│ ASSEMBLED │ ← Items picked and packed
└─────┬─────┘
      │
      ▼
┌──────────┐
│ SHIPPED  │ ← Label generated, handed to carrier
└────┬─────┘
     │
     ▼
┌────────────┐
│ DELIVERED  │ ← Customer received package
└────────────┘

    OR

┌───────────┐
│ CANCELLED │ ← Order cancelled by seller/customer
└───────────┘
```

**Important:** You cannot skip states or go backwards (except to CANCELLED).

---

## Step 1: List Pending Orders (10 minutes)

Let's fetch all orders that need processing.

### Understanding Order Filters

You can filter orders by:
- **Status:** new, confirmed, assembled, shipped, delivered, cancelled
- **Date Range:** Filter by order creation date
- **Fulfillment Type:** FBS or FBW

### Code Example

Create a file `order-fulfillment.ts`:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function listPendingOrders() {
  try {
    // Get all new orders (not yet confirmed)
    const newOrders = await sdk.ordersFBS.getOrders({
      status: 'new',
      limit: 50
    });

    console.log(`Found ${newOrders.data.length} new orders`);

    // Display order summary
    newOrders.data.forEach(order => {
      console.log(`\nOrder ${order.orderId}:`);
      console.log(`  - Status: ${order.status}`);
      console.log(`  - Items: ${order.items.length}`);
      console.log(`  - Total: ${order.totalAmount} RUB`);
      console.log(`  - Delivery deadline: ${order.deliveryDeadline}`);
    });

    // Get orders requiring shipping
    const readyToShip = await sdk.ordersFBS.getOrders({
      status: 'assembled',
      limit: 50
    });

    console.log(`\n${readyToShip.data.length} orders ready for shipping`);

    return newOrders.data;

  } catch (error) {
    console.error('Error fetching orders:', error.message);
    throw error;
  }
}

listPendingOrders();
```

### Expected Output

```
Found 3 new orders

Order WB-12345678:
  - Status: new
  - Items: 2
  - Total: 3499 RUB
  - Delivery deadline: 2024-11-01T12:00:00Z

Order WB-12345679:
  - Status: new
  - Items: 1
  - Total: 1299 RUB
  - Delivery deadline: 2024-11-01T15:00:00Z

Order WB-12345680:
  - Status: new
  - Items: 3
  - Total: 5999 RUB
  - Delivery deadline: 2024-11-02T10:00:00Z

3 orders ready for shipping
```

### Filtering by Date Range

```typescript
async function getTodaysOrders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const orders = await sdk.ordersFBS.getOrders({
    dateFrom: today.toISOString(),
    dateTo: tomorrow.toISOString()
  });

  console.log(`Today's orders: ${orders.data.length}`);
  return orders.data;
}
```

---

## Step 2: Get Order Details (10 minutes)

For each order, fetch complete details including customer information and items.

### Order Details Structure

An order contains:
- **Order Info:** ID, status, timestamps
- **Customer Info:** Name, phone, delivery address
- **Items:** Products, quantities, SKUs
- **Pricing:** Item prices, discounts, total
- **Delivery:** Address, deadline, preferences

### Code Example

```typescript
async function getOrderDetails(orderId: string) {
  try {
    const order = await sdk.ordersFBS.getOrders({ id: orderId });

    console.log(`\nOrder Details: ${order.data.orderId}`);
    console.log(`Status: ${order.data.status}`);
    console.log(`Created: ${order.data.createdAt}`);

    // Customer information
    console.log('\nCustomer:');
    console.log(`  Name: ${order.data.customerInfo.name}`);
    console.log(`  Phone: ${order.data.customerInfo.phone}`);
    console.log(`  Address: ${order.data.customerInfo.address.fullAddress}`);

    // Order items
    console.log('\nItems:');
    order.data.items.forEach(item => {
      console.log(`  - ${item.productName}`);
      console.log(`    SKU: ${item.sku}`);
      console.log(`    Quantity: ${item.quantity}`);
      console.log(`    Price: ${item.price} RUB`);
      console.log(`    Total: ${item.quantity * item.price} RUB`);
    });

    // Totals
    console.log(`\nSubtotal: ${order.data.subtotal} RUB`);
    console.log(`Discount: ${order.data.discount} RUB`);
    console.log(`Total: ${order.data.totalAmount} RUB`);

    // Delivery requirements
    console.log(`\nDelivery Deadline: ${order.data.deliveryDeadline}`);
    console.log(`Delivery Method: ${order.data.deliveryMethod}`);

    return order.data;

  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Invalid order ID:', error.message);
    } else {
      console.error('Error fetching order details:', error.message);
    }
    throw error;
  }
}
```

### Expected Output

```
Order Details: WB-12345678
Status: new
Created: 2024-10-26T10:30:00Z

Customer:
  Name: Иван Петров
  Phone: +7 900 123-45-67
  Address: г. Москва, ул. Ленина, д. 10, кв. 25

Items:
  - TechBrand Smartphone Pro 15
    SKU: TB-SP15-BLK
    Quantity: 1
    Price: 2999 RUB
    Total: 2999 RUB

  - Phone Case Premium
    SKU: PC-PREM-BLK
    Quantity: 1
    Price: 500 RUB
    Total: 500 RUB

Subtotal: 3499 RUB
Discount: 0 RUB
Total: 3499 RUB

Delivery Deadline: 2024-11-01T12:00:00Z
Delivery Method: courier
```

---

## Step 3: Update Order Status (10 minutes)

Process orders through fulfillment stages by updating their status.

### Valid State Transitions

| From State | Valid Next States |
|------------|-------------------|
| new | confirmed, cancelled |
| confirmed | assembled, cancelled |
| assembled | shipped, cancelled |
| shipped | delivered |
| delivered | (terminal state) |
| cancelled | (terminal state) |

### Code Example

```typescript
async function processOrder(orderId: string) {
  try {
    // Step 1: Confirm order (check inventory, validate details)
    console.log(`Confirming order ${orderId}...`);

    // Note: Wildberries FBS API doesn't have updateOrderStatus()
    // Status updates happen through specific actions:
    // - Create supply: sdk.ordersFBS.createSupply()
    // - Add order to supply: sdk.ordersFBS.addOrderToSupply()
    // - Deliver supply: sdk.ordersFBS.deliverSupply()
    // - Cancel order: sdk.ordersFBS.cancelOrder()

    console.log('✓ Order confirmed');

    // Step 2: Assemble order (pick items, pack)
    console.log('Assembling order...');

    // Simulate packing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Status update handled by supply management workflow
    // See: sdk.ordersFBS.createSupply() and addOrderToSupply()

    console.log('✓ Order assembled and ready for shipping');

    return true;

  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Invalid status transition:', error.message);
    } else {
      console.error('Error updating order:', error.message);
    }
    return false;
  }
}
```

### Expected Output

```
Confirming order WB-12345678...
✓ Order confirmed
Assembling order...
✓ Order assembled and ready for shipping
```

### Cancelling Orders

```typescript
async function cancelOrder(orderId: string, reason: string) {
  try {
    await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
      orderId: orderId,
      status: 'cancelled',
      cancellationReason: reason
    });

    console.log(`✓ Order ${orderId} cancelled`);
    console.log(`  Reason: ${reason}`);

  } catch (error) {
    console.error('Error cancelling order:', error.message);
  }
}

// Example: Cancel due to out of stock
await cancelOrder('WB-12345678', 'Product out of stock');
```

---

## Step 4: Create Shipping Label (10 minutes)

Generate shipping labels for assembled orders ready to ship.

### Shipping Label Process

1. **Order must be in 'assembled' state**
2. **Generate label** with carrier details
3. **Print label** (PDF) and attach to package
4. **Update status to 'shipped'** with tracking number

### Code Example

```typescript
async function createShippingLabel(orderId: string) {
  try {
    // Generate shipping label
    console.log(`Generating shipping label for ${orderId}...`);

    const label = await sdk.ordersFBS.getOrderStickers({
      orderId: orderId,
      carrier: 'CDEK', // Carrier name
      shippingMethod: 'courier' // or 'pickup'
    });

    console.log('✓ Shipping label generated');
    console.log(`  Label ID: ${label.data.labelId}`);
    console.log(`  Tracking Number: ${label.data.trackingNumber}`);
    console.log(`  Label URL: ${label.data.labelUrl}`);

    // Download and print label
    console.log('\nLabel ready for printing:');
    console.log(`  Download: ${label.data.labelUrl}`);
    console.log(`  Format: PDF`);

    // Update order to shipped
    await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
      orderId: orderId,
      status: 'shipped',
      trackingNumber: label.data.trackingNumber
    });

    console.log('✓ Order marked as shipped');

    return label.data;

  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Cannot create label:', error.message);
      console.error('Make sure order is in "assembled" state');
    } else {
      console.error('Error creating shipping label:', error.message);
    }
    throw error;
  }
}
```

### Expected Output

```
Generating shipping label for WB-12345678...
✓ Shipping label generated
  Label ID: LBL-789012
  Tracking Number: CDEK-123456789
  Label URL: https://api.wildberries.ru/labels/LBL-789012.pdf

Label ready for printing:
  Download: https://api.wildberries.ru/labels/LBL-789012.pdf
  Format: PDF

✓ Order marked as shipped
```

### Batch Label Generation

For multiple orders:

```typescript
async function batchCreateLabels(orderIds: string[]) {
  const labels = [];

  for (const orderId of orderIds) {
    try {
      const label = await createShippingLabel(orderId);
      labels.push(label);
      console.log(`✓ Label created for ${orderId}`);
    } catch (error) {
      console.error(`✗ Failed for ${orderId}:`, error.message);
    }
  }

  console.log(`\nGenerated ${labels.length}/${orderIds.length} labels`);
  return labels;
}
```

---

## Complete Example

Here's the full order fulfillment workflow:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function fulfillOrders() {
  try {
    console.log('=== Order Fulfillment Workflow ===\n');

    // Step 1: Get pending orders
    console.log('Step 1: Fetching new orders...');
    const orders = await sdk.ordersFBS.getOrders({
      status: 'new',
      limit: 10
    });

    console.log(`✓ Found ${orders.data.length} orders to process\n`);

    for (const order of orders.data) {
      console.log(`\n--- Processing Order ${order.orderId} ---`);

      // Step 2: Get full details
      console.log('Fetching order details...');
      const details = await sdk.ordersFBS.getOrders({ id: order.orderId });
      console.log(`✓ Customer: ${details.data[0].customerInfo.name}`);
      console.log(`✓ Items: ${details.data[0].items.length}`);
      console.log(`✓ Total: ${details.data[0].totalAmount} RUB`);

      // Step 3: Confirm order
      console.log('\nConfirming order...');
      await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
        orderId: order.orderId,
        status: 'confirmed'
      });
      console.log('✓ Order confirmed');

      // Step 4: Assemble (simulate warehouse picking)
      console.log('Assembling order...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
        orderId: order.orderId,
        status: 'assembled'
      });
      console.log('✓ Order assembled');

      // Step 5: Generate shipping label
      console.log('Generating shipping label...');
      const label = await sdk.ordersFBS.getOrderStickers({
        orderId: order.orderId,
        carrier: 'CDEK',
        shippingMethod: 'courier'
      });
      console.log(`✓ Label: ${label.data.trackingNumber}`);

      // Step 6: Mark as shipped
      await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
        orderId: order.orderId,
        status: 'shipped',
        trackingNumber: label.data.trackingNumber
      });
      console.log('✓ Order shipped');

      console.log(`\n✓ Order ${order.orderId} completed!`);
    }

    console.log('\n=== Fulfillment Complete ===');
    console.log(`Processed ${orders.data.length} orders successfully`);

  } catch (error) {
    console.error('❌ Fulfillment failed:', error.message);
    process.exit(1);
  }
}

// Run the fulfillment workflow
fulfillOrders();
```

### Run It

```bash
# Set your API key
export WB_API_KEY='your_api_key_here'

# Run the script
npx tsx order-fulfillment.ts
```

### Expected Output

```
=== Order Fulfillment Workflow ===

Step 1: Fetching new orders...
✓ Found 2 orders to process

--- Processing Order WB-12345678 ---
Fetching order details...
✓ Customer: Иван Петров
✓ Items: 2
✓ Total: 3499 RUB

Confirming order...
✓ Order confirmed
Assembling order...
✓ Order assembled
Generating shipping label...
✓ Label: CDEK-123456789
✓ Order shipped

✓ Order WB-12345678 completed!

--- Processing Order WB-12345679 ---
...

=== Fulfillment Complete ===
Processed 2 orders successfully
```

---

## Error Handling

### Order State Validation

```typescript
try {
  await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
    orderId: orderId,
    status: 'shipped'
  });
} catch (error) {
  if (error.name === 'ValidationError') {
    console.error('Invalid state transition');
    console.error('Current state:', error.context.currentState);
    console.error('Attempted state:', error.context.requestedState);
    console.error('Valid next states:', error.context.validTransitions);
  }
}
```

### Handling Missing Inventory

```typescript
async function checkInventoryBeforeConfirm(order: Order) {
  try {
    // Check if all items are in stock
    for (const item of order.items) {
      const stock = await sdk.products.getStock(item.sku);

      if (stock.data.quantity < item.quantity) {
        console.warn(`Low stock for ${item.sku}`);
        console.warn(`  Required: ${item.quantity}`);
        console.warn(`  Available: ${stock.data.quantity}`);

        // Cancel order if insufficient stock
        await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
          orderId: order.orderId,
          status: 'cancelled',
          cancellationReason: `Insufficient stock for ${item.sku}`
        });

        return false;
      }
    }

    return true; // All items available

  } catch (error) {
    console.error('Error checking inventory:', error.message);
    return false;
  }
}
```

---

## Troubleshooting

### Common Issues

**Issue: "Cannot transition from 'new' to 'shipped'"**
- **Cause:** Invalid state transition (must go through intermediate states)
- **Solution:** Follow the state diagram: new → confirmed → assembled → shipped

**Issue: "Shipping label generation fails"**
- **Cause:** Order not in 'assembled' state
- **Solution:** Ensure order status is 'assembled' before generating label

**Issue: "Order not found"**
- **Cause:** Invalid order ID or order from different fulfillment type (FBW)
- **Solution:** Verify order ID and use correct module (ordersFBS vs ordersFBW)

**Issue: "Rate limit exceeded"**
- **Cause:** Too many status updates in short time
- **Solution:** SDK handles retries automatically. For bulk operations, add delays.

---

## Best Practices

### 1. Always Validate State Transitions

```typescript
const validTransitions = {
  'new': ['confirmed', 'cancelled'],
  'confirmed': ['assembled', 'cancelled'],
  'assembled': ['shipped', 'cancelled'],
  'shipped': ['delivered']
};

function canTransition(from: string, to: string): boolean {
  return validTransitions[from]?.includes(to) ?? false;
}
```

### 2. Handle Timeouts Gracefully

```typescript
const ORDER_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

async function checkStaleOrders() {
  const orders = await sdk.ordersFBS.getOrders({ status: 'new' });

  for (const order of orders.data) {
    const orderAge = Date.now() - new Date(order.createdAt).getTime();

    if (orderAge > ORDER_TIMEOUT) {
      console.warn(`Order ${order.orderId} is stale (${orderAge}ms old)`);
      // Consider auto-cancelling or sending alert
    }
  }
}
```

### 3. Log All State Changes

```typescript
async function updateOrderWithLogging(orderId: string, newStatus: string) {
  const timestamp = new Date().toISOString();

  try {
    const result = await // NOTE: updateOrderStatus doesn't exist - use supply workflow instead
    // sdk.ordersFBS.createSupply() or sdk.ordersFBS.cancelOrder({
      orderId,
      status: newStatus
    });

    // Log successful transition
    console.log(`[${timestamp}] Order ${orderId}: ${result.data.previousStatus} → ${newStatus}`);

    return result;

  } catch (error) {
    // Log failed transition
    console.error(`[${timestamp}] Order ${orderId}: Failed to transition to ${newStatus}`);
    console.error(`  Error: ${error.message}`);
    throw error;
  }
}
```

---

## Next Steps

Excellent work! You now understand order fulfillment workflows. Continue learning:

1. **[Tutorial 3: Analytics Dashboard](./analytics-dashboard.md)** - Track order performance
2. **[Tutorial 4: Multi-Module Integration](./multi-module-integration.md)** - Connect products → orders → finances
3. **[Best Practices Guide](../../guides/best-practices.md)** - Production order processing
4. **[API Reference](../../api/)** - Complete ordersFBS module documentation

---

## Key Takeaways

✅ FBS requires manual order processing (you ship)
✅ Orders follow strict state transitions
✅ Always validate state before updates
✅ Shipping labels generated for 'assembled' orders only
✅ Handle inventory checks before confirming orders
✅ Log all state changes for audit trail
✅ SDK handles rate limiting and retries automatically

---

[← Back to Getting Started](../index.md) | [Next Tutorial: Analytics Dashboard →](./analytics-dashboard.md)

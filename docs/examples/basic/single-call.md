# Single API Call

Making basic API requests with the SDK.

## Description

This example demonstrates how to make single API calls to retrieve data from the Wildberries API, including fetching product categories, checking balance, and getting new orders.

## Requirements

- SDK version 2.0.0+
- Valid Wildberries API key

## Code Examples

### Get Product Categories

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get all parent categories
async function getCategories() {
  const categories = await sdk.products.getParentAll();

  console.log('Total categories:', categories.data?.length);

  // Display first 5 categories
  categories.data?.slice(0, 5).forEach(cat => {
    console.log(`- ${cat.name} (ID: ${cat.id})`);
  });

  return categories;
}

getCategories();
```

**Expected Output:**
```
Total categories: 47
- Electronics (ID: 479)
- Household chemicals (ID: 513)
- Clothing (ID: 621)
- Shoes (ID: 698)
- Accessories (ID: 721)
```

### Check Account Balance

```typescript
async function checkBalance() {
  const balance = await sdk.finances.getBalance();

  console.log('Available for withdrawal:', balance.for_withdraw, balance.currency);
  console.log('Total balance:', balance.balance, balance.currency);

  return balance;
}

checkBalance();
```

**Expected Output:**
```
Available for withdrawal: 125000.50 RUB
Total balance: 150000.00 RUB
```

### Get New Orders (FBS)

```typescript
async function getOrdersNew() {
  const orders = await sdk.ordersFBS.getOrdersNew();

  console.log('New orders count:', orders.orders?.length ?? 0);

  orders.orders?.forEach(order => {
    console.log(`Order #${order.id}:`);
    console.log(`  - Article: ${order.article}`);
    console.log(`  - Price: ${order.price / 100} RUB`);  // Price in kopeks
    console.log(`  - Created: ${new Date(order.createdAt).toLocaleString()}`);
  });

  return orders;
}

getOrdersNew();
```

### Get Commission Tariffs

```typescript
async function getTariffs() {
  const commissions = await sdk.tariffs.getTariffsCommission();

  console.log('Commission rates by category:');
  commissions.report?.slice(0, 5).forEach(item => {
    console.log(`- ${item.subjectName}: ${item.kgvpMarketplace}%`);
  });

  return commissions;
}

getTariffs();
```

### Get Warehouses (FBW)

```typescript
async function getWarehouses() {
  const warehouses = await sdk.ordersFBW.warehouses();

  console.log('Available warehouses:');
  warehouses.forEach(wh => {
    console.log(`- ${wh.name} (ID: ${wh.ID})`);
  });

  return warehouses;
}

getWarehouses();
```

## Type Safety

The SDK provides full TypeScript support:

```typescript
import {
  WildberriesSDK,
  type GetParentAllResponse,
  type BalanceResponse
} from 'daytona-wildberries-typescript-sdk';

// Types are automatically inferred
const categories: GetParentAllResponse = await sdk.products.getParentAll();

// IDE autocomplete works for all properties
categories.data?.forEach(cat => {
  // cat.id, cat.name, cat.isVisible are all typed
});
```

## Related Materials

- [API Reference: ProductsModule](/api/classes/ProductsModule)
- [API Reference: FinancesModule](/api/classes/FinancesModule)
- [API Reference: OrdersFbsModule](/api/classes/OrdersFbsModule)
- [Error Handling](../intermediate/error-handling.md)

---

[Back to Examples](../index.md) | [Previous: Hello World](hello-world.md) | [Next: Error Handling](../intermediate/error-handling.md)

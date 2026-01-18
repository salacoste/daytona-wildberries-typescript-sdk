---
title: Quickstart Guide
description: Get started with the Wildberries SDK in 5 minutes - install, initialize, and make your first API call
layout: doc
---

# Quickstart Guide

Get started with the Wildberries TypeScript SDK in 5 minutes.

> **[Русская версия](../ru/getting-started/quickstart.md)** | English Version

## What You'll Learn

- Install the SDK
- Initialize with your API key
- Make your first API call
- Handle basic errors

**Estimated Time:** 5 minutes

---

## Prerequisites

- Node.js ≥ 20.0.0
- npm ≥ 10.0.0
- Wildberries API key ([get one here](https://seller.wildberries.ru/))

---

## Step 1: Installation (1 minute)

Install the SDK via npm:

```bash
npm install daytona-wildberries-typescript-sdk
```

Verify installation:

```bash
npm list daytona-wildberries-typescript-sdk
```

---

## Step 2: Initialize SDK (1 minute)

Create a new file `index.ts` and initialize the SDK:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize with your API key
const sdk = new WildberriesSDK({
  apiKey: 'YOUR_API_KEY_HERE' // Replace with your actual key
});

console.log('SDK initialized successfully!');
```

**API Reference:** See [WildberriesSDK](/api/classes/WildberriesSDK) for complete initialization options and [SDKConfig](/api/interfaces/SDKConfig) for all configuration parameters.

---

## Step 3: Make Your First API Call (2 minutes)

Let's fetch product categories:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY // Use environment variable
});

async function main() {
  try {
    // Fetch parent categories
    const categories = await sdk.products.getParentAll();

    console.log('Categories:', categories.data);
    console.log('Success! 🎉');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

**Run it:**

```bash
# Set your API key as environment variable
export WB_API_KEY='your_api_key_here'

# Run the script
npx tsx index.ts
```

**Expected Output:**

```
Categories: [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Household chemicals' },
  ...
]
Success! 🎉
```

**API Reference:** See [ProductsModule](/api/classes/ProductsModule) for all product management methods including `getParentAll()`, `createProduct()`, and `updatePricing()`.

---

## Common First-Time Issues

**Issue: "Authentication error"**
- ✅ **Solution**: Verify your API key is correct and active

**Issue: "Rate limit exceeded"**
- ✅ **Solution**: SDK automatically handles rate limits with retries

**Issue: "Network timeout"**
- ✅ **Solution**: Check your internet connection and Wildberries API status

---

## Next Steps

Now that you've made your first API call, explore:

1. **[Tutorials](/getting-started/tutorials/)** - Step-by-step guides for common workflows
2. **[API Reference](/api/)** - Complete method documentation
   - [All SDK Modules](/api/#sdk-modules) - 11 specialized modules
   - [WildberriesSDK](/api/classes/WildberriesSDK) - Main SDK class
   - [ProductsModule](/api/classes/ProductsModule) - Product management
   - [OrdersFBSModule](/api/classes/OrdersFBSModule) - Order fulfillment
   - [FinancesModule](/api/classes/FinancesModule) - Financial data
   - [AnalyticsModule](/api/classes/AnalyticsModule) - Performance metrics
3. **[Configuration Guide](/guides/configuration)** - Configure SDK for your environment
4. **[Best Practices](/guides/best-practices)** - Production-ready patterns and error handling

---

**Congratulations! You're ready to build with the Wildberries API.** 🚀

[← Back to Getting Started](/getting-started/) | [Documentation Home](/)

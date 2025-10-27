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
npm install wb-api-sdk
```

Verify installation:

```bash
npm list wb-api-sdk
```

---

## Step 2: Initialize SDK (1 minute)

Create a new file `index.ts` and initialize the SDK:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

// Initialize with your API key
const sdk = new WildberriesSDK({
  apiKey: 'YOUR_API_KEY_HERE' // Replace with your actual key
});

console.log('SDK initialized successfully!');
```

---

## Step 3: Make Your First API Call (2 minutes)

Let's fetch product categories:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

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

1. **[Tutorials](tutorials/)** - Step-by-step guides for common workflows
2. **[API Reference](../api/)** - Complete method documentation
3. **[Examples](../examples/)** - Working code samples
4. **[Best Practices](../guides/best-practices.md)** - Production-ready patterns

---

**Congratulations! You're ready to build with the Wildberries API.** 🚀

[← Back to Getting Started](index.md) | [Documentation Home](../index.md)

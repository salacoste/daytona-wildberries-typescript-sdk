---
title: Mandatory Product Characteristics
description: Guide for the WB API change requiring mandatory characteristics when creating product cards (enforcement April 29, 2026)
---

# Mandatory Product Characteristics

Starting **April 29, 2026**, Wildberries requires mandatory characteristics for product cards in select categories. Cards created without these characteristics will be rejected by the API.

## What Changed

The `GET /content/v2/object/charcs/{subjectId}` endpoint now returns an `isRequiredForCreate` boolean field. When `true`, the characteristic **must** be included in card creation and update requests.

The SDK added the `SubjectCharacteristic` interface (v3.9.0) with full type support for this field.

## Affected Categories

| Category | subjectId | Russian Name |
|----------|-----------|--------------|
| Flash Drives | 1260 | Флешки памяти |
| Fitness Bracelets | 1514 | Фитнес-браслеты |
| Hair Straighteners | 2314 | Выпрямители волос |
| Blenders | 614 | Блендеры |
| Nettops & Mini PCs | 8992 | Неттопы и Мини ПК |
| Photo Frames | 28 | Фоторамки |
| Calculators | 977 | Калькуляторы |
| Lids | 819 | Крышки |
| Pillowcases | 605 | Наволочки |
| Cleaning Wipes | 1202 | Салфетки для уборки |

::: tip
This list may expand over time. Always check `isRequiredForCreate` for your specific category before creating cards.
:::

## Checking Mandatory Characteristics

Use `getObjectCharc()` to fetch characteristics for a category and filter by `isRequiredForCreate`:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { SubjectCharacteristic } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Fetch characteristics for Flash Drives (subjectId: 1260)
const result = await sdk.products.getObjectCharc(1260);

// Filter mandatory characteristics
const mandatory: SubjectCharacteristic[] = (result.data ?? []).filter(
  (c) => c.isRequiredForCreate === true
);

console.log(`Found ${mandatory.length} mandatory characteristics:`);
for (const c of mandatory) {
  console.log(`  - ${c.name} (ID: ${c.charcID}, type: ${c.charcType})`);
}
```

## Creating Cards with Required Characteristics

Once you know which characteristics are mandatory, include them in your card creation request:

```typescript
import type { CardCharacteristicInput } from 'daytona-wildberries-typescript-sdk';

// 1. Fetch mandatory characteristics for the category
const charcsResult = await sdk.products.getObjectCharc(1260);
const mandatory = (charcsResult.data ?? []).filter(
  (c) => c.isRequiredForCreate === true
);

// 2. Build characteristics array with required values
const characteristics: CardCharacteristicInput[] = mandatory.map((c) => ({
  id: c.charcID!,
  value: getValueForCharacteristic(c), // Your business logic
}));

// 3. Create the product card
const response = await sdk.products.createCardsUpload([{
  subjectID: 1260,
  variants: [{
    vendorCode: 'FLASH-USB-64GB',
    title: '64GB USB Flash Drive',
    characteristics,
    sizes: [{ techSize: 'one-size', wbSize: '', skus: ['1234567890123'] }],
  }],
}]);

console.log('Card created:', response);

// Helper: map characteristic metadata to appropriate value
function getValueForCharacteristic(c: SubjectCharacteristic): string | number | string[] {
  // Your logic to determine the value based on characteristic type and your product data
  switch (c.charcType) {
    case 0: return 'text value';       // String
    case 1: return 64;                 // Number (e.g., memory size in GB)
    case 4: return ['value1', 'value2']; // Array
    default: return '';
  }
}
```

## Error Handling

If you omit a mandatory characteristic, the WB API will reject the request. Handle this in your error flow:

```typescript
import { ValidationError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.products.createCardsUpload([{ /* ... */ }]);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Card rejected — likely missing mandatory characteristics');
    console.error('Details:', error.message);
    // Re-fetch mandatory charcs and check what's missing
  }
  throw error;
}
```

## Migration Checklist

Use this checklist to prepare before the April 29 deadline:

- [ ] **Identify affected categories** — Check if any of your product categories are in the list above
- [ ] **Fetch characteristics** — Call `getObjectCharc(subjectId)` for each affected category
- [ ] **Filter mandatory** — Find all characteristics where `isRequiredForCreate === true`
- [ ] **Update card creation code** — Ensure all mandatory characteristics are included in create/update requests
- [ ] **Update SDK** — Upgrade to `daytona-wildberries-typescript-sdk@^3.9.0` for `SubjectCharacteristic` type support
- [ ] **Test** — Create test cards in affected categories to verify before the deadline

## Related Resources

- [Working with Product Cards](/guides/working-with-product-cards) — Complete product card management guide
- [API Reference: ProductsModule](/api/classes/ProductsModule) — Full method documentation
- [WB API: Product Characteristics](https://dev.wildberries.ru/docs/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki) — Official WB documentation

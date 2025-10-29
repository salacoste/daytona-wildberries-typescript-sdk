[Wildberries API TypeScript SDK](../modules.md) / UpdateProductRequest

# Interface: UpdateProductRequest

Defined in: [types/products.types.ts:759](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L759)

Request body for updating existing product cards

**CRITICAL:** Card is completely rewritten - must send ALL parameters (even unchanged ones).
Missing fields will be removed from the product.

**Limits:**
- Max 3000 cards per request
- Max 10MB request size

**Cannot edit:** Barcodes, photos, video, tags (use separate endpoints)
**Can add:** Additional barcodes to existing products

**Rate limit:** 10 req/min, 6 second interval

## Example

```typescript
// GOOD: Send all fields
const product = await getProductCard(12345);
const update: UpdateProductRequest = {
  ...product,
  title: 'New Title'  // Only this changes, rest preserved
};

// BAD: Only send changed field - other fields will be lost!
const badUpdate: UpdateProductRequest = {
  nmID: 12345,
  vendorCode: 'VENDOR-001',
  sizes: [],
  title: 'New Title'
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Required: Wildberries article ID | [types/products.types.ts:761](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L761) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Required: Seller's article ID | [types/products.types.ts:763](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L763) |
| <a id="sizes"></a> `sizes` | [`UpdateProductSize`](UpdateProductSize.md)[] | Required: Size array (can be empty for non-sized products) | [types/products.types.ts:765](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L765) |
| <a id="brand"></a> `brand?` | `string` | Brand name | [types/products.types.ts:767](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L767) |
| <a id="title"></a> `title?` | `string` | Product title (max 60 characters) | [types/products.types.ts:769](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L769) |
| <a id="description"></a> `description?` | `string` | Product description (1000-5000 characters) | [types/products.types.ts:771](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L771) |
| <a id="dimensions"></a> `dimensions?` | [`ProductDimensions`](ProductDimensions.md) | Product dimensions and weight | [types/products.types.ts:773](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L773) |
| <a id="characteristics"></a> `characteristics?` | [`ProductCharacteristic`](ProductCharacteristic.md)[] | Product characteristics/attributes | [types/products.types.ts:775](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L775) |

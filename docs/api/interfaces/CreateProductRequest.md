[Wildberries API TypeScript SDK](../modules.md) / CreateProductRequest

# Interface: CreateProductRequest

Defined in: [types/products.types.ts:719](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L719)

Request body for creating new product cards

Creates product cards with descriptions and characteristics.
Async processing - check error list if 200 OK but some cards fail.

**Limits:**
- Max 100 unified cards (imtID)
- Max 30 cards each
- Max 10MB request size

**Rate limit:** 10 req/min, 6 second interval

## Example

```typescript
const request: CreateProductRequest = {
  subjectID: 105,  // Category ID
  variants: [{
    vendorCode: 'VENDOR-001',
    brand: 'My Brand',
    title: 'Example Product',
    description: 'Detailed description...',
    dimensions: {
      length: 10,
      width: 5,
      height: 2,
      weightBrutto: 0.5
    },
    sizes: [{
      techSize: 'XL',
      wbSize: '52',
      skus: ['1234567890123']
    }],
    characteristics: [
      { id: 1, value: ['Red'] },
      { id: 2, value: ['Cotton'] }
    ]
  }]
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="subjectid"></a> `subjectID` | `number` | Required: Category/subject ID from getCategories | [types/products.types.ts:721](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L721) |
| <a id="variants"></a> `variants` | [`ProductVariant`](ProductVariant.md)[] | Required: Array of product variants (max 30 per imtID) | [types/products.types.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L723) |

[Wildberries API TypeScript SDK](../modules.md) / PricingUpdate

# Interface: PricingUpdate

Defined in: [types/products.types.ts:1077](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1077)

Pricing update for single product

**Constraints:**
- Prices must be integers (whole numbers only)
- Discounts: 0-99%
- Price and discount cannot both be empty

**Quarantine Warning:**
If new price with discount is ≥3x lower than old price,
it goes to quarantine and old price continues.

## Example

```typescript
const update: PricingUpdate = {
  nmID: 12345,
  price: 2999,      // Integer only! (no decimals)
  discount: 15      // 15% discount
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Wildberries article ID | [types/products.types.ts:1079](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1079) |
| <a id="price"></a> `price?` | `number` | Price in rubles (integer only!) | [types/products.types.ts:1081](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1081) |
| <a id="discount"></a> `discount?` | `number` | Discount percentage (0-99) | [types/products.types.ts:1083](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1083) |

[Wildberries API TypeScript SDK](../modules.md) / PricingInfo

# Interface: PricingInfo

Defined in: [types/products.types.ts:1153](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1153)

Current pricing information for a product

Returned by getPricing() method.

## Example

```typescript
const pricing: PricingInfo = {
  nmID: 12345,
  price: 2999,
  discount: 15,
  promoCode: 0,
  wbClubDiscount: 5,
  currency: 'RUB'
};

// Final price calculation:
// base: 2999 RUB
// with 15% discount: 2549.15 RUB
// with 5% WB Club: 2421.69 RUB
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Wildberries article ID | [types/products.types.ts:1155](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1155) |
| <a id="price"></a> `price` | `number` | Current price (before discounts) | [types/products.types.ts:1157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1157) |
| <a id="discount"></a> `discount` | `number` | Current seller discount (%) | [types/products.types.ts:1159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1159) |
| <a id="promocode"></a> `promoCode` | `number` | Promo code discount (%) | [types/products.types.ts:1161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1161) |
| <a id="wbclubdiscount"></a> `wbClubDiscount` | `number` | WB Club discount (%) | [types/products.types.ts:1163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1163) |
| <a id="currency"></a> `currency` | `string` | Currency code (usually RUB) | [types/products.types.ts:1165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L1165) |

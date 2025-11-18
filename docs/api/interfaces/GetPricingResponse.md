[Wildberries API TypeScript SDK](../modules.md) / GetPricingResponse

# Interface: GetPricingResponse

Defined in: [types/products.types.ts:1183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1183)

Response from getPricing() method

Contains pricing information for one or more products.

## Example

```typescript
const response: GetPricingResponse = {
  data: [
    { nmID: 12345, price: 2999, discount: 15, ... },
    { nmID: 67890, price: 1499, discount: 10, ... }
  ]
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`PricingInfo`](PricingInfo.md)[] | Array of pricing information | [types/products.types.ts:1185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1185) |

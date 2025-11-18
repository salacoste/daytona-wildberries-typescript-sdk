[Wildberries API TypeScript SDK](../modules.md) / PricingUpdateRequest

# Interface: PricingUpdateRequest

Defined in: [types/products.types.ts:1106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1106)

Request body for bulk pricing updates

**Async Processing:**
Returns task ID immediately. Poll getPricingTaskStatus() to verify.
200 OK means task queued, NOT that prices updated.

**Limits:**
- Max 1000 products per request

## Example

```typescript
const request: PricingUpdateRequest = {
  data: [
    { nmID: 12345, price: 2999, discount: 15 },
    { nmID: 67890, price: 1499, discount: 10 }
  ]
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`PricingUpdate`](PricingUpdate.md)[] | Array of pricing updates (max 1000) | [types/products.types.ts:1108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L1108) |

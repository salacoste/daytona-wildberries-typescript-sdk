[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingPointsParams

# Interface: SupplyShippingPointsParams

Defined in: [types/orders-fbs.types.ts:1284](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1284)

Query parameters for GET /api/marketplace/v3/fbs/supplies/{supplyId}/shipping-points

## See

task-240

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with Record<string, unknown>

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="city"></a> `city` | `string` | Locality for shipping the supply, Cyrillic (e.g. 'Москва') | [types/orders-fbs.types.ts:1286](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1286) |
| <a id="officetype"></a> `officeType` | `string` | Shipping point types to return — comma-separated list of `sc`, `sw`, `pp`, `pfc`, `gpp` (e.g. 'sc,pp') | [types/orders-fbs.types.ts:1291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1291) |
| <a id="shippingdt"></a> `shippingDt?` | `string` | Planned supply shipping date (`YYYY-MM-DD`). Required for supplies of small-sized items (`cargoType: 1`) and dimensional cargo+ (`cargoType: 3`); when passed, only points that can ship the supply on that date are returned | [types/orders-fbs.types.ts:1297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1297) |

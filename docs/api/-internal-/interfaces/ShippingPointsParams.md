[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ShippingPointsParams

# Interface: ShippingPointsParams

Defined in: [types/orders-fbs.types.ts:1215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1215)

Query parameters for GET /api/marketplace/v3/fbs/shipping-points
Maps to the inline parameters of the shipping-points operation

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with Record<string, unknown>

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="city"></a> `city` | `string` | Locality for shipping the supply, Cyrillic (e.g. 'Москва') | [types/orders-fbs.types.ts:1217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1217) |
| <a id="cargotype"></a> `cargoType` | [`ShippingPointCargoType`](../type-aliases/ShippingPointCargoType.md) | Type of items the shipping point must accept: 1 small-sized, 2 ODC, 3 CD+ | [types/orders-fbs.types.ts:1219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1219) |

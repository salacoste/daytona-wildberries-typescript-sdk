[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ShippingPointsParams

# Interface: ShippingPointsParams

Defined in: [types/orders-fbs.types.ts:1143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1143)

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
| <a id="city"></a> `city` | `string` | Locality for shipping the supply, Cyrillic (e.g. 'Москва') | [types/orders-fbs.types.ts:1145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1145) |
| <a id="cargotype"></a> `cargoType` | [`ShippingPointCargoType`](../type-aliases/ShippingPointCargoType.md) | Type of items the shipping point must accept: 1 small-sized, 2 ODC, 3 CD+ | [types/orders-fbs.types.ts:1147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1147) |

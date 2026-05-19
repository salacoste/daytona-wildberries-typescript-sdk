[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrdersParams

# Interface: GetOrdersParams

Defined in: [types/orders-fbs.types.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-fbs.types.ts#L42)

Parameters for paginated order listing

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with Record<string, unknown>

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit` | `number` | Maximum number of items to return (1-1000) | [types/orders-fbs.types.ts:44](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-fbs.types.ts#L44) |
| <a id="next"></a> `next` | `number` | Pagination cursor; set to 0 for the first request | [types/orders-fbs.types.ts:46](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-fbs.types.ts#L46) |
| <a id="datefrom"></a> `dateFrom?` | `number` | Start of date range (Unix timestamp) | [types/orders-fbs.types.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-fbs.types.ts#L48) |
| <a id="dateto"></a> `dateTo?` | `number` | End of date range (Unix timestamp) | [types/orders-fbs.types.ts:50](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-fbs.types.ts#L50) |

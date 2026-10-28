[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ArchiveOrdersParams

# Interface: ArchiveOrdersParams

Defined in: [types/orders-fbs.types.ts:1026](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1026)

Query parameters for GET /api/marketplace/v3/fbs/orders/archive
Maps to swagger schema: v3.ArchiveOrdersParams

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with Record<string, unknown>

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="year"></a> `year` | `number` | Year of the archive period | [types/orders-fbs.types.ts:1028](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1028) |
| <a id="month"></a> `month` | `number` | Month of the archive period (1-12) | [types/orders-fbs.types.ts:1030](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1030) |
| <a id="next"></a> `next` | `number` | Pagination cursor (0 for the first page) | [types/orders-fbs.types.ts:1032](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1032) |
| <a id="limit"></a> `limit` | `number` | Maximum number of orders to return per page | [types/orders-fbs.types.ts:1034](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1034) |

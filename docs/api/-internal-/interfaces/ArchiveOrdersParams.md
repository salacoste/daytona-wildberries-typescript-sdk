[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ArchiveOrdersParams

# Interface: ArchiveOrdersParams

Defined in: [types/orders-fbs.types.ts:952](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L952)

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
| <a id="year"></a> `year` | `number` | Year of the archive period | [types/orders-fbs.types.ts:954](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L954) |
| <a id="month"></a> `month` | `number` | Month of the archive period (1-12) | [types/orders-fbs.types.ts:956](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L956) |
| <a id="next"></a> `next` | `number` | Pagination cursor (0 for the first page) | [types/orders-fbs.types.ts:958](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L958) |
| <a id="limit"></a> `limit` | `number` | Maximum number of orders to return per page | [types/orders-fbs.types.ts:960](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L960) |

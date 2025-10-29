[Wildberries API TypeScript SDK](../modules.md) / SupplyFilters

# Interface: SupplyFilters

Defined in: [types/orders-fbs.types.ts:283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L283)

Supply filter parameters

Used for filtering and paginating supply retrieval

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Number of supplies per page Range: 1-1000 Default: 1000 | [types/orders-fbs.types.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L289) |
| <a id="next"></a> `next?` | `number` | Pagination cursor 0 for first page, use 'next' from response for subsequent pages | [types/orders-fbs.types.ts:294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L294) |

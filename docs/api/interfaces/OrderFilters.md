[Wildberries API TypeScript SDK](../modules.md) / OrderFilters

# Interface: OrderFilters

Defined in: [types/orders-fbs.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L180)

Order filter parameters

Used for filtering and paginating order retrieval

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `number` | Start date for order filter (Unix timestamp) Default: 30 days ago | [types/orders-fbs.types.ts:185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L185) |
| <a id="dateto"></a> `dateTo?` | `number` | End date for order filter (Unix timestamp) Default: now | [types/orders-fbs.types.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L190) |
| <a id="limit"></a> `limit?` | `number` | Number of orders per page Range: 1-1000 Default: 1000 | [types/orders-fbs.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L196) |
| <a id="next"></a> `next?` | `number` | Pagination cursor 0 for first page, use 'next' from response for subsequent pages | [types/orders-fbs.types.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L201) |

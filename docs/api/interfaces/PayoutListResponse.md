[Wildberries API TypeScript SDK](../modules.md) / PayoutListResponse

# Interface: PayoutListResponse

Defined in: [types/finances.types.ts:483](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/finances.types.ts#L483)

Paginated payout list response
Response from getPayouts() with pagination metadata

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`Payout`](Payout.md)[] | Array of payout records | [types/finances.types.ts:485](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/finances.types.ts#L485) |
| <a id="pagination"></a> `pagination?` | \{ `total`: `number`; `offset`: `number`; `limit`: `number`; `hasMore`: `boolean`; \} | Pagination metadata | [types/finances.types.ts:487](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/finances.types.ts#L487) |
| `pagination.total` | `number` | Total number of payouts matching filters | [types/finances.types.ts:489](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/finances.types.ts#L489) |
| `pagination.offset` | `number` | Current page offset | [types/finances.types.ts:491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/finances.types.ts#L491) |
| `pagination.limit` | `number` | Number of results per page | [types/finances.types.ts:493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/finances.types.ts#L493) |
| `pagination.hasMore` | `boolean` | Whether more results are available | [types/finances.types.ts:495](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/finances.types.ts#L495) |

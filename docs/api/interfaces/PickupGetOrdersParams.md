[Wildberries API TypeScript SDK](../modules.md) / PickupGetOrdersParams

# Interface: PickupGetOrdersParams

Defined in: [types/in-store-pickup.types.ts:260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L260)

Query parameters for getting completed orders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit` | `number` | Maximum number of items to return (1-1000) | [types/in-store-pickup.types.ts:262](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L262) |
| <a id="next"></a> `next` | `number` | Pagination offset (0 for first request) | [types/in-store-pickup.types.ts:264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L264) |
| <a id="datefrom"></a> `dateFrom` | `number` | Period start date (Unix timestamp) | [types/in-store-pickup.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L266) |
| <a id="dateto"></a> `dateTo` | `number` | Period end date (Unix timestamp, max 30 days from dateFrom) | [types/in-store-pickup.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L268) |

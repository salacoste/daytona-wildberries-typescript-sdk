[Wildberries API TypeScript SDK](../modules.md) / StockHistoryEntry

# Interface: StockHistoryEntry

Defined in: [types/analytics.types.ts:505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L505)

Individual stock history entry

Represents a single stock level change event with complete context

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="timestamp"></a> `timestamp` | `string` | Timestamp of the stock change (ISO 8601) | [types/analytics.types.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L507) |
| <a id="previousstock"></a> `previousStock` | `number` | Stock level before this change | [types/analytics.types.ts:509](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L509) |
| <a id="newstock"></a> `newStock` | `number` | Stock level after this change | [types/analytics.types.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L511) |
| <a id="changeamount"></a> `changeAmount` | `number` | Amount of change (negative for reductions, positive for additions) | [types/analytics.types.ts:513](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L513) |
| <a id="reason"></a> `reason` | [`StockChangeReason`](../type-aliases/StockChangeReason.md) | Reason for the stock change | [types/analytics.types.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L515) |
| <a id="metadata"></a> `metadata?` | \{ `orderId?`: `string`; `warehouseId?`: `string`; `userId?`: `string`; `notes?`: `string`; \} | Additional metadata about the change | [types/analytics.types.ts:517](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L517) |
| `metadata.orderId?` | `string` | Related order ID (for sales/returns) | [types/analytics.types.ts:519](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L519) |
| `metadata.warehouseId?` | `string` | Related warehouse ID (for transfers) | [types/analytics.types.ts:521](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L521) |
| `metadata.userId?` | `string` | User who performed the adjustment | [types/analytics.types.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L523) |
| `metadata.notes?` | `string` | Notes or comments about the change | [types/analytics.types.ts:525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L525) |

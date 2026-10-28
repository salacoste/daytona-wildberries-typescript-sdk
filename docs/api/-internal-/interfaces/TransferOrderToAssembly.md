[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TransferOrderToAssembly

# Interface: TransferOrderToAssembly

Defined in: [types/orders-fbs.types.ts:164](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L164)

Per-order result of moving an assembly order from delivery back to assembly.
Maps to swagger schema: v3.TransferOrderToAssembly

## See

task-241

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID | [types/orders-fbs.types.ts:166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L166) |
| <a id="oldstickerid"></a> `oldStickerId` | `number` | Sticker ID in the old (closed) supply; `0` on error | [types/orders-fbs.types.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L168) |
| <a id="newstickerid"></a> `newStickerId` | `number` | New sticker ID in the target supply; `0` on error | [types/orders-fbs.types.ts:170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L170) |
| <a id="success"></a> `success?` | `boolean` | Whether the order was moved successfully (only `true` on success entries) | [types/orders-fbs.types.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L172) |
| <a id="error"></a> `error?` | \{ `code`: `number`; `detail`: `string`; \} | Error details when the order could not be moved | [types/orders-fbs.types.ts:174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L174) |
| `error.code` | `number` | Internal error code (e.g. 409) | [types/orders-fbs.types.ts:176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L176) |
| `error.detail` | `string` | Error details | [types/orders-fbs.types.ts:178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L178) |

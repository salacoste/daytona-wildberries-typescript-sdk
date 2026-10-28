[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingMethodError

# Interface: SupplyShippingMethodError

Defined in: [types/orders-fbs.types.ts:1350](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1350)

Per-supply error entry in the shipping-method response.
Maps to swagger schema: ReplyBatchError

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `number` | Error code (e.g. 400, 404, 409) | [types/orders-fbs.types.ts:1352](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1352) |
| <a id="detail"></a> `detail` | `string` | Additional error data (e.g. 'NotFound', 'SupplyAlreadyScanned', 'InvalidShippingDt') | [types/orders-fbs.types.ts:1354](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1354) |

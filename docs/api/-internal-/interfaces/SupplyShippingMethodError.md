[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingMethodError

# Interface: SupplyShippingMethodError

Defined in: [types/orders-fbs.types.ts:1199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1199)

Per-supply error entry in the shipping-method response.
Maps to swagger schema: ReplyBatchError

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `number` | Error code (e.g. 400, 404, 409) | [types/orders-fbs.types.ts:1201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1201) |
| <a id="detail"></a> `detail` | `string` | Additional error data (e.g. 'NotFound', 'SupplyAlreadyScanned', 'InvalidShippingDt') | [types/orders-fbs.types.ts:1203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1203) |

[Wildberries API TypeScript SDK](../modules.md) / ReturnByOrderIdParams

# Interface: ReturnByOrderIdParams

Defined in: [types/returns.types.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L158)

Parameters for `sdk.returns.getReturnByOrderId()`.
Date window is required because WB API requires it.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Same date window as getReturns() — required because WB API needs it. | [types/returns.types.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L160) |
| <a id="dateto"></a> `dateTo` | `string` | - | [types/returns.types.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L161) |
| <a id="ordertype"></a> `orderType?` | `"fbo"` \| `"fbs"` | Optional fulfillment-type hint. When provided, the underlying getReturns() call skips the unrelated source (e.g., orderType: 'fbo' skips FBS fetch). Reduces wasted rate-limit budget when consumer knows the order type. | [types/returns.types.ts:167](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/returns.types.ts#L167) |

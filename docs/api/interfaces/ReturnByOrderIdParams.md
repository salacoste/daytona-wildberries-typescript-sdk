[Wildberries API TypeScript SDK](../modules.md) / ReturnByOrderIdParams

# Interface: ReturnByOrderIdParams

Defined in: [types/returns.types.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L160)

Parameters for `sdk.returns.getReturnByOrderId()`.
Date window is required because WB API requires it.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Same date window as getReturns() — required because WB API needs it. | [types/returns.types.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L162) |
| <a id="dateto"></a> `dateTo` | `string` | - | [types/returns.types.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L163) |
| <a id="ordertype"></a> `orderType?` | `"fbo"` \| `"fbs"` | Optional fulfillment-type hint. When provided, the underlying getReturns() call skips the unrelated source (e.g., orderType: 'fbo' skips FBS fetch). Reduces wasted rate-limit budget when consumer knows the order type. | [types/returns.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L169) |

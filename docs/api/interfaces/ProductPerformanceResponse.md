[Wildberries API TypeScript SDK](../modules.md) / ProductPerformanceResponse

# Interface: ProductPerformanceResponse

Defined in: [types/analytics.types.ts:476](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L476)

Product performance response (for multiple products)

## Extends

- [`ResponseError`](../-internal-/interfaces/ResponseError.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`error`](../-internal-/interfaces/ResponseError.md#error) | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`errorText`](../-internal-/interfaces/ResponseError.md#errortext) | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`additionalErrors`](../-internal-/interfaces/ResponseError.md#additionalerrors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L173) |
| <a id="products"></a> `products` | [`ProductPerformanceMetrics`](ProductPerformanceMetrics.md)[] | Array of product performance metrics | - | [types/analytics.types.ts:478](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L478) |

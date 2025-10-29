[Wildberries API TypeScript SDK](../modules.md) / SearchQueriesResponse

# Interface: SearchQueriesResponse

Defined in: [types/analytics.types.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L335)

Search queries response

## Extends

- [`ResponseError`](../-internal-/interfaces/ResponseError.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`error`](../-internal-/interfaces/ResponseError.md#error) | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`errorText`](../-internal-/interfaces/ResponseError.md#errortext) | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`additionalErrors`](../-internal-/interfaces/ResponseError.md#additionalerrors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L173) |
| <a id="data"></a> `data` | [`SearchQueryMetrics`](SearchQueryMetrics.md)[] | Array of search query metrics | - | [types/analytics.types.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L337) |

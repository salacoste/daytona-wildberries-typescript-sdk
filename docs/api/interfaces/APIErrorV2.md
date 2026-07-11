[Wildberries API TypeScript SDK](../modules.md) / APIErrorV2

# Interface: APIErrorV2

Defined in: [types/orders-fbs.types.ts:836](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L836)

WB v3 APIErrorV2 envelope -- the newer V2 error shape returned by some v3 endpoints
(e.g. 400/403 responses). Maps to swagger schema: v3.APIErrorV2.

Unlike the legacy APIError ({code,message,data}), this envelope surfaces
structured per-field errors via `errors[]` and a human-readable `title`/`detail`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="title"></a> `title` | `string` | Error title (required) | [types/orders-fbs.types.ts:838](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L838) |
| <a id="detail"></a> `detail` | `string` | Error details (required) | [types/orders-fbs.types.ts:840](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L840) |
| <a id="errors"></a> `errors?` | `unknown`[] | Structured per-field errors (location/message/value) | [types/orders-fbs.types.ts:842](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L842) |
| <a id="origin"></a> `origin?` | `string` | WB internal service ID | [types/orders-fbs.types.ts:844](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L844) |
| <a id="requestid"></a> `requestId?` | `string` | Unique request ID | [types/orders-fbs.types.ts:846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L846) |
| <a id="status"></a> `status?` | `number` | HTTP status code | [types/orders-fbs.types.ts:848](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L848) |
| <a id="code"></a> `code?` | `string` | Error code | [types/orders-fbs.types.ts:850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L850) |

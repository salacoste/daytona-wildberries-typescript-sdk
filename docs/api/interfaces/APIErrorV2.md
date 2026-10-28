[Wildberries API TypeScript SDK](../modules.md) / APIErrorV2

# Interface: APIErrorV2

Defined in: [types/orders-fbs.types.ts:910](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L910)

WB v3 APIErrorV2 envelope -- the newer V2 error shape returned by some v3 endpoints
(e.g. 400/403 responses). Maps to swagger schema: v3.APIErrorV2.

Unlike the legacy [APIError](APIError.md) ({code,message,data}), this envelope surfaces
structured per-field errors via `errors[]` and a human-readable `title`/`detail`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="title"></a> `title` | `string` | Error title (required) | [types/orders-fbs.types.ts:912](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L912) |
| <a id="detail"></a> `detail` | `string` | Error details (required) | [types/orders-fbs.types.ts:914](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L914) |
| <a id="errors"></a> `errors?` | `unknown`[] | Structured per-field errors (location/message/value) | [types/orders-fbs.types.ts:916](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L916) |
| <a id="origin"></a> `origin?` | `string` | WB internal service ID | [types/orders-fbs.types.ts:918](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L918) |
| <a id="requestid"></a> `requestId?` | `string` | Unique request ID | [types/orders-fbs.types.ts:920](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L920) |
| <a id="status"></a> `status?` | `number` | HTTP status code | [types/orders-fbs.types.ts:922](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L922) |
| <a id="code"></a> `code?` | `string` | Error code | [types/orders-fbs.types.ts:924](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L924) |

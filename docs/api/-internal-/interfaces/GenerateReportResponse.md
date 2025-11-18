[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GenerateReportResponse

# Interface: GenerateReportResponse

Defined in: [types/analytics.types.ts:385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L385)

Report generation response

## Extends

- [`ResponseError`](ResponseError.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [`ResponseError`](ResponseError.md).[`error`](ResponseError.md#error) | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [`ResponseError`](ResponseError.md).[`errorText`](ResponseError.md#errortext) | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [`ResponseError`](ResponseError.md).[`additionalErrors`](ResponseError.md#additionalerrors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L173) |
| <a id="reportid"></a> `reportId` | `string` | Generated report ID for tracking and download | - | [types/analytics.types.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L387) |
| <a id="status"></a> `status` | [`ReportStatus`](../type-aliases/ReportStatus.md) | Current report status | - | [types/analytics.types.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L389) |
| <a id="estimatedcompletiontime"></a> `estimatedCompletionTime?` | `string` | Estimated completion time (ISO timestamp) | - | [types/analytics.types.ts:391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/analytics.types.ts#L391) |

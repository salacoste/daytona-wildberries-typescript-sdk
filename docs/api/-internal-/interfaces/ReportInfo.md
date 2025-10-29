[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ReportInfo

# Interface: ReportInfo

Defined in: [types/analytics.types.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L397)

Report status and download information

## Extends

- [`ResponseError`](ResponseError.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [`ResponseError`](ResponseError.md).[`error`](ResponseError.md#error) | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [`ResponseError`](ResponseError.md).[`errorText`](ResponseError.md#errortext) | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [`ResponseError`](ResponseError.md).[`additionalErrors`](ResponseError.md#additionalerrors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L173) |
| <a id="reportid"></a> `reportId` | `string` | Report ID | - | [types/analytics.types.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L399) |
| <a id="status"></a> `status` | [`ReportStatus`](../type-aliases/ReportStatus.md) | Current status | - | [types/analytics.types.ts:401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L401) |
| <a id="reporttype"></a> `reportType` | [`AnalyticsReportTypeEnum`](../../type-aliases/AnalyticsReportTypeEnum.md) | Report type | - | [types/analytics.types.ts:403](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L403) |
| <a id="format"></a> `format` | [`ReportFormat`](../type-aliases/ReportFormat.md) | Report format | - | [types/analytics.types.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L405) |
| <a id="downloadurl"></a> `downloadUrl?` | `string` | Download URL (available when status is 'completed') | - | [types/analytics.types.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L407) |
| <a id="expiresat"></a> `expiresAt?` | `string` | URL expiration timestamp | - | [types/analytics.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L409) |
| <a id="filesize"></a> `fileSize?` | `number` | File size in bytes (when completed) | - | [types/analytics.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L411) |
| <a id="errormessage"></a> `errorMessage?` | `string` | Error message (if status is 'failed') | - | [types/analytics.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L413) |

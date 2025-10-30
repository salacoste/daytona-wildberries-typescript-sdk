[Wildberries API TypeScript SDK](../modules.md) / CSVReport

# Interface: CSVReport

Defined in: [types/analytics.types.ts:644](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L644)

Complete CSV report information with download details

Returned by status check endpoint when CSV generation completes

## Extends

- [`ResponseError`](../-internal-/interfaces/ResponseError.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`error`](../-internal-/interfaces/ResponseError.md#error) | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`errorText`](../-internal-/interfaces/ResponseError.md#errortext) | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`additionalErrors`](../-internal-/interfaces/ResponseError.md#additionalerrors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L173) |
| <a id="reportid"></a> `reportId` | `string` | Report ID | - | [types/analytics.types.ts:646](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L646) |
| <a id="reporttype"></a> `reportType` | [`AnalyticsReportTypeEnum`](../type-aliases/AnalyticsReportTypeEnum.md) | Report type that was generated | - | [types/analytics.types.ts:648](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L648) |
| <a id="status"></a> `status` | [`ReportStatus`](../-internal-/type-aliases/ReportStatus.md) | Current generation status | - | [types/analytics.types.ts:650](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L650) |
| <a id="downloadurl"></a> `downloadUrl?` | `string` | Download URL (pre-signed, available when status is 'completed') | - | [types/analytics.types.ts:652](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L652) |
| <a id="expiresat"></a> `expiresAt?` | `string` | URL expiration timestamp (typically 24 hours from completion) | - | [types/analytics.types.ts:654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L654) |
| <a id="filesize"></a> `fileSize?` | `number` | File size in bytes (available when completed) | - | [types/analytics.types.ts:656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L656) |
| <a id="rowcount"></a> `rowCount?` | `number` | Number of data rows in CSV (excluding header if present) | - | [types/analytics.types.ts:658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L658) |
| <a id="errormessage"></a> `errorMessage?` | `string` | Error message if status is 'failed' | - | [types/analytics.types.ts:660](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L660) |
| <a id="formatoptions"></a> `formatOptions?` | [`CSVFormatOptions`](CSVFormatOptions.md) | Format options used for generation | - | [types/analytics.types.ts:662](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L662) |

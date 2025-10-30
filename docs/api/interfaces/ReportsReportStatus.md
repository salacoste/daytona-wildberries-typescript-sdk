[Wildberries API TypeScript SDK](../modules.md) / ReportsReportStatus

# Interface: ReportsReportStatus

Defined in: [types/reports.types.ts:354](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/reports.types.ts#L354)

Report generation status

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ \[`key`: `string`\]: `unknown`; `id`: `string`; `status`: `"processing"` \| `"new"` \| `"canceled"` \| `"error"` \| `"done"` \| `"purged"`; `error?`: `string`; `file?`: \{ \[`key`: `string`\]: `unknown`; `url?`: `string`; \}; \} | Wrapper for status data | [types/reports.types.ts:356](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/reports.types.ts#L356) |
| `data.id` | `string` | Task ID | [types/reports.types.ts:358](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/reports.types.ts#L358) |
| `data.status` | `"processing"` \| `"new"` \| `"canceled"` \| `"error"` \| `"done"` \| `"purged"` | Task status: - new: Queued - processing: Generating report - done: Report ready for download - purged: Report deleted - canceled: Task canceled - error: Generation failed (check error field) | [types/reports.types.ts:368](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/reports.types.ts#L368) |
| `data.error?` | `string` | Error message if status is 'error' | [types/reports.types.ts:370](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/reports.types.ts#L370) |
| `data.file?` | \{ \[`key`: `string`\]: `unknown`; `url?`: `string`; \} | Download information when status is 'done' | [types/reports.types.ts:372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/reports.types.ts#L372) |
| `data.file.url?` | `string` | Download URL | [types/reports.types.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/reports.types.ts#L374) |

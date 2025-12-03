[Wildberries API TypeScript SDK](../modules.md) / CSVFormatOptions

# Interface: CSVFormatOptions

Defined in: [types/analytics.types.ts:576](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L576)

CSV format options for customizing export output

Allows fine-grained control over CSV file formatting for compatibility
with different tools (Excel, BI platforms, custom parsers)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="delimiter"></a> `delimiter?` | `","` \| `";"` \| "\t" | Column delimiter character - `,` (comma): Standard CSV format - `;` (semicolon): European Excel format - `\t` (tab): Tab-separated values (TSV) **Default** `','` | [types/analytics.types.ts:585](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L585) |
| <a id="includeheaders"></a> `includeHeaders?` | `boolean` | Include header row with column names **Default** `true` | [types/analytics.types.ts:592](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L592) |
| <a id="encoding"></a> `encoding?` | `"utf-8"` \| `"utf-8-bom"` | Character encoding for the CSV file - `utf-8`: Standard Unicode encoding - `utf-8-bom`: UTF-8 with BOM (Byte Order Mark) for Excel compatibility **Default** `'utf-8'` | [types/analytics.types.ts:601](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L601) |

[Wildberries API TypeScript SDK](../modules.md) / TemplatesResponse

# Interface: TemplatesResponse

Defined in: [types/communications.types.ts:1709](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1709)

Response from getTemplates() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="templates"></a> `templates` | [`Template`](Template.md)[] | Array of templates matching the criteria | [types/communications.types.ts:1713](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1713) |
| <a id="total"></a> `total` | `number` | Total number of templates matching the criteria | [types/communications.types.ts:1718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1718) |
| <a id="hasmore"></a> `hasMore` | `boolean` | Whether there are more templates available | [types/communications.types.ts:1723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1723) |
| <a id="nextoffset"></a> `nextOffset?` | `number` | Next offset for pagination (if applicable) | [types/communications.types.ts:1728](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1728) |
| <a id="filters"></a> `filters` | [`TemplateFilters`](TemplateFilters.md) | Filter criteria applied (echoed back) | [types/communications.types.ts:1733](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1733) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:1738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1738) |
| <a id="errortext"></a> `errorText?` | `string` | Error description text | [types/communications.types.ts:1743](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1743) |
| <a id="additionalerrors"></a> `additionalErrors?` | `string`[] | Additional errors array | [types/communications.types.ts:1748](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1748) |

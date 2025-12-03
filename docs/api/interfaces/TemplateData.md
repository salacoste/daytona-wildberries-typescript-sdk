[Wildberries API TypeScript SDK](../modules.md) / TemplateData

# Interface: TemplateData

Defined in: [types/communications.types.ts:1559](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1559)

Request payload for creating or updating a template

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Template name for identification and search | [types/communications.types.ts:1563](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1563) |
| <a id="content"></a> `content` | `string` | Template content with variable placeholders | [types/communications.types.ts:1568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1568) |
| <a id="category"></a> `category` | [`TemplateCategory`](../type-aliases/TemplateCategory.md) | Template category for organization | [types/communications.types.ts:1573](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1573) |
| <a id="description"></a> `description?` | `string` | Short description of template purpose | [types/communications.types.ts:1578](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1578) |
| <a id="keywords"></a> `keywords?` | `string`[] | Keywords for template search and matching | [types/communications.types.ts:1583](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1583) |
| <a id="variables"></a> `variables?` | [`TemplateVariable`](TemplateVariable.md)[] | Variables that can be used in this template | [types/communications.types.ts:1588](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1588) |
| <a id="isactive"></a> `isActive?` | `boolean` | Whether template should be active | [types/communications.types.ts:1593](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1593) |
| <a id="language"></a> `language?` | `string` | Language code for the template | [types/communications.types.ts:1598](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1598) |
| <a id="priority"></a> `priority?` | `number` | Template priority in suggestion algorithms | [types/communications.types.ts:1603](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1603) |
| <a id="tags"></a> `tags?` | `string`[] | Tags for additional categorization | [types/communications.types.ts:1608](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1608) |
| <a id="usageguidelines"></a> `usageGuidelines?` | `string` | Template usage guidelines | [types/communications.types.ts:1613](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1613) |
| <a id="examples"></a> `examples?` | `string`[] | Examples of template usage | [types/communications.types.ts:1618](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1618) |
| <a id="relatedtemplateids"></a> `relatedTemplateIds?` | `string`[] | Related template IDs | [types/communications.types.ts:1623](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1623) |

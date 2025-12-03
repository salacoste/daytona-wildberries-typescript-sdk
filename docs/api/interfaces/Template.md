[Wildberries API TypeScript SDK](../modules.md) / Template

# Interface: Template

Defined in: [types/communications.types.ts:1454](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1454)

Response template for customer communication

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Unique template identifier | [types/communications.types.ts:1458](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1458) |
| <a id="name"></a> `name` | `string` | Template name for identification and search | [types/communications.types.ts:1463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1463) |
| <a id="content"></a> `content` | `string` | Template content with variable placeholders ({{variable_name}}) | [types/communications.types.ts:1468](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1468) |
| <a id="category"></a> `category` | [`TemplateCategory`](../type-aliases/TemplateCategory.md) | Template category for organization | [types/communications.types.ts:1473](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1473) |
| <a id="description"></a> `description` | `string` | Short description of template purpose | [types/communications.types.ts:1478](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1478) |
| <a id="keywords"></a> `keywords` | `string`[] | Keywords for template search and matching | [types/communications.types.ts:1483](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1483) |
| <a id="createdat"></a> `createdAt` | `string` | Template creation timestamp (ISO 8601) | [types/communications.types.ts:1488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1488) |
| <a id="updatedat"></a> `updatedAt` | `string` | Template last update timestamp (ISO 8601) | [types/communications.types.ts:1493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1493) |
| <a id="createdby"></a> `createdBy` | `string` | User who created this template | [types/communications.types.ts:1498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1498) |
| <a id="updatedby"></a> `updatedBy` | `string` | User who last updated this template | [types/communications.types.ts:1503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1503) |
| <a id="isactive"></a> `isActive` | `boolean` | Whether template is currently active | [types/communications.types.ts:1508](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1508) |
| <a id="variables"></a> `variables` | [`TemplateVariable`](TemplateVariable.md)[] | Variables that can be used in this template | [types/communications.types.ts:1513](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1513) |
| <a id="metrics"></a> `metrics` | [`TemplateMetrics`](TemplateMetrics.md) | Template usage statistics and performance metrics | [types/communications.types.ts:1518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1518) |
| <a id="language"></a> `language` | `string` | Language code for the template (e.g., 'ru', 'en') | [types/communications.types.ts:1523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1523) |
| <a id="priority"></a> `priority` | `number` | Template priority in suggestion algorithms (higher = more likely to be suggested) | [types/communications.types.ts:1528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1528) |
| <a id="tags"></a> `tags` | `string`[] | Tags for additional categorization and filtering | [types/communications.types.ts:1533](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1533) |
| <a id="issystemtemplate"></a> `isSystemTemplate` | `boolean` | Whether this template is a system template (not editable by users) | [types/communications.types.ts:1538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1538) |
| <a id="usageguidelines"></a> `usageGuidelines?` | `string` | Template usage guidelines and best practices | [types/communications.types.ts:1543](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1543) |
| <a id="examples"></a> `examples?` | `string`[] | Examples of how to use this template effectively | [types/communications.types.ts:1548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1548) |
| <a id="relatedtemplateids"></a> `relatedTemplateIds?` | `string`[] | Related template IDs for cross-referencing | [types/communications.types.ts:1553](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1553) |

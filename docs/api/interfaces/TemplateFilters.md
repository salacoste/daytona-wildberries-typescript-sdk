[Wildberries API TypeScript SDK](../modules.md) / TemplateFilters

# Interface: TemplateFilters

Defined in: [types/communications.types.ts:1629](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1629)

Filter criteria for retrieving templates

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="category"></a> `category?` | [`TemplateCategory`](../type-aliases/TemplateCategory.md) | Filter by template category | [types/communications.types.ts:1633](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1633) |
| <a id="language"></a> `language?` | `string` | Filter by language code | [types/communications.types.ts:1638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1638) |
| <a id="isactive"></a> `isActive?` | `boolean` | Filter by active status | [types/communications.types.ts:1643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1643) |
| <a id="search"></a> `search?` | `string` | Filter by keywords (search in name, content, description) | [types/communications.types.ts:1648](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1648) |
| <a id="tags"></a> `tags?` | `string`[] | Filter by tags | [types/communications.types.ts:1653](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1653) |
| <a id="createdby"></a> `createdBy?` | `string` | Filter by creator user | [types/communications.types.ts:1658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1658) |
| <a id="minpriority"></a> `minPriority?` | `number` | Filter by priority level (minimum) | [types/communications.types.ts:1663](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1663) |
| <a id="maxpriority"></a> `maxPriority?` | `number` | Filter by priority level (maximum) | [types/communications.types.ts:1668](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1668) |
| <a id="minusagecount"></a> `minUsageCount?` | `number` | Filter by usage count (minimum) | [types/communications.types.ts:1673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1673) |
| <a id="createdfrom"></a> `createdFrom?` | `string` | Filter by creation date range (from) | [types/communications.types.ts:1678](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1678) |
| <a id="createdto"></a> `createdTo?` | `string` | Filter by creation date range (to) | [types/communications.types.ts:1683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1683) |
| <a id="sortby"></a> `sortBy?` | \| `"name"` \| `"createdAt"` \| `"updatedAt"` \| `"usage"` \| `"priority"` \| `"effectiveness"` | Sort templates by field | [types/communications.types.ts:1688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1688) |
| <a id="sortorder"></a> `sortOrder?` | `"asc"` \| `"desc"` | Sort order | [types/communications.types.ts:1693](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1693) |
| <a id="limit"></a> `limit?` | `number` | Number of templates to retrieve | [types/communications.types.ts:1698](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1698) |
| <a id="offset"></a> `offset?` | `number` | Number of templates to skip for pagination | [types/communications.types.ts:1703](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1703) |

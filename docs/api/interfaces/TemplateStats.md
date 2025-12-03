[Wildberries API TypeScript SDK](../modules.md) / TemplateStats

# Interface: TemplateStats

Defined in: [types/communications.types.ts:1797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1797)

Template statistics summary

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="totaltemplates"></a> `totalTemplates` | `number` | Total number of templates | [types/communications.types.ts:1801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1801) |
| <a id="activetemplates"></a> `activeTemplates` | `number` | Number of active templates | [types/communications.types.ts:1806](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1806) |
| <a id="bycategory"></a> `byCategory` | \{ `category`: [`TemplateCategory`](../type-aliases/TemplateCategory.md); `count`: `number`; `usage`: `number`; \}[] | Templates by category | [types/communications.types.ts:1811](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1811) |
| <a id="mostused"></a> `mostUsed` | \{ `templateId`: `string`; `name`: `string`; `usage`: `number`; `effectiveness`: `number`; \}[] | Most used templates (top 10) | [types/communications.types.ts:1820](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1820) |
| <a id="bestperforming"></a> `bestPerforming` | \{ `templateId`: `string`; `name`: `string`; `satisfaction`: `number`; `usage`: `number`; \}[] | Templates with highest customer satisfaction | [types/communications.types.ts:1830](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1830) |
| <a id="needsimprovement"></a> `needsImprovement` | \{ `templateId`: `string`; `name`: `string`; `effectiveness`: `number`; `issues`: `string`[]; \}[] | Templates that need improvement | [types/communications.types.ts:1840](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1840) |
| <a id="usagetrends"></a> `usageTrends` | \{ `period`: `"7d"` \| `"30d"` \| `"90d"`; `totalUsage`: `number`; `changePercent`: `number`; `trend`: `"increasing"` \| `"stable"` \| `"decreasing"`; \}[] | Overall template usage trends | [types/communications.types.ts:1850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1850) |

[Wildberries API TypeScript SDK](../modules.md) / TemplateMetrics

# Interface: TemplateMetrics

Defined in: [types/communications.types.ts:1375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1375)

Template performance metrics

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="usage"></a> `usage` | [`TemplateUsage`](TemplateUsage.md) | Usage statistics | [types/communications.types.ts:1379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1379) |
| <a id="effectivenessscore"></a> `effectivenessScore` | `number` | Effectiveness score based on customer response time and satisfaction | [types/communications.types.ts:1384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1384) |
| <a id="suggestedimprovements"></a> `suggestedImprovements?` | `string`[] | Suggested improvements based on performance data | [types/communications.types.ts:1389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1389) |
| <a id="abtestresults"></a> `abTestResults?` | \{ `variantA`: \{ `uses`: `number`; `satisfaction`: `number`; \}; `variantB`: \{ `uses`: `number`; `satisfaction`: `number`; \}; `winner`: `"A"` \| `"B"` \| `"inconclusive"`; \} | A/B test results if template variants exist | [types/communications.types.ts:1394](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1394) |
| `abTestResults.variantA` | \{ `uses`: `number`; `satisfaction`: `number`; \} | - | [types/communications.types.ts:1395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1395) |
| `abTestResults.variantA.uses` | `number` | - | [types/communications.types.ts:1395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1395) |
| `abTestResults.variantA.satisfaction` | `number` | - | [types/communications.types.ts:1395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1395) |
| `abTestResults.variantB` | \{ `uses`: `number`; `satisfaction`: `number`; \} | - | [types/communications.types.ts:1396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1396) |
| `abTestResults.variantB.uses` | `number` | - | [types/communications.types.ts:1396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1396) |
| `abTestResults.variantB.satisfaction` | `number` | - | [types/communications.types.ts:1396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1396) |
| `abTestResults.winner` | `"A"` \| `"B"` \| `"inconclusive"` | - | [types/communications.types.ts:1397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1397) |

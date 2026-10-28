[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderPackage

# Interface: PlanBuilderPackage

Defined in: [types/general.types.ts:428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L428)

An option package activated in the Plan Builder.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Package ID (UUID) | [types/general.types.ts:430](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L430) |
| <a id="slug"></a> `slug` | `string` | Package code (slug) | [types/general.types.ts:432](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L432) |
| <a id="name"></a> `name` | `string` | Package name in the language specified in the `locale` parameter | [types/general.types.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L434) |
| <a id="status"></a> `status` | [`PlanBuilderActivationStatus`](../type-aliases/PlanBuilderActivationStatus.md) | Package activation status | [types/general.types.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L436) |
| <a id="activatedat"></a> `activatedAt?` | `string` | Package activation date (ISO 8601) | [types/general.types.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L438) |
| <a id="expiresat"></a> `expiresAt?` | `string` | End date of the minimum duration period; the package cannot be deactivated before this date (ISO 8601) | [types/general.types.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L440) |
| <a id="commissionrate"></a> `commissionRate?` | `number` | Fee for the package, % of turnover | [types/general.types.ts:442](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L442) |
| <a id="periodduration"></a> `periodDuration?` | `number` | Minimum duration of the package | [types/general.types.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L444) |
| <a id="options"></a> `options?` | [`PlanBuilderOptionShort`](PlanBuilderOptionShort.md)[] | Options included in the package | [types/general.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L446) |

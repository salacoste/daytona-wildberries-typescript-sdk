[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderOption

# Interface: PlanBuilderOption

Defined in: [types/general.types.ts:403](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L403)

An option activated in the Plan Builder outside of any package.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Option ID | [types/general.types.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L405) |
| <a id="slug"></a> `slug` | `string` | Option code (slug) | [types/general.types.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L407) |
| <a id="name"></a> `name` | `string` | Option name in the language specified in the `locale` parameter | [types/general.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L409) |
| <a id="status"></a> `status` | [`PlanBuilderActivationStatus`](../type-aliases/PlanBuilderActivationStatus.md) | Option activation status | [types/general.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L411) |
| <a id="activatedat"></a> `activatedAt?` | `string` | Option activation date (ISO 8601) | [types/general.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L413) |
| <a id="expiresat"></a> `expiresAt?` | `string` | End date of the minimum duration period; the option cannot be deactivated before this date (ISO 8601) | [types/general.types.ts:415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L415) |
| <a id="commissionrate"></a> `commissionRate?` | `number` | Cost of activating the option, % of turnover. Returned if the response does not contain the `promotion` object | [types/general.types.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L417) |
| <a id="periodduration"></a> `periodDuration?` | `number` | Minimum duration of the option | [types/general.types.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L419) |
| <a id="promotion"></a> `promotion?` | [`PlanBuilderPromotion`](PlanBuilderPromotion.md) | Promo details. Present only if the option is activated via a promo whose period has not expired | [types/general.types.ts:421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L421) |

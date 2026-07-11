[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderPackage

# Interface: PlanBuilderPackage

Defined in: [types/general.types.ts:372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L372)

An option package activated in the Plan Builder.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Package ID (UUID) | [types/general.types.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L374) |
| <a id="slug"></a> `slug` | `string` | Package code (slug) | [types/general.types.ts:376](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L376) |
| <a id="name"></a> `name` | `string` | Package name in the language specified in the `locale` parameter | [types/general.types.ts:378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L378) |
| <a id="status"></a> `status` | [`PlanBuilderActivationStatus`](../type-aliases/PlanBuilderActivationStatus.md) | Package activation status | [types/general.types.ts:380](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L380) |
| <a id="activatedat"></a> `activatedAt?` | `string` | Package activation date (ISO 8601) | [types/general.types.ts:382](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L382) |
| <a id="expiresat"></a> `expiresAt?` | `string` | End date of the minimum duration period; the package cannot be deactivated before this date (ISO 8601) | [types/general.types.ts:384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L384) |
| <a id="commissionrate"></a> `commissionRate?` | `number` | Fee for the package, % of turnover | [types/general.types.ts:386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L386) |
| <a id="periodduration"></a> `periodDuration?` | `number` | Minimum duration of the package | [types/general.types.ts:388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L388) |
| <a id="options"></a> `options?` | [`PlanBuilderOptionShort`](PlanBuilderOptionShort.md)[] | Options included in the package | [types/general.types.ts:390](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L390) |

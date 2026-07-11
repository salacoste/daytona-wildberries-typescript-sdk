[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderOptionsInfo

# Interface: PlanBuilderOptionsInfo

Defined in: [types/general.types.ts:401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L401)

Information about all options and option packages the seller activated in the
Plan Builder (Tariff Constructor). Returned by GET /api/common/v1/tariff-constructor/options.

Options included in activated packages are in `packages`; options activated
outside of packages are in `options`.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="activeoptioncount"></a> `activeOptionCount` | `number` | Number of active options not included in packages | [types/general.types.ts:403](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L403) |
| <a id="activepackagecount"></a> `activePackageCount` | `number` | Number of active option packages | [types/general.types.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L405) |
| <a id="totalcommissionrate"></a> `totalCommissionRate` | `number` | Final fee for activated options and packages, % of turnover | [types/general.types.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L407) |
| <a id="packages"></a> `packages` | [`PlanBuilderPackage`](PlanBuilderPackage.md)[] | Activated option packages | [types/general.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L409) |
| <a id="options"></a> `options` | [`PlanBuilderOption`](PlanBuilderOption.md)[] | Activated options | [types/general.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L411) |

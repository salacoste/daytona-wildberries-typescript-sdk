[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderOptionsInfo

# Interface: PlanBuilderOptionsInfo

Defined in: [types/general.types.ts:457](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L457)

Information about all options and option packages the seller activated in the
Plan Builder (Tariff Constructor). Returned by GET /api/common/v1/tariff-constructor/options.

Options included in activated packages are in `packages`; options activated
outside of packages are in `options`.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="activeoptioncount"></a> `activeOptionCount` | `number` | Number of active options not included in packages | [types/general.types.ts:459](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L459) |
| <a id="activepackagecount"></a> `activePackageCount` | `number` | Number of active option packages | [types/general.types.ts:461](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L461) |
| <a id="totalcommissionrate"></a> `totalCommissionRate` | `number` | Final fee for activated options and packages, % of turnover | [types/general.types.ts:463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L463) |
| <a id="packages"></a> `packages` | [`PlanBuilderPackage`](PlanBuilderPackage.md)[] | Activated option packages | [types/general.types.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L465) |
| <a id="options"></a> `options` | [`PlanBuilderOption`](PlanBuilderOption.md)[] | Activated options | [types/general.types.ts:467](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L467) |

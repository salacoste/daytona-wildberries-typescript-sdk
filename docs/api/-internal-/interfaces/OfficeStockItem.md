[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OfficeStockItem

# Interface: OfficeStockItem

Defined in: [types/analytics.types.ts:887](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L887)

Office stock item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="officeid"></a> `officeId?` | `number` | Office/warehouse ID | [types/analytics.types.ts:889](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L889) |
| <a id="officename"></a> `officeName?` | `string` | Office/warehouse name | [types/analytics.types.ts:891](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L891) |
| <a id="regionname"></a> `regionName` | `string` | Region name | [types/analytics.types.ts:893](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L893) |
| <a id="quantity"></a> `quantity` | `number` | Stock quantity | [types/analytics.types.ts:895](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L895) |
| <a id="offices"></a> `offices` | \{ `officeId`: `number`; `officeName`: `string`; `quantity`: `number`; \}[] | Offices list (empty for FBS aggregated data) | [types/analytics.types.ts:897](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L897) |

[Wildberries API TypeScript SDK](../modules.md) / TariffDifference

# Interface: TariffDifference

Defined in: [utils/compareTariffs.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/utils/compareTariffs.ts#L41)

Percentage differences between inventory and supply tariffs

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="deliverybasepercent"></a> `deliveryBasePercent` | `number` | Percentage difference in delivery base cost: (supply - inventory) / inventory * 100 | [utils/compareTariffs.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/utils/compareTariffs.ts#L43) |
| <a id="storagebasepercent"></a> `storageBasePercent` | `number` | Percentage difference in storage base cost: (supply - inventory) / inventory * 100 | [utils/compareTariffs.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/utils/compareTariffs.ts#L45) |

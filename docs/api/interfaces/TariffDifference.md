[Wildberries API TypeScript SDK](../modules.md) / TariffDifference

# Interface: TariffDifference

Defined in: [utils/compareTariffs.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/utils/compareTariffs.ts#L41)

Percentage differences between inventory and supply tariffs

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="deliverybasepercent"></a> `deliveryBasePercent` | `number` | Percentage difference in delivery base cost: (supply - inventory) / inventory * 100 | [utils/compareTariffs.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/utils/compareTariffs.ts#L43) |
| <a id="storagebasepercent"></a> `storageBasePercent` | `number` | Percentage difference in storage base cost: (supply - inventory) / inventory * 100 | [utils/compareTariffs.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/utils/compareTariffs.ts#L45) |

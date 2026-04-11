[Wildberries API TypeScript SDK](../modules.md) / TariffComparison

# Interface: TariffComparison

Defined in: [utils/compareTariffs.ts:56](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/utils/compareTariffs.ts#L56)

Complete tariff comparison result

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="warehousename"></a> `warehouseName` | `string` | Warehouse name used for comparison | [utils/compareTariffs.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/utils/compareTariffs.ts#L58) |
| <a id="date"></a> `date` | `string` | Date used for comparison | [utils/compareTariffs.ts:60](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/utils/compareTariffs.ts#L60) |
| <a id="inventory"></a> `inventory` | [`TariffData`](TariffData.md) | Tariff data from inventory storage API (tariffs/box) | [utils/compareTariffs.ts:62](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/utils/compareTariffs.ts#L62) |
| <a id="supply"></a> `supply` | [`TariffData`](TariffData.md) | Tariff data from supply API (acceptance/coefficients) | [utils/compareTariffs.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/utils/compareTariffs.ts#L64) |
| <a id="difference"></a> `difference` | [`TariffDifference`](TariffDifference.md) | Percentage differences between the two sources | [utils/compareTariffs.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/utils/compareTariffs.ts#L66) |
| <a id="recommendation"></a> `recommendation` | [`TariffRecommendation`](../type-aliases/TariffRecommendation.md) | Recommendation based on which source has lower overall costs | [utils/compareTariffs.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/utils/compareTariffs.ts#L68) |

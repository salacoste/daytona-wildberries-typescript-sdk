[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableShippingOfficeItem

# Interface: TableShippingOfficeItem

Defined in: [types/analytics.types.ts:1269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/analytics.types.ts#L1269)

Данные по региону отгрузки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="regionname"></a> `regionName` | `string` | Регион отгрузки | [types/analytics.types.ts:1271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/analytics.types.ts#L1271) |
| <a id="metrics"></a> `metrics` | [`TableShippingOfficeMetrics`](TableShippingOfficeMetrics.md) | Метрики по региону | [types/analytics.types.ts:1273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/analytics.types.ts#L1273) |
| <a id="offices"></a> `offices` | \{ `officeID`: `number`; `officeName`: `string`; `metrics`: [`TableShippingOfficeMetrics`](TableShippingOfficeMetrics.md); \}[] | Данные по складам | [types/analytics.types.ts:1275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/analytics.types.ts#L1275) |

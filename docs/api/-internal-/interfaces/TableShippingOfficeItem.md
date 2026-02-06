[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableShippingOfficeItem

# Interface: TableShippingOfficeItem

Defined in: [types/analytics.types.ts:1504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1504)

Данные по региону отгрузки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="regionname"></a> `regionName` | `string` | Регион отгрузки | [types/analytics.types.ts:1506](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1506) |
| <a id="metrics"></a> `metrics` | [`TableShippingOfficeMetrics`](TableShippingOfficeMetrics.md) | Метрики по региону | [types/analytics.types.ts:1508](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1508) |
| <a id="offices"></a> `offices` | \{ `officeID`: `number`; `officeName`: `string`; `metrics`: [`TableShippingOfficeMetrics`](TableShippingOfficeMetrics.md); \}[] | Данные по складам | [types/analytics.types.ts:1510](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1510) |

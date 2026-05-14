[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableSizeResponse

# Interface: TableSizeResponse

Defined in: [types/analytics.types.ts:1200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/analytics.types.ts#L1200)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="offices"></a> `offices?` | [`TableOfficeItem`](TableOfficeItem.md)[] | Множество данных по складам | [types/analytics.types.ts:1202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/analytics.types.ts#L1202) |
| <a id="sizes"></a> `sizes?` | \{ `name`: `string`; `chrtID`: `number`; `offices?`: [`TableOfficeItem`](TableOfficeItem.md)[]; `metrics`: [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; \}; \}[] | Множество данных по размерам товара | [types/analytics.types.ts:1204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/analytics.types.ts#L1204) |

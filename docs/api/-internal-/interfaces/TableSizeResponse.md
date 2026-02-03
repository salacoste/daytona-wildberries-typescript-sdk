[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableSizeResponse

# Interface: TableSizeResponse

Defined in: [types/analytics.types.ts:1435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L1435)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="offices"></a> `offices?` | [`TableOfficeItem`](TableOfficeItem.md)[] | Множество данных по складам | [types/analytics.types.ts:1437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L1437) |
| <a id="sizes"></a> `sizes?` | \{ `name`: `string`; `chrtID`: `number`; `offices?`: [`TableOfficeItem`](TableOfficeItem.md)[]; `metrics`: [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; \}; \}[] | Множество данных по размерам товара | [types/analytics.types.ts:1439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L1439) |

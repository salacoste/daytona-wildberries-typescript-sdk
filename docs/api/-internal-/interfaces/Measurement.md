[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Measurement

# Interface: Measurement

Defined in: [types/reports.types.ts:304](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L304)

Warehouse-measurement report item (one element of `data.reports[]` in the
`WHM` response schema).

## See

EPIC 43 - Flattened to match swagger WHM `data.reports[]` item shape.
Response is single-wrapped by [WarehouseMeasurementsV2Response](WarehouseMeasurementsV2Response.md) (`{ data: { reports: Measurement[], total } }`).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/reports.types.ts:306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L306) |
| <a id="subjectname"></a> `subjectName?` | `string` | Предмет | [types/reports.types.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L308) |
| <a id="dimid"></a> `dimId?` | `number` | ID замера | [types/reports.types.ts:310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L310) |
| <a id="volume"></a> `volume?` | `number` | Объём, л (фактические габариты) | [types/reports.types.ts:312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L312) |
| <a id="width"></a> `width?` | `number` | Ширина, см (фактические габариты) | [types/reports.types.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L314) |
| <a id="length"></a> `length?` | `number` | Длина, см (фактические габариты) | [types/reports.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L316) |
| <a id="height"></a> `height?` | `number` | Высота, см (фактические габариты) | [types/reports.types.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L318) |
| <a id="photourls"></a> `photoUrls?` | `string`[] | Фото замеров | [types/reports.types.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L320) |
| <a id="dt"></a> `dt?` | `string` | Дата и время замера | [types/reports.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L322) |

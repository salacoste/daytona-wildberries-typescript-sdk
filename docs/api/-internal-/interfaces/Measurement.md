[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Measurement

# Interface: Measurement

Defined in: [types/reports.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L316)

Warehouse-measurement report item (one element of `data.reports[]` in the
`WHM` response schema).

## See

EPIC 43 - Flattened to match swagger WHM `data.reports[]` item shape.
Response is single-wrapped by [WarehouseMeasurementsV2Response](WarehouseMeasurementsV2Response.md) (`{ data: { reports: Measurement[], total } }`).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/reports.types.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L318) |
| <a id="subjectname"></a> `subjectName?` | `string` | Предмет | [types/reports.types.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L320) |
| <a id="dimid"></a> `dimId?` | `number` | ID замера | [types/reports.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L322) |
| <a id="volume"></a> `volume?` | `number` | Объём, л (фактические габариты) | [types/reports.types.ts:324](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L324) |
| <a id="width"></a> `width?` | `number` | Ширина, см (фактические габариты) | [types/reports.types.ts:326](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L326) |
| <a id="length"></a> `length?` | `number` | Длина, см (фактические габариты) | [types/reports.types.ts:328](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L328) |
| <a id="height"></a> `height?` | `number` | Высота, см (фактические габариты) | [types/reports.types.ts:330](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L330) |
| <a id="photourls"></a> `photoUrls?` | `string`[] | Фото замеров | [types/reports.types.ts:332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L332) |
| <a id="dt"></a> `dt?` | `string` | Дата и время замера | [types/reports.types.ts:334](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L334) |

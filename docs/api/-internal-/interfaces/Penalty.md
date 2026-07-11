[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Penalty

# Interface: Penalty

Defined in: [types/reports.types.ts:259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L259)

Measurement-penalty report item (one element of `data.reports[]` in the
`MeasurementPenalties` response schema).

## See

EPIC 43 - Flattened to match swagger MeasurementPenalties `data.reports[]` item shape.
Response is single-wrapped by [MeasurementPenaltiesResponse](MeasurementPenaltiesResponse.md) (`{ data: { reports: Penalty[], total } }`).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/reports.types.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L261) |
| <a id="dimid"></a> `dimId?` | `number` | ID замера | [types/reports.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L263) |
| <a id="subjectname"></a> `subjectName?` | `string` | Предмет | [types/reports.types.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L265) |
| <a id="prcover"></a> `prcOver?` | `number` | Разница в габаритах, % | [types/reports.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L267) |
| <a id="volume"></a> `volume?` | `number` | Объём, л (фактические габариты) | [types/reports.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L269) |
| <a id="width"></a> `width?` | `number` | Ширина, см (фактические габариты) | [types/reports.types.ts:271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L271) |
| <a id="length"></a> `length?` | `number` | Длина, см (фактические габариты) | [types/reports.types.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L273) |
| <a id="height"></a> `height?` | `number` | Высота, см (фактические габариты) | [types/reports.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L275) |
| <a id="volumesup"></a> `volumeSup?` | `number` | Объём, л (габариты карточки товара) | [types/reports.types.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L277) |
| <a id="widthsup"></a> `widthSup?` | `number` | Ширина, см (габариты карточки товара) | [types/reports.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L279) |
| <a id="lengthsup"></a> `lengthSup?` | `number` | Длина, см (габариты карточки товара) | [types/reports.types.ts:281](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L281) |
| <a id="heightsup"></a> `heightSup?` | `number` | Высота, см (габариты карточки товара) | [types/reports.types.ts:283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L283) |
| <a id="photourls"></a> `photoUrls?` | `string`[] | Фото замеров | [types/reports.types.ts:285](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L285) |
| <a id="dtbonus"></a> `dtBonus?` | `string` | Дата штрафа | [types/reports.types.ts:287](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L287) |
| <a id="isvalid"></a> `isValid?` | `boolean` | Статус обмера: - `false` — отменён - `true` — подтверждён | [types/reports.types.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L289) |
| <a id="isvaliddt"></a> `isValidDt?` | `string` | Дата и время подтверждения или отмены обмера | [types/reports.types.ts:291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L291) |
| <a id="reversalamount"></a> `reversalAmount?` | `number` | Сумма сторно | [types/reports.types.ts:293](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L293) |
| <a id="penaltyamount"></a> `penaltyAmount?` | `number` | Сумма штрафа | [types/reports.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L295) |

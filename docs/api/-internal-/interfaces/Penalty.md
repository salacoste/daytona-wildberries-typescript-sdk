[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Penalty

# Interface: Penalty

Defined in: [types/reports.types.ts:253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/reports.types.ts#L253)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `reports`: \{ `nmId?`: `number`; `dimId?`: `number`; `subject?`: `string`; `prcOver?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `volumeSup?`: `number`; `widthSup?`: `number`; `lengthSup?`: `number`; `heightSup?`: `number`; `photoUrls?`: `string`[]; `dtBonus?`: `string`; `isValid?`: `boolean`; `isValidDt?`: `string`; `reversalAmount?`: `number`; `penaltyAmount?`: `number`; \}[]; `totalCount`: `number`; \} | Данные ответа | [types/reports.types.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/reports.types.ts#L255) |
| `data.reports` | \{ `nmId?`: `number`; `dimId?`: `number`; `subject?`: `string`; `prcOver?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `volumeSup?`: `number`; `widthSup?`: `number`; `lengthSup?`: `number`; `heightSup?`: `number`; `photoUrls?`: `string`[]; `dtBonus?`: `string`; `isValid?`: `boolean`; `isValidDt?`: `string`; `reversalAmount?`: `number`; `penaltyAmount?`: `number`; \}[] | Удержания | [types/reports.types.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/reports.types.ts#L257) |
| `data.totalCount` | `number` | Количество удержаний в отчёте | [types/reports.types.ts:296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/reports.types.ts#L296) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Penalty

# Interface: Penalty

Defined in: [types/reports.types.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/reports.types.ts#L257)

MeasurementPenalties response type for penalty reports

## See

EPIC 43 - Updated to match swagger MeasurementPenalties schema

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `reports`: \{ `nmId?`: `number`; `dimId?`: `number`; `subjectName?`: `string`; `prcOver?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `volumeSup?`: `number`; `widthSup?`: `number`; `lengthSup?`: `number`; `heightSup?`: `number`; `photoUrls?`: `string`[]; `dtBonus?`: `string`; `isValid?`: `boolean`; `isValidDt?`: `string`; `reversalAmount?`: `number`; `penaltyAmount?`: `number`; \}[]; `total`: `number`; \} | Данные ответа | [types/reports.types.ts:259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/reports.types.ts#L259) |
| `data.reports` | \{ `nmId?`: `number`; `dimId?`: `number`; `subjectName?`: `string`; `prcOver?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `volumeSup?`: `number`; `widthSup?`: `number`; `lengthSup?`: `number`; `heightSup?`: `number`; `photoUrls?`: `string`[]; `dtBonus?`: `string`; `isValid?`: `boolean`; `isValidDt?`: `string`; `reversalAmount?`: `number`; `penaltyAmount?`: `number`; \}[] | Удержания | [types/reports.types.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/reports.types.ts#L261) |
| `data.total` | `number` | Количество удержаний в отчёте (без учёта limit/offset) | [types/reports.types.ts:300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/reports.types.ts#L300) |

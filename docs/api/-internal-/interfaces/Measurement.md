[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Measurement

# Interface: Measurement

Defined in: [types/reports.types.ts:300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/reports.types.ts#L300)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `reports`: \{ `nmId?`: `number`; `subject?`: `string`; `dimId?`: `number`; `prcOver?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `volumeSup?`: `number`; `widthSup?`: `number`; `lengthSup?`: `number`; `heightSup?`: `number`; `photoUrls?`: `string`[]; `dt?`: `string`; `dateStart?`: `string`; `dateEnd?`: `string`; \}[]; `totalCount`: `number`; \} | Данные ответа | [types/reports.types.ts:302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/reports.types.ts#L302) |
| `data.reports` | \{ `nmId?`: `number`; `subject?`: `string`; `dimId?`: `number`; `prcOver?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `volumeSup?`: `number`; `widthSup?`: `number`; `lengthSup?`: `number`; `heightSup?`: `number`; `photoUrls?`: `string`[]; `dt?`: `string`; `dateStart?`: `string`; `dateEnd?`: `string`; \}[] | Замеры | [types/reports.types.ts:304](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/reports.types.ts#L304) |
| `data.totalCount` | `number` | Количество замеров в отчёте | [types/reports.types.ts:339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/reports.types.ts#L339) |

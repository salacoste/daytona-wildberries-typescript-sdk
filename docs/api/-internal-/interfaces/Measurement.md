[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Measurement

# Interface: Measurement

Defined in: [types/reports.types.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/reports.types.ts#L308)

WHM (Warehouse Measurements) response type for warehouse measurement reports

## See

EPIC 43 - Updated to match swagger WHM schema (removed stale fields)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `reports`: \{ `nmId?`: `number`; `subjectName?`: `string`; `dimId?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `photoUrls?`: `string`[]; `dt?`: `string`; \}[]; `total`: `number`; \} | Данные ответа | [types/reports.types.ts:310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/reports.types.ts#L310) |
| `data.reports` | \{ `nmId?`: `number`; `subjectName?`: `string`; `dimId?`: `number`; `volume?`: `number`; `width?`: `number`; `length?`: `number`; `height?`: `number`; `photoUrls?`: `string`[]; `dt?`: `string`; \}[] | Замеры | [types/reports.types.ts:312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/reports.types.ts#L312) |
| `data.total` | `number` | Количество замеров в отчёте (без учёта limit/offset) | [types/reports.types.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/reports.types.ts#L333) |

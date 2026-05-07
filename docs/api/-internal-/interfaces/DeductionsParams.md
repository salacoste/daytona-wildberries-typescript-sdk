[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DeductionsParams

# Interface: DeductionsParams

Defined in: [types/reports.types.ts:835](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/reports.types.ts#L835)

Parameters for getDeductions

## See

EPIC 44 - Request params for new deductions endpoint

## Indexable

```ts
[key: string]: string | number | undefined
```

Index signature for Record<string, unknown> compatibility

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:839](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/reports.types.ts#L839) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:841](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/reports.types.ts#L841) |
| <a id="sort"></a> `sort?` | `"nmId"` \| `"dtBonus"` \| `"bonusSumm"` | Поле сортировки | [types/reports.types.ts:843](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/reports.types.ts#L843) |
| <a id="order"></a> `order?` | `"desc"` \| `"asc"` | Направление сортировки | [types/reports.types.ts:845](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/reports.types.ts#L845) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:847](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/reports.types.ts#L847) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:849](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/reports.types.ts#L849) |

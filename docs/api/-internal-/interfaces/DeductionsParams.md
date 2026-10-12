[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DeductionsParams

# Interface: DeductionsParams

Defined in: [types/reports.types.ts:927](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/reports.types.ts#L927)

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
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:931](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/reports.types.ts#L931) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:933](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/reports.types.ts#L933) |
| <a id="sort"></a> `sort?` | `"nmId"` \| `"dtBonus"` \| `"bonusSumm"` | Поле сортировки | [types/reports.types.ts:935](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/reports.types.ts#L935) |
| <a id="order"></a> `order?` | `"asc"` \| `"desc"` | Направление сортировки | [types/reports.types.ts:937](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/reports.types.ts#L937) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:939](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/reports.types.ts#L939) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:941](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/reports.types.ts#L941) |

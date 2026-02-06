[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DeductionsParams

# Interface: DeductionsParams

Defined in: [types/reports.types.ts:867](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L867)

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
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:871](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L871) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:873](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L873) |
| <a id="sort"></a> `sort?` | `"nmId"` \| `"dtBonus"` \| `"bonusSumm"` | Поле сортировки | [types/reports.types.ts:875](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L875) |
| <a id="order"></a> `order?` | `"desc"` \| `"asc"` | Направление сортировки | [types/reports.types.ts:877](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L877) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:879](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L879) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:881](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L881) |

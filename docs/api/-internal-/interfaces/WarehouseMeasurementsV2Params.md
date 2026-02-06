[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WarehouseMeasurementsV2Params

# Interface: WarehouseMeasurementsV2Params

Defined in: [types/reports.types.ts:850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L850)

Parameters for getWarehouseMeasurementsV2

## See

EPIC 44 - Request params for new warehouse-measurements endpoint

## Indexable

```ts
[key: string]: string | number | undefined
```

Index signature for Record<string, unknown> compatibility

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала периода (ISO 8601) | [types/reports.types.ts:854](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L854) |
| <a id="dateto"></a> `dateTo` | `string` | Дата окончания периода (ISO 8601, обязательный) | [types/reports.types.ts:856](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L856) |
| <a id="limit"></a> `limit` | `number` | Количество записей в ответе (max 1000) | [types/reports.types.ts:858](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L858) |
| <a id="offset"></a> `offset?` | `number` | Количество записей для пропуска (default 0) | [types/reports.types.ts:860](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L860) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WarehouseMeasurementsParams

# Interface: WarehouseMeasurementsParams

Defined in: [types/reports.types.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L440)

Parameters for warehouse measurements report

## See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `string` | Start date (optional, defaults to first data date) | [types/reports.types.ts:442](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L442) |
| <a id="dateto"></a> `dateTo` | `string` | End date (required) | [types/reports.types.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L444) |
| <a id="tab"></a> `tab` | `"penalty"` \| `"measurement"` | Tab type: 'penalty' | 'measurement' | [types/reports.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L446) |
| <a id="limit"></a> `limit?` | `number` | Number of records to return (default: 1000) | [types/reports.types.ts:448](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L448) |

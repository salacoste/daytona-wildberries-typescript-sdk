[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportGroupedHistoryRequest

# Interface: NmReportGroupedHistoryRequest

Defined in: [types/analytics.types.ts:564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L564)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="objectids"></a> `objectIDs?` | `number`[] | ID предметов | [types/analytics.types.ts:566](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L566) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Бренды | [types/analytics.types.ts:568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L568) |
| <a id="tagids"></a> `tagIDs?` | `number`[] | ID ярлыков | [types/analytics.types.ts:570](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L570) |
| <a id="period"></a> `period` | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:572](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L572) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:574](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L574) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:576](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L576) |
| <a id="timezone"></a> `timezone?` | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:579](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L579) |
| <a id="aggregationlevel"></a> `aggregationLevel?` | `string` | Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням. <br> Доступные уровни агрегации `day`, `week` | [types/analytics.types.ts:581](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L581) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupedHistoryRequest

# Interface: SalesFunnelGroupedHistoryRequest

Defined in: [types/analytics.types.ts:1700](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1700)

Запрос сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1702](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1702) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:1704](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1704) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:1706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1706) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:1708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1708) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1710) |
| <a id="aggregationlevel"></a> `aggregationLevel?` | [`AggregationLevel`](../type-aliases/AggregationLevel.md) | Тип агрегации | [types/analytics.types.ts:1712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L1712) |

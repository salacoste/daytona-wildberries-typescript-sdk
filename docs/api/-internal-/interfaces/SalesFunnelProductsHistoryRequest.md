[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsHistoryRequest

# Interface: SalesFunnelProductsHistoryRequest

Defined in: [types/analytics.types.ts:1688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1688)

Запрос истории по товарам воронки продаж v3 (Swagger: ProductHistoryRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1690](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1690) |
| <a id="nmids"></a> `nmIds` | `number`[] | Артикулы WB | [types/analytics.types.ts:1692](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1692) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1694](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1694) |
| <a id="aggregationlevel"></a> `aggregationLevel?` | [`AggregationLevel`](../type-aliases/AggregationLevel.md) | Тип агрегации | [types/analytics.types.ts:1696](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/analytics.types.ts#L1696) |

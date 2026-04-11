[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsHistoryRequest

# Interface: SalesFunnelProductsHistoryRequest

Defined in: [types/analytics.types.ts:1453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/analytics.types.ts#L1453)

Запрос истории по товарам воронки продаж v3 (Swagger: ProductHistoryRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/analytics.types.ts#L1455) |
| <a id="nmids"></a> `nmIds` | `number`[] | Артикулы WB | [types/analytics.types.ts:1457](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/analytics.types.ts#L1457) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1459](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/analytics.types.ts#L1459) |
| <a id="aggregationlevel"></a> `aggregationLevel?` | [`AggregationLevel`](../type-aliases/AggregationLevel.md) | Тип агрегации | [types/analytics.types.ts:1461](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/analytics.types.ts#L1461) |

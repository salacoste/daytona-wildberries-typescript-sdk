[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsHistoryRequest

# Interface: SalesFunnelProductsHistoryRequest

Defined in: [types/analytics.types.ts:1688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/analytics.types.ts#L1688)

Запрос истории по товарам воронки продаж v3 (Swagger: ProductHistoryRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1690](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/analytics.types.ts#L1690) |
| <a id="nmids"></a> `nmIds` | `number`[] | Артикулы WB | [types/analytics.types.ts:1692](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/analytics.types.ts#L1692) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1694](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/analytics.types.ts#L1694) |
| <a id="aggregationlevel"></a> `aggregationLevel?` | [`AggregationLevel`](../type-aliases/AggregationLevel.md) | Тип агрегации | [types/analytics.types.ts:1696](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/analytics.types.ts#L1696) |

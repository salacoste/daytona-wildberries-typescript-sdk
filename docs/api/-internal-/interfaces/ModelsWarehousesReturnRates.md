[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsWarehousesReturnRates

# Interface: ModelsWarehousesReturnRates

Defined in: [types/tariffs.types.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/tariffs.types.ts#L80)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="dtnextdeliverydumpkgt"></a> `dtNextDeliveryDumpKgt?` | `string` | Дата начала следующего тарифа при грузовой доставке | [types/tariffs.types.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/tariffs.types.ts#L82) |
| <a id="dtnextdeliverydumpsrg"></a> `dtNextDeliveryDumpSrg?` | `string` | Дата начала следующего тарифа для неопознанных товаров | [types/tariffs.types.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/tariffs.types.ts#L84) |
| <a id="dtnextdeliverydumpsup"></a> `dtNextDeliveryDumpSup?` | `string` | Дата начала следующего тарифа при обычной доставке | [types/tariffs.types.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/tariffs.types.ts#L86) |
| <a id="warehouselist"></a> `warehouseList?` | [`ModelsWarehouseReturnRates`](ModelsWarehouseReturnRates.md)[] | Тарифы на возврат, сгруппированные по складам: - стоимость возврата брака и возврата по инициативе продавца при грузовой доставке. - стоимость возврата неопознанного складом товара. - стоимость возврата брака, возврата по инициативе продавца и автовозвратов Маркетплейс (в пункт выдачи и обратно). Можно получить стоимость возврата в пункт выдачи (ПВЗ) и обратной логистики — если продавец не забрал товары из пункта выдачи за 7 дней. | [types/tariffs.types.ts:88](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/tariffs.types.ts#L88) |

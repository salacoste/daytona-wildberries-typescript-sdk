[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsRequest

# Interface: SalesFunnelProductsRequest

Defined in: [types/analytics.types.ts:1429](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1429)

Запрос списка товаров воронки продаж v3 (Swagger: ProductsRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1431) |
| <a id="pastperiod"></a> `pastPeriod?` | [`DatePeriod`](DatePeriod.md) | Период для сравнения | [types/analytics.types.ts:1433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1433) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Артикулы WB | [types/analytics.types.ts:1435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1435) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:1437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1437) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:1439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1439) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:1441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1441) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1443) |
| <a id="orderby"></a> `orderBy?` | [`SalesFunnelOrderBy`](SalesFunnelOrderBy.md) | Параметры сортировки | [types/analytics.types.ts:1445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1445) |
| <a id="limit"></a> `limit?` | `number` | Количество карточек товара в ответе | [types/analytics.types.ts:1447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1447) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить | [types/analytics.types.ts:1449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L1449) |

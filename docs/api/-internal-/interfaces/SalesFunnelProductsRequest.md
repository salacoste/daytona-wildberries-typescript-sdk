[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsRequest

# Interface: SalesFunnelProductsRequest

Defined in: [types/analytics.types.ts:1664](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1664)

Запрос списка товаров воронки продаж v3 (Swagger: ProductsRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1666) |
| <a id="pastperiod"></a> `pastPeriod?` | [`DatePeriod`](DatePeriod.md) | Период для сравнения | [types/analytics.types.ts:1668](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1668) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Артикулы WB | [types/analytics.types.ts:1670](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1670) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:1672](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1672) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:1674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1674) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:1676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1676) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1678](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1678) |
| <a id="orderby"></a> `orderBy?` | [`SalesFunnelOrderBy`](SalesFunnelOrderBy.md) | Параметры сортировки | [types/analytics.types.ts:1680](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1680) |
| <a id="limit"></a> `limit?` | `number` | Количество карточек товара в ответе | [types/analytics.types.ts:1682](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1682) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить | [types/analytics.types.ts:1684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1684) |

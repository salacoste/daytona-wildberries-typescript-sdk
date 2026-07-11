[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsRequest

# Interface: SalesFunnelProductsRequest

Defined in: [types/analytics.types.ts:1488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1488)

Запрос списка товаров воронки продаж v3 (Swagger: ProductsRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1490](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1490) |
| <a id="pastperiod"></a> `pastPeriod?` | [`DatePeriod`](DatePeriod.md) | Период для сравнения | [types/analytics.types.ts:1492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1492) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Артикулы WB | [types/analytics.types.ts:1494](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1494) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:1496](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1496) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:1498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1498) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:1500](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1500) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1502](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1502) |
| <a id="orderby"></a> `orderBy?` | [`SalesFunnelOrderBy`](SalesFunnelOrderBy.md) | Параметры сортировки | [types/analytics.types.ts:1504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1504) |
| <a id="limit"></a> `limit?` | `number` | Количество карточек товара в ответе | [types/analytics.types.ts:1506](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1506) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить | [types/analytics.types.ts:1508](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1508) |

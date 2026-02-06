[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsRequest

# Interface: SalesFunnelProductsRequest

Defined in: [types/analytics.types.ts:1754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1754)

Запрос списка товаров воронки продаж v3 (Swagger: ProductsRequest)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="selectedperiod"></a> `selectedPeriod` | [`DatePeriod`](DatePeriod.md) | Запрашиваемый период | [types/analytics.types.ts:1756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1756) |
| <a id="pastperiod"></a> `pastPeriod?` | [`DatePeriod`](DatePeriod.md) | Период для сравнения | [types/analytics.types.ts:1758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1758) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Артикулы WB | [types/analytics.types.ts:1760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1760) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:1762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1762) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:1764](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1764) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:1766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1766) |
| <a id="skipdeletednm"></a> `skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:1768](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1768) |
| <a id="orderby"></a> `orderBy?` | [`SalesFunnelOrderBy`](SalesFunnelOrderBy.md) | Параметры сортировки | [types/analytics.types.ts:1770](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1770) |
| <a id="limit"></a> `limit?` | `number` | Количество карточек товара в ответе | [types/analytics.types.ts:1772](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1772) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить | [types/analytics.types.ts:1774](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1774) |

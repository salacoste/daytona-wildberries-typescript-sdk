[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchClusterStatEntry

# Interface: SearchClusterStatEntry

Defined in: [types/promotion.types.ts:2096](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2096)

Statistics entry for a single search cluster

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="norm_query"></a> `norm_query` | `string` | Search cluster (normalized query) | [types/promotion.types.ts:2098](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2098) |
| <a id="views"></a> `views` | `number` | Number of views | [types/promotion.types.ts:2100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2100) |
| <a id="clicks"></a> `clicks` | `number` | Number of clicks | [types/promotion.types.ts:2102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2102) |
| <a id="atbs"></a> `atbs` | `number` | Number of add-to-basket actions | [types/promotion.types.ts:2104](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2104) |
| <a id="orders"></a> `orders` | `number` | Number of orders | [types/promotion.types.ts:2106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2106) |
| <a id="ctr"></a> `ctr` | `number` | Click-through rate (%) | [types/promotion.types.ts:2108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2108) |
| <a id="cpc"></a> `cpc` | `number` | Cost per click (RUB) | [types/promotion.types.ts:2110](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2110) |
| <a id="cpm"></a> `cpm` | `number` | Cost per mille - cost per 1000 impressions (RUB) | [types/promotion.types.ts:2112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2112) |
| <a id="avg_pos"></a> `avg_pos` | `number` | Average position on search results page | [types/promotion.types.ts:2114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2114) |
| <a id="shks"></a> `shks?` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:2116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2116) |
| <a id="spend"></a> `spend?` | `number` | Затраты на продвижение товара в поисковом кластере, ₽ | [types/promotion.types.ts:2118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2118) |
| <a id="currency"></a> `currency?` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). | [types/promotion.types.ts:2122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2122) |

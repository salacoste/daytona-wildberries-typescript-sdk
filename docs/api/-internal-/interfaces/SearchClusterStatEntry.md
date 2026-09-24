[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchClusterStatEntry

# Interface: SearchClusterStatEntry

Defined in: [types/promotion.types.ts:2113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2113)

Statistics entry for a single search cluster

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="norm_query"></a> `norm_query` | `string` | Search cluster (normalized query) | [types/promotion.types.ts:2115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2115) |
| <a id="views"></a> `views` | `number` | Number of views | [types/promotion.types.ts:2117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2117) |
| <a id="clicks"></a> `clicks` | `number` | Number of clicks | [types/promotion.types.ts:2119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2119) |
| <a id="atbs"></a> `atbs` | `number` | Number of add-to-basket actions | [types/promotion.types.ts:2121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2121) |
| <a id="orders"></a> `orders` | `number` | Number of orders | [types/promotion.types.ts:2123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2123) |
| <a id="ctr"></a> `ctr` | `number` | Click-through rate (%) | [types/promotion.types.ts:2125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2125) |
| <a id="cpc"></a> `cpc` | `number` | Cost per click (RUB) | [types/promotion.types.ts:2127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2127) |
| <a id="cpm"></a> `cpm` | `number` | Cost per mille - cost per 1000 impressions (RUB) | [types/promotion.types.ts:2129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2129) |
| <a id="avg_pos"></a> `avg_pos` | `number` | Average position on search results page | [types/promotion.types.ts:2131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2131) |
| <a id="shks"></a> `shks?` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:2133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2133) |
| <a id="spend"></a> `spend?` | `number` | Затраты на продвижение товара в поисковом кластере, ₽ | [types/promotion.types.ts:2135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2135) |
| <a id="currency"></a> `currency?` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). | [types/promotion.types.ts:2139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2139) |

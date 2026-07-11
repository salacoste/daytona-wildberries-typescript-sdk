[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelHistory

# Interface: SalesFunnelHistory

Defined in: [types/analytics.types.ts:1673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1673)

Запись истории v3 (Swagger: History) — использует `date` вместо `dt`

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date` | `string` | Дата сбора статистики | [types/analytics.types.ts:1675](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1675) |
| <a id="opencount"></a> `openCount` | `number` | Количество переходов в карточку товара | [types/analytics.types.ts:1677](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1677) |
| <a id="cartcount"></a> `cartCount` | `number` | Положили в корзину, шт. | [types/analytics.types.ts:1679](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1679) |
| <a id="ordercount"></a> `orderCount` | `number` | Заказали товаров, шт. | [types/analytics.types.ts:1681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1681) |
| <a id="ordersum"></a> `orderSum` | `number` | Заказали на сумму | [types/analytics.types.ts:1683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1683) |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | Выкупили товаров, шт. | [types/analytics.types.ts:1685](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1685) |
| <a id="buyoutsum"></a> `buyoutSum` | `number` | Выкупили на сумму | [types/analytics.types.ts:1687](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1687) |
| <a id="buyoutpercent"></a> `buyoutPercent` | `number` | Процент выкупа | [types/analytics.types.ts:1689](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1689) |
| <a id="addtocartconversion"></a> `addToCartConversion` | `number` | Конверсия в корзину, % | [types/analytics.types.ts:1691](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1691) |
| <a id="carttoorderconversion"></a> `cartToOrderConversion` | `number` | Конверсия в заказ, % | [types/analytics.types.ts:1693](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1693) |
| <a id="addtowishlistcount"></a> `addToWishlistCount` | `number` | Количество добавлений товара в Отложенные | [types/analytics.types.ts:1695](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1695) |

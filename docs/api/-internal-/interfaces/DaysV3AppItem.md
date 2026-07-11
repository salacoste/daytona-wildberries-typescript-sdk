[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DaysV3AppItem

# Interface: DaysV3AppItem

Defined in: [types/promotion.types.ts:799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L799)

Элемент статистики по платформе (V3)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="apptype"></a> `appType` | `1` \| `32` \| `64` | Тип платформы: 1 — сайт, 32 — Android, 64 — IOS | [types/promotion.types.ts:801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L801) |
| <a id="views"></a> `views` | `number` | Количество просмотров | [types/promotion.types.ts:803](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L803) |
| <a id="clicks"></a> `clicks` | `number` | Количество кликов | [types/promotion.types.ts:805](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L805) |
| <a id="ctr"></a> `ctr` | `number` | CTR (click-through rate) — отношение числа кликов к количеству показов в процентах | [types/promotion.types.ts:807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L807) |
| <a id="cpc"></a> `cpc` | `number` | Средняя стоимость клика, ₽ | [types/promotion.types.ts:809](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L809) |
| <a id="sum"></a> `sum` | `number` | Затраты, ₽ | [types/promotion.types.ts:811](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L811) |
| <a id="atbs"></a> `atbs` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:813](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L813) |
| <a id="orders"></a> `orders` | `number` | Количество заказов | [types/promotion.types.ts:815](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L815) |
| <a id="cr"></a> `cr` | `number` | CR (conversion rate) — отношение количества заказов к общему количеству кликов | [types/promotion.types.ts:817](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L817) |
| <a id="shks"></a> `shks` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:819](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L819) |
| <a id="sum_price"></a> `sum_price` | `number` | Заказов на сумму, ₽ | [types/promotion.types.ts:821](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L821) |
| <a id="canceled"></a> `canceled` | `number` | Отмены, шт. | [types/promotion.types.ts:823](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L823) |
| <a id="nms"></a> `nms` | [`DaysV3NmItem`](DaysV3NmItem.md)[] | Блок статистики по артикулам WB | [types/promotion.types.ts:825](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L825) |

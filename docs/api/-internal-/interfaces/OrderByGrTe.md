[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderByGrTe

# Interface: OrderByGrTe

Defined in: [types/analytics.types.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L405)

Параметры сортировки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="field"></a> `field` | \| `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` \| `"avgPosition"` \| `"visibility"` | Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара | [types/analytics.types.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L407) |
| <a id="mode"></a> `mode` | `"desc"` \| `"asc"` | Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию | [types/analytics.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L409) |

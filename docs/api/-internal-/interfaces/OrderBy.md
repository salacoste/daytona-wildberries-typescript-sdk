[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderBy

# Interface: OrderBy

Defined in: [types/analytics.types.ts:498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L498)

Параметры сортировки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="field"></a> `field` | \| `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` \| `"avgPosition"` \| `"visibility"` \| `"minPrice"` \| `"maxPrice"` | Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара - `minPrice` — по минимальной цене - `maxPrice` — по максимальной цене | [types/analytics.types.ts:500](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L500) |
| <a id="mode"></a> `mode` | `"asc"` \| `"desc"` | Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию | [types/analytics.types.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L511) |

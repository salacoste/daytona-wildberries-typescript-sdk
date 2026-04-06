[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderBy

# Interface: OrderBy

Defined in: [types/analytics.types.ts:474](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L474)

Параметры сортировки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="field"></a> `field` | \| `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` \| `"avgPosition"` \| `"visibility"` \| `"minPrice"` \| `"maxPrice"` | Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара - `minPrice` — по минимальной цене - `maxPrice` — по максимальной цене | [types/analytics.types.ts:476](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L476) |
| <a id="mode"></a> `mode` | `"desc"` \| `"asc"` | Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию | [types/analytics.types.ts:487](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L487) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderByGrTe

# Interface: OrderByGrTe

Defined in: [types/analytics.types.ts:520](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L520)

Параметры сортировки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="field"></a> `field` | \| `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` \| `"avgPosition"` \| `"visibility"` | Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара | [types/analytics.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L522) |
| <a id="mode"></a> `mode` | `"asc"` \| `"desc"` | Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию | [types/analytics.types.ts:531](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L531) |

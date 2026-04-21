[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderByGrTe

# Interface: OrderByGrTe

Defined in: [types/analytics.types.ts:496](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L496)

Параметры сортировки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="field"></a> `field` | \| `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` \| `"avgPosition"` \| `"visibility"` | Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара | [types/analytics.types.ts:498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L498) |
| <a id="mode"></a> `mode` | `"desc"` \| `"asc"` | Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию | [types/analytics.types.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L507) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ResponseWithDate

# Type Alias: ResponseWithDate

```ts
type ResponseWithDate = {
  dates?: string[];
  views?: number;
  clicks?: number;
  ctr?: number;
  cpc?: number;
  sum?: number;
  atbs?: number;
  orders?: number;
  cr?: number;
  shks?: number;
  sum_price?: number;
  days?: Days;
  boosterStats?: BoosterStats;
  advertId?: number;
}[];
```

Defined in: [types/promotion.types.ts:673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L673)

Ответ при запросе с dates

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `dates?` | `string`[] | Даты, за которые нужно получить информацию | [types/promotion.types.ts:675](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L675) |
| `views?` | `number` | Количество просмотров. <br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:677](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L677) |
| `clicks?` | `number` | Количество кликов.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:679](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L679) |
| `ctr?` | `number` | Показатель кликабельности.<br> Отношение числа кликов к количеству показов. Выражается в процентах<br> За все дни, по всем артикулам WB и платформам<br> | [types/promotion.types.ts:681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L681) |
| `cpc?` | `number` | Средняя стоимость клика, ₽.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L683) |
| `sum?` | `number` | Затраты, ₽.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:685](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L685) |
| `atbs?` | `number` | Количество добавлений товаров в корзину.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:687](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L687) |
| `orders?` | `number` | Количество заказов.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:689](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L689) |
| `cr?` | `number` | CR(conversion rate) — это отношение количества заказов к общему количеству посещений кампании.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:691](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L691) |
| `shks?` | `number` | Количество заказанных товаров, шт.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:693](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L693) |
| `sum_price?` | `number` | Заказов на сумму, ₽.<br> За все дни, по всем артикулам WB и платформам | [types/promotion.types.ts:695](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L695) |
| `days?` | [`Days`](Days.md) | - | [types/promotion.types.ts:696](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L696) |
| `boosterStats?` | [`BoosterStats`](BoosterStats.md) | - | [types/promotion.types.ts:697](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L697) |
| `advertId?` | `number` | ID кампании | [types/promotion.types.ts:699](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L699) |

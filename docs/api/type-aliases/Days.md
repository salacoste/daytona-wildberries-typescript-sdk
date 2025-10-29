[Wildberries API TypeScript SDK](../modules.md) / Days

# Type Alias: Days

```ts
type Days = {
  date?: string;
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
  apps?: {
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
     nm?: {
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
        name?: string;
        nmId?: number;
     }[];
     appType?: number;
  }[];
}[];
```

Defined in: [types/promotion.types.ts:544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L544)

Статистка по дням

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `date?` | `string` | Дата, за которую представлены данные | [types/promotion.types.ts:546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L546) |
| `views?` | `number` | Количество просмотров | [types/promotion.types.ts:548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L548) |
| `clicks?` | `number` | Количество кликов | [types/promotion.types.ts:550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L550) |
| `ctr?` | `number` | Показатель кликабельности, отношение числа кликов к количеству показов, % | [types/promotion.types.ts:552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L552) |
| `cpc?` | `number` | Средняя стоимость клика, ₽ | [types/promotion.types.ts:554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L554) |
| `sum?` | `number` | Затраты, ₽ | [types/promotion.types.ts:556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L556) |
| `atbs?` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:558](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L558) |
| `orders?` | `number` | Количество заказов | [types/promotion.types.ts:560](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L560) |
| `cr?` | `number` | CR(conversion rate) — отношение количества заказов к общему количеству посещений кампании | [types/promotion.types.ts:562](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L562) |
| `shks?` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L564) |
| `sum_price?` | `number` | Заказов на сумму, ₽ | [types/promotion.types.ts:566](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L566) |
| `apps?` | \{ `views?`: `number`; `clicks?`: `number`; `ctr?`: `number`; `cpc?`: `number`; `sum?`: `number`; `atbs?`: `number`; `orders?`: `number`; `cr?`: `number`; `shks?`: `number`; `sum_price?`: `number`; `nm?`: \{ `views?`: `number`; `clicks?`: `number`; `ctr?`: `number`; `cpc?`: `number`; `sum?`: `number`; `atbs?`: `number`; `orders?`: `number`; `cr?`: `number`; `shks?`: `number`; `sum_price?`: `number`; `name?`: `string`; `nmId?`: `number`; \}[]; `appType?`: `number`; \}[] | Блок информации о платформе | [types/promotion.types.ts:568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/promotion.types.ts#L568) |

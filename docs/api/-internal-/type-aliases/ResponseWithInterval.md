[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ResponseWithInterval

# Type Alias: ResponseWithInterval

```ts
type ResponseWithInterval = {
  interval?: {
     begin?: string;
     end?: string;
  };
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

Defined in: [types/promotion.types.ts:636](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L636)

Ответ при запросе с interval

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `interval?` | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/promotion.types.ts:638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L638) |
| `interval.begin?` | `string` | Начало периода | [types/promotion.types.ts:640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L640) |
| `interval.end?` | `string` | Конец периода | [types/promotion.types.ts:642](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L642) |
| `views?` | `number` | Количество просмотров. <br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:645](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L645) |
| `clicks?` | `number` | Количество кликов.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:647](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L647) |
| `ctr?` | `number` | Показатель кликабельности.<br> Отношение числа кликов к количеству показов. Выражается в процентах.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L649) |
| `cpc?` | `number` | Средняя стоимость клика, ₽.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:651](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L651) |
| `sum?` | `number` | Затраты, ₽.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:653](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L653) |
| `atbs?` | `number` | Количество добавлений товаров в корзину.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:655](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L655) |
| `orders?` | `number` | Количество заказов.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:657](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L657) |
| `cr?` | `number` | CR(conversion rate) — это отношение количества заказов к общему количеству посещений кампании.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L659) |
| `shks?` | `number` | Количество заказанных товаров, шт.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:661](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L661) |
| `sum_price?` | `number` | Заказов на сумму, ₽<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам | [types/promotion.types.ts:663](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L663) |
| `days?` | [`Days`](Days.md) | - | [types/promotion.types.ts:664](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L664) |
| `boosterStats?` | [`BoosterStats`](BoosterStats.md) | - | [types/promotion.types.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L665) |
| `advertId?` | `number` | ID кампании | [types/promotion.types.ts:667](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/promotion.types.ts#L667) |

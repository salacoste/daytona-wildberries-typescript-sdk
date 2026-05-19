[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableGroupField

# Type Alias: TableGroupField

```ts
type TableGroupField = 
  | "ordersCount"
  | "ordersSum"
  | "avgOrders"
  | "buyoutCount"
  | "buyoutSum"
  | "buyoutPercent"
  | "stockCount"
  | "stockSum"
  | "saleRate"
  | "avgStockTurnover"
  | "toClientCount"
  | "fromClientCount"
  | "minPrice"
  | "maxPrice"
  | "officeMissingTime"
  | "lostOrdersCount"
  | "lostOrdersSum"
  | "lostBuyoutsCount"
  | "lostBuyoutsSum";
```

Defined in: [types/analytics.types.ts:982](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L982)

Cортировка по полю:
 - `ordersCount` — Заказы, шт.
 - `ordersSum` — Заказы, сумма
 - `avgOrders` — Среднее количество заказов в день
 - `buyoutCount` — Выкупы, шт.
 - `buyoutSum` — Выкупы, сумма
 - `buyoutPercent` — Процент выкупа
 - `stockCount` — Остатки на текущий день, шт.
 - `stockSum` — Стоимость остатков на текущий день
 - `saleRate` — Оборачиваемость текущих остатков
 - `avgStockTurnover` — Оборачиваемость средних остатков
 - `toClientCount` — В пути к клиенту, шт.
 - `fromClientCount` — В пути от клиента, шт.
 - `minPrice` — Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
 - `maxPrice` — Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
 - `officeMissingTime` — Время отсутствия товара на складе
 - `lostOrdersCount` — Упущенные заказы, шт.
 - `lostOrdersSum` — Упущенные заказы, сумма
 - `lostBuyoutsCount` — Упущенные выкупы, шт.
 - `lostBuyoutsSum` — Упущенные выкупы, сумма

## Example

```json
"avgOrders"
```

[Wildberries API TypeScript SDK](../modules.md) / Goods

# Type Alias: Goods

```ts
type Goods = Good[];
```

Defined in: [types/products.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L183)

Товары, цены и скидки для них. Максимум 1 000 товаров. Цена и скидка не могут быть пустыми одновременно.

Если новая цена со скидкой будет хотя бы в 3 раза меньше старой, она попадёт в [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) и товар будет продаваться по старой цене. Ошибка об этом будет в ответах методов состояний загрузок.

Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine)

[Wildberries API TypeScript SDK](../modules.md) / Goods

# Type Alias: Goods

```ts
type Goods = Good[];
```

Defined in: [types/products.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L183)

Товары, цены и скидки для них. Максимум 1 000 товаров. Цена и скидка не могут быть пустыми одновременно.

Если новая цена со скидкой будет хотя бы в 3 раза меньше старой, она попадёт в [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) и товар будет продаваться по старой цене. Ошибка об этом будет в ответах методов состояний загрузок.

Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine)

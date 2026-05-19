[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Goods

# Type Alias: Goods

```ts
type Goods = Good[];
```

Defined in: [types/products.types.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L179)

Товары, цены и скидки для них. Максимум 1 000 товаров. Цена и скидка не могут быть пустыми одновременно.

Если новая цена со скидкой будет хотя бы в 3 раза меньше старой, она попадёт в [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) и товар будет продаваться по старой цене. Ошибка об этом будет в ответах методов состояний загрузок.

Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine)

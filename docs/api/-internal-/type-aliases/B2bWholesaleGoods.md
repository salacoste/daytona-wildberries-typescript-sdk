[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / B2bWholesaleGoods

# Type Alias: B2bWholesaleGoods

```ts
type B2bWholesaleGoods = B2bWholesaleGood[];
```

Defined in: [types/products.types.ts:227](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L227)

Товары и пороги оптовых скидок для B2B-продаж. Максимум 1 000 товаров.

Body for POST /api/discounts-prices/v1/upload/task/b2b/wholesale.

Note: This endpoint lives on the `/api/discounts-prices/v1/` path (v1) — a
different prefix from the existing `/api/v2/upload/task*` methods. Auth accepts
a Personal OR Service token for the Prices & Discounts category.

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsHistoryResponse

# Type Alias: SalesFunnelProductsHistoryResponse

```ts
type SalesFunnelProductsHistoryResponse = {
  product: SalesFunnelHistoryProduct;
  history: SalesFunnelHistory[];
}[];
```

Defined in: [types/analytics.types.ts:1888](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1888)

Ответ истории по товарам воронки продаж v3 (Swagger: ProductHistoryResponse)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `product` | [`SalesFunnelHistoryProduct`](../interfaces/SalesFunnelHistoryProduct.md) | Карточка товара | [types/analytics.types.ts:1890](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1890) |
| `history` | [`SalesFunnelHistory`](../interfaces/SalesFunnelHistory.md)[] | Статистика за период | [types/analytics.types.ts:1892](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1892) |

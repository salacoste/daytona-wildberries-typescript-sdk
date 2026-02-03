[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsHistoryResponse

# Type Alias: SalesFunnelProductsHistoryResponse

```ts
type SalesFunnelProductsHistoryResponse = {
  product: SalesFunnelHistoryProduct;
  history: SalesFunnelHistory[];
}[];
```

Defined in: [types/analytics.types.ts:1888](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L1888)

Ответ истории по товарам воронки продаж v3 (Swagger: ProductHistoryResponse)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `product` | [`SalesFunnelHistoryProduct`](../interfaces/SalesFunnelHistoryProduct.md) | Карточка товара | [types/analytics.types.ts:1890](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L1890) |
| `history` | [`SalesFunnelHistory`](../interfaces/SalesFunnelHistory.md)[] | Статистика за период | [types/analytics.types.ts:1892](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L1892) |

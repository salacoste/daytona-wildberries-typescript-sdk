[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductsHistoryResponse

# Type Alias: SalesFunnelProductsHistoryResponse

```ts
type SalesFunnelProductsHistoryResponse = {
  product: SalesFunnelHistoryProduct;
  history: SalesFunnelHistory[];
}[];
```

Defined in: [types/analytics.types.ts:1978](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1978)

Ответ истории по товарам воронки продаж v3 (Swagger: ProductHistoryResponse)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `product` | [`SalesFunnelHistoryProduct`](../interfaces/SalesFunnelHistoryProduct.md) | Карточка товара | [types/analytics.types.ts:1980](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1980) |
| `history` | [`SalesFunnelHistory`](../interfaces/SalesFunnelHistory.md)[] | Статистика за период | [types/analytics.types.ts:1982](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1982) |

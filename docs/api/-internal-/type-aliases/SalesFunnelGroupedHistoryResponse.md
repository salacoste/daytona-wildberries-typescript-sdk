[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupedHistoryResponse

# Type Alias: SalesFunnelGroupedHistoryResponse

```ts
type SalesFunnelGroupedHistoryResponse = {
  product: SalesFunnelHistoryProduct;
  history: SalesFunnelHistory[];
}[];
```

Defined in: [types/analytics.types.ts:1896](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1896)

Ответ сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryResponse)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `product` | [`SalesFunnelHistoryProduct`](../interfaces/SalesFunnelHistoryProduct.md) | Карточка товара | [types/analytics.types.ts:1898](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1898) |
| `history` | [`SalesFunnelHistory`](../interfaces/SalesFunnelHistory.md)[] | Статистика за период | [types/analytics.types.ts:1900](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1900) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupedHistoryResponse

# Type Alias: SalesFunnelGroupedHistoryResponse

```ts
type SalesFunnelGroupedHistoryResponse = {
  product: SalesFunnelHistoryProduct;
  history: SalesFunnelHistory[];
}[];
```

Defined in: [types/analytics.types.ts:1986](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1986)

Ответ сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryResponse)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `product` | [`SalesFunnelHistoryProduct`](../interfaces/SalesFunnelHistoryProduct.md) | Карточка товара | [types/analytics.types.ts:1988](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1988) |
| `history` | [`SalesFunnelHistory`](../interfaces/SalesFunnelHistory.md)[] | Статистика за период | [types/analytics.types.ts:1990](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1990) |

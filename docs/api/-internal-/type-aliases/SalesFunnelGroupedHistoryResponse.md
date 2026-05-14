[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupedHistoryResponse

# Type Alias: SalesFunnelGroupedHistoryResponse

```ts
type SalesFunnelGroupedHistoryResponse = {
  product: SalesFunnelHistoryProduct;
  history: SalesFunnelHistory[];
  currency?: string;
}[];
```

Defined in: [types/analytics.types.ts:1665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L1665)

Ответ сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryResponse)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `product` | [`SalesFunnelHistoryProduct`](../interfaces/SalesFunnelHistoryProduct.md) | Карточка товара | [types/analytics.types.ts:1667](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L1667) |
| `history` | [`SalesFunnelHistory`](../interfaces/SalesFunnelHistory.md)[] | Статистика за период | [types/analytics.types.ts:1669](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L1669) |
| `currency?` | `string` | Валюта (например, "RUB") | [types/analytics.types.ts:1671](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L1671) |

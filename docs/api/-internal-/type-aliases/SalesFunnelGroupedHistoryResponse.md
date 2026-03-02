[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupedHistoryResponse

# Type Alias: SalesFunnelGroupedHistoryResponse

```ts
type SalesFunnelGroupedHistoryResponse = {
  product: SalesFunnelHistoryProduct;
  history: SalesFunnelHistory[];
}[];
```

Defined in: [types/analytics.types.ts:1661](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1661)

Ответ сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryResponse)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `product` | [`SalesFunnelHistoryProduct`](../interfaces/SalesFunnelHistoryProduct.md) | Карточка товара | [types/analytics.types.ts:1663](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1663) |
| `history` | [`SalesFunnelHistory`](../interfaces/SalesFunnelHistory.md)[] | Статистика за период | [types/analytics.types.ts:1665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L1665) |

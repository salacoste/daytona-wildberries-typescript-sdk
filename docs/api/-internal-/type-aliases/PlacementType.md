[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlacementType

# Type Alias: PlacementType

```ts
type PlacementType = "combined" | "search" | "recommendation";
```

Defined in: [types/promotion.types.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L24)

Места размещения (перечисление WB `PlacementType`):
 - `search` — поиск
 - `recommendation` — рекомендации
 - `combined` — поиск и рекомендации

Примечание: единственное число `recommendation` соответствует компоненту `PlacementType`
в WB OpenAPI etalon (08-promotion.yaml:4536-4541). Не путать с полем `placement` ответа
`updateBids`, которое использует множественное число `recommendations`.

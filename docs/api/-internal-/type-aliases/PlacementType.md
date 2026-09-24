[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlacementType

# Type Alias: PlacementType

```ts
type PlacementType = "combined" | "search" | "recommendation";
```

Defined in: [types/promotion.types.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L24)

Места размещения (перечисление WB `PlacementType`):
 - `search` — поиск
 - `recommendation` — рекомендации
 - `combined` — поиск и рекомендации

Примечание: единственное число `recommendation` соответствует компоненту `PlacementType`
в WB OpenAPI etalon (08-promotion.yaml:4536-4541). Не путать с полем `placement` ответа
`updateBids`, которое использует множественное число `recommendations`.

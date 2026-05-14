[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AvailabilityFilters

# Type Alias: AvailabilityFilters

```ts
type AvailabilityFilters = (
  | "deficient"
  | "actual"
  | "balanced"
  | "nonActual"
  | "nonLiquid"
  | "invalidData")[];
```

Defined in: [types/analytics.types.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L938)

Доступность товара (массив фильтров):
- `deficient` — Дефицит
- `actual` — Актуальный
- `balanced` — Баланс
- `nonActual` — Неактуальный
- `nonLiquid` — Неликвид
- `invalidData` — Не рассчитано

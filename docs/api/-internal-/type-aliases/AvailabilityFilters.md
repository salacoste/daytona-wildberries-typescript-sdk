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

Defined in: [types/analytics.types.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/analytics.types.ts#L938)

Доступность товара (массив фильтров):
- `deficient` — Дефицит
- `actual` — Актуальный
- `balanced` — Баланс
- `nonActual` — Неактуальный
- `nonLiquid` — Неликвид
- `invalidData` — Не рассчитано

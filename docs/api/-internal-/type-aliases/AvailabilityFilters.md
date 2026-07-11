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

Defined in: [types/analytics.types.ts:997](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L997)

Доступность товара (массив фильтров):
- `deficient` — Дефицит
- `actual` — Актуальный
- `balanced` — Баланс
- `nonActual` — Неактуальный
- `nonLiquid` — Неликвид
- `invalidData` — Не рассчитано

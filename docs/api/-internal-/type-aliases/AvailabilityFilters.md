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

Defined in: [types/analytics.types.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/analytics.types.ts#L938)

Доступность товара (массив фильтров):
- `deficient` — Дефицит
- `actual` — Актуальный
- `balanced` — Баланс
- `nonActual` — Неактуальный
- `nonLiquid` — Неликвид
- `invalidData` — Не рассчитано

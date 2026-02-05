[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AvailabilityFilters

# Type Alias: AvailabilityFilters

```ts
type AvailabilityFilters = 
  | "deficient"
  | "actual"
  | "balanced"
  | "nonActual"
  | "nonLiquid"
  | "invalidData"[];
```

Defined in: [types/analytics.types.ts:1174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1174)

Доступность товара:
 - `deficient` — Дефицит
 - `actual` — Актуальный
 - `balanced` — Баланс
 - `nonActual` — Неактуальный
 - `nonLiquid` — Неликвид
 - `invalidData` — Не рассчитано

## Example

```json
[
 "deficient",
 "balanced"
]
```

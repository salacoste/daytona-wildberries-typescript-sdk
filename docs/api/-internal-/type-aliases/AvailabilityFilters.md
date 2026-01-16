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

Defined in: [types/analytics.types.ts:1152](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1152)

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

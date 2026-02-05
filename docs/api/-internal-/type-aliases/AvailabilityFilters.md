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

Defined in: [types/analytics.types.ts:1174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/analytics.types.ts#L1174)

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

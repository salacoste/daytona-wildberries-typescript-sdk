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

Defined in: [types/analytics.types.ts:1174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L1174)

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

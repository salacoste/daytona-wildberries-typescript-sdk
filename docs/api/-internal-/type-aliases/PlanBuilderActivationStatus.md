[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderActivationStatus

# Type Alias: PlanBuilderActivationStatus

```ts
type PlanBuilderActivationStatus = "active" | "pendingActivation" | "pendingDeactivation";
```

Defined in: [types/general.types.ts:357](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L357)

Activation status of a Plan Builder (Tariff Constructor) option or package.

- `'active'` — active
- `'pendingActivation'` — activated, will start working at 00:00 the next day
- `'pendingDeactivation'` — deactivated, will stop working at 00:00 the next day

## Since

3.16.0

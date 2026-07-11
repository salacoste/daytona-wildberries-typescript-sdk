[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderActivationStatus

# Type Alias: PlanBuilderActivationStatus

```ts
type PlanBuilderActivationStatus = "active" | "pendingActivation" | "pendingDeactivation";
```

Defined in: [types/general.types.ts:301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L301)

Activation status of a Plan Builder (Tariff Constructor) option or package.

- `'active'` — active
- `'pendingActivation'` — activated, will start working at 00:00 the next day
- `'pendingDeactivation'` — deactivated, will stop working at 00:00 the next day

## Since

3.16.0

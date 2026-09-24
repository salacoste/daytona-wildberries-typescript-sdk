[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderActivationStatus

# Type Alias: PlanBuilderActivationStatus

```ts
type PlanBuilderActivationStatus = "active" | "pendingActivation" | "pendingDeactivation";
```

Defined in: [types/general.types.ts:301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/general.types.ts#L301)

Activation status of a Plan Builder (Tariff Constructor) option or package.

- `'active'` — active
- `'pendingActivation'` — activated, will start working at 00:00 the next day
- `'pendingDeactivation'` — deactivated, will stop working at 00:00 the next day

## Since

3.16.0

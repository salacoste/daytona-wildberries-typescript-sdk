[Wildberries API TypeScript SDK](../modules.md) / ReturnStatus

# Type Alias: ReturnStatus

```ts
type ReturnStatus = "initiated" | "received" | "processed";
```

Defined in: types/returns.types.ts:12

Current state of a return.

NOTE: WB does not expose `'in_transit'` for FBO returns — only the three
states below are available across both FBO and FBS sources. Intermediate
FBO transit states are omitted intentionally.

## Since

v3.10.0

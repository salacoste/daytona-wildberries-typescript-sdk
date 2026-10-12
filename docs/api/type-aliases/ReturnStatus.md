[Wildberries API TypeScript SDK](../modules.md) / ReturnStatus

# Type Alias: ReturnStatus

```ts
type ReturnStatus = "initiated" | "received" | "processed";
```

Defined in: [types/returns.types.ts:12](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L12)

Current state of a return.

NOTE: WB does not expose `'in_transit'` for FBO returns — only the three
states below are available across both FBO and FBS sources. Intermediate
FBO transit states are omitted intentionally.

## Since

v3.10.0

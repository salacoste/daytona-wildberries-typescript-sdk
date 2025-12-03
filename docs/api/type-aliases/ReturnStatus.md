[Wildberries API TypeScript SDK](../modules.md) / ReturnStatus

# Type Alias: ReturnStatus

```ts
type ReturnStatus = 
  | "created"
  | "processing"
  | "canceled"
  | "delivered"
  | "refunded"
  | "closed"
  | "error"
  | "expired"
  | "rejected"
  | "returned"
  | "archived"
  | "draft"
  | "pending"
  | "in_transit"
  | "ready_for_pickup"
  | "awaiting_pickup"
  | "shipped";
```

Defined in: [types/communications.types.ts:2453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2453)

Return status for tracking return request lifecycle

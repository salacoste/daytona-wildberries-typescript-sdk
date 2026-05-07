[Wildberries API TypeScript SDK](../modules.md) / ReturnCategory

# Type Alias: ReturnCategory

```ts
type ReturnCategory = 
  | "cancel_before_shipment"
  | "refusal_at_pvz"
  | "return_after_receipt"
  | "unknown";
```

Defined in: [types/returns.types.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L24)

Categorized return type, derived from order fulfillment path and status history.

- `cancel_before_shipment` — buyer cancelled before the seller shipped
- `refusal_at_pvz` — buyer refused the package at the pickup point
- `return_after_receipt` — buyer accepted the package then initiated a return
- `unknown` — status sequence is ambiguous or unsupported

## Since

v3.10.0

[Wildberries API TypeScript SDK](../modules.md) / SupplierStatus

# Type Alias: SupplierStatus

```ts
type SupplierStatus = "new" | "confirm" | "complete" | "cancel";
```

Defined in: [types/orders-fbs.types.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L41)

Seller-controlled order status

Status transitions:
- new: New assembly task
- confirm: On assembly (added to supply)
- complete: In delivery (supply delivered)
- cancel: Canceled by seller

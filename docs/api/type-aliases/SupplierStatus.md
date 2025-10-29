[Wildberries API TypeScript SDK](../modules.md) / SupplierStatus

# Type Alias: SupplierStatus

```ts
type SupplierStatus = "new" | "confirm" | "complete" | "cancel";
```

Defined in: [types/orders-fbs.types.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L41)

Seller-controlled order status

Status transitions:
- new: New assembly task
- confirm: On assembly (added to supply)
- complete: In delivery (supply delivered)
- cancel: Canceled by seller

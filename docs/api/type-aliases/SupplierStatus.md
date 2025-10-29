[Wildberries API TypeScript SDK](../modules.md) / SupplierStatus

# Type Alias: SupplierStatus

```ts
type SupplierStatus = "new" | "confirm" | "complete" | "cancel";
```

Defined in: [types/orders-fbs.types.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L41)

Seller-controlled order status

Status transitions:
- new: New assembly task
- confirm: On assembly (added to supply)
- complete: In delivery (supply delivered)
- cancel: Canceled by seller

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ShippingPointCargoType

# Type Alias: ShippingPointCargoType

```ts
type ShippingPointCargoType = 1 | 2 | 3;
```

Defined in: [types/orders-fbs.types.ts:1100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1100)

Type of items a shipping point can accept:
- `1` — small-sized items
- `2` — over dimensional cargo (ODC)
- `3` — dimensional cargo+ (CD+)
Maps to swagger schema: ShippingPoint.cargoTypes items

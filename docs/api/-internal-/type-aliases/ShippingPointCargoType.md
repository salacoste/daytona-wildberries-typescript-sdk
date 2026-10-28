[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ShippingPointCargoType

# Type Alias: ShippingPointCargoType

```ts
type ShippingPointCargoType = 1 | 2 | 3;
```

Defined in: [types/orders-fbs.types.ts:1172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1172)

Type of items a shipping point can accept:
- `1` — small-sized items
- `2` — over dimensional cargo (ODC)
- `3` — dimensional cargo+ (CD+)
Maps to swagger schema: ShippingPoint.cargoTypes items

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingType

# Type Alias: SupplyShippingType

```ts
type SupplyShippingType = "selfShipping" | "transportCompany";
```

Defined in: [types/orders-fbs.types.ts:1320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1320)

Type of shipping to the shipping point:
- `selfShipping` — shipping at the seller's expense
- `transportCompany` — delivery via a transport company. For this shipping type the
  electronic waybill ID (ETrN) must also be attached to the supply —
  see `updateSuppliesWaybill()`
Maps to swagger schema: UpdateSupplyShippingMethod.shippingType

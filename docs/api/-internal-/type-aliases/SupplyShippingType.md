[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingType

# Type Alias: SupplyShippingType

```ts
type SupplyShippingType = "selfShipping" | "transportCompany";
```

Defined in: [types/orders-fbs.types.ts:1169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-fbs.types.ts#L1169)

Type of shipping to the shipping point:
- `selfShipping` — shipping at the seller's expense
- `transportCompany` — delivery via a transport company. For this shipping type the
  electronic waybill ID (ETrN) must also be attached to the supply —
  see `updateSuppliesWaybill()`
Maps to swagger schema: UpdateSupplyShippingMethod.shippingType

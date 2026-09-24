[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingType

# Type Alias: SupplyShippingType

```ts
type SupplyShippingType = "selfShipping" | "transportCompany";
```

Defined in: [types/orders-fbs.types.ts:1169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1169)

Type of shipping to the shipping point:
- `selfShipping` — shipping at the seller's expense
- `transportCompany` — delivery via a transport company. For this shipping type the
  electronic waybill ID (ETrN) must also be attached to the supply — WB is still
  developing the corresponding waybill method (`PATCH /api/marketplace/v3/fbs/supplies/waybill`)
Maps to swagger schema: UpdateSupplyShippingMethod.shippingType

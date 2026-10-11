[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingType

# Type Alias: SupplyShippingType

```ts
type SupplyShippingType = "selfShipping" | "transportCompany";
```

Defined in: [types/orders-fbs.types.ts:1169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/orders-fbs.types.ts#L1169)

Type of shipping to the shipping point:
- `selfShipping` — shipping at the seller's expense
- `transportCompany` — delivery via a transport company. For this shipping type the
  electronic waybill ID (ETrN) must also be attached to the supply —
  see `updateSuppliesWaybill()`
Maps to swagger schema: UpdateSupplyShippingMethod.shippingType

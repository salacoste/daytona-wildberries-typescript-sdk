[Wildberries API TypeScript SDK](../modules.md) / WBStatus

# Type Alias: WBStatus

```ts
type WBStatus = 
  | "waiting"
  | "sorted"
  | "sold"
  | "canceled"
  | "canceled_by_client"
  | "declined_by_client"
  | "defect"
  | "ready_for_pickup"
  | "postponed_delivery";
```

Defined in: [types/orders-fbs.types.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/orders-fbs.types.ts#L57)

Wildberries system-controlled order status

Status meanings:
- waiting: Order in progress
- sorted: Order sorted at WB
- sold: Customer received order
- canceled: Order canceled
- canceled_by_client: Customer canceled on pickup
- declined_by_client: Customer canceled (first hour, before assembly)
- defect: Canceled due to defect
- ready_for_pickup: Arrived at pickup point
- postponed_delivery: Delivery postponed

[Wildberries API TypeScript SDK](../modules.md) / DbsTestDeliveryType

# Type Alias: DbsTestDeliveryType

```ts
type DbsTestDeliveryType = "dbs" | "dbsPickupPoint" | "edbs";
```

Defined in: [types/orders-dbs.types.ts:34](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L34)

Delivery model for a test DBS assembly order in the WB sandbox.

The official rendered contract documents `dbs` as the omission default.
The SDK keeps this field optional and does not inject the default into the
serialized request.

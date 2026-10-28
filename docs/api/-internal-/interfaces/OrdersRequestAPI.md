[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrdersRequestAPI

# Interface: OrdersRequestAPI

Defined in: [types/orders-fbs.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L267)

Generic order IDs request body used across multiple endpoints

## Example

```json
{
  "orders": [
    987654321,
    123456789
  ]
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders?` | `number`[] | List of order IDs | [types/orders-fbs.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L269) |

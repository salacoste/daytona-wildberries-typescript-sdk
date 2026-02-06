[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrdersRequestAPI

# Interface: OrdersRequestAPI

Defined in: [types/orders-fbs.types.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/orders-fbs.types.ts#L192)

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
| <a id="orders"></a> `orders?` | `number`[] | List of order IDs | [types/orders-fbs.types.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/orders-fbs.types.ts#L194) |

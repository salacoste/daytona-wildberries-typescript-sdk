[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrdersRequestAPI

# Interface: OrdersRequestAPI

Defined in: [types/orders-fbs.types.ts:220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/orders-fbs.types.ts#L220)

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
| <a id="orders"></a> `orders?` | `number`[] | List of order IDs | [types/orders-fbs.types.ts:222](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/orders-fbs.types.ts#L222) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ApiOrderStatus

# Interface: ApiOrderStatus

Defined in: [types/in-store-pickup.types.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/in-store-pickup.types.ts#L205)

## Example

```json
{
 "supplierStatus": "confirm",
 "wbStatus": "waiting",
 "id": 1234567
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | ID сборочного задания | [types/in-store-pickup.types.ts:207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/in-store-pickup.types.ts#L207) |
| <a id="supplierstatus"></a> `supplierStatus?` | \| `"new"` \| `"confirm"` \| `"cancel"` \| `"prepare"` \| `"receive"` \| `"reject"` \| `"cancel_shelf_life"` | Статус сборочного задания, установленный продавцом | [types/in-store-pickup.types.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/in-store-pickup.types.ts#L209) |
| <a id="wbstatus"></a> `wbStatus?` | \| `"waiting"` \| `"sold"` \| `"canceled"` \| `"canceled_by_client"` \| `"declined_by_client"` \| `"defect"` \| `"ready_for_pickup"` | Статус сборочного задания в системе WB | [types/in-store-pickup.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/in-store-pickup.types.ts#L218) |

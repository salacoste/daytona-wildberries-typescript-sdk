[Wildberries API TypeScript SDK](../modules.md) / GetSuppliesResponse

# Interface: GetSuppliesResponse

Defined in: [types/orders-fbs.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/orders-fbs.types.ts#L322)

Response from getSupplies endpoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next` | `number` | Next pagination cursor 0 means no more pages | [types/orders-fbs.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/orders-fbs.types.ts#L327) |
| <a id="supplies"></a> `supplies` | [`Supply`](Supply.md)[] | Array of supplies | [types/orders-fbs.types.ts:329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/orders-fbs.types.ts#L329) |

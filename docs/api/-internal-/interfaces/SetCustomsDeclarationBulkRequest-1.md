[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetCustomsDeclarationBulkRequest

# Interface: SetCustomsDeclarationBulkRequest

Defined in: [types/orders-dbs.types.ts:562](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L562)

Request body for setCustomsDeclarationBulk

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `customsDeclaration`: `string`; `originCountryCode?`: `number`; \}[] | Array of orders with customs declaration numbers to set | [types/orders-dbs.types.ts:564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L564) |

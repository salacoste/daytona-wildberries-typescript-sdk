[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetCustomsDeclarationBulkRequest

# Interface: SetCustomsDeclarationBulkRequest

Defined in: [types/orders-dbs.types.ts:513](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L513)

Request body for setCustomsDeclarationBulk

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `customsDeclaration`: `string`; `originCountryCode?`: `number`; \}[] | Array of orders with customs declaration numbers to set | [types/orders-dbs.types.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L515) |

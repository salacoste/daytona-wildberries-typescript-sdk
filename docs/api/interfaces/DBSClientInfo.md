[Wildberries API TypeScript SDK](../modules.md) / DBSClientInfo

# Interface: DBSClientInfo

Defined in: [types/orders-dbs.types.ts:176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L176)

Customer contact information for DBS orders
Returned by getClientInfo

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="firstname"></a> `firstName?` | `string` | Customer first name | [types/orders-dbs.types.ts:178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L178) |
| <a id="fullname"></a> `fullName?` | `string` | Customer full name | [types/orders-dbs.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L180) |
| <a id="orderid"></a> `orderID?` | `number` | Order ID | [types/orders-dbs.types.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L182) |
| <a id="phone"></a> `phone?` | `string` | Phone number (without country code) | [types/orders-dbs.types.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L184) |
| <a id="phonecode"></a> `phoneCode?` | `number` | Phone country code | [types/orders-dbs.types.ts:186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L186) |
| <a id="additionalphonecodes"></a> `additionalPhoneCodes?` | `number`[] | Additional phone country codes | [types/orders-dbs.types.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L188) |
| <a id="additionalphones"></a> `additionalPhones?` | `string`[] | Additional direct contact numbers. Empty array means WB did not provide a number. | [types/orders-dbs.types.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L190) |
| <a id="replacementadditionalphones"></a> `replacementAdditionalPhones?` | `string`[] | Additional masked replacement numbers. Empty array means WB did not provide a number. | [types/orders-dbs.types.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L192) |

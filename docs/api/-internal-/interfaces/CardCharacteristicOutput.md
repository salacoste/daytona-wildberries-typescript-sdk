[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CardCharacteristicOutput

# Interface: CardCharacteristicOutput

Defined in: [types/products.types.ts:1135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1135)

Characteristic value returned in card listing responses.
Includes the characteristic name in addition to id and value.
Returned by `getCardsList()`, `getCardsCursorList()`.

## Since

3.9.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Characteristic ID | [types/products.types.ts:1137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1137) |
| <a id="name"></a> `name?` | `string` | Characteristic name | [types/products.types.ts:1139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1139) |
| <a id="value"></a> `value?` | `unknown` | Characteristic value | [types/products.types.ts:1141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1141) |

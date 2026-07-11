[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CardCharacteristicOutput

# Interface: CardCharacteristicOutput

Defined in: [types/products.types.ts:1061](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1061)

Characteristic value returned in card listing responses.
Includes the characteristic name in addition to id and value.
Returned by `getCardsList()`, `getCardsCursorList()`.

## Since

3.9.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Characteristic ID | [types/products.types.ts:1063](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1063) |
| <a id="name"></a> `name?` | `string` | Characteristic name | [types/products.types.ts:1065](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1065) |
| <a id="value"></a> `value?` | `unknown` | Characteristic value | [types/products.types.ts:1067](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1067) |

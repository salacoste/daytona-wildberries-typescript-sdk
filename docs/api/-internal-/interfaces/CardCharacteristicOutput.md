[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CardCharacteristicOutput

# Interface: CardCharacteristicOutput

Defined in: [types/products.types.ts:947](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/products.types.ts#L947)

Characteristic value returned in card listing responses.
Includes the characteristic name in addition to id and value.
Returned by `getCardsList()`, `getCardsCursorList()`.

## Since

v3.9.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Characteristic ID | [types/products.types.ts:949](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/products.types.ts#L949) |
| <a id="name"></a> `name?` | `string` | Characteristic name | [types/products.types.ts:951](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/products.types.ts#L951) |
| <a id="value"></a> `value?` | `unknown` | Characteristic value | [types/products.types.ts:953](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/products.types.ts#L953) |

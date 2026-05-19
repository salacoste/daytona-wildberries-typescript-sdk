[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CardCharacteristicOutput

# Interface: CardCharacteristicOutput

Defined in: [types/products.types.ts:980](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L980)

Characteristic value returned in card listing responses.
Includes the characteristic name in addition to id and value.
Returned by `getCardsList()`, `getCardsCursorList()`.

## Since

3.9.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Characteristic ID | [types/products.types.ts:982](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L982) |
| <a id="name"></a> `name?` | `string` | Characteristic name | [types/products.types.ts:984](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L984) |
| <a id="value"></a> `value?` | `unknown` | Characteristic value | [types/products.types.ts:986](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L986) |

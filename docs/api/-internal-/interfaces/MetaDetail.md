[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / MetaDetail

# Interface: MetaDetail

Defined in: [types/orders-fbs.types.ts:688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbs.types.ts#L688)

Metadata detail item with validation status
Replaces the deprecated `meta` object. Use with `/api/marketplace/v3/orders/meta` endpoint.

## Since

3.5.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="key"></a> `key` | `string` | Metadata type: imei, uin, sgtin, gtin, expiration, customsDeclaration | [types/orders-fbs.types.ts:690](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbs.types.ts#L690) |
| <a id="value"></a> `value` | `string` | Metadata value (empty string if not filled) | [types/orders-fbs.types.ts:692](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbs.types.ts#L692) |
| <a id="decision"></a> `decision` | `string` | Validation decision. Known values: 'filled' (value set), 'optional' (not required), 'required' (must fill before deliver), 'invalid' (value failed validation) | [types/orders-fbs.types.ts:694](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbs.types.ts#L694) |

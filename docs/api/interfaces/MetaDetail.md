[Wildberries API TypeScript SDK](../modules.md) / MetaDetail

# Interface: MetaDetail

Defined in: [types/orders-fbs.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L708)

Metadata detail item with validation status
Replaces the deprecated `meta` object. Use with `/api/marketplace/v3/orders/meta` endpoint.

## Since

3.5.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="key"></a> `key` | `string` | Metadata type: imei, uin, sgtin, gtin, expiration, customsDeclaration | [types/orders-fbs.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L710) |
| <a id="value"></a> `value` | `string` | Metadata value (empty string if not filled) | [types/orders-fbs.types.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L712) |
| <a id="decision"></a> `decision` | `string` | Validation decision. Known values: 'filled' (value set), 'optional' (not required), 'required' (must fill before deliver), 'invalid' (value failed validation). When WB's B2C marking validation is not yet available for a seller, only 'filled'/'optional'/'required' are returned for sgtin; when available, the full status set is returned (non-exhaustive). See WB release-notes?id=513. | [types/orders-fbs.types.ts:716](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L716) |

[Wildberries API TypeScript SDK](../modules.md) / StocksRequest

# Interface: StocksRequest

Defined in: [types/products.types.ts:1043](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L1043)

Request body for [ProductsModule.getStocks](../classes/ProductsModule.md#getstocks) and [ProductsModule.deleteStock](../classes/ProductsModule.md#deletestock).

Provide EITHER `skus` (deprecated) OR `chrtIds` (preferred). If both are provided,
`chrtIds` wins. Pass `chrtIds` for all new code before 2026-05-20 13:00 MSK.

## Since

3.12.0

## Example

```typescript
// New v3.12.0+ pattern (preferred)
const request: StocksRequest = { chrtIds: [12345678] };

// Legacy pattern (deprecated)
const legacyRequest: StocksRequest = { skus: ['1234567890123'] };
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="skus"></a> ~~`skus?`~~ | `string`[] | **Deprecated** since 3.12.0 — use `chrtIds` instead. WB API will reject `skus` after 2026-05-20 13:00 MSK. | [types/products.types.ts:1048](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L1048) |
| <a id="chrtids"></a> `chrtIds?` | `number`[] | Array of size IDs (from `POST /content/v2/get/cards/list`). **Casing note**: WB API uses `chrtID` (uppercase D) in Content endpoints (`/content/v2/get/cards/list`) but `chrtId` (lowercase d) in this Marketplace stocks endpoint. Pass the same numeric values; the SDK property is `chrtIds` (lowercase d) for stocks methods. The SDK type keeps this optional for backwards compatibility, but the WB API will REQUIRE `chrtIds` (and reject `skus`) after 2026-05-20 13:00 MSK. **Since** 3.12.0 | [types/products.types.ts:1061](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L1061) |

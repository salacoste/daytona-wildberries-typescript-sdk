[Wildberries API TypeScript SDK](../modules.md) / StocksRequest

# Interface: StocksRequest

Defined in: [types/products.types.ts:1351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1351)

Request body for [ProductsModule.getStocks](../classes/ProductsModule.md#getstocks) and [ProductsModule.deleteStock](../classes/ProductsModule.md#deletestock).

Pass `chrtIds` (size IDs from `POST /content/v2/get/cards/list`). The legacy `skus`
field was removed in v4.0.0 — WB rejects `skus` since 2026-05-20.
See `docs/guides/migration-v4.md`.

## Since

3.12.0 (skus field removed in 4.0.0)

## Example

```typescript
const request: StocksRequest = { chrtIds: [12345678] };
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chrtids"></a> `chrtIds?` | `number`[] | Array of size IDs (from `POST /content/v2/get/cards/list`). **Casing note**: WB API uses `chrtID` (uppercase D) in Content endpoints (`/content/v2/get/cards/list`) but `chrtId` (lowercase d) in this Marketplace stocks endpoint. Pass the same numeric values; the SDK property is `chrtIds` (lowercase d) for stocks methods. **Since** 3.12.0 | [types/products.types.ts:1362](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1362) |

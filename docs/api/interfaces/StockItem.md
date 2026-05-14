[Wildberries API TypeScript SDK](../modules.md) / StockItem

# Interface: StockItem

Defined in: [types/products.types.ts:1005](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L1005)

A single stock record on a seller warehouse.

**Migration deadline 2026-05-20 13:00 MSK:** Wildberries is phasing out the `sku`
field in favor of `chrtId` (size ID). Pass `chrtId` for all new code. The `sku` field
will return HTTP 400 from the WB API after the deadline.

Exactly one of `sku` or `chrtId` should be set per item. If both are set, `chrtId` wins
at the SDK level (the request will be sent with `chrtId` only).

## Since

3.12.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sku"></a> ~~`sku?`~~ | `string` | **Deprecated** since 3.12.0 — use `chrtId` instead. WB API will reject `sku` after 2026-05-20 13:00 MSK. See `docs/guides/stocks-sku-to-chrtid-migration.md`. | [types/products.types.ts:1010](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L1010) |
| <a id="chrtid"></a> `chrtId?` | `number` | Size ID returned by `POST /content/v2/get/cards/list`. **Casing note**: WB API uses `chrtID` (uppercase D) in Content endpoints (`/content/v2/get/cards/list`) but `chrtId` (lowercase d) in this Marketplace stocks endpoint. Pass the same numeric value, but the SDK property is `chrtId` (lowercase d) for stocks methods. The SDK type keeps this optional for backwards compatibility, but the WB API will REQUIRE `chrtId` (and reject `sku`) after 2026-05-20 13:00 MSK. **Since** 3.12.0 | [types/products.types.ts:1023](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L1023) |
| <a id="amount"></a> `amount?` | `number` | Stock amount. | [types/products.types.ts:1025](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L1025) |

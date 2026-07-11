[Wildberries API TypeScript SDK](../modules.md) / StockItem

# Interface: StockItem

Defined in: [types/products.types.ts:1082](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1082)

A single stock record on a seller warehouse.

Set `chrtId` (size ID) per item. The legacy `sku` field was removed in v4.0.0 —
WB rejects `sku` since 2026-05-20. See `docs/guides/migration-v4.md`.

## Since

3.12.0 (sku field removed in 4.0.0)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chrtid"></a> `chrtId?` | `number` | Size ID returned by `POST /content/v2/get/cards/list`. **Casing note**: WB API uses `chrtID` (uppercase D) in Content endpoints (`/content/v2/get/cards/list`) but `chrtId` (lowercase d) in this Marketplace stocks endpoint. Pass the same numeric value, but the SDK property is `chrtId` (lowercase d) for stocks methods. **Since** 3.12.0 | [types/products.types.ts:1093](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1093) |
| <a id="amount"></a> `amount?` | `number` | Stock amount. | [types/products.types.ts:1095](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L1095) |

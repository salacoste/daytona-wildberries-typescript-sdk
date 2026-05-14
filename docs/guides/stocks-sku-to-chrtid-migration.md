# Stock Management Migration: `sku` → `chrtId`

> **Status**: Stub — full migration guide will be published in task-16.5 (v3.12.0).
>
> **Hard deadline**: 2026-05-20 13:00 MSK — Wildberries begins gradually disabling the `sku`
> parameter on the seller-warehouse stock endpoints. After the deadline: HTTP 400 from WB.

## Why this matters

WB announced on 2026-05-08 (https://dev.wildberries.ru/release-notes?id=522) that the
`sku` (barcode) parameter on three stock-management endpoints is being phased out in
favor of `chrtId` (size ID from `POST /content/v2/get/cards/list`).

The SDK v3.12.0 adds `chrtId` / `chrtIds` support to:

- `sdk.products.getStocks(warehouseId, { chrtIds: [...] })`
- `sdk.products.updateStock(warehouseId, { stocks: [{ chrtId, amount }] })`
- `sdk.products.deleteStock(warehouseId, { chrtIds: [...] })`

The legacy `sku`/`skus` parameters remain accepted (backwards-compatible) but are marked
`@deprecated` and will emit a `console.warn` (since v3.12.0). They will be REMOVED in a
future major version.

## How to get a `chrtId`

Call `POST /content/v2/get/cards/list` and read the `chrtID` field from each card's
`sizes[]` array. The SDK exposes this via `sdk.products.getCardsList()`.

**Note on casing**: WB uses `chrtID` (uppercase D) in Content API responses but `chrtId`
(lowercase d) in this Marketplace stocks endpoint. Pass the same numeric value; the SDK
property is `chrtId` (lowercase d) for stocks methods.

## Full migration steps

(See task-16.5 follow-up — this stub will be replaced by the complete guide.)

## Related

- [CHANGELOG v3.12.0](../../CHANGELOG.md)
- Source: [WB release-notes id=522](https://dev.wildberries.ru/release-notes?id=522)

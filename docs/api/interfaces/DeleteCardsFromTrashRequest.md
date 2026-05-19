[Wildberries API TypeScript SDK](../modules.md) / DeleteCardsFromTrashRequest

# Interface: DeleteCardsFromTrashRequest

Defined in: [types/products.types.ts:1107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L1107)

Request body for [ProductsModule.deleteCardsFromTrash](../classes/ProductsModule.md#deletecardsfromtrash).

**Sandbox-only at v3.13.1 release (2026-05-15)**: WB announced this endpoint in the
Sandbox environment. Production availability is tracked via WL-5 in
`backlog/watch-list.md`. SDK consumers running production traffic should test with
sandbox credentials first to confirm the endpoint is responsive in their target
environment.

## Since

3.13.1

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> `nmIDs?` | `number`[] | Array of product card IDs (nmID) currently in trash to delete permanently. | [types/products.types.ts:1109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L1109) |

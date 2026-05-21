[Wildberries API TypeScript SDK](../modules.md) / OrderMetaItem

# Interface: OrderMetaItem

Defined in: [types/orders-fbs.types.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L387)

A single order's metadata entry (used in bulk metadata responses)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-fbs.types.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L389) |
| <a id="meta"></a> ~~`meta?`~~ | [`Meta`](../-internal-/interfaces/Meta.md) | **Deprecated** Was scheduled for WB-side removal on 2026-04-30; field retained pending WB confirmation of removal status. Use metaDetails instead. | [types/orders-fbs.types.ts:392](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L392) |
| <a id="metadetails"></a> `metaDetails?` | [`MetaDetail`](MetaDetail.md)[] | Metadata details with validation status | [types/orders-fbs.types.ts:394](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L394) |

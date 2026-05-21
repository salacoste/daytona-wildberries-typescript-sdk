[Wildberries API TypeScript SDK](../modules.md) / OrderMetaResponse

# Interface: OrderMetaResponse

Defined in: [types/orders-fbs.types.ts:372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L372)

Response containing metadata for a single order

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="meta"></a> ~~`meta?`~~ | [`Meta`](../-internal-/interfaces/Meta.md) | **Deprecated** Was scheduled for WB-side removal on 2026-04-30; field retained pending WB confirmation of removal status. Use metaDetails instead. | [types/orders-fbs.types.ts:375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L375) |
| <a id="metadetails"></a> `metaDetails?` | [`MetaDetail`](MetaDetail.md)[] | Metadata details with validation status | [types/orders-fbs.types.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L377) |

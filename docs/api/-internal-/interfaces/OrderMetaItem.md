[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderMetaItem

# Interface: OrderMetaItem

Defined in: [types/orders-fbs.types.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/orders-fbs.types.ts#L367)

A single order's metadata entry (used in bulk metadata responses)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-fbs.types.ts:369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/orders-fbs.types.ts#L369) |
| <a id="meta"></a> ~~`meta?`~~ | [`Meta`](Meta.md) | **Deprecated** Will be removed April 30, 2026. Use metaDetails instead. | [types/orders-fbs.types.ts:372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/orders-fbs.types.ts#L372) |
| <a id="metadetails"></a> `metaDetails?` | [`MetaDetail`](MetaDetail.md)[] | Metadata details with validation status | [types/orders-fbs.types.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/orders-fbs.types.ts#L374) |

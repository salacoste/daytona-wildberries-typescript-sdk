[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderMetaItem

# Interface: OrderMetaItem

Defined in: [types/orders-fbs.types.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbs.types.ts#L387)

A single order's metadata entry (used in bulk metadata responses)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-fbs.types.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbs.types.ts#L389) |
| <a id="meta"></a> ~~`meta?`~~ | [`Meta`](Meta.md) | **Deprecated** Will be removed April 30, 2026. Use metaDetails instead. | [types/orders-fbs.types.ts:392](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbs.types.ts#L392) |
| <a id="metadetails"></a> `metaDetails?` | [`MetaDetail`](MetaDetail.md)[] | Metadata details with validation status | [types/orders-fbs.types.ts:394](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbs.types.ts#L394) |

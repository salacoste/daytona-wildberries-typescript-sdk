[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Supply

# Interface: Supply

Defined in: [types/orders-fbs.types.ts:455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L455)

Supply (postavka) entity representing a shipment batch

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Supply ID | [types/orders-fbs.types.ts:457](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L457) |
| <a id="done"></a> `done?` | `boolean` | Whether the supply is closed | [types/orders-fbs.types.ts:459](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L459) |
| <a id="createdat"></a> `createdAt?` | `string` | Supply creation date (RFC3339) | [types/orders-fbs.types.ts:461](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L461) |
| <a id="closedat"></a> `closedAt?` | `string` | Supply closing date (RFC3339) | [types/orders-fbs.types.ts:463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L463) |
| <a id="scandt"></a> `scanDt?` | `string` | Supply scan date (RFC3339) | [types/orders-fbs.types.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L465) |
| <a id="name"></a> `name?` | `string` | Supply name | [types/orders-fbs.types.ts:467](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L467) |
| <a id="cargotype"></a> `cargoType?` | `0` \| `1` \| `2` \| `3` | Cargo type: 0 = unset, 1 = small, 2 = oversized, 3 = large | [types/orders-fbs.types.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L469) |
| <a id="crossbordertype"></a> `crossBorderType?` | `0` \| `1` \| `null` | Cross-border type: 0 = not cross-border, 1 = cross-border, null = unset | [types/orders-fbs.types.ts:471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L471) |
| <a id="destinationofficeid"></a> `destinationOfficeId?` | `number` | Destination warehouse ID; null if not specified | [types/orders-fbs.types.ts:473](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbs.types.ts#L473) |

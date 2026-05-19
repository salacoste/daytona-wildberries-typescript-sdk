[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Supply

# Interface: Supply

Defined in: [types/orders-fbs.types.ts:542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L542)

Supply (postavka) entity representing a shipment batch

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Supply ID | [types/orders-fbs.types.ts:544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L544) |
| <a id="done"></a> `done?` | `boolean` | Whether the supply is closed | [types/orders-fbs.types.ts:546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L546) |
| <a id="createdat"></a> `createdAt?` | `string` | Supply creation date (RFC3339) | [types/orders-fbs.types.ts:548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L548) |
| <a id="closedat"></a> `closedAt?` | `string` | Supply closing date (RFC3339) | [types/orders-fbs.types.ts:550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L550) |
| <a id="scandt"></a> `scanDt?` | `string` | Supply scan date (RFC3339) | [types/orders-fbs.types.ts:552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L552) |
| <a id="name"></a> `name?` | `string` | Supply name | [types/orders-fbs.types.ts:554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L554) |
| <a id="cargotype"></a> `cargoType?` | `0` \| `1` \| `2` \| `3` | Cargo type: 0 = unset, 1 = small, 2 = oversized, 3 = large | [types/orders-fbs.types.ts:556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L556) |
| <a id="crossbordertype"></a> `crossBorderType?` | `0` \| `1` \| `null` | Cross-border type: 0 = not cross-border, 1 = cross-border, null = unset | [types/orders-fbs.types.ts:558](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L558) |
| <a id="destinationofficeid"></a> `destinationOfficeId?` | `number` | Destination warehouse ID; null if not specified | [types/orders-fbs.types.ts:560](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L560) |
| <a id="isb2b"></a> `isB2b?` | `boolean` | Whether this supply contains B2B orders. Once the first order is added, the supply inherits its B2B flag. Since March 19, 2026 mixing B2B and non-B2B orders in one supply is rejected. | [types/orders-fbs.types.ts:562](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbs.types.ts#L562) |

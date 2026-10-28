[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Supply

# Interface: Supply

Defined in: [types/orders-fbs.types.ts:608](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L608)

Supply (postavka) entity representing a shipment batch

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Supply ID | [types/orders-fbs.types.ts:610](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L610) |
| <a id="done"></a> `done?` | `boolean` | Whether the supply is closed | [types/orders-fbs.types.ts:612](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L612) |
| <a id="createdat"></a> `createdAt?` | `string` | Supply creation date (RFC3339) | [types/orders-fbs.types.ts:614](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L614) |
| <a id="closedat"></a> `closedAt?` | `string` | Supply closing date (RFC3339) | [types/orders-fbs.types.ts:616](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L616) |
| <a id="scandt"></a> `scanDt?` | `string` | Supply scan date (RFC3339) | [types/orders-fbs.types.ts:618](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L618) |
| <a id="name"></a> `name?` | `string` | Supply name | [types/orders-fbs.types.ts:620](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L620) |
| <a id="cargotype"></a> `cargoType?` | `0` \| `1` \| `2` \| `3` | Cargo type: 0 = unset, 1 = small, 2 = oversized, 3 = large | [types/orders-fbs.types.ts:622](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L622) |
| <a id="crossbordertype"></a> `crossBorderType?` | `0` \| `1` \| `null` | Cross-border type: 0 = not cross-border, 1 = cross-border, null = unset | [types/orders-fbs.types.ts:624](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L624) |
| <a id="destinationofficeid"></a> `destinationOfficeId?` | `number` | Destination warehouse ID; null if not specified | [types/orders-fbs.types.ts:626](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L626) |
| <a id="isb2b"></a> `isB2b?` | `boolean` | Whether this supply contains B2B orders. Once the first order is added, the supply inherits its B2B flag. Since March 19, 2026 mixing B2B and non-B2B orders in one supply is rejected. | [types/orders-fbs.types.ts:628](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L628) |
| <a id="ispickuppointshipmentallowed"></a> `isPickupPointShipmentAllowed?` | `boolean` | Whether you can dispatch the order to a pickup point | [types/orders-fbs.types.ts:630](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L630) |
| <a id="recommendedwhid"></a> `recommendedWhId?` | `number` | ID of the recommended warehouse for acceptance of the supply for Moscow and Moscow region; 0 if not determined | [types/orders-fbs.types.ts:632](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L632) |
| <a id="spotavailable"></a> `spotAvailable?` | `boolean` | Whether SPOT is available for this supply: `true` — SPOT data can be added via `updateSupplySpot()` and read via `getSuppliesSpotList()`; `false` — no | [types/orders-fbs.types.ts:634](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L634) |

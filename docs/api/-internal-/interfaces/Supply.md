[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Supply

# Interface: Supply

Defined in: [types/orders-fbs.types.ts:514](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L514)

Supply (postavka) entity representing a shipment batch

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Supply ID | [types/orders-fbs.types.ts:516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L516) |
| <a id="done"></a> `done?` | `boolean` | Whether the supply is closed | [types/orders-fbs.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L518) |
| <a id="createdat"></a> `createdAt?` | `string` | Supply creation date (RFC3339) | [types/orders-fbs.types.ts:520](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L520) |
| <a id="closedat"></a> `closedAt?` | `string` | Supply closing date (RFC3339) | [types/orders-fbs.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L522) |
| <a id="scandt"></a> `scanDt?` | `string` | Supply scan date (RFC3339) | [types/orders-fbs.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L524) |
| <a id="name"></a> `name?` | `string` | Supply name | [types/orders-fbs.types.ts:526](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L526) |
| <a id="cargotype"></a> `cargoType?` | `0` \| `1` \| `2` \| `3` | Cargo type: 0 = unset, 1 = small, 2 = oversized, 3 = large | [types/orders-fbs.types.ts:528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L528) |
| <a id="crossbordertype"></a> `crossBorderType?` | `0` \| `1` \| `null` | Cross-border type: 0 = not cross-border, 1 = cross-border, null = unset | [types/orders-fbs.types.ts:530](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L530) |
| <a id="destinationofficeid"></a> `destinationOfficeId?` | `number` | Destination warehouse ID; null if not specified | [types/orders-fbs.types.ts:532](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/orders-fbs.types.ts#L532) |

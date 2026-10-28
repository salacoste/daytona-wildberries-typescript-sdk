[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ShippingPoint

# Interface: ShippingPoint

Defined in: [types/orders-fbs.types.ts:1187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1187)

Supply shipping point — the point the supply is shipped to.
Maps to swagger schema: ShippingPoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Shipping point ID — use as `shippingPointId` in `updateShippingMethod()` | [types/orders-fbs.types.ts:1189](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1189) |
| <a id="name"></a> `name` | `string` | Name (e.g. 'Москва Морской') | [types/orders-fbs.types.ts:1191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1191) |
| <a id="address"></a> `address` | `string` | Address (e.g. 'г Москва, Морской Проспект 54') | [types/orders-fbs.types.ts:1193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1193) |
| <a id="city"></a> `city` | `string` | Locality | [types/orders-fbs.types.ts:1195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1195) |
| <a id="officetype"></a> `officeType` | [`ShippingPointOfficeType`](../type-aliases/ShippingPointOfficeType.md) | Shipping point type (sorting center / warehouse / pickup point) | [types/orders-fbs.types.ts:1197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1197) |
| <a id="cargotypes"></a> `cargoTypes` | [`ShippingPointCargoType`](../type-aliases/ShippingPointCargoType.md)[] | Types of items this shipping point can accept | [types/orders-fbs.types.ts:1199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1199) |
| <a id="latitude"></a> `latitude` | `number` | Latitude | [types/orders-fbs.types.ts:1201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1201) |
| <a id="longitude"></a> `longitude` | `number` | Longitude | [types/orders-fbs.types.ts:1203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1203) |
| <a id="fulfillment"></a> `fulfillment` | `boolean` | Whether the **Fulfillment in SC** service for FBS supplies is available at this shipping point | [types/orders-fbs.types.ts:1208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1208) |

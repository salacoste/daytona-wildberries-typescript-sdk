[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ShippingPoint

# Interface: ShippingPoint

Defined in: [types/orders-fbs.types.ts:1115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1115)

Supply shipping point — the point the supply is shipped to.
Maps to swagger schema: ShippingPoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Shipping point ID — use as `shippingPointId` in `updateShippingMethod()` | [types/orders-fbs.types.ts:1117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1117) |
| <a id="name"></a> `name` | `string` | Name (e.g. 'Москва Морской') | [types/orders-fbs.types.ts:1119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1119) |
| <a id="address"></a> `address` | `string` | Address (e.g. 'г Москва, Морской Проспект 54') | [types/orders-fbs.types.ts:1121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1121) |
| <a id="city"></a> `city` | `string` | Locality | [types/orders-fbs.types.ts:1123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1123) |
| <a id="officetype"></a> `officeType` | [`ShippingPointOfficeType`](../type-aliases/ShippingPointOfficeType.md) | Shipping point type (sorting center / warehouse / pickup point) | [types/orders-fbs.types.ts:1125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1125) |
| <a id="cargotypes"></a> `cargoTypes` | [`ShippingPointCargoType`](../type-aliases/ShippingPointCargoType.md)[] | Types of items this shipping point can accept | [types/orders-fbs.types.ts:1127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1127) |
| <a id="latitude"></a> `latitude` | `number` | Latitude | [types/orders-fbs.types.ts:1129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1129) |
| <a id="longitude"></a> `longitude` | `number` | Longitude | [types/orders-fbs.types.ts:1131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1131) |
| <a id="fulfillment"></a> `fulfillment` | `boolean` | Whether the **Fulfillment in SC** service for FBS supplies is available at this shipping point | [types/orders-fbs.types.ts:1136](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1136) |

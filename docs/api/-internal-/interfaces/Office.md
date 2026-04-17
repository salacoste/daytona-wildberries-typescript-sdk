[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Office

# Interface: Office

Defined in: [types/products.types.ts:454](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L454)

Данные о складе WB

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address?` | `string` | Адрес | [types/products.types.ts:456](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L456) |
| <a id="name"></a> `name?` | `string` | Название | [types/products.types.ts:458](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L458) |
| <a id="city"></a> `city?` | `string` | Город | [types/products.types.ts:460](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L460) |
| <a id="id"></a> `id?` | `number` | ID | [types/products.types.ts:462](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L462) |
| <a id="longitude"></a> `longitude?` | `number` | Долгота | [types/products.types.ts:464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L464) |
| <a id="latitude"></a> `latitude?` | `number` | Широта | [types/products.types.ts:466](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L466) |
| <a id="cargotype"></a> `cargoType?` | `1` \| `2` \| `3` | Тип товара, который принимает склад: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) | [types/products.types.ts:468](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L468) |
| <a id="deliverytype"></a> `deliveryType?` | `1` \| `2` \| `3` \| `5` \| `6` | Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) | [types/products.types.ts:470](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L470) |
| <a id="federaldistrict"></a> `federalDistrict?` | `string` | Федеральный округ склада WB. Если `null`, склад находится за пределами РФ или федеральный округ не указан | [types/products.types.ts:472](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L472) |
| <a id="selected"></a> `selected?` | `boolean` | Признак того, что склад уже выбран продавцом | [types/products.types.ts:474](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L474) |

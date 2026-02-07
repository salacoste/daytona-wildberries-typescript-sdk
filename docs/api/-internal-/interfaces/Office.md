[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Office

# Interface: Office

Defined in: [types/products.types.ts:461](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L461)

Данные о складе WB

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address?` | `string` | Адрес | [types/products.types.ts:463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L463) |
| <a id="name"></a> `name?` | `string` | Название | [types/products.types.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L465) |
| <a id="city"></a> `city?` | `string` | Город | [types/products.types.ts:467](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L467) |
| <a id="id"></a> `id?` | `number` | ID | [types/products.types.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L469) |
| <a id="longitude"></a> `longitude?` | `number` | Долгота | [types/products.types.ts:471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L471) |
| <a id="latitude"></a> `latitude?` | `number` | Широта | [types/products.types.ts:473](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L473) |
| <a id="cargotype"></a> `cargoType?` | `1` \| `2` \| `3` | Тип товара, который принимает склад: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) | [types/products.types.ts:475](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L475) |
| <a id="deliverytype"></a> `deliveryType?` | `1` \| `2` \| `3` \| `5` \| `6` | Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) | [types/products.types.ts:477](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L477) |
| <a id="federaldistrict"></a> `federalDistrict?` | `string` | Федеральный округ склада WB. Если `null`, склад находится за пределами РФ или федеральный округ не указан | [types/products.types.ts:479](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L479) |
| <a id="selected"></a> `selected?` | `boolean` | Признак того, что склад уже выбран продавцом | [types/products.types.ts:481](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L481) |

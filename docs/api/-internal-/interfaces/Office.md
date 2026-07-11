[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Office

# Interface: Office

Defined in: [types/products.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L518)

Данные о складе WB

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address?` | `string` | Адрес | [types/products.types.ts:520](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L520) |
| <a id="name"></a> `name?` | `string` | Название | [types/products.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L522) |
| <a id="city"></a> `city?` | `string` | Город | [types/products.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L524) |
| <a id="id"></a> `id?` | `number` | ID | [types/products.types.ts:526](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L526) |
| <a id="longitude"></a> `longitude?` | `number` | Долгота | [types/products.types.ts:528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L528) |
| <a id="latitude"></a> `latitude?` | `number` | Широта | [types/products.types.ts:530](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L530) |
| <a id="cargotype"></a> `cargoType?` | `1` \| `2` \| `3` | Тип товара, который принимает склад: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) | [types/products.types.ts:532](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L532) |
| <a id="deliverytype"></a> `deliveryType?` | `1` \| `2` \| `5` \| `3` \| `6` | Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) | [types/products.types.ts:534](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L534) |
| <a id="federaldistrict"></a> `federalDistrict?` | `string` | Федеральный округ склада WB. Если `null`, склад находится за пределами РФ или федеральный округ не указан | [types/products.types.ts:536](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L536) |
| <a id="selected"></a> `selected?` | `boolean` | Признак того, что склад уже выбран продавцом | [types/products.types.ts:538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L538) |

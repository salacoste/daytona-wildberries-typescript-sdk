[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Warehouse

# Interface: Warehouse

Defined in: [types/products.types.ts:544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L544)

Данные о складе продавца

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name?` | `string` | Название склада продавца | [types/products.types.ts:546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L546) |
| <a id="officeid"></a> `officeId?` | `number` | ID склада WB | [types/products.types.ts:548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L548) |
| <a id="id"></a> `id?` | `number` | ID склада продавца | [types/products.types.ts:550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L550) |
| <a id="cargotype"></a> `cargoType?` | `1` \| `2` \| `3` | Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) | [types/products.types.ts:552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L552) |
| <a id="deliverytype"></a> `deliveryType?` | `1` \| `2` \| `5` \| `3` \| `6` | Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) | [types/products.types.ts:554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L554) |
| <a id="isdeleting"></a> `isDeleting?` | `boolean` | Склад удаляется: - `false` — нет - `true` — да После удаления склад пропадёт из списка | [types/products.types.ts:556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L556) |
| <a id="isprocessing"></a> `isProcessing?` | `boolean` | Данные склада обновляются: - `false` — нет - `true` — да, обновление и удаление остатков недоступно Обновление данных может занимать несколько минут | [types/products.types.ts:558](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L558) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Warehouse

# Interface: Warehouse

Defined in: [types/products.types.ts:480](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L480)

Данные о складе продавца

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name?` | `string` | Название склада продавца | [types/products.types.ts:482](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L482) |
| <a id="officeid"></a> `officeId?` | `number` | ID склада WB | [types/products.types.ts:484](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L484) |
| <a id="id"></a> `id?` | `number` | ID склада продавца | [types/products.types.ts:486](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L486) |
| <a id="cargotype"></a> `cargoType?` | `1` \| `2` \| `3` | Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) | [types/products.types.ts:488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L488) |
| <a id="deliverytype"></a> `deliveryType?` | `1` \| `2` \| `5` \| `3` \| `6` | Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) | [types/products.types.ts:490](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L490) |
| <a id="isdeleting"></a> `isDeleting?` | `boolean` | Склад удаляется: - `false` — нет - `true` — да После удаления склад пропадёт из списка | [types/products.types.ts:492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L492) |
| <a id="isprocessing"></a> `isProcessing?` | `boolean` | Данные склада обновляются: - `false` — нет - `true` — да, обновление и удаление остатков недоступно Обновление данных может занимать несколько минут | [types/products.types.ts:494](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/products.types.ts#L494) |

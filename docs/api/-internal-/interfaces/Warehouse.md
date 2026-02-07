[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Warehouse

# Interface: Warehouse

Defined in: [types/products.types.ts:487](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L487)

Данные о складе продавца

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name?` | `string` | Название склада продавца | [types/products.types.ts:489](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L489) |
| <a id="officeid"></a> `officeId?` | `number` | ID склада WB | [types/products.types.ts:491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L491) |
| <a id="id"></a> `id?` | `number` | ID склада продавца | [types/products.types.ts:493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L493) |
| <a id="cargotype"></a> `cargoType?` | `1` \| `2` \| `3` | Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) | [types/products.types.ts:495](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L495) |
| <a id="deliverytype"></a> `deliveryType?` | `1` \| `2` \| `3` \| `5` \| `6` | Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) | [types/products.types.ts:497](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L497) |
| <a id="isdeleting"></a> `isDeleting?` | `boolean` | Склад удаляется: - `false` — нет - `true` — да После удаления склад пропадёт из списка | [types/products.types.ts:499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L499) |
| <a id="isprocessing"></a> `isProcessing?` | `boolean` | Данные склада обновляются: - `false` — нет - `true` — да, обновление и удаление остатков недоступно Обновление данных может занимать несколько минут | [types/products.types.ts:501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/products.types.ts#L501) |

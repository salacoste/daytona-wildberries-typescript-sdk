[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsTransitTariff

# Interface: ModelsTransitTariff

Defined in: [types/orders-fbw.types.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/72436104934707822141cfa3bef6a4f92cd36fd1/src/types/orders-fbw.types.ts#L10)

Auto-generated TypeScript types for orders-fbw module
Generated from: wildberries_api_doc/07-orders-fbw.yaml

DO NOT EDIT MANUALLY - Changes will be overwritten on next generation

Generated: 2025-12-14T23:02:33.786Z

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="transitwarehousename"></a> `transitWarehouseName?` | `string` | Транзитный склад | [types/orders-fbw.types.ts:12](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/72436104934707822141cfa3bef6a4f92cd36fd1/src/types/orders-fbw.types.ts#L12) |
| <a id="destinationwarehousename"></a> `destinationWarehouseName?` | `string` | Склад назначения | [types/orders-fbw.types.ts:14](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/72436104934707822141cfa3bef6a4f92cd36fd1/src/types/orders-fbw.types.ts#L14) |
| <a id="activefrom"></a> `activeFrom?` | `string` | С какого числа доступно транзитное направление | [types/orders-fbw.types.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/72436104934707822141cfa3bef6a4f92cd36fd1/src/types/orders-fbw.types.ts#L16) |
| <a id="boxtariff"></a> `boxTariff?` | [`ModelsVolumeTariff`](ModelsVolumeTariff.md)[] | Тариф за транзит коробов. Если `null`, транзит для коробов недоступен | [types/orders-fbw.types.ts:18](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/72436104934707822141cfa3bef6a4f92cd36fd1/src/types/orders-fbw.types.ts#L18) |
| <a id="pallettariff"></a> `palletTariff?` | `number` | Тариф за паллету, ₽ | [types/orders-fbw.types.ts:20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/72436104934707822141cfa3bef6a4f92cd36fd1/src/types/orders-fbw.types.ts#L20) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Supply

# Interface: Supply

Defined in: [types/orders-fbs.types.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L102)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | ID поставки | [types/orders-fbs.types.ts:104](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L104) |
| <a id="done"></a> `done?` | `boolean` | Флаг закрытия поставки: - `true` — закрыта - `false` — открыта | [types/orders-fbs.types.ts:106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L106) |
| <a id="createdat"></a> `createdAt?` | `string` | Дата создания поставки (RFC3339) | [types/orders-fbs.types.ts:108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L108) |
| <a id="closedat"></a> `closedAt?` | `string` | Дата закрытия поставки (RFC3339) | [types/orders-fbs.types.ts:110](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L110) |
| <a id="scandt"></a> `scanDt?` | `string` | Дата скана поставки (RFC3339) | [types/orders-fbs.types.ts:112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L112) |
| <a id="name"></a> `name?` | `string` | Наименование поставки | [types/orders-fbs.types.ts:114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L114) |
| <a id="cargotype"></a> `cargoType?` | `0` \| `1` \| `2` \| `3` | Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) | [types/orders-fbs.types.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L116) |
| <a id="destinationofficeid"></a> `destinationOfficeId?` | `number` | ID склада назначения поставки. Если `null`, склад назначения не указан | [types/orders-fbs.types.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbs.types.ts#L118) |

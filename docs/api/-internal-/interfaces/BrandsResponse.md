[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BrandsResponse

# Interface: BrandsResponse

Defined in: [types/products.types.ts:598](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L598)

Ответ со списком брендов

Возвращается методом GET /api/content/v1/brands.
Содержит пагинированный список брендов для указанного предмета.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brands"></a> `brands` | [`Brand`](Brand.md)[] | Список брендов | [types/products.types.ts:600](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L600) |
| <a id="next"></a> `next?` | `number` | Курсор пагинации. Передайте это значение как параметр `next` для получения следующей страницы. Отсутствует, когда все данные получены. | [types/products.types.ts:605](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L605) |
| <a id="total"></a> `total` | `number` | Общее количество брендов для предмета | [types/products.types.ts:607](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L607) |

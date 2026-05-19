[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BrandsResponse

# Interface: BrandsResponse

Defined in: [types/products.types.ts:600](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L600)

Ответ со списком брендов

Возвращается методом GET /api/content/v1/brands.
Содержит пагинированный список брендов для указанного предмета.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brands"></a> `brands` | [`Brand`](Brand.md)[] | Список брендов | [types/products.types.ts:602](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L602) |
| <a id="next"></a> `next?` | `number` | Курсор пагинации. Передайте это значение как параметр `next` для получения следующей страницы. Отсутствует, когда все данные получены. | [types/products.types.ts:607](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L607) |
| <a id="total"></a> `total` | `number` | Общее количество брендов для предмета | [types/products.types.ts:609](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L609) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BrandsResponse

# Interface: BrandsResponse

Defined in: [types/products.types.ts:605](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/products.types.ts#L605)

Ответ со списком брендов

Возвращается методом GET /api/content/v1/brands.
Содержит пагинированный список брендов для указанного предмета.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brands"></a> `brands` | [`Brand`](Brand.md)[] | Список брендов | [types/products.types.ts:607](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/products.types.ts#L607) |
| <a id="next"></a> `next?` | `number` | Курсор пагинации. Передайте это значение как параметр `next` для получения следующей страницы. Отсутствует, когда все данные получены. | [types/products.types.ts:612](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/products.types.ts#L612) |
| <a id="total"></a> `total` | `number` | Общее количество брендов для предмета | [types/products.types.ts:614](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/products.types.ts#L614) |

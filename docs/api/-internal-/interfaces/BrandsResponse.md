[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BrandsResponse

# Interface: BrandsResponse

Defined in: [types/products.types.ts:664](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L664)

Ответ со списком брендов

Возвращается методом GET /api/content/v1/brands.
Содержит пагинированный список брендов для указанного предмета.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brands"></a> `brands` | [`Brand`](Brand.md)[] | Список брендов | [types/products.types.ts:666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L666) |
| <a id="next"></a> `next?` | `number` | Курсор пагинации. Передайте это значение как параметр `next` для получения следующей страницы. Отсутствует, когда все данные получены. | [types/products.types.ts:671](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L671) |
| <a id="total"></a> `total` | `number` | Общее количество брендов для предмета | [types/products.types.ts:673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L673) |

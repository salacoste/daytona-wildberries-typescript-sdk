[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGoodReq

# Interface: SizeGoodReq

Defined in: [types/products.types.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L197)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/products.types.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L199) |
| <a id="sizeid"></a> `sizeID` | `number` | ID размера. Можно получить с помощью методов [Получить товары с ценами](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `sizeID`. В методах Контента это поле `chrtID` | [types/products.types.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L201) |
| <a id="price"></a> `price` | `number` | Цена. Валюту можно получить с помощью методов [Получить товары с ценами](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` | [types/products.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/products.types.ts#L203) |

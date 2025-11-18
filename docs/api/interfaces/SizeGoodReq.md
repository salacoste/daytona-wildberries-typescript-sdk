[Wildberries API TypeScript SDK](../modules.md) / SizeGoodReq

# Interface: SizeGoodReq

Defined in: [types/products.types.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L201)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/products.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L203) |
| <a id="sizeid"></a> `sizeID` | `number` | ID размера. Можно получить с помощью методов [Получить товары с ценами](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `sizeID`. В методах Контента это поле `chrtID` | [types/products.types.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L205) |
| <a id="price"></a> `price` | `number` | Цена. Валюту можно получить с помощью методов [Получить товары с ценами](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` | [types/products.types.ts:207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L207) |

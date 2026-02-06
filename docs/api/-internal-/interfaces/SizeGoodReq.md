[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGoodReq

# Interface: SizeGoodReq

Defined in: [types/products.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/products.types.ts#L204)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/products.types.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/products.types.ts#L206) |
| <a id="sizeid"></a> `sizeID` | `number` | ID размера. Можно получить с помощью методов [Получить товары с ценами](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `sizeID`. В методах Контента это поле `chrtID` | [types/products.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/products.types.ts#L208) |
| <a id="price"></a> `price` | `number` | Цена. Валюту можно получить с помощью методов [Получить товары с ценами](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` | [types/products.types.ts:210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/products.types.ts#L210) |

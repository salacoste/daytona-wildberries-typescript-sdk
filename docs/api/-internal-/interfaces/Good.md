[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Good

# Interface: Good

Defined in: [types/products.types.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/products.types.ts#L181)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Артикул WB | [types/products.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/products.types.ts#L183) |
| <a id="price"></a> `price?` | `number` | Цена. Валюту можно получить с помощью методов [Получить товары с ценами](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` | [types/products.types.ts:185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/products.types.ts#L185) |
| <a id="discount"></a> `discount?` | `number` | Скидка, % | [types/products.types.ts:187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/products.types.ts#L187) |

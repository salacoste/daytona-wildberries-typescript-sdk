[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGood

# Interface: SizeGood

Defined in: [types/products.types.ts:254](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L254)

Информация о размере

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L256) |
| <a id="sizeid"></a> `sizeID?` | `number` | ID размера. Можно получить с помощью метода [Получение списка товаров по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get), поле `sizeID`. В методах Контента это поле `chrtID` | [types/products.types.ts:258](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L258) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/products.types.ts:260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L260) |
| <a id="price"></a> `price?` | `number` | Цена | [types/products.types.ts:262](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L262) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта, по стандарту ISO 4217 | [types/products.types.ts:264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L264) |
| <a id="discountedprice"></a> `discountedPrice?` | `number` | Цена со скидкой | [types/products.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L266) |
| <a id="clubdiscountedprice"></a> `clubDiscountedPrice?` | `number` | Цена со скидкой, включая скидку WB Клуба | [types/products.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L268) |
| <a id="discount"></a> `discount?` | `number` | Скидка, % | [types/products.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L270) |
| <a id="clubdiscount"></a> `clubDiscount?` | `number` | Скидка WB Клуба, % | [types/products.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L272) |
| <a id="techsizename"></a> `techSizeName?` | `string` | Размер товара | [types/products.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L274) |
| <a id="editablesizeprice"></a> `editableSizePrice?` | `boolean` | Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя | [types/products.types.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L276) |
| <a id="isbadturnover"></a> `isBadTurnover?` | `boolean` | Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар | [types/products.types.ts:278](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/types/products.types.ts#L278) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGood

# Interface: SizeGood

Defined in: [types/products.types.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L261)

Информация о размере

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L263) |
| <a id="sizeid"></a> `sizeID?` | `number` | ID размера. Можно получить с помощью метода [Получение списка товаров по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get), поле `sizeID`. В методах Контента это поле `chrtID` | [types/products.types.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L265) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/products.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L267) |
| <a id="price"></a> `price?` | `number` | Цена | [types/products.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L269) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта, по стандарту ISO 4217 | [types/products.types.ts:271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L271) |
| <a id="discountedprice"></a> `discountedPrice?` | `number` | Цена со скидкой | [types/products.types.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L273) |
| <a id="clubdiscountedprice"></a> `clubDiscountedPrice?` | `number` | Цена со скидкой, включая скидку WB Клуба | [types/products.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L275) |
| <a id="discount"></a> `discount?` | `number` | Скидка, % | [types/products.types.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L277) |
| <a id="clubdiscount"></a> `clubDiscount?` | `number` | Скидка WB Клуба, % | [types/products.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L279) |
| <a id="techsizename"></a> `techSizeName?` | `string` | Размер товара | [types/products.types.ts:281](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L281) |
| <a id="editablesizeprice"></a> `editableSizePrice?` | `boolean` | Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя | [types/products.types.ts:283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L283) |
| <a id="isbadturnover"></a> `isBadTurnover?` | `boolean` | Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар | [types/products.types.ts:285](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/products.types.ts#L285) |

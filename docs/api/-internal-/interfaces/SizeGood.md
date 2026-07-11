[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SizeGood

# Interface: SizeGood

Defined in: [types/products.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L316)

Информация о размере

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L318) |
| <a id="sizeid"></a> `sizeID?` | `number` | ID размера. Можно получить с помощью метода [Получение списка товаров по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get), поле `sizeID`. В методах Контента это поле `chrtID` | [types/products.types.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L320) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/products.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L322) |
| <a id="price"></a> `price?` | `number` | Цена | [types/products.types.ts:324](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L324) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта, по стандарту ISO 4217 | [types/products.types.ts:326](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L326) |
| <a id="discountedprice"></a> `discountedPrice?` | `number` | Цена со скидкой | [types/products.types.ts:328](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L328) |
| <a id="clubdiscountedprice"></a> `clubDiscountedPrice?` | `number` | Цена со скидкой, включая скидку WB Клуба | [types/products.types.ts:330](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L330) |
| <a id="discount"></a> `discount?` | `number` | Скидка, % | [types/products.types.ts:332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L332) |
| <a id="clubdiscount"></a> `clubDiscount?` | `number` | Скидка WB Клуба, % | [types/products.types.ts:334](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L334) |
| <a id="techsizename"></a> `techSizeName?` | `string` | Размер товара | [types/products.types.ts:336](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L336) |
| <a id="editablesizeprice"></a> `editableSizePrice?` | `boolean` | Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя Also true when the 'Size-Based Prices' Tariff-Builder option is enabled (RU only) and the item has >1 size. If not enabled, size-priced cards fall into drafts (`/content/v2/cards/error/list`); size-priced items cannot be added to promos (`POST /api/v1/calendar/promotions/upload` → 400). | [types/products.types.ts:340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L340) |
| <a id="isbadturnover"></a> `isBadTurnover?` | `boolean` | Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар | [types/products.types.ts:342](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L342) |

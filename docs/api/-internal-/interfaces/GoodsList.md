[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsList

# Interface: GoodsList

Defined in: [types/products.types.ts:259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L259)

Размеры товара

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L261) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/products.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L263) |
| <a id="sizes"></a> `sizes?` | \{ `sizeID`: `number`; `price`: `number`; `discountedPrice`: `number`; `clubDiscountedPrice`: `number`; `techSizeName`: `string`; \}[] | Размер | [types/products.types.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L265) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта, по стандарту ISO 4217 | [types/products.types.ts:278](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L278) |
| <a id="discount"></a> `discount?` | `number` | Скидка, % | [types/products.types.ts:280](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L280) |
| <a id="clubdiscount"></a> `clubDiscount?` | `number` | Скидка WB Клуба, % | [types/products.types.ts:282](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L282) |
| <a id="editablesizeprice"></a> `editableSizePrice?` | `boolean` | Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя Also true when the 'Size-Based Prices' Tariff-Builder option is enabled (RU only) and the item has >1 size. If not enabled, size-priced cards fall into drafts (`/content/v2/cards/error/list`); size-priced items cannot be added to promos (`POST /api/v1/calendar/promotions/upload` → 400). | [types/products.types.ts:286](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L286) |
| <a id="isbadturnover"></a> `isBadTurnover?` | `boolean` | Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар | [types/products.types.ts:288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L288) |
| <a id="wholesalediscountthreshold"></a> `wholesaleDiscountThreshold?` | [`WholesaleDiscountThreshold`](WholesaleDiscountThreshold.md)[] | Пороги оптовых скидок для B2B-продаж. Returned by GET/POST /api/v2/list/goods/filter when B2B wholesale discounts have been set via POST /api/discounts-prices/v1/upload/task/b2b/wholesale. Each entry describes one wholesale discount tier (price breakpoint + discount %). Absent when no B2B wholesale discounts are configured for the item. | [types/products.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L297) |

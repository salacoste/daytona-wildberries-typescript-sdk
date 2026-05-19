[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsList

# Interface: GoodsList

Defined in: [types/products.types.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L221)

Размеры товара

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L223) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/products.types.ts:225](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L225) |
| <a id="sizes"></a> `sizes?` | \{ `sizeID`: `number`; `price`: `number`; `discountedPrice`: `number`; `clubDiscountedPrice`: `number`; `techSizeName`: `string`; \}[] | Размер | [types/products.types.ts:227](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L227) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта, по стандарту ISO 4217 | [types/products.types.ts:240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L240) |
| <a id="discount"></a> `discount?` | `number` | Скидка, % | [types/products.types.ts:242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L242) |
| <a id="clubdiscount"></a> `clubDiscount?` | `number` | Скидка WB Клуба, % | [types/products.types.ts:244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L244) |
| <a id="editablesizeprice"></a> `editableSizePrice?` | `boolean` | Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя | [types/products.types.ts:246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L246) |
| <a id="isbadturnover"></a> `isBadTurnover?` | `boolean` | Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар | [types/products.types.ts:248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/products.types.ts#L248) |

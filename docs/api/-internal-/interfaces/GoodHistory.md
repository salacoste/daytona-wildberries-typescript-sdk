[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodHistory

# Interface: GoodHistory

Defined in: [types/products.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L303)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L305) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/products.types.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L307) |
| <a id="sizeid"></a> `sizeID?` | `number` | ID размера. В методах Контента это поле `chrtID` | [types/products.types.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L309) |
| <a id="techsizename"></a> `techSizeName?` | `string` | Размер | [types/products.types.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L311) |
| <a id="price"></a> `price?` | `number` | Цена | [types/products.types.ts:313](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L313) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта, по стандарту ISO 4217 | [types/products.types.ts:315](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L315) |
| <a id="discount"></a> `discount?` | `number` | Скидка, % | [types/products.types.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L317) |
| <a id="clubdiscount"></a> `clubDiscount?` | `number` | Скидка WB Клуба, % | [types/products.types.ts:319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L319) |
| <a id="status"></a> `status?` | `number` | - | [types/products.types.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L320) |
| <a id="errortext"></a> `errorText?` | `string` | Текст ошибки. Например: - `You can't change the item price. Item was added to the Sale due to high inventory` — ошибка возникает, если товар попал под распродажу по [индексу остатка](https://seller.wildberries.ru/instructions/ru/ru/material/A-1159). - `The new price is several times lower than the current price. Item has been moved to Price Quarantine` — ошибка возникает, если новая цена со скидкой хотя бы в 3 раза меньше старой. Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine). | [types/products.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/products.types.ts#L322) |

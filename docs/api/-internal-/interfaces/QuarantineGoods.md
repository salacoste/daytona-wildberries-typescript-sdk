[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / QuarantineGoods

# Interface: QuarantineGoods

Defined in: [types/products.types.ts:494](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L494)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:496](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L496) |
| <a id="sizeid"></a> `sizeID?` | `number` | Не используется | [types/products.types.ts:498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L498) |
| <a id="techsizename"></a> `techSizeName?` | `string` | Не используется | [types/products.types.ts:500](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L500) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта по стандарту ISO 4217 | [types/products.types.ts:502](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L502) |
| <a id="newprice"></a> `newPrice?` | `number` | Новая цена продавца до скидки | [types/products.types.ts:504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L504) |
| <a id="oldprice"></a> `oldPrice?` | `number` | Текущая цена продавца до скидки | [types/products.types.ts:506](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L506) |
| <a id="newdiscount"></a> `newDiscount?` | `number` | Новая скидка продавца, % | [types/products.types.ts:508](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L508) |
| <a id="olddiscount"></a> `oldDiscount?` | `number` | Текущая скидка продавца, % | [types/products.types.ts:510](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L510) |
| <a id="pricediff"></a> `priceDiff?` | `number` | Разница: `newPrice` * (1 - `newDiscount` / 100) - `oldPrice` * (1 - `oldDiscount` / 100) | [types/products.types.ts:512](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L512) |

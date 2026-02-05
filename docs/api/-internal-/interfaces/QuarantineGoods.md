[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / QuarantineGoods

# Interface: QuarantineGoods

Defined in: [types/products.types.ts:437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L437)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L439) |
| <a id="sizeid"></a> `sizeID?` | `number` | Не используется | [types/products.types.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L441) |
| <a id="techsizename"></a> `techSizeName?` | `string` | Не используется | [types/products.types.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L443) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта по стандарту ISO 4217 | [types/products.types.ts:445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L445) |
| <a id="newprice"></a> `newPrice?` | `number` | Новая цена продавца до скидки | [types/products.types.ts:447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L447) |
| <a id="oldprice"></a> `oldPrice?` | `number` | Текущая цена продавца до скидки | [types/products.types.ts:449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L449) |
| <a id="newdiscount"></a> `newDiscount?` | `number` | Новая скидка продавца, % | [types/products.types.ts:451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L451) |
| <a id="olddiscount"></a> `oldDiscount?` | `number` | Текущая скидка продавца, % | [types/products.types.ts:453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L453) |
| <a id="pricediff"></a> `priceDiff?` | `number` | Разница: `newPrice` * (1 - `newDiscount` / 100) - `oldPrice` * (1 - `oldDiscount` / 100) | [types/products.types.ts:455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/products.types.ts#L455) |

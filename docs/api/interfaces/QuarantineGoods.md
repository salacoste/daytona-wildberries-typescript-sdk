[Wildberries API TypeScript SDK](../modules.md) / QuarantineGoods

# Interface: QuarantineGoods

Defined in: [types/products.types.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L434)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L436) |
| <a id="sizeid"></a> `sizeID?` | `number` | Не используется | [types/products.types.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L438) |
| <a id="techsizename"></a> `techSizeName?` | `string` | Не используется | [types/products.types.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L440) |
| <a id="currencyisocode4217"></a> `currencyIsoCode4217?` | `string` | Валюта по стандарту ISO 4217 | [types/products.types.ts:442](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L442) |
| <a id="newprice"></a> `newPrice?` | `number` | Новая цена продавца до скидки | [types/products.types.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L444) |
| <a id="oldprice"></a> `oldPrice?` | `number` | Текущая цена продавца до скидки | [types/products.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L446) |
| <a id="newdiscount"></a> `newDiscount?` | `number` | Новая скидка продавца, % | [types/products.types.ts:448](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L448) |
| <a id="olddiscount"></a> `oldDiscount?` | `number` | Текущая скидка продавца, % | [types/products.types.ts:450](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L450) |
| <a id="pricediff"></a> `priceDiff?` | `number` | Разница: `newPrice` * (1 - `newDiscount` / 100) - `oldPrice` * (1 - `oldDiscount` / 100) | [types/products.types.ts:452](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L452) |

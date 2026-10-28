[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FinalPriceData

# Interface: FinalPriceData

Defined in: [types/orders-dbs.types.ts:706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L706)

Seller prices and buyer-payable sums for one assembly order.

All amounts are multiplied by 100 (kopecks etc.). For calculations use
`originalFinalPrice` / `convertedOriginalFinalPrice` — the seller prices
(`originalPrice` / `convertedOriginalPrice`) exclude discounts, while the
final prices include ALL discounts and cashback.

## Since

task-203

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="originalprice"></a> `originalPrice?` | `number` | Seller price in the currency of sale, excluding discounts, multiplied by 100. | [types/orders-dbs.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L708) |
| <a id="convertedoriginalprice"></a> `convertedOriginalPrice?` | `number` | Seller price in the currency of the seller country, excluding discounts, multiplied by 100. | [types/orders-dbs.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L710) |
| <a id="originalfinalprice"></a> `originalFinalPrice?` | `number` | Sum charged to the buyer in the currency of sale including all discounts and cashback, multiplied by 100. Informational. | [types/orders-dbs.types.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L712) |
| <a id="convertedoriginalfinalprice"></a> `convertedOriginalFinalPrice?` | `number` | Sum charged to the buyer in the currency of the seller country including all discounts and cashback, multiplied by 100. Informational. | [types/orders-dbs.types.ts:714](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L714) |
| <a id="currencycode"></a> `currencyCode?` | `number` | Sale currency code (ISO 4217 numeric, e.g. `643` for RUB). | [types/orders-dbs.types.ts:716](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L716) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode?` | `number` | Currency code of the seller country (ISO 4217 numeric). | [types/orders-dbs.types.ts:718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L718) |

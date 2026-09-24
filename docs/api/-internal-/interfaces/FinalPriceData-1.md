[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FinalPriceData

# Interface: FinalPriceData

Defined in: [types/orders-dbs.types.ts:657](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L657)

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
| <a id="originalprice"></a> `originalPrice?` | `number` | Seller price in the currency of sale, excluding discounts, multiplied by 100. | [types/orders-dbs.types.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L659) |
| <a id="convertedoriginalprice"></a> `convertedOriginalPrice?` | `number` | Seller price in the currency of the seller country, excluding discounts, multiplied by 100. | [types/orders-dbs.types.ts:661](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L661) |
| <a id="originalfinalprice"></a> `originalFinalPrice?` | `number` | Sum charged to the buyer in the currency of sale including all discounts and cashback, multiplied by 100. Informational. | [types/orders-dbs.types.ts:663](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L663) |
| <a id="convertedoriginalfinalprice"></a> `convertedOriginalFinalPrice?` | `number` | Sum charged to the buyer in the currency of the seller country including all discounts and cashback, multiplied by 100. Informational. | [types/orders-dbs.types.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L665) |
| <a id="currencycode"></a> `currencyCode?` | `number` | Sale currency code (ISO 4217 numeric, e.g. `643` for RUB). | [types/orders-dbs.types.ts:667](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L667) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode?` | `number` | Currency code of the seller country (ISO 4217 numeric). | [types/orders-dbs.types.ts:669](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L669) |

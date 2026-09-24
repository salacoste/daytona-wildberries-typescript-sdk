[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FinalPriceData

# Interface: FinalPriceData

Defined in: [types/in-store-pickup.types.ts:420](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L420)

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
| <a id="originalprice"></a> `originalPrice?` | `number` | Seller price in the currency of sale, excluding discounts, multiplied by 100. | [types/in-store-pickup.types.ts:422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L422) |
| <a id="convertedoriginalprice"></a> `convertedOriginalPrice?` | `number` | Seller price in the currency of the seller country, excluding discounts, multiplied by 100. | [types/in-store-pickup.types.ts:424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L424) |
| <a id="originalfinalprice"></a> `originalFinalPrice?` | `number` | Sum charged to the buyer in the currency of sale including all discounts and cashback, multiplied by 100. Informational. | [types/in-store-pickup.types.ts:426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L426) |
| <a id="convertedoriginalfinalprice"></a> `convertedOriginalFinalPrice?` | `number` | Sum charged to the buyer in the currency of the seller country including all discounts and cashback, multiplied by 100. Informational. | [types/in-store-pickup.types.ts:428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L428) |
| <a id="currencycode"></a> `currencyCode?` | `number` | Sale currency code (ISO 4217 numeric, e.g. `643` for RUB). | [types/in-store-pickup.types.ts:430](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L430) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode?` | `number` | Currency code of the seller country (ISO 4217 numeric). | [types/in-store-pickup.types.ts:432](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L432) |

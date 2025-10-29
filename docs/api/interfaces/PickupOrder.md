[Wildberries API TypeScript SDK](../modules.md) / PickupOrder

# Interface: PickupOrder

Defined in: [types/in-store-pickup.types.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L69)

Completed order information

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Order ID | [types/in-store-pickup.types.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L71) |
| <a id="warehouseid"></a> `warehouseId` | `number` | Warehouse ID | [types/in-store-pickup.types.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L73) |
| <a id="warehouseaddress"></a> `warehouseAddress` | `string` | Warehouse address | [types/in-store-pickup.types.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L75) |
| <a id="nmid"></a> `nmId` | `number` | Wildberries article number | [types/in-store-pickup.types.ts:77](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L77) |
| <a id="article"></a> `article` | `string` | Seller's article | [types/in-store-pickup.types.ts:79](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L79) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID in WB system | [types/in-store-pickup.types.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L81) |
| <a id="skus"></a> `skus` | `string`[] | Product barcodes | [types/in-store-pickup.types.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L83) |
| <a id="rid"></a> `rid` | `string` | Unique order ID | [types/in-store-pickup.types.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L85) |
| <a id="ordercode"></a> `orderCode` | `string` | Customer's unique order code | [types/in-store-pickup.types.ts:87](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L87) |
| <a id="paymode"></a> `payMode` | `string` | Payment mode: prepaid, postpaid, or unknown | [types/in-store-pickup.types.ts:89](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L89) |
| <a id="price"></a> `price` | `number` | Price with discounts (excluding WB Wallet), multiplied by 100 | [types/in-store-pickup.types.ts:91](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L91) |
| <a id="finalprice"></a> `finalPrice` | `number` | Final price to pay, multiplied by 100 | [types/in-store-pickup.types.ts:93](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L93) |
| <a id="convertedprice"></a> `convertedPrice` | `number` | Converted price in seller's currency, multiplied by 100 | [types/in-store-pickup.types.ts:95](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L95) |
| <a id="convertedfinalprice"></a> `convertedFinalPrice` | `number` | Converted final price in seller's currency, multiplied by 100 | [types/in-store-pickup.types.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L97) |
| <a id="currencycode"></a> `currencyCode` | `number` | Currency code (ISO 4217) | [types/in-store-pickup.types.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L99) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode` | `number` | Seller's currency code (ISO 4217) | [types/in-store-pickup.types.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L101) |
| <a id="cargotype"></a> `cargoType` | `1` \| `2` \| `3` | Cargo type: 1 = small, 2 = oversized, 3 = large | [types/in-store-pickup.types.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L103) |
| <a id="iszeroorder"></a> `isZeroOrder` | `boolean` | Is this a zero-stock order | [types/in-store-pickup.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L105) |
| <a id="createdat"></a> `createdAt` | `string` | Order creation timestamp (RFC3339) | [types/in-store-pickup.types.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/in-store-pickup.types.ts#L107) |

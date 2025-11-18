[Wildberries API TypeScript SDK](../modules.md) / PickupNewOrder

# Interface: PickupNewOrder

Defined in: [types/in-store-pickup.types.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L11)

New order for in-store pickup

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Order ID | [types/in-store-pickup.types.ts:13](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L13) |
| <a id="warehouseid"></a> `warehouseId` | `number` | Warehouse ID where order should be assembled | [types/in-store-pickup.types.ts:15](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L15) |
| <a id="warehouseaddress"></a> `warehouseAddress` | `string` | Warehouse address | [types/in-store-pickup.types.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L17) |
| <a id="nmid"></a> `nmId` | `number` | Wildberries article number | [types/in-store-pickup.types.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L19) |
| <a id="article"></a> `article` | `string` | Seller's article | [types/in-store-pickup.types.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L21) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID in WB system | [types/in-store-pickup.types.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L23) |
| <a id="skus"></a> `skus` | `string`[] | Product barcodes | [types/in-store-pickup.types.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L25) |
| <a id="rid"></a> `rid` | `string` | Unique order ID | [types/in-store-pickup.types.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L27) |
| <a id="ordercode"></a> `orderCode` | `string` | Customer's unique order code | [types/in-store-pickup.types.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L29) |
| <a id="paymode"></a> `payMode` | `string` | Payment mode: prepaid, postpaid, or unknown | [types/in-store-pickup.types.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L31) |
| <a id="price"></a> `price` | `number` | Price with discounts (excluding WB Wallet), multiplied by 100 | [types/in-store-pickup.types.ts:33](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L33) |
| <a id="finalprice"></a> `finalPrice` | `number` | Final price to pay, multiplied by 100 | [types/in-store-pickup.types.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L35) |
| <a id="convertedprice"></a> `convertedPrice` | `number` | Converted price in seller's currency, multiplied by 100 | [types/in-store-pickup.types.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L37) |
| <a id="convertedfinalprice"></a> `convertedFinalPrice` | `number` | Converted final price in seller's currency, multiplied by 100 | [types/in-store-pickup.types.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L39) |
| <a id="saleprice"></a> `salePrice` | `number` \| `null` | Sale price in seller's currency, multiplied by 100 | [types/in-store-pickup.types.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L41) |
| <a id="currencycode"></a> `currencyCode` | `number` | Currency code (ISO 4217) | [types/in-store-pickup.types.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L43) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode` | `number` | Seller's currency code (ISO 4217) | [types/in-store-pickup.types.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L45) |
| <a id="cargotype"></a> `cargoType` | `1` \| `2` \| `3` | Cargo type: 1 = small, 2 = oversized, 3 = large | [types/in-store-pickup.types.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L47) |
| <a id="iszeroorder"></a> `isZeroOrder` | `boolean` | Is this a zero-stock order | [types/in-store-pickup.types.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L49) |
| <a id="ddate"></a> `ddate` | `string` | Planned delivery date | [types/in-store-pickup.types.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L51) |
| <a id="createdat"></a> `createdAt` | `string` | Order creation timestamp (RFC3339) | [types/in-store-pickup.types.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L53) |
| <a id="requiredmeta"></a> `requiredMeta` | `string`[] \| `null` | List of required metadata types for this order | [types/in-store-pickup.types.ts:55](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/in-store-pickup.types.ts#L55) |

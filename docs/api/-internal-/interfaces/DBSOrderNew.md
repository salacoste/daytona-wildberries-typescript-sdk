[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSOrderNew

# Interface: DBSOrderNew

Defined in: [types/orders-dbs.types.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L76)

New DBS order (assembly task) awaiting processing
Contains delivery window, customer address, and required metadata

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-dbs.types.ts:78](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L78) |
| <a id="address"></a> `address?` | [`DBSAddress`](DBSAddress.md) | Delivery address with GPS coordinates | [types/orders-dbs.types.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L80) |
| <a id="ddate"></a> `ddate?` | `string` | Planned delivery date (YYYY-MM-DD) | [types/orders-dbs.types.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L82) |
| <a id="saleprice"></a> `salePrice?` | `number` | Sale price | [types/orders-dbs.types.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L84) |
| <a id="dtimefrom"></a> `dTimeFrom?` | `string` | Delivery window start time (HH:MM) | [types/orders-dbs.types.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L86) |
| <a id="dtimeto"></a> `dTimeTo?` | `string` | Delivery window end time (HH:MM) | [types/orders-dbs.types.ts:88](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L88) |
| <a id="requiredmeta"></a> `requiredMeta?` | `string`[] | Required metadata types (sgtin, imei, uin, gtin, customsDeclaration) | [types/orders-dbs.types.ts:90](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L90) |
| <a id="deliverytype"></a> `deliveryType?` | `"dbs"` \| `"edbs"` | Delivery type: 'dbs' (seller delivery) | 'edbs' (express seller delivery) | [types/orders-dbs.types.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L92) |
| <a id="comment"></a> `comment?` | `string` | Customer comment | [types/orders-dbs.types.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L94) |
| <a id="orderuid"></a> `orderUid?` | `string` | Transaction ID for grouping orders in same cart | [types/orders-dbs.types.ts:96](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L96) |
| <a id="article"></a> `article?` | `string` | Seller article | [types/orders-dbs.types.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L98) |
| <a id="colorcode"></a> `colorCode?` | `string` | Color code (for customizable products) | [types/orders-dbs.types.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L100) |
| <a id="rid"></a> `rid?` | `string` | Unique order ID (srid in other methods) | [types/orders-dbs.types.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L102) |
| <a id="createdat"></a> `createdAt?` | `string` | Order creation date (RFC3339) | [types/orders-dbs.types.ts:104](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L104) |
| <a id="skus"></a> `skus?` | `string`[] | List of barcodes | [types/orders-dbs.types.ts:106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L106) |
| <a id="warehouseid"></a> `warehouseId?` | `number` | Seller warehouse ID | [types/orders-dbs.types.ts:108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L108) |
| <a id="nmid"></a> `nmId?` | `number` | WB article number | [types/orders-dbs.types.ts:110](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L110) |
| <a id="chrtid"></a> `chrtId?` | `number` | Product size ID in WB system | [types/orders-dbs.types.ts:112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L112) |
| <a id="price"></a> `price?` | `number` | Price in sale currency * 100 | [types/orders-dbs.types.ts:114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L114) |
| <a id="convertedprice"></a> `convertedPrice?` | `number` | Price in seller's country currency * 100 | [types/orders-dbs.types.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L116) |
| <a id="currencycode"></a> `currencyCode?` | `number` | Sale currency code | [types/orders-dbs.types.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L118) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode?` | `number` | Seller's country currency code | [types/orders-dbs.types.ts:120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L120) |
| <a id="cargotype"></a> `cargoType?` | `number` | Cargo type: 1 - small, 2 - oversized, 3 - large | [types/orders-dbs.types.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L122) |
| <a id="iszeroorder"></a> `isZeroOrder?` | `boolean` | Whether this is a zero-stock order | [types/orders-dbs.types.ts:124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L124) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSOrderNew

# Interface: DBSOrderNew

Defined in: [types/orders-dbs.types.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L31)

New DBS order (assembly task) awaiting processing
Contains delivery window, customer address, and required metadata

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-dbs.types.ts:33](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L33) |
| <a id="address"></a> `address?` | [`DBSAddress`](DBSAddress.md) | Delivery address with GPS coordinates | [types/orders-dbs.types.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L35) |
| <a id="ddate"></a> `ddate?` | `string` | Planned delivery date (YYYY-MM-DD) | [types/orders-dbs.types.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L37) |
| <a id="saleprice"></a> `salePrice?` | `number` | Sale price | [types/orders-dbs.types.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L39) |
| <a id="dtimefrom"></a> `dTimeFrom?` | `string` | Delivery window start time (HH:MM) | [types/orders-dbs.types.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L41) |
| <a id="dtimeto"></a> `dTimeTo?` | `string` | Delivery window end time (HH:MM) | [types/orders-dbs.types.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L43) |
| <a id="requiredmeta"></a> `requiredMeta?` | `string`[] | Required metadata types (sgtin, imei, uin, gtin, customsDeclaration) | [types/orders-dbs.types.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L45) |
| <a id="deliverytype"></a> `deliveryType?` | `"dbs"` | Delivery type - always 'dbs' for DBS orders | [types/orders-dbs.types.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L47) |
| <a id="comment"></a> `comment?` | `string` | Customer comment | [types/orders-dbs.types.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L49) |
| <a id="orderuid"></a> `orderUid?` | `string` | Transaction ID for grouping orders in same cart | [types/orders-dbs.types.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L51) |
| <a id="article"></a> `article?` | `string` | Seller article | [types/orders-dbs.types.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L53) |
| <a id="colorcode"></a> `colorCode?` | `string` | Color code (for customizable products) | [types/orders-dbs.types.ts:55](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L55) |
| <a id="rid"></a> `rid?` | `string` | Unique order ID (srid in other methods) | [types/orders-dbs.types.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L57) |
| <a id="createdat"></a> `createdAt?` | `string` | Order creation date (RFC3339) | [types/orders-dbs.types.ts:59](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L59) |
| <a id="skus"></a> `skus?` | `string`[] | List of barcodes | [types/orders-dbs.types.ts:61](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L61) |
| <a id="warehouseid"></a> `warehouseId?` | `number` | Seller warehouse ID | [types/orders-dbs.types.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L63) |
| <a id="nmid"></a> `nmId?` | `number` | WB article number | [types/orders-dbs.types.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L65) |
| <a id="chrtid"></a> `chrtId?` | `number` | Product size ID in WB system | [types/orders-dbs.types.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L67) |
| <a id="price"></a> `price?` | `number` | Price in sale currency * 100 | [types/orders-dbs.types.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L69) |
| <a id="convertedprice"></a> `convertedPrice?` | `number` | Price in seller's country currency * 100 | [types/orders-dbs.types.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L71) |
| <a id="currencycode"></a> `currencyCode?` | `number` | Sale currency code | [types/orders-dbs.types.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L73) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode?` | `number` | Seller's country currency code | [types/orders-dbs.types.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L75) |
| <a id="cargotype"></a> `cargoType?` | `number` | Cargo type: 1 - small, 2 - oversized, 3 - large | [types/orders-dbs.types.ts:77](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L77) |
| <a id="iszeroorder"></a> `isZeroOrder?` | `boolean` | Whether this is a zero-stock order | [types/orders-dbs.types.ts:79](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/orders-dbs.types.ts#L79) |

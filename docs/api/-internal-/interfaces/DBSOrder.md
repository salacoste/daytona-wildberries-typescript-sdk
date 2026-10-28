[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSOrder

# Interface: DBSOrder

Defined in: [types/orders-dbs.types.ts:131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L131)

Completed DBS order information
Returned by getOrders for completed/cancelled orders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-dbs.types.ts:133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L133) |
| <a id="address"></a> `address?` | [`DBSAddress`](DBSAddress.md) | Delivery address with GPS coordinates | [types/orders-dbs.types.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L135) |
| <a id="deliverytype"></a> `deliveryType?` | `string` | Delivery type | [types/orders-dbs.types.ts:137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L137) |
| <a id="orderuid"></a> `orderUid?` | `string` | Transaction ID for grouping orders in same cart | [types/orders-dbs.types.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L139) |
| <a id="article"></a> `article?` | `string` | Seller article | [types/orders-dbs.types.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L141) |
| <a id="colorcode"></a> `colorCode?` | `string` | Color code (for customizable products) | [types/orders-dbs.types.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L143) |
| <a id="rid"></a> `rid?` | `string` | Unique order ID (srid in other methods) | [types/orders-dbs.types.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L145) |
| <a id="createdat"></a> `createdAt?` | `string` | Order creation date | [types/orders-dbs.types.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L147) |
| <a id="skus"></a> `skus?` | `string`[] | List of barcodes | [types/orders-dbs.types.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L149) |
| <a id="warehouseid"></a> `warehouseId?` | `number` | Seller warehouse ID | [types/orders-dbs.types.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L151) |
| <a id="nmid"></a> `nmId?` | `number` | WB article number | [types/orders-dbs.types.ts:153](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L153) |
| <a id="chrtid"></a> `chrtId?` | `number` | Product size ID in WB system | [types/orders-dbs.types.ts:155](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L155) |
| <a id="price"></a> `price?` | `number` | Price in sale currency * 100 | [types/orders-dbs.types.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L157) |
| <a id="convertedprice"></a> `convertedPrice?` | `number` | Price in seller's country currency * 100 | [types/orders-dbs.types.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L159) |
| <a id="currencycode"></a> `currencyCode?` | `number` | Sale currency code | [types/orders-dbs.types.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L161) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode?` | `number` | Seller's country currency code | [types/orders-dbs.types.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L163) |
| <a id="cargotype"></a> `cargoType?` | `number` | Cargo type: 1 - small, 2 - oversized, 3 - large | [types/orders-dbs.types.ts:165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L165) |
| <a id="comment"></a> `comment?` | `string` | Customer comment | [types/orders-dbs.types.ts:167](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L167) |
| <a id="iszeroorder"></a> `isZeroOrder?` | `boolean` | Whether this is a zero-stock order | [types/orders-dbs.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L169) |

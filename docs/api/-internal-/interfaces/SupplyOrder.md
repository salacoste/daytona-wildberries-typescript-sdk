[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyOrder

# Interface: SupplyOrder

Defined in: [types/orders-fbs.types.ts:557](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L557)

Order within a supply (legacy response format)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="scanprice"></a> `scanPrice?` | `number` | Acceptance price in kopecks; always null for this endpoint | [types/orders-fbs.types.ts:559](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L559) |
| <a id="orderuid"></a> `orderUid?` | `string` | Transaction ID for grouping orders from the same buyer cart | [types/orders-fbs.types.ts:561](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L561) |
| <a id="article"></a> `article?` | `string` | Seller article | [types/orders-fbs.types.ts:563](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L563) |
| <a id="colorcode"></a> `colorCode?` | `string` | Color code (only for tintable products) | [types/orders-fbs.types.ts:565](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L565) |
| <a id="rid"></a> `rid?` | `string` | Unique order ID (corresponds to srid in other report endpoints) | [types/orders-fbs.types.ts:567](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L567) |
| <a id="createdat"></a> `createdAt?` | `string` | Order creation date (RFC3339) | [types/orders-fbs.types.ts:569](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L569) |
| <a id="offices"></a> `offices?` | `string`[] | List of offices where the product should be delivered | [types/orders-fbs.types.ts:571](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L571) |
| <a id="skus"></a> `skus?` | `string`[] | List of barcodes | [types/orders-fbs.types.ts:573](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L573) |
| <a id="id"></a> `id?` | `number` | Assembly order ID | [types/orders-fbs.types.ts:575](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L575) |
| <a id="warehouseid"></a> `warehouseId?` | `number` | Seller warehouse ID that received the order | [types/orders-fbs.types.ts:577](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L577) |
| <a id="nmid"></a> `nmId?` | `number` | WB article number | [types/orders-fbs.types.ts:579](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L579) |
| <a id="chrtid"></a> `chrtId?` | `number` | Product size ID in the WB system | [types/orders-fbs.types.ts:581](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L581) |
| <a id="price"></a> `price?` | `number` | Price in sale currency with all discounts except WB Wallet, multiplied by 100 | [types/orders-fbs.types.ts:583](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L583) |
| <a id="convertedprice"></a> `convertedPrice?` | `number` | Price in seller's country currency with all discounts except WB Wallet, multiplied by 100 | [types/orders-fbs.types.ts:585](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L585) |
| <a id="currencycode"></a> `currencyCode?` | `number` | Sale currency code (ISO 4217) | [types/orders-fbs.types.ts:587](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L587) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode?` | `number` | Seller's country currency code (ISO 4217) | [types/orders-fbs.types.ts:589](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L589) |
| <a id="cargotype"></a> `cargoType?` | [`CargoType`](../type-aliases/CargoType.md) | Cargo type: 1 = small, 2 = oversized, 3 = large | [types/orders-fbs.types.ts:591](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L591) |
| <a id="iszeroorder"></a> `isZeroOrder?` | `boolean` | Whether this is a zero-stock order (can be cancelled without penalty) | [types/orders-fbs.types.ts:593](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbs.types.ts#L593) |

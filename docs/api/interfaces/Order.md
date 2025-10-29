[Wildberries API TypeScript SDK](../modules.md) / Order

# Interface: Order

Defined in: [types/orders-fbs.types.ts:74](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L74)

FBS Order (сборочное задание - assembly task)

Represents an order that needs to be fulfilled by the seller from their
own warehouse and delivered to Wildberries offices.

## Extended by

- [`OrderNew`](OrderNew.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Order ID | [types/orders-fbs.types.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L76) |
| <a id="article"></a> `article` | `string` | Seller article | [types/orders-fbs.types.ts:78](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L78) |
| <a id="skus"></a> `skus` | `string`[] | Product barcodes | [types/orders-fbs.types.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L80) |
| <a id="rid"></a> `rid` | `string` | Unique order ID (maps to srid in reports) | [types/orders-fbs.types.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L82) |
| <a id="createdat"></a> `createdAt` | `string` | Order creation timestamp (ISO 8601, RFC3339) | [types/orders-fbs.types.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L84) |
| <a id="orderuid"></a> `orderUid` | `string` | Transaction ID (groups orders from same cart) | [types/orders-fbs.types.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L86) |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/orders-fbs.types.ts:90](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L90) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID in WB system | [types/orders-fbs.types.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L92) |
| <a id="price"></a> `price` | `number` | Price with discounts × 100 | [types/orders-fbs.types.ts:96](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L96) |
| <a id="convertedprice"></a> `convertedPrice` | `number` | Price in seller currency × 100 | [types/orders-fbs.types.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L98) |
| <a id="currencycode"></a> `currencyCode` | `number` | ISO 4217 currency code | [types/orders-fbs.types.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L100) |
| <a id="convertedcurrencycode"></a> `convertedCurrencyCode` | `number` | Seller currency code | [types/orders-fbs.types.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L102) |
| <a id="scanprice"></a> `scanPrice?` | `number` | Acceptance price in kopecks (after actual acceptance) | [types/orders-fbs.types.ts:104](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L104) |
| <a id="deliverytype"></a> `deliveryType` | `"fbs"` | Delivery type - always 'fbs' for this module | [types/orders-fbs.types.ts:108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L108) |
| <a id="address"></a> `address?` | [`Address`](Address.md) | Delivery address (if applicable) | [types/orders-fbs.types.ts:110](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L110) |
| <a id="offices"></a> `offices?` | `string`[] | WB offices to deliver to | [types/orders-fbs.types.ts:112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L112) |
| <a id="warehouseid"></a> `warehouseId` | `number` | Seller warehouse ID | [types/orders-fbs.types.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L116) |
| <a id="officeid"></a> `officeId` | `number` | WB office ID bound to seller warehouse | [types/orders-fbs.types.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L118) |
| <a id="supplyid"></a> `supplyId?` | `string` | Supply ID if order assigned to supply | [types/orders-fbs.types.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L122) |
| <a id="cargotype"></a> `cargoType` | `1` \| `2` \| `3` | Cargo type: 1=МГТ, 2=СГТ, 3=КГТ+ | [types/orders-fbs.types.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L126) |
| <a id="colorcode"></a> `colorCode?` | `string` | Color code (for colorable goods) | [types/orders-fbs.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L128) |
| <a id="comment"></a> `comment?` | `string` | Customer comment (max 300 chars) | [types/orders-fbs.types.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L130) |
| <a id="iszeroorder"></a> `isZeroOrder` | `boolean` | Zero stock order flag true = ordered with zero stock (can cancel without penalty) | [types/orders-fbs.types.ts:138](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L138) |
| <a id="options"></a> `options?` | \{ `isB2b`: `boolean`; \} | - | [types/orders-fbs.types.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L141) |
| `options.isB2b` | `boolean` | B2B sale flag | [types/orders-fbs.types.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/orders-fbs.types.ts#L143) |

[Wildberries API TypeScript SDK](../modules.md) / OrdersItem

# Interface: OrdersItem

Defined in: [types/reports.types.ts:95](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L95)

Order item information

Data is updated every 30 minutes. Maximum 80,000 rows per response.
Data retention: 90 days from order creation.
Note: 1 row = 1 order = 1 assembly task = 1 product unit

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date` | `string` | Order date/time (Moscow UTC+3). Corresponds to dateFrom when flag=1 | [types/reports.types.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L97) |
| <a id="lastchangedate"></a> `lastChangeDate` | `string` | Last update date in service (Moscow UTC+3). Corresponds to dateFrom when flag=0 or undefined | [types/reports.types.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L99) |
| <a id="warehousename"></a> `warehouseName` | `string` | Shipment warehouse | [types/reports.types.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L101) |
| <a id="warehousetype"></a> `warehouseType` | `"Склад WB"` \| `"Склад продавца"` | Warehouse storage type | [types/reports.types.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L103) |
| <a id="countryname"></a> `countryName` | `string` | Country | [types/reports.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L105) |
| <a id="oblastokrugname"></a> `oblastOkrugName` | `string` | District | [types/reports.types.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L107) |
| <a id="regionname"></a> `regionName` | `string` | Region | [types/reports.types.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L109) |
| <a id="supplierarticle"></a> `supplierArticle` | `string` | Seller article | [types/reports.types.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L111) |
| <a id="nmid"></a> `nmId` | `number` | WB article (nmId) | [types/reports.types.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L113) |
| <a id="barcode"></a> `barcode` | `string` | Barcode | [types/reports.types.ts:115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L115) |
| <a id="category"></a> `category` | `string` | Category | [types/reports.types.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L117) |
| <a id="subject"></a> `subject` | `string` | Subject | [types/reports.types.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L119) |
| <a id="brand"></a> `brand` | `string` | Brand | [types/reports.types.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L121) |
| <a id="techsize"></a> `techSize` | `string` | Item size | [types/reports.types.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L123) |
| <a id="incomeid"></a> `incomeID` | `number` | Shipment number | [types/reports.types.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L125) |
| <a id="issupply"></a> `isSupply` | `boolean` | Supply contract | [types/reports.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L127) |
| <a id="isrealization"></a> `isRealization` | `boolean` | Realization contract | [types/reports.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L129) |
| <a id="totalprice"></a> `totalPrice` | `number` | Price without discounts | [types/reports.types.ts:131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L131) |
| <a id="discountpercent"></a> `discountPercent` | `number` | Seller discount, % | [types/reports.types.ts:133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L133) |
| <a id="spp"></a> `spp` | `number` | WB discount, % | [types/reports.types.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L135) |
| <a id="finishedprice"></a> `finishedPrice` | `number` | Price with all discounts except WB Wallet | [types/reports.types.ts:137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L137) |
| <a id="pricewithdisc"></a> `priceWithDisc` | `number` | Price with seller discount (totalPrice * (1 - discountPercent/100)) | [types/reports.types.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L139) |
| <a id="iscancel"></a> `isCancel` | `boolean` | Order canceled: true - order canceled | [types/reports.types.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L141) |
| <a id="canceldate"></a> `cancelDate` | `string` | Cancellation date/time. "0001-01-01T00:00:00" if not canceled (Moscow UTC+3) | [types/reports.types.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L143) |
| <a id="sticker"></a> `sticker` | `string` | Sticker ID | [types/reports.types.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L145) |
| <a id="gnumber"></a> `gNumber` | `string` | Customer cart ID. Orders from same transaction have same gNumber | [types/reports.types.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L147) |
| <a id="srid"></a> `srid` | `string` | Unique order ID. Note: srid equals rid in Marketplace API assembly tasks | [types/reports.types.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L149) |

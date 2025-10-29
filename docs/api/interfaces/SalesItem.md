[Wildberries API TypeScript SDK](../modules.md) / SalesItem

# Interface: SalesItem

Defined in: [types/reports.types.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L160)

Sales and returns item

Extends OrdersItem with payment-specific fields.
Data is updated every 30 minutes. Maximum 80,000 rows per response.
Data retention: 90 days from order creation.

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date` | `string` | Sale/return date (Moscow UTC+3). Corresponds to dateFrom when flag=1 | [types/reports.types.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L162) |
| <a id="lastchangedate"></a> `lastChangeDate` | `string` | Last update date in service (Moscow UTC+3). Corresponds to dateFrom when flag=0 or undefined | [types/reports.types.ts:164](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L164) |
| <a id="warehousename"></a> `warehouseName` | `string` | Shipment warehouse | [types/reports.types.ts:166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L166) |
| <a id="warehousetype"></a> `warehouseType` | `"Склад WB"` \| `"Склад продавца"` | Warehouse storage type | [types/reports.types.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L168) |
| <a id="countryname"></a> `countryName` | `string` | Country | [types/reports.types.ts:170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L170) |
| <a id="oblastokrugname"></a> `oblastOkrugName` | `string` | District | [types/reports.types.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L172) |
| <a id="regionname"></a> `regionName` | `string` | Region | [types/reports.types.ts:174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L174) |
| <a id="supplierarticle"></a> `supplierArticle` | `string` | Seller article | [types/reports.types.ts:176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L176) |
| <a id="nmid"></a> `nmId` | `number` | WB article (nmId) | [types/reports.types.ts:178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L178) |
| <a id="barcode"></a> `barcode` | `string` | Barcode | [types/reports.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L180) |
| <a id="category"></a> `category` | `string` | Category | [types/reports.types.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L182) |
| <a id="subject"></a> `subject` | `string` | Subject | [types/reports.types.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L184) |
| <a id="brand"></a> `brand` | `string` | Brand | [types/reports.types.ts:186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L186) |
| <a id="techsize"></a> `techSize` | `string` | Item size | [types/reports.types.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L188) |
| <a id="incomeid"></a> `incomeID` | `number` | Shipment number | [types/reports.types.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L190) |
| <a id="issupply"></a> `isSupply` | `boolean` | Supply contract | [types/reports.types.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L192) |
| <a id="isrealization"></a> `isRealization` | `boolean` | Realization contract | [types/reports.types.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L194) |
| <a id="totalprice"></a> `totalPrice` | `number` | Price without discounts | [types/reports.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L196) |
| <a id="discountpercent"></a> `discountPercent` | `number` | Seller discount, % | [types/reports.types.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L198) |
| <a id="spp"></a> `spp` | `number` | WB discount, % | [types/reports.types.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L200) |
| <a id="paymentsaleamount"></a> `paymentSaleAmount` | `number` | Discount for WB Wallet payment, ₽. Negative value indicates return | [types/reports.types.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L202) |
| <a id="forpay"></a> `forPay` | `number` | Amount to be paid to seller | [types/reports.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L204) |
| <a id="finishedprice"></a> `finishedPrice` | `number` | Actual price with all discounts (charged to customer) | [types/reports.types.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L206) |
| <a id="pricewithdisc"></a> `priceWithDisc` | `number` | Price with seller discount used to calculate forPay (totalPrice * (1 - discountPercent/100)) | [types/reports.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L208) |
| <a id="saleid"></a> `saleID` | `string` | Unique sale/return ID. Format: S********** - sale, R********** - return | [types/reports.types.ts:210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L210) |
| <a id="sticker"></a> `sticker` | `string` | Sticker ID | [types/reports.types.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L212) |
| <a id="gnumber"></a> `gNumber` | `string` | Customer cart ID. Orders from same transaction have same gNumber | [types/reports.types.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L214) |
| <a id="srid"></a> `srid` | `string` | Unique order ID. Note: srid equals rid in Marketplace API assembly tasks | [types/reports.types.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L216) |

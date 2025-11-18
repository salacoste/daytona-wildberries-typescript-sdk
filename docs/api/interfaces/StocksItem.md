[Wildberries API TypeScript SDK](../modules.md) / StocksItem

# Interface: StocksItem

Defined in: [types/reports.types.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L48)

Stock level item across WB warehouses

Data is updated every 30 minutes. Maximum 60,000 rows per response.

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="lastchangedate"></a> `lastChangeDate` | `string` | Last update date in service. Used for pagination (Moscow UTC+3) | [types/reports.types.ts:50](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L50) |
| <a id="warehousename"></a> `warehouseName` | `string` | Warehouse name | [types/reports.types.ts:52](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L52) |
| <a id="supplierarticle"></a> `supplierArticle` | `string` | Seller article | [types/reports.types.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L54) |
| <a id="nmid"></a> `nmId` | `number` | WB article (nmId) | [types/reports.types.ts:56](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L56) |
| <a id="barcode"></a> `barcode` | `string` | Barcode | [types/reports.types.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L58) |
| <a id="quantity"></a> `quantity` | `number` | Available quantity for sale (can be added to cart) | [types/reports.types.ts:60](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L60) |
| <a id="inwaytoclient"></a> `inWayToClient` | `number` | Quantity in transit to customer | [types/reports.types.ts:62](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L62) |
| <a id="inwayfromclient"></a> `inWayFromClient` | `number` | Quantity in transit from customer (returns) | [types/reports.types.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L64) |
| <a id="quantityfull"></a> `quantityFull` | `number` | Total unsold quantity at warehouse (quantity + inWayToClient + inWayFromClient) | [types/reports.types.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L66) |
| <a id="category"></a> `category` | `string` | Category | [types/reports.types.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L68) |
| <a id="subject"></a> `subject` | `string` | Subject | [types/reports.types.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L70) |
| <a id="brand"></a> `brand` | `string` | Brand | [types/reports.types.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L72) |
| <a id="techsize"></a> `techSize` | `string` | Size | [types/reports.types.ts:74](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L74) |
| <a id="price"></a> `Price` | `number` | Price | [types/reports.types.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L76) |
| <a id="discount"></a> `Discount` | `number` | Discount | [types/reports.types.ts:78](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L78) |
| <a id="issupply"></a> `isSupply` | `boolean` | Supply contract (internal technical data) | [types/reports.types.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L80) |
| <a id="isrealization"></a> `isRealization` | `boolean` | Realization contract (internal technical data) | [types/reports.types.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L82) |
| <a id="sccode"></a> `SCCode` | `string` | Contract code (internal technical data) | [types/reports.types.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L84) |

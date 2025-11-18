[Wildberries API TypeScript SDK](../modules.md) / IncomesItem

# Interface: IncomesItem

Defined in: [types/reports.types.ts:13](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L13)

Inbound shipment item from warehouses

Data is updated every 30 minutes. Maximum 100,000 rows per response.

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="incomeid"></a> `incomeId` | `number` | Shipment number | [types/reports.types.ts:15](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L15) |
| <a id="number"></a> `number` | `string` | UPD document number | [types/reports.types.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L17) |
| <a id="date"></a> `date` | `string` | Arrival date (Moscow UTC+3) | [types/reports.types.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L19) |
| <a id="lastchangedate"></a> `lastChangeDate` | `string` | Last update date in service. Used for pagination (Moscow UTC+3) | [types/reports.types.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L21) |
| <a id="supplierarticle"></a> `supplierArticle` | `string` | Seller article | [types/reports.types.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L23) |
| <a id="techsize"></a> `techSize` | `string` | Item size | [types/reports.types.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L25) |
| <a id="barcode"></a> `barcode` | `string` | Barcode | [types/reports.types.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L27) |
| <a id="quantity"></a> `quantity` | `number` | Quantity | [types/reports.types.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L29) |
| <a id="totalprice"></a> `totalPrice` | `number` | Price from UPD document | [types/reports.types.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L31) |
| <a id="dateclose"></a> `dateClose` | `string` | Date accepted (closed) at WB (Moscow UTC+3) | [types/reports.types.ts:33](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L33) |
| <a id="warehousename"></a> `warehouseName` | `string` | Warehouse name | [types/reports.types.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L35) |
| <a id="nmid"></a> `nmId` | `number` | WB article (nmId) | [types/reports.types.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L37) |
| <a id="status"></a> `status` | `"Принято"` | Current shipment status. Always "Принято" (Accepted) | [types/reports.types.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L39) |

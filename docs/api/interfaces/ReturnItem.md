[Wildberries API TypeScript SDK](../modules.md) / ReturnItem

# Interface: ReturnItem

Defined in: [types/returns.types.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L42)

Unified return record across FBO and FBS sources.

Built by `sdk.returns.getReturns()` (since v3.10.0) by aggregating:
- **FBO returns** from `sdk.reports.getAnalyticsGoodsReturn()` (real-time)
- **FBS returns** from `sdk.ordersFBS.getOrders()` + status history (real-time)
- **Finance amount/srid** from `sdk.finances.getSalesReportsDetailed()` (weekly delay)

Fields are populated from different sources — see per-field JSDoc for source attribution.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `string` | WB order ID. Source: FBO/FBS endpoint. | [types/returns.types.ts:44](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L44) |
| <a id="nmid"></a> `nmId` | `number` | SKU. Source: all sources. | [types/returns.types.ts:46](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L46) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Seller article. Source: FBS preferred (when implemented in v3.10.1). **NOT populated by FBO source** — the goods-return endpoint does not expose vendorCode. Always undefined for FBO records in v3.10.0. | [types/returns.types.ts:52](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L52) |
| <a id="ordertype"></a> `orderType` | `"fbo"` \| `"fbs"` | Fulfillment type — derived from data source. | [types/returns.types.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L54) |
| <a id="returndate"></a> `returnDate` | `string` | ISO 8601 date when return was initiated. Source: completedDt (FBO) or status transition date (FBS). | [types/returns.types.ts:56](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L56) |
| <a id="returnstatus"></a> `returnStatus` | [`ReturnStatus`](../type-aliases/ReturnStatus.md) | Current return state. NOTE: WB does not expose 'in_transit' for FBO — only initiated/received/processed available. | [types/returns.types.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L58) |
| <a id="returnreason"></a> `returnReason` | `string` | Free-text Russian reason from WB. Source: reason (FBO) or status detail (FBS). | [types/returns.types.ts:60](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L60) |
| <a id="returnreasoncode"></a> `returnReasonCode` | [`ReturnReasonCode`](../type-aliases/ReturnReasonCode.md) | Standardized reason code (via classifyReturnReason). | [types/returns.types.ts:62](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L62) |
| <a id="returncategory"></a> `returnCategory` | [`ReturnCategory`](../type-aliases/ReturnCategory.md) | Return category — authoritative for FBS (via classifyFbsReturnCategory), best-effort 'unknown' or 'return_after_receipt' for FBO. | [types/returns.types.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L64) |
| <a id="quantity"></a> `quantity` | `number` | Number of units. Default 1 (each goods-return record = one unit). | [types/returns.types.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L66) |
| <a id="returnamount"></a> `returnAmount?` | `number` | Sum in rubles. Source: `getSalesReportsDetailed` via `srid` join. **undefined** when finance hasn't materialized yet — WB Sales Reports publish on a weekly cadence anchored to Mondays, so a return processed Sunday may have its amount available Monday (1 day), while a return processed Monday may not show until the following Monday (~7 days). | [types/returns.types.ts:74](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L74) |
| <a id="srid"></a> `srid?` | `string` | Sales Realization ID. Source: getSalesReportsDetailed. Used for cross-source reconciliation. | [types/returns.types.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/returns.types.ts#L76) |

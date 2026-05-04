# Returns Module

The **Returns** module (`sdk.returns`) is an aggregator introduced in **v3.10.0** that unifies three separate Wildberries data sources — FBO analytics, FBS order history, and Finance reports — into a single `ReturnItem[]`. It handles deduplication by `srid`, partial-failure tolerance via `Promise.allSettled`, per-source telemetry, and automatic reason classification.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `returns` |
| **SDK Namespace** | `sdk.returns.*` |
| **Introduced** | v3.10.0 |
| **Sources** | `sdk.reports.getAnalyticsGoodsReturn()` (FBO), `sdk.ordersFBS` status history (FBS — deferred to v3.10.1), `sdk.finances.getSalesReportsDetailed()` (Finance) |
| **Methods** | 3 |
| **Authentication** | Delegates to underlying modules |

### Purpose

`sdk.returns` is designed to:

- **Unify FBO + Finance return data** — single `ReturnItem[]` with finance enrichment (`returnAmount`, `returnAmountCurrency`)
- **Classify return reasons** — maps free-text Russian WB reasons to stable `ReturnReasonCode` enum via `classifyReturnReason()` (called internally)
- **Surface partial failures transparently** — if one source is unavailable, other sources still return data; failures reported in `partialFailures`
- **Report per-source telemetry** — `_meta.sources` tells you exactly how many records each source fetched, filtered, and whether it was skipped

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get all returns for April 2026
const result = await sdk.returns.getReturns({
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
});

console.log(`Total returns: ${result.total}`);
console.log(`FBO fetched: ${result._meta.sources.fbo.fetched}`);

result.data.forEach((r) => {
  console.log(r.orderId, r.returnReasonCode, r.returnAmount ?? 'pending');
});
```

---

## Methods

### `getReturns(params: ReturnsApiRequest): Promise<ReturnsApiResponse>`

Primary aggregation method. Fetches FBO returns and Finance enrichment in parallel, merges by `srid`, applies optional filters, and returns results with full telemetry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateFrom` | `string` | Yes | ISO date `YYYY-MM-DD`. Maximum 31-day range. |
| `dateTo` | `string` | Yes | ISO date `YYYY-MM-DD`. |
| `nmIds` | `number[]` | No | Filter by product article numbers. |
| `orderType` | `'fbo' \| 'fbs'` | No | Filter by fulfilment type. |
| `reasonCodes` | `ReturnReasonCode[]` | No | Filter by classified reason code. |

**See also:** [Full guide with 4 recipes →](/guides/returns-module)

---

### `getReturnByOrderId(orderId: string, params: ReturnByOrderIdParams): Promise<ReturnItem | null>`

Convenience wrapper around `getReturns()` that filters to a single order. Returns `null` when no matching record is found in the date window.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | WB order ID (string, BigInt-safe). |
| `params.dateFrom` | `string` | Yes | Same semantics as `getReturns()`. |
| `params.dateTo` | `string` | Yes | Same semantics as `getReturns()`. |
| `params.orderType` | `'fbo' \| 'fbs'` | No | Narrows which source to query. |

---

### `getReturnStats(params: ReturnStatsParams): Promise<ReturnStatsResult>`

Calls `getReturns()` once and post-processes all records into aggregation buckets in memory. Useful for dashboard KPIs without building your own grouping logic.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateFrom` | `string` | Yes | ISO date. |
| `dateTo` | `string` | Yes | ISO date. |
| `groupBy` | `'nmId' \| 'category' \| 'orderType'` | Yes | Aggregation dimension. |
| `nmIds` | `number[]` | No | Pre-filter passed to `getReturns()`. |
| `orderType` | `'fbo' \| 'fbs'` | No | Pre-filter passed to `getReturns()`. |

---

## Key Types

| Type | Kind | Description |
|------|------|-------------|
| [`ReturnItem`](/api/interfaces/ReturnItem) | interface | Single unified return record |
| [`ReturnStatus`](/api/type-aliases/ReturnStatus) | type alias | `'initiated' \| 'received' \| 'processed'` |
| [`ReturnCategory`](/api/type-aliases/ReturnCategory) | type alias | `'cancel_before_shipment' \| 'refusal_at_pvz' \| 'return_after_receipt' \| 'unknown'` |
| [`FbsStatusEvent`](/api/interfaces/FbsStatusEvent) | interface | FBS status history event used by `classifyFbsReturnCategory()` |
| [`ReturnsApiRequest`](/api/interfaces/ReturnsApiRequest) | interface | Input params for `getReturns()` |
| [`ReturnsApiResponse`](/api/interfaces/ReturnsApiResponse) | interface | Response from `getReturns()` |
| [`PartialFailure`](/api/interfaces/PartialFailure) | interface | Describes a source that failed during aggregation |
| [`ReturnsMeta`](/api/interfaces/ReturnsMeta) | interface | Per-source telemetry in every response |
| [`ReturnByOrderIdParams`](/api/interfaces/ReturnByOrderIdParams) | interface | Params for `getReturnByOrderId()` |
| [`ReturnStatsParams`](/api/interfaces/ReturnStatsParams) | interface | Params for `getReturnStats()` |
| [`ReturnStatsResult`](/api/interfaces/ReturnStatsResult) | interface | Aggregated stats with buckets |
| [`ReturnStatsBucket`](/api/interfaces/ReturnStatsBucket) | interface | Single aggregation bucket (one nmId / category / orderType) |

---

## Helper Function

### `classifyFbsReturnCategory(statuses: FbsStatusEvent[]): ReturnCategory`

Standalone helper (exported from root index) that analyzes a chronological FBS status event array and maps it to a stable `ReturnCategory`. Called internally by `ReturnsModule` for FBS records.

**See also:** [API reference →](/api/functions/classifyFbsReturnCategory)

---

## Known Limitations

| Limitation | Details |
|-----------|---------|
| No webhooks | Poll `getReturns()` every 5–15 min |
| No `in_transit` status | `ReturnStatus` excludes intermediate states |
| Free-text reasons | Use `returnReasonCode` (auto-classified) not `returnReason` |
| Weekly finance cadence | `returnAmount` may be `undefined` for returns within ~7 days |
| `returnCategory: 'unknown'` for FBO | FBS implementation deferred to v3.10.1 |
| 31-day max date range | Chunk manually for longer periods |
| No `vendorCode` for FBO | Always `undefined` for FBO records |

---

## Related Resources

- [Returns Module Guide](/guides/returns-module) — Mermaid diagram, 4 copy-paste recipes, method reference, telemetry contract
- [Buyout & Return Reconciliation](/guides/buyout-return-reconciliation) — Lower-level helpers from v3.9.3 (`classifyReturnReason`, `enrichReturnsWithType`, `reconcileBuyoutsAndReturns`)
- [API Reference: ReturnsModule](/api/classes/ReturnsModule)
- [API Reference: classifyFbsReturnCategory](/api/functions/classifyFbsReturnCategory)

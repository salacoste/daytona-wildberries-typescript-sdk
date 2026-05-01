---
title: Buyout & Return Reconciliation
description: Unified analytics for FBO/FBS returns and buyout reconciliation using SDK helpers (since v3.9.3)
---

# Buyout & Return Reconciliation

This guide covers three pure helpers added in **v3.9.3** for reconciling Wildberries returns and buyouts in analytics pipelines.

## The Problem

Wildberries doesn't expose a single endpoint with all the data you need for return analytics:
- `getAnalyticsGoodsReturn()` returns FBO returns with reasons but no `orderType` field
- FBS returns are derived from `ordersFBS` status history
- Buyouts come from `getStocksReportProducts()` (separate API)
- Finance reconciliation lives in `getSalesReportsDetailed()` lines

The SDK now provides three pure helpers to unify these sources client-side.

## 1. Classify Return Reasons

WB returns reasons as free-text Russian strings. Use `classifyReturnReason()` to map them to a stable enum:

```typescript
import { classifyReturnReason } from 'daytona-wildberries-typescript-sdk';

classifyReturnReason('Брак товара');           // → 'defect'
classifyReturnReason('Не подошёл размер');     // → 'wrong_size'
classifyReturnReason('Повреждение упаковки');  // → 'damage'
classifyReturnReason('Неизвестная причина');   // → 'other'
```

The `ReturnReasonCode` union covers 8 categories: `damage`, `defect`, `wrong_size`, `wrong_item`, `customer_refused`, `expired`, `not_as_described`, `other`.

## 2. Enrich Returns with orderType

```typescript
import { enrichReturnsWithType } from 'daytona-wildberries-typescript-sdk';
import type { WbReturn } from 'daytona-wildberries-typescript-sdk';

// Fetch FBO returns
const fbo = await sdk.reports.getAnalyticsGoodsReturn({
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
});

// Optional: shape FBS returns from your order status history
const fbsReturns = myFbsOrders
  .filter(o => o.status === 'returned')
  .map(o => ({
    nmId: o.nmId,
    orderId: o.id,
    lastChangeDate: o.lastChangeDate,
    reason: o.cancelReason,
    warehouseName: o.warehouseName,
  }));

const unified: WbReturn[] = enrichReturnsWithType(fbo.report ?? [], fbsReturns);

console.log(`Total: ${unified.length}`);
console.log(`FBO: ${unified.filter(r => r.orderType === 'fbo').length}`);
console.log(`FBS: ${unified.filter(r => r.orderType === 'fbs').length}`);
```

Each `WbReturn` includes: `nmId`, `orderId`, `returnDate`, `reason`, `reasonCode`, `warehouseName`, `orderType`, `quantity`. Records with missing required fields are silently skipped. Output is sorted by `returnDate` descending.

## 3. Reconcile Buyouts and Returns

```typescript
import { reconcileBuyoutsAndReturns } from 'daytona-wildberries-typescript-sdk';
import type { BuyoutInput, ReconciliationResult } from 'daytona-wildberries-typescript-sdk';

// Shape buyout data from your stocks report
const buyouts: BuyoutInput[] = stocksReport.map(p => ({
  nmId: p.nmId,
  buyoutCount: p.buyoutCount,
  buyoutRevenue: p.buyoutRevenue,
}));

const summary: ReconciliationResult[] = reconcileBuyoutsAndReturns(buyouts, unified);

for (const r of summary) {
  console.log(`nmId=${r.nmId}: buyouts=${r.buyoutCount}, returns=${r.returnCount} (FBO ${r.fboReturnCount} / FBS ${r.fbsReturnCount})`);
  if (r.anomalies.length > 0) {
    console.warn('  Anomalies:', r.anomalies.map(a => a.details).join('; '));
  }
}
```

### Anomaly Types

The reconciler detects three classes of issues:

| Type | When fired | Action |
|------|------------|--------|
| `return_without_buyout` | More returns than buyouts (or returns with zero buyouts) | Investigate — possibly missing buyout data or fraud |
| `orphan_buyout` | Buyouts with zero returns (only when `strictTemporalAlignment: true`) | Informational |
| `return_quantity_mismatch` | Reserved for future use | — |

## End-to-End Example

```typescript
import {
  classifyReturnReason,
  enrichReturnsWithType,
  reconcileBuyoutsAndReturns,
} from 'daytona-wildberries-typescript-sdk';

async function buildReturnsDashboard(sdk: WildberriesSDK, dateFrom: string, dateTo: string) {
  // 1. Fetch all sources in parallel
  const [fbo, stocks /* , fbsOrders */] = await Promise.all([
    sdk.reports.getAnalyticsGoodsReturn({ dateFrom, dateTo }),
    sdk.analytics.getStocksReportProducts({ /* ... */ }),
    // sdk.ordersFBS.getOrders({ dateFrom: epochSeconds(dateFrom) }),
  ]);

  // 2. Unify returns
  const returns = enrichReturnsWithType(fbo.report ?? [], /* shaped FBS returns */ []);

  // 3. Build per-nmId summary
  const summary = reconcileBuyoutsAndReturns(
    stocks.products.map(p => ({ nmId: p.nmId, buyoutCount: p.buyoutCount })),
    returns,
  );

  // 4. Surface anomalies
  const flagged = summary.filter(r => r.anomalies.length > 0);
  return { summary, flagged };
}
```

## Why Pure Helpers?

These helpers don't make any network calls. They take data you've already fetched and reshape/classify it. This means:

- Easy to unit-test
- No additional rate limit budget
- Composable into your own analytics pipeline
- Use offline (e.g., reprocess historical data)

## Related

- [Mandatory Product Characteristics](/guides/mandatory-product-characteristics) — v3.9.0/3.9.2 type updates
- [WB API: Goods Return Report](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Otchyot-o-vozvratah-i-peremeshchenii-tovarov)

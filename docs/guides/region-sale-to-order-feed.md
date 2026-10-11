---
title: Migrate Regional Sales to Order Feed
description: Replace the deprecated regional-sales report with source-faithful Order Feed grouping before 2026-11-03.
layout: doc
---

# Migrate Regional Sales to Order Feed

Wildberries disables `GET /api/v1/analytics/region-sale` on **2026-11-03**. In SDK 4.x, `sdk.reports.getAnalyticsRegionSale()` remains callable for compatibility and emits one deprecation warning per process. New regional workflows should read `sdk.analytics.getOrderFeed()`.

Order Feed is an event-level source, while the legacy endpoint returns regional aggregates. It can support order counts by delivery geography, but it is not a drop-in source for the legacy `saleInvoiceCostPrice`, `saleInvoiceCostPricePerc`, or `saleItemInvoiceQty` semantics.

## Contract boundaries

- Select at most 31 days by the date of the order's **current status**.
- The first page omits `snapshotTime`; every later page must reuse the first response's `data.snapshotTime`.
- Advance `offset` while keeping the period, filters, limit, and snapshot unchanged.
- `destinationCity` and `destinationDistrict` describe delivery geography.
- One Order Feed row is one order, one assembly order, and one item. Count each included row as one item; there is no separate quantity field.
- Use `status` explicitly. For a simple purchased-item view, include only `buyout`. Track `return` and `returnDefective` separately instead of subtracting them without a business rule.
- `sellerPrice` excludes WB Club and B2B wholesale discounts. It does not prove equivalence to the legacy invoice-cost or regional-share fields.

## Stable-snapshot pagination and grouping

```typescript
import type { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

type RegionCount = {
  destinationDistrict: string;
  destinationCity: string;
  purchasedItems: number;
};

async function getPurchasedItemsByRegion(
  sdk: WildberriesSDK,
  start: string,
  end: string
): Promise<RegionCount[]> {
  const limit = 10_000;
  const grouped = new Map<string, RegionCount>();
  let offset = 0;
  let snapshotTime: string | undefined;

  while (true) {
    const page = await sdk.analytics.getOrderFeed({
      selectedPeriod: { start, end },
      pagination: { offset, limit, snapshotTime },
    });

    snapshotTime ??= page.data.snapshotTime;

    for (const order of page.data.orders) {
      if (order.status !== 'buyout') continue;

      const key = `${order.destinationDistrict}\u0000${order.destinationCity}`;
      const current = grouped.get(key) ?? {
        destinationDistrict: order.destinationDistrict,
        destinationCity: order.destinationCity,
        purchasedItems: 0,
      };
      current.purchasedItems += 1;
      grouped.set(key, current);
    }

    if (page.data.orders.length < limit) break;
    const nextOffset = offset + page.data.orders.length;
    if (nextOffset <= offset) {
      throw new Error('Order Feed pagination did not advance');
    }
    offset = nextOffset;
  }

  return [...grouped.values()];
}
```

The example folds every page into the aggregate immediately, so memory grows with the number of regions rather than the number of orders. It also stops with an error if a full-page response cannot advance the offset. Start a new snapshot when the period or any filter changes. If a page fails, retry that same offset with the same `snapshotTime`; starting a new snapshot mid-run can introduce duplicates or gaps as statuses change.

## What requires a separate business definition

The example intentionally produces purchased-item counts only. Before replacing a production regional report, define how your application treats cancellations, returns, defective returns, B2B rows, and orders whose current status moved outside the selected period. Keep any revenue calculation separate and label it with the exact source field used. The published contract does not establish a formula that recreates the legacy regional money and share metrics.

## Related resources

- [Analytics module: Order Feed](/modules/analytics#getorderfeed---order-feed-new-wb-news-2026-09)
- [Reports module](/modules/reports)
- [Official Order Feed knowledge-base article](https://dev.wildberries.ru/knowledge-base/articles/01a09d9e-4f79-7016-b641-0718252e6572/lenta-zakazov#prodazhi-po-regionam)

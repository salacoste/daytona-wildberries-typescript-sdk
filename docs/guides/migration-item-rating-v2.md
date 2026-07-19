# Item Rating v1 → v2 migration

Wildberries will disable both of these endpoints on **2026-07-30**:

- `POST /api/analytics/v1/item-rating`
- `GET /api/v1/analytics/banned-products/shadowed`

Use `sdk.analytics.getItemRatingV2()` (`POST /api/analytics/v2/item-rating`) for both
item-rating analytics and catalog-hidden product reporting.

## Item-rating migration

```typescript
// Before: v1 (deprecated)
const v1 = await sdk.analytics.getItemRating({
  currentPeriod: { start: '2026-07-01', end: '2026-07-18' },
  isNotIncludeNMsWithoutSales: true,
  orderBy: { field: 'feedbackCount', mode: 'desc' },
  offset: 0,
});
console.log(v1.data.cards);

// After: v2
const v2 = await sdk.analytics.getItemRatingV2({
  currentPeriod: { start: '2026-07-01', end: '2026-07-18' },
  isNotIncludeNmsWithoutSales: true,
  orderBy: { field: 'feedbackCount', mode: 'desc' },
  offset: 0,
});
console.log(v2.data.items);
```

The incompatible contract changes are explicit rather than silently normalized by the SDK:

| v1 | v2 |
|---|---|
| `isNotIncludeNMsWithoutSales` | `isNotIncludeNmsWithoutSales` |
| `data.cards` | `data.items` |
| no catalog visibility field | `data.items[].isShadowed` |

## Hidden-from-catalog migration

```typescript
// Before: dedicated report endpoint (deprecated)
const oldReport = await sdk.reports.getBannedProductsShadowed({
  sort: 'nmId',
  order: 'desc',
});

// After: item-rating v2 with a visibility filter
const hiddenProducts = await sdk.analytics.getItemRatingV2({
  currentPeriod: { start: '2026-07-01', end: '2026-07-18' },
  onlyShadowedNms: true,
  orderBy: { field: 'feedbackCount', mode: 'desc' },
  offset: 0,
});

for (const item of hiddenProducts.data.items) {
  console.log(item.nmId, item.isShadowed);
}
```

The v2 endpoint keeps the same rate limit as item-rating v1: **3 requests per minute**, a
**20-second interval**, and a burst of **3 requests**.

## References

- [Wildberries Item Rating v2](https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV2ItemRating)
- [Deprecated Item Rating v1](https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV1ItemRating)
- [Deprecated hidden-from-catalog report](https://dev.wildberries.ru/docs/openapi/reports#tag/Zablokirovannye-kartochki/paths/~1api~1v1~1analytics~1banned-products~1shadowed/get)

[Wildberries API TypeScript SDK](../modules.md) / computeROAS

# Function: computeROAS()

```ts
function computeROAS(stats: 
  | FullStatsItem
  | DaysV3Item[], options?: ComputeROASOptions): ROASResult;
```

Defined in: [utils/roas.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L80)

Compute ROAS (Return on Ad Spend) from WB fullstats per-day data.

**Semantics** (confirmed empirically against a live cabinet, task-136 AC#1):
- `sum` = ad spend (Затраты, RUB) — proportional to `clicks × cpc`, same-day.
- `sum_price` = order revenue (Сумма заказов, RUB) — attributed to the click day.

**ROAS = Σ(sum_price) / Σ(sum)** over a rolling window.

**Why exclude the freshest day**: WB's `sum_price` finalization lags ~1-2 days, so the
most recent day undercounts revenue → same-day ROAS is a known footgun (Q6). The default
`excludeLastDays: 1` drops it. (0-rev-on-clicked-days is mostly genuine zero-conversion,
not lag — but the freshest day is where the undercount concentrates.)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stats` | \| [`FullStatsItem`](../-internal-/interfaces/FullStatsItem.md) \| [`DaysV3Item`](../-internal-/interfaces/DaysV3Item.md)[] | Either a [FullStatsItem](../-internal-/interfaces/FullStatsItem.md) (uses its `.days`) or a `DaysV3Item[]` directly (e.g. `FullStatsItem.days`). |
| `options?` | [`ComputeROASOptions`](../interfaces/ComputeROASOptions.md) | [ComputeROASOptions](../interfaces/ComputeROASOptions.md). |

## Returns

[`ROASResult`](../interfaces/ROASResult.md)

[ROASResult](../interfaces/ROASResult.md). `roas` is `null` when `spend === 0` (no ad spend) or when the
  window is empty.

## See

[PromotionModule.getAdvFullstats](../classes/PromotionModule.md#getadvfullstats) for the source data.

## Example

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '36508180',
  beginDate: '2026-06-28',
  endDate: '2026-07-11',
});
const { roas, revenue, spend } = computeROAS(stats); // default: exclude freshest 1 day
if (roas !== null) {
  console.log(`ROAS ${roas.toFixed(2)}x (spent ${spend} RUB, earned ${revenue} RUB)`);
}
```

[Wildberries API TypeScript SDK](../modules.md) / classifyFbsReturnCategory

# Function: classifyFbsReturnCategory()

```ts
function classifyFbsReturnCategory(statuses: FbsStatusEvent[]): ReturnCategory;
```

Defined in: [utils/classifyFbsReturnCategory.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/utils/classifyFbsReturnCategory.ts#L49)

Classifies an FBS order's return category by analyzing its status history.

**Heuristic** — based on observed WB status transition patterns. May misclassify
unusual sequences. Verify accuracy on your production data before relying on
results. Returns 'unknown' for sequences that don't match any known pattern.

Mapping rules (in priority order):
1. **`cancel_before_shipment`** — sequence ends with `cancelled`/`canceled` AND
   no `confirmed`/`assembled` status appears earlier (cancelled before warehouse picked up)
2. **`refusal_at_pvz`** — `delivered` status followed by `defected` or `canceled_by_client`
   (buyer arrived at pickup point and refused the package)
3. **`return_after_receipt`** — `delivered` status followed later by `returned`
   (buyer accepted the package, then initiated a return)
4. **`unknown`** — empty array, no return-indicating status, or ambiguous sequence

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `statuses` | [`FbsStatusEvent`](../interfaces/FbsStatusEvent.md)[] | Chronologically ordered FBS status events. If unordered, function sorts by date. |

## Returns

[`ReturnCategory`](../type-aliases/ReturnCategory.md)

Categorized return type

## Example

```typescript
const category = classifyFbsReturnCategory([
  { status: 'new', date: '2026-04-01T10:00:00Z' },
  { status: 'confirmed', date: '2026-04-01T11:00:00Z' },
  { status: 'assembled', date: '2026-04-02T09:00:00Z' },
  { status: 'delivered', date: '2026-04-05T14:00:00Z' },
  { status: 'returned', date: '2026-04-09T11:00:00Z' },
]);
// → 'return_after_receipt'
```

## Since

v3.10.0

[Wildberries API TypeScript SDK](../modules.md) / parseMoneyAmount

# Function: parseMoneyAmount()

```ts
function parseMoneyAmount(value?: string | null): number;
```

Defined in: [utils/parseMoneyAmount.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/utils/parseMoneyAmount.ts#L31)

Parse a money amount string from v1 finance reports to a JavaScript number.

WB v1 finance report endpoints return money amounts as **strings** (e.g., `"367.99"`) to avoid
JS float precision loss on very large amounts. Use this helper when you need JS number math
(e.g., for sums, averages, comparisons) and don't need exact precision beyond ~15 significant digits.

**Precision warning**: For amounts with more than 15 significant digits (extremely rare in WB
reports, but possible in aggregated sums), use a dedicated decimal library (decimal.js, big.js)
instead. For all typical seller amounts (< 10^12 kopecks), parseFloat is safe.

**Behavior**:
- Valid numeric string → parsed number (e.g., `"367.99"` → `367.99`)
- `null` / `undefined` / empty string → `0`
- Non-numeric string → `0` (NaN from parseFloat is converted to 0)
- Scientific notation → parsed (e.g., `"1e10"` → `10000000000`)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value?` | `string` \| `null` | Money string from a v1 finance report field, or null/undefined |

## Returns

`number`

Parsed number, or 0 if input is null/undefined/empty/invalid

## Example

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getSalesReportsDetailed({ dateFrom, dateTo });
const total = rows.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);
```

## Since

v3.7.0

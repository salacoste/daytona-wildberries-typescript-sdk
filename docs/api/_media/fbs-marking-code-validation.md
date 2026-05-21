# FBS Marking Code Validation Migration (2026-06-03)

> **Deadline: 2026-06-03** — Wildberries starts validating Честный Знак marking codes server-side for B2C FBS orders.

## What Changed

Starting **2026-06-03**, the endpoint `PATCH /api/v3/supplies/{supplyId}/deliver` (wrapped by `sdk.ordersFBS.updateSuppliesDeliver()`) validates marking codes for B2C orders on FBS supplies. Invalid codes cause HTTP 409 responses with a new `metaDetails[]` field describing which assembly tasks failed validation.

| Before 2026-06-03 | From 2026-06-03 |
|-------------------|----------------|
| 409 body: `{ code, message }` | 409 body: `{ code, message, metaDetails: MetaDetail[] }` (additive) |
| B2C marking codes not validated | B2C marking codes validated server-side |
| Crypto-tail not enforced | Marking code must include GS separators + crypto-tail in full |

Products configured as **optional** for marking continue to accept omitted codes.

## Marking Code Format

A Честный Знак marking code must be passed **in full**:

1. **All standard fields** (GTIN, serial number, etc.)
2. **GS separators** — ASCII `0x1D` (group separator) between fields
3. **Crypto-tail** — the cryptographic authenticity check (код проверки подлинности)

Example shape (illustrative — your actual codes depend on product category):

```
0104650075191024215RJZx80hl"Aq3<GS>91FFD0<GS>92sGGtBnYBxYJ2bpEx55+DjlbOAUSHWVQQO9IxBPo3uA=
```

Where `<GS>` represents the literal `0x1D` byte.

> ⚠️ Do **not** truncate the crypto-tail. WB validates the full string. Stripping it = 409.

## SDK Surface (v3.15.0+)

Three patterns are supported. Pick whichever fits your error-handling style.

### Pattern A — Pre-flight check (recommended)

Validate metadata *before* calling `updateSuppliesDeliver()` to avoid the 10× rate-limit penalty on 409 responses:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [12345] }); // example order ID
const invalid = meta.orders?.[0]?.metaDetails?.filter(
  d => d.decision === 'required' || d.decision === 'invalid'
);

if (invalid?.length) {
  console.log('Fix metadata before deliver:', invalid.map(d => d.key));
  // Surface to UI / pause delivery / etc.
} else {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
}
```

### Pattern B — Typed catch via `MetaValidationFailError`

If you call `updateSuppliesDeliver()` directly and want to handle 409s downstream:

```typescript
import {
  WildberriesSDK,
  MetaValidationFailError,
} from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
} catch (err) {
  if (err instanceof MetaValidationFailError) {
    for (const d of err.metaDetails) {
      console.log(`Task field ${d.key}: ${d.decision} (value="${d.value}")`);
    }
    // Persist diagnostic, retry after fixing codes, etc.
  }
  throw err;
}
```

### Pattern C — Shared error boundary via `parseMetaValidationFail()`

For codebases that catch errors in a generic boundary and can't or won't import the error class:

```typescript
import { parseMetaValidationFail } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
} catch (err) {
  const fail = parseMetaValidationFail(err);
  if (fail) {
    metrics.recordValidationFailure(fail.code, fail.metaDetails.length);
    logger.warn('Meta validation failed', fail);
  }
  throw err;
}
```

The helper returns `null` for any error that is *not* a meta-validation 409 — including plain 409s without `metaDetails`, network errors, and non-Error values.

## `MetaDetail` Decision Matrix

Known values as of 2026-05-21. WB may add new decisions; defensive code should handle unknown values explicitly.

The `decision` field on each `MetaDetail` entry tells you the field's validation status:

| `decision` | Meaning | Action |
|------------|---------|--------|
| `filled` | Value is set and valid | None |
| `optional` | Field not required for this product | None |
| `required` | Must be filled before delivery | Set the value before retrying |
| `invalid` | Value present but failed validation | Fix the value (e.g., add crypto-tail) and retry |

## Rate Limit Penalty

`PATCH /api/v3/supplies/{supplyId}/deliver` has the standard FBS rate limit:

```
1 minute → 300 requests, 200 ms interval, 20 burst
```

**Important**: every 409 response counts as **10 requests** against this budget. A retry loop hitting 409s repeatedly will exhaust your rate limit ~30× faster than successful calls.

This is why Pattern A (pre-flight) is the recommended approach for high-volume sellers — `getOrdersMetaBulk()` returns the same diagnostic data without the penalty.

## Migration Checklist

- [ ] Audit every call site of `sdk.ordersFBS.updateSuppliesDeliver()` in your codebase
- [ ] Confirm marking codes you send to WB include full GS separators + crypto-tail
- [ ] Add pre-flight `getOrdersMetaBulk()` checks for high-volume flows (Pattern A)
- [ ] Update error handling to recognize `MetaValidationFailError` (Pattern B) or use `parseMetaValidationFail()` (Pattern C)
- [ ] If you log raw errors, ensure `metaDetails` is captured in your log payloads
- [ ] Run integration tests against WB sandbox before 2026-06-03 to verify your codes pass validation

## FAQ

**Q: I'm only doing B2B FBS — do I need to migrate?**
A: B2B marking codes have been validated since 2026-04-09. The 2026-06-03 change extends the same enforcement to B2C. If your B2B handling already works, B2C will too — but you should still update error handling for cleaner diagnostics.

**Q: What about products without mandatory marking?**
A: Unchanged. WB only validates codes for products that require them. Optional-marking products continue to accept omitted codes without 409.

**Q: Can I bypass the crypto-tail requirement?**
A: No. Sending a truncated marking code = 409. WB validates the full string including the crypto-tail.

**Q: My 409 doesn't have `metaDetails` — what gives?**
A: Pre-existing 409 codes (`SupplyHasZeroOrders`, `UinIsNotFilled`, etc.) don't include `metaDetails`. The SDK throws a plain `WBAPIError` for those — `parseMetaValidationFail()` returns `null`, and `err instanceof MetaValidationFailError` is `false`. Inspect `err.response` to read the body, or check `err.statusCode === 409` for the umbrella catch.

**Q: What is the `code` field on `MetaValidationFailError`?**
A: It mirrors the `code` string from the WB 409 response body (e.g. `'MetaValidationFail'`). If WB omits the field, the SDK defaults to `'Unknown'` — check `err.code !== 'Unknown'` before relying on the value.

**Q: Does `MetaValidationFailError` still satisfy `instanceof WBAPIError`?**
A: Yes. It extends `WBAPIError`. All your existing `catch (err) { if (err instanceof WBAPIError) { ... } }` patterns continue to work.

## Related

- [Честный Знак portal](https://честныйзнак.рф/) — official Russian marking registry
- [WB seller docs: verify product identifiers](https://seller.wildberries.ru/instructions/ru/ru/material/verify-product-identifiers)
- [WB seller docs: common KIZ errors](https://seller.wildberries.ru/instructions/ru/ru/material/kiz-common-errors)
- [CHANGELOG v3.15.0](../../CHANGELOG.md)

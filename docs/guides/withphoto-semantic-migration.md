---
title: "withPhoto Filter Migration — v3.14.0"
description: Migrate from legacy withPhoto:0 to the new withPhoto:2 semantic before the 2026-06-16 WB deadline to avoid a silent data correctness break.
---

# `withPhoto` Filter Migration

**Audience**: Developers calling `sdk.products.getCardsList()` with `withPhoto: 0` or relying on the default (missing) filter.
**Since**: SDK v3.14.0
**Hard deadline**: 2026-06-16

---

## Why This Matters

On 2026-05-15 Wildberries announced a **silent semantic change** to the `withPhoto` filter on the `POST /content/v2/get/cards/list` endpoint. The change takes effect **2026-06-16**.

This is the most dangerous type of API change: same field, same type, same numeric value `0`, **different result set**. WB will still return HTTP 200 with valid-looking card data — no error, no indication that the filter changed meaning.

**Business impact**: Code that currently uses `withPhoto: 0` to find "cards without photo" and fix them will silently include cards **with** photo in the affected set after 2026-06-16. Data operations (photo uploads, quality audits, bulk edits) will affect the wrong cards.

---

## What's Changing

| Value | Current (until 2026-06-16) | New (from 2026-06-16) | Change |
|-------|---------------------------|----------------------|--------|
| `-1` | All cards | All cards | No change |
| `0` or missing | Only cards **without** photo | All cards (with and without photo) | **Silent semantic break** |
| `1` | Only cards **with** photo | Only cards **with** photo | No change |
| `2` | Does not exist | Only cards **without** photo | New value |

The SDK `WITH_PHOTO_FILTER` helper const (introduced in v3.14.0) uses the **post-migration** semantics: `WITH_PHOTO_FILTER.NO_PHOTO` is `2`.

---

## Migration Matrix

| Your current code | Your intent | Action required |
|------------------|-------------|-----------------|
| `getCardsList({})` | "All cards" | No code change needed — behavior improves after deadline (was accidentally "no photo only") |
| `getCardsList({})` | "No-photo cards only" | Must add `filter: { withPhoto: 2 }` before 2026-06-16 |
| `getCardsList({ settings: { filter: { withPhoto: 0 } } })` | "No-photo cards only" | Must change to `withPhoto: 2` before 2026-06-16 |
| `getCardsList({ settings: { filter: { withPhoto: 1 } } })` | "With-photo cards only" | No change needed |
| `getCardsList({ settings: { filter: { withPhoto: -1 } } })` | "All cards" | No change needed |

---

## Code Examples

### Scenario 1 — Fixing cards without photo (most common migration case)

```typescript
// BEFORE (works today, breaks silently after 2026-06-16):
const result = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: 0 },
  },
});
// After deadline: result.cards contains ALL cards, not just no-photo ones

// AFTER (correct, works both before and after 2026-06-16):
import { WITH_PHOTO_FILTER } from 'daytona-wildberries-typescript-sdk';

const result = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: WITH_PHOTO_FILTER.NO_PHOTO }, // = 2
  },
});
// result.cards contains only cards without photo
```

### Scenario 2 — Fetching all cards (no explicit filter)

```typescript
// BEFORE (currently returns no-photo only — likely unintentional):
const result = await sdk.products.getCardsList({
  settings: { cursor: { limit: 100 } },
});

// AFTER (same code, behavior improves after 2026-06-16 to return all cards):
// No change needed if your intent was "all cards".
// For clarity, you may want to add explicit filter:
import { WITH_PHOTO_FILTER } from 'daytona-wildberries-typescript-sdk';

const result = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: WITH_PHOTO_FILTER.ALL }, // = -1, explicit
  },
});
```

### Scenario 3 — Explicit "all cards" (already correct)

```typescript
// BEFORE and AFTER — no change needed:
const result = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 },
  },
});
```

---

## `WITH_PHOTO_FILTER` Helper Const

SDK v3.14.0 ships a named-constant helper so your code is self-documenting and schema-safe:

```typescript
import { WITH_PHOTO_FILTER } from 'daytona-wildberries-typescript-sdk';

// Available values:
WITH_PHOTO_FILTER.ALL        // -1 — all cards (unchanged before/after deadline)
WITH_PHOTO_FILTER.WITH_PHOTO //  1 — only with photo (unchanged)
WITH_PHOTO_FILTER.NO_PHOTO   //  2 — only without photo (NEW post-migration value)
```

Using `WITH_PHOTO_FILTER.NO_PHOTO` instead of the bare number `2` means:
- The intent is clear in code review and diffs.
- If WB ever changes the value again, updating the const is a single-line change.
- IDEs show the JSDoc with the deadline context on hover.

---

## FAQ

**Q: Does the SDK auto-convert `withPhoto: 0` to `2`?**
A: No. Auto-conversion would change consumer intent without consent. The SDK emits a one-time `console.warn` on the first call that passes `withPhoto: 0`, then passes the value through unchanged. You must update your code explicitly.

**Q: What does the `console.warn` message look like?**
A: The first call in a process with `withPhoto: 0` logs:
```
products.getCardsList: `withPhoto: 0` will change semantics on 2026-06-16. Today it means
"only cards without photo"; after the deadline it will mean "ALL cards" (any photo state).
If you want "no photo only", migrate to `WITH_PHOTO_FILTER.NO_PHOTO` (= 2). If you want
"all cards", use `WITH_PHOTO_FILTER.ALL` (= -1) for clarity.
See docs/guides/withphoto-semantic-migration.md.
```
The warning fires once per process lifetime (subsequent calls with `withPhoto: 0` are silent).

**Q: What if I omit the filter entirely — do I get a warning?**
A: No. Missing parameter is the most common call pattern ("give me all my cards"). Warning on every call without a filter would add noise for the majority of consumers who have no migration work to do. The CHANGELOG and this guide cover that case explicitly.

**Q: Can I pass `withPhoto: 2` today, before WB deploys the change?**
A: This depends on whether WB has already deployed `withPhoto: 2` support to their API. The SDK v3.14.0 release notes include a sandbox verification note. If WB's sandbox returns an error for `withPhoto: 2`, hold your deployment until WB confirms the new value is live.

**Q: Is `withPhoto?: number` being narrowed to a literal union?**
A: No. The type stays `withPhoto?: number` to avoid breaking consumers who pass values from config files, environment variables, or untyped JavaScript. `WITH_PHOTO_FILTER` provides opt-in type safety without enforcing it on everyone.

---

## Related Resources

- [CHANGELOG — v3.14.0](../../CHANGELOG.md#3140---2026-05-15)
- [WB API: Work with Products](https://dev.wildberries.ru/openapi/work-with-products)
- [stocks sku→chrtId migration](./stocks-sku-to-chrtid-migration.md) — a similar deadline-driven migration for reference

---
title: "Chat replySign Format Migration — v3.13.0"
description: Migrate to the new replySign format before the 2026-06-04 WB deadline, and fix the previously broken createSellerMessage() method.
---

# Chat `replySign` Format Migration

**Audience**: Developers using `sdk.communications.createSellerMessage()` or caching `replySign` values from `getSellerChats()` / `getSellerEvents()`.
**Since**: SDK v3.13.0
**Hard deadline**: 2026-06-04

---

## Why This Matters

On 2026-05-14 Wildberries announced two related breaking changes:

1. **`replySign` format update** — The `replySign` field returned by `GET /api/v1/seller/chats` and `GET /api/v1/seller/events` (when `isNewChat: true`) now uses a new structured format. After **2026-06-04**, `POST /api/v1/seller/message` will reject requests with old-format `replySign` values with HTTP 400.

2. **Critical SDK bug fix** — `sdk.communications.createSellerMessage()` previously accepted **zero parameters** and always sent an empty body (broken since introduction). SDK v3.13.0 fixes this by requiring a `data: SellerMessageRequest` parameter.

If you have code that calls `createSellerMessage()` today, it has never worked. v3.13.0 is the first version where sending a chat message is actually possible.

---

## What's New in v3.13.0

### Fixed: `createSellerMessage()` signature

```typescript
// BEFORE v3.13.0 (broken — sent empty body, always failed at WB):
async createSellerMessage(): Promise<MessageResponse>

// AFTER v3.13.0 (correct — multipart/form-data with required replySign):
async createSellerMessage(data: SellerMessageRequest): Promise<MessageResponse>
```

### Added: `SellerMessageRequest` type

```typescript
import type { SellerMessageRequest } from 'daytona-wildberries-typescript-sdk';

interface SellerMessageRequest {
  replySign: string;          // required — from getSellerChats()
  message?: string;           // optional — max 1000 chars
  file?: (Blob | { filename: string; content: Buffer })[];  // optional — max 30 MB total
}
```

---

## replySign Format Change

### Old format (rejected after 2026-06-04)

Old-format values were shorter, lacked a versioned prefix, and did not follow a structured pattern. Example: `abc123xyz` or any value not matching `<version>:<UUID>:<hex>`.

### New format (required)

```
1:1e265a58-a120-b178-008c-60af2460207c:66f136e919a8207e136757754f253189bfb9ae1ad9da9170c9d5c478626663908888c370216525bef51c0ca8d77952e05c9c17f9b63ab00374c5555b42efc07d
```

**Pattern**: `<version>:<UUID>:<crypto-signature>`
- `version` — numeric version prefix (currently `1`)
- `UUID` — chat identifier in standard UUID format (`8-4-4-4-12` hex groups)
- `crypto-signature` — hex string (~64+ chars)
- Total length: ~135 characters

**Regular expression** (for validation/detection):

```typescript
const NEW_FORMAT_REGEX = /^\d+:[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}:[0-9a-f]+$/i;
```

---

## Migration Steps

### Step 1: Update call sites to pass `data`

Any TypeScript code calling `createSellerMessage()` without arguments will fail to compile after upgrading to v3.13.0. Update all call sites:

```typescript
// BEFORE (compile error in v3.13.0):
await sdk.communications.createSellerMessage();

// AFTER:
const chats = await sdk.communications.getSellerChats();
const chat = chats.result?.[0];
if (!chat?.replySign) throw new Error('No chat available');

await sdk.communications.createSellerMessage({
  replySign: chat.replySign,
  message: 'Your order has shipped!',
});
```

### Step 2: Stop caching `replySign` across sessions

If your application stores `replySign` values in a database or cache (e.g., from before 2026-06-04), those values will be in the old format and **will be rejected by WB after the deadline**.

**Required action**: Always fetch a fresh `replySign` via `getSellerChats()` immediately before calling `createSellerMessage()`. Do not cache `replySign` between sends.

### Step 3: Handle file attachments (optional)

```typescript
import { readFileSync } from 'fs';

const fileContent = readFileSync('./invoice.pdf');

await sdk.communications.createSellerMessage({
  replySign: chat.replySign,
  message: 'Please find your invoice attached.',
  file: [{ filename: 'invoice.pdf', content: fileContent }],
});
```

Constraints:
- Each file: ≤ 5 MB
- Total files: ≤ 30 MB
- Formats: JPEG, PDF, PNG (validated server-side by WB)

---

## Full Send-Message Workflow

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function replyToAllChats(messageText: string): Promise<void> {
  // 1. Fetch all chats — replySign values are always current
  const chatsResponse = await sdk.communications.getSellerChats();
  const chats = chatsResponse.result ?? [];

  if (chats.length === 0) {
    console.log('No active chats');
    return;
  }

  // 2. Send a message to each chat
  for (const chat of chats) {
    if (!chat.replySign || !chat.chatID) continue;

    try {
      await sdk.communications.createSellerMessage({
        replySign: chat.replySign,
        message: messageText,
      });
      console.log(`Sent to chat ${chat.chatID}`);
    } catch (error) {
      console.error(`Failed for chat ${chat.chatID}:`, error);
    }
  }
}

// Usage
await replyToAllChats('Thank you for your message! We will respond shortly.');
```

---

## Heuristic Detection and warn-once Behavior

SDK v3.13.0 includes a best-effort heuristic that detects probable old-format `replySign` values at runtime:

- If the passed `replySign` does **not** match the new-format regex, the SDK calls `console.warn` once per process lifetime.
- The request is still forwarded to WB — the heuristic is informational only.
- After 2026-06-04, WB will reject old-format values with HTTP 400 regardless.

**Warning message example**:
```
communications.createSellerMessage: `replySign` does not match the expected new-format pattern
(version:UUID:signature). WB API rejects old-format `replySign` after 2026-06-04.
Refresh via `getSellerChats()` to get current-format values.
See docs/guides/chat-replysign-format-migration.md.
```

To suppress the warning in tests, call `resetDeprecationWarnings()` in `beforeEach`:

```typescript
import { resetDeprecationWarnings } from 'daytona-wildberries-typescript-sdk';

beforeEach(() => {
  resetDeprecationWarnings();
});
```

---

## FAQ

**Q: What if I have `replySign` values cached in my database?**

A: Discard them. Fetch fresh values via `getSellerChats()` before each `createSellerMessage()` call. WB does not provide a bulk migration endpoint — you must re-fetch per chat.

**Q: Will the SDK automatically retry with a fresh `replySign` if WB rejects the old one?**

A: No. Auto-refresh-and-retry would require an internal call to `getSellerChats()`, which could cause unintended side effects. The SDK surfaces the error clearly (HTTP 400 from WB → `ValidationError`) so you can handle retry logic yourself.

**Q: Can I use old-format `replySign` until 2026-06-04?**

A: Yes — WB continues to accept old-format values until the deadline. The SDK heuristic warn-once is informational only and does not block the request. However, WB may roll out the change gradually, so refreshing early is recommended.

**Q: What about `getSellerEvents()` — does it also return `replySign`?**

A: Yes, but only when `Event.isNewChat` is `true`. The `replySign` in event objects follows the same new format. If you use event-sourced `replySign` values, they will already be in the new format after the WB rollout. Prefer `getSellerChats()` which always returns the most current values regardless of `isNewChat`.

**Q: What happens if I call `createSellerMessage()` without the `data` argument after v3.13.0?**

A: TypeScript users get a compile error. JavaScript users get a `ValidationError` at runtime: `replySign is required (string, non-empty)`.

---

## Casing / Format Note

The `replySign` value is a single string field — there is no casing variant between API responses and request bodies. The same value returned by `getSellerChats()` in `Chat.replySign` is passed verbatim to `createSellerMessage()` in `data.replySign`. No transformation needed.

---

## Related Resources

- WB API announcement: https://dev.wildberries.ru/release-notes (2026-05-14)
- WB API reference: https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami
- SDK CHANGELOG v3.13.0: [CHANGELOG.md](../../CHANGELOG.md)
- `getSellerChats()` method docs: `sdk.communications.getSellerChats()`
- `createSellerMessage()` method docs: `sdk.communications.createSellerMessage(data)`
- `SellerMessageRequest` type: `import type { SellerMessageRequest } from 'daytona-wildberries-typescript-sdk'`

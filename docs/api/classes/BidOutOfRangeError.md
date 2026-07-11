[Wildberries API TypeScript SDK](../modules.md) / BidOutOfRangeError

# Class: BidOutOfRangeError

Defined in: [errors/bid-out-of-range-error.ts:137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L137)

Error thrown when WB rejects a bid for being out of the accepted range.

Wildberries advert endpoints reject out-of-range bids with an HTTP 400 whose
RFC 7807 body looks like:

```json
{
  "detail": "wrong bid value: 3; min: 150",
  "title": "invalid payload",
  "status": 400
}
```

BaseClient detects this shape and throws `BidOutOfRangeError` instead of a
generic [ValidationError](ValidationError.md), exposing the parsed floor (and ceiling when
reported) directly. This is high-value for auto-bidding engines: the
canonical minimum is available from the error itself, avoiding a separate
`getBidsRecommendations` round-trip (which is capped at 5 req/min).

This error is a subclass of [ValidationError](ValidationError.md), so existing
`catch (error) { if (error instanceof ValidationError) ... }` blocks still
catch it — the change is purely additive.

The `received`/`min`/`max` numeric unit depends on which endpoint rejected
the bid: **kopecks** for `updateBids`, **RUB** for `setNormqueryBids`.

## Example

```typescript
import { BidOutOfRangeError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.updateBids({
    bids: [{ advert_id: 12345, nm_bids: [{ nm_id: 1, bid_kopecks: 3, placement: 'search' }] }]
  });
} catch (error) {
  if (error instanceof BidOutOfRangeError) {
    console.error(`Bid ${error.received} below minimum ${error.min}`);
    // Retry at error.min (the canonical floor)
  }
}
```

## See

[InvalidBidError](InvalidBidError.md) for the broader bid-validation sibling
  (legacy; not thrown by BaseClient — reserved for caller-side validation).

## Extends

- [`ValidationError`](ValidationError.md)

## Constructors

### Constructor

```ts
new BidOutOfRangeError(
   message: string, 
   context?: {
  received?: number;
  min?: number;
  max?: number;
  field?: string;
}, 
   response?: unknown, 
   requestId?: string): BidOutOfRangeError;
```

Defined in: [errors/bid-out-of-range-error.ts:155](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L155)

Creates a BidOutOfRangeError.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Error message (typically the raw WB `detail` string) |
| `context?` | \{ `received?`: `number`; `min?`: `number`; `max?`: `number`; `field?`: `string`; \} | Parsed bid-range context (`received`/`min`/`max`) plus optional `field` |
| `context.received?` | `number` | - |
| `context.min?` | `number` | - |
| `context.max?` | `number` | - |
| `context.field?` | `string` | - |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |

#### Returns

`BidOutOfRangeError`

#### Overrides

[`ValidationError`](ValidationError.md).[`constructor`](ValidationError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`ValidationError`](ValidationError.md).[`statusCode`](ValidationError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`ValidationError`](ValidationError.md).[`response`](ValidationError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`ValidationError`](ValidationError.md).[`requestId`](ValidationError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`ValidationError`](ValidationError.md).[`origin`](ValidationError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`ValidationError`](ValidationError.md).[`timestamp`](ValidationError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L51) |
| <a id="received"></a> `received?` | `readonly` | `number` | The bid value WB rejected (the "wrong bid value"). | - | [errors/bid-out-of-range-error.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L139) |
| <a id="min"></a> `min?` | `readonly` | `number` | The minimum accepted bid (the floor). | - | [errors/bid-out-of-range-error.ts:142](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L142) |
| <a id="max"></a> `max?` | `readonly` | `number` | The maximum accepted bid (the ceiling), only when WB reports one. | - | [errors/bid-out-of-range-error.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L145) |
| <a id="fielderrors"></a> `fieldErrors?` | `readonly` | `Record`\<`string`, `string`\> | Map of field names to their validation error messages | [`ValidationError`](ValidationError.md).[`fieldErrors`](ValidationError.md#fielderrors) | [errors/validation-error.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/validation-error.ts#L39) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/bid-out-of-range-error.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L180)

Returns a user-friendly error message with the accepted bid range.

#### Returns

`string`

Error message naming the rejected bid and the accepted floor/ceiling

#### Overrides

[`ValidationError`](ValidationError.md).[`getUserMessage`](ValidationError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode: number;
  fieldErrors?: Record<string, string>;
  received?: number;
  min?: number;
  max?: number;
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/bid-out-of-range-error.ts:215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L215)

Custom JSON serialization to preserve bid-range fields.

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode: number;
  fieldErrors?: Record<string, string>;
  received?: number;
  min?: number;
  max?: number;
  response?: unknown;
  requestId?: string;
}
```

Object representation including received/min/max

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/bid-out-of-range-error.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L216) |
| `message` | `string` | [errors/bid-out-of-range-error.ts:217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L217) |
| `statusCode` | `number` | [errors/bid-out-of-range-error.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L218) |
| `fieldErrors?` | `Record`\<`string`, `string`\> | [errors/bid-out-of-range-error.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L219) |
| `received?` | `number` | [errors/bid-out-of-range-error.ts:220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L220) |
| `min?` | `number` | [errors/bid-out-of-range-error.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L221) |
| `max?` | `number` | [errors/bid-out-of-range-error.ts:222](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L222) |
| `response?` | `unknown` | [errors/bid-out-of-range-error.ts:223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L223) |
| `requestId?` | `string` | [errors/bid-out-of-range-error.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L224) |

#### Overrides

[`ValidationError`](ValidationError.md).[`toJSON`](ValidationError.md#tojson)

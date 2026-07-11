[Wildberries API TypeScript SDK](../modules.md) / InvalidBidError

# Class: InvalidBidError

Defined in: [errors/promotion-errors.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L113)

Error thrown when bid amount is invalid or below minimum.

This error occurs when:
- Bid is below the minimum required amount
- Bid format is incorrect
- Bid exceeds maximum allowed amount

Note: this is the broader bid-validation sibling. BaseClient does NOT throw it;
callers may use it for their own pre-flight validation. For WB's structured
out-of-range 400 responses (`wrong bid value: X; min: Y`), BaseClient throws
the more specific [BidOutOfRangeError](BidOutOfRangeError.md) (which exposes parsed `received`/`min`).

## See

[BidOutOfRangeError](BidOutOfRangeError.md)

## Example

```typescript
import { InvalidBidError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.updateBids({
    bids: [{ advert_id: 123, nm_bids: [{ nm_id: 456, bid: 50, placement: 'search' }] }]
  });
} catch (error) {
  if (error instanceof InvalidBidError) {
    console.error(`Minimum bid is ${error.minBid}`);
    // Increase bid amount and retry
  }
}
```

## Extends

- [`ValidationError`](ValidationError.md)

## Constructors

### Constructor

```ts
new InvalidBidError(
   message: string, 
   context?: {
  field?: string;
  minBid?: number;
  maxBid?: number;
  currentBid?: number;
}, 
   response?: unknown, 
   requestId?: string): InvalidBidError;
```

Defined in: [errors/promotion-errors.ts:137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L137)

Creates an InvalidBidError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Error message describing the bid validation failure |
| `context?` | \{ `field?`: `string`; `minBid?`: `number`; `maxBid?`: `number`; `currentBid?`: `number`; \} | Additional context (minBid, maxBid, currentBid) |
| `context.field?` | `string` | - |
| `context.minBid?` | `number` | - |
| `context.maxBid?` | `number` | - |
| `context.currentBid?` | `number` | - |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |

#### Returns

`InvalidBidError`

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
| <a id="minbid"></a> `minBid?` | `readonly` | `number` | Minimum bid amount required (if available) | - | [errors/promotion-errors.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L117) |
| <a id="maxbid"></a> `maxBid?` | `readonly` | `number` | Maximum bid amount allowed (if applicable) | - | [errors/promotion-errors.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L122) |
| <a id="currentbid"></a> `currentBid?` | `readonly` | `number` | Current bid amount that was rejected | - | [errors/promotion-errors.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L127) |
| <a id="fielderrors"></a> `fieldErrors?` | `readonly` | `Record`\<`string`, `string`\> | Map of field names to their validation error messages | [`ValidationError`](ValidationError.md).[`fieldErrors`](ValidationError.md#fielderrors) | [errors/validation-error.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/validation-error.ts#L39) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/promotion-errors.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L162)

Returns user-friendly error message with bid requirements

#### Returns

`string`

Error message with specific bid constraints

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
  minBid?: number;
  maxBid?: number;
  currentBid?: number;
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/promotion-errors.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L195)

Custom JSON serialization

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode: number;
  fieldErrors?: Record<string, string>;
  minBid?: number;
  maxBid?: number;
  currentBid?: number;
  response?: unknown;
  requestId?: string;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/promotion-errors.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L196) |
| `message` | `string` | [errors/promotion-errors.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L197) |
| `statusCode` | `number` | [errors/promotion-errors.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L198) |
| `fieldErrors?` | `Record`\<`string`, `string`\> | [errors/promotion-errors.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L199) |
| `minBid?` | `number` | [errors/promotion-errors.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L200) |
| `maxBid?` | `number` | [errors/promotion-errors.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L201) |
| `currentBid?` | `number` | [errors/promotion-errors.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L202) |
| `response?` | `unknown` | [errors/promotion-errors.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L203) |
| `requestId?` | `string` | [errors/promotion-errors.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L204) |

#### Overrides

[`ValidationError`](ValidationError.md).[`toJSON`](ValidationError.md#tojson)

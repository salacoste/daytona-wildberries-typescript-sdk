[Wildberries API TypeScript SDK](../modules.md) / InvalidBidError

# Class: InvalidBidError

Defined in: [errors/promotion-errors.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L107)

Error thrown when bid amount is invalid or below minimum.

This error occurs when:
- Bid is below the minimum required amount
- Bid format is incorrect
- Bid exceeds maximum allowed amount

## Example

```typescript
import { InvalidBidError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.updateAuctionBids({
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

Defined in: [errors/promotion-errors.ts:131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L131)

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
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`ValidationError`](ValidationError.md).[`statusCode`](ValidationError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`ValidationError`](ValidationError.md).[`response`](ValidationError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`ValidationError`](ValidationError.md).[`requestId`](ValidationError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`ValidationError`](ValidationError.md).[`origin`](ValidationError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`ValidationError`](ValidationError.md).[`timestamp`](ValidationError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/base-error.ts#L51) |
| <a id="minbid"></a> `minBid?` | `readonly` | `number` | Minimum bid amount required (if available) | - | [errors/promotion-errors.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L111) |
| <a id="maxbid"></a> `maxBid?` | `readonly` | `number` | Maximum bid amount allowed (if applicable) | - | [errors/promotion-errors.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L116) |
| <a id="currentbid"></a> `currentBid?` | `readonly` | `number` | Current bid amount that was rejected | - | [errors/promotion-errors.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L121) |
| <a id="fielderrors"></a> `fieldErrors?` | `readonly` | `Record`\<`string`, `string`\> | Map of field names to their validation error messages | [`ValidationError`](ValidationError.md).[`fieldErrors`](ValidationError.md#fielderrors) | [errors/validation-error.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/validation-error.ts#L39) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/promotion-errors.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L156)

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

Defined in: [errors/promotion-errors.ts:189](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L189)

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
| `name` | `string` | [errors/promotion-errors.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L190) |
| `message` | `string` | [errors/promotion-errors.ts:191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L191) |
| `statusCode` | `number` | [errors/promotion-errors.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L192) |
| `fieldErrors?` | `Record`\<`string`, `string`\> | [errors/promotion-errors.ts:193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L193) |
| `minBid?` | `number` | [errors/promotion-errors.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L194) |
| `maxBid?` | `number` | [errors/promotion-errors.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L195) |
| `currentBid?` | `number` | [errors/promotion-errors.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L196) |
| `response?` | `unknown` | [errors/promotion-errors.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L197) |
| `requestId?` | `string` | [errors/promotion-errors.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/errors/promotion-errors.ts#L198) |

#### Overrides

[`ValidationError`](ValidationError.md).[`toJSON`](ValidationError.md#tojson)

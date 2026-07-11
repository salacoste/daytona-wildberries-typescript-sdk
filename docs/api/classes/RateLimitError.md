[Wildberries API TypeScript SDK](../modules.md) / RateLimitError

# Class: RateLimitError

Defined in: [errors/rate-limit-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L25)

Rate limit error thrown when API rate limits are exceeded.

This error is thrown for 429 Too Many Requests responses.
The SDK's RetryHandler automatically retries rate-limited requests
after the specified delay, so consumers typically don't need to
handle this error manually.

## Example

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. SDK will retry after ${error.retryAfter}ms`);
    // The SDK automatically retries, so you usually don't need to do anything
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new RateLimitError(
   message: string, 
   retryAfter: number, 
   response?: unknown, 
   requestId?: string, 
   origin?: string, 
   timestamp?: string): RateLimitError;
```

Defined in: [errors/rate-limit-error.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L41)

Creates a rate limit error

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `'Rate limit exceeded. The SDK will automatically retry this request.'` | Error message (defaults to standard rate limit message) |
| `retryAfter` | `number` | `undefined` | Milliseconds until retry is allowed |
| `response?` | `unknown` | `undefined` | API response body if available |
| `requestId?` | `string` | `undefined` | Correlation ID for debugging |
| `origin?` | `string` | `undefined` | Origin service identifier from RFC 7807 responses |
| `timestamp?` | `string` | `undefined` | ISO 8601 timestamp from RFC 7807 responses |

#### Returns

`RateLimitError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L51) |
| <a id="retryafter"></a> `retryAfter` | `readonly` | `number` | Milliseconds to wait before retrying the request | - | [errors/rate-limit-error.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L29) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/rate-limit-error.ts:59](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L59)

Returns user-friendly error message with retry timing information

#### Returns

`string`

Error message with retry delay and automatic handling notice

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode: number;
  retryAfter: number;
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/rate-limit-error.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L80)

Custom JSON serialization to preserve retryAfter property

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode: number;
  retryAfter: number;
  response?: unknown;
  requestId?: string;
}
```

Object representation including retryAfter timing

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/rate-limit-error.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L81) |
| `message` | `string` | [errors/rate-limit-error.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L82) |
| `statusCode` | `number` | [errors/rate-limit-error.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L83) |
| `retryAfter` | `number` | [errors/rate-limit-error.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L84) |
| `response?` | `unknown` | [errors/rate-limit-error.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L85) |
| `requestId?` | `string` | [errors/rate-limit-error.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/rate-limit-error.ts#L86) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

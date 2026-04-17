[Wildberries API TypeScript SDK](../modules.md) / NetworkError

# Class: NetworkError

Defined in: [errors/network-error.ts:33](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L33)

Network error thrown for connection failures, timeouts, and server errors.

This error is thrown for:
- Network connection failures (no internet, DNS failures)
- Request timeouts (exceeding configured timeout)
- 500-level server errors (500, 502, 503, 504)

The SDK's RetryHandler automatically retries network errors with
exponential backoff (max 3 attempts), so transient failures are
handled automatically.

## Example

```typescript
import { NetworkError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.products.getProductList();
} catch (error) {
  if (error instanceof NetworkError) {
    if (error.isTimeout) {
      console.error('Request timed out:', error.getUserMessage());
    } else {
      console.error('Network error:', error.getUserMessage());
    }
    // The SDK already attempted 3 retries automatically
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new NetworkError(
   message: string, 
   isTimeout: boolean, 
   statusCode?: number, 
   cause?: Error, 
   response?: unknown, 
   requestId?: string): NetworkError;
```

Defined in: [errors/network-error.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L54)

Creates a network error

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `undefined` | Error message describing the network failure |
| `isTimeout` | `boolean` | `false` | Whether this error was caused by a timeout |
| `statusCode?` | `number` | `undefined` | HTTP status code (0 for network failures, 5xx for server errors) |
| `cause?` | `Error` | `undefined` | Original error from the HTTP client |
| `response?` | `unknown` | `undefined` | API response body if available |
| `requestId?` | `string` | `undefined` | Correlation ID for debugging |

#### Returns

`NetworkError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/base-error.ts#L51) |
| <a id="cause"></a> `cause?` | `readonly` | `Error` | Original error from the HTTP client | - | [errors/network-error.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L37) |
| <a id="istimeout"></a> `isTimeout` | `readonly` | `boolean` | True if the error was caused by a timeout | - | [errors/network-error.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L42) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/network-error.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L73)

Returns user-friendly error message with retry information and troubleshooting guidance

#### Returns

`string`

Error message with network-specific recovery steps

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  isTimeout: boolean;
  statusCode?: number;
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/network-error.ts:120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L120)

Custom JSON serialization to preserve isTimeout property

Note: The `cause` property is not serialized as Error objects
don't serialize well. Check the cause property directly if needed.

#### Returns

```ts
{
  name: string;
  message: string;
  isTimeout: boolean;
  statusCode?: number;
  response?: unknown;
  requestId?: string;
}
```

Object representation including timeout flag and status

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/network-error.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L121) |
| `message` | `string` | [errors/network-error.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L122) |
| `isTimeout` | `boolean` | [errors/network-error.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L123) |
| `statusCode?` | `number` | [errors/network-error.ts:124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L124) |
| `response?` | `unknown` | [errors/network-error.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L125) |
| `requestId?` | `string` | [errors/network-error.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/errors/network-error.ts#L126) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

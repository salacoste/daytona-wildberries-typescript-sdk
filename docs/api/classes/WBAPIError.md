[Wildberries API TypeScript SDK](../modules.md) / WBAPIError

# Class: WBAPIError

Defined in: [errors/base-error.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L21)

Base error class for all Wildberries SDK errors.

All SDK-specific errors extend this class to enable consumers to catch
all SDK errors with a single catch block if desired.

## Example

```typescript
import { WBAPIError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.general.ping();
} catch (error) {
  if (error instanceof WBAPIError) {
    console.error('SDK error:', error.getUserMessage());
    console.error('Status code:', error.statusCode);
  }
}
```

## Extends

- `Error`

## Extended by

- [`AuthenticationError`](AuthenticationError.md)
- [`RateLimitError`](RateLimitError.md)
- [`ValidationError`](ValidationError.md)
- [`NetworkError`](NetworkError.md)
- [`CampaignNotFoundError`](CampaignNotFoundError.md)
- [`BudgetExceededError`](BudgetExceededError.md)
- [`InvalidCampaignStateError`](InvalidCampaignStateError.md)
- [`PickupOrderNotFoundError`](PickupOrderNotFoundError.md)
- [`InvalidOrderStateError`](InvalidOrderStateError.md)
- [`CustomerVerificationError`](CustomerVerificationError.md)
- [`MetadataValidationError`](MetadataValidationError.md)

## Constructors

### Constructor

```ts
new WBAPIError(
   message: string, 
   statusCode?: number, 
   response?: unknown, 
   requestId?: string, 
   origin?: string, 
   timestamp?: string): WBAPIError;
```

Defined in: [errors/base-error.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L63)

Creates a new WBAPIError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Error message describing what went wrong |
| `statusCode?` | `number` | HTTP status code if applicable |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |
| `origin?` | `string` | Origin service identifier from RFC 7807 responses |
| `timestamp?` | `string` | ISO 8601 timestamp from RFC 7807 responses |

#### Returns

`WBAPIError`

#### Overrides

```ts
Error.constructor
```

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L51) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/base-error.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L122)

Returns a human-readable error message with recovery guidance.

Override this method in subclasses to provide specific recovery steps.

#### Returns

`string`

User-friendly error message with actionable guidance

#### Example

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof WBAPIError) {
    // Show user-friendly message
    alert(error.getUserMessage());

    // Log technical details for debugging
    console.error('Technical details:', {
      statusCode: error.statusCode,
      requestId: error.requestId
    });
  }
}
```

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode?: number;
  response?: unknown;
  requestId?: string;
  origin?: string;
  timestamp?: string;
};
```

Defined in: [errors/base-error.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L156)

Custom JSON serialization to preserve all error properties.

By default, Error objects don't serialize the `message` property
when using JSON.stringify(). This method ensures all important
properties are included in the JSON output.

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode?: number;
  response?: unknown;
  requestId?: string;
  origin?: string;
  timestamp?: string;
}
```

Object representation of the error for JSON serialization

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/base-error.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L157) |
| `message` | `string` | [errors/base-error.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L158) |
| `statusCode?` | `number` | [errors/base-error.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L159) |
| `response?` | `unknown` | [errors/base-error.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L160) |
| `requestId?` | `string` | [errors/base-error.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L161) |
| `origin?` | `string` | [errors/base-error.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L162) |
| `timestamp?` | `string` | [errors/base-error.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L163) |

#### Example

```typescript
const error = new WBAPIError('Test error', 400, { detail: 'info' }, 'req-123');
const json = JSON.stringify(error);
// { "name": "WBAPIError", "message": "Test error", "statusCode": 400, ... }
```

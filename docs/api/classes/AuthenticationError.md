[Wildberries API TypeScript SDK](../modules.md) / AuthenticationError

# Class: AuthenticationError

Defined in: [errors/auth-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/auth-error.ts#L25)

Authentication error thrown when API key is invalid or lacks permissions.

This error is thrown for:
- 401 Unauthorized responses (invalid API key)
- 403 Forbidden responses (insufficient permissions)
- Client-side API key validation failures

## Example

```typescript
import { AuthenticationError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.general.ping();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key:', error.getUserMessage());
    // Prompt user to update API key in settings
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new AuthenticationError(
   message: string, 
   statusCode: 401 | 403, 
   response?: unknown, 
   requestId?: string, 
   origin?: string, 
   timestamp?: string): AuthenticationError;
```

Defined in: [errors/auth-error.ts:36](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/auth-error.ts#L36)

Creates an authentication error

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `'Authentication failed. Please verify your API key is valid and has the required permissions.'` | Error message (defaults to standard authentication failure message) |
| `statusCode` | `401` \| `403` | `401` | HTTP status code (401 or 403) |
| `response?` | `unknown` | `undefined` | API response body if available |
| `requestId?` | `string` | `undefined` | Correlation ID for debugging |
| `origin?` | `string` | `undefined` | Origin service identifier from RFC 7807 responses |
| `timestamp?` | `string` | `undefined` | ISO 8601 timestamp from RFC 7807 responses |

#### Returns

`AuthenticationError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L51) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/auth-error.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/auth-error.ts#L53)

Returns user-friendly error message with API key troubleshooting guidance

#### Returns

`string`

Error message with actionable recovery steps

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

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

Defined in: [errors/base-error.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L156)

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
| `name` | `string` | [errors/base-error.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L157) |
| `message` | `string` | [errors/base-error.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L158) |
| `statusCode?` | `number` | [errors/base-error.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L159) |
| `response?` | `unknown` | [errors/base-error.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L160) |
| `requestId?` | `string` | [errors/base-error.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L161) |
| `origin?` | `string` | [errors/base-error.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L162) |
| `timestamp?` | `string` | [errors/base-error.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/errors/base-error.ts#L163) |

#### Example

```typescript
const error = new WBAPIError('Test error', 400, { detail: 'info' }, 'req-123');
const json = JSON.stringify(error);
// { "name": "WBAPIError", "message": "Test error", "statusCode": 400, ... }
```

#### Inherited from

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

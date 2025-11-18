[Wildberries API TypeScript SDK](../modules.md) / AuthenticationError

# Class: AuthenticationError

Defined in: [errors/auth-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/auth-error.ts#L25)

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
   requestId?: string): AuthenticationError;
```

Defined in: [errors/auth-error.ts:34](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/auth-error.ts#L34)

Creates an authentication error

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `'Authentication failed. Please verify your API key is valid and has the required permissions.'` | Error message (defaults to standard authentication failure message) |
| `statusCode` | `401` \| `403` | `401` | HTTP status code (401 or 403) |
| `response?` | `unknown` | `undefined` | API response body if available |
| `requestId?` | `string` | `undefined` | Correlation ID for debugging |

#### Returns

`AuthenticationError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L35) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/auth-error.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/auth-error.ts#L49)

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
};
```

Defined in: [errors/base-error.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L125)

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
}
```

Object representation of the error for JSON serialization

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/base-error.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L126) |
| `message` | `string` | [errors/base-error.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L127) |
| `statusCode?` | `number` | [errors/base-error.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L128) |
| `response?` | `unknown` | [errors/base-error.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L129) |
| `requestId?` | `string` | [errors/base-error.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L130) |

#### Example

```typescript
const error = new WBAPIError('Test error', 400, { detail: 'info' }, 'req-123');
const json = JSON.stringify(error);
// { "name": "WBAPIError", "message": "Test error", "statusCode": 400, ... }
```

#### Inherited from

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

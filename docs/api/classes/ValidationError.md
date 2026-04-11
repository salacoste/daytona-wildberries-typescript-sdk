[Wildberries API TypeScript SDK](../modules.md) / ValidationError

# Class: ValidationError

Defined in: [errors/validation-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L35)

Validation error thrown when request data fails validation.

This error is thrown for:
- 400 Bad Request responses (malformed requests)
- 422 Unprocessable Entity responses (validation failures)

Includes field-level error details when available to help
identify which specific fields failed validation.

## Example

```typescript
import { ValidationError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.products.createProduct({
    // Missing required fields
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.getUserMessage());

    // Access field-level errors
    if (error.fieldErrors) {
      Object.entries(error.fieldErrors).forEach(([field, message]) => {
        console.error(`  - ${field}: ${message}`);
      });
    }
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Extended by

- [`InvalidBidError`](InvalidBidError.md)

## Constructors

### Constructor

```ts
new ValidationError(
   message: string, 
   fieldErrors?: Record<string, string>, 
   statusCode?: 400 | 422, 
   response?: unknown, 
   requestId?: string): ValidationError;
```

Defined in: [errors/validation-error.ts:50](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L50)

Creates a validation error

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `'Validation failed. Please check the request data and try again.'` | Error message (defaults to standard validation failure message) |
| `fieldErrors?` | `Record`\<`string`, `string`\> | `undefined` | Optional map of field names to error messages |
| `statusCode?` | `400` \| `422` | `400` | HTTP status code (400 or 422) |
| `response?` | `unknown` | `undefined` | API response body if available |
| `requestId?` | `string` | `undefined` | Correlation ID for debugging |

#### Returns

`ValidationError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/base-error.ts#L51) |
| <a id="fielderrors"></a> `fieldErrors?` | `readonly` | `Record`\<`string`, `string`\> | Map of field names to their validation error messages | - | [errors/validation-error.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L39) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/validation-error.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L67)

Returns user-friendly error message with field-level validation details

#### Returns

`string`

Error message with specific field errors and resolution guidance

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode: number;
  fieldErrors?: Record<string, string>;
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/validation-error.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L100)

Custom JSON serialization to preserve fieldErrors property

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode: number;
  fieldErrors?: Record<string, string>;
  response?: unknown;
  requestId?: string;
}
```

Object representation including field-level error details

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/validation-error.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L101) |
| `message` | `string` | [errors/validation-error.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L102) |
| `statusCode` | `number` | [errors/validation-error.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L103) |
| `fieldErrors?` | `Record`\<`string`, `string`\> | [errors/validation-error.ts:104](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L104) |
| `response?` | `unknown` | [errors/validation-error.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L105) |
| `requestId?` | `string` | [errors/validation-error.ts:106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/errors/validation-error.ts#L106) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

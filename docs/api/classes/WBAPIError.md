[Wildberries API TypeScript SDK](../modules.md) / WBAPIError

# Class: WBAPIError

Defined in: [errors/base-error.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L21)

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
   requestId?: string): WBAPIError;
```

Defined in: [errors/base-error.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L45)

Creates a new WBAPIError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Error message describing what went wrong |
| `statusCode?` | `number` | HTTP status code if applicable |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |

#### Returns

`WBAPIError`

#### Overrides

```ts
Error.constructor
```

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L35) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/base-error.ts:95](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L95)

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
};
```

Defined in: [errors/base-error.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L125)

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
| `name` | `string` | [errors/base-error.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L126) |
| `message` | `string` | [errors/base-error.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L127) |
| `statusCode?` | `number` | [errors/base-error.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L128) |
| `response?` | `unknown` | [errors/base-error.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L129) |
| `requestId?` | `string` | [errors/base-error.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L130) |

#### Example

```typescript
const error = new WBAPIError('Test error', 400, { detail: 'info' }, 'req-123');
const json = JSON.stringify(error);
// { "name": "WBAPIError", "message": "Test error", "statusCode": 400, ... }
```

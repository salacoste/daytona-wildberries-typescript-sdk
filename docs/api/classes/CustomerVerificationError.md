[Wildberries API TypeScript SDK](../modules.md) / CustomerVerificationError

# Class: CustomerVerificationError

Defined in: [errors/in-store-pickup-errors.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/in-store-pickup-errors.ts#L173)

Error thrown when customer identity verification fails

**HTTP Status**: 409 Conflict
**Retry**: No (permanent failure - requires correct passcode)
**Rate Limit**: 409 responses count as 5 requests!

This error occurs when the passcode provided for identity verification does
not match the customer's order code. The customer needs to provide the correct
passcode from their Wildberries app.

## Example

```typescript
try {
  const result = await sdk.inStorePickup.verifyCustomerIdentity({
    orderCode: '21117866-0006',
    passcode: '1234'
  });
} catch (error) {
  if (error instanceof CustomerVerificationError) {
    console.error('Verification failed:', error.getUserMessage());
    // Ask customer to check their app for correct passcode
    // Note: Be careful not to exceed rate limits (30 req/min)
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new CustomerVerificationError(
   orderCode: string, 
   message: string, 
   requestId?: string): CustomerVerificationError;
```

Defined in: [errors/in-store-pickup-errors.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/in-store-pickup-errors.ts#L181)

Creates a new CustomerVerificationError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderCode` | `string` | Customer's order code that failed verification |
| `message` | `string` | Detailed error message from API |
| `requestId?` | `string` | Optional request ID from API response |

#### Returns

`CustomerVerificationError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/base-error.ts#L35) |
| <a id="ordercode"></a> `orderCode` | `readonly` | `string` | Customer's order code that failed verification | - | [errors/in-store-pickup-errors.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/in-store-pickup-errors.ts#L182) |

## Methods

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

#### Inherited from

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

***

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/in-store-pickup-errors.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/errors/in-store-pickup-errors.ts#L201)

Returns user-friendly error message with recovery guidance

#### Returns

`string`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

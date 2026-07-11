[Wildberries API TypeScript SDK](../modules.md) / WarehouseStocksUpdateBlockError

# Class: WarehouseStocksUpdateBlockError

Defined in: [errors/warehouse-stocks-update-block-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/warehouse-stocks-update-block-error.ts#L25)

Error thrown when WB returns HTTP 406 `WarehouseStocksUpdateBlock` on inventory updates.

Returned during warehouse maintenance/processing work — inventory cannot be updated until
the work completes. **Transient and retryable**: the consumer should retry the request later.

Thrown for `PUT /api/v3/stocks/{warehouseId}` (`sdk.products.updateStock`) when the warehouse
is processing.

## Example

```typescript
import { WarehouseStocksUpdateBlockError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.products.updateStock(12345, { stocks: [{ chrtId: 12345678, amount: 100 }] });
} catch (error) {
  if (error instanceof WarehouseStocksUpdateBlockError) {
    console.log('Warehouse is processing — retry the inventory update later');
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new WarehouseStocksUpdateBlockError(
   message: string, 
   response?: unknown, 
   requestId?: string, 
   origin?: string, 
   timestamp?: string): WarehouseStocksUpdateBlockError;
```

Defined in: [errors/warehouse-stocks-update-block-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/warehouse-stocks-update-block-error.ts#L35)

Creates a WarehouseStocksUpdateBlockError (HTTP 406).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Error message from WB (defaults to a maintenance/processing message) |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |
| `origin?` | `string` | Origin service identifier from RFC 7807 responses |
| `timestamp?` | `string` | ISO 8601 timestamp from RFC 7807 responses |

#### Returns

`WarehouseStocksUpdateBlockError`

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

## Methods

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

Defined in: [errors/base-error.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L156)

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
| `name` | `string` | [errors/base-error.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L157) |
| `message` | `string` | [errors/base-error.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L158) |
| `statusCode?` | `number` | [errors/base-error.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L159) |
| `response?` | `unknown` | [errors/base-error.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L160) |
| `requestId?` | `string` | [errors/base-error.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L161) |
| `origin?` | `string` | [errors/base-error.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L162) |
| `timestamp?` | `string` | [errors/base-error.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L163) |

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

Defined in: [errors/warehouse-stocks-update-block-error.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/warehouse-stocks-update-block-error.ts#L48)

Returns a human-readable error message with recovery guidance.

#### Returns

`string`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

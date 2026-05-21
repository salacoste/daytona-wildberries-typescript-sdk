[Wildberries API TypeScript SDK](../modules.md) / MetaValidationFailError

# Class: MetaValidationFailError

Defined in: errors/meta-validation-fail-error.ts:38

Error thrown when `PATCH /api/v3/supplies/{supplyId}/deliver` returns HTTP 409
with marking-code validation failures in the `metaDetails` response array.

From **2026-06-03**, Wildberries validates Честный Знак (Honest Sign) marking codes
server-side for B2C FBS orders. Codes must be passed **in full** — with GS separators
(ASCII 0x1D) and the cryptographic authenticity tail. Invalid codes trigger this error.

⚠️ **Rate-limit penalty**: every 409 response counts as **10 requests** against the
FBS supply/order budget. Use `sdk.ordersFBS.getOrdersMetaBulk()` for pre-flight
validation to avoid burning budget on repeated failures.

## Since

3.15.0

## See

 - [https://dev.wildberries.ru/docs/openapi/orders-fbs](https://dev.wildberries.ru/docs/openapi/orders-fbs) — Orders FBS API
 - [Migration guide](../_media/fbs-marking-code-validation.md)

## Example

```typescript
import { MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
} catch (err) {
  if (err instanceof MetaValidationFailError) {
    // Typed access to the failing marking codes
    err.metaDetails.forEach(d => {
      console.log(`key=${d.key} value="${d.value}" decision=${d.decision}`);
    });
    // err is still instanceof WBAPIError — existing catch-all blocks still work
  }
  throw err;
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new MetaValidationFailError(
   message: string, 
   code: string, 
   metaDetails: MetaDetail[], 
   response?: unknown, 
   requestId?: string, 
   origin?: string, 
   timestamp?: string): MetaValidationFailError;
```

Defined in: errors/meta-validation-fail-error.ts:63

Creates a MetaValidationFailError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Human-readable error message from the API response |
| `code` | `string` | WB error code string (e.g. `'MetaValidationFail'`). Defaults to 'Unknown' when WB omits the code field. |
| `metaDetails` | [`MetaDetail`](../interfaces/MetaDetail.md)[] | Array of individual validation failures |
| `response?` | `unknown` | Raw API response body |
| `requestId?` | `string` | Correlation ID for debugging and tracing |
| `origin?` | `string` | Origin service identifier from RFC 7807 problem+json responses |
| `timestamp?` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses |

#### Returns

`MetaValidationFailError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/errors/base-error.ts#L51) |
| <a id="code"></a> `code` | `readonly` | `string` | WB error code from the response body (e.g. `'MetaValidationFail'`). Defaults to `'Unknown'` when WB omits the code field. | - | errors/meta-validation-fail-error.ts:43 |
| <a id="metadetails"></a> `metaDetails` | `readonly` | [`MetaDetail`](../interfaces/MetaDetail.md)[] | Array of individual marking-code validation failures. Each item exposes `key` (metadata type), `value` (the submitted code), and `decision` (`'invalid'` when the code failed validation). | - | errors/meta-validation-fail-error.ts:50 |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: errors/meta-validation-fail-error.ts:84

Returns a user-friendly error message listing the failing marking codes.

#### Returns

`string`

Error message with metaDetails summary and recovery guidance

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode?: number;
  code: string;
  metaDetails: MetaDetail[];
  response?: unknown;
  requestId?: string;
};
```

Defined in: errors/meta-validation-fail-error.ts:122

Custom JSON serialization to include metaDetails and code properties

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode?: number;
  code: string;
  metaDetails: MetaDetail[];
  response?: unknown;
  requestId?: string;
}
```

Object representation including metaDetails and code

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | errors/meta-validation-fail-error.ts:123 |
| `message` | `string` | errors/meta-validation-fail-error.ts:124 |
| `statusCode?` | `number` | errors/meta-validation-fail-error.ts:125 |
| `code` | `string` | errors/meta-validation-fail-error.ts:126 |
| `metaDetails` | [`MetaDetail`](../interfaces/MetaDetail.md)[] | errors/meta-validation-fail-error.ts:127 |
| `response?` | `unknown` | errors/meta-validation-fail-error.ts:128 |
| `requestId?` | `string` | errors/meta-validation-fail-error.ts:129 |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

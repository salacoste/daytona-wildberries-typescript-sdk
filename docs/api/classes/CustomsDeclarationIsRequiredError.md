[Wildberries API TypeScript SDK](../modules.md) / CustomsDeclarationIsRequiredError

# Class: CustomsDeclarationIsRequiredError

Defined in: [errors/customs-declaration-is-required-error.ts:38](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L38)

Error thrown when WB returns HTTP 409 with body `code: 'CustomsDeclarationIsRequired'`
— at least one assembly order in the request lacks a required customs-declaration
(ДТ, декларация на товары) number.

Since **2026-08-18** (WB news):
- A customs-declaration number can be attached **only to assembly orders in `confirm` status**
  (via `sdk.ordersFBS.setCustomsDeclaration()`).
- **Armenia sellers** must attach a ДТ for items produced **outside the EAEU** when an order
  from Armenia is delivered to the Russian Federation.
- `POST /api/v3/orders/stickers` (`sdk.ordersFBS.createOrdersSticker()`) returns this 409
  when any requested order lacks a required ДТ — stickers cannot be obtained until it is attached.

The raw WB response body (including any `data` payload with order identifiers WB may include)
is preserved on [CustomsDeclarationIsRequiredError.response](WBAPIError.md#response).

## Since

4.3.0

## See

[https://dev.wildberries.ru/docs/openapi/orders-fbs](https://dev.wildberries.ru/docs/openapi/orders-fbs) — Orders FBS API

## Example

```typescript
import { CustomsDeclarationIsRequiredError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.ordersFBS.createOrdersSticker({ type: 'png' }, { orders: [123456] });
} catch (err) {
  if (err instanceof CustomsDeclarationIsRequiredError) {
    console.log('Attach a customs declaration number before printing stickers');
    console.log('Raw body:', err.response);
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
new CustomsDeclarationIsRequiredError(
   message: string, 
   code: string, 
   response?: unknown, 
   requestId?: string, 
   origin?: string, 
   timestamp?: string): CustomsDeclarationIsRequiredError;
```

Defined in: [errors/customs-declaration-is-required-error.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L54)

Creates a CustomsDeclarationIsRequiredError (HTTP 409)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Human-readable error message from the API response |
| `code` | `string` | WB error code string (e.g. `'CustomsDeclarationIsRequired'`) |
| `response?` | `unknown` | Raw API response body (may carry order identifiers in `data`) |
| `requestId?` | `string` | Correlation ID for debugging and tracing |
| `origin?` | `string` | Origin service identifier from RFC 7807 problem+json responses |
| `timestamp?` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses |

#### Returns

`CustomsDeclarationIsRequiredError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/base-error.ts#L51) |
| <a id="code"></a> `code` | `readonly` | `string` | WB error code from the response body (`'CustomsDeclarationIsRequired'`). | - | [errors/customs-declaration-is-required-error.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L42) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/customs-declaration-is-required-error.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L72)

Returns a user-friendly error message with recovery guidance.

#### Returns

`string`

Error message with recovery steps for the missing customs declaration

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
  response?: unknown;
  requestId?: string;
  origin?: string;
  timestamp?: string;
};
```

Defined in: [errors/customs-declaration-is-required-error.ts:91](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L91)

Custom JSON serialization to include the code property

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode?: number;
  code: string;
  response?: unknown;
  requestId?: string;
  origin?: string;
  timestamp?: string;
}
```

Object representation including code

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/customs-declaration-is-required-error.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L92) |
| `message` | `string` | [errors/customs-declaration-is-required-error.ts:93](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L93) |
| `statusCode?` | `number` | [errors/customs-declaration-is-required-error.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L94) |
| `code` | `string` | [errors/customs-declaration-is-required-error.ts:95](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L95) |
| `response?` | `unknown` | [errors/customs-declaration-is-required-error.ts:96](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L96) |
| `requestId?` | `string` | [errors/customs-declaration-is-required-error.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L97) |
| `origin?` | `string` | [errors/customs-declaration-is-required-error.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L98) |
| `timestamp?` | `string` | [errors/customs-declaration-is-required-error.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/errors/customs-declaration-is-required-error.ts#L99) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

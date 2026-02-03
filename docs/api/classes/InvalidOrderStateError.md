[Wildberries API TypeScript SDK](../modules.md) / InvalidOrderStateError

# Class: InvalidOrderStateError

Defined in: [errors/in-store-pickup-errors.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/in-store-pickup-errors.ts#L98)

Error thrown when an order state transition is invalid

**HTTP Status**: 409 Conflict
**Retry**: No (permanent failure - requires state correction)
**Rate Limit**: 409 responses count as 5 requests!

This error occurs when attempting to transition an order to a state that is
not valid given its current state (e.g., trying to prepare an order that
hasn't been confirmed yet).

**Valid State Transitions**:
- `new` → `confirm` (confirmOrder)
- `confirm` → `prepare` (prepareOrder)
- `prepare` → `receive` (receiveOrder) - terminal state
- `prepare` → `reject` (rejectOrder) - terminal state
- Any → `cancel` (cancelOrder) - terminal state

## Example

```typescript
try {
  // Trying to prepare order without confirming first
  await sdk.inStorePickup.prepareOrder(12345);
} catch (error) {
  if (error instanceof InvalidOrderStateError) {
    console.error(`Cannot ${error.attemptedAction} order ${error.orderId}`);
    console.error(`Current state: ${error.currentState}`);
    console.error('Recovery:', error.getUserMessage());

    // Get current status and retry with correct action
    const statuses = await sdk.inStorePickup.getOrderStatuses([error.orderId]);
    const currentState = statuses.orders[0]?.supplierStatus;
    // Handle based on current state
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new InvalidOrderStateError(
   orderId: number, 
   currentState: string | undefined, 
   attemptedAction: string, 
   requestId?: string): InvalidOrderStateError;
```

Defined in: [errors/in-store-pickup-errors.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/in-store-pickup-errors.ts#L107)

Creates a new InvalidOrderStateError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the order with invalid state |
| `currentState` | `string` \| `undefined` | Current state of the order (if known) |
| `attemptedAction` | `string` | Action that was attempted (e.g., "prepare", "receive") |
| `requestId?` | `string` | Optional request ID from API response |

#### Returns

`InvalidOrderStateError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L35) |
| <a id="orderid"></a> `orderId` | `readonly` | `number` | ID of the order with invalid state | - | [errors/in-store-pickup-errors.ts:108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/in-store-pickup-errors.ts#L108) |
| <a id="currentstate"></a> `currentState` | `readonly` | `string` \| `undefined` | Current state of the order (if known) | - | [errors/in-store-pickup-errors.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/in-store-pickup-errors.ts#L109) |
| <a id="attemptedaction"></a> `attemptedAction` | `readonly` | `string` | Action that was attempted (e.g., "prepare", "receive") | - | [errors/in-store-pickup-errors.ts:110](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/in-store-pickup-errors.ts#L110) |

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

Defined in: [errors/base-error.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L125)

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
| `name` | `string` | [errors/base-error.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L126) |
| `message` | `string` | [errors/base-error.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L127) |
| `statusCode?` | `number` | [errors/base-error.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L128) |
| `response?` | `unknown` | [errors/base-error.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L129) |
| `requestId?` | `string` | [errors/base-error.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/base-error.ts#L130) |

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

Defined in: [errors/in-store-pickup-errors.ts:131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/errors/in-store-pickup-errors.ts#L131)

Returns user-friendly error message with recovery guidance

#### Returns

`string`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

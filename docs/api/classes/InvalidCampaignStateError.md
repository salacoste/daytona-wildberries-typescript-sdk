[Wildberries API TypeScript SDK](../modules.md) / InvalidCampaignStateError

# Class: InvalidCampaignStateError

Defined in: [errors/promotion-errors.ts:360](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L360)

Error thrown when attempting invalid campaign state transitions.

Campaign lifecycle states:
- `-1`: Deleted (being deleted, will complete in 10 minutes)
- `4`: Ready to launch
- `7`: Completed
- `8`: Cancelled
- `9`: Active
- `11`: Paused

Valid transitions:
- Ready (4) → Active (9) via startCampaign()
- Active (9) → Paused (11) via pauseCampaign()
- Paused (11) → Active (9) via startCampaign()
- Active/Paused → Completed (7) via stopCampaign()

## Example

```typescript
import { InvalidCampaignStateError } from 'daytona-wildberries-typescript-sdk';

try {
  // Trying to start an already active campaign
  await sdk.promotion.startCampaign(123);
} catch (error) {
  if (error instanceof InvalidCampaignStateError) {
    console.error(`Cannot ${error.attemptedAction} campaign in ${error.currentState} state`);
    console.error('Valid states:', error.validStates);
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new InvalidCampaignStateError(
   currentState: string, 
   attemptedAction: string, 
   validStates?: string[], 
   response?: unknown, 
   requestId?: string): InvalidCampaignStateError;
```

Defined in: [errors/promotion-errors.ts:385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L385)

Creates an InvalidCampaignStateError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currentState` | `string` | Current state of the campaign |
| `attemptedAction` | `string` | Action that was attempted (start, pause, stop, delete) |
| `validStates?` | `string`[] | Optional list of valid states for this action |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |

#### Returns

`InvalidCampaignStateError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/base-error.ts#L51) |
| <a id="currentstate"></a> `currentState` | `readonly` | `string` | Current campaign state | - | [errors/promotion-errors.ts:364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L364) |
| <a id="attemptedaction"></a> `attemptedAction` | `readonly` | `string` | Action that was attempted | - | [errors/promotion-errors.ts:369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L369) |
| <a id="validstates"></a> `validStates?` | `readonly` | `string`[] | List of valid states for the attempted action | - | [errors/promotion-errors.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L374) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/promotion-errors.ts:404](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L404)

Returns user-friendly error message with state transition guidance

#### Returns

`string`

Error message with valid state transitions

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode: number;
  currentState: string;
  attemptedAction: string;
  validStates?: string[];
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/promotion-errors.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L436)

Custom JSON serialization

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode: number;
  currentState: string;
  attemptedAction: string;
  validStates?: string[];
  response?: unknown;
  requestId?: string;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/promotion-errors.ts:437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L437) |
| `message` | `string` | [errors/promotion-errors.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L438) |
| `statusCode` | `number` | [errors/promotion-errors.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L439) |
| `currentState` | `string` | [errors/promotion-errors.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L440) |
| `attemptedAction` | `string` | [errors/promotion-errors.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L441) |
| `validStates?` | `string`[] | [errors/promotion-errors.ts:442](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L442) |
| `response?` | `unknown` | [errors/promotion-errors.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L443) |
| `requestId?` | `string` | [errors/promotion-errors.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/errors/promotion-errors.ts#L444) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

[Wildberries API TypeScript SDK](../modules.md) / InvalidCampaignStateError

# Class: InvalidCampaignStateError

Defined in: [errors/promotion-errors.ts:362](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L362)

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

Defined in: [errors/promotion-errors.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L387)

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
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/base-error.ts#L35) |
| <a id="currentstate"></a> `currentState` | `readonly` | `string` | Current campaign state | - | [errors/promotion-errors.ts:366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L366) |
| <a id="attemptedaction"></a> `attemptedAction` | `readonly` | `string` | Action that was attempted | - | [errors/promotion-errors.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L371) |
| <a id="validstates"></a> `validStates?` | `readonly` | `string`[] | List of valid states for the attempted action | - | [errors/promotion-errors.ts:376](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L376) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/promotion-errors.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L411)

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

Defined in: [errors/promotion-errors.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L438)

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
| `name` | `string` | [errors/promotion-errors.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L439) |
| `message` | `string` | [errors/promotion-errors.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L440) |
| `statusCode` | `number` | [errors/promotion-errors.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L441) |
| `currentState` | `string` | [errors/promotion-errors.ts:442](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L442) |
| `attemptedAction` | `string` | [errors/promotion-errors.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L443) |
| `validStates?` | `string`[] | [errors/promotion-errors.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L444) |
| `response?` | `unknown` | [errors/promotion-errors.ts:445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L445) |
| `requestId?` | `string` | [errors/promotion-errors.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/errors/promotion-errors.ts#L446) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

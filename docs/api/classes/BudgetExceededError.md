[Wildberries API TypeScript SDK](../modules.md) / BudgetExceededError

# Class: BudgetExceededError

Defined in: [errors/promotion-errors.ts:233](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L233)

Error thrown when campaign budget is exceeded or insufficient.

This error occurs when:
- Requested operation would exceed campaign budget
- Insufficient funds in account for deposit
- Budget limit reached for billing period

## Example

```typescript
import { BudgetExceededError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.createBudgetDeposit({ sum: 50000 }, { id: 123 });
} catch (error) {
  if (error instanceof BudgetExceededError) {
    console.error(`Budget exceeded: ${error.message}`);
    console.error(`Available: ${error.availableBudget}, Required: ${error.requiredBudget}`);
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new BudgetExceededError(
   message: string, 
   context?: {
  availableBudget?: number;
  requiredBudget?: number;
}, 
   response?: unknown, 
   requestId?: string): BudgetExceededError;
```

Defined in: [errors/promotion-errors.ts:252](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L252)

Creates a BudgetExceededError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | Error message describing the budget issue |
| `context?` | \{ `availableBudget?`: `number`; `requiredBudget?`: `number`; \} | Budget information (available, required) |
| `context.availableBudget?` | `number` | - |
| `context.requiredBudget?` | `number` | - |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |

#### Returns

`BudgetExceededError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/base-error.ts#L35) |
| <a id="availablebudget"></a> `availableBudget?` | `readonly` | `number` | Available budget amount | - | [errors/promotion-errors.ts:237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L237) |
| <a id="requiredbudget"></a> `requiredBudget?` | `readonly` | `number` | Required budget amount for the operation | - | [errors/promotion-errors.ts:242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L242) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/promotion-errors.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L272)

Returns user-friendly error message with budget details

#### Returns

`string`

Error message with budget information

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode: number;
  availableBudget?: number;
  requiredBudget?: number;
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/promotion-errors.ts:312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L312)

Custom JSON serialization

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode: number;
  availableBudget?: number;
  requiredBudget?: number;
  response?: unknown;
  requestId?: string;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/promotion-errors.ts:313](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L313) |
| `message` | `string` | [errors/promotion-errors.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L314) |
| `statusCode` | `number` | [errors/promotion-errors.ts:315](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L315) |
| `availableBudget?` | `number` | [errors/promotion-errors.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L316) |
| `requiredBudget?` | `number` | [errors/promotion-errors.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L317) |
| `response?` | `unknown` | [errors/promotion-errors.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L318) |
| `requestId?` | `string` | [errors/promotion-errors.ts:319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/errors/promotion-errors.ts#L319) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

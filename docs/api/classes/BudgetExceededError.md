[Wildberries API TypeScript SDK](../modules.md) / BudgetExceededError

# Class: BudgetExceededError

Defined in: [errors/promotion-errors.ts:237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L237)

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

Defined in: [errors/promotion-errors.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L256)

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
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/base-error.ts#L51) |
| <a id="availablebudget"></a> `availableBudget?` | `readonly` | `number` | Available budget amount | - | [errors/promotion-errors.ts:241](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L241) |
| <a id="requiredbudget"></a> `requiredBudget?` | `readonly` | `number` | Required budget amount for the operation | - | [errors/promotion-errors.ts:246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L246) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/promotion-errors.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L276)

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

Defined in: [errors/promotion-errors.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L316)

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
| `name` | `string` | [errors/promotion-errors.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L317) |
| `message` | `string` | [errors/promotion-errors.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L318) |
| `statusCode` | `number` | [errors/promotion-errors.ts:319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L319) |
| `availableBudget?` | `number` | [errors/promotion-errors.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L320) |
| `requiredBudget?` | `number` | [errors/promotion-errors.ts:321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L321) |
| `response?` | `unknown` | [errors/promotion-errors.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L322) |
| `requestId?` | `string` | [errors/promotion-errors.ts:323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/promotion-errors.ts#L323) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

[Wildberries API TypeScript SDK](../modules.md) / CampaignNotFoundError

# Class: CampaignNotFoundError

Defined in: [errors/promotion-errors.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L26)

Error thrown when a campaign is not found by its ID.

This error typically occurs when:
- Campaign was deleted
- Campaign ID is incorrect
- Campaign belongs to another seller account

## Example

```typescript
import { CampaignNotFoundError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.startCampaign(123456);
} catch (error) {
  if (error instanceof CampaignNotFoundError) {
    console.error('Campaign does not exist:', error.message);
    // Verify campaign ID and try again
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new CampaignNotFoundError(
   campaignId: number, 
   response?: unknown, 
   requestId?: string): CampaignNotFoundError;
```

Defined in: [errors/promotion-errors.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L39)

Creates a CampaignNotFoundError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `number` | ID of the campaign that wasn't found |
| `response?` | `unknown` | API response body if available |
| `requestId?` | `string` | Correlation ID for debugging |

#### Returns

`CampaignNotFoundError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/base-error.ts#L35) |
| <a id="campaignid"></a> `campaignId` | `readonly` | `number` | Campaign ID that was not found | - | [errors/promotion-errors.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L30) |

## Methods

### getUserMessage()

```ts
getUserMessage(): string;
```

Defined in: [errors/promotion-errors.ts:50](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L50)

Returns user-friendly error message with recovery guidance

#### Returns

`string`

Error message with actionable steps

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

***

### toJSON()

```ts
toJSON(): {
  name: string;
  message: string;
  statusCode: number;
  campaignId: number;
  response?: unknown;
  requestId?: string;
};
```

Defined in: [errors/promotion-errors.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L67)

Custom JSON serialization

#### Returns

```ts
{
  name: string;
  message: string;
  statusCode: number;
  campaignId: number;
  response?: unknown;
  requestId?: string;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `name` | `string` | [errors/promotion-errors.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L68) |
| `message` | `string` | [errors/promotion-errors.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L69) |
| `statusCode` | `number` | [errors/promotion-errors.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L70) |
| `campaignId` | `number` | [errors/promotion-errors.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L71) |
| `response?` | `unknown` | [errors/promotion-errors.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L72) |
| `requestId?` | `string` | [errors/promotion-errors.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/errors/promotion-errors.ts#L73) |

#### Overrides

[`WBAPIError`](WBAPIError.md).[`toJSON`](WBAPIError.md#tojson)

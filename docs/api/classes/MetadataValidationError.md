[Wildberries API TypeScript SDK](../modules.md) / MetadataValidationError

# Class: MetadataValidationError

Defined in: [errors/in-store-pickup-errors.ts:246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/in-store-pickup-errors.ts#L246)

Error thrown when product metadata validation fails

**HTTP Status**: 409 Conflict (metadata update failures)
**Retry**: No (permanent failure - requires correct data or order state)
**Rate Limit**: 409 responses count as 10 requests!

This error occurs when attempting to set metadata (SGTIN, UIN, IMEI, GTIN) codes
but the operation fails due to:
- Invalid code format
- Order not in `confirm` status
- Metadata type not in order's `requiredMeta` list
- Delivery not by WB (for UIN, IMEI, GTIN)

## Example

```typescript
try {
  await sdk.inStorePickup.setSGTINCode(12345, ['invalid-code']);
} catch (error) {
  if (error instanceof MetadataValidationError) {
    console.error(`Cannot set ${error.codeType}:`, error.getUserMessage());

    // Check order status
    const statuses = await sdk.inStorePickup.getOrderStatuses([12345]);
    console.log('Current status:', statuses.orders[0].supplierStatus);

    // Check required metadata
    const newOrders = await sdk.inStorePickup.getNewOrders();
    const order = newOrders.orders.find(o => o.id === 12345);
    console.log('Required metadata:', order?.requiredMeta);
  }
}
```

## Extends

- [`WBAPIError`](WBAPIError.md)

## Constructors

### Constructor

```ts
new MetadataValidationError(
   codeType: "SGTIN" | "UIN" | "IMEI" | "GTIN", 
   orderId: number, 
   message: string, 
   requestId?: string): MetadataValidationError;
```

Defined in: [errors/in-store-pickup-errors.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/in-store-pickup-errors.ts#L255)

Creates a new MetadataValidationError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `codeType` | `"SGTIN"` \| `"UIN"` \| `"IMEI"` \| `"GTIN"` | Type of metadata code (SGTIN, UIN, IMEI, GTIN) |
| `orderId` | `number` | ID of the order for which metadata update failed |
| `message` | `string` | Detailed error message from API |
| `requestId?` | `string` | Optional request ID from API response |

#### Returns

`MetadataValidationError`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`constructor`](WBAPIError.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="statuscode"></a> `statusCode?` | `readonly` | `number` | HTTP status code if applicable | [`WBAPIError`](WBAPIError.md).[`statusCode`](WBAPIError.md#statuscode) | [errors/base-error.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L25) |
| <a id="response"></a> `response?` | `readonly` | `unknown` | API response body if available | [`WBAPIError`](WBAPIError.md).[`response`](WBAPIError.md#response) | [errors/base-error.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L30) |
| <a id="requestid"></a> `requestId?` | `readonly` | `string` | Correlation ID for debugging and tracing requests | [`WBAPIError`](WBAPIError.md).[`requestId`](WBAPIError.md#requestid) | [errors/base-error.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L35) |
| <a id="origin"></a> `origin?` | `readonly` | `string` | Origin service identifier from RFC 7807 problem+json responses. Indicates which internal Wildberries service originated the error (e.g., "s2s-api-auth-catalog"). | [`WBAPIError`](WBAPIError.md).[`origin`](WBAPIError.md#origin) | [errors/base-error.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L43) |
| <a id="timestamp"></a> `timestamp?` | `readonly` | `string` | ISO 8601 timestamp from RFC 7807 problem+json responses. Indicates when the error occurred on the server side (e.g., "2024-09-30T06:52:38Z"). | [`WBAPIError`](WBAPIError.md).[`timestamp`](WBAPIError.md#timestamp) | [errors/base-error.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L51) |
| <a id="codetype"></a> `codeType` | `readonly` | `"SGTIN"` \| `"UIN"` \| `"IMEI"` \| `"GTIN"` | Type of metadata code (SGTIN, UIN, IMEI, GTIN) | - | [errors/in-store-pickup-errors.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/in-store-pickup-errors.ts#L256) |
| <a id="orderid"></a> `orderId` | `readonly` | `number` | ID of the order for which metadata update failed | - | [errors/in-store-pickup-errors.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/in-store-pickup-errors.ts#L257) |

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

Defined in: [errors/base-error.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L156)

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
| `name` | `string` | [errors/base-error.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L157) |
| `message` | `string` | [errors/base-error.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L158) |
| `statusCode?` | `number` | [errors/base-error.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L159) |
| `response?` | `unknown` | [errors/base-error.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L160) |
| `requestId?` | `string` | [errors/base-error.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L161) |
| `origin?` | `string` | [errors/base-error.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L162) |
| `timestamp?` | `string` | [errors/base-error.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/base-error.ts#L163) |

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

Defined in: [errors/in-store-pickup-errors.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/errors/in-store-pickup-errors.ts#L277)

Returns user-friendly error message with recovery guidance

#### Returns

`string`

#### Overrides

[`WBAPIError`](WBAPIError.md).[`getUserMessage`](WBAPIError.md#getusermessage)

[Wildberries API TypeScript SDK](../modules.md) / OrdersDbsModule

# Class: OrdersDbsModule

Defined in: [modules/orders-dbs/index.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L72)

Orders DBS Module for managing Delivery by Seller orders

DBS (Delivery by Seller) is a fulfillment model where sellers handle
both storage AND delivery directly to customers. Unlike FBS (where WB
delivers to pickup points) or FBW (where WB stores and delivers),
DBS gives sellers full control over the delivery process.

## Example

```typescript
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Get new orders awaiting processing
const newOrders = await sdk.ordersDBS.getNewOrders();

// Get customer contact info for delivery coordination
const clientInfo = await sdk.ordersDBS.getClientInfo([123456]);
```

## Constructors

### Constructor

```ts
new OrdersDbsModule(client: BaseClient): OrdersDbsModule;
```

Defined in: [modules/orders-dbs/index.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L73)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`OrdersDbsModule`

## Methods

### getNewOrders()

```ts
getNewOrders(): Promise<GetNewOrdersResponse>;
```

Defined in: [modules/orders-dbs/index.ts:106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L106)

Get list of new DBS assembly tasks

Returns all new orders awaiting processing. Each order includes:
- Customer address with GPS coordinates for delivery routing
- Delivery window (ddate, dTimeFrom, dTimeTo)
- requiredMeta indicating which metadata must be added before shipping

Rate limit: 300 requests/min, 200ms interval, 20 burst

#### Returns

`Promise`\<[`GetNewOrdersResponse`](../-internal-/interfaces/GetNewOrdersResponse.md)\>

Promise resolving to list of new DBS orders

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Sborochnye-zadaniya-DBS/paths/~1api~1v3~1dbs~1orders~1new/get](https://dev.wildberries.ru/openapi/orders-dbs#tag/Sborochnye-zadaniya-DBS/paths/~1api~1v3~1dbs~1orders~1new/get)

#### Example

```typescript
const newOrders = await sdk.ordersDBS.getNewOrders();

for (const order of newOrders.orders ?? []) {
  console.log(`Order ${order.id}: ${order.address?.fullAddress}`);
  console.log(`Delivery: ${order.ddate} ${order.dTimeFrom}-${order.dTimeTo}`);

  if (order.requiredMeta && order.requiredMeta.length > 0) {
    console.log(`Required metadata: ${order.requiredMeta.join(', ')}`);
  }
}
```

***

### getOrders()

```ts
getOrders(params: GetOrdersParams): Promise<GetOrdersResponse>;
```

Defined in: [modules/orders-dbs/index.ts:153](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L153)

Get completed DBS orders with pagination and date filtering

Returns orders that have been completed (delivered) or cancelled.
Maximum 30 calendar days per request.

Rate limit: 300 requests/min, 200ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`GetOrdersParams`](../-internal-/interfaces/GetOrdersParams.md) | Query parameters for filtering and pagination |

#### Returns

`Promise`\<[`GetOrdersResponse`](../-internal-/interfaces/GetOrdersResponse.md)\>

Promise resolving to orders and next pagination cursor

#### Throws

When parameters are invalid (limit out of range, date range > 30 days)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Zakazy-DBS/paths/~1api~1v3~1dbs~1orders/get](https://dev.wildberries.ru/openapi/orders-dbs#tag/Zakazy-DBS/paths/~1api~1v3~1dbs~1orders/get)

#### Example

```typescript
// Get orders from last 7 days with pagination
const now = Math.floor(Date.now() / 1000);
const weekAgo = now - 7 * 24 * 60 * 60;

let next = 0;
do {
  const result = await sdk.ordersDBS.getOrders({
    limit: 100,
    next,
    dateFrom: weekAgo,
    dateTo: now
  });

  console.log(`Fetched ${result.orders?.length ?? 0} orders`);
  next = result.next ?? 0;
} while (next > 0);
```

***

### getClientInfo()

```ts
getClientInfo(orderIds: number[]): Promise<GetClientInfoResponse>;
```

Defined in: [modules/orders-dbs/index.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L214)

Get customer contact information for DBS orders

Returns customer name, phone number, and additional contact codes.
Use this to contact customers for delivery coordination.

Rate limit: 300 requests/min, 200ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to get client info for |

#### Returns

`Promise`\<[`GetClientInfoResponse`](../-internal-/interfaces/GetClientInfoResponse.md)\>

Promise resolving to customer contact information

#### Throws

When orderIds array is empty

#### Throws

When API key is invalid (401/403)

#### Throws

When order not found (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Zakazy-DBS/paths/~1api~1v3~1dbs~1orders~1client/post](https://dev.wildberries.ru/openapi/orders-dbs#tag/Zakazy-DBS/paths/~1api~1v3~1dbs~1orders~1client/post)

#### Example

```typescript
const clientInfo = await sdk.ordersDBS.getClientInfo([123456, 234567]);

for (const client of clientInfo.orders ?? []) {
  console.log(`Order ${client.orderID}:`);
  console.log(`  Name: ${client.fullName}`);
  console.log(`  Phone: +${client.phoneCode}${client.phone}`);
}
```

***

### getB2BInfo()

```ts
getB2BInfo(orderIds: number[]): Promise<GetB2BInfoResponse>;
```

Defined in: [modules/orders-dbs/index.ts:264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L264)

Get B2B buyer information for DBS orders

Returns B2B buyer details (organization name, INN, KPP) for orders
placed by business customers. For B2C orders, returns an error
indicating the order is not a B2B order.

Note: Individual Entrepreneurs (IP) may have empty KPP field
and a 12-digit INN instead of 10-digit INN for legal entities.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to get B2B info for (1-1000 items) |

#### Returns

`Promise`\<[`GetB2BInfoResponse`](../-internal-/interfaces/GetB2BInfoResponse.md)\>

Promise resolving to B2B buyer information for each order

#### Throws

When orderIds array is empty or exceeds 1000 items

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/B2B](https://dev.wildberries.ru/openapi/orders-dbs#tag/B2B)

#### Example

```typescript
const b2bInfo = await sdk.ordersDBS.getB2BInfo([123456, 234567]);

for (const result of b2bInfo.results ?? []) {
  if (result.isError) {
    console.log(`Order ${result.orderId}: Not a B2B order`);
  } else {
    console.log(`Order ${result.orderId}:`);
    console.log(`  Organization: ${result.data?.orgName}`);
    console.log(`  INN: ${result.data?.inn}`);
    console.log(`  KPP: ${result.data?.kpp || 'N/A (IP)'}`);
  }
}
```

***

### getGroupsInfo()

```ts
getGroupsInfo(request: OrderGroupsRequest): Promise<OrderGroupsResponse>;
```

Defined in: [modules/orders-dbs/index.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L297)

Get paid delivery group information

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`OrderGroupsRequest`](../-internal-/interfaces/OrderGroupsRequest.md) | Request with order IDs |

#### Returns

`Promise`\<[`OrderGroupsResponse`](../-internal-/interfaces/OrderGroupsResponse.md)\>

Promise resolving to order group information

#### Example

```typescript
const groups = await sdk.ordersDBS.getGroupsInfo({ orders: [123456] });
```

***

### getDeliveryDates()

```ts
getDeliveryDates(request: DeliveryDatesRequest): Promise<DeliveryDatesInfoResponse>;
```

Defined in: [modules/orders-dbs/index.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L314)

Get delivery dates for DBS orders

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`DeliveryDatesRequest`](../-internal-/interfaces/DeliveryDatesRequest.md) | Request with order IDs |

#### Returns

`Promise`\<[`DeliveryDatesInfoResponse`](../-internal-/interfaces/DeliveryDatesInfoResponse.md)\>

Promise resolving to delivery date information

#### Example

```typescript
const dates = await sdk.ordersDBS.getDeliveryDates({ orders: [123456] });
```

***

### deleteMetaBulk()

```ts
deleteMetaBulk(request: DeleteMetaBulkRequest): Promise<DeleteMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L340)

Delete metadata for multiple orders (bulk)

Replaces the deprecated single-order deleteMeta() method.
Rate limit: 150 requests/min, 400ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`DeleteMetaBulkRequest`](../-internal-/interfaces/DeleteMetaBulkRequest-1.md) | Request with order IDs and metadata key to delete |

#### Returns

`Promise`\<[`DeleteMetaBulkResponse`](../-internal-/interfaces/DeleteMetaBulkResponse-1.md)\>

Promise resolving to bulk delete response

#### Example

```typescript
const result = await sdk.ordersDBS.deleteMetaBulk({ orders: [123456], key: 'imei' });
```

***

### setSgtinBulk()

```ts
setSgtinBulk(request: SetSgtinBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L364)

Set SGTIN codes for multiple orders (bulk)

Replaces the deprecated single-order setSgtin() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetSgtinBulkRequest`](../-internal-/interfaces/SetSgtinBulkRequest-1.md) | Request with order SGTIN data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse-1.md)\>

Promise resolving to bulk set response

#### Example

```typescript
const result = await sdk.ordersDBS.setSgtinBulk({
  orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }]
});
```

***

### setUinBulk()

```ts
setUinBulk(request: SetUinBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L388)

Set UIN codes for multiple orders (bulk)

Replaces the deprecated single-order setUin() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetUinBulkRequest`](../-internal-/interfaces/SetUinBulkRequest-1.md) | Request with order UIN data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse-1.md)\>

Promise resolving to bulk set response

#### Example

```typescript
const result = await sdk.ordersDBS.setUinBulk({
  orders: [{ orderId: 123456, uin: '1234567890123456' }]
});
```

***

### setImeiBulk()

```ts
setImeiBulk(request: SetImeiBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:412](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L412)

Set IMEI codes for multiple orders (bulk)

Replaces the deprecated single-order setImei() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetImeiBulkRequest`](../-internal-/interfaces/SetImeiBulkRequest-1.md) | Request with order IMEI data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse-1.md)\>

Promise resolving to bulk set response

#### Example

```typescript
const result = await sdk.ordersDBS.setImeiBulk({
  orders: [{ orderId: 123456, imei: '123456789012345' }]
});
```

***

### setGtinBulk()

```ts
setGtinBulk(request: SetGtinBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L436)

Set GTIN codes for multiple orders (bulk)

Replaces the deprecated single-order setGtin() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetGtinBulkRequest`](../-internal-/interfaces/SetGtinBulkRequest-1.md) | Request with order GTIN data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse-1.md)\>

Promise resolving to bulk set response

#### Example

```typescript
const result = await sdk.ordersDBS.setGtinBulk({
  orders: [{ orderId: 123456, gtin: '1234567890123' }]
});
```

***

### setCustomsDeclarationBulk()

```ts
setCustomsDeclarationBulk(request: SetCustomsDeclarationBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L465)

Set customs declaration for multiple orders (bulk)

Replaces the deprecated single-order setCustomsDeclaration() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetCustomsDeclarationBulkRequest`](../-internal-/interfaces/SetCustomsDeclarationBulkRequest-1.md) | Request with order customs declaration data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse-1.md)\>

Promise resolving to bulk set response. Orders that fail validation return in the
  response with error `InvalidOriginCountryCode` in the errors array (HTTP 200, partial
  success — not thrown).

**B2B requirement (since 2026-07-08):** B2B orders MUST include `originCountryCode` (numeric
country code, Russian classifier of countries). Without it the declaration cannot be linked.

#### Example

```typescript
const result = await sdk.ordersDBS.setCustomsDeclarationBulk({
  orders: [{ orderId: 123456, customsDeclaration: 'CD-123456789', originCountryCode: 643 }]
});
```

***

### getStatusesBulk()

```ts
getStatusesBulk(orderIds: number[]): Promise<GetStatusInfoResponse>;
```

Defined in: [modules/orders-dbs/index.ts:509](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L509)

Get status information for multiple DBS orders (bulk)

Retrieves the current status and tracking information for up to 1000 orders
in a single request. This is more efficient than individual status queries
for batch processing scenarios.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to get status for (1-1000 items) |

#### Returns

`Promise`\<[`GetStatusInfoResponse`](../-internal-/interfaces/GetStatusInfoResponse-1.md)\>

Promise resolving to status information for each order

#### Throws

When orderIds array is empty or exceeds 1000 items

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS](https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS)

#### Example

```typescript
// Get status for multiple orders
const statuses = await sdk.ordersDBS.getStatusesBulk([123456, 234567, 345678]);

for (const order of statuses.orders ?? []) {
  console.log(`Order ${order.orderId}: ${order.wbStatus}`);
  console.log(`  Seller status: ${order.supplierStatus}`);
  console.log(`  Updated: ${order.changedAt}`);
}
```

***

### confirmBulk()

```ts
confirmBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:555](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L555)

Confirm multiple DBS orders for assembly (bulk)

Moves up to 1000 orders from "new" to "confirmed" status in a single request.
This indicates the seller has acknowledged the orders and will begin
preparing them for delivery.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to confirm (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse-1.md)\>

Promise resolving to confirmation results for each order

#### Throws

When orderIds array is empty or exceeds 1000 items

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS](https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS)

#### Example

```typescript
// Confirm multiple orders at once
const result = await sdk.ordersDBS.confirmBulk([123456, 234567, 345678]);

for (const order of result.orders ?? []) {
  if (order.isError) {
    console.log(`Order ${order.orderId} failed: ${order.errorText}`);
  } else {
    console.log(`Order ${order.orderId} confirmed successfully`);
  }
}
```

***

### deliverBulk()

```ts
deliverBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:609](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L609)

Mark multiple DBS orders as delivered (bulk)

Moves up to 1000 orders to "delivered" status in a single request.
Use this when the seller has handed over the packages for delivery
to the customer. This triggers the delivery tracking process.

**Important:** Orders requiring IMEI must have it attached before calling this method.
Check `requiredMeta` array in `getNewOrders()` response — if it contains `"imei"`,
call `setImei()` first. Otherwise this method returns 409 with `"detail":"ImeiIsNotFilled"`.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to mark as delivered (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse-1.md)\>

Promise resolving to delivery status results for each order. When WB returns
  application-level 409 MetaValidationFail, it surfaces in `result.results[].errors[]`
  with `code === 409` and `detail === 'MetaValidationFail'`; check
  `result.results[].errors[].metaDetails[]` per-order before retrying. (since 3.11.0 — WB API 2026-05-06)

#### Throws

When orderIds array is empty or exceeds 1000 items

#### Throws

409 — ImeiIsNotFilled: mandatory IMEI not attached to order

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS](https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS)

#### Example

```typescript
// Mark multiple orders as delivered to carrier
const result = await sdk.ordersDBS.deliverBulk([123456, 234567, 345678]);

for (const order of result.orders ?? []) {
  if (order.isError) {
    console.log(`Order ${order.orderId} failed: ${order.errorText}`);
  } else {
    console.log(`Order ${order.orderId} marked as delivered`);
  }
}
```

***

### receiveBulk()

```ts
receiveBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L659)

Confirm customer receipt for multiple DBS orders (bulk)

Moves up to 1000 orders to "received" status in a single request.
Use this when the customer has received and accepted the delivery.
Requires the customer confirmation code for each order.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orders` | [`OrderCodeRequest`](../-internal-/interfaces/OrderCodeRequest.md)[] | Array of orders with IDs and customer confirmation codes (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse-1.md)\>

Promise resolving to receive confirmation results for each order

#### Throws

When orders array is empty, exceeds 1000 items, contains invalid orderId, or missing code

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS](https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS)

#### Example

```typescript
// Confirm receipt for multiple orders with customer codes
const result = await sdk.ordersDBS.receiveBulk([
  { orderId: 123456, code: 'ABC123' },
  { orderId: 234567, code: 'DEF456' },
  { orderId: 345678, code: 'GHI789' }
]);

for (const order of result.orders ?? []) {
  if (order.isError) {
    console.log(`Order ${order.orderId} failed: ${order.errorText}`);
  } else {
    console.log(`Order ${order.orderId} receipt confirmed`);
  }
}
```

***

### rejectBulk()

```ts
rejectBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L718)

Reject delivery for multiple DBS orders (bulk)

Moves up to 1000 orders to "rejected" status in a single request.
Use this when the customer has refused to accept the delivery
(e.g., wrong product, damaged package, changed mind).
Requires the rejection code for each order.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orders` | [`OrderCodeRequest`](../-internal-/interfaces/OrderCodeRequest.md)[] | Array of orders with IDs and rejection codes (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse-1.md)\>

Promise resolving to rejection results for each order

#### Throws

When orders array is empty, exceeds 1000 items, contains invalid orderId, or missing code

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS](https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS)

#### Example

```typescript
// Reject delivery for multiple orders with rejection codes
const result = await sdk.ordersDBS.rejectBulk([
  { orderId: 123456, code: 'DAMAGED' },
  { orderId: 234567, code: 'WRONG_ITEM' },
  { orderId: 345678, code: 'CUSTOMER_REFUSED' }
]);

for (const order of result.orders ?? []) {
  if (order.isError) {
    console.log(`Order ${order.orderId} rejection failed: ${order.errorText}`);
  } else {
    console.log(`Order ${order.orderId} rejected successfully`);
  }
}
```

***

### cancelBulk()

```ts
cancelBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:772](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L772)

Cancel multiple DBS orders (bulk)

Cancels up to 1000 orders in a single request. Use this when the seller
cannot fulfill the orders (e.g., out of stock, unable to deliver).
Orders can only be cancelled before they are delivered.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to cancel (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse-1.md)\>

Promise resolving to cancellation results for each order

#### Throws

When orderIds array is empty or exceeds 1000 items

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### See

[https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS](https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS)

#### Example

```typescript
// Cancel multiple orders that cannot be fulfilled
const result = await sdk.ordersDBS.cancelBulk([123456, 234567, 345678]);

for (const order of result.orders ?? []) {
  if (order.isError) {
    console.log(`Order ${order.orderId} cancellation failed: ${order.errorText}`);
  } else {
    console.log(`Order ${order.orderId} cancelled successfully`);
  }
}
```

***

### checkMetaValidation()

```ts
checkMetaValidation(request: GetMetaBulkRequest): Promise<DBSCheckMetaValidationResponse>;
```

Defined in: [modules/orders-dbs/index.ts:809](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L809)

Check marking-metadata validation (B2B Chestny ZNAK pre-flight)

Returns per-order marking-metadata validation status. Call BEFORE
status/deliver to identify orders that would get 409 MetaValidationFail.
Replaces the deprecated getMetaBulk() (meta/info, shutdown July 27).

Rate limit: 300 req/min, 200ms interval, burst 20 (4XX×10 penalty)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`GetMetaBulkRequest`](../-internal-/interfaces/GetMetaBulkRequest-1.md) | Request with DBS order IDs (max 1000) |

#### Returns

`Promise`\<[`DBSCheckMetaValidationResponse`](../-internal-/interfaces/DBSCheckMetaValidationResponse.md)\>

Per-order validation details

#### Throws

When orders array is empty or exceeds 1000

#### Since

3.16.0

#### Example

```typescript
const validation = await sdk.ordersDBS.checkMetaValidation({ orders: [123456, 234567] });
const invalid = validation.metaDetails.filter(d => d.status === 'invalid');
if (invalid.length > 0) {
  // fix marking metadata (sgtin/imei/uin/gtin), then deliver
}
await sdk.ordersDBS.deliverStatus({ orders: [123456, 234567] });
```

***

### createOrdersStickers()

```ts
createOrdersStickers(options?: StickerParams, data?: StickerRequest): Promise<StickerResponse>;
```

Defined in: [modules/orders-dbs/index.ts:857](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-dbs/index.ts#L857)

Get DBS assembly-order stickers

Returns stickers for DBS (Delivery by Seller) assembly orders with delivery
to a pickup point, in SVG, ZPLV, ZPLH, or PNG format. Maximum 100 stickers
per request.

Mirrors the FBS `createOrdersSticker` method at the DBS endpoint path.
Request/response shape mirrors FBS stickers — verify field-level details
against the live orders-dbs spec.

Access (expanded): available to registered/authorized services via a basic
token + secret, as well as personal/service tokens.

Rate limit: 300 requests per minute, 200ms interval, burst 20 (mirrors FBS
stickers; confirm against the live spec).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`StickerParams`](../-internal-/interfaces/StickerParams.md) | Sticker format and dimensions (`type`, `width`, `height`) |
| `data?` | [`StickerRequest`](../-internal-/interfaces/StickerRequest.md) | Request body containing order IDs (max 100) |

#### Returns

`Promise`\<[`StickerResponse`](../-internal-/interfaces/StickerResponse.md)\>

Promise resolving to the stickers response

#### Throws

When the orders array exceeds 100 items

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-DBS/paths/~1api~1marketplace~1v3~1dbs~1orders~1stickers/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-DBS/paths/~1api~1marketplace~1v3~1dbs~1orders~1stickers/post)

#### Example

```typescript
const result = await sdk.ordersDBS.createOrdersStickers(
  { type: 'png', width: 58, height: 40 },
  { orders: [123, 456] },
);
console.log(result.stickers);
```

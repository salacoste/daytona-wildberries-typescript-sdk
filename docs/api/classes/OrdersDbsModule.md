[Wildberries API TypeScript SDK](../modules.md) / OrdersDbsModule

# Class: OrdersDbsModule

Defined in: [modules/orders-dbs/index.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L69)

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

Defined in: [modules/orders-dbs/index.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L70)

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

Defined in: [modules/orders-dbs/index.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L103)

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

Defined in: [modules/orders-dbs/index.ts:150](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L150)

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

Defined in: [modules/orders-dbs/index.ts:211](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L211)

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

Defined in: [modules/orders-dbs/index.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L261)

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

Defined in: [modules/orders-dbs/index.ts:294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L294)

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

Defined in: [modules/orders-dbs/index.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L311)

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

### getMetaBulk()

```ts
getMetaBulk(request: GetMetaBulkRequest): Promise<GetOrderMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L337)

Get metadata for multiple orders (bulk)

Replaces the deprecated single-order getMeta() method.
Rate limit: 150 requests/min, 400ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`GetMetaBulkRequest`](../-internal-/interfaces/GetMetaBulkRequest.md) | Request with order IDs |

#### Returns

`Promise`\<[`GetOrderMetaBulkResponse`](../-internal-/interfaces/GetOrderMetaBulkResponse.md)\>

Promise resolving to bulk metadata response

#### Example

```typescript
const meta = await sdk.ordersDBS.getMetaBulk({ orders: [123456, 234567] });
```

***

### deleteMetaBulk()

```ts
deleteMetaBulk(request: DeleteMetaBulkRequest): Promise<DeleteMetaBulkResponse>;
```

Defined in: [modules/orders-dbs/index.ts:359](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L359)

Delete metadata for multiple orders (bulk)

Replaces the deprecated single-order deleteMeta() method.
Rate limit: 150 requests/min, 400ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`DeleteMetaBulkRequest`](../-internal-/interfaces/DeleteMetaBulkRequest.md) | Request with order IDs and metadata key to delete |

#### Returns

`Promise`\<[`DeleteMetaBulkResponse`](../-internal-/interfaces/DeleteMetaBulkResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:383](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L383)

Set SGTIN codes for multiple orders (bulk)

Replaces the deprecated single-order setSgtin() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetSgtinBulkRequest`](../-internal-/interfaces/SetSgtinBulkRequest.md) | Request with order SGTIN data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L407)

Set UIN codes for multiple orders (bulk)

Replaces the deprecated single-order setUin() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetUinBulkRequest`](../-internal-/interfaces/SetUinBulkRequest.md) | Request with order UIN data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L431)

Set IMEI codes for multiple orders (bulk)

Replaces the deprecated single-order setImei() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetImeiBulkRequest`](../-internal-/interfaces/SetImeiBulkRequest.md) | Request with order IMEI data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L455)

Set GTIN codes for multiple orders (bulk)

Replaces the deprecated single-order setGtin() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetGtinBulkRequest`](../-internal-/interfaces/SetGtinBulkRequest.md) | Request with order GTIN data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:479](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L479)

Set customs declaration for multiple orders (bulk)

Replaces the deprecated single-order setCustomsDeclaration() method.
Rate limit: 500 requests/min, 120ms interval, 20 burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetCustomsDeclarationBulkRequest`](../-internal-/interfaces/SetCustomsDeclarationBulkRequest.md) | Request with order customs declaration data |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

Promise resolving to bulk set response

#### Example

```typescript
const result = await sdk.ordersDBS.setCustomsDeclarationBulk({
  orders: [{ orderId: 123456, customsDeclaration: 'CD-123456789' }]
});
```

***

### getStatusesBulk()

```ts
getStatusesBulk(orderIds: number[]): Promise<GetStatusInfoResponse>;
```

Defined in: [modules/orders-dbs/index.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L523)

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

`Promise`\<[`GetStatusInfoResponse`](../-internal-/interfaces/GetStatusInfoResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:569](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L569)

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

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:615](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L615)

Mark multiple DBS orders as delivered (bulk)

Moves up to 1000 orders to "delivered" status in a single request.
Use this when the seller has handed over the packages for delivery
to the customer. This triggers the delivery tracking process.

Rate limit: Standard DBS rate limits apply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to mark as delivered (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

Promise resolving to delivery status results for each order

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

Defined in: [modules/orders-dbs/index.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L665)

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

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:724](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L724)

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

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

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

Defined in: [modules/orders-dbs/index.ts:778](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-dbs/index.ts#L778)

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

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

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

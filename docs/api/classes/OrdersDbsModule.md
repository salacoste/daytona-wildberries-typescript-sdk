[Wildberries API TypeScript SDK](../modules.md) / OrdersDbsModule

# Class: OrdersDbsModule

Defined in: [modules/orders-dbs/index.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L81)

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

Defined in: [modules/orders-dbs/index.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L82)

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

Defined in: [modules/orders-dbs/index.ts:115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L115)

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

Defined in: [modules/orders-dbs/index.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L162)

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

Defined in: [modules/orders-dbs/index.ts:223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L223)

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

Defined in: [modules/orders-dbs/index.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L273)

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

### ~~getMeta()~~

```ts
getMeta(orderId: number): Promise<GetOrderMetaResponse>;
```

Defined in: [modules/orders-dbs/index.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L317)

Get order metadata

Returns metadata associated with an order including IMEI, UIN, GTIN,
SGTIN, and customs declaration information.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get metadata for |

#### Returns

`Promise`\<[`GetOrderMetaResponse`](../-internal-/interfaces/GetOrderMetaResponse.md)\>

Promise resolving to order metadata

#### Deprecated

Use [getMetaBulk](#getmetabulk) instead. This endpoint will be removed on April 13, 2026.

#### Throws

When orderId is not greater than 0

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
const meta = await sdk.ordersDBS.getMeta(123456);
if (meta.meta?.imei?.value) {
  console.log(`IMEI: ${meta.meta.imei.value}`);
}
```

***

### ~~deleteMeta()~~

```ts
deleteMeta(orderId: number, key: DBSMetadataKey): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:348](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L348)

Delete specific metadata from an order

Removes a metadata key from the order. Valid keys are:
imei, uin, gtin, sgtin, customsDeclaration

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to delete metadata from |
| `key` | [`DBSMetadataKey`](../-internal-/type-aliases/DBSMetadataKey.md) | Metadata key to delete |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Deprecated

Use [deleteMetaBulk](#deletemetabulk) instead. This endpoint will be removed on April 13, 2026.

#### Throws

When orderId is not greater than 0 or key is invalid

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
await sdk.ordersDBS.deleteMeta(123456, 'imei');
console.log('IMEI metadata deleted');
```

***

### ~~setSgtin()~~

```ts
setSgtin(orderId: number, sgtins: string[]): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L384)

Set SGTIN marking codes for an order

Sets one or more SGTIN (Serialized Global Trade Item Number) marking codes.
Each SGTIN must be 16-135 characters. Maximum 24 SGTINs per order.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set SGTIN for |
| `sgtins` | `string`[] | Array of SGTIN codes (1-24 items, each 16-135 characters) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Deprecated

Use [setSgtinBulk](#setsgtinbulk) instead. This endpoint will be removed on April 13, 2026.

#### Throws

When orderId, sgtins array, or individual sgtin is invalid

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
await sdk.ordersDBS.setSgtin(123456, ['1234567890123456']);
console.log('SGTIN set successfully');
```

***

### ~~setUin()~~

```ts
setUin(orderId: number, uin: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L427)

Set UIN code for an order

Sets the UIN (Unique Identification Number) for the order.
UIN must be exactly 16 characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set UIN for |
| `uin` | `string` | UIN code (exactly 16 characters) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Deprecated

Use [setUinBulk](#setuinbulk) instead. This endpoint will be removed on April 13, 2026.

#### Throws

When orderId or uin is invalid

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
await sdk.ordersDBS.setUin(123456, '1234567890123456');
console.log('UIN set successfully');
```

***

### ~~setImei()~~

```ts
setImei(orderId: number, imei: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L464)

Set IMEI code for an order

Sets the IMEI (International Mobile Equipment Identity) for the order.
IMEI must be exactly 15 characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set IMEI for |
| `imei` | `string` | IMEI code (exactly 15 characters) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Deprecated

Use [setImeiBulk](#setimeibulk) instead. This endpoint will be removed on April 13, 2026.

#### Throws

When orderId or imei is invalid

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
await sdk.ordersDBS.setImei(123456, '123456789012345');
console.log('IMEI set successfully');
```

***

### ~~setGtin()~~

```ts
setGtin(orderId: number, gtin: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L501)

Set GTIN code for an order

Sets the GTIN (Global Trade Item Number) for the order.
GTIN must be exactly 13 characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set GTIN for |
| `gtin` | `string` | GTIN code (exactly 13 characters) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Deprecated

Use [setGtinBulk](#setgtinbulk) instead. This endpoint will be removed on April 13, 2026.

#### Throws

When orderId or gtin is invalid

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
await sdk.ordersDBS.setGtin(123456, '1234567890123');
console.log('GTIN set successfully');
```

***

### ~~setCustomsDeclaration()~~

```ts
setCustomsDeclaration(orderId: number, customsDeclaration: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L538)

Set customs declaration for an order

Sets the customs declaration number for the order.
Must be 1-50 characters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set customs declaration for |
| `customsDeclaration` | `string` | Customs declaration number (1-50 characters) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Deprecated

Use [setCustomsDeclarationBulk](#setcustomsdeclarationbulk) instead. This endpoint will be removed on April 13, 2026.

#### Throws

When orderId or customsDeclaration is invalid

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
await sdk.ordersDBS.setCustomsDeclaration(123456, 'CD-123456789');
console.log('Customs declaration set successfully');
```

***

### getGroupsInfo()

```ts
getGroupsInfo(request: OrderGroupsRequest): Promise<OrderGroupsResponse>;
```

Defined in: [modules/orders-dbs/index.ts:569](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L569)

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

Defined in: [modules/orders-dbs/index.ts:588](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L588)

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

Defined in: [modules/orders-dbs/index.ts:614](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L614)

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

Defined in: [modules/orders-dbs/index.ts:636](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L636)

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

Defined in: [modules/orders-dbs/index.ts:660](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L660)

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

Defined in: [modules/orders-dbs/index.ts:684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L684)

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

Defined in: [modules/orders-dbs/index.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L708)

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

Defined in: [modules/orders-dbs/index.ts:732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L732)

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

Defined in: [modules/orders-dbs/index.ts:756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L756)

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

Defined in: [modules/orders-dbs/index.ts:768](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L768)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderIds` | `number`[] |

#### Returns

`Promise`\<[`GetStatusInfoResponse`](../-internal-/interfaces/GetStatusInfoResponse.md)\>

***

### confirmBulk()

```ts
confirmBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:782](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L782)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderIds` | `number`[] |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

***

### deliverBulk()

```ts
deliverBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:796](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L796)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderIds` | `number`[] |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

***

### receiveBulk()

```ts
receiveBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:810](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L810)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orders` | [`OrderCodeRequest`](../-internal-/interfaces/OrderCodeRequest.md)[] |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

***

### rejectBulk()

```ts
rejectBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:832](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L832)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orders` | [`OrderCodeRequest`](../-internal-/interfaces/OrderCodeRequest.md)[] |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

***

### cancelBulk()

```ts
cancelBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-dbs/index.ts:854](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L854)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderIds` | `number`[] |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

***

### ~~getStatuses()~~

```ts
getStatuses(orderIds: number[]): Promise<GetStatusResponseLegacy>;
```

Defined in: [modules/orders-dbs/index.ts:874](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L874)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderIds` | `number`[] |

#### Returns

`Promise`\<[`GetStatusResponseLegacy`](../-internal-/interfaces/GetStatusResponseLegacy.md)\>

#### Deprecated

Use getStatusesBulk instead

***

### ~~confirm()~~

```ts
confirm(orderId: number): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:887](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L887)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `number` |

#### Returns

`Promise`\<`void`\>

#### Deprecated

Use confirmBulk instead

***

### ~~deliver()~~

```ts
deliver(orderId: number): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:897](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L897)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `number` |

#### Returns

`Promise`\<`void`\>

#### Deprecated

Use deliverBulk instead

***

### ~~receive()~~

```ts
receive(orderId: number, code: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:907](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L907)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `number` |
| `code` | `string` |

#### Returns

`Promise`\<`void`\>

#### Deprecated

Use receiveBulk instead

***

### ~~reject()~~

```ts
reject(orderId: number, code: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:922](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L922)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `number` |
| `code` | `string` |

#### Returns

`Promise`\<`void`\>

#### Deprecated

Use rejectBulk instead

***

### ~~cancel()~~

```ts
cancel(orderId: number): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:937](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-dbs/index.ts#L937)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `number` |

#### Returns

`Promise`\<`void`\>

#### Deprecated

Use cancelBulk instead

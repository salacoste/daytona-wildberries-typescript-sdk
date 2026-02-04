[Wildberries API TypeScript SDK](../modules.md) / OrdersDbsModule

# Class: OrdersDbsModule

Defined in: [modules/orders-dbs/index.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L67)

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

Defined in: [modules/orders-dbs/index.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L68)

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

Defined in: [modules/orders-dbs/index.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L101)

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

Defined in: [modules/orders-dbs/index.ts:148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L148)

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

Defined in: [modules/orders-dbs/index.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L209)

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

Defined in: [modules/orders-dbs/index.ts:259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L259)

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

### getMeta()

```ts
getMeta(orderId: number): Promise<GetOrderMetaResponse>;
```

Defined in: [modules/orders-dbs/index.ts:302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L302)

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

### deleteMeta()

```ts
deleteMeta(orderId: number, key: DBSMetadataKey): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L332)

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

### setSgtin()

```ts
setSgtin(orderId: number, sgtins: string[]): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L367)

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

### setUin()

```ts
setUin(orderId: number, uin: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L409)

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

### setImei()

```ts
setImei(orderId: number, imei: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L445)

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

### setGtin()

```ts
setGtin(orderId: number, gtin: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:481](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L481)

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

### setCustomsDeclaration()

```ts
setCustomsDeclaration(orderId: number, customsDeclaration: string): Promise<void>;
```

Defined in: [modules/orders-dbs/index.ts:517](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L517)

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

### getStatusesBulk()

```ts
getStatusesBulk(orderIds: number[]): Promise<GetStatusInfoResponse>;
```

Defined in: [modules/orders-dbs/index.ts:537](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L537)

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

Defined in: [modules/orders-dbs/index.ts:551](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L551)

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

Defined in: [modules/orders-dbs/index.ts:565](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L565)

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

Defined in: [modules/orders-dbs/index.ts:579](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L579)

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

Defined in: [modules/orders-dbs/index.ts:601](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L601)

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

Defined in: [modules/orders-dbs/index.ts:623](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L623)

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

Defined in: [modules/orders-dbs/index.ts:643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L643)

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

Defined in: [modules/orders-dbs/index.ts:656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L656)

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

Defined in: [modules/orders-dbs/index.ts:666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L666)

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

Defined in: [modules/orders-dbs/index.ts:676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L676)

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

Defined in: [modules/orders-dbs/index.ts:691](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L691)

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

Defined in: [modules/orders-dbs/index.ts:706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/orders-dbs/index.ts#L706)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `number` |

#### Returns

`Promise`\<`void`\>

#### Deprecated

Use cancelBulk instead

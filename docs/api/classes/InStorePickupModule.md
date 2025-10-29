[Wildberries API TypeScript SDK](../modules.md) / InStorePickupModule

# Class: InStorePickupModule

Defined in: [modules/in-store-pickup/index.ts:87](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L87)

In-Store Pickup (Click & Collect) module

Provides comprehensive methods for managing in-store pickup operations:
- **Order Assembly Management**: Process orders through lifecycle (new → confirm → prepare → receive/reject)
- **Order Queries**: List orders with filtering and get order statuses
- **Customer Interaction**: Search customer orders and verify customer identity at pickup
- **Metadata Management**: Manage product identification codes (SGTIN, UIN, IMEI, GTIN)

**Order Lifecycle States**:
- `new` → `confirm` (via confirmOrder) - Start assembly
- `confirm` → `prepare` (via prepareOrder) - Mark ready for pickup
- `prepare` → `receive` (via receiveOrder) - Complete handover to customer
- `prepare` → `reject` (via rejectOrder) - Customer rejected/didn't pick up
- Any → `cancel` (via cancelOrder) - Seller cancellation

**Rate Limit Note**: 409 responses count as 5 requests toward rate limits!

## Examples

```typescript
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// 1. Get new pickup orders
const newOrders = await sdk.inStorePickup.getNewOrders();
const order = newOrders.orders[0];

// 2. Confirm order and start assembly
await sdk.inStorePickup.confirmOrder(order.id);

// 3. Complete assembly
await sdk.inStorePickup.prepareOrder(order.id);

// 4. Customer arrives - verify identity
const verification = await sdk.inStorePickup.verifyCustomerIdentity({
  orderCode: order.orderCode,
  passcode: '1234' // From customer's app
});

// 5. Complete handover
await sdk.inStorePickup.receiveOrder(order.id);
```

```typescript
// Set SGTIN code (Честный знак marking)
await sdk.inStorePickup.setSGTINCode(orderId, ['1234567890123456']);

// Set IMEI for electronics
await sdk.inStorePickup.setIMEICode(orderId, '123456789012345');

// Get all metadata
const metadata = await sdk.inStorePickup.getOrderMetadata(orderId);
```

## Constructors

### Constructor

```ts
new InStorePickupModule(client: BaseClient): InStorePickupModule;
```

Defined in: [modules/in-store-pickup/index.ts:88](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L88)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`InStorePickupModule`

## Methods

### getNewOrders()

```ts
getNewOrders(): Promise<PickupNewOrdersResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L122)

Get all new pickup orders awaiting processing

Returns all new assembly tasks for click & collect orders that need to be
processed. Orders should be confirmed and assembled by the seller before
customer pickup.

**Rate limit**: 300 requests per minute, 200ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Returns

`Promise`\<[`PickupNewOrdersResponse`](../interfaces/PickupNewOrdersResponse.md)\>

Promise resolving to array of new pickup orders

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1new/get](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1new/get)

#### Example

```typescript
const response = await sdk.inStorePickup.getNewOrders();
console.log(`Found ${response.orders.length} new pickup orders`);

response.orders.forEach(order => {
  console.log(`Order ${order.id}: ${order.article}`);
  console.log(`Customer code: ${order.orderCode}`);
  console.log(`Required metadata: ${order.requiredMeta?.join(', ') || 'None'}`);
});
```

***

### confirmOrder()

```ts
confirmOrder(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L159)

Confirm order and start assembly process

Transitions order from `new` to `confirm` status, indicating that assembly
has started. This is required before the order can be prepared.

**Rate limit**: 100 requests per minute, 600ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task to confirm |

#### Returns

`Promise`\<`void`\>

Promise resolving when confirmation succeeds (204 No Content)

#### Throws

On invalid order ID (400)

#### Throws

When order doesn't exist (404)

#### Throws

When order state transition is invalid (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1confirm/patch](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1confirm/patch)

#### Example

```typescript
try {
  await sdk.inStorePickup.confirmOrder(12345);
  console.log('Order confirmed, assembly started');
} catch (error) {
  if (error.name === 'InvalidOrderStateError') {
    console.error('Order is not in correct state for confirmation');
  }
}
```

***

### prepareOrder()

```ts
prepareOrder(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L197)

Mark order as prepared and ready for customer pickup

Transitions order from `confirm` to `prepare` status. Order is now assembled
and waiting for customer to arrive for pickup.

**Rate limit**: 100 requests per minute, 600ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task to mark as prepared |

#### Returns

`Promise`\<`void`\>

Promise resolving when preparation succeeds (204 No Content)

#### Throws

On invalid order ID (400)

#### Throws

When order doesn't exist (404)

#### Throws

When order state transition is invalid (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1prepare/patch](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1prepare/patch)

#### Example

```typescript
try {
  await sdk.inStorePickup.prepareOrder(12345);
  console.log('Order prepared and ready for customer pickup');
} catch (error) {
  if (error.name === 'InvalidOrderStateError') {
    console.error('Order must be confirmed before preparation');
  }
}
```

***

### receiveOrder()

```ts
receiveOrder(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L230)

Complete order handover to customer

Transitions order from `prepare` to `receive` status. This is the terminal
state indicating successful order completion.

**Rate limit**: 100 requests per minute, 600ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task to mark as received |

#### Returns

`Promise`\<`void`\>

Promise resolving when handover succeeds (204 No Content)

#### Throws

On invalid order ID (400)

#### Throws

When order doesn't exist (404)

#### Throws

When order state transition is invalid (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1receive/patch](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1receive/patch)

#### Example

```typescript
// After customer identity verification succeeds
await sdk.inStorePickup.receiveOrder(12345);
console.log('Order successfully handed over to customer');
```

***

### rejectOrder()

```ts
rejectOrder(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L263)

Mark order as rejected by customer

Transitions order from `prepare` to `reject` status when customer refuses
to pick up the order. This is a terminal state.

**Rate limit**: 100 requests per minute, 600ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task to mark as rejected |

#### Returns

`Promise`\<`void`\>

Promise resolving when rejection succeeds (204 No Content)

#### Throws

On invalid order ID (400)

#### Throws

When order doesn't exist (404)

#### Throws

When order state transition is invalid (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1reject/patch](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1reject/patch)

#### Example

```typescript
// Customer doesn't show up or refuses order
await sdk.inStorePickup.rejectOrder(12345);
console.log('Order marked as rejected by customer');
```

***

### cancelOrder()

```ts
cancelOrder(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L296)

Cancel order (seller cancellation)

Transitions order to `cancel` status. Can be done from any state. This is
a terminal state.

**Rate limit**: 100 requests per minute, 600ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task to cancel |

#### Returns

`Promise`\<`void`\>

Promise resolving when cancellation succeeds (204 No Content)

#### Throws

On invalid order ID (400)

#### Throws

When order doesn't exist (404)

#### Throws

When order state transition is invalid (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1cancel/patch](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1cancel/patch)

#### Example

```typescript
// Seller cancels order due to stock issues
await sdk.inStorePickup.cancelOrder(12345);
console.log('Order cancelled by seller');
```

***

### getOrders()

```ts
getOrders(params: PickupGetOrdersParams): Promise<PickupOrdersResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L351)

Get completed orders with pagination

Returns completed pickup orders (after sale or cancellation) for a specified
time period. Maximum 30 calendar days per request.

**Rate limit**: 300 requests per minute, 200ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`PickupGetOrdersParams`](../interfaces/PickupGetOrdersParams.md) | Query parameters for filtering |

#### Returns

`Promise`\<[`PickupOrdersResponse`](../interfaces/PickupOrdersResponse.md)\>

Promise resolving to paginated orders response

#### Throws

On invalid parameters (400)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders/get](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders/get)

#### Example

```typescript
const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
const now = Math.floor(Date.now() / 1000);

let allOrders: Order[] = [];
let next = 0;

do {
  const response = await sdk.inStorePickup.getOrders({
    limit: 1000,
    next,
    dateFrom: sevenDaysAgo,
    dateTo: now
  });

  allOrders = allOrders.concat(response.orders);
  next = response.next;
} while (next !== 0);

console.log(`Found ${allOrders.length} completed orders`);
```

***

### getOrderStatuses()

```ts
getOrderStatuses(orderIds: number[]): Promise<PickupOrderStatusesResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L399)

Get current statuses for multiple orders

Returns both supplier status (seller-controlled) and WB status (system-controlled)
for specified order IDs.

**Supplier Statuses**: new, confirm, prepare, receive, reject, cancel, cancel_shelf_life
**WB Statuses**: waiting, sold, canceled, canceled_by_client, declined_by_client, defect, ready_for_pickup

**Rate limit**: 300 requests per minute, 200ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to check |

#### Returns

`Promise`\<[`PickupOrderStatusesResponse`](../interfaces/PickupOrderStatusesResponse.md)\>

Promise resolving to order statuses

#### Throws

On invalid request body (400)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1status/post](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1status/post)

#### Example

```typescript
const orderIds = [12345, 12346, 12347];
const statuses = await sdk.inStorePickup.getOrderStatuses(orderIds);

statuses.orders.forEach(status => {
  console.log(`Order ${status.id}:`);
  console.log(`  Supplier: ${status.supplierStatus}`);
  console.log(`  WB System: ${status.wbStatus}`);
});
```

***

### getCustomerInfo()

```ts
getCustomerInfo(orderIds: number[]): Promise<PickupOrderClientInfoResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L441)

Get customer information for orders

Returns customer contact information for specified orders. Only available
for orders in `confirm` (on assembly) or `prepare` (ready for pickup) status.

**Note**: Phone number is NOT direct customer number - requires extension code

**Rate limit**: 300 requests per minute, 200ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to get customer info for |

#### Returns

`Promise`\<[`PickupOrderClientInfoResponse`](../interfaces/PickupOrderClientInfoResponse.md)\>

Promise resolving to customer information

#### Throws

On invalid request body (400)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1client/post](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1client/post)

#### Example

```typescript
const customerInfo = await sdk.inStorePickup.getCustomerInfo([12345]);

customerInfo.orders.forEach(info => {
  console.log(`Order ${info.orderID}: ${info.firstName}`);
  console.log(`Contact: ${info.phone}, extension ${info.phoneCode}`);
});
```

***

### verifyCustomerIdentity()

```ts
verifyCustomerIdentity(request: CheckIdentityRequest): Promise<CheckedIdentity>;
```

Defined in: [modules/in-store-pickup/index.ts:490](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L490)

Verify customer identity at pickup

Verifies that the order belongs to the customer by validating their passcode.
Only available when at least one assembly task from the order is in `prepare` status.

**Rate limit**: 30 requests per minute, 2s interval, 20 burst (MOST RESTRICTIVE!)
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`CheckIdentityRequest`](../interfaces/CheckIdentityRequest.md) | Identity verification request |

#### Returns

`Promise`\<[`CheckedIdentity`](../interfaces/CheckedIdentity.md)\>

Promise resolving to verification result (always { ok: true } on success)

#### Throws

On invalid request body (400)

#### Throws

When order doesn't exist (404)

#### Throws

When passcode is incorrect (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1client~1identity/post](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1client~1identity/post)

#### Example

```typescript
try {
  const result = await sdk.inStorePickup.verifyCustomerIdentity({
    orderCode: '21117866-0006',
    passcode: '1234'
  });

  if (result.ok) {
    console.log('Customer verified! Proceed with handover');
    // Now call receiveOrder()
  }
} catch (error) {
  if (error.name === 'CustomerVerificationError') {
    console.error('Invalid passcode - ask customer to check their app');
  }
}
```

***

### getOrderMetadata()

```ts
getOrderMetadata(orderId: number): Promise<OrderMetadata>;
```

Defined in: [modules/in-store-pickup/index.ts:531](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L531)

Get product metadata for order

Returns identification codes (SGTIN, UIN, IMEI, GTIN) associated with the order.
Available metadata types are listed in the `requiredMeta` field of new orders.

**Rate limit**: 300 requests per minute, 200ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the order to get metadata for |

#### Returns

`Promise`\<[`OrderMetadata`](../interfaces/OrderMetadata.md)\>

Promise resolving to order metadata

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1\{orderId](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId)~1meta/get}

#### Example

```typescript
const metadata = await sdk.inStorePickup.getOrderMetadata(12345);

console.log('Order metadata:');
if (metadata.meta.sgtin?.value) {
  console.log(`SGTIN: ${metadata.meta.sgtin.value.join(', ')}`);
}
if (metadata.meta.imei?.value) {
  console.log(`IMEI: ${metadata.meta.imei.value}`);
}
```

***

### deleteOrderMetadata()

```ts
deleteOrderMetadata(orderId: number, key: "imei" | "uin" | "gtin" | "sgtin"): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:562](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L562)

Delete metadata for order

Removes metadata value for specified key. Valid keys: imei, uin, gtin, sgtin.
Only one key can be deleted per request.

**Rate limit**: 300 requests per minute, 200ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the order to delete metadata from |
| `key` | `"imei"` \| `"uin"` \| `"gtin"` \| `"sgtin"` | Metadata key to delete (imei, uin, gtin, sgtin) |

#### Returns

`Promise`\<`void`\>

Promise resolving when deletion succeeds (204 No Content)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1\{orderId](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId)~1meta/delete}

#### Example

```typescript
// Remove IMEI code
await sdk.inStorePickup.deleteOrderMetadata(12345, 'imei');
console.log('IMEI metadata deleted');
```

***

### setSGTINCode()

```ts
setSGTINCode(orderId: number, sgtins: string[]): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:602](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L602)

Set SGTIN codes (Честный знак marking)

Assigns SGTIN codes for Честный знак product marking system. Only available
when order is in `confirm` status and `sgtin` is in order's `requiredMeta`.

**Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the order to set SGTIN for |
| `sgtins` | `string`[] | Array of SGTIN codes (16-135 characters each) |

#### Returns

`Promise`\<`void`\>

Promise resolving when codes are set (204 No Content)

#### Throws

On invalid codes (400)

#### Throws

When order doesn't exist (404)

#### Throws

When metadata cannot be updated (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1\{orderId](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId)~1meta~1sgtin/put}

#### Example

```typescript
// Scan SGTIN codes from product marking
await sdk.inStorePickup.setSGTINCode(12345, [
  '01047264500236891521AbCdEf1234567890',
  '01047264500236892521GhIjKl0987654321'
]);
console.log('SGTIN codes assigned');
```

***

### setUINCode()

```ts
setUINCode(orderId: number, uin: string): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:637](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L637)

Set UIN code (Unique Identification Number)

Assigns UIN for the order. Only available when order is in `confirm` status
and `uin` is in order's `requiredMeta`.

**Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the order to set UIN for |
| `uin` | `string` | UIN code |

#### Returns

`Promise`\<`void`\>

Promise resolving when code is set (204 No Content)

#### Throws

On invalid code (400)

#### Throws

When order doesn't exist (404)

#### Throws

When metadata cannot be updated (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1\{orderId](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId)~1meta~1uin/put}

#### Example

```typescript
await sdk.inStorePickup.setUINCode(12345, '1234567890123456');
console.log('UIN code assigned');
```

***

### setIMEICode()

```ts
setIMEICode(orderId: number, imei: string): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L673)

Set IMEI code (for electronics)

Assigns IMEI code for electronic devices. Only available when order is in
`confirm` status and `imei` is in order's `requiredMeta`.

**Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the order to set IMEI for |
| `imei` | `string` | IMEI code (15 digits) |

#### Returns

`Promise`\<`void`\>

Promise resolving when code is set (204 No Content)

#### Throws

On invalid code (400)

#### Throws

When order doesn't exist (404)

#### Throws

When metadata cannot be updated (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1\{orderId](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId)~1meta~1imei/put}

#### Example

```typescript
// Scan IMEI from device
await sdk.inStorePickup.setIMEICode(12345, '123456789012345');
console.log('IMEI code assigned');
```

***

### setGTINCode()

```ts
setGTINCode(orderId: number, gtin: string): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/in-store-pickup/index.ts#L708)

Set GTIN code (Belarus product ID)

Assigns GTIN code (unique product ID in Belarus). Only available when order
is in `confirm` status and `gtin` is in order's `requiredMeta`.

**Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
**Note**: 409 responses count as 5 requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the order to set GTIN for |
| `gtin` | `string` | GTIN code |

#### Returns

`Promise`\<`void`\>

Promise resolving when code is set (204 No Content)

#### Throws

On invalid code (400)

#### Throws

When order doesn't exist (404)

#### Throws

When metadata cannot be updated (409)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1\{orderId](https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId)~1meta~1gtin/put}

#### Example

```typescript
await sdk.inStorePickup.setGTINCode(12345, '1234567890123456');
console.log('GTIN code assigned');
```

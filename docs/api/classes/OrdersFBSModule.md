[Wildberries API TypeScript SDK](../modules.md) / OrdersFBSModule

# Class: OrdersFBSModule

Defined in: [modules/orders-fbs/index.ts:60](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L60)

Orders FBS (Fulfillment by Seller) module

Provides methods for managing FBS orders including:
- Retrieving new orders awaiting processing
- Filtering orders by date range with pagination
- Checking order statuses (both supplier and WB system status)

## Example

```typescript
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Get new orders
const newOrders = await sdk.ordersFBS.getNewOrders();

// Get orders from last 7 days
const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
const orders = await sdk.ordersFBS.getOrders({
  dateFrom: sevenDaysAgo,
  limit: 100
});

// Check order statuses
const orderIds = orders.orders.map(o => o.id);
const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);
```

## Constructors

### Constructor

```ts
new OrdersFBSModule(client: BaseClient): OrdersFBSModule;
```

Defined in: [modules/orders-fbs/index.ts:61](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L61)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`OrdersFBSModule`

## Methods

### getNewOrders()

```ts
getNewOrders(): Promise<OrderNew[]>;
```

Defined in: [modules/orders-fbs/index.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L86)

Get all new FBS orders awaiting processing

Returns all new assembly tasks (сборочные задания) available at request time.
New orders need to be confirmed and added to supply for processing.

Rate limit: 300 requests per minute, 200ms interval, 20 burst

#### Returns

`Promise`\<[`OrderNew`](../interfaces/OrderNew.md)[]\>

Promise resolving to array of new orders

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
const newOrders = await sdk.ordersFBS.getNewOrders();
console.log(`Found ${newOrders.length} new orders`);

newOrders.forEach(order => {
  console.log(`Order ${order.id}: ${order.article}`);
  console.log(`Customer comment: ${order.comment || 'None'}`);
});
```

***

### getOrders()

```ts
getOrders(filters?: OrderFilters): Promise<GetOrdersResponse>;
```

Defined in: [modules/orders-fbs/index.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L141)

Get FBS orders with filters and pagination

IMPORTANT: Returns orders WITHOUT current status. Use getOrderStatuses()
separately to get order status information.

Maximum date range: 30 calendar days per request.
Default date range: Last 30 days if not specified.

Pagination pattern:
- First request: next = 0
- Subsequent requests: Use next value from previous response
- Continue until next is 0 or null

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`OrderFilters`](../interfaces/OrderFilters.md) | Optional filters (dateFrom/dateTo as Unix timestamps, limit 1-1000, next for pagination) |

#### Returns

`Promise`\<[`GetOrdersResponse`](../interfaces/GetOrdersResponse.md)\>

Promise resolving to orders array and next pagination cursor

#### Throws

When date range exceeds 30 days

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
// Get orders from last 7 days with pagination
const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
const now = Math.floor(Date.now() / 1000);

let allOrders = [];
let nextCursor = 0;

do {
  const response = await sdk.ordersFBS.getOrders({
    dateFrom: sevenDaysAgo,
    dateTo: now,
    limit: 100,
    next: nextCursor
  });

  allOrders = allOrders.concat(response.orders);
  nextCursor = response.next;
} while (nextCursor > 0);

console.log(`Retrieved ${allOrders.length} orders`);
```

***

### getOrderStatuses()

```ts
getOrderStatuses(orderIds: number[]): Promise<OrderStatus[]>;
```

Defined in: [modules/orders-fbs/index.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L209)

Get current statuses for FBS orders

Returns both supplier status (controlled by seller) and WB status (system).
Use to check order states.

Supplier Status:
- new: New assembly task
- confirm: On assembly (added to supply)
- complete: In delivery (supply delivered)
- cancel: Canceled by seller

WB Status:
- waiting: Order in progress
- sorted: Order sorted at WB
- sold: Customer received order
- canceled: Order canceled
- canceled_by_client: Customer canceled on pickup
- declined_by_client: Customer canceled (first hour, before assembly)
- defect: Canceled due to defect
- ready_for_pickup: Arrived at pickup point
- postponed_delivery: Delivery postponed

Note: Status transitions controlled by supply operations (see Story 2.6)

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs (1-1000 items) |

#### Returns

`Promise`\<[`OrderStatus`](../interfaces/OrderStatus.md)[]\>

Promise resolving to array with id, supplierStatus, wbStatus

#### Throws

When orderIds array is invalid

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
const orderIds = [12345, 67890, 11111];
const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);

statuses.forEach(status => {
  console.log(`Order ${status.id}:`);
  console.log(`  Supplier: ${status.supplierStatus}`);
  console.log(`  WB System: ${status.wbStatus}`);
});
```

***

### createSupply()

```ts
createSupply(name: string): Promise<CreateSupplyResponse>;
```

Defined in: [modules/orders-fbs/index.ts:260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L260)

Create new supply for grouping FBS orders

IMPORTANT: Empty supply has no cargo type. The first order added to the supply
sets the cargo type (cargoType: 1=МГТ, 2=СГТ, 3=КГТ+). Only orders with the
same cargo type can be added to the supply after that.

Supply workflow:
1. Create supply (empty, no cargoType)
2. Add first order → supply gets cargoType, order: new → confirm
3. Add more orders (must match cargoType) → orders: new → confirm
4. Get order stickers (orders must be in confirm status)
5. Deliver supply → orders: confirm → complete, supply closed
6. Get supply QR code (only available after delivery)

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | Supply name (1-128 characters) |

#### Returns

`Promise`\<[`CreateSupplyResponse`](../interfaces/CreateSupplyResponse.md)\>

Promise resolving to object with new supply ID (format: WB-GI-1234567)

#### Throws

When name is invalid (empty or >128 chars)

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
const supply = await sdk.ordersFBS.createSupply('Morning Batch 2024-01-15');
console.log(`Created supply: ${supply.id}`); // WB-GI-1234567
```

***

### getSupplies()

```ts
getSupplies(filters?: SupplyFilters): Promise<GetSuppliesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L309)

Get list of FBS supplies with pagination

Returns supplies with details including status (done flag), timestamps,
and pagination cursor for retrieving additional supplies.

Pagination pattern:
- First request: next = 0
- Subsequent requests: Use next value from previous response
- Continue until next is 0

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`SupplyFilters`](../interfaces/SupplyFilters.md) | Optional filters (limit 1-1000, next for pagination) |

#### Returns

`Promise`\<[`GetSuppliesResponse`](../interfaces/GetSuppliesResponse.md)\>

Promise resolving to supplies array and next pagination cursor

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
// Get all supplies with pagination
let allSupplies = [];
let nextCursor = 0;

do {
  const response = await sdk.ordersFBS.getSupplies({ limit: 100, next: nextCursor });
  allSupplies = allSupplies.concat(response.supplies);
  nextCursor = response.next;
} while (nextCursor > 0);

console.log(`Retrieved ${allSupplies.length} supplies`);
```

***

### getSupply()

```ts
getSupply(supplyId: string): Promise<Supply>;
```

Defined in: [modules/orders-fbs/index.ts:346](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L346)

Get details for specific supply

Returns supply information including status (done flag indicates if supply
is closed/delivered), timestamps (createdAt, closedAt, scanDt), and metadata.

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID (format: WB-GI-1234567) |

#### Returns

`Promise`\<[`Supply`](../interfaces/Supply.md)\>

Promise resolving to supply details

#### Throws

When supply doesn't exist

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
const supply = await sdk.ordersFBS.getSupply('WB-GI-1234567');
console.log(`Supply: ${supply.name}`);
console.log(`Status: ${supply.done ? 'Closed' : 'Open'}`);
console.log(`Created: ${supply.createdAt}`);
```

***

### addOrderToSupply()

```ts
addOrderToSupply(supplyId: string, orderId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L397)

Add order to supply (changes order status to 'confirm')

CRITICAL CONSTRAINTS:
1. Empty supply gets cargoType from first order added
2. Can only add orders with matching cargoType after first order
3. All orders must be from same warehouse
4. Order status changes: new → confirm

Cargo types:
- 1 = МГТ (small cargo)
- 2 = СГТ (oversized cargo)
- 3 = КГТ+ (large cargo)

NOTE: 409 errors count as 5 requests toward rate limit.

Rate limit: 1000 requests per minute, 60ms interval (HIGHER than other endpoints)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID |
| `orderId` | `number` | Order ID to add |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

(409) When cargo type mismatch or warehouse mismatch

#### Throws

When supply or order doesn't exist

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
const supply = await sdk.ordersFBS.createSupply('Mixed Cargo Test');

// Add first order (sets cargoType)
await sdk.ordersFBS.addOrderToSupply(supply.id, 12345); // cargoType: 1 (МГТ)

// Add second order (must match cargoType: 1)
await sdk.ordersFBS.addOrderToSupply(supply.id, 12346); // OK - same cargoType

// Try to add order with different cargoType
try {
  await sdk.ordersFBS.addOrderToSupply(supply.id, 99999); // cargoType: 2 (СГТ)
} catch (error) {
  // Error: cargo type mismatch (409 conflict)
}
```

***

### deliverSupply()

```ts
deliverSupply(supplyId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:432](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L432)

Mark supply as delivered (changes all order statuses to 'complete')

WORKFLOW: Closes supply and transitions ALL orders to "in delivery" status.
After delivery, cannot add more orders. Required before getting supply QR code.

CONSTRAINT: Supply must have ≥1 order before delivery.

NOTE: Supply auto-closes on first acceptance scan if not manually delivered.
NOTE: 409 errors count as 5 requests toward rate limit.

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

(409) When supply has zero orders or UINs not filled

#### Throws

When supply doesn't exist

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
// After adding orders and generating stickers, deliver the supply
await sdk.ordersFBS.deliverSupply('WB-GI-1234567');
console.log('Supply delivered, orders transitioned to complete status');
```

***

### deleteSupply()

```ts
deleteSupply(supplyId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L464)

Delete supply

CONSTRAINT: Can only delete supply with zero orders attached.
Remove all orders from supply before deletion.

NOTE: 409 errors count as 5 requests toward rate limit.

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID to delete |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

(409) When supply has orders

#### Throws

When supply doesn't exist

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
// Delete empty supply after removing all orders
await sdk.ordersFBS.deleteSupply('WB-GI-1234567');
console.log('Supply deleted');
```

***

### getOrderStickers()

```ts
getOrderStickers(orderIds: number[], options: StickerOptions): Promise<OrderSticker[]>;
```

Defined in: [modules/orders-fbs/index.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L518)

Get shipping label stickers for orders (base64-encoded)

CONSTRAINTS:
1. Max 100 stickers per request
2. Orders must be in "confirm" status (on assembly)
3. Returns base64-encoded file in specified format

Supported formats:
- svg: Vector graphics
- png: Raster image
- zplv: Zebra printer (vertical)
- zplh: Zebra printer (horizontal)

Valid size combinations:
- 580×400 px (width=58, height=40)
- 400×300 px (width=40, height=30)

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Order IDs (1-100 items) |
| `options` | [`StickerOptions`](../interfaces/StickerOptions.md) | Sticker format and size ({ type: 'svg'|'png'|'zplv'|'zplh', width: 58|40, height: 40|30 }) |

#### Returns

`Promise`\<[`OrderSticker`](../interfaces/OrderSticker.md)[]\>

Promise resolving to array of stickers with orderId, partA, partB, barcode, file (base64)

#### Throws

When >100 orders, invalid size, or orders not in "confirm" status

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
import { writeFileSync } from 'fs';

// Get PNG stickers for orders
const stickers = await sdk.ordersFBS.getOrderStickers(
  [12345, 67890],
  { type: 'png', width: 58, height: 40 }
);

// Save first sticker to file
const imageBuffer = Buffer.from(stickers[0].file, 'base64');
writeFileSync('order-12345-label.png', imageBuffer);
console.log(`Barcode: ${stickers[0].barcode}`);
```

***

### getSupplyBarcode()

```ts
getSupplyBarcode(supplyId: string, type: BarcodeType): Promise<SupplyBarcode>;
```

Defined in: [modules/orders-fbs/index.ts:603](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L603)

Get supply QR code (base64-encoded)

REQUIREMENT: Supply must be delivered (via deliverSupply) before QR code is available.
Size: 580×400px.

Supported formats:
- svg: Vector graphics
- png: Raster image
- zplv: Zebra printer (vertical)
- zplh: Zebra printer (horizontal)

NOTE: 409 errors count as 5 requests toward rate limit.

Rate limit: 300 requests per minute, 200ms interval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID |
| `type` | [`BarcodeType`](../type-aliases/BarcodeType.md) | Barcode format ('svg'|'png'|'zplv'|'zplh') |

#### Returns

`Promise`\<[`SupplyBarcode`](../interfaces/SupplyBarcode.md)\>

Promise resolving to QR code with barcode value and file (base64)

#### Throws

(409) When supply not delivered

#### Throws

When supply doesn't exist

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
import { writeFileSync } from 'fs';

// First deliver the supply
await sdk.ordersFBS.deliverSupply('WB-GI-1234567');

// Then get QR code
const qrCode = await sdk.ordersFBS.getSupplyBarcode('WB-GI-1234567', 'png');

// Save QR code to file
const imageBuffer = Buffer.from(qrCode.file, 'base64');
writeFileSync('supply-qrcode.png', imageBuffer);
console.log(`QR code encodes: ${qrCode.barcode}`);
```

***

### cancelOrder()

```ts
cancelOrder(orderId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/orders-fbs/index.ts#L638)

Cancel FBS order (changes status to 'cancel')

AUTO-REMOVAL: If order was in a supply, it's automatically removed from the supply.

CONSTRAINT: Cannot cancel if order already completed/delivered.

NOTE: 409 errors count as 5 requests toward rate limit.

Rate limit: 100 requests per minute, 600ms interval (LOWER than other endpoints)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to cancel |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

(409) When status transition not allowed

#### Throws

When order doesn't exist

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
// Cancel order (auto-removes from supply if present)
await sdk.ordersFBS.cancelOrder(12345);
console.log('Order canceled and removed from supply');
```

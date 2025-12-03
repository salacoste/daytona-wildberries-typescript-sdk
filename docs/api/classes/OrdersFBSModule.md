[Wildberries API TypeScript SDK](../modules.md) / OrdersFBSModule

# Class: OrdersFBSModule

Defined in: [modules/orders-fbs/index.ts:90](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L90)

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

Defined in: [modules/orders-fbs/index.ts:91](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L91)

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

Defined in: [modules/orders-fbs/index.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L116)

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

Defined in: [modules/orders-fbs/index.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L171)

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

Defined in: [modules/orders-fbs/index.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L250)

Get current statuses for FBS orders

Returns both supplier status (controlled by seller) and WB status (system).
Use to check order states.

**IMPORTANT:** This method requires an array of order IDs as parameter.
It cannot be called without parameters - you must specify which orders
you want to check status for.

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
| `orderIds` | `number`[] | Array of order IDs (1-1000 items) - **REQUIRED PARAMETER** |

#### Returns

`Promise`\<[`OrderStatus`](../interfaces/OrderStatus.md)[]\>

Promise resolving to array with id, supplierStatus, wbStatus

#### Throws

When orderIds array is invalid or missing

#### Throws

When rate limit exceeded

#### Throws

On network failures

#### Example

```typescript
// ✅ CORRECT: Pass array of order IDs
const orderIds = [12345, 67890, 11111];
const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);

statuses.forEach(status => {
  console.log(`Order ${status.id}:`);
  console.log(`  Supplier: ${status.supplierStatus}`);
  console.log(`  WB System: ${status.wbStatus}`);
});

// ❌ INCORRECT: Cannot call without parameters
// await sdk.ordersFBS.getOrderStatuses(); // Will throw ValidationError

// ❌ INCORRECT: Cannot call with empty array
// await sdk.ordersFBS.getOrderStatuses([]); // Will throw ValidationError
```

***

### createSupply()

```ts
createSupply(name: string): Promise<CreateSupplyResponse>;
```

Defined in: [modules/orders-fbs/index.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L311)

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

Defined in: [modules/orders-fbs/index.ts:360](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L360)

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

Defined in: [modules/orders-fbs/index.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L397)

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

Defined in: [modules/orders-fbs/index.ts:448](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L448)

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

Defined in: [modules/orders-fbs/index.ts:483](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L483)

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

Defined in: [modules/orders-fbs/index.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L515)

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

Defined in: [modules/orders-fbs/index.ts:569](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L569)

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

Defined in: [modules/orders-fbs/index.ts:654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L654)

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

Defined in: [modules/orders-fbs/index.ts:689](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L689)

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

***

### getPassOffices()

```ts
getPassOffices(): Promise<PassOfficesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L739)

Get warehouses requiring passes for entry

Returns list of Wildberries warehouses/offices that require seller passes
for entry. Essential for warehouse operations planning and pass management.

**Business Use Case:**
- Plan warehouse visits and deliveries
- Identify which locations require passes
- Sync warehouse list periodically (data may change)

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)
**Note:** 409 errors count as 5 requests toward rate limit

#### Returns

`Promise`\<[`PassOfficesResponse`](../type-aliases/PassOfficesResponse.md)\>

Promise with array of warehouse [PassOffice](../interfaces/PassOffice.md) objects

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get all warehouses requiring passes
const warehouses = await sdk.ordersFBS.getPassOffices();

console.log(`Found ${warehouses.length} warehouses requiring passes:`);
warehouses.forEach(warehouse => {
  console.log(`- ${warehouse.name} (ID: ${warehouse.id})`);
  console.log(`  Address: ${warehouse.address}`);
});

// Use warehouse ID for pass creation
const firstWarehouse = warehouses[0];
console.log(`Plan operations for: ${firstWarehouse.name}`);
```

#### See

[https://dev.wildberries.ru/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes~1offices/get](https://dev.wildberries.ru/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes~1offices/get)

***

### getPasses()

```ts
getPasses(): Promise<PassesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L793)

Get all created seller passes

Returns complete list of all seller passes with driver information,
vehicle details, and assigned warehouse information.

**Business Use Case:**
- Track active and expired passes
- Manage driver and vehicle assignments
- Monitor pass expiration dates
- Audit warehouse access permissions

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)
**Note:** 409 errors count as 5 requests toward rate limit

#### Returns

`Promise`\<[`PassesResponse`](../type-aliases/PassesResponse.md)\>

Promise with array of [Pass](../interfaces/Pass.md) objects containing all pass data

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get all seller passes
const passes = await sdk.ordersFBS.getPasses();

console.log(`Found ${passes.length} passes:`);
passes.forEach(pass => {
  console.log(`Pass #${pass.id}:`);
  console.log(`  Driver: ${pass.firstName} ${pass.lastName}`);
  console.log(`  Vehicle: ${pass.carModel} (${pass.carNumber})`);
  console.log(`  Warehouse: ${pass.officeName}`);
  console.log(`  Expires: ${new Date(pass.dateEnd).toLocaleDateString()}`);

  // Check for expiring passes
  const expiresIn = new Date(pass.dateEnd).getTime() - Date.now();
  const daysUntilExpiry = Math.ceil(expiresIn / (1000 * 60 * 60 * 24));
  if (daysUntilExpiry <= 7) {
    console.log(`  ⚠️  PASS EXPIRES SOON (${daysUntilExpiry} days)`);
  }
});
```

#### See

[https://dev.wildberries.ru/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get](https://dev.wildberries.ru/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get)

***

### getReshipmentOrders()

```ts
getReshipmentOrders(): Promise<ReshipmentOrder[]>;
```

Defined in: [modules/orders-fbs/index.ts:866](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L866)

Get orders requiring reshipment

Returns all orders that require reshipment due to incomplete scanning
at the pickup point. These orders need to be delivered again as part
of a new supply.

**Business Use Case:**
- Monitor orders that require additional delivery attempts
- Plan reshipment operations for incomplete orders
- Track orders that failed initial scanning process
- Manage customer service issues related to delivery problems

**Reshipment Context:**
- Occurs when supply was scanned at pickup point but some items weren't scanned
- Orders need to be delivered again within a specific timeframe
- Can be moved to a different active supply for reshipment
- Important for maintaining delivery SLAs and customer satisfaction

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)
**Note:** 409 errors count as 5 requests toward rate limit

#### Returns

`Promise`\<[`ReshipmentOrder`](../interfaces/ReshipmentOrder.md)[]\>

Promise with array of [ReshipmentOrder](../interfaces/ReshipmentOrder.md) objects containing supply and order IDs

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get all orders requiring reshipment
const reshipmentOrders = await sdk.ordersFBS.getReshipmentOrders();

console.log(`Found ${reshipmentOrders.length} orders requiring reshipment:`);
reshipmentOrders.forEach(order => {
  console.log(`Order #${order.orderID} from supply ${order.supplyID}`);
  console.log(`  Supply: ${order.supplyID}`);
  console.log(`  Order: ${order.orderID}`);

  // Plan reshipment action
  console.log(`  Action: Add to new supply for delivery`);
});

// Group orders by supply for efficient reshipment
const ordersBySupply = reshipmentOrders.reduce((acc, order) => {
  if (!acc[order.supplyID]) {
    acc[order.supplyID] = [];
  }
  acc[order.supplyID].push(order.orderID);
  return acc;
}, {});

console.log('Reshipment by supply:');
Object.entries(ordersBySupply).forEach(([supplyId, orderIds]) => {
  console.log(`Supply ${supplyId}: ${orderIds.length} orders`);
});
```

#### See

[https://dev.wildberries.ru/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1supplies~1orders~1reshipment/get](https://dev.wildberries.ru/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1supplies~1orders~1reshipment/get)

***

### getOrderMetadata()

```ts
getOrderMetadata(orderId: number): Promise<OrderMetadataResponse>;
```

Defined in: [modules/orders-fbs/index.ts:915](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L915)

Get order metadata information

Returns detailed metadata for a specific order including client information,
delivery address, and order characteristics.

**Business Use Case:**
- Access customer delivery information for order fulfillment
- Retrieve order metadata for logistics planning
- Validate order details before shipping
- Get contact information for customer service

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get metadata for |

#### Returns

`Promise`\<[`OrderMetadataResponse`](../interfaces/OrderMetadataResponse.md)\>

Promise with order metadata including client info and address

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID is invalid (400/422)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get metadata for specific order
const metadata = await sdk.ordersFBS.getOrderMetadata(12345);

console.log(`Order #${metadata.orderId}:`);
console.log(`  Customer: ${metadata.clientName}`);
console.log(`  Address: ${metadata.address.fullAddress}`);
console.log(`  Phone: ${metadata.phone}`);
console.log(`  Warehouse: ${metadata.warehouseName}`);
```

***

### getOrderSgtin()

```ts
getOrderSgtin(orderId: number): Promise<OrderSgtinResponse>;
```

Defined in: [modules/orders-fbs/index.ts:965](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L965)

Get order SGTIN information

Returns SGTIN (Serialized Global Trade Item Number) data for order items.
Used for product tracking and identification in logistics systems.

**Business Use Case:**
- Track individual items using SGTIN codes
- Validate product authenticity
- Support inventory management with serialized tracking
- Comply with traceability requirements

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get SGTIN data for |

#### Returns

`Promise`\<[`OrderSgtinResponse`](../interfaces/OrderSgtinResponse.md)\>

Promise with SGTIN information for order items

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID is invalid (400/422)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get SGTIN data for order
const sgtinData = await sdk.ordersFBS.getOrderSgtin(12345);

sgtinData.items.forEach(item => {
  console.log(`Item: ${item.article}`);
  console.log(`  SGTIN: ${item.sgtin}`);
  console.log(`  Quantity: ${item.quantity}`);
});
```

***

### getOrderUin()

```ts
getOrderUin(orderId: number): Promise<OrderUinResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1015](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1015)

Get order UIN information

Returns UIN (Unique Identification Number) data for order items.
UINs are used for tracking individual items in the logistics system.

**Business Use Case:**
- Track individual items using UIN codes
- Validate item identification for shipping
- Support inventory management
- Ensure correct item matching during fulfillment

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get UIN data for |

#### Returns

`Promise`\<[`OrderUinResponse`](../interfaces/OrderUinResponse.md)\>

Promise with UIN information for order items

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID is invalid (400/422)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get UIN data for order
const uinData = await sdk.ordersFBS.getOrderUin(12345);

uinData.items.forEach(item => {
  console.log(`Item: ${item.article}`);
  console.log(`  UIN: ${item.uin}`);
  console.log(`  Quantity: ${item.quantity}`);
});
```

***

### getOrderImei()

```ts
getOrderImei(orderId: number): Promise<OrderImeiResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1067](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1067)

Get order IMEI information

Returns IMEI (International Mobile Equipment Identity) data for electronic devices.
Used for tracking electronics and mobile devices in orders.

**Business Use Case:**
- Track electronic devices using IMEI numbers
- Validate device identification for mobile phones/electronics
- Support warranty tracking and device registration
- Ensure correct device matching during fulfillment

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get IMEI data for |

#### Returns

`Promise`\<[`OrderImeiResponse`](../interfaces/OrderImeiResponse.md)\>

Promise with IMEI information for electronic items

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID is invalid (400/422)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get IMEI data for order
const imeiData = await sdk.ordersFBS.getOrderImei(12345);

imeiData.items.forEach(item => {
  console.log(`Device: ${item.article}`);
  console.log(`  IMEI: ${item.imei}`);
  console.log(`  Quantity: ${item.quantity}`);
});
```

***

### getOrderGtin()

```ts
getOrderGtin(orderId: number): Promise<OrderGtinResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1119)

Get order GTIN information

Returns GTIN (Global Trade Item Number) data for order items.
GTINs are international product identification numbers used for retail products.

**Business Use Case:**
- Access product GTIN data for international shipping
- Validate product identification across different systems
- Support customs documentation for cross-border trade
- Ensure product compliance with international standards

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get GTIN data for |

#### Returns

`Promise`\<[`OrderGtinResponse`](../interfaces/OrderGtinResponse.md)\>

Promise with GTIN information for order items

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID is invalid (400/422)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get GTIN data for order
const gtinData = await sdk.ordersFBS.getOrderGtin(12345);

gtinData.items.forEach(item => {
  console.log(`Product: ${item.article}`);
  console.log(`  GTIN: ${item.gtin}`);
  console.log(`  Quantity: ${item.quantity}`);
});
```

***

### getOrderExpiration()

```ts
getOrderExpiration(orderId: number): Promise<OrderExpirationResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1177)

Get order expiration date information

Returns expiration date data for products with limited shelf life.
Essential for managing inventory of perishable goods.

**Business Use Case:**
- Track expiration dates for perishable products
- Ensure FIFO (First In, First Out) inventory management
- Validate product freshness before shipping
- Comply with food safety regulations

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get expiration data for |

#### Returns

`Promise`\<[`OrderExpirationResponse`](../interfaces/OrderExpirationResponse.md)\>

Promise with expiration date information for order items

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID is invalid (400/422)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get expiration data for order
const expirationData = await sdk.ordersFBS.getOrderExpiration(12345);

expirationData.items.forEach(item => {
  console.log(`Product: ${item.article}`);
  console.log(`  Expires: ${item.expirationDate}`);
  console.log(`  Quantity: ${item.quantity}`);

  // Check if product is expiring soon
  const expiresSoon = new Date(item.expirationDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  if (expiresSoon) {
    console.log(`  ⚠️ EXPIRES SOON`);
  }
});
```

***

### getOrdersByClient()

```ts
getOrdersByClient(clientData: {
  phone?: string;
  clientId?: string;
}): Promise<OrdersByClientResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1238)

Get orders by client identifier

Returns orders associated with a specific client ID or phone number.
Useful for customer service and order lookup operations.

**Business Use Case:**
- Customer service order lookup by client phone
- Track all orders for specific customer
- Resolve customer inquiries efficiently
- Support customer relationship management

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `clientData` | \{ `phone?`: `string`; `clientId?`: `string`; \} | Client identifier (phone or client ID) |
| `clientData.phone?` | `string` | - |
| `clientData.clientId?` | `string` | - |

#### Returns

`Promise`\<[`OrdersByClientResponse`](../interfaces/OrdersByClientResponse.md)\>

Promise with array of orders for the specified client

#### Throws

When API key is invalid (401/403)

#### Throws

When client data is invalid (400/422)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get orders by client phone
const ordersByPhone = await sdk.ordersFBS.getOrdersByClient({
  phone: '+79001234567'
});

// Get orders by client ID
const ordersById = await sdk.ordersFBS.getOrdersByClient({
  clientId: 'client12345'
});

console.log(`Found ${ordersByPhone.orders.length} orders for this client`);
ordersByPhone.orders.forEach(order => {
  console.log(`Order #${order.id} from ${order.createdAt}`);
});
```

***

### getOrderStatusHistory()

```ts
getOrderStatusHistory(orderId: number): Promise<OrderStatusHistoryResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1299)

Get order status history

Returns complete status change history for a specific order.
Essential for tracking order progression and troubleshooting delays.

**Business Use Case:**
- Track complete order lifecycle
- Identify delays or issues in order processing
- Support customer service with order status history
- Analyze order processing performance

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to get status history for |

#### Returns

`Promise`\<[`OrderStatusHistoryResponse`](../interfaces/OrderStatusHistoryResponse.md)\>

Promise with array of status changes with timestamps

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID is invalid (400/422)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get status history for order
const history = await sdk.ordersFBS.getOrderStatusHistory(12345);

console.log(`Status history for Order #${12345}:`);
history.statusChanges.forEach((change, index) => {
  console.log(`${index + 1}. ${change.date}: ${change.oldStatus} → ${change.newStatus}`);
  if (change.comment) {
    console.log(`   Comment: ${change.comment}`);
  }
});
```

***

### getSupplyTrbx()

```ts
getSupplyTrbx(supplyId: string): Promise<SupplyTrbxResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1354](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1354)

Get supply TRBX information

Returns TRBX (Transport Box) information for a specific supply.
TRBX data is used for logistics and warehouse management.

**Business Use Case:**
- Access transport box information for supply logistics
- Track shipment container details
- Support warehouse receiving operations
- Validate supply packaging information

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID to get TRBX data for |

#### Returns

`Promise`\<[`SupplyTrbxResponse`](../interfaces/SupplyTrbxResponse.md)\>

Promise with TRBX information for the supply

#### Throws

When API key is invalid (401/403)

#### Throws

When supply ID is invalid (400/422)

#### Throws

When supply doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get TRBX data for supply
const trbxData = await sdk.ordersFBS.getSupplyTrbx('WB-GI-1234567');

console.log(`Supply #${trbxData.supplyId}:`);
trbxData.boxes.forEach(box => {
  console.log(`Box: ${box.trbxId}`);
  console.log(`  Weight: ${box.weight}kg`);
  console.log(`  Dimensions: ${box.length}x${box.width}x${box.height}cm`);
  console.log(`  Order count: ${box.orderCount}`);
});
```

***

### getSupplyTrbxStickers()

```ts
getSupplyTrbxStickers(supplyId: string): Promise<SupplyTrbxStickersResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1409)

Get supply TRBX stickers

Returns TRBX (Transport Box) stickers for a specific supply.
These stickers are used for labeling transport boxes in the supply.

**Business Use Case:**
- Generate transport box labels for shipping
- Support warehouse operations with box identification
- Track individual boxes within a supply
- Comply with shipping and handling requirements

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID to get TRBX stickers for |

#### Returns

`Promise`\<[`SupplyTrbxStickersResponse`](../interfaces/SupplyTrbxStickersResponse.md)\>

Promise with TRBX sticker data (base64 encoded)

#### Throws

When API key is invalid (401/403)

#### Throws

When supply ID is invalid (400/422)

#### Throws

When supply doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
import { writeFileSync } from 'fs';

// Get TRBX stickers for supply
const stickers = await sdk.ordersFBS.getSupplyTrbxStickers('WB-GI-1234567');

// Save stickers to files
stickers.stickers.forEach((sticker, index) => {
  const imageBuffer = Buffer.from(sticker.file, 'base64');
  writeFileSync(`trbx-sticker-${index + 1}.png`, imageBuffer);
  console.log(`Saved TRBX sticker for box: ${sticker.trbxId}`);
});
```

***

### createPass()

```ts
createPass(passData: CreatePassRequest): Promise<CreatePassResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1470](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1470)

Create seller pass for warehouse access

Creates a new seller pass for accessing Wildberries warehouses.
Required for sellers who need physical access to warehouse facilities.

**Business Use Case:**
- Create passes for warehouse access
- Manage driver and vehicle information
- Support warehouse operations and logistics
- Ensure authorized personnel have proper access

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passData` | [`CreatePassRequest`](../interfaces/CreatePassRequest.md) | Pass information including driver details and vehicle info |

#### Returns

`Promise`\<[`CreatePassResponse`](../interfaces/CreatePassResponse.md)\>

Promise with created pass information

#### Throws

When API key is invalid (401/403)

#### Throws

When pass data is invalid (400/422)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Create new seller pass
const pass = await sdk.ordersFBS.createPass({
  officeId: '12345',
  carBrand: 'Toyota',
  carModel: 'Camry',
  carNumber: 'А123БС777',
  firstName: 'Иван',
  lastName: 'Иванов',
  middleName: 'Иванович',
  phone: '+79001234567',
  passportSeries: '1234',
  passportNumber: '567890',
  dateStart: '2024-01-01',
  dateEnd: '2024-12-31'
});

console.log(`Pass created: ${pass.id}`);
console.log(`Valid from ${pass.dateStart} to ${pass.dateEnd}`);
```

***

### deletePass()

```ts
deletePass(passId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1525)

Delete seller pass

Deletes an existing seller pass. Used when access is no longer needed
or when updating pass information.

**Business Use Case:**
- Remove expired or unnecessary passes
- Clean up pass records
- Revoke access for specific personnel
- Maintain pass database accuracy

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passId` | `string` | Pass ID to delete |

#### Returns

`Promise`\<`void`\>

Promise resolving to success confirmation

#### Throws

When API key is invalid (401/403)

#### Throws

When pass ID is invalid (400/422)

#### Throws

When pass doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Delete existing pass
await sdk.ordersFBS.deletePass('pass12345');
console.log('Pass deleted successfully');
```

***

### getSupplyOrders()

```ts
getSupplyOrders(supplyId: string): Promise<SupplyOrdersResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1576](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1576)

Get supply order list

Returns detailed list of orders included in a specific supply.
Essential for supply management and order tracking.

**Business Use Case:**
- Track all orders within a supply
- Validate supply completeness
- Support order management within supplies
- Monitor supply composition

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID to get orders for |

#### Returns

`Promise`\<[`SupplyOrdersResponse`](../interfaces/SupplyOrdersResponse.md)\>

Promise with array of orders in the supply

#### Throws

When API key is invalid (401/403)

#### Throws

When supply ID is invalid (400/422)

#### Throws

When supply doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get orders in supply
const supplyOrders = await sdk.ordersFBS.getSupplyOrders('WB-GI-1234567');

console.log(`Supply contains ${supplyOrders.orders.length} orders:`);
supplyOrders.orders.forEach(order => {
  console.log(`Order #${order.id}: ${order.article} (${order.quantity} pcs)`);
  console.log(`  Status: ${order.status}`);
  console.log(`  Added: ${order.addedAt}`);
});
```

***

### updatePass()

```ts
updatePass(passId: string, data: UpdatePassRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1630](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1630)

Update seller pass

Updates an existing seller pass with new driver or vehicle information.
Can also update the assigned warehouse/office.

**Business Use Case:**
- Update driver information when personnel changes
- Update vehicle details when switching vehicles
- Change assigned warehouse for a pass

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passId` | `string` | Pass ID to update |
| `data` | [`UpdatePassRequest`](../interfaces/UpdatePassRequest.md) | Updated pass data |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When pass data is invalid (400)

#### Throws

When pass doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
await sdk.ordersFBS.updatePass('12345', {
  firstName: 'Иван',
  lastName: 'Петров',
  carModel: 'Toyota Camry',
  carNumber: 'А123БВ777',
  officeId: 15
});
```

***

### deleteOrderMetadata()

```ts
deleteOrderMetadata(orderId: number, key: OrderMetadataKey): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1674)

Delete order metadata

Removes a specific metadata field from an order.
Can delete: imei, uin, gtin, or sgtin.

**Business Use Case:**
- Remove incorrect tracking codes
- Clear metadata before re-entering correct values
- Fix data entry errors

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to delete metadata from |
| `key` | [`OrderMetadataKey`](../type-aliases/OrderMetadataKey.md) | Metadata key to delete (imei, uin, gtin, or sgtin) |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When order ID or key is invalid (400)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
// Delete IMEI from order
await sdk.ordersFBS.deleteOrderMetadata(12345, 'imei');

// Delete SGTIN from order
await sdk.ordersFBS.deleteOrderMetadata(12345, 'sgtin');
```

***

### setOrderSGTIN()

```ts
setOrderSGTIN(orderId: number, data: SetOrderSGTINRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1727](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1727)

Set order SGTIN (marking code)

Assigns SGTIN marking codes to an order. Used for Honest Sign tracking.
Order must be in 'confirm' status and have sgtin in metadata requirements.

**Business Use Case:**
- Assign product marking codes for traceability
- Comply with Honest Sign requirements
- Track individual items in logistics

**Rate Limit:** 1000 requests/minute (60ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set SGTIN for |
| `data` | [`SetOrderSGTINRequest`](../interfaces/SetOrderSGTINRequest.md) | SGTIN data (array of 1-24 codes, 16-135 chars each) |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When data is invalid (400)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
await sdk.ordersFBS.setOrderSGTIN(12345, {
  sgtins: ['1234567890123456', '6543210987654321']
});
```

***

### setOrderUIN()

```ts
setOrderUIN(orderId: number, data: SetOrderUINRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1776](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1776)

Set order UIN (Unique Identification Number)

Assigns a UIN to an order. Each order can have only one UIN.
Order must be in 'confirm' status.

**Business Use Case:**
- Assign unique identification numbers
- Track individual items for warranty/registration
- Support inventory management

**Rate Limit:** 1000 requests/minute (60ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set UIN for |
| `data` | [`SetOrderUINRequest`](../interfaces/SetOrderUINRequest.md) | UIN data (exactly 16 characters) |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When data is invalid (400)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
await sdk.ordersFBS.setOrderUIN(12345, {
  uin: '1234567890123456'
});
```

***

### setOrderIMEI()

```ts
setOrderIMEI(orderId: number, data: SetOrderIMEIRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1825](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1825)

Set order IMEI

Assigns an IMEI to an order for electronic devices.
Each order can have only one IMEI. Order must be in 'confirm' status.

**Business Use Case:**
- Track mobile devices and electronics
- Support warranty registration
- Comply with device tracking requirements

**Rate Limit:** 1000 requests/minute (60ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set IMEI for |
| `data` | [`SetOrderIMEIRequest`](../interfaces/SetOrderIMEIRequest.md) | IMEI data (exactly 15 characters) |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When data is invalid (400)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
await sdk.ordersFBS.setOrderIMEI(12345, {
  imei: '123456789012345'
});
```

***

### setOrderGTIN()

```ts
setOrderGTIN(orderId: number, data: SetOrderGTINRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1874](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1874)

Set order GTIN

Assigns a GTIN to an order. Used for Belarus product identification.
Each order can have only one GTIN. Order must be in 'confirm' status.

**Business Use Case:**
- Track products for Belarus market
- Comply with regional identification requirements
- Support cross-border logistics

**Rate Limit:** 1000 requests/minute (60ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set GTIN for |
| `data` | [`SetOrderGTINRequest`](../interfaces/SetOrderGTINRequest.md) | GTIN data (exactly 13 characters) |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When data is invalid (400)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
await sdk.ordersFBS.setOrderGTIN(12345, {
  gtin: '1234567890123'
});
```

***

### setOrderExpiration()

```ts
setOrderExpiration(orderId: number, data: SetOrderExpirationRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1924](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1924)

Set order expiration date

Assigns an expiration date to an order for perishable products.
Cannot be deleted once set, only updated. Order must be in 'confirm' status.

**Business Use Case:**
- Track expiration for perishable goods
- Ensure FIFO inventory management
- Comply with food safety regulations

**Rate Limit:** 1000 requests/minute (60ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | Order ID to set expiration for |
| `data` | [`SetOrderExpirationRequest`](../interfaces/SetOrderExpirationRequest.md) | Expiration data (date in dd.mm.yyyy format, min 30 days from now) |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When data is invalid (400)

#### Throws

When order doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
await sdk.ordersFBS.setOrderExpiration(12345, {
  expiration: '12.09.2030'
});
```

***

### getCrossBorderStickers()

```ts
getCrossBorderStickers(orderIds: number[]): Promise<CrossBorderStickersResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1975](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L1975)

Get cross-border stickers (PDF format)

Returns shipping label stickers for cross-border orders in PDF format.
Max 100 orders per request. Orders must be in 'confirm' status.

**Business Use Case:**
- Generate shipping labels for international orders
- Support cross-border logistics operations
- Print labels for customs documentation

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs (1-100 items) |

#### Returns

`Promise`\<[`CrossBorderStickersResponse`](../interfaces/CrossBorderStickersResponse.md)\>

Promise with array of PDF stickers (base64 encoded)

#### Throws

When API key is invalid (401/403)

#### Throws

When order IDs are invalid (400)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
const stickers = await sdk.ordersFBS.getCrossBorderStickers([12345, 67890]);

stickers.stickers.forEach(sticker => {
  const pdfBuffer = Buffer.from(sticker.file, 'base64');
  writeFileSync(`sticker-${sticker.orderId}.pdf`, pdfBuffer);
});
```

***

### ~~getExternalStickersUrls()~~

```ts
getExternalStickersUrls(orderIds: number[]): Promise<ExternalStickersUrlsResponse>;
```

Defined in: [modules/orders-fbs/index.ts:2017](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L2017)

Get external sticker URLs for cross-border orders

Returns URLs to download stickers for cross-border orders.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs (1-100 items) |

#### Returns

`Promise`\<[`ExternalStickersUrlsResponse`](../interfaces/ExternalStickersUrlsResponse.md)\>

Promise with array of sticker URLs and tracking numbers

#### Deprecated

This method will be disabled on October 23.
Use getCrossBorderStickers() instead.

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Throws

When API key is invalid (401/403)

#### Throws

When order IDs are invalid (400)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
const result = await sdk.ordersFBS.getExternalStickersUrls([12345]);

result.stickers.forEach(sticker => {
  console.log(`Order ${sticker.orderID}: ${sticker.url}`);
  console.log(`Tracking: ${sticker.parcelID}`);
});
```

***

### getOrdersStatusHistoryCrossBorder()

```ts
getOrdersStatusHistoryCrossBorder(orderIds: number[]): Promise<CrossBorderStatusHistoryResponse>;
```

Defined in: [modules/orders-fbs/index.ts:2066](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L2066)

Get cross-border order status history

Returns complete status history for cross-border orders.
Max 100 orders per request.

**Business Use Case:**
- Track cross-border order lifecycle
- Monitor customs clearance status
- Support international customer service

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs (1-100 items) |

#### Returns

`Promise`\<[`CrossBorderStatusHistoryResponse`](../interfaces/CrossBorderStatusHistoryResponse.md)\>

Promise with array of orders with status history

#### Throws

When API key is invalid (401/403)

#### Throws

When order IDs are invalid (400)

#### Throws

When orders don't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
const history = await sdk.ordersFBS.getOrdersStatusHistoryCrossBorder([12345]);

history.orders.forEach(order => {
  console.log(`Order ${order.orderID}:`);
  console.log(`Delivery date: ${order.deliveryDate}`);
  order.statuses.forEach(status => {
    console.log(`  ${status.date}: ${status.code}`);
  });
});
```

***

### getOrdersWithClientInfo()

```ts
getOrdersWithClientInfo(orderIds: number[]): Promise<CrossBorderTurkeyClientInfoResponse>;
```

Defined in: [modules/orders-fbs/index.ts:2113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L2113)

Get orders with client info (Turkey cross-border only)

Returns order information including customer details.
Only available for Turkey cross-border orders.

**Business Use Case:**
- Access customer information for Turkey deliveries
- Support Turkey cross-border logistics
- Process international shipments

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs (1-100 items) |

#### Returns

`Promise`\<[`CrossBorderTurkeyClientInfoResponse`](../interfaces/CrossBorderTurkeyClientInfoResponse.md)\>

Promise with array of orders with client info

#### Throws

When API key is invalid (401/403)

#### Throws

When order IDs are invalid (400)

#### Throws

When orders don't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
const orders = await sdk.ordersFBS.getOrdersWithClientInfo([12345]);

orders.orders.forEach(order => {
  console.log(`Order ${order.orderID}:`);
  console.log(`Client: ${order.clientName}`);
  console.log(`Phone: ${order.phone}`);
  console.log(`Address: ${order.address.fullAddress}`);
});
```

***

### addSupplyTrbx()

```ts
addSupplyTrbx(supplyId: string, amount: number): Promise<AddSupplyTrbxResponse>;
```

Defined in: [modules/orders-fbs/index.ts:2159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L2159)

Add transport boxes to supply

Adds specified number of transport boxes (TRBX) to a supply.
Only for supplies being shipped to pickup points (PVZ).
Supply must be open (not delivered).

**Business Use Case:**
- Create transport boxes for supply packaging
- Organize orders into shipping containers
- Prepare supplies for pickup point delivery

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID to add boxes to |
| `amount` | `number` | Number of boxes to add (1-1000) |

#### Returns

`Promise`\<[`AddSupplyTrbxResponse`](../interfaces/AddSupplyTrbxResponse.md)\>

Promise with array of created box IDs

#### Throws

When API key is invalid (401/403)

#### Throws

When supply ID or amount is invalid (400)

#### Throws

When supply doesn't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
const result = await sdk.ordersFBS.addSupplyTrbx('WB-GI-1234567', 4);

console.log(`Created ${result.trbxIds.length} boxes:`);
result.trbxIds.forEach(id => console.log(`  ${id}`));
// Output: WB-TRBX-1234567, WB-TRBX-1234568, ...
```

***

### deleteSupplyTrbx()

```ts
deleteSupplyTrbx(supplyId: string, trbxIds: string[]): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:2211](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L2211)

Delete transport boxes from supply

Removes specified transport boxes from a supply.
Supply must still be on assembly (not delivered).

**Business Use Case:**
- Remove excess or incorrect boxes
- Adjust supply packaging before delivery
- Clean up empty or cancelled boxes

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID to remove boxes from |
| `trbxIds` | `string`[] | Array of box IDs to delete |

#### Returns

`Promise`\<`void`\>

Promise<void> - 204 on success

#### Throws

When API key is invalid (401/403)

#### Throws

When supply ID or box IDs are invalid (400)

#### Throws

When supply or boxes don't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
await sdk.ordersFBS.deleteSupplyTrbx('WB-GI-1234567', [
  'WB-TRBX-1234567',
  'WB-TRBX-1234568'
]);
console.log('Boxes deleted successfully');
```

***

### getSupplyTrbxStickersPost()

```ts
getSupplyTrbxStickersPost(
   supplyId: string, 
   type: BarcodeType, 
trbxIds: string[]): Promise<SupplyTrbxStickersResponse>;
```

Defined in: [modules/orders-fbs/index.ts:2271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/orders-fbs/index.ts#L2271)

Get transport box stickers (POST version)

Returns QR stickers for specified transport boxes.
Sticker size: 580x400 px.

**Business Use Case:**
- Generate QR labels for specific boxes
- Print box identification stickers
- Support warehouse scanning operations

**Rate Limit:** 300 requests/minute (200ms interval, burst 20)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID containing the boxes |
| `type` | [`BarcodeType`](../type-aliases/BarcodeType.md) | Sticker format (svg, png, zplv, zplh) |
| `trbxIds` | `string`[] | Array of box IDs to get stickers for |

#### Returns

`Promise`\<[`SupplyTrbxStickersResponse`](../interfaces/SupplyTrbxStickersResponse.md)\>

Promise with array of box stickers (base64 encoded)

#### Throws

When API key is invalid (401/403)

#### Throws

When parameters are invalid (400)

#### Throws

When supply or boxes don't exist (404)

#### Throws

When rate limit exceeded (429)

#### Example

```typescript
const stickers = await sdk.ordersFBS.getSupplyTrbxStickersPost(
  'WB-GI-1234567',
  'png',
  ['WB-TRBX-1234567', 'WB-TRBX-1234568']
);

stickers.stickers.forEach(sticker => {
  const imageBuffer = Buffer.from(sticker.file, 'base64');
  writeFileSync(`box-${sticker.trbxId}.png`, imageBuffer);
});
```

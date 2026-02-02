---
title: OrdersDbsModule
description: Complete API reference for the Orders DBS (Delivery by Seller) module
layout: doc
---

# OrdersDbsModule

The Orders DBS (Delivery by Seller) module provides methods for managing orders where sellers handle both storage AND delivery directly to customers.

## Overview

DBS (Delivery by Seller) is a fulfillment model unique to Wildberries where:

- **Direct Delivery**: Seller delivers to customer's address (not pickup points)
- **Customer Contact**: Access to customer phone and full address with GPS coordinates
- **Delivery Windows**: Specific delivery date/time windows (dTimeFrom, dTimeTo)
- **Required Metadata**: Orders may require IMEI, UIN, GTIN, SGTIN, or customs declarations

**Source:** [`src/modules/orders-dbs/index.ts`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts)

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get new orders awaiting processing
const newOrders = await sdk.ordersDBS.getNewOrders();

// Get customer contact info for delivery coordination
const clientInfo = await sdk.ordersDBS.getClientInfo([123456]);
```

## Methods Summary

| Method | Description | Category |
|--------|-------------|----------|
| [`getNewOrders()`](#getneworders) | Get new DBS orders awaiting delivery | Order Retrieval |
| [`getOrders()`](#getorders) | Get completed orders with pagination | Order Retrieval |
| [`getClientInfo()`](#getclientinfo) | Get customer contact information | Order Retrieval |
| [`getB2BInfo()`](#getb2binfo) | Get B2B buyer organization info | B2B Operations |
| [`getStatusesBulk()`](#getstatusesbulk) | Get status for multiple orders | Status Management |
| [`confirmBulk()`](#confirmbulk) | Confirm multiple orders | Status Management |
| [`deliverBulk()`](#deliverbulk) | Mark orders as delivered | Status Management |
| [`receiveBulk()`](#receivebulk) | Complete handover with code | Status Management |
| [`rejectBulk()`](#rejectbulk) | Reject orders with code | Status Management |
| [`cancelBulk()`](#cancelbulk) | Cancel multiple orders | Status Management |
| [`getMeta()`](#getmeta) | Get order metadata | Metadata Operations |
| [`deleteMeta()`](#deletemeta) | Delete order metadata | Metadata Operations |
| [`setSgtin()`](#setsgtin) | Set SGTIN marking codes | Metadata Operations |
| [`setUin()`](#setuin) | Set UIN code | Metadata Operations |
| [`setImei()`](#setimei) | Set IMEI code | Metadata Operations |
| [`setGtin()`](#setgtin) | Set GTIN code | Metadata Operations |
| [`setCustomsDeclaration()`](#setcustomsdeclaration) | Set customs declaration | Metadata Operations |

---

## Order Retrieval Methods

### getNewOrders()

Get list of new DBS assembly tasks awaiting processing.

**Signature:**

```typescript
getNewOrders(): Promise<GetNewOrdersResponse>
```

**Parameters:** None

**Returns:** `Promise<GetNewOrdersResponse>` - List of new DBS orders with delivery details

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const newOrders = await sdk.ordersDBS.getNewOrders();

for (const order of newOrders.orders ?? []) {
  console.log(`Order ${order.id}: ${order.address?.fullAddress}`);
  console.log(`Delivery: ${order.ddate} ${order.dTimeFrom}-${order.dTimeTo}`);

  // Check required metadata for compliance
  if (order.requiredMeta && order.requiredMeta.length > 0) {
    console.log(`Required metadata: ${order.requiredMeta.join(', ')}`);
  }

  // GPS coordinates for route planning
  if (order.address?.longitude && order.address?.latitude) {
    console.log(`GPS: ${order.address.latitude}, ${order.address.longitude}`);
  }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `orders[].id` | `number` | Order ID |
| `orders[].address` | `DBSAddress` | Delivery address with GPS |
| `orders[].ddate` | `string` | Delivery date (YYYY-MM-DD) |
| `orders[].dTimeFrom` | `string` | Delivery window start (HH:MM) |
| `orders[].dTimeTo` | `string` | Delivery window end (HH:MM) |
| `orders[].requiredMeta` | `string[]` | Required metadata types |
| `orders[].article` | `string` | Seller article |
| `orders[].nmId` | `number` | WB article number |
| `orders[].cargoType` | `number` | 1=small, 2=oversized, 3=large |

**Source:** [`src/modules/orders-dbs/index.ts:101`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L101)

---

### getOrders()

Get completed DBS orders with pagination and date filtering.

**Signature:**

```typescript
getOrders(params: GetOrdersParams): Promise<GetOrdersResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `params.limit` | `number` | Yes | Number of orders (1-1000) |
| `params.next` | `number` | Yes | Pagination cursor (0 for first) |
| `params.dateFrom` | `number` | Yes | Start date (Unix timestamp) |
| `params.dateTo` | `number` | Yes | End date (Unix timestamp) |

**Returns:** `Promise<GetOrdersResponse>` - Orders and next pagination cursor

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Throws:**
- `ValidationError` - When limit is out of range (1-1000)
- `ValidationError` - When date range exceeds 30 days
- `ValidationError` - When dateFrom > dateTo

**Example:**

```typescript
// Get orders from last 7 days with pagination
const now = Math.floor(Date.now() / 1000);
const weekAgo = now - 7 * 24 * 60 * 60;

let next = 0;
const allOrders = [];

do {
  const result = await sdk.ordersDBS.getOrders({
    limit: 100,
    next,
    dateFrom: weekAgo,
    dateTo: now
  });

  allOrders.push(...(result.orders ?? []));
  next = result.next ?? 0;
} while (next > 0);

console.log(`Total orders: ${allOrders.length}`);
```

**Source:** [`src/modules/orders-dbs/index.ts:148`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L148)

---

### getClientInfo()

Get customer contact information for DBS orders.

**Signature:**

```typescript
getClientInfo(orderIds: number[]): Promise<GetClientInfoResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderIds` | `number[]` | Yes | Array of order IDs |

**Returns:** `Promise<GetClientInfoResponse>` - Customer contact information

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Throws:**
- `ValidationError` - When orderIds array is empty

**Example:**

```typescript
const clientInfo = await sdk.ordersDBS.getClientInfo([123456, 234567]);

for (const client of clientInfo.orders ?? []) {
  console.log(`Order ${client.orderID}:`);
  console.log(`  Name: ${client.fullName}`);
  console.log(`  Phone: +${client.phoneCode}${client.phone}`);
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `orders[].orderID` | `number` | Order ID |
| `orders[].fullName` | `string` | Customer full name |
| `orders[].firstName` | `string` | Customer first name |
| `orders[].phone` | `string` | Phone (without country code) |
| `orders[].phoneCode` | `number` | Phone country code |

**Source:** [`src/modules/orders-dbs/index.ts:209`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L209)

---

## B2B Operations

### getB2BInfo()

Get B2B buyer information for organizational orders.

**Signature:**

```typescript
getB2BInfo(orderIds: number[]): Promise<GetB2BInfoResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderIds` | `number[]` | Yes | Order IDs (1-1000 items) |

**Returns:** `Promise<GetB2BInfoResponse>` - B2B buyer information

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Throws:**
- `ValidationError` - When orderIds is empty or exceeds 1000

**Example:**

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

**Note:** Individual Entrepreneurs (IP) may have empty KPP and 12-digit INN.

**Source:** [`src/modules/orders-dbs/index.ts:259`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L259)

---

## Status Management Methods

### getStatusesBulk()

Get status information for multiple orders.

**Signature:**

```typescript
getStatusesBulk(orderIds: number[]): Promise<GetStatusInfoResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderIds` | `number[]` | Yes | Order IDs (1-1000 items) |

**Returns:** `Promise<GetStatusInfoResponse>` - Status info for each order

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const statuses = await sdk.ordersDBS.getStatusesBulk([123456, 234567]);

statuses.orders?.forEach(order => {
  console.log(`Order ${order.orderId}:`);
  console.log(`  Supplier Status: ${order.supplierStatus}`);
  console.log(`  WB Status: ${order.wbStatus}`);

  if (order.errors?.length) {
    console.error('Errors:', order.errors);
  }
});
```

**Supplier Statuses:** `new`, `confirm`, `deliver`, `receive`, `reject`, `cancel`, `canceled_by_missed_call`

**Source:** [`src/modules/orders-dbs/index.ts:537`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L537)

---

### confirmBulk()

Confirm multiple orders for processing.

**Signature:**

```typescript
confirmBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderIds` | `number[]` | Yes | Order IDs (1-1000 items) |

**Returns:** `Promise<BulkStatusChangeResponse>` - Result for each order

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const result = await sdk.ordersDBS.confirmBulk([123456, 234567]);

result.results?.forEach(orderResult => {
  if (orderResult.isError) {
    console.error(`Order ${orderResult.orderId} failed:`, orderResult.errors);
  } else {
    console.log(`Order ${orderResult.orderId} confirmed`);
  }
});
```

**Source:** [`src/modules/orders-dbs/index.ts:551`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L551)

---

### deliverBulk()

Mark multiple orders as delivered.

**Signature:**

```typescript
deliverBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderIds` | `number[]` | Yes | Order IDs (1-1000 items) |

**Returns:** `Promise<BulkStatusChangeResponse>` - Result for each order

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const result = await sdk.ordersDBS.deliverBulk([123456, 234567]);

result.results?.forEach(orderResult => {
  if (orderResult.isError) {
    console.error(`Delivery failed for ${orderResult.orderId}`);
  } else {
    console.log(`Order ${orderResult.orderId} marked as delivered`);
  }
});
```

**Source:** [`src/modules/orders-dbs/index.ts:565`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L565)

---

### receiveBulk()

Complete handover for multiple orders with verification codes.

**Signature:**

```typescript
receiveBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orders` | `OrderCodeRequest[]` | Yes | Orders with codes (1-1000) |
| `orders[].orderId` | `number` | Yes | Order ID |
| `orders[].code` | `string` | Yes | Customer verification code |

**Returns:** `Promise<BulkStatusChangeResponse>` - Result for each order

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const result = await sdk.ordersDBS.receiveBulk([
  { orderId: 123456, code: '1234' },
  { orderId: 234567, code: '5678' }
]);

result.results?.forEach(orderResult => {
  if (orderResult.isError) {
    console.error(`Handover failed: ${orderResult.errors?.[0]?.detail}`);
  }
});
```

**Note:** The verification code is displayed to the customer on the WB site/app.

**Source:** [`src/modules/orders-dbs/index.ts:579`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L579)

---

### rejectBulk()

Reject multiple orders with verification codes.

**Signature:**

```typescript
rejectBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orders` | `OrderCodeRequest[]` | Yes | Orders with codes (1-1000) |
| `orders[].orderId` | `number` | Yes | Order ID |
| `orders[].code` | `string` | Yes | Customer verification code |

**Returns:** `Promise<BulkStatusChangeResponse>` - Result for each order

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const result = await sdk.ordersDBS.rejectBulk([
  { orderId: 123456, code: '1234' }
]);
```

**Source:** [`src/modules/orders-dbs/index.ts:601`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L601)

---

### cancelBulk()

Cancel multiple orders.

**Signature:**

```typescript
cancelBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderIds` | `number[]` | Yes | Order IDs (1-1000 items) |

**Returns:** `Promise<BulkStatusChangeResponse>` - Result for each order

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const result = await sdk.ordersDBS.cancelBulk([123456]);

if (result.results?.[0]?.isError) {
  console.error('Cancellation failed');
}
```

**Source:** [`src/modules/orders-dbs/index.ts:623`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L623)

---

## Metadata Operations

### getMeta()

Get metadata for an order (IMEI, UIN, GTIN, SGTIN, customs declaration).

**Signature:**

```typescript
getMeta(orderId: number): Promise<GetOrderMetaResponse>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `number` | Yes | Order ID (must be > 0) |

**Returns:** `Promise<GetOrderMetaResponse>` - Order metadata

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
const meta = await sdk.ordersDBS.getMeta(123456);

if (meta.meta?.imei?.value) {
  console.log(`IMEI: ${meta.meta.imei.value}`);
}
if (meta.meta?.sgtin?.value) {
  console.log(`SGTIN codes: ${meta.meta.sgtin.value.join(', ')}`);
}
```

**Source:** [`src/modules/orders-dbs/index.ts:302`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L302)

---

### deleteMeta()

Delete specific metadata from an order.

**Signature:**

```typescript
deleteMeta(orderId: number, key: DBSMetadataKey): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `number` | Yes | Order ID (must be > 0) |
| `key` | `DBSMetadataKey` | Yes | Metadata key to delete |

**Valid Keys:** `imei`, `uin`, `gtin`, `sgtin`, `customsDeclaration`

**Returns:** `Promise<void>`

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
await sdk.ordersDBS.deleteMeta(123456, 'imei');
console.log('IMEI metadata deleted');
```

**Source:** [`src/modules/orders-dbs/index.ts:332`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L332)

---

### setSgtin()

Set SGTIN marking codes for an order.

**Signature:**

```typescript
setSgtin(orderId: number, sgtins: string[]): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `number` | Yes | Order ID (must be > 0) |
| `sgtins` | `string[]` | Yes | SGTIN codes (1-24 items) |

**Validation:**
- Each SGTIN must be 16-135 characters
- Maximum 24 SGTINs per order

**Returns:** `Promise<void>`

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
await sdk.ordersDBS.setSgtin(123456, [
  '01046012345678900421abc123',
  '01046012345678900421abc124'
]);
console.log('SGTIN codes set successfully');
```

**Source:** [`src/modules/orders-dbs/index.ts:367`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L367)

---

### setUin()

Set UIN (Unique Identification Number) for an order.

**Signature:**

```typescript
setUin(orderId: number, uin: string): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `number` | Yes | Order ID (must be > 0) |
| `uin` | `string` | Yes | UIN code (exactly 16 chars) |

**Returns:** `Promise<void>`

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
await sdk.ordersDBS.setUin(123456, '1234567890123456');
```

**Source:** [`src/modules/orders-dbs/index.ts:409`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L409)

---

### setImei()

Set IMEI (International Mobile Equipment Identity) for an order.

**Signature:**

```typescript
setImei(orderId: number, imei: string): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `number` | Yes | Order ID (must be > 0) |
| `imei` | `string` | Yes | IMEI code (exactly 15 chars) |

**Returns:** `Promise<void>`

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
await sdk.ordersDBS.setImei(123456, '123456789012345');
```

**Source:** [`src/modules/orders-dbs/index.ts:445`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L445)

---

### setGtin()

Set GTIN (Global Trade Item Number) for an order.

**Signature:**

```typescript
setGtin(orderId: number, gtin: string): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `number` | Yes | Order ID (must be > 0) |
| `gtin` | `string` | Yes | GTIN code (exactly 13 chars) |

**Returns:** `Promise<void>`

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
await sdk.ordersDBS.setGtin(123456, '1234567890123');
```

**Source:** [`src/modules/orders-dbs/index.ts:481`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L481)

---

### setCustomsDeclaration()

Set customs declaration number for an order.

**Signature:**

```typescript
setCustomsDeclaration(orderId: number, customsDeclaration: string): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `number` | Yes | Order ID (must be > 0) |
| `customsDeclaration` | `string` | Yes | Declaration (1-50 chars) |

**Returns:** `Promise<void>`

**Rate Limits:** 300 requests/minute, 200ms interval, 20 burst

**Example:**

```typescript
await sdk.ordersDBS.setCustomsDeclaration(123456, 'CD-123456789');
```

**Source:** [`src/modules/orders-dbs/index.ts:517`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/modules/orders-dbs/index.ts#L517)

---

## Deprecated Methods

The following methods are deprecated and will be disabled on **April 13, 2026**. Use bulk methods instead.

| Deprecated Method | Replacement |
|------------------|-------------|
| `getStatuses()` | `getStatusesBulk()` |
| `confirm()` | `confirmBulk()` |
| `deliver()` | `deliverBulk()` |
| `receive()` | `receiveBulk()` |
| `reject()` | `rejectBulk()` |
| `cancel()` | `cancelBulk()` |

See [Migration Guide](/guides/migration-dbs-legacy-to-bulk) for migration instructions.

---

## Types Reference

### GetNewOrdersResponse

```typescript
interface GetNewOrdersResponse {
  orders?: DBSOrderNew[];
}
```

### DBSOrderNew

```typescript
interface DBSOrderNew {
  id?: number;
  address?: DBSAddress;
  ddate?: string;
  dTimeFrom?: string;
  dTimeTo?: string;
  requiredMeta?: string[];
  article?: string;
  nmId?: number;
  cargoType?: number;
  // ... additional fields
}
```

### DBSAddress

```typescript
interface DBSAddress {
  fullAddress?: string;
  longitude?: number;
  latitude?: number;
}
```

### BulkStatusChangeResponse

```typescript
interface BulkStatusChangeResponse {
  requestId?: string;
  results?: StatusSetResponse[];
}
```

### StatusSetResponse

```typescript
interface StatusSetResponse {
  orderId?: number;
  isError?: boolean;
  errors?: {
    code?: number;
    detail?: string;
  }[];
}
```

### OrderCodeRequest

```typescript
interface OrderCodeRequest {
  orderId: number;
  code: string;
}
```

### DBSMetadataKey

```typescript
type DBSMetadataKey = 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration';
```

---

## See Also

- [DBS Getting Started Guide](/guides/orders-dbs-getting-started)
- [Migration Guide: Legacy to Bulk](/guides/migration-dbs-legacy-to-bulk)
- [DBS Core Workflow Example](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-core-workflow.ts)
- [DBS B2B Example](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-b2b.ts)
- [DBS Metadata Example](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-metadata.ts)
- [Official WB DBS API Documentation](https://dev.wildberries.ru/openapi/orders-dbs)

# Orders FBW Module

The **Orders FBW (Fulfillment by Wildberries)** module manages supply creation and warehouse operations for sellers who ship products to Wildberries warehouses for fulfillment. It covers acceptance options, warehouse listing, transit tariffs, supply lifecycle management, and DBW buyer information retrieval.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `OrdersFbwModule` |
| **SDK Namespace** | `sdk.ordersFBW.*` |
| **Base URL** | `https://supplies-api.wildberries.ru` (most methods) |
| **Alt Base URL** | `https://marketplace-api.wildberries.ru` (`getClientInfo` only) |
| **Source Swagger** | `wildberries_api_doc/07-orders-fbw.yaml` |
| **Methods** | 10 (8 active + 2 deprecated) |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// List available warehouses
const warehouses = await sdk.ordersFBW.warehouses();

// Check acceptance options for a barcode
const options = await sdk.ordersFBW.createAcceptanceOption(
  [{ barcode: '1234567891234', quantity: 10 }]
);

// Get transit tariffs
const tariffs = await sdk.ordersFBW.transitTariffs();

// List supplies with filters
const supplies = await sdk.ordersFBW.listSupplies({});

// Get buyer information for DBW orders
const clientInfo = await sdk.ordersFBW.getClientInfo([987654321]);
```

---

## Methods Reference

### Acceptance and Warehouse Info (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createAcceptanceOption(data)` | POST | `/api/v1/acceptance/options` | Get available warehouses and packaging types for a supply |
| `warehouses()` | GET | `/api/v1/warehouses` | List all WB warehouses |
| `transitTariffs()` | GET | `/api/v1/transit-tariffs` | Get available transit directions |

### Supply Management (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `listSupplies(data)` | POST | `/api/v1/supplies` | List supplies (last 1000 by default) |
| `getSupply(ID)` | GET | `/api/v1/supplies/{ID}` | Get supply details by ID |
| `getSuppliesGood(ID)` | GET | `/api/v1/supplies/{ID}/goods` | Get goods in a supply |
| `getSuppliesPackage(ID)` | GET | `/api/v1/supplies/{ID}/package` | Get supply packaging info |

### DBW Orders (1 method)

| Method | HTTP | Endpoint | Domain | Description |
|--------|------|----------|--------|-------------|
| `getClientInfo(orderIds)` | POST | `/api/marketplace/v3/dbw/orders/client` | `marketplace-api.wildberries.ru` | Get buyer information for DBW orders |

> **Note**: `getClientInfo()` uses the `marketplace-api.wildberries.ru` domain, not `supplies-api.wildberries.ru` like the other FBW methods.

### Deprecated Methods (2 methods)

> These methods are deprecated and will be removed in a future release. Use the replacements listed below.

| Method | Replacement | Notes |
|--------|-------------|-------|
| `getAcceptanceCoefficients(options?)` | Use tariffs module | Endpoint moved to `common-api.wildberries.ru`. Emits a console warning on first call. |
| `createSupply(data)` | `listSupplies(data)` | Renamed for clarity. Delegates to `listSupplies` internally. Will be removed in v3.0.0. |

---

## What's New (v3.4.0+)

### getClientInfo() method

Retrieves buyer information (name, phone, country codes) for DBW (Delivery by Wildberries) assembly orders. Added in **v3.4.0**.

```typescript
const result = await sdk.ordersFBW.getClientInfo([987654321, 123456789]);
for (const order of result.orders ?? []) {
  console.log(`Order ${order.orderID}: ${order.firstName}`);
  console.log(`  Full name: ${order.fullName}`);
  console.log(`  Phone: +${order.phoneCode}${order.phone}`);
  if (order.additionalPhoneCodes?.length) {
    console.log(`  Alt codes: ${order.additionalPhoneCodes.join(', ')}`);
  }
}
```

**Key details:**
- Throws `ValidationError` if `orderIds` array is empty
- Uses `marketplace-api.wildberries.ru` domain (not `supplies-api`)
- Returns `null` for `orders` when no matching orders are found

### isBoxOnPallet and boxTypeID fields

`ModelsSupply` and `ModelsSupplyDetails` now include:

| Field | Type | Description |
|-------|------|-------------|
| `boxTypeID` | `number` | Supply type ID: `0` = no boxes, `1`/`2` = boxes, `5` = monopallets, `6` = supersafe, `7` = piece pallet |
| `isBoxOnPallet` | `boolean` | Whether the supply is a "piece pallet" type |

### canBoxOnPallet in warehouse options

When calling `createAcceptanceOption()`, each warehouse in the result now includes a `canBoxOnPallet` field indicating whether the "piece pallet" packaging type is available:

```typescript
const options = await sdk.ordersFBW.createAcceptanceOption(
  [{ barcode: '1234567891234', quantity: 10 }]
);
for (const item of options.result ?? []) {
  for (const wh of item.warehouses ?? []) {
    console.log(`Warehouse ${wh.warehouseID}:`);
    console.log(`  Box: ${wh.canBox}, Monopallet: ${wh.canMonopallet}`);
    console.log(`  Supersafe: ${wh.canSupersafe}, BoxOnPallet: ${wh.canBoxOnPallet}`);
  }
}
```

---

## Usage Examples

### Full Supply Workflow

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function fbwSupplyWorkflow() {
  // 1. Check which warehouses accept your barcode
  const options = await sdk.ordersFBW.createAcceptanceOption(
    [{ barcode: '1234567891234', quantity: 100 }]
  );

  for (const item of options.result ?? []) {
    if (item.isError) {
      console.log(`Error for ${item.barcode}: ${item.error?.detail}`);
      continue;
    }
    for (const wh of item.warehouses ?? []) {
      console.log(`Warehouse ${wh.warehouseID}:`);
      console.log(`  Box: ${wh.canBox}, Monopallet: ${wh.canMonopallet}`);
      console.log(`  Supersafe: ${wh.canSupersafe}, BoxOnPallet: ${wh.canBoxOnPallet}`);
    }
  }

  // 2. List existing supplies filtered by status
  const supplies = await sdk.ordersFBW.listSupplies({
    statusIDs: [1, 2],  // Not planned + Planned
  });
  console.log(`Found ${supplies.length} supplies`);

  // 3. Get supply details
  if (supplies.length > 0) {
    const supplyID = supplies[0].supplyID!;
    const details = await sdk.ordersFBW.getSupply(supplyID);
    console.log(`Supply ${supplyID}: ${details.statusName}`);
    console.log(`  Box type: ${details.boxTypeName} (ID: ${details.boxTypeID})`);
    console.log(`  Is box-on-pallet: ${details.isBoxOnPallet}`);
    console.log(`  Acceptance cost: ${details.acceptanceCost} RUB`);

    // 4. Get goods in supply
    const goods = await sdk.ordersFBW.getSuppliesGood(supplyID);
    for (const good of goods) {
      console.log(`  ${good.vendorCode}: ${good.quantity} pcs`);
    }

    // 5. Get packaging info
    const packages = await sdk.ordersFBW.getSuppliesPackage(supplyID);
    for (const pkg of packages) {
      console.log(`  Package ${pkg.packageCode}: ${pkg.quantity} items`);
    }
  }
}
```

### Listing Warehouses and Transit Tariffs

```typescript
async function exploreWarehouses() {
  // List all WB warehouses
  const warehouses = await sdk.ordersFBW.warehouses();
  for (const wh of warehouses) {
    console.log(`${wh.name} (ID: ${wh.ID})`);
    console.log(`  Address: ${wh.address}`);
    console.log(`  Hours: ${wh.workTime}`);
    console.log(`  Accepts QR: ${wh.acceptsQR}`);
    console.log(`  Active: ${wh.isActive}, Transit: ${wh.isTransitActive}`);
  }

  // Get transit tariffs
  const tariffs = await sdk.ordersFBW.transitTariffs();
  for (const tariff of tariffs) {
    console.log(`${tariff.transitWarehouseName} -> ${tariff.destinationWarehouseName}`);
    console.log(`  Available from: ${tariff.activeFrom}`);
    console.log(`  Pallet tariff: ${tariff.palletTariff} RUB`);
  }
}
```

### Getting DBW Buyer Information

```typescript
async function getDBWBuyerInfo(orderIds: number[]) {
  try {
    const result = await sdk.ordersFBW.getClientInfo(orderIds);

    if (!result.orders) {
      console.log('No matching orders found');
      return;
    }

    for (const order of result.orders) {
      console.log(`Order ${order.orderID}:`);
      console.log(`  Name: ${order.firstName}`);
      console.log(`  Full name: ${order.fullName}`);
      console.log(`  Phone: +${order.phoneCode}${order.phone}`);
      if (order.additionalPhoneCodes?.length) {
        console.log(`  Additional phone codes: ${order.additionalPhoneCodes.join(', ')}`);
      }
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('Validation error:', error.message);
    }
    throw error;
  }
}
```

### Filtering Supplies by Date and Status

```typescript
async function getRecentSupplies() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const supplies = await sdk.ordersFBW.listSupplies({
    dates: [{
      from: thirtyDaysAgo.toISOString(),
      till: new Date().toISOString(),
      type: 'createDate'
    }],
    statusIDs: [4, 5]  // In acceptance + Accepted
  });

  for (const supply of supplies) {
    const id = supply.supplyID ?? supply.preorderID;
    console.log(`Supply ${id}: ${supply.statusName}`);
    console.log(`  Box type: ${supply.boxTypeName} (ID: ${supply.boxTypeID})`);
    console.log(`  Is box-on-pallet: ${supply.isBoxOnPallet}`);
    console.log(`  Created: ${supply.createDate}`);
  }
}
```

---

## Types

### Key Entity Types

```typescript
// Supply list item
interface ModelsSupply {
  phone?: string;
  supplyID?: number;
  preorderID?: number;
  createDate?: string;
  supplyDate?: string;
  factDate?: string;
  updatedDate?: string;
  statusID?: 1 | 2 | 3 | 4 | 5 | 6;
  statusName?: string;
  boxTypeID?: number;          // 0=no boxes, 1/2=boxes, 5=monopallets, 6=supersafe, 7=piece pallet
  isBoxOnPallet?: boolean;     // true if piece pallet type
}

// Supply details (extended)
interface ModelsSupplyDetails {
  phone?: string;
  statusID?: 1 | 2 | 3 | 4 | 5 | 6;
  statusName?: string;
  boxTypeID?: number;
  boxTypeName?: string;
  isBoxOnPallet?: boolean;     // true if piece pallet type
  virtualTypeID?: number;
  virtualTypeName?: string;
  createDate?: string;
  supplyDate?: string;
  factDate?: string;
  updatedDate?: string;
  warehouseID?: number;
  warehouseName?: string;
  actualWarehouseID?: number;
  actualWarehouseName?: string;
  transitWarehouseID?: number;
  transitWarehouseName?: string;
  acceptanceCost?: number;
  paidAcceptanceCoefficient?: number;
  rejectReason?: string;
  supplierAssignName?: string;
  storageCoef?: string;
  deliveryCoef?: string;
  quantity?: number;
  readyForSaleQuantity?: number;
  acceptedQuantity?: number;
  unloadingQuantity?: number;
  depersonalizedQuantity?: number;
}

// Acceptance options result (with canBoxOnPallet)
interface ModelsOptionsResultModel {
  result?: {
    barcode?: string;
    error?: { title?: string; detail?: string };
    isError?: boolean;
    warehouses?: {
      warehouseID?: number;
      canBox?: boolean;
      canMonopallet?: boolean;
      canSupersafe?: boolean;
      canBoxOnPallet?: boolean;   // piece pallet availability
    }[];
  }[];
  requestId?: string;
}

// Warehouse info
interface ModelsWarehousesResultItems {
  ID?: number;
  name?: string;
  address?: string;
  workTime?: string;
  acceptsQR?: boolean;
  isActive?: boolean;
  isTransitActive?: boolean;
}

// DBW buyer information (since v3.4.0)
interface DBWClientInfo {
  orderID?: number;
  firstName?: string;
  fullName?: string;
  phone?: string;
  phoneCode?: number;
  additionalPhoneCodes?: number[];
}

// DBW client info response
interface GetDBWClientInfoResponse {
  orders?: DBWClientInfo[] | null;
}

// Good in supply
interface ModelsGoodInSupply {
  barcode?: string;
  vendorCode?: string;
  nmID?: number;
  needKiz?: boolean;
  tnved?: string;
  techSize?: string;
  color?: string;
  supplierBoxAmount?: number;
  quantity?: number;
  readyForSaleQuantity?: number;
  acceptedQuantity?: number;
  unloadingQuantity?: number;
}

// Transit tariff
interface ModelsTransitTariff {
  transitWarehouseName?: string;
  destinationWarehouseName?: string;
  activeFrom?: string;
  boxTariff?: ModelsVolumeTariff[];
  palletTariff?: number;
}

// API error model
interface ModelsErrorModel {
  status?: number;
  title?: string;
  detail?: string;
  requestId?: string;
  origin?: string;
}
```

### Supply Status IDs

| ID | Status |
|----|--------|
| 1 | Not planned |
| 2 | Planned |
| 3 | Shipment allowed |
| 4 | Acceptance in progress |
| 5 | Accepted |
| 6 | Shipped at gates |

### Box Type IDs

| ID | Type |
|----|------|
| 0 | No boxes (virtual supply) |
| 1, 2 | Boxes |
| 5 | Monopallets |
| 6 | Supersafe |
| 7 | Piece pallet (`isBoxOnPallet: true`) |

---

## Rate Limits

| Rate Limit Key | Operations | Limit | Interval | Burst | Penalty |
|----------------|-----------|-------|----------|-------|---------|
| `orders-fbw.acceptanceCoefficients` | Acceptance coefficients (deprecated) | 6 req/min | 10s | 6 | -- |
| `orders-fbw.postAcceptanceOptions` | Create acceptance option | 6 req/min | 10s | 6 | -- |
| `orders-fbw.warehouses` | List warehouses | 6 req/min | 10s | 6 | -- |
| `orders-fbw.transitTariffs` | Transit tariffs | 6 req/min | 10s | 10 | -- |
| `orders-fbw.postSupplies` | List supplies | 30 req/min | 2s | 10 | -- |
| `orders-fbw.supplies` | Get supply details | 30 req/min | 2s | 10 | -- |
| `orders-fbw.suppliesGoods` | Get supply goods | 30 req/min | 2s | 10 | -- |
| `orders-fbw.suppliesPackage` | Get supply packaging | 30 req/min | 2s | 10 | -- |
| `orders-fbw.getClientInfo` | Get DBW buyer info | 300 req/min | 200ms | 20 | 10x on 409 |

> **409 Penalty**: A single 409 response from `getClientInfo()` counts as **10 requests** against the rate limit quota due to `penaltyMultiplier: 10`.

---

## Error Handling

```typescript
import { ValidationError, RateLimitError, WBAPIError } from 'daytona-wildberries-typescript-sdk';

try {
  const result = await sdk.ordersFBW.getClientInfo([987654321]);
} catch (error) {
  if (error instanceof ValidationError) {
    // Empty orderIds array
    console.log('Validation:', error.message);
  } else if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter}ms`);
  } else if (error instanceof WBAPIError) {
    console.log(`API error ${error.statusCode}: ${error.message}`);
  }
}
```

---

## Related Resources

- [API Reference: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [Supplies Planning Guide](/guides/supplies-planning)
- [FBW Getting Started Guide](/guides/orders-fbw-getting-started)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 3.5.0 | 2026-03 | Added `isBoxOnPallet` and `boxTypeID` to `ModelsSupply` and `ModelsSupplyDetails`; added `canBoxOnPallet` to warehouse options |
| 3.4.0 | 2026-03 | Added `getClientInfo()` method (DBW buyer info, 300 req/min, marketplace-api domain); added `DBWClientInfo` and `GetDBWClientInfoResponse` types; method count 8 -> 9 active |
| 3.0.0 | 2026-02 | Renamed `createSupply` to `listSupplies`; deprecated `getAcceptanceCoefficients` |
| 2.0.0 | 2025-10 | Initial Orders FBW module with 8 methods |

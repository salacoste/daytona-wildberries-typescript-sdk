[Wildberries API TypeScript SDK](../modules.md) / OrdersFBWModule

# Class: OrdersFBWModule

Defined in: [modules/orders-fbw/index.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L29)

## Constructors

### Constructor

```ts
new OrdersFBWModule(client: BaseClient): OrdersFBWModule;
```

Defined in: [modules/orders-fbw/index.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`OrdersFBWModule`

## Methods

### getWarehouses()

```ts
getWarehouses(): Promise<FBWWarehouse[]>;
```

Defined in: [modules/orders-fbw/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L47)

Get list of Wildberries warehouses

Rate limit: 6 requests per minute (10 second intervals)

#### Returns

`Promise`\<[`FBWWarehouse`](../interfaces/FBWWarehouse.md)[]\>

List of warehouses with details (ID, name, address, work time, capabilities)

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
const warehouses = await sdk.ordersFBW.getWarehouses();
console.log(warehouses[0].name); // "Коледино"
```

***

### getAcceptanceCoefficients()

```ts
getAcceptanceCoefficients(warehouseIDs?: string): Promise<FBWAcceptanceCoefficient[]>;
```

Defined in: [modules/orders-fbw/index.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L76)

Get acceptance coefficients for warehouses

Returns acceptance coefficients for specific warehouses for the next 14 days.
Acceptance is only available when: coefficient = 0 or 1 AND allowUnload = true

Rate limit: 6 requests per minute (10 second intervals)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseIDs?` | `string` | Optional comma-separated warehouse IDs (e.g., "507,117501") |

#### Returns

`Promise`\<[`FBWAcceptanceCoefficient`](../interfaces/FBWAcceptanceCoefficient.md)[]\>

List of acceptance coefficients with warehouse details and pricing

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
// All warehouses
const allCoeffs = await sdk.ordersFBW.getAcceptanceCoefficients();

// Specific warehouses
const coeffs = await sdk.ordersFBW.getAcceptanceCoefficients('507,117501');
```

***

### getAcceptanceOptions()

```ts
getAcceptanceOptions(goods: FBWGood[], warehouseID?: string): Promise<FBWAcceptanceOptions>;
```

Defined in: [modules/orders-fbw/index.ts:114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L114)

Get acceptance options for goods

Returns information about which warehouses and package types are available for supply.
List of warehouses is determined by barcode and quantity.

Rate limit: 6 requests per minute (10 second intervals)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `goods` | [`FBWGood`](../interfaces/FBWGood.md)[] | Array of goods with barcodes and quantities (1-5000 items) |
| `warehouseID?` | `string` | Optional warehouse ID to filter results |

#### Returns

`Promise`\<[`FBWAcceptanceOptions`](../interfaces/FBWAcceptanceOptions.md)\>

Acceptance options including available warehouses and packaging types

#### Throws

When goods array is empty, too large, or contains invalid data

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
const goods = [
  { barcode: '1234567891234', quantity: 10 },
  { barcode: '9876543210987', quantity: 5 }
];

const options = await sdk.ordersFBW.getAcceptanceOptions(goods);
console.log(options.result[0].warehouses); // Available warehouses

// Filter by warehouse
const warehouseOptions = await sdk.ordersFBW.getAcceptanceOptions(goods, '507');
```

***

### getTransitTariffs()

```ts
getTransitTariffs(): Promise<FBWTransitTariff[]>;
```

Defined in: [modules/orders-fbw/index.ts:167](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L167)

Get transit tariffs

Returns information about available transit directions and their pricing.

Rate limit: 6 requests per minute (10 second intervals, burst: 10)

#### Returns

`Promise`\<[`FBWTransitTariff`](../interfaces/FBWTransitTariff.md)[]\>

List of transit tariffs with pricing for boxes and pallets

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
const tariffs = await sdk.ordersFBW.getTransitTariffs();
console.log(tariffs[0].transitWarehouseName); // "Москва (транзит)"
console.log(tariffs[0].palletTariff); // 1200.0
```

***

### getSupplies()

```ts
getSupplies(
   filters: FBWSupplyFilters, 
   limit: number, 
offset: number): Promise<FBWSupply[]>;
```

Defined in: [modules/orders-fbw/index.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L208)

Get list of supplies

Returns list of supplies with optional filters. Default: last 1000 supplies.

Rate limit: 30 requests per minute (2 second intervals)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `filters` | [`FBWSupplyFilters`](../interfaces/FBWSupplyFilters.md) | `undefined` | Date and status filters |
| `limit` | `number` | `1000` | Number of supplies to return (1-1000, default: 1000) |
| `offset` | `number` | `0` | Number of supplies to skip (>= 0, default: 0) |

#### Returns

`Promise`\<[`FBWSupply`](../interfaces/FBWSupply.md)[]\>

List of supplies matching filters

#### Throws

When limit/offset are invalid or filters contain invalid data

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
// Get all supplies
const allSupplies = await sdk.ordersFBW.getSupplies({
  dates: [],
  statusIDs: []
});

// Filter by date and status
const filteredSupplies = await sdk.ordersFBW.getSupplies({
  dates: [{
    from: '2024-01-01',
    till: '2024-12-31',
    type: 'createDate'
  }],
  statusIDs: [2, 3, 4] // Planned, Allowed, In Acceptance
}, 100, 0);
```

***

### getSupplyDetails()

```ts
getSupplyDetails(ID: number, isPreorderID: boolean): Promise<FBWSupplyDetails>;
```

Defined in: [modules/orders-fbw/index.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L279)

Get supply details by ID

Returns detailed information about a specific supply or preorder.

Rate limit: 30 requests per minute (2 second intervals)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `ID` | `number` | `undefined` | Supply ID or Preorder ID |
| `isPreorderID` | `boolean` | `false` | Whether ID is a preorder ID (default: false) |

#### Returns

`Promise`\<[`FBWSupplyDetails`](../interfaces/FBWSupplyDetails.md)\>

Detailed supply information including quantities, costs, and coefficients

#### Throws

When ID is invalid

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
// Get supply details
const supply = await sdk.ordersFBW.getSupplyDetails(12345);
console.log(supply.statusName); // "Принято"
console.log(supply.warehouseName); // "Коледино"

// Get preorder details
const preorder = await sdk.ordersFBW.getSupplyDetails(67890, true);
```

***

### getSupplyGoods()

```ts
getSupplyGoods(
   ID: number, 
   isPreorderID: boolean, 
   limit: number, 
offset: number): Promise<FBWGoodInSupply[]>;
```

Defined in: [modules/orders-fbw/index.ts:319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L319)

Get goods in supply

Returns information about goods in a supply with pagination.

Rate limit: 30 requests per minute (2 second intervals)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `ID` | `number` | `undefined` | Supply ID or Preorder ID |
| `isPreorderID` | `boolean` | `false` | Whether ID is a preorder ID (default: false) |
| `limit` | `number` | `100` | Number of goods to return (1-1000, default: 100) |
| `offset` | `number` | `0` | Number of goods to skip (>= 0, default: 0) |

#### Returns

`Promise`\<[`FBWGoodInSupply`](../interfaces/FBWGoodInSupply.md)[]\>

List of goods with barcodes, quantities, and acceptance status

#### Throws

When ID, limit, or offset are invalid

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
// Get first 100 goods
const goods = await sdk.ordersFBW.getSupplyGoods(12345);

// Get next 100 goods
const moreGoods = await sdk.ordersFBW.getSupplyGoods(12345, false, 100, 100);

// Get goods from preorder
const preorderGoods = await sdk.ordersFBW.getSupplyGoods(67890, true);
```

***

### getSupplyPackage()

```ts
getSupplyPackage(ID: number): Promise<FBWBox[]>;
```

Defined in: [modules/orders-fbw/index.ts:366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/orders-fbw/index.ts#L366)

Get supply package information

Returns information about packaging for a supply.

Rate limit: 30 requests per minute (2 second intervals)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ID` | `number` | Supply ID |

#### Returns

`Promise`\<[`FBWBox`](../interfaces/FBWBox.md)[]\>

List of boxes with package codes and contained goods

#### Throws

When ID is invalid

#### Throws

When rate limit exceeded

#### Throws

When network request fails

#### Example

```typescript
const packages = await sdk.ordersFBW.getSupplyPackage(12345);
console.log(packages[0].packageCode); // "WB-PKG-12345"
console.log(packages[0].quantity); // 15
console.log(packages[0].barcodes); // [{ barcode: '...', quantity: 10 }, ...]
```

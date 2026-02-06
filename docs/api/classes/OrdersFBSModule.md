[Wildberries API TypeScript SDK](../modules.md) / OrdersFbsModule

# Class: OrdersFbsModule

Defined in: [modules/orders-fbs/index.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L29)

## Constructors

### Constructor

```ts
new OrdersFbsModule(client: BaseClient): OrdersFbsModule;
```

Defined in: [modules/orders-fbs/index.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`OrdersFbsModule`

## Methods

### getPassesOffices()

```ts
getPassesOffices(): Promise<PassOffice[]>;
```

Defined in: [modules/orders-fbs/index.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L51)

Get list of warehouses that require a pass

Returns a list of warehouses for binding to a seller pass. The data returned by this method may change.
It is recommended to periodically synchronize the list.

#### Returns

`Promise`\<[`PassOffice`](../-internal-/interfaces/PassOffice.md)[]\>

Promise resolving to an array of pass offices

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1offices/get](https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1offices/get)

#### Example

```typescript
const offices = await sdk.ordersFBS.getPassesOffices();
console.log(offices);
```

***

### passes()

```ts
passes(): Promise<Pass[]>;
```

Defined in: [modules/orders-fbs/index.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L76)

Get list of seller passes

Returns a list of all created seller passes.

#### Returns

`Promise`\<[`Pass`](../-internal-/interfaces/Pass.md)[]\>

Promise resolving to an array of passes

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes/get](https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes/get)

#### Example

```typescript
const passes = await sdk.ordersFBS.passes();
console.log(passes);
```

***

### createPass()

```ts
createPass(data: {
  firstName: string;
  lastName: string;
  carModel: string;
  carNumber: string;
  officeId: number;
}): Promise<{
  id?: number;
}>;
```

Defined in: [modules/orders-fbs/index.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L107)

Create a seller pass

Creates a seller pass bound to a WB warehouse. The pass is valid for 48 hours from creation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `firstName`: `string`; `lastName`: `string`; `carModel`: `string`; `carNumber`: `string`; `officeId`: `number`; \} | Pass data (full name length must be 6-100 characters, car number allows only letters and digits) |
| `data.firstName` | `string` | - |
| `data.lastName` | `string` | - |
| `data.carModel` | `string` | - |
| `data.carNumber` | `string` | - |
| `data.officeId` | `number` | - |

#### Returns

`Promise`\<\{
  `id?`: `number`;
\}\>

Promise resolving to the created pass ID

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes/post](https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createPass({
  firstName: 'Ivan',
  lastName: 'Petrov',
  carModel: 'GAZelle',
  carNumber: 'A123BC77',
  officeId: 1,
});
console.log(result.id);
```

***

### updatePass()

```ts
updatePass(passId: number, data: {
  firstName: string;
  lastName: string;
  carModel: string;
  carNumber: string;
  officeId: number;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:146](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L146)

Update a seller pass

Updates seller pass data, including the bound WB warehouse.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passId` | `number` | ID of the pass to update |
| `data` | \{ `firstName`: `string`; `lastName`: `string`; `carModel`: `string`; `carNumber`: `string`; `officeId`: `number`; \} | Updated pass data (full name length must be 6-100 characters, car number allows only letters and digits) |
| `data.firstName` | `string` | - |
| `data.lastName` | `string` | - |
| `data.carModel` | `string` | - |
| `data.carNumber` | `string` | - |
| `data.officeId` | `number` | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1%7BpassId%7D/put](https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1%7BpassId%7D/put)

#### Example

```typescript
await sdk.ordersFBS.updatePass(12345, {
  firstName: 'Ivan',
  lastName: 'Petrov',
  carModel: 'GAZelle',
  carNumber: 'A123BC77',
  officeId: 2,
});
```

***

### deletePass()

```ts
deletePass(passId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L179)

Delete a seller pass

Removes a seller pass from the list.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passId` | `number` | ID of the pass to delete |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1%7BpassId%7D/delete](https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1%7BpassId%7D/delete)

#### Example

```typescript
await sdk.ordersFBS.deletePass(12345);
```

***

### getOrdersNew()

```ts
getOrdersNew(): Promise<{
  orders?: OrderNew[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L203)

Get list of new assembly tasks

Returns a list of all new assembly tasks available for the seller at the time of request.

#### Returns

`Promise`\<\{
  `orders?`: [`OrderNew`](../-internal-/interfaces/OrderNew.md)[];
\}\>

Promise resolving to new orders response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1new/get](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1new/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getOrdersNew();
console.log(result.orders);
```

***

### orders()

```ts
orders(options?: {
  limit: number;
  next: number;
  dateFrom?: number;
  dateTo?: number;
}): Promise<{
  next?: number;
  orders?: Order[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L230)

Get assembly tasks information

Returns assembly task information without their current status.
Data can be retrieved for a given period, up to 30 calendar days per request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `next`: `number`; `dateFrom?`: `number`; `dateTo?`: `number`; \} | Query parameters for pagination and date filtering |
| `options.limit?` | `number` | - |
| `options.next?` | `number` | - |
| `options.dateFrom?` | `number` | - |
| `options.dateTo?` | `number` | - |

#### Returns

`Promise`\<\{
  `next?`: `number`;
  `orders?`: [`Order`](../-internal-/interfaces/Order.md)[];
\}\>

Promise resolving to orders with pagination cursor

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders/get](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders/get)

#### Example

```typescript
const result = await sdk.ordersFBS.orders({ limit: 100, next: 0 });
console.log(result.orders);
```

***

### ~~createOrdersStatu()~~

```ts
createOrdersStatu(data?: {
  orders: number[];
}): Promise<{
  orders?: {
     id?: number;
     supplierStatus?: "new" | "confirm" | "complete" | "cancel";
     wbStatus?:   | "waiting"
        | "sorted"
        | "sold"
        | "canceled"
        | "canceled_by_client"
        | "declined_by_client"
        | "defect"
        | "ready_for_pickup"
        | "postponed_delivery";
  }[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L263)

Get assembly task statuses

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders`: `number`[]; \} | Request body containing order IDs |
| `data.orders?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `orders?`: \{
     `id?`: `number`;
     `supplierStatus?`: `"new"` \| `"confirm"` \| `"complete"` \| `"cancel"`;
     `wbStatus?`:   \| `"waiting"`
        \| `"sorted"`
        \| `"sold"`
        \| `"canceled"`
        \| `"canceled_by_client"`
        \| `"declined_by_client"`
        \| `"defect"`
        \| `"ready_for_pickup"`
        \| `"postponed_delivery"`;
  \}[];
\}\>

Promise resolving to order statuses

#### Deprecated

Use [getOrderStatuses](#getorderstatuses) instead. This method has an incorrect name and will be removed in a future release.

Returns statuses of assembly tasks by their IDs.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createOrdersStatu({ orders: [123, 456] });
console.log(result.orders);
```

***

### getOrdersReshipment()

```ts
getOrdersReshipment(): Promise<ReshipmentResponse>;
```

Defined in: [modules/orders-fbs/index.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L318)

Get all assembly tasks requiring reshipment

Returns all assembly tasks that require reshipment. Reshipment is needed when a supply was scanned
at the reception point but still has unscanned items. These tasks can be moved to another active supply.

#### Returns

`Promise`\<[`ReshipmentResponse`](../-internal-/interfaces/ReshipmentResponse.md)\>

Promise resolving to reshipment orders response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1supplies~1orders~1reshipment/get](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1supplies~1orders~1reshipment/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getOrdersReshipment();
console.log(result);
```

***

### updateOrdersCancel()

```ts
updateOrdersCancel(orderId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:343](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L343)

Cancel an assembly task

Cancels an assembly task and sets its status to `cancel` (cancelled by seller).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task to cancel |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1cancel/patch](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1cancel/patch)

#### Example

```typescript
await sdk.ordersFBS.updateOrdersCancel(123456);
```

***

### createOrdersSticker()

```ts
createOrdersSticker(options?: {
  type: "svg" | "zplv" | "zplh" | "png";
  width: 40 | 58;
  height: 30 | 40;
}, data?: {
  orders?: number[];
}): Promise<{
  stickers?: {
     orderId?: number;
     partA?: string;
     partB?: string;
     barcode?: string;
     file?: string;
  }[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L375)

Get assembly task stickers

Returns stickers for assembly tasks in SVG, ZPLV, ZPLH, or PNG format.
Maximum 100 stickers per request. Only available for tasks with status `confirm`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `type`: `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"`; `width`: `40` \| `58`; `height`: `30` \| `40`; \} | Sticker format and size options |
| `options.type?` | `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"` | - |
| `options.width?` | `40` \| `58` | - |
| `options.height?` | `30` \| `40` | - |
| `data?` | \{ `orders?`: `number`[]; \} | Request body containing order IDs |
| `data.orders?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `stickers?`: \{
     `orderId?`: `number`;
     `partA?`: `string`;
     `partB?`: `string`;
     `barcode?`: `string`;
     `file?`: `string`;
  \}[];
\}\>

Promise resolving to stickers response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1stickers/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1stickers/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createOrdersSticker(
  { type: 'png', width: 58, height: 40 },
  { orders: [123, 456] },
);
console.log(result.stickers);
```

***

### ~~getOrdersMeta()~~

```ts
getOrdersMeta(orderId: number): Promise<{
  meta?: Meta;
}>;
```

Defined in: [modules/orders-fbs/index.ts:422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L422)

Get metadata for an assembly task

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |

#### Returns

`Promise`\<\{
  `meta?`: [`Meta`](../-internal-/interfaces/Meta.md);
\}\>

Promise resolving to order metadata

#### Deprecated

Use [getOrdersMetaBulk](#getordersmetabulk) for bulk metadata retrieval. This single-order endpoint may be removed in a future release.

Returns metadata for a single assembly task (imei, uin, gtin, sgtin, expiration, customsDeclaration).

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getOrdersMeta(123456);
console.log(result.meta);
```

***

### deleteOrdersMeta()

```ts
deleteOrdersMeta(orderId: number, options?: {
  key?: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L449)

Delete assembly task metadata

Deletes a metadata value for the given key. Only one key can be passed per request.
Supported keys: imei, uin, gtin, sgtin.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `options?` | \{ `key?`: `string`; \} | Query parameters specifying which metadata key to delete |
| `options.key?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/delete](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/delete)

#### Example

```typescript
await sdk.ordersFBS.deleteOrdersMeta(123456, { key: 'imei' });
```

***

### updateMetaSgtin()

```ts
updateMetaSgtin(orderId: number, data?: {
  sgtins?: string[];
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:476](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L476)

Attach marking codes (SGTIN) to an assembly task

Attaches product marking codes to an assembly task. Only available when the task metadata
includes the `sgtin` field and the task is in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | \{ `sgtins?`: `string`[]; \} | Request body containing SGTIN marking codes |
| `data.sgtins?` | `string`[] | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaSgtin(123456, { sgtins: ['01046009544741002'] });
```

***

### updateMetaUin()

```ts
updateMetaUin(orderId: number, data?: {
  uin: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L504)

Attach UIN to an assembly task

Updates the unique identification number (UIN) in the assembly task metadata.
Each task can have only one UIN. Only available for orders delivered by WB in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | \{ `uin`: `string`; \} | Request body containing the UIN value |
| `data.uin?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaUin(123456, { uin: 'UIN123456789' });
```

***

### updateMetaImei()

```ts
updateMetaImei(orderId: number, data?: {
  imei: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:532](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L532)

Attach IMEI to an assembly task

Updates the IMEI in the assembly task metadata. Each task can have only one IMEI.
If a device has two IMEIs, only provide the primary one. Only available for orders in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | \{ `imei`: `string`; \} | Request body containing the IMEI value |
| `data.imei?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaImei(123456, { imei: '354567890123456' });
```

***

### updateMetaGtin()

```ts
updateMetaGtin(orderId: number, data?: {
  gtin: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:560](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L560)

Attach GTIN to an assembly task

Updates the GTIN (unique product ID for Belarus) in the assembly task metadata.
Each task can have only one GTIN. Only available for orders delivered by WB in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | \{ `gtin`: `string`; \} | Request body containing the GTIN value |
| `data.gtin?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaGtin(123456, { gtin: '4600000000001' });
```

***

### updateMetaExpiration()

```ts
updateMetaExpiration(orderId: number, data?: {
  expiration?: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:588](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L588)

Attach expiration date to an assembly task

Sets the product expiration date for an assembly task. Only available for orders delivered
by WB in `confirm` status. To change the date, send a new request. Expiration cannot be removed once set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | \{ `expiration?`: `string`; \} | Request body containing the expiration date |
| `data.expiration?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaExpiration(123456, { expiration: '2025-12-31' });
```

***

### setCustomsDeclaration()

```ts
setCustomsDeclaration(orderId: number, data: {
  customsDeclaration: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:619](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L619)

Attach customs declaration number to an assembly task

Updates the customs declaration number in the assembly task metadata.
Each task can have only one customs declaration number. Check if the task supports it
by verifying `customsDeclaration` is in the `requiredMeta` field of new orders.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data` | \{ `customsDeclaration`: `string`; \} | Request body containing the customs declaration number |
| `data.customsDeclaration` | `string` | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1customs-declaration/put](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1customs-declaration/put)

#### Example

```typescript
await sdk.ordersFBS.setCustomsDeclaration(123456, {
  customsDeclaration: '10129050/010120/0001234',
});
```

***

### createStickersCrossBorder()

```ts
createStickersCrossBorder(data?: {
  orders?: number[];
}): Promise<{
  stickers?: {
     file?: string;
     orderId?: number;
  }[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:650](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L650)

Get cross-border assembly task stickers

Returns stickers for cross-border assembly tasks in PDF format.
Maximum 100 stickers per request. Only available for tasks with status `confirm`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders?`: `number`[]; \} | Request body containing order IDs |
| `data.orders?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `stickers?`: \{
     `file?`: `string`;
     `orderId?`: `number`;
  \}[];
\}\>

Promise resolving to cross-border stickers response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1stickers~1cross-border/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1stickers~1cross-border/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createStickersCrossBorder({ orders: [123, 456] });
console.log(result.stickers);
```

***

### ~~createOrdersExternalSticker()~~

```ts
createOrdersExternalSticker(data?: {
  orders?: number[];
}): Promise<{
  stickers?: {
     orderID?: number;
     url?: string;
     parcelID?: string;
  }[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L681)

Get cross-border sticker links (deprecated)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders?`: `number`[]; \} | Request body containing order IDs |
| `data.orders?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `stickers?`: \{
     `orderID?`: `number`;
     `url?`: `string`;
     `parcelID?`: `string`;
  \}[];
\}\>

Promise resolving to sticker URLs response

#### Deprecated

This method will be disabled by Wildberries. Use [createStickersCrossBorder](#createstickerscrossborder) instead.

Returns a list of sticker links for cross-border assembly tasks.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1files~1orders~1external-stickers/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1files~1orders~1external-stickers/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createOrdersExternalSticker({ orders: [123] });
console.log(result.stickers);
```

***

### createStatusHistory()

```ts
createStatusHistory(data?: {
  orders?: number[];
}): Promise<{
  orders?: {
     deliveryDate?: string;
     statuses?: {
        date?: string;
        code?: string;
     }[];
     orderID?: number;
  }[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L710)

Get cross-border assembly task status history

Returns the status history for cross-border assembly tasks.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders?`: `number`[]; \} | Request body containing order IDs |
| `data.orders?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `orders?`: \{
     `deliveryDate?`: `string`;
     `statuses?`: \{
        `date?`: `string`;
        `code?`: `string`;
     \}[];
     `orderID?`: `number`;
  \}[];
\}\>

Promise resolving to status history response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status~1history/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status~1history/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createStatusHistory({ orders: [123, 456] });
console.log(result.orders);
```

***

### createOrdersClient()

```ts
createOrdersClient(data: OrdersRequestAPI): Promise<CrossborderTurkeyClientInfoResp>;
```

Defined in: [modules/orders-fbs/index.ts:747](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L747)

Get orders with client information (Turkey cross-border)

Returns buyer information by assembly task ID. Only available for cross-border orders from Turkey.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`OrdersRequestAPI`](../-internal-/interfaces/OrdersRequestAPI.md) | Request body containing order IDs |

#### Returns

`Promise`\<[`CrossborderTurkeyClientInfoResp`](../-internal-/interfaces/CrossborderTurkeyClientInfoResp.md)\>

Promise resolving to client info response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1client/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1client/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createOrdersClient({ orders: [123456] });
console.log(result);
```

***

### supplies()

```ts
supplies(options?: {
  limit: number;
  next: number;
}): Promise<{
  next?: number;
  supplies?: Supply[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:774](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L774)

Get list of supplies

Returns a paginated list of supplies.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `next`: `number`; \} | Query parameters for pagination |
| `options.limit?` | `number` | - |
| `options.next?` | `number` | - |

#### Returns

`Promise`\<\{
  `next?`: `number`;
  `supplies?`: [`Supply`](../-internal-/interfaces/Supply.md)[];
\}\>

Promise resolving to supplies list with pagination cursor

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies/get](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies/get)

#### Example

```typescript
const result = await sdk.ordersFBS.supplies({ limit: 100, next: 0 });
console.log(result.supplies);
```

***

### createSupply()

```ts
createSupply(data: {
  name?: string;
}): Promise<{
  id?: string;
}>;
```

Defined in: [modules/orders-fbs/index.ts:804](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L804)

Create a new supply

Creates a new supply for FBS assembly tasks. A new supply acquires the cargo type
of the first order added to it. Only orders of the same cargo type can be in one supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `name?`: `string`; \} | Request body containing the supply name |
| `data.name?` | `string` | - |

#### Returns

`Promise`\<\{
  `id?`: `string`;
\}\>

Promise resolving to the created supply ID

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies/post](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createSupply({ name: 'Supply 2025-01' });
console.log(result.id);
```

***

### ~~updateSuppliesOrder()~~

```ts
updateSuppliesOrder(supplyId: string, orderId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:834](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L834)

Add an assembly task to a supply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `orderId` | `number` | ID of the assembly task to add |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Deprecated

Use [addOrdersToSupply](#addorderstosupply) for bulk order-to-supply assignment. This single-order endpoint may be removed in a future release.

Adds an assembly task to a supply and sets its status to `confirm`.
Can move tasks between active supplies or from closed to active supplies for reshipment.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders~1%7BorderId%7D/patch](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders~1%7BorderId%7D/patch)

#### Example

```typescript
await sdk.ordersFBS.updateSuppliesOrder('WB-GI-1234', 123456);
```

***

### getSupply()

```ts
getSupply(supplyId: string): Promise<Supply>;
```

Defined in: [modules/orders-fbs/index.ts:861](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L861)

Get supply information

Returns detailed information about a supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |

#### Returns

`Promise`\<[`Supply`](../-internal-/interfaces/Supply.md)\>

Promise resolving to supply details

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get)

#### Example

```typescript
const supply = await sdk.ordersFBS.getSupply('WB-GI-1234');
console.log(supply);
```

***

### deleteSupply()

```ts
deleteSupply(supplyId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:886](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L886)

Delete a supply

Deletes a supply if it is active and has no assembly tasks assigned.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply to delete |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/delete](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/delete)

#### Example

```typescript
await sdk.ordersFBS.deleteSupply('WB-GI-1234');
```

***

### ~~getSuppliesOrder()~~

```ts
getSuppliesOrder(supplyId: string): Promise<{
  orders?: SupplyOrder[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:916](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L916)

Get assembly tasks in a supply

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |

#### Returns

`Promise`\<\{
  `orders?`: [`SupplyOrder`](../-internal-/interfaces/SupplyOrder.md)[];
\}\>

Promise resolving to supply orders response

#### Deprecated

Use [getSupplyOrderIds](#getsupplyorderids) for retrieving order IDs in a supply. This endpoint returns legacy format and may be removed in a future release.

Returns assembly tasks assigned to a supply.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders/get](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getSuppliesOrder('WB-GI-1234');
console.log(result.orders);
```

***

### updateSuppliesDeliver()

```ts
updateSuppliesDeliver(supplyId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L942)

Transfer supply to delivery

Closes a supply and sets all assembly tasks in it to `complete` status.
After closing, no new tasks can be added. The supply must have at least one task.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply to deliver |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1deliver/patch](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1deliver/patch)

#### Example

```typescript
await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
```

***

### getSuppliesBarcode()

```ts
getSuppliesBarcode(supplyId: string, options?: {
  type: "svg" | "zplv" | "zplh" | "png";
}): Promise<{
  barcode?: string;
  file?: string;
}>;
```

Defined in: [modules/orders-fbs/index.ts:971](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L971)

Get supply QR code

Returns the supply QR code in SVG, ZPLV, ZPLH, or PNG format (580x400 px).
Only available after the supply has been transferred to delivery.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `options?` | \{ `type`: `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"`; \} | Sticker format options |
| `options.type?` | `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"` | - |

#### Returns

`Promise`\<\{
  `barcode?`: `string`;
  `file?`: `string`;
\}\>

Promise resolving to barcode and file data

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1barcode/get](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1barcode/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getSuppliesBarcode('WB-GI-1234', { type: 'png' });
console.log(result.barcode);
```

***

### getSuppliesTrbx()

```ts
getSuppliesTrbx(supplyId: string): Promise<{
  trbxes?: SupplyTrbx[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:1000](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1000)

Get list of supply boxes (trbx)

Returns the list of boxes for a supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |

#### Returns

`Promise`\<\{
  `trbxes?`: [`SupplyTrbx`](../-internal-/interfaces/SupplyTrbx.md)[];
\}\>

Promise resolving to boxes list

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/get](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getSuppliesTrbx('WB-GI-1234');
console.log(result.trbxes);
```

***

### createSuppliesTrbx()

```ts
createSuppliesTrbx(supplyId: string, data?: {
  amount: number;
}): Promise<{
  trbxIds?: string[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:1028](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1028)

Add boxes to a supply

Adds the required number of boxes to a supply. Only for supplies shipped to pickup points (PVZ).
Can only be added to an open supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `data?` | \{ `amount`: `number`; \} | Request body containing the number of boxes to add |
| `data.amount?` | `number` | - |

#### Returns

`Promise`\<\{
  `trbxIds?`: `string`[];
\}\>

Promise resolving to created box IDs

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/post](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createSuppliesTrbx('WB-GI-1234', { amount: 5 });
console.log(result.trbxIds);
```

***

### deleteSuppliesTrbx()

```ts
deleteSuppliesTrbx(supplyId: string, data?: {
  trbxIds: string[];
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1058](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1058)

Delete boxes from a supply

Removes boxes from a supply. Can only delete while the supply is being assembled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `data?` | \{ `trbxIds`: `string`[]; \} | Request body containing box IDs to delete |
| `data.trbxIds?` | `string`[] | - |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/delete](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/delete)

#### Example

```typescript
await sdk.ordersFBS.deleteSuppliesTrbx('WB-GI-1234', { trbxIds: ['trbx-1', 'trbx-2'] });
```

***

### createTrbxSticker()

```ts
createTrbxSticker(
   supplyId: string, 
   options?: {
  type: "svg" | "zplv" | "zplh" | "png";
}, 
   data?: {
  trbxIds: string[];
}): Promise<{
  stickers?: TrbxStickers[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:1091](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1091)

Get supply box stickers

Returns QR stickers for boxes in SVG, ZPLV, ZPLH, or PNG format (580x400 px).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `options?` | \{ `type`: `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"`; \} | Sticker format options |
| `options.type?` | `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"` | - |
| `data?` | \{ `trbxIds`: `string`[]; \} | Request body containing box IDs |
| `data.trbxIds?` | `string`[] | - |

#### Returns

`Promise`\<\{
  `stickers?`: [`TrbxStickers`](../-internal-/interfaces/TrbxStickers.md)[];
\}\>

Promise resolving to box stickers

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx~1stickers/post](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx~1stickers/post)

#### Example

```typescript
const result = await sdk.ordersFBS.createTrbxSticker(
  'WB-GI-1234',
  { type: 'png' },
  { trbxIds: ['trbx-1', 'trbx-2'] },
);
console.log(result.stickers);
```

***

### getOrderStatuses()

```ts
getOrderStatuses(data: {
  orders: number[];
}): Promise<OrderStatusResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1127)

Get assembly task statuses

Returns statuses of assembly tasks by their IDs.
Replacement for [createOrdersStatu](#createordersstatu) with a corrected method name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `orders`: `number`[]; \} | Request body containing order IDs |
| `data.orders` | `number`[] | - |

#### Returns

`Promise`\<[`OrderStatusResponse`](../-internal-/interfaces/OrderStatusResponse.md)\>

Promise resolving to order statuses

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post](https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post)

#### Example

```typescript
const result = await sdk.ordersFBS.getOrderStatuses({ orders: [123, 456] });
console.log(result);
```

***

### getOrdersMetaBulk()

```ts
getOrdersMetaBulk(data: GetMetaMultiRequest): Promise<OrdersMetaResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1154](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1154)

Get metadata for multiple assembly tasks

Returns metadata for multiple assembly tasks (up to 100).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`GetMetaMultiRequest`](../-internal-/interfaces/GetMetaMultiRequest.md) | Request body containing order IDs (max 100) |

#### Returns

`Promise`\<[`OrdersMetaResponse`](../-internal-/interfaces/OrdersMetaResponse.md)\>

Promise resolving to metadata for the requested orders

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1marketplace~1v3~1orders~1meta/post](https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1marketplace~1v3~1orders~1meta/post)

#### Example

```typescript
const result = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [123, 456] });
console.log(result);
```

***

### addOrdersToSupply()

```ts
addOrdersToSupply(supplyId: string, data: AddOrdersToSupplyRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1181)

Add multiple assembly tasks to a supply (bulk)

Adds multiple assembly tasks to a supply in a single request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `data` | [`AddOrdersToSupplyRequest`](../-internal-/interfaces/AddOrdersToSupplyRequest.md) | Request body containing order IDs to add |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1marketplace~1v3~1supplies~1%7BsupplyId%7D~1orders/patch](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1marketplace~1v3~1supplies~1%7BsupplyId%7D~1orders/patch)

#### Example

```typescript
await sdk.ordersFBS.addOrdersToSupply('WB-GI-1234', { orders: [123, 456] });
```

***

### getSupplyOrderIds()

```ts
getSupplyOrderIds(supplyId: string): Promise<SupplyOrderIdsResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/orders-fbs/index.ts#L1208)

Get assembly task IDs in a supply

Returns a list of assembly task IDs assigned to a supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |

#### Returns

`Promise`\<[`SupplyOrderIdsResponse`](../-internal-/interfaces/SupplyOrderIdsResponse.md)\>

Promise resolving to order IDs in the supply

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1marketplace~1v3~1supplies~1%7BsupplyId%7D~1order-ids/get](https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1marketplace~1v3~1supplies~1%7BsupplyId%7D~1order-ids/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getSupplyOrderIds('WB-GI-1234');
console.log(result);
```

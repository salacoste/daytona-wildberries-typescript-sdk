[Wildberries API TypeScript SDK](../modules.md) / OrdersFbsModule

# Class: OrdersFbsModule

Defined in: [modules/orders-fbs/index.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L53)

## Constructors

### Constructor

```ts
new OrdersFbsModule(client: BaseClient): OrdersFbsModule;
```

Defined in: [modules/orders-fbs/index.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L54)

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

Defined in: [modules/orders-fbs/index.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L75)

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

Defined in: [modules/orders-fbs/index.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L100)

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
createPass(data: PassCreateRequest): Promise<PassCreateResponse>;
```

Defined in: [modules/orders-fbs/index.ts:131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L131)

Create a seller pass

Creates a seller pass bound to a WB warehouse. The pass is valid for 48 hours from creation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`PassCreateRequest`](../-internal-/interfaces/PassCreateRequest.md) | Pass data (full name length must be 6-100 characters, car number allows only letters and digits) |

#### Returns

`Promise`\<[`PassCreateResponse`](../-internal-/interfaces/PassCreateResponse.md)\>

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
updatePass(passId: number, data: PassCreateRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:164](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L164)

Update a seller pass

Updates seller pass data, including the bound WB warehouse.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passId` | `number` | ID of the pass to update |
| `data` | [`PassCreateRequest`](../-internal-/interfaces/PassCreateRequest.md) | Updated pass data (full name length must be 6-100 characters, car number allows only letters and digits) |

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

Defined in: [modules/orders-fbs/index.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L188)

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
getOrdersNew(): Promise<OrdersNewResponse>;
```

Defined in: [modules/orders-fbs/index.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L212)

Get list of new assembly tasks

Returns a list of all new assembly tasks available for the seller at the time of request.

#### Returns

`Promise`\<[`OrdersNewResponse`](../-internal-/interfaces/OrdersNewResponse.md)\>

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
orders(options?: GetOrdersParams): Promise<OrdersResponse>;
```

Defined in: [modules/orders-fbs/index.ts:239](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L239)

Get assembly tasks information

Returns assembly task information without their current status.
Data can be retrieved for a given period, up to 30 calendar days per request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`GetOrdersParams`](../-internal-/interfaces/GetOrdersParams-1.md) | Query parameters for pagination and date filtering |

#### Returns

`Promise`\<[`OrdersResponse`](../-internal-/interfaces/OrdersResponse.md)\>

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

### getOrdersReshipment()

```ts
getOrdersReshipment(): Promise<ReshipmentResponse>;
```

Defined in: [modules/orders-fbs/index.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L265)

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

Defined in: [modules/orders-fbs/index.ts:290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L290)

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
createOrdersSticker(options?: StickerParams, data?: StickerRequest): Promise<StickerResponse>;
```

Defined in: [modules/orders-fbs/index.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L322)

Get assembly task stickers

Returns stickers for assembly tasks in SVG, ZPLV, ZPLH, or PNG format.
Maximum 100 stickers per request. Only available for tasks with status `confirm`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`StickerParams`](../-internal-/interfaces/StickerParams.md) | Sticker format and size options |
| `data?` | [`StickerRequest`](../-internal-/interfaces/StickerRequest.md) | Request body containing order IDs |

#### Returns

`Promise`\<[`StickerResponse`](../-internal-/interfaces/StickerResponse.md)\>

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

### deleteOrdersMeta()

```ts
deleteOrdersMeta(orderId: number, options?: DeleteMetaParams): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:353](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L353)

Delete assembly task metadata

Deletes a metadata value for the given key. Only one key can be passed per request.
Supported keys: imei, uin, gtin, sgtin.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `options?` | [`DeleteMetaParams`](../-internal-/interfaces/DeleteMetaParams.md) | Query parameters specifying which metadata key to delete |

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
updateMetaSgtin(orderId: number, data?: MetaSgtinRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:380](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L380)

Attach marking codes (SGTIN) to an assembly task

Attaches product marking codes to an assembly task. Only available when the task metadata
includes the `sgtin` field and the task is in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | [`MetaSgtinRequest`](../-internal-/interfaces/MetaSgtinRequest.md) | Request body containing SGTIN marking codes |

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
updateMetaUin(orderId: number, data?: MetaUinRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:408](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L408)

Attach UIN to an assembly task

Updates the unique identification number (UIN) in the assembly task metadata.
Each task can have only one UIN. Only available for orders delivered by WB in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | [`MetaUinRequest`](../-internal-/interfaces/MetaUinRequest.md) | Request body containing the UIN value |

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
updateMetaImei(orderId: number, data?: MetaImeiRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L436)

Attach IMEI to an assembly task

Updates the IMEI in the assembly task metadata. Each task can have only one IMEI.
If a device has two IMEIs, only provide the primary one. Only available for orders in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | [`MetaImeiRequest`](../-internal-/interfaces/MetaImeiRequest.md) | Request body containing the IMEI value |

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
updateMetaGtin(orderId: number, data?: MetaGtinRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L464)

Attach GTIN to an assembly task

Updates the GTIN (unique product ID for Belarus) in the assembly task metadata.
Each task can have only one GTIN. Only available for orders delivered by WB in `confirm` status.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | [`MetaGtinRequest`](../-internal-/interfaces/MetaGtinRequest.md) | Request body containing the GTIN value |

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
updateMetaExpiration(orderId: number, data?: MetaExpirationRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L492)

Attach expiration date to an assembly task

Sets the product expiration date for an assembly task. Only available for orders delivered
by WB in `confirm` status. To change the date, send a new request. Expiration cannot be removed once set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data?` | [`MetaExpirationRequest`](../-internal-/interfaces/MetaExpirationRequest.md) | Request body containing the expiration date |

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
setCustomsDeclaration(orderId: number, data: MetaCustomsDeclarationRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L523)

Attach customs declaration number to an assembly task

Updates the customs declaration number in the assembly task metadata.
Each task can have only one customs declaration number. Check if the task supports it
by verifying `customsDeclaration` is in the `requiredMeta` field of new orders.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID of the assembly task |
| `data` | [`MetaCustomsDeclarationRequest`](../-internal-/interfaces/MetaCustomsDeclarationRequest.md) | Request body containing the customs declaration number |

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
createStickersCrossBorder(data?: CrossBorderStickerRequest): Promise<CrossBorderStickerResponse>;
```

Defined in: [modules/orders-fbs/index.ts:551](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L551)

Get cross-border assembly task stickers

Returns stickers for cross-border assembly tasks in PDF format.
Maximum 100 stickers per request. Only available for tasks with status `confirm`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | [`CrossBorderStickerRequest`](../-internal-/interfaces/CrossBorderStickerRequest.md) | Request body containing order IDs |

#### Returns

`Promise`\<[`CrossBorderStickerResponse`](../-internal-/interfaces/CrossBorderStickerResponse.md)\>

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

### createStatusHistory()

```ts
createStatusHistory(data?: StatusHistoryRequest): Promise<StatusHistoryResponse>;
```

Defined in: [modules/orders-fbs/index.ts:580](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L580)

Get cross-border assembly task status history

Returns the status history for cross-border assembly tasks.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | [`StatusHistoryRequest`](../-internal-/interfaces/StatusHistoryRequest.md) | Request body containing order IDs |

#### Returns

`Promise`\<[`StatusHistoryResponse`](../-internal-/interfaces/StatusHistoryResponse.md)\>

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

Defined in: [modules/orders-fbs/index.ts:607](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L607)

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
supplies(options?: GetSuppliesParams): Promise<SuppliesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:634](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L634)

Get list of supplies

Returns a paginated list of supplies.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`GetSuppliesParams`](../-internal-/interfaces/GetSuppliesParams.md) | Query parameters for pagination |

#### Returns

`Promise`\<[`SuppliesResponse`](../-internal-/interfaces/SuppliesResponse.md)\>

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
createSupply(data: SupplyCreateRequest): Promise<SupplyCreateResponse>;
```

Defined in: [modules/orders-fbs/index.ts:661](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L661)

Create a new supply

Creates a new supply for FBS assembly tasks. A new supply acquires the cargo type
of the first order added to it. Only orders of the same cargo type can be in one supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SupplyCreateRequest`](../-internal-/interfaces/SupplyCreateRequest.md) | Request body containing the supply name |

#### Returns

`Promise`\<[`SupplyCreateResponse`](../-internal-/interfaces/SupplyCreateResponse.md)\>

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

### getSupply()

```ts
getSupply(supplyId: string): Promise<Supply>;
```

Defined in: [modules/orders-fbs/index.ts:688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L688)

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

Defined in: [modules/orders-fbs/index.ts:713](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L713)

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

### updateSuppliesDeliver()

```ts
updateSuppliesDeliver(supplyId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:757](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L757)

Transfer supply to delivery

Closes a supply and sets all assembly tasks in it to `complete` status.
After closing, no new tasks can be added. The supply must have at least one task.

**Important: Metadata validation.** Returns 409 if order metadata is invalid:
- IMEI validation (enforced since March 31, 2026)
- UIN validation (enforced since April 7, 2026)
- Marking code for B2B orders (enforced since April 9, 2026)

Check `metaDetails` via `getOrdersMetaBulk()` before calling deliver.
Each metaDetail has `key`, `value`, and `decision` (filled/optional/required/invalid).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply to deliver |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

409 — Metadata validation failed. Response contains details of invalid metadata.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/Postavki-FBS](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/Postavki-FBS)

#### Example

```typescript
// Check metadata before deliver
const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [orderId] });
const invalid = meta.orders?.[0]?.metaDetails?.filter(d => d.decision === 'required' && !d.value);
if (invalid?.length) {
  console.log('Fix metadata first:', invalid.map(d => d.key));
} else {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
}
```

***

### getSuppliesBarcode()

```ts
getSuppliesBarcode(supplyId: string, options?: BarcodeParams): Promise<BarcodeResponse>;
```

Defined in: [modules/orders-fbs/index.ts:786](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L786)

Get supply QR code

Returns the supply QR code in SVG, ZPLV, ZPLH, or PNG format (580x400 px).
Only available after the supply has been transferred to delivery.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `options?` | [`BarcodeParams`](../-internal-/interfaces/BarcodeParams.md) | Sticker format options |

#### Returns

`Promise`\<[`BarcodeResponse`](../-internal-/interfaces/BarcodeResponse.md)\>

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
getSuppliesTrbx(supplyId: string): Promise<TrbxListResponse>;
```

Defined in: [modules/orders-fbs/index.ts:812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L812)

Get list of supply boxes (trbx)

Returns the list of boxes for a supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |

#### Returns

`Promise`\<[`TrbxListResponse`](../-internal-/interfaces/TrbxListResponse.md)\>

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
createSuppliesTrbx(supplyId: string, data?: TrbxCreateRequest): Promise<TrbxCreateResponse>;
```

Defined in: [modules/orders-fbs/index.ts:840](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L840)

Add boxes to a supply

Adds the required number of boxes to a supply. Only for supplies shipped to pickup points (PVZ).
Can only be added to an open supply.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `data?` | [`TrbxCreateRequest`](../-internal-/interfaces/TrbxCreateRequest.md) | Request body containing the number of boxes to add |

#### Returns

`Promise`\<[`TrbxCreateResponse`](../-internal-/interfaces/TrbxCreateResponse.md)\>

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
deleteSuppliesTrbx(supplyId: string, data?: TrbxDeleteRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:870](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L870)

Delete boxes from a supply

Removes boxes from a supply. Can only delete while the supply is being assembled.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `data?` | [`TrbxDeleteRequest`](../-internal-/interfaces/TrbxDeleteRequest.md) | Request body containing box IDs to delete |

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
   options?: BarcodeParams, 
   data?: TrbxStickerRequest): Promise<{
  stickers?: TrbxStickers[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:903](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L903)

Get supply box stickers

Returns QR stickers for boxes in SVG, ZPLV, ZPLH, or PNG format (580x400 px).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `options?` | [`BarcodeParams`](../-internal-/interfaces/BarcodeParams.md) | Sticker format options |
| `data?` | [`TrbxStickerRequest`](../-internal-/interfaces/TrbxStickerRequest.md) | Request body containing box IDs |

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

Defined in: [modules/orders-fbs/index.ts:939](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L939)

Get assembly task statuses

Returns statuses of assembly tasks by their IDs.
Replacement for createOrdersStatu with a corrected method name.

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

Defined in: [modules/orders-fbs/index.ts:966](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L966)

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

Defined in: [modules/orders-fbs/index.ts:993](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L993)

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

Defined in: [modules/orders-fbs/index.ts:1020](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/modules/orders-fbs/index.ts#L1020)

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

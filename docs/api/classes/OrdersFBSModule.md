[Wildberries API TypeScript SDK](../modules.md) / OrdersFbsModule

# Class: OrdersFbsModule

Defined in: [modules/orders-fbs/index.ts:55](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L55)

## Constructors

### Constructor

```ts
new OrdersFbsModule(client: BaseClient): OrdersFbsModule;
```

Defined in: [modules/orders-fbs/index.ts:56](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L56)

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

Defined in: [modules/orders-fbs/index.ts:77](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L77)

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

Defined in: [modules/orders-fbs/index.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L102)

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

Defined in: [modules/orders-fbs/index.ts:133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L133)

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

Defined in: [modules/orders-fbs/index.ts:166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L166)

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

Defined in: [modules/orders-fbs/index.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L190)

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

Defined in: [modules/orders-fbs/index.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L214)

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

Defined in: [modules/orders-fbs/index.ts:244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L244)

Get assembly tasks information

Returns assembly task information without their current status.
Data can be retrieved for a given period, up to 30 calendar days per request.

**3-month window:** From 2026-07-21, returns only assembly orders created LESS than
3 months ago. For older orders, use `getOrdersArchive()` (`GET /api/marketplace/v3/fbs/orders/archive`).

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

Defined in: [modules/orders-fbs/index.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L270)

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

Defined in: [modules/orders-fbs/index.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L295)

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

Defined in: [modules/orders-fbs/index.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L327)

Get assembly task stickers

Returns stickers for assembly tasks in SVG, ZPLV, ZPLH, or PNG format.
Maximum 100 stickers per request. Only available for tasks with status `confirm`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`StickerParams`](../-internal-/interfaces/StickerParams-1.md) | Sticker format and size options |
| `data?` | [`StickerRequest`](../-internal-/interfaces/StickerRequest-1.md) | Request body containing order IDs |

#### Returns

`Promise`\<[`StickerResponse`](../-internal-/interfaces/StickerResponse-1.md)\>

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

Defined in: [modules/orders-fbs/index.ts:358](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L358)

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/delete](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/delete)

#### Example

```typescript
await sdk.ordersFBS.deleteOrdersMeta(123456, { key: 'imei' });
```

***

### updateMetaSgtin()

```ts
updateMetaSgtin(orderId: number, data?: MetaSgtinRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L385)

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaSgtin(123456, { sgtins: ['01046009544741002'] });
```

***

### updateMetaUin()

```ts
updateMetaUin(orderId: number, data?: MetaUinRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L413)

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaUin(123456, { uin: 'UIN123456789' });
```

***

### updateMetaImei()

```ts
updateMetaImei(orderId: number, data?: MetaImeiRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L441)

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaImei(123456, { imei: '354567890123456' });
```

***

### updateMetaGtin()

```ts
updateMetaGtin(orderId: number, data?: MetaGtinRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L469)

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaGtin(123456, { gtin: '4600000000001' });
```

***

### updateMetaExpiration()

```ts
updateMetaExpiration(orderId: number, data?: MetaExpirationRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:497](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L497)

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put)

#### Example

```typescript
await sdk.ordersFBS.updateMetaExpiration(123456, { expiration: '2025-12-31' });
```

***

### setCustomsDeclaration()

```ts
setCustomsDeclaration(orderId: number, data: MetaCustomsDeclarationRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L528)

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1customs-declaration/put](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1customs-declaration/put)

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

Defined in: [modules/orders-fbs/index.ts:556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L556)

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

Defined in: [modules/orders-fbs/index.ts:585](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L585)

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

Defined in: [modules/orders-fbs/index.ts:612](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L612)

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

Defined in: [modules/orders-fbs/index.ts:639](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L639)

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

Defined in: [modules/orders-fbs/index.ts:666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L666)

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

Defined in: [modules/orders-fbs/index.ts:693](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L693)

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

Defined in: [modules/orders-fbs/index.ts:718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L718)

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

Defined in: [modules/orders-fbs/index.ts:792](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L792)

Transfer supply to delivery

Closes a supply and sets all assembly tasks in it to `complete` status.
After closing, no new tasks can be added. The supply must have at least one task.

**⚠️ Deadline 2026-06-03 — B2C marking codes (Честный Знак).** WB will validate B2C
marking codes server-side from this date. Codes must be passed in full with GS
separators (ASCII 0x1D) and crypto-tail (код проверки подлинности). Invalid codes
→ HTTP 409 with diagnostic `metaDetails[]` (typed as `MetaValidationFailError`).

**Important: Metadata validation.** Returns 409 if order metadata is invalid:
- IMEI validation (enforced since March 31, 2026)
- UIN validation (enforced since April 7, 2026)
- Marking code for B2B orders (enforced since April 9, 2026)
- Marking code for B2C orders via Честный Знак (enforced from June 3, 2026)

Check `metaDetails` via `getOrdersMetaBulk()` before calling deliver.
Each metaDetail has `key`, `value`, and `decision` (filled/optional/required/invalid).

**Rate limit penalty**: each 409 response counts as 10 requests against the
FBS supply/order rate-limit budget. Use pre-flight validation to avoid burning budget.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply to deliver |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success

#### Throws

409 — Metadata validation failed (thrown as MetaValidationFailError exposes
  `metaDetails[]` with per-code diagnostics). Falls back to [WBAPIError](WBAPIError.md) for 409s
  without `metaDetails` (e.g. supply has zero orders).

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

 - [https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/Postavki-FBS](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/Postavki-FBS)
 - [FBS marking guide](https://dev.wildberries.ru/knowledge-base/articles/019e9273-118b-7b69-a25a-ea1d756f05d9/rabota-s-markirovkoi-po-modeli-fbs)
 - [Migration guide](../_media/fbs-marking-code-validation.md)

#### Examples

```typescript
import { WildberriesSDK, MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';

// Pattern A: pre-flight via getOrdersMetaBulk (cheap, no 10x penalty)
const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [12345] }); // example order ID
const invalid = meta.orders?.[0]?.metaDetails?.filter(d => d.decision === 'required' || d.decision === 'invalid');
if (invalid?.length) {
  console.log('Fix metadata first:', invalid.map(d => d.key));
} else {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
}
```

```typescript
import { WildberriesSDK, MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';

// Pattern B: typed catch
try {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
} catch (err) {
  if (err instanceof MetaValidationFailError) {
    err.metaDetails.forEach(d => console.log(d.key, d.value, d.decision));
  }
  throw err;
}
```

***

### getSuppliesBarcode()

```ts
getSuppliesBarcode(supplyId: string, options?: BarcodeParams): Promise<BarcodeResponse>;
```

Defined in: [modules/orders-fbs/index.ts:821](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L821)

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

Defined in: [modules/orders-fbs/index.ts:847](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L847)

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

Defined in: [modules/orders-fbs/index.ts:875](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L875)

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

Defined in: [modules/orders-fbs/index.ts:905](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L905)

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

Defined in: [modules/orders-fbs/index.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L938)

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

Defined in: [modules/orders-fbs/index.ts:974](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L974)

Get assembly task statuses

Returns statuses of assembly tasks by their IDs.
Replacement for the deprecated createOrdersStatus method with a corrected name.

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

Defined in: [modules/orders-fbs/index.ts:1001](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L1001)

Get metadata for multiple assembly tasks

Returns metadata for multiple assembly tasks (up to 100).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`GetMetaMultiRequest`](../-internal-/interfaces/GetMetaMultiRequest.md) | Request body containing order IDs (max 100) |

#### Returns

`Promise`\<[`OrdersMetaResponse`](../interfaces/OrdersMetaResponse.md)\>

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

[https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1marketplace~1v3~1orders~1meta/post](https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1marketplace~1v3~1orders~1meta/post)

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

Defined in: [modules/orders-fbs/index.ts:1028](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L1028)

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

Defined in: [modules/orders-fbs/index.ts:1055](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L1055)

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

***

### getOrdersArchive()

```ts
getOrdersArchive(params: ArchiveOrdersParams): Promise<ArchiveOrdersResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1094](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/orders-fbs/index.ts#L1094)

Get archived FBS assembly orders

Returns a paginated list of archived FBS assembly orders for a given year/month period.
Use the `next` cursor from the response to fetch subsequent pages; pagination is exhausted
when `next` is `null`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`ArchiveOrdersParams`](../-internal-/interfaces/ArchiveOrdersParams.md) | Query parameters (year, month, next cursor, limit) |

#### Returns

`Promise`\<[`ArchiveOrdersResponse`](../-internal-/interfaces/ArchiveOrdersResponse.md)\>

Promise resolving to archived orders with the next pagination cursor

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://openapi.wildberries.ru/#tag/Zakazy-FBS/paths/~1api~1marketplace~1v3~1fbs~1orders~1archive/get](https://openapi.wildberries.ru/#tag/Zakazy-FBS/paths/~1api~1marketplace~1v3~1fbs~1orders~1archive/get)

#### Example

```typescript
const result = await sdk.ordersFBS.getOrdersArchive({
  year: 2025,
  month: 6,
  next: 0,
  limit: 100,
});
console.log(result.orders);
// Fetch the next page using the returned cursor:
if (result.next !== null) {
  const next = await sdk.ordersFBS.getOrdersArchive({
    year: 2025, month: 6, next: result.next, limit: 100,
  });
}
```

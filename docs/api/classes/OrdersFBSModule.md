[Wildberries API TypeScript SDK](../modules.md) / OrdersFbsModule

# Class: OrdersFbsModule

Defined in: [modules/orders-fbs/index.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L70)

## Constructors

### Constructor

```ts
new OrdersFbsModule(client: BaseClient): OrdersFbsModule;
```

Defined in: [modules/orders-fbs/index.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L71)

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

Defined in: [modules/orders-fbs/index.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L92)

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

Defined in: [modules/orders-fbs/index.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L117)

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

Defined in: [modules/orders-fbs/index.ts:148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L148)

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

Defined in: [modules/orders-fbs/index.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L181)

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

Defined in: [modules/orders-fbs/index.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L205)

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

Defined in: [modules/orders-fbs/index.ts:235](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L235)

Get list of new assembly tasks

Returns a list of all new assembly tasks available for the seller at the time of request.

**`requiredMeta` field:** each order lists the label identifiers (metadata) that MUST be
attached before its supply can be transferred to delivery — e.g. `['uin', 'sgtin']`,
`['customsDeclaration']`. Check it before attaching a customs-declaration (ДТ) number:
if `customsDeclaration` is present, the order needs a ДТ (via [setCustomsDeclaration](#setcustomsdeclaration),
`confirm` status only) or stickers will fail with 409 `CustomsDeclarationIsRequired`.

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

Defined in: [modules/orders-fbs/index.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L266)

Get assembly tasks information

Returns assembly task information without their current status.
Data can be retrieved for a given period, up to 30 calendar days per request.

**3-month window:** effective since the night of 2026-08-05→06 (date moved from the
originally announced 2026-07-21), returns only assembly orders created LESS than
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

Defined in: [modules/orders-fbs/index.ts:292](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L292)

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

Defined in: [modules/orders-fbs/index.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L317)

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

Defined in: [modules/orders-fbs/index.ts:357](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L357)

Get assembly task stickers

Returns stickers for assembly tasks in SVG, ZPLV, ZPLH, or PNG format.
Maximum 100 stickers per request. Only available for tasks with status `confirm`.

**⚠️ 409 `CustomsDeclarationIsRequired` (since 2026-08-18).** If at least one assembly
order in `data.orders` lacks a required customs-declaration (ДТ) number, WB returns
HTTP 409 and **stickers cannot be obtained** for the batch. Attach the missing ДТ via
[setCustomsDeclaration](#setcustomsdeclaration) (order must be in `confirm` status) and retry.
Check `requiredMeta` in [getOrdersNew](#getordersnew) to see whether an order requires a ДТ.
Thrown as a typed `CustomsDeclarationIsRequiredError`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`StickerParams`](../-internal-/interfaces/StickerParams-1.md) | Sticker format and size options |
| `data?` | [`StickerRequest`](../-internal-/interfaces/StickerRequest-1.md) | Request body containing order IDs |

#### Returns

`Promise`\<[`StickerResponse`](../-internal-/interfaces/StickerResponse-1.md)\>

Promise resolving to stickers response

#### Throws

409 — at least one order lacks a required customs declaration (ДТ); stickers cannot be obtained until it is attached

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

Defined in: [modules/orders-fbs/index.ts:388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L388)

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

Defined in: [modules/orders-fbs/index.ts:415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L415)

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

Defined in: [modules/orders-fbs/index.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L443)

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

Defined in: [modules/orders-fbs/index.ts:471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L471)

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

Defined in: [modules/orders-fbs/index.ts:499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L499)

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

Defined in: [modules/orders-fbs/index.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L527)

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

Defined in: [modules/orders-fbs/index.ts:565](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L565)

Attach customs declaration number to an assembly task

Updates the customs declaration number in the assembly task metadata.
Each task can have only one customs declaration number. Check if the task supports it
by verifying `customsDeclaration` is in the `requiredMeta` field of new orders
([getOrdersNew](#getordersnew)) and in the label identifiers returned by [getOrdersMetaBulk](#getordersmetabulk).

**⚠️ `confirm` status only (since 2026-08-18).** A customs-declaration (ДТ) number can
be attached **only to assembly orders in `confirm` status**.

**⚠️ Armenia sellers.** A ДТ **must** be specified for items produced **outside the EAEU**
when an order from Armenia is delivered to the Russian Federation.

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

Defined in: [modules/orders-fbs/index.ts:593](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L593)

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

Defined in: [modules/orders-fbs/index.ts:622](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L622)

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

Defined in: [modules/orders-fbs/index.ts:649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L649)

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

Defined in: [modules/orders-fbs/index.ts:676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L676)

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

### getSupplies()

```ts
getSupplies(options?: GetSuppliesParams): Promise<SuppliesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:703](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L703)

List FBO supplies (alias for `supplies()`)

Thin alias kept for naming consistency with `getSupply()`, so the
`getSupply` / `getSupplies` pair reads naturally and is easier to discover.

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
const result = await sdk.ordersFBS.getSupplies({ limit: 100, next: 0 });
console.log(result.supplies);
```

***

### createSupply()

```ts
createSupply(data: SupplyCreateRequest): Promise<SupplyCreateResponse>;
```

Defined in: [modules/orders-fbs/index.ts:727](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L727)

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

Defined in: [modules/orders-fbs/index.ts:754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L754)

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

Defined in: [modules/orders-fbs/index.ts:779](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L779)

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

Defined in: [modules/orders-fbs/index.ts:857](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L857)

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
- Missing customs declaration (ДТ) — 409 `MetaValidationFail` with a `customsDeclaration`
  entry whose `decision` is `'required'` (since 2026-08-18). Attach it via
  `setCustomsDeclaration()` (order must be in `confirm` status), then retry.

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
  `metaDetails[]` with per-code diagnostics), including `decision: 'required'` on the
  `customsDeclaration` key when a required ДТ is missing. Falls back to [WBAPIError](WBAPIError.md) for 409s
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

Defined in: [modules/orders-fbs/index.ts:886](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L886)

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

Defined in: [modules/orders-fbs/index.ts:912](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L912)

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

Defined in: [modules/orders-fbs/index.ts:940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L940)

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

Defined in: [modules/orders-fbs/index.ts:970](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L970)

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

Defined in: [modules/orders-fbs/index.ts:1003](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1003)

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

Defined in: [modules/orders-fbs/index.ts:1039](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1039)

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

Defined in: [modules/orders-fbs/index.ts:1072](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1072)

Get metadata for multiple assembly tasks

Returns metadata for multiple assembly tasks (up to 100).

**`decision` field semantics:** each `metaDetails[]` entry carries a `decision` —
`'filled'` and `'optional'` mean the order is **OK to deliver**; `'required'` (value
missing) **blocks delivery** (409 on `updateSuppliesDeliver`); `'invalid'` means the
submitted value failed validation. For the `customsDeclaration` key, `'required'`
means a ДТ must be attached via [setCustomsDeclaration](#setcustomsdeclaration) before deliver/stickers.

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

Defined in: [modules/orders-fbs/index.ts:1099](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1099)

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

### transferSupplyOrders()

```ts
transferSupplyOrders(supplyId: string, data: TransferSupplyOrdersRequest): Promise<TransferOrdersToAssemblyResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1151)

Transfer orders from supply to assembly

Moves assembly orders from the `complete` status — in delivery — back to
the `confirm` status — in assembly. Use it to move an assembly order from
a closed supply to an open one.

An assembly order can be moved from delivery to assembly only when ALL
conditions are met:
- the assembly order is in the `complete` status — in delivery;
- the supply the order is moved to (`newSupplyId`) is **not** transferred
  to delivery;
- the assembly order has not previously been moved from delivery to
  assembly.

Check eligibility beforehand via `getOrderStatuses()` — the
`isTransferable` field. The result is returned per order: each
`transferredOrders[]` entry carries either `success: true` with the new
sticker ID, or `error { code, detail }`.

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a
4XX response counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply the orders are moved FROM |
| `data` | [`TransferSupplyOrdersRequest`](../-internal-/interfaces/TransferSupplyOrdersRequest.md) | Order IDs and the target supply ID |

#### Returns

`Promise`\<[`TransferOrdersToAssemblyResponse`](../-internal-/interfaces/TransferOrdersToAssemblyResponse.md)\>

Per-order transfer results

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer)

#### Since

task-241

#### Example

```typescript
const result = await sdk.ordersFBS.transferSupplyOrders('WB-GI-100', {
  orderIds: [5678954321, 5457166056],
  newSupplyId: 'WB-GI-200',
});
for (const order of result.transferredOrders ?? []) {
  if (!order.success) console.error(order.orderId, order.error?.detail);
}
```

***

### getSupplyOrderIds()

```ts
getSupplyOrderIds(supplyId: string): Promise<SupplyOrderIdsResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1181)

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

Defined in: [modules/orders-fbs/index.ts:1220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1220)

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

***

### getSpotCountries()

```ts
getSpotCountries(): Promise<SpotCountriesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1256)

Get the OKSM country list

Returns the list of OKSM (All-Russian Classifier of World Countries) countries
with their full names and 3-digit codes. Use these codes as `carrierCountryCode`
when adding SPOT data via `updateSupplySpot()`.

**Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
WB plans to extend it to all EAEU countries except the Russian Federation.

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
response counts as 10 requests.

#### Returns

`Promise`\<[`SpotCountriesResponse`](../-internal-/interfaces/SpotCountriesResponse.md)\>

Promise resolving to the OKSM countries list

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsDictionariesCountriesOksm](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsDictionariesCountriesOksm)

#### Example

```typescript
const { countries } = await sdk.ordersFBS.getSpotCountries();
const byName = countries.find(c => c.name === 'Киргизия');
```

***

### updateSupplySpot()

```ts
updateSupplySpot(supplyId: string, data: SupplySpotRequest): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:1299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1299)

Add SPOT data to a supply

Adds SPOT (EAEU road-import declaration) data to a supply. SPOT can only be added
to a supply carrying the `"spotAvailable": true` flag — check it via `getSupply()`
or `supplies()` first.

`carrierCountryCode` must be a 3-digit OKSM code from `getSpotCountries()`.

**Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
WB plans to extend it to all EAEU countries except the Russian Federation.

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
response (including the 409 below) counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |
| `data` | [`SupplySpotRequest`](../-internal-/interfaces/SupplySpotRequest.md) | SPOT data (carrier and vehicle details) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void on success (204)

#### Throws

409 — error while adding SPOT data (e.g. `SpotActionNotAllowed` when SPOT is not available for this supply)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/putV3FbsSuppliesSupplyIdSpot](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/putV3FbsSuppliesSupplyIdSpot)

#### Example

```typescript
await sdk.ordersFBS.updateSupplySpot('WB-GI-123456789', {
  carrierName: 'ООО СПОТ',
  carrierTaxNumber: '7588179007',
  carrierCountryCode: '112',
  vehicleRegistrationNumber: 'А123АА100',
  trailerRegistrationNumber: 'АА000100',
});
```

***

### getSuppliesSpotList()

```ts
getSuppliesSpotList(data: SuppliesSpotListRequest): Promise<SuppliesSpotListResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1341)

Get SPOT data for a list of supplies

Returns SPOT data for up to 100 supplies per request. SPOT data is returned only
when **all** of the following conditions are met:
- the supply is in the delivery stage
- the seller is registered in any EAEU country other than the Russian Federation
- the destination warehouse is located in the Russian Federation

**Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
WB plans to extend it to all EAEU countries except the Russian Federation.

Each entry carries either `spot` (echo of the submitted SPOT data plus the DOPP
formation `status`) or `error` (e.g. `NotFound`, `SpotActionNotAllowed`).

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
response counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SuppliesSpotListRequest`](../-internal-/interfaces/SuppliesSpotListRequest.md) | Request body containing supply IDs (1-100) |

#### Returns

`Promise`\<[`SuppliesSpotListResponse`](../-internal-/interfaces/SuppliesSpotListResponse.md)\>

Promise resolving to SPOT data per requested supply

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList)

#### Example

```typescript
const result = await sdk.ordersFBS.getSuppliesSpotList({
  supplyIds: ['WB-GI-123456789'],
});
const readyForQr = result.supplies.filter(s => s.spot?.status === 'completed');
```

***

### getSupplySpotStickers()

```ts
getSupplySpotStickers(supplyId: string): Promise<SupplySpotStickerResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1376](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1376)

Get the supply SPOT QR code

Returns the generated SPOT QR code for the supply in PNG format, base64 encoded.
Available only when `getSuppliesSpotList()` reports `"status": "completed"` for
the supply (DOPP formed successfully).

**Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
WB plans to extend it to all EAEU countries except the Russian Federation.

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
response counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID of the supply |

#### Returns

`Promise`\<[`SupplySpotStickerResponse`](../-internal-/interfaces/SupplySpotStickerResponse.md)\>

Promise resolving to the base64-encoded PNG QR code

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdStickersSpot](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdStickersSpot)

#### Example

```typescript
const { qrCode } = await sdk.ordersFBS.getSupplySpotStickers('WB-GI-123456789');
fs.writeFileSync('spot-qr.png', Buffer.from(qrCode, 'base64'));
```

***

### ~~getShippingPoints()~~

```ts
getShippingPoints(params: ShippingPointsParams): Promise<ShippingPointsResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1434)

Get supply shipping points

Returns the supply shipping points available to the seller, filtered by
Russian locality (`city`, Cyrillic) and by the type of items the point can
accept (`cargoType`: 1 — small-sized, 2 — ODC, 3 — CD+). Each point reports
whether the **Fulfillment in SC** service is available (`fulfillment`).

Use the returned `id` values as `shippingPointId` when setting the supply
shipping method via `updateShippingMethod()`.

**WB disables this method on November 20, 2026** ([release note](https://dev.wildberries.ru/en/release-notes?id=585)).
Use [OrdersFbsModule.getSupplyShippingPoints](#getsupplyshippingpoints) — it returns the points
available for the specified supply.

**Availability**: for sellers registered in the Russian Federation only,
since 2026-09-01.

**Important**: from **2026-10-01** supply shipping parameters are mandatory —
`updateSuppliesDeliver()` (PATCH `/api/v3/supplies/{supplyId}/deliver`)
returns a **409** error for supplies delivered without them. For
`"shippingType":"transportCompany"` deliveries an electronic waybill ID
(ETrN) is required as well — see the waybill note in `updateShippingMethod()`.

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
response counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`ShippingPointsParams`](../-internal-/interfaces/ShippingPointsParams.md) | Filters: locality (Cyrillic) and cargo type |

#### Returns

`Promise`\<[`ShippingPointsResponse`](../-internal-/interfaces/ShippingPointsResponse.md)\>

Promise resolving to the available shipping points

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### Deprecated

WB отключает GET /api/marketplace/v3/fbs/shipping-points 20 ноября 2026 года.
Используйте [OrdersFbsModule.getSupplyShippingPoints](#getsupplyshippingpoints). Метод будет удалён в v5 (task-245).

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsShippingPoints](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsShippingPoints)

#### Since

task-198

#### Example

```typescript
const { shippingPoints } = await sdk.ordersFBS.getShippingPoints({
  city: 'Москва',
  cargoType: 1,
});
const withFulfillment = shippingPoints.filter(p => p.fulfillment);
```

***

### getSupplyShippingPoints()

```ts
getSupplyShippingPoints(supplyId: string, params: SupplyShippingPointsParams): Promise<SupplyShippingPointsResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1492)

Get supply shipping points (per-supply)

Returns the shipping points available for the **specified supply**, filtered
by Russian locality (`city`, Cyrillic) and point type (`officeType` —
comma-separated list of `sc`, `sw`, `pp`, `pfc`, `gpp`). Unlike the
deprecated global list, per-supply availability replaces the `cargoType`
filter: each point reports `available` (`false` for a pickup point
overloaded on the planned shipping date).

`shippingDt` (YYYY-MM-DD) is required for supplies of small-sized items
(`cargoType: 1`) and dimensional cargo+ (`cargoType: 3`); when passed,
only points that can ship the supply on that date are returned.

Use the returned `id` values as `shippingPointId` in
`updateShippingMethod()`.

Replaces the deprecated [OrdersFbsModule.getShippingPoints](#getshippingpoints)
(GET `/api/marketplace/v3/fbs/shipping-points`), which WB disables on
**November 20, 2026**.

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a
4XX response counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | Supply ID (e.g. 'WB-GI-100') |
| `params` | [`SupplyShippingPointsParams`](../-internal-/interfaces/SupplyShippingPointsParams.md) | Filters: `city` (required), `officeType` (required, comma-list), `shippingDt` (optional) |

#### Returns

`Promise`\<[`SupplyShippingPointsResponse`](../-internal-/interfaces/SupplyShippingPointsResponse.md)\>

Promise resolving to the shipping points available for this supply

#### Throws

404 — supply not found; 409 — no assembly orders in the supply

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdShippingPoints](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdShippingPoints)

#### Since

task-240

#### Example

```typescript
const { shippingPoints } = await sdk.ordersFBS.getSupplyShippingPoints(
  'WB-GI-100',
  { city: 'Москва', officeType: 'sc,pp' }
);
const ok = shippingPoints.filter(p => p.available);
```

***

### updateShippingMethod()

```ts
updateShippingMethod(data: UpdateSuppliesShippingMethodRequest): Promise<UpdateSuppliesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1556)

Set the supply shipping method

Sets the shipping type, shipping date and shipping point for up to 100
supplies per request; the processing result is returned for each supply
separately (`results[]` with `success` or `error`, e.g. `NotFound`,
`InvalidShippingDt`, `FulfillmentRequired`).

Get `shippingPointId` from `getSupplyShippingPoints()`. The shipping method can be
updated only until the supply and its boxes are scanned at the shipping
point — after that this method returns a 409 error.

For `"shippingType":"transportCompany"` the electronic waybill ID (ETrN)
must be attached to the supply as well — see `updateSuppliesWaybill()`.
The waybill ID added to a supply is reset when the shipping type
changes from `transportCompany` to `selfShipping`; changing it back to
`transportCompany` requires re-adding the waybill ID.

**Availability**: for sellers registered in the Russian Federation only,
since 2026-09-01.

**Important**: from **2026-10-01** supply shipping parameters are mandatory —
`updateSuppliesDeliver()` (PATCH `/api/v3/supplies/{supplyId}/deliver`)
returns a **409** error for supplies delivered without them (and without an
ETrN id for transport-company deliveries).

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
response (including the 409s below) counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`UpdateSuppliesShippingMethodRequest`](../-internal-/interfaces/UpdateSuppliesShippingMethodRequest.md) | Shipping parameters per supply (1-100 items) |

#### Returns

`Promise`\<[`UpdateSuppliesResponse`](../-internal-/interfaces/UpdateSuppliesResponse.md)\>

Promise resolving to the per-supply processing results

#### Throws

409 — supply already scanned at the shipping point, or the waybill UUID is already used (`WaybillUUIDConflict`)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod)

#### Since

task-198

#### Example

```typescript
const result = await sdk.ordersFBS.updateShippingMethod({
  data: [
    {
      supplyId: 'WB-GI-100',
      shippingDt: '2026-09-05',
      shippingPointId: 100,
      shippingType: 'selfShipping',
    },
  ],
});
const failed = result.results.filter(r => !r.success);
```

***

### updateSuppliesWaybill()

```ts
updateSuppliesWaybill(data: UpdateSuppliesWaybillRequest): Promise<UpdateSuppliesResponse>;
```

Defined in: [modules/orders-fbs/index.ts:1622](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/modules/orders-fbs/index.ts#L1622)

Set the supply electronic waybill ID (ETrN)

Attaches an electronic waybill (ЭТрН) ID to up to 100 supplies per
request; the processing result is returned for each supply separately
(`results[]` with `success` or `error`).

Prerequisites:
- the supply shipping method must be set to `"shippingType":"transportCompany"`
  via `updateShippingMethod()` — otherwise the method returns a `409`
  `SupplyShippingRequired` (no shipping parameters) or `UnsuitableShippingType`
  (different shipping type);
- the supply must not be scanned at the shipping point yet — the waybill ID
  can be updated only until the supply and its boxes are scanned; after
  scanning the method returns a `409` `SupplyAlreadyScanned`.

While a previously submitted waybill UUID is still being processed, a new
request for the same supply returns a `409` `WaybillUUIDIsProcessing`.
The waybill ID is reset when the shipping type changes from
`transportCompany` to `selfShipping`; changing it back requires re-adding
the waybill ID.

**Availability**: for sellers registered in the Russian Federation only.
From **2026-10-01** an ETrN ID is mandatory for transport-company
deliveries — `updateSuppliesDeliver()` returns a **409** without it.

**Status**: WB published this method spec with availability announced
separately (initially "in development") — until the backend is enabled on
the seller account the method may respond with 404. Follow the WB news.

**Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
response (including the 409s above) counts as 10 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`UpdateSuppliesWaybillRequest`](../-internal-/interfaces/UpdateSuppliesWaybillRequest.md) | Electronic waybill data per supply (1-100 items) |

#### Returns

`Promise`\<[`UpdateSuppliesResponse`](../-internal-/interfaces/UpdateSuppliesResponse.md)\>

Promise resolving to the per-supply processing results

#### Throws

409 — supply already scanned (`SupplyAlreadyScanned`), shipping parameters missing (`SupplyShippingRequired`), shipping type is not `transportCompany` (`UnsuitableShippingType`), or the previous waybill UUID is still processing (`WaybillUUIDIsProcessing`)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesWaybill](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesWaybill)

#### Since

task-208

#### Example

```typescript
const result = await sdk.ordersFBS.updateSuppliesWaybill({
  data: [
    {
      supplyId: 'WB-GI-100',
      waybillUuid: '550e8400-e29b-41d4-a716-445676543567',
    },
  ],
});
const failed = result.results.filter(r => !r.success);
```

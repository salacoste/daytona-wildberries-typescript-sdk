[Wildberries API TypeScript SDK](../modules.md) / InStorePickupModule

# Class: InStorePickupModule

Defined in: [modules/in-store-pickup/index.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L41)

## Constructors

### Constructor

```ts
new InStorePickupModule(client: BaseClient): InStorePickupModule;
```

Defined in: [modules/in-store-pickup/index.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`InStorePickupModule`

## Methods

### getOrdersNew()

```ts
getOrdersNew(): Promise<ApiNewOrders>;
```

Defined in: [modules/in-store-pickup/index.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L58)

Получить список новых сборочных заданий

Метод возвращает список всех новых сборочных заданий, которые есть у продавца на момент запроса.

#### Returns

`Promise`\<[`ApiNewOrders`](../-internal-/interfaces/ApiNewOrders.md)\>

Список новых сборочных заданий

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.inStorePickup.getOrdersNew();
console.log(result);
```

***

### confirmBulk()

```ts
confirmBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L83)

Перевести на сборку (batch)

Moves up to 1000 assembly orders to `confirm` status in a single request.
Replaces the dead single-order PATCH `.../orders/{id}/confirm` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of assembly order IDs (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

Per-order confirmation results

#### Throws

When orderIds array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.confirmBulk([123456, 234567]);
```

***

### prepareBulk()

```ts
prepareBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L116)

Сообщить, что сборочное задание готово к выдаче (batch)

Moves up to 1000 assembly orders to `prepare` status (ready for pickup).
Replaces the dead single-order PATCH `.../orders/{id}/prepare` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of assembly order IDs (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

Per-order results

#### Throws

When orderIds array is empty or exceeds 1000

#### Throws

When B2B marking validation fails (409 — Chestny ZNAK; use checkMetaValidation for pre-flight)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.prepareBulk([123456, 234567]);
```

***

### createOrdersClient()

```ts
createOrdersClient(data: ApiOrdersRequest): Promise<ApiOrderClientInfoResp>;
```

Defined in: [modules/in-store-pickup/index.ts:146](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L146)

Информация о покупателе

Метод возвращает информацию о покупателе по ID сборочного задания.
Доступно только для сборочных заданий в статусах confirm и prepare.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ApiOrdersRequest`](../-internal-/interfaces/ApiOrdersRequest.md) | Request body data |

#### Returns

`Promise`\<[`ApiOrderClientInfoResp`](../-internal-/interfaces/ApiOrderClientInfoResp.md)\>

Информация о покупателе

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.inStorePickup.createOrdersClient({ orders: [12345] });
console.log(result);
```

***

### createClientIdentity()

```ts
createClientIdentity(data: ApiCheckIdentityRequest): Promise<ApiCheckedIdentity>;
```

Defined in: [modules/in-store-pickup/index.ts:170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L170)

Проверить, что заказ принадлежит покупателю

Метод сообщает, принадлежит ли проверяемый заказ покупателю или нет по переданному коду.
Доступно, если хотя бы одно сборочное задание из заказа находится в статусе prepare.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ApiCheckIdentityRequest`](../-internal-/interfaces/ApiCheckIdentityRequest.md) | Request body data |

#### Returns

`Promise`\<[`ApiCheckedIdentity`](../-internal-/interfaces/ApiCheckedIdentity.md)\>

Результат проверки идентификации

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.inStorePickup.createClientIdentity({ orderCode: '170046918-0011', passcode: '4567' });
console.log(result);
```

***

### receiveBulk()

```ts
receiveBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L198)

Сообщить, что заказ принят покупателем (batch)

Moves up to 1000 assembly orders to `receive` status (received by buyer).
Replaces the dead single-order PATCH `.../orders/{id}/receive` path.

NOTE: pickup `receive` takes NO passcodes (unlike DBS) — just order IDs.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of assembly order IDs (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

Per-order results

#### Throws

When orderIds array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.receiveBulk([123456, 234567]);
```

***

### rejectBulk()

```ts
rejectBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L232)

Сообщить, что покупатель отказался от заказа (batch)

Moves up to 1000 assembly orders to `reject` status (buyer refused).
Replaces the dead single-order PATCH `.../orders/{id}/reject` path.

NOTE: pickup `reject` takes NO passcodes (unlike DBS) — just order IDs.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of assembly order IDs (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

Per-order results

#### Throws

When orderIds array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.rejectBulk([123456, 234567]);
```

***

### getStatusesBulk()

```ts
getStatusesBulk(orderIds: number[]): Promise<GetStatusInfoResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L264)

Получить статусы сборочных заданий (batch)

Returns statuses for up to 1000 assembly orders in a single request.
Replaces the dead single-batch POST `.../orders/status` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of assembly order IDs (1-1000 items) |

#### Returns

`Promise`\<[`GetStatusInfoResponse`](../-internal-/interfaces/GetStatusInfoResponse.md)\>

Status information for each order

#### Throws

When orderIds array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.getStatusesBulk([123456, 234567]);
```

***

### getClickCollectOrders()

```ts
getClickCollectOrders(options?: {
  limit: number;
  next: number;
  dateFrom: number;
  dateTo: number;
}): Promise<ApiOrders>;
```

Defined in: [modules/in-store-pickup/index.ts:294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L294)

Получить информацию о завершённых сборочных заданиях

Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа.
Можно получить данные за заданный период, максимум 30 календарных дней одним запросом.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `next`: `number`; `dateFrom`: `number`; `dateTo`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.next?` | `number` | - |
| `options.dateFrom?` | `number` | - |
| `options.dateTo?` | `number` | - |

#### Returns

`Promise`\<[`ApiOrders`](../-internal-/interfaces/ApiOrders.md)\>

Список завершённых сборочных заданий

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.inStorePickup.getClickCollectOrders({ limit: 10, next: 0, dateFrom: 0, dateTo: 0 });
console.log(result);
```

***

### cancelBulk()

```ts
cancelBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:324](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L324)

Отменить сборочное задание (batch)

Moves up to 1000 assembly orders to `cancel` status (canceled by seller).
Replaces the dead single-order PATCH `.../orders/{id}/cancel` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of assembly order IDs (1-1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

Per-order results

#### Throws

When orderIds array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.cancelBulk([123456, 234567]);
```

***

### getMetaBulk()

```ts
getMetaBulk(request: GetMetaBulkRequest): Promise<GetOrderMetaBulkResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:356](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L356)

Получить идентификаторы маркировки сборочных заданий (batch)

Returns label identifiers for up to 1000 assembly orders in a single request.
Replaces the dead single-order GET `.../orders/{id}/meta` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`GetMetaBulkRequest`](../-internal-/interfaces/GetMetaBulkRequest.md) | Request with order IDs (max 1000) |

#### Returns

`Promise`\<[`GetOrderMetaBulkResponse`](../-internal-/interfaces/GetOrderMetaBulkResponse.md)\>

Label identifiers for each order

#### Throws

When ordersIds array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.getMetaBulk({ ordersIds: [123456] });
```

***

### deleteMetaBulk()

```ts
deleteMetaBulk(request: DeleteMetaBulkRequest): Promise<DeleteMetaBulkResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L389)

Удалить идентификаторы маркировки сборочных заданий (batch)

Deletes one label-identifier type (imei/uin/gtin/sgtin/customsDeclaration)
for up to 1000 assembly orders. Replaces the dead single-order DELETE
`.../orders/{id}/meta` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`DeleteMetaBulkRequest`](../-internal-/interfaces/DeleteMetaBulkRequest.md) | Request with key + order IDs (max 1000) |

#### Returns

`Promise`\<[`DeleteMetaBulkResponse`](../-internal-/interfaces/DeleteMetaBulkResponse.md)\>

Per-order results

#### Throws

When ordersIds array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.deleteMetaBulk({ key: 'imei', ordersIds: [123456] });
```

***

### setSgtinBulk()

```ts
setSgtinBulk(request: SetSgtinBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:423](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L423)

Закрепить за сборочными заданиями коды маркировки SGTIN (batch)

Sets Chestny ZNAK labeling codes for up to 1000 assembly orders.
Replaces the dead single-order PUT `.../orders/{id}/meta/sgtin` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetSgtinBulkRequest`](../-internal-/interfaces/SetSgtinBulkRequest.md) | Orders with SGTIN codes (max 1000) |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

Per-order results

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.setSgtinBulk({
  orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }]
});
```

***

### setUinBulk()

```ts
setUinBulk(request: SetUinBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L451)

Закрепить за сборочными заданиями УИН (batch)

Sets UIN values for up to 1000 assembly orders. Replaces the dead
single-order PUT `.../orders/{id}/meta/uin` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetUinBulkRequest`](../-internal-/interfaces/SetUinBulkRequest.md) | Orders with UIN values (max 1000) |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

Per-order results

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.setUinBulk({
  orders: [{ orderId: 123456, uin: '1234567890123456' }]
});
```

***

### setImeiBulk()

```ts
setImeiBulk(request: SetImeiBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:479](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L479)

Закрепить за сборочными заданиями IMEI (batch)

Sets IMEI values for up to 1000 assembly orders. Replaces the dead
single-order PUT `.../orders/{id}/meta/imei` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetImeiBulkRequest`](../-internal-/interfaces/SetImeiBulkRequest.md) | Orders with IMEI values (max 1000) |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

Per-order results

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.setImeiBulk({
  orders: [{ orderId: 123456, imei: '123456789012345' }]
});
```

***

### setGtinBulk()

```ts
setGtinBulk(request: SetGtinBulkRequest): Promise<SetMetaBulkResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L507)

Закрепить за сборочными заданиями GTIN (batch)

Sets GTIN values for up to 1000 assembly orders. Replaces the dead
single-order PUT `.../orders/{id}/meta/gtin` path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetGtinBulkRequest`](../-internal-/interfaces/SetGtinBulkRequest.md) | Orders with GTIN values (max 1000) |

#### Returns

`Promise`\<[`SetMetaBulkResponse`](../-internal-/interfaces/SetMetaBulkResponse.md)\>

Per-order results

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

3.17.0

#### Example

```typescript
const result = await sdk.inStorePickup.setGtinBulk({
  orders: [{ orderId: 123456, gtin: '1234567890123' }]
});
```

***

### checkMetaValidation()

```ts
checkMetaValidation(orders: number[]): Promise<CheckMetaValidationResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:541](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L541)

Check marking-metadata validation (B2B Chestny ZNAK pre-flight)

Returns label-identifier validation statuses for assembly orders. Call BEFORE
transferring an order to `prepare` to identify orders that would get 409
MetaValidationFail. WB deprecated bulk `POST .../meta/info` on July 15 —
use this `meta/details` method instead.

Rate limit: 150 req/min, 400ms interval, burst 20 (4XX×10 penalty)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orders` | `number`[] | Array of assembly order IDs (max 1000) |

#### Returns

`Promise`\<[`CheckMetaValidationResponse`](../-internal-/interfaces/CheckMetaValidationResponse.md)\>

Per-order label identifiers + validation statuses

#### Throws

When orders array is empty or exceeds 1000

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Since

3.16.0

#### Example

```typescript
const result = await sdk.inStorePickup.checkMetaValidation([123456, 234567]);
const invalid = result.orders.filter(o => o.isError);
```

***

### setCustomsDeclarationBulk()

```ts
setCustomsDeclarationBulk(request: SetCustomsDeclarationBulkRequest): Promise<CustomsDeclarationSetResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:581](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L581)

Bulk add customs declaration numbers + country-of-origin codes (B2B)

Sets customs declaration (ДТ) numbers + origin country codes for assembly
orders (statuses `confirm` or `prepare` only). **B2B requirement (since
2026-07-08):** B2B orders MUST include `originCountryCode` (numeric ОКСМ
code, https://esnsi.gosuslugi.ru/classifiers/16269). Invalid/missing code
for a B2B order → HTTP 200 with `InvalidOriginCountryCode` in that order's
`errors[]` (partial success — check `results[].isError`).

Rate limit: 20 req/min, 3s interval, burst 500 (4XX×10 penalty)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetCustomsDeclarationBulkRequest`](../-internal-/interfaces/SetCustomsDeclarationBulkRequest.md) | Orders with customs declarations + origin country codes |

#### Returns

`Promise`\<[`CustomsDeclarationSetResponse`](../-internal-/interfaces/CustomsDeclarationSetResponse.md)\>

Per-order results

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Since

3.16.0

#### Example

```typescript
const result = await sdk.inStorePickup.setCustomsDeclarationBulk({
  orders: [{ orderId: 123456, customsDeclaration: '10704010/010624/0000302', originCountryCode: '643' }]
});
const failed = result.results.filter(r => r.isError);
```

***

### getOrdersFinalPrice()

```ts
getOrdersFinalPrice(request: OrdersFinalPriceRequest): Promise<OrdersFinalPriceResponse>;
```

Defined in: [modules/in-store-pickup/index.ts:637](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/in-store-pickup/index.ts#L637)

Get seller prices and amounts charged to the buyer (task-203)

Returns, per assembly order ID:
- seller prices excluding discounts (`originalPrice`/`convertedOriginalPrice`)
- sums charged to the buyer including ALL discounts and cashback
  (`originalFinalPrice`/`convertedOriginalFinalPrice`)

**Calculation guidance (WB news 2026-09):** use `originalFinalPrice`/
`convertedOriginalFinalPrice` for calculations. Fall back to
`finalPrice`/`convertedFinalPrice` from `getOrdersNew()`/
`getClickCollectOrders()` responses ONLY when this method returns
`"data": null` for those order IDs.

- `"data": {}` (empty object) — data is still being generated, retry later
  (maximum generation time is approximately 1 minute).
- per-order `errors[]`: `404` NotFound, `400` StatusMismatch,
  `422` PriceNotCalculated (orders created before 23.07.2026).

Rate limit: 150 req/min, 400ms interval, burst 20; a request with a 4XX
response code is counted as 10 requests. In the Sandbox — maximum of
1 request per second for all Marketplace methods in total.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`OrdersFinalPriceRequest`](../-internal-/interfaces/OrdersFinalPriceRequest.md) | Request with assembly order IDs |

#### Returns

`Promise`\<[`OrdersFinalPriceResponse`](../-internal-/interfaces/OrdersFinalPriceResponse.md)\>

Promise resolving to per-order prices and sums

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

task-203

#### See

[https://dev.wildberries.ru/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersFinalPrice](https://dev.wildberries.ru/docs/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders/operation/postV3ClickCollectOrdersFinalPrice)

#### Example

```typescript
const result = await sdk.inStorePickup.getOrdersFinalPrice({ orders: [1234567890] });
for (const item of result.results) {
  if (item.isError) {
    console.log(`Order ${item.orderId}: ${item.errors?.[0]?.detail}`);
  } else if (item.data && Object.keys(item.data).length > 0) {
    // use for calculations per WB guidance
    console.log(`Order ${item.orderId}: buyer pays ${item.data.originalFinalPrice! / 100}`);
  } else {
    // data is null — fall back to finalPrice from getOrdersNew()/getClickCollectOrders()
  }
}
```

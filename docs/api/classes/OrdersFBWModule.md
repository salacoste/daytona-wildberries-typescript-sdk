[Wildberries API TypeScript SDK](../modules.md) / OrdersFbwModule

# Class: OrdersFbwModule

Defined in: [modules/orders-fbw/index.ts:34](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L34)

## Constructors

### Constructor

```ts
new OrdersFbwModule(client: BaseClient): OrdersFbwModule;
```

Defined in: [modules/orders-fbw/index.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L35)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`OrdersFbwModule`

## Methods

### createAcceptanceOption()

```ts
createAcceptanceOption(data: ModelsGood[], options?: {
  warehouseID?: string;
}): Promise<ModelsOptionsResultModel>;
```

Defined in: [modules/orders-fbw/index.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L53)

Опции приёмки

Метод возвращает информацию о том, какие склады и типы упаковки доступны для поставки. Список складов определяется по баркоду и количеству товара. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ModelsGood`](../-internal-/interfaces/ModelsGood.md)[] | Request body data |
| `options?` | \{ `warehouseID?`: `string`; \} | Query parameters |
| `options.warehouseID?` | `string` | - |

#### Returns

`Promise`\<[`ModelsOptionsResultModel`](../-internal-/interfaces/ModelsOptionsResultModel.md)\>

Успешно

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
const result = await sdk.ordersFBW.createAcceptanceOption([{ barcode: '1234567891234', quantity: 10 }]);
console.log(result);
```

***

### warehouses()

```ts
warehouses(): Promise<ModelsWarehousesResultItems[]>;
```

Defined in: [modules/orders-fbw/index.ts:78](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L78)

Список складов

Метод возвращает список складов WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>

#### Returns

`Promise`\<[`ModelsWarehousesResultItems`](../-internal-/interfaces/ModelsWarehousesResultItems.md)[]\>

Успешно

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
const result = await sdk.ordersFBW.warehouses();
console.log(result);
```

***

### transitTariffs()

```ts
transitTariffs(): Promise<ModelsTransitTariff[]>;
```

Defined in: [modules/orders-fbw/index.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L99)

Транзитные направления

Метод возвращает информацию о доступных транзитных направлениях. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 10 запросов | </div>

#### Returns

`Promise`\<[`ModelsTransitTariff`](../-internal-/interfaces/ModelsTransitTariff.md)[]\>

Успешно

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
const result = await sdk.ordersFBW.transitTariffs();
console.log(result);
```

***

### listSupplies()

```ts
listSupplies(data: ModelsSuppliesFiltersRequest, options?: {
  limit?: number;
  offset?: number;
}): Promise<ModelsSupply[]>;
```

Defined in: [modules/orders-fbw/index.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L122)

Список поставок

Метод возвращает список поставок, по умолчанию — последние 1000 поставок. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ModelsSuppliesFiltersRequest`](../-internal-/interfaces/ModelsSuppliesFiltersRequest.md) | Request body data |
| `options?` | \{ `limit?`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |

#### Returns

`Promise`\<[`ModelsSupply`](../-internal-/interfaces/ModelsSupply.md)[]\>

Успешно

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
const result = await sdk.ordersFBW.listSupplies({});
console.log(result);
```

***

### getSupply()

```ts
getSupply(ID: number, options?: {
  isPreorderID?: boolean;
}): Promise<ModelsSupplyDetails>;
```

Defined in: [modules/orders-fbw/index.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L149)

Детали поставки

Метод возвращает детали поставки по ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ID` | `number` | ID поставки или заказа |
| `options?` | \{ `isPreorderID?`: `boolean`; \} | Query parameters |
| `options.isPreorderID?` | `boolean` | - |

#### Returns

`Promise`\<[`ModelsSupplyDetails`](../-internal-/interfaces/ModelsSupplyDetails.md)\>

Успешно

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
const result = await sdk.ordersFBW.getSupply(12345);
console.log(result);
```

***

### getSuppliesGood()

```ts
getSuppliesGood(ID: number, options?: {
  limit?: number;
  offset?: number;
  isPreorderID?: boolean;
}): Promise<ModelsGoodInSupply[]>;
```

Defined in: [modules/orders-fbw/index.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L172)

Товары поставки

Метод возвращает информацию о товарах в поставке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ID` | `number` | ID поставки или заказа |
| `options?` | \{ `limit?`: `number`; `offset?`: `number`; `isPreorderID?`: `boolean`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.isPreorderID?` | `boolean` | - |

#### Returns

`Promise`\<[`ModelsGoodInSupply`](../-internal-/interfaces/ModelsGoodInSupply.md)[]\>

Успешно

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
const result = await sdk.ordersFBW.getSuppliesGood(12345);
console.log(result);
```

***

### getSuppliesPackage()

```ts
getSuppliesPackage(ID: number): Promise<ModelsBox[]>;
```

Defined in: [modules/orders-fbw/index.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L197)

Упаковка поставки

Метод возвращает информацию об упаковке поставки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ID` | `number` | ID поставки |

#### Returns

`Promise`\<[`ModelsBox`](../-internal-/interfaces/ModelsBox.md)[]\>

Успешно

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
const result = await sdk.ordersFBW.getSuppliesPackage(12345);
console.log(result);
```

***

### getClientInfo()

```ts
getClientInfo(orderIds: number[]): Promise<GetDBWClientInfoResponse>;
```

Defined in: [modules/orders-fbw/index.ts:231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L231)

Получение информации о покупателе для заказов DBW

Возвращает данные покупателя (имя, телефон, код) по ID заказов модели DBW.

**Важно:** Этот метод использует домен `marketplace-api.wildberries.ru`,
а не `supplies-api.wildberries.ru` как остальные методы FBW.

Rate limit: 300 requests per minute, 200ms interval, burst 20.
Один запрос с кодом 409 считается за 10 запросов.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of assembly order IDs (no documented max limit) |

#### Returns

`Promise`\<[`GetDBWClientInfoResponse`](../-internal-/interfaces/GetDBWClientInfoResponse.md)\>

Buyer information for each order

#### Throws

When orderIds array is empty

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.4.0

#### See

[https://dev.wildberries.ru/docs/openapi/orders-dbw#tag/Sborochnye-zadaniya-DBW](https://dev.wildberries.ru/docs/openapi/orders-dbw#tag/Sborochnye-zadaniya-DBW)

#### Example

```typescript
const result = await sdk.ordersFBW.getClientInfo([987654321, 123456789]);
for (const order of result.orders ?? []) {
  console.log(`Order ${order.orderID}: ${order.firstName}, phone: +${order.phoneCode}${order.phone}`);
}
```

***

### deleteMetaBulk()

```ts
deleteMetaBulk(request: DBWDeleteMetaBulkRequest): Promise<DBWDeleteMetaBulkResponse>;
```

Defined in: [modules/orders-fbw/index.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L269)

Удалить маркировочные метаданные у нескольких заказов DBW (массовая операция).

Bulk-delete marking metadata (IMEI/UIN/GTIN/SGTIN/customsDeclaration) from up to
N DBW orders in a single request. Mirrors the DBS `deleteMetaBulk` method.

Rate limit: 150 requests/min, 400ms interval, burst 20.
(Default mirrors DBS sibling — WB has not yet published explicit DBW limits.
Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`DBWDeleteMetaBulkRequest`](../interfaces/DBWDeleteMetaBulkRequest.md) | Orders array and metadata key to delete |

#### Returns

`Promise`\<[`DBWDeleteMetaBulkResponse`](../interfaces/DBWDeleteMetaBulkResponse.md)\>

Per-order deletion results

#### Throws

When orders array is empty

#### Throws

When request body is malformed

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.11.0

#### See

[https://dev.wildberries.ru/openapi/orders-dbw](https://dev.wildberries.ru/openapi/orders-dbw)

#### Example

```typescript
const result = await sdk.ordersFBW.deleteMetaBulk({ orders: [123456], key: 'imei' });
for (const order of result.orders) {
  console.log(`Order ${order.orderId}: ${order.success ? 'deleted' : order.error}`);
}
```

***

### setSgtinBulk()

```ts
setSgtinBulk(request: DBWSetSgtinBulkRequest): Promise<DBWSetMetaBulkResponse>;
```

Defined in: [modules/orders-fbw/index.ts:310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L310)

Задать SGTIN-коды для нескольких заказов DBW (массовая операция).

Bulk-assign SGTIN (Serial Global Trade Item Number) codes to up to N DBW orders
in a single request. Mirrors the DBS `setSgtinBulk` method.

Rate limit: 500 requests/min, 120ms interval, burst 20.
(Default mirrors DBS sibling — WB has not yet published explicit DBW limits.
Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`DBWSetSgtinBulkRequest`](../interfaces/DBWSetSgtinBulkRequest.md) | Per-order SGTIN assignments |

#### Returns

`Promise`\<[`DBWSetMetaBulkResponse`](../interfaces/DBWSetMetaBulkResponse.md)\>

Per-order set results; `errors[]` present when some orders fail

#### Throws

When orders array is empty

#### Throws

When request body is malformed

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.11.0

#### See

[https://dev.wildberries.ru/openapi/orders-dbw](https://dev.wildberries.ru/openapi/orders-dbw)

#### Example

```typescript
const result = await sdk.ordersFBW.setSgtinBulk({
  orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }],
});
if (result.errors?.length) {
  console.log('Some orders failed:', result.errors);
}
```

***

### deliverBulk()

```ts
deliverBulk(orderIds: number[]): Promise<BulkStatusChangeResponse>;
```

Defined in: [modules/orders-fbw/index.ts:362](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L362)

Передать несколько заказов DBW в доставку (массовая операция).

Mark up to 1000 DBW orders as "delivered" (handed to carrier) in a single request.
Mirrors the DBS `deliverBulk` method. WB disables the legacy single-order DBW
deliver endpoint on 2026-06-05 — use this method instead.

**Important:** Orders requiring IMEI/SGTIN must have metadata attached before calling
this method. If metadata is missing, WB returns 409 `MetaValidationFail`.

Rate limit: 300 requests/min, 200ms interval, burst 20.
(Default mirrors DBS sibling — WB has not yet published explicit DBW limits.
Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to mark as delivered (1–1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse.md)\>

Per-order delivery status results. When WB returns application-level 409
  MetaValidationFail, it surfaces in `result.results[].errors[]` with `code === 409`
  and `detail === 'MetaValidationFail'`; check `result.results[].errors[].metaDetails[]`
  per-order before retrying. (since 3.11.0 — WB API 2026-05-06)

#### Throws

When orderIds is empty or exceeds 1000 items

#### Throws

409 — ImeiIsNotFilled: mandatory IMEI not attached to order

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.11.0

#### See

[https://dev.wildberries.ru/openapi/orders-dbw](https://dev.wildberries.ru/openapi/orders-dbw)

#### Example

```typescript
// Mark multiple DBW orders as handed to carrier
const result = await sdk.ordersFBW.deliverBulk([123456, 234567, 345678]);

for (const order of result.results ?? []) {
  if (order.isError) {
    console.log(`Order ${order.orderId} failed:`, order.errors);
  } else {
    console.log(`Order ${order.orderId} marked as delivered`);
  }
}
```

***

### checkMetaValidation()

```ts
checkMetaValidation(request: DBWCheckMetaValidationRequest): Promise<DBWCheckMetaValidationResponse>;
```

Defined in: [modules/orders-fbw/index.ts:426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/modules/orders-fbw/index.ts#L426)

Проверить метаданные маркировки DBW-заказов перед передачей в доставку (предварительная валидация).

Pre-flight metadata validator for DBW orders. Returns the same `metaDetails[]` shape
that WB returns inside the 409 `MetaValidationFail` body of `deliverBulk()`, but as a
200 OK response — without consuming a deliver-bulk quota attempt.

**This method does NOT change order state.** It is a read-only pre-flight check.
Use it before `deliverBulk()` to identify orders with invalid marking metadata
(SGTIN/IMEI/UIN/etc.) so they can be fixed in advance, avoiding the guess-and-retry
loop of: call `deliverBulk()` → catch 409 → read `metaDetails[]` → fix → retry.

Rate limit: 300 requests/min, 200ms interval, burst 20.
(Default mirrors `deliverBulk` DBW — WB has not yet published explicit limits.
Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`DBWCheckMetaValidationRequest`](../interfaces/DBWCheckMetaValidationRequest.md) | Request containing array of DBW order IDs to validate (1–1000 items) |

#### Returns

`Promise`\<[`DBWCheckMetaValidationResponse`](../interfaces/DBWCheckMetaValidationResponse.md)\>

Per-order metadata validation results in `metaDetails[]`

#### Throws

When `orders` array is empty

#### Throws

When `orders` array exceeds 1000 items

#### Throws

When request body is malformed (4xx propagation)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.11.0

#### See

[https://dev.wildberries.ru/openapi/orders-dbw](https://dev.wildberries.ru/openapi/orders-dbw)

#### Example

```typescript
// Pre-flight pattern: validate → fix → deliver
const validation = await sdk.ordersFBW.checkMetaValidation({
  orders: [123456, 234567, 345678],
});

const invalidOrders = validation.metaDetails.filter(d => d.status === 'invalid');
if (invalidOrders.length > 0) {
  console.log('Orders with invalid metadata:', invalidOrders);
  // Fix metadata for invalid orders first (narrow orderId: number | undefined → number):
  const fixable = invalidOrders.filter(
    (o): o is typeof o & { orderId: number } => o.orderId !== undefined
  );
  await sdk.ordersFBW.setSgtinBulk({
    orders: fixable.map(o => ({ orderId: o.orderId, sgtins: ['correct-sgtin'] })),
  });
}

// Now safe to deliver — no 409 MetaValidationFail expected
const result = await sdk.ordersFBW.deliverBulk([123456, 234567, 345678]);
```

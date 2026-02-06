[Wildberries API TypeScript SDK](../modules.md) / OrdersFbwModule

# Class: OrdersFbwModule

Defined in: [modules/orders-fbw/index.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L26)

## Constructors

### Constructor

```ts
new OrdersFbwModule(client: BaseClient): OrdersFbwModule;
```

Defined in: [modules/orders-fbw/index.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L29)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`OrdersFbwModule`

## Methods

### ~~getAcceptanceCoefficients()~~

```ts
getAcceptanceCoefficients(options?: {
  warehouseIDs?: string;
}): Promise<ModelsAcceptanceCoefficient[]>;
```

Defined in: [modules/orders-fbw/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L47)

Коэффициенты приёмки

Метод возвращает коэффициенты приёмки для конкретных складов на ближайшие 14 дней. <div class="description_important"> Приёмка для поставки доступна только при сочетании: <br> <code>coefficient</code> — <code>0</code> или <code>1</code> <br> и <code>allowUnload</code> — <code>true</code> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `warehouseIDs?`: `string`; \} | Query parameters |
| `options.warehouseIDs?` | `string` | - |

#### Returns

`Promise`\<[`ModelsAcceptanceCoefficient`](../-internal-/interfaces/ModelsAcceptanceCoefficient.md)[]\>

Успешно

#### Deprecated

Use tariffs module instead. This endpoint has been moved to common-api.wildberries.ru.

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
const result = await sdk.ordersFBW.getAcceptanceCoefficients({});
console.log(result);
```

***

### createAcceptanceOption()

```ts
createAcceptanceOption(data: ModelsGood[], options?: {
  warehouseID?: string;
}): Promise<ModelsOptionsResultModel>;
```

Defined in: [modules/orders-fbw/index.ts:78](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L78)

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

Defined in: [modules/orders-fbw/index.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L103)

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

Defined in: [modules/orders-fbw/index.ts:124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L124)

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

Defined in: [modules/orders-fbw/index.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L147)

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

### ~~createSupply()~~

```ts
createSupply(data: ModelsSuppliesFiltersRequest, options?: {
  limit?: number;
  offset?: number;
}): Promise<ModelsSupply[]>;
```

Defined in: [modules/orders-fbw/index.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L161)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`ModelsSuppliesFiltersRequest`](../-internal-/interfaces/ModelsSuppliesFiltersRequest.md) |
| `options?` | \{ `limit?`: `number`; `offset?`: `number`; \} |
| `options.limit?` | `number` |
| `options.offset?` | `number` |

#### Returns

`Promise`\<[`ModelsSupply`](../-internal-/interfaces/ModelsSupply.md)[]\>

#### Deprecated

Use [listSupplies](#listsupplies) instead. This method will be removed in v3.0.0.

***

### getSupply()

```ts
getSupply(ID: number, options?: {
  isPreorderID?: boolean;
}): Promise<ModelsSupplyDetails>;
```

Defined in: [modules/orders-fbw/index.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L184)

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

Defined in: [modules/orders-fbw/index.ts:207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L207)

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

Defined in: [modules/orders-fbw/index.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/modules/orders-fbw/index.ts#L232)

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

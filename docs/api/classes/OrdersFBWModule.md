[Wildberries API TypeScript SDK](../modules.md) / OrdersFbwModule

# Class: OrdersFbwModule

Defined in: [modules/orders-fbw/index.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L25)

## Constructors

### Constructor

```ts
new OrdersFbwModule(client: BaseClient): OrdersFbwModule;
```

Defined in: [modules/orders-fbw/index.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L26)

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

Defined in: [modules/orders-fbw/index.ts:44](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L44)

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

Defined in: [modules/orders-fbw/index.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L69)

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

Defined in: [modules/orders-fbw/index.ts:90](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L90)

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

Defined in: [modules/orders-fbw/index.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L113)

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

Defined in: [modules/orders-fbw/index.ts:140](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L140)

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

Defined in: [modules/orders-fbw/index.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L163)

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

Defined in: [modules/orders-fbw/index.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/orders-fbw/index.ts#L188)

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

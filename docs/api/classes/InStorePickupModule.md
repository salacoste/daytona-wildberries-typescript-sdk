[Wildberries API TypeScript SDK](../modules.md) / InStorePickupModule

# Class: InStorePickupModule

Defined in: [modules/in-store-pickup/index.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L27)

## Constructors

### Constructor

```ts
new InStorePickupModule(client: BaseClient): InStorePickupModule;
```

Defined in: [modules/in-store-pickup/index.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L28)

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

Defined in: [modules/in-store-pickup/index.ts:44](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L44)

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

### updateOrdersConfirm()

```ts
updateOrdersConfirm(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L65)

Перевести на сборку

Метод переводит сборочное задание в статус confirm — на сборке.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateOrdersConfirm(12345);
```

***

### updateOrdersPrepare()

```ts
updateOrdersPrepare(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:87](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L87)

Сообщить, что сборочное задание готово к выдаче

Метод переводит сборочное задание в статус prepare — готово к выдаче.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateOrdersPrepare(12345);
```

***

### createOrdersClient()

```ts
createOrdersClient(data: ApiOrdersRequest): Promise<ApiOrderClientInfoResp>;
```

Defined in: [modules/in-store-pickup/index.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L111)

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

Defined in: [modules/in-store-pickup/index.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L135)

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

### updateOrdersReceive()

```ts
updateOrdersReceive(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L157)

Сообщить, что заказ принят покупателем

Метод переводит сборочное задание в статус receive — получено покупателем.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateOrdersReceive(12345);
```

***

### updateOrdersReject()

```ts
updateOrdersReject(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L179)

Сообщить, что покупатель отказался от заказа

Метод переводит сборочное задание в статус reject — отказ при получении.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateOrdersReject(12345);
```

***

### createOrdersStatus()

```ts
createOrdersStatus(data: ApiOrdersRequest): Promise<ApiOrderStatuses>;
```

Defined in: [modules/in-store-pickup/index.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L202)

Получить статусы сборочных заданий

Метод возвращает статусы сборочных заданий по их ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ApiOrdersRequest`](../-internal-/interfaces/ApiOrdersRequest.md) | Request body data |

#### Returns

`Promise`\<[`ApiOrderStatuses`](../-internal-/interfaces/ApiOrderStatuses.md)\>

Статусы сборочных заданий

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
const result = await sdk.inStorePickup.createOrdersStatus({ orders: [12345] });
console.log(result);
```

***

### ~~createOrdersStatu()~~

```ts
createOrdersStatu(data: ApiOrdersRequest): Promise<ApiOrderStatuses>;
```

Defined in: [modules/in-store-pickup/index.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L214)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`ApiOrdersRequest`](../-internal-/interfaces/ApiOrdersRequest.md) |

#### Returns

`Promise`\<[`ApiOrderStatuses`](../-internal-/interfaces/ApiOrderStatuses.md)\>

#### Deprecated

Use [createOrdersStatus](#createordersstatus) instead. This alias will be removed in a future version.
Renamed from createOrdersStatu to createOrdersStatus to fix the truncated method name.

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

Defined in: [modules/in-store-pickup/index.ts:234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L234)

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

### updateOrdersCancel()

```ts
updateOrdersCancel(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L260)

Отменить сборочное задание

Метод отменяет сборочное задание и переводит в статус cancel — отменено продавцом.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateOrdersCancel(12345);
```

***

### getOrdersMeta()

```ts
getOrdersMeta(orderId: number): Promise<ApiOrdersMeta>;
```

Defined in: [modules/in-store-pickup/index.ts:284](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L284)

Получить метаданные сборочного задания

Метод возвращает метаданные сборочного задания.
Перечень метаданных, доступных для сборочного задания, можно получить в списке новых сборочных заданий, поле requiredMeta.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<[`ApiOrdersMeta`](../-internal-/interfaces/ApiOrdersMeta.md)\>

Метаданные сборочного задания

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
const result = await sdk.inStorePickup.getOrdersMeta(12345);
console.log(result);
```

***

### deleteOrdersMeta()

```ts
deleteOrdersMeta(orderId: number, options?: {
  key: string;
}): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L307)

Удалить метаданные сборочного задания

Метод удаляет значение метаданных сборочного задания для переданного ключа.
Возможные метаданные: imei, uin, gtin, sgtin. Передается только одно значение.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `options?` | \{ `key`: `string`; \} | Query parameters |
| `options.key?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.deleteOrdersMeta(12345, { key: 'imei' });
```

***

### updateMetaSgtin()

```ts
updateMetaSgtin(orderId: number, data: ApiSGTINsRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L332)

Закрепить за сборочным заданием код маркировки товара (SGTIN)

Метод закрепляет за сборочным заданием код маркировки Честный знак.
Закрепить код маркировки можно только, если в метаданных есть поле sgtins,
а сборочное задание находится в статусе confirm.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data` | [`ApiSGTINsRequest`](../-internal-/interfaces/ApiSGTINsRequest.md) | Request body data |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateMetaSgtin(12345, { sgtins: ['1234567890123456'] });
```

***

### updateMetaUin()

```ts
updateMetaUin(orderId: number, data: ApiUINRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:356](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L356)

Закрепить за сборочным заданием УИН (уникальный идентификационный номер)

Метод обновляет УИН сборочного задания. У одного сборочного задания может быть только один УИН.
Добавлять маркировку можно только для сборочных заданий в статусе confirm.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data` | [`ApiUINRequest`](../-internal-/interfaces/ApiUINRequest.md) | Request body data |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateMetaUin(12345, { uin: '1234567890123456' });
```

***

### updateMetaImei()

```ts
updateMetaImei(orderId: number, data: ApiIMEIRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:380](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L380)

Закрепить за сборочным заданием IMEI

Метод обновляет IMEI сборочного задания. У одного сборочного задания может быть только один IMEI.
Добавлять маркировку можно только для сборочных заданий в статусе confirm.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data` | [`ApiIMEIRequest`](../-internal-/interfaces/ApiIMEIRequest.md) | Request body data |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateMetaImei(12345, { imei: '123456789012345' });
```

***

### updateMetaGtin()

```ts
updateMetaGtin(orderId: number, data: ApiGTINRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/modules/in-store-pickup/index.ts#L405)

Закрепить за сборочным заданием GTIN

Метод обновляет GTIN (уникальный ID товара в Беларуси) сборочного задания.
У одного сборочного задания может быть только один GTIN.
Добавлять маркировку можно только для сборочных заданий в статусе confirm.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data` | [`ApiGTINRequest`](../-internal-/interfaces/ApiGTINRequest.md) | Request body data |

#### Returns

`Promise`\<`void`\>

Response data

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
await sdk.inStorePickup.updateMetaGtin(12345, { gtin: '1234567890123456' });
```

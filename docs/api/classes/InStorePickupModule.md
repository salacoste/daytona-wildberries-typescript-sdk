[Wildberries API TypeScript SDK](../modules.md) / InStorePickupModule

# Class: InStorePickupModule

Defined in: [modules/in-store-pickup/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L10)

## Constructors

### Constructor

```ts
new InStorePickupModule(client: BaseClient): InStorePickupModule;
```

Defined in: [modules/in-store-pickup/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L11)

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

Defined in: [modules/in-store-pickup/index.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L27)

Получить список новых сборочных заданий

Метод возвращает список всех новых [сборочных заданий](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz), которые есть у продавца на момент запроса. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Returns

`Promise`\<[`ApiNewOrders`](../-internal-/interfaces/ApiNewOrders.md)\>

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
const result = await sdk.general.getOrdersNew();
console.log(result);
```

***

### updateOrdersConfirm()

```ts
updateOrdersConfirm(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L45)

Перевести на сборку

Метод переводит сборочное задание в статус `confirm` — на сборке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateOrdersConfirm('orderId-value');
```

***

### updateOrdersPrepare()

```ts
updateOrdersPrepare(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L63)

Сообщить, что сборочное задание готово к выдаче

Метод переводит сборочное задание в статус `prepare` — готово к выдаче. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateOrdersPrepare('orderId-value');
```

***

### createOrdersClient()

```ts
createOrdersClient(data: ApiOrdersRequest): Promise<ApiOrderClientInfoResp>;
```

Defined in: [modules/in-store-pickup/index.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L82)

Информация о покупателе

Метод возвращает информацию о покупателе по ID сборочного задания. <br><br> Доступно только для сборочных заданий в статусах: - `confirm` — на сборке - `prepare` — готов к выдаче <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ApiOrdersRequest`](../-internal-/interfaces/ApiOrdersRequest.md) | Request body data |

#### Returns

`Promise`\<[`ApiOrderClientInfoResp`](../-internal-/interfaces/ApiOrderClientInfoResp.md)\>

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
const result = await sdk.general.createOrdersClient({});
console.log(result);
```

***

### createClientIdentity()

```ts
createClientIdentity(data: ApiCheckIdentityRequest): Promise<ApiCheckedIdentity>;
```

Defined in: [modules/in-store-pickup/index.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L101)

Проверить, что заказ принадлежит покупателю

Метод сообщает, принадлежит ли проверяемый заказ покупателю или нет по переданному коду. <br><br> Доступно, если хотя бы одно сборочное задание из заказа находится в статусе prepare - готов к выдаче. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ApiCheckIdentityRequest`](../-internal-/interfaces/ApiCheckIdentityRequest.md) | Request body data |

#### Returns

`Promise`\<[`ApiCheckedIdentity`](../-internal-/interfaces/ApiCheckedIdentity.md)\>

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
const result = await sdk.general.createClientIdentity({});
console.log(result);
```

***

### updateOrdersReceive()

```ts
updateOrdersReceive(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L119)

Сообщить, что заказ принят покупателем

Метод переводит сборочное задание в статус `receive` — получено покупателем. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateOrdersReceive('orderId-value');
```

***

### updateOrdersReject()

```ts
updateOrdersReject(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L137)

Сообщить, что покупатель отказался от заказа

Метод переводит сборочное задание в статус `reject` — отказ при получении. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateOrdersReject('orderId-value');
```

***

### createOrdersStatu()

```ts
createOrdersStatu(data: ApiOrdersRequest): Promise<ApiOrderStatuses>;
```

Defined in: [modules/in-store-pickup/index.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L156)

Получить статусы сборочных заданий

Метод возвращает статусы сборочных заданий по их ID. <br><br> `supplierStatus` — статус сборочного задания. Триггер его изменения - действие самого продавца. Возможные значения `supplierStatus`: | Статус | Описание | Как перевести сборочное задание в данный статус | | ------- | --------- | --------------------------------------| | `new` | **Новое сборочное задание** | | `confirm` | **На сборке** | [Перевести сборочное задание на сборку](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1confirm/patch) | `prepare` | **Готов к выдаче** | [Сообщить, что сборочное задание готово к выдаче](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1prepare/patch) | `receive` | **Получено покупателем** | [Сообщить, что заказ принят покупателем](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1receive/patch) | `reject` | **Отказ покупателя при получении** | [Сообщить, что покупатель отказался от заказа](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1reject/patch) | `cancel` | **Отменено продавцом** | [Отменить сборочное задание](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1cancel/patch) | `cancel_shelf_life` | **Отмена по истечении срока хранения** | Переводится автоматически по возникновению события <br><br> `wbStatus` — статус системы Wildberries. Возможные значения `wbStatus`: - `waiting` - сборочное задание в работе - `sold` - заказ получен покупателем - `canceled` - отмена сборочного задания - `canceled_by_client` - покупатель отменил заказ при получении - `declined_by_client` - покупатель отменил заказ в первый чаc <br> Отмена доступна покупателю в первый час с момента заказа, если заказ не переведён на сборку - `defect` - отмена заказа по причине брака - `ready_for_pickup` - сборочное задание готово к выдаче <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ApiOrdersRequest`](../-internal-/interfaces/ApiOrdersRequest.md) | Request body data |

#### Returns

`Promise`\<[`ApiOrderStatuses`](../-internal-/interfaces/ApiOrderStatuses.md)\>

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
const result = await sdk.general.createOrdersStatu({});
console.log(result);
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

Defined in: [modules/in-store-pickup/index.ts:175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L175)

Получить информацию о завершённых сборочных заданиях

Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа. Можно получить данные за заданный период, максимум 30 календарных дней одним запросом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.getClickCollectOrders({});
console.log(result);
```

***

### updateOrdersCancel()

```ts
updateOrdersCancel(orderId: number): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L193)

Отменить сборочное задание

Метод отменяет сборочное задание и переводит в статус `cancel` — отменено продавцом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateOrdersCancel('orderId-value');
```

***

### getOrdersMeta()

```ts
getOrdersMeta(orderId: number): Promise<ApiOrdersMeta>;
```

Defined in: [modules/in-store-pickup/index.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L212)

Получить метаданные сборочного задания

Метод возвращает метаданные [сборочного задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1new/get). <br><br> Перечень метаданных, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1new/get), поле `requiredMeta`. <br><br> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<[`ApiOrdersMeta`](../-internal-/interfaces/ApiOrdersMeta.md)\>

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
const result = await sdk.general.getOrdersMeta('orderId-value');
console.log(result);
```

***

### deleteOrdersMeta()

```ts
deleteOrdersMeta(orderId: number, options?: {
  key: string;
}): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L231)

Удалить метаданные сборочного задания

Метод удаляет значение метаданных сборочного задания для переданного ключа. Возможные метаданные: `imei`, `uin`, `gtin`, `sgtin` Передается только одно значение. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.deleteOrdersMeta('orderId-value', {});
```

***

### updateMetaSgtin()

```ts
updateMetaSgtin(orderId: number, data: ApiSGTINsRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L250)

Закрепить за сборочным заданием код маркировки товара

Метод закрепляет за сборочным заданием код маркировки [Честный знак](https://честныйзнак.рф). <br><br> Закрепить код маркировки можно только, если в [метаданных сборочного задания](/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta/get) есть поле `sgtins`, а сборочное задание находится в [статусе](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1status/post) `confirm`. <br><br> Получить загруженные маркировки можно в [метаданных сборочного задания](/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateMetaSgtin('orderId-value', {});
```

***

### updateMetaUin()

```ts
updateMetaUin(orderId: number, data: ApiUINRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L269)

Закрепить за сборочным заданием УИН (уникальный идентификационный номер)

Метод обновляет УИН сборочного задания. У одного сборочного задания может быть только один УИН. Добавлять маркировку можно только для сборочных заданий в статусе `confirm` и доставка которых осуществляется силами WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateMetaUin('orderId-value', {});
```

***

### updateMetaImei()

```ts
updateMetaImei(orderId: number, data: ApiIMEIRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L288)

Закрепить за сборочным заданием IMEI

Метод обновляет IMEI сборочного задания. У одного сборочного задания может быть только один IMEI. Добавлять маркировку можно только для сборочных заданий в статусе `confirm` и доставка которых осуществляется силами WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateMetaImei('orderId-value', {});
```

***

### updateMetaGtin()

```ts
updateMetaGtin(orderId: number, data: ApiGTINRequest): Promise<void>;
```

Defined in: [modules/in-store-pickup/index.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/modules/in-store-pickup/index.ts#L307)

Закрепить за сборочным заданием GTIN

Метод обновляет GTIN (уникальный ID товара в Беларуси) сборочного задания. У одного сборочного задания может быть только один GTIN. Добавлять маркировку можно только для сборочных заданий в статусе `confirm` и доставка которых осуществляется силами WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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
const result = await sdk.general.updateMetaGtin('orderId-value', {});
```

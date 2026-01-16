[Wildberries API TypeScript SDK](../modules.md) / OrdersFbsModule

# Class: OrdersFbsModule

Defined in: [modules/orders-fbs/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L10)

## Constructors

### Constructor

```ts
new OrdersFbsModule(client: BaseClient): OrdersFbsModule;
```

Defined in: [modules/orders-fbs/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L11)

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

Defined in: [modules/orders-fbs/index.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L27)

Получить список складов, для которых требуется пропуск

Метод возвращает список складов для привязки к [пропуску продавца](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get). <div class="description_important"> Данные, которые возвращает метод, могут меняться. Рекомендуем периодически синхронизировать список </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Returns

`Promise`\<[`PassOffice`](../-internal-/interfaces/PassOffice.md)[]\>

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
const result = await sdk.general.getPassesOffices();
console.log(result);
```

***

### passes()

```ts
passes(): Promise<Pass[]>;
```

Defined in: [modules/orders-fbs/index.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L45)

Получить список пропусков

Метод возвращает список всех [созданных](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/post) пропусков продавца. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Returns

`Promise`\<[`Pass`](../-internal-/interfaces/Pass.md)[]\>

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
const result = await sdk.general.passes();
console.log(result);
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

Defined in: [modules/orders-fbs/index.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L64)

Создать пропуск

Метод создаёт [пропуск продавца](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get) с привязкой к складу WB. Пропуск действует 48 часов со времени создания. <div class="description_limit"> Максимум 1 запрос в 10 <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">минут</a> на один аккаунт продавца </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `firstName`: `string`; `lastName`: `string`; `carModel`: `string`; `carNumber`: `string`; `officeId`: `number`; \} | Общая длина ФИО ограничена от 6 до 100 символов. В номере машины могут быть только буквы и цифры. |
| `data.firstName` | `string` | - |
| `data.lastName` | `string` | - |
| `data.carModel` | `string` | - |
| `data.carNumber` | `string` | - |
| `data.officeId` | `number` | - |

#### Returns

`Promise`\<\{
  `id?`: `number`;
\}\>

Создано

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
const result = await sdk.general.createPass({});
console.log(result);
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

Defined in: [modules/orders-fbs/index.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L83)

Обновить пропуск

Метод обновляет данные [пропуска продавца](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get). В том числе, можно обновить данные привязанного склада WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passId` | `number` | ID пропуска |
| `data` | \{ `firstName`: `string`; `lastName`: `string`; `carModel`: `string`; `carNumber`: `string`; `officeId`: `number`; \} | Общая длина ФИО ограничена от 6 до 100 символов. В номере машины могут быть только буквы и цифры. |
| `data.firstName` | `string` | - |
| `data.lastName` | `string` | - |
| `data.carModel` | `string` | - |
| `data.carNumber` | `string` | - |
| `data.officeId` | `number` | - |

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
const result = await sdk.general.updatePass('passId-value', {});
```

***

### deletePass()

```ts
deletePass(passId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L101)

Удалить пропуск

Метод удаляет пропуск продавца [из списка](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `passId` | `number` | ID пропуска |

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
const result = await sdk.general.deletePass('passId-value');
```

***

### getOrdersNew()

```ts
getOrdersNew(): Promise<{
  orders?: OrderNew[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L119)

Получить список новых сборочных заданий

Метод возвращает список всех новых [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get), которые есть у продавца на момент запроса. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | </div>

#### Returns

`Promise`\<\{
  `orders?`: [`OrderNew`](../-internal-/interfaces/OrderNew.md)[];
\}\>

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

Defined in: [modules/orders-fbs/index.ts:138](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L138)

Получить информацию о сборочных заданиях

Метод возвращает информацию о сборочных заданиях без их актуального [статуса](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post). Можно получить данные за заданный период, максимум 30 календарных дней одним запросом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `next`: `number`; `dateFrom?`: `number`; `dateTo?`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.next?` | `number` | - |
| `options.dateFrom?` | `number` | - |
| `options.dateTo?` | `number` | - |

#### Returns

`Promise`\<\{
  `next?`: `number`;
  `orders?`: [`Order`](../-internal-/interfaces/Order.md)[];
\}\>

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
const result = await sdk.general.orders({});
console.log(result);
```

***

### createOrdersStatu()

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

Defined in: [modules/orders-fbs/index.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L157)

Получить статусы сборочных заданий

Метод возвращает статусы [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) по их ID. <br><br> `supplierStatus` — статус сборочного задания. Триггер его изменения — действие самого продавца. Возможные значения `supplierStatus`: | Статус | Описание | Как перевести сборочное задание в данный статус | |-------|----------------------|--------------------------------------| | `new` | **Новое сборочное задание** | | | `confirm` | **На сборке** |[Добавить сборочное задание к поставке](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders~1%7BorderId%7D/patch) | `complete` | **В доставке** | [Передать поставку в доставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1deliver/patch) | | `cancel` | **Отменено продавцом** | [Отменить сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1cancel/patch)| <br><br> `wbStatus` — статус системы Wildberries. Возможные значения `wbStatus`: - `waiting` — сборочное задание в работе - `sorted` — сборочное задание отсортировано - `sold` — заказ получен покупателем - `canceled` — отмена сборочного задания - `canceled_by_client` — покупатель отменил заказ при получении - `declined_by_client` — покупатель отменил заказ. Отмена доступна покупателю в первый час с момента заказа, если заказ не переведён на сборку - `defect` — отмена заказа по причине брака - `ready_for_pickup` — сборочное задание прибыло на пункт выдачи заказов (ПВЗ) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders`: `number`[]; \} | Request body data |
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

### getOrdersReshipment()

```ts
getOrdersReshipment(): Promise<{
  orders?: {
     supplyID?: unknown;
     orderID?: unknown;
  }[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L175)

Получить все сборочные задания для повторной отгрузки

Метод возвращает все [сборочные задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get), требующие повторной отгрузки. <br><br> Повторная отгрузка требуется, если поставка была отсканирована в пункте приёмки, но при этом в ней всё ещё есть неотсканированные товары. Спустя определённое время необходимо доставить эти товары заново. Данные сборочные задания можно перевести в [другую активную поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders~1%7BorderId%7D/patch). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Returns

`Promise`\<\{
  `orders?`: \{
     `supplyID?`: `unknown`;
     `orderID?`: `unknown`;
  \}[];
\}\>

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
const result = await sdk.general.getOrdersReshipment();
console.log(result);
```

***

### updateOrdersCancel()

```ts
updateOrdersCancel(orderId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L193)

Отменить сборочное задание

Метод отменяет [сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) и переводит в [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `cancel` — отменено продавцом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

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

Defined in: [modules/orders-fbs/index.ts:213](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L213)

Получить стикеры сборочных заданий

Метод возвращает список стикеров для [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get). Можно получить стикер в форматах: - SVG - ZPLV (вертикальный) - ZPLH (горизонтальный) - PNG Ограничения: - За один запрос можно получить максимум 100 стикеров. - Можно получить стикеры только для сборочных заданий, находящихся на сборке — [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. Доступны размеры: - 580x400 px при `width=58&height=40` в запросе - 400x300 px при `width=40&height=30` в запросе <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `type`: `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"`; `width`: `40` \| `58`; `height`: `30` \| `40`; \} | Query parameters |
| `options.type?` | `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"` | - |
| `options.width?` | `40` \| `58` | - |
| `options.height?` | `30` \| `40` | - |
| `data?` | \{ `orders?`: `number`[]; \} | Request body data |
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
const result = await sdk.general.createOrdersSticker({}, {});
console.log(result);
```

***

### getOrdersMeta()

```ts
getOrdersMeta(orderId: number): Promise<{
  meta?: Meta;
}>;
```

Defined in: [modules/orders-fbs/index.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L232)

Получить метаданные сборочного задания

Метод возвращает метаданные [сборочного задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1new/get). <br><br> Перечень метаданных, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](/openapi/orders-dbs#tag/Sborochnye-zadaniya-DBS/paths/~1api~1v3~1dbs~1orders~1new/get), поле `requiredMeta`. <br><br> Возможные метаданные: - `imei` — [IMEI](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put) - `uin` — [УИН](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put) - `gtin` — [GTIN](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put) - `sgtin` — [код маркировки](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put) - `expiration` — [срок годности товара](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put) - `customsDeclaration` — [номер ГТД](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1customs-declaration/put) Если в ответе не вернулись какие-либо из объектов метаданных, значит, у сборочного задания не может быть таких метаданных — и добавить их нельзя. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |

#### Returns

`Promise`\<\{
  `meta?`: [`Meta`](../-internal-/interfaces/Meta.md);
\}\>

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
  key?: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:251](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L251)

Удалить метаданные сборочного задания

Метод удаляет значение [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) для переданного ключа. <br><br> Возможные метаданные: - `imei` — [IMEI](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put) - `uin` — [УИН](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put) - `gtin` — [GTIN](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put) - `sgtin` — [код маркировки](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put) Можно передать только один ключ. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `options?` | \{ `key?`: `string`; \} | Query parameters |
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
updateMetaSgtin(orderId: number, data?: {
  sgtins?: string[];
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L270)

Закрепить за сборочным заданием код маркировки товара

Метод позволяет закрепить за [сборочным заданием](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) код маркировки [Честный знак](https://честныйзнак.рф). <br><br> Закрепить код маркировки можно только если в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) есть поле `sgtin`, а сборочное задание находится в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <br><br> Получить загруженные маркировки можно в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data?` | \{ `sgtins?`: `string`[]; \} | Request body data |
| `data.sgtins?` | `string`[] | - |

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
updateMetaUin(orderId: number, data?: {
  uin: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L289)

Закрепить за сборочным заданием УИН

Метод обновляет УИН в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) — уникальный идентификационный номер. <br><br> У одного сборочного задания может быть только один УИН. Добавлять маркировку можно только для заказов, которые доставляются WB и находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data?` | \{ `uin`: `string`; \} | Request body data |
| `data.uin?` | `string` | - |

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
updateMetaImei(orderId: number, data?: {
  imei: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L308)

Закрепить за сборочным заданием IMEI

Метод обновляет IMEI в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get). <br><br> У одного сборочного задания может быть только один IMEI. Если у устройства два IMEI — **IMEI** и **IMEI2** или **IMEI1** и **IMEI2** — укажите только **IMEI** или **IMEI1**. **IMEI2** указывать не нужно. <br><br> Добавлять маркировку можно только для заказов, которые находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data?` | \{ `imei`: `string`; \} | Request body data |
| `data.imei?` | `string` | - |

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
updateMetaGtin(orderId: number, data?: {
  gtin: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L327)

Закрепить за сборочным заданием GTIN

Метод обновляет GTIN в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) — уникальный ID товара в Беларуси. <br><br> У одного сборочного задания может быть только один GTIN. Добавлять маркировку можно только для заказов, которые доставляются WB и находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data?` | \{ `gtin`: `string`; \} | Request body data |
| `data.gtin?` | `string` | - |

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

***

### updateMetaExpiration()

```ts
updateMetaExpiration(orderId: number, data?: {
  expiration?: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:346](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L346)

Закрепить за сборочным заданием срок годности товара

Метод закрепляет за [сборочным заданием](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) срок годности товара. Товар годен до указанной даты. <br> Добавить срок годности можно только для заказов, которые доставляются WB и находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <br> <br> Получить загруженные данные можно в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get). Чтобы изменить срок годности, отправьте запрос с новой датой. Удалить срок годности из метаданных сборочного задания невозможно. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data?` | \{ `expiration?`: `string`; \} | Request body data |
| `data.expiration?` | `string` | - |

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
const result = await sdk.general.updateMetaExpiration('orderId-value', {});
```

***

### setCustomsDeclaration()

```ts
setCustomsDeclaration(orderId: number, data: {
  customsDeclaration: string;
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L374)

Закрепить за сборочным заданием номер ГТД

Метод обновляет номер грузовой таможенной декларации в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get).
<br><br>
У одного сборочного задания может быть только один номер ГТД.
<br><br>
Чтобы проверить, можно ли указать номер ГТД для сборочного задания, используйте метод [получения списка новых сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1new/get):
<br>
- если в поле ответа `requiredMeta` есть значение `customsDeclaration` — можно указать номер ГТД
<br>
- если в поле ответа `requiredMeta` нет значения `customsDeclaration` — указать номер ГТД нельзя
<div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderId` | `number` | ID сборочного задания |
| `data` | \{ `customsDeclaration`: `string`; \} | Request body data |
| `data.customsDeclaration` | `string` | - |

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
const result = await sdk.general.setCustomsDeclaration(123456, { customsDeclaration: '10129050/010120/0001234' });
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

Defined in: [modules/orders-fbs/index.ts:393](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L393)

Получить стикеры сборочных заданий кроссбордера

Метод возвращает список стикеров [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders/get) кроссбордера, в формате PDF.<br><br> Ограничения: - За один запрос можно получить максимум 100 стикеров. - Можно получить стикеры только для сборочных заданий, находящихся на сборке — [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders?`: `number`[]; \} | Request body data |
| `data.orders?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `stickers?`: \{
     `file?`: `string`;
     `orderId?`: `number`;
  \}[];
\}\>

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
const result = await sdk.general.createStickersCrossBorder({});
console.log(result);
```

***

### createOrdersExternalSticker()

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

Defined in: [modules/orders-fbs/index.ts:412](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L412)

Получить список ссылок на стикеры сборочных заданий, которые требуются при кроссбордере

[ Метод будет отключен 23 октября](https://dev.wildberries.ru/release-notes?id=348).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders?`: `number`[]; \} | Request body data |
| `data.orders?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `stickers?`: \{
     `orderID?`: `number`;
     `url?`: `string`;
     `parcelID?`: `string`;
  \}[];
\}\>

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
const result = await sdk.general.createOrdersExternalSticker({});
console.log(result);
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

Defined in: [modules/orders-fbs/index.ts:431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L431)

История статусов для сборочных заданий кроссбордера

Метод возвращает историю [статусов](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) для [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) кроссбордера. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `orders?`: `number`[]; \} | Request body data |
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
const result = await sdk.general.createStatusHistory({});
console.log(result);
```

***

### createOrdersClient()

```ts
createOrdersClient(data: OrdersRequestAPI): Promise<CrossborderTurkeyClientInfoResp>;
```

Defined in: [modules/orders-fbs/index.ts:450](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L450)

Заказы с информацией по клиенту

Метод позволяет получать информацию о покупателе по ID сборочного задания. Только для кроссбордера из **Турции**. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`OrdersRequestAPI`](../-internal-/interfaces/OrdersRequestAPI.md) | Request body data |

#### Returns

`Promise`\<[`CrossborderTurkeyClientInfoResp`](../-internal-/interfaces/CrossborderTurkeyClientInfoResp.md)\>

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

Defined in: [modules/orders-fbs/index.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L469)

Получить список поставок

Метод возвращает список [поставок](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `next`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.next?` | `number` | - |

#### Returns

`Promise`\<\{
  `next?`: `number`;
  `supplies?`: [`Supply`](../-internal-/interfaces/Supply.md)[];
\}\>

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
const result = await sdk.general.supplies({});
console.log(result);
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

Defined in: [modules/orders-fbs/index.ts:488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L488)

Создать новую поставку

Метод создаёт новую [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). Ограничения: - Только для [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) по модели FBS. - При добавлении в поставку все передаваемые сборочные задания в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `new` будут автоматически переведены в статус `confirm` — на сборке. - Если вы переведёте сборочное задание в статус `cancel` — отмена продавцом, прикрепленное сборочное задание автоматически удалится из поставки. - Поставку можно собрать только из сборочных заданий (заказов) одного габаритного типа `cargoType`. Новая поставка не обладает габаритным признаком, она приобретает габаритный признак первого заказа, добавленного в поставку. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `name?`: `string`; \} | Request body data |
| `data.name?` | `string` | - |

#### Returns

`Promise`\<\{
  `id?`: `string`;
\}\>

Создано

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
const result = await sdk.general.createSupply({});
console.log(result);
```

***

### updateSuppliesOrder()

```ts
updateSuppliesOrder(supplyId: string, orderId: number): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L507)

Добавить сборочное задание к поставке

Метод добавляет [сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) к поставке и переводит его в [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm` — на сборке. Может перемещать сборочное задание: - между активными поставками. - из закрытой поставки в активную, если сборочное задание требует [повторной отгрузки](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1supplies~1orders~1reshipment/get). <div class="description_important"> В пустую поставку можно добавить сборочное задание любого габаритного типа. Поставка приобретает габаритный тип первого добавленного сборочного задания <a href ="./orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get">из поля</a> <code>cargoType</code>. <br> После этого в поставку можно добавить сборочные задания только того же габаритного типа, что и у поставки. </div> <div class="description_important"> Нельзя добавлять в поставку сборочные задания поступившие на разные склады. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для метода <strong>добавления сборочных заданий к поставке FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |
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
const result = await sdk.general.updateSuppliesOrder('supplyId-value', 'orderId-value');
```

***

### getSupply()

```ts
getSupply(supplyId: string): Promise<Supply>;
```

Defined in: [modules/orders-fbs/index.ts:526](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L526)

Получить информацию о поставке

Метод возвращает подробную информацию о поставке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |

#### Returns

`Promise`\<[`Supply`](../-internal-/interfaces/Supply.md)\>

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
const result = await sdk.general.getSupply('supplyId-value');
console.log(result);
```

***

### deleteSupply()

```ts
deleteSupply(supplyId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L544)

Удалить поставку

Метод удаляет [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get), если она активна и за ней не закреплено ни одно [сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |

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
const result = await sdk.general.deleteSupply('supplyId-value');
```

***

### getSuppliesOrder()

```ts
getSuppliesOrder(supplyId: string): Promise<{
  orders?: SupplyOrder[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:563](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L563)

Получить сборочные задания в поставке

Метод возвращает [сборочные задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get), закреплённые за [поставкой](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |

#### Returns

`Promise`\<\{
  `orders?`: [`SupplyOrder`](../-internal-/interfaces/SupplyOrder.md)[];
\}\>

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
const result = await sdk.general.getSuppliesOrder('supplyId-value');
console.log(result);
```

***

### updateSuppliesDeliver()

```ts
updateSuppliesDeliver(supplyId: string): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:581](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L581)

Передать поставку в доставку

Метод закрывает [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get) и переводит все [сборочные задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) в ней в [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `complete` — в доставке. После закрытия поставки добавить новые сборочные задания к ней нельзя. <br><br> Если поставка не была передана в доставку, то при приёмке первого товара поставка автоматически закроется. <br><br> Передать поставку в доставку можно только если в ней: - есть хотя бы одно сборочное задания <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |

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
const result = await sdk.general.updateSuppliesDeliver('supplyId-value');
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

Defined in: [modules/orders-fbs/index.ts:601](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L601)

Получить QR-код поставки

Метод возвращает QR-код [поставки](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get) в форматах: - SVG - ZPLV (вертикальный) - ZPLH (горизонтальный) - PNG QR-код поставки можно получить только если поставка [передана в доставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1deliver/patch). <br><br> Размер — 580x400 px. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |
| `options?` | \{ `type`: `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"`; \} | Query parameters |
| `options.type?` | `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"` | - |

#### Returns

`Promise`\<\{
  `barcode?`: `string`;
  `file?`: `string`;
\}\>

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
const result = await sdk.general.getSuppliesBarcode('supplyId-value', {});
console.log(result);
```

***

### getSuppliesTrbx()

```ts
getSuppliesTrbx(supplyId: string): Promise<{
  trbxes?: SupplyTrbx[];
}>;
```

Defined in: [modules/orders-fbs/index.ts:620](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L620)

Получить список коробов поставки

Возвращает список коробов поставки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |

#### Returns

`Promise`\<\{
  `trbxes?`: [`SupplyTrbx`](../-internal-/interfaces/SupplyTrbx.md)[];
\}\>

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
const result = await sdk.general.getSuppliesTrbx('supplyId-value');
console.log(result);
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

Defined in: [modules/orders-fbs/index.ts:640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L640)

Добавить короба к поставке

Метод добавляет требуемое количество [коробов](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/get) в [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). <br> <br> Короба необходимо добавлять только в поставки, отгружаемые на ПВЗ. <br> Можно добавить только в открытую поставку. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |
| `data?` | \{ `amount`: `number`; \} | Request body data |
| `data.amount?` | `number` | - |

#### Returns

`Promise`\<\{
  `trbxIds?`: `string`[];
\}\>

Создано

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
const result = await sdk.general.createSuppliesTrbx('supplyId-value', {});
console.log(result);
```

***

### deleteSuppliesTrbx()

```ts
deleteSuppliesTrbx(supplyId: string, data?: {
  trbxIds: string[];
}): Promise<void>;
```

Defined in: [modules/orders-fbs/index.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L659)

Удалить короба из поставки

Метод даляет короба из поставки. <br><br> Можно удалить только пока поставка на сборке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |
| `data?` | \{ `trbxIds`: `string`[]; \} | Request body data |
| `data.trbxIds?` | `string`[] | - |

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
const result = await sdk.general.deleteSuppliesTrbx('supplyId-value', {});
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

Defined in: [modules/orders-fbs/index.ts:680](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/orders-fbs/index.ts#L680)

Получить стикеры коробов поставки

Метод возвращает QR-стикеры в форматах: - SVG - ZPLV (вертикальный) - ZPLH (горизонтальный) - PNG <br><br> Размер стикеров — 580x400 px. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `string` | ID поставки |
| `options?` | \{ `type`: `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"`; \} | Query parameters |
| `options.type?` | `"svg"` \| `"zplv"` \| `"zplh"` \| `"png"` | - |
| `data?` | \{ `trbxIds`: `string`[]; \} | Request body data |
| `data.trbxIds?` | `string`[] | - |

#### Returns

`Promise`\<\{
  `stickers?`: [`TrbxStickers`](../-internal-/interfaces/TrbxStickers.md)[];
\}\>

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
const result = await sdk.general.createTrbxSticker('supplyId-value', {}, {});
console.log(result);
```

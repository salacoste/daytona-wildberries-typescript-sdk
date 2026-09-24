[Wildberries API TypeScript SDK](../modules.md) / OrdersFbwModule

# Class: OrdersFbwModule

Defined in: [modules/orders-fbw/index.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L42)

## Constructors

### Constructor

```ts
new OrdersFbwModule(client: BaseClient): OrdersFbwModule;
```

Defined in: [modules/orders-fbw/index.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L43)

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

Defined in: [modules/orders-fbw/index.ts:61](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L61)

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

Defined in: [modules/orders-fbw/index.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L86)

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

Defined in: [modules/orders-fbw/index.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L107)

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

Defined in: [modules/orders-fbw/index.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L130)

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

Defined in: [modules/orders-fbw/index.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L157)

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

Defined in: [modules/orders-fbw/index.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L180)

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

Defined in: [modules/orders-fbw/index.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L205)

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

### getSupplyDiscrepancies()

```ts
getSupplyDiscrepancies(supplyId: number): Promise<ModelsItemDiscrepancyResponse[]>;
```

Defined in: [modules/orders-fbw/index.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L261)

Расхождения при приёмке поставки

Возвращает информацию о расхождениях между заявленным и фактическим
количеством товара в поставке — по данным скан-приёмки на складе WB,
вместе со ссылкой на видео расхождений.

**Доступен только для поставок, принятых не более одного года назад** —
для более старых поставок метод вернёт 404.

Типы расхождений:
- Расхождение вверх:
  1. Излишек товара с заявленным артикулом —
     `"discrepancyType": "surplus"` + `"discrepancyLabel": "surplus"`
  2. Излишек товара с артикулом, не совпадающим с заявленным, —
     `"discrepancyType": "surplus"` + `"discrepancyLabel": "re-sorting"`
- Расхождение вниз:
  1. Недостача товара —
     `"discrepancyType": "shortage"` + `"discrepancyLabel": "shortage"`
  2. Часть артикулов не совпадает с заявленными —
     `"discrepancyType": "shortage"` + `"discrepancyLabel": "re-sorting"`

Каждая упаковка содержит `videoUnavailable` (видео доступно при `false`)
и `items[]` с построчным расхождением и результатами сканирования
(`skuScans[]`, может быть `null`).

Rate limit: **1 запрос в минуту** (интервал 1 минута, всплеск 1) —
не запрашивайте методом пачки поставок подряд.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `supplyId` | `number` | ID поставки |

#### Returns

`Promise`\<[`ModelsItemDiscrepancyResponse`](../-internal-/interfaces/ModelsItemDiscrepancyResponse.md)[]\>

Успешно — массив упаковок с расхождениями

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

404 — поставка не найдена, без расхождений или принята более года назад

#### Throws

When network request fails or times out

#### Since

task-188

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesSupplyIdDiscrepanciesQuantity](https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/suppliesInformation/operation/getV1SuppliesSupplyIdDiscrepanciesQuantity)

#### Example

```typescript
const discrepancies = await sdk.ordersFBW.getSupplyDiscrepancies(12345);
for (const pkg of discrepancies) {
  console.log(`Поставка ${pkg.packageCode}: видео ${pkg.videoUnavailable ? 'недоступно' : pkg.videoUrl}`);
  for (const item of pkg.items) {
    console.log(`  ${item.declaredSku}: заявлено ${item.declaredAmount}, факт ${item.actualAmount} (${item.discrepancyType})`);
  }
}
```

***

### createDraft()

```ts
createDraft(): Promise<ModelsDraftCreateResponse>;
```

Defined in: [modules/orders-fbw/index.ts:290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L290)

Создать черновик поставки

Метод создаёт **пустой** черновик поставки — без тела запроса.
Товары добавляются отдельно через `addDraftItems()`.

Токены: **Personal**, **Service** (категория Supplies).

Rate limit: 30 запросов в минуту (интервал 2 секунды, всплеск 10).

#### Returns

`Promise`\<[`ModelsDraftCreateResponse`](../-internal-/interfaces/ModelsDraftCreateResponse.md)\>

Идентификатор созданного черновика (`draftId`, UUID)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

task-193

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/postV1Drafts](https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/postV1Drafts)

#### Example

```typescript
const { draftId } = await sdk.ordersFBW.createDraft();
console.log(`Создан черновик: ${draftId}`);
```

***

### listDrafts()

```ts
listDrafts(options?: {
  limit?: number;
  offset?: number;
  sort?: "createDt" | "updateDt";
  order?: "asc" | "desc";
}): Promise<ModelsListDraftsResponse>;
```

Defined in: [modules/orders-fbw/index.ts:330](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L330)

Список черновиков поставок

Метод возвращает список черновиков поставок с постраничной навигацией
и сортировкой. По умолчанию — последние 1000 черновиков, отсортированные
по дате создания по убыванию.

Токены: **Personal**, **Service** (категория Supplies).

Rate limit: 30 запросов в минуту (интервал 2 секунды, всплеск 10).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit?`: `number`; `offset?`: `number`; `sort?`: `"createDt"` \| `"updateDt"`; `order?`: `"asc"` \| `"desc"`; \} | Параметры запроса: - `limit` — количество черновиков в ответе (0–1000, по умолчанию 1000) - `offset` — сколько элементов пропустить (по умолчанию 0) - `sort` — поле сортировки: `createDt` (по умолчанию) или `updateDt` - `order` — порядок: `desc` (по умолчанию) или `asc` |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.sort?` | `"createDt"` \| `"updateDt"` | - |
| `options.order?` | `"asc"` \| `"desc"` | - |

#### Returns

`Promise`\<[`ModelsListDraftsResponse`](../-internal-/interfaces/ModelsListDraftsResponse.md)\>

Общее количество черновиков и их список

#### Throws

When query parameters are invalid (400)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

task-193

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/getV1Drafts](https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/getV1Drafts)

#### Example

```typescript
const { total, drafts } = await sdk.ordersFBW.listDrafts({ limit: 100, sort: 'updateDt' });
console.log(`Черновиков: ${total}`);
for (const draft of drafts) {
  console.log(`${draft.draftId}: ${draft.skuQuantity} SKU, обновлён ${draft.updatedAt}`);
}
```

***

### deleteDraft()

```ts
deleteDraft(draftId: string): Promise<void>;
```

Defined in: [modules/orders-fbw/index.ts:366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L366)

Удалить черновик поставки

Метод удаляет черновик поставки по идентификатору.
Успешный ответ — **204 No Content** (без тела).

Токены: **Personal**, **Service** (категория Supplies).

Rate limit: 30 запросов в минуту (интервал 2 секунды, всплеск 10).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `draftId` | `string` | Идентификатор черновика (UUID) |

#### Returns

`Promise`\<`void`\>

#### Throws

When draftId format is invalid (400)

#### Throws

404 — черновик не найден

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

task-193

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/deleteV1DraftsDraftId](https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/deleteV1DraftsDraftId)

#### Example

```typescript
await sdk.ordersFBW.deleteDraft('b5aed067-69d4-47b8-a5d0-591c615288f9');
console.log('Черновик удалён');
```

***

### getDraftItems()

```ts
getDraftItems(draftId: string): Promise<ModelsListDraftItemsResponse>;
```

Defined in: [modules/orders-fbw/index.ts:402](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L402)

Товары в черновике поставки

Метод возвращает список товаров, добавленных в черновик поставки,
с карточкой товара (бренд, предмет, размер, изображение и т.д.).

Токены: **Personal**, **Service** (категория Supplies).

Rate limit: 30 запросов в минуту (интервал 2 секунды, всплеск 10).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `draftId` | `string` | Идентификатор черновика (UUID) |

#### Returns

`Promise`\<[`ModelsListDraftItemsResponse`](../-internal-/interfaces/ModelsListDraftItemsResponse.md)\>

Количество SKU/товаров и список товаров

#### Throws

When draftId format is invalid (400)

#### Throws

404 — черновик не найден

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

task-193

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/getV1DraftsDraftIdItems](https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/getV1DraftsDraftIdItems)

#### Example

```typescript
const { skuQuantity, items } = await sdk.ordersFBW.getDraftItems(draftId);
console.log(`SKU в черновике: ${skuQuantity}`);
for (const item of items) {
  console.log(`${item.vendorCode} (${item.sku}): ${item.quantity} шт`);
}
```

***

### addDraftItems()

```ts
addDraftItems(draftId: string, data: ModelsDraftAdditemsRequest): Promise<ModelsDraftAddItemsErrorResponse>;
```

Defined in: [modules/orders-fbw/index.ts:452](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L452)

Добавить товары в черновик поставки

Метод добавляет товары в черновик поставки (до 1000 позиций за запрос).

**Атомарность:** операция выполняется по принципу «всё или ничего»:
- если все SKU успешно прошли валидацию — все товары добавляются
  в черновик, ответ содержит `{"results": []}`;
- если хотя бы один SKU не прошёл валидацию — **ни один** товар
  не добавляется, ответ содержит список невалидных SKU с описанием ошибки.

Токены: **Personal**, **Service** (категория Supplies).

Rate limit: 30 запросов в минуту (интервал 2 секунды, всплеск 10).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `draftId` | `string` | Идентификатор черновика (UUID) |
| `data` | [`ModelsDraftAdditemsRequest`](../-internal-/interfaces/ModelsDraftAdditemsRequest.md) | Список товаров `{ quantity, sku }` (1–1000 позиций) |

#### Returns

`Promise`\<[`ModelsDraftAddItemsErrorResponse`](../-internal-/interfaces/ModelsDraftAddItemsErrorResponse.md)\>

`results` — список невалидных SKU; пустой массив означает,
  что все товары добавлены

#### Throws

When items array is empty or exceeds 1000 items

#### Throws

When draftId format or items array is invalid (400)

#### Throws

404 — черновик не найден

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

task-193

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/postV1DraftsDraftIdItems](https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/postV1DraftsDraftIdItems)

#### Example

```typescript
const { results } = await sdk.ordersFBW.addDraftItems(draftId, {
  items: [
    { quantity: 10, sku: '2000000512907' },
    { quantity: 5, sku: '2039395667350' },
  ],
});
if (results.length > 0) {
  // Ничего не добавлено — исправьте SKU и повторите запрос целиком
  for (const { sku, error } of results) {
    console.error(`${sku}: ${error.title} — ${error.detail}`);
  }
}
```

***

### deleteDraftItems()

```ts
deleteDraftItems(draftId: string, data: ModelsDraftDeleteitemsRequest): Promise<ModelsDraftDeleteItemsErrorResponse>;
```

Defined in: [modules/orders-fbw/index.ts:498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L498)

Удалить товары из черновика поставки

Метод удаляет товары из черновика поставки по списку SKU.

**Валидация SKU не выполняется:** при передаче несуществующего SKU
ошибка не возвращается — он молча игнорируется, а корректные SKU
удаляются из черновика.

Токены: **Personal**, **Service** (категория Supplies).

Rate limit: 30 запросов в минуту (интервал 2 секунды, всплеск 10).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `draftId` | `string` | Идентификатор черновика (UUID) |
| `data` | [`ModelsDraftDeleteitemsRequest`](../-internal-/interfaces/ModelsDraftDeleteitemsRequest.md) | Список SKU для удаления (минимум 1) |

#### Returns

`Promise`\<[`ModelsDraftDeleteItemsErrorResponse`](../-internal-/interfaces/ModelsDraftDeleteItemsErrorResponse.md)\>

`results` — результат операции

#### Throws

When skus array is empty

#### Throws

When request parameters are invalid (400)

#### Throws

404 — черновик не найден

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

task-193

#### See

[https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/deleteV1DraftsDraftIdItems](https://dev.wildberries.ru/docs/openapi/orders-fbw#tag/supplyDrafts/operation/deleteV1DraftsDraftIdItems)

#### Example

```typescript
await sdk.ordersFBW.deleteDraftItems(draftId, { skus: ['2000000512907'] });
```

***

### getClientInfo()

```ts
getClientInfo(orderIds: number[]): Promise<GetDBWClientInfoResponse>;
```

Defined in: [modules/orders-fbw/index.ts:539](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L539)

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

Defined in: [modules/orders-fbw/index.ts:577](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L577)

Удалить идентификаторы маркировки у нескольких заказов DBW (массовая операция).

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

Defined in: [modules/orders-fbw/index.ts:618](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L618)

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

Defined in: [modules/orders-fbw/index.ts:674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L674)

Передать несколько заказов DBW в доставку (массовая операция).

Mark up to 1000 DBW orders as "delivered" (handed to carrier) in a single request.
Mirrors the DBS `deliverBulk` method. WB disables the legacy single-order DBW
deliver endpoint on 2026-06-05 — use this method instead.

**Important:** Orders requiring IMEI/SGTIN must have metadata attached before calling
this method. If metadata is missing, WB returns 409 `MetaValidationFail`.

**B2C marking (Честный Знак):** WB validates B2C marking for DBW from 2026-06-15.
Invalid marking → HTTP 409 `MetaValidationFail` with diagnostic `metaDetails[]`.
Pre-flight via `checkMetaValidation()` to avoid the guess-and-retry loop.

Rate limit: 300 requests/min, 200ms interval, burst 20.
(Default mirrors DBS sibling — WB has not yet published explicit DBW limits.
Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `orderIds` | `number`[] | Array of order IDs to mark as delivered (1–1000 items) |

#### Returns

`Promise`\<[`BulkStatusChangeResponse`](../-internal-/interfaces/BulkStatusChangeResponse-1.md)\>

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

Defined in: [modules/orders-fbw/index.ts:738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/orders-fbw/index.ts#L738)

Проверить идентификаторы маркировки DBW-заказов перед передачей в доставку (предварительная валидация).

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

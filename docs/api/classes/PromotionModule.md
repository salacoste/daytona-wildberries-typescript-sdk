[Wildberries API TypeScript SDK](../modules.md) / PromotionModule

# Class: PromotionModule

Defined in: [modules/promotion/index.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L57)

## Constructors

### Constructor

```ts
new PromotionModule(client: BaseClient): PromotionModule;
```

Defined in: [modules/promotion/index.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L58)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`PromotionModule`

## Methods

### getAdvDelete()

```ts
getAdvDelete(options?: {
  id: number;
}): Promise<void>;
```

Defined in: [modules/promotion/index.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L75)

Удаление кампании

Метод удаляет [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) в статусе `4` — готова к запуску.<br><br> После удаления кампания некоторое время будет находиться в статусе `-1` — кампания в процессе удаления. Полное удаление кампании занимает от 3 до 10 минут. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `id`: `number`; \} | Query parameters |
| `options.id?` | `number` | - |

#### Returns

`Promise`\<`void`\>

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
const result = await sdk.promotion.getAdvDelete({});
console.log(result);
```

***

### createAdvRename()

```ts
createAdvRename(data?: {
  advertId: number;
  name: string;
}): Promise<void>;
```

Defined in: [modules/promotion/index.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L97)

Переименование кампании

Метод меняет название [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post). Это можно сделать в любой момент существования кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `advertId`: `number`; `name`: `string`; \} | Request body data |
| `data.advertId?` | `number` | - |
| `data.name?` | `string` | - |

#### Returns

`Promise`\<`void`\>

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
const result = await sdk.promotion.createAdvRename({});
console.log(result);
```

***

### getAdvStop()

```ts
getAdvStop(options?: {
  id: number;
}): Promise<void>;
```

Defined in: [modules/promotion/index.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L118)

Завершение кампании

Метод завершает [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) в статусах: - `4` — готово к запуску - `9` — активна - `11` — пауза <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `id`: `number`; \} | Query parameters |
| `options.id?` | `number` | - |

#### Returns

`Promise`\<`void`\>

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
const result = await sdk.promotion.getAdvStop({});
console.log(result);
```

***

### updateAuctionPlacement()

```ts
updateAuctionPlacement(data: {
  placements: {
     advert_id: number;
     placements: {
        search: boolean;
        recommendations: boolean;
     };
  }[];
}): Promise<void>;
```

Defined in: [modules/promotion/index.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L139)

Изменение мест размещения в кампаниях с ручной ставкой

Метод меняет места размещения в кампаниях с ручной ставкой. <br><br> Для кампаний в статусах `4`, `9` и `11`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `placements`: \{ `advert_id`: `number`; `placements`: \{ `search`: `boolean`; `recommendations`: `boolean`; \}; \}[]; \} | Request body data |
| `data.placements` | \{ `advert_id`: `number`; `placements`: \{ `search`: `boolean`; `recommendations`: `boolean`; \}; \}[] | - |

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
const result = await sdk.promotion.updateAuctionPlacement({});
```

***

### getAdvBalance()

```ts
getAdvBalance(): Promise<{
  balance?: number;
  net?: number;
  bonus?: number;
  currency?: string;
  cashbacks?: {
     sum?: number;
     percent?: number;
     expiration_date?: string;
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L161)

Баланс

Метод возвращает информацию о: - счёте кабинета Продвижения WB. Его пополняет продавец. - балансе — максимальной сумме для оплаты камапнии по взаиморасчету: удержании средств из будущих продаж. Баланс пополнить нельзя, он рассчитывается автоматически на основе отчётов по продвижению. - бонусных начислениях WB. Информацию о бюджете кампаний можно получить в [отдельном методе](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>

#### Returns

`Promise`\<\{
  `balance?`: `number`;
  `net?`: `number`;
  `bonus?`: `number`;
  `currency?`: `string`;
  `cashbacks?`: \{
     `sum?`: `number`;
     `percent?`: `number`;
     `expiration_date?`: `string`;
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
const result = await sdk.promotion.getAdvBalance();
console.log(result);
```

***

### getAdvBudget()

```ts
getAdvBudget(options?: {
  id: number;
}): Promise<{
  cash?: number;
  netting?: number;
  total?: number;
  currency?: string;
}>;
```

Defined in: [modules/promotion/index.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L194)

Бюджет кампании

Метод возвращает информацию о бюджете [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) — максимальной сумме затрат на кампанию. Бюджет кампании можно [пополнить](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget~1deposit/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `id`: `number`; \} | Query parameters |
| `options.id?` | `number` | - |

#### Returns

`Promise`\<\{
  `cash?`: `number`;
  `netting?`: `number`;
  `total?`: `number`;
  `currency?`: `string`;
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
const result = await sdk.promotion.getAdvBudget({});
console.log(result);
```

***

### createBudgetDeposit()

```ts
createBudgetDeposit(data: {
  sum?: number;
  cashback_sum?: number;
  cashback_percent?: number;
  type?: number;
  return?: boolean;
}, options?: {
  id: number;
}): Promise<ResponseWithReturn>;
```

Defined in: [modules/promotion/index.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L219)

Пополнение бюджета кампании

Метод пополняет [бюджет](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget/get) кампании в статусе `11` — на паузе. <br> Чтобы запустить кампанию после пополнения бюджета, используйте метод [Запуск кампании](/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1start/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `sum?`: `number`; `cashback_sum?`: `number`; `cashback_percent?`: `number`; `type?`: `number`; `return?`: `boolean`; \} | Request body data |
| `data.sum?` | `number` | - |
| `data.cashback_sum?` | `number` | - |
| `data.cashback_percent?` | `number` | - |
| `data.type?` | `number` | - |
| `data.return?` | `boolean` | - |
| `options?` | \{ `id`: `number`; \} | Query parameters |
| `options.id?` | `number` | - |

#### Returns

`Promise`\<[`ResponseWithReturn`](../-internal-/interfaces/ResponseWithReturn.md)\>

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
const result = await sdk.promotion.createBudgetDeposit({}, {});
console.log(result);
```

***

### getAdvUpd()

```ts
getAdvUpd(options?: {
  from: string;
  to: string;
}): Promise<{
  updNum?: number;
  updTime?: string;
  updSum?: number;
  advertId?: number;
  campName?: string;
  advertType?: number;
  paymentType?: string;
  advertStatus?: number;
}[]>;
```

Defined in: [modules/promotion/index.ts:251](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L251)

Получение истории затрат

Метод формирует список фактических затрат на рекламные кампании за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `from`: `string`; `to`: `string`; \} | Query parameters |
| `options.from?` | `string` | - |
| `options.to?` | `string` | - |

#### Returns

`Promise`\<\{
  `updNum?`: `number`;
  `updTime?`: `string`;
  `updSum?`: `number`;
  `advertId?`: `number`;
  `campName?`: `string`;
  `advertType?`: `number`;
  `paymentType?`: `string`;
  `advertStatus?`: `number`;
\}[]\>

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
const result = await sdk.promotion.getAdvUpd({});
console.log(result);
```

***

### getAdvPayments()

```ts
getAdvPayments(options?: {
  from?: string;
  to?: string;
}): Promise<{
  id?: number;
  date?: string;
  sum?: number;
  type?: number;
  statusId?: number;
  cardStatus?: string;
  currency?: string;
}[]>;
```

Defined in: [modules/promotion/index.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L295)

Получение истории пополнений счёта

Метод возвращает историю пополнений счёта **WB Продвижение** за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `from?`: `string`; `to?`: `string`; \} | Query parameters |
| `options.from?` | `string` | - |
| `options.to?` | `string` | - |

#### Returns

`Promise`\<\{
  `id?`: `number`;
  `date?`: `string`;
  `sum?`: `number`;
  `type?`: `number`;
  `statusId?`: `number`;
  `cardStatus?`: `string`;
  `currency?`: `string`;
\}[]\>

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
const result = await sdk.promotion.getAdvPayments({});
console.log(result);
```

***

### updateAuctionNm()

```ts
updateAuctionNm(data: {
  nms: {
     advert_id: number;
     nms: {
        add?: unknown;
        delete?: number[];
     };
  }[];
}): Promise<{
  nms: {
     advert_id: number;
     nms: {
        added: number[];
        deleted: number[];
     };
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L337)

Изменение списка карточек товаров в кампаниях

Метод добавляет и удаляет карточки товаров в кампаниях. <br><br> Для кампаний в статусах `4`, `9` и `11`. <br><br> Для добавляемых товаров устанавливается текущая минимальная ставка. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nms`: \{ `advert_id`: `number`; `nms`: \{ `add?`: `unknown`; `delete?`: `number`[]; \}; \}[]; \} | Request body data |
| `data.nms` | \{ `advert_id`: `number`; `nms`: \{ `add?`: `unknown`; `delete?`: `number`[]; \}; \}[] | - |

#### Returns

`Promise`\<\{
  `nms`: \{
     `advert_id`: `number`;
     `nms`: \{
        `added`: `number`[];
        `deleted`: `number`[];
     \};
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
const result = await sdk.promotion.updateAuctionNm({});
console.log(result);
```

***

### getAdvCount()

```ts
getAdvCount(): Promise<{
  all?: number;
  adverts?: {
     type?: number;
     status?: number;
     count?: number;
  };
}>;
```

Defined in: [modules/promotion/index.ts:361](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L361)

Количество медиакампаний

Метод возвращает количество [медиакампаний](/openapi/promotion#tag/Media/paths/~1adv~1v1~1advert/get) продавца с группировкой по статусам. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>

#### Returns

`Promise`\<\{
  `all?`: `number`;
  `adverts?`: \{
     `type?`: `number`;
     `status?`: `number`;
     `count?`: `number`;
  \};
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
const result = await sdk.promotion.getAdvCount();
console.log(result);
```

***

### getAdvAdverts()

```ts
getAdvAdverts(options?: {
  status?: number;
  type?: number;
  limit?: number;
  offset?: number;
  order?: string;
  direction?: string;
}): Promise<{
  advertId?: number;
  name?: string;
  brand?: string;
  type?: number;
  status?: number;
  createTime?: string;
  endTime?: string;
}[]>;
```

Defined in: [modules/promotion/index.ts:388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L388)

Список медиакампаний

Метод возвращает список всех [медиакампаний](/openapi/promotion#tag/Media/paths/~1adv~1v1~1advert/get) продавца по их типам и статусам. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `status?`: `number`; `type?`: `number`; `limit?`: `number`; `offset?`: `number`; `order?`: `string`; `direction?`: `string`; \} | Query parameters |
| `options.status?` | `number` | - |
| `options.type?` | `number` | - |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.order?` | `string` | - |
| `options.direction?` | `string` | - |

#### Returns

`Promise`\<\{
  `advertId?`: `number`;
  `name?`: `string`;
  `brand?`: `string`;
  `type?`: `number`;
  `status?`: `number`;
  `createTime?`: `string`;
  `endTime?`: `string`;
\}[]\>

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
const result = await sdk.promotion.getAdvAdverts({});
console.log(result);
```

***

### getAdvAdvert()

```ts
getAdvAdvert(options?: {
  id: number;
}): Promise<{
  advertId?: number;
  name?: string;
  brand?: string;
  type?: number;
  status?: number;
  createTime?: string;
  extended?: {
     reason?: string;
     expenses?: number;
     from?: string;
     to?: string;
     updated_at?: string;
     price?: number;
     budget?: number;
     operation?: number;
     contract_id?: number;
  };
  items?: {
     id?: number;
     name?: string;
     status?: number;
     place?: number;
     budget?: number;
     daily_limit?: number;
     category_name?: string;
     cpm?: number;
     url?: string;
     advert_type?: number;
     created_at?: string;
     updated_at?: string;
     date_from?: string;
     date_to?: string;
     nms?: number[];
     bottomText1?: string;
     bottomText2?: string;
     message?: string;
     additionalSettings?: number;
     receiversCount?: number;
     subject_id?: number;
     subject_name?: string;
     action_name?: string;
     show_hours?: {
        From?: number;
        To?: number;
     }[];
     Erid?: string;
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L437)

Информация о медиакампании

Метод возвращает информацию о кампании [WB Медиа](https://cmp.wildberries.ru/cmpf/list). Вместо карточек товаров в медиакампаниях продвигаются рекламные баннеры продавца на сайте и в приложении WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `id`: `number`; \} | Query parameters |
| `options.id?` | `number` | - |

#### Returns

`Promise`\<\{
  `advertId?`: `number`;
  `name?`: `string`;
  `brand?`: `string`;
  `type?`: `number`;
  `status?`: `number`;
  `createTime?`: `string`;
  `extended?`: \{
     `reason?`: `string`;
     `expenses?`: `number`;
     `from?`: `string`;
     `to?`: `string`;
     `updated_at?`: `string`;
     `price?`: `number`;
     `budget?`: `number`;
     `operation?`: `number`;
     `contract_id?`: `number`;
  \};
  `items?`: \{
     `id?`: `number`;
     `name?`: `string`;
     `status?`: `number`;
     `place?`: `number`;
     `budget?`: `number`;
     `daily_limit?`: `number`;
     `category_name?`: `string`;
     `cpm?`: `number`;
     `url?`: `string`;
     `advert_type?`: `number`;
     `created_at?`: `string`;
     `updated_at?`: `string`;
     `date_from?`: `string`;
     `date_to?`: `string`;
     `nms?`: `number`[];
     `bottomText1?`: `string`;
     `bottomText2?`: `string`;
     `message?`: `string`;
     `additionalSettings?`: `number`;
     `receiversCount?`: `number`;
     `subject_id?`: `number`;
     `subject_name?`: `string`;
     `action_name?`: `string`;
     `show_hours?`: \{
        `From?`: `number`;
        `To?`: `number`;
     \}[];
     `Erid?`: `string`;
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
const result = await sdk.promotion.getAdvAdvert({});
console.log(result);
```

***

### getAdvFullstats()

```ts
getAdvFullstats(options?: {
  ids: string;
  beginDate: string;
  endDate: string;
}): Promise<ResponseFullStats>;
```

Defined in: [modules/promotion/index.ts:549](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L549)

Статистика кампаний

Метод формирует статистику для кампаний независимо от типа. <br><br> Максимальный период в запросе — 31 день. <br><br> Для кампаний в статусах `7`, `9` и `11`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `ids`: `string`; `beginDate`: `string`; `endDate`: `string`; \} | Query parameters |
| `options.ids?` | `string` | - |
| `options.beginDate?` | `string` | - |
| `options.endDate?` | `string` | - |

#### Returns

`Promise`\<[`ResponseFullStats`](../-internal-/type-aliases/ResponseFullStats.md)\>

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
const result = await sdk.promotion.getAdvFullstats({});
console.log(result);
```

***

### createAdvStat()

```ts
createAdvStat(data: 
  | RequestWithDate
  | RequestWithInterval
  | RequestWithCampaignID[]): Promise<
  | StatInterval
  | StatDate
| Stat[]>;
```

Defined in: [modules/promotion/index.ts:575](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L575)

Статистика медиакампаний

Метод формирует статистику кампаний сервиса [WB Медиа](https://cmp.wildberries.ru/cmpf/statistics). Статистику можно группировать по датам и/или интервалам. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \| [`RequestWithDate`](../-internal-/interfaces/RequestWithDate.md) \| [`RequestWithInterval`](../-internal-/interfaces/RequestWithInterval.md) \| [`RequestWithCampaignID`](../-internal-/interfaces/RequestWithCampaignID.md)[] | Request body data |

#### Returns

`Promise`\<
  \| [`StatInterval`](../-internal-/interfaces/StatInterval.md)
  \| [`StatDate`](../-internal-/interfaces/StatDate.md)
  \| [`Stat`](../-internal-/interfaces/Stat.md)[]\>

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
const result = await sdk.promotion.createAdvStat({});
console.log(result);
```

***

### getCalendarPromotions()

```ts
getCalendarPromotions(options?: {
  startDateTime: string;
  endDateTime: string;
  allPromo: boolean;
  limit?: number;
  offset?: number;
}): Promise<unknown>;
```

Defined in: [modules/promotion/index.ts:600](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L600)

Список акций

Метод возвращает список [акций](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get) в WB с датами и временем проведения. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `startDateTime`: `string`; `endDateTime`: `string`; `allPromo`: `boolean`; `limit?`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.startDateTime?` | `string` | - |
| `options.endDateTime?` | `string` | - |
| `options.allPromo?` | `boolean` | - |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.promotion.getCalendarPromotions({});
console.log(result);
```

***

### getPromotionsDetails()

```ts
getPromotionsDetails(options?: {
  promotionIDs: string;
}): Promise<unknown>;
```

Defined in: [modules/promotion/index.ts:628](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L628)

Детальная информация об акциях

Метод возвращает подробную информацию об [акции](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get) по ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `promotionIDs`: `string`; \} | Query parameters |
| `options.promotionIDs?` | `string` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.promotion.getPromotionsDetails({});
console.log(result);
```

***

### getPromotionsNomenclatures()

```ts
getPromotionsNomenclatures(options?: {
  promotionID: number;
  inAction: boolean;
  limit?: number;
  offset?: number;
}): Promise<unknown>;
```

Defined in: [modules/promotion/index.ts:650](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L650)

Список товаров для участия в акции

Метод формирует список товаров, подходящих для участия в [акции](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get). Эти товары можно добавить в акцию с помощью [отдельного метода](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1upload/post). <div class="description_important"> Данный метод неприменим для автоакций. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `promotionID`: `number`; `inAction`: `boolean`; `limit?`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.promotionID?` | `number` | - |
| `options.inAction?` | `boolean` | - |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.promotion.getPromotionsNomenclatures({});
console.log(result);
```

***

### createPromotionsUpload()

```ts
createPromotionsUpload(): Promise<unknown>;
```

Defined in: [modules/promotion/index.ts:676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L676)

Добавить товар в акцию

Метод создаёт задание на загрузку товара в [акцию](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get).<br> Состояние загрузки можно проверить с помощью [отдельных методов](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get). <div class="description_important"> Данный метод неприменим для автоакций. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.promotion.createPromotionsUpload();
console.log(result);
```

***

### getNormqueryStats()

```ts
getNormqueryStats(data: V0GetNormQueryStatsRequest): Promise<V0GetNormQueryStatsResponse>;
```

Defined in: [modules/promotion/index.ts:717](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L717)

Статистика поисковых кластеров

Метод возвращает статистику по поисковым кластерам за указанный период.
Можно использовать только для кампаний с моделью оплаты `cpm` — за показы.

Rate limit: 10 requests per minute, 6 second interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V0GetNormQueryStatsRequest`](../-internal-/interfaces/V0GetNormQueryStatsRequest.md) | Request body with date range and campaign/product items |

#### Returns

`Promise`\<[`V0GetNormQueryStatsResponse`](../-internal-/interfaces/V0GetNormQueryStatsResponse.md)\>

Statistics for search clusters

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Statistika/paths/~1adv~1v0~1normquery~1stats/post](https://dev.wildberries.ru/openapi/promotion#tag/Statistika/paths/~1adv~1v0~1normquery~1stats/post)

#### Example

```typescript
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-10-07',
  to: '2025-10-08',
  items: [{ advert_id: 1825035, nm_id: 983512347 }]
});
console.log(stats.stats);
```

#### Remarks

Prefer the V1 successor [PromotionModule.getNormqueryStatsV1](#getnormquerystatsv1)
(`/adv/v1/normquery/stats`), which returns daily-detailed statistics and supports
both `cpm` and `cpc` campaigns.

***

### getNormqueryList()

```ts
getNormqueryList(data: V0GetNormQueryListRequest): Promise<V0GetNormQueryListResponse>;
```

Defined in: [modules/promotion/index.ts:748](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L748)

Active and Inactive Search Cluster Lists

Метод возвращает списки активных и неактивных поисковых кластеров
с количеством просмотров от 100 по ID кампаний и артикулам WB.

Rate limit: 5 requests per second, 200ms interval, burst 10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V0GetNormQueryListRequest`](../-internal-/interfaces/V0GetNormQueryListRequest.md) | Request body with campaign/product items (max 100) |

#### Returns

`Promise`\<[`V0GetNormQueryListResponse`](../-internal-/interfaces/V0GetNormQueryListResponse.md)\>

Lists of active and inactive search clusters per campaign/product

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Search-Clusters/paths/~1adv~1v0~1normquery~1list/post](https://dev.wildberries.ru/openapi/promotion#tag/Search-Clusters/paths/~1adv~1v0~1normquery~1list/post)

#### Example

```typescript
const result = await sdk.promotion.getNormqueryList({
  items: [{ advertId: 123456789, nmId: 987654321 }]
});
console.log(result.items?.[0]?.normQueries?.active);
```

***

### getNormqueryStatsV1()

```ts
getNormqueryStatsV1(data: V1GetNormQueryStatsRequest): Promise<V1GetNormQueryStatsResponse>;
```

Defined in: [modules/promotion/index.ts:785](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L785)

Daily Search Clusters Statistics (v1)

Метод возвращает статистику (просмотры, клики, добавления в корзину, заказы,
CTR, CPC, CPM и т.д.) по поисковым кластерам за указанный период с детализацией
по дням. Применимо для кампаний с моделью оплаты `cpm` — за показы, и `cpc` —
за клики.

V1-преемник метода [PromotionModule.getNormqueryStats](#getnormquerystats) (`/adv/v0/normquery/stats`).

Rate limit: 10 requests per minute, 6 second interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V1GetNormQueryStatsRequest`](../-internal-/interfaces/V1GetNormQueryStatsRequest.md) | Request body with date range and campaign/product items (max 100) |

#### Returns

`Promise`\<[`V1GetNormQueryStatsResponse`](../-internal-/interfaces/V1GetNormQueryStatsResponse.md)\>

Daily-detailed statistics for search clusters

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Statistics/paths/~1adv~1v1~1normquery~1stats/post](https://dev.wildberries.ru/openapi/promotion#tag/Statistics/paths/~1adv~1v1~1normquery~1stats/post)

#### Example

```typescript
const stats = await sdk.promotion.getNormqueryStatsV1({
  from: '2026-01-01',
  to: '2026-01-30',
  items: [{ advertId: 123456789, nmId: 987654321 }]
});
console.log(stats.items[0]?.dailyStats);
```

***

### getNormqueryBids()

```ts
getNormqueryBids(data: V0GetNormQueryBidsRequest): Promise<V0GetNormQueryBidsResponse>;
```

Defined in: [modules/promotion/index.ts:817](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L817)

Список ставок поисковых кластеров

Метод возвращает список поисковых кластеров со ставками по ID кампаний и артикулам WB.

Rate limit: 5 requests per second, 200ms interval, burst 10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V0GetNormQueryBidsRequest`](../-internal-/interfaces/V0GetNormQueryBidsRequest.md) | Request body with campaign/product items |

#### Returns

`Promise`\<[`V0GetNormQueryBidsResponse`](../-internal-/interfaces/V0GetNormQueryBidsResponse.md)\>

List of search cluster bids

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-bids/post](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-bids/post)

#### Example

```typescript
const bids = await sdk.promotion.getNormqueryBids({
  items: [{ advert_id: 1825035, nm_id: 983512347 }]
});
console.log(bids.bids);
```

***

### setNormqueryBids()

```ts
setNormqueryBids(data: V0SetNormQueryBidsRequest): Promise<void>;
```

Defined in: [modules/promotion/index.ts:863](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L863)

Установить ставки для поисковых кластеров

Метод устанавливает ставки на поисковые кластеры.
Можно использовать только для кампаний с ручной ставкой и моделью оплаты `cpm` — за показы.

**Единицы**: `bid` указывается в **целых рублях (₽)**, а НЕ в копейках — это
  ставка CPM (цена за 1000 показов) для конкретного поискового кластера
  (`norm_query`). В отличие от [PromotionModule.updateBids](#updatebids), где
  `bid_kopecks` — в копейках и применяется к кампании/артикулу, а не к кластеру.
  Не путайте единицы — частый footgun.

**Модель**: это устаревшая поверхность биддинга normquery/catalog (`/adv/v0/...`).
  Для нового кода предпочитайте [PromotionModule.updateBids](#updatebids) (V1, копейки);
  этот метод — только если нужен CPM-контроль per search-cluster в ручной
  `cpm`-кампании.

Rate limit: 2 requests per second, 500ms interval, burst 4

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V0SetNormQueryBidsRequest`](../-internal-/interfaces/V0SetNormQueryBidsRequest.md) | Request body with bids to set |

#### Returns

`Promise`\<`void`\>

void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1bids/post](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1bids/post)

#### Example

```typescript
await sdk.promotion.setNormqueryBids({
  bids: [{
    advert_id: 1825035,
    nm_id: 983512347,
    norm_query: 'Фраза 1',
    bid: 1000
  }]
});
```

***

### deleteNormqueryBids()

```ts
deleteNormqueryBids(data: V0SetNormQueryBidsRequest): Promise<void>;
```

Defined in: [modules/promotion/index.ts:896](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L896)

Удалить ставки поисковых кластеров

Метод удаляет ставки с поисковых кластеров.
Можно использовать только для кампаний с ручной ставкой и моделью оплаты `cpm` — за показы.

Rate limit: 5 requests per second, 200ms interval, burst 10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V0SetNormQueryBidsRequest`](../-internal-/interfaces/V0SetNormQueryBidsRequest.md) | Request body with bids to delete |

#### Returns

`Promise`\<`void`\>

void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1bids/delete](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1bids/delete)

#### Example

```typescript
await sdk.promotion.deleteNormqueryBids({
  bids: [{
    advert_id: 1825035,
    nm_id: 983512347,
    norm_query: 'Фраза 1',
    bid: 1000
  }]
});
```

***

### getV1Config()

```ts
getV1Config(): Promise<V2GetConfigResponse>;
```

Defined in: [modules/promotion/index.ts:924](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L924)

Конфигурация кабинета продвижения (V1)

Возвращает валюту, код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances)
и допустимые шаги ставок (`cpmStep`, `cpcStep`) для метода
[PromotionModule.postV1NormqueryBids](#postv1normquerybids).

Rate limit: 1 request per minute, 1 min interval, burst 10

#### Returns

`Promise`\<[`V2GetConfigResponse`](../-internal-/interfaces/V2GetConfigResponse.md)\>

Account currency, currency code and allowed bid steps (CPM and CPC)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

task-170

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Kampanii/operation/getV1Config](https://dev.wildberries.ru/openapi/promotion#tag/Kampanii/operation/getV1Config)

#### Example

```typescript
const config = await sdk.promotion.getV1Config();
console.log(config.currency, config.currencyCode, config.cpmStep, config.cpcStep);
```

***

### postV1NormqueryBids()

```ts
postV1NormqueryBids(data: V1SetNormQueryBidsRequest): Promise<V1SetNormQueryBidsResponse>;
```

Defined in: [modules/promotion/index.ts:966](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L966)

Установить ставки для поисковых кластеров в валюте кабинета (V1)

Устанавливает ставки для поисковых кластеров в валюте [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances).
Доступно только для кампаний с ручной ставкой и моделью оплаты `cpm` — за показы.
Допустимый шаг ставки возвращается методом [PromotionModule.getV1Config](#getv1config).

Отличается от [PromotionModule.setNormqueryBids](#setnormquerybids) (v0, `/adv/v0/normquery/bids`):
v1 принимает ставку в `bidMinorUnits` и работает в валюте кабинета продавца.

Rate limit: 2 requests per second, 500ms interval, burst 4

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V1SetNormQueryBidsRequest`](../-internal-/interfaces/V1SetNormQueryBidsRequest.md) | Request body with bids in minor currency units (max 100 items) |

#### Returns

`Promise`\<[`V1SetNormQueryBidsResponse`](../-internal-/interfaces/V1SetNormQueryBidsResponse.md)\>

Result with successfully applied bids and failed bids (with reasons)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

task-170

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/operation/postV1NormqueryBids](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/operation/postV1NormqueryBids)

#### Example

```typescript
const result = await sdk.promotion.postV1NormqueryBids({
  bids: [{
    advertId: 1825035,
    nmId: 983512347,
    normQuery: 'Фраза 1',
    bidMinorUnits: 1000
  }]
});
console.log(result.success, result.failed);
```

***

### getNormqueryMinus()

```ts
getNormqueryMinus(data: V0GetNormQueryMinusRequest): Promise<V0GetNormQueryMinusResponse>;
```

Defined in: [modules/promotion/index.ts:996](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L996)

Список минус-фраз кампаний

Метод возвращает список минус-фраз по ID кампаний и артикулам WB.

Rate limit: 5 requests per second, 200ms interval, burst 10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V0GetNormQueryMinusRequest`](../-internal-/interfaces/V0GetNormQueryMinusRequest.md) | Request body with campaign/product items |

#### Returns

`Promise`\<[`V0GetNormQueryMinusResponse`](../-internal-/interfaces/V0GetNormQueryMinusResponse.md)\>

List of minus-phrases

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-minus/post](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-minus/post)

#### Example

```typescript
const minusPhrases = await sdk.promotion.getNormqueryMinus({
  items: [{ advert_id: 1825035, nm_id: 983512347 }]
});
console.log(minusPhrases.items);
```

***

### setNormqueryMinus()

```ts
setNormqueryMinus(data: V0SetMinusNormQueryRequest): Promise<void>;
```

Defined in: [modules/promotion/index.ts:1028](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1028)

Установка и удаление минус-фраз

Метод устанавливает и удаляет минус-фразы в кампаниях с ручной ставкой и моделью оплаты `cpm` — за показы.
Отправка пустого массива удаляет все минус-фразы.

Rate limit: 5 requests per second, 200ms interval, burst 10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`V0SetMinusNormQueryRequest`](../-internal-/interfaces/V0SetMinusNormQueryRequest.md) | Request body with minus-phrases to set |

#### Returns

`Promise`\<`void`\>

void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1set-minus/post](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1set-minus/post)

#### Example

```typescript
await sdk.promotion.setNormqueryMinus({
  advert_id: 1825035,
  nm_id: 983512347,
  norm_queries: ['Фраза 1', 'Фраза 2']
});
```

***

### getAdvertsV2()

```ts
getAdvertsV2(options?: {
  ids?: string;
  statuses?: string;
  payment_type?: "cpm" | "cpc";
}): Promise<GetAdvertsV2Response>;
```

Defined in: [modules/promotion/index.ts:1075](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1075)

Информация о кампаниях (V2)

Метод возвращает информацию о рекламных кампаниях с единой или ручной ставкой
по их статусам, типам оплаты и ID. Replaces deprecated v1 endpoints.

Данные синхронизируются с базой раз в 3 минуты. Статусы кампаний меняются раз в минуту.
Ставки кампаний меняются раз в 30 секунд.

Rate limit: 5 requests per second, 200ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `ids?`: `string`; `statuses?`: `string`; `payment_type?`: `"cpm"` \| `"cpc"`; \} | Query parameters for filtering campaigns |
| `options.ids?` | `string` | Campaign IDs, comma-separated (max 50) |
| `options.statuses?` | `string` | Campaign statuses: -1 (deleted), 4 (ready), 7 (finished), 8 (cancelled), 9 (active), 11 (paused) |
| `options.payment_type?` | `"cpm"` \| `"cpc"` | Payment type: cpm (per impressions) or cpc (per click) |

#### Returns

`Promise`\<[`GetAdvertsV2Response`](../-internal-/interfaces/GetAdvertsV2Response.md)\>

List of campaigns with bid_type (unified/manual) and bids in kopecks

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

3.4.0 — Return type changed from GetAdverts to GetAdvertsV2Response

#### See

[https://dev.wildberries.ru/docs/openapi/promotion#tag/Kampanii/paths/~1api~1advert~1v2~1adverts/get](https://dev.wildberries.ru/docs/openapi/promotion#tag/Kampanii/paths/~1api~1advert~1v2~1adverts/get)

#### Example

```typescript
const campaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,23456',
  statuses: '9,11',
  payment_type: 'cpm',
});
for (const advert of campaigns.adverts) {
  console.log(advert.id, advert.bid_type, advert.status);
  for (const nm of advert.nm_settings) {
    console.log(`  nmId=${nm.nm_id} search=${nm.bids_kopecks.search} reco=${nm.bids_kopecks.recommendations}`);
  }
}
```

***

### getBidsMinV2()

```ts
getBidsMinV2(data: {
  advert_id: number;
  nm_ids: number[];
  payment_type: "cpm" | "cpc";
  placement_types: ("combined" | "search" | "recommendation")[];
}): Promise<{
  bids: {
     nm_id: number;
     bids: {
        type: PlacementType;
        value: number;
        currency?: string;
     }[];
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:1115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1115)

Минимальные ставки для карточек товаров (V1 API)

Метод возвращает минимальные ставки для карточек товаров в копейках
по типу оплаты и местам размещения. Replaces deprecated v0 endpoint.

Rate limit: 20 requests per minute, 3 second interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `advert_id`: `number`; `nm_ids`: `number`[]; `payment_type`: `"cpm"` \| `"cpc"`; `placement_types`: (`"combined"` \| `"search"` \| `"recommendation"`)[]; \} | Request body with campaign ID, product IDs, payment type, and placement types |
| `data.advert_id` | `number` | - |
| `data.nm_ids` | `number`[] | - |
| `data.payment_type` | `"cpm"` \| `"cpc"` | - |
| `data.placement_types` | (`"combined"` \| `"search"` \| `"recommendation"`)[] | - |

#### Returns

`Promise`\<\{
  `bids`: \{
     `nm_id`: `number`;
     `bids`: \{
        `type`: [`PlacementType`](../-internal-/type-aliases/PlacementType.md);
        `value`: `number`;
        `currency?`: `string`;
     \}[];
  \}[];
\}\>

Minimum bids for products by placement type (in kopecks)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij/paths/~1api~1advert~1v1~1bids~1min/post](https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij/paths/~1api~1advert~1v1~1bids~1min/post)

#### Example

```typescript
const minBids = await sdk.promotion.getBidsMinV2({
  advert_id: 98765432,
  nm_ids: [12345678, 87654321],
  payment_type: 'cpm',
  placement_types: ['combined', 'search', 'recommendation']
});
console.log(minBids.bids);
```

***

### getBidsRecommendations()

```ts
getBidsRecommendations(params: GetBidsRecommendationsParams): Promise<BidsRecommendationsResponse>;
```

Defined in: [modules/promotion/index.ts:1173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1173)

Рекомендуемые ставки для карточек товаров и поисковых кластеров

Метод возвращает рекомендуемые ставки для карточек товаров и поисковых кластеров кампании.
Только для кампаний с типом оплаты cpm (за показы).

Данные синхронизируются с базой раз в 3 минуты.
Для приостановленных кампаний `normQueries` может быть пустым массивом.

**Кэширование**: данные обновляются на стороне WB раз в ~3 минуты, поэтому
  кэшируйте ответ на стороне клиента с TTL ~180 с. Это удержит вас в рамках
  лимита 5 запросов/мин (и спасёт от 429) — более частые вызовы всё равно
  вернут устаревшие данные.

Rate limit: 5 requests per minute, 12-second interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`GetBidsRecommendationsParams`](../-internal-/interfaces/GetBidsRecommendationsParams.md) | Campaign ID and WB article ID |

#### Returns

`Promise`\<[`BidsRecommendationsResponse`](../-internal-/interfaces/BidsRecommendationsResponse.md)\>

Recommended bids: base (card-level) and normQueries (per search cluster)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When nmId does not belong to campaign or params invalid (400)

#### Throws

When network request fails or times out

#### Since

3.4.0

#### See

[https://dev.wildberries.ru/docs/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1api~1advert~1v0~1bids~1recommendations/get](https://dev.wildberries.ru/docs/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1api~1advert~1v0~1bids~1recommendations/get)

#### Example

```typescript
const reco = await sdk.promotion.getBidsRecommendations({
  advertId: 29081652,
  nmId: 148190095,
});
for (const nq of reco.normQueries) {
  console.log(`${nq.normQuery}: min=${nq.reachMin.bidKopecks} med=${nq.reachMedium.bidKopecks} max=${nq.reachMax.bidKopecks}`);
}
```

***

### getCampaignCount()

```ts
getCampaignCount(): Promise<GetCampaignCountResponse>;
```

Defined in: [modules/promotion/index.ts:1214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1214)

Получение списков кампаний

Возвращает списки всех рекламных кампаний продавца с их ID.
Кампании сгруппированы по типу и статусу, у каждой указана дата последнего изменения.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 сек | 5 запросов | 200 мс | 5 запросов |

#### Returns

`Promise`\<[`GetCampaignCountResponse`](../-internal-/interfaces/GetCampaignCountResponse.md)\>

Списки кампаний по типам и статусам

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Kampanii](https://dev.wildberries.ru/openapi/promotion#tag/Kampanii)

#### Example

```typescript
const campaigns = await sdk.promotion.getCampaignCount();
console.log(`Total campaigns: ${campaigns.all}`);
for (const group of campaigns.adverts || []) {
  console.log(`Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);
}
```

***

### createCampaign()

```ts
createCampaign(data: CreateCampaignRequest): Promise<number>;
```

Defined in: [modules/promotion/index.ts:1250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1250)

Создание кампании

Метод создаёт рекламную кампанию с единой или ручной ставкой.
Возвращает ID созданной кампании.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 5 запросов | 12 сек | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`CreateCampaignRequest`](../-internal-/interfaces/CreateCampaignRequest.md) | Данные для создания кампании |

#### Returns

`Promise`\<`number`\>

ID созданной кампании

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij](https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij)

#### Example

```typescript
const campaignId = await sdk.promotion.createCampaign({
  name: 'My Campaign',
  nms: [12345678, 87654321],
  bid_type: 'manual',
  payment_type: 'cpm',
  placement_types: ['search', 'recommendation']
});
console.log(`Created campaign with ID: ${campaignId}`);
```

***

### getSupplierSubjects()

```ts
getSupplierSubjects(params?: GetSupplierSubjectsParams): Promise<
  | SupplierSubject[]
| null>;
```

Defined in: [modules/promotion/index.ts:1284](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1284)

Список предметов продавца

Метод возвращает список предметов, для которых можно создать кампанию.
Возвращает null, если нет товаров для создания кампаний.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 5 запросов | 12 сек | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`GetSupplierSubjectsParams`](../-internal-/interfaces/GetSupplierSubjectsParams.md) | Параметры фильтрации |

#### Returns

`Promise`\<
  \| [`SupplierSubject`](../-internal-/interfaces/SupplierSubject.md)[]
  \| `null`\>

Список предметов или null

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij](https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij)

#### Example

```typescript
const subjects = await sdk.promotion.getSupplierSubjects({ payment_type: 'cpm' });
if (subjects) {
  for (const subject of subjects) {
    console.log(`${subject.name}: ${subject.count} products`);
  }
}
```

***

### getSupplierNms()

```ts
getSupplierNms(subjectIds: number[]): Promise<SupplierNmItem[]>;
```

Defined in: [modules/promotion/index.ts:1316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1316)

Список карточек товаров продавца

Метод возвращает список карточек товаров по указанным предметам.
Используется для получения артикулов WB для добавления в кампанию.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 5 запросов | 12 сек | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `subjectIds` | `number`[] | Массив ID предметов |

#### Returns

`Promise`\<[`SupplierNmItem`](../-internal-/interfaces/SupplierNmItem.md)[]\>

Список карточек товаров

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij](https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij)

#### Example

```typescript
const products = await sdk.promotion.getSupplierNms([123, 456]);
for (const product of products) {
  console.log(`${product.title} (nmId: ${product.nm})`);
}
```

***

### startCampaign()

```ts
startCampaign(id: number): Promise<void>;
```

Defined in: [modules/promotion/index.ts:1348](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1348)

Запуск кампании

Метод запускает кампании в статусах:
- `4` — готова к запуску
- `11` — на паузе

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 сек | 5 запросов | 200 мс | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | ID кампании |

#### Returns

`Promise`\<`void`\>

void

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When campaign is in wrong status (400)

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami](https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami)

#### Example

```typescript
await sdk.promotion.startCampaign(12345);
console.log('Campaign started successfully');
```

***

### pauseCampaign()

```ts
pauseCampaign(id: number): Promise<void>;
```

Defined in: [modules/promotion/index.ts:1378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1378)

Пауза кампании

Метод ставит кампании на паузу. Работает только для кампаний в статусе:
- `9` — активна

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 сек | 5 запросов | 200 мс | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | ID кампании |

#### Returns

`Promise`\<`void`\>

void

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When campaign is in wrong status (400)

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami](https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami)

#### Example

```typescript
await sdk.promotion.pauseCampaign(12345);
console.log('Campaign paused successfully');
```

***

### getMinusPhrases()

```ts
getMinusPhrases(request: GetMinusPhrasesRequest): Promise<GetMinusPhrasesResponse>;
```

Defined in: [modules/promotion/index.ts:1415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1415)

Получить минус-фразы для кампаний

Возвращает список минус-фраз по ID кампаний и артикулам WB.

**nm_id по типу кампании:**
- Type 8 (устаревший): nm_id=0 для всей кампании
- Type 9 (актуальный): nm_id = реальный артикул WB

Rate limit: 5 requests per second, 200ms interval, burst 10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`GetMinusPhrasesRequest`](../-internal-/interfaces/GetMinusPhrasesRequest.md) | Запрос с массивом items (max 100) |

#### Returns

`Promise`\<[`GetMinusPhrasesResponse`](../-internal-/interfaces/GetMinusPhrasesResponse.md)\>

Promise<GetMinusPhrasesResponse>

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-minus/post](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-minus/post)

#### Example

```typescript
const result = await sdk.promotion.getMinusPhrases({
  items: [{ advert_id: 123456, nm_id: 789012 }]
});
console.log(result.items[0].norm_queries); // ['фраза1', 'фраза2']
```

***

### setMinusPhrases()

```ts
setMinusPhrases(request: SetMinusPhrasesRequest): Promise<void>;
```

Defined in: [modules/promotion/index.ts:1460](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1460)

Установить минус-фразы для кампании

Устанавливает минус-фразы в кампаниях с ручной ставкой и CPM.

**ВАЖНО:** Отправка пустого массива norm_queries УДАЛЯЕТ ВСЕ минус-фразы!

**nm_id по типу кампании:**
- Type 8: nm_id=0 для настроек всей кампании
- Type 9: nm_id = реальный артикул WB

Rate limit: 5 requests per second, 200ms interval, burst 10

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SetMinusPhrasesRequest`](../-internal-/interfaces/SetMinusPhrasesRequest.md) | Запрос (max 1000 norm_queries) |

#### Returns

`Promise`\<`void`\>

Promise<void>

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1set-minus/post](https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1set-minus/post)

#### Example

```typescript
// Установить минус-фразы
await sdk.promotion.setMinusPhrases({
  advert_id: 123456,
  nm_id: 789012,
  norm_queries: ['нежелательная фраза', 'другая фраза']
});

// Удалить ВСЕ минус-фразы
await sdk.promotion.setMinusPhrases({
  advert_id: 123456,
  nm_id: 789012,
  norm_queries: []  // УДАЛЯЕТ ВСЕ!
});
```

***

### getSearchClusterStats()

```ts
getSearchClusterStats(request: GetSearchClusterStatsRequest): Promise<GetSearchClusterStatsResponse>;
```

Defined in: [modules/promotion/index.ts:1503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1503)

Получить статистику поисковых кластеров

Возвращает статистику по поисковым кластерам за период.

Поддерживает кампании cpm и cpc. Для cpc-кампаний поля `views`, `ctr`, `cpm` отсутствуют в ответе.

**nm_id по типу кампании:**
- Type 8: nm_id=0 для агрегированной статистики
- Type 9: nm_id = реальный артикул WB

Rate limit: 10 requests per minute, 6 second interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`GetSearchClusterStatsRequest`](../-internal-/interfaces/GetSearchClusterStatsRequest.md) | Запрос с периодом и items (max 100) |

#### Returns

`Promise`\<[`GetSearchClusterStatsResponse`](../-internal-/interfaces/GetSearchClusterStatsResponse.md)\>

Promise<GetSearchClusterStatsResponse>

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Statistika/paths/~1adv~1v0~1normquery~1stats/post](https://dev.wildberries.ru/openapi/promotion#tag/Statistika/paths/~1adv~1v0~1normquery~1stats/post)

#### Example

```typescript
const stats = await sdk.promotion.getSearchClusterStats({
  from: '2026-02-01',
  to: '2026-02-09',
  items: [{ advert_id: 123456, nm_id: 789012 }]
});
// stats.stats[0].stats[0].norm_query = "фраза"
// stats.stats[0].stats[0].views = 1949
```

***

### updateBids()

```ts
updateBids(data: UpdateBidsRequest): Promise<UpdateBidsResponse>;
```

Defined in: [modules/promotion/index.ts:1564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1564)

Изменение ставок в кампаниях (V1 API с копейками)

Меняет ставки карточек товаров по артикулам WB в кампаниях с единой или ручной ставкой.
Для кампаний в статусах 4, 9 и 11.

**ВАЖНО**: Ставки указываются в КОПЕЙКАХ (bid_kopecks), не в рублях!

**Семантика placement** (поле `placement` каждой ставки):
- `combined` — поиск и рекомендации вместе (кампании с **единой** ставкой,
  `bid_type: unified` / Type 8)
- `search` / `recommendations` — одно место размещения (кампании с **ручной**
  ставкой, `bid_type: manual` / Type 9)

**Идемпотентность**: повторная установка той же ставки не списывает средства
  дважды, но каждый вызов всё равно расходует слот rate-limit (300/мин,
  интервал 200 мс) — избегайте no-op обновлений.

**Ошибки диапазона**: выход ставки за пределы допустимого диапазона возвращает
  HTTP 400 с телом `wrong bid value: <received>; min: <floor>` — BaseClient
  парсит его в [BidOutOfRangeError](BidOutOfRangeError.md) (поля `received` / `min` / `max?`),
  поэтому канонический минимальный bid доступен сразу, без отдельного запроса
  [PromotionModule.getBidsRecommendations](#getbidsrecommendations) (5/мин).

Rate limit: 5 requests per second, 200ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`UpdateBidsRequest`](../-internal-/interfaces/UpdateBidsRequest.md) | Request body with bids in kopecks |

#### Returns

`Promise`\<[`UpdateBidsResponse`](../-internal-/interfaces/UpdateBidsResponse.md)\>

Updated bids

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1api~1advert~1v1~1bids/patch](https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1api~1advert~1v1~1bids/patch)

#### Example

```typescript
const result = await sdk.promotion.updateBids({
  bids: [{
    advert_id: 12345,
    nm_bids: [{
      nm_id: 13335157,
      bid_kopecks: 250, // = 2.50 RUB
      placement: 'recommendations'
    }]
  }]
});
```

***

### updateCampaignProducts()

```ts
updateCampaignProducts(data: UpdateCampaignProductsRequest): Promise<UpdateCampaignProductsResponse>;
```

Defined in: [modules/promotion/index.ts:1599](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1599)

Управление товарами в кампаниях

Добавляет и удаляет карточки товаров в кампаниях типа 9.
Для кампаний в статусах 4, 9 и 11.
Для добавляемых товаров устанавливается текущая минимальная ставка.

Rate limit: 1 request per second, 1000ms interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`UpdateCampaignProductsRequest`](../-internal-/interfaces/UpdateCampaignProductsRequest.md) | Request body with campaigns and products to add/delete |

#### Returns

`Promise`\<[`UpdateCampaignProductsResponse`](../-internal-/interfaces/UpdateCampaignProductsResponse.md)\>

Results of product updates

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1nms/patch](https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1nms/patch)

#### Example

```typescript
const result = await sdk.promotion.updateCampaignProducts({
  campaigns: [{
    advert_id: 12345,
    add_nms: [111, 222],
    delete_nms: [333]
  }]
});
```

***

### getRecommendationsList()

```ts
getRecommendationsList(data: ListRecommendationsRequest): Promise<ListRecommendationsResponse>;
```

Defined in: [modules/promotion/index.ts:1643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1643)

Get Seller Recommendations list (item recommendations in product cards)

Returns the current seller-recommendation assignments for product cards
(the "Seller Recommendations" block shown in product listings).

Lives on the **content-api** domain (Content-category methods), although
documented under the promotion tag. Auth: Personal or Service token
(Content category). Gating: Jam subscription (Advanced/Premium) OR the
"Seller Recommendations in listings" Tariff-Builder option.

Rate limit: 100 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ListRecommendationsRequest`](../-internal-/interfaces/ListRecommendationsRequest.md) | Optional filter (WB item numbers). The exact filter shape is INFERRED — verify against the live spec (task-156 AC#9). |

#### Returns

`Promise`\<[`ListRecommendationsResponse`](../-internal-/interfaces/ListRecommendationsResponse.md)\>

Recommendation entries per item in `data`; per-item `errors` on partial success (HTTP 200)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/work-with-products](https://dev.wildberries.ru/docs/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.promotion.getRecommendationsList({ nmIDs: [12345678] });
for (const entry of result.data ?? []) {
  console.log(`${entry.nmID}: ${entry.tagsIDs.join(', ')}`);
}
```

***

### setRecommendations()

```ts
setRecommendations(data: SetRecommendationsRequest): Promise<SetRecommendationsResponse>;
```

Defined in: [modules/promotion/index.ts:1687](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/promotion/index.ts#L1687)

Set Seller Recommendations (item recommendations in product cards)

Sets, updates, or removes seller recommendations for product cards.
Send an empty `tagsIDs` array to clear a product's recommendations.

PARTIAL SUCCESS: WB returns HTTP **200** even when some items fail — the
per-item failures are listed in the `errors` array of the response body
(each `{ nmID, error }`). Always inspect `result.errors` instead of relying
on the status code.

Lives on the **content-api** domain. Auth: Personal or Service token
(Content category). Gating: Jam subscription (Advanced/Premium) OR the
"Seller Recommendations in listings" Tariff-Builder option.

Rate limit: 100 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SetRecommendationsRequest`](../-internal-/type-aliases/SetRecommendationsRequest.md) | Per-product recommendation assignments |

#### Returns

`Promise`\<[`SetRecommendationsResponse`](../-internal-/interfaces/SetRecommendationsResponse.md)\>

Response envelope; `data` is `null`. Check `errors` for partial failures.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/work-with-products](https://dev.wildberries.ru/docs/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.promotion.setRecommendations([
  { nmID: 12345678, tagsIDs: [11111111, 22222222] },
]);
if (result.errors.length) {
  console.warn('Partial failure:', result.errors);
}
```

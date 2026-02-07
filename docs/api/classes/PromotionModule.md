[Wildberries API TypeScript SDK](../modules.md) / PromotionModule

# Class: PromotionModule

Defined in: [modules/promotion/index.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L30)

## Constructors

### Constructor

```ts
new PromotionModule(client: BaseClient): PromotionModule;
```

Defined in: [modules/promotion/index.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L31)

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

Defined in: [modules/promotion/index.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L48)

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

Defined in: [modules/promotion/index.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L70)

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

Defined in: [modules/promotion/index.ts:91](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L91)

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

Defined in: [modules/promotion/index.ts:112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L112)

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

### updateAuctionBid()

```ts
updateAuctionBid(data: {
  bids: {
     advert_id: number;
     nm_bids: {
        nm_id: number;
        bid: number;
        placement: "search" | "recommendations" | "combined";
     }[];
  }[];
}): Promise<{
  bids: {
     advert_id: number;
     nm_bids: {
        nm_id: number;
        bid: number;
        placement: string;
     }[];
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L135)

Изменение ставок в кампаниях

Метод меняет ставки карточек товаров по артикулам WB в кампаниях типа `9` с единой или ручной ставкой. <br><br> Для кампаний в статусах `4`, `9` и `11`. <br><br> В запросе укажите место размещения в параметре `placement`: - `combined` — в поиске и рекомендациях для кампаний с единой ставкой - `search `или `recommendations` — в поиске или рекомендациях для кампаний с ручной ставкой <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `bids`: \{ `advert_id`: `number`; `nm_bids`: \{ `nm_id`: `number`; `bid`: `number`; `placement`: `"search"` \| `"recommendations"` \| `"combined"`; \}[]; \}[]; \} | Request body data |
| `data.bids` | \{ `advert_id`: `number`; `nm_bids`: \{ `nm_id`: `number`; `bid`: `number`; `placement`: `"search"` \| `"recommendations"` \| `"combined"`; \}[]; \}[] | - |

#### Returns

`Promise`\<\{
  `bids`: \{
     `advert_id`: `number`;
     `nm_bids`: \{
        `nm_id`: `number`;
        `bid`: `number`;
        `placement`: `string`;
     \}[];
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
const result = await sdk.promotion.updateAuctionBid({});
console.log(result);
```

***

### getAdvBalance()

```ts
getAdvBalance(): Promise<{
  balance?: number;
  net?: number;
  bonus?: number;
  cashbacks?: {
     sum?: number;
     percent?: number;
     expiration_date?: string;
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L168)

Баланс

Метод возвращает информацию о: - счёте кабинета Продвижения WB. Его пополняет продавец. - балансе — максимальной сумме для оплаты камапнии по взаиморасчету: удержании средств из будущих продаж. Баланс пополнить нельзя, он рассчитывается автоматически на основе отчётов по продвижению. - бонусных начислениях WB. Информацию о бюджете кампаний можно получить в [отдельном методе](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>

#### Returns

`Promise`\<\{
  `balance?`: `number`;
  `net?`: `number`;
  `bonus?`: `number`;
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
}>;
```

Defined in: [modules/promotion/index.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L199)

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

Defined in: [modules/promotion/index.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L224)

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

Defined in: [modules/promotion/index.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L256)

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
}[]>;
```

Defined in: [modules/promotion/index.ts:300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L300)

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

### createAutoSetExcluded()

```ts
createAutoSetExcluded(data: {
  excluded?: string[];
}, options?: {
  id: number;
}): Promise<void>;
```

Defined in: [modules/promotion/index.ts:341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L341)

Установка/удаление минус-фраз для кампании с единой ставкой

<div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Обновление**: Дата отключения перенесена с 15 января на 2 февраля 2026.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для работы с минус-фразами в кампаниях type 9 используйте соответствующие методы управления кампаниями с ручной ставкой. </div> Метод устанавливает и удаляет минус-фразы для кампании [с единой ставкой](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v1~1save-ad/post).<br><br> Данные фразы можно выбрать из списка запросов, по которым покупатели находили ваш товар. Список запросов можно получить в [статистике ключевых фраз](/openapi/analytics#tag/Statistika-po-prodvizheniyu/paths/~1adv~1v0~1stats~1keywords/get).<br> Отправка пустого массива удаляет все минус-фразы из кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 1 запрос | 6 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `excluded?`: `string`[]; \} | Request body data |
| `data.excluded?` | `string`[] | - |
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
const result = await sdk.promotion.createAutoSetExcluded({}, {});
console.log(result);
```

***

### createAutoUpdatenm()

```ts
createAutoUpdatenm(data: {
  add?: number[];
  delete?: number[];
}, options?: {
  id: number;
}): Promise<void>;
```

Defined in: [modules/promotion/index.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L367)

Изменение списка карточек товаров в кампании с единой ставкой

<div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для работы с товарами в кампаниях type 9 используйте метод [Управление товарами в кампаниях](/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1nms/patch). </div> Метод добавляет и удаляет карточки товаров в кампании с единой ставкой.<br><br> <div class="description_important"> Добавить можно только те карточки товаров, которые вернутся в <a href="/openapi/promotion#tag/Parametry-avtomaticheskih-kampanij/paths/~1adv~1v1~1auto~1getnmtoadd/get">списке карточек товаров для кампании с единой ставкой</a>.<br>Удалить единственную карточку товара из кампании нельзя. </div> Проверки по параметру `delete` не предусмотрено. Если пришел ответ со статус-кодом `200`, а изменений не произошло, проверьте, чтобы запрос соответствовал документации. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `add?`: `number`[]; `delete?`: `number`[]; \} | Request body data |
| `data.add?` | `number`[] | - |
| `data.delete?` | `number`[] | - |
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
const result = await sdk.promotion.createAutoUpdatenm({}, {});
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

Defined in: [modules/promotion/index.ts:392](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L392)

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

Defined in: [modules/promotion/index.ts:416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L416)

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

Defined in: [modules/promotion/index.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L443)

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

Defined in: [modules/promotion/index.ts:492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L492)

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

Defined in: [modules/promotion/index.ts:604](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L604)

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

### getStatsKeywords()

```ts
getStatsKeywords(options?: {
  advert_id: number;
  from: string;
  to: string;
}): Promise<V0KeywordsStatisticsResponse>;
```

Defined in: [modules/promotion/index.ts:630](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L630)

Статистика по ключевым фразам

Метод формирует статистику по ключевым фразам из поисковой строки: количество просмотров товара и затраты по одной ключевой фразе. Подходит для кампаний c единой и ручной ставкой. <br><br> Статистика формируется за каждый день, когда кампания была активна. В одном запросе можно получить данные максимум за 7 дней. <br> Данные обновляются каждый час. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `advert_id`: `number`; `from`: `string`; `to`: `string`; \} | Query parameters |
| `options.advert_id?` | `number` | - |
| `options.from?` | `string` | - |
| `options.to?` | `string` | - |

#### Returns

`Promise`\<[`V0KeywordsStatisticsResponse`](../-internal-/interfaces/V0KeywordsStatisticsResponse.md)\>

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
const result = await sdk.promotion.getStatsKeywords({});
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

Defined in: [modules/promotion/index.ts:656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L656)

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

Defined in: [modules/promotion/index.ts:681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L681)

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

Defined in: [modules/promotion/index.ts:709](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L709)

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

Defined in: [modules/promotion/index.ts:731](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L731)

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

Defined in: [modules/promotion/index.ts:757](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L757)

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

Defined in: [modules/promotion/index.ts:794](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L794)

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

***

### getNormqueryBids()

```ts
getNormqueryBids(data: V0GetNormQueryBidsRequest): Promise<V0GetNormQueryBidsResponse>;
```

Defined in: [modules/promotion/index.ts:824](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L824)

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

Defined in: [modules/promotion/index.ts:859](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L859)

Установить ставки для поисковых кластеров

Метод устанавливает ставки на поисковые кластеры.
Можно использовать только для кампаний с ручной ставкой и моделью оплаты `cpm` — за показы.

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

Defined in: [modules/promotion/index.ts:892](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L892)

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

### getNormqueryMinus()

```ts
getNormqueryMinus(data: V0GetNormQueryMinusRequest): Promise<V0GetNormQueryMinusResponse>;
```

Defined in: [modules/promotion/index.ts:920](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L920)

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

Defined in: [modules/promotion/index.ts:952](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L952)

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
}): Promise<GetAdverts>;
```

Defined in: [modules/promotion/index.ts:987](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L987)

Информация о кампаниях (V2)

Метод возвращает информацию о рекламных кампаниях с единой или ручной ставкой
по их статусам, типам оплаты и ID. Replaces deprecated v1 endpoints.

Rate limit: 5 requests per second, 200ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `ids?`: `string`; `statuses?`: `string`; `payment_type?`: `"cpm"` \| `"cpc"`; \} | Query parameters for filtering campaigns |
| `options.ids?` | `string` | - |
| `options.statuses?` | `string` | - |
| `options.payment_type?` | `"cpm"` \| `"cpc"` | - |

#### Returns

`Promise`\<[`GetAdverts`](../-internal-/interfaces/GetAdverts.md)\>

List of campaigns with bid settings in kopecks

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/promotion#tag/Kampanii/paths/~1api~1advert~1v2~1adverts/get](https://dev.wildberries.ru/openapi/promotion#tag/Kampanii/paths/~1api~1advert~1v2~1adverts/get)

#### Example

```typescript
const campaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,23456',
  statuses: '9,11',
  payment_type: 'cpm'
});
console.log(campaigns.adverts);
```

***

### getBidsMinV2()

```ts
getBidsMinV2(data: {
  advert_id: number;
  nm_ids: number[];
  payment_type: "cpm" | "cpc";
  placement_types: ("search" | "combined" | "recommendation")[];
}): Promise<{
  bids: {
     nm_id: number;
     bids: {
        type: PlacementType;
        value: number;
     }[];
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:1024](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L1024)

Минимальные ставки для карточек товаров (V1 API)

Метод возвращает минимальные ставки для карточек товаров в копейках
по типу оплаты и местам размещения. Replaces deprecated v0 endpoint.

Rate limit: 20 requests per minute, 3 second interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `advert_id`: `number`; `nm_ids`: `number`[]; `payment_type`: `"cpm"` \| `"cpc"`; `placement_types`: (`"search"` \| `"combined"` \| `"recommendation"`)[]; \} | Request body with campaign ID, product IDs, payment type, and placement types |
| `data.advert_id` | `number` | - |
| `data.nm_ids` | `number`[] | - |
| `data.payment_type` | `"cpm"` \| `"cpc"` | - |
| `data.placement_types` | (`"search"` \| `"combined"` \| `"recommendation"`)[] | - |

#### Returns

`Promise`\<\{
  `bids`: \{
     `nm_id`: `number`;
     `bids`: \{
        `type`: [`PlacementType`](../-internal-/type-aliases/PlacementType.md);
        `value`: `number`;
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

### updateBidsV2()

```ts
updateBidsV2(data: {
  bids: {
     advert_id: number;
     nm_bids: {
        nm_id: number;
        bid_kopecks: number;
        placement: "search" | "recommendations" | "combined";
     }[];
  }[];
}): Promise<{
  bids: {
     advert_id: number;
     nm_bids: {
        nm_id: number;
        bid_kopecks: number;
        placement: string;
     }[];
  }[];
}>;
```

Defined in: [modules/promotion/index.ts:1075](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/promotion/index.ts#L1075)

Изменение ставок в кампаниях (V1 API)

Метод меняет ставки карточек товаров по артикулам WB в кампаниях с единой или ручной ставкой.
Для кампаний в статусах 4, 9 и 11. Replaces deprecated v0 endpoint.

Rate limit: 5 requests per second, 200ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `bids`: \{ `advert_id`: `number`; `nm_bids`: \{ `nm_id`: `number`; `bid_kopecks`: `number`; `placement`: `"search"` \| `"recommendations"` \| `"combined"`; \}[]; \}[]; \} | Request body with bids in kopecks |
| `data.bids` | \{ `advert_id`: `number`; `nm_bids`: \{ `nm_id`: `number`; `bid_kopecks`: `number`; `placement`: `"search"` \| `"recommendations"` \| `"combined"`; \}[]; \}[] | - |

#### Returns

`Promise`\<\{
  `bids`: \{
     `advert_id`: `number`;
     `nm_bids`: \{
        `nm_id`: `number`;
        `bid_kopecks`: `number`;
        `placement`: `string`;
     \}[];
  \}[];
\}\>

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
const result = await sdk.promotion.updateBidsV2({
  bids: [{
    advert_id: 12345,
    nm_bids: [{
      nm_id: 13335157,
      bid_kopecks: 250,
      placement: 'recommendations'
    }]
  }]
});
console.log(result.bids);
```

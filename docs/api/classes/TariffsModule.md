[Wildberries API TypeScript SDK](../modules.md) / TariffsModule

# Class: TariffsModule

Defined in: [modules/tariffs/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/tariffs/index.ts#L10)

## Constructors

### Constructor

```ts
new TariffsModule(client: BaseClient): TariffsModule;
```

Defined in: [modules/tariffs/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/tariffs/index.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`TariffsModule`

## Methods

### getTariffsCommission()

```ts
getTariffsCommission(): Promise<
  | Commission
  | CommissionChina
  | CommissionTurkey
  | CommissionUzbekistan
| CommissionUAE>;
```

Defined in: [modules/tariffs/index.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/tariffs/index.ts#L27)

Комиссия по категориям товаров

Метод возвращает данные о [комиссии](https://seller.wildberries.ru/dynamic-product-categories/commission) WB по [родительским категориям товаров](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1parent~1all/get) согласно модели продаж. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 2 запроса | </div>

#### Returns

`Promise`\<
  \| [`Commission`](../interfaces/Commission.md)
  \| [`CommissionChina`](../interfaces/CommissionChina.md)
  \| [`CommissionTurkey`](../interfaces/CommissionTurkey.md)
  \| [`CommissionUzbekistan`](../interfaces/CommissionUzbekistan.md)
  \| [`CommissionUAE`](../interfaces/CommissionUAE.md)\>

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
const result = await sdk.tariffs.getTariffsCommission();
console.log(result);
```

***

### getTariffsBox()

```ts
getTariffsBox(): Promise<TariffsBoxResponse>;
```

Defined in: [modules/tariffs/index.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/tariffs/index.ts#L45)

Тарифы для коробов

Для товаров, которые поставляются на склад в коробах, метод возвращает [тарифы на остаток](https://seller.wildberries.ru/dynamic-product-categories): - доставка со склада или пункта приёма до покупателя - доставка от покупателя до пункта приёма - хранение на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Returns

`Promise`\<[`TariffsBoxResponse`](../interfaces/TariffsBoxResponse.md)\>

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
const result = await sdk.tariffs.getTariffsBox();
console.log(result);
```

***

### getTariffsPallet()

```ts
getTariffsPallet(): Promise<TariffsPalletResponse>;
```

Defined in: [modules/tariffs/index.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/tariffs/index.ts#L63)

Тарифы для монопаллет

Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает [стоимость](https://seller.wildberries.ru/dynamic-product-categories): - доставки со склада до покупателя - доставки от покупателя до склада - хранения на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Returns

`Promise`\<[`TariffsPalletResponse`](../interfaces/TariffsPalletResponse.md)\>

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
const result = await sdk.tariffs.getTariffsPallet();
console.log(result);
```

***

### getTariffsReturn()

```ts
getTariffsReturn(): Promise<ReturnTariffsResponse>;
```

Defined in: [modules/tariffs/index.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/tariffs/index.ts#L81)

Тарифы на возврат

Метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories/return-cost): - на перевозку товаров со склада WB или из пункта приёма до продавца - на обратную перевозку возвратов, которые не забрал продавец <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Returns

`Promise`\<[`ReturnTariffsResponse`](../interfaces/ReturnTariffsResponse.md)\>

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
const result = await sdk.tariffs.getTariffsReturn();
console.log(result);
```

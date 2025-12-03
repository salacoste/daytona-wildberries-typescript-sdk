[Wildberries API TypeScript SDK](../modules.md) / TariffsModule

# Class: TariffsModule

Defined in: [modules/tariffs/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/tariffs/index.ts#L11)

## Constructors

### Constructor

```ts
new TariffsModule(client: BaseClient): TariffsModule;
```

Defined in: [modules/tariffs/index.ts:12](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/tariffs/index.ts#L12)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`TariffsModule`

## Methods

### getTariffsCommission()

```ts
getTariffsCommission(locale?: "ru" | "en" | "zh"): Promise<
  | Commission
  | CommissionChina
  | CommissionTurkey
  | CommissionUzbekistan
| CommissionUAE>;
```

Defined in: [modules/tariffs/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/tariffs/index.ts#L47)

Комиссия по категориям товаров

Метод возвращает данные о [комиссии](https://seller.wildberries.ru/dynamic-product-categories/commission) WB
по [родительским категориям товаров] согласно модели продаж.

**Rate Limit**: 1 request per minute (burst: 2)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale?` | `"ru"` \| `"en"` \| `"zh"` | Optional language for response fields (parentName, subjectName): - 'ru' - Russian (default) - 'en' - English - 'zh' - Chinese |

#### Returns

`Promise`\<
  \| [`Commission`](../interfaces/Commission.md)
  \| [`CommissionChina`](../interfaces/CommissionChina.md)
  \| [`CommissionTurkey`](../interfaces/CommissionTurkey.md)
  \| [`CommissionUzbekistan`](../interfaces/CommissionUzbekistan.md)
  \| [`CommissionUAE`](../interfaces/CommissionUAE.md)\>

Promise resolving to commission data structure

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When locale value is invalid (400)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get commission data in Russian (default)
const result = await sdk.tariffs.getTariffsCommission();
console.log(result);

// Get commission data in English
const resultEn = await sdk.tariffs.getTariffsCommission('en');
console.log(resultEn);

// Get commission data in Chinese
const resultZh = await sdk.tariffs.getTariffsCommission('zh');
console.log(resultZh);
```

***

### getTariffsBox()

```ts
getTariffsBox(date: string): Promise<TariffsBoxResponse>;
```

Defined in: [modules/tariffs/index.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/tariffs/index.ts#L84)

Тарифы для коробов

Для товаров, которые поставляются на склад в коробах, метод возвращает [тарифы на остаток](https://seller.wildberries.ru/dynamic-product-categories): - доставка со склада или пункта приёма до покупателя - доставка от покупателя до пункта приёма - хранение на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` | Date for tariff calculation in YYYY-MM-DD format (e.g., '2025-01-15') |

#### Returns

`Promise`\<[`TariffsBoxResponse`](../interfaces/TariffsBoxResponse.md)\>

Promise resolving to box tariffs data structure

#### Throws

When date format is invalid or missing (HTTP 400)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
// Get box tariffs for specific date
const tariffs = await sdk.tariffs.getTariffsBox('2025-01-15');
console.log('Box tariffs:', tariffs);

// Get tariffs for today
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const todayTariffs = await sdk.tariffs.getTariffsBox(today);
console.log('Today\'s box tariffs:', todayTariffs);
```

***

### getTariffsPallet()

```ts
getTariffsPallet(date: string): Promise<TariffsPalletResponse>;
```

Defined in: [modules/tariffs/index.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/tariffs/index.ts#L116)

Тарифы для монопаллет

Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает [стоимость](https://seller.wildberries.ru/dynamic-product-categories): - доставки со склада до покупателя - доставки от покупателя до склада - хранения на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` |

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
getTariffsReturn(date: string): Promise<ReturnTariffsResponse>;
```

Defined in: [modules/tariffs/index.ts:148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/tariffs/index.ts#L148)

Тарифы на возврат

Метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories/return-cost): - на перевозку товаров со склада WB или из пункта приёма до продавца - на обратную перевозку возвратов, которые не забрал продавец <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` |

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

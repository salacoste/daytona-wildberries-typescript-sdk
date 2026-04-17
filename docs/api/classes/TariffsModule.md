[Wildberries API TypeScript SDK](../modules.md) / TariffsModule

# Class: TariffsModule

Defined in: [modules/tariffs/index.ts:20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/tariffs/index.ts#L20)

## Constructors

### Constructor

```ts
new TariffsModule(client: BaseClient): TariffsModule;
```

Defined in: [modules/tariffs/index.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/tariffs/index.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`TariffsModule`

## Methods

### getTariffsCommission()

```ts
getTariffsCommission(options?: {
  locale?: string;
}): Promise<
  | Commission
  | CommissionChina
  | CommissionTurkey
  | CommissionUzbekistan
| CommissionUAE>;
```

Defined in: [modules/tariffs/index.ts:44](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/tariffs/index.ts#L44)

Комиссия по категориям товаров

Метод возвращает данные о [комиссии](https://seller.wildberries.ru/dynamic-product-categories/commission) WB по [родительским категориям товаров](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1parent~1all/get) согласно модели продаж. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 2 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<
  \| [`Commission`](../-internal-/interfaces/Commission.md)
  \| [`CommissionChina`](../-internal-/interfaces/CommissionChina.md)
  \| [`CommissionTurkey`](../-internal-/interfaces/CommissionTurkey.md)
  \| [`CommissionUzbekistan`](../-internal-/interfaces/CommissionUzbekistan.md)
  \| [`CommissionUAE`](../-internal-/interfaces/CommissionUAE.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Examples

```ts
// Get commission rates (default locale)
const result = await sdk.tariffs.getTariffsCommission();
console.log(result);
```

```ts
// Get commission rates with English locale
const result = await sdk.tariffs.getTariffsCommission({ locale: 'en' });
console.log(result);
```

***

### getTariffsBox()

```ts
getTariffsBox(date: string): Promise<TariffsBoxResponse>;
```

Defined in: [modules/tariffs/index.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/tariffs/index.ts#L72)

Тарифы для коробов

Для товаров, которые поставляются на склад в коробах, метод возвращает [тарифы на остаток](https://seller.wildberries.ru/dynamic-product-categories): - доставка со склада или пункта приёма до покупателя - доставка от покупателя до пункта приёма - хранение на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` | Date for tariffs in YYYY-MM-DD format (required) |

#### Returns

`Promise`\<[`TariffsBoxResponse`](../-internal-/interfaces/TariffsBoxResponse.md)\>

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
const result = await sdk.tariffs.getTariffsBox('2024-01-15');
console.log(result);
```

***

### getTariffsPallet()

```ts
getTariffsPallet(date: string): Promise<TariffsPalletResponse>;
```

Defined in: [modules/tariffs/index.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/tariffs/index.ts#L94)

Тарифы для монопаллет

Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает [стоимость](https://seller.wildberries.ru/dynamic-product-categories): - доставки со склада до покупателя - доставки от покупателя до склада - хранения на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` | Date for tariffs in YYYY-MM-DD format (required) |

#### Returns

`Promise`\<[`TariffsPalletResponse`](../-internal-/interfaces/TariffsPalletResponse.md)\>

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
const result = await sdk.tariffs.getTariffsPallet('2024-01-15');
console.log(result);
```

***

### getTariffsReturn()

```ts
getTariffsReturn(date: string): Promise<ReturnTariffsResponse>;
```

Defined in: [modules/tariffs/index.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/tariffs/index.ts#L116)

Тарифы на возврат

Метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories/return-cost): - на перевозку товаров со склада WB или из пункта приёма до продавца - на обратную перевозку возвратов, которые не забрал продавец <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `string` | Date for tariffs in YYYY-MM-DD format (required) |

#### Returns

`Promise`\<[`ReturnTariffsResponse`](../-internal-/interfaces/ReturnTariffsResponse.md)\>

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
const result = await sdk.tariffs.getTariffsReturn('2024-01-15');
console.log(result);
```

***

### getAcceptanceCoefficients()

```ts
getAcceptanceCoefficients(options?: {
  warehouseIDs?: string;
}): Promise<ModelsAcceptanceCoefficient[]>;
```

Defined in: [modules/tariffs/index.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/tariffs/index.ts#L151)

Тарифы на поставку

Метод возвращает тарифы на поставку для конкретных складов на ближайшие 14 дней.

Приёмка для поставки доступна только при сочетании:
- `coefficient` — `0` или `1`
- `allowUnload` — `true`

Rate limit: 6 requests per minute, 10 second interval, burst 6

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `warehouseIDs?`: `string`; \} | Query parameters |
| `options.warehouseIDs?` | `string` | Warehouse IDs, comma-separated. Returns all warehouses by default |

#### Returns

`Promise`\<[`ModelsAcceptanceCoefficient`](../-internal-/interfaces/ModelsAcceptanceCoefficient-1.md)[]\>

Array of acceptance coefficients for the next 14 days

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### Examples

```ts
// Get coefficients for all warehouses
const allCoeffs = await sdk.tariffs.getAcceptanceCoefficients();
console.log(allCoeffs);
```

```ts
// Get coefficients for specific warehouses
const coeffs = await sdk.tariffs.getAcceptanceCoefficients({ warehouseIDs: '507,117501' });
console.log(coeffs);
```

[Wildberries API TypeScript SDK](../modules.md) / TariffsModule

# Class: TariffsModule

Defined in: [modules/tariffs/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/modules/tariffs/index.ts#L10)

## Constructors

### Constructor

```ts
new TariffsModule(client: BaseClient): TariffsModule;
```

Defined in: [modules/tariffs/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/modules/tariffs/index.ts#L11)

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

Defined in: [modules/tariffs/index.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/modules/tariffs/index.ts#L28)

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

#### Example

```ts
const result = await sdk.general.getTariffsCommission({});
console.log(result);
```

***

### getTariffsBox()

```ts
getTariffsBox(options?: {
  date: string;
}): Promise<TariffsBoxResponse>;
```

Defined in: [modules/tariffs/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/modules/tariffs/index.ts#L47)

Тарифы для коробов

Для товаров, которые поставляются на склад в коробах, метод возвращает [тарифы на остаток](https://seller.wildberries.ru/dynamic-product-categories): - доставка со склада или пункта приёма до покупателя - доставка от покупателя до пункта приёма - хранение на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `date`: `string`; \} | Query parameters |
| `options.date?` | `string` | - |

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
const result = await sdk.general.getTariffsBox({});
console.log(result);
```

***

### getTariffsPallet()

```ts
getTariffsPallet(options?: {
  date: string;
}): Promise<TariffsPalletResponse>;
```

Defined in: [modules/tariffs/index.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/modules/tariffs/index.ts#L66)

Тарифы для монопаллет

Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает [стоимость](https://seller.wildberries.ru/dynamic-product-categories): - доставки со склада до покупателя - доставки от покупателя до склада - хранения на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `date`: `string`; \} | Query parameters |
| `options.date?` | `string` | - |

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
const result = await sdk.general.getTariffsPallet({});
console.log(result);
```

***

### getTariffsReturn()

```ts
getTariffsReturn(options?: {
  date: string;
}): Promise<ReturnTariffsResponse>;
```

Defined in: [modules/tariffs/index.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/modules/tariffs/index.ts#L85)

Тарифы на возврат

Метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories/return-cost): - на перевозку товаров со склада WB или из пункта приёма до продавца - на обратную перевозку возвратов, которые не забрал продавец <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `date`: `string`; \} | Query parameters |
| `options.date?` | `string` | - |

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
const result = await sdk.general.getTariffsReturn({});
console.log(result);
```

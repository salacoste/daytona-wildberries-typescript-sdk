[Wildberries API TypeScript SDK](../modules.md) / GeneralModule

# Class: GeneralModule

Defined in: [modules/general/index.ts:15](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/general/index.ts#L15)

## Constructors

### Constructor

```ts
new GeneralModule(client: BaseClient): GeneralModule;
```

Defined in: [modules/general/index.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/general/index.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`GeneralModule`

## Methods

### ping()

```ts
ping(): Promise<PingResponse>;
```

Defined in: [modules/general/index.ts:61](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/general/index.ts#L61)

Проверка подключения к WB API

Метод проверяет три вещи:
1. Запрос доходит до WB API
2. Валидность токена (не истёк, не отозван)
3. Совпадение категории токена и сервиса

Метод НЕ предназначен для проверки доступности конкретного сервиса.
Для каждой категории API используется свой домен:

| Категория | Домен |
| --- | --- |
| Контент | content-api.wildberries.ru |
| Маркетплейс | marketplace-api.wildberries.ru |
| Статистика | statistics-api.wildberries.ru |
| Аналитика | seller-analytics-api.wildberries.ru |
| Рекомендации | recommend-api.wildberries.ru |
| Вопросы и отзывы | feedbacks-api.wildberries.ru |
| Цены и скидки | discounts-prices-api.wildberries.ru |
| Продвижение | advert-api.wildberries.ru |
| Чат с покупателями | buyer-chat-api.wildberries.ru |
| Тарифы | common-api.wildberries.ru |
| Общее | common-api.wildberries.ru |
| Возвраты покупателям | returns-api.wildberries.ru |
| Документы | document-api.wildberries.ru |
| Финансы | finance-api.wildberries.ru |

Rate limit: Максимум 3 запроса за 30 секунд (6 req/min, 10s interval, burst 3)

#### Returns

`Promise`\<[`PingResponse`](../-internal-/interfaces/PingResponse.md)\>

Ответ с временной меткой и статусом подключения

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/api-information#tag/Proverka-podklyucheniya-k-WB-API](https://dev.wildberries.ru/openapi/api-information#tag/Proverka-podklyucheniya-k-WB-API)

#### Example

```typescript
const result = await sdk.general.ping();
console.log(result.Status); // 'OK'
```

***

### news()

```ts
news(options?: NewsRequestParams): Promise<NewsResponse>;
```

Defined in: [modules/general/index.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/general/index.ts#L97)

Получение новостей портала продавцов

Возвращает список новостей портала продавцов Wildberries.
В запросе необходимо указать один из параметров: `from` (дата) или `fromID` (ID новости).
Максимум 100 новостей за один запрос.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 1 запрос | 1 мин | 10 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`NewsRequestParams`](../-internal-/interfaces/NewsRequestParams.md) | Параметры запроса |

#### Returns

`Promise`\<[`NewsResponse`](../-internal-/interfaces/NewsResponse.md)\>

Список новостей

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/api-information#tag/API-novostej](https://dev.wildberries.ru/openapi/api-information#tag/API-novostej)

#### Example

```typescript
const result = await sdk.general.news({ from: '2024-01-01' });
for (const item of result.data) {
  console.log(item.header, item.date);
}
```

***

### sellerInfo()

```ts
sellerInfo(): Promise<SellerInfoResponse>;
```

Defined in: [modules/general/index.ts:131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/general/index.ts#L131)

Получение информации о продавце

Возвращает наименование продавца и уникальный ID профиля продавца.
Для запроса подойдёт любой токен, кроме тестового контура.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 1 запрос | 1 мин | 10 запросов |

#### Returns

`Promise`\<[`SellerInfoResponse`](../-internal-/interfaces/SellerInfoResponse.md)\>

Информация о продавце (наименование, ID профиля, торговая марка)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/api-information#tag/Informaciya-o-prodavce](https://dev.wildberries.ru/openapi/api-information#tag/Informaciya-o-prodavce)

#### Example

```typescript
const seller = await sdk.general.sellerInfo();
console.log(seller.name, seller.sid);
```

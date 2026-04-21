[Wildberries API TypeScript SDK](../modules.md) / GeneralModule

# Class: GeneralModule

Defined in: [modules/general/index.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L26)

## Constructors

### Constructor

```ts
new GeneralModule(client: BaseClient): GeneralModule;
```

Defined in: [modules/general/index.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L27)

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

Defined in: [modules/general/index.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L72)

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

Defined in: [modules/general/index.ts:108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L108)

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

Defined in: [modules/general/index.ts:142](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L142)

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

***

### createInvite()

```ts
createInvite(data: CreateInviteRequest): Promise<CreateInviteResponse>;
```

Defined in: [modules/general/index.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L184)

Создание приглашения для нового пользователя

Метод создаёт приглашение для нового пользователя с настройкой доступов к разделам профиля продавца.
Приглашение действительно в течение ограниченного времени, указанного в ответе.

**Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
Доступно для всех стран продавцов.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 сек | 1 запрос | 1 сек | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`CreateInviteRequest`](../-internal-/interfaces/CreateInviteRequest.md) | Данные для создания приглашения |

#### Returns

`Promise`\<[`CreateInviteResponse`](../-internal-/interfaces/CreateInviteResponse.md)\>

Информация о созданном приглашении

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca](https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca)

#### Example

```typescript
const result = await sdk.general.createInvite({
  invite: { phoneNumber: '79999999999', position: 'Менеджер' },
  access: [
    { code: 'balance', disabled: false },
    { code: 'finance', disabled: true }
  ]
});
console.log(result.inviteUrl);
```

***

### getUsers()

```ts
getUsers(params?: GetUsersParams): Promise<GetUsersResponse>;
```

Defined in: [modules/general/index.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L226)

Получение списка пользователей продавца

Возвращает список пользователей профиля продавца с их правами доступа.
Можно фильтровать по активным пользователям или только приглашённым.

**Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
Доступно для всех стран продавцов.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 сек | 1 запрос | 1 сек | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`GetUsersParams`](../-internal-/interfaces/GetUsersParams.md) | Параметры запроса |

#### Returns

`Promise`\<[`GetUsersResponse`](../-internal-/interfaces/GetUsersResponse.md)\>

Список пользователей с общим количеством

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca](https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca)

#### Example

```typescript
const result = await sdk.general.getUsers({ limit: 50 });
console.log(`Total users: ${result.total}`);
for (const user of result.users) {
  console.log(user.firstName, user.email);
}
```

***

### updateUserAccess()

```ts
updateUserAccess(data: UpdateUserAccessRequest): Promise<void>;
```

Defined in: [modules/general/index.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L272)

Изменение доступов пользователей

Обновляет права доступа для одного или нескольких пользователей профиля продавца.
Можно изменить доступ к различным разделам: баланс, финансы, документы и др.

**Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
Доступно для всех стран продавцов.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 сек | 1 запрос | 1 сек | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`UpdateUserAccessRequest`](../-internal-/interfaces/UpdateUserAccessRequest.md) | Данные для обновления доступов |

#### Returns

`Promise`\<`void`\>

void

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca](https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca)

#### Example

```typescript
await sdk.general.updateUserAccess({
  usersAccesses: [
    {
      userId: 12345,
      access: [
        { code: 'balance', disabled: true },
        { code: 'finance', disabled: false }
      ]
    }
  ]
});
```

***

### deleteUser()

```ts
deleteUser(deletedUserID: number): Promise<void>;
```

Defined in: [modules/general/index.ts:306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L306)

Удаление пользователя

Удаляет пользователя из профиля продавца по его ID.
Удалённый пользователь теряет доступ ко всем разделам профиля.

**Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
Доступно для всех стран продавцов.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 сек | 1 запрос | 1 сек | 10 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deletedUserID` | `number` | ID пользователя для удаления |

#### Returns

`Promise`\<`void`\>

void

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca](https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca)

#### Example

```typescript
await sdk.general.deleteUser(12345);
```

***

### ~~getJamSubscriptionStatus()~~

```ts
getJamSubscriptionStatus(params: GetJamSubscriptionStatusParams): Promise<JamSubscriptionStatus>;
```

Defined in: [modules/general/index.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L367)

Определение тарифа подписки Джем (Jam) через пробные запросы

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`GetJamSubscriptionStatusParams`](../-internal-/interfaces/GetJamSubscriptionStatusParams.md) | Parameters containing nmIds for the probe |

#### Returns

`Promise`\<[`JamSubscriptionStatus`](../-internal-/interfaces/JamSubscriptionStatus.md)\>

Jam subscription status with detected tier and metadata

#### Deprecated

Используйте [getJamSubscription](#getjamsubscription) вместо этого метода.
Прямой API `GET /api/common/v1/subscriptions` не требует nmIds и не тратит квоту аналитики.
Этот probe-метод сохранён как fallback для случаев, когда нет Сервисного токена.

Определяет тариф через пробные запросы к аналитическому эндпоинту
поисковых запросов товара (`/api/v2/search-report/product/search-texts`),
используя разные значения `limit`:

1. Запрос с `limit: 31` (выше лимита стандартного тарифа = 30)
   - **200** → тариф «Продвинутый» (advanced)
   - **400** → не продвинутый → продолжаем
2. Запрос с `limit: 1`
   - **200** → тариф «Стандартный» (standard)
   - **400** → подписка Джем отсутствует (none)

Ошибки аутентификации, превышения лимитов и сетевые ошибки не перехватываются
и пробрасываются вызывающему коду.

Rate limit: Uses the same quota as `analytics.createProductSearchText`
(3 requests/minute, 20-second interval, burst 3).
Each call makes 1–2 probe requests.

#### Throws

When nmIds array is empty

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Example

```typescript
const status = await sdk.general.getJamSubscriptionStatus({ nmIds: [12345678] });

switch (status.tier) {
  case 'advanced':
    console.log('Advanced Jam — limit up to 50');
    break;
  case 'standard':
    console.log('Standard Jam — limit up to 30');
    break;
  case 'none':
    console.log('No Jam subscription');
    break;
}
```

***

### getJamSubscription()

```ts
getJamSubscription(): Promise<JamSubscriptionDetails>;
```

Defined in: [modules/general/index.ts:458](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L458)

Получение информации о подписке Джем (Jam)

Возвращает подробную информацию о подписке Джем продавца:
даты активации и окончания, уровень подписки, способ оформления и статус.

Если продавец никогда не подключал подписку, возвращается пустой объект (200).

**Авторизация:** Сервисный токен любой категории.

Rate limit: 1 request per minute, 1 min interval, burst 10

#### Returns

`Promise`\<[`JamSubscriptionDetails`](../-internal-/interfaces/JamSubscriptionDetails.md)\>

Jam subscription details (empty object if never subscribed)

#### Throws

When API key is invalid or not a Service token (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.5.0

#### See

[https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Subscriptions](https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Subscriptions)

#### Example

```typescript
const jam = await sdk.general.getJamSubscription();
if (jam.state === 'active') {
  console.log(`Jam ${jam.level} active until ${jam.till}`);
  console.log(`Source: ${jam.activationSource}, since: ${jam.since}`);
} else if (jam.state) {
  console.log(`Jam inactive (state: ${jam.state})`);
} else {
  console.log('Never subscribed to Jam');
}
```

***

### getSellerRating()

```ts
getSellerRating(): Promise<SellerRatingResponse>;
```

Defined in: [modules/general/index.ts:486](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/modules/general/index.ts#L486)

Получить рейтинг продавца и количество отзывов

Возвращает пользовательский рейтинг продавца и общее количество отзывов.

**Авторизация:** Сервисный токен категории **Вопросы и отзывы**.

Rate limit: 1 request per minute, 1 min interval, burst 1

#### Returns

`Promise`\<[`SellerRatingResponse`](../-internal-/interfaces/SellerRatingResponse.md)\>

Seller rating and review count

#### Throws

When API key is invalid or wrong token category (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### Since

3.5.0

#### See

[https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Rating](https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Rating)

#### Example

```typescript
const rating = await sdk.general.getSellerRating();
console.log(`Rating: ${rating.valuation} (${rating.feedbackCount} reviews)`);
```

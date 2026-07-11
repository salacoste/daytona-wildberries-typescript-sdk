[Wildberries API TypeScript SDK](../modules.md) / GeneralModule

# Class: GeneralModule

Defined in: [modules/general/index.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L24)

## Constructors

### Constructor

```ts
new GeneralModule(client: BaseClient): GeneralModule;
```

Defined in: [modules/general/index.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L25)

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

Defined in: [modules/general/index.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L70)

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

Defined in: [modules/general/index.ts:106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L106)

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

Defined in: [modules/general/index.ts:140](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L140)

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

Defined in: [modules/general/index.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L182)

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

Defined in: [modules/general/index.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L224)

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

Defined in: [modules/general/index.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L270)

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

Defined in: [modules/general/index.ts:304](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L304)

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

### getJamSubscription()

```ts
getJamSubscription(): Promise<JamSubscriptionDetails>;
```

Defined in: [modules/general/index.ts:346](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L346)

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

Defined in: [modules/general/index.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L374)

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

***

### getTariffConstructorOptions()

```ts
getTariffConstructorOptions(params?: GetTariffConstructorOptionsParams): Promise<PlanBuilderOptionsInfo>;
```

Defined in: [modules/general/index.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/general/index.ts#L417)

Получение информации об опциях и пакетах опций Конструктора тарифов (Plan Builder)

Возвращает информацию обо всех опциях и пакетах опций, которые продавец активировал
в [Конструкторе тарифов](https://seller.wildberries.ru/tariff-constructor).

Опции, включённые в активированные пакеты, возвращаются в массиве `packages`.
Опции, активированные вне пакетов, возвращаются в массиве `options`.

**Авторизация:** Сервисный токен любой категории.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 1 запрос | 1 мин | 10 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`GetTariffConstructorOptionsParams`](../-internal-/interfaces/GetTariffConstructorOptionsParams.md) | Параметры запроса |

#### Returns

`Promise`\<[`PlanBuilderOptionsInfo`](../-internal-/interfaces/PlanBuilderOptionsInfo.md)\>

Активированные опции и пакеты опций Конструктора тарифов

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (e.g., wrong locale value) (400)

#### Throws

When network request fails or times out

#### Since

3.16.0

#### See

[https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1TariffConstructorOptions](https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1TariffConstructorOptions)

#### Example

```typescript
const info = await sdk.general.getTariffConstructorOptions({ locale: 'ru' });
console.log(`Total fee: ${info.totalCommissionRate}%`);
console.log(`Packages: ${info.activePackageCount}, standalone options: ${info.activeOptionCount}`);
for (const pkg of info.packages) {
  console.log(`Package ${pkg.name} (${pkg.commissionRate}%) — ${pkg.options?.length ?? 0} options`);
}
```

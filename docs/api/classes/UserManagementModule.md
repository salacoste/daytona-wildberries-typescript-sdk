[Wildberries API TypeScript SDK](../modules.md) / UserManagementModule

# Class: UserManagementModule

Defined in: [modules/user-management/index.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/user-management/index.ts#L16)

## Constructors

### Constructor

```ts
new UserManagementModule(client: BaseClient): UserManagementModule;
```

Defined in: [modules/user-management/index.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/user-management/index.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`UserManagementModule`

## Methods

### createInvite()

```ts
createInvite(data: CreateInviteRequest): Promise<CreateInviteResponse>;
```

Defined in: [modules/user-management/index.ts:55](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/user-management/index.ts#L55)

Создание приглашения для пользователя

Создаёт приглашение для нового пользователя профиля продавца.
В запросе указываются номер телефона, должность и настройки доступа к разделам.
Если массив `access` пустой или не указан — будут применены доступы по умолчанию.
Возвращает ID приглашения, ссылку для приглашения и срок действия.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 60 запросов | 1 секунда | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`CreateInviteRequest`](../interfaces/CreateInviteRequest.md) | Данные для создания приглашения (доступы и информация о приглашённом) |

#### Returns

`Promise`\<[`CreateInviteResponse`](../interfaces/CreateInviteResponse.md)\>

Результат создания приглашения (ID, URL, срок действия, статус)

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
const result = await sdk.userManagement.createInvite({
  invite: {
    phoneNumber: '+79991234567',
    position: 'Менеджер',
  },
  access: [
    { code: 'balance', disabled: false },
    { code: 'finance', disabled: true },
  ],
});
console.log(result.inviteUrl);
console.log(result.inviteID);
```

***

### getUsers()

```ts
getUsers(params?: GetUsersParams): Promise<GetUsersResponse>;
```

Defined in: [modules/user-management/index.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/user-management/index.ts#L98)

Получение списка пользователей профиля продавца

Возвращает список активных или приглашённых пользователей профиля продавца.
Поддерживает пагинацию через `limit` и `offset`.
Параметр `isInviteOnly` позволяет фильтровать только приглашённых,
которые ещё не активировали доступ.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 60 запросов | 1 секунда | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`GetUsersParams`](../interfaces/GetUsersParams.md) | Параметры запроса (пагинация и фильтрация) |

#### Returns

`Promise`\<[`GetUsersResponse`](../interfaces/GetUsersResponse.md)\>

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
const result = await sdk.userManagement.getUsers({ limit: 50, offset: 0 });
console.log(result.total);
for (const user of result.users) {
  console.log(user.firstName, user.secondName, user.role);
}
```

***

### updateUserAccess()

```ts
updateUserAccess(data: UpdateUserAccessRequest): Promise<void>;
```

Defined in: [modules/user-management/index.ts:142](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/user-management/index.ts#L142)

Обновление настроек доступа пользователей

Обновляет настройки доступа к разделам профиля продавца для указанных пользователей.
Для каждого пользователя передаётся массив настроек доступа с кодом раздела
и статусом (disabled: true — запрещён, false — разрешён).

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 60 запросов | 1 секунда | 5 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`UpdateUserAccessRequest`](../interfaces/UpdateUserAccessRequest.md) | Настройки доступа для пользователей |

#### Returns

`Promise`\<`void`\>

void (200 ответ без тела)

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
await sdk.userManagement.updateUserAccess({
  usersAccesses: [
    {
      userId: 12345,
      access: [
        { code: 'balance', disabled: false },
        { code: 'finance', disabled: true },
      ],
    },
  ],
});
```

***

### deleteUser()

```ts
deleteUser(deletedUserID: number): Promise<void>;
```

Defined in: [modules/user-management/index.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/user-management/index.ts#L172)

Удаление пользователя из профиля продавца

Удаляет пользователя из профиля продавца по его ID.
ID пользователя передаётся как query-параметр `deletedUserID`.
После удаления пользователь теряет доступ ко всем разделам профиля.

Rate limit:
| Период | Лимит | Интервал | Всплеск |
| --- | --- | --- | --- |
| 1 мин | 60 запросов | 1 секунда | 10 запросов |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deletedUserID` | `number` | ID удаляемого пользователя |

#### Returns

`Promise`\<`void`\>

void (200 ответ без тела)

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
await sdk.userManagement.deleteUser(12345);
```

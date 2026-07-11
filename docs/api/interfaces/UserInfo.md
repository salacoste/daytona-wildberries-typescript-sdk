[Wildberries API TypeScript SDK](../modules.md) / UserInfo

# Interface: UserInfo

Defined in: [types/user-management.types.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L97)

Информация о пользователе профиля продавца

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | ID пользователя | [types/user-management.types.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L99) |
| <a id="role"></a> `role` | `""` \| `"user"` | Роль пользователя: - `user` — пользователь, который активировал доступ - `` (пустая строка) — пользователь, который не активировал доступ | [types/user-management.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L105) |
| <a id="position"></a> `position` | `string` | Должность пользователя | [types/user-management.types.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L107) |
| <a id="phone"></a> `phone` | `string` | Номер телефона пользователя | [types/user-management.types.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L109) |
| <a id="email"></a> `email` | `string` | Email пользователя | [types/user-management.types.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L111) |
| <a id="isowner"></a> `isOwner` | `boolean` | Является ли пользователь владельцем профиля продавца | [types/user-management.types.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L113) |
| <a id="firstname"></a> `firstName` | `string` | Имя пользователя | [types/user-management.types.ts:115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L115) |
| <a id="secondname"></a> `secondName` | `string` | Фамилия пользователя | [types/user-management.types.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L117) |
| <a id="patronymic"></a> `patronymic` | `string` | Отчество пользователя | [types/user-management.types.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L119) |
| <a id="goodsreturn"></a> `goodsReturn` | `boolean` | Может ли пользователь одобрять возвраты товаров | [types/user-management.types.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L121) |
| <a id="isinvitee"></a> `isInvitee` | `boolean` | Приглашён ли пользователь | [types/user-management.types.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L123) |
| <a id="inviteeinfo"></a> `inviteeInfo` | [`InviteeInfo`](InviteeInfo.md) \| `null` | Информация о приглашении, если пользователь приглашён | [types/user-management.types.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L125) |
| <a id="access"></a> `access` | [`AccessItem`](AccessItem.md)[] | Настройки доступа к разделам профиля продавца | [types/user-management.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L127) |

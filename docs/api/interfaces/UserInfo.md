[Wildberries API TypeScript SDK](../modules.md) / UserInfo

# Interface: UserInfo

Defined in: [types/user-management.types.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L85)

Информация о пользователе профиля продавца

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | ID пользователя | [types/user-management.types.ts:87](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L87) |
| <a id="role"></a> `role` | `""` \| `"user"` | Роль пользователя: - `user` — пользователь, который активировал доступ - `` (пустая строка) — пользователь, который не активировал доступ | [types/user-management.types.ts:93](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L93) |
| <a id="position"></a> `position` | `string` | Должность пользователя | [types/user-management.types.ts:95](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L95) |
| <a id="phone"></a> `phone` | `string` | Номер телефона пользователя | [types/user-management.types.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L97) |
| <a id="email"></a> `email` | `string` | Email пользователя | [types/user-management.types.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L99) |
| <a id="isowner"></a> `isOwner` | `boolean` | Является ли пользователь владельцем профиля продавца | [types/user-management.types.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L101) |
| <a id="firstname"></a> `firstName` | `string` | Имя пользователя | [types/user-management.types.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L103) |
| <a id="secondname"></a> `secondName` | `string` | Фамилия пользователя | [types/user-management.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L105) |
| <a id="patronymic"></a> `patronymic` | `string` | Отчество пользователя | [types/user-management.types.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L107) |
| <a id="goodsreturn"></a> `goodsReturn` | `boolean` | Может ли пользователь одобрять возвраты товаров | [types/user-management.types.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L109) |
| <a id="isinvitee"></a> `isInvitee` | `boolean` | Приглашён ли пользователь | [types/user-management.types.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L111) |
| <a id="inviteeinfo"></a> `inviteeInfo` | [`InviteeInfo`](InviteeInfo.md) \| `null` | Информация о приглашении, если пользователь приглашён | [types/user-management.types.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L113) |
| <a id="access"></a> `access` | [`AccessItem`](AccessItem.md)[] | Настройки доступа к разделам профиля продавца | [types/user-management.types.ts:115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/user-management.types.ts#L115) |

[Wildberries API TypeScript SDK](../modules.md) / CreateInviteRequest

# Interface: CreateInviteRequest

Defined in: [types/user-management.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L169)

Запрос на создание приглашения пользователя

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="access"></a> `access?` | [`AccessItem`](AccessItem.md)[] | Настройки доступа (если пустой массив или не указан — доступы по умолчанию) | [types/user-management.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L171) |
| <a id="invite"></a> `invite` | \{ `phoneNumber`: `string`; `position?`: `string`; \} | Данные приглашения | [types/user-management.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L173) |
| `invite.phoneNumber` | `string` | Номер телефона пользователя для приглашения | [types/user-management.types.ts:175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L175) |
| `invite.position?` | `string` | Должность пользователя Max length: 150 | [types/user-management.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L180) |

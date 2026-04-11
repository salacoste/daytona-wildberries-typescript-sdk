[Wildberries API TypeScript SDK](../modules.md) / CreateInviteRequest

# Interface: CreateInviteRequest

Defined in: [types/user-management.types.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/user-management.types.ts#L157)

Запрос на создание приглашения пользователя

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="access"></a> `access?` | [`AccessItem`](AccessItem.md)[] | Настройки доступа (если пустой массив или не указан — доступы по умолчанию) | [types/user-management.types.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/user-management.types.ts#L159) |
| <a id="invite"></a> `invite` | \{ `phoneNumber`: `string`; `position?`: `string`; \} | Данные приглашения | [types/user-management.types.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/user-management.types.ts#L161) |
| `invite.phoneNumber` | `string` | Номер телефона пользователя для приглашения | [types/user-management.types.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/user-management.types.ts#L163) |
| `invite.position?` | `string` | Должность пользователя **Max Length** 150 | [types/user-management.types.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/user-management.types.ts#L168) |

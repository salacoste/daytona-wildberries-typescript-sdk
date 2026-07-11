[Wildberries API TypeScript SDK](../modules.md) / CreateInviteResponse

# Interface: CreateInviteResponse

Defined in: [types/user-management.types.ts:187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L187)

Ответ на запрос создания приглашения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="inviteid"></a> `inviteID` | `string` | ID приглашения Format: uuid | [types/user-management.types.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L192) |
| <a id="expiredat"></a> `expiredAt` | `string` | Дата и время окончания срока действия приглашения Format: date-time | [types/user-management.types.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L197) |
| <a id="issuccess"></a> `isSuccess` | `boolean` | Результат создания приглашения: - `true` — приглашение создано успешно - `false` — повторите запрос | [types/user-management.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L203) |
| <a id="inviteurl"></a> `inviteUrl` | `string` | URL приглашения, по которому должен перейти пользователь Format: uri | [types/user-management.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L208) |

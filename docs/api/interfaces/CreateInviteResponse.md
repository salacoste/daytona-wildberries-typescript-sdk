[Wildberries API TypeScript SDK](../modules.md) / CreateInviteResponse

# Interface: CreateInviteResponse

Defined in: [types/user-management.types.ts:175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/user-management.types.ts#L175)

Ответ на запрос создания приглашения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="inviteid"></a> `inviteID` | `string` | ID приглашения Format: uuid | [types/user-management.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/user-management.types.ts#L180) |
| <a id="expiredat"></a> `expiredAt` | `string` | Дата и время окончания срока действия приглашения Format: date-time | [types/user-management.types.ts:185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/user-management.types.ts#L185) |
| <a id="issuccess"></a> `isSuccess` | `boolean` | Результат создания приглашения: - `true` — приглашение создано успешно - `false` — повторите запрос | [types/user-management.types.ts:191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/user-management.types.ts#L191) |
| <a id="inviteurl"></a> `inviteUrl` | `string` | URL приглашения, по которому должен перейти пользователь Format: uri | [types/user-management.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/user-management.types.ts#L196) |

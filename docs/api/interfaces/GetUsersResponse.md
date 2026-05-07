[Wildberries API TypeScript SDK](../modules.md) / GetUsersResponse

# Interface: GetUsersResponse

Defined in: [types/user-management.types.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/user-management.types.ts#L121)

Ответ на запрос списка пользователей

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="total"></a> `total` | `number` | Общее количество активных или приглашённых пользователей | [types/user-management.types.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/user-management.types.ts#L123) |
| <a id="countinresponse"></a> `countInResponse` | `number` | Количество активных или приглашённых пользователей на текущей странице | [types/user-management.types.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/user-management.types.ts#L125) |
| <a id="users"></a> `users` | [`UserInfo`](UserInfo.md)[] | Информация о пользователях | [types/user-management.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/user-management.types.ts#L127) |

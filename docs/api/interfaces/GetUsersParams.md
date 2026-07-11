[Wildberries API TypeScript SDK](../modules.md) / GetUsersParams

# Interface: GetUsersParams

Defined in: [types/user-management.types.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L145)

Параметры запроса для получения списка пользователей

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество активных или приглашённых пользователей в ответе **Default** `100 Maximum: 100` | [types/user-management.types.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L151) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента **Default** `0` | [types/user-management.types.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L156) |
| <a id="isinviteonly"></a> `isInviteOnly?` | `boolean` | Фильтр по типу пользователей: - `true` — список приглашённых пользователей, которые ещё не активировали доступ - `false` или не указан — список активных пользователей профиля продавца **Default** `false` | [types/user-management.types.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/user-management.types.ts#L163) |

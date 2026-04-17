[Wildberries API TypeScript SDK](../modules.md) / GetUsersParams

# Interface: GetUsersParams

Defined in: [types/user-management.types.ts:133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/user-management.types.ts#L133)

Параметры запроса для получения списка пользователей

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество активных или приглашённых пользователей в ответе **Default** `100 Maximum: 100` | [types/user-management.types.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/user-management.types.ts#L139) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента **Default** `0` | [types/user-management.types.ts:144](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/user-management.types.ts#L144) |
| <a id="isinviteonly"></a> `isInviteOnly?` | `boolean` | Фильтр по типу пользователей: - `true` — список приглашённых пользователей, которые ещё не активировали доступ - `false` или не указан — список активных пользователей профиля продавца **Default** `false` | [types/user-management.types.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/user-management.types.ts#L151) |

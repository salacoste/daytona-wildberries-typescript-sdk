[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UserInfo

# Interface: UserInfo

Defined in: [types/general.types.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L224)

User information

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | User ID | [types/general.types.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L226) |
| <a id="role"></a> `role` | `""` \| `"user"` | User role: "user" for activated users, "" for non-activated | [types/general.types.ts:228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L228) |
| <a id="position"></a> `position` | `string` | User position | [types/general.types.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L230) |
| <a id="phone"></a> `phone` | `string` | Phone number | [types/general.types.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L232) |
| <a id="email"></a> `email` | `string` | Email | [types/general.types.ts:234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L234) |
| <a id="isowner"></a> `isOwner` | `boolean` | Whether user is the profile owner | [types/general.types.ts:236](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L236) |
| <a id="firstname"></a> `firstName` | `string` | First name | [types/general.types.ts:238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L238) |
| <a id="secondname"></a> `secondName` | `string` | Last name | [types/general.types.ts:240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L240) |
| <a id="patronymic"></a> `patronymic` | `string` | Patronymic | [types/general.types.ts:242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L242) |
| <a id="goodsreturn"></a> `goodsReturn` | `boolean` | Whether user can approve goods returns | [types/general.types.ts:244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L244) |
| <a id="isinvitee"></a> `isInvitee` | `boolean` | Whether user was invited | [types/general.types.ts:246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L246) |
| <a id="inviteeinfo"></a> `inviteeInfo` | [`InviteeInfo`](InviteeInfo.md) \| `null` | Invitation info (null if not invited) | [types/general.types.ts:248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L248) |
| <a id="access"></a> `access` | [`AccessItem`](AccessItem.md)[] | Access permissions | [types/general.types.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L250) |

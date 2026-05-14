[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UserInfo

# Interface: UserInfo

Defined in: [types/general.types.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L162)

User information

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | User ID | [types/general.types.ts:164](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L164) |
| <a id="role"></a> `role` | `""` \| `"user"` | User role: "user" for activated users, "" for non-activated | [types/general.types.ts:166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L166) |
| <a id="position"></a> `position` | `string` | User position | [types/general.types.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L168) |
| <a id="phone"></a> `phone` | `string` | Phone number | [types/general.types.ts:170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L170) |
| <a id="email"></a> `email` | `string` | Email | [types/general.types.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L172) |
| <a id="isowner"></a> `isOwner` | `boolean` | Whether user is the profile owner | [types/general.types.ts:174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L174) |
| <a id="firstname"></a> `firstName` | `string` | First name | [types/general.types.ts:176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L176) |
| <a id="secondname"></a> `secondName` | `string` | Last name | [types/general.types.ts:178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L178) |
| <a id="patronymic"></a> `patronymic` | `string` | Patronymic | [types/general.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L180) |
| <a id="goodsreturn"></a> `goodsReturn` | `boolean` | Whether user can approve goods returns | [types/general.types.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L182) |
| <a id="isinvitee"></a> `isInvitee` | `boolean` | Whether user was invited | [types/general.types.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L184) |
| <a id="inviteeinfo"></a> `inviteeInfo` | [`InviteeInfo`](InviteeInfo.md) \| `null` | Invitation info (null if not invited) | [types/general.types.ts:186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L186) |
| <a id="access"></a> `access` | [`AccessItem`](AccessItem.md)[] | Access permissions | [types/general.types.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/general.types.ts#L188) |

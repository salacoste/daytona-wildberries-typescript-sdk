[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsSupply

# Interface: ModelsSupply

Defined in: [types/orders-fbw.types.ts:321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L321)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="phone"></a> `phone?` | `string` | Телефон пользователя, создавшего поставку | [types/orders-fbw.types.ts:323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L323) |
| <a id="supplyid"></a> `supplyID?` | `number` | ID поставки. Если `null`, это заказ, тогда используйте значение поля `preorderID` | [types/orders-fbw.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L325) |
| <a id="preorderid"></a> `preorderID?` | `number` | ID заказа (незапланированная поставка). Для всех виртуальных поставок будет `0` | [types/orders-fbw.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L327) |
| <a id="createdate"></a> `createDate?` | `string` | Дата и время создания поставки | [types/orders-fbw.types.ts:329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L329) |
| <a id="supplydate"></a> `supplyDate?` | `string` | Плановая дата отгрузки поставки | [types/orders-fbw.types.ts:331](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L331) |
| <a id="factdate"></a> `factDate?` | `string` | Дата фактической отгрузки поставки | [types/orders-fbw.types.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L333) |
| <a id="updateddate"></a> `updatedDate?` | `string` | Дата изменения поставки | [types/orders-fbw.types.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L335) |
| <a id="statusid"></a> `statusID?` | `1` \| `2` \| `5` \| `3` \| `4` \| `6` | ID статуса поставки: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах | [types/orders-fbw.types.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L337) |
| <a id="statusname"></a> `statusName?` | \| `"Не запланировано"` \| `"Запланировано"` \| `"Отгрузка разрешена"` \| `"Идёт приёмка"` \| `"Принято"` \| `"Отгружено на воротах"` | Текущий статус поставки | [types/orders-fbw.types.ts:339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L339) |
| <a id="boxtypeid"></a> `boxTypeID?` | `number` | ID типа поставки: - `0` — Без коробов - `1`,`2` — Короба - `5` — Монопаллеты - `6` — Суперсейф - `7` — Поштучная паллета | [types/orders-fbw.types.ts:347](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L347) |
| <a id="isboxonpallet"></a> `isBoxOnPallet?` | `boolean` | Является ли поставка типом «Поштучная паллета» | [types/orders-fbw.types.ts:349](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L349) |

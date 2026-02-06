[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsSupply

# Interface: ModelsSupply

Defined in: [types/orders-fbw.types.ts:225](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L225)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="phone"></a> `phone?` | `string` | Телефон пользователя, создавшего поставку | [types/orders-fbw.types.ts:227](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L227) |
| <a id="supplyid"></a> `supplyID?` | `number` | ID поставки. Если `null`, это заказ, тогда используйте значение поля `preorderID` | [types/orders-fbw.types.ts:229](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L229) |
| <a id="preorderid"></a> `preorderID?` | `number` | ID заказа (незапланированная поставка). Для всех виртуальных поставок будет `0` | [types/orders-fbw.types.ts:231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L231) |
| <a id="createdate"></a> `createDate?` | `string` | Дата и время создания поставки | [types/orders-fbw.types.ts:233](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L233) |
| <a id="supplydate"></a> `supplyDate?` | `string` | Плановая дата отгрузки поставки | [types/orders-fbw.types.ts:235](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L235) |
| <a id="factdate"></a> `factDate?` | `string` | Дата фактической отгрузки поставки | [types/orders-fbw.types.ts:237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L237) |
| <a id="updateddate"></a> `updatedDate?` | `string` | Дата изменения поставки | [types/orders-fbw.types.ts:239](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L239) |
| <a id="statusid"></a> `statusID?` | `1` \| `4` \| `5` \| `6` \| `2` \| `3` | ID статуса поставки: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах | [types/orders-fbw.types.ts:241](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L241) |
| <a id="statusname"></a> `statusName?` | \| `"Не запланировано"` \| `"Запланировано"` \| `"Отгрузка разрешена"` \| `"Идёт приёмка"` \| `"Принято"` \| `"Отгружено на воротах"` | Текущий статус поставки | [types/orders-fbw.types.ts:243](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-fbw.types.ts#L243) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ResponseInfoAdvertType9

# Interface: ResponseInfoAdvertType9

Defined in: [types/promotion.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L196)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="endtime"></a> `endTime?` | `string` | Дата завершения кампании | [types/promotion.types.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L198) |
| <a id="createtime"></a> `createTime?` | `string` | Дата создания кампании | [types/promotion.types.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L200) |
| <a id="changetime"></a> `changeTime?` | `string` | Дата последнего изменения кампании | [types/promotion.types.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L202) |
| <a id="starttime"></a> `startTime?` | `string` | Дата последнего запуска кампании | [types/promotion.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L204) |
| <a id="searchplusestate"></a> `searchPluseState?` | `boolean` | Активность фиксированных фраз: - `false` — не активны - `true` — активны | [types/promotion.types.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L206) |
| <a id="name"></a> `name?` | `string` | Название кампании | [types/promotion.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L208) |
| <a id="unitedparams"></a> `unitedParams?` | \{ `subject?`: \{ `id?`: `number`; `name?`: `string`; \}; `menus?`: \{ `id?`: `number`; `name?`: `string`; \}[]; `nms?`: `number`[]; `searchCPM?`: `number`; `catalogCPM?`: `number`; \}[] | - | [types/promotion.types.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L209) |
| <a id="dailybudget"></a> `dailyBudget?` | `number` | Не используется | [types/promotion.types.ts:231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L231) |
| <a id="advertid"></a> `advertId?` | `number` | ID кампании | [types/promotion.types.ts:233](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L233) |
| <a id="status"></a> `status?` | `number` | Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе | [types/promotion.types.ts:235](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L235) |
| <a id="type"></a> `type?` | `number` | Тип кампании: - `9` — Ручная ставка | [types/promotion.types.ts:237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L237) |
| <a id="paymenttype"></a> `paymentType?` | `string` | Модель оплаты: - `cpm` — за показы | [types/promotion.types.ts:239](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L239) |
| <a id="auction_multibids"></a> `auction_multibids?` | \{ `nm?`: `number`; `bid?`: `number`; \}[] | Ставки артикулов WB | [types/promotion.types.ts:241](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L241) |

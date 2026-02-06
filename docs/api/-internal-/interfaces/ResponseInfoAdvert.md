[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ResponseInfoAdvert

# Interface: ResponseInfoAdvert

Defined in: [types/promotion.types.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L73)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="endtime"></a> `endTime?` | `string` | Дата завершения кампании | [types/promotion.types.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L75) |
| <a id="createtime"></a> `createTime?` | `string` | Время создания кампании | [types/promotion.types.ts:77](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L77) |
| <a id="changetime"></a> `changeTime?` | `string` | Время последнего изменения кампании | [types/promotion.types.ts:79](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L79) |
| <a id="starttime"></a> `startTime?` | `string` | Дата последнего запуска кампании | [types/promotion.types.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L81) |
| <a id="name"></a> `name?` | `string` | Название кампании | [types/promotion.types.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L83) |
| <a id="params"></a> `params?` | \{ `subjectName?`: `string`; `active?`: `boolean`; `intervals?`: \{ `begin?`: `number`; `end?`: `number`; \}[]; `price?`: `number`; `menuId?`: `number`; `subjectId?`: `number`; `setId?`: `number`; `setName?`: `string`; `menuName?`: `string`; `nms?`: \{ `nm?`: `number`; `active?`: `boolean`; \}[]; \}[] | Параметры кампании | [types/promotion.types.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L85) |
| <a id="dailybudget"></a> `dailyBudget?` | `number` | Дневной бюджет. Если не установлен, то `0` | [types/promotion.types.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L118) |
| <a id="advertid"></a> `advertId?` | `number` | ID кампании | [types/promotion.types.ts:120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L120) |
| <a id="status"></a> `status?` | `number` | Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе | [types/promotion.types.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L122) |
| <a id="type"></a> `type?` | `number` | Тип кампании: - `4` — кампания в каталоге (**устаревший тип**) - `5` — кампания в карточке товара (**устаревший тип**) - `6` — кампания в поиске (**устаревший тип**) - `7` — кампания в рекомендациях на главной странице (**устаревший тип**) | [types/promotion.types.ts:124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L124) |
| <a id="paymenttype"></a> `paymentType?` | `string` | Модель оплаты: - `cpm` — за показы | [types/promotion.types.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L126) |
| <a id="searchplusestate"></a> `searchPluseState?` | `boolean` | Активность фиксированных фраз: - `false` — не активны - `true` — активны | [types/promotion.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/promotion.types.ts#L128) |

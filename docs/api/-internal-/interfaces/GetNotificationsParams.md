[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetNotificationsParams

# Interface: GetNotificationsParams

Defined in: [types/general.types.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L65)

Parameters for the seller-portal notifications request

## See

task-239

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="from"></a> `from?` | `string` | Фильтр по дате и времени: в ответе только уведомления, полученные ДО указанного момента. Для пагинации передавайте `date` последнего уведомления из предыдущего ответа. Для самых свежих — не передавайте | [types/general.types.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L71) |
| <a id="timezone"></a> `timezone?` | `string` | Часовой пояс в формате IANA (по умолчанию Europe/Moscow) | [types/general.types.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L73) |
| <a id="limit"></a> `limit?` | `number` | Количество уведомлений в ответе (5–100, по умолчанию 10) | [types/general.types.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L75) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodCard

# Interface: GoodCard

Defined in: [types/communications.types.ts:502](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L502)

Информация о заказе

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date?` | `string` | Дата заказа | [types/communications.types.ts:504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L504) |
| <a id="needrefund"></a> ~~`needRefund?`~~ | `boolean` | Запрошен ли возврат товара **Deprecated** This field has been removed. Use the claims endpoint instead: /api/v1/claims | [types/communications.types.ts:509](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L509) |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/communications.types.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L511) |
| <a id="price"></a> `price?` | `number` | Фактическая цена с учетом всех скидок. Взимается с покупателя | [types/communications.types.ts:513](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L513) |
| <a id="pricecurrency"></a> `priceCurrency?` | `string` | Валюта | [types/communications.types.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L515) |
| <a id="rid"></a> `rid?` | `string` | Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) | [types/communications.types.ts:517](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L517) |
| <a id="size"></a> `size?` | `string` | Размер товара, соответствует `wbSize` в [карточке товара](https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) | [types/communications.types.ts:519](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L519) |
| <a id="statusid"></a> ~~`statusID?`~~ | `number` | Статус товара **Deprecated** This field will be removed on February 10. See https://dev.wildberries.ru/release-notes?id=469 | [types/communications.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L524) |

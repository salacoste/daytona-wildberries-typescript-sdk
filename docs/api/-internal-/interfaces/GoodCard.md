[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodCard

# Interface: GoodCard

Defined in: [types/communications.types.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L515)

Информация о заказе

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date?` | `string` | Дата заказа | [types/communications.types.ts:517](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L517) |
| <a id="needrefund"></a> ~~`needRefund?`~~ | `boolean` | Запрошен ли возврат товара **Deprecated** This field has been removed. Use the claims endpoint instead: /api/v1/claims | [types/communications.types.ts:522](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L522) |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/communications.types.ts:524](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L524) |
| <a id="price"></a> `price?` | `number` | Фактическая цена с учетом всех скидок. Взимается с покупателя | [types/communications.types.ts:526](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L526) |
| <a id="pricecurrency"></a> `priceCurrency?` | `string` | Валюта | [types/communications.types.ts:528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L528) |
| <a id="rid"></a> `rid?` | `string` | Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) | [types/communications.types.ts:530](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L530) |
| <a id="size"></a> `size?` | `string` | Размер товара, соответствует `wbSize` в [карточке товара](https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) | [types/communications.types.ts:532](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L532) |
| <a id="statusid"></a> ~~`statusID?`~~ | `number` | Статус товара **Deprecated** This field will be removed on February 10. See https://dev.wildberries.ru/release-notes?id=469 | [types/communications.types.ts:537](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L537) |

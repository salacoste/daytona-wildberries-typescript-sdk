[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodCard

# Interface: GoodCard

Defined in: [types/communications.types.ts:505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L505)

Информация о заказе

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/communications.types.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L507) |
| <a id="price"></a> `price?` | `number` | Фактическая цена с учетом всех скидок. Взимается с покупателя | [types/communications.types.ts:509](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L509) |
| <a id="pricecurrency"></a> `priceCurrency?` | `string` | Валюта | [types/communications.types.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L511) |
| <a id="rid"></a> `rid?` | `string` | Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) | [types/communications.types.ts:513](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L513) |
| <a id="size"></a> `size?` | `string` | Размер товара, соответствует `wbSize` в [карточке товара](https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) | [types/communications.types.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L515) |

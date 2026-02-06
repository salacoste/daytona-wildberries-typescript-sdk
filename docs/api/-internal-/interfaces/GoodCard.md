[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodCard

# Interface: GoodCard

Defined in: [types/communications.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L267)

Информация о заказе

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date?` | `string` | Дата заказа | [types/communications.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L269) |
| <a id="needrefund"></a> `needRefund?` | `boolean` | **Поле будет удалено 24 октября**.<br> Используйте отдельный метод для получения [заявок покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get). <br><br> Запрошен ли возврат товара: - `false` — не запрошен - `true` — запрошен | [types/communications.types.ts:271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L271) |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/communications.types.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L273) |
| <a id="price"></a> `price?` | `number` | Фактическая цена с учетом всех скидок. Взимается с покупателя | [types/communications.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L275) |
| <a id="pricecurrency"></a> `priceCurrency?` | `string` | Валюта | [types/communications.types.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L277) |
| <a id="rid"></a> `rid?` | `string` | Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](./reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](./financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) | [types/communications.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L279) |
| <a id="size"></a> `size?` | `string` | Размер товара, соответствует `wbSize` в [карточке товара](./work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) | [types/communications.types.ts:281](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L281) |
| <a id="statusid"></a> `statusID?` | `number` | Статус товара: - `0` — Товар активный - `1` — Товар оформлен - `2` — Товар собирается - `3` — Товар в пути - `4` — Товар ожидает в ПВЗ - `5` — Товар у курьера - `10` — Товар в архиве - `11` — Товар выкуплен - `12` — Товар отменён - `13` — Оформлен возврат - `14` — Товар отменён (нет на складе) | [types/communications.types.ts:283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/communications.types.ts#L283) |

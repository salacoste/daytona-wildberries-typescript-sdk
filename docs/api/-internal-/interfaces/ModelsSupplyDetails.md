[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsSupplyDetails

# Interface: ModelsSupplyDetails

Defined in: [types/orders-fbw.types.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L159)

## Example

```json
{
 "phone": "+7 903 *** 98 62",
 "statusID": 5,
 "statusName": "Принято",
 "boxTypeID": 5,
 "boxTypeName": "Монопаллеты",
 "createDate": "2025-07-15T17:17:45+03:00",
 "supplyDate": "2025-07-15T00:00:00+03:00",
 "factDate": "2025-07-18T11:37:32+03:00",
 "updatedDate": "2025-07-18T12:59:53+03:00",
 "warehouseID": 507,
 "warehouseName": "Коледино",
 "actualWarehouseID": 507,
 "actualWarehouseName": "Коледино",
 "transitWarehouseID": null,
 "transitWarehouseName": "",
 "acceptanceCost": 5000,
 "paidAcceptanceCoefficient": 10,
 "rejectReason": null,
 "supplierAssignName": "Магазн",
 "storageCoef": "215",
 "deliveryCoef": "200",
 "quantity": 10,
 "readyForSaleQuantity": 0,
 "acceptedQuantity": 10,
 "unloadingQuantity": 10,
 "depersonalizedQuantity": 0,
 "discrepancies": 0
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="phone"></a> `phone?` | `string` | Телефон пользователя, создавшего поставку | [types/orders-fbw.types.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L161) |
| <a id="statusid"></a> `statusID?` | `1` \| `2` \| `5` \| `3` \| `4` \| `6` | ID статуса поставки: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах | [types/orders-fbw.types.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L163) |
| <a id="statusname"></a> `statusName?` | \| `"Не запланировано"` \| `"Запланировано"` \| `"Отгрузка разрешена"` \| `"Идёт приёмка"` \| `"Принято"` \| `"Отгружено на воротах"` | Статус поставки | [types/orders-fbw.types.ts:165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L165) |
| <a id="virtualtypeid"></a> `virtualTypeID?` | `number` | ID типа виртуальной поставки. Отображается только для поставок с `"boxTypeID":0`. - `0` — Перенос остатков - `1` — Обезличка - `4` — QR-поставка - `5` — Допринято - `6` — Скан-приёмка | [types/orders-fbw.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L173) |
| <a id="virtualtypename"></a> `virtualTypeName?` | `string` | Тип виртуальной поставки. Отображается только для поставок с `"boxTypeID":0`. - `Перенос остатков` - `Обезличка` - `QR-поставка` - `Допринято` - `Скан-приёмка` | [types/orders-fbw.types.ts:175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L175) |
| <a id="boxtypeid"></a> `boxTypeID?` | `number` | ID типа поставки: - `0` — Без коробов (виртуальная поставка) - `1` и `2` — Короба - `5` — Монопаллеты - `6` — Суперсейф - `7` — Поштучная паллета | [types/orders-fbw.types.ts:177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L177) |
| <a id="boxtypename"></a> `boxTypeName?` | `string` | Тип поставки: - `Короба` - `Монопаллеты` - `Суперсейф` - `Без коробов` - `Поштучная паллета` | [types/orders-fbw.types.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L179) |
| <a id="isboxonpallet"></a> `isBoxOnPallet?` | `boolean` | Является ли поставка типом «Поштучная паллета» | [types/orders-fbw.types.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L181) |
| <a id="createdate"></a> `createDate?` | `string` | Дата и время создания поставки | [types/orders-fbw.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L183) |
| <a id="supplydate"></a> `supplyDate?` | `string` | Плановая дата отгрузки поставки | [types/orders-fbw.types.ts:185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L185) |
| <a id="factdate"></a> `factDate?` | `string` | Дата фактической отгрузки поставки | [types/orders-fbw.types.ts:187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L187) |
| <a id="updateddate"></a> `updatedDate?` | `string` | Дата изменения поставки | [types/orders-fbw.types.ts:189](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L189) |
| <a id="warehouseid"></a> `warehouseID?` | `number` | ID склада, на который планируется поставка | [types/orders-fbw.types.ts:191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L191) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Название склада, на который планируется поставка | [types/orders-fbw.types.ts:193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L193) |
| <a id="actualwarehouseid"></a> `actualWarehouseID?` | `number` | ID склада, на который поставка была привезена | [types/orders-fbw.types.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L195) |
| <a id="actualwarehousename"></a> `actualWarehouseName?` | `string` | Название склада, на который поставка привезена | [types/orders-fbw.types.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L197) |
| <a id="transitwarehouseid"></a> `transitWarehouseID?` | `number` | ID транзитного склада | [types/orders-fbw.types.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L199) |
| <a id="transitwarehousename"></a> `transitWarehouseName?` | `string` | Название транзитного склада | [types/orders-fbw.types.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L201) |
| <a id="acceptancecost"></a> `acceptanceCost?` | `number` | Предварительная стоимость приёмки, ₽ | [types/orders-fbw.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L203) |
| <a id="paidacceptancecoefficient"></a> `paidAcceptanceCoefficient?` | `number` | Коэффициент приёмки | [types/orders-fbw.types.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L205) |
| <a id="rejectreason"></a> `rejectReason?` | `string` | Причина, по которой поставка не может быть принята | [types/orders-fbw.types.ts:207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L207) |
| <a id="supplierassignname"></a> `supplierAssignName?` | `string` | Краткое название продавца | [types/orders-fbw.types.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L209) |
| <a id="storagecoef"></a> `storageCoef?` | `string` | Коэффициент хранения | [types/orders-fbw.types.ts:211](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L211) |
| <a id="deliverycoef"></a> `deliveryCoef?` | `string` | Коэффициент логистики | [types/orders-fbw.types.ts:213](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L213) |
| <a id="quantity"></a> `quantity?` | `number` | Добавлено в поставку/заказ, шт | [types/orders-fbw.types.ts:215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L215) |
| <a id="readyforsalequantity"></a> `readyForSaleQuantity?` | `number` | Поступило в продажу, шт | [types/orders-fbw.types.ts:217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L217) |
| <a id="acceptedquantity"></a> `acceptedQuantity?` | `number` | Принято, шт | [types/orders-fbw.types.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L219) |
| <a id="unloadingquantity"></a> `unloadingQuantity?` | `number` | Количество товара, находящегося на раскладке, шт | [types/orders-fbw.types.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L221) |
| <a id="depersonalizedquantity"></a> `depersonalizedQuantity?` | `number` | Количество обезличенного товара, шт | [types/orders-fbw.types.ts:223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L223) |
| <a id="discrepancies"></a> `discrepancies?` | `number` | Расхождения между заявленным и фактическим количеством товара в поставке, шт. Присутствует только при `"statusID":5` (Принято). Расшифровку расхождений (излишки/недостача/пересорт) см. в методе `getSupplyDiscrepancies()` модуля orders-fbw. | [types/orders-fbw.types.ts:231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L231) |

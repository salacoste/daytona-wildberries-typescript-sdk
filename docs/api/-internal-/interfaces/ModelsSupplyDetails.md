[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsSupplyDetails

# Interface: ModelsSupplyDetails

Defined in: [types/orders-fbw.types.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L158)

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
 "depersonalizedQuantity": 0
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="phone"></a> `phone?` | `string` | Телефон пользователя, создавшего поставку | [types/orders-fbw.types.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L160) |
| <a id="statusid"></a> `statusID?` | `1` \| `2` \| `3` \| `5` \| `6` \| `4` | ID статуса поставки: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах | [types/orders-fbw.types.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L162) |
| <a id="statusname"></a> `statusName?` | \| `"Не запланировано"` \| `"Запланировано"` \| `"Отгрузка разрешена"` \| `"Идёт приёмка"` \| `"Принято"` \| `"Отгружено на воротах"` | Статус поставки | [types/orders-fbw.types.ts:164](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L164) |
| <a id="virtualtypeid"></a> `virtualTypeID?` | `number` | ID типа виртуальной поставки. Отображается только для поставок с `"boxTypeID":0`. - `0` — Перенос остатков - `1` — Обезличка - `4` — QR-поставка - `5` — Допринято - `6` — Скан-приёмка | [types/orders-fbw.types.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L172) |
| <a id="virtualtypename"></a> `virtualTypeName?` | `string` | Тип виртуальной поставки. Отображается только для поставок с `"boxTypeID":0`. - `Перенос остатков` - `Обезличка` - `QR-поставка` - `Допринято` - `Скан-приёмка` | [types/orders-fbw.types.ts:174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L174) |
| <a id="boxtypeid"></a> `boxTypeID?` | `number` | ID типа поставки: - `0` — Без коробов (виртуальная поставка) - `1` и `2` — Короба - `5` — Монопаллеты - `6` — Суперсейф - `7` — Поштучная паллета | [types/orders-fbw.types.ts:176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L176) |
| <a id="boxtypename"></a> `boxTypeName?` | `string` | Тип поставки: - `Короба` - `Монопаллеты` - `Суперсейф` - `Без коробов` - `Поштучная паллета` | [types/orders-fbw.types.ts:178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L178) |
| <a id="isboxonpallet"></a> `isBoxOnPallet?` | `boolean` | Является ли поставка типом «Поштучная паллета» | [types/orders-fbw.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L180) |
| <a id="createdate"></a> `createDate?` | `string` | Дата и время создания поставки | [types/orders-fbw.types.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L182) |
| <a id="supplydate"></a> `supplyDate?` | `string` | Плановая дата отгрузки поставки | [types/orders-fbw.types.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L184) |
| <a id="factdate"></a> `factDate?` | `string` | Дата фактической отгрузки поставки | [types/orders-fbw.types.ts:186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L186) |
| <a id="updateddate"></a> `updatedDate?` | `string` | Дата изменения поставки | [types/orders-fbw.types.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L188) |
| <a id="warehouseid"></a> `warehouseID?` | `number` | ID склада, на который планируется поставка | [types/orders-fbw.types.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L190) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Название склада, на который планируется поставка | [types/orders-fbw.types.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L192) |
| <a id="actualwarehouseid"></a> `actualWarehouseID?` | `number` | ID склада, на который поставка была привезена | [types/orders-fbw.types.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L194) |
| <a id="actualwarehousename"></a> `actualWarehouseName?` | `string` | Название склада, на который поставка привезена | [types/orders-fbw.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L196) |
| <a id="transitwarehouseid"></a> `transitWarehouseID?` | `number` | ID транзитного склада | [types/orders-fbw.types.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L198) |
| <a id="transitwarehousename"></a> `transitWarehouseName?` | `string` | Название транзитного склада | [types/orders-fbw.types.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L200) |
| <a id="acceptancecost"></a> `acceptanceCost?` | `number` | Предварительная стоимость приёмки, ₽ | [types/orders-fbw.types.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L202) |
| <a id="paidacceptancecoefficient"></a> `paidAcceptanceCoefficient?` | `number` | Коэффициент приёмки | [types/orders-fbw.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L204) |
| <a id="rejectreason"></a> `rejectReason?` | `string` | Причина, по которой поставка не может быть принята | [types/orders-fbw.types.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L206) |
| <a id="supplierassignname"></a> `supplierAssignName?` | `string` | Краткое название продавца | [types/orders-fbw.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L208) |
| <a id="storagecoef"></a> `storageCoef?` | `string` | Коэффициент хранения | [types/orders-fbw.types.ts:210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L210) |
| <a id="deliverycoef"></a> `deliveryCoef?` | `string` | Коэффициент логистики | [types/orders-fbw.types.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L212) |
| <a id="quantity"></a> `quantity?` | `number` | Добавлено в поставку/заказ, шт | [types/orders-fbw.types.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L214) |
| <a id="readyforsalequantity"></a> `readyForSaleQuantity?` | `number` | Поступило в продажу, шт | [types/orders-fbw.types.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L216) |
| <a id="acceptedquantity"></a> `acceptedQuantity?` | `number` | Принято, шт | [types/orders-fbw.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L218) |
| <a id="unloadingquantity"></a> `unloadingQuantity?` | `number` | Количество товара, находящегося на раскладке, шт | [types/orders-fbw.types.ts:220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L220) |
| <a id="depersonalizedquantity"></a> `depersonalizedQuantity?` | `number` | Количество обезличенного товара, шт | [types/orders-fbw.types.ts:222](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/orders-fbw.types.ts#L222) |

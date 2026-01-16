[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsGoodInSupply

# Interface: ModelsGoodInSupply

Defined in: [types/orders-fbw.types.ts:89](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L89)

## Example

```json
{
 "barcode": "1234567891234",
 "vendorCode": "wb4sewt0vg",
 "nmID": 987456654,
 "needKiz": true,
 "tnved": "6204430000",
 "techSize": "C",
 "color": "красный",
 "supplierBoxAmount": 10,
 "quantity": 10,
 "readyForSaleQuantity": 0,
 "unloadingQuantity": 0,
 "acceptedQuantity": 0
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="barcode"></a> `barcode?` | `string` | Баркод товара | [types/orders-fbw.types.ts:91](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L91) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/orders-fbw.types.ts:93](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L93) |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/orders-fbw.types.ts:95](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L95) |
| <a id="needkiz"></a> `needKiz?` | `boolean` | Нужен ли [код маркировки](https://честныйзнак.рф/) для этого товара: - `false` — не нужен - `true` — нужен | [types/orders-fbw.types.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L97) |
| <a id="tnved"></a> `tnved?` | `string` | Код ТНВЭД. <br> Если `"needKIZ":true`, а `"tnved":null`, нужно заполнить характеристику товара **ТН ВЭД** в [личном кабинете](https://seller.wildberries.ru/new-goods) или по [API](./work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post) | [types/orders-fbw.types.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L99) |
| <a id="techsize"></a> `techsize?` | `string` | Размер товара, указанный продавцом | [types/orders-fbw.types.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L101) |
| <a id="color"></a> `color?` | `string` | Цвет товара | [types/orders-fbw.types.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L103) |
| <a id="supplierboxamount"></a> `supplierBoxAmount?` | `number` | Указано в упаковке, шт | [types/orders-fbw.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L105) |
| <a id="quantity"></a> `quantity?` | `number` | Указано в поставке/заказе, шт | [types/orders-fbw.types.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L107) |
| <a id="readyforsalequantity"></a> `readyForSaleQuantity?` | `number` | Поступило в продажу, шт | [types/orders-fbw.types.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L109) |
| <a id="acceptedquantity"></a> `acceptedQuantity?` | `number` | Принято, шт | [types/orders-fbw.types.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L111) |
| <a id="unloadingquantity"></a> `unloadingQuantity?` | `number` | Количество товара на раскладке, шт | [types/orders-fbw.types.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L113) |

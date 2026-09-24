[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsDiscrepancyResponseItem

# Interface: ModelsDiscrepancyResponseItem

Defined in: [types/orders-fbw.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L279)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="declaredsku"></a> `declaredSku` | `string` | Артикул WB, заявленный при создании поставки | [types/orders-fbw.types.ts:281](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L281) |
| <a id="discrepancytype"></a> `discrepancyType` | `"surplus"` \| `"shortage"` \| `"re-sorting"` | Общий тип расхождения для короба: - `surplus` — фактически доставлено больше товара, чем заявлено - `shortage` — фактически доставлено меньше товара, чем заявлено - `re-sorting` — артикул принятого товара не совпадает с заявленным при создании поставки | [types/orders-fbw.types.ts:288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L288) |
| <a id="declaredamount"></a> `declaredAmount` | `number` | Количество товара, заявленное при создании поставки, шт | [types/orders-fbw.types.ts:290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L290) |
| <a id="actualamount"></a> `actualAmount` | `number` | Фактическое количество товара, шт | [types/orders-fbw.types.ts:292](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L292) |
| <a id="discrepancyquantity"></a> `discrepancyQuantity` | `number` | Разница между заявленным и фактическим количеством товара, шт | [types/orders-fbw.types.ts:294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L294) |
| <a id="actualsku"></a> `actualSku` | `string` | Фактический артикул WB | [types/orders-fbw.types.ts:296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L296) |
| <a id="skuscans"></a> `skuScans` | [`ModelsItemScans`](ModelsItemScans.md)[] \| `null` | Результаты сканирования товара. `null`, если сканов нет | [types/orders-fbw.types.ts:298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L298) |

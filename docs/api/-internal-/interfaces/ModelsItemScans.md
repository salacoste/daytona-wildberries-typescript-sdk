[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsItemScans

# Interface: ModelsItemScans

Defined in: [types/orders-fbw.types.ts:301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L301)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="scanid"></a> `scanId` | `number` | Идентификатор скана | [types/orders-fbw.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L303) |
| <a id="declaredsku"></a> `declaredSku` | `string` | Артикул WB, заявленный при создании поставки | [types/orders-fbw.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L305) |
| <a id="scantime"></a> `scanTime` | `string` | Дата и время сканирования | [types/orders-fbw.types.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L307) |
| <a id="discrepancylabel"></a> `discrepancyLabel` | `"surplus"` \| `"shortage"` \| `"re-sorting"` | Тип расхождения: - `surplus` — фактически доставлено больше товара, чем заявлено - `shortage` — фактически доставлено меньше товара, чем заявлено - `re-sorting` — артикул принятого товара не совпадает с заявленным при создании поставки | [types/orders-fbw.types.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L314) |
| <a id="actualsku"></a> `actualSku` | `string` | Фактический артикул WB | [types/orders-fbw.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L316) |

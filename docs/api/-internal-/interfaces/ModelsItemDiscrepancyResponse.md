[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsItemDiscrepancyResponse

# Interface: ModelsItemDiscrepancyResponse

Defined in: [types/orders-fbw.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L266)

## Example

```json
[
 {
   "packageCode": "WB_2282893992",
   "videoUrl": "",
   "videoStartsAt": "2026-07-11T10:02:42Z",
   "videoUnavailable": false,
   "items": [
     {
       "declaredSku": "1234567890",
       "discrepancyType": "surplus",
       "declaredAmount": 1,
       "actualAmount": 2,
       "discrepancyQuantity": 2,
       "actualSku": "1234567890",
       "skuScans": [
         {
           "scanId": 1,
           "declaredSku": "1234567890",
           "scanTime": "2025-01-18T21:11:54+03:00",
           "discrepancyLabel": "surplus",
           "actualSku": "1234567890"
         }
       ]
     }
   ]
 }
]
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="packagecode"></a> `packageCode` | `string` | Идентификатор упаковки | [types/orders-fbw.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L268) |
| <a id="videourl"></a> `videoUrl` | `string` | Видео расхождений при приёмке | [types/orders-fbw.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L270) |
| <a id="videostartsat"></a> `videoStartsAt` | `string` | Дата и время записи видео расхождений при приёмке | [types/orders-fbw.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L272) |
| <a id="videounavailable"></a> `videoUnavailable` | `boolean` | Доступно ли видео: - `false` — да - `true` — нет | [types/orders-fbw.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L274) |
| <a id="items"></a> `items` | [`ModelsDiscrepancyResponseItem`](ModelsDiscrepancyResponseItem.md)[] | Товары поставки | [types/orders-fbw.types.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L276) |

[Wildberries API TypeScript SDK](../modules.md) / WbReturn

# Interface: WbReturn

Defined in: utils/enrichReturnsWithType.ts:13

Unified return record across FBO and FBS sources.

Constructed by `enrichReturnsWithType()` from raw WB API responses.
Adds `orderType` (FBO vs FBS) and `reasonCode` (standardized enum) which are
not directly available from any single WB endpoint.

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB (numeric) | utils/enrichReturnsWithType.ts:15 |
| <a id="orderid"></a> `orderId` | `number` | ID заказа | utils/enrichReturnsWithType.ts:17 |
| <a id="returndate"></a> `returnDate` | `string` | Дата возврата (ISO 8601) — completedDt for FBO, lastChangeDate for FBS | utils/enrichReturnsWithType.ts:19 |
| <a id="reason"></a> `reason` | `string` | Свободно-текстовая причина возврата | utils/enrichReturnsWithType.ts:21 |
| <a id="reasoncode"></a> `reasonCode` | [`ReturnReasonCode`](../type-aliases/ReturnReasonCode.md) | Стандартизированный код причины (классификатор) | utils/enrichReturnsWithType.ts:23 |
| <a id="warehousename"></a> `warehouseName?` | `string` | Адрес/имя склада (если доступно) | utils/enrichReturnsWithType.ts:25 |
| <a id="ordertype"></a> `orderType` | `"fbo"` \| `"fbs"` | Тип заказа — derived from data source | utils/enrichReturnsWithType.ts:27 |
| <a id="quantity"></a> `quantity` | `number` | Количество (по умолчанию 1 — каждая запись = одна единица) | utils/enrichReturnsWithType.ts:29 |

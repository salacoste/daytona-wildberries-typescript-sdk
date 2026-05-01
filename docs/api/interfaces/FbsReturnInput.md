[Wildberries API TypeScript SDK](../modules.md) / FbsReturnInput

# Interface: FbsReturnInput

Defined in: utils/enrichReturnsWithType.ts:39

Minimal FBS return shape — what consumers should pass for FBS returns.
The actual FBS return data comes from order status history; consumers shape it
into this minimal record before calling enrichReturnsWithType().

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | - | utils/enrichReturnsWithType.ts:40 |
| <a id="orderid"></a> `orderId?` | `number` | - | utils/enrichReturnsWithType.ts:41 |
| <a id="lastchangedate"></a> `lastChangeDate?` | `string` | Дата изменения статуса на возврат | utils/enrichReturnsWithType.ts:43 |
| <a id="reason"></a> `reason?` | `string` | Причина возврата | utils/enrichReturnsWithType.ts:45 |
| <a id="warehousename"></a> `warehouseName?` | `string` | Имя склада | utils/enrichReturnsWithType.ts:47 |
| <a id="quantity"></a> `quantity?` | `number` | Количество (по умолчанию 1) | utils/enrichReturnsWithType.ts:49 |

[Wildberries API TypeScript SDK](../modules.md) / WbReturn

# Interface: WbReturn

Defined in: [utils/enrichReturnsWithType.ts:13](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L13)

Unified return record across FBO and FBS sources.

Constructed by `enrichReturnsWithType()` from raw WB API responses.
Adds `orderType` (FBO vs FBS) and `reasonCode` (standardized enum) which are
not directly available from any single WB endpoint.

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB (numeric) | [utils/enrichReturnsWithType.ts:15](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L15) |
| <a id="orderid"></a> `orderId` | `number` | ID заказа | [utils/enrichReturnsWithType.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L17) |
| <a id="returndate"></a> `returnDate` | `string` | Дата возврата (ISO 8601) — completedDt for FBO, lastChangeDate for FBS | [utils/enrichReturnsWithType.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L19) |
| <a id="reason"></a> `reason` | `string` | Свободно-текстовая причина возврата | [utils/enrichReturnsWithType.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L21) |
| <a id="reasoncode"></a> `reasonCode` | [`ReturnReasonCode`](../type-aliases/ReturnReasonCode.md) | Стандартизированный код причины (классификатор) | [utils/enrichReturnsWithType.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L23) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Адрес/имя склада (если доступно) | [utils/enrichReturnsWithType.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L25) |
| <a id="ordertype"></a> `orderType` | `"fbo"` \| `"fbs"` | Тип заказа — derived from data source | [utils/enrichReturnsWithType.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L27) |
| <a id="quantity"></a> `quantity` | `number` | Количество (по умолчанию 1 — каждая запись = одна единица) | [utils/enrichReturnsWithType.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/enrichReturnsWithType.ts#L29) |

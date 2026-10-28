[Wildberries API TypeScript SDK](../modules.md) / WbReturn

# Interface: WbReturn

Defined in: [utils/enrichReturnsWithType.ts:12](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L12)

Unified return record across FBO and FBS sources.

Constructed by `enrichReturnsWithType()` from raw WB API responses.
Adds `orderType` (FBO vs FBS) and `reasonCode` (standardized enum) which are
not directly available from any single WB endpoint.

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Артикул WB (numeric) | [utils/enrichReturnsWithType.ts:14](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L14) |
| <a id="orderid"></a> `orderId` | `number` | ID заказа | [utils/enrichReturnsWithType.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L16) |
| <a id="returndate"></a> `returnDate` | `string` | Дата возврата (ISO 8601) — completedDt for FBO, lastChangeDate for FBS | [utils/enrichReturnsWithType.ts:18](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L18) |
| <a id="reason"></a> `reason` | `string` | Свободно-текстовая причина возврата | [utils/enrichReturnsWithType.ts:20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L20) |
| <a id="reasoncode"></a> `reasonCode` | [`ReturnReasonCode`](../type-aliases/ReturnReasonCode.md) | Стандартизированный код причины (классификатор) | [utils/enrichReturnsWithType.ts:22](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L22) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Адрес/имя склада (если доступно) | [utils/enrichReturnsWithType.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L24) |
| <a id="ordertype"></a> `orderType` | `"fbo"` \| `"fbs"` | Тип заказа — derived from data source | [utils/enrichReturnsWithType.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L26) |
| <a id="quantity"></a> `quantity` | `number` | Количество (по умолчанию 1 — каждая запись = одна единица) | [utils/enrichReturnsWithType.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L28) |

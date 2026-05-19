[Wildberries API TypeScript SDK](../modules.md) / FbsReturnInput

# Interface: FbsReturnInput

Defined in: [utils/enrichReturnsWithType.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/enrichReturnsWithType.ts#L39)

Minimal FBS return shape — what consumers should pass for FBS returns.
The actual FBS return data comes from order status history; consumers shape it
into this minimal record before calling enrichReturnsWithType().

## Since

v3.9.3

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | - | [utils/enrichReturnsWithType.ts:40](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/enrichReturnsWithType.ts#L40) |
| <a id="orderid"></a> `orderId?` | `number` | - | [utils/enrichReturnsWithType.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/enrichReturnsWithType.ts#L41) |
| <a id="lastchangedate"></a> `lastChangeDate?` | `string` | Дата изменения статуса на возврат | [utils/enrichReturnsWithType.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/enrichReturnsWithType.ts#L43) |
| <a id="reason"></a> `reason?` | `string` | Причина возврата | [utils/enrichReturnsWithType.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/enrichReturnsWithType.ts#L45) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Имя склада | [utils/enrichReturnsWithType.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/enrichReturnsWithType.ts#L47) |
| <a id="quantity"></a> `quantity?` | `number` | Количество (по умолчанию 1) | [utils/enrichReturnsWithType.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/utils/enrichReturnsWithType.ts#L49) |

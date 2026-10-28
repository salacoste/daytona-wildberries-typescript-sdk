[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FboReturnInput

# Interface: FboReturnInput

Defined in: [utils/enrichReturnsWithType.ts:60](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L60)

Minimal FBO return shape — what consumers should pass for FBO returns.
Structural type: satisfies both the legacy goods-return report items (removed
from the SDK in v5.0.0 — WB disabled the endpoint on 2026-10-26) and the
current `GoodsReturnV1Item` records from `getAnalyticsV1GoodsReturn().report`
(map `returnReason` → `reason` when feeding v1 data).

## Since

v5.0.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | - | [utils/enrichReturnsWithType.ts:61](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L61) |
| <a id="orderid"></a> `orderId?` | `number` | - | [utils/enrichReturnsWithType.ts:62](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L62) |
| <a id="completeddt"></a> `completedDt?` | `string` | Дата получения возврата продавцом (v1: completedDt) | [utils/enrichReturnsWithType.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L64) |
| <a id="readytoreturndt"></a> `readyToReturnDt?` | `string` | Дата готовности к возврату (v1: readyToReturnDt) | [utils/enrichReturnsWithType.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L66) |
| <a id="orderdt"></a> `orderDt?` | `string` | Дата заказа на возврат (v1: orderDt) | [utils/enrichReturnsWithType.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L68) |
| <a id="reason"></a> `reason?` | `string` | Причина возврата (v1: returnReason) | [utils/enrichReturnsWithType.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L70) |
| <a id="dstofficeaddress"></a> `dstOfficeAddress?` | `string` | Адрес ПВЗ назначения (v1: dstOfficeAddress) | [utils/enrichReturnsWithType.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/utils/enrichReturnsWithType.ts#L72) |

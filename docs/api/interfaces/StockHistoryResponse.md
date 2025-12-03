[Wildberries API TypeScript SDK](../modules.md) / StockHistoryResponse

# Interface: StockHistoryResponse

Defined in: [types/analytics.types.ts:534](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L534)

Stock history response with time-series summary

Provides complete historical stock data with aggregated metrics

## Extends

- [`ResponseError`](../-internal-/interfaces/ResponseError.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`error`](../-internal-/interfaces/ResponseError.md#error) | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`errorText`](../-internal-/interfaces/ResponseError.md#errortext) | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [`ResponseError`](../-internal-/interfaces/ResponseError.md).[`additionalErrors`](../-internal-/interfaces/ResponseError.md#additionalerrors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L173) |
| <a id="nmid"></a> `nmID` | `number` | Product article number | - | [types/analytics.types.ts:536](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L536) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Supplier vendor code | - | [types/analytics.types.ts:538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L538) |
| <a id="daterange"></a> `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for this history | - | [types/analytics.types.ts:540](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L540) |
| <a id="changes"></a> `changes` | [`StockHistoryEntry`](StockHistoryEntry.md)[] | Array of stock change entries (chronological order) | - | [types/analytics.types.ts:542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L542) |
| <a id="summary"></a> `summary` | \{ `totalSales`: `number`; `totalReturns`: `number`; `totalAdjustments`: `number`; `netChange`: `number`; `startingStock`: `number`; `endingStock`: `number`; `avgDailyVelocity`: `number`; \} | Aggregated summary statistics | - | [types/analytics.types.ts:544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L544) |
| `summary.totalSales` | `number` | Total stock changes due to sales | - | [types/analytics.types.ts:546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L546) |
| `summary.totalReturns` | `number` | Total stock increases from returns | - | [types/analytics.types.ts:548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L548) |
| `summary.totalAdjustments` | `number` | Total manual adjustments | - | [types/analytics.types.ts:550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L550) |
| `summary.netChange` | `number` | Net stock change over period | - | [types/analytics.types.ts:552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L552) |
| `summary.startingStock` | `number` | Starting stock level | - | [types/analytics.types.ts:554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L554) |
| `summary.endingStock` | `number` | Ending stock level | - | [types/analytics.types.ts:556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L556) |
| `summary.avgDailyVelocity` | `number` | Average daily stock velocity (units/day) | - | [types/analytics.types.ts:558](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L558) |

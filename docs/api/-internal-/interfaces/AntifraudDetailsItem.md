[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AntifraudDetailsItem

# Interface: AntifraudDetailsItem

Defined in: [types/reports.types.ts:492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L492)

Antifraud details report item (self-purchase deductions)

## See

EPIC 43 - Response type for getAnalyticsAntifraudDetails
OpenAPI schema: `SuccessTaskResponse` in `12-reports.yaml`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул Wildberries | [types/reports.types.ts:494](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L494) |
| <a id="sum"></a> `sum?` | `number` | Сумма заказа | [types/reports.types.ts:496](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L496) |
| <a id="currency"></a> `currency?` | `string` | Валюта | [types/reports.types.ts:498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L498) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала отчёта | [types/reports.types.ts:500](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L500) |
| <a id="dateto"></a> `dateTo?` | `string` | Дата окончания отчёта | [types/reports.types.ts:502](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L502) |

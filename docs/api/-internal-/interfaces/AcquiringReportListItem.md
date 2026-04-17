[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportListItem

# Interface: AcquiringReportListItem

Defined in: [types/finances.types.ts:677](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L677)

Item returned by `getAcquiringReportsList()` — metadata for a single acquiring report.
All money sums are `string` (not number) — use `parseMoneyAmount()` helper for math.

**Available only to Russian sellers.**

## Since

v3.7.0

## See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringList](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringList)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта об издержках на приём платежей | [types/finances.types.ts:679](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L679) |
| <a id="sellerfinancename"></a> `sellerFinanceName?` | `string` | Название продавца (юрлицо/ИП) | [types/finances.types.ts:681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L681) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала отчётного периода | [types/finances.types.ts:683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L683) |
| <a id="dateto"></a> `dateTo?` | `string` | Дата конца отчётного периода | [types/finances.types.ts:685](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L685) |
| <a id="createdate"></a> `createDate?` | `string` | Дата формирования отчёта | [types/finances.types.ts:687](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L687) |
| <a id="currency"></a> `currency?` | `string` | Валюта (e.g., "RUB") | [types/finances.types.ts:689](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L689) |
| <a id="acquiringfeesum"></a> `acquiringFeeSum?` | `string` | Суммарная комиссия за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:691](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L691) |
| <a id="acquiringfeevatsum"></a> `acquiringFeeVatSum?` | `string` | НДС с комиссии за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:693](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L693) |

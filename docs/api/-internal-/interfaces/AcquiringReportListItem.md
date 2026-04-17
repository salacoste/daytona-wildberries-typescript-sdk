[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportListItem

# Interface: AcquiringReportListItem

Defined in: [types/finances.types.ts:698](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L698)

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
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта об издержках на приём платежей | [types/finances.types.ts:700](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L700) |
| <a id="sellerfinancename"></a> `sellerFinanceName?` | `string` | Название продавца (юрлицо/ИП) | [types/finances.types.ts:702](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L702) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала отчётного периода | [types/finances.types.ts:704](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L704) |
| <a id="dateto"></a> `dateTo?` | `string` | Дата конца отчётного периода | [types/finances.types.ts:706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L706) |
| <a id="createdate"></a> `createDate?` | `string` | Дата формирования отчёта | [types/finances.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L708) |
| <a id="currency"></a> `currency?` | `string` | Валюта (e.g., "RUB") | [types/finances.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L710) |
| <a id="acquiringfeesum"></a> `acquiringFeeSum?` | `string` | Суммарная комиссия за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L712) |
| <a id="acquiringfeevatsum"></a> `acquiringFeeVatSum?` | `string` | НДС с комиссии за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:714](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/finances.types.ts#L714) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportListItem

# Interface: AcquiringReportListItem

Defined in: [types/finances.types.ts:463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L463)

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
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта об издержках на приём платежей | [types/finances.types.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L465) |
| <a id="sellerfinancename"></a> `sellerFinanceName?` | `string` | Название продавца (юрлицо/ИП) | [types/finances.types.ts:467](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L467) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала отчётного периода | [types/finances.types.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L469) |
| <a id="dateto"></a> `dateTo?` | `string` | Дата конца отчётного периода | [types/finances.types.ts:471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L471) |
| <a id="createdate"></a> `createDate?` | `string` | Дата формирования отчёта | [types/finances.types.ts:473](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L473) |
| <a id="currency"></a> `currency?` | `string` | Валюта (e.g., "RUB") | [types/finances.types.ts:475](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L475) |
| <a id="acquiringfeesum"></a> `acquiringFeeSum?` | `string` | Суммарная комиссия за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:477](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L477) |
| <a id="acquiringfeevatsum"></a> `acquiringFeeVatSum?` | `string` | НДС с комиссии за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:479](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L479) |

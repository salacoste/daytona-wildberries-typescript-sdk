[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportListItem

# Interface: SalesReportListItem

Defined in: [types/finances.types.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L381)

Item returned by `getSalesReportsList()` — metadata for a single sales report.
All money amounts are `string` (not number) to preserve precision. Use `parseMoneyAmount()` helper for math.

## Since

v3.7.0

## See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта реализации. **BigInt precision note**: For daily reports, this value may exceed `Number.MAX_SAFE_INTEGER` (2^53). If you plan to pass this ID to `getSalesReportsDetailedByReportId()` for daily reports, consider using a BigInt-aware JSON parser on this response — the default JSON.parse will silently truncate precision. For typical weekly reports, `number` is safe. | [types/finances.types.ts:390](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L390) |
| <a id="sellerfinancename"></a> `sellerFinanceName?` | `string` | Название продавца (юрлицо/ИП) | [types/finances.types.ts:392](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L392) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала отчётного периода | [types/finances.types.ts:394](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L394) |
| <a id="dateto"></a> `dateTo?` | `string` | Дата конца отчётного периода | [types/finances.types.ts:396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L396) |
| <a id="createdate"></a> `createDate?` | `string` | Дата формирования отчёта | [types/finances.types.ts:398](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L398) |
| <a id="currency"></a> `currency?` | `string` | Валюта (e.g., "RUB") | [types/finances.types.ts:400](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L400) |
| <a id="reporttype"></a> `reportType?` | `number` | Тип отчёта: 1 — стандартный, 2/3/4 — уведомления о выкупе | [types/finances.types.ts:402](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L402) |
| <a id="retailamountsum"></a> `retailAmountSum?` | `string` | Сумма розничных цен (string — use parseMoneyAmount) | [types/finances.types.ts:404](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L404) |
| <a id="forpaysum"></a> `forPaySum?` | `string` | К перечислению продавцу (string — use parseMoneyAmount) | [types/finances.types.ts:406](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L406) |
| <a id="avgsalepercent"></a> `avgSalePercent?` | `number` | Средний % согласованной скидки | [types/finances.types.ts:408](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L408) |
| <a id="deliveryservicesum"></a> `deliveryServiceSum?` | `string` | Сумма услуг доставки (string) | [types/finances.types.ts:410](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L410) |
| <a id="paidstoragesum"></a> `paidStorageSum?` | `string` | Сумма платного хранения (string) | [types/finances.types.ts:412](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L412) |
| <a id="paidacceptancesum"></a> `paidAcceptanceSum?` | `string` | Сумма платной приёмки (string) | [types/finances.types.ts:414](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L414) |
| <a id="deductionsum"></a> `deductionSum?` | `string` | Сумма удержаний (string) | [types/finances.types.ts:416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L416) |
| <a id="penaltysum"></a> `penaltySum?` | `string` | Сумма штрафов (string) | [types/finances.types.ts:418](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L418) |
| <a id="additionalpaymentsum"></a> `additionalPaymentSum?` | `string` | Сумма корректировок ВВ (string) | [types/finances.types.ts:420](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L420) |
| <a id="cashbackamountsum"></a> `cashbackAmountSum?` | `string` | Сумма начисленного кэшбэка (string) | [types/finances.types.ts:422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L422) |
| <a id="cashbackdiscountsum"></a> `cashbackDiscountSum?` | `string` | Сумма компенсаций скидки по программе лояльности (string) | [types/finances.types.ts:424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L424) |
| <a id="cashbackcommissionchangesum"></a> `cashbackCommissionChangeSum?` | `string` | Стоимость участия в программе лояльности (string) | [types/finances.types.ts:426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L426) |
| <a id="paymentschedule"></a> `paymentSchedule?` | `string` | Разовое изменение срока перечисления (string) | [types/finances.types.ts:428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L428) |
| <a id="bankpaymentsum"></a> `bankPaymentSum?` | `string` | Сумма банковского платежа (string) | [types/finances.types.ts:430](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/finances.types.ts#L430) |

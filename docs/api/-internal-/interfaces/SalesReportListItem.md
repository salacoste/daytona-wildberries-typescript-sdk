[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportListItem

# Interface: SalesReportListItem

Defined in: [types/finances.types.ts:138](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L138)

Item returned by `getSalesReportsList()` — metadata for a single sales report.
All money amounts are `string` (not number) to preserve precision. Use `parseMoneyAmount()` helper for math.

## Since

v3.7.0

## See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта реализации. **BigInt precision note**: For daily reports, this value may exceed `Number.MAX_SAFE_INTEGER` (2^53). If you plan to pass this ID to `getSalesReportsDetailedByReportId()` for daily reports, consider using a BigInt-aware JSON parser on this response — the default JSON.parse will silently truncate precision. For typical weekly reports, `number` is safe. | [types/finances.types.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L147) |
| <a id="sellerfinancename"></a> `sellerFinanceName?` | `string` | Название продавца (юрлицо/ИП) | [types/finances.types.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L149) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Дата начала отчётного периода | [types/finances.types.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L151) |
| <a id="dateto"></a> `dateTo?` | `string` | Дата конца отчётного периода | [types/finances.types.ts:153](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L153) |
| <a id="createdate"></a> `createDate?` | `string` | Дата формирования отчёта | [types/finances.types.ts:155](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L155) |
| <a id="currency"></a> `currency?` | `string` | Валюта (e.g., "RUB") | [types/finances.types.ts:157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L157) |
| <a id="reporttype"></a> `reportType?` | `1` \| `2` \| `3` | Тип отчёта: 1 — стандартный, 2 — уведомление о выкупе, 3 — уведомление о выкупе для Грузии | [types/finances.types.ts:159](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L159) |
| <a id="retailamountsum"></a> `retailAmountSum?` | `string` | Сумма розничных цен (string — use parseMoneyAmount) | [types/finances.types.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L161) |
| <a id="forpaysum"></a> `forPaySum?` | `string` | К перечислению продавцу (string — use parseMoneyAmount) | [types/finances.types.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L163) |
| <a id="avgsalepercent"></a> `avgSalePercent?` | `number` | Средний % согласованной скидки | [types/finances.types.ts:165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L165) |
| <a id="deliveryservicesum"></a> `deliveryServiceSum?` | `string` | Сумма услуг доставки (string) | [types/finances.types.ts:167](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L167) |
| <a id="paidstoragesum"></a> `paidStorageSum?` | `string` | Сумма платного хранения (string) | [types/finances.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L169) |
| <a id="paidacceptancesum"></a> `paidAcceptanceSum?` | `string` | Сумма платной приёмки (string) | [types/finances.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L171) |
| <a id="deductionsum"></a> `deductionSum?` | `string` | Сумма удержаний (string) | [types/finances.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L173) |
| <a id="penaltysum"></a> `penaltySum?` | `string` | Сумма штрафов (string) | [types/finances.types.ts:175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L175) |
| <a id="additionalpaymentsum"></a> `additionalPaymentSum?` | `string` | Сумма корректировок ВВ (string) | [types/finances.types.ts:177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L177) |
| <a id="cashbackamountsum"></a> `cashbackAmountSum?` | `string` | Сумма начисленного кэшбэка (string) | [types/finances.types.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L179) |
| <a id="cashbackdiscountsum"></a> `cashbackDiscountSum?` | `string` | Сумма компенсаций скидки по программе лояльности (string) | [types/finances.types.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L181) |
| <a id="cashbackcommissionchangesum"></a> `cashbackCommissionChangeSum?` | `string` | Стоимость участия в программе лояльности (string) | [types/finances.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L183) |
| <a id="paymentschedule"></a> `paymentSchedule?` | `string` | Разовое изменение срока перечисления (string) | [types/finances.types.ts:185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L185) |
| <a id="bankpaymentsum"></a> `bankPaymentSum?` | `string` | Сумма банковского платежа (string) | [types/finances.types.ts:187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L187) |

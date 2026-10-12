[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedItem

# Interface: AcquiringReportDetailedItem

Defined in: [types/finances.types.ts:493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L493)

Item returned by `getAcquiringReportsDetailed()` and `getAcquiringReportsDetailedByReportId()`.
Detailed row for acquiring (payment acquisition) fees.

Money fields (`retailAmount`, `acquiringFee`, `acquiringFeeVat`) are `string` — use `parseMoneyAmount()`.

**Available only to Russian sellers.**

## Since

v3.7.0

## See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailed](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailed)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки отчёта | [types/finances.types.ts:495](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L495) |
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта | [types/finances.types.ts:497](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L497) |
| <a id="acqdate"></a> `acqDate?` | `string` | Дата эквайринга | [types/finances.types.ts:499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L499) |
| <a id="acquiringbank"></a> `acquiringBank?` | `string` | Банк-эквайер (e.g., "Тинькофф") | [types/finances.types.ts:501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L501) |
| <a id="tin"></a> `tin?` | `string` | ИНН | [types/finances.types.ts:503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L503) |
| <a id="taxregistrationreasoncode"></a> `taxRegistrationReasonCode?` | `string` | КПП (код причины постановки на учёт) | [types/finances.types.ts:505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L505) |
| <a id="saledate"></a> `saleDate?` | `string` | Дата продажи | [types/finances.types.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L507) |
| <a id="srid"></a> `srid?` | `string` | Уникальный ID заказа | [types/finances.types.ts:509](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L509) |
| <a id="doctypename"></a> `docTypeName?` | `string` | Тип документа | [types/finances.types.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L511) |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/finances.types.ts:513](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L513) |
| <a id="retailamount"></a> `retailAmount?` | `string` | Вайлдберриз реализовал (string — use parseMoneyAmount) | [types/finances.types.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L515) |
| <a id="acquiringfee"></a> `acquiringFee?` | `string` | Комиссия за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:517](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L517) |
| <a id="acquiringfeevat"></a> `acquiringFeeVat?` | `string` | НДС с комиссии за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:519](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L519) |
| <a id="invoicenumber"></a> `invoiceNumber?` | `string` | Номер счёта-фактуры | [types/finances.types.ts:521](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L521) |
| <a id="invoicedate"></a> `invoiceDate?` | `string` | Дата счёта-фактуры | [types/finances.types.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L523) |
| <a id="shkid"></a> `shkId?` | `number` | Штрихкод | [types/finances.types.ts:525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L525) |
| <a id="currency"></a> `currency?` | `string` | Валюта | [types/finances.types.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/finances.types.ts#L527) |

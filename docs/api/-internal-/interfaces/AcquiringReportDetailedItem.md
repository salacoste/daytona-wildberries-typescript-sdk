[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedItem

# Interface: AcquiringReportDetailedItem

Defined in: [types/finances.types.ts:707](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L707)

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
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки отчёта | [types/finances.types.ts:709](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L709) |
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта | [types/finances.types.ts:711](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L711) |
| <a id="acqdate"></a> `acqDate?` | `string` | Дата эквайринга | [types/finances.types.ts:713](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L713) |
| <a id="acquiringbank"></a> `acquiringBank?` | `string` | Банк-эквайер (e.g., "Тинькофф") | [types/finances.types.ts:715](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L715) |
| <a id="tin"></a> `tin?` | `string` | ИНН | [types/finances.types.ts:717](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L717) |
| <a id="taxregistrationreasoncode"></a> `taxRegistrationReasonCode?` | `string` | КПП (код причины постановки на учёт) | [types/finances.types.ts:719](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L719) |
| <a id="saledate"></a> `saleDate?` | `string` | Дата продажи | [types/finances.types.ts:721](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L721) |
| <a id="srid"></a> `srid?` | `string` | Уникальный ID заказа | [types/finances.types.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L723) |
| <a id="doctypename"></a> `docTypeName?` | `string` | Тип документа | [types/finances.types.ts:725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L725) |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/finances.types.ts:727](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L727) |
| <a id="retailamount"></a> `retailAmount?` | `string` | Вайлдберриз реализовал (string — use parseMoneyAmount) | [types/finances.types.ts:729](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L729) |
| <a id="acquiringfee"></a> `acquiringFee?` | `string` | Комиссия за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:731](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L731) |
| <a id="acquiringfeevat"></a> `acquiringFeeVat?` | `string` | НДС с комиссии за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:733](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L733) |
| <a id="invoicenumber"></a> `invoiceNumber?` | `string` | Номер счёта-фактуры | [types/finances.types.ts:735](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L735) |
| <a id="invoicedate"></a> `invoiceDate?` | `string` | Дата счёта-фактуры | [types/finances.types.ts:737](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L737) |
| <a id="shkid"></a> `shkId?` | `number` | Штрихкод | [types/finances.types.ts:739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L739) |
| <a id="currency"></a> `currency?` | `string` | Валюта | [types/finances.types.ts:741](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L741) |

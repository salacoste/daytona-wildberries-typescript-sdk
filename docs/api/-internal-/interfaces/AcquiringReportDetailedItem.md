[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedItem

# Interface: AcquiringReportDetailedItem

Defined in: [types/finances.types.ts:728](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L728)

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
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки отчёта | [types/finances.types.ts:730](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L730) |
| <a id="reportid"></a> `reportId?` | `number` | Номер отчёта | [types/finances.types.ts:732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L732) |
| <a id="acqdate"></a> `acqDate?` | `string` | Дата эквайринга | [types/finances.types.ts:734](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L734) |
| <a id="acquiringbank"></a> `acquiringBank?` | `string` | Банк-эквайер (e.g., "Тинькофф") | [types/finances.types.ts:736](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L736) |
| <a id="tin"></a> `tin?` | `string` | ИНН | [types/finances.types.ts:738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L738) |
| <a id="taxregistrationreasoncode"></a> `taxRegistrationReasonCode?` | `string` | КПП (код причины постановки на учёт) | [types/finances.types.ts:740](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L740) |
| <a id="saledate"></a> `saleDate?` | `string` | Дата продажи | [types/finances.types.ts:742](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L742) |
| <a id="srid"></a> `srid?` | `string` | Уникальный ID заказа | [types/finances.types.ts:744](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L744) |
| <a id="doctypename"></a> `docTypeName?` | `string` | Тип документа | [types/finances.types.ts:746](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L746) |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/finances.types.ts:748](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L748) |
| <a id="retailamount"></a> `retailAmount?` | `string` | Вайлдберриз реализовал (string — use parseMoneyAmount) | [types/finances.types.ts:750](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L750) |
| <a id="acquiringfee"></a> `acquiringFee?` | `string` | Комиссия за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:752](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L752) |
| <a id="acquiringfeevat"></a> `acquiringFeeVat?` | `string` | НДС с комиссии за эквайринг (string — use parseMoneyAmount) | [types/finances.types.ts:754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L754) |
| <a id="invoicenumber"></a> `invoiceNumber?` | `string` | Номер счёта-фактуры | [types/finances.types.ts:756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L756) |
| <a id="invoicedate"></a> `invoiceDate?` | `string` | Дата счёта-фактуры | [types/finances.types.ts:758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L758) |
| <a id="shkid"></a> `shkId?` | `number` | Штрихкод | [types/finances.types.ts:760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L760) |
| <a id="currency"></a> `currency?` | `string` | Валюта | [types/finances.types.ts:762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/finances.types.ts#L762) |

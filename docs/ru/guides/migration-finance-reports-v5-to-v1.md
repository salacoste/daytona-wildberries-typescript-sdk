---
title: "Миграция API финансовых отчётов: snake_case → camelCase (WB API v5 → v1)"
description: Миграция с устаревшего getSupplierReportDetailByPeriod() (v5, отключается 15.07.2026) на getSalesReportsDetailed() (v1) — маппинг полей, строковые денежные суммы, примеры кода.
layout: doc
keywords:
  - wildberries SDK migration
  - snake_case to camelCase
  - v5 to v1 finance reports
  - getSupplierReportDetailByPeriod deprecation
  - getSalesReportsDetailed
  - parseMoneyAmount
  - подменные артикулы v1
  - acquiring reports
---

# Миграция API финансовых отчётов: snake_case → camelCase (WB API v5 → v1)

> ⚠️ **Жёсткий дедлайн: 15.07.2026.** Эндпоинт v5 `GET /api/v5/supplier/reportDetailByPeriod` будет отключён Wildberries в эту дату. Любой код, всё ещё вызывающий `sdk.finances.getSupplierReportDetailByPeriod()` после этой даты, перестанет работать в продакшене с ошибками HTTP 4xx/5xx.

**Аудитория**: Разработчики, использующие SDK v3.5 или новее и вызывающие `getSupplierReportDetailByPeriod()`.
**Ориентировочное время миграции**: 30 минут на каждое место вызова.
**Начиная с**: SDK v3.7.0

## Кратко

```typescript
// ❌ СТАРЫЙ (v5, устаревший, отключается 15.07.2026)
const rows = await sdk.finances.getSupplierReportDetailByPeriod({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});
const total = rows.reduce((s, r) => s + (r.ppvz_for_pay ?? 0), 0);  // number

// ✅ НОВЫЙ (v1, начиная с v3.7.0)
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});
const total = rows.reduce((s, r) => s + parseMoneyAmount(r.forPay), 0);  // number (парсится из строки)
```

## Найдите все устаревшие вызовы в вашем коде

Перед миграцией найдите все места вызовов:

```bash
grep -rn "getSupplierReportDetailByPeriod" src/
grep -rn "DetailReportItem" src/
```

Или с помощью ripgrep:

```bash
rg "getSupplierReportDetailByPeriod|DetailReportItem"
```

## Что изменилось (v5 → v1)

| Аспект | v5 (устаревший) | v1 (замена) |
|--------|-----------------|------------------|
| Метод | `getSupplierReportDetailByPeriod()` | `getSalesReportsDetailed()` |
| HTTP-метод | `GET` | `POST` |
| Домен | `statistics-api.wildberries.ru` | `finance-api.wildberries.ru` |
| Именование полей | `snake_case` (напр. `ppvz_for_pay`) | `camelCase` (напр. `forPay`) |
| Денежные суммы | `number` | **`string`** |
| Типы токенов | Все типы | **Только Personal/Service** (НЕ Basic/Test) |
| Выборочные поля | Не поддерживается | Новый параметр `fields: string[]` |
| Эндпоинт списка | Нет | Новый `getSalesReportsList()` |
| Эндпоинт по ID | Нет | Новый `getSalesReportsDetailedByReportId()` |

## Почему денежные суммы теперь `string`

В v5 денежные суммы были типа `number`. В v1 они стали `string`. **Это сделано намеренно согласно спецификации WB** — тип `number` в JavaScript (IEEE-754) теряет точность при суммах выше 2^53 (редко, но возможно в агрегированных итогах). Строковые значения сохраняют точность, возвращённую API.

Если вам нужны вычисления, используйте хелпер `parseMoneyAmount()`, который поставляется с SDK:

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const total = rows.reduce((sum, row) => sum + parseMoneyAmount(row.forPay), 0);
```

**Предупреждение о точности**: Для сумм с более чем 15 значащими цифрами (крайне редкий случай) используйте специализированную библиотеку для работы с десятичными числами, например `decimal.js` или `big.js`. Для всех типичных сумм продавца `parseMoneyAmount()` безопасен.

## Остерегайтесь багов конкатенации строк

Самая частая ошибка при миграции — неявная конкатенация строк:

```typescript
// ❌ НЕПРАВИЛЬНО — конкатенирует строки вместо сложения чисел!
const total = row.forPay + row.acquiringFee;
// "376.99" + "14.89" = "376.9914.89"  ← БАГ

// ✅ ПРАВИЛЬНО — сначала парсим, потом складываем
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
const total = parseMoneyAmount(row.forPay) + parseMoneyAmount(row.acquiringFee);
// 376.99 + 14.89 = 391.88
```

**Правило**: каждый раз, когда вы выполняете арифметику с денежными полями v1, оборачивайте их в `parseMoneyAmount()`.

## Таблица маппинга полей (поиск по старому или новому имени)

Каждая строка показывает имя v5 в snake_case и имя v1 в camelCase рядом — Ctrl+F по любому из них найдёт нужную строку.

### Денежные поля (тип изменён: `number` → `string`)

| v5 snake_case | v1 camelCase | Примечания |
|---|---|---|
| `retail_price` | `retailPrice` | было number, теперь string |
| `retail_amount` | `retailAmount` | было number, теперь string |
| `retail_price_withdisc_rub` | `retailPriceWithDisc` | переименовано + тип изменён |
| `delivery_rub` | `deliveryService` | переименовано + тип изменён |
| `supplier_promo` | `sellerPromo` | переименовано + тип изменён |
| `ppvz_sales_commission` | `ppvzSalesCommission` | было number, теперь string |
| `ppvz_for_pay` | `forPay` | **часто используемое поле** — переименовано + тип изменён |
| `ppvz_reward` | `ppvzReward` | было number, теперь string |
| `acquiring_fee` | `acquiringFee` | было number, теперь string |
| `ppvz_vw` | `vw` | переименовано + тип изменён |
| `ppvz_vw_nds` | `vwNds` | переименовано + тип изменён |
| `penalty` | `penalty` | тип изменён на string |
| `additional_payment` | `additionalPayment` | тип изменён на string |
| `rebill_logistic_cost` | `rebillLogisticCost` | тип изменён на string |
| `storage_fee` | `paidStorage` | **переименовано** + тип изменён |
| `deduction` | `deduction` | тип изменён на string |
| `acceptance` | `paidAcceptance` | **переименовано** + тип изменён |
| `installment_cofinancing_amount` | `installmentCofinancingAmount` | тип изменён на string |
| `cashback_amount` | `cashbackAmount` | тип изменён на string |
| `cashback_discount` | `cashbackDiscount` | тип изменён на string |
| `cashback_commission_change` | `cashbackCommissionChange` | тип изменён на string |
| `payment_schedule` | `paymentSchedule` | тип изменён на string |

### Поля идентификаторов (переименованы)

| v5 snake_case | v1 camelCase | Примечания |
|---|---|---|
| `realizationreport_id` | `reportId` | переименовано |
| `rrd_id` | `rrdId` | курсор пагинации |
| `gi_id` | `giId` | |
| `nm_id` | `nmId` | артикул WB |
| `shk_id` | `shkId` | |
| `assembly_id` | `orderId` | **переименовано в orderId** |
| `sa_name` | `vendorCode` | **часто используемое поле — переименовано** |
| `barcode` | `sku` | **переименовано** |
| `ts_name` | `techSize` | **переименовано** |
| `order_uid` | `orderUid` | |
| `srid` | `srid` | без изменений |
| `sticker_id` | `stickerId` | |
| `trbx_id` | `trbxId` | |

### Поля даты/времени (переименованы)

| v5 snake_case | v1 camelCase | Примечания |
|---|---|---|
| `date_from` | `dateFrom` | |
| `date_to` | `dateTo` | |
| `create_dt` | `createDate` | **переименовано** |
| `fix_tariff_date_from` | `fixTariffDateFrom` | |
| `fix_tariff_date_to` | `fixTariffDateTo` | |
| `order_dt` | `orderDt` | |
| `sale_dt` | `saleDt` | |
| `rr_dt` | `rrDate` | **переименовано** |

### Поля процентов/соотношений (по-прежнему `number`)

| v5 snake_case | v1 camelCase | Примечания |
|---|---|---|
| `sale_percent` | `salePercent` | |
| `commission_percent` | `commissionPercent` | |
| `dlv_prc` | `dlvPrc` | |
| `product_discount_for_report` | `productDiscountForReport` | |
| `ppvz_spp_prc` | `spp` | **переименовано** |
| `ppvz_kvw_prc_base` | `kvwBase` | **переименовано** |
| `ppvz_kvw_prc` | `kvw` | **переименовано** |
| `sup_rating_prc_up` | `supRatingUp` | переименовано |
| `is_kgvp_v2` | `isKgvpV2` | |
| `acquiring_percent` | `acquiringPercent` | |
| `wibes_wb_discount_percent` | `wibesDiscountPercent` | переименовано |
| `seller_promo_discount` | `sellerPromoDiscount` | |
| `loyalty_discount` | `loyaltyDiscount` | |
| `sale_price_promocode_discount_prc` | `salePricePromocodeDiscountPrc` | |
| `sale_price_affiliated_discount_prc` | `salePriceAffiliatedDiscountPrc` | начиная с v3.6.0 |
| `agency_vat` | `agencyVat` | семантика не документирована WB |
| `sale_price_wholesale_discount_prc` | `salePriceWholesaleDiscountPrc` | начиная с v3.6.0 |

### Строковые поля (тип не изменился)

| v5 snake_case | v1 camelCase | Примечания |
|---|---|---|
| `currency_name` | `currency` | **переименовано** |
| `subject_name` | `subjectName` | |
| `brand_name` | `brandName` | |
| `doc_type_name` | `docTypeName` | |
| `office_name` | `officeName` | |
| `supplier_oper_name` | `sellerOperName` | переименовано |
| `ppvz_office_name` | `ppvzOfficeName` | |
| `ppvz_supplier_name` | `ppvzSupplierName` | |
| `ppvz_inn` | `ppvzSupplierInn` | переименовано |
| `acquiring_bank` | `acquiringBank` | |
| `payment_processing` | `paymentProcessing` | |
| `declaration_number` | `declarationNumber` | |
| `bonus_type_name` | `bonusTypeName` | |
| `site_country` | `country` | **переименовано** |
| `delivery_method` | `deliveryMethod` | |
| `rebill_logistic_org` | `rebillLogisticOrg` | |
| `gi_box_type_name` | `giBoxTypeName` | |
| `uuid_promocode` | `uuidPromocode` | |
| `kiz` | `kiz` | без изменений |
| `article_substitution` | `articleSubstitution` | начиная с v3.6.0 |

### Булевы поля (без изменений)

| v5 snake_case | v1 camelCase | Примечания |
|---|---|---|
| `srv_dbs` | `srvDbs` | |
| `is_legal_entity` | `isB2b` | **переименовано** |

### Целочисленные поля / поля ID (по-прежнему `number`)

| v5 snake_case | v1 camelCase | Примечания |
|---|---|---|
| `report_type` | `reportType` | перечисление 1-4 |
| `quantity` | `quantity` | без изменений |
| `delivery_amount` | `deliveryAmount` | |
| `return_amount` | `returnAmount` | |
| `ppvz_office_id` | `ppvzOfficeId` | |
| `seller_promo_id` | `sellerPromoId` | |
| `loyalty_id` | `loyaltyId` | |

### Новые поля в v1 (нет аналога в v5)

| Поле | Тип | Примечания |
|---|---|---|
| `title` | string | Название товара — НОВОЕ |

## Поэтапная миграция с использованием объединённого типа

Если в вашей кодовой базе метод отчёта вызывается во многих местах, можно мигрировать поэтапно, используя объединённый тип (union type) на время перехода:

```typescript
import type {
  DetailReportItem,         // v5 (устаревший)
  SalesReportDetailedItem,  // v1
} from 'daytona-wildberries-typescript-sdk/finances';

// Объединённый тип для вспомогательных функций, которым нужно принимать любую форму
type AnyDetailReport = DetailReportItem | SalesReportDetailedItem;

function logReport(row: AnyDetailReport): void {
  // ВНИМАНИЕ: у этих типов почти НЕТ совпадающих имён свойств.
  // Используйте дискриминантные проверки или мигрируйте каждое место вызова отдельно.
  if ('forPay' in row) {
    // форма v1
    console.log(`Выплата: ${row.forPay}`);
  } else {
    // форма v5
    console.log(`Выплата: ${row.ppvz_for_pay}`);
  }
}
```

**Ограничение**: поскольку v5 и v1 используют совершенно разные имена полей, объединённый тип мало полезен для доступа к свойствам. Он в основном служит миграционной заглушкой для сигнатур функций на время перехода. Предпочтительнее мигрировать каждое место вызова «чисто».

## Примеры миграции кода

### Пример 1: Простой список и сумма (самый частый паттерн)

**До (v5):**
```typescript
const rows = await sdk.finances.getSupplierReportDetailByPeriod({
  dateFrom: '2026-03-01',
  dateTo: '2026-03-31',
});

const totalPayout = rows.reduce((sum, r) => sum + (r.ppvz_for_pay ?? 0), 0);
console.log(`Итого: ${totalPayout.toFixed(2)} руб`);
```

**После (v1):**
```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-03-01',
  dateTo: '2026-03-31',
});

const totalPayout = rows.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);
console.log(`Итого: ${totalPayout.toFixed(2)} руб`);
```

### Пример 2: Фильтрация по подменному артикулу (поле v3.6.0)

**До (v5):**
```typescript
const campaignRows = rows.filter(
  (r) => r.article_substitution && r.article_substitution !== ''
);
const campaignRevenue = campaignRows.reduce((s, r) => s + (r.retail_amount ?? 0), 0);
```

**После (v1):**
```typescript
const campaignRows = rows.filter(
  (r) => r.articleSubstitution && r.articleSubstitution !== ''
);
const campaignRevenue = campaignRows.reduce(
  (s, r) => s + parseMoneyAmount(r.retailAmount), 0
);
```

### Пример 3: Постраничная загрузка за весь период

**До (v5):**
```typescript
let allRows: DetailReportItem[] = [];
let rrdid = 0;
while (true) {
  const page = await sdk.finances.getSupplierReportDetailByPeriod({
    dateFrom, dateTo, rrdid, limit: 100000,
  });
  if (page.length === 0) break;
  allRows = allRows.concat(page);
  rrdid = page[page.length - 1].rrd_id ?? 0;
}
```

**После (v1):**
```typescript
let allRows: SalesReportDetailedItem[] = [];
let rrdId = 0;
while (true) {
  const page = await sdk.finances.getSalesReportsDetailed({
    dateFrom, dateTo, rrdId, limit: 100000,
  });
  if (page.length === 0) break;
  allRows = allRows.concat(page);
  rrdId = page[page.length - 1].rrdId ?? 0;
}
```

## Новое в v1: эндпоинт списка + эндпоинт по ID отчёта

### `getSalesReportsList()` — список всех отчётов за период

```typescript
const reports = await sdk.finances.getSalesReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  period: 'weekly',
});

for (const r of reports) {
  console.log(`Отчёт ${r.reportId}: ${r.dateFrom} по ${r.dateTo}`);
  console.log(`  Итого к выплате: ${parseMoneyAmount(r.forPaySum)}`);
  console.log(`  Итого штрафов: ${parseMoneyAmount(r.penaltySum)}`);
}
```

### `getSalesReportsDetailedByReportId()` — детали конкретного отчёта

```typescript
// Типичный вариант использования
const rows = await sdk.finances.getSalesReportsDetailedByReportId(307401554);

// С выборочной загрузкой полей (быстрее, меньше трафика)
const rows = await sdk.finances.getSalesReportsDetailedByReportId(307401554, {
  fields: ['rrdId', 'nmId', 'forPay', 'retailAmount'],
});
```

### Точность BigInt для ежедневных отчётов

Для ежедневных отчётов значение `reportId` может превышать `Number.MAX_SAFE_INTEGER` (2^53). Метод принимает `number | bigint | string`:

```typescript
// Безопасно для BigInt в ежедневных отчётах
const rows = await sdk.finances.getSalesReportsDetailedByReportId(
  '9007199254740993',  // строка сохраняет точность
  { fields: ['rrdId', 'forPay'] }
);
```

## Отчёты по эквайрингу (новое в v1)

Полностью новая группа эндпоинтов для отслеживания стоимости эквайринга платежей. **Доступно только для российских продавцов**, токены только Personal/Service.

```typescript
// Список отчётов по эквайрингу
const reports = await sdk.finances.getAcquiringReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});

// Детали за период
const rows = await sdk.finances.getAcquiringReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  fields: ['rrdId', 'acquiringBank', 'acquiringFee'],
});

// Сумма комиссий
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
const totalFees = rows.reduce(
  (s, r) => s + parseMoneyAmount(r.acquiringFee), 0
);
```

## Отчёты по эквайрингу только для РФ

Эндпоинты эквайринга (`getAcquiringReports*`) **доступны только для российских продавцов**. Если вы работаете в нескольких регионах (например, как оператор платформы), разделяйте логику по географии:

```typescript
async function fetchAcquiring(sdk: WildberriesSDK, isRussianSeller: boolean) {
  if (!isRussianSeller) {
    return []; // Пропускаем для продавцов не из РФ
  }
  return await sdk.finances.getAcquiringReportsDetailed({ dateFrom, dateTo });
}
```

## Требования к типу токена

Все эндпоинты финансовых отчётов v1 требуют токен типа **Personal** или **Service**. Токены Basic и Test вернут ошибку 401/403.

```typescript
// ✅ Работает
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_PERSONAL_TOKEN,
  tokenType: 'personal',
});

// ❌ 401/403 на эндпоинтах v1
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_BASIC_TOKEN,
  tokenType: 'basic',
});
```

Если вы используете токены Basic/Test, вам потребуется запросить токен Personal или Service у Wildberries до 15.07.2026.

## Чеклист миграции

- [ ] Выполнить `grep -rn "getSupplierReportDetailByPeriod" src/` для поиска всех мест вызова
- [ ] Выполнить `grep -rn "DetailReportItem" src/` для поиска всех ссылок на типы
- [ ] Убедиться, что ваш API-токен имеет тип Personal или Service (не Basic/Test)
- [ ] Обновить до SDK v3.7.0+: `npm install daytona-wildberries-typescript-sdk@latest`
- [ ] Импортировать хелпер `parseMoneyAmount` в местах, где выполняются вычисления с деньгами
- [ ] Заменить каждое место вызова на `getSalesReportsDetailed()` + поля в camelCase
- [ ] Обернуть все чтения денежных полей в `parseMoneyAmount()`
- [ ] Проверить `rrd_id` → `rrdId` везде (частое переименование)
- [ ] Проверить `ppvz_for_pay` → `forPay` везде (частое переименование)
- [ ] Проверить на баги конкатенации строк (денежные поля теперь строки)
- [ ] Обновить юнит-тесты
- [ ] Задеплоить **до 15.07.2026**

## Как узнать вашу версию SDK

```bash
npm ls daytona-wildberries-typescript-sdk
# Ожидается: daytona-wildberries-typescript-sdk@3.7.0 или выше
```

Или в коде:

```typescript
import { version } from 'daytona-wildberries-typescript-sdk';
console.log(version); // "3.7.0" или выше
```

Если у вас версия v3.6.x или ниже, **обновитесь немедленно** — в этих версиях НЕТ методов-замен v1.

## Связанные материалы

- [Документация API — Отчёты о продажах v1](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty)
- [Документация API — Отчёты о продажах v5 (устаревшие)](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get)
- [Руководство по отслеживанию рекламных каналов с помощью подменных артикулов](/guides/tracking-promotion-channels-with-substitute-articles) — обновлено с упоминанием методов v1

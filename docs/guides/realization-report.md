# Realization Report Guide

Руководство по получению отчёта о реализации (детализированный отчёт продавца) через Wildberries SDK.

## Overview

Отчёт о реализации — основной источник данных о продажах, возвратах, комиссиях и удержаниях. Содержит детализацию по каждой операции.

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить отчёт за неделю
const report = await sdk.finances.getSupplierReportdetailbyperiod({
  dateFrom: '2024-12-01',
  dateTo: '2024-12-07'
});

console.log(`Всего записей: ${report.length}`);
```

---

## Метод API

### `getSupplierReportdetailbyperiod(params)`

**Модуль:** `sdk.finances`

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `dateFrom` | string | Да | Начало периода (YYYY-MM-DD) |
| `dateTo` | string | Да | Конец периода (YYYY-MM-DD) |
| `limit` | number | Нет | Лимит записей (default: 100000) |
| `rrdid` | number | Нет | ID для пагинации |

**Rate Limit:** 1 запрос в минуту

---

## Структура ответа

```typescript
interface RealizationReportItem {
  realizationreport_id: number;    // ID отчёта о реализации
  date_from: string;               // Начало периода отчёта
  date_to: string;                 // Конец периода отчёта
  create_dt: string;               // Дата формирования отчёта
  currency_name: string;           // Валюта (RUB)
  suppliercontract_code: string;   // Код договора
  rrd_id: number;                  // ID строки (для пагинации)
  gi_id: number;                   // Номер поставки
  subject_name: string;            // Предмет
  nm_id: number;                   // Артикул WB
  brand_name: string;              // Бренд
  sa_name: string;                 // Артикул продавца
  ts_name: string;                 // Размер
  barcode: string;                 // Баркод
  doc_type_name: string;           // Тип документа
  quantity: number;                // Количество
  retail_price: number;            // Цена розничная
  retail_amount: number;           // Сумма продаж (возвратов)
  sale_percent: number;            // Согласованная скидка
  commission_percent: number;      // Процент комиссии
  office_name: string;             // Склад
  supplier_oper_name: string;      // Обоснование для оплаты
  order_dt: string;                // Дата заказа
  sale_dt: string;                 // Дата продажи
  rr_dt: string;                   // Дата операции
  shk_id: number;                  // ШК
  retail_price_withdisc_rub: number; // Цена со скидкой
  delivery_amount: number;         // Стоимость логистики
  return_amount: number;           // Сумма возврата
  delivery_rub: number;            // Стоимость логистики, руб
  gi_box_type_name: string;        // Тип коробки
  product_discount_for_report: number; // Скидка постоянного покупателя
  supplier_promo: number;          // Промокод продавца
  rid: number;                     // Уникальный ID
  ppvz_spp_prc: number;            // Скидка WB
  ppvz_kvw_prc_base: number;       // Размер кВВ без НДС
  ppvz_kvw_prc: number;            // Размер кВВ, %
  sup_rating_prc_up: number;       // Надбавка за рейтинг
  is_kgvp_v2: number;              // Признак КГТ
  ppvz_sales_commission: number;   // Удержания с продаж
  ppvz_for_pay: number;            // К перечислению продавцу
  ppvz_reward: number;             // Возмещение издержек по эквайрингу
  acquiring_fee: number;           // Эквайринг
  acquiring_percent: number;       // Процент эквайринга
  acquiring_bank: string;          // Банк эквайринг
  ppvz_vw: number;                 // Вознаграждение WB
  ppvz_vw_nds: number;             // НДС с вознаграждения WB
  ppvz_office_id: number;          // ID офиса
  ppvz_office_name: string;        // Название офиса
  ppvz_supplier_id: number;        // ID продавца
  ppvz_supplier_name: string;      // Название продавца
  ppvz_inn: string;                // ИНН продавца
  declaration_number: string;      // Номер декларации
  bonus_type_name: string;         // Тип бонуса
  sticker_id: string;              // ID стикера
  site_country: string;            // Страна
  penalty: number;                 // Штрафы
  additional_payment: number;      // Доплаты
  rebill_logistic_cost: number;    // Возмещение логистики
  rebill_logistic_org: string;     // Организация возмещения
  kiz: string;                     // КИЗ
  storage_fee: number;             // Хранение
  deduction: number;               // Прочие удержания
  acceptance: number;              // Приёмка
  srid: string;                    // Уникальный ID позиции заказа
  report_type: number;             // Тип отчёта
}
```

---

## Примеры использования

### 1. Базовый отчёт за период

```typescript
async function getRealizationReport(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
) {
  const report = await sdk.finances.getSupplierReportdetailbyperiod({
    dateFrom,
    dateTo
  });

  console.log(`Период: ${dateFrom} - ${dateTo}`);
  console.log(`Всего записей: ${report.length}`);

  return report;
}

// Использование
const report = await getRealizationReport(sdk, '2024-12-01', '2024-12-07');
```

### 2. Получение полного отчёта с пагинацией

```typescript
async function getFullRealizationReport(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<RealizationReportItem[]> {
  const allItems: RealizationReportItem[] = [];
  let rrdid = 0;
  let hasMore = true;

  while (hasMore) {
    const items = await sdk.finances.getSupplierReportdetailbyperiod({
      dateFrom,
      dateTo,
      limit: 100000,
      rrdid
    });

    if (items.length === 0) {
      hasMore = false;
    } else {
      allItems.push(...items);
      rrdid = items[items.length - 1].rrd_id;

      console.log(`Загружено: ${allItems.length} записей`);

      // Rate limit: 1 req/min
      if (items.length === 100000) {
        console.log('Ожидание 60 сек (rate limit)...');
        await new Promise(r => setTimeout(r, 61000));
      }
    }
  }

  return allItems;
}
```

### 3. Анализ продаж по типам операций

```typescript
interface SalesAnalysis {
  sales: number;           // Продажи
  returns: number;         // Возвраты
  logistics: number;       // Логистика
  storage: number;         // Хранение
  commission: number;      // Комиссия
  penalties: number;       // Штрафы
  netAmount: number;       // Итого к выплате
}

async function analyzeSales(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<SalesAnalysis> {
  const report = await getFullRealizationReport(sdk, dateFrom, dateTo);

  const analysis: SalesAnalysis = {
    sales: 0,
    returns: 0,
    logistics: 0,
    storage: 0,
    commission: 0,
    penalties: 0,
    netAmount: 0
  };

  for (const item of report) {
    const operName = item.supplier_oper_name?.toLowerCase() || '';

    if (operName.includes('продажа')) {
      analysis.sales += item.ppvz_for_pay || 0;
    } else if (operName.includes('возврат')) {
      analysis.returns += Math.abs(item.ppvz_for_pay || 0);
    } else if (operName.includes('логистик')) {
      analysis.logistics += Math.abs(item.delivery_rub || 0);
    } else if (operName.includes('хранени')) {
      analysis.storage += item.storage_fee || 0;
    }

    analysis.commission += item.ppvz_sales_commission || 0;
    analysis.penalties += item.penalty || 0;
    analysis.netAmount += item.ppvz_for_pay || 0;
  }

  return analysis;
}

// Использование
const analysis = await analyzeSales(sdk, '2024-12-01', '2024-12-07');

console.log('=== Анализ продаж ===');
console.log(`Продажи:    ${analysis.sales.toFixed(2)} ₽`);
console.log(`Возвраты:   ${analysis.returns.toFixed(2)} ₽`);
console.log(`Логистика:  ${analysis.logistics.toFixed(2)} ₽`);
console.log(`Хранение:   ${analysis.storage.toFixed(2)} ₽`);
console.log(`Комиссия:   ${analysis.commission.toFixed(2)} ₽`);
console.log(`Штрафы:     ${analysis.penalties.toFixed(2)} ₽`);
console.log(`К выплате:  ${analysis.netAmount.toFixed(2)} ₽`);
```

### 4. Отчёт по товарам

```typescript
interface ProductSalesReport {
  nmId: number;
  subjectName: string;
  brandName: string;
  quantity: number;
  salesAmount: number;
  returnsAmount: number;
  netAmount: number;
}

async function getProductSalesReport(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<ProductSalesReport[]> {
  const report = await getFullRealizationReport(sdk, dateFrom, dateTo);

  const productMap = new Map<number, ProductSalesReport>();

  for (const item of report) {
    if (!item.nm_id || item.nm_id === 0) continue;

    let product = productMap.get(item.nm_id);
    if (!product) {
      product = {
        nmId: item.nm_id,
        subjectName: item.subject_name || '',
        brandName: item.brand_name || '',
        quantity: 0,
        salesAmount: 0,
        returnsAmount: 0,
        netAmount: 0
      };
      productMap.set(item.nm_id, product);
    }

    const qty = item.quantity || 0;
    const amount = item.ppvz_for_pay || 0;

    if (qty > 0) {
      product.quantity += qty;
      product.salesAmount += amount;
    } else {
      product.returnsAmount += Math.abs(amount);
    }
    product.netAmount += amount;
  }

  return Array.from(productMap.values())
    .sort((a, b) => b.netAmount - a.netAmount);
}

// Использование
const productReport = await getProductSalesReport(sdk, '2024-12-01', '2024-12-07');

console.log('=== Топ-10 товаров по выручке ===');
productReport.slice(0, 10).forEach((p, i) => {
  console.log(`${i + 1}. nm_id=${p.nmId} | ${p.subjectName}`);
  console.log(`   Продано: ${p.quantity} шт | Выручка: ${p.netAmount.toFixed(2)} ₽`);
});
```

### 5. Ежедневная разбивка

```typescript
interface DailyReport {
  date: string;
  salesCount: number;
  salesAmount: number;
  returnsCount: number;
  returnsAmount: number;
  netAmount: number;
}

async function getDailyBreakdown(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<DailyReport[]> {
  const report = await getFullRealizationReport(sdk, dateFrom, dateTo);

  const dailyMap = new Map<string, DailyReport>();

  for (const item of report) {
    const date = item.rr_dt?.split('T')[0] || item.sale_dt?.split('T')[0];
    if (!date) continue;

    let daily = dailyMap.get(date);
    if (!daily) {
      daily = {
        date,
        salesCount: 0,
        salesAmount: 0,
        returnsCount: 0,
        returnsAmount: 0,
        netAmount: 0
      };
      dailyMap.set(date, daily);
    }

    const qty = item.quantity || 0;
    const amount = item.ppvz_for_pay || 0;

    if (qty > 0) {
      daily.salesCount += qty;
      daily.salesAmount += amount;
    } else if (qty < 0) {
      daily.returnsCount += Math.abs(qty);
      daily.returnsAmount += Math.abs(amount);
    }
    daily.netAmount += amount;
  }

  return Array.from(dailyMap.values())
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Использование
const dailyReport = await getDailyBreakdown(sdk, '2024-12-01', '2024-12-07');

console.log('=== Ежедневный отчёт ===');
console.log('Дата       | Продаж | Возвратов | Выручка');
console.log('-'.repeat(50));
dailyReport.forEach(day => {
  console.log(
    `${day.date} | ${day.salesCount.toString().padStart(6)} | ` +
    `${day.returnsCount.toString().padStart(9)} | ${day.netAmount.toFixed(2)} ₽`
  );
});
```

---

## Типы операций (supplier_oper_name)

| Значение | Описание |
|----------|----------|
| `Продажа` | Продажа товара покупателю |
| `Возврат` | Возврат товара покупателем |
| `Логистика` | Стоимость доставки |
| `Логистика сторно` | Возврат стоимости доставки |
| `Хранение` | Платное хранение |
| `Штраф` | Штрафные санкции |
| `Компенсация` | Компенсации от WB |
| `Частичная компенсация` | Частичная компенсация |

---

## Ключевые поля для финансов

| Поле | Описание | Знак |
|------|----------|------|
| `ppvz_for_pay` | К перечислению продавцу | ± |
| `ppvz_sales_commission` | Комиссия WB | - |
| `delivery_rub` | Стоимость логистики | - |
| `storage_fee` | Хранение | - |
| `penalty` | Штрафы | - |
| `additional_payment` | Доплаты | + |
| `retail_amount` | Сумма продажи (розница) | ± |

---

## Rate Limits и рекомендации

| Аспект | Рекомендация |
|--------|--------------|
| **Rate limit** | 1 запрос в минуту |
| **Пагинация** | Используйте `rrdid` из последней записи |
| **Размер периода** | До 365 дней за запрос |
| **Лимит записей** | max 100000 за запрос |
| **Задержка** | 61 сек между запросами при пагинации |

---

## Связанные материалы

- [Storage Fees Integration](./storage-fees-integration.md) - Сравнение с Paid Storage API
- [Financial Reports](../examples/use-cases/financial-reports.md) - Финансовые отчёты
- [API Reference: FinancesModule](/api/classes/FinancesModule)

---

[← Back to Guides](./index.md)

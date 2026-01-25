# Отчёт о реализации

Руководство по получению отчёта о реализации (детализированный отчёт продавца) через Wildberries SDK.

## Обзор

Отчёт о реализации — основной источник данных о продажах, возвратах, комиссиях и удержаниях. Содержит детализацию по каждой операции.

---

## Быстрый старт

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

---

## Анализ продаж по типам операций

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
  const report = await sdk.finances.getSupplierReportdetailbyperiod({
    dateFrom,
    dateTo
  });

  const analysis: SalesAnalysis = {
    sales: 0, returns: 0, logistics: 0, storage: 0,
    commission: 0, penalties: 0, netAmount: 0
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
```

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

- [Платное хранение](./storage-fees-integration) - Сравнение с Paid Storage API
- [Комиссии и сборы](./commissions-fees) - Тарифы и комиссии
- [API Reference: FinancesModule](/api/classes/FinancesModule)

---

[← Назад к руководствам](./index)

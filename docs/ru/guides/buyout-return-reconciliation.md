---
title: Сверка выкупов и возвратов
description: Единая аналитика по возвратам FBO/FBS и сверка с выкупами с помощью вспомогательных функций SDK (начиная с v3.9.3)
---

# Сверка выкупов и возвратов

Это руководство описывает три чистые вспомогательные функции, добавленные в **v3.9.3** для сверки возвратов и выкупов Wildberries в аналитических пайплайнах.

## Проблема

Wildberries не предоставляет единый эндпоинт со всеми данными, необходимыми для аналитики возвратов:
- `getAnalyticsGoodsReturn()` возвращает FBO-возвраты с причинами, но без поля `orderType`
- Возвраты FBS получаются из истории статусов `ordersFBS`
- Выкупы берутся из `getStocksReportProducts()` (отдельный API)
- Финансовая сверка находится в строках `getSalesReportsDetailed()`

SDK теперь предоставляет три чистые вспомогательные функции для объединения этих источников на стороне клиента.

## 1. Классификация причин возврата

WB возвращает причины возвратов в виде произвольных русскоязычных строк. Используйте `classifyReturnReason()` для маппинга на стабильный enum:

```typescript
import { classifyReturnReason } from 'daytona-wildberries-typescript-sdk';

classifyReturnReason('Брак товара');           // → 'defect'
classifyReturnReason('Не подошёл размер');     // → 'wrong_size'
classifyReturnReason('Повреждение упаковки');  // → 'damage'
classifyReturnReason('Неизвестная причина');   // → 'other'
```

Union-тип `ReturnReasonCode` охватывает 8 категорий: `damage`, `defect`, `wrong_size`, `wrong_item`, `customer_refused`, `expired`, `not_as_described`, `other`.

## 2. Обогащение возвратов полем orderType

```typescript
import { enrichReturnsWithType } from 'daytona-wildberries-typescript-sdk';
import type { WbReturn } from 'daytona-wildberries-typescript-sdk';

// Получить FBO-возвраты
const fbo = await sdk.reports.getAnalyticsGoodsReturn({
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
});

// Опционально: сформировать FBS-возвраты из истории статусов заказов
const fbsReturns = myFbsOrders
  .filter(o => o.status === 'returned')
  .map(o => ({
    nmId: o.nmId,
    orderId: o.id,
    lastChangeDate: o.lastChangeDate,
    reason: o.cancelReason,
    warehouseName: o.warehouseName,
  }));

const unified: WbReturn[] = enrichReturnsWithType(fbo.report ?? [], fbsReturns);

console.log(`Всего: ${unified.length}`);
console.log(`FBO: ${unified.filter(r => r.orderType === 'fbo').length}`);
console.log(`FBS: ${unified.filter(r => r.orderType === 'fbs').length}`);
```

Каждый `WbReturn` содержит: `nmId`, `orderId`, `returnDate`, `reason`, `reasonCode`, `warehouseName`, `orderType`, `quantity`. Записи с отсутствующими обязательными полями молча пропускаются. Результат отсортирован по `returnDate` в убывающем порядке.

## 3. Сверка выкупов и возвратов

```typescript
import { reconcileBuyoutsAndReturns } from 'daytona-wildberries-typescript-sdk';
import type { BuyoutInput, ReconciliationResult } from 'daytona-wildberries-typescript-sdk';

// Сформировать данные о выкупах из отчёта по остаткам
const buyouts: BuyoutInput[] = stocksReport.map(p => ({
  nmId: p.nmId,
  buyoutCount: p.buyoutCount,
  buyoutRevenue: p.buyoutRevenue,
}));

const summary: ReconciliationResult[] = reconcileBuyoutsAndReturns(buyouts, unified);

for (const r of summary) {
  console.log(`nmId=${r.nmId}: выкупов=${r.buyoutCount}, возвратов=${r.returnCount} (FBO ${r.fboReturnCount} / FBS ${r.fbsReturnCount})`);
  if (r.anomalies.length > 0) {
    console.warn('  Аномалии:', r.anomalies.map(a => a.details).join('; '));
  }
}
```

### Типы аномалий

Инструмент сверки обнаруживает три класса проблем:

| Тип | Условие срабатывания | Действие |
|-----|----------------------|----------|
| `return_without_buyout` | Возвратов больше, чем выкупов (или возвраты при нулевых выкупах) | Требует проверки — возможно, отсутствуют данные о выкупах или фрод |
| `orphan_buyout` | Выкупы без возвратов (только при `strictTemporalAlignment: true`) | Информационное |
| `return_quantity_mismatch` | Зарезервировано для будущего использования | — |

## Сквозной пример

```typescript
import {
  classifyReturnReason,
  enrichReturnsWithType,
  reconcileBuyoutsAndReturns,
} from 'daytona-wildberries-typescript-sdk';

async function buildReturnsDashboard(sdk: WildberriesSDK, dateFrom: string, dateTo: string) {
  // 1. Параллельно получить все источники данных
  const [fbo, stocks /* , fbsOrders */] = await Promise.all([
    sdk.reports.getAnalyticsGoodsReturn({ dateFrom, dateTo }),
    sdk.analytics.getStocksReportProducts({ /* ... */ }),
    // sdk.ordersFBS.getOrders({ dateFrom: epochSeconds(dateFrom) }),
  ]);

  // 2. Объединить возвраты
  const returns = enrichReturnsWithType(fbo.report ?? [], /* сформированные FBS-возвраты */ []);

  // 3. Построить сводку по каждому nmId
  const summary = reconcileBuyoutsAndReturns(
    stocks.products.map(p => ({ nmId: p.nmId, buyoutCount: p.buyoutCount })),
    returns,
  );

  // 4. Выделить аномалии
  const flagged = summary.filter(r => r.anomalies.length > 0);
  return { summary, flagged };
}
```

## Почему чистые вспомогательные функции?

Эти функции не выполняют сетевых запросов. Они принимают уже полученные данные и преобразуют/классифицируют их. Это означает:

- Легко тестировать изолированно
- Не расходуют лимиты запросов API
- Легко встраиваются в собственный аналитический пайплайн
- Можно использовать офлайн (например, для повторной обработки исторических данных)

## Связанные руководства

- [Модуль возвратов (v3.10.0)](/ru/guides/returns-module) — высокоуровневый агрегатор (`sdk.returns`), который вызывает `classifyReturnReason()` внутри и объединяет источники FBO, FBS и Finance в единый массив `ReturnItem[]`. Используйте, когда нужен единый источник данных без ручного объединения.
- [Обязательные характеристики товаров](/ru/guides/mandatory-product-characteristics) — обновления типов v3.9.0/3.9.2
- [WB API: Отчёт о возвратах товаров](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Otchyot-o-vozvratah-i-peremeshchenii-tovarov)

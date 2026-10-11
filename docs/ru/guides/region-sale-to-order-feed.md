---
title: Миграция отчёта по регионам на Ленту заказов
description: Переход с устаревшего регионального отчёта на корректную группировку Ленты заказов до 03.11.2026.
layout: doc
---

# Миграция отчёта по регионам на Ленту заказов

Wildberries отключит `GET /api/v1/analytics/region-sale` **3 ноября 2026 года**. В SDK 4.x метод `sdk.reports.getAnalyticsRegionSale()` остаётся доступным для совместимости и один раз за процесс выводит предупреждение. Новые региональные выборки следует строить на `sdk.analytics.getOrderFeed()`.

Лента заказов возвращает отдельные события, а старый эндпоинт — готовые региональные агрегаты. По Ленте можно считать заказы по географии доставки, но она не является точной заменой полей `saleInvoiceCostPrice`, `saleInvoiceCostPricePerc` и `saleItemInvoiceQty`.

## Границы контракта

- Период не превышает 31 день и определяется датой **текущего статуса** заказа.
- В первом запросе `snapshotTime` отсутствует; во всех следующих страницах используется `data.snapshotTime` из первого ответа.
- Увеличивайте `offset`, не меняя период, фильтры, limit и snapshot.
- `destinationCity` и `destinationDistrict` задают географию доставки.
- Одна строка Ленты — один заказ, одно сборочное задание и одна единица товара. Отдельного поля quantity нет, поэтому каждая включённая строка даёт одну единицу.
- Учитывайте `status` явно. Для простого отчёта по выкупленным товарам оставляйте только `buyout`. Статусы `return` и `returnDefective` считайте отдельно, если бизнес-правила не задают другой расчёт.
- `sellerPrice` не учитывает скидки WB Клуба и оптовые скидки B2B. Это поле не доказано как эквивалент старой инвойсной стоимости или доли региона.

## Пагинация одного snapshot и группировка

```typescript
import type { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

type RegionCount = {
  destinationDistrict: string;
  destinationCity: string;
  purchasedItems: number;
};

async function getPurchasedItemsByRegion(
  sdk: WildberriesSDK,
  start: string,
  end: string
): Promise<RegionCount[]> {
  const limit = 10_000;
  const grouped = new Map<string, RegionCount>();
  let offset = 0;
  let snapshotTime: string | undefined;

  while (true) {
    const page = await sdk.analytics.getOrderFeed({
      selectedPeriod: { start, end },
      pagination: { offset, limit, snapshotTime },
    });

    snapshotTime ??= page.data.snapshotTime;

    for (const order of page.data.orders) {
      if (order.status !== 'buyout') continue;

      const key = `${order.destinationDistrict}\u0000${order.destinationCity}`;
      const current = grouped.get(key) ?? {
        destinationDistrict: order.destinationDistrict,
        destinationCity: order.destinationCity,
        purchasedItems: 0,
      };
      current.purchasedItems += 1;
      grouped.set(key, current);
    }

    if (page.data.orders.length < limit) break;
    const nextOffset = offset + page.data.orders.length;
    if (nextOffset <= offset) {
      throw new Error('Order Feed pagination did not advance');
    }
    offset = nextOffset;
  }

  return [...grouped.values()];
}
```

Пример сразу добавляет каждую страницу в агрегат, поэтому память растёт с числом регионов, а не заказов. Если ответ полной страницы не позволяет увеличить offset, пример завершится с ошибкой. При изменении периода или фильтра начинайте новый snapshot. Если страница завершилась ошибкой, повторите тот же offset с тем же `snapshotTime`: новый snapshot посреди прохода может дать пропуски или дубли при смене статусов.

## Что требует отдельного бизнес-правила

Пример считает только количество выкупленных единиц. Перед заменой рабочего отчёта определите обработку отмен, обычных и дефектных возвратов, B2B-строк и заказов, текущий статус которых вышел за выбранный период. Денежные расчёты держите отдельно и явно указывайте исходное поле. Опубликованный контракт не задаёт формулу, которая воспроизводит денежные показатели и доли старого регионального отчёта.

## Связанные материалы

- [Модуль Analytics: Лента заказов](/modules/analytics#getorderfeed---order-feed-new-wb-news-2026-09)
- [Модуль отчётов](/ru/guides/reports-module)
- [Официальная статья о Ленте заказов](https://dev.wildberries.ru/knowledge-base/articles/01a09d9e-4f79-7016-b641-0718252e6572/lenta-zakazov#prodazhi-po-regionam)

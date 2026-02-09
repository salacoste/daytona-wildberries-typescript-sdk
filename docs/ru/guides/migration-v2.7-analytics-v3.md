---
title: Миграция v2.7 - Analytics v3 API
description: Руководство по миграции на новый Analytics v3 API (воронка продаж)
---

# Миграция v2.7 - Analytics v3 API

::: tip Английская версия
Полная версия этого руководства доступна на английском языке:
[Migration v2.7 - Analytics v3](/guides/migration-v2.7-analytics-v3)
:::

## Обзор изменений

SDK v2.7.0 добавляет поддержку нового Analytics v3 API для воронки продаж.

### Новые методы

| Метод | Описание |
|-------|----------|
| `getSalesFunnelProducts()` | Получить статистику товаров |
| `getSalesFunnelProductsHistory()` | История по товарам за период |
| `getSalesFunnelGroupedHistory()` | Сгруппированная история |

### Пример использования

```typescript
const result = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  aggregationLevel: 'day',
});
```

## См. также

- [Analytics Module](/modules/analytics)
- [Full Migration Guide (English)](/guides/migration-v2.7-analytics-v3)

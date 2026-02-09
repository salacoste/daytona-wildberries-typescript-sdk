---
title: Миграция Type 8 → Type 9 кампаний
description: Руководство по переходу с Type 8 (unified bid) на Type 9 (manual bid) кампании
---

# Миграция Type 8 → Type 9 кампаний

::: warning Важный дедлайн
Wildberries отключает Type 8 эндпоинты **2 февраля 2026 года**. Выполните миграцию до этой даты.
:::

::: tip Английская версия
Полная версия этого руководства доступна на английском языке:
[Type 8 → Type 9 Migration Guide](/guides/migration-type8-to-type9)
:::

## Основные изменения

### 1. Изменение bid_type

| Тип кампании | Было | Стало |
|--------------|------|-------|
| Type 8 (unified) | `'unified'` | `'auto'` |
| Type 9 (manual) | `'manual'` | `'manual'` |

### 2. Ставки в копейках

```typescript
// Было (рубли)
bid: 15.50

// Стало (копейки)
bid_kopecks: 1550  // = 15.50 RUB
```

### 3. Новые методы

- `updateBids()` - обновление ставок
- `updateCampaignProducts()` - управление товарами в кампании
- `getMinusPhrases()` / `setMinusPhrases()` - минус-фразы
- `getSearchClusterStats()` - статистика кластеров

## См. также

- [Promotion Module](/modules/promotion)
- [Full Migration Guide (English)](/guides/migration-type8-to-type9)

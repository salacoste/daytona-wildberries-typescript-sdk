---
title: Руководство по статистике рекламы
description: Получение и анализ статистики рекламных кампаний
---

# Руководство по статистике рекламы

::: tip Английская версия
Полная версия этого руководства доступна на английском языке:
[Advertising Statistics Guide](/guides/advertising-statistics-guide)
:::

## Обзор

Модуль Promotion предоставляет методы для получения детальной статистики по рекламным кампаниям.

### Основные методы

| Метод | Описание |
|-------|----------|
| `getAdvFullstats()` | Полная статистика кампаний |
| `getStatsKeywords()` | Статистика по ключевым словам |
| `getSearchClusterStats()` | Статистика поисковых кластеров |

### Пример

```typescript
const stats = await sdk.promotion.getSearchClusterStats({
  from: '2026-02-01',
  to: '2026-02-09',
  items: [{ advert_id: 123456, nm_id: 789012 }]
});
```

## См. также

- [Promotion Module](/modules/promotion)
- [Full Guide (English)](/guides/advertising-statistics-guide)

---
title: Руководство по миграции v2.x → v3.0.0
description: Полное руководство по миграции с SDK v2.x на v3.0.0
---

# Руководство по миграции: v2.x → v3.0.0

## Обзор

v3.0.0 — мажорный релиз, в котором удалены все устаревшие методы. Это руководство поможет вам перенести код с SDK v2.x на v3.0.0.

**Хронология релизов**:
| Версия | Дата | Описание |
|--------|------|----------|
| v2.8.0 | Февраль 2026 | Добавлены предупреждения об устаревании |
| v2.9.0 | Март 2026 | Финальные предупреждения об устаревании |
| v3.0.0 | Апрель 2026 | Устаревшие методы удалены |

**Краткая статистика**:
- **62 метода** помечены как устаревшие в 9 модулях
- **14 типов** удалено
- Большинство имеют прямые замены 1:1
- Некоторые эндпоинты полностью удалены из API Wildberries

---

## Критические изменения по модулям

### Модуль Promotion (19 методов удалено)

Модуль promotion имеет наибольшее количество изменений из-за перехода Wildberries с кампаний "единой ставки" (тип 8) на кампании "ручной/единой ставки" (тип 9).

#### Управление кампаниями

| Удалённый метод | Альтернатива | Примечание |
|-----------------|--------------|------------|
| `getPromotionCount()` | `getAdvAdverts()` | GET /api/advert/v2/adverts |
| `createPromotionAdvert()` | `getAdvAdverts()` | Для получения информации о кампаниях |
| `getAuctionAdverts()` | Обновлённый API управления | Кампании типа 9 |
| `getAdvConfig()` | Обновлённый API конфигурации | |
| `getAdvStart()` | Обновлённый API управления | |
| `getAdvPause()` | Обновлённый API управления | |

#### Примеры миграции

```typescript
// До (v2.x) - Получить количество кампаний
const count = await sdk.promotion.getPromotionCount();

// После (v3.0.0) - Использовать список рекламных кампаний
const adverts = await sdk.promotion.getAdvAdverts();
const count = adverts.length;
```

```typescript
// До (v2.x) - Получить статистику кампании
const stats = await sdk.promotion.createAdvFullstat({
  date_from: '2026-01-01',
  date_to: '2026-01-31',
});

// После (v3.0.0) - Использовать новый эндпоинт статистики
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345,67890',
  beginDate: '2026-01-01',
  endDate: '2026-01-31',
});
```

---

### Модуль Orders DBS (13 методов удалено)

Модуль DBS (Доставка Продавцом) перешёл с эндпоинтов для одного заказа на массовые операции.

#### Операции с метаданными (удалены 13 апреля 2026)

| Удалённый метод | Альтернатива | Примечание |
|-----------------|--------------|------------|
| `getMeta(orderId)` | `getMetaBulk({ orders: [orderId] })` | Массовое получение |
| `deleteMeta(orderId, key)` | `deleteMetaBulk({ orders: [orderId], key })` | Массовое удаление |
| `setSgtin(orderId, sgtins)` | `setSgtinBulk({ orders: [{ orderId, sgtins }] })` | Массовая установка SGTIN |
| `setUin(orderId, uin)` | `setUinBulk({ orders: [{ orderId, uin }] })` | Массовая установка UIN |
| `setImei(orderId, imei)` | `setImeiBulk({ orders: [{ orderId, imei }] })` | Массовая установка IMEI |
| `setGtin(orderId, gtin)` | `setGtinBulk({ orders: [{ orderId, gtin }] })` | Массовая установка GTIN |

#### Операции со статусами (удалены 13 апреля 2026)

| Удалённый метод | Альтернатива | Примечание |
|-----------------|--------------|------------|
| `confirm(orderId)` | `confirmBulk([orderId])` | Массовое подтверждение |
| `deliver(orderId)` | `deliverBulk([orderId])` | Массовая доставка |
| `receive(orderId, code)` | `receiveBulk([{ orderId, code }])` | Массовое получение |
| `reject(orderId, code)` | `rejectBulk([{ orderId, code }])` | Массовый отказ |
| `cancel(orderId)` | `cancelBulk([orderId])` | Массовая отмена |

#### Примеры миграции

```typescript
// До (v2.x) - Установить SGTIN для одного заказа
await sdk.ordersDBS.setSgtin(123456, ['1234567890123456']);

// После (v3.0.0) - Использовать массовый метод
await sdk.ordersDBS.setSgtinBulk({
  orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }]
});
```

```typescript
// До (v2.x) - Подтвердить один заказ
await sdk.ordersDBS.confirm(123456);

// После (v3.0.0) - Использовать массовый метод
await sdk.ordersDBS.confirmBulk([123456]);
```

---

### Модуль Reports (10 методов удалено)

#### Методы статуса/загрузки задач (переименованы)

| Удалённый метод | Альтернатива | Примечание |
|-----------------|--------------|------------|
| `getTasksStatu(task_id)` | `getWarehouseRemainsTaskStatus(task_id)` | Отчёт об остатках |
| `getTasksDownload(task_id)` | `downloadWarehouseRemainsReport(task_id)` | Отчёт об остатках |
| `getTasksStatu2(task_id)` | `getAcceptanceReportTaskStatus(task_id)` | Отчёт о приёмке |
| `getTasksDownload2(task_id)` | `downloadAcceptanceReport(task_id)` | Отчёт о приёмке |
| `getTasksStatu3(task_id)` | `getPaidStorageTaskStatus(task_id)` | Отчёт о платном хранении |
| `getTasksDownload3(task_id)` | `downloadPaidStorageReport(task_id)` | Отчёт о платном хранении |

#### Примеры миграции

```typescript
// До (v2.x) - Проверить статус задачи
const status = await sdk.reports.getTasksStatu('task-uuid');

// После (v3.0.0) - Использовать понятное имя метода
const status = await sdk.reports.getWarehouseRemainsTaskStatus('task-uuid');
```

---

### Модуль Communications (6 методов удалено)

Все эндпоинты, связанные с шаблонами ответов, удалены из API Wildberries.

| Удалённый метод | Альтернатива | Примечание |
|-----------------|--------------|------------|
| `templates()` | Нет | Функция шаблонов прекращена |
| `createTemplate()` | Нет | Функция шаблонов прекращена |
| `updateTemplate()` | Нет | Функция шаблонов прекращена |
| `deleteTemplate()` | Нет | Функция шаблонов прекращена |

> ⚠️ Функция шаблонов ответов прекращена Wildberries. Прямой замены в API нет. Рекомендуем хранить шаблоны в собственной базе данных.

---

### Модуль Products (7 методов удалено)

| Удалённый метод | Альтернатива | Примечание |
|-----------------|--------------|------------|
| `createCardsList()` | `getCardsList()` | Исправлено имя метода |
| `createCardsTrash()` | `getTrashedCards()` | Исправлено имя метода |
| `createWarehous()` | `createWarehouse()` | Исправлена опечатка |
| `updateWarehous()` | `updateWarehouse()` | Исправлена опечатка |
| `deleteWarehous()` | `deleteWarehouse()` | Исправлена опечатка |

---

### Модуль Analytics (3 метода удалено)

Все эндпоинты v2 воронки продаж недоступны (возвращают 404). Используйте эндпоинты v3.

| Удалённый метод | Альтернатива | Примечание |
|-----------------|--------------|------------|
| `createNmReportDetail()` | `getSalesFunnelProducts()` | v2 → v3 |
| `createNmReportDetailHistory()` | `getSalesFunnelProductsHistory()` | v2 → v3 |
| `createNmReportGroupedHistory()` | `getSalesFunnelGroupedHistory()` | v2 → v3 |

---

## Удалённые типы

### Типы Orders DBS

| Удалённый тип | Альтернатива |
|---------------|--------------|
| `DBSOrderStatusLegacy` | `DBSOrderStatusBulk` |
| `GetStatusResponseLegacy` | `GetStatusInfoResponse` |

### Типы Analytics

| Удалённый тип | Альтернатива |
|---------------|--------------|
| `NmReportDetailRequest` | `SalesFunnelProductsRequest` |
| `NmReportDetailResponse` | `SalesFunnelProductsResponse` |

### Типы Communications

| Удалённый тип | Альтернатива |
|---------------|--------------|
| `ResponseTemplate` | Нет (функция прекращена) |
| `PostTemplate` | Нет (функция прекращена) |

---

## Поиск устаревших методов

Выполните эту команду для поиска устаревших методов в вашем коде:

```bash
# Поиск вызовов устаревших методов
grep -rn "getPromotionCount\|createAdvStart\|createAdvPause\|getMeta\|setSgtin\|getTasksStatu" src/
```

---

## Предупреждения об устаревании

В v2.x устаревшие методы выводят предупреждения в консоль:

```
[WB SDK] getPromotionCount() устарел. Используйте GET /api/advert/v2/adverts.
[WB SDK] setSgtin() устарел. Используйте setSgtinBulk().
[WB SDK] getTasksStatu() устарел. Используйте getWarehouseRemainsTaskStatus().
```

Эти предупреждения помогают найти код, требующий миграции перед обновлением до v3.0.0.

---

## FAQ

### В: Что делать, если нет замены для удалённого метода?

О: Некоторые методы удалены, потому что Wildberries прекратил поддержку соответствующего API эндпоинта:
- Проверьте [журнал изменений API Wildberries](https://dev.wildberries.ru/release-notes)
- Обратитесь в поддержку Wildberries за альтернативами
- Реализуйте обходные решения с использованием доступных эндпоинтов

### В: Как обрабатывать изменения в типах ответов?

О: Массовые методы часто возвращают немного другую структуру ответа. Проверьте TypeScript типы для нового формата:

```typescript
// Пример: Массовый ответ статуса включает дополнительную информацию об ошибках
const result = await sdk.ordersDBS.getStatusesBulk([123456]);
for (const order of result.orders ?? []) {
  if (order.errorCode) {
    console.error(`Заказ ${order.orderId}: ${order.errorMessage}`);
  }
}
```

---

## Нужна помощь?

- **Проблемы SDK**: [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- **Документация API**: [Портал разработчика Wildberries](https://dev.wildberries.ru/openapi)
- **Сообщество**: [Telegram-канал](https://t.me/wb_api_community)

---

**Последнее обновление:** 2026-02-07
**Версия SDK:** 3.0.0

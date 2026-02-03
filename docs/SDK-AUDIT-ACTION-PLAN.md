# SDK Audit Action Plan - Wildberries API TypeScript SDK

**Дата аудита:** 2025-12-02
**Версия SDK:** 2.0.2
**Аудитор:** Automated API Comparison Tests

---

## Краткое описание

Проведён полный аудит SDK против официальной API документации Wildberries. Сравнивались прямые вызовы API с вызовами через SDK. Результаты задокументированы в `comparison_docs/`.

### Общая статистика

| Метрика | Значение |
|---------|----------|
| Всего API модулей | 11 |
| Готово к продакшену | 6 (55%) |
| Требует доработки | 5 (45%) |
| Критических проблем | 3 фейковых URL + 3 неполных документа |
| Средних проблем | 23 метода без типизации |
| Документы требуют переработки | 3 (02, 08, 09) |

---

## Приоритет 1: КРИТИЧЕСКИЕ ПРОБЛЕМЫ

### 🔴 Analytics API - Фейковые URL (НЕ РАБОТАЮТ) -- RESOLVED in v2.7.0

> **v2.7.0 Update (EPIC 13)**: This section is largely resolved by the Analytics v3 migration. Fake URLs were removed and replaced with real v3 endpoints (`/api/analytics/v3/sales-funnel/*`). The old v2 methods are deprecated wrappers. See `docs/guides/migration-v2.7-analytics-v3.md`.

**Файлы:**
- SDK: `src/modules/analytics/index.ts`
- Типы: `src/types/analytics.types.ts`
- Аудит: `comparison_docs/11-analytics-api-comparison.md`
- API spec: `wildberries_api_doc/11-analytics.yaml`

**Проблема:** 3 метода используют URL которых НЕТ в официальном API:

```typescript
// ❌ УДАЛИТЬ или ПЕРЕПИСАТЬ эти методы:

// 1. getStockHistory() - строка ~XXX
// Использует: /api/v1/analytics/stock-history/{productId}
// Такого эндпоинта НЕТ в API!

// 2. exportAnalyticsCSV() - строка ~XXX
// Использует: /api/v1/analytics/export/csv
// Такого эндпоинта НЕТ в API!

// 3. getCSVReportStatus() - строка ~XXX
// Использует: /api/v1/analytics/export/csv/{reportId}
// Такого эндпоинта НЕТ в API!
```

**Действие:**
1. Удалить эти методы полностью, ИЛИ
2. Переписать используя реальные эндпоинты из API spec

---

### 🔴 Analytics API - 11 эндпоинтов не реализовано (31% покрытие) -- PARTIALLY RESOLVED in v2.7.0

> **v2.7.0 Update**: The v3 Sales Funnel endpoints (`getSalesFunnelProducts`, `getSalesFunnelProductsHistory`, `getSalesFunnelGroupedHistory`) are now implemented. Some v2 endpoints below may still be unimplemented for non-sales-funnel operations.

**Не реализованные эндпоинты (ВЫСОКИЙ приоритет):**

| Эндпоинт | Описание | Приоритет |
|----------|----------|-----------|
| `GET /api/v2/nm-report/downloads` | Список отчётов | HIGH |
| `GET /api/v2/search-report/product/search-texts` | Поисковые запросы товара | HIGH |
| `GET /api/v2/search-report/product/orders` | Заказы по запросам | HIGH |
| `GET /api/v2/stocks-report/products/products` | Остатки по товарам | HIGH |
| `GET /api/v2/stocks-report/offices` | Остатки по складам | HIGH |

**Не реализованные эндпоинты (СРЕДНИЙ приоритет):**

| Эндпоинт | Описание |
|----------|----------|
| `POST /api/v2/nm-report/grouped/history` | Групп. статистика по дням |
| `GET /api/v2/search-report/table/groups` | Пагинация групп |
| `GET /api/v2/search-report/table/details` | Пагинация деталей |
| `GET /api/v2/stocks-report/products/groups` | Остатки по группам |
| `GET /api/v2/stocks-report/products/sizes` | Остатки по размерам |
| `POST /api/v2/nm-report/downloads/retry` | Повтор генерации |

**Действие:** Реализовать недостающие методы согласно API спецификации.

---

### 🔴 Неполные comparison документы (требуют переработки)

**Проблема:** Документы 01-09 созданы в marketing стиле, не показывают реальное покрытие API.

#### 1. Products API (02-products-api-comparison.md)

| Метрика | Значение |
|---------|----------|
| API эндпоинтов | ~41 |
| SDK методов | 71 |
| Формат документа | Marketing (не comparison) |

**Проблемы SDK:**
- Много дубликатов методов
- Много методов возвращают `Promise<unknown>` вместо типизированных ответов
- Не ясно какие эндпоинты реализованы, какие нет

**Файлы:**
- SDK: `src/modules/products/index.ts`
- Типы: `src/types/products.types.ts`
- API spec: `wildberries_api_doc/02-products.yaml`

**Действие:** Переписать comparison документ в техническом формате (как 10-13).

---

#### 2. Promotion API (08-promotion-api-comparison.md)

| Метрика | Значение |
|---------|----------|
| API эндпоинтов | ~40 |
| SDK методов | ~30+ |
| Формат документа | Marketing (не comparison) |

**Проблемы:**
- API очень большой (рекламные кампании, промокоды, акции, автореклама)
- Документ покрывает только базовые функции
- Не показано какие эндпоинты не реализованы

**Файлы:**
- SDK: `src/modules/promotion/index.ts`
- Типы: `src/types/promotion.types.ts`
- API spec: `wildberries_api_doc/08-promotion.yaml`

**Действие:** Провести полный аудит и переписать документ.

---

#### 3. Communications API (09-communications-api-comparison.md)

| Метрика | Значение |
|---------|----------|
| API эндпоинтов | 21 |
| SDK методов | 25 |
| Формат документа | Marketing (не comparison) |

**Не покрытые API эндпоинты:**
- `/api/v1/claims` - Получение претензий
- `/api/v1/claim` - Работа с претензией
- `/api/v1/supplier-valuations` - Оценки поставщика
- `/api/v1/feedbacks/count` - Количество отзывов
- `/api/v1/feedbacks/count-unanswered` - Непрочитанные отзывы
- `/api/v1/feedbacks/actions` - Действия с отзывами
- `/api/v1/feedbacks/archive` - Архив отзывов
- `/api/v1/seller/download/{id}` - Скачивание файлов чата

**Файлы:**
- SDK: `src/modules/communications/index.ts`
- Типы: `src/types/communications.types.ts`
- API spec: `wildberries_api_doc/09-communications.yaml`

**Действие:** Провести полный аудит и переписать документ.

---

## Приоритет 2: СРЕДНИЕ ПРОБЛЕМЫ

### 🟡 Reports API - 12 методов без типизации обязательных параметров

**Файлы:**
- SDK: `src/modules/reports/index.ts`
- Типы: `src/types/reports.types.ts`
- Аудит: `comparison_docs/12-reports-api-comparison.md`
- API spec: `wildberries_api_doc/12-reports.yaml`

**Проблема:** Методы принимают `params?: Record<string, unknown>` вместо типизированных обязательных параметров. API возвращает 400 без них.

**Список методов для исправления:**

#### 1. `getWarehouseMeasurementsReport()`
```typescript
// БЫЛО:
async getWarehouseMeasurementsReport(params?: Record<string, unknown>): Promise<unknown[]>

// ДОЛЖНО БЫТЬ:
async getWarehouseMeasurementsReport(params: {
  dateFrom: string;  // RFC3339: 2025-02-01T15:00:00Z
  dateTo: string;    // RFC3339: 2025-10-11T18:00:00Z
  tab: 'penalty' | 'measurement';
  limit: number;
  skip?: number;
}): Promise<WarehouseMeasurementsResponse>
```

#### 2. `getIncorrectAttachmentsReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async getIncorrectAttachmentsReport(params: {
  dateFrom: string;  // YYYY-MM-DD
  dateTo: string;    // YYYY-MM-DD
}): Promise<IncorrectAttachment[]>
```

#### 3. `getGoodsLabelingReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async getGoodsLabelingReport(params: {
  dateFrom: string;  // YYYY-MM-DD
  dateTo: string;    // YYYY-MM-DD
}): Promise<GoodsLabelingItem[]>
```

#### 4. `getCharacteristicsChangeReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async getCharacteristicsChangeReport(params: {
  dateFrom: string;  // YYYY-MM-DD
  dateTo: string;    // YYYY-MM-DD
}): Promise<CharacteristicsChange[]>
```

#### 5. `requestAcceptanceReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async requestAcceptanceReport(params: {
  dateFrom: string;  // RFC3339
  dateTo: string;    // RFC3339
}): Promise<ReportTaskResponse>
```

#### 6. `requestPaidStorageReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async requestPaidStorageReport(params: {
  dateFrom: string;  // RFC3339
  dateTo: string;    // RFC3339
}): Promise<ReportTaskResponse>
```

#### 7. `getParentSubjectsForBrandShare()`
```typescript
// БЫЛО:
async getParentSubjectsForBrandShare(): Promise<unknown[]>

// ДОЛЖНО БЫТЬ:
async getParentSubjectsForBrandShare(brand: string): Promise<ParentSubject[]>
```

#### 8. `getBrandShareReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async getBrandShareReport(params: {
  parentId: number;
  brand: string;
}): Promise<BrandShareData>
```

#### 9. `getBlockedProductsReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async getBlockedProductsReport(params: {
  sort: 'nmId' | 'title' | 'vendorCode' | 'reason';
  order: 'asc' | 'desc';
  limit?: number;
  skip?: number;
}): Promise<BlockedProduct[]>
```

#### 10. `getShadowedProductsReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async getShadowedProductsReport(params: {
  sort: 'nmId' | 'title' | 'vendorCode' | 'nmRating';
  order: 'asc' | 'desc';
  limit?: number;
  skip?: number;
}): Promise<ShadowedProduct[]>
```

#### 11. `getGoodsReturnReport()`
```typescript
// ДОЛЖНО БЫТЬ:
async getGoodsReturnReport(params: {
  dateFrom: string;  // YYYY-MM-DD
  dateTo: string;    // YYYY-MM-DD
}): Promise<GoodsReturnItem[]>
```

#### 12. `getRegionalSalesReport()`
```typescript
// Требует проверки параметров в API spec
```

**Действие:**
1. Обновить сигнатуры методов с типизированными параметрами
2. Добавить недостающие типы в `src/types/reports.types.ts`
3. Добавить валидацию дат где требуется

---

## Приоритет 3: НИЗКИЕ ПРОБЛЕМЫ

### 🟢 Tariffs API - Отсутствует параметр locale

**Файлы:**
- SDK: `src/modules/tariffs/index.ts`
- Аудит: `comparison_docs/10-tariffs-api-comparison.md`

**Проблема:** Метод `getTariffsCommission()` не поддерживает параметр `locale`.

```typescript
// БЫЛО:
async getTariffsCommission(): Promise<Commission | ...>

// ДОЛЖНО БЫТЬ:
async getTariffsCommission(locale?: 'ru' | 'en' | 'zh'): Promise<Commission | ...>
```

**Действие:** Добавить опциональный параметр locale.

---

## Справочные материалы

### Файлы аудита (comparison_docs/)

| Модуль | Файл | Формат | SDK Статус | Действие |
|--------|------|--------|------------|----------|
| General | `01-general-api-comparison.md` | Marketing | 🟢 OK | - |
| Products | `02-products-api-comparison.md` | Marketing | 🔴 Неполный | Переписать документ |
| Orders FBS | `03-orders-fbs-api-comparison.md` | Marketing | 🟡 Частичный | Проверить |
| In-Store Pickup | `06-in-store-pickup-api-comparison.md` | Marketing | 🟢 OK | - |
| Orders FBW | `07-orders-fbw-api-comparison.md` | Marketing | 🟢 OK | - |
| Promotion | `08-promotion-api-comparison.md` | Marketing | 🔴 Неполный | Переписать документ |
| Communications | `09-communications-api-comparison.md` | Marketing | 🔴 Неполный | Переписать документ |
| Tariffs | `10-tariffs-api-comparison.md` | Технический ✅ | 🟢 Minor | Добавить locale |
| Analytics | `11-analytics-api-comparison.md` | Технический ✅ | 🔴 Critical | Удалить fake URL |
| Reports | `12-reports-api-comparison.md` | Технический ✅ | 🟡 Medium | Типизировать params |
| Finances | `13-finances-api-comparison.md` | Технический ✅ | 🟢 OK | - |

### Тестовые скрипты (comparison_docs/)

```bash
# Запуск тестов для конкретного модуля:
node comparison_docs/test-10-tariffs-api.cjs
node comparison_docs/test-11-analytics-api.cjs
node comparison_docs/test-12-reports-api.cjs
```

### API спецификации (wildberries_api_doc/)

Все OpenAPI 3.0.1 спецификации находятся в `wildberries_api_doc/`. Используй их как источник истины при реализации.

---

## Чеклист для разработчика

### Критические задачи (блокируют релиз):
- [x] Удалить/переписать `getStockHistory()` в analytics -- Resolved in v2.7.0 (EPIC 13 Analytics v3 migration)
- [x] Удалить/переписать `exportAnalyticsCSV()` в analytics -- Resolved in v2.7.0
- [x] Удалить/переписать `getCSVReportStatus()` в analytics -- Resolved in v2.7.0
- [x] Удалить/переписать `downloadCSVReport()` в analytics -- Resolved in v2.7.0

### Документация (требует переработки):
- [ ] Переписать `02-products-api-comparison.md` в техническом формате
- [ ] Переписать `08-promotion-api-comparison.md` в техническом формате
- [ ] Переписать `09-communications-api-comparison.md` в техническом формате
- [ ] Добавить недостающие эндпоинты в Communications (claims, valuations, archive)

### Средние задачи (улучшают качество):
- [ ] Реализовать 5 HIGH-priority эндпоинтов в Analytics
- [ ] Типизировать 12 методов в Reports
- [ ] Добавить типы ответов в `reports.types.ts`
- [ ] Убрать дубликаты методов в Products модуле
- [ ] Заменить `Promise<unknown>` на типизированные ответы в Products

### Низкие задачи (nice to have):
- [ ] Реализовать 6 MEDIUM-priority эндпоинтов в Analytics
- [ ] Добавить `locale` параметр в `getTariffsCommission()`
- [ ] Исправить `getSearchQueries()` (возвращает 405)

---

## Контакты

При вопросах по аудиту смотри детальные comparison документы в `comparison_docs/`.

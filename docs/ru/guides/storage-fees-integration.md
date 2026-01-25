# Интеграция сборов за хранение

Руководство по получению данных о платном хранении через Wildberries SDK и сверке с еженедельными отчётами.

## Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY });

// Получить детализацию платного хранения за период
const storageData = await getStorageFees(sdk, '2024-12-02', '2024-12-08');
```

---

## Два источника данных о хранении

### 1. Paid Storage API (Рекомендуется для детализации)

**Модуль:** `sdk.reports`

| Характеристика | Значение |
|----------------|----------|
| Детализация | По товару, складу, дню |
| Max период | **8 дней** за запрос |
| Ключевое поле | `warehousePrice` |
| Поля для Excel | Все поля совпадают |

### 2. Weekly Realization Report (Для сверки итогов)

**Модуль:** `sdk.finances`

| Характеристика | Значение |
|----------------|----------|
| Детализация | Агрегированные суммы по дням |
| Max период | ~365 дней |
| Ключевое поле | `storage_fee` |
| nm_id | Всегда `0` (без привязки к товару) |

---

## Реализация: Paid Storage API

### Типы

```typescript
interface PaidStorageItem {
  date: string;                    // Дата расчёта
  warehouse: string;               // Название склада
  warehouseCoef: number;           // Коэффициент склада
  nmId: number;                    // Артикул WB
  barcode: string;                 // Баркод
  subject: string;                 // Предмет (категория)
  brand: string;                   // Бренд
  vendorCode: string;              // Артикул продавца
  volume: number;                  // Объём товара (л)
  warehousePrice: number;          // Сумма хранения, рублей
  barcodesCount: number;           // Количество единиц
}
```

### Функция получения данных

```typescript
async function fetchStorageChunk(
  sdk: WildberriesSDK,
  dateFrom: string,
  dateTo: string
): Promise<PaidStorageItem[]> {
  // Шаг 1: Создать задание
  const task = await sdk.reports.paidStorage({ dateFrom, dateTo });
  const taskId = task.data.taskId;

  // Шаг 2: Ожидать выполнения
  let status = 'processing';
  while (status !== 'done') {
    await delay(5000);
    const statusResponse = await sdk.reports.getTasksStatu3(taskId);
    status = statusResponse.data.status;

    if (status === 'canceled' || status === 'purged') {
      throw new Error(`Task ${taskId} failed: ${status}`);
    }
  }

  // Шаг 3: Скачать отчёт
  return sdk.reports.getTasksDownload3(taskId);
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
```

---

## Rate Limits

| Метод | Лимит | Рекомендация |
|-------|-------|--------------|
| `paidStorage()` | 1 req/min | Создавать задания последовательно |
| `getTasksStatu3()` | 1 req/5sec | Поллинг каждые 5 сек |
| `getTasksDownload3()` | 1 req/min | — |
| `getSupplierReportdetailbyperiod()` | 1 req/min | Пагинация через `rrdid` |

---

## Важные замечания

1. **Paid Storage API ограничен 8 днями** — для недельного периода достаточно одного запроса, для месяца нужно ~4 запроса.

2. **Weekly Report агрегирует хранение** — поле `storage_fee` содержит суммы по дням без привязки к товарам (`nm_id = 0`).

3. **Разница в копейках нормальна** — округление на стороне WB даёт расхождение ~0.01%.

4. **Категория отсутствует в API** — только `subject` (Предмет). Если нужна категория, потребуется маппинг через справочник категорий.

5. **Время обработки** — задание Paid Storage обычно выполняется за 5-30 секунд.

---

## Источники данных о хранении

Wildberries предоставляет несколько API для работы с данными о хранении. Выбор зависит от задачи:

### Какой API выбрать?

| Сценарий | API | Эндпоинт |
|----------|-----|----------|
| Расчёт текущих затрат на хранение | common-api | `/api/v1/tariffs/box` |
| Планирование новой поставки | supplies-api | `/api/v1/acceptance/coefficients` |
| Сверка с финансами (детализация) | statistics-api | `/api/v1/paid_storage` |
| Сверка с финансами (агрегат) | statistics-api | `/api/v1/supplier/reportDetailByPeriod` |

---

## См. также

- [Обзор тарифов Wildberries](./tariffs-overview) — полный обзор всех тарифных API
- [Комиссии и сборы](./commissions-fees) — тарифы и комиссии
- [Модуль отчётов](./reports-module) — работа с отчётами

---

[← Назад к руководствам](./index)

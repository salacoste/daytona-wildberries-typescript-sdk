# Обзор тарифов Wildberries API

Руководство по работе с тарифами Wildberries: различия между тарифами на остаток и тарифами на поставку.

## Введение

Wildberries API предоставляет **два типа тарифов** для разных бизнес-задач:

| Тип тарифов | Назначение | API домен |
|-------------|------------|-----------|
| **Тарифы на остаток** | Для товаров, уже находящихся на складе | `common-api.wildberries.ru` |
| **Тарифы на поставку** | Для планирования новых поставок | `supplies-api.wildberries.ru` |

Понимание различий между этими API критично для корректного расчёта unit-экономики и планирования поставок.

---

## Тарифы на остаток (Inventory Tariffs)

### Назначение

Тарифы для товаров, **уже находящихся** на складе Wildberries. Используются для:

- Расчёта текущих затрат на хранение и логистику
- Unit-экономики существующих товаров
- Анализа рентабельности текущих остатков
- Ретроспективного анализа затрат

### API эндпоинты

**Домен:** `https://common-api.wildberries.ru`

| Эндпоинт | Метод SDK | Описание |
|----------|-----------|----------|
| `/api/v1/tariffs/box` | `sdk.tariffs.getTariffsBox()` | Тарифы на короба |
| `/api/v1/tariffs/pallet` | `sdk.tariffs.getTariffsPallet()` | Тарифы на монопаллеты |
| `/api/v1/tariffs/return` | `sdk.tariffs.getTariffsReturn()` | Тарифы на возврат |

### Пример использования

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить текущие тарифы на коробы
const boxTariffs = await sdk.tariffs.getTariffsBox({ date: '2024-12-01' });

const warehouses = boxTariffs.response?.data?.warehouseList || [];

for (const wh of warehouses) {
  console.log(`Склад: ${wh.warehouseName} (${wh.geoName})`);
  console.log(`  Логистика: ${wh.boxDeliveryBase}/${wh.boxDeliveryLiter} руб`);
  console.log(`  Хранение: ${wh.boxStorageBase}/${wh.boxStorageLiter} руб/день`);
}
```

---

## Тарифы на поставку (Supply/Acceptance Tariffs)

### Назначение

Тарифы для **планирования новых поставок** на склад Wildberries. Используются для:

- Выбора оптимального склада для поставки
- Прогнозирования затрат на 14 дней вперёд
- Оценки коэффициентов приёмки
- Расчёта стоимости транзитных доставок

### API эндпоинты

**Домен:** `https://supplies-api.wildberries.ru`

| Эндпоинт | Метод SDK | Описание |
|----------|-----------|----------|
| `/api/v1/acceptance/coefficients` | `sdk.supplies.getAcceptanceCoefficients()` | Коэффициенты приёмки |
| `/api/v1/acceptance/options` | `sdk.supplies.getAcceptanceOptions()` | Опции приёмки |
| `/api/v1/transit-tariffs` | `sdk.supplies.getTransitTariffs()` | Транзитные тарифы |

### Пример использования

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить коэффициенты приёмки на 14 дней вперёд
const coefficients = await sdk.supplies.getAcceptanceCoefficients();

// Фильтруем по типу короба и сортируем по коэффициенту
const monopallets = coefficients.filter(c => c.boxTypeName === 'Монопаллеты');
const sortedByCoef = monopallets.sort((a, b) => a.coefficient - b.coefficient);

console.log('=== Рекомендуемые склады для поставки ===');
for (const wh of sortedByCoef.slice(0, 5)) {
  console.log(`${wh.warehouseName}: коэф. ${wh.coefficient * 100}% (${wh.date})`);
}
```

---

## Сравнительная таблица

| Характеристика | Тарифы на остаток | Тарифы на поставку |
|----------------|-------------------|-------------------|
| **API домен** | `common-api.wildberries.ru` | `supplies-api.wildberries.ru` |
| **Назначение** | Расчёт затрат текущих товаров | Планирование новых поставок |
| **Временной горизонт** | Текущие/исторические данные | Прогноз до 14 дней |
| **Ключевые методы** | `getTariffsBox`, `getTariffsPallet`, `getTariffsReturn` | `getAcceptanceCoefficients`, `getTransitTariffs` |
| **Коэффициенты** | Фактические (на дату) | Прогнозные |
| **Применение** | Unit-экономика, P&L | Выбор склада, планирование |
| **Детализация** | По складам и регионам | По складам + прогноз по датам |
| **Rate Limit** | 60 запросов/мин | Зависит от эндпоинта |

---

## Когда использовать какой API

### Используйте тарифы на остаток (`common-api`), когда:

- Рассчитываете unit-экономику существующих товаров
- Формируете P&L отчёт за прошлый период
- Анализируете рентабельность текущих остатков
- Сравниваете фактические затраты с планом
- Нужны данные о тарифах на возврат

### Используйте тарифы на поставку (`supplies-api`), когда:

- Планируете новую поставку на склад
- Выбираете оптимальный склад для FBW
- Нужен прогноз коэффициентов на 14 дней
- Рассчитываете транзитные тарифы
- Оцениваете будущие затраты на логистику

---

## Rate Limits

### Тарифы на остаток

| Метод | Лимит |
|-------|-------|
| `getTariffsBox` | 60 запросов/мин |
| `getTariffsPallet` | 60 запросов/мин |
| `getTariffsReturn` | 60 запросов/мин |

### Тарифы на поставку

| Метод | Лимит |
|-------|-------|
| `getAcceptanceCoefficients` | Уточняется в документации |
| `getAcceptanceOptions` | Уточняется в документации |
| `getTransitTariffs` | Уточняется в документации |

---

## Важные замечания

1. **Различие в коэффициентах** - Коэффициенты в двух API могут отличаться, так как тарифы на остаток отражают фактические условия, а тарифы на поставку - прогнозные.

2. **Даты действия** - Тарифы на остаток привязаны к конкретной дате (`date` параметр), тарифы на поставку включают прогноз на 14 дней.

3. **Структура складов** - Список складов может отличаться между API, не все склады принимают новые поставки.

4. **Обновление тарифов** - Wildberries может изменять тарифы без предупреждения, рекомендуется кешировать данные не более чем на 1 час.

5. **Коэффициенты приёмки** - Коэффициент 1.0 (100%) означает стандартные условия, значения выше 1.0 означают повышенную стоимость.

---

## Связанные документы

- [Комиссии и сборы](./commissions-fees) - Комиссии и расчёт затрат
- [Платное хранение](./storage-fees-integration) - Интеграция сборов
- [Отчёт о реализации](./realization-report) - Отчёт с комиссиями
- [Планирование поставок](./supplies-planning) - Выбор склада и даты
- [API Reference: TariffsModule](/api/classes/TariffsModule)

---

[← Назад к руководствам](./index)

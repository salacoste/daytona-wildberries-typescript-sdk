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

### Структура данных

```typescript
interface InventoryTariffWarehouse {
  warehouseName: string;           // Название склада
  geoName: string;                 // Регион/округ

  // Логистика доставки покупателю
  boxDeliveryBase: string;         // Базовая ставка за 1 литр
  boxDeliveryLiter: string;        // Ставка за доп. литр
  boxDeliveryCoefExpr: string;     // Коэффициент логистики (%)

  // Хранение
  boxStorageBase: string;          // Базовая ставка хранения (1 литр/день)
  boxStorageLiter: string;         // Доп. литр/день
  boxStorageCoefExpr: string;      // Коэффициент хранения (%)
}
```

### Пример данных

**Склад: Краснодар (Тихорецкая)**

| Параметр | Значение |
|----------|----------|
| Логистика (база) | 73,6 руб/л |
| Логистика (доп. литр) | 22,4 руб/л |
| Коэффициент логистики | 160% |
| Хранение (база) | 0,1 руб/л/день |
| Хранение (доп. литр) | 0,1 руб/л/день |
| Коэффициент хранения | 145% |

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
  console.log(`  Коэф. логистики: ${wh.boxDeliveryCoefExpr}`);
  console.log(`  Хранение: ${wh.boxStorageBase}/${wh.boxStorageLiter} руб/день`);
  console.log(`  Коэф. хранения: ${wh.boxStorageCoefExpr}`);
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

### Структура данных

```typescript
interface SupplyTariffWarehouse {
  warehouseID: number;             // ID склада
  warehouseName: string;           // Название склада

  // Прогнозные коэффициенты приёмки
  coefficient: number;             // Текущий коэффициент
  date: string;                    // Дата прогноза

  // Логистика доставки на склад
  boxDeliveryAndStorageExpr: string; // Формула расчёта
  boxDeliveryBase: string;         // Базовая ставка
  boxDeliveryLiter: string;        // За доп. литр

  // Хранение (прогнозное)
  boxStorageBase: string;          // Базовая ставка
  boxStorageLiter: string;         // За доп. литр
}

interface AcceptanceCoefficient {
  warehouseID: number;
  warehouseName: string;
  coefficient: number;             // Коэффициент приёмки (1.0 = 100%)
  date: string;                    // Дата действия
  boxTypeName: string;             // Тип короба
  isSortingCenter: boolean;        // Сортировочный центр
}
```

### Пример данных

**Склад: Краснодар (Тихорецкая) - Прогноз**

| Параметр | Значение |
|----------|----------|
| Логистика (база) | 75,9 руб/л |
| Логистика (доп. литр) | 23,1 руб/л |
| Коэффициент приёмки | 165% |
| Хранение (база) | 0,13 руб/л/день |
| Хранение (доп. литр) | 0,13 руб/л/день |

### Пример использования

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить коэффициенты приёмки на 14 дней вперёд
const coefficients = await sdk.supplies.getAcceptanceCoefficients();

// Фильтруем по типу короба и сортируем по коэффициенту
const monopallets = coefficients.filter(c => c.boxTypeName === 'Монопаллеты');
const sortedByCoef = monopallets.sort((a, b) => a.coefficient - b.coefficient);

console.log('=== Рекомендуемые склады для поставки (по коэффициенту) ===');
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

## Примеры использования в SDK

### Сценарий 1: Расчёт текущих затрат (Тарифы на остаток)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

interface CurrentCosts {
  logistics: number;
  storage: number;
  total: number;
}

async function calculateCurrentCosts(
  sdk: WildberriesSDK,
  warehouseName: string,
  volumeLiters: number,
  storageDays: number
): Promise<CurrentCosts> {
  const tariffs = await sdk.tariffs.getTariffsBox({
    date: new Date().toISOString().split('T')[0]
  });

  const warehouse = tariffs.response?.data?.warehouseList?.find(
    w => w.warehouseName === warehouseName
  );

  if (!warehouse) {
    throw new Error(`Warehouse ${warehouseName} not found`);
  }

  const deliveryBase = parseFloat(warehouse.boxDeliveryBase || '0');
  const deliveryLiter = parseFloat(warehouse.boxDeliveryLiter || '0');
  const storageBase = parseFloat(warehouse.boxStorageBase || '0');
  const storageLiter = parseFloat(warehouse.boxStorageLiter || '0');

  // Расчёт логистики
  const logistics = deliveryBase + (volumeLiters - 1) * deliveryLiter;

  // Расчёт хранения
  const dailyStorage = storageBase + (volumeLiters - 1) * storageLiter;
  const storage = dailyStorage * storageDays;

  return {
    logistics: Math.round(logistics * 100) / 100,
    storage: Math.round(storage * 100) / 100,
    total: Math.round((logistics + storage) * 100) / 100
  };
}

// Использование
const costs = await calculateCurrentCosts(sdk, 'Коледино', 3, 30);
console.log(`Логистика: ${costs.logistics} руб`);
console.log(`Хранение (30 дней): ${costs.storage} руб`);
console.log(`Итого: ${costs.total} руб`);
```

### Сценарий 2: Выбор склада для поставки (Тарифы на поставку)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

interface WarehouseRecommendation {
  warehouseName: string;
  coefficient: number;
  estimatedCost: number;
  date: string;
}

async function findBestWarehouseForSupply(
  sdk: WildberriesSDK,
  boxType: string = 'Короба'
): Promise<WarehouseRecommendation[]> {
  const coefficients = await sdk.supplies.getAcceptanceCoefficients();

  // Фильтруем по типу короба
  const filtered = coefficients.filter(c =>
    c.boxTypeName === boxType && !c.isSortingCenter
  );

  // Группируем по складу (берём ближайшую дату)
  const byWarehouse = new Map<number, typeof filtered[0]>();

  for (const coef of filtered) {
    const existing = byWarehouse.get(coef.warehouseID);
    if (!existing || new Date(coef.date) < new Date(existing.date)) {
      byWarehouse.set(coef.warehouseID, coef);
    }
  }

  // Сортируем по коэффициенту (меньше = лучше)
  return Array.from(byWarehouse.values())
    .sort((a, b) => a.coefficient - b.coefficient)
    .slice(0, 10)
    .map(wh => ({
      warehouseName: wh.warehouseName,
      coefficient: wh.coefficient,
      estimatedCost: wh.coefficient * 100, // Упрощённый расчёт
      date: wh.date
    }));
}

// Использование
const recommendations = await findBestWarehouseForSupply(sdk, 'Короба');

console.log('=== Топ-10 складов для поставки ===');
for (const rec of recommendations) {
  console.log(`${rec.warehouseName}: ${rec.coefficient * 100}% (${rec.date})`);
}
```

### Сценарий 3: Сравнение тарифов остаток vs поставка

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

interface TariffComparison {
  warehouseName: string;
  inventoryLogistics: number;
  supplyLogistics: number;
  difference: number;
  differencePercent: number;
}

async function compareTariffs(
  sdk: WildberriesSDK,
  targetWarehouses: string[]
): Promise<TariffComparison[]> {
  // Параллельно получаем оба типа тарифов
  const [inventoryTariffs, supplyCoefficients] = await Promise.all([
    sdk.tariffs.getTariffsBox({ date: new Date().toISOString().split('T')[0] }),
    sdk.supplies.getAcceptanceCoefficients()
  ]);

  const results: TariffComparison[] = [];

  for (const warehouseName of targetWarehouses) {
    // Тарифы на остаток
    const inventory = inventoryTariffs.response?.data?.warehouseList?.find(
      w => w.warehouseName === warehouseName
    );

    // Тарифы на поставку (берём первый результат для склада)
    const supply = supplyCoefficients.find(
      c => c.warehouseName === warehouseName
    );

    if (inventory && supply) {
      const invLogistics = parseFloat(inventory.boxDeliveryBase || '0');
      const supLogistics = supply.coefficient * 100; // Условный расчёт
      const diff = supLogistics - invLogistics;

      results.push({
        warehouseName,
        inventoryLogistics: invLogistics,
        supplyLogistics: supLogistics,
        difference: Math.round(diff * 100) / 100,
        differencePercent: Math.round((diff / invLogistics) * 10000) / 100
      });
    }
  }

  return results;
}

// Использование
const comparison = await compareTariffs(sdk, [
  'Коледино',
  'Подольск',
  'Краснодар (Тихорецкая)'
]);

console.log('=== Сравнение тарифов ===');
for (const item of comparison) {
  console.log(`${item.warehouseName}:`);
  console.log(`  Остаток: ${item.inventoryLogistics} руб`);
  console.log(`  Поставка: ${item.supplyLogistics} руб`);
  console.log(`  Разница: ${item.difference} руб (${item.differencePercent}%)`);
}
```

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

- [Commissions & Fees Guide](./commissions-fees.md) - Комиссии и расчёт затрат
- [Storage Fees Integration](./storage-fees-integration.md) - Платное хранение
- [Realization Report](./realization-report.md) - Отчёт о реализации
- [API Reference: TariffsModule](/api/classes/TariffsModule)
- [API Reference: SuppliesModule](/api/classes/SuppliesModule)

---

[Back to Guides](./index.md)

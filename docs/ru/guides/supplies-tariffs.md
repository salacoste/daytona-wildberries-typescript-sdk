---
title: Руководство по поставкам и тарифам
description: Управление коэффициентами приёмки поставок, расчёт стоимости поставок и сравнение тарифов хранения и фулфилмента
layout: doc
---

# Руководство по поставкам и тарифам

Полное руководство по управлению коэффициентами приёмки поставок Wildberries, расчёту стоимости поставок и сравнению тарифов между складским хранением и вариантами фулфилмента.

## Содержание

- [Обзор](#обзор)
- [Коэффициенты приёмки](#коэффициенты-приёмки)
- [Варианты приёмки](#варианты-приёмки)
- [Калькулятор стоимости поставки](#калькулятор-стоимости-поставки)
- [Сравнение тарифов](#сравнение-тарифов)
- [Лимиты запросов](#лимиты-запросов)
- [Лучшие практики](#лучшие-практики)

## Обзор

Модуль поставок (часть `OrdersFbwModule`) предоставляет доступ к тарифным данным поставок через API поставок Wildberries. Включает:

- **Коэффициенты приёмки**: Ежедневные коэффициенты, влияющие на стоимость приёмки поставок, на ближайшие 14 дней
- **Варианты приёмки**: Доступные склады и типы упаковки для конкретных товаров
- **Вспомогательные функции**: Расчёт стоимости поставок и сравнение тарифов для различных вариантов фулфилмента

### Когда использовать этот модуль

| Сценарий | Метод / утилита |
|----------|-----------------|
| Планирование оптимального времени поставки | `getAcceptanceCoefficients()` |
| Поиск доступных складов для товаров | `createAcceptanceOption()` |
| Оценка стоимости поставки | `calculateSupplyCost()` |
| Выбор между складским хранением и поставкой | `compareTariffs()` |

## Коэффициенты приёмки

### Метод: `getAcceptanceCoefficients()`

Возвращает коэффициенты приёмки для всех складов на ближайшие 14 дней. Эти коэффициенты напрямую влияют на стоимость приёмки ваших поставок.

#### Сигнатура

```typescript
async getAcceptanceCoefficients(options?: {
  warehouseIDs?: string;
}): Promise<ModelsAcceptanceCoefficient[]>
```

#### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `warehouseIDs` | `string` | Необязательный. Список ID складов через запятую для фильтрации результатов |

#### Тип ответа: `ModelsAcceptanceCoefficient`

```typescript
interface ModelsAcceptanceCoefficient {
  /** Дата действия коэффициента (YYYY-MM-DD) */
  date?: string;

  /** Коэффициент приёмки:
   * -1: приёмка недоступна
   *  0: бесплатная приёмка
   * >0: множитель стоимости */
  coefficient?: number;

  /** ID склада */
  warehouseID?: number;

  /** Название склада */
  warehouseName?: string;

  /** Разрешена ли разгрузка */
  allowUnload?: boolean;

  /** Тип упаковки: "Короба", "Монопаллеты", "Суперсейф", "QR-поставка с коробами" */
  boxTypeName?: string;

  /** ID типа упаковки: 2=Короба, 5=Монопаллеты, 6=Суперсейф */
  boxTypeID?: number;

  /** Коэффициент хранения (в процентах) */
  storageCoef?: string;

  /** Коэффициент доставки (в процентах) */
  deliveryCoef?: string;

  /** Базовая стоимость доставки за первый литр */
  deliveryBaseLiter?: string;

  /** Стоимость доставки за каждый дополнительный литр */
  deliveryAdditionalLiter?: string;

  /** Базовая стоимость хранения за первый литр (или за паллет для паллетов) */
  storageBaseLiter?: string;

  /** Стоимость хранения за каждый дополнительный литр */
  storageAdditionalLiter?: string;

  /** Является ли сортировочным центром */
  isSortingCenter?: boolean;
}
```

#### Пример: получение всех коэффициентов

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Получить коэффициенты для всех складов
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

console.log(`Найдено ${coefficients.length} записей коэффициентов`);

// Группировка по складам для анализа
const byWarehouse = new Map<number, typeof coefficients>();
for (const coef of coefficients) {
  if (!coef.warehouseID) continue;
  const existing = byWarehouse.get(coef.warehouseID) || [];
  existing.push(coef);
  byWarehouse.set(coef.warehouseID, existing);
}

// Найти склады с бесплатной приёмкой (коэффициент = 0)
const freeAcceptance = coefficients.filter(c =>
  c.coefficient === 0 && c.allowUnload === true
);

console.log('Склады с бесплатной приёмкой:',
  [...new Set(freeAcceptance.map(c => c.warehouseName))]
);
```

#### Пример: фильтрация по конкретным складам

```typescript
// Получить коэффициенты только для Коломино (507) и Электростали (130744)
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients({
  warehouseIDs: '507,130744'
});

// Найти лучший день для поставки в Коломино
const kolominoCoefs = coefficients
  .filter(c => c.warehouseID === 507 && c.boxTypeName === 'Короба')
  .sort((a, b) => (a.coefficient ?? 999) - (b.coefficient ?? 999));

if (kolominoCoefs.length > 0) {
  const best = kolominoCoefs[0];
  console.log(`Лучший день для Коломино: ${best.date}, коэффициент: ${best.coefficient}`);
}
```

#### Значения коэффициентов

| Коэффициент | Значение | Действие |
|-------------|----------|----------|
| `-1` | Приёмка недоступна | Невозможно поставить в эту дату |
| `0` | Бесплатная приёмка | Оптимальное время для поставки |
| `1` | Базовая ставка | Стандартная стоимость |
| `>1` | Повышенная ставка | Повышенная стоимость, рассмотрите ожидание |

::: tip Доступность приёмки
Поставка может быть принята только при выполнении **обоих** условий:
- `coefficient` равен `0` или `1`
- `allowUnload` равен `true`
:::

::: warning Важно: формат чисел
API Wildberries возвращает числа с **разделителем-запятой** (например, `"0,13"`). Вы ДОЛЖНЫ преобразовать запятые в точки перед парсингом:
```typescript
function parseWBNumber(value: string | null | undefined): number {
  if (!value) return 0;
  return parseFloat(value.replace(',', '.'));  // "0,13" → 0.13
}
```
Без этого расчёты `storage = 0` будут ошибочными!
:::

## Варианты приёмки

### Метод: `createAcceptanceOption()`

Возвращает доступные склады и типы упаковки для конкретного набора товаров на основе их штрихкодов и количества.

#### Сигнатура

```typescript
async createAcceptanceOption(
  data: ModelsGood[],
  options?: { warehouseID?: string }
): Promise<ModelsOptionsResultModel>
```

#### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `data` | `ModelsGood[]` | Массив товаров со штрихкодами и количеством |
| `warehouseID` | `string` | Необязательный. Фильтрация результатов по конкретному складу |

#### Входной тип: `ModelsGood`

```typescript
interface ModelsGood {
  /** Штрихкод товара */
  barcode: string;

  /** Количество единиц */
  quantity: number;
}
```

#### Пример: получение вариантов приёмки для товаров

```typescript
// Определить товары для поставки
const products = [
  { barcode: '4680075251234', quantity: 100 },
  { barcode: '4680075255678', quantity: 50 }
];

// Получить доступные варианты
const options = await sdk.ordersFBW.createAcceptanceOption(products);

console.log('Доступные склады:', options.warehouses);
console.log('Доступные типы упаковки:', options.boxTypes);

// Фильтр по конкретному складу
const kolominoOptions = await sdk.ordersFBW.createAcceptanceOption(products, {
  warehouseID: '507'
});
```

## Калькулятор стоимости поставки

### Утилита: `calculateSupplyCost()`

Рассчитывает ориентировочную общую стоимость поставки, включая затраты на приёмку, хранение и логистику.

#### Сигнатура

```typescript
async function calculateSupplyCost(
  input: SupplyCostInput,
  getCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<SupplyCostResult>
```

#### Входной тип: `SupplyCostInput`

```typescript
interface SupplyCostInput {
  /** Объём товаров в литрах */
  volume: number;

  /** ID склада */
  warehouseID: number;

  /** Количество дней хранения */
  days: number;

  /** Тип упаковки: 'box' | 'pallet' | 'supersafe' */
  boxType?: 'box' | 'pallet' | 'supersafe';
}
```

#### Выходной тип: `SupplyCostResult`

```typescript
interface SupplyCostResult {
  /** Стоимость приёмки в рублях */
  acceptanceCost: number;

  /** Стоимость хранения в рублях */
  storageCost: number;

  /** Стоимость логистики/доставки в рублях */
  logisticsCost: number;

  /** Общая стоимость (приёмка + хранение + логистика) */
  totalCost: number;

  /** Название склада */
  warehouseName: string;

  /** Применённые коэффициенты для прозрачности */
  appliedCoefficients: {
    acceptance: number;
    storage: number;
    delivery: number;
  };
}
```

#### Пример: расчёт стоимости поставки

```typescript
import { WildberriesSDK, calculateSupplyCost } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Рассчитать стоимость для 10 литров, 30 дней хранения в Коломино
const result = await calculateSupplyCost(
  {
    volume: 10,
    warehouseID: 507,
    days: 30,
    boxType: 'box'
  },
  () => sdk.ordersFBW.getAcceptanceCoefficients({ warehouseIDs: '507' })
);

console.log('Разбивка стоимости:');
console.log(`  Приёмка: ${result.acceptanceCost} руб.`);
console.log(`  Хранение: ${result.storageCost} руб.`);
console.log(`  Логистика: ${result.logisticsCost} руб.`);
console.log(`  Итого: ${result.totalCost} руб.`);
console.log(`  Склад: ${result.warehouseName}`);
console.log('Применённые коэффициенты:', result.appliedCoefficients);
```

#### Формулы расчёта стоимости

**ВАЖНО: сначала преобразуйте формат чисел**
```typescript
// Всегда парсите числа Wildberries с помощью этой функции
function parseWBNumber(value: string | null | undefined): number {
  if (!value) return 0;
  return parseFloat(value.replace(',', '.'));
}
```

**Стоимость хранения:**

*Для коробов (BoxTypeID: 2):*
```
storageBaseLiter: ₽ за первый литр
storageAdditionalLiter: ₽ за каждый дополнительный литр
storageCoef: процентный множитель

Стоимость = (storageBaseLiter + (объём-1) * storageAdditionalLiter) * (storageCoef / 100) * дни
```

*Для паллетов (BoxTypeID: 5):*
```
storageBaseLiter: ₽ за весь паллет (фиксированная ставка)
storageAdditionalLiter: null (не применяется)
storageCoef: процентный множитель

Стоимость = storageBaseLiter * (storageCoef / 100) * дни
```

*Для суперсейфа (BoxTypeID: 6):*
```
Та же формула, что и для коробов:
Стоимость = (storageBaseLiter + (объём-1) * storageAdditionalLiter) * (storageCoef / 100) * дни
```

**Стоимость логистики:**
```
Для коробов: (deliveryBaseLiter + (объём-1) * deliveryAdditionalLiter) * deliveryCoef/100
Для паллетов: deliveryBaseLiter * deliveryCoef/100 (фиксированная ставка)
```

**Стоимость приёмки:**
```
coefficient = 0: Бесплатно (0 руб.)
coefficient > 0: coefficient * БАЗОВАЯ_СТАВКА (50 руб.)
```

::: info Различия типов упаковки
| Тип упаковки | BoxTypeID | storageBaseLiter | storageAdditionalLiter | Модель ценообразования |
|--------------|-----------|------------------|----------------------|----------------------|
| Короба | 2 | за первый литр | за доп. литр | По объёму |
| Монопаллеты | 5 | за весь паллет | null (не используется) | Фиксированная ставка |
| Суперсейф | 6 | за первый литр | за доп. литр | По объёму |
:::

#### Реальный пример: расчёт стоимости хранения

**Пример 1: хранение в коробах (BoxTypeID: 2)**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Вспомогательная функция — КРИТИЧЕСКИ ВАЖНА для корректного парсинга чисел
function parseWBNumber(value: string | null | undefined): number {
  if (!value) return 0;
  return parseFloat(value.replace(',', '.'));  // "0,13" → 0.13
}

// Расчёт стоимости хранения для коробов
function calculateBoxStorage(
  tariff: ModelsAcceptanceCoefficient,
  volume: number,
  days: number
): number {
  const base = parseWBNumber(tariff.storageBaseLiter);
  const additional = parseWBNumber(tariff.storageAdditionalLiter);
  const coef = parseWBNumber(tariff.storageCoef) || 100;

  // Формула: (base + (объём-1) * additional) * (coef / 100) * дни
  return (base + (volume - 1) * additional) * (coef / 100) * days;
}

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Получить тарифы ПОСТАВОК (для планирования)
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Найти склад и тип упаковки
const warehouse = coefficients.find(c =>
  c.warehouseID === 130744 &&  // Краснодар (Тихорецкая)
  c.boxTypeID === 2             // Короба
);

// Реальные значения из API:
// storageBaseLiter: "0,13"
// storageAdditionalLiter: "0,13"
// storageCoef: "165"

const volume = 50; // литров
const days = 30;

const storageCost = calculateBoxStorage(warehouse, volume, days);
console.log(`Стоимость хранения: ${storageCost.toFixed(2)} ₽`);
// Результат: Стоимость хранения: 643.50 ₽
// Расчёт: (0.13 + (50-1) * 0.13) * (165 / 100) * 30 = 643.50
```

**Пример 2: хранение на паллетах (BoxTypeID: 5)**

```typescript
// Расчёт стоимости хранения для паллетов
function calculatePalletStorage(
  tariff: ModelsAcceptanceCoefficient,
  palletCount: number,
  days: number
): number {
  const base = parseWBNumber(tariff.storageBaseLiter);
  const coef = parseWBNumber(tariff.storageCoef) || 100;

  // storageAdditionalLiter для паллетов равен null — фиксированная ставка
  // Формула: base * (coef / 100) * дни
  return base * palletCount * (coef / 100) * days;
}

const palletWarehouse = coefficients.find(c =>
  c.warehouseID === 130744 &&
  c.boxTypeID === 5  // Монопаллеты
);

// Реальные значения из API:
// storageBaseLiter: "41.25"
// storageAdditionalLiter: null
// storageCoef: "165"

const palletCount = 2;
const palletDays = 30;

const palletStorageCost = calculatePalletStorage(
  palletWarehouse,
  palletCount,
  palletDays
);

console.log(`Стоимость хранения паллетов: ${palletStorageCost.toFixed(2)} ₽`);
// Результат: Стоимость хранения паллетов: 4083.75 ₽
// Расчёт: 41.25 * 2 * (165 / 100) * 30 = 4083.75
```

::: warning Распространённая ошибка: использование parseFloat напрямую
```typescript
// ❌ НЕПРАВИЛЬНО — вернёт 0 для чисел с запятой
const wrong = parseFloat(tariff.storageBaseLiter);  // "0,13" → NaN → 0

// ✅ ПРАВИЛЬНО — сначала замените запятую на точку
const correct = parseFloat(tariff.storageBaseLiter.replace(',', '.'));  // "0,13" → 0.13
```
:::

## Сравнение тарифов

### Утилита: `compareTariffs()`

Сравнивает тарифы между складским хранением (из API тарифов) и приёмкой поставок (из API поставок), чтобы помочь выбрать наиболее выгодный вариант фулфилмента.

#### Сигнатура

```typescript
async function compareTariffs(
  input: CompareTariffsInput,
  getBoxTariffs: () => Promise<ModelsWarehouseBoxRates[]>,  // Адаптер для sdk.tariffs.getTariffsBox()
  getAcceptanceCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<TariffComparison>
```

#### Входной тип: `CompareTariffsInput`

```typescript
interface CompareTariffsInput {
  /** Название склада для поиска (поддерживает частичное совпадение) */
  warehouseName: string;

  /** Дата для сравнения (формат ISO: YYYY-MM-DD) */
  date: string;
}
```

#### Выходной тип: `TariffComparison`

```typescript
interface TariffComparison {
  /** Название склада для сравнения */
  warehouseName: string;

  /** Дата сравнения */
  date: string;

  /** Тарифные данные складского хранения */
  inventory: TariffData;

  /** Тарифные данные поставки */
  supply: TariffData;

  /** Процентные различия между двумя источниками */
  difference: TariffDifference;

  /** Рекомендация: 'SUPPLY_CHEAPER' | 'INVENTORY_CHEAPER' | 'EQUAL' */
  recommendation: TariffRecommendation;
}

interface TariffData {
  deliveryBase: number;
  deliveryCoef: number;
  storageBase: number;
  storageCoef: number;
  found: boolean;
}

interface TariffDifference {
  /** (поставка - хранение) / хранение * 100 */
  deliveryBasePercent: number;
  storageBasePercent: number;
}
```

#### Пример: сравнение тарифов

```typescript
import { WildberriesSDK, compareTariffs } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

const comparison = await compareTariffs(
  {
    warehouseName: 'Коледино',
    date: '2025-01-25'
  },
  async () => {
    const response = await sdk.tariffs.getTariffsBox({ date: '2025-01-25' });
    return response.response?.data?.warehouseList ?? [];
  },
  () => sdk.ordersFBW.getAcceptanceCoefficients()
);

console.log('Сравнение тарифов для', comparison.warehouseName);
console.log('');
console.log('Тарифы складского хранения:');
console.log(`  Базовая доставка: ${comparison.inventory.deliveryBase} руб./л`);
console.log(`  Базовое хранение: ${comparison.inventory.storageBase} руб./л/день`);
console.log('');
console.log('Тарифы поставки:');
console.log(`  Базовая доставка: ${comparison.supply.deliveryBase} руб./л`);
console.log(`  Базовое хранение: ${comparison.supply.storageBase} руб./л/день`);
console.log('');
console.log('Различия:');
console.log(`  Доставка: ${comparison.difference.deliveryBasePercent.toFixed(1)}%`);
console.log(`  Хранение: ${comparison.difference.storageBasePercent.toFixed(1)}%`);
console.log('');
console.log(`Рекомендация: ${comparison.recommendation}`);

// Принятие решения на основе рекомендации
if (comparison.recommendation === 'SUPPLY_CHEAPER') {
  console.log('Используйте поставку FBW для этого склада');
} else if (comparison.recommendation === 'INVENTORY_CHEAPER') {
  console.log('Используйте складское хранение (FBS) для этого склада');
} else {
  console.log('Стоимости примерно равны');
}
```

## Лимиты запросов

Все методы, связанные с поставками, имеют одинаковые лимиты запросов:

| Период | Лимит | Интервал | Всплеск |
|--------|-------|----------|---------|
| 1 минута | 6 запросов | 10 секунд | 6 запросов |

::: warning Применение лимитов запросов
SDK автоматически применяет лимиты запросов. При превышении лимита запросы ставятся в очередь и задерживаются соответственно. Для массовых операций рекомендуется кэшировать данные коэффициентов.
:::

### Оптимизация API-вызовов

```typescript
// ПРАВИЛЬНО: кэшировать коэффициенты и использовать повторно
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Рассчитать стоимость для нескольких складов, используя кэшированные данные
const warehouseIDs = [507, 130744, 211622];
const costs = await Promise.all(
  warehouseIDs.map(warehouseID =>
    calculateSupplyCost(
      { volume: 10, warehouseID, days: 30 },
      () => Promise.resolve(coefficients) // Используем кэшированные данные
    )
  )
);

// НЕПРАВИЛЬНО: отдельные API-вызовы для каждого расчёта
// Это быстро исчерпает лимиты запросов
```

## Лучшие практики

### 1. Планируйте поставки в периоды с низкой стоимостью

```typescript
async function findOptimalSupplyDates(
  warehouseID: number,
  boxType: string = 'Короба'
) {
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients({
    warehouseIDs: String(warehouseID)
  });

  // Фильтр по типу упаковки и доступным датам
  const available = coefficients
    .filter(c =>
      c.boxTypeName === boxType &&
      c.allowUnload === true &&
      (c.coefficient === 0 || c.coefficient === 1)
    )
    .sort((a, b) => (a.coefficient ?? 999) - (b.coefficient ?? 999));

  return available.map(c => ({
    date: c.date,
    coefficient: c.coefficient,
    isFree: c.coefficient === 0
  }));
}

const optimalDates = await findOptimalSupplyDates(507);
console.log('Лучшие даты для поставки:', optimalDates.slice(0, 5));
```

### 2. Сравнивайте несколько складов

```typescript
async function compareWarehouses(volume: number, days: number) {
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

  // Получить уникальные склады
  const warehouseIDs = [...new Set(
    coefficients.map(c => c.warehouseID).filter(Boolean)
  )] as number[];

  const results = await Promise.all(
    warehouseIDs.slice(0, 10).map(async warehouseID => {
      try {
        const cost = await calculateSupplyCost(
          { volume, warehouseID, days },
          () => Promise.resolve(coefficients)
        );
        return { warehouseID, ...cost };
      } catch {
        return null;
      }
    })
  );

  return results
    .filter(Boolean)
    .sort((a, b) => a!.totalCost - b!.totalCost);
}

const comparison = await compareWarehouses(10, 30);
console.log('Наиболее выгодные склады:');
comparison.slice(0, 5).forEach((c, i) => {
  console.log(`${i + 1}. ${c!.warehouseName}: ${c!.totalCost} руб.`);
});
```

### 3. Отслеживайте изменения коэффициентов

```typescript
async function alertOnCoefficientChanges(warehouseID: number) {
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients({
    warehouseIDs: String(warehouseID)
  });

  const today = new Date().toISOString().split('T')[0];
  const todayCoef = coefficients.find(c =>
    c.date === today && c.boxTypeName === 'Короба'
  );

  if (todayCoef?.coefficient === 0) {
    console.log('БЕСПЛАТНАЯ ПРИЁМКА СЕГОДНЯ! Рассмотрите отправку поставки.');
  } else if ((todayCoef?.coefficient ?? 0) > 1) {
    console.log(`Высокий коэффициент (${todayCoef?.coefficient}x) — рассмотрите ожидание`);
  }

  return todayCoef;
}
```

## Связанная документация

- [Справочник API: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [Обзор тарифов](/guides/tariffs-overview)
- [Управление остатками](/guides/stock-management)
- [Интеграция стоимости хранения](/guides/storage-fees-integration)

## Поддержка

По вопросам и проблемам:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [Справочник API](/api/)

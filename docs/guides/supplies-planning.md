# Планирование поставок на склады Wildberries

Руководство по планированию поставок на склады Wildberries: выбор оптимальных дат, расчёт затрат и сравнение стратегий FBW vs FBS.

## Введение

### Почему планирование поставок важно для продавцов

Эффективное планирование поставок напрямую влияет на рентабельность бизнеса:

1. **Коэффициенты приёмки** меняются ежедневно — правильный выбор даты может сэкономить до 100% стоимости приёмки
2. **Разные склады** имеют разные тарифы на хранение и логистику
3. **Тип упаковки** (короба, монопаллеты, суперсейф) влияет на доступность и стоимость
4. **Сезонность** влияет на загруженность складов и коэффициенты

### Два типа тарифов Wildberries

| Тип | Назначение | API домен | Методы SDK |
|-----|------------|-----------|------------|
| **Тарифы на остаток** | Для товаров, уже находящихся на складе WB | `common-api.wildberries.ru` | `sdk.tariffs.getTariffsBox()` |
| **Тарифы на поставку** | Для планирования новых поставок | `supplies-api.wildberries.ru` | `sdk.ordersFBW.getAcceptanceCoefficients()` |

**Тарифы на остаток** — используйте для расчёта текущих затрат на хранение и логистику уже размещённых товаров.

**Тарифы на поставку** — используйте для планирования новых поставок, выбора оптимального склада и даты доставки.

### Обзор доступных методов

```typescript
// Получить коэффициенты приёмки на 14 дней вперёд
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Проверить доступность приёмки для конкретных товаров
const options = await sdk.ordersFBW.createAcceptanceOption(goods, { warehouseID: '507' });

// Получить список складов WB
const warehouses = await sdk.ordersFBW.warehouses();

// Получить транзитные тарифы
const transitTariffs = await sdk.ordersFBW.transitTariffs();

// Получить текущие тарифы на короба (для сравнения)
const boxTariffs = await sdk.tariffs.getTariffsBox({ date: '2025-01-25' });
```

---

## Понимание коэффициентов приёмки

### Что означают значения коэффициентов

| Коэффициент | Значение | Рекомендация |
|-------------|----------|--------------|
| `-1` | Приёмка недоступна | Выбрать другую дату или склад |
| `0` | Бесплатная приёмка | **Оптимальный выбор** |
| `1` | Стандартная стоимость (базовая ставка) | Приемлемо |
| `>1` | Повышенная стоимость (множитель) | Рассмотреть альтернативы |

### Условия доступности приёмки

Приёмка доступна **только** при сочетании двух условий:

```typescript
// Приёмка доступна, если:
const isAcceptanceAvailable =
  coefficient.coefficient !== -1 &&  // Коэффициент не равен -1
  coefficient.allowUnload === true;   // Разгрузка разрешена
```

**Важно:** Даже при `coefficient = 0` приёмка может быть недоступна, если `allowUnload = false`.

### Типы упаковки (boxType)

| ID | Название | Описание |
|----|----------|----------|
| `2` | Короба | Стандартная коробочная поставка |
| `5` | Монопаллеты | Паллетная поставка одного SKU |
| `6` | Суперсейф | Безопасная поставка для ценных товаров |
| — | QR-поставка с коробами | Поставка с QR-маркировкой (без ID) |

```typescript
// Фильтрация по типу упаковки
const boxCoefficients = coefficients.filter(c => c.boxTypeName === 'Короба');
const palletCoefficients = coefficients.filter(c => c.boxTypeName === 'Монопаллеты');
const supersafeCoefficients = coefficients.filter(c => c.boxTypeName === 'Суперсейф');
```

---

## Поиск оптимальных дат доставки

### Получение коэффициентов приёмки

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить все коэффициенты на ближайшие 14 дней
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

console.log(`Получено ${coefficients.length} записей коэффициентов`);

// Структура данных коэффициента:
// {
//   date: '2025-01-26',
//   coefficient: 0,
//   warehouseID: 507,
//   warehouseName: 'Краснодар (Тихорецкая)',
//   allowUnload: true,
//   boxTypeName: 'Короба',
//   boxTypeID: 2,
//   storageCoef: '145',
//   deliveryCoef: '160',
//   deliveryBaseLiter: '75.9',
//   deliveryAdditionalLiter: '23.1',
//   storageBaseLiter: '0.13',
//   storageAdditionalLiter: '0.13',
//   isSortingCenter: false
// }
```

### Фильтрация дней с бесплатной приёмкой

```typescript
interface FreeAcceptanceDay {
  date: string;
  warehouseID: number;
  warehouseName: string;
  boxTypeName: string;
}

function findFreeAcceptanceDays(
  coefficients: ModelsAcceptanceCoefficient[],
  boxType?: string
): FreeAcceptanceDay[] {
  return coefficients
    .filter(c =>
      c.coefficient === 0 &&           // Бесплатная приёмка
      c.allowUnload === true &&        // Разгрузка разрешена
      (!boxType || c.boxTypeName === boxType)  // Фильтр по типу упаковки
    )
    .map(c => ({
      date: c.date!,
      warehouseID: c.warehouseID!,
      warehouseName: c.warehouseName!,
      boxTypeName: c.boxTypeName!
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Использование
const freeBoxDays = findFreeAcceptanceDays(coefficients, 'Короба');

console.log('=== Дни с бесплатной приёмкой коробов ===');
for (const day of freeBoxDays) {
  console.log(`${day.date}: ${day.warehouseName}`);
}
```

### Поиск самых дешёвых дат

```typescript
interface CheapestDateResult {
  date: string;
  warehouseID: number;
  warehouseName: string;
  coefficient: number;
  estimatedAcceptanceCost: number;
}

function findCheapestDates(
  coefficients: ModelsAcceptanceCoefficient[],
  warehouseID?: number,
  boxType: string = 'Короба',
  limit: number = 10
): CheapestDateResult[] {
  const BASE_ACCEPTANCE_RATE = 50; // Базовая ставка за единицу

  return coefficients
    .filter(c =>
      c.coefficient !== undefined &&
      c.coefficient !== -1 &&          // Приёмка доступна
      c.allowUnload === true &&        // Разгрузка разрешена
      c.boxTypeName === boxType &&
      (!warehouseID || c.warehouseID === warehouseID)
    )
    .map(c => ({
      date: c.date!,
      warehouseID: c.warehouseID!,
      warehouseName: c.warehouseName!,
      coefficient: c.coefficient!,
      estimatedAcceptanceCost: c.coefficient === 0 ? 0 : c.coefficient! * BASE_ACCEPTANCE_RATE
    }))
    .sort((a, b) => a.coefficient - b.coefficient)
    .slice(0, limit);
}

// Использование
const cheapestDates = findCheapestDates(coefficients, undefined, 'Короба', 10);

console.log('=== Топ-10 самых дешёвых дат для поставки ===');
for (const result of cheapestDates) {
  const costLabel = result.coefficient === 0 ? 'БЕСПЛАТНО' : `~${result.estimatedAcceptanceCost} руб`;
  console.log(`${result.date}: ${result.warehouseName} - коэф. ${result.coefficient} (${costLabel})`);
}
```

---

## Расчёт затрат на поставку

### Формулы расчёта

SDK предоставляет утилиту `calculateSupplyCost` для расчёта полной стоимости поставки:

**Стоимость хранения (для коробов):**
```
storageCost = (storageBaseLiter + (volume - 1) * storageAdditionalLiter) * (storageCoef / 100) * days
```

**Стоимость хранения (для монопаллет):**
```
storageCost = storageBaseLiter * (storageCoef / 100) * days
```

**Стоимость логистики:**
```
logisticsCost = (deliveryBaseLiter + (volume - 1) * deliveryAdditionalLiter) * (deliveryCoef / 100)
```

**Стоимость приёмки:**
```
acceptanceCost = coefficient * BASE_RATE  // где BASE_RATE = 50 руб
                 0                         // если coefficient = 0
```

### Использование calculateSupplyCost

```typescript
import { WildberriesSDK, calculateSupplyCost } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Расчёт затрат для склада Краснодар (ID: 507)
const result = await calculateSupplyCost(
  {
    volume: 5,           // Объём товара в литрах
    warehouseID: 507,    // ID склада
    days: 30,            // Период хранения в днях
    boxType: 'box'       // Тип упаковки: 'box' | 'pallet' | 'supersafe'
  },
  () => sdk.ordersFBW.getAcceptanceCoefficients()
);

console.log('=== Расчёт затрат на поставку ===');
console.log(`Склад: ${result.warehouseName}`);
console.log(`Приёмка: ${result.acceptanceCost} руб`);
console.log(`Хранение (${30} дней): ${result.storageCost} руб`);
console.log(`Логистика: ${result.logisticsCost} руб`);
console.log(`ИТОГО: ${result.totalCost} руб`);

console.log('\nПрименённые коэффициенты:');
console.log(`  Приёмка: ${result.appliedCoefficients.acceptance}`);
console.log(`  Хранение: ${result.appliedCoefficients.storage}%`);
console.log(`  Логистика: ${result.appliedCoefficients.delivery}%`);
```

### Пример вывода

```
=== Расчёт затрат на поставку ===
Склад: Краснодар (Тихорецкая)
Приёмка: 0 руб
Хранение (30 дней): 8.54 руб
Логистика: 193.44 руб
ИТОГО: 201.98 руб

Применённые коэффициенты:
  Приёмка: 0
  Хранение: 145%
  Логистика: 160%
```

### Сравнение затрат по нескольким складам

```typescript
interface WarehouseCostComparison {
  warehouseID: number;
  warehouseName: string;
  totalCost: number;
  acceptanceCost: number;
  storageCost: number;
  logisticsCost: number;
}

async function compareWarehouseCosts(
  sdk: WildberriesSDK,
  warehouseIDs: number[],
  volume: number,
  days: number
): Promise<WarehouseCostComparison[]> {
  const results: WarehouseCostComparison[] = [];

  for (const warehouseID of warehouseIDs) {
    try {
      const cost = await calculateSupplyCost(
        { volume, warehouseID, days, boxType: 'box' },
        () => sdk.ordersFBW.getAcceptanceCoefficients()
      );

      results.push({
        warehouseID,
        warehouseName: cost.warehouseName,
        totalCost: cost.totalCost,
        acceptanceCost: cost.acceptanceCost,
        storageCost: cost.storageCost,
        logisticsCost: cost.logisticsCost
      });
    } catch (error) {
      console.warn(`Склад ${warehouseID}: ${error.message}`);
    }
  }

  return results.sort((a, b) => a.totalCost - b.totalCost);
}

// Использование
const warehouseIDs = [507, 117986, 120762, 206348]; // Примеры ID складов
const comparison = await compareWarehouseCosts(sdk, warehouseIDs, 5, 30);

console.log('=== Сравнение затрат по складам (5л, 30 дней) ===');
for (const wh of comparison) {
  console.log(`${wh.warehouseName}: ${wh.totalCost} руб`);
  console.log(`  Приёмка: ${wh.acceptanceCost} | Хранение: ${wh.storageCost} | Логистика: ${wh.logisticsCost}`);
}
```

---

## Сравнение стратегий FBW vs FBS

### Когда использовать FBW (хранение на складе WB)

**Преимущества:**
- Быстрая доставка покупателю (1-2 дня)
- Меньше операционных затрат на логистику
- Доступ к программам продвижения WB
- Автоматическая обработка возвратов

**Недостатки:**
- Затраты на хранение при низкой оборачиваемости
- Зависимость от коэффициентов приёмки
- Меньше контроля над запасами

**Рекомендуется для:**
- Товаров с высокой оборачиваемостью (>10 продаж в месяц)
- Сезонных товаров в пик сезона
- Товаров с коротким сроком хранения

### Когда использовать FBS (хранение у продавца)

**Преимущества:**
- Полный контроль над запасами
- Нет затрат на хранение WB
- Гибкость в управлении ценами

**Недостатки:**
- Более долгая доставка покупателю
- Затраты на собственный склад и логистику
- Необходимость самостоятельной обработки возвратов

**Рекомендуется для:**
- Товаров с низкой оборачиваемостью
- Крупногабаритных товаров
- Товаров с высокой маржой

### Использование compareTariffs

```typescript
import { WildberriesSDK, compareTariffs } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Сравнить тарифы для склада Коледино
const comparison = await compareTariffs(
  {
    warehouseName: 'Коледино',
    date: new Date().toISOString().split('T')[0]
  },
  async () => {
    const response = await sdk.tariffs.getTariffsBox({
      date: new Date().toISOString().split('T')[0]
    });
    return response.response?.data?.warehouseList || [];
  },
  () => sdk.ordersFBW.getAcceptanceCoefficients()
);

console.log('=== Сравнение тарифов: Остаток vs Поставка ===');
console.log(`Склад: ${comparison.warehouseName}`);
console.log(`Дата: ${comparison.date}`);

console.log('\nТарифы на остаток (FBS/текущие товары):');
console.log(`  Логистика (база): ${comparison.inventory.deliveryBase} руб/л`);
console.log(`  Хранение (база): ${comparison.inventory.storageBase} руб/л/день`);

console.log('\nТарифы на поставку (FBW/новые товары):');
console.log(`  Логистика (база): ${comparison.supply.deliveryBase} руб/л`);
console.log(`  Хранение (база): ${comparison.supply.storageBase} руб/л/день`);

console.log('\nРазница (поставка vs остаток):');
console.log(`  Логистика: ${comparison.difference.deliveryBasePercent.toFixed(1)}%`);
console.log(`  Хранение: ${comparison.difference.storageBasePercent.toFixed(1)}%`);

// Рекомендация
const recommendations = {
  'SUPPLY_CHEAPER': 'Рекомендуется FBW (поставка на склад WB)',
  'INVENTORY_CHEAPER': 'Рекомендуется FBS (хранение у продавца)',
  'EQUAL': 'Тарифы равны, выбирайте по операционным критериям'
};

console.log(`\nРекомендация: ${recommendations[comparison.recommendation]}`);
```

### Пример вывода

```
=== Сравнение тарифов: Остаток vs Поставка ===
Склад: Коледино
Дата: 2025-01-25

Тарифы на остаток (FBS/текущие товары):
  Логистика (база): 73.6 руб/л
  Хранение (база): 0.1 руб/л/день

Тарифы на поставку (FBW/новые товары):
  Логистика (база): 75.9 руб/л
  Хранение (база): 0.13 руб/л/день

Разница (поставка vs остаток):
  Логистика: 3.1%
  Хранение: 30.0%

Рекомендация: Рекомендуется FBS (хранение у продавца)
```

---

## Полный рабочий процесс

### End-to-end пример: от проверки до выбора склада

```typescript
import {
  WildberriesSDK,
  calculateSupplyCost,
  compareTariffs
} from 'daytona-wildberries-typescript-sdk';

interface SupplyPlanResult {
  recommendedWarehouse: {
    id: number;
    name: string;
    date: string;
  };
  estimatedCosts: {
    acceptance: number;
    storage: number;
    logistics: number;
    total: number;
  };
  strategy: 'FBW' | 'FBS';
  reasoning: string[];
}

async function planSupply(
  sdk: WildberriesSDK,
  goods: Array<{ barcode: string; quantity: number }>,
  volume: number,
  storageDays: number
): Promise<SupplyPlanResult> {
  const reasoning: string[] = [];

  // Шаг 1: Получить все коэффициенты приёмки
  console.log('Шаг 1: Получение коэффициентов приёмки...');
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
  reasoning.push(`Получено ${coefficients.length} записей коэффициентов`);

  // Шаг 2: Найти склады с бесплатной приёмкой
  console.log('Шаг 2: Поиск бесплатной приёмки...');
  const freeAcceptance = coefficients.filter(c =>
    c.coefficient === 0 &&
    c.allowUnload === true &&
    c.boxTypeName === 'Короба'
  );

  if (freeAcceptance.length > 0) {
    reasoning.push(`Найдено ${freeAcceptance.length} слотов с бесплатной приёмкой`);
  } else {
    reasoning.push('Бесплатная приёмка недоступна, ищем минимальный коэффициент');
  }

  // Шаг 3: Выбрать лучший склад по затратам
  console.log('Шаг 3: Расчёт затрат по складам...');

  const candidateWarehouses = freeAcceptance.length > 0
    ? freeAcceptance
    : coefficients
        .filter(c => c.coefficient !== -1 && c.allowUnload && c.boxTypeName === 'Короба')
        .sort((a, b) => (a.coefficient || 0) - (b.coefficient || 0))
        .slice(0, 10);

  let bestOption: {
    coefficient: typeof coefficients[0];
    cost: Awaited<ReturnType<typeof calculateSupplyCost>>;
  } | null = null;

  for (const coef of candidateWarehouses) {
    try {
      const cost = await calculateSupplyCost(
        { volume, warehouseID: coef.warehouseID!, days: storageDays, boxType: 'box' },
        () => Promise.resolve(coefficients)
      );

      if (!bestOption || cost.totalCost < bestOption.cost.totalCost) {
        bestOption = { coefficient: coef, cost };
      }
    } catch (e) {
      // Пропускаем склады с ошибками
    }
  }

  if (!bestOption) {
    throw new Error('Не найдено подходящих складов для поставки');
  }

  reasoning.push(`Выбран склад: ${bestOption.cost.warehouseName} с затратами ${bestOption.cost.totalCost} руб`);

  // Шаг 4: Сравнить FBW vs FBS
  console.log('Шаг 4: Сравнение FBW vs FBS...');

  let strategy: 'FBW' | 'FBS' = 'FBW';

  try {
    const tariffComparison = await compareTariffs(
      {
        warehouseName: bestOption.cost.warehouseName,
        date: bestOption.coefficient.date!
      },
      async () => {
        const response = await sdk.tariffs.getTariffsBox({
          date: bestOption!.coefficient.date!
        });
        return response.response?.data?.warehouseList || [];
      },
      () => Promise.resolve(coefficients)
    );

    if (tariffComparison.recommendation === 'INVENTORY_CHEAPER') {
      strategy = 'FBS';
      reasoning.push('FBS рекомендуется: тарифы на остаток ниже');
    } else {
      reasoning.push('FBW рекомендуется: тарифы на поставку выгоднее');
    }
  } catch (e) {
    reasoning.push('Сравнение тарифов недоступно, используем FBW по умолчанию');
  }

  return {
    recommendedWarehouse: {
      id: bestOption.coefficient.warehouseID!,
      name: bestOption.cost.warehouseName,
      date: bestOption.coefficient.date!
    },
    estimatedCosts: {
      acceptance: bestOption.cost.acceptanceCost,
      storage: bestOption.cost.storageCost,
      logistics: bestOption.cost.logisticsCost,
      total: bestOption.cost.totalCost
    },
    strategy,
    reasoning
  };
}

// Использование
const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const plan = await planSupply(
  sdk,
  [{ barcode: '1234567890123', quantity: 100 }],
  5,   // 5 литров
  30   // 30 дней хранения
);

console.log('\n=== ПЛАН ПОСТАВКИ ===');
console.log(`Рекомендуемый склад: ${plan.recommendedWarehouse.name} (ID: ${plan.recommendedWarehouse.id})`);
console.log(`Дата поставки: ${plan.recommendedWarehouse.date}`);
console.log(`Стратегия: ${plan.strategy}`);

console.log('\nОценка затрат:');
console.log(`  Приёмка: ${plan.estimatedCosts.acceptance} руб`);
console.log(`  Хранение: ${plan.estimatedCosts.storage} руб`);
console.log(`  Логистика: ${plan.estimatedCosts.logistics} руб`);
console.log(`  ИТОГО: ${plan.estimatedCosts.total} руб`);

console.log('\nОбоснование:');
plan.reasoning.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));
```

---

## Обработка ошибок

### Типичные ошибки и их обработка

```typescript
import {
  WildberriesSDK,
  calculateSupplyCost,
  RateLimitError,
  AuthenticationError,
  ValidationError
} from 'daytona-wildberries-typescript-sdk';

async function safeCalculateCost(
  sdk: WildberriesSDK,
  warehouseID: number,
  volume: number,
  days: number
) {
  try {
    return await calculateSupplyCost(
      { volume, warehouseID, days, boxType: 'box' },
      () => sdk.ordersFBW.getAcceptanceCoefficients()
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Ошибка авторизации: проверьте API ключ');
      throw error;
    }

    if (error instanceof RateLimitError) {
      console.error('Превышен лимит запросов, повторите через 10 секунд');
      throw error;
    }

    if (error instanceof ValidationError) {
      console.error('Ошибка валидации:', error.message);
      throw error;
    }

    // Специфичные ошибки расчёта
    if (error.message.includes('not found')) {
      console.error(`Склад с ID ${warehouseID} не найден`);
      return null;
    }

    if (error.message.includes('unavailable')) {
      console.error(`Приёмка на склад ${warehouseID} временно недоступна`);
      return null;
    }

    throw error;
  }
}
```

---

## Rate Limits

| Метод | Лимит | Интервал |
|-------|-------|----------|
| `getAcceptanceCoefficients()` | 6 запросов/мин | 10 секунд |
| `createAcceptanceOption()` | 6 запросов/мин | 10 секунд |
| `warehouses()` | 6 запросов/мин | 10 секунд |
| `transitTariffs()` | 6 запросов/мин | 10 секунд |

**Рекомендация:** Кешируйте результаты `getAcceptanceCoefficients()` на 10-15 минут для оптимизации запросов.

---

## Связанные документы

- [Обзор тарифов](./tariffs-overview.md) - Различия между тарифами на остаток и поставку
- [Комиссии и сборы](./commissions-fees.md) - Расчёт комиссий Wildberries
- [Платное хранение](./storage-fees-integration.md) - Интеграция с платным хранением
- [API Reference: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [API Reference: TariffsModule](/api/classes/TariffsModule)

---

[Back to Guides](./index.md)

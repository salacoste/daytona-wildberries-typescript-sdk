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

### Обзор доступных методов

```typescript
// Получить коэффициенты приёмки на 14 дней вперёд
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Проверить доступность приёмки для конкретных товаров
const options = await sdk.ordersFBW.createAcceptanceOption(goods, { warehouseID: '507' });

// Получить список складов WB
const warehouses = await sdk.ordersFBW.warehouses();

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

---

## Поиск оптимальных дат доставки

### Получение коэффициентов приёмки

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить все коэффициенты на ближайшие 14 дней
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

console.log(`Получено ${coefficients.length} записей коэффициентов`);
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
      (!boxType || c.boxTypeName === boxType)
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

- [Обзор тарифов](./tariffs-overview) - Различия между тарифами на остаток и поставку
- [Комиссии и сборы](./commissions-fees) - Расчёт комиссий Wildberries
- [Платное хранение](./storage-fees-integration) - Интеграция с платным хранением
- [API Reference: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [API Reference: TariffsModule](/api/classes/TariffsModule)

---

[← Назад к руководствам](./index)

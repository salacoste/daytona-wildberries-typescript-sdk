# Commissions & Fees Guide

Руководство по получению данных о комиссиях, тарифах и удержаниях через Wildberries SDK.

## Overview

SDK предоставляет полный доступ к тарифной информации WB:
- Комиссии по категориям товаров
- Тарифы на логистику (коробы, монопаллеты)
- Тарифы на хранение
- Тарифы на возврат товаров

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить комиссии по категориям
const commissions = await sdk.tariffs.getTariffsCommission();

// Получить тарифы на логистику
const boxTariffs = await sdk.tariffs.getTariffsBox({ date: '2024-12-01' });

// Получить тарифы на возврат
const returnTariffs = await sdk.tariffs.getTariffsReturn({ date: '2024-12-01' });
```

---

## Комиссии по категориям

### `getTariffsCommission(options?)`

**Модуль:** `sdk.tariffs`

Возвращает комиссии WB по родительским категориям товаров согласно модели продаж.

| Параметр | Тип | Описание |
|----------|-----|----------|
| `locale` | string | Локаль (ru, en, zh и др.) |

**Rate Limit:** 1 запрос в минуту

### Модели продаж и комиссии

| Поле | Модель продаж | Описание |
|------|---------------|----------|
| `paidStorageKgvp` | FBW (Склад WB) | Товары хранятся и отправляются со склада WB |
| `kgvpMarketplace` | FBS (Маркетплейс) | Продавец хранит товары, WB доставляет |
| `kgvpSupplier` | DBS/DBW (Витрина) | Продавец хранит и доставляет |
| `kgvpSupplierExpress` | EDBS (Витрина экспресс) | Экспресс-доставка продавцом |
| `kgvpPickup` | C&C (Самовывоз) | Самовывоз из магазина продавца |
| `kgvpBooking` | Бронирование | Бронирование товара |

### Пример: Получение комиссий

```typescript
async function getCommissionRates(sdk: WildberriesSDK) {
  const result = await sdk.tariffs.getTariffsCommission({ locale: 'ru' });

  // result содержит Commission | CommissionChina | CommissionTurkey | и др.
  if ('report' in result && result.report) {
    for (const item of result.report) {
      console.log(`Категория: ${item.parentName} → ${item.subjectName}`);
      console.log(`  FBW комиссия: ${item.paidStorageKgvp}%`);
      console.log(`  FBS комиссия: ${item.kgvpMarketplace}%`);
      console.log(`  DBS комиссия: ${item.kgvpSupplier}%`);
    }
  }
}
```

### Пример: Поиск комиссии для конкретной категории

```typescript
interface CommissionInfo {
  parentName: string;
  subjectName: string;
  fbwCommission: number;
  fbsCommission: number;
  dbsCommission: number;
}

async function findCategoryCommission(
  sdk: WildberriesSDK,
  categoryName: string
): Promise<CommissionInfo | null> {
  const result = await sdk.tariffs.getTariffsCommission();

  if (!('report' in result) || !result.report) {
    return null;
  }

  const category = result.report.find(item =>
    item.subjectName?.toLowerCase().includes(categoryName.toLowerCase()) ||
    item.parentName?.toLowerCase().includes(categoryName.toLowerCase())
  );

  if (!category) return null;

  return {
    parentName: category.parentName || '',
    subjectName: category.subjectName || '',
    fbwCommission: category.paidStorageKgvp || 0,
    fbsCommission: category.kgvpMarketplace || 0,
    dbsCommission: category.kgvpSupplier || 0
  };
}

// Использование
const electronics = await findCategoryCommission(sdk, 'Электроника');
if (electronics) {
  console.log(`Комиссия FBW для ${electronics.subjectName}: ${electronics.fbwCommission}%`);
}
```

---

## Тарифы на логистику (Коробы)

### `getTariffsBox(options)`

Возвращает тарифы на логистику и хранение для товаров в коробах.

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `date` | string | Да | Дата (YYYY-MM-DD) |

**Rate Limit:** 60 запросов в минуту

### Структура тарифов

```typescript
interface WarehouseBoxRates {
  warehouseName: string;       // Название склада
  geoName: string;             // Регион/округ

  // Логистика FBW
  boxDeliveryBase: string;     // Базовая ставка за 1 литр
  boxDeliveryLiter: string;    // Доп. литр
  boxDeliveryCoefExpr: string; // Коэффициент

  // Логистика FBS
  boxDeliveryMarketplaceBase: string;  // Базовая ставка FBS
  boxDeliveryMarketplaceLiter: string; // Доп. литр FBS
  boxDeliveryMarketplaceCoefExpr: string; // Коэффициент FBS

  // Хранение
  boxStorageBase: string;      // Хранение 1 литр/день
  boxStorageLiter: string;     // Доп. литр/день
  boxStorageCoefExpr: string;  // Коэффициент хранения
}
```

### Пример: Сравнение тарифов по складам

```typescript
interface WarehouseTariffSummary {
  warehouse: string;
  region: string;
  deliveryBase: number;
  deliveryPerLiter: number;
  storagePerDay: number;
  fbsDeliveryBase: number;
}

async function compareWarehouseTariffs(
  sdk: WildberriesSDK,
  date: string
): Promise<WarehouseTariffSummary[]> {
  const result = await sdk.tariffs.getTariffsBox({ date });

  const warehouses = result.response?.data?.warehouseList || [];

  return warehouses.map(wh => ({
    warehouse: wh.warehouseName || '',
    region: wh.geoName || '',
    deliveryBase: parseFloat(wh.boxDeliveryBase || '0'),
    deliveryPerLiter: parseFloat(wh.boxDeliveryLiter || '0'),
    storagePerDay: parseFloat(wh.boxStorageBase || '0'),
    fbsDeliveryBase: parseFloat(wh.boxDeliveryMarketplaceBase || '0')
  })).sort((a, b) => a.deliveryBase - b.deliveryBase);
}

// Использование
const tariffs = await compareWarehouseTariffs(sdk, '2024-12-01');

console.log('=== Тарифы по складам (сортировка по стоимости доставки) ===');
tariffs.forEach(t => {
  console.log(`${t.warehouse} (${t.region}):`);
  console.log(`  Доставка: ${t.deliveryBase}₽/л + ${t.deliveryPerLiter}₽/доп.л`);
  console.log(`  Хранение: ${t.storagePerDay}₽/л/день`);
  console.log(`  FBS доставка: ${t.fbsDeliveryBase}₽/л`);
});
```

### Пример: Расчёт стоимости логистики

```typescript
interface LogisticsCost {
  delivery: number;
  storage: number;
  total: number;
}

function calculateLogisticsCost(
  warehouseTariffs: {
    deliveryBase: number;
    deliveryPerLiter: number;
    storagePerDay: number;
  },
  productVolumeLiters: number,
  storageDays: number
): LogisticsCost {
  // Расчёт доставки: базовая + доп. литры
  const delivery = warehouseTariffs.deliveryBase +
    (productVolumeLiters - 1) * warehouseTariffs.deliveryPerLiter;

  // Расчёт хранения: (базовая + доп. литры) * дни
  const dailyStorage = warehouseTariffs.storagePerDay +
    (productVolumeLiters - 1) * warehouseTariffs.storagePerDay;
  const storage = dailyStorage * storageDays;

  return {
    delivery: Math.round(delivery * 100) / 100,
    storage: Math.round(storage * 100) / 100,
    total: Math.round((delivery + storage) * 100) / 100
  };
}

// Использование
const cost = calculateLogisticsCost(
  { deliveryBase: 50, deliveryPerLiter: 5, storagePerDay: 2 },
  5,  // 5 литров объём
  30  // 30 дней хранения
);

console.log(`Доставка: ${cost.delivery}₽`);
console.log(`Хранение (30 дней): ${cost.storage}₽`);
console.log(`Итого: ${cost.total}₽`);
```

---

## Тарифы на монопаллеты

### `getTariffsPallet(options)`

Тарифы для крупногабаритных товаров на монопаллетах.

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `date` | string | Да | Дата (YYYY-MM-DD) |

**Rate Limit:** 60 запросов в минуту

### Пример

```typescript
async function getPalletTariffs(sdk: WildberriesSDK) {
  const result = await sdk.tariffs.getTariffsPallet({ date: '2024-12-01' });

  const warehouses = result.response?.data?.warehouseList || [];

  for (const wh of warehouses) {
    console.log(`Склад: ${wh.warehouseName}`);
    console.log(`  Доставка 1л: ${wh.palletDeliveryValueBase}₽`);
    console.log(`  Доп. литр: ${wh.palletDeliveryValueLiter}₽`);
    console.log(`  Хранение паллеты: ${wh.palletStorageValueExpr}₽`);
  }
}
```

---

## Тарифы на возврат

### `getTariffsReturn(options)`

Тарифы на возврат товаров продавцу.

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `date` | string | Да | Дата (YYYY-MM-DD) |

**Rate Limit:** 60 запросов в минуту

### Типы возвратов

| Тип | Описание |
|-----|----------|
| Возврат по инициативе продавца | Продавец хочет забрать товары со склада WB |
| Возврат брака | Обнаружен брак на складе |
| Возврат от покупателя | Покупатель вернул товар, нельзя продать повторно |
| Автовозврат Маркетплейс | Автоматический возврат товаров FBS |
| Неопознанный товар | Товар не смогли принять на складе |

### Пример: Анализ тарифов на возврат

```typescript
interface ReturnCosts {
  warehouse: string;
  toPickupPoint: number;      // Доставка на ПВЗ
  toPickupPointPerLiter: number;
  byCourier: number;          // Курьером
  byCourierPerLiter: number;
  unclaimed: number;          // Невостребованный возврат
}

async function getReturnCosts(
  sdk: WildberriesSDK,
  date: string
): Promise<ReturnCosts[]> {
  const result = await sdk.tariffs.getTariffsReturn({ date });

  const warehouses = result.response?.data?.warehouseList || [];

  return warehouses.map(wh => ({
    warehouse: wh.warehouseName || '',
    toPickupPoint: parseFloat(wh.deliveryDumpSupOfficeBase || '0'),
    toPickupPointPerLiter: parseFloat(wh.deliveryDumpSupOfficeLiter || '0'),
    byCourier: parseFloat(wh.deliveryDumpSupCourierBase || '0'),
    byCourierPerLiter: parseFloat(wh.deliveryDumpSupCourierLiter || '0'),
    unclaimed: parseFloat(wh.deliveryDumpSupReturnExpr || '0')
  }));
}

// Использование
const returnCosts = await getReturnCosts(sdk, '2024-12-01');

console.log('=== Тарифы на возврат ===');
returnCosts.forEach(r => {
  console.log(`${r.warehouse}:`);
  console.log(`  На ПВЗ: ${r.toPickupPoint}₽ + ${r.toPickupPointPerLiter}₽/л`);
  console.log(`  Курьером: ${r.byCourier}₽ + ${r.byCourierPerLiter}₽/л`);
  console.log(`  Невостребованный: ${r.unclaimed}₽`);
});
```

---

## Комплексный анализ затрат

### Калькулятор unit-экономики

```typescript
interface UnitEconomics {
  revenue: number;           // Выручка
  commission: number;        // Комиссия WB
  logistics: number;         // Логистика
  storage: number;           // Хранение
  returnCost: number;        // Возможный возврат
  profit: number;            // Прибыль
  marginPercent: number;     // Маржинальность
}

async function calculateUnitEconomics(
  sdk: WildberriesSDK,
  params: {
    sellingPrice: number;          // Цена продажи
    costPrice: number;             // Себестоимость
    categoryName: string;          // Категория
    volumeLiters: number;          // Объём товара
    avgStorageDays: number;        // Среднее хранение
    returnRate: number;            // % возвратов (0-1)
    warehouseName: string;         // Название склада
    date: string;                  // Дата для тарифов
  }
): Promise<UnitEconomics> {
  // Получаем все данные параллельно
  const [commissions, boxTariffs, returnTariffs] = await Promise.all([
    sdk.tariffs.getTariffsCommission(),
    sdk.tariffs.getTariffsBox({ date: params.date }),
    sdk.tariffs.getTariffsReturn({ date: params.date })
  ]);

  // Находим комиссию по категории
  let commissionRate = 15; // Default 15%
  if ('report' in commissions && commissions.report) {
    const category = commissions.report.find(c =>
      c.subjectName?.toLowerCase().includes(params.categoryName.toLowerCase())
    );
    if (category) {
      commissionRate = category.paidStorageKgvp || 15;
    }
  }

  // Находим тарифы склада
  const warehouse = boxTariffs.response?.data?.warehouseList?.find(
    w => w.warehouseName === params.warehouseName
  );

  const deliveryBase = parseFloat(warehouse?.boxDeliveryBase || '50');
  const deliveryLiter = parseFloat(warehouse?.boxDeliveryLiter || '5');
  const storageBase = parseFloat(warehouse?.boxStorageBase || '2');

  // Находим тариф на возврат
  const returnWh = returnTariffs.response?.data?.warehouseList?.find(
    w => w.warehouseName === params.warehouseName
  );
  const returnBase = parseFloat(returnWh?.deliveryDumpSupOfficeBase || '50');

  // Расчёты
  const revenue = params.sellingPrice;
  const commission = revenue * (commissionRate / 100);
  const logistics = deliveryBase + (params.volumeLiters - 1) * deliveryLiter;
  const storage = (storageBase + (params.volumeLiters - 1) * storageBase) * params.avgStorageDays;
  const returnCost = returnBase * params.returnRate;

  const totalCosts = params.costPrice + commission + logistics + storage + returnCost;
  const profit = revenue - totalCosts;
  const marginPercent = (profit / revenue) * 100;

  return {
    revenue,
    commission: Math.round(commission * 100) / 100,
    logistics: Math.round(logistics * 100) / 100,
    storage: Math.round(storage * 100) / 100,
    returnCost: Math.round(returnCost * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    marginPercent: Math.round(marginPercent * 10) / 10
  };
}

// Использование
const economics = await calculateUnitEconomics(sdk, {
  sellingPrice: 2000,
  costPrice: 800,
  categoryName: 'Футболки',
  volumeLiters: 2,
  avgStorageDays: 45,
  returnRate: 0.15, // 15% возвратов
  warehouseName: 'Коледино',
  date: '2024-12-01'
});

console.log('=== Unit-экономика ===');
console.log(`Выручка:      ${economics.revenue}₽`);
console.log(`Комиссия WB:  -${economics.commission}₽`);
console.log(`Логистика:    -${economics.logistics}₽`);
console.log(`Хранение:     -${economics.storage}₽`);
console.log(`Возвраты:     -${economics.returnCost}₽`);
console.log(`---`);
console.log(`Прибыль:      ${economics.profit}₽`);
console.log(`Маржа:        ${economics.marginPercent}%`);
```

---

## Мониторинг изменений тарифов

```typescript
interface TariffChange {
  warehouse: string;
  field: string;
  oldValue: number;
  newValue: number;
  changePercent: number;
}

async function detectTariffChanges(
  sdk: WildberriesSDK,
  dateOld: string,
  dateNew: string
): Promise<TariffChange[]> {
  const [oldTariffs, newTariffs] = await Promise.all([
    sdk.tariffs.getTariffsBox({ date: dateOld }),
    sdk.tariffs.getTariffsBox({ date: dateNew })
  ]);

  const changes: TariffChange[] = [];

  const oldList = oldTariffs.response?.data?.warehouseList || [];
  const newList = newTariffs.response?.data?.warehouseList || [];

  for (const newWh of newList) {
    const oldWh = oldList.find(w => w.warehouseName === newWh.warehouseName);
    if (!oldWh) continue;

    const fields = [
      { name: 'boxDeliveryBase', label: 'Доставка (база)' },
      { name: 'boxStorageBase', label: 'Хранение (база)' }
    ];

    for (const field of fields) {
      const oldVal = parseFloat((oldWh as any)[field.name] || '0');
      const newVal = parseFloat((newWh as any)[field.name] || '0');

      if (oldVal !== newVal) {
        changes.push({
          warehouse: newWh.warehouseName || '',
          field: field.label,
          oldValue: oldVal,
          newValue: newVal,
          changePercent: ((newVal - oldVal) / oldVal) * 100
        });
      }
    }
  }

  return changes.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
}

// Использование
const changes = await detectTariffChanges(sdk, '2024-11-01', '2024-12-01');

if (changes.length > 0) {
  console.log('=== Изменения тарифов ===');
  changes.forEach(c => {
    const arrow = c.changePercent > 0 ? '↑' : '↓';
    console.log(`${c.warehouse} - ${c.field}: ${c.oldValue}₽ → ${c.newValue}₽ (${arrow}${Math.abs(c.changePercent).toFixed(1)}%)`);
  });
} else {
  console.log('Изменений тарифов не обнаружено');
}
```

---

## Rate Limits

| Метод | Лимит | Интервал |
|-------|-------|----------|
| `getTariffsCommission` | 1 запрос | 1 минута |
| `getTariffsBox` | 60 запросов | 1 минута |
| `getTariffsPallet` | 60 запросов | 1 минута |
| `getTariffsReturn` | 60 запросов | 1 минута |

---

## Связанные материалы

- [Storage Fees Integration](./storage-fees-integration.md) - Платное хранение
- [Realization Report](./realization-report.md) - Отчёт о реализации с комиссиями
- [API Reference: TariffsModule](/api/classes/TariffsModule)

---

[← Back to Guides](./index.md)

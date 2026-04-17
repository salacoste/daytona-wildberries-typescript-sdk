---
title: Руководство по началу работы с заказами FBW
description: Полное руководство по использованию модуля Orders FBW (Fulfillment by Wildberries) для планирования поставок и управления складами
layout: doc
---

# Руководство по началу работы с заказами FBW

Это руководство охватывает всё, что нужно знать для работы с поставками FBW (Fulfillment by Wildberries) в TypeScript SDK Wildberries.

> **Уведомление об устаревании**: Метод `getAcceptanceCoefficients()` перенесён в модуль тарифов на `common-api.wildberries.ru`. Метод `createSupply()` является псевдонимом для `listSupplies()` и будет удалён в v3.0.0. Подробности в разделе [Устаревшие методы](#устаревшие-методы).

## Содержание

- [Что такое FBW?](#что-такое-fbw)
- [FBW vs FBS vs DBS](#fbw-vs-fbs-vs-dbs)
- [Быстрый старт](#быстрый-старт)
- [Доступные методы](#доступные-методы)
- [Типовые сценарии работы](#типовые-сценарии-работы)
- [Устаревшие методы](#устаревшие-методы)
- [Обработка ошибок](#обработка-ошибок)
- [Лимиты запросов](#лимиты-запросов)
- [Дальнейшие шаги](#дальнейшие-шаги)

## Что такое FBW?

**FBW (Fulfillment by Wildberries)** — это модель фулфилмента, при которой Wildberries берёт на себя:

1. **Хранение**: Товары хранятся на складах Wildberries
2. **Доставку**: Wildberries доставляет в пункты выдачи и покупателям

Продавец отвечает за планирование и отправку поставок на склады WB. Этот модуль предоставляет инструменты для управления этим процессом: проверка доступности приёмки, поиск складов, создание и отслеживание поставок.

### Ключевые возможности FBW

| Возможность | Описание |
|-------------|----------|
| **Коэффициенты приёмки** | Ежедневные ценовые множители, определяющие стоимость приёмки поставки |
| **Варианты приёмки** | Проверка доступных складов и типов упаковки для ваших товаров |
| **Поиск складов** | Список всех складов WB с адресами, часами работы и возможностями |
| **Транзитные тарифы** | Тарифы на транзитные маршруты между складами |
| **Управление поставками** | Просмотр, фильтрация и детальная информация о поставках, товарах и упаковке |

## FBW vs FBS vs DBS

| Аспект | FBW | FBS | DBS |
|--------|-----|-----|-----|
| Хранение | Склад Wildberries | Склад продавца | Склад продавца |
| Доставка | Wildberries | Wildberries (от продавца) | Продавец напрямую |
| Адрес покупателя | Пункт выдачи | Пункт выдачи | Полный адрес + GPS |
| Телефон покупателя | Недоступен | Недоступен | Доступен |
| Скорость доставки | Самая быстрая (1-2 дня) | Средняя (2-5 дней) | Определяется продавцом |
| Контроль запасов | Ограниченный | Полный | Полный |
| Модуль SDK | `sdk.ordersFBW` | `sdk.ordersFBS` | `sdk.ordersDBS` |

**Выбирайте FBW, когда:**
- Вы хотите обеспечить максимально быструю доставку покупателям
- Ваши товары имеют высокую оборачиваемость (10+ продаж в месяц)
- Вы хотите, чтобы Wildberries обеспечивал хранение и возвраты
- Вы можете планировать и отправлять поставки по регулярному графику

**Выбирайте FBS, когда:**
- Вам нужен полный контроль над запасами
- Ваши товары имеют низкую оборачиваемость или длительный срок хранения
- Вы хотите избежать оплаты хранения на складах WB

## Быстрый старт

### Установка

```bash
npm install daytona-wildberries-typescript-sdk
```

### Базовая настройка

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Список всех складов WB
const warehouses = await sdk.ordersFBW.warehouses();
console.log(`Найдено ${warehouses.length} складов`);
```

### Настройка окружения

Создайте файл `.env`:

```bash
WB_API_KEY=your_api_key_here
```

## Доступные методы

### Планирование поставок

| Метод | Описание | Лимит запросов |
|-------|----------|----------------|
| `getAcceptanceCoefficients(options?)` | Получить коэффициенты приёмки на ближайшие 14 дней | 6 в мин, интервал 10 с |
| `createAcceptanceOption(data, options?)` | Проверить доступные склады и типы упаковки для ваших товаров | 6 в мин, интервал 10 с |
| `warehouses()` | Список всех складов WB | 6 в мин, интервал 10 с |
| `transitTariffs()` | Получить доступные транзитные маршруты и тарифы | 6 в мин, интервал 10 с |

### Управление поставками

| Метод | Описание | Лимит запросов |
|-------|----------|----------------|
| `listSupplies(data, options?)` | Список поставок с фильтрами и пагинацией | 30 в мин, интервал 2 с |
| `getSupply(ID, options?)` | Получить детальную информацию о конкретной поставке | 30 в мин, интервал 2 с |
| `getSuppliesGood(ID, options?)` | Получить товары в поставке | 30 в мин, интервал 2 с |
| `getSuppliesPackage(ID)` | Получить информацию об упаковке поставки | 30 в мин, интервал 2 с |

### Устаревшие

| Метод | Замена |
|-------|--------|
| `createSupply(data, options?)` | Используйте `listSupplies()` -- идентичная функциональность, будет удалён в v3.0.0 |

## Типовые сценарии работы

### Планирование поставок: коэффициенты, варианты и создание

Типичный сценарий работы с FBW начинается с проверки доступности приёмки, затем проверки вариантов складов для конкретных товаров и, наконец, создания поставки.

#### Шаг 1: Проверка коэффициентов приёмки

Коэффициенты приёмки определяют стоимость приёмки вашей поставки на складе WB. Они меняются ежедневно и доступны на 14 дней вперёд.

```typescript
import type { ModelsAcceptanceCoefficient } from 'daytona-wildberries-typescript-sdk';

// Получить все коэффициенты на ближайшие 14 дней
const coefficients: ModelsAcceptanceCoefficient[] =
  await sdk.ordersFBW.getAcceptanceCoefficients();

// Фильтр по конкретному складу
const coefficientsForWarehouse: ModelsAcceptanceCoefficient[] =
  await sdk.ordersFBW.getAcceptanceCoefficients({ warehouseIDs: '507' });

// Найти дни с бесплатной приёмкой (коэффициент = 0 И разгрузка разрешена)
const freeAcceptanceDays = coefficients.filter(c =>
  c.coefficient === 0 &&
  c.allowUnload === true &&
  c.boxTypeName === 'Короба'
);

for (const day of freeAcceptanceDays) {
  console.log(`${day.date}: ${day.warehouseName} (${day.boxTypeName})`);
  console.log(`  Коэф. хранения: ${day.storageCoef}%`);
  console.log(`  Коэф. доставки: ${day.deliveryCoef}%`);
}
```

**Значения коэффициентов:**

| Коэффициент | Значение | Рекомендация |
|-------------|----------|--------------|
| `-1` | Приёмка недоступна | Выберите другую дату или склад |
| `0` | Бесплатная приёмка | Лучший вариант |
| `1` | Стандартная стоимость (базовая ставка) | Допустимо |
| `>1` | Повышенная стоимость | Рассмотрите альтернативы |

**Важно:** Приёмка доступна только при выполнении обоих условий: `coefficient` равен `0` или положительный, И `allowUnload` равен `true`.

#### Шаг 2: Проверка вариантов приёмки для ваших товаров

Перед созданием поставки убедитесь, какие склады могут принять ваши конкретные товары и какие типы упаковки доступны.

```typescript
import type { ModelsGood, ModelsOptionsResultModel } from 'daytona-wildberries-typescript-sdk';

const goods: ModelsGood[] = [
  { barcode: '1234567891234', quantity: 100 },
  { barcode: '9876543210987', quantity: 50 }
];

// Проверить, какие склады принимают эти товары
const options: ModelsOptionsResultModel =
  await sdk.ordersFBW.createAcceptanceOption(goods);

// Или проверить конкретный склад
const warehouseOptions: ModelsOptionsResultModel =
  await sdk.ordersFBW.createAcceptanceOption(goods, { warehouseID: '507' });

// Обработка результатов по штрихкоду
for (const item of options.result ?? []) {
  if (item.isError) {
    console.error(`Штрихкод ${item.barcode}: ${item.error?.detail}`);
    continue;
  }

  console.log(`Штрихкод ${item.barcode}:`);
  for (const wh of item.warehouses ?? []) {
    console.log(`  Склад ${wh.warehouseID}:`);
    console.log(`    Короба: ${wh.canBox ? 'да' : 'нет'}`);
    console.log(`    Монопаллеты: ${wh.canMonopallet ? 'да' : 'нет'}`);
    console.log(`    Суперсейф: ${wh.canSupersafe ? 'да' : 'нет'}`);
  }
}
```

#### Шаг 3: Просмотр существующих поставок

После планирования просмотрите существующие поставки для отслеживания их статуса.

```typescript
import type {
  ModelsSuppliesFiltersRequest,
  ModelsSupply
} from 'daytona-wildberries-typescript-sdk';

// Список последних поставок (по умолчанию: последние 1000)
const filters: ModelsSuppliesFiltersRequest = {};
const supplies: ModelsSupply[] = await sdk.ordersFBW.listSupplies(filters);

console.log(`Всего поставок: ${supplies.length}`);

for (const supply of supplies) {
  const id = supply.supplyID ?? supply.preorderID;
  console.log(`Поставка ${id}: ${supply.statusName} (создана ${supply.createDate})`);
}
```

**Фильтрация по статусу и дате:**

```typescript
const filteredSupplies: ModelsSupply[] = await sdk.ordersFBW.listSupplies(
  {
    statusIDs: [2, 3],  // Запланирована + Отгрузка разрешена
    dates: [{
      type: 'supplyDate',
      from: '2025-01-01T00:00:00Z',
      till: '2025-01-31T23:59:59Z'
    }]
  },
  { limit: 100, offset: 0 }
);
```

**Значения статусов поставок:**

| ID статуса | Название | Значение |
|------------|----------|----------|
| `1` | Не запланирована | Поставка создана, но не запланирована |
| `2` | Запланирована | Поставка назначена на дату |
| `3` | Отгрузка разрешена | Готова к отправке на склад |
| `4` | Идёт приёмка | Склад принимает товары |
| `5` | Принята | Все товары приняты и обработаны |
| `6` | Отгружена на воротах | Товары прибыли на ворота склада |

### Мониторинг поставок: детали, товары и упаковка

После создания поставки можно просмотреть полные детали, проверить товары и информацию об упаковке.

#### Получение деталей поставки

```typescript
import type { ModelsSupplyDetails } from 'daytona-wildberries-typescript-sdk';

const supplyId = 12345;
const details: ModelsSupplyDetails = await sdk.ordersFBW.getSupply(supplyId);

console.log(`Поставка ${supplyId}:`);
console.log(`  Статус: ${details.statusName} (ID: ${details.statusID})`);
console.log(`  Склад: ${details.warehouseName} (ID: ${details.warehouseID})`);
console.log(`  Создана: ${details.createDate}`);
console.log(`  Плановая отгрузка: ${details.supplyDate}`);
console.log(`  Фактическая отгрузка: ${details.factDate ?? 'ещё нет'}`);
console.log(`  Тип упаковки: ${details.boxTypeName}`);
console.log(`  Стоимость приёмки: ${details.acceptanceCost} руб.`);
console.log(`  Коэффициент приёмки: ${details.paidAcceptanceCoefficient}`);
console.log(`  Количество:`);
console.log(`    В поставке: ${details.quantity}`);
console.log(`    Принято: ${details.acceptedQuantity}`);
console.log(`    Готово к продаже: ${details.readyForSaleQuantity}`);
console.log(`    На разгрузке: ${details.unloadingQuantity}`);

// Для предзаказов используйте флаг isPreorderID
const preorderDetails: ModelsSupplyDetails =
  await sdk.ordersFBW.getSupply(67890, { isPreorderID: true });
```

#### Проверка товаров в поставке

```typescript
import type { ModelsGoodInSupply } from 'daytona-wildberries-typescript-sdk';

const goods: ModelsGoodInSupply[] =
  await sdk.ordersFBW.getSuppliesGood(supplyId);

for (const good of goods) {
  console.log(`${good.vendorCode} (${good.barcode}):`);
  console.log(`  Артикул WB: ${good.nmID}`);
  console.log(`  Количество в поставке: ${good.quantity}`);
  console.log(`  Принято: ${good.acceptedQuantity}`);
  console.log(`  Готово к продаже: ${good.readyForSaleQuantity}`);
  console.log(`  Требуется маркировка: ${good.needKiz ? 'да' : 'нет'}`);
  if (good.tnved) {
    console.log(`  Код ТН ВЭД: ${good.tnved}`);
  }
}

// С пагинацией для крупных поставок
const goodsPage: ModelsGoodInSupply[] =
  await sdk.ordersFBW.getSuppliesGood(supplyId, { limit: 50, offset: 0 });
```

#### Проверка упаковки поставки

```typescript
import type { ModelsBox } from 'daytona-wildberries-typescript-sdk';

const packages: ModelsBox[] = await sdk.ordersFBW.getSuppliesPackage(supplyId);

for (const box of packages) {
  console.log(`Упаковка ${box.packageCode}: ${box.quantity} единиц`);

  for (const item of box.barcodes ?? []) {
    console.log(`  ${item.barcode}: ${item.quantity} шт.`);
  }
}
```

### Поиск складов: склады и транзитные тарифы

#### Список всех складов

```typescript
import type { ModelsWarehousesResultItems } from 'daytona-wildberries-typescript-sdk';

const warehouses: ModelsWarehousesResultItems[] =
  await sdk.ordersFBW.warehouses();

// Найти активные склады, принимающие прямые поставки
const activeWarehouses = warehouses.filter(wh => wh.isActive);
console.log(`Активных складов: ${activeWarehouses.length}`);

for (const wh of activeWarehouses) {
  console.log(`${wh.name} (ID: ${wh.ID})`);
  console.log(`  Адрес: ${wh.address}`);
  console.log(`  Часы работы: ${wh.workTime}`);
  console.log(`  Принимает QR: ${wh.acceptsQR ? 'да' : 'нет'}`);
  console.log(`  Транзит доступен: ${wh.isTransitActive ? 'да' : 'нет'}`);
}
```

#### Проверка транзитных тарифов

Транзитные тарифы применяются, когда товары отправляются через промежуточный склад перед достижением пункта назначения.

```typescript
import type { ModelsTransitTariff } from 'daytona-wildberries-typescript-sdk';

const tariffs: ModelsTransitTariff[] = await sdk.ordersFBW.transitTariffs();

for (const tariff of tariffs) {
  console.log(`${tariff.transitWarehouseName} -> ${tariff.destinationWarehouseName}`);
  console.log(`  Доступно с: ${tariff.activeFrom}`);
  console.log(`  Тариф за паллет: ${tariff.palletTariff} руб.`);

  if (tariff.boxTariff) {
    console.log(`  Тарифы за короба по объёму:`);
    for (const tier of tariff.boxTariff) {
      console.log(`    ${tier.from}-${tier.to} литров: ${tier.value} руб./литр`);
    }
  } else {
    console.log(`  Транзит коробами: недоступен`);
  }
}
```

## Устаревшие методы

### getAcceptanceCoefficients -- перенесён в модуль тарифов

Метод `getAcceptanceCoefficients()` перенесён на `common-api.wildberries.ru` и теперь относится к модулю тарифов. Метод по-прежнему работает в этом модуле, но при первом вызове выводит предупреждение об устаревании.

```typescript
// Устарело -- выводит предупреждение
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Рекомендуется -- используйте модуль тарифов (когда будет доступен)
// const coefficients = await sdk.tariffs.getAcceptanceCoefficients();
```

### createSupply -- переименован в listSupplies

Метод `createSupply()` был назван некорректно. На самом деле он выводит/фильтрует поставки, а не создаёт новые. Он переименован в `listSupplies()`, а `createSupply()` теперь является псевдонимом и будет удалён в v3.0.0.

```typescript
// Устарело -- будет удалён в v3.0.0
const supplies = await sdk.ordersFBW.createSupply({});

// Рекомендуется
const supplies = await sdk.ordersFBW.listSupplies({});
```

## Обработка ошибок

### Комплексная обработка ошибок

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function checkAcceptanceOptions() {
  try {
    const options = await sdk.ordersFBW.createAcceptanceOption([
      { barcode: '1234567891234', quantity: 100 }
    ]);
    // Обработка результатов...
  } catch (error) {
    if (error instanceof AuthenticationError) {
      // 401/403: Неверный или истёкший API-ключ
      console.error('Неверный API-ключ -- проверьте WB_API_KEY');
    } else if (error instanceof RateLimitError) {
      // 429: Превышен лимит запросов
      console.error(`Превышен лимит запросов. Повторить через: ${error.retryAfter} мс`);
      // SDK обрабатывает повторные попытки автоматически, но можно добавить логирование
    } else if (error instanceof ValidationError) {
      // 400/422: Некорректные параметры запроса
      console.error('Ошибка валидации:', error.message);
      // Частые причины: неверный формат штрихкода, количество > 999999
    } else if (error instanceof NetworkError) {
      // Таймаут сети или проблемы с подключением
      console.error('Ошибка сети:', error.message);
    } else if (error instanceof WBAPIError) {
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Обработка ошибок по отдельным позициям в вариантах приёмки

Ответ `createAcceptanceOption()` может содержать ошибки по отдельным штрихкодам. Всегда проверяйте каждый элемент результата.

```typescript
const options = await sdk.ordersFBW.createAcceptanceOption([
  { barcode: '1234567891234', quantity: 100 },
  { barcode: 'INVALID_BARCODE', quantity: 50 }
]);

for (const item of options.result ?? []) {
  if (item.isError) {
    console.error(`Штрихкод ${item.barcode} — ошибка: ${item.error?.detail}`);
    continue;
  }

  // Обработка успешных результатов
  const availableWarehouses = item.warehouses?.filter(wh => wh.canBox) ?? [];
  console.log(`Штрихкод ${item.barcode}: ${availableWarehouses.length} доступных складов`);
}
```

### Типичные сценарии ошибок

| HTTP-статус | Класс ошибки | Частая причина | Решение |
|-------------|-------------|----------------|---------|
| 401 | `AuthenticationError` | Неверный API-ключ | Убедитесь, что `WB_API_KEY` корректен и активен |
| 400 | `ValidationError` | Неверный штрихкод или количество | Проверьте формат штрихкода; максимальное количество — 999 999 |
| 429 | `RateLimitError` | Слишком много запросов | SDK повторяет автоматически; снизьте частоту запросов |
| 500+ | `WBAPIError` | Ошибка на стороне сервера | Повторите запрос через короткий интервал |

## Лимиты запросов

API FBW использует **2-уровневую систему лимитов запросов**. SDK применяет эти лимиты автоматически.

### Уровни лимитов

| Уровень | Название | Запросов/мин | Интервал | Всплеск | Применяется к |
|---------|----------|-------------|----------|---------|---------------|
| **T1** | Планирование | 6 | 10 с | 6 | `getAcceptanceCoefficients`, `createAcceptanceOption`, `warehouses` |
| **T1b** | Транзит | 6 | 10 с | 10 | `transitTariffs` |
| **T2** | Операции с поставками | 30 | 2 с | 10 | `listSupplies`, `getSupply`, `getSuppliesGood`, `getSuppliesPackage` |

### Советы по лимитам запросов

- **T1 (Планирование)** — самый строгий лимит: 6 запросов в минуту с интервалом 10 секунд. Кэшируйте результаты коэффициентов и складов на 10-15 минут, чтобы не достигать этого лимита.
- **T2 (Операции с поставками)** — более щадящий лимит: 30 запросов в минуту. Можно перебирать несколько поставок без значительных задержек.
- SDK обрабатывает лимиты автоматически. При достижении лимита запрос ставится в очередь и повторяется после необходимого интервала.

```typescript
// Эффективно: кэшировать коэффициенты и использовать повторно
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Обработать все коэффициенты локально без дополнительных API-вызовов
const freeSlots = coefficients.filter(c => c.coefficient === 0 && c.allowUnload);
const cheapSlots = coefficients.filter(c => c.coefficient === 1 && c.allowUnload);

// Избегайте: вызов getAcceptanceCoefficients() в цикле
// for (const warehouseId of warehouseIds) {
//   await sdk.ordersFBW.getAcceptanceCoefficients({ warehouseIDs: String(warehouseId) });
// }
```

## Дальнейшие шаги

- [Справочник API: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [Руководство по планированию поставок](/guides/supplies-planning) -- Подробное руководство по расчёту стоимости поставок и сравнению FBW и FBS
- [Обзор тарифов](/guides/tariffs-overview) -- Описание типов тарифов WB
- [Модуль заказов FBS](/modules/orders-fbs)
- [Начало работы с заказами DBS](/guides/orders-dbs-getting-started)
- [Официальное API WB FBW](https://dev.wildberries.ru/openapi/orders-fbw)

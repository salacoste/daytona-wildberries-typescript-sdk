---
title: Руководство по началу работы с самовывозом
description: Полное руководство по управлению заказами с самовывозом, когда покупатель забирает товар в точке продавца
layout: doc
---

# Руководство по началу работы с самовывозом

Это руководство охватывает всё, что нужно знать для работы с заказами на самовывоз (click-and-collect) в TypeScript SDK Wildberries.

## Содержание

- [Что такое самовывоз?](#что-такое-самовывоз)
- [Быстрый старт](#быстрый-старт)
- [Доступные методы](#доступные-методы)
- [Жизненный цикл заказа](#жизненный-цикл-заказа)
- [Верификация личности покупателя](#верификация-личности-покупателя)
- [Операции с метаданными](#операции-с-метаданными)
- [Лимиты запросов](#лимиты-запросов)
- [Обработка ошибок](#обработка-ошибок)
- [Лучшие практики](#лучшие-практики)
- [Связанные ресурсы](#связанные-ресурсы)

## Что такое самовывоз?

**Самовывоз** (click-and-collect) — это модель выполнения заказов, при которой:

1. **Покупатель заказывает онлайн**: Покупатель оформляет заказ через Wildberries
2. **Продавец готовит заказ**: Продавец собирает и подготавливает товар в своей физической точке
3. **Покупатель забирает лично**: Покупатель приходит в точку продавца и забирает заказ

### Ключевые особенности

| Особенность | Описание |
|-------------|----------|
| **Физическая точка** | У продавца есть магазин или пункт выдачи |
| **Верификация покупателя** | Проверка личности по коду перед выдачей |
| **Процесс сборки** | Структурированный жизненный цикл: новый, подтвердить, подготовить, выдать/отклонить |
| **Отслеживание метаданных** | Коды маркировки товаров (IMEI, SGTIN, UIN, GTIN) для соответствия требованиям |
| **Штраф за 409** | Ответы 409 Conflict засчитываются как **10 запросов** к лимиту |

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

// Шаг 1: Получить новые заказы на самовывоз
const { orders } = await sdk.inStorePickup.getOrdersNew();
console.log(`Найдено ${orders?.length ?? 0} новых заказов на самовывоз`);

// Шаг 2: Подтвердить заказ для сборки
const orderId = orders?.[0]?.id;
if (orderId) {
  await sdk.inStorePickup.updateOrdersConfirm(orderId);
  console.log(`Заказ ${orderId} подтверждён для сборки`);

  // Шаг 3: Отметить как подготовленный к выдаче
  await sdk.inStorePickup.updateOrdersPrepare(orderId);
  console.log(`Заказ ${orderId} готов к выдаче`);

  // Шаг 4: Верифицировать личность покупателя
  const identity = await sdk.inStorePickup.createClientIdentity({
    orderCode: '170046918-0011',
    passcode: '4567'
  });
  console.log(`Личность подтверждена: ${identity.isIdentified}`);

  // Шаг 5: Завершить выдачу
  await sdk.inStorePickup.updateOrdersReceive(orderId);
  console.log(`Заказ ${orderId} выдан покупателю`);
}
```

### Настройка окружения

Создайте файл `.env`:

```bash
WB_API_KEY=your_api_key_here
```

## Доступные методы

### Задачи сборки (6 методов)

| Метод | Описание | Уровень лимита |
|-------|----------|----------------|
| `getOrdersNew()` | Получить новые заказы на самовывоз | T1 (300 в мин) |
| `updateOrdersConfirm(orderId)` | Подтвердить заказ для сборки | T2 (100 в мин) |
| `updateOrdersPrepare(orderId)` | Отметить заказ как подготовленный | T2 (100 в мин) |
| `updateOrdersReceive(orderId)` | Отметить как выданный покупателю | T2 (100 в мин) |
| `updateOrdersReject(orderId)` | Отклонить заказ (покупатель отказался) | T2 (100 в мин) |
| `updateOrdersCancel(orderId)` | Отменить заказ (по инициативе продавца) | T2 (100 в мин) |

### Запросы заказов (2 метода)

| Метод | Описание | Уровень лимита |
|-------|----------|----------------|
| `getClickCollectOrders(params)` | Список выполненных заказов с пагинацией | T1 (300 в мин) |
| `createOrdersStatus(data)` | Получить статусы заказов по ID | T1 (300 в мин) |

### Взаимодействие с покупателем (2 метода)

| Метод | Описание | Уровень лимита |
|-------|----------|----------------|
| `createOrdersClient(data)` | Получить информацию о покупателе для заказов | T1 (300 в мин) |
| `createClientIdentity(data)` | Верифицировать личность покупателя по коду | T3 (30 в мин) |

### Операции с метаданными (6 методов)

| Метод | Описание | Уровень лимита |
|-------|----------|----------------|
| `getOrdersMeta(orderId)` | Получить метаданные заказа | T1 (300 в мин) |
| `deleteOrdersMeta(orderId, options)` | Удалить метаданные заказа по ключу | T1 (300 в мин) |
| `updateMetaSgtin(orderId, data)` | Установить коды маркировки SGTIN | T4 (1000 в мин) |
| `updateMetaUin(orderId, data)` | Установить код UIN | T4 (1000 в мин) |
| `updateMetaImei(orderId, data)` | Установить код IMEI | T4 (1000 в мин) |
| `updateMetaGtin(orderId, data)` | Установить код GTIN | T4 (1000 в мин) |

## Жизненный цикл заказа

Заказы следуют строгой модели состояний с определёнными переходами:

```
                    +----------+
                    |   new    |
                    +----+-----+
                         |
                    confirm()
                         |
                    +----v-----+
                    | confirm  |
                    +----+-----+
                         |
                    prepare()
                         |
                    +----v-----+
              +---->| prepare  |<----+
              |     +----+-----+     |
              |          |           |
         reject()   receive()   (верификация
              |          |       перед выдачей)
              v          v
        +---------+ +---------+
        | reject  | | receive |
        +---------+ +---------+

        Любое состояние ----cancel()----> [ cancel ]
```

**Допустимые переходы состояний**:
- `new` --> `confirm` (начало сборки)
- `confirm` --> `prepare` (готов к выдаче)
- `prepare` --> `receive` (покупатель забрал) -- конечное состояние
- `prepare` --> `reject` (покупатель отказался) -- конечное состояние
- Любое состояние --> `cancel` (отмена продавцом) -- конечное состояние

### Пошаговая обработка заказов

```typescript
const { orders } = await sdk.inStorePickup.getOrdersNew();

for (const order of orders ?? []) {
  console.log(`Заказ ${order.id}: ${order.article}`);

  // Проверить необходимые метаданные
  if (order.requiredMeta?.length) {
    console.log(`  Требуемые метаданные: ${order.requiredMeta.join(', ')}`);
  }

  // Подтвердить заказ
  await sdk.inStorePickup.updateOrdersConfirm(order.id!);

  // Установить требуемые метаданные (необходимо в статусе confirm)
  if (order.requiredMeta?.includes('imei')) {
    await sdk.inStorePickup.updateMetaImei(order.id!, {
      imei: '123456789012345' // из вашей системы учёта
    });
  }

  // Отметить как подготовленный
  await sdk.inStorePickup.updateOrdersPrepare(order.id!);
}
```

## Верификация личности покупателя

Перед выдачей подготовленного заказа необходимо проверить личность покупателя с помощью кода из приложения Wildberries.

### Как это работает

1. Покупатель получает **код** в приложении Wildberries для своего заказа
2. Когда покупатель приходит к вам, он сообщает **код заказа** и **пароль**
3. Вы вызываете `createClientIdentity()` для проверки совпадения кода
4. Если проверка пройдена (`isIdentified: true`), можно выдать заказ

### Процесс верификации

```typescript
// Покупатель предоставляет код заказа и пароль
const result = await sdk.inStorePickup.createClientIdentity({
  orderCode: '170046918-0011',  // Код заказа покупателя
  passcode: '4567'              // Пароль из приложения WB
});

if (result.isIdentified) {
  console.log('Личность покупателя подтверждена');
  // Можно выдать заказ
  await sdk.inStorePickup.updateOrdersReceive(orderId);
} else {
  console.log('Верификация не пройдена — попросите покупателя проверить приложение');
}
```

### Получение информации о покупателе

Также можно получить контактные данные покупателя для заказов в статусе `confirm` или `prepare`:

```typescript
const clientInfo = await sdk.inStorePickup.createOrdersClient({
  orders: [12345, 67890]
});

for (const client of clientInfo.orders ?? []) {
  console.log(`Заказ ${client.orderID}:`);
  console.log(`  Телефон: ${client.phone}`);
  console.log(`  ФИО: ${client.fio}`);
}
```

## Операции с метаданными

Товары, требующие отслеживания для соответствия требованиям, должны иметь коды маркировки перед выдачей. Поле `requiredMeta` в новых заказах указывает, какие коды необходимы.

### Типы метаданных

| Тип | Описание | Формат |
|-----|----------|--------|
| `sgtin` | Коды маркировки (Честный Знак) | 16-135 символов, макс. 24 кода |
| `imei` | Идентификатор мобильного устройства | Ровно 15 цифр |
| `uin` | Уникальный идентификационный номер | Ровно 16 символов |
| `gtin` | Глобальный номер товара (Беларусь) | Ровно 13 символов |

### Установка метаданных

Метаданные можно устанавливать только когда заказ находится в статусе `confirm`:

```typescript
// Установить IMEI для мобильного устройства
await sdk.inStorePickup.updateMetaImei(orderId, {
  imei: '123456789012345'
});

// Установить коды маркировки SGTIN
await sdk.inStorePickup.updateMetaSgtin(orderId, {
  sgtins: ['01046012345678900421abc123']
});

// Установить UIN
await sdk.inStorePickup.updateMetaUin(orderId, {
  uin: '1234567890123456'
});

// Установить GTIN
await sdk.inStorePickup.updateMetaGtin(orderId, {
  gtin: '1234567890123'
});
```

### Проверка метаданных

```typescript
const meta = await sdk.inStorePickup.getOrdersMeta(orderId);

if (meta.imei) {
  console.log(`IMEI: ${meta.imei}`);
}
if (meta.sgtins?.length) {
  console.log(`Кодов SGTIN: ${meta.sgtins.length}`);
}
```

### Удаление метаданных

Если необходимо исправить метаданные, сначала удалите их, а затем установите новое значение. Параметр `options` с ключом `key` **обязателен**:

```typescript
// Удалить метаданные IMEI (параметр options обязателен)
await sdk.inStorePickup.deleteOrdersMeta(orderId, { key: 'imei' });

// Установить исправленное значение
await sdk.inStorePickup.updateMetaImei(orderId, {
  imei: '543210987654321'
});
```

## Лимиты запросов

API самовывоза использует **4-уровневую систему лимитов запросов**. SDK применяет эти лимиты автоматически, но их понимание помогает проектировать эффективные интеграции.

### Уровни лимитов

| Уровень | Название | Запросов/мин | Интервал | Применяется к |
|---------|----------|-------------|----------|---------------|
| **T1** | Чтение сборки | 300 | 200 мс | `getOrdersNew`, `getClickCollectOrders`, `createOrdersStatus`, `createOrdersClient`, `getOrdersMeta`, `deleteOrdersMeta` |
| **T2** | Переходы состояний | 100 | 600 мс | `updateOrdersConfirm`, `updateOrdersPrepare`, `updateOrdersReceive`, `updateOrdersReject`, `updateOrdersCancel` |
| **T3** | Проверка личности | 30 | 2 с | `createClientIdentity` |
| **T4** | Установка метаданных | 1000 | 60 мс | `updateMetaSgtin`, `updateMetaUin`, `updateMetaImei`, `updateMetaGtin` |

### Штрафной множитель за 409 (ВАЖНО)

**Все эндпоинты** модуля самовывоза применяют **штрафной множитель 10x** для ответов 409 Conflict. Это означает:

- Один ответ 409 засчитывается как **10 запросов** к лимиту
- Для T2 (переходы состояний) при 100 запросов/мин, всего 10 конфликтов исчерпают всю квоту
- Для T3 (проверка личности) при 30 запросов/мин, всего 3 неудачные проверки исчерпают квоту

```typescript
// ВНИМАНИЕ: Если вызов вернёт 409, это засчитается как 10 запросов
try {
  await sdk.inStorePickup.updateOrdersConfirm(orderId);
} catch (error) {
  // Этот 409 использовал 10 из 100 запросов T2 в минуту
  console.error('Конфликт состояний — рассмотрите предварительную проверку статуса');
}
```

### Советы по лимитам запросов

- **Проверяйте статус заказа перед сменой состояния**, чтобы избежать ошибок 409
- **T3 (проверка личности)** — самый строгий лимит: 30 запросов в минуту. Не повторяйте неудачные верификации в цикле
- SDK обрабатывает лимиты автоматически. При достижении лимита запрос ставится в очередь и повторяется после необходимого интервала

## Обработка ошибок

### Специализированные классы ошибок

SDK предоставляет четыре специализированных класса ошибок для модуля самовывоза:

```typescript
import {
  WildberriesSDK,
  PickupOrderNotFoundError,
  InvalidOrderStateError,
  CustomerVerificationError,
  MetadataValidationError,
  RateLimitError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';
```

### PickupOrderNotFoundError (404)

Выбрасывается, когда заказ с указанным ID не существует:

```typescript
try {
  await sdk.inStorePickup.updateOrdersConfirm(999999);
} catch (error) {
  if (error instanceof PickupOrderNotFoundError) {
    console.error(`Заказ ${error.orderId} не найден`);
    // Проверьте ID заказа и попробуйте снова
  }
}
```

### InvalidOrderStateError (409)

Выбрасывается при недопустимом переходе состояния заказа (например, подготовка неподтверждённого заказа):

```typescript
try {
  await sdk.inStorePickup.updateOrdersPrepare(orderId);
} catch (error) {
  if (error instanceof InvalidOrderStateError) {
    console.error(`Невозможно выполнить ${error.attemptedAction} для заказа ${error.orderId}`);
    console.error(`Текущее состояние: ${error.currentState}`);

    // Проверить текущий статус и повторить с правильным действием
    const statuses = await sdk.inStorePickup.createOrdersStatus({
      orders: [error.orderId]
    });
    console.log('Фактический статус:', statuses.orders?.[0]?.supplierStatus);
  }
}
```

### CustomerVerificationError (409)

Выбрасывается при неудачной проверке пароля:

```typescript
try {
  const result = await sdk.inStorePickup.createClientIdentity({
    orderCode: '170046918-0011',
    passcode: '1234'
  });
} catch (error) {
  if (error instanceof CustomerVerificationError) {
    console.error(`Верификация не пройдена для заказа ${error.orderCode}`);
    // Попросите покупателя проверить пароль в приложении Wildberries
    // ВНИМАНИЕ: Каждая неудачная попытка засчитывается как 10 запросов (T3: 30 в мин)
  }
}
```

### MetadataValidationError (409)

Выбрасывается при неудачной установке метаданных (неверный формат, неверное состояние заказа или ненужный тип метаданных):

```typescript
try {
  await sdk.inStorePickup.updateMetaImei(orderId, {
    imei: '123456789012345'
  });
} catch (error) {
  if (error instanceof MetadataValidationError) {
    console.error(`Невозможно установить ${error.codeType} для заказа ${error.orderId}`);
    // Убедитесь: 1) Заказ в статусе "confirm"
    //            2) Тип кода есть в requiredMeta заказа
    //            3) Формат кода корректен
  }
}
```

### Комплексная обработка ошибок

```typescript
async function processPickupOrder(orderId: number) {
  try {
    await sdk.inStorePickup.updateOrdersConfirm(orderId);
    await sdk.inStorePickup.updateOrdersPrepare(orderId);
  } catch (error) {
    if (error instanceof PickupOrderNotFoundError) {
      console.error(`Заказ ${error.orderId} не найден`);
    } else if (error instanceof InvalidOrderStateError) {
      console.error(`Недопустимый переход состояния: ${error.message}`);
    } else if (error instanceof RateLimitError) {
      console.error(`Превышен лимит запросов. Повторить через: ${error.retryAfter} мс`);
    } else if (error instanceof WBAPIError) {
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
  }
}
```

## Лучшие практики

### 1. Обрабатывайте заказы оперативно

Новые заказы на самовывоз следует подтверждать и подготавливать быстро. Покупатели ожидают своевременную обработку:

```typescript
// Регулярно проверяйте новые заказы
const { orders } = await sdk.inStorePickup.getOrdersNew();

for (const order of orders ?? []) {
  await sdk.inStorePickup.updateOrdersConfirm(order.id!);
  // Установите метаданные, затем подготовьте
}
```

### 2. Обрабатывайте 409 осторожно (штраф 10x)

Каждый ответ 409 Conflict стоит 10 запросов к лимиту. Всегда проверяйте статус перед попыткой перехода:

```typescript
// ПРАВИЛЬНО: Сначала проверить статус
const statuses = await sdk.inStorePickup.createOrdersStatus({
  orders: [orderId]
});
const status = statuses.orders?.[0]?.supplierStatus;

if (status === 'new') {
  await sdk.inStorePickup.updateOrdersConfirm(orderId);
} else if (status === 'confirm') {
  await sdk.inStorePickup.updateOrdersPrepare(orderId);
}

// НЕПРАВИЛЬНО: Слепая попытка перехода (риск 409 + штраф 10x)
// await sdk.inStorePickup.updateOrdersPrepare(orderId);
```

### 3. Верифицируйте личность перед выдачей

Всегда проверяйте личность покупателя перед выдачей заказа:

```typescript
const result = await sdk.inStorePickup.createClientIdentity({
  orderCode: customerOrderCode,
  passcode: customerPasscode
});

if (!result.isIdentified) {
  // НЕ выдавайте заказ
  console.error('Личность не подтверждена — запросите правильный пароль');
  return;
}

// Можно безопасно выдать заказ
await sdk.inStorePickup.updateOrdersReceive(orderId);
```

### 4. Устанавливайте метаданные до подготовки

Обязательные метаданные необходимо установить, пока заказ находится в статусе `confirm`, до вызова `updateOrdersPrepare()`:

```typescript
const { orders } = await sdk.inStorePickup.getOrdersNew();

for (const order of orders ?? []) {
  // Сначала подтвердить
  await sdk.inStorePickup.updateOrdersConfirm(order.id!);

  // Установить обязательные метаданные в статусе confirm
  if (order.requiredMeta?.includes('imei')) {
    await sdk.inStorePickup.updateMetaImei(order.id!, {
      imei: getImeiFromInventory(order.article!)
    });
  }
  if (order.requiredMeta?.includes('sgtin')) {
    await sdk.inStorePickup.updateMetaSgtin(order.id!, {
      sgtins: getSgtinsFromInventory(order.article!)
    });
  }

  // Проверить, что метаданные установлены корректно
  const meta = await sdk.inStorePickup.getOrdersMeta(order.id!);
  console.log('Метаданные:', meta);

  // Затем подготовить к выдаче
  await sdk.inStorePickup.updateOrdersPrepare(order.id!);
}
```

### 5. Используйте пагинацию для исторических заказов

```typescript
const now = Math.floor(Date.now() / 1000);
const sevenDaysAgo = now - 7 * 24 * 60 * 60;

let allOrders = [];
let next = 0;

do {
  const result = await sdk.inStorePickup.getClickCollectOrders({
    limit: 1000,
    next,
    dateFrom: sevenDaysAgo,
    dateTo: now
  });

  allOrders.push(...(result.orders ?? []));
  next = result.next ?? 0;
} while (next > 0);

console.log(`Всего выполненных заказов на самовывоз: ${allOrders.length}`);
```

## Связанные ресурсы

- [Справочник API: InStorePickupModule](/api/classes/InStorePickupModule)
- [Справочник модуля самовывоза](/modules/in-store-pickup)
- [Официальное API WB Click-and-Collect](https://dev.wildberries.ru/openapi/orders-click-collect)

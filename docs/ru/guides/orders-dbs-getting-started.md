---
title: Руководство по началу работы с заказами DBS
description: Полное руководство по использованию модуля заказов DBS (доставка продавцом) для прямой доставки покупателям
layout: doc
---

# Руководство по началу работы с заказами DBS

Это руководство охватывает все, что вам нужно знать для работы с заказами DBS (доставка продавцом) в TypeScript SDK Wildberries.

> **Уведомление о миграции**: Устаревшие методы для работы со статусами и метаданными отдельных заказов объявлены deprecated и будут **отключены 13 апреля 2026 года**. Используйте массовые (bulk) методы, описанные в этом руководстве. Подробности см. в [Руководстве по миграции](/guides/migration-dbs-legacy-to-bulk).

## Содержание

- [Что такое DBS?](#что-такое-dbs)
- [DBS vs FBS vs FBW](#dbs-vs-fbs-vs-fbw)
- [Быстрый старт](#быстрый-старт)
- [Доступные методы](#доступные-методы)
- [Полный процесс обработки заказа](#полный-процесс-обработки-заказа)
- [Работа с данными покупателя](#работа-с-данными-покупателя)
- [Метаданные и соответствие требованиям](#метаданные-и-соответствие-требованиям)
- [Заказы B2B](#заказы-b2b)
- [Лимиты запросов](#лимиты-запросов)
- [Обработка ошибок](#обработка-ошибок)
- [Лучшие практики](#лучшие-практики)

## Что такое DBS?

**DBS (Delivery by Seller / Доставка продавцом)** — это модель фулфилмента, при которой продавец отвечает за:

1. **Хранение**: Товары хранятся на складе продавца
2. **Доставку**: Продавец доставляет товар напрямую по адресу покупателя

### Ключевые возможности DBS

| Возможность | Описание |
|-------------|----------|
| **Прямая доставка** | Доставка на дом покупателю, а не в пункт выдачи |
| **Контакт с покупателем** | Доступ к номеру телефона и полному адресу |
| **GPS-координаты** | Долгота/широта для планирования маршрута |
| **Окна доставки** | Конкретные дата и временные интервалы |
| **Обязательные метаданные** | Коды маркировки товаров (IMEI, SGTIN и т.д.) |

## DBS vs FBS vs FBW

| Аспект | DBS | FBS | FBW |
|--------|-----|-----|-----|
| Хранение | Продавец | Продавец | Wildberries |
| Доставка | Продавец | Wildberries | Wildberries |
| Адрес покупателя | Полный адрес + GPS | Пункт выдачи | Пункт выдачи |
| Телефон покупателя | Доступен | Недоступен | Недоступен |
| Время доставки | Конкретные окна | Стандартное | Стандартное |

**Выбирайте DBS, когда:**
- Вы можете доставлять товары напрямую покупателям
- Вам нужна гибкость по времени доставки
- Ваши товары требуют специальной обработки
- Вам нужен прямой контакт с покупателем

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

// Проверка новых заказов
const newOrders = await sdk.ordersDBS.getNewOrders();
console.log(`Найдено ${newOrders.orders?.length ?? 0} новых заказов`);
```

### Настройка окружения

Создайте файл `.env`:

```bash
WB_API_KEY=your_api_key_here
```

## Доступные методы

### Получение заказов

| Метод | Описание | Уровень лимита |
|-------|----------|----------------|
| `getNewOrders()` | Получить новые заказы, ожидающие обработки | T1 (300 запр/мин) |
| `getOrders(params)` | Получить выполненные заказы с пагинацией | T1 (300 запр/мин) |
| `getClientInfo(orderIds)` | Получить контактные данные покупателя | T1 (300 запр/мин) |
| `getB2BInfo(orderIds)` | Получить данные B2B-покупателя | T1 (300 запр/мин) |
| `getGroupsInfo(request)` | Получить информацию о группах платной доставки | T1 (300 запр/мин) |
| `getDeliveryDates(request)` | Получить даты доставки для заказов | T1 (300 запр/мин) |

### Массовые операции со статусами

| Метод | Описание | Уровень лимита |
|-------|----------|----------------|
| `getStatusesBulk(orderIds)` | Получить статусы нескольких заказов | T1 (300 запр/мин) |
| `confirmBulk(orderIds)` | Подтвердить несколько заказов | T2 (60 запр/мин) |
| `deliverBulk(orderIds)` | Отметить несколько заказов как доставленные | T2 (60 запр/мин) |
| `receiveBulk(orders)` | Завершить передачу нескольких заказов | T2 (60 запр/мин) |
| `rejectBulk(orders)` | Отклонить несколько заказов | T2 (60 запр/мин) |
| `cancelBulk(orderIds)` | Отменить несколько заказов | T2 (60 запр/мин) |

### Массовые операции с метаданными

| Метод | Описание | Уровень лимита |
|-------|----------|----------------|
| `getMetaBulk(request)` | Получить метаданные нескольких заказов | T3 (150 запр/мин) |
| `deleteMetaBulk(request)` | Удалить метаданные нескольких заказов | T3 (150 запр/мин) |
| `setSgtinBulk(request)` | Установить коды SGTIN для нескольких заказов | T4 (500 запр/мин) |
| `setUinBulk(request)` | Установить коды UIN для нескольких заказов | T4 (500 запр/мин) |
| `setImeiBulk(request)` | Установить коды IMEI для нескольких заказов | T4 (500 запр/мин) |
| `setGtinBulk(request)` | Установить коды GTIN для нескольких заказов | T4 (500 запр/мин) |
| `setCustomsDeclarationBulk(request)` | Установить таможенные декларации для нескольких заказов | T4 (500 запр/мин) |

### Устаревшие методы (отключаются 13 апреля 2026)

Следующие устаревшие методы для работы с отдельными заказами объявлены deprecated. Перейдите на их массовые аналоги до указанного срока.

| Устаревший метод | Замена | Срок |
|------------------|--------|------|
| `getMeta(orderId)` | `getMetaBulk(request)` | 13 апреля 2026 |
| `deleteMeta(orderId, key)` | `deleteMetaBulk(request)` | 13 апреля 2026 |
| `setSgtin(orderId, sgtins)` | `setSgtinBulk(request)` | 13 апреля 2026 |
| `setUin(orderId, uin)` | `setUinBulk(request)` | 13 апреля 2026 |
| `setImei(orderId, imei)` | `setImeiBulk(request)` | 13 апреля 2026 |
| `setGtin(orderId, gtin)` | `setGtinBulk(request)` | 13 апреля 2026 |
| `setCustomsDeclaration(orderId, cd)` | `setCustomsDeclarationBulk(request)` | 13 апреля 2026 |
| `getStatuses(orderIds)` | `getStatusesBulk(orderIds)` | 13 апреля 2026 |
| `confirm(orderId)` | `confirmBulk([orderId])` | 13 апреля 2026 |
| `deliver(orderId)` | `deliverBulk([orderId])` | 13 апреля 2026 |
| `receive(orderId, code)` | `receiveBulk([{orderId, code}])` | 13 апреля 2026 |
| `reject(orderId, code)` | `rejectBulk([{orderId, code}])` | 13 апреля 2026 |
| `cancel(orderId)` | `cancelBulk([orderId])` | 13 апреля 2026 |

## Полный процесс обработки заказа

### Шаг 1: Получение новых заказов

```typescript
const newOrders = await sdk.ordersDBS.getNewOrders();

for (const order of newOrders.orders ?? []) {
  console.log(`Заказ ${order.id}:`);
  console.log(`  Артикул: ${order.article}`);
  console.log(`  Адрес: ${order.address?.fullAddress}`);
  console.log(`  Доставка: ${order.ddate} ${order.dTimeFrom}-${order.dTimeTo}`);

  // Проверка обязательных метаданных
  if (order.requiredMeta?.length) {
    console.log(`  Обязательные метаданные: ${order.requiredMeta.join(', ')}`);
  }
}
```

### Шаг 2: Получение контактных данных покупателя

```typescript
const orderIds = newOrders.orders?.map(o => o.id!).filter(Boolean) ?? [];

if (orderIds.length > 0) {
  const clientInfo = await sdk.ordersDBS.getClientInfo(orderIds);

  for (const client of clientInfo.orders ?? []) {
    console.log(`Заказ ${client.orderID}:`);
    console.log(`  Имя: ${client.fullName}`);
    console.log(`  Телефон: +${client.phoneCode}${client.phone}`);
  }
}
```

### Шаг 3: Получение информации о группе доставки и датах

```typescript
// Получение информации о группах платной доставки
const groups = await sdk.ordersDBS.getGroupsInfo({ orders: orderIds });
for (const group of groups.groups ?? []) {
  console.log(`Группа ${group.id} "${group.name}": заказы ${group.orders.join(', ')}`);
}

// Получение деталей о датах доставки
const dates = await sdk.ordersDBS.getDeliveryDates({ orders: orderIds });
for (const dateInfo of dates.orders ?? []) {
  console.log(`Заказ ${dateInfo.orderId}: доставить до ${dateInfo.deliveryDate}`);
}
```

### Шаг 4: Добавление обязательных метаданных (массово)

```typescript
// Установка IMEI для нескольких заказов одновременно
const imeiOrders = newOrders.orders
  ?.filter(o => o.requiredMeta?.includes('imei'))
  ?? [];

if (imeiOrders.length > 0) {
  const result = await sdk.ordersDBS.setImeiBulk({
    orders: imeiOrders.map(o => ({
      orderId: o.id!,
      imei: getImeiFromInventory(o.id!)  // ваш запрос к складской системе
    }))
  });

  for (const r of result.orders ?? []) {
    if (r.error) {
      console.error(`Ошибка IMEI для заказа ${r.orderId}: ${r.error}`);
    }
  }
}

// Установка SGTIN для нескольких заказов одновременно
const sgtinOrders = newOrders.orders
  ?.filter(o => o.requiredMeta?.includes('sgtin'))
  ?? [];

if (sgtinOrders.length > 0) {
  const result = await sdk.ordersDBS.setSgtinBulk({
    orders: sgtinOrders.map(o => ({
      orderId: o.id!,
      sgtins: getSgtinsFromInventory(o.id!)  // ваш запрос к складской системе
    }))
  });
}
```

### Шаг 5: Проверка метаданных (массово)

```typescript
// Проверка правильности установки метаданных для всех заказов
const meta = await sdk.ordersDBS.getMetaBulk({ orders: orderIds });

for (const orderMeta of meta.orders ?? []) {
  console.log(`Заказ ${orderMeta.orderId}:`);
  if (orderMeta.imei) {
    console.log(`  IMEI: ${orderMeta.imei}`);
  }
  if (orderMeta.sgtins?.length) {
    console.log(`  SGTIN: ${orderMeta.sgtins.length} кодов`);
  }
}
```

### Шаг 6: Подтверждение заказа

```typescript
const confirmResult = await sdk.ordersDBS.confirmBulk(orderIds);

for (const r of confirmResult.results ?? []) {
  if (r.isError) {
    console.error(`Ошибка подтверждения для ${r.orderId}:`, r.errors);
  } else {
    console.log(`Заказ ${r.orderId} подтвержден`);
  }
}
```

### Шаг 7: Доставка заказа

```typescript
// После физической доставки
const deliverResult = await sdk.ordersDBS.deliverBulk(orderIds);

for (const r of deliverResult.results ?? []) {
  if (!r.isError) {
    console.log(`Заказ ${r.orderId} отмечен как доставленный`);
  }
}
```

### Шаг 8: Завершение передачи

```typescript
// Покупатель предоставляет код подтверждения из приложения WB
const receiveResult = await sdk.ordersDBS.receiveBulk([
  { orderId: orderIds[0], code: '1234' },
  { orderId: orderIds[1], code: '5678' }
]);

for (const r of receiveResult.results ?? []) {
  if (!r.isError) {
    console.log(`Передача завершена для заказа ${r.orderId}`);
  }
}
```

## Работа с данными покупателя

### Адрес и GPS

```typescript
const orders = await sdk.ordersDBS.getNewOrders();

for (const order of orders.orders ?? []) {
  const addr = order.address;

  if (addr) {
    console.log(`Доставка по адресу: ${addr.fullAddress}`);

    // Использование GPS для планирования маршрута
    if (addr.latitude && addr.longitude) {
      console.log(`GPS: ${addr.latitude}, ${addr.longitude}`);

      // Пример: открыть в Google Maps
      const mapsUrl = `https://maps.google.com/?q=${addr.latitude},${addr.longitude}`;
      console.log(`Карта: ${mapsUrl}`);
    }
  }
}
```

### Окна доставки

```typescript
const order = orders.orders?.[0];

if (order) {
  const deliveryDate = order.ddate;      // "2024-01-15"
  const timeFrom = order.dTimeFrom;       // "09:00"
  const timeTo = order.dTimeTo;           // "12:00"

  console.log(`Доставить ${deliveryDate} с ${timeFrom} до ${timeTo}`);
}
```

### Даты доставки (массовый запрос)

```typescript
// Получение деталей о датах доставки для нескольких заказов одновременно
const orderIds = orders.orders?.map(o => o.id!).filter(Boolean) ?? [];
const dates = await sdk.ordersDBS.getDeliveryDates({ orders: orderIds });

for (const dateInfo of dates.orders ?? []) {
  console.log(`Заказ ${dateInfo.orderId}:`);
  console.log(`  Дата доставки: ${dateInfo.deliveryDate}`);
  console.log(`  Крайняя дата доставки: ${dateInfo.maxDeliveryDate}`);
}
```

### Комментарии покупателя

```typescript
if (order.comment) {
  console.log(`Примечание покупателя: ${order.comment}`);
  // Обработка особых инструкций по доставке
}
```

## Метаданные и соответствие требованиям

### Типы обязательных метаданных

| Тип | Описание | Формат |
|-----|----------|--------|
| `sgtin` | Коды маркировки | 16-135 символов, максимум 24 |
| `imei` | Идентификатор мобильного устройства | Ровно 15 символов |
| `uin` | Уникальный идентификационный номер | Ровно 16 символов |
| `gtin` | Глобальный номер товарной позиции | Ровно 13 символов |
| `customsDeclaration` | Таможенный номер | 1-50 символов |

### Установка метаданных (массово — рекомендуется)

Используйте массовые методы для установки метаданных нескольких заказов в одном API-вызове:

```typescript
// Установка IMEI для нескольких заказов
const imeiResult = await sdk.ordersDBS.setImeiBulk({
  orders: [
    { orderId: 111, imei: '123456789012345' },
    { orderId: 222, imei: '543210987654321' }
  ]
});

// Установка SGTIN для нескольких заказов
const sgtinResult = await sdk.ordersDBS.setSgtinBulk({
  orders: [
    { orderId: 333, sgtins: ['01046012345678900421abc123'] },
    { orderId: 444, sgtins: ['01046012345678900421abc456', '01046012345678900421abc789'] }
  ]
});

// Установка таможенной декларации для нескольких заказов
const cdResult = await sdk.ordersDBS.setCustomsDeclarationBulk({
  orders: [
    { orderId: 555, customsDeclaration: '10130030/010123/0000001' }
  ]
});
```

### Проверка метаданных (массово)

```typescript
const meta = await sdk.ordersDBS.getMetaBulk({
  orders: [111, 222, 333, 444, 555]
});

for (const orderMeta of meta.orders ?? []) {
  console.log(`Заказ ${orderMeta.orderId}:`);
  if (orderMeta.imei) {
    console.log(`  IMEI: ${orderMeta.imei}`);
  }
  if (orderMeta.sgtins?.length) {
    console.log(`  Коды SGTIN: ${orderMeta.sgtins.length}`);
  }
  if (orderMeta.customsDeclaration) {
    console.log(`  Таможенная декларация: ${orderMeta.customsDeclaration}`);
  }
}
```

### Удаление метаданных (массово)

```typescript
// Если нужно исправить метаданные для нескольких заказов
const deleteResult = await sdk.ordersDBS.deleteMetaBulk({
  orders: [111, 222],
  key: 'imei'
});

// Затем установить исправленные значения
await sdk.ordersDBS.setImeiBulk({
  orders: [
    { orderId: 111, imei: 'corrected150000' },
    { orderId: 222, imei: 'corrected250000' }
  ]
});
```

## Заказы B2B

### Определение B2B-заказов

```typescript
const b2bInfo = await sdk.ordersDBS.getB2BInfo(orderIds);

for (const result of b2bInfo.results ?? []) {
  if (result.isError) {
    // Это заказ от физического лица (B2C)
    console.log(`Заказ ${result.orderId}: Физическое лицо`);
  } else if (result.data) {
    // Это заказ B2B
    console.log(`Заказ ${result.orderId}: B2B`);
    console.log(`  Организация: ${result.data.orgName}`);
    console.log(`  ИНН: ${result.data.inn}`);
    console.log(`  КПП: ${result.data.kpp || 'Н/Д'}`);
  }
}
```

### Документация B2B

Для заказов B2B обычно требуются:

1. **Счет** с реквизитами организации
2. **ИНН и КПП** в бухгалтерских документах
3. **Универсальный передаточный документ (УПД)**, если требуется

```typescript
// Пример: формирование данных для счета
const b2bOrder = b2bInfo.results?.find(r => !r.isError && r.data);

if (b2bOrder?.data) {
  const invoiceData = {
    buyer: b2bOrder.data.orgName,
    inn: b2bOrder.data.inn,
    kpp: b2bOrder.data.kpp || '',
    orderRef: `WB-DBS-${b2bOrder.orderId}`
  };

  // Используйте invoiceData для вашей бухгалтерской системы
}
```

## Лимиты запросов

DBS API использует **4-уровневую систему лимитов запросов**. SDK применяет эти лимиты автоматически, но их понимание поможет вам проектировать эффективные интеграции.

### Уровни лимитов запросов

| Уровень | Название | Запросов/мин | Интервал | Всплеск | Применяется к |
|---------|----------|-------------|----------|---------|---------------|
| **T1** | Чтение сборки | 300 | 200мс | 20 | `getNewOrders`, `getOrders`, `getClientInfo`, `getStatusesBulk`, `getB2BInfo`, `getGroupsInfo`, `getDeliveryDates` |
| **T2** | Запись статуса | 60 | 1с | 10 | `confirmBulk`, `deliverBulk`, `receiveBulk`, `rejectBulk`, `cancelBulk` |
| **T3** | Чтение/удаление метаданных | 150 | 400мс | 20 | `getMetaBulk`, `deleteMetaBulk` (и устаревшие `getMeta`, `deleteMeta`) |
| **T4** | Установка метаданных | 500 | 120мс | 20 | `setSgtinBulk`, `setUinBulk`, `setImeiBulk`, `setGtinBulk`, `setCustomsDeclarationBulk` |

### Штрафной множитель (ответы 409)

Все DBS-эндпоинты используют **штрафной множитель 10**. Если API возвращает ответ `409 Conflict` (например, при недопустимом переходе статуса), один такой запрос засчитывается как **10 запросов** в счет вашего лимита. Это означает, что несколько ошибок 409 могут быстро исчерпать ваш лимит запросов.

**Избегайте ошибок 409:**
- Проверяйте статус заказа через `getStatusesBulk()` перед попыткой изменения статуса
- Не подтверждайте уже подтвержденные заказы
- Убедитесь, что метаданные установлены до подтверждения заказов, которые их требуют

### Советы по лимитам запросов

- **T2 (Запись статуса)** — самый строгий: 60 запросов/минуту. Объединяйте идентификаторы заказов в вызовы `confirmBulk([...])` вместо подтверждения по одному.
- **T4 (Установка метаданных)** — самый щедрый: 500 запросов/минуту. Операции установки метаданных быстрые, но массовые вызовы все равно уменьшают количество обращений к серверу.
- SDK обрабатывает лимиты автоматически. При достижении лимита запрос ставится в очередь и повторяется после необходимого интервала.
- **Следите за ошибками 409**: Каждый ответ 409 засчитывается как 10 запросов к лимиту (штрафной множитель), поэтому недопустимые переходы статусов обходятся дорого.

```typescript
// Эффективно: один API-вызов для 500 заказов
const result = await sdk.ordersDBS.confirmBulk(orderIds); // 1 вызов T2

// Неэффективно: 500 API-вызовов (исчерпает лимит T2 примерно за ~8 минут)
// for (const id of orderIds) {
//   await sdk.ordersDBS.confirm(id); // 500 вызовов T2 — НЕ ДЕЛАЙТЕ ТАК
// }
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

async function processOrders() {
  try {
    const orders = await sdk.ordersDBS.getNewOrders();
    // Обработка заказов...
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Превышен лимит запросов');
      console.error(`Повторить через: ${error.retryAfter}мс`);
      // SDK обрабатывает повторы автоматически, но можно добавить логирование
    } else if (error instanceof AuthenticationError) {
      console.error('Неверный API-ключ');
      // Проверьте настройки API-ключа
    } else if (error instanceof ValidationError) {
      console.error('Ошибка валидации:', error.message);
      // Исправьте параметры запроса
    } else if (error instanceof NetworkError) {
      console.error('Сетевая ошибка:', error.message);
      // Проверьте подключение
    } else if (error instanceof WBAPIError) {
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Обработка ошибок массовых операций

```typescript
const result = await sdk.ordersDBS.confirmBulk(orderIds);

// Проверка результата каждого заказа
const successful = [];
const failed = [];

for (const orderResult of result.results ?? []) {
  if (orderResult.isError) {
    failed.push({
      orderId: orderResult.orderId,
      errors: orderResult.errors
    });
  } else {
    successful.push(orderResult.orderId);
  }
}

console.log(`Подтверждено: ${successful.length}`);
console.log(`Ошибки: ${failed.length}`);

// Обработка неудачных попыток
for (const failure of failed) {
  console.error(`Заказ ${failure.orderId}:`, failure.errors);
}
```

## Лучшие практики

### 1. Используйте массовые методы для метаданных

```typescript
// Рекомендуется: установить метаданные для всех заказов в одном вызове
const result = await sdk.ordersDBS.setImeiBulk({
  orders: [
    { orderId: 111, imei: '123456789012345' },
    { orderId: 222, imei: '543210987654321' }
  ]
});

// Избегайте: установка метаданных по одному заказу (deprecated, отключается 13 апреля 2026)
// await sdk.ordersDBS.setImei(111, '123456789012345');
// await sdk.ordersDBS.setImei(222, '543210987654321');
```

### 2. Проверяйте метаданные перед подтверждением

```typescript
// Всегда добавляйте обязательные метаданные перед подтверждением
const order = newOrders.orders?.[0];
if (order?.requiredMeta?.length) {
  // Сначала установите все обязательные метаданные через массовые методы
  // Затем подтвердите
}

await sdk.ordersDBS.confirmBulk([order.id!]);
```

### 3. Группируйте операции

```typescript
// Обработка нескольких заказов эффективно
const orderIds = orders.orders?.map(o => o.id!).filter(Boolean) ?? [];

// Один API-вызов для всех заказов
const statuses = await sdk.ordersDBS.getStatusesBulk(orderIds);
```

### 4. Обрабатывайте пагинацию

```typescript
// Получение всех выполненных заказов с пагинацией
const now = Math.floor(Date.now() / 1000);
const thirtyDaysAgo = now - 30 * 24 * 60 * 60;

let allOrders = [];
let next = 0;

do {
  const result = await sdk.ordersDBS.getOrders({
    limit: 1000,
    next,
    dateFrom: thirtyDaysAgo,
    dateTo: now
  });

  allOrders.push(...(result.orders ?? []));
  next = result.next ?? 0;
} while (next > 0);
```

### 5. Учитывайте лимиты запросов

```typescript
// DBS API имеет 4-уровневую систему лимитов запросов.
// SDK обрабатывает лимиты автоматически, но для высоконагруженных операций
// группируйте идентификаторы заказов для уменьшения количества API-вызовов.

const BATCH_SIZE = 1000; // Максимум элементов в одном массовом запросе
const orderBatches = chunkArray(orderIds, BATCH_SIZE);

for (const batch of orderBatches) {
  const result = await sdk.ordersDBS.confirmBulk(batch);
  // Обработка результата...
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

### 6. Логирование и мониторинг

```typescript
// Логируйте важные операции для отладки
async function confirmOrderWithLogging(orderId: number) {
  console.log(`[DBS] Подтверждение заказа ${orderId}`);

  const result = await sdk.ordersDBS.confirmBulk([orderId]);
  const orderResult = result.results?.[0];

  if (orderResult?.isError) {
    console.error(`[DBS] Ошибка подтверждения заказа ${orderId}:`, orderResult.errors);
    throw new Error(`Ошибка подтверждения: ${orderResult.errors?.[0]?.detail}`);
  }

  console.log(`[DBS] Заказ ${orderId} успешно подтвержден`);
  return result;
}
```

## Типичные проблемы

### «Диапазон дат превышает 30 дней»

```typescript
// Неправильно
const result = await sdk.ordersDBS.getOrders({
  limit: 100,
  next: 0,
  dateFrom: now - 60 * 24 * 60 * 60, // 60 дней назад
  dateTo: now
});

// Правильно — разбить на части по 30 дней
const chunks = splitDateRange(startDate, endDate, 30);
for (const chunk of chunks) {
  const result = await sdk.ordersDBS.getOrders({
    limit: 100,
    next: 0,
    dateFrom: chunk.from,
    dateTo: chunk.to
  });
}
```

### «Массив orderIds не может быть пустым»

```typescript
// Всегда проверяйте перед вызовом
const orderIds = orders.orders?.map(o => o.id!).filter(Boolean) ?? [];

if (orderIds.length > 0) {
  const clientInfo = await sdk.ordersDBS.getClientInfo(orderIds);
}
```

### «IMEI должен содержать ровно 15 символов»

```typescript
// Валидируйте перед вызовом
const imei = '123456789012345';
if (imei.length !== 15) {
  throw new Error(`Неверная длина IMEI: ${imei.length}, ожидается 15`);
}
await sdk.ordersDBS.setImeiBulk({
  orders: [{ orderId: orderId, imei }]
});
```

## Дальнейшие шаги

- [Справочник API: OrdersDbsModule](/api/classes/OrdersDbsModule)
- [Рабочие процессы заказов DBS](/guides/orders-dbs-workflows)
- [Руководство по миграции: с устаревших на массовые методы](/guides/migration-dbs-legacy-to-bulk)
- [Пример: Базовый процесс DBS](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-core-workflow.ts)
- [Пример: Заказы B2B](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-b2b.ts)
- [Пример: Метаданные](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-metadata.ts)
- [Официальная документация WB DBS API](https://dev.wildberries.ru/openapi/orders-dbs)

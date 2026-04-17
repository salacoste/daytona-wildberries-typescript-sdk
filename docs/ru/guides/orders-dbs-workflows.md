---
title: Рабочие процессы заказов DBS
description: Типичные рабочие процессы и паттерны обработки заказов DBS (доставка продавцом)
layout: doc
---

# Рабочие процессы заказов DBS

Это руководство описывает типичные рабочие процессы обработки заказов DBS (доставка продавцом) с помощью TypeScript SDK Wildberries.

> **Уведомление о миграции**: Устаревшие методы для работы с отдельными заказами объявлены deprecated и будут **отключены 13 апреля 2026 года**. Все рабочие процессы в этом руководстве используют рекомендованные массовые методы. Подробности см. в [Руководстве по миграции](/guides/migration-dbs-legacy-to-bulk).

## Содержание

- [Обзор жизненного цикла заказа](#обзор-жизненного-цикла-заказа)
- [Обработка новых заказов](#обработка-новых-заказов)
- [Планирование маршрута доставки](#планирование-маршрута-доставки)
- [Массовая работа с метаданными](#массовая-работа-с-метаданными)
- [Соответствие требованиям к метаданным](#соответствие-требованиям-к-метаданным)
- [Переходы статусов](#переходы-статусов)
- [Обработка заказов B2B](#обработка-заказов-b2b)
- [Пакетная обработка](#пакетная-обработка)
- [Восстановление после ошибок](#восстановление-после-ошибок)
- [Миграция с устаревших методов](#миграция-с-устаревших-методов)

## Обзор жизненного цикла заказа

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    НОВЫЙ    │────▶│ ПОДТВЕРЖДЕН │────▶│  ДОСТАВЛЕН  │────▶│   ПОЛУЧЕН   │────▶│   ПРОДАН    │
│             │     │             │     │             │     │             │     │             │
│(новый заказ)│     │  (принят)   │     │  (в пути)   │     │ (передача)  │     │ (завершен)  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │                   │
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   ОТМЕНЕН   │     │   ОТМЕНЕН   │     │   ОТМЕНЕН   │     │  ОТКЛОНЕН   │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Значения статусов

| Статус | Действие продавца | Описание |
|--------|-------------------|----------|
| `new` | - | Новый заказ, ожидающий обработки |
| `confirm` | `confirmBulk()` | Заказ принят к доставке |
| `deliver` | `deliverBulk()` | Заказ передан в доставку |
| `receive` | `receiveBulk()` | Покупатель получил товар |
| `reject` | `rejectBulk()` | Покупатель отказался от доставки |
| `cancel` | `cancelBulk()` | Заказ отменен |

## Обработка новых заказов

### Полный процесс обработки

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function processNewOrders() {
  // Шаг 1: Получение новых заказов
  const { orders } = await sdk.ordersDBS.getNewOrders();

  if (!orders?.length) {
    console.log('Новых заказов нет');
    return;
  }

  console.log(`Обработка ${orders.length} новых заказов`);

  // Шаг 2: Получение контактных данных покупателей
  const orderIds = orders.map(o => o.id!).filter(Boolean);
  const { orders: clients } = await sdk.ordersDBS.getClientInfo(orderIds);

  // Шаг 3: Создание карты заказов со всеми данными
  const orderMap = new Map();

  for (const order of orders) {
    const client = clients?.find(c => c.orderID === order.id);

    orderMap.set(order.id, {
      order,
      client,
      address: order.address?.fullAddress,
      gps: order.address?.latitude && order.address?.longitude
        ? { lat: order.address.latitude, lng: order.address.longitude }
        : null,
      deliveryWindow: {
        date: order.ddate,
        from: order.dTimeFrom,
        to: order.dTimeTo
      },
      requiredMeta: order.requiredMeta ?? [],
      customerPhone: client?.phone
        ? `+${client.phoneCode}${client.phone}`
        : null
    });
  }

  // Шаг 4: Установка метаданных массовыми методами (сгруппированных по типу)
  await processMetadataBulk(orders);

  // Шаг 5: Подтверждение всех заказов одновременно
  const confirmableIds = Array.from(orderMap.keys());
  const result = await sdk.ordersDBS.confirmBulk(confirmableIds);

  for (const r of result.results ?? []) {
    if (r.isError) {
      console.error(`Не удалось подтвердить ${r.orderId}:`, r.errors);
    } else {
      const data = orderMap.get(r.orderId);
      console.log(`Подтвержден заказ ${r.orderId} для ${data?.address}`);
    }
  }
}

async function processMetadataBulk(orders: any[]) {
  // Группировка заказов по типу обязательных метаданных, затем массовая установка
  const imeiOrders = [];
  const sgtinOrders = [];
  const uinOrders = [];
  const gtinOrders = [];
  const cdOrders = [];

  for (const order of orders) {
    const meta = order.requiredMeta ?? [];
    const values = await getMetadataFromInventory(order.id);

    if (meta.includes('imei') && values.imei) {
      imeiOrders.push({ orderId: order.id, imei: values.imei });
    }
    if (meta.includes('sgtin') && values.sgtins?.length) {
      sgtinOrders.push({ orderId: order.id, sgtins: values.sgtins });
    }
    if (meta.includes('uin') && values.uin) {
      uinOrders.push({ orderId: order.id, uin: values.uin });
    }
    if (meta.includes('gtin') && values.gtin) {
      gtinOrders.push({ orderId: order.id, gtin: values.gtin });
    }
    if (meta.includes('customsDeclaration') && values.customsDeclaration) {
      cdOrders.push({ orderId: order.id, customsDeclaration: values.customsDeclaration });
    }
  }

  // Массовая установка всех метаданных (один API-вызов на тип)
  if (imeiOrders.length > 0) {
    await sdk.ordersDBS.setImeiBulk({ orders: imeiOrders });
  }
  if (sgtinOrders.length > 0) {
    await sdk.ordersDBS.setSgtinBulk({ orders: sgtinOrders });
  }
  if (uinOrders.length > 0) {
    await sdk.ordersDBS.setUinBulk({ orders: uinOrders });
  }
  if (gtinOrders.length > 0) {
    await sdk.ordersDBS.setGtinBulk({ orders: gtinOrders });
  }
  if (cdOrders.length > 0) {
    await sdk.ordersDBS.setCustomsDeclarationBulk({ orders: cdOrders });
  }
}
```

## Планирование маршрута доставки

### Группировка заказов по местоположению

```typescript
interface DeliveryRoute {
  orders: Array<{
    orderId: number;
    address: string;
    gps: { lat: number; lng: number };
    deliveryWindow: { date: string; from: string; to: string };
    customerPhone: string;
  }>;
  totalDistance?: number;
  estimatedTime?: number;
}

async function planDeliveryRoutes(): Promise<DeliveryRoute[]> {
  const { orders } = await sdk.ordersDBS.getNewOrders();

  if (!orders?.length) return [];

  // Получение информации о покупателях
  const orderIds = orders.map(o => o.id!).filter(Boolean);
  const { orders: clients } = await sdk.ordersDBS.getClientInfo(orderIds);

  // Группировка по дате доставки
  const byDate = new Map<string, typeof orders>();

  for (const order of orders) {
    const date = order.ddate ?? 'unscheduled';
    if (!byDate.has(date)) {
      byDate.set(date, []);
    }
    byDate.get(date)!.push(order);
  }

  // Создание маршрутов для каждого дня
  const routes: DeliveryRoute[] = [];

  for (const [date, dayOrders] of byDate) {
    const routeOrders = dayOrders
      .filter(o => o.address?.latitude && o.address?.longitude)
      .map(order => {
        const client = clients?.find(c => c.orderID === order.id);
        return {
          orderId: order.id!,
          address: order.address!.fullAddress!,
          gps: {
            lat: order.address!.latitude!,
            lng: order.address!.longitude!
          },
          deliveryWindow: {
            date: order.ddate!,
            from: order.dTimeFrom!,
            to: order.dTimeTo!
          },
          customerPhone: client?.phone
            ? `+${client.phoneCode}${client.phone}`
            : ''
        };
      });

    // Сортировка по окну времени доставки
    routeOrders.sort((a, b) => {
      return a.deliveryWindow.from.localeCompare(b.deliveryWindow.from);
    });

    routes.push({
      orders: routeOrders
    });
  }

  return routes;
}

// Пример: экспорт в Google Maps
function generateGoogleMapsUrl(route: DeliveryRoute): string {
  const waypoints = route.orders
    .map(o => `${o.gps.lat},${o.gps.lng}`)
    .join('/');

  return `https://www.google.com/maps/dir/${waypoints}`;
}
```

### Оптимизация временных окон

```typescript
interface TimeSlot {
  from: string;
  to: string;
  orders: number[];
}

function groupByTimeSlot(orders: any[]): TimeSlot[] {
  const slots = new Map<string, number[]>();

  for (const order of orders) {
    const slotKey = `${order.dTimeFrom}-${order.dTimeTo}`;
    if (!slots.has(slotKey)) {
      slots.set(slotKey, []);
    }
    slots.get(slotKey)!.push(order.id);
  }

  return Array.from(slots.entries())
    .map(([key, orderIds]) => {
      const [from, to] = key.split('-');
      return { from, to, orders: orderIds };
    })
    .sort((a, b) => a.from.localeCompare(b.from));
}
```

## Массовая работа с метаданными

Массовые методы для работы с метаданными заменяют устаревшие методы для отдельных заказов и позволяют устанавливать, получать и удалять метаданные для нескольких заказов за один API-вызов.

### Паттерн «Установка — Проверка — Подтверждение»

```typescript
async function setVerifyConfirm(orders: any[]) {
  const orderIds = orders.map(o => o.id!).filter(Boolean);

  // 1. Массовая установка метаданных (сгруппированных по типу)
  await processMetadataBulk(orders);

  // 2. Проверка правильности установки всех метаданных
  const metaResult = await sdk.ordersDBS.getMetaBulk({ orders: orderIds });
  const incomplete: number[] = [];

  for (const orderMeta of metaResult.orders ?? []) {
    const order = orders.find(o => o.id === orderMeta.orderId);
    const required = order?.requiredMeta ?? [];

    for (const metaType of required) {
      if (!checkMetadataValue(orderMeta, metaType)) {
        incomplete.push(orderMeta.orderId!);
        console.warn(`Заказ ${orderMeta.orderId}: отсутствует ${metaType}`);
        break;
      }
    }
  }

  // 3. Подтверждение только заказов с полными метаданными
  const readyIds = orderIds.filter(id => !incomplete.includes(id));
  if (readyIds.length > 0) {
    const result = await sdk.ordersDBS.confirmBulk(readyIds);
    console.log(`Подтверждено ${readyIds.length} заказов`);
  }

  if (incomplete.length > 0) {
    console.warn(`${incomplete.length} заказов пропущено (отсутствуют метаданные)`);
  }
}
```

### Массовое удаление и повторная установка метаданных

```typescript
// Исправление метаданных для нескольких заказов одновременно
async function correctMetadata(
  orderIds: number[],
  metaType: string,
  newValues: Map<number, string>
) {
  // 1. Массовое удаление старых метаданных
  await sdk.ordersDBS.deleteMetaBulk({
    orders: orderIds,
    key: metaType as any
  });

  // 2. Массовая установка исправленных значений
  switch (metaType) {
    case 'imei':
      await sdk.ordersDBS.setImeiBulk({
        orders: orderIds.map(id => ({
          orderId: id,
          imei: newValues.get(id)!
        }))
      });
      break;
    case 'gtin':
      await sdk.ordersDBS.setGtinBulk({
        orders: orderIds.map(id => ({
          orderId: id,
          gtin: newValues.get(id)!
        }))
      });
      break;
    // ... аналогичная обработка других типов
  }

  // 3. Проверка исправлений
  const meta = await sdk.ordersDBS.getMetaBulk({ orders: orderIds });
  for (const m of meta.orders ?? []) {
    console.log(`Заказ ${m.orderId}: ${metaType} обновлен`);
  }
}
```

## Соответствие требованиям к метаданным

### Автоматизированный процесс работы с метаданными

```typescript
interface MetadataResult {
  orderId: number;
  success: boolean;
  errors: string[];
}

async function ensureMetadataCompliance(
  orderIds: number[]
): Promise<MetadataResult[]> {
  const results: MetadataResult[] = [];

  // Получение текущих заказов для проверки обязательных метаданных
  const { orders } = await sdk.ordersDBS.getNewOrders();

  // Получение метаданных для всех заказов одним массовым вызовом
  const metaBulk = await sdk.ordersDBS.getMetaBulk({ orders: orderIds });
  const metaMap = new Map(
    (metaBulk.orders ?? []).map(m => [m.orderId, m])
  );

  for (const orderId of orderIds) {
    const order = orders?.find(o => o.id === orderId);

    if (!order) {
      results.push({
        orderId,
        success: false,
        errors: ['Заказ не найден']
      });
      continue;
    }

    const errors: string[] = [];
    const required = order.requiredMeta ?? [];

    if (required.length === 0) {
      results.push({ orderId, success: true, errors: [] });
      continue;
    }

    // Проверка каждого обязательного типа с использованием массово полученных метаданных
    const meta = metaMap.get(orderId);
    for (const metaType of required) {
      const hasValue = checkMetadataValue(meta, metaType);

      if (!hasValue) {
        // Попытка установить из складской системы
        try {
          await setMetadataFromInventory(orderId, metaType);
        } catch (err) {
          errors.push(`Не удалось установить ${metaType}: ${err}`);
        }
      }
    }

    results.push({
      orderId,
      success: errors.length === 0,
      errors
    });
  }

  return results;
}

function checkMetadataValue(orderMeta: any, type: string): boolean {
  switch (type) {
    case 'imei':
      return !!orderMeta?.imei;
    case 'sgtin':
      return (orderMeta?.sgtins?.length ?? 0) > 0;
    case 'uin':
      return !!orderMeta?.uin;
    case 'gtin':
      return !!orderMeta?.gtin;
    case 'customsDeclaration':
      return !!orderMeta?.customsDeclaration;
    default:
      return false;
  }
}
```

### Валидация SGTIN

```typescript
function validateSgtin(sgtin: string): { valid: boolean; error?: string } {
  if (sgtin.length < 16 || sgtin.length > 135) {
    return {
      valid: false,
      error: `Неверная длина: ${sgtin.length}. Должно быть 16-135 символов.`
    };
  }

  // Проверка формата: начинается с 01 (индикатор GTIN)
  if (!sgtin.startsWith('01')) {
    return {
      valid: false,
      error: 'SGTIN должен начинаться с "01" (индикатор GTIN)'
    };
  }

  return { valid: true };
}

async function setSgtinWithValidation(
  orders: Array<{ orderId: number; sgtins: string[] }>
): Promise<void> {
  // Сначала валидируем все SGTIN для всех заказов
  for (const order of orders) {
    const invalid = order.sgtins
      .map(s => ({ sgtin: s, ...validateSgtin(s) }))
      .filter(r => !r.valid);

    if (invalid.length > 0) {
      throw new Error(
        `Заказ ${order.orderId} недопустимые SGTIN: ${invalid.map(i => `${i.sgtin}: ${i.error}`).join(', ')}`
      );
    }

    if (order.sgtins.length > 24) {
      throw new Error(`Заказ ${order.orderId}: слишком много SGTIN (${order.sgtins.length}). Максимум 24.`);
    }
  }

  // Установка всех SGTIN одним массовым вызовом
  await sdk.ordersDBS.setSgtinBulk({ orders });
}
```

## Переходы статусов

### Массовое обновление статусов

```typescript
interface StatusUpdateResult {
  successful: number[];
  failed: Array<{ orderId: number; error: string }>;
}

async function bulkConfirm(orderIds: number[]): Promise<StatusUpdateResult> {
  const result = await sdk.ordersDBS.confirmBulk(orderIds);

  const successful: number[] = [];
  const failed: Array<{ orderId: number; error: string }> = [];

  for (const r of result.results ?? []) {
    if (r.isError) {
      failed.push({
        orderId: r.orderId!,
        error: r.errors?.[0]?.detail ?? 'Неизвестная ошибка'
      });
    } else {
      successful.push(r.orderId!);
    }
  }

  return { successful, failed };
}

async function bulkDeliver(orderIds: number[]): Promise<StatusUpdateResult> {
  const result = await sdk.ordersDBS.deliverBulk(orderIds);

  const successful: number[] = [];
  const failed: Array<{ orderId: number; error: string }> = [];

  for (const r of result.results ?? []) {
    if (r.isError) {
      failed.push({
        orderId: r.orderId!,
        error: r.errors?.[0]?.detail ?? 'Неизвестная ошибка'
      });
    } else {
      successful.push(r.orderId!);
    }
  }

  return { successful, failed };
}

async function completeHandover(
  orderCodes: Array<{ orderId: number; code: string }>
): Promise<StatusUpdateResult> {
  const result = await sdk.ordersDBS.receiveBulk(orderCodes);

  const successful: number[] = [];
  const failed: Array<{ orderId: number; error: string }> = [];

  for (const r of result.results ?? []) {
    if (r.isError) {
      failed.push({
        orderId: r.orderId!,
        error: r.errors?.[0]?.detail ?? 'Неизвестная ошибка'
      });
    } else {
      successful.push(r.orderId!);
    }
  }

  return { successful, failed };
}
```

### Мониторинг статусов

```typescript
async function monitorOrderStatuses(orderIds: number[]): Promise<void> {
  const { orders } = await sdk.ordersDBS.getStatusesBulk(orderIds);

  const statusCounts = new Map<string, number>();

  for (const order of orders ?? []) {
    const status = order.supplierStatus ?? 'unknown';
    statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);

    // Логирование ошибок
    if (order.errors?.length) {
      console.error(`Ошибки заказа ${order.orderId}:`, order.errors);
    }
  }

  console.log('Сводка по статусам:');
  for (const [status, count] of statusCounts) {
    console.log(`  ${status}: ${count}`);
  }
}
```

## Обработка заказов B2B

### Определение и обработка заказов B2B

```typescript
interface B2BOrder {
  orderId: number;
  organization: {
    name: string;
    inn: string;
    kpp?: string;
  };
}

async function getB2BOrders(orderIds: number[]): Promise<B2BOrder[]> {
  const { results } = await sdk.ordersDBS.getB2BInfo(orderIds);

  const b2bOrders: B2BOrder[] = [];

  for (const result of results ?? []) {
    if (!result.isError && result.data) {
      b2bOrders.push({
        orderId: result.orderId!,
        organization: {
          name: result.data.orgName!,
          inn: result.data.inn!,
          kpp: result.data.kpp
        }
      });
    }
  }

  return b2bOrders;
}

// Формирование данных счета для заказов B2B
interface InvoiceData {
  orderRef: string;
  buyer: string;
  inn: string;
  kpp: string;
  isIndividualEntrepreneur: boolean;
}

function generateInvoiceData(b2bOrder: B2BOrder): InvoiceData {
  return {
    orderRef: `WB-DBS-${b2bOrder.orderId}`,
    buyer: b2bOrder.organization.name,
    inn: b2bOrder.organization.inn,
    kpp: b2bOrder.organization.kpp ?? '',
    // ИП имеют 12-значный ИНН и не имеют КПП
    isIndividualEntrepreneur:
      b2bOrder.organization.inn.length === 12 && !b2bOrder.organization.kpp
  };
}
```

## Пакетная обработка

### Обработка заказов пакетами

```typescript
const BATCH_SIZE = 1000;

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function batchConfirmOrders(orderIds: number[]): Promise<{
  totalSuccessful: number;
  totalFailed: number;
  errors: Array<{ orderId: number; error: string }>;
}> {
  const batches = chunkArray(orderIds, BATCH_SIZE);

  let totalSuccessful = 0;
  let totalFailed = 0;
  const errors: Array<{ orderId: number; error: string }> = [];

  for (const batch of batches) {
    const result = await sdk.ordersDBS.confirmBulk(batch);

    for (const r of result.results ?? []) {
      if (r.isError) {
        totalFailed++;
        errors.push({
          orderId: r.orderId!,
          error: r.errors?.[0]?.detail ?? 'Неизвестная ошибка'
        });
      } else {
        totalSuccessful++;
      }
    }

    // Задержка между пакетами для предотвращения превышения лимитов
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return { totalSuccessful, totalFailed, errors };
}
```

### Получение всех выполненных заказов

```typescript
async function fetchAllCompletedOrders(
  dateFrom: Date,
  dateTo: Date
): Promise<any[]> {
  const fromTs = Math.floor(dateFrom.getTime() / 1000);
  const toTs = Math.floor(dateTo.getTime() / 1000);

  // Проверка диапазона дат (максимум 30 дней)
  const MAX_DAYS = 30 * 24 * 60 * 60;
  if (toTs - fromTs > MAX_DAYS) {
    throw new Error('Диапазон дат не может превышать 30 дней');
  }

  const allOrders: any[] = [];
  let next = 0;

  do {
    const result = await sdk.ordersDBS.getOrders({
      limit: 1000,
      next,
      dateFrom: fromTs,
      dateTo: toTs
    });

    allOrders.push(...(result.orders ?? []));
    next = result.next ?? 0;

  } while (next > 0);

  return allOrders;
}
```

## Учет лимитов запросов

### Штрафной множитель (ответы 409)

Все DBS-эндпоинты применяют **штрафной множитель 10**. Если API возвращает ответ `409 Conflict` (например, подтверждение уже подтвержденного заказа или недопустимый переход статуса), один такой запрос засчитывается как **10 запросов** в счет вашего лимита.

Это особенно важно для операций T2 (запись статуса), которые допускают только 60 запросов/минуту. Несколько ошибок 409 могут исчерпать весь ваш лимит запросов:

```typescript
// Всегда проверяйте статус перед переходом, чтобы избежать штрафа 409
const statuses = await sdk.ordersDBS.getStatusesBulk(orderIds);
const confirmable = (statuses.orders ?? [])
  .filter(o => o.supplierStatus === 'new')
  .map(o => o.orderId!);

// Подтверждаем только заказы, которые действительно в статусе "new"
if (confirmable.length > 0) {
  await sdk.ordersDBS.confirmBulk(confirmable);
}
```

## Восстановление после ошибок

### Повторные попытки неудачных операций

```typescript
interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier: number;
}

async function retryOperation<T>(
  operation: () => Promise<T>,
  config: RetryConfig = { maxAttempts: 3, delayMs: 1000, backoffMultiplier: 2 }
): Promise<T> {
  let lastError: Error | undefined;
  let delay = config.delayMs;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      console.warn(`Попытка ${attempt}/${config.maxAttempts} не удалась:`, error);

      if (attempt < config.maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= config.backoffMultiplier;
      }
    }
  }

  throw lastError;
}

// Пример использования
async function confirmWithRetry(orderIds: number[]) {
  return retryOperation(
    () => sdk.ordersDBS.confirmBulk(orderIds),
    { maxAttempts: 3, delayMs: 1000, backoffMultiplier: 2 }
  );
}
```

### Обработка частичных ошибок

```typescript
async function processWithPartialFailureHandling(
  orderIds: number[]
): Promise<{
  processed: number[];
  retryLater: number[];
  permanentFailures: number[];
}> {
  const result = await sdk.ordersDBS.confirmBulk(orderIds);

  const processed: number[] = [];
  const retryLater: number[] = [];
  const permanentFailures: number[] = [];

  for (const r of result.results ?? []) {
    if (!r.isError) {
      processed.push(r.orderId!);
      continue;
    }

    const errorCode = r.errors?.[0]?.code;

    // Классификация ошибок
    if (isTransientError(errorCode)) {
      retryLater.push(r.orderId!);
    } else {
      permanentFailures.push(r.orderId!);
    }
  }

  return { processed, retryLater, permanentFailures };
}

function isTransientError(code?: number): boolean {
  // Определение, какие ошибки являются временными (можно повторить)
  const transientCodes = [
    429,  // Превышение лимита
    500,  // Ошибка сервера
    503,  // Сервис недоступен
  ];
  return code ? transientCodes.includes(code) : false;
}
```

## Миграция с устаревших методов

Если ваши рабочие процессы все еще используют устаревшие методы для отдельных заказов (`getMeta`, `deleteMeta`, `setSgtin`, `setImei`, `setUin`, `setGtin`, `setCustomsDeclaration`), необходимо перейти на массовые методы до **13 апреля 2026 года**.

### Краткая сводка по миграции

| Старый паттерн | Новый паттерн |
|----------------|---------------|
| `getMeta(orderId)` по одному | `getMetaBulk({ orders: [id1, id2, ...] })` |
| `deleteMeta(orderId, key)` по одному | `deleteMetaBulk({ orders: [id1, id2], key })` |
| `setImei(orderId, imei)` по заказу | `setImeiBulk({ orders: [{orderId, imei}, ...] })` |
| `setSgtin(orderId, sgtins)` по заказу | `setSgtinBulk({ orders: [{orderId, sgtins}, ...] })` |
| `setUin(orderId, uin)` по заказу | `setUinBulk({ orders: [{orderId, uin}, ...] })` |
| `setGtin(orderId, gtin)` по заказу | `setGtinBulk({ orders: [{orderId, gtin}, ...] })` |
| `setCustomsDeclaration(orderId, cd)` по заказу | `setCustomsDeclarationBulk({ orders: [{orderId, customsDeclaration}, ...] })` |

### Пример «До» и «После»

```typescript
// ДО (deprecated — перестанет работать 13 апреля 2026)
for (const orderId of orderIds) {
  const meta = await sdk.ordersDBS.getMeta(orderId);      // N API-вызовов
  if (!meta.meta?.imei?.value) {
    await sdk.ordersDBS.setImei(orderId, getImei(orderId)); // еще N вызовов
  }
}

// ПОСЛЕ (рекомендуется — меньше API-вызовов, выше производительность)
const meta = await sdk.ordersDBS.getMetaBulk({ orders: orderIds }); // 1 вызов
const needsImei = (meta.orders ?? [])
  .filter(m => !m.imei)
  .map(m => ({ orderId: m.orderId!, imei: getImei(m.orderId!) }));

if (needsImei.length > 0) {
  await sdk.ordersDBS.setImeiBulk({ orders: needsImei });           // 1 вызов
}
```

Полное руководство по миграции с описанием всех методов, изменениями в обработке ошибок и пошаговым чек-листом см. в [Руководстве по миграции: с устаревших на массовые методы](/guides/migration-dbs-legacy-to-bulk).

## См. также

- [Справочник API OrdersDbsModule](/api/classes/OrdersDbsModule)
- [Руководство по началу работы с DBS](/guides/orders-dbs-getting-started)
- [Руководство по миграции: с устаревших на массовые методы](/guides/migration-dbs-legacy-to-bulk)
- [Официальная документация WB DBS API](https://dev.wildberries.ru/openapi/orders-dbs)

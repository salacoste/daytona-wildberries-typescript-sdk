# Руководство по миграции: с устаревших методов DBS на массовые

**Срок:** 13 апреля 2026
**Затрагиваемый модуль:** Orders DBS (`sdk.ordersDBS`)

## Обзор

Wildberries объявляет устаревшими методы DBS для работы со статусами **и метаданными** отдельных заказов в пользу массовых операций. Все 13 устаревших методов будут **отключены 13 апреля 2026 года**. Это руководство поможет вам перевести код на новый массовый API.

## Зачем мигрировать?

1. **Лучшая производительность**: Обработка нескольких заказов за один API-вызов
2. **Меньше проблем с лимитами**: Меньше запросов — меньше проблем с лимитами
3. **Готовность к будущему**: Устаревшие методы перестанут работать после 13 апреля 2026
4. **Единообразная обработка ошибок**: Массовые методы возвращают детальные результаты по каждому заказу

## Соответствие методов

### Методы статусов

| Устаревший метод | Массовая замена | Примечание |
|------------------|-----------------|------------|
| `getStatuses(orderIds)` | `getStatusesBulk(orderIds)` | Та же сигнатура |
| `confirm(orderId)` | `confirmBulk([orderId])` | Обернуть в массив |
| `deliver(orderId)` | `deliverBulk([orderId])` | Обернуть в массив |
| `receive(orderId, code)` | `receiveBulk([{orderId, code}])` | Формат объекта |
| `reject(orderId, code)` | `rejectBulk([{orderId, code}])` | Формат объекта |
| `cancel(orderId)` | `cancelBulk([orderId])` | Обернуть в массив |

### Методы метаданных

| Устаревший метод | Массовая замена | Примечание |
|------------------|-----------------|------------|
| `getMeta(orderId)` | `getMetaBulk({ orders: [orderId] })` | Формат объекта запроса |
| `deleteMeta(orderId, key)` | `deleteMetaBulk({ orders: [orderId], key })` | Формат объекта запроса |
| `setSgtin(orderId, sgtins)` | `setSgtinBulk({ orders: [{ orderId, sgtins }] })` | Формат вложенного объекта |
| `setUin(orderId, uin)` | `setUinBulk({ orders: [{ orderId, uin }] })` | Формат вложенного объекта |
| `setImei(orderId, imei)` | `setImeiBulk({ orders: [{ orderId, imei }] })` | Формат вложенного объекта |
| `setGtin(orderId, gtin)` | `setGtinBulk({ orders: [{ orderId, gtin }] })` | Формат вложенного объекта |
| `setCustomsDeclaration(orderId, cd)` | `setCustomsDeclarationBulk({ orders: [{ orderId, customsDeclaration }] })` | Формат вложенного объекта |

### Различия в лимитах запросов

Массовые методы используют те же уровни лимитов, что и их устаревшие аналоги, но поскольку вы можете обрабатывать несколько заказов за один вызов, общее количество API-запросов значительно сокращается.

| Уровень | Устаревшие методы | Массовые методы | Запр/мин | Интервал |
|---------|-------------------|-----------------|----------|----------|
| **T1** | `getStatuses` | `getStatusesBulk` | 300 | 200мс |
| **T2** | `confirm`, `deliver`, `receive`, `reject`, `cancel` | `confirmBulk`, `deliverBulk`, `receiveBulk`, `rejectBulk`, `cancelBulk` | 60 | 1с |
| **T3** | `getMeta`, `deleteMeta` | `getMetaBulk`, `deleteMetaBulk` | 150 | 400мс |
| **T4** | `setSgtin`, `setUin`, `setImei`, `setGtin`, `setCustomsDeclaration` | `setSgtinBulk`, `setUinBulk`, `setImeiBulk`, `setGtinBulk`, `setCustomsDeclarationBulk` | 500 | 120мс |

**Пример**: Обработка 100 заказов с метаданными IMEI требует 100 вызовов T4 с устаревшим `setImei()`, но только 1 вызов T4 с `setImeiBulk()`.

> **Штрафной множитель**: Все DBS-эндпоинты используют штрафной множитель **10**. Если API возвращает ответ `409 Conflict` (например, при недопустимом переходе статуса), один такой запрос засчитывается как **10 запросов** в счет вашего лимита. Массовые методы снижают вероятность получения этого штрафа, поскольку вы можете проверить состояния заказов перед выполнением пакетных переходов.

## Примеры миграции

### Получение статусов

**До (устаревший):**
```typescript
const statuses = await sdk.ordersDBS.getStatuses([orderId1, orderId2]);
statuses.orders?.forEach(order => {
  console.log(`Заказ ${order.id}: ${order.supplierStatus}`);
});
```

**После (массовый):**
```typescript
const statuses = await sdk.ordersDBS.getStatusesBulk([orderId1, orderId2]);
statuses.orders?.forEach(order => {
  console.log(`Заказ ${order.orderId}: ${order.supplierStatus}`);
  if (order.errors?.length) {
    console.error('Ошибки:', order.errors);
  }
});
```

### Подтверждение заказа

**До (устаревший):**
```typescript
await sdk.ordersDBS.confirm(orderId);
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.confirmBulk([orderId]);
const orderResult = result.results?.[0];
if (orderResult?.isError) {
  console.error('Ошибка:', orderResult.errors);
} else {
  console.log('Успешно подтвержден');
}
```

### Доставка заказа

**До (устаревший):**
```typescript
await sdk.ordersDBS.deliver(orderId);
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.deliverBulk([orderId]);
// Обработка result.results для каждого заказа
```

### Получение заказа (с кодом подтверждения)

**До (устаревший):**
```typescript
await sdk.ordersDBS.receive(orderId, '1234');
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.receiveBulk([
  { orderId: orderId, code: '1234' }
]);
// Обработка result.results для каждого заказа
```

### Отклонение заказа (с кодом подтверждения)

**До (устаревший):**
```typescript
await sdk.ordersDBS.reject(orderId, '1234');
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.rejectBulk([
  { orderId: orderId, code: '1234' }
]);
// Обработка result.results для каждого заказа
```

### Отмена заказа

**До (устаревший):**
```typescript
await sdk.ordersDBS.cancel(orderId);
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.cancelBulk([orderId]);
// Обработка result.results для каждого заказа
```

### Получение метаданных

**До (устаревший):**
```typescript
const meta = await sdk.ordersDBS.getMeta(orderId);
if (meta.meta?.imei?.value) {
  console.log(`IMEI: ${meta.meta.imei.value}`);
}
```

**После (массовый):**
```typescript
const meta = await sdk.ordersDBS.getMetaBulk({ orders: [orderId] });
for (const orderMeta of meta.orders ?? []) {
  if (orderMeta.imei) {
    console.log(`Заказ ${orderMeta.orderId} IMEI: ${orderMeta.imei}`);
  }
}
```

### Установка IMEI

**До (устаревший):**
```typescript
await sdk.ordersDBS.setImei(orderId, '123456789012345');
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.setImeiBulk({
  orders: [{ orderId, imei: '123456789012345' }]
});
```

### Установка SGTIN

**До (устаревший):**
```typescript
await sdk.ordersDBS.setSgtin(orderId, ['01046012345678900421abc123']);
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.setSgtinBulk({
  orders: [{ orderId, sgtins: ['01046012345678900421abc123'] }]
});
```

### Установка UIN / GTIN / таможенной декларации

**До (устаревший):**
```typescript
await sdk.ordersDBS.setUin(orderId, '1234567890123456');
await sdk.ordersDBS.setGtin(orderId, '1234567890123');
await sdk.ordersDBS.setCustomsDeclaration(orderId, '10130030/010123/0000001');
```

**После (массовый):**
```typescript
await sdk.ordersDBS.setUinBulk({
  orders: [{ orderId, uin: '1234567890123456' }]
});

await sdk.ordersDBS.setGtinBulk({
  orders: [{ orderId, gtin: '1234567890123' }]
});

await sdk.ordersDBS.setCustomsDeclarationBulk({
  orders: [{ orderId, customsDeclaration: '10130030/010123/0000001' }]
});
```

### Удаление метаданных

**До (устаревший):**
```typescript
await sdk.ordersDBS.deleteMeta(orderId, 'imei');
```

**После (массовый):**
```typescript
const result = await sdk.ordersDBS.deleteMetaBulk({
  orders: [orderId],
  key: 'imei'
});
```

## Обработка нескольких заказов

Главное преимущество массовых методов — эффективная обработка нескольких заказов:

```typescript
// Обработка всех ожидающих заказов одновременно
const orderIds = pendingOrders.map(o => o.id);

// Подтверждение всех заказов одним API-вызовом
const confirmResult = await sdk.ordersDBS.confirmBulk(orderIds);

// Проверка результатов для каждого заказа
confirmResult.results?.forEach(result => {
  if (result.isError) {
    console.error(`Заказ ${result.orderId} ошибка:`, result.errors);
  } else {
    console.log(`Заказ ${result.orderId} подтвержден`);
  }
});
```

## Обработка нескольких заказов с метаданными

Массовые методы метаданных позволяют обрабатывать метаданные множества заказов за один вызов, заменяя циклы вызовов для отдельных заказов:

```typescript
// ДО: N API-вызовов для N заказов (устаревший, deprecated)
for (const order of orders) {
  const meta = await sdk.ordersDBS.getMeta(order.id);
  if (!meta.meta?.imei?.value && order.requiredMeta?.includes('imei')) {
    await sdk.ordersDBS.setImei(order.id, lookupImei(order.id));
  }
}

// ПОСЛЕ: 2 API-вызова независимо от количества заказов (массовый)
const orderIds = orders.map(o => o.id);
const metaResult = await sdk.ordersDBS.getMetaBulk({ orders: orderIds });

const needsImei = (metaResult.orders ?? [])
  .filter(m => !m.imei)
  .map(m => m.orderId!);

if (needsImei.length > 0) {
  await sdk.ordersDBS.setImeiBulk({
    orders: needsImei.map(id => ({ orderId: id, imei: lookupImei(id) }))
  });
}
```

## Изменения в обработке ошибок

### Устаревшая обработка ошибок
```typescript
try {
  await sdk.ordersDBS.confirm(orderId);
} catch (error) {
  // Ошибка выбрасывается для всей операции
  console.error('Не удалось подтвердить:', error);
}
```

### Обработка ошибок в массовых методах
```typescript
const result = await sdk.ordersDBS.confirmBulk([orderId1, orderId2]);

// Проверка результата каждого заказа индивидуально
result.results?.forEach(orderResult => {
  if (orderResult.isError) {
    // Информация об ошибке для каждого заказа
    orderResult.errors?.forEach(err => {
      console.error(`Заказ ${orderResult.orderId}: ${err.code} - ${err.detail}`);
    });
  }
});
```

## Изменения в структуре ответов

### Устаревший ответ
```typescript
interface GetStatusResponseLegacy {
  orders?: {
    id?: number;
    supplierStatus?: string;
    wbStatus?: string;
  }[];
}
```

### Массовый ответ
```typescript
interface GetStatusInfoResponse {
  orders?: {
    orderId?: number;          // Изменено с 'id'
    supplierStatus?: string;
    wbStatus?: string;
    errors?: {                 // Новое: ошибки по каждому заказу
      code?: number;
      detail?: string;
    }[];
  }[];
}
```

## Чек-лист миграции

### Методы статусов
- [ ] Найти все использования `getStatuses()` -> Заменить на `getStatusesBulk()`
- [ ] Найти все использования `confirm()` -> Заменить на `confirmBulk()`
- [ ] Найти все использования `deliver()` -> Заменить на `deliverBulk()`
- [ ] Найти все использования `receive()` -> Заменить на `receiveBulk()`
- [ ] Найти все использования `reject()` -> Заменить на `rejectBulk()`
- [ ] Найти все использования `cancel()` -> Заменить на `cancelBulk()`

### Методы метаданных
- [ ] Найти все использования `getMeta()` -> Заменить на `getMetaBulk()`
- [ ] Найти все использования `deleteMeta()` -> Заменить на `deleteMetaBulk()`
- [ ] Найти все использования `setSgtin()` -> Заменить на `setSgtinBulk()`
- [ ] Найти все использования `setUin()` -> Заменить на `setUinBulk()`
- [ ] Найти все использования `setImei()` -> Заменить на `setImeiBulk()`
- [ ] Найти все использования `setGtin()` -> Заменить на `setGtinBulk()`
- [ ] Найти все использования `setCustomsDeclaration()` -> Заменить на `setCustomsDeclarationBulk()`

### Проверка
- [ ] Обновить обработку ошибок для проверки результатов по каждому заказу
- [ ] Обновить парсинг ответов с учетом новых имен полей (`orderId` вместо `id`)
- [ ] Протестировать на данных, приближенных к продуктивным, до крайнего срока
- [ ] Удалить вызовы устаревших методов до 13 апреля 2026 года

## Хронология

| Дата | Действие |
|------|----------|
| 14 января 2026 | Массовые методы доступны |
| Сейчас | Начало миграции |
| 1 апреля 2026 | Рекомендуемая дата завершения |
| **13 апреля 2026** | **Устаревшие методы отключаются** |

## Поддержка

Если вы столкнулись с проблемами при миграции:

1. Ознакомьтесь с [документацией DBS API](https://dev.wildberries.ru/openapi/orders-dbs)
2. Изучите примеры SDK в `examples/orders-dbs-*.ts`
3. Создайте issue на [GitHub](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)

## См. также

- [Пример базового процесса DBS](../../examples/orders-dbs-core-workflow.ts)
- [Пример B2B заказов DBS](../../examples/orders-dbs-b2b.ts)
- [Пример метаданных DBS](../../examples/orders-dbs-metadata.ts)
- [Официальная документация WB DBS API](https://dev.wildberries.ru/openapi/orders-dbs)

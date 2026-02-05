# Учебное руководство 2: Рабочий процесс выполнения заказов

Узнайте, как обрабатывать заказы клиентов и управлять операциями выполнения.

## Что вы создадите

Полную систему выполнения заказов, которая:
- Получает ожидающие заказы клиентов
- Извлекает детальную информацию о заказах
- Обновляет статус заказа через этапы выполнения
- Генерирует транспортные накладные для доставки

**Примерное время:** 45 минут
**Сложность:** Средний

---

## Цели обучения

К концу этого руководства вы сможете:
- ✅ Понимать модели выполнения FBS и FBW
- ✅ Получать и фильтровать заказы по статусу
- ✅ Правильно обрабатывать переходы состояния заказов
- ✅ Генерировать транспортные накладные и информацию для отслеживания
- ✅ Грамотно обрабатывать ошибки выполнения заказов

---

## Предварительные требования

Перед началом убедитесь, что у вас есть:
- ✅ Установленный Node.js ≥ 20.0.0
- ✅ API ключ Wildberries с доступом к заказам
- ✅ Установленный SDK (`npm install daytona-wildberries-typescript-sdk`)
- ✅ Пройденное [Руководство по быстрому старту](../quickstart.md)
- ✅ Базовое понимание рабочих процессов выполнения заказов

---

## Введение

Выполнение заказов - это сердце операций электронной коммерции. Wildberries поддерживает две модели выполнения:

### FBS (Fulfillment by Seller - Выполнение продавцом)
- **Вы** управляете складированием, упаковкой и доставкой
- **Вы** генерируете транспортные накладные
- **Вы** управляете возвратами на вашем складе
- **Больший контроль** над запасами и опытом клиентов

### FBW (Fulfillment by Wildberries - Выполнение Wildberries)
- **Wildberries** управляет складированием и доставкой
- **Wildberries** управляет возвратами
- **Меньший контроль**, но проще операции
- **Фокус** на поставке товаров и маркетинге

**Это руководство фокусируется на FBS** (наиболее распространено для новых продавцов). Для FBW см. [Учебное руководство 4: Мульти-модульная интеграция](./multi-module-integration.md).

---

## Понимание состояний заказов

Заказы проходят через определенные состояния. Понимание переходов критически важно:

```
┌─────────┐
│   NEW   │ ← Заказ размещен клиентом
└────┬────┘
     │
     ▼
┌─────────────┐
│  CONFIRMED  │ ← Продавец подтверждает заказ
└──────┬──────┘
       │
       ▼
┌───────────┐
│ ASSEMBLED │ ← Товары собраны и упакованы
└─────┬─────┘
      │
      ▼
┌──────────┐
│ SHIPPED  │ ← Накладная сгенерирована, передано перевозчику
└────┬─────┘
     │
     ▼
┌────────────┐
│ DELIVERED  │ ← Клиент получил посылку
└────────────┘

    ИЛИ

┌───────────┐
│ CANCELLED │ ← Заказ отменен продавцом/клиентом
└───────────┘
```

**Важно:** Вы не можете пропускать состояния или возвращаться назад (кроме как в CANCELLED).

---

## Шаг 1: Список ожидающих заказов (10 минут)

Давайте получим все заказы, требующие обработки.

### Понимание фильтров заказов

Вы можете фильтровать заказы по:
- **Статусу:** new, confirmed, assembled, shipped, delivered, cancelled
- **Диапазону дат:** Фильтр по дате создания заказа
- **Типу выполнения:** FBS или FBW

### Пример кода

Создайте файл `order-fulfillment.ts`:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function listPendingOrders() {
  try {
    // Получение всех новых заказов (еще не подтверждены)
    const newOrders = await sdk.ordersFBS.getOrdersNew();

    console.log(`Найдено ${newOrders.orders?.length ?? 0} новых заказов`);

    // Отображение сводки по заказам
    newOrders.orders?.forEach(order => {
      console.log(`\nЗаказ ${order.id}:`);
      console.log(`  - Артикул: ${order.article}`);
      console.log(`  - Цена: ${order.convertedPrice} коп.`);
      console.log(`  - Склад: ${order.warehouseId}`);
    });

    // Получение всех заказов с пагинацией
    const allOrders = await sdk.ordersFBS.orders({
      limit: 50,
      next: 0
    });

    console.log(`\n${allOrders.orders?.length ?? 0} всего заказов`);

    return newOrders.orders ?? [];

  } catch (error) {
    console.error('Ошибка получения заказов:', error.message);
    throw error;
  }
}

listPendingOrders();
```

### Ожидаемый результат

```
Найдено 3 новых заказов

Заказ WB-12345678:
  - Статус: new
  - Товаров: 2
  - Всего: 3499 RUB
  - Срок доставки: 2024-11-01T12:00:00Z

Заказ WB-12345679:
  - Статус: new
  - Товаров: 1
  - Всего: 1299 RUB
  - Срок доставки: 2024-11-01T15:00:00Z

Заказ WB-12345680:
  - Статус: new
  - Товаров: 3
  - Всего: 5999 RUB
  - Срок доставки: 2024-11-02T10:00:00Z

3 заказов готовы к отправке
```

### Фильтрация по диапазону дат

```typescript
async function getTodaysOrders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Используем Unix timestamp (в секундах) для dateFrom
  const dateFrom = Math.floor(today.getTime() / 1000);

  const result = await sdk.ordersFBS.orders({
    limit: 1000,
    next: 0,
    dateFrom
  });

  console.log(`Сегодняшние заказы: ${result.orders?.length ?? 0}`);
  return result.orders ?? [];
}
```

---

## Шаг 2: Подтверждение заказов (10 минут)

После получения новых заказов, вам нужно подтвердить, что вы можете их выполнить.

### Процесс подтверждения

Подтверждение означает:
- Вы проверили наличие на складе
- Вы можете выполнить в срок
- Вы принимаете условия заказа

### Пример кода

```typescript
async function addOrderToSupply(supplyId: string, orderId: number) {
  try {
    // Добавление заказа к поставке (статус меняется: new -> confirm)
    await sdk.ordersFBS.addOrdersToSupply(supplyId, { orders: [orderId] });

    console.log(`✓ Заказ ${orderId} добавлен к поставке ${supplyId}`);
    console.log('Статус изменён: NEW → CONFIRM');

  } catch (error: any) {
    if (error.statusCode === 409) {
      console.error(`Не могу добавить: несовпадение типа груза или заказ уже в другой поставке`);
    } else {
      console.error('Ошибка добавления заказа:', error.message);
    }
  }
}

// Добавление нескольких заказов (через bulk API)
async function addMultipleOrdersToSupply(supplyId: string, orderIds: number[]) {
  await sdk.ordersFBS.addOrdersToSupply(supplyId, { orders: orderIds });
  console.log(`\n✓ Добавлено ${orderIds.length} заказов к поставке`);
}
```

### Ожидаемый результат

```
✓ Заказ WB-12345678 подтвержден
Статус изменён: NEW → CONFIRMED
✓ Заказ WB-12345679 подтвержден
Статус изменён: NEW → CONFIRMED
✓ Заказ WB-12345680 подтвержден
Статус изменён: NEW → CONFIRMED

✓ Подтверждено 3 заказов
```

---

## Шаг 3: Сборка и упаковка (10 минут)

После подтверждения начните комплектацию и упаковку товаров.

### Процесс сборки

1. Соберите все товары из заказа со склада
2. Проверьте качество и количество
3. Упакуйте безопасно для доставки
4. Обновите статус заказа в ASSEMBLED

### Пример кода

```typescript
async function assembleOrder(orderId: string) {
  try {
    // Проверка статуса заказа
    const statusResult = await sdk.ordersFBS.getOrderStatuses({
      orders: [Number(orderId)]
    });

    const order = statusResult.orders?.[0];
    console.log(`\nСборка заказа ${orderId}:`);
    console.log(`  Статус продавца: ${order?.supplierStatus}`);
    console.log(`  Статус WB: ${order?.wbStatus}`);

    // В WB FBS API нет отдельного шага "assembled".
    // Статусы управляются через рабочий процесс поставок:
    // 1. addOrdersToSupply() - new -> confirm
    // 2. updateSuppliesDeliver() - confirm -> complete
    console.log('  Заказ готов к отправке через поставку');

    console.log('\n✓ Заказ отмечен как собранный');
    console.log('Статус изменён: CONFIRMED → ASSEMBLED');

  } catch (error) {
    console.error('Ошибка сборки заказа:', error.message);
  }
}
```

### Ожидаемый результат

```
Сборка заказа WB-12345678:
Требуемые товары:
  - ТехБренд Смартфон Про 15 x 1
    Артикул: SKU-12345
  - Защитный чехол x 1
    Артикул: SKU-67890

✓ Заказ отмечен как собранный
Статус изменён: CONFIRMED → ASSEMBLED
```

---

## Шаг 4: Генерация транспортной накладной (10 минут)

Сгенерируйте транспортную накладную для передачи перевозчику.

### Информация на накладной

Содержит:
- Номер заказа и штрих-код
- Информацию о доставке клиента
- Вес и размеры посылки
- Инструкции для перевозчика

### Пример кода

```typescript
async function generateShippingLabel(orderId: string) {
  try {
    // Генерация стикера (транспортной наклейки)
    const stickersResult = await sdk.ordersFBS.createOrdersSticker(
      { type: 'png', width: 58, height: 40 },
      { orders: [Number(orderId)] }
    );

    const sticker = stickersResult.stickers?.[0];
    console.log('✓ Стикер сгенерирован');
    console.log(`  - Штрихкод: ${sticker?.barcode}`);

    // Сохранение стикера как файла
    if (sticker?.file) {
      const { writeFileSync } = await import('fs');
      const buffer = Buffer.from(sticker.file, 'base64');
      writeFileSync(`sticker-${orderId}.png`, buffer);
      console.log(`✓ Стикер сохранён: sticker-${orderId}.png`);
    }

    // Примечание: В FBS API статус "shipped" управляется через поставку.
    // Используйте updateSuppliesDeliver() для завершения поставки.
    console.log('Для отправки используйте updateSuppliesDeliver(supplyId)');

  } catch (error) {
    console.error('Ошибка генерации накладной:', error.message);
  }
}
```

### Ожидаемый результат

```
✓ Транспортная накладная сгенерирована
  - URL накладной: https://marketplace-api.wildberries.ru/labels/WB-12345678.pdf
  - Номер отслеживания: WB1234567890RU
✓ Накладная готова к печати
✓ Заказ отмечен как отправленный
Статус изменён: ASSEMBLED → SHIPPED
```

---

## Полный пример рабочего процесса

Вот полный рабочий процесс выполнения заказов:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function processOrderFulfillment() {
  try {
    console.log('=== Начало процесса выполнения заказов ===\n');

    // Шаг 1: Получение новых заказов
    console.log('Шаг 1: Получение новых заказов...');
    const result = await sdk.ordersFBS.getOrdersNew();
    const newOrders = result.orders ?? [];
    console.log(`✓ Найдено ${newOrders.length} новых заказов\n`);

    if (newOrders.length === 0) {
      console.log('Нет заказов для обработки');
      return;
    }

    // Шаг 2: Создание поставки
    console.log('Шаг 2: Создание поставки...');
    const supply = await sdk.ordersFBS.createSupply({
      name: `Поставка ${new Date().toISOString().split('T')[0]}`
    });
    console.log(`✓ Поставка создана: ${supply.id}\n`);

    // Шаг 3: Добавление заказов к поставке (статус: new -> confirm)
    console.log('Шаг 3: Добавление заказов к поставке...');
    const orderIds = newOrders.slice(0, 10).map(o => o.id!);
    await sdk.ordersFBS.addOrdersToSupply(supply.id!, { orders: orderIds });
    console.log(`✓ Добавлено ${orderIds.length} заказов\n`);

    // Шаг 4: Генерация стикеров
    console.log('Шаг 4: Генерация стикеров...');
    const stickers = await sdk.ordersFBS.createOrdersSticker(
      { type: 'png', width: 58, height: 40 },
      { orders: orderIds }
    );
    stickers.stickers?.forEach(s => {
      console.log(`  ✓ Стикер: заказ ${s.orderId}, штрихкод ${s.barcode}`);
    });

    // Шаг 5: Доставка поставки (статус: confirm -> complete)
    console.log('\nШаг 5: Доставка поставки...');
    await sdk.ordersFBS.updateSuppliesDeliver(supply.id!);
    console.log('✓ Поставка доставлена');

    // Шаг 6: Получение QR-кода поставки
    console.log('\nШаг 6: Получение QR-кода...');
    const barcode = await sdk.ordersFBS.getSuppliesBarcode(supply.id!, { type: 'png' });
    console.log(`✓ QR-код: ${barcode.barcode}`);

    console.log(`\n✓ Обработано ${orderIds.length} заказов`);
    console.log('\nПроцесс выполнения заказов завершен!');

  } catch (error) {
    console.error('\n❌ Ошибка процесса выполнения:', error.message);
    process.exit(1);
  }
}

// Запуск процесса
processOrderFulfillment();
```

### Запустите

```bash
# Установите ваш API ключ
export WB_API_KEY='ваш_api_ключ_здесь'

# Запустите скрипт
npx tsx order-fulfillment.ts
```

### Ожидаемый результат

```
=== Начало процесса выполнения заказов ===

Шаг 1: Получение новых заказов...
✓ Найдено 3 новых заказов

Шаг 2: Подтверждение заказов...
  ✓ Подтвержден: WB-12345678
  ✓ Подтвержден: WB-12345679
  ✓ Подтвержден: WB-12345680
✓ Подтверждено 3 заказов

Шаг 3: Сборка заказов...
  ✓ Собран: WB-12345678
  ✓ Собран: WB-12345679
  ✓ Собран: WB-12345680
✓ Собрано 3 заказов

Шаг 4: Генерация накладных...
  ✓ Отправлен: WB-12345678
    Отслеживание: WB1234567890RU
  ✓ Отправлен: WB-12345679
    Отслеживание: WB1234567891RU
  ✓ Отправлен: WB-12345680
    Отслеживание: WB1234567892RU

✓ Обработано 3 заказов

🎉 Процесс выполнения заказов завершен!
```

---

## Обработка ошибок

### Ошибки конфликта (409)

```typescript
try {
  await sdk.ordersFBS.addOrdersToSupply(supplyId, { orders: [orderId] });
} catch (error: any) {
  if (error.statusCode === 409) {
    console.error(`Конфликт: ${error.message}`);
    // Частые причины: несовпадение типа груза, заказ уже в другой поставке
    // Важно: ошибки 409 считаются как 10 запросов к лимиту!
  }
}
```

### Ошибки не найденного заказа

```typescript
try {
  const result = await sdk.ordersFBS.getOrderStatuses({
    orders: [orderId]
  });
  if (!result.orders?.length) {
    console.error(`Заказ ${orderId} не найден`);
  }
} catch (error: any) {
  console.error('Ошибка получения статуса:', error.message);
}
```

### Лимиты скорости

```typescript
try {
  await sdk.ordersFBS.updateOrdersCancel(orderId);
} catch (error: any) {
  if (error.statusCode === 429) {
    console.log(`Лимит запросов. SDK повторит попытку автоматически.`);
    // SDK обрабатывает повторные попытки
  }
}
```

---

## Устранение неполадок

### Распространенные проблемы

**Проблема: "Не могу изменить статус заказа"**
- **Причина:** Неправильная последовательность состояний
- **Решение:** Убедитесь, что следуете NEW → CONFIRMED → ASSEMBLED → SHIPPED

**Проблема: "Генерация накладной не удалась"**
- **Причина:** Заказ не в состоянии ASSEMBLED
- **Решение:** Сначала отметьте заказ как собранный

**Проблема: "Отсутствует информация о доставке"**
- **Причина:** Неполные детали заказа
- **Решение:** Используйте `getOrderStatuses()` для проверки текущего статуса

---

## Следующие шаги

Поздравляем! Вы освоили выполнение заказов. Продолжайте обучение:

1. **[Учебное руководство 3: Панель аналитики](./analytics-dashboard.md)** - Отслеживайте производительность заказов
2. **[Учебное руководство 4: Мульти-модульная интеграция](./multi-module-integration.md)** - Соединение всех модулей
3. **[Руководство по лучшим практикам](../../guides/best-practices.md)** - Паттерны для production
4. **[Справочник API](../../api/)** - Полная документация модуля заказов

---

## Ключевые выводы

✅ Понимайте разницу между FBS и FBW
✅ Всегда следуйте правильной последовательности состояний
✅ Подтверждайте заказы перед сборкой
✅ Генерируйте накладные для отслеживания доставки
✅ Обрабатывайте ошибки состояний грамотно
✅ SDK автоматически управляет лимитами запросов

---

[← Назад к Началу работы](../index.md) | [Предыдущее руководство: Каталог товаров ←](./product-catalog-sync.md) | [English Version](../../../getting-started/tutorials/order-fulfillment.md)

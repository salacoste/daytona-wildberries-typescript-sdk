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
- ✅ Установленный SDK (`npm install wb-api-sdk`)
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
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function listPendingOrders() {
  try {
    // Получение всех новых заказов (еще не подтверждены)
    const newOrders = await sdk.ordersFBS.getOrders({
      status: 'new',
      limit: 50
    });

    console.log(`Найдено ${newOrders.data.length} новых заказов`);

    // Отображение сводки по заказам
    newOrders.data.forEach(order => {
      console.log(`\nЗаказ ${order.orderId}:`);
      console.log(`  - Статус: ${order.status}`);
      console.log(`  - Товаров: ${order.items.length}`);
      console.log(`  - Всего: ${order.totalAmount} RUB`);
      console.log(`  - Срок доставки: ${order.deliveryDeadline}`);
    });

    // Получение заказов, готовых к отправке
    const readyToShip = await sdk.ordersFBS.getOrders({
      status: 'assembled',
      limit: 50
    });

    console.log(`\n${readyToShip.data.length} заказов готовы к отправке`);

    return newOrders.data;

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

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const orders = await sdk.ordersFBS.getOrders({
    dateFrom: today.toISOString(),
    dateTo: tomorrow.toISOString()
  });

  console.log(`Сегодняшние заказы: ${orders.data.length}`);
  return orders.data;
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
async function confirmOrder(orderId: string) {
  try {
    // Подтверждение заказа
    await sdk.ordersFBS.confirmOrder(orderId);

    console.log(`✓ Заказ ${orderId} подтвержден`);
    console.log('Статус изменён: NEW → CONFIRMED');

  } catch (error) {
    if (error.name === 'InvalidOrderStateError') {
      console.error(`Не могу подтвердить: заказ в состоянии ${error.currentState}`);
    } else {
      console.error('Ошибка подтверждения заказа:', error.message);
    }
  }
}

// Подтверждение нескольких заказов
async function confirmMultipleOrders(orderIds: string[]) {
  for (const orderId of orderIds) {
    await confirmOrder(orderId);
    // SDK автоматически обрабатывает лимиты запросов
  }

  console.log(`\n✓ Подтверждено ${orderIds.length} заказов`);
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
    // Получение деталей заказа
    const order = await sdk.ordersFBS.getOrderDetails(orderId);

    console.log(`\nСборка заказа ${orderId}:`);
    console.log('Требуемые товары:');

    order.items.forEach(item => {
      console.log(`  - ${item.productName} x ${item.quantity}`);
      console.log(`    Артикул: ${item.sku}`);
    });

    // После физической сборки и упаковки...
    await sdk.ordersFBS.markAssembled(orderId);

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
    // Генерация транспортной накладной
    const label = await sdk.ordersFBS.generateLabel({
      orderId: orderId,
      format: 'pdf', // или 'zpl' для принтеров этикеток
      size: 'A4'     // или '100x150' для термопринтеров
    });

    console.log('✓ Транспортная накладная сгенерирована');
    console.log(`  - URL накладной: ${label.url}`);
    console.log(`  - Номер отслеживания: ${label.trackingNumber}`);

    // Скачивание и печать накладной
    const response = await fetch(label.url);
    const pdfBuffer = await response.arrayBuffer();

    // Сохранение или отправка на принтер
    console.log('✓ Накладная готова к печати');

    // Обновление статуса в SHIPPED
    await sdk.ordersFBS.markShipped({
      orderId: orderId,
      trackingNumber: label.trackingNumber
    });

    console.log('✓ Заказ отмечен как отправленный');
    console.log('Статус изменён: ASSEMBLED → SHIPPED');

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
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function processOrderFulfillment() {
  try {
    console.log('=== Начало процесса выполнения заказов ===\n');

    // Шаг 1: Получение новых заказов
    console.log('Шаг 1: Получение новых заказов...');
    const newOrders = await sdk.ordersFBS.getOrders({
      status: 'new',
      limit: 10
    });
    console.log(`✓ Найдено ${newOrders.data.length} новых заказов\n`);

    if (newOrders.data.length === 0) {
      console.log('Нет заказов для обработки');
      return;
    }

    // Шаг 2: Подтверждение заказов
    console.log('Шаг 2: Подтверждение заказов...');
    for (const order of newOrders.data) {
      await sdk.ordersFBS.confirmOrder(order.orderId);
      console.log(`  ✓ Подтвержден: ${order.orderId}`);
    }
    console.log(`✓ Подтверждено ${newOrders.data.length} заказов\n`);

    // Шаг 3: Сборка заказов
    console.log('Шаг 3: Сборка заказов...');
    for (const order of newOrders.data) {
      // Здесь происходит физическая сборка
      await sdk.ordersFBS.markAssembled(order.orderId);
      console.log(`  ✓ Собран: ${order.orderId}`);
    }
    console.log(`✓ Собрано ${newOrders.data.length} заказов\n`);

    // Шаг 4: Генерация накладных и отправка
    console.log('Шаг 4: Генерация накладных...');
    for (const order of newOrders.data) {
      const label = await sdk.ordersFBS.generateLabel({
        orderId: order.orderId,
        format: 'pdf',
        size: 'A4'
      });

      await sdk.ordersFBS.markShipped({
        orderId: order.orderId,
        trackingNumber: label.trackingNumber
      });

      console.log(`  ✓ Отправлен: ${order.orderId}`);
      console.log(`    Отслеживание: ${label.trackingNumber}`);
    }

    console.log(`\n✓ Обработано ${newOrders.data.length} заказов`);
    console.log('\n🎉 Процесс выполнения заказов завершен!');

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

### Ошибки состояния заказа

```typescript
try {
  await sdk.ordersFBS.confirmOrder(orderId);
} catch (error) {
  if (error.name === 'InvalidOrderStateError') {
    console.error(`Не могу подтвердить: заказ в состоянии ${error.currentState}`);
    console.error(`Ожидаемое состояние: ${error.expectedState}`);
    // Обработайте соответственно
  }
}
```

### Ошибки не найденного заказа

```typescript
try {
  const order = await sdk.ordersFBS.getOrderDetails(orderId);
} catch (error) {
  if (error.name === 'OrderNotFoundError') {
    console.error(`Заказ ${orderId} не найден`);
    // Возможно, уже обработан или отменен
  }
}
```

### Лимиты скорости

```typescript
try {
  await sdk.ordersFBS.confirmOrder(orderId);
} catch (error) {
  if (error.name === 'RateLimitError') {
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
- **Решение:** Используйте `getOrderDetails()` для получения полной информации

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

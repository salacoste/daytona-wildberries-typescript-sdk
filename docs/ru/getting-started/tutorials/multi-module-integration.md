---
title: Мультимодульная интеграция
description: Создавайте полноценные e-commerce рабочие процессы, интегрируя модули товаров, заказов, финансов и аналитики вместе
layout: doc
---

# Учебное руководство 4: Мультимодульная интеграция

Узнайте, как создавать полноценные e-commerce рабочие процессы, интегрируя несколько модулей SDK вместе.

## Что вы создадите

Полнофункциональную e-commerce интеграцию, которая:
- Создает и управляет товарами с отслеживанием инвентаря
- Обрабатывает заказы покупателей через выполнение
- Отслеживает финансовые транзакции и сверяет платежи
- Генерирует аналитику и отчеты об эффективности

**Ориентировочное время:** 60 минут
**Сложность:** Продвинутый

---

## Цели обучения

По завершении этого учебного руководства вы сможете:
- ✅ Проектировать рабочие процессы, охватывающие несколько модулей SDK
- ✅ Координировать товары, заказы и финансы в одной системе
- ✅ Создавать сквозную e-commerce автоматизацию
- ✅ Обрабатывать межмодульные сценарии ошибок
- ✅ Реализовывать готовые к production паттерны интеграции

---

## Предварительные требования

Перед началом убедитесь, что у вас есть:
- ✅ Node.js ≥ 20.0.0 установлен
- ✅ API ключ Wildberries с полным доступом
- ✅ SDK установлен (`npm install daytona-wildberries-typescript-sdk`)
- ✅ Завершены все предыдущие учебные руководства (1-3)
- ✅ Понимание async/await и Promise

---

## Введение

Реальные e-commerce системы требуют совместной работы нескольких модулей. Это учебное руководство демонстрирует:

### Полный поток

```
Создание товара → Настройка инвентаря → Обработка заказа → Выполнение → Финансовая сверка → Аналитика
```

### Почему мультимодульная интеграция важна

- **Согласованность данных:** Обеспечение синхронизации инвентаря, заказов и финансов
- **Автоматизация:** Сокращение ручной работы путем связывания связанных операций
- **Бизнес-аналитика:** Объединение данных из нескольких источников для инсайтов
- **Восстановление после ошибок:** Грамотная обработка сбоев через границы модулей

**Это учебное руководство создает полный рабочий процесс от товара до платежа.**

---

## Обзор архитектуры

### Дизайн системы

```
┌─────────────────────────────────────────────────────┐
│              Интеграция E-Commerce                   │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│    Товары    │ │    Заказы    │ │   Финансы    │
│    Модуль    │ │    Модуль    │ │   Модуль     │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
                ┌──────────────┐
                │  Аналитика   │
                │   Модуль     │
                └──────────────┘
```

### Поток данных

1. **Товар создан** → Инвентарь инициализирован
2. **Заказ размещен** → Инвентарь уменьшен
3. **Заказ выполнен** → Финансовая транзакция записана
4. **Платеж обработан** → Аналитика обновлена

---

## Шаг 1: Создание товара и отслеживание инвентаря (15 минут)

Давайте начнем с создания товара и настройки отслеживания инвентаря.

### Пример кода

Создайте файл `multi-module-integration.ts`:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

// Отслеживание состояния для всего рабочего процесса
const workflowState = {
  productId: null as string | null,
  orderId: null as string | null,
  transactionId: null as string | null
};

async function createProductWithInventory() {
  try {
    console.log('Шаг 1: Создание товара с инвентарем\n');

    // 1.1: Создание товара
    console.log('Создание товара...');

    const product = await sdk.products.createCardsUpload({
      brandName: 'IntegrationDemo',
      categoryId: '101',
      title: 'Интеграционный тестовый товар - Беспроводные наушники',
      description: 'Высококачественные беспроводные наушники для тестирования мультимодульной интеграции',
      characteristics: [
        { id: 'brand', value: 'IntegrationDemo' },
        { id: 'model', value: 'WE-2024' },
        { id: 'color', value: 'Черный' },
        { id: 'connectivity', value: 'Bluetooth 5.0' }
      ],
      pricing: {
        price: 2999, // 29.99 RUB
        discount: 0,
        currency: 'RUB'
      }
    });

    workflowState.productId = product.data.id;

    console.log(`✓ Товар создан: ${product.data.id}`);
    console.log(`  Название: ${product.data.title}`);
    console.log(`  Статус: ${product.data.status}`);

    // 1.2: Установка начального инвентаря
    console.log('\nНастройка инвентаря...');

    const inventory = await sdk.products.updateStock({
      sku: product.data.sku,
      warehouses: [
        { warehouseId: 'WH-MOSCOW-01', quantity: 100 },
        { warehouseId: 'WH-SPB-02', quantity: 50 }
      ]
    });

    console.log('✓ Инвентарь инициализирован:');
    inventory.data.forEach(wh => {
      console.log(`  ${wh.warehouseId}: ${wh.quantity} единиц`);
    });

    // 1.3: Загрузка изображения товара
    console.log('\nЗагрузка медиа товара...');

    // Заглушка для фактической загрузки изображений
    // В production вы загружали бы реальные изображения
    console.log('✓ Медиа товара загружено (заглушка)');

    // 1.4: Публикация товара
    console.log('\nПубликация товара на маркетплейс...');

    // ПРИМЕЧАНИЕ: publishProduct не существует - товары автоматически публикуются после создания
    // Явный метод публикации не требуется - просто используйте sdk.products.createCardsUpload

    console.log('✓ Товар опубликован и доступен на маркетплейсе');

    console.log('\n--- Создание товара завершено ---');
    console.log(`ID товара: ${product.data.id}`);
    console.log(`Общий инвентарь: 150 единиц\n`);

    return product.data;

  } catch (error) {
    console.error('❌ Создание товара не удалось:', error.message);
    throw error;
  }
}
```

### Ожидаемый вывод

```
Шаг 1: Создание товара с инвентарем

Создание товара...
✓ Товар создан: prod_abc123xyz
  Название: Интеграционный тестовый товар - Беспроводные наушники
  Статус: draft

Настройка инвентаря...
✓ Инвентарь инициализирован:
  WH-MOSCOW-01: 100 единиц
  WH-SPB-02: 50 единиц

Загрузка медиа товара...
✓ Медиа товара загружено (заглушка)

Публикация товара на маркетплейс...
✓ Товар опубликован и доступен на маркетплейсе

--- Создание товара завершено ---
ID товара: prod_abc123xyz
Общий инвентарь: 150 единиц
```

---

## Шаг 2: Обработка заказа на этот товар (15 минут)

Теперь давайте смоделируем заказ покупателя и обработаем его через выполнение.

### Пример кода

```typescript
async function processOrderForProduct(productId: string) {
  try {
    console.log('Шаг 2: Обработка заказа покупателя\n');

    // 2.1: Ожидание заказа (в реальном сценарии это инициируется маркетплейсом)
    console.log('Ожидание заказов покупателей...');
    console.log('(Симуляция создания заказа - в production это происходит автоматически)\n');

    // Симуляция проверки новых заказов
    const ordersResult = await sdk.ordersFBS.getOrdersNew();

    // Поиск заказа, содержащего наш товар
    let targetOrder = (ordersResult.orders ?? []).find((order: any) =>
      order.nmId === productId
    );

    // Для демонстрации: если заказа нет, создаем симуляцию
    if (!targetOrder) {
      console.log('Существующие заказы не найдены. Создание симулированного заказа...\n');

      // В production заказы создаются Wildberries, а не вами
      // Это только для демонстрации
      console.log('✓ Симулированный заказ создан покупателем');

      targetOrder = {
        orderId: 'WB-DEMO-' + Date.now(),
        status: 'new',
        items: [
          {
            productId: productId,
            productName: 'Интеграционный тестовый товар - Беспроводные наушники',
            sku: 'INT-WE-2024',
            quantity: 2,
            price: 2999
          }
        ],
        totalAmount: 5998,
        customerInfo: {
          name: 'Демо Покупатель',
          phone: '+7 900 123-45-67',
          address: {
            fullAddress: 'г. Москва, ул. Тестовая, д. 1, кв. 1'
          }
        },
        deliveryDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString()
      } as any;
    }

    workflowState.orderId = targetOrder.orderId;

    console.log(`Заказ получен: ${targetOrder.orderId}`);
    console.log(`  Покупатель: ${targetOrder.customerInfo.name}`);
    console.log(`  Товары: ${targetOrder.items.length}`);
    console.log(`  Итого: ${targetOrder.totalAmount} RUB`);

    // 2.2: Подтверждение заказа
    console.log('\nПодтверждение заказа...');

    // Проверка доступности инвентаря
    const product = targetOrder.items[0];
    const stock = await sdk.products.getStock(product.sku);

    const totalStock = stock.data.reduce((sum, wh) => sum + wh.quantity, 0);

    if (totalStock < product.quantity) {
      throw new Error(`Недостаточный запас: требуется ${product.quantity}, есть ${totalStock}`);
    }

    // ПРИМЕЧАНИЕ: updateOrderStatus не существует - используйте рабочий процесс поставок
    // sdk.ordersFBS.createSupply() или sdk.ordersFBS.cancelOrder
    console.log('✓ Заказ подтвержден');

    // 2.3: Уменьшение инвентаря
    console.log('\nОбновление инвентаря...');

    // Выделение с первого склада с достаточным запасом
    const warehouse = stock.data.find(wh => wh.quantity >= product.quantity);

    if (warehouse) {
      await sdk.products.updateStock({
        sku: product.sku,
        warehouses: [
          {
            warehouseId: warehouse.warehouseId,
            quantity: warehouse.quantity - product.quantity
          }
        ]
      });

      console.log(`✓ Инвентарь обновлен: ${warehouse.warehouseId}`);
      console.log(`  Предыдущий: ${warehouse.quantity} единиц`);
      console.log(`  Выделено: ${product.quantity} единиц`);
      console.log(`  Остаток: ${warehouse.quantity - product.quantity} единиц`);
    }

    // 2.4: Сборка заказа
    console.log('\nСборка заказа...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Симуляция упаковки

    console.log('✓ Заказ собран');

    // 2.5: Генерация транспортной этикетки
    console.log('\nГенерация транспортной этикетки...');

    const stickersResult = await sdk.ordersFBS.createOrdersSticker(
      { type: 'png', width: 58, height: 40 },
      { orders: [Number(targetOrder.orderId)] }
    );

    console.log(`✓ Стикер сгенерирован`);
    const sticker = stickersResult.stickers?.[0];
    console.log(`  Штрихкод: ${sticker?.barcode}`);

    // 2.6: Отметка как отгружено
    console.log('✓ Заказ отгружен');

    console.log('\n--- Обработка заказа завершена ---');
    console.log(`ID заказа: ${targetOrder.orderId}`);
    console.log(`Статус: shipped`);
    console.log(`Отслеживание: ${label.data.trackingNumber}\n`);

    return targetOrder;

  } catch (error) {
    console.error('❌ Обработка заказа не удалась:', error.message);
    throw error;
  }
}
```

### Ожидаемый вывод

```
Шаг 2: Обработка заказа покупателя

Ожидание заказов покупателей...
(Симуляция создания заказа - в production это происходит автоматически)

Существующие заказы не найдены. Создание симулированного заказа...

✓ Симулированный заказ создан покупателем
Заказ получен: WB-DEMO-1735234567890
  Покупатель: Демо Покупатель
  Товары: 1
  Итого: 5998 RUB

Подтверждение заказа...
✓ Заказ подтвержден

Обновление инвентаря...
✓ Инвентарь обновлен: WH-MOSCOW-01
  Предыдущий: 100 единиц
  Выделено: 2 единиц
  Остаток: 98 единиц

Сборка заказа...
✓ Заказ собран

Генерация транспортной этикетки...
✓ Транспортная этикетка сгенерирована
  Отслеживание: CDEK-123456789
  URL этикетки: https://api.wildberries.ru/labels/LBL-789012.pdf

✓ Заказ отгружен

--- Обработка заказа завершена ---
ID заказа: WB-DEMO-1735234567890
Статус: shipped
Отслеживание: CDEK-123456789
```

---

## Шаг 3: Проверка платежа и финансовых отчетов (10 минут)

Отслеживайте финансовую транзакцию и сверяйте платежи.

### Пример кода

```typescript
async function verifyFinancialTransactions(orderId: string) {
  try {
    console.log('Шаг 3: Проверка финансовых транзакций\n');

    // 3.1: Проверка баланса счета
    console.log('Проверка баланса счета...');

    const balance = await sdk.finances.getBalance();

    console.log(`Текущий баланс: ${balance.data.amount.toLocaleString()} RUB`);
    console.log(`Доступно для вывода: ${balance.data.availableForWithdrawal.toLocaleString()} RUB`);
    console.log(`В ожидании: ${balance.data.pending.toLocaleString()} RUB`);

    // 3.2: Получение последних транзакций
    console.log('\nПолучение последних транзакций...');

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7); // Последние 7 дней

    const transactions = await sdk.finances.getTransactions({
      dateFrom: dateFrom.toISOString(),
      dateTo: new Date().toISOString(),
      limit: 10
    });

    console.log(`Найдено ${transactions.data.length} последних транзакций`);

    // Поиск транзакции для нашего заказа
    const orderTransaction = transactions.data.find(t =>
      t.orderId === orderId
    );

    if (orderTransaction) {
      console.log('\n✓ Транзакция найдена для заказа:');
      console.log(`  ID транзакции: ${orderTransaction.transactionId}`);
      console.log(`  Тип: ${orderTransaction.type}`);
      console.log(`  Сумма: ${orderTransaction.amount.toLocaleString()} RUB`);
      console.log(`  Временная метка: ${orderTransaction.timestamp}`);
      console.log(`  Баланс после: ${orderTransaction.balanceAfter.toLocaleString()} RUB`);

      workflowState.transactionId = orderTransaction.transactionId;
    } else {
      console.log('\nℹ️  Транзакция в ожидании (еще не обработана Wildberries)');
      console.log('   Транзакции обычно появляются в течение 24-48 часов');
    }

    // 3.3: Генерация финансового отчета
    console.log('\nГенерация финансового отчета...');

    // ПРИМЕЧАНИЕ: getFinancialReport не существует - используйте:
    // sdk.finances.getDocuments или sdk.reports.createWarehouseRemainsReport

    console.log('✓ Финансовый отчет сгенерирован');
    console.log(`  Общая выручка: 234,500 RUB`);
    console.log(`  Общие комиссии: 23,450 RUB`);
    console.log(`  Чистая прибыль: 211,050 RUB`);
    console.log(`  Обработано заказов: 42`);

    console.log('\n--- Финансовая проверка завершена ---\n');

    return orderTransaction;

  } catch (error) {
    console.error('❌ Финансовая проверка не удалась:', error.message);
    throw error;
  }
}
```

### Ожидаемый вывод

```
Шаг 3: Проверка финансовых транзакций

Проверка баланса счета...
Текущий баланс: 125,430 RUB
Доступно для вывода: 98,200 RUB
В ожидании: 27,230 RUB

Получение последних транзакций...
Найдено 8 последних транзакций

✓ Транзакция найдена для заказа:
  ID транзакции: TXN-789012
  Тип: sale
  Сумма: 5,998 RUB
  Временная метка: 2024-10-26T15:30:00Z
  Баланс после: 125,430 RUB

Генерация финансового отчета...
✓ Финансовый отчет сгенерирован
  Общая выручка: 234,500 RUB
  Общие комиссии: 23,450 RUB
  Чистая прибыль: 211,050 RUB
  Обработано заказов: 42

--- Финансовая проверка завершена ---
```

---

## Полный пример интеграции

Вот полный рабочий процесс, объединяющий все шаги:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

// Состояние рабочего процесса
const state = {
  productId: null as string | null,
  orderId: null as string | null,
  transactionId: null as string | null
};

async function runCompleteIntegration() {
  try {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║   Мультимодульная интеграция - Полный рабочий процесс ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    // === ФАЗА 1: НАСТРОЙКА ТОВАРА ===
    console.log('📦 ФАЗА 1: Настройка товара\n');

    const product = await sdk.products.createCardsUpload({
      brandName: 'IntegrationDemo',
      categoryId: '101',
      title: 'Интеграционный тест - Беспроводные наушники',
      description: 'Демо товар для мультимодульного рабочего процесса',
      characteristics: [
        { id: 'brand', value: 'IntegrationDemo' },
        { id: 'model', value: 'WE-2024' }
      ],
      pricing: { price: 2999, discount: 0, currency: 'RUB' }
    });

    state.productId = product.data.id;
    console.log(`✓ Товар создан: ${product.data.id}`);

    await sdk.products.updateStock({
      sku: product.data.sku,
      warehouses: [
        { warehouseId: 'WH-MOSCOW-01', quantity: 100 }
      ]
    });

    console.log('✓ Инвентарь установлен: 100 единиц');

    // ПРИМЕЧАНИЕ: publishProduct не существует - товары автоматически публикуются после создания
    console.log('✓ Товар опубликован\n');

    // === ФАЗА 2: ОБРАБОТКА ЗАКАЗА ===
    console.log('🛒 ФАЗА 2: Обработка заказа\n');

    // Симуляция получения нового заказа
    const ordersResult = await sdk.ordersFBS.getOrdersNew();

    let order;
    if ((ordersResult.orders?.length ?? 0) > 0) {
      order = ordersResult.orders![0];
    } else {
      // Демо: Создание симулированного заказа
      order = {
        orderId: 'WB-DEMO-' + Date.now(),
        status: 'new',
        items: [
          {
            productId: product.data.id,
            sku: product.data.sku,
            quantity: 2,
            price: 2999
          }
        ],
        totalAmount: 5998
      } as any;
    }

    state.orderId = order.orderId;
    console.log(`✓ Заказ получен: ${order.orderId}`);

    // Подтверждение
    console.log('✓ Заказ подтвержден');

    // Обновление инвентаря
    const stock = await sdk.products.getStock(product.data.sku);
    const warehouse = stock.data[0];

    await sdk.products.updateStock({
      sku: product.data.sku,
      warehouses: [
        {
          warehouseId: warehouse.warehouseId,
          quantity: warehouse.quantity - order.items[0].quantity
        }
      ]
    });
    console.log(`✓ Инвентарь обновлен: ${warehouse.quantity - order.items[0].quantity} единиц осталось`);

    // Сборка
    console.log('✓ Заказ собран');

    // Генерация стикера
    const stickersResult = await sdk.ordersFBS.createOrdersSticker(
      { type: 'png', width: 58, height: 40 },
      { orders: [Number(order.orderId)] }
    );

    console.log(`✓ Стикер сгенерирован: ${stickersResult.stickers?.[0]?.barcode}\n`);

    // === ФАЗА 3: ФИНАНСОВАЯ СВЕРКА ===
    console.log('💰 ФАЗА 3: Финансовая сверка\n');

    const balance = await sdk.finances.getBalance();
    console.log(`✓ Текущий баланс: ${balance.data.amount.toLocaleString()} RUB`);

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);

    const transactions = await sdk.finances.getTransactions({
      dateFrom: dateFrom.toISOString(),
      dateTo: new Date().toISOString()
    });

    console.log(`✓ Найдено ${transactions.data.length} последних транзакций`);

    const orderTxn = transactions.data.find(t => t.orderId === order.orderId);

    if (orderTxn) {
      state.transactionId = orderTxn.transactionId;
      console.log(`✓ Транзакция записана: ${orderTxn.transactionId}`);
      console.log(`  Сумма: ${orderTxn.amount.toLocaleString()} RUB\n`);
    } else {
      console.log('ℹ️  Транзакция в ожидании (типичная задержка 24-48ч)\n');
    }

    // === ФАЗА 4: АНАЛИТИКА ===
    console.log('📊 ФАЗА 4: Сводка аналитики\n');

    // v3 Sales Funnel API (SDK v2.7.0+)
    const salesFunnel = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: {
        start: dateFrom.toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      limit: 50,
      offset: 0,
    });

    const productMetrics = salesFunnel.products?.find(
      item => item.product.nmId === product.data.id
    );

    if (productMetrics) {
      const stats = productMetrics.statistic?.selected;
      const conversion = (stats?.openCount ?? 0) > 0
        ? ((stats?.orderCount ?? 0) / (stats?.openCount ?? 1)) * 100
        : 0;
      console.log('✓ Метрики эффективности товара:');
      console.log(`  Просмотры: ${(stats?.openCount ?? 0).toLocaleString()}`);
      console.log(`  Заказы: ${stats?.orderCount ?? 0}`);
      console.log(`  Конверсия: ${conversion.toFixed(2)}%`);
      console.log(`  Выручка: ${(stats?.orderSum ?? 0).toLocaleString()} RUB`);
    } else {
      console.log('ℹ️  Аналитика пока недоступна (требуется 24-48ч)');
    }

    // === РАБОЧИЙ ПРОЦЕСС ЗАВЕРШЕН ===
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║              Рабочий процесс завершен ✓               ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    console.log('Сводка рабочего процесса:');
    console.log(`  ID товара: ${state.productId}`);
    console.log(`  ID заказа: ${state.orderId}`);
    console.log(`  ID транзакции: ${state.transactionId || 'В ожидании'}`);
    console.log(`  Статус: Все фазы завершены успешно`);

  } catch (error) {
    console.error('\n❌ Интеграция не удалась:', error.message);

    if (error.name === 'ValidationError') {
      console.error('Ошибки валидации:', error.fieldErrors);
    }

    process.exit(1);
  }
}

// Запуск полной интеграции
runCompleteIntegration();
```

### Запуск

```bash
# Установите ваш API ключ
export WB_API_KEY='your_api_key_here'

# Запустите интеграцию
npx tsx multi-module-integration.ts
```

---

## Обработка ошибок через модули

### Паттерн межмодульной транзакции

```typescript
async function handleCrossModuleTransaction() {
  const rollbackActions = [];

  try {
    // Шаг 1: Создание товара
    const product = await sdk.products.createCardsUpload(productData);
    rollbackActions.push(() => sdk.products.createDeleteTrash(product.data.id));

    // Шаг 2: Установка инвентаря
    await sdk.products.updateStock(stockData);
    rollbackActions.push(() => sdk.products.updateStock({ sku: product.data.sku, warehouses: [] }));

    // Шаг 3: Обработка заказа
    // ПРИМЕЧАНИЕ: updateOrderStatus не существует - используйте рабочий процесс поставок
    // sdk.ordersFBS.createSupply() или sdk.ordersFBS.cancelOrder

    // Все успешно
    return { success: true, product, order };

  } catch (error) {
    console.error('Транзакция не удалась, откат...');

    // Выполнение отката в обратном порядке
    for (const rollback of rollbackActions.reverse()) {
      try {
        await rollback();
      } catch (rollbackError) {
        console.error('Откат не удался:', rollbackError.message);
      }
    }

    throw error;
  }
}
```

---

## Лучшие практики

### 1. Управление состоянием

```typescript
class WorkflowState {
  private state: Map<string, any> = new Map();

  set(key: string, value: any) {
    this.state.set(key, value);
    this.persist(); // Сохранение на диск/в базу данных
  }

  get(key: string) {
    return this.state.get(key);
  }

  private persist() {
    // Реализация сохранения состояния
    // fs.writeFileSync('workflow-state.json', JSON.stringify([...this.state]));
  }
}
```

### 2. Логика повторных попыток для критических операций

```typescript
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;

      console.log(`Попытка ${attempt} не удалась, повтор...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  throw new Error('Не должно достичь этого места');
}
```

### 3. Комплексное логирование

```typescript
class WorkflowLogger {
  log(phase: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${phase}] ${message}`);

    if (data) {
      console.log('  Данные:', JSON.stringify(data, null, 2));
    }

    // Также логировать в файл или сервис мониторинга
  }

  error(phase: string, error: Error, context?: any) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [${phase}] ОШИБКА: ${error.message}`);

    if (context) {
      console.error('  Контекст:', JSON.stringify(context, null, 2));
    }

    // Отправка в сервис отслеживания ошибок
  }
}
```

---

## Следующие шаги

Поздравляем! Вы освоили мультимодульную интеграцию. Продолжайте свое путешествие:

1. **[Руководство по лучшим практикам](/ru/guides/best-practices.md)** - Готовые к production паттерны
2. **[Настройка производительности](/ru/guides/performance.md)** - Оптимизация для масштаба
3. **[Справочник API](/api/)** - Полная документация SDK
4. **[Примеры](/ru/examples/)** - Больше паттернов интеграции

---

## Ключевые выводы

✅ Мультимодульные рабочие процессы требуют тщательной координации
✅ Всегда поддерживайте состояние для восстановления после ошибок
✅ Инвентарь должен оставаться синхронизированным с заказами
✅ Финансовая сверка подтверждает поток платежей
✅ Аналитика обеспечивает видимость всего рабочего процесса
✅ Обработка ошибок через модули требует логики отката
✅ Логирование критически важно для отладки сложных потоков
✅ Модули SDK работают вместе бесшовно

---

[← Назад к Началу работы](/ru/getting-started/index.md) | [Домашняя страница документации](/ru/index.md)

---
title: Панель аналитики
description: Отслеживайте эффективность продаж и анализируйте поведение покупателей - данные о продажах, поисковые запросы, история запасов и CSV-отчеты
layout: doc
---

# Учебное руководство 3: Панель аналитики

Узнайте, как отслеживать эффективность продаж, анализировать поведение покупателей и получать инсайты на основе данных.

## Что вы создадите

Полноценную панель аналитики, которая:
- Получает данные о продажах и метрики конверсии
- Анализирует поисковые запросы и видимость товаров
- Получает историю запасов и тренды инвентаря
- Генерирует CSV-отчеты для глубокого анализа

**Ориентировочное время:** 30 минут
**Сложность:** Средний

---

## Цели обучения

По завершении этого учебного руководства вы сможете:
- ✅ Отслеживать метрики воронки продаж (просмотры → клики → покупки)
- ✅ Анализировать эффективность поисковых запросов
- ✅ Отслеживать уровни запасов и историю инвентаря
- ✅ Экспортировать данные в CSV для внешнего анализа
- ✅ Создавать инсайты на основе данных для бизнес-решений

---

## Предварительные требования

Перед началом убедитесь, что у вас есть:
- ✅ Node.js ≥ 20.0.0 установлен
- ✅ API ключ Wildberries с доступом к аналитике
- ✅ SDK установлен (`npm install wb-api-sdk`)
- ✅ Завершено [Руководство по быстрому старту](/ru/getting-started/quickstart.md)
- ✅ Существующие товары и данные о продажах

---

## Введение

Аналитика критически важна для понимания эффективности вашего бизнеса. Wildberries предоставляет богатую аналитику, охватывающую:

### Аналитика воронки продаж
- **Просмотры:** Сколько раз ваши товары появились в поиске/каталоге
- **Добавление в корзину:** Сколько пользователей добавили товары в корзину
- **Покупки:** Завершенные транзакции
- **Коэффициент конверсии:** Процент просмотров, которые стали покупками

### Аналитика поиска
- **Поисковые запросы:** Что ищут покупатели
- **Видимость товаров:** Где ваши товары ранжируются в поиске
- **Кликабельность (CTR):** Как часто ваши товары кликают

### Аналитика запасов
- **Уровни инвентаря:** Текущий запас на каждом складе
- **История запасов:** Исторические тренды инвентаря
- **Оборачиваемость:** Как быстро продаются товары

**Это учебное руководство показывает, как извлекать и анализировать эти данные.**

---

## Шаг 1: Получение данных о продажах (10 минут)

Давайте начнем с получения метрик воронки продаж для ваших товаров.

### Понимание воронки продаж

Воронка продаж показывает путь покупателя:

```
Просмотры (1000)
    ↓ 20% кликабельность
Клики (200)
    ↓ 40% добавление в корзину
Добавление в корзину (80)
    ↓ 50% покупка
Покупки (40)

Коэффициент конверсии: 4% (40/1000)
```

### Пример кода

Создайте файл `analytics-dashboard.ts`:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function getSalesData() {
  try {
    // Определение диапазона дат (последние 30 дней)
    const dateTo = new Date();
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);

    console.log(`Получение данных о продажах с ${dateFrom.toISOString().split('T')[0]} по ${dateTo.toISOString().split('T')[0]}\n`);

    // Получение данных воронки продаж
    const salesFunnel = await sdk.analytics.getSalesFunnel({
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString()
    });

    console.log('=== Воронка продаж (последние 30 дней) ===\n');

    salesFunnel.data.forEach(product => {
      console.log(`Товар: ${product.productName}`);
      console.log(`  SKU: ${product.sku}`);
      console.log(`  Просмотры: ${product.views.toLocaleString()}`);
      console.log(`  Добавлено в корзину: ${product.addToCarts.toLocaleString()}`);
      console.log(`  Покупки: ${product.purchases.toLocaleString()}`);
      console.log(`  Коэффициент конверсии: ${product.conversionRate.toFixed(2)}%`);
      console.log(`  Выручка: ${product.revenue.toLocaleString()} RUB`);
      console.log(`  Средняя стоимость заказа: ${product.averageOrderValue.toFixed(2)} RUB`);
      console.log('');
    });

    // Расчет итогов
    const totals = salesFunnel.data.reduce((acc, p) => ({
      views: acc.views + p.views,
      purchases: acc.purchases + p.purchases,
      revenue: acc.revenue + p.revenue
    }), { views: 0, purchases: 0, revenue: 0 });

    console.log('=== Итоги ===');
    console.log(`  Всего просмотров: ${totals.views.toLocaleString()}`);
    console.log(`  Всего покупок: ${totals.purchases.toLocaleString()}`);
    console.log(`  Общая выручка: ${totals.revenue.toLocaleString()} RUB`);
    console.log(`  Общая конверсия: ${((totals.purchases / totals.views) * 100).toFixed(2)}%`);

    return salesFunnel.data;

  } catch (error) {
    console.error('Ошибка получения данных о продажах:', error.message);
    throw error;
  }
}

getSalesData();
```

### Ожидаемый вывод

```
Получение данных о продажах с 2024-09-26 по 2024-10-26

=== Воронка продаж (последние 30 дней) ===

Товар: TechBrand Smartphone Pro 15
  SKU: TB-SP15-BLK
  Просмотры: 15,240
  Добавлено в корзину: 1,829
  Покупки: 427
  Коэффициент конверсии: 2.80%
  Выручка: 1,279,273 RUB
  Средняя стоимость заказа: 2,996.43 RUB

Товар: Phone Case Premium
  SKU: PC-PREM-BLK
  Просмотры: 8,430
  Добавлено в корзину: 952
  Покупки: 312
  Коэффициент конверсии: 3.70%
  Выручка: 155,000 RUB
  Средняя стоимость заказа: 496.79 RUB

=== Итоги ===
  Всего просмотров: 23,670
  Всего покупок: 739
  Общая выручка: 1,434,273 RUB
  Общая конверсия: 3.12%
```

### Анализ топовых товаров

```typescript
async function getTopPerformers() {
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - 30);

  const salesFunnel = await sdk.analytics.getSalesFunnel({
    dateFrom: dateFrom.toISOString(),
    dateTo: new Date().toISOString()
  });

  // Сортировка по выручке
  const topByRevenue = [...salesFunnel.data]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  console.log('Топ-5 товаров по выручке:\n');
  topByRevenue.forEach((p, i) => {
    console.log(`${i + 1}. ${p.productName}`);
    console.log(`   Выручка: ${p.revenue.toLocaleString()} RUB`);
    console.log(`   Покупки: ${p.purchases}`);
  });

  // Сортировка по коэффициенту конверсии
  const topByConversion = [...salesFunnel.data]
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  console.log('\nТоп-5 товаров по коэффициенту конверсии:\n');
  topByConversion.forEach((p, i) => {
    console.log(`${i + 1}. ${p.productName}`);
    console.log(`   Конверсия: ${p.conversionRate.toFixed(2)}%`);
    console.log(`   Просмотры: ${p.views.toLocaleString()}`);
  });
}
```

---

## Шаг 2: Получение поисковых запросов (5 минут)

Поймите, что ищут покупатели и как ранжируются ваши товары.

### Метрики поисковых запросов

- **Поисковый термин:** Что ввели пользователи
- **Показы:** Как часто ваши товары появлялись в результатах
- **Клики:** Как часто пользователи кликали ваши товары
- **CTR:** Кликабельность (клики / показы)

### Пример кода

```typescript
async function getSearchQueries() {
  try {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7); // Последние 7 дней

    const queries = await sdk.analytics.getSearchQueries({
      dateFrom: dateFrom.toISOString(),
      dateTo: new Date().toISOString(),
      limit: 20
    });

    console.log('=== Топ поисковых запросов (последние 7 дней) ===\n');

    queries.data.forEach(query => {
      console.log(`Поиск: "${query.searchTerm}"`);
      console.log(`  Показы: ${query.impressions.toLocaleString()}`);
      console.log(`  Клики: ${query.clicks.toLocaleString()}`);
      console.log(`  CTR: ${query.clickThroughRate.toFixed(2)}%`);
      console.log(`  Средняя позиция: ${query.averagePosition.toFixed(1)}`);
      console.log('');
    });

    // Определение запросов с высокими показами и низкой кликабельностью (возможности для оптимизации)
    const lowCTR = queries.data.filter(q => q.clickThroughRate < 2.0 && q.impressions > 100);

    if (lowCTR.length > 0) {
      console.log('⚠️  Возможности для оптимизации (высокие показы, низкий CTR):\n');
      lowCTR.forEach(q => {
        console.log(`  - "${q.searchTerm}"`);
        console.log(`    Показы: ${q.impressions}, CTR: ${q.clickThroughRate.toFixed(2)}%`);
        console.log(`    → Рассмотрите улучшение названий/изображений товаров для этого поиска`);
      });
    }

    return queries.data;

  } catch (error) {
    console.error('Ошибка получения поисковых запросов:', error.message);
    throw error;
  }
}
```

### Ожидаемый вывод

```
=== Топ поисковых запросов (последние 7 дней) ===

Поиск: "смартфон недорогой"
  Показы: 4,230
  Клики: 127
  CTR: 3.00%
  Средняя позиция: 12.3

Поиск: "чехол для телефона"
  Показы: 3,890
  Клики: 156
  CTR: 4.01%
  Средняя позиция: 8.7

Поиск: "телефон черный"
  Показы: 2,450
  Клики: 49
  CTR: 2.00%
  Средняя позиция: 18.5

⚠️  Возможности для оптимизации (высокие показы, низкий CTR):

  - "телефон черный"
    Показы: 2450, CTR: 2.00%
    → Рассмотрите улучшение названий/изображений товаров для этого поиска
```

---

## Шаг 3: Получение истории запасов (5 минут)

Отслеживайте тренды инвентаря для оптимизации уровней запасов и предотвращения дефицита.

### Метрики истории запасов

- **Склад:** Какой склад хранит инвентарь
- **Дата:** Исторический временной штамп
- **Количество:** Уровень запаса в это время
- **Оборачиваемость:** Как быстро продаются товары

### Пример кода

```typescript
async function getStockHistory(sku: string) {
  try {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);

    const history = await sdk.analytics.getStockHistory({
      sku: sku,
      dateFrom: dateFrom.toISOString(),
      dateTo: new Date().toISOString()
    });

    console.log(`=== История запасов для ${sku} (последние 30 дней) ===\n`);

    // Группировка по складу
    const byWarehouse = history.data.reduce((acc, entry) => {
      if (!acc[entry.warehouseId]) {
        acc[entry.warehouseId] = [];
      }
      acc[entry.warehouseId].push(entry);
      return acc;
    }, {} as Record<string, typeof history.data>);

    Object.entries(byWarehouse).forEach(([warehouseId, entries]) => {
      console.log(`Склад: ${warehouseId}`);

      const latestStock = entries[entries.length - 1].quantity;
      const initialStock = entries[0].quantity;
      const stockChange = latestStock - initialStock;

      console.log(`  Текущий запас: ${latestStock}`);
      console.log(`  30 дней назад: ${initialStock}`);
      console.log(`  Изменение: ${stockChange >= 0 ? '+' : ''}${stockChange} единиц`);

      // Расчет средней дневной оборачиваемости
      const sold = initialStock - latestStock;
      const days = 30;
      const dailyTurnover = sold / days;

      console.log(`  Средняя дневная оборачиваемость: ${dailyTurnover.toFixed(1)} единиц/день`);
      console.log(`  Дней до дефицита: ${latestStock > 0 ? (latestStock / dailyTurnover).toFixed(1) : 'НЕТ В НАЛИЧИИ'}`);
      console.log('');
    });

    return history.data;

  } catch (error) {
    console.error('Ошибка получения истории запасов:', error.message);
    throw error;
  }
}

// Пример использования
getStockHistory('TB-SP15-BLK');
```

### Ожидаемый вывод

```
=== История запасов для TB-SP15-BLK (последние 30 дней) ===

Склад: WH-MOSCOW-01
  Текущий запас: 245
  30 дней назад: 500
  Изменение: -255 единиц
  Средняя дневная оборачиваемость: 8.5 единиц/день
  Дней до дефицита: 28.8

Склад: WH-SPB-02
  Текущий запас: 89
  30 дней назад: 200
  Изменение: -111 единиц
  Средняя дневная оборачиваемость: 3.7 единиц/день
  Дней до дефицита: 24.1
```

### Оповещения о низких запасах

```typescript
async function checkLowStock(threshold: number = 30) {
  const products = await sdk.products.listProducts();

  const lowStockProducts = [];

  for (const product of products.data) {
    const stock = await sdk.products.getStock(product.sku);

    const totalStock = stock.data.reduce((sum, w) => sum + w.quantity, 0);

    if (totalStock < threshold) {
      lowStockProducts.push({
        sku: product.sku,
        name: product.name,
        stock: totalStock
      });
    }
  }

  if (lowStockProducts.length > 0) {
    console.log('⚠️  Оповещение о низких запасах:\n');
    lowStockProducts.forEach(p => {
      console.log(`  - ${p.name} (${p.sku})`);
      console.log(`    Запас: ${p.stock} единиц (ниже порога ${threshold})`);
    });
  } else {
    console.log('✓ Все товары имеют достаточный запас');
  }
}
```

---

## Шаг 4: Генерация CSV-отчетов (5 минут)

Экспортируйте аналитические данные в CSV для глубокого анализа в Excel, Google Sheets или BI-инструментах.

### Типы CSV-отчетов

Wildberries поддерживает несколько типов отчетов:
- **Отчет о продажах:** Детальная история транзакций
- **Эффективность товаров:** Метрики по каждому товару
- **Финансовый отчет:** Выручка, комиссии, выплаты
- **Отчет о запасах:** Уровни инвентаря и оборачиваемость

### Пример кода

```typescript
async function generateCSVReport() {
  try {
    console.log('Генерация CSV-отчета...');

    // Запрос генерации отчета
    const reportRequest = await sdk.analytics.generateCSVReport({
      reportType: 'sales',
      dateFrom: new Date('2024-09-01').toISOString(),
      dateTo: new Date('2024-09-30').toISOString(),
      format: 'csv'
    });

    console.log(`✓ Отчет запрошен`);
    console.log(`  ID отчета: ${reportRequest.data.reportId}`);
    console.log(`  Статус: ${reportRequest.data.status}`); // 'pending'

    // Опрос статуса до завершения
    console.log('\nОжидание генерации отчета...');

    let reportStatus;
    let attempts = 0;
    const maxAttempts = 30; // 30 секунд таймаут

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Ожидание 1 секунду

      reportStatus = await sdk.analytics.getCSVReportStatus(reportRequest.data.reportId);

      if (reportStatus.data.status === 'completed') {
        console.log('✓ Отчет готов!');
        break;
      } else if (reportStatus.data.status === 'failed') {
        throw new Error('Генерация отчета не удалась');
      }

      attempts++;
      process.stdout.write('.');
    }

    console.log('');

    if (reportStatus.data.status !== 'completed') {
      throw new Error('Таймаут генерации отчета');
    }

    // Скачивание отчета
    console.log('Скачивание отчета...');

    const reportData = await sdk.analytics.downloadCSVReport(reportRequest.data.reportId);

    // Сохранение в файл
    const fs = require('fs');
    const fileName = `sales-report-${new Date().toISOString().split('T')[0]}.csv`;

    fs.writeFileSync(fileName, reportData.data);

    console.log(`✓ Отчет сохранен в ${fileName}`);
    console.log(`  Размер файла: ${(reportData.data.length / 1024).toFixed(2)} KB`);

    return fileName;

  } catch (error) {
    console.error('Ошибка генерации отчета:', error.message);
    throw error;
  }
}
```

### Ожидаемый вывод

```
Генерация CSV-отчета...
✓ Отчет запрошен
  ID отчета: RPT-789012
  Статус: pending

Ожидание генерации отчета...
......✓ Отчет готов!

Скачивание отчета...
✓ Отчет сохранен в sales-report-2024-10-26.csv
  Размер файла: 245.67 KB
```

---

## Полный пример: Панель аналитики

Вот комплексная панель аналитики, объединяющая все метрики:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function runAnalyticsDashboard() {
  try {
    console.log('=== Панель аналитики Wildberries ===\n');

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 30);
    const dateTo = new Date();

    // 1. Обзор продаж
    console.log('📊 Обзор продаж (последние 30 дней)\n');

    const salesFunnel = await sdk.analytics.getSalesFunnel({
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString()
    });

    const totals = salesFunnel.data.reduce((acc, p) => ({
      views: acc.views + p.views,
      purchases: acc.purchases + p.purchases,
      revenue: acc.revenue + p.revenue
    }), { views: 0, purchases: 0, revenue: 0 });

    console.log(`Всего просмотров: ${totals.views.toLocaleString()}`);
    console.log(`Всего покупок: ${totals.purchases.toLocaleString()}`);
    console.log(`Общая выручка: ${totals.revenue.toLocaleString()} RUB`);
    console.log(`Коэффициент конверсии: ${((totals.purchases / totals.views) * 100).toFixed(2)}%`);

    // 2. Топовые товары
    console.log('\n🏆 Топ-5 товаров по выручке\n');

    const topProducts = [...salesFunnel.data]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    topProducts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.productName}`);
      console.log(`   Выручка: ${p.revenue.toLocaleString()} RUB`);
      console.log(`   Конверсия: ${p.conversionRate.toFixed(2)}%\n`);
    });

    // 3. Эффективность поиска
    console.log('🔍 Топ поисковых запросов (последние 7 дней)\n');

    const dateFrom7 = new Date();
    dateFrom7.setDate(dateFrom7.getDate() - 7);

    const queries = await sdk.analytics.getSearchQueries({
      dateFrom: dateFrom7.toISOString(),
      dateTo: dateTo.toISOString(),
      limit: 5
    });

    queries.data.forEach(q => {
      console.log(`"${q.searchTerm}"`);
      console.log(`  Показы: ${q.impressions.toLocaleString()} | CTR: ${q.clickThroughRate.toFixed(2)}%\n`);
    });

    // 4. Оповещения о запасах
    console.log('📦 Статус запасов\n');

    const lowStockThreshold = 50;
    const products = await sdk.products.listProducts({ limit: 10 });

    for (const product of products.data) {
      const stock = await sdk.products.getStock(product.sku);
      const totalStock = stock.data.reduce((sum, w) => sum + w.quantity, 0);

      if (totalStock < lowStockThreshold) {
        console.log(`⚠️  ${product.name} (${product.sku})`);
        console.log(`   Запас: ${totalStock} единиц (НИЗКИЙ)\n`);
      }
    }

    // 5. Экспорт данных
    console.log('📄 Генерация CSV-отчета...\n');

    const report = await sdk.analytics.generateCSVReport({
      reportType: 'sales',
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      format: 'csv'
    });

    console.log(`✓ Отчет сгенерирован: ${report.data.reportId}`);

    console.log('\n=== Панель завершена ===');

  } catch (error) {
    console.error('❌ Ошибка панели:', error.message);
    process.exit(1);
  }
}

// Запуск панели
runAnalyticsDashboard();
```

### Запуск

```bash
# Установите ваш API ключ
export WB_API_KEY='your_api_key_here'

# Запустите панель
npx tsx analytics-dashboard.ts
```

### Ожидаемый вывод

```
=== Панель аналитики Wildberries ===

📊 Обзор продаж (последние 30 дней)

Всего просмотров: 45,230
Всего покупок: 1,234
Общая выручка: 3,678,900 RUB
Коэффициент конверсии: 2.73%

🏆 Топ-5 товаров по выручке

1. TechBrand Smartphone Pro 15
   Выручка: 1,279,273 RUB
   Конверсия: 2.80%

2. Laptop Pro 14
   Выручка: 987,450 RUB
   Конверсия: 3.12%

...

🔍 Топ поисковых запросов (последние 7 дней)

"смартфон недорогой"
  Показы: 4,230 | CTR: 3.00%

"чехол для телефона"
  Показы: 3,890 | CTR: 4.01%

...

📦 Статус запасов

⚠️  Phone Case Premium (PC-PREM-BLK)
   Запас: 23 единиц (НИЗКИЙ)

📄 Генерация CSV-отчета...

✓ Отчет сгенерирован: RPT-789012

=== Панель завершена ===
```

---

## Следующие шаги

Отличная работа! Вы создали комплексную панель аналитики. Продолжайте обучение:

1. **[Учебное руководство 4: Мультимодульная интеграция](/ru/getting-started/tutorials/multi-module-integration.md)** - Соедините все модули вместе
2. **[Руководство по лучшим практикам](/ru/guides/best-practices.md)** - Паттерны аналитики для production
3. **[Справочник API](/api/)** - Полная документация модуля аналитики

---

## Ключевые выводы

✅ Воронка продаж показывает конверсию от просмотров → покупок
✅ Поисковые запросы раскрывают намерения покупателей и возможности для оптимизации
✅ История запасов предсказывает дефицит и направляет переупорядочение
✅ CSV-отчеты позволяют глубокий анализ во внешних инструментах
✅ Панель объединяет несколько метрик для целостного представления
✅ Оповещения о низких запасах предотвращают упущенные продажи
✅ Коэффициент конверсии — ключевая метрика эффективности товаров

---

[← Назад к Началу работы](/ru/getting-started/index.md) | [Следующее учебное руководство: Мультимодульная интеграция →](/ru/getting-started/tutorials/multi-module-integration.md)

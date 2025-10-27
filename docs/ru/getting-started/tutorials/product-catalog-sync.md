# Учебное руководство 1: Синхронизация каталога товаров

Узнайте, как синхронизировать ваш каталог товаров с маркетплейсом Wildberries.

## Что вы создадите

Полную систему синхронизации каталога товаров, которая:
- Получает категории товаров из Wildberries
- Создает новые карточки товаров
- Загружает медиафайлы товаров (изображения)
- Обновляет цены товаров

**Примерное время:** 30 минут
**Сложность:** Начинающий

---

## Цели обучения

К концу этого руководства вы сможете:
- ✅ Получать категории товаров и их структуру
- ✅ Создавать карточки товаров с обязательными атрибутами
- ✅ Загружать и управлять медиафайлами товаров
- ✅ Динамически обновлять цены товаров
- ✅ Обрабатывать распространенные ошибки в управлении товарами

---

## Предварительные требования

Перед началом убедитесь, что у вас есть:
- ✅ Установленный Node.js ≥ 20.0.0
- ✅ API ключ Wildberries (аккаунт продавца)
- ✅ Установленный SDK (`npm install wb-api-sdk`)
- ✅ Базовые знания TypeScript
- ✅ Пройденное [Руководство по быстрому старту](../quickstart.md)

---

## Введение

Синхронизация каталога товаров - одна из самых распространенных задач для продавцов Wildberries. Это руководство проведет вас через полный рабочий процесс программного управления вашими товарами с использованием SDK.

**Почему это важно:**
- Автоматизация загрузки товаров для больших каталогов
- Синхронизация цен с вашей системой учета запасов
- Эффективное управление медиа-активами
- Уменьшение ошибок при ручном вводе данных

**Что вы достигнете:**
К концу у вас будет рабочий скрипт, который может создавать товары, загружать изображения и обновлять цены - основа для построения полной интеграции электронной коммерции.

---

## Шаг 1: Получение категорий товаров (10 минут)

Сначала давайте получим структуру категорий, чтобы понять, куда относятся наши товары.

### Понимание категорий

Wildberries использует иерархическую систему категорий:
- **Родительские категории:** Верхний уровень (напр., "Электроника", "Бытовая химия")
- **Подкатегории:** Более конкретные (напр., "Смартфоны", "Ноутбуки")
- **Характеристики:** Обязательные атрибуты для каждой категории (напр., бренд, цвет, размер)

### Пример кода

Создайте файл `product-sync.ts`:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function getCategories() {
  try {
    // Получение всех родительских категорий
    const parentCategories = await sdk.products.getParentAll();

    console.log('Доступные родительские категории:');
    parentCategories.data.forEach(category => {
      console.log(`  - ${category.name} (ID: ${category.id})`);
    });

    // Получение подкатегорий для конкретной родительской категории
    const electronicsId = parentCategories.data.find(
      c => c.name === 'Электроника'
    )?.id;

    if (electronicsId) {
      const subcategories = await sdk.products.getObjectAll(electronicsId);

      console.log('\nПодкатегории электроники:');
      subcategories.data.forEach(sub => {
        console.log(`  - ${sub.name} (ID: ${sub.id})`);
      });
    }

    // Получение обязательных характеристик для категории
    const categoryId = 'ваш-id-категории'; // Замените на реальный ID
    const characteristics = await sdk.products.getObjectCharc(categoryId);

    console.log('\nОбязательные характеристики:');
    characteristics.data.required.forEach(char => {
      console.log(`  - ${char.name} (${char.type})`);
    });

  } catch (error) {
    console.error('Ошибка получения категорий:', error.message);
  }
}

getCategories();
```

### Ожидаемый результат

```
Доступные родительские категории:
  - Электроника (ID: 1)
  - Бытовая химия (ID: 2)
  - Одежда (ID: 3)
  ...

Подкатегории электроники:
  - Смартфоны (ID: 101)
  - Ноутбуки (ID: 102)
  - Планшеты (ID: 103)
  ...

Обязательные характеристики:
  - Бренд (string)
  - Модель (string)
  - Цвет (enum)
  - Размер экрана (number)
  ...
```

### Ключевые выводы

- Всегда сначала получайте категории для получения действительных ID
- Каждая категория имеет разные обязательные характеристики
- Характеристики определяют, какие атрибуты нужны вашему товару

---

## Шаг 2: Создание карточки товара (10 минут)

Теперь давайте создадим новую карточку товара со всей необходимой информацией.

### Структура карточки товара

Карточка товара содержит:
- **Базовая информация:** Название, бренд, описание
- **Назначение категории:** К какой категории она принадлежит
- **Характеристики:** Специфичные для товара атрибуты
- **Ценообразование:** Базовая цена и скидки
- **Запасы:** Уровни запасов на складах

### Пример кода

Добавьте эту функцию в ваш `product-sync.ts`:

```typescript
async function createProduct() {
  try {
    const productData = {
      brandName: 'ТехБренд',
      categoryId: '101', // Электроника > Смартфоны
      title: 'ТехБренд Смартфон Про 15',
      description: 'Новейший смартфон с расширенными возможностями',

      // Обязательные характеристики (варьируются по категориям)
      characteristics: [
        { id: 'brand', value: 'ТехБренд' },
        { id: 'model', value: 'Про 15' },
        { id: 'color', value: 'Черный' },
        { id: 'screenSize', value: '6.5' },
        { id: 'memory', value: '128GB' }
      ],

      // Информация о ценообразовании
      pricing: {
        price: 59999, // Цена в рублях (599.99)
        discount: 10, // Скидка 10%
        currency: 'RUB'
      },

      // Начальные запасы
      stock: [
        {
          warehouseId: 'склад-1',
          quantity: 100
        }
      ]
    };

    const result = await sdk.products.createProduct(productData);

    console.log('Товар успешно создан!');
    console.log('ID товара:', result.data.id);
    console.log('Статус:', result.data.status); // Должно быть 'draft'

    return result.data.id; // Сохраните для следующих шагов

  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Ошибка валидации:');
      error.fieldErrors.forEach(err => {
        console.error(`  - ${err.field}: ${err.message}`);
      });
    } else {
      console.error('Ошибка создания товара:', error.message);
    }
  }
}
```

### Ожидаемый результат

```
Товар успешно создан!
ID товара: prod_abc123xyz
Статус: draft
```

### Распространенные ошибки

**❌ "Отсутствует обязательная характеристика: бренд"**
- **Решение:** Проверьте требования категории с помощью `getCategoryCharacteristics()`
- **Исправление:** Добавьте все обязательные характеристики в данные вашего товара

**❌ "Недействительный ID категории"**
- **Решение:** Проверьте существование ID категории с помощью `getSubcategories()`
- **Исправление:** Используйте действительный ID категории из дерева категорий

**❌ "Превышен лимит запросов"**
- **Решение:** SDK автоматически повторяет попытки, но будьте терпеливы
- **Примечание:** Создание товара имеет строгий лимит (1 запрос в 10 секунд)

---

## Шаг 3: Загрузка медиафайлов товара (5 минут)

Товарам нужны изображения, чтобы быть видимыми на маркетплейсе. Давайте загрузим фотографии товара.

### Требования к медиафайлам

- **Форматы:** JPEG, PNG
- **Размер:** Макс. 10MB на изображение
- **Размеры:** Мин. 900x1200px (рекомендуется 1500x2000px)
- **Количество:** Макс. 10 изображений на товар
- **Порядок:** Первое изображение становится основной фотографией товара

### Пример кода

```typescript
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function uploadProductMedia(productId: string) {
  try {
    // Подготовка файлов с изображениями
    const imagePaths = [
      './images/product-front.jpg',
      './images/product-back.jpg',
      './images/product-side.jpg'
    ];

    // Загрузка каждого изображения
    for (const imagePath of imagePaths) {
      const imageBuffer = readFileSync(resolve(imagePath));

      const result = await sdk.products.uploadMediaFile({
        productId: productId,
        file: imageBuffer,
        fileName: imagePath.split('/').pop(),
        mimeType: 'image/jpeg'
      });

      console.log(`Загружено: ${imagePath}`);
      console.log(`  - ID медиафайла: ${result.data.mediaId}`);
      console.log(`  - URL: ${result.data.url}`);
    }

    console.log('\nВсе изображения успешно загружены!');

  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Ошибка валидации изображения:', error.message);
    } else {
      console.error('Ошибка загрузки медиафайлов:', error.message);
    }
  }
}
```

### Ожидаемый результат

```
Загружено: ./images/product-front.jpg
  - ID медиафайла: media_xyz789
  - URL: https://content-api.wildberries.ru/media/prod_abc123xyz/media_xyz789.jpg

Загружено: ./images/product-back.jpg
  - ID медиафайла: media_abc456
  - URL: https://content-api.wildberries.ru/media/prod_abc123xyz/media_abc456.jpg

Загружено: ./images/product-side.jpg
  - ID медиафайла: media_def123
  - URL: https://content-api.wildberries.ru/media/prod_abc123xyz/media_def123.jpg

Все изображения успешно загружены!
```

### Советы

- Загружайте изображения высокого качества для лучшей конверсии
- Первое изображение наиболее важно (показывается в результатах поиска)
- Используйте описательные имена файлов для организации

---

## Шаг 4: Обновление ценообразования (5 минут)

Цены товаров часто меняются. Давайте динамически обновим ценообразование.

### Структура ценообразования

- **Базовая цена:** Обычная продажная цена
- **Скидка:** Процент или фиксированная сумма
- **Финальная цена:** Рассчитывается автоматически
- **Валюта:** Всегда RUB (российские рубли)

### Пример кода

```typescript
async function updatePricing(productId: string) {
  try {
    // Обновление цены товара
    const result = await sdk.products.updatePricing({
      productId: productId,
      price: 54999, // Новая цена: 549.99 RUB
      discount: 15, // Скидка 15%
      discountType: 'percentage'
    });

    console.log('Цена успешно обновлена!');
    console.log('Новая цена:', result.data.price);
    console.log('Скидка:', result.data.discount + '%');
    console.log('Финальная цена:', result.data.finalPrice); // 46749 RUB

  } catch (error) {
    console.error('Ошибка обновления цены:', error.message);
  }
}
```

### Ожидаемый результат

```
Цена успешно обновлена!
Новая цена: 54999
Скидка: 15%
Финальная цена: 46749
```

### Массовое обновление цен

Для нескольких товаров:

```typescript
async function bulkUpdatePrices(products: Array<{id: string, price: number}>) {
  try {
    const updates = products.map(product =>
      sdk.products.updatePricing({
        productId: product.id,
        price: product.price
      })
    );

    // Выполнение параллельно (с соблюдением лимитов запросов)
    const results = await Promise.all(updates);

    console.log(`Обновлено ${results.length} товаров успешно`);

  } catch (error) {
    console.error('Массовое обновление не удалось:', error.message);
  }
}
```

---

## Полный пример

Вот полный рабочий код, объединяющий все шаги:

```typescript
import { WildberriesSDK } from 'wb-api-sdk';
import { readFileSync } from 'fs';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

async function syncProductCatalog() {
  try {
    // Шаг 1: Получение категорий
    console.log('Шаг 1: Получение категорий...');
    const categories = await sdk.products.getParentAll();
    console.log(`✓ Найдено ${categories.data.length} родительских категорий\n`);

    // Шаг 2: Создание товара
    console.log('Шаг 2: Создание товара...');
    const productData = {
      brandName: 'ТехБренд',
      categoryId: '101',
      title: 'ТехБренд Смартфон Про 15',
      description: 'Новейший смартфон с расширенными возможностями',
      characteristics: [
        { id: 'brand', value: 'ТехБренд' },
        { id: 'model', value: 'Про 15' },
        { id: 'color', value: 'Черный' }
      ],
      pricing: {
        price: 59999,
        discount: 10,
        currency: 'RUB'
      }
    };

    const product = await sdk.products.createProduct(productData);
    console.log(`✓ Товар создан: ${product.data.id}\n`);

    // Шаг 3: Загрузка медиафайлов
    console.log('Шаг 3: Загрузка изображений товара...');
    const imagePaths = ['./images/front.jpg', './images/back.jpg'];

    for (const imagePath of imagePaths) {
      const imageBuffer = readFileSync(imagePath);
      await sdk.products.uploadMediaFile({
        productId: product.data.id,
        file: imageBuffer,
        fileName: imagePath.split('/').pop(),
        mimeType: 'image/jpeg'
      });
    }
    console.log(`✓ Загружено ${imagePaths.length} изображений\n`);

    // Шаг 4: Обновление ценообразования
    console.log('Шаг 4: Обновление ценообразования...');
    await sdk.products.updatePricing({
      productId: product.data.id,
      price: 54999,
      discount: 15
    });
    console.log('✓ Цена обновлена\n');

    console.log('🎉 Синхронизация каталога товаров завершена!');
    console.log(`ID товара: ${product.data.id}`);
    console.log('Статус: Готов для маркетплейса');

  } catch (error) {
    console.error('❌ Синхронизация не удалась:', error.message);
    process.exit(1);
  }
}

// Запуск синхронизации
syncProductCatalog();
```

### Запустите

```bash
# Установите ваш API ключ
export WB_API_KEY='ваш_api_ключ_здесь'

# Запустите скрипт
npx tsx product-sync.ts
```

### Ожидаемый результат

```
Шаг 1: Получение категорий...
✓ Найдено 15 родительских категорий

Шаг 2: Создание товара...
✓ Товар создан: prod_abc123xyz

Шаг 3: Загрузка изображений товара...
✓ Загружено 2 изображений

Шаг 4: Обновление ценообразования...
✓ Цена обновлена

🎉 Синхронизация каталога товаров завершена!
ID товара: prod_abc123xyz
Статус: Готов для маркетплейса
```

---

## Лучшие практики обработки ошибок

### Лимит запросов

Операции с товарами имеют строгие лимиты запросов:

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error.name === 'RateLimitError') {
    console.log(`Лимит запросов. Повтор через ${error.retryAfter}мс`);
    // SDK автоматически повторяет попытки, никаких действий не требуется
  }
}
```

### Ошибки валидации

Обработка валидации на уровне полей:

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error.name === 'ValidationError') {
    console.error('Ошибки валидации:');
    error.fieldErrors.forEach(err => {
      console.error(`  ${err.field}: ${err.message}`);
    });
    // Исправьте данные и повторите попытку
  }
}
```

### Сетевые ошибки

Обработка временных сбоев:

```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error.name === 'NetworkError') {
    console.error('Проблема сети:', error.message);
    // SDK автоматически повторяет попытки 3 раза
    // Если все еще не работает, проверьте ваше соединение
  }
}
```

---

## Устранение неполадок

### Распространенные проблемы

**Проблема: "Создание товара медленное"**
- **Причина:** Лимит запросов (1 запрос в 10 секунд)
- **Решение:** Это нормально. Используйте массовые операции для нескольких товаров.

**Проблема: "Загрузка изображения не удается"**
- **Причина:** Размер или формат файла
- **Решение:** Проверьте, что изображение соответствует требованиям (JPEG/PNG, <10MB, мин. 900x1200px)

**Проблема: "Отсутствуют обязательные характеристики"**
- **Причина:** Требования категории не выполнены
- **Решение:** Используйте `getCategoryCharacteristics()` для просмотра обязательных полей

**Проблема: "Товар не виден на маркетплейсе"**
- **Причина:** Статус товара 'draft'
- **Решение:** Используйте `sdk.products.publishProduct(productId)` чтобы сделать его активным

---

## Следующие шаги

Поздравляем! Вы изучили синхронизацию каталога товаров. Продолжайте ваш путь:

1. **[Учебное руководство 2: Выполнение заказов](./order-fulfillment.md)** - Обработка заказов клиентов
2. **[Учебное руководство 3: Панель аналитики](./analytics-dashboard.md)** - Отслеживание производительности товаров
3. **[Руководство по лучшим практикам](../../guides/best-practices.md)** - Паттерны для production
4. **[Справочник API](../../api/)** - Полная документация модуля товаров

---

## Ключевые выводы

✅ Категории товаров определяют обязательные характеристики
✅ Товары начинаются в статусе 'draft' и требуют публикации
✅ Загрузка медиафайлов улучшает видимость товара
✅ Обновления цен происходят немедленно
✅ SDK автоматически обрабатывает ограничение скорости
✅ Валидация на уровне полей помогает выявлять ошибки рано

---

[← Назад к Началу работы](../index.md) | [Следующее руководство: Выполнение заказов →](./order-fulfillment.md) | [English Version](../../../getting-started/tutorials/product-catalog-sync.md)

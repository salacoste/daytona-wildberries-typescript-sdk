---
title: Работа с карточками товаров
description: Полное руководство по получению, фильтрации и пагинации карточек товаров с помощью метода getCardsList()
layout: doc
---

# Работа с карточками товаров

Полное руководство по получению, фильтрации и пагинации карточек товаров с помощью метода `getCardsList()`.

> **Примечание**: Устаревший метод `createCardsList()` больше не рекомендуется к использованию. Вместо него используйте `getCardsList()` -- функционально они идентичны.

## Содержание

- [Обзор](#обзор)
- [Базовое использование](#базовое-использование)
- [Структура запроса](#структура-запроса)
- [Первый запрос и пагинация](#первый-запрос-и-пагинация)
- [Параметры фильтрации](#параметры-фильтрации)
- [Полный пример пагинации](#полный-пример-пагинации)
- [Частые ошибки](#частые-ошибки)
- [Решение проблем](#решение-проблем)
- [Лучшие практики](#лучшие-практики)
- [Структура ответа](#структура-ответа)

---

## Обзор

Метод `getCardsList()` получает список ваших карточек товаров из Wildberries. Он поддерживает:

- **Курсорную пагинацию** для получения больших наборов данных
- **Расширенную фильтрацию** по фото, текстовому поиску, брендам, категориям, тегам
- **Сортировку** по дате обновления
- **Эффективную пакетную обработку** (максимум **100 карточек за запрос**)

**Эндпоинт API:** `POST /content/v2/get/cards/list`

**Лимит запросов:** 100 запросов/минуту с интервалом 600 мс (всплеск: 5 запросов)

**Важно:** Карточки в корзине НЕ возвращаются этим методом. Используйте `getTrashedCards()` для получения удалённых карточек отдельно.

### КРИТИЧЕСКИ ВАЖНО: Ограничения лимита пагинации

**МАКСИМУМ: 100 карточек за запрос** -- API отклонит большие значения с ошибкой `ValidationError (HTTP 400)`.

**Проверено на практике (декабрь 2024):**
- **`limit: 10`** -- Работает корректно
- **`limit: 100`** -- **РЕКОМЕНДУЕМЫЙ И МАКСИМАЛЬНЫЙ** -- Официальная рекомендация Wildberries
- **`limit: 1000`** -- **ОШИБКА ValidationError (HTTP 400)**
- **`limit: 5000`** -- **ОШИБКА ValidationError (HTTP 400)**

**Почему это важно:** Несмотря на отсутствие упоминания в спецификации API Wildberries, API строго ограничивает лимит **100 карточками**. Любое значение, превышающее 100, приведёт к отклонению запроса.

**Правильный подход:** Всегда используйте `limit: 100` с корректной пагинацией (см. примеры ниже).

---

## Базовое использование

### Простейший пример -- первые 100 карточек

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Получить первые 100 карточек товаров
const response = await sdk.products.getCardsList({
  settings: {
    filter: {
      withPhoto: -1  // Все карточки (с фото и без)
    },
    cursor: {
      limit: 100
    }
  }
});

console.log(`Получено: ${response.cards?.length ?? 0} карточек`);
console.log(`Всего в аккаунте: ${response.cursor?.total ?? 0} карточек`);
```

---

## Структура запроса

### Схема запроса

```typescript
{
  settings: {
    sort?: {
      ascending?: boolean;  // Сортировка по updatedAt (false = по убыванию)
    };
    filter?: {
      withPhoto?: number;           // Фильтр по фото: -1, 0 или 1
      textSearch?: string;          // Поиск по артикулу продавца, nmID, штрихкоду
      tagIDs?: number[];            // Фильтр по ID тегов
      allowedCategoriesOnly?: boolean;  // Только разрешённые категории
      objectIDs?: number[];         // Фильтр по ID предметов
      brands?: string[];            // Фильтр по названиям брендов
      imtID?: number;              // Фильтр по ID объединённой карточки
    };
    cursor: {
      limit: number;                // Карточек за запрос (МАКСИМУМ: 100)
      updatedAt?: string;           // Для пагинации (временная метка ISO 8601)
      nmID?: number;                // Для пагинации (артикул WB)
    };
  }
}
```

### Параметры запроса

```typescript
{
  locale?: 'ru' | 'en' | 'zh';  // Язык для полей name, value, object
}
```

---

## Первый запрос и пагинация

### Ключевое отличие

**ПЕРВЫЙ ЗАПРОС** (получение начальной порции):
```typescript
// ПРАВИЛЬНО -- Указываем только limit
{
  settings: {
    cursor: {
      limit: 100  // ТОЛЬКО limit, НЕ указывайте updatedAt или nmID
    },
    filter: { withPhoto: -1 }
  }
}
```

```typescript
// НЕПРАВИЛЬНО -- Пустые значения вызывают ошибки валидации
{
  settings: {
    cursor: {
      limit: 100,
      updatedAt: "",  // Уберите это для первого запроса
      nmID: 0         // Уберите это для первого запроса
    },
    filter: { withPhoto: -1 }
  }
}
```

**ЗАПРОСЫ ПАГИНАЦИИ** (получение следующих порций):
```typescript
// ПРАВИЛЬНО -- Копируем updatedAt и nmID из предыдущего ответа
{
  settings: {
    cursor: {
      limit: 100,
      updatedAt: "2023-12-06T11:17:00.96577Z",  // Из response.cursor
      nmID: 370870300                            // Из response.cursor
    },
    filter: { withPhoto: -1 }
  }
}
```

### Как работает пагинация

1. **Делаем первый запрос** с указанием только `limit` в cursor
2. **Получаем ответ** с карточками и данными курсора
3. **Копируем `cursor.updatedAt` и `cursor.nmID`** из ответа
4. **Вставляем в cursor следующего запроса**
5. **Повторяем**, пока `cursor.total < limit` или `cards.length < limit`

---

## Параметры фильтрации

### Фильтр по фото

```typescript
// Все карточки (с фото и без) -- ПО УМОЛЧАНИЮ
withPhoto: -1

// Только карточки БЕЗ фото
withPhoto: 0

// Только карточки С фото
withPhoto: 1
```

### Текстовый поиск (артикул продавца, nmID, штрихкод)

```typescript
{
  settings: {
    filter: {
      textSearch: '4603743187500888',  // Поиск по артикулу продавца, nmID, штрихкоду
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Фильтр по бренду

```typescript
{
  settings: {
    filter: {
      brands: ['Nike', 'Adidas', 'Puma'],
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Фильтр по ID тегов

```typescript
// Сначала получаем доступные теги
const tags = await sdk.products.getContentTags();
console.log(tags);

// Затем фильтруем по конкретным ID тегов
{
  settings: {
    filter: {
      tagIDs: [345, 415],  // ID тегов из getContentTags()
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Фильтр по предмету (категории)

```typescript
{
  settings: {
    filter: {
      objectIDs: [235, 67],  // ID предметов
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Фильтр по ID объединённой карточки

```typescript
{
  settings: {
    filter: {
      imtID: 328632,  // Получить все варианты объединённой карточки
      withPhoto: -1
    },
    cursor: { limit: 100 }
  }
}
```

### Комбинирование нескольких фильтров

```typescript
{
  settings: {
    filter: {
      brands: ['Nike'],
      objectIDs: [235],
      withPhoto: 1,        // Только с фото
      tagIDs: [345]
    },
    cursor: { limit: 100 }
  }
}
```

---

## Полный пример пагинации

### Получение всех карточек товаров с пагинацией

```typescript
async function getAllProductCards() {
  const allCards = [];
  let hasMore = true;
  let cursor: any = { limit: 100 };  // Начинаем только с limit

  while (hasMore) {
    const response = await sdk.products.getCardsList({
      settings: {
        filter: { withPhoto: -1 },
        cursor
      }
    });

    // Добавляем карточки в результат
    if (response.cards) {
      allCards.push(...response.cards);
    }

    // Проверяем, есть ли ещё данные
    const receivedCount = response.cards?.length ?? 0;

    // Останавливаемся, если получено меньше лимита (последняя страница)
    if (receivedCount < 100) {
      hasMore = false;
    } else if (response.cursor) {
      // Обновляем курсор для следующего запроса
      cursor = {
        limit: 100,
        updatedAt: response.cursor.updatedAt,
        nmID: response.cursor.nmID
      };
    } else {
      hasMore = false;
    }

    console.log(`Прогресс: получено ${allCards.length} карточек`);

    // Опционально: задержка для соблюдения лимитов запросов
    await new Promise(resolve => setTimeout(resolve, 650));
  }

  console.log(`Всего получено карточек: ${allCards.length}`);
  return allCards;
}

// Использование
const allCards = await getAllProductCards();
```

### Пагинация с определёнными фильтрами

```typescript
async function getFilteredCardsWithPagination(filters: {
  brands?: string[];
  withPhoto?: number;
  textSearch?: string;
}) {
  const allCards = [];
  let cursor: any = { limit: 100 };

  while (true) {
    const response = await sdk.products.getCardsList({
      settings: {
        filter: {
          ...filters,
          withPhoto: filters.withPhoto ?? -1
        },
        cursor
      }
    });

    if (response.cards) {
      allCards.push(...response.cards);
    }

    const receivedCount = response.cards?.length ?? 0;

    if (receivedCount < 100 || !response.cursor?.updatedAt) {
      break;
    }

    cursor = {
      limit: 100,
      updatedAt: response.cursor.updatedAt,
      nmID: response.cursor.nmID
    };

    console.log(`Получено ${allCards.length} карточек...`);
    await new Promise(resolve => setTimeout(resolve, 650));
  }

  return allCards;
}

// Примеры использования
const nikeCards = await getFilteredCardsWithPagination({
  brands: ['Nike'],
  withPhoto: 1
});

const cardsWithPhotos = await getFilteredCardsWithPagination({
  withPhoto: 1
});
```

---

## Частые ошибки

### Ошибка 1: Пустые поля курсора в первом запросе

```typescript
// НЕПРАВИЛЬНО -- Вызывает "Validation failed"
const response = await sdk.products.getCardsList({
  settings: {
    cursor: {
      limit: 100,
      updatedAt: "",  // Пустая строка вызывает ошибку валидации
      nmID: 0         // Нулевое значение вызывает ошибку валидации
    },
    filter: { withPhoto: -1 }
  }
});
```

**Решение:** Не указывайте `updatedAt` и `nmID` в первом запросе:

```typescript
const response = await sdk.products.getCardsList({
  settings: {
    cursor: {
      limit: 100  // ТОЛЬКО limit
    },
    filter: { withPhoto: -1 }
  }
});
```

### Ошибка 2: Отсутствует обёртка `settings`

```typescript
// НЕПРАВИЛЬНО -- Отсутствует обёртка settings
const response = await sdk.products.getCardsList({
  cursor: { limit: 100 },      // Должно быть внутри settings
  filter: { withPhoto: -1 }    // Должно быть внутри settings
});
```

**Решение:** Оберните всё в `settings`:

```typescript
const response = await sdk.products.getCardsList({
  settings: {  // Обёртка обязательна
    cursor: { limit: 100 },
    filter: { withPhoto: -1 }
  }
});
```

### Ошибка 3: Превышение максимального лимита (КРИТИЧНО)

```typescript
// НЕПРАВИЛЬНО -- Лимит превышает максимум, вызывает ValidationError (HTTP 400)
const response = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 1000 }  // ОШИБКА -- Максимум 100!
  }
});

// ТОЖЕ НЕПРАВИЛЬНО -- Ещё большие значения не работают
const response = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 5000 }  // ОШИБКА -- Максимум 100!
  }
});
```

**Решение:** ВСЕГДА используйте limit: 100 (максимально допустимое значение):

```typescript
const response = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 }  // МАКСИМУМ И РЕКОМЕНДУЕМОЕ ЗНАЧЕНИЕ
  }
});
```

**Ошибка, которую вы увидите при превышении:**
```
ValidationError: Validation failed
HTTP Status: 400
```

### Ошибка 4: Отсутствие пагинации

```typescript
// НЕПРАВИЛЬНО -- Получает только первые 100 карточек
const response = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 }
  }
});

// Если у вас 500 карточек, вы пропустили 400!
```

**Решение:** Реализуйте цикл пагинации (см. [Полный пример пагинации](#полный-пример-пагинации))

### Ошибка 5: Неверные разрешения API-ключа

```typescript
// НЕПРАВИЛЬНО -- Использование API-ключа без категории "Контент" или "Продвижение"
```

**Решение:** Создайте API-ключ с нужными разрешениями:
- Перейдите в Портал продавца -> Настройки -> API-ключи
- Создайте новый ключ с категорией **"Контент"** или **"Продвижение"**

---

## Решение проблем

### Ошибка: "Validation failed"

**Симптомы:**
- Запрос возвращает код состояния 400
- Сообщение об ошибке: "Validation failed"

**Частые причины и решения:**

1. **Пустые поля курсора в первом запросе**
   ```typescript
   // Проблема
   cursor: { limit: 100, updatedAt: "", nmID: 0 }

   // Решение
   cursor: { limit: 100 }
   ```

2. **Лимит превышает максимум (САМАЯ ЧАСТАЯ ПРИЧИНА)**
   ```typescript
   // Проблема -- API возвращает ValidationError (HTTP 400)
   cursor: { limit: 1000 }  // Превышает максимум!
   cursor: { limit: 5000 }  // Превышает максимум!

   // Решение -- Используйте максимально допустимое значение
   cursor: { limit: 100 }  // МАКСИМУМ: 100 карточек
   ```

   **Примечание:** Это причина №1 ошибки ValidationError. API строго ограничивает лимит в 100 карточек, несмотря на неполную документацию.

3. **Отсутствует обёртка settings**
   ```typescript
   // Проблема
   { cursor: { limit: 100 } }

   // Решение
   { settings: { cursor: { limit: 100 } } }
   ```

### Ошибка: 401 Unauthorized или 403 Forbidden

**Причина:** API-ключ не имеет необходимых разрешений

**Решение:**
1. Перейдите в Портал продавца Wildberries
2. Откройте Настройки -> API-ключи
3. Создайте новый ключ с категорией **"Контент"** или **"Продвижение"**
4. Обновите переменную окружения `WB_API_KEY`

### Ошибка: 429 Too Many Requests

**Причина:** Превышен лимит запросов (100 запросов/минуту)

**Решение:**
```typescript
// Добавьте задержку между запросами
async function fetchWithDelay() {
  const response = await sdk.products.getCardsList({...});

  // Ждём 650 мс перед следующим запросом (100 зап/мин = 600 мс интервал + запас)
  await new Promise(resolve => setTimeout(resolve, 650));

  return response;
}
```

### Получено 0 карточек при наличии товаров

**Возможные причины:**

1. **Карточки в корзине**
   ```typescript
   // Используйте отдельный метод для удалённых карточек
   const trashedCards = await sdk.products.getTrashedCards({
     settings: { cursor: { limit: 100 } }
   });
   ```

2. **Неверный фильтр**
   ```typescript
   // Проверьте настройки фильтра
   filter: { withPhoto: 0 }  // Возвращает только карточки БЕЗ фото
   ```

3. **Слишком узкий текстовый поиск**
   ```typescript
   // Попробуйте более широкий поиск или уберите фильтр
   filter: { textSearch: '' }  // Пустой поиск = без фильтра
   ```

### В ответе нет поля `cursor`

**Причина:** Это последняя страница результатов

**Решение:** Это ожидаемое поведение, когда все карточки получены. Цикл пагинации должен завершиться.

```typescript
if (!response.cursor?.updatedAt) {
  console.log('Достигнута последняя страница');
  break;
}
```

---

## Лучшие практики

### 1. ВСЕГДА используйте максимально допустимый размер пакета

```typescript
// ПРАВИЛЬНО -- Максимум, допускаемый API
cursor: { limit: 100 }

// ОШИБКА -- Превышает максимум, вызывает ValidationError (HTTP 400)
cursor: { limit: 500 }

// ОШИБКА -- Превышает максимум, вызывает ValidationError (HTTP 400)
cursor: { limit: 1000 }
```

**Почему 100?** API Wildberries строго ограничивает максимум в 100 карточек за запрос. Используйте пагинацию для получения всех карточек.

### 2. Реализуйте защиту от превышения лимитов

```typescript
async function fetchWithRateLimit(requestFn: () => Promise<any>) {
  const response = await requestFn();

  // Ждём 650 мс между запросами (100 зап/мин = 600 мс + запас)
  await new Promise(resolve => setTimeout(resolve, 650));

  return response;
}
```

### 3. Обрабатывайте ошибки корректно

```typescript
async function safeFetchCards(cursor: any, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await sdk.products.getCardsList({
        settings: { cursor, filter: { withPhoto: -1 } }
      });
    } catch (error: any) {
      if (error.statusCode === 429 && attempt < retries) {
        console.log(`Превышен лимит запросов, ожидание 60 сек (попытка ${attempt}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 60000));
      } else if (error.statusCode === 401 || error.statusCode === 403) {
        throw new Error('Неверный API-ключ или недостаточно разрешений');
      } else if (attempt === retries) {
        throw error;
      }
    }
  }
}
```

### 4. Логируйте прогресс для больших наборов данных

```typescript
async function getAllCardsWithProgress() {
  const allCards = [];
  let cursor: any = { limit: 100 };
  let pageNumber = 1;

  while (true) {
    console.log(`Загрузка страницы ${pageNumber}...`);

    const response = await sdk.products.getCardsList({
      settings: { cursor, filter: { withPhoto: -1 } }
    });

    if (response.cards) {
      allCards.push(...response.cards);
      console.log(`  -> Получено ${response.cards.length} карточек`);
      console.log(`  -> Всего на данный момент: ${allCards.length}`);
      console.log(`  -> Всего в аккаунте: ${response.cursor?.total ?? 'неизвестно'}`);
    }

    if ((response.cards?.length ?? 0) < 100 || !response.cursor?.updatedAt) {
      break;
    }

    cursor = {
      limit: 100,
      updatedAt: response.cursor.updatedAt,
      nmID: response.cursor.nmID
    };

    pageNumber++;
    await new Promise(resolve => setTimeout(resolve, 650));
  }

  console.log(`Завершено: получено ${allCards.length} карточек`);
  return allCards;
}
```

### 5. Кэшируйте результаты при необходимости

```typescript
import { writeFileSync, readFileSync, existsSync } from 'fs';

async function getCachedCards(cacheDuration = 3600000) {  // 1 час
  const cacheFile = 'cards-cache.json';

  if (existsSync(cacheFile)) {
    const cache = JSON.parse(readFileSync(cacheFile, 'utf-8'));
    const age = Date.now() - cache.timestamp;

    if (age < cacheDuration) {
      console.log('Используем кэшированные карточки');
      return cache.cards;
    }
  }

  console.log('Загрузка свежих карточек из API');
  const cards = await getAllProductCards();

  writeFileSync(cacheFile, JSON.stringify({
    timestamp: Date.now(),
    cards
  }));

  return cards;
}
```

### 6. Фильтруйте на стороне API для уменьшения объёма данных

```typescript
// ХОРОШО -- Фильтрация на стороне API
const nikeCards = await sdk.products.getCardsList({
  settings: {
    filter: { brands: ['Nike'] },
    cursor: { limit: 100 }
  }
});

// НЕЭФФЕКТИВНО -- Получить всё, затем фильтровать на клиенте
const allCards = await getAllProductCards();
const nikeCards = allCards.filter(c => c.brand === 'Nike');
```

---

## Структура ответа

### Тип ответа

```typescript
{
  cards?: Array<{
    nmID?: number;                // Артикул WB
    imtID?: number;               // ID объединённой карточки (одинаковый для всех вариантов)
    nmUUID?: string;              // Внутренний технический ID (UUID)
    subjectID?: number;           // ID предмета (категории)
    subjectName?: string;         // Название предмета
    vendorCode?: string;          // Артикул продавца (SKU)
    brand?: string;               // Название бренда
    title?: string;               // Название товара
    description?: string;         // Описание товара
    needKiz?: boolean;            // Требуется маркировка (честныйзнак.рф)

    photos?: Array<{
      big?: string;               // URL большого фото
      c246x328?: string;          // URL фото 246x328 пикселей
      c516x688?: string;          // URL фото 516x688 пикселей
      square?: string;            // URL квадратного фото
      tm?: string;                // URL миниатюры
    }>;

    video?: string;               // URL видео

    wholesale?: {
      enabled?: boolean;          // Опт включён
      quantum?: number;           // Минимальное количество для опта
    };

    dimensions?: {
      length?: number;            // Длина в см
      width?: number;             // Ширина в см
      height?: number;            // Высота в см
      weightBrutto?: number;      // Вес в кг
      isValid?: boolean;          // Габариты проверены
    };

    characteristics?: Array<{
      id?: number;                // ID характеристики
      name?: string;              // Название характеристики
      value?: any;                // Значение характеристики (строка, число, массив)
    }>;

    sizes?: Array<{
      chrtID?: number;            // ID размерной сетки
      techSize?: string;          // Технический размер
      wbSize?: string;            // Отображаемый размер
      skus?: string[];            // Штрихкоды для данного размера
    }>;

    tags?: Array<{
      id?: number;                // ID тега
      name?: string;              // Название тега
      color?: string;             // Цвет тега (hex)
    }>;

    createdAt?: string;           // Дата создания (ISO 8601)
    updatedAt?: string;           // Дата последнего обновления (ISO 8601)
  }>;

  cursor?: {
    updatedAt?: string;           // Скопируйте в следующий запрос для пагинации
    nmID?: number;                // Скопируйте в следующий запрос для пагинации
    total?: number;               // Общее количество карточек в аккаунте (информационное)
  };
}
```

### Пример ответа

```json
{
  "cards": [
    {
      "nmID": 123456789,
      "imtID": 328632,
      "vendorCode": "MY-PRODUCT-001",
      "brand": "MyBrand",
      "title": "Premium Product Title",
      "description": "Detailed product description",
      "subjectID": 235,
      "subjectName": "Shirts",
      "photos": [
        {
          "big": "https://basket-01.wb.ru/vol123/part456/123456789/images/big/1.jpg",
          "c516x688": "https://basket-01.wb.ru/vol123/part456/123456789/images/c516x688/1.jpg"
        }
      ],
      "sizes": [
        {
          "chrtID": 987654,
          "techSize": "XL",
          "wbSize": "XL",
          "skus": ["4603743187500888"]
        }
      ],
      "updatedAt": "2023-12-06T11:17:00.96577Z"
    }
  ],
  "cursor": {
    "updatedAt": "2023-12-06T11:17:00.96577Z",
    "nmID": 123456789,
    "total": 500
  }
}
```

---

## Связанные ресурсы

- **[Обязательные характеристики товаров](/ru/guides/mandatory-product-characteristics)** -- Обязательные характеристики при создании карточек в 10+ категориях — дедлайн 29 апреля 2026. Проверяйте `isRequiredForCreate` в ответе `getObjectCharc()` перед созданием карточек.
- **[Каталог товаров -- пример использования](/examples/use-cases/product-catalog)** -- Полные примеры синхронизации каталога товаров
- **[Руководство по управлению остатками](/guides/stock-management)** -- Управление запасами на основе полученных карточек
- **[Руководство по лучшим практикам](/guides/best-practices)** -- Общие лучшие практики работы с SDK
- **[Справочник API: ProductsModule](/api/classes/ProductsModule#getCardsList)** -- Документация TypeScript API

---

## Итоги

**Ключевые выводы:**

1. **Первый запрос:** Указывайте только `limit` в cursor
2. **Пагинация:** Копируйте `updatedAt` и `nmID` из cursor ответа
3. **Всегда оборачивайте** параметры в объект `settings`
4. **Используйте `limit: 100`** для оптимальной производительности
5. **Реализуйте ограничение частоты запросов** (650 мс между запросами)
6. **Обрабатывайте ошибки** и повторяйте запросы при временных сбоях
7. **Проверьте API-ключ** -- он должен иметь разрешения "Контент" или "Продвижение"

**Краткая справка:**

```typescript
// Первый запрос
const first = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 }
  }
});

// Следующий запрос (пагинация)
const next = await sdk.products.getCardsList({
  settings: {
    cursor: {
      limit: 100,
      updatedAt: first.cursor.updatedAt,
      nmID: first.cursor.nmID
    },
    filter: { withPhoto: -1 }
  }
});
```

---

**Нужна помощь?** Ознакомьтесь с [Руководством по решению проблем](/guides/troubleshooting) или [создайте issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues).

[<- К руководствам](/guides/) | [Далее: Управление остатками ->](/guides/stock-management)

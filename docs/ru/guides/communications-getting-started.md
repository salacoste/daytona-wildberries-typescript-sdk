---
title: Руководство по началу работы с модулем Communications
description: Полное руководство по использованию модуля Communications для управления вопросами и ответами, отзывами, чатом, претензиями и закреплёнными отзывами на Wildberries
layout: doc
---

# Руководство по началу работы с модулем Communications

Это руководство охватывает всё, что нужно знать для работы с функциями коммуникаций с покупателями в TypeScript SDK для Wildberries.

> **Важно**: Несколько устаревших методов были удалены из API Wildberries и теперь помечены как deprecated в SDK. Подробности см. в разделе [Устаревшие методы](#устаревшие-методы).

## Содержание

- [Что такое модуль Communications?](#что-такое-модуль-communications)
- [Основные возможности](#основные-возможности)
- [Предварительные требования](#предварительные-требования)
- [Базовое использование](#базовое-использование)
- [Вопросы и ответы](#вопросы-и-ответы)
- [Отзывы и рецензии](#отзывы-и-рецензии)
- [Закреплённые отзывы](#закреплённые-отзывы)
- [Чат с покупателями](#чат-с-покупателями)
- [Претензии и возвраты](#претензии-и-возвраты)
- [Устаревшие методы](#устаревшие-методы)
- [Обработка ошибок](#обработка-ошибок)
- [Лимиты запросов](#лимиты-запросов)
- [Лучшие практики](#лучшие-практики)

## Что такое модуль Communications?

Модуль **Communications** обеспечивает полный контроль над каналами коммуникации с покупателями, включая:

- **Вопросы и ответы**: Управление вопросами покупателей о товарах и ответы на них
- **Отзывы и рецензии**: Просмотр, ответы и управление отзывами о товарах
- **Закреплённые отзывы**: Закрепление положительных отзывов на карточках товаров (НОВАЯ функция)
- **Чат с покупателями**: Обмен сообщениями с покупателями в реальном времени
- **Претензии и возвраты**: Обработка запросов на возврат и претензий покупателей

## Основные возможности

| Функция | Описание | Ключевые методы |
|---------|----------|-----------------|
| **Вопросы** | Просмотр и ответы на вопросы покупателей | `questions()`, `question()`, `updateQuestion()` |
| **Счётчик вопросов** | Отслеживание неотвеченных вопросов | `getQuestionsCount()`, `getQuestionsCountUnanswered()` |
| **Отзывы** | Просмотр и ответы на отзывы о товарах | `feedbacks()`, `feedback()`, `createFeedbacksAnswer()` |
| **Счётчик отзывов** | Отслеживание необработанных отзывов | `getFeedbacksCount()`, `getFeedbacksCountUnanswered()` |
| **Закреплённые отзывы** | Закрепление отзывов на карточках товаров | `pinFeedback()`, `unpinFeedback()`, `getPinnedFeedbacks()` |
| **Чат** | Общение с покупателями | `getSellerChats()`, `getSellerEvents()`, `createSellerMessage()` |
| **Претензии** | Обработка запросов на возврат | `claims()`, `updateClaim()` |
| **Проверка новых элементов** | Проверка наличия новых вопросов и отзывов | `newFeedbacksQuestions()` |

## Предварительные требования

### Установка SDK

```bash
npm install daytona-wildberries-typescript-sdk
```

### Настройка API-ключа

Вам потребуется действующий API-ключ Wildberries с разрешениями на работу с коммуникациями. Создайте файл `.env`:

```bash
WB_API_KEY=your_api_key_here
```

### Импорт и инициализация

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

## Базовое использование

### Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  // Проверяем наличие новых вопросов и отзывов
  const newItems = await sdk.communications.newFeedbacksQuestions();

  if (newItems.data?.hasNewQuestions) {
    console.log('У вас есть новые вопросы для ответа!');
  }

  if (newItems.data?.hasNewFeedbacks) {
    console.log('У вас есть новые отзывы для обработки!');
  }

  // Получаем количество неотвеченных вопросов
  const questionCount = await sdk.communications.getQuestionsCountUnanswered();
  console.log(`Неотвеченные вопросы: ${questionCount.data?.countUnanswered}`);
  console.log(`Сегодня: ${questionCount.data?.countUnansweredToday}`);
}

main();
```

## Вопросы и ответы

### Список вопросов

```typescript
// Получаем неотвеченные вопросы с пагинацией
const questions = await sdk.communications.questions({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc'
});

console.log(`Всего неотвеченных: ${questions.data?.countUnanswered}`);

for (const q of questions.data?.questions ?? []) {
  console.log(`ID вопроса: ${q.id}`);
  console.log(`Текст: ${q.text}`);
  console.log(`Товар: ${q.productDetails?.productName}`);
  console.log(`Дата: ${q.createdDate}`);
  console.log('---');
}
```

### Получение вопроса по ID

```typescript
// Получаем конкретный вопрос
const question = await sdk.communications.question({ id: 'question-uuid-here' });

if (question.data) {
  console.log(`Вопрос: ${question.data.text}`);
  console.log(`Товар: ${question.data.productDetails?.productName}`);
  console.log(`Статус: ${question.data.state}`);

  if (question.data.answer) {
    console.log(`Ответ: ${question.data.answer.text}`);
    console.log(`Можно редактировать: ${question.data.answer.editable}`);
  }
}
```

### Ответ на вопрос

```typescript
// Ответить или отредактировать ответ на вопрос
await sdk.communications.updateQuestion({
  id: 'question-uuid-here',
  answer: { text: 'Спасибо за вопрос! Данный товар...' },
  state: 'wbRu'  // Статус для отвеченного вопроса
});

console.log('Ответ на вопрос успешно отправлен');
```

### Отметить вопрос как просмотренный

```typescript
// Отметить вопрос как просмотренный без ответа
await sdk.communications.updateQuestion({
  id: 'question-uuid-here',
  wasViewed: true
});
```

### Количество вопросов за период

```typescript
// Получаем количество вопросов за указанный период
const count = await sdk.communications.getQuestionsCount({
  dateFrom: Date.parse('2025-01-01') / 1000, // Unix-метка времени
  dateTo: Date.parse('2025-01-31') / 1000,
  isAnswered: false
});

console.log(`Неотвеченные вопросы за январь: ${count.data}`);
```

## Отзывы и рецензии

### Список отзывов

```typescript
// Получаем необработанные отзывы
const feedbacks = await sdk.communications.feedbacks({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc'
});

console.log(`Необработанные отзывы: ${feedbacks.data?.countUnanswered}`);
console.log(`Архивные отзывы: ${feedbacks.data?.countArchive}`);

// Обработка каждого отзыва
for (const fb of feedbacks.data?.feedbacks ?? []) {
  console.log(`ID отзыва: ${fb.id}`);
  console.log(`Оценка: ${fb.productValuation}/5`);
  console.log(`Достоинства: ${fb.pros}`);
  console.log(`Недостатки: ${fb.cons}`);
  console.log(`Текст: ${fb.text}`);
  console.log('---');
}
```

### Получение отзыва по ID

```typescript
const feedback = await sdk.communications.feedback({ id: 'feedback-uuid-here' });

if (feedback.data) {
  console.log(`Пользователь: ${feedback.data.userName}`);
  console.log(`Оценка: ${feedback.data.productValuation}/5`);
  console.log(`Товар: ${feedback.data.productDetails?.productName}`);

  // Проверяем наличие медиа
  if (feedback.data.photoLinks?.length) {
    console.log('Фотографии:', feedback.data.photoLinks.map(p => p.fullSize));
  }

  if (feedback.data.video) {
    console.log(`Видео: ${feedback.data.video.link}`);
  }

  // Проверяем возможность запроса возврата
  if (feedback.data.isAbleReturnProductOrders) {
    console.log('Можно запросить возврат товара');
  }
}
```

### Ответ на отзыв

```typescript
// Отправляем ответ на отзыв
await sdk.communications.createFeedbacksAnswer({
  id: 'feedback-uuid-here',
  text: 'Спасибо за ваш отзыв! Мы ценим ваши добрые слова.'
});

console.log('Ответ на отзыв успешно отправлен');
```

### Редактирование ответа на отзыв

```typescript
// Редактирование существующего ответа (можно редактировать только один раз в течение 60 дней)
await sdk.communications.updateFeedbacksAnswer({
  id: 'feedback-uuid-here',
  text: 'Обновлённый ответ: Спасибо за ваш подробный отзыв!'
});
```

### Запрос возврата товара

```typescript
// Запрос возврата товара, упомянутого в отзыве
// Доступно только при isAbleReturnProductOrders === true
const result = await sdk.communications.createOrderReturn({
  feedbackId: 'feedback-uuid-here'
});

if (!result.error) {
  console.log('Запрос на возврат отправлен');
}
```

### Получение архивных отзывов

```typescript
// Получаем отзывы, которые были обработаны или автоматически архивированы
const archived = await sdk.communications.getFeedbacksArchive({
  take: 50,
  skip: 0,
  order: 'dateDesc'
});

console.log(`Архивных отзывов: ${archived.data?.feedbacks?.length}`);
```

## Закреплённые отзывы

Функция закреплённых отзывов позволяет выделять положительные отзывы на карточках товаров. Для этого требуется активная подписка Джем или тарифная опция.

### Проверка лимитов закрепления

```typescript
// Проверяем лимиты на закрепление отзывов
const limits = await sdk.communications.getPinnedFeedbacksLimits();

if (limits.data.subscription) {
  console.log('Лимиты подписки:');
  console.log(`  Всего: ${limits.data.subscription.limit}`);
  console.log(`  Использовано: ${limits.data.subscription.used}`);
  console.log(`  Осталось: ${limits.data.subscription.remaining}`);
}

if (limits.data.tariff) {
  console.log('Лимиты тарифа:');
  console.log(`  Всего: ${limits.data.tariff.limit}`);
  console.log(`  Использовано: ${limits.data.tariff.used}`);
  console.log(`  Осталось: ${limits.data.tariff.remaining}`);
}
```

### Количество закреплённых отзывов

```typescript
// Подсчёт закреплённых отзывов
const pinnedCount = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned'
});
console.log(`Всего закреплённых отзывов: ${pinnedCount.data}`);

// Подсчёт по месту закрепления
const cardCount = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned',
  pinOn: 'nm'  // На карточке товара
});
console.log(`Закреплено на карточках: ${cardCount.data}`);

const groupCount = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned',
  pinOn: 'imt'  // На объединённой группе товаров
});
console.log(`Закреплено на группах: ${groupCount.data}`);
```

### Список закреплённых отзывов

```typescript
// Получаем список закреплённых отзывов
const pinned = await sdk.communications.getPinnedFeedbacks({
  state: 'pinned',
  limit: 100
});

for (const item of pinned.data ?? []) {
  console.log(`ID закрепления: ${item.pinId}`);
  console.log(`ID отзыва: ${item.feedbackId}`);
  console.log(`Закреплён на: ${item.pinOn}`);
  console.log(`Способ закрепления: ${item.pinMethod}`);
  console.log(`Дата закрепления: ${item.pinnedAt}`);
  console.log('---');
}

// Получаем следующую страницу, если доступна
if (pinned.next) {
  const nextPage = await sdk.communications.getPinnedFeedbacks({
    state: 'pinned',
    next: pinned.next
  });
}
```

### Закрепление отзыва

```typescript
// Закрепляем отзывы на карточках товаров
const result = await sdk.communications.pinFeedback([
  {
    pinMethod: 'subscription',  // или 'tariff'
    pinOn: 'nm',                // 'nm' для карточки товара, 'imt' для объединённой группы
    feedbackId: 'VlbkVVl7mtw37wyWkJZz'
  },
  {
    pinMethod: 'tariff',
    pinOn: 'imt',
    feedbackId: 'DibuRAImknLyiqgzvGcU'
  }
]);

// Проверяем результаты
for (const item of result.data ?? []) {
  if (item.isErrors) {
    console.log(`Не удалось закрепить ${item.feedbackId}:`, item.errors);
  } else {
    console.log(`Закреплён ${item.feedbackId} с pinId: ${item.pinId}`);
  }
}
```

### Открепление отзывов

```typescript
// Сначала получаем закреплённые отзывы для получения pinId
const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned' });
const pinIdsToUnpin = pinned.data?.slice(0, 3).map(item => item.pinId) ?? [];

// Открепляем отзывы
const result = await sdk.communications.unpinFeedback(pinIdsToUnpin);
console.log(`Успешно откреплены: ${result.data?.join(', ')}`);
```

## Чат с покупателями

### Список всех чатов

```typescript
// Получаем все чаты с покупателями
const chats = await sdk.communications.getSellerChats();

for (const chat of chats.chats ?? []) {
  console.log(`ID чата: ${chat.chatId}`);
  console.log(`ID покупателя: ${chat.buyerId}`);
  console.log(`ID заказа: ${chat.orderId}`);
  console.log(`Статус: ${chat.status}`);
  console.log('---');
}
```

### Получение событий чата

```typescript
// Получаем события чата (сообщения, изменения статуса и т.д.)
let allEvents: any[] = [];
let nextToken: number | undefined;

// Постраничный перебор всех событий
do {
  const events = await sdk.communications.getSellerEvents(
    nextToken ? { next: nextToken } : undefined
  );

  allEvents = allEvents.concat(events.events ?? []);
  nextToken = events.next;

  console.log(`Получено ${events.events?.length} событий, всего: ${events.totalEvents}`);
} while (nextToken);

console.log(`Всего получено событий: ${allEvents.length}`);
```

### Отправка сообщения

```typescript
// Отправляем сообщение покупателю
// Примечание: содержимое сообщения передаётся через form data
const result = await sdk.communications.createSellerMessage();
console.log('Сообщение отправлено:', result);
```

### Скачивание файла из чата

```typescript
// Скачиваем файл или изображение из сообщения чата
// downloadID берётся из событий чата
const downloadId = 'download-id-from-event';
const file = await sdk.communications.getSellerDownload(downloadId);
console.log('Файл скачан');
```

## Претензии и возвраты

### Список претензий на возврат

```typescript
// Получаем активные претензии на возврат (за последние 14 дней)
const claims = await sdk.communications.claims({
  is_archive: false,
  limit: 50,
  offset: 0
});

console.log('Претензии на возврат:', claims);

// Фильтрация по товару
const productClaims = await sdk.communications.claims({
  is_archive: false,
  nm_id: 123456789
});

// Получение конкретной претензии
const specificClaim = await sdk.communications.claims({
  is_archive: false,
  id: 'claim-id-here'
});
```

### Ответ на претензию

```typescript
// Отвечаем на претензию покупателя о возврате
const result = await sdk.communications.updateClaim();
console.log('Ответ на претензию отправлен:', result);
```

## Устаревшие методы

Следующие методы были **удалены из API Wildberries** и помечены как deprecated в SDK. При вызове они выводят предупреждение и могут возвращать ошибки от API.

| Устаревший метод | Описание | Причина |
|------------------|----------|---------|
| `supplierValuations()` | Получение причин жалоб на отзывы | Удалён из API |
| `createFeedbacksAction()` | Подача жалобы на отзыв или товар | Удалён из API |
| `templates()` | Получение шаблонов ответов | Удалён из API |
| `createTemplate()` | Создание шаблона ответа | Удалён из API |
| `updateTemplate()` | Обновление шаблона ответа | Удалён из API |
| `deleteTemplate()` | Удаление шаблона ответа | Удалён из API |

### Заметки по миграции

**Функционал шаблонов был удалён.** Вам потребуется:
1. Хранить шаблоны ответов в своём приложении
2. Управлять шаблонами через собственную базу данных или конфигурацию
3. Использовать стандартный метод `createFeedbacksAnswer()` для отправки ответов

**Функционал жалоб на отзывы был удалён.** Обратитесь в поддержку Wildberries для получения альтернативных способов сообщения о проблемных отзывах.

### Предупреждения устаревших методов

При вызове устаревшего метода SDK выводит предупреждение:

```typescript
// Это выведет предупреждение в консоль
const templates = await sdk.communications.templates({ templateType: 1 });
// [WB SDK] templates is deprecated and may be removed. This endpoint has been removed from the Wildberries API.
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

async function processQuestions() {
  try {
    const questions = await sdk.communications.questions({
      isAnswered: false,
      take: 100,
      skip: 0
    });
    // Обрабатываем вопросы...
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Превышен лимит запросов');
      console.error(`Повторить через: ${error.retryAfter} мс`);
      // SDK обрабатывает повторные попытки автоматически
    } else if (error instanceof AuthenticationError) {
      console.error('Недействительный API-ключ — проверьте учётные данные');
    } else if (error instanceof ValidationError) {
      console.error('Некорректный запрос:', error.message);
      // Исправьте параметры запроса
    } else if (error instanceof NetworkError) {
      console.error('Сетевая ошибка:', error.message);
      // Проверьте подключение к сети
    } else if (error instanceof WBAPIError) {
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Обработка ошибок в ответах API

API коммуникаций возвращает ошибки в единообразном формате:

```typescript
const response = await sdk.communications.questions({
  isAnswered: false,
  take: 100,
  skip: 0
});

if (response.error) {
  console.error(`Ошибка API: ${response.errorText}`);
  if (response.additionalErrors?.length) {
    console.error('Дополнительные ошибки:', response.additionalErrors);
  }
} else {
  // Обрабатываем response.data
}
```

## Лимиты запросов

API коммуникаций использует различные лимиты запросов для разных категорий эндпоинтов:

### Уровни лимитов

| Категория | Запросов/сек | Интервал | Всплеск | Методы |
|-----------|-------------|----------|---------|--------|
| **Вопросы и отзывы** | 3 | 333 мс | 6 | Большинство методов для отзывов/вопросов |
| **Закреплённые отзывы** | 3 | 333 мс | 6 | Все методы закрепления |
| **Чат с покупателями** | 1 | 1 с | 10 | Список чатов, события, сообщения |
| **Претензии** | 0.33 | 3 с | 10 | `claims()`, `updateClaim()` |

### Советы по лимитам

- SDK автоматически управляет лимитами с помощью очередей и повторных попыток
- **Методы претензий самые медленные** — всего 20 запросов в минуту
- **Вопросы и отзывы** допускают 180 запросов в минуту со всплесками по 6 запросов
- Используйте пагинацию для сокращения количества обращений к API
- По возможности объединяйте операции в пакеты

```typescript
// Эффективно: получаем 100 элементов за запрос
const questions = await sdk.communications.questions({
  isAnswered: false,
  take: 100,  // Максимум элементов за запрос
  skip: 0
});

// Менее эффективно: получаем меньше элементов, требуется больше запросов
const questions = await sdk.communications.questions({
  isAnswered: false,
  take: 10,
  skip: 0
});
```

## Лучшие практики

### 1. Регулярно проверяйте наличие нового контента

```typescript
// Настраиваем периодическую проверку новых вопросов/отзывов
async function checkForNewContent() {
  const newItems = await sdk.communications.newFeedbacksQuestions();

  if (newItems.data?.hasNewQuestions || newItems.data?.hasNewFeedbacks) {
    // Запускаем уведомление или обработку
    console.log('Доступен новый контент!');
  }
}

// Проверка каждые 5 минут
setInterval(checkForNewContent, 5 * 60 * 1000);
```

### 2. Обрабатывайте отзывы по оценкам

```typescript
// Приоритет — ответы на негативные отзывы
async function processNegativeReviews() {
  const feedbacks = await sdk.communications.feedbacks({
    isAnswered: false,
    take: 100,
    skip: 0
  });

  // Сортировка по оценке (сначала низкие)
  const sortedByRating = (feedbacks.data?.feedbacks ?? [])
    .sort((a, b) => (a.productValuation ?? 5) - (b.productValuation ?? 5));

  for (const fb of sortedByRating) {
    if ((fb.productValuation ?? 5) <= 3) {
      console.log(`Приоритетный: отзыв с оценкой ${fb.productValuation}`);
      // Обрабатываем негативный отзыв
    }
  }
}
```

### 3. Используйте закрепление отзывов стратегически

```typescript
async function pinTopReviews(nmId: number) {
  // Получаем отзывы на товар
  const feedbacks = await sdk.communications.feedbacks({
    isAnswered: true,  // Только обработанные отзывы
    nmId: nmId,
    take: 100,
    skip: 0
  });

  // Находим отзывы с оценкой 5 звёзд и фотографиями
  const topReviews = (feedbacks.data?.feedbacks ?? [])
    .filter(fb => fb.productValuation === 5 && fb.photoLinks?.length);

  // Проверяем лимиты перед закреплением
  const limits = await sdk.communications.getPinnedFeedbacksLimits();
  const remaining = limits.data.subscription?.remaining ?? 0;

  if (topReviews.length > 0 && remaining > 0) {
    const toPin = topReviews.slice(0, Math.min(remaining, 3));

    await sdk.communications.pinFeedback(
      toPin.map(fb => ({
        pinMethod: 'subscription',
        pinOn: 'nm',
        feedbackId: fb.id!
      }))
    );
  }
}
```

### 4. Отслеживайте время ответа

```typescript
async function getResponseMetrics() {
  const unansweredToday = await sdk.communications.getQuestionsCountUnanswered();
  const totalUnanswered = await sdk.communications.getQuestionsCount({
    isAnswered: false
  });

  console.log('Метрики ответов на вопросы:');
  console.log(`  Неотвеченных сегодня: ${unansweredToday.data?.countUnansweredToday}`);
  console.log(`  Всего неотвеченных: ${totalUnanswered.data}`);

  const feedbackMetrics = await sdk.communications.getFeedbacksCountUnanswered();
  console.log('Метрики ответов на отзывы:');
  console.log(`  Необработанных сегодня: ${feedbackMetrics.data?.countUnansweredToday}`);
  console.log(`  Всего необработанных: ${feedbackMetrics.data?.countUnanswered}`);
  console.log(`  Средняя оценка: ${feedbackMetrics.data?.valuation}`);
}
```

### 5. Оперативно обрабатывайте претензии

```typescript
async function processReturnClaims() {
  // Претензии действительны 14 дней — обрабатывайте их регулярно
  const claims = await sdk.communications.claims({
    is_archive: false,
    limit: 100,
    offset: 0
  });

  console.log(`Активных претензий: ${(claims as any[]).length}`);

  // Обрабатываем каждую претензию в соответствии с политикой возвратов
  for (const claim of claims as any[]) {
    console.log(`Претензия ${claim.id}: ${claim.status}`);
    // Отвечаем на претензию
  }
}
```

## Связанные ресурсы

- [Справочник API: CommunicationsModule](/api/classes/CommunicationsModule)
- [Конфигурация лимитов запросов](/src/config/communications-rate-limits.ts)
- [Справочник типов](/src/types/communications.types.ts)
- [Официальный API коммуникаций WB](https://dev.wildberries.ru/openapi/user-communication)

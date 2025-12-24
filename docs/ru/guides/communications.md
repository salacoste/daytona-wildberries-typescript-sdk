# Руководство по Коммуникациям

**Полное руководство по функциям взаимодействия с клиентами: чат, вопросы-ответы и управление отзывами**

---

## Обзор

Модуль Communications предоставляет комплексные инструменты для взаимодействия с покупателями через:

- **Чат с Клиентами**: Обмен сообщениями с покупателями в реальном времени, вложения файлов и предпросмотр чатов с последними сообщениями
- **Вопросы-Ответы по Товарам**: Ответы на вопросы клиентов о товарах перед покупкой
- **Отзывы и Рейтинги**: Управление обратной связью от клиентов, ответы на отзывы и улучшение рейтингов товаров

**Модуль**: `sdk.communications`
**Документация API**: [Wildberries Communications API](https://dev.wildberries.ru/openapi/user-communication)

---

## Содержание

- [Управление Чатом с Клиентами](#управление-чатом-с-клиентами)
- [Система Вопросов-Ответов](#система-вопросов-ответов)
- [Отзывы и Рейтинги](#отзывы-и-рейтинги)
- [Лучшие Практики](#лучшие-практики)
- [Лимиты Запросов](#лимиты-запросов)
- [Обработка Ошибок](#обработка-ошибок)
- [Полные Примеры](#полные-примеры)

---

## Управление Чатом с Клиентами

### Получение Списка Чатов

Получите все активные разговоры с покупателями с предпросмотром чатов:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получить все чаты
const chats = await sdk.communications.getSellerChats();

// Показать список чатов с последними сообщениями (НОВОЕ в v2.3.2)
chats.result?.forEach(chat => {
  console.log(`ID чата: ${chat.chatID}`);
  console.log(`Покупатель: ${chat.clientName} (ID: ${chat.clientID})`);

  // Показать предпросмотр последнего сообщения
  if (chat.lastMessage) {
    const date = new Date(chat.lastMessage.addTimestamp!);
    console.log(`Последнее сообщение: "${chat.lastMessage.text}"`);
    console.log(`Отправлено: ${date.toLocaleString('ru-RU')}`);
  }

  // Информация о товаре (если связано с конкретным товаром)
  if (chat.goodCard) {
    console.log(`Товар: ${chat.goodCard.goodsName} (Артикул: ${chat.goodCard.nmID})`);
  }

  console.log('---');
});
```

**Интерфейс Ответа**:
```typescript
interface Chat {
  chatID?: string;            // Уникальный идентификатор чата
  replySign?: string;         // Требуется для отправки сообщений
  clientID?: string;          // ID покупателя
  clientName?: string;        // Имя покупателя
  goodCard?: GoodCard;        // Связанный товар (опционально)
  lastMessage?: {             // Предпросмотр последнего сообщения (НОВОЕ)
    text?: string;            // Текст сообщения
    addTimestamp?: number;    // Unix timestamp (миллисекунды)
  };
}
```

### Опрос Новых Сообщений

Получение новых событий (сообщений) из чатов:

```typescript
// Первый опрос - получить начальные события
const events1 = await sdk.communications.getSellerEvents();

console.log(`Получено ${events1.result?.length} событий`);

// Обработка событий
events1.result?.forEach(event => {
  console.log(`Тип события: ${event.eventType}`);
  console.log(`ID чата: ${event.chatID}`);
  console.log(`Сообщение: ${event.message?.text}`);

  if (event.isNewChat) {
    console.log('⚠️ Это новый чат!');
  }

  // Обработка вложений
  event.message?.attachments?.forEach(file => {
    console.log(`Вложение: ${file.fileName} (${file.extension})`);
    console.log(`Скачать: ${file.originalUrl}`);
  });
});

// Следующий опрос - используем курсор для пагинации
if (events1.next) {
  const events2 = await sdk.communications.getSellerEvents(events1.next);
  console.log(`Следующая партия: ${events2.result?.length} событий`);
}
```

**Паттерн Опроса Событий**:
```typescript
async function pollChatEvents() {
  let cursor: string | undefined = undefined;

  while (true) {
    try {
      const response = await sdk.communications.getSellerEvents(cursor);

      // Обработка новых событий
      response.result?.forEach(event => {
        handleEvent(event);
      });

      // Обновление курсора для следующего опроса
      cursor = response.next;

      // Ожидание перед следующим опросом (соблюдение лимитов: 10 запросов/10 сек)
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Ошибка опроса:', error);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

function handleEvent(event: Event) {
  if (event.eventType === 'MessageFromCustomer') {
    console.log(`Новое сообщение от ${event.chatID}: ${event.message?.text}`);
    // Обработка сообщения клиента...
  }
}
```

### Отправка Сообщений

Ответ на сообщения покупателей:

```typescript
// Отправить текстовое сообщение
await sdk.communications.postSellerMessage({
  replySign: chat.replySign!,  // Из объекта чата
  text: 'Спасибо за ваш вопрос! Отвечаем...'
});

// Отправить сообщение с вложениями файлов
await sdk.communications.postSellerMessage({
  replySign: chat.replySign!,
  text: 'Высылаем инструкцию по применению',
  parts: [
    {
      file: {
        fileName: 'instruction.pdf',
        fileData: base64FileContent  // Файл в формате Base64
      }
    }
  ]
});
```

**Лимиты Загрузки Файлов**:
- Макс. размер файла: 5MB на файл
- Макс. общий размер: 30MB на сообщение
- Поддерживаемые форматы: JPEG, PNG, PDF

---

## Система Вопросов-Ответов

### Получение Вопросов о Товарах

Получение неотвеченных вопросов о ваших товарах:

```typescript
// Получить все вопросы о товарах
const questions = await sdk.communications.getProductQuestions({
  isAnswered: false,  // Только неотвеченные вопросы
  take: 100,          // Макс 5000
  skip: 0
});

// Показать вопросы
questions.data?.questions?.forEach(q => {
  console.log(`ID вопроса: ${q.id}`);
  console.log(`Артикул товара: ${q.productDetails.nmID}`);
  console.log(`Товар: ${q.productDetails.productName}`);
  console.log(`Вопрос: ${q.text}`);
  console.log(`Задан: ${new Date(q.createdDate).toLocaleDateString()}`);

  if (q.answer) {
    console.log(`Ваш ответ: ${q.answer.text}`);
    console.log(`Редактируемый: ${q.answer.editable}`);
  }

  console.log('---');
});
```

### Ответы на Вопросы

Отправка ответов на вопросы покупателей:

```typescript
// Ответить на вопрос
await sdk.communications.patchProductQuestionAnswer({
  id: question.id!,
  answer: {
    text: 'Да, этот товар подходит для использования на улице при температуре до -30°C.'
  }
});

// Получить статистику вопросов
const stats = await sdk.communications.getProductQuestionsStats();
console.log(`Всего вопросов: ${stats.data?.countUnanswered}`);
console.log(`Неотвеченных: ${stats.data?.countUnanswered}`);
console.log(`Ожидают публикации: ${stats.data?.countUnansweredWbRu}`);
```

---

## Отзывы и Рейтинги

### Получение Отзывов о Товарах

Получение отзывов покупателей с фильтрацией:

```typescript
// Получить все отзывы
const reviews = await sdk.communications.getNewFeedbacks({
  isAnswered: false,  // Только неотвеченные отзывы
  take: 100,
  skip: 0
});

// Показать отзывы
reviews.data?.feedbacks?.forEach(review => {
  console.log(`ID отзыва: ${review.id}`);
  console.log(`Артикул товара: ${review.productDetails.nmID}`);
  console.log(`Оценка: ${'⭐'.repeat(review.productValuation)}`);
  console.log(`Текст: ${review.text}`);
  console.log(`Дата: ${new Date(review.createdDate).toLocaleDateString()}`);

  // Проверить, подал ли покупатель жалобу
  if (review.hasSupplierComplaint) {
    console.log('⚠️ Покупатель подал жалобу');
  }

  if (review.answer) {
    console.log(`Ваш ответ: ${review.answer.text}`);
  }

  console.log('---');
});
```

### Ответы на Отзывы

Ответ на отзывы покупателей:

```typescript
// Ответить на положительный отзыв
await sdk.communications.patchNewFeedbackAnswer({
  id: review.id!,
  text: 'Спасибо за ваш отзыв! Рады, что вам понравился товар. 😊'
});

// Ответить на отрицательный отзыв
await sdk.communications.patchNewFeedbackAnswer({
  id: negativeReview.id!,
  text: 'Приносим извинения за неудобства. Мы исправили эту проблему в новой партии товаров. Свяжитесь с нами для решения вашего вопроса.'
});
```

### Управление Отзывами

Архивирование и управление отзывами:

```typescript
// Архивировать старые отзывы
await sdk.communications.postNewFeedbacksArchive({
  feedbacks: [review1.id!, review2.id!]
});

// Получить архивные отзывы
const archived = await sdk.communications.getArchivedFeedbacks({
  take: 50,
  skip: 0
});

// Разархивировать отзывы
await sdk.communications.postNewFeedbacksUnarchive({
  feedbacks: [archivedReview.id!]
});
```

### Родительско-Дочерние Отношения Отзывов

Обработка отзывов с родительско-дочерними отношениями:

```typescript
// Получить родительские отзывы с дочерними
const parents = await sdk.communications.getNewParentFeedbacks({
  take: 100,
  skip: 0
});

parents.data?.feedbacks?.forEach(parent => {
  console.log(`ID родительского отзыва: ${parent.id}`);
  console.log(`Оценка: ${parent.productValuation} звезд`);

  // Получить дочерние отзывы (повторные)
  if (parent.id) {
    sdk.communications.getNewFeedbackChildren(parent.id).then(children => {
      children.data?.feedbacks?.forEach(child => {
        console.log(`  └─ Повторный отзыв: ${child.text}`);
      });
    });
  }
});
```

---

## Лучшие Практики

### 1. Время Ответа в Чате

**Быстро отвечайте на сообщения покупателей:**

```typescript
// Автоматические ответы на частые вопросы
async function handleCustomerMessage(event: Event) {
  const message = event.message?.text?.toLowerCase();

  // Паттерны автоответов
  if (message?.includes('статус заказа')) {
    await sdk.communications.postSellerMessage({
      replySign: getReplySignForChat(event.chatID),
      text: 'Проверяю статус вашего заказа. Один момент...'
    });

    // Получить статус заказа и ответить
    // ... логика поиска заказа
  }
}
```

**Целевое Время Ответа:**
- Первый ответ: <1 часа
- Последующие ответы: <3 часов
- Решение проблемы: <24 часов

### 2. Управление Вопросами-Ответами

**Давайте исчерпывающие ответы:**

```typescript
async function answerProductQuestions() {
  const questions = await sdk.communications.getProductQuestions({
    isAnswered: false,
    take: 100
  });

  for (const q of questions.data?.questions || []) {
    // Сгенерировать подробный ответ
    const answer = generateAnswer(q.text, q.productDetails);

    await sdk.communications.patchProductQuestionAnswer({
      id: q.id!,
      answer: { text: answer }
    });

    console.log(`Ответили на вопрос ${q.id}`);
  }
}

function generateAnswer(question: string, product: ProductDetails): string {
  // Используйте спецификации товара для генерации точных ответов
  // Включайте релевантные детали: размеры, материалы, инструкции по применению
  return `Подробный ответ на основе спецификаций товара...`;
}
```

### 3. Стратегия Ответов на Отзывы

**Отвечайте на все отзывы:**

```typescript
async function respondToReviews() {
  const reviews = await sdk.communications.getNewFeedbacks({
    isAnswered: false,
    take: 100
  });

  for (const review of reviews.data?.feedbacks || []) {
    let response: string;

    // Положительные отзывы (4-5 звезд)
    if (review.productValuation >= 4) {
      response = 'Спасибо за ваш отзыв! Рады, что товар вам понравился. ❤️';
    }
    // Отрицательные отзывы (1-3 звезды)
    else {
      response = `Приносим извинения за неудобства. ${getIssueResolution(review.text)}`;
    }

    await sdk.communications.patchNewFeedbackAnswer({
      id: review.id!,
      text: response
    });
  }
}

function getIssueResolution(reviewText: string): string {
  // Проанализировать текст отзыва и предоставить соответствующее решение
  if (reviewText.includes('размер')) {
    return 'Мы обновили таблицу размеров для более точного подбора.';
  }
  // ... другие паттерны
  return 'Мы работаем над улучшением качества товара.';
}
```

### 4. Панель Управления Чатами

**Создайте комплексную панель управления чатами:**

```typescript
interface ChatDashboard {
  totalChats: number;
  unreadChats: number;
  recentMessages: Array<{
    chatId: string;
    customer: string;
    lastMessage: string;
    timestamp: Date;
  }>;
}

async function getChatDashboard(): Promise<ChatDashboard> {
  const chats = await sdk.communications.getSellerChats();

  // Сортировать по самым последним сообщениям
  const sortedChats = chats.result
    ?.filter(chat => chat.lastMessage)
    .sort((a, b) => {
      const timeA = a.lastMessage?.addTimestamp ?? 0;
      const timeB = b.lastMessage?.addTimestamp ?? 0;
      return timeB - timeA;  // Новые первыми
    });

  return {
    totalChats: chats.result?.length ?? 0,
    unreadChats: 0,  // TODO: Реализовать отслеживание непрочитанных
    recentMessages: sortedChats?.slice(0, 10).map(chat => ({
      chatId: chat.chatID!,
      customer: chat.clientName!,
      lastMessage: chat.lastMessage!.text!,
      timestamp: new Date(chat.lastMessage!.addTimestamp!)
    })) ?? []
  };
}
```

---

## Лимиты Запросов

**Соблюдайте лимиты API, чтобы избежать блокировок:**

| Эндпоинт | Лимит Запросов |
|----------|----------------|
| `getSellerChats()` | 10 запросов за 10 секунд |
| `getSellerEvents()` | 10 запросов за 10 секунд |
| `postSellerMessage()` | 10 запросов за 10 секунд |
| Методы Q&A | 5 запросов за 5 секунд |
| Методы отзывов | 1 запрос за 5 секунд |

**SDK автоматически соблюдает лимиты запросов.** Дополнительное ограничение не требуется.

---

## Обработка Ошибок

### Частые Ошибки

```typescript
import { RateLimitError, ValidationError, WBAPIError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.communications.postSellerMessage({
    replySign: chat.replySign!,
    text: 'Привет!'
  });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error('Превышен лимит запросов. Повторить после:', error.retryAfter);
    await new Promise(resolve => setTimeout(resolve, error.retryAfter));
    // Повторить...
  } else if (error instanceof ValidationError) {
    console.error('Неверный запрос:', error.message);
  } else if (error instanceof WBAPIError) {
    console.error('Ошибка API:', error.statusCode, error.message);
  }
}
```

### Логика Повторных Попыток для Опроса

```typescript
async function pollWithRetry(maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const events = await sdk.communications.getSellerEvents();
      return events;
    } catch (error) {
      retries++;
      console.error(`Опрос не удался (попытка ${retries}/${maxRetries}):`, error);

      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      } else {
        throw error;
      }
    }
  }
}
```

---

## Полные Примеры

### Пример 1: Бот Поддержки Клиентов

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Чат-бот, который автоматически отвечает на частые вопросы
async function customerSupportBot() {
  let cursor: string | undefined = undefined;

  while (true) {
    try {
      const events = await sdk.communications.getSellerEvents(cursor);

      for (const event of events.result || []) {
        if (event.eventType === 'MessageFromCustomer') {
          await handleCustomerMessage(event);
        }
      }

      cursor = events.next;
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Ошибка бота:', error);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function handleCustomerMessage(event: Event) {
  const text = event.message?.text?.toLowerCase();
  const chatId = event.chatID;

  // Получить детали чата для replySign
  const chats = await sdk.communications.getSellerChats();
  const chat = chats.result?.find(c => c.chatID === chatId);

  if (!chat) return;

  let response: string | null = null;

  // Паттерны автоответов
  if (text?.includes('график работы') || text?.includes('время работы')) {
    response = 'Мы работаем ежедневно с 9:00 до 21:00 по московскому времени.';
  } else if (text?.includes('доставка') || text?.includes('когда придет')) {
    response = 'Доставка обычно занимает 3-7 рабочих дней. Вы можете отследить заказ в личном кабинете.';
  } else if (text?.includes('возврат') || text?.includes('вернуть')) {
    response = 'Вы можете вернуть товар в течение 14 дней. Инструкция: https://...';
  }

  if (response) {
    await sdk.communications.postSellerMessage({
      replySign: chat.replySign!,
      text: response
    });

    console.log(`Автоответ для ${chat.clientName}: ${response}`);
  }
}

// Запустить бота
customerSupportBot();
```

### Пример 2: Панель Управления Вопросами-Ответами

```typescript
// Ежедневная обработка вопросов-ответов
async function processUnansweredQuestions() {
  const questions = await sdk.communications.getProductQuestions({
    isAnswered: false,
    take: 1000
  });

  console.log(`Обработка ${questions.data?.questions?.length} неотвеченных вопросов`);

  for (const question of questions.data?.questions || []) {
    // Сгенерировать ответ на основе деталей товара
    const answer = await generateProductAnswer(question);

    // Отправить ответ
    await sdk.communications.patchProductQuestionAnswer({
      id: question.id!,
      answer: { text: answer }
    });

    console.log(`Ответили: "${question.text}"`);

    // Соблюдение лимита запросов
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Получить обновленную статистику
  const stats = await sdk.communications.getProductQuestionsStats();
  console.log(`Осталось неотвеченных: ${stats.data?.countUnanswered}`);
}

async function generateProductAnswer(question: any): Promise<string> {
  // Использовать спецификации товара для генерации точного ответа
  const product = question.productDetails;

  // Пример: Вопросы о размере
  if (question.text.toLowerCase().includes('размер')) {
    return `Этот товар (${product.productName}) доступен в размерах: ...`;
  }

  // Подробный ответ по умолчанию
  return `Спасибо за ваш вопрос! По товару "${product.productName}" (артикул ${product.nmID}): ...`;
}
```

### Пример 3: Автоматизация Ответов на Отзывы

```typescript
// Автоматизированные ответы на отзывы
async function manageReviews() {
  const reviews = await sdk.communications.getNewFeedbacks({
    isAnswered: false,
    take: 500
  });

  for (const review of reviews.data?.feedbacks || []) {
    const response = generateReviewResponse(review);

    await sdk.communications.patchNewFeedbackAnswer({
      id: review.id!,
      text: response
    });

    console.log(`Ответили на ${review.productValuation}-звездный отзыв от ${review.userName}`);

    // Соблюдение лимита: 1 запрос за 5 секунд
    await new Promise(resolve => setTimeout(resolve, 6000));
  }
}

function generateReviewResponse(review: any): string {
  const rating = review.productValuation;

  // 5-звездные отзывы
  if (rating === 5) {
    return 'Спасибо огромное за ваш отзыв! ❤️ Рады, что товар вам понравился!';
  }

  // 4-звездные отзывы
  if (rating === 4) {
    return 'Спасибо за ваш отзыв! Рады, что в целом товар вам понравился. Будем работать над улучшением!';
  }

  // 1-3 звездные отзывы
  const issues = analyzeNegativeReview(review.text);
  return `Приносим извинения за неудобства! ${issues.resolution} Мы ценим ваш отзыв и работаем над улучшением качества.`;
}

function analyzeNegativeReview(text: string): { issue: string; resolution: string } {
  if (text.toLowerCase().includes('размер')) {
    return {
      issue: 'Размер не подошел',
      resolution: 'Мы обновили таблицу размеров для более точного подбора.'
    };
  }

  if (text.toLowerCase().includes('качество') || text.toLowerCase().includes('брак')) {
    return {
      issue: 'Проблема с качеством',
      resolution: 'Мы усилили контроль качества на производстве.'
    };
  }

  return {
    issue: 'Общая неудовлетворенность',
    resolution: 'Мы работаем над улучшением нашего товара.'
  };
}
```

---

## Связанные Ресурсы

- **[Справочник API](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/)** - Полная TypeDoc документация
- **[Пример Поддержки Клиентов](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/customer-support.ts)** - Полный рабочий пример
- **[Официальная Документация Wildberries](https://dev.wildberries.ru/openapi/user-communication)** - Официальная документация API
- **[Story 3.5: Чат с Клиентами](../../stories/3.5.communications-customer-chat.md)** - История реализации
- **[Story 3.6: Вопросы-Ответы и Отзывы](../../stories/3.6.communications-qa-reviews.md)** - История вопросов-ответов и отзывов
- **[Story 3.7: Последнее Сообщение в Чате](../../stories/3.7.communications-chat-lastmessage.md)** - История функции lastMessage
- **[Epic 3: Модуль Communications](../../epics/epic-3-communications-module.md)** - Полный обзор модуля

---

**Нужна Помощь?** [Открыть issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues) или [присоединиться к обсуждениям](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

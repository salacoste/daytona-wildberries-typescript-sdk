---
title: Коммуникация с покупателями
description: Руководство по управлению вопросами, отзывами, чатами и возвратами с помощью Wildberries SDK
layout: doc
---

# Коммуникация с покупателями

Данное руководство охватывает весь спектр рабочих процессов коммуникации с покупателями, доступных через модуль `sdk.communications`: вопросы о товарах, отзывы и обратная связь, закреплённые отзывы, чат с покупателями и заявки на возврат.

## Содержание

- [Предварительные требования](#предварительные-требования)
- [Вопросы](#вопросы)
- [Отзывы и обратная связь](#отзывы-и-обратная-связь)
- [Закреплённые отзывы](#закреплённые-отзывы)
- [Чат с покупателями](#чат-с-покупателями)
- [Возвраты](#возвраты)
- [Практические сценарии](#практические-сценарии)

---

## Предварительные требования

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});
```

Все описанные ниже методы доступны через `sdk.communications.*`. Лимиты запросов для категории «Вопросы и отзывы» составляют 3 запроса в секунду (интервал 333 мс, всплеск до 6). Эндпоинты чата допускают 10 запросов за 10 секунд. Эндпоинты заявок — 20 запросов в минуту.

---

## Вопросы

Пять методов охватывают полный жизненный цикл вопросов: обнаружение новых элементов, подсчёт неотвеченных вопросов, список с фильтрами, ответ на вопрос и получение одного вопроса по ID.

### Проверка наличия непросмотренных вопросов и отзывов

`newFeedbacksQuestions()` возвращает булевы флаги, указывающие, есть ли вопросы или отзывы, которые продавец ещё не просмотрел.

```typescript
const status = await sdk.communications.newFeedbacksQuestions();

if (status.data?.hasNewQuestions) {
  console.log('Новые вопросы ожидают просмотра');
}
if (status.data?.hasNewFeedbacks) {
  console.log('Новые отзывы ожидают просмотра');
}
```

### Подсчёт неотвеченных вопросов

`getQuestionsCountUnanswered()` возвращает общее количество неотвеченных вопросов и количество за сегодня.

```typescript
const counts = await sdk.communications.getQuestionsCountUnanswered();

console.log(`Всего неотвеченных: ${counts.data?.countUnanswered}`);
console.log(`Неотвеченных сегодня: ${counts.data?.countUnansweredToday}`);
```

### Список вопросов с пагинацией

`questions(params)` возвращает постраничный список, отфильтрованный по статусу ответа, артикулу товара, диапазону дат и порядку сортировки. Один ответ может содержать до 10 000 вопросов.

| Параметр | Тип | Описание |
|-----------|------|-------------|
| `isAnswered` | `boolean` | Фильтр по статусу «отвечен/не отвечен» |
| `nmId` | `number` | Фильтр по артикулу Wildberries |
| `take` | `number` | Количество возвращаемых вопросов (макс. 10 000) |
| `skip` | `number` | Количество пропускаемых вопросов для пагинации |
| `order` | `string` | Порядок сортировки (напр. `'dateAsc'`, `'dateDesc'`) |
| `dateFrom` | `number` | Начальная дата в формате Unix timestamp (секунды) |
| `dateTo` | `number` | Конечная дата в формате Unix timestamp (секунды) |

```typescript
const result = await sdk.communications.questions({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc',
});

console.log(`Всего неотвеченных: ${result.data?.countUnanswered}`);

for (const q of result.data?.questions ?? []) {
  console.log(`[${q.id}] ${q.text}`);
  console.log(`  Товар: ${q.productDetails?.productName} (nmId: ${q.productDetails?.nmId})`);
  console.log(`  Дата: ${q.createdDate}`);
  console.log(`  Просмотрен: ${q.wasViewed}`);
}
```

Для пагинации по всем вопросам увеличивайте `skip` на значение `take` при каждом запросе, пока возвращаемый массив не станет пустым.

### Ответ на вопрос

`updateQuestion(data)` выполняет три функции в зависимости от переданного тела запроса: отметить вопрос как просмотренный, ответить на него или отредактировать существующий ответ. Ответ можно отредактировать один раз в течение 60 дней.

```typescript
// Ответить на вопрос
await sdk.communications.updateQuestion({
  id: 'question-uuid',
  answer: { text: 'Спасибо за вопрос. Эта модель поддерживает зарядку через USB-C.' },
  state: 'wbRu',
});

// Отметить вопрос как просмотренный без ответа
await sdk.communications.updateQuestion({
  id: 'question-uuid',
  wasViewed: true,
});
```

### Получение одного вопроса по ID

`question(params)` возвращает полную информацию по одному вопросу, включая ответ, если он существует.

```typescript
const detail = await sdk.communications.question({ id: 'question-uuid' });

if (detail.data) {
  console.log(`Вопрос: ${detail.data.text}`);
  console.log(`Статус: ${detail.data.state}`);
  if (detail.data.answer) {
    console.log(`Ответ: ${detail.data.answer.text}`);
    console.log(`Можно редактировать: ${detail.data.answer.editable}`);
  }
}
```

---

## Отзывы и обратная связь

Семь методов охватывают управление отзывами: подсчёт неотвеченных отзывов, список с фильтрами, ответ, редактирование ответа, инициирование возврата товара из отзыва, получение одного отзыва и список архивных отзывов.

### Подсчёт неотвеченных отзывов

`getFeedbacksCountUnanswered()` возвращает количество необработанных отзывов и средний рейтинг по всем отзывам.

```typescript
const stats = await sdk.communications.getFeedbacksCountUnanswered();

console.log(`Необработанных всего: ${stats.data?.countUnanswered}`);
console.log(`Необработанных сегодня: ${stats.data?.countUnansweredToday}`);
console.log(`Средний рейтинг: ${stats.data?.valuation}`);
```

### Список отзывов с пагинацией

`feedbacks(params)` возвращает постраничный список отзывов, отфильтрованный по статусу обработки, товару, диапазону дат и порядку сортировки.

| Параметр | Тип | Описание |
|-----------|------|-------------|
| `isAnswered` | `boolean` | Фильтр по статусу «отвечен/не отвечен» |
| `nmId` | `number` | Фильтр по артикулу Wildberries |
| `take` | `number` | Количество возвращаемых отзывов |
| `skip` | `number` | Количество пропускаемых отзывов |
| `order` | `'dateAsc' \| 'dateDesc'` | Порядок сортировки |
| `dateFrom` | `number` | Начальная дата (Unix timestamp, секунды) |
| `dateTo` | `number` | Конечная дата (Unix timestamp, секунды) |

```typescript
const reviews = await sdk.communications.feedbacks({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc',
});

console.log(`Необработанных: ${reviews.data?.countUnanswered}`);
console.log(`В архиве: ${reviews.data?.countArchive}`);

for (const fb of reviews.data?.feedbacks ?? []) {
  console.log(`[${fb.id}] Рейтинг: ${fb.productValuation}/5`);
  console.log(`  Достоинства: ${fb.pros}`);
  console.log(`  Недостатки: ${fb.cons}`);
  console.log(`  Текст: ${fb.text}`);
  console.log(`  Товар: ${fb.productDetails?.productName}`);

  if (fb.photoLinks?.length) {
    console.log(`  Фото: ${fb.photoLinks.length}`);
  }
  if (fb.video) {
    console.log(`  Есть видео (${fb.video.durationSec} сек)`);
  }
}
```

### Ответ на отзыв

`createFeedbacksAnswer(data)` публикует ответ на отзыв. ID отзыва не валидируется на стороне сервера, поэтому убедитесь, что передаёте корректный ID.

```typescript
await sdk.communications.createFeedbacksAnswer({
  id: 'feedback-uuid',
  text: 'Спасибо за ваш положительный отзыв! Мы рады, что товар вам понравился.',
});
```

### Редактирование существующего ответа

`updateFeedbacksAnswer(data)` редактирует ранее отправленный ответ. Это допускается один раз в течение 60 дней с момента первого ответа.

```typescript
await sdk.communications.updateFeedbacksAnswer({
  id: 'feedback-uuid',
  text: 'Обновлено: мы учли замечание по размерам в нашей последней партии.',
});
```

### Инициирование возврата из отзыва

`createOrderReturn(data)` запрашивает возврат товара для заказа, связанного с отзывом. Доступно только если у отзыва `isAbleReturnProductOrders: true`.

```typescript
const fb = await sdk.communications.feedback({ id: 'feedback-uuid' });

if (fb.data?.isAbleReturnProductOrders) {
  const result = await sdk.communications.createOrderReturn({
    feedbackId: 'feedback-uuid',
  });

  if (!result.error) {
    console.log('Запрос на возврат успешно отправлен');
  }
}
```

### Получение одного отзыва по ID

`feedback(params)` возвращает полную информацию об отзыве, включая медиафайлы, данные о размерах, варианты жалобы и возможность возврата.

```typescript
const detail = await sdk.communications.feedback({ id: 'feedback-uuid' });

if (detail.data) {
  console.log(`Пользователь: ${detail.data.userName}`);
  console.log(`Рейтинг: ${detail.data.productValuation}/5`);
  console.log(`Соответствие размеру: ${detail.data.matchingSize}`);
  console.log(`Ответ можно редактировать: ${detail.data.answer?.editable}`);
  console.log(`Статус ответа: ${detail.data.answer?.state}`);
  console.log(`Возврат доступен: ${detail.data.isAbleReturnProductOrders}`);
}
```

### Список архивных отзывов

`getFeedbacksArchive(params)` возвращает отзывы, на которые был дан ответ, которые остались без ответа 30 дней или не содержат текста и фото.

```typescript
const archived = await sdk.communications.getFeedbacksArchive({
  take: 50,
  skip: 0,
  order: 'dateDesc',
});

for (const fb of archived.data?.feedbacks ?? []) {
  console.log(`[${fb.id}] ${fb.productValuation}/5 - ${fb.text}`);
}
```

---

## Закреплённые отзывы

Закреплённые отзывы позволяют выделять положительную обратную связь на карточках товаров. Эта функция требует активной подписки Jam или тарифного плана. Пять методов управляют жизненным циклом закрепления.

### Проверка лимитов

`getPinnedFeedbacksLimits()` возвращает общий лимит, количество использованных, оставшихся слотов и лимиты на единицу для обоих способов закрепления — по подписке и по тарифу.

```typescript
const limits = await sdk.communications.getPinnedFeedbacksLimits();

if (limits.data.subscription) {
  const sub = limits.data.subscription;
  console.log(`Подписка: ${sub.used}/${sub.totalLimit} использовано, ${sub.remaining} осталось`);
  console.log(`  Лимит на единицу: ${sub.perUnitLimit}`);
  console.log(`  Безлимитно: ${sub.unlimited}`);
}

if (limits.data.tariff) {
  const tar = limits.data.tariff;
  console.log(`Тариф: ${tar.used}/${tar.totalLimit} использовано, ${tar.remaining} осталось`);
}
```

### Подсчёт закреплённых отзывов

`getPinnedFeedbacksCount(params)` возвращает количество закреплённых или откреплённых отзывов, соответствующих необязательным фильтрам.

```typescript
// Количество всех закреплённых отзывов
const pinned = await sdk.communications.getPinnedFeedbacksCount({ state: 'pinned' });
console.log(`Всего закреплено: ${pinned.data}`);

// Количество закреплённых на конкретной карточке товара
const forProduct = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned',
  pinOn: 'nm',
  nmId: 123456789,
});
console.log(`Закреплено на товаре: ${forProduct.data}`);

// Количество автоматически откреплённых отзывов
const unpinned = await sdk.communications.getPinnedFeedbacksCount({ state: 'unpinned' });
console.log(`Автоматически откреплено: ${unpinned.data}`);
```

### Список закреплённых отзывов

`getPinnedFeedbacks(params)` возвращает постраничный список закреплённых/откреплённых отзывов. Используйте курсор `next` из ответа для получения следующих страниц.

```typescript
const list = await sdk.communications.getPinnedFeedbacks({
  state: 'pinned',
  limit: 100,
});

for (const item of list.data) {
  console.log(`ID закрепления: ${item.pinId}`);
  console.log(`  Отзыв: ${item.feedbackId}`);
  console.log(`  Способ: ${item.pinMethod}`);
  console.log(`  Расположение: ${item.pinOn}`);
  console.log(`  nmId: ${item.nmId}, imtId: ${item.imtId}`);
  console.log(`  Изменение статуса: ${item.changeStateAt}`);
  if (item.unpinnedCause) {
    console.log(`  Причина открепления: ${item.unpinnedCause}`);
  }
}

// Получить следующую страницу
if (list.next) {
  const page2 = await sdk.communications.getPinnedFeedbacks({
    state: 'pinned',
    next: list.next,
    limit: 100,
  });
}
```

### Закрепление отзывов

`pinFeedback(data)` закрепляет массив отзывов (максимум 500 за запрос). Каждый элемент указывает способ закрепления (`'subscription'` или `'tariff'`), место закрепления (`'nm'` для карточки товара, `'imt'` для объединённой группы) и ID отзыва.

```typescript
const result = await sdk.communications.pinFeedback([
  {
    pinMethod: 'subscription',
    pinOn: 'nm',
    feedbackId: 'VlbkVVl7mtw37wyWkJZz',
  },
  {
    pinMethod: 'tariff',
    pinOn: 'imt',
    feedbackId: 'DibuRAImknLyiqgzvGcU',
  },
]);

for (const item of result.data) {
  if (item.isErrors) {
    console.error(`Не удалось закрепить ${item.feedbackId}:`, item.errors);
  } else {
    console.log(`Закреплён ${item.feedbackId} -> pinId: ${item.pinId}`);
  }
}
```

### Открепление отзывов

`unpinFeedback(data)` принимает массив ID закреплений (максимум 500), полученных из `getPinnedFeedbacks()`.

```typescript
const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned' });
const idsToRemove = pinned.data.slice(0, 3).map((item) => item.pinId);

const result = await sdk.communications.unpinFeedback(idsToRemove);
console.log(`Откреплённые ID: ${result.data.join(', ')}`);
```

---

## Чат с покупателями

Четыре метода охватывают взаимодействие через чат: список чатов, получение событий сообщений, отправка сообщения и скачивание файловых вложений.

### Список чатов

`getSellerChats()` возвращает все чаты продавца. Каждый чат содержит `replySign`, необходимый для отправки сообщений, и превью `lastMessage`.

```typescript
const chats = await sdk.communications.getSellerChats();

for (const chat of chats.result ?? []) {
  console.log(`Чат: ${chat.chatID}`);
  console.log(`  Покупатель: ${chat.clientName}`);
  console.log(`  Подпись ответа: ${chat.replySign}`);

  if (chat.lastMessage) {
    const sentAt = new Date(chat.lastMessage.addTimestamp!);
    console.log(`  Последнее сообщение: "${chat.lastMessage.text}" в ${sentAt.toISOString()}`);
  }

  if (chat.goodCard) {
    console.log(`  Товар nmId: ${chat.goodCard.nmID}, цена: ${chat.goodCard.price}`);
  }
}
```

### Получение событий и сообщений чата

`getSellerEvents(params)` возвращает постраничные события по всем чатам. Используйте курсор `next` из ответа для прохода по всем событиям. Событие с `totalEvents: 0` означает, что вы получили всё.

```typescript
let allEvents: typeof firstPage.result.events = [];
let cursor: number | undefined;

// Получаем первую страницу
const firstPage = await sdk.communications.getSellerEvents();
allEvents = firstPage.result?.events ?? [];
cursor = firstPage.result?.next;

// Продолжаем получать, пока есть события
while (cursor) {
  const page = await sdk.communications.getSellerEvents({ next: cursor });
  const events = page.result?.events ?? [];
  allEvents = allEvents.concat(events);
  cursor = page.result?.totalEvents === 0 ? undefined : page.result?.next;
}

console.log(`Всего получено событий: ${allEvents.length}`);

for (const event of allEvents) {
  console.log(`[${event.addTime}] ${event.sender}: ${event.message?.text}`);
  if (event.isNewChat) {
    console.log('  -- Начат новый чат');
  }
  if (event.message?.attachments?.files?.length) {
    for (const file of event.message.attachments.files) {
      console.log(`  Вложение: ${file.name} (${file.contentType}, ${file.size} байт)`);
    }
  }
}
```

### Отправка сообщения

`createSellerMessage()` отправляет сообщение в чат с покупателем. Содержимое сообщения передаётся через form data.

```typescript
const response = await sdk.communications.createSellerMessage();

if (response.errors?.length) {
  console.error('Ошибки сообщения:', response.errors);
} else {
  console.log(`Сообщение отправлено в чат ${response.result?.chatID} в ${response.result?.addTime}`);
}
```

### Скачивание файлового вложения

`getSellerDownload(id)` получает файл или изображение по его `downloadID`, который вы получаете из вложений событий чата.

```typescript
// Сначала получаем события, чтобы найти downloadID
const events = await sdk.communications.getSellerEvents();

for (const event of events.result?.events ?? []) {
  const files = event.message?.attachments?.files ?? [];
  for (const file of files) {
    if (file.downloadID) {
      const data = await sdk.communications.getSellerDownload(file.downloadID);
      console.log(`Скачан: ${file.name}`);
    }
  }

  const images = event.message?.attachments?.images ?? [];
  for (const img of images) {
    if (img.downloadID) {
      const data = await sdk.communications.getSellerDownload(img.downloadID);
      console.log(`Скачано изображение: ${img.downloadID}`);
    }
  }
}
```

---

## Возвраты

Два метода обрабатывают заявки на возврат от покупателей. Заявки доступны за последние 14 дней.

### Список заявок на возврат

`claims(params)` возвращает заявки, отфильтрованные по статусу архива, ID заявки, артикулу товара и параметрам пагинации.

| Параметр | Тип | Описание |
|-----------|------|-------------|
| `is_archive` | `boolean` | `false` для активных заявок, `true` для архивных |
| `id` | `string` | Фильтр по конкретному ID заявки |
| `limit` | `number` | Максимальное количество возвращаемых заявок |
| `offset` | `number` | Количество пропускаемых заявок |
| `nm_id` | `number` | Фильтр по артикулу товара |

```typescript
// Получить активные заявки на возврат
const activeClaims = await sdk.communications.claims({
  is_archive: false,
  limit: 50,
  offset: 0,
});

console.log('Активные заявки:', activeClaims);

// Фильтрация заявок по конкретному товару
const productClaims = await sdk.communications.claims({
  is_archive: false,
  nm_id: 123456789,
});

// Поиск конкретной заявки
const single = await sdk.communications.claims({
  is_archive: false,
  id: 'claim-uuid',
});
```

### Ответ на заявку

`updateClaim()` отправляет ответ на заявку покупателя о возврате.

```typescript
const result = await sdk.communications.updateClaim();
console.log('Ответ на заявку отправлен:', result);
```

---

## Практические сценарии

### Периодическая проверка новых вопросов и отзывов

Настройте периодическую проверку, которая обнаруживает непросмотренные вопросы или отзывы и запускает дальнейшую обработку.

```typescript
async function pollForNewContent(sdk: WildberriesSDK): Promise<void> {
  const status = await sdk.communications.newFeedbacksQuestions();

  if (status.data?.hasNewQuestions) {
    const counts = await sdk.communications.getQuestionsCountUnanswered();
    console.log(`Обнаружено ${counts.data?.countUnanswered} неотвеченных вопросов`);
    // Запустите ваш конвейер обработки вопросов здесь
  }

  if (status.data?.hasNewFeedbacks) {
    const counts = await sdk.communications.getFeedbacksCountUnanswered();
    console.log(`Обнаружено ${counts.data?.countUnanswered} необработанных отзывов`);
    // Запустите ваш конвейер обработки отзывов здесь
  }
}

// Опрос каждые 5 минут
const POLL_INTERVAL_MS = 5 * 60 * 1000;

setInterval(() => {
  pollForNewContent(sdk).catch((err) => {
    console.error('Ошибка опроса:', err.message);
  });
}, POLL_INTERVAL_MS);
```

### Массовый ответ на неотвеченные вопросы

Перебираем все неотвеченные вопросы, формируем ответ на основе категории товара и соблюдаем лимиты запросов, обрабатывая пакетами.

```typescript
async function answerAllQuestions(sdk: WildberriesSDK): Promise<void> {
  let skip = 0;
  const take = 100;
  let answered = 0;

  while (true) {
    const page = await sdk.communications.questions({
      isAnswered: false,
      take,
      skip,
      order: 'dateAsc', // сначала самые старые
    });

    const questions = page.data?.questions ?? [];
    if (questions.length === 0) break;

    for (const q of questions) {
      if (!q.id || !q.text) continue;

      // Формируем ответ на основе содержания вопроса
      const responseText = buildQuestionResponse(q.text, q.productDetails);

      await sdk.communications.updateQuestion({
        id: q.id,
        answer: { text: responseText },
        state: 'wbRu',
      });

      answered++;
    }

    skip += take;
  }

  console.log(`Отвечено на ${answered} вопросов`);
}

function buildQuestionResponse(
  questionText: string,
  product?: { productName?: string; brandName?: string }
): string {
  // Замените на вашу собственную логику шаблонов
  const name = product?.productName ?? 'данный товар';
  return `Спасибо за ваш вопрос о товаре «${name}». Наша команда рассмотрит детали и обновит этот ответ в ближайшее время.`;
}
```

### Обработка негативных отзывов

Обнаруживаем негативные отзывы, эскалируем их и закрепляем лучшие положительные отзывы на том же товаре для компенсации воздействия.

```typescript
async function handleNegativeReviews(sdk: WildberriesSDK): Promise<void> {
  const result = await sdk.communications.feedbacks({
    isAnswered: false,
    take: 100,
    skip: 0,
    order: 'dateDesc',
  });

  const feedbacks = result.data?.feedbacks ?? [];

  for (const fb of feedbacks) {
    const rating = fb.productValuation ?? 5;
    const nmId = fb.productDetails?.nmId;

    if (rating <= 2) {
      // Шаг 1: Отвечаем примирительным сообщением
      if (fb.id) {
        await sdk.communications.createFeedbacksAnswer({
          id: fb.id,
          text:
            'Приносим искренние извинения за неудобства. ' +
            'Наша команда контроля качества уведомлена и проведёт расследование. ' +
            'Пожалуйста, свяжитесь с нами через чат, чтобы мы могли решить этот вопрос.',
        });
      }

      // Шаг 2: Если доступен возврат, инициируем его проактивно
      if (fb.isAbleReturnProductOrders && fb.id) {
        await sdk.communications.createOrderReturn({ feedbackId: fb.id });
        console.log(`Возврат инициирован для отзыва ${fb.id}`);
      }

      // Шаг 3: Закрепляем лучший отзыв на том же товаре для компенсации
      if (nmId) {
        await pinBestReviewForProduct(sdk, nmId);
      }
    }
  }
}

async function pinBestReviewForProduct(
  sdk: WildberriesSDK,
  nmId: number
): Promise<void> {
  // Проверяем оставшиеся слоты для закрепления
  const limits = await sdk.communications.getPinnedFeedbacksLimits();
  const remaining = limits.data.subscription?.remaining ?? limits.data.tariff?.remaining ?? 0;

  if (remaining === 0) {
    console.log('Нет доступных слотов для закрепления');
    return;
  }

  // Уже закреплено на этом товаре?
  const existing = await sdk.communications.getPinnedFeedbacksCount({
    state: 'pinned',
    pinOn: 'nm',
    nmId,
  });

  if (existing.data >= (limits.data.subscription?.perUnitLimit ?? 3)) {
    console.log(`Товар ${nmId} уже достиг лимита закреплений`);
    return;
  }

  // Ищем отзыв на 5 звёзд с фотографиями
  const reviews = await sdk.communications.feedbacks({
    isAnswered: true,
    nmId,
    take: 50,
    skip: 0,
    order: 'dateDesc',
  });

  const candidate = (reviews.data?.feedbacks ?? []).find(
    (fb) => fb.productValuation === 5 && (fb.photoLinks?.length ?? 0) > 0
  );

  if (candidate?.id) {
    const pinResult = await sdk.communications.pinFeedback([
      {
        pinMethod: limits.data.subscription ? 'subscription' : 'tariff',
        pinOn: 'nm',
        feedbackId: candidate.id,
      },
    ]);

    const item = pinResult.data[0];
    if (item?.isErrors) {
      console.error(`Закрепление не удалось для ${candidate.id}:`, item.errors);
    } else {
      console.log(`Закреплён отзыв ${candidate.id} на товаре ${nmId}`);
    }
  }
}
```

### Интеграция событий чата в CRM

Непрерывная синхронизация событий чата из Wildberries во внешнюю систему с отслеживанием курсора пагинации.

```typescript
interface CRMEvent {
  chatId: string;
  timestamp: string;
  sender: string;
  text: string;
  attachments: string[];
  isNew: boolean;
}

async function syncChatEventsToCRM(sdk: WildberriesSDK): Promise<void> {
  const events = await sdk.communications.getSellerEvents();
  const items = events.result?.events ?? [];

  const crmEvents: CRMEvent[] = items.map((event) => ({
    chatId: event.chatID ?? '',
    timestamp: event.addTime ?? '',
    sender: event.sender ?? 'unknown',
    text: event.message?.text ?? '',
    attachments: [
      ...(event.message?.attachments?.files?.map((f) => f.name ?? '') ?? []),
      ...(event.message?.attachments?.images?.map((i) => i.downloadID ?? '') ?? []),
    ],
    isNew: event.isNewChat ?? false,
  }));

  // Отправляем в вашу CRM-систему
  for (const crmEvent of crmEvents) {
    await pushToCRM(crmEvent);
  }

  console.log(`Синхронизировано ${crmEvents.length} событий в CRM`);

  // Продолжаем пагинацию, если есть ещё события
  if (events.result?.next && events.result?.totalEvents !== 0) {
    await syncNextPage(sdk, events.result.next);
  }
}

async function syncNextPage(sdk: WildberriesSDK, cursor: number): Promise<void> {
  const page = await sdk.communications.getSellerEvents({ next: cursor });
  const items = page.result?.events ?? [];

  if (items.length === 0) return;

  for (const event of items) {
    await pushToCRM({
      chatId: event.chatID ?? '',
      timestamp: event.addTime ?? '',
      sender: event.sender ?? 'unknown',
      text: event.message?.text ?? '',
      attachments: [
        ...(event.message?.attachments?.files?.map((f) => f.name ?? '') ?? []),
        ...(event.message?.attachments?.images?.map((i) => i.downloadID ?? '') ?? []),
      ],
      isNew: event.isNewChat ?? false,
    });
  }

  if (page.result?.next && page.result?.totalEvents !== 0) {
    await syncNextPage(sdk, page.result.next);
  }
}

async function pushToCRM(event: CRMEvent): Promise<void> {
  // Замените на вашу реальную интеграцию с CRM
  console.log(`CRM <- [${event.chatId}] ${event.sender}: ${event.text}`);
}
```

---

## Связанные материалы

- [Справочник API модуля коммуникаций](/modules/communications) -- полные сигнатуры методов и определения типов
- [Лучшие практики](/guides/best-practices) -- общие паттерны использования SDK и обработка ошибок
- [Конфигурация](/guides/configuration) -- инициализация SDK, таймауты и настройки повторных попыток

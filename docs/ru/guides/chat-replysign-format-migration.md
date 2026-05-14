---
title: "Миграция формата replySign в чатах — v3.13.0"
description: Перейдите на новый формат replySign до дедлайна 2026-06-04 и исправьте ранее нерабочий метод createSellerMessage().
---

# Миграция формата `replySign` в чатах

**Аудитория**: Разработчики, использующие `sdk.communications.createSellerMessage()` или кэширующие значения `replySign` из `getSellerChats()` / `getSellerEvents()`.
**С версии**: SDK v3.13.0
**Жёсткий дедлайн**: 2026-06-04

---

## Почему это важно

14 мая 2026 года Wildberries анонсировал два связанных критических изменения:

1. **Обновление формата `replySign`** — поле `replySign`, возвращаемое в `GET /api/v1/seller/chats` и `GET /api/v1/seller/events` (при `isNewChat: true`), теперь использует новый структурированный формат. После **2026-06-04** метод `POST /api/v1/seller/message` будет отклонять запросы со значениями `replySign` старого формата с HTTP 400.

2. **Исправление критической ошибки SDK** — `sdk.communications.createSellerMessage()` ранее принимал **нулевое количество параметров** и всегда отправлял пустое тело (неработоспособно с момента появления). SDK v3.13.0 исправляет это, требуя обязательный параметр `data: SellerMessageRequest`.

Если ваш код вызывает `createSellerMessage()` сегодня — он никогда не работал. v3.13.0 — первая версия, в которой отправка сообщения в чате действительно возможна.

---

## Что нового в v3.13.0

### Исправление: сигнатура `createSellerMessage()`

```typescript
// ДО v3.13.0 (сломано — отправляло пустое тело, всегда возвращало ошибку от WB):
async createSellerMessage(): Promise<MessageResponse>

// ПОСЛЕ v3.13.0 (корректно — multipart/form-data с обязательным replySign):
async createSellerMessage(data: SellerMessageRequest): Promise<MessageResponse>
```

### Добавлен тип `SellerMessageRequest`

```typescript
import type { SellerMessageRequest } from 'daytona-wildberries-typescript-sdk';

interface SellerMessageRequest {
  replySign: string;          // обязательно — из getSellerChats()
  message?: string;           // опционально — не более 1000 символов
  file?: (Blob | { filename: string; content: Buffer })[];  // опционально — не более 30 МБ суммарно
}
```

---

## Изменение формата replySign

### Старый формат (отклоняется после 2026-06-04)

Значения старого формата были короче, не имели версионного префикса и не соответствовали структурированному шаблону. Пример: `abc123xyz` или любое значение, не соответствующее шаблону `<version>:<UUID>:<hex>`.

### Новый формат (обязателен)

```
1:1e265a58-a120-b178-008c-60af2460207c:66f136e919a8207e136757754f253189bfb9ae1ad9da9170c9d5c478626663908888c370216525bef51c0ca8d77952e05c9c17f9b63ab00374c5555b42efc07d
```

**Шаблон**: `<version>:<UUID>:<crypto-signature>`
- `version` — числовой префикс версии (сейчас `1`)
- `UUID` — идентификатор чата в стандартном формате UUID (`8-4-4-4-12` шестнадцатеричных групп)
- `crypto-signature` — шестнадцатеричная строка (~64+ символа)
- Общая длина: ~135 символов

**Регулярное выражение** (для валидации/обнаружения):

```typescript
const NEW_FORMAT_REGEX = /^\d+:[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}:[0-9a-f]+$/i;
```

---

## Шаги миграции

### Шаг 1: Обновите вызовы — передайте `data`

Любой TypeScript-код, вызывающий `createSellerMessage()` без аргументов, не будет компилироваться после обновления до v3.13.0. Обновите все места вызова:

```typescript
// ДО (ошибка компиляции в v3.13.0):
await sdk.communications.createSellerMessage();

// ПОСЛЕ:
const chats = await sdk.communications.getSellerChats();
const chat = chats.result?.[0];
if (!chat?.replySign) throw new Error('Нет активных чатов');

await sdk.communications.createSellerMessage({
  replySign: chat.replySign,
  message: 'Ваш заказ отправлен!',
});
```

### Шаг 2: Прекратите кэшировать `replySign` между сессиями

Если ваше приложение хранит значения `replySign` в базе данных или кэше (например, полученные до 2026-06-04), эти значения будут в старом формате и **будут отклонены WB после дедлайна**.

**Необходимые действия**: Всегда получайте свежее значение `replySign` через `getSellerChats()` непосредственно перед вызовом `createSellerMessage()`. Не кэшируйте `replySign` между отправками.

### Шаг 3: Работа с вложениями файлов (опционально)

```typescript
import { readFileSync } from 'fs';

const fileContent = readFileSync('./invoice.pdf');

await sdk.communications.createSellerMessage({
  replySign: chat.replySign,
  message: 'Ваш счёт во вложении.',
  file: [{ filename: 'invoice.pdf', content: fileContent }],
});
```

Ограничения:
- Каждый файл: ≤ 5 МБ
- Все файлы суммарно: ≤ 30 МБ
- Форматы: JPEG, PDF, PNG (проверяются на стороне WB)

---

## Полный рабочий пример отправки сообщения

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function ответитьВсемЧатам(текстСообщения: string): Promise<void> {
  // 1. Получаем все чаты — значения replySign всегда актуальны
  const chatsResponse = await sdk.communications.getSellerChats();
  const chats = chatsResponse.result ?? [];

  if (chats.length === 0) {
    console.log('Нет активных чатов');
    return;
  }

  // 2. Отправляем сообщение в каждый чат
  for (const chat of chats) {
    if (!chat.replySign || !chat.chatID) continue;

    try {
      await sdk.communications.createSellerMessage({
        replySign: chat.replySign,
        message: текстСообщения,
      });
      console.log(`Отправлено в чат ${chat.chatID}`);
    } catch (error) {
      console.error(`Ошибка для чата ${chat.chatID}:`, error);
    }
  }
}

// Использование
await ответитьВсемЧатам('Спасибо за ваше сообщение! Мы ответим в ближайшее время.');
```

---

## Эвристическое определение и поведение warn-once

SDK v3.13.0 содержит эвристику, которая определяет вероятные значения `replySign` старого формата во время выполнения:

- Если переданный `replySign` **не соответствует** регулярному выражению нового формата, SDK вызывает `console.warn` один раз за время жизни процесса.
- Запрос всё равно отправляется в WB — эвристика носит информационный характер.
- После 2026-06-04 WB будет отклонять значения старого формата с HTTP 400 независимо от этого.

**Пример предупреждения**:
```
communications.createSellerMessage: `replySign` does not match the expected new-format pattern
(version:UUID:signature). WB API rejects old-format `replySign` after 2026-06-04.
Refresh via `getSellerChats()` to get current-format values.
See docs/guides/chat-replysign-format-migration.md.
```

Чтобы подавить предупреждение в тестах, вызывайте `resetDeprecationWarnings()` в `beforeEach`:

```typescript
import { resetDeprecationWarnings } from 'daytona-wildberries-typescript-sdk';

beforeEach(() => {
  resetDeprecationWarnings();
});
```

---

## FAQ

**В: Что делать, если у меня есть значения `replySign`, кэшированные в базе данных?**

О: Удалите их. Получайте свежие значения через `getSellerChats()` перед каждым вызовом `createSellerMessage()`. WB не предоставляет endpoint для массовой миграции — необходимо повторно запрашивать данные по каждому чату.

**В: Будет ли SDK автоматически повторять запрос со свежим `replySign`, если WB отклонит старый?**

О: Нет. Авто-обновление и повторная попытка потребовали бы внутреннего вызова `getSellerChats()`, что могло бы привести к нежелательным побочным эффектам. SDK чётко сигнализирует об ошибке (HTTP 400 от WB → `ValidationError`), чтобы вы могли реализовать логику повторных попыток самостоятельно.

**В: Можно ли использовать `replySign` старого формата до 2026-06-04?**

О: Да — WB принимает значения старого формата до дедлайна. Эвристика warn-once в SDK носит информационный характер и не блокирует запрос. Тем не менее WB может вводить изменения постепенно, поэтому рекомендуется перейти заблаговременно.

**В: `getSellerEvents()` тоже возвращает `replySign`?**

О: Да, но только когда `Event.isNewChat` равно `true`. Значение `replySign` в объектах событий следует тому же новому формату. Если вы используете `replySign` из событий, они уже будут в новом формате после обновления WB. Предпочтительнее использовать `getSellerChats()`, который всегда возвращает наиболее актуальные значения независимо от `isNewChat`.

**В: Что произойдёт, если вызвать `createSellerMessage()` без аргумента `data` после v3.13.0?**

О: TypeScript-пользователи получат ошибку компиляции. JavaScript-пользователи получат `ValidationError` во время выполнения: `replySign is required (string, non-empty)`.

---

## Замечание о формате

Значение `replySign` — это одна строковая поле без вариантов регистра между ответами API и телом запроса. То же значение, которое возвращается в `Chat.replySign` методом `getSellerChats()`, передаётся без изменений в `createSellerMessage()` в поле `data.replySign`. Преобразование не требуется.

---

## Дополнительные ресурсы

- Объявление WB API: https://dev.wildberries.ru/release-notes (14 мая 2026)
- Справочник WB API: https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami
- SDK CHANGELOG v3.13.0: [CHANGELOG.md](../../../CHANGELOG.md)
- Документация метода `getSellerChats()`: `sdk.communications.getSellerChats()`
- Документация метода `createSellerMessage()`: `sdk.communications.createSellerMessage(data)`
- Тип `SellerMessageRequest`: `import type { SellerMessageRequest } from 'daytona-wildberries-typescript-sdk'`

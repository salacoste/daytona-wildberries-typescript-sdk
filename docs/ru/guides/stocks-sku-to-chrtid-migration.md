---
title: "Миграция управления остатками: sku → chrtId"
description: Переход с устаревших параметров sku/skus на chrtId/chrtIds для трёх эндпоинтов управления остатками до жёсткого дедлайна 2026-05-20 13:00 МСК.
---

# Миграция управления остатками: `sku` → `chrtId`

**Аудитория**: разработчики, вызывающие `sdk.products.getStocks()`, `sdk.products.updateStock()` или `sdk.products.deleteStock()`.
**Начиная с**: SDK v3.12.0
**Жёсткий дедлайн**: 2026-05-20 13:00 МСК

## Почему это важно

8 мая 2026 года Wildberries [объявил](https://dev.wildberries.ru/release-notes?id=522) об отказе от параметра `sku` (штрихкод) на трёх эндпоинтах управления остатками в пользу `chrtId` (идентификатор размера из Content API).

**Жёсткий дедлайн: 2026-05-20 13:00 МСК.**

После этой даты Wildberries начинает поэтапное отключение: изначально эндпоинты будут недоступны **10 минут в час**, при этом окно недоступности будет ежедневно расширяться — вплоть до полного отклонения запросов, содержащих `sku`/`skus`, с кодом HTTP 400 и полем `code` в теле ответа.

Никакого льготного периода нет. Код, всё ещё передающий `skus` или `sku` на уровне позиций 21 мая 2026 года, будет тихо падать в проде на нарастающей доле запросов, а затем отказывать полностью.

SDK v3.12.0 включает полную поддержку миграции:

- Параметры `chrtId`/`chrtIds` добавлены во все три метода.
- Устаревшие поля `sku`/`skus` помечены тегом `@deprecated` в JSDoc.
- Предупреждения `warnOnce()` при первом вызове за время жизни процесса.
- Это руководство.

## Что устаревает

Следующие параметры устарели начиная с v3.12.0 и будут отклоняться WB после 2026-05-20:

| Метод | Устаревший параметр | Замена |
|-------|---------------------|--------|
| `sdk.products.getStocks(warehouseId, { skus: [...] })` | `skus: string[]` | `chrtIds: number[]` |
| `sdk.products.updateStock(warehouseId, { stocks: [{ sku, amount }] })` | `sku: string` на позицию | `chrtId: number` на позицию |
| `sdk.products.deleteStock(warehouseId, { skus: [...] })` | `skus: string[]` | `chrtIds: number[]` |

Все три метода сохраняют обратную совместимость до дедлайна WB. Устаревшие вызовы компилируются без ошибок, но при первом вызове выдают однократное `console.warn` (см. [Смешанный режим](#смешанный-режим)).

## Как получить `chrtId`

`chrtId` — это **идентификатор размера**, который Wildberries присваивает при создании карточки товара. Он хранится в поле `chrtID` каждой записи массива `sizes[]`, возвращаемого методом `sdk.products.getCardsList()`.

> **Примечание о регистре** (подробнее [ниже](#примечание-о-регистре-chrtid-vs-chrtid)): в ответе Content API используется `chrtID` (заглавная D); в теле запроса к эндпоинту остатков — `chrtId` (строчная d). Числовое значение одинаковое — отличается только регистр символа в имени поля.

### Построение таблицы соответствия `sku → chrtId`

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получаем карточки товаров (при необходимости используйте пагинацию)
const cardsResult = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 },
  },
});

// Строим таблицу соответствия sku (штрихкод) → chrtId
const skuToChrtId = new Map<string, number>();

for (const card of cardsResult.cards ?? []) {
  for (const size of card.sizes ?? []) {
    // Поле Content API: chrtID (заглавная D)
    const chrtId = size.chrtID; // number | undefined
    for (const sku of size.skus ?? []) {
      if (chrtId !== undefined) {
        skuToChrtId.set(sku, chrtId);
      }
    }
  }
}

// Пример: поиск штрихкода, хранящегося в вашей базе
const myBarcode = '1234567890123';
const chrtId = skuToChrtId.get(myBarcode);
console.log(`chrtId для ${myBarcode}:`, chrtId); // например 12345678
```

Обновляйте эту таблицу периодически (например, раз в ночь) или при каждом изменении карточек, чтобы ваша локальная база данных оставалась синхронизированной с WB.

## Шаги миграции

1. **Проверьте места вызова `getStocks`** — найдите в коде все вхождения `sdk.products.getStocks` и замените аргумент `skus: string[]` на `chrtIds: number[]`.

2. **Проверьте места вызова `updateStock`** — найдите `sdk.products.updateStock` и замените `{ sku: '...', amount }` на уровне каждой позиции на `{ chrtId: 12345678, amount }`.

3. **Проверьте места вызова `deleteStock`** — найдите `sdk.products.deleteStock` и замените аргумент `skus: string[]` на `chrtIds: number[]`.

4. **Создайте или обновите таблицу соответствия `sku → chrtId`** — используйте `sdk.products.getCardsList()` (см. [Как получить `chrtId`](#как-получить-chrtid)) и сохраните таблицу в базе данных или in-memory кэше. Настройте периодическое обновление.

5. **Запустите тестовый набор** — существующие тесты, использующие устаревшие поля, выдадут однократные `console.warn`; воспринимайте каждое предупреждение как задачу на миграцию. Новые тесты должны проходить без предупреждений.

> **Выпустите обновление до 2026-05-20 13:00 МСК.** Поэтапное отключение начинается сразу после дедлайна.

## Примеры кода

### `getStocks`

**До (устаревший вариант):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ Устарело: передаёт skus (строки штрихкодов)
const result = await sdk.products.getStocks(12345, {
  skus: ['1234567890123', '1234567890124'],
});
console.log(result.stocks);
```

**После (v3.12.0+):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Рекомендуется: передаёт chrtIds (числа — идентификаторы размеров)
const result = await sdk.products.getStocks(12345, {
  chrtIds: [12345678, 12345679],
});
console.log(result.stocks); // [{ chrtId: 12345678, amount: 50 }, ...]
```

---

### `updateStock`

**До (устаревший вариант):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ Устарело: поле sku на уровне позиции
await sdk.products.updateStock(12345, {
  stocks: [
    { sku: '1234567890123', amount: 50 },
    { sku: '1234567890124', amount: 20 },
  ],
});
```

**После (v3.12.0+):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Рекомендуется: поле chrtId на уровне позиции
await sdk.products.updateStock(12345, {
  stocks: [
    { chrtId: 12345678, amount: 50 },
    { chrtId: 12345679, amount: 20 },
  ],
});
```

---

### `deleteStock`

**До (устаревший вариант):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ Устарело: передаёт skus (строки штрихкодов)
await sdk.products.deleteStock(12345, {
  skus: ['1234567890123', '1234567890124'],
});
```

**После (v3.12.0+):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Рекомендуется: передаёт chrtIds (числа — идентификаторы размеров)
await sdk.products.deleteStock(12345, {
  chrtIds: [12345678, 12345679],
});
```

## Смешанный режим

Если вы одновременно передаёте и устаревшее поле, и его замену, SDK удаляет устаревшее поле перед отправкой запроса в WB и один раз за время жизни процесса выдаёт `console.warn`.

Точные тексты предупреждений, выдаваемых `warnOnce()` в `src/modules/products/index.ts`:

**`getStocks` / `deleteStock` — смешанные `skus` + `chrtIds`:**

```
products.getStocks: both `skus` and `chrtIds` provided. The SDK is sending ONLY `chrtIds`
to WB (`skus` will be stripped); WB API will reject `skus` after 2026-05-20 13:00 MSK with
HTTP 400. Remove `skus` from your request to avoid this warning.
See docs/guides/stocks-sku-to-chrtid-migration.md.
```

**`updateStock` — смешанные `sku` + `chrtId` в одной позиции:**

```
products.updateStock: some items have BOTH `sku` and `chrtId`. The SDK is sending ONLY
`chrtId` per item to WB (`sku` will be stripped from those items); WB API will reject `sku`
after 2026-05-20 13:00 MSK with HTTP 400. Remove `sku` from items that already have `chrtId`
to avoid this warning. See docs/guides/stocks-sku-to-chrtid-migration.md.
```

### Что делать не нужно

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ⚠️ Смешанный режим: SDK удалит `skus`, отправит только `chrtIds`, один раз выдаст console.warn
const result = await sdk.products.getStocks(12345, {
  skus: ['1234567890123'],   // ← будет удалено
  chrtIds: [12345678],       // ← именно это получит WB
});
// console.warn сработает при этом вызове (один раз за время жизни процесса)
// Исправление: удалите `skus` полностью
```

Семантика «один раз за время жизни процесса» означает: предупреждение выдаётся при **первом** вызове в данном процессе Node.js и подавляется при последующих вызовах. При перезапуске сервера счётчик сбрасывается. Воспринимайте предупреждения как сигнал к поиску и исправлению мест вызова, а не как постоянный монитор состояния.

**Граничный случай — `chrtIds: []` (пустой массив):** Пустой массив `chrtIds: []` воспринимается как сигнал о миграции в процессе. Если рядом есть `skus` и пустой `chrtIds`, SDK удалит пустой массив, выдаст предупреждение об устаревшем вызове и перешлёт запрос с `skus`. Удалите `chrtIds: []` из кода — он не нужен, как только у вас появятся реальные значения `chrtId`.

## Примечание о регистре: `chrtID` vs `chrtId`

Это наиболее частый источник путаницы при миграции:

| Контекст | Имя поля | Тип |
|----------|----------|-----|
| Ответ WB Content API (`getCardsList`) | `size.chrtID` | `number \| undefined` |
| Тело запроса к эндпоинту остатков WB (`getStocks`, `updateStock`, `deleteStock`) | `chrtId` / `chrtIds` | `number` / `number[]` |

Числовое значение одинаковое, имена полей отличаются регистром символа. `D` заглавная в ответах Content API и строчная в запросах к эндпоинтам остатков.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const cardsResult = await sdk.products.getCardsList({
  settings: { cursor: { limit: 10 }, filter: { withPhoto: -1 } },
});

const card = cardsResult.cards?.[0];
const size = card?.sizes?.[0];

// Content API: chrtID (заглавная D)
const chrtIdFromContent: number | undefined = size?.chrtID;

// Передаём то же числовое значение в эндпоинт остатков как chrtId (строчная d)
if (chrtIdFromContent !== undefined) {
  const stockResult = await sdk.products.getStocks(12345, {
    chrtIds: [chrtIdFromContent], // ← строчная d здесь
  });
  console.log(stockResult.stocks);
}
```

TypeScript в строгом режиме обнаружит ошибки регистра на этапе компиляции — `size.chrtId` (строчная) вызовет ошибку компилятора, поскольку поле на типе `CardSize` называется `chrtID`.

## Часто задаваемые вопросы

**В: Что делать, если я храню SKU в базе данных вместо `chrtId`?**

Поддерживайте в базе данных таблицу соответствия `sku → chrtId` и периодически обновляйте её с помощью `getCardsList()`. Ночного обновления обычно достаточно для стабильных каталогов; при частом создании или снятии товаров обновляйте чаще. Пример построения таблицы за один проход приведён в разделе [Как получить `chrtId`](#как-получить-chrtid).

**В: SDK автоматически конвертирует SKU в `chrtId`?**

Нет — и это сделано намеренно. Конвертация штрихкода в `chrtId` требует вызова `getCardsList()`, то есть отдельного сетевого запроса. Автоматическая конвертация скрытно удвоила бы трафик API при каждой операции с остатками. SDK предоставляет инструменты для построения таблицы соответствия; стратегия кэширования — ваша ответственность.

**В: Можно ли передавать `sku` до дедлайна 2026-05-20?**

Да. SDK принимает устаревшие поля и перенаправляет их в WB до дедлайна. Предупреждение `warnOnce()` срабатывает один раз за время жизни процесса — не при каждом запросе — поэтому журналы не будут переполнены. Тем не менее мигрируйте заранее: исправлять код в режиме авральной подготовки прямо перед дедлайном — это риск для надёжности. Дедлайн — это жёсткое отсечение: никаких продлений после начала отключений.

**В: Что произойдёт после дедлайна — SDK выбросит исключение автоматически?**

Нет. SDK передаёт запрос в WB как есть (удаляя устаревшие поля в смешанном режиме). WB вернёт HTTP 400 с полем `code`. SDK представит это как `WBAPIError` с `statusCode: 400`. Ваша существующая обработка ошибок для ответов 400 поймает его — но вы увидите ошибки в боевой среде.

**В: Где найти запись в журнале изменений v3.12.0?**

См. [CHANGELOG.md — \[3.12.0\]](/CHANGELOG#3120---2026-05-14).

**В: SDK тихо удаляет `sku` в смешанном режиме?**

Нет. Выдаётся `console.warn` через `warnOnce()` (один раз на метод за время жизни процесса) и устаревшее поле удаляется перед отправкой. В тексте предупреждения указан метод, что было удалено, дедлайн и ссылка на это руководство.

## Связанные ресурсы

- [CHANGELOG.md — \[3.12.0\]](/CHANGELOG#3120---2026-05-14) — полные примечания к релизу v3.12.0
- [WB release-notes id=522](https://dev.wildberries.ru/release-notes?id=522) — официальное объявление WB (2026-05-08)
- Исходный код SDK — реализация методов работы с остатками: [`src/modules/products/index.ts`](../../../src/modules/products/index.ts)
- Исходный код SDK — типы остатков (`StockItem`, `StocksRequest`, `UpdateStockRequest`, `GetStocksResponse`): [`src/types/products.types.ts`](../../../src/types/products.types.ts)
- [Руководство по обязательным характеристикам товаров](./mandatory-product-characteristics.md) — ещё один пример миграции с жёстким дедлайном (паттерн Sprint 15.8)

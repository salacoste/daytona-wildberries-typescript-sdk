# Руководство по миграции: v2.2 → v2.3

Это руководство поможет вам перейти с версии SDK 2.2.x на версию 2.3.0. Этот релиз фокусируется на **улучшении типобезопасности** и **соответствии контракту API** для модуля Promotion.

## Обзор

Версия 2.3.0 включает:

- **18 критических изменений** в сигнатурах методов (опциональные → обязательные параметры)
- **3 новых типизированных ответа** для методов Calendar API
- **35 исправлений JSDoc** для примеров кода
- **Улучшенный опыт разработки на TypeScript**

::: danger Критические изменения
Этот релиз содержит критические изменения, которые могут вызвать ошибки компиляции TypeScript в существующем коде. Внимательно прочитайте это руководство перед обновлением.
:::

## Быстрая миграция

### Шаг 1: Обновите пакет

```bash
npm update daytona-wildberries-typescript-sdk
# или
yarn upgrade daytona-wildberries-typescript-sdk
```

### Шаг 2: Исправьте ошибки компиляции

После обновления запустите компиляцию TypeScript:

```bash
npm run type-check
```

Исправьте все ошибки, добавив обязательные параметры (см. [Затронутые методы](#затронутые-методы) ниже).

### Шаг 3: Проверьте тесты

```bash
npm test
```

## Что изменилось

### Обязательные параметры (18 методов)

В v2.2.x многие методы модуля Promotion имели **опциональные параметры**, которые на самом деле были **обязательными в WB API**. Это приводило к:

- Коду, который компилировался, но падал во время выполнения
- Отсутствию ошибок TypeScript для пропущенных обязательных параметров
- Ошибкам 400 от API Wildberries во время выполнения

**v2.3.0 исправляет это**, делая эти параметры обязательными на уровне TypeScript.

### До и После

```typescript
// ❌ v2.2.x - Компилировалось без ошибки, но API возвращал 400
await sdk.promotion.getAdvBudget();
await sdk.promotion.getAdvStart();
await sdk.promotion.getCalendarPromotions({ allPromo: true });

// ✅ v2.3.0 - TypeScript ловит ошибку на этапе компиляции
await sdk.promotion.getAdvBudget({ id: 12345 });
await sdk.promotion.getAdvStart({ id: 12345 });
await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01T00:00:00Z',
  endDateTime: '2024-12-31T23:59:59Z',
  allPromo: true
});
```

## Затронутые методы

### Методы управления кампаниями

| Метод | v2.2.x | v2.3.0 |
|-------|--------|--------|
| `getAdvStart()` | `options?: { id: number }` | `options: { id: number }` |
| `getAdvPause()` | `options?: { id: number }` | `options: { id: number }` |
| `getAdvStop()` | `options?: { id: number }` | `options: { id: number }` |
| `getAdvDelete()` | `options?: { id: number }` | `options: { id: number }` |

**Миграция:**
```typescript
// До
await sdk.promotion.getAdvStart();  // Неправильно - но компилировалось

// После
await sdk.promotion.getAdvStart({ id: campaignId });  // Правильно
```

### Методы бюджета

| Метод | v2.2.x | v2.3.0 |
|-------|--------|--------|
| `getAdvBudget()` | `options?: { id: number }` | `options: { id: number }` |
| `createBudgetDeposit()` | `options?: { id: number }` | `options: { id: number }` |

**Миграция:**
```typescript
// До
const budget = await sdk.promotion.getAdvBudget();

// После
const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
```

### Методы ключевых фраз

| Метод | v2.2.x | v2.3.0 |
|-------|--------|--------|
| `getSearchSetPlus()` | `options?: { id; fixed? }` | `options: { id; fixed? }` |
| `createSearchSetPlu()` | `options?: { id }` | `options: { id }` |
| `createSearchSetExcluded()` | `options?: { id }` | `options: { id }` |
| `createAutoSetExcluded()` | `options?: { id }` | `options: { id }` |

**Миграция:**
```typescript
// До
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['дёшево', 'скидка'] }
);

// После
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['дёшево', 'скидка'] },
  { id: campaignId }  // Обязательно
);
```

### Методы управления товарами

| Метод | v2.2.x | v2.3.0 |
|-------|--------|--------|
| `getAutoGetnmtoadd()` | `options?: { id }` | `options: { id }` |
| `createAutoUpdatenm()` | `options?: { id }` | `options: { id }` |

### Другие методы

| Метод | v2.2.x | v2.3.0 |
|-------|--------|--------|
| `getAdvUpd()` | `options?: { from; to }` | `options: { from; to }` |
| `createAdvRename()` | `data?: { advertId; name }` | `data: { advertId; name }` |

**Миграция:**
```typescript
// До
await sdk.promotion.getAdvUpd();  // Пропущены обязательные даты

// После
await sdk.promotion.getAdvUpd({
  from: '2024-01-01',
  to: '2024-12-31'
});
```

### Методы Calendar API

| Метод | v2.2.x | v2.3.0 |
|-------|--------|--------|
| `getCalendarPromotions()` | `options?: { ... }` | `options: { startDateTime; endDateTime; allPromo; limit?; offset? }` |
| `getPromotionsDetails()` | `options?: { promotionIDs }` | `options: { promotionIDs }` |
| `getPromotionsNomenclatures()` | `options?: { ... }` | `options: { promotionID; inAction; limit?; offset? }` |

**Миграция:**
```typescript
// До
const promos = await sdk.promotion.getCalendarPromotions({ allPromo: true });

// После
const promos = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01T00:00:00Z',  // Обязательно
  endDateTime: '2024-12-31T23:59:59Z',     // Обязательно
  allPromo: true                            // Обязательно
});
```

## Новые возможности в v2.3.0

### Типизированные ответы Calendar API

Методы Calendar API теперь возвращают правильно типизированные ответы вместо `Promise<unknown>`:

```typescript
// v2.2.x - Нет автодополнения, тип unknown
const promos = await sdk.promotion.getCalendarPromotions({...});
// promos: unknown

// v2.3.0 - Полная поддержка TypeScript
const promos = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01T00:00:00Z',
  endDateTime: '2024-12-31T23:59:59Z',
  allPromo: true
});

// Теперь с полным автодополнением!
promos.data?.promotions?.forEach(promo => {
  console.log(promo.name);          // ✅ TypeScript знает о .name
  console.log(promo.type);          // ✅ TypeScript знает о .type
  console.log(promo.startDateTime); // ✅ TypeScript знает о .startDateTime
});
```

### Определения типов ответов

```typescript
// Ответ getCalendarPromotions()
interface CalendarPromotionsResponse {
  data?: {
    promotions?: Array<{
      id?: number;
      name?: string;
      type?: string;           // 'regular' | 'auto' | 'express'
      startDateTime?: string;  // ISO 8601
      endDateTime?: string;    // ISO 8601
    }>;
  };
}

// Ответ getPromotionsDetails()
interface PromotionsDetailsResponse {
  data?: {
    promotions?: Array<{
      id?: number;
      name?: string;
      description?: string;
      startDateTime?: string;
      endDateTime?: string;
      inPromoActionLeftovers?: number;     // Товары в акции с остатками
      inPromoActionTotal?: number;          // Всего товаров в акции
      notInPromoActionLeftovers?: number;   // Товары не в акции с остатками
      notInPromoActionTotal?: number;       // Всего товаров не в акции
    }>;
  };
}

// Ответ getPromotionsNomenclatures()
interface PromotionsNomenclaturesResponse {
  data?: {
    nomenclatures?: Array<{
      nmID?: number;
      vendorCode?: string;
      inAction?: boolean;
    }>;
  };
}
```

### Исправленные примеры JSDoc

Все 35 методов модуля Promotion теперь имеют правильные примеры JSDoc с использованием `sdk.promotion.*` вместо неправильного `sdk.general.*`:

```typescript
// v2.2.x (неправильно)
/**
 * @example
 * const result = await sdk.general.getPromotionCount();  // Неверное пространство имён
 */

// v2.3.0 (правильно)
/**
 * @example
 * const result = await sdk.promotion.getPromotionCount();  // Правильное пространство имён
 */
```

## Полный чек-лист миграции

Используйте этот чек-лист для проверки полноты миграции:

### Обновления обязательных параметров

- [ ] `getAdvStart()` - Добавьте параметр `{ id }`
- [ ] `getAdvPause()` - Добавьте параметр `{ id }`
- [ ] `getAdvStop()` - Добавьте параметр `{ id }`
- [ ] `getAdvDelete()` - Добавьте параметр `{ id }`
- [ ] `getAdvBudget()` - Добавьте параметр `{ id }`
- [ ] `createBudgetDeposit()` - Добавьте параметр `{ id }`
- [ ] `getSearchSetPlus()` - Добавьте параметр `{ id }`
- [ ] `createSearchSetPlu()` - Добавьте параметр `{ id }`
- [ ] `createSearchSetExcluded()` - Добавьте параметр `{ id }`
- [ ] `createAutoSetExcluded()` - Добавьте параметр `{ id }`
- [ ] `getAutoGetnmtoadd()` - Добавьте параметр `{ id }`
- [ ] `createAutoUpdatenm()` - Добавьте параметр `{ id }`
- [ ] `getAdvUpd()` - Добавьте параметры `{ from, to }`
- [ ] `createAdvRename()` - Убедитесь, что передаётся `{ advertId, name }`
- [ ] `getCalendarPromotions()` - Добавьте параметры `{ startDateTime, endDateTime, allPromo }`
- [ ] `getPromotionsDetails()` - Добавьте параметр `{ promotionIDs }`
- [ ] `getPromotionsNomenclatures()` - Добавьте параметры `{ promotionID, inAction }`

### Шаги проверки

- [ ] Запустите `npm run type-check` - Нет ошибок TypeScript
- [ ] Запустите `npm test` - Все тесты проходят
- [ ] Протестируйте методы модуля Promotion в среде разработки
- [ ] Проверьте, что ответы Calendar API правильно типизированы

## FAQ

### Почему были сделаны эти изменения?

WB API требует эти параметры - они никогда не были опциональными. SDK v2.2.x неправильно помечал их как опциональные, что означало:
- TypeScript не ловил пропущенные параметры
- Код компилировался, но падал во время выполнения с ошибками 400
- Опыт разработки был плохим (нет предупреждений IDE)

### Сломает ли это мой продакшн-код?

Если ваш код работал раньше, он уже передавал обязательные параметры. Это изменение сломает только код, который:
- Вызывал методы без обязательных параметров (что всё равно падало бы во время выполнения)
- Использовал строгий режим TypeScript и полагался на опциональные параметры

### Могу ли я остаться на v2.2.x?

Да, но вы упустите:
- Типизированные ответы Calendar API
- Лучшие сообщения об ошибках TypeScript
- Правильные примеры JSDoc

### Что делать, если я найду баг?

Пожалуйста, сообщайте о проблемах: https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues

## История версий

| Версия | Дата | Изменения |
|--------|------|-----------|
| **2.3.0** | Дек 2024 | Критические: 18 обязательных параметров, типы Calendar API, исправления JSDoc |
| 2.2.2 | Дек 2024 | Исправлены обязательные параметры `getStatsKeywords()` |
| 2.2.1 | Дек 2024 | Исправлен URL `getStatsKeywords()` |
| 2.2.0 | Дек 2024 | Добавлено комплексное тестирование модуля Promotion |

## См. также

- [Руководство по рекламе](/ru/guides/promotion-advertising) - Полная документация модуля
- [Справочник API Promotion](/api/promotion-api-reference) - Полный справочник API
- [Story 9.9: Исправления параметров SDK](/docs/stories/9.9.promotion-sdk-type-fixes.md) - Технические детали
- [Устранение неполадок](/ru/guides/troubleshooting) - Типичные проблемы и решения

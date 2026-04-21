---
title: Обязательные характеристики товаров
description: Руководство по изменению WB API — обязательные характеристики при создании карточек товаров (вступает в силу 29 апреля 2026)
---

# Обязательные характеристики товаров

С **29 апреля 2026 года** Wildberries требует указание обязательных характеристик для карточек товаров в определённых категориях. Карточки, созданные без этих характеристик, будут отклонены API.

## Что изменилось

Эндпоинт `GET /content/v2/object/charcs/{subjectId}` теперь возвращает булево поле `isRequiredForCreate`. Если значение `true`, характеристика **обязательна** при создании и обновлении карточки.

В SDK добавлен интерфейс `SubjectCharacteristic` (v3.9.0) с полной типизацией для этого поля.

## Затронутые категории

| Категория | subjectId | English Name |
|-----------|-----------|--------------|
| Флешки памяти | 1260 | Flash Drives |
| Фитнес-браслеты | 1514 | Fitness Bracelets |
| Выпрямители волос | 2314 | Hair Straighteners |
| Блендеры | 614 | Blenders |
| Неттопы и Мини ПК | 8992 | Nettops & Mini PCs |
| Фоторамки | 28 | Photo Frames |
| Калькуляторы | 977 | Calculators |
| Крышки | 819 | Lids |
| Наволочки | 605 | Pillowcases |
| Салфетки для уборки | 1202 | Cleaning Wipes |

::: tip
Этот список может расширяться. Всегда проверяйте `isRequiredForCreate` для вашей категории перед созданием карточек.
:::

## Проверка обязательных характеристик

Используйте `getObjectCharc()` для получения характеристик категории и фильтрации по `isRequiredForCreate`:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { SubjectCharacteristic } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Получаем характеристики для категории «Флешки памяти» (subjectId: 1260)
const result = await sdk.products.getObjectCharc(1260);

// Фильтруем обязательные характеристики
const mandatory: SubjectCharacteristic[] = (result.data ?? []).filter(
  (c) => c.isRequiredForCreate === true
);

console.log(`Найдено ${mandatory.length} обязательных характеристик:`);
for (const c of mandatory) {
  console.log(`  - ${c.name} (ID: ${c.charcID}, тип: ${c.charcType})`);
}
```

## Создание карточек с обязательными характеристиками

После определения обязательных характеристик, включите их в запрос на создание карточки:

```typescript
import type { CardCharacteristicInput } from 'daytona-wildberries-typescript-sdk';

// 1. Получаем обязательные характеристики категории
const charcsResult = await sdk.products.getObjectCharc(1260);
const mandatory = (charcsResult.data ?? []).filter(
  (c) => c.isRequiredForCreate === true
);

// 2. Формируем массив характеристик с обязательными значениями
const characteristics: CardCharacteristicInput[] = mandatory.map((c) => ({
  id: c.charcID!,
  value: getValueForCharacteristic(c), // Ваша бизнес-логика
}));

// 3. Создаём карточку товара
const response = await sdk.products.createCardsUpload([{
  subjectID: 1260,
  variants: [{
    vendorCode: 'FLASH-USB-64GB',
    title: 'USB-флешка 64ГБ',
    characteristics,
    sizes: [{ techSize: 'one-size', wbSize: '', skus: ['1234567890123'] }],
  }],
}]);

console.log('Карточка создана:', response);

// Хелпер: определяем значение на основе типа характеристики
function getValueForCharacteristic(c: SubjectCharacteristic): string | number | string[] {
  // Ваша логика определения значения на основе типа и данных товара
  switch (c.charcType) {
    case 0: return 'текстовое значение';  // Строка
    case 1: return 64;                     // Число (например, объём памяти в ГБ)
    case 4: return ['значение1', 'значение2']; // Массив
    default: return '';
  }
}
```

## Обработка ошибок

Если обязательная характеристика не указана, WB API отклонит запрос. Обработайте это в потоке ошибок:

```typescript
import { ValidationError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.products.createCardsUpload([{ /* ... */ }]);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Карточка отклонена — вероятно, отсутствуют обязательные характеристики');
    console.error('Детали:', error.message);
    // Перезагрузите обязательные характеристики и проверьте, что пропущено
  }
  throw error;
}
```

## Чек-лист миграции

Используйте этот чек-лист для подготовки до дедлайна 29 апреля:

- [ ] **Определите затронутые категории** — проверьте, есть ли ваши категории в списке выше
- [ ] **Получите характеристики** — вызовите `getObjectCharc(subjectId)` для каждой затронутой категории
- [ ] **Отфильтруйте обязательные** — найдите все характеристики с `isRequiredForCreate === true`
- [ ] **Обновите код создания карточек** — убедитесь, что все обязательные характеристики включены в запросы create/update
- [ ] **Обновите SDK** — обновитесь до `daytona-wildberries-typescript-sdk@^3.9.0` для поддержки типа `SubjectCharacteristic`
- [ ] **Протестируйте** — создайте тестовые карточки в затронутых категориях для проверки до дедлайна

## Связанные ресурсы

- [Работа с карточками товаров](/ru/guides/working-with-product-cards) — Полное руководство по управлению карточками
- [Справочник API: ProductsModule](/api/classes/ProductsModule) — Полная документация методов
- [WB API: Характеристики товаров](https://dev.wildberries.ru/docs/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki) — Официальная документация WB

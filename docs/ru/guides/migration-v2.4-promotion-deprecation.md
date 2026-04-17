# Руководство по миграции: Устаревание API рекламы (v2.4)

**⚠️ ВАЖНО**: Wildberries прекращает поддержку методов кампаний со стандартными ставками (тип 8) **2 февраля 2026 года**.

---

## Обзор

Wildberries осуществляет переход от кампаний со стандартными ставками (тип 8) к кампаниям с настраиваемыми и стандартными ставками (тип 9). Четыре метода API будут **отключены 2 февраля 2026 года**.

**Источник**: [Примечания к релизу Wildberries #429](https://dev.wildberries.ru/en/release-notes?id=429)

---

## Быстрый старт: миграция за 3 шага

### Шаг 1: Определите кампании типа 8 (2 минуты)

Запустите этот скрипт, чтобы найти все кампании типа 8 в вашем аккаунте:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function findType8Campaigns() {
  const campaigns = await sdk.promotion.getPromotionCount();

  const type8 = campaigns.adverts?.filter(advert => advert.type === 8) || [];
  const type9 = campaigns.adverts?.filter(advert => advert.type === 9) || [];

  console.log(`\n📊 Анализ кампаний:`);
  console.log(`✅ Кампании типа 9 (безопасные): ${type9.length}`);
  console.log(`⚠️  Кампании типа 8 (требуют миграции): ${type8.length}\n`);

  if (type8.length > 0) {
    console.log('Кампании типа 8, требующие миграции:');
    type8.forEach(camp => {
      console.log(`  - ID кампании ${camp.advertId}: ${camp.name || 'Без названия'}`);
    });
    console.log(`\n⏰ Крайний срок: 2 февраля 2026 года\n`);
  } else {
    console.log('✅ Все ваши кампании уже типа 9. Миграция не требуется!');
  }

  return type8;
}

// Запускаем проверку
findType8Campaigns();
```

### Шаг 2: Обновите свой код (10-30 минут)

Замените устаревшие методы в вашей кодовой базе:

```bash
# Поиск устаревших методов в проекте
grep -r "getAutoGetnmtoadd\|createAutoUpdatenm\|getAutoStatWords\|createAutoSetExcluded" ./src
```

**Краткая таблица замен**:

| Устаревший метод | Замена | Время |
|------------------|--------|-------|
| `getAutoGetnmtoadd()` | `getAuctionAdverts()` | 2 мин |
| `createAutoUpdatenm()` | `updateAuctionNm()` | 5 мин |
| `getAutoStatWords()` | `getAdvFullstats()` | 10 мин |
| `createAutoSetExcluded()` | Создание кампании типа 9 | 15 мин |

### Шаг 3: Тестирование и деплой (15 минут)

```typescript
// Тестируем мигрированный код
async function testMigration() {
  const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

  // ✅ Тест: Получение информации о кампании (замена getAutoGetnmtoadd)
  const campaigns = await sdk.promotion.getAuctionAdverts({
    id: [your_campaign_id]
  });
  console.log('✅ Получение кампании работает:', campaigns.adverts?.[0]?.name);

  // ✅ Тест: Обновление товаров (замена createAutoUpdatenm)
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: your_campaign_id,
      nms: { add: [product_id_to_add] }
    }]
  });
  console.log('✅ Обновление товаров работает');

  // ✅ Тест: Получение статистики (замена getAutoStatWords)
  const stats = await sdk.promotion.getAdvFullstats({
    ids: String(your_campaign_id),
    beginDate: '2026-01-01',
    endDate: '2026-01-31'
  });
  console.log('✅ Получение статистики работает:', stats);
}
```

**Общее время миграции: 30-60 минут** для большинства проектов.

---

## Устаревшие методы

### 1. `getAutoGetnmtoadd()` — Список карточек товаров

**Эндпоинт**: `GET /adv/v1/auto/getnmtoadd`
**Дата прекращения поддержки**: 2 февраля 2026 года
**Затрагивает**: Кампании со стандартными ставками (тип 8)

**Путь миграции**:
```typescript
// ❌ УСТАРЕВШИЙ (перестанет работать 2 февраля 2026)
const cards = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });

// ✅ РЕКОМЕНДУЕМЫЙ: Используйте кампании типа 9
// 1. Получаем информацию о кампании
const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });

// 2. Просматриваем товары в кампании (включены в детали кампании)
const campaign = campaigns.adverts?.[0];
console.log('Товары:', campaign.nms);
```

---

### 2. `createAutoUpdatenm()` — Обновление карточек товаров

**Эндпоинт**: `POST /adv/v1/auto/updatenm`
**Дата прекращения поддержки**: 2 февраля 2026 года
**Затрагивает**: Кампании со стандартными ставками (тип 8)

**Путь миграции**:
```typescript
// ❌ УСТАРЕВШИЙ (перестанет работать 2 февраля 2026)
await sdk.promotion.createAutoUpdatenm({
  add: [123456, 789012],
  delete: [345678]
}, { id: campaignId });

// ✅ РЕКОМЕНДУЕМЫЙ: Используйте кампании типа 9 с updateAuctionNm()
await sdk.promotion.updateAuctionNm({
  nms: [{
    advert_id: campaignId,
    nms: {
      add: [123456, 789012],
      delete: [345678]
    }
  }]
});
```

---

### 3. `getAutoStatWords()` — Статистика по кластерам фраз

**Эндпоинт**: `GET /adv/v2/auto/stat-words`
**Дата прекращения поддержки**: 2 февраля 2026 года
**Затрагивает**: Кампании со стандартными ставками (тип 8)

**Путь миграции**:
```typescript
// ❌ УСТАРЕВШИЙ (перестанет работать 2 февраля 2026)
const stats = await sdk.promotion.getAutoStatWords({ id: campaignId });
console.log('Кластеры:', stats.clusters);
console.log('Исключённые:', stats.excluded);

// ✅ РЕКОМЕНДУЕМЫЙ: Используйте универсальный метод статистики
const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});

// getAdvFullstats() предоставляет комплексную статистику для ВСЕХ типов кампаний
console.log('Статистика кампании:', fullStats);
```

**Примечание**: `getAdvFullstats()` предоставляет более детальную статистику, чем `getAutoStatWords()`, включая:
- Показы, клики, заказы, выручку
- CTR, CR, коэффициенты конверсии
- Ежедневную разбивку по SKU
- Ключевые слова и эффективность фраз

---

### 4. `createAutoSetExcluded()` — Установка/удаление минус-фраз

**Эндпоинт**: `POST /adv/v1/auto/set-excluded`
**Дата прекращения поддержки**: 2 февраля 2026 года (перенесена с 15 января)
**Затрагивает**: Кампании со стандартными ставками (тип 8)

**Путь миграции**:
```typescript
// ❌ УСТАРЕВШИЙ (перестанет работать 2 февраля 2026)
await sdk.promotion.createAutoSetExcluded({
  excluded: ['Samsung', 'Xiaomi']
}, { id: campaignId });

// ✅ РЕКОМЕНДУЕМЫЙ: Используйте кампании типа 9
// Минус-фразы настраиваются через эндпоинты создания/управления кампаниями
// Обратитесь к документации API Wildberries для управления минус-фразами в кампаниях типа 9
```

---

## Сравнение типов кампаний: тип 8 и тип 9

### Тип 8: Кампании со стандартными ставками (устаревший)

- **Единая ставка** для всех товаров в кампании
- **Ограниченный контроль** над ставками отдельных товаров
- **Прекращение поддержки** 2 февраля 2026 года

### Тип 9: Кампании с настраиваемыми/стандартными ставками (актуальный)

- **Гибкое управление ставками**: выбор между единой ставкой или ручной настройкой для каждого товара
- **Больше контроля**: установка индивидуальных ставок для каждого товара/площадки
- **На перспективу**: все новые функции будут поддерживать тип 9

**Проверка типа кампании**:
```typescript
const campaigns = await sdk.promotion.getPromotionCount();

campaigns.adverts?.forEach(advert => {
  if (advert.type === 8) {
    console.warn('⚠️ Обнаружена кампания типа 8 — мигрируйте на тип 9!');
  } else if (advert.type === 9) {
    console.log('✅ Кампания типа 9 — миграция не требуется');
  }
});
```

---

## Чек-лист миграции

### До 2 февраля 2026 года

- [ ] **Проверьте свой код** на использование устаревших методов:
  ```bash
  # Поиск устаревших методов в кодовой базе
  grep -r "getAutoGetnmtoadd\|createAutoUpdatenm\|getAutoStatWords\|createAutoSetExcluded" .
  ```

- [ ] **Определите кампании типа 8** с помощью `getPromotionCount()`:
  ```typescript
  const campaigns = await sdk.promotion.getPromotionCount();
  const type8Campaigns = campaigns.adverts?.filter(a => a.type === 8);
  console.log(`Найдено ${type8Campaigns?.length} кампаний типа 8`);
  ```

- [ ] **Выполните миграцию на альтернативы типа 9**:
  - Замените `createAutoUpdatenm()` → `updateAuctionNm()`
  - Замените `getAutoStatWords()` → `getAdvFullstats()`
  - Обновите логику создания кампаний на тип 9

- [ ] **Протестируйте миграцию** в тестовом окружении

- [ ] **Отслеживайте предупреждения TypeScript/IDE**: Методы, помеченные `@deprecated`, будут отображаться зачёркнутыми в IDE

- [ ] **Обновите документацию** и базу знаний команды

---

## Поддержка IDE

SDK теперь помечает устаревшие методы тегами `@deprecated` в JSDoc. Ваша IDE будет отображать:

- ~~Зачёркнутый текст~~ на именах устаревших методов
- Предупреждающие сообщения с подсказками по миграции
- Ссылки на альтернативные методы

**Пример в VS Code**:
```typescript
// IDE показывает зачёркивание и предупреждение
sdk.promotion.getAutoStatWords({ id: 123 });
          //  ~~~~~~~~~~~~~~~~
          //  @deprecated This method is deprecated and will be disabled on February 2, 2026.
          //  Migrate to universal statistics method getAdvFullstats()
```

---

## Хронология

| Дата | Событие |
|------|---------|
| **24 декабря 2024** | Wildberries объявляет о прекращении поддержки |
| **15 января 2025** | Первоначальная дата прекращения поддержки `createAutoSetExcluded()` |
| **2 февраля 2026** | **Все 4 метода будут отключены** |

**Рекомендация**: Выполните миграцию **до 31 января 2025 года**, чтобы оставить запас времени на тестирование.

---

## Типичные паттерны миграции

### Паттерн 1: Получение товаров кампании

**Сценарий**: Вам нужно получить список товаров в кампании.

```typescript
// ❌ СТАРЫЙ КОД (Тип 8)
async function getCampaignProducts(campaignId: number) {
  const productIds = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });
  return productIds;
}

// ✅ НОВЫЙ КОД (Тип 9)
async function getCampaignProducts(campaignId: number) {
  const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
  const campaign = campaigns.adverts?.[0];
  return campaign?.nms || []; // Возвращает массив ID товаров
}
```

**Ключевое отличие**: Тип 9 возвращает полную информацию о кампании, включая товары в поле `nms`.

---

### Паттерн 2: Добавление товаров в кампанию

**Сценарий**: Вам нужно добавить несколько товаров в существующую кампанию.

```typescript
// ❌ СТАРЫЙ КОД (Тип 8)
async function addProductsToCampaign(campaignId: number, productIds: number[]) {
  await sdk.promotion.createAutoUpdatenm(
    { add: productIds },
    { id: campaignId }
  );
}

// ✅ НОВЫЙ КОД (Тип 9)
async function addProductsToCampaign(campaignId: number, productIds: number[]) {
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: campaignId,
      nms: { add: productIds }
    }]
  });
}

// ✅ ПАКЕТНОЕ ОБНОВЛЕНИЕ (Тип 9) — обновление нескольких кампаний одновременно!
async function addProductsToMultipleCampaigns(
  updates: Array<{ campaignId: number; productIds: number[] }>
) {
  await sdk.promotion.updateAuctionNm({
    nms: updates.map(u => ({
      advert_id: u.campaignId,
      nms: { add: u.productIds }
    }))
  });
}
```

**Преимущество**: Тип 9 позволяет выполнять пакетные обновления нескольких кампаний одним вызовом API!

---

### Паттерн 3: Удаление товаров из кампании

**Сценарий**: Вам нужно удалить определённые товары из кампании.

```typescript
// ❌ СТАРЫЙ КОД (Тип 8)
async function removeProducts(campaignId: number, productIds: number[]) {
  await sdk.promotion.createAutoUpdatenm(
    { delete: productIds },
    { id: campaignId }
  );
}

// ✅ НОВЫЙ КОД (Тип 9)
async function removeProducts(campaignId: number, productIds: number[]) {
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: campaignId,
      nms: { delete: productIds }
    }]
  });
}
```

---

### Паттерн 4: Получение статистики кампании

**Сценарий**: Вам нужно проанализировать эффективность кампании и кластеры ключевых слов.

```typescript
// ❌ СТАРЫЙ КОД (Тип 8) — ограниченная статистика
async function getCampaignStats(campaignId: number) {
  const stats = await sdk.promotion.getAutoStatWords({ id: campaignId });

  console.log('Кластеры ключевых слов:', stats.clusters);
  console.log('Исключённые фразы:', stats.excluded);
  // ⚠️ Отсутствуют: показы, клики, заказы, выручка, CTR, коэффициент конверсии
}

// ✅ НОВЫЙ КОД (Тип 9) — комплексная статистика
async function getCampaignStats(campaignId: number) {
  const stats = await sdk.promotion.getAdvFullstats({
    ids: String(campaignId),
    beginDate: '2026-01-01',
    endDate: '2026-01-31'
  });

  // ✅ Доступ к ГОРАЗДО БОЛЬШЕМУ объёму данных:
  console.log('Показы:', stats.views);
  console.log('Клики:', stats.clicks);
  console.log('Заказы:', stats.orders);
  console.log('Выручка:', stats.sum);
  console.log('CTR:', stats.ctr);
  console.log('Коэффициент конверсии:', stats.cr);

  // ✅ Ежедневная разбивка по SKU
  stats.days?.forEach(day => {
    console.log(`Дата ${day.date}:`, {
      views: day.views,
      clicks: day.clicks,
      orders: day.orders
    });

    // Статистика по каждому SKU
    day.apps?.forEach(sku => {
      console.log(`  SKU ${sku.nm_id}: ${sku.views} показов, ${sku.clicks} кликов`);
    });
  });
}
```

**Значительное улучшение**: `getAdvFullstats()` предоставляет в 10 раз больше данных, чем `getAutoStatWords()`!

---

### Паттерн 5: Определение типа кампании и автоматическая миграция

**Сценарий**: Вы хотите автоматически обрабатывать кампании обоих типов (8 и 9) в переходный период.

```typescript
// ✅ ОБЁРТКА ДЛЯ УМНОЙ МИГРАЦИИ
async function getProducts(campaignId: number): Promise<number[]> {
  // Шаг 1: Проверяем тип кампании
  const allCampaigns = await sdk.promotion.getPromotionCount();
  const campaign = allCampaigns.adverts?.find(c => c.advertId === campaignId);

  if (!campaign) {
    throw new Error(`Кампания ${campaignId} не найдена`);
  }

  // Шаг 2: Используем соответствующий метод в зависимости от типа
  if (campaign.type === 8) {
    console.warn(`⚠️  Кампания ${campaignId} имеет тип 8 (устаревший). Пожалуйста, мигрируйте на тип 9!`);
    // Работает до 2 февраля 2026, но показываем предупреждение
    return await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });
  } else if (campaign.type === 9) {
    // Используем современный метод типа 9
    const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
    return campaigns.adverts?.[0]?.nms || [];
  } else {
    throw new Error(`Неизвестный тип кампании: ${campaign.type}`);
  }
}
```

**Используйте этот паттерн в переходный период** для корректной обработки обоих типов кампаний с поощрением миграции.

---

### Паттерн 6: Полный рабочий процесс управления кампанией

**Сценарий**: Полный рабочий процесс управления товарами кампании (проверка, добавление, удаление, верификация).

```typescript
// ✅ СОВРЕМЕННЫЙ РАБОЧИЙ ПРОЦЕСС (Тип 9)
async function manageCampaignProducts() {
  const campaignId = 12345;

  // 1. Получаем текущее состояние кампании
  const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
  const campaign = campaigns.adverts?.[0];

  console.log(`Кампания: ${campaign.name}`);
  console.log(`Текущее количество товаров: ${campaign.nms?.length || 0}`);

  // 2. Добавляем новые товары
  const newProducts = [111111, 222222, 333333];
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: campaignId,
      nms: { add: newProducts }
    }]
  });
  console.log(`✅ Добавлено ${newProducts.length} товаров`);

  // 3. Удаляем неэффективные товары (на основе статистики)
  const stats = await sdk.promotion.getAdvFullstats({
    ids: String(campaignId),
    beginDate: '2026-01-01',
    endDate: '2026-01-31'
  });

  // Находим SKU без заказов
  const underperforming = stats.days?.flatMap(day =>
    day.apps?.filter(sku => sku.orders === 0).map(sku => sku.nm_id) || []
  ) || [];

  if (underperforming.length > 0) {
    await sdk.promotion.updateAuctionNm({
      nms: [{
        advert_id: campaignId,
        nms: { delete: underperforming }
      }]
    });
    console.log(`✅ Удалено ${underperforming.length} неэффективных товаров`);
  }

  // 4. Проверяем итоговое состояние
  const updated = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
  console.log(`Итоговое количество товаров: ${updated.adverts?.[0]?.nms?.length || 0}`);
}
```

Это демонстрирует **возможности кампаний типа 9**: единый API, пакетные операции, детальная статистика!

---

## Полный пример миграции

### До (Тип 8 — устаревший)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ Все эти методы перестанут работать 2 февраля 2026
const campaignId = 12345;

// Получаем товары, доступные для кампании
const availableProducts = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });

// Обновляем товары в кампании
await sdk.promotion.createAutoUpdatenm({
  add: [111111, 222222],
  delete: [333333]
}, { id: campaignId });

// Получаем статистику
const stats = await sdk.promotion.getAutoStatWords({ id: campaignId });
console.log('Кластеры ключевых слов:', stats.clusters);

// Устанавливаем минус-фразы
await sdk.promotion.createAutoSetExcluded({
  excluded: ['competitor brand']
}, { id: campaignId });
```

### После (Тип 9 — рекомендуемый)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Используем методы кампаний типа 9
const campaignId = 12345;

// Получаем информацию о кампании (включает товары)
const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
const campaign = campaigns.adverts?.[0];
console.log('Товары кампании:', campaign.nms);

// Обновляем товары в кампании
await sdk.promotion.updateAuctionNm({
  nms: [{
    advert_id: campaignId,
    nms: {
      add: [111111, 222222],
      delete: [333333]
    }
  }]
});

// Получаем комплексную статистику (поддерживает все типы кампаний)
const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});
console.log('Полная статистика:', fullStats);

// Настройка минус-фраз для типа 9
// (Обратитесь к документации Wildberries для актуального API типа 9)
```

---

## Дополнительные ресурсы

- **[Примечания к релизу Wildberries](https://dev.wildberries.ru/en/release-notes?id=429)** — Официальное объявление
- **[Документация API рекламы](https://dev.wildberries.ru/openapi/promotion)** — Полный справочник API
- **[Модуль Promotion в SDK](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/classes/PromotionModule.html)** — Справочник TypeDoc
- **[Руководство по рекламе](./promotion-advertising.md)** — Руководство по использованию SDK

---

## Нужна помощь?

- **GitHub Issues**: [Сообщить о проблемах миграции](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- **GitHub Discussions**: [Задать вопросы](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

---

**Последнее обновление**: 24 декабря 2024
**Применимо к**: SDK v2.4+
**Крайний срок**: 2 февраля 2026

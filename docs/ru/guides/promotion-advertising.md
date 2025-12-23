# Руководство по модулю Promotion (Реклама)

Это руководство описывает модуль Promotion (Реклама) SDK Wildberries, включая управление кампаниями, контроль ставок, бюджетные операции и аналитику.

## Обзор

Модуль Promotion предоставляет полный доступ к рекламным возможностям Wildberries:

- **Управление кампаниями**: Создание, запуск, пауза, остановка и удаление рекламных кампаний
- **Бюджетные операции**: Пополнение средств и отслеживание расходов кампании
- **Управление ставками**: Установка и управление ставками для поиска и рекомендаций
- **Управление фразами**: Управление фиксированными и минус-фразами
- **Аналитика**: Получение статистики кампании по ключевым словам и метрикам эффективности

## Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Получить баланс рекламного кабинета
const balance = await sdk.promotion.getAdvBalance();
console.log(`Баланс: ${balance.net}₽`);

// Получить обзор всех кампаний
const campaigns = await sdk.promotion.getPromotionCount();
console.log(`Всего кампаний: ${campaigns.all}`);
```

## Жизненный цикл кампании

### Статусы кампаний

| Статус | Код | Описание |
|--------|-----|----------|
| Готова | `4` | Кампания создана, готова к запуску |
| Завершена | `7` | Кампания завершена |
| Отменена | `8` | Кампания отменена |
| Активна | `9` | Кампания работает |
| На паузе | `11` | Кампания приостановлена |
| Удаляется | `-1` | Кампания удаляется (3-10 мин) |

### Типы кампаний

| Тип | Описание | Статус |
|-----|----------|--------|
| `4` | В каталоге | **Устарел** |
| `5` | В карточке товара | **Устарел** |
| `6` | В поиске | **Устарел** |
| `7` | В рекомендациях | **Устарел** |
| `8` | Единая ставка | **Устарел** |
| `9` | Единая или ручная ставка | **Текущий** |

::: warning Важно: Разные методы для разных типов
Wildberries API использует **разные эндпоинты** для разных типов кампаний:
- **`getAuctionAdverts()`** - ТОЛЬКО для кампаний типа 9
- **`createPromotionAdvert()`** - ТОЛЬКО для кампаний типов 4-8 (устаревшие)

Универсального метода для получения деталей всех типов кампаний в одном запросе НЕТ.
:::

### Типы ставок

| Тип ставки | Описание |
|------------|----------|
| `manual` | Ручная ставка - управление ставками по местам размещения |
| `unified` | Единая ставка - одна ставка для всех мест |

### Места размещения

| Место | Описание |
|-------|----------|
| `search` | Реклама в поиске |
| `recommendations` | Реклама в рекомендациях |
| `combined` | И поиск, и рекомендации |

## Управление кампаниями

### Создание кампании

```typescript
// Создать кампанию с ручной ставкой для поиска
const campaign = await sdk.promotion.createSeacatSaveAd({
  name: 'Зимняя коллекция 2024',
  nms: [168120815, 173574852], // Артикулы WB (макс. 50)
  bid_type: 'manual',
  placement_types: ['search']
});

console.log(`Кампания создана: ID ${campaign}`);
```

### Получение информации о кампаниях

#### Список всех кампаний

```typescript
// Получить все кампании, сгруппированные по типу и статусу
const overview = await sdk.promotion.getPromotionCount();

overview.adverts?.forEach(group => {
  console.log(`Тип ${group.type}, Статус ${group.status}: ${group.count} кампаний`);

  // Список ID кампаний
  group.advert_list?.forEach(ad => {
    console.log(`  ID кампании: ${ad.advertId}`);
  });
});
```

#### Детали кампаний типа 9 (современные)

```typescript
// Получить аукционные кампании (тип 9)
const auctionCampaigns = await sdk.promotion.getAuctionAdverts({});
auctionCampaigns.adverts?.forEach(campaign => {
  console.log(`Кампания ${campaign.id}: статус=${campaign.status}, тип_ставки=${campaign.bid_type}`);
});

// Фильтрация по статусу или типу оплаты
const activeCampaigns = await sdk.promotion.getAuctionAdverts({
  statuses: '9',        // Только активные
  payment_type: 'cpm'   // Кампании CPM
});

// Получить конкретные кампании по ID
const specificCampaigns = await sdk.promotion.getAuctionAdverts({
  ids: '12345,67890'    // Макс. 50 ID
});
```

#### Детали устаревших кампаний (типы 4-8)

::: warning Путаница с названием метода
`createPromotionAdvert()` НЕ создаёт кампании - он ПОЛУЧАЕТ информацию об устаревших кампаниях.
Название сгенерировано из Swagger-спецификации и может вводить в заблуждение.
:::

```typescript
// Получить детали устаревших кампаний (типы 4-8)
const legacyDetails = await sdk.promotion.createPromotionAdvert(
  [12345, 67890],     // Массив ID кампаний (макс. 50)
  {
    status: 9,        // Фильтр по статусу (необязательно)
    type: 8,          // Фильтр по типу (необязательно)
    order: 'change',  // Сортировка: 'create', 'change', 'id'
    direction: 'desc' // Направление: 'asc' или 'desc'
  }
);

console.log('Детали устаревших кампаний:', legacyDetails);
```

#### Полный воркфлоу: получение ВСЕХ деталей кампаний

```typescript
async function getAllCampaignDetails(sdk: WildberriesSDK) {
  // Шаг 1: Получить список ВСЕХ кампаний
  const allCampaigns = await sdk.promotion.getPromotionCount();

  // Шаг 2: Разделить по типам
  const type9Ids: number[] = [];
  const legacyIds: number[] = [];

  allCampaigns.adverts?.forEach(group => {
    group.advert_list?.forEach(advert => {
      if (group.type === 9) {
        type9Ids.push(advert.advertId!);
      } else if (group.type && group.type >= 4 && group.type <= 8) {
        legacyIds.push(advert.advertId!);
      }
    });
  });

  console.log(`Найдено ${type9Ids.length} кампаний типа 9 (современные)`);
  console.log(`Найдено ${legacyIds.length} устаревших кампаний (типы 4-8)`);

  // Шаг 3: Получить детали кампаний типа 9
  if (type9Ids.length > 0) {
    const type9Details = await sdk.promotion.getAuctionAdverts({
      ids: type9Ids.slice(0, 50).join(',')  // Макс. 50 ID за запрос
    });
    console.log('Детали кампаний типа 9:', type9Details);
  }

  // Шаг 4: Получить детали устаревших кампаний
  if (legacyIds.length > 0) {
    const legacyDetails = await sdk.promotion.createPromotionAdvert(
      legacyIds.slice(0, 50)  // Макс. 50 ID за запрос
    );
    console.log('Детали устаревших кампаний:', legacyDetails);
  }
}
```

### Методы управления кампаниями

```typescript
// Запустить кампанию (требуется статус 4 или 11 + бюджет)
await sdk.promotion.getAdvStart({ id: campaignId });

// Поставить на паузу (только для статуса 9 - активна)
await sdk.promotion.getAdvPause({ id: campaignId });

// Остановить/завершить кампанию (для статусов 4, 9, 11)
await sdk.promotion.getAdvStop({ id: campaignId });

// Удалить кампанию (только для статуса 4 - готова)
await sdk.promotion.getAdvDelete({ id: campaignId });

// Переименовать кампанию
await sdk.promotion.createAdvRename({
  advertId: campaignId,
  name: 'Новое название кампании'
});
```

### Допустимые переходы статусов

```
┌─────────┐     запуск     ┌─────────┐
│ Готова  │ ──────────────>│ Активна │
│   (4)   │                │   (9)   │
└────┬────┘                └────┬────┘
     │                          │
     │ удаление                 │ пауза
     ▼                          ▼
┌───────────┐            ┌──────────┐
│ Удаляется │            │ На паузе │
│   (-1)    │            │   (11)   │
└───────────┘            └────┬─────┘
                              │
     ┌────────────────────────┤ запуск
     │                        │
     │      остановка         ▼
     │    ◄───────────────────┘
     ▼
┌───────────┐
│ Завершена │
│    (7)    │
└───────────┘
```

## Бюджетные операции

### Проверка баланса

```typescript
const balance = await sdk.promotion.getAdvBalance();
console.log(`Баланс (счёт): ${balance.balance}₽`);
console.log(`Баланс (кабинет): ${balance.net}₽`);
console.log(`Бонусы: ${balance.bonus}₽`);

// Информация о кэшбэке
if (balance.cashbacks?.length) {
  balance.cashbacks.forEach(cb => {
    console.log(`Кэшбэк: ${cb.percent}% (макс ${cb.sum}₽)`);
  });
}
```

### Пополнение бюджета кампании

> **Важно**: Согласно документации API, для пополнения бюджета кампания должна быть в статусе `11` (на паузе). Однако тестирование показало, что это может работать и для статуса `4` (готова).

```typescript
// Сначала поставьте кампанию на паузу, если она активна
await sdk.promotion.getAdvPause({ id: campaignId });

// Пополнить на 1000₽ с баланса кабинета
await sdk.promotion.createBudgetDeposit(
  {
    sum: 1000,
    type: 1  // 0=счёт, 1=баланс (кабинет), 3=бонусы
  },
  { id: campaignId }
);

// Проверить бюджет
const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
console.log(`Бюджет кампании: ${budget.total}₽`);
```

### Получение бюджета кампании

```typescript
const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
console.log(`Наличные: ${budget.cash}₽`);
console.log(`Взаимозачёт: ${budget.netting}₽`);
console.log(`Всего: ${budget.total}₽`);
```

### История расходов

```typescript
const to = new Date();
const from = new Date();
from.setDate(from.getDate() - 30);

const expenses = await sdk.promotion.getAdvUpd({
  from: from.toISOString().split('T')[0],
  to: to.toISOString().split('T')[0]
});

let totalSpent = 0;
expenses.forEach(record => {
  console.log(`${record.campName}: ${record.updSum}₽`);
  totalSpent += record.updSum || 0;
});
console.log(`Всего потрачено за 30 дней: ${totalSpent}₽`);
```

## Управление ставками

### Получение минимальных ставок

```typescript
// Получить минимальные ставки для товаров в кампании
const minBids = await sdk.promotion.createBidsMin({
  advert_id: campaignId,
  nm_ids: [168120815, 173574852],
  payment_type: 'cpm',  // 'cpm' (за 1000 показов) или 'cpc' (за клик)
  placement_types: ['search']
});

minBids.forEach(bid => {
  console.log(`Артикул ${bid.nm_id}: мин. ставка = ${bid.bid}₽`);
});
```

### Обновление ставок для кампаний с единой ставкой

```typescript
// Для кампаний с единой ставкой (bid_type: 'unified')
await sdk.promotion.updateAdvBid({
  bids: [{
    advert_id: campaignId,
    bid: 280  // CPM ставка в рублях
  }]
});
```

### Обновление ставок для кампаний с ручной ставкой

```typescript
// Для кампаний с ручной ставкой (bid_type: 'manual')
await sdk.promotion.updateAuctionBid({
  bids: [{
    advert_id: campaignId,
    nm_bids: [{
      nm_id: 168120815,
      bid: 280,
      placement: 'search'  // или 'recommendations', 'combined'
    }]
  }]
});
```

## Управление ключевыми фразами

### Минус-фразы для ручной ставки

> **Важно**: Эти методы требуют, чтобы кампания была активной (статус 9).

```typescript
// Установить минус-фразы
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['дёшево', 'скидка', 'б/у'] },
  { id: campaignId }
);

// Очистить все минус-фразы
await sdk.promotion.createSearchSetExcluded(
  { excluded: [] },
  { id: campaignId }
);
```

### Минус-фразы для единой ставки

```typescript
// Установить минус-фразы для кампании с единой ставкой
await sdk.promotion.createAutoSetExcluded(
  { excluded: ['дёшево', 'скидка'] },
  { id: campaignId }
);
```

### Фиксированные фразы (для ручной ставки)

Фиксированные фразы гарантируют, что ваш товар будет показываться только по определённым поисковым запросам.

```typescript
// Получить статус активности фиксированных фраз
const activity = await sdk.promotion.getSearchSetPlus({ id: campaignId });

// Установить фиксированные фразы (фразы должны быть в списке ключевых слов кампании)
await sdk.promotion.createSearchSetPlu(
  { pluse: ['зимняя куртка', 'тёплое пальто'] },
  { id: campaignId }
);

// Удалить все фиксированные фразы
await sdk.promotion.createSearchSetPlu(
  { pluse: [] },
  { id: campaignId }
);

// Переключить активность фиксированных фраз (true = активны, false = неактивны)
await sdk.promotion.getSearchSetPlus({
  id: campaignId,
  fixed: true
});
```

## Статистика кампаний

### Статистика по ключевым словам (последние 7 дней)

```typescript
const to = new Date();
const from = new Date();
from.setDate(from.getDate() - 7);

const stats = await sdk.promotion.getStatsKeywords({
  advert_id: campaignId,
  from: from.toISOString().split('T')[0],
  to: to.toISOString().split('T')[0]
});

stats.keywords?.forEach(day => {
  console.log(`\nДата: ${day.date}`);
  day.stats?.forEach(kw => {
    console.log(`  "${kw.keyword}": показы=${kw.views}, клики=${kw.clicks}, расход=${kw.sum}₽`);
  });
});
```

### Статистика ключевых слов для кампаний с ручной ставкой

```typescript
const manualStats = await sdk.promotion.getStatWords({ id: campaignId });

if (manualStats.stat) {
  manualStats.stat.forEach(s => {
    console.log(`"${s.keyword}": показы=${s.views}, клики=${s.clicks}, ctr=${s.ctr}%`);
  });
}
```

### Статистика кластеров для кампаний с единой ставкой

```typescript
const unifiedStats = await sdk.promotion.getAutoStatWords({ id: campaignId });

if (unifiedStats.clusters) {
  unifiedStats.clusters.forEach(c => {
    console.log(`Кластер "${c.cluster}": ${c.count} ключевых слов`);
  });
}

if (unifiedStats.excluded) {
  console.log(`Минус-фразы: ${unifiedStats.excluded.length}`);
}
```

### Полная статистика кампании

```typescript
const end = new Date();
const begin = new Date();
begin.setDate(begin.getDate() - 7);

const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),  // Можно передать несколько: "123,456,789"
  beginDate: begin.toISOString().split('T')[0],
  endDate: end.toISOString().split('T')[0]
});

fullStats.forEach(stat => {
  console.log(`Кампания ${stat.advertId}:`);
  console.log(`  Показы: ${stat.views}`);
  console.log(`  Клики: ${stat.clicks}`);
  console.log(`  CTR: ${stat.ctr}%`);
  console.log(`  CPC: ${stat.cpc}₽`);
  console.log(`  Заказы: ${stat.orders}`);
  console.log(`  Расход: ${stat.sum}₽`);
});
```

## Полный пример рабочего процесса

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

async function runAdvertisingCampaign() {
  const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
  const RATE_LIMIT_DELAY = 5000;

  let campaignId: number | null = null;

  try {
    // 1. Проверить баланс
    const balance = await sdk.promotion.getAdvBalance();
    console.log(`Доступный баланс: ${balance.net}₽`);
    await delay(RATE_LIMIT_DELAY);

    if (balance.net < 1000) {
      throw new Error('Недостаточный баланс');
    }

    // 2. Создать кампанию
    campaignId = await sdk.promotion.createSeacatSaveAd({
      name: 'Тестовая кампания SDK',
      nms: [168120815],
      bid_type: 'manual',
      placement_types: ['search']
    }) as number;
    console.log(`Создана кампания: ${campaignId}`);
    await delay(RATE_LIMIT_DELAY);

    // 3. Пополнить бюджет
    await sdk.promotion.createBudgetDeposit(
      { sum: 1000, type: 1 },
      { id: campaignId }
    );
    console.log('Бюджет пополнен: 1000₽');
    await delay(RATE_LIMIT_DELAY);

    // 4. Получить минимальные ставки
    const minBids = await sdk.promotion.createBidsMin({
      advert_id: campaignId,
      nm_ids: [168120815],
      payment_type: 'cpm',
      placement_types: ['search']
    });
    console.log(`Минимальная ставка: ${minBids[0]?.bid || 'Н/Д'}₽`);
    await delay(RATE_LIMIT_DELAY);

    // 5. Запустить кампанию
    await sdk.promotion.getAdvStart({ id: campaignId });
    console.log('Кампания запущена!');

    // 6. Мониторинг (в реальном сценарии - периодический опрос)
    // ... кампания работает ...

  } finally {
    // Очистка: Удалить тестовую кампанию
    if (campaignId) {
      try {
        await sdk.promotion.getAdvPause({ id: campaignId });
        await delay(2000);
        await sdk.promotion.getAdvDelete({ id: campaignId });
        console.log('Кампания удалена');
      } catch (e) {
        // Попробовать остановить, если удаление не удалось (кампания может быть не в статусе 4)
        await sdk.promotion.getAdvStop({ id: campaignId });
        console.log('Кампания остановлена');
      }
    }
  }
}
```

## Лимиты запросов

| Операция | Лимит |
|----------|-------|
| Большинство операций | 5 запр/сек (интервал 200мс) |
| Создание кампании | 5 запр/мин (интервал 12сек) |
| Пополнение бюджета | 1 запр/сек |
| Статистика | 1 запр/мин |
| Минимальные ставки | 20 запр/мин (интервал 3сек) |

Всегда реализуйте правильные задержки между вызовами API:

```typescript
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Между большинством операций
await delay(5000); // 5 секунд

// Между запросами статистики
await delay(60000); // 1 минута
```

## Обработка ошибок

```typescript
import {
  ValidationError,
  AuthenticationError,
  RateLimitError
} from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.getAdvStart({ id: campaignId });
} catch (error) {
  if (error instanceof ValidationError) {
    // Неверный ID кампании или неправильный статус
    console.error('Ошибка валидации:', error.message);
  } else if (error instanceof AuthenticationError) {
    // У API ключа нет прав на запись
    console.error('Ошибка авторизации: Проверьте права API ключа');
  } else if (error instanceof RateLimitError) {
    // Слишком много запросов
    console.error('Превышен лимит запросов, повторить через:', error.retryAfter);
  }
}
```

## Справочник методов

### Список и детали кампаний

::: tip Краткая справка по типам кампаний
- **Тип 9** (текущий): Используйте `getAuctionAdverts()`
- **Типы 4-8** (устаревшие): Используйте `createPromotionAdvert()`
:::

| Метод | API Эндпоинт | Типы кампаний | Описание |
|-------|--------------|---------------|----------|
| `getPromotionCount()` | `GET /adv/v1/promotion/count` | **ВСЕ** | Список всех кампаний с ID |
| `getAuctionAdverts()` | `GET /adv/v0/auction/adverts` | **только 9** | Детали современных кампаний |
| `createPromotionAdvert()` | `POST /adv/v1/promotion/adverts` | **только 4-8** | Детали устаревших кампаний |

### Управление кампаниями

| Метод | Описание | Требуемый статус |
|-------|----------|------------------|
| `createSeacatSaveAd()` | Создать кампанию (тип 9) | - |
| `getAdvStart()` | Запустить кампанию | 4 или 11 |
| `getAdvPause()` | Поставить на паузу | 9 |
| `getAdvStop()` | Остановить/завершить | 4, 9 или 11 |
| `getAdvDelete()` | Удалить кампанию | только 4 |
| `createAdvRename()` | Переименовать | любой |

### Бюджет и финансы

| Метод | Описание |
|-------|----------|
| `getAdvBalance()` | Баланс аккаунта |
| `createBudgetDeposit()` | Пополнить кампанию (статус 11) |
| `getAdvBudget()` | Бюджет кампании |
| `getAdvUpd()` | История расходов |

### Ставки

| Метод | Описание |
|-------|----------|
| `createBidsMin()` | Минимальные ставки |
| `updateAdvBid()` | Обновить единую ставку |
| `updateAuctionBid()` | Обновить ручные ставки |

### Ключевые фразы

| Метод | Описание | Тип ставки |
|-------|----------|------------|
| `createSearchSetExcluded()` | Установить минус-фразы | ручная |
| `createAutoSetExcluded()` | Установить минус-фразы | единая |
| `getSearchSetPlus()` | Получить/переключить фикс. фразы | ручная |
| `createSearchSetPlu()` | Установить фикс. фразы | ручная |

### Статистика

| Метод | Описание |
|-------|----------|
| `getStatsKeywords()` | Стат. по ключевым (7 дней) |
| `getStatWords()` | Стат. по ключевым (ручная) |
| `getAutoStatWords()` | Стат. по кластерам (единая) |
| `getAdvFullstats()` | Полная статистика |

## Устранение неполадок

### Частые проблемы

1. **"Validation failed" при пополнении бюджета**
   - Кампания должна быть в статусе 11 (на паузе)
   - Сначала поставьте на паузу: `getAdvPause({ id })`

2. **"Validation failed" для минус/фиксированных фраз**
   - Кампания должна быть активной (статус 9)
   - Сначала запустите кампанию

3. **"Authentication failed" при операциях записи**
   - Проверьте, есть ли у API ключа права на рекламу
   - Запросите расширенные права в личном кабинете WB

4. **Кампания создаётся со статусом 7 (завершена)**
   - Товар может не подходить для рекламы
   - Проверьте наличие и остатки товара

5. **Не удаётся удалить кампанию**
   - Удалять можно только кампании в статусе 4 (готова)
   - Используйте `getAdvStop()` для завершения других кампаний

## См. также

- [Модуль тарифов](./commissions-fees.md) - Для расчёта ROI
- [Лучшие практики](./best-practices.md) - Общие рекомендации по SDK
- [Устранение неполадок](./troubleshooting.md) - Типичные проблемы

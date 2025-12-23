# Справочник API модуля Promotion (Реклама)

Полный справочник API модуля Wildberries Promotion (Реклама) со всеми сигнатурами методов, параметрами и типами ответов.

## Обзор модуля

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'ваш-api-ключ' });

// Доступ к модулю promotion
sdk.promotion.methodName(params);
```

**Всего методов**: 42
**Базовый URL**: `https://advert-api.wildberries.ru`

---

## ⚠️ Критично: Типы кампаний и методы

Wildberries API использует **разные эндпоинты** для разных типов кампаний. Это ограничение API Wildberries, а не SDK.

### Типы кампаний

| Тип | Описание | Статус | Метод для деталей |
|-----|----------|--------|-------------------|
| `4` | В каталоге | **Устарел** | `createPromotionAdvert()` |
| `5` | В карточке товара | **Устарел** | `createPromotionAdvert()` |
| `6` | В поиске | **Устарел** | `createPromotionAdvert()` |
| `7` | В рекомендациях | **Устарел** | `createPromotionAdvert()` |
| `8` | Единая ставка | **Устарел** | `createPromotionAdvert()` |
| `9` | Единая или ручная ставка | **Текущий** | `getAuctionAdverts()` |

### Методы по типам кампаний

| Метод | API Эндпоинт | Типы кампаний | Назначение |
|-------|--------------|---------------|------------|
| `getPromotionCount()` | `GET /adv/v1/promotion/count` | **ВСЕ** (4-9) | Список всех кампаний с ID |
| `getAuctionAdverts()` | `GET /adv/v0/auction/adverts` | **Только тип 9** | Детали современных кампаний |
| `createPromotionAdvert()` | `POST /adv/v1/promotion/adverts` | **Только типы 4-8** | Детали устаревших кампаний |

::: warning Путаница с названием метода
`createPromotionAdvert()` НЕ создаёт кампании - он **получает** информацию об устаревших кампаниях (типы 4-8). Название метода взято из Swagger/OpenAPI спецификации.
:::

### Пример: Получение деталей всех кампаний

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

  // Шаг 3: Детали кампаний типа 9 (современные)
  if (type9Ids.length > 0) {
    const type9Details = await sdk.promotion.getAuctionAdverts({
      ids: type9Ids.slice(0, 50).join(',')
    });
  }

  // Шаг 4: Детали устаревших кампаний (типы 4-8)
  if (legacyIds.length > 0) {
    const legacyDetails = await sdk.promotion.createPromotionAdvert(
      legacyIds.slice(0, 50)
    );
  }
}
```

---

## Содержание

1. [Список кампаний](#список-кампаний)
2. [Создание кампаний](#создание-кампаний)
3. [Управление кампаниями](#управление-кампаниями)
4. [Управление ставками](#управление-ставками)
5. [Финансовые операции](#финансовые-операции)
6. [Управление фразами](#управление-фразами)
7. [Управление товарами](#управление-товарами)
8. [Статистика](#статистика)
9. [Медиакампании](#медиакампании)
10. [Календарь акций](#календарь-акций)

---

## Список кампаний

### getPromotionCount()

Возвращает все рекламные кампании, сгруппированные по типу и статусу.

```typescript
async getPromotionCount(): Promise<{
  adverts?: {
    type?: number;
    status?: number;
    count?: number;
    advert_list?: {
      advertId?: number;
      changeTime?: string;
    }[];
  }[];
  all?: number;
}>
```

**Лимит запросов**: 5 запр/сек (интервал 200мс)

**Поля ответа**:
| Поле | Тип | Описание |
|------|-----|----------|
| `adverts` | array | Группы кампаний по типу и статусу |
| `adverts[].type` | number | Тип кампании (4-9) |
| `adverts[].status` | number | Статус кампании (-1, 4, 7, 8, 9, 11) |
| `adverts[].count` | number | Количество кампаний |
| `adverts[].advert_list` | array | Список ID кампаний |
| `all` | number | Общее количество кампаний |

**Пример**:
```typescript
const campaigns = await sdk.promotion.getPromotionCount();
console.log(`Всего: ${campaigns.all}`);

campaigns.adverts?.forEach(group => {
  console.log(`Тип ${group.type}, Статус ${group.status}: ${group.count}`);
});
```

---

### getAuctionAdverts()

Возвращает информацию о кампаниях типа 9 (единая/ручная ставка).

```typescript
async getAuctionAdverts(options?: {
  ids?: string;                              // ID кампаний через запятую
  statuses?: '-1' | '4' | '7' | '8' | '9' | '11';
  payment_type?: 'cpm' | 'cpc';
}): Promise<{
  adverts?: {
    id: number;
    status: number;
    bid_type: 'manual' | 'unified';
    name?: string;
  }[];
}>
```

**Лимит запросов**: 5 запр/сек (интервал 200мс)

**Параметры**:
| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `ids` | string | Нет | ID кампаний через запятую |
| `statuses` | string | Нет | Фильтр по статусу |
| `payment_type` | string | Нет | Фильтр по типу оплаты (cpm/cpc) |

---

## Создание кампаний

### createSeacatSaveAd()

Создаёт кампанию типа 9 с ручной или единой ставкой.

```typescript
async createSeacatSaveAd(data?: {
  name?: string;                            // Название кампании
  nms?: number[];                           // Артикулы WB (макс. 50)
  bid_type?: 'manual' | 'unified';          // Тип ставки
  placement_types?: ('search' | 'recommendations')[];  // Только для ручной
}): Promise<number>  // Возвращает ID кампании
```

**Лимит запросов**: 5 запр/мин (интервал 12с)

**Параметры**:
| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `name` | string | Нет | Название кампании |
| `nms` | number[] | Да | Артикулы WB (макс. 50) |
| `bid_type` | string | Нет | `manual` или `unified` (по умолч.: `manual`) |
| `placement_types` | string[] | Нет | Для ручной: `search`, `recommendations` |

**Пример**:
```typescript
const campaignId = await sdk.promotion.createSeacatSaveAd({
  name: 'Зимняя коллекция 2024',
  nms: [168120815, 173574852],
  bid_type: 'manual',
  placement_types: ['search']
});

console.log(`Создана кампания: ${campaignId}`);
```

---

### createBidsMin()

Возвращает минимальные ставки для карточек товаров.

```typescript
async createBidsMin(data: {
  advert_id: number;                                    // ID кампании
  nm_ids: number[];                                     // Артикулы WB
  payment_type: 'cpm' | 'cpc';                         // Тип оплаты
  placement_types: ('combined' | 'search' | 'recommendation')[];
}): Promise<{
  bids: {
    bids: { type: PlacementType; value: number }[];
    nm_id: number;
  }[];
}>
```

**Лимит запросов**: 20 запр/мин (интервал 3с)

**Параметры**:
| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `advert_id` | number | Да | ID кампании |
| `nm_ids` | number[] | Да | Артикулы WB |
| `payment_type` | string | Да | `cpm` (за 1000 показов) или `cpc` (за клик) |
| `placement_types` | string[] | Да | `combined`, `search`, `recommendation` |

---

## Управление кампаниями

### getAdvStart()

Запускает кампанию. Работает для кампаний в статусе 4 (готова) или 11 (пауза).

```typescript
async getAdvStart(options?: { id: number }): Promise<unknown>
```

**Лимит запросов**: 5 запр/сек (интервал 200мс)

**Требования**:
- Кампания должна быть в статусе `4` или `11`
- У кампании должен быть бюджет

---

### getAdvPause()

Ставит кампанию на паузу. Работает только для кампаний в статусе 9 (активна).

```typescript
async getAdvPause(options?: { id: number }): Promise<unknown>
```

**Требования**:
- Кампания должна быть в статусе `9` (активна)

---

### getAdvStop()

Останавливает/завершает кампанию. Работает для статусов 4, 9 или 11.

```typescript
async getAdvStop(options?: { id: number }): Promise<unknown>
```

**Требования**:
- Кампания должна быть в статусе `4`, `9` или `11`

---

### getAdvDelete()

Удаляет кампанию. Работает только для статуса 4 (готова).

```typescript
async getAdvDelete(options?: { id: number }): Promise<unknown>
```

**Требования**:
- Кампания должна быть в статусе `4` (готова)
- После удаления кампания будет в статусе `-1` 3-10 минут

---

### createAdvRename()

Переименовывает кампанию. Можно выполнить в любой момент.

```typescript
async createAdvRename(data?: {
  advertId: number;
  name: string;
}): Promise<unknown>
```

---

## Управление ставками

### updateAdvBid()

Обновляет ставки для кампаний с единой ставкой.

```typescript
async updateAdvBid(data: {
  bids: {
    advert_id: number;
    bid: number;        // CPM ставка в рублях
  }[];
}): Promise<void>
```

**Требования**:
- Кампания в статусе `4`, `9` или `11`
- Тип ставки — единая (unified)

---

### updateAuctionBid()

Обновляет ставки для кампаний с ручной ставкой.

```typescript
async updateAuctionBid(data: {
  bids: {
    advert_id: number;
    nm_bids: {
      nm_id: number;
      bid: number;
      placement: 'search' | 'recommendations' | 'combined';
    }[];
  }[];
}): Promise<{
  bids: {
    advert_id: number;
    nm_bids: { nm_id: number; bid: number; placement: string }[];
  }[];
}>
```

**Требования**:
- Кампания в статусе `4`, `9` или `11`
- Тип ставки — ручная (manual)

**Пример**:
```typescript
await sdk.promotion.updateAuctionBid({
  bids: [{
    advert_id: 32129132,
    nm_bids: [{
      nm_id: 168120815,
      bid: 280,
      placement: 'search'
    }]
  }]
});
```

---

## Финансовые операции

### getAdvBalance()

Возвращает баланс рекламного кабинета.

```typescript
async getAdvBalance(): Promise<{
  balance?: number;    // Баланс взаиморасчёта
  net?: number;        // Баланс кабинета (можно пополнить)
  bonus?: number;      // Бонусный баланс
  cashbacks?: {
    sum?: number;
    percent?: number;
    expiration_date?: string;
  }[];
}>
```

**Лимит запросов**: 1 запр/сек

**Поля ответа**:
| Поле | Тип | Описание |
|------|-----|----------|
| `balance` | number | Баланс взаиморасчёта |
| `net` | number | Баланс кабинета |
| `bonus` | number | Бонусный баланс |
| `cashbacks` | array | Активные предложения кэшбэка |

---

### getAdvBudget()

Возвращает информацию о бюджете кампании.

```typescript
async getAdvBudget(options?: { id: number }): Promise<{
  cash?: number;       // Из наличных пополнений
  netting?: number;    // Из взаиморасчёта
  total?: number;      // Общий бюджет
}>
```

**Лимит запросов**: 4 запр/сек (интервал 250мс)

---

### createBudgetDeposit()

Пополняет бюджет кампании.

```typescript
async createBudgetDeposit(
  data: {
    sum?: number;              // Сумма пополнения
    cashback_sum?: number;     // Сумма кэшбэка (опционально)
    cashback_percent?: number; // Процент кэшбэка (опционально)
    type?: number;             // 0=счёт, 1=баланс, 3=бонусы
    return?: boolean;          // Вернуть детали
  },
  options?: { id: number }     // ID кампании
): Promise<ResponseWithReturn>
```

**Лимит запросов**: 1 запр/сек

**Параметры**:
| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `sum` | number | Да | Сумма пополнения |
| `type` | number | Нет | Источник: 0=счёт, 1=баланс (кабинет), 3=бонусы |
| `id` | number | Да | ID кампании (query параметр) |

**Требования**:
- По документации: кампания должна быть в статусе `11` (пауза)
- Тестирование показало, что может работать и для статуса `4`

**Пример**:
```typescript
await sdk.promotion.createBudgetDeposit(
  { sum: 1000, type: 1 },
  { id: 32129132 }
);
```

---

### getAdvUpd()

Возвращает историю затрат за период.

```typescript
async getAdvUpd(options?: {
  from: string;   // Дата начала (YYYY-MM-DD)
  to: string;     // Дата окончания (YYYY-MM-DD)
}): Promise<{
  updNum?: number;
  updTime?: string;
  updSum?: number;
  advertId?: number;
  campName?: string;
  advertType?: number;
  paymentType?: string;
  advertStatus?: number;
}[]>
```

**Лимит запросов**: 1 запр/сек

---

### getAdvPayments()

Возвращает историю пополнений счёта.

```typescript
async getAdvPayments(options?: {
  from?: string;
  to?: string;
}): Promise<{
  id?: number;
  date?: string;
  sum?: number;
  type?: number;
  statusId?: number;
  cardStatus?: string;
}[]>
```

---

## Управление фразами

### getSearchSetPlus()

Управляет активностью фиксированных фраз для кампаний с ручной ставкой.

```typescript
async getSearchSetPlus(options?: {
  id: number;        // ID кампании
  fixed?: boolean;   // true=активировать, false=деактивировать
}): Promise<unknown>
```

**Лимит запросов**: 2 запр/сек (интервал 500мс)

**Требования**:
- Кампания с ручной ставкой
- Кампания должна быть активна (статус 9)

---

### createSearchSetPlu()

Устанавливает или удаляет фиксированные фразы.

```typescript
async createSearchSetPlu(
  data: { pluse?: string[] },    // Фразы для фиксации
  options?: { id: number }       // ID кампании
): Promise<string[]>
```

**Требования**:
- Фразы должны существовать в списке ключевых слов кампании
- Пустой массив удаляет все фиксированные фразы

**Пример**:
```typescript
// Установить фиксированные фразы
await sdk.promotion.createSearchSetPlu(
  { pluse: ['зимняя куртка', 'тёплое пальто'] },
  { id: 32129132 }
);

// Удалить все фиксированные фразы
await sdk.promotion.createSearchSetPlu(
  { pluse: [] },
  { id: 32129132 }
);
```

---

### createSearchSetExcluded()

Устанавливает или удаляет минус-фразы для кампаний с ручной ставкой.

```typescript
async createSearchSetExcluded(
  data: { excluded?: string[] },
  options?: { id: number }
): Promise<unknown>
```

**Требования**:
- Кампания с ручной ставкой
- Кампания должна быть активна (статус 9)
- Максимум 1000 минус-фраз

---

### createAutoSetExcluded()

Устанавливает или удаляет минус-фразы для кампаний с единой ставкой.

```typescript
async createAutoSetExcluded(
  data: { excluded?: string[] },
  options?: { id: number }
): Promise<unknown>
```

**Лимит запросов**: 1 запр/6с

---

## Статистика

### getStatsKeywords()

Возвращает статистику по ключевым словам кампании (макс. 7 дней).

```typescript
async getStatsKeywords(options?: {
  advert_id: number;
  from: string;       // YYYY-MM-DD
  to: string;         // YYYY-MM-DD
}): Promise<{
  keywords?: {
    date: string;
    stats?: {
      keyword: string;
      views: number;
      clicks: number;
      ctr: number;
      sum: number;
    }[];
  }[];
}>
```

**Лимит запросов**: 4 запр/сек (интервал 250мс)

**Требования**:
- Максимальный период: 7 дней
- Данные обновляются каждый час

**Пример**:
```typescript
const stats = await sdk.promotion.getStatsKeywords({
  advert_id: 32129132,
  from: '2024-12-15',
  to: '2024-12-22'
});

stats.keywords?.forEach(day => {
  console.log(`\n${day.date}:`);
  day.stats?.forEach(kw => {
    console.log(`  ${kw.keyword}: ${kw.views} показов, ${kw.sum}₽`);
  });
});
```

---

### getStatWords()

Возвращает статистику по ключевым словам для кампаний с ручной ставкой.

```typescript
async getStatWords(options?: { id: number }): Promise<{
  words?: {
    phrase?: string[];
    strong?: string[];
    excluded?: string[];
    pluse?: string[];
    keywords?: { keyword?: string; count?: number }[];
    fixed?: boolean;
  };
  stat?: {
    advertId?: number;
    keyword?: string;
    views?: number;
    clicks?: number;
    ctr?: number;
    cpc?: number;
    sum?: number;
  }[];
}>
```

---

### getAutoStatWords()

Возвращает статистику по кластерам для кампаний с единой ставкой.

```typescript
async getAutoStatWords(options?: { id: number }): Promise<{
  excluded?: string[];
  clusters?: {
    cluster?: string;
    count?: number;
    keywords?: string[];
  }[];
}>
```

---

### getAdvFullstats()

Возвращает полную статистику кампании.

```typescript
async getAdvFullstats(options?: {
  ids: string;           // ID кампаний через запятую
  beginDate: string;     // YYYY-MM-DD
  endDate: string;       // YYYY-MM-DD
}): Promise<{
  advertId: number;
  views: number;
  clicks: number;
  ctr: number;
  cpc: number;
  sum: number;
  orders: number;
}[]>
```

**Лимит запросов**: 3 запр/мин (интервал 20с)

**Требования**:
- Максимальный период: 31 день
- Кампания в статусе `7`, `9` или `11`

---

## Медиакампании

### getAdvCount()

Возвращает количество медиакампаний.

```typescript
async getAdvCount(): Promise<{
  all?: number;
  adverts?: {
    type?: number;
    status?: number;
    count?: number;
  };
}>
```

**Базовый URL**: `https://advert-media-api.wildberries.ru`
**Лимит запросов**: 10 запр/сек (интервал 100мс)

---

### getAdvAdverts()

Возвращает список медиакампаний.

```typescript
async getAdvAdverts(options?: {
  status?: number;
  type?: number;
  limit?: number;
  offset?: number;
}): Promise<{
  advertId?: number;
  name?: string;
  brand?: string;
  type?: number;
  status?: number;
  createTime?: string;
  endTime?: string;
}[]>
```

---

### getAdvAdvert()

Возвращает детальную информацию о медиакампании.

```typescript
async getAdvAdvert(options?: { id: number }): Promise<{
  advertId?: number;
  name?: string;
  type?: number;
  status?: number;
  extended?: {
    expenses?: number;
    budget?: number;
  };
  items?: {
    id?: number;
    name?: string;
    status?: number;
    budget?: number;
    cpm?: number;
  }[];
}>
```

---

## Календарь акций

### getCalendarPromotions()

Возвращает список акций WB.

```typescript
async getCalendarPromotions(options?: {
  startDateTime: string;
  endDateTime: string;
  allPromo: boolean;
  limit?: number;
  offset?: number;
}): Promise<unknown>
```

**Базовый URL**: `https://dp-calendar-api.wildberries.ru`
**Лимит запросов**: 10 запр/6с (интервал 600мс)

---

### getPromotionsDetails()

Возвращает детальную информацию об акции.

```typescript
async getPromotionsDetails(options?: {
  promotionIDs: string;   // ID акций через запятую
}): Promise<unknown>
```

---

### getPromotionsNomenclatures()

Возвращает товары, подходящие для участия в акции.

```typescript
async getPromotionsNomenclatures(options?: {
  promotionID: number;
  inAction: boolean;
  limit?: number;
  offset?: number;
}): Promise<unknown>
```

---

### createPromotionsUpload()

Создаёт задание на добавление товара в акцию.

```typescript
async createPromotionsUpload(): Promise<unknown>
```

---

## Конфигурация

### getAdvConfig()

Возвращает конфигурационные значения Продвижения.

```typescript
async getAdvConfig(): Promise<{
  categories?: {
    id: number;
    name: string;
    cpm_min: number;
    cpc_min: number;
  }[];
  config?: {
    description?: string;
    name?: string;
    value?: string;
  }[];
}>
```

**Лимит запросов**: 1 запр/мин

---

## Обработка ошибок

Все методы могут выбрасывать следующие ошибки:

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError
} from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.getAdvStart({ id: 12345 });
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Неверный API ключ или недостаточно прав
  }
  if (error instanceof RateLimitError) {
    // Слишком много запросов, подождите error.retryAfter мс
  }
  if (error instanceof ValidationError) {
    // Неверные параметры или состояние кампании
  }
  if (error instanceof NetworkError) {
    // Проблема с сетевым подключением
  }
}
```

---

## Справочник статусов кампаний

| Код | Название | Описание |
|-----|----------|----------|
| `-1` | Удаляется | Кампания в процессе удаления (3-10 мин) |
| `4` | Готова | Готова к запуску |
| `7` | Завершена | Кампания завершена |
| `8` | Отменена | Кампания отменена |
| `9` | Активна | Кампания работает |
| `11` | На паузе | Кампания приостановлена |

---

## Сводка лимитов запросов

| Категория | Лимит |
|-----------|-------|
| Большинство GET операций | 5 запр/сек |
| Статистика | 1-4 запр/мин |
| Создание кампаний | 5 запр/мин |
| Бюджетные операции | 1 запр/сек |
| Конфигурация | 1 запр/мин |
| Медиакампании | 10 запр/сек |
| Календарь акций | 10 запр/6с |

---

## См. также

- [Руководство по рекламе](/ru/guides/promotion-advertising) - Примеры использования
- [Обработка ошибок](/api/classes/WBAPIError) - Справочник классов ошибок
- [Конфигурация SDK](/api/interfaces/SDKConfig) - Параметры настройки SDK

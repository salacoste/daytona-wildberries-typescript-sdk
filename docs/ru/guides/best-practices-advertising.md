---
title: "Лучшие практики работы с рекламными кампаниями"
description: "Полное руководство по эффективному управлению рекламными кампаниями на Wildberries — жизненный цикл кампаний, оптимизация бюджета, стратегии ставок, управление ключевыми словами и мониторинг эффективности"
layout: doc
---

# Лучшие практики работы с рекламными кампаниями

Полное руководство по эффективному управлению рекламными кампаниями на Wildberries через SDK.

## Целевая аудитория

**Для кого этот гайд:**
- Разработчики e-commerce платформ
- Маркетологи-аналитики с техническим бэкграундом
- Интеграторы рекламных инструментов

## Требования

- Базовое знание Wildberries SDK
- Понимание рекламных кампаний на маркетплейсах
- Опыт работы с асинхронным TypeScript

## Время чтения

Приблизительно **30 минут**

---

## Архитектура рекламных кампаний

### Типы кампаний

Wildberries использует систему типов для различных версий рекламных кампаний:

| Тип | Статус | Описание |
|-----|--------|----------|
| `4-8` | Устаревшие | Старые версии API, не рекомендуются для новых кампаний |
| `9` | Актуальный | Текущая версия с полным функционалом |

::: tip Совет
Всегда используйте тип `9` для новых кампаний. Старые типы поддерживаются только для обратной совместимости.
:::

### Статусы кампаний

```typescript
enum CampaignStatus {
  READY = 4,        // Готова к запуску
  COMPLETED = 7,    // Завершена
  CANCELED = 8,     // Отменена
  ACTIVE = 9,       // Активна и показывается
  PAUSED = 11,      // На паузе
  DELETING = -1     // В процессе удаления
}
```

### Типы ставок

**Ручная ставка (Auction Bid):**
- Индивидуальные ставки для каждого товара
- Разные ставки для размещений (поиск/рекомендации)
- Максимальная гибкость и контроль
- Требует больше времени на управление

**Единая ставка (CPM):**
- Одна ставка для всех товаров кампании
- Автоматическое распределение бюджета
- Проще в управлении
- Подходит для однородного ассортимента

### Типы размещения

```typescript
enum PlacementType {
  SEARCH = 6,           // Поиск (каталог + карточка товара)
  RECOMMENDATIONS = 8,  // Рекомендации (автопродвижение)
  COMBINED = 9          // Комбинированное (поиск + рекомендации)
}
```

### Диаграмма переходов статусов

```
     [Создание]
         |
         v
    [READY (4)]
         |
         +---> [createAdvStart] ---> [ACTIVE (9)]
         |                               |
         +---> [createAdvPause] -------->+---> [PAUSED (11)]
                                         |         |
                                         |         +---> [createAdvStart] ---> [ACTIVE (9)]
                                         |
                                         +---> [createAdvStop] ---> [COMPLETED (7)]
                                         |
                                         +---> [createAdvDelete] ---> [DELETING (-1)]
```

::: warning Важно
Переходы между статусами имеют строгие правила. Например, нельзя удалить активную кампанию без предварительной паузы.
:::

---

## Жизненный цикл кампании

### Чек-лист перед запуском

Перед созданием кампании убедитесь:

- [ ] У вас есть товары с достаточным остатком
- [ ] Товары имеют качественные фото и описание
- [ ] Определены целевые ключевые слова
- [ ] Рассчитан начальный бюджет (минимум 1000₽)
- [ ] Выбрана стратегия ставок
- [ ] Настроены лимиты расхода

### Создание кампании

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

async function createCampaign() {
  try {
    // Шаг 1: Создание кампании (статус READY)
    const campaign = await sdk.promotion.createSeacatSaveAd({
      type: 9,              // Актуальная версия API
      name: 'Летняя коллекция 2024',
      subjectId: 566,       // ID категории
      nms: [123456, 789012], // Артикулы товаров

      // Параметры размещения
      params: [{
        subjectId: 566,
        sets: [6, 8],       // Поиск + рекомендации
        active: true
      }],

      // Настройки кампании
      dailyBudget: 5000,    // Дневной бюджет в копейках (50₽)
      unitedParams: [{
        subjectId: 566,
        sets: [6, 8],
        bid: 200            // CPM ставка 2₽
      }]
    });

    console.log('Кампания создана:', campaign.advertId);
    console.log('Статус:', campaign.status); // 4 (READY)

    return campaign;

  } catch (error) {
    console.error('Ошибка создания кампании:', error);
    throw error;
  }
}
```

### Последовательность запуска

```typescript
async function launchCampaign(advertId: number) {
  try {
    // Шаг 2: Пополнение бюджета (минимум 1000₽)
    console.log('Пополнение бюджета...');
    await sdk.promotion.createBudgetDeposit(
      { sum: 100000, return: false }, // 1000₽
      { id: advertId }
    );

    // Ждем обновления статуса на PAUSED (11)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Шаг 3: Запуск кампании
    console.log('Запуск кампании...');
    await sdk.promotion.createAdvStart({ id: advertId });

    // Шаг 4: Проверка статуса
    const campaigns = await sdk.promotion.getAdvCount();
    const activeCampaign = campaigns.adverts.find(
      a => a.advertId === advertId
    );

    if (activeCampaign?.status === 9) {
      console.log('✓ Кампания успешно запущена');
      return true;
    } else {
      console.warn('⚠ Статус кампании:', activeCampaign?.status);
      return false;
    }

  } catch (error) {
    console.error('Ошибка запуска:', error);
    throw error;
  }
}
```

::: danger Критично
После пополнения бюджета кампания автоматически переходит в статус PAUSED (11). Необходимо явно вызвать `createAdvStart()` для активации.
:::

### Мониторинг активной кампании

```typescript
async function monitorCampaign(advertId: number) {
  // Получение текущего состояния
  const campaigns = await sdk.promotion.getAdvCount();
  const campaign = campaigns.adverts.find(a => a.advertId === advertId);

  if (!campaign) {
    throw new Error('Кампания не найдена');
  }

  console.log('Статус кампании:', {
    id: campaign.advertId,
    name: campaign.name,
    status: campaign.status,
    type: campaign.type,
    changeTime: campaign.changeTime
  });

  // Проверка бюджета
  const budget = await sdk.promotion.getAdvBudget({ id: advertId });
  console.log('Бюджет:', {
    balance: budget.balance / 100, // В рублях
    dailyBudget: budget.dailyBudget / 100
  });

  // Получение статистики за сегодня
  const today = new Date().toISOString().split('T')[0];
  const stats = await sdk.promotion.getAdvFullstats({
    id: [advertId],
    dates: { from: today, to: today }
  });

  if (stats.length > 0) {
    const todayStats = stats[0];
    console.log('Статистика за сегодня:', {
      views: todayStats.views,
      clicks: todayStats.clicks,
      ctr: ((todayStats.clicks / todayStats.views) * 100).toFixed(2) + '%',
      spent: todayStats.sum / 100, // В рублях
      orders: todayStats.orders,
      cr: ((todayStats.orders / todayStats.clicks) * 100).toFixed(2) + '%'
    });
  }
}
```

### Пауза, остановка и удаление

```typescript
async function manageCampaignLifecycle(advertId: number) {
  // Пауза (можно возобновить)
  await sdk.promotion.createAdvPause({ id: advertId });
  console.log('Кампания на паузе (статус 11)');

  // Возобновление с паузы
  await sdk.promotion.createAdvStart({ id: advertId });
  console.log('Кампания возобновлена (статус 9)');

  // Остановка (завершение кампании)
  await sdk.promotion.createAdvStop({ id: advertId });
  console.log('Кампания остановлена (статус 7)');

  // Удаление (только для статуса 4 - READY)
  // Если кампания активна, сначала нужно остановить
  const campaigns = await sdk.promotion.getAdvCount();
  const campaign = campaigns.adverts.find(a => a.advertId === advertId);

  if (campaign?.status !== 4) {
    console.log('Сначала останавливаем кампанию...');
    await sdk.promotion.createAdvStop({ id: advertId });
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await sdk.promotion.createAdvDelete({ id: advertId });
  console.log('Кампания удалена (статус -1)');
}
```

### Правила переходов статусов

| Текущий статус | Доступные действия |
|----------------|-------------------|
| **READY (4)** | `createAdvStart()` → ACTIVE<br>`createAdvDelete()` → DELETING |
| **ACTIVE (9)** | `createAdvPause()` → PAUSED<br>`createAdvStop()` → COMPLETED<br>Добавление фраз (только в этом статусе) |
| **PAUSED (11)** | `createAdvStart()` → ACTIVE<br>`createAdvStop()` → COMPLETED<br>Пополнение бюджета |
| **COMPLETED (7)** | Только просмотр статистики |

::: warning Важные ограничения
- **Добавление ключевых фраз** возможно только в статусе ACTIVE (9)
- **Пополнение бюджета** переводит кампанию в статус PAUSED (11)
- **Удаление** возможно только для статуса READY (4)
:::

---

## Управление бюджетом

### Проверка баланса рекламного счета

```typescript
async function checkBalance() {
  const balance = await sdk.promotion.getAdvBalance();

  console.log('Баланс рекламного кабинета:', {
    balance: balance.balance / 100, // В рублях
    net: balance.net / 100,
    bonus: balance.bonus / 100
  });

  // Рекомендация по пополнению
  if (balance.balance < 100000) { // Меньше 1000₽
    console.warn('⚠ Рекомендуется пополнить баланс');
  }

  return balance;
}
```

### Пополнение бюджета кампании

```typescript
async function depositToCampaign(
  advertId: number,
  amount: number // В рублях
) {
  try {
    // Конвертация в копейки
    const amountInKopecks = amount * 100;

    // Проверка минимальной суммы
    if (amountInKopecks < 100000) {
      throw new Error('Минимальная сумма пополнения: 1000₽');
    }

    // Пополнение (return: false = безвозвратное)
    await sdk.promotion.createBudgetDeposit(
      {
        sum: amountInKopecks,
        return: false // true = деньги вернутся на счет при остановке
      },
      { id: advertId }
    );

    console.log(`✓ Пополнено ${amount}₽`);
    console.log('⚠ Кампания переведена в статус PAUSED (11)');
    console.log('💡 Вызовите createAdvStart() для возобновления');

    // Проверка нового баланса кампании
    const budget = await sdk.promotion.getAdvBudget({ id: advertId });
    console.log('Новый баланс кампании:', budget.balance / 100, '₽');

  } catch (error) {
    console.error('Ошибка пополнения:', error);
    throw error;
  }
}
```

### Получение бюджета кампании

```typescript
async function getCampaignBudget(advertId: number) {
  const budget = await sdk.promotion.getAdvBudget({ id: advertId });

  const info = {
    balance: budget.balance / 100,           // Текущий баланс
    dailyBudget: budget.dailyBudget / 100,   // Дневной лимит

    // Расчет прогноза
    daysLeft: Math.floor(
      budget.balance / budget.dailyBudget
    ),

    // Предупреждения
    needsRefill: budget.balance < budget.dailyBudget * 3
  };

  if (info.needsRefill) {
    console.warn(`⚠ Баланса хватит на ${info.daysLeft} дней`);
    console.warn('Рекомендуется пополнить для непрерывной работы');
  }

  return info;
}
```

### История операций с бюджетом

```typescript
async function getBudgetHistory(
  from: string, // 'YYYY-MM-DD'
  to: string
) {
  // История изменений бюджета кампаний
  const updates = await sdk.promotion.getAdvUpd({ from, to });

  console.log('История изменений:');
  updates.forEach(update => {
    console.log({
      advertId: update.advertId,
      date: update.date,
      type: update.type,
      sum: update.sum / 100, // В рублях
      updateTime: update.updateTime
    });
  });

  // История платежей
  const payments = await sdk.promotion.getAdvPayments({ from, to });

  console.log('\nИстория платежей:');
  payments.forEach(payment => {
    console.log({
      advertId: payment.advertId,
      date: payment.date,
      sum: payment.sum / 100,
      type: payment.type // Тип операции
    });
  });

  return { updates, payments };
}
```

### Стратегия управления бюджетом

```typescript
async function manageBudgetStrategy(advertId: number) {
  const budget = await sdk.promotion.getAdvBudget({ id: advertId });
  const dailyBudget = budget.dailyBudget;
  const currentBalance = budget.balance;

  // Стратегия 1: Автопополнение при низком балансе
  const minBalance = dailyBudget * 7; // Неделя работы

  if (currentBalance < minBalance) {
    console.log('Баланс низкий, требуется пополнение');

    // Ставим на паузу перед пополнением
    await sdk.promotion.createAdvPause({ id: advertId });

    // Пополняем на 2 недели работы
    const refillAmount = dailyBudget * 14;
    await sdk.promotion.createBudgetDeposit(
      { sum: refillAmount, return: false },
      { id: advertId }
    );

    // Возобновляем кампанию
    await sdk.promotion.createAdvStart({ id: advertId });

    console.log('✓ Автопополнение выполнено');
  }

  // Стратегия 2: Динамическое изменение дневного бюджета
  const today = new Date().toISOString().split('T')[0];
  const stats = await sdk.promotion.getAdvFullstats({
    id: [advertId],
    dates: { from: today, to: today }
  });

  if (stats.length > 0) {
    const todayStats = stats[0];
    const roi = todayStats.orders > 0
      ? (todayStats.sum_price / todayStats.sum)
      : 0;

    if (roi > 2.0) {
      // Хорошая доходность - увеличиваем бюджет
      console.log('ROI высокий, рекомендуется увеличить бюджет');
    } else if (roi < 1.0) {
      // Убыточная кампания - уменьшаем бюджет
      console.log('ROI низкий, рекомендуется уменьшить бюджет');
    }
  }
}
```

::: tip Лучшая практика
Всегда ставьте кампанию на паузу (`createAdvPause`) перед пополнением бюджета, даже если она уже активна. Это предотвращает потенциальные ошибки синхронизации.
:::

---

## Оптимизация ставок

### Минимальные ставки по товарам

```typescript
async function getMinimumBids(
  advertId: number,
  nmIds: number[],      // Артикулы товаров
  paymentType: number,  // 1 = CPM, 2 = CPC
  placementTypes: number[] // [6, 8] = поиск + рекомендации
) {
  const minBids = await sdk.promotion.createBidsMin({
    advert_id: advertId,
    nm_ids: nmIds,
    payment_type: paymentType,
    placement_types: placementTypes
  });

  console.log('Минимальные ставки:');
  minBids.forEach(bid => {
    console.log({
      nmId: bid.nm_id,
      search: bid.bids.find(b => b.type === 6)?.bid / 100 + '₽',
      recommendations: bid.bids.find(b => b.type === 8)?.bid / 100 + '₽'
    });
  });

  return minBids;
}
```

### Обновление единой ставки (CPM)

```typescript
async function updateUnifiedBid(advertId: number, newBid: number) {
  try {
    // newBid в рублях, конвертируем в копейки
    const bidInKopecks = Math.round(newBid * 100);

    await sdk.promotion.updateAdvBid({
      bids: [{
        id: advertId,
        bid: bidInKopecks
      }]
    });

    console.log(`✓ Единая ставка обновлена: ${newBid}₽`);

    // Проверка применения
    await new Promise(resolve => setTimeout(resolve, 1000));
    const campaigns = await sdk.promotion.getAdvCount();
    const updated = campaigns.adverts.find(a => a.advertId === advertId);

    console.log('Текущая ставка кампании:', updated?.bid / 100, '₽');

  } catch (error) {
    console.error('Ошибка обновления ставки:', error);
    throw error;
  }
}
```

### Обновление ручных ставок (Auction Bid)

```typescript
async function updateAuctionBids(
  advertId: number,
  bidsData: Array<{
    nmId: number;
    searchBid: number;  // В рублях
    recBid: number;     // В рублях
  }>
) {
  // Формирование структуры для API
  const bids = bidsData.map(item => ({
    id: advertId,
    nm: item.nmId,
    cpm: [
      {
        type: 6, // Поиск
        bid: Math.round(item.searchBid * 100)
      },
      {
        type: 8, // Рекомендации
        bid: Math.round(item.recBid * 100)
      }
    ]
  }));

  await sdk.promotion.updateAuctionBid({ bids });

  console.log('✓ Ручные ставки обновлены для товаров:', bidsData.length);

  // Вывод обновленных ставок
  bidsData.forEach(item => {
    console.log(`  Товар ${item.nmId}:`);
    console.log(`    Поиск: ${item.searchBid}₽`);
    console.log(`    Рекомендации: ${item.recBid}₽`);
  });
}
```

### CPM vs CPC: Выбор стратегии

```typescript
async function analyzePaymentStrategy(advertId: number) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const from = sevenDaysAgo.toISOString().split('T')[0];
  const to = new Date().toISOString().split('T')[0];

  const stats = await sdk.promotion.getAdvFullstats({
    id: [advertId],
    dates: { from, to }
  });

  if (stats.length === 0) {
    console.log('Недостаточно данных для анализа');
    return;
  }

  // Агрегирование за неделю
  const totals = stats.reduce((acc, day) => ({
    views: acc.views + day.views,
    clicks: acc.clicks + day.clicks,
    spent: acc.spent + day.sum
  }), { views: 0, clicks: 0, spent: 0 });

  const avgCTR = (totals.clicks / totals.views) * 100;
  const avgCPC = totals.spent / totals.clicks / 100; // В рублях

  console.log('Анализ за 7 дней:');
  console.log(`  CTR: ${avgCTR.toFixed(2)}%`);
  console.log(`  CPC: ${avgCPC.toFixed(2)}₽`);
  console.log(`  Показы: ${totals.views}`);
  console.log(`  Клики: ${totals.clicks}`);

  // Рекомендация
  if (avgCTR > 2.0) {
    console.log('\n💡 Рекомендация: CPM');
    console.log('   Высокий CTR - выгоднее платить за показы');
  } else if (avgCTR < 0.5) {
    console.log('\n💡 Рекомендация: CPC');
    console.log('   Низкий CTR - безопаснее платить за клики');
  } else {
    console.log('\n💡 Рекомендация: A/B тестирование');
    console.log('   Создайте две кампании для сравнения');
  }

  return { avgCTR, avgCPC, totals };
}
```

### Динамическая оптимизация ставок

```typescript
async function optimizeBids(advertId: number) {
  // Получение текущих ставок и статистики
  const today = new Date().toISOString().split('T')[0];
  const stats = await sdk.promotion.getAdvFullstats({
    id: [advertId],
    dates: { from: today, to: today }
  });

  if (stats.length === 0) {
    console.log('Нет данных за сегодня');
    return;
  }

  const todayStats = stats[0];
  const ctr = (todayStats.clicks / todayStats.views) * 100;
  const cpc = todayStats.sum / todayStats.clicks / 100;
  const roi = todayStats.orders > 0
    ? (todayStats.sum_price / todayStats.sum)
    : 0;

  console.log('Текущие показатели:');
  console.log(`  CTR: ${ctr.toFixed(2)}%`);
  console.log(`  CPC: ${cpc.toFixed(2)}₽`);
  console.log(`  ROI: ${roi.toFixed(2)}`);

  // Стратегия оптимизации
  const campaigns = await sdk.promotion.getAdvCount();
  const campaign = campaigns.adverts.find(a => a.advertId === advertId);
  const currentBid = campaign?.bid || 0;

  let newBid = currentBid;

  if (roi > 3.0 && ctr > 2.0) {
    // Отличные показатели - увеличиваем ставку на 20%
    newBid = Math.round(currentBid * 1.2);
    console.log(`\n✓ Увеличиваем ставку на 20%: ${newBid / 100}₽`);

  } else if (roi < 1.0 || ctr < 0.5) {
    // Плохие показатели - уменьшаем ставку на 15%
    newBid = Math.round(currentBid * 0.85);
    console.log(`\n↓ Уменьшаем ставку на 15%: ${newBid / 100}₽`);

  } else {
    console.log('\n→ Ставка оптимальна, изменения не требуются');
    return;
  }

  // Применение новой ставки
  await sdk.promotion.updateAdvBid({
    bids: [{ id: advertId, bid: newBid }]
  });

  console.log('✓ Ставка обновлена автоматически');
}
```

::: tip Стратегия ставок
**Для новых кампаний:**
1. Начните с минимальной ставки + 10%
2. Мониторьте CTR первые 3 дня
3. Увеличивайте постепенно (по 10-15%) если ROI > 2.0
4. Уменьшайте при ROI < 1.0

**Для стабильных кампаний:**
- Оптимизируйте раз в неделю
- Избегайте резких изменений (>25%)
- Анализируйте тренды за 7-14 дней
:::

---

## Управление ключевыми словами

### Добавление минус-фраз (Search)

```typescript
async function addSearchExcludedKeywords(
  advertId: number,
  keywords: string[]
) {
  try {
    // Важно: кампания должна быть в статусе ACTIVE (9)
    const campaigns = await sdk.promotion.getAdvCount();
    const campaign = campaigns.adverts.find(a => a.advertId === advertId);

    if (campaign?.status !== 9) {
      throw new Error(
        'Кампания должна быть активна (статус 9) для добавления фраз'
      );
    }

    await sdk.promotion.createSearchSetExcluded({
      id: advertId,
      excluded: keywords
    });

    console.log(`✓ Добавлено ${keywords.length} минус-фраз:`, keywords);

  } catch (error) {
    console.error('Ошибка добавления минус-фраз:', error);
    throw error;
  }
}
```

### Добавление минус-фраз (Auto)

```typescript
async function addAutoExcludedKeywords(
  advertId: number,
  keywords: string[]
) {
  await sdk.promotion.createAutoSetExcluded({
    id: advertId,
    excluded: keywords
  });

  console.log(`✓ Минус-фразы для автопродвижения:`, keywords);
}
```

### Добавление ключевых фраз

```typescript
async function addSearchKeywords(
  advertId: number,
  keywords: Array<{
    keyword: string;
    excluded?: boolean; // false = добавить, true = исключить
  }>
) {
  const pluse = keywords
    .filter(k => !k.excluded)
    .map(k => k.keyword);

  await sdk.promotion.createSearchSetPlu({
    id: advertId,
    pluse // Именно 'pluse' (опечатка в API WB)
  });

  console.log(`✓ Добавлено ${pluse.length} ключевых фраз`);
}
```

### Получение списка ключевых фраз

```typescript
async function getSearchKeywords(advertId: number) {
  const keywords = await sdk.promotion.getSearchSetPlus({
    id: advertId
  });

  console.log('Ключевые фразы:');
  keywords.forEach(kw => {
    console.log(`  "${kw.keyword}" - ${kw.count} товаров`);
  });

  return keywords;
}
```

### Управление товарами в автопродвижении

```typescript
async function manageAutoPromotionItems(advertId: number) {
  // Получение доступных для добавления товаров
  const available = await sdk.promotion.getAutoGetnmtoadd({
    id: advertId
  });

  console.log('Доступно для добавления:', available.nms.length, 'товаров');

  if (available.nms.length > 0) {
    // Добавление товаров
    await sdk.promotion.createAutoUpdatenm({
      id: advertId,
      nms: available.nms.slice(0, 10) // Добавляем первые 10
    });

    console.log('✓ Добавлено 10 товаров в автопродвижение');
  }
}
```

### Стратегия работы с ключевыми словами

```typescript
async function keywordStrategy(advertId: number) {
  // Шаг 1: Анализ статистики по ключевым словам
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const from = weekAgo.toISOString().split('T')[0];
  const to = new Date().toISOString().split('T')[0];

  const keywordStats = await sdk.promotion.getStatsKeywords({
    id: [advertId],
    dates: { from, to }
  });

  // Группировка по фразам
  const phrasePerformance = new Map<string, {
    clicks: number;
    views: number;
    orders: number;
    spent: number;
  }>();

  keywordStats.forEach(stat => {
    stat.keywords.forEach(kw => {
      const existing = phrasePerformance.get(kw.keyword) || {
        clicks: 0, views: 0, orders: 0, spent: 0
      };

      phrasePerformance.set(kw.keyword, {
        clicks: existing.clicks + kw.clicks,
        views: existing.views + kw.views,
        orders: existing.orders + kw.orders,
        spent: existing.spent + kw.sum
      });
    });
  });

  // Анализ эффективности
  const ineffective: string[] = [];
  const effective: string[] = [];

  phrasePerformance.forEach((stats, keyword) => {
    const ctr = (stats.clicks / stats.views) * 100;
    const roi = stats.orders > 0 ? (stats.spent / stats.orders) : 0;

    if (ctr < 0.3 && stats.views > 1000) {
      // Низкий CTR при большом количестве показов
      ineffective.push(keyword);
    } else if (roi > 2.0 && stats.orders > 5) {
      // Высокий ROI
      effective.push(keyword);
    }
  });

  console.log('\nАнализ ключевых слов:');
  console.log(`  Эффективных: ${effective.length}`);
  console.log(`  Неэффективных: ${ineffective.length}`);

  // Добавление неэффективных в минус-фразы
  if (ineffective.length > 0) {
    console.log('\nДобавление в минус-фразы:', ineffective);
    await sdk.promotion.createSearchSetExcluded({
      id: advertId,
      excluded: ineffective
    });
  }

  return { effective, ineffective, phrasePerformance };
}
```

::: danger Критично
Добавление ключевых фраз возможно **ТОЛЬКО** когда кампания в статусе **ACTIVE (9)**. Попытка добавить фразы в другом статусе приведет к ошибке.
:::

---

## Статистика кампаний

### Полная статистика кампании

```typescript
async function getFullCampaignStats(
  advertIds: number[],
  from: string,
  to: string
) {
  // Лимит: 3 запроса в минуту, интервал 20 секунд
  const stats = await sdk.promotion.getAdvFullstats({
    id: advertIds,
    dates: { from, to }
  });

  console.log(`Статистика за ${from} - ${to}:`);

  stats.forEach(dayStat => {
    console.log(`\n${dayStat.date}:`);
    console.log(`  Показы: ${dayStat.views.toLocaleString()}`);
    console.log(`  Клики: ${dayStat.clicks.toLocaleString()}`);
    console.log(`  CTR: ${((dayStat.clicks / dayStat.views) * 100).toFixed(2)}%`);
    console.log(`  Расход: ${(dayStat.sum / 100).toFixed(2)}₽`);
    console.log(`  Заказы: ${dayStat.orders}`);
    console.log(`  CR: ${((dayStat.orders / dayStat.clicks) * 100).toFixed(2)}%`);
    console.log(`  Выручка: ${(dayStat.sum_price / 100).toFixed(2)}₽`);
    console.log(`  ROI: ${(dayStat.sum_price / dayStat.sum).toFixed(2)}`);
  });

  return stats;
}
```

### Статистика по ключевым словам

```typescript
async function getKeywordStatistics(
  advertIds: number[],
  from: string,
  to: string
) {
  // Лимит: 240 запросов в минуту
  const keywordStats = await sdk.promotion.getStatsKeywords({
    id: advertIds,
    dates: { from, to }
  });

  console.log('Статистика по ключевым словам:');

  keywordStats.forEach(campaignStat => {
    console.log(`\nКампания ${campaignStat.advertId} (${campaignStat.date}):`);

    // Сортировка по кликам
    const sorted = campaignStat.keywords.sort((a, b) => b.clicks - a.clicks);

    sorted.slice(0, 10).forEach(kw => {
      const ctr = ((kw.clicks / kw.views) * 100).toFixed(2);
      const cpc = (kw.sum / kw.clicks / 100).toFixed(2);

      console.log(`  "${kw.keyword}"`);
      console.log(`    Показы: ${kw.views}, Клики: ${kw.clicks}`);
      console.log(`    CTR: ${ctr}%, CPC: ${cpc}₽`);
      console.log(`    Заказы: ${kw.orders}, Расход: ${(kw.sum / 100).toFixed(2)}₽`);
    });
  });

  return keywordStats;
}
```

### Статистика поисковых фраз

```typescript
async function getSearchPhraseStats(
  advertIds: number[],
  from: string,
  to: string
) {
  const stats = await sdk.promotion.getStatWords({
    id: advertIds,
    dates: { from, to }
  });

  console.log('Поисковые фразы:');

  stats.forEach(campaignStat => {
    console.log(`\nКампания ${campaignStat.advertId}:`);

    campaignStat.words.forEach(word => {
      console.log(`  Фраза: "${word.keyword}"`);
      console.log(`    Показы: ${word.views}`);
      console.log(`    Клики: ${word.clicks}`);
      console.log(`    Частота: ${word.freq}`);
    });
  });

  return stats;
}
```

### Статистика автопродвижения

```typescript
async function getAutoPromotionStats(
  advertIds: number[],
  from: string,
  to: string
) {
  const stats = await sdk.promotion.getAutoStatWords({
    id: advertIds,
    dates: { from, to }
  });

  console.log('Автопродвижение - статистика:');

  stats.forEach(campaignStat => {
    console.log(`\nКампания ${campaignStat.advertId}:`);

    campaignStat.words.forEach(word => {
      console.log(`  "${word.keyword}"`);
      console.log(`    Показы: ${word.views}, Клики: ${word.clicks}`);
    });
  });

  return stats;
}
```

### Детализация по SKU

```typescript
async function getSKUBreakdown(
  advertId: number,
  from: string,
  to: string
) {
  const stats = await sdk.promotion.getAdvFullstats({
    id: [advertId],
    dates: { from, to }
  });

  // Группировка по товарам
  const skuPerformance = new Map<number, {
    views: number;
    clicks: number;
    orders: number;
    spent: number;
    revenue: number;
  }>();

  stats.forEach(dayStat => {
    dayStat.nm?.forEach(nm => {
      const existing = skuPerformance.get(nm.nmId) || {
        views: 0, clicks: 0, orders: 0, spent: 0, revenue: 0
      };

      skuPerformance.set(nm.nmId, {
        views: existing.views + nm.views,
        clicks: existing.clicks + nm.clicks,
        orders: existing.orders + nm.orders,
        spent: existing.spent + nm.sum,
        revenue: existing.revenue + nm.sum_price
      });
    });
  });

  console.log('Эффективность по товарам:');

  // Сортировка по ROI
  const sorted = Array.from(skuPerformance.entries())
    .sort((a, b) => {
      const roiA = a[1].revenue / a[1].spent;
      const roiB = b[1].revenue / b[1].spent;
      return roiB - roiA;
    });

  sorted.forEach(([nmId, perf]) => {
    const roi = perf.revenue / perf.spent;
    const ctr = ((perf.clicks / perf.views) * 100).toFixed(2);

    console.log(`\nТовар ${nmId}:`);
    console.log(`  CTR: ${ctr}%`);
    console.log(`  Заказов: ${perf.orders}`);
    console.log(`  Расход: ${(perf.spent / 100).toFixed(2)}₽`);
    console.log(`  Выручка: ${(perf.revenue / 100).toFixed(2)}₽`);
    console.log(`  ROI: ${roi.toFixed(2)}`);
  });

  return skuPerformance;
}
```

### Коды платформ

```typescript
enum Platform {
  WEBSITE = 1,      // Основной сайт WB
  ANDROID = 32,     // Android приложение
  IOS = 64          // iOS приложение
}

async function getStatsByPlatform(
  advertId: number,
  from: string,
  to: string
) {
  const stats = await sdk.promotion.getAdvFullstats({
    id: [advertId],
    dates: { from, to }
  });

  const platformStats = {
    website: { views: 0, clicks: 0, orders: 0 },
    android: { views: 0, clicks: 0, orders: 0 },
    ios: { views: 0, clicks: 0, orders: 0 }
  };

  stats.forEach(dayStat => {
    dayStat.apps?.forEach(app => {
      switch (app.appType) {
        case 1:
          platformStats.website.views += app.views;
          platformStats.website.clicks += app.clicks;
          platformStats.website.orders += app.orders;
          break;
        case 32:
          platformStats.android.views += app.views;
          platformStats.android.clicks += app.clicks;
          platformStats.android.orders += app.orders;
          break;
        case 64:
          platformStats.ios.views += app.views;
          platformStats.ios.clicks += app.clicks;
          platformStats.ios.orders += app.orders;
          break;
      }
    });
  });

  console.log('Статистика по платформам:');
  console.log('Сайт:', platformStats.website);
  console.log('Android:', platformStats.android);
  console.log('iOS:', platformStats.ios);

  return platformStats;
}
```

::: tip Rate Limiting
Метод `getAdvFullstats()` имеет строгий лимит: **3 запроса в минуту с интервалом 20 секунд**. Используйте для регулярного мониторинга `getStatsKeywords()` (240 зап/мин).
:::

---

## Маркетплейс-акции Wildberries

### Отличие от рекламных кампаний

**Акции WB** — это маркетинговые мероприятия, организованные самим маркетплейсом (например, "Черная Пятница", "8 Марта"). Это **НЕ** рекламные кампании.

**Ключевые отличия:**
- Акции организует Wildberries, не продавец
- Участие требует соответствия критериям WB
- Скидки устанавливаются по правилам акции
- Доступ через отдельный API (`/promo/*`)

### Календарь акций

```typescript
async function getUpcomingPromotions() {
  const calendar = await sdk.promotion.getCalendarPromotions();

  console.log('Предстоящие акции:');

  calendar.data.promotions.forEach(promo => {
    console.log(`\n${promo.name}`);
    console.log(`  ID: ${promo.id}`);
    console.log(`  Даты: ${promo.startDateTime} - ${promo.endDateTime}`);
    console.log(`  Описание: ${promo.description}`);
  });

  return calendar.data.promotions;
}
```

### Детали акции

```typescript
async function getPromotionDetails(promotionId: number) {
  const details = await sdk.promotion.getPromotionsDetails({
    promotionID: promotionId
  });

  console.log('Детали акции:');
  console.log('  Название:', details.data.name);
  console.log('  Тип:', details.data.type);
  console.log('  Начало:', details.data.startDateTime);
  console.log('  Конец:', details.data.endDateTime);
  console.log('  Описание:', details.data.description);

  return details.data;
}
```

### Номенклатура акции

```typescript
async function getPromotionProducts(promotionId: number) {
  const products = await sdk.promotion.getPromotionsNomenclatures({
    promotionID: promotionId
  });

  console.log(`Товары в акции (всего: ${products.data.total}):`);

  products.data.nomenclatures.forEach(item => {
    console.log(`  Артикул: ${item.nmID}`);
    console.log(`    Размер: ${item.vendorCode}`);
    console.log(`    Скидка: ${item.discount}%`);
    console.log(`    Промокод: ${item.promoCode || 'Нет'}`);
  });

  return products.data.nomenclatures;
}
```

### Загрузка товаров в акцию

```typescript
async function uploadProductsToPromotion(
  promotionId: number,
  products: Array<{
    nm: number;       // Артикул
    stock: number;    // Остаток для акции
    price: number;    // Цена со скидкой (в копейках)
  }>
) {
  try {
    const result = await sdk.promotion.createPromotionsUpload({
      data: {
        promotionID: promotionId,
        nomenclatures: products.map(p => ({
          nm: p.nm,
          stock: p.stock,
          price: p.price
        }))
      }
    });

    console.log('✓ Товары загружены в акцию');
    console.log('Результат:', result);

    return result;

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    throw error;
  }
}
```

### Стратегия участия в акциях

```typescript
async function participateInPromotion(promotionId: number) {
  // Шаг 1: Получение деталей акции
  const details = await sdk.promotion.getPromotionsDetails({
    promotionID: promotionId
  });

  console.log('Акция:', details.data.name);
  console.log('Период:', details.data.startDateTime, '-', details.data.endDateTime);

  // Шаг 2: Проверка номенклатуры
  const existingProducts = await sdk.promotion.getPromotionsNomenclatures({
    promotionID: promotionId
  });

  console.log('Уже участвует товаров:', existingProducts.data.total);

  // Шаг 3: Анализ складских остатков
  // (используйте API складов для проверки наличия)

  // Шаг 4: Расчет скидки
  const requiredDiscount = 20; // Пример: акция требует минимум 20%

  // Шаг 5: Формирование списка товаров
  const productsToAdd = [
    {
      nm: 123456,
      stock: 100,
      price: Math.round(1000 * 100 * (1 - requiredDiscount / 100)) // Цена - 20%
    },
    // ... другие товары
  ];

  // Шаг 6: Загрузка
  await uploadProductsToPromotion(promotionId, productsToAdd);

  console.log('✓ Участие в акции оформлено');
}
```

::: warning Различие API
Методы работы с акциями находятся в `/promo/*` эндпоинтах, а рекламные кампании — в `/adv/*`. Не путайте эти два разных функционала.
:::

---

## Стратегия Rate Limiting

### Таблица лимитов

| Метод | Лимит | Интервал | Всплеск |
|-------|-------|----------|---------|
| `getAdvFullstats` | 3 зап/мин | 20 сек | 3 |
| `getStatsKeywords` | 240 зап/мин | - | 240 |
| `createSeacatSaveAd` | 1 зап/мин | 60 сек | 1 |
| `createBudgetDeposit` | 10 зап/мин | 6 сек | 10 |
| `updateAdvBid` | 60 зап/мин | 1 сек | 60 |
| `createSearchSetExcluded` | 30 зап/мин | 2 сек | 30 |
| `getAdvCount` | 60 зап/мин | 1 сек | 60 |

### Обработка RateLimitError

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

async function handleRateLimiting<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await operation();

    } catch (error) {
      if (error instanceof RateLimitError) {
        attempt++;
        const waitTime = error.retryAfter || 20000; // По умолчанию 20 сек

        console.warn(
          `Rate limit достигнут. Ожидание ${waitTime / 1000}с ` +
          `(попытка ${attempt}/${maxRetries})`
        );

        if (attempt >= maxRetries) {
          throw new Error('Превышено количество попыток');
        }

        await new Promise(resolve => setTimeout(resolve, waitTime));

      } else {
        throw error;
      }
    }
  }

  throw new Error('Операция не выполнена');
}

// Использование
const stats = await handleRateLimiting(() =>
  sdk.promotion.getAdvFullstats({
    id: [advertId],
    dates: { from, to }
  })
);
```

### Батчинг запросов

```typescript
async function batchCampaignStats(
  advertIds: number[],
  from: string,
  to: string
) {
  // Группируем по 10 кампаний (лимит API)
  const batches: number[][] = [];
  for (let i = 0; i < advertIds.length; i += 10) {
    batches.push(advertIds.slice(i, i + 10));
  }

  const allStats: any[] = [];

  for (const batch of batches) {
    // Ждем 20 секунд между батчами (лимит getAdvFullstats)
    if (allStats.length > 0) {
      console.log('Ожидание 20 секунд...');
      await new Promise(resolve => setTimeout(resolve, 20000));
    }

    const stats = await sdk.promotion.getAdvFullstats({
      id: batch,
      dates: { from, to }
    });

    allStats.push(...stats);
    console.log(`Обработано ${allStats.length}/${advertIds.length} кампаний`);
  }

  return allStats;
}
```

### Приоритизация запросов

```typescript
class RequestQueue {
  private queue: Array<{
    priority: number;
    operation: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  private processing = false;

  async add<T>(
    operation: () => Promise<T>,
    priority: number = 0
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ priority, operation, resolve, reject });
      this.queue.sort((a, b) => b.priority - a.priority);

      if (!this.processing) {
        this.process();
      }
    });
  }

  private async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const item = this.queue.shift()!;

    try {
      const result = await item.operation();
      item.resolve(result);
    } catch (error) {
      item.reject(error);
    }

    // Задержка между запросами
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.process();
  }
}

// Использование
const queue = new RequestQueue();

// Высокий приоритет - проверка баланса
const balance = await queue.add(
  () => sdk.promotion.getAdvBalance(),
  10
);

// Низкий приоритет - статистика
const stats = await queue.add(
  () => sdk.promotion.getAdvFullstats({ id: [123], dates: { from, to } }),
  1
);
```

---

## Обработка ошибок

### Типичные ошибки и решения

```typescript
async function robustCampaignOperation(advertId: number) {
  try {
    await sdk.promotion.createAdvStart({ id: advertId });

  } catch (error: any) {
    // Ошибка 1: Неправильный статус
    if (error.message?.includes('status')) {
      console.error('Ошибка: Кампания не в нужном статусе');
      console.log('Решение: Проверьте текущий статус через getAdvCount()');

      const campaigns = await sdk.promotion.getAdvCount();
      const campaign = campaigns.adverts.find(a => a.advertId === advertId);
      console.log('Текущий статус:', campaign?.status);

      // Автоматическое исправление
      if (campaign?.status === 11) {
        console.log('Кампания на паузе, возобновляем...');
        await sdk.promotion.createAdvStart({ id: advertId });
      }
    }

    // Ошибка 2: Недостаточно средств
    if (error.message?.includes('balance') || error.message?.includes('budget')) {
      console.error('Ошибка: Недостаточно средств');
      console.log('Решение: Пополните бюджет кампании');

      const budget = await sdk.promotion.getAdvBudget({ id: advertId });
      console.log('Текущий баланс:', budget.balance / 100, '₽');
      console.log('Требуется минимум:', budget.dailyBudget / 100, '₽');
    }

    // Ошибка 3: Rate limit
    if (error instanceof RateLimitError) {
      console.error('Ошибка: Превышен лимит запросов');
      console.log(`Решение: Подождите ${error.retryAfter / 1000} секунд`);

      await new Promise(resolve => setTimeout(resolve, error.retryAfter));
      return robustCampaignOperation(advertId); // Повтор
    }

    // Ошибка 4: Кампания не найдена
    if (error.status === 404) {
      console.error('Ошибка: Кампания не найдена');
      console.log('Решение: Проверьте ID кампании');
    }

    // Ошибка 5: Неверный API ключ
    if (error.status === 401 || error.status === 403) {
      console.error('Ошибка: Проблемы с авторизацией');
      console.log('Решение: Проверьте API ключ и его права');
    }

    throw error;
  }
}
```

### Паттерн обработки

```typescript
async function safePromotionOperation<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T | null> {
  const maxRetries = 3;
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();

    } catch (error: any) {
      lastError = error;
      console.error(`[${context}] Попытка ${attempt}/${maxRetries} не удалась`);

      // Не повторяем для ошибок валидации
      if (error.status === 400 || error.status === 422) {
        console.error('Ошибка валидации, повтор невозможен');
        break;
      }

      // Не повторяем для ошибок авторизации
      if (error.status === 401 || error.status === 403) {
        console.error('Ошибка авторизации, повтор невозможен');
        break;
      }

      // Ждем перед повтором
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Экспоненциальная задержка
        console.log(`Ожидание ${delay / 1000}с перед повтором...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error(`[${context}] Все попытки исчерпаны:`, lastError);
  return null;
}

// Использование
const result = await safePromotionOperation(
  () => sdk.promotion.createAdvStart({ id: 123 }),
  'Запуск кампании'
);

if (!result) {
  console.error('Не удалось запустить кампанию');
}
```

---

## Полный рабочий пример

Сквозной пример создания и управления рекламной кампанией:

```typescript
import { WildberriesSDK, RateLimitError } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

async function fullCampaignLifecycle() {
  console.log('=== Полный жизненный цикл рекламной кампании ===\n');

  // ШАГ 1: Проверка баланса рекламного счета
  console.log('1. Проверка баланса...');
  const balance = await sdk.promotion.getAdvBalance();
  console.log(`   Баланс: ${balance.balance / 100}₽`);

  if (balance.balance < 500000) {
    console.warn('   ⚠ Низкий баланс. Рекомендуется пополнить счет.');
  }

  // ШАГ 2: Создание кампании
  console.log('\n2. Создание кампании...');
  const campaign = await sdk.promotion.createSeacatSaveAd({
    type: 9,
    name: 'Тестовая кампания - Электроника',
    subjectId: 566,
    nms: [123456, 789012],

    params: [{
      subjectId: 566,
      sets: [6, 8], // Поиск + рекомендации
      active: true
    }],

    dailyBudget: 10000, // 100₽ в день
    unitedParams: [{
      subjectId: 566,
      sets: [6, 8],
      bid: 300 // CPM ставка 3₽
    }]
  });

  const advertId = campaign.advertId;
  console.log(`   ✓ Кампания создана: ID ${advertId}`);
  console.log(`   Статус: ${campaign.status} (READY)`);

  // ШАГ 3: Получение минимальных ставок
  console.log('\n3. Проверка минимальных ставок...');
  const minBids = await sdk.promotion.createBidsMin({
    advert_id: advertId,
    nm_ids: [123456, 789012],
    payment_type: 1, // CPM
    placement_types: [6, 8]
  });

  minBids.forEach(bid => {
    const searchBid = bid.bids.find(b => b.type === 6);
    const recBid = bid.bids.find(b => b.type === 8);
    console.log(`   Товар ${bid.nm_id}:`);
    console.log(`     Поиск: от ${searchBid?.bid / 100}₽`);
    console.log(`     Рекомендации: от ${recBid?.bid / 100}₽`);
  });

  // ШАГ 4: Пополнение бюджета
  console.log('\n4. Пополнение бюджета кампании...');
  await sdk.promotion.createBudgetDeposit(
    { sum: 100000, return: false }, // 1000₽
    { id: advertId }
  );
  console.log('   ✓ Пополнено 1000₽');
  console.log('   Статус автоматически изменен на PAUSED (11)');

  await new Promise(resolve => setTimeout(resolve, 2000));

  // ШАГ 5: Проверка бюджета
  const budget = await sdk.promotion.getAdvBudget({ id: advertId });
  console.log('   Баланс кампании:', budget.balance / 100, '₽');

  // ШАГ 6: Запуск кампании
  console.log('\n5. Запуск кампании...');
  await sdk.promotion.createAdvStart({ id: advertId });
  console.log('   ✓ Кампания запущена (статус ACTIVE - 9)');

  await new Promise(resolve => setTimeout(resolve, 2000));

  // ШАГ 7: Добавление ключевых фраз
  console.log('\n6. Добавление ключевых фраз...');
  await sdk.promotion.createSearchSetPlu({
    id: advertId,
    pluse: ['смартфон', 'телефон', 'мобильный']
  });
  console.log('   ✓ Добавлено 3 ключевых фразы');

  // ШАГ 8: Добавление минус-фраз
  console.log('\n7. Добавление минус-фраз...');
  await sdk.promotion.createSearchSetExcluded({
    id: advertId,
    excluded: ['дешевый', 'китайский', 'подделка']
  });
  console.log('   ✓ Добавлено 3 минус-фразы');

  // ШАГ 9: Ожидание накопления статистики
  console.log('\n8. Ожидание накопления статистики...');
  console.log('   (В реальном сценарии подождите несколько часов)');

  // Имитация
  await new Promise(resolve => setTimeout(resolve, 3000));

  // ШАГ 10: Мониторинг статистики
  console.log('\n9. Получение статистики...');
  const today = new Date().toISOString().split('T')[0];

  try {
    const stats = await sdk.promotion.getAdvFullstats({
      id: [advertId],
      dates: { from: today, to: today }
    });

    if (stats.length > 0) {
      const todayStats = stats[0];
      console.log('   Статистика за сегодня:');
      console.log(`     Показы: ${todayStats.views}`);
      console.log(`     Клики: ${todayStats.clicks}`);
      console.log(`     CTR: ${((todayStats.clicks / todayStats.views) * 100).toFixed(2)}%`);
      console.log(`     Расход: ${(todayStats.sum / 100).toFixed(2)}₽`);
      console.log(`     Заказы: ${todayStats.orders}`);

      if (todayStats.orders > 0) {
        const roi = todayStats.sum_price / todayStats.sum;
        console.log(`     ROI: ${roi.toFixed(2)}`);
      }
    } else {
      console.log('   Нет данных (кампания только запущена)');
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.log('   Rate limit - используем getStatsKeywords');

      const keywordStats = await sdk.promotion.getStatsKeywords({
        id: [advertId],
        dates: { from: today, to: today }
      });

      console.log(`   Статистика по ${keywordStats.length} периодам`);
    }
  }

  // ШАГ 11: Оптимизация ставок
  console.log('\n10. Оптимизация ставок...');

  const campaigns = await sdk.promotion.getAdvCount();
  const currentCampaign = campaigns.adverts.find(a => a.advertId === advertId);
  const currentBid = currentCampaign?.bid || 300;

  // Увеличиваем ставку на 10%
  const newBid = Math.round(currentBid * 1.1);

  await sdk.promotion.updateAdvBid({
    bids: [{ id: advertId, bid: newBid }]
  });

  console.log(`   ✓ Ставка обновлена: ${currentBid / 100}₽ → ${newBid / 100}₽`);

  // ШАГ 12: Пауза кампании
  console.log('\n11. Приостановка кампании...');
  await sdk.promotion.createAdvPause({ id: advertId });
  console.log('   ✓ Кампания на паузе (статус PAUSED - 11)');

  await new Promise(resolve => setTimeout(resolve, 2000));

  // ШАГ 13: Возобновление
  console.log('\n12. Возобновление кампании...');
  await sdk.promotion.createAdvStart({ id: advertId });
  console.log('   ✓ Кампания возобновлена (статус ACTIVE - 9)');

  await new Promise(resolve => setTimeout(resolve, 2000));

  // ШАГ 14: Остановка
  console.log('\n13. Остановка кампании...');
  await sdk.promotion.createAdvStop({ id: advertId });
  console.log('   ✓ Кампания остановлена (статус COMPLETED - 7)');

  console.log('\n=== Жизненный цикл завершен ===');
  console.log(`ID кампании: ${advertId}`);
  console.log('Все операции выполнены успешно');
}

// Запуск примера
fullCampaignLifecycle()
  .then(() => console.log('\n✓ Пример выполнен'))
  .catch(error => console.error('\n✗ Ошибка:', error));
```

---

## Связанные ресурсы

**Дополнительные гайды:**
- [Лучшие практики: Аналитика воронки продаж](./best-practices-sales-funnel.md)
- [Статистика рекламных кампаний: Подробный гайд](./advertising-statistics-guide.md)
- [Promotion API Reference](../api-reference/promotion-advertising.md)
- [Общие лучшие практики SDK](./best-practices.md)
- [Troubleshooting Guide](./troubleshooting.md)

**Официальная документация WB:**
- [Реклама на Wildberries](https://dev.wildberries.ru/)
- [Правила создания рекламных кампаний](https://seller.wildberries.ru/)

---

**Последнее обновление**: 2024-01-19
**Версия SDK**: 2.6.0


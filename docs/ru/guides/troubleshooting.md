---
title: Руководство по устранению неполадок
description: Быстрые решения для распространенных проблем SDK - аутентификация, лимиты запросов, сетевые ошибки, валидация и справочник кодов ошибок
layout: doc
---

# Руководство по устранению неполадок

Быстрые решения для распространенных проблем Wildberries SDK. Это руководство поможет вам диагностировать и решать проблемы быстро, не дожидаясь поддержки.

---

## Содержание

- [Быстрая диагностика](#быстрая-диагностика)
- [Справочник методов](#справочник-методов) ⭐ **Быстрый поиск всех методов SDK**
- [Режим отладки](#режим-отладки)
- [Проблемы аутентификации](#проблемы-аутентификации)
- [Проблемы лимита запросов](#проблемы-лимита-запросов)
- [Проблемы сети](#проблемы-сети)
- [Проблемы валидации](#проблемы-валидации)
- [Общие проблемы](#общие-проблемы)
- [Справочник кодов ошибок](#справочник-кодов-ошибок)
- [Блок-схема устранения неполадок](#блок-схема-устранения-неполадок)
- [Получение помощи](#получение-помощи)

---

## Быстрая диагностика

**Возникли проблемы? Начните отсюда:**

1. **Не можете аутентифицироваться?** → Перейдите к [Проблемы аутентификации](#проблемы-аутентификации)
2. **Достигнут лимит запросов?** → Перейдите к [Проблемы лимита запросов](#проблемы-лимита-запросов)
3. **Сетевые ошибки?** → Перейдите к [Проблемы сети](#проблемы-сети)
4. **Ошибки валидации данных?** → Перейдите к [Проблемы валидации](#проблемы-валидации)
5. **Что-то еще?** → Перейдите к [Общие проблемы](#общие-проблемы)

**Наиболее распространенные проблемы:**
- [Неверный API ключ](#проблема-1-ошибка-аутентификации)
- [Превышен лимит запросов](#проблема-6-429-слишком-много-запросов)
- [Тайм-аут соединения](#проблема-11-etimedout)
- [Ошибка валидации](#проблема-13-ошибка-валидации)
- [Модуль не найден](#проблема-17-модуль-не-найден)

---

## Справочник методов

Таблица быстрого поиска для распространенных операций и их фактических методов SDK. Копируйте эти точные имена методов, чтобы избежать ошибок `TypeError: method is not a function`.

**✅ Проверено на**: SDK v2.5.0 | **Последнее обновление**: 2026-01-18 | **Валидация**: Все методы проверены на соответствие фактической реализации

### Товары и каталог

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Список карточек товаров | `sdk.products.createCardsList({ settings })` | **Основной метод** - Возвращает карточки с курсорной пагинацией |
| Создать новый товар | `sdk.products.createCardsUpload(data[])` | Принимает массив карточек товаров |
| Обновить товар | `sdk.products.createCardsUpdate(data[])` | Принимает массив обновлений |
| Удалить в корзину | `sdk.products.createDeleteTrash({ nmIDs })` | Перемещает товары в корзину |
| Восстановить из корзины | `sdk.products.createCardsRecover({ nmIDs })` | Восстанавливает товары из корзины |
| Получить родительские категории | `sdk.products.getParentAll({ locale? })` | Категории верхнего уровня как "Электроника" |
| Получить подкатегории | `sdk.products.getObjectAll({ parentID })` | Категории внутри родительской |
| Получить атрибуты категории | `sdk.products.getObjectCharc(subjectId)` | Обязательные/опциональные поля |
| Загрузить медиафайл | `sdk.products.createMediaFile()` | Инициировать загрузку медиа |
| Сохранить медиа | `sdk.products.createMediaSave({ nmId, data })` | Сохранить загруженные медиа |
| Получить остатки | `sdk.products.createStock(warehouseId, { skus })` | Получить остатки по SKU |
| Обновить остатки | `sdk.products.updateStock(warehouseId, { stocks })` | Обновить уровни остатков |
| Удалить остатки | `sdk.products.deleteStock(warehouseId, { skus })` | Удалить записи остатков |
| Получить склады | `sdk.products.warehouses()` | Список складов продавца |
| Получить офисы | `sdk.products.offices()` | Список доступных офисов |
| Получить лимиты карточек | `sdk.products.getCardsLimits()` | Проверить лимиты создания карточек |
| Сгенерировать штрихкоды | `sdk.products.createContentBarcode({ count })` | Сгенерировать новые штрихкоды |

### Заказы (FBS - Выполнение продавцом)

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Получить новые заказы | `sdk.ordersFBS.getOrdersNew()` | Заказы, ожидающие обработки |
| Список всех заказов | `sdk.ordersFBS.orders({ limit, next, dateFrom?, dateTo? })` | Пагинация с фильтрами по дате |
| Получить статусы заказов | `sdk.ordersFBS.createOrdersStatu({ orders: number[] })` | Пакетная проверка статуса |
| Создать поставку | `sdk.ordersFBS.createSupply({ name })` | Начать новую отгрузку |
| Получить поставки | `sdk.ordersFBS.supplies({ limit, next })` | Список всех поставок |
| Добавить заказ в поставку | `sdk.ordersFBS.updateSuppliesOrder(supplyId, orderId)` | Добавить заказ в поставку |
| Получить этикетки заказов | `sdk.ordersFBS.createOrdersSticker({ type, width, height }, { orders })` | Печать этикеток |
| Доставить поставку | `sdk.ordersFBS.updateSuppliesDeliver(supplyId)` | Отметить как отгруженную |
| Отменить заказ | `sdk.ordersFBS.updateOrdersCancel(orderId)` | Отмена до отгрузки |
| Получить поставку | `sdk.ordersFBS.getSupply(supplyId)` | Получить детали поставки |
| Удалить поставку | `sdk.ordersFBS.deleteSupply(supplyId)` | Удалить поставку |
| Получить заказы поставки | `sdk.ordersFBS.getSuppliesOrder(supplyId)` | Заказы в поставке |
| Получить штрихкод поставки | `sdk.ordersFBS.getSuppliesBarcode(supplyId, { type })` | Штрихкод поставки |
| Получить пропуска | `sdk.ordersFBS.passes()` | Список пропусков |
| Создать пропуск | `sdk.ordersFBS.createPass(data)` | Создать пропуск для доставки |
| Получить заказы на переотправку | `sdk.ordersFBS.getOrdersReshipment()` | Заказы для переотправки |

### Финансы

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Получить баланс счета | `sdk.finances.getAccountBalance()` | Текущий баланс |
| Получить отчет по периоду | `sdk.finances.getSupplierReportdetailbyperiod({ dateFrom, dateTo, limit?, rrdid?, period? })` | Детальный отчет |
| Получить категории документов | `sdk.finances.getDocumentsCategories({ locale? })` | Список категорий документов |
| Список документов | `sdk.finances.getDocumentsList({ locale?, beginTime?, endTime?, ... })` | Счета, отчеты |
| Скачать документ | `sdk.finances.getDocumentsDownload({ serviceName, extension })` | Получить PDF/Excel |
| Скачать все документы | `sdk.finances.createDownloadAll(data)` | Массовое скачивание |

### Аналитика

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Получить детальный отчет по товару | `sdk.analytics.createNmReportDetail(data)` | Детальные метрики товара |
| Получить историю деталей | `sdk.analytics.createDetailHistory(data)` | Исторические данные деталей |
| Получить сгруппированную историю | `sdk.analytics.createGroupedHistory(data)` | Сгруппированные исторические данные |
| Получить загрузки отчетов | `sdk.analytics.getNmReportDownloads({ filter? })` | Список доступных отчетов |
| Создать загрузку отчета | `sdk.analytics.createNmReportDownload(data)` | Асинхронная генерация отчета |
| Повторить загрузку отчета | `sdk.analytics.createDownloadsRetry(data)` | Повторить неудачную загрузку |
| Получить файл загрузки | `sdk.analytics.getDownloadsFile(downloadId)` | Получить готовый отчет |
| Отчет по поиску | `sdk.analytics.createSearchReportReport(data)` | Аналитика поиска |
| Создать табличную группу | `sdk.analytics.createTableGroup(data)` | Сгруппированные табличные данные |
| Создать табличные детали | `sdk.analytics.createTableDetail(data)` | Детальные табличные данные |
| Поисковые тексты товара | `sdk.analytics.createProductSearchText(data)` | Поисковые запросы товара |
| Заказы товара | `sdk.analytics.createProductOrder(data)` | Аналитика заказов товара |

### Отчеты

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Получить входящие отгрузки | `sdk.reports.getSupplierIncomes({ dateFrom })` | Товары, полученные WB |
| Получить уровни остатков | `sdk.reports.getSupplierStocks({ dateFrom })` | Текущая инвентаризация |
| Получить отчет по заказам | `sdk.reports.getSupplierOrders({ dateFrom, flag? })` | Все заказы |
| Получить отчет по продажам | `sdk.reports.getSupplierSales({ dateFrom, flag? })` | Завершенные продажи |
| Создать отчет по остаткам | `sdk.reports.warehouseRemains({ locale?, groupByBrand?, ... })` | Асинхронная генерация |
| Проверить статус отчета | `sdk.reports.getTasksStatu(taskId)` | Опрос завершения |
| Скачать отчет | `sdk.reports.getTasksDownload(taskId)` | Получить готовый отчет |
| Отчет платного хранения | `sdk.reports.paidStorage({ dateFrom, dateTo })` | Создать отчет платного хранения |
| Проверить статус платного хранения | `sdk.reports.getTasksStatu3(taskId)` | Проверить отчет платного хранения |
| Скачать платное хранение | `sdk.reports.getTasksDownload3(taskId)` | Скачать отчет платного хранения |
| Отчет приемки | `sdk.reports.acceptanceReport({ dateFrom, dateTo })` | Отчет приемки |
| Региональные продажи | `sdk.reports.getAnalyticsRegionSale({ dateFrom, dateTo })` | Региональные продажи |

### Коммуникации

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Получить чаты продавца | `sdk.communications.getSellerChats()` | Беседы с клиентами |
| Получить события чата | `sdk.communications.getSellerEvents({ next? })` | Сообщения в чате |
| Отправить сообщение | `sdk.communications.createSellerMessage()` | Ответить клиенту |
| Получить вопросы | `sdk.communications.questions({ isAnswered, take, skip, ... })` | Список вопросов и ответов |
| Получить один вопрос | `sdk.communications.question({ id })` | Детали одного вопроса |
| Обновить вопрос | `sdk.communications.updateQuestion(data)` | Ответить/просмотреть вопрос |
| Получить отзывы | `sdk.communications.feedbacks({ isAnswered, take, skip, ... })` | Отзывы клиентов |
| Создать ответ на отзыв | `sdk.communications.createFeedbacksAnswer({ id, text })` | Ответить на отзыв |
| Обновить ответ на отзыв | `sdk.communications.updateFeedbacksAnswer({ id, text })` | Редактировать ответ |
| Получить оценки отзывов | `sdk.communications.supplierValuations()` | Категории рейтинга |
| Получить количество вопросов | `sdk.communications.getQuestionsCount({ dateFrom?, dateTo?, isAnswered? })` | Статистика вопросов |
| Получить неотвеченные | `sdk.communications.getQuestionsCountUnanswered()` | Неотвеченные вопросы |
| Проверить новые отзывы/вопросы | `sdk.communications.newFeedbacksQuestions()` | Проверить наличие новых |
| Шаблоны | `sdk.communications.templates({ templateType })` | Получить шаблоны ответов |
| Создать шаблон | `sdk.communications.createTemplate({ name, templateType, text })` | Новый шаблон |

### Промо-акции

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Получить количество акций | `sdk.promotion.getPromotionCount()` | Сводка активных кампаний |
| Создать рекламную кампанию | `sdk.promotion.createPromotionAdvert(data)` | Новая рекламная кампания |
| Получить аукционные объявления | `sdk.promotion.getAuctionAdverts({ type? })` | Аукционные кампании |
| Получить баланс рекламы | `sdk.promotion.getAdvBalance()` | Рекламный баланс |
| Получить бюджет рекламы | `sdk.promotion.getAdvBudget(advertId)` | Бюджет кампании |
| Пополнить бюджет | `sdk.promotion.createAdvBudgetDeposit(advertId, data)` | Добавить средства в кампанию |
| Приостановить рекламу | `sdk.promotion.getAdvAdvertStoppar(advertId)` | Приостановить кампанию |
| Запустить рекламу | `sdk.promotion.getAdvAdvertStart(advertId)` | Возобновить кампанию |
| Получить полную статистику | `sdk.promotion.createFullstat(data)` | Полная статистика |
| Получить статистику по предметам | `sdk.promotion.createFullstatBySubjects(data)` | Статистика по предметам |
| Получить слова кампании | `sdk.promotion.getAdvWords(advertId)` | Ключевые слова кампании |
| Обновить слова кампании | `sdk.promotion.createAdvWords(advertId, data)` | Установить ключевые слова |

### Тарифы

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Получить ставки комиссии | `sdk.tariffs.getTariffsCommission({ locale? })` | Комиссии по категориям |
| Получить тарифы на коробки | `sdk.tariffs.getTariffsBox({ date })` | Плата за хранение коробок |
| Получить тарифы на паллеты | `sdk.tariffs.getTariffsPallet({ date })` | Плата за хранение паллет |
| Получить тарифы на возвраты | `sdk.tariffs.getTariffsReturn({ date })` | Плата за обработку возвратов |

### Общее

| Операция | Фактический метод SDK | Примечания |
|----------|----------------------|------------|
| Тестировать соединение | `sdk.general.ping()` | Проверить подключение API |
| Получить новости | `sdk.general.news({ from?, fromID? })` | Обновления портала продавца |
| Получить информацию о продавце | `sdk.general.sellerInfo()` | Информация об аккаунте |

### Распространенные паттерны

```typescript
// ✅ ПРАВИЛЬНО - Используйте фактические имена методов
const cards = await sdk.products.createCardsList({ settings: { cursor: { limit: 100 } } });
const orders = await sdk.ordersFBS.orders({ limit: 100, next: 0, dateFrom: timestamp });
const balance = await sdk.finances.getAccountBalance();
const report = await sdk.analytics.createNmReportDetail({ ... });

// ❌ НЕПРАВИЛЬНО - Эти методы НЕ существуют
const products = await sdk.products.listProducts();     // TypeError: listProducts is not a function
const orders = await sdk.ordersFBS.getOrders();         // TypeError: getOrders is not a function
const balance = await sdk.finances.getBalance();        // TypeError: getBalance is not a function
const created = await sdk.products.createProduct(data); // TypeError: createProduct is not a function
```

---

## Режим отладки

### Включить логирование отладки

Чтобы видеть детальные операции SDK, включите режим отладки:

```typescript
import { WildberriesSDK } from '@daytona/wildberries-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: 'debug'  // 'debug' | 'info' | 'warn' | 'error'
});
```

### Уровни логирования

| Уровень | Когда использовать | Что вы увидите |
|---------|-------------------|----------------|
| `debug` | Разработка/устранение неполадок | Все операции SDK, запросы, ответы |
| `info` | Обычная работа | Важные события, успешные операции |
| `warn` | Продакшн | Предупреждения, повторы, восстановимые ошибки |
| `error` | Продакшн | Только ошибки |

### Пример вывода отладки

```
[2024-10-27T10:30:45.123Z] [DEBUG] Начат API вызов: GET /content/v2/object/parent/all
[2024-10-27T10:30:45.124Z] [DEBUG] Заголовки запроса: {
  "Authorization": "Bearer ey***",
  "Content-Type": "application/json",
  "User-Agent": "wildberries-sdk/1.0.0"
}
[2024-10-27T10:30:45.368Z] [DEBUG] Статус ответа: 200
[2024-10-27T10:30:45.368Z] [DEBUG] Время ответа: 245ms
[2024-10-27T10:30:45.369Z] [INFO] Родительские категории успешно получены
```

### Включить логирование запросов/ответов

Для еще больших деталей включите полное логирование запросов/ответов:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  logLevel: 'debug',
  logRequests: true,   // Логировать полные тела запросов
  logResponses: true   // Логировать полные тела ответов
});
```

⚠️ **Предупреждение:** Никогда не включайте логирование запросов/ответов в продакшн - логи могут содержать конфиденциальные данные.

### Рабочий процесс отладки

1. **Включить режим отладки** - Начните с `logLevel: 'debug'`
2. **Воспроизвести проблему** - Запустите проблемный код
3. **Проанализировать логи** - Ищите ошибки, тайм-ауты, неожиданные ответы
4. **Проверить код ошибки** - См. [Справочник кодов ошибок](#справочник-кодов-ошибок)
5. **Применить решение** - Следуйте шагам устранения неполадок ниже

---

## Проблемы аутентификации

Проблемы аутентификации - наиболее распространенные проблемы SDK. Они возникают, когда API ключ недействителен, отсутствует или неправильно настроен.

### Проблема 1: Ошибка аутентификации

**Сообщение об ошибке:**
```
AuthenticationError: Invalid API key
    at AuthManager.validate (auth-manager.ts:45)
    at WildberriesSDK.constructor (index.ts:28)
```

**Причина:** API ключ недействителен, истек или неправильно отформатирован.

**Что пошло не так:**
- API ключ не установлен в окружении
- API ключ содержит лишние пробелы или кавычки
- API ключ был отозван в панели Wildberries
- Неправильный API ключ для окружения

**Решение:**

1. **Проверить, что API ключ установлен:**
   ```bash
   echo $WB_API_KEY
   # Должен вывести строку из 64 символов
   ```

2. **Проверить формат ключа:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Лишние кавычки или пробелы
   const sdk = new WildberriesSDK({ apiKey: ' eyJhbG... ' });

   // ✅ ПРАВИЛЬНО - Чистый API ключ
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });
   ```

3. **Проверить, что ключ активен:**
   - Войдите в [Портал продавца Wildberries](https://seller.wildberries.ru)
   - Перейдите в Настройки → API ключи
   - Проверьте, что статус ключа "Активен"
   - Проверьте, что разрешения ключа соответствуют вашим потребностям

4. **Протестировать валидность ключа:**
   ```typescript
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     logLevel: 'debug'
   });

   // Тест с ping конечной точкой
   try {
     await sdk.general.ping();
     console.log('✅ API ключ валиден');
   } catch (error) {
     console.error('❌ API ключ невалиден:', error.message);
   }
   ```

**Как предотвратить:**
- Хранить API ключи в переменных окружения
- Никогда не коммитить API ключи в систему контроля версий
- Добавить `.env` в `.gitignore`
- Ротировать ключи регулярно (каждые 90 дней)
- Использовать разные ключи для dev/staging/prod

---

### Проблема 2: 401 Неавторизован

**Сообщение об ошибке:**
```
AuthenticationError: 401 Unauthorized - Missing or invalid authorization header
```

**Причина:** Заголовок авторизации не отправлен с запросом.

**Что пошло не так:**
- API ключ не предоставлен при инициализации SDK
- API ключ был undefined или null
- Использование SDK до завершения инициализации

**Решение:**

```typescript
// ❌ НЕПРАВИЛЬНО - API ключ undefined
const sdk = new WildberriesSDK({
  apiKey: process.env.WRONG_VAR_NAME  // Возвращает undefined
});

// ✅ ПРАВИЛЬНО - Проверка существования ключа
const apiKey = process.env.WB_API_KEY;
if (!apiKey) {
  throw new Error('Требуется переменная окружения WB_API_KEY');
}

const sdk = new WildberriesSDK({ apiKey });
```

**Как предотвратить:**
- Всегда валидировать API ключ перед инициализацией SDK
- Использовать TypeScript non-null assertion (`!`) только когда уверены
- Добавлять проверки времени выполнения в production коде

---

### Проблема 3: API ключ не найден

**Сообщение об ошибке:**
```
Error: WB_API_KEY environment variable is not set
```

**Причина:** Переменная окружения не загружена или названа неправильно.

**Что пошло не так:**
- Файл `.env` не в корне проекта
- `dotenv` не настроен правильно
- Неправильное имя переменной в файле `.env`
- Переменные окружения не загружены в продакшн

**Решение:**

1. **Создать файл `.env` в корне проекта:**
   ```bash
   # .env
   WB_API_KEY=your_64_character_api_key_here
   ```

2. **Загрузить переменные окружения:**
   ```typescript
   import dotenv from 'dotenv';
   dotenv.config();

   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });
   ```

3. **Развертывание в продакшн:**
   ```bash
   # Установить переменную окружения в продакшн
   export WB_API_KEY=your_api_key

   # Или использовать платформо-специфичную конфигурацию
   # Vercel: vercel env add WB_API_KEY
   # Heroku: heroku config:set WB_API_KEY=...
   # AWS: Настроить в Systems Manager Parameter Store
   ```

**Как предотвратить:**
- Документировать переменные окружения в README
- Использовать файл `.env.example` как шаблон
- Валидировать обязательные переменные окружения при запуске
- Использовать управление секретами в продакшн

---

### Проблема 4: Доступ запрещен

**Сообщение об ошибке:**
```
AuthenticationError: 403 Forbidden - Insufficient permissions for this operation
```

**Причина:** API ключ не имеет необходимых разрешений для операции.

**Что пошло не так:**
- API ключ создан с ограниченными разрешениями
- Попытка доступа к ограниченным конечным точкам
- Разрешения ключа изменены в панели Wildberries

**Решение:**

1. **Проверить требуемые разрешения:**

   | Операция | Требуемое разрешение |
   |----------|---------------------|
   | Чтение товаров | `products:read` |
   | Создание/обновление товаров | `products:write` |
   | Чтение заказов | `orders:read` |
   | Обновление статуса заказа | `orders:write` |
   | Чтение финансов | `finances:read` |
   | Чтение аналитики | `analytics:read` |

2. **Обновить разрешения API ключа:**
   - Войдите в портал продавца Wildberries
   - Перейдите в Настройки → API ключи
   - Нажмите на ваш API ключ
   - Включите требуемые разрешения
   - Сохраните изменения

3. **Создать новый ключ с полными разрешениями:**
   ```typescript
   // Если обновление разрешений не работает, создайте новый ключ
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY_FULL!  // Новый ключ со всеми разрешениями
   });
   ```

**Как предотвратить:**
- Создавать API ключи с соответствующими разрешениями с самого начала
- Документировать требуемые разрешения в коде
- Использовать разные ключи для разных операций
- Проверять разрешения перед развертыванием

---

### Проблема 5: Токен истек

**Сообщение об ошибке:**
```
AuthenticationError: 401 Unauthorized - Token has expired
```

**Причина:** API ключ истек и требует обновления.

**Что пошло не так:**
- API ключи имеют даты истечения
- Ключ не ротирован до истечения
- Автоматическое обновление не сработало

**Решение:**

1. **Проверить истечение ключа:**
   - Войдите в портал продавца Wildberries
   - Перейдите в Настройки → API ключи
   - Проверьте колонку "Истекает"

2. **Сгенерировать новый ключ:**
   ```bash
   # Обновить переменную окружения с новым ключом
   export WB_API_KEY=new_api_key

   # Или обновить файл .env
   echo "WB_API_KEY=new_api_key" > .env
   ```

3. **Реализовать ротацию ключей:**
   ```typescript
   // Мониторинг истечения ключа
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     onAuthError: async (error) => {
       if (error.message.includes('expired')) {
         // Оповестить операционную команду
         console.error('⚠️ API ключ истек - требуется ротация');
         // Отправить уведомление
       }
     }
   });
   ```

**Как предотвратить:**
- Установить напоминания в календаре за 30 дней до истечения
- Реализовать автоматическую ротацию ключей
- Мониторить истечение ключей в CI/CD
- Использовать ключи с более длительными периодами валидности

---

## Проблемы лимита запросов

Ограничение запросов защищает API от злоупотреблений и обеспечивает справедливое распределение ресурсов. Правильное понимание и обработка лимитов запросов критически важны для production приложений.

### Проблема 6: 429 Слишком много запросов

**Сообщение об ошибке:**
```
RateLimitError: Rate limit exceeded (3 requests per minute)
Retry after: 20000ms
```

**Причина:** Превышен лимит запросов для конечной точки.

**Что пошло не так:**
- Запросы делаются слишком быстро
- Не соблюдаются интервалы лимита запросов
- Несколько экземпляров SDK делают параллельные запросы
- Недостаточная задержка между запросами

**Решение:**

1. **SDK автоматически обрабатывает повторы:**
   ```typescript
   try {
     // SDK автоматически ждет и повторяет
     const result = await sdk.products.createProduct(data);
     console.log('✅ Товар создан:', result);
   } catch (error) {
     if (error instanceof RateLimitError) {
       // Это происходит только после исчерпания всех повторов
       console.log(`Лимит запросов. Повтор через ${error.retryAfter}ms`);
     }
   }
   ```

2. **Проверить лимиты запросов конечной точки:**

   | Конечная точка | Лимит запросов | Интервал |
   |----------------|---------------|----------|
   | `products.create()` | 1 запрос | 10 секунд |
   | `products.list()` | 3 запроса | 1 минута |
   | `orders.list()` | 5 запросов | 1 минута |
   | `analytics.getSales()` | 5 запросов | 1 минута |
   | `reports.generate()` | 1 запрос | 2 минуты |

3. **Реализовать пакетную обработку запросов:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Последовательные запросы достигают лимита
   for (const product of products) {
     await sdk.products.createProduct(product);  // Лимит запросов!
   }

   // ✅ ПРАВИЛЬНО - Пакеты с задержками между запросами
   import { chunk } from 'lodash';

   const batches = chunk(products, 10);  // Небольшие пакеты для соблюдения лимитов
   for (const batch of batches) {
     // Обработка пакета с задержками
     for (const product of batch) {
       await sdk.products.createProduct(product);
       await sleep(10000);  // Ждать 10с между товарами (лимит: 1 на 10с)
     }
     // Опционально: более длинная задержка между пакетами
     await sleep(60000);  // 1 минута между пакетами
   }
   ```

   **Примечание**: У SDK нет метода `createBatch()`. Товары должны создаваться индивидуально с соответствующими задержками для соблюдения лимитов запросов.

4. **Использовать очередь запросов:**
   ```typescript
   import { Queue } from 'bullmq';

   const queue = new Queue('wildberries-api');

   // Добавить запросы в очередь
   for (const product of products) {
     await queue.add('create-product', product, {
       rateLimiter: { max: 1, duration: 10000 }  // 1 на 10с
     });
   }
   ```

**Как предотвратить:**
- Проверить лимиты запросов в [Руководстве по производительности](/ru/guides/performance-tuning.md)
- Реализовать пакетную обработку для массовых операций
- Использовать очереди для фоновой обработки
- Мониторить использование лимита запросов
- Рассмотреть обновление до более высокого уровня при постоянном достижении лимитов

---

### Проблема 7: Квота исчерпана

**Сообщение об ошибке:**
```
RateLimitError: Daily quota exceeded (10,000 requests per day)
Reset at: 2024-10-28T00:00:00Z
```

**Причина:** Превышена дневная или месячная квота API.

**Что пошло не так:**
- Слишком много запросов в платежном периоде
- Неожиданный всплеск трафика
- Неэффективные паттерны использования API
- Разработка/тестирование потребляют production квоту

**Решение:**

1. **Мониторить использование API:**
   ```typescript
   // Примечание: У SDK нет метода getQuotaStatus()
   // Мониторьте использование, отслеживая запросы в вашем приложении

   let requestCount = 0;
   const dailyLimit = 10000;

   async function trackRequest<T>(operation: () => Promise<T>): Promise<T> {
     if (requestCount >= dailyLimit) {
       throw new Error(`Дневная квота исчерпана (${dailyLimit} запросов/день). Сброс в полночь UTC.`);
     }
     requestCount++;
     return await operation();
   }

   // Использовать обертку для всех API вызовов
   const products = await trackRequest(() => sdk.products.listProducts());
   ```

2. **Оптимизировать использование API:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Опрос каждую секунду
   setInterval(async () => {
     const orders = await sdk.ordersFBS.getOrders();  // 86,400 запросов/день!
   }, 1000);

   // ✅ ПРАВИЛЬНО - Опрашивать реже
   setInterval(async () => {
     const orders = await sdk.ordersFBS.getOrders({ limit: 100 });
   }, 60000);  // Каждую минуту = 1,440 запросов/день
   ```

3. **Реализовать кэширование:**
   ```typescript
   import NodeCache from 'node-cache';

   const cache = new NodeCache({ stdTTL: 300 });  // Кэш на 5 минут

   async function getCategoriesWithCache() {
     const cached = cache.get('categories');
     if (cached) return cached;

     const categories = await sdk.products.getParentAll();
     cache.set('categories', categories);
     return categories;
   }
   ```

4. **Повысить квоту:**
   - Связаться с поддержкой Wildberries для увеличения квоты
   - Рассмотреть корпоративный тариф для неограниченных запросов
   - Использовать отдельные аккаунты для dev/staging/production

**Как предотвратить:**
- Ежедневно мониторить использование квоты
- Установить оповещения при 80% использования квоты
- Агрессивно использовать кэширование
- Оптимизировать запросы (пагинация, фильтры)
- Использовать вебхуки вместо опроса, где доступно

---

### Проблема 8: Запрос ограничен

**Сообщение об ошибке:**
```
RateLimitError: Too many concurrent requests (max: 10)
```

**Причина:** Превышено максимальное количество одновременных соединений.

**Что пошло не так:**
- Слишком много параллельных запросов
- Не ограничена параллельность в коде
- Несколько воркеров одновременно обращаются к API

**Решение:**

1. **Ограничить параллельность:**
   ```typescript
   import pLimit from 'p-limit';

   const limit = pLimit(10);  // Макс 10 одновременных запросов

   const promises = products.map(product =>
     limit(() => sdk.products.createProduct(product))
   );

   const results = await Promise.all(promises);
   ```

2. **Использовать пул воркеров:**
   ```typescript
   import { Worker } from 'worker_threads';

   const pool = new Pool({
     max: 5,  // Макс 5 воркеров
     create: () => new Worker('./api-worker.js')
   });

   for (const product of products) {
     await pool.run(product);  // Автоматически ставится в очередь
   }
   ```

3. **Настроить параллельность SDK:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     maxConcurrentRequests: 10  // Ограничить одновременные запросы
   });
   ```

**Как предотвратить:**
- Всегда ограничивать параллельность в параллельных операциях
- Использовать пулы соединений
- Мониторить активные соединения
- Координировать между несколькими экземплярами сервиса

---

### Проблема 9: Неясный лимит запросов

**Сообщение об ошибке:** *(Нет ошибки - просто путаница с лимитами)*

**Причина:** Неопределенность относительно того, какие лимиты запросов для конкретных конечных точек.

**Что пошло не так:**
- Лимиты запросов не ясно документированы
- Разные лимиты для каждой конечной точки
- Лимиты меняются в зависимости от уровня аккаунта

**Решение:**

1. **Проверить лимиты запросов программно:**
   ```typescript
   const rateLimits = sdk.getRateLimits();
   console.log('Products.create:', rateLimits['products.create']);
   // Вывод: { limit: 1, interval: '10s', burst: 1 }
   ```

2. **Просмотреть документацию:**
   - См. [Руководство по настройке производительности](/ru/guides/performance-tuning.md#rate-limits)
   - Проверить [Справочник API](../api/modules.html)
   - Просмотреть документацию Wildberries API

3. **Протестировать лимиты запросов:**
   ```typescript
   // Тест для определения фактического лимита запросов
   let requestCount = 0;
   const startTime = Date.now();

   try {
     while (true) {
       await sdk.products.listProducts({ limit: 1 });
       requestCount++;
       console.log(`Запрос ${requestCount} успешен`);
     }
   } catch (error) {
     if (error instanceof RateLimitError) {
       const elapsed = Date.now() - startTime;
       console.log(`Лимит запросов: ${requestCount} запросов за ${elapsed}ms`);
     }
   }
   ```

**Как предотвратить:**
- Просмотреть лимиты запросов перед реализацией
- Документировать лимиты в комментариях кода
- Настроить мониторинг для достижения лимитов запросов
- Тщательно тестировать в среде разработки

---

## Проблемы сети

Сетевые проблемы возникают между вашим приложением и серверами Wildberries API. Они могут быть вызваны проблемами подключения, проблемами DNS, правилами межсетевого экрана или ошибками SSL сертификатов.

### Проблема 10: ECONNREFUSED

**Сообщение об ошибке:**
```
NetworkError: connect ECONNREFUSED 185.12.34.56:443
```

**Причина:** Соединение с сервером API отклонено.

**Что пошло не так:**
- Сервер API не работает
- Неправильно настроен базовый URL
- Межсетевой экран блокирует исходящие соединения
- Проблемы с сетевым подключением

**Решение:**

1. **Проверить статус API:**
   ```bash
   # Тестировать подключение
   curl -I https://content-api.wildberries.ru/ping

   # Проверить разрешение DNS
   nslookup content-api.wildberries.ru
   ```

2. **Проверить конфигурацию SDK:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Неправильный базовый URL
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     baseUrls: {
       products: 'https://wrong-api.wildberries.ru'  // Опечатка!
     }
   });

   // ✅ ПРАВИЛЬНО - Использовать URL по умолчанию или проверить пользовательские URL
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
     // Использует правильные URL по умолчанию
   });
   ```

3. **Проверить правила межсетевого экрана:**
   ```bash
   # Разрешить исходящий HTTPS
   sudo ufw allow out 443/tcp

   # Проверить iptables
   sudo iptables -L OUTPUT
   ```

4. **Протестировать из другой сети:**
   ```bash
   # Тест из командной строки
   curl https://content-api.wildberries.ru/ping

   # Если это работает, но SDK нет, проблема в приложении
   # Если это не работает, проблема в сети/межсетевом экране
   ```

**Как предотвратить:**
- Мониторить доступность API
- Реализовать проверки работоспособности
- Настроить оповещения для ошибок соединения
- Использовать логику повторов (SDK делает это автоматически)
- Документировать сетевые требования

---

### Проблема 11: ETIMEDOUT

**Сообщение об ошибке:**
```
NetworkError: Request timeout after 30000ms
```

**Причина:** Запрос занял больше времени, чем настроенный тайм-аут.

**Что пошло не так:**
- Медленное сетевое соединение
- Сервер API перегружен
- Большой ответный пакет
- Тайм-аут настроен слишком коротко

**Решение:**

1. **Увеличить тайм-аут:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     timeout: 60000  // 60 секунд (по умолчанию: 30с)
   });
   ```

2. **Реализовать повтор с экспоненциальной задержкой:**
   ```typescript
   // SDK обрабатывает это автоматически
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     retryConfig: {
       maxRetries: 3,
       retryDelay: 1000,
       exponentialBackoff: true
     }
   });
   ```

3. **Оптимизировать размер запроса:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Запрос слишком много данных
   const orders = await sdk.ordersFBS.getOrders({ limit: 10000 });  // Огромный ответ

   // ✅ ПРАВИЛЬНО - Пагинировать результаты
   let page = 0;
   let hasMore = true;

   while (hasMore) {
     const result = await sdk.ordersFBS.getOrders({
       limit: 100,
       offset: page * 100
     });

     processOrders(result.data);
     hasMore = result.hasMore;
     page++;
   }
   ```

4. **Проверить задержку сети:**
   ```bash
   # Измерить задержку
   ping content-api.wildberries.ru

   # Трассировка маршрута
   traceroute content-api.wildberries.ru
   ```

**Как предотвратить:**
- Использовать соответствующие тайм-ауты для типа операции
- Реализовать пагинацию для больших наборов данных
- Мониторить время ответа
- Использовать CDN или региональные конечные точки, если доступно
- Тестировать в production сетевых условиях

---

### Проблема 12: Ошибка SSL сертификата

**Сообщение об ошибке:**
```
NetworkError: SSL certificate verification failed
Error: unable to verify the first certificate
```

**Причина:** Валидация SSL/TLS сертификата не прошла.

**Что пошло не так:**
- Самоподписанный сертификат в разработке
- Корпоративный прокси перехватывает HTTPS
- Устаревшее хранилище сертификатов
- Неправильная конфигурация сертификата

**Решение:**

1. **Обновить CA сертификаты:**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install ca-certificates
   sudo update-ca-certificates

   # macOS
   brew install openssl
   ```

2. **Настроить прокси сертификаты:**
   ```typescript
   import https from 'https';
   import fs from 'fs';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     httpsAgent: new https.Agent({
       ca: fs.readFileSync('./corporate-ca.crt')
     })
   });
   ```

3. **Отключить валидацию сертификата (только dev):**
   ```typescript
   // ⚠️ ПРЕДУПРЕЖДЕНИЕ: НИКОГДА не используйте в продакшн!
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     httpsAgent: new https.Agent({
       rejectUnauthorized: false  // ТОЛЬКО DEV!
     })
   });
   ```

4. **Проверить сертификат:**
   ```bash
   # Проверить сертификат
   openssl s_client -connect content-api.wildberries.ru:443 -showcerts
   ```

**Как предотвратить:**
- Держать CA сертификаты обновленными
- Документировать требования прокси
- Использовать правильные сертификаты во всех окружениях
- Никогда не отключать валидацию сертификатов в продакшн

---

## Проблемы валидации

Ошибки валидации возникают, когда данные запроса не соответствуют требованиям API. Их обычно быстро исправить, как только вы поймете, что не так.

### Проблема 13: Ошибка валидации

**Сообщение об ошибке:**
```
ValidationError: Invalid request data
Field: brandName - Value is required
Field: categoryId - Must be a valid category ID
```

**Причина:** Данные запроса не соответствуют правилам валидации API.

**Что пошло не так:**
- Отсутствуют обязательные поля
- Неверные значения полей
- Неправильные типы данных
- Нарушены ограничения полей

**Решение:**

1. **Проверить требования к полям:**
   ```typescript
   import { CreateProductRequest } from '@daytona/wildberries-sdk';

   // ❌ НЕПРАВИЛЬНО - Отсутствуют обязательные поля
   const product: CreateProductRequest = {
     title: 'My Product'
     // Отсутствует brandName, categoryId и т.д.
   };

   // ✅ ПРАВИЛЬНО - Все обязательные поля
   const product: CreateProductRequest = {
     brandName: 'My Brand',        // Обязательно
     categoryId: 'electronics',     // Обязательно
     title: 'Wireless Headphones',  // Обязательно
     description: 'High quality...',
     characteristics: [
       { name: 'Color', value: 'Black' }
     ],
     pricing: {
       price: 5999,
       discount: 10
     }
   };
   ```

2. **Использовать валидацию TypeScript:**
   ```typescript
   // TypeScript ловит отсутствующие поля во время компиляции
   const product = {
     title: 'My Product'
   };

   // Ошибка TypeScript: Property 'brandName' is missing
   await sdk.products.createProduct(product);
   ```

3. **Добавить валидацию времени выполнения:**
   ```typescript
   import Joi from 'joi';

   const productSchema = Joi.object({
     brandName: Joi.string().required().min(1).max(100),
     categoryId: Joi.string().required(),
     title: Joi.string().required().min(1).max(500),
     pricing: Joi.object({
       price: Joi.number().positive().required(),
       discount: Joi.number().min(0).max(99)
     })
   });

   const { error, value } = productSchema.validate(product);
   if (error) {
     console.error('Валидация не прошла:', error.details);
     return;
   }

   await sdk.products.createProduct(value);
   ```

4. **Просмотреть документацию API:**
   - См. [Справочник API](../api/modules/ProductsModule.html)
   - Проверить требования к полям в определениях типов
   - Просмотреть примеры в [Лучших практиках](/ru/guides/best-practices.md)

**Как предотвратить:**
- Использовать TypeScript для валидации во время компиляции
- Добавить валидацию времени выполнения для пользовательского ввода
- Просмотреть документацию API перед реализацией
- Тестировать с различными комбинациями ввода
- Использовать библиотеки валидации схем

---

### Проблема 14: Отсутствует обязательное поле

**Сообщение об ошибке:**
```
ValidationError: Missing required field 'brandName'
```

**Причина:** Обязательное поле не предоставлено в запросе.

**Что пошло не так:**
- Забыли включить обязательное поле
- Опечатка в имени поля
- Поле null или undefined
- Использовано неправильное имя поля

**Решение:**

```typescript
// ❌ НЕПРАВИЛЬНО - Отсутствует brandName
await sdk.products.createProduct({
  title: 'Product',
  categoryId: 'electronics'
  // brandName отсутствует!
});

// ✅ ПРАВИЛЬНО - Все обязательные поля присутствуют
await sdk.products.createProduct({
  brandName: 'TechCorp',  // Обязательно
  title: 'Product',
  categoryId: 'electronics'
});

// ✅ ЛУЧШЕ - Валидация перед API вызовом
const product = {
  brandName: data.brand,
  title: data.title,
  categoryId: data.category
};

// Проверить обязательные поля
if (!product.brandName) {
  throw new Error('Требуется название бренда');
}

await sdk.products.createProduct(product);
```

**Как предотвратить:**
- Использовать интерфейсы TypeScript
- Валидировать данные перед API вызовами
- Использовать валидацию форм в UI
- Добавлять JSDoc комментарии с обязательными полями

---

### Проблема 15: Неверный формат

**Сообщение об ошибке:**
```
ValidationError: Invalid format for field 'price'
Expected: number, Received: string
```

**Причина:** Значение поля не соответствует ожидаемому формату или типу.

**Что пошло не так:**
- Строка вместо числа
- Число вместо строки
- Неверный формат даты
- Неправильное значение enum

**Решение:**

```typescript
// ❌ НЕПРАВИЛЬНО - Неправильные типы
await sdk.products.createProduct({
  brandName: 'TechCorp',
  categoryId: 'electronics',
  title: 'Product',
  pricing: {
    price: '5999',      // Строка вместо числа
    discount: '10'      // Строка вместо числа
  }
});

// ✅ ПРАВИЛЬНО - Правильные типы
await sdk.products.createProduct({
  brandName: 'TechCorp',
  categoryId: 'electronics',
  title: 'Product',
  pricing: {
    price: 5999,        // Число
    discount: 10        // Число
  }
});

// ✅ ЛУЧШЕ - Парсинг и валидация
const product = {
  brandName: 'TechCorp',
  categoryId: 'electronics',
  title: 'Product',
  pricing: {
    price: parseInt(formData.price, 10),      // Парсинг строки в число
    discount: parseFloat(formData.discount)   // Парсинг строки в float
  }
};

// Валидация распарсенных значений
if (isNaN(product.pricing.price)) {
  throw new Error('Неверная цена');
}

await sdk.products.createProduct(product);
```

**Распространенные требования к форматам:**

| Поле | Формат | Пример |
|------|--------|--------|
| Цена | Число (копейки) | `5999` (59.99 RUB) |
| Дата | ISO 8601 | `"2024-10-27T10:30:00Z"` |
| Телефон | E.164 | `"+79991234567"` |
| Email | RFC 5322 | `"user@example.com"` |
| URL | Валидный URL | `"https://example.com"` |

**Как предотвратить:**
- Использовать типы TypeScript
- Парсить пользовательский ввод в правильные типы
- Валидировать форматы перед API вызовами
- Использовать библиотеки как `date-fns`, `validator.js`

---

### Проблема 16: Несоответствие схемы

**Сообщение об ошибке:**
```
ValidationError: Response doesn't match expected schema
Expected property 'items' to be array, got undefined
```

**Причина:** Структура ответа API изменилась или не соответствует типам SDK.

**Что пошло не так:**
- Несоответствие версии API
- Версия SDK устарела
- Неожиданные изменения API
- Формат ответа изменился

**Решение:**

1. **Проверить версию SDK:**
   ```bash
   # Проверить установленную версию
   npm list @daytona/wildberries-sdk

   # Обновить до последней
   npm update @daytona/wildberries-sdk
   ```

2. **Проверить версию API:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     apiVersion: 'v2'  // Указать версию API
   });
   ```

3. **Обработать несоответствия схемы:**
   ```typescript
   try {
     const result = await sdk.products.listProducts();

     // Защитное программирование - проверить структуру
     if (!result.data || !Array.isArray(result.data)) {
       console.error('Неожиданная структура ответа:', result);
       throw new Error('Неверный формат ответа');
     }

     return result.data;
   } catch (error) {
     console.error('Несоответствие схемы:', error);
     // Поведение fallback
   }
   ```

4. **Сообщить разработчикам SDK:**
   - Открыть GitHub issue с примером ответа
   - Включить версию SDK и конечную точку API
   - Предоставить минимальный случай воспроизведения

**Как предотвратить:**
- Зафиксировать версию SDK в package.json
- Тестировать изменения схемы в staging
- Мониторить релизы SDK на предмет breaking changes
- Использовать паттерны защитного программирования

---

## Общие проблемы

Общие проблемы, которые не подходят к другим категориям, но все еще часто встречаются.

### Проблема 17: Модуль не найден

**Сообщение об ошибке:**
```
Error: Cannot find module '@daytona/wildberries-sdk'
```

**Причина:** SDK не установлен или неправильный путь импорта.

**Что пошло не так:**
- SDK не установлен через npm
- Опечатка в имени пакета
- Неправильный путь импорта
- Node modules не обновлены

**Решение:**

1. **Установить SDK:**
   ```bash
   npm install @daytona/wildberries-sdk
   ```

2. **Проверить установку:**
   ```bash
   npm list @daytona/wildberries-sdk
   ```

3. **Проверить путь импорта:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО
   import { WildberriesSDK } from 'wildberries-sdk';  // Отсутствует @daytona
   import { WildberriesSDK } from '@daytona/wb-sdk';  // Неправильное имя

   // ✅ ПРАВИЛЬНО
   import { WildberriesSDK } from '@daytona/wildberries-sdk';
   ```

4. **Очистить кэш и переустановить:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

**Как предотвратить:**
- Добавить SDK в зависимости package.json
- Использовать точные пути импорта
- Запускать `npm install` после клонирования репозитория
- Документировать установку в README

---

### Проблема 18: TypeError

**Сообщение об ошибке:**
```
TypeError: sdk.products.createProduct is not a function
```

**Причина:** Неправильное использование SDK или метод не существует.

**Что пошло не так:**
- Опечатка в имени метода
- Использование SDK до инициализации
- Метод удален в версии SDK
- Ошибка деструктуризации

**Решение:**

1. **Проверить имя метода:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Опечатка
   await sdk.products.creatProduct(data);  // Отсутствует 'e'

   // ✅ ПРАВИЛЬНО
   await sdk.products.createProduct(data);
   ```

2. **Проверить инициализацию SDK:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Использование до инициализации
   const result = await sdk.products.listProducts();
   const sdk = new WildberriesSDK({ apiKey: '...' });

   // ✅ ПРАВИЛЬНО - Сначала инициализировать
   const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
   const result = await sdk.products.listProducts();
   ```

3. **Проверить существование метода:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Метод не существует
   await sdk.products.archiveProduct(id);  // archiveProduct не существует

   // ✅ ПРАВИЛЬНО - Использовать фактический метод
   await sdk.products.deleteProduct([id]);  // deleteProduct существует (принимает массив)
   ```

4. **Использовать TypeScript для автодополнения:**
   ```typescript
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });

   // TypeScript предоставляет автодополнение
   await sdk.products.  // Показывает доступные методы
   ```

**Как предотвратить:**
- Использовать TypeScript для проверки типов
- Просмотреть справочную документацию API
- Использовать автодополнение IDE
- Писать тесты для использования SDK

---

### Проблема 19: Пустой ответ

**Сообщение об ошибке:** *(Нет ошибки - просто пустые данные)*

**Причина:** API не вернул данных для запроса.

**Что пошло не так:**
- Данные не существуют для запроса
- Применены неправильные фильтры
- Неправильные параметры пагинации
- Данные архивированы или удалены

**Решение:**

1. **Проверить фильтры:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Слишком строгий фильтр
   const orders = await sdk.ordersFBS.getOrders({
     status: 'confirmed',
     dateFrom: '2024-10-27',
     dateTo: '2024-10-27'
   });
   console.log(orders.data);  // [] - Нет заказов в этом временном диапазоне

   // ✅ ПРАВИЛЬНО - Более широкий фильтр
   const orders = await sdk.ordersFBS.getOrders({
     status: 'confirmed',
     dateFrom: '2024-10-01',  // Весь месяц
     dateTo: '2024-10-31'
   });
   ```

2. **Проверить пагинацию:**
   ```typescript
   // ❌ НЕПРАВИЛЬНО - Offset слишком большой
   const orders = await sdk.ordersFBS.getOrders({
     limit: 100,
     offset: 10000  // За пределами общего количества
   });

   // ✅ ПРАВИЛЬНО - Проверить total перед пагинацией
   const firstPage = await sdk.ordersFBS.getOrders({ limit: 100, offset: 0 });
   console.log('Total:', firstPage.data.total);

   if (firstPage.data.hasMore) {
     const nextPage = await sdk.ordersFBS.getOrders({ limit: 100, offset: 100 });
   }
   ```

3. **Проверить существование данных:**
   ```typescript
   // Проверить, существуют ли данные в панели
   const all = await sdk.products.listProducts({ limit: 1 });
   if (all.data.length === 0) {
     console.log('Товары не существуют - сначала создайте некоторые');
   }
   ```

**Как предотвратить:**
- Обрабатывать пустые результаты gracefully
- Предоставлять обратную связь пользователю
- Проверять общее количество перед пагинацией
- Валидировать, что фильтры имеют смысл

---

### Проблема 20: Неожиданное поведение

**Сообщение об ошибке:** *(Нет ошибки - просто неправильное поведение)*

**Причина:** SDK работает не так, как ожидается или документировано.

**Что пошло не так:**
- Непонимание поведения SDK
- Документация неправильная или устаревшая
- Крайний случай не обработан
- Баг в SDK

**Решение:**

1. **Включить режим отладки:**
   ```typescript
   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!,
     logLevel: 'debug',
     logRequests: true,
     logResponses: true
   });

   // Увидеть, что именно делает SDK
   await sdk.products.listProducts();
   ```

2. **Просмотреть документацию:**
   - Проверить [Справочник API](../api/modules.html)
   - Просмотреть [Лучшие практики](/ru/guides/best-practices.md)
   - Прочитать [Примеры](../../examples/)

3. **Проверить версию SDK:**
   ```bash
   npm list @daytona/wildberries-sdk
   # Обновить, если устарела
   npm update @daytona/wildberries-sdk
   ```

4. **Создать минимальное воспроизведение:**
   ```typescript
   // Изолировать проблему
   import { WildberriesSDK } from '@daytona/wildberries-sdk';

   const sdk = new WildberriesSDK({
     apiKey: process.env.WB_API_KEY!
   });

   // Минимальный код, показывающий неожиданное поведение
   const result = await sdk.products.listProducts({ limit: 10 });
   console.log('Ожидалось: 10 товаров');
   console.log('Получено:', result.data.length);
   ```

5. **Сообщить о проблеме:**
   - Открыть [GitHub Issue](https://github.com/daytona/wildberries-sdk/issues)
   - Включить код воспроизведения
   - Предоставить версию SDK, версию Node
   - Включить логи отладки

**Как предотвратить:**
- Тщательно читать документацию
- Тестировать крайние случаи
- Использовать последнюю версию SDK
- Сообщать о багах, чтобы помочь другим

---

## Справочник кодов ошибок

Быстрый справочник для всех кодов ошибок, возвращаемых API.

### HTTP коды статуса

| Код | Ошибка | Категория | Повтор? | Решение |
|-----|--------|----------|--------|---------|
| 200 | OK | Успех | Н/Д | Запрос успешен |
| 201 | Created | Успех | Н/Д | Ресурс создан |
| 400 | Bad Request | Валидация | Нет | Исправить данные запроса |
| 401 | Unauthorized | Аутентификация | Нет | Проверить API ключ |
| 403 | Forbidden | Аутентификация | Нет | Проверить разрешения |
| 404 | Not Found | Валидация | Нет | Проверить ID ресурса |
| 422 | Unprocessable Entity | Валидация | Нет | Исправить формат запроса |
| 429 | Too Many Requests | Лимит запросов | Да | SDK автоматически повторяет |
| 500 | Internal Server Error | Сервер | Да | SDK автоматически повторяет |
| 502 | Bad Gateway | Сервер | Да | SDK автоматически повторяет |
| 503 | Service Unavailable | Сервер | Да | SDK автоматически повторяет |
| 504 | Gateway Timeout | Сервер | Да | SDK автоматически повторяет |

### Классы ошибок SDK

| Класс ошибки | Когда выбрасывается | Свойства | Восстановление |
|--------------|-------------------|----------|---------------|
| `AuthenticationError` | 401, 403, недействительный ключ | `statusCode`, `message` | Проверить API ключ, проверить разрешения |
| `RateLimitError` | 429, квота исчерпана | `retryAfter`, `quotaReset` | Ждать повтора, SDK обрабатывает автоматически |
| `ValidationError` | 400, 422, неверные данные | `fieldErrors`, `statusCode` | Исправить данные запроса по ошибкам полей |
| `NetworkError` | Тайм-ауты, 5xx, ошибки соединения | `cause`, `isTimeout` | Проверить сеть, SDK автоматически повторяет |
| `WBAPIError` | Все другие ошибки | `statusCode`, `response` | Проверить сообщение об ошибке и документацию |

### Распространенные паттерны ошибок

#### Паттерн 1: Ошибка аутентификации
```typescript
try {
  await sdk.products.listProducts();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Ошибка аутентификации:', error.message);
    // Проверить: API ключ валиден? Разрешения правильные? Ключ не истек?
  }
}
```

#### Паттерн 2: Превышен лимит запросов
```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Лимит запросов. Повтор через ${error.retryAfter}ms`);
    // SDK автоматически повторяет - это срабатывает только после исчерпания всех повторов
  }
}
```

#### Паттерн 3: Ошибка валидации
```typescript
try {
  await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Валидация не прошла:');
    for (const [field, message] of Object.entries(error.fieldErrors)) {
      console.error(`  - ${field}: ${message}`);
    }
    // Исправить конкретные поля, упомянутые в error.fieldErrors
  }
}
```

#### Паттерн 4: Сетевая ошибка
```typescript
try {
  await sdk.ordersFBS.getOrders();
} catch (error) {
  if (error instanceof NetworkError) {
    if (error.isTimeout) {
      console.error('Тайм-аут запроса');
      // Увеличить тайм-аут или оптимизировать запрос
    } else {
      console.error('Сетевая ошибка:', error.message);
      // Проверить подключение, межсетевой экран, DNS
    }
  }
}
```

---

## Блок-схема устранения неполадок

Быстрое дерево решений для диагностики распространенных проблем.

```
┌─────────────────────────────────────┐
│ Возникла проблема с SDK?            │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Шаг 1: Включить режим отладки       │
│ logLevel: 'debug'                   │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Шаг 2: Проверить код ошибки         │
└─────────────────┬───────────────────┘
                  │
          ┌───────┴───────┐
          │               │
    Это 401?         Это 429?
          │               │
          ДА              ДА
          │               │
          ▼               ▼
┌──────────────────┐ ┌──────────────────┐
│ Проблемы         │ │ Проблемы         │
│ аутентификации   │ │ лимита запросов  │
│ - Проверить      │ │ - Ждать повтора  │
│   API ключ       │ │ - Реализовать    │
│ - Проверить      │ │   пакетную       │
│   разрешения     │ │   обработку      │
│ - Тест с ping    │ │                  │
└──────────────────┘ └──────────────────┘
          │
          НЕТ
          │
          ▼
┌─────────────────────────────────────┐
│ Это 400 или 422?                    │
└─────────────────┬───────────────────┘
                  │
                  ДА
                  │
                  ▼
┌─────────────────────────────────────┐
│ Проблемы валидации                  │
│ - Проверить обязательные поля       │
│ - Проверить типы данных             │
│ - Просмотреть ограничения полей     │
└─────────────────┬───────────────────┘
                  │
                  НЕТ
                  │
                  ▼
┌─────────────────────────────────────┐
│ Это ETIMEDOUT или ECONNREFUSED?     │
└─────────────────┬───────────────────┘
                  │
                  ДА
                  │
                  ▼
┌─────────────────────────────────────┐
│ Проблемы сети                       │
│ - Проверить подключение             │
│ - Тестировать разрешение DNS        │
│ - Проверить правила межсетевого     │
│   экрана                            │
│ - Проверить SSL сертификаты         │
└─────────────────┬───────────────────┘
                  │
                  НЕТ
                  │
                  ▼
┌─────────────────────────────────────┐
│ Это TypeError или Module Error?     │
└─────────────────┬───────────────────┘
                  │
                  ДА
                  │
                  ▼
┌─────────────────────────────────────┐
│ Общие проблемы                      │
│ - Проверить установку SDK           │
│ - Проверить пути импорта            │
│ - Просмотреть имена методов         │
│ - Проверить типы TypeScript         │
└─────────────────┬───────────────────┘
                  │
                  НЕТ
                  │
                  ▼
┌─────────────────────────────────────┐
│ Шаг 3: Поиск в документации         │
│ - Проверить справочник API          │
│ - Просмотреть лучшие практики       │
│ - Прочитать примеры                 │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Шаг 4: Все еще застряли?            │
│ - Поиск в GitHub Issues             │
│ - Проверить FAQ                     │
│ - Создать тему в Discussions        │
│ - Связаться с поддержкой            │
└─────────────────────────────────────┘
```

### Контрольный список быстрой диагностики

Перед углубленным устранением неполадок:

- [ ] **Включить режим отладки** - Установить `logLevel: 'debug'`
- [ ] **Проверить API ключ** - Проверить, что он установлен и валиден
- [ ] **Просмотреть сообщение об ошибке** - Прочитать полный стек трейс ошибки
- [ ] **Проверить код статуса** - См. [Справочник кодов ошибок](#справочник-кодов-ошибок)
- [ ] **Тестировать подключение** - Можете ли вы достичь API?
- [ ] **Проверить версию SDK** - Актуальна ли она?
- [ ] **Проверить версию Node** - Требуется Node 18+
- [ ] **Просмотреть данные запроса** - Валидны ли они?
- [ ] **Проверить лимиты запросов** - Находитесь ли вы в пределах лимитов?
- [ ] **Поиск issues** - Кто-то еще сталкивался с этой проблемой?

---

## Получение помощи

Если вы не можете решить проблему, используя это руководство:

### 1. Поиск в существующих ресурсах

- **GitHub Issues**: [Поиск закрытых и открытых issues](https://github.com/daytona/wildberries-sdk/issues)
- **FAQ**: Проверить [Часто задаваемые вопросы](/ru/FAQ.md)
- **Справочник API**: Просмотреть [Документацию API](../api/modules.html)
- **Примеры**: Посмотреть [рабочие примеры](../../examples/)

### 2. Спросить сообщество

- **GitHub Discussions**: [Задавать вопросы и делиться знаниями](https://github.com/daytona/wildberries-sdk/discussions)
- **Stack Overflow**: Отмечать вопросы тегом `wildberries-sdk`

### 3. Сообщить о баге

Если вы нашли баг, [откройте GitHub issue](https://github.com/daytona/wildberries-sdk/issues/new).

**Включить в отчет:**

```typescript
// 1. Версия SDK
import { version } from '@daytona/wildberries-sdk';
console.log('Версия SDK:', version);  // например, 1.0.0

// 2. Версия Node.js
console.log('Версия Node:', process.version);  // например, v20.11.1

// 3. Сообщение об ошибке
console.error('Ошибка:', error.message);
console.error('Stack:', error.stack);

// 4. Минимальный код воспроизведения
const sdk = new WildberriesSDK({
  apiKey: 'test',  // Не делитесь реальным ключом!
  logLevel: 'debug'
});

try {
  await sdk.products.listProducts();
} catch (error) {
  console.error('Произошла ошибка:', error);
}

// 5. Логи отладки (с удаленными конфиденциальными данными)
```

### 4. Связаться с поддержкой

Для срочных вопросов или корпоративной поддержки:

- **Email**: support@daytona.com
- **Время ответа**:
  - Критичные проблемы: <24 часа
  - Высокий приоритет: <48 часов
  - Обычный приоритет: <5 рабочих дней

### Что делает отчет о баге хорошим

✅ **Хороший отчет:**
- Ясный, описательный заголовок
- Шаги для воспроизведения
- Ожидаемое vs фактическое поведение
- Версии SDK и Node
- Минимальный пример кода
- Логи отладки (очищенные)
- Детали окружения

❌ **Плохой отчет:**
- "Это не работает"
- Нет примера кода
- Нет сообщения об ошибке
- Нет информации о версии
- Дамп полного кода приложения
- Включены секреты/API ключи

---

## Следующие шаги

- Просмотреть [Руководство по лучшим практикам](/ru/guides/best-practices.md), чтобы избежать распространенных проблем
- Проверить [Руководство по настройке производительности](/ru/guides/performance-tuning.md) для оптимизации
- Прочитать [Справочник API](../api/modules.html) для детальной документации
- Исследовать [Примеры](../../examples/) для рабочих образцов кода

---

**Последнее обновление**: 2024-10-27
**Версия документа**: 1.0
**Версия SDK**: 1.0.0

Для последней версии этого руководства посетите [GitHub репозиторий](https://github.com/daytona/wildberries-sdk).

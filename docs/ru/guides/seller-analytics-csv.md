---
title: CSV-отчёты аналитики продавца
description: Руководство по генерации и скачиванию CSV-отчётов аналитики с помощью Wildberries SDK
layout: doc
---

# CSV-отчёты аналитики продавца

Данное руководство охватывает генерацию и скачивание долгосрочных аналитических отчётов в формате CSV через Wildberries SDK. CSV-отчёты позволяют экспортировать до одного года исторических данных -- воронки продаж, историю остатков и аналитику поисковых запросов -- в виде ZIP-архивов с CSV-файлами.

## Содержание

- [Что такое CSV-отчёты](#что-такое-csv-отчёты)
- [Необходимые условия](#необходимые-условия)
- [Методы SDK](#методы-sdk)
- [Типы отчётов](#типы-отчётов)
- [Процесс «Создание-Опрос-Скачивание»](#процесс-создание-опрос-скачивание)
- [Опрос статуса отчёта](#опрос-статуса-отчёта)
- [Скачивание файла отчёта](#скачивание-файла-отчёта)
- [Повторная генерация неуспешных отчётов](#повторная-генерация-неуспешных-отчётов)
- [Практические сценарии](#практические-сценарии)
- [Важные замечания](#важные-замечания)
- [Обработка ошибок](#обработка-ошибок)
- [Связанные ресурсы](#связанные-ресурсы)

## Что такое CSV-отчёты

CSV-отчёты -- это долгосрочные аналитические выгрузки, генерируемые асинхронно через API аналитики продавца Wildberries. В отличие от JSON-эндпоинтов реального времени, возвращающих постраничные данные за короткие периоды, CSV-отчёты:

- Охватывают периоды до **1 года** исторических данных
- Генерируются **асинхронно** -- вы создаёте задачу, затем опрашиваете статус до завершения
- Доставляются в виде **ZIP-архивов**, содержащих один или несколько CSV-файлов
- Требуют **подписки Jam** (см. [Определение подписки Jam](/guides/jam-subscription))
- Поддерживают фильтрацию по артикулам, брендам, предметам и тегам
- Хранятся на серверах Wildberries в течение **48 часов** после генерации

CSV-отчёты идеально подходят для загрузки в BI-дашборды, проведения офлайн-анализа или построения автоматизированных пайплайнов обработки данных, агрегирующих недели или месяцы данных маркетплейса.

## Необходимые условия

- SDK установлен и настроен с действующим API-ключом
- **Подписка Jam** активна на вашем аккаунте продавца
- API-ключ с правами доступа к Аналитике

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import { randomUUID } from 'crypto';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
```

## Методы SDK

Процесс работы с CSV-отчётами использует четыре метода `sdk.analytics`:

| Шаг | Метод | Назначение |
|-----|-------|-----------|
| 1. Создание | `createNmReportDownload(data)` | Отправка задачи генерации отчёта |
| 2. Опрос | `getNmReportDownloads(options?)` | Проверка статуса генерации |
| 3а. Скачивание | `getDownloadsFile(downloadId)` | Скачивание готового ZIP-архива |
| 3б. Повтор | `createDownloadsRetry(data)` | Повторная постановка в очередь неуспешного отчёта |

Все четыре метода разделяют общий лимит запросов: **3 запроса в минуту** с 20-секундным интервалом.

### createNmReportDownload

Создаёт задачу генерации отчёта. Вы указываете UUID, сгенерированный на стороне продавца, тип отчёта, диапазон дат и необязательные фильтры.

```typescript
const reportId = randomUUID();

const result = await sdk.analytics.createNmReportDownload({
  id: reportId,
  reportType: 'DETAIL_HISTORY_REPORT',
  userReportName: 'Воронка продаж Q1',
  params: {
    nmIDs: [123456789, 987654321],
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    timezone: 'Europe/Moscow',
    aggregationLevel: 'day',
  },
});

console.log(result.data); // "Report generation started"
```

**Параметры:**

- `id` (string, обязательный) -- UUID, сгенерированный продавцом. Этот ID используется для опроса статуса и скачивания файла.
- `reportType` (string, обязательный) -- Один из [типов отчётов](#типы-отчётов), перечисленных ниже.
- `userReportName` (string, необязательный) -- Человекочитаемое название отчёта.
- `params` (object, обязательный) -- Фильтры и конфигурация периода. Набор полей зависит от типа отчёта.

### getNmReportDownloads

Возвращает список отчётов с текущим статусом генерации. Опционально можно отфильтровать по конкретным ID отчётов.

```typescript
// Получение всех отчётов
const allReports = await sdk.analytics.getNmReportDownloads();

// Фильтрация по конкретным ID отчётов
const filtered = await sdk.analytics.getNmReportDownloads({
  'filter[downloadIds]': [reportId],
});

for (const report of filtered.data) {
  console.log(`${report.id}: ${report.status} (${report.name})`);
}
```

**Поля ответа для каждого отчёта:**

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | string | UUID отчёта |
| `createdAt` | string | Временная метка завершения генерации |
| `status` | string | `WAITING`, `PROCESSING`, `SUCCESS`, `RETRY` или `FAILED` |
| `name` | string | Название отчёта |
| `size` | number | Размер файла в байтах |
| `startDate` | string | Дата начала периода |
| `endDate` | string | Дата окончания периода |

### getDownloadsFile

Скачивает завершённый отчёт в виде ZIP-архива. Возвращает `ArrayBuffer`, который можно сохранить на диск или обработать в памяти.

```typescript
const zipBuffer = await sdk.analytics.getDownloadsFile(reportId);

// Сохранение на диск
import { writeFileSync } from 'fs';
writeFileSync('report.zip', Buffer.from(zipBuffer));
```

### createDownloadsRetry

Повторно ставит в очередь отчёт со статусом `FAILED`. Передайте исходный ID отчёта.

```typescript
const retryResult = await sdk.analytics.createDownloadsRetry({
  downloadId: reportId,
});

console.log(retryResult.data); // "Report retry started"
```

## Типы отчётов

Каждый тип отчёта соответствует определённому интерфейсу запроса в SDK:

| Тип отчёта | Тип в SDK | Описание |
|------------|----------|----------|
| `DETAIL_HISTORY_REPORT` | `SalesFunnelProductReq` | Данные воронки продаж по отдельным товарам, сгруппированные по дням/неделям/месяцам |
| `GROUPED_HISTORY_REPORT` | `SalesFunnelGroupReq` | Данные воронки продаж, сгруппированные по предметам, брендам или тегам |
| `SEARCH_QUERIES_PREMIUM_REPORT_GROUP` | `SearchReportGroupReq` | Аналитика поисковых запросов, сгруппированная по предметам, брендам или тегам |
| `SEARCH_QUERIES_PREMIUM_REPORT_PRODUCT` | `SearchReportProductReq` | Аналитика поисковых запросов по отдельным товарам |
| `SEARCH_QUERIES_PREMIUM_REPORT_TEXT` | `SearchReportTextReq` | Аналитика поисковых запросов по поисковому тексту |
| `STOCK_HISTORY_REPORT_CSV` | `StocksReportReq` | История уровней запасов |

### Типы отчётов воронки продаж

`DETAIL_HISTORY_REPORT` и `GROUPED_HISTORY_REPORT` экспортируют метрики воронки продаж (просмотры, добавления в корзину, заказы, конверсии) во времени. Они поддерживают параметр `aggregationLevel`:

- `day` -- одна строка на день (по умолчанию)
- `week` -- одна строка на неделю
- `month` -- одна строка на месяц

### Типы отчётов поисковых запросов

Три типа `SEARCH_QUERIES_PREMIUM_REPORT_*` экспортируют данные о показателях поисковых запросов. Они требуют подписки Jam и принимают флаги-фильтры `includeSubstitutedSKUs` и `includeSearchTexts`. Хотя бы один из этих двух флагов должен быть `true`.

### Тип отчёта по истории запасов

`STOCK_HISTORY_REPORT_CSV` экспортирует исторические уровни запасов с использованием `CommonReportFilters`, включающих фильтрацию по типу склада и фильтры наличия.

## Процесс «Создание-Опрос-Скачивание»

Генерация CSV-отчётов является асинхронной. Типичный процесс включает три шага:

```
1. СОЗДАНИЕ  -->  Отправка задачи отчёта с UUID
2. ОПРОС     -->  Проверка статуса каждые 30-60 секунд
3. СКАЧИВАНИЕ -->  Получение ZIP при статусе SUCCESS
```

Вот полный пример:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import { randomUUID } from 'crypto';
import { writeFileSync } from 'fs';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function generateAndDownloadReport(): Promise<void> {
  const reportId = randomUUID();

  // Шаг 1: Создание задачи отчёта
  await sdk.analytics.createNmReportDownload({
    id: reportId,
    reportType: 'DETAIL_HISTORY_REPORT',
    userReportName: 'Ежемесячная выгрузка продаж',
    params: {
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      timezone: 'Europe/Moscow',
      aggregationLevel: 'day',
    },
  });

  console.log(`Отчёт ${reportId} отправлен. Ожидание завершения...`);

  // Шаг 2: Опрос до готовности
  const status = await pollUntilReady(reportId);

  if (status === 'FAILED') {
    console.error('Генерация отчёта не удалась. Повторная попытка...');
    await sdk.analytics.createDownloadsRetry({ downloadId: reportId });
    // Повторный опрос после повтора
    await pollUntilReady(reportId);
  }

  // Шаг 3: Скачивание ZIP
  const zipBuffer = await sdk.analytics.getDownloadsFile(reportId);
  const fileName = `report-${reportId}.zip`;
  writeFileSync(fileName, Buffer.from(zipBuffer));
  console.log(`Отчёт сохранён в ${fileName}`);
}

async function pollUntilReady(
  reportId: string,
  maxAttempts = 30,
  intervalMs = 30_000
): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await sdk.analytics.getNmReportDownloads({
      'filter[downloadIds]': [reportId],
    });

    const report = response.data.find((r) => r.id === reportId);

    if (!report) {
      throw new Error(`Отчёт ${reportId} не найден в списке загрузок`);
    }

    console.log(`  Попытка ${attempt}: статус = ${report.status}`);

    if (report.status === 'SUCCESS') {
      return 'SUCCESS';
    }

    if (report.status === 'FAILED') {
      return 'FAILED';
    }

    // WAITING, PROCESSING или RETRY -- продолжаем опрос
    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  throw new Error(`Отчёт ${reportId} не завершился за ${maxAttempts} попыток`);
}
```

## Опрос статуса отчёта

Статус отчёта проходит через следующие состояния:

```
WAITING  -->  PROCESSING  -->  SUCCESS
                           -->  FAILED  -->  (повтор)  -->  RETRY  -->  SUCCESS
```

| Статус | Значение | Действие |
|--------|----------|----------|
| `WAITING` | В очереди на обработку | Продолжайте опрос |
| `PROCESSING` | Генерируется | Продолжайте опрос |
| `SUCCESS` | Готов к скачиванию | Вызовите `getDownloadsFile()` |
| `RETRY` | Повторно поставлен в очередь | Продолжайте опрос |
| `FAILED` | Генерация не удалась | Вызовите `createDownloadsRetry()` |

### Рекомендации по интервалу опроса

- **Минимальный интервал**: 20 секунд (соответствует интервалу лимита запросов)
- **Рекомендуемый интервал**: 30--60 секунд для большинства отчётов
- **Большие отчёты** (за полный год, все товары): 60--120 секунд
- **Максимум попыток**: 30--60 в зависимости от размера отчёта

::: tip Учёт лимитов запросов
Каждый вызов опроса считается в общем лимите 3 запроса в минуту. При 30-секундном интервале опроса вы используете 2 запроса в минуту, оставляя запас для других аналитических вызовов.
:::

## Скачивание файла отчёта

`getDownloadsFile()` возвращает `ArrayBuffer` с ZIP-архивом. ZIP содержит один или несколько CSV-файлов с данными отчёта.

### Сохранение на диск

```typescript
import { writeFileSync } from 'fs';

const zipBuffer = await sdk.analytics.getDownloadsFile(reportId);
writeFileSync(`analytics-${reportId}.zip`, Buffer.from(zipBuffer));
```

### Извлечение и обработка в памяти

```typescript
import { Readable } from 'stream';
import unzipper from 'unzipper'; // npm install unzipper

const zipBuffer = await sdk.analytics.getDownloadsFile(reportId);
const stream = Readable.from(Buffer.from(zipBuffer));

const directory = await unzipper.Open.buffer(Buffer.from(zipBuffer));

for (const file of directory.files) {
  const content = await file.buffer();
  const csvText = content.toString('utf-8');
  console.log(`Файл: ${file.path}, строк: ${csvText.split('\n').length}`);
  // Парсинг строк CSV для вашего BI-пайплайна
}
```

## Повторная генерация неуспешных отчётов

Когда отчёт завершается со статусом `FAILED`, используйте `createDownloadsRetry()` для повторной постановки в очередь. Повтор использует тот же ID отчёта и параметры, что и исходный запрос.

```typescript
import {
  WBAPIError,
  RateLimitError,
} from 'daytona-wildberries-typescript-sdk';

async function downloadWithRetry(
  sdk: WildberriesSDK,
  reportId: string,
  maxRetries = 2
): Promise<ArrayBuffer> {
  for (let retry = 0; retry <= maxRetries; retry++) {
    const status = await pollUntilReady(reportId);

    if (status === 'SUCCESS') {
      return sdk.analytics.getDownloadsFile(reportId);
    }

    if (status === 'FAILED' && retry < maxRetries) {
      console.warn(`Отчёт не удался. Повтор ${retry + 1} из ${maxRetries}...`);
      await sdk.analytics.createDownloadsRetry({ downloadId: reportId });
      // Ожидание перед повторным опросом
      await new Promise((resolve) => setTimeout(resolve, 30_000));
    }
  }

  throw new Error(`Отчёт ${reportId} не удался после ${maxRetries} повторов`);
}
```

## Практические сценарии

### Экспорт 3-месячной истории продаж для BI-дашборда

```typescript
import { randomUUID } from 'crypto';
import { writeFileSync } from 'fs';

async function exportQuarterlyData(sdk: WildberriesSDK): Promise<void> {
  const reportId = randomUUID();

  await sdk.analytics.createNmReportDownload({
    id: reportId,
    reportType: 'DETAIL_HISTORY_REPORT',
    userReportName: 'Выгрузка для BI Q1 2026',
    params: {
      startDate: '2026-01-01',
      endDate: '2026-03-31',
      timezone: 'Europe/Moscow',
      aggregationLevel: 'day',
      // Без фильтра nmIDs = все товары
    },
  });

  const status = await pollUntilReady(reportId);

  if (status === 'SUCCESS') {
    const zip = await sdk.analytics.getDownloadsFile(reportId);
    writeFileSync('q1-2026-sales.zip', Buffer.from(zip));
    console.log('Квартальная выгрузка завершена');
  }
}
```

### Автоматическая ежедневная генерация отчёта по остаткам

```typescript
async function dailyStockExport(sdk: WildberriesSDK): Promise<void> {
  const reportId = randomUUID();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  await sdk.analytics.createNmReportDownload({
    id: reportId,
    reportType: 'STOCK_HISTORY_REPORT_CSV',
    userReportName: `Отчёт по остаткам ${fmt(yesterday)}`,
    params: {
      currentPeriod: {
        start: fmt(yesterday),
        end: fmt(today),
      },
      stockType: '',        // Все типы складов
      skipDeletedNm: true,
      availabilityFilters: [],
      orderBy: { field: 'nmId', mode: 'asc' },
    },
  });

  const status = await pollUntilReady(reportId, 20, 30_000);

  if (status === 'SUCCESS') {
    const zip = await sdk.analytics.getDownloadsFile(reportId);
    writeFileSync(`stock-${fmt(yesterday)}.zip`, Buffer.from(zip));
    console.log(`Отчёт по остаткам за ${fmt(yesterday)} сохранён`);
  } else {
    console.error('Генерация отчёта по остаткам не удалась');
  }
}
```

### Отчёт по поисковым запросам для конкретных брендов

```typescript
async function brandSearchReport(
  sdk: WildberriesSDK,
  brandNames: string[]
): Promise<void> {
  const reportId = randomUUID();

  await sdk.analytics.createNmReportDownload({
    id: reportId,
    reportType: 'SEARCH_QUERIES_PREMIUM_REPORT_GROUP',
    userReportName: `Поисковый отчёт по брендам`,
    params: {
      brandNames,
      startDate: '2026-03-01',
      endDate: '2026-03-29',
      topOrderBy: 'orders',
      orderBy: { field: 'orders', mode: 'desc' },
      includeSubstitutedSKUs: true,
      includeSearchTexts: true,
      limit: 50,
    },
  });

  const status = await pollUntilReady(reportId);

  if (status === 'SUCCESS') {
    const zip = await sdk.analytics.getDownloadsFile(reportId);
    writeFileSync(`brand-search-${reportId}.zip`, Buffer.from(zip));
  }
}
```

## Важные замечания

### Срок хранения файлов

Сгенерированные отчёты хранятся на серверах Wildberries в течение **48 часов**. После этого файл удаляется, и необходимо создать новую задачу отчёта. Скачивайте своевременно или настройте автоматизацию, которая забирает файлы вскоре после завершения генерации.

### Генерация UUID

Поле `id` в `createNmReportDownload` должно содержать валидный UUID, сгенерированный на стороне продавца. Используйте `crypto.randomUUID()` (Node.js 19+) или пакет `uuid`. Каждая задача отчёта должна иметь уникальный ID -- повторное использование ID приведёт к конфликту с существующим отчётом.

### Дневной лимит отчётов

Существует лимит **20 отчётов в день** на аккаунт продавца. Планируйте генерацию отчётов соответственно. Если вам нужны несколько типов отчётов, группируйте их эффективно.

### Уровни агрегации

Отчёты воронки продаж (`DETAIL_HISTORY_REPORT`, `GROUPED_HISTORY_REPORT`) поддерживают три уровня агрегации:

- `day` -- одна точка данных на день (по умолчанию, наивысшая гранулярность)
- `week` -- одна точка данных на неделю
- `month` -- одна точка данных на месяц

Выбирайте уровень агрегации исходя из ваших аналитических потребностей. Дневная гранулярность за полный год генерирует большие файлы.

### Требование подписки Jam

CSV-отчёты аналитики доступны только продавцам с активной подпиской Jam. Без Jam запросы на создание отчётов будут завершаться ошибкой. Ознакомьтесь с руководством [Определение подписки Jam](/guides/jam-subscription) для программной проверки статуса подписки перед попыткой генерации отчётов.

## Обработка ошибок

```typescript
import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from 'daytona-wildberries-typescript-sdk';

async function safeReportGeneration(sdk: WildberriesSDK): Promise<void> {
  try {
    const reportId = randomUUID();

    await sdk.analytics.createNmReportDownload({
      id: reportId,
      reportType: 'DETAIL_HISTORY_REPORT',
      params: {
        startDate: '2026-01-01',
        endDate: '2026-03-31',
        aggregationLevel: 'day',
      },
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Недействительный API-ключ или недостаточно прав');
    } else if (error instanceof RateLimitError) {
      console.error(`Превышен лимит запросов. Повторите через ${error.retryAfter}мс`);
    } else if (error instanceof ValidationError) {
      // Некорректный тип отчёта, неверный диапазон дат, отсутствуют обязательные поля
      console.error('Ошибка валидации:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('Проблема сетевого подключения:', error.message);
    } else if (error instanceof WBAPIError) {
      // Требуется подписка Jam, превышен дневной лимит и т.д.
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
    throw error;
  }
}
```

## Связанные ресурсы

- [Справочник модуля Аналитики](/modules/analytics) -- Полный справочник для всех методов аналитики
- [Определение подписки Jam](/guides/jam-subscription) -- Определение тарифа Jam перед генерацией CSV-отчётов
- [Аналитика воронки продаж](/guides/sales-funnel-analytics) -- Данные воронки продаж в реальном времени через JSON-эндпоинты
- [Аналитика поисковых запросов](/guides/search-queries-analytics) -- Данные поисковых запросов в реальном времени через JSON-эндпоинты
- [Лучшие практики](/guides/best-practices) -- Общие паттерны использования SDK и советы для продакшена

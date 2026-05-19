# Wildberries API TypeScript SDK

[![CI](https://github.com/salacoste/daytona-wildberries-typescript-sdk/workflows/CI/badge.svg)](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions)
[![Documentation Deploy](https://github.com/salacoste/daytona-wildberries-typescript-sdk/workflows/Documentation%20Deploy/badge.svg)](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/workflows/docs.yml)
[![npm version](https://badge.fury.io/js/daytona-wildberries-typescript-sdk.svg)](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
[![Coverage](https://img.shields.io/codecov/c/github/salacoste/daytona-wildberries-typescript-sdk)](https://codecov.io/gh/salacoste/daytona-wildberries-typescript-sdk)
[![License: Personal Use](https://img.shields.io/badge/License-Personal%20Use-blue.svg)](LICENSE)

**Full-featured TypeScript SDK providing type-safe access to all Wildberries marketplace API methods.**

**Полнофункциональный TypeScript SDK с полной типизацией для всех методов API маркетплейса Wildberries.**

---

> **📚 [Complete Documentation](https://salacoste.github.io/daytona-wildberries-typescript-sdk/)** | **Languages:** English | [Русский (Russian)](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/)

---

## 🌍 Language / Язык

- **[English Version](#english-version)** - Full documentation in English
- **[Русская Версия](#русская-версия)** - Полная документация на русском языке

---

# English Version

Transform 11 OpenAPI specifications into a production-ready SDK with 14 modules, complete type safety, automatic rate limiting, retry mechanisms, and comprehensive error handling. Reduce integration time from weeks to hours.

## ✨ Features

- **🔐 Complete Type Safety** - Auto-generated TypeScript types from OpenAPI specifications for all 14 API modules
- **⚡ Automatic Rate Limiting** - Built-in enforcement of per-endpoint rate limits with intelligent queuing and Basic/Test token multipliers
- **🔄 Smart Retry Logic** - Exponential backoff retry mechanism for transient failures with per-request timeout support
- **🛡️ Rich Error Handling** - Typed error hierarchy with detailed recovery guidance
- **📦 Tree-Shakeable** - Dual ESM/CommonJS builds, import only what you need (<100KB gzipped)
- **✅ Battle-Tested** - 2,207 tests passing across all modules
- **🎯 100% API Coverage** - All YAML endpoints implemented including v1 Finance Reports and Acquiring Reports
- **📚 Comprehensive Documentation** - Complete API reference, 44 guides, tutorials, and working examples in English and Russian
- **🔧 Zero Configuration** - Works out of the box with sensible defaults, configurable for advanced use
- **💰 Finance v1 Reports** - Sales Reports and Acquiring Reports with `parseMoneyAmount()` helper and field union types for autocomplete
- **🔔 Deprecation Utilities** - `warnOnce()` and `resetDeprecationWarnings()` for clean migration workflows

## What's New (v3.14.0) — May 2026

🚨 **Silent semantic break deadline: 2026-06-16** — WB changes the `withPhoto` filter: `withPhoto: 0` (or missing) will mean "ALL cards" instead of "no-photo only". The new value `withPhoto: 2` replaces the old `0` semantic. **No HTTP error, no signal — wrong data.** Migrate before the deadline.

🆕 **New `WITH_PHOTO_FILTER` const** — `import { WITH_PHOTO_FILTER } from 'daytona-wildberries-typescript-sdk'`. Use `WITH_PHOTO_FILTER.NO_PHOTO` (= 2), `WITH_PHOTO_FILTER.WITH_PHOTO` (= 1), or `WITH_PHOTO_FILTER.ALL` (= -1) instead of magic numbers.

🔔 **Runtime warn-once**: first call with `withPhoto: 0` emits a `console.warn` pointing to the migration guide and deadline. Use `resetDeprecationWarnings()` in tests.

See [CHANGELOG v3.14.0](#3140---2026-05-15) and the [migration guide](./docs/guides/withphoto-semantic-migration.md) for the full migration matrix and code examples.

## What's New (v3.13.0) — May 2026

🔧 **Critical fix: `sdk.communications.createSellerMessage()` now works** — the method previously sent an empty body on every call (broken since introduction). v3.13.0 requires a `data: SellerMessageRequest` parameter. Existing TypeScript call sites `createSellerMessage()` will fail to compile — this is intentional; the old signature never worked.

⚠️ **replySign format deadline: 2026-06-04** — WB updated the `replySign` field format. Old-format values cached before this date will be rejected with HTTP 400 after the cutoff. Always refresh via `getSellerChats()` before calling `createSellerMessage()`.

🆕 **New type exported**: `SellerMessageRequest` — `import type { SellerMessageRequest } from 'daytona-wildberries-typescript-sdk'`.

🔔 **Heuristic warn-once**: SDK emits a one-time `console.warn` when a probable old-format `replySign` is detected at runtime. Use `resetDeprecationWarnings()` in tests.

See [CHANGELOG v3.13.0](#3130---2026-05-14) and the [migration guide](./docs/guides/chat-replysign-format-migration.md) for full details.

## What's New (v3.12.0) — May 2026

⚠️ **Critical migration deadline: 2026-05-20 13:00 MSK** — Wildberries begins disabling the legacy `sku` parameter on seller-warehouse stock endpoints. Migrate now.

🆕 **3 stock methods on `sdk.products`** now accept `chrtId` / `chrtIds` (size IDs from `POST /content/v2/get/cards/list`):
- `sdk.products.getStocks(warehouseId, { chrtIds })` — preferred path
- `sdk.products.updateStock(warehouseId, { stocks: [{ chrtId, amount }] })` — per-item migration
- `sdk.products.deleteStock(warehouseId, { chrtIds })` — preferred path

🔧 **Deprecation handling**: legacy `sku`/`skus` parameters work until 2026-05-20 but emit a one-time `console.warn`. After the deadline: WB returns HTTP 400.

🆕 **4 new types exported**: `StockItem`, `StocksRequest`, `UpdateStockRequest`, `GetStocksResponse`.

See [CHANGELOG v3.12.0](#3120---2026-05-14) and the [migration guide](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/stocks-sku-to-chrtid-migration) for full details.

## What's New (v3.11.0) — May 2026

🆕 **4 new DBW methods on `sdk.ordersFBW`** — WB disables legacy single-order DBW endpoints on **2026-06-05**; migrate now:
- `sdk.ordersFBW.deleteMetaBulk({ orders, key })` — bulk metadata deletion
- `sdk.ordersFBW.setSgtinBulk({ orders })` — bulk SGTIN assignment
- `sdk.ordersFBW.deliverBulk(orderIds)` — bulk status → delivered (1–1000 orders, with 409 MetaValidationFail support)
- `sdk.ordersFBW.checkMetaValidation({ orders })` — pre-flight metadata validator: find invalid SGTIN/IMEI/UIN before calling `deliverBulk()`, avoiding the 409 guess-and-retry loop

See [CHANGELOG v3.11.0](#3110---unreleased) for full details and migration notes.

## What's New (v3.10.2 hotfix)

🔧 **Bug fix**: `validateRequiredCharacteristics` and `validateMergedCardVariants` now correctly handle `existNamedField:true` characteristics (brand, height, length, etc.). See CHANGELOG v3.10.2 for migration details.

## What's New (v3.10.0) — May 2026

🆕 **`sdk.returns` aggregator module** — single source of truth for return analytics. Combines FBO + FBS + Finance sources via `Promise.allSettled` with srid-based deduplication and per-source telemetry. Three methods:
- `sdk.returns.getReturns({ dateFrom, dateTo, ... })` — primary aggregator with partial-failure tolerance
- `sdk.returns.getReturnByOrderId(orderId, ...)` — single-record lookup
- `sdk.returns.getReturnStats({ groupBy: 'nmId' | 'category' | 'orderType' })` — aggregation buckets

🆕 **`classifyFbsReturnCategory()`** — heuristic FBS status history → return category enum

📚 **New EN+RU guide**: [Returns Module](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/returns-module) with Mermaid diagram, limitations table, and 4 copy-paste recipes

✅ **2207 tests passing**, 25 code review findings fixed (all severities)

- **v3.9.3** -- `classifyReturnReason()`, `enrichReturnsWithType()`, `reconcileBuyoutsAndReturns()` helpers + new guide
- **v3.9.2** -- `isVariable` field + `validateMergedCardVariants()` helper
- **v3.9.1** -- `validateRequiredCharacteristics()` helper for required-field pre-flight checks
- **v3.9.0** -- Mandatory product characteristics support (`isRequiredForCreate`), characteristic input/output types, DRY refactor

See [CHANGELOG.md](CHANGELOG.md) for the complete release history.

---

## ⚠️ Critical API Update

**Wildberries API Deprecation Notice** - Four Promotion API methods will be **disabled on February 2, 2026**:

- `getAutoGetnmtoadd()` - List of Product Cards (type 8 campaigns)
- `createAutoUpdatenm()` - Update Product Cards (type 8 campaigns)
- `getAutoStatWords()` - Statistics by Phrase Clusters (type 8 campaigns)
- `createAutoSetExcluded()` - Set/Remove Minus-Phrases (type 8 campaigns)

**Action Required:** Migrate to type 9 campaign methods before February 2, 2026.

📖 **[Complete Migration Guide](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/migration-v2.4-promotion-deprecation)**

---

## 📦 Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

### Requirements

- **Node.js:** ≥ 20.0.0
- **TypeScript:** ≥ 5.0.0 (for TypeScript projects)
- **Wildberries API Key:** [Get one here](https://seller.wildberries.ru/)

## 🚀 Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY! // Store securely in environment variables
});

// Test connectivity
const pingResponse = await sdk.general.ping();
console.log('Connected:', pingResponse.Status); // 'OK'

// Fetch product categories
const categories = await sdk.products.getParentAll();
console.log('Categories:', categories.data?.length);

// Get new orders
const orders = await sdk.ordersFBS.getOrdersNew();
console.log('New orders:', orders.orders?.length);

// Check account balance
const balance = await sdk.finances.getAccountBalance();
console.log('Balance:', balance.for_withdraw, balance.currency);

// Get advertising campaigns overview
const campaigns = await sdk.promotion.getCampaignCount();
console.log('Total campaigns:', campaigns.all);

// Get advertising balance
const advBalance = await sdk.promotion.getAdvBalance();
console.log('Ad cabinet balance:', advBalance.net);

// Get customer chat list with last messages
const chats = await sdk.communications.getSellerChats();
console.log('Active chats:', chats.result?.length);
chats.result?.forEach(chat => {
  if (chat.lastMessage) {
    console.log(`${chat.clientName}: "${chat.lastMessage.text}"`);
  }
});
```

**Time to First API Call:** <5 minutes 🚀

**👉 [Complete Quickstart Guide](https://salacoste.github.io/daytona-wildberries-typescript-sdk/getting-started/quickstart)**

### Advanced Configuration

The SDK accepts much more than just `apiKey`. Customize timeout, retry logic, rate limiting, and logging:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000,                    // Global timeout (default: 30000ms)
  logLevel: 'info',                  // 'debug' | 'info' | 'warn' | 'error'
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,
  },
});

// For slow operations, create an SDK instance with a longer timeout
const longTimeoutSdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 120000,                   // 2 min for report downloads
});
const reportFile = await longTimeoutSdk.analytics.getDownloadsFile(downloadId);
```

**👉 [Configuration Guide](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/configuration)**

---

## 📊 Project Status & Development

**Current Status:** 🟢 Production Ready | **SDK Version:** 3.10.0

**📖 [Project Status Summary](PROJECT_STATUS_SUMMARY.md)** — Comprehensive overview of all epics, stories, and implementation status.

### Quick Stats

| Metric | Value |
|--------|-------|
| **API Modules** | 14 (100%) |
| **API Endpoints** | 240+ implemented |
| **Test Suite** | 2,207 tests passing (100%) |
| **Documentation** | 44 guides, 22 examples |
| **Bundle Size** | ~91KB gzipped (ESM) |

> **⚠️ For Contributors:** When creating or completing epics/stories, **update [PROJECT_STATUS_SUMMARY.md](PROJECT_STATUS_SUMMARY.md)** to keep the project status current. This file is automatically generated and should reflect the latest implementation state.

---

## 📚 Documentation

### Getting Started
- **[5-Minute Quickstart](https://salacoste.github.io/daytona-wildberries-typescript-sdk/getting-started/quickstart)** - Get up and running
- **[Tutorials](https://salacoste.github.io/daytona-wildberries-typescript-sdk/getting-started/tutorials/)** - Step-by-step guides
- **[API Reference](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/)** - Complete TypeDoc documentation

### Guides
- **[Best Practices](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/best-practices)** - Production patterns
- **[Performance Tuning](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/performance)** - Optimization guide
- **[Security](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/security)** - Secure integration
- **[Communications](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/communications)** - Customer chat, Q&A, and reviews
- **[Promotion & Advertising](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/promotion-advertising)** - Campaign management
- **[Troubleshooting](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/troubleshooting)** - Common issues

## 🎯 Supported API Modules

All 14 Wildberries API modules are fully supported with 100% API coverage:

| Module | Description |
|--------|-------------|
| **General** | Ping, news, seller info, Jam subscription, seller rating |
| **Products** | Categories, CRUD, media, pricing, warehouse, stock, kizMarked support |
| **Orders FBS** | Seller fulfillment, order status, shipping, supplies, metadata validation |
| **Orders FBW** | WB warehouse fulfillment, supply planning, buyer info |
| **Orders DBS** | Delivery by Seller - bulk operations, B2B support, product marking (SGTIN, IMEI) |
| **Finances** | Balance, transactions, v1 Sales Reports, Acquiring Reports, `parseMoneyAmount()`, field union types |
| **Analytics** | Sales funnel, search queries, stock history, WB warehouse stock, CSV reports |
| **Reports** | Income reports, sales reports, data exports |
| **Communications** | Customer chat, product Q&A, reviews, pinned reviews for product cards |
| **Promotion** | Campaigns, bids, minus phrases, advertising |
| **Tariffs** | Commission rates, fee schedules |
| **In-Store Pickup** | Pickup point orders and management |
| **User Management** | Seller profile user management |
| **Returns** | Unified return analytics aggregator (FBO + FBS + Finance), `getReturns()`, `getReturnByOrderId()`, `getReturnStats()` |

## 📄 License

**Personal Use License** - Free for personal, educational, and non-commercial use.

✅ **Permitted:**
- Personal non-commercial use
- Educational purposes
- Open source projects (non-commercial)
- Learning and skill development

❌ **Not Permitted Without Commercial License:**
- Commercial use in business environments
- Selling or monetizing the SDK
- Providing paid services based on the SDK
- Use in commercial products/services

**For commercial use, please contact for licensing.**

See [LICENSE](LICENSE) file for complete terms.

## 🤝 Contributing

We welcome contributions! Whether it's bug reports, feature requests, documentation improvements, or code contributions.

**→ [Contributing Guide](CONTRIBUTING.md)**

## 📞 Support

- **📖 Documentation:** [https://salacoste.github.io/daytona-wildberries-typescript-sdk/](https://salacoste.github.io/daytona-wildberries-typescript-sdk/)
- **❓ FAQ:** [English](https://salacoste.github.io/daytona-wildberries-typescript-sdk/FAQ) | [Русский](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/FAQ)
- **🐛 Bug Reports:** [Open an issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

## ⚠️ Disclaimer

This is an unofficial SDK. It is not affiliated with, officially maintained by, or endorsed by Wildberries. Use at your own risk. Always refer to the [official Wildberries API documentation](https://dev.wildberries.ru/) for authoritative information.

---

# Русская Версия

Преобразуйте 11 OpenAPI спецификаций в production-готовый SDK с 14 модулями, полной типобезопасностью, автоматическими лимитами запросов, механизмами повторных попыток и комплексной обработкой ошибок. Сократите время интеграции с недель до часов.

## ✨ Возможности

- **🔐 Полная Типобезопасность** - Автоматически генерируемые TypeScript типы из OpenAPI для всех 14 модулей
- **⚡ Автоматические Лимиты Запросов** - Встроенное соблюдение лимитов для каждой конечной точки с умной очередью и множителями для Basic/Test токенов
- **🔄 Умная Логика Повторов** - Экспоненциальная задержка для временных сбоев с поддержкой таймаута для каждого запроса
- **🛡️ Богатая Обработка Ошибок** - Типизированная иерархия ошибок с подробными рекомендациями
- **📦 Tree-Shakeable** - Двойная сборка ESM/CommonJS, импортируйте только то, что нужно (<100KB gzip)
- **✅ Проверено в Бою** - 2,207 тестов для всех модулей
- **🎯 100% Покрытие API** - Все эндпоинты YAML реализованы, включая Финансовые Отчеты v1 и Эквайринг
- **📚 Полная Документация** - Справочник API, 44 руководства, примеры на английском и русском
- **🔧 Без Настройки** - Работает из коробки с разумными значениями по умолчанию
- **💰 Финансовые Отчеты v1** - Отчеты о продажах и эквайринге с хелпером `parseMoneyAmount()` и union-типами полей для автодополнения
- **🔔 Утилиты Для Устаревших Методов** - `warnOnce()` и `resetDeprecationWarnings()` для удобной миграции

## Что нового (v3.14.0) — Май 2026

🚨 **Скрытое изменение семантики, дедлайн 2026-06-16** — WB меняет фильтр `withPhoto`: значение `0` (или отсутствие параметра) будет означать «ВСЕ карточки» вместо «только без фото». Новое значение `withPhoto: 2` заменяет прежнюю семантику `0`. **HTTP 200, нет ошибки, нет сигнала — неправильные данные.** Мигрируйте до дедлайна.

🆕 **Новая константа `WITH_PHOTO_FILTER`** — `import { WITH_PHOTO_FILTER } from 'daytona-wildberries-typescript-sdk'`. Используйте `WITH_PHOTO_FILTER.NO_PHOTO` (= 2), `WITH_PHOTO_FILTER.WITH_PHOTO` (= 1) или `WITH_PHOTO_FILTER.ALL` (= -1) вместо магических чисел.

🔔 **Предупреждение при первом вызове**: первый вызов с `withPhoto: 0` выводит `console.warn` со ссылкой на руководство по миграции и дедлайном. Используйте `resetDeprecationWarnings()` в тестах.

Подробности — в [CHANGELOG v3.14.0](#3140---2026-05-15) и [руководстве по миграции](./docs/ru/guides/withphoto-semantic-migration.md) с полной матрицей миграции и примерами кода.

## Что нового (v3.13.0) — Май 2026

🔧 **Критическое исправление: `sdk.communications.createSellerMessage()` теперь работает** — метод ранее отправлял пустое тело при каждом вызове (сломан с момента появления). v3.13.0 требует параметр `data: SellerMessageRequest`. Существующие вызовы `createSellerMessage()` без аргументов перестанут компилироваться — это намеренно; старая сигнатура никогда не работала.

⚠️ **Дедлайн формата replySign: 2026-06-04** — WB обновил формат поля `replySign`. Старые значения, кэшированные до этой даты, будут отклоняться с HTTP 400 после дедлайна. Всегда обновляйте через `getSellerChats()` перед вызовом `createSellerMessage()`.

🆕 **Новый экспортируемый тип**: `SellerMessageRequest` — `import type { SellerMessageRequest } from 'daytona-wildberries-typescript-sdk'`.

🔔 **Эвристика warn-once**: SDK выводит одноразовое `console.warn`, если обнаруживает вероятный `replySign` старого формата. В тестах используйте `resetDeprecationWarnings()`.

Подробности — в [CHANGELOG v3.13.0](#3130---2026-05-14) и [руководстве по миграции](./docs/ru/guides/chat-replysign-format-migration.md).

## Что нового (v3.12.0) — Май 2026

⚠️ **Критический дедлайн миграции: 2026-05-20 13:00 MSK** — Wildberries начинает отключение legacy-параметра `sku` на эндпоинтах остатков склада продавца. Мигрируйте сейчас.

🆕 **3 метода остатков в `sdk.products`** теперь принимают `chrtId` / `chrtIds` (ID размеров из `POST /content/v2/get/cards/list`):
- `sdk.products.getStocks(warehouseId, { chrtIds })` — рекомендуемый путь
- `sdk.products.updateStock(warehouseId, { stocks: [{ chrtId, amount }] })` — миграция per-item
- `sdk.products.deleteStock(warehouseId, { chrtIds })` — рекомендуемый путь

🔧 **Обработка устаревания**: legacy `sku`/`skus` работают до 2026-05-20, но эмитят одноразовый `console.warn`. После дедлайна: WB возвращает HTTP 400.

🆕 **4 новых экспортируемых типа**: `StockItem`, `StocksRequest`, `UpdateStockRequest`, `GetStocksResponse`.

Подробности — в [CHANGELOG v3.12.0](#3120---2026-05-14) и в [руководстве по миграции](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/stocks-sku-to-chrtid-migration).

## Что нового (v3.11.0) — Май 2026

🆕 **4 новых DBW-метода в `sdk.ordersFBW`** — WB отключает legacy single-order DBW эндпоинты **2026-06-05**; мигрируйте заранее:
- `sdk.ordersFBW.deleteMetaBulk({ orders, key })` — массовое удаление маркировочных метаданных
- `sdk.ordersFBW.setSgtinBulk({ orders })` — массовая установка SGTIN-кодов
- `sdk.ordersFBW.deliverBulk(orderIds)` — массовая передача в доставку (1–1000 заказов, поддержка 409 MetaValidationFail)
- `sdk.ordersFBW.checkMetaValidation({ orders })` — проверка метаданных маркировки перед передачей в доставку (предварительная валидация): находит невалидные SGTIN/IMEI/UIN до вызова `deliverBulk()`, исключая петлю guess-and-retry при 409

Подробности и инструкции по миграции — в [CHANGELOG v3.11.0](#3110---unreleased).

## Что нового (v3.10.2 hotfix)

🔧 **Исправление**: `validateRequiredCharacteristics` и `validateMergedCardVariants` теперь корректно обрабатывают характеристики с `existNamedField:true` (бренд, высота, длина и т.д.). Подробности миграции — в CHANGELOG v3.10.2.

## Что Нового (v3.10.0) — Май 2026

🆕 **Агрегаторный модуль `sdk.returns`** — единый источник истины для аналитики возвратов. Объединяет источники FBO + FBS + Finance через `Promise.allSettled` с дедупликацией по srid и телеметрией по каждому источнику. Три метода:
- `sdk.returns.getReturns({ dateFrom, dateTo, ... })` — основной агрегатор с устойчивостью к частичным сбоям
- `sdk.returns.getReturnByOrderId(orderId, ...)` — поиск одной записи
- `sdk.returns.getReturnStats({ groupBy: 'nmId' | 'category' | 'orderType' })` — агрегация по группам

🆕 **`classifyFbsReturnCategory()`** — эвристический хелпер: история статусов FBS → enum категории возврата

📚 **Новое руководство EN+RU**: [Модуль Returns](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/returns-module) с диаграммой Mermaid, таблицей ограничений и 4 готовыми рецептами

✅ **2207 тестов проходят**, исправлено 25 замечаний по code review (все уровни серьёзности)

- **v3.9.3** -- хелперы `classifyReturnReason()`, `enrichReturnsWithType()`, `reconcileBuyoutsAndReturns()` + новое руководство
- **v3.9.2** -- поле `isVariable` + хелпер `validateMergedCardVariants()`
- **v3.9.1** -- хелпер `validateRequiredCharacteristics()` для предварительной проверки обязательных полей
- **v3.9.0** -- поддержка обязательных характеристик товаров (`isRequiredForCreate`), типы ввода/вывода характеристик, DRY-рефакторинг

Полная история изменений: [CHANGELOG.md](CHANGELOG.md)

---

## ⚠️ Критическое Обновление API

**Уведомление об устаревании API Wildberries** - Четыре метода Promotion API будут **отключены 2 февраля 2026**:

- `getAutoGetnmtoadd()` - Список карточек товаров (кампании type 8)
- `createAutoUpdatenm()` - Обновление карточек товаров (кампании type 8)
- `getAutoStatWords()` - Статистика по кластерам фраз (кампании type 8)
- `createAutoSetExcluded()` - Установка/удаление минус-фраз (кампании type 8)

**Требуется действие:** Перейдите на методы кампаний type 9 до 2 февраля 2026.

📖 **[Полное Руководство по Миграции](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/migration-v2.4-promotion-deprecation)**

---

## 📦 Установка

```bash
npm install daytona-wildberries-typescript-sdk
```

### Требования

- **Node.js:** ≥ 20.0.0
- **TypeScript:** ≥ 5.0.0 (для TypeScript проектов)
- **API ключ Wildberries:** [Получить здесь](https://seller.wildberries.ru/)

## 🚀 Быстрый Старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Инициализация SDK с вашим API ключом
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY! // Храните безопасно в переменных окружения
});

// Проверка подключения
const pingResponse = await sdk.general.ping();
console.log('Подключено:', pingResponse.Status); // 'OK'

// Получение категорий товаров
const categories = await sdk.products.getParentAll();
console.log('Категории:', categories.data?.length);

// Получение новых заказов
const orders = await sdk.ordersFBS.getOrdersNew();
console.log('Новые заказы:', orders.orders?.length);

// Проверка баланса счета
const balance = await sdk.finances.getAccountBalance();
console.log('Баланс:', balance.for_withdraw, balance.currency);

// Обзор рекламных кампаний
const campaigns = await sdk.promotion.getCampaignCount();
console.log('Всего кампаний:', campaigns.all);

// Баланс рекламного кабинета
const advBalance = await sdk.promotion.getAdvBalance();
console.log('Баланс рекл. кабинета:', advBalance.net);

// Список чатов с клиентами и последними сообщениями
const chats = await sdk.communications.getSellerChats();
console.log('Активные чаты:', chats.result?.length);
chats.result?.forEach(chat => {
  if (chat.lastMessage) {
    console.log(`${chat.clientName}: "${chat.lastMessage.text}"`);
  }
});
```

**Время до первого API вызова:** <5 минут 🚀

**👉 [Полное Руководство по Быстрому Старту](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/getting-started/quickstart)**

### Расширенная конфигурация

SDK принимает не только `apiKey`. Настройте таймаут, логику повторов, лимиты запросов и логирование:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 60000,                    // Глобальный таймаут (по умолчанию: 30000мс)
  logLevel: 'info',                  // 'debug' | 'info' | 'warn' | 'error'
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true,
  },
});

// Для медленных операций создайте экземпляр SDK с увеличенным таймаутом
const longTimeoutSdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 120000,                   // 2 мин для скачивания отчетов
});
const reportFile = await longTimeoutSdk.analytics.getDownloadsFile(downloadId);
```

**👉 [Руководство по конфигурации](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/configuration)**

---

## 📊 Статус Проекта и Разработка

**Текущий Статус:** 🟢 Production Ready | **Версия SDK:** 3.10.0

**📖 [Project Status Summary](PROJECT_STATUS_SUMMARY.md)** — Комплексный обзор всех эпиков, историй и статуса реализации.

### Краткая Статистика

| Метрика | Значение |
|---------|----------|
| **API модули** | 14 (100%) |
| **API эндпоинты** | 240+ реализовано |
| **Тесты** | 2,207 тестов проходят (100%) |
| **Документация** | 44 руководства, 22 примера |
| **Размер бандла** | ~91KB gzipped (ESM) |

> **⚠️ Для контрибьюторов:** При создании или завершении эпиков/историй **обновляйте [PROJECT_STATUS_SUMMARY.md](PROJECT_STATUS_SUMMARY.md)**, чтобы статус проекта оставался актуальным. Этот файл автоматически генерируется и должен отражать последнее состояние реализации.

---

## 📚 Документация

### Начало Работы
- **[Быстрый Старт](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/getting-started/quickstart)** - Начните работу за 5 минут
- **[Учебные Руководства](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/getting-started/tutorials/)** - Пошаговые инструкции
- **[Справочник API](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/)** - Полная TypeDoc документация

### Руководства
- **[Лучшие Практики](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/best-practices)** - Production паттерны
- **[Настройка Производительности](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/performance)** - Оптимизация
- **[Безопасность](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/security)** - Безопасная интеграция
- **[Коммуникации](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/communications)** - Чат с клиентами, вопросы-ответы и отзывы
- **[Реклама (Promotion)](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/promotion-advertising)** - Управление кампаниями
- **[Устранение Неполадок](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/troubleshooting)** - Распространенные проблемы

## 🎯 Поддерживаемые Модули API

Все 14 модулей Wildberries API полностью поддерживаются со 100% покрытием API:

| Модуль | Описание |
|--------|----------|
| **General** | Ping, новости, информация о продавце, Jam-подписка, рейтинг продавца |
| **Products** | Категории, CRUD, медиа, ценообразование, склад, запасы, поддержка kizMarked |
| **Orders FBS** | Выполнение продавцом, статус заказа, доставка, поставки, валидация метаданных |
| **Orders FBW** | Выполнение складом WB, планирование поставок, информация о покупателе |
| **Orders DBS** | Доставка Продавцом - массовые операции, поддержка B2B, маркировка (SGTIN, IMEI) |
| **Finances** | Баланс, транзакции, Отчеты о Продажах v1, Эквайринг, `parseMoneyAmount()`, union-типы полей |
| **Analytics** | Воронка продаж, поисковые запросы, история запасов, запасы на складах WB, CSV отчеты |
| **Reports** | Отчеты о доходах, отчеты о продажах, экспорт данных |
| **Communications** | Чат с клиентами, вопросы-ответы по товарам, управление отзывами, закреплённые отзывы |
| **Promotion** | Кампании, ставки, минус-фразы, реклама |
| **Tariffs** | Ставки комиссий, тарифные планы |
| **In-Store Pickup** | Заказы с самовывозом и управление |
| **User Management** | Управление пользователями профиля продавца |
| **Returns** | Агрегатор возвратов (FBO + FBS + Finance), `getReturns()`, `getReturnByOrderId()`, `getReturnStats()` |

## 📄 Лицензия

**Лицензия для Личного Использования** - Бесплатно для личного, образовательного и некоммерческого использования.

✅ **Разрешено:**
- Личное некоммерческое использование
- Образовательные цели
- Open source проекты (некоммерческие)
- Обучение и развитие навыков

❌ **Запрещено Без Коммерческой Лицензии:**
- Коммерческое использование в бизнес-среде
- Продажа или монетизация SDK
- Предоставление платных услуг на основе SDK
- Использование в коммерческих продуктах/сервисах

**Для коммерческого использования, пожалуйста, свяжитесь для получения лицензии.**

См. файл [LICENSE](LICENSE) для полных условий.

## 🤝 Участие в Проекте

Мы приветствуем вклад! Будь то сообщения об ошибках, запросы функций, улучшения документации или код.

**→ [Руководство по Участию](CONTRIBUTING.md)**

## 📞 Поддержка

- **📖 Документация:** [https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/)
- **❓ FAQ:** [English](https://salacoste.github.io/daytona-wildberries-typescript-sdk/FAQ) | [Русский](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/FAQ)
- **🐛 Сообщения об Ошибках:** [Открыть issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- **💬 Обсуждения:** [GitHub Discussions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

## ⚠️ Отказ от Ответственности

Это неофициальный SDK. Не аффилирован, не поддерживается официально и не одобрен Wildberries. Используйте на свой риск. Всегда обращайтесь к [официальной документации Wildberries API](https://dev.wildberries.ru/) за авторитетной информацией.

---

**Made with ❤️ for the Wildberries developer community**

**Сделано с ❤️ для сообщества разработчиков Wildberries**

[⬆ Back to top / Наверх](#wildberries-api-typescript-sdk)

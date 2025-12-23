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

Transform 11 OpenAPI specifications into a production-ready SDK with complete type safety, automatic rate limiting, retry mechanisms, and comprehensive error handling. Reduce integration time from weeks to hours.

## ✨ Features

- **🔐 Complete Type Safety** - Auto-generated TypeScript types from OpenAPI specifications for all 11 API modules
- **⚡ Automatic Rate Limiting** - Built-in enforcement of per-endpoint rate limits with intelligent queuing
- **🔄 Smart Retry Logic** - Exponential backoff retry mechanism for transient failures
- **🛡️ Rich Error Handling** - Typed error hierarchy with detailed recovery guidance
- **📦 Tree-Shakeable** - Dual ESM/CommonJS builds, import only what you need (<100KB gzipped)
- **✅ Battle-Tested** - 98% test coverage with 950+ tests across all modules
- **🎯 100% API Coverage** - All 229 YAML endpoints implemented (v2.2.0)
- **📚 Comprehensive Documentation** - Complete API reference, tutorials, and working examples in English and Russian
- **🔧 Zero Configuration** - Works out of the box with sensible defaults, configurable for advanced use

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
const orders = await sdk.ordersFBS.getNewOrders();
console.log('New orders:', orders.length);

// Check account balance
const balance = await sdk.finances.getBalance();
console.log('Balance:', balance.for_withdraw, balance.currency);

// Get advertising campaigns overview
const campaigns = await sdk.promotion.getPromotionCount();
console.log('Total campaigns:', campaigns.all);

// Get advertising balance
const advBalance = await sdk.promotion.getAdvBalance();
console.log('Ad cabinet balance:', advBalance.net);
```

**Time to First API Call:** <5 minutes 🚀

**👉 [Complete Quickstart Guide](https://salacoste.github.io/daytona-wildberries-typescript-sdk/getting-started/quickstart)**

## 📚 Documentation

### Getting Started
- **[5-Minute Quickstart](https://salacoste.github.io/daytona-wildberries-typescript-sdk/getting-started/quickstart)** - Get up and running
- **[Tutorials](https://salacoste.github.io/daytona-wildberries-typescript-sdk/getting-started/tutorials/)** - Step-by-step guides
- **[API Reference](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/)** - Complete TypeDoc documentation

### Guides
- **[Best Practices](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/best-practices)** - Production patterns
- **[Performance Tuning](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/performance)** - Optimization guide
- **[Security](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/security)** - Secure integration
- **[Promotion & Advertising](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/promotion-advertising)** - Campaign management
- **[Troubleshooting](https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/troubleshooting)** - Common issues

## 🎯 Supported API Modules

All 11 Wildberries API modules are fully supported with 100% API coverage:

| Module | Description |
|--------|-------------|
| **General** | Ping, news, seller info, connectivity testing |
| **Products** | Categories, CRUD, media, pricing, warehouse, stock |
| **Orders FBS** | Seller fulfillment, order status, shipping, supplies |
| **Orders FBW** | WB warehouse fulfillment, supply planning |
| **Finances** | Balance, transactions, reports, payouts |
| **Analytics** | Sales funnel, search queries, stock history, CSV reports |
| **Reports** | Income reports, sales reports, data exports |
| **Communications** | Customer chat, Q&A, reviews management |
| **Promotion** | Campaigns, promo codes, advertising |
| **Tariffs** | Commission rates, fee schedules |
| **In-Store Pickup** | Pickup point orders and management |

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

Преобразуйте 11 OpenAPI спецификаций в production-готовый SDK с полной типобезопасностью, автоматическими лимитами запросов, механизмами повторных попыток и комплексной обработкой ошибок. Сократите время интеграции с недель до часов.

## ✨ Возможности

- **🔐 Полная Типобезопасность** - Автоматически генерируемые TypeScript типы из OpenAPI для всех 11 модулей
- **⚡ Автоматические Лимиты Запросов** - Встроенное соблюдение лимитов для каждой конечной точки с умной очередью
- **🔄 Умная Логика Повторов** - Экспоненциальная задержка для временных сбоев
- **🛡️ Богатая Обработка Ошибок** - Типизированная иерархия ошибок с подробными рекомендациями
- **📦 Tree-Shakeable** - Двойная сборка ESM/CommonJS, импортируйте только то, что нужно (<100KB gzip)
- **✅ Проверено в Бою** - 98% покрытие тестами, 950+ тестов для всех модулей
- **🎯 100% Покрытие API** - Все 229 эндпоинтов YAML реализованы (v2.2.0)
- **📚 Полная Документация** - Справочник API, учебные руководства и примеры на английском и русском
- **🔧 Без Настройки** - Работает из коробки с разумными значениями по умолчанию

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
const orders = await sdk.ordersFBS.getNewOrders();
console.log('Новые заказы:', orders.length);

// Проверка баланса счета
const balance = await sdk.finances.getBalance();
console.log('Баланс:', balance.for_withdraw, balance.currency);

// Обзор рекламных кампаний
const campaigns = await sdk.promotion.getPromotionCount();
console.log('Всего кампаний:', campaigns.all);

// Баланс рекламного кабинета
const advBalance = await sdk.promotion.getAdvBalance();
console.log('Баланс рекл. кабинета:', advBalance.net);
```

**Время до первого API вызова:** <5 минут 🚀

**👉 [Полное Руководство по Быстрому Старту](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/getting-started/quickstart)**

## 📚 Документация

### Начало Работы
- **[Быстрый Старт](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/getting-started/quickstart)** - Начните работу за 5 минут
- **[Учебные Руководства](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/getting-started/tutorials/)** - Пошаговые инструкции
- **[Справочник API](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/)** - Полная TypeDoc документация

### Руководства
- **[Лучшие Практики](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/best-practices)** - Production паттерны
- **[Настройка Производительности](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/performance)** - Оптимизация
- **[Безопасность](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/security)** - Безопасная интеграция
- **[Реклама (Promotion)](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/promotion-advertising)** - Управление кампаниями
- **[Устранение Неполадок](https://salacoste.github.io/daytona-wildberries-typescript-sdk/ru/guides/troubleshooting)** - Распространенные проблемы

## 🎯 Поддерживаемые Модули API

Все 11 модулей Wildberries API полностью поддерживаются со 100% покрытием API:

| Модуль | Описание |
|--------|----------|
| **General** | Ping, новости, информация о продавце, проверка подключения |
| **Products** | Категории, CRUD, медиа, ценообразование, склад, запасы |
| **Orders FBS** | Выполнение продавцом, статус заказа, доставка, поставки |
| **Orders FBW** | Выполнение складом WB, планирование поставок |
| **Finances** | Баланс, транзакции, отчеты, выплаты |
| **Analytics** | Воронка продаж, поисковые запросы, история запасов, CSV отчеты |
| **Reports** | Отчеты о доходах, отчеты о продажах, экспорт данных |
| **Communications** | Чат с клиентами, вопросы-ответы, управление отзывами |
| **Promotion** | Кампании, промокоды, реклама |
| **Tariffs** | Ставки комиссий, тарифные планы |
| **In-Store Pickup** | Заказы с самовывозом и управление |

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

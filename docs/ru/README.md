# Wildberries API TypeScript SDK

[![CI](https://github.com/salacoste/daytona-wildberries-typescript-sdk/workflows/CI/badge.svg)](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions)
[![npm version](https://badge.fury.io/js/daytona-wildberries-typescript-sdk.svg)](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)
[![Coverage](https://img.shields.io/codecov/c/github/salacoste/daytona-wildberries-typescript-sdk)](https://codecov.io/gh/salacoste/daytona-wildberries-typescript-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Полнофункциональный TypeScript SDK, обеспечивающий типобезопасный доступ ко всем методам API маркетплейса Wildberries.**

Преобразуйте 11 OpenAPI спецификаций в готовый к production SDK с полной типобезопасностью, автоматическим ограничением скорости запросов, механизмами повторных попыток и комплексной обработкой ошибок. Сократите время интеграции с недель до часов.

> **[English Version](../../README.md)** | **Русская версия**

---

## ✨ Возможности

- **🔐 Полная типобезопасность** - Автоматически сгенерированные TypeScript типы из OpenAPI спецификаций для всех 11 API модулей
- **⚡ Автоматическое ограничение скорости** - Встроенное соблюдение лимитов запросов для каждой конечной точки с интеллектуальной очередью
- **🔄 Умная логика повторных попыток** - Механизм повторных попыток с экспоненциальной задержкой для временных сбоев
- **🛡️ Расширенная обработка ошибок** - Типизированная иерархия ошибок с подробными рекомендациями по восстановлению
- **📦 Tree-Shakeable** - Двойная сборка ESM/CommonJS, импортируйте только то, что нужно (<100KB в gzip)
- **✅ Проверено в боевых условиях** - 98% покрытие тестами с 1,200+ тестами для всех модулей
- **📚 Комплексная документация** - Полный справочник API, учебные руководства и рабочие примеры
- **🔧 Нулевая конфигурация** - Работает из коробки с разумными значениями по умолчанию, настраивается для продвинутого использования

---

## 📦 Установка

```bash
npm install daytona-wildberries-typescript-sdk
```

### Требования

- **Node.js:** ≥ 20.0.0 (18.x больше не поддерживается)
- **TypeScript:** ≥ 5.0.0 (для TypeScript проектов)
- **API ключ Wildberries:** [Получить можно здесь](https://seller.wildberries.ru/)

### Быстрая проверка

```bash
# Проверка установки
npm list daytona-wildberries-typescript-sdk

# Запуск примера быстрого старта
npx tsx node_modules/daytona-wildberries-typescript-sdk/examples/quickstart.ts
```

---

## 🚀 Быстрый старт

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
console.log('Новые заказы:', orders.length);

// Проверка баланса аккаунта
const balance = await sdk.finances.getBalance();
console.log('Баланс:', balance.for_withdraw, balance.currency);

// Получение аналитики продаж (v3 API, SDK v2.7.0+)
const salesFunnel = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  limit: 10,
  offset: 0,
});
console.log('Проанализировано товаров:', salesFunnel.products?.length ?? 0);
```

**Время до первого API вызова:** <5 минут 🚀

**👉 [Полное 5-минутное руководство по быстрому старту](getting-started/quickstart.md)**

---

## 📚 Документация

### Начало работы

| Ресурс | Описание |
|--------|----------|
| **[5-минутный быстрый старт](getting-started/quickstart.md)** | Начните работу менее чем за 5 минут |
| **[Учебное руководство 1: Синхронизация каталога товаров](getting-started/tutorials/product-catalog-sync.md)** | Изучите управление товарами (30 мин) |
| **[Учебное руководство 2: Выполнение заказов](getting-started/tutorials/order-fulfillment.md)** | Освойте обработку заказов (45 мин) |
| **[Учебное руководство 3: Панель аналитики](getting-started/tutorials/analytics-dashboard.md)** | Создайте аналитические отчеты (30 мин) |
| **[Учебное руководство 4: Мульти-модульная интеграция](getting-started/tutorials/multi-module-integration.md)** | Соедините все модули (60 мин) |

### Руководства и лучшие практики

| Ресурс | Описание |
|--------|----------|
| **[Руководство по лучшим практикам](../guides/best-practices.md)** | Паттерны и рекомендации для production |
| **[Настройка производительности](../guides/performance.md)** | Оптимизация для масштабирования и эффективности |
| **[Руководство по устранению неполадок](../guides/troubleshooting.md)** | Распространенные проблемы и решения |
| **[Лучшие практики безопасности](../guides/security.md)** | Защитите вашу интеграцию |

### Справочные материалы и примеры

| Ресурс | Описание |
|--------|----------|
| **[Полный справочник API](../api/)** | Полная документация TypeDoc для всех модулей |
| **[Примеры кода](../examples/)** | Рабочие примеры для распространенных случаев использования |
| **[FAQ](../FAQ.md)** | Часто задаваемые вопросы (35+ вопросов) |
| **[Глоссарий](../GLOSSARY.md)** | Термины Wildberries, компоненты SDK и концепции API |

### Информация о проекте

| Ресурс | Описание |
|--------|----------|
| **[Руководство по внесению вклада](../../CONTRIBUTING.md)** | Как внести вклад в код, тесты и документацию |
| **[Кодекс поведения](../../CODE_OF_CONDUCT.md)** | Стандарты и руководящие принципы сообщества |
| **[Политика безопасности](../../SECURITY.md)** | Отчетность об уязвимостях и практики безопасности |
| **[История изменений](../../CHANGELOG.md)** | История версий и примечания к выпускам |

**📖 [Полный центр документации](index.md)**

---

## 🎯 Поддерживаемые модули API

Все 11 модулей API Wildberries полностью поддерживаются:

| Модуль | Статус | Покрытие | Описание |
|--------|--------|----------|----------|
| **General** | ✅ Завершено | 100% | Ping, новости, информация о продавце, тестирование подключения |
| **Products** | ✅ Завершено | 100% | Категории, CRUD, медиа, ценообразование, склад, запасы |
| **Orders FBS** | ✅ Завершено | 100% | Выполнение продавцом, статус заказа, доставка, поставки |
| **Orders FBW** | ✅ Завершено | 100% | Выполнение складом WB, планирование поставок |
| **Finances** | ✅ Завершено | 100% | Баланс, транзакции, отчеты, выплаты |
| **Analytics** | ✅ Завершено | 100% | Воронка продаж, поисковые запросы, история запасов, CSV отчеты |
| **Reports** | ✅ Завершено | 100% | Отчеты о доходах, отчеты о продажах, экспорт данных |
| **Communications** | ✅ Завершено | 100% | Чат с клиентами, вопросы-ответы, управление отзывами |
| **Promotion** | ✅ Завершено | 100% | Кампании, промокоды, реклама |
| **Tariffs** | ✅ Завершено | 100% | Комиссионные ставки, тарифные планы |
| **In-Store Pickup** | ✅ Завершено | 100% | Заказы и управление пунктами самовывоза |

**Общее покрытие API:** 100% (все конечные точки реализованы и протестированы)

---

## 💡 Распространенные сценарии использования

### Управление товарами
Синхронизация каталогов товаров, обновление цен, управление запасами на складах.

→ **[Учебное руководство по каталогу товаров](getting-started/tutorials/product-catalog-sync.md)**

### Выполнение заказов
Обработка заказов клиентов, управление доставкой, отслеживание доставок для FBS и FBW.

→ **[Учебное руководство по выполнению заказов](getting-started/tutorials/order-fulfillment.md)**

### Аналитика и отчетность
Генерация отчетов о продажах, анализ производительности, экспорт данных для бизнес-аналитики.

→ **[Учебное руководство по панели аналитики](getting-started/tutorials/analytics-dashboard.md)**

### Управление финансами
Отслеживание баланса аккаунта, сверка транзакций, управление выплатами и отчетностью.

→ **[Пример работы с финансами](../../examples/finances-reports-payouts.ts)**

### Поддержка клиентов
Управление чатом с клиентами, ответы на вопросы, обработка отзывов в масштабе.

→ **[Пример поддержки клиентов](../../examples/customer-support.ts)**

### Мульти-канальная интеграция
Соединение товары → заказы → финансы → аналитика для полной автоматизации электронной коммерции.

→ **[Учебное руководство по мульти-модульной интеграции](getting-started/tutorials/multi-module-integration.md)**

---

## 🔧 Конфигурация

### Базовая конфигурация

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!, // Обязательно: Ваш API ключ
});
```

### Расширенная конфигурация

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  // Пользовательские таймауты
  timeout: 30000, // 30 секунд (по умолчанию)

  // Конфигурация повторных попыток
  retryConfig: {
    maxRetries: 3,        // Макс. количество повторных попыток (по умолчанию: 3)
    retryDelay: 1000,     // Начальная задержка в мс (по умолчанию: 1000)
    exponentialBackoff: true // Использовать экспоненциальную задержку (по умолчанию: true)
  },

  // Лимит запросов (опциональные переопределения)
  rateLimitConfig: {
    requestsPerSecond: 10,  // Глобальный лимит
    requestsPerMinute: 100  // Глобальный лимит
  },

  // Логирование
  logLevel: 'warn' // 'debug' | 'info' | 'warn' | 'error' (по умолчанию: 'warn')
});
```

**→ [Полное руководство по конфигурации](../guides/configuration.md)**

---

## 🧪 Тестирование

```bash
# Запустить все тесты
npm test

# Запустить тесты с покрытием
npm run test:coverage

# Запустить тесты конкретного модуля
npm test -- products
npm test -- orders-fbs

# Запустить интеграционные тесты
npm run test:integration

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

**Покрытие тестами:** 98% (1,200+ тестов)

**→ [Руководство по тестированию](../guides/testing.md)**

---

## 🔗 Ссылки

- **[GitHub репозиторий](https://github.com/salacoste/daytona-wildberries-typescript-sdk)**
- **[npm пакет](https://www.npmjs.com/package/daytona-wildberries-typescript-sdk)**
- **[Трекер проблем](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)**
- **[Обсуждения](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)**
- **[Официальная документация API Wildberries](https://dev.wildberries.ru/)**
- **[Справочник TypeDoc API](https://salacoste.github.io/daytona-wildberries-typescript-sdk/)**

---

## 📄 Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](../../LICENSE) для подробностей.

### Лицензии третьих сторон

Этот SDK зависит от:
- **Axios** (лицензия MIT) - HTTP клиент
- **Зависимости разработки** - См. [package.json](../../package.json) для полного списка

---

## 📞 Поддержка

Нужна помощь? Мы здесь для вас:

- **📖 Документация** - Проверьте нашу [комплексную документацию](index.md)
- **❓ FAQ** - Прочитайте [часто задаваемые вопросы](../FAQ.md)
- **🐛 Отчеты об ошибках** - [Открыть проблему](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues/new?template=bug_report.md)
- **💡 Запросы функций** - [Начать обсуждение](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions/new)
- **💬 Чат сообщества** - [Присоединиться к обсуждениям](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

---

## ⚠️ Отказ от ответственности

Это неофициальный SDK. Он не аффилирован с Wildberries, официально не поддерживается и не одобрен компанией Wildberries. Используйте на свой риск. Всегда обращайтесь к [официальной документации API Wildberries](https://dev.wildberries.ru/) для получения достоверной информации.

---

**Создано с ❤️ для сообщества разработчиков Wildberries**

[⬆ Наверх](#wildberries-api-typescript-sdk) | **[English Version](../../README.md)**

# Примеры

Рабочие примеры кода, демонстрирующие использование SDK для распространенных сценариев.

> **Примечание**: Примеры кода доступны на английском языке. Ссылки ведут на английскую версию документации.

## По сложности

### Базовые примеры

Начните с основ SDK:

- [Hello World](/examples/basic/hello-world) - Инициализация SDK и проверка подключения
- [Один API-вызов](/examples/basic/single-call) - Выполнение базового API-запроса

### Промежуточные примеры

Изучите паттерны для production-использования:

- [Обработка ошибок](/examples/intermediate/error-handling) - Грамотная обработка ошибок с типизированными классами
- [Лимиты запросов](/examples/intermediate/rate-limiting) - Работа с лимитами API
- [Пакетные операции](/examples/intermediate/batch-operations) - Эффективная обработка нескольких элементов

### Продвинутые примеры

Освойте сложные сценарии и оптимизации:

- [Мультимодульный рабочий процесс](/examples/advanced/multi-module) - Объединение нескольких модулей SDK
- [Пользовательская логика повторных попыток](/examples/advanced/custom-retry) - Продвинутые стратегии retry
- [Оптимизация производительности](/examples/advanced/performance) - Оптимизация для production

## По случаю использования

### Управление товарами
- [Синхронизация каталога товаров](/examples/use-cases/product-catalog) - Управление и синхронизация каталога
- [Управление ценами](/examples/use-cases/pricing-updates) - Обновление цен и скидок
- [Управление остатками](/examples/use-cases/stock-management) - Работа со складскими остатками

### Выполнение заказов
- [Обработка заказов](/examples/use-cases/order-processing) - Полный workflow FBS заказов
- [Управление отправками](/examples/use-cases/shipping) - Создание поставок и этикеток
- [Работа с возвратами](/examples/use-cases/returns) - Обработка возвратов товаров

### Аналитика и отчетность
- [Панель продаж](/examples/use-cases/sales-dashboard) - Комплексная аналитика продаж
- [Отчёты по остаткам](/examples/use-cases/inventory-reports) - Анализ складских запасов
- [Финансовые отчёты](/examples/use-cases/financial-reports) - Финансовая аналитика и сверки

## Краткий справочник

### Инициализация SDK

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

### Доступные модули

| Модуль | Описание |
|--------|----------|
| `sdk.general` | Ping, проверка подключения |
| `sdk.products` | Управление каталогом товаров |
| `sdk.ordersFBS` | Выполнение заказов FBS |
| `sdk.ordersFBW` | Операции склада FBW |
| `sdk.finances` | Баланс, транзакции |
| `sdk.analytics` | Воронка продаж, аналитика |
| `sdk.reports` | Отчеты по складу и продажам |
| `sdk.communications` | Чат, вопросы-ответы, отзывы |
| `sdk.promotion` | Рекламные кампании |
| `sdk.tariffs` | Ставки комиссий |
| `sdk.inStorePickup` | Самовывоз |

---

[← Назад к главной странице документации](../index.md)

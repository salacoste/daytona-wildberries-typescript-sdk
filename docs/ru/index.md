---
layout: home

hero:
  name: Wildberries SDK
  text: TypeScript SDK для Wildberries API
  tagline: Полнофункциональный SDK с полной типизацией для всех методов Wildberries API. Сокращение времени интеграции с недель до часов.
  actions:
    - theme: brand
      text: Начать работу
      link: /ru/getting-started/quickstart
    - theme: alt
      text: Справочник API
      link: /api/
    - theme: warning
      text: ⚠️ Уведомление об устаревании API
      link: /guides/migration-v2.4-promotion-deprecation

features:
  - icon: 🔒
    title: Типобезопасность
    details: Автоматически генерируемые TypeScript типы из OpenAPI спецификаций со 100% строгим режимом, исключающие ошибки выполнения и обеспечивающие полную поддержку автодополнения IDE во всех 11 API модулях.

  - icon: ⚡
    title: Интеллектуальное ограничение скорости
    details: Автоматическое применение лимитов скорости для каждого эндпоинта с алгоритмом Token Bucket предотвращает блокировку API. Встроенная интеллектуальная система очередей из официальной документации API.

  - icon: 🛡️
    title: Надежная обработка ошибок
    details: Типизированная иерархия ошибок (AuthenticationError, RateLimitError, ValidationError, NetworkError) обеспечивает изящную обработку сбоев с подробным контекстом и рекомендациями по восстановлению.

  - icon: 📦
    title: Полное покрытие API
    details: 11 полностью типизированных модулей, охватывающих 100% эндпоинтов Wildberries API - Товары, Заказы (FBS/FBW), Финансы, Аналитика, Отчеты, Коммуникации, Промо-акции, Тарифы и другие.

  - icon: 🔄
    title: Автоматические повторные попытки
    details: Механизм экспоненциальной задержки для временных сбоев (ошибки 5xx, проблемы с сетью) с настраиваемыми политиками повтора. Умные повторы, различающие повторяемые и постоянные ошибки.

  - icon: 🚀
    title: Удобство для разработчиков
    details: Полное автодополнение IDE, исчерпывающая TypeDoc документация, 35+ рабочих примеров, 4 подробных руководства и <5 минут до первого вызова API. Tree-shakeable сборки (<100KB gzipped).
---

## Быстрый старт

Установите SDK и сделайте первый вызов API менее чем за 5 минут:

```bash
npm install daytona-wildberries-typescript-sdk
```

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
const categories = await sdk.products.getParentCategories();
console.log(categories);
```

**👉 [Полное руководство за 5 минут](/ru/getting-started/quickstart)**

---

## ⚠️ Критическое Обновление API - 2 февраля 2026

:::danger УВЕДОМЛЕНИЕ ОБ УСТАРЕВАНИИ WILDBERRIES API
**Четыре метода Promotion API будут отключены 2 февраля 2026**

Wildberries переходит от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9). Следующие методы перестанут работать:

- `getAutoGetnmtoadd()` - Список карточек товаров
- `createAutoUpdatenm()` - Обновление карточек товаров
- `getAutoStatWords()` - Статистика по кластерам фраз
- `createAutoSetExcluded()` - Установка/удаление минус-фраз

**⏱️ Время миграции: 30-60 минут** | **⏰ Дедлайн: 2 февраля 2026** (6 недель от сегодня)

### Быстрая Миграция:

**1. Проверьте Ваши Кампании** (2 мин):
```typescript
const campaigns = await sdk.promotion.getPromotionCount();
const type8 = campaigns.adverts?.filter(c => c.type === 8) || [];
console.log(`⚠️  Кампаний type 8 для миграции: ${type8.length}`);
```

**2. Обновите Код** (10-30 мин):
```typescript
// ❌ СТАРЫЙ КОД (Type 8)
const products = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });

// ✅ НОВЫЙ КОД (Type 9)
const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
const products = campaigns.adverts?.[0]?.nms || [];
```

**3. Тестирование и Развертывание** (15 мин)

📖 **[Полное Руководство с 6 Практическими Примерами →](/guides/migration-v2.4-promotion-deprecation)**
:::

---

## Статистика проекта

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number">100%</div>
    <div class="stat-label">Покрытие API</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">98%</div>
    <div class="stat-label">Покрытие тестами</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">1,200+</div>
    <div class="stat-label">Тестов</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">11</div>
    <div class="stat-label">API модулей</div>
  </div>
</div>

<style>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  line-height: 1.2;
}

.stat-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>

---

## Почему выбирают Wildberries SDK?

### 🎯 Готовность к продакшену

Проверено в боевых условиях с 98% покрытием тестами и 1,200+ тестами. Все 11 API модулей полностью реализованы и валидированы против официальных OpenAPI спецификаций Wildberries.

### ⚡ Экономия времени

Сокращение времени интеграции с недель до часов. Полная типобезопасность исключает отладку ошибок выполнения. Автоматическое ограничение скорости предотвращает блокировку API.

### 📚 Исчерпывающая документация

- **[5-минутный быстрый старт](/ru/getting-started/quickstart)** - Начните немедленно
- **[4 подробных руководства](/ru/getting-started/)** - Освойте ключевые процессы
- **[Полный справочник API](/api/)** - Полная TypeDoc документация
- **[Руководство по лучшим практикам](/ru/guides/best-practices)** - Готовые к продакшену паттерны

### 🔧 Нулевая конфигурация

Работает из коробки с разумными настройками по умолчанию. Расширенная конфигурация доступна для пользовательского ограничения скорости, политик повтора, таймаутов и уровней логирования.

---

## Поддерживаемые API модули

Все 11 модулей Wildberries API полностью поддерживаются:

| Модуль | Покрытие | Ключевые возможности |
|--------|----------|----------------------|
| **General** | 100% | Ping, проверка подключения, информация о продавце |
| **Products** | 100% | CRUD каталога, ценообразование, медиа, инвентаризация |
| **Orders FBS** | 100% | Выполнение продавцом, статус заказа, поставки |
| **Orders FBW** | 100% | Выполнение WB склад, планирование поставок |
| **Finances** | 100% | Баланс, транзакции, отчеты, выплаты |
| **Analytics** | 100% | Воронка продаж, поисковые запросы, CSV экспорт |
| **Reports** | 100% | Отчеты о доходах, отчеты о продажах, экспорт данных |
| **Communications** | 100% | Чат с клиентами, вопросы и ответы, управление отзывами |
| **Promotion** | 100% | Кампании, промо-коды, реклама ⚠️ **[Требуется Миграция](/guides/migration-v2.4-promotion-deprecation)** |
| **Tariffs** | 100% | Комиссионные ставки, расписание сборов |
| **In-Store Pickup** | 100% | Заказы и управление пунктами выдачи |

**[Просмотреть полную документацию модулей →](/api/)**

---

## Типичные сценарии использования

<div class="use-cases">
  <div class="use-case-card">
    <h3>📦 Управление товарами</h3>
    <p>Синхронизация каталогов товаров, обновление цен, управление запасами на складах.</p>
    <a href="/ru/getting-started/tutorials/product-catalog-sync">Смотреть руководство →</a>
  </div>

  <div class="use-case-card">
    <h3>📋 Обработка заказов</h3>
    <p>Обработка клиентских заказов, управление доставкой, отслеживание для FBS и FBW.</p>
    <a href="/ru/getting-started/tutorials/order-fulfillment">Смотреть руководство →</a>
  </div>

  <div class="use-case-card">
    <h3>📊 Аналитика и отчетность</h3>
    <p>Генерация отчетов о продажах, анализ эффективности, экспорт данных для BI инструментов.</p>
    <a href="/ru/getting-started/tutorials/analytics-dashboard">Смотреть руководство →</a>
  </div>

  <div class="use-case-card">
    <h3>💰 Финансовое управление</h3>
    <p>Отслеживание баланса, сверка транзакций, управление выплатами и отчетностью.</p>
    <a href="/api/classes/FinancesModule">Смотреть справочник API →</a>
  </div>

  <div class="use-case-card">
    <h3>💬 Поддержка клиентов</h3>
    <p>Управление чатом с клиентами, ответы на вопросы, ответы на отзывы в масштабе.</p>
    <a href="/api/classes/CommunicationsModule">Смотреть справочник API →</a>
  </div>

  <div class="use-case-card">
    <h3>🔄 Мультиканальная интеграция</h3>
    <p>Связывание товаров → заказов → финансов → аналитики для полной автоматизации.</p>
    <a href="/ru/getting-started/tutorials/multi-module-integration">Смотреть руководство →</a>
  </div>
</div>

<style>
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.use-case-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.use-case-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.use-case-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.use-case-card p {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.use-case-card a {
  display: inline-block;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.use-case-card a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .use-cases {
    grid-template-columns: 1fr;
  }
}
</style>

---

## Готовы начать?

<div class="cta-section">
  <div class="cta-card">
    <h3>🚀 Быстрый старт</h3>
    <p>Запуститесь менее чем за 5 минут с нашим исчерпывающим руководством по быстрому старту.</p>
    <a href="/ru/getting-started/quickstart" class="cta-button">Начать разработку →</a>
  </div>

  <div class="cta-card">
    <h3>📚 Просмотреть документацию</h3>
    <p>Изучите руководства, гайды и полную справочную документацию API.</p>
    <a href="/ru/getting-started/" class="cta-button secondary">Просмотреть документы →</a>
  </div>
</div>

<style>
.cta-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-radius: 12px;
}

.cta-card {
  text-align: center;
  padding: 2rem;
}

.cta-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
}

.cta-card p {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand-1);
  color: white !important;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.cta-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cta-button.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1) !important;
  border: 2px solid var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background: var(--vp-c-brand-soft);
}

@media (max-width: 768px) {
  .cta-section {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
}
</style>

---

**Сделано с ❤️ для сообщества разработчиков Wildberries**

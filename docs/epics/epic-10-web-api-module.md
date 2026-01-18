# Epic 10: Web API Module — Extended Functionality

---

## Epic Overview

**Epic ID:** 10
**Module:** Web API (`src/modules/web-api`)
**Swagger Source:** N/A (Undocumented Web APIs)
**Status:** 🟡 Draft | Planned
**Priority:** MEDIUM
**Type:** Foundation / Expansion

---

## Business Goals

Расширить возможности SDK за счёт интеграции с **неофициальными Web API**, которые недоступны через стандартную OpenAPI документацию:

1. **Проверка подписки "Джем"** — определить статус платной подписки на аналитику
2. **Доступ к веб-функционалу** — использовать endpoints, доступные только в веб-интерфейсе
3. **Гибридная авторизация** — поддержка как API ключей, так и веб-токенов
4. **Будущее расширение** — фундамент для добавления других веб-API методов

---

## Epic Scope

### Важное предупреждение

> ⚠️ **Этот эпик работает с НЕдокументированными API**
>
> - Endpoints могут измениться в любой момент без уведомления
> - Используется JWT токен веб-сессии вместо API ключа
> - Нет гарантии обратной совместимости
> - Методы помечаются как `@experimental`

### Module Components

**Web API Module включает:**
- 🔄 Подключение через JWT токен (authorizev3 header)
- 🔄 Проверка статуса подписки "Джем" (Gem Subscription)
- 📋 Фундамент для будущих расширений
- ⚠️ Специфическая обработка ошибок (WebApiError)

### Key Differences from Official API

| Aspect | Official API Modules | Web API Module |
|--------|---------------------|----------------|
| **Documentation** | OpenAPI 3.0.1 спецификация | Не документирован |
| **Authorization** | API Key (HeaderApiKey) | JWT Token (authorizev3) |
| **Base URL** | `*-api.wildberries.ru` | `seller.wildberries.ru` |
| **Stability** | Гарантирована | Не гарантируется |
| **Versioning** | SemVer строгий | Изменения в любой момент |

---

## Architecture

### Module Structure

```
src/
├── modules/
│   └── web-api/                    # Новый модуль
│       ├── index.ts                # WebApiModule class
│       ├── subscription.ts         # Subscription methods
│       └── types.ts                # TypeScript interfaces
├── client/
│   └── web-client.ts               # HTTP client для веб-API
├── types/
│   └── web-api.types.ts            # Shared types
└── errors/
    └── web-api-error.ts            # WebApiError class
```

### Authentication Flow

```typescript
// Официальный API (существующий)
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY  // Статический API ключ
});

// Web API Module (новый)
const webModule = new WebApiModule();

// Каждый запрос требует свежий JWT токен
const result = await webModule.checkGemSubscription({
  jwtToken: getWebSessionToken()  // Динамический токен из веб-сессии
});
```

---

## Stories

### Story 10.1: Web API Foundation & Gem Subscription Check 🔄

**Status:** DRAFT
**File:** `docs/stories/10.1.web-api-foundation.md`
**Priority:** HIGH

**Deliverables:**
- [ ] `WebApiModule` class with JWT authentication
- [ ] `checkGemSubscription()` method implementation
- [ ] `WebApiClient` for HTTP requests
- [ ] `WebApiError` error handling class
- [ ] TypeScript types and interfaces
- [ ] Unit tests (80%+ coverage)
- [ ] JSDoc with `@experimental` warnings
- [ ] README section

**Key Features:**
- JWT токен передаётся каждым вызовом (не хранится)
- Явные warning'и о нестабильности API
- Специфическая обработка ошибок веб-API
- Изолирован от официальных API модулей

---

## Future Stories (Planned)

### Story 10.2: Extended Subscription Management (PLANNED)

**Potential Features:**
- Детали подписки (история платежей, тарифы)
- Управление автопролонгацией
- Промо-коды для подписки

### Story 10.3: Web Notifications (PLANNED)

**Potential Features:**
- Список уведомлений веб-интерфейса
- Пометка как прочитанные
- Настройки уведомлений

### Story 10.4: Account Settings (PLANNED)

**Potential Features:**
- Настройки профиля продавца
- Управление пользователями
- Настройки интеграций

---

## Acceptance Criteria for Epic Completion

### Foundation (Phase 1)
- [ ] `WebApiModule` class exported from main SDK
- [ ] `checkGemSubscription()` working with real JWT token
- [ ] TypeScript types for all responses
- [ ] Unit tests with 80%+ coverage
- [ ] Documentation with risk warnings

### Integration
- [ ] Module integrated into main SDK export
- [ ] Example code provided
- [ ] README updated with Web API section

### Quality
- [ ] All methods marked `@experimental`
- [ ] Error handling with `WebApiError`
- [ ] Security review completed

---

## Risk Management

### Known Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **API changes** | HIGH | HIGH | Явные warnings, @experimental tags |
| **Auth complexity** | MEDIUM | LOW | Токен передаётся каждый вызов |
| **Rate limits** | MEDIUM | MEDIUM | Соблюдать лимиты веб-интерфейса |
| **Breaking changes** | HIGH | MEDIUM | Minor version bump для изменений |

### Deprecation Policy

- Методы могут быть **удалены** в любом minor/patch release
- **Нет обратной совместимости** для Web API модуля
- Major version SDK НЕ зависит от изменений в этом модуле
- Changes announced via GitHub Issues

---

## Related Documents

- [Story 10.1: Web API Foundation](../stories/10.1.web-api-foundation.md)
- [OpenAPI Specifications](../wildberries_api_doc/README.md)
- [Official API Documentation](https://dev.wildberries.ru/)
- [SDK Architecture](../docs/architecture.md)

---

**Created:** 2025-01-18
**Status:** 🟡 Draft — Ready for Implementation
**Next Review:** After Story 10.1 completion

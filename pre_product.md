# Pre-Product Requirements Document (PRD)
## Wildberries API SDK Development

---

## 📋 Project Overview

### Purpose
Разработка полнофункционального TypeScript SDK для работы с API маркетплейса Wildberries, обеспечивающего удобный и типобезопасный доступ ко всем методам платформы.

### Target Audience
- Продавцы на маркетплейсе Wildberries
- Разработчики систем автоматизации электронной коммерции
- Интеграторы ERP/CRM систем
- Разработчики аналитических и отчетных систем

### Business Value
- **Упрощение интеграции**: Предоставление готового решения вместо ручной работы со Swagger
- **Типобезопасность**: Полная типизация TypeScript для предотвращения ошибок на этапе разработки
- **Производительность**: Оптимизированные запросы, кеширование, обработка rate limits
- **Надежность**: Автоматические retry механизмы, обработка ошибок, валидация данных

---

## 📚 API Documentation Context

### Available Swagger Documents

Проект содержит 11 Swagger документов в директории `wildberries_api_doc/`:

| File | Module | Description |
|------|--------|-------------|
| `01-general.yaml` | Общее | API авторизации, проверка подключения, новости, информация о продавце |
| `02-products.yaml` | Товары | Создание/редактирование карточек, категории, медиафайлы, ярлыки, цены, склады |
| `03-orders-fbs.yaml` | Заказы FBS | Заказы со склада продавца (Fulfillment by Seller) |
| `06-in-store-pickup.yaml` | Самовывоз | Управление точками самовывоза |
| `07-orders-fbw.yaml` | Заказы FBW | Заказы со склада Wildberries (Fulfillment by Wildberries) |
| `08-promotion.yaml` | Продвижение | Акции, промокоды, реклама |
| `09-communications.yaml` | Коммуникации | Чаты, вопросы-ответы, отзывы |
| `10-tariffs.yaml` | Тарифы | Информация о тарифах и комиссиях |
| `11-analytics.yaml` | Аналитика | Статистика продаж, аналитические отчеты |
| `12-reports.yaml` | Отчеты | Формирование и получение отчетов |
| `13-finances.yaml` | Финансы | Финансовые операции, транзакции, выплаты |

### API Characteristics

**Authentication**:
- Header-based API Key authentication (`HeaderApiKey`)
- Security scheme применяется ко всем endpoints

**Base URLs** (extracted from Swagger):
- `https://common-api.wildberries.ru` - Общие методы
- `https://content-api.wildberries.ru` - Работа с контентом
- `https://marketplace-api.wildberries.ru` - Marketplace операции
- Additional domain-specific URLs в различных модулях

**Rate Limits**:
- Различные лимиты для разных категорий методов
- Указаны в документации как "Лимиты запросов"
- Требуется реализация rate limiting механизмов

**Error Handling**:
- Standard HTTP status codes (401, 403, 404, 429, 500)
- Structured error responses

---

## 🎯 SDK Requirements

### Core Functionality

#### 1. API Client Architecture
- **Modular Design**: Отдельные модули для каждой категории API (Products, Orders, Analytics, etc.)
- **Type Safety**: Полная генерация TypeScript типов из OpenAPI схем
- **Configurability**: Гибкая конфигурация (timeout, retry, base URL)
- **Extensibility**: Возможность кастомизации и расширения

#### 2. Authentication & Security
- Централизованное управление API ключами
- Безопасное хранение credentials
- Поддержка environment variables
- Валидация API ключей

#### 3. Request Management
- **Rate Limiting**: Автоматическое соблюдение лимитов API
- **Retry Logic**: Экспоненциальный backoff для failed requests
- **Request Queuing**: Очередь запросов для управления throughput
- **Timeout Management**: Настраиваемые timeout для различных операций

#### 4. Response Handling
- Автоматическая десериализация JSON
- Валидация response schema
- Typed error responses
- Pagination support (если присутствует в API)

#### 5. Error Handling
- Typed error classes для различных error scenarios
- User-friendly error messages
- Error logging и debugging support
- Graceful degradation

#### 6. Testing Support
- Mock режим для testing
- Test utilities и helpers
- Example payloads для каждого endpoint

### Non-Functional Requirements

#### Performance
- **Response Time**: <200ms overhead на SDK operations
- **Memory Efficiency**: Минимальный memory footprint
- **Bundle Size**: <100KB gzipped для core SDK

#### Reliability
- **Error Rate**: <0.1% для SDK-related errors
- **Retry Success**: >95% success rate после retry
- **Uptime Compatibility**: 99.9% compatibility с API uptime

#### Usability
- **Developer Experience**: Intuitive API, хорошая документация
- **Type Intellisense**: Полная поддержка IDE autocomplete
- **Error Messages**: Понятные и actionable error messages

---

## 🏗️ Proposed Architecture

### Project Structure
```
wb-api-sdk/
├── src/
│   ├── client/              # Core HTTP client
│   │   ├── base-client.ts
│   │   ├── rate-limiter.ts
│   │   ├── retry-handler.ts
│   │   └── auth-manager.ts
│   ├── modules/             # API modules (generated from Swagger)
│   │   ├── general/
│   │   ├── products/
│   │   ├── orders-fbs/
│   │   ├── orders-fbw/
│   │   ├── promotion/
│   │   ├── communications/
│   │   ├── analytics/
│   │   ├── reports/
│   │   └── finances/
│   ├── types/               # Generated TypeScript types
│   │   ├── general.types.ts
│   │   ├── products.types.ts
│   │   └── ...
│   ├── errors/              # Custom error classes
│   ├── utils/               # Utility functions
│   ├── index.ts             # Main SDK export
│   └── config.ts            # Configuration management
├── tools/                   # Build & generation tools
│   └── generate-sdk.ts      # Swagger → TypeScript generator
├── tests/                   # Test suites
├── docs/                    # Documentation
├── examples/                # Usage examples
└── wildberries_api_doc/     # Source Swagger files
```

### Technology Stack

**Core**:
- **Language**: TypeScript 5.x
- **Runtime**: Node.js 18+ (with browser compatibility consideration)
- **HTTP Client**: Axios или fetch-based (TBD based on requirements)

**Development**:
- **Build Tool**: Vite / tsup
- **Testing**: Vitest + MSW (Mock Service Worker)
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode

**Code Generation**:
- **OpenAPI Generator**: `@openapitools/openapi-generator-cli` or custom generator
- **Type Generation**: Direct Swagger parsing for optimal type generation

**Documentation**:
- **API Docs**: TypeDoc
- **User Guide**: Markdown with code examples
- **Interactive Examples**: Possible playground/sandbox

### Key Design Decisions

#### 1. Code Generation Strategy
- **Full Generation**: Генерация всех types, interfaces, и API methods из Swagger
- **Manual Overrides**: Возможность manual customization для edge cases
- **Versioning**: Поддержка multiple API versions

#### 2. Module Organization
- Один модуль = одна категория API (совпадает со Swagger файлами)
- Независимые модули могут использоваться отдельно
- Main SDK class агрегирует все модули

#### 3. Configuration Management
```typescript
interface SDKConfig {
  apiKey: string;
  baseUrls?: Partial<Record<APIModule, string>>;
  timeout?: number;
  retryConfig?: RetryConfig;
  rateLimitConfig?: RateLimitConfig;
  logLevel?: LogLevel;
}
```

#### 4. Error Handling Strategy
```typescript
// Typed error hierarchy
class WBAPIError extends Error {}
class AuthenticationError extends WBAPIError {}
class RateLimitError extends WBAPIError {}
class ValidationError extends WBAPIError {}
class NetworkError extends WBAPIError {}
```

---

## 🎨 Usage Examples (Target API)

### Basic Usage
```typescript
import { WildberriesSDK } from 'wb-api-sdk';

// Initialize SDK
const wb = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY
});

// Check connection
const status = await wb.general.ping();
console.log(status); // { TS: '2024-10-19T...', Status: 'OK' }

// Get products
const products = await wb.products.getProductList({
  limit: 100,
  offset: 0
});

// Create order
const order = await wb.ordersFBS.createOrder({
  // typed payload
});
```

### Advanced Usage with Configuration
```typescript
const wb = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY,
  timeout: 30000,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true
  },
  rateLimitConfig: {
    requestsPerSecond: 10,
    requestsPerMinute: 600
  },
  logLevel: 'debug'
});

// Error handling
try {
  const result = await wb.products.updateProduct(productId, data);
} catch (error) {
  if (error instanceof RateLimitError) {
    // Wait and retry
    await delay(error.retryAfter);
  } else if (error instanceof ValidationError) {
    // Handle validation
    console.error(error.validationErrors);
  }
}
```

### Module-Specific Usage
```typescript
// Use only specific modules
import { ProductsModule } from 'wb-api-sdk/modules/products';

const products = new ProductsModule({
  apiKey: process.env.WB_API_KEY
});

const categories = await products.getCategories();
```

---

## 📊 API Modules Breakdown

### 1. General Module (`01-general.yaml`)
**Key Features**:
- Connection testing (`/ping`)
- News API
- Seller information
- Authentication utilities

**Priority**: HIGH (core functionality)

### 2. Products Module (`02-products.yaml`)
**Key Features**:
- Product categories, subjects, characteristics
- Product card creation/editing
- Media file management
- Labels management
- Pricing and discounts
- Warehouse management
- Stock management

**Priority**: CRITICAL (main business logic)

### 3. Orders FBS Module (`03-orders-fbs.yaml`)
**Key Features**:
- Orders fulfillment from seller warehouse
- Order status management
- Shipping management

**Priority**: CRITICAL (core operations)

### 4. In-Store Pickup Module (`06-in-store-pickup.yaml`)
**Key Features**:
- Pickup point management
- Pickup orders processing

**Priority**: MEDIUM

### 5. Orders FBW Module (`07-orders-fbw.yaml`)
**Key Features**:
- Orders fulfillment from Wildberries warehouse
- WB warehouse integration

**Priority**: HIGH

### 6. Promotion Module (`08-promotion.yaml`)
**Key Features**:
- Promotional campaigns
- Promo codes
- Advertising management

**Priority**: MEDIUM

### 7. Communications Module (`09-communications.yaml`)
**Key Features**:
- Customer chat
- Q&A management
- Reviews management

**Priority**: HIGH (customer service)

### 8. Tariffs Module (`10-tariffs.yaml`)
**Key Features**:
- Tariff information
- Commission rates

**Priority**: MEDIUM

### 9. Analytics Module (`11-analytics.yaml`)
**Key Features**:
- Sales statistics
- Performance analytics
- KPI tracking

**Priority**: HIGH (business intelligence)

### 10. Reports Module (`12-reports.yaml`)
**Key Features**:
- Report generation
- Report retrieval
- Custom reports

**Priority**: HIGH (business operations)

### 11. Finances Module (`13-finances.yaml`)
**Key Features**:
- Financial transactions
- Payouts management
- Balance information

**Priority**: CRITICAL (financial operations)

---

## 🚀 Development Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Project setup (TypeScript, build tools, testing)
- [ ] Core HTTP client implementation
- [ ] Authentication manager
- [ ] Rate limiter implementation
- [ ] Retry handler with exponential backoff
- [ ] Error handling framework

### Phase 2: Code Generation (Week 2-3)
- [ ] Swagger parser implementation
- [ ] TypeScript type generator
- [ ] API method generator
- [ ] Validation schema generator
- [ ] Generate all 11 modules

### Phase 3: Module Implementation (Week 3-5)
**Priority Order**:
1. General module (foundation)
2. Products module (critical)
3. Orders FBS module (critical)
4. Finances module (critical)
5. Orders FBW module (high)
6. Communications module (high)
7. Analytics module (high)
8. Reports module (high)
9. Promotion module (medium)
10. Tariffs module (medium)
11. In-Store Pickup module (medium)

### Phase 4: Testing & Documentation (Week 5-6)
- [ ] Unit tests for all modules
- [ ] Integration tests
- [ ] Mock server for testing
- [ ] API documentation generation
- [ ] User guide and examples
- [ ] Migration guide

### Phase 5: Optimization & Release (Week 6-7)
- [ ] Performance optimization
- [ ] Bundle size optimization
- [ ] Security audit
- [ ] Beta release
- [ ] Community feedback integration
- [ ] v1.0.0 release

---

## 🔧 Technical Specifications

### Environment Support
- **Node.js**: 18.x, 20.x, 22.x
- **Browsers**: Modern browsers (optional, if browser support needed)
- **Package Manager**: npm, yarn, pnpm compatible

### Dependencies Strategy
- **Minimal Dependencies**: Prefer standard library where possible
- **Well-Maintained**: Only stable, actively maintained packages
- **Security**: Regular dependency audits
- **Tree Shaking**: ESM-compatible for optimal bundling

### Build Outputs
```
dist/
├── index.js          # CJS build
├── index.mjs         # ESM build
├── index.d.ts        # Type definitions
├── modules/          # Individual modules (tree-shakeable)
└── browser/          # Browser build (optional)
```

### Quality Standards
- **Test Coverage**: ≥80% for critical paths
- **Type Coverage**: 100% type safety
- **Documentation**: All public APIs documented
- **Code Quality**: ESLint strict, Prettier formatting
- **Performance**: <100ms overhead for typical operations

---

## 📖 Documentation Requirements

### API Documentation
- Auto-generated TypeDoc for all public APIs
- JSDoc comments for all methods
- Type annotations and examples
- Error handling documentation

### User Documentation
- **Quick Start Guide**: 5-minute setup
- **Complete Guide**: All features and options
- **API Reference**: Complete method reference
- **Examples**: Real-world usage scenarios
- **Migration Guide**: Version migration instructions
- **Troubleshooting**: Common issues and solutions

### Developer Documentation
- Architecture overview
- Code generation process
- Contributing guide
- Testing strategy
- Release process

---

## 🎯 Success Criteria

### Technical Success
- ✅ All 11 API modules fully implemented
- ✅ 100% TypeScript type coverage
- ✅ ≥80% test coverage
- ✅ Zero high-severity security vulnerabilities
- ✅ <100KB bundle size (gzipped)
- ✅ Complete API documentation

### User Success
- ✅ <30 minutes time-to-first-API-call
- ✅ Clear error messages for all failures
- ✅ Complete working examples for all modules
- ✅ Active community support

### Business Success
- ✅ Faster integration time vs manual Swagger usage
- ✅ Reduced integration errors
- ✅ Positive developer feedback
- ✅ Active adoption and usage

---

## 📝 Additional Context

### Wildberries Platform Context
- **Market**: Leading Russian e-commerce marketplace
- **Sellers**: 100,000+ active sellers
- **Use Cases**: Inventory management, order processing, analytics, financial reporting
- **Integration Points**: ERP systems, warehouse management, analytics platforms

### Technical Constraints
- API rate limits must be respected
- Authentication required for all operations
- Network reliability considerations (Russia-specific hosting)
- Potential API versioning and breaking changes

### Future Considerations
- **MCP Server**: Potential Model Context Protocol server for AI agent integration
- **CLI Tool**: Command-line interface for SDK operations
- **Web Dashboard**: Monitoring and management dashboard
- **Webhook Support**: Event-driven architecture support
- **Multi-Language**: Python, Go, PHP SDKs based on success

---

## 🎓 Instructions for Claude Code

### When creating `.claude/claude.md`, please include:

1. **Project Overview Section**
   - Reference this pre_product.md for context
   - Explain the SDK purpose and architecture
   - List all 11 API modules with priorities

2. **Development Guidelines**
   - TypeScript best practices for SDK development
   - Code generation strategy from Swagger files
   - Testing requirements and strategy
   - Documentation standards

3. **Coding Conventions**
   - Naming conventions for modules, types, methods
   - File organization patterns
   - Error handling patterns
   - Async/await patterns

4. **Architecture Decisions**
   - Modular design principles
   - Separation of concerns
   - Type safety requirements
   - Performance considerations

5. **Testing Strategy**
   - Unit testing approach
   - Integration testing with MSW
   - Mock data generation
   - Coverage requirements

6. **Documentation Requirements**
   - JSDoc standards
   - TypeDoc generation
   - Example code standards
   - README structure

7. **Workflow Instructions**
   - Code generation workflow
   - Testing workflow
   - Release process
   - Version management

8. **Quality Standards**
   - ESLint configuration
   - Prettier configuration
   - TypeScript strict mode
   - Performance budgets

9. **Integration Points**
   - Reference to Swagger files in `wildberries_api_doc/`
   - Environment variables handling
   - Configuration management
   - Error scenarios

10. **Specific Tasks for Claude Code**
    - SDK scaffolding generation
    - Type generation from Swagger
    - Module template creation
    - Test template creation
    - Documentation generation

### Key Focus Areas:
- **Type Safety**: Generate accurate TypeScript types from OpenAPI schemas
- **Developer Experience**: Intuitive API, excellent autocomplete, clear errors
- **Reliability**: Robust error handling, retry logic, rate limiting
- **Performance**: Minimal overhead, efficient bundling, fast operations
- **Maintainability**: Clean code, good documentation, extensible architecture

---

## 📞 Contact & Resources

### Reference Documentation
- **Wildberries API Docs**: https://dev.wildberries.ru/
- **OpenAPI Specification**: https://swagger.io/specification/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

### Development Resources
- Swagger files location: `./wildberries_api_doc/*.yaml`
- OpenAPI version: 3.0.1
- Security scheme: HeaderApiKey (API Key in header)

---

**Document Version**: 1.0
**Created**: 2024-10-19
**Purpose**: Foundation document for Claude Code to generate comprehensive `.claude/claude.md` file
**Next Step**: Use this document with Claude Code to create `.claude/claude.md` for effective SDK development

# SDK Verification Plan - Полный План Верификации SDK

**Дата создания:** 2025-12-03
**Цель:** Убедиться, что SDK реализует все методы API корректно и полностью

---

## Executive Summary

| Метрика | Значение |
|---------|----------|
| **YAML файлов** | 11 |
| **Endpoints в YAML** | 207 |
| **SDK async методов** | ~270 |
| **Уже протестировано** | ~39 методов |
| **Осталось проверить** | ~168 endpoints |

---

## 📊 Распределение Endpoints по Модулям

| # | Модуль | YAML Endpoints | Приоритет | Статус |
|---|--------|----------------|-----------|--------|
| 1 | General | 3 | ✅ Готов | 3/3 протестировано |
| 2 | Products | 41 | 🔴 CRITICAL | ~16/41 протестировано |
| 3 | Orders FBS | 27 | 🔴 CRITICAL | ~8/27 протестировано |
| 4 | In-Store Pickup | 15 | 🟡 Medium | ~6/15 протестировано |
| 5 | Orders FBW | 8 | 🟡 Medium | Требует проверки |
| 6 | Promotion | 41 | 🟡 Medium | Частично |
| 7 | Communications | 21 | 🟡 Medium | ~4/21 протестировано |
| 8 | Tariffs | 4 | 🟢 Low | Требует проверки |
| 9 | Analytics | 15 | 🟡 Medium | Требует проверки |
| 10 | Reports | 26 | 🟡 Medium | Требует проверки |
| 11 | Finances | 6 | 🔴 CRITICAL | ~3/6 протестировано |

---

## 🎯 План Верификации - 3 Этапа

### Этап 1: Автоматический Анализ Покрытия (1-2 часа)

**Цель:** Создать автоматизированный скрипт для сравнения YAML endpoints с SDK методами

#### 1.1 Парсинг YAML Documentation
```javascript
// Извлечь все endpoints из YAML:
// - URL path (/api/v1/balance)
// - HTTP method (GET, POST, PUT, DELETE)
// - Operation ID
// - Required parameters
// - Response schema
```

#### 1.2 Парсинг SDK Implementation
```javascript
// Извлечь из src/modules/*/index.ts:
// - Имена методов
// - URL в вызовах client.get/post/put/delete
// - Параметры методов
```

#### 1.3 Генерация Coverage Report
```markdown
## Coverage Matrix
| YAML Endpoint | SDK Method | Match | Notes |
|---------------|------------|-------|-------|
| GET /ping | general.ping() | ✅ | - |
| POST /cards | products.createCards() | ⚠️ | Missing params |
```

**Deliverable:** `comparison_docs/coverage-report.md`

---

### Этап 2: Ручное Тестирование API (2-4 часа)

**Цель:** Протестировать каждый endpoint прямым вызовом API vs SDK

#### 2.1 Структура Тестового Скрипта

Для каждого модуля создать/обновить `test-XX-module-api.cjs`:

```javascript
/**
 * Test Template for API vs SDK Comparison
 */
require('dotenv').config();
const { WildberriesSDK } = require('../dist/cjs/index.cjs');

const API_KEY = process.env.WB_API_KEY;
const sdk = new WildberriesSDK({ apiKey: API_KEY });

const tests = [];
let passed = 0;
let failed = 0;

async function testMethod(name, directCall, sdkCall) {
  console.log(`\n📋 Testing: ${name}`);
  try {
    const directResult = await directCall();
    const sdkResult = await sdkCall();

    const match = JSON.stringify(directResult) === JSON.stringify(sdkResult);
    if (match) {
      console.log('   ✅ MATCH');
      passed++;
    } else {
      console.log('   ⚠️ DIFF - Checking structure...');
      // Compare structure, not exact values
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    failed++;
  }
}

// Run tests for each endpoint
async function runTests() {
  // ... all tests
  console.log(`\n📊 Results: ${passed}/${passed + failed}`);
}

runTests();
```

#### 2.2 Категории Тестов

| Категория | Описание | Пример |
|-----------|----------|--------|
| **GET без параметров** | Простые справочники | `getDirectoryColors()` |
| **GET с query params** | Фильтрация, пагинация | `getOrders({ limit: 10 })` |
| **GET с path params** | ID в URL | `getOrder(orderId)` |
| **POST создание** | Создание ресурсов | `createSupply({...})` |
| **PUT обновление** | Модификация данных | `updateStock({...})` |
| **DELETE удаление** | Деструктивные операции | `deleteSupply(id)` |

#### 2.3 Приоритеты Тестирования

**Высокий приоритет (критичные для бизнеса):**
1. Products - товары, цены, остатки
2. Orders FBS - заказы, поставки
3. Finances - баланс, отчёты

**Средний приоритет:**
4. Analytics - аналитика продаж
5. Reports - отчёты
6. Communications - чаты, отзывы
7. Promotion - акции, промокоды

**Низкий приоритет:**
8. In-Store Pickup - самовывоз
9. Orders FBW - FBW заказы
10. Tariffs - тарифы

---

### Этап 3: Исправление Проблем (по необходимости)

**Цель:** Исправить все найденные расхождения

#### 3.1 Типы Проблем

| Тип | Описание | Решение |
|-----|----------|---------|
| **Missing Method** | Endpoint есть в YAML, нет в SDK | Добавить метод |
| **Wrong URL** | URL не совпадает с YAML | Исправить URL |
| **Missing Params** | Параметры не передаются | Добавить параметры |
| **Wrong Response Type** | Тип ответа не совпадает | Обновить типы |
| **Extra Method** | Метод есть в SDK, нет в YAML | Проверить, удалить если устарел |

#### 3.2 Процесс Исправления

```
1. Найти проблему в coverage-report.md
2. Открыть YAML файл для reference
3. Исправить метод в src/modules/*/index.ts
4. Обновить типы в src/types/*.types.ts
5. npm run build
6. npm test
7. Повторить тест API vs SDK
8. Обновить comparison docs
```

---

## 📁 Структура Файлов

```
comparison_docs/
├── README.md                           # Обзор (уже есть)
├── coverage-report.md                  # NEW: Автоматический отчёт покрытия
├── validation-summary.md               # NEW: Итоговый отчёт валидации
│
├── 01-general-api-comparison.md        # Существует
├── test-01-general-api.cjs             # Существует
│
├── 02-products-api-comparison.md       # Существует
├── test-02-products-api.cjs            # Существует
│
├── ... (остальные модули)              # Существуют
│
└── SDK-FIX-ACTION-PLAN.md              # Существует
```

---

## 🔧 Инструменты для Автоматизации

### 1. YAML Parser Script

```javascript
// tools/parse-yaml-endpoints.cjs
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function extractEndpoints(yamlPath) {
  const doc = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  const endpoints = [];

  for (const [path, methods] of Object.entries(doc.paths || {})) {
    for (const [method, details] of Object.entries(methods)) {
      if (['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
        endpoints.push({
          path,
          method: method.toUpperCase(),
          operationId: details.operationId,
          summary: details.summary,
          parameters: details.parameters || [],
          servers: methods.servers || doc.servers
        });
      }
    }
  }
  return endpoints;
}

// Export for use in comparison scripts
module.exports = { extractEndpoints };
```

### 2. SDK Method Extractor

```javascript
// tools/extract-sdk-methods.cjs
const fs = require('fs');
const path = require('path');

function extractSDKMethods(modulePath) {
  const content = fs.readFileSync(modulePath, 'utf8');
  const methods = [];

  // Match async method definitions
  const regex = /async\s+(\w+)\s*\([^)]*\)[^{]*{[^}]*this\.client\.(get|post|put|delete)\s*[<(]['"`]([^'"`]+)/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    methods.push({
      name: match[1],
      httpMethod: match[2].toUpperCase(),
      url: match[3]
    });
  }
  return methods;
}

module.exports = { extractSDKMethods };
```

### 3. Coverage Comparison Script

```javascript
// tools/generate-coverage-report.cjs
const { extractEndpoints } = require('./parse-yaml-endpoints.cjs');
const { extractSDKMethods } = require('./extract-sdk-methods.cjs');

function generateCoverageReport() {
  const yamlDir = path.join(__dirname, '../wildberries_api_doc');
  const modulesDir = path.join(__dirname, '../src/modules');

  const report = [];

  // For each YAML file...
  // Compare with corresponding SDK module...
  // Generate markdown report...

  return report;
}
```

---

## ✅ Критерии Успеха

### Полнота Покрытия
- [ ] 100% YAML endpoints имеют соответствующие SDK методы
- [ ] Все required параметры передаются
- [ ] Все HTTP методы (GET/POST/PUT/DELETE) корректны
- [ ] Все base URLs корректны

### Корректность Работы
- [ ] SDK возвращает те же данные, что и прямой API вызов
- [ ] Обработка ошибок корректна (401, 403, 429, 5xx)
- [ ] Rate limiting работает
- [ ] Retry logic работает

### Документация
- [ ] Каждый модуль имеет comparison doc
- [ ] Каждый модуль имеет test script
- [ ] Coverage report актуален
- [ ] README обновлён

---

## 📅 Timeline

| Этап | Задача | Время | Статус |
|------|--------|-------|--------|
| 1.1 | Создать YAML parser | 30 мин | ⏳ |
| 1.2 | Создать SDK extractor | 30 мин | ⏳ |
| 1.3 | Генерация coverage report | 1 час | ⏳ |
| 2.1 | Тестирование Products API | 1 час | ⏳ |
| 2.2 | Тестирование Orders FBS | 1 час | ⏳ |
| 2.3 | Тестирование Finances | 30 мин | ⏳ |
| 2.4 | Тестирование остальных модулей | 2 часа | ⏳ |
| 3 | Исправление найденных проблем | По необходимости | ⏳ |

**Общее время:** 6-8 часов

---

## 🚀 Следующие Шаги

1. **Немедленно:** Создать tools/parse-yaml-endpoints.cjs
2. **Далее:** Создать tools/extract-sdk-methods.cjs
3. **Затем:** Сгенерировать coverage-report.md
4. **После:** Обновить тесты для каждого модуля
5. **Финал:** Исправить все найденные проблемы

---

## 📝 Примечания

- Некоторые endpoints могут требовать специальных прав доступа (401)
- Некоторые endpoints деструктивные (DELETE) - тестировать осторожно
- Rate limits: соблюдать паузы между вызовами
- Некоторые методы могут быть deprecated в API

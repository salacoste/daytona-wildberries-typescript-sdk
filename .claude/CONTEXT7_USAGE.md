# Context7 - Руководство по использованию в Wildberries SDK

**Статус**: ✅ Настроен и активен
**Версия**: @upstash/context7-mcp v1.0.21

## 🎯 Что это дает?

Context7 автоматически предоставляет:
- 📚 Официальную документацию библиотек TypeScript/Node.js
- 💡 Примеры кода и best practices для SDK разработки
- 🔍 API reference с актуальными версиями
- ⚡ Контекстные подсказки при разработке

## 🚀 Практические примеры

### Пример 1: Работа с OpenAPI/Swagger парсингом

```typescript
// Когда вы работаете с OpenAPI спецификациями
import { parse } from 'yaml';
import { readFileSync } from 'fs';

// Context7 автоматически предоставит:
// - Актуальный API reference для 'yaml' пакета
// - Примеры парсинга YAML/JSON
// - Типизацию для OpenAPI 3.0.1 схем
// - Обработку ошибок парсинга

const swagger = parse(readFileSync('wildberries_api_doc/01-general.yaml', 'utf8'));
// ↑ Context7 покажет все методы parse() и опции
```

**Что получите от Context7**:
- Полный список методов пакета `yaml`
- Примеры работы с OpenAPI schemas
- Best practices для валидации YAML
- Типичные ошибки и их решения

### Пример 2: Работа с HTTP клиентами (axios/fetch)

```typescript
import axios from 'axios';

// Context7 предоставит:
// - Документацию axios для HTTP requests
// - Примеры различных HTTP методов (GET, POST, PUT, DELETE)
// - Обработку timeout и retry logic
// - Работу с interceptors и error handling

const client = axios.create({
  baseURL: 'https://content-api.wildberries.ru',
  // ↑ Context7 покажет все параметры AxiosRequestConfig
  timeout: 30000,
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
});
```

**Что получите от Context7**:
- Все параметры `axios.create()`
- Примеры работы с interceptors
- Обработка timeout и connection errors
- Best practices для production HTTP клиентов

### Пример 3: Type Generation из OpenAPI schemas

```typescript
// Вы спрашиваете Claude Code:
// "Как генерировать TypeScript интерфейсы из OpenAPI schemas?"

// Context7 предоставит:
// 1. Документацию для openapi-typescript или подобных tools
// 2. Примеры маппинга OpenAPI types → TypeScript
// 3. Обработку $ref, allOf, oneOf, anyOf
// 4. Генерацию JSDoc комментариев

interface ProductCard {
  id: number;
  name: string;
  price: number;
  // ↑ Context7 покажет best practices для типизации
}
```

### Пример 4: Работа с Vitest для тестирования

```typescript
import { describe, it, expect, vi } from 'vitest';

// Context7 автоматически помогает с:
// - Структурой тестов в Vitest
// - Mocking функций и модулей
// - Async testing patterns
// - Матчерами (toBe, toEqual, toThrow, etc.)

describe('ProductsModule', () => {
  it('should fetch parent categories', async () => {
    // ↑ Context7 покажет все доступные матчеры и assertions
    const mockClient = vi.fn();
    expect(mockClient).toHaveBeenCalled();
  });
});
```

## 🔧 Использование в SDK разработке

### Type Generation

```typescript
// При генерации типов из Swagger
// Context7 помогает с:

// 1. TypeScript utility types
type RequestBody<T> = T extends { requestBody: infer R } ? R : never;
// ↑ Примеры mapped types, conditional types, infer

// 2. JSDoc генерация
/**
 * Get all parent categories for product creation
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
 * @returns List of parent categories
 */
// ↑ Best practices для TSDoc/JSDoc
```

### HTTP Client Implementation

```typescript
// При создании BaseClient
// Context7 предоставляет:

import type { AxiosInstance, AxiosRequestConfig } from 'axios';

class BaseClient {
  private client: AxiosInstance;

  // ↑ Context7 покажет:
  // - Типы для axios
  // - Interceptor patterns
  // - Error handling strategies
  // - Retry logic implementations

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // ↑ Generic types best practices
  }
}
```

### Rate Limiting

```typescript
// При реализации RateLimiter
// Context7 помогает найти:

// 1. Token bucket algorithm libraries
// 2. Sliding window implementations
// 3. Queue management patterns
// 4. TypeScript типы для конфигурации

interface RateLimitConfig {
  requestsPerMinute: number;
  intervalSeconds: number;
  burstLimit: number;
}
// ↑ Context7 подскажет best practices для rate limiting
```

### Testing с MSW (Mock Service Worker)

```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Context7 предоставит:
// - Документацию MSW для Node.js
// - Примеры мокирования REST API
// - Обработку различных HTTP статусов
// - Integration testing patterns

const server = setupServer(
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
    return HttpResponse.json({
      // ↑ Context7 покажет все методы HttpResponse
      data: [{ id: 1, name: 'Electronics' }]
    });
  })
);
```

## 💡 Типичные сценарии

### Сценарий 1: "Как парсить OpenAPI спецификацию?"

**Ваш вопрос**:
> Как извлечь schemas из OpenAPI 3.0.1 файла?

**Context7 предоставит**:
```typescript
import { parse } from 'yaml';
import { readFileSync } from 'fs';

// Парсинг YAML файла
const swagger = parse(readFileSync('swagger.yaml', 'utf8'));

// Извлечение schemas
const schemas = swagger.components?.schemas || {};

// Итерация по схемам
for (const [schemaName, schema] of Object.entries(schemas)) {
  console.log(`Schema: ${schemaName}`, schema);

  // Best practice: валидация структуры
  if (schema.type === 'object' && schema.properties) {
    // Обработка объектных схем
  }
}
```

### Сценарий 2: "Как реализовать retry logic?"

**Ваш вопрос**:
> Как добавить exponential backoff retry в HTTP клиент?

**Context7 поможет с**:
1. **axios** retry interceptors
2. **Best practices** для exponential backoff
3. **TypeScript типы** для retry конфигурации
4. **Error handling** при исчерпании попыток

```typescript
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

async function executeWithRetry<T>(
  operation: () => Promise<T>,
  config: {
    maxRetries: number;
    retryDelay: number;
    exponentialBackoff: boolean;
  }
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Context7 подскажет паттерн exponential backoff
      if (attempt < config.maxRetries) {
        const delay = config.exponentialBackoff
          ? config.retryDelay * Math.pow(2, attempt)
          : config.retryDelay;

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}
```

### Сценарий 3: "Как генерировать TypeScript типы?"

**Ваш вопрос**:
> Как конвертировать OpenAPI schema в TypeScript interface?

**Context7 предоставит**:
```typescript
// Маппинг OpenAPI types → TypeScript
function mapOpenAPIType(schema: any): string {
  if (schema.type === 'string') {
    // Context7 покажет все возможные форматы
    if (schema.enum) return schema.enum.map(v => `'${v}'`).join(' | ');
    if (schema.format === 'date-time') return 'string | Date';
    return 'string';
  }

  if (schema.type === 'integer' || schema.type === 'number') {
    return 'number';
  }

  if (schema.type === 'boolean') {
    return 'boolean';
  }

  if (schema.type === 'array') {
    return `${mapOpenAPIType(schema.items)}[]`;
  }

  if (schema.type === 'object') {
    // Генерация интерфейса
    return generateInterface(schema);
  }

  if (schema.$ref) {
    // Резолв reference
    return resolveRef(schema.$ref);
  }

  return 'unknown';
}
```

## 🎓 Обучение и Best Practices

### Когда Context7 особенно полезен

1. **TypeScript типизация**: Работа с generic types, utility types
2. **HTTP клиенты**: axios, node-fetch, configuration
3. **Testing**: Vitest, MSW, mocking strategies
4. **OpenAPI/Swagger**: Парсинг, валидация, code generation
5. **Error handling**: Custom error classes, type guards

### Как максимизировать пользу

1. **Задавайте конкретные вопросы**:
   - ❌ "Как работать с TypeScript?"
   - ✅ "Как создать generic type для HTTP response в TypeScript?"

2. **Указывайте контекст**:
   - "При использовании axios в Node.js с TypeScript"
   - "Для OpenAPI 3.0.1 спецификации"

3. **Просите примеры**:
   - "Покажи пример с error handling в async функции"
   - "Покажи best practice для retry logic в production"

## 🔍 Дополнительные возможности

### Поиск паттернов

```bash
# Спросите Claude Code:
"Какой паттерн лучше использовать для rate limiting в TypeScript SDK?"

# Context7 предоставит:
# - Token bucket implementations
# - Sliding window algorithms
# - Queue-based rate limiters
# - Production-ready examples с типизацией
```

### Проверка версий

```bash
# Context7 учитывает версии библиотек
"Как работать с interceptors в axios 1.x?"

# Context7 предоставит:
# - Version-specific API changes
# - Migration guides от axios 0.x к 1.x
# - Deprecated methods warnings
```

## 📞 Когда Context7 НЕ поможет

Context7 не содержит:
- ❌ Приватную/закрытую документацию
- ❌ Внутренние корпоративные библиотеки
- ❌ Специфику Wildberries API (используйте Swagger docs)
- ❌ Deprecated/устаревшие версии библиотек

Для таких случаев используйте:
- WebSearch для поиска в интернете
- Read для чтения Swagger спецификаций (`wildberries_api_doc/*.yaml`)
- Официальную документацию Wildberries API

## 🎯 Практические задачи для SDK разработки

Попробуйте Context7 на этих задачах:

1. **Задача 1**: "Как парсить YAML файл с OpenAPI спецификацией?"
2. **Задача 2**: "Как реализовать rate limiter с token bucket algorithm?"
3. **Задача 3**: "Как настроить MSW для мокирования REST API в тестах?"
4. **Задача 4**: "Как правильно типизировать generic HTTP client в TypeScript?"
5. **Задача 5**: "Best practices для error handling в async/await TypeScript?"

## 📊 Производительность

Context7 оптимизирован для:
- ⚡ **Скорость**: ~1-2 секунды на запрос
- 💾 **Кеширование**: Результаты кешируются на 1 час
- 🔄 **Retry**: Автоматические повторы при ошибках
- 📉 **Токены**: Экономия 2-5K токенов на запрос

## ✅ Чеклист использования

- [x] Context7 активирован и проверен
- [ ] Понимаю, когда Context7 активируется автоматически
- [ ] Знаю, как использовать флаг `--c7` для ручной активации
- [ ] Попробовал Context7 с реальной задачей SDK разработки
- [ ] Знаю ограничения Context7 (приватные API, Wildberries специфика)

---

**🎉 Context7 настроен и готов помогать в разработке Wildberries SDK!**

**Следующий шаг**: Начните генерацию типов из Swagger файлов, и Context7 автоматически предоставит документацию по TypeScript, yaml парсингу, и code generation паттернам.

---

**Версия**: 1.0.0
**Дата**: 2025-10-19
**Проект**: Wildberries API TypeScript SDK

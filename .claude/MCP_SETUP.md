# Настройка MCP Servers для Wildberries API TypeScript SDK

## 📦 Context7 MCP Server

Context7 предоставляет доступ к официальной документации библиотек TypeScript/Node.js, примерам кода и best practices для SDK разработки.

### Установка и настройка

#### Шаг 1: Получение API ключа

1. Перейдите на [context7.com](https://context7.com)
2. Зарегистрируйтесь или войдите в аккаунт
3. Получите API ключ в разделе Settings/API Keys

#### Шаг 2: Настройка конфигурации

API ключ уже добавлен в файл `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "ctx7sk-5d755f9d-fce7-424e-be0c-209540b4ab27"
      },
      "metadata": {
        "description": "Library documentation and TypeScript/Node.js patterns for SDK development",
        "capabilities": [
          "resolve-library-id",
          "get-library-docs",
          "search-patterns",
          "best-practices"
        ],
        "usage": "Auto-activates for: TypeScript types, OpenAPI/Swagger patterns, Node.js HTTP clients, testing libraries (Vitest, MSW)",
        "projectRelevance": "Critical for: Type generation, HTTP client patterns, error handling, testing strategies"
      }
    }
  },
  "settings": {
    "autoStart": true,
    "timeout": 30000,
    "retryAttempts": 3,
    "projectContext": {
      "name": "Wildberries API TypeScript SDK",
      "type": "typescript-sdk",
      "primaryTasks": [
        "swagger-to-typescript-generation",
        "http-client-development",
        "rate-limiting-implementation",
        "error-handling-design"
      ]
    }
  }
}
```

**ВАЖНО**:
- Файл `.claude/mcp.json` содержит API ключ и **уже добавлен в `.gitignore`**
- Это локальная конфигурация только для этого проекта
- Не коммитьте API ключи в git!

#### Шаг 3: Проверка подключения

```bash
# Проверить доступность MCP server
npx -y @upstash/context7-mcp

# Должен вывести:
# Context7 Documentation MCP Server running on stdio
```

**Примечание**: Используется пакет `@upstash/context7-mcp` (официальный Upstash Context7 MCP server).

#### Шаг 4: Активация в Claude Code

1. **Полностью закройте Claude Code** (выход из приложения)
2. **Откройте проект снова**:
   ```bash
   cd /Users/r2d2/Documents/Code_Projects/wb_api_mcp_server
   claude code .
   ```
3. **Проверьте активацию**:
   ```bash
   /mcp
   # Должен показать Context7 в списке активных серверов
   ```

### Использование Context7

Context7 автоматически активируется в следующих случаях:

1. **TypeScript разработка**: Работа с types, interfaces, generics
2. **OpenAPI/Swagger**: Парсинг YAML, генерация кода из спецификаций
3. **HTTP клиенты**: axios, node-fetch, request configuration
4. **Testing**: Vitest, MSW, mocking patterns
5. **Node.js patterns**: async/await, error handling, streams

#### Примеры использования

```typescript
// В коде - Context7 автоматически предоставит документацию
import axios from 'axios';              // Context7 → axios documentation
import { parse } from 'yaml';           // Context7 → yaml parser API reference
import { describe, it, expect } from 'vitest';  // Context7 → Vitest testing API
```

**Ручная активация флагом**:
```bash
# Использовать в slash commands
/analyze --c7
/implement feature --context7
```

### Возможности Context7

- 🔍 **resolve-library-id**: Поиск библиотеки по имени (axios, vitest, yaml, etc.)
- 📚 **get-library-docs**: Получение официальной документации с примерами
- 🎯 **search-patterns**: Поиск паттернов использования (retry logic, rate limiting)
- ✨ **best-practices**: Рекомендации для production-ready кода

### Workflow Context7 для SDK разработки

1. **Library Detection**: Автоматическое обнаружение импортов TypeScript/Node.js
2. **ID Resolution**: Поиск актуальной версии библиотеки в Context7
3. **Documentation Retrieval**: Загрузка документации с фокусом на SDK patterns
4. **Pattern Extraction**: Извлечение примеров кода для:
   - Type generation из OpenAPI schemas
   - HTTP client implementation с retry logic
   - Rate limiting algorithms
   - Error handling hierarchies
   - Testing strategies с Vitest и MSW
5. **Implementation**: Применение паттернов с proper TypeScript типизацией
6. **Validation**: Проверка кода против best practices
7. **Caching**: Кеширование документации для быстрого доступа

### Интеграция с Slash Commands

Context7 используется в следующих командах:

- `/implement` → Генерация кода с документацией библиотек
- `/analyze` → Анализ использования зависимостей и паттернов
- `/test` → Best practices для testing с Vitest/MSW
- `/improve` → Рефакторинг с учётом актуальных API
- `/document` → JSDoc/TSDoc генерация с примерами

### Устранение неполадок

#### Context7 не запускается

```bash
# Проверить установку Node.js
node --version  # Требуется >= 18.x для TypeScript SDK

# Очистить npm cache и переустановить
npm cache clean --force
npx clear-npx-cache
npx -y @upstash/context7-mcp

# Проверить доступность сервера
npx -y @upstash/context7-mcp
# Должен вывести: Context7 Documentation MCP Server running on stdio
```

#### API ключ не работает

1. Проверьте правильность ключа в `.claude/mcp.json` (без пробелов)
2. Убедитесь, что ключ активен на [context7.com](https://context7.com)
3. Проверьте квоты API (Free tier: 100 requests/day)
4. Попробуйте сгенерировать новый ключ

#### Claude Code не видит MCP server

1. **Полностью перезапустите Claude Code**:
   - Закройте все окна Claude Code
   - Выйдите из приложения (Cmd+Q на macOS)
   - Откройте проект заново

2. **Проверьте путь к конфигурации**:
   ```bash
   ls -la .claude/mcp.json
   cat .claude/mcp.json | jq '.mcpServers'
   ```

3. **Проверьте логи Claude Code**:
   ```bash
   # Логи находятся в:
   ~/.claude/logs/
   ```

#### Timeout ошибки

Увеличьте timeout в `.claude/mcp.json`:

```json
{
  "settings": {
    "timeout": 60000,     // 60 секунд
    "retryAttempts": 5,   // 5 попыток
    "autoStart": true
  }
}
```

### Переменные окружения

Альтернативный способ настройки (не рекомендуется для этого проекта):

```bash
# В ~/.zshrc или ~/.bashrc
export CONTEXT7_API_KEY="ctx7sk-5d755f9d-fce7-424e-be0c-209540b4ab27"

# Или в .env файле проекта (НЕ КОММИТИТЬ!)
echo "CONTEXT7_API_KEY=ctx7sk-..." >> .env
```

### Производительность

- **Кеширование**: Context7 кеширует документацию на 3600 секунд (1 час)
- **Экономия токенов**: 2-5K токенов на запрос за счёт кеша
- **Параллельные запросы**: Поддержка до 3 одновременных запросов
- **Latency**: ~1-2 секунды на первый запрос, <100ms для cached результатов

### Поддерживаемые библиотеки (релевантные для SDK)

Context7 содержит документацию для:

**Core TypeScript/Node.js**:
- TypeScript (utility types, generics, conditional types)
- Node.js (fs, path, crypto, streams)

**HTTP Clients**:
- axios (HTTP client с interceptors)
- node-fetch (fetch API для Node.js)
- got, superagent (альтернативы)

**Parsing & Validation**:
- yaml (OpenAPI/Swagger парсинг)
- zod, yup (runtime validation)
- ajv (JSON Schema validation)

**Testing**:
- vitest (unit & integration testing)
- msw (Mock Service Worker)
- @testing-library (для React компонентов, если нужно)

**Code Generation**:
- openapi-typescript (генерация типов из OpenAPI)
- typescript (compiler API для codegen)

**Utilities**:
- lodash/lodash-es (utility functions)
- date-fns (date manipulation)

### Дополнительные MCP Servers (опционально)

В будущем можно добавить:

- **Sequential Thinking**: `@modelcontextprotocol/server-sequential-thinking` - для multi-step reasoning при сложной архитектуре
- **Filesystem**: `@modelcontextprotocol/server-filesystem` - для работы с файловой системой
- **GitHub**: `@modelcontextprotocol/server-github` - для интеграции с GitHub API

Конфигурация для них добавляется в тот же файл `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "context7": { /* existing config */ },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "env": {}
    }
  }
}
```

---

## 🎯 Quick Start Checklist

- [x] API ключ Context7 получен
- [x] Конфигурация `.claude/mcp.json` создана
- [x] `.claude/mcp.json` добавлен в `.gitignore`
- [ ] Claude Code перезапущен
- [ ] MCP server проверен командой `/mcp`
- [ ] Context7 протестирован на примере

---

## 📚 Полезные ссылки

- [Context7 Official](https://context7.com) - Регистрация и API ключи
- [Context7 MCP Documentation](https://github.com/upstash/context7-mcp) - GitHub репозиторий
- [Model Context Protocol](https://modelcontextprotocol.io) - Официальная спецификация MCP
- [Claude Code MCP Guide](https://docs.claude.com/en/docs/claude-code/mcp) - Документация по MCP в Claude Code

---

**Версия**: 1.0.0
**Дата**: 2025-10-19
**Проект**: Wildberries API TypeScript SDK
**MCP Server**: Context7 (@upstash/context7-mcp)

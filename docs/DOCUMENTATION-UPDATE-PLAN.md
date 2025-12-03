# План обновления документации SDK

**Дата:** 2025-12-03
**Версия SDK:** 2.0.2
**Статус документации:** Требует обновления после Epic 7

---

## Executive Summary

SDK прошёл масштабный аудит (Epic 7), в результате которого:
- Исправлено **13 критических багов** в сигнатурах методов
- Добавлено **23 новых метода** для достижения 100% покрытия API
- Обновлены типы и интерфейсы в 8 модулях

**Текущий статус документации:**
- VitePress сайт настроен и билдится ✅
- API Reference (TypeDoc) устарел - не отражает новые методы ❌
- Примеры кода (examples/) - заглушки, файлы не созданы ❌
- Гайды актуальны на 80% ⚠️
- GitHub Pages не опубликован ⚠️

---

## Часть 1: Критические обновления (Приоритет: HIGH)

### 1.1 Регенерация API Reference (TypeDoc)

**Задача:** Обновить автогенерированную документацию API

**Файлы:**
- `docs/api/**/*` - 343 файла (автогенерируемые)

**Действия:**
```bash
# 1. Убедиться, что код скомпилирован
npm run build

# 2. Запустить TypeDoc
npm run docs:api

# 3. Проверить генерацию всех модулей
ls docs/api/classes/
```

**Проверка успешности:**
- [ ] Все 11 модулей присутствуют в `docs/api/classes/`
- [ ] Новые методы (Epic 7) отображаются в документации
- [ ] JSDoc комментарии отображаются корректно

**Время:** ~30 минут

---

### 1.2 Обновление CHANGELOG.md

**Задача:** Документировать все изменения Epic 7

**Файл:** `/CHANGELOG.md` (создать если нет)

**Содержание:**
```markdown
## [2.0.2] - 2025-12-03

### Fixed
- `communications.getQuestionsCountUnanswered()` - URL исправлен на `/count-unanswered`
- `products.getWarehousesContact()` - добавлен параметр `warehouseId`
- `products.getHistoryTasks()` - добавлен параметр `uploadID`
- `products.getGoodsTask()` - добавлены параметры `uploadID`, `limit`, `offset`
- `products.getBufferTasks()` - добавлен параметр `uploadID`
- `products.getGoodsTask2()` - добавлены параметры `uploadID`, `limit`, `offset`
- `products.getGoodsFilter()` - добавлены параметры `limit`, `offset`, `filterNmID`
- `products.getSizeNm()` - добавлены параметры `nmID`, `limit`, `offset`
- `products.getQuarantineGoods()` - добавлены параметры `limit`, `offset`
- `products.createStock()` - добавлен параметр `warehouseId`
- `products.updateStock()` - добавлен параметр `warehouseId`
- `products.deleteStock()` - добавлен параметр `warehouseId`
- `products.updateWarehousesContact()` - добавлен параметр `warehouseId`

### Added (Orders FBS - Cross-Border)
- `ordersFBS.updatePass()` - обновление пропуска
- `ordersFBS.deleteOrderMetadata()` - удаление метаданных заказа
- `ordersFBS.setOrderSGTIN()` - установка кода маркировки
- `ordersFBS.setOrderUIN()` - установка УИН
- `ordersFBS.setOrderIMEI()` - установка IMEI
- `ordersFBS.setOrderGTIN()` - установка GTIN
- `ordersFBS.setOrderExpiration()` - установка срока годности
- `ordersFBS.getCrossBorderStickers()` - стикеры кросс-бордер
- `ordersFBS.getExternalStickersUrls()` - ссылки на стикеры (deprecated)
- `ordersFBS.getOrdersStatusHistoryCrossBorder()` - история статусов
- `ordersFBS.getOrdersWithClientInfo()` - заказы с клиентской информацией
- `ordersFBS.addSupplyTrbx()` - добавление коробов к поставке
- `ordersFBS.deleteSupplyTrbx()` - удаление коробов из поставки
- `ordersFBS.getSupplyTrbxStickersPost()` - стикеры коробов

### Added (Reports)
- `reports.getWarehouseRemainsReportStatus()` - статус отчёта об остатках
- `reports.downloadWarehouseRemainsReport()` - скачивание отчёта об остатках

### Added (Communications)
- `communications.getNewFeedbacksQuestions()` - непросмотренные отзывы/вопросы
- `communications.requestReturnByFeedback()` - возврат по отзыву

### Added (Products)
- `products.recoverCards()` - восстановление карточек из корзины
```

**Время:** ~1 час

---

### 1.3 Обновление README.md

**Задача:** Обновить главный README с актуальной информацией

**Файл:** `/README.md`

**Секции для обновления:**
1. **Badges** - версия SDK (2.0.2)
2. **Features** - добавить "100% API Coverage"
3. **Module table** - обновить количество методов
4. **Breaking Changes** - если есть изменения сигнатур

**Обновить таблицу модулей:**
```markdown
| Module | Methods | Coverage |
|--------|---------|----------|
| Products | 67 | ✅ 100% |
| Orders FBS | 42 | ✅ 100% |
| Promotion | 42 | ✅ 100% |
| Communications | 39 | ✅ 100% |
| Reports | 34 | ✅ 100% |
| Analytics | 21 | ✅ 100% |
| In-Store Pickup | 16 | ✅ 100% |
| Finances | 13 | ✅ 100% |
| Orders FBW | 8 | ✅ 100% |
| Tariffs | 4 | ✅ 100% |
| General | 3 | ✅ 100% |
```

**Время:** ~30 минут

---

## Часть 2: Создание примеров кода (Приоритет: HIGH)

### 2.1 Структура папки examples

**Задача:** Создать реальные файлы примеров вместо заглушек

**Текущее состояние:**
- `docs/examples/index.md` - только индекс со ссылками на несуществующие файлы

**Создать файлы:**

#### Basic Examples
```
docs/examples/basic/
├── hello-world.md          # SDK инициализация и ping
├── single-call.md          # Один API вызов
└── authentication.md       # Настройка API ключа
```

#### Intermediate Examples
```
docs/examples/intermediate/
├── error-handling.md       # Обработка ошибок (все типы)
├── rate-limiting.md        # Работа с rate limits
├── batch-operations.md     # Пакетные операции
└── pagination.md           # Пагинация результатов
```

#### Advanced Examples
```
docs/examples/advanced/
├── multi-module.md         # Мультимодульные сценарии
├── custom-retry.md         # Кастомная логика retry
├── performance.md          # Оптимизация производительности
└── typescript-advanced.md  # Продвинутые TypeScript паттерны
```

#### Use Case Examples
```
docs/examples/use-cases/
├── product-catalog.md      # Синхронизация каталога
├── pricing-updates.md      # Обновление цен
├── stock-management.md     # Управление остатками
├── order-processing.md     # Обработка заказов
├── shipping.md             # Управление доставкой
├── returns.md              # Возвраты
├── sales-dashboard.md      # Дашборд продаж
├── inventory-reports.md    # Отчёты по складу
└── financial-reports.md    # Финансовые отчёты
```

**Шаблон примера:**
```markdown
# [Название примера]

## Описание
[Краткое описание что делает пример]

## Требования
- SDK версии 2.0.0+
- API ключ Wildberries

## Код

\`\`\`typescript
import { WildberriesSDK } from 'wildberries-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});

// Пример кода...
\`\`\`

## Результат
\`\`\`json
{
  // Пример ответа API
}
\`\`\`

## Связанные материалы
- [API Reference](../api/classes/...)
- [Руководство](../guides/...)
```

**Время:** ~4-6 часов

---

### 2.2 Обновление tutorials

**Задача:** Проверить и обновить существующие tutorials

**Файлы:**
- `docs/getting-started/tutorials/product-catalog-sync.md`
- `docs/getting-started/tutorials/order-fulfillment.md`
- `docs/getting-started/tutorials/analytics-dashboard.md`
- `docs/getting-started/tutorials/multi-module-integration.md`

**Проверить:**
1. [ ] Все импорты соответствуют текущей версии SDK
2. [ ] Используемые методы актуальны (сигнатуры не изменились)
3. [ ] Примеры ответов API актуальны
4. [ ] Ссылки на API Reference работают

**Время:** ~2 часа

---

## Часть 3: Обновление гайдов (Приоритет: MEDIUM)

### 3.1 Обновить guides/best-practices.md

**Задача:** Добавить информацию о новых методах

**Добавить секции:**
- Cross-Border операции (Orders FBS)
- Работа с метаданными заказов
- Управление коробами поставок (TRBX)

**Время:** ~1 час

---

### 3.2 Обновить guides/troubleshooting.md

**Задача:** Добавить новые сценарии ошибок

**Добавить:**
- Ошибки Cross-Border операций
- Ошибки работы с отчётами (статусы, скачивание)
- Rate limit для новых методов

**Время:** ~1 час

---

### 3.3 Обновить FAQ.md

**Задача:** Добавить FAQ по новым функциям

**Добавить вопросы:**
- "Как работать с Cross-Border заказами?"
- "Как получить отчёт об остатках на складе?"
- "Как управлять коробами в поставке?"
- "Какие методы помечены как deprecated?"

**Время:** ~30 минут

---

## Часть 4: VitePress конфигурация (Приоритет: MEDIUM)

### 4.1 Исправить dead links

**Задача:** Заменить `ignoreDeadLinks: true` на реальные исправления

**Файл:** `docs/.vitepress/config.ts`

**Действия:**
1. Закомментировать `ignoreDeadLinks`
2. Запустить `npm run docs:build`
3. Исправить все найденные битые ссылки
4. Повторить до успешного билда

**Время:** ~2-3 часа

---

### 4.2 Добавить секцию Examples в навигацию

**Задача:** Добавить examples в sidebar

**Файл:** `docs/.vitepress/config.ts`

**Изменения:**
```typescript
sidebar: [
  // ... existing sections ...
  {
    text: 'Examples',
    items: [
      { text: 'Overview', link: '/examples/' },
      {
        text: 'Basic',
        collapsed: true,
        items: [
          { text: 'Hello World', link: '/examples/basic/hello-world' },
          { text: 'Single API Call', link: '/examples/basic/single-call' },
        ]
      },
      // ... more sections
    ]
  }
]
```

**Время:** ~30 минут

---

### 4.3 Добавить API Comparison в документацию

**Задача:** Интегрировать comparison_docs в VitePress

**Действия:**
1. Скопировать `comparison_docs/coverage-report.md` в `docs/api/coverage.md`
2. Добавить ссылку в sidebar под API Reference

**Время:** ~30 минут

---

## Часть 5: Публикация (Приоритет: HIGH)

### 5.1 GitHub Actions для автодеплоя

**Задача:** Настроить CI/CD для автоматической публикации

**Файл:** `.github/workflows/docs.yml`

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'src/**'
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build SDK
        run: npm run build

      - name: Generate API docs
        run: npm run docs:api

      - name: Build VitePress
        run: npm run docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

**Время:** ~1 час

---

### 5.2 Ручная публикация (первый раз)

**Задача:** Опубликовать документацию на GitHub Pages

**Действия:**
```bash
# 1. Билд документации
npm run docs:build

# 2. Создать ветку gh-pages (если нет)
git checkout --orphan gh-pages

# 3. Очистить и скопировать
rm -rf *
cp -r docs/.vitepress/dist/* .

# 4. Коммит и пуш
git add .
git commit -m "Deploy documentation"
git push origin gh-pages

# 5. Включить GitHub Pages в настройках репозитория
# Settings → Pages → Source: gh-pages branch
```

**Время:** ~30 минут

---

## Часть 6: Русская локализация (Приоритет: LOW)

### 6.1 Обновить русские версии гайдов

**Файлы:**
- `docs/ru/getting-started/*`
- `docs/ru/guides/*`
- `docs/ru/FAQ.md`
- `docs/ru/GLOSSARY.md`

**Задача:** Синхронизировать с английской версией после всех обновлений

**Время:** ~3-4 часа

---

## Чеклист выполнения

### Критические задачи (до релиза)
- [ ] 1.1 Регенерация API Reference
- [ ] 1.2 Создание CHANGELOG.md
- [ ] 1.3 Обновление README.md
- [ ] 5.2 Ручная публикация на GitHub Pages

### Важные задачи (в течение недели)
- [ ] 2.1 Создание примеров кода (basic/)
- [ ] 2.1 Создание примеров кода (intermediate/)
- [ ] 2.1 Создание примеров кода (advanced/)
- [ ] 2.2 Проверка tutorials
- [ ] 4.1 Исправление dead links
- [ ] 5.1 Настройка GitHub Actions

### Желательные задачи (в течение месяца)
- [ ] 2.1 Создание use-case примеров
- [ ] 3.1-3.3 Обновление гайдов
- [ ] 4.2-4.3 Улучшение навигации VitePress
- [ ] 6.1 Русская локализация

---

## Команды для разработчика

```bash
# Разработка документации (hot reload)
npm run docs:dev

# Билд документации
npm run docs:build

# Превью билда
npm run docs:preview

# Генерация API Reference
npm run docs:api

# Запуск тестов (для проверки примеров)
npm test

# Линтинг
npm run lint
```

---

## Примечания

1. **TypeDoc версия:** Убедитесь что используется совместимая версия TypeDoc
2. **VitePress версия:** 1.x (проверить в package.json)
3. **Node.js:** ≥18.x для VitePress
4. **Тестирование примеров:** Все примеры кода должны быть проверены на реальном API

---

## Контакты

- **SDK репозиторий:** https://github.com/salacoste/daytona-wildberries-typescript-sdk
- **NPM пакет:** https://www.npmjs.com/package/daytona-wildberries-typescript-sdk
- **Wildberries API Docs:** https://dev.wildberries.ru/

---
title: NodeNext — ESM и CommonJS
description: Строгая настройка TypeScript и поддерживаемые импорты для .mts и .cts
layout: doc
---

# NodeNext — ESM и CommonJS

Пакет поддерживает TypeScript-проекты с нативными правилами Node для ESM и CommonJS. Укажите `NodeNext` одновременно в `module` и `moduleResolution`: другое сочетание может выбрать неверное условие для деклараций или runtime-файлов.

::: info Общие страницы модулей и API
Русская документация использует общие англоязычные страницы модулей (`/modules/...`) и TypeDoc API (`/api/...`). Поэтому эти ссылки намеренно не содержат префикс `/ru/` и помечены в навигации как `English`.
:::

## Настройка компилятора

Создайте отдельный `tsconfig.json` для Node-потребителей:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "skipLibCheck": false,
    "noEmit": true
  },
  "include": ["src/**/*.mts", "src/**/*.cts"]
}
```

При `skipLibCheck: false` CI проверяет декларации зависимостей и не скрывает ошибки типов пакета.

## ESM в файле `.mts`

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { FinancesModule } from 'daytona-wildberries-typescript-sdk/finances';

type Sdk = WildberriesSDK;
type Finances = FinancesModule;

declare const sdk: Sdk;
declare const finances: Finances;
void [sdk, finances];
```

Корневой экспорт содержит `WildberriesSDK` и общие публичные типы. Поддерживаемые subpath-экспорты модулей: `/finances`, `/analytics`, `/communications` и `/reports`.

## CommonJS в файле `.cts`

```typescript
import SDK = require('daytona-wildberries-typescript-sdk');
import Reports = require('daytona-wildberries-typescript-sdk/reports');

type Sdk = InstanceType<typeof SDK.WildberriesSDK>;
type ReportClient = InstanceType<typeof Reports.ReportsModule>;

declare const sdk: Sdk;
declare const reports: ReportClient;
void [sdk, reports];
```

Не импортируйте внутренние файлы из `dist/` и отсутствующие в `exports` каталоги модулей. Эти пути не входят в публичный контракт пакета.

## Офлайн-проверка

Эквивалентные `.mts` и `.cts` fixtures хранятся в `tests/fixtures/docs/nodenext/`. Они проверяют только типы и не выполняют запросы к Wildberries. Запуск:

```bash
npm run validate:docs:nodenext
```

Команда собирает локальные артефакты пакета и компилирует оба fixture-файла со строгой конфигурацией выше.

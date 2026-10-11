# Поставка Products: WB API, октябрь 2026

## Статус

- Ограниченная реализация `TASK-219` и `TASK-221` завершена и проверена локально.
- Оба Backlog-задания оставлены в статусе **In Progress** для независимого review; все acceptance criteria отмечены выполненными, а Implementation Notes заполнены через Backlog.md CLI.
- Публикация, commit, push, live-вызовы WB API, чтение токенов/credentials и изменение данных кабинета не выполнялись.

## Реализованный контракт

### Справочники ТН ВЭД и ОКПД2 (`TASK-219`)

В `ProductsModule` добавлены:

- `getDirectoryTnvedAll(options?)` → `GET https://content-api.wildberries.ru/api/content/v2/directory/tnved/all`;
- `getDirectoryOkpd(options)` → `GET https://content-api.wildberries.ru/api/content/v2/directory/okpd`;
- `getDirectoryOkpdAll(options?)` → `GET https://content-api.wildberries.ru/api/content/v2/directory/okpd/all`.

Точный локальный контракт:

- TN VED all: `search?: number` согласно `integer` в схеме; `locale?: 'ru' | 'en'`;
- OKPD2 по предмету: обязательный `subjectId: number`, `search?: string`, `locale?: 'ru'`;
- OKPD2 all: `search?: number` согласно `number` в схеме; `locale?: 'ru'`;
- ответы используют обязательный envelope `data`, `error`, `errorText`, `additionalErrors`; элементы содержат обязательные пары `tnved`/`description` или `okpd2`/`description`;
- для всех трёх операций настроены отдельные limiter keys со значениями 100 запросов в минуту, интервал 600 мс, burst 5.

Неоднозначность upstream сохранена явно: у `okpd/all` схема объявляет `search` числом, хотя prose описывает точечные префиксы. SDK следует объявленному типу; `getDirectoryOkpd().search` остаётся строкой и принимает значения наподобие `61.06`.

### Дополнительный GTIN (`TASK-221`)

Необязательное non-null поле `gtin: string` добавлено в точные позиции:

- `createCardsUpload()` — `items[].variants[].gtin`;
- `createCardsUpdate()` — `items[].gtin`;
- `createUploadAdd()` — `cardsToAdd[].gtin`;
- `getCardsList()` — `cards[].gtin` ответа, только когда значение заполнено.

JSDoc и EN/RU документация фиксируют серверное правило без локального history validator:

- тот же GTIN должен ранее находиться в `skus` одной из карточек продавца;
- это не обязательно должна быть та же карточка;
- значения `skus` не должны повторяться между карточками или размерами;
- закреплённый источник помечает поле как доступное продавцам из РФ;
- SDK передаёт `gtin` как есть и не пытается восстановить историю кабинета.

## Источники и граница доказательства

Контролирующими источниками остаются официальные operation URL на `dev.wildberries.ru`, перечисленные в `TASK-219`, `TASK-221` и `backlog/docs/wb-api-news-2026-10-official-contracts.md`.

Прямое неаутентифицированное чтение официальных страниц из этой среды 2026-10-11 вернуло HTTP 498 (`INF-01-EL` / `INF-02-XC`). Поэтому точные поля и описания дополнительно сверены с закреплённым публичным OpenAPI-derived snapshot:

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed`;
- commit timestamp: `2026-10-10T08:10:59Z`;
- source file: `specs/02-items.yaml`;
- SHA-256: `e5e7d3625585336c503612b465c067994e69a2d7ae8cb3dbdb32816b4612541a`.

Этот snapshot является дополнительным доказательством, а не официальной публикацией WB. Если доступная позднее официальная схема отличается, контролирует официальный контракт WB. Live runtime кабинета и фактическая серверная приёмка новых полей — **NOT RUN**.

## Изменённые файлы

### Runtime, типы и экспорты

- `src/modules/products/index.ts` — три directory-метода, typed options/response use, GTIN в четырёх public method contracts и JSDoc.
- `src/types/products.types.ts` — locale, option, entry и response types для трёх directory-операций.
- `src/config/products-rate-limits.ts` — три limiter keys по 100/min, 600 ms, burst 5.
- `src/index.ts` — products-only публичные type exports; остальные параллельные экспорты сохранены.

### OpenAPI

- `wildberries_api_doc/02-products.yaml` — root copy трёх directory paths и четырёх GTIN locations.
- `wildberries_api_doc/02-products/_index.yaml` — category shard 10 → 13 endpoints, total 49 → 52.
- `wildberries_api_doc/02-products/kategorii-predmety-i-kharakteristiki.yaml` — три directory paths.
- `wildberries_api_doc/02-products/kartochki-tovarov-part1.yaml` — cards-list response GTIN.
- `wildberries_api_doc/02-products/kartochki-tovarov-part2.yaml` — cards-update request GTIN.
- `wildberries_api_doc/02-products/sozdanie-kartochek-tovarov.yaml` — upload и upload-add request GTIN.
- `docs/api-reference/raw-yaml/02-products.local-stopgap.yaml` — raw reference copy тех же изменений.

### Документация, тесты и Backlog

- `docs/modules/products.md` — EN usage, параметры, rate limits, upstream ambiguity и GTIN rule.
- `docs/ru/guides/working-with-product-cards.md` — RU usage и тот же contract boundary.
- `tests/unit/modules/products-news-2026-10.test.ts` — URL/query/limiter/response проверки трёх методов, точные значения limiter, type-compatible GTIN payloads и совместимость без GTIN.
- `backlog/tasks/task-219 - Add-TN-VED-and-OKPD2-directory-methods.md` — AC и Implementation Notes через CLI; статус оставлен In Progress.
- `backlog/tasks/task-221 - Add-additional-GTIN-fields-to-product-card-contracts.md` — AC и Implementation Notes через CLI; статус оставлен In Progress.
- `backlog/docs/wb-api-products-delivery-2026-10.md` — этот отчёт.

## Проверки

| Проверка | Результат |
|---|---|
| `npm test -- --run tests/unit/modules/products-brands.test.ts tests/unit/modules/products-cards-media.test.ts tests/unit/modules/products-content.test.ts tests/unit/modules/products-crud-critical.test.ts tests/unit/modules/products-news-2026-10.test.ts tests/unit/modules/products-prices-warehouse.test.ts` | exit 0; 6 файлов, 275 тестов |
| `npm test -- --run tests/unit/modules/products-news-2026-10.test.ts` | exit 0; 10 тестов |
| `npm run type-check` | exit 0 |
| `npx eslint src/modules/products/index.ts src/types/products.types.ts src/config/products-rate-limits.ts src/index.ts tests/unit/modules/products-news-2026-10.test.ts` | exit 0 |
| `npm run lint` | exit 1 только на чужом текущем state: `src/modules/returns/index.ts` (3 errors) и `tests/unit/modules/returns.test.ts` (2 errors); дополнительно 3 warnings в `tests/unit/modules/reports.test.ts`. Products-файлы чисты scoped lint |
| `npx prettier --check` для всех изменённых Products TS/MD/YAML файлов | exit 0 |
| `npm run validate:shards` | exit 0; `60/60 clean` |
| локальный structural parity check трёх directory paths и четырёх GTIN locations между root/shard/raw YAML | exit 0; `Products OpenAPI root/shard/raw parity OK` |
| `npm run docs:validate` | exit 0 |
| `npm run build` | exit 0; ESM, CJS и declarations собраны |
| строгий временный TypeScript consumer через `dist/esm/index.js` | exit 0; публичные directory types/methods и три GTIN payload shapes доступны |
| runtime ESM smoke из `dist/esm/index.js` | exit 0; `ESM exports OK` |
| runtime CJS smoke из `dist/cjs/index.cjs` | exit 0; `CJS exports OK` |
| `git diff --check` на owned Products-файлах | exit 0 |

`npm run validate:package` намеренно **NOT RUN**: известный сбой парсинга JSON вывода `npm pack` принадлежит параллельной packaging lane; Products-изменения этот script не исправляют и package gate не объявляется закрытым.

## Оставшаяся работа

- Независимый review `TASK-219` и `TASK-221`; поэтому статус задач остаётся In Progress.
- Общий lint gate зависит от исправлений владельца Returns/Reports lane.
- Package validation gate зависит от владельца packaging lane.
- Перед публичным versioned release желательно повторно сверить операции с напрямую доступной официальной WB OpenAPI, если HTTP 498 больше не мешает.
- Live WB API/cabinet verification и публикация остаются **NOT RUN** и вне этой поставки.

## Superseding final-integration evidence — 2026-10-11

Этот раздел дополняет, но не переписывает исторические результаты выше. Ранние Products-проверки корректно отражают состояние своей изолированной lane на тот момент; следующие факты относятся к итоговой интеграции после независимых review и устранения findings.

### Review и исправления

Четыре независимых Products/Analytics review-отчёта сохранены в `backlog/docs/`:

- `wb-api-products-analytics-acceptance-review-2026-10.md`;
- `wb-api-products-analytics-edge-review-2026-10.md`;
- `wb-api-products-analytics-verification-review-2026-10.md`;
- `wb-api-products-analytics-blind-review-2026-10.md`.

Принятые findings исправлены:

- три directory operation keys добавлены в `operation-metadata` как readonly/content с точными limiter keys; публичные helpers и operation-key-aware retry покрыты тестами;
- Products limiter regression теперь проверяет полный точный набор из 54 ключей, включая три новых directory keys;
- root type imports и compile-time границы проверяют обязательный `subjectId`, допустимый locale и non-null GTIN во всех четырёх позициях;
- root/shard/raw OpenAPI structural regression проверяет три directory paths, параметры, envelopes, rate metadata и четыре GTIN locations;
- восемь Analytics operations больше не содержат одновременно устаревшую часовую и новую двухчасовую freshness формулировки;
- EN/RU GTIN examples используют отдельный текущий SKU и прямо указывают, что prerequisite выполнен другой карточкой продавца.

### Итоговая проверка

| Проверка | Итог |
|---|---|
| `env -u WB_LIVE_API_TESTS npm test -- --reporter=dot` | exit 0; 86 файлов, 2555 passed, 1 skipped |
| Products/Analytics structural contracts | exit 0; 3 файла, 46/46 tests |
| `npm run type-check` | exit 0 |
| `npm run lint` | exit 0 |
| `npm run format:check` | exit 0 |
| `npm run build` | exit 0; ESM, CJS и declarations |
| `npm run validate:package` | exit 0; 5 export surfaces, 191 packed files |
| strict packed `.mts` и `.cts` consumers + ESM/CJS runtime | exit 0 |
| `npm run docs:validate` | exit 0 |
| `npm run validate:examples` | exit 0; 46 files, 230 examples |
| `npm run validate:shards` | exit 0; 60/60 clean |
| isolated `npm run docs:build` | exit 0; build complete in 30.34 s |

Раннее утверждение `validate:package NOT RUN` выше сохраняется как исторический факт той lane; итоговая интеграция исправила package validator и закрыла этот gate. Аналогично ранняя формулировка live `NOT RUN` для Products не описывает позднюю ошибочную общую integration-попытку: она загрузила существующее dotenv-состояние, после чего 228 mocked tests прошли, 1 был skipped, а 8 live tests завершились `NetworkError`. Эта попытка не доказала поведение WB runtime; credential values не сохранялись и не сообщаются. После guard fix исправленный default integration runner выполнил только 13 mocked files: 228 passed, 1 skipped.

### Сохраняющаяся граница выпуска

Official announcement/operation URLs остаются controlling. Прямое получение expanded official Products property schemas вернуло HTTP 498, а закреплённый `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed` snapshot остаётся supplemental и non-official. Поэтому точные локальные additive contracts считаются provisional и блокируют публичный release до прямого сравнения с доступной официальной ревизией. Успешного live WB proof, публикации, commit, push, deploy или version bump не было.

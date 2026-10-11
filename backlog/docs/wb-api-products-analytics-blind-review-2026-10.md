# Blind Hunter Review — WB API Products / Analytics, 2026-10

## Результат

**Вердикт: REQUEST CHANGES.** Blind Hunter подтверждает три ранее обнаруженных точечных дефекта. В текущем изменяемом рабочем дереве два документационных дефекта исправлены по результатам read-only проверки, а один интеграционный дефект Products остаётся нерешённым.

| Finding | Исходная серьёзность | Текущее состояние |
| --- | --- | --- |
| Реестр operation metadata не знает три новых Products GET-метода | HIGH | **UNRESOLVED** |
| EN raw Analytics противоречил сам себе: раз в час и раз в 2 часа | HIGH | **RESOLVED by current-tree inspection** |
| EN/RU GTIN example повторял prerequisite в `skus` того же нового payload | MEDIUM | **RESOLVED by current-tree inspection** |

Этот результат принимает только перечисленные ниже точные дефекты и их текущие disposition. Он не является blanket acceptance текущего дерева, не заменяет итоговый integration review и не подтверждает файлы вне заданного среза.

## Идентичность исходного reviewed input

- Baseline исходного review: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`.
- SHA-256 исходного frozen diff: `c5c532df0c16a0db613965cf9d6eac2dcbe2bfdf01b0f793f456f2b3646b9cf8`.
- В исходном frozen diff было 39 файлов.

Хеш и количество файлов выше описывают **только первоначальный замороженный вход review**. Они не являются идентичностью текущего рабочего дерева: параллельный integration executor продолжает менять source, tests, docs и tasks. Текущий tree hash для этого отчёта намеренно не объявляется.

## Принятые findings и текущая disposition

### [HIGH] UNRESOLVED — три новых Products GET-метода отсутствуют в operation metadata registry

**Принятый дефект**

`ProductsModule` добавляет три безопасных GET-операции:

- `getDirectoryTnvedAll()` в `src/modules/products/index.ts:434` с limiter key `products.contentDirectoryTnvedAll` на строке 441;
- `getDirectoryOkpd()` в `src/modules/products/index.ts:460` с limiter key `products.contentDirectoryOkpd` на строке 465;
- `getDirectoryOkpdAll()` в `src/modules/products/index.ts:484` с limiter key `products.contentDirectoryOkpdAll` на строке 491.

Соответствующие limiter configurations уже существуют в `src/config/products-rate-limits.ts:63`, `:68` и `:73`. Однако read-only поиск текущего `src/config/operation-metadata.ts` не находит ключи `products.getDirectoryTnvedAll`, `products.getDirectoryOkpd` и `products.getDirectoryOkpdAll`. В Products-разделе registry после существующих directory entries переход продолжается без этих трёх операций (`src/config/operation-metadata.ts:124`).

Из-за отсутствующих записей публичные helpers возвращают значения неизвестной операции:

- `isOperationReadonly(...)` возвращает `false` (`src/config/operation-metadata.ts:2994`);
- `getOperationCategory(...)` возвращает `undefined` вместо `content` (`src/config/operation-metadata.ts:3021`);
- `getOperationRateLimitKey(...)` возвращает `undefined` вместо соответствующего нового limiter key (`src/config/operation-metadata.ts:3043`).

**Retry consequence**

`RetryHandler.shouldRetry()` проверяет `isOperationReadonly(options.operationKey)` до классификации transient error. Для отсутствующего operation key результат `false`, после чего retry прекращается как для write operation (`src/client/retry-handler.ts:414-425`). Поэтому вызывающий код, который передаёт любой из трёх новых operation keys в публичный `RetryHandler.executeWithRetry()`, потеряет retry на 429, timeout, network failure и 5xx, если явно не включит `forceRetry`.

Граница влияния существенна: текущий `BaseClient.get()` вызывает `executeWithRetry()` без `operationKey`, поэтому этот review не утверждает, что прямой вызов трёх методов через `ProductsModule` уже перестал повторять GET-запросы. Подтверждён дефект публичного metadata/helper contract и operation-key-aware retry path.

**Требуемое исправление**

Добавить ровно три записи, не расширяя этот finding на посторонние omissions:

| Operation key | `readonly` | `category` | `rateLimitKey` |
| --- | ---: | --- | --- |
| `products.getDirectoryTnvedAll` | `true` | `content` | `products.contentDirectoryTnvedAll` |
| `products.getDirectoryOkpd` | `true` | `content` | `products.contentDirectoryOkpd` |
| `products.getDirectoryOkpdAll` | `true` | `content` | `products.contentDirectoryOkpdAll` |

Нужна meaningful regression coverage, которая для каждой операции проверяет полную registry entry, три публичных helper result и retry поведения operation-key path на transient error. Текущий Products metadata test содержит лишь выборочные старые операции (`tests/unit/config/operation-metadata.test.ts:124-160`, `:231-318`) и не называет ни один из трёх новых keys.

### [HIGH] RESOLVED — устранено противоречие once-hour vs two-hour для восьми EN Analytics operations

**Принятый исходный дефект**

Исходный frozen input добавлял двухчасовую freshness формулировку, но сохранял в тех же восьми English descriptions утверждение `updated once an hour` / `once per hour`. Это создавало взаимоисключающий публичный контракт freshness.

**Текущая disposition**

В текущем `docs/api-reference/raw-yaml/11-analytics.yaml` read-only inspection подтверждает двухчасовую формулировку и отсутствие прежнего hourly sentence внутри всех восьми затронутых operation blocks:

- Sales Funnel: `/api/analytics/v3/sales-funnel/products` (`:26`, freshness `:37`), `/products/history` (`:104`, freshness `:115`), `/grouped/history` (`:167`, freshness `:178`);
- Search Queries: `/api/v2/search-report/report` (`:894`, freshness `:904`), `/table/groups` (`:969`, freshness `:979`), `/table/details` (`:1036`, freshness `:1046`), `/product/search-texts` (`:1107`, freshness `:1117`), `/product/orders` (`:1175`, freshness `:1185`).

Найденные позже в этом файле фразы `once an hour` относятся к другим, не входящим в эти восемь operations surfaces; они не расширялись в отдельный finding по явной границе review.

Статус **RESOLVED** означает только устранение исходного внутреннего противоречия по текущему тексту. Семантическая истинность двухчасовой upstream freshness и generated-doc rendering в этом слое не проверялись.

### [MEDIUM] RESOLVED — EN/RU GTIN examples больше не изображают invalid same-payload prerequisite

**Принятый исходный дефект**

Исходные EN/RU examples передавали один и тот же GTIN `04600000000018` одновременно в `variants[].gtin` и в `sizes[].skus` того же нового `createCardsUpload()` payload. Такой пример визуально изображал локальное дублирование в новой карточке как выполнение historical prerequisite и противоречил тексту о ранее существовавшей карточке продавца.

**Текущая disposition**

- EN example теперь использует `gtin: '04600000000018'`, комментарий `already present in skus of another seller listing` и другой текущий SKU `04600000000995` (`docs/modules/products.md:493-505`).
- RU example использует те же разные значения и прямо говорит, что GTIN уже находился в `skus` другой карточки (`docs/ru/guides/working-with-product-cards.md:920-934`).

Тем самым example больше не утверждает, что prerequisite выполняется повторением значения в `sizes[].skus` того же нового payload. Серверная проверка истории кабинета остаётся описана как удалённая; локальный history validator не требуется.

## Проверка и ограничения

- Выполнена read-only проверка baseline blob, текущих source/docs/tests и трёх существующих Products Analytics review reports.
- Отчёт ограничен ровно тремя переданными findings. Другие operation-metadata omissions не искались и не оценивались.
- Tests, build, lint, formatter, LSP diagnostics, live WB calls, network retrieval, credentials и secrets не запускались и не читались по заданной границе. Поэтому две disposition `RESOLVED` подтверждены source inspection, а не runtime или rendered-doc proof.
- Текущий рабочий tree изменяется параллельно. Этот отчёт фиксирует состояние, видимое при его написании; integration review должен повторно проверить три dispositions на финальном exact head.
- Исходный код, tests, task files, indexes, shared configuration и другие review documents этим слоем не изменялись. Единственная запись этого reviewer — `backlog/docs/wb-api-products-analytics-blind-review-2026-10.md`.

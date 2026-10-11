---
id: SPEC-wb-api-news-2026-10
companions:
  - source-coverage.md
sources:
  - ../../../backlog/docs/wb-api-changes-2026-09.md
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability — consult them only if you need narrative rationale or prose color this contract intentionally omits.

# Поставка изменений WB API за октябрь 2026

## Why

Wildberries объявил девять изменений контрактов, сроков отключения и семантики свежести данных, которые затрагивают публичные типы, методы, CSV, локальные OpenAPI-копии и миграционные гарантии SDK 4.x. Поставка должна закрыть исполнимые изменения до ближайших дат 2026-10-12, 2026-10-26 и 2026-11-03, устранить связанный долг `task-215` и сохранить доказуемую связь с шестнадцатью уже обработанными сентябрьскими новостями.

## Capabilities

- **CAP-1**
  - **intent:** Потребитель аналитики видит официальную двухчасовую свежесть трёх Sales Funnel v3 методов и CSV `DETAIL_HISTORY_REPORT`/`GROUPED_HISTORY_REPORT`, а также границу применимости Order Feed.
  - **success:** JSDoc и документация EN/RU называют точные операции, типы отчётов и дату 2026-09-24; настройки rate limit не меняются, а Order Feed предлагается только для заказов и выкупов.
- **CAP-2**
  - **intent:** Потребитель финансовых отчётов получает `buyerTaxRegistrationReasonCode`, `utdUcdNumber` и `utdUcdDate` из обоих детальных методов продаж.
  - **success:** Официальный raw-контракт подтверждает три required non-null строки и `format: date` для `utdUcdDate`; локальный OpenAPI отражает exact requiredness, а публичный TypeScript сохраняет `?:` только как документированную совместимость с официальной selective `fields` projection без изменения несвязанного acquiring-поля.
- **CAP-3**
  - **intent:** Потребитель товаров может получать справочники ТН ВЭД и ОКПД2 через три новых официальных метода.
  - **success:** Типизированные методы, пути, параметры, ответы, rate-limit metadata, локальный OpenAPI, документация и тесты согласованы с официальным raw Swagger: TN ВЭД поддерживает `ru|en`, оба ОКПД2 request-контракта — только `ru`, а full-OKPD2 `search` остаётся `number`; rendered-наблюдение `ru,en` сохранено как конфликт источников без утверждения, что runtime отклоняет `en`.
- **CAP-4**
  - **intent:** Парсер и публичный контракт текстового Search Queries Premium CSV продолжают работать после отключения пяти percentile-колонок 2026-10-12.
  - **success:** Только `SEARCH_QUERIES_PREMIUM_REPORT_TEXT` перестаёт требовать `OpenCardPercentile`, `AddToCartPercentile`, `OpenToCartPercentile`, `OrdersPercentile` и `CartToOrderPercentile`; одноимённые поля других отчётов сохранены.
- **CAP-5**
  - **intent:** Потребитель карточек использует дополнительное поле `gtin` в create, update, add и list контрактах в пределах правил Wildberries.
  - **success:** Официальный raw Swagger подтверждает все четыре расположения как optional non-null string; типы, OpenAPI, документация и тесты совпадают, а правило допускает тот же GTIN, если он уже встречался в `skus` одной из карточек, без ограничения предыдущего значения той же карточкой и без недоказуемой клиентской проверки истории кабинета.
- **CAP-6**
  - **intent:** Потребитель отчёта по регионам получает безопасный путь миграции до отключения `GET /api/v1/analytics/region-sale` 2026-11-03.
  - **success:** SDK 4.x сохраняет метод с датированной deprecation/warn-once подсказкой и документирует ограничения пагинации, периода и региональной агрегации Order Feed без обещания эквивалентности; пример агрегирует каждую страницу сразу и проверяет продвижение offset, а удаление отложено в отдельную v5-задачу.
- **CAP-7**
  - **intent:** Потребитель DBS client-info получает `additionalPhones` и `replacementAdditionalPhones` по официальному optional/null/list-контракту.
  - **success:** Официальный raw Swagger подтверждает оба поля как optional non-null массивы строк и top-level `orders` как nullable; публичные root-типы, OpenAPI, документация, декларации и тесты совпадают и используют только синтетические персональные данные.
- **CAP-8**
  - **intent:** Потребитель поисковой аналитики видит двухчасовую свежесть пяти API-отчётов и трёх CSV-вариантов с 2026-10-12.
  - **success:** Все восемь поверхностей документированы как data freshness, а не rate limit; изменение percentile-колонок остаётся отдельным точечным контрактом.
- **CAP-9**
  - **intent:** Пользователь sandbox создаёт тестовые DBS-to-PVZ и EDBS задания через официальный `deliveryType`.
  - **success:** `ordersDBS.createTestOrders(request)` использует фиксированный sandbox host и `POST /api/v3/test/dbs/orders/make`, принимает top-level строковый `deliveryType` со значениями `dbs|dbsPickupPoint|edbs`, сохраняет omission для optional `deliveryType` и `address`, проверяет 1–10 `orders`, применяет отдельный лимит 1 запрос/с и не повторяет write автоматически. Типы, OpenAPI, документация и mocked-тесты согласованы без production/sandbox-вызовов; скрытые raw required/nullability flags, server-side default, HTTP 204 runtime и фактический rate enforcement остаются недоказанными.
- **CAP-10**
  - **intent:** `ReturnsModule.getReturns` сохраняет FBO-источник после отключения старого goods-return endpoint.
  - **success:** Активные и архивные страницы `/api/analytics/v1/item-returns` последовательно запрашиваются через общий limiter 1/min burst 1; 204 и точная полная последняя страница завершают pagination; `sku`, status context и reason отображаются в стабильную модель; archive выигрывает переходный duplicate `srid`; равные даты отклоняются до вызова; прежняя partial-failure policy и зарезервированный FBS сохраняются.
- **CAP-11**
  - **intent:** Сопровождающий может проследить каждую текущую и предыдущую новость до официального источника, Backlog-задачи и доказательства проверки.
  - **success:** Companion связывает девять новостей, `task-215`, residual-задачи `TASK-228`–`TASK-231` и шестнадцать сентябрьских новостей с задачами и proof gates, включая strict packed NodeNext consumers и exact English Products fence parity, явно разделяя source inspection, supplemental snapshot, mocked verification, package evidence, неуспешную network-попытку и отсутствующее успешное live runtime доказательство.

## Constraints

- Содержательные контракты разрешаются по официальной документации WB или выбранной официальной OpenAPI-ревизии до изменения кода; неизвестные поля не угадываются.
- Внешние публикации, deploy, live cabinet mutations, сообщения, чтение значений credentials/secrets и реальные данные покупателей запрещены. Предыдущая ошибочная интеграционная команда загрузила существующее dotenv-состояние и завершила восемь live-проверок ошибками `NetworkError`; она не доказала поведение WB runtime, значения credentials не сохраняются и не сообщаются, повторный live-запуск запрещён.
- Совместимость 4.x сохраняется: датированная deprecation предшествует физическому удалению, которое выполняется только в v5 или позже.
- Data freshness не трактуется как request rate limit; limiter меняется только при отдельном официальном доказательстве.
- Локальный OpenAPI, публичные TypeScript-типы, runtime-методы, JSDoc, EN/RU docs, fixtures, tests и package declarations должны оставаться согласованными.
- Package declaration proof строится из clean build и реального извлечённого tarball: постоянные `.mts`/`.cts` fixtures компилируются strict NodeNext с `skipLibCheck: false`, locale-negative fixture обязана завершаться точной ошибкой `en` против `ru`, runtime smoke только импортирует пять exports; SDK, snippets и WB API не исполняются.
- Официальные публичные raw Swagger `02-items`, `13-finances` и `05-dbs`, захваченные 2026-10-11 с SHA-256 в evidence report, закрывают exact source gates для Products directories/GTIN, Finance и DBS phones/orders; mutable URL и отсутствие успешного runtime вызова не превращаются в version pin или runtime proof.
- Sandbox CAP-9 основан на видимом официальном rendered contract: отображённый `dbs` default и отсутствие required badge разрешают omission-preserving client contract, но не доказывают скрытые raw required/nullability flags или server-side default enforcement.
- Чужое содержимое `backlog/config.yml`, исходные девять intake-записей и исторические delivery reports сохраняются; новые зависимости и несвязанные repricer/app-функции не входят в поставку.
- Даты без года означают 2026-10-12 и 2026-11-03; даты публикации не додумываются.

## Non-goals

- Публикация npm/GitHub release, deploy, production/live-cabinet проверка или изменение данных продавца.
- Физическое удаление deprecated API из 4.x или преждевременная реализация v5-задач.
- Клиентская проверка истории GTIN между карточками/кабинетами и сбор или логирование реальных телефонов.
- Разработка repricer, consumer app или других функций вне SDK-контрактов этих новостей.

## Success signal

Все девять октябрьских изменений, `TASK-215`, package validator и residual-задачи `TASK-228`–`TASK-231` имеют локальную реализацию; raw source gates для Products/GTIN, Finance и DBS phones закрыты, CAP-9 реализован в границах видимого rendered contract, английские Products fences совпадают с постоянным fixture `2/2`. Clean build и извлечённый 193-file tarball проходят strict NodeNext `.mts`/`.cts` и five-export runtime import smoke. После source freeze свежие full/default checks дали 90 test files с 2,580 passed и 1 skipped, mocked integration — 13 files с 228 passed и 1 skipped; type-check, lint, format, targeted diagnostics, build, package/declaration, docs/examples/links/shards и isolated VitePress build завершились exit 0. Независимый composed review принял точный frozen source candidate без findings; `TASK-219`, `TASK-224`, `TASK-226` и `TASK-231` закрыты `Done` через Backlog CLI. Первая обычная commit attempt прошла TypeScript hook, но gitleaks остановил её по `generic-api-key` на известном синтетическом placeholder; первый unanchored recovery получил `REQUEST CHANGES` с одним MEDIUM finding. Corrected exact-match recovery затем получил independent `FINAL ACCEPT` без findings, сохранил detection для unrelated/prefix/suffix controls и закрыл `TASK-232` `Done`; delivery допущена к обычному hook-protected local commit, authoritative identity которого задаётся содержащим его Git object. `TASK-209`, `TASK-214` и `TASK-223` остаются будущими v5-задачами. Version bump, push, npm publication, release, deploy и успешное live/sandbox runtime доказательство отсутствуют.

## Assumptions

- Начальная база — `main` на `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`, package `4.6.0`; каждый implementation owner повторно проверяет HEAD перед правкой.
- Ранее подтверждённый официальный путь операции `getAnalyticsV1GoodsReturn` — `/api/analytics/v1/item-returns`, пока более свежая официальная ревизия не докажет иное.

## Open Questions

- Когда WB опубликует сохраняемую raw-схему sandbox-операции, подтверждающую hidden required/nullability flags и server-side default semantics для `deliveryType`?

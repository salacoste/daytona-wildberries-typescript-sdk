# Финальная локальная поставка WB API news — октябрь 2026

## Результат и границы

Локальная интеграция выполнена поверх неизменного baseline `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`; версия пакета остаётся `4.6.0`. Реализованы все девять октябрьских объявлений, связанная миграция Returns v1 и остаточные сентябрьские исправления по FBS waybill и Promotion CPC. Sandbox DBS реализован в границах видимого официального rendered-контракта.

Точный frozen source candidate принят independent composed review без findings. Первая обычная попытка commit прошла TypeScript hook, но mandatory gitleaks hook отклонил известный синтетический placeholder по `generic-api-key` в `src/modules/orders-dbs/index.ts:108`; commit object тогда не был создан. Первый unanchored recovery получил независимый `REQUEST CHANGES` с одним MEDIUM finding и сохранён как история. Corrected exact-match recovery затем получил independent **FINAL ACCEPT** без findings для tree `582a91e34acb46d9ff6c7f7eb502ca7983f152cb`; normal staged scan и exact control прошли, а unrelated/prefix/suffix controls сохранили detection. `TASK-232` закрыт `Done`, и delivery допущена к одной обычной hook-protected local commit attempt. Версия пакета остаётся `4.6.0`; push, публикация npm, release, deploy, успешные seller API вызовы и создание sandbox-заказов не выполнялись. Восемь ранних read-only live-попыток были фактически запущены и все завершились `NetworkError`; они не дали успешного WB runtime proof.

## Матрица задач

| Задача | Локальный результат | Текущий статус |
|---|---|---|
| `TASK-215` | Returns переведён на `/api/analytics/v1/item-returns` с active/archive pagination, сохранением `sku`, archive precedence и строгим date range | Done |
| `TASK-216` | Сверены 16 сентябрьских строк, девять октябрьских объявлений и остаточные gaps | Done |
| `TASK-217` | Sales Funnel и history CSV документируют двухчасовую свежесть | Done |
| `TASK-218` | Finance detailed reports получили buyer KPP и UPD/UKD поля; optional TypeScript-проекция сохранена | Done |
| `TASK-219` | Добавлены TN VED и OKPD2 methods, типы, limiter/metadata, OpenAPI, docs и tests | Done |
| `TASK-220` | Из text CSV удалены только пять отключённых percentile-колонок | Done |
| `TASK-221` | `gtin` добавлен в четыре позиции с правилом исторического совпадения в `skus` любой карточки продавца | Done |
| `TASK-222` | Region-sale оставлен совместимым с warn-once deprecation и EN/RU Order Feed migration guide | Done |
| `TASK-223` | Будущее удаление region-sale в v5 | To Do / future |
| `TASK-224` | DBS phones и nullable `orders` отражены в типах, OpenAPI, docs и package consumers | Done |
| `TASK-225` | Пять Search Queries API reports и три CSV описывают двухчасовую свежесть | Done |
| `TASK-226` | Добавлен sandbox `createTestOrders()` с fixed host, `deliveryType`, limiter, OpenAPI, docs и mocked tests | Done |
| `TASK-227` | Исправлена проверка JSON-форм npm pack и каждого manifest member | Done |
| `TASK-228` | Live integration изолирован exact opt-in guard до dotenv/SDK/request | Done |
| `TASK-229` | Восстановлена FBS waybill parity root/shards/shared/raw | Done |
| `TASK-230` | JSDoc bid recommendations согласован с CPM/CPC runtime и types | Done |
| `TASK-231` | Declaration graph исправлен через supported `beforeWriteFile` AST transform; actual tarball проходит strict NodeNext consumers | Done |
| `TASK-232` | Exact synthetic Orders DBS placeholder allowlisted по complete-match boundary; corrected recovery принят independent review | Done |
| `TASK-209`, `TASK-214` | Будущие v5 удаления устаревших методов | To Do / future |

## Девять октябрьских объявлений

1. Три Sales Funnel v3 операции и два history CSV типа указывают свежесть раз в два часа с 2026-09-24; Order Feed рекомендован только для актуальных заказов и выкупов.
2. Обе Finance detailed-report операции включают `buyerTaxRegistrationReasonCode`, `utdUcdNumber` и `utdUcdDate` через общий public row type и синхронизированный OpenAPI.
3. Products предоставляет TN VED all, subject OKPD2 и OKPD2 all с отдельными limiter keys, metadata, root exports, документацией и structural tests. Raw contract разрешает `ru|en` только для TN VED и `ru` для обоих OKPD2; конфликт rendered `okpd/all` сохранён без runtime-утверждения.
4. Только `SEARCH_QUERIES_PREMIUM_REPORT_TEXT` больше не требует пять отключённых percentile columns; остальные JSON/CSV surfaces не изменены.
5. Card create/update/add/list contracts содержат optional non-null `gtin`; историческое правило допускает GTIN, ранее встречавшийся в `skus` одной из карточек продавца, без требования той же карточки.
6. Region-sale в 4.x остаётся вызываемым, выдаёт одно dated warning за процесс и сопровождается EN/RU примерами постраничной агрегации Order Feed.
7. DBS client info содержит optional non-null `additionalPhones` и `replacementAdditionalPhones`; top-level `orders` nullable, а примеры используют только синтетические данные.
8. Пять Search Queries API reports и три CSV варианта документируют двухчасовую свежесть с 2026-10-12 без изменения rate limits.
9. `ordersDBS.createTestOrders(request)` вызывает `POST /api/v3/test/dbs/orders/make` на фиксированном sandbox host, поддерживает `deliveryType: dbs|dbsPickupPoint|edbs`, сохраняет omission `deliveryType` и `address`, проверяет 1–10 orders, использует отдельный лимит 1 req/s и не повторяет write автоматически.

## Связанные исправления

### Returns v1

`ReturnsModule.getReturns()` последовательно читает active и archive страницы `/api/analytics/v1/item-returns` с `limit: 1000`. Полная последняя страница требует terminal empty request, 204 трактуется как пустая страница, равные даты отклоняются до source call, а archive заменяет active запись с тем же `srid`. Публичный `ReturnItem` сохраняет `sku`, status context и reason; partial-failure policy остаётся стабильной.

### Strict NodeNext package declarations

`vite-plugin-dts` использует supported `beforeWriteFile` hook и AST-aware transform, который добавляет `.js` или `/index.js` только к source-proven relative declaration specifiers и отклоняет неразрешимые targets. Clean build даёт 81 declaration file, 200 relative specifiers, 152 file targets, 48 `/index.js` targets и ноль unsafe extensionless specifiers.

Actual npm tarball содержит 193 файла. Извлечённые persistent `.mts` и `.cts` consumers компилируют все пять exports с `module/moduleResolution: NodeNext`, `strict: true`, `skipLibCheck: false`, затем ESM import и CJS require разрешают те же exports без создания SDK и вызова методов. Negative fixture обязан отвергнуть только `locale: 'en'` для full OKPD2.

`dist` содержит 190 файлов. Разница ровно в трёх package-root files — `package.json`, README и LICENSE — и не является дефектом. Build input manifest содержит 93 файла и имеет одинаковый SHA-256 до и после build: `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367`. `dist` manifest SHA-256: `9d07a7c3ee0a07f93811d5aba6ff6580513b6cf129bbc2c7eb8da75880befe8e`.

### English Products guide parity

Постоянный fixture `tests/fixtures/docs/english-products-guide-parity.mts` имеет SHA-256 `c3b55362db9e8478cc9f3c62a852aa17c4b927383472fd0a3de2223dc72404f6`, проходит strict source Bundler compile, а heading-based comparator подтверждает точное совпадение двух из двух fence blocks. Исторический отчёт сохранён и дополнен датированным follow-up вместо переписывания старого evidence.

## Свежая локальная проверка

Все pipelines, использующие `tee`, запускались с `set -o pipefail`; exit status взят у реального процесса.

| Проверка | Exit | Результат |
|---|---:|---|
| `env -u WB_LIVE_API_TESTS npm test -- --reporter=dot` | 0 | 90 files; 2,580 passed; 1 skipped; live file не выбран |
| `env -u WB_LIVE_API_TESTS npm run test:integration -- --reporter=dot` | 0 | 13 mocked files; 228 passed; 1 skipped |
| default integration list | 0 | 13 mocked files; `api.test.ts` отсутствует |
| exact live opt-in static list | 0 | только `tests/integration/api.test.ts`; тесты не выполнялись |
| NodeNext/helper focused tests | 0 | 2 files; 19/19 passed |
| `npm run type-check` | 0 | глобальный TypeScript check без ошибок |
| `npm run lint` | 0 | глобальный ESLint check без ошибок |
| `npm run format:check` | 0 | настроенные TypeScript files отформатированы |
| targeted helper/config diagnostics | 0 | strict TypeScript, syntax, ESLint и Prettier checks прошли |
| `npm run build` | 0 | Vite: 115 modules; ESM, CJS и declarations созданы |
| `npm run validate:package` | 0 | 5 exports; actual 193-file tarball; strict `.mts`/`.cts`; runtime import/require |
| declaration AST scan | 0 | 81 declaration files; 0 unsafe specifiers |
| `npm run docs:validate` | 0 | TypeDoc validation passed |
| actual English snippet compile/comparator | 0 | strict compile; exact fences 2/2 |
| `npm run validate:examples` | 0 | 50/50 files; 380 examples; это static regex validator, не compiler |
| `npm run validate:links` | 0 | 1,633/1,633 Markdown files; 192 links; 0 broken |
| `npm run validate:shards` | 0 | 61/61 clean |
| isolated VitePress build | 0 | финальный staged generated API и весь docs site собраны в отдельный temporary output; API index/template hashes совпали |
| original 219-path unstaged and staged `git diff --check` | 0 | pre-correction candidate had no whitespace errors |
| post-correction scoped administrative `git diff --cached --check` | 0 | files changed by the completeness correction are whitespace-clean |
| corrected secret-scan review | 0 | staged gitleaks и exact control: zero findings; unrelated/prefix/suffix: по одному `generic-api-key`; FINAL ACCEPT |
| final full `git diff --cached --check` | 2 | reports only original Markdown hard-break whitespace in the exact preserved GTIN and historical review reports, plus the historical review's original final blank line; their bytes were not rewritten |

## Недоказанные runtime-границы

- Успешные live WB seller calls: **NOT RUN / не доказаны**.
- Успешное создание sandbox DBS заказа: **NOT RUN / не доказано**.
- Server-side default `deliveryType`, HTTP 204 и реальное применение limiter: **не доказаны runtime**.
- Hidden raw sandbox required/nullability flags: **не доказаны**; локальный контракт основан на видимом rendered evidence.
- Runtime rejection full-OKPD2 `locale: 'en'`: **не доказан**; доказана compile-time raw-contract типизация.
- Удалённое принятие исторического GTIN: **не доказано**.
- Локальный commit: corrected recovery independently accepted; этот документ входит в authorized ordinary hook-protected commit, authoritative identity которого задаётся содержащим его Git object без prospective self-reference.
- Push, publish, release, deploy и version bump: **не выполнялись**.

## Ранние сетевые попытки

До установки live guard одна ошибочная integration-команда загрузила существующее dotenv-состояние. Mocked часть дала 228 passed и 1 skipped, после чего все восемь read-only live tests завершились `NetworkError`. Это не успешный WB runtime proof. Значения credentials не сохранялись и не сообщаются; повторный live-запуск не выполнялся.

## Rollback и независимый review

Локальная точка rollback — baseline `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`. Откат означает удаление только scoped candidate diff с сохранением чужого dirty state, `backlog/config.yml`, stash/worktrees и без broad reset/clean.

Independent composed review принял exact source candidate без findings; `TASK-219`, `TASK-224`, `TASK-226` и `TASK-231` закрыты `Done` через Backlog CLI. Corrected secret-scan review принял exact recovery без findings; `TASK-232` также закрыт `Done`. `TASK-209`, `TASK-214` и `TASK-223` остаются будущими задачами. Historical reviewer reports сохраняют исходные `REVIEW BLOCKED BEFORE FREEZE` и первый recovery `REQUEST CHANGES` как честные снимки процесса; принятые current reviews записаны отдельно в `backlog/docs/wb-api-news-2026-10-accepted-composed-review.md` и `backlog/docs/wb-api-news-2026-10-secret-scan-corrected-review.md`.

## Коррекция полноты staged candidate

Первоначальный freeze имел 219 paths, patch SHA-256 `4558edb0fb775a1003bf760dcd067607745361ac7c9a94b545f58c1152cfbf23` и tree `a66cc12c3ed9d967161530f4991fdf5b929fffd1`, но не включал шесть доказанных delivery records: NodeNext report, GTIN fixture report, Returns guide correction report, `TASK-231`, historical blocked review и сентябрьский source-of-record, на который ссылаются canonical SPEC и source coverage. Все шесть файлов force-added точными путями; candidate identity evidence также включено в индекс.

Коррекция меняет только delivery/evidence metadata. Build-input manifest сохранил 93 файла и SHA-256 `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367`; suites, build и network validators повторно не запускались. Повторно подтверждены exact SHA-256: EN Returns `ccb197db0fc8aa5118f72cbf526c317f6623e6fd2e6438743c2df6bf344f6bfa`, RU Returns `1dc39f19feaf0054acda133cbd33bf868f92cf0209cdafa33f69278e00e1a54e`, GTIN test `777d54262fbb06f2668074f2be6a41862f8b7b1abd048469b43fa897a777b20d`; сохранённый GTIN report фиксирует свежий результат 13/13.

## Локальный closeout

До административных изменений exact reviewed candidate имел 226 paths, patch SHA-256 `e6d29b2b957ea07f850a7d06c19f79aef1cb7bcf5f051f8839c4088b92201354` и tree `2c5e186e065f9eb3242b438ccdcadffae5b2d7c6`. После review менялись только task metadata, canonical memlog-derived delivery records, accepted-review report и closeout evidence. Все 93 build inputs повторно совпали с frozen manifest SHA-256 `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367`; полные suites и network validators не перезапускались, потому что source/build inputs не менялись.

`LOCAL_COMMIT_RECOVERY_ACCEPTED`

Маркер фиксирует текущую disposition: исторический первый hook failure и rejected unanchored recovery сохранены, а corrected exact-match recovery независимо принят. Ordinary hooks должны быть выполнены без bypass. Этот committed delivery record не встраивает неизвестный заранее SHA; authoritative identity задаётся Git commit object, содержащим файл. Push, npm publication, release и deploy не выполнялись. Защищённый foreign `backlog/config.yml` остаётся вне индекса с SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.

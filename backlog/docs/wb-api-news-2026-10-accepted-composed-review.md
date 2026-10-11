# Принятый составной review WB API news — октябрь 2026

**Дата:** 2026-10-11 (Europe/Moscow)

**Reviewer lane:** native `code-reviewer`, `WB_FINAL_REVIEW_ACTUAL_20261011_V2`

**Результат:** **ACCEPT**

**Release/runtime gate:** локальный кандидат принят; публикация и успешное live/sandbox runtime-доказательство остаются вне этого review

## Результат

Неизменяемая staged-композиция соответствует canonical `SPEC.md`, покрывает `CAP-1`–`CAP-11`, сохраняет совместимость пакета `4.6.0` и не содержит подтверждённых CRITICAL, HIGH, MEDIUM или LOW дефектов. Root-cause guard пройден: новое write-поведение sandbox DBS не маскирует ошибку и не уходит в альтернативный путь; зарегистрированный non-readonly `operationKey` запрещает автоматический повтор POST, а исходная ошибка остаётся видимой вызывающему коду.

Исторический отчёт `backlog/docs/wb-api-news-2026-10-final-review.md` с результатом `REVIEW BLOCKED BEFORE FREEZE` сохранён без изменения как снимок прежнего незавершённого состава. Этот документ проверяет уже исправленный полный index и не переписывает исторический вывод.

## Идентичность проверенного кандидата

| Поле | Проверенное значение |
|---|---|
| Baseline / HEAD | `6e8d6269140e3ae0a5aa5cb12ac714f457af4263` |
| Package version | `4.6.0` |
| Staged patch SHA-256 | `e6d29b2b957ea07f850a7d06c19f79aef1cb7bcf5f051f8839c4088b92201354` |
| Staged tree | `2c5e186e065f9eb3242b438ccdcadffae5b2d7c6` |
| Staged paths | `226` |
| Staged diff | `15,081` additions / `1,068` deletions |
| Protected foreign `backlog/config.yml` SHA-256 | `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9` |

Все candidate reads выполнялись из Git index (`git show :path`, cached diff). Непосредственно перед записью этого отчёта повторно подтверждены HEAD, версия, patch SHA-256, tree и hash защищённого файла. Единственный unstaged tracked path до записи отчёта — foreign `backlog/config.yml`; он отсутствует в staged candidate. Этот review report намеренно остаётся unstaged и не меняет приведённые staged patch/tree identities.

## Объём review

Проверены все 226 staged paths и полный cached diff, с углублённым чтением:

- canonical SPEC, source coverage, canonical memlog, final delivery, candidate/hash manifests и command-status manifest;
- `TASK-215`–`TASK-231`, а также неизменённые будущие `TASK-209` и `TASK-214`;
- 19 production source files: публичные типы/exports, Products, Analytics, Returns, Reports, Promotion, Orders DBS, retry integration, operation metadata и rate limits;
- NodeNext declaration transform, Vite hook, package validator, пять package exports и persistent packed-consumer fixtures;
- 21 test/fixture paths, включая focused contract, retry, OpenAPI, package and live-selection coverage;
- root/sharded/raw OpenAPI copies, generated TypeDoc, EN/RU guides, changelog и evidence reports;
- staged added-line patterns for secrets, empty catches, debug output, silent defaults, broad fallback branches and TODO/FIXME bypasses.

## Stage 1 — соответствие спецификации

| Capability | Проверенный результат | Verdict |
|---|---|---|
| `CAP-1` | Три Sales Funnel v3 операции и два history CSV контракта документируют двухчасовую свежесть с 2026-09-24; Order Feed ограничен заказами/выкупами, limiter не подменён freshness-семантикой. | PASS |
| `CAP-2` | Три Finance-поля согласованы с required non-null raw OpenAPI; public TypeScript optionality ограничена документированной selective `fields` projection. | PASS |
| `CAP-3` | Три Products directory метода, fixed host/routes, параметры, responses, locale/search границы, limiter keys, metadata, OpenAPI, docs и tests согласованы; raw `ru` против rendered `ru,en` сохранён как конфликт без runtime-утверждения. | PASS |
| `CAP-4` | Ровно пять percentile-колонок удалены только из TEXT CSV fixture/contract; GROUP, PRODUCT и одноимённые JSON surfaces сохранены. | PASS |
| `CAP-5` | `gtin?: string` присутствует в четырёх точных card placements; distinct current SKU fixture и one-of-the-seller-listings rule сохранены без придуманной account-history проверки. | PASS |
| `CAP-6` | Region-sale остаётся вызываемым в 4.x, имеет dated deprecation и стабильный warn-once key; EN/RU migration examples используют page-by-page aggregation, snapshot pagination и offset guard, не обещая semantic equivalence. | PASS |
| `CAP-7` | DBS `orders` допускает `null`; оба phone fields — optional non-null string arrays; public exports, OpenAPI, declarations, docs и synthetic tests согласованы. | PASS |
| `CAP-8` | Пять Search Queries API surfaces и три CSV variants документируют двухчасовую свежесть с 2026-10-12 как freshness, а не request limit. | PASS |
| `CAP-9` | `ordersDBS.createTestOrders()` использует только fixed sandbox host/route, сохраняет omission, проверяет видимые bounds, использует отдельный 1 req/s limiter и не повторяет write автоматически. Hidden raw flags и runtime остаются явно недоказанными. | PASS |
| `CAP-10` | Returns последовательно получает active/archive pages с `limit: 1000`, делает terminal empty request после полной страницы, трактует 204 как empty, отображает `sku`/status/reason, даёт archive precedence и отклоняет equal dates до source call. Existing all-or-nothing FBO partial-failure policy сохранена и протестирована. | PASS |
| `CAP-11` | Девять октябрьских новостей, Returns migration, residual tasks, шестнадцать сентябрьских строк, package/NodeNext proof и English Products parity прослеживаются до tasks и evidence с явным разделением source, mocked, package, failed network и absent live proof. | PASS |

Canonical SPEC определяет ровно одиннадцать стабильных capability IDs в `_bmad-output/specs/spec-wb-api-news-2026-10/SPEC.md:19`–`51`, а constraints и success signal сохраняют offline/live границы в строках `53`–`75`.

## Acceptance criteria и task hygiene

- `TASK-215`–`TASK-218`, `TASK-220`–`TASK-222`, `TASK-225`, `TASK-227`–`TASK-230`: `Done`, все AC checked, Implementation Notes присутствуют.
- `TASK-219`, `TASK-224`, `TASK-226`, `TASK-231`: все AC checked и evidence complete; статус намеренно `In Progress` только до принятия этой independent composed review.
- `TASK-223`: `To Do`, AC unchecked; это корректно отложенная breaking removal для v5.
- `TASK-209` и `TASK-214`: неизменённые будущие v5 removals, не входят в реализуемую часть этого кандидата.

Review не менял task statuses: разрешённая мутация ограничена этим отчётом. После `ACCEPT` владелец integration/delivery может выполнить предусмотренный Backlog transition для четырёх review-gated задач, не меняя проверенный source candidate.

## Root-cause и fallback guard

Guard пройден.

- `src/modules/orders-dbs/index.ts:124`–`136` передаёт стабильный `ordersDBS.createTestOrders` operation key в единственный fixed-host POST.
- `src/config/operation-metadata.ts:1136`–`1144` регистрирует эту операцию как `readonly: false`.
- `src/client/base-client.ts:224`–`253` передаёт operation metadata в существующий retry handler без catch-and-default поведения.
- `src/client/retry-handler.ts:414`–`450` отклоняет retry зарегистрированного write до проверки transient error classes и затем повторно выбрасывает исходную ошибку.
- Mocked 503 coverage доказывает один POST; нет silent success, swallowed error, duplicate alternate execution path или feature gate, скрывающего defect.

Существующие permissive branches внутри отдельно opt-in live smoke file не добавлены как исправление продукта и не выполняются default integration runner. Новый exact flag guard расположен до dynamic imports, dotenv, env read, client construction и request (`tests/integration/api.test.ts:3`–`38`; `vitest.integration.config.ts:15`–`35`).

## Stage 2 — качество, безопасность и производительность

### Production contracts

- Products directory methods используют три distinct limiter keys, official fixed Content host и public request/response types. Full OKPD2 намеренно следует raw `locale: 'ru'` и numeric `search`; документация не выдаёт это за runtime rejection.
- Finance optionality не размывает raw OpenAPI: exact requiredness остаётся в spec, а TypeScript projection exception объяснён в типе и документации.
- Sandbox order validation вводит только видимые ограничения: 1–10 orders, integer amount, maximum 10. Не добавлены недоказанные minimum, SKU pattern/length, default injection или production routing.
- Returns pagination последовательна в пределах 1/minute limiter и не создаёт unbounded concurrency. Exact full pages завершаются дополнительным пустым запросом; поздняя archive запись заменяет active duplicate в стабильной позиции.
- Region migration агрегирует страницу сразу и не накапливает весь Order Feed в памяти.

### Packaging and NodeNext

- `scripts/node-next-declarations.ts:14`–`40` распознаёт import/export, import-equals и import-type specifiers через TypeScript AST.
- `scripts/node-next-declarations.ts:42`–`88` меняет только relative extensionless specifiers, сохраняет package imports/comments/explicit runtime extensions и fail-closed отклоняет unresolved target.
- `scripts/node-next-declarations.ts:90`–`113` классифицирует target по source file либо directory `index`, не угадывая emitted path.
- `vite.config.ts:22`–`37` применяет transform через supported `vite-plugin-dts.beforeWriteFile`; ручного post-build patching `dist` нет.
- `scripts/validate-package-exports.mjs:76`–`115` строго разбирает обе наблюдавшиеся формы npm manifest и проверяет каждый `files[]` member.
- `scripts/validate-package-exports.mjs:149`–`258` pack/extract-ит настоящий tarball, проверяет наличие import/require/types targets, компилирует persistent `.mts`/`.cts` consumers с strict NodeNext и `skipLibCheck false`, требует точную locale-negative diagnostic, выполняет import/require smoke и всегда удаляет temporary directory.
- Symlink `axios` в isolated consumer (`scripts/validate-package-exports.mjs:194`–`200`) соответствует объявленной runtime dependency `package.json:124`–`127`; он не скрывает отсутствующий package export или declaration target. Текущий manifest явно содержит `axios` в `dependencies`.
- Все пять exports из `package.json:21`–`47` имеют types/import/require targets и constructor assertions.

### Security and privacy

Staged added-line scan не обнаружил hardcoded credential, private key, JWT, literal Bearer token, empty catch или suppressed exception. Три secret-like значения — явно синтетические placeholders в JSDoc/tests (`caller-provided-test-scope-token`, `synthetic-test-token`). Телефонные примеры синтетические; реальные customer rows и credential values отсутствуют. Review не читал environment values и не выполнял network, seller или sandbox calls.

### Canonical SPEC provenance

`.memlog.md` называет memlog canonical и последовательно фиксирует re-derivation и self-validation после material deltas: sandbox/source updates (`.memlog.md:74`–`76`, `90`–`98`), NodeNext/English parity (`99`–`107`) и final verification (`108`–`112`). `SPEC.md` и `source-coverage.md` согласованы с этими записями и staged implementation.

Репозиторные файлы доказывают заявленную последовательность записей и итоговую согласованность. Они не являются криптографическим доказательством того, каким конкретно генератором был записан каждый байт, и не позволяют доказать отсутствие любого ручного редактирования вне Git history. В staged evidence нет утверждения или противоречия, которое доказывало бы запрещённую manual canonical edit; поэтому process finding не создаётся.

## Findings по severity

| Severity | Count |
|---|---:|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 0 |
| LOW | 0 |

Подтверждённых code/spec/security findings нет. Runtime/evidence limits ниже не являются source defects и не переоценены как findings.

## Проверка и границы доказательства

Reviewer не повторял exhaustive suites после freeze, поскольку task contract запрещал такой rerun. Проверены exact staged logs и command/status manifest; каждый pipeline с `tee` записан с `pipefail`, а manifest содержит exit `0`:

- full default suite: 90 files, 2,580 passed, 1 skipped;
- mocked integration: 13 files, 228 passed, 1 skipped;
- default integration list: 13 mocked files, live file absent;
- exact live static list: только `tests/integration/api.test.ts`, без выполнения;
- NodeNext/package focused tests: 19/19;
- global type-check, global lint, configured format check и targeted strict diagnostics;
- build: 115 Vite modules;
- actual package: 193 files, five exports, strict NodeNext ESM/CJS type consumers, locale-negative contract и runtime import/require;
- declaration scan: 81 files, 200 relative specifiers, 152 file targets, 48 `/index.js` targets, 0 unsafe extensionless specifiers;
- TypeDoc validation, 50-file/380-example static validation, English fences 2/2, 1,633 Markdown files/192 links/0 broken, shards 61/61 и isolated VitePress build.

Native `lsp_diagnostics` и `ast_grep_search` tools отсутствовали в reviewer environment. Это ограничение не скрыто: type safety и static diagnostics подтверждены staged global TypeScript/ESLint logs и отдельным targeted helper/config diagnostic log; risky-pattern checks выполнены bounded cached-diff searches. Нативный LSP invocation не заявляется.

Fresh reviewer checks подтвердили candidate identity, index/worktree separation, staged secret/fallback patterns и полный cached whitespace result. Финальный `git diff --cached --check` имеет exit `2` только из-за сохранённых Markdown hard-break trailing spaces и final blank line в historical evidence:

- `backlog/docs/wb-api-news-2026-10-final-review.md:3`–`7`, `225`;
- `backlog/docs/wb-api-news-2026-10-gtin-fixture-fix.md:3`–`5`.

Scoped administrative cached check для добавленных при completeness correction файлов завершился exit `0`. Указанные bytes намеренно сохранены; это косметическое ограничение evidence files, а не runtime/type/security defect.

Следующие утверждения остаются недоказанными и не требуются для локального `ACCEPT`:

- успешный live WB seller call;
- успешное создание sandbox DBS order;
- server-side sandbox default, фактический HTTP 204 и limiter enforcement;
- hidden raw sandbox required/nullability flags;
- runtime rejection full-OKPD2 `locale: 'en'`;
- удалённое принятие historical GTIN;
- publish, release, deploy, version bump, commit или push.

Восемь ранних read-only live attempts завершились `NetworkError`; они остаются failed network evidence и не представлены как runtime proof. Package runtime smoke доказывает разрешение import/require пяти exports, но не создаёт SDK и не вызывает WB API. Examples validation является static regex validation, а English fixture — compile-only evidence.

## Architecture handoff

Архитектурного blocker, требующего изменить code/spec/security verdict, не обнаружено. Placement sandbox method в `ordersDBS`, отдельный limiter category и public `operationKey` являются явными решениями canonical SPEC/tasks и покрыты contract/retry tests. Остающийся внешний design question — будущая raw sandbox schema и её hidden required/nullability/default semantics — уже записан как evidence boundary, а не закрыт предположением. Если raw contract появится, его следует рассматривать как отдельную contract-reconciliation задачу.

## Recommendation

**ACCEPT.** Проверенный локальный staged candidate удовлетворяет заявленной спецификации и review gate. Нет CRITICAL/HIGH/MEDIUM/LOW finding, требующего изменения frozen source composition. Integration owner может закрыть review-gated `TASK-219`, `TASK-224`, `TASK-226` и `TASK-231` по Backlog workflow и продолжить отдельный guarded delivery процесс, сохранив указанные runtime и publication gates.

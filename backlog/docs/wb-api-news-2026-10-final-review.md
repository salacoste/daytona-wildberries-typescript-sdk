# Финальный составной review WB API news — кандидат не был передан на review

**Дата:** 2026-10-11 (Europe/Moscow)  
**Reviewer:** один native `code-reviewer`, task `final_composed_review`  
**Baseline / текущий HEAD:** `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`  
**Результат:** `REVIEW BLOCKED BEFORE FREEZE`  
**Локальный code verdict:** **НЕ ВЫНЕСЕН** — отсутствует неизменяемый полный кандидат  
**Release gate:** **BLOCKED**

## Граница этого отчёта

Это один новый составной review-lane. Ранее выполненные Products/Analytics blind,
edge, verification и acceptance reviews, а также core review являются историческим
контекстом. Они не считаются новыми слоями этого review.

Финальный review не был подменён анализом промежуточного дерева. Интеграционный
executor завершился до формирования полного staged-кандидата и до обновления
финального delivery report. Поэтому в этом документе нет утверждений `ACCEPT` или
`REQUEST CHANGES` о корректности исходного кода: такое утверждение сертифицировало
бы состав, которого в Git index не существует.

## Почему freeze не выполнен

[HIGH] **Финальный delivery report описывает прежнее состояние и противоречит уже
созданной sandbox-реализации.**

- Файл: `backlog/docs/wb-api-news-2026-10-final-delivery.md:5`
- Файл: `backlog/docs/wb-api-news-2026-10-final-delivery.md:7`
- Файл: `backlog/docs/wb-api-news-2026-10-final-delivery.md:26`
- Файл: `backlog/docs/wb-api-news-2026-10-final-delivery.md:44`
- Файл: `backlog/docs/wb-api-news-2026-10-final-delivery.md:56`
- Противоположное свежее свидетельство:
  `backlog/docs/wb-api-sandbox-delivery-type-implementation-2026-10.md:190`

Delivery report всё ещё заявляет восемь объявлений, отсутствие sandbox-кода и
неизвестный контракт `deliveryType`. Sandbox lane уже записал реализацию, проверки,
manifest хешей и `SOURCE_FROZEN`. В delivery report отсутствует маркер
`READY_FOR_COMPOSED_REVIEW` либо эквивалентное однозначное заявление, что полный
состав staged и больше не меняется.

**Влияние:** reviewer не может определить, какой из двух несовместимых наборов
утверждений является финальным, а hash staged patch не включает весь реализованный
контракт.

**Исправление:** владелец финальной интеграции должен принять sandbox handoff,
обновить canonical spec/source coverage/task matrix/final delivery report, выполнить
свежую глобальную офлайн-проверку после source freeze и stage-нуть точный полный
набор owned-файлов. После этого требуется новый freeze и полноценный composed review.

## Диагностический снимок незавершённого состава

Снимок создан в
`/tmp/wb-sdk-final-review-blocked-20261011-213636`. Это **не reviewed freeze** и его
hash нельзя использовать как подтверждение кода.

| Поле | Значение |
|---|---|
| Baseline | `6e8d6269140e3ae0a5aa5cb12ac714f457af4263` |
| HEAD | `6e8d6269140e3ae0a5aa5cb12ac714f457af4263` |
| Неполный staged patch | `/tmp/wb-sdk-final-review-blocked-20261011-213636/incomplete-staged.patch` |
| SHA-256 неполного staged patch | `96d620e83f5ec85734d055152720ed57fed962647f0c008a988ea4e60c342228` |
| Размер неполного staged patch | `811540` bytes |
| Staged paths без foreign config и этого report | `121` |
| Unstaged tracked paths без foreign config | `39` |
| Untracked owned paths | `23` |
| `backlog/config.yml` SHA-256 | `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9` |

Защищённый `backlog/config.yml` сохранил требуемый SHA-256. Он исключён из
диагностического patch. Этот review report также исключён из patch.

### Незастейдженные изменения, которые делают staged patch неполным

Среди 39 tracked paths, имеющих unstaged delta:

- `src/client/base-client.ts`;
- `src/config/operation-metadata.ts`;
- `src/config/rate-limits.ts`;
- `src/config/sdk-config.ts`;
- `src/index.ts`;
- `src/modules/orders-dbs/index.ts`;
- `src/types/orders-dbs.types.ts`;
- `tests/unit/config/operation-metadata.test.ts`;
- `tests/unit/modules/orders-dbs.test.ts`;
- root/shard/raw DBS OpenAPI;
- EN/RU DBS guides;
- generated TypeDoc pages;
- `TASK-224` и `TASK-226`.

Среди 23 untracked owned paths:

- `src/config/sandbox-dbs-rate-limits.ts`;
- `tests/unit/config/sandbox-dbs-rate-limits.test.ts`;
- `tests/unit/modules/orders-dbs-openapi-contract.test.ts`;
- `tests/unit/modules/orders-dbs-sandbox.test.ts`;
- `wildberries_api_doc/04-orders-dbs/sandbox-dbs.yaml`;
- новые generated API pages для Products, Returns, FBS и публичных DBS типов.

Полные списки сохранены в `unstaged-name-status.txt` и `untracked.txt` внутри
диагностического каталога.

## Stage 1 — соответствие спецификации

**Не выполнен для финального кандидата.** Причина — финальный кандидат не был
сформирован. Проверять 11 capability IDs, derived SPEC, source coverage и все
acceptance criteria по смеси staged, unstaged и untracked файлов означало бы
проверять состав, который нельзя воспроизвести через `git diff --cached`.

Следующие обязательные пункты поэтому не сертифицированы этим отчётом:

- ровно 11 стабильных `CAP-*` IDs и вывод `SPEC.md`/`source-coverage.md` из
  `.memlog.md`;
- финальная фиксация прямых raw Products/Finance/DBS источников;
- сохранение конфликта raw `ru` против rendered `ru,en` для OKPD all locale;
- точная граница rendered sandbox evidence, отсутствующего raw sandbox YAML и
  отсутствующего runtime proof;
- согласованность task statuses и delivery report с фактически включённым кодом;
- отсутствие ложного `production-ready` либо release-утверждения.

## Root-cause / fallback guard

Финальный root-cause verdict не вынесен. Предварительно реализованный
`RequestOptions.operationKey` и non-readonly metadata для sandbox POST выглядят как
узкое исправление основного retry-контракта: ошибка 503 остаётся видимой, а повторный
неидемпотентный POST не скрывается альтернативным путём. Однако relevant source и
tests находятся вне полного staged patch, поэтому reviewer не сертифицирует эту
оценку до нового freeze.

Маскирующий fallback, silent default или broad alternate path не были приняты этим
отчётом. Отсутствие финального вердикта не означает одобрение такого поведения.

## Исторические findings

Исторические dispositions не повышены до статуса свежей сертификации. Их состояние
для следующего review:

| Область | Последнее доступное состояние | Статус в этом review |
|---|---|---|
| Products metadata: три readonly/content/key операции и safe GET retry | предварительно исправлено в прежнем frozen candidate | не пересертифицировано |
| Products exact 54 limits и публичные directory exports/OpenAPI | предварительно исправлено | не пересертифицировано |
| Четыре optional non-null GTIN placement | подтверждены прямым raw OAS | не пересертифицировано в финальном patch |
| GTIN unit fixture с одинаковым `gtin` и текущим `sizes[].skus` | предварительный MEDIUM finding | финальное состояние не установлено |
| Восемь freshness descriptions и пять TEXT CSV колонок | предварительно исправлено | не пересертифицировано |
| Returns same-date reject, archive precedence, pagination, 204, mapping, partial policy и 1/minute budget | предварительно исправлено и покрыто tests | не пересертифицировано |
| EN/RU Returns guides с формулировкой `dateTo >= dateFrom` | предварительный MEDIUM finding | финальное состояние не установлено |
| Package manifest: обе outer forms и indexed invalid-member diagnostics | предварительно исправлено | не пересертифицировано |
| DBS public type exports | предварительно исправлено; generated docs сейчас частично unstaged/untracked | не пересертифицировано |
| Streaming Order Feed migration | предварительно исправлено | не пересертифицировано |
| Finance optional projection | признана намеренной совместимой моделью | не пересертифицировано |
| FBS waybill parity и CPM/CPC JSDoc | предварительно исправлено | не пересертифицировано |
| Live-test guard до dotenv/env/client/request | предварительно исправлено | не пересертифицировано |
| Sandbox DBS request/types/host/retry/rate/OpenAPI | sandbox lane сообщил 93/93 и 195/195 focused tests | не вошло в полный staged candidate |

Здесь намеренно нет новых source-code findings с severity: без финального freeze
нельзя надёжно отличить дефект от уже исправленного либо ещё не включённого delta.
Единственный HIGH выше относится к готовности и воспроизводимости delivery-кандидата,
а не к доказанному runtime-дефекту SDK.

## Privacy и secrets

Для текущего смешанного дерева выполнен только диагностический added-content scan;
это не заменяет повторный scan финального patch.

- private key, Bearer literal, JWT-like token и tokenized URL: совпадений нет;
- 11 phone-like совпадений относятся к синтетическим примерам/tests/OpenAPI;
- два secret-assignment совпадения относятся к явным test/placeholder значениям;
- значения секретов, телефонов и токенов в отчёт не выводились;
- credential/env/live/sandbox запросы не выполнялись.

Артефакт без значений:
`/tmp/wb-sdk-final-review-blocked-20261011-213636/privacy-scan.txt`.

## Validation status

Sandbox handoff сообщает следующие свежие scoped результаты до своего
`SOURCE_FROZEN`: 93/93 targeted tests, 195/195 affected tests, type-check, scoped
lint/format, shards 61/61, build и package validation — exit 0. Эти результаты
являются доказательством sandbox lane, но не глобальной проверкой итоговой композиции.

Для финальной композиции:

- полный suite после sandbox source freeze: **NOT RUN / не зафиксирован**;
- mocked integration после source freeze: **NOT RUN / не зафиксирован**;
- global type-check/lint/format/build после окончательного compose: **NOT RUN / не зафиксирован**;
- package/declaration/packed-consumer checks после окончательного compose: **NOT RUN / не зафиксирован**;
- docs validation/examples/links/shards/VitePress build после окончательного compose: **NOT RUN / не зафиксирован**;
- LSP diagnostics по финальным modified files: **NOT RUN** — инструмент LSP в этой
  reviewer-сессии недоступен, а заменяющий финальный type-check не состоялся;
- live seller/sandbox runtime calls: **NOT RUN**;
- commit, push, publish, release, deploy: **NOT RUN**.

Ранее выполненные восемь сетевых попыток завершились `NetworkError` и не являются
успешным runtime proof.

## Вердикты и stop condition

### Локальный код

**VERDICT NOT ISSUED.** Ни `ACCEPT`, ни `REQUEST CHANGES` к локальной реализации не
выносится, потому что integration executor завершился без полного staged-ready
кандидата. Это процессуальный blocker, а не выдуманный source-code defect.

### Release gate

**BLOCKED.** Даже после формирования локального кандидата отдельно остаются runtime
gates: успешные seller/sandbox вызовы не выполнялись, sandbox raw YAML отсутствует,
а rendered/raw locale conflict должен оставаться явно задокументирован. Прямые raw
Products/Finance/DBS контракты доступны, но stale delivery report ещё не отражает
их финальное disposition.

### Условие повторного review

Новый composed review можно начинать только после одновременного выполнения всех
условий:

1. final delivery report обновлён после sandbox `SOURCE_FROZEN` и содержит явный
   staged-ready marker;
2. все owned source/tests/OpenAPI/docs/spec/task/generated files staged;
3. отсутствуют relevant unstaged и untracked owned files;
4. `backlog/config.yml` сохраняет SHA-256
   `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`;
5. свежая глобальная офлайн-проверка выполнена после последнего source change;
6. новый exact patch, per-path hashes и frozen tar созданы и проверены;
7. reviewer проверяет именно этот hash и после записи отчёта повторно подтверждает,
   что исключённый review report был единственным post-freeze изменением.


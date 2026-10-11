# Acceptance Auditor — WB API Products / Analytics, 2026-10

## Результат

**Вердикт: REQUEST CHANGES.** Замороженный срез не подтверждает выполнение всех заявленных acceptance criteria и содержит три блокирующих несоответствия высокой серьёзности и два несоответствия средней серьёзности.

| Серьёзность | Количество |
| --- | ---: |
| CRITICAL | 0 |
| HIGH | 3 |
| MEDIUM | 2 |
| LOW | 0 |

## Идентичность проверенного среза

- Diff: `/tmp/wbpa-review-snapshot-20261011-f8B7ee/products-analytics-review.diff`
- Baseline: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`
- SHA-256 diff: `c5c532df0c16a0db613965cf9d6eac2dcbe2bfdf01b0f793f456f2b3646b9cf8`
- Изменённых файлов в diff: `39`
- Заявления проверяемого среза: `/tmp/wbpa-review-snapshot-20261011-f8B7ee/claims-verbatim.txt`

Проверка ограничена CAP-1, CAP-3, CAP-4, CAP-5 и CAP-8 и соответствующими задачами Backlog 217, 219, 220, 221 и 225. Источниками требований служили `_bmad-output/specs/spec-wb-api-news-2026-10/SPEC.md`, `_bmad-output/specs/spec-wb-api-news-2026-10/source-coverage.md` и указанные задачи Backlog. Выводы относятся только к замороженному diff. Более поздние изменения текущего рабочего дерева, включая исправление количества Products limiter keys с 51 до 54, JSDoc для Returns в `src/index.ts`, FBS waybill OpenAPI, CPC JSDoc и финальные метаданные задач, в этот срез не входят и настоящим отчётом не валидируются.

## Findings

### [HIGH] Products exact-contract AC отмечены выполненными без требуемого официального источника

**Нарушенные AC и ограничения**

- `SPEC.md:55`: существенные контракты должны быть определены по официальной документации WB или выбранной официальной ревизии OpenAPI до изменения кода.
- TASK-219, AC 1.
- TASK-221, AC 1.

**Доказательства**

- В frozen diff строки 204 и 314 отмечают оба AC об официальном подтверждении как выполненные.
- В строках 227 и 337 того же diff зафиксировано, что прямое чтение документации WB вернуло HTTP 498, а точные поля были сверены с `eslazarev/wildberries-sdk@ed543...`.
- `backlog/docs/wb-api-news-2026-10-official-contracts.md:10` подтверждает HTTP 498 при прямом получении официального источника.
- `backlog/docs/wb-api-news-2026-10-official-contracts.md:14-21` прямо квалифицирует pinned snapshot как supplemental, не authoritative и не официальную публикацию WB.
- Контракты directory в `backlog/docs/wb-api-news-2026-10-official-contracts.md:78-88` и GTIN в строках 113-126 выведены из этого supplemental snapshot.
- `backlog/docs/wb-api-products-delivery-2026-10.md:46-57` повторяет, что snapshot является дополнительным и неофициальным источником.

**Влияние**

Точные request/response schemas, rate limits и GTIN contracts представлены как официально подтверждённые, хотя доступное доказательство этого не устанавливает. Это нарушает источник истины, требуемый спецификацией, и делает публичный контракт преждевременным.

**Как исправить**

1. Снять отметку выполнения TASK-219 AC 1 и TASK-221 AC 1.
2. Считать точные контракты provisional и блокировать публичный release до фиксации непосредственно полученной официальной ревизии WB OpenAPI.
3. После получения официального источника сверить с ним types, local OpenAPI, limiter metadata, declarations, документацию и тесты.
4. Не переквалифицировать сторонний snapshot в официальный источник.

### [HIGH] Frozen Products limiter change оставляет существующий repository test несогласованным

**Нарушенные AC и ограничения**

- TASK-219, AC 4 и AC 5.
- `SPEC.md:59`: согласованность всех затронутых поверхностей.
- Заявление среза о прохождении затронутых тестов.

**Доказательства**

- Frozen diff строки 1250-1264 добавляет три limiter keys.
- Baseline blob `6e8d6269140e3ae0a5aa5cb12ac714f457af4263:tests/unit/config/products-rate-limits.test.ts:245` ожидает ровно 51 ключ.
- В frozen 39-file diff отсутствует изменение `tests/unit/config/products-rate-limits.test.ts`.
- `backlog/docs/wb-api-products-delivery-2026-10.md:91-92` показывает, что перечисленные Products test commands не включали этот config test.
- В текущем рабочем дереве существует более позднее исправление ожидания до 54 ключей, но оно явно находится вне frozen diff и потому не подтверждает проверяемый срез.

**Влияние**

Замороженный срез меняет production metadata без синхронизации теста полноты. Заявление о зелёной проверке затронутого поведения не подтверждено самим срезом.

**Как исправить**

1. Включить исправление limiter completeness test в проверяемый snapshot.
2. Добавить все три новых ключа в standard-tier expected list и проверять точный полный набор из 54 ключей.
3. Запустить focused config test и сохранить результат как доказательство.
4. Более позднее исправление рабочего дерева валидировать отдельным новым review snapshot.

### [HIGH] Английский Analytics OpenAPI одновременно заявляет двухчасовую и часовую периодичность

**Нарушенные AC и ограничения**

- CAP-1 и TASK-217, AC 1.
- CAP-8 и TASK-225, AC 2 и AC 5.
- `SPEC.md:59`: согласованность затронутых поверхностей.

**Доказательства**

- Frozen diff строки 682, 690 и 698 добавляют двухчасовую периодичность для трёх Sales Funnel operations, но строка 685 показывает сохранённое утверждение об обновлении раз в час.
- Frozen diff строки 732, 740, 748, 756 и 764 добавляют двухчасовую периодичность для пяти Search Queries operations, не удаляя старые часовые утверждения.
- В соответствующей рабочей копии этих frozen hunks `docs/api-reference/raw-yaml/11-analytics.yaml:37` говорит о двух часах, а строка 40 — об одном часе.
- Противоречия Sales Funnel повторяются в строках 117/121 и 182/187.
- Противоречия Search Queries находятся в строках 909/925, 986/994, 1055/1067, 1128/1137 и 1198/1205.

**Влияние**

Все восемь API surfaces из CAP-1 и CAP-8 содержат взаимоисключающие пользовательские обещания о freshness. Потребитель SDK не может определить фактическую периодичность обновления данных.

**Как исправить**

1. Удалить или исправить устаревшие часовые формулировки для этих восьми operations в English raw OpenAPI.
2. Сохранить request-limit tables без изменений.
3. Добавить статическую regression-проверку: описания затронутых operations должны содержать новую периодичность и не содержать старую часовую формулировку.
4. Не менять часовые формулировки у операций вне CAP-1 и CAP-8.

### [MEDIUM] GTIN examples визуально закрепляют reuse в той же карточке вопреки cross-listing/history правилу

**Нарушенные AC и ограничения**

- CAP-5.
- TASK-221, AC 3 и AC 4.
- Уточнение исходной новости: GTIN мог ранее присутствовать в `skus` одной из карточек продавца; правило не ограничено той же карточкой.

**Доказательства**

- Frozen diff строки 1017-1025 и 1219-1227 показывают EN/RU examples, где один и тот же `04600000000018` одновременно указан в `gtin` и в `sizes: [{ skus: ['04600000000018'] }]` нового payload для `createCardsUpload()`.
- Следующий за примерами текст в строках 1028-1030 и 1230-1233 корректно объясняет, что значение должно ранее встречаться в `skus` одной из карточек продавца и не обязано относиться к той же карточке.
- Те же примеры находятся в `docs/modules/products.md:493-506` и `docs/ru/guides/working-with-product-cards.md:920-935`.

**Влияние**

Кодовый пример визуально противоречит правильному пояснению и может привести читателя к ошибочному выводу, что prerequisite подтверждается повторением GTIN в `skus` того же нового payload.

**Как исправить**

Показать `gtin` как значение из ранее существовавшей карточки продавца. Не повторять это значение в `sizes[].skus` того же нового payload либо явно отметить, что prerequisite был выполнен другой существующей карточкой. Сохранить server-side enforcement и не добавлять локальную проверку истории.

### [MEDIUM] TASK-219 объявляет release-note coverage выполненным без изменения установленного release-note artifact

**Нарушенный AC**

- TASK-219, AC 5.

**Доказательства**

- Frozen diff строка 208 отмечает как выполненное требование, что EN/RU product documentation и release notes описывают intended use.
- В inventory из 39 файлов нет изменений установленного `CHANGELOG.md` или `RELEASE_NOTES_v1.0.md`.
- Единственный release-adjacent новый документ — внутренний русскоязычный evidence report `backlog/docs/wb-api-products-delivery-2026-10.md`.

**Влияние**

Пользовательская release-note поверхность не сообщает о трёх новых directory methods и правилах их использования, хотя AC отмечен выполненным.

**Как исправить**

Добавить три directory methods и краткое описание intended use/migration в установленную release-note поверхность либо оставить AC 5 незавершённым и явно обосновать, почему внутренний delivery report является требуемым release-note artifact.

## Проверенные границы и принятые решения

- CAP-4 в frozen diff ограничен корректно: удалены только пять percentile columns из TEXT CSV; GROUP/PRODUCT fixtures сохранены; JSON percentile fields не затронуты; SDK корректно сообщает, что возвращает `ArrayBuffer` и не содержит встроенного CSV row parser.
- CAP-5 размещает поле согласованно в create, update, add и list contracts.
- GTIN prose корректно говорит об одной из карточек продавца, не требует ту же карточку и оставляет historical enforcement стороне WB.
- CAP-1/CAP-8 не изменяют Analytics rate-limit configuration.
- Несоответствие numeric schema для `okpd/all` и dotted-prefix prose документировано как намеренное и не является finding этого review.
- Core/sandbox capabilities вне CAP-1, CAP-3, CAP-4, CAP-5 и CAP-8 находятся вне review target и не считаются пропущенной реализацией.
- Незавершённые task metadata для 217, 220 и 225 рассматриваются как граница frozen evidence: их финализация выполняется параллельно и не входит в проверяемый snapshot.

## Ограничения доказательств

- В этом Acceptance Auditor layer не запускались tests, builds, lint, LSP diagnostics, live WB calls или external retrieval — это прямо исключено заданным scope.
- Review основан на frozen diff, baseline blobs, локальных SPEC/source-coverage/task документах и существующих репозиторных evidence documents.
- Текущая интеграционная рабочая копия изменяется другим исполнителем. Настоящий отчёт не подтверждает её состояние и не включает её поздние исправления.
- Прямой официальный WB contract source оставался недоступен с HTTP 498; сторонний pinned snapshot использован только как supplemental evidence.

## Заявление о мутациях

В рамках этого независимого слоя исходный код, тесты, task files, shared configuration, Git state и остальные документы не изменялись. Создан только этот evidence report: `backlog/docs/wb-api-products-analytics-acceptance-review-2026-10.md`.

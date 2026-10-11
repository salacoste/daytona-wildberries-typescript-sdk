# Products operation metadata fix — 2026-10

## Результат

HIGH finding из `wb-api-products-analytics-blind-review-2026-10.md` закрыт в текущем рабочем дереве для ровно трёх операций:

| Operation key | `readonly` | `category` | `rateLimitKey` |
| --- | ---: | --- | --- |
| `products.getDirectoryTnvedAll` | `true` | `content` | `products.contentDirectoryTnvedAll` |
| `products.getDirectoryOkpd` | `true` | `content` | `products.contentDirectoryOkpd` |
| `products.getDirectoryOkpdAll` | `true` | `content` | `products.contentDirectoryOkpdAll` |

Это соответствует пункту 7 существующего Implementation Plan task 219: добавить три read-only Products directory entries в operation metadata и проверить полный helper contract и operation-key-aware transient retry.

Перед первой записью этого executor рабочее дерево уже содержало точные изменения в `src/config/operation-metadata.ts`, `tests/unit/config/operation-metadata.test.ts` и integration-owned `tests/unit/client/retry-handler.test.ts`. Поэтому существующие изменения не перезаписывались. Проверка подтвердила:

- `getOperationMetadata()` возвращает полный трёхполевой объект для каждого ключа;
- `isOperationReadonly()` возвращает `true`;
- `getOperationCategory()` возвращает `content`;
- `getOperationRateLimitKey()` возвращает соответствующий Products limiter key;
- публичный `RetryHandler.executeWithRetry()` без `forceRetry` повторяет transient `NetworkError` с HTTP 503 и успешно возвращает результат второй попытки для каждого из трёх `operationKey`.

`OperationMetadata` содержит только поля `readonly`, `category` и `rateLimitKey`; дополнительные tags или зависимости для directory pattern не требуются и не добавлялись. Другие metadata entries не менялись.

## Проверка

- `npx vitest run tests/unit/config/operation-metadata.test.ts tests/unit/client/retry-handler.test.ts` — exit 0; 2 files passed, 108 tests passed.
- `npx vitest run tests/unit/config/operation-metadata.test.ts tests/unit/client/retry-handler.test.ts -t 'registers .* as a read-only Content operation|should retry transient failures for read-only operation key' --reporter=verbose` — exit 0; 6 focused tests passed: metadata and retry cases for all three operation keys.
- `npx eslint src/config/operation-metadata.ts tests/unit/config/operation-metadata.test.ts tests/unit/client/retry-handler.test.ts` — exit 0.
- `npx prettier --check src/config/operation-metadata.ts tests/unit/config/operation-metadata.test.ts tests/unit/client/retry-handler.test.ts` — exit 0; all matched files use Prettier style.
- `npm run type-check` — exit 0; `tsc --noEmit` passed.
- `git diff --check -- src/config/operation-metadata.ts tests/unit/config/operation-metadata.test.ts tests/unit/client/retry-handler.test.ts` — exit 0.

## Изменённые и проверенные пути

- `src/config/operation-metadata.ts` — текущий diff добавляет ровно три требуемые metadata entries; изменение уже присутствовало до первой записи этого executor и было проверено без перезаписи.
- `tests/unit/config/operation-metadata.test.ts` — текущий diff проверяет полный объект и четыре public helper results для каждой операции; изменение уже присутствовало до первой записи этого executor и было проверено без перезаписи.
- `tests/unit/client/retry-handler.test.ts` — integration-owned текущий diff проверяет transient error, retry и success для каждого operation key без `forceRetry`; этот executor файл не менял.
- `backlog/docs/wb-api-products-metadata-fix-2026-10.md` — этот отчёт.

Отдельный `tests/unit/client/products-directory-retry.test.ts` не создавался: требуемая focused retry regression уже присутствует в integration-owned retry test и прошла как в полном affected-file запуске, так и в отдельном verbose filter run.

## Границы и оставшийся gate

- Live WB API calls, environment variables и credentials не использовались.
- Full suite, build, package validation и другие не относящиеся к срезу проверки не запускались.
- Этот отчёт подтверждает текущий изменяемый working tree, а не финальный exact head.
- Перед завершением task 219 integration executor должен повторить broader final-tree verification на принятом exact head, проверить отсутствие конфликтов/потери этих трёх entries и regressions, а также закрыть остальные acceptance criteria задачи. До этого task 219 остаётся `In Progress`.

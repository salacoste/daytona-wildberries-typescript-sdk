# TASK-226 — реализация sandbox DBS `deliveryType`

**Дата закрытия локальной реализации:** 2026-10-11 (Europe/Moscow)
**Статус задачи:** `In Progress` — локальные acceptance criteria приняты, финальный
составной review выполняют владельцы интеграции и code review.
**Runtime-запросы:** не выполнялись. Токены, environment credentials и пользовательские
browser-сессии не читались.

## Результат

В существующий модуль `ordersDBS` добавлен метод:

```typescript
ordersDBS.createTestOrders(
  request: CreateTestDbsOrdersRequest
): Promise<void>
```

Метод всегда отправляет `POST` на фиксированный адрес:

```text
https://marketplace-api-sandbox.wildberries.ru/api/v3/test/dbs/orders/make
```

Он не использует production base URL, не добавляет production-операцию создания
заказов и не создаёт отдельный sandbox namespace. Пользователь передаёт свой токен
области действия Test в отдельный экземпляр SDK. JSDoc-пример использует только
явное синтетическое значение `caller-provided-test-scope-token` и не читает
`process.env`.

## Реализованный клиентский контракт

- `orders` обязателен; клиент принимает от 1 до 10 элементов.
- `orders[].sku` — `string` без придуманных ограничений длины или pattern.
- `orders[].amount` — целое число с отображённым максимумом 10. Нижняя граница
  не добавлена, поскольку официальный rendered contract её не показывает.
- `deliveryType` — optional union `dbs | dbsPickupPoint | edbs`.
- `address` — optional object. При его наличии обязательны `region`, `locality`,
  `street`, `houseNumber`; `entrance`, `intercom`, `floor`, `apartment` optional.
- SDK не подставляет документированные значения по умолчанию и сериализует
  отсутствие `deliveryType` и `address` без изменений.
- Успешный документированный ответ моделируется как `Promise<void>` для HTTP 204.

Optional-модель `deliveryType` и `address` является клиентской интерпретацией
видимых badges и документированных defaults. Она не утверждает содержимое скрытых
raw OpenAPI `required`/`nullable` flags и не доказывает server-side defaulting.

## Доказательство маршрутизации, сериализации, retry и rate limit

### Хост и сериализация

`tests/unit/modules/orders-dbs-sandbox.test.ts` проверяет все три значения
`deliveryType`, точное тело запроса, отсутствие подстановки optional-полей и
игнорирование production `baseUrls` override. Mock history содержит ровно один
`POST` и фиксированный sandbox URL.

### Retry safety

В `RequestOptions` добавлен optional `operationKey`. `BaseClient.post()` передаёт
его в существующий `RetryHandler`. Метод указывает
`operationKey: 'ordersDBS.createTestOrders'`, а metadata регистрирует операцию как
`readonly: false`, `category: marketplace`. Mocked 503 завершается после первой
попытки; второй `POST` не выполняется. Вызовы без `operationKey` сохраняют прежнее
поведение.

### Rate limit

Ключ `sandbox-dbs.createTestOrders` настроен как 60 запросов/мин, интервал 1 секунда,
burst 1 и penalty multiplier 1. Категория `sandbox-dbs` имеет Test/Basic multiplier
1, поэтому уже опубликованный sandbox-лимит не уменьшается повторно до 1 запроса/мин.

### OpenAPI и документация

Маршрут и схемы синхронизированы в root DBS OpenAPI, отдельном sandbox shard,
`_index`, `_schemas` и local raw stopgap. На уровне маршрута закреплён sandbox server,
а shard также содержит sandbox server на уровне документа. EN/RU guides и DBS module
документируют фиксированный хост, Test-scope token, значения `deliveryType`, omission
и границы доказательства.

## Изменённые sandbox-файлы

### SDK

- `src/modules/orders-dbs/index.ts`
- `src/types/orders-dbs.types.ts`
- `src/index.ts`
- `src/config/sdk-config.ts`
- `src/client/base-client.ts`
- `src/config/operation-metadata.ts`
- `src/config/rate-limits.ts`
- `src/config/sandbox-dbs-rate-limits.ts`

### Тесты

- `tests/unit/modules/orders-dbs-sandbox.test.ts`
- `tests/unit/modules/orders-dbs-openapi-contract.test.ts`
- `tests/unit/config/sandbox-dbs-rate-limits.test.ts`
- `tests/unit/config/operation-metadata.test.ts`

### OpenAPI

- `wildberries_api_doc/04-orders-dbs.yaml`
- `wildberries_api_doc/04-orders-dbs/sandbox-dbs.yaml`
- `wildberries_api_doc/04-orders-dbs/_index.yaml`
- `wildberries_api_doc/04-orders-dbs/_schemas.yaml`
- `docs/api-reference/raw-yaml/04-orders-dbs.local-stopgap.yaml`

### Документация и tracking

- `docs/guides/orders-dbs-getting-started.md`
- `docs/modules/orders-dbs.md`
- `docs/ru/guides/orders-dbs-getting-started.md`
- `backlog/docs/wb-api-sandbox-delivery-type-design-2026-10.md`
- `backlog/tasks/task-226 - Add-sandbox-DBS-deliveryType-support.md`
- `backlog/docs/wb-api-sandbox-delivery-type-implementation-2026-10.md`

Файлы generated API docs, canonical `SPEC.md`, `CHANGELOG.md` и финальный общий
delivery report в этом lane не изменялись и не staging-лись.

## Свежая локальная проверка

| Проверка | Результат |
|---|---|
| `npx vitest run tests/unit/modules/orders-dbs-sandbox.test.ts tests/unit/modules/orders-dbs-openapi-contract.test.ts tests/unit/config/sandbox-dbs-rate-limits.test.ts tests/unit/config/operation-metadata.test.ts` | exit 0; 4 файла; **93/93** теста |
| Затронутый срез с `orders-dbs.test.ts` и `client/retry-handler.test.ts` | exit 0; 6 файлов; **195/195** тестов |
| `npm run type-check` | exit 0; ошибок TypeScript нет |
| Scoped `npx eslint` для затронутых TS-файлов | exit 0; diagnostics отсутствуют |
| Scoped `npx prettier --check` для затронутых TS/MD-файлов | exit 0; все файлы отформатированы |
| `npm run validate:shards` | exit 0; **61/61 clean** |
| `npm run build` | exit 0; 115 modules transformed; ESM, CJS и declarations созданы |
| `npm run validate:package` | exit 0; 5 export surfaces; **193 packed files** |
| Поиск в generated declarations | exit 0; root exports содержат sandbox DBS types, module declaration содержит `createTestOrders(...): Promise<void>` |
| Scoped `git diff --check` | exit 0; whitespace errors отсутствуют |

Глобальный полный test suite в этом lane намеренно не запускался: финальный composed
suite закреплён за владельцем интеграции. Это не локальный validation gap данного
среза, но остаётся обязательным integration gate перед итоговой сертификацией.

## Не доказано и не заявляется

- raw sandbox OpenAPI `required`/`nullable` flags не доступны;
- HTTP 204 не наблюдался в runtime;
- применение `dbs` или московского адреса по умолчанию сервером не проверялось;
- фактическое enforcement лимита 1 запрос/сек не проверялось;
- sandbox/production API request и authorization attempt не выполнялись;
- package publication, commit и staging не выполнялись.

## Защищённая идентичность репозитория

- baseline HEAD: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`
- `backlog/config.yml` SHA-256:
  `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`
- `backlog/config.yml` Git blob:
  `6798b3a8df653646b20c3fcdb60f622c95ddf39e`
- controlling rendered-schema evidence SHA-256
  (`backlog/docs/wb-api-news-2026-10-official-schema-completion.md`):
  `cd4a0906c328a2336f00c16b026ff52543f5bb6d0a53358790175c7fb3af360f`

## Source hash manifest

Алгоритм: SHA-256. Хеш относится ко всему текущему содержимому файла, включая
сосуществующие согласованные DBS-изменения в shared-файлах. Сам этот report исключён
из manifest, поскольку самоссылочный стабильный хеш невозможен.

```text
8640b27ad82ea1141772444c6beaaf86f4e8cbc463df4e64a0baca65e20c7d7a  backlog/docs/wb-api-sandbox-delivery-type-design-2026-10.md
07043c8d45167fbe2f9e94a28a8592ef79feb0bd7e9ceaaf12b6512a589bfe24  backlog/tasks/task-226 - Add-sandbox-DBS-deliveryType-support.md
4869f3682d7d19e0d101a77e67f5a86d3e18137535250c8d098d6120e13ed14b  src/client/base-client.ts
836bc7ef35352235931fe05a5f2fe6dabdb5f7ff17a60b3b78eaf07518fe57c5  src/config/sdk-config.ts
2eab2333694c74970f4b791f7ccc79ad77d559e4bd9b9fb218964cefa290d4c8  src/config/rate-limits.ts
7573e2070a8ee12c22744a0d9142522843c41e8b152935af61c50135f3434006  src/config/sandbox-dbs-rate-limits.ts
68b39b135eb5092e694ff032151307ce67e714daf355852d29abf0203a99e6ff  src/config/operation-metadata.ts
36a196b444106fda4e5a94ee0839a308bacd2f334ae3bd1c5c3968443e66e7c2  src/index.ts
d72c63e1d01bbdf52ebe451411579746dc3645905e7576a24721880d33183b19  src/modules/orders-dbs/index.ts
05c26c40275b3d1e714ede57f8ff412323ae73e428cedca178bb3b56873a598d  src/types/orders-dbs.types.ts
cc11b25c7ee651eca5ab8cea5ac5f40041d1aefad964f160028fc2bef8d6bc9b  tests/unit/config/operation-metadata.test.ts
ba39836fa160b3930c69ad39701b2fe483628df946ff8295fa2b4477ab964bbd  tests/unit/config/sandbox-dbs-rate-limits.test.ts
d39f6abd2a255a985e8c1e0e75c897a282d979fb79e739b8e0ce2de118466262  tests/unit/modules/orders-dbs-openapi-contract.test.ts
e4e5821f938d1631a2478e2e95c187d4bd11564e094d423f38d38ff1ec91ac89  tests/unit/modules/orders-dbs-sandbox.test.ts
e1cc787dd0c2965ef8c5e166bbcb70a311700990c2d953e38970d7d8e6c5f6b8  wildberries_api_doc/04-orders-dbs.yaml
03172b9df168671b8ccdead6f240735f848c46ef90c9e470abdb6798e7d1789d  wildberries_api_doc/04-orders-dbs/_index.yaml
7643fd1eee58656135616fe099b16768064a2303bc0ed999533582101bb79c6f  wildberries_api_doc/04-orders-dbs/_schemas.yaml
e76500ab27b4e2082dc9e4e2edb989f89ef8d79c4dd1fb5ad7609e1a839c2ff1  wildberries_api_doc/04-orders-dbs/sandbox-dbs.yaml
68d229fdacde7408618d492e3ca09da6d28a4078ec26a6a0b2b98b9797341484  docs/api-reference/raw-yaml/04-orders-dbs.local-stopgap.yaml
4f8d5ecbeb121029b3f0a1d0a8f869d1a1fd283ab4db15196e7ed6def0d0e8b8  docs/guides/orders-dbs-getting-started.md
819487868b25a9d46b130faf291867711903671caabc3ede1dc51ab1985ec47d  docs/modules/orders-dbs.md
8de5afce16d7b903d88ceb571e6f3ef6362b2a698e4286a058707b2c80370113  docs/ru/guides/orders-dbs-getting-started.md
```

## SOURCE_FROZEN

`SOURCE_FROZEN`

После этой метки исполнитель sandbox DBS не вносит дальнейших изменений. Любое
изменение файла из manifest требует нового хеша и повторной проверки владельцем
финальной интеграции. Остаются только внешний composed suite, независимый code review,
staging/commit и release-решение; они не входят в этот lane.

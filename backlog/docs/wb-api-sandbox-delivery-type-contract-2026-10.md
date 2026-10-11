# Контракт sandbox DBS `deliveryType` — исследование 2026-10

**Дата исследования:** 2026-10-11 (Europe/Moscow)<br>
**Связанная задача:** `TASK-226`<br>
**Статус:** блокер контракта; реализации и sandbox-вызовы не выполнялись.

## Вывод для поставки

На момент исследования нельзя достоверно реализовать публичный метод для
`POST /api/v3/test/dbs/orders/make`. Подтверждены только сам путь и цель
анонса: для тестовых DBS-сборочных заданий добавляется `deliveryType`, чтобы
покрыть DBS-to-PVZ и EDBS. Официальный документ из данной среды недоступен;
публичный зафиксированный OpenAPI-снимок не содержит отдельной sandbox
спецификации и этой операции.

Поэтому **не следует угадывать** ни строковые значения enum, ни обязательность,
default, request/response-схему, сервер, ни rate limit. `TASK-226` остаётся In
Progress с непроверенными AC; его нельзя переводить в Done по зелёным локальным
проверкам.

## Официальный источник и результат доступа

Авторитетная операция WB:

- [Создание тестового DBS-заказа](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs/operation/postV3TestDbsOrdersMake)
  (`POST /api/v3/test/dbs/orders/make`).

В 2026-10-11 произведены только публичные read-only попытки прочитать эту
страницу.

| Проверка | Результат | Что это доказывает |
| --- | --- | --- |
| Прямой unauthenticated `GET` страницы | `HTTP 498`, `status-no-id: INF-01-EL` | Эта среда попадает под WB anti-bot; это не доказательство отсутствия операции или изменения контракта. |
| Свежая изолированная сессия `playwright-cli`, без persistent profile, cookie, логина или действий с формами | После загрузки свыше 10 секунд страница оставалась `HTTP 498`: «Подозрительная активность. Пожалуйста, подождите.» | Browser-путь также не дал контракт. CAPTCHA не обходилась, sandbox/production-запросы не выполнялись. |
| Пробные статические официальные URL (`/openapi.json`, предполагаемые `sandbox-environment.yaml`/`openapi.json`, sitemap) | Все вернули `HTTP 498` | В этой среде не найден доступный официальный downloadable OpenAPI. |

Дата публикации, effective date и текст rate limit не установлены. Они не
должны попадать в SDK-документацию как факты.

## Минимальный известный контракт

| Свойство | Статус | Основание |
| --- | --- | --- |
| Метод | `POST` | URL операции WB и входной news intake |
| Путь | `/api/v3/test/dbs/orders/make` | URL операции WB и входной news intake |
| Поле | `deliveryType` | supplied announcement / intake |
| Назначение | Тестовые DBS-to-PVZ и EDBS сборочные задания | supplied announcement / intake |
| Тип/enum поля | **Не подтверждены** | Официальное тело недоступно; альтернативный snapshot операции не содержит |
| Required/nullable/default | **Не подтверждены** | То же |
| Request/response body и error responses | **Не подтверждены** | То же |
| Точный host специальной test-операции | **Не подтверждён** | Обычный DBS host не доказывает host test-route |
| Rate limit | **Не подтверждён** | Лимиты обычных DBS-операций не переносятся на test-route без явной WB-записи |

## Supplemental source-reference evidence (не официальный источник)

Проверен неизменяемый public snapshot:

- [`eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed`](https://github.com/eslazarev/wildberries-sdk/commit/ed543365a7d73463ff52aca8764e12f42c5c18ed), timestamp commit `2026-10-10T08:10:59Z`.
- [`specs/05-dbs.yaml`](https://raw.githubusercontent.com/eslazarev/wildberries-sdk/ed543365a7d73463ff52aca8764e12f42c5c18ed/specs/05-dbs.yaml), SHA-256 `39cdef6e2d41678d684fce219c67f9e25c6991ca8bd15d62eccb695d4fad0e74`.

Это production-grade generated SDK snapshot, но он не является публикацией WB
и не может подменять её контракт. В его рекурсивном tree отсутствуют путь
`/api/v3/test/dbs/orders/make`, operation id `postV3TestDbsOrdersMake` и
отдельная sandbox-спецификация. Поэтому он не даёт enum или схему special
operation.

Единственная полезная, но недостаточная параллель: в обычном DBS-spec несколько
других операций имеют servers `https://marketplace-api.wildberries.ru` и
`https://marketplace-api-sandbox.wildberries.ru`, например
`eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/05-dbs.yaml:L30-L37`.
Этот факт нельзя переносить на `/api/v3/test/dbs/orders/make` без его собственного
официального OpenAPI operation.

## Локальная integration boundary (source inspection, не внешнее доказательство)

На исследованном baseline `6e8d6269140e3ae0a5aa5cb12ac714f457af4263` нет
`src/modules/sandbox`, sandbox type-файла или `SandboxModule` в public SDK entry
point. `OrdersDbsModule` имеет production base
`https://marketplace-api.wildberries.ru`; это не существующий typed namespace для
специального sandbox test-create endpoint.

Следовательно AC #2 в текущей формулировке («existing sandbox SDK namespace»)
предполагает поверхность, которой в baseline нет. Это не повод прикреплять
мутационный test endpoint к production `ordersDBS` API или добавлять production
order-creation method.

## Условие продолжения и безопасная рекомендация

Перед кодом необходимо получить официальный operation schema из доступного WB
OpenAPI/static asset и зафиксировать URL, retrieval date и SHA/версию. Он должен
явно ответить на все пункты AC #1: enum, type, optional/nullable/default,
request/response, special host и limit.

Только после этого integration owner должен через Backlog CLI скорректировать
AC #2 под найденную поверхность: если namespace действительно отсутствует,
сформулировать отдельную минимальную **sandbox-only** typed surface и её public
exports. Затем можно добавить только эту test-route, локальный OpenAPI, docs и
synthetic serialization tests. Omitting `deliveryType` можно тестировать только
если official schema подтвердит optionality; все enum cases — только после
официального списка значений.

Live seller, production и sandbox runtime proof остаются **NOT RUN**.

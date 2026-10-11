# WB API Changes — September 2026 Sync Log

> Living document. One row per WB API team news item received from the maintainer,
> the validation verdict against this SDK, and the backlog tasks that track the work.
> Schemas for every endpoint below were captured verbatim from the official docs UI
> (dev.wildberries.ru blocks non-browser clients; captured via playwright-cli, headed
> Chrome + persistent profile) and are stored in the linked task's Implementation Notes.

**Last updated**: 2026-09-24 (wave 3 implemented — news 16/task-212+213 Done, task-214 → v5; wave 2 implemented — tasks 203-207 Done; wave 1: 186-202 Done)
**News total**: 16 items (wave 1: 12, 2026-09-17→23; wave 2: 3, 2026-09-24; wave 3: 1, 2026-09-24 evening)
**News received**: 12 items across 2026-09-17 → 2026-09-23
**Verdicts**: ⚠️ required implementation (12) · ✅ already covered (0)

## Outcome (2026-09-24, autonomous overnight run)

All 12 news items implemented + specs synced. 17 backlog tasks closed, 11 feature branches merged to main (no push — left for maintainer). Tests 2376→2438 (+62), 81 files, type-check/lint/shards green. SDK grew 283→300 public methods (+17: promotion +3, orders-fbw +7, orders-fbs +6, analytics +1).

Commits (merge order): 655131ce2 (191 budget v2 + deprecation), 63f0f917f (186 daily limits), 753517c70 (188 discrepancies), caed75166 (193 drafts), 8cc4bd43e (197 SPOT), 0816af140 (198 shipping), 5c074d67f (196 documents), 2c361382e (199 seller-warehouses), 2a6ec0378 (195 penalty dates), 333a4af85 (201 DT typed 409), da829e8e1 (190+200 docs batch), ec955bc6e (CLAUDE.md counts), 2508e6e39 (187+192 promotion spec), e42fd675a (189+194 fbw spec), ea1dab4f5 (202 batch spec).

Notes for maintainer: (1) getAdvBudget deprecated — v5 removal after 2026-11-16 WB shutdown; (2) waybill (ЭТрН) method deliberately NOT implemented — WB still developing it, spec captured and ready; (3) spec spotAvailable marked optional to match SDK (capture had required); (4) CLAUDE.md footer still says SDK 4.1.0 while package.json is 4.2.0 (pre-existing drift — release step is manual); (5) push + npm publish left to maintainer per release conventions.

## Wave 2 (2026-09-24, news 13–15) — commits 72f2ef14c (203 final-price twins), 880a873a0 (204 order-feed), 8d41256dc (206 archive docs/date), 32320b94d (205 spec sync), 7d6fb69f1 (207 cosmetics); tests 2438→2456; 283→304 methods (DBS 21, pickup 19, analytics 21, orders-fbs 43 incl. archive docs); order-feed rate 1/min — strictest analytics bucket; news-15 finding: getOrdersArchive existed since before, only JSDoc date was stale (2026-07-21 → night 2026-08-05→06).

---

## Summary table

| # | News | Module | Verdict | Tasks | Status |
|---|------|--------|---------|-------|--------|
| 1 | Дневные лимиты кампаний CPC (daily limits) | promotion | ⚠️ new endpoints + config fields | task-186, task-187 | implemented |
| 2 | Расхождения в поставках FBW (discrepancies) | orders-fbw | ⚠️ new endpoint + details field | task-188, task-189 | implemented |
| 3 | История остатков обновляется раз в 2 часа | analytics | ⚠️ docs-only (data freshness) | task-190 | implemented |
| 4 | Budget v2 + отключение GET /adv/v1/budget | promotion | ⚠️ **deadline 2026-11-16** | task-191, task-192 | implemented |
| 5 | Черновики поставок FBW (supply drafts, 6 methods) | orders-fbw | ⚠️ new endpoints | task-193, task-194 | implemented |
| 6 | Отчёт об удержаниях: dateStart/dateEnd | reports | ⚠️ 2 new response fields | task-195 | implemented |
| 7 | Объект documents в карточках товаров | products | ⚠️ new object, 3 requests + 1 response | task-196 | implemented |
| 8 | FBS СПОТ (EAEU imports) + spotAvailable | orders-fbs | ⚠️ 4 new methods + 2 fields | task-197 | implemented |
| 9 | FBS параметры отгрузки (RF, с 1 сент; waybill pending) | orders-fbs | ⚠️ 2 new methods + 409 behavior c 1 окт | task-198 | implemented |
| 10 | Отчёт по остаткам на складах продавца | analytics | ⚠️ new endpoint (seller-warehouses отсутствует в SDK) | task-199 | implemented |
| 11 | Рекомендованные ставки для CPC-кампаний | promotion | ⚠️ docs (existing method, new semantics) | task-200 | implemented |
| 12 | Заказы FBS: номер ДТ (customs declaration) | orders-fbs | ⚠️ behavior docs + typed 409 | task-201 | implemented |
| — | Swagger batch sync (news 6–10) | specs | ⚠️ batch | task-202 | implemented |
| 13 | Final-price для сборочных заданий DBS + Самовывоз | orders-dbs, in-store-pickup | ⚠️ 2 twin-метода | task-203, task-205 | implemented |
| 14 | Лента заказов (order-feed) | analytics | ⚠️ новый отчёт + deprecation-указатели supplier/orders/sales | task-204, task-205 | implemented |
| 15 | Окно 3 месяца у GET /api/v3/orders + архив | orders-fbs | ✅ метод был; ⚠️ дата JSDoc + docs + спека | task-206, task-205 | implemented |
| — | Косметика: покрытие bulk-методов pickup docs + счётчик лимитов | docs | ⚠️ | task-207 | implemented |
| 16 | Новая версия отчёта «Возврат и перемещение товаров» (goods-return v1 analytics); старый **отключают 2026-10-26** | reports | ⚠️ новый метод + dated deprecation | task-212, task-213, task-214 | implemented (task-214 → v5) |

---

## Details

### 1. Дневные лимиты кампаний CPC — promotion
- `GET /api/advert/v0/daily-limits` (query `advertIds`, max 100, comma-separated) → `adverts[]` (8 required fields incl. `requiredLimit`, `carryOverEnabled`)
- `PUT /api/advert/v0/daily-limits` (body `advertIds[1..100]`, `enabled`, conditional `dailyLimit` ≥1000 / `carryOverEnabled`) → `adverts[]` (`belowMinLimit`, `requiredLimit`)
- `GET /api/advert/v1/config` response extended: **`minDailyLimit`** (из новости) + **`minTopUp`** (обнаружен при съёме — в новости отсутствует!)
- Rate limits: 5/min, 12 s, burst 5 (both endpoints, Personal + Service)
- Схемы: task-186 Implementation Notes

### 2. Расхождения в поставках FBW — orders-fbw
- `GET /api/supplies/v1/discrepancies/{supplyId}` — массив коробов: `packageCode`, видео приёмки (`videoUrl`/`videoStartsAt`/`videoUnavailable`), `items[]` с enum `surplus|shortage|re-sorting` и `skuScans[]`
- `GET /api/v1/supplies/{ID}` → новое поле `discrepancies` (integer, только при `statusID:5`)
- Лимит жёсткий: **1 запр/мин, burst 1**; данные — поставки, принятые не позже года назад
- Сайд-эффект: комментарий `src/utils/reconcileAcceptanceDelta.ts:51` («WB exposes no dedicated discrepancy API») устарел — обновить с кросс-ссылкой
- Схемы: task-188 Implementation Notes

### 3. История остатков ×1/2ч — analytics (docs-only)
- С 2026-09-17 данные обновляются раз в 2 часа: stocks-report v2 (groups/products/sizes/offices) + `STOCK_HISTORY_REPORT_CSV`/`STOCK_HISTORY_DAILY_CSV`
- Без задержки: `wb-warehouses` (есть) и `seller-warehouses` (нет → task-199)

### 4. Budget v2 + sunset v1 — promotion 🚨
- Новый `POST /api/advert/v2/budget` (тело `advertIds[1..50]`) → `adverts[{advertId, currency, total}]`; `total` — в **базовых** единицах валюты (не минорных!); статусы 4/9/11; лимит 20/мин, 3 с, burst 4
- `GET /adv/v1/budget` (наш `getAdvBudget`) **отключается 2026-11-16** (баннер в доках, release-notes id 582) → typed deprecation теперь, удаление в v5
- Схемы: task-191 Implementation Notes

### 5. Черновики поставок FBW — orders-fbw
6 методов CRUD на `/api/supplies/v1/drafts[...]` (supplies-api, Personal + Service). Полный захват — task-193.

### 6. Отчёт об удержаниях — reports
`GET /api/analytics/v1/measurement-penalties` → `dateStart`/`dateEnd` (срок действия коэффициента) в элементы отчёта. Наш `Penalty` тип — дополнить.

### 7. Объект documents в карточках — products
- `documents` в `POST /content/v2/cards/upload`, `/cards/upload/add`, `/cards/update` (запросы) и `POST /content/v2/get/cards/list` (ответ; старые документы из characteristics задублируются автоматически)
- 8 типов документов (сертификат, декларация, СГР, РУ мед., РУ РБ, пестицид, агрохимикат, РУ лек.)
- `characteristics`-передача ограничена и может обрабатываться некорректно → рекомендуется только `documents`
- Карточка перезаписывается при update → передавать ВСЕ документы, включая неизменяемые

### 8. FBS СПОТ — orders-fbs
4 метода (`countries/oksm`, `PUT .../spot`, `POST .../spot/list`, `GET .../stickers/spot`) + поле `spotAvailable` в `GET /api/v3/supplies` и `/{supplyId}`. Пока только продавцы из Кыргызстана; далее — ЕАЭС кроме РФ.

### 9. FBS параметры отгрузки — orders-fbs
- `GET /api/marketplace/v3/fbs/shipping-points`, `PATCH /api/marketplace/v3/fbs/supplies/shipping-method`
- `PATCH .../supplies/waybill` (ЭТрН) — **реализовано превентивно 2026-09-24** (task-208, commit 40943dea3): `updateSuppliesWaybill()` из captured-спеки, за 7 дней до дедлайна; пометка в JSDoc — до включения бэкенда WB возможен 404
- **С 2026-10-01** параметры отгрузки + ЭТрН обязательны: `deliver` вернёт 409

### 10. Отчёт по остаткам на складах продавца — analytics
`POST /api/analytics/v1/stocks-report/seller-warehouses` — все склады продавца без передачи ID складов/размеров; обновление раз в 30 минут; замена для `POST /api/v3/stocks/{warehouseId}`. В SDK метод отсутствует (есть только wb-warehouses).

### 11. CPC-рекомендованные ставки — promotion (docs)
`getBidsRecommendations` теперь возвращает ставки и для CPC (за клики), ранее — только CPM. JSDoc/docs.

### 12. Заказы FBS: номер ДТ — orders-fbs (с 2026-08-18)
- ДТ крепится только к заданиям в статусе `confirm`; для продавцов из Армении — обязателен для не-ЕАЭС товаров (доставка в РФ)
- `requiredMeta` в `GET /api/v3/orders/new`; `PUT .../meta/customs-declaration`
- `POST /api/v3/orders/stickers` → 409 `CustomsDeclarationIsRequired` (нет маппинга в SDK → добавить typed error)
- `deliver` → 409 `MetaValidationFail`, `decision=required` для customsDeclaration; проверка через `POST /api/marketplace/v3/orders/meta` (deliverable при `filled`/`optional`)

---

## Implementation order (deadline-then-value)

1. **task-191** budget v2 + deprecation (deadline 2026-11-16)
2. **task-186** daily limits (+ minTopUp)
3. **task-188** supply discrepancies
4. **task-193** supply drafts (6 methods)
5. **task-197** SPOT (4 methods + 2 fields)
6. **task-198** shipping-points/method
7. **task-196** documents object
8. **task-199** seller-warehouses report
9. **task-195** measurement-penalties fields
10. **task-201** DT docs + typed 409
11. **task-190 / task-200** docs-only batch
12. Swagger syncs (task-187, 189, 192, 194, 202) — по остатку времени

## Release v4.5.0 (2026-09-24, evening)

Waybill (ЭТрН) — task-208 реализован превентивно за 7 дней до дедлайна 01.10 (owner decision): `updateSuppliesWaybill()` + 2 типа + rate-limit `orders-fbs.patchSuppliesWaybill` + 2 теста (2456→2458) + доки (module page, guide EN/RU, счётчики 304→305). Коммиты: 40943dea3 → merge 660b9852d; релиз abba6a2bf (bump+CHANGELOG, заодно убран задвоенный `### Added` в 4.4.0), 65583c038 (CLAUDE.md). GitHub Release v4.5.0 → OIDC publish success (provenance logIndex=2940669166), npm latest=4.5.0, deploy-маркер 878ca8fab. Попутно: ci-гонка gh-pages (main.yml × docs.yml на подряд идущих пушах — non-fast-forward reject на 65583c038) вылечена общей concurrency-группой `gh-pages-deploy` (37e3d707e). Context7-ключ мигрирован в ~/.zshrc `${CONTEXT7_API_KEY}` (task-211 pre-work, ротация отложена).

## News 16 (2026-09-24, вечер) — goods-return v1 (analytics) 🚨 дедлайн 2026-10-26

Новая версия отчёта «Возврат и перемещение товаров»: `GET /api/analytics/v1/goods-return` (обратить внимание на порядок сегментов: **analytics/v1**, у старого — v1/analytics!). По новости: `status=active|archive`, пагинация `limit`+`offset`, любой токен, категория Аналитика, активные+архивные возвраты за любой период. Старый `GET /api/v1/analytics/goods-return` (sdk.reports.getAnalyticsGoodsReturn, reports/index.ts:562, лимит 1/мин) **отключается 2026-10-26** → сценарий getAdvBudget: новый метод + @deprecated/warnOnce старого (в один минор-релиз), физическое удаление в v5.

Статус разведки 2026-09-24:
- Live-зонд (read-only GET, без параметров): **401 от `ag-contentanalytics`** — маршрут существует и роутится в сервис аналитики (не 404 шлюза). Но контракт (required-параметры, схема ответа, лимиты) зондом не получен: **WB_API_KEY в .env истёк** («token is expired»).
- ~~Доки WB ещё не обновлены~~ → **доки обновились тем же вечером**: diff утреннего и вечернего захватов (`reports.json` vs `reports-v2.json`) выявил новый path **`/api/analytics/v1/item-returns`** (operationId `getAnalyticsV1GoodsReturn`). Путь из текста новости (`/api/analytics/v1/goods-return`) в спеке отсутствует — реализовано по спеке (`item-returns`); anchor-ссылка новости ведёт именно на этот operationId. Пойнт: сначала искал «goods-return» в списке 24 paths и пропустил — новый путь был там с вечернего захвата.
- Контракт по спеке: все 5 параметров required (`dateFrom`, `dateTo`, `status enum active|archive`, `limit 0–1000`, `offset`); ответ `{ count, report[] }` (17 обязательных полей + опциональный `returnReason`); 400-контракты: окно ≤ 31 день (`DateRangeExceeded`), `dateTo > dateFrom`; 204 = нет данных; переименования `barcode→sku`, `status→returnStatus`, `reason→returnReason`, `isStatusActive` → query-параметр `status`; новые поля `kiz`/`subjectName`/`techSize`. Rate-limit блок WB не публикует → в SDK зеркалирует старый (1/мин, burst 10).
- Старый путь в доках уже помечен: «The method will be disabled on October 26» (release-notes id=577) — дедлайн подтверждён.

**Реализовано 2026-09-24 (task-212/213, вечер):** `getAnalyticsV1GoodsReturn()` (`/api/analytics/v1/item-returns`, rateLimitKey `reports.analyticsGoodsReturnV1`) + типы `GoodsReturnStatus`/`GetAnalyticsV1GoodsReturnParams`/`GoodsReturnV1Item`/`GoodsReturnV1Response` + @deprecated/warnOnce на `getAnalyticsGoodsReturn` (2026-10-26, удаление в v5 = task-214) + 4 теста (2458→2462) + swagger-sync 12-reports.yaml (новый path + схемы `GoodsReturn200Response`/`4XXResponse` + `ReportExample`, старому пути добавлен shutdown-нотис; validate_shards 51/51 ✓). Доки: reports.md (25→26), гайды EN/RU (дедлайн-строка 2026-10-26 + секция), README/CLAUDE.md (305→306). Если WB переименует путь в `goods-return` (как в тексте новости) — патч-релиз с заменой URL.

**Release v4.6.0 (2026-09-24, поздний вечер):** коммиты 5836b76e0 (feat, task-212) → c132ec1ca (spec sync, task-213) → 27c45ca8c (bump+CHANGELOG) → push → GitHub Release v4.6.0 → publish.yml OIDC success (`+ daytona-wildberries-typescript-sdk@4.6.0`, run 36029097249), npm latest=4.6.0, deploy-маркер 596ff7520. **Инцидент CI**: `@typescript-eslint/no-deprecated` уронил линт — обнаружено, что `ReturnsModule.getReturns()` (агрегатор v3.10.0) внутри ходит в deprecated-метод (FBO-источник, 19 колл-сайтов в returns.test.ts) → весь флоу сломался бы 2026-10-26. Интерим: scoped eslint-disable + указатель на **task-215** (миграция getReturns на v1-эндпоинт: 2 вызова active+archive, пагинация, маппинг полей в enrichReturnsWithType; цель v4.7.0 до 26.10). CI позеленел (6e8d62691). Урок: при датированном deprecation проверять НЕ только сам метод, но и внутренних потребителей-обёрток (grep по всему src).

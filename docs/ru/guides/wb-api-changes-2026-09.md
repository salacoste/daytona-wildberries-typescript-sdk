# Изменения WB API — синхронизация сентября 2026

> Охватывает SDK **v4.3.0** и **v4.4.0**: пятнадцать новостей Wildberries API,
> внедрённых с 2026-09-17 по 2026-09-24. В гиде — что изменилось, на какие методы
> мигрировать и какие дедлайны вас затрагивают.

---

## Дедлайны, влияющие на интеграцию

| Дата | Что происходит | Действие |
|------|----------------|----------|
| **2026-10-01** | Параметры отгрузки FBS (+ ЭТрН для доставки транспортной компанией) становятся **обязательными** — `updateSuppliesDeliver()` вернёт **409** без них | Вызывайте `updateShippingMethod()` для поставок РФ и добавляйте `updateSuppliesWaybill()` (ЭТрН) для доставки ТК; до включения метода WB на вашем аккаунте waybill может отвечать 404 |
| **2026-11-16** | WB **отключает** `GET /adv/v1/budget` | Мигрируйте `getAdvBudget()` → `postV2Budget()` (deprecated с v4.3.0, удаление в v5) |
| *(дата будет объявлена)* | WB отключит `GET /api/v1/supplier/orders` и `/sales` | Мигрируйте на Ленту заказов — `sdk.analytics.getOrderFeed()` |

---

## Новые методы по областям

### Продвижение (v4.3.0)

- **`postV2Budget({ advertIds })`** — бюджеты до 50 кампаний одним запросом.
  `total` в ответе — в **базовых** единицах валюты (в отличие от большинства
  сумм SDK в минорных единицах). Замена устаревшего `getAdvBudget()`.
- **`getV0DailyLimits(advertIds)` / `putV0DailyLimits(data)`** — дневные лимиты
  CPC-кампаний (минорные единицы; `dailyLimit` ≥ 1000, минимум — из
  `getV1Config().minDailyLimit`; поддерживается перенос остатка). `getV1Config()`
  также получил `minTopUp`.
- **`getBidsRecommendations()`** теперь возвращает рекомендации и для CPC —
  различайте по `paymentType`; у CPC вместо `normQueries` поле `levels`
  (ставки для позиций листинга 1-2 / 3-10 / 11-34).

### Данные о заказах и цены (v4.4.0)

- **`sdk.analytics.getOrderFeed(data)`** — Лента заказов в реальном времени
  (заказы + выкупы одним потоком, статусы `created|buyout|cancel|return|returnDefective`
  с причинами отмен `cancelType`, признак B2B, отложенные оплаты). Пагинация `offset`
  **внутри одного курсора `snapshotTime`**; со временем меняются только статусы.
  Жёсткий лимит: 1 запр/мин. Замена отчётам supplier orders/sales.

  ```typescript
  let offset = 0;
  let snapshot: string | undefined;
  do {
    const page = await sdk.analytics.getOrderFeed({
      selectedPeriod: { start: '2026-09-01T00:00:00Z', end: '2026-09-24T00:00:00Z' },
      pagination: { snapshotTime: snapshot, offset, limit: 1000 },
    });
    snapshot = page.data.snapshotTime; // курсор должен быть одинаковым для всех страниц
    offset += page.data.orders.length;
    // ... обработка заказов
  } while (/* ещё есть страницы */);
  ```

- **`sdk.ordersDBS.getOrdersFinalPrice({ orders })`** и
  **`sdk.inStorePickup.getOrdersFinalPrice({ orders })`** — цены продавца (без
  скидок) и суммы к оплате покупателем (все скидки + кэшбек) по ID сборочных
  заданий. **Для расчётов используйте `originalFinalPrice` /
  `convertedOriginalFinalPrice`.** Фолбэк на `finalPrice` из методов получения
  заданий — **только** если новый метод вернул `data: null`; `data: {}` — данные
  ещё генерируются, повторите запрос.

### FBS: СПОТ, отгрузка, архив (v4.3.0)

- **СПОТ** (автоимпорт из ЕАЭС; сейчас — продавцы из Кыргызстана):
  `getSpotCountries()`, `updateSupplySpot()`, `getSuppliesSpotList()`,
  `getSupplySpotStickers()`; у поставок появилось поле `spotAvailable`.
- **Параметры отгрузки (продавцы РФ)**: `getShippingPoints()` +
  `updateShippingMethod()` + `updateSuppliesWaybill()` (ЭТрН для доставки ТК; до
  включения метода WB на аккаунте возможен 404) — см. дедлайн 2026-10-01 выше.
- **Окно 3 месяца у `orders()`** (вступило в ночь на 2026-08-06): более старые
  сборочные задания — **только** через `getOrdersArchive({ year, month, next, limit })`.
- **Типизированная 409 `CustomsDeclarationIsRequiredError`** — бросается
  `createOrdersSticker()`, когда обязателен номер ДТ, но его нет; полные правила
  ДТ (только статус `confirm`, правило Армении, семантика `decision`) — на
  странице модуля.

### Поставки FBW (v4.3.0)

- **`getSupplyDiscrepancies(supplyId)`** — расхождения заявлено/фактически по
  коробам приёмки (со ссылками на видео приёмки). Очень жёсткий лимит:
  **1 запр/мин**. `getSupply()` получил поле `discrepancies` (при `statusID: 5`).
- **Черновики поставок CRUD** — `createDraft()`, `listDrafts()`, `getDraftItems()`,
  `addDraftItems()` (атомарно: либо все позиции, либо ничего), `deleteDraftItems()`
  (без валидации SKU), `deleteDraft()`.

### Товары и отчёты (v4.3.0 + v4.4.0)

- **Объект `documents` в карточках** — 8 типов регистрационных документов в
  `createCardsUpload` / `createUploadAdd` / `createCardsUpdate` / `getCardsList`
  (в ответе — вердикты валидации). Передача документов через `characteristics`
  ограничена и может обрабатываться некорректно — используйте `documents`.
  **Карточка перезаписывается при обновлении: передавайте ВСЕ документы, включая
  неизменяемые (переиспользуйте `id`).**
- **`sdk.analytics.getSellerWarehousesStock()`** — остатки по всем складам
  продавца без передачи ID складов/размеров (обновление раз в 30 минут).
- В отчёт об удержаниях добавлены `dateStart`/`dateEnd` (срок действия
  коэффициента).

## Свежесть данных

- Отчёты истории остатков (v2 groups/products/sizes/offices + STOCK_HISTORY CSV)
  с 2026-09-17 обновляются **раз в 2 часа** — для актуальных данных используйте
  `getWbWarehousesStock()` / `getSellerWarehousesStock()`.

## Где почитать ещё

Страницы модулей: [promotion](../../modules/promotion.md) ·
[analytics](../../modules/analytics.md) · [orders-fbs](../../modules/orders-fbs.md) ·
[orders-fbw](../../modules/orders-fbw.md) · [products](../../modules/products.md) ·
[reports](../../modules/reports.md). Changelog: [CHANGELOG.md](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/CHANGELOG.md).

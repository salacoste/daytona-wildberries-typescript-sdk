# Изменения WB API — синхронизация октября 2026

> Охватывает SDK **v4.7.0** и **v4.8.0**: октябрьские новости Wildberries API.
> v4.7.0 закрыл девять октябрьских анонсов (справочники, GTIN, deprecation
> region-sale, телефоны DBS, свежесть отчётов, deliveryType песочницы);
> гид сфокусирован на **поздней октябрьской волне** (v4.8.0) и дедлайнах.

---

## Дедлайны, затрагивающие интеграцию

| Дата | Что происходит | Действие |
|------|----------------|----------|
| **03.11.2026** | WB **отключает** `GET /api/v1/analytics/region-sale` | Мигрируйте `reports.getAnalyticsRegionSale()` → агрегация Order Feed (deprecated с v4.7.0, удаление в v5) |
| **05.11.2026** | WB **отключает 3 legacy-песочницы** (statistics / supplies / advert) | Код SDK не затронут; песочница для поставок FBW, продвижения и отчётов статистики исчезает совсем — см. ниже |
| **16.11.2026** | WB **отключает** `GET /adv/v1/budget` | Мигрируйте `getAdvBudget()` → `postV2Budget()` (deprecated с v4.3.0, удаление в v5) |
| **20.11.2026** | WB **отключает** `GET /api/marketplace/v3/fbs/shipping-points` | Мигрируйте `ordersFBS.getShippingPoints()` → `getSupplyShippingPoints()` (deprecated с v4.8.0, удаление в v5) |

---

## Новые методы (v4.8.0)

### Уведомления кабинета — `sdk.general.getNotifications(params?)`

`GET /api/communications/v1/notifications` (новость WB 27.10). Уведомления
портала продавца на русском языке, от новых к старым. **Доступно только
продавцам из РФ** (иначе 403 `countryError`).

```typescript
let from: string | undefined;
do {
  const page = await sdk.general.getNotifications({ limit: 100, from });
  process(page.data);
  from = page.data.at(-1)?.date; // курсорная пагинация по date последнего элемента
} while (from);
```

- `from` — курсор: передавайте `date` последнего уведомления для следующей страницы
- `timezone` — часовой пояс IANA (по умолчанию `Europe/Moscow`); `limit` — 5–100 (по умолчанию 10)
- Лимит: 1 запрос/мин, всплеск 10

### Пункты отгрузки по поставке — `sdk.ordersFBS.getSupplyShippingPoints(supplyId, params)`

`GET /api/marketplace/v3/fbs/supplies/{supplyId}/shipping-points` (новость
20.10). Возвращает пункты отгрузки, доступные **для конкретной поставки**, —
передавайте их `id` в `updateShippingMethod()`.

- `officeType` (обязателен): список через запятую `sc|sw|pp|pfc|gpp`; `city` (обязателен, кириллица);
  `shippingDt` — обязателен для cargoType 1 и 3
- В отличие от старого глобального списка: нет фильтра `cargoType` — у каждого
  пункта флаг **`available`** (`false`, если ПВЗ перегружен на планируемую дату)
- **`getShippingPoints()` помечен deprecated** (WB отключает эндпоинт
  **20.11.2026**, удаление в v5) и выдаёт однократное предупреждение
- 404 `supply not found`; 409, если в поставке нет сборочных заданий

### Возврат заказов в сборку — `sdk.ordersFBS.transferSupplyOrders(supplyId, data)`

`PATCH /api/marketplace/v3/fbs/supplies/{supplyId}/orders/transfer` (новость
14.10). Переносит сборочные задания из `complete` (в доставке) обратно в
`confirm` (в сборке) — например, из закрытой поставки в открытую.

```typescript
const statuses = await sdk.ordersFBS.getOrderStatuses({ orders: [5678954321] });
if (statuses.orders![0].isTransferable) {
  const result = await sdk.ordersFBS.transferSupplyOrders('WB-GI-100', {
    orderIds: [5678954321],
    newSupplyId: 'WB-GI-200',
  });
}
```

- Предпроверка: новое поле **`isTransferable`** в статусах заданий
  (должны выполняться: задание в `complete`; целевая поставка не передана в доставку; ранее не переносилось)
- Результат по каждому заказу: `success: true` + новый стикер либо `error { code, detail }`

## Новые поля ответов

- **`ordersFBS.orders()`**: `trackNumber` — трек-номер для заказков Cross-Border
- **`general.sellerInfo()`**: `country` — страна регистрации аккаунта продавца (например `'ru'`)

## Отключение песочниц (05.11.2026)

WB отключает три legacy-песочницы: `statistics-api-sandbox`,
`supplies-api-sandbox`, `advert-api-sandbox`. Песочница для **поставок FBW,
продвижения и отчётов статистики/финансов исчезает совсем** — замены не
анонсировали. Код SDK этих хостов не касался; единственная песочница, в которую
ходит SDK — `marketplace-api-sandbox` (тестовые заказы DBS через
`ordersDBS.createTestOrders()`) — **остаётся**, как и песочницы контента,
цен-и-скидок и отзывов.

> **Примечание**: в письме-анонсе WB указан адрес `supplies-api.wildberries.ru`
> (ПРОДАКШЕН-хост, без `-sandbox`) — это опечатка в письме, подтверждено по
> release-notes и странице песочниц. Продакшен-API поставок FBW не затронут.

---

**Полный changelog**: [CHANGELOG.md](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/CHANGELOG.md) ·
**Сентябрьская волна**: [Изменения WB API — сентябрь 2026](./wb-api-changes-2026-09.md)

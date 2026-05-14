# Миграция управления остатками: `sku` → `chrtId`

> **Статус**: Заглушка — полное руководство по миграции будет опубликовано в task-16.5 (v3.12.0).
>
> **Жёсткий дедлайн**: 2026-05-20 13:00 МСК — Wildberries начинает постепенно отключать параметр
> `sku` на эндпоинтах управления остатками. После дедлайна: HTTP 400 от WB.

## Почему это важно

WB объявил 2026-05-08 (https://dev.wildberries.ru/release-notes?id=522) о том, что
параметр `sku` (штрихкод) на трёх эндпоинтах управления остатками выводится из
использования в пользу `chrtId` (ID размера из `POST /content/v2/get/cards/list`).

SDK v3.12.0 добавляет поддержку `chrtId` / `chrtIds` в:

- `sdk.products.getStocks(warehouseId, { chrtIds: [...] })`
- `sdk.products.updateStock(warehouseId, { stocks: [{ chrtId, amount }] })`
- `sdk.products.deleteStock(warehouseId, { chrtIds: [...] })`

Устаревшие параметры `sku`/`skus` остаются принимаемыми (обратная совместимость), но
помечены как `@deprecated` и будут вызывать `console.warn` (начиная с v3.12.0). Они
будут УДАЛЕНЫ в будущей мажорной версии.

## Как получить `chrtId`

Вызовите `POST /content/v2/get/cards/list` и считайте поле `chrtID` из массива `sizes[]`
каждой карточки. SDK предоставляет доступ через `sdk.products.getCardsList()`.

**Примечание о регистре**: WB использует `chrtID` (заглавная D) в ответах Content API,
но `chrtId` (строчная d) в эндпоинте остатков Marketplace. Передавайте то же числовое
значение; свойство SDK — `chrtId` (строчная d) для методов работы с остатками.

## Полные шаги миграции

(см. task-16.5 — эта заглушка будет заменена полным руководством.)

## Связанные ресурсы

- [CHANGELOG v3.12.0](../../CHANGELOG.md)
- Источник: [WB release-notes id=522](https://dev.wildberries.ru/release-notes?id=522)

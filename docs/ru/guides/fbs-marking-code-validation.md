# Миграция: проверка кодов маркировки FBS (2026-06-03)

> **Дедлайн: 2026-06-03** — Wildberries начинает серверную проверку кодов маркировки Честного знака для B2C-заказов FBS.

## Что изменилось

С **2026-06-03** эндпоинт `PATCH /api/v3/supplies/{supplyId}/deliver` (метод `sdk.ordersFBS.updateSuppliesDeliver()`) проверяет коды маркировки для B2C-заказов в FBS-поставках. Некорректные коды → HTTP 409 с новым полем `metaDetails[]` в теле ответа, описывающим какие сборочные задания не прошли проверку.

| До 2026-06-03 | С 2026-06-03 |
|--------------|---------------|
| Тело 409: `{ code, message }` | Тело 409: `{ code, message, metaDetails: MetaDetail[] }` (аддитивно) |
| B2C-коды не проверялись на сервере | B2C-коды проверяются на сервере |
| Криптохвост не обязателен | Код маркировки должен быть полным — с GS-разделителями и криптохвостом |

Товары с **необязательной** маркировкой по-прежнему принимаются без кодов.

## Формат кода маркировки

Код маркировки Честного знака необходимо передавать **полностью**:

1. **Все стандартные поля** (GTIN, серийный номер и т.д.)
2. **GS-разделители** — ASCII `0x1D` (group separator) между полями
3. **Криптохвост** — криптографический код проверки подлинности

Пример (иллюстративный — реальные коды зависят от категории товара):

```
0104650075191024215RJZx80hl"Aq3<GS>91FFD0<GS>92sGGtBnYBxYJ2bpEx55+DjlbOAUSHWVQQO9IxBPo3uA=
```

Где `<GS>` — литеральный байт `0x1D`.

> ⚠️ **Не обрезайте криптохвост**. WB проверяет полную строку. Усечение = 409.

## Поверхность SDK (v3.15.0+)

Поддерживаются три паттерна. Выберите тот, который подходит вашему стилю обработки ошибок.

### Паттерн A — Предварительная проверка (рекомендуется)

Проверьте метаданные **до** вызова `updateSuppliesDeliver()`, чтобы избежать 10-кратного штрафа по rate-limit на 409-ответах:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [12345] }); // example order ID
const invalid = meta.orders?.[0]?.metaDetails?.filter(
  d => d.decision === 'required' || d.decision === 'invalid'
);

if (invalid?.length) {
  console.log('Исправьте метаданные перед доставкой:', invalid.map(d => d.key));
  // Покажите в UI / приостановите доставку / и т.д.
} else {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
}
```

### Паттерн B — Типизированный catch через `MetaValidationFailError`

Если вы вызываете `updateSuppliesDeliver()` напрямую и обрабатываете 409 ниже по стеку:

```typescript
import {
  WildberriesSDK,
  MetaValidationFailError,
} from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
} catch (err) {
  if (err instanceof MetaValidationFailError) {
    for (const d of err.metaDetails) {
      console.log(`Поле задания ${d.key}: ${d.decision} (значение="${d.value}")`);
    }
    // Сохраните диагностику, повторите после исправления и т.д.
  }
  throw err;
}
```

### Паттерн C — Общий error boundary через `parseMetaValidationFail()`

Для кодовых баз, которые ловят ошибки в общем boundary и не хотят импортировать класс ошибки:

```typescript
import { parseMetaValidationFail } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
} catch (err) {
  const fail = parseMetaValidationFail(err);
  if (fail) {
    metrics.recordValidationFailure(fail.code, fail.metaDetails.length);
    logger.warn('Не пройдена валидация метаданных', fail);
  }
  throw err;
}
```

Хелпер возвращает `null` для любых ошибок, которые **не являются** 409 с метаданными — включая обычные 409 без `metaDetails`, сетевые ошибки и не-Error значения.

## Матрица решений `MetaDetail`

Известные значения на 2026-05-21. WB может добавлять новые решения; защитный код должен явно обрабатывать неизвестные значения.

Поле `decision` каждого элемента `MetaDetail` показывает статус валидации:

| `decision` | Значение | Действие |
|------------|---------|---------|
| `filled` | Значение указано и валидно | Ничего |
| `optional` | Поле не требуется для этого товара | Ничего |
| `required` | Должно быть заполнено до доставки | Укажите значение и повторите |
| `invalid` | Значение есть, но не прошло проверку | Исправьте (например, добавьте криптохвост) и повторите |

## Штраф по rate-limit

У `PATCH /api/v3/supplies/{supplyId}/deliver` стандартный FBS-лимит:

```
1 минута → 300 запросов, интервал 200 мс, всплеск 20
```

**Важно**: каждый ответ 409 учитывается как **10 запросов** от этого лимита. Цикл повторов на 409 исчерпает ваш rate-limit примерно в 30 раз быстрее, чем успешные вызовы.

Именно поэтому Паттерн A (предварительная проверка) рекомендован для высоконагруженных продавцов — `getOrdersMetaBulk()` возвращает ту же диагностику без штрафа.

## Чек-лист миграции

- [ ] Проверьте все места вызова `sdk.ordersFBS.updateSuppliesDeliver()` в кодовой базе
- [ ] Убедитесь, что отправляемые в WB коды маркировки содержат полные GS-разделители + криптохвост
- [ ] Добавьте предварительную проверку через `getOrdersMetaBulk()` для высоконагруженных потоков (Паттерн A)
- [ ] Обновите обработку ошибок: добавьте распознавание `MetaValidationFailError` (Паттерн B) или используйте `parseMetaValidationFail()` (Паттерн C)
- [ ] Если вы логируете сырые ошибки — убедитесь, что `metaDetails` попадает в лог-payload
- [ ] Прогоните интеграционные тесты против WB sandbox до 2026-06-03, чтобы убедиться что ваши коды проходят валидацию

## FAQ

**В: Я работаю только с B2B FBS — нужна ли миграция?**
О: B2B-коды проверяются с 2026-04-09. Изменение 2026-06-03 распространяет ту же проверку на B2C. Если B2B работает — B2C тоже будет работать, но обновите обработку ошибок для более чистой диагностики.

**В: А что с товарами без обязательной маркировки?**
О: Без изменений. WB валидирует только те коды, которые обязательны. Товары с необязательной маркировкой по-прежнему принимаются без 409.

**В: Можно ли обойти требование криптохвоста?**
О: Нет. Усечённый код = 409. WB валидирует полную строку, включая криптохвост.

**В: У моего 409 нет `metaDetails` — что это?**
О: Существующие коды 409 (`SupplyHasZeroOrders`, `UinIsNotFilled` и т.д.) не содержат `metaDetails`. SDK кидает обычный `WBAPIError` — `parseMetaValidationFail()` вернёт `null`, а `err instanceof MetaValidationFailError` будет `false`. Прочитайте тело через `err.response` или проверьте `err.statusCode === 409` для общего catch-all.

**В: Что такое поле `code` у `MetaValidationFailError`?**
О: Оно отражает строку `code` из тела ответа WB 409 (например `'MetaValidationFail'`). Если WB не включает поле, SDK использует значение по умолчанию `'Unknown'` — проверяйте `err.code !== 'Unknown'` перед использованием значения.

**В: `MetaValidationFailError` всё ещё проходит `instanceof WBAPIError`?**
О: Да. Класс наследуется от `WBAPIError`. Все существующие `catch (err) { if (err instanceof WBAPIError) { ... } }` продолжают работать.

## Связанные ссылки

- [Портал Честного знака](https://честныйзнак.рф/) — официальный реестр маркировки
- [WB seller docs: проверка идентификаторов товаров](https://seller.wildberries.ru/instructions/ru/ru/material/verify-product-identifiers)
- [WB seller docs: частые ошибки КИЗ](https://seller.wildberries.ru/instructions/ru/ru/material/kiz-common-errors)
- [CHANGELOG v3.15.0](../../../CHANGELOG.md)

[Wildberries API TypeScript SDK](../modules.md) / TaskStatus

# Type Alias: TaskStatus

```ts
type TaskStatus = number;
```

Defined in: [types/products.types.ts:391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L391)

Статус загрузки:
 * `3` — обработана, в товарах нет ошибок, цены и скидки обновились
 * `4` — отменена
 * `5` — обработана, но в товарах есть ошибки. Для товаров без ошибок цены и скидки обновились, а ошибки в остальных товарах можно получить с помощью метода [Детализация обработанной загрузки](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get)
 * `6` — обработана, но во всех товарах есть ошибки. Их тоже можно получить с помощью метода [Детализация обработанной загрузки](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get)

## Example

```json
3
```

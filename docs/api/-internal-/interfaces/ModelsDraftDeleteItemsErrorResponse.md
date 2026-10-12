[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsDraftDeleteItemsErrorResponse

# Interface: ModelsDraftDeleteItemsErrorResponse

Defined in: [types/orders-fbw.types.ts:758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-fbw.types.ts#L758)

Ответ на удаление товаров из черновика поставки.

SKU **не валидируются**: неверные SKU молча игнорируются,
корректные — удаляются из черновика.

## Since

task-193

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="results"></a> `results` | `unknown`[] | Результат операции | [types/orders-fbw.types.ts:760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-fbw.types.ts#L760) |

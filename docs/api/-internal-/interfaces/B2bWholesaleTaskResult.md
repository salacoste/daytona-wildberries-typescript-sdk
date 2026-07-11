[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / B2bWholesaleTaskResult

# Interface: B2bWholesaleTaskResult

Defined in: [types/products.types.ts:242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L242)

Результат обработки одной позиции загрузки оптовых скидок B2B.

200 response item for POST /api/discounts-prices/v1/upload/task/b2b/wholesale.
`success` is `true` on successful processing; on `false`, error details are in `error`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Артикул WB | [types/products.types.ts:244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L244) |
| <a id="success"></a> `success` | `boolean` | Успешность обработки: `true` — успешно, `false` — неуспешно (детали в `error`) | [types/products.types.ts:246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L246) |
| <a id="error"></a> `error?` | \{ `code?`: `string`; `message?`: `string`; \} | Детали ошибки. Присутствует только когда `success` = `false` | [types/products.types.ts:248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L248) |
| `error.code?` | `string` | Код/причина ошибки | [types/products.types.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L250) |
| `error.message?` | `string` | Текст ошибки | [types/products.types.ts:252](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L252) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableDetailsResponse

# Interface: TableDetailsResponse

Defined in: [types/analytics.types.ts:402](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L402)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="products"></a> `products` | [`TableProductItem`](TableProductItem.md)[] | Список товаров в группе по фильтру | [types/analytics.types.ts:404](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L404) |
| <a id="currency"></a> `currency?` | `string` | Валюта отчёта (ISO 4217, например "RUB"). Spec marks `currency` as required; kept optional `?` per codebase convention (WB omits empty fields). | [types/analytics.types.ts:410](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L410) |

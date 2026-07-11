[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ProductSearchTextsResponse

# Interface: ProductSearchTextsResponse

Defined in: [types/analytics.types.ts:433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L433)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items` | [`TableSearchTextItem`](TableSearchTextItem.md)[] | - | [types/analytics.types.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L434) |
| <a id="currency"></a> `currency?` | `string` | Валюта отчёта (ISO 4217, например "RUB"). Spec marks `currency` as required; kept optional `?` per codebase convention (WB omits empty fields). | [types/analytics.types.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L440) |

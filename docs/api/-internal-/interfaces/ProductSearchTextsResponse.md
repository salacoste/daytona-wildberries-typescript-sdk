[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ProductSearchTextsResponse

# Interface: ProductSearchTextsResponse

Defined in: [types/analytics.types.ts:433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L433)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items` | [`TableSearchTextItem`](TableSearchTextItem.md)[] | - | [types/analytics.types.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L434) |
| <a id="currency"></a> `currency?` | `string` | Валюта отчёта (ISO 4217, например "RUB"). Spec marks `currency` as required; kept optional `?` per codebase convention (WB omits empty fields). | [types/analytics.types.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L440) |

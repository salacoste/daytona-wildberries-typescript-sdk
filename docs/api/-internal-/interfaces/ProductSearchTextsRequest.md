[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ProductSearchTextsRequest

# Interface: ProductSearchTextsRequest

Defined in: [types/analytics.types.ts:707](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L707)

Request for product search texts endpoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | \{ `start`: `string`; `end`: `string`; \} | Current period for analysis | [types/analytics.types.ts:709](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L709) |
| `currentPeriod.start` | `string` | - | [types/analytics.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L710) |
| `currentPeriod.end` | `string` | - | [types/analytics.types.ts:711](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L711) |
| <a id="pastperiod"></a> `pastPeriod?` | \{ `start`: `string`; `end`: `string`; \} | Previous period for comparison | [types/analytics.types.ts:714](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L714) |
| `pastPeriod.start` | `string` | - | [types/analytics.types.ts:715](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L715) |
| `pastPeriod.end` | `string` | - | [types/analytics.types.ts:716](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L716) |
| <a id="nmid"></a> `nmId` | `number` | Product article number (nmID) | [types/analytics.types.ts:719](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L719) |
| <a id="limit"></a> `limit?` | `number` | Number of search texts to return (max 30, 100 for premium) | [types/analytics.types.ts:721](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L721) |
| <a id="toporderby"></a> `topOrderBy?` | `"orders"` \| `"avgPosition"` \| `"openCard"` \| `"addToCart"` | Top ordering method | [types/analytics.types.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L723) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Include substituted SKUs | [types/analytics.types.ts:725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L725) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Include search texts | [types/analytics.types.ts:727](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L727) |

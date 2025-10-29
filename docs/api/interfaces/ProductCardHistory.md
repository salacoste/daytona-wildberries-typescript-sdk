[Wildberries API TypeScript SDK](../modules.md) / ProductCardHistory

# Interface: ProductCardHistory

Defined in: [types/analytics.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L269)

Product card with daily historical statistics

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | Wildberries product article number | [types/analytics.types.ts:271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L271) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Supplier vendor code | [types/analytics.types.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L273) |
| <a id="brandname"></a> `brandName` | `string` | Brand name | [types/analytics.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L275) |
| <a id="tags"></a> `tags` | [`ProductTag`](ProductTag.md)[] | Product tags | [types/analytics.types.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L277) |
| <a id="object"></a> `object` | [`ProductObject`](ProductObject.md) | Product object/category | [types/analytics.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L279) |
| <a id="history"></a> `history` | [`DailyStatistics`](DailyStatistics.md)[] | Daily statistics time-series | [types/analytics.types.ts:281](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L281) |

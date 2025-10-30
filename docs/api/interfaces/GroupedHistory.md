[Wildberries API TypeScript SDK](../modules.md) / GroupedHistory

# Interface: GroupedHistory

Defined in: [types/analytics.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L295)

Grouped historical statistics (by brand, object, tags)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brandname"></a> `brandName?` | `string` | Brand name (if grouped by brand) | [types/analytics.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L297) |
| <a id="object"></a> `object?` | [`ProductObject`](ProductObject.md) | Object/Category (if grouped by object) | [types/analytics.types.ts:299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L299) |
| <a id="tags"></a> `tags?` | [`ProductTag`](ProductTag.md)[] | Tags (if grouped by tags) | [types/analytics.types.ts:301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L301) |
| <a id="history"></a> `history` | [`DailyStatistics`](DailyStatistics.md)[] | Daily statistics for this group | [types/analytics.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L303) |

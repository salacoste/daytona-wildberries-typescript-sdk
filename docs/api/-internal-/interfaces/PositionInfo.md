[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PositionInfo

# Interface: PositionInfo

Defined in: [types/analytics.types.ts:74](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L74)

Информация о позиции товара

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="average"></a> `average` | \{ `current`: `number`; `dynamics?`: `number`; \} | Средняя позиция товара в результатах поиска | [types/analytics.types.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L76) |
| `average.current` | `number` | Текущая средняя позиция товара | [types/analytics.types.ts:78](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L78) |
| `average.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L80) |
| <a id="median"></a> `median` | \{ `current`: `number`; `dynamics?`: `number`; \} | Медианная позиция товара в результатах поиска | [types/analytics.types.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L83) |
| `median.current` | `number` | Текущая медианная позиция товара | [types/analytics.types.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L85) |
| `median.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:87](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L87) |
| <a id="chartitems"></a> `chartItems` | [`SearchReportPositionChartItem`](SearchReportPositionChartItem.md)[] | Данные для чарта по средней и медианной позиции товара в результатах поиска | [types/analytics.types.ts:90](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L90) |
| <a id="clusters"></a> `clusters` | [`SearchReportPositionClusters`](SearchReportPositionClusters.md) | - | [types/analytics.types.ts:91](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L91) |

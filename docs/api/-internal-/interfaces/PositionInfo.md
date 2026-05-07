[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PositionInfo

# Interface: PositionInfo

Defined in: [types/analytics.types.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L68)

Информация о позиции товара

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="average"></a> `average` | \{ `current`: `number`; `dynamics?`: `number`; \} | Средняя позиция товара в результатах поиска | [types/analytics.types.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L70) |
| `average.current` | `number` | Текущая средняя позиция товара | [types/analytics.types.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L72) |
| `average.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:74](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L74) |
| <a id="median"></a> `median` | \{ `current`: `number`; `dynamics?`: `number`; \} | Медианная позиция товара в результатах поиска | [types/analytics.types.ts:77](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L77) |
| `median.current` | `number` | Текущая медианная позиция товара | [types/analytics.types.ts:79](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L79) |
| `median.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L81) |
| <a id="chartitems"></a> `chartItems` | [`SearchReportPositionChartItem`](SearchReportPositionChartItem.md)[] | Данные для чарта по средней и медианной позиции товара в результатах поиска | [types/analytics.types.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L84) |
| <a id="clusters"></a> `clusters` | [`SearchReportPositionClusters`](SearchReportPositionClusters.md) | - | [types/analytics.types.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/analytics.types.ts#L85) |

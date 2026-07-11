[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportPositionClusters

# Interface: SearchReportPositionClusters

Defined in: [types/analytics.types.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L109)

Количество товаров со средней позицией в поиске:
 - `firstHundred` — от 1 до 100
 - `secondHundred` — от 101 до 200
 - `below` — от 201 и ниже

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="firsthundred"></a> `firstHundred` | \{ `current`: `number`; `dynamics?`: `number`; \} | от 1 до 100 | [types/analytics.types.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L111) |
| `firstHundred.current` | `number` | Текущее количество товаров | [types/analytics.types.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L113) |
| `firstHundred.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L115) |
| <a id="secondhundred"></a> `secondHundred` | \{ `current`: `number`; `dynamics?`: `number`; \} | от 101 до 200 | [types/analytics.types.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L118) |
| `secondHundred.current` | `number` | Текущее количество товаров | [types/analytics.types.ts:120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L120) |
| `secondHundred.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L122) |
| <a id="below"></a> `below` | \{ `current`: `number`; `dynamics?`: `number`; \} | от 201 и ниже | [types/analytics.types.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L125) |
| `below.current` | `number` | Текущее количество товаров | [types/analytics.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L127) |
| `below.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L129) |

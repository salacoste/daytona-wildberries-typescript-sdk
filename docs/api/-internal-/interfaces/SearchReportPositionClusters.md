[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportPositionClusters

# Interface: SearchReportPositionClusters

Defined in: [types/analytics.types.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L103)

Количество товаров со средней позицией в поиске:
 - `firstHundred` — от 1 до 100
 - `secondHundred` — от 101 до 200
 - `below` — от 201 и ниже

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="firsthundred"></a> `firstHundred` | \{ `current`: `number`; `dynamics?`: `number`; \} | от 1 до 100 | [types/analytics.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L105) |
| `firstHundred.current` | `number` | Текущее количество товаров | [types/analytics.types.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L107) |
| `firstHundred.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L109) |
| <a id="secondhundred"></a> `secondHundred` | \{ `current`: `number`; `dynamics?`: `number`; \} | от 101 до 200 | [types/analytics.types.ts:112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L112) |
| `secondHundred.current` | `number` | Текущее количество товаров | [types/analytics.types.ts:114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L114) |
| `secondHundred.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L116) |
| <a id="below"></a> `below` | \{ `current`: `number`; `dynamics?`: `number`; \} | от 201 и ниже | [types/analytics.types.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L119) |
| `below.current` | `number` | Текущее количество товаров | [types/analytics.types.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L121) |
| `below.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L123) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / VisibilityInfo

# Interface: VisibilityInfo

Defined in: [types/analytics.types.ts:136](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L136)

Видимость карточек и переходы в карточки. По дням, неделям, месяцам

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="visibility"></a> `visibility` | \{ `current`: `number`; `dynamics?`: `number`; \} | Видимость — процент вероятности, что пользователь увидит карточку товара. Зависит от средней позиции | [types/analytics.types.ts:138](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L138) |
| `visibility.current` | `number` | Видимость в текущий период | [types/analytics.types.ts:140](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L140) |
| `visibility.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:142](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L142) |
| <a id="opencard"></a> `openCard` | \{ `current`: `number`; `dynamics?`: `number`; \} | Количество переходов в карточку товара из поиска | [types/analytics.types.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L145) |
| `openCard.current` | `number` | Текущее количество переходов | [types/analytics.types.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L147) |
| `openCard.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L149) |
| <a id="byday"></a> `byDay?` | \{ `dt`: `string`; `visibility`: `number`; `open`: `number`; \}[] | Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по дням | [types/analytics.types.ts:152](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L152) |
| <a id="byweek"></a> `byWeek?` | \{ `dt`: `string`; `visibility`: `number`; `open`: `number`; \}[] | Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по неделям | [types/analytics.types.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L160) |
| <a id="bymonth"></a> `byMonth?` | \{ `dt`: `string`; `visibility`: `number`; `open`: `number`; \}[] | Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по месяцам | [types/analytics.types.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L168) |

[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / VisibilityInfo

# Interface: VisibilityInfo

Defined in: [types/analytics.types.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L130)

Видимость карточек и переходы в карточки. По дням, неделям, месяцам

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="visibility"></a> `visibility` | \{ `current`: `number`; `dynamics?`: `number`; \} | Видимость — процент вероятности, что пользователь увидит карточку товара. Зависит от средней позиции | [types/analytics.types.ts:132](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L132) |
| `visibility.current` | `number` | Видимость в текущий период | [types/analytics.types.ts:134](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L134) |
| `visibility.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:136](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L136) |
| <a id="opencard"></a> `openCard` | \{ `current`: `number`; `dynamics?`: `number`; \} | Количество переходов в карточку товара из поиска | [types/analytics.types.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L139) |
| `openCard.current` | `number` | Текущее количество переходов | [types/analytics.types.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L141) |
| `openCard.dynamics?` | `number` | Динамика по сравнению с предыдущим периодом, % | [types/analytics.types.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L143) |
| <a id="byday"></a> `byDay?` | \{ `dt`: `string`; `visibility`: `number`; `open`: `number`; \}[] | Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по дням | [types/analytics.types.ts:146](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L146) |
| <a id="byweek"></a> `byWeek?` | \{ `dt`: `string`; `visibility`: `number`; `open`: `number`; \}[] | Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по неделям | [types/analytics.types.ts:154](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L154) |
| <a id="bymonth"></a> `byMonth?` | \{ `dt`: `string`; `visibility`: `number`; `open`: `number`; \}[] | Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по месяцам | [types/analytics.types.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/types/analytics.types.ts#L162) |

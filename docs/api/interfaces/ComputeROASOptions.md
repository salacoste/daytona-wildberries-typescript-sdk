[Wildberries API TypeScript SDK](../modules.md) / ComputeROASOptions

# Interface: ComputeROASOptions

Defined in: [utils/roas.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L29)

Options for [computeROAS](../functions/computeROAS.md).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="excludelastdays"></a> `excludeLastDays?` | `number` | Number of the most-recent (freshest) days to EXCLUDE from the window. Default `1`. WB attributes `sum_price` (revenue) to the click day, but finalization lags ~1-2 days — the freshest day's `sum_price` is typically undercounted. Excluding it avoids the same-day-ROAS footgun (Q6). See the task-135(b) / task-136 findings. | [utils/roas.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L37) |
| <a id="windowdays"></a> `windowDays?` | `number` | Cap the window to the most recent N days (AFTER exclusion). Default: all remaining days. | [utils/roas.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L41) |

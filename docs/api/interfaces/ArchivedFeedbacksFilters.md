[Wildberries API TypeScript SDK](../modules.md) / ArchivedFeedbacksFilters

# Interface: ArchivedFeedbacksFilters

Defined in: [types/communications.types.ts:3816](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3816)

Filters for getArchivedFeedbacks() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | Filter by product nmId (optional) | [types/communications.types.ts:3820](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3820) |
| <a id="take"></a> `take` | `number` | Number of feedbacks to retrieve (required, max 5000) | [types/communications.types.ts:3825](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3825) |
| <a id="skip"></a> `skip` | `number` | Number of feedbacks to skip (required) | [types/communications.types.ts:3830](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3830) |
| <a id="order"></a> `order?` | `"dateAsc"` \| `"dateDesc"` | Sort order by date (optional) - 'dateAsc': oldest first - 'dateDesc': newest first | [types/communications.types.ts:3837](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3837) |

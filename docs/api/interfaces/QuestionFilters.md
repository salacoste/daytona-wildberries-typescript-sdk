[Wildberries API TypeScript SDK](../modules.md) / QuestionFilters

# Interface: QuestionFilters

Defined in: [types/communications.types.ts:427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L427)

Filter criteria for retrieving product questions

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with HTTP client params

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="isanswered"></a> `isAnswered` | `boolean` | Whether question has been answered (required) - `true` — answered questions - `false` — unanswered questions | [types/communications.types.ts:433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L433) |
| <a id="nmid"></a> `nmId?` | `number` | Wildberries product ID to filter by (optional) Filter questions for a specific product | [types/communications.types.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L439) |
| <a id="take"></a> `take` | `number` | Number of questions to retrieve (required) Maximum allowed: 10,000 Note: take + skip must not exceed 10,000 | [types/communications.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L446) |
| <a id="skip"></a> `skip` | `number` | Number of questions to skip for pagination (required) Maximum allowed: 10,000 Note: take + skip must not exceed 10,000 | [types/communications.types.ts:453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L453) |
| <a id="order"></a> `order?` | `"dateAsc"` \| `"dateDesc"` | Sort order by date (optional) - `dateAsc` — oldest first - `dateDesc` — newest first (default) | [types/communications.types.ts:460](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L460) |
| <a id="datefrom"></a> `dateFrom?` | `number` | Filter start date (Unix timestamp) (optional) | [types/communications.types.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L465) |
| <a id="dateto"></a> `dateTo?` | `number` | Filter end date (Unix timestamp) (optional) | [types/communications.types.ts:470](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L470) |

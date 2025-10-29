[Wildberries API TypeScript SDK](../modules.md) / ReviewFilters

# Interface: ReviewFilters

Defined in: [types/communications.types.ts:700](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L700)

Filter criteria for retrieving customer reviews

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with HTTP client params

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="isanswered"></a> `isAnswered` | `boolean` | Whether review has been answered (required) - `true` — answered/processed reviews - `false` — unanswered/unprocessed reviews | [types/communications.types.ts:706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L706) |
| <a id="nmid"></a> `nmId?` | `number` | Wildberries product ID to filter by (optional) Filter reviews for a specific product | [types/communications.types.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L712) |
| <a id="take"></a> `take` | `number` | Number of reviews to retrieve (required) Maximum allowed: 5,000 | [types/communications.types.ts:718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L718) |
| <a id="skip"></a> `skip` | `number` | Number of reviews to skip for pagination (required) Maximum allowed: 199,990 | [types/communications.types.ts:724](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L724) |
| <a id="order"></a> `order?` | `"dateAsc"` \| `"dateDesc"` | Sort order by date (optional) - `dateAsc` — oldest first - `dateDesc` — newest first (default) | [types/communications.types.ts:731](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L731) |
| <a id="datefrom"></a> `dateFrom?` | `number` | Filter start date (Unix timestamp) (optional) | [types/communications.types.ts:736](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L736) |
| <a id="dateto"></a> `dateTo?` | `number` | Filter end date (Unix timestamp) (optional) | [types/communications.types.ts:741](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L741) |

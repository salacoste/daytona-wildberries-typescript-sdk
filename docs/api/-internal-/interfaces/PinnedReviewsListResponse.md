[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PinnedReviewsListResponse

# Interface: PinnedReviewsListResponse

Defined in: [types/communications.types.ts:210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L210)

Response from list pinned/unpinned reviews

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`PinnedReviewItemResult`](PinnedReviewItemResult.md)[] | Array of pinned/unpinned review items | [types/communications.types.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L212) |
| <a id="next"></a> `next?` | `number` | Pagination cursor for next page (absent if all data received) | [types/communications.types.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L214) |

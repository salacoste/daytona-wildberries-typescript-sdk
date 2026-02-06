[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PinnedReviewsListParams

# Interface: PinnedReviewsListParams

Defined in: [types/communications.types.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L184)

Parameters for listing pinned/unpinned reviews

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with Record<string, unknown>

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="state"></a> `state?` | [`ReviewState`](../type-aliases/ReviewState.md) | Filter by pin state | [types/communications.types.ts:186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L186) |
| <a id="pinon"></a> `pinOn?` | [`ReviewPinOn`](../type-aliases/ReviewPinOn.md) | Filter by pin location | [types/communications.types.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L188) |
| <a id="imtid"></a> `imtId?` | `number` | Filter by IMT ID | [types/communications.types.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L190) |
| <a id="nmid"></a> `nmId?` | `number` | Filter by WB article number | [types/communications.types.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L192) |
| <a id="feedbackid"></a> `feedbackId?` | `number` | Filter by review ID | [types/communications.types.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L194) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Start date for filtering (ISO 8601 format) | [types/communications.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L196) |
| <a id="dateto"></a> `dateTo?` | `string` | End date for filtering (ISO 8601 format) | [types/communications.types.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L198) |
| <a id="next"></a> `next?` | `number` | Pagination cursor (last pin operation ID) | [types/communications.types.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L200) |
| <a id="limit"></a> `limit?` | `number` | Number of reviews per page (max 500, default 500) | [types/communications.types.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L202) |

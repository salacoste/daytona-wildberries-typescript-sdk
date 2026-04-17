[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PinnedReviewsCountParams

# Interface: PinnedReviewsCountParams

Defined in: [types/communications.types.ts:220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L220)

Parameters for counting pinned/unpinned reviews

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with Record<string, unknown>

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="state"></a> `state?` | [`ReviewState`](../type-aliases/ReviewState.md) | Filter by pin state | [types/communications.types.ts:222](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L222) |
| <a id="pinon"></a> `pinOn?` | [`ReviewPinOn`](../type-aliases/ReviewPinOn.md) | Filter by pin location | [types/communications.types.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L224) |
| <a id="imtid"></a> `imtId?` | `number` | Filter by IMT ID | [types/communications.types.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L226) |
| <a id="nmid"></a> `nmId?` | `number` | Filter by WB article number | [types/communications.types.ts:228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L228) |
| <a id="feedbackid"></a> `feedbackId?` | `number` | Filter by review ID | [types/communications.types.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L230) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Start date for filtering (ISO 8601 format) | [types/communications.types.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L232) |
| <a id="dateto"></a> `dateTo?` | `string` | End date for filtering (ISO 8601 format) | [types/communications.types.ts:234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L234) |
